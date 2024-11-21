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

},{"./float64array.js":17,"@stdlib/assert/is-float64array":37}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":28,"@stdlib/assert/is-uint16array":42,"@stdlib/constants/uint16/max":62}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":31,"@stdlib/assert/is-uint32array":44,"@stdlib/constants/uint32/max":63}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":34,"@stdlib/assert/is-uint8array":46,"@stdlib/constants/uint8/max":64}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/utils/native-class":167}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":167}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/uint16":8,"@stdlib/array/uint8":14}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":39}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":167}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":167}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":167}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],52:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"@stdlib/number/ctor":122}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":59,"@stdlib/constants/float64/pinf":60}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":70}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":52,"@stdlib/constants/float64/high-word-sign-mask":54,"@stdlib/number/float64/base/from-words":126,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/to-words":142}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":52,"@stdlib/constants/float64/high-word-exponent-mask":53,"@stdlib/math/base/special/kernel-cos":77,"@stdlib/math/base/special/kernel-sin":81,"@stdlib/math/base/special/rempio2":89,"@stdlib/number/float64/base/get-high-word":130}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_c13.js":79,"./polyval_c46.js":80}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{"@stdlib/constants/float64/exponent-bias":50,"@stdlib/constants/float64/max-base2-exponent":57,"@stdlib/constants/float64/max-base2-exponent-subnormal":56,"@stdlib/constants/float64/min-base2-exponent-subnormal":58,"@stdlib/constants/float64/ninf":59,"@stdlib/constants/float64/pinf":60,"@stdlib/math/base/assert/is-infinite":65,"@stdlib/math/base/assert/is-nan":67,"@stdlib/math/base/special/copysign":71,"@stdlib/number/float64/base/exponent":124,"@stdlib/number/float64/base/from-words":126,"@stdlib/number/float64/base/normalize":136,"@stdlib/number/float64/base/to-words":142}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_p.js":87,"./polyval_q.js":88,"@stdlib/constants/float64/exponent-bias":50,"@stdlib/constants/float64/ninf":59,"@stdlib/math/base/assert/is-nan":67,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/set-high-word":139}],87:[function(require,module,exports){
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

},{}],88:[function(require,module,exports){
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

},{"./main.js":91}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":75,"@stdlib/math/base/special/ldexp":83}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./kernel_rempio2.js":90,"./rempio2_medium.js":92,"@stdlib/constants/float64/high-word-abs-mask":52,"@stdlib/constants/float64/high-word-exponent-mask":53,"@stdlib/constants/float64/high-word-significand-mask":55,"@stdlib/number/float64/base/from-words":126,"@stdlib/number/float64/base/get-high-word":130,"@stdlib/number/float64/base/get-low-word":132}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/math/base/special/round":93,"@stdlib/number/float64/base/get-high-word":130}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1987, 1989 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var ln = require( '@stdlib/math/base/special/ln' );
var HALF_PI = require( '@stdlib/constants/float64/half-pi' );
var GAMMA = require( '@stdlib/constants/float64/eulergamma' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalFN4 = require( './polyval_fn4.js' );
var polyvalFD4 = require( './polyval_fd4.js' );
var polyvalFN8 = require( './polyval_fn8.js' );
var polyvalFD8 = require( './polyval_fd8.js' );
var polyvalGN4 = require( './polyval_gn4.js' );
var polyvalGD4 = require( './polyval_gd4.js' );
var polyvalGN8 = require( './polyval_gn8.js' );
var polyvalGD8 = require( './polyval_gd8.js' );
var polyvalSN = require( './polyval_sn.js' );
var polyvalSD = require( './polyval_sd.js' );
var polyvalCN = require( './polyval_cn.js' );
var polyvalCD = require( './polyval_cd.js' );


// MAIN //

/**
* Computes the sine and cosine integrals and assigns results to a provided output array.
*
* ## Method
*
* -   The integrals are approximated by rational functions.
*
* -   For \\( x > 8 \\), auxiliary functions \\( f(x) \\) and \\( g(x) \\) are employed such that
*
*     ```tex
*     \operatorname{Ci}(x) = f(x) \sin(x) - g(x) \cos(x) \\
*     \operatorname{Si}(x) = \pi/2 - f(x) \cos(x) - g(x) \sin(x)
*     ```
*
* ## Notes
*
* -   Absolute error on test interval \\( \[0,50\] \\), except relative when greater than \\( 1 \\):
*
*     | arithmetic | function    | # trials | peak    | rms     |
*     |:----------:|:-----------:|:--------:|:-------:|:-------:|
*     | IEEE       | Si          | 30000    | 4.4e-16 | 7.3e-17 |
*     | IEEE       | Ci          | 30000    | 6.9e-16 | 5.1e-17 |
*
* @private
* @param {number} x - input value
* @param {Collection} out - output array
* @param {integer} stride - output array stride
* @param {NonNegativeInteger} offset - output array index offset
* @returns {Collection} output array
*
* @example
* var v = sici( 3.0, [ 0.0, 0.0 ], 1, 0 );
* // returns [ ~1.849, ~0.12 ]
*
* @example
* var v = sici( 0.0, [ 0.0, 0.0 ], 1, 0 );
* // returns [ 0.0, -Infinity  ]
*
* @example
* var v = sici( -9.0, [ 0.0, 0.0 ], 1, 0 );
* // returns [ ~-1.665, ~0.055 ]
*
* @example
* var v = sici( NaN, [ 0.0, 0.0 ], 1, 0 );
* // returns [ NaN, NaN ]
*/
function sici( x, out, stride, offset ) {
	var sgn;
	var si;
	var ci;
	var c;
	var f;
	var g;
	var s;
	var z;

	if ( isnan( x ) ) {
		out[ offset ] = NaN;
		out[ offset + stride ] = NaN;
		return out;
	}
	if ( x < 0.0 ) {
		sgn = -1;
		x = -x;
	} else {
		sgn = 0;
	}
	if ( x === 0.0 ) {
		out[ offset ] = 0.0;
		out[ offset + stride ] = NINF;
		return out;
	}
	if ( x > 1.0e9 ) {
		if ( isInfinite( x ) ) {
			if ( sgn === -1 ) {
				si = -HALF_PI;
				ci = NaN;
			} else {
				si = HALF_PI;
				ci = 0.0;
			}
			out[ offset ] = si;
			out[ offset + stride ] = ci;
			return out;
		}
		si = HALF_PI - ( cos( x ) / x );
		ci = sin( x ) / x;
	}
	if ( x > 4.0 ) {
		s = sin( x );
		c = cos( x );
		z = 1.0 / ( x*x );
		if ( x < 8.0 ) {
			f = polyvalFN4( z ) / ( x * polyvalFD4( z ) );
			g = z * polyvalGN4( z ) / polyvalGD4( z );
		} else {
			f = polyvalFN8( z ) / ( x * polyvalFD8( z ) );
			g = z * polyvalGN8( z ) / polyvalGD8( z );
		}
		si = HALF_PI - ( f*c ) - ( g*s );
		if ( sgn ) {
			si = -si;
		}
		ci = ( f*s ) - ( g*c );
		out[ offset ] = si;
		out[ offset + stride ] = ci;
		return out;
	}
	z = x * x;
	s = x * polyvalSN( z ) / polyvalSD( z );
	c = z * polyvalCN( z ) / polyvalCD( z );
	if ( sgn ) {
		s = -s;
	}
	si = s;
	ci = GAMMA + ln( x ) + c; // real part if x < 0
	out[ offset ] = si;
	out[ offset + stride ] = ci;
	return out;
}


// EXPORTS //

module.exports = sici;

},{"./polyval_cd.js":98,"./polyval_cn.js":99,"./polyval_fd4.js":100,"./polyval_fd8.js":101,"./polyval_fn4.js":102,"./polyval_fn8.js":103,"./polyval_gd4.js":104,"./polyval_gd8.js":105,"./polyval_gn4.js":106,"./polyval_gn8.js":107,"./polyval_sd.js":108,"./polyval_sn.js":109,"@stdlib/constants/float64/eulergamma":49,"@stdlib/constants/float64/half-pi":51,"@stdlib/constants/float64/ninf":59,"@stdlib/math/base/assert/is-infinite":65,"@stdlib/math/base/assert/is-nan":67,"@stdlib/math/base/special/cos":73,"@stdlib/math/base/special/ln":85,"@stdlib/math/base/special/sin":120}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the sine and cosine integrals.
*
* @module @stdlib/math/base/special/sici
*
* @example
* var sici = require( '@stdlib/math/base/special/sici' );
*
* var v = sici( 3.0 );
* // returns [ ~1.849, ~0.12 ]
*
* v = sici( 0.0 );
* // returns [ 0.0, -Infinity  ]
*
* v = sici( -9.0 );
* // returns [ ~-1.665, ~0.055 ]
*
* v = sici( NaN );
* // returns [ NaN, NaN ]
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var sici = require( '@stdlib/math/base/special/sici' );
*
* var out = new Float64Array( 2 );
*
* var v = sici.assign( 3.0, out, 1, 0 );
* // returns <Float64Array>[ ~1.849, ~0.12 ]
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

},{"./assign.js":95,"./main.js":97,"@stdlib/utils/define-nonenumerable-read-only-property":160}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Computes the sine and cosine integrals.
*
* @param {number} x - input value
* @returns {Array<number>} output array
*
* @example
* var v = sici( 3.0 );
* // returns [ ~1.849, ~0.12 ]
*
* @example
* var v = sici( 0.0 );
* // returns [ 0.0, -Infinity  ]
*
* @example
* var v = sici( -9.0 );
* // returns [ ~-1.665, ~0.055 ]
*
* @example
* var v = sici( NaN );
* // returns [ NaN, NaN ]
*/
function sici( x ) {
	return fcn( x, [ 0.0, 0.0 ], 1, 0 );
}


// EXPORTS //

module.exports = sici;

},{"./assign.js":95}],98:[function(require,module,exports){
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
		return 4.0;
	}
	return 4.0 + (x * (0.051002805623644606 + (x * (0.00031744202477503275 + (x * (0.0000012321035568588342 + (x * (3.067809975818878e-9 + (x * 4.077460400618806e-12))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],99:[function(require,module,exports){
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
		return -1.0;
	}
	return -1.0 + (x * (0.028915965260755523 + (x * (-0.0004740072068734079 + (x * (0.000003593250514199931 + (x * (-1.3524950491579076e-8 + (x * 2.0252400238910228e-11))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],100:[function(require,module,exports){
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
		return 5.489002527562557e-7;
	}
	return 5.489002527562557e-7 + (x * (0.00011003435715391573 + (x * (0.007017106683227897 + (x * (0.1787920529631499 + (x * (1.867922579501842 + (x * (7.308288225055645 + (x * (8.16496634205391 + (x * 1.0))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],101:[function(require,module,exports){
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
		return 9.70507110881952e-14;
	}
	return 9.70507110881952e-14 + (x * (9.437205903502767e-11 + (x * (3.21956939101046e-8 + (x * (0.000004924350643178815 + (x * (0.00035869648188185157 + (x * (0.012225359477197129 + (x * (0.17868554533207454 + (x * (0.9174636118736841 + (x * 1.0))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],102:[function(require,module,exports){
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
		return 5.489002234213736e-7;
	}
	return 5.489002234213736e-7 + (x * (0.00010893658065032867 + (x * (0.006810201324725182 + (x * (0.16700661183132304 + (x * (1.6208328770153833 + (x * (5.4593771716181285 + (x * 4.236128628922166))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],103:[function(require,module,exports){
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
		return 9.70507110881952e-14;
	}
	return 9.70507110881952e-14 + (x * (9.41779576128513e-11 + (x * (3.200927900910049e-8 + (x * (0.0000048621543082645475 + (x * (0.00034955644244785906 + (x * (0.01160642294081244 + (x * (0.16030015822231947 + (x * (0.7137152741001467 + (x * 0.4558808734704653))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],104:[function(require,module,exports){
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
		return 7.825792189335346e-9;
	}
	return 7.825792189335346e-9 + (x * (0.0000020265918208634397 + (x * (0.0001732210814741771 + (x * (0.006223963454417684 + (x * (0.09887717612776888 + (x * (0.666296701268988 + (x * (1.6440220241335535 + (x * 1.0))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],105:[function(require,module,exports){
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
		return 3.1404009894636335e-15;
	}
	return 3.1404009894636335e-15 + (x * (3.878301660239547e-12 + (x * (1.7269374896631615e-9 + (x * (3.5704322344374083e-7 + (x * (0.00003684755044425611 + (x * (0.0019028442667439953 + (x * (0.04679131942596258 + (x * (0.48785225869530496 + (x * (1.6854889881101165 + (x * 1.0))))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],106:[function(require,module,exports){
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
		return 7.825790407440903e-9;
	}
	return 7.825790407440903e-9 + (x * (0.0000019796387414096365 + (x * (0.00016199979459893403 + (x * (0.005388686814621773 + (x * (0.07485277376284691 + (x * (0.3971802963923375 + (x * (0.6113791099522193 + (x * 0.08710016989731142))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],107:[function(require,module,exports){
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
		return 3.1404009894636335e-15;
	}
	return 3.1404009894636335e-15 + (x * (3.859459254302766e-12 + (x * (1.7040445278204452e-9 + (x * (3.471311670841167e-7 + (x * (0.000034894116550227946 + (x * (0.001717182390523479 + (x * (0.03848787676499743 + (x * (0.33041097930563207 + (x * 0.6973599534432762))))))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],108:[function(require,module,exports){
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
		return 1.0;
	}
	return 1.0 + (x * (0.01420852393261499 + (x * (0.00009964121220438756 + (x * (4.418278428012189e-7 + (x * (1.279978911799433e-9 + (x * 2.0326926619595193e-12))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],109:[function(require,module,exports){
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
		return 1.0;
	}
	return 1.0 + (x * (-0.04134703162294066 + (x * (0.0009769454381704354 + (x * (-0.000009757593038436328 + (x * (4.625917144270128e-8 + (x * -8.391678279103039e-11))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],110:[function(require,module,exports){
module.exports={"x": [-5.0, -5.190380761523046, -5.380761523046092, -5.571142284569138, -5.761523046092185, -5.95190380761523, -6.142284569138276, -6.332665330661323, -6.5230460921843685, -6.713426853707415, -6.903807615230461, -7.094188376753507, -7.284569138276553, -7.474949899799599, -7.6653306613226455, -7.855711422845691, -8.046092184368737, -8.236472945891784, -8.42685370741483, -8.617234468937875, -8.807615230460922, -8.997995991983968, -9.188376753507015, -9.37875751503006, -9.569138276553106, -9.759519038076153, -9.949899799599198, -10.140280561122244, -10.330661322645291, -10.521042084168336, -10.711422845691382, -10.901803607214429, -11.092184368737474, -11.28256513026052, -11.472945891783567, -11.663326653306612, -11.85370741482966, -12.044088176352705, -12.23446893787575, -12.424849699398798, -12.615230460921843, -12.80561122244489, -12.995991983967937, -13.186372745490981, -13.376753507014028, -13.567134268537075, -13.75751503006012, -13.947895791583166, -14.138276553106213, -14.328657314629258, -14.519038076152304, -14.70941883767535, -14.899799599198397, -15.090180360721442, -15.280561122244489, -15.470941883767535, -15.66132264529058, -15.851703406813627, -16.04208416833667, -16.232464929859717, -16.422845691382765, -16.613226452905813, -16.803607214428858, -16.993987975951903, -17.184368737474948, -17.374749498997996, -17.56513026052104, -17.75551102204409, -17.945891783567134, -18.13627254509018, -18.326653306613224, -18.517034068136272, -18.70741482965932, -18.897795591182366, -19.08817635270541, -19.278557114228455, -19.4689378757515, -19.65931863727455, -19.849699398797597, -20.04008016032064, -20.230460921843687, -20.42084168336673, -20.61122244488978, -20.801603206412825, -20.991983967935873, -21.182364729458918, -21.372745490981963, -21.56312625250501, -21.753507014028056, -21.9438877755511, -22.13426853707415, -22.324649298597194, -22.51503006012024, -22.705410821643287, -22.895791583166332, -23.086172344689377, -23.276553106212425, -23.46693386773547, -23.657314629258515, -23.847695390781563, -24.03807615230461, -24.228456913827657, -24.4188376753507, -24.609218436873746, -24.799599198396795, -24.98997995991984, -25.180360721442884, -25.370741482965933, -25.561122244488978, -25.751503006012022, -25.94188376753507, -26.132264529058116, -26.32264529058116, -26.51302605210421, -26.703406813627254, -26.8937875751503, -27.084168336673347, -27.274549098196392, -27.464929859719437, -27.655310621242485, -27.84569138276553, -28.03607214428858, -28.226452905811623, -28.416833667334668, -28.607214428857716, -28.79759519038076, -28.987975951903806, -29.178356713426854, -29.3687374749499, -29.559118236472944, -29.749498997995993, -29.939879759519037, -30.130260521042082, -30.32064128256513, -30.511022044088175, -30.70140280561122, -30.89178356713427, -31.082164328657313, -31.272545090180362, -31.462925851703407, -31.65330661322645, -31.8436873747495, -32.034068136272545, -32.22444889779559, -32.41482965931864, -32.605210420841686, -32.79559118236473, -32.985971943887776, -33.17635270541082, -33.366733466933866, -33.55711422845691, -33.747494989979955, -33.937875751503, -34.12825651302605, -34.3186372745491, -34.50901803607214, -34.699398797595194, -34.88977955911824, -35.08016032064128, -35.27054108216433, -35.46092184368737, -35.65130260521042, -35.84168336673346, -36.03206412825651, -36.22244488977956, -36.412825651302605, -36.60320641282565, -36.7935871743487, -36.983967935871746, -37.17434869739479, -37.364729458917836, -37.55511022044088, -37.745490981963925, -37.93587174348697, -38.12625250501002, -38.31663326653307, -38.50701402805611, -38.69739478957916, -38.8877755511022, -39.07815631262525, -39.2685370741483, -39.45891783567134, -39.64929859719439, -39.83967935871743, -40.03006012024048, -40.22044088176353, -40.410821643286575, -40.60120240480962, -40.791583166332664, -40.98196392785571, -41.172344689378754, -41.362725450901806, -41.55310621242485, -41.743486973947896, -41.93386773547094, -42.124248496993985, -42.31462925851703, -42.50501002004008, -42.69539078156313, -42.88577154308617, -43.07615230460922, -43.26653306613226, -43.45691382765531, -43.64729458917836, -43.8376753507014, -44.02805611222445, -44.21843687374749, -44.40881763527054, -44.59919839679359, -44.789579158316634, -44.97995991983968, -45.170340681362724, -45.36072144288577, -45.551102204408814, -45.741482965931866, -45.93186372745491, -46.122244488977955, -46.312625250501, -46.503006012024045, -46.69338677354709, -46.88376753507014, -47.07414829659319, -47.26452905811623, -47.454909819639276, -47.64529058116232, -47.83567134268537, -48.02605210420842, -48.21643286573146, -48.40681362725451, -48.59719438877755, -48.7875751503006, -48.97795591182365, -49.168336673346694, -49.35871743486974, -49.549098196392784, -49.73947895791583, -49.92985971943887, -50.120240480961925, -50.31062124248497, -50.501002004008015, -50.69138276553106, -50.881763527054105, -51.07214428857716, -51.2625250501002, -51.452905811623246, -51.64328657314629, -51.833667334669336, -52.02404809619238, -52.21442885771543, -52.40480961923848, -52.59519038076152, -52.78557114228457, -52.97595190380761, -53.16633266533066, -53.35671342685371, -53.547094188376754, -53.7374749498998, -53.92785571142284, -54.11823647294589, -54.30861723446894, -54.498997995991985, -54.68937875751503, -54.879759519038075, -55.07014028056112, -55.260521042084164, -55.450901803607216, -55.64128256513026, -55.831663326653306, -56.02204408817635, -56.212424849699396, -56.40280561122244, -56.59318637274549, -56.78356713426854, -56.97394789579158, -57.16432865731463, -57.35470941883767, -57.545090180360724, -57.73547094188377, -57.92585170340681, -58.11623246492986, -58.3066132264529, -58.49699398797595, -58.687374749499, -58.877755511022045, -59.06813627254509, -59.258517034068134, -59.44889779559118, -59.639278557114224, -59.829659318637276, -60.02004008016032, -60.210420841683366, -60.40080160320641, -60.591182364729455, -60.78156312625251, -60.97194388777555, -61.1623246492986, -61.35270541082164, -61.54308617234469, -61.73346693386773, -61.92384769539078, -62.11422845691383, -62.30460921843687, -62.49498997995992, -62.68537074148296, -62.87575150300601, -63.06613226452906, -63.256513026052104, -63.44689378757515, -63.637274549098194, -63.82765531062124, -64.01803607214428, -64.20841683366734, -64.39879759519039, -64.58917835671343, -64.77955911823648, -64.96993987975952, -65.16032064128257, -65.35070140280561, -65.54108216432866, -65.7314629258517, -65.92184368737475, -66.11222444889779, -66.30260521042084, -66.49298597194388, -66.68336673346693, -66.87374749498997, -67.06412825651302, -67.25450901803606, -67.44488977955912, -67.63527054108216, -67.82565130260521, -68.01603206412825, -68.2064128256513, -68.39679358717436, -68.5871743486974, -68.77755511022045, -68.96793587174349, -69.15831663326654, -69.34869739478958, -69.53907815631263, -69.72945891783567, -69.91983967935872, -70.11022044088176, -70.3006012024048, -70.49098196392785, -70.6813627254509, -70.87174348697394, -71.06212424849699, -71.25250501002004, -71.44288577154309, -71.63326653306613, -71.82364729458918, -72.01402805611222, -72.20440881763527, -72.39478957915831, -72.58517034068136, -72.7755511022044, -72.96593186372745, -73.1563126252505, -73.34669338677355, -73.5370741482966, -73.72745490981964, -73.91783567134269, -74.10821643286573, -74.29859719438878, -74.48897795591182, -74.67935871743487, -74.86973947895791, -75.06012024048096, -75.250501002004, -75.44088176352706, -75.6312625250501, -75.82164328657315, -76.0120240480962, -76.20240480961924, -76.39278557114228, -76.58316633266533, -76.77354709418837, -76.96392785571142, -77.15430861723446, -77.34468937875751, -77.53507014028055, -77.72545090180361, -77.91583166332666, -78.1062124248497, -78.29659318637275, -78.48697394789579, -78.67735470941884, -78.86773547094188, -79.05811623246493, -79.24849699398797, -79.43887775551102, -79.62925851703406, -79.81963927855712, -80.01002004008016, -80.20040080160321, -80.39078156312625, -80.5811623246493, -80.77154308617234, -80.96192384769539, -81.15230460921843, -81.34268537074148, -81.53306613226452, -81.72344689378757, -81.91382765531063, -82.10420841683367, -82.29458917835672, -82.48496993987976, -82.6753507014028, -82.86573146292585, -83.0561122244489, -83.24649298597194, -83.43687374749499, -83.62725450901803, -83.81763527054107, -84.00801603206412, -84.19839679358718, -84.38877755511022, -84.57915831663327, -84.76953907815631, -84.95991983967936, -85.1503006012024, -85.34068136272545, -85.53106212424849, -85.72144288577154, -85.91182364729458, -86.10220440881763, -86.29258517034069, -86.48296593186373, -86.67334669338678, -86.86372745490982, -87.05410821643287, -87.24448897795591, -87.43486973947896, -87.625250501002, -87.81563126252505, -88.00601202404809, -88.19639278557113, -88.38677354709418, -88.57715430861724, -88.76753507014028, -88.95791583166333, -89.14829659318637, -89.33867735470942, -89.52905811623246, -89.71943887775551, -89.90981963927855, -90.1002004008016, -90.29058116232464, -90.48096192384769, -90.67134268537075, -90.86172344689379, -91.05210420841684, -91.24248496993988, -91.43286573146293, -91.62324649298597, -91.81362725450902, -92.00400801603206, -92.1943887775551, -92.38476953907815, -92.5751503006012, -92.76553106212425, -92.9559118236473, -93.14629258517034, -93.33667334669339, -93.52705410821643, -93.71743486973948, -93.90781563126252, -94.09819639278557, -94.28857715430861, -94.47895791583166, -94.6693386773547, -94.85971943887775, -95.0501002004008, -95.24048096192385, -95.4308617234469, -95.62124248496994, -95.81162324649299, -96.00200400801603, -96.19238476953907, -96.38276553106212, -96.57314629258516, -96.76352705410821, -96.95390781563125, -97.14428857715431, -97.33466933867736, -97.5250501002004, -97.71543086172345, -97.90581162324649, -98.09619238476954, -98.28657314629258, -98.47695390781563, -98.66733466933867, -98.85771543086172, -99.04809619238476, -99.23847695390782, -99.42885771543087, -99.61923847695391, -99.80961923847696, -100.0], "si": [-1.549931244944674, -1.5153108702529772, -1.4850797438003784, -1.4599872237264009, -1.4405643427676107, -1.4271215631851475, -1.4197527927038536, -1.418345347149439, -1.4225953806203733, -1.4320281568490687, -1.4460224100049486, -1.4638379429558177, -1.484645538497189, -1.5075582159555305, -1.5316628526148013, -1.5560512064106455, -1.579849422167846, -1.6022451763368937, -1.6225117119310617, -1.6400281326946353, -1.6542954593865427, -1.6649480969406505, -1.6717605143702674, -1.6746490946883694, -1.6736692649053726, -1.6690081616067163, -1.6609732212890784, -1.649977202589475, -1.6365202463934316, -1.6211696568471476, -1.6045381395620761, -1.5872612616238058, -1.5699749010566038, -1.5532934316237261, -1.5377893435226075, -1.5239749336573185, -1.5122866133878334, -1.503072280174477, -1.4965820860083554, -1.4929628139143238, -1.4922559482845057, -1.494399399544296, -1.4992327227723323, -1.5065055572683155, -1.5158889132161801, -1.5269888455951546, -1.5393619868669954, -1.552532360609909, -1.5660088693991578, -1.5793028423691073, -1.5919450408422136, -1.6035015532997827, -1.613588062273312, -1.621882033345657, -1.628132457756552, -1.6321668720880784, -1.6338954778442114, -1.6333122869333292, -1.6304933225496634, -1.6255920052234207, -1.6188319475386432, -1.6104974651554005, -1.6009221836523062, -1.590476178124769, -1.5795521237623176, -1.5685509596912557, -1.5578675747178603, -1.547877012364455, -1.5389216644743482, -1.5312998789519696, -1.525256349690606, -1.520974587650193, -1.5185716939662361, -1.518095571744744, -1.5195246258344643, -1.5227699124295566, -1.5276796158557728, -1.5340456511916383, -1.541612121085566, -1.5500852955296858, -1.5591447363146689, -1.568455154826463, -1.5776785736602073, -1.5864863595953045, -1.5945707076426832, -1.60165518246576, -1.6075039633279726, -1.6119294902293968, -1.6147982700824037, -1.616034670357114, -1.6156226010969097, -1.613605061927327, -1.610081605985819, -1.6052038449684354, -1.5991691862511481, -1.592213052056154, -1.584599879958104, -1.5766132420891985, -1.5685454460482284, -1.5606869930394935, -1.5533162679233534, -1.5466898218808627, -1.5410335819651313, -1.5365352840410977, -1.5333383779926308, -1.5315375984135529, -1.5311763323648064, -1.5322458504207137, -1.53468640048904, -1.5383900981339669, -1.543205484652454, -1.548943567101062, -1.5553851047706928, -1.5622888659056764, -1.5694005480681383, -1.576462036386647, -1.583220666521142, -1.5894381636260484, -1.594898944584492, -1.5994174976016453, -1.6028445897964931, -1.6050720983026205, -1.6060363118895704, -1.6057196063450587, -1.6041504557707928, -1.6014018014282574, -1.597587857719469, -1.5928594892757009, -1.5873983420794076, -1.5814099534007333, -1.5751160987001998, -1.5687466574597941, -1.5625312934321656, -1.5566912476900077, -1.5514315351422883, -1.5469338172623133, -1.543350196401555, -1.5407981413244087, -1.539356710856986, -1.5390641943935466, -1.5399172362155595, -1.5418714570271792, -1.5448435327142458, -1.548714638981605, -1.55333512301145, -1.5585302212533056, -1.5641066073315393, -1.569859527005807, -1.5755802590117773, -1.5810636319856433, -1.586115328736472, -1.5905587197301982, -1.5942409873066061, -1.5970383300688502, -1.5988600719826773, -1.5996515416754755, -1.5993956327160985, -1.5981130036300246, -1.5958609253280476, -1.592730831752292, -1.5888446751693563, -1.584350229071856, -1.5794155176533429, -1.5742225800754426, -1.5689607992800734, -1.5638200382278515, -1.558983830785796, -1.5546228699786127, -1.5508890232086592, -1.5479100828936037, -1.5457854326016909, -1.544582774264273, -1.5443360227029217, -1.5450444309725446, -1.5466729654473552, -1.5491539047684686, -1.5523895933281044, -1.5562562394197714, -1.560608611952335, -1.5652854589575453, -1.570115447054478, -1.5749234043647788, -1.5795366406231388, -1.5837911176348254, -1.5875372507405283, -1.590645137214539, -1.5930090299286161, -1.594550903295558, -1.595222992382612, -1.5950092238995446, -1.59392549813464, -1.5920188223709566, -1.5893653373760146, -1.5860673177595277, -1.582249262953971, -1.5780532270377037, -1.5736335615074173, -1.5691512645416938, -1.5647681426439162, -1.560640995432612, -1.5569160316518849, -1.5537237143664697, -1.5511742162105933, -1.549353642148301, -1.5483211483658084, -1.5481070527303022, -1.5487119959369675, -1.5501071743506016, -1.5522356270068294, -1.5550145216511546, -1.5583383493967025, -1.5620829058154708, -1.566109909148836, -1.5702720847617857, -1.5744185296963067, -1.5784001626963136, -1.5820750636268694, -1.5853135117884198, -1.5880025449756392, -1.5900498797536986, -1.5913870576057434, -1.5919717104346305, -1.5917888713113169, -1.590851291164078, -1.5891987580332403, -1.5868964512813104, -1.5840323974702812, -1.5807141262801727, -1.5770646527336776, -1.573217935142845, -1.569313975813618, -1.565493743045217, -1.5618940979795617, -1.5586429082614737, -1.5558545223710645, -1.553625764225041, -1.5520325877711239, -1.5511275065731784, -1.5509378847257784, -1.5514651439012164, -1.552684908070019, -1.5545480736514774, -1.556982759757068, -1.559897061966718, -1.5631825048298151, -1.5667180639993274, -1.5703746094288922, -1.5740196070517243, -1.5775219082786542, -1.5807564547469517, -1.583608730045407, -1.5859788004359805, -1.5877848024762726, -1.5889657563111426, -1.5894836084630104, -1.5893244362810228, -1.588498776771156, -1.587041074211653, -1.5850082726178307, -1.582477609622902, -1.579543696602042, -1.5763149948883017, -1.5729098188368669, -1.5694520125676379, -1.5660664579123889, -1.562874576065348, -1.559989984545846, -1.5575144644006156, -1.5555343803802244, -1.5541176795934735, -1.5533115725271214, -1.5531409751205536, -1.5536077627334535, -1.5546908573555485, -1.556347139349398, -1.558513145471605, -1.5611074869408674, -1.5640338959059281, -1.567184786707335, -1.570445200588897, -1.57369698960644, -1.5768230878344447, -1.5797117158255274, -1.5822603676748859, -1.58437943882412, -1.5859953665566362, -1.5870531734621347, -1.5875183262942556, -1.5873778477944434, -1.5866406462851141, -1.5853370561561126, -1.5835176107571916, -1.5812510966467612, -1.578621963654861, -1.575727187892964, -1.5726727038887771, -1.5695695367797358, -1.5665297754614265, -1.5636625324287596, -1.5610700356261187, -1.5588439919853636, -1.5570623517117188, -1.5557865871887637, -1.5550595811879715, -1.5549041965984127, -1.5553225749648347, -1.5562961846469905, -1.5577866123495632, -1.559737065095436, -1.5620745243808116, -1.5647124711603315, -1.5675540802796148, -1.570495766702571, -1.5734309539334492, -1.5762539278124026, -1.5788636365998974, -1.5811673010119027, -1.583083705496509, -1.5845460542511454, -1.5855042918028583, -1.5859268078021596, -1.5858014682814305, -1.585135940174166, -1.5839573014886872, -1.5823109552540124, -1.5802588902816592, -1.577877355024468, -1.5752540315370502, -1.5724848140219296, -1.5696703100713367, -1.5669121920190914, -1.5643095304900971, -1.5619552421346732, -1.5599327786915245, -1.558313175136967, -1.5571525611115096, -1.5564902225785893, -1.5563472804036718, -1.5567260299899206, -1.557609962092024, -1.558964460323452, -1.5607381465617312, -1.5628648223132795, -1.5652659329491363, -1.5678534633148433, -1.5705331581984456, -1.5732079500315803, -1.5757814693781154, -1.5781615114549643, -1.5802633341894055, -1.5820126700409667, -1.5833483447382746, -1.5842244107874577, -1.5846117215501112, -1.5844988922036136, -1.5838926162337974, -1.582817329457203, -1.5813142370828632, -1.579439742155781, -1.5772633350587297, -1.5748650228266585, -1.5723323931746491, -1.5697574207907827, -1.5672331321626498, -1.5648502496974024, -1.5626939360204084, -1.560840755114521, -1.5593559585647598, -1.5582911929248984, -1.5576827085830034, -1.5575501320518372, -1.557895843024773, -1.5587049755694466, -1.559946040276555, -1.5615721418539832, -1.5635227453585026, -1.565725924749274, -1.5681010104219706, -1.5705615384393394, -1.5730183937996507, -1.5753830336341221, -1.5775706739107693, -1.5795033251080242, -1.5811125683185479, -1.5823419731161301, -1.5831490718924637, -1.5835068217479216, -1.5834045037976234, -1.582848030244112, -1.5818596510256757, -1.5804770734982694, -1.5787520296695725, -1.5767483452212685, -1.5745395822273545, -1.5722063424763058, -1.5698333301064316, -1.5675062804574074, -1.5653088663491714, -1.5633196932854783, -1.561609491352131, -1.5602386039921998, -1.5592548626834821, -1.5586919222351312, -1.5585681144902526, -1.5588858592906034, -1.5596316513187032, -1.5607766206159093, -1.562277643933934, -1.5640789643536765, -1.5661142585044545, -1.5683090748825996, -1.5705835537601174, -1.5728553294468917, -1.5750425095586764, -1.5770666236512874, -1.5788554351740949, -1.580345516098176, -1.58148449257469, -1.582232882237122, -1.582565458821191, -1.5824720970839763, -1.5819580699262632, -1.5810437894711216, -1.5797640039089034, -1.5781664814614877, -1.5763102311457389, -1.5742633264736459, -1.5721004122304958, -1.5698999855295825, -1.5677415500674157, -1.5657027466338291, -1.5638565633338644, -1.5622687256547205, -1.5609953595972692, -1.5600810108521228, -1.55955708981801, -1.5594407966224781, -1.5597345627851378, -1.5604260274005424, -1.5614885463920012, -1.5628822141971987, -1.5645553588815795, -1.566446454793515, -1.5684863820776542, -1.5706009501732607, -1.572713593270461, -1.574748139895748, -1.5766315565434277, -1.57829656662811, -1.5796840509407029, -1.5807451440550166, -1.5814429524424587, -1.5817538339884256, -1.5816681946532218, -1.5811907755960808, -1.580340422544024, -1.579149347869553, -1.5776619140690065, -1.5759329844525358, -1.5740259022553273, -1.5720101725106475, -1.5699589314251206, -1.5679462953021874, -1.5660446850205587, -1.5643222225618507, -1.5628402930919925, -1.5616513597563602, -1.5607971088908943, -1.5603069911339316, -1.56019720939716, -1.5604701883513505, -1.5611145425975173, -1.5621055426611854, -1.5634060600180604, -1.5649679551787217, -1.5667338570436378, -1.5686392678518972, -1.5706149165799255, -1.572589275003402, -1.5744911451166232, -1.576252224394985, -1.5778095565545793, -1.579107779952633, -1.5801010934089763, -1.5807548697244787, -1.581046860138304, -1.5809679479252887, -1.5805224257412265, -1.5797277885809347, -1.5786140516968064, -1.5772226199037476, -1.5756047507564244, -1.5738196685521966, -1.5719323984731366, -1.5700113999960976, -1.5681260856272268, -1.5663443148182, -1.56472995347092, -1.5633405867280965, -1.5622254668890563], "ci": [-0.1900297496566439, -0.1761132088998822, -0.15662448700257026, -0.13263104744022836, -0.1052737270421524, -0.07572788710100596, -0.04516557896078838, -0.014719711429420024, 0.014548865083133203, 0.0416805431698791, 0.06584172145483987, 0.08634459917744722, 0.10266161315325278, 0.1144342945631242, 0.12147649318157047, 0.12377208494384244, 0.12146743995536226, 0.11485907728236913, 0.1043770657196301, 0.0905648423999146, 0.07405621048777625, 0.05555034097486501, 0.03578564030229997, 0.015513354594425731, -0.004528237002618521, -0.0236382318666052, -0.04117537702780445, -0.056577556820667854, -0.0693779544458781, -0.07921746964110045, -0.0858531076093665, -0.0891621929785419, -0.0891424023044073, -0.08590774497851915, -0.07968075105358373, -0.07078124148059908, -0.05961215804652174, -0.04664301395335911, -0.032391589181322365, -0.01740453593256397, -0.00223757771028973, 0.012564019133303048, 0.026484049579097398, 0.03905244600948211, 0.04986028915770902, 0.05857230002766899, 0.06493645511822171, 0.06879047320189129, 0.0700650337654414, 0.06878370116795252, 0.06505964076596152, 0.059089319984715054, 0.0511434851243263, 0.04155579048952385, 0.03070952759312301, 0.01902295661851673, 0.0069337785483330125, -0.00511669647234304, -0.016699131059729113, -0.02741096020395763, -0.03688991455787207, -0.044825828017827044, -0.05097035871084521, -0.05514433226943713, -0.0572425043757162, -0.05723563282658731, -0.05516984453063764, -0.05116337660933652, -0.045400859961649595, -0.038125395296577894, -0.029628743086958082, -0.020240007889774616, -0.010313242218402583, -0.00021442436461058083, 0.00969172246943194, 0.01905460580948669, 0.027549889829728186, 0.034890461535598764, 0.04083587524036979, 0.04519997310384816, 0.04785644865777804, 0.048742196264035406, 0.04785836959078141, 0.045269153603588304, 0.041098334410978876, 0.03552382683495233, 0.02877038824823881, 0.021100806760655524, 0.012805900328569701, 0.004193699298630829, -0.004421792767148349, -0.012731856962037949, -0.02044393862110318, -0.027291771470003272, -0.033044401884204225, -0.037513813042345044, -0.04056090280468527, -0.04209963096847259, -0.04209921886860582, -0.040584354668406056, -0.037633428615170425, -0.0333748915293748, -0.027981894469573936, -0.021665425667140893, -0.014666210515238986, -0.0072456800073429795, 0.0003236586900408193, 0.007768099706979413, 0.01482251056255857, 0.021239654355412703, 0.02679873842442972, 0.03131289784847401, 0.034635363971839514, 0.03666411817552049, 0.03734488749129916, 0.036672399306745734, 0.034689875142820445, 0.03148680606614682, 0.027195112524341546, 0.021983847175738713, 0.01605264871848188, 0.009624196150191474, 0.002935944953064427, -0.0037685516082300997, -0.010248422197935342, -0.01627404479900792, -0.02163510007222039, -0.02614783112103067, -0.02966126185340836, -0.03206216625371776, -0.033278627845292834, -0.03328208069322549, -0.03208777856416136, -0.029753695332816504, -0.026377915392176314, -0.022094625727093684, -0.017068869611341023, -0.011490263932405993, -0.0055659165231820434, 0.00048719454061077233, 0.006450101735884156, 0.012109705107153592, 0.01726632583924666, 0.0217406908143503, 0.02538010593215444, 0.028063607654025567, 0.029705921026373726, 0.030260096888673618, 0.029718749438033855, 0.02811386604083442, 0.025515212328579014, 0.022027405370399437, 0.017785774328443985, 0.0129511698548403, 0.007703919146459512, 0.0022371518377187287, -0.0032502581415043545, -0.008560878605058398, -0.01350577512988741, -0.01791118655603016, -0.021624585720633936, -0.024519915597169553, -0.02650182264027035, -0.02750874677773458, -0.027514769743615018, -0.026530168759981265, -0.02460066930697508, -0.021805437194571353, -0.01825389471448091, -0.014081486740743141, -0.009444558835745305, -0.004514539466026722, 0.0005283586688325237, 0.005501688184770984, 0.010227330772579988, 0.014537840347978448, 0.018282340973862016, 0.021331773047717894, 0.023583306547061495, 0.02496377164329146, 0.025431993547020873, 0.024979958685208678, 0.023632781763418736, 0.02144748640136133, 0.018510654302712957, 0.01493503783233617, 0.0108552670246767, 0.0064228131824299005, 0.001800396280840345, -0.002843958467234098, -0.007342998890513081, -0.011536240158780027, -0.015275661290423466, -0.018430902658390935, -0.020893782960273496, -0.02258198010082393, -0.02344175174142868, -0.023449606736270574, -0.022612876996470903, -0.02096917910831442, -0.018584794846661316, -0.015552038148148921, -0.011985711781045329, -0.00801878861976524, -0.003797479005689533, 0.0005241337531074596, 0.004789693805619498, 0.008846206407410268, 0.012549502643771382, 0.015769340844605365, 0.018393964965261377, 0.02033396116824646, 0.021525280304300707, 0.021931324966242956, 0.02154403413088056, 0.02038393485791089, 0.018499167759770157, 0.015963529654952405, 0.0128736116619523, 0.009345142750998946, 0.005508676335562634, 0.0015047799034332127, -0.0025210958023247692, -0.006423881482216324, -0.010064097987514327, -0.013312822686553023, -0.016056237306438025, -0.018199597459518345, -0.0196704860491432, -0.020421239496340147, -0.020430466244064874, -0.01970361015754986, -0.018272546040961967, -0.016194229282786295, -0.013548455378535277, -0.010434816560227654, -0.006968970878034877, -0.003278362849711694, 0.000502446600110771, 0.004236670373186193, 0.0077902284566855814, 0.011036546848591278, 0.013861050933970996, 0.016165194330018767, 0.017869882057518553, 0.01891816966244776, 0.019277146752392636, 0.01893894333724857, 0.017920829278127274, 0.0162644098949849, 0.014033953183273643, 0.011313914984843538, 0.00820575675246622, 0.004824175245732497, 0.0012928837394950846, -0.0022599005791213113, -0.005706098907220705, -0.008922375207687903, -0.011794537611399822, -0.014221580220908822, -0.016119222698914113, -0.017422824044149753, -0.018089570277005272, -0.01809986251175298, -0.017457861099069306, -0.01619117211789458, -0.014349693373371622, -0.012003667108840474, -0.009241014792974313, -0.006164054601681803, -0.00288572369236315, 0.0004745556791246737, 0.003795215298347181, 0.006956928131950138, 0.009846885538204125, 0.012362811618869226, 0.014416572236459363, 0.015937251718093518, 0.016873590218746893, 0.017195698378100685, 0.01689599240346669, 0.015989321077525858, 0.014512285394286761, 0.012521780516740744, 0.010092817486633753, 0.007315707613653824, 0.0042927148278217985, 0.0011342997129974225, -0.0020449071852038756, -0.005130256336018512, -0.00801120450907917, -0.010585266265319427, -0.01276165072704259, -0.014464454892881569, -0.015635301501008097, -0.016235330098322766, -0.016246473778920374, -0.015671980138039405, -0.014536162397811676, -0.012883394406511473, -0.010776390295785835, -0.008293835032514664, -0.005527455019883997, -0.0025786374787311523, 0.00044527710720885545, 0.00343489420382719, 0.006282714748992388, 0.008886992680555542, 0.011155362326670436, 0.013008106613052252, 0.014380950720827823, 0.015227283570403101, 0.015519730650216062, 0.01525102547510591, 0.014434152478515391, 0.013101760489221409, 0.01130487216584272, 0.009110939920087482, 0.006601322055340094, 0.0038682732591371672, 0.0010115604994045241, -0.0018651718021297716, -0.004658155147203015, -0.007267233215005199, -0.009599446712350634, -0.011572338750193775, -0.01311686345413317, -0.014179795447794174, -0.014725556373158514, -0.014737396045296133, -0.014217889394259072, -0.013188735166032745, -0.011689867538738146, -0.009777916452952824, -0.007524075673777697, -0.0050114585708404685, -0.0023320395799058687, 0.0004167063332601263, 0.0031353436455480977, 0.005726067345653413, 0.008096215625861642, 0.01016157824917276, 0.01184938267931166, 0.013100852291116547, 0.013873246941651563, 0.014141315284372175, 0.013898109746427759, 0.013155138275635352, 0.011941850956704098, 0.010304483529350757, 0.008304302854202653, 0.006015320643635044, 0.0035215605486490476, 0.0009139793080116005, -0.0017128454224474997, -0.0042641401429189835, -0.006648349638934353, -0.008780417363361988, -0.010584814720558453, -0.01199821154668366, -0.012971693547757781, -0.013472449243730023, -0.013484868452041134, -0.013011015813531255, -0.012070465535044868, -0.010699506575512443, -0.008949750104930179, -0.006886192408200968, -0.0045848057273313635, -0.0021297461515798477, 0.0003897190079015241, 0.002882452347159694, 0.00525873849237649, 0.0074335084629475415, 0.00932938055493529, 0.01087940920630405, 0.012029444354886511, 0.012740018301365378, 0.012987694504099926, 0.012765832419741692, 0.012084743744086105, 0.010971237430011879, 0.009467572867858893, 0.007629861816774684, 0.005525979314818971, 0.0032330611722886367, 0.0008346801528636334, -0.0015821959367462552, -0.0039303536793744934, -0.0061254770978932255, -0.008089171198508062, -0.009751757727294544, -0.011054743578588619, -0.011952874552510076, -0.012415702500227227, -0.012428611753062393, -0.011993270450890797, -0.011127493248361146, -0.00986452312836932, -0.008251760924684203, -0.006348990900594771, -0.004226168642923303, -0.00196085297493329, 0.00036462397650800207, 0.0026661454378641585, 0.004860849014825579, 0.0068701064222144205, 0.008622336895742185, 0.010055553745554325, 0.011119553581954659, 0.011777671023725008, 0.012008037696512604, 0.01180430245485111, 0.011175789354614307, 0.010147090251417707, 0.008757109269084877, 0.0070575960378010845, 0.005111222839974676, 0.002989276973249491, 0.0007690531719901142, -0.0014689586541772584, -0.003643988164408206, -0.005677896380865041, -0.007497979678146477, -0.009039565462087224, -0.01024830697967439, -0.011082095945881183, -0.011512525794514622, -0.011525854837817467, -0.011123436850177802, -0.010321605911084135, -0.009151022051349732, -0.007655503633602483, -0.005890390766774864, -0.003920500748176456, -0.00181775095215376, 0.00034146376800158374, 0.002479043635530234, 0.004518005946773812, 0.006385254645890298, 0.00801419794120358, 0.00934712032668465, 0.010337224617962755, 0.01095027185696846, 0.011165761729261104, 0.010977612930099979, 0.010394321096434157, 0.009438590831876054, 0.008146457306617826, 0.006565931231642997, 0.00475521802978871, 0.002780577147874864, 0.0007139001378576596, -0.001369904065589421, -0.003395621669249799, -0.005290446219303019, -0.006986592765312864, -0.008423720219408543, -0.009551075436950555, -0.01032928292580809, -0.010731717169448806, -0.01074540984241405, -0.010371461145725017, -0.009624942477342155, -0.008534296027125727, -0.007140254983704511, -0.005494325211784335, -0.003656884888260876, -0.0016949721175543067, 0.0003201584978612304, 0.002315621360742135, 0.004219533726619187, 0.005963602802239651, 0.007485573067958143, 0.008731446205591017, 0.009657394555647326, 0.010231300384061524, 0.010433866988460598, 0.010259263312952176, 0.009715280697791269, 0.008822998050225411, 0.0076159694466310926, 0.006138965325258723, 0.004446314388220614, 0.0025999075307663287, 0.0006669370509704496, -0.0012825463572191324, -0.0031781700826475096, -0.0049517777813421595, -0.006539877796710979, -0.007885913935309566, -0.008942277459154584, -0.009671988793343446, -0.01004998962380647, -0.010064000326069966, -0.009714913500121096, -0.009016711212553347, -0.007995910755341304, -0.0066905606996320345, -0.005148825142610493]}

},{}],111:[function(require,module,exports){
module.exports={"x": [5.0, 5.190380761523046, 5.380761523046092, 5.571142284569138, 5.761523046092185, 5.95190380761523, 6.142284569138276, 6.332665330661323, 6.5230460921843685, 6.713426853707415, 6.903807615230461, 7.094188376753507, 7.284569138276553, 7.474949899799599, 7.6653306613226455, 7.855711422845691, 8.046092184368737, 8.236472945891784, 8.42685370741483, 8.617234468937875, 8.807615230460922, 8.997995991983968, 9.188376753507015, 9.37875751503006, 9.569138276553106, 9.759519038076153, 9.949899799599198, 10.140280561122244, 10.330661322645291, 10.521042084168336, 10.711422845691382, 10.901803607214429, 11.092184368737474, 11.28256513026052, 11.472945891783567, 11.663326653306612, 11.85370741482966, 12.044088176352705, 12.23446893787575, 12.424849699398798, 12.615230460921843, 12.80561122244489, 12.995991983967937, 13.186372745490981, 13.376753507014028, 13.567134268537075, 13.75751503006012, 13.947895791583166, 14.138276553106213, 14.328657314629258, 14.519038076152304, 14.70941883767535, 14.899799599198397, 15.090180360721442, 15.280561122244489, 15.470941883767535, 15.66132264529058, 15.851703406813627, 16.04208416833667, 16.232464929859717, 16.422845691382765, 16.613226452905813, 16.803607214428858, 16.993987975951903, 17.184368737474948, 17.374749498997996, 17.56513026052104, 17.75551102204409, 17.945891783567134, 18.13627254509018, 18.326653306613224, 18.517034068136272, 18.70741482965932, 18.897795591182366, 19.08817635270541, 19.278557114228455, 19.4689378757515, 19.65931863727455, 19.849699398797597, 20.04008016032064, 20.230460921843687, 20.42084168336673, 20.61122244488978, 20.801603206412825, 20.991983967935873, 21.182364729458918, 21.372745490981963, 21.56312625250501, 21.753507014028056, 21.9438877755511, 22.13426853707415, 22.324649298597194, 22.51503006012024, 22.705410821643287, 22.895791583166332, 23.086172344689377, 23.276553106212425, 23.46693386773547, 23.657314629258515, 23.847695390781563, 24.03807615230461, 24.228456913827657, 24.4188376753507, 24.609218436873746, 24.799599198396795, 24.98997995991984, 25.180360721442884, 25.370741482965933, 25.561122244488978, 25.751503006012022, 25.94188376753507, 26.132264529058116, 26.32264529058116, 26.51302605210421, 26.703406813627254, 26.8937875751503, 27.084168336673347, 27.274549098196392, 27.464929859719437, 27.655310621242485, 27.84569138276553, 28.03607214428858, 28.226452905811623, 28.416833667334668, 28.607214428857716, 28.79759519038076, 28.987975951903806, 29.178356713426854, 29.3687374749499, 29.559118236472944, 29.749498997995993, 29.939879759519037, 30.130260521042082, 30.32064128256513, 30.511022044088175, 30.70140280561122, 30.89178356713427, 31.082164328657313, 31.272545090180362, 31.462925851703407, 31.65330661322645, 31.8436873747495, 32.034068136272545, 32.22444889779559, 32.41482965931864, 32.605210420841686, 32.79559118236473, 32.985971943887776, 33.17635270541082, 33.366733466933866, 33.55711422845691, 33.747494989979955, 33.937875751503, 34.12825651302605, 34.3186372745491, 34.50901803607214, 34.699398797595194, 34.88977955911824, 35.08016032064128, 35.27054108216433, 35.46092184368737, 35.65130260521042, 35.84168336673346, 36.03206412825651, 36.22244488977956, 36.412825651302605, 36.60320641282565, 36.7935871743487, 36.983967935871746, 37.17434869739479, 37.364729458917836, 37.55511022044088, 37.745490981963925, 37.93587174348697, 38.12625250501002, 38.31663326653307, 38.50701402805611, 38.69739478957916, 38.8877755511022, 39.07815631262525, 39.2685370741483, 39.45891783567134, 39.64929859719439, 39.83967935871743, 40.03006012024048, 40.22044088176353, 40.410821643286575, 40.60120240480962, 40.791583166332664, 40.98196392785571, 41.172344689378754, 41.362725450901806, 41.55310621242485, 41.743486973947896, 41.93386773547094, 42.124248496993985, 42.31462925851703, 42.50501002004008, 42.69539078156313, 42.88577154308617, 43.07615230460922, 43.26653306613226, 43.45691382765531, 43.64729458917836, 43.8376753507014, 44.02805611222445, 44.21843687374749, 44.40881763527054, 44.59919839679359, 44.789579158316634, 44.97995991983968, 45.170340681362724, 45.36072144288577, 45.551102204408814, 45.741482965931866, 45.93186372745491, 46.122244488977955, 46.312625250501, 46.503006012024045, 46.69338677354709, 46.88376753507014, 47.07414829659319, 47.26452905811623, 47.454909819639276, 47.64529058116232, 47.83567134268537, 48.02605210420842, 48.21643286573146, 48.40681362725451, 48.59719438877755, 48.7875751503006, 48.97795591182365, 49.168336673346694, 49.35871743486974, 49.549098196392784, 49.73947895791583, 49.92985971943887, 50.120240480961925, 50.31062124248497, 50.501002004008015, 50.69138276553106, 50.881763527054105, 51.07214428857716, 51.2625250501002, 51.452905811623246, 51.64328657314629, 51.833667334669336, 52.02404809619238, 52.21442885771543, 52.40480961923848, 52.59519038076152, 52.78557114228457, 52.97595190380761, 53.16633266533066, 53.35671342685371, 53.547094188376754, 53.7374749498998, 53.92785571142284, 54.11823647294589, 54.30861723446894, 54.498997995991985, 54.68937875751503, 54.879759519038075, 55.07014028056112, 55.260521042084164, 55.450901803607216, 55.64128256513026, 55.831663326653306, 56.02204408817635, 56.212424849699396, 56.40280561122244, 56.59318637274549, 56.78356713426854, 56.97394789579158, 57.16432865731463, 57.35470941883767, 57.545090180360724, 57.73547094188377, 57.92585170340681, 58.11623246492986, 58.3066132264529, 58.49699398797595, 58.687374749499, 58.877755511022045, 59.06813627254509, 59.258517034068134, 59.44889779559118, 59.639278557114224, 59.829659318637276, 60.02004008016032, 60.210420841683366, 60.40080160320641, 60.591182364729455, 60.78156312625251, 60.97194388777555, 61.1623246492986, 61.35270541082164, 61.54308617234469, 61.73346693386773, 61.92384769539078, 62.11422845691383, 62.30460921843687, 62.49498997995992, 62.68537074148296, 62.87575150300601, 63.06613226452906, 63.256513026052104, 63.44689378757515, 63.637274549098194, 63.82765531062124, 64.01803607214428, 64.20841683366734, 64.39879759519039, 64.58917835671343, 64.77955911823648, 64.96993987975952, 65.16032064128257, 65.35070140280561, 65.54108216432866, 65.7314629258517, 65.92184368737475, 66.11222444889779, 66.30260521042084, 66.49298597194388, 66.68336673346693, 66.87374749498997, 67.06412825651302, 67.25450901803606, 67.44488977955912, 67.63527054108216, 67.82565130260521, 68.01603206412825, 68.2064128256513, 68.39679358717436, 68.5871743486974, 68.77755511022045, 68.96793587174349, 69.15831663326654, 69.34869739478958, 69.53907815631263, 69.72945891783567, 69.91983967935872, 70.11022044088176, 70.3006012024048, 70.49098196392785, 70.6813627254509, 70.87174348697394, 71.06212424849699, 71.25250501002004, 71.44288577154309, 71.63326653306613, 71.82364729458918, 72.01402805611222, 72.20440881763527, 72.39478957915831, 72.58517034068136, 72.7755511022044, 72.96593186372745, 73.1563126252505, 73.34669338677355, 73.5370741482966, 73.72745490981964, 73.91783567134269, 74.10821643286573, 74.29859719438878, 74.48897795591182, 74.67935871743487, 74.86973947895791, 75.06012024048096, 75.250501002004, 75.44088176352706, 75.6312625250501, 75.82164328657315, 76.0120240480962, 76.20240480961924, 76.39278557114228, 76.58316633266533, 76.77354709418837, 76.96392785571142, 77.15430861723446, 77.34468937875751, 77.53507014028055, 77.72545090180361, 77.91583166332666, 78.1062124248497, 78.29659318637275, 78.48697394789579, 78.67735470941884, 78.86773547094188, 79.05811623246493, 79.24849699398797, 79.43887775551102, 79.62925851703406, 79.81963927855712, 80.01002004008016, 80.20040080160321, 80.39078156312625, 80.5811623246493, 80.77154308617234, 80.96192384769539, 81.15230460921843, 81.34268537074148, 81.53306613226452, 81.72344689378757, 81.91382765531063, 82.10420841683367, 82.29458917835672, 82.48496993987976, 82.6753507014028, 82.86573146292585, 83.0561122244489, 83.24649298597194, 83.43687374749499, 83.62725450901803, 83.81763527054107, 84.00801603206412, 84.19839679358718, 84.38877755511022, 84.57915831663327, 84.76953907815631, 84.95991983967936, 85.1503006012024, 85.34068136272545, 85.53106212424849, 85.72144288577154, 85.91182364729458, 86.10220440881763, 86.29258517034069, 86.48296593186373, 86.67334669338678, 86.86372745490982, 87.05410821643287, 87.24448897795591, 87.43486973947896, 87.625250501002, 87.81563126252505, 88.00601202404809, 88.19639278557113, 88.38677354709418, 88.57715430861724, 88.76753507014028, 88.95791583166333, 89.14829659318637, 89.33867735470942, 89.52905811623246, 89.71943887775551, 89.90981963927855, 90.1002004008016, 90.29058116232464, 90.48096192384769, 90.67134268537075, 90.86172344689379, 91.05210420841684, 91.24248496993988, 91.43286573146293, 91.62324649298597, 91.81362725450902, 92.00400801603206, 92.1943887775551, 92.38476953907815, 92.5751503006012, 92.76553106212425, 92.9559118236473, 93.14629258517034, 93.33667334669339, 93.52705410821643, 93.71743486973948, 93.90781563126252, 94.09819639278557, 94.28857715430861, 94.47895791583166, 94.6693386773547, 94.85971943887775, 95.0501002004008, 95.24048096192385, 95.4308617234469, 95.62124248496994, 95.81162324649299, 96.00200400801603, 96.19238476953907, 96.38276553106212, 96.57314629258516, 96.76352705410821, 96.95390781563125, 97.14428857715431, 97.33466933867736, 97.5250501002004, 97.71543086172345, 97.90581162324649, 98.09619238476954, 98.28657314629258, 98.47695390781563, 98.66733466933867, 98.85771543086172, 99.04809619238476, 99.23847695390782, 99.42885771543087, 99.61923847695391, 99.80961923847696, 100.0], "si": [1.549931244944674, 1.5153108702529772, 1.4850797438003784, 1.4599872237264009, 1.4405643427676107, 1.4271215631851475, 1.4197527927038536, 1.418345347149439, 1.4225953806203733, 1.4320281568490687, 1.4460224100049486, 1.4638379429558177, 1.484645538497189, 1.5075582159555305, 1.5316628526148013, 1.5560512064106455, 1.579849422167846, 1.6022451763368937, 1.6225117119310617, 1.6400281326946353, 1.6542954593865427, 1.6649480969406505, 1.6717605143702674, 1.6746490946883694, 1.6736692649053726, 1.6690081616067163, 1.6609732212890784, 1.649977202589475, 1.6365202463934316, 1.6211696568471476, 1.6045381395620761, 1.5872612616238058, 1.5699749010566038, 1.5532934316237261, 1.5377893435226075, 1.5239749336573185, 1.5122866133878334, 1.503072280174477, 1.4965820860083554, 1.4929628139143238, 1.4922559482845057, 1.494399399544296, 1.4992327227723323, 1.5065055572683155, 1.5158889132161801, 1.5269888455951546, 1.5393619868669954, 1.552532360609909, 1.5660088693991578, 1.5793028423691073, 1.5919450408422136, 1.6035015532997827, 1.613588062273312, 1.621882033345657, 1.628132457756552, 1.6321668720880784, 1.6338954778442114, 1.6333122869333292, 1.6304933225496634, 1.6255920052234207, 1.6188319475386432, 1.6104974651554005, 1.6009221836523062, 1.590476178124769, 1.5795521237623176, 1.5685509596912557, 1.5578675747178603, 1.547877012364455, 1.5389216644743482, 1.5312998789519696, 1.525256349690606, 1.520974587650193, 1.5185716939662361, 1.518095571744744, 1.5195246258344643, 1.5227699124295566, 1.5276796158557728, 1.5340456511916383, 1.541612121085566, 1.5500852955296858, 1.5591447363146689, 1.568455154826463, 1.5776785736602073, 1.5864863595953045, 1.5945707076426832, 1.60165518246576, 1.6075039633279726, 1.6119294902293968, 1.6147982700824037, 1.616034670357114, 1.6156226010969097, 1.613605061927327, 1.610081605985819, 1.6052038449684354, 1.5991691862511481, 1.592213052056154, 1.584599879958104, 1.5766132420891985, 1.5685454460482284, 1.5606869930394935, 1.5533162679233534, 1.5466898218808627, 1.5410335819651313, 1.5365352840410977, 1.5333383779926308, 1.5315375984135529, 1.5311763323648064, 1.5322458504207137, 1.53468640048904, 1.5383900981339669, 1.543205484652454, 1.548943567101062, 1.5553851047706928, 1.5622888659056764, 1.5694005480681383, 1.576462036386647, 1.583220666521142, 1.5894381636260484, 1.594898944584492, 1.5994174976016453, 1.6028445897964931, 1.6050720983026205, 1.6060363118895704, 1.6057196063450587, 1.6041504557707928, 1.6014018014282574, 1.597587857719469, 1.5928594892757009, 1.5873983420794076, 1.5814099534007333, 1.5751160987001998, 1.5687466574597941, 1.5625312934321656, 1.5566912476900077, 1.5514315351422883, 1.5469338172623133, 1.543350196401555, 1.5407981413244087, 1.539356710856986, 1.5390641943935466, 1.5399172362155595, 1.5418714570271792, 1.5448435327142458, 1.548714638981605, 1.55333512301145, 1.5585302212533056, 1.5641066073315393, 1.569859527005807, 1.5755802590117773, 1.5810636319856433, 1.586115328736472, 1.5905587197301982, 1.5942409873066061, 1.5970383300688502, 1.5988600719826773, 1.5996515416754755, 1.5993956327160985, 1.5981130036300246, 1.5958609253280476, 1.592730831752292, 1.5888446751693563, 1.584350229071856, 1.5794155176533429, 1.5742225800754426, 1.5689607992800734, 1.5638200382278515, 1.558983830785796, 1.5546228699786127, 1.5508890232086592, 1.5479100828936037, 1.5457854326016909, 1.544582774264273, 1.5443360227029217, 1.5450444309725446, 1.5466729654473552, 1.5491539047684686, 1.5523895933281044, 1.5562562394197714, 1.560608611952335, 1.5652854589575453, 1.570115447054478, 1.5749234043647788, 1.5795366406231388, 1.5837911176348254, 1.5875372507405283, 1.590645137214539, 1.5930090299286161, 1.594550903295558, 1.595222992382612, 1.5950092238995446, 1.59392549813464, 1.5920188223709566, 1.5893653373760146, 1.5860673177595277, 1.582249262953971, 1.5780532270377037, 1.5736335615074173, 1.5691512645416938, 1.5647681426439162, 1.560640995432612, 1.5569160316518849, 1.5537237143664697, 1.5511742162105933, 1.549353642148301, 1.5483211483658084, 1.5481070527303022, 1.5487119959369675, 1.5501071743506016, 1.5522356270068294, 1.5550145216511546, 1.5583383493967025, 1.5620829058154708, 1.566109909148836, 1.5702720847617857, 1.5744185296963067, 1.5784001626963136, 1.5820750636268694, 1.5853135117884198, 1.5880025449756392, 1.5900498797536986, 1.5913870576057434, 1.5919717104346305, 1.5917888713113169, 1.590851291164078, 1.5891987580332403, 1.5868964512813104, 1.5840323974702812, 1.5807141262801727, 1.5770646527336776, 1.573217935142845, 1.569313975813618, 1.565493743045217, 1.5618940979795617, 1.5586429082614737, 1.5558545223710645, 1.553625764225041, 1.5520325877711239, 1.5511275065731784, 1.5509378847257784, 1.5514651439012164, 1.552684908070019, 1.5545480736514774, 1.556982759757068, 1.559897061966718, 1.5631825048298151, 1.5667180639993274, 1.5703746094288922, 1.5740196070517243, 1.5775219082786542, 1.5807564547469517, 1.583608730045407, 1.5859788004359805, 1.5877848024762726, 1.5889657563111426, 1.5894836084630104, 1.5893244362810228, 1.588498776771156, 1.587041074211653, 1.5850082726178307, 1.582477609622902, 1.579543696602042, 1.5763149948883017, 1.5729098188368669, 1.5694520125676379, 1.5660664579123889, 1.562874576065348, 1.559989984545846, 1.5575144644006156, 1.5555343803802244, 1.5541176795934735, 1.5533115725271214, 1.5531409751205536, 1.5536077627334535, 1.5546908573555485, 1.556347139349398, 1.558513145471605, 1.5611074869408674, 1.5640338959059281, 1.567184786707335, 1.570445200588897, 1.57369698960644, 1.5768230878344447, 1.5797117158255274, 1.5822603676748859, 1.58437943882412, 1.5859953665566362, 1.5870531734621347, 1.5875183262942556, 1.5873778477944434, 1.5866406462851141, 1.5853370561561126, 1.5835176107571916, 1.5812510966467612, 1.578621963654861, 1.575727187892964, 1.5726727038887771, 1.5695695367797358, 1.5665297754614265, 1.5636625324287596, 1.5610700356261187, 1.5588439919853636, 1.5570623517117188, 1.5557865871887637, 1.5550595811879715, 1.5549041965984127, 1.5553225749648347, 1.5562961846469905, 1.5577866123495632, 1.559737065095436, 1.5620745243808116, 1.5647124711603315, 1.5675540802796148, 1.570495766702571, 1.5734309539334492, 1.5762539278124026, 1.5788636365998974, 1.5811673010119027, 1.583083705496509, 1.5845460542511454, 1.5855042918028583, 1.5859268078021596, 1.5858014682814305, 1.585135940174166, 1.5839573014886872, 1.5823109552540124, 1.5802588902816592, 1.577877355024468, 1.5752540315370502, 1.5724848140219296, 1.5696703100713367, 1.5669121920190914, 1.5643095304900971, 1.5619552421346732, 1.5599327786915245, 1.558313175136967, 1.5571525611115096, 1.5564902225785893, 1.5563472804036718, 1.5567260299899206, 1.557609962092024, 1.558964460323452, 1.5607381465617312, 1.5628648223132795, 1.5652659329491363, 1.5678534633148433, 1.5705331581984456, 1.5732079500315803, 1.5757814693781154, 1.5781615114549643, 1.5802633341894055, 1.5820126700409667, 1.5833483447382746, 1.5842244107874577, 1.5846117215501112, 1.5844988922036136, 1.5838926162337974, 1.582817329457203, 1.5813142370828632, 1.579439742155781, 1.5772633350587297, 1.5748650228266585, 1.5723323931746491, 1.5697574207907827, 1.5672331321626498, 1.5648502496974024, 1.5626939360204084, 1.560840755114521, 1.5593559585647598, 1.5582911929248984, 1.5576827085830034, 1.5575501320518372, 1.557895843024773, 1.5587049755694466, 1.559946040276555, 1.5615721418539832, 1.5635227453585026, 1.565725924749274, 1.5681010104219706, 1.5705615384393394, 1.5730183937996507, 1.5753830336341221, 1.5775706739107693, 1.5795033251080242, 1.5811125683185479, 1.5823419731161301, 1.5831490718924637, 1.5835068217479216, 1.5834045037976234, 1.582848030244112, 1.5818596510256757, 1.5804770734982694, 1.5787520296695725, 1.5767483452212685, 1.5745395822273545, 1.5722063424763058, 1.5698333301064316, 1.5675062804574074, 1.5653088663491714, 1.5633196932854783, 1.561609491352131, 1.5602386039921998, 1.5592548626834821, 1.5586919222351312, 1.5585681144902526, 1.5588858592906034, 1.5596316513187032, 1.5607766206159093, 1.562277643933934, 1.5640789643536765, 1.5661142585044545, 1.5683090748825996, 1.5705835537601174, 1.5728553294468917, 1.5750425095586764, 1.5770666236512874, 1.5788554351740949, 1.580345516098176, 1.58148449257469, 1.582232882237122, 1.582565458821191, 1.5824720970839763, 1.5819580699262632, 1.5810437894711216, 1.5797640039089034, 1.5781664814614877, 1.5763102311457389, 1.5742633264736459, 1.5721004122304958, 1.5698999855295825, 1.5677415500674157, 1.5657027466338291, 1.5638565633338644, 1.5622687256547205, 1.5609953595972692, 1.5600810108521228, 1.55955708981801, 1.5594407966224781, 1.5597345627851378, 1.5604260274005424, 1.5614885463920012, 1.5628822141971987, 1.5645553588815795, 1.566446454793515, 1.5684863820776542, 1.5706009501732607, 1.572713593270461, 1.574748139895748, 1.5766315565434277, 1.57829656662811, 1.5796840509407029, 1.5807451440550166, 1.5814429524424587, 1.5817538339884256, 1.5816681946532218, 1.5811907755960808, 1.580340422544024, 1.579149347869553, 1.5776619140690065, 1.5759329844525358, 1.5740259022553273, 1.5720101725106475, 1.5699589314251206, 1.5679462953021874, 1.5660446850205587, 1.5643222225618507, 1.5628402930919925, 1.5616513597563602, 1.5607971088908943, 1.5603069911339316, 1.56019720939716, 1.5604701883513505, 1.5611145425975173, 1.5621055426611854, 1.5634060600180604, 1.5649679551787217, 1.5667338570436378, 1.5686392678518972, 1.5706149165799255, 1.572589275003402, 1.5744911451166232, 1.576252224394985, 1.5778095565545793, 1.579107779952633, 1.5801010934089763, 1.5807548697244787, 1.581046860138304, 1.5809679479252887, 1.5805224257412265, 1.5797277885809347, 1.5786140516968064, 1.5772226199037476, 1.5756047507564244, 1.5738196685521966, 1.5719323984731366, 1.5700113999960976, 1.5681260856272268, 1.5663443148182, 1.56472995347092, 1.5633405867280965, 1.5622254668890563], "ci": [-0.1900297496566439, -0.1761132088998822, -0.15662448700257026, -0.13263104744022836, -0.1052737270421524, -0.07572788710100596, -0.04516557896078838, -0.014719711429420024, 0.014548865083133203, 0.0416805431698791, 0.06584172145483987, 0.08634459917744722, 0.10266161315325278, 0.1144342945631242, 0.12147649318157047, 0.12377208494384244, 0.12146743995536226, 0.11485907728236913, 0.1043770657196301, 0.0905648423999146, 0.07405621048777625, 0.05555034097486501, 0.03578564030229997, 0.015513354594425731, -0.004528237002618521, -0.0236382318666052, -0.04117537702780445, -0.056577556820667854, -0.0693779544458781, -0.07921746964110045, -0.0858531076093665, -0.0891621929785419, -0.0891424023044073, -0.08590774497851915, -0.07968075105358373, -0.07078124148059908, -0.05961215804652174, -0.04664301395335911, -0.032391589181322365, -0.01740453593256397, -0.00223757771028973, 0.012564019133303048, 0.026484049579097398, 0.03905244600948211, 0.04986028915770902, 0.05857230002766899, 0.06493645511822171, 0.06879047320189129, 0.0700650337654414, 0.06878370116795252, 0.06505964076596152, 0.059089319984715054, 0.0511434851243263, 0.04155579048952385, 0.03070952759312301, 0.01902295661851673, 0.0069337785483330125, -0.00511669647234304, -0.016699131059729113, -0.02741096020395763, -0.03688991455787207, -0.044825828017827044, -0.05097035871084521, -0.05514433226943713, -0.0572425043757162, -0.05723563282658731, -0.05516984453063764, -0.05116337660933652, -0.045400859961649595, -0.038125395296577894, -0.029628743086958082, -0.020240007889774616, -0.010313242218402583, -0.00021442436461058083, 0.00969172246943194, 0.01905460580948669, 0.027549889829728186, 0.034890461535598764, 0.04083587524036979, 0.04519997310384816, 0.04785644865777804, 0.048742196264035406, 0.04785836959078141, 0.045269153603588304, 0.041098334410978876, 0.03552382683495233, 0.02877038824823881, 0.021100806760655524, 0.012805900328569701, 0.004193699298630829, -0.004421792767148349, -0.012731856962037949, -0.02044393862110318, -0.027291771470003272, -0.033044401884204225, -0.037513813042345044, -0.04056090280468527, -0.04209963096847259, -0.04209921886860582, -0.040584354668406056, -0.037633428615170425, -0.0333748915293748, -0.027981894469573936, -0.021665425667140893, -0.014666210515238986, -0.0072456800073429795, 0.0003236586900408193, 0.007768099706979413, 0.01482251056255857, 0.021239654355412703, 0.02679873842442972, 0.03131289784847401, 0.034635363971839514, 0.03666411817552049, 0.03734488749129916, 0.036672399306745734, 0.034689875142820445, 0.03148680606614682, 0.027195112524341546, 0.021983847175738713, 0.01605264871848188, 0.009624196150191474, 0.002935944953064427, -0.0037685516082300997, -0.010248422197935342, -0.01627404479900792, -0.02163510007222039, -0.02614783112103067, -0.02966126185340836, -0.03206216625371776, -0.033278627845292834, -0.03328208069322549, -0.03208777856416136, -0.029753695332816504, -0.026377915392176314, -0.022094625727093684, -0.017068869611341023, -0.011490263932405993, -0.0055659165231820434, 0.00048719454061077233, 0.006450101735884156, 0.012109705107153592, 0.01726632583924666, 0.0217406908143503, 0.02538010593215444, 0.028063607654025567, 0.029705921026373726, 0.030260096888673618, 0.029718749438033855, 0.02811386604083442, 0.025515212328579014, 0.022027405370399437, 0.017785774328443985, 0.0129511698548403, 0.007703919146459512, 0.0022371518377187287, -0.0032502581415043545, -0.008560878605058398, -0.01350577512988741, -0.01791118655603016, -0.021624585720633936, -0.024519915597169553, -0.02650182264027035, -0.02750874677773458, -0.027514769743615018, -0.026530168759981265, -0.02460066930697508, -0.021805437194571353, -0.01825389471448091, -0.014081486740743141, -0.009444558835745305, -0.004514539466026722, 0.0005283586688325237, 0.005501688184770984, 0.010227330772579988, 0.014537840347978448, 0.018282340973862016, 0.021331773047717894, 0.023583306547061495, 0.02496377164329146, 0.025431993547020873, 0.024979958685208678, 0.023632781763418736, 0.02144748640136133, 0.018510654302712957, 0.01493503783233617, 0.0108552670246767, 0.0064228131824299005, 0.001800396280840345, -0.002843958467234098, -0.007342998890513081, -0.011536240158780027, -0.015275661290423466, -0.018430902658390935, -0.020893782960273496, -0.02258198010082393, -0.02344175174142868, -0.023449606736270574, -0.022612876996470903, -0.02096917910831442, -0.018584794846661316, -0.015552038148148921, -0.011985711781045329, -0.00801878861976524, -0.003797479005689533, 0.0005241337531074596, 0.004789693805619498, 0.008846206407410268, 0.012549502643771382, 0.015769340844605365, 0.018393964965261377, 0.02033396116824646, 0.021525280304300707, 0.021931324966242956, 0.02154403413088056, 0.02038393485791089, 0.018499167759770157, 0.015963529654952405, 0.0128736116619523, 0.009345142750998946, 0.005508676335562634, 0.0015047799034332127, -0.0025210958023247692, -0.006423881482216324, -0.010064097987514327, -0.013312822686553023, -0.016056237306438025, -0.018199597459518345, -0.0196704860491432, -0.020421239496340147, -0.020430466244064874, -0.01970361015754986, -0.018272546040961967, -0.016194229282786295, -0.013548455378535277, -0.010434816560227654, -0.006968970878034877, -0.003278362849711694, 0.000502446600110771, 0.004236670373186193, 0.0077902284566855814, 0.011036546848591278, 0.013861050933970996, 0.016165194330018767, 0.017869882057518553, 0.01891816966244776, 0.019277146752392636, 0.01893894333724857, 0.017920829278127274, 0.0162644098949849, 0.014033953183273643, 0.011313914984843538, 0.00820575675246622, 0.004824175245732497, 0.0012928837394950846, -0.0022599005791213113, -0.005706098907220705, -0.008922375207687903, -0.011794537611399822, -0.014221580220908822, -0.016119222698914113, -0.017422824044149753, -0.018089570277005272, -0.01809986251175298, -0.017457861099069306, -0.01619117211789458, -0.014349693373371622, -0.012003667108840474, -0.009241014792974313, -0.006164054601681803, -0.00288572369236315, 0.0004745556791246737, 0.003795215298347181, 0.006956928131950138, 0.009846885538204125, 0.012362811618869226, 0.014416572236459363, 0.015937251718093518, 0.016873590218746893, 0.017195698378100685, 0.01689599240346669, 0.015989321077525858, 0.014512285394286761, 0.012521780516740744, 0.010092817486633753, 0.007315707613653824, 0.0042927148278217985, 0.0011342997129974225, -0.0020449071852038756, -0.005130256336018512, -0.00801120450907917, -0.010585266265319427, -0.01276165072704259, -0.014464454892881569, -0.015635301501008097, -0.016235330098322766, -0.016246473778920374, -0.015671980138039405, -0.014536162397811676, -0.012883394406511473, -0.010776390295785835, -0.008293835032514664, -0.005527455019883997, -0.0025786374787311523, 0.00044527710720885545, 0.00343489420382719, 0.006282714748992388, 0.008886992680555542, 0.011155362326670436, 0.013008106613052252, 0.014380950720827823, 0.015227283570403101, 0.015519730650216062, 0.01525102547510591, 0.014434152478515391, 0.013101760489221409, 0.01130487216584272, 0.009110939920087482, 0.006601322055340094, 0.0038682732591371672, 0.0010115604994045241, -0.0018651718021297716, -0.004658155147203015, -0.007267233215005199, -0.009599446712350634, -0.011572338750193775, -0.01311686345413317, -0.014179795447794174, -0.014725556373158514, -0.014737396045296133, -0.014217889394259072, -0.013188735166032745, -0.011689867538738146, -0.009777916452952824, -0.007524075673777697, -0.0050114585708404685, -0.0023320395799058687, 0.0004167063332601263, 0.0031353436455480977, 0.005726067345653413, 0.008096215625861642, 0.01016157824917276, 0.01184938267931166, 0.013100852291116547, 0.013873246941651563, 0.014141315284372175, 0.013898109746427759, 0.013155138275635352, 0.011941850956704098, 0.010304483529350757, 0.008304302854202653, 0.006015320643635044, 0.0035215605486490476, 0.0009139793080116005, -0.0017128454224474997, -0.0042641401429189835, -0.006648349638934353, -0.008780417363361988, -0.010584814720558453, -0.01199821154668366, -0.012971693547757781, -0.013472449243730023, -0.013484868452041134, -0.013011015813531255, -0.012070465535044868, -0.010699506575512443, -0.008949750104930179, -0.006886192408200968, -0.0045848057273313635, -0.0021297461515798477, 0.0003897190079015241, 0.002882452347159694, 0.00525873849237649, 0.0074335084629475415, 0.00932938055493529, 0.01087940920630405, 0.012029444354886511, 0.012740018301365378, 0.012987694504099926, 0.012765832419741692, 0.012084743744086105, 0.010971237430011879, 0.009467572867858893, 0.007629861816774684, 0.005525979314818971, 0.0032330611722886367, 0.0008346801528636334, -0.0015821959367462552, -0.0039303536793744934, -0.0061254770978932255, -0.008089171198508062, -0.009751757727294544, -0.011054743578588619, -0.011952874552510076, -0.012415702500227227, -0.012428611753062393, -0.011993270450890797, -0.011127493248361146, -0.00986452312836932, -0.008251760924684203, -0.006348990900594771, -0.004226168642923303, -0.00196085297493329, 0.00036462397650800207, 0.0026661454378641585, 0.004860849014825579, 0.0068701064222144205, 0.008622336895742185, 0.010055553745554325, 0.011119553581954659, 0.011777671023725008, 0.012008037696512604, 0.01180430245485111, 0.011175789354614307, 0.010147090251417707, 0.008757109269084877, 0.0070575960378010845, 0.005111222839974676, 0.002989276973249491, 0.0007690531719901142, -0.0014689586541772584, -0.003643988164408206, -0.005677896380865041, -0.007497979678146477, -0.009039565462087224, -0.01024830697967439, -0.011082095945881183, -0.011512525794514622, -0.011525854837817467, -0.011123436850177802, -0.010321605911084135, -0.009151022051349732, -0.007655503633602483, -0.005890390766774864, -0.003920500748176456, -0.00181775095215376, 0.00034146376800158374, 0.002479043635530234, 0.004518005946773812, 0.006385254645890298, 0.00801419794120358, 0.00934712032668465, 0.010337224617962755, 0.01095027185696846, 0.011165761729261104, 0.010977612930099979, 0.010394321096434157, 0.009438590831876054, 0.008146457306617826, 0.006565931231642997, 0.00475521802978871, 0.002780577147874864, 0.0007139001378576596, -0.001369904065589421, -0.003395621669249799, -0.005290446219303019, -0.006986592765312864, -0.008423720219408543, -0.009551075436950555, -0.01032928292580809, -0.010731717169448806, -0.01074540984241405, -0.010371461145725017, -0.009624942477342155, -0.008534296027125727, -0.007140254983704511, -0.005494325211784335, -0.003656884888260876, -0.0016949721175543067, 0.0003201584978612304, 0.002315621360742135, 0.004219533726619187, 0.005963602802239651, 0.007485573067958143, 0.008731446205591017, 0.009657394555647326, 0.010231300384061524, 0.010433866988460598, 0.010259263312952176, 0.009715280697791269, 0.008822998050225411, 0.0076159694466310926, 0.006138965325258723, 0.004446314388220614, 0.0025999075307663287, 0.0006669370509704496, -0.0012825463572191324, -0.0031781700826475096, -0.0049517777813421595, -0.006539877796710979, -0.007885913935309566, -0.008942277459154584, -0.009671988793343446, -0.01004998962380647, -0.010064000326069966, -0.009714913500121096, -0.009016711212553347, -0.007995910755341304, -0.0066905606996320345, -0.005148825142610493]}

},{}],112:[function(require,module,exports){
module.exports={"x": [-0.25, -0.2595190380761523, -0.26903807615230463, -0.2785571142284569, -0.2880761523046092, -0.29759519038076154, -0.30711422845691383, -0.3166332665330661, -0.32615230460921846, -0.33567134268537074, -0.3451903807615231, -0.35470941883767537, -0.36422845691382766, -0.37374749498997994, -0.3832665330661323, -0.3927855711422846, -0.4023046092184369, -0.4118236472945892, -0.4213426853707415, -0.4308617234468938, -0.4403807615230461, -0.4498997995991984, -0.45941883767535074, -0.46893787575150303, -0.4784569138276553, -0.4879759519038076, -0.49749498997995995, -0.5070140280561122, -0.5165330661322646, -0.5260521042084169, -0.5355711422845691, -0.5450901803607215, -0.5546092184368738, -0.5641282565130261, -0.5736472945891784, -0.5831663326653307, -0.592685370741483, -0.6022044088176353, -0.6117234468937875, -0.6212424849699398, -0.6307615230460922, -0.6402805611222445, -0.6497995991983968, -0.6593186372745492, -0.6688376753507015, -0.6783567134268538, -0.6878757515030061, -0.6973947895791583, -0.7069138276553106, -0.7164328657314629, -0.7259519038076152, -0.7354709418837676, -0.7449899799599199, -0.7545090180360722, -0.7640280561122245, -0.7735470941883767, -0.7830661322645291, -0.7925851703406814, -0.8021042084168337, -0.811623246492986, -0.8211422845691383, -0.8306613226452906, -0.840180360721443, -0.8496993987975953, -0.8592184368737475, -0.8687374749498998, -0.8782565130260521, -0.8877755511022045, -0.8972945891783568, -0.9068136272545091, -0.9163326653306614, -0.9258517034068137, -0.935370741482966, -0.9448897795591183, -0.9544088176352706, -0.9639278557114229, -0.9734468937875752, -0.9829659318637275, -0.9924849699398798, -1.0020040080160322, -1.0115230460921845, -1.0210420841683367, -1.030561122244489, -1.0400801603206413, -1.0495991983967936, -1.059118236472946, -1.0686372745490984, -1.0781563126252505, -1.087675350701403, -1.097194388777555, -1.1067134268537075, -1.1162324649298598, -1.1257515030060121, -1.1352705410821644, -1.1447895791583167, -1.154308617234469, -1.1638276553106213, -1.1733466933867738, -1.1828657314629258, -1.1923847695390783, -1.2019038076152304, -1.211422845691383, -1.2209418837675352, -1.2304609218436875, -1.2399799599198398, -1.249498997995992, -1.2590180360721444, -1.2685370741482966, -1.278056112224449, -1.2875751503006012, -1.2970941883767535, -1.306613226452906, -1.3161322645290583, -1.3256513026052106, -1.3351703406813629, -1.3446893787575152, -1.3542084168336674, -1.3637274549098197, -1.373246492985972, -1.3827655310621243, -1.3922845691382766, -1.4018036072144289, -1.4113226452905812, -1.4208416833667337, -1.430360721442886, -1.4398797595190382, -1.4493987975951905, -1.4589178356713428, -1.468436873747495, -1.4779559118236474, -1.4874749498997997, -1.496993987975952, -1.5065130260521042, -1.5160320641282565, -1.525551102204409, -1.5350701402805613, -1.5445891783567136, -1.554108216432866, -1.5636272545090182, -1.5731462925851705, -1.5826653306613228, -1.592184368737475, -1.6017034068136273, -1.6112224448897796, -1.620741482965932, -1.6302605210420842, -1.6397795591182367, -1.649298597194389, -1.6588176352705413, -1.6683366733466936, -1.6778557114228458, -1.6873747494989981, -1.6968937875751504, -1.7064128256513027, -1.715931863727455, -1.7254509018036073, -1.7349699398797596, -1.7444889779559118, -1.7540080160320644, -1.7635270541082166, -1.773046092184369, -1.7825651302605212, -1.7920841683366735, -1.8016032064128258, -1.811122244488978, -1.8206412825651304, -1.8301603206412826, -1.839679358717435, -1.8491983967935872, -1.8587174348697397, -1.868236472945892, -1.8777555110220443, -1.8872745490981966, -1.8967935871743489, -1.9063126252505012, -1.9158316633266534, -1.9253507014028057, -1.934869739478958, -1.9443887775551103, -1.9539078156312626, -1.9634268537074149, -1.9729458917835674, -1.9824649298597197, -1.991983967935872, -2.0015030060120242, -2.0110220440881763, -2.020541082164329, -2.0300601202404813, -2.0395791583166334, -2.0490981963927855, -2.058617234468938, -2.0681362725450905, -2.0776553106212425, -2.087174348697395, -2.0966933867735476, -2.1062124248496996, -2.1157314629258517, -2.125250501002004, -2.1347695390781567, -2.1442885771543088, -2.153807615230461, -2.1633266533066133, -2.172845691382766, -2.182364729458918, -2.1918837675350704, -2.201402805611223, -2.210921843687375, -2.220440881763527, -2.2299599198396796, -2.239478957915832, -2.248997995991984, -2.2585170340681366, -2.2680360721442887, -2.277555110220441, -2.2870741482965933, -2.296593186372746, -2.306112224448898, -2.3156312625250504, -2.3251503006012024, -2.334669338677355, -2.344188376753507, -2.3537074148296595, -2.363226452905812, -2.372745490981964, -2.3822645290581166, -2.3917835671342687, -2.401302605210421, -2.4108216432865732, -2.4203406813627257, -2.429859719438878, -2.4393787575150303, -2.4488977955911824, -2.458416833667335, -2.4679358717434874, -2.4774549098196395, -2.486973947895792, -2.496492985971944, -2.5060120240480965, -2.5155310621242486, -2.525050100200401, -2.534569138276553, -2.5440881763527057, -2.5536072144288577, -2.5631262525050102, -2.5726452905811623, -2.582164328657315, -2.5916833667334673, -2.6012024048096194, -2.610721442885772, -2.620240480961924, -2.6297595190380765, -2.6392785571142285, -2.648797595190381, -2.658316633266533, -2.6678356713426856, -2.6773547094188377, -2.68687374749499, -2.6963927855711427, -2.7059118236472948, -2.7154308617234473, -2.7249498997995993, -2.734468937875752, -2.743987975951904, -2.7535070140280564, -2.7630260521042085, -2.772545090180361, -2.782064128256513, -2.7915831663326656, -2.801102204408818, -2.81062124248497, -2.8201402805611226, -2.8296593186372747, -2.839178356713427, -2.8486973947895793, -2.858216432865732, -2.867735470941884, -2.8772545090180364, -2.8867735470941884, -2.896292585170341, -2.905811623246493, -2.9153306613226455, -2.924849699398798, -2.93436873747495, -2.9438877755511026, -2.9534068136272547, -2.962925851703407, -2.9724448897795592, -2.9819639278557117, -2.991482965931864, -3.0010020040080163, -3.0105210420841684, -3.020040080160321, -3.0295591182364734, -3.0390781563126255, -3.048597194388778, -3.05811623246493, -3.0676352705410825, -3.0771543086172346, -3.086673346693387, -3.096192384769539, -3.1057114228456917, -3.1152304609218437, -3.1247494989979963, -3.1342685370741488, -3.143787575150301, -3.1533066132264533, -3.1628256513026054, -3.172344689378758, -3.18186372745491, -3.1913827655310625, -3.2009018036072145, -3.210420841683367, -3.219939879759519, -3.2294589178356716, -3.2389779559118237, -3.248496993987976, -3.2580160320641287, -3.2675350701402808, -3.2770541082164333, -3.2865731462925853, -3.296092184368738, -3.30561122244489, -3.3151302605210424, -3.3246492985971945, -3.334168336673347, -3.343687374749499, -3.3532064128256516, -3.362725450901804, -3.372244488977956, -3.3817635270541087, -3.3912825651302607, -3.4008016032064132, -3.4103206412825653, -3.419839679358718, -3.42935871743487, -3.4388777555110224, -3.4483967935871744, -3.457915831663327, -3.4674348697394795, -3.4769539078156315, -3.486472945891784, -3.495991983967936, -3.5055110220440886, -3.5150300601202407, -3.524549098196393, -3.5340681362725452, -3.5435871743486977, -3.55310621242485, -3.5626252505010023, -3.5721442885771544, -3.581663326653307, -3.5911823647294594, -3.6007014028056115, -3.610220440881764, -3.619739478957916, -3.6292585170340685, -3.6387775551102206, -3.648296593186373, -3.657815631262525, -3.6673346693386777, -3.6768537074148298, -3.6863727454909823, -3.6958917835671348, -3.705410821643287, -3.7149298597194393, -3.7244488977955914, -3.733967935871744, -3.743486973947896, -3.7530060120240485, -3.7625250501002006, -3.772044088176353, -3.781563126252505, -3.7910821643286576, -3.80060120240481, -3.810120240480962, -3.8196392785571147, -3.829158316633267, -3.8386773547094193, -3.8481963927855714, -3.857715430861724, -3.867234468937876, -3.8767535070140284, -3.8862725450901805, -3.895791583166333, -3.905310621242485, -3.9148296593186376, -3.92434869739479, -3.933867735470942, -3.9433867735470947, -3.9529058116232467, -3.9624248496993992, -3.9719438877755513, -3.981462925851704, -3.990981963927856, -4.000501002004008, -4.01002004008016, -4.019539078156313, -4.0290581162324655, -4.0385771543086175, -4.0480961923847705, -4.057615230460922, -4.067134268537075, -4.076653306613227, -4.086172344689379, -4.095691382765532, -4.105210420841684, -4.114729458917836, -4.124248496993989, -4.133767535070141, -4.143286573146293, -4.152805611222446, -4.162324649298597, -4.17184368737475, -4.181362725450902, -4.190881763527054, -4.200400801603207, -4.209919839679359, -4.219438877755511, -4.228957915831664, -4.238476953907816, -4.247995991983968, -4.25751503006012, -4.267034068136273, -4.276553106212425, -4.286072144288577, -4.2955911823647295, -4.305110220440882, -4.3146292585170345, -4.324148296593187, -4.333667334669339, -4.343186372745492, -4.352705410821644, -4.362224448897796, -4.371743486973949, -4.381262525050101, -4.390781563126253, -4.400300601202405, -4.409819639278558, -4.41933867735471, -4.428857715430862, -4.438376753507014, -4.447895791583167, -4.457414829659319, -4.466933867735471, -4.476452905811624, -4.485971943887776, -4.495490981963928, -4.50501002004008, -4.514529058116233, -4.524048096192385, -4.533567134268537, -4.543086172344689, -4.552605210420842, -4.562124248496994, -4.5716432865731464, -4.581162324649299, -4.5906813627254515, -4.6002004008016035, -4.609719438877756, -4.6192384769539085, -4.628757515030061, -4.638276553106213, -4.647795591182365, -4.657314629258518, -4.66683366733467, -4.676352705410822, -4.685871743486975, -4.695390781563127, -4.704909819639279, -4.714428857715431, -4.723947895791584, -4.733466933867736, -4.742985971943888, -4.75250501002004, -4.762024048096193, -4.771543086172345, -4.781062124248497, -4.790581162324649, -4.800100200400802, -4.809619238476954, -4.819138276553106, -4.828657314629259, -4.838176352705411, -4.847695390781563, -4.8572144288577155, -4.866733466933868, -4.8762525050100205, -4.885771543086173, -4.895290581162325, -4.904809619238478, -4.91432865731463, -4.923847695390782, -4.933366733466935, -4.942885771543087, -4.952404809619239, -4.961923847695391, -4.971442885771544, -4.980961923847696, -4.990480961923848, -5.0], "si": [-0.24913357031975716, -0.25854996218716786, -0.26795856823506237, -0.2773591069512988, -0.28675129726172444, -0.2961348585453907, -0.305509510649738, -0.3148749739057512, -0.32423096914308297, -0.33357721770514553, -0.3429134414641693, -0.3522393628362262, -0.3615547047962195, -0.3708591908928359, -0.380152545263462, -0.38943449264906127, -0.39870475840901354, -0.4079630685359129, -0.4172091496703261, -0.4264427291155085, -0.43566353485207704, -0.44487129555263927, -0.4540657405963789, -0.4632466000835939, -0.47241360485019007, -0.4815664864821247, -0.4907049773298042, -0.4998288105224308, -0.5089377199822998, -0.5180314404390441, -0.5271097074438301, -0.536172257383496, -0.5452188274946398, -0.5542491558776504, -0.5632629815106848, -0.5722600442635857, -0.5812400849117456, -0.5902028451499086, -0.5991480676059163, -0.6080754958543902, -0.6169848744303564, -0.6258759488428054, -0.6347484655881916, -0.6436021721638676, -0.6524368170814537, -0.6612521498801447, -0.6700479211399468, -0.6788238824948502, -0.6875797866459328, -0.696315387374395, -0.705030439554526, -0.7137246991665983, -0.7223979233096917, -0.7310498702144456, -0.7396802992557386, -0.7482889709652933, -0.7568756470442087, -0.7654400903754144, -0.773982065036052, -0.7825013363097787, -0.7909976706989913, -0.7994708359369752, -0.8079206009999721, -0.8163467361191676, -0.8247490127926008, -0.8331272037969891, -0.8414810831994737, -0.8498104263692802, -0.8581150099892972, -0.86639461206757, -0.8746490119487088, -0.8828779903252119, -0.891081329248702, -0.8992588121410756, -0.9074102238055647, -0.915535350437709, -0.9236339796362408, -0.9317059004138777, -0.9397509032080267, -0.9477687798913954, -0.9557593237825127, -0.9637223296561568, -0.971657593753688, -0.9795649137932918, -0.987444088980122, -0.9952949200163546, -1.0031172091111407, -1.010910759990467, -1.0186753779069178, -1.026410869649338, -1.0341170435524019, -1.0417937095060785, -1.049440678965002, -1.057057764957738, -1.0646447820959544, -1.072201546583486, -1.0797278762253018, -1.0872235904363678, -1.0946885102504078, -1.1021224583285616, -1.109525258967938, -1.1168967381100672, -1.1242367233492432, -1.1315450439407653, -1.138821530809072, -1.1460660165557697, -1.1532783354675535, -1.1604583235240222, -1.1676058184053848, -1.1747206595000594, -1.1818026879121635, -1.1888517464688948, -1.1958676797278043, -1.2028503339839576, -1.2097995572769868, -1.216715199398033, -1.2235971118965756, -1.2304451480871514, -1.2372591630559617, -1.244039013667368, -1.250784558570273, -1.2574956582043917, -1.2641721748064054, -1.2708139724160072, -1.277420916881828, -1.2839928758672519, -1.2905297188561156, -1.2970313171582943, -1.3034975439151684, -1.309928274104981, -1.3163233845480724, -1.322682753912006, -1.3290062627165693, -1.3352937933386668, -1.3415452300170905, -1.3477604588571728, -1.3539393678353275, -1.360081846803466, -1.3661877874933017, -1.3722570835205314, -1.3782896303889036, -1.3842853254941612, -1.3902440681278732, -1.3961657594811425, -1.4020503026481956, -1.407897602629854, -1.4137075663368857, -1.419480102593236, -1.4252151221391411, -1.4309125376341194, -1.4365722636598428, -1.442194216722891, -1.4477783152573829, -1.4533244796274858, -1.4588326321298093, -1.464302696995675, -1.4697346003932659, -1.4751282704296567, -1.4804836371527221, -1.485800632552924, -1.4910791905649798, -1.496319247069407, -1.5015207398939505, -1.5066836088148845, -1.5118077955581977, -1.5168932438006546, -1.5219398991707382, -1.52694770924947, -1.531916623571109, -1.5368465936237317, -1.5417375728496885, -1.5465895166459434, -1.551402382364288, -1.556176129311438, -1.560910718749008, -1.5656061138933686, -1.5702622799153765, -1.5748791839399905, -1.5794567950457659, -1.583995084264226, -1.5884940245791161, -1.5929535909255377, -1.5973737601889615, -1.6017545112041214, -1.6060958247537893, -1.6103976835674314, -1.6146600723197424, -1.618882977629064, -1.623066388055683, -1.627210294100012, -1.6313146882006488, -1.635379564732322, -1.6394049200037144, -1.6433907522551714, -1.6473370616562915, -1.6512438503033982, -1.6551111222168964, -1.6589388833385101, -1.6627271415284075, -1.6664759065622043, -1.670185190127855, -1.6738550058224295, -1.677485369148769, -1.681076297512031, -1.6846278102161236, -1.6881399284600118, -1.691612675333924, -1.6950460758154409, -1.6984401567654628, -1.7017949469240758, -1.705110476906296, -1.708386779197708, -1.7116238881499848, -1.7148218399763036, -1.7179806727466422, -1.7211004263829728, -1.7241811426543383, -1.7272228651718227, -1.7302256393834112, -1.7331895125687398, -1.7361145338337374, -1.7390007541051595, -1.7418482261250132, -1.7446570044448746, -1.7474271454201022, -1.750158707203939, -1.7528517497415126, -1.7555063347637279, -1.758122525781054, -1.7607003880772092, -1.7632399887027408, -1.7657413964684971, -1.7682046819390054, -1.7706299174257378, -1.773017176980282, -1.775366536387408, -1.7776780731580322, -1.7799518665220844, -1.7821879974212729, -1.784386548501752, -1.7865476041066872, -1.7886712502687285, -1.790757574702379, -1.7928066667962728, -1.7948186176053516, -1.7967935198429503, -1.7987314678727828, -1.8006325577008355, -1.8024968869671691, -1.8043245549376228, -1.8061156624954278, -1.80787031213273, -1.8095886079420198, -1.811270655607472, -1.812916562396195, -1.814526437149388, -1.8161003902734187, -1.8176385337307999, -1.8191409810310903, -1.8206078472216989, -1.8220392488786123, -1.823435304097031, -1.824796132481921, -1.826121855138486, -1.8274125946625484, -1.8286684751308608, -1.8298896220913188, -1.831076162553107, -1.8322282249767596, -1.833345939264138, -1.8344294367483347, -1.8354788501834967, -1.836494313734572, -1.8374759629669797, -1.8384239348362033, -1.83933836767731, -1.8402194011943958, -1.841067176449956, -1.8418818358541833, -1.8426635231541955, -1.8434123834231888, -1.844128563049525, -1.8448122097257442, -1.845463472437514, -1.8460825014525053, -1.8466694483092048, -1.8472244658056605, -1.8477477079881606, -1.848239330139848, -1.8486994887692714, -1.8491283415988724, -1.8495260475534123, -1.8498927667483336, -1.8502286604780669, -1.8505338912042726, -1.8508086225440252, -1.8510530192579429, -1.8512672472382543, -1.8514514734968137, -1.8516058661530583, -1.8517305944219122, -1.8518258286016351, -1.851891740061621, -1.8519285012301394, -1.8519362855820338, -1.8519152676263617, -1.851865622893989, -1.851787527925138, -1.8516811602568832, -1.8515466984106042, -1.8513843218793893, -1.8511942111154005, -1.8509765475171844, -1.8507315134169502, -1.8504592920678007, -1.8501600676309216, -1.8498340251627292, -1.8494813506019856, -1.8491022307568654, -1.8486968532919925, -1.8482654067154385, -1.84780808036568, -1.84732506439853, -1.8468165497740265, -1.846282728243294, -1.8457237923353715, -1.845139935344006, -1.8445313513144208, -1.843898235030051, -1.8432407819992513, -1.8425591884419759, -1.8418536512764339, -1.841124368105716, -1.8403715372043987, -1.8395953575051247, -1.8387960285851572, -1.8379737506529175, -1.837128724534498, -1.8362611516601546, -1.8353712340507826, -1.8344591743043757, -1.8335251755824584, -1.832569441596517, -1.8315921765944028, -1.8305935853467237, -1.8295738731332292, -1.8285332457291716, -1.8274719093916678, -1.826390070846037, -1.8252879372721416, -1.8241657162907108, -1.82302361594966, -1.8218618447104011, -1.8206806114341494, -1.8194801253682233, -1.8182605961323415, -1.8170222337049151, -1.815765248409339, -1.8144898509002818, -1.8131962521499745, -1.8118846634345023, -1.8105552963200935, -1.8092083626494133, -1.8078440745278637, -1.8064626443098835, -1.8050642845852523, -1.8036492081654083, -1.802217628069764, -1.8007697575120367, -1.7993058098865846, -1.7978259987547522, -1.7963305378312289, -1.794819640970419, -1.793293522152821, -1.791752395471426, -1.790196475118125, -1.7886259753701317, -1.7870411105764308, -1.7854420951442296, -1.783829143525437, -1.782202470203159, -1.7805622896782147, -1.778908816455671, -1.7772422650314008, -1.7755628498786624, -1.7738707854347053, -1.7721662860873968, -1.7704495661618744, -1.7687208399072278, -1.7669803214832027, -1.7652282249469373, -1.7634647642397219, -1.7616901531737947, -1.7599046054191652, -1.7581083344904647, -1.7563015537338371, -1.7544844763138567, -1.7526573152004816, -1.7508202831560433, -1.7489735927222692, -1.7471174562073453, -1.7452520856730112, -1.7433776929216995, -1.741494489483708, -1.7396026866044163, -1.7377024952315405, -1.7357941260024312, -1.7338777892314112, -1.7319536948971606, -1.7300220526301406, -1.7280830717000664, -1.726136961003424, -1.7241839290510317, -1.7222241839556534, -1.720257933419654, -1.718285384722708, -1.7163067447095561, -1.7143222197778116, -1.712332015865819, -1.7103363384405637, -1.708335392485634, -1.7063293824892376, -1.7043185124322724, -1.70230298577645, -1.7002830054524778, -1.6982587738482948, -1.696230492797368, -1.6941983635670417, -1.692162586846951, -1.6901233627374894, -1.688080890738342, -1.6860353697370734, -1.6839869979977822, -1.681935973149815, -1.6798824921765436, -1.6778267514042073, -1.675768946490817, -1.673709272415126, -1.671647923465667, -1.6695850932298535, -1.6675209745831487, -1.6654557596783044, -1.6633896399346637, -1.6613228060275378, -1.6592554478776482, -1.6571877546406415, -1.6551199146966742, -1.653052115640069, -1.650984544269044, -1.6489173865755142, -1.646850827734965, -1.644785052096402, -1.6427202431723744, -1.640656583629072, -1.6385942552765018, -1.6365334390587356, -1.63447431504424, -1.6324170624162797, -1.6303618594634006, -1.6283088835699917, -1.6262583112069258, -1.6242103179222789, -1.6221650783321322, -1.6201227661114512, -1.6180835539850515, -1.6160476137186397, -1.614015116109942, -1.6119862309799133, -1.6099611271640306, -1.607939972503668, -1.6059229338375587, -1.603910176993341, -1.6019018667791889, -1.5998981669755272, -1.5978992403268368, -1.5959052485335423, -1.5939163522439896, -1.5919327110465085, -1.5899544834615658, -1.5879818269340056, -1.5860148978253772, -1.584053851406355, -1.5820988418492448, -1.5801500222205824, -1.578207544473822, -1.5762715594421146, -1.5743422168311796, -1.572419665212264, -1.5705040520151985, -1.5685955235215412, -1.5666942248578184, -1.5648002999888537, -1.562913891711193, -1.5610351416466248, -1.5591641902357887, -1.5573011767318852, -1.5554462391944734, -1.5535995144833707, -1.5517611382526388, -1.549931244944674], "ci": [-0.8246630625809456, -0.7884999027275412, -0.7537275830159593, -0.7202524051490965, -0.6879901112647359, -0.6568646556001156, -0.6268071696200747, -0.5977550851580332, -0.5696513874737703, -0.5424439757929368, -0.516085113287058, -0.49053095188985757, -0.4657411200542503, -0.44167836370356606, -0.4183082323471476, -0.39559880370999295, -0.3735204413412472, -0.352045580572787, -0.33114853893979157, -0.3108053477834373, -0.2909936022577151, -0.2716923273783501, -0.2528818580980789, -0.23454373168199275, -0.21666059089955422, -0.1992160967545049, -0.18219484964686086, -0.16558231800793327, -0.1493647735742129, -0.1335292325726129, -0.11806340218089877, -0.1029556317056166, -0.0881948679874192, -0.07377061460208573, -0.05967289447610953, -0.04589221557963662, -0.03241953939776997, -0.01924625191460018, -0.006364136873497336, 0.006234648897245718, 0.018557598281868745, 0.030611874966389632, 0.04240433297090444, 0.05394153476080049, 0.06522976805911185, 0.07627506147015321, 0.08708319901382043, 0.09765973366038751, 0.10800999994710167, 0.11813912575026525, 0.1280520432796853, 0.1377534993562711, 0.1472480650280872, 0.15654014457525753, 0.16563398394968692, 0.17453367869158815, 0.1832431813612025, 0.19176630852085857, 0.2001067472995751, 0.20826806156975233, 0.21625369776308823, 0.22406699035066382, 0.23171116701015212, 0.23918935350129705, 0.2465045782691576, 0.2536597767931084, 0.2606577956982184, 0.26750139664437145, 0.27419326000734706, 0.28073598836503166, 0.28713210980096204, 0.2933840810365268, 0.2994942904023362, 0.3054650606585263, 0.31129865167308035, 0.3169972629666182, 0.32256303613152, 0.32799805713272234, 0.3333043584970206, 0.33848392139726236, 0.3435386776373902, 0.3484705115439025, 0.35328126176893837, 0.35797272300986105, 0.36254664764989764, 0.3670047473241111, 0.37134869441470786, 0.3755801234794389, 0.3797006326166208, 0.38371178477008355, 0.38761510897716206, 0.39141210156264844, 0.3951042272814616, 0.3986929204126176, 0.4021795858069406, 0.4055655998908096, 0.4088523116281039, 0.41204104344238923, 0.41513309210126886, 0.4181297295647169, 0.4210322037991101, 0.42384173955857984, 0.42655953913521627, 0.4291867830795737, 0.43172463089285074, 0.4341742216920392, 0.4365366748492734, 0.43881309060654483, 0.44100455066688204, 0.4431121187630448, 0.4451368412047238, 0.4470797474051879, 0.4489418503882695, 0.4507241472765422, 0.45242761976149254, 0.4540532345564516, 0.45560194383301905, 0.4570746856416679, 0.4584723843171913, 0.4597959508696174, 0.4610462833611906, 0.4622242672699866, 0.4633307758407044, 0.46436667042314916, 0.4653328007989009, 0.466230005496638, 0.4670591120965605, 0.4678209375243445, 0.46851628833503345, 0.4691459609872546, 0.4697107421081371, 0.4702114087492817, 0.47064872863412577, 0.47102346039702736, 0.47133635381437833, 0.47158815002804455, 0.471779581761416, 0.4719113735283422, 0.4719842418352095, 0.47199889537641304, 0.4719560352234595, 0.4718563550079331, 0.47170054109854087, 0.4714892727724507, 0.47122322238112224, 0.47090305551082334, 0.4705294311380219, 0.4701030017798261, 0.46962441363964746, 0.46909430674825014, 0.4685133151003459, 0.46788206678688204, 0.46720118412317313, 0.4664712837730123, 0.4656929768689003, 0.4648668691285195, 0.4639935609675766, 0.46307364760913605, 0.46210771918955884, 0.4610963608611556, 0.4600401528916641, 0.4589396707606501, 0.457795485252934, 0.4566081625491356, 0.4553782643134334, 0.45410634777862013, 0.4527929658285458, 0.45143866707802904, 0.4500439959503154, 0.4486094927521559, 0.4471356937465887, 0.44562313122348407, 0.4440723335679314, 0.4424838253265253, 0.4408581272716239, 0.43919575646363407, 0.43749722631138643, 0.43576304663066, 0.4339937237009056, 0.43218976032023027, 0.4303516558586876, 0.4284799063099297, 0.4265750043412656, 0.4246374393421749, 0.4226676974713248, 0.42066626170212684, 0.41863361186688575, 0.41657022469957516, 0.41447657387728243, 0.4123531300603591, 0.41020036093131895, 0.4080187312325161, 0.4058087028026377, 0.4035707346120495, 0.4013052827970237, 0.3990128006928805, 0.39669373886607884, 0.39434854514528117, 0.3919776646514248, 0.38958153982682564, 0.3871606104633454, 0.38471531372964274, 0.3822460841975436, 0.37975335386754283, 0.37723755219347466, 0.3746991061063665, 0.37213844003750296, 0.3695559759407203, 0.36695213331395626, 0.3643273292200706, 0.361681978306964, 0.35901649282700787, 0.3563312826558085, 0.3536267553103245, 0.3509033159663537, 0.3481613674754078, 0.34540131038099364, 0.3426235429343125, 0.3398284611094027, 0.3370164586177329, 0.33418792692226584, 0.33134325525100405, 0.3284828306100376, 0.3256070377961042, 0.3227162594086732, 0.319810875861573, 0.3168912653941709, 0.31395780408211715, 0.3110108658476711, 0.3080508224696126, 0.30507804359276114, 0.30209289673710393, 0.299095747306553, 0.29608695859733425, 0.2930668918060264, 0.2900359060372526, 0.2869943583110435, 0.2839426035698718, 0.28088099468537897, 0.2778098824647903, 0.2747296156570431, 0.27164054095861845, 0.26854300301910605, 0.26543734444649036, 0.2623239058121811, 0.25920302565578934, 0.25607504048965835, 0.25294028480315744, 0.24979909106674514, 0.2466517897358098, 0.24349870925429573, 0.2403401760581214, 0.23717651457839173, 0.23400804724442192, 0.23083509448656714, 0.22765797473887361, 0.22447700444155205, 0.22129249804328177, 0.21810476800334988, 0.2149141247936357, 0.21172087690043795, 0.2085253308261581, 0.20532779109084243, 0.20212856023358539, 0.19892793881380544, 0.19572622541239038, 0.19252371663272605, 0.18932070710160698, 0.1861174894700346, 0.18291435441391113, 0.17971159063462672, 0.1765094848595543, 0.17330832184244693, 0.17010838436374875, 0.16690995323081514, 0.16371330727805944, 0.16051872336701734, 0.15732647638634067, 0.1541368392517164, 0.15095008290572975, 0.14776647631765538, 0.14458628648319527, 0.14140977842416036, 0.13823721518809973, 0.13506885784788558, 0.13190496550124542, 0.12874579527026087, 0.12559160230082012, 0.12244263976204195, 0.11929915884566245, 0.11616140876539283, 0.11302963675625222, 0.10990408807387397, 0.10678500599379426, 0.1036726318107164, 0.10056720483776815, 0.09746896240573522, 0.09437813986229404, 0.09129497057122915, 0.08821968591164842, 0.08515251527719281, 0.08209368607524814, 0.07904342372615458, 0.07600195166242085, 0.07296949132794728, 0.06994626217724953, 0.0669324816746999, 0.06392836529377521, 0.060934126516321685, 0.057949976831835004, 0.05497612573675559, 0.052012780733790454, 0.04906014733124753, 0.046118429042400155, 0.043187827384877586, 0.04026854188007323, 0.037360770052595305, 0.03446470742973351, 0.03158054754096917, 0.02870848191751363, 0.02584870009187945, 0.023001389597494093, 0.020166735968347282, 0.017344922738678825, 0.0145361314427086, 0.011740541614409405, 0.008958330787316005, 0.006189674494395225, 0.003434746267943156, 0.000693717639544067, -0.0020332418599275925, -0.004745964700253902, -0.007444285351769997, -0.010128040285208195, -0.01279706797148461, -0.015451208881438916, -0.01809030548551127, -0.020714202253365288, -0.023322745653454158, -0.025915784152527488, -0.028493168215075082, -0.031054750302716982, -0.03360038487352557, -0.03612992838128615, -0.038643239274700036, -0.04114017799651415, -0.0436206069825924, -0.046084390660920294, -0.04853139545053797, -0.05096148976041448, -0.05337454398824559, -0.055770430519187064, -0.058149023724517024, -0.06051019996023088, -0.06285383756555762, -0.06517981686141683, -0.06748802014879085, -0.06977833170703307, -0.0720506377920993, -0.07430482663470284, -0.07654078843840417, -0.07875841537761175, -0.08095760159552179, -0.0831382432019705, -0.08530023827121735, -0.08744348683964853, -0.08956789090340256, -0.09167335441591895, -0.09375978328541046, -0.09582708537225404, -0.09787517048630345, -0.0999039503841237, -0.10191333876614772, -0.103903251273747, -0.1058736054862286, -0.10782432091775052, -0.10975531901415136, -0.11166652314970538, -0.11355785862379264, -0.11542925265748849, -0.11728063439007386, -0.11911193487545768, -0.12092308707852517, -0.12271402587139502, -0.12448468802960644, -0.12623501222820943, -0.12796493903778305, -0.1296744109203667, -0.13136337222531003, -0.13303176918503912, -0.13467954991073894, -0.13630666438795602, -0.13791306447211538, -0.1394987038839508, -0.14106353820486545, -0.14260752487219136, -0.1441306231743794, -0.14563279424610012, -0.1471140010632639, -0.14857420843795688, -0.1500133830132941, -0.1514314932581915, -0.15282850946205212, -0.15420440372937305, -0.15555914997426726, -0.15689272391490414, -0.15820510306786797, -0.1594962667424338, -0.16076619603476072, -0.1620148738220053, -0.16324228475635105, -0.16444841525895745, -0.16563325351382857, -0.16679678946159862, -0.16793901479323853, -0.1690599229436808, -0.1701595090853642, -0.17123777012169863, -0.17229470468044975, -0.1733303131070435, -0.1743445974577929, -0.1753375614930438, -0.17630921067024305, -0.17725955213692787, -0.17818859472363713, -0.17909634893674464, -0.17998282695121512, -0.18084804260328274, -0.18169201138305324, -0.18251475042702925, -0.18331627851055948, -0.1840966160402126, -0.1848557850460751, -0.18559380917397553, -0.1863107136776321, -0.18700652541072837, -0.1876812728189135, -0.18833498593173048, -0.1889676963544705, -0.18957943725995585, -0.19017024338024974, -0.19074015099829592, -0.19128919793948618, -0.19181742356315776, -0.1923248687540206, -0.19281157591351528, -0.19327758895110111, -0.19372295327547662, -0.19414771578573084, -0.19455192486242806, -0.1949356303586248, -0.1952988835908208, -0.1956417373298434, -0.19596424579166696, -0.1962664646281674, -0.19654845091781195, -0.19681026315628575, -0.19705196124705462, -0.19727360649186565, -0.19747526158118572, -0.19765699058457806, -0.1978188589410187, -0.19796093344915194, -0.19808328225748678, -0.19818597485453363, -0.19826908205888347, -0.19833267600922824, -0.19837683015432456, -0.198401619242901, -0.19840711931350927, -0.19839340768431984, -0.1983605629428636, -0.19830866493571925, -0.19823779475814654, -0.19814803474366904, -0.1980394684536022, -0.19791218066653246, -0.197766257367744, -0.1976017857385971, -0.19741885414585572, -0.1972175521309678, -0.19699797039929678, -0.19676020080930676, -0.19650433636170045, -0.19623047118851197, -0.19593870054215418, -0.19562912078442174, -0.19530182937545146, -0.19495692486263827, -0.19459450686951, -0.19421467608456086, -0.19381753425004383, -0.19340318415072322, -0.19297172960258796, -0.1925232754415269, -0.1920579275119658, -0.19157579265546773, -0.19107697869929752, -0.19056159444494983, -0.1900297496566439]}

},{}],113:[function(require,module,exports){
module.exports={"x": [0.25, 0.2595190380761523, 0.26903807615230463, 0.2785571142284569, 0.2880761523046092, 0.29759519038076154, 0.30711422845691383, 0.3166332665330661, 0.32615230460921846, 0.33567134268537074, 0.3451903807615231, 0.35470941883767537, 0.36422845691382766, 0.37374749498997994, 0.3832665330661323, 0.3927855711422846, 0.4023046092184369, 0.4118236472945892, 0.4213426853707415, 0.4308617234468938, 0.4403807615230461, 0.4498997995991984, 0.45941883767535074, 0.46893787575150303, 0.4784569138276553, 0.4879759519038076, 0.49749498997995995, 0.5070140280561122, 0.5165330661322646, 0.5260521042084169, 0.5355711422845691, 0.5450901803607215, 0.5546092184368738, 0.5641282565130261, 0.5736472945891784, 0.5831663326653307, 0.592685370741483, 0.6022044088176353, 0.6117234468937875, 0.6212424849699398, 0.6307615230460922, 0.6402805611222445, 0.6497995991983968, 0.6593186372745492, 0.6688376753507015, 0.6783567134268538, 0.6878757515030061, 0.6973947895791583, 0.7069138276553106, 0.7164328657314629, 0.7259519038076152, 0.7354709418837676, 0.7449899799599199, 0.7545090180360722, 0.7640280561122245, 0.7735470941883767, 0.7830661322645291, 0.7925851703406814, 0.8021042084168337, 0.811623246492986, 0.8211422845691383, 0.8306613226452906, 0.840180360721443, 0.8496993987975953, 0.8592184368737475, 0.8687374749498998, 0.8782565130260521, 0.8877755511022045, 0.8972945891783568, 0.9068136272545091, 0.9163326653306614, 0.9258517034068137, 0.935370741482966, 0.9448897795591183, 0.9544088176352706, 0.9639278557114229, 0.9734468937875752, 0.9829659318637275, 0.9924849699398798, 1.0020040080160322, 1.0115230460921845, 1.0210420841683367, 1.030561122244489, 1.0400801603206413, 1.0495991983967936, 1.059118236472946, 1.0686372745490984, 1.0781563126252505, 1.087675350701403, 1.097194388777555, 1.1067134268537075, 1.1162324649298598, 1.1257515030060121, 1.1352705410821644, 1.1447895791583167, 1.154308617234469, 1.1638276553106213, 1.1733466933867738, 1.1828657314629258, 1.1923847695390783, 1.2019038076152304, 1.211422845691383, 1.2209418837675352, 1.2304609218436875, 1.2399799599198398, 1.249498997995992, 1.2590180360721444, 1.2685370741482966, 1.278056112224449, 1.2875751503006012, 1.2970941883767535, 1.306613226452906, 1.3161322645290583, 1.3256513026052106, 1.3351703406813629, 1.3446893787575152, 1.3542084168336674, 1.3637274549098197, 1.373246492985972, 1.3827655310621243, 1.3922845691382766, 1.4018036072144289, 1.4113226452905812, 1.4208416833667337, 1.430360721442886, 1.4398797595190382, 1.4493987975951905, 1.4589178356713428, 1.468436873747495, 1.4779559118236474, 1.4874749498997997, 1.496993987975952, 1.5065130260521042, 1.5160320641282565, 1.525551102204409, 1.5350701402805613, 1.5445891783567136, 1.554108216432866, 1.5636272545090182, 1.5731462925851705, 1.5826653306613228, 1.592184368737475, 1.6017034068136273, 1.6112224448897796, 1.620741482965932, 1.6302605210420842, 1.6397795591182367, 1.649298597194389, 1.6588176352705413, 1.6683366733466936, 1.6778557114228458, 1.6873747494989981, 1.6968937875751504, 1.7064128256513027, 1.715931863727455, 1.7254509018036073, 1.7349699398797596, 1.7444889779559118, 1.7540080160320644, 1.7635270541082166, 1.773046092184369, 1.7825651302605212, 1.7920841683366735, 1.8016032064128258, 1.811122244488978, 1.8206412825651304, 1.8301603206412826, 1.839679358717435, 1.8491983967935872, 1.8587174348697397, 1.868236472945892, 1.8777555110220443, 1.8872745490981966, 1.8967935871743489, 1.9063126252505012, 1.9158316633266534, 1.9253507014028057, 1.934869739478958, 1.9443887775551103, 1.9539078156312626, 1.9634268537074149, 1.9729458917835674, 1.9824649298597197, 1.991983967935872, 2.0015030060120242, 2.0110220440881763, 2.020541082164329, 2.0300601202404813, 2.0395791583166334, 2.0490981963927855, 2.058617234468938, 2.0681362725450905, 2.0776553106212425, 2.087174348697395, 2.0966933867735476, 2.1062124248496996, 2.1157314629258517, 2.125250501002004, 2.1347695390781567, 2.1442885771543088, 2.153807615230461, 2.1633266533066133, 2.172845691382766, 2.182364729458918, 2.1918837675350704, 2.201402805611223, 2.210921843687375, 2.220440881763527, 2.2299599198396796, 2.239478957915832, 2.248997995991984, 2.2585170340681366, 2.2680360721442887, 2.277555110220441, 2.2870741482965933, 2.296593186372746, 2.306112224448898, 2.3156312625250504, 2.3251503006012024, 2.334669338677355, 2.344188376753507, 2.3537074148296595, 2.363226452905812, 2.372745490981964, 2.3822645290581166, 2.3917835671342687, 2.401302605210421, 2.4108216432865732, 2.4203406813627257, 2.429859719438878, 2.4393787575150303, 2.4488977955911824, 2.458416833667335, 2.4679358717434874, 2.4774549098196395, 2.486973947895792, 2.496492985971944, 2.5060120240480965, 2.5155310621242486, 2.525050100200401, 2.534569138276553, 2.5440881763527057, 2.5536072144288577, 2.5631262525050102, 2.5726452905811623, 2.582164328657315, 2.5916833667334673, 2.6012024048096194, 2.610721442885772, 2.620240480961924, 2.6297595190380765, 2.6392785571142285, 2.648797595190381, 2.658316633266533, 2.6678356713426856, 2.6773547094188377, 2.68687374749499, 2.6963927855711427, 2.7059118236472948, 2.7154308617234473, 2.7249498997995993, 2.734468937875752, 2.743987975951904, 2.7535070140280564, 2.7630260521042085, 2.772545090180361, 2.782064128256513, 2.7915831663326656, 2.801102204408818, 2.81062124248497, 2.8201402805611226, 2.8296593186372747, 2.839178356713427, 2.8486973947895793, 2.858216432865732, 2.867735470941884, 2.8772545090180364, 2.8867735470941884, 2.896292585170341, 2.905811623246493, 2.9153306613226455, 2.924849699398798, 2.93436873747495, 2.9438877755511026, 2.9534068136272547, 2.962925851703407, 2.9724448897795592, 2.9819639278557117, 2.991482965931864, 3.0010020040080163, 3.0105210420841684, 3.020040080160321, 3.0295591182364734, 3.0390781563126255, 3.048597194388778, 3.05811623246493, 3.0676352705410825, 3.0771543086172346, 3.086673346693387, 3.096192384769539, 3.1057114228456917, 3.1152304609218437, 3.1247494989979963, 3.1342685370741488, 3.143787575150301, 3.1533066132264533, 3.1628256513026054, 3.172344689378758, 3.18186372745491, 3.1913827655310625, 3.2009018036072145, 3.210420841683367, 3.219939879759519, 3.2294589178356716, 3.2389779559118237, 3.248496993987976, 3.2580160320641287, 3.2675350701402808, 3.2770541082164333, 3.2865731462925853, 3.296092184368738, 3.30561122244489, 3.3151302605210424, 3.3246492985971945, 3.334168336673347, 3.343687374749499, 3.3532064128256516, 3.362725450901804, 3.372244488977956, 3.3817635270541087, 3.3912825651302607, 3.4008016032064132, 3.4103206412825653, 3.419839679358718, 3.42935871743487, 3.4388777555110224, 3.4483967935871744, 3.457915831663327, 3.4674348697394795, 3.4769539078156315, 3.486472945891784, 3.495991983967936, 3.5055110220440886, 3.5150300601202407, 3.524549098196393, 3.5340681362725452, 3.5435871743486977, 3.55310621242485, 3.5626252505010023, 3.5721442885771544, 3.581663326653307, 3.5911823647294594, 3.6007014028056115, 3.610220440881764, 3.619739478957916, 3.6292585170340685, 3.6387775551102206, 3.648296593186373, 3.657815631262525, 3.6673346693386777, 3.6768537074148298, 3.6863727454909823, 3.6958917835671348, 3.705410821643287, 3.7149298597194393, 3.7244488977955914, 3.733967935871744, 3.743486973947896, 3.7530060120240485, 3.7625250501002006, 3.772044088176353, 3.781563126252505, 3.7910821643286576, 3.80060120240481, 3.810120240480962, 3.8196392785571147, 3.829158316633267, 3.8386773547094193, 3.8481963927855714, 3.857715430861724, 3.867234468937876, 3.8767535070140284, 3.8862725450901805, 3.895791583166333, 3.905310621242485, 3.9148296593186376, 3.92434869739479, 3.933867735470942, 3.9433867735470947, 3.9529058116232467, 3.9624248496993992, 3.9719438877755513, 3.981462925851704, 3.990981963927856, 4.000501002004008, 4.01002004008016, 4.019539078156313, 4.0290581162324655, 4.0385771543086175, 4.0480961923847705, 4.057615230460922, 4.067134268537075, 4.076653306613227, 4.086172344689379, 4.095691382765532, 4.105210420841684, 4.114729458917836, 4.124248496993989, 4.133767535070141, 4.143286573146293, 4.152805611222446, 4.162324649298597, 4.17184368737475, 4.181362725450902, 4.190881763527054, 4.200400801603207, 4.209919839679359, 4.219438877755511, 4.228957915831664, 4.238476953907816, 4.247995991983968, 4.25751503006012, 4.267034068136273, 4.276553106212425, 4.286072144288577, 4.2955911823647295, 4.305110220440882, 4.3146292585170345, 4.324148296593187, 4.333667334669339, 4.343186372745492, 4.352705410821644, 4.362224448897796, 4.371743486973949, 4.381262525050101, 4.390781563126253, 4.400300601202405, 4.409819639278558, 4.41933867735471, 4.428857715430862, 4.438376753507014, 4.447895791583167, 4.457414829659319, 4.466933867735471, 4.476452905811624, 4.485971943887776, 4.495490981963928, 4.50501002004008, 4.514529058116233, 4.524048096192385, 4.533567134268537, 4.543086172344689, 4.552605210420842, 4.562124248496994, 4.5716432865731464, 4.581162324649299, 4.5906813627254515, 4.6002004008016035, 4.609719438877756, 4.6192384769539085, 4.628757515030061, 4.638276553106213, 4.647795591182365, 4.657314629258518, 4.66683366733467, 4.676352705410822, 4.685871743486975, 4.695390781563127, 4.704909819639279, 4.714428857715431, 4.723947895791584, 4.733466933867736, 4.742985971943888, 4.75250501002004, 4.762024048096193, 4.771543086172345, 4.781062124248497, 4.790581162324649, 4.800100200400802, 4.809619238476954, 4.819138276553106, 4.828657314629259, 4.838176352705411, 4.847695390781563, 4.8572144288577155, 4.866733466933868, 4.8762525050100205, 4.885771543086173, 4.895290581162325, 4.904809619238478, 4.91432865731463, 4.923847695390782, 4.933366733466935, 4.942885771543087, 4.952404809619239, 4.961923847695391, 4.971442885771544, 4.980961923847696, 4.990480961923848, 5.0], "si": [0.24913357031975716, 0.25854996218716786, 0.26795856823506237, 0.2773591069512988, 0.28675129726172444, 0.2961348585453907, 0.305509510649738, 0.3148749739057512, 0.32423096914308297, 0.33357721770514553, 0.3429134414641693, 0.3522393628362262, 0.3615547047962195, 0.3708591908928359, 0.380152545263462, 0.38943449264906127, 0.39870475840901354, 0.4079630685359129, 0.4172091496703261, 0.4264427291155085, 0.43566353485207704, 0.44487129555263927, 0.4540657405963789, 0.4632466000835939, 0.47241360485019007, 0.4815664864821247, 0.4907049773298042, 0.4998288105224308, 0.5089377199822998, 0.5180314404390441, 0.5271097074438301, 0.536172257383496, 0.5452188274946398, 0.5542491558776504, 0.5632629815106848, 0.5722600442635857, 0.5812400849117456, 0.5902028451499086, 0.5991480676059163, 0.6080754958543902, 0.6169848744303564, 0.6258759488428054, 0.6347484655881916, 0.6436021721638676, 0.6524368170814537, 0.6612521498801447, 0.6700479211399468, 0.6788238824948502, 0.6875797866459328, 0.696315387374395, 0.705030439554526, 0.7137246991665983, 0.7223979233096917, 0.7310498702144456, 0.7396802992557386, 0.7482889709652933, 0.7568756470442087, 0.7654400903754144, 0.773982065036052, 0.7825013363097787, 0.7909976706989913, 0.7994708359369752, 0.8079206009999721, 0.8163467361191676, 0.8247490127926008, 0.8331272037969891, 0.8414810831994737, 0.8498104263692802, 0.8581150099892972, 0.86639461206757, 0.8746490119487088, 0.8828779903252119, 0.891081329248702, 0.8992588121410756, 0.9074102238055647, 0.915535350437709, 0.9236339796362408, 0.9317059004138777, 0.9397509032080267, 0.9477687798913954, 0.9557593237825127, 0.9637223296561568, 0.971657593753688, 0.9795649137932918, 0.987444088980122, 0.9952949200163546, 1.0031172091111407, 1.010910759990467, 1.0186753779069178, 1.026410869649338, 1.0341170435524019, 1.0417937095060785, 1.049440678965002, 1.057057764957738, 1.0646447820959544, 1.072201546583486, 1.0797278762253018, 1.0872235904363678, 1.0946885102504078, 1.1021224583285616, 1.109525258967938, 1.1168967381100672, 1.1242367233492432, 1.1315450439407653, 1.138821530809072, 1.1460660165557697, 1.1532783354675535, 1.1604583235240222, 1.1676058184053848, 1.1747206595000594, 1.1818026879121635, 1.1888517464688948, 1.1958676797278043, 1.2028503339839576, 1.2097995572769868, 1.216715199398033, 1.2235971118965756, 1.2304451480871514, 1.2372591630559617, 1.244039013667368, 1.250784558570273, 1.2574956582043917, 1.2641721748064054, 1.2708139724160072, 1.277420916881828, 1.2839928758672519, 1.2905297188561156, 1.2970313171582943, 1.3034975439151684, 1.309928274104981, 1.3163233845480724, 1.322682753912006, 1.3290062627165693, 1.3352937933386668, 1.3415452300170905, 1.3477604588571728, 1.3539393678353275, 1.360081846803466, 1.3661877874933017, 1.3722570835205314, 1.3782896303889036, 1.3842853254941612, 1.3902440681278732, 1.3961657594811425, 1.4020503026481956, 1.407897602629854, 1.4137075663368857, 1.419480102593236, 1.4252151221391411, 1.4309125376341194, 1.4365722636598428, 1.442194216722891, 1.4477783152573829, 1.4533244796274858, 1.4588326321298093, 1.464302696995675, 1.4697346003932659, 1.4751282704296567, 1.4804836371527221, 1.485800632552924, 1.4910791905649798, 1.496319247069407, 1.5015207398939505, 1.5066836088148845, 1.5118077955581977, 1.5168932438006546, 1.5219398991707382, 1.52694770924947, 1.531916623571109, 1.5368465936237317, 1.5417375728496885, 1.5465895166459434, 1.551402382364288, 1.556176129311438, 1.560910718749008, 1.5656061138933686, 1.5702622799153765, 1.5748791839399905, 1.5794567950457659, 1.583995084264226, 1.5884940245791161, 1.5929535909255377, 1.5973737601889615, 1.6017545112041214, 1.6060958247537893, 1.6103976835674314, 1.6146600723197424, 1.618882977629064, 1.623066388055683, 1.627210294100012, 1.6313146882006488, 1.635379564732322, 1.6394049200037144, 1.6433907522551714, 1.6473370616562915, 1.6512438503033982, 1.6551111222168964, 1.6589388833385101, 1.6627271415284075, 1.6664759065622043, 1.670185190127855, 1.6738550058224295, 1.677485369148769, 1.681076297512031, 1.6846278102161236, 1.6881399284600118, 1.691612675333924, 1.6950460758154409, 1.6984401567654628, 1.7017949469240758, 1.705110476906296, 1.708386779197708, 1.7116238881499848, 1.7148218399763036, 1.7179806727466422, 1.7211004263829728, 1.7241811426543383, 1.7272228651718227, 1.7302256393834112, 1.7331895125687398, 1.7361145338337374, 1.7390007541051595, 1.7418482261250132, 1.7446570044448746, 1.7474271454201022, 1.750158707203939, 1.7528517497415126, 1.7555063347637279, 1.758122525781054, 1.7607003880772092, 1.7632399887027408, 1.7657413964684971, 1.7682046819390054, 1.7706299174257378, 1.773017176980282, 1.775366536387408, 1.7776780731580322, 1.7799518665220844, 1.7821879974212729, 1.784386548501752, 1.7865476041066872, 1.7886712502687285, 1.790757574702379, 1.7928066667962728, 1.7948186176053516, 1.7967935198429503, 1.7987314678727828, 1.8006325577008355, 1.8024968869671691, 1.8043245549376228, 1.8061156624954278, 1.80787031213273, 1.8095886079420198, 1.811270655607472, 1.812916562396195, 1.814526437149388, 1.8161003902734187, 1.8176385337307999, 1.8191409810310903, 1.8206078472216989, 1.8220392488786123, 1.823435304097031, 1.824796132481921, 1.826121855138486, 1.8274125946625484, 1.8286684751308608, 1.8298896220913188, 1.831076162553107, 1.8322282249767596, 1.833345939264138, 1.8344294367483347, 1.8354788501834967, 1.836494313734572, 1.8374759629669797, 1.8384239348362033, 1.83933836767731, 1.8402194011943958, 1.841067176449956, 1.8418818358541833, 1.8426635231541955, 1.8434123834231888, 1.844128563049525, 1.8448122097257442, 1.845463472437514, 1.8460825014525053, 1.8466694483092048, 1.8472244658056605, 1.8477477079881606, 1.848239330139848, 1.8486994887692714, 1.8491283415988724, 1.8495260475534123, 1.8498927667483336, 1.8502286604780669, 1.8505338912042726, 1.8508086225440252, 1.8510530192579429, 1.8512672472382543, 1.8514514734968137, 1.8516058661530583, 1.8517305944219122, 1.8518258286016351, 1.851891740061621, 1.8519285012301394, 1.8519362855820338, 1.8519152676263617, 1.851865622893989, 1.851787527925138, 1.8516811602568832, 1.8515466984106042, 1.8513843218793893, 1.8511942111154005, 1.8509765475171844, 1.8507315134169502, 1.8504592920678007, 1.8501600676309216, 1.8498340251627292, 1.8494813506019856, 1.8491022307568654, 1.8486968532919925, 1.8482654067154385, 1.84780808036568, 1.84732506439853, 1.8468165497740265, 1.846282728243294, 1.8457237923353715, 1.845139935344006, 1.8445313513144208, 1.843898235030051, 1.8432407819992513, 1.8425591884419759, 1.8418536512764339, 1.841124368105716, 1.8403715372043987, 1.8395953575051247, 1.8387960285851572, 1.8379737506529175, 1.837128724534498, 1.8362611516601546, 1.8353712340507826, 1.8344591743043757, 1.8335251755824584, 1.832569441596517, 1.8315921765944028, 1.8305935853467237, 1.8295738731332292, 1.8285332457291716, 1.8274719093916678, 1.826390070846037, 1.8252879372721416, 1.8241657162907108, 1.82302361594966, 1.8218618447104011, 1.8206806114341494, 1.8194801253682233, 1.8182605961323415, 1.8170222337049151, 1.815765248409339, 1.8144898509002818, 1.8131962521499745, 1.8118846634345023, 1.8105552963200935, 1.8092083626494133, 1.8078440745278637, 1.8064626443098835, 1.8050642845852523, 1.8036492081654083, 1.802217628069764, 1.8007697575120367, 1.7993058098865846, 1.7978259987547522, 1.7963305378312289, 1.794819640970419, 1.793293522152821, 1.791752395471426, 1.790196475118125, 1.7886259753701317, 1.7870411105764308, 1.7854420951442296, 1.783829143525437, 1.782202470203159, 1.7805622896782147, 1.778908816455671, 1.7772422650314008, 1.7755628498786624, 1.7738707854347053, 1.7721662860873968, 1.7704495661618744, 1.7687208399072278, 1.7669803214832027, 1.7652282249469373, 1.7634647642397219, 1.7616901531737947, 1.7599046054191652, 1.7581083344904647, 1.7563015537338371, 1.7544844763138567, 1.7526573152004816, 1.7508202831560433, 1.7489735927222692, 1.7471174562073453, 1.7452520856730112, 1.7433776929216995, 1.741494489483708, 1.7396026866044163, 1.7377024952315405, 1.7357941260024312, 1.7338777892314112, 1.7319536948971606, 1.7300220526301406, 1.7280830717000664, 1.726136961003424, 1.7241839290510317, 1.7222241839556534, 1.720257933419654, 1.718285384722708, 1.7163067447095561, 1.7143222197778116, 1.712332015865819, 1.7103363384405637, 1.708335392485634, 1.7063293824892376, 1.7043185124322724, 1.70230298577645, 1.7002830054524778, 1.6982587738482948, 1.696230492797368, 1.6941983635670417, 1.692162586846951, 1.6901233627374894, 1.688080890738342, 1.6860353697370734, 1.6839869979977822, 1.681935973149815, 1.6798824921765436, 1.6778267514042073, 1.675768946490817, 1.673709272415126, 1.671647923465667, 1.6695850932298535, 1.6675209745831487, 1.6654557596783044, 1.6633896399346637, 1.6613228060275378, 1.6592554478776482, 1.6571877546406415, 1.6551199146966742, 1.653052115640069, 1.650984544269044, 1.6489173865755142, 1.646850827734965, 1.644785052096402, 1.6427202431723744, 1.640656583629072, 1.6385942552765018, 1.6365334390587356, 1.63447431504424, 1.6324170624162797, 1.6303618594634006, 1.6283088835699917, 1.6262583112069258, 1.6242103179222789, 1.6221650783321322, 1.6201227661114512, 1.6180835539850515, 1.6160476137186397, 1.614015116109942, 1.6119862309799133, 1.6099611271640306, 1.607939972503668, 1.6059229338375587, 1.603910176993341, 1.6019018667791889, 1.5998981669755272, 1.5978992403268368, 1.5959052485335423, 1.5939163522439896, 1.5919327110465085, 1.5899544834615658, 1.5879818269340056, 1.5860148978253772, 1.584053851406355, 1.5820988418492448, 1.5801500222205824, 1.578207544473822, 1.5762715594421146, 1.5743422168311796, 1.572419665212264, 1.5705040520151985, 1.5685955235215412, 1.5666942248578184, 1.5648002999888537, 1.562913891711193, 1.5610351416466248, 1.5591641902357887, 1.5573011767318852, 1.5554462391944734, 1.5535995144833707, 1.5517611382526388, 1.549931244944674], "ci": [-0.8246630625809456, -0.7884999027275412, -0.7537275830159593, -0.7202524051490965, -0.6879901112647359, -0.6568646556001156, -0.6268071696200747, -0.5977550851580332, -0.5696513874737703, -0.5424439757929368, -0.516085113287058, -0.49053095188985757, -0.4657411200542503, -0.44167836370356606, -0.4183082323471476, -0.39559880370999295, -0.3735204413412472, -0.352045580572787, -0.33114853893979157, -0.3108053477834373, -0.2909936022577151, -0.2716923273783501, -0.2528818580980789, -0.23454373168199275, -0.21666059089955422, -0.1992160967545049, -0.18219484964686086, -0.16558231800793327, -0.1493647735742129, -0.1335292325726129, -0.11806340218089877, -0.1029556317056166, -0.0881948679874192, -0.07377061460208573, -0.05967289447610953, -0.04589221557963662, -0.03241953939776997, -0.01924625191460018, -0.006364136873497336, 0.006234648897245718, 0.018557598281868745, 0.030611874966389632, 0.04240433297090444, 0.05394153476080049, 0.06522976805911185, 0.07627506147015321, 0.08708319901382043, 0.09765973366038751, 0.10800999994710167, 0.11813912575026525, 0.1280520432796853, 0.1377534993562711, 0.1472480650280872, 0.15654014457525753, 0.16563398394968692, 0.17453367869158815, 0.1832431813612025, 0.19176630852085857, 0.2001067472995751, 0.20826806156975233, 0.21625369776308823, 0.22406699035066382, 0.23171116701015212, 0.23918935350129705, 0.2465045782691576, 0.2536597767931084, 0.2606577956982184, 0.26750139664437145, 0.27419326000734706, 0.28073598836503166, 0.28713210980096204, 0.2933840810365268, 0.2994942904023362, 0.3054650606585263, 0.31129865167308035, 0.3169972629666182, 0.32256303613152, 0.32799805713272234, 0.3333043584970206, 0.33848392139726236, 0.3435386776373902, 0.3484705115439025, 0.35328126176893837, 0.35797272300986105, 0.36254664764989764, 0.3670047473241111, 0.37134869441470786, 0.3755801234794389, 0.3797006326166208, 0.38371178477008355, 0.38761510897716206, 0.39141210156264844, 0.3951042272814616, 0.3986929204126176, 0.4021795858069406, 0.4055655998908096, 0.4088523116281039, 0.41204104344238923, 0.41513309210126886, 0.4181297295647169, 0.4210322037991101, 0.42384173955857984, 0.42655953913521627, 0.4291867830795737, 0.43172463089285074, 0.4341742216920392, 0.4365366748492734, 0.43881309060654483, 0.44100455066688204, 0.4431121187630448, 0.4451368412047238, 0.4470797474051879, 0.4489418503882695, 0.4507241472765422, 0.45242761976149254, 0.4540532345564516, 0.45560194383301905, 0.4570746856416679, 0.4584723843171913, 0.4597959508696174, 0.4610462833611906, 0.4622242672699866, 0.4633307758407044, 0.46436667042314916, 0.4653328007989009, 0.466230005496638, 0.4670591120965605, 0.4678209375243445, 0.46851628833503345, 0.4691459609872546, 0.4697107421081371, 0.4702114087492817, 0.47064872863412577, 0.47102346039702736, 0.47133635381437833, 0.47158815002804455, 0.471779581761416, 0.4719113735283422, 0.4719842418352095, 0.47199889537641304, 0.4719560352234595, 0.4718563550079331, 0.47170054109854087, 0.4714892727724507, 0.47122322238112224, 0.47090305551082334, 0.4705294311380219, 0.4701030017798261, 0.46962441363964746, 0.46909430674825014, 0.4685133151003459, 0.46788206678688204, 0.46720118412317313, 0.4664712837730123, 0.4656929768689003, 0.4648668691285195, 0.4639935609675766, 0.46307364760913605, 0.46210771918955884, 0.4610963608611556, 0.4600401528916641, 0.4589396707606501, 0.457795485252934, 0.4566081625491356, 0.4553782643134334, 0.45410634777862013, 0.4527929658285458, 0.45143866707802904, 0.4500439959503154, 0.4486094927521559, 0.4471356937465887, 0.44562313122348407, 0.4440723335679314, 0.4424838253265253, 0.4408581272716239, 0.43919575646363407, 0.43749722631138643, 0.43576304663066, 0.4339937237009056, 0.43218976032023027, 0.4303516558586876, 0.4284799063099297, 0.4265750043412656, 0.4246374393421749, 0.4226676974713248, 0.42066626170212684, 0.41863361186688575, 0.41657022469957516, 0.41447657387728243, 0.4123531300603591, 0.41020036093131895, 0.4080187312325161, 0.4058087028026377, 0.4035707346120495, 0.4013052827970237, 0.3990128006928805, 0.39669373886607884, 0.39434854514528117, 0.3919776646514248, 0.38958153982682564, 0.3871606104633454, 0.38471531372964274, 0.3822460841975436, 0.37975335386754283, 0.37723755219347466, 0.3746991061063665, 0.37213844003750296, 0.3695559759407203, 0.36695213331395626, 0.3643273292200706, 0.361681978306964, 0.35901649282700787, 0.3563312826558085, 0.3536267553103245, 0.3509033159663537, 0.3481613674754078, 0.34540131038099364, 0.3426235429343125, 0.3398284611094027, 0.3370164586177329, 0.33418792692226584, 0.33134325525100405, 0.3284828306100376, 0.3256070377961042, 0.3227162594086732, 0.319810875861573, 0.3168912653941709, 0.31395780408211715, 0.3110108658476711, 0.3080508224696126, 0.30507804359276114, 0.30209289673710393, 0.299095747306553, 0.29608695859733425, 0.2930668918060264, 0.2900359060372526, 0.2869943583110435, 0.2839426035698718, 0.28088099468537897, 0.2778098824647903, 0.2747296156570431, 0.27164054095861845, 0.26854300301910605, 0.26543734444649036, 0.2623239058121811, 0.25920302565578934, 0.25607504048965835, 0.25294028480315744, 0.24979909106674514, 0.2466517897358098, 0.24349870925429573, 0.2403401760581214, 0.23717651457839173, 0.23400804724442192, 0.23083509448656714, 0.22765797473887361, 0.22447700444155205, 0.22129249804328177, 0.21810476800334988, 0.2149141247936357, 0.21172087690043795, 0.2085253308261581, 0.20532779109084243, 0.20212856023358539, 0.19892793881380544, 0.19572622541239038, 0.19252371663272605, 0.18932070710160698, 0.1861174894700346, 0.18291435441391113, 0.17971159063462672, 0.1765094848595543, 0.17330832184244693, 0.17010838436374875, 0.16690995323081514, 0.16371330727805944, 0.16051872336701734, 0.15732647638634067, 0.1541368392517164, 0.15095008290572975, 0.14776647631765538, 0.14458628648319527, 0.14140977842416036, 0.13823721518809973, 0.13506885784788558, 0.13190496550124542, 0.12874579527026087, 0.12559160230082012, 0.12244263976204195, 0.11929915884566245, 0.11616140876539283, 0.11302963675625222, 0.10990408807387397, 0.10678500599379426, 0.1036726318107164, 0.10056720483776815, 0.09746896240573522, 0.09437813986229404, 0.09129497057122915, 0.08821968591164842, 0.08515251527719281, 0.08209368607524814, 0.07904342372615458, 0.07600195166242085, 0.07296949132794728, 0.06994626217724953, 0.0669324816746999, 0.06392836529377521, 0.060934126516321685, 0.057949976831835004, 0.05497612573675559, 0.052012780733790454, 0.04906014733124753, 0.046118429042400155, 0.043187827384877586, 0.04026854188007323, 0.037360770052595305, 0.03446470742973351, 0.03158054754096917, 0.02870848191751363, 0.02584870009187945, 0.023001389597494093, 0.020166735968347282, 0.017344922738678825, 0.0145361314427086, 0.011740541614409405, 0.008958330787316005, 0.006189674494395225, 0.003434746267943156, 0.000693717639544067, -0.0020332418599275925, -0.004745964700253902, -0.007444285351769997, -0.010128040285208195, -0.01279706797148461, -0.015451208881438916, -0.01809030548551127, -0.020714202253365288, -0.023322745653454158, -0.025915784152527488, -0.028493168215075082, -0.031054750302716982, -0.03360038487352557, -0.03612992838128615, -0.038643239274700036, -0.04114017799651415, -0.0436206069825924, -0.046084390660920294, -0.04853139545053797, -0.05096148976041448, -0.05337454398824559, -0.055770430519187064, -0.058149023724517024, -0.06051019996023088, -0.06285383756555762, -0.06517981686141683, -0.06748802014879085, -0.06977833170703307, -0.0720506377920993, -0.07430482663470284, -0.07654078843840417, -0.07875841537761175, -0.08095760159552179, -0.0831382432019705, -0.08530023827121735, -0.08744348683964853, -0.08956789090340256, -0.09167335441591895, -0.09375978328541046, -0.09582708537225404, -0.09787517048630345, -0.0999039503841237, -0.10191333876614772, -0.103903251273747, -0.1058736054862286, -0.10782432091775052, -0.10975531901415136, -0.11166652314970538, -0.11355785862379264, -0.11542925265748849, -0.11728063439007386, -0.11911193487545768, -0.12092308707852517, -0.12271402587139502, -0.12448468802960644, -0.12623501222820943, -0.12796493903778305, -0.1296744109203667, -0.13136337222531003, -0.13303176918503912, -0.13467954991073894, -0.13630666438795602, -0.13791306447211538, -0.1394987038839508, -0.14106353820486545, -0.14260752487219136, -0.1441306231743794, -0.14563279424610012, -0.1471140010632639, -0.14857420843795688, -0.1500133830132941, -0.1514314932581915, -0.15282850946205212, -0.15420440372937305, -0.15555914997426726, -0.15689272391490414, -0.15820510306786797, -0.1594962667424338, -0.16076619603476072, -0.1620148738220053, -0.16324228475635105, -0.16444841525895745, -0.16563325351382857, -0.16679678946159862, -0.16793901479323853, -0.1690599229436808, -0.1701595090853642, -0.17123777012169863, -0.17229470468044975, -0.1733303131070435, -0.1743445974577929, -0.1753375614930438, -0.17630921067024305, -0.17725955213692787, -0.17818859472363713, -0.17909634893674464, -0.17998282695121512, -0.18084804260328274, -0.18169201138305324, -0.18251475042702925, -0.18331627851055948, -0.1840966160402126, -0.1848557850460751, -0.18559380917397553, -0.1863107136776321, -0.18700652541072837, -0.1876812728189135, -0.18833498593173048, -0.1889676963544705, -0.18957943725995585, -0.19017024338024974, -0.19074015099829592, -0.19128919793948618, -0.19181742356315776, -0.1923248687540206, -0.19281157591351528, -0.19327758895110111, -0.19372295327547662, -0.19414771578573084, -0.19455192486242806, -0.1949356303586248, -0.1952988835908208, -0.1956417373298434, -0.19596424579166696, -0.1962664646281674, -0.19654845091781195, -0.19681026315628575, -0.19705196124705462, -0.19727360649186565, -0.19747526158118572, -0.19765699058457806, -0.1978188589410187, -0.19796093344915194, -0.19808328225748678, -0.19818597485453363, -0.19826908205888347, -0.19833267600922824, -0.19837683015432456, -0.198401619242901, -0.19840711931350927, -0.19839340768431984, -0.1983605629428636, -0.19830866493571925, -0.19823779475814654, -0.19814803474366904, -0.1980394684536022, -0.19791218066653246, -0.197766257367744, -0.1976017857385971, -0.19741885414585572, -0.1972175521309678, -0.19699797039929678, -0.19676020080930676, -0.19650433636170045, -0.19623047118851197, -0.19593870054215418, -0.19562912078442174, -0.19530182937545146, -0.19495692486263827, -0.19459450686951, -0.19421467608456086, -0.19381753425004383, -0.19340318415072322, -0.19297172960258796, -0.1925232754415269, -0.1920579275119658, -0.19157579265546773, -0.19107697869929752, -0.19056159444494983, -0.1900297496566439]}

},{}],114:[function(require,module,exports){
module.exports={"x": [-0.0001, -0.0006008016032064129, -0.0011016032064128257, -0.0016024048096192386, -0.002103206412825651, -0.002604008016032064, -0.003104809619238477, -0.0036056112224448897, -0.004106412825651303, -0.004607214428857716, -0.005108016032064128, -0.005608817635270541, -0.0061096192384769545, -0.006610420841683367, -0.00711122244488978, -0.007612024048096192, -0.008112825651302604, -0.008613627254509017, -0.00911442885771543, -0.009615230460921843, -0.010116032064128255, -0.01061683366733467, -0.011117635270541082, -0.011618436873747494, -0.012119238476953908, -0.01262004008016032, -0.013120841683366732, -0.013621643286573145, -0.014122444889779559, -0.014623246492985971, -0.015124048096192383, -0.015624849699398797, -0.01612565130260521, -0.016626452905811624, -0.017127254509018034, -0.017628056112224448, -0.018128857715430862, -0.018629659318637273, -0.019130460921843687, -0.0196312625250501, -0.02013206412825651, -0.020632865731462925, -0.02113366733466934, -0.02163446893787575, -0.022135270541082164, -0.022636072144288578, -0.02313687374749499, -0.023637675350701402, -0.024138476953907816, -0.024639278557114227, -0.02514008016032064, -0.02564088176352705, -0.026141683366733465, -0.02664248496993988, -0.02714328657314629, -0.027644088176352704, -0.028144889779559118, -0.02864569138276553, -0.029146492985971943, -0.029647294589178357, -0.030148096192384767, -0.03064889779559118, -0.031149699398797595, -0.03165050100200401, -0.03215130260521042, -0.032652104208416834, -0.03315290581162325, -0.03365370741482966, -0.03415450901803607, -0.03465531062124249, -0.0351561122244489, -0.03565691382765531, -0.03615771543086173, -0.03665851703406814, -0.03715931863727455, -0.03766012024048097, -0.03816092184368738, -0.03866172344689379, -0.039162525050100205, -0.039663326653306616, -0.040164128256513026, -0.040664929859719444, -0.041165731462925854, -0.041666533066132265, -0.04216733466933868, -0.04266813627254509, -0.043168937875751504, -0.04366973947895792, -0.04417054108216433, -0.04467134268537074, -0.04517214428857716, -0.04567294589178357, -0.04617374749498998, -0.0466745490981964, -0.04717535070140281, -0.04767615230460922, -0.04817695390781564, -0.04867775551102205, -0.04917855711422846, -0.04967935871743487, -0.050180160320641286, -0.050680961923847696, -0.05118176352705411, -0.051682565130260524, -0.052183366733466935, -0.052684168336673345, -0.05318496993987976, -0.05368577154308617, -0.054186573146292584, -0.054687374749499, -0.05518817635270541, -0.05568897795591182, -0.05618977955911824, -0.05669058116232465, -0.05719138276553106, -0.05769218436873748, -0.05819298597194389, -0.0586937875751503, -0.05919458917835672, -0.05969539078156313, -0.06019619238476954, -0.060696993987975956, -0.061197795591182366, -0.06169859719438878, -0.062199398797595194, -0.06270020040080161, -0.06320100200400802, -0.06370180360721443, -0.06420260521042084, -0.06470340681362725, -0.06520420841683366, -0.06570501002004007, -0.0662058116232465, -0.06670661322645291, -0.06720741482965932, -0.06770821643286573, -0.06820901803607214, -0.06870981963927855, -0.06921062124248498, -0.06971142284569139, -0.0702122244488978, -0.07071302605210421, -0.07121382765531062, -0.07171462925851703, -0.07221543086172345, -0.07271623246492986, -0.07321703406813627, -0.07371783567134269, -0.0742186372745491, -0.0747194388777555, -0.07522024048096193, -0.07572104208416834, -0.07622184368737475, -0.07672264529058116, -0.07722344689378757, -0.07772424849699398, -0.07822505010020041, -0.07872585170340682, -0.07922665330661323, -0.07972745490981964, -0.08022825651302605, -0.08072905811623246, -0.08122985971943888, -0.0817306613226453, -0.0822314629258517, -0.08273226452905812, -0.08323306613226453, -0.08373386773547094, -0.08423466933867736, -0.08473547094188377, -0.08523627254509018, -0.0857370741482966, -0.086237875751503, -0.08673867735470941, -0.08723947895791584, -0.08774028056112225, -0.08824108216432866, -0.08874188376753507, -0.08924268537074148, -0.08974348697394789, -0.09024428857715432, -0.09074509018036073, -0.09124589178356714, -0.09174669338677355, -0.09224749498997996, -0.09274829659318637, -0.0932490981963928, -0.0937498997995992, -0.09425070140280561, -0.09475150300601203, -0.09525230460921844, -0.09575310621242485, -0.09625390781563127, -0.09675470941883768, -0.09725551102204409, -0.0977563126252505, -0.09825711422845691, -0.09875791583166332, -0.09925871743486973, -0.09975951903807616, -0.10026032064128257, -0.10076112224448898, -0.10126192384769539, -0.1017627254509018, -0.10226352705410821, -0.10276432865731464, -0.10326513026052105, -0.10376593186372746, -0.10426673346693387, -0.10476753507014028, -0.10526833667334669, -0.10576913827655311, -0.10626993987975952, -0.10677074148296593, -0.10727154308617234, -0.10777234468937875, -0.10827314629258517, -0.10877394789579159, -0.109274749498998, -0.10977555110220441, -0.11027635270541082, -0.11077715430861723, -0.11127795591182364, -0.11177875751503007, -0.11227955911823648, -0.11278036072144289, -0.1132811623246493, -0.11378196392785571, -0.11428276553106212, -0.11478356713426854, -0.11528436873747495, -0.11578517034068136, -0.11628597194388778, -0.11678677354709419, -0.1172875751503006, -0.11778837675350702, -0.11828917835671343, -0.11878997995991984, -0.11929078156312625, -0.11979158316633266, -0.12029238476953907, -0.1207931863727455, -0.12129398797595191, -0.12179478957915832, -0.12229559118236473, -0.12279639278557114, -0.12329719438877755, -0.12379799599198398, -0.12429879759519039, -0.1247995991983968, -0.1253004008016032, -0.1258012024048096, -0.12630200400801603, -0.12680280561122242, -0.12730360721442885, -0.12780440881763525, -0.12830521042084167, -0.1288060120240481, -0.1293068136272545, -0.12980761523046092, -0.1303084168336673, -0.13080921843687374, -0.13131002004008013, -0.13181082164328656, -0.13231162324649298, -0.13281242484969938, -0.1333132264529058, -0.1338140280561122, -0.13431482965931862, -0.13481563126252505, -0.13531643286573145, -0.13581723446893787, -0.13631803607214427, -0.1368188376753507, -0.1373196392785571, -0.1378204408817635, -0.13832124248496994, -0.13882204408817633, -0.13932284569138276, -0.13982364729458915, -0.14032444889779558, -0.140825250501002, -0.1413260521042084, -0.14182685370741482, -0.14232765531062122, -0.14282845691382764, -0.14332925851703404, -0.14383006012024047, -0.1443308617234469, -0.1448316633266533, -0.1453324649298597, -0.1458332665330661, -0.14633406813627253, -0.14683486973947896, -0.14733567134268535, -0.14783647294589178, -0.14833727454909817, -0.1488380761523046, -0.149338877755511, -0.14983967935871742, -0.15034048096192384, -0.15084128256513024, -0.15134208416833667, -0.15184288577154306, -0.1523436873747495, -0.1528444889779559, -0.1533452905811623, -0.15384609218436873, -0.15434689378757513, -0.15484769539078155, -0.15534849699398795, -0.15584929859719437, -0.1563501002004008, -0.1568509018036072, -0.15735170340681362, -0.15785250501002002, -0.15835330661322644, -0.15885410821643287, -0.15935490981963926, -0.1598557114228457, -0.16035651302605208, -0.1608573146292585, -0.1613581162324649, -0.16185891783567133, -0.16235971943887775, -0.16286052104208415, -0.16336132264529057, -0.16386212424849697, -0.1643629258517034, -0.1648637274549098, -0.16536452905811622, -0.16586533066132264, -0.16636613226452904, -0.16686693386773546, -0.16736773547094186, -0.16786853707414828, -0.1683693386773547, -0.1688701402805611, -0.16937094188376753, -0.16987174348697393, -0.17037254509018035, -0.17087334669338675, -0.17137414829659317, -0.1718749498997996, -0.172375751503006, -0.17287655310621242, -0.1733773547094188, -0.17387815631262524, -0.17437895791583166, -0.17487975951903806, -0.17538056112224448, -0.17588136272545088, -0.1763821643286573, -0.1768829659318637, -0.17738376753507012, -0.17788456913827655, -0.17838537074148295, -0.17888617234468937, -0.17938697394789577, -0.1798877755511022, -0.18038857715430862, -0.180889378757515, -0.18139018036072144, -0.18189098196392783, -0.18239178356713426, -0.18289258517034065, -0.18339338677354708, -0.1838941883767535, -0.1843949899799599, -0.18489579158316632, -0.18539659318637272, -0.18589739478957915, -0.18639819639278557, -0.18689899799599197, -0.1873997995991984, -0.1879006012024048, -0.1884014028056112, -0.1889022044088176, -0.18940300601202403, -0.18990380761523046, -0.19040460921843685, -0.19090541082164328, -0.19140621242484968, -0.1919070140280561, -0.19240781563126252, -0.19290861723446892, -0.19340941883767535, -0.19391022044088174, -0.19441102204408817, -0.19491182364729456, -0.195412625250501, -0.1959134268537074, -0.1964142284569138, -0.19691503006012023, -0.19741583166332663, -0.19791663326653305, -0.19841743486973945, -0.19891823647294588, -0.1994190380761523, -0.1999198396793587, -0.20042064128256512, -0.20092144288577152, -0.20142224448897794, -0.20192304609218437, -0.20242384769539076, -0.2029246492985972, -0.20342545090180358, -0.20392625250501, -0.2044270541082164, -0.20492785571142283, -0.20542865731462925, -0.20592945891783565, -0.20643026052104207, -0.20693106212424847, -0.2074318637274549, -0.20793266533066132, -0.20843346693386772, -0.20893426853707414, -0.20943507014028054, -0.20993587174348696, -0.21043667334669336, -0.21093747494989978, -0.2114382765531062, -0.2119390781563126, -0.21243987975951903, -0.21294068136272543, -0.21344148296593185, -0.21394228456913827, -0.21444308617234467, -0.2149438877755511, -0.2154446893787575, -0.21594549098196392, -0.2164462925851703, -0.21694709418837674, -0.21744789579158316, -0.21794869739478956, -0.21844949899799598, -0.21895030060120238, -0.2194511022044088, -0.21995190380761523, -0.22045270541082163, -0.22095350701402805, -0.22145430861723445, -0.22195511022044087, -0.22245591182364727, -0.2229567134268537, -0.22345751503006012, -0.2239583166332665, -0.22445911823647294, -0.22495991983967933, -0.22546072144288576, -0.22596152304609216, -0.22646232464929858, -0.226963126252505, -0.2274639278557114, -0.22796472945891783, -0.22846553106212422, -0.22896633266533065, -0.22946713426853707, -0.22996793587174347, -0.2304687374749499, -0.2309695390781563, -0.2314703406813627, -0.2319711422845691, -0.23247194388777553, -0.23297274549098196, -0.23347354709418836, -0.23397434869739478, -0.23447515030060118, -0.2349759519038076, -0.23547675350701402, -0.23597755511022042, -0.23647835671342685, -0.23697915831663324, -0.23747995991983967, -0.23798076152304606, -0.2384815631262525, -0.2389823647294589, -0.2394831663326653, -0.23998396793587173, -0.24048476953907813, -0.24098557114228455, -0.24148637274549098, -0.24198717434869738, -0.2424879759519038, -0.2429887775551102, -0.24348957915831662, -0.24399038076152302, -0.24449118236472944, -0.24499198396793587, -0.24549278557114226, -0.2459935871743487, -0.24649438877755508, -0.2469951903807615, -0.24749599198396793, -0.24799679358717433, -0.24849759519038075, -0.24899839679358715, -0.24949919839679358, -0.25], "si": [-9.999999994444444e-05, -0.0006008015911582525, -0.0011016031321445993, -0.0016024045810361055, -0.002103205895965406, -0.0026040070350651563, -0.003104807956468037, -0.0036056086183067636, -0.004106408978714088, -0.00460720899582281, -0.005108008627765778, -0.005608807832675903, -0.006109606568686155, -0.006610404793929578, -0.007111202466539293, -0.007611999544648499, -0.008112795986390493, -0.008613591749898663, -0.009114386793306497, -0.009615181074747596, -0.01011597455235567, -0.010616767184264561, -0.011117558928608221, -0.01161834974352075, -0.012119139587136382, -0.012619928417589502, -0.013120716193014638, -0.013621502871546487, -0.014122288411319904, -0.014623072770469913, -0.015123855907131731, -0.015624637779440741, -0.016125418345532525, -0.016626197563542864, -0.017126975391607728, -0.01762775178786332, -0.01812852671044604, -0.018629300117492507, -0.01913007196713959, -0.019630842217524366, -0.020131610826784163, -0.020632377753056565, -0.021133142954479406, -0.021633906389190757, -0.022134668015328995, -0.02263542779103273, -0.023136185674440875, -0.023636941623692627, -0.02413769559692746, -0.02463844755228515, -0.025139197447905787, -0.025639945241929762, -0.026140690892497778, -0.026641434357750876, -0.02714217559583041, -0.027642914564878072, -0.028143651223035904, -0.02864438552844629, -0.029145117439251973, -0.029645846913596043, -0.03014657390962197, -0.030647298385473594, -0.03114802029929514, -0.031648739609231195, -0.03214945627342676, -0.03265017025002722, -0.0331508814971784, -0.033651589973026474, -0.03415229563571808, -0.0346529984434003, -0.03515369835422057, -0.035654395326326804, -0.03615508931786737, -0.03665578028699109, -0.03715646819184721, -0.03765715299058544, -0.03815783464135598, -0.038658513102309486, -0.039159188331597115, -0.039659860287370466, -0.040160528927781686, -0.04066119421098339, -0.04116185609512869, -0.04166251453837124, -0.042163169498865186, -0.0426638209347652, -0.043164468804226495, -0.043665113065404826, -0.04416575367645647, -0.04466639059553826, -0.045167023780807614, -0.04566765319042245, -0.04616827878254132, -0.04666890051532331, -0.0471695183469281, -0.04767013223551595, -0.048170742139247734, -0.04867134801628489, -0.049171949824789486, -0.049672547522924215, -0.05017314106885237, -0.05067373042073785, -0.051174315536745216, -0.05167489637503967, -0.052175472893787024, -0.052676045051153746, -0.05317661280530703, -0.053677176114414624, -0.05417773493664502, -0.05467828923016735, -0.055178838953151454, -0.055679384063767816, -0.056179924520187705, -0.056680460280582975, -0.05718099130312625, -0.05768151754599088, -0.05818203896735088, -0.05868255552538105, -0.05918306717825688, -0.059683573884154614, -0.06018407560125123, -0.060684572287724496, -0.06118506390175287, -0.06168555040151563, -0.06218603174519281, -0.06268650789096522, -0.06318697879701438, -0.06368744442152273, -0.06418790472267343, -0.0646883596586504, -0.06518880918763847, -0.06568925326782324, -0.06618969185739108, -0.06669012491452922, -0.06719055239742577, -0.06769097426426961, -0.06819139047325048, -0.06869180098255902, -0.0691922057503867, -0.06969260473492578, -0.07019299789436952, -0.07069338518691194, -0.07119376657074802, -0.07169414200407362, -0.07219451144508546, -0.07269487485198117, -0.07319523218295933, -0.07369558339621939, -0.07419592844996173, -0.07469626730238763, -0.07519659991169939, -0.07569692623610015, -0.07619724623379406, -0.0766975598629862, -0.07719786708188259, -0.07769816784869024, -0.07819846212161714, -0.07869874985887225, -0.07919903101866545, -0.0796993055592077, -0.08019957343871094, -0.08069983461538806, -0.081200089047453, -0.08170033669312073, -0.08220057751060715, -0.08270081145812931, -0.08320103849390523, -0.08370125857615397, -0.08420147166309568, -0.08470167771295145, -0.08520187668394358, -0.08570206853429531, -0.08620225322223099, -0.08670243070597614, -0.08720260094375722, -0.08770276389380184, -0.08820291951433873, -0.0887030677635977, -0.08920320859980964, -0.08970334198120666, -0.09020346786602186, -0.09070358621248954, -0.09120369697884516, -0.0917038001233252, -0.09220389560416742, -0.09270398337961068, -0.09320406340789501, -0.0937041356472616, -0.09420420005595274, -0.09470425659221206, -0.09520430521428418, -0.09570434588041511, -0.09620437854885194, -0.09670440317784293, -0.09720441972563763, -0.09770442815048676, -0.09820442841064232, -0.09870442046435747, -0.09920440426988662, -0.09970437978548549, -0.10020434696941093, -0.10070430577992111, -0.10120425617527548, -0.10170419811373473, -0.10220413155356078, -0.10270405645301695, -0.10320397277036769, -0.10370388046387886, -0.10420377949181753, -0.10470366981245217, -0.10520355138405248, -0.10570342416488952, -0.10620328811323565, -0.10670314318736455, -0.1072029893455513, -0.10770282654607219, -0.10820265474720502, -0.10870247390722883, -0.10920228398442407, -0.10970208493707251, -0.11020187672345733, -0.1107016593018631, -0.11120143263057577, -0.11170119666788267, -0.11220095137207246, -0.11270069670143534, -0.11320043261426284, -0.1137001590688479, -0.11419987602348491, -0.11469958343646973, -0.11519928126609953, -0.11569896947067304, -0.11619864800849036, -0.11669831683785309, -0.11719797591706432, -0.11769762520442856, -0.11819726465825175, -0.11869689423684143, -0.11919651389850648, -0.11969612360155739, -0.12019572330430615, -0.12069531296506614, -0.12119489254215234, -0.12169446199388123, -0.1221940212785708, -0.12269357035454063, -0.12319310918011174, -0.12369263771360675, -0.1241921559133498, -0.12469166373766664, -0.12519116114488452, -0.12569064809333225, -0.12619012454134032, -0.12668959044724065, -0.12718904576936688, -0.12768849046605407, -0.12818792449563915, -0.12868734781646038, -0.12918676038685772, -0.1296861621651729, -0.13018555310974902, -0.130684933178931, -0.13118430233106532, -0.13168366052450015, -0.1321830077175852, -0.1326823438686719, -0.13318166893611344, -0.1336809828782645, -0.13418028565348158, -0.13467957722012278, -0.13517885753654788, -0.13567812656111838, -0.13617738425219747, -0.13667663056815013, -0.1371758654673428, -0.13767508890814403, -0.13817430084892374, -0.1386735012480537, -0.13917269006390748, -0.1396718672548603, -0.14017103277928925, -0.14067018659557298, -0.14116932866209211, -0.1416684589372289, -0.14216757737936742, -0.14266668394689352, -0.1431657785981948, -0.14366486129166073, -0.14416393198568253, -0.14466299063865318, -0.1451620372089676, -0.14566107165502237, -0.146160093935216, -0.14665910400794885, -0.14715810183162298, -0.1476570873646425, -0.1481560605654131, -0.14865502139234263, -0.14915396980384055, -0.1496529057583183, -0.15015182921418915, -0.15065074012986832, -0.15114963846377286, -0.15164852417432176, -0.15214739721993584, -0.15264625755903782, -0.15314510515005242, -0.15364393995140624, -0.15414276192152776, -0.15464157101884746, -0.15514036720179764, -0.1556391504288127, -0.15613792065832893, -0.15663667784878443, -0.1571354219586195, -0.15763415294627625, -0.15813287077019883, -0.15863157538883335, -0.1591302667606278, -0.15962894484403242, -0.1601276095974992, -0.1606262609794822, -0.16112489894843762, -0.16162352346282355, -0.1621221344811001, -0.16262073196172944, -0.1631193158631758, -0.1636178861439054, -0.16411644276238663, -0.16461498567708968, -0.16511351484648706, -0.16561203022905333, -0.16611053178326488, -0.16660901946760048, -0.16710749324054072, -0.16760595306056858, -0.16810439888616885, -0.16860283067582857, -0.1691012483880369, -0.16959965198128502, -0.17009804141406637, -0.1705964166448764, -0.17109477763221279, -0.17159312433457533, -0.17209145671046586, -0.1725897747183885, -0.17308807831684947, -0.1735863674643572, -0.17408464211942237, -0.17458290224055756, -0.17508114778627784, -0.17557937871510024, -0.17607759498554423, -0.17657579655613123, -0.1770739833853851, -0.17757215543183175, -0.17807031265399934, -0.17856845501041835, -0.1790665824596214, -0.17956469496014346, -0.1800627924705216, -0.18056087494929518, -0.18105894235500597, -0.18155699464619784, -0.18205503178141702, -0.18255305371921196, -0.18305106041813343, -0.18354905183673453, -0.1840470279335706, -0.18454498866719926, -0.1850429339961805, -0.18554086387907662, -0.18603877827445225, -0.18653667714087424, -0.18703456043691197, -0.18753242812113702, -0.18803028015212334, -0.18852811648844725, -0.18902593708868742, -0.18952374191142496, -0.19002153091524318, -0.19051930405872797, -0.19101706130046742, -0.1915148025990522, -0.1920125279130752, -0.19251023720113183, -0.19300793042181982, -0.1935056075337395, -0.19400326849549332, -0.19450091326568647, -0.19499854180292636, -0.19549615406582294, -0.19599375001298858, -0.19649132960303808, -0.19698889279458878, -0.1974864395462604, -0.19798396981667515, -0.19848148356445777, -0.19897898074823542, -0.19947646132663777, -0.199973925258297, -0.20047137250184777, -0.20096880301592734, -0.20146621675917536, -0.20196361369023402, -0.2024609937677481, -0.20295835695036488, -0.20345570319673426, -0.20395303246550853, -0.2044503447153426, -0.2049476399048941, -0.20544491799282283, -0.2059421789377916, -0.20643942269846555, -0.20693664923351252, -0.2074338585016028, -0.20793105046140936, -0.2084282250716079, -0.20892538229087645, -0.20942252207789588, -0.20991964439134952, -0.21041674918992356, -0.2109138364323066, -0.21141090607718988, -0.2119079580832675, -0.21240499240923594, -0.21290200901379458, -0.21339900785564533, -0.2138959888934928, -0.21439295208604423, -0.2148898973920096, -0.21538682477010154, -0.2158837341790355, -0.2163806255775295, -0.21687749892430427, -0.21737435417808326, -0.21787119129759272, -0.21836801024156155, -0.2188648109687214, -0.21936159343780665, -0.21985835760755446, -0.2203551034367047, -0.22085183088400004, -0.22134853990818593, -0.2218452304680104, -0.2223419025222246, -0.22283855602958216, -0.22333519094883963, -0.22383180723875626, -0.22432840485809427, -0.22482498376561855, -0.22532154392009687, -0.22581808528029973, -0.22631460780500054, -0.22681111145297558, -0.2273075961830038, -0.22780406195386718, -0.22830050872435043, -0.22879693645324123, -0.2292933450993299, -0.2297897346214099, -0.2302861049782774, -0.2307824561287315, -0.23127878803157415, -0.23177510064561027, -0.23227139392964766, -0.23276766784249694, -0.2332639223429717, -0.23376015738988845, -0.23425637294206667, -0.23475256895832874, -0.23524874539749988, -0.23574490221840833, -0.23624103937988533, -0.23673715684076502, -0.23723325455988453, -0.2377293324960839, -0.23822539060820627, -0.23872142885509753, -0.23921744719560684, -0.239713445588586, -0.24020942399289028, -0.24070538236737754, -0.24120132067090883, -0.24169723886234812, -0.24219313690056263, -0.2426890147444223, -0.24318487235280034, -0.24368070968457292, -0.24417652669861928, -0.2446723233538215, -0.2451680996090652, -0.2456638554232386, -0.24615959075523322, -0.24665530556394358, -0.24715099980826727, -0.24764667344710514, -0.2481423264393609, -0.24863795874394162, -0.24913357031975716], "ci": [-8.633124709574648, -6.8400302144042655, -6.233773338347898, -5.859034749131103, -5.587077676440535, -5.37348950659965, -5.197589624789602, -5.048051559293328, -4.917993974142948, -4.802921491670446, -4.699735060246429, -4.606207541658889, -4.520684492447774, -4.441903219214107, -4.368878094211612, -4.300824991109329, -4.237109845378832, -4.177212649027295, -4.120701635647991, -4.067214379507651, -4.016443699050059, -3.968126969963971, -3.9220379036938042, -3.877980138866089, -3.8357821861085433, -3.7952933971373084, -3.756380718739616, -3.718926055105001, -3.682824106618205, -3.6479805854246785, -3.6143107315958733, -3.5817380711040587, -3.550193369808342, -3.5196137474644793, -3.4899419232512057, -3.4611255700601307, -3.4331167592603, -3.4058714811387856, -3.37934922896788, -3.353512636830048, -3.328327163072713, -3.303760812663497, -3.279783892846658, -3.256368797419755, -3.233489815699655, -3.2111229628628353, -3.189245828852844, -3.1678374434687306, -3.146878155598535, -3.126349524854636, -3.106234224113377, -3.086515951668199, -3.0671793518803248, -3.048209943359311, -3.0295940538319632, -3.0113187609657994, -2.99337183850553, -2.975741707160201, -2.9584173897469093, -2.9413884701559323, -2.9246450557531287, -2.9081777428798015, -2.8919775851487515, -2.8760360642689067, -2.8603450631603202, -2.8448968411470954, -2.829684011038461, -2.814699517928112, -2.799936619559514, -2.7853888681203913, -2.77105009334335, -2.7569143868017782, -2.7429760873009843, -2.72922976727418, -2.7156702201014786, -2.7022924482777815, -2.689091652362242, -2.6760632206481763, -2.663202719497772, -2.650505884290914, -2.6379686109418805, -2.625586947941693, -2.613357088887515, -2.6012753654637457, -2.589338240842443, -2.5775423034733613, -2.5658842612363166, -2.554360935930821, -2.5429692580798893, -2.531706262026781, -2.5205690813050725, -2.5095549442639777, -2.498661169932218, -2.487885164104999, -2.4772244156398044, -2.4666764929477814, -2.456239040668442, -2.445909776516324, -2.435686488289031, -2.425567031026855, -2.415549324314848, -2.4056313497188646, -2.395811148347664, -2.386086818533706, -2.376456513625779, -2.366918439887047, -2.357470854492528, -2.3481120636204214, -2.3388404206320454, -2.3296543243355003, -2.3205522173284736, -2.311532584415903, -2.3025939510984665, -2.293734882128142, -2.28495398012728, -2.2762498842678847, -2.2676212690079693, -2.259066842882051, -2.2505853473430353, -2.242175555652879, -2.233836271819599, -2.2255663295783137, -2.217364591414148, -2.209229947624964, -2.201161315421964, -2.1931576380663733, -2.185217884040453, -2.1773410462512337, -2.169526141265423, -2.1617722085740465, -2.1540783098854255, -2.146443528445217, -2.1388669683822585, -2.1313477540790653, -2.123885029565874, -2.1164779579371698, -2.109125720789725, -2.101827517681182, -2.0945825656083037, -2.0873900985040303, -2.0802493667525352, -2.0731596367215186, -2.066120190311001, -2.0591303245179327, -2.052189351015944, -2.045296595749628, -2.038451398542736, -2.0316531127197357, -2.0249011047401764, -2.0181947538453495, -2.0115334517167534, -2.004916602145885, -1.9983436207149219, -1.991813934487854, -1.9853269817116697, -1.9788822115271916, -1.972479083689208, -1.966117068295529, -1.959795645524632, -1.9535143053815782, -1.9472725474518795, -1.941069880663028, -1.9349058230533944, -1.9287799015482348, -1.9226916517425334, -1.9166406176904416, -1.9106263517010684, -1.9046484141403999, -1.898706373239118, -1.8927998049061245, -1.8869282925475497, -1.8810914268910692, -1.875288805815335, -1.8695200341843439, -1.863784723686575, -1.858082492678732, -1.8524129660339286, -1.8467757749941753, -1.8411705570270112, -1.8355969556861527, -1.8300546204760137, -1.824543206719983, -1.8190623754323143, -1.8136117931935367, -1.8081911320292436, -1.8028000692921708, -1.7974382875474462, -1.7921054744609162, -1.7868013226904402, -1.7815255297800738, -1.7762777980570357, -1.771057834531376, -1.7658653507982658, -1.760700062942817, -1.7555616914473626, -1.7504499611011155, -1.745364600912138, -1.740305344021548, -1.7352719276198938, -1.7302640928656352, -1.7252815848056635, -1.7203241522978057, -1.7153915479352435, -1.710483527972802, -1.7055998522550457, -1.700740284146131, -1.6959045904613645, -1.6910925414004139, -1.6863039104821318, -1.6815384744809379, -1.6767960133647157, -1.6720763102341891, -1.6673791512637277, -1.6627043256435396, -1.658051625523224, -1.6534208459566333, -1.648811784848017, -1.644224242899403, -1.6396580235591938, -1.6351129329719325, -1.6305887799292165, -1.6260853758217182, -1.621602534592294, -1.61714007269014, -1.6126978090259776, -1.6082755649282325, -1.6038731641001844, -1.599490432578068, -1.595127198690084, -1.5907832930163148, -1.5864585483495088, -1.5821527996567155, -1.5778658840417483, -1.5735976407084538, -1.5693479109247666, -1.5651165379875311, -1.5609033671880705, -1.5567082457784778, -1.5525310229386218, -1.5483715497438428, -1.544229679133319, -1.5401052658790941, -1.5359981665557434, -1.5319082395106645, -1.5278353448349806, -1.5237793443350331, -1.5197401015044605, -1.5157174814968366, -1.5117113510988671, -1.5077215787041225, -1.5037480342872944, -1.4997905893789705, -1.4958491170409063, -1.4919234918417885, -1.4880135898334754, -1.484119288527703, -1.4802404668732467, -1.4763770052335308, -1.4725287853646674, -1.4686956903939234, -1.4648776047986019, -1.4610744143853258, -1.4572860062697213, -1.4535122688564839, -1.4497530918198267, -1.4460083660842944, -1.442277983805939, -1.4385618383538517, -1.4348598242920338, -1.4311718373616111, -1.4274977744633748, -1.4238375336406432, -1.4201910140624445, -1.4165581160070007, -1.4129387408455198, -1.4093327910262785, -1.4057401700589955, -1.402160782499488, -1.3985945339346009, -1.395041330967412, -1.3915010812026944, -1.3879736932326472, -1.38445907662287, -1.3809571418985898, -1.3774678005311343, -1.3739909649246338, -1.3705265484029663, -1.3670744651969204, -1.3636346304315883, -1.3602069601139748, -1.3567913711208197, -1.3533877811866295, -1.349996108891915, -1.346616273651631, -1.3432481957038092, -1.3398917960983878, -1.3365469966862278, -1.333213720108316, -1.329891889785146, -1.3265814299062815, -1.3232822654200906, -1.3199943220236523, -1.3167175261528279, -1.3134518049725012, -1.310197086366973, -1.306953298930519, -1.303720371958099, -1.3004982354362173, -1.2972868200339356, -1.294086057094024, -1.2908958786242624, -1.287716217288879, -1.2845470064001239, -1.2813881799099816, -1.2782396724020113, -1.275101419083322, -1.2719733557766681, -1.2688554189126764, -1.2657475455221912, -1.26264967322874, -1.2595617402411203, -1.2564836853460961, -1.2534154479012145, -1.250356967827727, -1.2473081856036268, -1.2442690422567886, -1.2412394793582142, -1.2382194390153842, -1.235208863865708, -1.2322076970700764, -1.2292158823065071, -1.2262333637638945, -1.2232600861358436, -1.2202959946146057, -1.217341034885099, -1.2143951531190205, -1.2114582959690472, -1.2085304105631198, -1.205611444498814, -1.2027013458377949, -1.1998000631003505, -1.1969075452600073, -1.1940237417382258, -1.1911486023991702, -1.1882820775445577, -1.185424117908578, -1.182574674652894, -1.1797336993617036, -1.1769011440368837, -1.1740769610931956, -1.1712611033535636, -1.1684535240444192, -1.1656541767911106, -1.1628630156133801, -1.1600799949209022, -1.157305069508887, -1.1545381945537438, -1.1517793256088067, -1.1490284186001203, -1.1462854298222802, -1.143550315934338, -1.1408230339557577, -1.1381035412624292, -1.1353917955827388, -1.1326877549936911, -1.1299913779170858, -1.1273026231157461, -1.1246214496897973, -1.1219478170730004, -1.119281685029129, -1.1166230136483999, -1.113971763343951, -1.1113278948483656, -1.1086913692102427, -1.1060621477908166, -1.1034401922606174, -1.1008254645961775, -1.098217927076784, -1.0956175422812706, -1.093024273084855, -1.0904380826560147, -1.0878589344534062, -1.0852867922228244, -1.0827216199942007, -1.0801633820786418, -1.0776120430655045, -1.07506756781951, -1.0725299214778967, -1.069999069447607, -1.067474977402513, -1.064957611280674, -1.0624469372816363, -1.059942921863757, -1.0574455317415712, -1.054954733883189, -1.0524704955077242, -1.0499927840827572, -1.0475215673218297, -1.0450568131819715, -1.042598489861256, -1.0401465657963878, -1.0377010096603236, -1.0352617903599142, -1.0328288770335852, -1.030402239049041, -1.0279818460009988, -1.0255676677089491, -1.0231596742149462, -1.020757835781423, -1.018362122889037, -1.0159725062345346, -1.0135889567286516, -1.0112114454940297, -1.0088399438631657, -1.0064744233763794, -1.0041148557798123, -1.0017612130234435, -0.9994134672591347, -0.9970715908386975, -0.9947355563119806, -0.9924053364249847, -0.9900809041179959, -0.9877622325237428, -0.9854492949655762, -0.9831420649556685, -0.9808405161932349, -0.9785446225627765, -0.9762543581323431, -0.9739696971518164, -0.9716906140512122, -0.9694170834390052, -0.9671490801004707, -0.9648865789960456, -0.9626295552597097, -0.9603779841973851, -0.9581318412853541, -0.9558911021686931, -0.9536557426597299, -0.951425738736511, -0.9492010665412941, -0.9469817023790519, -0.9447676227159953, -0.9425588041781146, -0.9403552235497329, -0.9381568577720822, -0.9359636839418883, -0.9337756793099781, -0.9315928212798971, -0.9294150874065463, -0.9272424553948332, -0.9250749030983352, -0.922912408517983, -0.9207549498007521, -0.9186025052383757, -0.9164550532660662, -0.914312572461253, -0.912175041542335, -0.9100424393674447, -0.9079147449332277, -0.9057919373736344, -0.9036739959587249, -0.9015609000934877, -0.8994526293166694, -0.89734916329962, -0.8952504818451471, -0.8931565648863855, -0.8910673924856772, -0.8889829448334637, -0.8869032022471907, -0.8848281451702232, -0.8827577541707744, -0.8806920099408436, -0.8786308932951665, -0.8765743851701772, -0.8745224666229783, -0.8724751188303276, -0.870432323087628, -0.8683940608079344, -0.8663603135209679, -0.8643310628721392, -0.8623062906215865, -0.860285978643218, -0.8582701089237694, -0.8562586635618672, -0.8542516247671033, -0.8522489748591205, -0.8502506962667048, -0.848256771526888, -0.8462671832840616, -0.8442819142890957, -0.8423009473984705, -0.8403242655734149, -0.8383518518790545, -0.836383689483567, -0.8344197616573489, -0.8324600517721876, -0.8305045433004427, -0.828553219814237, -0.8266060649846545, -0.8246630625809456]}

},{}],115:[function(require,module,exports){
module.exports={"x": [0.0001, 0.0006008016032064129, 0.0011016032064128257, 0.0016024048096192386, 0.002103206412825651, 0.002604008016032064, 0.003104809619238477, 0.0036056112224448897, 0.004106412825651303, 0.004607214428857716, 0.005108016032064128, 0.005608817635270541, 0.0061096192384769545, 0.006610420841683367, 0.00711122244488978, 0.007612024048096192, 0.008112825651302604, 0.008613627254509017, 0.00911442885771543, 0.009615230460921843, 0.010116032064128255, 0.01061683366733467, 0.011117635270541082, 0.011618436873747494, 0.012119238476953908, 0.01262004008016032, 0.013120841683366732, 0.013621643286573145, 0.014122444889779559, 0.014623246492985971, 0.015124048096192383, 0.015624849699398797, 0.01612565130260521, 0.016626452905811624, 0.017127254509018034, 0.017628056112224448, 0.018128857715430862, 0.018629659318637273, 0.019130460921843687, 0.0196312625250501, 0.02013206412825651, 0.020632865731462925, 0.02113366733466934, 0.02163446893787575, 0.022135270541082164, 0.022636072144288578, 0.02313687374749499, 0.023637675350701402, 0.024138476953907816, 0.024639278557114227, 0.02514008016032064, 0.02564088176352705, 0.026141683366733465, 0.02664248496993988, 0.02714328657314629, 0.027644088176352704, 0.028144889779559118, 0.02864569138276553, 0.029146492985971943, 0.029647294589178357, 0.030148096192384767, 0.03064889779559118, 0.031149699398797595, 0.03165050100200401, 0.03215130260521042, 0.032652104208416834, 0.03315290581162325, 0.03365370741482966, 0.03415450901803607, 0.03465531062124249, 0.0351561122244489, 0.03565691382765531, 0.03615771543086173, 0.03665851703406814, 0.03715931863727455, 0.03766012024048097, 0.03816092184368738, 0.03866172344689379, 0.039162525050100205, 0.039663326653306616, 0.040164128256513026, 0.040664929859719444, 0.041165731462925854, 0.041666533066132265, 0.04216733466933868, 0.04266813627254509, 0.043168937875751504, 0.04366973947895792, 0.04417054108216433, 0.04467134268537074, 0.04517214428857716, 0.04567294589178357, 0.04617374749498998, 0.0466745490981964, 0.04717535070140281, 0.04767615230460922, 0.04817695390781564, 0.04867775551102205, 0.04917855711422846, 0.04967935871743487, 0.050180160320641286, 0.050680961923847696, 0.05118176352705411, 0.051682565130260524, 0.052183366733466935, 0.052684168336673345, 0.05318496993987976, 0.05368577154308617, 0.054186573146292584, 0.054687374749499, 0.05518817635270541, 0.05568897795591182, 0.05618977955911824, 0.05669058116232465, 0.05719138276553106, 0.05769218436873748, 0.05819298597194389, 0.0586937875751503, 0.05919458917835672, 0.05969539078156313, 0.06019619238476954, 0.060696993987975956, 0.061197795591182366, 0.06169859719438878, 0.062199398797595194, 0.06270020040080161, 0.06320100200400802, 0.06370180360721443, 0.06420260521042084, 0.06470340681362725, 0.06520420841683366, 0.06570501002004007, 0.0662058116232465, 0.06670661322645291, 0.06720741482965932, 0.06770821643286573, 0.06820901803607214, 0.06870981963927855, 0.06921062124248498, 0.06971142284569139, 0.0702122244488978, 0.07071302605210421, 0.07121382765531062, 0.07171462925851703, 0.07221543086172345, 0.07271623246492986, 0.07321703406813627, 0.07371783567134269, 0.0742186372745491, 0.0747194388777555, 0.07522024048096193, 0.07572104208416834, 0.07622184368737475, 0.07672264529058116, 0.07722344689378757, 0.07772424849699398, 0.07822505010020041, 0.07872585170340682, 0.07922665330661323, 0.07972745490981964, 0.08022825651302605, 0.08072905811623246, 0.08122985971943888, 0.0817306613226453, 0.0822314629258517, 0.08273226452905812, 0.08323306613226453, 0.08373386773547094, 0.08423466933867736, 0.08473547094188377, 0.08523627254509018, 0.0857370741482966, 0.086237875751503, 0.08673867735470941, 0.08723947895791584, 0.08774028056112225, 0.08824108216432866, 0.08874188376753507, 0.08924268537074148, 0.08974348697394789, 0.09024428857715432, 0.09074509018036073, 0.09124589178356714, 0.09174669338677355, 0.09224749498997996, 0.09274829659318637, 0.0932490981963928, 0.0937498997995992, 0.09425070140280561, 0.09475150300601203, 0.09525230460921844, 0.09575310621242485, 0.09625390781563127, 0.09675470941883768, 0.09725551102204409, 0.0977563126252505, 0.09825711422845691, 0.09875791583166332, 0.09925871743486973, 0.09975951903807616, 0.10026032064128257, 0.10076112224448898, 0.10126192384769539, 0.1017627254509018, 0.10226352705410821, 0.10276432865731464, 0.10326513026052105, 0.10376593186372746, 0.10426673346693387, 0.10476753507014028, 0.10526833667334669, 0.10576913827655311, 0.10626993987975952, 0.10677074148296593, 0.10727154308617234, 0.10777234468937875, 0.10827314629258517, 0.10877394789579159, 0.109274749498998, 0.10977555110220441, 0.11027635270541082, 0.11077715430861723, 0.11127795591182364, 0.11177875751503007, 0.11227955911823648, 0.11278036072144289, 0.1132811623246493, 0.11378196392785571, 0.11428276553106212, 0.11478356713426854, 0.11528436873747495, 0.11578517034068136, 0.11628597194388778, 0.11678677354709419, 0.1172875751503006, 0.11778837675350702, 0.11828917835671343, 0.11878997995991984, 0.11929078156312625, 0.11979158316633266, 0.12029238476953907, 0.1207931863727455, 0.12129398797595191, 0.12179478957915832, 0.12229559118236473, 0.12279639278557114, 0.12329719438877755, 0.12379799599198398, 0.12429879759519039, 0.1247995991983968, 0.1253004008016032, 0.1258012024048096, 0.12630200400801603, 0.12680280561122242, 0.12730360721442885, 0.12780440881763525, 0.12830521042084167, 0.1288060120240481, 0.1293068136272545, 0.12980761523046092, 0.1303084168336673, 0.13080921843687374, 0.13131002004008013, 0.13181082164328656, 0.13231162324649298, 0.13281242484969938, 0.1333132264529058, 0.1338140280561122, 0.13431482965931862, 0.13481563126252505, 0.13531643286573145, 0.13581723446893787, 0.13631803607214427, 0.1368188376753507, 0.1373196392785571, 0.1378204408817635, 0.13832124248496994, 0.13882204408817633, 0.13932284569138276, 0.13982364729458915, 0.14032444889779558, 0.140825250501002, 0.1413260521042084, 0.14182685370741482, 0.14232765531062122, 0.14282845691382764, 0.14332925851703404, 0.14383006012024047, 0.1443308617234469, 0.1448316633266533, 0.1453324649298597, 0.1458332665330661, 0.14633406813627253, 0.14683486973947896, 0.14733567134268535, 0.14783647294589178, 0.14833727454909817, 0.1488380761523046, 0.149338877755511, 0.14983967935871742, 0.15034048096192384, 0.15084128256513024, 0.15134208416833667, 0.15184288577154306, 0.1523436873747495, 0.1528444889779559, 0.1533452905811623, 0.15384609218436873, 0.15434689378757513, 0.15484769539078155, 0.15534849699398795, 0.15584929859719437, 0.1563501002004008, 0.1568509018036072, 0.15735170340681362, 0.15785250501002002, 0.15835330661322644, 0.15885410821643287, 0.15935490981963926, 0.1598557114228457, 0.16035651302605208, 0.1608573146292585, 0.1613581162324649, 0.16185891783567133, 0.16235971943887775, 0.16286052104208415, 0.16336132264529057, 0.16386212424849697, 0.1643629258517034, 0.1648637274549098, 0.16536452905811622, 0.16586533066132264, 0.16636613226452904, 0.16686693386773546, 0.16736773547094186, 0.16786853707414828, 0.1683693386773547, 0.1688701402805611, 0.16937094188376753, 0.16987174348697393, 0.17037254509018035, 0.17087334669338675, 0.17137414829659317, 0.1718749498997996, 0.172375751503006, 0.17287655310621242, 0.1733773547094188, 0.17387815631262524, 0.17437895791583166, 0.17487975951903806, 0.17538056112224448, 0.17588136272545088, 0.1763821643286573, 0.1768829659318637, 0.17738376753507012, 0.17788456913827655, 0.17838537074148295, 0.17888617234468937, 0.17938697394789577, 0.1798877755511022, 0.18038857715430862, 0.180889378757515, 0.18139018036072144, 0.18189098196392783, 0.18239178356713426, 0.18289258517034065, 0.18339338677354708, 0.1838941883767535, 0.1843949899799599, 0.18489579158316632, 0.18539659318637272, 0.18589739478957915, 0.18639819639278557, 0.18689899799599197, 0.1873997995991984, 0.1879006012024048, 0.1884014028056112, 0.1889022044088176, 0.18940300601202403, 0.18990380761523046, 0.19040460921843685, 0.19090541082164328, 0.19140621242484968, 0.1919070140280561, 0.19240781563126252, 0.19290861723446892, 0.19340941883767535, 0.19391022044088174, 0.19441102204408817, 0.19491182364729456, 0.195412625250501, 0.1959134268537074, 0.1964142284569138, 0.19691503006012023, 0.19741583166332663, 0.19791663326653305, 0.19841743486973945, 0.19891823647294588, 0.1994190380761523, 0.1999198396793587, 0.20042064128256512, 0.20092144288577152, 0.20142224448897794, 0.20192304609218437, 0.20242384769539076, 0.2029246492985972, 0.20342545090180358, 0.20392625250501, 0.2044270541082164, 0.20492785571142283, 0.20542865731462925, 0.20592945891783565, 0.20643026052104207, 0.20693106212424847, 0.2074318637274549, 0.20793266533066132, 0.20843346693386772, 0.20893426853707414, 0.20943507014028054, 0.20993587174348696, 0.21043667334669336, 0.21093747494989978, 0.2114382765531062, 0.2119390781563126, 0.21243987975951903, 0.21294068136272543, 0.21344148296593185, 0.21394228456913827, 0.21444308617234467, 0.2149438877755511, 0.2154446893787575, 0.21594549098196392, 0.2164462925851703, 0.21694709418837674, 0.21744789579158316, 0.21794869739478956, 0.21844949899799598, 0.21895030060120238, 0.2194511022044088, 0.21995190380761523, 0.22045270541082163, 0.22095350701402805, 0.22145430861723445, 0.22195511022044087, 0.22245591182364727, 0.2229567134268537, 0.22345751503006012, 0.2239583166332665, 0.22445911823647294, 0.22495991983967933, 0.22546072144288576, 0.22596152304609216, 0.22646232464929858, 0.226963126252505, 0.2274639278557114, 0.22796472945891783, 0.22846553106212422, 0.22896633266533065, 0.22946713426853707, 0.22996793587174347, 0.2304687374749499, 0.2309695390781563, 0.2314703406813627, 0.2319711422845691, 0.23247194388777553, 0.23297274549098196, 0.23347354709418836, 0.23397434869739478, 0.23447515030060118, 0.2349759519038076, 0.23547675350701402, 0.23597755511022042, 0.23647835671342685, 0.23697915831663324, 0.23747995991983967, 0.23798076152304606, 0.2384815631262525, 0.2389823647294589, 0.2394831663326653, 0.23998396793587173, 0.24048476953907813, 0.24098557114228455, 0.24148637274549098, 0.24198717434869738, 0.2424879759519038, 0.2429887775551102, 0.24348957915831662, 0.24399038076152302, 0.24449118236472944, 0.24499198396793587, 0.24549278557114226, 0.2459935871743487, 0.24649438877755508, 0.2469951903807615, 0.24749599198396793, 0.24799679358717433, 0.24849759519038075, 0.24899839679358715, 0.24949919839679358, 0.25], "si": [9.999999994444444e-05, 0.0006008015911582525, 0.0011016031321445993, 0.0016024045810361055, 0.002103205895965406, 0.0026040070350651563, 0.003104807956468037, 0.0036056086183067636, 0.004106408978714088, 0.00460720899582281, 0.005108008627765778, 0.005608807832675903, 0.006109606568686155, 0.006610404793929578, 0.007111202466539293, 0.007611999544648499, 0.008112795986390493, 0.008613591749898663, 0.009114386793306497, 0.009615181074747596, 0.01011597455235567, 0.010616767184264561, 0.011117558928608221, 0.01161834974352075, 0.012119139587136382, 0.012619928417589502, 0.013120716193014638, 0.013621502871546487, 0.014122288411319904, 0.014623072770469913, 0.015123855907131731, 0.015624637779440741, 0.016125418345532525, 0.016626197563542864, 0.017126975391607728, 0.01762775178786332, 0.01812852671044604, 0.018629300117492507, 0.01913007196713959, 0.019630842217524366, 0.020131610826784163, 0.020632377753056565, 0.021133142954479406, 0.021633906389190757, 0.022134668015328995, 0.02263542779103273, 0.023136185674440875, 0.023636941623692627, 0.02413769559692746, 0.02463844755228515, 0.025139197447905787, 0.025639945241929762, 0.026140690892497778, 0.026641434357750876, 0.02714217559583041, 0.027642914564878072, 0.028143651223035904, 0.02864438552844629, 0.029145117439251973, 0.029645846913596043, 0.03014657390962197, 0.030647298385473594, 0.03114802029929514, 0.031648739609231195, 0.03214945627342676, 0.03265017025002722, 0.0331508814971784, 0.033651589973026474, 0.03415229563571808, 0.0346529984434003, 0.03515369835422057, 0.035654395326326804, 0.03615508931786737, 0.03665578028699109, 0.03715646819184721, 0.03765715299058544, 0.03815783464135598, 0.038658513102309486, 0.039159188331597115, 0.039659860287370466, 0.040160528927781686, 0.04066119421098339, 0.04116185609512869, 0.04166251453837124, 0.042163169498865186, 0.0426638209347652, 0.043164468804226495, 0.043665113065404826, 0.04416575367645647, 0.04466639059553826, 0.045167023780807614, 0.04566765319042245, 0.04616827878254132, 0.04666890051532331, 0.0471695183469281, 0.04767013223551595, 0.048170742139247734, 0.04867134801628489, 0.049171949824789486, 0.049672547522924215, 0.05017314106885237, 0.05067373042073785, 0.051174315536745216, 0.05167489637503967, 0.052175472893787024, 0.052676045051153746, 0.05317661280530703, 0.053677176114414624, 0.05417773493664502, 0.05467828923016735, 0.055178838953151454, 0.055679384063767816, 0.056179924520187705, 0.056680460280582975, 0.05718099130312625, 0.05768151754599088, 0.05818203896735088, 0.05868255552538105, 0.05918306717825688, 0.059683573884154614, 0.06018407560125123, 0.060684572287724496, 0.06118506390175287, 0.06168555040151563, 0.06218603174519281, 0.06268650789096522, 0.06318697879701438, 0.06368744442152273, 0.06418790472267343, 0.0646883596586504, 0.06518880918763847, 0.06568925326782324, 0.06618969185739108, 0.06669012491452922, 0.06719055239742577, 0.06769097426426961, 0.06819139047325048, 0.06869180098255902, 0.0691922057503867, 0.06969260473492578, 0.07019299789436952, 0.07069338518691194, 0.07119376657074802, 0.07169414200407362, 0.07219451144508546, 0.07269487485198117, 0.07319523218295933, 0.07369558339621939, 0.07419592844996173, 0.07469626730238763, 0.07519659991169939, 0.07569692623610015, 0.07619724623379406, 0.0766975598629862, 0.07719786708188259, 0.07769816784869024, 0.07819846212161714, 0.07869874985887225, 0.07919903101866545, 0.0796993055592077, 0.08019957343871094, 0.08069983461538806, 0.081200089047453, 0.08170033669312073, 0.08220057751060715, 0.08270081145812931, 0.08320103849390523, 0.08370125857615397, 0.08420147166309568, 0.08470167771295145, 0.08520187668394358, 0.08570206853429531, 0.08620225322223099, 0.08670243070597614, 0.08720260094375722, 0.08770276389380184, 0.08820291951433873, 0.0887030677635977, 0.08920320859980964, 0.08970334198120666, 0.09020346786602186, 0.09070358621248954, 0.09120369697884516, 0.0917038001233252, 0.09220389560416742, 0.09270398337961068, 0.09320406340789501, 0.0937041356472616, 0.09420420005595274, 0.09470425659221206, 0.09520430521428418, 0.09570434588041511, 0.09620437854885194, 0.09670440317784293, 0.09720441972563763, 0.09770442815048676, 0.09820442841064232, 0.09870442046435747, 0.09920440426988662, 0.09970437978548549, 0.10020434696941093, 0.10070430577992111, 0.10120425617527548, 0.10170419811373473, 0.10220413155356078, 0.10270405645301695, 0.10320397277036769, 0.10370388046387886, 0.10420377949181753, 0.10470366981245217, 0.10520355138405248, 0.10570342416488952, 0.10620328811323565, 0.10670314318736455, 0.1072029893455513, 0.10770282654607219, 0.10820265474720502, 0.10870247390722883, 0.10920228398442407, 0.10970208493707251, 0.11020187672345733, 0.1107016593018631, 0.11120143263057577, 0.11170119666788267, 0.11220095137207246, 0.11270069670143534, 0.11320043261426284, 0.1137001590688479, 0.11419987602348491, 0.11469958343646973, 0.11519928126609953, 0.11569896947067304, 0.11619864800849036, 0.11669831683785309, 0.11719797591706432, 0.11769762520442856, 0.11819726465825175, 0.11869689423684143, 0.11919651389850648, 0.11969612360155739, 0.12019572330430615, 0.12069531296506614, 0.12119489254215234, 0.12169446199388123, 0.1221940212785708, 0.12269357035454063, 0.12319310918011174, 0.12369263771360675, 0.1241921559133498, 0.12469166373766664, 0.12519116114488452, 0.12569064809333225, 0.12619012454134032, 0.12668959044724065, 0.12718904576936688, 0.12768849046605407, 0.12818792449563915, 0.12868734781646038, 0.12918676038685772, 0.1296861621651729, 0.13018555310974902, 0.130684933178931, 0.13118430233106532, 0.13168366052450015, 0.1321830077175852, 0.1326823438686719, 0.13318166893611344, 0.1336809828782645, 0.13418028565348158, 0.13467957722012278, 0.13517885753654788, 0.13567812656111838, 0.13617738425219747, 0.13667663056815013, 0.1371758654673428, 0.13767508890814403, 0.13817430084892374, 0.1386735012480537, 0.13917269006390748, 0.1396718672548603, 0.14017103277928925, 0.14067018659557298, 0.14116932866209211, 0.1416684589372289, 0.14216757737936742, 0.14266668394689352, 0.1431657785981948, 0.14366486129166073, 0.14416393198568253, 0.14466299063865318, 0.1451620372089676, 0.14566107165502237, 0.146160093935216, 0.14665910400794885, 0.14715810183162298, 0.1476570873646425, 0.1481560605654131, 0.14865502139234263, 0.14915396980384055, 0.1496529057583183, 0.15015182921418915, 0.15065074012986832, 0.15114963846377286, 0.15164852417432176, 0.15214739721993584, 0.15264625755903782, 0.15314510515005242, 0.15364393995140624, 0.15414276192152776, 0.15464157101884746, 0.15514036720179764, 0.1556391504288127, 0.15613792065832893, 0.15663667784878443, 0.1571354219586195, 0.15763415294627625, 0.15813287077019883, 0.15863157538883335, 0.1591302667606278, 0.15962894484403242, 0.1601276095974992, 0.1606262609794822, 0.16112489894843762, 0.16162352346282355, 0.1621221344811001, 0.16262073196172944, 0.1631193158631758, 0.1636178861439054, 0.16411644276238663, 0.16461498567708968, 0.16511351484648706, 0.16561203022905333, 0.16611053178326488, 0.16660901946760048, 0.16710749324054072, 0.16760595306056858, 0.16810439888616885, 0.16860283067582857, 0.1691012483880369, 0.16959965198128502, 0.17009804141406637, 0.1705964166448764, 0.17109477763221279, 0.17159312433457533, 0.17209145671046586, 0.1725897747183885, 0.17308807831684947, 0.1735863674643572, 0.17408464211942237, 0.17458290224055756, 0.17508114778627784, 0.17557937871510024, 0.17607759498554423, 0.17657579655613123, 0.1770739833853851, 0.17757215543183175, 0.17807031265399934, 0.17856845501041835, 0.1790665824596214, 0.17956469496014346, 0.1800627924705216, 0.18056087494929518, 0.18105894235500597, 0.18155699464619784, 0.18205503178141702, 0.18255305371921196, 0.18305106041813343, 0.18354905183673453, 0.1840470279335706, 0.18454498866719926, 0.1850429339961805, 0.18554086387907662, 0.18603877827445225, 0.18653667714087424, 0.18703456043691197, 0.18753242812113702, 0.18803028015212334, 0.18852811648844725, 0.18902593708868742, 0.18952374191142496, 0.19002153091524318, 0.19051930405872797, 0.19101706130046742, 0.1915148025990522, 0.1920125279130752, 0.19251023720113183, 0.19300793042181982, 0.1935056075337395, 0.19400326849549332, 0.19450091326568647, 0.19499854180292636, 0.19549615406582294, 0.19599375001298858, 0.19649132960303808, 0.19698889279458878, 0.1974864395462604, 0.19798396981667515, 0.19848148356445777, 0.19897898074823542, 0.19947646132663777, 0.199973925258297, 0.20047137250184777, 0.20096880301592734, 0.20146621675917536, 0.20196361369023402, 0.2024609937677481, 0.20295835695036488, 0.20345570319673426, 0.20395303246550853, 0.2044503447153426, 0.2049476399048941, 0.20544491799282283, 0.2059421789377916, 0.20643942269846555, 0.20693664923351252, 0.2074338585016028, 0.20793105046140936, 0.2084282250716079, 0.20892538229087645, 0.20942252207789588, 0.20991964439134952, 0.21041674918992356, 0.2109138364323066, 0.21141090607718988, 0.2119079580832675, 0.21240499240923594, 0.21290200901379458, 0.21339900785564533, 0.2138959888934928, 0.21439295208604423, 0.2148898973920096, 0.21538682477010154, 0.2158837341790355, 0.2163806255775295, 0.21687749892430427, 0.21737435417808326, 0.21787119129759272, 0.21836801024156155, 0.2188648109687214, 0.21936159343780665, 0.21985835760755446, 0.2203551034367047, 0.22085183088400004, 0.22134853990818593, 0.2218452304680104, 0.2223419025222246, 0.22283855602958216, 0.22333519094883963, 0.22383180723875626, 0.22432840485809427, 0.22482498376561855, 0.22532154392009687, 0.22581808528029973, 0.22631460780500054, 0.22681111145297558, 0.2273075961830038, 0.22780406195386718, 0.22830050872435043, 0.22879693645324123, 0.2292933450993299, 0.2297897346214099, 0.2302861049782774, 0.2307824561287315, 0.23127878803157415, 0.23177510064561027, 0.23227139392964766, 0.23276766784249694, 0.2332639223429717, 0.23376015738988845, 0.23425637294206667, 0.23475256895832874, 0.23524874539749988, 0.23574490221840833, 0.23624103937988533, 0.23673715684076502, 0.23723325455988453, 0.2377293324960839, 0.23822539060820627, 0.23872142885509753, 0.23921744719560684, 0.239713445588586, 0.24020942399289028, 0.24070538236737754, 0.24120132067090883, 0.24169723886234812, 0.24219313690056263, 0.2426890147444223, 0.24318487235280034, 0.24368070968457292, 0.24417652669861928, 0.2446723233538215, 0.2451680996090652, 0.2456638554232386, 0.24615959075523322, 0.24665530556394358, 0.24715099980826727, 0.24764667344710514, 0.2481423264393609, 0.24863795874394162, 0.24913357031975716], "ci": [-8.633124709574648, -6.8400302144042655, -6.233773338347898, -5.859034749131103, -5.587077676440535, -5.37348950659965, -5.197589624789602, -5.048051559293328, -4.917993974142948, -4.802921491670446, -4.699735060246429, -4.606207541658889, -4.520684492447774, -4.441903219214107, -4.368878094211612, -4.300824991109329, -4.237109845378832, -4.177212649027295, -4.120701635647991, -4.067214379507651, -4.016443699050059, -3.968126969963971, -3.9220379036938042, -3.877980138866089, -3.8357821861085433, -3.7952933971373084, -3.756380718739616, -3.718926055105001, -3.682824106618205, -3.6479805854246785, -3.6143107315958733, -3.5817380711040587, -3.550193369808342, -3.5196137474644793, -3.4899419232512057, -3.4611255700601307, -3.4331167592603, -3.4058714811387856, -3.37934922896788, -3.353512636830048, -3.328327163072713, -3.303760812663497, -3.279783892846658, -3.256368797419755, -3.233489815699655, -3.2111229628628353, -3.189245828852844, -3.1678374434687306, -3.146878155598535, -3.126349524854636, -3.106234224113377, -3.086515951668199, -3.0671793518803248, -3.048209943359311, -3.0295940538319632, -3.0113187609657994, -2.99337183850553, -2.975741707160201, -2.9584173897469093, -2.9413884701559323, -2.9246450557531287, -2.9081777428798015, -2.8919775851487515, -2.8760360642689067, -2.8603450631603202, -2.8448968411470954, -2.829684011038461, -2.814699517928112, -2.799936619559514, -2.7853888681203913, -2.77105009334335, -2.7569143868017782, -2.7429760873009843, -2.72922976727418, -2.7156702201014786, -2.7022924482777815, -2.689091652362242, -2.6760632206481763, -2.663202719497772, -2.650505884290914, -2.6379686109418805, -2.625586947941693, -2.613357088887515, -2.6012753654637457, -2.589338240842443, -2.5775423034733613, -2.5658842612363166, -2.554360935930821, -2.5429692580798893, -2.531706262026781, -2.5205690813050725, -2.5095549442639777, -2.498661169932218, -2.487885164104999, -2.4772244156398044, -2.4666764929477814, -2.456239040668442, -2.445909776516324, -2.435686488289031, -2.425567031026855, -2.415549324314848, -2.4056313497188646, -2.395811148347664, -2.386086818533706, -2.376456513625779, -2.366918439887047, -2.357470854492528, -2.3481120636204214, -2.3388404206320454, -2.3296543243355003, -2.3205522173284736, -2.311532584415903, -2.3025939510984665, -2.293734882128142, -2.28495398012728, -2.2762498842678847, -2.2676212690079693, -2.259066842882051, -2.2505853473430353, -2.242175555652879, -2.233836271819599, -2.2255663295783137, -2.217364591414148, -2.209229947624964, -2.201161315421964, -2.1931576380663733, -2.185217884040453, -2.1773410462512337, -2.169526141265423, -2.1617722085740465, -2.1540783098854255, -2.146443528445217, -2.1388669683822585, -2.1313477540790653, -2.123885029565874, -2.1164779579371698, -2.109125720789725, -2.101827517681182, -2.0945825656083037, -2.0873900985040303, -2.0802493667525352, -2.0731596367215186, -2.066120190311001, -2.0591303245179327, -2.052189351015944, -2.045296595749628, -2.038451398542736, -2.0316531127197357, -2.0249011047401764, -2.0181947538453495, -2.0115334517167534, -2.004916602145885, -1.9983436207149219, -1.991813934487854, -1.9853269817116697, -1.9788822115271916, -1.972479083689208, -1.966117068295529, -1.959795645524632, -1.9535143053815782, -1.9472725474518795, -1.941069880663028, -1.9349058230533944, -1.9287799015482348, -1.9226916517425334, -1.9166406176904416, -1.9106263517010684, -1.9046484141403999, -1.898706373239118, -1.8927998049061245, -1.8869282925475497, -1.8810914268910692, -1.875288805815335, -1.8695200341843439, -1.863784723686575, -1.858082492678732, -1.8524129660339286, -1.8467757749941753, -1.8411705570270112, -1.8355969556861527, -1.8300546204760137, -1.824543206719983, -1.8190623754323143, -1.8136117931935367, -1.8081911320292436, -1.8028000692921708, -1.7974382875474462, -1.7921054744609162, -1.7868013226904402, -1.7815255297800738, -1.7762777980570357, -1.771057834531376, -1.7658653507982658, -1.760700062942817, -1.7555616914473626, -1.7504499611011155, -1.745364600912138, -1.740305344021548, -1.7352719276198938, -1.7302640928656352, -1.7252815848056635, -1.7203241522978057, -1.7153915479352435, -1.710483527972802, -1.7055998522550457, -1.700740284146131, -1.6959045904613645, -1.6910925414004139, -1.6863039104821318, -1.6815384744809379, -1.6767960133647157, -1.6720763102341891, -1.6673791512637277, -1.6627043256435396, -1.658051625523224, -1.6534208459566333, -1.648811784848017, -1.644224242899403, -1.6396580235591938, -1.6351129329719325, -1.6305887799292165, -1.6260853758217182, -1.621602534592294, -1.61714007269014, -1.6126978090259776, -1.6082755649282325, -1.6038731641001844, -1.599490432578068, -1.595127198690084, -1.5907832930163148, -1.5864585483495088, -1.5821527996567155, -1.5778658840417483, -1.5735976407084538, -1.5693479109247666, -1.5651165379875311, -1.5609033671880705, -1.5567082457784778, -1.5525310229386218, -1.5483715497438428, -1.544229679133319, -1.5401052658790941, -1.5359981665557434, -1.5319082395106645, -1.5278353448349806, -1.5237793443350331, -1.5197401015044605, -1.5157174814968366, -1.5117113510988671, -1.5077215787041225, -1.5037480342872944, -1.4997905893789705, -1.4958491170409063, -1.4919234918417885, -1.4880135898334754, -1.484119288527703, -1.4802404668732467, -1.4763770052335308, -1.4725287853646674, -1.4686956903939234, -1.4648776047986019, -1.4610744143853258, -1.4572860062697213, -1.4535122688564839, -1.4497530918198267, -1.4460083660842944, -1.442277983805939, -1.4385618383538517, -1.4348598242920338, -1.4311718373616111, -1.4274977744633748, -1.4238375336406432, -1.4201910140624445, -1.4165581160070007, -1.4129387408455198, -1.4093327910262785, -1.4057401700589955, -1.402160782499488, -1.3985945339346009, -1.395041330967412, -1.3915010812026944, -1.3879736932326472, -1.38445907662287, -1.3809571418985898, -1.3774678005311343, -1.3739909649246338, -1.3705265484029663, -1.3670744651969204, -1.3636346304315883, -1.3602069601139748, -1.3567913711208197, -1.3533877811866295, -1.349996108891915, -1.346616273651631, -1.3432481957038092, -1.3398917960983878, -1.3365469966862278, -1.333213720108316, -1.329891889785146, -1.3265814299062815, -1.3232822654200906, -1.3199943220236523, -1.3167175261528279, -1.3134518049725012, -1.310197086366973, -1.306953298930519, -1.303720371958099, -1.3004982354362173, -1.2972868200339356, -1.294086057094024, -1.2908958786242624, -1.287716217288879, -1.2845470064001239, -1.2813881799099816, -1.2782396724020113, -1.275101419083322, -1.2719733557766681, -1.2688554189126764, -1.2657475455221912, -1.26264967322874, -1.2595617402411203, -1.2564836853460961, -1.2534154479012145, -1.250356967827727, -1.2473081856036268, -1.2442690422567886, -1.2412394793582142, -1.2382194390153842, -1.235208863865708, -1.2322076970700764, -1.2292158823065071, -1.2262333637638945, -1.2232600861358436, -1.2202959946146057, -1.217341034885099, -1.2143951531190205, -1.2114582959690472, -1.2085304105631198, -1.205611444498814, -1.2027013458377949, -1.1998000631003505, -1.1969075452600073, -1.1940237417382258, -1.1911486023991702, -1.1882820775445577, -1.185424117908578, -1.182574674652894, -1.1797336993617036, -1.1769011440368837, -1.1740769610931956, -1.1712611033535636, -1.1684535240444192, -1.1656541767911106, -1.1628630156133801, -1.1600799949209022, -1.157305069508887, -1.1545381945537438, -1.1517793256088067, -1.1490284186001203, -1.1462854298222802, -1.143550315934338, -1.1408230339557577, -1.1381035412624292, -1.1353917955827388, -1.1326877549936911, -1.1299913779170858, -1.1273026231157461, -1.1246214496897973, -1.1219478170730004, -1.119281685029129, -1.1166230136483999, -1.113971763343951, -1.1113278948483656, -1.1086913692102427, -1.1060621477908166, -1.1034401922606174, -1.1008254645961775, -1.098217927076784, -1.0956175422812706, -1.093024273084855, -1.0904380826560147, -1.0878589344534062, -1.0852867922228244, -1.0827216199942007, -1.0801633820786418, -1.0776120430655045, -1.07506756781951, -1.0725299214778967, -1.069999069447607, -1.067474977402513, -1.064957611280674, -1.0624469372816363, -1.059942921863757, -1.0574455317415712, -1.054954733883189, -1.0524704955077242, -1.0499927840827572, -1.0475215673218297, -1.0450568131819715, -1.042598489861256, -1.0401465657963878, -1.0377010096603236, -1.0352617903599142, -1.0328288770335852, -1.030402239049041, -1.0279818460009988, -1.0255676677089491, -1.0231596742149462, -1.020757835781423, -1.018362122889037, -1.0159725062345346, -1.0135889567286516, -1.0112114454940297, -1.0088399438631657, -1.0064744233763794, -1.0041148557798123, -1.0017612130234435, -0.9994134672591347, -0.9970715908386975, -0.9947355563119806, -0.9924053364249847, -0.9900809041179959, -0.9877622325237428, -0.9854492949655762, -0.9831420649556685, -0.9808405161932349, -0.9785446225627765, -0.9762543581323431, -0.9739696971518164, -0.9716906140512122, -0.9694170834390052, -0.9671490801004707, -0.9648865789960456, -0.9626295552597097, -0.9603779841973851, -0.9581318412853541, -0.9558911021686931, -0.9536557426597299, -0.951425738736511, -0.9492010665412941, -0.9469817023790519, -0.9447676227159953, -0.9425588041781146, -0.9403552235497329, -0.9381568577720822, -0.9359636839418883, -0.9337756793099781, -0.9315928212798971, -0.9294150874065463, -0.9272424553948332, -0.9250749030983352, -0.922912408517983, -0.9207549498007521, -0.9186025052383757, -0.9164550532660662, -0.914312572461253, -0.912175041542335, -0.9100424393674447, -0.9079147449332277, -0.9057919373736344, -0.9036739959587249, -0.9015609000934877, -0.8994526293166694, -0.89734916329962, -0.8952504818451471, -0.8931565648863855, -0.8910673924856772, -0.8889829448334637, -0.8869032022471907, -0.8848281451702232, -0.8827577541707744, -0.8806920099408436, -0.8786308932951665, -0.8765743851701772, -0.8745224666229783, -0.8724751188303276, -0.870432323087628, -0.8683940608079344, -0.8663603135209679, -0.8643310628721392, -0.8623062906215865, -0.860285978643218, -0.8582701089237694, -0.8562586635618672, -0.8542516247671033, -0.8522489748591205, -0.8502506962667048, -0.848256771526888, -0.8462671832840616, -0.8442819142890957, -0.8423009473984705, -0.8403242655734149, -0.8383518518790545, -0.836383689483567, -0.8344197616573489, -0.8324600517721876, -0.8305045433004427, -0.828553219814237, -0.8266060649846545, -0.8246630625809456]}

},{}],116:[function(require,module,exports){
module.exports={"x": [1000000000.0, 3002004008.016032, 5004008016.032064, 7006012024.048096, 9008016032.064129, 11010020040.08016, 13012024048.096191, 15014028056.112225, 17016032064.128256, 19018036072.144287, 21020040080.16032, 23022044088.176353, 25024048096.192383, 27026052104.208416, 29028056112.22445, 31030060120.24048, 33032064128.25651, 35034068136.272545, 37036072144.288574, 39038076152.30461, 41040080160.32064, 43042084168.33667, 45044088176.35271, 47046092184.36874, 49048096192.384766, 51050100200.4008, 53052104208.41683, 55054108216.43286, 57056112224.4489, 59058116232.46493, 61060120240.48096, 63062124248.496994, 65064128256.51302, 67066132264.52905, 69068136272.54509, 71070140280.56113, 73072144288.57715, 75074148296.59319, 77076152304.60922, 79078156312.62524, 81080160320.64128, 83082164328.65732, 85084168336.67334, 87086172344.68938, 89088176352.70541, 91090180360.72144, 93092184368.73747, 95094188376.75351, 97096192384.76953, 99098196392.78557, 101100200400.8016, 103102204408.81763, 105104208416.83366, 107106212424.8497, 109108216432.86572, 111110220440.88176, 113112224448.8978, 115114228456.91382, 117116232464.92986, 119118236472.94589, 121120240480.96191, 123122244488.97795, 125124248496.99399, 127126252505.01001, 129128256513.02605, 131130260521.04208, 133132264529.0581, 135134268537.07414, 137136272545.09018, 139138276553.1062, 141140280561.12225, 143142284569.13828, 145144288577.1543, 147146292585.17035, 149148296593.18637, 151150300601.2024, 153152304609.21844, 155154308617.23447, 157156312625.2505, 159158316633.26654, 161160320641.28256, 163162324649.29858, 165164328657.31464, 167166332665.33066, 169168336673.34668, 171170340681.36273, 173172344689.37875, 175174348697.39478, 177176352705.41083, 179178356713.42685, 181180360721.44287, 183182364729.45892, 185184368737.47495, 187186372745.49097, 189188376753.50702, 191190380761.52304, 193192384769.53906, 195194388777.5551, 197196392785.57114, 199198396793.58716, 201200400801.6032, 203202404809.61923, 205204408817.63525, 207206412825.6513, 209208416833.66733, 211210420841.68335, 213212424849.6994, 215214428857.71542, 217216432865.73145, 219218436873.7475, 221220440881.76352, 223222444889.77954, 225224448897.7956, 227226452905.8116, 229228456913.82764, 231230460921.8437, 233232464929.8597, 235234468937.87573, 237236472945.89178, 239238476953.9078, 241240480961.92383, 243242484969.93988, 245244488977.9559, 247246492985.97192, 249248496993.98798, 251250501002.004, 253252505010.02002, 255254509018.03607, 257256513026.0521, 259258517034.0681, 261260521042.08417, 263262525050.1002, 265264529058.1162, 267266533066.13226, 269268537074.1483, 271270541082.1643, 273272545090.18036, 275274549098.1964, 277276553106.2124, 279278557114.22845, 281280561122.2445, 283282565130.2605, 285284569138.27655, 287286573146.2926, 289288577154.3086, 291290581162.32465, 293292585170.3407, 295294589178.3567, 297296593186.37274, 299298597194.3888, 301300601202.4048, 303302605210.42084, 305304609218.4369, 307306613226.4529, 309308617234.46893, 311310621242.485, 313312625250.501, 315314629258.517, 317316633266.5331, 319318637274.5491, 321320641282.5651, 323322645290.5812, 325324649298.59717, 327326653306.6132, 329328657314.6293, 331330661322.64526, 333332665330.6613, 335334669338.67737, 337336673346.69336, 339338677354.7094, 341340681362.72546, 343342685370.74146, 345344689378.7575, 347346693386.77356, 349348697394.78955, 351350701402.8056, 353352705410.82166, 355354709418.83765, 357356713426.8537, 359358717434.86975, 361360721442.88574, 363362725450.9018, 365364729458.91785, 367366733466.93384, 369368737474.9499, 371370741482.96594, 373372745490.98193, 375374749498.998, 377376753507.01404, 379378757515.03, 381380761523.0461, 383382765531.06213, 385384769539.0781, 387386773547.0942, 389388777555.1102, 391390781563.1262, 393392785571.1423, 395394789579.1583, 397396793587.1743, 399398797595.19037, 401400801603.2064, 403402805611.2224, 405404809619.23846, 407406813627.2545, 409408817635.2705, 411410821643.28656, 413412825651.3026, 415414829659.3186, 417416833667.33466, 419418837675.3507, 421420841683.3667, 423422845691.38275, 425424849699.3988, 427426853707.4148, 429428857715.43085, 431430861723.4469, 433432865731.4629, 435434869739.47894, 437436873747.495, 439438877755.511, 441440881763.52704, 443442885771.5431, 445444889779.5591, 447446893787.57513, 449448897795.5912, 451450901803.6072, 453452905811.6232, 455454909819.6393, 457456913827.6553, 459458917835.6713, 461460921843.6874, 463462925851.70337, 465464929859.7194, 467466933867.7355, 469468937875.75146, 471470941883.7675, 473472945891.78357, 475474949899.79956, 477476953907.8156, 479478957915.83167, 481480961923.84766, 483482965931.8637, 485484969939.87976, 487486973947.89575, 489488977955.9118, 491490981963.92786, 493492985971.94385, 495494989979.9599, 497496993987.97595, 499498997995.99194, 501501002004.008, 503503006012.02405, 505505010020.04004, 507507014028.0561, 509509018036.07214, 511511022044.08813, 513513026052.1042, 515515030060.12024, 517517034068.1362, 519519038076.1523, 521521042084.16833, 523523046092.1843, 525525050100.2004, 527527054108.21643, 529529058116.2324, 531531062124.2485, 533533066132.2645, 535535070140.2805, 537537074148.2966, 539539078156.3126, 541541082164.3286, 543543086172.34467, 545545090180.3607, 547547094188.3767, 549549098196.39276, 551551102204.4088, 553553106212.4248, 555555110220.4409, 557557114228.4569, 559559118236.4729, 561561122244.489, 563563126252.505, 565565130260.521, 567567134268.5371, 569569138276.5531, 571571142284.5691, 573573146292.5852, 575575150300.6012, 577577154308.6172, 579579158316.6333, 581581162324.6493, 583583166332.6653, 585585170340.6814, 587587174348.6974, 589589178356.7134, 591591182364.7295, 593593186372.7455, 595595190380.7615, 597597194388.7776, 599599198396.7936, 601601202404.8096, 603603206412.8257, 605605210420.8417, 607607214428.8577, 609609218436.8738, 611611222444.8898, 613613226452.9058, 615615230460.9219, 617617234468.9379, 619619238476.9539, 621621242484.97, 623623246492.986, 625625250501.002, 627627254509.0181, 629629258517.034, 631631262525.05, 633633266533.0662, 635635270541.0822, 637637274549.0981, 639639278557.1143, 641641282565.1302, 643643286573.1462, 645645290581.1624, 647647294589.1783, 649649298597.1943, 651651302605.2104, 653653306613.2264, 655655310621.2424, 657657314629.2585, 659659318637.2745, 661661322645.2905, 663663326653.3066, 665665330661.3226, 667667334669.3386, 669669338677.3547, 671671342685.3707, 673673346693.3867, 675675350701.4028, 677677354709.4188, 679679358717.4348, 681681362725.4509, 683683366733.4669, 685685370741.4829, 687687374749.499, 689689378757.515, 691691382765.531, 693693386773.5471, 695695390781.5631, 697697394789.5791, 699699398797.5952, 701701402805.6112, 703703406813.6272, 705705410821.6433, 707707414829.6593, 709709418837.6753, 711711422845.6914, 713713426853.7074, 715715430861.7234, 717717434869.7395, 719719438877.7555, 721721442885.7715, 723723446893.7876, 725725450901.8036, 727727454909.8196, 729729458917.8357, 731731462925.8517, 733733466933.8677, 735735470941.8838, 737737474949.8998, 739739478957.9158, 741741482965.9319, 743743486973.9479, 745745490981.9639, 747747494989.98, 749749498997.996, 751751503006.012, 753753507014.0281, 755755511022.0441, 757757515030.06, 759759519038.0762, 761761523046.0922, 763763527054.1082, 765765531062.1243, 767767535070.1403, 769769539078.1562, 771771543086.1724, 773773547094.1884, 775775551102.2043, 777777555110.2205, 779779559118.2365, 781781563126.2524, 783783567134.2686, 785785571142.2845, 787787575150.3005, 789789579158.3167, 791791583166.3326, 793793587174.3486, 795795591182.3647, 797797595190.3807, 799799599198.3967, 801801603206.4128, 803803607214.4288, 805805611222.4448, 807807615230.4609, 809809619238.4769, 811811623246.4929, 813813627254.509, 815815631262.525, 817817635270.541, 819819639278.5571, 821821643286.5731, 823823647294.5891, 825825651302.6052, 827827655310.6212, 829829659318.6372, 831831663326.6533, 833833667334.6693, 835835671342.6853, 837837675350.7014, 839839679358.7174, 841841683366.7334, 843843687374.7495, 845845691382.7655, 847847695390.7815, 849849699398.7976, 851851703406.8136, 853853707414.8296, 855855711422.8457, 857857715430.8617, 859859719438.8777, 861861723446.8938, 863863727454.9098, 865865731462.9258, 867867735470.9419, 869869739478.9579, 871871743486.9739, 873873747494.99, 875875751503.006, 877877755511.022, 879879759519.0381, 881881763527.0541, 883883767535.0701, 885885771543.0862, 887887775551.1022, 889889779559.1182, 891891783567.1343, 893893787575.1503, 895895791583.1663, 897897795591.1824, 899899799599.1984, 901901803607.2144, 903903807615.2305, 905905811623.2465, 907907815631.2625, 909909819639.2786, 911911823647.2946, 913913827655.3105, 915915831663.3267, 917917835671.3427, 919919839679.3586, 921921843687.3748, 923923847695.3907, 925925851703.4067, 927927855711.4229, 929929859719.4388, 931931863727.4548, 933933867735.471, 935935871743.4869, 937937875751.5029, 939939879759.519, 941941883767.535, 943943887775.551, 945945891783.5671, 947947895791.5831, 949949899799.5991, 951951903807.6152, 953953907815.6312, 955955911823.6472, 957957915831.6633, 959959919839.6793, 961961923847.6953, 963963927855.7114, 965965931863.7274, 967967935871.7434, 969969939879.7595, 971971943887.7755, 973973947895.7915, 975975951903.8076, 977977955911.8236, 979979959919.8396, 981981963927.8557, 983983967935.8717, 985985971943.8877, 987987975951.9038, 989989979959.9198, 991991983967.9358, 993993987975.9519, 995995991983.9679, 997997995991.9839, 1000000000000.0], "si": [1.5707963259570095, 1.5707963264832407, 1.5707963265971348, 1.5707963266525338, 1.5707963266884795, 1.5707963267154192, 1.5707963267372098, 1.570796326755524, 1.5707963267711513, 1.5707963267844807, 1.570796326795711, 1.5707963268049536, 1.570796326812285, 1.5707963268177785, 1.5707963268215193, 1.570796326823614, 1.5707963268241951, 1.5707963268234197, 1.570796326821468, 1.570796326818539, 1.5707963268148455, 1.5707963268106073, 1.5707963268060448, 1.5707963268013718, 1.5707963267967904, 1.5707963267924836, 1.57079632678861, 1.570796326785301, 1.5707963267826568, 1.570796326780744, 1.570796326779596, 1.5707963267792129, 1.570796326779563, 1.5707963267805871, 1.570796326782201, 1.5707963267842997, 1.5707963267867653, 1.5707963267894687, 1.5707963267922784, 1.5707963267950655, 1.570796326797707, 1.5707963268000928, 1.5707963268021299, 1.570796326803743, 1.5707963268048797, 1.5707963268055107, 1.5707963268056293, 1.5707963268052523, 1.570796326804417, 1.57079632680318, 1.5707963268016127, 1.5707963267997986, 1.570796326797829, 1.570796326795799, 1.5707963267938019, 1.570796326791927, 1.5707963267902545, 1.5707963267888534, 1.5707963267877776, 1.5707963267870648, 1.5707963267867353, 1.5707963267867915, 1.5707963267872183, 1.5707963267879848, 1.570796326789045, 1.5707963267903422, 1.57079632679181, 1.570796326793376, 1.5707963267949663, 1.570796326796508, 1.5707963267979312, 1.5707963267991751, 1.5707963268001879, 1.570796326800929, 1.5707963268013725, 1.5707963268015057, 1.5707963268013307, 1.5707963268008638, 1.5707963268001335, 1.5707963267991802, 1.570796326798053, 1.5707963267968077, 1.5707963267955045, 1.5707963267942044, 1.570796326792967, 1.5707963267918479, 1.570796326790895, 1.570796326790149, 1.570796326789639, 1.570796326789383, 1.5707963267893874, 1.5707963267896463, 1.570796326790142, 1.570796326790847, 1.5707963267917238, 1.5707963267927292, 1.5707963267938139, 1.5707963267949263, 1.5707963267960148, 1.5707963267970297, 1.5707963267979257, 1.570796326798664, 1.5707963267992138, 1.5707963267995533, 1.5707963267996707, 1.570796326799565, 1.5707963267992455, 1.5707963267987306, 1.5707963267980478, 1.5707963267972318, 1.5707963267963223, 1.570796326795363, 1.5707963267943996, 1.570796326793476, 1.570796326792634, 1.5707963267919116, 1.5707963267913398, 1.5707963267909424, 1.5707963267907348, 1.5707963267907235, 1.5707963267909055, 1.5707963267912695, 1.5707963267917955, 1.5707963267924567, 1.5707963267932203, 1.5707963267940495, 1.5707963267949046, 1.5707963267957459, 1.570796326796535, 1.5707963267972358, 1.5707963267978176, 1.570796326798255, 1.5707963267985303, 1.570796326798633, 1.5707963267985607, 1.5707963267983198, 1.570796326797924, 1.5707963267973932, 1.5707963267967544, 1.5707963267960388, 1.5707963267952803, 1.5707963267945146, 1.5707963267937775, 1.5707963267931027, 1.57079632679252, 1.570796326792056, 1.57079632679173, 1.570796326791555, 1.5707963267915377, 1.5707963267916762, 1.5707963267919625, 1.570796326792381, 1.5707963267929108, 1.5707963267935259, 1.5707963267941965, 1.5707963267948908, 1.570796326795577, 1.5707963267962224, 1.5707963267967984, 1.5707963267972789, 1.5707963267976426, 1.5707963267978746, 1.5707963267979654, 1.5707963267979128, 1.5707963267977207, 1.5707963267973997, 1.5707963267969665, 1.5707963267964424, 1.5707963267958527, 1.5707963267952256, 1.5707963267945906, 1.570796326793977, 1.5707963267934135, 1.5707963267929252, 1.570796326792534, 1.5707963267922571, 1.570796326792106, 1.570796326792086, 1.5707963267921967, 1.5707963267924316, 1.5707963267927785, 1.57079632679322, 1.5707963267937342, 1.570796326794297, 1.5707963267948817, 1.5707963267954606, 1.5707963267960072, 1.5707963267964962, 1.5707963267969058, 1.5707963267972178, 1.5707963267974185, 1.5707963267975, 1.5707963267974598, 1.5707963267973009, 1.570796326797032, 1.5707963267966665, 1.5707963267962224, 1.5707963267957215, 1.570796326795187, 1.5707963267946445, 1.5707963267941192, 1.570796326793635, 1.5707963267932143, 1.570796326792876, 1.5707963267926348, 1.5707963267925011, 1.5707963267924803, 1.5707963267925718, 1.5707963267927703, 1.5707963267930658, 1.5707963267934437, 1.5707963267938856, 1.5707963267943703, 1.5707963267948748, 1.5707963267953757, 1.5707963267958496, 1.570796326796275, 1.5707963267966323, 1.5707963267969056, 1.570796326797083, 1.5707963267971572, 1.5707963267971257, 1.5707963267969907, 1.5707963267967595, 1.570796326796444, 1.570796326796059, 1.5707963267956235, 1.5707963267951581, 1.5707963267946845, 1.570796326794225, 1.5707963267938008, 1.570796326793431, 1.5707963267931326, 1.5707963267929188, 1.570796326792799, 1.5707963267927774, 1.5707963267928546, 1.5707963267930263, 1.5707963267932834, 1.5707963267936134, 1.5707963267940004, 1.5707963267944258, 1.5707963267948697, 1.5707963267953111, 1.5707963267957297, 1.570796326796106, 1.5707963267964231, 1.5707963267966665, 1.5707963267968257, 1.5707963267968938, 1.5707963267968688, 1.570796326796752, 1.5707963267965497, 1.5707963267962721, 1.5707963267959328, 1.570796326795548, 1.570796326795136, 1.5707963267947158, 1.5707963267943073, 1.5707963267939296, 1.5707963267935996, 1.5707963267933325, 1.5707963267931402, 1.570796326793031, 1.5707963267930094, 1.570796326793076, 1.5707963267932266, 1.570796326793454, 1.5707963267937466, 1.5707963267940905, 1.5707963267944696, 1.5707963267948657, 1.5707963267952603, 1.570796326795635, 1.5707963267959726, 1.570796326796258, 1.5707963267964775, 1.570796326796622, 1.5707963267966853, 1.570796326796665, 1.5707963267965626, 1.5707963267963831, 1.5707963267961358, 1.5707963267958327, 1.5707963267954879, 1.5707963267951182, 1.5707963267947407, 1.570796326794373, 1.5707963267940324, 1.5707963267937344, 1.5707963267934923, 1.5707963267933174, 1.570796326793217, 1.5707963267931957, 1.5707963267932536, 1.5707963267933875, 1.570796326793591, 1.5707963267938536, 1.5707963267941631, 1.5707963267945046, 1.5707963267948624, 1.570796326795219, 1.5707963267955585, 1.570796326795865, 1.570796326796124, 1.5707963267963245, 1.570796326796457, 1.5707963267965164, 1.5707963267964997, 1.5707963267964085, 1.5707963267962475, 1.5707963267960248, 1.5707963267957508, 1.570796326795439, 1.5707963267951037, 1.5707963267947609, 1.5707963267944267, 1.5707963267941165, 1.5707963267938445, 1.5707963267936231, 1.5707963267934626, 1.5707963267933696, 1.5707963267933485, 1.5707963267933995, 1.5707963267935199, 1.5707963267937035, 1.5707963267939418, 1.570796326794223, 1.5707963267945337, 1.5707963267948597, 1.5707963267951852, 1.5707963267954952, 1.5707963267957759, 1.5707963267960137, 1.570796326796198, 1.5707963267963205, 1.5707963267963763, 1.5707963267963627, 1.5707963267962808, 1.5707963267961351, 1.5707963267959326, 1.5707963267956828, 1.570796326795398, 1.5707963267950917, 1.5707963267947778, 1.5707963267944713, 1.5707963267941865, 1.5707963267939362, 1.5707963267937322, 1.5707963267935836, 1.570796326793497, 1.570796326793476, 1.5707963267935212, 1.5707963267936305, 1.5707963267937979, 1.5707963267940155, 1.570796326794273, 1.5707963267945582, 1.5707963267948573, 1.5707963267951568, 1.5707963267954423, 1.570796326795701, 1.5707963267959208, 1.5707963267960916, 1.5707963267962057, 1.5707963267962584, 1.5707963267962473, 1.5707963267961735, 1.5707963267960403, 1.570796326795855, 1.5707963267956258, 1.5707963267953637, 1.5707963267950813, 1.5707963267947922, 1.570796326794509, 1.5707963267942455, 1.570796326794014, 1.5707963267938245, 1.5707963267936862, 1.570796326793605, 1.570796326793584, 1.5707963267936247, 1.5707963267937242, 1.5707963267938778, 1.570796326794078, 1.5707963267943155, 1.5707963267945788, 1.5707963267948555, 1.5707963267951326, 1.5707963267953973, 1.5707963267956373, 1.5707963267958416, 1.570796326796001, 1.570796326796108, 1.570796326796158, 1.570796326796149, 1.5707963267960816, 1.5707963267959595, 1.5707963267957885, 1.5707963267955767, 1.5707963267953344, 1.5707963267950726, 1.5707963267948042, 1.5707963267945415, 1.5707963267942964, 1.5707963267940805, 1.5707963267939038, 1.5707963267937741, 1.5707963267936975, 1.570796326793677, 1.5707963267937135, 1.5707963267938048, 1.5707963267939467, 1.570796326794132, 1.570796326794352, 1.5707963267945966, 1.5707963267948537, 1.5707963267951117, 1.5707963267953584, 1.5707963267955825, 1.5707963267957734, 1.5707963267959226, 1.5707963267960234, 1.5707963267960712, 1.5707963267960638, 1.5707963267960023, 1.5707963267958895, 1.570796326795731, 1.5707963267955343, 1.570796326795309, 1.5707963267950653, 1.5707963267948148, 1.5707963267945693, 1.5707963267943403, 1.5707963267941383, 1.5707963267939724, 1.5707963267938505, 1.570796326793778, 1.5707963267937577, 1.5707963267937906, 1.570796326793875, 1.5707963267940064, 1.570796326794179, 1.5707963267943839, 1.5707963267946121, 1.5707963267948524, 1.5707963267950935, 1.5707963267953247, 1.5707963267955347, 1.5707963267957141, 1.5707963267958547, 1.5707963267959497, 1.5707963267959955, 1.57079632679599, 1.5707963267959333, 1.5707963267958285, 1.5707963267956808, 1.5707963267954974, 1.5707963267952867, 1.5707963267950587, 1.5707963267948242, 1.570796326794594, 1.5707963267943787, 1.570796326794189, 1.5707963267940326, 1.5707963267939173, 1.5707963267938483, 1.570796326793828, 1.570796326793858, 1.5707963267939362, 1.5707963267940588, 1.57079632679422, 1.5707963267944118, 1.5707963267946257, 1.570796326794851, 1.5707963267950777, 1.570796326795295, 1.5707963267954927, 1.5707963267956617, 1.5707963267957947, 1.570796326795885, 1.5707963267959288, 1.5707963267959246, 1.5707963267958722, 1.5707963267957747, 1.5707963267956366, 1.5707963267954648, 1.570796326795267, 1.5707963267950529, 1.5707963267948322, 1.5707963267946154, 1.5707963267944127, 1.5707963267942333, 1.5707963267940857, 1.5707963267939764, 1.5707963267939102, 1.5707963267938905, 1.5707963267939178, 1.5707963267939904, 1.5707963267941052], "ci": [5.458434486108123e-10, 1.1761572560471417e-10, 2.874342390513626e-11, -1.0296380721836884e-11, -3.1609026190621596e-11, -4.396327347160451e-11, -5.077859753194619e-11, -5.372100276236306e-11, -5.3757360935266395e-11, -5.153971124930439e-11, -4.756667481503086e-11, -4.225633086943719e-11, -3.5980019010411405e-11, -2.9077717995614423e-11, -2.1863148648917562e-11, -1.462422614122432e-11, -7.621271627190954e-12, -1.0830850301692521e-12, 4.796201289649377e-12, 9.859773321702283e-12, 1.3991480866000523e-11, 1.711576912832691e-11, 1.9198403572011712e-11, 2.0245410005162943e-11, 2.0299995388924902e-11, 1.9439405581478782e-11, 1.7770141475696097e-11, 1.542252214372137e-11, 1.2544723130040509e-11, 9.295935121590166e-12, 5.840262469576844e-12, 2.340015823268647e-12, -1.0508628424608964e-12, -4.191683440100281e-12, -6.960233687213135e-12, -9.256914819049095e-12, -1.1007411313430296e-11, -1.2164046766784866e-11, -1.270728069477217e-11, -1.2644589640241246e-11, -1.2009024426647567e-11, -1.0856772005529251e-11, -9.263543269200029e-12, -7.320973056397027e-12, -5.131497971472623e-12, -2.8037244261684235e-12, -4.480966394464054e-13, 1.828831696713823e-12, 3.928363432995206e-12, 5.763161543204404e-12, 7.261478884124846e-12, 8.369151155506107e-12, 9.05112587451591e-12, 9.292811806245684e-12, 9.099592773283375e-12, 8.496021830192639e-12, 7.524067717747079e-12, 6.240559600539096e-12, 4.71454349127827e-12, 3.0233498015873664e-12, 1.249080117864206e-12, -5.247582168458644e-13, -2.2177187358804656e-12, -3.755524431387061e-12, -5.072865413094338e-12, -6.116691842939464e-12, -6.8478128690109605e-12, -7.2421427074895655e-12, -7.291682580159645e-12, -7.0041443397088244e-12, -6.402351004079447e-12, -5.522488659832089e-12, -4.412515371206726e-12, -3.1296367432633782e-12, -1.7368258733465851e-12, -3.0086278273399855e-13, 1.111231007901411e-12, 2.4358469424488946e-12, 3.6143917769846362e-12, 4.596461504212237e-12, 5.3422659366746394e-12, 5.823306685641581e-12, 6.023972672621785e-12, 5.941894819783383e-12, 5.587513678614543e-12, 4.9835894806706756e-12, 4.16349197721752e-12, 3.1698963201933003e-12, 2.0525307872062273e-12, 8.651956228960244e-13, -3.358644377284544e-13, -1.4949955462651893e-12, -2.560156275849128e-12, -3.4842334081119183e-12, -4.227639113047913e-12, -4.7602027350692145e-12, -5.061696104819254e-12, -5.1230120976425954e-12, -4.9462622349521796e-12, -4.544360063780908e-12, -3.9404052537619175e-12, -3.1660545176023057e-12, -2.260377728697372e-12, -1.2677878657984449e-12, -2.3541739665212307e-13, 7.882734812181724e-13, 1.7561348263632804e-12, 2.624867742070146e-12, 3.3561163294228264e-12, 3.918613596828754e-12, 4.289652476818175e-12, 4.455474412874664e-12, 4.412109815536039e-12, 4.1652609039969824e-12, 3.729874455368275e-12, 3.129413948941228e-12, 2.39428187250349e-12, 1.5607838429817767e-12, 6.691954173986838e-13, -2.3858442345826717e-13, -1.1202461405527702e-12, -1.9353910408898723e-12, -2.6476880885409233e-12, -3.225784678620579e-12, -3.645085604264855e-12, -3.888881867740915e-12, -3.948620015123482e-12, -3.824463809072503e-12, -3.5249991833413615e-12, -3.0667873984024164e-12, -2.473543204508598e-12, -1.774597309585737e-12, -1.0039403432522496e-12, -1.9840268551390692e-13, 6.044638861922237e-13, 1.3674554189751649e-12, 2.0557728102508796e-12, 2.638783590931737e-12, 3.091162381446572e-12, 3.3936003490879455e-12, 3.5343992785593965e-12, 3.5093149341628894e-12, 3.3218445895113944e-12, 2.982956880250732e-12, 2.5102915553278843e-12, 1.9278207382516343e-12, 1.2638980411356534e-12, 5.501570856552362e-13, -1.792966816543498e-13, -8.906757103007836e-13, -1.5514671334921878e-12, -2.1313748112121537e-12, -2.604806731920265e-12, -2.9513166242752146e-12, -3.1563036982190445e-12, -3.212220760052423e-12, -3.118347813042982e-12, -2.8809820914416086e-12, -2.5129349090622457e-12, -2.0327533591943703e-12, -1.4643434808892323e-12, -8.350196866049007e-13, -1.745034354922244e-13, 4.858520126861505e-13, 1.1156302045374212e-12, 1.68617177056272e-12, 2.171427983196259e-12, 2.550102157968151e-12, 2.805971546099774e-12, 2.9284787765872616e-12, 2.91360779544724e-12, 2.7635986143192768e-12, 2.4870509923986478e-12, 2.09822955546197e-12, 1.6163065073534525e-12, 1.0649522098914826e-12, 4.704001427650631e-13, -1.394655207715511e-13, -7.3585375744681e-13, -1.291428247051016e-12, -1.7810078298027973e-12, -2.1823391277708875e-12, -2.4779278960384896e-12, -2.6552570753656555e-12, -2.7072805229652145e-12, -2.6330100549699705e-12, -2.4371810174342896e-12, -2.1302794386605023e-12, -1.7276899724332087e-12, -1.248960299861251e-12, -7.173648672407731e-13, -1.579994472971617e-13, 4.0305016554725187e-13, 9.394206613408775e-13, 1.4266357306950238e-12, 1.8426995454780334e-12, 2.1687939630653036e-12, 2.3908286549174896e-12, 2.499568346107053e-12, 2.491037591529173e-12, 2.366854879537707e-12, 2.133857667452086e-12, 1.8040617692207642e-12, 1.3936817170405319e-12, 9.224184023641055e-13, 4.1300166585186565e-13, -1.106726638394709e-13, -6.242985433170357e-13, -1.103840123667221e-12, -1.5275067476403917e-12, -1.8762497214038113e-12, -2.134388321627006e-12, -2.2909026720676518e-12, -2.3394811761009006e-12, -2.2788438180016265e-12, -2.11285404362623e-12, -1.8501110493978136e-12, -1.5038493325673178e-12, -1.0908572942626104e-12, -6.307901108230212e-13, -1.4569668463234688e-13, 3.417891420595572e-13, 8.091330097897866e-13, 1.2345471581228302e-12, 1.5987819117354424e-12, 1.8855342511854415e-12, 2.082006013180651e-12, 2.1799601215525717e-12, 2.1756977541485798e-12, 2.070306749935004e-12, 1.8695781344912904e-12, 1.583572740832844e-12, 1.226468182690719e-12, 8.153985663879591e-13, 3.697947691451807e-13, -8.909899003617212e-14, -5.399692117459154e-13, -9.620494672767617e-13, -1.3357328319230948e-12, -1.6441850098869357e-12, -1.873671991508593e-12, -2.014053318234318e-12, -2.059619917067278e-12, -2.009009456963096e-12, -1.8653858051023634e-12, -1.6361841700243472e-12, -1.332658530323035e-12, -9.696827528321525e-13, -5.645318923506043e-13, -1.3625207830748328e-13, 2.9482831544557037e-13, 7.087685726606301e-13, 1.0865666256799717e-12, 1.410735378449382e-12, 1.6667422026759667e-12, 1.8432621130224885e-12, 1.932608659471152e-12, 1.9313699484609138e-12, 1.840269819247181e-12, 1.6642838376078328e-12, 1.4122347957854153e-12, 1.0963269030031162e-12, 7.319073262039149e-13, 3.3620756709270027e-13, -7.225492096741521e-14, -4.741662805871497e-13, -8.510036446955367e-13, -1.1855231372704788e-12, -1.4622987252146037e-12, -1.6689927023106158e-12, -1.7965402085826871e-12, -1.839520147886599e-12, -1.7966047932319797e-12, -1.6703737713451607e-12, -1.4673717545058503e-12, -1.1975742859245965e-12, -8.73914222356241e-13, -5.121149228712704e-13, -1.288818653598473e-13, 2.5760879296476383e-13, 6.291476628313231e-13, 9.689714906138852e-13, 1.2612788999462713e-12, 1.4926901960753853e-12, 1.653130803216939e-12, 1.7354829092508809e-12, 1.7364795462750603e-12, 1.656649111862227e-12, 1.5002409032138677e-12, 1.2752052311728348e-12, 9.922409619761588e-13, 6.650191706236631e-13, 3.0927600498136857e-13, -5.863477024734573e-14, -4.2131685230611045e-13, -7.617425108050677e-13, -1.0646021141417487e-12, -1.3158541290694425e-12, -1.5040617799812594e-12, -1.6211031852792937e-12, -1.6618789025747585e-12, -1.6250372178595531e-12, -1.512771706420214e-12, -1.330801425961167e-12, -1.088204682980177e-12, -7.964036726078805e-13, -4.694197700751132e-13, -1.229001137403062e-13, 2.2728566744779038e-13, 5.64623941833229e-13, 8.733298762321319e-13, 1.1395657030717507e-12, 1.3510269098696288e-12, 1.4981535744840234e-12, 1.5746763048938638e-12, 1.5773774658944502e-12, 1.5066558989861349e-12, 1.3661933654686656e-12, 1.162984027236212e-12, 9.070370509901819e-13, 6.103146227871699e-13, 2.870125469354099e-13, -4.7463363968497e-14, -3.7784599359983194e-13, -6.885936108381186e-13, -9.652136461746925e-13, -1.1953491032507988e-12, -1.3684023690871765e-12, -1.4766199303743493e-12, -1.5154833157899895e-12, -1.483521616557818e-12, -1.382724057333115e-12, -1.2180905152580534e-12, -9.97705128333429e-13, -7.323223778276252e-13, -4.342736151243997e-13, -1.177671338933177e-13, 2.0217061823970218e-13, 5.10979994529492e-13, 7.94167245049865e-13, 1.0385697497539965e-12, 1.2333108024422352e-12, 1.3694620181914896e-12, 1.4410010124344851e-12, 1.445056694952897e-12, 1.38177053771226e-12, 1.25456565447929e-12, 1.069596022036545e-12, 8.358592406260138e-13, 5.646802553485649e-13, 2.6860046994767196e-13, -3.830809513536917e-14, -3.4152276188330466e-13, -6.272833738357041e-13, -8.822074723042419e-13, -1.0944886183772519e-12, -1.254720594154035e-12, -1.3555989676851966e-12, -1.3927521784205784e-12, -1.3648507097398174e-12, -1.2735144102395285e-12, -1.1234469929436224e-12, -9.21798065748833e-13, -6.783102369257607e-13, -4.0471419319346113e-13, -1.1361346313852942e-13, 1.8119231517493913e-13, 4.657954802599287e-13, 7.273148423347053e-13, 9.535301217689107e-13, 1.1340061061558193e-12, 1.260788114104818e-12, 1.328142894438994e-12, 1.3332644017584673e-12, 1.2762565585719411e-12, 1.1600838026081754e-12, 9.905801669131323e-13, 7.7573773163521e-13, 5.258834278208841e-13, 2.529987615005795e-13, -3.038768932564152e-14, -3.1087248834194974e-13, -5.752614468578145e-13, -8.116196116011228e-13, -1.0089276889946955e-12, -1.1581258657328093e-12, -1.2526831567631754e-12, -1.288377460748112e-12, -1.2638781216915724e-12, -1.1806121659116967e-12, -1.042755129697595e-12, -8.571241149148415e-13, -6.324057854441645e-13, -3.793583803901561e-13, -1.100689438173613e-13, 1.63135318818886e-13, 4.273589591295516e-13, 6.702072259214464e-13, 8.80746777335101e-13, 1.0491863833008447e-12, 1.1678352917218809e-12, 1.2315498275641426e-12, 1.237552098263715e-12, 1.1858922157455865e-12, 1.0792080447424001e-12, 9.22753263717558e-13, 7.24183995473716e-13, 4.92738975733474e-13, 2.394624467337582e-13, -2.3588690613416444e-14, -2.8440448066018604e-13, -5.30697405575332e-13, -7.509458874654176e-13, -9.352619823855262e-13, -1.0750982451702664e-12, -1.164116549238141e-12, -1.1985160117044638e-12, -1.1768895390314485e-12, -1.1005693228869645e-12, -9.7329025462193e-13, -8.012520890914632e-13, -5.928094172640587e-13, -3.576161221033287e-13, -1.0686498850080149e-13, 1.4754326985713444e-13, 3.9402133316146655e-13, 6.209778665994116e-13, 8.178262225965537e-13, 9.7575637026231e-13, 1.0874694190861468e-12, 1.1479537979581246e-12, 1.1546992463169538e-12, 1.1075901110512986e-12, 1.0091384244876353e-12, 8.640612174244255e-13, 6.793735913205074e-13, 4.639919231045078e-13, 2.278541881454668e-13, -1.782770520708274e-14, -2.614255536813657e-13, -4.918695930328702e-13, -6.983413744143802e-13, -8.712392143999197e-13, -1.0028525779324298e-12, -1.0871253884723165e-12, -1.1203374394136377e-12, -1.1012098084577067e-12, -1.0308335611766661e-12, -9.127953653921149e-13, -7.526789661441625e-13, -5.581859274523973e-13, -3.3866203315178976e-13, -1.0420449413972099e-13, 1.3407680310443412e-13, 3.649326621043078e-13, 5.778953448590831e-13, 7.62984587941795e-13, 9.116222572891418e-13, 1.017208333226022e-12, 1.0749137836425643e-12, 1.0822660161322514e-12, 1.0391516375972226e-12, 9.477789878489572e-13, 8.127018376064853e-13, 6.402552688491297e-13, 4.387008235212805e-13, 2.1768608441196452e-13, -1.2650808246517813e-14, -2.414146141835417e-13, -4.578317047084633e-13, -6.521104155848283e-13, -8.151627299701393e-13, -9.394615032530131e-13, -1.0195180922531636e-12, -1.0517052345137367e-12, -1.034746249218718e-12, -9.696215726159675e-13, -8.595633365919903e-13, -7.0998323381814e-13, -5.278529731486768e-13, -3.2187056953171783e-13, -1.0186305307262668e-13, 1.2210190228896175e-13, 3.394475613440018e-13, 5.399623930376072e-13, 7.145944784533154e-13, 8.551910650122571e-13, 9.552926319967956e-13, 1.010513059261835e-12, 1.0183926397793412e-12, 9.787915983906892e-13, 8.937072826775002e-13, 7.672988167270301e-13, 6.05725693422866e-13, 4.164828451363242e-13, 2.08584826789353e-13, -8.078492251210672e-15, -2.2361403671504814e-13, -4.278584418719301e-13, -6.112387023776809e-13]}

},{}],117:[function(require,module,exports){
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
var HALF_PI = require( '@stdlib/constants/float64/half-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var Float64Array = require( '@stdlib/array/float64' );
var sici = require( './../lib/assign.js' );


// FIXTURES //

var smallPositive = require( './fixtures/python/small_positive.json' );
var mediumPositive = require( './fixtures/python/medium_positive.json' );
var largePositive = require( './fixtures/python/large_positive.json' );
var smallNegative = require( './fixtures/python/small_negative.json' );
var mediumNegative = require( './fixtures/python/medium_negative.json' );
var largeNegative = require( './fixtures/python/large_negative.json' );
var veryLarge = require( './fixtures/python/very_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof sici, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the sine and cosine integrals for small positive numbers', function test( t ) {
	var delta;
	var tol;
	var out;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	si = smallPositive.si;
	ci = smallPositive.ci;

	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		v = sici( x[ i ], out, 1, 0 );
		t.equal( v, out, 'returns output array' );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for medium positive numbers', function test( t ) {
	var delta;
	var tol;
	var out;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	si = mediumPositive.si;
	ci = mediumPositive.ci;

	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		v = sici( x[ i ], out, 1, 0 );
		t.equal( v, out, 'returns output array' );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 60.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 60.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for large positive numbers', function test( t ) {
	var delta;
	var tol;
	var out;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = largePositive.x;
	si = largePositive.si;
	ci = largePositive.ci;

	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		v = sici( x[ i ], out, 1, 0 );
		t.equal( v, out, 'returns output array' );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for small negative numbers', function test( t ) {
	var delta;
	var tol;
	var out;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	si = smallNegative.si;
	ci = smallNegative.ci;

	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		v = sici( x[ i ], out, 1, 0 );
		t.equal( v, out, 'returns output array' );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for medium negative numbers', function test( t ) {
	var delta;
	var tol;
	var out;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	si = mediumNegative.si;
	ci = mediumNegative.ci;

	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		v = sici( x[ i ], out, 1, 0 );
		t.equal( v, out, 'returns output array' );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 60.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 60.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for large negative numbers', function test( t ) {
	var delta;
	var tol;
	var out;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = largeNegative.x;
	si = largeNegative.si;
	ci = largeNegative.ci;

	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		v = sici( x[ i ], out, 1, 0 );
		t.equal( v, out, 'returns output array' );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for very large positive numbers', function test( t ) {
	var delta;
	var tol;
	var out;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = veryLarge.x;
	si = veryLarge.si;
	ci = veryLarge.ci;

	for ( i = 0; i < x.length; i++ ) {
		out = [ 0.0, 0.0 ];
		v = sici( x[ i ], out, 1, 0 );
		t.equal( v, out, 'returns output array' );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function returns `[0,-Infinity]` if provided `0`', function test( t ) {
	var val;
	var out;

	out = [ 0.0, 0.0 ];
	val = sici( 0.0, out, 1, 0 );
	t.equal( val, out, 'returns output array' );
	t.strictEqual( val[ 0 ], 0.0, 'first element equals NaN' );
	t.strictEqual( val[ 1 ], NINF, 'second element equals -Infinity' );
	t.end();
});

tape( 'the function returns `[-PI/2,NaN]` if provided `-Infinity`', function test( t ) {
	var val;
	var out;

	out = [ 0.0, 0.0 ];
	val = sici( NINF, out, 1, 0 );
	t.equal( val, out, 'returns output array' );
	t.strictEqual( val[ 0 ], -HALF_PI, 'first element equals -PI/2' );
	t.strictEqual( isnan( val[ 1 ] ), true, 'second element equals NaN' );
	t.end();
});

tape( 'the function returns `[PI/2,0]` if provided `+Infinity`', function test( t ) {
	var val;
	var out;

	out = [ 0.0, 0.0 ];
	val = sici( PINF, out, 1, 0 );
	t.equal( val, out, 'returns output array' );
	t.strictEqual( val[ 0 ], HALF_PI, 'first element equals PI/2' );
	t.strictEqual( val[ 1 ], 0, 'second element equals 0' );
	t.end();
});

tape( 'the function returns `[NaN,NaN]` if provided `NaN`', function test( t ) {
	var val;
	var out;

	out = [ 0.0, 0.0 ];
	val = sici( NaN, out, 1, 0 );
	t.equal( val, out, 'returns output array' );
	t.strictEqual( isnan( val[ 0 ] ), true, 'first element equals NaN' );
	t.strictEqual( isnan( val[ 1 ] ), true, 'second element equals NaN' );
	t.end();
});

tape( 'the function supports providing an output object (array)', function test( t ) {
	var out;
	var val;

	out = [ 0.0, 0.0 ];
	val = sici( 3.0, out, 1, 0 );

	t.strictEqual( val, out, 'returns output object' );
	t.strictEqual( val[ 0 ], 1.848652527999468, 'has expected first element' );
	t.strictEqual( val[ 1 ], 0.11962978600800023, 'has expected second element' );

	t.end();
});

tape( 'the function supports providing an output object (typed array)', function test( t ) {
	var out;
	var val;

	out = new Float64Array( 2 );
	val = sici( 3.0, out, 1, 0 );

	t.strictEqual( val, out, 'returns output object' );
	t.strictEqual( val[ 0 ], 1.848652527999468, 'has expected first element' );
	t.strictEqual( val[ 1 ], 0.11962978600800023, 'has expected second element' );

	t.end();
});

tape( 'the function supports specifying a stride', function test( t ) {
	var out;
	var val;

	out = new Float64Array( 4 );
	val = sici( 3.0, out, 2, 0 );

	t.strictEqual( val, out, 'returns output array' );
	t.strictEqual( val[ 0 ], 1.848652527999468, 'returns expected value' );
	t.strictEqual( val[ 1 ], 0, 'returns expected value' );
	t.strictEqual( val[ 2 ], 0.11962978600800023, 'returns expected value' );
	t.strictEqual( val[ 3 ], 0, 'returns expected value' );

	t.end();
});

tape( 'the function supports specifying an offset', function test( t ) {
	var out;
	var val;

	out = new Float64Array( 4 );
	val = sici( 3.0, out, 2, 1 );

	t.strictEqual( val, out, 'returns output array' );
	t.strictEqual( val[ 0 ], 0, 'returns expected value' );
	t.strictEqual( val[ 1 ], 1.848652527999468, 'returns expected value' );
	t.strictEqual( val[ 2 ], 0, 'returns expected value' );
	t.strictEqual( val[ 3 ], 0.11962978600800023, 'returns expected value' );

	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/sici/test/test.assign.js")
},{"./../lib/assign.js":95,"./fixtures/python/large_negative.json":110,"./fixtures/python/large_positive.json":111,"./fixtures/python/medium_negative.json":112,"./fixtures/python/medium_positive.json":113,"./fixtures/python/small_negative.json":114,"./fixtures/python/small_positive.json":115,"./fixtures/python/very_large.json":116,"@stdlib/array/float64":5,"@stdlib/constants/float64/eps":48,"@stdlib/constants/float64/half-pi":51,"@stdlib/constants/float64/ninf":59,"@stdlib/constants/float64/pinf":60,"@stdlib/math/base/assert/is-nan":67,"@stdlib/math/base/special/abs":69,"tape":295}],118:[function(require,module,exports){
(function (__filename){(function (){
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

var tape = require( 'tape' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var sici = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof sici, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is an `assign` method', function test( t ) {
	t.strictEqual( hasOwnProp( sici, 'assign' ), true, 'has property' );
	t.strictEqual( typeof sici.assign, 'function', 'has method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/sici/test/test.js")
},{"./../lib":96,"@stdlib/assert/has-own-property":20,"tape":295}],119:[function(require,module,exports){
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
var isArray = require( '@stdlib/assert/is-array' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var HALF_PI = require( '@stdlib/constants/float64/half-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var sici = require( './../lib/main.js' );


// FIXTURES //

var smallPositive = require( './fixtures/python/small_positive.json' );
var mediumPositive = require( './fixtures/python/medium_positive.json' );
var largePositive = require( './fixtures/python/large_positive.json' );
var smallNegative = require( './fixtures/python/small_negative.json' );
var mediumNegative = require( './fixtures/python/medium_negative.json' );
var largeNegative = require( './fixtures/python/large_negative.json' );
var veryLarge = require( './fixtures/python/very_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof sici, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the sine and cosine integrals for small positive numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	si = smallPositive.si;
	ci = smallPositive.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for medium positive numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	si = mediumPositive.si;
	ci = mediumPositive.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 60.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 60.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for large positive numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = largePositive.x;
	si = largePositive.si;
	ci = largePositive.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for small negative numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	si = smallNegative.si;
	ci = smallNegative.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for medium negative numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	si = mediumNegative.si;
	ci = mediumNegative.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 60.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 60.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for large negative numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = largeNegative.x;
	si = largeNegative.si;
	ci = largeNegative.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for very large positive numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = veryLarge.x;
	si = veryLarge.si;
	ci = veryLarge.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function returns `[0,-Infinity]` if provided `0`', function test( t ) {
	var val = sici( 0.0 );
	t.strictEqual( isArray( val ), true, 'returns an array' );
	t.strictEqual( val[ 0 ], 0.0, 'first element equals NaN' );
	t.strictEqual( val[ 1 ], NINF, 'second element equals -Infinity' );
	t.end();
});

tape( 'the function returns `[-PI/2,NaN]` if provided `-Infinity`', function test( t ) {
	var val = sici( NINF );
	t.strictEqual( isArray( val ), true, 'returns an array' );
	t.strictEqual( val[ 0 ], -HALF_PI, 'first element equals -PI/2' );
	t.strictEqual( isnan( val[ 1 ] ), true, 'second element equals NaN' );
	t.end();
});

tape( 'the function returns `[PI/2,0]` if provided `+Infinity`', function test( t ) {
	var val = sici( PINF );
	t.strictEqual( isArray( val ), true, 'returns an array' );
	t.strictEqual( val[ 0 ], HALF_PI, 'first element equals PI/2' );
	t.strictEqual( val[ 1 ], 0, 'second element equals 0' );
	t.end();
});

tape( 'the function returns `[NaN,NaN]` if provided `NaN`', function test( t ) {
	var val = sici( NaN );
	t.strictEqual( isArray( val ), true, 'returns an array' );
	t.strictEqual( isnan( val[ 0 ] ), true, 'first element equals NaN' );
	t.strictEqual( isnan( val[ 1 ] ), true, 'second element equals NaN' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/sici/test/test.main.js")
},{"./../lib/main.js":97,"./fixtures/python/large_negative.json":110,"./fixtures/python/large_positive.json":111,"./fixtures/python/medium_negative.json":112,"./fixtures/python/medium_positive.json":113,"./fixtures/python/small_negative.json":114,"./fixtures/python/small_positive.json":115,"./fixtures/python/very_large.json":116,"@stdlib/assert/is-array":35,"@stdlib/constants/float64/eps":48,"@stdlib/constants/float64/half-pi":51,"@stdlib/constants/float64/ninf":59,"@stdlib/constants/float64/pinf":60,"@stdlib/math/base/assert/is-nan":67,"@stdlib/math/base/special/abs":69,"tape":295}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":52,"@stdlib/constants/float64/high-word-exponent-mask":53,"@stdlib/math/base/special/kernel-cos":77,"@stdlib/math/base/special/kernel-sin":81,"@stdlib/math/base/special/rempio2":89,"@stdlib/number/float64/base/get-high-word":130}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/constants/float64/exponent-bias":50,"@stdlib/constants/float64/high-word-exponent-mask":53,"@stdlib/number/float64/base/get-high-word":130}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":40}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":127,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":40}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":129,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":134}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":40}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":133,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":61,"@stdlib/math/base/assert/is-infinite":65,"@stdlib/math/base/assert/is-nan":67,"@stdlib/math/base/special/abs":69}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":135,"./main.js":137,"@stdlib/utils/define-nonenumerable-read-only-property":160}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":135}],138:[function(require,module,exports){
arguments[4][129][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":40,"dup":129}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":140}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":138,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":143,"@stdlib/array/float64":5,"@stdlib/array/uint32":11}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":141,"./main.js":144,"@stdlib/utils/define-nonenumerable-read-only-property":160}],143:[function(require,module,exports){
arguments[4][127][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":40,"dup":127}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":141}],145:[function(require,module,exports){
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

},{"./is_number.js":148}],146:[function(require,module,exports){
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

},{"./is_number.js":148,"./zero_pad.js":152}],147:[function(require,module,exports){
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

},{"./main.js":150}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
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

},{"./format_double.js":145,"./format_integer.js":146,"./is_string.js":149,"./space_pad.js":151,"./zero_pad.js":152}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{"./main.js":154}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{"./main.js":157}],156:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"dup":149}],157:[function(require,module,exports){
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

},{"./is_string.js":156,"@stdlib/string/base/format-interpolate":147,"@stdlib/string/base/format-tokenize":153}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":159}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":161}],161:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":165}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],163:[function(require,module,exports){
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

},{"./define_property.js":163}],165:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":162,"./has_define_property_support.js":164,"./polyfill.js":166}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":155}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":168,"./polyfill.js":169,"@stdlib/assert/has-tostringtag-support":24}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":170}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":170,"./tostringtag.js":171,"@stdlib/assert/has-own-property":20}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":158}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){

},{}],174:[function(require,module,exports){
arguments[4][173][0].apply(exports,arguments)
},{"dup":173}],175:[function(require,module,exports){
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
},{"base64-js":172,"buffer":175,"ieee754":278}],176:[function(require,module,exports){
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
},{"_process":285}],178:[function(require,module,exports){
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

},{"events":176,"inherits":279,"readable-stream/lib/_stream_duplex.js":180,"readable-stream/lib/_stream_passthrough.js":181,"readable-stream/lib/_stream_readable.js":182,"readable-stream/lib/_stream_transform.js":183,"readable-stream/lib/_stream_writable.js":184,"readable-stream/lib/internal/streams/end-of-stream.js":188,"readable-stream/lib/internal/streams/pipeline.js":190}],179:[function(require,module,exports){
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
},{"./_stream_readable":182,"./_stream_writable":184,"_process":285,"inherits":279}],181:[function(require,module,exports){
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
},{"./_stream_transform":183,"inherits":279}],182:[function(require,module,exports){
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
},{"../errors":179,"./_stream_duplex":180,"./internal/streams/async_iterator":185,"./internal/streams/buffer_list":186,"./internal/streams/destroy":187,"./internal/streams/from":189,"./internal/streams/state":191,"./internal/streams/stream":192,"_process":285,"buffer":175,"events":176,"inherits":279,"string_decoder/":294,"util":173}],183:[function(require,module,exports){
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
},{"../errors":179,"./_stream_duplex":180,"inherits":279}],184:[function(require,module,exports){
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
},{"../errors":179,"./_stream_duplex":180,"./internal/streams/destroy":187,"./internal/streams/state":191,"./internal/streams/stream":192,"_process":285,"buffer":175,"inherits":279,"util-deprecate":303}],185:[function(require,module,exports){
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
},{"./end-of-stream":188,"_process":285}],186:[function(require,module,exports){
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
},{"buffer":175,"util":173}],187:[function(require,module,exports){
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
},{"_process":285}],188:[function(require,module,exports){
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

},{"./":194,"get-intrinsic":269}],194:[function(require,module,exports){
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

},{"es-define-property":254,"es-errors/type":260,"function-bind":268,"get-intrinsic":269,"set-function-length":289}],195:[function(require,module,exports){
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

},{"./lib/is_arguments.js":196,"./lib/keys.js":197}],196:[function(require,module,exports){
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

},{}],197:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],198:[function(require,module,exports){
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

},{"es-define-property":254,"es-errors/syntax":259,"es-errors/type":260,"gopd":270}],199:[function(require,module,exports){
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

},{"define-data-property":198,"has-property-descriptors":271,"object-keys":283}],200:[function(require,module,exports){
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

},{"./ToNumber":232,"./ToPrimitive":234,"./Type":239}],202:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/isNaN":248,"../helpers/isPrefixOf":249,"./ToNumber":232,"./ToPrimitive":234,"es-errors/type":260,"get-intrinsic":269}],203:[function(require,module,exports){
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

},{"call-bind/callBound":193,"es-errors/type":260}],204:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":262}],205:[function(require,module,exports){
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

},{"./DayWithinYear":208,"./InLeapYear":212,"./MonthFromTime":222,"es-errors/eval":255}],206:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":253,"./floor":243}],207:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":243}],208:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":206,"./DayFromYear":207,"./YearFromTime":241}],209:[function(require,module,exports){
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

},{"./modulo":244}],210:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":251,"./IsAccessorDescriptor":213,"./IsDataDescriptor":215,"es-errors/type":260}],211:[function(require,module,exports){
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

},{"../helpers/timeConstants":253,"./floor":243,"./modulo":244}],212:[function(require,module,exports){
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

},{"./DaysInYear":209,"./YearFromTime":241,"es-errors/eval":255}],213:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":251,"es-errors/type":260,"hasown":277}],214:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":280}],215:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":251,"es-errors/type":260,"hasown":277}],216:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":213,"./IsDataDescriptor":215,"./IsPropertyDescriptor":217,"es-errors/type":260}],217:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":251}],218:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/timeConstants":253}],219:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"./DateFromTime":205,"./Day":206,"./MonthFromTime":222,"./ToInteger":231,"./YearFromTime":241,"./floor":243,"./modulo":244,"get-intrinsic":269}],220:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/timeConstants":253,"./ToInteger":231}],221:[function(require,module,exports){
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

},{"../helpers/timeConstants":253,"./floor":243,"./modulo":244}],222:[function(require,module,exports){
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

},{"./DayWithinYear":208,"./InLeapYear":212}],223:[function(require,module,exports){
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

},{"../helpers/isNaN":248}],224:[function(require,module,exports){
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

},{"../helpers/timeConstants":253,"./floor":243,"./modulo":244}],225:[function(require,module,exports){
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

},{"./Type":239}],226:[function(require,module,exports){
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


},{"../helpers/isFinite":247,"./ToNumber":232,"./abs":242,"get-intrinsic":269}],227:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":253,"./DayFromYear":207}],228:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":253,"./modulo":244}],229:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],230:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":232}],231:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/isNaN":248,"../helpers/sign":252,"./ToNumber":232,"./abs":242,"./floor":243}],232:[function(require,module,exports){
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

},{"./ToPrimitive":234,"call-bind/callBound":193,"safe-regex-test":288}],233:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":263}],234:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":265}],235:[function(require,module,exports){
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

},{"./IsCallable":214,"./ToBoolean":229,"./Type":239,"es-errors/type":260,"hasown":277}],236:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":269}],237:[function(require,module,exports){
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

},{"../helpers/isFinite":247,"../helpers/isNaN":248,"../helpers/sign":252,"./ToNumber":232,"./abs":242,"./floor":243,"./modulo":244}],238:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":232}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":206,"./modulo":244}],241:[function(require,module,exports){
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

},{"call-bind/callBound":193,"get-intrinsic":269}],242:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":269}],243:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],244:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":250}],245:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":253,"./modulo":244}],246:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":201,"./5/AbstractRelationalComparison":202,"./5/Canonicalize":203,"./5/CheckObjectCoercible":204,"./5/DateFromTime":205,"./5/Day":206,"./5/DayFromYear":207,"./5/DayWithinYear":208,"./5/DaysInYear":209,"./5/FromPropertyDescriptor":210,"./5/HourFromTime":211,"./5/InLeapYear":212,"./5/IsAccessorDescriptor":213,"./5/IsCallable":214,"./5/IsDataDescriptor":215,"./5/IsGenericDescriptor":216,"./5/IsPropertyDescriptor":217,"./5/MakeDate":218,"./5/MakeDay":219,"./5/MakeTime":220,"./5/MinFromTime":221,"./5/MonthFromTime":222,"./5/SameValue":223,"./5/SecFromTime":224,"./5/StrictEqualityComparison":225,"./5/TimeClip":226,"./5/TimeFromYear":227,"./5/TimeWithinDay":228,"./5/ToBoolean":229,"./5/ToInt32":230,"./5/ToInteger":231,"./5/ToNumber":232,"./5/ToObject":233,"./5/ToPrimitive":234,"./5/ToPropertyDescriptor":235,"./5/ToString":236,"./5/ToUint16":237,"./5/ToUint32":238,"./5/Type":239,"./5/WeekDay":240,"./5/YearFromTime":241,"./5/abs":242,"./5/floor":243,"./5/modulo":244,"./5/msFromTime":245}],247:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":248}],248:[function(require,module,exports){
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

},{"call-bind/callBound":193}],250:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],251:[function(require,module,exports){
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

},{"es-errors/type":260,"hasown":277}],252:[function(require,module,exports){
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

},{"get-intrinsic":269}],255:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],256:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],257:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],258:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],259:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],260:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],261:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],262:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":260}],263:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":264,"./RequireObjectCoercible":262}],264:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],265:[function(require,module,exports){
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

},{"./helpers/isPrimitive":266,"is-callable":280}],266:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],267:[function(require,module,exports){
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

},{}],268:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":267}],269:[function(require,module,exports){
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

},{"es-errors":256,"es-errors/eval":255,"es-errors/range":257,"es-errors/ref":258,"es-errors/syntax":259,"es-errors/type":260,"es-errors/uri":261,"function-bind":268,"has-proto":272,"has-symbols":273,"hasown":277}],270:[function(require,module,exports){
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

},{"get-intrinsic":269}],271:[function(require,module,exports){
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

},{"es-define-property":254}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
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

},{"./shams":274}],274:[function(require,module,exports){
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

},{}],275:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":274}],276:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":268}],277:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":268}],278:[function(require,module,exports){
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

},{}],279:[function(require,module,exports){
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

},{}],280:[function(require,module,exports){
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

},{}],281:[function(require,module,exports){
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

},{"call-bind/callBound":193,"has-tostringtag/shams":275}],282:[function(require,module,exports){
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

},{"./isArguments":284}],283:[function(require,module,exports){
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

},{"./implementation":282,"./isArguments":284}],284:[function(require,module,exports){
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

},{}],285:[function(require,module,exports){
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

},{}],286:[function(require,module,exports){
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
},{"_process":285,"through":301,"timers":302}],287:[function(require,module,exports){
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

},{"buffer":175}],288:[function(require,module,exports){
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

},{"call-bind/callBound":193,"es-errors/type":260,"is-regex":281}],289:[function(require,module,exports){
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

},{"define-data-property":198,"es-errors/type":260,"get-intrinsic":269,"gopd":270,"has-property-descriptors":271}],290:[function(require,module,exports){
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

},{"es-abstract/es5":246,"function-bind":268}],291:[function(require,module,exports){
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

},{"./implementation":290,"./polyfill":292,"./shim":293,"define-properties":199,"function-bind":268}],292:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":290}],293:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":292,"define-properties":199}],294:[function(require,module,exports){
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
},{"safe-buffer":287}],295:[function(require,module,exports){
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
},{"./lib/default_stream":296,"./lib/results":298,"./lib/test":299,"_process":285,"defined":200,"through":301,"timers":302}],296:[function(require,module,exports){
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
},{"_process":285,"fs":174,"through":301}],297:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":285,"timers":302}],298:[function(require,module,exports){
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
},{"_process":285,"events":176,"function-bind":268,"has":276,"inherits":279,"object-inspect":300,"resumer":286,"through":301,"timers":302}],299:[function(require,module,exports){
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
},{"./next_tick":297,"deep-equal":195,"defined":200,"events":176,"has":276,"inherits":279,"path":177,"string.prototype.trim":291}],300:[function(require,module,exports){
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

},{}],301:[function(require,module,exports){
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
},{"_process":285,"stream":178}],302:[function(require,module,exports){
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
},{"process/browser.js":285,"timers":302}],303:[function(require,module,exports){
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
},{}]},{},[117,118,119]);
