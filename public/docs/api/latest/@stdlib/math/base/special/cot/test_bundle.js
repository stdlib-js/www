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

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

},{"./float64array.js":5,"./polyfill.js":7,"@stdlib/assert/has-float64array-support":18}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./polyfill.js":9,"./uint16array.js":10,"@stdlib/assert/has-uint16array-support":26}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

},{"./polyfill.js":12,"./uint32array.js":13,"@stdlib/assert/has-uint32array-support":29}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

},{"./polyfill.js":15,"./uint8array.js":16,"@stdlib/assert/has-uint8array-support":32}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

var hasOwnProp = require( './main.js' );


// EXPORTS //

module.exports = hasOwnProp;

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

var hasSymbolSupport = require( './main.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

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

var hasToStringTagSupport = require( './main.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

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

},{"./uint16array.js":28,"@stdlib/assert/is-uint16array":40,"@stdlib/constants/uint16/max":56}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":31,"@stdlib/assert/is-uint32array":42,"@stdlib/constants/uint32/max":57}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":34,"@stdlib/assert/is-uint8array":44,"@stdlib/constants/uint8/max":58}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":122}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":122}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":122}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":122}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":99}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":60}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":62}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":64}],64:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":103,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/to-words":118}],67:[function(require,module,exports){
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
* Evaluate the cotangent of a number.
*
* @module @stdlib/math/base/special/cot
*
* @example
* var cot = require( '@stdlib/math/base/special/cot' );
*
* var v = cot( 0.0 );
* // returns Infinity
*
* v = cot( 3.141592653589793/2.0 );
* // returns ~0.0
*
* v = cot( -3.141592653589793/4.0 );
* // returns ~-1.0
*
* v = cot( 3.141592653589793/4.0 );
* // returns ~1.0
*
* v = cot( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":68}],68:[function(require,module,exports){
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

var tan = require( '@stdlib/math/base/special/tan' );


// MAIN //

/**
 * Evaluates the cotangent of a number.
 *
 * @param {number} x - input value (in radians)
 * @returns {number} cotangent
 *
 * @example
 * var v = cot( 0.0 );
 * // returns Infinity
 *
 * @example
 * var v = cot( 3.141592653589793/2.0 );
 * // returns ~0.0
 *
 * @example
 * var v = cot( -3.141592653589793/4.0 );
 * // returns ~-1.0
 *
 * @example
 * var v = cot( 3.141592653589793/4.0 );
 * // returns ~1.0
 *
 * @example
 * var v = cot( NaN );
 * // returns NaN
 */
function cot( x ) {
	return 1.0 / tan( x );
}


// EXPORTS //

module.exports = cot;

},{"@stdlib/math/base/special/tan":97}],69:[function(require,module,exports){
module.exports={"expected":[0.08999497697677873,1.276260551336704,0.24636074281213383,-0.45026265243066416,-1.906363760879988,5.448340545666083,0.8853316386804626,0.06010099680140088,-0.690902450742276,-3.4152564613220875,2.632399210468424,0.5810810081093759,-0.12209429783486712,-1.03553446542176,-8.289279073656342,1.5904166651145932,0.37823994038290076,-0.3311145740234594,-1.5612263408871658,12.761353875738575,1.1262588097759776,0.13060874136558356,-0.569924720280928,-2.3332847197902176,4.034148194899944,0.7033559008241138,-0.03492478111139948,-0.8132960667243837,-4.084320660414778,1.9458328395489182,0.4808253089337522,-0.2023922782116668,-1.1327922517009252,-119.32037353974229,1.344494034270719,0.2912459686896214,-0.4603521122578267,-1.8681360324762746,6.341496142095683,0.962914759364483,0.11918171217297763,-0.6785923891730712,-3.7629233173895007,3.0056376099967945,0.5923464882168058,-0.04619481473281783,-0.9523521810073156,-10.498744816109351,1.8931321955059357,0.3878502056262595,-0.35919971395978667,-1.3291379700564923,14.299019605570528,1.001483720740363,0.20813423407676274,-0.5588745001545756,-1.9197409509343564,4.183987012215228,0.715957039791999,0.04044241801906694,-0.7994660513956926,-5.447616197359329,2.369253842573249,0.4911854373256914,-0.125008925991677,-1.1138370148625105,-59.655996370652915,1.580330403114465,0.30035990774315585,-0.45023425681269225,-1.571138975484567,6.706295069731983,0.8559490787112805,0.12769005227400262,-0.6664215540384687,-2.351909609896045,3.0919023241142534,0.6037243776305374,-0.03779938228700747,-0.9364967602106088,-4.1356836611507815,1.4262443669034623,0.397523150837154,-0.2053824228862783,-1.7485862430068029,16.255402321882446,1.3364647514235444,0.07985349063055891,-0.5479273118097983,-1.881095282061661,10.800628218375495,0.7287103126250419,0.04883977019521027,-0.5887870928146614,-5.201747667311116,2.4258019439310865,0.68245353277365,-0.2552182991181321,-1.0952323934234725,-6.234521072589505,1.2123834341203226,0.30951984682323647,-0.2883853146612424,-2.117027127673517,7.114542370486255,1.1388357348018117,0.001482621657477363,-0.6543859155620985,-2.2982287004559825,5.807263507307336,0.6152179898052049,-0.029409267318043747,-0.6994186682810861,-8.913340311263568,1.9724902670821962,0.573426173197882,-0.34038740460871775,-1.283772689265447,-12.343035601309536,1.0356323233357498,0.22568440025427453,-0.3752263969912621,-2.632024833874341,4.517592149876801,0.9735900154830025,-0.07687003908302538,-0.7723527699540407,-2.8986090891413285,3.937209925665412,0.5121651905651569,-0.10801979664301756,-0.8228803224789443,-29.81961679819995,1.6405525998769237,0.4737756674353704,-0.4302245028578652,-1.5144896212288401,-378.9311987995404,0.8854158717691857,0.14476268229331096,-0.4673290215570493,-3.4146585792455197,3.278590719992651,0.8317709055051932,-0.15617235960802425,-0.9055188934007533,-3.851886787701395,2.949003862257084,0.4170650761101166,-0.18797250081907857,-0.9633616007295573,22.36679573618009,1.384238420971997,0.38125950587763546,-0.5263303085000977,-1.8073426990535488,13.208829698811675,0.7546918030710541,0.06565629660447408,-0.5664337841421893,-1.9469428351573341,9.358907837459094,0.36255112311825083,-0.2374397181616993,-1.05902680482302,-5.629437753295409,2.3317917057091897,0.6619502486399571,-0.5883478317016135,-2.028286063227253,8.096942156020939,1.1780882686893552,0.2941110234894844,-0.3037455906453814,-6.221540299541197,2.229891656470458,0.6385661436199779,-0.012640261657345869,-0.6747450499722824,-2.3899245551413197,5.35402050571482,0.27633872543837884,-0.32178855722824673,-1.2403187615831786,-10.213138522763929,1.905289985171442,0.5548098517340585,-0.6989329383053693,-2.5047522929775843,4.905863068035904,1.0067835676774854,0.21088906988427236,-0.3914238478870636,-12.293206293712155,1.8314980215476835,0.5335082986668794,-0.09109208091462907,-0.7951494498697724,-3.0370619141105584,3.7164316294955957,0.19378093518339606,-0.4105012933494145,-1.460645373314135,-51.539393920383105,1.5895988174098141,0.4565973335984477,-0.8223333120751907,-3.2139330084888544,3.4869925961276578,0.8605318934462468,0.13037298610640227,-0.4846509418235854,-337.2397120970455,1.533106382025676,0.4368821668654133,-0.17067194939195343,-0.9315554972292459,-4.088423299647285,2.817532681453682,0.11369291865686537,-0.505111062516905,-1.7379275371635727,16.986738979090564,1.3438433978414326,0.3651700688196555,-0.9627327750973246,-4.400574462823088,2.6771183490321815,0.732758458172289,0.05148540755272864,-0.5852387415005699,13.266324850197444,1.2987208145966416,0.34665298594450117,-0.2524092945436681,-1.0894445486446251,-6.131009127087712,2.2437759897770895,0.035019334325222605,-0.6075190520292335,-2.1026410119896912,7.253365395891232,1.1449156534434384,0.27882968015708076,-1.1260446044891397,-6.8363588074490655,2.1481176463835707,0.6188617512239784,-0.02676818831484665,-0.6954959433874167,6.466049770169113,1.1076353606827043,0.2611961880892391,-0.33744528179803185,-1.276808017918249,-11.951109646639871,1.8416114802803383,-0.043223644160991,-0.7201649303414629,-2.611248317074211,4.574771265305318,0.97874370857709,0.19618161113896979,-1.3209664925478628,-14.893040913341066,1.7715510179572025,0.515500945562436,-0.10535076339570972,-0.8184639590550133,4.2395505288419795,0.9470716704040524,0.17916744230315004,-0.42710058711402676,-1.505832199386364,-189.46427989902287,1.540882639443208,-0.12199845344286467,-0.8462851609748541,-3.381547475859683,3.309867375222831,0.8362455032285175,0.11603618336060971,-1.560901765934439,89.62636729070617,1.4867908107242773,0.42016652774195584,-0.18524160842576323,-0.9582863357093667,3.123504685922458,0.8086936529944821,0.09941014759953612,-0.5229649158126799,-1.7961368788730407,13.688628575877026,1.3049531535229018,-0.20229397396064402,-0.9903211388420844,-4.707253231540691,2.565977296499082,0.7112744333867027,0.03733511185483657,-1.867712088340018,11.161043302603884,1.2614599353363756,0.3309097595527513,-0.2674859802560387,-1.1208129581065929,2.446364157335038,0.6868086396302009,0.020885856537733484,-0.6270221007363623,-2.1815471893900007,6.566561382338654,0.3127721600940035,-0.28517620081851824,-1.1585932014818248,-7.582587674068834,2.071159288006772,0.5994988180400229,-0.040906801168280764,-0.7166585358796549,-2.593274327802372,4.626028881461978,-0.3030330404447111,-1.197840287537054,-8.680935498003382,1.9870777887225144,0.5773731605609378,-0.05738182111167901,-0.7418332613873235,-2.7259000599359813,4.283866751339406,0.9514684669196533,0.1815554271740677,-0.42436865117870887,-1.498301432604761,0.5556634984452656,-0.07388794731469756,-0.767629480559374,-2.8709675854763934,3.986719370962865,0.9206344535016743,0.16462771896329095,-0.4439013501817605,-1.552982773348223,113.06526893409911,1.4942416353020578,0.422890221522397,-3.0304041992298822,3.7261197400630146,0.8907196876740254,0.1477913726844227,-0.463721171361348,-1.6105287737583298,39.54982305307652,1.442380320385095,0.40364810202036944,-0.19988770155408211,-0.9857506524905391,-4.65427074743271,2.583622489499704,-0.4838454434057641,-1.6712042573074966,23.95878261551369,1.3929210723939818,0.38465962483564825,-0.21703720326217293,-1.0186921760626366,-5.0576127140008085,2.462609958765514,0.6902177484961507,0.023199730891875468,-0.6238047380155599,-2.1682945626737684,0.365909745927833,-0.2343094984888156,-1.0527556086009464,-5.53409359814906,2.3510126681495294,0.6662231932450206,0.0067607143096354485,-0.6468736551516509,-2.2654701846987644,5.996335017481722,1.0816757536316568,0.24861925648710947,-6.105930275348524,2.2477192437087727,0.6427484428685148,-0.009674649203586043,-0.6704383952800005,-2.3701626184463165,5.443405303936683,1.0466313637460216,0.23123788391730968,-0.3692171375317468,-1.3538981592591792,-18.085929767082938,1.7236781587791716,-0.6945282711442861,-2.4833427195729496,4.981291714607895,1.0127723123282626,0.21398813479633327,-0.38800824871411643,-1.401523060418857,-25.759995643160693,1.6602062021456276,0.480254635191091,-0.13400153174187351,-0.8667581003077924,0.9800220639541086,0.19685930212069722,-0.40704057789448156,-1.4513938775968378,-44.704383796250305,1.6001062603117402,0.46018564035158777,-0.1507700425388279,-0.8959587400683954,-3.7699638316615465,3.00099222474218,0.7893448651008869,0.08749741407983601,-168.61837342360622,1.5430865704448817,0.4404179626542192,-0.16762186865061024,-0.9260322732791292,-4.0365224944103835,2.844260844121241,0.7630091320073272,0.07095892621276545,-0.5594830801943007,-1.9219151155965883,9.850781871509403,1.2313061099045923,-0.9570354348637995,-4.340964819569607,2.701529215062459,0.7373257782273522,0.054458971478832684,-0.581264776933356,-2.0015803562532803,8.463934763985804,1.1907705155824873,0.29985453633084,-0.2979898191922186,-1.186639999876682,0.7122574841683271,0.03798852892798311,-0.6034666896821393,-2.0866657021716466,7.415830631505553,1.151791189387321,0.282028110736934,-0.31597386342833056,-1.2270081720737314,-9.685746896221973,1.929976244836848,0.5617328184400356,-0.06923875133484715,6.595473011817654,1.114260304406779,0.26436619269855655,-0.3341456825986769,-1.2690381202667929,-11.539217314911914,1.8547049737623367,0.5403077792060464,-0.08577280266535806,-0.7865703079412271,-2.9839519203107994,3.7961734095200015,0.8990493504436181,-1.3128587805540501,-14.2603174142013,1.7838871901766864,0.519259930461524,-0.10235353920403285,-0.8135243262623579,-3.1551335977402584,3.557749179129201,0.8697603163065747,0.13574443347200313,-0.4781497915936577,-1.653794547524391,0.49856831899229087,-0.11899015821876702,-0.8412089419429949,-3.3450410541903937,3.345668973164829,0.8412968974928987,0.11904239285658227,-0.49850401293315877,-1.716900624460312,18.665504223535752,1.3587589228641717,0.3711634824331803,-0.22943530292510728,3.1556979207443296,0.8136099221067745,0.10240558413324721,-0.5191945397769567,-1.7836718026859266,14.270850555288177,1.3129990691685163,0.3525761159612451,-0.24680245807348947,-1.0779680507125573,-5.933717704024443,2.2760082002791258,0.6493043918080617,-1.8544763166499303,11.546131011857742,1.269172580877527,0.33420293937254075,-0.26431108871079795,-1.1141448584909777,-6.593181800696858,2.178090550777865,0.6261851476859757,-0.021487112791719977,-0.6876934804285945,-2.450568047302375,0.31603051166522333,-0.28197250976341887,-1.1516713636066218,-7.4129477294545545,2.0869414989330775,0.6035369536495222,-0.037936949625509156,-0.712179852864405,-2.5705423622550923,4.693374707393023,0.9891314512477049,0.20166846937838373,-0.40165881082644256,2.0018382339271996,0.5813336860261509,-0.05440731379606741,-0.7372462754734731,-2.7011018720155335,4.341987113584852,0.9571341191677826,0.18462006855032756,-0.420873790992549,-1.488722031848603,-94.7295009296378,1.5588384627081338,0.4459519736798619,-2.8437927408479227,4.037413383354515,0.926127950361619,0.16767482132550235,-0.44035646863872924,-1.542912439642765,170.09565499754194,1.5038702330020484,0.42639015401654934,-0.17978778789792424,-0.9482123579285893,-4.250982648598549,0.1508227188158997,-0.46012322948373896,-1.5999228998422663,44.807604929902325,1.4515538923498745,0.40710061769363715,-0.19680580158189964,-0.9799210962742301,-4.587986351311248,2.6065567955129287,0.7192526444667044,0.0426215504430867,-0.5971742324695393,1.4016757462288838,0.3880675090830528,-0.21393427185015948,-1.012667983540502,-4.979962541363628,2.48371190320523,0.6946046234287573,0.02616678081624886,-0.6196932187719808,-2.1514961925745126,6.807787619307798,1.1246825029424992,0.2693210599138302,-5.4418281116165295,2.3705035036925945,0.670513053827683,0.009726159125029523,-0.6426756621399675,-2.2474075586247095,6.107902632712866,1.0881311174825383,0.25177011583400205,-0.3473263322975375,-1.3003367318218466,-13.37355159541892,-0.006709206898453859,-0.6661488300220354,-2.3506765218084484,5.535722971963126,1.052864202348786,0.23436383189656532,-0.36585134594198226,-1.345531078074449,-17.162549023102414,1.735513856609884,0.5043569708718539,-0.11430171519987178,-0.8333408480020374,1.018797135199136,0.21709113509417033,-0.3846005000852659,-1.3927696465367365,-23.92920250100399,1.6713996289421356,0.4839090077331359,-0.13098423558219338,-0.8615784608781567,-3.494917656650161,3.2071373383721093,0.8213264167697952,-1.4422216727968744,-39.469371782447524,1.6107138882030105,0.46378375344455103,-0.14773874302130316,-0.8906273236595853,-3.725353287252195,3.030928775291398,0.7941689505355811,0.09048614069525565,-0.5342805922978888,1.5531585101272765,12.202452955332571,-0.16457481843161753,0.3393530660691862,-3.985849426393844,-1.1038307204642062,0.7677113384946839,2.2049303770962667,-0.555596092493413,1.4984685746908373,10.150235806657793,-0.1815022248671033,0.32112546803826686,-4.282870270007059,-1.1409677899594852,0.7419131136103947,2.1119541789867626,-0.5773044878083782,-0.03330557303362678,8.684870114753519,-2.5357662488345376,0.30308927605812735,-4.624875435231365,-1.179524376420097,0.7167364968108104,2.0252163933210645,-0.5994288042630672,-0.04976925654939344,7.585601673269934,-2.6632022019823367,0.2852318953857201,0.966036541129289,-1.219605526837758,-0.4154394956364816,1.9440671220182881,-0.621993417265699,-0.06625989766921152,6.730059552241679,-2.802305528109119,0.26754117121507276,0.9347578305080785,-1.2613264798763615,-0.4348452076438934,1.8679432833033076,797.7798252819579,-0.08278649709767595,6.044942402673403,-2.9548417492375094,0.2500053530879617,0.9044257141570221,-1.3048139496711604,-0.4545303137112722,1.7963545650044677,56.528212242570596,-0.09935813379830095,0.41250291637770103,-3.1229507719479668,-0.9708948312691686,0.8749821947725996,-1.3502076080791041,-0.4745117630442344,1.7288720191624039,29.29403194389063,-0.11598398511289125,0.3933992002009006,-3.3092517255682563,-1.0033426655462292,0.8463735577640779,2.5172569145791774,-0.49480734435567125,0.030796040401006617,19.76226924494502,-0.1326733473394884,0.3745409492087847,-3.516985118599475,-1.03687866429397,0.8185499701428998,2.4014606684235495,-0.515435755196631,0.014352336994647871,14.90452519065208,-2.2197071583991006,0.3559134648756585,1.0982845193741098,-1.071577562584911,0.7914651231438622,2.294458597309732,-0.5364166773160658,-0.0020836100592430767,11.958522133891714,-2.3208164509102116,0.3375026527178781,1.062664973781779,-1.1075206728355547,-0.3606155594976477,2.1952339001739545,-15.896004505256407,-0.018520682919679888,9.98038582410723,-2.4299454856221216,0.3192949758285258,1.0282683603598057,-1.144796640893648,-0.3793001996846105,2.102920256352901,-21.540374264353115,-0.03496776617983021,0.4896304978162103,-2.5481543149954438,-0.8535513057682143,0.995015102137014,-1.1835023082520577,-0.3982192743822212,2.0167749600706704,-33.372106005853254,-0.051433766087775334,0.4694162993770724,-2.6766977670004737,-0.8823667709704848,0.962832022798702,3.0787168667958538,-0.4173876430761476,1.936157611620297,-73.95330189569445,-0.06792762986689493,0.44951163928171217,-2.817072370634052,-0.9120303559211322,0.9316517027998515,2.914783241760731,-0.43682083260150856,0.07859214530036993,343.20101304098233,-1.88679766515278,0.42989894801740586,-2.9710775337462167,-0.9425968213041249,0.9014119111807919,2.7658391667423956,-0.4565350921512499,0.06207551911835378,51.67662310650801,-1.9641466800608351,0.41056147888462075,1.2092921979801128,-0.9741253199131257,-0.2897435312331428,2.629848385735695,-0.47654745275033067,0.04559256242583605,27.93379223088219,-2.0466565101848153,0.3914832453874231,1.1696080944761138,-1.006679861758756,-0.3076450839187245,2.505126978107464,-9.015319083384155,0.02913429120934375,0.5717617250683275,-2.134910801647535,0.3726489633953238,1.131421001768809,-1.0403298389165794,-0.3257285983176303,2.390270286338344,-10.602888812422117,0.012691774995130202,0.5501550795309547,-2.2295840820206467,-0.7743559240728141,1.0946282736835278,3.916627075016012,-0.3440067866588153,2.2840973046617243,-12.860587880409307,-0.0037438825828077817,0.5289356922570854,-2.3314601943478213,-0.8009870483304646,1.0591360807455519,3.6642998655513037,-0.3624928491335639,0.14348316760033789,-16.32860093248852,-0.02018156305763609,0.5080820800264808,-2.441455407017542,-0.8283287449841014,1.0248584702083554,3.4406404004116546,-0.38120051524461374,0.12674781302734564,-22.34100731268765,-1.6873192488712343,0.4875738827447713,1.380589463093957,-0.8564252198438677,0.9917165433494048,3.240923653719749,-0.4001440881628112,0.1100820424386928,-35.331347573294856,-1.7523546487464539,0.46739177666620896,1.3338845510755737,-0.8853239929004431,-0.23876425920037267,3.0614083130810514,-5.670705888655685,0.09347647157558947,-84.30622143589724,-1.8212475133828077,0.4475173947917784,1.289183648606635,-0.9150762304446907,-0.25620616197453977,2.899093408795915,-6.27170408969052,0.07692184870674895,0.6368029493663183,-1.894392248409228,-0.6765707576719981,1.246337825177869,-0.9457371172805938,-0.27379558575808277,2.7515437879614333,-7.010850388345774,0.06040903370202209,0.613940534839516,-1.9722383958809413,-0.7008003864734863,1.2052121869603478,4.874633543445965,-0.2915440379106432,0.20958018974192008,-7.942531873008286,0.043928977628202706,0.5915349198130113,-2.055300642416882,-0.725594705585866,1.1656842474106597,4.497824169174335,-0.30946340833123237,0.19248070289155478,-9.153994221255157,-1.464580334301692,0.5695607968797769,1.5851868092769235,-0.7509875666861782,1.1276425192326414,4.172893202672959,-0.32756600362685556,0.17548907002292646,-10.794571831528012,-1.517547922032578,0.5479942818518104,1.5289147631416515,-0.7770151390442682,-0.1719622165735791,3.889673754460365,-0.34586458352311844,0.15859517708409504,-13.142873649607566,-1.5732254540254231,0.5268128011995049,1.4754016095889624,-0.8037161269121154,-0.18893266320159804,3.640491985198841,-4.4262432152915006,0.14178913112019967,0.7308337108491796,-1.631858863907238,0.50599498932376,1.4244224314368805,-0.8311320111482451,-0.2060088375292992,3.4194470414704408,-4.791251203037142,0.1250612362851769,0.7059175761681163,-1.693724287225793,-0.6092364716985812,1.3757757372276318,7.186770241570736,-0.22320104637083235,3.2219269318109407,-5.218663136055368,0.10840197080578055,0.6815730022030276,-1.7591328654088303,-0.6320015704042037,1.3292804741511597,6.412820029167919,-0.24051986340723058,0.2598576310227056,-5.726278162297168,-1.2801102511271767,0.6577678321391629,-1.8284364961402175,-0.6552445948213976,1.2847734862114275,5.7864672453092085,-0.25797615653758593,0.2423859296591543,-6.33937407551509,-1.324412938581003,0.6344718891914558,1.7663751241598877,-0.678993719398419,-0.1066183215483738,5.268910457887492,-0.27558111671862223,0.22505288904576154,-7.095096373950752,-1.3706873659068288,0.6116568130802963,1.700566287011869,-0.7032789184868675,-0.12327078299133488,4.833852159424986,-3.397200661017429,0.20784760803226163,0.8341176891212969,-1.4190949039373424,0.589295911834212,1.6383362955968452,-0.7281321281340335,-0.13999086162747623,4.46283742287441,-3.6155200757599077,0.19075948270641832,0.8066225170024452,-1.4698145707606338,-0.5245622583587022,1.5793699298501984,-0.7535874249049709,-0.15678806188667677,4.142533117884311,-3.86142671502852,0.17377817889087502,0.7798468675155766,-1.523045530555576,-0.5457037191205356,1.52338754368088,11.00581701539415,-0.17367205985167067,0.32951959999186087,-4.140663191686126,0.15689360598813148,0.7537489464405777,-1.5790100287683164,-0.5672278658773456,1.4701401686881352,9.305964729331693,-0.19065272619908294,0.31139659737402775,-4.460683758101207,-1.1615335426530018,0.7282897636578661,2.064545930145944,-0.589157137807039],"x":[-1.8110048645192806e18,-1.6848065908881925e298,-3.369613181776385e298,-5.054419772664577e298,-6.73922636355277e298,-8.424032954440962e298,-1.0108839545329155e299,-1.1793646136217347e299,-1.347845272710554e299,-1.5163259317993734e299,-1.6848065908881925e299,-1.853287249977012e299,-2.021767909065831e299,-2.1902485681546504e299,-2.3587292272434695e299,-2.527209886332289e299,-2.695690545421108e299,-2.8641712045099274e299,-3.032651863598747e299,-3.201132522687566e299,-3.369613181776385e299,-3.538093840865205e299,-3.706574499954024e299,-3.875055159042843e299,-4.043535818131662e299,-4.212016477220482e299,-4.380497136309301e299,-4.54897779539812e299,-4.717458454486939e299,-4.885939113575759e299,-5.054419772664578e299,-5.222900431753397e299,-5.391381090842216e299,-5.559861749931036e299,-5.728342409019855e299,-5.896823068108674e299,-6.065303727197494e299,-6.233784386286313e299,-6.402265045375132e299,-6.570745704463951e299,-6.73922636355277e299,-6.90770702264159e299,-7.07618768173041e299,-7.244668340819228e299,-7.413148999908048e299,-7.581629658996866e299,-7.750110318085686e299,-7.918590977174506e299,-8.087071636263324e299,-8.255552295352144e299,-8.424032954440964e299,-8.592513613529782e299,-8.760994272618602e299,-8.929474931707421e299,-9.09795559079624e299,-9.26643624988506e299,-9.434916908973878e299,-9.603397568062698e299,-9.771878227151518e299,-9.940358886240336e299,-1.0108839545329156e300,-1.0277320204417975e300,-1.0445800863506794e300,-1.0614281522595614e300,-1.0782762181684432e300,-1.0951242840773252e300,-1.1119723499862072e300,-1.128820415895089e300,-1.145668481803971e300,-1.162516547712853e300,-1.1793646136217348e300,-1.1962126795306168e300,-1.2130607454394987e300,-1.2299088113483806e300,-1.2467568772572626e300,-1.2636049431661444e300,-1.2804530090750264e300,-1.2973010749839083e300,-1.3141491408927902e300,-1.3309972068016722e300,-1.347845272710554e300,-1.364693338619436e300,-1.381541404528318e300,-1.3983894704371998e300,-1.415237536346082e300,-1.4320856022549637e300,-1.4489336681638456e300,-1.4657817340727277e300,-1.4826297999816095e300,-1.4994778658904914e300,-1.5163259317993732e300,-1.5331739977082553e300,-1.5500220636171372e300,-1.566870129526019e300,-1.583718195434901e300,-1.600566261343783e300,-1.6174143272526648e300,-1.634262393161547e300,-1.6511104590704287e300,-1.6679585249793106e300,-1.6848065908881927e300,-1.7016546567970745e300,-1.7185027227059564e300,-1.7353507886148385e300,-1.7521988545237203e300,-1.7690469204326022e300,-1.7858949863414843e300,-1.802743052250366e300,-1.819591118159248e300,-1.8364391840681298e300,-1.853287249977012e300,-1.8701353158858938e300,-1.8869833817947756e300,-1.9038314477036577e300,-1.9206795136125395e300,-1.9375275795214214e300,-1.9543756454303035e300,-1.9712237113391853e300,-1.9880717772480672e300,-2.0049198431569493e300,-2.021767909065831e300,-2.038615974974713e300,-2.055464040883595e300,-2.072312106792477e300,-2.0891601727013588e300,-2.106008238610241e300,-2.1228563045191227e300,-2.1397043704280046e300,-2.1565524363368864e300,-2.1734005022457685e300,-2.1902485681546503e300,-2.2070966340635322e300,-2.2239446999724143e300,-2.240792765881296e300,-2.257640831790178e300,-2.27448889769906e300,-2.291336963607942e300,-2.3081850295168238e300,-2.325033095425706e300,-2.3418811613345877e300,-2.3587292272434696e300,-2.3755772931523517e300,-2.3924253590612335e300,-2.4092734249701154e300,-2.4261214908789975e300,-2.4429695567878793e300,-2.459817622696761e300,-2.476665688605643e300,-2.493513754514525e300,-2.510361820423407e300,-2.5272098863322888e300,-2.544057952241171e300,-2.5609060181500527e300,-2.5777540840589346e300,-2.5946021499678167e300,-2.6114502158766985e300,-2.6282982817855804e300,-2.6451463476944625e300,-2.6619944136033443e300,-2.678842479512226e300,-2.695690545421108e300,-2.71253861132999e300,-2.729386677238872e300,-2.746234743147754e300,-2.763082809056636e300,-2.779930874965518e300,-2.7967789408743996e300,-2.8136270067832814e300,-2.830475072692164e300,-2.8473231386010457e300,-2.8641712045099275e300,-2.8810192704188093e300,-2.897867336327691e300,-2.914715402236573e300,-2.9315634681454554e300,-2.948411534054337e300,-2.965259599963219e300,-2.982107665872101e300,-2.998955731780983e300,-3.0158037976898646e300,-3.0326518635987464e300,-3.049499929507629e300,-3.0663479954165107e300,-3.0831960613253925e300,-3.1000441272342743e300,-3.116892193143156e300,-3.133740259052038e300,-3.1505883249609204e300,-3.167436390869802e300,-3.184284456778684e300,-3.201132522687566e300,-3.217980588596448e300,-3.2348286545053296e300,-3.251676720414212e300,-3.268524786323094e300,-3.2853728522319757e300,-3.3022209181408575e300,-3.3190689840497393e300,-3.335917049958621e300,-3.352765115867503e300,-3.3696131817763854e300,-3.386461247685267e300,-3.403309313594149e300,-3.420157379503031e300,-3.437005445411913e300,-3.4538535113207946e300,-3.470701577229677e300,-3.487549643138559e300,-3.5043977090474407e300,-3.5212457749563225e300,-3.5380938408652043e300,-3.554941906774086e300,-3.5717899726829686e300,-3.5886380385918504e300,-3.605486104500732e300,-3.622334170409614e300,-3.639182236318496e300,-3.656030302227378e300,-3.6728783681362596e300,-3.689726434045142e300,-3.706574499954024e300,-3.7234225658629057e300,-3.7402706317717875e300,-3.7571186976806693e300,-3.773966763589551e300,-3.7908148294984336e300,-3.8076628954073154e300,-3.824510961316197e300,-3.841359027225079e300,-3.858207093133961e300,-3.875055159042843e300,-3.891903224951725e300,-3.908751290860607e300,-3.925599356769489e300,-3.9424474226783707e300,-3.9592954885872525e300,-3.9761435544961343e300,-3.992991620405016e300,-4.0098396863138986e300,-4.0266877522227804e300,-4.043535818131662e300,-4.060383884040544e300,-4.077231949949426e300,-4.094080015858308e300,-4.11092808176719e300,-4.127776147676072e300,-4.144624213584954e300,-4.1614722794938357e300,-4.1783203454027175e300,-4.1951684113115994e300,-4.212016477220482e300,-4.2288645431293636e300,-4.2457126090382454e300,-4.262560674947127e300,-4.279408740856009e300,-4.296256806764891e300,-4.313104872673773e300,-4.329952938582655e300,-4.346801004491537e300,-4.363649070400419e300,-4.3804971363093007e300,-4.3973452022181825e300,-4.4141932681270644e300,-4.431041334035947e300,-4.4478893999448286e300,-4.4647374658537104e300,-4.481585531762592e300,-4.498433597671474e300,-4.515281663580356e300,-4.5321297294892384e300,-4.54897779539812e300,-4.565825861307002e300,-4.582673927215884e300,-4.5995219931247657e300,-4.6163700590336475e300,-4.6332181249425294e300,-4.650066190851412e300,-4.6669142567602936e300,-4.6837623226691755e300,-4.700610388578057e300,-4.717458454486939e300,-4.734306520395821e300,-4.7511545863047034e300,-4.768002652213585e300,-4.784850718122467e300,-4.801698784031349e300,-4.8185468499402307e300,-4.8353949158491125e300,-4.852242981757995e300,-4.869091047666877e300,-4.8859391135757586e300,-4.9027871794846405e300,-4.919635245393522e300,-4.936483311302404e300,-4.953331377211286e300,-4.9701794431201684e300,-4.98702750902905e300,-5.003875574937932e300,-5.020723640846814e300,-5.037571706755696e300,-5.0544197726645775e300,-5.07126783857346e300,-5.088115904482342e300,-5.1049639703912236e300,-5.1218120363001055e300,-5.138660102208987e300,-5.155508168117869e300,-5.1723562340267516e300,-5.1892042999356334e300,-5.206052365844515e300,-5.222900431753397e300,-5.239748497662279e300,-5.256596563571161e300,-5.273444629480043e300,-5.290292695388925e300,-5.307140761297807e300,-5.3239888272066886e300,-5.3408368931155705e300,-5.357684959024452e300,-5.374533024933334e300,-5.391381090842216e300,-5.408229156751098e300,-5.42507722265998e300,-5.441925288568863e300,-5.458773354477744e300,-5.475621420386626e300,-5.492469486295508e300,-5.50931755220439e300,-5.526165618113272e300,-5.543013684022154e300,-5.559861749931035e300,-5.576709815839917e300,-5.593557881748799e300,-5.610405947657681e300,-5.627254013566563e300,-5.644102079475445e300,-5.660950145384328e300,-5.67779821129321e300,-5.694646277202091e300,-5.711494343110973e300,-5.728342409019855e300,-5.745190474928737e300,-5.762038540837619e300,-5.7788866067465e300,-5.795734672655382e300,-5.812582738564264e300,-5.829430804473146e300,-5.846278870382028e300,-5.863126936290911e300,-5.879975002199793e300,-5.896823068108674e300,-5.913671134017556e300,-5.930519199926438e300,-5.94736726583532e300,-5.964215331744202e300,-5.981063397653084e300,-5.997911463561965e300,-6.014759529470847e300,-6.031607595379729e300,-6.048455661288611e300,-6.065303727197493e300,-6.082151793106376e300,-6.098999859015258e300,-6.11584792492414e300,-6.132695990833021e300,-6.149544056741903e300,-6.166392122650785e300,-6.183240188559667e300,-6.200088254468549e300,-6.21693632037743e300,-6.233784386286312e300,-6.250632452195194e300,-6.267480518104076e300,-6.284328584012958e300,-6.301176649921841e300,-6.318024715830723e300,-6.334872781739604e300,-6.351720847648486e300,-6.368568913557368e300,-6.38541697946625e300,-6.402265045375132e300,-6.419113111284014e300,-6.435961177192895e300,-6.452809243101777e300,-6.469657309010659e300,-6.486505374919541e300,-6.503353440828424e300,-6.520201506737306e300,-6.537049572646188e300,-6.55389763855507e300,-6.570745704463951e300,-6.587593770372833e300,-6.604441836281715e300,-6.621289902190597e300,-6.638137968099479e300,-6.65498603400836e300,-6.671834099917242e300,-6.688682165826124e300,-6.705530231735006e300,-6.722378297643889e300,-6.739226363552771e300,-6.756074429461653e300,-6.772922495370535e300,-6.789770561279416e300,-6.806618627188298e300,-6.82346669309718e300,-6.840314759006062e300,-6.857162824914944e300,-6.874010890823826e300,-6.890858956732707e300,-6.907707022641589e300,-6.924555088550472e300,-6.941403154459354e300,-6.958251220368236e300,-6.975099286277118e300,-6.991947352186e300,-7.008795418094881e300,-7.025643484003763e300,-7.042491549912645e300,-7.059339615821527e300,-7.076187681730409e300,-7.09303574763929e300,-7.109883813548172e300,-7.126731879457054e300,-7.143579945365937e300,-7.160428011274819e300,-7.177276077183701e300,-7.194124143092583e300,-7.210972209001465e300,-7.227820274910346e300,-7.244668340819228e300,-7.26151640672811e300,-7.278364472636992e300,-7.295212538545874e300,-7.312060604454756e300,-7.328908670363637e300,-7.345756736272519e300,-7.362604802181402e300,-7.379452868090284e300,-7.396300933999166e300,-7.413148999908048e300,-7.42999706581693e300,-7.446845131725811e300,-7.463693197634693e300,-7.480541263543575e300,-7.497389329452457e300,-7.514237395361339e300,-7.53108546127022e300,-7.547933527179102e300,-7.564781593087985e300,-7.581629658996867e300,-7.598477724905749e300,-7.615325790814631e300,-7.632173856723513e300,-7.649021922632395e300,-7.665869988541276e300,-7.682718054450158e300,-7.69956612035904e300,-7.716414186267922e300,-7.733262252176804e300,-7.750110318085686e300,-7.766958383994567e300,-7.78380644990345e300,-7.800654515812332e300,-7.817502581721214e300,-7.834350647630096e300,-7.851198713538978e300,-7.86804677944786e300,-7.884894845356741e300,-7.901742911265623e300,-7.918590977174505e300,-7.935439043083387e300,-7.952287108992269e300,-7.96913517490115e300,-7.985983240810032e300,-8.002831306718915e300,-8.019679372627797e300,-8.036527438536679e300,-8.053375504445561e300,-8.070223570354443e300,-8.087071636263325e300,-8.103919702172206e300,-8.120767768081088e300,-8.13761583398997e300,-8.154463899898852e300,-8.171311965807734e300,-8.188160031716616e300,-8.205008097625499e300,-8.22185616353438e300,-8.238704229443262e300,-8.255552295352144e300,-8.272400361261026e300,-8.289248427169908e300,-8.30609649307879e300,-8.322944558987671e300,-8.339792624896553e300,-8.356640690805435e300,-8.373488756714317e300,-8.390336822623199e300,-8.40718488853208e300,-8.424032954440964e300,-8.440881020349845e300,-8.457729086258727e300,-8.474577152167609e300,-8.491425218076491e300,-8.508273283985373e300,-8.525121349894255e300,-8.541969415803136e300,-8.558817481712018e300,-8.5756655476209e300,-8.592513613529782e300,-8.609361679438664e300,-8.626209745347546e300,-8.643057811256429e300,-8.65990587716531e300,-8.676753943074192e300,-8.693602008983074e300,-8.710450074891956e300,-8.727298140800838e300,-8.74414620670972e300,-8.760994272618601e300,-8.777842338527483e300,-8.794690404436365e300,-8.811538470345247e300,-8.828386536254129e300,-8.845234602163012e300,-8.862082668071894e300,-8.878930733980775e300,-8.895778799889657e300,-8.912626865798539e300,-8.929474931707421e300,-8.946322997616303e300,-8.963171063525185e300,-8.980019129434066e300,-8.996867195342948e300,-9.01371526125183e300,-9.030563327160712e300,-9.047411393069594e300,-9.064259458978477e300,-9.081107524887359e300,-9.09795559079624e300,-9.114803656705122e300,-9.131651722614004e300,-9.148499788522886e300,-9.165347854431768e300,-9.18219592034065e300,-9.199043986249531e300,-9.215892052158413e300,-9.232740118067295e300,-9.249588183976177e300,-9.266436249885059e300,-9.283284315793942e300,-9.300132381702824e300,-9.316980447611705e300,-9.333828513520587e300,-9.350676579429469e300,-9.367524645338351e300,-9.384372711247233e300,-9.401220777156115e300,-9.418068843064996e300,-9.434916908973878e300,-9.45176497488276e300,-9.468613040791642e300,-9.485461106700525e300,-9.502309172609407e300,-9.519157238518289e300,-9.53600530442717e300,-9.552853370336052e300,-9.569701436244934e300,-9.586549502153816e300,-9.603397568062698e300,-9.62024563397158e300,-9.637093699880461e300,-9.653941765789343e300,-9.670789831698225e300,-9.687637897607107e300,-9.70448596351599e300,-9.721334029424872e300,-9.738182095333754e300,-9.755030161242635e300,-9.771878227151517e300,-9.788726293060399e300,-9.805574358969281e300,-9.822422424878163e300,-9.839270490787045e300,-9.856118556695926e300,-9.872966622604808e300,-9.88981468851369e300,-9.906662754422572e300,-9.923510820331455e300,-9.940358886240337e300,-9.957206952149219e300,-9.9740550180581e300,-9.990903083966982e300,-1.0007751149875864e301,-1.0024599215784746e301,-1.0041447281693628e301,-1.005829534760251e301,-1.0075143413511391e301,-1.0091991479420273e301,-1.0108839545329155e301,-1.0125687611238038e301,-1.014253567714692e301,-1.0159383743055802e301,-1.0176231808964684e301,-1.0193079874873565e301,-1.0209927940782447e301,-1.0226776006691329e301,-1.0243624072600211e301,-1.0260472138509093e301,-1.0277320204417975e301,-1.0294168270326856e301,-1.0311016336235738e301,-1.032786440214462e301,-1.0344712468053503e301,-1.0361560533962385e301,-1.0378408599871267e301,-1.0395256665780149e301,-1.041210473168903e301,-1.0428952797597912e301,-1.0445800863506794e301,-1.0462648929415676e301,-1.0479496995324558e301,-1.049634506123344e301,-1.0513193127142321e301,-1.0530041193051203e301,-1.0546889258960086e301,-1.0563737324868968e301,-1.058058539077785e301,-1.0597433456686732e301,-1.0614281522595614e301,-1.0631129588504495e301,-1.0647977654413377e301,-1.0664825720322259e301,-1.0681673786231141e301,-1.0698521852140023e301,-1.0715369918048905e301,-1.0732217983957788e301,-1.0749066049866668e301,-1.0765914115775551e301,-1.0782762181684432e301,-1.0799610247593315e301,-1.0816458313502196e301,-1.0833306379411079e301,-1.085015444531996e301,-1.0867002511228842e301,-1.0883850577137725e301,-1.0900698643046606e301,-1.091754670895549e301,-1.093439477486437e301,-1.0951242840773253e301,-1.0968090906682133e301,-1.0984938972591016e301,-1.1001787038499897e301,-1.101863510440878e301,-1.103548317031766e301,-1.1052331236226544e301,-1.1069179302135424e301,-1.1086027368044307e301,-1.110287543395319e301,-1.111972349986207e301,-1.1136571565770954e301,-1.1153419631679835e301,-1.1170267697588718e301,-1.1187115763497598e301,-1.1203963829406481e301,-1.1220811895315362e301,-1.1237659961224245e301,-1.1254508027133126e301,-1.1271356093042009e301,-1.128820415895089e301,-1.1305052224859772e301,-1.1321900290768655e301,-1.1338748356677536e301,-1.135559642258642e301,-1.13724444884953e301,-1.1389292554404183e301,-1.1406140620313063e301,-1.1422988686221946e301,-1.1439836752130827e301,-1.145668481803971e301,-1.147353288394859e301,-1.1490380949857474e301,-1.1507229015766357e301,-1.1524077081675237e301,-1.154092514758412e301,-1.1557773213493e301,-1.1574621279401884e301,-1.1591469345310765e301,-1.1608317411219648e301,-1.1625165477128528e301,-1.1642013543037411e301,-1.1658861608946292e301,-1.1675709674855175e301,-1.1692557740764056e301,-1.1709405806672939e301,-1.1726253872581822e301,-1.1743101938490702e301,-1.1759950004399585e301,-1.1776798070308466e301,-1.179364613621735e301,-1.181049420212623e301,-1.1827342268035113e301,-1.1844190333943993e301,-1.1861038399852876e301,-1.1877886465761757e301,-1.189473453167064e301,-1.191158259757952e301,-1.1928430663488404e301,-1.1945278729397287e301,-1.1962126795306167e301,-1.197897486121505e301,-1.199582292712393e301,-1.2012670993032814e301,-1.2029519058941695e301,-1.2046367124850578e301,-1.2063215190759458e301,-1.2080063256668341e301,-1.2096911322577222e301,-1.2113759388486105e301,-1.2130607454394986e301,-1.2147455520303869e301,-1.2164303586212752e301,-1.2181151652121632e301,-1.2197999718030515e301,-1.2214847783939396e301,-1.223169584984828e301,-1.224854391575716e301,-1.2265391981666043e301,-1.2282240047574923e301,-1.2299088113483806e301,-1.2315936179392687e301,-1.233278424530157e301,-1.234963231121045e301,-1.2366480377119334e301,-1.2383328443028217e301,-1.2400176508937097e301,-1.241702457484598e301,-1.243387264075486e301,-1.2450720706663744e301,-1.2467568772572625e301,-1.2484416838481508e301,-1.2501264904390388e301,-1.2518112970299271e301,-1.2534961036208152e301,-1.2551809102117035e301,-1.2568657168025916e301,-1.2585505233934799e301,-1.2602353299843682e301,-1.2619201365752562e301,-1.2636049431661445e301,-1.2652897497570326e301,-1.266974556347921e301,-1.268659362938809e301,-1.2703441695296973e301,-1.2720289761205853e301,-1.2737137827114736e301,-1.2753985893023617e301,-1.27708339589325e301,-1.2787682024841383e301,-1.2804530090750264e301,-1.2821378156659147e301,-1.2838226222568027e301,-1.285507428847691e301,-1.287192235438579e301,-1.2888770420294674e301,-1.2905618486203555e301,-1.2922466552112438e301,-1.2939314618021318e301,-1.2956162683930201e301,-1.2973010749839082e301,-1.2989858815747965e301,-1.3006706881656848e301,-1.3023554947565729e301,-1.3040403013474612e301,-1.3057251079383492e301,-1.3074099145292375e301,-1.3090947211201256e301,-1.310779527711014e301,-1.312464334301902e301,-1.3141491408927903e301,-1.3158339474836783e301,-1.3175187540745666e301,-1.3192035606654547e301,-1.320888367256343e301,-1.3225731738472313e301,-1.3242579804381194e301,-1.3259427870290077e301,-1.3276275936198957e301,-1.329312400210784e301,-1.330997206801672e301,-1.3326820133925604e301,-1.3343668199834485e301,-1.3360516265743368e301,-1.3377364331652248e301,-1.3394212397561131e301,-1.3411060463470012e301,-1.3427908529378895e301,-1.3444756595287778e301,-1.3461604661196659e301,-1.3478452727105542e301,-1.3495300793014422e301,-1.3512148858923305e301,-1.3528996924832186e301,-1.354584499074107e301,-1.356269305664995e301,-1.3579541122558833e301,-1.3596389188467713e301,-1.3613237254376596e301,-1.3630085320285477e301,-1.364693338619436e301,-1.3663781452103243e301,-1.3680629518012124e301,-1.3697477583921007e301,-1.3714325649829887e301,-1.373117371573877e301,-1.374802178164765e301,-1.3764869847556534e301,-1.3781717913465415e301,-1.3798565979374298e301,-1.3815414045283178e301,-1.3832262111192061e301,-1.3849110177100944e301,-1.3865958243009825e301,-1.3882806308918708e301,-1.3899654374827589e301,-1.3916502440736472e301,-1.3933350506645352e301,-1.3950198572554235e301,-1.3967046638463116e301,-1.3983894704372e301,-1.400074277028088e301,-1.4017590836189763e301,-1.4034438902098643e301,-1.4051286968007526e301,-1.406813503391641e301,-1.408498309982529e301,-1.4101831165734173e301,-1.4118679231643054e301,-1.4135527297551937e301,-1.4152375363460817e301,-1.41692234293697e301,-1.418607149527858e301,-1.4202919561187464e301,-1.4219767627096345e301,-1.4236615693005228e301,-1.4253463758914108e301,-1.4270311824822991e301,-1.4287159890731874e301,-1.4304007956640755e301,-1.4320856022549638e301,-1.4337704088458519e301,-1.4354552154367402e301,-1.4371400220276282e301,-1.4388248286185165e301,-1.4405096352094046e301,-1.442194441800293e301,-1.443879248391181e301,-1.4455640549820693e301,-1.4472488615729573e301,-1.4489336681638456e301,-1.450618474754734e301,-1.452303281345622e301,-1.4539880879365103e301,-1.4556728945273984e301,-1.4573577011182867e301,-1.4590425077091747e301,-1.460727314300063e301,-1.462412120890951e301,-1.4640969274818394e301,-1.4657817340727275e301,-1.4674665406636158e301,-1.4691513472545038e301,-1.4708361538453921e301,-1.4725209604362804e301,-1.4742057670271685e301,-1.4758905736180568e301,-1.4775753802089449e301,-1.4792601867998332e301,-1.4809449933907212e301,-1.4826297999816095e301,-1.4843146065724976e301,-1.485999413163386e301,-1.487684219754274e301,-1.4893690263451623e301,-1.4910538329360503e301,-1.4927386395269386e301,-1.494423446117827e301,-1.496108252708715e301,-1.4977930592996033e301,-1.4994778658904914e301,-1.5011626724813797e301,-1.5028474790722677e301,-1.504532285663156e301,-1.506217092254044e301,-1.5079018988449324e301,-1.5095867054358205e301,-1.5112715120267088e301,-1.512956318617597e301,-1.5146411252084851e301,-1.5163259317993734e301,-1.5180107383902615e301,-1.5196955449811498e301,-1.5213803515720379e301,-1.5230651581629262e301,-1.5247499647538142e301,-1.5264347713447025e301,-1.5281195779355906e301,-1.529804384526479e301,-1.531489191117367e301,-1.5331739977082553e301,-1.5348588042991436e301,-1.5365436108900316e301,-1.53822841748092e301,-1.539913224071808e301,-1.5415980306626963e301,-1.5432828372535844e301,-1.5449676438444727e301,-1.5466524504353607e301,-1.548337257026249e301,-1.550022063617137e301,-1.5517068702080254e301,-1.5533916767989135e301,-1.5550764833898018e301,-1.55676128998069e301,-1.5584460965715781e301,-1.5601309031624664e301,-1.5618157097533545e301,-1.5635005163442428e301,-1.5651853229351309e301,-1.5668701295260192e301,-1.5685549361169072e301,-1.5702397427077955e301,-1.5719245492986836e301,-1.573609355889572e301,-1.57529416248046e301,-1.5769789690713483e301,-1.5786637756622366e301,-1.5803485822531246e301,-1.582033388844013e301,-1.583718195434901e301,-1.5854030020257893e301,-1.5870878086166774e301,-1.5887726152075657e301,-1.5904574217984537e301,-1.592142228389342e301,-1.59382703498023e301,-1.5955118415711184e301,-1.5971966481620065e301,-1.5988814547528948e301,-1.600566261343783e301,-1.6022510679346711e301,-1.6039358745255594e301,-1.6056206811164475e301,-1.6073054877073358e301,-1.6089902942982239e301,-1.6106751008891122e301,-1.6123599074800002e301,-1.6140447140708885e301,-1.6157295206617766e301,-1.617414327252665e301,-1.619099133843553e301,-1.6207839404344413e301,-1.6224687470253296e301,-1.6241535536162176e301,-1.625838360207106e301,-1.627523166797994e301,-1.6292079733888823e301,-1.6308927799797704e301,-1.6325775865706587e301,-1.6342623931615467e301,-1.635947199752435e301,-1.637632006343323e301,-1.6393168129342114e301,-1.6410016195250997e301,-1.6426864261159878e301,-1.644371232706876e301,-1.6460560392977641e301,-1.6477408458886524e301,-1.6494256524795405e301,-1.6511104590704288e301,-1.6527952656613169e301,-1.6544800722522052e301,-1.6561648788430932e301,-1.6578496854339815e301,-1.6595344920248696e301,-1.661219298615758e301,-1.6629041052066462e301,-1.6645889117975343e301,-1.6662737183884226e301,-1.6679585249793106e301,-1.669643331570199e301,-1.671328138161087e301,-1.6730129447519753e301,-1.6746977513428634e301,-1.6763825579337517e301,-1.6780673645246397e301,-1.679752171115528e301,-1.681436977706416e301,-1.6831217842973044e301]}
},{}],70:[function(require,module,exports){
module.exports={"expected":[-1.5574683526225443e10,1.5266158596448172,0.6577523114808093,0.4498482922468493,-0.9064189634495002,-1.2483939543969444,1.9035463983145644,-2.6793596970093416,0.9675956749033368,-0.411227108451193,0.48401096008484445,0.4626083914114479,3.2722704624506247,-1.6519623034609958,-1.719111057695166,-0.20585851514141912,0.7412843228219872,0.7145348012005649,9.099251940616861,-1.1141388751054946,-1.1541115511302351,-0.015898741736300407,1.0825680705525604,-10.47794484991269,1.0093554008615164,-16.596814079979634,-0.791757050728729,0.17292080399101564,1.599831202205694,-3.448045227834873,1.481904354294578,-3.960821496748582,-0.5238812267893672,0.37452308820218794,2.5666368273829483,-1.9715635955223176,2.3230567483296087,-2.155203327554429,-0.30435195081627536,0.6068997914617474,5.361480986850927,0.5600243273797829,-0.07348089577059279,-1.3961438702400901,-26.513546102483502,0.8996150525307488,-0.14427906608248217,-0.8897912153031716,31.004225773721796,1.4123591037791021,0.07896882079000257,-1.0236559975121662,-5.203794705436451,1.2214492244916226,0.31032354568217646,-0.6480338822353284,-8.299449626128203,1.9985186670066177,0.23515583166379245,-0.3683141753949445,-2.809011850566683,4.0538874890401155,0.4868287204622535,-0.44998021278751327,-1.5805779134840945,3.1026802884053275,0.800672247186299,-0.20348256810842266,-1.8561627723065075,11.11908395645618,0.6918120388792479,0.02135685835354788,-1.1488076238108473,-7.508605740712043,1.0875333018386406,-0.04862584886912827,-0.7328638861255801,-15.98937174087361,1.7408968008221746,0.17527034205608072,-0.43504494491915563,-3.4188821258471065,1.4892173928552517,0.10393865676289447,-0.19050821368012416,-1.80189777794627,2.5840416939554327,0.3376854302427932,-0.6134221682313229,-1.1202433001111203,6.7468597892704025,0.6100244815168185,-0.34044215108097153,-2.6031456401885102,-13.317286341849243,0.9693839218255969,-0.10643848882712101,-1.4972026594904628,3.387772421385277,1.5301696080889131,0.1165801741725413,-0.950140022697298,15.378918577089001,0.7290703387799844,0.35165881050433034,-0.5963628148490014,-6.310351720948136,1.1430883139985784,0.6272942024851327,-0.3265633728734504,-2.5090760329777018,1.845221973455762,0.20090901066138425,-0.09382358480236748,-1.4574575674922798,3.550497859252417,0.44701040511062196,-0.4898908680719102,-0.9266528795350528,19.050785162250044,0.7483753765459743,-0.23776655222310322,-2.010927733277162,-5.837745746192761,1.172316075176054,-0.011337049442017213,-1.2276291524315228,5.135250692626817,1.901537136220758,0.21393603084447962,-0.7843637636149751,-33.58092071238142,0.8853709292992188,0.46208048147931396,-0.4744973321447594,-3.886059762057703,1.3888770763491376,0.7680447209939545,-0.22460934805509242,-1.949472975233209,2.3525431908771393,0.3016524773437044,0.0011529589645685374,-1.1967882685723095,5.500546833148305,0.5660309528858759,-0.37734498866676414,-0.7643850355408004,-23.649208419999685,0.9079010657952024,-0.13962631642602147,-1.6086668412628915,-3.6942592826728102,1.4261063615976008,0.0835597864504793,-1.0143593248629708,10.21094261658691,2.436630505098887,0.31533071778992444,-0.6415767687202613,-1.166855829864589,1.070374730465059,0.5826402887163258,-1.3476356636639022,-2.76897613597453,-18.246900118089922,0.16710926184520947,-0.12691481082871017,64.88913070030807,3.15184263837693,1.4646859787647357,-0.5311011065005158,-0.9893347546569238,1.2642802121455945,0.6985771049380906,0.32911712872128923,-2.1874804807915837,-7.255572168889739,6.405870569714953,-0.04405520825201917,-0.3490698296807179,4.368874684509996,1.7594275333587233,0.9545372850813012,-0.8385751484149272,-1.522491651086661,0.8286762368439661,0.42298695267503894,0.10877110646552415,-4.4892626982485515,13.741576993791753,0.038204992889071476,-0.2592151441612186,-0.6068649029259122,2.1541196473131365,1.1254564919247596,-0.7073032587687983,-1.2795687842102832,-2.5664433737589465,0.5236364872418224,0.19289887455014015,-3.2168996323659886,-104.49697605137271,3.4483738958159877,-0.17311860781273639,-0.49948906615965355,2.7191617728316313,1.3313168675211975,0.7364142929432319,-1.082985290797085,-2.0504347724431407,0.633363136659322,0.27974420063384403,-0.019049999199461907,-10.864709035909595,4.932226312781813,-0.08944382218641297,-0.40060244438801046,-0.7968950293031722,1.587907691564018,0.8717081906648864,-0.9186123858506606,-1.683587759077915,-4.014058374068213,0.37068766707877915,0.06324960706418116,-5.689153037849208,8.447960611587682,2.3030519430351513,-0.30803554935147276,-0.6704708359405572,1.9217521480745594,1.027941868876866,0.5558932912575673,-1.4061233395832726,-2.954460125903065,-28.933377365681476,0.1464115488405501,-0.1474964098945272,28.069863857719383,2.9441611113396298,1.402966498016993,-0.5572841951913896,-1.0301282862428056,1.213091113547183,0.6689326326707482,0.3068732389951652,-2.309762804253894,-8.525505964983068,0.2316045497258695,-0.0643158554578257,-0.3718959901502729,3.995963081239291,1.6795230954360947,-0.45403614841509843,-0.873578783889842,-1.5916535370464397,0.7951601999971727,0.3993706191507116,-1.8712282244647724,-4.959263234406046,10.739736916161029,0.0179877067940957,-0.28088957255296315,6.080418221048864,2.0449202036703498,1.0806805224384808,-0.7380533934891677,-1.334265131180496,0.9390884630018519,0.49816290123580625,0.17202505427906326,-3.4621138310072426,94.05841043006005,0.10053560645218884,-0.19400054307449524,-0.524990344264011,2.5584088105444436,1.276771964433266,-0.618066901906071,-1.12786639486642,-2.160122902520536,0.605412817843634,0.2580821738904453,-2.6295669753760262,-13.946149114396228,4.466905796540501,-0.1098457229496013,-0.4242394418758203,3.3462256824450196,1.5189738800733692,0.8367680721832514,-0.9565688399541049,-1.763784893363261,-4.390305137908144,0.3478789468866777,0.04299126845200276,-6.450814659380722,7.199042346152383,2.1813513866351606,-0.33029449479111794,-0.7001584382577529,1.8304787061914083,0.987235633626484,0.529740408940848,-1.4680312711022145,-3.1634928774736446,0.44297566190512405,0.12583592284174794,-0.16820103899925942,17.899010782832935,2.759799143021146,-0.24132765646539572,-0.5840635904257702,-1.0726559056030667,1.1643511334998926,0.6400787490017805,-1.2361076730983753,-2.4440163930571983,-10.32395014250674,5.056169989169264,-3.035669836036647,-37.866871329095964,3.678765412907707,1.604863342035928,0.8801528009742755,2.8672456407819267,1.3790586161435279,0.7627040031982959,0.37613233887778463,0.06804860072690504,0.6572048423766894,0.2979818930330836,-0.002214890195172255,-0.3028114064603223,-0.6635664772261564,-0.07250025745941142,-0.38119728880889314,-0.7697344515456844,-1.391992037465697,-2.908618772167726,-0.8880450042008645,-1.620815892322627,-3.7442116474816287,32.423615240224485,2.9910185610249034,-5.176543137656372,9.868216634008318,2.4134572740281683,1.224970286000398,0.6758714462105911,2.0033996132281193,1.063174267849637,0.5781379799260532,0.23664487298414671,-0.059519136436686965,0.48803591733175555,0.16364930222104943,-0.13033837925663672,-0.4482851314869771,-0.865188771176772,-0.20246693961962914,-0.5354266674751479,-0.9960212943444855,-1.8499087868415443,-4.839793898989079,-1.1465473668874457,-2.2071083776927067,-7.440760478140905,6.2672917774155,2.0699249063081373,-15.742859626397063,4.302205260510823,1.7457154358650857,0.9481214578438698,0.5041414042169323,0.17694893501458026,0.8230114662621106,0.41902217273415265,0.10536465093480868,-0.18904686624391714,-0.5189101645667787,0.03483265324688216,-0.2628124371092846,-0.6114825298823934,-1.1170676130548296,-2.133324323551481,-0.7123680461499157,-1.2884892649008999,-2.592216840637203,-13.070353731549865,4.5692130884605255,-3.255538187452693,-161.2487807967098,3.4054563189028357,1.5348930303481385,0.8449248766562629,2.6911490446980917,1.3220214807629111,0.731232876307396,0.35324457744445475,0.047779510914315586,0.6286543108760935,0.276116203119385,-0.02241929532977207,-0.32500311912934104,-0.6930612665540731,-0.09283964641118245,-0.404516063915819,-0.8024164356504526,-1.4530598032958535,-3.111676726744311,-0.9248414773437779,-1.6965753417063973,-4.072481199629011,19.578304308378055,2.801522647156727,-5.803721701982538,8.210977872981331,2.2819842139174984,1.1756707185270872,0.6468355677127265,1.9060479896078208,1.0210392121635865,0.5514929452067392,0.21541158152316545,-0.07981851923970869,0.46326473175365057,0.14297319196150565,-0.15093924626168526,-0.4727703600273048,-0.9011439498748833,-0.22358492033019642,-0.5617062936001327,-1.0370941612669273,-1.9427202925790419,-5.3867115824300065,-1.1944184659774004,-2.3312654655321823,-8.780999965131715,5.544979644630332,1.9674439340021175,-23.11500618140801,3.939577044570066,1.6667275683745917,0.9104776035332981,0.47905861241427955,1.429069758999954,0.7896775963340525,0.3954708438361917,0.08498034928376257,-0.21005254068800702,0.3164034810668124,0.014618963416574262,-0.2845265913664943,-0.6395874121490227,-1.1635302235438298,-0.3620395997630131,-0.7432687638290882,-1.343670929019067,-2.7567981699043917,-17.787668714722564,-1.561378559899232,-3.506365585161098,71.42831368510949,3.1673345876302776,1.4691317631706253,11.854362920225764,2.533213877741767,1.2679519306555282,0.7006780826358371,0.3306811891480867,1.0996908223823387,0.6008199217547117,0.25449311477355235,-0.04264201176875715,-0.3474881870740459,0.1809822958523682,-0.1132554789819396,-0.4282191297490666,-0.8361755321064966,-1.517821513755531,-0.5139596492791628,-0.9630392130851763,-1.7777126784492425,-4.459612483476464,14.014635105656742,-2.1118089927769224,-6.597516372255397,7.025342593898604,2.1620997040571615,1.128658794385067,0.6185487975769834,1.8159161035171278,0.9806073845860017,0.525435127441776,0.19436230577171293,-0.10018347758796602,0.4389529394635835,0.12241618540956442,-0.17166614171032954,-0.49772784407787213,-0.9384326187624071,-0.24489455404263533,-0.5885892285640333,-1.0799250493168753,-2.0431150592801894,-6.067208694140617,-1.2446570816273692,-2.467696103164146,-10.699329355169246,4.968201307540498,1.8727985491973118,-43.40578982720014,3.63041827502799,1.5928860126950743,0.8741936327109909,0.4544566996729372,1.3693309374573785,0.7573906522808997,0.3722928753143469,0.06466592295933063,-0.23123726171567469,0.2943186686441478,-0.005582789599792527,-0.30649183248191775,-0.6684281365212378,-1.2122298380291379,-0.3850594929724184,-0.7751116748198282,-1.4019321970857053,-2.940794102863492,-27.797498697995426,-1.6330983068710565,-3.7954398970299987,29.228545085997485,2.9578552656591874,1.4071617469054656,9.5475387142528,2.3906577180826187,1.216583382250427,0.6709762861303198,0.3084172868237852,1.0560251854977312,0.5736531698334708,0.23309124470185993,-0.06289960254706975,-0.3702911974136618,0.1601931543927225,-0.13376495463137295,-0.4523359081606304,-0.8710948536210389,-1.5866807310871662,-0.5397678566878155,-1.0027528444513125,-1.8648953710615557,-4.92341208097962,10.906366921117332,-2.2270302570617035,-7.635468777163857,6.134442119664195,2.0522503747567193,1.0837430731060382,4.237440218792786,1.7321636316091182,0.9417464734358325,0.49992473597558457,0.17347769515731518,0.8173780119368312,0.41506856727477476,0.10196061212951113,-0.19253730922716603,-0.5231923614725039,0.03146110473979837,-0.2664161037340044,-0.6161192150413827,-1.1246666069817517,-2.1521548389415743,-0.7174571943888535,-1.2974875029499218,-2.618444286801867,-13.675714110214845,4.49664873263322,-3.2950334161549715,-352.8979569066049,3.3635120305710946,1.5236489718198427,0.8391690904072852,2.6636395371944497,1.3128085002943082,0.7260769174055247,0.3494609738296099,0.04440450782068858,0.6239653821905988,0.27249494683172765,-0.02578910029589538,-0.3287307938731743,-0.6980584847973129,-0.09623759484976666,-0.408440361450041,-0.8079677652296934,-1.4635900297323619,-3.148034998433345,-63.45337212801478,-1.7097121947737859,-4.132528912288911,18.364066053853183,2.772000603927479,1.3486178747271587,7.986749200567315,2.261237842812248,1.167679443639931,0.642068994631609,0.2864291225955938,1.0141838653012902,0.5471089148156963,0.2118900027432343,-0.08320874495996591,-0.39343796455820557,0.1395381447184712,-0.15438558468512736,-0.476897545182922,-0.9072652894211103,-1.6601009062092622,-0.5661451547015587,-1.0441088674640846,-1.9589048842113272,-5.489671291304245,8.920557012562831,-2.3531084495306267,-9.052066009122699,5.440021011653709,1.9511476328691233,1.0407520951047813,3.884667668220082,1.6540748897610016,0.9043367246619027,0.4749245108473491,0.15273896766648823,-0.14117851858857958,-0.461129764761068,1.2263223224339237,0.6766588983021048,0.31270240702163404,0.011250551740115551,-0.28817058717652927,-0.6443432105908062,-1.171488681881484,-2.271107942785033,-8.092329335807332,5.8653645056571175,-0.4476363654371562,-0.8642444050765902,-1.573018134936906,-3.551674961378739,57.57474266974147,3.130572498633359,1.458547266144406,0.8053123659496979,0.40656454460519853,0.09461426391489539,-0.200093782559563,2.0727835639983856,1.0922776028129915,0.596245575361268,0.25091020272883974,-0.04601647805796244,-0.3512671295198036,-0.7285365514332742,-1.3171989666135802,-2.676717827882152,-15.194992701439526,-0.18848727518508207,-0.5182245241483237,-0.9695516945352873,-1.7918082416597279,-4.531033475872042,13.379752335639983,2.6058590810086018,1.2931796354064715,0.7150232590617716,0.34131694050850664,-12.978156473436766,4.581063687520021,1.8015305405043862,0.9740227716325548,0.5211450561995922,0.19086950777119557,-0.10358628574446105,-0.41695565747806995,-0.8200650003922767,-1.486698496904665,0.35385245494941714,0.04832109568224185,-0.24846734021701591,-0.593132844546897,-1.0872472622904452,-2.0606621704519044,-6.197207158868183,7.54123077943252,2.2174772707645283,1.1506273082242673,-1.4513799261865787,-3.1059142454239836,-50.841380851252865,3.583239111666903,1.5810365051256223,0.8682694509293146,0.4503994849976061,0.13212783949341245,-0.16184354463095071,-0.4858596244013496,1.1769587290525168,0.6476022480185755,0.290662699211486,-0.008950815653561307,-0.3101798643797522,-0.6733117340547751,-1.2205808607756379,-2.401502124024312,-9.698100175405457,5.225891327685223,-0.4721094198475483,-0.9001653026383757,-1.645516576238358,-3.8479947543190334,26.60613374567062,2.9253461746889164,1.397172520060984,0.7725397048854736,0.3832134325825117,0.07426889478556221,5.5621851736514785,1.9700786288811765,1.048926774961452,0.5691856554730933,0.22954319136858867,-0.06628150117593397,-0.37412562277943734,-0.7599252295348627,-1.3739662203415453,-2.851105617578671,0.08552461366695231,-0.209488426656405,-0.5441248580049913,-1.0095300152505715,-1.8800713976621497,-5.009850023357221,10.516708857815683,2.4563364003356605,1.2405644672576326,0.6849254904508124,-2.7521582156504394,-17.61779773040774,4.17449770386586,1.7187690241160756,0.9354117998455034,0.49572224286909977,0.170010509062936,-0.12404929744783097,-0.4408729389567876,-0.854424596851785,0.701484003475622,0.33128071943731874,0.02809027063215166,-0.27002624295714767,-0.6207751824719614,-1.1323233854595993,-2.1712603201777916,-7.107274497054201,6.52663842977692,2.103055742311367,-0.835257811338798,-1.5160378200335407,-3.3354150547372527,1872.055037067167,3.322507373795964,1.5125197204326688,0.8334457465004411,0.4263167702325821,0.11162645836188725,-0.18264415460270755,-0.5110797943948069,1.1298882011958462,0.6192961190588266,0.26888033107910375,-0.029159490675090525,-0.3324667317209962,-0.7030792549474271,-1.272155471187102,-2.545194581286293,-12.08645934250766,4.708555002623379,-0.49705382871435116,-0.9374169453892789,-1.7230012097727927,-4.194271676744683,17.291274987865307,2.743024680385697,1.3391675805229228,0.7407743486866054,0.36022112130662254,0.053984489995354386,4.982116156949891,1.8752365186182887,1.0073751896432563,0.5427410106081045,0.2083734464847837,-0.08660087133413699,-0.39733230474800896,-0.7922927615006836,-1.4339750366809174,-3.0468115584359476,0.06520853869724404,-0.2306681033740535,-0.5706009752600636,-1.0511730809172255,-1.9753044436878282,-5.596509841028718,8.657102380855642,2.3209525893670717,1.1905222646977354,0.6556493279064397,-2.935589054044064,-27.385625599437972,3.8311764971161257,1.6415623984813457,0.8982331384816756,0.4708036129720622,0.1492943124465721,-0.14461513638752338,-0.4652201184167777,-0.8899912805862715,0.6717601723835837,0.3090091202531067,0.007882395313960176,-0.2918216629815826,-0.6491196946220521,-1.1795101876854888,-2.292006830211164,-8.322517539870875,5.748443541867035,1.997961205692633,-0.8701449521790302,-1.5847816927828446,-3.598081399620162,48.221127331958165,3.094577510987528,1.4480662467210683,0.799775375410477,0.40264536405356477,0.09121733998806532,-0.2035988430143532,2.05506959378124,1.0849187244091485,0.5916895633692166,0.2473333409069309,-0.04939199043829288,-0.35505502366739644,-0.7337046323662801,-1.3264511457163446,-2.704465918277001,-16.018078925894994,-0.1919769996244709,-0.5225043120728718,-0.9761068458861867,-1.806074958618082,-4.604667997460878,12.799619508278461,2.579850039488394,1.2842186905250972,0.7099457832522486,0.33756105398533165,-13.574862356245216,4.508142534710188,1.7873184877659696,0.9674812173662396,0.5168700179444334,0.18738119737622191,-0.10699146896321703,-0.4209145834251877,-0.8257133647448303,-1.4975646444710495,0.3500674131935594,0.04494592348644503,-0.25204611083314116,-0.5976946494005385,-1.0946232957466815,-2.078454538211063,-6.332747772609438,7.351159692422276,2.1976966887978646,1.142830810666345,0.6271386301587731,-3.142149862357464,-61.34939293296491,3.537185071654072,1.569312519478425,0.8623798152073902,0.44635456030678555,0.12870271060112085,-0.16530150262617932,-0.49002932013035244,-0.9268604221412536,0.6428323521628306,0.28701388051355425,-0.012319044772240464,-0.3138756096788792,-0.6782175301950705,-1.2290008247337059,-2.4244789678128744,-10.029034574617539,5.132196510280669,1.901021889439686,-0.9062806668784308,-1.6580732534069933,-3.90192966565751,24.415039791569434,2.893471403177522,1.3872768611153636,0.7671758061667685,0.37935597484015177,0.07088330719120099,-0.22472663304056997,1.953747762954543,1.0418783400831018,0.5647352362236121,0.22600061957650444,-0.0696649100018399,-0.3779697231020308,-0.7652516111106906,-1.3837370762200814,-2.8821482029939745,-23.711929522615055,-0.21300656634788537,-0.5484978573550358,-1.0163534273993722,-1.895440832413436,-5.099254866500456,10.153709018823061,2.4328426290601066,1.232049053518656,0.679989080372159,0.31520797102134007,-18.732653273449685,4.11330048368714,1.7055285953839094,0.9291169135855742,0.49153375868382626,0.16654729111839886,-0.12747040984541227,-0.44490138511400634,-0.8602679448826444,-1.5651222286383608,0.327547414949073,0.024720074253195334,-0.27364295435034947,-0.6254506589892472,-1.1400387858044245,-2.1906472772117582,-7.285018671241237,6.382967895864599,2.084920822772334,1.0972919577354707,-1.527203271857348,-3.3767142305274214,256.2763940869183,3.282410224514948,1.501503278130164,0.8277544426733782,0.4223425239548363,0.10821791693791132,-0.18612650241019194,-0.5153346688883855,1.1222498430257415,0.6146462927634323,0.2652722558394331,-0.03253054309779032,-0.33621104521119644,-0.708123858603524,-1.281011745212572,-2.5705972213773,-12.602831452080732,4.631738228061511,-0.5012608003597581,-0.9437643492452552,-1.7364453525545014,-4.257783754834297,16.33655511826164,2.714579222283327,1.3298021476173831,0.7355713708181056,0.3564208632008162,0.05060743119268225,4.896588159707818,1.8601210110669695,1.0006125573122995,0.5383890452279876,0.20486182240740866,-0.08999497697677873],"x":[1.6470993291652855e6,1.8128176838469328e15,3.625635366046766e15,5.438453048246599e15,7.251270730446433e15,9.064088412646266e15,1.08769060948461e16,1.2689723777045932e16,1.4502541459245766e16,1.63153591414456e16,1.812817682364543e16,1.9940994505845268e16,2.17538121880451e16,2.3566629870244932e16,2.537944755244477e16,2.71922652346446e16,2.900508291684443e16,3.0817900599044268e16,3.26307182812441e16,3.4443535963443932e16,3.625635364564377e16,3.80691713278436e16,3.988198901004343e16,4.169480669224326e16,4.35076243744431e16,4.5320442056642936e16,4.713325973884277e16,4.89460774210426e16,5.075889510324243e16,5.2571712785442264e16,5.4384530467642104e16,5.619734814984194e16,5.801016583204177e16,5.98229835142416e16,6.163580119644143e16,6.344861887864126e16,6.52614365608411e16,6.7074254243040936e16,6.888707192524077e16,7.06998896074406e16,7.251270728964043e16,7.432552497184027e16,7.61383426540401e16,7.795116033623994e16,7.976397801843976e16,8.15767957006396e16,8.338961338283944e16,8.520243106503926e16,8.70152487472391e16,8.882806642943893e16,9.064088411163877e16,9.245370179383861e16,9.426651947603843e16,9.607933715823827e16,9.78921548404381e16,9.970497252263794e16,1.0151779020483778e17,1.033306078870376e17,1.0514342556923744e17,1.0695624325143726e17,1.087690609336371e17,1.1058187861583693e17,1.1239469629803677e17,1.142075139802366e17,1.1602033166243643e17,1.1783314934463627e17,1.196459670268361e17,1.2145878470903594e17,1.2327160239123578e17,1.250844200734356e17,1.2689723775563544e17,1.2871005543783526e17,1.305228731200351e17,1.3233569080223493e17,1.3414850848443477e17,1.3596132616663461e17,1.3777414384883443e17,1.3958696153103427e17,1.413997792132341e17,1.4321259689543394e17,1.4502541457763376e17,1.468382322598336e17,1.4865104994203344e17,1.5046386762423328e17,1.522766853064331e17,1.5408950298863293e17,1.5590232067083277e17,1.577151383530326e17,1.5952795603523245e17,1.6134077371743226e17,1.631535913996321e17,1.6496640908183194e17,1.6677922676403178e17,1.685920444462316e17,1.7040486212843142e17,1.7221767981063126e17,1.740304974928311e17,1.7584331517503094e17,1.776561328572308e17,1.794689505394306e17,1.8128176822163043e17,1.8309458590383027e17,1.849074035860301e17,1.8672022126822995e17,1.8853303895042976e17,1.903458566326296e17,1.9215867431482944e17,1.9397149199702928e17,1.957843096792291e17,1.9759712736142893e17,1.9940994504362877e17,2.012227627258286e17,2.0303558040802845e17,2.0484839809022826e17,2.066612157724281e17,2.0847403345462794e17,2.1028685113682778e17,2.1209966881902762e17,2.1391248650122742e17,2.1572530418342726e17,2.175381218656271e17,2.1935093954782694e17,2.2116375723002678e17,2.229765749122266e17,2.2478939259442643e17,2.2660221027662627e17,2.284150279588261e17,2.3022784564102595e17,2.3204066332322576e17,2.338534810054256e17,2.3566629868762544e17,2.3747911636982528e17,2.3929193405202512e17,2.4110475173422493e17,2.4291756941642477e17,2.447303870986246e17,2.4654320478082445e17,2.4835602246302426e17,2.501688401452241e17,2.5198165782742394e17,2.5379447550962378e17,2.556072931918236e17,2.5742011087402342e17,2.5923292855622326e17,2.610457462384231e17,2.6285856392062294e17,2.646713816028228e17,2.664841992850226e17,2.6829701696722243e17,2.7010983464942227e17,2.719226523316221e17,2.7373547001382195e17,2.7554828769602176e17,2.773611053782216e17,2.7917392306042144e17,2.8098674074262128e17,2.8279955842482112e17,2.8461237610702093e17,2.8642519378922077e17,2.882380114714206e17,2.900508291536204e17,2.918636468358203e17,2.936764645180201e17,2.9548928220021997e17,2.973020998824198e17,2.991149175646196e17,3.0092773524681946e17,3.0274055292901926e17,3.0455337061121914e17,3.0636618829341894e17,3.0817900597561875e17,3.099918236578186e17,3.118046413400184e17,3.136174590222183e17,3.154302767044181e17,3.172430943866179e17,3.190559120688178e17,3.208687297510176e17,3.226815474332174e17,3.244943651154173e17,3.263071827976171e17,3.2812000047981696e17,3.299328181620168e17,3.317456358442166e17,3.3355845352641645e17,3.3537127120861626e17,3.371840888908161e17,3.3899690657301594e17,3.4080972425521574e17,3.426225419374156e17,3.444353596196154e17,3.462481773018153e17,3.480609949840151e17,3.498738126662149e17,3.516866303484148e17,3.534994480306146e17,3.5531226571281446e17,3.571250833950143e17,3.589379010772141e17,3.6075071875941395e17,3.6256353644161376e17,3.643763541238136e17,3.6618917180601344e17,3.6800198948821325e17,3.698148071704131e17,3.716276248526129e17,3.734404425348128e17,3.752532602170126e17,3.770660778992124e17,3.788788955814123e17,3.806917132636121e17,3.82504530945812e17,3.843173486280118e17,3.861301663102116e17,3.8794298399241146e17,3.8975580167461126e17,3.9156861935681114e17,3.9338143703901094e17,3.9519425472121075e17,3.970070724034106e17,3.9881989008561043e17,4.006327077678103e17,4.024455254500101e17,4.042583431322099e17,4.060711608144098e17,4.078839784966096e17,4.096967961788095e17,4.115096138610093e17,4.133224315432091e17,4.1513524922540896e17,4.1694806690760877e17,4.1876088458980864e17,4.2057370227200845e17,4.2238651995420826e17,4.241993376364081e17,4.2601215531860794e17,4.2782497300080774e17,4.296377906830076e17,4.314506083652074e17,4.332634260474073e17,4.350762437296071e17,4.368890614118069e17,4.387018790940068e17,4.405146967762066e17,4.4232751445840646e17,4.441403321406063e17,4.459531498228061e17,4.4776596750500595e17,4.4957878518720576e17,4.5139160286940563e17,4.5320442055160544e17,4.5501723823380525e17,4.568300559160051e17,4.586428735982049e17,4.604556912804048e17,4.622685089626046e17,4.640813266448044e17,4.658941443270043e17,4.677069620092041e17,4.6951977969140397e17,4.713325973736038e17,4.731454150558036e17,4.7495823273800346e17,4.7677105042020326e17,4.7858386810240314e17,4.8039668578460294e17,4.8220950346680275e17,4.840223211490026e17,4.858351388312024e17,4.876479565134023e17,4.894607741956021e17,4.912735918778019e17,4.930864095600018e17,4.948992272422016e17,4.967120449244015e17,4.985248626066013e17,5.003376802888011e17,5.0215049797100096e17,5.039633156532008e17,5.0577613333540064e17,5.0758895101760045e17,5.0940176869980026e17,5.112145863820001e17,5.1302740406419994e17,5.148402217463998e17,5.166530394285996e17,5.184658571107994e17,5.202786747929993e17,5.220914924751991e17,5.23904310157399e17,5.257171278395988e17,5.275299455217986e17,5.2934276320399846e17,5.311555808861983e17,5.329683985683981e17,5.3478121625059795e17,5.3659403393279776e17,5.384068516149976e17,5.4021966929719744e17,5.4203248697939725e17,5.438453046615971e17,5.456581223437969e17,5.474709400259968e17,5.492837577081966e17,5.510965753903964e17,5.529093930725963e17,5.547222107547961e17,5.56535028436996e17,5.583478461191958e17,5.601606638013956e17,5.6197348148359546e17,5.6378629916579526e17,5.6559911684799514e17,5.6741193453019494e17,5.6922475221239475e17,5.710375698945946e17,5.7285038757679443e17,5.746632052589943e17,5.764760229411941e17,5.782888406233939e17,5.801016583055937e17,5.819144759877937e17,5.837272936699935e17,5.855401113521933e17,5.873529290343931e17,5.891657467165929e17,5.909785643987928e17,5.927913820809926e17,5.946041997631924e17,5.964170174453923e17,5.982298351275921e17,6.00042652809792e17,6.018554704919918e17,6.036682881741916e17,6.054811058563914e17,6.072939235385912e17,6.091067412207912e17,6.10919558902991e17,6.127323765851908e17,6.145451942673906e17,6.163580119495904e17,6.181708296317903e17,6.199836473139901e17,6.2179646499619e17,6.236092826783898e17,6.254221003605896e17,6.272349180427895e17,6.290477357249893e17,6.308605534071891e17,6.326733710893889e17,6.344861887715887e17,6.362990064537887e17,6.381118241359885e17,6.399246418181883e17,6.417374595003881e17,6.435502771825879e17,6.453630948647878e17,6.471759125469876e17,6.489887302291875e17,6.508015479113873e17,6.526143655935871e17,6.54427183275787e17,6.562400009579868e17,6.580528186401866e17,6.598656363223864e17,6.616784540045862e17,6.634912716867862e17,6.65304089368986e17,6.671169070511858e17,6.689297247333856e17,6.707425424155854e17,6.725553600977853e17,6.743681777799852e17,6.76180995462185e17,6.779938131443848e17,6.798066308265846e17,6.816194485087844e17,6.834322661909843e17,6.852450838731841e17,6.870579015553839e17,6.888707192375837e17,6.906835369197836e17,6.924963546019835e17,6.943091722841833e17,6.961219899663831e17,6.979348076485829e17,6.997476253307827e17,7.015604430129827e17,7.033732606951825e17,7.051860783773823e17,7.069988960595821e17,7.088117137417819e17,7.106245314239818e17,7.124373491061816e17,7.142501667883814e17,7.160629844705812e17,7.17875802152781e17,7.19688619834981e17,7.215014375171808e17,7.233142551993806e17,7.251270728815804e17,7.269398905637802e17,7.287527082459802e17,7.3056552592818e17,7.323783436103798e17,7.341911612925796e17,7.360039789747794e17,7.378167966569793e17,7.396296143391791e17,7.41442432021379e17,7.432552497035788e17,7.450680673857786e17,7.468808850679785e17,7.486937027501783e17,7.505065204323781e17,7.523193381145779e17,7.541321557967777e17,7.559449734789777e17,7.577577911611775e17,7.595706088433773e17,7.613834265255771e17,7.631962442077769e17,7.650090618899768e17,7.668218795721766e17,7.686346972543764e17,7.704475149365763e17,7.72260332618776e17,7.74073150300976e17,7.758859679831758e17,7.776987856653756e17,7.795116033475754e17,7.813244210297752e17,7.831372387119752e17,7.84950056394175e17,7.867628740763748e17,7.885756917585746e17,7.903885094407744e17,7.922013271229743e17,7.940141448051741e17,7.95826962487374e17,7.976397801695738e17,7.994525978517736e17,8.012654155339735e17,8.030782332161733e17,8.048910508983731e17,8.067038685805729e17,8.085166862627727e17,8.103295039449727e17,8.121423216271725e17,8.139551393093723e17,8.157679569915721e17,8.175807746737719e17,8.193935923559718e17,8.212064100381716e17,8.230192277203715e17,8.248320454025713e17,8.266448630847711e17,8.28457680766971e17,8.302704984491708e17,8.320833161313706e17,8.338961338135704e17,8.357089514957702e17,8.375217691779702e17,8.3933458686017e17,8.411474045423698e17,8.429602222245696e17,8.447730399067694e17,8.465858575889693e17,8.483986752711692e17,8.50211492953369e17,8.520243106355688e17,8.538371283177686e17,8.556499459999685e17,8.574627636821683e17,8.592755813643681e17,8.61088399046568e17,8.629012167287677e17,8.647140344109677e17,8.665268520931675e17,8.683396697753673e17,8.701524874575671e17,8.719653051397669e17,8.737781228219668e17,8.755909405041667e17,8.774037581863665e17,8.792165758685663e17,8.810293935507661e17,8.82842211232966e17,8.846550289151658e17,8.864678465973656e17,8.882806642795654e17,8.900934819617652e17,8.91906299643965e17,8.93719117326165e17,8.955319350083648e17,8.973447526905646e17,8.991575703727644e17,9.009703880549642e17,9.027832057371642e17,9.04596023419364e17,9.064088411015638e17,9.082216587837636e17,9.100344764659634e17,9.118472941481633e17,9.136601118303631e17,9.15472929512563e17,9.172857471947628e17,9.190985648769626e17,9.209113825591625e17,9.227242002413623e17,9.245370179235621e17,9.263498356057619e17,9.281626532879617e17,9.299754709701617e17,9.317882886523615e17,9.336011063345613e17,9.354139240167611e17,9.372267416989609e17,9.390395593811608e17,9.408523770633606e17,9.426651947455604e17,9.444780124277603e17,9.462908301099601e17,9.4810364779216e17,9.499164654743598e17,9.517292831565596e17,9.535421008387594e17,9.553549185209592e17,9.571677362031592e17,9.58980553885359e17,9.607933715675588e17,9.626061892497586e17,9.644190069319584e17,9.662318246141583e17,9.680446422963581e17,9.69857459978558e17,9.716702776607578e17,9.734830953429576e17,9.752959130251575e17,9.771087307073573e17,9.789215483895571e17,9.807343660717569e17,9.825471837539567e17,9.843600014361567e17,9.861728191183565e17,9.879856368005563e17,9.897984544827561e17,9.916112721649559e17,9.934240898471558e17,9.952369075293556e17,9.970497252115555e17,9.988625428937553e17,1.0006753605759551e18,1.002488178258155e18,1.0043009959403548e18,1.0061138136225546e18,1.0079266313047544e18,1.0097394489869542e18,1.0115522666691542e18,1.013365084351354e18,1.0151779020335538e18,1.0169907197157536e18,1.0188035373979534e18,1.0206163550801533e18,1.0224291727623532e18,1.024241990444553e18,1.0260548081267528e18,1.0278676258089526e18,1.0296804434911525e18,1.0314932611733523e18,1.0333060788555521e18,1.0351188965377519e18,1.0369317142199517e18,1.0387445319021517e18,1.0405573495843515e18,1.0423701672665513e18,1.0441829849487511e18,1.0459958026309509e18,1.0478086203131508e18,1.0496214379953507e18,1.0514342556775505e18,1.0532470733597503e18,1.0550598910419501e18,1.05687270872415e18,1.0586855264063498e18,1.0604983440885496e18,1.0623111617707494e18,1.0641239794529492e18,1.0659367971351492e18,1.067749614817349e18,1.0695624324995488e18,1.0713752501817486e18,1.0731880678639484e18,1.0750008855461484e18,1.0768137032283482e18,1.078626520910548e18,1.0804393385927478e18,1.0822521562749476e18,1.0840649739571475e18,1.0858777916393473e18,1.0876906093215471e18,1.089503427003747e18,1.0913162446859468e18,1.0931290623681466e18,1.0949418800503465e18,1.0967546977325463e18,1.0985675154147461e18,1.1003803330969459e18,1.1021931507791457e18,1.1040059684613457e18,1.1058187861435455e18,1.1076316038257453e18,1.1094444215079451e18,1.1112572391901449e18,1.1130700568723448e18,1.1148828745545446e18,1.1166956922367444e18,1.1185085099189443e18,1.120321327601144e18,1.122134145283344e18,1.1239469629655438e18,1.1257597806477436e18,1.1275725983299434e18,1.1293854160121432e18,1.1311982336943432e18,1.133011051376543e18,1.1348238690587428e18,1.1366366867409426e18,1.1384495044231424e18,1.1402623221053423e18,1.1420751397875421e18,1.143887957469742e18,1.1457007751519418e18,1.1475135928341416e18,1.1493264105163415e18,1.1511392281985413e18,1.152952045880741e18,1.154764863562941e18,1.1565776812451407e18,1.1583904989273405e18,1.1602033166095404e18,1.1620161342917404e18,1.1638289519739402e18,1.16564176965614e18,1.1674545873383398e18,1.1692674050205396e18,1.1710802227027395e18,1.1728930403849393e18,1.174705858067139e18,1.176518675749339e18,1.1783314934315387e18,1.1801443111137388e18,1.1819571287959386e18,1.1837699464781384e18,1.1855827641603382e18,1.187395581842538e18,1.1892083995247378e18,1.1910212172069376e18,1.1928340348891374e18,1.1946468525713372e18,1.196459670253537e18,1.1982724879357368e18,1.200085305617937e18,1.2018981233001367e18,1.2037109409823365e18,1.2055237586645363e18,1.207336576346736e18,1.209149394028936e18,1.2109622117111357e18,1.2127750293933356e18,1.2145878470755354e18,1.2164006647577352e18,1.2182134824399352e18,1.220026300122135e18,1.2218391178043348e18,1.2236519354865347e18,1.2254647531687345e18,1.2272775708509343e18,1.229090388533134e18,1.230903206215334e18,1.2327160238975337e18,1.2345288415797335e18,1.2363416592619336e18,1.2381544769441334e18,1.2399672946263332e18,1.241780112308533e18,1.2435929299907328e18,1.2454057476729326e18,1.2472185653551324e18,1.2490313830373322e18,1.250844200719532e18,1.2526570184017318e18,1.254469836083932e18,1.2562826537661317e18,1.2580954714483315e18,1.2599082891305313e18,1.2617211068127311e18,1.263533924494931e18,1.2653467421771308e18,1.2671595598593306e18,1.2689723775415304e18,1.2707851952237302e18,1.2725980129059302e18,1.27441083058813e18,1.2762236482703299e18,1.2780364659525297e18,1.2798492836347295e18,1.2816621013169293e18,1.283474918999129e18,1.285287736681329e18,1.2871005543635287e18,1.2889133720457285e18,1.2907261897279286e18,1.2925390074101284e18,1.2943518250923282e18,1.296164642774528e18,1.2979774604567278e18,1.2997902781389276e18,1.3016030958211274e18,1.3034159135033272e18,1.305228731185527e18,1.3070415488677268e18,1.308854366549927e18,1.3106671842321267e18,1.3124800019143265e18,1.3142928195965263e18,1.3161056372787261e18,1.317918454960926e18,1.3197312726431258e18,1.3215440903253256e18,1.3233569080075254e18,1.3251697256897252e18,1.3269825433719252e18,1.328795361054125e18,1.3306081787363249e18,1.3324209964185247e18,1.3342338141007245e18,1.3360466317829243e18,1.337859449465124e18,1.339672267147324e18,1.3414850848295237e18,1.3432979025117235e18,1.3451107201939236e18,1.3469235378761234e18,1.3487363555583232e18,1.350549173240523e18,1.3523619909227228e18,1.3541748086049226e18,1.3559876262871224e18,1.3578004439693222e18,1.359613261651522e18,1.3614260793337219e18,1.363238897015922e18,1.3650517146981217e18,1.3668645323803215e18,1.3686773500625213e18,1.3704901677447212e18,1.372302985426921e18,1.3741158031091208e18,1.3759286207913206e18,1.3777414384735204e18,1.3795542561557202e18,1.3813670738379203e18,1.38317989152012e18,1.38499270920232e18,1.3868055268845197e18,1.3886183445667195e18,1.3904311622489193e18,1.392243979931119e18,1.394056797613319e18,1.3958696152955187e18,1.3976824329777185e18,1.3994952506599186e18,1.4013080683421184e18,1.4031208860243182e18,1.404933703706518e18,1.4067465213887178e18,1.4085593390709176e18,1.4103721567531174e18,1.4121849744353172e18,1.413997792117517e18,1.4158106097997169e18,1.4176234274819167e18,1.4194362451641167e18,1.4212490628463165e18,1.4230618805285164e18,1.4248746982107162e18,1.426687515892916e18,1.4285003335751158e18,1.4303131512573156e18,1.4321259689395154e18,1.4339387866217152e18,1.435751604303915e18,1.437564421986115e18,1.439377239668315e18,1.4411900573505147e18,1.4430028750327145e18,1.4448156927149143e18,1.446628510397114e18,1.448441328079314e18,1.4502541457615137e18,1.4520669634437135e18,1.4538797811259133e18,1.4556925988081134e18,1.4575054164903132e18,1.459318234172513e18,1.4611310518547128e18,1.4629438695369126e18,1.4647566872191124e18,1.4665695049013123e18,1.468382322583512e18,1.4701951402657119e18,1.4720079579479117e18,1.4738207756301117e18,1.4756335933123116e18,1.4774464109945114e18,1.4792592286767112e18,1.481072046358911e18,1.4828848640411108e18,1.4846976817233106e18,1.4865104994055104e18,1.4883233170877102e18,1.49013613476991e18,1.49194895245211e18,1.49376177013431e18,1.4955745878165097e18,1.4973874054987095e18,1.4992002231809093e18,1.501013040863109e18,1.502825858545309e18,1.5046386762275087e18,1.5064514939097085e18,1.5082643115919084e18,1.5100771292741084e18,1.5118899469563082e18,1.513702764638508e18,1.5155155823207078e18,1.5173284000029076e18,1.5191412176851075e18,1.5209540353673073e18,1.522766853049507e18,1.524579670731707e18,1.5263924884139067e18,1.5282053060961068e18,1.5300181237783066e18,1.5318309414605064e18,1.5336437591427062e18,1.535456576824906e18,1.5372693945071058e18,1.5390822121893056e18,1.5408950298715054e18,1.5427078475537052e18,1.544520665235905e18,1.546333482918105e18,1.548146300600305e18,1.5499591182825047e18,1.5517719359647045e18,1.5535847536469043e18,1.5553975713291041e18,1.557210389011304e18,1.5590232066935037e18,1.5608360243757036e18,1.5626488420579034e18,1.5644616597401034e18,1.5662744774223032e18,1.568087295104503e18,1.5699001127867028e18,1.5717129304689027e18,1.5735257481511025e18,1.5753385658333023e18,1.577151383515502e18,1.578964201197702e18,1.5807770188799017e18,1.5825898365621018e18,1.5844026542443016e18,1.5862154719265014e18,1.5880282896087012e18,1.589841107290901e18,1.5916539249731008e18,1.5934667426553006e18,1.5952795603375004e18,1.5970923780197002e18,1.5989051957019e18,1.6007180133841e18,1.6025308310663e18,1.6043436487484997e18,1.6061564664306995e18,1.6079692841128993e18,1.6097821017950991e18,1.611594919477299e18,1.6134077371594988e18,1.6152205548416986e18,1.6170333725238984e18,1.6188461902060982e18,1.6206590078882982e18,1.622471825570498e18,1.6242846432526979e18,1.6260974609348977e18,1.6279102786170975e18,1.6297230962992973e18,1.631535913981497e18,1.633348731663697e18,1.6351615493458967e18,1.6369743670280965e18,1.6387871847102966e18,1.6406000023924964e18,1.6424128200746962e18,1.644225637756896e18,1.6460384554390958e18,1.6478512731212956e18,1.6496640908034954e18,1.6514769084856952e18,1.653289726167895e18,1.6551025438500948e18,1.656915361532295e18,1.6587281792144947e18,1.6605409968966945e18,1.6623538145788943e18,1.6641666322610941e18,1.665979449943294e18,1.6677922676254938e18,1.6696050853076936e18,1.6714179029898934e18,1.6732307206720932e18,1.6750435383542932e18,1.676856356036493e18,1.6786691737186929e18,1.6804819914008927e18,1.6822948090830925e18,1.6841076267652923e18,1.685920444447492e18,1.687733262129692e18,1.6895460798118917e18,1.6913588974940915e18,1.6931717151762916e18,1.6949845328584914e18,1.6967973505406912e18,1.698610168222891e18,1.7004229859050908e18,1.7022358035872906e18,1.7040486212694904e18,1.7058614389516902e18,1.70767425663389e18,1.7094870743160899e18,1.71129989199829e18,1.7131127096804897e18,1.7149255273626895e18,1.7167383450448893e18,1.7185511627270892e18,1.720363980409289e18,1.7221767980914888e18,1.7239896157736886e18,1.7258024334558884e18,1.7276152511380882e18,1.7294280688202883e18,1.731240886502488e18,1.7330537041846879e18,1.7348665218668877e18,1.7366793395490875e18,1.7384921572312873e18,1.740304974913487e18,1.742117792595687e18,1.7439306102778867e18,1.7457434279600865e18,1.7475562456422866e18,1.7493690633244864e18,1.7511818810066862e18,1.752994698688886e18,1.7548075163710858e18,1.7566203340532856e18,1.7584331517354854e18,1.7602459694176852e18,1.762058787099885e18,1.7638716047820849e18,1.765684422464285e18,1.7674972401464847e18,1.7693100578286845e18,1.7711228755108844e18,1.7729356931930842e18,1.774748510875284e18,1.7765613285574838e18,1.7783741462396836e18,1.7801869639218834e18,1.7819997816040832e18,1.7838125992862833e18,1.785625416968483e18,1.787438234650683e18,1.7892510523328827e18,1.7910638700150825e18,1.7928766876972823e18,1.794689505379482e18,1.796502323061682e18,1.7983151407438817e18,1.8001279584260815e18,1.8019407761082816e18,1.8037535937904814e18,1.8055664114726812e18,1.807379229154881e18,1.8091920468370808e18,1.8110048645192806e18]}
},{}],71:[function(require,module,exports){
module.exports={"expected":[6.804683063831404e14,-1.0368345457454433,-0.03618025439016222,0.8969932774951354,13.801602642460107,-1.1993933842240818,-0.1089211396735313,0.7742198541219915,6.864573644419479,-1.3928947330869217,-0.18281928843729517,0.6644890733793132,4.536016554242642,-1.6298376733942126,-0.25870146273735395,0.5648390948670056,3.359449086627086,-1.9302354259722088,-0.33748269525641644,0.4730249054381094,2.64353153334477,-2.3283200537574924,-0.42021328395923413,0.3872956941463577,2.157779402508312,-2.887974557434803,-0.5081398192758713,0.3062465578834412,1.8033789668302764,-3.743821666354206,-0.6027883012153803,0.2287161747128585,1.5308906163490277,-5.236815071672586,-0.7060819532687906,0.15371352493079213,1.3128160982138835,-8.555546781007687,-0.8205143428085626,0.08036313748930092,1.132624841477005,-22.699006683370367,-0.9494129180381483,0.007862005457928636,0.9797653089711468,35.322962650383054,-1.0973554033039103,-0.06455657387351345,0.8471699993148526,9.903670225980878,-1.2708555595639863,-0.13765580832440183,0.7299112330178992,5.723896194487297,-1.4795481327980344,-0.21222790187352575,0.6244321741104693,3.9947220552137246,-1.7383574632360264,-0.2891292091288519,0.5280844557154073,3.041839671547885,-2.071757523521213,-0.3693214629688147,0.43883804135852705,2.4331286731508674,-2.522929656026349,-0.45392349949738886,0.3550921199350076,2.006874920897232,-3.1759474408416417,-0.5442797727100089,0.2755473933911263,1.6888463866518093,-4.219331772125005,-0.6420552047272022,0.19911669802562354,1.4401639817410685,-6.181576511153701,-0.7493715765553018,0.12485998062780605,1.2384765809234257,-11.327475946084261,-0.8690107211478354,0.05193478474362906,1.070005111866516,-63.59307394416632,-1.0047282667217736,-0.020443640415665147,0.9257765271126979,17.64732622712998,-1.1617571497871164,-0.09303680491547334,0.7996806239129245,7.712866320330008,-1.347651801461734,-0.16661531480644828,0.6873967191113854,4.901348779279081,-1.573778065643875,-0.24199203782280113,0.5857669093019828,3.5634198453967696,-1.8581113399773659,-0.32005918718530485,0.49241260522291136,2.7745950106379254,-2.230915040251071,-0.40183304987091256,0.4054902008282618,2.2498439395482883,-2.7474774194546363,-0.4885113910127551,0.32352956920489556,1.872195873914344,-3.5208205830205572,-0.5815508929401929,0.24532347770809465,1.5847660345173844,-4.823851568442607,-0.6827760217395642,0.16984905720889448,1.3565456234587245,-7.527150396208494,-0.7945377774400862,0.09620970144609256,1.169173394430537,-16.716477340498212,-0.9199534878027243,0.023589904770333257,1.0110676008222728,79.49370104698839,-1.0632825287937855,-0.04878206981077242,0.8745454437621997,11.74914954002169,-1.2305392562921216,-0.12166745975968708,0.7542938816467984,6.307332644739789,-1.4305403846009905,-0.1958493149520764,0.6465053124376594,4.279256841176025,-1.6767961812718812,-0.2721668057350257,0.5483631111586739,3.2111638597428334,-1.99116370917668,-0.3515547996695883,0.45772163340102956,2.5462765039648305,-2.4115319058870344,-0.4350928502626921,0.37289930449651076,2.088509232283,-3.0099027405146654,-0.5240693899008806,0.2925399454476714,1.7510748041557962,-3.9420556542130885,-0.6200698066338132,0.21551648602745171,1.4896238106721011,-5.619597512944431,-0.7251020955445494,0.14086153402502047,1.2791123054512854,-9.601491399806198,-0.8417826281907977,0.0677150687475345,1.1043110245397367,-31.7886744806199,-0.9736207240318303,-0.004717141073693311,0.9554101997728718,24.4472617704868,-1.1254713679328696,-0.0771988798921679,0.8257898849923797,8.795330209557715,-1.3042866350634297,-0.1504960288583508,0.7108050077492415,5.3276988275323705,-1.5204261345213521,-0.22540930026179593,0.6070838475308916,3.791606417520239,-1.7900823542161615,-0.30281018327502646,0.5121028928905399,2.917616960965825,-2.1401125530570986,-0.383683639948716,0.4239182247213191,2.348661653448595,-2.6186175894609067,-0.469182228466768,0.34098933429506706,1.9451876642315578,-3.3212169439799957,-0.5606983917455977,0.26205940914855336,1.6413952750584027,-4.469121451991011,-0.6599652289357499,0.18607101224299574,1.402181459922592,-6.716438764997179,-0.7692023093871422,0.11210428645730805,1.2070910254243967,-13.224481554328733,-0.8913342384322632,0.03932947696799631,1.0433813250313708,-317.99052805280115,-1.0303303203449932,-0.03303174835386727,0.9026843331048029,14.431093789260238,-1.1917535925942486,-0.10574017278648712,0.7792618911837041,7.0192453156119,-1.3836890087828342,-0.17957130144887887,0.6690318639214239,4.604847741508782,-1.618397942908612,-0.25534897560502967,0.5689945342311636,3.398497670784807,-1.915463615764292,-0.3339834915043481,0.47687903174306884,2.668863180882117,-2.308274170380076,-0.4165181221720507,0.39091655765636385,2.1756876529164018,-2.8588657297369826,-0.5041893912117812,0.3096895577985501,1.816827254372353,-3.697148997792048,-0.5985090095099295,0.23202780955770852,1.5414563431706862,-5.1488762487369675,-0.7013798269276683,0.15693413312014765,1.321416280686218,-8.328328062302198,-0.8152659556316872,0.08352899484443048,1.1398294559379214,-21.18371239993517,-0.9434513414380183,0.011007025353388574,0.9859478752780453,39.74056071694329,-1.0904476233616034,-0.0613993611774361,0.8525861524964621,10.225276556885087,-1.2626645474732074,-0.13445285689393274,0.734742498945129,5.83201849831628,-1.469565781038024,-0.20894370441519922,0.6288117078984846,4.048728522735226,-1.725778410006234,-0.2857246695208269,0.532112879291702,3.074393509571947,-2.055222681789506,-0.3657519225737443,0.44259358372867275,2.4550584873581967,-2.4999503586765806,-0.45013619361869345,0.358637349107371,2.022785702667981,-3.141427517396946,-0.5402103886454389,0.27893384486967154,1.7010252726362258,-4.160976138273289,-0.6376230312455273,0.20238817554921582,1.4498751450920029,-6.060616417390596,-0.7444724165770294,0.12805500958745086,1.2464759742334652,-10.93481077218087,-0.8635061668848152,0.05508852965884915,1.0767730892745664,-52.99230642555277,-0.9984288661816952,-0.017297780582239245,0.9316335710420822,18.68756326618819,-1.154394897395345,-0.08986576447669715,0.8048494019957241,7.907815278427238,-1.3388330458113544,-0.16338495935299344,0.6920374367848917,4.981272396934376,-1.562898323027692,-0.2386656645593978,0.5899984868850945,3.6069846673764356,-1.844190449895771,-0.31659578405798117,0.49632592033669043,2.8021899909714136,-2.2122498882267028,-0.3981851300654503,0.4091566906315559,2.26904259862948,-2.720824412874416,-0.48462214485916666,0.32700702008087146,1.8864472378237773,-3.4791543163876444,-0.5773502691896284,0.2486600618435759,1.5958640731933509,-4.7486704566757005,-0.6781751245915344,0.17308625595090854,1.365515652533772,-7.350023324764521,-0.7894205669599184,0.09938451851071453,1.1766443757626142,-15.878608368067303,-0.9141640436589937,0.0267366359664465,1.0174473759993745,105.99404734283148,-1.0566047532418654,-0.045630322028573665,0.8801106937968843,12.203178696984242,-1.222663125551496,-0.11847738096020831,0.7592395943078911,6.438178470540049,-1.421002986811632,-0.1925859541421229,0.6509735520054717,4.340816755928482,-1.6648723931816232,-0.26879199999281617,0.5524605570727201,3.2470987863002643,-1.9756480311095115,-0.3480252921439154,0.46153071727909606,2.570000264971311,-2.390260238239131,-0.4313578939329471,0.37648554716127897,2.1054824407269632,-2.978564731146433,-0.5200675364986822,0.2959569630566124,1.7639329814893359,-3.8906790504827637,-0.6157244189587173,0.2188095308474185,1.4997943316853541,-5.518921194023032,-0.7203148403721352,0.14407010109052257,1.2874357448944949,-9.317025870832943,-0.8364237045940408,0.07087490909089131,1.1113151248118323,-28.896793494234636,-0.9675136511155595,-0.001572369991298028,0.961443628065535,26.486717880858517,-1.1183683527153874,-0.07403615830213844,0.8310928986371658,9.048755340485156,-1.2958268558808745,-0.14728157684711327,0.7155492244442214,5.421679857737077,-1.5100612453457203,-0.22210711068134958,0.6113958266934046,3.8405444569812635,-1.776934606360075,-0.29938034709573247,0.5160787516352007,2.9478083496767304,-2.1226819137117996,-0.380080291770857,0.4276330569006072,2.3693059730276325,-2.594110621438728,-0.46535087421963733,0.34450350192336565,1.9603239577876173,-3.2837751692040387,-0.5565722651530407,0.2654228947640875,1.6530728112558277,-4.404080611734073,-0.6554601233931859,0.18932654374572183,1.411550449269527,-6.574432111625754,-0.7642089804274889,0.11528967840385752,1.2148473297525246,-12.693446102190707,-0.885706835507139,0.042479478641994396,1.0499712079535464,-158.99369165212545,-1.0238681078753629,-0.029883896361297162,0.9084077912606527,15.120436449498063,-1.1841708514313667,-0.1025613207056798,0.7843287008040627,7.180899486243084,-1.374563052092019,-0.1763269807084818,0.6735938102514036,4.675701721500894,-1.6070740667359238,-0.25200186830141247,0.573164871275818,3.4383899287137627,-1.9008687004298543,-0.3304916304245636,0.480744735200913,2.6946236394335727,-2.288517213433328,-0.4128326278960895,0.3945463346249759,2.193842647646294,-2.830275639063958,-0.5002514705069041,0.3131392704957239,1.8304300975607357,-3.651549145020849,-0.5942457961646262,0.2353442807255834,1.5521250035010155,-5.063739845505172,-0.6966983975448062,0.1601579217370078,1.3300882378957752,-8.112707521243934,-0.8100444113257006,0.08669651583629158,1.1470859057384646,-19.857698754438022,-0.937525035193508,0.0141522629818104,0.9921688996293995,45.420030084794995,-1.083587057592469,-0.058243367470023615,0.8580314269946494,10.568253160485646,-1.2545383272204724,-0.13125261286464723,0.7395961426291224,5.9441808731768235,-1.459675269998304,-0.20566382005257894,0.6332085966602049,4.104127971539981,-1.7133351562839652,-0.2823262425960507,0.5361548074781487,3.107582966399287,-2.0389002020822216,-0.36219058409802923,0.446359594936912,2.4773295562367568,-2.4773295562370925,-0.4463595949369685,0.36219058409797605,2.038900202081979,-3.1075829663997885,-0.5361548074782093,0.282326242596,1.7133351562837802,-4.10412797154082,-0.633208596660271,0.20566382005252992,1.4596752699981568,-5.944180873178532,-0.7395961426291953,0.13125261286459938,1.2545383272203516,-10.568253160490945,-0.8580314269947311,0.058243367469976416,1.083587057592367,-45.42003008489206,-0.9921688996294927,-0.014152262981857441,0.9375250351934197,19.85769875441943,-1.1470859057385736,-0.08669651583633896,0.8100444113256225,8.112707521240791,-1.3300882378959058,-0.160157921737056,0.6966983975447364,5.063739845503918,-1.5521250035011758,-0.23534428072563301,0.5942457961645626,3.6515491450201747,-1.8304300975609402,-0.31313927049577556,0.5002514705068454,2.830275639063534,-2.1938426476465676,-0.39454633462503025,0.4128326278960344,2.288517213433035,-2.6946236394339613,-0.480744735200901,0.3304916304245114,1.9008687004298996,-3.438389928714365,-0.5731648712758051,0.25200186830136245,1.6070740667359589,-4.6757017215019685,-0.6735938102513893,0.1763269807084333,1.374563052092047,-7.180899486245556,-0.7843287008040468,0.10256132070563227,1.1841708514313902,-15.120436449508864,-0.908407791260635,0.029883896361250092,1.023868107875383,158.99369165093648,-1.0499712079535257,-0.042479478642041504,0.8857068355071566,12.693446102183083,-1.2148473297525002,-0.1152896784039052,0.7642089804275044,6.574432111623674,-1.4115504492694975,-0.18932654374577054,0.6554601233932,4.4040806117331135,-1.6530728112557913,-0.2654228947641379,0.5565722651530536,3.283775169203484,-1.9603239577875693,-0.3445035019234183,0.46535087421964927,2.594110621438365,-2.3693059730275676,-0.42763305690066283,0.3800802917708682,2.1226819137115407,-2.9478083496766354,-0.5160787516352603,0.2993803470957431,1.7769346063598794,-3.84054445698111,-0.6113958266934694,0.22210711068135988,1.5100612453455662,-5.421679857736779,-0.7155492244442925,0.14728157684712329,1.2958268558807486,-9.048755340484345,-0.8310928986372452,0.07403615830214831,1.1183683527152815,-26.48671788085162,-0.9614436280656254,0.0015723699913078402,0.9675136511154683,28.89679349424284,-1.1113151248119373,-0.07087490909088144,0.836423704593961,9.317025870833804,-1.28743574489462,-0.14407010109051255,0.7203148403720638,5.51892119402334,-1.4997943316853222,-0.2188095308474678,0.6157244189586525,3.890679050482922,-1.7639329814892954,-0.2959569630566635,0.5200675364986225,2.9785647311465304,-2.10548244072691,-0.37648554716133265,0.4313578939328913,2.3902602382391964,-2.5700002649712363,-0.4615307172791531,0.3480252921438627,1.9756480311095597,-3.2470987863001506,-0.5524605570727815,0.26879199999276576,1.66487239318166,-4.340816755930543,-0.6509735520055385,0.1925859541420741,1.4210029868116616,-6.438178470544459,-0.7592395943079652,0.11847738096016061,1.2226631255515203,-12.203178696999814,-0.8801106937969679,0.045630322028526536,1.0566047532418863,-105.99404734399859,-1.0174473759994702,-0.026736635966493567,0.9141640436590117,15.878608368041007,-1.1766443757627263,-0.09938451851076203,0.7894205669599342,7.350023324758807,-1.3655156525339065,-0.17308625595095697,0.6781751245915486,4.748670456673254,-1.5958640731935176,-0.2486600618436258,0.5773502691896415,3.479154316386283,-1.8864472378239918,-0.3270070200809236,0.48462214485917887,2.7208244128735433,-2.269042598629769,-0.40915669063161086,0.39818513006546163,2.2122498882260904,-2.80218999097183,-0.4963259203367491,0.316595784057992,1.844190449895314,-3.6069846673770942,-0.5899984868851579,0.23866566455940819,1.5628983230273343,-4.98127239693559,-0.6920374367849612,0.16338495935300348,1.3388330458110644,-7.907815278430227,-0.8048494019958016,0.08986576447670704,1.1543948973951028,-18.687563266204663,-0.93163357104217,0.017297780582249057,0.9984288661814877,52.99230642542065,-1.0767730892746679,-0.055088529658839314,0.8635061668846339,10.934810772175199,-1.2464759742335856,-0.1280550095874409,0.744472416576868,6.060616417388823,-1.4498751450921488,-0.20238817554920557,0.6376230312453812,4.160976138272428,-1.7010252726364088,-0.278933844869661,0.5402103886453048,3.1414275173964343,-2.0227857026682203,-0.35863734910735995,0.45013619361860274,2.4999503586762395,-2.4550584873583277,-0.44259358372866103,0.36575192257365874,2.0552226817892603,-3.0743935095721415,-0.5321128792916894,0.2857246695207453,1.725778410006047,-4.0487285227355505,-0.628811707898471,0.20894370441512045,1.4695657810378755,-5.832018498316931,-0.7347424989451139,0.13445285689385594,1.2626645474730853,-10.22527655688705,-0.8525861524964451,0.06139936117736036,1.0904476233615004,-39.74056071697271,-0.9859478752780261,-0.011007025353464036,0.9434513414379294,21.1837123999268,-1.1398294559378988,-0.08352899484450647,0.8152659556316091,8.328328062300889,-1.321416280686191,-0.15693413312022494,0.701379826927598,5.148876248736455,-1.541456343170653,-0.23202780955778804,0.5985090095098655,3.697148997791775,-1.8168272543723103,-0.30968955779863283,0.5041893912117222,2.858865729736812,-2.1756876529163454,-0.3909165576564508,0.41651812217199546,2.3082741703799585,-2.6688631808820373,-0.47687903174316143,0.33398349150429585,1.9154636157642049,-3.398497670784684,-0.5689945342312636,0.25534897560497954,1.6183979429085449,-4.604847741508563,-0.6690318639215331,0.17957130144883032,1.38368900878278,-7.019245315611406,-0.7792618911838254,0.10574017278643957,1.1917535925942035,-14.431093789258187,-0.9026843331049397,0.03303174835382019,1.0303303203449548,317.99052805379335,-1.0433813250315283,-0.03932947696804342,0.8913342384322297,13.22448155433046,-1.2070910254245821,-0.11210428645735569,0.7692023093871126,6.7164387649976325,-1.4021814599228157,-0.1860710122430444,0.6599652289357233,4.469121451991217,-1.6413952750586813,-0.2620594091486036,0.5606983917455732,3.3212169439801134,-1.9451876642319186,-0.3409893342951196,0.4691822284667453,2.618617589460984,-2.348661653449087,-0.42391822472137464,0.3836836399486947,2.140112553057153,-2.9176169609665425,-0.5121028928905993,0.30281018327500614,1.7900823542162028,-3.7916064175213995,-0.607083847530956,0.22540930026177633,1.5204261345213848,-5.327698827534588,-0.7108050077493123,0.1504960288583318,1.3042866350632258,-8.795330209561401,-0.825789884992411,0.07719887989217776,1.1254713679326986,-24.447261770514956,-0.9554101997729073,0.004717141073703124,0.9736207240316834,31.788674480572322,-1.104311024539778,-0.06771506874752464,0.8417826281906687,9.601491399801818,-1.2791123054513345,-0.14086153402501048,0.7251020955444343,5.619597512942898,-1.4896238106721609,-0.21551648602744145,0.6200698066337087,3.9420556542123104,-1.751074804155872,-0.29253994544766077,0.5240693899007844,3.009902740514192,-2.0885092322831,-0.3728993044964996,0.4350928502626024,2.4115319058867137,-2.5462765039649695,-0.4577216334010177,0.35155479966950354,1.9911637091764463,-3.2111638597430443,-0.5483631111586611,0.2721668057349447,1.6767961812717018,-4.279256841176385,-0.6465053124376454,0.19584931495199803,1.4305403846008475,-6.307332644740548,-0.7542938816467831,0.1216674597596105,1.2305392562920032,-11.749149540024279,-0.8745454437621824,0.048782069810696785,1.0632825287936853,-79.49370104710601,-1.011067600822253,-0.023589904770408752,0.9199534878026375,16.716477340492993,-1.1691733944305138,-0.09620970144616871,0.7945377774400095,7.5271503962074195,-1.3565456234586966,-0.16984905720897214,0.6827760217394951,4.823851568442155,-1.5847660345173498,-0.24532347770817467,0.58155089294013,3.520820583020307,-1.8721958739143,-0.3235295692049789,0.4885113910126969,2.747477419454477,-2.249843939548229,-0.4054902008283497,0.401833049870858,2.23091504025096,-2.77459501063784,-0.4924126052230051,0.320059187185253,1.8581113399772833,-3.5634198453966355,-0.5857669093020842,0.24199203782275133,1.57377806564381,-4.901348779278835,-0.6873967191114966,0.16661531480639996,1.3476518014616816,-7.712866320329415,-0.7996806239130482,0.0930368049154259,1.1617571497870727,-17.64732622712691,-0.925776527112838,0.020443640415618098,1.0047282667217363,63.59307394420602,-1.0700051118666778,-0.05193478474367621,0.8690107211478028,11.32747594608553,-1.238476580923617,-0.12485998062785382,0.7493715765552726,6.181576511154087,-1.4401639817413006,-0.19911669802567242,0.6420552047271759,4.219331772125189,-1.6888463866521,-0.27554739339117695,0.5442797727099848,3.17594744084175,-2.006874920897611,-0.35509211993506057,0.45392349949736643,2.5229296560264216,-2.4331286731513897,-0.4388380413585832,0.3693214629687935,2.071757523521265,-3.041839671548659,-0.5280844557154675,0.2891292091288318,1.7383574632360657,-3.9947220552150036,-0.6244321741105345,0.21222790187350632,1.4795481327980657,-5.723896194489845,-0.7299112330179712,0.13765580832438287,1.2708555595640119,-9.903670225988353,-0.8471699993149333,0.06455657387349475,1.0973554033039319,-35.32296265045953,-0.979765308971211,-0.007862005457933035,0.9494129180381942,22.69900668333875,-1.13262484147708,-0.08036313748930535,0.8205143428086027,8.555546781003143,-1.312816098213973,-0.15371352493079662,0.706081953268816,5.236815071670644,-1.5308906163491611,-0.22871617471287062,0.6027883012154034,3.74382166635318,-1.803378966830446,-0.3062465578834538,0.5081398192758925,2.8879745574341644,-2.1577794025085377,-0.3872956941463709,0.42021328395926233,2.328320053757099,-2.6435315333450324,-0.4730249054381147,0.3374826952564432,1.9302354259719192,-3.359449086627489,-0.5648390948670113,0.25870146273737954,1.6298376733939888,-4.53601655424335,-0.6644890733793195,0.18281928843731998,1.3928947330867416,-6.864573644421058,-0.7742198541219985,0.10892113967355563,1.1993933842239324,-13.80160264246639,-0.8969932774951432,0.036180254390186274,1.0368345457453163,3.1896951861709707e13],"x":[-37.69911184307752,-38.466427766476826,-39.233743689876135,-40.001059613275444,-40.76837553667475,-41.53569146007406,-42.30300738347337,-43.07032330687268,-43.83763923027199,-44.6049551536713,-45.37227107707061,-46.139587000469916,-46.906902923869225,-47.674218847268534,-48.44153477066784,-49.20885069406715,-49.97616661746646,-50.74348254086577,-51.51079846426508,-52.27811438766439,-53.0454303110637,-53.812746234463006,-54.580062157862315,-55.34737808126162,-56.114694004660926,-56.882009928060235,-57.649325851459544,-58.41664177485885,-59.18395769825816,-59.95127362165747,-60.71858954505678,-61.48590546845609,-62.2532213918554,-63.02053731525471,-63.787853238654016,-64.55516916205333,-65.32248508545264,-66.08980100885195,-66.85711693225126,-67.62443285565057,-68.39174877904988,-69.15906470244919,-69.9263806258485,-70.6936965492478,-71.46101247264711,-72.22832839604642,-72.99564431944572,-73.76296024284503,-74.53027616624433,-75.29759208964364,-76.06490801304295,-76.83222393644226,-77.59953985984157,-78.36685578324088,-79.13417170664019,-79.9014876300395,-80.6688035534388,-81.43611947683812,-82.20343540023742,-82.97075132363673,-83.73806724703604,-84.50538317043535,-85.27269909383466,-86.04001501723397,-86.80733094063328,-87.57464686403259,-88.3419627874319,-89.1092787108312,-89.87659463423051,-90.64391055762982,-91.41122648102913,-92.17854240442844,-92.94585832782775,-93.71317425122706,-94.48049017462637,-95.24780609802568,-96.01512202142499,-96.7824379448243,-97.5497538682236,-98.31706979162291,-99.08438571502222,-99.85170163842153,-100.61901756182084,-101.38633348522015,-102.15364940861946,-102.92096533201877,-103.68828125541808,-104.45559717881738,-105.2229131022167,-105.990229025616,-106.75754494901531,-107.52486087241462,-108.29217679581393,-109.05949271921324,-109.82680864261255,-110.59412456601186,-111.36144048941117,-112.12875641281047,-112.89607233620978,-113.66338825960909,-114.4307041830084,-115.19802010640771,-115.96533602980702,-116.73265195320633,-117.49996787660564,-118.26728380000495,-119.03459972340426,-119.80191564680356,-120.56923157020287,-121.33654749360218,-122.10386341700149,-122.8711793404008,-123.63849526380011,-124.40581118719942,-125.17312711059873,-125.94044303399804,-126.70775895739735,-127.47507488079665,-128.24239080419596,-129.00970672759527,-129.77702265099458,-130.5443385743939,-131.3116544977932,-132.0789704211925,-132.84628634459182,-133.61360226799113,-134.38091819139044,-135.14823411478974,-135.91555003818905,-136.68286596158836,-137.45018188498767,-138.21749780838698,-138.9848137317863,-139.7521296551856,-140.5194455785849,-141.28676150198422,-142.05407742538353,-142.82139334878283,-143.58870927218214,-144.35602519558145,-145.12334111898076,-145.89065704238007,-146.65797296577938,-147.4252888891787,-148.192604812578,-148.9599207359773,-149.72723665937662,-150.49455258277592,-151.26186850617523,-152.02918442957454,-152.79650035297385,-153.56381627637316,-154.33113219977247,-155.09844812317178,-155.8657640465711,-156.6330799699704,-157.4003958933697,-158.167711816769,-158.93502774016832,-159.70234366356763,-160.46965958696694,-161.23697551036625,-162.00429143376556,-162.77160735716487,-163.53892328056418,-164.3062392039635,-165.0735551273628,-165.8408710507621,-166.6081869741614,-167.37550289756072,-168.14281882096003,-168.91013474435934,-169.67745066775865,-170.44476659115796,-171.21208251455727,-171.97939843795658,-172.74671436135588,-173.5140302847552,-174.2813462081545,-175.0486621315538,-175.81597805495312,-176.58329397835243,-177.3506099017517,-178.11792582515102,-178.88524174855033,-179.65255767194964,-180.41987359534895,-181.18718951874826,-181.95450544214756,-182.72182136554687,-183.48913728894618,-184.2564532123455,-185.0237691357448,-185.7910850591441,-186.55840098254342,-187.32571690594273,-188.09303282934204,-188.86034875274134,-189.62766467614065,-190.39498059953996,-191.16229652293927,-191.92961244633858,-192.6969283697379,-193.4642442931372,-194.2315602165365,-194.99887613993582,-195.76619206333513,-196.53350798673443,-197.30082391013374,-198.06813983353305,-198.83545575693236,-199.60277168033167,-200.37008760373098,-201.1374035271303,-201.9047194505296,-202.6720353739289,-203.43935129732822,-204.20666722072752,-204.97398314412683,-205.74129906752614,-206.50861499092545,-207.27593091432476,-208.04324683772407,-208.81056276112338,-209.5778786845227,-210.345194607922,-211.1125105313213,-211.87982645472061,-212.64714237811992,-213.41445830151923,-214.18177422491854,-214.94909014831785,-215.71640607171716,-216.48372199511647,-217.25103791851578,-218.0183538419151,-218.7856697653144,-219.5529856887137,-220.320301612113,-221.08761753551232,-221.85493345891163,-222.62224938231094,-223.38956530571025,-224.15688122910956,-224.92419715250887,-225.69151307590818,-226.45882899930749,-227.2261449227068,-227.9934608461061,-228.7607767695054,-229.52809269290472,-230.29540861630403,-231.06272453970334,-231.83004046310265,-232.59735638650196,-233.36467230990127,-234.13198823330058,-234.89930415669988,-235.6666200800992,-236.4339360034985,-237.2012519268978,-237.96856785029712,-238.73588377369643,-239.50319969709574,-240.27051562049505,-241.03783154389436,-241.80514746729366,-242.57246339069297,-243.33977931409228,-244.1070952374916,-244.8744111608909,-245.6417270842902,-246.40904300768952,-247.17635893108883,-247.94367485448814,-248.71099077788745,-249.47830670128675,-250.24562262468606,-251.01293854808537,-251.78025447148468,-252.547570394884,-253.3148863182833,-254.0822022416826,-254.84951816508192,-255.61683408848123,-256.38415001188054,-257.1514659352798,-257.91878185867915,-258.68609778207843,-259.4534137054778,-260.22072962887705,-260.9880455522764,-261.75536147567567,-262.522677399075,-263.2899933224743,-264.0573092458736,-264.8246251692729,-265.59194109267224,-266.3592570160715,-267.12657293947086,-267.89388886287014,-268.6612047862695,-269.42852070966876,-270.1958366330681,-270.9631525564674,-271.7304684798667,-272.497784403266,-273.26510032666533,-274.0324162500646,-274.79973217346395,-275.56704809686323,-276.33436402026257,-277.10167994366185,-277.8689958670612,-278.63631179046047,-279.4036277138598,-280.1709436372591,-280.9382595606584,-281.7055754840577,-282.47289140745704,-283.2402073308563,-284.00752325425566,-284.77483917765494,-285.5421551010543,-286.30947102445356,-287.0767869478529,-287.8441028712522,-288.6114187946515,-289.3787347180508,-290.14605064145013,-290.9133665648494,-291.68068248824875,-292.44799841164803,-293.21531433504737,-293.98263025844665,-294.749946181846,-295.51726210524527,-296.2845780286446,-297.0518939520439,-297.8192098754432,-298.5865257988425,-299.35384172224184,-300.1211576456411,-300.88847356904046,-301.65578949243974,-302.4231054158391,-303.19042133923836,-303.9577372626377,-304.725053186037,-305.4923691094363,-306.2596850328356,-307.02700095623493,-307.7943168796342,-308.56163280303355,-309.3289487264328,-310.09626464983216,-310.86358057323145,-311.6308964966308,-312.39821242003006,-313.1655283434294,-313.9328442668287,-314.700160190228,-315.4674761136273,-316.23479203702664,-317.0021079604259,-317.76942388382525,-318.53673980722454,-319.3040557306239,-320.07137165402315,-320.8386875774225,-321.60600350082177,-322.3733194242211,-323.1406353476204,-323.9079512710197,-324.675267194419,-325.44258311781834,-326.2098990412176,-326.97721496461696,-327.74453088801624,-328.5118468114156,-329.27916273481486,-330.0464786582142,-330.8137945816135,-331.5811105050128,-332.3484264284121,-333.11574235181143,-333.8830582752107,-334.65037419861005,-335.41769012200933,-336.18500604540867,-336.95232196880795,-337.7196378922073,-338.48695381560657,-339.2542697390059,-340.0215856624052,-340.7889015858045,-341.5562175092038,-342.32353343260314,-343.0908493560024,-343.85816527940176,-344.62548120280104,-345.3927971262004,-346.16011304959966,-346.927428972999,-347.6947448963983,-348.4620608197976,-349.2293767431969,-349.99669266659623,-350.7640085899955,-351.53132451339485,-352.29864043679413,-353.06595636019347,-353.83327228359275,-354.6005882069921,-355.36790413039137,-356.1352200537907,-356.90253597719,-357.6698519005893,-358.4371678239886,-359.20448374738794,-359.9717996707872,-360.73911559418656,-361.50643151758584,-362.2737474409852,-363.04106336438446,-363.8083792877838,-364.5756952111831,-365.3430111345824,-366.1103270579817,-366.87764298138103,-367.6449589047803,-368.41227482817965,-369.1795907515789,-369.94690667497827,-370.71422259837755,-371.4815385217769,-372.24885444517616,-373.0161703685755,-373.7834862919748,-374.5508022153741,-375.3181181387734,-376.08543406217274,-376.852749985572,-377.62006590897136,-378.38738183237064,-379.15469775577,-379.92201367916925,-380.6893296025686,-381.4566455259679,-382.2239614493672,-382.9912773727665,-383.7585932961658,-384.5259092195651,-385.29322514296445,-386.0605410663637,-386.827856989763,-387.59517291316234,-388.3624888365616,-389.12980475996096,-389.89712068336024,-390.6644366067596,-391.43175253015886,-392.1990684535582,-392.9663843769575,-393.7337003003568,-394.5010162237561,-395.26833214715543,-396.0356480705547,-396.80296399395405,-397.57027991735333,-398.33759584075267,-399.10491176415195,-399.8722276875513,-400.63954361095057,-401.4068595343499,-402.1741754577492,-402.9414913811485,-403.7088073045478,-404.47612322794714,-405.2434391513464,-406.01075507474576,-406.77807099814504,-407.5453869215444,-408.31270284494366,-409.080018768343,-409.8473346917423,-410.6146506151416,-411.3819665385409,-412.14928246194023,-412.9165983853395,-413.68391430873885,-414.45123023213813,-415.21854615553747,-415.98586207893675,-416.7531780023361,-417.52049392573537,-418.2878098491347,-419.055125772534,-419.8224416959333,-420.5897576193326,-421.35707354273194,-422.1243894661312,-422.89170538953056,-423.65902131292984,-424.4263372363292,-425.19365315972846,-425.9609690831278,-426.7282850065271,-427.4956009299264,-428.2629168533257,-429.03023277672503,-429.7975487001243,-430.56486462352365,-431.3321805469229,-432.09949647032226,-432.86681239372155,-433.6341283171209,-434.40144424052016,-435.1687601639195,-435.9360760873188,-436.7033920107181,-437.4707079341174,-438.23802385751674,-439.005339780916,-439.77265570431535,-440.53997162771464,-441.307287551114,-442.07460347451325,-442.8419193979126,-443.60923532131187,-444.3765512447112,-445.1438671681105,-445.9111830915098,-446.6784990149091,-447.44581493830844,-448.2131308617077,-448.98044678510706,-449.74776270850634,-450.5150786319057,-451.28239455530496,-452.0497104787043,-452.8170264021036,-453.5843423255029,-454.3516582489022,-455.11897417230153,-455.8862900957008,-456.65360601910015,-457.42092194249943,-458.18823786589877,-458.95555378929805,-459.7228697126974,-460.49018563609667,-461.257501559496,-462.0248174828953,-462.7921334062946,-463.5594493296939,-464.32676525309324,-465.0940811764925,-465.86139709989186,-466.62871302329114,-467.3960289466905,-468.16334487008976,-468.9306607934891,-469.6979767168884,-470.4652926402877,-471.232608563687,-471.99992448708633,-472.7672404104856,-473.53455633388495,-474.30187225728423,-475.06918818068357,-475.83650410408285,-476.6038200274822,-477.37113595088147,-478.1384518742808,-478.9057677976801,-479.6730837210794,-480.4403996444787,-481.20771556787804,-481.9750314912773,-482.74234741467666,-483.50966333807594,-484.2769792614753,-485.04429518487456,-485.8116111082739,-486.5789270316732,-487.3462429550725,-488.1135588784718,-488.88087480187113,-489.6481907252704,-490.41550664866975,-491.182822572069,-491.95013849546837,-492.71745441886765,-493.484770342267,-494.25208626566626,-495.0194021890656,-495.7867181124649,-496.5540340358642,-497.3213499592635,-498.08866588266284,-498.8559818060621,-499.62329772946146,-500.39061365286074,-501.1579295762601,-501.92524549965935,-502.6925614230587,-503.459877346458,-504.2271932698573,-504.9945091932566,-505.7618251166559,-506.5291410400552,-507.29645696345455,-508.0637728868538,-508.83108881025316,-509.59840473365244,-510.3657206570518,-511.13303658045106,-511.9003525038504,-512.6676684272497,-513.434984350649,-514.2023002740483,-514.9696161974476,-515.736932120847,-516.5042480442462,-517.2715639676455,-518.0388798910449,-518.8061958144442,-519.5735117378434,-520.3408276612428,-521.1081435846421,-521.8754595080414,-522.6427754314407,-523.41009135484,-524.1774072782393,-524.9447232016387,-525.7120391250379,-526.4793550484372,-527.2466709718366,-528.0139868952358,-528.7813028186351,-529.5486187420345,-530.3159346654338,-531.083250588833,-531.8505665122324,-532.6178824356317,-533.385198359031,-534.1525142824303,-534.9198302058296,-535.687146129229,-536.4544620526283,-537.2217779760275,-537.9890938994268,-538.7564098228262,-539.5237257462255,-540.2910416696247,-541.0583575930241,-541.8256735164234,-542.5929894398228,-543.360305363222,-544.1276212866213,-544.8949372100207,-545.66225313342,-546.4295690568192,-547.1968849802186,-547.9642009036179,-548.7315168270172,-549.4988327504165,-550.2661486738158,-551.0334645972151,-551.8007805206145,-552.5680964440137,-553.335412367413,-554.1027282908124,-554.8700442142117,-555.6373601376109,-556.4046760610103,-557.1719919844096,-557.9393079078089,-558.7066238312082,-559.4739397546075,-560.2412556780068,-561.0085716014062,-561.7758875248054,-562.5432034482047,-563.3105193716041,-564.0778352950034,-564.8451512184026,-565.612467141802,-566.3797830652013,-567.1470989886006,-567.9144149119999,-568.6817308353992,-569.4490467587985,-570.2163626821979,-570.9836786055971,-571.7509945289964,-572.5183104523958,-573.2856263757951,-574.0529422991943,-574.8202582225937,-575.587574145993,-576.3548900693924,-577.1222059927916,-577.8895219161909,-578.6568378395903,-579.4241537629896,-580.1914696863888,-580.9587856097882,-581.7261015331875,-582.4934174565868,-583.260733379986,-584.0280493033854,-584.7953652267847,-585.5626811501841,-586.3299970735833,-587.0973129969826,-587.864628920382,-588.6319448437813,-589.3992607671805,-590.1665766905799,-590.9338926139792,-591.7012085373785,-592.4685244607778,-593.2358403841771,-594.0031563075764,-594.7704722309758,-595.537788154375,-596.3051040777743,-597.0724200011737,-597.839735924573,-598.6070518479722,-599.3743677713716,-600.1416836947709,-600.9089996181702,-601.6763155415695,-602.4436314649688,-603.2109473883681,-603.9782633117675,-604.7455792351667,-605.512895158566,-606.2802110819654,-607.0475270053647,-607.8148429287639,-608.5821588521633,-609.3494747755626,-610.116790698962,-610.8841066223612,-611.6514225457605,-612.4187384691598,-613.1860543925592,-613.9533703159584,-614.7206862393577,-615.4880021627571,-616.2553180861564,-617.0226340095556,-617.789949932955,-618.5572658563543,-619.3245817797537,-620.0918977031529,-620.8592136265522,-621.6265295499516,-622.3938454733509,-623.1611613967501,-623.9284773201495,-624.6957932435488,-625.4631091669481,-626.2304250903474,-626.9977410137467,-627.765056937146,-628.5323728605454,-629.2996887839446,-630.0670047073439,-630.8343206307433,-631.6016365541426,-632.3689524775418,-633.1362684009412,-633.9035843243405,-634.6709002477398,-635.4382161711391,-636.2055320945384,-636.9728480179377,-637.7401639413371,-638.5074798647363,-639.2747957881356,-640.042111711535,-640.8094276349343,-641.5767435583335,-642.3440594817329,-643.1113754051322,-643.8786913285315,-644.6460072519308,-645.4133231753301,-646.1806390987294,-646.9479550221288,-647.715270945528,-648.4825868689273,-649.2499027923267,-650.017218715726,-650.7845346391252,-651.5518505625246,-652.3191664859239,-653.0864824093233,-653.8537983327225,-654.6211142561218,-655.3884301795212,-656.1557461029205,-656.9230620263197,-657.690377949719,-658.4576938731184,-659.2250097965177,-659.992325719917,-660.7596416433163,-661.5269575667156,-662.294273490115,-663.0615894135142,-663.8289053369135,-664.5962212603129,-665.3635371837121,-666.1308531071114,-666.8981690305108,-667.6654849539101,-668.4328008773093,-669.2001168007087,-669.967432724108,-670.7347486475073,-671.5020645709066,-672.2693804943059,-673.0366964177052,-673.8040123411046,-674.5713282645038,-675.3386441879031,-676.1059601113025,-676.8732760347018,-677.640591958101,-678.4079078815004,-679.1752238048997,-679.942539728299,-680.7098556516983,-681.4771715750976,-682.2444874984969,-683.0118034218963,-683.7791193452955,-684.5464352686948,-685.3137511920942,-686.0810671154935,-686.8483830388927,-687.6156989622921,-688.3830148856914,-689.1503308090907,-689.91764673249,-690.6849626558893,-691.4522785792886,-692.219594502688,-692.9869104260872,-693.7542263494865,-694.5215422728859,-695.2888581962852,-696.0561741196844,-696.8234900430838,-697.5908059664831,-698.3581218898825,-699.1254378132817,-699.892753736681,-700.6600696600804,-701.4273855834797,-702.1947015068789,-702.9620174302783,-703.7293333536776,-704.4966492770769,-705.2639652004762,-706.0312811238755,-706.7985970472748,-707.5659129706742,-708.3332288940734,-709.1005448174727,-709.8678607408721,-710.6351766642714,-711.4024925876706,-712.16980851107,-712.9371244344693,-713.7044403578686,-714.4717562812679,-715.2390722046672,-716.0063881280665,-716.7737040514659,-717.5410199748651,-718.3083358982644,-719.0756518216638,-719.8429677450631,-720.6102836684623,-721.3775995918617,-722.144915515261,-722.9122314386603,-723.6795473620596,-724.4468632854589,-725.2141792088582,-725.9814951322576,-726.7488110556568,-727.5161269790561,-728.2834429024555,-729.0507588258548,-729.818074749254,-730.5853906726534,-731.3527065960527,-732.120022519452,-732.8873384428513,-733.6546543662506,-734.42197028965,-735.1892862130493,-735.9566021364485,-736.7239180598478,-737.4912339832472,-738.2585499066465,-739.0258658300457,-739.7931817534451,-740.5604976768444,-741.3278136002438,-742.095129523643,-742.8624454470423,-743.6297613704417,-744.397077293841,-745.1643932172402,-745.9317091406396,-746.6990250640389,-747.4663409874382,-748.2336569108375,-749.0009728342368,-749.7682887576361,-750.5356046810355,-751.3029206044347,-752.070236527834,-752.8375524512334,-753.6048683746327,-754.3721842980319,-755.1395002214313,-755.9068161448306,-756.6741320682299,-757.4414479916292,-758.2087639150285,-758.9760798384278,-759.7433957618272,-760.5107116852264,-761.2780276086257,-762.0453435320251,-762.8126594554244,-763.5799753788236,-764.347291302223,-765.1146072256223,-765.8819231490216,-766.6492390724209,-767.4165549958202,-768.1838709192195,-768.9511868426189,-769.7185027660181,-770.4858186894174,-771.2531346128168,-772.0204505362161,-772.7877664596153,-773.5550823830147,-774.322398306414,-775.0897142298134,-775.8570301532126,-776.6243460766119,-777.3916620000113,-778.1589779234106,-778.9262938468098,-779.6936097702092,-780.4609256936085,-781.2282416170078,-781.995557540407,-782.7628734638064,-783.5301893872057,-784.2975053106051,-785.0648212340043,-785.8321371574036,-786.599453080803,-787.3667690042023,-788.1340849276015,-788.9014008510009,-789.6687167744002,-790.4360326977995,-791.2033486211988,-791.9706645445981,-792.7379804679974,-793.5052963913968,-794.272612314796,-795.0399282381953,-795.8072441615947,-796.574560084994,-797.3418760083932,-798.1091919317926,-798.8765078551919,-799.6438237785912,-800.4111397019905,-801.1784556253898,-801.9457715487891,-802.7130874721885,-803.4804033955877,-804.247719318987]}
},{}],72:[function(require,module,exports){
module.exports={"expected":[-6.804683063831404e14,1.0368345457454433,0.03618025439016222,-0.8969932774951354,-13.801602642460107,1.1993933842240818,0.1089211396735313,-0.7742198541219915,-6.864573644419479,1.3928947330869217,0.18281928843729517,-0.6644890733793132,-4.536016554242642,1.6298376733942126,0.25870146273735395,-0.5648390948670056,-3.359449086627086,1.9302354259722088,0.33748269525641644,-0.4730249054381094,-2.64353153334477,2.3283200537574924,0.42021328395923413,-0.3872956941463577,-2.157779402508312,2.887974557434803,0.5081398192758713,-0.3062465578834412,-1.8033789668302764,3.743821666354206,0.6027883012153803,-0.2287161747128585,-1.5308906163490277,5.236815071672586,0.7060819532687906,-0.15371352493079213,-1.3128160982138835,8.555546781007687,0.8205143428085626,-0.08036313748930092,-1.132624841477005,22.699006683370367,0.9494129180381483,-0.007862005457928636,-0.9797653089711468,-35.322962650383054,1.0973554033039103,0.06455657387351345,-0.8471699993148526,-9.903670225980878,1.2708555595639863,0.13765580832440183,-0.7299112330178992,-5.723896194487297,1.4795481327980344,0.21222790187352575,-0.6244321741104693,-3.9947220552137246,1.7383574632360264,0.2891292091288519,-0.5280844557154073,-3.041839671547885,2.071757523521213,0.3693214629688147,-0.43883804135852705,-2.4331286731508674,2.522929656026349,0.45392349949738886,-0.3550921199350076,-2.006874920897232,3.1759474408416417,0.5442797727100089,-0.2755473933911263,-1.6888463866518093,4.219331772125005,0.6420552047272022,-0.19911669802562354,-1.4401639817410685,6.181576511153701,0.7493715765553018,-0.12485998062780605,-1.2384765809234257,11.327475946084261,0.8690107211478354,-0.05193478474362906,-1.070005111866516,63.59307394416632,1.0047282667217736,0.020443640415665147,-0.9257765271126979,-17.64732622712998,1.1617571497871164,0.09303680491547334,-0.7996806239129245,-7.712866320330008,1.347651801461734,0.16661531480644828,-0.6873967191113854,-4.901348779279081,1.573778065643875,0.24199203782280113,-0.5857669093019828,-3.5634198453967696,1.8581113399773659,0.32005918718530485,-0.49241260522291136,-2.7745950106379254,2.230915040251071,0.40183304987091256,-0.4054902008282618,-2.2498439395482883,2.7474774194546363,0.4885113910127551,-0.32352956920489556,-1.872195873914344,3.5208205830205572,0.5815508929401929,-0.24532347770809465,-1.5847660345173844,4.823851568442607,0.6827760217395642,-0.16984905720889448,-1.3565456234587245,7.527150396208494,0.7945377774400862,-0.09620970144609256,-1.169173394430537,16.716477340498212,0.9199534878027243,-0.023589904770333257,-1.0110676008222728,-79.49370104698839,1.0632825287937855,0.04878206981077242,-0.8745454437621997,-11.74914954002169,1.2305392562921216,0.12166745975968708,-0.7542938816467984,-6.307332644739789,1.4305403846009905,0.1958493149520764,-0.6465053124376594,-4.279256841176025,1.6767961812718812,0.2721668057350257,-0.5483631111586739,-3.2111638597428334,1.99116370917668,0.3515547996695883,-0.45772163340102956,-2.5462765039648305,2.4115319058870344,0.4350928502626921,-0.37289930449651076,-2.088509232283,3.0099027405146654,0.5240693899008806,-0.2925399454476714,-1.7510748041557962,3.9420556542130885,0.6200698066338132,-0.21551648602745171,-1.4896238106721011,5.619597512944431,0.7251020955445494,-0.14086153402502047,-1.2791123054512854,9.601491399806198,0.8417826281907977,-0.0677150687475345,-1.1043110245397367,31.7886744806199,0.9736207240318303,0.004717141073693311,-0.9554101997728718,-24.4472617704868,1.1254713679328696,0.0771988798921679,-0.8257898849923797,-8.795330209557715,1.3042866350634297,0.1504960288583508,-0.7108050077492415,-5.3276988275323705,1.5204261345213521,0.22540930026179593,-0.6070838475308916,-3.791606417520239,1.7900823542161615,0.30281018327502646,-0.5121028928905399,-2.917616960965825,2.1401125530570986,0.383683639948716,-0.4239182247213191,-2.348661653448595,2.6186175894609067,0.469182228466768,-0.34098933429506706,-1.9451876642315578,3.3212169439799957,0.5606983917455977,-0.26205940914855336,-1.6413952750584027,4.469121451991011,0.6599652289357499,-0.18607101224299574,-1.402181459922592,6.716438764997179,0.7692023093871422,-0.11210428645730805,-1.2070910254243967,13.224481554328733,0.8913342384322632,-0.03932947696799631,-1.0433813250313708,317.99052805280115,1.0303303203449932,0.03303174835386727,-0.9026843331048029,-14.431093789260238,1.1917535925942486,0.10574017278648712,-0.7792618911837041,-7.0192453156119,1.3836890087828342,0.17957130144887887,-0.6690318639214239,-4.604847741508782,1.618397942908612,0.25534897560502967,-0.5689945342311636,-3.398497670784807,1.915463615764292,0.3339834915043481,-0.47687903174306884,-2.668863180882117,2.308274170380076,0.4165181221720507,-0.39091655765636385,-2.1756876529164018,2.8588657297369826,0.5041893912117812,-0.3096895577985501,-1.816827254372353,3.697148997792048,0.5985090095099295,-0.23202780955770852,-1.5414563431706862,5.1488762487369675,0.7013798269276683,-0.15693413312014765,-1.321416280686218,8.328328062302198,0.8152659556316872,-0.08352899484443048,-1.1398294559379214,21.18371239993517,0.9434513414380183,-0.011007025353388574,-0.9859478752780453,-39.74056071694329,1.0904476233616034,0.0613993611774361,-0.8525861524964621,-10.225276556885087,1.2626645474732074,0.13445285689393274,-0.734742498945129,-5.83201849831628,1.469565781038024,0.20894370441519922,-0.6288117078984846,-4.048728522735226,1.725778410006234,0.2857246695208269,-0.532112879291702,-3.074393509571947,2.055222681789506,0.3657519225737443,-0.44259358372867275,-2.4550584873581967,2.4999503586765806,0.45013619361869345,-0.358637349107371,-2.022785702667981,3.141427517396946,0.5402103886454389,-0.27893384486967154,-1.7010252726362258,4.160976138273289,0.6376230312455273,-0.20238817554921582,-1.4498751450920029,6.060616417390596,0.7444724165770294,-0.12805500958745086,-1.2464759742334652,10.93481077218087,0.8635061668848152,-0.05508852965884915,-1.0767730892745664,52.99230642555277,0.9984288661816952,0.017297780582239245,-0.9316335710420822,-18.68756326618819,1.154394897395345,0.08986576447669715,-0.8048494019957241,-7.907815278427238,1.3388330458113544,0.16338495935299344,-0.6920374367848917,-4.981272396934376,1.562898323027692,0.2386656645593978,-0.5899984868850945,-3.6069846673764356,1.844190449895771,0.31659578405798117,-0.49632592033669043,-2.8021899909714136,2.2122498882267028,0.3981851300654503,-0.4091566906315559,-2.26904259862948,2.720824412874416,0.48462214485916666,-0.32700702008087146,-1.8864472378237773,3.4791543163876444,0.5773502691896284,-0.2486600618435759,-1.5958640731933509,4.7486704566757005,0.6781751245915344,-0.17308625595090854,-1.365515652533772,7.350023324764521,0.7894205669599184,-0.09938451851071453,-1.1766443757626142,15.878608368067303,0.9141640436589937,-0.0267366359664465,-1.0174473759993745,-105.99404734283148,1.0566047532418654,0.045630322028573665,-0.8801106937968843,-12.203178696984242,1.222663125551496,0.11847738096020831,-0.7592395943078911,-6.438178470540049,1.421002986811632,0.1925859541421229,-0.6509735520054717,-4.340816755928482,1.6648723931816232,0.26879199999281617,-0.5524605570727201,-3.2470987863002643,1.9756480311095115,0.3480252921439154,-0.46153071727909606,-2.570000264971311,2.390260238239131,0.4313578939329471,-0.37648554716127897,-2.1054824407269632,2.978564731146433,0.5200675364986822,-0.2959569630566124,-1.7639329814893359,3.8906790504827637,0.6157244189587173,-0.2188095308474185,-1.4997943316853541,5.518921194023032,0.7203148403721352,-0.14407010109052257,-1.2874357448944949,9.317025870832943,0.8364237045940408,-0.07087490909089131,-1.1113151248118323,28.896793494234636,0.9675136511155595,0.001572369991298028,-0.961443628065535,-26.486717880858517,1.1183683527153874,0.07403615830213844,-0.8310928986371658,-9.048755340485156,1.2958268558808745,0.14728157684711327,-0.7155492244442214,-5.421679857737077,1.5100612453457203,0.22210711068134958,-0.6113958266934046,-3.8405444569812635,1.776934606360075,0.29938034709573247,-0.5160787516352007,-2.9478083496767304,2.1226819137117996,0.380080291770857,-0.4276330569006072,-2.3693059730276325,2.594110621438728,0.46535087421963733,-0.34450350192336565,-1.9603239577876173,3.2837751692040387,0.5565722651530407,-0.2654228947640875,-1.6530728112558277,4.404080611734073,0.6554601233931859,-0.18932654374572183,-1.411550449269527,6.574432111625754,0.7642089804274889,-0.11528967840385752,-1.2148473297525246,12.693446102190707,0.885706835507139,-0.042479478641994396,-1.0499712079535464,158.99369165212545,1.0238681078753629,0.029883896361297162,-0.9084077912606527,-15.120436449498063,1.1841708514313667,0.1025613207056798,-0.7843287008040627,-7.180899486243084,1.374563052092019,0.1763269807084818,-0.6735938102514036,-4.675701721500894,1.6070740667359238,0.25200186830141247,-0.573164871275818,-3.4383899287137627,1.9008687004298543,0.3304916304245636,-0.480744735200913,-2.6946236394335727,2.288517213433328,0.4128326278960895,-0.3945463346249759,-2.193842647646294,2.830275639063958,0.5002514705069041,-0.3131392704957239,-1.8304300975607357,3.651549145020849,0.5942457961646262,-0.2353442807255834,-1.5521250035010155,5.063739845505172,0.6966983975448062,-0.1601579217370078,-1.3300882378957752,8.112707521243934,0.8100444113257006,-0.08669651583629158,-1.1470859057384646,19.857698754438022,0.937525035193508,-0.0141522629818104,-0.9921688996293995,-45.420030084794995,1.083587057592469,0.058243367470023615,-0.8580314269946494,-10.568253160485646,1.2545383272204724,0.13125261286464723,-0.7395961426291224,-5.9441808731768235,1.459675269998304,0.20566382005257894,-0.6332085966602049,-4.104127971539981,1.7133351562839652,0.2823262425960507,-0.5361548074781487,-3.107582966399287,2.0389002020822216,0.36219058409802923,-0.446359594936912,-2.4773295562367568,2.4773295562370925,0.4463595949369685,-0.36219058409797605,-2.038900202081979,3.1075829663997885,0.5361548074782093,-0.282326242596,-1.7133351562837802,4.10412797154082,0.633208596660271,-0.20566382005252992,-1.4596752699981568,5.944180873178532,0.7395961426291953,-0.13125261286459938,-1.2545383272203516,10.568253160490945,0.8580314269947311,-0.058243367469976416,-1.083587057592367,45.42003008489206,0.9921688996294927,0.014152262981857441,-0.9375250351934197,-19.85769875441943,1.1470859057385736,0.08669651583633896,-0.8100444113256225,-8.112707521240791,1.3300882378959058,0.160157921737056,-0.6966983975447364,-5.063739845503918,1.5521250035011758,0.23534428072563301,-0.5942457961645626,-3.6515491450201747,1.8304300975609402,0.31313927049577556,-0.5002514705068454,-2.830275639063534,2.1938426476465676,0.39454633462503025,-0.4128326278960344,-2.288517213433035,2.6946236394339613,0.480744735200901,-0.3304916304245114,-1.9008687004298996,3.438389928714365,0.5731648712758051,-0.25200186830136245,-1.6070740667359589,4.6757017215019685,0.6735938102513893,-0.1763269807084333,-1.374563052092047,7.180899486245556,0.7843287008040468,-0.10256132070563227,-1.1841708514313902,15.120436449508864,0.908407791260635,-0.029883896361250092,-1.023868107875383,-158.99369165093648,1.0499712079535257,0.042479478642041504,-0.8857068355071566,-12.693446102183083,1.2148473297525002,0.1152896784039052,-0.7642089804275044,-6.574432111623674,1.4115504492694975,0.18932654374577054,-0.6554601233932,-4.4040806117331135,1.6530728112557913,0.2654228947641379,-0.5565722651530536,-3.283775169203484,1.9603239577875693,0.3445035019234183,-0.46535087421964927,-2.594110621438365,2.3693059730275676,0.42763305690066283,-0.3800802917708682,-2.1226819137115407,2.9478083496766354,0.5160787516352603,-0.2993803470957431,-1.7769346063598794,3.84054445698111,0.6113958266934694,-0.22210711068135988,-1.5100612453455662,5.421679857736779,0.7155492244442925,-0.14728157684712329,-1.2958268558807486,9.048755340484345,0.8310928986372452,-0.07403615830214831,-1.1183683527152815,26.48671788085162,0.9614436280656254,-0.0015723699913078402,-0.9675136511154683,-28.89679349424284,1.1113151248119373,0.07087490909088144,-0.836423704593961,-9.317025870833804,1.28743574489462,0.14407010109051255,-0.7203148403720638,-5.51892119402334,1.4997943316853222,0.2188095308474678,-0.6157244189586525,-3.890679050482922,1.7639329814892954,0.2959569630566635,-0.5200675364986225,-2.9785647311465304,2.10548244072691,0.37648554716133265,-0.4313578939328913,-2.3902602382391964,2.5700002649712363,0.4615307172791531,-0.3480252921438627,-1.9756480311095597,3.2470987863001506,0.5524605570727815,-0.26879199999276576,-1.66487239318166,4.340816755930543,0.6509735520055385,-0.1925859541420741,-1.4210029868116616,6.438178470544459,0.7592395943079652,-0.11847738096016061,-1.2226631255515203,12.203178696999814,0.8801106937969679,-0.045630322028526536,-1.0566047532418863,105.99404734399859,1.0174473759994702,0.026736635966493567,-0.9141640436590117,-15.878608368041007,1.1766443757627263,0.09938451851076203,-0.7894205669599342,-7.350023324758807,1.3655156525339065,0.17308625595095697,-0.6781751245915486,-4.748670456673254,1.5958640731935176,0.2486600618436258,-0.5773502691896415,-3.479154316386283,1.8864472378239918,0.3270070200809236,-0.48462214485917887,-2.7208244128735433,2.269042598629769,0.40915669063161086,-0.39818513006546163,-2.2122498882260904,2.80218999097183,0.4963259203367491,-0.316595784057992,-1.844190449895314,3.6069846673770942,0.5899984868851579,-0.23866566455940819,-1.5628983230273343,4.98127239693559,0.6920374367849612,-0.16338495935300348,-1.3388330458110644,7.907815278430227,0.8048494019958016,-0.08986576447670704,-1.1543948973951028,18.687563266204663,0.93163357104217,-0.017297780582249057,-0.9984288661814877,-52.99230642542065,1.0767730892746679,0.055088529658839314,-0.8635061668846339,-10.934810772175199,1.2464759742335856,0.1280550095874409,-0.744472416576868,-6.060616417388823,1.4498751450921488,0.20238817554920557,-0.6376230312453812,-4.160976138272428,1.7010252726364088,0.278933844869661,-0.5402103886453048,-3.1414275173964343,2.0227857026682203,0.35863734910735995,-0.45013619361860274,-2.4999503586762395,2.4550584873583277,0.44259358372866103,-0.36575192257365874,-2.0552226817892603,3.0743935095721415,0.5321128792916894,-0.2857246695207453,-1.725778410006047,4.0487285227355505,0.628811707898471,-0.20894370441512045,-1.4695657810378755,5.832018498316931,0.7347424989451139,-0.13445285689385594,-1.2626645474730853,10.22527655688705,0.8525861524964451,-0.06139936117736036,-1.0904476233615004,39.74056071697271,0.9859478752780261,0.011007025353464036,-0.9434513414379294,-21.1837123999268,1.1398294559378988,0.08352899484450647,-0.8152659556316091,-8.328328062300889,1.321416280686191,0.15693413312022494,-0.701379826927598,-5.148876248736455,1.541456343170653,0.23202780955778804,-0.5985090095098655,-3.697148997791775,1.8168272543723103,0.30968955779863283,-0.5041893912117222,-2.858865729736812,2.1756876529163454,0.3909165576564508,-0.41651812217199546,-2.3082741703799585,2.6688631808820373,0.47687903174316143,-0.33398349150429585,-1.9154636157642049,3.398497670784684,0.5689945342312636,-0.25534897560497954,-1.6183979429085449,4.604847741508563,0.6690318639215331,-0.17957130144883032,-1.38368900878278,7.019245315611406,0.7792618911838254,-0.10574017278643957,-1.1917535925942035,14.431093789258187,0.9026843331049397,-0.03303174835382019,-1.0303303203449548,-317.99052805379335,1.0433813250315283,0.03932947696804342,-0.8913342384322297,-13.22448155433046,1.2070910254245821,0.11210428645735569,-0.7692023093871126,-6.7164387649976325,1.4021814599228157,0.1860710122430444,-0.6599652289357233,-4.469121451991217,1.6413952750586813,0.2620594091486036,-0.5606983917455732,-3.3212169439801134,1.9451876642319186,0.3409893342951196,-0.4691822284667453,-2.618617589460984,2.348661653449087,0.42391822472137464,-0.3836836399486947,-2.140112553057153,2.9176169609665425,0.5121028928905993,-0.30281018327500614,-1.7900823542162028,3.7916064175213995,0.607083847530956,-0.22540930026177633,-1.5204261345213848,5.327698827534588,0.7108050077493123,-0.1504960288583318,-1.3042866350632258,8.795330209561401,0.825789884992411,-0.07719887989217776,-1.1254713679326986,24.447261770514956,0.9554101997729073,-0.004717141073703124,-0.9736207240316834,-31.788674480572322,1.104311024539778,0.06771506874752464,-0.8417826281906687,-9.601491399801818,1.2791123054513345,0.14086153402501048,-0.7251020955444343,-5.619597512942898,1.4896238106721609,0.21551648602744145,-0.6200698066337087,-3.9420556542123104,1.751074804155872,0.29253994544766077,-0.5240693899007844,-3.009902740514192,2.0885092322831,0.3728993044964996,-0.4350928502626024,-2.4115319058867137,2.5462765039649695,0.4577216334010177,-0.35155479966950354,-1.9911637091764463,3.2111638597430443,0.5483631111586611,-0.2721668057349447,-1.6767961812717018,4.279256841176385,0.6465053124376454,-0.19584931495199803,-1.4305403846008475,6.307332644740548,0.7542938816467831,-0.1216674597596105,-1.2305392562920032,11.749149540024279,0.8745454437621824,-0.048782069810696785,-1.0632825287936853,79.49370104710601,1.011067600822253,0.023589904770408752,-0.9199534878026375,-16.716477340492993,1.1691733944305138,0.09620970144616871,-0.7945377774400095,-7.5271503962074195,1.3565456234586966,0.16984905720897214,-0.6827760217394951,-4.823851568442155,1.5847660345173498,0.24532347770817467,-0.58155089294013,-3.520820583020307,1.8721958739143,0.3235295692049789,-0.4885113910126969,-2.747477419454477,2.249843939548229,0.4054902008283497,-0.401833049870858,-2.23091504025096,2.77459501063784,0.4924126052230051,-0.320059187185253,-1.8581113399772833,3.5634198453966355,0.5857669093020842,-0.24199203782275133,-1.57377806564381,4.901348779278835,0.6873967191114966,-0.16661531480639996,-1.3476518014616816,7.712866320329415,0.7996806239130482,-0.0930368049154259,-1.1617571497870727,17.64732622712691,0.925776527112838,-0.020443640415618098,-1.0047282667217363,-63.59307394420602,1.0700051118666778,0.05193478474367621,-0.8690107211478028,-11.32747594608553,1.238476580923617,0.12485998062785382,-0.7493715765552726,-6.181576511154087,1.4401639817413006,0.19911669802567242,-0.6420552047271759,-4.219331772125189,1.6888463866521,0.27554739339117695,-0.5442797727099848,-3.17594744084175,2.006874920897611,0.35509211993506057,-0.45392349949736643,-2.5229296560264216,2.4331286731513897,0.4388380413585832,-0.3693214629687935,-2.071757523521265,3.041839671548659,0.5280844557154675,-0.2891292091288318,-1.7383574632360657,3.9947220552150036,0.6244321741105345,-0.21222790187350632,-1.4795481327980657,5.723896194489845,0.7299112330179712,-0.13765580832438287,-1.2708555595640119,9.903670225988353,0.8471699993149333,-0.06455657387349475,-1.0973554033039319,35.32296265045953,0.979765308971211,0.007862005457933035,-0.9494129180381942,-22.69900668333875,1.13262484147708,0.08036313748930535,-0.8205143428086027,-8.555546781003143,1.312816098213973,0.15371352493079662,-0.706081953268816,-5.236815071670644,1.5308906163491611,0.22871617471287062,-0.6027883012154034,-3.74382166635318,1.803378966830446,0.3062465578834538,-0.5081398192758925,-2.8879745574341644,2.1577794025085377,0.3872956941463709,-0.42021328395926233,-2.328320053757099,2.6435315333450324,0.4730249054381147,-0.3374826952564432,-1.9302354259719192,3.359449086627489,0.5648390948670113,-0.25870146273737954,-1.6298376733939888,4.53601655424335,0.6644890733793195,-0.18281928843731998,-1.3928947330867416,6.864573644421058,0.7742198541219985,-0.10892113967355563,-1.1993933842239324,13.80160264246639,0.8969932774951432,-0.036180254390186274,-1.0368345457453163,-3.1896951861709707e13],"x":[37.69911184307752,38.466427766476826,39.233743689876135,40.001059613275444,40.76837553667475,41.53569146007406,42.30300738347337,43.07032330687268,43.83763923027199,44.6049551536713,45.37227107707061,46.139587000469916,46.906902923869225,47.674218847268534,48.44153477066784,49.20885069406715,49.97616661746646,50.74348254086577,51.51079846426508,52.27811438766439,53.0454303110637,53.812746234463006,54.580062157862315,55.34737808126162,56.114694004660926,56.882009928060235,57.649325851459544,58.41664177485885,59.18395769825816,59.95127362165747,60.71858954505678,61.48590546845609,62.2532213918554,63.02053731525471,63.787853238654016,64.55516916205333,65.32248508545264,66.08980100885195,66.85711693225126,67.62443285565057,68.39174877904988,69.15906470244919,69.9263806258485,70.6936965492478,71.46101247264711,72.22832839604642,72.99564431944572,73.76296024284503,74.53027616624433,75.29759208964364,76.06490801304295,76.83222393644226,77.59953985984157,78.36685578324088,79.13417170664019,79.9014876300395,80.6688035534388,81.43611947683812,82.20343540023742,82.97075132363673,83.73806724703604,84.50538317043535,85.27269909383466,86.04001501723397,86.80733094063328,87.57464686403259,88.3419627874319,89.1092787108312,89.87659463423051,90.64391055762982,91.41122648102913,92.17854240442844,92.94585832782775,93.71317425122706,94.48049017462637,95.24780609802568,96.01512202142499,96.7824379448243,97.5497538682236,98.31706979162291,99.08438571502222,99.85170163842153,100.61901756182084,101.38633348522015,102.15364940861946,102.92096533201877,103.68828125541808,104.45559717881738,105.2229131022167,105.990229025616,106.75754494901531,107.52486087241462,108.29217679581393,109.05949271921324,109.82680864261255,110.59412456601186,111.36144048941117,112.12875641281047,112.89607233620978,113.66338825960909,114.4307041830084,115.19802010640771,115.96533602980702,116.73265195320633,117.49996787660564,118.26728380000495,119.03459972340426,119.80191564680356,120.56923157020287,121.33654749360218,122.10386341700149,122.8711793404008,123.63849526380011,124.40581118719942,125.17312711059873,125.94044303399804,126.70775895739735,127.47507488079665,128.24239080419596,129.00970672759527,129.77702265099458,130.5443385743939,131.3116544977932,132.0789704211925,132.84628634459182,133.61360226799113,134.38091819139044,135.14823411478974,135.91555003818905,136.68286596158836,137.45018188498767,138.21749780838698,138.9848137317863,139.7521296551856,140.5194455785849,141.28676150198422,142.05407742538353,142.82139334878283,143.58870927218214,144.35602519558145,145.12334111898076,145.89065704238007,146.65797296577938,147.4252888891787,148.192604812578,148.9599207359773,149.72723665937662,150.49455258277592,151.26186850617523,152.02918442957454,152.79650035297385,153.56381627637316,154.33113219977247,155.09844812317178,155.8657640465711,156.6330799699704,157.4003958933697,158.167711816769,158.93502774016832,159.70234366356763,160.46965958696694,161.23697551036625,162.00429143376556,162.77160735716487,163.53892328056418,164.3062392039635,165.0735551273628,165.8408710507621,166.6081869741614,167.37550289756072,168.14281882096003,168.91013474435934,169.67745066775865,170.44476659115796,171.21208251455727,171.97939843795658,172.74671436135588,173.5140302847552,174.2813462081545,175.0486621315538,175.81597805495312,176.58329397835243,177.3506099017517,178.11792582515102,178.88524174855033,179.65255767194964,180.41987359534895,181.18718951874826,181.95450544214756,182.72182136554687,183.48913728894618,184.2564532123455,185.0237691357448,185.7910850591441,186.55840098254342,187.32571690594273,188.09303282934204,188.86034875274134,189.62766467614065,190.39498059953996,191.16229652293927,191.92961244633858,192.6969283697379,193.4642442931372,194.2315602165365,194.99887613993582,195.76619206333513,196.53350798673443,197.30082391013374,198.06813983353305,198.83545575693236,199.60277168033167,200.37008760373098,201.1374035271303,201.9047194505296,202.6720353739289,203.43935129732822,204.20666722072752,204.97398314412683,205.74129906752614,206.50861499092545,207.27593091432476,208.04324683772407,208.81056276112338,209.5778786845227,210.345194607922,211.1125105313213,211.87982645472061,212.64714237811992,213.41445830151923,214.18177422491854,214.94909014831785,215.71640607171716,216.48372199511647,217.25103791851578,218.0183538419151,218.7856697653144,219.5529856887137,220.320301612113,221.08761753551232,221.85493345891163,222.62224938231094,223.38956530571025,224.15688122910956,224.92419715250887,225.69151307590818,226.45882899930749,227.2261449227068,227.9934608461061,228.7607767695054,229.52809269290472,230.29540861630403,231.06272453970334,231.83004046310265,232.59735638650196,233.36467230990127,234.13198823330058,234.89930415669988,235.6666200800992,236.4339360034985,237.2012519268978,237.96856785029712,238.73588377369643,239.50319969709574,240.27051562049505,241.03783154389436,241.80514746729366,242.57246339069297,243.33977931409228,244.1070952374916,244.8744111608909,245.6417270842902,246.40904300768952,247.17635893108883,247.94367485448814,248.71099077788745,249.47830670128675,250.24562262468606,251.01293854808537,251.78025447148468,252.547570394884,253.3148863182833,254.0822022416826,254.84951816508192,255.61683408848123,256.38415001188054,257.1514659352798,257.91878185867915,258.68609778207843,259.4534137054778,260.22072962887705,260.9880455522764,261.75536147567567,262.522677399075,263.2899933224743,264.0573092458736,264.8246251692729,265.59194109267224,266.3592570160715,267.12657293947086,267.89388886287014,268.6612047862695,269.42852070966876,270.1958366330681,270.9631525564674,271.7304684798667,272.497784403266,273.26510032666533,274.0324162500646,274.79973217346395,275.56704809686323,276.33436402026257,277.10167994366185,277.8689958670612,278.63631179046047,279.4036277138598,280.1709436372591,280.9382595606584,281.7055754840577,282.47289140745704,283.2402073308563,284.00752325425566,284.77483917765494,285.5421551010543,286.30947102445356,287.0767869478529,287.8441028712522,288.6114187946515,289.3787347180508,290.14605064145013,290.9133665648494,291.68068248824875,292.44799841164803,293.21531433504737,293.98263025844665,294.749946181846,295.51726210524527,296.2845780286446,297.0518939520439,297.8192098754432,298.5865257988425,299.35384172224184,300.1211576456411,300.88847356904046,301.65578949243974,302.4231054158391,303.19042133923836,303.9577372626377,304.725053186037,305.4923691094363,306.2596850328356,307.02700095623493,307.7943168796342,308.56163280303355,309.3289487264328,310.09626464983216,310.86358057323145,311.6308964966308,312.39821242003006,313.1655283434294,313.9328442668287,314.700160190228,315.4674761136273,316.23479203702664,317.0021079604259,317.76942388382525,318.53673980722454,319.3040557306239,320.07137165402315,320.8386875774225,321.60600350082177,322.3733194242211,323.1406353476204,323.9079512710197,324.675267194419,325.44258311781834,326.2098990412176,326.97721496461696,327.74453088801624,328.5118468114156,329.27916273481486,330.0464786582142,330.8137945816135,331.5811105050128,332.3484264284121,333.11574235181143,333.8830582752107,334.65037419861005,335.41769012200933,336.18500604540867,336.95232196880795,337.7196378922073,338.48695381560657,339.2542697390059,340.0215856624052,340.7889015858045,341.5562175092038,342.32353343260314,343.0908493560024,343.85816527940176,344.62548120280104,345.3927971262004,346.16011304959966,346.927428972999,347.6947448963983,348.4620608197976,349.2293767431969,349.99669266659623,350.7640085899955,351.53132451339485,352.29864043679413,353.06595636019347,353.83327228359275,354.6005882069921,355.36790413039137,356.1352200537907,356.90253597719,357.6698519005893,358.4371678239886,359.20448374738794,359.9717996707872,360.73911559418656,361.50643151758584,362.2737474409852,363.04106336438446,363.8083792877838,364.5756952111831,365.3430111345824,366.1103270579817,366.87764298138103,367.6449589047803,368.41227482817965,369.1795907515789,369.94690667497827,370.71422259837755,371.4815385217769,372.24885444517616,373.0161703685755,373.7834862919748,374.5508022153741,375.3181181387734,376.08543406217274,376.852749985572,377.62006590897136,378.38738183237064,379.15469775577,379.92201367916925,380.6893296025686,381.4566455259679,382.2239614493672,382.9912773727665,383.7585932961658,384.5259092195651,385.29322514296445,386.0605410663637,386.827856989763,387.59517291316234,388.3624888365616,389.12980475996096,389.89712068336024,390.6644366067596,391.43175253015886,392.1990684535582,392.9663843769575,393.7337003003568,394.5010162237561,395.26833214715543,396.0356480705547,396.80296399395405,397.57027991735333,398.33759584075267,399.10491176415195,399.8722276875513,400.63954361095057,401.4068595343499,402.1741754577492,402.9414913811485,403.7088073045478,404.47612322794714,405.2434391513464,406.01075507474576,406.77807099814504,407.5453869215444,408.31270284494366,409.080018768343,409.8473346917423,410.6146506151416,411.3819665385409,412.14928246194023,412.9165983853395,413.68391430873885,414.45123023213813,415.21854615553747,415.98586207893675,416.7531780023361,417.52049392573537,418.2878098491347,419.055125772534,419.8224416959333,420.5897576193326,421.35707354273194,422.1243894661312,422.89170538953056,423.65902131292984,424.4263372363292,425.19365315972846,425.9609690831278,426.7282850065271,427.4956009299264,428.2629168533257,429.03023277672503,429.7975487001243,430.56486462352365,431.3321805469229,432.09949647032226,432.86681239372155,433.6341283171209,434.40144424052016,435.1687601639195,435.9360760873188,436.7033920107181,437.4707079341174,438.23802385751674,439.005339780916,439.77265570431535,440.53997162771464,441.307287551114,442.07460347451325,442.8419193979126,443.60923532131187,444.3765512447112,445.1438671681105,445.9111830915098,446.6784990149091,447.44581493830844,448.2131308617077,448.98044678510706,449.74776270850634,450.5150786319057,451.28239455530496,452.0497104787043,452.8170264021036,453.5843423255029,454.3516582489022,455.11897417230153,455.8862900957008,456.65360601910015,457.42092194249943,458.18823786589877,458.95555378929805,459.7228697126974,460.49018563609667,461.257501559496,462.0248174828953,462.7921334062946,463.5594493296939,464.32676525309324,465.0940811764925,465.86139709989186,466.62871302329114,467.3960289466905,468.16334487008976,468.9306607934891,469.6979767168884,470.4652926402877,471.232608563687,471.99992448708633,472.7672404104856,473.53455633388495,474.30187225728423,475.06918818068357,475.83650410408285,476.6038200274822,477.37113595088147,478.1384518742808,478.9057677976801,479.6730837210794,480.4403996444787,481.20771556787804,481.9750314912773,482.74234741467666,483.50966333807594,484.2769792614753,485.04429518487456,485.8116111082739,486.5789270316732,487.3462429550725,488.1135588784718,488.88087480187113,489.6481907252704,490.41550664866975,491.182822572069,491.95013849546837,492.71745441886765,493.484770342267,494.25208626566626,495.0194021890656,495.7867181124649,496.5540340358642,497.3213499592635,498.08866588266284,498.8559818060621,499.62329772946146,500.39061365286074,501.1579295762601,501.92524549965935,502.6925614230587,503.459877346458,504.2271932698573,504.9945091932566,505.7618251166559,506.5291410400552,507.29645696345455,508.0637728868538,508.83108881025316,509.59840473365244,510.3657206570518,511.13303658045106,511.9003525038504,512.6676684272497,513.434984350649,514.2023002740483,514.9696161974476,515.736932120847,516.5042480442462,517.2715639676455,518.0388798910449,518.8061958144442,519.5735117378434,520.3408276612428,521.1081435846421,521.8754595080414,522.6427754314407,523.41009135484,524.1774072782393,524.9447232016387,525.7120391250379,526.4793550484372,527.2466709718366,528.0139868952358,528.7813028186351,529.5486187420345,530.3159346654338,531.083250588833,531.8505665122324,532.6178824356317,533.385198359031,534.1525142824303,534.9198302058296,535.687146129229,536.4544620526283,537.2217779760275,537.9890938994268,538.7564098228262,539.5237257462255,540.2910416696247,541.0583575930241,541.8256735164234,542.5929894398228,543.360305363222,544.1276212866213,544.8949372100207,545.66225313342,546.4295690568192,547.1968849802186,547.9642009036179,548.7315168270172,549.4988327504165,550.2661486738158,551.0334645972151,551.8007805206145,552.5680964440137,553.335412367413,554.1027282908124,554.8700442142117,555.6373601376109,556.4046760610103,557.1719919844096,557.9393079078089,558.7066238312082,559.4739397546075,560.2412556780068,561.0085716014062,561.7758875248054,562.5432034482047,563.3105193716041,564.0778352950034,564.8451512184026,565.612467141802,566.3797830652013,567.1470989886006,567.9144149119999,568.6817308353992,569.4490467587985,570.2163626821979,570.9836786055971,571.7509945289964,572.5183104523958,573.2856263757951,574.0529422991943,574.8202582225937,575.587574145993,576.3548900693924,577.1222059927916,577.8895219161909,578.6568378395903,579.4241537629896,580.1914696863888,580.9587856097882,581.7261015331875,582.4934174565868,583.260733379986,584.0280493033854,584.7953652267847,585.5626811501841,586.3299970735833,587.0973129969826,587.864628920382,588.6319448437813,589.3992607671805,590.1665766905799,590.9338926139792,591.7012085373785,592.4685244607778,593.2358403841771,594.0031563075764,594.7704722309758,595.537788154375,596.3051040777743,597.0724200011737,597.839735924573,598.6070518479722,599.3743677713716,600.1416836947709,600.9089996181702,601.6763155415695,602.4436314649688,603.2109473883681,603.9782633117675,604.7455792351667,605.512895158566,606.2802110819654,607.0475270053647,607.8148429287639,608.5821588521633,609.3494747755626,610.116790698962,610.8841066223612,611.6514225457605,612.4187384691598,613.1860543925592,613.9533703159584,614.7206862393577,615.4880021627571,616.2553180861564,617.0226340095556,617.789949932955,618.5572658563543,619.3245817797537,620.0918977031529,620.8592136265522,621.6265295499516,622.3938454733509,623.1611613967501,623.9284773201495,624.6957932435488,625.4631091669481,626.2304250903474,626.9977410137467,627.765056937146,628.5323728605454,629.2996887839446,630.0670047073439,630.8343206307433,631.6016365541426,632.3689524775418,633.1362684009412,633.9035843243405,634.6709002477398,635.4382161711391,636.2055320945384,636.9728480179377,637.7401639413371,638.5074798647363,639.2747957881356,640.042111711535,640.8094276349343,641.5767435583335,642.3440594817329,643.1113754051322,643.8786913285315,644.6460072519308,645.4133231753301,646.1806390987294,646.9479550221288,647.715270945528,648.4825868689273,649.2499027923267,650.017218715726,650.7845346391252,651.5518505625246,652.3191664859239,653.0864824093233,653.8537983327225,654.6211142561218,655.3884301795212,656.1557461029205,656.9230620263197,657.690377949719,658.4576938731184,659.2250097965177,659.992325719917,660.7596416433163,661.5269575667156,662.294273490115,663.0615894135142,663.8289053369135,664.5962212603129,665.3635371837121,666.1308531071114,666.8981690305108,667.6654849539101,668.4328008773093,669.2001168007087,669.967432724108,670.7347486475073,671.5020645709066,672.2693804943059,673.0366964177052,673.8040123411046,674.5713282645038,675.3386441879031,676.1059601113025,676.8732760347018,677.640591958101,678.4079078815004,679.1752238048997,679.942539728299,680.7098556516983,681.4771715750976,682.2444874984969,683.0118034218963,683.7791193452955,684.5464352686948,685.3137511920942,686.0810671154935,686.8483830388927,687.6156989622921,688.3830148856914,689.1503308090907,689.91764673249,690.6849626558893,691.4522785792886,692.219594502688,692.9869104260872,693.7542263494865,694.5215422728859,695.2888581962852,696.0561741196844,696.8234900430838,697.5908059664831,698.3581218898825,699.1254378132817,699.892753736681,700.6600696600804,701.4273855834797,702.1947015068789,702.9620174302783,703.7293333536776,704.4966492770769,705.2639652004762,706.0312811238755,706.7985970472748,707.5659129706742,708.3332288940734,709.1005448174727,709.8678607408721,710.6351766642714,711.4024925876706,712.16980851107,712.9371244344693,713.7044403578686,714.4717562812679,715.2390722046672,716.0063881280665,716.7737040514659,717.5410199748651,718.3083358982644,719.0756518216638,719.8429677450631,720.6102836684623,721.3775995918617,722.144915515261,722.9122314386603,723.6795473620596,724.4468632854589,725.2141792088582,725.9814951322576,726.7488110556568,727.5161269790561,728.2834429024555,729.0507588258548,729.818074749254,730.5853906726534,731.3527065960527,732.120022519452,732.8873384428513,733.6546543662506,734.42197028965,735.1892862130493,735.9566021364485,736.7239180598478,737.4912339832472,738.2585499066465,739.0258658300457,739.7931817534451,740.5604976768444,741.3278136002438,742.095129523643,742.8624454470423,743.6297613704417,744.397077293841,745.1643932172402,745.9317091406396,746.6990250640389,747.4663409874382,748.2336569108375,749.0009728342368,749.7682887576361,750.5356046810355,751.3029206044347,752.070236527834,752.8375524512334,753.6048683746327,754.3721842980319,755.1395002214313,755.9068161448306,756.6741320682299,757.4414479916292,758.2087639150285,758.9760798384278,759.7433957618272,760.5107116852264,761.2780276086257,762.0453435320251,762.8126594554244,763.5799753788236,764.347291302223,765.1146072256223,765.8819231490216,766.6492390724209,767.4165549958202,768.1838709192195,768.9511868426189,769.7185027660181,770.4858186894174,771.2531346128168,772.0204505362161,772.7877664596153,773.5550823830147,774.322398306414,775.0897142298134,775.8570301532126,776.6243460766119,777.3916620000113,778.1589779234106,778.9262938468098,779.6936097702092,780.4609256936085,781.2282416170078,781.995557540407,782.7628734638064,783.5301893872057,784.2975053106051,785.0648212340043,785.8321371574036,786.599453080803,787.3667690042023,788.1340849276015,788.9014008510009,789.6687167744002,790.4360326977995,791.2033486211988,791.9706645445981,792.7379804679974,793.5052963913968,794.272612314796,795.0399282381953,795.8072441615947,796.574560084994,797.3418760083932,798.1091919317926,798.8765078551919,799.6438237785912,800.4111397019905,801.1784556253898,801.9457715487891,802.7130874721885,803.4804033955877,804.247719318987]}
},{}],73:[function(require,module,exports){
module.exports={"expected":[2.0414049191494212e15,-39.74056071696158,-19.857698754422188,-13.224481554325878,-9.903670225981921,-7.907815278427616,-6.574432111624989,-5.619597512944586,-4.901348779279158,-4.3408167559290165,-3.8906790504828246,-3.5208205830205457,-3.2111638597428054,-2.9478083496766616,-2.720824412874161,-2.5229296560263013,-2.3486616534487275,-2.193842647646385,-2.0552226817894663,-1.93023542597221,-1.8168272543724082,-1.7133351562839245,-1.6183979429085578,-1.5308906163490434,-1.4498751450921132,-1.3745630520920546,-1.304286635063451,-1.2384765809234415,-1.176644375762618,-1.1183683527153387,-1.0632825287937901,-1.0110676008222739,-0.9614436280655785,-0.9141640436589925,-0.8690107211478264,-0.8257898849923682,-0.7843287008040442,-0.7444724165769756,-0.706081953268785,-0.669031863921447,-0.6332085966602209,-0.5985090095099133,-0.5648390948670065,-0.5321128792917152,-0.500251470506888,-0.4691822284667445,-0.43883804135853594,-0.4091566906315924,-0.38008029177086633,-0.35155479966959224,-0.3235295692048976,-0.2959569630566094,-0.26879199999278836,-0.24199203782279882,-0.21551648602744777,-0.18932654374574256,-0.16338495935299016,-0.1376558083243921,-0.11210428645732548,-0.08669651583633291,-0.06139936117742547,-0.03618025439016124,-0.01100702535340015,0.01415226298185046,0.03932947696801257,0.06455657387350287,0.08986576447669117,0.11528967840387504,0.14086153402501378,0.16661531480644326,0.19258595414209498,0.21880953084741456,0.24532347770809554,0.2721668057350284,0.2993803470957402,0.32700702008090504,0.35509211993501494,0.38368363994869276,0.4128326278960711,0.44259358372868174,0.47302490543810677,0.5041893912117629,0.5361548074781598,0.5689945342311834,0.6027883012153739,0.6376230312454771,0.6735938102513855,0.7108050077492725,0.7493715765552921,0.7894205669599157,0.8310928986372023,0.8745454437621958,0.9199534878027232,0.9675136511155124,1.017447375999372,1.070005111866527,1.1254713679328852,1.1841708514313944,1.2464759742335538,1.3128160982138743,1.383689008782788,1.4596752699982685,1.5414563431707264,1.6298376733942102,1.725778410006193,1.830430097560792,1.9451876642316412,2.071757523521164,2.2122498882265185,2.3693059730275787,2.546276503964804,2.7474774194546208,2.9785647311464607,3.247098786300564,3.5634198453967993,3.9420556542131515,4.404080611733665,4.981272396934458,5.72389619448756,6.716438764996304,8.112707521241074,10.225276556886204,13.801602642460294,21.183712399929966,45.42003008487766,-317.99052805116,-35.322962650378464,-18.68756326619027,-12.693446102187908,-9.601491399806811,-7.712866320330305,-6.438178470541269,-5.518921194023205,-4.823851568442586,-4.279256841175977,-3.8405444569811524,-3.4791543163872474,-3.1759474408415693,-2.9176169609660345,-2.694623639433702,-2.499950358676513,-2.3283200537575053,-2.1756876529164755,-2.038900202082177,-1.915463615764222,-1.8033789668303037,-1.7010252726363646,-1.6070740667359746,-1.520426134521284,-1.440163981741093,-1.3655156525337766,-1.2958268558808215,-1.2305392562921271,-1.169173394430534,-1.1113151248118869,-1.056604753241864,-1.0047282667217667,-0.9554101997728586,-0.9084077912606352,-0.8635061668847548,-0.8205143428085712,-0.7792618911837298,-0.7395961426291426,-0.7013798269276504,-0.6644890733793167,-0.6288117078984989,-0.5942457961646064,-0.5606983917455747,-0.5280844557154168,-0.4963259203367317,-0.46535087421964727,-0.43509285026269834,-0.405490200828264,-0.3764855471612778,-0.34802529214388633,-0.32005918718530446,-0.2925399454476673,-0.26542289476411085,-0.23866566455939447,-0.21222790187351576,-0.1860710122430154,-0.16015792173704987,-0.13445285689392378,-0.10892113967353032,-0.08352899484444393,-0.05824336746998342,-0.0330317483538528,-0.007862005457924958,0.017297780582231526,0.04247947864201169,0.0677150687475297,0.0930368049154684,0.11847738096018098,0.14407010109051693,0.1698490572088954,0.19584931495207716,0.22210711068135705,0.2486600618436062,0.2755473933911333,0.30281018327500236,0.3304916304245462,0.3586373491073775,0.38729569414636345,0.4165181221720356,0.4463595949369223,0.4768790317430871,0.508139819275863,0.5402103886453928,0.5731648712757993,0.6070838475309198,0.642055204727191,0.6781751245915321,0.7155492244442514,0.754293881646795,0.7945377774400825,0.8364237045939993,0.8801106937968856,0.9257765271127042,0.9736207240318437,1.0238681078753828,1.0767730892746412,1.1326248414769933,1.1917535925942102,1.2545383272204387,1.3214162806862506,1.3928947330869144,1.4695657810379916,1.5521250035010534,1.6413952750584673,1.7383574632359962,1.8441904498956256,1.960323957787578,2.0885092322829717,2.2309150402510602,2.390260238239138,2.5700002649715086,2.7745950106379285,3.0099027405147036,3.2837751692037815,3.6069846673764796,3.9947220552138263,4.469121451990613,5.063739845504079,5.8320184983165895,6.864573644419526,8.328328062301258,10.56825316049016,14.431093789263265,22.699006683372264,52.9923064255311,-158.9936916516889,-31.788674480628327,-17.647326227131508,-12.203178696988283,-9.317025870833426,-7.527150396208444,-6.307332644739759,-5.421679857736861,-4.748670456675028,-4.219331772124883,-3.7916064175205784,-3.4383899287139634,-3.141427517396883,-2.8879745574347564,-2.6688631808822505,-2.477329556237031,-2.3082741703799816,-2.157779402508349,-2.022785702668162,-1.90086870042992,-1.790082354216075,-1.6888463866518402,-1.5958640731933567,-1.5100612453456552,-1.4305403846009974,-1.3565456234587312,-1.2874357448945597,-1.2226631255515032,-1.1617571497871082,-1.1043110245397214,-1.0499712079535262,-0.9984288661816262,-0.9494129180381581,-0.9026843331048316,-0.858031426994672,-0.8152659556316675,-0.7742198541219953,-0.7347424989451449,-0.6966983975447897,-0.6599652289357248,-0.6244321741104846,-0.589998486885139,-0.5565722651530512,-0.5240693899008874,-0.49241260522291375,-0.46153071727909484,-0.43135789393291624,-0.4018330498709121,-0.37289930449650643,-0.34450350192339,-0.3165957840579776,-0.28912920912884543,-0.2620594091485737,-0.23534428072563046,-0.20894370441519,-0.18281928843729417,-0.1569341331201613,-0.1312526128646065,-0.1057401727864725,-0.08036313748929722,-0.05508852965885688,-0.029883896361279878,-0.004717141073701644,0.02044364041566025,0.0456303220285431,0.07087490909088576,0.09620970144608983,0.12166745975968782,0.1472815768471205,0.17308625595093793,0.1991166980256303,0.22540930026177272,0.25200186830139576,0.27893384486967776,0.3062465578834467,0.3339834915043299,0.3621905840979857,0.3909165576563769,0.42021328395923485,0.4501361936186847,0.48074473520089556,0.5121028928905659,0.5442797727099986,0.5773502691896263,0.611395826693432,0.6465053124376562,0.6827760217395609,0.7203148403720983,0.7592395943078865,0.7996806239129299,0.8417826281908033,0.8857068355071563,0.931633571042147,0.9797653089711366,1.0303303203449603,1.0835870575924407,1.1398294559379485,1.1993933842240756,1.2626645474731808,1.3300882378958063,1.4021814599226439,1.4795481327979991,1.5628983230275781,1.6530728112557842,1.7510748041557749,1.858111339977358,1.9756480311095161,2.1054824407271044,2.2498439395482905,2.41153190588706,2.59411062143856,2.8021899909714416,3.041839671547946,3.3212169439797674,3.65154914502021,4.04872852273538,4.536016554242586,5.1488762487366,5.944180873178278,7.0192453156126255,8.55554678100796,10.93481077217994,15.12043644950203,24.44726177048181,63.59307394414651,-105.99404734317416,-28.896793494239247,-16.71647734049897,-11.74914954002159,-9.048755340484863,-7.350023324762952,-6.181576511153446,-5.327698827533019,-4.675701721501252,-4.160976138273184,-3.7438216663541306,-3.3984976707850136,-3.107582966399697,-2.8588657297368782,-2.643531533344765,-2.455058487358272,-2.288517213433062,-2.1401125530570035,-2.006874920897272,-1.8864472378237849,-1.7769346063599927,-1.6767961812718897,-1.5847660345173924,-1.4997943316854334,-1.421002986811641,-1.3476518014617243,-1.279112305451277,-1.2148473297525006,-1.1543948973952725,-1.0973554033038904,-1.0433813250314041,-0.9921688996294254,-0.9434513414379959,-0.8969932774951397,-0.8525861524964798,-0.8100444113256821,-0.7692023093871143,-0.729911233017916,-0.6920374367849406,-0.6554601233932026,-0.6200698066338204,-0.58576690930199,-0.5524605570727188,-0.5200675364986493,-0.48851139101275465,-0.45772163340102495,-0.42763305690063297,-0.39818513006544654,-0.36932146296880786,-0.3409893342950882,-0.31313927049577284,-0.2857246695208174,-0.25870146273735667,-0.2320278095577226,-0.20566382005254089,-0.17957130144886396,-0.15371352493078835,-0.12805500958745872,-0.10256132070566236,-0.07719887989217628,-0.051934784743633965,-0.02673663596647702,-0.001572369991303545,0.02358990477033056,0.048782069810773154,0.07403615830214202,0.09938451851074336,0.12485998062780905,0.15049602885832827,0.17632698070846564,0.2023881755492218,0.22871617471286376,0.2553489756050122,0.2823262425960092,0.3096895577985626,0.3374826952564171,0.365751922573732,0.39454633462502514,0.4239182247213393,0.45392349949737926,0.48462214485916044,0.5160787516352258,0.548363111158671,0.5815508929401898,0.6157244189586838,0.6509735520054675,0.6873967191113906,0.7251020955445545,0.7642089804275043,0.8048494019957755,0.8471699993148681,0.8913342384322283,0.9375250351934835,0.9859478752780688,1.0368345457454384,1.0904476233615807,1.1470859057384903,1.2070910254244398,1.2708555595639575,1.338833045811262,1.411550449269492,1.489623810672084,1.5737780656438562,1.664872393181627,1.7639329814894282,1.8721958739143458,1.991163709176699,2.1226819137116797,2.2690425986294995,2.433128673150909,2.6186175894607575,2.830275639063556,3.0743935095720394,3.359449086627054,3.697148997791852,4.104127971540632,4.6048477415091025,5.236815071672387,6.060616417390306,7.180899486243992,8.795330209557061,11.327475946083627,15.878608368059583,26.48671788085464,79.49370104697135,-79.49370104698373,-26.48671788085602,-15.878608368060076,-11.327475946083881,-8.795330209557216,-7.180899486244095,-6.06061641739038,-5.236815071672443,-4.604847741509146,-4.1041279715406676,-3.6971489977918806,-3.359449086627078,-3.07439350957206,-2.830275639063574,-2.618617589460773,-2.4331286731509225,-2.2690425986295115,-2.1226819137116903,-1.9911637091767087,-1.8721958739143545,-1.763932981489436,-1.6648723931816343,-1.573778065643863,-1.4896238106720905,-1.411550449269498,-1.3388330458112674,-1.2708555595639626,-1.2070910254244445,-1.147085905738495,-1.0904476233615852,-1.0368345457454424,-0.9859478752780727,-0.9375250351934872,-0.8913342384322318,-0.8471699993148715,-0.8048494019957786,-0.7642089804275074,-0.7251020955445575,-0.6873967191113934,-0.6509735520054702,-0.6157244189586865,-0.5815508929401924,-0.5483631111586735,-0.5160787516352283,-0.48462214485916283,-0.45392349949738164,-0.42391822472134155,-0.3945463346250274,-0.36575192257373423,-0.3374826952564193,-0.3096895577985648,-0.2823262425960113,-0.2553489756050143,-0.22871617471286587,-0.20238817554922384,-0.17632698070846767,-0.15049602885833027,-0.12485998062781103,-0.09938451851074533,-0.074036158302144,-0.04878206981077512,-0.02358990477033252,0.0015723699913015856,0.02673663596647506,0.051934784743631994,0.0771988798921743,0.10256132070566037,0.12805500958745672,0.15371352493078635,0.17957130144886194,0.20566382005253886,0.23202780955772054,0.25870146273735456,0.2857246695208152,0.3131392704957707,0.34098933429508604,0.36932146296880564,0.3981851300654443,0.4276330569006307,0.4577216334010226,0.4885113910127522,0.5200675364986468,0.5524605570727162,0.5857669093019874,0.6200698066338177,0.6554601233931998,0.6920374367849378,0.729911233017913,0.7692023093871112,0.8100444113256788,0.8525861524964764,0.8969932774951362,0.9434513414379923,0.9921688996294216,1.0433813250314,1.097355403303886,1.154394897395268,1.2148473297524958,1.2791123054512716,1.347651801461719,1.421002986811635,1.499794331685427,1.5847660345173857,1.6767961812718821,1.7769346063599842,1.8864472378237758,2.006874920897262,2.1401125530569924,2.28851721343305,2.4550584873582584,2.6435315333447496,2.85886572973686,3.107582966399676,3.3984976707849888,3.7438216663541013,4.160976138273147,4.675701721501207,5.327698827532962,6.18157651115337,7.3500233247628435,9.0487553404847,11.749149540021316,16.716477340498418,28.89679349423761,105.99404734315216,-63.59307394415444,-24.447261770482985,-15.120436449502478,-10.934810772180175,-8.555546781008104,-7.019245315612724,-5.94418087317835,-5.148876248736654,-4.536016554242629,-4.048728522735414,-3.651549145020238,-3.3212169439797905,-3.041839671547966,-2.8021899909714594,-2.594110621438575,-2.411531905887074,-2.2498439395483025,-2.105482440727115,-1.9756480311095257,-1.8581113399773668,-1.7510748041557826,-1.6530728112557915,-1.562898323027585,-1.4795481327980056,-1.4021814599226499,-1.3300882378958117,-1.262664547473186,-1.1993933842240805,-1.139829455937953,-1.083587057592445,-1.0303303203449643,-0.9797653089711404,-0.9316335710421506,-0.8857068355071599,-0.8417826281908067,-0.7996806239129333,-0.7592395943078896,-0.7203148403721011,-0.6827760217395636,-0.646505312437659,-0.6113958266934346,-0.5773502691896288,-0.5442797727100013,-0.5121028928905684,-0.4807447352008979,-0.4501361936186871,-0.4202132839592372,-0.3909165576563792,-0.36219058409798793,-0.33398349150433204,-0.30624655788344884,-0.27893384486967987,-0.25200186830139787,-0.2254093002617748,-0.1991166980256323,-0.17308625595093996,-0.14728157684712254,-0.12166745975968982,-0.0962097014460918,-0.07087490909088773,-0.04563032202854507,-0.02044364041566221,0.004717141073699685,0.029883896361277917,0.055088529658854926,0.08036313748929524,0.10574017278647053,0.1312526128646045,0.1569341331201593,0.18281928843729214,0.20894370441518795,0.23534428072562838,0.26205940914857156,0.2891292091288433,0.3165957840579755,0.34450350192338786,0.37289930449650416,0.4018330498709099,0.43135789393291396,0.46153071727909245,0.49241260522291125,0.5240693899008848,0.5565722651530487,0.5899984868851365,0.6244321741104818,0.659965228935722,0.6966983975447868,0.7347424989451419,0.7742198541219922,0.8152659556316643,0.8580314269946688,0.9026843331048282,0.9494129180381545,0.9984288661816222,1.049971207953522,1.1043110245397172,1.1617571497871035,1.2226631255514984,1.2874357448945546,1.3565456234587256,1.4305403846009914,1.5100612453456486,1.5958640731933496,1.6888463866518324,1.7900823542160669,1.900868700429911,2.0227857026681524,2.157779402508338,2.308274170379969,2.477329556237017,2.6688631808822345,2.8879745574347377,3.1414275173968615,3.4383899287139377,3.791606417520548,4.219331772124846,4.748670456674982,5.421679857736802,6.307332644739679,7.527150396208331,9.317025870833255,12.203178696987989,17.647326227130897,31.78867448062634,158.99369165163932,-52.992306425536604,-22.699006683373277,-14.431093789263672,-10.568253160490382,-8.328328062301397,-6.86457364441962,-5.832018498316657,-5.063739845504131,-4.469121451990654,-3.994722055213859,-3.606984667376507,-3.2837751692038046,-3.009902740514723,-2.774595010637946,-2.5700002649715232,-2.3902602382391507,-2.230915040251072,-2.0885092322829824,-1.9603239577875873,-1.8441904498956345,-1.738357463236004,-1.6413952750584748,-1.55212500350106,-1.4695657810379978,-1.3928947330869204,-1.3214162806862462,-1.254538327220453,-1.1917535925942149,-1.1326248414769977,-1.0767730892746377,-1.0238681078753942,-0.9736207240318476,-0.9257765271127079,-0.8801106937968827,-0.8364237045940088,-0.7945377774400915,-0.754293881646798,-0.7155492244442544,-0.6781751245915296,-0.6420552047271988,-0.6070838475309225,-0.5731648712758018,-0.5402103886453908,-0.50813981927587,-0.47687903174308954,-0.4463595949369247,-0.4165181221720337,-0.3872956941463616,-0.3586373491073837,-0.3304916304245484,-0.3028101832750045,-0.27554739339113166,-0.248660061843612,-0.2221071106813591,-0.19584931495207916,-0.16984905720889376,-0.14407010109052257,-0.11847738096018298,-0.09303680491547037,-0.0677150687475281,-0.04247947864201009,-0.017297780582237042,0.007862005457923,0.03303174835385084,0.05824336746998502,0.08352899484443838,0.10892113967352833,0.13445285689392178,0.1601579217370515,0.18607101224300968,0.2122279018735137,0.2386656645593924,0.26542289476410874,0.29253994544766904,0.3200591871852984,0.3480252921438841,0.3764855471612755,0.40549020082826587,0.4350928502626918,0.46535087421964483,0.4963259203367292,0.528084455715419,0.5606983917455675,0.5942457961646037,0.6288117078984963,0.664489073379314,0.7013798269276529,0.7395961426291342,0.7792618911837266,0.8205143428085678,0.8635061668847575,0.9084077912606251,0.955410199772855,1.0047282667217627,1.0566047532418676,1.1113151248118744,1.1691733944305296,1.2305392562921222,1.2958268558808161,1.365515652533781,1.440163981741076,1.5204261345212775,1.6070740667359675,1.7010252726363706,1.8033789668302804,1.9154636157642129,2.0389002020821674,2.175687652916485,2.32832005375747,2.499950358676499,2.694623639433686,2.9176169609660163,3.175947440841587,3.479154316387198,3.8405444569811213,4.2792568411759735,4.823851568442625,5.518921194023032,6.43817847054111,7.712866320330186,9.601491399806793,12.693446102187014,18.68756326618896,35.32296265037601,317.99052805114155,-45.42003008487438,-21.183712399931647,-13.80160264246067,-10.225276556886223,-8.112707521241086,-6.716438764996558,-5.723896194487686,-4.981272396934508,-4.404080611733669,-3.942055654213243,-3.5634198453968504,-3.2470987863005862,-2.9785647311464625,-2.747477419454607,-2.5462765039648323,-2.3693059730275916,-2.2122498882265194,-2.0717575235211654,-1.945187664231668,-1.830430097560808,-1.725778410006201,-1.6298376733942108,-1.5414563431707449,-1.4596752699982802,-1.3836890087827938,-1.312816098213875,-1.2464759742335498,-1.1841708514314033,-1.1254713679328896,-1.0700051118665275,-1.0174473759993725,-0.967513651115523,-0.9199534878027301,-0.8745454437621992,-0.8310928986372026,-0.7894205669599247,-0.749371576555298,-0.7108050077492755,-0.6735938102513858,-0.6376230312454749,-0.602788301215379,-0.568994534231186,-0.5361548074781624,-0.5041893912117631,-0.47302490543811354,-0.44259358372868624,-0.41283262789607345,-0.383683639948693,-0.3550921199350211,-0.3270070200809092,-0.29938034709574235,-0.2721668057350286,-0.24532347770809385,-0.2188095308474185,-0.19258595414209698,-0.16661531480644526,-0.14086153402501397,-0.11528967840388062,-0.08986576447669493,-0.06455657387350483,-0.03932947696801275,-0.014152262981848868,0.011007025353396411,0.036180254390159275,0.06139936117742528,0.08669651583633453,0.11210428645732169,0.1376558083243901,0.16338495935298813,0.18932654374574237,0.21551648602744197,0.24199203782279488,0.26879199999278625,0.2959569630566092,0.3235295692048994,0.351554799669588,0.38008029177086405,0.40915669063159227,0.4388380413585378,0.4691822284667399,0.5002514705068833,0.5321128792917127,0.5648390948670062,0.5985090095099058,0.6332085966602157,0.6690318639214441,0.7060819532687848,0.744472416576978,0.7843287008040382,0.8257898849923648,0.8690107211478261,0.9141640436589955,0.9614436280655713,1.0110676008222663,1.0632825287937862,1.1183683527153383,1.1766443757626048,1.238476580923432,1.3042866350634457,1.3745630520920542,1.4498751450921183,1.5308906163490308,1.6183979429085509,1.7133351562839239,1.8168272543724149,1.9302354259721923,2.055222681789447,2.193842647646374,2.348661653448726,2.522929656026261,2.72082441287413,2.947808349676642,3.211163859742803,3.520820583020567,3.8906790504827637,4.340816755928978,4.901348779279154,5.619597512944638,6.574432111624746,7.907815278427378,9.903670225981728,13.224481554325846,19.85769875442001,39.740560716955684,6.804683063831404e14],"x":[-12.566370614359172,-12.591528513487019,-12.616686412614865,-12.64184431174271,-12.667002210870557,-12.692160109998403,-12.717318009126249,-12.742475908254097,-12.767633807381943,-12.792791706509789,-12.817949605637635,-12.84310750476548,-12.868265403893327,-12.893423303021173,-12.918581202149019,-12.943739101276865,-12.968897000404711,-12.994054899532557,-13.019212798660403,-13.044370697788251,-13.069528596916097,-13.094686496043943,-13.11984439517179,-13.145002294299635,-13.170160193427481,-13.195318092555327,-13.220475991683173,-13.24563389081102,-13.270791789938865,-13.295949689066711,-13.321107588194558,-13.346265487322404,-13.371423386450251,-13.396581285578097,-13.421739184705944,-13.44689708383379,-13.472054982961636,-13.497212882089482,-13.522370781217328,-13.547528680345174,-13.57268657947302,-13.597844478600866,-13.623002377728712,-13.648160276856558,-13.673318175984404,-13.698476075112252,-13.723633974240098,-13.748791873367944,-13.77394977249579,-13.799107671623636,-13.824265570751482,-13.849423469879328,-13.874581369007174,-13.89973926813502,-13.924897167262866,-13.950055066390712,-13.975212965518558,-14.000370864646406,-14.025528763774252,-14.050686662902098,-14.075844562029944,-14.10100246115779,-14.126160360285636,-14.151318259413483,-14.176476158541329,-14.201634057669175,-14.22679195679702,-14.251949855924867,-14.277107755052713,-14.302265654180559,-14.327423553308407,-14.352581452436253,-14.377739351564099,-14.402897250691945,-14.42805514981979,-14.453213048947637,-14.478370948075483,-14.503528847203329,-14.528686746331175,-14.553844645459021,-14.579002544586867,-14.604160443714713,-14.62931834284256,-14.654476241970407,-14.679634141098253,-14.7047920402261,-14.729949939353945,-14.755107838481791,-14.780265737609637,-14.805423636737483,-14.83058153586533,-14.855739434993176,-14.880897334121022,-14.906055233248868,-14.931213132376714,-14.956371031504561,-14.981528930632408,-15.006686829760254,-15.0318447288881,-15.057002628015946,-15.082160527143792,-15.107318426271638,-15.132476325399484,-15.15763422452733,-15.182792123655176,-15.207950022783022,-15.233107921910868,-15.258265821038714,-15.283423720166562,-15.308581619294408,-15.333739518422254,-15.3588974175501,-15.384055316677946,-15.409213215805792,-15.434371114933638,-15.459529014061484,-15.48468691318933,-15.509844812317176,-15.535002711445022,-15.560160610572868,-15.585318509700715,-15.610476408828562,-15.635634307956408,-15.660792207084254,-15.6859501062121,-15.711108005339947,-15.736265904467793,-15.761423803595639,-15.786581702723485,-15.81173960185133,-15.836897500979177,-15.862055400107023,-15.887213299234869,-15.912371198362717,-15.937529097490563,-15.962686996618409,-15.987844895746255,-16.0130027948741,-16.038160694001945,-16.063318593129793,-16.08847649225764,-16.113634391385485,-16.138792290513333,-16.163950189641177,-16.189108088769025,-16.21426598789687,-16.239423887024717,-16.26458178615256,-16.28973968528041,-16.314897584408254,-16.3400554835361,-16.365213382663946,-16.390371281791793,-16.41552918091964,-16.440687080047486,-16.465844979175333,-16.491002878303178,-16.516160777431026,-16.54131867655887,-16.566476575686718,-16.591634474814562,-16.61679237394241,-16.641950273070254,-16.667108172198102,-16.692266071325946,-16.717423970453794,-16.74258186958164,-16.767739768709486,-16.792897667837334,-16.818055566965178,-16.843213466093026,-16.86837136522087,-16.893529264348718,-16.918687163476562,-16.94384506260441,-16.969002961732254,-16.994160860860102,-17.019318759987947,-17.044476659115794,-17.069634558243642,-17.094792457371486,-17.119950356499334,-17.14510825562718,-17.170266154755026,-17.19542405388287,-17.22058195301072,-17.245739852138563,-17.27089775126641,-17.296055650394255,-17.321213549522103,-17.34637144864995,-17.371529347777795,-17.396687246905643,-17.421845146033487,-17.447003045161335,-17.47216094428918,-17.497318843417027,-17.52247674254487,-17.54763464167272,-17.572792540800563,-17.59795043992841,-17.623108339056255,-17.648266238184103,-17.67342413731195,-17.698582036439795,-17.723739935567643,-17.748897834695487,-17.774055733823335,-17.79921363295118,-17.824371532079027,-17.84952943120687,-17.87468733033472,-17.899845229462564,-17.92500312859041,-17.950161027718256,-17.975318926846104,-18.00047682597395,-18.025634725101796,-18.050792624229643,-18.075950523357488,-18.101108422485336,-18.12626632161318,-18.151424220741028,-18.176582119868872,-18.20174001899672,-18.226897918124564,-18.252055817252412,-18.277213716380256,-18.302371615508104,-18.327529514635952,-18.352687413763796,-18.377845312891644,-18.403003212019488,-18.428161111147336,-18.45331901027518,-18.478476909403028,-18.503634808530872,-18.52879270765872,-18.553950606786564,-18.579108505914412,-18.604266405042257,-18.629424304170104,-18.654582203297952,-18.679740102425797,-18.704898001553644,-18.73005590068149,-18.755213799809336,-18.78037169893718,-18.80552959806503,-18.830687497192873,-18.85584539632072,-18.881003295448565,-18.906161194576413,-18.93131909370426,-18.956476992832105,-18.981634891959953,-19.006792791087797,-19.031950690215645,-19.05710858934349,-19.082266488471337,-19.10742438759918,-19.13258228672703,-19.157740185854873,-19.18289808498272,-19.208055984110565,-19.233213883238413,-19.25837178236626,-19.283529681494105,-19.308687580621953,-19.333845479749797,-19.359003378877645,-19.38416127800549,-19.409319177133337,-19.43447707626118,-19.45963497538903,-19.484792874516874,-19.50995077364472,-19.535108672772566,-19.560266571900414,-19.58542447102826,-19.610582370156106,-19.635740269283954,-19.660898168411798,-19.686056067539646,-19.71121396666749,-19.736371865795338,-19.761529764923182,-19.78668766405103,-19.811845563178874,-19.837003462306722,-19.862161361434566,-19.887319260562414,-19.912477159690262,-19.937635058818106,-19.962792957945954,-19.9879508570738,-20.013108756201646,-20.03826665532949,-20.063424554457338,-20.088582453585182,-20.11374035271303,-20.138898251840875,-20.164056150968722,-20.189214050096567,-20.214371949224414,-20.239529848352262,-20.264687747480107,-20.289845646607954,-20.3150035457358,-20.340161444863647,-20.36531934399149,-20.39047724311934,-20.415635142247183,-20.44079304137503,-20.465950940502875,-20.491108839630723,-20.516266738758567,-20.541424637886415,-20.566582537014263,-20.591740436142107,-20.616898335269955,-20.6420562343978,-20.667214133525647,-20.69237203265349,-20.71752993178134,-20.742687830909183,-20.76784573003703,-20.793003629164875,-20.818161528292723,-20.84331942742057,-20.868477326548415,-20.893635225676263,-20.918793124804107,-20.943951023931955,-20.9691089230598,-20.994266822187647,-21.01942472131549,-21.04458262044334,-21.069740519571184,-21.09489841869903,-21.120056317826876,-21.145214216954724,-21.17037211608257,-21.195530015210416,-21.220687914338264,-21.245845813466108,-21.271003712593956,-21.2961616117218,-21.321319510849648,-21.346477409977492,-21.37163530910534,-21.396793208233184,-21.421951107361032,-21.447109006488876,-21.472266905616724,-21.497424804744572,-21.522582703872416,-21.547740603000264,-21.57289850212811,-21.598056401255956,-21.6232143003838,-21.64837219951165,-21.673530098639493,-21.69868799776734,-21.723845896895185,-21.749003796023032,-21.774161695150877,-21.799319594278725,-21.824477493406572,-21.849635392534417,-21.874793291662264,-21.89995119079011,-21.925109089917957,-21.9502669890458,-21.97542488817365,-22.000582787301493,-22.02574068642934,-22.050898585557185,-22.076056484685033,-22.101214383812877,-22.126372282940725,-22.151530182068573,-22.176688081196417,-22.201845980324265,-22.22700387945211,-22.252161778579957,-22.2773196777078,-22.30247757683565,-22.327635475963493,-22.35279337509134,-22.377951274219186,-22.403109173347033,-22.428267072474878,-22.453424971602725,-22.478582870730573,-22.503740769858418,-22.528898668986265,-22.55405656811411,-22.579214467241957,-22.6043723663698,-22.62953026549765,-22.654688164625494,-22.67984606375334,-22.705003962881186,-22.730161862009034,-22.75531976113688,-22.780477660264726,-22.805635559392574,-22.830793458520418,-22.855951357648266,-22.88110925677611,-22.906267155903958,-22.931425055031802,-22.95658295415965,-22.981740853287494,-23.006898752415342,-23.032056651543186,-23.057214550671034,-23.082372449798882,-23.107530348926726,-23.132688248054574,-23.15784614718242,-23.183004046310266,-23.20816194543811,-23.23331984456596,-23.258477743693803,-23.28363564282165,-23.308793541949495,-23.333951441077343,-23.359109340205187,-23.384267239333035,-23.409425138460882,-23.434583037588727,-23.459740936716575,-23.48489883584442,-23.510056734972267,-23.53521463410011,-23.56037253322796,-23.585530432355803,-23.61068833148365,-23.635846230611495,-23.661004129739343,-23.686162028867187,-23.711319927995035,-23.736477827122883,-23.761635726250727,-23.786793625378575,-23.81195152450642,-23.837109423634267,-23.86226732276211,-23.88742522188996,-23.912583121017803,-23.93774102014565,-23.962898919273496,-23.988056818401343,-24.013214717529188,-24.038372616657036,-24.063530515784883,-24.088688414912728,-24.113846314040575,-24.13900421316842,-24.164162112296268,-24.189320011424112,-24.21447791055196,-24.239635809679804,-24.26479370880765,-24.289951607935496,-24.315109507063344,-24.34026740619119,-24.365425305319036,-24.390583204446884,-24.415741103574728,-24.440899002702576,-24.46605690183042,-24.491214800958268,-24.516372700086112,-24.54153059921396,-24.566688498341804,-24.591846397469652,-24.617004296597496,-24.642162195725344,-24.667320094853192,-24.692477993981036,-24.717635893108884,-24.74279379223673,-24.767951691364576,-24.79310959049242,-24.81826748962027,-24.843425388748113,-24.86858328787596,-24.893741187003805,-24.918899086131653,-24.944056985259497,-24.969214884387345,-24.994372783515193,-25.019530682643037,-25.044688581770885,-25.06984648089873,-25.095004380026577,-25.12016227915442,-25.14532017828227,-25.170478077410113,-25.19563597653796,-25.220793875665805,-25.245951774793653,-25.271109673921497,-25.296267573049345,-25.321425472177193,-25.346583371305037,-25.371741270432885,-25.39689916956073,-25.422057068688577,-25.44721496781642,-25.47237286694427,-25.497530766072114,-25.52268866519996,-25.547846564327806,-25.573004463455653,-25.598162362583498,-25.623320261711346,-25.648478160839193,-25.673636059967038,-25.698793959094886,-25.72395185822273,-25.749109757350578,-25.774267656478422,-25.79942555560627,-25.824583454734114,-25.849741353861962,-25.874899252989806,-25.900057152117654,-25.925215051245498,-25.950372950373346,-25.975530849501194,-26.000688748629038,-26.025846647756886,-26.05100454688473,-26.076162446012578,-26.101320345140422,-26.12647824426827,-26.151636143396114,-26.176794042523962,-26.201951941651807,-26.227109840779654,-26.252267739907502,-26.277425639035346,-26.302583538163194,-26.32774143729104,-26.352899336418886,-26.37805723554673,-26.40321513467458,-26.428373033802423,-26.45353093293027,-26.478688832058115,-26.503846731185963,-26.529004630313807,-26.554162529441655,-26.579320428569503,-26.604478327697347,-26.629636226825195,-26.65479412595304,-26.679952025080887,-26.70510992420873,-26.73026782333658,-26.755425722464423,-26.78058362159227,-26.805741520720115,-26.830899419847963,-26.856057318975807,-26.881215218103655,-26.906373117231503,-26.931531016359347,-26.956688915487195,-26.98184681461504,-27.007004713742887,-27.03216261287073,-27.05732051199858,-27.082478411126424,-27.10763631025427,-27.132794209382116,-27.157952108509964,-27.183110007637808,-27.208267906765656,-27.233425805893503,-27.258583705021348,-27.283741604149196,-27.30889950327704,-27.334057402404888,-27.359215301532732,-27.38437320066058,-27.409531099788424,-27.434688998916272,-27.459846898044116,-27.485004797171964,-27.51016269629981,-27.535320595427656,-27.560478494555504,-27.585636393683348,-27.610794292811196,-27.63595219193904,-27.661110091066888,-27.686267990194732,-27.71142588932258,-27.736583788450424,-27.761741687578272,-27.786899586706117,-27.812057485833964,-27.837215384961812,-27.862373284089657,-27.887531183217504,-27.91268908234535,-27.937846981473196,-27.96300488060104,-27.98816277972889,-28.013320678856733,-28.03847857798458,-28.063636477112425,-28.088794376240273,-28.113952275368117,-28.139110174495965,-28.164268073623813,-28.189425972751657,-28.214583871879505,-28.23974177100735,-28.264899670135197,-28.29005756926304,-28.31521546839089,-28.340373367518733,-28.36553126664658,-28.390689165774425,-28.415847064902273,-28.441004964030117,-28.466162863157965,-28.491320762285813,-28.516478661413657,-28.541636560541505,-28.56679445966935,-28.591952358797197,-28.61711025792504,-28.64226815705289,-28.667426056180734,-28.69258395530858,-28.717741854436426,-28.742899753564274,-28.768057652692118,-28.793215551819966,-28.818373450947814,-28.843531350075658,-28.868689249203506,-28.89384714833135,-28.919005047459198,-28.944162946587042,-28.96932084571489,-28.994478744842734,-29.019636643970582,-29.044794543098426,-29.069952442226274,-29.09511034135412,-29.120268240481966,-29.145426139609814,-29.17058403873766,-29.195741937865506,-29.22089983699335,-29.246057736121198,-29.271215635249042,-29.29637353437689,-29.321531433504735,-29.346689332632582,-29.371847231760427,-29.397005130888274,-29.42216303001612,-29.447320929143967,-29.472478828271814,-29.49763672739966,-29.522794626527507,-29.54795252565535,-29.5731104247832,-29.598268323911043,-29.62342622303889,-29.648584122166735,-29.673742021294583,-29.698899920422427,-29.724057819550275,-29.749215718678123,-29.774373617805967,-29.799531516933815,-29.82468941606166,-29.849847315189507,-29.87500521431735,-29.9001631134452,-29.925321012573043,-29.95047891170089,-29.975636810828735,-30.000794709956583,-30.025952609084428,-30.051110508212275,-30.076268407340123,-30.101426306467967,-30.126584205595815,-30.15174210472366,-30.176900003851507,-30.20205790297935,-30.2272158021072,-30.252373701235044,-30.27753160036289,-30.302689499490736,-30.327847398618584,-30.353005297746428,-30.378163196874276,-30.403321096002124,-30.428478995129968,-30.453636894257816,-30.47879479338566,-30.503952692513508,-30.529110591641352,-30.5542684907692,-30.579426389897044,-30.604584289024892,-30.629742188152736,-30.654900087280584,-30.68005798640843,-30.705215885536276,-30.730373784664124,-30.75553168379197,-30.780689582919816,-30.80584748204766,-30.83100538117551,-30.856163280303353,-30.8813211794312,-30.906479078559045,-30.931636977686892,-30.956794876814737,-30.981952775942585,-31.00711067507043,-31.032268574198277,-31.057426473326124,-31.08258437245397,-31.107742271581817,-31.13290017070966,-31.15805806983751,-31.183215968965353,-31.2083738680932,-31.233531767221045,-31.258689666348893,-31.283847565476737,-31.309005464604585,-31.33416336373243,-31.359321262860277,-31.384479161988125,-31.40963706111597,-31.434794960243817,-31.45995285937166,-31.48511075849951,-31.510268657627353,-31.5354265567552,-31.560584455883046,-31.585742355010893,-31.610900254138738,-31.636058153266585,-31.661216052394433,-31.686373951522278,-31.711531850650125,-31.73668974977797,-31.761847648905817,-31.78700554803366,-31.81216344716151,-31.837321346289354,-31.8624792454172,-31.887637144545046,-31.912795043672894,-31.937952942800738,-31.963110841928586,-31.988268741056434,-32.01342664018428,-32.038584539312126,-32.063742438439974,-32.088900337567814,-32.11405823669566,-32.13921613582351,-32.16437403495136,-32.1895319340792,-32.214689833207046,-32.239847732334894,-32.26500563146274,-32.29016353059058,-32.31532142971843,-32.34047932884628,-32.365637227974126,-32.390795127101974,-32.415953026229815,-32.44111092535766,-32.46626882448551,-32.49142672361336,-32.5165846227412,-32.54174252186905,-32.566900420996895,-32.59205832012474,-32.61721621925259,-32.64237411838043,-32.66753201750828,-32.69268991663613,-32.717847815763974,-32.743005714891815,-32.76816361401966,-32.79332151314751,-32.81847941227536,-32.8436373114032,-32.86879521053105,-32.893953109658895,-32.91911100878674,-32.94426890791459,-32.96942680704243,-32.99458470617028,-33.01974260529813,-33.044900504425975,-33.070058403553816,-33.09521630268166,-33.12037420180951,-33.14553210093736,-33.1706900000652,-33.19584789919305,-33.221005798320896,-33.24616369744874,-33.27132159657659,-33.29647949570443,-33.32163739483228,-33.34679529396013,-33.371953193087975,-33.397111092215816,-33.422268991343664,-33.44742689047151,-33.47258478959936,-33.4977426887272,-33.52290058785505,-33.548058486982896,-33.573216386110744,-33.59837428523859,-33.62353218436643,-33.64869008349428,-33.67384798262213,-33.699005881749976,-33.72416378087782,-33.749321680005664,-33.77447957913351,-33.79963747826136,-33.8247953773892,-33.84995327651705,-33.875111175644896,-33.900269074772744,-33.92542697390059,-33.95058487302843,-33.97574277215628,-34.00090067128413,-34.026058570411976,-34.05121646953982,-34.076374368667665,-34.10153226779551,-34.12669016692336,-34.1518480660512,-34.17700596517905,-34.2021638643069,-34.227321763434745,-34.25247966256259,-34.27763756169043,-34.30279546081828,-34.32795335994613,-34.35311125907398,-34.37826915820182,-34.403427057329665,-34.42858495645751,-34.45374285558536,-34.4789007547132,-34.50405865384105,-34.5292165529689,-34.554374452096745,-34.57953235122459,-34.604690250352434,-34.62984814948028,-34.65500604860813,-34.68016394773598,-34.70532184686382,-34.730479745991666,-34.75563764511951,-34.78079554424736,-34.8059534433752,-34.83111134250305,-34.8562692416309,-34.881427140758746,-34.90658503988659,-34.931742939014434,-34.95690083814228,-34.98205873727013,-35.00721663639798,-35.03237453552582,-35.057532434653666,-35.082690333781514,-35.10784823290936,-35.1330061320372,-35.15816403116505,-35.1833219302929,-35.208479829420746,-35.233637728548594,-35.258795627676434,-35.28395352680428,-35.30911142593213,-35.33426932505998,-35.35942722418782,-35.38458512331567,-35.409743022443514,-35.43490092157136,-35.4600588206992,-35.48521671982705,-35.5103746189549,-35.535532518082746,-35.560690417210594,-35.585848316338435,-35.61100621546628,-35.63616411459413,-35.66132201372198,-35.68647991284982,-35.71163781197767,-35.736795711105515,-35.76195361023336,-35.7871115093612,-35.81226940848905,-35.8374273076169,-35.86258520674475,-35.887743105872595,-35.912901005000435,-35.93805890412828,-35.96321680325613,-35.98837470238398,-36.01353260151182,-36.03869050063967,-36.063848399767515,-36.08900629889536,-36.11416419802321,-36.13932209715105,-36.1644799962789,-36.18963789540675,-36.214795794534595,-36.239953693662436,-36.265111592790284,-36.29026949191813,-36.31542739104598,-36.34058529017382,-36.36574318930167,-36.390901088429516,-36.41605898755736,-36.44121688668521,-36.46637478581305,-36.4915326849409,-36.51669058406875,-36.541848483196596,-36.567006382324436,-36.592164281452284,-36.61732218058013,-36.64248007970798,-36.66763797883582,-36.69279587796367,-36.717953777091516,-36.743111676219364,-36.76826957534721,-36.79342747447505,-36.8185853736029,-36.84374327273075,-36.868901171858596,-36.89405907098644,-36.919216970114284,-36.94437486924213,-36.96953276836998,-36.99469066749782,-37.01984856662567,-37.04500646575352,-37.070164364881364,-37.09532226400921,-37.12048016313705,-37.1456380622649,-37.17079596139275,-37.195953860520596,-37.22111175964844,-37.246269658776285,-37.27142755790413,-37.29658545703198,-37.32174335615982,-37.34690125528767,-37.37205915441552,-37.397217053543365,-37.42237495267121,-37.44753285179905,-37.4726907509269,-37.49784865005475,-37.5230065491826,-37.54816444831044,-37.573322347438285,-37.59848024656613,-37.62363814569398,-37.64879604482182,-37.67395394394967,-37.69911184307752]}
},{}],74:[function(require,module,exports){
module.exports={"expected":[-2.0414049191494212e15,39.74056071696158,19.857698754422188,13.224481554325878,9.903670225981921,7.907815278427616,6.574432111624989,5.619597512944586,4.901348779279158,4.3408167559290165,3.8906790504828246,3.5208205830205457,3.2111638597428054,2.9478083496766616,2.720824412874161,2.5229296560263013,2.3486616534487275,2.193842647646385,2.0552226817894663,1.93023542597221,1.8168272543724082,1.7133351562839245,1.6183979429085578,1.5308906163490434,1.4498751450921132,1.3745630520920546,1.304286635063451,1.2384765809234415,1.176644375762618,1.1183683527153387,1.0632825287937901,1.0110676008222739,0.9614436280655785,0.9141640436589925,0.8690107211478264,0.8257898849923682,0.7843287008040442,0.7444724165769756,0.706081953268785,0.669031863921447,0.6332085966602209,0.5985090095099133,0.5648390948670065,0.5321128792917152,0.500251470506888,0.4691822284667445,0.43883804135853594,0.4091566906315924,0.38008029177086633,0.35155479966959224,0.3235295692048976,0.2959569630566094,0.26879199999278836,0.24199203782279882,0.21551648602744777,0.18932654374574256,0.16338495935299016,0.1376558083243921,0.11210428645732548,0.08669651583633291,0.06139936117742547,0.03618025439016124,0.01100702535340015,-0.01415226298185046,-0.03932947696801257,-0.06455657387350287,-0.08986576447669117,-0.11528967840387504,-0.14086153402501378,-0.16661531480644326,-0.19258595414209498,-0.21880953084741456,-0.24532347770809554,-0.2721668057350284,-0.2993803470957402,-0.32700702008090504,-0.35509211993501494,-0.38368363994869276,-0.4128326278960711,-0.44259358372868174,-0.47302490543810677,-0.5041893912117629,-0.5361548074781598,-0.5689945342311834,-0.6027883012153739,-0.6376230312454771,-0.6735938102513855,-0.7108050077492725,-0.7493715765552921,-0.7894205669599157,-0.8310928986372023,-0.8745454437621958,-0.9199534878027232,-0.9675136511155124,-1.017447375999372,-1.070005111866527,-1.1254713679328852,-1.1841708514313944,-1.2464759742335538,-1.3128160982138743,-1.383689008782788,-1.4596752699982685,-1.5414563431707264,-1.6298376733942102,-1.725778410006193,-1.830430097560792,-1.9451876642316412,-2.071757523521164,-2.2122498882265185,-2.3693059730275787,-2.546276503964804,-2.7474774194546208,-2.9785647311464607,-3.247098786300564,-3.5634198453967993,-3.9420556542131515,-4.404080611733665,-4.981272396934458,-5.72389619448756,-6.716438764996304,-8.112707521241074,-10.225276556886204,-13.801602642460294,-21.183712399929966,-45.42003008487766,317.99052805116,35.322962650378464,18.68756326619027,12.693446102187908,9.601491399806811,7.712866320330305,6.438178470541269,5.518921194023205,4.823851568442586,4.279256841175977,3.8405444569811524,3.4791543163872474,3.1759474408415693,2.9176169609660345,2.694623639433702,2.499950358676513,2.3283200537575053,2.1756876529164755,2.038900202082177,1.915463615764222,1.8033789668303037,1.7010252726363646,1.6070740667359746,1.520426134521284,1.440163981741093,1.3655156525337766,1.2958268558808215,1.2305392562921271,1.169173394430534,1.1113151248118869,1.056604753241864,1.0047282667217667,0.9554101997728586,0.9084077912606352,0.8635061668847548,0.8205143428085712,0.7792618911837298,0.7395961426291426,0.7013798269276504,0.6644890733793167,0.6288117078984989,0.5942457961646064,0.5606983917455747,0.5280844557154168,0.4963259203367317,0.46535087421964727,0.43509285026269834,0.405490200828264,0.3764855471612778,0.34802529214388633,0.32005918718530446,0.2925399454476673,0.26542289476411085,0.23866566455939447,0.21222790187351576,0.1860710122430154,0.16015792173704987,0.13445285689392378,0.10892113967353032,0.08352899484444393,0.05824336746998342,0.0330317483538528,0.007862005457924958,-0.017297780582231526,-0.04247947864201169,-0.0677150687475297,-0.0930368049154684,-0.11847738096018098,-0.14407010109051693,-0.1698490572088954,-0.19584931495207716,-0.22210711068135705,-0.2486600618436062,-0.2755473933911333,-0.30281018327500236,-0.3304916304245462,-0.3586373491073775,-0.38729569414636345,-0.4165181221720356,-0.4463595949369223,-0.4768790317430871,-0.508139819275863,-0.5402103886453928,-0.5731648712757993,-0.6070838475309198,-0.642055204727191,-0.6781751245915321,-0.7155492244442514,-0.754293881646795,-0.7945377774400825,-0.8364237045939993,-0.8801106937968856,-0.9257765271127042,-0.9736207240318437,-1.0238681078753828,-1.0767730892746412,-1.1326248414769933,-1.1917535925942102,-1.2545383272204387,-1.3214162806862506,-1.3928947330869144,-1.4695657810379916,-1.5521250035010534,-1.6413952750584673,-1.7383574632359962,-1.8441904498956256,-1.960323957787578,-2.0885092322829717,-2.2309150402510602,-2.390260238239138,-2.5700002649715086,-2.7745950106379285,-3.0099027405147036,-3.2837751692037815,-3.6069846673764796,-3.9947220552138263,-4.469121451990613,-5.063739845504079,-5.8320184983165895,-6.864573644419526,-8.328328062301258,-10.56825316049016,-14.431093789263265,-22.699006683372264,-52.9923064255311,158.9936916516889,31.788674480628327,17.647326227131508,12.203178696988283,9.317025870833426,7.527150396208444,6.307332644739759,5.421679857736861,4.748670456675028,4.219331772124883,3.7916064175205784,3.4383899287139634,3.141427517396883,2.8879745574347564,2.6688631808822505,2.477329556237031,2.3082741703799816,2.157779402508349,2.022785702668162,1.90086870042992,1.790082354216075,1.6888463866518402,1.5958640731933567,1.5100612453456552,1.4305403846009974,1.3565456234587312,1.2874357448945597,1.2226631255515032,1.1617571497871082,1.1043110245397214,1.0499712079535262,0.9984288661816262,0.9494129180381581,0.9026843331048316,0.858031426994672,0.8152659556316675,0.7742198541219953,0.7347424989451449,0.6966983975447897,0.6599652289357248,0.6244321741104846,0.589998486885139,0.5565722651530512,0.5240693899008874,0.49241260522291375,0.46153071727909484,0.43135789393291624,0.4018330498709121,0.37289930449650643,0.34450350192339,0.3165957840579776,0.28912920912884543,0.2620594091485737,0.23534428072563046,0.20894370441519,0.18281928843729417,0.1569341331201613,0.1312526128646065,0.1057401727864725,0.08036313748929722,0.05508852965885688,0.029883896361279878,0.004717141073701644,-0.02044364041566025,-0.0456303220285431,-0.07087490909088576,-0.09620970144608983,-0.12166745975968782,-0.1472815768471205,-0.17308625595093793,-0.1991166980256303,-0.22540930026177272,-0.25200186830139576,-0.27893384486967776,-0.3062465578834467,-0.3339834915043299,-0.3621905840979857,-0.3909165576563769,-0.42021328395923485,-0.4501361936186847,-0.48074473520089556,-0.5121028928905659,-0.5442797727099986,-0.5773502691896263,-0.611395826693432,-0.6465053124376562,-0.6827760217395609,-0.7203148403720983,-0.7592395943078865,-0.7996806239129299,-0.8417826281908033,-0.8857068355071563,-0.931633571042147,-0.9797653089711366,-1.0303303203449603,-1.0835870575924407,-1.1398294559379485,-1.1993933842240756,-1.2626645474731808,-1.3300882378958063,-1.4021814599226439,-1.4795481327979991,-1.5628983230275781,-1.6530728112557842,-1.7510748041557749,-1.858111339977358,-1.9756480311095161,-2.1054824407271044,-2.2498439395482905,-2.41153190588706,-2.59411062143856,-2.8021899909714416,-3.041839671547946,-3.3212169439797674,-3.65154914502021,-4.04872852273538,-4.536016554242586,-5.1488762487366,-5.944180873178278,-7.0192453156126255,-8.55554678100796,-10.93481077217994,-15.12043644950203,-24.44726177048181,-63.59307394414651,105.99404734317416,28.896793494239247,16.71647734049897,11.74914954002159,9.048755340484863,7.350023324762952,6.181576511153446,5.327698827533019,4.675701721501252,4.160976138273184,3.7438216663541306,3.3984976707850136,3.107582966399697,2.8588657297368782,2.643531533344765,2.455058487358272,2.288517213433062,2.1401125530570035,2.006874920897272,1.8864472378237849,1.7769346063599927,1.6767961812718897,1.5847660345173924,1.4997943316854334,1.421002986811641,1.3476518014617243,1.279112305451277,1.2148473297525006,1.1543948973952725,1.0973554033038904,1.0433813250314041,0.9921688996294254,0.9434513414379959,0.8969932774951397,0.8525861524964798,0.8100444113256821,0.7692023093871143,0.729911233017916,0.6920374367849406,0.6554601233932026,0.6200698066338204,0.58576690930199,0.5524605570727188,0.5200675364986493,0.48851139101275465,0.45772163340102495,0.42763305690063297,0.39818513006544654,0.36932146296880786,0.3409893342950882,0.31313927049577284,0.2857246695208174,0.25870146273735667,0.2320278095577226,0.20566382005254089,0.17957130144886396,0.15371352493078835,0.12805500958745872,0.10256132070566236,0.07719887989217628,0.051934784743633965,0.02673663596647702,0.001572369991303545,-0.02358990477033056,-0.048782069810773154,-0.07403615830214202,-0.09938451851074336,-0.12485998062780905,-0.15049602885832827,-0.17632698070846564,-0.2023881755492218,-0.22871617471286376,-0.2553489756050122,-0.2823262425960092,-0.3096895577985626,-0.3374826952564171,-0.365751922573732,-0.39454633462502514,-0.4239182247213393,-0.45392349949737926,-0.48462214485916044,-0.5160787516352258,-0.548363111158671,-0.5815508929401898,-0.6157244189586838,-0.6509735520054675,-0.6873967191113906,-0.7251020955445545,-0.7642089804275043,-0.8048494019957755,-0.8471699993148681,-0.8913342384322283,-0.9375250351934835,-0.9859478752780688,-1.0368345457454384,-1.0904476233615807,-1.1470859057384903,-1.2070910254244398,-1.2708555595639575,-1.338833045811262,-1.411550449269492,-1.489623810672084,-1.5737780656438562,-1.664872393181627,-1.7639329814894282,-1.8721958739143458,-1.991163709176699,-2.1226819137116797,-2.2690425986294995,-2.433128673150909,-2.6186175894607575,-2.830275639063556,-3.0743935095720394,-3.359449086627054,-3.697148997791852,-4.104127971540632,-4.6048477415091025,-5.236815071672387,-6.060616417390306,-7.180899486243992,-8.795330209557061,-11.327475946083627,-15.878608368059583,-26.48671788085464,-79.49370104697135,79.49370104698373,26.48671788085602,15.878608368060076,11.327475946083881,8.795330209557216,7.180899486244095,6.06061641739038,5.236815071672443,4.604847741509146,4.1041279715406676,3.6971489977918806,3.359449086627078,3.07439350957206,2.830275639063574,2.618617589460773,2.4331286731509225,2.2690425986295115,2.1226819137116903,1.9911637091767087,1.8721958739143545,1.763932981489436,1.6648723931816343,1.573778065643863,1.4896238106720905,1.411550449269498,1.3388330458112674,1.2708555595639626,1.2070910254244445,1.147085905738495,1.0904476233615852,1.0368345457454424,0.9859478752780727,0.9375250351934872,0.8913342384322318,0.8471699993148715,0.8048494019957786,0.7642089804275074,0.7251020955445575,0.6873967191113934,0.6509735520054702,0.6157244189586865,0.5815508929401924,0.5483631111586735,0.5160787516352283,0.48462214485916283,0.45392349949738164,0.42391822472134155,0.3945463346250274,0.36575192257373423,0.3374826952564193,0.3096895577985648,0.2823262425960113,0.2553489756050143,0.22871617471286587,0.20238817554922384,0.17632698070846767,0.15049602885833027,0.12485998062781103,0.09938451851074533,0.074036158302144,0.04878206981077512,0.02358990477033252,-0.0015723699913015856,-0.02673663596647506,-0.051934784743631994,-0.0771988798921743,-0.10256132070566037,-0.12805500958745672,-0.15371352493078635,-0.17957130144886194,-0.20566382005253886,-0.23202780955772054,-0.25870146273735456,-0.2857246695208152,-0.3131392704957707,-0.34098933429508604,-0.36932146296880564,-0.3981851300654443,-0.4276330569006307,-0.4577216334010226,-0.4885113910127522,-0.5200675364986468,-0.5524605570727162,-0.5857669093019874,-0.6200698066338177,-0.6554601233931998,-0.6920374367849378,-0.729911233017913,-0.7692023093871112,-0.8100444113256788,-0.8525861524964764,-0.8969932774951362,-0.9434513414379923,-0.9921688996294216,-1.0433813250314,-1.097355403303886,-1.154394897395268,-1.2148473297524958,-1.2791123054512716,-1.347651801461719,-1.421002986811635,-1.499794331685427,-1.5847660345173857,-1.6767961812718821,-1.7769346063599842,-1.8864472378237758,-2.006874920897262,-2.1401125530569924,-2.28851721343305,-2.4550584873582584,-2.6435315333447496,-2.85886572973686,-3.107582966399676,-3.3984976707849888,-3.7438216663541013,-4.160976138273147,-4.675701721501207,-5.327698827532962,-6.18157651115337,-7.3500233247628435,-9.0487553404847,-11.749149540021316,-16.716477340498418,-28.89679349423761,-105.99404734315216,63.59307394415444,24.447261770482985,15.120436449502478,10.934810772180175,8.555546781008104,7.019245315612724,5.94418087317835,5.148876248736654,4.536016554242629,4.048728522735414,3.651549145020238,3.3212169439797905,3.041839671547966,2.8021899909714594,2.594110621438575,2.411531905887074,2.2498439395483025,2.105482440727115,1.9756480311095257,1.8581113399773668,1.7510748041557826,1.6530728112557915,1.562898323027585,1.4795481327980056,1.4021814599226499,1.3300882378958117,1.262664547473186,1.1993933842240805,1.139829455937953,1.083587057592445,1.0303303203449643,0.9797653089711404,0.9316335710421506,0.8857068355071599,0.8417826281908067,0.7996806239129333,0.7592395943078896,0.7203148403721011,0.6827760217395636,0.646505312437659,0.6113958266934346,0.5773502691896288,0.5442797727100013,0.5121028928905684,0.4807447352008979,0.4501361936186871,0.4202132839592372,0.3909165576563792,0.36219058409798793,0.33398349150433204,0.30624655788344884,0.27893384486967987,0.25200186830139787,0.2254093002617748,0.1991166980256323,0.17308625595093996,0.14728157684712254,0.12166745975968982,0.0962097014460918,0.07087490909088773,0.04563032202854507,0.02044364041566221,-0.004717141073699685,-0.029883896361277917,-0.055088529658854926,-0.08036313748929524,-0.10574017278647053,-0.1312526128646045,-0.1569341331201593,-0.18281928843729214,-0.20894370441518795,-0.23534428072562838,-0.26205940914857156,-0.2891292091288433,-0.3165957840579755,-0.34450350192338786,-0.37289930449650416,-0.4018330498709099,-0.43135789393291396,-0.46153071727909245,-0.49241260522291125,-0.5240693899008848,-0.5565722651530487,-0.5899984868851365,-0.6244321741104818,-0.659965228935722,-0.6966983975447868,-0.7347424989451419,-0.7742198541219922,-0.8152659556316643,-0.8580314269946688,-0.9026843331048282,-0.9494129180381545,-0.9984288661816222,-1.049971207953522,-1.1043110245397172,-1.1617571497871035,-1.2226631255514984,-1.2874357448945546,-1.3565456234587256,-1.4305403846009914,-1.5100612453456486,-1.5958640731933496,-1.6888463866518324,-1.7900823542160669,-1.900868700429911,-2.0227857026681524,-2.157779402508338,-2.308274170379969,-2.477329556237017,-2.6688631808822345,-2.8879745574347377,-3.1414275173968615,-3.4383899287139377,-3.791606417520548,-4.219331772124846,-4.748670456674982,-5.421679857736802,-6.307332644739679,-7.527150396208331,-9.317025870833255,-12.203178696987989,-17.647326227130897,-31.78867448062634,-158.99369165163932,52.992306425536604,22.699006683373277,14.431093789263672,10.568253160490382,8.328328062301397,6.86457364441962,5.832018498316657,5.063739845504131,4.469121451990654,3.994722055213859,3.606984667376507,3.2837751692038046,3.009902740514723,2.774595010637946,2.5700002649715232,2.3902602382391507,2.230915040251072,2.0885092322829824,1.9603239577875873,1.8441904498956345,1.738357463236004,1.6413952750584748,1.55212500350106,1.4695657810379978,1.3928947330869204,1.3214162806862462,1.254538327220453,1.1917535925942149,1.1326248414769977,1.0767730892746377,1.0238681078753942,0.9736207240318476,0.9257765271127079,0.8801106937968827,0.8364237045940088,0.7945377774400915,0.754293881646798,0.7155492244442544,0.6781751245915296,0.6420552047271988,0.6070838475309225,0.5731648712758018,0.5402103886453908,0.50813981927587,0.47687903174308954,0.4463595949369247,0.4165181221720337,0.3872956941463616,0.3586373491073837,0.3304916304245484,0.3028101832750045,0.27554739339113166,0.248660061843612,0.2221071106813591,0.19584931495207916,0.16984905720889376,0.14407010109052257,0.11847738096018298,0.09303680491547037,0.0677150687475281,0.04247947864201009,0.017297780582237042,-0.007862005457923,-0.03303174835385084,-0.05824336746998502,-0.08352899484443838,-0.10892113967352833,-0.13445285689392178,-0.1601579217370515,-0.18607101224300968,-0.2122279018735137,-0.2386656645593924,-0.26542289476410874,-0.29253994544766904,-0.3200591871852984,-0.3480252921438841,-0.3764855471612755,-0.40549020082826587,-0.4350928502626918,-0.46535087421964483,-0.4963259203367292,-0.528084455715419,-0.5606983917455675,-0.5942457961646037,-0.6288117078984963,-0.664489073379314,-0.7013798269276529,-0.7395961426291342,-0.7792618911837266,-0.8205143428085678,-0.8635061668847575,-0.9084077912606251,-0.955410199772855,-1.0047282667217627,-1.0566047532418676,-1.1113151248118744,-1.1691733944305296,-1.2305392562921222,-1.2958268558808161,-1.365515652533781,-1.440163981741076,-1.5204261345212775,-1.6070740667359675,-1.7010252726363706,-1.8033789668302804,-1.9154636157642129,-2.0389002020821674,-2.175687652916485,-2.32832005375747,-2.499950358676499,-2.694623639433686,-2.9176169609660163,-3.175947440841587,-3.479154316387198,-3.8405444569811213,-4.2792568411759735,-4.823851568442625,-5.518921194023032,-6.43817847054111,-7.712866320330186,-9.601491399806793,-12.693446102187014,-18.68756326618896,-35.32296265037601,-317.99052805114155,45.42003008487438,21.183712399931647,13.80160264246067,10.225276556886223,8.112707521241086,6.716438764996558,5.723896194487686,4.981272396934508,4.404080611733669,3.942055654213243,3.5634198453968504,3.2470987863005862,2.9785647311464625,2.747477419454607,2.5462765039648323,2.3693059730275916,2.2122498882265194,2.0717575235211654,1.945187664231668,1.830430097560808,1.725778410006201,1.6298376733942108,1.5414563431707449,1.4596752699982802,1.3836890087827938,1.312816098213875,1.2464759742335498,1.1841708514314033,1.1254713679328896,1.0700051118665275,1.0174473759993725,0.967513651115523,0.9199534878027301,0.8745454437621992,0.8310928986372026,0.7894205669599247,0.749371576555298,0.7108050077492755,0.6735938102513858,0.6376230312454749,0.602788301215379,0.568994534231186,0.5361548074781624,0.5041893912117631,0.47302490543811354,0.44259358372868624,0.41283262789607345,0.383683639948693,0.3550921199350211,0.3270070200809092,0.29938034709574235,0.2721668057350286,0.24532347770809385,0.2188095308474185,0.19258595414209698,0.16661531480644526,0.14086153402501397,0.11528967840388062,0.08986576447669493,0.06455657387350483,0.03932947696801275,0.014152262981848868,-0.011007025353396411,-0.036180254390159275,-0.06139936117742528,-0.08669651583633453,-0.11210428645732169,-0.1376558083243901,-0.16338495935298813,-0.18932654374574237,-0.21551648602744197,-0.24199203782279488,-0.26879199999278625,-0.2959569630566092,-0.3235295692048994,-0.351554799669588,-0.38008029177086405,-0.40915669063159227,-0.4388380413585378,-0.4691822284667399,-0.5002514705068833,-0.5321128792917127,-0.5648390948670062,-0.5985090095099058,-0.6332085966602157,-0.6690318639214441,-0.7060819532687848,-0.744472416576978,-0.7843287008040382,-0.8257898849923648,-0.8690107211478261,-0.9141640436589955,-0.9614436280655713,-1.0110676008222663,-1.0632825287937862,-1.1183683527153383,-1.1766443757626048,-1.238476580923432,-1.3042866350634457,-1.3745630520920542,-1.4498751450921183,-1.5308906163490308,-1.6183979429085509,-1.7133351562839239,-1.8168272543724149,-1.9302354259721923,-2.055222681789447,-2.193842647646374,-2.348661653448726,-2.522929656026261,-2.72082441287413,-2.947808349676642,-3.211163859742803,-3.520820583020567,-3.8906790504827637,-4.340816755928978,-4.901348779279154,-5.619597512944638,-6.574432111624746,-7.907815278427378,-9.903670225981728,-13.224481554325846,-19.85769875442001,-39.740560716955684,-6.804683063831404e14],"x":[12.566370614359172,12.591528513487019,12.616686412614865,12.64184431174271,12.667002210870557,12.692160109998403,12.717318009126249,12.742475908254097,12.767633807381943,12.792791706509789,12.817949605637635,12.84310750476548,12.868265403893327,12.893423303021173,12.918581202149019,12.943739101276865,12.968897000404711,12.994054899532557,13.019212798660403,13.044370697788251,13.069528596916097,13.094686496043943,13.11984439517179,13.145002294299635,13.170160193427481,13.195318092555327,13.220475991683173,13.24563389081102,13.270791789938865,13.295949689066711,13.321107588194558,13.346265487322404,13.371423386450251,13.396581285578097,13.421739184705944,13.44689708383379,13.472054982961636,13.497212882089482,13.522370781217328,13.547528680345174,13.57268657947302,13.597844478600866,13.623002377728712,13.648160276856558,13.673318175984404,13.698476075112252,13.723633974240098,13.748791873367944,13.77394977249579,13.799107671623636,13.824265570751482,13.849423469879328,13.874581369007174,13.89973926813502,13.924897167262866,13.950055066390712,13.975212965518558,14.000370864646406,14.025528763774252,14.050686662902098,14.075844562029944,14.10100246115779,14.126160360285636,14.151318259413483,14.176476158541329,14.201634057669175,14.22679195679702,14.251949855924867,14.277107755052713,14.302265654180559,14.327423553308407,14.352581452436253,14.377739351564099,14.402897250691945,14.42805514981979,14.453213048947637,14.478370948075483,14.503528847203329,14.528686746331175,14.553844645459021,14.579002544586867,14.604160443714713,14.62931834284256,14.654476241970407,14.679634141098253,14.7047920402261,14.729949939353945,14.755107838481791,14.780265737609637,14.805423636737483,14.83058153586533,14.855739434993176,14.880897334121022,14.906055233248868,14.931213132376714,14.956371031504561,14.981528930632408,15.006686829760254,15.0318447288881,15.057002628015946,15.082160527143792,15.107318426271638,15.132476325399484,15.15763422452733,15.182792123655176,15.207950022783022,15.233107921910868,15.258265821038714,15.283423720166562,15.308581619294408,15.333739518422254,15.3588974175501,15.384055316677946,15.409213215805792,15.434371114933638,15.459529014061484,15.48468691318933,15.509844812317176,15.535002711445022,15.560160610572868,15.585318509700715,15.610476408828562,15.635634307956408,15.660792207084254,15.6859501062121,15.711108005339947,15.736265904467793,15.761423803595639,15.786581702723485,15.81173960185133,15.836897500979177,15.862055400107023,15.887213299234869,15.912371198362717,15.937529097490563,15.962686996618409,15.987844895746255,16.0130027948741,16.038160694001945,16.063318593129793,16.08847649225764,16.113634391385485,16.138792290513333,16.163950189641177,16.189108088769025,16.21426598789687,16.239423887024717,16.26458178615256,16.28973968528041,16.314897584408254,16.3400554835361,16.365213382663946,16.390371281791793,16.41552918091964,16.440687080047486,16.465844979175333,16.491002878303178,16.516160777431026,16.54131867655887,16.566476575686718,16.591634474814562,16.61679237394241,16.641950273070254,16.667108172198102,16.692266071325946,16.717423970453794,16.74258186958164,16.767739768709486,16.792897667837334,16.818055566965178,16.843213466093026,16.86837136522087,16.893529264348718,16.918687163476562,16.94384506260441,16.969002961732254,16.994160860860102,17.019318759987947,17.044476659115794,17.069634558243642,17.094792457371486,17.119950356499334,17.14510825562718,17.170266154755026,17.19542405388287,17.22058195301072,17.245739852138563,17.27089775126641,17.296055650394255,17.321213549522103,17.34637144864995,17.371529347777795,17.396687246905643,17.421845146033487,17.447003045161335,17.47216094428918,17.497318843417027,17.52247674254487,17.54763464167272,17.572792540800563,17.59795043992841,17.623108339056255,17.648266238184103,17.67342413731195,17.698582036439795,17.723739935567643,17.748897834695487,17.774055733823335,17.79921363295118,17.824371532079027,17.84952943120687,17.87468733033472,17.899845229462564,17.92500312859041,17.950161027718256,17.975318926846104,18.00047682597395,18.025634725101796,18.050792624229643,18.075950523357488,18.101108422485336,18.12626632161318,18.151424220741028,18.176582119868872,18.20174001899672,18.226897918124564,18.252055817252412,18.277213716380256,18.302371615508104,18.327529514635952,18.352687413763796,18.377845312891644,18.403003212019488,18.428161111147336,18.45331901027518,18.478476909403028,18.503634808530872,18.52879270765872,18.553950606786564,18.579108505914412,18.604266405042257,18.629424304170104,18.654582203297952,18.679740102425797,18.704898001553644,18.73005590068149,18.755213799809336,18.78037169893718,18.80552959806503,18.830687497192873,18.85584539632072,18.881003295448565,18.906161194576413,18.93131909370426,18.956476992832105,18.981634891959953,19.006792791087797,19.031950690215645,19.05710858934349,19.082266488471337,19.10742438759918,19.13258228672703,19.157740185854873,19.18289808498272,19.208055984110565,19.233213883238413,19.25837178236626,19.283529681494105,19.308687580621953,19.333845479749797,19.359003378877645,19.38416127800549,19.409319177133337,19.43447707626118,19.45963497538903,19.484792874516874,19.50995077364472,19.535108672772566,19.560266571900414,19.58542447102826,19.610582370156106,19.635740269283954,19.660898168411798,19.686056067539646,19.71121396666749,19.736371865795338,19.761529764923182,19.78668766405103,19.811845563178874,19.837003462306722,19.862161361434566,19.887319260562414,19.912477159690262,19.937635058818106,19.962792957945954,19.9879508570738,20.013108756201646,20.03826665532949,20.063424554457338,20.088582453585182,20.11374035271303,20.138898251840875,20.164056150968722,20.189214050096567,20.214371949224414,20.239529848352262,20.264687747480107,20.289845646607954,20.3150035457358,20.340161444863647,20.36531934399149,20.39047724311934,20.415635142247183,20.44079304137503,20.465950940502875,20.491108839630723,20.516266738758567,20.541424637886415,20.566582537014263,20.591740436142107,20.616898335269955,20.6420562343978,20.667214133525647,20.69237203265349,20.71752993178134,20.742687830909183,20.76784573003703,20.793003629164875,20.818161528292723,20.84331942742057,20.868477326548415,20.893635225676263,20.918793124804107,20.943951023931955,20.9691089230598,20.994266822187647,21.01942472131549,21.04458262044334,21.069740519571184,21.09489841869903,21.120056317826876,21.145214216954724,21.17037211608257,21.195530015210416,21.220687914338264,21.245845813466108,21.271003712593956,21.2961616117218,21.321319510849648,21.346477409977492,21.37163530910534,21.396793208233184,21.421951107361032,21.447109006488876,21.472266905616724,21.497424804744572,21.522582703872416,21.547740603000264,21.57289850212811,21.598056401255956,21.6232143003838,21.64837219951165,21.673530098639493,21.69868799776734,21.723845896895185,21.749003796023032,21.774161695150877,21.799319594278725,21.824477493406572,21.849635392534417,21.874793291662264,21.89995119079011,21.925109089917957,21.9502669890458,21.97542488817365,22.000582787301493,22.02574068642934,22.050898585557185,22.076056484685033,22.101214383812877,22.126372282940725,22.151530182068573,22.176688081196417,22.201845980324265,22.22700387945211,22.252161778579957,22.2773196777078,22.30247757683565,22.327635475963493,22.35279337509134,22.377951274219186,22.403109173347033,22.428267072474878,22.453424971602725,22.478582870730573,22.503740769858418,22.528898668986265,22.55405656811411,22.579214467241957,22.6043723663698,22.62953026549765,22.654688164625494,22.67984606375334,22.705003962881186,22.730161862009034,22.75531976113688,22.780477660264726,22.805635559392574,22.830793458520418,22.855951357648266,22.88110925677611,22.906267155903958,22.931425055031802,22.95658295415965,22.981740853287494,23.006898752415342,23.032056651543186,23.057214550671034,23.082372449798882,23.107530348926726,23.132688248054574,23.15784614718242,23.183004046310266,23.20816194543811,23.23331984456596,23.258477743693803,23.28363564282165,23.308793541949495,23.333951441077343,23.359109340205187,23.384267239333035,23.409425138460882,23.434583037588727,23.459740936716575,23.48489883584442,23.510056734972267,23.53521463410011,23.56037253322796,23.585530432355803,23.61068833148365,23.635846230611495,23.661004129739343,23.686162028867187,23.711319927995035,23.736477827122883,23.761635726250727,23.786793625378575,23.81195152450642,23.837109423634267,23.86226732276211,23.88742522188996,23.912583121017803,23.93774102014565,23.962898919273496,23.988056818401343,24.013214717529188,24.038372616657036,24.063530515784883,24.088688414912728,24.113846314040575,24.13900421316842,24.164162112296268,24.189320011424112,24.21447791055196,24.239635809679804,24.26479370880765,24.289951607935496,24.315109507063344,24.34026740619119,24.365425305319036,24.390583204446884,24.415741103574728,24.440899002702576,24.46605690183042,24.491214800958268,24.516372700086112,24.54153059921396,24.566688498341804,24.591846397469652,24.617004296597496,24.642162195725344,24.667320094853192,24.692477993981036,24.717635893108884,24.74279379223673,24.767951691364576,24.79310959049242,24.81826748962027,24.843425388748113,24.86858328787596,24.893741187003805,24.918899086131653,24.944056985259497,24.969214884387345,24.994372783515193,25.019530682643037,25.044688581770885,25.06984648089873,25.095004380026577,25.12016227915442,25.14532017828227,25.170478077410113,25.19563597653796,25.220793875665805,25.245951774793653,25.271109673921497,25.296267573049345,25.321425472177193,25.346583371305037,25.371741270432885,25.39689916956073,25.422057068688577,25.44721496781642,25.47237286694427,25.497530766072114,25.52268866519996,25.547846564327806,25.573004463455653,25.598162362583498,25.623320261711346,25.648478160839193,25.673636059967038,25.698793959094886,25.72395185822273,25.749109757350578,25.774267656478422,25.79942555560627,25.824583454734114,25.849741353861962,25.874899252989806,25.900057152117654,25.925215051245498,25.950372950373346,25.975530849501194,26.000688748629038,26.025846647756886,26.05100454688473,26.076162446012578,26.101320345140422,26.12647824426827,26.151636143396114,26.176794042523962,26.201951941651807,26.227109840779654,26.252267739907502,26.277425639035346,26.302583538163194,26.32774143729104,26.352899336418886,26.37805723554673,26.40321513467458,26.428373033802423,26.45353093293027,26.478688832058115,26.503846731185963,26.529004630313807,26.554162529441655,26.579320428569503,26.604478327697347,26.629636226825195,26.65479412595304,26.679952025080887,26.70510992420873,26.73026782333658,26.755425722464423,26.78058362159227,26.805741520720115,26.830899419847963,26.856057318975807,26.881215218103655,26.906373117231503,26.931531016359347,26.956688915487195,26.98184681461504,27.007004713742887,27.03216261287073,27.05732051199858,27.082478411126424,27.10763631025427,27.132794209382116,27.157952108509964,27.183110007637808,27.208267906765656,27.233425805893503,27.258583705021348,27.283741604149196,27.30889950327704,27.334057402404888,27.359215301532732,27.38437320066058,27.409531099788424,27.434688998916272,27.459846898044116,27.485004797171964,27.51016269629981,27.535320595427656,27.560478494555504,27.585636393683348,27.610794292811196,27.63595219193904,27.661110091066888,27.686267990194732,27.71142588932258,27.736583788450424,27.761741687578272,27.786899586706117,27.812057485833964,27.837215384961812,27.862373284089657,27.887531183217504,27.91268908234535,27.937846981473196,27.96300488060104,27.98816277972889,28.013320678856733,28.03847857798458,28.063636477112425,28.088794376240273,28.113952275368117,28.139110174495965,28.164268073623813,28.189425972751657,28.214583871879505,28.23974177100735,28.264899670135197,28.29005756926304,28.31521546839089,28.340373367518733,28.36553126664658,28.390689165774425,28.415847064902273,28.441004964030117,28.466162863157965,28.491320762285813,28.516478661413657,28.541636560541505,28.56679445966935,28.591952358797197,28.61711025792504,28.64226815705289,28.667426056180734,28.69258395530858,28.717741854436426,28.742899753564274,28.768057652692118,28.793215551819966,28.818373450947814,28.843531350075658,28.868689249203506,28.89384714833135,28.919005047459198,28.944162946587042,28.96932084571489,28.994478744842734,29.019636643970582,29.044794543098426,29.069952442226274,29.09511034135412,29.120268240481966,29.145426139609814,29.17058403873766,29.195741937865506,29.22089983699335,29.246057736121198,29.271215635249042,29.29637353437689,29.321531433504735,29.346689332632582,29.371847231760427,29.397005130888274,29.42216303001612,29.447320929143967,29.472478828271814,29.49763672739966,29.522794626527507,29.54795252565535,29.5731104247832,29.598268323911043,29.62342622303889,29.648584122166735,29.673742021294583,29.698899920422427,29.724057819550275,29.749215718678123,29.774373617805967,29.799531516933815,29.82468941606166,29.849847315189507,29.87500521431735,29.9001631134452,29.925321012573043,29.95047891170089,29.975636810828735,30.000794709956583,30.025952609084428,30.051110508212275,30.076268407340123,30.101426306467967,30.126584205595815,30.15174210472366,30.176900003851507,30.20205790297935,30.2272158021072,30.252373701235044,30.27753160036289,30.302689499490736,30.327847398618584,30.353005297746428,30.378163196874276,30.403321096002124,30.428478995129968,30.453636894257816,30.47879479338566,30.503952692513508,30.529110591641352,30.5542684907692,30.579426389897044,30.604584289024892,30.629742188152736,30.654900087280584,30.68005798640843,30.705215885536276,30.730373784664124,30.75553168379197,30.780689582919816,30.80584748204766,30.83100538117551,30.856163280303353,30.8813211794312,30.906479078559045,30.931636977686892,30.956794876814737,30.981952775942585,31.00711067507043,31.032268574198277,31.057426473326124,31.08258437245397,31.107742271581817,31.13290017070966,31.15805806983751,31.183215968965353,31.2083738680932,31.233531767221045,31.258689666348893,31.283847565476737,31.309005464604585,31.33416336373243,31.359321262860277,31.384479161988125,31.40963706111597,31.434794960243817,31.45995285937166,31.48511075849951,31.510268657627353,31.5354265567552,31.560584455883046,31.585742355010893,31.610900254138738,31.636058153266585,31.661216052394433,31.686373951522278,31.711531850650125,31.73668974977797,31.761847648905817,31.78700554803366,31.81216344716151,31.837321346289354,31.8624792454172,31.887637144545046,31.912795043672894,31.937952942800738,31.963110841928586,31.988268741056434,32.01342664018428,32.038584539312126,32.063742438439974,32.088900337567814,32.11405823669566,32.13921613582351,32.16437403495136,32.1895319340792,32.214689833207046,32.239847732334894,32.26500563146274,32.29016353059058,32.31532142971843,32.34047932884628,32.365637227974126,32.390795127101974,32.415953026229815,32.44111092535766,32.46626882448551,32.49142672361336,32.5165846227412,32.54174252186905,32.566900420996895,32.59205832012474,32.61721621925259,32.64237411838043,32.66753201750828,32.69268991663613,32.717847815763974,32.743005714891815,32.76816361401966,32.79332151314751,32.81847941227536,32.8436373114032,32.86879521053105,32.893953109658895,32.91911100878674,32.94426890791459,32.96942680704243,32.99458470617028,33.01974260529813,33.044900504425975,33.070058403553816,33.09521630268166,33.12037420180951,33.14553210093736,33.1706900000652,33.19584789919305,33.221005798320896,33.24616369744874,33.27132159657659,33.29647949570443,33.32163739483228,33.34679529396013,33.371953193087975,33.397111092215816,33.422268991343664,33.44742689047151,33.47258478959936,33.4977426887272,33.52290058785505,33.548058486982896,33.573216386110744,33.59837428523859,33.62353218436643,33.64869008349428,33.67384798262213,33.699005881749976,33.72416378087782,33.749321680005664,33.77447957913351,33.79963747826136,33.8247953773892,33.84995327651705,33.875111175644896,33.900269074772744,33.92542697390059,33.95058487302843,33.97574277215628,34.00090067128413,34.026058570411976,34.05121646953982,34.076374368667665,34.10153226779551,34.12669016692336,34.1518480660512,34.17700596517905,34.2021638643069,34.227321763434745,34.25247966256259,34.27763756169043,34.30279546081828,34.32795335994613,34.35311125907398,34.37826915820182,34.403427057329665,34.42858495645751,34.45374285558536,34.4789007547132,34.50405865384105,34.5292165529689,34.554374452096745,34.57953235122459,34.604690250352434,34.62984814948028,34.65500604860813,34.68016394773598,34.70532184686382,34.730479745991666,34.75563764511951,34.78079554424736,34.8059534433752,34.83111134250305,34.8562692416309,34.881427140758746,34.90658503988659,34.931742939014434,34.95690083814228,34.98205873727013,35.00721663639798,35.03237453552582,35.057532434653666,35.082690333781514,35.10784823290936,35.1330061320372,35.15816403116505,35.1833219302929,35.208479829420746,35.233637728548594,35.258795627676434,35.28395352680428,35.30911142593213,35.33426932505998,35.35942722418782,35.38458512331567,35.409743022443514,35.43490092157136,35.4600588206992,35.48521671982705,35.5103746189549,35.535532518082746,35.560690417210594,35.585848316338435,35.61100621546628,35.63616411459413,35.66132201372198,35.68647991284982,35.71163781197767,35.736795711105515,35.76195361023336,35.7871115093612,35.81226940848905,35.8374273076169,35.86258520674475,35.887743105872595,35.912901005000435,35.93805890412828,35.96321680325613,35.98837470238398,36.01353260151182,36.03869050063967,36.063848399767515,36.08900629889536,36.11416419802321,36.13932209715105,36.1644799962789,36.18963789540675,36.214795794534595,36.239953693662436,36.265111592790284,36.29026949191813,36.31542739104598,36.34058529017382,36.36574318930167,36.390901088429516,36.41605898755736,36.44121688668521,36.46637478581305,36.4915326849409,36.51669058406875,36.541848483196596,36.567006382324436,36.592164281452284,36.61732218058013,36.64248007970798,36.66763797883582,36.69279587796367,36.717953777091516,36.743111676219364,36.76826957534721,36.79342747447505,36.8185853736029,36.84374327273075,36.868901171858596,36.89405907098644,36.919216970114284,36.94437486924213,36.96953276836998,36.99469066749782,37.01984856662567,37.04500646575352,37.070164364881364,37.09532226400921,37.12048016313705,37.1456380622649,37.17079596139275,37.195953860520596,37.22111175964844,37.246269658776285,37.27142755790413,37.29658545703198,37.32174335615982,37.34690125528767,37.37205915441552,37.397217053543365,37.42237495267121,37.44753285179905,37.4726907509269,37.49784865005475,37.5230065491826,37.54816444831044,37.573322347438285,37.59848024656613,37.62363814569398,37.64879604482182,37.67395394394967,37.69911184307752]}
},{}],75:[function(require,module,exports){
module.exports={"expected":[2.0414049191494212e15,105.99404734313907,52.99230642553678,35.322962650377086,26.486717880853735,21.18371239993002,17.647326227131128,15.120436449501707,13.224481554325706,11.749149540021401,10.568253160489988,9.601491399806708,8.7953302095571,8.11270752124108,7.5271503962084765,7.019245315612645,6.5744321116249465,6.181576511153464,5.8320184983165975,5.518921194023171,5.236815071672452,4.981272396934462,4.748670456675,4.536016554242633,4.340816755928997,4.160976138273159,3.994722055213861,3.8405444569811342,3.6971489977918592,3.5634198453968007,3.438389928713948,3.3212169439797714,3.211163859742794,3.107582966399683,3.009902740514706,2.917616960966007,2.8302756390635606,2.7474774194546216,2.668863180882226,2.594110621438563,2.522929656026294,2.4550584873582504,2.390260238239151,2.3283200537574986,2.2690425986294915,2.2122498882265194,2.157779402508342,2.105482440727097,2.0552226817894614,2.006874920897265,1.9603239577875702,1.915463615764225,1.8721958739143478,1.8304300975607926,1.790082354216077,1.7510748041557762,1.7133351562839205,1.6767961812718912,1.6413952750584684,1.6070740667359644,1.573778065643864,1.5414563431707269,1.5100612453456452,1.479548132798006,1.4498751450921104,1.4210029868116316,1.3928947330869206,1.3655156525337733,1.3388330458112585,1.3128160982138748,1.2874357448945566,1.2626645474731817,1.238476580923439,1.2148473297524973,1.1917535925942107,1.1691733944305356,1.1470859057384917,1.1254713679328854,1.1043110245397227,1.0835870575924413,1.0632825287937882,1.043381325031405,1.0238681078753833,1.0047282667217645,0.9859478752780663,0.9675136511155126,0.9494129180381559,0.9316335710421444,0.9141640436589907,0.8969932774951374,0.8801106937968828,0.8635061668847528,0.8471699993148689,0.8310928986372026,0.8152659556316655,0.7996806239129307,0.7843287008040426,0.7692023093871122,0.7542938816467953,0.7395961426291382,0.725102095544558,0.7108050077492727,0.6966983975447852,0.682776021739564,0.6690318639214455,0.6554601233931981,0.6420552047271938,0.6288117078984975,0.6157244189586819,0.6027883012153741,0.5899984868851375,0.5773502691896244,0.5648390948670051,0.552460557072717,0.540210388645391,0.5280844557154177,0.5160787516352264,0.504189391211763,0.49241260522291436,0.48074473520089595,0.46918222846674323,0.4577216334010255,0.4463595949369226,0.435092850262695,0.4239182247213419,0.4128326278960713,0.40183304987091073,0.39091655765637945,0.38008029177086516,0.36932146296880636,0.35863734910737977,0.3480252921438851,0.33748269525641766,0.3270070200809052,0.3165957840579763,0.3062465578834471,0.29595696305660835,0.2857246695208159,0.2755473933911336,0.2654228947641078,0.25534897560501274,0.24532347770809565,0.23534428072562727,0.22540930026177314,0.21551648602744672,0.20566382005253767,0.19584931495207739,0.18607101224301426,0.1763269807084643,0.16661531480644337,0.15693413312016005,0.14728157684711907,0.1376558083243911,0.12805500958745736,0.11847738096017943,0.10892113967353101,0.09938451851074386,0.08986576447669128,0.08036313748929777,0.07087490909088613,0.06139936117742449,0.051934784743634395,0.04247947864201193,0.03303174835384992,0.023589904770332827,0.014152262981850584,0.004717141073698643,-0.0047171410736995,-0.014152262981851441,-0.023589904770333684,-0.033031748353850775,-0.04247947864201279,-0.051934784743635255,-0.06139936117742535,-0.07087490909088699,-0.08036313748929863,-0.08986576447669214,-0.09938451851074472,-0.10892113967353187,-0.1184773809601803,-0.12805500958745822,-0.13765580832439198,-0.14728157684711995,-0.15693413312016094,-0.16661531480644426,-0.1763269807084652,-0.18607101224301514,-0.19584931495207827,-0.20566382005253853,-0.21551648602744763,-0.22540930026177403,-0.23534428072562819,-0.24532347770809657,-0.25534897560501363,-0.2654228947641087,-0.27554739339113454,-0.2857246695208168,-0.2959569630566093,-0.306246557883448,-0.3165957840579772,-0.32700702008090615,-0.3374826952564186,-0.34802529214388606,-0.35863734910738077,-0.3693214629688073,-0.3800802917708661,-0.3909165576563804,-0.4018330498709117,-0.41283262789607234,-0.42391822472134294,-0.435092850262696,-0.4463595949369236,-0.4577216334010265,-0.4691822284667443,-0.48074473520089706,-0.49241260522291547,-0.5041893912117641,-0.5160787516352275,-0.5280844557154188,-0.5402103886453921,-0.5524605570727181,-0.5648390948670062,-0.5773502691896255,-0.5899984868851386,-0.6027883012153752,-0.6157244189586831,-0.6288117078984986,-0.642055204727195,-0.6554601233931994,-0.6690318639214468,-0.6827760217395652,-0.6966983975447865,-0.7108050077492739,-0.7251020955445593,-0.7395961426291396,-0.7542938816467968,-0.7692023093871135,-0.7843287008040439,-0.7996806239129322,-0.8152659556316669,-0.831092898637204,-0.8471699993148704,-0.8635061668847543,-0.8801106937968843,-0.8969932774951388,-0.9141640436589922,-0.931633571042146,-0.9494129180381575,-0.9675136511155142,-0.9859478752780679,-1.0047282667217663,-1.023868107875385,-1.0433813250314068,-1.06328252879379,-1.0835870575924433,-1.1043110245397245,-1.1254713679328874,-1.1470859057384934,-1.1691733944305378,-1.1917535925942127,-1.2148473297524995,-1.2384765809234413,-1.262664547473184,-1.2874357448945588,-1.312816098213877,-1.338833045811261,-1.3655156525337757,-1.3928947330869228,-1.421002986811634,-1.449875145092113,-1.479548132798009,-1.5100612453456481,-1.5414563431707295,-1.573778065643867,-1.6070740667359675,-1.6413952750584715,-1.6767961812718943,-1.713335156283924,-1.7510748041557795,-1.790082354216081,-1.8304300975607963,-1.8721958739143518,-1.9154636157642293,-1.9603239577875746,-2.0068749208972694,-2.055222681789466,-2.1054824407271013,-2.1577794025083468,-2.2122498882265242,-2.2690425986294973,-2.328320053757504,-2.390260238239157,-2.4550584873582566,-2.5229296560263004,-2.594110621438569,-2.6688631808822327,-2.7474774194546288,-2.830275639063568,-2.917616960966016,-3.0099027405147147,-3.1075829663996917,-3.2111638597428036,-3.321216943979782,-3.438389928713959,-3.5634198453968127,-3.697148997791872,-3.840544456981148,-3.994722055213875,-4.160976138273175,-4.340816755929015,-4.536016554242651,-4.748670456675019,-4.981272396934483,-5.236815071672476,-5.518921194023197,-5.832018498316628,-6.181576511153498,-6.574432111624985,-7.019245315612687,-7.527150396208525,-8.112707521241138,-8.795330209557168,-9.601491399806788,-10.568253160490084,-11.74914954002152,-13.224481554325855,-15.120436449501902,-17.647326227131394,-21.183712399930407,-26.48671788085434,-35.32296265037816,-52.992306425539184,-105.99404734314871,2.7218732255325615e15,105.99404734314044,52.99230642553712,35.32296265037724,26.486717880853824,21.183712399930073,17.647326227131163,15.120436449501735,13.224481554325727,11.749149540021419,10.568253160490002,9.60149139980672,8.795330209557111,8.11270752124109,7.527150396208483,7.01924531561265,6.574432111624953,6.1815765111534695,5.832018498316601,5.518921194023175,5.236815071672455,4.9812723969344646,4.748670456675002,4.536016554242635,4.340816755929,4.160976138273162,3.9947220552138627,3.840544456981137,3.6971489977918606,3.563419845396803,3.438389928713949,3.3212169439797727,3.2111638597427956,3.1075829663996837,3.009902740514707,2.9176169609660088,2.8302756390635615,2.7474774194546225,2.668863180882227,2.5941106214385634,2.522929656026295,2.4550584873582513,2.390260238239152,2.328320053757499,2.2690425986294924,2.21224988822652,2.1577794025083428,2.1054824407270973,2.055222681789462,2.006874920897266,1.960323957787571,1.9154636157642255,1.8721958739143487,1.830430097560793,1.7900823542160778,1.7510748041557769,1.7133351562839212,1.6767961812718917,1.6413952750584688,1.6070740667359646,1.5737780656438645,1.541456343170727,1.510061245345646,1.4795481327980065,1.4498751450921106,1.4210029868116318,1.3928947330869206,1.3655156525337737,1.338833045811259,1.312816098213875,1.287435744894557,1.262664547473182,1.2384765809234393,1.2148473297524978,1.191753592594211,1.169173394430536,1.1470859057384917,1.1254713679328856,1.104311024539723,1.0835870575924418,1.0632825287937884,1.0433813250314052,1.0238681078753835,1.0047282667217647,0.9859478752780664,0.9675136511155128,0.9494129180381561,0.9316335710421446,0.9141640436589908,0.8969932774951375,0.880110693796883,0.863506166884753,0.8471699993148691,0.8310928986372028,0.8152659556316657,0.7996806239129308,0.7843287008040427,0.7692023093871123,0.7542938816467957,0.7395961426291384,0.7251020955445582,0.7108050077492728,0.6966983975447855,0.6827760217395641,0.6690318639214458,0.6554601233931983,0.642055204727194,0.6288117078984976,0.615724418958682,0.6027883012153742,0.5899984868851376,0.5773502691896245,0.5648390948670052,0.5524605570727172,0.5402103886453911,0.5280844557154178,0.5160787516352265,0.5041893912117631,0.49241260522291447,0.48074473520089617,0.46918222846674346,0.45772163340102556,0.44635959493692273,0.43509285026269506,0.42391822472134205,0.4128326278960714,0.4018330498709109,0.39091655765637956,0.3800802917708653,0.36932146296880647,0.3586373491073799,0.3480252921438852,0.33748269525641783,0.3270070200809053,0.31659578405797645,0.30624655788344723,0.29595696305660846,0.28572466952081604,0.2755473933911337,0.2654228947641079,0.25534897560501285,0.24532347770809582,0.2353442807256274,0.22540930026177328,0.21551648602744686,0.20566382005253778,0.19584931495207752,0.18607101224301437,0.17632698070846445,0.1666153148064435,0.15693413312016016,0.1472815768471192,0.13765580832439211,0.12805500958745747,0.11847738096017955,0.10892113967353023,0.09938451851074398,0.08986576447669141,0.08036313748929699,0.07087490909088626,0.0613993611774255,0.051934784743633625,0.042479478642012056,0.033031748353850934,0.02358990477033206,0.014152262981850707,0.004717141073699654,-0.004717141073700266,-0.014152262981851318,-0.023589904770332674,-0.033031748353851545,-0.04247947864201267,-0.05193478474363424,-0.061399361177426115,-0.07087490909088687,-0.08036313748929762,-0.08986576447669203,-0.09938451851074459,-0.10892113967353084,-0.11847738096018018,-0.1280550095874581,-0.13765580832439273,-0.14728157684711982,-0.1569341331201608,-0.16661531480644504,-0.1763269807084651,-0.18607101224301503,-0.1958493149520791,-0.20566382005253842,-0.21551648602744655,-0.2254093002617748,-0.23534428072562805,-0.24532347770809548,-0.25534897560501446,-0.2654228947641086,-0.27554739339113343,-0.28572466952081765,-0.2959569630566091,-0.30624655788344696,-0.31659578405797806,-0.327007020080906,-0.3374826952564175,-0.3480252921438859,-0.35863734910738065,-0.36932146296880614,-0.380080291770866,-0.3909165576563802,-0.4018330498709105,-0.41283262789607217,-0.4239182247213428,-0.4350928502626969,-0.4463595949369235,-0.45772163340102634,-0.4691822284667453,-0.4807447352008969,-0.49241260522291525,-0.5041893912117651,-0.5160787516352273,-0.5280844557154175,-0.5402103886453931,-0.552460557072718,-0.5648390948670049,-0.5773502691896265,-0.5899984868851385,-0.6027883012153739,-0.6157244189586841,-0.6288117078984985,-0.6420552047271936,-0.6554601233932004,-0.6690318639214466,-0.6827760217395638,-0.6966983975447862,-0.7108050077492737,-0.7251020955445577,-0.7395961426291394,-0.7542938816467966,-0.7692023093871148,-0.7843287008040437,-0.7996806239129318,-0.815265955631668,-0.8310928986372038,-0.8471699993148702,-0.8635061668847557,-0.8801106937968842,-0.896993277495137,-0.9141640436589937,-0.9316335710421458,-0.9494129180381555,-0.9675136511155157,-0.9859478752780677,-1.0047282667217643,-1.0238681078753866,-1.0433813250314066,-1.063282528793788,-1.083587057592445,-1.1043110245397243,-1.1254713679328852,-1.1470859057384932,-1.1691733944305374,-1.1917535925942104,-1.214847329752499,-1.2384765809234408,-1.2626645474731812,-1.2874357448945584,-1.3128160982138766,-1.3388330458112632,-1.3655156525337753,-1.3928947330869226,-1.4210029868116365,-1.4498751450921126,-1.4795481327980085,-1.5100612453456506,-1.5414563431707293,-1.5737780656438634,-1.6070740667359702,-1.641395275058471,-1.6767961812718906,-1.7133351562839272,-1.7510748041557793,-1.7900823542160769,-1.8304300975607992,-1.8721958739143514,-1.9154636157642244,-1.9603239577875784,-2.006874920897269,-2.0552226817894605,-2.105482440727101,-2.157779402508346,-2.212249888226518,-2.2690425986294964,-2.328320053757503,-2.39026023823915,-2.4550584873582557,-2.5229296560262995,-2.594110621438575,-2.6688631808822323,-2.747477419454628,-2.8302756390635753,-2.917616960966014,-3.0099027405147045,-3.1075829663996997,-3.2111638597428027,-3.3212169439797696,-3.4383899287139688,-3.5634198453968113,-3.697148997791857,-3.8405444569811604,-3.9947220552138734,-4.160976138273156,-4.34081675592903,-4.536016554242649,-4.748670456674995,-4.981272396934503,-5.236815071672472,-5.518921194023166,-5.832018498316623,-6.181576511153493,-6.57443211162494,-7.0192453156126815,-7.527150396208517,-8.11270752124119,-8.795330209557159,-9.601491399806775,-10.56825316049017,-11.749149540021504,-13.224481554325838,-15.120436449502078,-17.647326227131355,-21.183712399929952,-26.48671788085488,-35.32296265037801,-52.99230642553635,-105.9940473431573,4.0828098382988425e15,105.9940473431518,52.99230642553498,35.32296265037739,26.486717880854535,21.183712399929732,17.647326227131202,15.120436449501966,13.224481554325749,11.749149540021437,10.568253160490116,9.601491399806731,8.79533020955712,8.112707521241157,7.527150396208491,7.0192453156126575,6.574432111624919,6.181576511153473,5.832018498316606,5.51892119402315,5.236815071672459,4.98127239693449,4.748670456674984,4.536016554242638,4.34081675592902,4.160976138273147,3.9947220552138645,3.8405444569811524,3.69714899779185,3.5634198453968042,3.438389928713962,3.3212169439797634,3.211163859742797,3.1075829663996943,3.0099027405146996,2.9176169609660096,2.830275639063571,2.747477419454624,2.6688631808822283,2.5941106214385714,2.522929656026296,2.455058487358252,2.3902602382391467,2.3283200537575,2.2690425986294933,2.2122498882265154,2.157779402508343,2.1054824407270982,2.055222681789458,2.0068749208972663,1.9603239577875757,1.9154636157642222,1.872195873914349,1.8304300975607974,1.7900823542160746,1.7510748041557773,1.7133351562839252,1.6767961812718888,1.6413952750584693,1.6070740667359684,1.5737780656438618,1.5414563431707275,1.5100612453456492,1.479548132798007,1.449875145092111,1.421002986811635,1.392894733086921,1.3655156525337742,1.3388330458112616,1.3128160982138752,1.287435744894557,1.26266454747318,1.2384765809234397,1.214847329752498,1.1917535925942093,1.1691733944305363,1.1470859057384921,1.125471367932884,1.1043110245397232,1.083587057592444,1.0632825287937866,1.0433813250314055,1.0238681078753857,1.0047282667217632,0.9859478752780666,0.9675136511155147,0.9494129180381545,0.9316335710421448,0.9141640436589927,0.8969932774951361,0.8801106937968833,0.8635061668847548,0.8471699993148692,0.831092898637203,0.8152659556316674,0.7996806239129309,0.784328700804043,0.769202309387114,0.7542938816467958,0.7395961426291386,0.725102095544557,0.710805007749273,0.6966983975447857,0.682776021739563,0.6690318639214459,0.6554601233931997,0.6420552047271929,0.6288117078984978,0.6157244189586835,0.6027883012153732,0.5899984868851377,0.5773502691896258,0.5648390948670042,0.5524605570727174,0.5402103886453924,0.5280844557154168,0.5160787516352268,0.5041893912117644,0.4924126052229147,0.4807447352008963,0.4691822284667447,0.4577216334010258,0.4463595949369229,0.43509285026269634,0.4239182247213422,0.41283262789607156,0.40183304987090995,0.3909165576563797,0.38008029177086544,0.36932146296880564,0.35863734910738004,0.34802529214388533,0.33748269525641694,0.3270070200809055,0.31659578405797756,0.3062465578834464,0.2959569630566086,0.2857246695208171,0.27554739339113293,0.265422894764108,0.2553489756050139,0.245323477708095,0.23534428072562755,0.2254093002617743,0.21551648602744608,0.2056638200525379,0.19584931495207858,0.1860710122430145,0.17632698070846456,0.16661531480644456,0.1569341331201603,0.14728157684711932,0.13765580832439225,0.1280550095874576,0.11847738096017968,0.10892113967353036,0.0993845185107441,0.08986576447669153,0.08036313748929712,0.07087490909088638,0.061399361177425615,0.05193478474363375,0.04247947864201218,0.03303174835385105,0.023589904770332182,0.014152262981850829,0.0047171410736997765,-0.004717141073700144,-0.014152262981851196,-0.02358990477033255,-0.03303174835385142,-0.04247947864201255,-0.05193478474363412,-0.06139936117742599,-0.07087490909088674,-0.08036313748929749,-0.0898657644766919,-0.09938451851074447,-0.10892113967353072,-0.11847738096018005,-0.12805500958745797,-0.13765580832439261,-0.1472815768471197,-0.1569341331201607,-0.16661531480644493,-0.17632698070846495,-0.18607101224301487,-0.19584931495207897,-0.2056638200525383,-0.21551648602744644,-0.22540930026177472,-0.23534428072562794,-0.2453234777080954,-0.2553489756050143,-0.2654228947641084,-0.2755473933911333,-0.28572466952081754,-0.295956963056609,-0.3062465578834468,-0.31659578405797795,-0.3270070200809059,-0.33748269525641733,-0.3480252921438858,-0.3586373491073805,-0.369321462968806,-0.3800802917708659,-0.3909165576563801,-0.4018330498709104,-0.412832627896072,-0.4239182247213426,-0.43509285026269673,-0.44635959493692334,-0.45772163340102623,-0.46918222846674507,-0.4807447352008968,-0.49241260522291513,-0.5041893912117649,-0.5160787516352272,-0.5280844557154174,-0.5402103886453928,-0.5524605570727178,-0.5648390948670048,-0.5773502691896264,-0.5899984868851382,-0.6027883012153736,-0.615724418958684,-0.6288117078984984,-0.6420552047271935,-0.6554601233932003,-0.6690318639214464,-0.6827760217395635,-0.6966983975447861,-0.7108050077492736,-0.7251020955445576,-0.7395961426291392,-0.7542938816467963,-0.7692023093871145,-0.7843287008040436,-0.7996806239129317,-0.8152659556316679,-0.8310928986372035,-0.8471699993148699,-0.8635061668847555,-0.8801106937968839,-0.8969932774951375,-0.9141640436589935,-0.9316335710421456,-0.9494129180381561,-0.9675136511155147,-0.9859478752780675,-1.0047282667217647,-1.0238681078753855,-1.0433813250314063,-1.0632825287937884,-1.0835870575924438,-1.104311024539724,-1.125471367932885,-1.1470859057384941,-1.1691733944305371,-1.19175359259421,-1.2148473297525,-1.2384765809234395,-1.2626645474731808,-1.2874357448945593,-1.3128160982138752,-1.3388330458112627,-1.3655156525337764,-1.3928947330869208,-1.421002986811636,-1.4498751450921123,-1.4795481327980067,-1.5100612453456501,-1.5414563431707287,-1.5737780656438645,-1.6070740667359698,-1.6413952750584706,-1.676796181271892,-1.7133351562839247,-1.7510748041557789,-1.7900823542160778,-1.830430097560797,-1.8721958739143505,-1.915463615764224,-1.9603239577875753,-2.006874920897268,-2.0552226817894597,-2.1054824407271027,-2.1577794025083454,-2.2122498882265176,-2.269042598629498,-2.3283200537574995,-2.3902602382391493,-2.455058487358258,-2.5229296560262955,-2.5941106214385745,-2.668863180882231,-2.747477419454623,-2.830275639063574,-2.917616960966013,-3.0099027405147076,-3.1075829663996988,-3.211163859742801,-3.321216943979773,-3.4383899287139617,-3.563419845396809,-3.6971489977918615,-3.8405444569811515,-3.9947220552138707,-4.1609761382731625,-4.340816755929018,-4.536016554242646,-4.748670456674993,-4.9812723969344885,-5.23681507167247,-5.518921194023162,-5.832018498316635,-6.18157651115347,-6.574432111624934,-7.019245315612698,-7.527150396208486,-8.112707521241182,-8.795330209557184,-9.601491399806724,-10.568253160490157,-11.749149540021486,-13.224481554325735,-15.12043644950205,-17.647326227131316,-21.183712399930094,-26.48671788085479,-35.32296265037785,-52.99230642553726,-105.99404734315095,8.165619676597685e15],"x":[-12.566370614359172,-12.55693640218623,-12.547502190013288,-12.538067977840345,-12.528633765667402,-12.519199553494461,-12.509765341321518,-12.500331129148575,-12.490896916975634,-12.481462704802691,-12.472028492629748,-12.462594280456807,-12.453160068283864,-12.443725856110921,-12.43429164393798,-12.424857431765037,-12.415423219592096,-12.405989007419153,-12.39655479524621,-12.38712058307327,-12.377686370900326,-12.368252158727383,-12.358817946554442,-12.3493837343815,-12.339949522208556,-12.330515310035615,-12.321081097862672,-12.31164688568973,-12.302212673516788,-12.292778461343845,-12.283344249170902,-12.273910036997961,-12.264475824825018,-12.255041612652075,-12.245607400479134,-12.236173188306191,-12.226738976133248,-12.217304763960307,-12.207870551787364,-12.198436339614421,-12.18900212744148,-12.179567915268537,-12.170133703095596,-12.160699490922653,-12.15126527874971,-12.141831066576769,-12.132396854403826,-12.122962642230883,-12.113528430057942,-12.104094217884999,-12.094660005712056,-12.085225793539115,-12.075791581366172,-12.066357369193229,-12.056923157020288,-12.047488944847345,-12.038054732674402,-12.02862052050146,-12.019186308328518,-12.009752096155575,-12.000317883982634,-11.99088367180969,-11.981449459636748,-11.972015247463807,-11.962581035290864,-11.95314682311792,-11.94371261094498,-11.934278398772037,-11.924844186599094,-11.915409974426153,-11.90597576225321,-11.896541550080268,-11.887107337907326,-11.877673125734383,-11.868238913561441,-11.858804701388499,-11.849370489215556,-11.839936277042614,-11.830502064869671,-11.821067852696729,-11.811633640523787,-11.802199428350844,-11.792765216177902,-11.78333100400496,-11.773896791832017,-11.764462579659074,-11.755028367486133,-11.74559415531319,-11.736159943140247,-11.726725730967306,-11.717291518794363,-11.70785730662142,-11.69842309444848,-11.688988882275536,-11.679554670102593,-11.670120457929652,-11.66068624575671,-11.651252033583766,-11.641817821410825,-11.632383609237882,-11.622949397064941,-11.613515184891998,-11.604080972719055,-11.594646760546114,-11.585212548373171,-11.575778336200228,-11.566344124027287,-11.556909911854344,-11.547475699681401,-11.53804148750846,-11.528607275335517,-11.519173063162574,-11.509738850989633,-11.50030463881669,-11.490870426643747,-11.481436214470806,-11.472002002297863,-11.46256779012492,-11.453133577951979,-11.443699365779036,-11.434265153606093,-11.424830941433152,-11.415396729260209,-11.405962517087266,-11.396528304914325,-11.387094092741382,-11.37765988056844,-11.368225668395498,-11.358791456222555,-11.349357244049614,-11.33992303187667,-11.330488819703728,-11.321054607530787,-11.311620395357844,-11.3021861831849,-11.29275197101196,-11.283317758839017,-11.273883546666074,-11.264449334493133,-11.25501512232019,-11.245580910147247,-11.236146697974306,-11.226712485801363,-11.21727827362842,-11.207844061455479,-11.198409849282536,-11.188975637109593,-11.179541424936652,-11.170107212763709,-11.160673000590766,-11.151238788417825,-11.141804576244882,-11.132370364071939,-11.122936151898998,-11.113501939726055,-11.104067727553113,-11.09463351538017,-11.085199303207228,-11.075765091034286,-11.066330878861343,-11.0568966666884,-11.04746245451546,-11.038028242342516,-11.028594030169574,-11.019159817996632,-11.00972560582369,-11.000291393650746,-10.990857181477805,-10.981422969304862,-10.97198875713192,-10.962554544958978,-10.953120332786035,-10.943686120613092,-10.934251908440151,-10.924817696267208,-10.915383484094265,-10.905949271921324,-10.896515059748381,-10.887080847575438,-10.877646635402497,-10.868212423229554,-10.858778211056613,-10.84934399888367,-10.839909786710727,-10.830475574537786,-10.821041362364843,-10.8116071501919,-10.802172938018959,-10.792738725846016,-10.783304513673073,-10.773870301500132,-10.764436089327189,-10.755001877154246,-10.745567664981305,-10.736133452808362,-10.72669924063542,-10.717265028462478,-10.707830816289535,-10.698396604116592,-10.688962391943651,-10.679528179770708,-10.670093967597765,-10.660659755424824,-10.651225543251881,-10.641791331078938,-10.632357118905997,-10.622922906733054,-10.613488694560111,-10.60405448238717,-10.594620270214227,-10.585186058041286,-10.575751845868343,-10.5663176336954,-10.556883421522459,-10.547449209349516,-10.538014997176573,-10.528580785003632,-10.519146572830689,-10.509712360657746,-10.500278148484805,-10.490843936311862,-10.481409724138919,-10.471975511965978,-10.462541299793035,-10.453107087620092,-10.44367287544715,-10.434238663274208,-10.424804451101265,-10.415370238928324,-10.40593602675538,-10.396501814582438,-10.387067602409497,-10.377633390236554,-10.36819917806361,-10.35876496589067,-10.349330753717727,-10.339896541544785,-10.330462329371843,-10.3210281171989,-10.311593905025958,-10.302159692853015,-10.292725480680073,-10.283291268507131,-10.273857056334188,-10.264422844161246,-10.254988631988304,-10.245554419815361,-10.236120207642418,-10.226685995469477,-10.217251783296534,-10.207817571123591,-10.19838335895065,-10.188949146777707,-10.179514934604764,-10.170080722431823,-10.16064651025888,-10.151212298085937,-10.141778085912996,-10.132343873740053,-10.12290966156711,-10.11347544939417,-10.104041237221226,-10.094607025048283,-10.085172812875342,-10.0757386007024,-10.066304388529458,-10.056870176356515,-10.047435964183572,-10.038001752010631,-10.028567539837688,-10.019133327664745,-10.009699115491804,-10.000264903318861,-9.990830691145918,-9.981396478972977,-9.971962266800034,-9.962528054627091,-9.95309384245415,-9.943659630281207,-9.934225418108264,-9.924791205935323,-9.91535699376238,-9.905922781589437,-9.896488569416496,-9.887054357243553,-9.87762014507061,-9.868185932897669,-9.858751720724726,-9.849317508551783,-9.839883296378842,-9.830449084205899,-9.821014872032956,-9.811580659860015,-9.802146447687072,-9.79271223551413,-9.783278023341188,-9.773843811168245,-9.764409598995304,-9.75497538682236,-9.745541174649418,-9.736106962476477,-9.726672750303534,-9.71723853813059,-9.70780432595765,-9.698370113784707,-9.688935901611764,-9.679501689438823,-9.67006747726588,-9.660633265092937,-9.651199052919996,-9.641764840747053,-9.63233062857411,-9.622896416401169,-9.613462204228226,-9.604027992055283,-9.594593779882342,-9.585159567709399,-9.575725355536456,-9.566291143363514,-9.556856931190572,-9.54742271901763,-9.537988506844687,-9.528554294671745,-9.519120082498803,-9.50968587032586,-9.500251658152917,-9.490817445979976,-9.481383233807033,-9.47194902163409,-9.46251480946115,-9.453080597288206,-9.443646385115263,-9.434212172942322,-9.42477796076938,-9.415343748596436,-9.405909536423495,-9.396475324250552,-9.38704111207761,-9.377606899904668,-9.368172687731725,-9.358738475558782,-9.349304263385841,-9.339870051212898,-9.330435839039955,-9.321001626867014,-9.311567414694071,-9.302133202521128,-9.292698990348187,-9.283264778175244,-9.273830566002303,-9.26439635382936,-9.254962141656417,-9.245527929483476,-9.236093717310533,-9.22665950513759,-9.217225292964649,-9.207791080791706,-9.198356868618763,-9.188922656445822,-9.179488444272879,-9.170054232099936,-9.160620019926995,-9.151185807754052,-9.141751595581109,-9.132317383408168,-9.122883171235225,-9.113448959062282,-9.10401474688934,-9.094580534716398,-9.085146322543455,-9.075712110370514,-9.066277898197571,-9.056843686024628,-9.047409473851687,-9.037975261678744,-9.028541049505803,-9.01910683733286,-9.009672625159917,-9.000238412986976,-8.990804200814033,-8.98136998864109,-8.971935776468149,-8.962501564295206,-8.953067352122263,-8.943633139949322,-8.934198927776379,-8.924764715603436,-8.915330503430495,-8.905896291257552,-8.896462079084609,-8.887027866911668,-8.877593654738725,-8.868159442565782,-8.85872523039284,-8.849291018219898,-8.839856806046955,-8.830422593874014,-8.82098838170107,-8.811554169528128,-8.802119957355186,-8.792685745182244,-8.7832515330093,-8.77381732083636,-8.764383108663417,-8.754948896490475,-8.745514684317532,-8.73608047214459,-8.726646259971648,-8.717212047798705,-8.707777835625762,-8.698343623452821,-8.688909411279878,-8.679475199106935,-8.670040986933994,-8.660606774761051,-8.651172562588108,-8.641738350415167,-8.632304138242224,-8.622869926069281,-8.61343571389634,-8.604001501723397,-8.594567289550454,-8.585133077377513,-8.57569886520457,-8.566264653031627,-8.556830440858686,-8.547396228685743,-8.5379620165128,-8.52852780433986,-8.519093592166916,-8.509659379993973,-8.500225167821032,-8.49079095564809,-8.481356743475148,-8.471922531302205,-8.462488319129262,-8.453054106956321,-8.443619894783378,-8.434185682610435,-8.424751470437494,-8.415317258264551,-8.405883046091608,-8.396448833918667,-8.387014621745724,-8.377580409572781,-8.36814619739984,-8.358711985226897,-8.349277773053954,-8.339843560881013,-8.33040934870807,-8.320975136535127,-8.311540924362186,-8.302106712189243,-8.2926725000163,-8.283238287843359,-8.273804075670416,-8.264369863497473,-8.254935651324532,-8.245501439151589,-8.236067226978648,-8.226633014805705,-8.217198802632762,-8.20776459045982,-8.198330378286878,-8.188896166113935,-8.179461953940994,-8.17002774176805,-8.160593529595108,-8.151159317422167,-8.141725105249224,-8.13229089307628,-8.12285668090334,-8.113422468730397,-8.103988256557454,-8.094554044384513,-8.08511983221157,-8.075685620038627,-8.066251407865686,-8.056817195692743,-8.0473829835198,-8.037948771346858,-8.028514559173916,-8.019080347000973,-8.009646134828031,-8.000211922655089,-7.9907777104821465,-7.981343498309204,-7.9719092861362615,-7.962475073963319,-7.953040861790377,-7.9436066496174345,-7.934172437444492,-7.92473822527155,-7.915304013098608,-7.905869800925665,-7.896435588752723,-7.887001376579781,-7.877567164406838,-7.868132952233896,-7.858698740060954,-7.849264527888011,-7.839830315715069,-7.830396103542127,-7.820961891369184,-7.811527679196242,-7.8020934670233,-7.792659254850357,-7.783225042677415,-7.773790830504473,-7.764356618331531,-7.754922406158588,-7.745488193985646,-7.736053981812704,-7.726619769639761,-7.717185557466819,-7.707751345293877,-7.698317133120934,-7.688882920947992,-7.67944870877505,-7.670014496602107,-7.660580284429165,-7.651146072256223,-7.641711860083281,-7.632277647910338,-7.622843435737396,-7.613409223564454,-7.603975011391511,-7.594540799218569,-7.585106587045627,-7.575672374872684,-7.566238162699742,-7.5568039505268,-7.547369738353857,-7.537935526180915,-7.528501314007973,-7.519067101835031,-7.509632889662088,-7.500198677489146,-7.490764465316204,-7.481330253143261,-7.471896040970319,-7.462461828797377,-7.453027616624434,-7.443593404451492,-7.43415919227855,-7.424724980105607,-7.415290767932665,-7.405856555759723,-7.39642234358678,-7.386988131413838,-7.377553919240896,-7.368119707067954,-7.358685494895011,-7.349251282722069,-7.339817070549127,-7.330382858376184,-7.320948646203242,-7.3115144340302995,-7.302080221857357,-7.292646009684415,-7.2832117975114725,-7.27377758533853,-7.2643433731655875,-7.2549091609926455,-7.245474948819703,-7.2360407366467605,-7.2266065244738185,-7.217172312300876,-7.2077381001279335,-7.198303887954991,-7.188869675782049,-7.1794354636091064,-7.170001251436164,-7.160567039263222,-7.151132827090279,-7.141698614917337,-7.132264402744395,-7.122830190571453,-7.11339597839851,-7.103961766225568,-7.094527554052626,-7.085093341879683,-7.075659129706741,-7.066224917533799,-7.056790705360856,-7.047356493187914,-7.037922281014972,-7.028488068842029,-7.019053856669087,-7.009619644496145,-7.000185432323203,-6.99075122015026,-6.981317007977318,-6.971882795804376,-6.962448583631433,-6.953014371458491,-6.943580159285549,-6.934145947112606,-6.924711734939664,-6.915277522766722,-6.905843310593779,-6.896409098420837,-6.886974886247895,-6.877540674074952,-6.86810646190201,-6.858672249729068,-6.849238037556126,-6.839803825383183,-6.830369613210241,-6.820935401037299,-6.811501188864356,-6.802066976691414,-6.792632764518472,-6.783198552345529,-6.773764340172587,-6.764330127999645,-6.754895915826702,-6.74546170365376,-6.736027491480818,-6.726593279307876,-6.717159067134933,-6.707724854961991,-6.698290642789049,-6.688856430616106,-6.679422218443164,-6.669988006270222,-6.660553794097279,-6.651119581924337,-6.641685369751395,-6.632251157578452,-6.62281694540551,-6.613382733232568,-6.603948521059626,-6.594514308886683,-6.585080096713741,-6.575645884540799,-6.566211672367856,-6.556777460194914,-6.5473432480219715,-6.537909035849029,-6.528474823676087,-6.5190406115031445,-6.509606399330202,-6.5001721871572595,-6.4907379749843175,-6.4813037628113745,-6.4718695506384325,-6.4624353384654905,-6.453001126292548,-6.4435669141196055,-6.434132701946663,-6.424698489773721,-6.415264277600778,-6.405830065427836,-6.396395853254894,-6.386961641081951,-6.377527428909009,-6.368093216736067,-6.358659004563124,-6.349224792390182,-6.33979058021724,-6.330356368044298,-6.320922155871355,-6.311487943698413,-6.302053731525471,-6.292619519352528,-6.283185307179586,-6.273751095006644,-6.264316882833701,-6.254882670660759,-6.245448458487817,-6.236014246314874,-6.226580034141932,-6.21714582196899,-6.207711609796048,-6.198277397623105,-6.188843185450163,-6.179408973277221,-6.169974761104278,-6.160540548931336,-6.151106336758394,-6.141672124585451,-6.132237912412509,-6.122803700239567,-6.113369488066624,-6.103935275893682,-6.09450106372074,-6.085066851547798,-6.075632639374855,-6.066198427201913,-6.056764215028971,-6.047330002856028,-6.037895790683086,-6.028461578510144,-6.019027366337201,-6.009593154164259,-6.000158941991317,-5.990724729818374,-5.981290517645432,-5.97185630547249,-5.962422093299547,-5.952987881126605,-5.943553668953663,-5.934119456780721,-5.924685244607778,-5.915251032434836,-5.905816820261894,-5.896382608088951,-5.886948395916009,-5.877514183743067,-5.868079971570124,-5.858645759397182,-5.84921154722424,-5.839777335051297,-5.830343122878355,-5.820908910705413,-5.811474698532471,-5.802040486359528,-5.792606274186586,-5.7831720620136435,-5.773737849840701,-5.7643036376677586,-5.7548694254948165,-5.745435213321874,-5.7360010011489315,-5.7265667889759895,-5.7171325768030465,-5.7076983646301045,-5.6982641524571624,-5.68882994028422,-5.6793957281112775,-5.669961515938335,-5.660527303765393,-5.65109309159245,-5.641658879419508,-5.632224667246566,-5.622790455073623,-5.613356242900681,-5.603922030727739,-5.594487818554796,-5.585053606381854,-5.575619394208912,-5.566185182035969,-5.556750969863027,-5.547316757690085,-5.537882545517143,-5.5284483333442,-5.519014121171258,-5.509579908998316,-5.500145696825373,-5.490711484652431,-5.481277272479489,-5.471843060306546,-5.462408848133604,-5.452974635960662,-5.443540423787719,-5.434106211614777,-5.424671999441835,-5.415237787268893,-5.40580357509595,-5.396369362923008,-5.386935150750066,-5.377500938577123,-5.368066726404181,-5.358632514231239,-5.349198302058296,-5.339764089885354,-5.330329877712412,-5.320895665539469,-5.311461453366527,-5.302027241193585,-5.292593029020643,-5.2831588168477,-5.273724604674758,-5.264290392501816,-5.254856180328873,-5.245421968155931,-5.235987755982989,-5.226553543810046,-5.217119331637104,-5.207685119464162,-5.198250907291219,-5.188816695118277,-5.179382482945335,-5.169948270772393,-5.16051405859945,-5.151079846426508,-5.141645634253566,-5.132211422080623,-5.122777209907681,-5.113342997734739,-5.103908785561796,-5.094474573388854,-5.085040361215912,-5.075606149042969,-5.066171936870027,-5.056737724697085,-5.047303512524142,-5.0378693003512,-5.028435088178258,-5.0190008760053155,-5.009566663832373,-5.0001324516594305,-4.9906982394864885,-4.981264027313546,-4.9718298151406035,-4.9623956029676615,-4.9529613907947185,-4.9435271786217765,-4.934092966448834,-4.9246587542758915,-4.9152245421029495,-4.905790329930007,-4.896356117757065,-4.886921905584122,-4.87748769341118,-4.868053481238238,-4.858619269065295,-4.849185056892353,-4.839750844719411,-4.830316632546468,-4.820882420373526,-4.811448208200584,-4.802013996027641,-4.792579783854699,-4.783145571681757,-4.773711359508815,-4.764277147335872,-4.75484293516293,-4.745408722989988,-4.735974510817045,-4.726540298644103,-4.717106086471161,-4.707671874298218,-4.698237662125276,-4.688803449952334,-4.679369237779391,-4.669935025606449,-4.660500813433507,-4.651066601260564,-4.641632389087622,-4.63219817691468,-4.622763964741738,-4.613329752568795,-4.603895540395853,-4.594461328222911,-4.585027116049968,-4.575592903877026,-4.566158691704084,-4.556724479531141,-4.547290267358199,-4.537856055185257,-4.528421843012314,-4.518987630839372,-4.50955341866643,-4.500119206493488,-4.490684994320545,-4.481250782147603,-4.471816569974661,-4.462382357801718,-4.452948145628776,-4.443513933455834,-4.434079721282891,-4.424645509109949,-4.415211296937007,-4.405777084764064,-4.396342872591122,-4.38690866041818,-4.377474448245238,-4.368040236072295,-4.358606023899353,-4.349171811726411,-4.339737599553468,-4.330303387380526,-4.320869175207584,-4.311434963034641,-4.302000750861699,-4.292566538688757,-4.283132326515814,-4.273698114342872,-4.26426390216993,-4.254829689996987,-4.245395477824045,-4.2359612656511025,-4.2265270534781605,-4.2170928413052176,-4.2076586291322755,-4.1982244169593335,-4.1887902047863905,-4.1793559926134485,-4.169921780440506,-4.1604875682675635,-4.1510533560946214,-4.141619143921679,-4.1321849317487365,-4.122750719575794,-4.113316507402852,-4.10388229522991,-4.094448083056967,-4.085013870884025,-4.075579658711083,-4.06614544653814,-4.056711234365198,-4.047277022192256,-4.037842810019313,-4.028408597846371,-4.018974385673429,-4.009540173500486,-4.000105961327544,-3.990671749154602,-3.9812375369816597,-3.9718033248087172,-3.962369112635775,-3.9529349004628327,-3.9435006882898906,-3.934066476116948,-3.9246322639440057,-3.9151980517710636,-3.905763839598121,-3.8963296274251786,-3.8868954152522366,-3.877461203079294,-3.868026990906352,-3.8585927787334096,-3.849158566560467,-3.839724354387525,-3.8302901422145825,-3.8208559300416405,-3.811421717868698,-3.8019875056957555,-3.7925532935228135,-3.783119081349871,-3.7736848691769285,-3.7642506570039864,-3.754816444831044,-3.745382232658102,-3.7359480204851594,-3.726513808312217,-3.717079596139275,-3.7076453839663324,-3.69821117179339,-3.688776959620448,-3.6793427474475053,-3.6699085352745633,-3.660474323101621,-3.6510401109286783,-3.6416058987557363,-3.6321716865827938,-3.6227374744098517,-3.6133032622369092,-3.6038690500639667,-3.5944348378910247,-3.585000625718082,-3.5755664135451397,-3.5661322013721977,-3.556697989199255,-3.547263777026313,-3.5378295648533706,-3.528395352680428,-3.518961140507486,-3.5095269283345436,-3.5000927161616016,-3.490658503988659,-3.4812242918157166,-3.4717900796427745,-3.462355867469832,-3.4529216552968895,-3.4434874431239475,-3.434053230951005,-3.424619018778063,-3.4151848066051205,-3.405750594432178,-3.396316382259236,-3.3868821700862934,-3.377447957913351,-3.368013745740409,-3.3585795335674664,-3.3491453213945244,-3.339711109221582,-3.3302768970486394,-3.3208426848756973,-3.311408472702755,-3.301974260529813,-3.2925400483568703,-3.283105836183928,-3.2736716240109858,-3.2642374118380433,-3.254803199665101,-3.2453689874921587,-3.2359347753192163,-3.226500563146274,-3.2170663509733317,-3.207632138800389,-3.198197926627447,-3.1887637144545047,-3.179329502281562,-3.16989529010862,-3.1604610779356777,-3.1510268657627356,-3.141592653589793]}
},{}],76:[function(require,module,exports){
module.exports={"expected":[-8.165619676597685e15,105.99404734315095,52.99230642553726,35.32296265037785,26.48671788085479,21.183712399930094,17.647326227131316,15.12043644950205,13.224481554325735,11.749149540021486,10.568253160490157,9.601491399806724,8.795330209557184,8.112707521241182,7.527150396208486,7.019245315612698,6.574432111624934,6.18157651115347,5.832018498316635,5.518921194023162,5.23681507167247,4.9812723969344885,4.748670456674993,4.536016554242646,4.340816755929018,4.1609761382731625,3.9947220552138707,3.8405444569811515,3.6971489977918615,3.563419845396809,3.4383899287139617,3.321216943979773,3.211163859742801,3.1075829663996988,3.0099027405147076,2.917616960966013,2.830275639063574,2.747477419454623,2.668863180882231,2.5941106214385745,2.5229296560262955,2.455058487358258,2.3902602382391493,2.3283200537574995,2.269042598629498,2.2122498882265176,2.1577794025083454,2.1054824407271027,2.0552226817894597,2.006874920897268,1.9603239577875753,1.915463615764224,1.8721958739143505,1.830430097560797,1.7900823542160778,1.7510748041557789,1.7133351562839247,1.676796181271892,1.6413952750584706,1.6070740667359698,1.5737780656438645,1.5414563431707287,1.5100612453456501,1.4795481327980067,1.4498751450921123,1.421002986811636,1.3928947330869208,1.3655156525337764,1.3388330458112627,1.3128160982138752,1.2874357448945593,1.2626645474731808,1.2384765809234395,1.2148473297525,1.19175359259421,1.1691733944305371,1.1470859057384941,1.125471367932885,1.104311024539724,1.0835870575924438,1.0632825287937884,1.0433813250314063,1.0238681078753855,1.0047282667217647,0.9859478752780675,0.9675136511155147,0.9494129180381561,0.9316335710421456,0.9141640436589935,0.8969932774951375,0.8801106937968839,0.8635061668847555,0.8471699993148699,0.8310928986372035,0.8152659556316679,0.7996806239129317,0.7843287008040436,0.7692023093871145,0.7542938816467963,0.7395961426291392,0.7251020955445576,0.7108050077492736,0.6966983975447861,0.6827760217395635,0.6690318639214464,0.6554601233932003,0.6420552047271935,0.6288117078984984,0.615724418958684,0.6027883012153736,0.5899984868851382,0.5773502691896264,0.5648390948670048,0.5524605570727178,0.5402103886453928,0.5280844557154174,0.5160787516352272,0.5041893912117649,0.49241260522291513,0.4807447352008968,0.46918222846674507,0.45772163340102623,0.44635959493692334,0.43509285026269673,0.4239182247213426,0.412832627896072,0.4018330498709104,0.3909165576563801,0.3800802917708659,0.369321462968806,0.3586373491073805,0.3480252921438858,0.33748269525641733,0.3270070200809059,0.31659578405797795,0.3062465578834468,0.295956963056609,0.28572466952081754,0.2755473933911333,0.2654228947641084,0.2553489756050143,0.2453234777080954,0.23534428072562794,0.22540930026177472,0.21551648602744644,0.2056638200525383,0.19584931495207897,0.18607101224301487,0.17632698070846495,0.16661531480644493,0.1569341331201607,0.1472815768471197,0.13765580832439261,0.12805500958745797,0.11847738096018005,0.10892113967353072,0.09938451851074447,0.0898657644766919,0.08036313748929749,0.07087490909088674,0.06139936117742599,0.05193478474363412,0.04247947864201255,0.03303174835385142,0.02358990477033255,0.014152262981851196,0.004717141073700144,-0.0047171410736997765,-0.014152262981850829,-0.023589904770332182,-0.03303174835385105,-0.04247947864201218,-0.05193478474363375,-0.061399361177425615,-0.07087490909088638,-0.08036313748929712,-0.08986576447669153,-0.0993845185107441,-0.10892113967353036,-0.11847738096017968,-0.1280550095874576,-0.13765580832439225,-0.14728157684711932,-0.1569341331201603,-0.16661531480644456,-0.17632698070846456,-0.1860710122430145,-0.19584931495207858,-0.2056638200525379,-0.21551648602744608,-0.2254093002617743,-0.23534428072562755,-0.245323477708095,-0.2553489756050139,-0.265422894764108,-0.27554739339113293,-0.2857246695208171,-0.2959569630566086,-0.3062465578834464,-0.31659578405797756,-0.3270070200809055,-0.33748269525641694,-0.34802529214388533,-0.35863734910738004,-0.36932146296880564,-0.38008029177086544,-0.3909165576563797,-0.40183304987090995,-0.41283262789607156,-0.4239182247213422,-0.43509285026269634,-0.4463595949369229,-0.4577216334010258,-0.4691822284667447,-0.4807447352008963,-0.4924126052229147,-0.5041893912117644,-0.5160787516352268,-0.5280844557154168,-0.5402103886453924,-0.5524605570727174,-0.5648390948670042,-0.5773502691896258,-0.5899984868851377,-0.6027883012153732,-0.6157244189586835,-0.6288117078984978,-0.6420552047271929,-0.6554601233931997,-0.6690318639214459,-0.682776021739563,-0.6966983975447857,-0.710805007749273,-0.725102095544557,-0.7395961426291386,-0.7542938816467958,-0.769202309387114,-0.784328700804043,-0.7996806239129309,-0.8152659556316674,-0.831092898637203,-0.8471699993148692,-0.8635061668847548,-0.8801106937968833,-0.8969932774951361,-0.9141640436589927,-0.9316335710421448,-0.9494129180381545,-0.9675136511155147,-0.9859478752780666,-1.0047282667217632,-1.0238681078753857,-1.0433813250314055,-1.0632825287937866,-1.083587057592444,-1.1043110245397232,-1.125471367932884,-1.1470859057384921,-1.1691733944305363,-1.1917535925942093,-1.214847329752498,-1.2384765809234397,-1.26266454747318,-1.287435744894557,-1.3128160982138752,-1.3388330458112616,-1.3655156525337742,-1.392894733086921,-1.421002986811635,-1.449875145092111,-1.479548132798007,-1.5100612453456492,-1.5414563431707275,-1.5737780656438618,-1.6070740667359684,-1.6413952750584693,-1.6767961812718888,-1.7133351562839252,-1.7510748041557773,-1.7900823542160746,-1.8304300975607974,-1.872195873914349,-1.9154636157642222,-1.9603239577875757,-2.0068749208972663,-2.055222681789458,-2.1054824407270982,-2.157779402508343,-2.2122498882265154,-2.2690425986294933,-2.3283200537575,-2.3902602382391467,-2.455058487358252,-2.522929656026296,-2.5941106214385714,-2.6688631808822283,-2.747477419454624,-2.830275639063571,-2.9176169609660096,-3.0099027405146996,-3.1075829663996943,-3.211163859742797,-3.3212169439797634,-3.438389928713962,-3.5634198453968042,-3.69714899779185,-3.8405444569811524,-3.9947220552138645,-4.160976138273147,-4.34081675592902,-4.536016554242638,-4.748670456674984,-4.98127239693449,-5.236815071672459,-5.51892119402315,-5.832018498316606,-6.181576511153473,-6.574432111624919,-7.0192453156126575,-7.527150396208491,-8.112707521241157,-8.79533020955712,-9.601491399806731,-10.568253160490116,-11.749149540021437,-13.224481554325749,-15.120436449501966,-17.647326227131202,-21.183712399929732,-26.486717880854535,-35.32296265037739,-52.99230642553498,-105.9940473431518,-4.0828098382988425e15,105.9940473431573,52.99230642553635,35.32296265037801,26.48671788085488,21.183712399929952,17.647326227131355,15.120436449502078,13.224481554325838,11.749149540021504,10.56825316049017,9.601491399806775,8.795330209557159,8.11270752124119,7.527150396208517,7.0192453156126815,6.57443211162494,6.181576511153493,5.832018498316623,5.518921194023166,5.236815071672472,4.981272396934503,4.748670456674995,4.536016554242649,4.34081675592903,4.160976138273156,3.9947220552138734,3.8405444569811604,3.697148997791857,3.5634198453968113,3.4383899287139688,3.3212169439797696,3.2111638597428027,3.1075829663996997,3.0099027405147045,2.917616960966014,2.8302756390635753,2.747477419454628,2.6688631808822323,2.594110621438575,2.5229296560262995,2.4550584873582557,2.39026023823915,2.328320053757503,2.2690425986294964,2.212249888226518,2.157779402508346,2.105482440727101,2.0552226817894605,2.006874920897269,1.9603239577875784,1.9154636157642244,1.8721958739143514,1.8304300975607992,1.7900823542160769,1.7510748041557793,1.7133351562839272,1.6767961812718906,1.641395275058471,1.6070740667359702,1.5737780656438634,1.5414563431707293,1.5100612453456506,1.4795481327980085,1.4498751450921126,1.4210029868116365,1.3928947330869226,1.3655156525337753,1.3388330458112632,1.3128160982138766,1.2874357448945584,1.2626645474731812,1.2384765809234408,1.214847329752499,1.1917535925942104,1.1691733944305374,1.1470859057384932,1.1254713679328852,1.1043110245397243,1.083587057592445,1.063282528793788,1.0433813250314066,1.0238681078753866,1.0047282667217643,0.9859478752780677,0.9675136511155157,0.9494129180381555,0.9316335710421458,0.9141640436589937,0.896993277495137,0.8801106937968842,0.8635061668847557,0.8471699993148702,0.8310928986372038,0.815265955631668,0.7996806239129318,0.7843287008040437,0.7692023093871148,0.7542938816467966,0.7395961426291394,0.7251020955445577,0.7108050077492737,0.6966983975447862,0.6827760217395638,0.6690318639214466,0.6554601233932004,0.6420552047271936,0.6288117078984985,0.6157244189586841,0.6027883012153739,0.5899984868851385,0.5773502691896265,0.5648390948670049,0.552460557072718,0.5402103886453931,0.5280844557154175,0.5160787516352273,0.5041893912117651,0.49241260522291525,0.4807447352008969,0.4691822284667453,0.45772163340102634,0.4463595949369235,0.4350928502626969,0.4239182247213428,0.41283262789607217,0.4018330498709105,0.3909165576563802,0.380080291770866,0.36932146296880614,0.35863734910738065,0.3480252921438859,0.3374826952564175,0.327007020080906,0.31659578405797806,0.30624655788344696,0.2959569630566091,0.28572466952081765,0.27554739339113343,0.2654228947641086,0.25534897560501446,0.24532347770809548,0.23534428072562805,0.2254093002617748,0.21551648602744655,0.20566382005253842,0.1958493149520791,0.18607101224301503,0.1763269807084651,0.16661531480644504,0.1569341331201608,0.14728157684711982,0.13765580832439273,0.1280550095874581,0.11847738096018018,0.10892113967353084,0.09938451851074459,0.08986576447669203,0.08036313748929762,0.07087490909088687,0.061399361177426115,0.05193478474363424,0.04247947864201267,0.033031748353851545,0.023589904770332674,0.014152262981851318,0.004717141073700266,-0.004717141073699654,-0.014152262981850707,-0.02358990477033206,-0.033031748353850934,-0.042479478642012056,-0.051934784743633625,-0.0613993611774255,-0.07087490909088626,-0.08036313748929699,-0.08986576447669141,-0.09938451851074398,-0.10892113967353023,-0.11847738096017955,-0.12805500958745747,-0.13765580832439211,-0.1472815768471192,-0.15693413312016016,-0.1666153148064435,-0.17632698070846445,-0.18607101224301437,-0.19584931495207752,-0.20566382005253778,-0.21551648602744686,-0.22540930026177328,-0.2353442807256274,-0.24532347770809582,-0.25534897560501285,-0.2654228947641079,-0.2755473933911337,-0.28572466952081604,-0.29595696305660846,-0.30624655788344723,-0.31659578405797645,-0.3270070200809053,-0.33748269525641783,-0.3480252921438852,-0.3586373491073799,-0.36932146296880647,-0.3800802917708653,-0.39091655765637956,-0.4018330498709109,-0.4128326278960714,-0.42391822472134205,-0.43509285026269506,-0.44635959493692273,-0.45772163340102556,-0.46918222846674346,-0.48074473520089617,-0.49241260522291447,-0.5041893912117631,-0.5160787516352265,-0.5280844557154178,-0.5402103886453911,-0.5524605570727172,-0.5648390948670052,-0.5773502691896245,-0.5899984868851376,-0.6027883012153742,-0.615724418958682,-0.6288117078984976,-0.642055204727194,-0.6554601233931983,-0.6690318639214458,-0.6827760217395641,-0.6966983975447855,-0.7108050077492728,-0.7251020955445582,-0.7395961426291384,-0.7542938816467957,-0.7692023093871123,-0.7843287008040427,-0.7996806239129308,-0.8152659556316657,-0.8310928986372028,-0.8471699993148691,-0.863506166884753,-0.880110693796883,-0.8969932774951375,-0.9141640436589908,-0.9316335710421446,-0.9494129180381561,-0.9675136511155128,-0.9859478752780664,-1.0047282667217647,-1.0238681078753835,-1.0433813250314052,-1.0632825287937884,-1.0835870575924418,-1.104311024539723,-1.1254713679328856,-1.1470859057384917,-1.169173394430536,-1.191753592594211,-1.2148473297524978,-1.2384765809234393,-1.262664547473182,-1.287435744894557,-1.312816098213875,-1.338833045811259,-1.3655156525337737,-1.3928947330869206,-1.4210029868116318,-1.4498751450921106,-1.4795481327980065,-1.510061245345646,-1.541456343170727,-1.5737780656438645,-1.6070740667359646,-1.6413952750584688,-1.6767961812718917,-1.7133351562839212,-1.7510748041557769,-1.7900823542160778,-1.830430097560793,-1.8721958739143487,-1.9154636157642255,-1.960323957787571,-2.006874920897266,-2.055222681789462,-2.1054824407270973,-2.1577794025083428,-2.21224988822652,-2.2690425986294924,-2.328320053757499,-2.390260238239152,-2.4550584873582513,-2.522929656026295,-2.5941106214385634,-2.668863180882227,-2.7474774194546225,-2.8302756390635615,-2.9176169609660088,-3.009902740514707,-3.1075829663996837,-3.2111638597427956,-3.3212169439797727,-3.438389928713949,-3.563419845396803,-3.6971489977918606,-3.840544456981137,-3.9947220552138627,-4.160976138273162,-4.340816755929,-4.536016554242635,-4.748670456675002,-4.9812723969344646,-5.236815071672455,-5.518921194023175,-5.832018498316601,-6.1815765111534695,-6.574432111624953,-7.01924531561265,-7.527150396208483,-8.11270752124109,-8.795330209557111,-9.60149139980672,-10.568253160490002,-11.749149540021419,-13.224481554325727,-15.120436449501735,-17.647326227131163,-21.183712399930073,-26.486717880853824,-35.32296265037724,-52.99230642553712,-105.99404734314044,-2.7218732255325615e15,105.99404734314871,52.992306425539184,35.32296265037816,26.48671788085434,21.183712399930407,17.647326227131394,15.120436449501902,13.224481554325855,11.74914954002152,10.568253160490084,9.601491399806788,8.795330209557168,8.112707521241138,7.527150396208525,7.019245315612687,6.574432111624985,6.181576511153498,5.832018498316628,5.518921194023197,5.236815071672476,4.981272396934483,4.748670456675019,4.536016554242651,4.340816755929015,4.160976138273175,3.994722055213875,3.840544456981148,3.697148997791872,3.5634198453968127,3.438389928713959,3.321216943979782,3.2111638597428036,3.1075829663996917,3.0099027405147147,2.917616960966016,2.830275639063568,2.7474774194546288,2.6688631808822327,2.594110621438569,2.5229296560263004,2.4550584873582566,2.390260238239157,2.328320053757504,2.2690425986294973,2.2122498882265242,2.1577794025083468,2.1054824407271013,2.055222681789466,2.0068749208972694,1.9603239577875746,1.9154636157642293,1.8721958739143518,1.8304300975607963,1.790082354216081,1.7510748041557795,1.713335156283924,1.6767961812718943,1.6413952750584715,1.6070740667359675,1.573778065643867,1.5414563431707295,1.5100612453456481,1.479548132798009,1.449875145092113,1.421002986811634,1.3928947330869228,1.3655156525337757,1.338833045811261,1.312816098213877,1.2874357448945588,1.262664547473184,1.2384765809234413,1.2148473297524995,1.1917535925942127,1.1691733944305378,1.1470859057384934,1.1254713679328874,1.1043110245397245,1.0835870575924433,1.06328252879379,1.0433813250314068,1.023868107875385,1.0047282667217663,0.9859478752780679,0.9675136511155142,0.9494129180381575,0.931633571042146,0.9141640436589922,0.8969932774951388,0.8801106937968843,0.8635061668847543,0.8471699993148704,0.831092898637204,0.8152659556316669,0.7996806239129322,0.7843287008040439,0.7692023093871135,0.7542938816467968,0.7395961426291396,0.7251020955445593,0.7108050077492739,0.6966983975447865,0.6827760217395652,0.6690318639214468,0.6554601233931994,0.642055204727195,0.6288117078984986,0.6157244189586831,0.6027883012153752,0.5899984868851386,0.5773502691896255,0.5648390948670062,0.5524605570727181,0.5402103886453921,0.5280844557154188,0.5160787516352275,0.5041893912117641,0.49241260522291547,0.48074473520089706,0.4691822284667443,0.4577216334010265,0.4463595949369236,0.435092850262696,0.42391822472134294,0.41283262789607234,0.4018330498709117,0.3909165576563804,0.3800802917708661,0.3693214629688073,0.35863734910738077,0.34802529214388606,0.3374826952564186,0.32700702008090615,0.3165957840579772,0.306246557883448,0.2959569630566093,0.2857246695208168,0.27554739339113454,0.2654228947641087,0.25534897560501363,0.24532347770809657,0.23534428072562819,0.22540930026177403,0.21551648602744763,0.20566382005253853,0.19584931495207827,0.18607101224301514,0.1763269807084652,0.16661531480644426,0.15693413312016094,0.14728157684711995,0.13765580832439198,0.12805500958745822,0.1184773809601803,0.10892113967353187,0.09938451851074472,0.08986576447669214,0.08036313748929863,0.07087490909088699,0.06139936117742535,0.051934784743635255,0.04247947864201279,0.033031748353850775,0.023589904770333684,0.014152262981851441,0.0047171410736995,-0.004717141073698643,-0.014152262981850584,-0.023589904770332827,-0.03303174835384992,-0.04247947864201193,-0.051934784743634395,-0.06139936117742449,-0.07087490909088613,-0.08036313748929777,-0.08986576447669128,-0.09938451851074386,-0.10892113967353101,-0.11847738096017943,-0.12805500958745736,-0.1376558083243911,-0.14728157684711907,-0.15693413312016005,-0.16661531480644337,-0.1763269807084643,-0.18607101224301426,-0.19584931495207739,-0.20566382005253767,-0.21551648602744672,-0.22540930026177314,-0.23534428072562727,-0.24532347770809565,-0.25534897560501274,-0.2654228947641078,-0.2755473933911336,-0.2857246695208159,-0.29595696305660835,-0.3062465578834471,-0.3165957840579763,-0.3270070200809052,-0.33748269525641766,-0.3480252921438851,-0.35863734910737977,-0.36932146296880636,-0.38008029177086516,-0.39091655765637945,-0.40183304987091073,-0.4128326278960713,-0.4239182247213419,-0.435092850262695,-0.4463595949369226,-0.4577216334010255,-0.46918222846674323,-0.48074473520089595,-0.49241260522291436,-0.504189391211763,-0.5160787516352264,-0.5280844557154177,-0.540210388645391,-0.552460557072717,-0.5648390948670051,-0.5773502691896244,-0.5899984868851375,-0.6027883012153741,-0.6157244189586819,-0.6288117078984975,-0.6420552047271938,-0.6554601233931981,-0.6690318639214455,-0.682776021739564,-0.6966983975447852,-0.7108050077492727,-0.725102095544558,-0.7395961426291382,-0.7542938816467953,-0.7692023093871122,-0.7843287008040426,-0.7996806239129307,-0.8152659556316655,-0.8310928986372026,-0.8471699993148689,-0.8635061668847528,-0.8801106937968828,-0.8969932774951374,-0.9141640436589907,-0.9316335710421444,-0.9494129180381559,-0.9675136511155126,-0.9859478752780663,-1.0047282667217645,-1.0238681078753833,-1.043381325031405,-1.0632825287937882,-1.0835870575924413,-1.1043110245397227,-1.1254713679328854,-1.1470859057384917,-1.1691733944305356,-1.1917535925942107,-1.2148473297524973,-1.238476580923439,-1.2626645474731817,-1.2874357448945566,-1.3128160982138748,-1.3388330458112585,-1.3655156525337733,-1.3928947330869206,-1.4210029868116316,-1.4498751450921104,-1.479548132798006,-1.5100612453456452,-1.5414563431707269,-1.573778065643864,-1.6070740667359644,-1.6413952750584684,-1.6767961812718912,-1.7133351562839205,-1.7510748041557762,-1.790082354216077,-1.8304300975607926,-1.8721958739143478,-1.915463615764225,-1.9603239577875702,-2.006874920897265,-2.0552226817894614,-2.105482440727097,-2.157779402508342,-2.2122498882265194,-2.2690425986294915,-2.3283200537574986,-2.390260238239151,-2.4550584873582504,-2.522929656026294,-2.594110621438563,-2.668863180882226,-2.7474774194546216,-2.8302756390635606,-2.917616960966007,-3.009902740514706,-3.107582966399683,-3.211163859742794,-3.3212169439797714,-3.438389928713948,-3.5634198453968007,-3.6971489977918592,-3.8405444569811342,-3.994722055213861,-4.160976138273159,-4.340816755928997,-4.536016554242633,-4.748670456675,-4.981272396934462,-5.236815071672452,-5.518921194023171,-5.8320184983165975,-6.181576511153464,-6.5744321116249465,-7.019245315612645,-7.5271503962084765,-8.11270752124108,-8.7953302095571,-9.601491399806708,-10.568253160489988,-11.749149540021401,-13.224481554325706,-15.120436449501707,-17.647326227131128,-21.18371239993002,-26.486717880853735,-35.322962650377086,-52.99230642553678,-105.99404734313907,-2.0414049191494212e15],"x":[3.141592653589793,3.1510268657627356,3.1604610779356777,3.16989529010862,3.179329502281562,3.1887637144545047,3.198197926627447,3.207632138800389,3.2170663509733317,3.226500563146274,3.2359347753192163,3.2453689874921587,3.254803199665101,3.2642374118380433,3.2736716240109858,3.283105836183928,3.2925400483568703,3.301974260529813,3.311408472702755,3.3208426848756973,3.3302768970486394,3.339711109221582,3.3491453213945244,3.3585795335674664,3.368013745740409,3.377447957913351,3.3868821700862934,3.396316382259236,3.405750594432178,3.4151848066051205,3.424619018778063,3.434053230951005,3.4434874431239475,3.4529216552968895,3.462355867469832,3.4717900796427745,3.4812242918157166,3.490658503988659,3.5000927161616016,3.5095269283345436,3.518961140507486,3.528395352680428,3.5378295648533706,3.547263777026313,3.556697989199255,3.5661322013721977,3.5755664135451397,3.585000625718082,3.5944348378910247,3.6038690500639667,3.6133032622369092,3.6227374744098517,3.6321716865827938,3.6416058987557363,3.6510401109286783,3.660474323101621,3.6699085352745633,3.6793427474475053,3.688776959620448,3.69821117179339,3.7076453839663324,3.717079596139275,3.726513808312217,3.7359480204851594,3.745382232658102,3.754816444831044,3.7642506570039864,3.7736848691769285,3.783119081349871,3.7925532935228135,3.8019875056957555,3.811421717868698,3.8208559300416405,3.8302901422145825,3.839724354387525,3.849158566560467,3.8585927787334096,3.868026990906352,3.877461203079294,3.8868954152522366,3.8963296274251786,3.905763839598121,3.9151980517710636,3.9246322639440057,3.934066476116948,3.9435006882898906,3.9529349004628327,3.962369112635775,3.9718033248087172,3.9812375369816597,3.990671749154602,4.000105961327544,4.009540173500486,4.018974385673429,4.028408597846371,4.037842810019313,4.047277022192256,4.056711234365198,4.06614544653814,4.075579658711083,4.085013870884025,4.094448083056967,4.10388229522991,4.113316507402852,4.122750719575794,4.1321849317487365,4.141619143921679,4.1510533560946214,4.1604875682675635,4.169921780440506,4.1793559926134485,4.1887902047863905,4.1982244169593335,4.2076586291322755,4.2170928413052176,4.2265270534781605,4.2359612656511025,4.245395477824045,4.254829689996987,4.26426390216993,4.273698114342872,4.283132326515814,4.292566538688757,4.302000750861699,4.311434963034641,4.320869175207584,4.330303387380526,4.339737599553468,4.349171811726411,4.358606023899353,4.368040236072295,4.377474448245238,4.38690866041818,4.396342872591122,4.405777084764064,4.415211296937007,4.424645509109949,4.434079721282891,4.443513933455834,4.452948145628776,4.462382357801718,4.471816569974661,4.481250782147603,4.490684994320545,4.500119206493488,4.50955341866643,4.518987630839372,4.528421843012314,4.537856055185257,4.547290267358199,4.556724479531141,4.566158691704084,4.575592903877026,4.585027116049968,4.594461328222911,4.603895540395853,4.613329752568795,4.622763964741738,4.63219817691468,4.641632389087622,4.651066601260564,4.660500813433507,4.669935025606449,4.679369237779391,4.688803449952334,4.698237662125276,4.707671874298218,4.717106086471161,4.726540298644103,4.735974510817045,4.745408722989988,4.75484293516293,4.764277147335872,4.773711359508815,4.783145571681757,4.792579783854699,4.802013996027641,4.811448208200584,4.820882420373526,4.830316632546468,4.839750844719411,4.849185056892353,4.858619269065295,4.868053481238238,4.87748769341118,4.886921905584122,4.896356117757065,4.905790329930007,4.9152245421029495,4.9246587542758915,4.934092966448834,4.9435271786217765,4.9529613907947185,4.9623956029676615,4.9718298151406035,4.981264027313546,4.9906982394864885,5.0001324516594305,5.009566663832373,5.0190008760053155,5.028435088178258,5.0378693003512,5.047303512524142,5.056737724697085,5.066171936870027,5.075606149042969,5.085040361215912,5.094474573388854,5.103908785561796,5.113342997734739,5.122777209907681,5.132211422080623,5.141645634253566,5.151079846426508,5.16051405859945,5.169948270772393,5.179382482945335,5.188816695118277,5.198250907291219,5.207685119464162,5.217119331637104,5.226553543810046,5.235987755982989,5.245421968155931,5.254856180328873,5.264290392501816,5.273724604674758,5.2831588168477,5.292593029020643,5.302027241193585,5.311461453366527,5.320895665539469,5.330329877712412,5.339764089885354,5.349198302058296,5.358632514231239,5.368066726404181,5.377500938577123,5.386935150750066,5.396369362923008,5.40580357509595,5.415237787268893,5.424671999441835,5.434106211614777,5.443540423787719,5.452974635960662,5.462408848133604,5.471843060306546,5.481277272479489,5.490711484652431,5.500145696825373,5.509579908998316,5.519014121171258,5.5284483333442,5.537882545517143,5.547316757690085,5.556750969863027,5.566185182035969,5.575619394208912,5.585053606381854,5.594487818554796,5.603922030727739,5.613356242900681,5.622790455073623,5.632224667246566,5.641658879419508,5.65109309159245,5.660527303765393,5.669961515938335,5.6793957281112775,5.68882994028422,5.6982641524571624,5.7076983646301045,5.7171325768030465,5.7265667889759895,5.7360010011489315,5.745435213321874,5.7548694254948165,5.7643036376677586,5.773737849840701,5.7831720620136435,5.792606274186586,5.802040486359528,5.811474698532471,5.820908910705413,5.830343122878355,5.839777335051297,5.84921154722424,5.858645759397182,5.868079971570124,5.877514183743067,5.886948395916009,5.896382608088951,5.905816820261894,5.915251032434836,5.924685244607778,5.934119456780721,5.943553668953663,5.952987881126605,5.962422093299547,5.97185630547249,5.981290517645432,5.990724729818374,6.000158941991317,6.009593154164259,6.019027366337201,6.028461578510144,6.037895790683086,6.047330002856028,6.056764215028971,6.066198427201913,6.075632639374855,6.085066851547798,6.09450106372074,6.103935275893682,6.113369488066624,6.122803700239567,6.132237912412509,6.141672124585451,6.151106336758394,6.160540548931336,6.169974761104278,6.179408973277221,6.188843185450163,6.198277397623105,6.207711609796048,6.21714582196899,6.226580034141932,6.236014246314874,6.245448458487817,6.254882670660759,6.264316882833701,6.273751095006644,6.283185307179586,6.292619519352528,6.302053731525471,6.311487943698413,6.320922155871355,6.330356368044298,6.33979058021724,6.349224792390182,6.358659004563124,6.368093216736067,6.377527428909009,6.386961641081951,6.396395853254894,6.405830065427836,6.415264277600778,6.424698489773721,6.434132701946663,6.4435669141196055,6.453001126292548,6.4624353384654905,6.4718695506384325,6.4813037628113745,6.4907379749843175,6.5001721871572595,6.509606399330202,6.5190406115031445,6.528474823676087,6.537909035849029,6.5473432480219715,6.556777460194914,6.566211672367856,6.575645884540799,6.585080096713741,6.594514308886683,6.603948521059626,6.613382733232568,6.62281694540551,6.632251157578452,6.641685369751395,6.651119581924337,6.660553794097279,6.669988006270222,6.679422218443164,6.688856430616106,6.698290642789049,6.707724854961991,6.717159067134933,6.726593279307876,6.736027491480818,6.74546170365376,6.754895915826702,6.764330127999645,6.773764340172587,6.783198552345529,6.792632764518472,6.802066976691414,6.811501188864356,6.820935401037299,6.830369613210241,6.839803825383183,6.849238037556126,6.858672249729068,6.86810646190201,6.877540674074952,6.886974886247895,6.896409098420837,6.905843310593779,6.915277522766722,6.924711734939664,6.934145947112606,6.943580159285549,6.953014371458491,6.962448583631433,6.971882795804376,6.981317007977318,6.99075122015026,7.000185432323203,7.009619644496145,7.019053856669087,7.028488068842029,7.037922281014972,7.047356493187914,7.056790705360856,7.066224917533799,7.075659129706741,7.085093341879683,7.094527554052626,7.103961766225568,7.11339597839851,7.122830190571453,7.132264402744395,7.141698614917337,7.151132827090279,7.160567039263222,7.170001251436164,7.1794354636091064,7.188869675782049,7.198303887954991,7.2077381001279335,7.217172312300876,7.2266065244738185,7.2360407366467605,7.245474948819703,7.2549091609926455,7.2643433731655875,7.27377758533853,7.2832117975114725,7.292646009684415,7.302080221857357,7.3115144340302995,7.320948646203242,7.330382858376184,7.339817070549127,7.349251282722069,7.358685494895011,7.368119707067954,7.377553919240896,7.386988131413838,7.39642234358678,7.405856555759723,7.415290767932665,7.424724980105607,7.43415919227855,7.443593404451492,7.453027616624434,7.462461828797377,7.471896040970319,7.481330253143261,7.490764465316204,7.500198677489146,7.509632889662088,7.519067101835031,7.528501314007973,7.537935526180915,7.547369738353857,7.5568039505268,7.566238162699742,7.575672374872684,7.585106587045627,7.594540799218569,7.603975011391511,7.613409223564454,7.622843435737396,7.632277647910338,7.641711860083281,7.651146072256223,7.660580284429165,7.670014496602107,7.67944870877505,7.688882920947992,7.698317133120934,7.707751345293877,7.717185557466819,7.726619769639761,7.736053981812704,7.745488193985646,7.754922406158588,7.764356618331531,7.773790830504473,7.783225042677415,7.792659254850357,7.8020934670233,7.811527679196242,7.820961891369184,7.830396103542127,7.839830315715069,7.849264527888011,7.858698740060954,7.868132952233896,7.877567164406838,7.887001376579781,7.896435588752723,7.905869800925665,7.915304013098608,7.92473822527155,7.934172437444492,7.9436066496174345,7.953040861790377,7.962475073963319,7.9719092861362615,7.981343498309204,7.9907777104821465,8.000211922655089,8.009646134828031,8.019080347000973,8.028514559173916,8.037948771346858,8.0473829835198,8.056817195692743,8.066251407865686,8.075685620038627,8.08511983221157,8.094554044384513,8.103988256557454,8.113422468730397,8.12285668090334,8.13229089307628,8.141725105249224,8.151159317422167,8.160593529595108,8.17002774176805,8.179461953940994,8.188896166113935,8.198330378286878,8.20776459045982,8.217198802632762,8.226633014805705,8.236067226978648,8.245501439151589,8.254935651324532,8.264369863497473,8.273804075670416,8.283238287843359,8.2926725000163,8.302106712189243,8.311540924362186,8.320975136535127,8.33040934870807,8.339843560881013,8.349277773053954,8.358711985226897,8.36814619739984,8.377580409572781,8.387014621745724,8.396448833918667,8.405883046091608,8.415317258264551,8.424751470437494,8.434185682610435,8.443619894783378,8.453054106956321,8.462488319129262,8.471922531302205,8.481356743475148,8.49079095564809,8.500225167821032,8.509659379993973,8.519093592166916,8.52852780433986,8.5379620165128,8.547396228685743,8.556830440858686,8.566264653031627,8.57569886520457,8.585133077377513,8.594567289550454,8.604001501723397,8.61343571389634,8.622869926069281,8.632304138242224,8.641738350415167,8.651172562588108,8.660606774761051,8.670040986933994,8.679475199106935,8.688909411279878,8.698343623452821,8.707777835625762,8.717212047798705,8.726646259971648,8.73608047214459,8.745514684317532,8.754948896490475,8.764383108663417,8.77381732083636,8.7832515330093,8.792685745182244,8.802119957355186,8.811554169528128,8.82098838170107,8.830422593874014,8.839856806046955,8.849291018219898,8.85872523039284,8.868159442565782,8.877593654738725,8.887027866911668,8.896462079084609,8.905896291257552,8.915330503430495,8.924764715603436,8.934198927776379,8.943633139949322,8.953067352122263,8.962501564295206,8.971935776468149,8.98136998864109,8.990804200814033,9.000238412986976,9.009672625159917,9.01910683733286,9.028541049505803,9.037975261678744,9.047409473851687,9.056843686024628,9.066277898197571,9.075712110370514,9.085146322543455,9.094580534716398,9.10401474688934,9.113448959062282,9.122883171235225,9.132317383408168,9.141751595581109,9.151185807754052,9.160620019926995,9.170054232099936,9.179488444272879,9.188922656445822,9.198356868618763,9.207791080791706,9.217225292964649,9.22665950513759,9.236093717310533,9.245527929483476,9.254962141656417,9.26439635382936,9.273830566002303,9.283264778175244,9.292698990348187,9.302133202521128,9.311567414694071,9.321001626867014,9.330435839039955,9.339870051212898,9.349304263385841,9.358738475558782,9.368172687731725,9.377606899904668,9.38704111207761,9.396475324250552,9.405909536423495,9.415343748596436,9.42477796076938,9.434212172942322,9.443646385115263,9.453080597288206,9.46251480946115,9.47194902163409,9.481383233807033,9.490817445979976,9.500251658152917,9.50968587032586,9.519120082498803,9.528554294671745,9.537988506844687,9.54742271901763,9.556856931190572,9.566291143363514,9.575725355536456,9.585159567709399,9.594593779882342,9.604027992055283,9.613462204228226,9.622896416401169,9.63233062857411,9.641764840747053,9.651199052919996,9.660633265092937,9.67006747726588,9.679501689438823,9.688935901611764,9.698370113784707,9.70780432595765,9.71723853813059,9.726672750303534,9.736106962476477,9.745541174649418,9.75497538682236,9.764409598995304,9.773843811168245,9.783278023341188,9.79271223551413,9.802146447687072,9.811580659860015,9.821014872032956,9.830449084205899,9.839883296378842,9.849317508551783,9.858751720724726,9.868185932897669,9.87762014507061,9.887054357243553,9.896488569416496,9.905922781589437,9.91535699376238,9.924791205935323,9.934225418108264,9.943659630281207,9.95309384245415,9.962528054627091,9.971962266800034,9.981396478972977,9.990830691145918,10.000264903318861,10.009699115491804,10.019133327664745,10.028567539837688,10.038001752010631,10.047435964183572,10.056870176356515,10.066304388529458,10.0757386007024,10.085172812875342,10.094607025048283,10.104041237221226,10.11347544939417,10.12290966156711,10.132343873740053,10.141778085912996,10.151212298085937,10.16064651025888,10.170080722431823,10.179514934604764,10.188949146777707,10.19838335895065,10.207817571123591,10.217251783296534,10.226685995469477,10.236120207642418,10.245554419815361,10.254988631988304,10.264422844161246,10.273857056334188,10.283291268507131,10.292725480680073,10.302159692853015,10.311593905025958,10.3210281171989,10.330462329371843,10.339896541544785,10.349330753717727,10.35876496589067,10.36819917806361,10.377633390236554,10.387067602409497,10.396501814582438,10.40593602675538,10.415370238928324,10.424804451101265,10.434238663274208,10.44367287544715,10.453107087620092,10.462541299793035,10.471975511965978,10.481409724138919,10.490843936311862,10.500278148484805,10.509712360657746,10.519146572830689,10.528580785003632,10.538014997176573,10.547449209349516,10.556883421522459,10.5663176336954,10.575751845868343,10.585186058041286,10.594620270214227,10.60405448238717,10.613488694560111,10.622922906733054,10.632357118905997,10.641791331078938,10.651225543251881,10.660659755424824,10.670093967597765,10.679528179770708,10.688962391943651,10.698396604116592,10.707830816289535,10.717265028462478,10.72669924063542,10.736133452808362,10.745567664981305,10.755001877154246,10.764436089327189,10.773870301500132,10.783304513673073,10.792738725846016,10.802172938018959,10.8116071501919,10.821041362364843,10.830475574537786,10.839909786710727,10.84934399888367,10.858778211056613,10.868212423229554,10.877646635402497,10.887080847575438,10.896515059748381,10.905949271921324,10.915383484094265,10.924817696267208,10.934251908440151,10.943686120613092,10.953120332786035,10.962554544958978,10.97198875713192,10.981422969304862,10.990857181477805,11.000291393650746,11.00972560582369,11.019159817996632,11.028594030169574,11.038028242342516,11.04746245451546,11.0568966666884,11.066330878861343,11.075765091034286,11.085199303207228,11.09463351538017,11.104067727553113,11.113501939726055,11.122936151898998,11.132370364071939,11.141804576244882,11.151238788417825,11.160673000590766,11.170107212763709,11.179541424936652,11.188975637109593,11.198409849282536,11.207844061455479,11.21727827362842,11.226712485801363,11.236146697974306,11.245580910147247,11.25501512232019,11.264449334493133,11.273883546666074,11.283317758839017,11.29275197101196,11.3021861831849,11.311620395357844,11.321054607530787,11.330488819703728,11.33992303187667,11.349357244049614,11.358791456222555,11.368225668395498,11.37765988056844,11.387094092741382,11.396528304914325,11.405962517087266,11.415396729260209,11.424830941433152,11.434265153606093,11.443699365779036,11.453133577951979,11.46256779012492,11.472002002297863,11.481436214470806,11.490870426643747,11.50030463881669,11.509738850989633,11.519173063162574,11.528607275335517,11.53804148750846,11.547475699681401,11.556909911854344,11.566344124027287,11.575778336200228,11.585212548373171,11.594646760546114,11.604080972719055,11.613515184891998,11.622949397064941,11.632383609237882,11.641817821410825,11.651252033583766,11.66068624575671,11.670120457929652,11.679554670102593,11.688988882275536,11.69842309444848,11.70785730662142,11.717291518794363,11.726725730967306,11.736159943140247,11.74559415531319,11.755028367486133,11.764462579659074,11.773896791832017,11.78333100400496,11.792765216177902,11.802199428350844,11.811633640523787,11.821067852696729,11.830502064869671,11.839936277042614,11.849370489215556,11.858804701388499,11.868238913561441,11.877673125734383,11.887107337907326,11.896541550080268,11.90597576225321,11.915409974426153,11.924844186599094,11.934278398772037,11.94371261094498,11.95314682311792,11.962581035290864,11.972015247463807,11.981449459636748,11.99088367180969,12.000317883982634,12.009752096155575,12.019186308328518,12.02862052050146,12.038054732674402,12.047488944847345,12.056923157020288,12.066357369193229,12.075791581366172,12.085225793539115,12.094660005712056,12.104094217884999,12.113528430057942,12.122962642230883,12.132396854403826,12.141831066576769,12.15126527874971,12.160699490922653,12.170133703095596,12.179567915268537,12.18900212744148,12.198436339614421,12.207870551787364,12.217304763960307,12.226738976133248,12.236173188306191,12.245607400479134,12.255041612652075,12.264475824825018,12.273910036997961,12.283344249170902,12.292778461343845,12.302212673516788,12.31164688568973,12.321081097862672,12.330515310035615,12.339949522208556,12.3493837343815,12.358817946554442,12.368252158727383,12.377686370900326,12.38712058307327,12.39655479524621,12.405989007419153,12.415423219592096,12.424857431765037,12.43429164393798,12.443725856110921,12.453160068283864,12.462594280456807,12.472028492629748,12.481462704802691,12.490896916975634,12.500331129148575,12.509765341321518,12.519199553494461,12.528633765667402,12.538067977840345,12.547502190013288,12.55693640218623,12.566370614359172]}
},{}],77:[function(require,module,exports){
module.exports={"expected":[8.165619676597685e15,321.6511036718155,160.82399735655648,107.21427102951853,80.4088896895169,64.32524633311573,53.60247195649134,45.94305127000254,40.19822662682438,35.72979933249437,32.15485016873096,29.229703267895996,26.791908050227704,24.72899872850129,22.960642596409457,21.427929001589273,20.086674953764142,18.903093459423953,17.850905744945088,16.909365409251382,16.061875330677346,15.294999743297863,14.59774574698726,13.961032249636316,13.377291673815098,12.840167253836698,12.344280187344655,11.885048530992355,11.458544904190486,11.061383633459062,10.690630467908742,10.34372976914515,10.018445353066127,9.712812087695788,9.425096032577468,9.153761411413178,8.89744308926353,8.654923512904228,8.42511329217892,8.207034768836238,7.999808050041234,7.80263908576319,7.614809449393842,7.435667544325576,7.264621009632863,7.1011301383293475,6.944702154113168,6.794886218740515,6.651269063477476,6.513471155476223,6.381143324185861,6.253963784656296,6.131635504306937,6.013883867797068,5.900454601355058,5.791111923544359,5.685636894161783,5.58382593693581,5.485489515049339,5.390450941354969,5.29854530756875,5.2096185187891395,5.123526421449588,5.040134014323254,4.9593147334960666,4.880949803342161,4.8049276465016435,4.731143346696111,4.659498158942808,4.589899062358844,4.52225835129646,4.456493261030291,4.392525624637253,4.330281558078168,4.269691170813258,4.210688299568405,4.153210263119853,4.097197636186588,4.042594040715635,3.9893459530190287,3.9374025253755764,3.886715420847266,3.837238660182274,3.7889284797852203,3.7417431998324036,3.695643101696532,3.6505903139232445,3.606548706071249,3.5634837897906944,3.52136262657037,3.480153741635107,3.439827043520249,3.4003537488912725,3.3617063122137645,3.3238583599124945,3.2867846286889075,3.2504609076937436,3.2148639842766062,3.179971593056982,3.145762368081848,3.112215797853855,3.079312183031034,3.04703259661481,3.0153588464571235,2.984273439930606,2.9537595506175967,2.923800986884679,2.894382162219385,2.8654880672148755,2.8371042430966997,2.809216756693589,2.78181217676115,2.754877551573936,2.728400387707309,2.7023686299360388,2.676770642181686,2.6515951894454206,2.6268314206673957,2.6024688524576525,2.5784973536473195,2.5549071306122384,2.5316887133243453,2.508832942089051,2.48633095492955,2.4641741755815834,2.442354302064443,2.420863295796203,2.399693371223188,2.3788369859355605,2.3582868312426366,2.3380358231831955,2.3180770939474966,2.298403983689234,2.27901003270685,2.259888973974941,2.241034726007594,2.2224413860365706,2.2041032234882616,2.1860146737442245,2.168170332171068,2.150564948406183,2.133193420886631,2.1160507916092,2.0991322411103126,2.0824330836551113,2.065948762625585,2.049674846098247,2.0336070226022964,2.017741097049744,2.00207298682942,1.986598718057221,1.9713144219753382,1.9562163314936347,1.9413007778666251,1.926564187499941,1.9120030788804006,1.89761405962415,1.883393823637611,1.8693391483862323,1.8554468922663088,1.841713992075342,1.8281374605766763,1.8147143841543274,1.8014419205541283,1.7883172967075143,1.7753378066344343,1.7625008094220649,1.7498037272761235,1.7372440436417893,1.7248193013913231,1.7125271010756513,1.700365099237292,1.6883310067821276,1.6764225874076404,1.6646376560853517,1.6529740775952693,1.641429765110307,1.6300026788286788,1.6186908246523877,1.607492252910006,1.5964050571220225,1.5854273728071209,1.5745573763277907,1.5637932837737967,1.553133349882045,1.542575866991477,1.53211916403167,1.5217616055438838,1.5115015907333533,1.5013375525516437,1.4912679568079978,1.4812913013085844,1.471406115022641,1.4616109572745355,1.4519044169608089,1.4422851117913051,1.4327516875535293,1.4233028173993965,1.4139372011535982,1.404653564642815,1.395450659045044,1.3863272602583459,1.377282168288338,1.3683142066537872,1.3594222218096714,1.3506050825871319,1.3418616796497267,1.333190924965442,1.324591751293925,1.316063111688435,1.3076039790120217,1.2992133454674457,1.2908902221404084,1.282633638555639,1.27444264224542,1.2663162983301537,1.258253689110567,1.2502539136711908,1.242316087494751,1.2344393420871054,1.2266228246124171,1.218865697538222,1.2111671382900815,1.2035263389155253,1.195942505756985,1.1884148591334518,1.1809426330305692,1.1735250747989188,1.1661614448602389,1.1588510164213341,1.1515930751954402,1.144386919130823,1.1372318581463916,1.1301272138741076,1.1230723194080003,1.11606651905958,1.1091091681194654,1.1021996326250376,1.0953372891339477,1.0885215245033057,1.0817517356743762,1.0750273294626371,1.068347722353032,1.061712340300274,1.055120618534052,1.048572001369004,1.0420659420193148,1.0356019024178174,1.029179353039456,1.0227977727290036,1.0164566485329056,1.0101554755351363,1.0038937566969572,0.9976710027004685,0.9914867317958534,0.9853404696522028,0.9792317492118356,0.973160110548013,0.9671251007259521,0.961126273667055,0.9551631900162636,0.9492354170124582,0.9433425283618134,0.9374841041140405,0.9316597305414345,0.9258690000206516,0.9201115109171485,0.9143868674722084,0.9086946796924924,0.9030345632420481,0.8974061393367047,0.8918090346408059,0.8862428811662113,0.8807073161735092,0.8752019820753862,0.869726526342098,0.8642806014089897,0.8588638645860048,0.8534759779691505,0.8481166083538499,0.8427854271501498,0.8374821102997281,0.8322063381946596,0.8269577955979008,0.8217361715654387,0.816541159370078,0.8113724564268171,0.8062297642197755,0.801112788230637,0.7960212378685696,0.7909548264015871,0.7859132708893216,0.7808962921171624,0.7759036145317418,0.7709349661777265,0.7659900786358874,0.7610686869624154,0.7561705296294549,0.7512953484668303,0.7464428886049251,0.7416128984187034,0.7368051294728337,0.732019336467897,0.7272552771876493,0.7225127124473179,0.7177914060429076,0.7130911247014865,0.7084116380324407,0.7037527184796669,0.6991141412746843,0.6944956843906458,0.6898971284972267,0.6853182569163719,0.6807588555788843,0.6762187129818282,0.6716976201467412,0.6671953705786249,0.6627117602257067,0.6582465874399472,0.6537996529382842,0.6493707597645932,0.6449597132523456,0.6405663209879581,0.6361903927748104,0.6318317405979194,0.6274901785892564,0.623165522993691,0.6188575921355537,0.6145662063857938,0.6102911881297318,0.6060323617353844,0.601789553522355,0.5975625917312747,0.5933513064937845,0.5891555298030451,0.5849750954847664,0.5808098391687392,0.5766595982608672,0.5725242119156829,0.5684035210093391,0.5642973681130652,0.5602055974670802,0.5561280549549538,0.5520645880783998,0.5480150459325023,0.5439792791813602,0.5399571400341414,0.5359484822215399,0.5319531609726268,0.52797103299209,0.5240019564378465,0.5200457908990314,0.5161023973743459,0.5121716382507636,0.5082533772825837,0.5043474795708269,0.500453811542965,0.4965722409329815,0.49270263676174797,0.4888448693177217,0.48499881013794877,0.48116433198937064,0.4773413088504277,0.4735296158929526,0.4697291294643527,0.4659397270700645,0.4621612873562896,0.45839369009299596,0.45463681615718193,0.4508905475164014,0.44715476721253833,0.44342935934583294,0.43971420905914943,0.4360092025224843,0.43231422691770577,0.4286291704235258,0.42495392220069583,0.42128837237742434,0.4176324120350091,0.4139859331936836,0.41034882879867196,0.4067209927064462,0.4031023196711859,0.3994927053314339,0.3958920461969449,0.39230023963572247,0.38871718386124215,0.3851427779198573,0.38157692167838286,0.37801951581185345,0.37447046179145427,0.3709296618726218,0.3673970190833065,0.3638724372124012,0.36035582079832634,0.3568470751177736,0.35334610617459977,0.3498528206888736,0.34636712608606846,0.34288893048640173,0.33941814269431275,0.33595467218808295,0.33249842910959254,0.32904932425420863,0.32560726906080784,0.32217217560192607,0.31874395657403654,0.3153225252879496,0.31190779565933646,0.3084996821993716,0.3050981000054936,0.30170296475227787,0.29831419268242626,0.29493170059786517,0.29155540585095163,0.28818522633578797,0.28482108047963905,0.28146288723445406,0.27811056606848605,0.2747640369580127,0.2714232203791523,0.26808803729977587,0.2647584091715102,0.26143425792183417,0.25811550594626403,0.25480207610062533,0.25149389169341196,0.2481908764782292,0.24489295464632,0.24160005081917055,0.2383120900411973,0.23502899777251055,0.23175069988175584,0.22847712263902745,0.22520819270885786,0.2219438371432784,0.21868398337494868,0.21542855921035703,0.2121774928230869,0.20893071274715116,0.20568814787038853,0.20244972742792594,0.19921538099570127,0.19598503848404875,0.1927586301313411,0.1895360864976921,0.1863173384587162,0.18310231719934167,0.17989095420768064,0.17668318126895108,0.17347893045945204,0.170278134140588,0.1670807249529449,0.16388663581041368,0.16069579989436256,0.15750815064785373,0.15432362176990716,0.15114214720980873,0.14796366116145973,0.14478809805777032,0.14161539256509317,0.1384454795776982,0.13527829421228418,0.13211377180253084,0.12895184789368624,0.12579245823719185,0.1226355387853405,0.1194810256859702,0.11632885527719136,0.11317896408214405,0.110031288803789,0.10688576631972725,0.10374233367705099,0.10060092808722045,0.09746148692097067,0.09432394770324382,0.09118824810814853,0.08805432595394214,0.08492211919803888,0.0817915659320416,0.07866260437679351,0.075535172877454,0.07240920989859373,0.06928465401931086,0.06616144392836416,0.06303951841932658,0.05991881638575478,0.05679927681637669,0.05368083879029248,0.0505634414721926,0.04744702410758995,0.04433152601806334,0.041216886596515845,0.038103045302443496,0.03498994165721638,0.03187751523936764,0.02876570567989418,0.025654452657564674,0.022543695894236705,0.019433375150178872,0.016323430219401143,0.013213800924990813,0.010104427114451177,0.00699524865504652,0.0038862054291489557,0.0007772373295891115,-0.0023317157449936877,-0.005440713894798073,-0.008549817223508418,-0.011659085842941867,-0.01476857987769892,-0.017878359469814125,-0.02098848478340963,-0.02409901600935436,-0.02721001336992539,-0.030321537123475798,-0.03343364756910712,-0.03654640505135075,-0.03965986996485457,-0.042774102759079224,-0.04588916394300198,-0.049005114089832755,-0.052122013841738646,-0.05523992391457987,-0.058358905102659904,-0.06147901828348624,-0.06460032442254643,-0.06772288457809719,-0.07084675990597111,-0.07397201166439744,-0.07709870121884098,-0.08022689004685764,-0.08335663974297071,-0.08648801202356463,-0.08962106873179909,-0.09275587184254618,-0.09589248346734727,-0.09903096585939423,-0.10217138141853267,-0.10531379269629237,-0.10845826240094049,-0.1116048534025627,-0.11475362873817004,-0.11790465161683616,-0.12105798542486146,-0.12421369373096716,-0.1273718402915222,-0.13053248905579976,-0.13369570417126753,-0.1368615499889106,-0.14003009106859102,-0.14320139218444067,-0.146375518330292,-0.14955253472514513,-0.1527325068186755,-0.15591550029677922,-0.15910158108715883,-0.16229081536495288,-0.16548326955840584,-0.16867901035458285,-0.17187810470512838,-0.17508061983207263,-0.1782866232336829,-0.18149618269036352,-0.18470936627060625,-0.18792624233698957,-0.19114687955223036,-0.1943713468852872,-0.19759971361751966,-0.2008320493489006,-0.20406842400428601,-0.2073089078397413,-0.21055357144892836,-0.2138024857695511,-0.21705572208986212,-0.2203133520552343,-0.22357544767479423,-0.22684208132812225,-0.23011332577201818,-0.2333892541473374,-0.23666993998589442,-0.23995545721743866,-0.24324588017670165,-0.2465412836105204,-0.24984174268503442,-0.2531473329929596,-0.25645813056094297,-0.25977421185699545,-0.2630956537980076,-0.26642253375734765,-0.269754929572547,-0.2730929195530702,-0.27643658248817504,-0.2797859976548612,-0.28314124482591374,-0.2865024042780387,-0.2898695568000933,-0.29324278370141726,-0.2966221668202606,-0.3000077885323147,-0.3033997317593448,-0.30679807997793146,-0.31020291722831617,-0.3136143281233587,-0.31703239785760456,-0.32045721221646867,-0.32388885758553315,-0.32732742095996376,-0.3307729899540488,-0.3342256528108586,-0.33768549841203216,-0.34115261628769,-0.34462709662647967,-0.3481090302857514,-0.35159850880187105,-0.355095624400669,-0.35860047000803263,-0.3621131392606393,-0.36563372651683584,-0.3691623268676689,-0.3726990361480649,-0.3762439509481656,-0.3797971686248206,-0.3833587873132422,-0.3869289059388222,-0.3905076242291168,-0.3940950427260006,-0.39769126279799605,-0.4012963866527782,-0.4049105173498587,-0.40853375881345744,-0.41216621584555696,-0.4158079941391513,-0.4194592002916871,-0.42311994181870544,-0.42679032716768434,-0.4304704657320887,-0.43416046786562884,-0.43786044489673653,-0.4415705091432574,-0.4452907739273659,-0.44902135359071,-0.4527623635097861,-0.4565139201115506,-0.46027614088927205,-0.46404914441863093,-0.46783305037406836,-0.47162797954539165,-0.4754340538546395,-0.47925139637321496,-0.4830801313392889,-0.4869203841754786,-0.49077228150681196,-0.49463595117897746,-0.49851152227686824,-0.5023991251434251,-0.5062988913987887,-0.510210953959759,-0.5141354470595769,-0.5180725062680273,-0.5220222685118772,-0.5259848720956498,-0.5299604567227424,-0.5339491635169,-0.537951135044046,-0.5419665153344798,-0.5459954499054487,-0.5500380857841041,-0.5540945715308448,-0.558165057263061,-0.5622496946792822,-0.5663486370837438,-0.5704620394113747,-0.5745900582532169,-0.5787328518822904,-0.5828905802799058,-0.5870634051624398,-0.5912514900085786,-0.5954550000870455,-0.5996741024848159,-0.6039089661358353,-0.6081597618502483,-0.612426662344152,-0.6167098422698825,-0.6210094782468468,-0.6253257488929156,-0.6296588348563812,-0.6340089188485019,-0.6383761856766383,-0.6427608222780011,-0.6471630177540167,-0.6515829634053303,-0.6560208527674584,-0.6604768816471034,-0.6649512481591482,-0.6694441527643443,-0.673955798307707,-0.6784863900576396,-0.6830361357457942,-0.6876052456076958,-0.692193932424137,-0.6968024115633693,-0.7014309010241038,-0.7060796214793417,-0.7107487963210535,-0.7154386517057266,-0.7201494166008023,-0.7248813228320184,-0.7296346051316864,-0.7344095011879151,-0.7392062516948134,-0.7440251004036854,-0.7488662941752494,-0.7537300830328975,-0.758616720217028,-0.7635264622404692,-0.7684595689450255,-0.7734163035591708,-0.7783969327569153,-0.7834017267178779,-0.7884309591885883,-0.7934849075450535,-0.7985638528566155,-0.8036680799511345,-0.8087978774815281,-0.813953537993702,-0.8191353579959024,-0.8243436380295323,-0.82957868274146,-0.8348408009578623,-0.8401303057596405,-0.8454475145594446,-0.8507927491803522,-0.8561663359362377,-0.8615686057138805,-0.866999894056852,-0.8724605412512284,-0.8779508924131775,-0.8834712975784652,-0.8890221117939334,-0.8946036952109977,-0.9002164131812227,-0.9058606363540211,-0.9115367407765407,-0.9172451079957902,-0.9229861251630682,-0.9287601851407506,-0.9345676866115048,-0.9404090341899932,-0.9462846385371299,-0.9521949164769655,-0.9581402911162634,-0.9641211919668488,-0.9701380550707971,-0.9761913231285478,-0.982281445630017,-0.9884088789887956,-0.9945740866795161,-1.0007775393784768,-1.007019715107616,-1.0133010993819234,-1.019622185360395,-1.0259834740006224,-1.0323854742171243,-1.038828703043525,-1.0453136857986913,-1.0518409562569362,-1.0584110568224145,-1.065024538707824,-1.0716819621175397,-1.078383896435313,-1.0851309204166624,-1.0919236223861037,-1.0987626004393503,-1.105648462650641,-1.112581827285343,-1.1195633230179869,-1.1265935891558991,-1.1336732758686001,-1.140803044423139,-1.1479835674255512,-1.1552155290686206,-1.1624996253861417,-1.1698365645138813,-1.177227066957447,-1.1846718658672781,-1.1921717073209774,-1.1997273506132198,-1.2073395685534674,-1.2150091477717506,-1.2227368890327566,-1.2305236075585007,-1.2383701333598538,-1.2462773115772063,-1.2542460028305693,-1.262277083579416,-1.2703714464925855,-1.2785300008285723,-1.2867536728265518,-1.2950434061084881,-1.3034001620927034,-1.3118249204192802,-1.3203186793877035,-1.3288824564071522,-1.3375172884598636,-1.3462242325780291,-1.3550043663346667,-1.3638587883489701,-1.3727886188066185,-1.3817949999955776,-1.3908790968579277,-1.400042097558283,-1.4092852140693861,-1.4186096827754884,-1.4280167650941473,-1.4375077481171021,-1.447083945270915,-1.456746696998089,-1.466497371459414,-1.4763373652583094,-1.4862681041879773,-1.4962910440022048,-1.5064076712107,-1.516619503899867,-1.5269280925799869,-1.5373350210597927,-1.54784190734948,-1.5584504045932412,-1.5691622020324478,-1.5799790260006756,-1.590902640951793,-1.6019348505224136,-1.6130774986300527,-1.6243324706084057,-1.6357016943812044,-1.6471871416762087,-1.658790829280931,-1.6705148203417803,-1.6823612257083917,-1.6943322053249772,-1.7064299696706422,-1.718656781250671,-1.7310149561409203,-1.7435068655875172,-1.7561349376642104,-1.7689016589897928,-1.7818095765081645,-1.7948612993337143,-1.8080595006648288,-1.8214069197684934,-1.8349063640390726,-1.8485607111345341,-1.8623729111935348,-1.876345989136961,-1.8904830470576994,-1.9047872667026198,-1.919261912050929,-1.9339103319933144,-1.948735963116481,-1.9637423325979695,-1.978933061216372,-1.9943118664823571,-2.0098825658961936,-2.025649080337782,-2.041615437595516,-2.057785776040665,-2.0741643484543166,-2.090755526014328,-2.1075638024501413,-2.1245937983737724,-2.1418502657957466,-2.159338092835262,-2.1770623086344,-2.1950280884867652,-2.2132407591915615,-2.231705804644737,-2.2504288716795444,-2.2694157761695974,-2.2886725094082823,-2.30820524477924,-2.3280203447335364,-2.348124368090086,-2.368524077676956,-2.3892264483322467,-2.4102386752844622,-2.4315681829335247,-2.4532226340549705,-2.475209939451303,-2.497538268076065,-2.5202160576578554,-2.5432520258533398,-2.5666551819602366,-2.5904348392233656,-2.614600627769078,-2.639162508205839,-2.6641307859313246,-2.689516126189228,-2.7153295699220226,-2.74158255046919,-2.7682869111640103,-2.795454923885826,-2.8230993086288594,-2.8512332541531764,-2.879870439788253,-2.909025058464905,-2.9387118410570925,-2.9689460821213243,-2.9997436671282003,-3.0311211012879937,-3.0630955400801936,-3.0956848216057105,-3.1289075008899583,-3.162782886275456,-3.197331078053973,-3.2325730095006646,-3.268530490486262,-3.3052262538582857,-3.342684004798588,-3.3809284733824563,-3.419985470584214,-3.4598819479958864,-3.500646061549358,-3.542307239558655,-3.584896255427993,-3.6284453054031385,-3.672988091779011,-3.7185599120154977,-3.7651977542568087,-3.812940399797678,-3.861828533093082,-3.911904859967439,-3.9632142347452435,-4.015803797098695,-4.0697231194899635,-4.1250243661775565,-4.181762464858947,-4.23999529213675,-4.299783874125005,-4.361192603657338,-4.424289475722377,-4.489146342936222,-4.555839193070084,-4.624448450886899,-4.695059306807861,-4.7677620752330805,-4.842652585685481,-4.919832610340183,-4.999410331950355,-5.081500856693932,-5.166226777054153,-5.253718790522962,-5.3441163806946514,-5.437568568215259,-5.5342347400918905,-5.634285567070284,-5.7379040201883145,-5.845286499243643,-5.956644087818466,-6.07220395173567,-6.192210900441892,-6.31692913390144,-6.446644201234917,-6.581665201663647,-6.722327263468121,-6.868994342812037,-7.022062391642041,-7.181962952719975,-7.349167250521677,-7.524190859674382,-7.707599048348944,-7.900012913265686,-8.102116446599888,-8.314664704223167,-8.538493280863456,-8.774529342825542,-9.023804525396724,-9.287470073279549,-9.566814692743826,-9.863285699560517,-10.178514195113538,-10.514345195189229,-10.872873886655224,-11.256489517124328,-11.667928860545029,-12.110341788208707,-12.587372268229155,-13.10325920162923,-13.662963003811404,-14.272325941087038,-14.93827721228359,-15.669098054236871,-16.47476841820393,-17.367426081869283,-18.361983171181873,-19.476966871950832,-20.73568557818801,-22.16787758459219,-23.81209253124847,-25.71921594178333,-27.957832650991836,-30.622655048251854,-33.84827442204182,-37.83261913588284,-42.879179345034395,-49.478208374755276,-58.47650742030355,-71.47358984693645,-91.89698428990997,-128.65826519447725,-214.43320551588042,-643.3037618192421,643.3037618192421,214.43320551588042,128.65826519447725,91.89698428990997,71.47358984693645,58.47650742030355,49.478208374755276,42.879179345034395,37.83261913588284,33.84827442204182,30.622655048251854,27.957832650991836,25.71921594178333,23.81209253124847,22.16787758459219,20.73568557818801,19.476966871950832,18.361983171181873,17.367426081869283,16.47476841820393,15.669098054236871,14.93827721228359,14.272325941087038,13.662963003811404,13.10325920162923,12.587372268229155,12.110341788208707,11.667928860545029,11.256489517124328,10.872873886655224,10.514345195189229,10.178514195113538,9.863285699560517,9.566814692743826,9.287470073279549,9.023804525396724,8.774529342825542,8.538493280863456,8.314664704223167,8.102116446599888,7.900012913265686,7.707599048348944,7.524190859674382,7.349167250521677,7.181962952719975,7.022062391642041,6.868994342812037,6.722327263468121,6.581665201663647,6.446644201234917,6.31692913390144,6.192210900441892,6.07220395173567,5.956644087818466,5.845286499243643,5.7379040201883145,5.634285567070284,5.5342347400918905,5.437568568215259,5.3441163806946514,5.253718790522962,5.166226777054153,5.081500856693932,4.999410331950355,4.919832610340183,4.842652585685481,4.7677620752330805,4.695059306807861,4.624448450886899,4.555839193070084,4.489146342936222,4.424289475722377,4.361192603657338,4.299783874125005,4.23999529213675,4.181762464858947,4.1250243661775565,4.0697231194899635,4.015803797098695,3.9632142347452435,3.911904859967439,3.861828533093082,3.812940399797678,3.7651977542568087,3.7185599120154977,3.672988091779011,3.6284453054031385,3.584896255427993,3.542307239558655,3.500646061549358,3.4598819479958864,3.419985470584214,3.3809284733824563,3.342684004798588,3.3052262538582857,3.268530490486262,3.2325730095006646,3.197331078053973,3.162782886275456,3.1289075008899583,3.0956848216057105,3.0630955400801936,3.0311211012879937,2.9997436671282003,2.9689460821213243,2.9387118410570925,2.909025058464905,2.879870439788253,2.8512332541531764,2.8230993086288594,2.795454923885826,2.7682869111640103,2.74158255046919,2.7153295699220226,2.689516126189228,2.6641307859313246,2.639162508205839,2.614600627769078,2.5904348392233656,2.5666551819602366,2.5432520258533398,2.5202160576578554,2.497538268076065,2.475209939451303,2.4532226340549705,2.4315681829335247,2.4102386752844622,2.3892264483322467,2.368524077676956,2.348124368090086,2.3280203447335364,2.30820524477924,2.2886725094082823,2.2694157761695974,2.2504288716795444,2.231705804644737,2.2132407591915615,2.1950280884867652,2.1770623086344,2.159338092835262,2.1418502657957466,2.1245937983737724,2.1075638024501413,2.090755526014328,2.0741643484543166,2.057785776040665,2.041615437595516,2.025649080337782,2.0098825658961936,1.9943118664823571,1.978933061216372,1.9637423325979695,1.948735963116481,1.9339103319933144,1.919261912050929,1.9047872667026198,1.8904830470576994,1.876345989136961,1.8623729111935348,1.8485607111345341,1.8349063640390726,1.8214069197684934,1.8080595006648288,1.7948612993337143,1.7818095765081645,1.7689016589897928,1.7561349376642104,1.7435068655875172,1.7310149561409203,1.718656781250671,1.7064299696706422,1.6943322053249772,1.6823612257083917,1.6705148203417803,1.658790829280931,1.6471871416762087,1.6357016943812044,1.6243324706084057,1.6130774986300527,1.6019348505224136,1.590902640951793,1.5799790260006756,1.5691622020324478,1.5584504045932412,1.54784190734948,1.5373350210597927,1.5269280925799869,1.516619503899867,1.5064076712107,1.4962910440022048,1.4862681041879773,1.4763373652583094,1.466497371459414,1.456746696998089,1.447083945270915,1.4375077481171021,1.4280167650941473,1.4186096827754884,1.4092852140693861,1.400042097558283,1.3908790968579277,1.3817949999955776,1.3727886188066185,1.3638587883489701,1.3550043663346667,1.3462242325780291,1.3375172884598636,1.3288824564071522,1.3203186793877035,1.3118249204192802,1.3034001620927034,1.2950434061084881,1.2867536728265518,1.2785300008285723,1.2703714464925855,1.262277083579416,1.2542460028305693,1.2462773115772063,1.2383701333598538,1.2305236075585007,1.2227368890327566,1.2150091477717506,1.2073395685534674,1.1997273506132198,1.1921717073209774,1.1846718658672781,1.177227066957447,1.1698365645138813,1.1624996253861417,1.1552155290686206,1.1479835674255512,1.140803044423139,1.1336732758686001,1.1265935891558991,1.1195633230179869,1.112581827285343,1.105648462650641,1.0987626004393503,1.0919236223861037,1.0851309204166624,1.078383896435313,1.0716819621175397,1.065024538707824,1.0584110568224145,1.0518409562569362,1.0453136857986913,1.038828703043525,1.0323854742171243,1.0259834740006224,1.019622185360395,1.0133010993819234,1.007019715107616,1.0007775393784768,0.9945740866795161,0.9884088789887956,0.982281445630017,0.9761913231285478,0.9701380550707971,0.9641211919668488,0.9581402911162634,0.9521949164769655,0.9462846385371299,0.9404090341899932,0.9345676866115048,0.9287601851407506,0.9229861251630682,0.9172451079957902,0.9115367407765407,0.9058606363540211,0.9002164131812227,0.8946036952109977,0.8890221117939334,0.8834712975784652,0.8779508924131775,0.8724605412512284,0.866999894056852,0.8615686057138805,0.8561663359362377,0.8507927491803522,0.8454475145594446,0.8401303057596405,0.8348408009578623,0.82957868274146,0.8243436380295323,0.8191353579959024,0.813953537993702,0.8087978774815281,0.8036680799511345,0.7985638528566155,0.7934849075450535,0.7884309591885883,0.7834017267178779,0.7783969327569153,0.7734163035591708,0.7684595689450255,0.7635264622404692,0.758616720217028,0.7537300830328975,0.7488662941752494,0.7440251004036854,0.7392062516948134,0.7344095011879151,0.7296346051316864,0.7248813228320184,0.7201494166008023,0.7154386517057266,0.7107487963210535,0.7060796214793417,0.7014309010241038,0.6968024115633693,0.692193932424137,0.6876052456076958,0.6830361357457942,0.6784863900576396,0.673955798307707,0.6694441527643443,0.6649512481591482,0.6604768816471034,0.6560208527674584,0.6515829634053303,0.6471630177540167,0.6427608222780011,0.6383761856766383,0.6340089188485019,0.6296588348563812,0.6253257488929156,0.6210094782468468,0.6167098422698825,0.612426662344152,0.6081597618502483,0.6039089661358353,0.5996741024848159,0.5954550000870455,0.5912514900085786,0.5870634051624398,0.5828905802799058,0.5787328518822904,0.5745900582532169,0.5704620394113747,0.5663486370837438,0.5622496946792822,0.558165057263061,0.5540945715308448,0.5500380857841041,0.5459954499054487,0.5419665153344798,0.537951135044046,0.5339491635169,0.5299604567227424,0.5259848720956498,0.5220222685118772,0.5180725062680273,0.5141354470595769,0.510210953959759,0.5062988913987887,0.5023991251434251,0.49851152227686824,0.49463595117897746,0.49077228150681196,0.4869203841754786,0.4830801313392889,0.47925139637321496,0.4754340538546395,0.47162797954539165,0.46783305037406836,0.46404914441863093,0.46027614088927205,0.4565139201115506,0.4527623635097861,0.44902135359071,0.4452907739273659,0.4415705091432574,0.43786044489673653,0.43416046786562884,0.4304704657320887,0.42679032716768434,0.42311994181870544,0.4194592002916871,0.4158079941391513,0.41216621584555696,0.40853375881345744,0.4049105173498587,0.4012963866527782,0.39769126279799605,0.3940950427260006,0.3905076242291168,0.3869289059388222,0.3833587873132422,0.3797971686248206,0.3762439509481656,0.3726990361480649,0.3691623268676689,0.36563372651683584,0.3621131392606393,0.35860047000803263,0.355095624400669,0.35159850880187105,0.3481090302857514,0.34462709662647967,0.34115261628769,0.33768549841203216,0.3342256528108586,0.3307729899540488,0.32732742095996376,0.32388885758553315,0.32045721221646867,0.31703239785760456,0.3136143281233587,0.31020291722831617,0.30679807997793146,0.3033997317593448,0.3000077885323147,0.2966221668202606,0.29324278370141726,0.2898695568000933,0.2865024042780387,0.28314124482591374,0.2797859976548612,0.27643658248817504,0.2730929195530702,0.269754929572547,0.26642253375734765,0.2630956537980076,0.25977421185699545,0.25645813056094297,0.2531473329929596,0.24984174268503442,0.2465412836105204,0.24324588017670165,0.23995545721743866,0.23666993998589442,0.2333892541473374,0.23011332577201818,0.22684208132812225,0.22357544767479423,0.2203133520552343,0.21705572208986212,0.2138024857695511,0.21055357144892836,0.2073089078397413,0.20406842400428601,0.2008320493489006,0.19759971361751966,0.1943713468852872,0.19114687955223036,0.18792624233698957,0.18470936627060625,0.18149618269036352,0.1782866232336829,0.17508061983207263,0.17187810470512838,0.16867901035458285,0.16548326955840584,0.16229081536495288,0.15910158108715883,0.15591550029677922,0.1527325068186755,0.14955253472514513,0.146375518330292,0.14320139218444067,0.14003009106859102,0.1368615499889106,0.13369570417126753,0.13053248905579976,0.1273718402915222,0.12421369373096716,0.12105798542486146,0.11790465161683616,0.11475362873817004,0.1116048534025627,0.10845826240094049,0.10531379269629237,0.10217138141853267,0.09903096585939423,0.09589248346734727,0.09275587184254618,0.08962106873179909,0.08648801202356463,0.08335663974297071,0.08022689004685764,0.07709870121884098,0.07397201166439744,0.07084675990597111,0.06772288457809719,0.06460032442254643,0.06147901828348624,0.058358905102659904,0.05523992391457987,0.052122013841738646,0.049005114089832755,0.04588916394300198,0.042774102759079224,0.03965986996485457,0.03654640505135075,0.03343364756910712,0.030321537123475798,0.02721001336992539,0.02409901600935436,0.02098848478340963,0.017878359469814125,0.01476857987769892,0.011659085842941867,0.008549817223508418,0.005440713894798073,0.0023317157449936877,-0.0007772373295891115,-0.0038862054291489557,-0.00699524865504652,-0.010104427114451177,-0.013213800924990813,-0.016323430219401143,-0.019433375150178872,-0.022543695894236705,-0.025654452657564674,-0.02876570567989418,-0.03187751523936764,-0.03498994165721638,-0.038103045302443496,-0.041216886596515845,-0.04433152601806334,-0.04744702410758995,-0.0505634414721926,-0.05368083879029248,-0.05679927681637669,-0.05991881638575478,-0.06303951841932658,-0.06616144392836416,-0.06928465401931086,-0.07240920989859373,-0.075535172877454,-0.07866260437679351,-0.0817915659320416,-0.08492211919803888,-0.08805432595394214,-0.09118824810814853,-0.09432394770324382,-0.09746148692097067,-0.10060092808722045,-0.10374233367705099,-0.10688576631972725,-0.110031288803789,-0.11317896408214405,-0.11632885527719136,-0.1194810256859702,-0.1226355387853405,-0.12579245823719185,-0.12895184789368624,-0.13211377180253084,-0.13527829421228418,-0.1384454795776982,-0.14161539256509317,-0.14478809805777032,-0.14796366116145973,-0.15114214720980873,-0.15432362176990716,-0.15750815064785373,-0.16069579989436256,-0.16388663581041368,-0.1670807249529449,-0.170278134140588,-0.17347893045945204,-0.17668318126895108,-0.17989095420768064,-0.18310231719934167,-0.1863173384587162,-0.1895360864976921,-0.1927586301313411,-0.19598503848404875,-0.19921538099570127,-0.20244972742792594,-0.20568814787038853,-0.20893071274715116,-0.2121774928230869,-0.21542855921035703,-0.21868398337494868,-0.2219438371432784,-0.22520819270885786,-0.22847712263902745,-0.23175069988175584,-0.23502899777251055,-0.2383120900411973,-0.24160005081917055,-0.24489295464632,-0.2481908764782292,-0.25149389169341196,-0.25480207610062533,-0.25811550594626403,-0.26143425792183417,-0.2647584091715102,-0.26808803729977587,-0.2714232203791523,-0.2747640369580127,-0.27811056606848605,-0.28146288723445406,-0.28482108047963905,-0.28818522633578797,-0.29155540585095163,-0.29493170059786517,-0.29831419268242626,-0.30170296475227787,-0.3050981000054936,-0.3084996821993716,-0.31190779565933646,-0.3153225252879496,-0.31874395657403654,-0.32217217560192607,-0.32560726906080784,-0.32904932425420863,-0.33249842910959254,-0.33595467218808295,-0.33941814269431275,-0.34288893048640173,-0.34636712608606846,-0.3498528206888736,-0.35334610617459977,-0.3568470751177736,-0.36035582079832634,-0.3638724372124012,-0.3673970190833065,-0.3709296618726218,-0.37447046179145427,-0.37801951581185345,-0.38157692167838286,-0.3851427779198573,-0.38871718386124215,-0.39230023963572247,-0.3958920461969449,-0.3994927053314339,-0.4031023196711859,-0.4067209927064462,-0.41034882879867196,-0.4139859331936836,-0.4176324120350091,-0.42128837237742434,-0.42495392220069583,-0.4286291704235258,-0.43231422691770577,-0.4360092025224843,-0.43971420905914943,-0.44342935934583294,-0.44715476721253833,-0.4508905475164014,-0.45463681615718193,-0.45839369009299596,-0.4621612873562896,-0.4659397270700645,-0.4697291294643527,-0.4735296158929526,-0.4773413088504277,-0.48116433198937064,-0.48499881013794877,-0.4888448693177217,-0.49270263676174797,-0.4965722409329815,-0.500453811542965,-0.5043474795708269,-0.5082533772825837,-0.5121716382507636,-0.5161023973743459,-0.5200457908990314,-0.5240019564378465,-0.52797103299209,-0.5319531609726268,-0.5359484822215399,-0.5399571400341414,-0.5439792791813602,-0.5480150459325023,-0.5520645880783998,-0.5561280549549538,-0.5602055974670802,-0.5642973681130652,-0.5684035210093391,-0.5725242119156829,-0.5766595982608672,-0.5808098391687392,-0.5849750954847664,-0.5891555298030451,-0.5933513064937845,-0.5975625917312747,-0.601789553522355,-0.6060323617353844,-0.6102911881297318,-0.6145662063857938,-0.6188575921355537,-0.623165522993691,-0.6274901785892564,-0.6318317405979194,-0.6361903927748104,-0.6405663209879581,-0.6449597132523456,-0.6493707597645932,-0.6537996529382842,-0.6582465874399472,-0.6627117602257067,-0.6671953705786249,-0.6716976201467412,-0.6762187129818282,-0.6807588555788843,-0.6853182569163719,-0.6898971284972267,-0.6944956843906458,-0.6991141412746843,-0.7037527184796669,-0.7084116380324407,-0.7130911247014865,-0.7177914060429076,-0.7225127124473179,-0.7272552771876493,-0.732019336467897,-0.7368051294728337,-0.7416128984187034,-0.7464428886049251,-0.7512953484668303,-0.7561705296294549,-0.7610686869624154,-0.7659900786358874,-0.7709349661777265,-0.7759036145317418,-0.7808962921171624,-0.7859132708893216,-0.7909548264015871,-0.7960212378685696,-0.801112788230637,-0.8062297642197755,-0.8113724564268171,-0.816541159370078,-0.8217361715654387,-0.8269577955979008,-0.8322063381946596,-0.8374821102997281,-0.8427854271501498,-0.8481166083538499,-0.8534759779691505,-0.8588638645860048,-0.8642806014089897,-0.869726526342098,-0.8752019820753862,-0.8807073161735092,-0.8862428811662113,-0.8918090346408059,-0.8974061393367047,-0.9030345632420481,-0.9086946796924924,-0.9143868674722084,-0.9201115109171485,-0.9258690000206516,-0.9316597305414345,-0.9374841041140405,-0.9433425283618134,-0.9492354170124582,-0.9551631900162636,-0.961126273667055,-0.9671251007259521,-0.973160110548013,-0.9792317492118356,-0.9853404696522028,-0.9914867317958534,-0.9976710027004685,-1.0038937566969572,-1.0101554755351363,-1.0164566485329056,-1.0227977727290036,-1.029179353039456,-1.0356019024178174,-1.0420659420193148,-1.048572001369004,-1.055120618534052,-1.061712340300274,-1.068347722353032,-1.0750273294626371,-1.0817517356743762,-1.0885215245033057,-1.0953372891339477,-1.1021996326250376,-1.1091091681194654,-1.11606651905958,-1.1230723194080003,-1.1301272138741076,-1.1372318581463916,-1.144386919130823,-1.1515930751954402,-1.1588510164213341,-1.1661614448602389,-1.1735250747989188,-1.1809426330305692,-1.1884148591334518,-1.195942505756985,-1.2035263389155253,-1.2111671382900815,-1.218865697538222,-1.2266228246124171,-1.2344393420871054,-1.242316087494751,-1.2502539136711908,-1.258253689110567,-1.2663162983301537,-1.27444264224542,-1.282633638555639,-1.2908902221404084,-1.2992133454674457,-1.3076039790120217,-1.316063111688435,-1.324591751293925,-1.333190924965442,-1.3418616796497267,-1.3506050825871319,-1.3594222218096714,-1.3683142066537872,-1.377282168288338,-1.3863272602583459,-1.395450659045044,-1.404653564642815,-1.4139372011535982,-1.4233028173993965,-1.4327516875535293,-1.4422851117913051,-1.4519044169608089,-1.4616109572745355,-1.471406115022641,-1.4812913013085844,-1.4912679568079978,-1.5013375525516437,-1.5115015907333533,-1.5217616055438838,-1.53211916403167,-1.542575866991477,-1.553133349882045,-1.5637932837737967,-1.5745573763277907,-1.5854273728071209,-1.5964050571220225,-1.607492252910006,-1.6186908246523877,-1.6300026788286788,-1.641429765110307,-1.6529740775952693,-1.6646376560853517,-1.6764225874076404,-1.6883310067821276,-1.700365099237292,-1.7125271010756513,-1.7248193013913231,-1.7372440436417893,-1.7498037272761235,-1.7625008094220649,-1.7753378066344343,-1.7883172967075143,-1.8014419205541283,-1.8147143841543274,-1.8281374605766763,-1.841713992075342,-1.8554468922663088,-1.8693391483862323,-1.883393823637611,-1.89761405962415,-1.9120030788804006,-1.926564187499941,-1.9413007778666251,-1.9562163314936347,-1.9713144219753382,-1.986598718057221,-2.00207298682942,-2.017741097049744,-2.0336070226022964,-2.049674846098247,-2.065948762625585,-2.0824330836551113,-2.0991322411103126,-2.1160507916092,-2.133193420886631,-2.150564948406183,-2.168170332171068,-2.1860146737442245,-2.2041032234882616,-2.2224413860365706,-2.241034726007594,-2.259888973974941,-2.27901003270685,-2.298403983689234,-2.3180770939474966,-2.3380358231831955,-2.3582868312426366,-2.3788369859355605,-2.399693371223188,-2.420863295796203,-2.442354302064443,-2.4641741755815834,-2.48633095492955,-2.508832942089051,-2.5316887133243453,-2.5549071306122384,-2.5784973536473195,-2.6024688524576525,-2.6268314206673957,-2.6515951894454206,-2.676770642181686,-2.7023686299360388,-2.728400387707309,-2.754877551573936,-2.78181217676115,-2.809216756693589,-2.8371042430966997,-2.8654880672148755,-2.894382162219385,-2.923800986884679,-2.9537595506175967,-2.984273439930606,-3.0153588464571235,-3.04703259661481,-3.079312183031034,-3.112215797853855,-3.145762368081848,-3.179971593056982,-3.2148639842766062,-3.2504609076937436,-3.2867846286889075,-3.3238583599124945,-3.3617063122137645,-3.4003537488912725,-3.439827043520249,-3.480153741635107,-3.52136262657037,-3.5634837897906944,-3.606548706071249,-3.6505903139232445,-3.695643101696532,-3.7417431998324036,-3.7889284797852203,-3.837238660182274,-3.886715420847266,-3.9374025253755764,-3.9893459530190287,-4.042594040715635,-4.097197636186588,-4.153210263119853,-4.210688299568405,-4.269691170813258,-4.330281558078168,-4.392525624637253,-4.456493261030291,-4.52225835129646,-4.589899062358844,-4.659498158942808,-4.731143346696111,-4.8049276465016435,-4.880949803342161,-4.9593147334960666,-5.040134014323254,-5.123526421449588,-5.2096185187891395,-5.29854530756875,-5.390450941354969,-5.485489515049339,-5.58382593693581,-5.685636894161783,-5.791111923544359,-5.900454601355058,-6.013883867797068,-6.131635504306937,-6.253963784656296,-6.381143324185861,-6.513471155476223,-6.651269063477476,-6.794886218740515,-6.944702154113168,-7.1011301383293475,-7.264621009632863,-7.435667544325576,-7.614809449393842,-7.80263908576319,-7.999808050041234,-8.207034768836238,-8.42511329217892,-8.654923512904228,-8.89744308926353,-9.153761411413178,-9.425096032577468,-9.712812087695788,-10.018445353066127,-10.34372976914515,-10.690630467908742,-11.061383633459062,-11.458544904190486,-11.885048530992355,-12.344280187344655,-12.840167253836698,-13.377291673815098,-13.961032249636316,-14.59774574698726,-15.294999743297863,-16.061875330677346,-16.909365409251382,-17.850905744945088,-18.903093459423953,-20.086674953764142,-21.427929001589273,-22.960642596409457,-24.72899872850129,-26.791908050227704,-29.229703267895996,-32.15485016873096,-35.72979933249437,-40.19822662682438,-45.94305127000254,-53.60247195649134,-64.32524633311573,-80.4088896895169,-107.21427102951853,-160.82399735655648,-321.6511036718155,-8.165619676597685e15],"x":[-3.141592653589793,-3.1384837048974727,-3.1353747562051524,-3.132265807512832,-3.129156858820511,-3.126047910128191,-3.1229389614358705,-3.11983001274355,-3.1167210640512297,-3.1136121153589094,-3.110503166666589,-3.107394217974268,-3.104285269281948,-3.1011763205896274,-3.098067371897307,-3.0949584232049867,-3.0918494745126663,-3.088740525820346,-3.0856315771280256,-3.082522628435705,-3.0794136797433844,-3.076304731051064,-3.0731957823587437,-3.0700868336664233,-3.066977884974103,-3.0638689362817826,-3.0607599875894618,-3.0576510388971414,-3.054542090204821,-3.0514331415125007,-3.0483241928201803,-3.04521524412786,-3.0421062954355396,-3.0389973467432188,-3.0358883980508984,-3.032779449358578,-3.0296705006662576,-3.0265615519739373,-3.023452603281617,-3.0203436545892965,-3.017234705896976,-3.0141257572046554,-3.011016808512335,-3.0079078598200146,-3.0047989111276943,-3.001689962435374,-2.9985810137430535,-2.995472065050733,-2.9923631163584123,-2.989254167666092,-2.9861452189737716,-2.9830362702814512,-2.979927321589131,-2.9768183728968105,-2.97370942420449,-2.9706004755121693,-2.967491526819849,-2.9643825781275286,-2.961273629435208,-2.958164680742888,-2.9550557320505675,-2.951946783358247,-2.9488378346659267,-2.945728885973606,-2.9426199372812856,-2.939510988588965,-2.936402039896645,-2.9332930912043245,-2.930184142512004,-2.9270751938196837,-2.923966245127363,-2.9208572964350425,-2.917748347742722,-2.914639399050402,-2.9115304503580814,-2.908421501665761,-2.9053125529734407,-2.90220360428112,-2.8990946555887995,-2.895985706896479,-2.892876758204159,-2.8897678095118384,-2.886658860819518,-2.8835499121271977,-2.8804409634348773,-2.8773320147425565,-2.874223066050236,-2.8711141173579158,-2.8680051686655954,-2.864896219973275,-2.8617872712809547,-2.8586783225886343,-2.8555693738963135,-2.852460425203993,-2.8493514765116728,-2.8462425278193524,-2.843133579127032,-2.8400246304347116,-2.8369156817423913,-2.8338067330500705,-2.83069778435775,-2.8275888356654297,-2.8244798869731094,-2.821370938280789,-2.8182619895884686,-2.8151530408961483,-2.812044092203828,-2.808935143511507,-2.8058261948191867,-2.8027172461268663,-2.799608297434546,-2.7964993487422256,-2.7933904000499052,-2.790281451357585,-2.787172502665264,-2.7840635539729437,-2.7809546052806233,-2.777845656588303,-2.7747367078959826,-2.7716277592036622,-2.768518810511342,-2.765409861819021,-2.7623009131267007,-2.7591919644343803,-2.75608301574206,-2.7529740670497396,-2.749865118357419,-2.746756169665099,-2.7436472209727785,-2.7405382722804577,-2.7374293235881373,-2.734320374895817,-2.7312114262034966,-2.728102477511176,-2.724993528818856,-2.7218845801265354,-2.7187756314342146,-2.7156666827418943,-2.712557734049574,-2.7094487853572535,-2.706339836664933,-2.703230887972613,-2.7001219392802924,-2.6970129905879716,-2.6939040418956512,-2.690795093203331,-2.6876861445110105,-2.68457719581869,-2.6814682471263698,-2.6783592984340494,-2.675250349741729,-2.6721414010494082,-2.669032452357088,-2.6659235036647675,-2.662814554972447,-2.6597056062801268,-2.6565966575878064,-2.653487708895486,-2.650378760203165,-2.647269811510845,-2.6441608628185245,-2.641051914126204,-2.6379429654338837,-2.6348340167415634,-2.631725068049243,-2.628616119356922,-2.625507170664602,-2.6223982219722815,-2.619289273279961,-2.6161803245876407,-2.6130713758953203,-2.609962427203,-2.6068534785106796,-2.603744529818359,-2.6006355811260384,-2.597526632433718,-2.5944176837413977,-2.5913087350490773,-2.588199786356757,-2.5850908376644366,-2.581981888972116,-2.5788729402797954,-2.575763991587475,-2.5726550428951547,-2.5695460942028343,-2.566437145510514,-2.5633281968181936,-2.5602192481258728,-2.5571102994335524,-2.554001350741232,-2.5508924020489117,-2.5477834533565913,-2.544674504664271,-2.5415655559719506,-2.53845660727963,-2.5353476585873094,-2.532238709894989,-2.5291297612026686,-2.5260208125103483,-2.522911863818028,-2.5198029151257075,-2.516693966433387,-2.5135850177410664,-2.510476069048746,-2.5073671203564256,-2.5042581716641052,-2.501149222971785,-2.4980402742794645,-2.494931325587144,-2.4918223768948233,-2.488713428202503,-2.4856044795101826,-2.4824955308178622,-2.479386582125542,-2.4762776334332215,-2.473168684740901,-2.4700597360485808,-2.46695078735626,-2.4638418386639396,-2.460732889971619,-2.457623941279299,-2.4545149925869785,-2.451406043894658,-2.4482970952023377,-2.445188146510017,-2.4420791978176966,-2.438970249125376,-2.435861300433056,-2.4327523517407355,-2.429643403048415,-2.4265344543560947,-2.423425505663774,-2.4203165569714535,-2.417207608279133,-2.414098659586813,-2.4109897108944924,-2.407880762202172,-2.4047718135098517,-2.401662864817531,-2.3985539161252105,-2.39544496743289,-2.39233601874057,-2.3892270700482494,-2.386118121355929,-2.3830091726636087,-2.3799002239712883,-2.3767912752789675,-2.373682326586647,-2.3705733778943268,-2.3674644292020064,-2.364355480509686,-2.3612465318173657,-2.3581375831250453,-2.3550286344327245,-2.351919685740404,-2.3488107370480837,-2.3457017883557634,-2.342592839663443,-2.3394838909711226,-2.3363749422788023,-2.3332659935864815,-2.330157044894161,-2.3270480962018407,-2.3239391475095204,-2.3208301988172,-2.3177212501248796,-2.3146123014325592,-2.311503352740239,-2.308394404047918,-2.3052854553555977,-2.3021765066632773,-2.299067557970957,-2.2959586092786366,-2.2928496605863162,-2.289740711893996,-2.286631763201675,-2.2835228145093547,-2.2804138658170343,-2.277304917124714,-2.2741959684323936,-2.271087019740073,-2.267978071047753,-2.264869122355432,-2.2617601736631117,-2.2586512249707913,-2.255542276278471,-2.2524333275861506,-2.24932437889383,-2.24621543020151,-2.2431064815091895,-2.2399975328168686,-2.2368885841245483,-2.233779635432228,-2.2306706867399075,-2.227561738047587,-2.224452789355267,-2.2213438406629464,-2.2182348919706256,-2.2151259432783053,-2.212016994585985,-2.2089080458936645,-2.205799097201344,-2.202690148509024,-2.1995811998167034,-2.1964722511243826,-2.1933633024320622,-2.190254353739742,-2.1871454050474215,-2.184036456355101,-2.1809275076627808,-2.1778185589704604,-2.17470961027814,-2.171600661585819,-2.168491712893499,-2.1653827642011785,-2.162273815508858,-2.1591648668165377,-2.1560559181242174,-2.152946969431897,-2.149838020739576,-2.146729072047256,-2.1436201233549355,-2.140511174662615,-2.1374022259702947,-2.1342932772779744,-2.131184328585654,-2.128075379893333,-2.124966431201013,-2.1218574825086924,-2.118748533816372,-2.1156395851240517,-2.1125306364317313,-2.109421687739411,-2.1063127390470906,-2.10320379035477,-2.1000948416624494,-2.096985892970129,-2.0938769442778087,-2.0907679955854883,-2.087659046893168,-2.0845500982008476,-2.0814411495085268,-2.0783322008162064,-2.075223252123886,-2.0721143034315657,-2.0690053547392453,-2.065896406046925,-2.0627874573546046,-2.0596785086622837,-2.0565695599699634,-2.053460611277643,-2.0503516625853226,-2.0472427138930023,-2.044133765200682,-2.0410248165083615,-2.037915867816041,-2.0348069191237204,-2.0316979704314,-2.0285890217390796,-2.0254800730467593,-2.022371124354439,-2.0192621756621185,-2.016153226969798,-2.0130442782774773,-2.009935329585157,-2.0068263808928366,-2.0037174322005162,-2.000608483508196,-1.9974995348158753,-1.994390586123555,-1.9912816374312345,-1.9881726887389142,-1.9850637400465936,-1.9819547913542732,-1.9788458426619528,-1.9757368939696325,-1.972627945277312,-1.9695189965849915,-1.9664100478926712,-1.9633010992003506,-1.9601921505080302,-1.9570832018157098,-1.9539742531233895,-1.9508653044310689,-1.9477563557387485,-1.9446474070464281,-1.9415384583541078,-1.9384295096617872,-1.9353205609694668,-1.9322116122771464,-1.9291026635848258,-1.9259937148925055,-1.9228847662001851,-1.9197758175078647,-1.9166668688155442,-1.9135579201232238,-1.9104489714309034,-1.907340022738583,-1.9042310740462625,-1.901122125353942,-1.8980131766616217,-1.8949042279693011,-1.8917952792769808,-1.8886863305846604,-1.88557738189234,-1.8824684332000194,-1.879359484507699,-1.8762505358153787,-1.8731415871230583,-1.8700326384307377,-1.8669236897384174,-1.863814741046097,-1.8607057923537764,-1.857596843661456,-1.8544878949691357,-1.8513789462768153,-1.8482699975844947,-1.8451610488921744,-1.842052100199854,-1.8389431515075336,-1.835834202815213,-1.8327252541228927,-1.8296163054305723,-1.8265073567382517,-1.8233984080459313,-1.820289459353611,-1.8171805106612906,-1.81407156196897,-1.8109626132766496,-1.8078536645843293,-1.804744715892009,-1.8016357671996883,-1.798526818507368,-1.7954178698150476,-1.792308921122727,-1.7891999724304066,-1.7860910237380863,-1.782982075045766,-1.7798731263534453,-1.776764177661125,-1.7736552289688046,-1.7705462802764842,-1.7674373315841636,-1.7643283828918432,-1.7612194341995229,-1.7581104855072023,-1.755001536814882,-1.7518925881225615,-1.7487836394302412,-1.7456746907379206,-1.7425657420456002,-1.7394567933532799,-1.7363478446609595,-1.733238895968639,-1.7301299472763185,-1.7270209985839982,-1.7239120498916776,-1.7208031011993572,-1.7176941525070368,-1.7145852038147165,-1.7114762551223959,-1.7083673064300755,-1.7052583577377551,-1.7021494090454348,-1.6990404603531142,-1.6959315116607938,-1.6928225629684734,-1.6897136142761529,-1.6866046655838325,-1.6834957168915121,-1.6803867681991917,-1.6772778195068712,-1.6741688708145508,-1.6710599221222304,-1.66795097342991,-1.6648420247375895,-1.661733076045269,-1.6586241273529487,-1.6555151786606281,-1.6524062299683078,-1.6492972812759874,-1.646188332583667,-1.6430793838913464,-1.639970435199026,-1.6368614865067057,-1.6337525378143853,-1.6306435891220648,-1.6275346404297444,-1.624425691737424,-1.6213167430451034,-1.618207794352783,-1.6150988456604627,-1.6119898969681423,-1.6088809482758217,-1.6057719995835014,-1.602663050891181,-1.5995541021988606,-1.59644515350654,-1.5933362048142197,-1.5902272561218993,-1.5871183074295787,-1.5840093587372583,-1.580900410044938,-1.5777914613526176,-1.574682512660297,-1.5715735639679766,-1.5684646152756563,-1.565355666583336,-1.5622467178910153,-1.559137769198695,-1.5560288205063746,-1.552919871814054,-1.5498109231217336,-1.5467019744294133,-1.543593025737093,-1.5404840770447723,-1.537375128352452,-1.5342661796601316,-1.5311572309678112,-1.5280482822754906,-1.5249393335831702,-1.5218303848908499,-1.5187214361985293,-1.515612487506209,-1.5125035388138885,-1.5093945901215682,-1.5062856414292476,-1.5031766927369272,-1.5000677440446069,-1.4969587953522865,-1.493849846659966,-1.4907408979676455,-1.4876319492753252,-1.4845230005830046,-1.4814140518906842,-1.4783051031983638,-1.4751961545060435,-1.4720872058137229,-1.4689782571214025,-1.4658693084290821,-1.4627603597367618,-1.4596514110444412,-1.4565424623521208,-1.4534335136598004,-1.4503245649674799,-1.4472156162751595,-1.4441066675828391,-1.4409977188905188,-1.4378887701981982,-1.4347798215058778,-1.4316708728135574,-1.428561924121237,-1.4254529754289165,-1.422344026736596,-1.4192350780442757,-1.4161261293519551,-1.4130171806596348,-1.4099082319673144,-1.406799283274994,-1.4036903345826734,-1.400581385890353,-1.3974724371980327,-1.3943634885057121,-1.3912545398133918,-1.3881455911210714,-1.385036642428751,-1.3819276937364304,-1.37881874504411,-1.3757097963517897,-1.3726008476594693,-1.3694918989671487,-1.3663829502748284,-1.363274001582508,-1.3601650528901874,-1.357056104197867,-1.3539471555055467,-1.3508382068132263,-1.3477292581209057,-1.3446203094285853,-1.341511360736265,-1.3384024120439446,-1.335293463351624,-1.3321845146593037,-1.3290755659669833,-1.3259666172746627,-1.3228576685823423,-1.319748719890022,-1.3166397711977016,-1.313530822505381,-1.3104218738130606,-1.3073129251207403,-1.30420397642842,-1.3010950277360993,-1.297986079043779,-1.2948771303514586,-1.291768181659138,-1.2886592329668176,-1.2855502842744972,-1.2824413355821769,-1.2793323868898563,-1.276223438197536,-1.2731144895052156,-1.2700055408128952,-1.2668965921205746,-1.2637876434282542,-1.2606786947359339,-1.2575697460436133,-1.254460797351293,-1.2513518486589725,-1.2482428999666522,-1.2451339512743316,-1.2420250025820112,-1.2389160538896908,-1.2358071051973705,-1.2326981565050499,-1.2295892078127295,-1.2264802591204091,-1.2233713104280886,-1.2202623617357682,-1.2171534130434478,-1.2140444643511275,-1.2109355156588069,-1.2078265669664865,-1.2047176182741661,-1.2016086695818458,-1.1984997208895252,-1.1953907721972048,-1.1922818235048844,-1.1891728748125638,-1.1860639261202435,-1.182954977427923,-1.1798460287356027,-1.1767370800432821,-1.1736281313509618,-1.1705191826586414,-1.167410233966321,-1.1643012852740005,-1.16119233658168,-1.1580833878893597,-1.1549744391970391,-1.1518654905047188,-1.1487565418123984,-1.145647593120078,-1.1425386444277574,-1.139429695735437,-1.1363207470431167,-1.1332117983507963,-1.1301028496584757,-1.1269939009661554,-1.123884952273835,-1.1207760035815144,-1.117667054889194,-1.1145581061968737,-1.1114491575045533,-1.1083402088122327,-1.1052312601199124,-1.102122311427592,-1.0990133627352716,-1.095904414042951,-1.0927954653506307,-1.0896865166583103,-1.0865775679659897,-1.0834686192736693,-1.080359670581349,-1.0772507218890286,-1.074141773196708,-1.0710328245043876,-1.0679238758120673,-1.064814927119747,-1.0617059784274263,-1.058597029735106,-1.0554880810427856,-1.052379132350465,-1.0492701836581446,-1.0461612349658242,-1.0430522862735039,-1.0399433375811833,-1.036834388888863,-1.0337254401965426,-1.0306164915042222,-1.0275075428119016,-1.0243985941195812,-1.0212896454272609,-1.0181806967349403,-1.01507174804262,-1.0119627993502995,-1.0088538506579792,-1.0057449019656586,-1.0026359532733382,-0.9995270045810178,-0.9964180558886974,-0.993309107196377,-0.9902001585040565,-0.987091209811736,-0.9839822611194157,-0.9808733124270952,-0.9777643637347748,-0.9746554150424543,-0.971546466350134,-0.9684375176578135,-0.9653285689654931,-0.9622196202731726,-0.9591106715808523,-0.9560017228885318,-0.9528927741962113,-0.949783825503891,-0.9466748768115705,-0.9435659281192501,-0.9404569794269296,-0.9373480307346093,-0.9342390820422888,-0.9311301333499684,-0.9280211846576479,-0.9249122359653276,-0.9218032872730071,-0.9186943385806866,-0.9155853898883662,-0.9124764411960458,-0.9093674925037254,-0.9062585438114049,-0.9031495951190845,-0.9000406464267641,-0.8969316977344437,-0.8938227490421232,-0.8907138003498029,-0.8876048516574824,-0.8844959029651619,-0.8813869542728415,-0.878278005580521,-0.8751690568882007,-0.8720601081958802,-0.8689511595035598,-0.8658422108112394,-0.862733262118919,-0.8596243134265985,-0.856515364734278,-0.8534064160419577,-0.8502974673496372,-0.8471885186573168,-0.8440795699649963,-0.840970621272676,-0.8378616725803555,-0.8347527238880351,-0.8316437751957146,-0.8285348265033943,-0.8254258778110738,-0.8223169291187533,-0.819207980426433,-0.8160990317341125,-0.8129900830417921,-0.8098811343494716,-0.8067721856571513,-0.8036632369648308,-0.8005542882725104,-0.7974453395801899,-0.7943363908878696,-0.7912274421955491,-0.7881184935032286,-0.7850095448109082,-0.7819005961185878,-0.7787916474262674,-0.7756826987339469,-0.7725737500416265,-0.7694648013493061,-0.7663558526569857,-0.7632469039646652,-0.7601379552723448,-0.7570290065800244,-0.7539200578877039,-0.7508111091953835,-0.747702160503063,-0.7445932118107427,-0.7414842631184222,-0.7383753144261018,-0.7352663657337813,-0.732157417041461,-0.7290484683491405,-0.7259395196568201,-0.7228305709644997,-0.7197216222721792,-0.7166126735798588,-0.7135037248875383,-0.710394776195218,-0.7072858275028975,-0.7041768788105771,-0.7010679301182566,-0.6979589814259363,-0.6948500327336158,-0.6917410840412954,-0.6886321353489749,-0.6855231866566545,-0.6824142379643341,-0.6793052892720136,-0.6761963405796932,-0.6730873918873728,-0.6699784431950524,-0.6668694945027319,-0.6637605458104116,-0.6606515971180911,-0.6575426484257707,-0.6544336997334502,-0.6513247510411297,-0.6482158023488094,-0.6451068536564889,-0.6419979049641685,-0.638888956271848,-0.6357800075795277,-0.6326710588872072,-0.6295621101948868,-0.6264531615025664,-0.623344212810246,-0.6202352641179255,-0.617126315425605,-0.6140173667332847,-0.6109084180409642,-0.6077994693486438,-0.6046905206563233,-0.601581571964003,-0.5984726232716825,-0.5953636745793621,-0.5922547258870416,-0.5891457771947213,-0.5860368285024008,-0.5829278798100803,-0.57981893111776,-0.5767099824254395,-0.5736010337331191,-0.5704920850407986,-0.5673831363484783,-0.5642741876561578,-0.5611652389638374,-0.5580562902715169,-0.5549473415791966,-0.5518383928868761,-0.5487294441945556,-0.5456204955022352,-0.5425115468099148,-0.5394025981175944,-0.5362936494252739,-0.5331847007329535,-0.5300757520406331,-0.5269668033483127,-0.5238578546559922,-0.5207489059636717,-0.5176399572713514,-0.5145310085790309,-0.5114220598867105,-0.50831311119439,-0.5052041625020697,-0.5020952138097492,-0.4989862651174288,-0.49587731642510835,-0.4927683677327879,-0.4896594190404675,-0.4865504703481471,-0.48344152165582666,-0.48033257296350623,-0.4772236242711858,-0.4741146755788654,-0.47100572688654496,-0.4678967781942245,-0.46478782950190406,-0.46167888080958364,-0.4585699321172632,-0.4554609834249428,-0.45235203473262237,-0.44924308604030194,-0.4461341373479815,-0.4430251886556611,-0.43991623996334067,-0.43680729127102025,-0.43369834257869977,-0.43058939388637935,-0.4274804451940589,-0.4243714965017385,-0.4212625478094181,-0.41815359911709765,-0.41504465042477723,-0.4119357017324568,-0.4088267530401364,-0.40571780434781596,-0.4026088556554955,-0.39949990696317506,-0.39639095827085463,-0.3932820095785342,-0.3901730608862138,-0.38706411219389336,-0.38395516350157294,-0.3808462148092525,-0.3777372661169321,-0.37462831742461167,-0.37151936873229124,-0.36841042003997077,-0.36530147134765034,-0.3621925226553299,-0.3590835739630095,-0.35597462527068907,-0.35286567657836865,-0.3497567278860482,-0.3466477791937278,-0.3435388305014074,-0.34042988180908695,-0.33732093311676653,-0.33421198442444605,-0.33110303573212563,-0.3279940870398052,-0.3248851383474848,-0.32177618965516436,-0.31866724096284393,-0.3155582922705235,-0.3124493435782031,-0.30934039488588266,-0.30623144619356224,-0.3031224975012418,-0.30001354880892134,-0.2969046001166009,-0.2937956514242805,-0.29068670273196007,-0.28757775403963964,-0.2844688053473192,-0.2813598566549988,-0.2782509079626784,-0.27514195927035795,-0.2720330105780375,-0.2689240618857171,-0.2658151131933966,-0.2627061645010762,-0.2595972158087558,-0.25648826711643535,-0.25337931842411493,-0.2502703697317945,-0.24716142103947408,-0.24405247234715366,-0.2409435236548332,-0.23783457496251278,-0.23472562627019236,-0.23161667757787194,-0.22850772888555151,-0.22539878019323106,-0.22228983150091064,-0.21918088280859022,-0.2160719341162698,-0.21296298542394937,-0.20985403673162892,-0.2067450880393085,-0.20363613934698807,-0.20052719065466765,-0.19741824196234722,-0.1943092932700268,-0.19120034457770635,-0.18809139588538593,-0.1849824471930655,-0.18187349850074508,-0.17876454980842466,-0.1756556011161042,-0.17254665242378378,-0.16943770373146336,-0.16632875503914293,-0.1632198063468225,-0.1601108576545021,-0.15700190896218164,-0.1538929602698612,-0.1507840115775408,-0.14767506288522037,-0.14456611419289994,-0.1414571655005795,-0.13834821680825907,-0.13523926811593864,-0.13213031942361822,-0.1290213707312978,-0.12591242203897735,-0.12280347334665694,-0.1196945246543365,-0.11658557596201607,-0.11347662726969565,-0.11036767857737521,-0.10725872988505479,-0.10414978119273435,-0.10104083250041393,-0.0979318838080935,-0.09482293511577307,-0.09171398642345265,-0.08860503773113222,-0.08549608903881178,-0.08238714034649136,-0.07927819165417092,-0.0761692429618505,-0.07306029426953008,-0.06995134557720964,-0.06684239688488922,-0.06373344819256879,-0.060624499500248355,-0.05751555080792793,-0.0544066021156075,-0.05129765342328707,-0.04818870473096664,-0.04507975603864622,-0.041970807346325786,-0.038861858654005356,-0.03575290996168493,-0.0326439612693645,-0.02953501257704407,-0.026426063884723645,-0.023317115192403214,-0.020208166500082787,-0.017099217807762357,-0.013990269115441928,-0.0108813204231215,-0.007772371730801072,-0.004663423038480643,-0.0015544743461602143,0.0015544743461602143,0.004663423038480643,0.007772371730801072,0.0108813204231215,0.013990269115441928,0.017099217807762357,0.020208166500082787,0.023317115192403214,0.026426063884723645,0.02953501257704407,0.0326439612693645,0.03575290996168493,0.038861858654005356,0.041970807346325786,0.04507975603864622,0.04818870473096664,0.05129765342328707,0.0544066021156075,0.05751555080792793,0.060624499500248355,0.06373344819256879,0.06684239688488922,0.06995134557720964,0.07306029426953008,0.0761692429618505,0.07927819165417092,0.08238714034649136,0.08549608903881178,0.08860503773113222,0.09171398642345265,0.09482293511577307,0.0979318838080935,0.10104083250041393,0.10414978119273435,0.10725872988505479,0.11036767857737521,0.11347662726969565,0.11658557596201607,0.1196945246543365,0.12280347334665694,0.12591242203897735,0.1290213707312978,0.13213031942361822,0.13523926811593864,0.13834821680825907,0.1414571655005795,0.14456611419289994,0.14767506288522037,0.1507840115775408,0.1538929602698612,0.15700190896218164,0.1601108576545021,0.1632198063468225,0.16632875503914293,0.16943770373146336,0.17254665242378378,0.1756556011161042,0.17876454980842466,0.18187349850074508,0.1849824471930655,0.18809139588538593,0.19120034457770635,0.1943092932700268,0.19741824196234722,0.20052719065466765,0.20363613934698807,0.2067450880393085,0.20985403673162892,0.21296298542394937,0.2160719341162698,0.21918088280859022,0.22228983150091064,0.22539878019323106,0.22850772888555151,0.23161667757787194,0.23472562627019236,0.23783457496251278,0.2409435236548332,0.24405247234715366,0.24716142103947408,0.2502703697317945,0.25337931842411493,0.25648826711643535,0.2595972158087558,0.2627061645010762,0.2658151131933966,0.2689240618857171,0.2720330105780375,0.27514195927035795,0.2782509079626784,0.2813598566549988,0.2844688053473192,0.28757775403963964,0.29068670273196007,0.2937956514242805,0.2969046001166009,0.30001354880892134,0.3031224975012418,0.30623144619356224,0.30934039488588266,0.3124493435782031,0.3155582922705235,0.31866724096284393,0.32177618965516436,0.3248851383474848,0.3279940870398052,0.33110303573212563,0.33421198442444605,0.33732093311676653,0.34042988180908695,0.3435388305014074,0.3466477791937278,0.3497567278860482,0.35286567657836865,0.35597462527068907,0.3590835739630095,0.3621925226553299,0.36530147134765034,0.36841042003997077,0.37151936873229124,0.37462831742461167,0.3777372661169321,0.3808462148092525,0.38395516350157294,0.38706411219389336,0.3901730608862138,0.3932820095785342,0.39639095827085463,0.39949990696317506,0.4026088556554955,0.40571780434781596,0.4088267530401364,0.4119357017324568,0.41504465042477723,0.41815359911709765,0.4212625478094181,0.4243714965017385,0.4274804451940589,0.43058939388637935,0.43369834257869977,0.43680729127102025,0.43991623996334067,0.4430251886556611,0.4461341373479815,0.44924308604030194,0.45235203473262237,0.4554609834249428,0.4585699321172632,0.46167888080958364,0.46478782950190406,0.4678967781942245,0.47100572688654496,0.4741146755788654,0.4772236242711858,0.48033257296350623,0.48344152165582666,0.4865504703481471,0.4896594190404675,0.4927683677327879,0.49587731642510835,0.4989862651174288,0.5020952138097492,0.5052041625020697,0.50831311119439,0.5114220598867105,0.5145310085790309,0.5176399572713514,0.5207489059636717,0.5238578546559922,0.5269668033483127,0.5300757520406331,0.5331847007329535,0.5362936494252739,0.5394025981175944,0.5425115468099148,0.5456204955022352,0.5487294441945556,0.5518383928868761,0.5549473415791966,0.5580562902715169,0.5611652389638374,0.5642741876561578,0.5673831363484783,0.5704920850407986,0.5736010337331191,0.5767099824254395,0.57981893111776,0.5829278798100803,0.5860368285024008,0.5891457771947213,0.5922547258870416,0.5953636745793621,0.5984726232716825,0.601581571964003,0.6046905206563233,0.6077994693486438,0.6109084180409642,0.6140173667332847,0.617126315425605,0.6202352641179255,0.623344212810246,0.6264531615025664,0.6295621101948868,0.6326710588872072,0.6357800075795277,0.638888956271848,0.6419979049641685,0.6451068536564889,0.6482158023488094,0.6513247510411297,0.6544336997334502,0.6575426484257707,0.6606515971180911,0.6637605458104116,0.6668694945027319,0.6699784431950524,0.6730873918873728,0.6761963405796932,0.6793052892720136,0.6824142379643341,0.6855231866566545,0.6886321353489749,0.6917410840412954,0.6948500327336158,0.6979589814259363,0.7010679301182566,0.7041768788105771,0.7072858275028975,0.710394776195218,0.7135037248875383,0.7166126735798588,0.7197216222721792,0.7228305709644997,0.7259395196568201,0.7290484683491405,0.732157417041461,0.7352663657337813,0.7383753144261018,0.7414842631184222,0.7445932118107427,0.747702160503063,0.7508111091953835,0.7539200578877039,0.7570290065800244,0.7601379552723448,0.7632469039646652,0.7663558526569857,0.7694648013493061,0.7725737500416265,0.7756826987339469,0.7787916474262674,0.7819005961185878,0.7850095448109082,0.7881184935032286,0.7912274421955491,0.7943363908878696,0.7974453395801899,0.8005542882725104,0.8036632369648308,0.8067721856571513,0.8098811343494716,0.8129900830417921,0.8160990317341125,0.819207980426433,0.8223169291187533,0.8254258778110738,0.8285348265033943,0.8316437751957146,0.8347527238880351,0.8378616725803555,0.840970621272676,0.8440795699649963,0.8471885186573168,0.8502974673496372,0.8534064160419577,0.856515364734278,0.8596243134265985,0.862733262118919,0.8658422108112394,0.8689511595035598,0.8720601081958802,0.8751690568882007,0.878278005580521,0.8813869542728415,0.8844959029651619,0.8876048516574824,0.8907138003498029,0.8938227490421232,0.8969316977344437,0.9000406464267641,0.9031495951190845,0.9062585438114049,0.9093674925037254,0.9124764411960458,0.9155853898883662,0.9186943385806866,0.9218032872730071,0.9249122359653276,0.9280211846576479,0.9311301333499684,0.9342390820422888,0.9373480307346093,0.9404569794269296,0.9435659281192501,0.9466748768115705,0.949783825503891,0.9528927741962113,0.9560017228885318,0.9591106715808523,0.9622196202731726,0.9653285689654931,0.9684375176578135,0.971546466350134,0.9746554150424543,0.9777643637347748,0.9808733124270952,0.9839822611194157,0.987091209811736,0.9902001585040565,0.993309107196377,0.9964180558886974,0.9995270045810178,1.0026359532733382,1.0057449019656586,1.0088538506579792,1.0119627993502995,1.01507174804262,1.0181806967349403,1.0212896454272609,1.0243985941195812,1.0275075428119016,1.0306164915042222,1.0337254401965426,1.036834388888863,1.0399433375811833,1.0430522862735039,1.0461612349658242,1.0492701836581446,1.052379132350465,1.0554880810427856,1.058597029735106,1.0617059784274263,1.064814927119747,1.0679238758120673,1.0710328245043876,1.074141773196708,1.0772507218890286,1.080359670581349,1.0834686192736693,1.0865775679659897,1.0896865166583103,1.0927954653506307,1.095904414042951,1.0990133627352716,1.102122311427592,1.1052312601199124,1.1083402088122327,1.1114491575045533,1.1145581061968737,1.117667054889194,1.1207760035815144,1.123884952273835,1.1269939009661554,1.1301028496584757,1.1332117983507963,1.1363207470431167,1.139429695735437,1.1425386444277574,1.145647593120078,1.1487565418123984,1.1518654905047188,1.1549744391970391,1.1580833878893597,1.16119233658168,1.1643012852740005,1.167410233966321,1.1705191826586414,1.1736281313509618,1.1767370800432821,1.1798460287356027,1.182954977427923,1.1860639261202435,1.1891728748125638,1.1922818235048844,1.1953907721972048,1.1984997208895252,1.2016086695818458,1.2047176182741661,1.2078265669664865,1.2109355156588069,1.2140444643511275,1.2171534130434478,1.2202623617357682,1.2233713104280886,1.2264802591204091,1.2295892078127295,1.2326981565050499,1.2358071051973705,1.2389160538896908,1.2420250025820112,1.2451339512743316,1.2482428999666522,1.2513518486589725,1.254460797351293,1.2575697460436133,1.2606786947359339,1.2637876434282542,1.2668965921205746,1.2700055408128952,1.2731144895052156,1.276223438197536,1.2793323868898563,1.2824413355821769,1.2855502842744972,1.2886592329668176,1.291768181659138,1.2948771303514586,1.297986079043779,1.3010950277360993,1.30420397642842,1.3073129251207403,1.3104218738130606,1.313530822505381,1.3166397711977016,1.319748719890022,1.3228576685823423,1.3259666172746627,1.3290755659669833,1.3321845146593037,1.335293463351624,1.3384024120439446,1.341511360736265,1.3446203094285853,1.3477292581209057,1.3508382068132263,1.3539471555055467,1.357056104197867,1.3601650528901874,1.363274001582508,1.3663829502748284,1.3694918989671487,1.3726008476594693,1.3757097963517897,1.37881874504411,1.3819276937364304,1.385036642428751,1.3881455911210714,1.3912545398133918,1.3943634885057121,1.3974724371980327,1.400581385890353,1.4036903345826734,1.406799283274994,1.4099082319673144,1.4130171806596348,1.4161261293519551,1.4192350780442757,1.422344026736596,1.4254529754289165,1.428561924121237,1.4316708728135574,1.4347798215058778,1.4378887701981982,1.4409977188905188,1.4441066675828391,1.4472156162751595,1.4503245649674799,1.4534335136598004,1.4565424623521208,1.4596514110444412,1.4627603597367618,1.4658693084290821,1.4689782571214025,1.4720872058137229,1.4751961545060435,1.4783051031983638,1.4814140518906842,1.4845230005830046,1.4876319492753252,1.4907408979676455,1.493849846659966,1.4969587953522865,1.5000677440446069,1.5031766927369272,1.5062856414292476,1.5093945901215682,1.5125035388138885,1.515612487506209,1.5187214361985293,1.5218303848908499,1.5249393335831702,1.5280482822754906,1.5311572309678112,1.5342661796601316,1.537375128352452,1.5404840770447723,1.543593025737093,1.5467019744294133,1.5498109231217336,1.552919871814054,1.5560288205063746,1.559137769198695,1.5622467178910153,1.565355666583336,1.5684646152756563,1.5715735639679766,1.574682512660297,1.5777914613526176,1.580900410044938,1.5840093587372583,1.5871183074295787,1.5902272561218993,1.5933362048142197,1.59644515350654,1.5995541021988606,1.602663050891181,1.6057719995835014,1.6088809482758217,1.6119898969681423,1.6150988456604627,1.618207794352783,1.6213167430451034,1.624425691737424,1.6275346404297444,1.6306435891220648,1.6337525378143853,1.6368614865067057,1.639970435199026,1.6430793838913464,1.646188332583667,1.6492972812759874,1.6524062299683078,1.6555151786606281,1.6586241273529487,1.661733076045269,1.6648420247375895,1.66795097342991,1.6710599221222304,1.6741688708145508,1.6772778195068712,1.6803867681991917,1.6834957168915121,1.6866046655838325,1.6897136142761529,1.6928225629684734,1.6959315116607938,1.6990404603531142,1.7021494090454348,1.7052583577377551,1.7083673064300755,1.7114762551223959,1.7145852038147165,1.7176941525070368,1.7208031011993572,1.7239120498916776,1.7270209985839982,1.7301299472763185,1.733238895968639,1.7363478446609595,1.7394567933532799,1.7425657420456002,1.7456746907379206,1.7487836394302412,1.7518925881225615,1.755001536814882,1.7581104855072023,1.7612194341995229,1.7643283828918432,1.7674373315841636,1.7705462802764842,1.7736552289688046,1.776764177661125,1.7798731263534453,1.782982075045766,1.7860910237380863,1.7891999724304066,1.792308921122727,1.7954178698150476,1.798526818507368,1.8016357671996883,1.804744715892009,1.8078536645843293,1.8109626132766496,1.81407156196897,1.8171805106612906,1.820289459353611,1.8233984080459313,1.8265073567382517,1.8296163054305723,1.8327252541228927,1.835834202815213,1.8389431515075336,1.842052100199854,1.8451610488921744,1.8482699975844947,1.8513789462768153,1.8544878949691357,1.857596843661456,1.8607057923537764,1.863814741046097,1.8669236897384174,1.8700326384307377,1.8731415871230583,1.8762505358153787,1.879359484507699,1.8824684332000194,1.88557738189234,1.8886863305846604,1.8917952792769808,1.8949042279693011,1.8980131766616217,1.901122125353942,1.9042310740462625,1.907340022738583,1.9104489714309034,1.9135579201232238,1.9166668688155442,1.9197758175078647,1.9228847662001851,1.9259937148925055,1.9291026635848258,1.9322116122771464,1.9353205609694668,1.9384295096617872,1.9415384583541078,1.9446474070464281,1.9477563557387485,1.9508653044310689,1.9539742531233895,1.9570832018157098,1.9601921505080302,1.9633010992003506,1.9664100478926712,1.9695189965849915,1.972627945277312,1.9757368939696325,1.9788458426619528,1.9819547913542732,1.9850637400465936,1.9881726887389142,1.9912816374312345,1.994390586123555,1.9974995348158753,2.000608483508196,2.0037174322005162,2.0068263808928366,2.009935329585157,2.0130442782774773,2.016153226969798,2.0192621756621185,2.022371124354439,2.0254800730467593,2.0285890217390796,2.0316979704314,2.0348069191237204,2.037915867816041,2.0410248165083615,2.044133765200682,2.0472427138930023,2.0503516625853226,2.053460611277643,2.0565695599699634,2.0596785086622837,2.0627874573546046,2.065896406046925,2.0690053547392453,2.0721143034315657,2.075223252123886,2.0783322008162064,2.0814411495085268,2.0845500982008476,2.087659046893168,2.0907679955854883,2.0938769442778087,2.096985892970129,2.1000948416624494,2.10320379035477,2.1063127390470906,2.109421687739411,2.1125306364317313,2.1156395851240517,2.118748533816372,2.1218574825086924,2.124966431201013,2.128075379893333,2.131184328585654,2.1342932772779744,2.1374022259702947,2.140511174662615,2.1436201233549355,2.146729072047256,2.149838020739576,2.152946969431897,2.1560559181242174,2.1591648668165377,2.162273815508858,2.1653827642011785,2.168491712893499,2.171600661585819,2.17470961027814,2.1778185589704604,2.1809275076627808,2.184036456355101,2.1871454050474215,2.190254353739742,2.1933633024320622,2.1964722511243826,2.1995811998167034,2.202690148509024,2.205799097201344,2.2089080458936645,2.212016994585985,2.2151259432783053,2.2182348919706256,2.2213438406629464,2.224452789355267,2.227561738047587,2.2306706867399075,2.233779635432228,2.2368885841245483,2.2399975328168686,2.2431064815091895,2.24621543020151,2.24932437889383,2.2524333275861506,2.255542276278471,2.2586512249707913,2.2617601736631117,2.264869122355432,2.267978071047753,2.271087019740073,2.2741959684323936,2.277304917124714,2.2804138658170343,2.2835228145093547,2.286631763201675,2.289740711893996,2.2928496605863162,2.2959586092786366,2.299067557970957,2.3021765066632773,2.3052854553555977,2.308394404047918,2.311503352740239,2.3146123014325592,2.3177212501248796,2.3208301988172,2.3239391475095204,2.3270480962018407,2.330157044894161,2.3332659935864815,2.3363749422788023,2.3394838909711226,2.342592839663443,2.3457017883557634,2.3488107370480837,2.351919685740404,2.3550286344327245,2.3581375831250453,2.3612465318173657,2.364355480509686,2.3674644292020064,2.3705733778943268,2.373682326586647,2.3767912752789675,2.3799002239712883,2.3830091726636087,2.386118121355929,2.3892270700482494,2.39233601874057,2.39544496743289,2.3985539161252105,2.401662864817531,2.4047718135098517,2.407880762202172,2.4109897108944924,2.414098659586813,2.417207608279133,2.4203165569714535,2.423425505663774,2.4265344543560947,2.429643403048415,2.4327523517407355,2.435861300433056,2.438970249125376,2.4420791978176966,2.445188146510017,2.4482970952023377,2.451406043894658,2.4545149925869785,2.457623941279299,2.460732889971619,2.4638418386639396,2.46695078735626,2.4700597360485808,2.473168684740901,2.4762776334332215,2.479386582125542,2.4824955308178622,2.4856044795101826,2.488713428202503,2.4918223768948233,2.494931325587144,2.4980402742794645,2.501149222971785,2.5042581716641052,2.5073671203564256,2.510476069048746,2.5135850177410664,2.516693966433387,2.5198029151257075,2.522911863818028,2.5260208125103483,2.5291297612026686,2.532238709894989,2.5353476585873094,2.53845660727963,2.5415655559719506,2.544674504664271,2.5477834533565913,2.5508924020489117,2.554001350741232,2.5571102994335524,2.5602192481258728,2.5633281968181936,2.566437145510514,2.5695460942028343,2.5726550428951547,2.575763991587475,2.5788729402797954,2.581981888972116,2.5850908376644366,2.588199786356757,2.5913087350490773,2.5944176837413977,2.597526632433718,2.6006355811260384,2.603744529818359,2.6068534785106796,2.609962427203,2.6130713758953203,2.6161803245876407,2.619289273279961,2.6223982219722815,2.625507170664602,2.628616119356922,2.631725068049243,2.6348340167415634,2.6379429654338837,2.641051914126204,2.6441608628185245,2.647269811510845,2.650378760203165,2.653487708895486,2.6565966575878064,2.6597056062801268,2.662814554972447,2.6659235036647675,2.669032452357088,2.6721414010494082,2.675250349741729,2.6783592984340494,2.6814682471263698,2.68457719581869,2.6876861445110105,2.690795093203331,2.6939040418956512,2.6970129905879716,2.7001219392802924,2.703230887972613,2.706339836664933,2.7094487853572535,2.712557734049574,2.7156666827418943,2.7187756314342146,2.7218845801265354,2.724993528818856,2.728102477511176,2.7312114262034966,2.734320374895817,2.7374293235881373,2.7405382722804577,2.7436472209727785,2.746756169665099,2.749865118357419,2.7529740670497396,2.75608301574206,2.7591919644343803,2.7623009131267007,2.765409861819021,2.768518810511342,2.7716277592036622,2.7747367078959826,2.777845656588303,2.7809546052806233,2.7840635539729437,2.787172502665264,2.790281451357585,2.7933904000499052,2.7964993487422256,2.799608297434546,2.8027172461268663,2.8058261948191867,2.808935143511507,2.812044092203828,2.8151530408961483,2.8182619895884686,2.821370938280789,2.8244798869731094,2.8275888356654297,2.83069778435775,2.8338067330500705,2.8369156817423913,2.8400246304347116,2.843133579127032,2.8462425278193524,2.8493514765116728,2.852460425203993,2.8555693738963135,2.8586783225886343,2.8617872712809547,2.864896219973275,2.8680051686655954,2.8711141173579158,2.874223066050236,2.8773320147425565,2.8804409634348773,2.8835499121271977,2.886658860819518,2.8897678095118384,2.892876758204159,2.895985706896479,2.8990946555887995,2.90220360428112,2.9053125529734407,2.908421501665761,2.9115304503580814,2.914639399050402,2.917748347742722,2.9208572964350425,2.923966245127363,2.9270751938196837,2.930184142512004,2.9332930912043245,2.936402039896645,2.939510988588965,2.9426199372812856,2.945728885973606,2.9488378346659267,2.951946783358247,2.9550557320505675,2.958164680742888,2.961273629435208,2.9643825781275286,2.967491526819849,2.9706004755121693,2.97370942420449,2.9768183728968105,2.979927321589131,2.9830362702814512,2.9861452189737716,2.989254167666092,2.9923631163584123,2.995472065050733,2.9985810137430535,3.001689962435374,3.0047989111276943,3.0079078598200146,3.011016808512335,3.0141257572046554,3.017234705896976,3.0203436545892965,3.023452603281617,3.0265615519739373,3.0296705006662576,3.032779449358578,3.0358883980508984,3.0389973467432188,3.0421062954355396,3.04521524412786,3.0483241928201803,3.0514331415125007,3.054542090204821,3.0576510388971414,3.0607599875894618,3.0638689362817826,3.066977884974103,3.0700868336664233,3.0731957823587437,3.076304731051064,3.0794136797433844,3.082522628435705,3.0856315771280256,3.088740525820346,3.0918494745126663,3.0949584232049867,3.098067371897307,3.1011763205896274,3.104285269281948,3.107394217974268,3.110503166666589,3.1136121153589094,3.1167210640512297,3.11983001274355,3.1229389614358705,3.126047910128191,3.129156858820511,3.132265807512832,3.1353747562051524,3.1384837048974727,3.141592653589793]}
},{}],78:[function(require,module,exports){
module.exports={"expected":[-9.999999999999999e299,-1.0020080321083934e300,-1.0040241448288119e300,-1.0060483870359246e300,-1.008080807999347e300,-1.0101214573876395e300,-1.0121703852723524e300,-1.014227642132122e300,-1.0162932788568156e300,-1.0183673467517285e300,-1.0204498975418303e300,-1.0225409833760665e300,-1.0246406568317106e300,-1.0267489709187708e300,-1.0288659790844511e300,-1.0309917352176678e300,-1.0331262936536227e300,-1.0352697091784318e300,-1.0374220370338128e300,-1.0395833329218314e300,-1.0417536530097063e300,-1.0439330539346738e300,-1.0461215928089167e300,-1.0483193272245516e300,-1.0505263152586814e300,-1.0527426154785113e300,-1.054968286946529e300,-1.0572033892257523e300,-1.0594479823850415e300,-1.0617021270044815e300,-1.063965884180832e300,-1.0662393155330467e300,-1.0685224832078647e300,-1.070815449885474e300,-1.0731182787852468e300,-1.0754310336715498e300,-1.0777537788596299e300,-1.0800865792215757e300,-1.0824295001923574e300,-1.0847826077759451e300,-1.0871459685515067e300,-1.0895196496796875e300,-1.0919037189089726e300,-1.094298244582131e300,-1.0967032956427484e300,-1.0991189416418424e300,-1.1015452527445676e300,-1.1039822997370096e300,-1.1064301540330677e300,-1.1088888876814321e300,-1.1113585733726519e300,-1.1138392844462989e300,-1.1163310948982277e300,-1.1188340793879327e300,-1.1213483132460044e300,-1.1238738724816877e300,-1.1264108337905416e300,-1.1289592745622017e300,-1.1315192728882514e300,-1.1340909075701963e300,-1.1366742581275523e300,-1.1392694048060402e300,-1.141876428585896e300,-1.1444954111902932e300,-1.147126435093883e300,-1.149769583531451e300,-1.1524249405066963e300,-1.1550925908011295e300,-1.1577726199830964e300,-1.1604651144169282e300,-1.1631701612722165e300,-1.1658878485332234e300,-1.1686182650084188e300,-1.1713615003401551e300,-1.1741176450144774e300,-1.176886790371073e300,-1.1796690286133607e300,-1.182464452818726e300,-1.1852731569489e300,-1.1880952358604874e300,-1.1909307853156454e300,-1.1937799019929146e300,-1.1966426834982086e300,-1.1995192283759592e300,-1.2024096361204237e300,-1.2053140071871571e300,-1.2082324430046491e300,-1.2111650459861321e300,-1.2141119195415608e300,-1.217073168089768e300,-1.2200488970707969e300,-1.2230392129584176e300,-1.226044223272824e300,-1.2290640365935233e300,-1.2320987625724126e300,-1.2351485119470516e300,-1.2382133965541317e300,-1.2412935293431474e300,-1.2443890243902712e300,-1.2474999969124374e300,-1.2506265632816376e300,-1.2537688410394307e300,-1.256926948911674e300,-1.2601010068234746e300,-1.2632911359143727e300,-1.2664974585537503e300,-1.26972009835648e300,-1.2729591801988105e300,-1.2762148302344961e300,-1.2794871759111769e300,-1.2827763459870077e300,-1.2860824705475474e300,-1.2894056810229084e300,-1.2927461102051733e300,-1.296103892266082e300,-1.2994791627749972e300,-1.3028720587171499e300,-1.3062827185121707e300,-1.3097112820329153e300,-1.3131578906245845e300,-1.3166226871241499e300,-1.3201058158800845e300,-1.3236074227724109e300,-1.3271276552330664e300,-1.3306666622665957e300,-1.3342245944711745e300,-1.337801604059973e300,-1.341397844882862e300,-1.345013472448471e300,-1.3486486439466034e300,-1.3523035182710174e300,-1.3559782560425773e300,-1.3596730196327837e300,-1.3633879731876884e300,-1.367123282652205e300,-1.3708791157948165e300,-1.374655642232695e300,-1.3784530334572358e300,-1.382271462860015e300,-1.386111105759182e300,-1.3899721394262923e300,-1.3938547431135888e300,-1.3977590980817425e300,-1.4016853876280614e300,-1.4056337971151754e300,-1.4096045140002074e300,-1.41359772786444e300,-1.4176136304434886e300,-1.42165241565799e300,-1.4257142796448162e300,-1.4297994207888276e300,-1.433908039755169e300,-1.4380403395221287e300,-1.4421965254145646e300,-1.4463768051379122e300,-1.4505813888127874e300,-1.4548104890101912e300,-1.4590643207873362e300,-1.4633431017240994e300,-1.4676470519601212e300,-1.4719763942325597e300,-1.4763313539145165e300,-1.4807121590541434e300,-1.485119040414452e300,-1.4895522315138338e300,-1.494011968667306e300,-1.498498491028506e300,-1.5030120406324393e300,-1.5075528624390065e300,-1.5121212043773188e300,-1.5167173173908224e300,-1.5213414554832502e300,-1.5259938757654146e300,-1.5306748385028604e300,-1.5353846071644023e300,-1.5401234484715554e300,-1.5448916324488875e300,-1.5496894324753098e300,-1.5545171253363226e300,-1.559374991277246e300,-1.5642633140574485e300,-1.569182381005597e300,-1.5741324830759586e300,-1.5791139149057645e300,-1.584126974873671e300,-1.589171965159337e300,-1.5942491918041422e300,-1.5993589647730727e300,-1.604501598017804e300,-1.609677409540999e300,-1.6148867214618615e300,-1.620129860082961e300,-1.6254071559583657e300,-1.6307189439631124e300,-1.636065563364042e300,-1.6414473578920318e300,-1.6468646758156608e300,-1.652317870016337e300,-1.657807298064922e300,-1.663333322299889e300,-1.668896309907048e300,-1.6744966330008784e300,-1.6801346687075017e300,-1.685810799249338e300,-1.6915254120314852e300,-1.697278899729858e300,-1.7030716603811342e300,-1.7089040974745494e300,-1.714776620045583e300,-1.7206896427715814e300,-1.726643586069372e300,-1.7326388761949026e300,-1.738675945344972e300,-1.7447552317610886e300,-1.7508771798355188e300,-1.7570422402195743e300,-1.7632508699341984e300,-1.7695035324828983e300,-1.7758006979670976e300,-1.7821428432039543e300,-1.7885304518467132e300,-1.7949640145076602e300,-1.8014440288837337e300,-1.807970999884872e300,-1.814545439765157e300,-1.8211678682568333e300,-1.8278388127072684e300,-1.8345588082189393e300,-1.8413283977925139e300,-1.848148132473114e300,-1.8550185714998413e300,-1.861940282458649e300,-1.8689138414386514e300,-1.8759398331919555e300,-1.8830188512971163e300,-1.890151498326303e300,-1.897338386016279e300,-1.9045801354433018e300,-1.9118773772020377e300,-1.9192307515886097e300,-1.9266409087878833e300,-1.9341085090651105e300,-1.9416342229620433e300,-1.9492187314976505e300,-1.9568627263735487e300,-1.9645669101842954e300,-1.9723319966326612e300,-1.9801587107500316e300,-1.9880477891220774e300,-1.99599998011984e300,-2.004016044136385e300,-2.012096753829182e300,-2.0202428943683722e300,-2.02845526369109e300,-2.036734672762016e300,-2.045081945840332e300,-2.053497920753273e300,-2.061983449176457e300,-2.0705393969211963e300,-2.079166644228993e300,-2.0878660860734234e300,-2.096638632469635e300,-2.1054852087916827e300,-2.1144067560979246e300,-2.1234042314647354e300,-2.132478608328768e300,-2.1416308768380336e300,-2.1508620442120618e300,-2.1601731351114114e300,-2.1695651920168245e300,-2.179039275618314e300,-2.1885964652144893e300,-2.198237859122436e300,-2.2079645750984812e300,-2.2177777507701732e300,-2.227678544079839e300,-2.2376681337400716e300,-2.2477477197015262e300,-2.257918523633423e300,-2.2681817894171492e300,-2.2785387836533854e300,-2.2889907961831918e300,-2.2995391406235006e300,-2.3101851549174815e300,-2.320930201900271e300,-2.3317756698805576e300,-2.3427229732385552e300,-2.353773553040896e300,-2.3649288776730087e300,-2.3761904434895695e300,-2.3875597754836203e300,-2.399038427974991e300,-2.4106279853186774e300,-2.4223300626338492e300,-2.4341463065541944e300,-2.446078396000337e300,-2.4581280429750786e300,-2.4702969933822668e300,-2.482587027870103e300,-2.4949999626997504e300,-2.5075376506401356e300,-2.520201981889859e300,-2.532994885027185e300,-2.5459183279891195e300,-2.5589743190806055e300,-2.572164908014933e300,-2.5854921869864972e300,-2.598958291777073e300,-2.612565402896851e300,-2.6263157467614966e300,-2.6402115969065823e300,-2.6542552752407768e300,-2.668449153339244e300,-2.682795653778761e300,-2.697297251516144e300,-2.711956475311615e300,-2.726775909198842e300,-2.741758194003442e300,-2.756906028911817e300,-2.772222173092285e300,-2.7877094473705574e300,-2.803370735961685e300,-2.819208988260718e300,-2.835227220694409e300,-2.851428518636409e300,-2.867816038388494e300,-2.8843930092305134e300,-2.9011627355418477e300,-2.918128598997299e300,-2.935294060840485e300,-2.952662664237948e300,-2.970238036717334e300,-2.988023892693178e300,-3.0060240360839754e300,-3.0242423630244274e300,-3.042682864676905e300,-3.061349630146413e300,-3.080246849503507e300,-3.099378816919873e300,-3.1187499339214857e300,-3.138364712764528e300,-3.1582277799395145e300,-3.1783438798093245e300,-3.198717878387165e300,-3.219354767260772e300,-3.240259667669508e300,-3.26143783474134e300,-3.2828946618970755e300,-3.304635685429588e300,-3.326666589266224e300,-3.348993209922978e300,-3.371621541659516e300,-3.3945577418446037e300,-3.4178081365420357e300,-3.441379226327707e300,-3.465277692349057e300,-3.489510402638762e300,-3.514084418695201e300,-3.539007002342943e300,-3.564285622887247e300,-3.589927964577405e300,-3.6159419343945624e300,-3.6423356701806194e300,-3.66911754912576e300,-3.6962961966331986e300,-3.723880495580867e300,-3.7518795960009074e300,-3.780302925199154e300,-3.8091601983380946e300,-3.838461429508287e300,-3.868216943314708e300,-3.8984373870062287e300,-3.9291337431781296e300,-3.9603173430794945e300,-3.991999880559364e300,-4.0241934266876986e300,-4.0569104450895667e300,-4.090163808033463e300,-4.1239668133174004e300,-4.1583332019993094e300,-4.193277177021401e300,-4.2288134227815327e300,-4.264957125708237e300,-4.3017239958999746e300,-4.339130289893389e300,-4.3771928346298914e300,-4.4159290526948127e300,-4.4553569889086465e300,-4.4954953383556585e300,-4.536363475941328e300,-4.577981487576809e300,-4.620370203095856e300,-4.6635512310175626e300,-4.7075469952767954e300,-4.752380774053521e300,-4.798076740842278e300,-4.8446600079140424e300,-4.892156672334686e300,-4.940593864717192e300,-4.989999800899008e300,-5.0404038367513604e300,-5.0918365263442394e300,-5.144329683709223e300,-5.1979164484624656e300,-5.252631355572309e300,-5.308510409580136e300,-5.365591163609675e300,-5.423912803529074e300,-5.483516237662129e300,-5.544444192480258e300,-5.606741314745624e300,-5.670454280618555e300,-5.735631912289615e300,-5.802325302748796e300,-5.870587949361951e300,-5.940475896988392e300,-6.012047891444347e300,-6.085365544195434e300,-6.160493509248606e300,-6.237499673310954e300,-6.316455360390981e300,-6.397435552138414e300,-6.480519125353367e300,-6.565789108246212e300,-6.653332957198243e300,-6.743242855962404e300,-6.83561603945583e300,-6.930555144535133e300,-7.028168590414626e300,-7.128570991691863e300,-7.231883607288412e300,-7.338234829003057e300,-7.447760713816025e300,-7.560605564584513e300,-7.676922564340862e300,-7.796874470056188e300,-7.920634372476732e300,-8.048386529492755e300,-8.180327281478139e300,-8.316666058163933e300,-8.457626487905822e300,-8.603447621703378e300,-8.754385286063455e300,-8.910713580813194e300,-9.072726540310802e300,-9.240739979235317e300,-9.415093547333637e300,-9.596153021253769e300,-9.784312866005457e300,-9.97999910379608e300,-1.0183672534152522e301,-1.0395832356558252e301,-1.0617020255554647e301,-1.084782501868158e301,-1.1088887770143324e301,-1.1340907918156113e301,-1.1604649932158055e301,-1.1880951088191751e301,-1.217073034775744e301,-1.2474998568493914e301,-1.2794870285733247e301,-1.3131577354300746e301,-1.3486484802498384e301,-1.3861109328418438e301,-1.425714096705331e301,-1.4676468581012386e301,-1.5121209985913983e301,-1.559374772428744e301,-1.60967717634551e301,-1.6633330732989297e301,-1.7206893763020666e301,-1.78214255736102e301,-1.848147825064528e301,-1.9192304200784656e301,-1.9959996215584717e301,-2.079166255165012e301,-2.1695647683857263e301,-2.268181326398867e301,-2.3761899353243863e301,-2.494999402447643e301,-2.626315125983547e301,-2.7722214814230374e301,-2.9352932854050803e301,-3.118749058527628e301,-3.3266655932625686e301,-3.564284479515734e301,-3.8384601034679923e301,-4.1583316457437398e301,-4.536361623868661e301,-4.989997559891193e301,-5.544441425804113e301,-6.237496171736724e301,-7.128566418207602e301,-8.316659833144504e301,-9.979990139769741e301,-1.2474984562206604e302,-1.6633305832934357e302,-2.494993799940407e302,-4.989975149923753e302,-9.999999999999745e307],"x":[-1.0e-300,-9.97995992004008e-301,-9.959919840080161e-301,-9.93987976012024e-301,-9.91983968016032e-301,-9.899799600200401e-301,-9.879759520240481e-301,-9.859719440280562e-301,-9.839679360320642e-301,-9.819639280360721e-301,-9.799599200400802e-301,-9.779559120440882e-301,-9.759519040480962e-301,-9.739478960521043e-301,-9.719438880561122e-301,-9.699398800601202e-301,-9.679358720641283e-301,-9.659318640681363e-301,-9.639278560721444e-301,-9.619238480761524e-301,-9.599198400801603e-301,-9.579158320841683e-301,-9.559118240881764e-301,-9.539078160921844e-301,-9.519038080961925e-301,-9.498998001002004e-301,-9.478957921042084e-301,-9.458917841082164e-301,-9.438877761122245e-301,-9.418837681162325e-301,-9.398797601202406e-301,-9.378757521242485e-301,-9.358717441282565e-301,-9.338677361322646e-301,-9.318637281362726e-301,-9.298597201402806e-301,-9.278557121442885e-301,-9.258517041482966e-301,-9.238476961523046e-301,-9.218436881563127e-301,-9.198396801603207e-301,-9.178356721643288e-301,-9.158316641683366e-301,-9.138276561723447e-301,-9.118236481763527e-301,-9.098196401803608e-301,-9.078156321843688e-301,-9.058116241883767e-301,-9.038076161923848e-301,-9.018036081963928e-301,-8.997996002004008e-301,-8.977955922044089e-301,-8.95791584208417e-301,-8.937875762124248e-301,-8.917835682164329e-301,-8.897795602204409e-301,-8.87775552224449e-301,-8.85771544228457e-301,-8.837675362324649e-301,-8.81763528236473e-301,-8.79759520240481e-301,-8.77755512244489e-301,-8.75751504248497e-301,-8.737474962525051e-301,-8.71743488256513e-301,-8.69739480260521e-301,-8.677354722645291e-301,-8.657314642685371e-301,-8.637274562725452e-301,-8.61723448276553e-301,-8.597194402805611e-301,-8.577154322845691e-301,-8.557114242885772e-301,-8.537074162925852e-301,-8.517034082965933e-301,-8.496994003006012e-301,-8.476953923046092e-301,-8.456913843086173e-301,-8.436873763126253e-301,-8.416833683166334e-301,-8.396793603206412e-301,-8.376753523246493e-301,-8.356713443286573e-301,-8.336673363326654e-301,-8.316633283366734e-301,-8.296593203406815e-301,-8.276553123446893e-301,-8.256513043486974e-301,-8.236472963527054e-301,-8.216432883567135e-301,-8.196392803607215e-301,-8.176352723647294e-301,-8.156312643687375e-301,-8.136272563727455e-301,-8.116232483767535e-301,-8.096192403807616e-301,-8.076152323847696e-301,-8.056112243887775e-301,-8.036072163927856e-301,-8.016032083967936e-301,-7.995992004008017e-301,-7.975951924048097e-301,-7.955911844088176e-301,-7.935871764128256e-301,-7.915831684168337e-301,-7.895791604208417e-301,-7.875751524248498e-301,-7.855711444288577e-301,-7.835671364328657e-301,-7.815631284368737e-301,-7.795591204408818e-301,-7.775551124448898e-301,-7.755511044488979e-301,-7.735470964529058e-301,-7.715430884569138e-301,-7.695390804609219e-301,-7.675350724649299e-301,-7.65531064468938e-301,-7.635270564729458e-301,-7.615230484769539e-301,-7.59519040480962e-301,-7.5751503248497e-301,-7.55511024488978e-301,-7.53507016492986e-301,-7.51503008496994e-301,-7.49499000501002e-301,-7.4749499250501e-301,-7.454909845090181e-301,-7.4348697651302604e-301,-7.414829685170341e-301,-7.394789605210421e-301,-7.374749525250501e-301,-7.3547094452905814e-301,-7.334669365330662e-301,-7.3146292853707415e-301,-7.294589205410822e-301,-7.274549125450902e-301,-7.254509045490982e-301,-7.2344689655310626e-301,-7.214428885571142e-301,-7.194388805611223e-301,-7.174348725651303e-301,-7.154308645691383e-301,-7.134268565731463e-301,-7.114228485771544e-301,-7.094188405811623e-301,-7.074148325851704e-301,-7.054108245891783e-301,-7.034068165931864e-301,-7.014028085971944e-301,-6.993988006012024e-301,-6.9739479260521044e-301,-6.953907846092185e-301,-6.9338677661322645e-301,-6.913827686172345e-301,-6.893787606212425e-301,-6.873747526252505e-301,-6.8537074462925855e-301,-6.833667366332665e-301,-6.813627286372746e-301,-6.793587206412826e-301,-6.773547126452906e-301,-6.753507046492986e-301,-6.733466966533067e-301,-6.713426886573146e-301,-6.693386806613227e-301,-6.673346726653306e-301,-6.653306646693387e-301,-6.633266566733467e-301,-6.613226486773547e-301,-6.593186406813627e-301,-6.573146326853708e-301,-6.5531062468937875e-301,-6.533066166933868e-301,-6.513026086973948e-301,-6.492986007014028e-301,-6.4729459270541085e-301,-6.452905847094188e-301,-6.432865767134269e-301,-6.412825687174349e-301,-6.392785607214429e-301,-6.372745527254509e-301,-6.35270544729459e-301,-6.332665367334669e-301,-6.31262528737475e-301,-6.29258520741483e-301,-6.27254512745491e-301,-6.25250504749499e-301,-6.23246496753507e-301,-6.21242488757515e-301,-6.192384807615231e-301,-6.1723447276553105e-301,-6.152304647695391e-301,-6.132264567735471e-301,-6.112224487775551e-301,-6.0921844078156315e-301,-6.072144327855712e-301,-6.0521042478957916e-301,-6.032064167935872e-301,-6.012024087975952e-301,-5.991984008016032e-301,-5.971943928056113e-301,-5.951903848096192e-301,-5.931863768136273e-301,-5.911823688176353e-301,-5.891783608216433e-301,-5.871743528256513e-301,-5.851703448296594e-301,-5.831663368336673e-301,-5.811623288376754e-301,-5.7915832084168334e-301,-5.771543128456914e-301,-5.751503048496994e-301,-5.731462968537074e-301,-5.7114228885771545e-301,-5.691382808617235e-301,-5.6713427286573146e-301,-5.651302648697395e-301,-5.6312625687374755e-301,-5.611222488777555e-301,-5.5911824088176356e-301,-5.571142328857715e-301,-5.551102248897796e-301,-5.531062168937876e-301,-5.511022088977956e-301,-5.490982009018036e-301,-5.470941929058117e-301,-5.450901849098196e-301,-5.430861769138277e-301,-5.410821689178357e-301,-5.390781609218437e-301,-5.370741529258517e-301,-5.350701449298597e-301,-5.3306613693386774e-301,-5.310621289378758e-301,-5.2905812094188375e-301,-5.270541129458918e-301,-5.2505010494989985e-301,-5.230460969539078e-301,-5.2104208895791585e-301,-5.190380809619239e-301,-5.170340729659319e-301,-5.150300649699399e-301,-5.130260569739479e-301,-5.110220489779559e-301,-5.09018040981964e-301,-5.070140329859719e-301,-5.0501002498998e-301,-5.03006016993988e-301,-5.01002008997996e-301,-4.98998001002004e-301,-4.969939930060121e-301,-4.9498998501002e-301,-4.929859770140281e-301,-4.9098196901803605e-301,-4.889779610220441e-301,-4.8697395302605214e-301,-4.849699450300601e-301,-4.8296593703406815e-301,-4.809619290380762e-301,-4.789579210420842e-301,-4.769539130460922e-301,-4.749499050501002e-301,-4.729458970541082e-301,-4.709418890581163e-301,-4.689378810621242e-301,-4.669338730661323e-301,-4.649298650701403e-301,-4.629258570741483e-301,-4.609218490781563e-301,-4.589178410821644e-301,-4.569138330861723e-301,-4.549098250901804e-301,-4.5290581709418835e-301,-4.509018090981964e-301,-4.488978011022044e-301,-4.468937931062124e-301,-4.4488978511022045e-301,-4.428857771142285e-301,-4.408817691182365e-301,-4.388777611222445e-301,-4.3687375312625255e-301,-4.348697451302605e-301,-4.328657371342686e-301,-4.308617291382765e-301,-4.288577211422846e-301,-4.268537131462926e-301,-4.248497051503006e-301,-4.228456971543086e-301,-4.208416891583167e-301,-4.188376811623246e-301,-4.168336731663327e-301,-4.148296651703407e-301,-4.128256571743487e-301,-4.108216491783567e-301,-4.088176411823647e-301,-4.0681363318637275e-301,-4.048096251903808e-301,-4.0280561719438876e-301,-4.008016091983968e-301,-3.9879760120240485e-301,-3.967935932064128e-301,-3.947895852104209e-301,-3.927855772144289e-301,-3.907815692184369e-301,-3.887775612224449e-301,-3.867735532264529e-301,-3.847695452304609e-301,-3.82765537234469e-301,-3.807615292384769e-301,-3.78757521242485e-301,-3.76753513246493e-301,-3.74749505250501e-301,-3.7274549725450904e-301,-3.7074148925851704e-301,-3.6873748126252504e-301,-3.667334732665331e-301,-3.647294652705411e-301,-3.627254572745491e-301,-3.607214492785571e-301,-3.5871744128256515e-301,-3.5671343328657316e-301,-3.5470942529058116e-301,-3.527054172945892e-301,-3.507014092985972e-301,-3.486974013026052e-301,-3.4669339330661322e-301,-3.4468938531062127e-301,-3.4268537731462927e-301,-3.4068136931863728e-301,-3.386773613226453e-301,-3.3667335332665333e-301,-3.3466934533066133e-301,-3.3266533733466934e-301,-3.3066132933867734e-301,-3.286573213426854e-301,-3.266533133466934e-301,-3.246493053507014e-301,-3.2264529735470944e-301,-3.2064128935871745e-301,-3.1863728136272545e-301,-3.1663327336673346e-301,-3.146292653707415e-301,-3.126252573747495e-301,-3.106212493787575e-301,-3.086172413827655e-301,-3.0661323338677357e-301,-3.0460922539078157e-301,-3.0260521739478957e-301,-3.0060120939879762e-301,-2.9859720140280563e-301,-2.9659319340681363e-301,-2.9458918541082164e-301,-2.925851774148297e-301,-2.905811694188377e-301,-2.885771614228457e-301,-2.865731534268537e-301,-2.8456914543086174e-301,-2.8256513743486975e-301,-2.8056112943887775e-301,-2.785571214428858e-301,-2.765531134468938e-301,-2.745491054509018e-301,-2.725450974549098e-301,-2.7054108945891786e-301,-2.6853708146292586e-301,-2.6653307346693387e-301,-2.6452906547094187e-301,-2.625250574749499e-301,-2.6052104947895792e-301,-2.5851704148296593e-301,-2.5651303348697397e-301,-2.5450902549098198e-301,-2.5250501749499e-301,-2.50501009498998e-301,-2.4849700150300603e-301,-2.4649299350701404e-301,-2.4448898551102204e-301,-2.4248497751503005e-301,-2.404809695190381e-301,-2.384769615230461e-301,-2.364729535270541e-301,-2.3446894553106215e-301,-2.3246493753507016e-301,-2.3046092953907816e-301,-2.2845692154308617e-301,-2.264529135470942e-301,-2.244489055511022e-301,-2.2244489755511022e-301,-2.2044088955911823e-301,-2.1843688156312627e-301,-2.1643287356713428e-301,-2.144288655711423e-301,-2.124248575751503e-301,-2.1042084957915833e-301,-2.0841684158316634e-301,-2.0641283358717434e-301,-2.044088255911824e-301,-2.024048175951904e-301,-2.004008095991984e-301,-1.983968016032064e-301,-1.9639279360721445e-301,-1.9438878561122245e-301,-1.9238477761523046e-301,-1.9038076961923846e-301,-1.883767616232465e-301,-1.8637275362725451e-301,-1.8436874563126254e-301,-1.8236473763527054e-301,-1.8036072963927857e-301,-1.7835672164328657e-301,-1.763527136472946e-301,-1.743487056513026e-301,-1.7234469765531063e-301,-1.7034068965931863e-301,-1.6833668166332666e-301,-1.6633267366733466e-301,-1.643286656713427e-301,-1.6232465767535072e-301,-1.6032064967935872e-301,-1.5831664168336675e-301,-1.5631263368737475e-301,-1.5430862569138278e-301,-1.5230461769539078e-301,-1.503006096993988e-301,-1.4829660170340681e-301,-1.4629259370741484e-301,-1.4428858571142284e-301,-1.4228457771543087e-301,-1.4028056971943887e-301,-1.382765617234469e-301,-1.3627255372745492e-301,-1.3426854573146293e-301,-1.3226453773547095e-301,-1.3026052973947896e-301,-1.2825652174348698e-301,-1.2625251374749499e-301,-1.2424850575150301e-301,-1.2224449775551102e-301,-1.2024048975951904e-301,-1.1823648176352705e-301,-1.1623247376753507e-301,-1.142284657715431e-301,-1.122244577755511e-301,-1.1022044977955913e-301,-1.0821644178356713e-301,-1.0621243378757516e-301,-1.0420842579158316e-301,-1.022044177955912e-301,-1.002004097995992e-301,-9.819640180360722e-302,-9.619239380761522e-302,-9.418838581162325e-302,-9.218437781563127e-302,-9.018036981963928e-302,-8.81763618236473e-302,-8.617235382765531e-302,-8.416834583166333e-302,-8.216433783567134e-302,-8.016032983967936e-302,-7.815632184368738e-302,-7.61523138476954e-302,-7.414830585170341e-302,-7.214429785571143e-302,-7.014028985971944e-302,-6.813628186372746e-302,-6.613227386773547e-302,-6.412826587174349e-302,-6.21242578757515e-302,-6.012024987975952e-302,-5.811624188376753e-302,-5.611223388777555e-302,-5.410822589178357e-302,-5.210421789579159e-302,-5.01002098997996e-302,-4.809620190380762e-302,-4.6092193907815634e-302,-4.408818591182365e-302,-4.2084177915831664e-302,-4.008016991983968e-302,-3.8076161923847694e-302,-3.6072153927855714e-302,-3.406814593186373e-302,-3.2064137935871745e-302,-3.006012993987976e-302,-2.8056121943887775e-302,-2.605211394789579e-302,-2.404810595190381e-302,-2.2044097955911825e-302,-2.004008995991984e-302,-1.8036081963927856e-302,-1.6032073967935873e-302,-1.4028065971943888e-302,-1.2024057975951904e-302,-1.002004997995992e-302,-8.016041983967936e-303,-6.012033987975951e-303,-4.008025991983968e-303,-2.004017995991984e-303,-1.0000000000000256e-308]}
},{}],79:[function(require,module,exports){
module.exports={"expected":[9.999999999999999e299,1.0020080321083934e300,1.0040241448288119e300,1.0060483870359246e300,1.008080807999347e300,1.0101214573876395e300,1.0121703852723524e300,1.014227642132122e300,1.0162932788568156e300,1.0183673467517285e300,1.0204498975418303e300,1.0225409833760665e300,1.0246406568317106e300,1.0267489709187708e300,1.0288659790844511e300,1.0309917352176678e300,1.0331262936536227e300,1.0352697091784318e300,1.0374220370338128e300,1.0395833329218314e300,1.0417536530097063e300,1.0439330539346738e300,1.0461215928089167e300,1.0483193272245516e300,1.0505263152586814e300,1.0527426154785113e300,1.054968286946529e300,1.0572033892257523e300,1.0594479823850415e300,1.0617021270044815e300,1.063965884180832e300,1.0662393155330467e300,1.0685224832078647e300,1.070815449885474e300,1.0731182787852468e300,1.0754310336715498e300,1.0777537788596299e300,1.0800865792215757e300,1.0824295001923574e300,1.0847826077759451e300,1.0871459685515067e300,1.0895196496796875e300,1.0919037189089726e300,1.094298244582131e300,1.0967032956427484e300,1.0991189416418424e300,1.1015452527445676e300,1.1039822997370096e300,1.1064301540330677e300,1.1088888876814321e300,1.1113585733726519e300,1.1138392844462989e300,1.1163310948982277e300,1.1188340793879327e300,1.1213483132460044e300,1.1238738724816877e300,1.1264108337905416e300,1.1289592745622017e300,1.1315192728882514e300,1.1340909075701963e300,1.1366742581275523e300,1.1392694048060402e300,1.141876428585896e300,1.1444954111902932e300,1.147126435093883e300,1.149769583531451e300,1.1524249405066963e300,1.1550925908011295e300,1.1577726199830964e300,1.1604651144169282e300,1.1631701612722165e300,1.1658878485332234e300,1.1686182650084188e300,1.1713615003401551e300,1.1741176450144774e300,1.176886790371073e300,1.1796690286133607e300,1.182464452818726e300,1.1852731569489e300,1.1880952358604874e300,1.1909307853156454e300,1.1937799019929146e300,1.1966426834982086e300,1.1995192283759592e300,1.2024096361204237e300,1.2053140071871571e300,1.2082324430046491e300,1.2111650459861321e300,1.2141119195415608e300,1.217073168089768e300,1.2200488970707969e300,1.2230392129584176e300,1.226044223272824e300,1.2290640365935233e300,1.2320987625724126e300,1.2351485119470516e300,1.2382133965541317e300,1.2412935293431474e300,1.2443890243902712e300,1.2474999969124374e300,1.2506265632816376e300,1.2537688410394307e300,1.256926948911674e300,1.2601010068234746e300,1.2632911359143727e300,1.2664974585537503e300,1.26972009835648e300,1.2729591801988105e300,1.2762148302344961e300,1.2794871759111769e300,1.2827763459870077e300,1.2860824705475474e300,1.2894056810229084e300,1.2927461102051733e300,1.296103892266082e300,1.2994791627749972e300,1.3028720587171499e300,1.3062827185121707e300,1.3097112820329153e300,1.3131578906245845e300,1.3166226871241499e300,1.3201058158800845e300,1.3236074227724109e300,1.3271276552330664e300,1.3306666622665957e300,1.3342245944711745e300,1.337801604059973e300,1.341397844882862e300,1.345013472448471e300,1.3486486439466034e300,1.3523035182710174e300,1.3559782560425773e300,1.3596730196327837e300,1.3633879731876884e300,1.367123282652205e300,1.3708791157948165e300,1.374655642232695e300,1.3784530334572358e300,1.382271462860015e300,1.386111105759182e300,1.3899721394262923e300,1.3938547431135888e300,1.3977590980817425e300,1.4016853876280614e300,1.4056337971151754e300,1.4096045140002074e300,1.41359772786444e300,1.4176136304434886e300,1.42165241565799e300,1.4257142796448162e300,1.4297994207888276e300,1.433908039755169e300,1.4380403395221287e300,1.4421965254145646e300,1.4463768051379122e300,1.4505813888127874e300,1.4548104890101912e300,1.4590643207873362e300,1.4633431017240994e300,1.4676470519601212e300,1.4719763942325597e300,1.4763313539145165e300,1.4807121590541434e300,1.485119040414452e300,1.4895522315138338e300,1.494011968667306e300,1.498498491028506e300,1.5030120406324393e300,1.5075528624390065e300,1.5121212043773188e300,1.5167173173908224e300,1.5213414554832502e300,1.5259938757654146e300,1.5306748385028604e300,1.5353846071644023e300,1.5401234484715554e300,1.5448916324488875e300,1.5496894324753098e300,1.5545171253363226e300,1.559374991277246e300,1.5642633140574485e300,1.569182381005597e300,1.5741324830759586e300,1.5791139149057645e300,1.584126974873671e300,1.589171965159337e300,1.5942491918041422e300,1.5993589647730727e300,1.604501598017804e300,1.609677409540999e300,1.6148867214618615e300,1.620129860082961e300,1.6254071559583657e300,1.6307189439631124e300,1.636065563364042e300,1.6414473578920318e300,1.6468646758156608e300,1.652317870016337e300,1.657807298064922e300,1.663333322299889e300,1.668896309907048e300,1.6744966330008784e300,1.6801346687075017e300,1.685810799249338e300,1.6915254120314852e300,1.697278899729858e300,1.7030716603811342e300,1.7089040974745494e300,1.714776620045583e300,1.7206896427715814e300,1.726643586069372e300,1.7326388761949026e300,1.738675945344972e300,1.7447552317610886e300,1.7508771798355188e300,1.7570422402195743e300,1.7632508699341984e300,1.7695035324828983e300,1.7758006979670976e300,1.7821428432039543e300,1.7885304518467132e300,1.7949640145076602e300,1.8014440288837337e300,1.807970999884872e300,1.814545439765157e300,1.8211678682568333e300,1.8278388127072684e300,1.8345588082189393e300,1.8413283977925139e300,1.848148132473114e300,1.8550185714998413e300,1.861940282458649e300,1.8689138414386514e300,1.8759398331919555e300,1.8830188512971163e300,1.890151498326303e300,1.897338386016279e300,1.9045801354433018e300,1.9118773772020377e300,1.9192307515886097e300,1.9266409087878833e300,1.9341085090651105e300,1.9416342229620433e300,1.9492187314976505e300,1.9568627263735487e300,1.9645669101842954e300,1.9723319966326612e300,1.9801587107500316e300,1.9880477891220774e300,1.99599998011984e300,2.004016044136385e300,2.012096753829182e300,2.0202428943683722e300,2.02845526369109e300,2.036734672762016e300,2.045081945840332e300,2.053497920753273e300,2.061983449176457e300,2.0705393969211963e300,2.079166644228993e300,2.0878660860734234e300,2.096638632469635e300,2.1054852087916827e300,2.1144067560979246e300,2.1234042314647354e300,2.132478608328768e300,2.1416308768380336e300,2.1508620442120618e300,2.1601731351114114e300,2.1695651920168245e300,2.179039275618314e300,2.1885964652144893e300,2.198237859122436e300,2.2079645750984812e300,2.2177777507701732e300,2.227678544079839e300,2.2376681337400716e300,2.2477477197015262e300,2.257918523633423e300,2.2681817894171492e300,2.2785387836533854e300,2.2889907961831918e300,2.2995391406235006e300,2.3101851549174815e300,2.320930201900271e300,2.3317756698805576e300,2.3427229732385552e300,2.353773553040896e300,2.3649288776730087e300,2.3761904434895695e300,2.3875597754836203e300,2.399038427974991e300,2.4106279853186774e300,2.4223300626338492e300,2.4341463065541944e300,2.446078396000337e300,2.4581280429750786e300,2.4702969933822668e300,2.482587027870103e300,2.4949999626997504e300,2.5075376506401356e300,2.520201981889859e300,2.532994885027185e300,2.5459183279891195e300,2.5589743190806055e300,2.572164908014933e300,2.5854921869864972e300,2.598958291777073e300,2.612565402896851e300,2.6263157467614966e300,2.6402115969065823e300,2.6542552752407768e300,2.668449153339244e300,2.682795653778761e300,2.697297251516144e300,2.711956475311615e300,2.726775909198842e300,2.741758194003442e300,2.756906028911817e300,2.772222173092285e300,2.7877094473705574e300,2.803370735961685e300,2.819208988260718e300,2.835227220694409e300,2.851428518636409e300,2.867816038388494e300,2.8843930092305134e300,2.9011627355418477e300,2.918128598997299e300,2.935294060840485e300,2.952662664237948e300,2.970238036717334e300,2.988023892693178e300,3.0060240360839754e300,3.0242423630244274e300,3.042682864676905e300,3.061349630146413e300,3.080246849503507e300,3.099378816919873e300,3.1187499339214857e300,3.138364712764528e300,3.1582277799395145e300,3.1783438798093245e300,3.198717878387165e300,3.219354767260772e300,3.240259667669508e300,3.26143783474134e300,3.2828946618970755e300,3.304635685429588e300,3.326666589266224e300,3.348993209922978e300,3.371621541659516e300,3.3945577418446037e300,3.4178081365420357e300,3.441379226327707e300,3.465277692349057e300,3.489510402638762e300,3.514084418695201e300,3.539007002342943e300,3.564285622887247e300,3.589927964577405e300,3.6159419343945624e300,3.6423356701806194e300,3.66911754912576e300,3.6962961966331986e300,3.723880495580867e300,3.7518795960009074e300,3.780302925199154e300,3.8091601983380946e300,3.838461429508287e300,3.868216943314708e300,3.8984373870062287e300,3.9291337431781296e300,3.9603173430794945e300,3.991999880559364e300,4.0241934266876986e300,4.0569104450895667e300,4.090163808033463e300,4.1239668133174004e300,4.1583332019993094e300,4.193277177021401e300,4.2288134227815327e300,4.264957125708237e300,4.3017239958999746e300,4.339130289893389e300,4.3771928346298914e300,4.4159290526948127e300,4.4553569889086465e300,4.4954953383556585e300,4.536363475941328e300,4.577981487576809e300,4.620370203095856e300,4.6635512310175626e300,4.7075469952767954e300,4.752380774053521e300,4.798076740842278e300,4.8446600079140424e300,4.892156672334686e300,4.940593864717192e300,4.989999800899008e300,5.0404038367513604e300,5.0918365263442394e300,5.144329683709223e300,5.1979164484624656e300,5.252631355572309e300,5.308510409580136e300,5.365591163609675e300,5.423912803529074e300,5.483516237662129e300,5.544444192480258e300,5.606741314745624e300,5.670454280618555e300,5.735631912289615e300,5.802325302748796e300,5.870587949361951e300,5.940475896988392e300,6.012047891444347e300,6.085365544195434e300,6.160493509248606e300,6.237499673310954e300,6.316455360390981e300,6.397435552138414e300,6.480519125353367e300,6.565789108246212e300,6.653332957198243e300,6.743242855962404e300,6.83561603945583e300,6.930555144535133e300,7.028168590414626e300,7.128570991691863e300,7.231883607288412e300,7.338234829003057e300,7.447760713816025e300,7.560605564584513e300,7.676922564340862e300,7.796874470056188e300,7.920634372476732e300,8.048386529492755e300,8.180327281478139e300,8.316666058163933e300,8.457626487905822e300,8.603447621703378e300,8.754385286063455e300,8.910713580813194e300,9.072726540310802e300,9.240739979235317e300,9.415093547333637e300,9.596153021253769e300,9.784312866005457e300,9.97999910379608e300,1.0183672534152522e301,1.0395832356558252e301,1.0617020255554647e301,1.084782501868158e301,1.1088887770143324e301,1.1340907918156113e301,1.1604649932158055e301,1.1880951088191751e301,1.217073034775744e301,1.2474998568493914e301,1.2794870285733247e301,1.3131577354300746e301,1.3486484802498384e301,1.3861109328418438e301,1.425714096705331e301,1.4676468581012386e301,1.5121209985913983e301,1.559374772428744e301,1.60967717634551e301,1.6633330732989297e301,1.7206893763020666e301,1.78214255736102e301,1.848147825064528e301,1.9192304200784656e301,1.9959996215584717e301,2.079166255165012e301,2.1695647683857263e301,2.268181326398867e301,2.3761899353243863e301,2.494999402447643e301,2.626315125983547e301,2.7722214814230374e301,2.9352932854050803e301,3.118749058527628e301,3.3266655932625686e301,3.564284479515734e301,3.8384601034679923e301,4.1583316457437398e301,4.536361623868661e301,4.989997559891193e301,5.544441425804113e301,6.237496171736724e301,7.128566418207602e301,8.316659833144504e301,9.979990139769741e301,1.2474984562206604e302,1.6633305832934357e302,2.494993799940407e302,4.989975149923753e302,9.999999999999745e307],"x":[1.0e-300,9.97995992004008e-301,9.959919840080161e-301,9.93987976012024e-301,9.91983968016032e-301,9.899799600200401e-301,9.879759520240481e-301,9.859719440280562e-301,9.839679360320642e-301,9.819639280360721e-301,9.799599200400802e-301,9.779559120440882e-301,9.759519040480962e-301,9.739478960521043e-301,9.719438880561122e-301,9.699398800601202e-301,9.679358720641283e-301,9.659318640681363e-301,9.639278560721444e-301,9.619238480761524e-301,9.599198400801603e-301,9.579158320841683e-301,9.559118240881764e-301,9.539078160921844e-301,9.519038080961925e-301,9.498998001002004e-301,9.478957921042084e-301,9.458917841082164e-301,9.438877761122245e-301,9.418837681162325e-301,9.398797601202406e-301,9.378757521242485e-301,9.358717441282565e-301,9.338677361322646e-301,9.318637281362726e-301,9.298597201402806e-301,9.278557121442885e-301,9.258517041482966e-301,9.238476961523046e-301,9.218436881563127e-301,9.198396801603207e-301,9.178356721643288e-301,9.158316641683366e-301,9.138276561723447e-301,9.118236481763527e-301,9.098196401803608e-301,9.078156321843688e-301,9.058116241883767e-301,9.038076161923848e-301,9.018036081963928e-301,8.997996002004008e-301,8.977955922044089e-301,8.95791584208417e-301,8.937875762124248e-301,8.917835682164329e-301,8.897795602204409e-301,8.87775552224449e-301,8.85771544228457e-301,8.837675362324649e-301,8.81763528236473e-301,8.79759520240481e-301,8.77755512244489e-301,8.75751504248497e-301,8.737474962525051e-301,8.71743488256513e-301,8.69739480260521e-301,8.677354722645291e-301,8.657314642685371e-301,8.637274562725452e-301,8.61723448276553e-301,8.597194402805611e-301,8.577154322845691e-301,8.557114242885772e-301,8.537074162925852e-301,8.517034082965933e-301,8.496994003006012e-301,8.476953923046092e-301,8.456913843086173e-301,8.436873763126253e-301,8.416833683166334e-301,8.396793603206412e-301,8.376753523246493e-301,8.356713443286573e-301,8.336673363326654e-301,8.316633283366734e-301,8.296593203406815e-301,8.276553123446893e-301,8.256513043486974e-301,8.236472963527054e-301,8.216432883567135e-301,8.196392803607215e-301,8.176352723647294e-301,8.156312643687375e-301,8.136272563727455e-301,8.116232483767535e-301,8.096192403807616e-301,8.076152323847696e-301,8.056112243887775e-301,8.036072163927856e-301,8.016032083967936e-301,7.995992004008017e-301,7.975951924048097e-301,7.955911844088176e-301,7.935871764128256e-301,7.915831684168337e-301,7.895791604208417e-301,7.875751524248498e-301,7.855711444288577e-301,7.835671364328657e-301,7.815631284368737e-301,7.795591204408818e-301,7.775551124448898e-301,7.755511044488979e-301,7.735470964529058e-301,7.715430884569138e-301,7.695390804609219e-301,7.675350724649299e-301,7.65531064468938e-301,7.635270564729458e-301,7.615230484769539e-301,7.59519040480962e-301,7.5751503248497e-301,7.55511024488978e-301,7.53507016492986e-301,7.51503008496994e-301,7.49499000501002e-301,7.4749499250501e-301,7.454909845090181e-301,7.4348697651302604e-301,7.414829685170341e-301,7.394789605210421e-301,7.374749525250501e-301,7.3547094452905814e-301,7.334669365330662e-301,7.3146292853707415e-301,7.294589205410822e-301,7.274549125450902e-301,7.254509045490982e-301,7.2344689655310626e-301,7.214428885571142e-301,7.194388805611223e-301,7.174348725651303e-301,7.154308645691383e-301,7.134268565731463e-301,7.114228485771544e-301,7.094188405811623e-301,7.074148325851704e-301,7.054108245891783e-301,7.034068165931864e-301,7.014028085971944e-301,6.993988006012024e-301,6.9739479260521044e-301,6.953907846092185e-301,6.9338677661322645e-301,6.913827686172345e-301,6.893787606212425e-301,6.873747526252505e-301,6.8537074462925855e-301,6.833667366332665e-301,6.813627286372746e-301,6.793587206412826e-301,6.773547126452906e-301,6.753507046492986e-301,6.733466966533067e-301,6.713426886573146e-301,6.693386806613227e-301,6.673346726653306e-301,6.653306646693387e-301,6.633266566733467e-301,6.613226486773547e-301,6.593186406813627e-301,6.573146326853708e-301,6.5531062468937875e-301,6.533066166933868e-301,6.513026086973948e-301,6.492986007014028e-301,6.4729459270541085e-301,6.452905847094188e-301,6.432865767134269e-301,6.412825687174349e-301,6.392785607214429e-301,6.372745527254509e-301,6.35270544729459e-301,6.332665367334669e-301,6.31262528737475e-301,6.29258520741483e-301,6.27254512745491e-301,6.25250504749499e-301,6.23246496753507e-301,6.21242488757515e-301,6.192384807615231e-301,6.1723447276553105e-301,6.152304647695391e-301,6.132264567735471e-301,6.112224487775551e-301,6.0921844078156315e-301,6.072144327855712e-301,6.0521042478957916e-301,6.032064167935872e-301,6.012024087975952e-301,5.991984008016032e-301,5.971943928056113e-301,5.951903848096192e-301,5.931863768136273e-301,5.911823688176353e-301,5.891783608216433e-301,5.871743528256513e-301,5.851703448296594e-301,5.831663368336673e-301,5.811623288376754e-301,5.7915832084168334e-301,5.771543128456914e-301,5.751503048496994e-301,5.731462968537074e-301,5.7114228885771545e-301,5.691382808617235e-301,5.6713427286573146e-301,5.651302648697395e-301,5.6312625687374755e-301,5.611222488777555e-301,5.5911824088176356e-301,5.571142328857715e-301,5.551102248897796e-301,5.531062168937876e-301,5.511022088977956e-301,5.490982009018036e-301,5.470941929058117e-301,5.450901849098196e-301,5.430861769138277e-301,5.410821689178357e-301,5.390781609218437e-301,5.370741529258517e-301,5.350701449298597e-301,5.3306613693386774e-301,5.310621289378758e-301,5.2905812094188375e-301,5.270541129458918e-301,5.2505010494989985e-301,5.230460969539078e-301,5.2104208895791585e-301,5.190380809619239e-301,5.170340729659319e-301,5.150300649699399e-301,5.130260569739479e-301,5.110220489779559e-301,5.09018040981964e-301,5.070140329859719e-301,5.0501002498998e-301,5.03006016993988e-301,5.01002008997996e-301,4.98998001002004e-301,4.969939930060121e-301,4.9498998501002e-301,4.929859770140281e-301,4.9098196901803605e-301,4.889779610220441e-301,4.8697395302605214e-301,4.849699450300601e-301,4.8296593703406815e-301,4.809619290380762e-301,4.789579210420842e-301,4.769539130460922e-301,4.749499050501002e-301,4.729458970541082e-301,4.709418890581163e-301,4.689378810621242e-301,4.669338730661323e-301,4.649298650701403e-301,4.629258570741483e-301,4.609218490781563e-301,4.589178410821644e-301,4.569138330861723e-301,4.549098250901804e-301,4.5290581709418835e-301,4.509018090981964e-301,4.488978011022044e-301,4.468937931062124e-301,4.4488978511022045e-301,4.428857771142285e-301,4.408817691182365e-301,4.388777611222445e-301,4.3687375312625255e-301,4.348697451302605e-301,4.328657371342686e-301,4.308617291382765e-301,4.288577211422846e-301,4.268537131462926e-301,4.248497051503006e-301,4.228456971543086e-301,4.208416891583167e-301,4.188376811623246e-301,4.168336731663327e-301,4.148296651703407e-301,4.128256571743487e-301,4.108216491783567e-301,4.088176411823647e-301,4.0681363318637275e-301,4.048096251903808e-301,4.0280561719438876e-301,4.008016091983968e-301,3.9879760120240485e-301,3.967935932064128e-301,3.947895852104209e-301,3.927855772144289e-301,3.907815692184369e-301,3.887775612224449e-301,3.867735532264529e-301,3.847695452304609e-301,3.82765537234469e-301,3.807615292384769e-301,3.78757521242485e-301,3.76753513246493e-301,3.74749505250501e-301,3.7274549725450904e-301,3.7074148925851704e-301,3.6873748126252504e-301,3.667334732665331e-301,3.647294652705411e-301,3.627254572745491e-301,3.607214492785571e-301,3.5871744128256515e-301,3.5671343328657316e-301,3.5470942529058116e-301,3.527054172945892e-301,3.507014092985972e-301,3.486974013026052e-301,3.4669339330661322e-301,3.4468938531062127e-301,3.4268537731462927e-301,3.4068136931863728e-301,3.386773613226453e-301,3.3667335332665333e-301,3.3466934533066133e-301,3.3266533733466934e-301,3.3066132933867734e-301,3.286573213426854e-301,3.266533133466934e-301,3.246493053507014e-301,3.2264529735470944e-301,3.2064128935871745e-301,3.1863728136272545e-301,3.1663327336673346e-301,3.146292653707415e-301,3.126252573747495e-301,3.106212493787575e-301,3.086172413827655e-301,3.0661323338677357e-301,3.0460922539078157e-301,3.0260521739478957e-301,3.0060120939879762e-301,2.9859720140280563e-301,2.9659319340681363e-301,2.9458918541082164e-301,2.925851774148297e-301,2.905811694188377e-301,2.885771614228457e-301,2.865731534268537e-301,2.8456914543086174e-301,2.8256513743486975e-301,2.8056112943887775e-301,2.785571214428858e-301,2.765531134468938e-301,2.745491054509018e-301,2.725450974549098e-301,2.7054108945891786e-301,2.6853708146292586e-301,2.6653307346693387e-301,2.6452906547094187e-301,2.625250574749499e-301,2.6052104947895792e-301,2.5851704148296593e-301,2.5651303348697397e-301,2.5450902549098198e-301,2.5250501749499e-301,2.50501009498998e-301,2.4849700150300603e-301,2.4649299350701404e-301,2.4448898551102204e-301,2.4248497751503005e-301,2.404809695190381e-301,2.384769615230461e-301,2.364729535270541e-301,2.3446894553106215e-301,2.3246493753507016e-301,2.3046092953907816e-301,2.2845692154308617e-301,2.264529135470942e-301,2.244489055511022e-301,2.2244489755511022e-301,2.2044088955911823e-301,2.1843688156312627e-301,2.1643287356713428e-301,2.144288655711423e-301,2.124248575751503e-301,2.1042084957915833e-301,2.0841684158316634e-301,2.0641283358717434e-301,2.044088255911824e-301,2.024048175951904e-301,2.004008095991984e-301,1.983968016032064e-301,1.9639279360721445e-301,1.9438878561122245e-301,1.9238477761523046e-301,1.9038076961923846e-301,1.883767616232465e-301,1.8637275362725451e-301,1.8436874563126254e-301,1.8236473763527054e-301,1.8036072963927857e-301,1.7835672164328657e-301,1.763527136472946e-301,1.743487056513026e-301,1.7234469765531063e-301,1.7034068965931863e-301,1.6833668166332666e-301,1.6633267366733466e-301,1.643286656713427e-301,1.6232465767535072e-301,1.6032064967935872e-301,1.5831664168336675e-301,1.5631263368737475e-301,1.5430862569138278e-301,1.5230461769539078e-301,1.503006096993988e-301,1.4829660170340681e-301,1.4629259370741484e-301,1.4428858571142284e-301,1.4228457771543087e-301,1.4028056971943887e-301,1.382765617234469e-301,1.3627255372745492e-301,1.3426854573146293e-301,1.3226453773547095e-301,1.3026052973947896e-301,1.2825652174348698e-301,1.2625251374749499e-301,1.2424850575150301e-301,1.2224449775551102e-301,1.2024048975951904e-301,1.1823648176352705e-301,1.1623247376753507e-301,1.142284657715431e-301,1.122244577755511e-301,1.1022044977955913e-301,1.0821644178356713e-301,1.0621243378757516e-301,1.0420842579158316e-301,1.022044177955912e-301,1.002004097995992e-301,9.819640180360722e-302,9.619239380761522e-302,9.418838581162325e-302,9.218437781563127e-302,9.018036981963928e-302,8.81763618236473e-302,8.617235382765531e-302,8.416834583166333e-302,8.216433783567134e-302,8.016032983967936e-302,7.815632184368738e-302,7.61523138476954e-302,7.414830585170341e-302,7.214429785571143e-302,7.014028985971944e-302,6.813628186372746e-302,6.613227386773547e-302,6.412826587174349e-302,6.21242578757515e-302,6.012024987975952e-302,5.811624188376753e-302,5.611223388777555e-302,5.410822589178357e-302,5.210421789579159e-302,5.01002098997996e-302,4.809620190380762e-302,4.6092193907815634e-302,4.408818591182365e-302,4.2084177915831664e-302,4.008016991983968e-302,3.8076161923847694e-302,3.6072153927855714e-302,3.406814593186373e-302,3.2064137935871745e-302,3.006012993987976e-302,2.8056121943887775e-302,2.605211394789579e-302,2.404810595190381e-302,2.2044097955911825e-302,2.004008995991984e-302,1.8036081963927856e-302,1.6032073967935873e-302,1.4028065971943888e-302,1.2024057975951904e-302,1.002004997995992e-302,8.016041983967936e-303,6.012033987975951e-303,4.008025991983968e-303,2.004017995991984e-303,1.0000000000000256e-308]}
},{}],80:[function(require,module,exports){
module.exports={"expected":[1.5574683526225443e10,-5.587338660314116,-1.228130371084109,-5.209966300132765,-1.1971698789752672,-16.48870322285259,-1.5710454834675027,-0.5433073779153454,0.008576071361507637,0.565733172800654,0.16415206674538993,0.7905746769201181,2.3947934298413607,-8.996205298877253,-1.4097527357809196,-0.4800495892589337,0.05877352254062065,0.6338979295237362,1.8324131233156513,-149.0632949830762,0.7744927625480983,2.329181731823926,-9.893999272084761,-1.4399757260067327,-0.49238180329271714,0.04877037917645033,0.6200031913401687,1.7897268380433717,306.20611515868507,-4.669619583926926,-1.1465536143397732,-0.36197176321652497,0.16031895695597964,0.7845234279146119,2.3698622606834086,-9.312844451916682,-1.4209692090495758,-0.484653345701541,0.05502662206971419,0.6286747231591079,4.662967038186052,-3.2907990354380563,-0.9687368063792253,-0.26950821541016834,0.24791235488719227,0.9302508582768911,3.066289675266065,-5.171354757596883,-1.1938131725995786,-0.3847010602419294,0.13992032705027851,0.752789602530563,2.2438203518979933,-11.46255404632474,-1.4829621017372419,-0.5095312776461172,0.03503706749476021,0.6011831464310573,1.73348258067015,58.90523853556244,-1.8780104815855534,-0.6483843264113162,-0.06908189717938841,0.4674789199487733,1.3795195771318143,8.226160167767327,-2.465682882687222,-0.8073946543051345,-0.17471320058200243,0.3462149773411211,1.11465675555053,4.369895255441878,-3.460640836210778,-0.9956704590549951,-0.2842684510819034,0.23340914762886095,0.9049989501318534,2.9294309720959277,-5.5807310940102175,-1.2276154901180707,-0.40052338818795974,0.12596879754402476,0.7315298480856334,2.1635540951512424,-13.61602649037796,-1.5277326852074122,-0.5269220367736835,0.021316943185063757,0.5826708007439929,1.6798496477018021,32.580244049482566,-1.941714279946859,-0.6680325354944262,-0.08287026863943113,0.4508793128071,1.3404575462210304,7.380122258477694,-2.566139118779895,-0.8302953165507567,-0.18887549827933403,0.3309342907988016,1.0843756424037374,4.109954852889932,-3.6474016429174902,-1.0233496052225104,-0.29914418665890274,0.21899846517858698,0.8803659851181699,2.8031408926101133,-6.0579412052018,-1.2625751030192256,-0.41652044046960585,0.11206537403413316,0.710692295523539,2.0879123923113245,-16.758026826536327,-1.5744188334775129,-0.5445658873346506,0.00760483602269427,0.5644518772708695,1.628631492425065,22.511355692990925,-2.008902513029162,-0.6880439733629965,-0.09669000682747408,0.43448366593893656,1.3028053327409295,6.6895586506099765,-2.6739214956489983,-0.8537233500611755,-0.20311133183827265,0.3157916371095313,1.0549816983384037,3.877745609796052,-3.853823739902488,-1.0518164803507255,-0.3141424424136661,0.20467405821623602,0.8563205545190524,2.6861984196759345,-6.62159924121267,-1.2987663196316221,-0.43270124268987437,0.09820460751877158,0.690256886450168,2.0164806718050885,-21.774424003710433,-1.6231648956059535,-0.5624751753344885,-0.006104412150106737,0.546512765290331,1.5796506161799684,17.19177968995876,-2.079896537200291,-0.7084365423695697,-0.11054643278331469,0.4182821910284134,1.2664745525057852,6.115021340991143,0.9256718133903095,-0.877706303027458,-5.240492753875746,0.3007795374271959,-0.387528248833534,3.6689801035044955,0.7489420584931262,-1.081116368530435,-11.797738110563106,0.19042981653109767,-0.5126343266242489,2.577563395349613,0.5978384696871841,-1.3362697382316504,51.44663179082762,0.08438111436637798,-0.6518846506751811,1.9488922625151113,0.4644842919144628,-1.6741298676052738,8.060557767870382,-0.019815955190485252,-0.8114670245000142,1.5327463088348297,0.34346202069658127,-2.1550582118123405,4.320977289182917,-0.12444492350356004,-1.0005820079979837,1.2313838786899434,0.23081620742376485,-2.9151181369142765,2.906025302009314,-0.23182760821348142,-1.233802467352524,0.9986626738772569,0.12347014242149776,-4.339940554918274,2.1496507252947548,-0.34453565576042533,-1.5359664865397735,0.8098760745683832,0.018855566485854125,-8.12438737234412,1.6704850092211534,-0.4656519649029451,-1.953507294962619,0.6505175080727836,-0.08534805827411657,-54.12062632229176,1.33359888885118,-0.5991423731753085,-2.584919908356432,0.5114226028911968,-0.19142484250035072,11.664661990125468,1.0790364021778716,-0.7504416611807324,-3.682912570477792,0.3864244539670424,-0.30182672211830575,5.2133044315901405,0.8760081272240751,-0.9274560482673563,-6.1520979010790615,0.2711181983869177,-0.41941064101081604,3.3086353273589433,0.7069956702413455,-1.1424133153991707,-17.481261369781876,0.16215801843875455,-0.5477601878860738,2.381772229912707,0.5612120947105607,-1.4155712374879936,21.327629077742653,0.05682468968824744,-0.6916752670418407,1.8239789082523048,0.43156193919822766,-1.783437554112171,6.578818099375184,-0.047266566325789336,-0.857985929104037,1.4445970941988495,0.31308798940857524,-2.3195753948919906,3.83866148236807,-0.15238993806154488,-1.057012285259274,1.1646287326259817,0.20211189144198052,-3.198231754647198,2.6661174226566478,-0.2609113688169268,-1.3053980661353615,0.9453463690056622,0.09572109148975978,-4.957408876161408,2.00407740596764,-0.3755087106420395,-1.6321434359545235,0.7654499035499825,-0.008564928552134775,-10.488837620007999,1.5710841266177036,-0.49945516607734813,-2.0930678900951314,0.6121712088913907,-0.11303756530529468,111.81744229489365,1.2600877081425301,-0.6370346907800367,-2.811667398905185,0.47730315551886066,-0.2200047500964154,8.816740127449737,1.021386118191941,-0.7942121102782298,-4.127199491166658,0.3552348710492266,-0.33199979940612573,4.537178744135983,0.8286747429450917,-0.979802656285593,-7.4337514489773415,0.24189469149481665,-0.4520350096242188,3.008245038283209,0.6666449652317523,-1.2076754335105668,-33.633183173942705,0.134136566076633,-0.5839574857257436,2.2099908731590134,0.5256960776521643,-1.501278703868694,13.439389530505206,0.029354019938418546,-0.733004660365341,1.710967158476543,0.39940977935130856,-1.9039877359551052,5.550035807767233,-0.07478843729973507,-0.9067467854396709,1.3631662947313445,0.28323112554222757,-2.5064458116751824,3.448224703711359,-0.18056951313368394,-1.1168118903334177,1.1020059003729064,0.17372403186714153,-3.5357848321373164,2.4589023124068903,-0.2904143453225437,-1.3823103115046738,28.07440542310635,0.06811734959151204,-5.769193516272648,0.2824142414382342,0.44497125452238273,-1.7373338734975405,0.7228506064458289,-1.1185131215929922,-0.8386425819834051,1.4798951626017083,-0.5341972679110045,2.453582585554383,4.023658422100736,-0.14089928372658966,27.48990150055793,0.06735749692588355,0.2138472076743245,-3.0763055183254147,0.4440654139383959,-1.7403772653923788,-1.2754199474238674,0.9668775643950572,-0.8399317617648385,1.4774849334014268,2.0618081364035357,-0.36272738141665034,4.010695793256513,-0.14167076432801348,0.0026839302697957436,-9.371807393351306,0.21305636353734536,-3.084238500391132,-2.033929562585699,0.6277432082230259,-1.2774086521261763,0.9654151460791451,1.2896169845673038,-0.6213330522305159,2.0578425178670376,-0.3635835166096004,-0.20824026732848097,9.799954024987995,0.001927544134729647,-9.4394770995488,-3.933336000070634,0.36795436308213453,-2.0378209860015706,0.6266892652878712,0.8478271862520451,-0.9579946036636726,1.2876046169709598,-0.622381932348292,-0.4385558380124866,3.1252530360963187,-0.20902957363895253,9.727095440803785,-24.39299853116923,0.14560539008082107,-3.945831647427578,0.3670958129051266,0.5401393723865626,-1.4652837853715341,0.8465279413973221,-0.9594462102875702,-0.7158528668319186,1.7560140508439177,-0.4394579954122431,3.117128118865868,5.931613369030275,-0.06348590894322362,-24.85229036785742,0.14483305691218587,0.2954214854048311,-2.426773091101086,0.5391627142570874,-1.4676668041485001,-1.0918457530417336,1.127228815489472,-0.716997473345767,1.7529293965783284,2.54042068751971,-0.27825619134762675,5.904366650826452,-0.06424537620332055,0.07942732899460483,-5.407036717311006,0.29459927451549317,-2.4319935629392253,-1.6929977016726279,0.7401179420912916,-1.0935052095118138,1.1255128032276303,1.5163883774290192,-0.5198243968906907,2.5347936257241965,-0.2790713091600555,-0.1294449969531783,39.81272271341742,0.07866622070905273,-5.4300006425664975,-2.9625357136680615,0.4576004027687447,-1.6959258073914247,0.7389478879346532,0.9888822789468112,-0.8209261311840347,1.5138956035620632,-0.5207855446626372,-0.3500499332421054,4.211975726083864,-0.13021412842674768,38.64813060677801,-8.467839959346001,0.2248443645504453,-2.9699471812906313,0.45668595203536555,0.6435366967366217,-1.2482229209513342,0.9873873576649751,-0.8221930409631721,-0.6058493817907937,2.1181238992421982,-0.3508992235941409,4.1978455806015,11.026807603059073,0.01317694726566176,-8.523186701252275,0.22404987855094888,0.3807795888359379,-1.9811564570042035,0.6424675871739499,-1.250159620909936,-0.9366515727401832,1.3179433738394573,-0.6068838707930275,2.113980684758791,3.250787954744499,-0.19731648659132708,10.934849315299958,0.01242044125149762,0.15711184603422393,-3.767360245550473,0.3799137857785475,-1.9848872155907917,-1.4304562440564346,0.8660239382170297,-0.938072548028807,1.3158752364684903,1.8028764840214064,-0.4261024343986795,3.242059871809608,-0.19810243494455357,-0.05219951270312635,-19.41364087412287,0.15633688526719478,-3.7788848030525144,-2.3513347558390527,0.5537705077668676,-1.4327628350791992,0.8647011377425352,1.153099615741908,-0.7001016241405863,1.7996659626163,-0.42699643599473464,-0.26617391323559353,6.336477736187822,-0.052957985853814234,-19.703729436469555,-5.086409820739203,0.30686533808272604,-2.356281803645023,0.5527825858330032,0.7576752160707841,-1.0691050643856659,1.1513390539614212,-0.7012293384473735,-0.5056186412665737,2.6207719349549334,-0.2669840471464747,6.305500357465908,72.12632126839038,0.08999497697677873],"x":[-1.6470993291652855e6,-3.629268267213499e15,-7.258536532779899e15,-1.0887804798346298e16,-1.4517073063912698e16,-1.81463413294791e16,-2.17756095950455e16,-2.54048778606119e16,-2.90341461261783e16,-3.26634143917447e16,-3.6292682657311096e16,-3.9921950922877496e16,-4.3551219188443896e16,-4.7180487454010296e16,-5.0809755719576696e16,-5.4439023985143096e16,-5.8068292250709496e16,-6.1697560516275896e16,-6.5326828781842296e16,-6.8956097047408696e16,-7.25853653129751e16,-7.62146335785415e16,-7.98439018441079e16,-8.34731701096743e16,-8.71024383752407e16,-9.07317066408071e16,-9.43609749063735e16,-9.79902431719399e16,-1.016195114375063e17,-1.0524877970307269e17,-1.0887804796863909e17,-1.1250731623420549e17,-1.1613658449977189e17,-1.1976585276533829e17,-1.2339512103090469e17,-1.2702438929647109e17,-1.3065365756203749e17,-1.3428292582760389e17,-1.3791219409317029e17,-1.4154146235873669e17,-1.451707306243031e17,-1.487999988898695e17,-1.524292671554359e17,-1.560585354210023e17,-1.596878036865687e17,-1.633170719521351e17,-1.669463402177015e17,-1.705756084832679e17,-1.742048767488343e17,-1.778341450144007e17,-1.814634132799671e17,-1.850926815455335e17,-1.887219498110999e17,-1.923512180766663e17,-1.959804863422327e17,-1.996097546077991e17,-2.032390228733655e17,-2.068682911389319e17,-2.104975594044983e17,-2.141268276700647e17,-2.177560959356311e17,-2.213853642011975e17,-2.250146324667639e17,-2.286439007323303e17,-2.322731689978967e17,-2.359024372634631e17,-2.395317055290295e17,-2.431609737945959e17,-2.467902420601623e17,-2.504195103257287e17,-2.540487785912951e17,-2.576780468568615e17,-2.613073151224279e17,-2.649365833879943e17,-2.685658516535607e17,-2.721951199191271e17,-2.758243881846935e17,-2.794536564502599e17,-2.830829247158263e17,-2.867121929813927e17,-2.903414612469591e17,-2.939707295125255e17,-2.975999977780919e17,-3.012292660436583e17,-3.048585343092247e17,-3.084878025747911e17,-3.121170708403575e17,-3.157463391059239e17,-3.193756073714903e17,-3.230048756370567e17,-3.266341439026231e17,-3.302634121681895e17,-3.338926804337559e17,-3.375219486993223e17,-3.411512169648887e17,-3.447804852304551e17,-3.484097534960215e17,-3.520390217615879e17,-3.556682900271543e17,-3.592975582927207e17,-3.629268265582871e17,-3.665560948238535e17,-3.701853630894199e17,-3.738146313549863e17,-3.774438996205527e17,-3.810731678861191e17,-3.847024361516855e17,-3.883317044172519e17,-3.919609726828183e17,-3.955902409483847e17,-3.992195092139511e17,-4.028487774795175e17,-4.064780457450839e17,-4.101073140106503e17,-4.137365822762167e17,-4.173658505417831e17,-4.209951188073495e17,-4.246243870729159e17,-4.282536553384823e17,-4.318829236040487e17,-4.355121918696151e17,-4.391414601351815e17,-4.427707284007479e17,-4.463999966663143e17,-4.500292649318807e17,-4.536585331974471e17,-4.572878014630135e17,-4.609170697285799e17,-4.645463379941463e17,-4.681756062597127e17,-4.718048745252791e17,-4.754341427908455e17,-4.790634110564119e17,-4.826926793219783e17,-4.863219475875447e17,-4.899512158531111e17,-4.935804841186775e17,-4.972097523842439e17,-5.008390206498103e17,-5.044682889153767e17,-5.080975571809431e17,-5.117268254465095e17,-5.153560937120759e17,-5.189853619776423e17,-5.226146302432087e17,-5.262438985087751e17,-5.298731667743415e17,-5.335024350399079e17,-5.371317033054743e17,-5.407609715710407e17,-5.443902398366071e17,-5.480195081021735e17,-5.516487763677399e17,-5.552780446333063e17,-5.589073128988727e17,-5.625365811644391e17,-5.661658494300055e17,-5.697951176955719e17,-5.734243859611383e17,-5.770536542267046e17,-5.806829224922711e17,-5.843121907578374e17,-5.879414590234039e17,-5.915707272889702e17,-5.951999955545367e17,-5.98829263820103e17,-6.024585320856695e17,-6.060878003512358e17,-6.097170686168023e17,-6.133463368823686e17,-6.169756051479351e17,-6.206048734135014e17,-6.242341416790679e17,-6.278634099446342e17,-6.314926782102007e17,-6.35121946475767e17,-6.387512147413335e17,-6.423804830068998e17,-6.460097512724663e17,-6.496390195380326e17,-6.532682878035991e17,-6.568975560691654e17,-6.605268243347319e17,-6.641560926002982e17,-6.677853608658647e17,-6.71414629131431e17,-6.750438973969975e17,-6.786731656625638e17,-6.823024339281303e17,-6.859317021936966e17,-6.895609704592631e17,-6.931902387248294e17,-6.968195069903959e17,-7.004487752559622e17,-7.040780435215287e17,-7.07707311787095e17,-7.113365800526615e17,-7.149658483182278e17,-7.185951165837943e17,-7.222243848493606e17,-7.258536531149271e17,-7.294829213804934e17,-7.331121896460599e17,-7.367414579116262e17,-7.403707261771927e17,-7.43999994442759e17,-7.476292627083255e17,-7.512585309738918e17,-7.548877992394583e17,-7.585170675050246e17,-7.621463357705911e17,-7.657756040361574e17,-7.694048723017239e17,-7.730341405672902e17,-7.766634088328567e17,-7.80292677098423e17,-7.839219453639895e17,-7.875512136295558e17,-7.911804818951223e17,-7.948097501606886e17,-7.984390184262551e17,-8.020682866918214e17,-8.056975549573879e17,-8.093268232229542e17,-8.129560914885207e17,-8.16585359754087e17,-8.202146280196535e17,-8.238438962852198e17,-8.274731645507863e17,-8.311024328163526e17,-8.347317010819191e17,-8.383609693474854e17,-8.419902376130519e17,-8.456195058786182e17,-8.492487741441847e17,-8.52878042409751e17,-8.565073106753175e17,-8.601365789408838e17,-8.637658472064503e17,-8.673951154720166e17,-8.710243837375831e17,-8.746536520031494e17,-8.782829202687159e17,-8.819121885342822e17,-8.855414567998487e17,-8.89170725065415e17,-8.927999933309815e17,-8.964292615965478e17,-9.000585298621143e17,-9.036877981276806e17,-9.073170663932471e17,-9.109463346588134e17,-9.145756029243799e17,-9.182048711899462e17,-9.218341394555127e17,-9.25463407721079e17,-9.290926759866455e17,-9.327219442522118e17,-9.363512125177783e17,-9.399804807833446e17,-9.436097490489111e17,-9.472390173144774e17,-9.508682855800439e17,-9.544975538456102e17,-9.581268221111767e17,-9.61756090376743e17,-9.653853586423095e17,-9.690146269078758e17,-9.726438951734423e17,-9.762731634390086e17,-9.799024317045751e17,-9.835316999701414e17,-9.871609682357079e17,-9.907902365012742e17,-9.944195047668407e17,-9.98048773032407e17,-1.0016780412979735e18,-1.0053073095635398e18,-1.0089365778291063e18,-1.0125658460946726e18,-1.0161951143602391e18,-1.0198243826258054e18,-1.0234536508913719e18,-1.0270829191569382e18,-1.0307121874225047e18,-1.034341455688071e18,-1.0379707239536375e18,-1.0415999922192038e18,-1.0452292604847703e18,-1.0488585287503366e18,-1.0524877970159031e18,-1.0561170652814694e18,-1.0597463335470359e18,-1.0633756018126022e18,-1.0670048700781687e18,-1.070634138343735e18,-1.0742634066093015e18,-1.0778926748748678e18,-1.0815219431404343e18,-1.0851512114060006e18,-1.0887804796715671e18,-1.0924097479371334e18,-1.0960390162026999e18,-1.0996682844682662e18,-1.1032975527338327e18,-1.106926820999399e18,-1.1105560892649655e18,-1.1141853575305318e18,-1.1178146257960983e18,-1.1214438940616646e18,-1.1250731623272311e18,-1.1287024305927974e18,-1.1323316988583639e18,-1.1359609671239302e18,-1.1395902353894967e18,-1.143219503655063e18,-1.1468487719206295e18,-1.1504780401861958e18,-1.1541073084517622e18,-1.1577365767173286e18,-1.161365844982895e18,-1.1649951132484616e18,-1.1686243815140278e18,-1.1722536497795942e18,-1.1758829180451607e18,-1.1795121863107272e18,-1.1831414545762934e18,-1.1867707228418598e18,-1.1903999911074263e18,-1.1940292593729928e18,-1.197658527638559e18,-1.2012877959041254e18,-1.204917064169692e18,-1.2085463324352584e18,-1.2121756007008246e18,-1.215804868966391e18,-1.2194341372319575e18,-1.223063405497524e18,-1.2266926737630902e18,-1.2303219420286566e18,-1.233951210294223e18,-1.2375804785597896e18,-1.2412097468253558e18,-1.2448390150909222e18,-1.2484682833564887e18,-1.2520975516220552e18,-1.2557268198876214e18,-1.2593560881531878e18,-1.2629853564187543e18,-1.2666146246843208e18,-1.270243892949887e18,-1.2738731612154534e18,-1.27750242948102e18,-1.2811316977465864e18,-1.2847609660121526e18,-1.288390234277719e18,-1.2920195025432855e18,-1.295648770808852e18,-1.2992780390744182e18,-1.3029073073399846e18,-1.306536575605551e18,-1.3101658438711176e18,-1.3137951121366838e18,-1.3174243804022502e18,-1.3210536486678167e18,-1.3246829169333832e18,-1.3283121851989494e18,-1.3319414534645158e18,-1.3355707217300823e18,-1.3391999899956488e18,-1.342829258261215e18,-1.3464585265267814e18,-1.350087794792348e18,-1.3537170630579144e18,-1.3573463313234806e18,-1.360975599589047e18,-1.3646048678546135e18,-1.36823413612018e18,-1.3718634043857462e18,-1.3754926726513126e18,-1.379121940916879e18,-1.3827512091824456e18,-1.3863804774480118e18,-1.3900097457135782e18,-1.3936390139791447e18,-1.3972682822447112e18,-1.4008975505102774e18,-1.4045268187758438e18,-1.4081560870414103e18,-1.4117853553069768e18,-1.415414623572543e18,-1.4190438918381094e18,-1.422673160103676e18,-1.4263024283692424e18,-1.4299316966348086e18,-1.433560964900375e18,-1.4371902331659415e18,-1.440819501431508e18,-1.4444487696970742e18,-1.4480780379626406e18,-1.451707306228207e18,-1.4553365744937736e18,-1.4589658427593398e18,-1.4625951110249062e18,-1.4662243792904727e18,-1.4698536475560392e18,-1.4734829158216054e18,-1.4771121840871718e18,-1.4807414523527383e18,-1.4843707206183048e18,-1.487999988883871e18,-1.4916292571494374e18,-1.495258525415004e18,-1.4988877936805704e18,-1.5025170619461366e18,-1.506146330211703e18,-1.5097755984772695e18,-1.513404866742836e18,-1.5170341350084022e18,-1.5206634032739686e18,-1.524292671539535e18,-1.5279219398051016e18,-1.5315512080706678e18,-1.5351804763362342e18,-1.5388097446018007e18,-1.5424390128673672e18,-1.5460682811329334e18,-1.5496975493984998e18,-1.5533268176640663e18,-1.5569560859296328e18,-1.560585354195199e18,-1.5642146224607654e18,-1.567843890726332e18,-1.5714731589918984e18,-1.5751024272574646e18,-1.578731695523031e18,-1.5823609637885975e18,-1.585990232054164e18,-1.5896195003197302e18,-1.5932487685852966e18,-1.596878036850863e18,-1.6005073051164296e18,-1.6041365733819958e18,-1.6077658416475622e18,-1.6113951099131287e18,-1.6150243781786952e18,-1.6186536464442614e18,-1.6222829147098278e18,-1.6259121829753943e18,-1.6295414512409608e18,-1.633170719506527e18,-1.6367999877720934e18,-1.64042925603766e18,-1.6440585243032264e18,-1.6476877925687926e18,-1.651317060834359e18,-1.6549463290999255e18,-1.658575597365492e18,-1.6622048656310582e18,-1.6658341338966246e18,-1.669463402162191e18,-1.6730926704277576e18,-1.6767219386933238e18,-1.6803512069588902e18,-1.6839804752244567e18,-1.6876097434900232e18,-1.6912390117555894e18,-1.6948682800211558e18,-1.6984975482867223e18,-1.7021268165522888e18,-1.705756084817855e18,-1.7093853530834214e18,-1.713014621348988e18,-1.7166438896145544e18,-1.7202731578801206e18,-1.723902426145687e18,-1.7275316944112535e18,-1.73116096267682e18,-1.7347902309423862e18,-1.7384194992079526e18,-1.742048767473519e18,-1.7456780357390856e18,-1.7493073040046518e18,-1.7529365722702182e18,-1.7565658405357847e18,-1.7601951088013512e18,-1.7638243770669174e18,-1.7674536453324838e18,-1.7710829135980503e18,-1.7747121818636168e18,-1.778341450129183e18,-1.7819707183947494e18,-1.785599986660316e18,-1.7892292549258824e18,-1.7928585231914486e18,-1.796487791457015e18,-1.8001170597225815e18,-1.803746327988148e18,-1.8073755962537142e18,-1.8110048645192806e18]}
},{}],81:[function(require,module,exports){
module.exports={"expected":[-1.5574683526225443e10,5.587338660314116,1.228130371084109,5.209966300132765,1.1971698789752672,16.48870322285259,1.5710454834675027,0.5433073779153454,-0.008576071361507637,-0.565733172800654,-0.16415206674538993,-0.7905746769201181,-2.3947934298413607,8.996205298877253,1.4097527357809196,0.4800495892589337,-0.05877352254062065,-0.6338979295237362,-1.8324131233156513,149.0632949830762,-0.7744927625480983,-2.329181731823926,9.893999272084761,1.4399757260067327,0.49238180329271714,-0.04877037917645033,-0.6200031913401687,-1.7897268380433717,-306.20611515868507,4.669619583926926,1.1465536143397732,0.36197176321652497,-0.16031895695597964,-0.7845234279146119,-2.3698622606834086,9.312844451916682,1.4209692090495758,0.484653345701541,-0.05502662206971419,-0.6286747231591079,-4.662967038186052,3.2907990354380563,0.9687368063792253,0.26950821541016834,-0.24791235488719227,-0.9302508582768911,-3.066289675266065,5.171354757596883,1.1938131725995786,0.3847010602419294,-0.13992032705027851,-0.752789602530563,-2.2438203518979933,11.46255404632474,1.4829621017372419,0.5095312776461172,-0.03503706749476021,-0.6011831464310573,-1.73348258067015,-58.90523853556244,1.8780104815855534,0.6483843264113162,0.06908189717938841,-0.4674789199487733,-1.3795195771318143,-8.226160167767327,2.465682882687222,0.8073946543051345,0.17471320058200243,-0.3462149773411211,-1.11465675555053,-4.369895255441878,3.460640836210778,0.9956704590549951,0.2842684510819034,-0.23340914762886095,-0.9049989501318534,-2.9294309720959277,5.5807310940102175,1.2276154901180707,0.40052338818795974,-0.12596879754402476,-0.7315298480856334,-2.1635540951512424,13.61602649037796,1.5277326852074122,0.5269220367736835,-0.021316943185063757,-0.5826708007439929,-1.6798496477018021,-32.580244049482566,1.941714279946859,0.6680325354944262,0.08287026863943113,-0.4508793128071,-1.3404575462210304,-7.380122258477694,2.566139118779895,0.8302953165507567,0.18887549827933403,-0.3309342907988016,-1.0843756424037374,-4.109954852889932,3.6474016429174902,1.0233496052225104,0.29914418665890274,-0.21899846517858698,-0.8803659851181699,-2.8031408926101133,6.0579412052018,1.2625751030192256,0.41652044046960585,-0.11206537403413316,-0.710692295523539,-2.0879123923113245,16.758026826536327,1.5744188334775129,0.5445658873346506,-0.00760483602269427,-0.5644518772708695,-1.628631492425065,-22.511355692990925,2.008902513029162,0.6880439733629965,0.09669000682747408,-0.43448366593893656,-1.3028053327409295,-6.6895586506099765,2.6739214956489983,0.8537233500611755,0.20311133183827265,-0.3157916371095313,-1.0549816983384037,-3.877745609796052,3.853823739902488,1.0518164803507255,0.3141424424136661,-0.20467405821623602,-0.8563205545190524,-2.6861984196759345,6.62159924121267,1.2987663196316221,0.43270124268987437,-0.09820460751877158,-0.690256886450168,-2.0164806718050885,21.774424003710433,1.6231648956059535,0.5624751753344885,0.006104412150106737,-0.546512765290331,-1.5796506161799684,-17.19177968995876,2.079896537200291,0.7084365423695697,0.11054643278331469,-0.4182821910284134,-1.2664745525057852,-6.115021340991143,-0.9256718133903095,0.877706303027458,5.240492753875746,-0.3007795374271959,0.387528248833534,-3.6689801035044955,-0.7489420584931262,1.081116368530435,11.797738110563106,-0.19042981653109767,0.5126343266242489,-2.577563395349613,-0.5978384696871841,1.3362697382316504,-51.44663179082762,-0.08438111436637798,0.6518846506751811,-1.9488922625151113,-0.4644842919144628,1.6741298676052738,-8.060557767870382,0.019815955190485252,0.8114670245000142,-1.5327463088348297,-0.34346202069658127,2.1550582118123405,-4.320977289182917,0.12444492350356004,1.0005820079979837,-1.2313838786899434,-0.23081620742376485,2.9151181369142765,-2.906025302009314,0.23182760821348142,1.233802467352524,-0.9986626738772569,-0.12347014242149776,4.339940554918274,-2.1496507252947548,0.34453565576042533,1.5359664865397735,-0.8098760745683832,-0.018855566485854125,8.12438737234412,-1.6704850092211534,0.4656519649029451,1.953507294962619,-0.6505175080727836,0.08534805827411657,54.12062632229176,-1.33359888885118,0.5991423731753085,2.584919908356432,-0.5114226028911968,0.19142484250035072,-11.664661990125468,-1.0790364021778716,0.7504416611807324,3.682912570477792,-0.3864244539670424,0.30182672211830575,-5.2133044315901405,-0.8760081272240751,0.9274560482673563,6.1520979010790615,-0.2711181983869177,0.41941064101081604,-3.3086353273589433,-0.7069956702413455,1.1424133153991707,17.481261369781876,-0.16215801843875455,0.5477601878860738,-2.381772229912707,-0.5612120947105607,1.4155712374879936,-21.327629077742653,-0.05682468968824744,0.6916752670418407,-1.8239789082523048,-0.43156193919822766,1.783437554112171,-6.578818099375184,0.047266566325789336,0.857985929104037,-1.4445970941988495,-0.31308798940857524,2.3195753948919906,-3.83866148236807,0.15238993806154488,1.057012285259274,-1.1646287326259817,-0.20211189144198052,3.198231754647198,-2.6661174226566478,0.2609113688169268,1.3053980661353615,-0.9453463690056622,-0.09572109148975978,4.957408876161408,-2.00407740596764,0.3755087106420395,1.6321434359545235,-0.7654499035499825,0.008564928552134775,10.488837620007999,-1.5710841266177036,0.49945516607734813,2.0930678900951314,-0.6121712088913907,0.11303756530529468,-111.81744229489365,-1.2600877081425301,0.6370346907800367,2.811667398905185,-0.47730315551886066,0.2200047500964154,-8.816740127449737,-1.021386118191941,0.7942121102782298,4.127199491166658,-0.3552348710492266,0.33199979940612573,-4.537178744135983,-0.8286747429450917,0.979802656285593,7.4337514489773415,-0.24189469149481665,0.4520350096242188,-3.008245038283209,-0.6666449652317523,1.2076754335105668,33.633183173942705,-0.134136566076633,0.5839574857257436,-2.2099908731590134,-0.5256960776521643,1.501278703868694,-13.439389530505206,-0.029354019938418546,0.733004660365341,-1.710967158476543,-0.39940977935130856,1.9039877359551052,-5.550035807767233,0.07478843729973507,0.9067467854396709,-1.3631662947313445,-0.28323112554222757,2.5064458116751824,-3.448224703711359,0.18056951313368394,1.1168118903334177,-1.1020059003729064,-0.17372403186714153,3.5357848321373164,-2.4589023124068903,0.2904143453225437,1.3823103115046738,-28.07440542310635,-0.06811734959151204,5.769193516272648,-0.2824142414382342,-0.44497125452238273,1.7373338734975405,-0.7228506064458289,1.1185131215929922,0.8386425819834051,-1.4798951626017083,0.5341972679110045,-2.453582585554383,-4.023658422100736,0.14089928372658966,-27.48990150055793,-0.06735749692588355,-0.2138472076743245,3.0763055183254147,-0.4440654139383959,1.7403772653923788,1.2754199474238674,-0.9668775643950572,0.8399317617648385,-1.4774849334014268,-2.0618081364035357,0.36272738141665034,-4.010695793256513,0.14167076432801348,-0.0026839302697957436,9.371807393351306,-0.21305636353734536,3.084238500391132,2.033929562585699,-0.6277432082230259,1.2774086521261763,-0.9654151460791451,-1.2896169845673038,0.6213330522305159,-2.0578425178670376,0.3635835166096004,0.20824026732848097,-9.799954024987995,-0.001927544134729647,9.4394770995488,3.933336000070634,-0.36795436308213453,2.0378209860015706,-0.6266892652878712,-0.8478271862520451,0.9579946036636726,-1.2876046169709598,0.622381932348292,0.4385558380124866,-3.1252530360963187,0.20902957363895253,-9.727095440803785,24.39299853116923,-0.14560539008082107,3.945831647427578,-0.3670958129051266,-0.5401393723865626,1.4652837853715341,-0.8465279413973221,0.9594462102875702,0.7158528668319186,-1.7560140508439177,0.4394579954122431,-3.117128118865868,-5.931613369030275,0.06348590894322362,24.85229036785742,-0.14483305691218587,-0.2954214854048311,2.426773091101086,-0.5391627142570874,1.4676668041485001,1.0918457530417336,-1.127228815489472,0.716997473345767,-1.7529293965783284,-2.54042068751971,0.27825619134762675,-5.904366650826452,0.06424537620332055,-0.07942732899460483,5.407036717311006,-0.29459927451549317,2.4319935629392253,1.6929977016726279,-0.7401179420912916,1.0935052095118138,-1.1255128032276303,-1.5163883774290192,0.5198243968906907,-2.5347936257241965,0.2790713091600555,0.1294449969531783,-39.81272271341742,-0.07866622070905273,5.4300006425664975,2.9625357136680615,-0.4576004027687447,1.6959258073914247,-0.7389478879346532,-0.9888822789468112,0.8209261311840347,-1.5138956035620632,0.5207855446626372,0.3500499332421054,-4.211975726083864,0.13021412842674768,-38.64813060677801,8.467839959346001,-0.2248443645504453,2.9699471812906313,-0.45668595203536555,-0.6435366967366217,1.2482229209513342,-0.9873873576649751,0.8221930409631721,0.6058493817907937,-2.1181238992421982,0.3508992235941409,-4.1978455806015,-11.026807603059073,-0.01317694726566176,8.523186701252275,-0.22404987855094888,-0.3807795888359379,1.9811564570042035,-0.6424675871739499,1.250159620909936,0.9366515727401832,-1.3179433738394573,0.6068838707930275,-2.113980684758791,-3.250787954744499,0.19731648659132708,-10.934849315299958,-0.01242044125149762,-0.15711184603422393,3.767360245550473,-0.3799137857785475,1.9848872155907917,1.4304562440564346,-0.8660239382170297,0.938072548028807,-1.3158752364684903,-1.8028764840214064,0.4261024343986795,-3.242059871809608,0.19810243494455357,0.05219951270312635,19.41364087412287,-0.15633688526719478,3.7788848030525144,2.3513347558390527,-0.5537705077668676,1.4327628350791992,-0.8647011377425352,-1.153099615741908,0.7001016241405863,-1.7996659626163,0.42699643599473464,0.26617391323559353,-6.336477736187822,0.052957985853814234,19.703729436469555,5.086409820739203,-0.30686533808272604,2.356281803645023,-0.5527825858330032,-0.7576752160707841,1.0691050643856659,-1.1513390539614212,0.7012293384473735,0.5056186412665737,-2.6207719349549334,0.2669840471464747,-6.305500357465908,-72.12632126839038,-0.08999497697677873],"x":[1.6470993291652855e6,3.629268267213499e15,7.258536532779899e15,1.0887804798346298e16,1.4517073063912698e16,1.81463413294791e16,2.17756095950455e16,2.54048778606119e16,2.90341461261783e16,3.26634143917447e16,3.6292682657311096e16,3.9921950922877496e16,4.3551219188443896e16,4.7180487454010296e16,5.0809755719576696e16,5.4439023985143096e16,5.8068292250709496e16,6.1697560516275896e16,6.5326828781842296e16,6.8956097047408696e16,7.25853653129751e16,7.62146335785415e16,7.98439018441079e16,8.34731701096743e16,8.71024383752407e16,9.07317066408071e16,9.43609749063735e16,9.79902431719399e16,1.016195114375063e17,1.0524877970307269e17,1.0887804796863909e17,1.1250731623420549e17,1.1613658449977189e17,1.1976585276533829e17,1.2339512103090469e17,1.2702438929647109e17,1.3065365756203749e17,1.3428292582760389e17,1.3791219409317029e17,1.4154146235873669e17,1.451707306243031e17,1.487999988898695e17,1.524292671554359e17,1.560585354210023e17,1.596878036865687e17,1.633170719521351e17,1.669463402177015e17,1.705756084832679e17,1.742048767488343e17,1.778341450144007e17,1.814634132799671e17,1.850926815455335e17,1.887219498110999e17,1.923512180766663e17,1.959804863422327e17,1.996097546077991e17,2.032390228733655e17,2.068682911389319e17,2.104975594044983e17,2.141268276700647e17,2.177560959356311e17,2.213853642011975e17,2.250146324667639e17,2.286439007323303e17,2.322731689978967e17,2.359024372634631e17,2.395317055290295e17,2.431609737945959e17,2.467902420601623e17,2.504195103257287e17,2.540487785912951e17,2.576780468568615e17,2.613073151224279e17,2.649365833879943e17,2.685658516535607e17,2.721951199191271e17,2.758243881846935e17,2.794536564502599e17,2.830829247158263e17,2.867121929813927e17,2.903414612469591e17,2.939707295125255e17,2.975999977780919e17,3.012292660436583e17,3.048585343092247e17,3.084878025747911e17,3.121170708403575e17,3.157463391059239e17,3.193756073714903e17,3.230048756370567e17,3.266341439026231e17,3.302634121681895e17,3.338926804337559e17,3.375219486993223e17,3.411512169648887e17,3.447804852304551e17,3.484097534960215e17,3.520390217615879e17,3.556682900271543e17,3.592975582927207e17,3.629268265582871e17,3.665560948238535e17,3.701853630894199e17,3.738146313549863e17,3.774438996205527e17,3.810731678861191e17,3.847024361516855e17,3.883317044172519e17,3.919609726828183e17,3.955902409483847e17,3.992195092139511e17,4.028487774795175e17,4.064780457450839e17,4.101073140106503e17,4.137365822762167e17,4.173658505417831e17,4.209951188073495e17,4.246243870729159e17,4.282536553384823e17,4.318829236040487e17,4.355121918696151e17,4.391414601351815e17,4.427707284007479e17,4.463999966663143e17,4.500292649318807e17,4.536585331974471e17,4.572878014630135e17,4.609170697285799e17,4.645463379941463e17,4.681756062597127e17,4.718048745252791e17,4.754341427908455e17,4.790634110564119e17,4.826926793219783e17,4.863219475875447e17,4.899512158531111e17,4.935804841186775e17,4.972097523842439e17,5.008390206498103e17,5.044682889153767e17,5.080975571809431e17,5.117268254465095e17,5.153560937120759e17,5.189853619776423e17,5.226146302432087e17,5.262438985087751e17,5.298731667743415e17,5.335024350399079e17,5.371317033054743e17,5.407609715710407e17,5.443902398366071e17,5.480195081021735e17,5.516487763677399e17,5.552780446333063e17,5.589073128988727e17,5.625365811644391e17,5.661658494300055e17,5.697951176955719e17,5.734243859611383e17,5.770536542267046e17,5.806829224922711e17,5.843121907578374e17,5.879414590234039e17,5.915707272889702e17,5.951999955545367e17,5.98829263820103e17,6.024585320856695e17,6.060878003512358e17,6.097170686168023e17,6.133463368823686e17,6.169756051479351e17,6.206048734135014e17,6.242341416790679e17,6.278634099446342e17,6.314926782102007e17,6.35121946475767e17,6.387512147413335e17,6.423804830068998e17,6.460097512724663e17,6.496390195380326e17,6.532682878035991e17,6.568975560691654e17,6.605268243347319e17,6.641560926002982e17,6.677853608658647e17,6.71414629131431e17,6.750438973969975e17,6.786731656625638e17,6.823024339281303e17,6.859317021936966e17,6.895609704592631e17,6.931902387248294e17,6.968195069903959e17,7.004487752559622e17,7.040780435215287e17,7.07707311787095e17,7.113365800526615e17,7.149658483182278e17,7.185951165837943e17,7.222243848493606e17,7.258536531149271e17,7.294829213804934e17,7.331121896460599e17,7.367414579116262e17,7.403707261771927e17,7.43999994442759e17,7.476292627083255e17,7.512585309738918e17,7.548877992394583e17,7.585170675050246e17,7.621463357705911e17,7.657756040361574e17,7.694048723017239e17,7.730341405672902e17,7.766634088328567e17,7.80292677098423e17,7.839219453639895e17,7.875512136295558e17,7.911804818951223e17,7.948097501606886e17,7.984390184262551e17,8.020682866918214e17,8.056975549573879e17,8.093268232229542e17,8.129560914885207e17,8.16585359754087e17,8.202146280196535e17,8.238438962852198e17,8.274731645507863e17,8.311024328163526e17,8.347317010819191e17,8.383609693474854e17,8.419902376130519e17,8.456195058786182e17,8.492487741441847e17,8.52878042409751e17,8.565073106753175e17,8.601365789408838e17,8.637658472064503e17,8.673951154720166e17,8.710243837375831e17,8.746536520031494e17,8.782829202687159e17,8.819121885342822e17,8.855414567998487e17,8.89170725065415e17,8.927999933309815e17,8.964292615965478e17,9.000585298621143e17,9.036877981276806e17,9.073170663932471e17,9.109463346588134e17,9.145756029243799e17,9.182048711899462e17,9.218341394555127e17,9.25463407721079e17,9.290926759866455e17,9.327219442522118e17,9.363512125177783e17,9.399804807833446e17,9.436097490489111e17,9.472390173144774e17,9.508682855800439e17,9.544975538456102e17,9.581268221111767e17,9.61756090376743e17,9.653853586423095e17,9.690146269078758e17,9.726438951734423e17,9.762731634390086e17,9.799024317045751e17,9.835316999701414e17,9.871609682357079e17,9.907902365012742e17,9.944195047668407e17,9.98048773032407e17,1.0016780412979735e18,1.0053073095635398e18,1.0089365778291063e18,1.0125658460946726e18,1.0161951143602391e18,1.0198243826258054e18,1.0234536508913719e18,1.0270829191569382e18,1.0307121874225047e18,1.034341455688071e18,1.0379707239536375e18,1.0415999922192038e18,1.0452292604847703e18,1.0488585287503366e18,1.0524877970159031e18,1.0561170652814694e18,1.0597463335470359e18,1.0633756018126022e18,1.0670048700781687e18,1.070634138343735e18,1.0742634066093015e18,1.0778926748748678e18,1.0815219431404343e18,1.0851512114060006e18,1.0887804796715671e18,1.0924097479371334e18,1.0960390162026999e18,1.0996682844682662e18,1.1032975527338327e18,1.106926820999399e18,1.1105560892649655e18,1.1141853575305318e18,1.1178146257960983e18,1.1214438940616646e18,1.1250731623272311e18,1.1287024305927974e18,1.1323316988583639e18,1.1359609671239302e18,1.1395902353894967e18,1.143219503655063e18,1.1468487719206295e18,1.1504780401861958e18,1.1541073084517622e18,1.1577365767173286e18,1.161365844982895e18,1.1649951132484616e18,1.1686243815140278e18,1.1722536497795942e18,1.1758829180451607e18,1.1795121863107272e18,1.1831414545762934e18,1.1867707228418598e18,1.1903999911074263e18,1.1940292593729928e18,1.197658527638559e18,1.2012877959041254e18,1.204917064169692e18,1.2085463324352584e18,1.2121756007008246e18,1.215804868966391e18,1.2194341372319575e18,1.223063405497524e18,1.2266926737630902e18,1.2303219420286566e18,1.233951210294223e18,1.2375804785597896e18,1.2412097468253558e18,1.2448390150909222e18,1.2484682833564887e18,1.2520975516220552e18,1.2557268198876214e18,1.2593560881531878e18,1.2629853564187543e18,1.2666146246843208e18,1.270243892949887e18,1.2738731612154534e18,1.27750242948102e18,1.2811316977465864e18,1.2847609660121526e18,1.288390234277719e18,1.2920195025432855e18,1.295648770808852e18,1.2992780390744182e18,1.3029073073399846e18,1.306536575605551e18,1.3101658438711176e18,1.3137951121366838e18,1.3174243804022502e18,1.3210536486678167e18,1.3246829169333832e18,1.3283121851989494e18,1.3319414534645158e18,1.3355707217300823e18,1.3391999899956488e18,1.342829258261215e18,1.3464585265267814e18,1.350087794792348e18,1.3537170630579144e18,1.3573463313234806e18,1.360975599589047e18,1.3646048678546135e18,1.36823413612018e18,1.3718634043857462e18,1.3754926726513126e18,1.379121940916879e18,1.3827512091824456e18,1.3863804774480118e18,1.3900097457135782e18,1.3936390139791447e18,1.3972682822447112e18,1.4008975505102774e18,1.4045268187758438e18,1.4081560870414103e18,1.4117853553069768e18,1.415414623572543e18,1.4190438918381094e18,1.422673160103676e18,1.4263024283692424e18,1.4299316966348086e18,1.433560964900375e18,1.4371902331659415e18,1.440819501431508e18,1.4444487696970742e18,1.4480780379626406e18,1.451707306228207e18,1.4553365744937736e18,1.4589658427593398e18,1.4625951110249062e18,1.4662243792904727e18,1.4698536475560392e18,1.4734829158216054e18,1.4771121840871718e18,1.4807414523527383e18,1.4843707206183048e18,1.487999988883871e18,1.4916292571494374e18,1.495258525415004e18,1.4988877936805704e18,1.5025170619461366e18,1.506146330211703e18,1.5097755984772695e18,1.513404866742836e18,1.5170341350084022e18,1.5206634032739686e18,1.524292671539535e18,1.5279219398051016e18,1.5315512080706678e18,1.5351804763362342e18,1.5388097446018007e18,1.5424390128673672e18,1.5460682811329334e18,1.5496975493984998e18,1.5533268176640663e18,1.5569560859296328e18,1.560585354195199e18,1.5642146224607654e18,1.567843890726332e18,1.5714731589918984e18,1.5751024272574646e18,1.578731695523031e18,1.5823609637885975e18,1.585990232054164e18,1.5896195003197302e18,1.5932487685852966e18,1.596878036850863e18,1.6005073051164296e18,1.6041365733819958e18,1.6077658416475622e18,1.6113951099131287e18,1.6150243781786952e18,1.6186536464442614e18,1.6222829147098278e18,1.6259121829753943e18,1.6295414512409608e18,1.633170719506527e18,1.6367999877720934e18,1.64042925603766e18,1.6440585243032264e18,1.6476877925687926e18,1.651317060834359e18,1.6549463290999255e18,1.658575597365492e18,1.6622048656310582e18,1.6658341338966246e18,1.669463402162191e18,1.6730926704277576e18,1.6767219386933238e18,1.6803512069588902e18,1.6839804752244567e18,1.6876097434900232e18,1.6912390117555894e18,1.6948682800211558e18,1.6984975482867223e18,1.7021268165522888e18,1.705756084817855e18,1.7093853530834214e18,1.713014621348988e18,1.7166438896145544e18,1.7202731578801206e18,1.723902426145687e18,1.7275316944112535e18,1.73116096267682e18,1.7347902309423862e18,1.7384194992079526e18,1.742048767473519e18,1.7456780357390856e18,1.7493073040046518e18,1.7529365722702182e18,1.7565658405357847e18,1.7601951088013512e18,1.7638243770669174e18,1.7674536453324838e18,1.7710829135980503e18,1.7747121818636168e18,1.778341450129183e18,1.7819707183947494e18,1.785599986660316e18,1.7892292549258824e18,1.7928585231914486e18,1.796487791457015e18,1.8001170597225815e18,1.803746327988148e18,1.8073755962537142e18,1.8110048645192806e18]}
},{}],82:[function(require,module,exports){
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PI = require( '@stdlib/constants/float64/pi' );
var EPS = require( '@stdlib/constants/float64/eps' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var cot = require( './../lib' );


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


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.true( typeof cot, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the cotangent (huge negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugeNegative.x;
	expected = hugeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (huge positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugePositive.x;
	expected = hugePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (very large positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = veryLargePositive.x;
	expected = veryLargePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (very large negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = veryLargeNegative.x;
	expected = veryLargeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (large positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (large negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (medium positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (medium negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (small positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (small negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (smaller values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smaller.x;
	expected = smaller.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (tiny positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the cotangent (tiny negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = cot( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.4 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'if provided a multiple of `-pi`, the function does not return `~+infinity` due to floating-point rounding errors', function test( t ) {
	t.notEqual( cot( -PI ), PINF, 'returns expected value' );
	t.end();
});

tape( 'if provided a multiple of `pi`, the function does not return `~-infinity`', function test( t ) {
	t.notEqual( cot( PI ), NINF, 'returns expected value' );
	t.end();
});

tape( 'if provided a `NaN`, the function returns `NaN`', function test( t ) {
	var v = cot( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `NaN`', function test( t ) {
	var v = cot( PINF );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `NaN`', function test( t ) {
	var v = cot( NINF );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/cot/test/test.js")
},{"./../lib":67,"./fixtures/julia/huge_negative.json":69,"./fixtures/julia/huge_positive.json":70,"./fixtures/julia/large_negative.json":71,"./fixtures/julia/large_positive.json":72,"./fixtures/julia/medium_negative.json":73,"./fixtures/julia/medium_positive.json":74,"./fixtures/julia/small_negative.json":75,"./fixtures/julia/small_positive.json":76,"./fixtures/julia/smaller.json":77,"./fixtures/julia/tiny_negative.json":78,"./fixtures/julia/tiny_positive.json":79,"./fixtures/julia/very_large_negative.json":80,"./fixtures/julia/very_large_positive.json":81,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pi":53,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63,"tape":232}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Compute the tangent of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-tan
*
* @example
* var kernelTan = require( '@stdlib/math/base/special/kernel-tan' );
*
* var out = kernelTan( 3.141592653589793/4.0, 0.0, 1 );
* // returns ~1.0
*
* out = kernelTan( 3.141592653589793/4.0, 0.0, -1 );
* // returns ~-1.0
*
* out = kernelTan( 3.141592653589793/6.0, 0.0, 1 );
* // returns ~0.577
*
* out = kernelTan( 0.664, 5.288e-17, 1 );
* // returns ~0.783
*/

// MODULES //

var kernelTan = require( './kernel_tan.js' );


// EXPORTS //

module.exports = kernelTan;

},{"./kernel_tan.js":86}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_tan.c}. The implementation follows the original, but has been modified for JavaScript.
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
var polyvalOdd = require( './polyval_t_odd.js' );
var polyvalEven = require( './polyval_t_even.js' );


// VARIABLES //

var PIO4 = 7.85398163397448278999e-01;
var PIO4LO = 3.06161699786838301793e-17;
var T0 = 3.33333333333334091986e-01; // 3FD55555, 55555563

// Absolute value mask: 2147483647 => 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation


// MAIN //

/**
* Computes the tangent on \\( \approx\[-\pi/4, \pi/4] \\) (except on -0), \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* -   Since \\( \tan(-x) = -\tan(x) \\), we need only to consider positive \\( x \\).
*
* -   Callers must return \\( \tan(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\( -0 \\). Callers may do the optimization \\( \tan(x) \approx x \\) for tiny \\( x \\).
*
* -   \\( \tan(x) \\) is approximated by a odd polynomial of degree 27 on \\( \[0, 0.67434] \\)
*
*     ```tex
*     \tan(x) \approx x + T_1 x^3 + \ldots + T_{13} x^{27}
*     ```
*     where
*
*     ```tex
*     \left| \frac{\tan(x)}{x} - \left( 1 + T_1 x^2 + T_2 x^4 + \ldots + T_{13} x^{26} \right) \right|  \le 2^{-59.2}
*     ```
*
* -   Note: \\( \tan(x+y) = \tan(x) + \tan'(x) \cdot y \approx \tan(x) + ( 1 + x \cdot x ) \cdot y \\). Therefore, for better accuracy in computing \\( \tan(x+y) \\), let
*
*     ```tex
*     r = x^3 \cdot \left( T_2+x^2 \cdot (T_3+x^2 \cdot (\ldots+x^2 \cdot (T_{12}+x^2 \cdot T_{13}))) \right)
*     ```
*
*     then
*
*     ```tex
*     \tan(x+y) = x^3 + \left( T_1 \cdot x^2 + (x \cdot (r+y)+y) \right)
*     ```
*
* -   For \\( x \\) in \\( \[0.67434, \pi/4] \\),  let \\( y = \pi/4 - x \\), then
*
*     ```tex
*     \tan(x) = \tan\left(\tfrac{\pi}{4}-y\right) = \frac{1-\tan(y)}{1+\tan(y)} \\
*     = 1 - 2 \cdot \left( \tan(y) - \tfrac{\tan(y)^2}{1+\tan(y)} \right)
*     ```
*
*
* @param {number} x - input value (in radians, assumed to be bounded by ~π/4 in magnitude)
* @param {number} y - tail of `x`
* @param {integer} k - indicates whether tan (if k = 1) or -1/tan (if k = -1) is returned
* @returns {number} tangent
*
* @example
* var out = kernelTan( 3.141592653589793/4.0, 0.0, 1 );
* // returns ~1.0
*
* @example
* var out = kernelTan( 3.141592653589793/4.0, 0.0, -1 );
* // returns ~-1.0
*
* @example
* var out = kernelTan( 3.141592653589793/6.0, 0.0, 1 );
* // returns ~0.577
*
* @example
* var out = kernelTan( 0.664, 5.288e-17, 1 );
* // returns ~0.783
*
* @example
* var out = kernelTan( NaN, 0.0, 1 );
* // returns NaN
*
* @example
* var out = kernelTan( 3.0, NaN, 1 );
* // returns NaN
*
* @example
* var out = kernelTan( NaN, NaN, 1 );
* // returns NaN
*/
function kernelTan( x, y, k ) {
	var hx;
	var ix;
	var a;
	var r;
	var s;
	var t;
	var v;
	var w;
	var z;

	hx = getHighWord( x );

	// High word of |x|:
	ix = (hx & HIGH_WORD_ABS_MASK)|0; // asm type annotation

	// Case: |x| >= 0.6744
	if ( ix >= 0x3FE59428 ) {
		if ( x < 0 ) {
			x = -x;
			y = -y;
		}
		z = PIO4 - x;
		w = PIO4LO - y;
		x = z + w;
		y = 0.0;
	}
	z = x * x;
	w = z * z;

	// Break x^5*(T[1]+x^2*T[2]+...) into x^5(T[1]+x^4*T[3]+...+x^20*T[11]) + x^5(x^2*(T[2]+x^4*T[4]+...+x^22*T[12]))...
	r = polyvalOdd( w );
	v = z * polyvalEven( w );
	s = z * x;
	r = y + (z * ((s * (r + v)) + y));
	r += T0 * s;
	w = x + r;
	if ( ix >= 0x3FE59428 ) {
		v = k;
		return ( 1.0 - ( (hx >> 30) & 2 ) ) * ( v - (2.0 * (x - ((w * w / (w + v)) - r)) )); // eslint-disable-line max-len
	}
	if ( k === 1 ) {
		return w;
	}
	// Compute -1/(x+r) accurately...
	z = w;
	setLowWord( z, 0 );
	v = r - (z - x); // z + v = r + x
	a = -1.0 / w; // a = -1/w
	t = a;
	setLowWord( t, 0 );
	s = 1.0 + (t * z);
	return t + (a * (s + (t * v)));
}


// EXPORTS //

module.exports = kernelTan;

},{"./polyval_t_even.js":87,"./polyval_t_odd.js":88,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/set-low-word":115}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.05396825397622605;
	}
	return 0.05396825397622605 + (x * (0.0088632398235993 + (x * (0.0014562094543252903 + (x * (0.0002464631348184699 + (x * (0.00007140724913826082 + (x * 0.00002590730518636337))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return 0.13333333333320124;
	}
	return 0.13333333333320124 + (x * (0.021869488294859542 + (x * (0.0035920791075913124 + (x * (0.0005880412408202641 + (x * (0.00007817944429395571 + (x * -0.000018558637485527546))))))))); // eslint-disable-line max-len
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":51,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/copysign":65,"@stdlib/number/float64/base/exponent":101,"@stdlib/number/float64/base/from-words":103,"@stdlib/number/float64/base/normalize":112,"@stdlib/number/float64/base/to-words":118}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var rempio2 = require( './rempio2.js' );


// EXPORTS //

module.exports = rempio2;

},{"./rempio2.js":93}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
	}
	// Chop off zero terms...
	if ( z === 0.0 ) {
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
* -   The method is to compute the integer (`mod 8`) and fraction parts of `2x/π` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals `0 mod 8` ). Thus, the number of operations is independent of the exponent of the input.
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

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":83,"@stdlib/math/base/special/ldexp":89}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word significand mask: 0xfffff = 1048575 => 00000000000011111111111111111111
var SIGNIFICAND_MASK = 0xfffff|0; // asm type annotation

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
var TX = [ 0.0, 0.0, 0.0 ]; // WARNING: not thread safe
var TY = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Computes `x - nπ/2 = r`.
*
* ## Notes
*
* -   Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
*
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

},{"./kernel_rempio2.js":92,"./rempio2_medium.js":94,"@stdlib/number/float64/base/from-words":103,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/get-low-word":109}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/math/base/special/round":95,"@stdlib/number/float64/base/get-high-word":107}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":96}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the tangent of a number.
*
* @module @stdlib/math/base/special/tan
*
* @example
* var tan = require( '@stdlib/math/base/special/tan' );
*
* var v = tan( 0.0 );
* // returns ~0.0
*
* v = tan( -3.141592653589793/4.0 );
* // returns ~-1.0
*
* v = tan( 3.141592653589793/4.0 );
* // returns ~1.0
*
* v = tan( NaN );
* // returns NaN
*/

// MODULES //

var tan = require( './tan.js' );


// EXPORTS //

module.exports = tan;

},{"./tan.js":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_tan.c}. The implementation follows the original, but has been modified for JavaScript.
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
var kernelTan = require( '@stdlib/math/base/special/kernel-tan' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Scratch buffer:
var buffer = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High word absolute value mask: 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation

// High word for pi/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word exponent mask: 0x7ff00000 => 01111111111100000000000000000000
var HIGH_WORD_EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for a small value: 2^-27 = 7.450580596923828e-9 => high word => 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation


// MAIN //

/**
* Evaluates the tangent of a number.
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
*     | 0 |    S   |    C   |   T    |
*     | 1 |    C   |   -S   |  -1/T  |
*     | 2 |   -S   |   -C   |   T    |
*     | 3 |   -C   |    S   |  -1/T  |
*
*
* @param {number} x - input value (in radians)
* @returns {number} tangent
*
* @example
* var v = tan( 0.0 );
* // returns ~0.0
*
* @example
* var v = tan( -3.141592653589793/4.0 );
* // returns ~-1.0
*
* @example
* var v = tan( 3.141592653589793/4.0 );
* // returns ~1.0
*
* @example
* var v = tan( NaN );
* // returns NaN
*/
function tan( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: |x| < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return x;
		}
		return kernelTan( x, 0.0, 1 );
	}
	// Case: tan(Inf or NaN) is NaN
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction needed...
	n = rempio2( x, buffer );
	return kernelTan( buffer[ 0 ], buffer[ 1 ], 1-((n&1)<<1) );
}


// EXPORTS //

module.exports = tan;

},{"@stdlib/math/base/special/kernel-tan":85,"@stdlib/math/base/special/rempio2":91,"@stdlib/number/float64/base/get-high-word":107}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":100}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/high-word-exponent-mask":48,"@stdlib/number/float64/base/get-high-word":107}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":105}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":104,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":106,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var getLowWord = require( './main.js' );


// EXPORTS //

module.exports = getLowWord;

},{"./main.js":111}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":110,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":113}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":114}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":55,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":117}],116:[function(require,module,exports){
arguments[4][110][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":110}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":116,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":120}],119:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":104}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":121}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":119,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":123,"./polyfill.js":124,"@stdlib/assert/has-tostringtag-support":24}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":125}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":125,"./tostringtag.js":126,"@stdlib/assert/has-own-property":20}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
*/

'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){

},{}],129:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"dup":128}],130:[function(require,module,exports){
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
},{"base64-js":127,"buffer":130,"ieee754":218}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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
},{"_process":224}],133:[function(require,module,exports){
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

},{"events":131,"inherits":219,"readable-stream/lib/_stream_duplex.js":135,"readable-stream/lib/_stream_passthrough.js":136,"readable-stream/lib/_stream_readable.js":137,"readable-stream/lib/_stream_transform.js":138,"readable-stream/lib/_stream_writable.js":139,"readable-stream/lib/internal/streams/end-of-stream.js":143,"readable-stream/lib/internal/streams/pipeline.js":145}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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
},{"./_stream_readable":137,"./_stream_writable":139,"_process":224,"inherits":219}],136:[function(require,module,exports){
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
},{"./_stream_transform":138,"inherits":219}],137:[function(require,module,exports){
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
},{"../errors":134,"./_stream_duplex":135,"./internal/streams/async_iterator":140,"./internal/streams/buffer_list":141,"./internal/streams/destroy":142,"./internal/streams/from":144,"./internal/streams/state":146,"./internal/streams/stream":147,"_process":224,"buffer":130,"events":131,"inherits":219,"string_decoder/":231,"util":128}],138:[function(require,module,exports){
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
},{"../errors":134,"./_stream_duplex":135,"inherits":219}],139:[function(require,module,exports){
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
},{"../errors":134,"./_stream_duplex":135,"./internal/streams/destroy":142,"./internal/streams/state":146,"./internal/streams/stream":147,"_process":224,"buffer":130,"inherits":219,"util-deprecate":240}],140:[function(require,module,exports){
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
},{"./end-of-stream":143,"_process":224}],141:[function(require,module,exports){
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
},{"buffer":130,"util":128}],142:[function(require,module,exports){
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
},{"_process":224}],143:[function(require,module,exports){
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
},{"../../../errors":134}],144:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],145:[function(require,module,exports){
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
},{"../../../errors":134,"./end-of-stream":143}],146:[function(require,module,exports){
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
},{"../../../errors":134}],147:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":131}],148:[function(require,module,exports){
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

},{"./":149,"get-intrinsic":213}],149:[function(require,module,exports){
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

},{"function-bind":212,"get-intrinsic":213}],150:[function(require,module,exports){
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

},{"./lib/is_arguments.js":151,"./lib/keys.js":152}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],153:[function(require,module,exports){
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

},{"has-property-descriptors":214,"object-keys":222}],154:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],155:[function(require,module,exports){
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

},{"./ToNumber":185,"./ToPrimitive":187,"./Type":192}],156:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/isNaN":203,"../helpers/isPrefixOf":204,"./ToNumber":185,"./ToPrimitive":187,"./Type":192,"get-intrinsic":213}],157:[function(require,module,exports){
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

},{"get-intrinsic":213}],158:[function(require,module,exports){
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

},{"./DayWithinYear":161,"./InLeapYear":165,"./MonthFromTime":175,"get-intrinsic":213}],159:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":208,"./floor":196}],160:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":196}],161:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":159,"./DayFromYear":160,"./YearFromTime":194}],162:[function(require,module,exports){
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

},{"./modulo":197}],163:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./IsAccessorDescriptor":166,"./IsDataDescriptor":168,"./Type":192,"get-intrinsic":213}],164:[function(require,module,exports){
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

},{"../helpers/timeConstants":208,"./floor":196,"./modulo":197}],165:[function(require,module,exports){
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

},{"./DaysInYear":162,"./YearFromTime":194,"get-intrinsic":213}],166:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./Type":192,"has":217}],167:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":220}],168:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./Type":192,"has":217}],169:[function(require,module,exports){
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

},{"../helpers/assertRecord":200,"./IsAccessorDescriptor":166,"./IsDataDescriptor":168,"./Type":192}],170:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":205,"./IsAccessorDescriptor":166,"./IsDataDescriptor":168,"./Type":192}],171:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/timeConstants":208}],172:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"./DateFromTime":158,"./Day":159,"./MonthFromTime":175,"./ToInteger":184,"./YearFromTime":194,"./floor":196,"./modulo":197,"get-intrinsic":213}],173:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/timeConstants":208,"./ToInteger":184}],174:[function(require,module,exports){
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

},{"../helpers/timeConstants":208,"./floor":196,"./modulo":197}],175:[function(require,module,exports){
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

},{"./DayWithinYear":161,"./InLeapYear":165}],176:[function(require,module,exports){
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

},{"../helpers/isNaN":203}],177:[function(require,module,exports){
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

},{"../helpers/timeConstants":208,"./floor":196,"./modulo":197}],178:[function(require,module,exports){
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

},{"./Type":192}],179:[function(require,module,exports){
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


},{"../helpers/isFinite":201,"./ToNumber":185,"./abs":195,"get-intrinsic":213}],180:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":208,"./DayFromYear":160}],181:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":208,"./modulo":197}],182:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],183:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":185}],184:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/isNaN":203,"../helpers/sign":207,"./ToNumber":185,"./abs":195,"./floor":196}],185:[function(require,module,exports){
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

},{"./ToPrimitive":187}],186:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":157,"get-intrinsic":213}],187:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":209}],188:[function(require,module,exports){
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

},{"./IsCallable":167,"./ToBoolean":182,"./Type":192,"get-intrinsic":213,"has":217}],189:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":213}],190:[function(require,module,exports){
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

},{"../helpers/isFinite":201,"../helpers/isNaN":203,"../helpers/sign":207,"./ToNumber":185,"./abs":195,"./floor":196,"./modulo":197}],191:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":185}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":159,"./modulo":197}],194:[function(require,module,exports){
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

},{"call-bind/callBound":148,"get-intrinsic":213}],195:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":213}],196:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],197:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":206}],198:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":208,"./modulo":197}],199:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":155,"./5/AbstractRelationalComparison":156,"./5/CheckObjectCoercible":157,"./5/DateFromTime":158,"./5/Day":159,"./5/DayFromYear":160,"./5/DayWithinYear":161,"./5/DaysInYear":162,"./5/FromPropertyDescriptor":163,"./5/HourFromTime":164,"./5/InLeapYear":165,"./5/IsAccessorDescriptor":166,"./5/IsCallable":167,"./5/IsDataDescriptor":168,"./5/IsGenericDescriptor":169,"./5/IsPropertyDescriptor":170,"./5/MakeDate":171,"./5/MakeDay":172,"./5/MakeTime":173,"./5/MinFromTime":174,"./5/MonthFromTime":175,"./5/SameValue":176,"./5/SecFromTime":177,"./5/StrictEqualityComparison":178,"./5/TimeClip":179,"./5/TimeFromYear":180,"./5/TimeWithinDay":181,"./5/ToBoolean":182,"./5/ToInt32":183,"./5/ToInteger":184,"./5/ToNumber":185,"./5/ToObject":186,"./5/ToPrimitive":187,"./5/ToPropertyDescriptor":188,"./5/ToString":189,"./5/ToUint16":190,"./5/ToUint32":191,"./5/Type":192,"./5/WeekDay":193,"./5/YearFromTime":194,"./5/abs":195,"./5/floor":196,"./5/modulo":197,"./5/msFromTime":198}],200:[function(require,module,exports){
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

},{"./isMatchRecord":202,"get-intrinsic":213,"has":217}],201:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],202:[function(require,module,exports){
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

},{"has":217}],203:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],204:[function(require,module,exports){
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

},{"call-bind/callBound":148}],205:[function(require,module,exports){
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

},{"get-intrinsic":213,"has":217}],206:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],207:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{"./helpers/isPrimitive":210,"is-callable":220}],210:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":211}],213:[function(require,module,exports){
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

},{"function-bind":212,"has":217,"has-symbols":215}],214:[function(require,module,exports){
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

},{"get-intrinsic":213}],215:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":212}],218:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{"./isArguments":223}],222:[function(require,module,exports){
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

},{"./implementation":221,"./isArguments":223}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
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
},{"_process":224,"through":238,"timers":239}],226:[function(require,module,exports){
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

},{"buffer":130}],227:[function(require,module,exports){
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

},{"es-abstract/es5":199,"function-bind":212}],228:[function(require,module,exports){
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

},{"./implementation":227,"./polyfill":229,"./shim":230,"define-properties":153,"function-bind":212}],229:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":227}],230:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":229,"define-properties":153}],231:[function(require,module,exports){
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
},{"safe-buffer":226}],232:[function(require,module,exports){
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
},{"./lib/default_stream":233,"./lib/results":235,"./lib/test":236,"_process":224,"defined":154,"through":238,"timers":239}],233:[function(require,module,exports){
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
},{"_process":224,"fs":129,"through":238}],234:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":224,"timers":239}],235:[function(require,module,exports){
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
},{"_process":224,"events":131,"function-bind":212,"has":217,"inherits":219,"object-inspect":237,"resumer":225,"through":238,"timers":239}],236:[function(require,module,exports){
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
},{"./next_tick":234,"deep-equal":150,"defined":154,"events":131,"has":217,"inherits":219,"path":132,"string.prototype.trim":228}],237:[function(require,module,exports){
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

},{}],238:[function(require,module,exports){
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
},{"_process":224,"stream":133}],239:[function(require,module,exports){
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
},{"process/browser.js":224,"timers":239}],240:[function(require,module,exports){
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
},{}]},{},[82]);
