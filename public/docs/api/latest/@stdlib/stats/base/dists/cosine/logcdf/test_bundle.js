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

},{"@stdlib/utils/native-class":150}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":150}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":150}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":150}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":93}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":97,"@stdlib/number/float64/base/get-high-word":101,"@stdlib/number/float64/base/to-words":112}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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


// VARIABLES //

// Scratch array for storing temporary values:
var buffer = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High word absolute value mask: 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation

// High word of π/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word of 2^-27: 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation

// High word exponent mask: 0x7ff00000 => 01111111111100000000000000000000
var HIGH_WORD_EXPONENT_MASK = 0x7ff00000|0; // asm type annotation


// MAIN //

/**
* Computes the cosine of a number.
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
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< pi/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: x < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return 1.0;
		}
		return kernelCos( x, 0.0 );
	}
	// Case: cos(Inf or NaN) is NaN */
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
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

},{"@stdlib/math/base/special/kernel-cos":71,"@stdlib/math/base/special/kernel-sin":75,"@stdlib/math/base/special/rempio2":83,"@stdlib/number/float64/base/get-high-word":101}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var cos = require( './cos.js' );


// EXPORTS //

module.exports = cos;

},{"./cos.js":67}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var kernelCos = require( './kernel_cos.js' );


// EXPORTS //

module.exports = kernelCos;

},{"./kernel_cos.js":72}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_cos.c}. The implementation follows the original, but has been modified for JavaScript.
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

},{"./polyval_c13.js":73,"./polyval_c46.js":74}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.0416666666666666;
	}
	return 0.0416666666666666 + (x * (-0.001388888888887411 + (x * 0.00002480158728947673))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

var kernelSin = require( './kernel_sin.js' );


// EXPORTS //

module.exports = kernelSin;

},{"./kernel_sin.js":76}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/max-base2-exponent":50,"@stdlib/constants/float64/max-base2-exponent-subnormal":49,"@stdlib/constants/float64/min-base2-exponent-subnormal":51,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/copysign":65,"@stdlib/number/float64/base/exponent":95,"@stdlib/number/float64/base/from-words":97,"@stdlib/number/float64/base/normalize":106,"@stdlib/number/float64/base/to-words":112}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":80}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":81,"./polyval_q.js":82,"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/ninf":52,"@stdlib/math/base/assert/is-nan":61,"@stdlib/number/float64/base/get-high-word":101,"@stdlib/number/float64/base/set-high-word":110}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./rempio2.js":85}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/array/base/zeros":3,"@stdlib/math/base/special/floor":69,"@stdlib/math/base/special/ldexp":77}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./kernel_rempio2.js":84,"./rempio2_medium.js":86,"@stdlib/number/float64/base/from-words":97,"@stdlib/number/float64/base/get-high-word":101,"@stdlib/number/float64/base/get-low-word":103}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/math/base/special/round":87,"@stdlib/number/float64/base/get-high-word":101}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./round.js":88}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var sin = require( './sin.js' );


// EXPORTS //

module.exports = sin;

},{"./sin.js":90}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000|0; // asm type annotation

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ]; // WARNING: not thread safe


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
	ix &= ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, 0.0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
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

},{"@stdlib/math/base/special/kernel-cos":71,"@stdlib/math/base/special/kernel-sin":75,"@stdlib/math/base/special/rempio2":83,"@stdlib/number/float64/base/get-high-word":101}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var sinpi = require( './sinpi.js' );


// EXPORTS //

module.exports = sinpi;

},{"./sinpi.js":92}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/*
* Notes:
*	=> sin(-x) = -sin(x)
*	=> sin(+n) = +0, where `n` is a positive integer
*	=> sin(-n) = -sin(+n) = -0, where `n` is a positive integer
*	=> cos(-x) = cos(x)
*/


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

},{"@stdlib/constants/float64/pi":53,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63,"@stdlib/math/base/special/copysign":65,"@stdlib/math/base/special/cos":68,"@stdlib/math/base/special/sin":89}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":94}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":47,"@stdlib/constants/float64/high-word-exponent-mask":48,"@stdlib/number/float64/base/get-high-word":101}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":99}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":98,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":38}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":100,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

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

},{"./low.js":104,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":107}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":108}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":55,"@stdlib/math/base/assert/is-infinite":59,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63}],109:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":100}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":109,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":114}],113:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":38,"dup":98}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./to_words.js":115}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":113,"@stdlib/array/float64":6,"@stdlib/array/uint32":11}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/logcdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (CDF) for a raised cosine distribution with location parameter `mu` and scale parameter `s`.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 3.0, 1.5 );
*
* var y = logcdf( 1.9 );
* // returns ~-4.2
*
* y = logcdf( 4.0 );
* // returns ~-0.029
*/
function factory( mu, s ) {
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	return logcdf;

	/**
	* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a raised cosine distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logCDF
	*
	* @example
	* var y = logcdf( 2.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < mu - s ) {
			return NINF;
		}
		if ( x > mu + s ) {
			return 0.0;
		}
		z = ( x - mu ) / s;
		return ln( ( 1.0 + z + ( sinpi( z ) / PI ) ) / 2.0 );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pi":53,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/ln":79,"@stdlib/math/base/special/sinpi":91,"@stdlib/stats/base/dists/degenerate/logcdf":126,"@stdlib/utils/constant-function":142}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Natural logarithm of cumulative distribution function (CDF) for a raised cosine distribution.
*
* @module @stdlib/stats/base/dists/cosine/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/cosine/logcdf' );
*
* var y = logcdf( 0.5, 0.0, 1.0 );
* // returns ~-0.095
*
* var mylogcdf = logcdf.factory( 3.0, 1.5 );
*
* y = mylogcdf( 4.0 );
* // returns ~--0.029
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":116,"./logcdf.js":118,"@stdlib/utils/define-nonenumerable-read-only-property":143}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a raised cosine distribution with location parameter `mu` and scale parameter `s` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 0.5, 0.0, 1.0 );
* // returns ~-0.095
*
* @example
* var y = logcdf( 1.2, 0.0, 1.0 );
* // returns 0.0
*
* @example
* var y = logcdf( -0.9, 0.0, 1.0 );
* // returns ~-7.108
*
* @example
* var y = logcdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = logcdf( 2.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( NaN, 0.0, 1.0 );
* // returns NaN
*/
function logcdf( x, mu, s ) {
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
		return ( x < mu ) ? NINF : 0.0;
	}
	if ( x < mu - s ) {
		return NINF;
	}
	if ( x > mu + s ) {
		return 0.0;
	}
	z = ( x - mu ) / s;
	return ln( ( 1.0 + z + ( sinpi( z ) / PI ) ) / 2.0 );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pi":53,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/ln":79,"@stdlib/math/base/special/sinpi":91}],119:[function(require,module,exports){
module.exports={"expected":[-3.0107763374240788e-5,-0.19987802405674904,-0.23935117244659432,-0.26609819379010735,-0.35330878384803655,-0.021978520250249645,-0.3543316480988671,-0.2609489514378421,-0.5909404341382503,-0.05090546290086849,-4.62960570075921e-6,-0.00015069676705889039,-0.06268889675964055,-0.338738830666451,-0.004118520028908912,-0.6526067236213502,-0.5751326387155212,-0.26375650460005706,-0.2602951649172964,-0.09016065351108749,-0.5670774631012947,-0.19559642848583092,-0.05400089118063412,-0.13144663458509429,-0.030169669607294152,-0.002242535970142794,-0.06137801254495718,-1.4002169433735324e-9,-0.07200947679440627,-0.0001871892324631484,-0.24223592644195724,-0.23733195263803403,-0.2369477427266675,-0.00749802613682686,-0.23297764221519196,-0.041468390237938885,-0.24700995272157214,-0.04478906738031309,-0.003137929097233379,-0.3654572472361099,-0.670658667469618,-0.501376939704034,-0.002440781918305898,-0.020800502154011483,-0.41611628499022285,-0.02876072884505594,-0.3435705309817837,-0.05964037450744257,-0.26464765542818164,-0.4834054851710492,-0.5996800417507229,-0.0007658873961451163,-2.3544421598561577e-5,-0.0021607181668872317,-0.08651424879658322,-0.2142844752513416,-0.13766031279896654,-0.30075394682099155,-0.015418809131354723,-0.0793420303064575,-0.3073545135055929,-0.006299405899937421,-0.0002519137942994214,-0.03153810436643734,-0.06650214076487351,-0.1518563566341495,-0.3719827601394766,-0.014145000804330943,-0.6898509377669488,-0.004955406487661747,-0.2147976911846497,-0.034348906071356856,-0.04625517813882395,-0.0689199107432499,-0.00033287691657656363,-0.1553029992353504,-0.0839154396657006,-0.031929148587023934,-0.1054329152557189,-0.17315395165018246,-0.2882473573738377,-0.0607767484227325,-0.36305743762281184,-0.6116058867129059,-0.13907178324548278,-0.32779714950605077,-0.28201629744383544,-0.007256970301321376,-0.0017591983504554245,-0.17265679103690726,-0.0004317541460247725,-0.08698156687832093,-0.00857171651469175,-0.11496682180245052,-0.15298641970020843,-0.04576889757430748,-0.0706650798968379,-0.011630486843822768,-0.34959254034636983,-0.12650512273297887,-0.0314937283104317,-0.015949769289973836,-0.4155924765529868,-0.1311474982206717,-0.586699782470192,-0.043701455161843594,-0.00020676249897470293,-0.032698761651936234,-0.011357013435693897,-0.14730762640618966,-0.02692564754260582,-0.11724302964428863,-0.2639834251362208,-0.005028470515926301,-0.0452524034962237,-0.12825658766635858,-0.5632632299132021,-0.34055525244811186,-0.4726470354498866,-0.022630698107020546,-0.6015208548339153,-0.5411346276479672,-0.10505001849971692,-0.6712153683046934,-0.0672621813237764,-0.26665036051784147,-0.11637409053180761,-0.00678365015497353,-0.017034931306195992,-0.004471628206112262,-0.023238868183201672,-0.20190560849231728,-0.001746641778754427,-0.2177514226537595,-0.0876382184000868,-0.05580431227343569,-0.3302076902200418,-0.029370225785364044,-0.17339380460205758,-0.05303174718008802,-0.07143803689095124,-0.10612043702870645,-0.012067299311849683,-0.013755425146159845,-0.00025069336361709625,-0.5807430786005572,-0.6216396790747396,-0.6074345882715856,-0.1531306887170203,-0.05027271235543832,-0.3099654666073791,-0.00018442953241155715,-0.006811173854180565,-0.37309437803596607,-0.2780251554223468,-9.479068755070276e-5,-0.3360633955511428,-0.37454518470664167,-0.29421505568002376,-0.23984092319138792,-0.09502362460384672,-0.6322156072805131,-0.32781680573611444,-0.6509318421455841,-0.0004273919824563619,-0.021042190665670056,-0.011387552861161226,-0.0012732410469997676,-0.12602047796610658,-0.25939383278254324,-0.5126209963242108,-0.17067153646181507,-0.02982740065351924,-0.3100272954801486,-3.666948554642438e-5,-0.3454705625815959,-0.2728608334230674,-0.4859255563771003,-0.003015573658204228,-0.04006085825206667,-8.968286742297238e-5,-0.10669284279087081,-0.038905919794707255,-0.03698238730447872,-0.17378311149398382,-0.302833606887891,-0.12527190206194713,-0.0202418743110639,-0.41862012918258,-0.5204188262963707,-0.21605837335991993,-0.00045732130861880505,-0.0657679507626778,-0.003537958819444653,-0.5344864902142596,-2.170113246346802e-6,-0.35920654075962255,-0.4706339955297149,-0.00039552543455289695,-0.028039143631854342,-0.5932199941822786,-0.6328996575845952,-0.34691932777267537,-0.3826267831466311,-0.005732215002052106,-0.15785847824585947,-0.0028851845743430565,-0.6250352737759353,-0.00033999575772106894,-0.6361672293170901,-0.2976686735838432,-0.00937520086412,-0.07117978765507477,-0.5506709941819788,-0.14061012765942724,-4.925465107145363e-5,-0.0014225164606961804,-0.028525491485116905,-0.6239738602195195,-0.0017020495284208186,-0.11924125217429704,-0.13171619909436724,-0.0042868455089808905,-0.03302807508537295,-0.04618476787089161,-0.02944525987966107,-0.00031745145978505606,-0.042554122668537905,-0.0251734747601764,-0.3833573415008722,-1.6038761225635673e-8,-0.05746949465340125,-0.6513022349126202,-0.13495039672556897,-0.3241413918227285,-0.42264018538290427,-0.003105444543601798,-0.12445883706340377,-0.026020164514447885,-0.014555820029801296,-0.2304599399959016,-0.020764601484175572,-0.6296562613931153,-0.06926231752017424,-0.600773045974808,-0.0011513070165354525,-0.2606050887492874,-0.00042714462789892634,-0.2092198180978321,-0.06994612265015333,-0.5703806918491068,-0.09123296579792047,-0.04849648679657494,-0.0833718581347883,-0.2017796844094295,-0.562862134574061,-0.026431984965753632,-0.2970486574190024,-0.0045893111428039705,-0.0040998090950657585,-0.2781443074535588,-0.012158728163771552,-0.014622445498045412,-0.003766602908031036,-0.009449966849119447,-0.6323120129300701,-5.488166279746319e-7,-0.029994034155259277,-0.43162570228426805,-0.07805083811149635,-0.3152917290314404,-0.15861860911865736,-0.22240641846564155,-0.10975186278861718,-0.305796692600842,-0.42417894523879457,-0.03336699639735526,-0.2803989449789274,-0.09857452898900357,-0.5150935182515339,-0.1954114749572222,-0.013529829009351558,-0.0036725692792871456,-0.26587877696585177,-0.11193938971957615,-0.32826078776677464,-0.0697179359128442,-0.23361772757743443,-0.015921716252058914,-0.5625976391464063,-0.019902158738072585,-0.08024044449073725,-0.009673114488634768,-0.0205993824951932,-0.5801586554854661,-0.24447350500537735,-0.5902468537022886,-0.645279133196954,-0.6022279953077976,-0.2873884129233609,-0.21753584493479455,-4.534132358631437e-5,-0.0028150036442169592,-0.4901326755126083,-0.012035350232773342,-0.2463078134510427,-0.02108959960659246,-0.10905789064596558,-0.4865433604565007,-0.012474885392919894,-0.33688706912838634,-0.027057680660474117,-0.001081602085127352,-0.5194975890236921,-0.23729058308845632,-2.998046255702267e-12,-0.007825031904479468,-0.017898101355849242,-0.2616057459338603,-0.012134481234567847,-0.16546181202605362,-0.41879744440930666,-0.023356106515826917,-0.6248215818725639,-0.00038380938107345067,-0.00023855161276002936,-0.14580293451708715,-0.04283980221720696,-0.19099158945345165,-0.004441704901545692,-0.00020386525786337913,-0.3060041335492495,-0.6624055384061945,-0.0535119508777105,-0.5687246885260263,-0.002426060474499468,-0.010174289348748236,-0.5442330932006052,-0.03153500932121511,-5.166808738800337e-5,-0.009603031304263673,-0.00011989418022119673,-4.979764409420656e-6,-0.04292441382594364,-0.000355330271376218,-0.34264655571322894,-0.013893922004071184,-0.01627823300294933,-0.08787550855865496,-8.438912190431951e-7,-0.3367554241072351,-6.668001822378913e-5,-1.3793340716719962e-5,-0.42141167574326127,-0.030290258942353095,-0.671203810654349,-0.08569247882659976,-0.20111060020542726,-0.2338726755517952,-0.3422220754651998,-3.530057462128034e-7,-0.14130254129576517,-0.6363685374772297,-0.024431150921432686,-0.0003498928888936324,-0.15504844384616692,-0.3911651662373983,-0.02311349057596994,-0.007718126889139869,-0.0877981871350699,-0.5953764753437548,-0.11694087378466164,-0.006523142803614122,-0.48009348146626574,-0.38713439651040543,-0.14002354631816336,-0.17580271484250054,-0.0011300512847227699,-0.02934436545026258,-0.2665490964911462,-0.010410991109448244,-0.009393622140652284,-0.3399264170736229,-0.2153858460304907,-0.06602295018168038,-0.0012931934633818374,-9.873840520365413e-5,-0.1633439196772074,-0.27352290742438123,-0.00017476389868109385,-0.014855843443957477,-0.40744889896716197,-0.09921284390111752,-0.27359990538540935,-0.24988346080715523,-0.22275301990097263,-0.050661709838595824,-0.0369830109030709,-0.03579360873190944,-0.005800559911802089,-0.4197009040867127,-0.004383694329203426,-0.0594658231526849,-1.8045714106200903e-6,-0.00021480698281661856,-0.00034031669390332945,-0.3527692432568178,-0.01580595937066798,-0.488412323347441,-0.09699200344067738,-0.06374279321838451,-0.00046985566933934744,-0.543148301291343,-0.6732853572647574,-0.026111914798527043,-0.0005727942497485332,-0.6424935011016546,-0.04190213716326222,-0.4352567090132173,-0.010472850337600403,-0.49952941263116235,-0.05940913519407606,-0.004185497787731456,-0.6861566570538394,-0.005594970378614131,-0.12340262426891221,-0.5213678047521306,-0.5585640127907424,-0.11943771214679713,-0.524159043090613,-0.2890662506195431,-0.039546223946967454,-0.6110969966071411,-0.017196042872705628,-0.28750404125044576,-0.17376953593039024,-0.6931186484537001,-0.05498373881702055,-0.005557771175494817,-0.5858498155871439,-0.010368843452818986,-0.0013685819276581395,-0.4822526170542363,-0.01417224510025881,-0.2791512557244579,-0.09506887878869402,-0.1869080932182836,-0.026583080631441092,-0.03485123057878862,-0.004181655028880811,-0.0026175093413491218,-0.06350519354998244,-0.14732238609517356,-0.09268462532945516,-0.20029312698618423,-0.2875872014270997,-5.714817948958236e-8,-0.20077543570317757,-0.00016044244571852706,-0.35651829800172213,-0.4100555936997412,-0.002902622159380737,-0.0018325926996872863,-0.0006596056407461373,-0.6457457144825465,-0.6080936497958823,-0.010758827631056215,-0.00628242596251021,-0.06298794013738247,-0.08769172814190024,-0.09432123495884766,-0.5169347291018714,-0.0029041037846988366,-0.09637857610978041,-0.22605626501115336,-0.1357766558366018,-0.1262543580685536,-0.13759483102967274,-0.08585760848087658,-0.3299505391812886,-0.6193234570743715,-0.0032940265434094414,-0.29759962301386306,-0.054394961121959885,-0.2085312922468621,-0.4382995190119077,-0.16336008582324588,-0.0014816274960540502,-0.05840650126889554,-0.2583804157601971,-0.4566810098565295,-0.25651778089919997,-0.2288783649533944,-0.06914822328810816,-0.00014414351679896417,-5.9668891985845936e-5,-0.6364993249126571,-3.45380601199089e-8,-0.09264719546596599,-0.09787171351402624,-0.45142031521418224,-0.12435429313980235,-0.14700807221325224,-0.167869153522489,-7.69491517040645e-5,-0.04825509011838359,-9.977467050693965e-5,-0.3510323058578844,-0.1937373878909506,-0.30516416835857396,-0.0017488819893793917,-0.001928534958042064,-0.15196382313993306,-0.4158940972528745,-0.004385496064796631,-0.6682261020745234,-0.0029725501898062888,-0.47506488517063766,-0.43615653410246685,-0.07857940671089322,-0.0008660129303120357,-0.09375442620878498,-0.08270030870988052,-0.023705962893002343,-1.6116670420226158e-7,-0.1593264461199433,-0.032773913951694066,-0.20843055272249264,-0.43750683213247826,-0.6182518144675931,-0.22147967876668972,-0.06142157293195935,-0.33125962204886245,-0.5848464601096387,-0.004317787514921466,-0.18818186075205148,-0.03434528747677048,-0.2039800284321224,-0.004108354217277244,-0.1328503789804239,-0.0594106136031042,-0.41506843023965756,-0.2397329018846979,-0.0014102203288772358,-0.00731173019785636,-0.08621294155561499,-0.03389870232530662,-0.5571208295021619,-0.0018598196928294789,-0.013576809581778041,-0.229137778144692,-0.13519683384194095,-0.35686446426499707,-0.023479361019515664,-0.42360676411567944,-0.27613090724101697,-0.0028744311488583005,-0.00013037116537724584,-0.25432307765650347,-0.1470185205068307,-0.5409271895011194,-0.03351019743653539,-0.009352620777920482,-0.27809698188385584,-0.026752277437563976,-0.009672480342458583,-0.2229365814867522,-0.008586144478609713,-0.21654295946940877,-0.030354333730398454,-0.46947725450262545,-0.4481803950046642,-5.857081787328115e-7,-0.10592485518481615,-0.07754417337883236,-0.3847886283101357,-0.0674148003465163,-0.010091141537704396,-0.1363332166086191,-0.22629803600337253,-0.4884552232031272,-4.986898628254871e-5,-0.457691693464447,-0.05171974539423241,-0.5796205569154926,-0.020303169008508884,-0.01038390810363736,-0.06882402337048486,-0.009968492966303899,-0.02809910797907059,-0.00292207412300083,-0.38326765177301414,-0.5278483443273398,-1.428433120338811e-5,-0.025075390413762,-0.5471645866959944,-0.0006275705485334945,-0.008477049841269005,-0.006459776454782405,-0.06257513807988463,-0.0037554896358472354,-0.09849571554893093,-0.351259498072652,-0.23064601220300643,-0.2548546847563308,-0.6502469363962214,-0.013730604781483224,-0.2174448617569868,-0.0013473493677260604,-1.076075417826176e-7,-0.09414228403402519,-0.2737046166582963,-0.2785108124510016,-0.036948289164371664,-0.020396017504715067,-0.12891373512599144,-0.05857899194530043,-0.18364971543762978,-0.14309114891423147,-8.742121186863262e-6,-0.0021041806584072486,-0.0046704287814852774,-0.0016551149110196357,-0.09474909329265986,-0.1296732544807996,-0.260479813909299,-0.08438372845990603,-0.0696740518396934,-0.005617133480050925,-0.14275807472714883,-0.00366425289225287,-0.019167718194644877,-0.0226718884438978,-0.03926286589109247,-0.01609115341684255,-0.29377730464286483,-0.04031705721736061,-0.0462487744298152,-0.0003109883373600387,-0.23540374304431816,-0.6378691684915117,-0.47652634202799743,-0.0010610860914069828,-0.48307361291314665,-0.10932720239105713,-7.132390703501757e-9,-0.14752360898173714,-0.3581443031159411,-0.115245172234314,-0.05326950486439796,-0.17028200305383484,-0.06883513207011692,-0.054998516039079064,-0.47534556171130227,-0.1443109315650699,-0.19879329059813,-0.1456407052766264,-0.3466931593006767,-0.004651987489194724,-0.0004498109684374459,-0.00592325693330876,-0.32167633674642826,-0.4074127158850518,-0.19113763907256295,-0.30210307669461584,-0.19444398960715092,-0.03249753933279611,-0.04750519905507974,-0.466269954840572,-0.1863384699025743,-0.32117917437017507,-0.15727944052025317,-0.6766842903351248,-0.6783225784246593,-0.045440692071864595,-0.19108145110790084,-0.032014622855934274,-0.08219884253088788,-0.22728443024546557,-0.5420977543856309,-0.04063527988446206,-0.4060899383122905,-0.5626125263368846,-0.02553508453543452,-0.006920957003613369,-0.028379841408140146,-0.39832135465374646,-0.0006347085090422341,-0.10991335368219934,-0.24837642956838,-0.32856237286490586,-0.6000370053926325,-0.006681249204637788,-0.22356849101618664,-0.4925450859409571,-0.18308527635518862,-0.003894064205755119,-0.16034609633816246,-0.009105841408636555,-0.4840727032303267,-0.6047514828190832,-0.4362735037351757,-0.18653957042353042,-0.05759053913852444,-0.0003028073192576808,-0.034663914786033076,-0.031553047442980514,-0.5554582628350542,-0.06734540836686624,-0.0002498220577513979,-0.20865272107116217,-1.5431134458479536e-5,-0.05831526238820538,-0.5514447617556466,-0.004603422952945341,-0.01537856268642748,-0.6166584001818755,-0.008071765588897143,-0.4446323522793341,-0.1436138512471661,-0.0008706318009091521,-0.12869508550389439,-0.23673728144734546,-0.0071164456640745305,-0.061384239668932576,-0.584083597018799,-5.574322938177107e-6,-0.6179582351881366,-0.018657232151333674,-0.4162526822661905,-0.010266292291298986,-0.3869263956277723,-0.048598205391440615,-0.05801470446858955,-0.04126917141424919,-0.031264102363408805,-0.008062526988580045,-0.08212413510824941,-0.05384619474211032,-0.00011313343459292269,-0.05387502310385734,-0.23775754188034384,-0.15759798365764968,-0.1199417696199624,-0.008311308459543488,-0.004652145231375956,-0.5940955401095304,-0.3546554939113109,-0.011400937322667762,-0.21085808379286503,-0.025763026809635974,-0.003079758275677734,-0.09707628215768518,-0.07848155537391965,-0.6857324032307285,-0.001519375665020843,-0.010710170607843772,-0.0015091570089036232,-0.527827826081705,-0.01349172053462916,-0.005304554123235909,-0.0012445026317322062,-0.14962065910560507,-0.21868458456012105,-0.5698555935212721,-0.06324507172464953,-0.03253427326810853,-0.07097582231116752,-0.5314104284745714,-0.20628590135023794,-0.05053347926289148,-0.22756815737913305,-4.1054968797517364e-5,-0.06099225535047516,-0.010562935298851503,-0.1737329553707581,-3.267276154509814e-5,-0.5638337721076686,-0.06071061004273481,-0.29431375488900374,-0.0030634536342402986,-0.009978965431572197,-0.01930737775187249,-0.15607473346123002,-0.5301329060688044,-0.0062741531631900355,-0.5631415086490699,-0.11687511059117832,-0.04585908705830341,-0.11244516336937765,-0.20182560551464895,-9.629904515473766e-5,-0.0005717841097814469,-0.4344047111843226,-0.15070336601043036,-0.19612894751637866,-0.4018568700957554,-0.01624269921438621,-0.010348759155212243,-0.0006534447279348384,-3.133841805702387e-5,-0.03998430434616672,-0.46168428933454864,-0.3147702277938378,-0.02996240662194938,-0.007946321335778782,-0.5574628347550529,-0.39422974231249086,-0.07687845099623661,-0.531575994915582,-0.037544273915515326,-0.5736321214816643,-0.006032944189141481,-0.039795623716111325,-0.005059992330066307,-0.08718343949459485,-0.6033964683871113,-0.0025800583558362434,-0.11921319135330177,-0.0010847023112191742,-0.13574075481820647,-0.048308365915516314,-0.5690202750117406,-0.028077822297918484,-0.024640421913827225,-0.11772792579438435,-0.3870878788680039,-0.334695728657598,-0.4438728039103548,-0.0003782739719712808,-0.6473126040594763,-0.2551393770355242,-0.06670880486789368,-0.009256890487174955,-0.000880197187420812,-0.3164235839792359,-0.07800959113931971,-0.09673257214226956,-0.08118791565978759,-0.050270151533545256,-0.019666416290850655,-0.013820543962650495,-0.009430813319560801,-0.41866141539832463,-1.4648912625438136e-5,-0.005958043853077215,-0.11746844284859867,-0.08829006848472615,-0.009449649202794551,-0.007112012593327801,-0.3290082823693433,-0.06316570349123152,-0.5062036415108951,-0.162287935317347,-0.09732226989862519,-0.031638076547083685,-0.4249630944421883,-0.11822106762310187,-0.15098834165055336,-0.5801596423207577,-0.0036374244546550282,-0.2747200361043846,-0.07464126592605125,-0.01163042751475856,-0.6517051573216743,-0.08497809537468538,-0.004759289035619827,-0.04109036494824915,-0.13962648715161013,-0.4356687911536544,-0.1673188285127979,-0.07794034662997788,-0.01292502076048217,-0.1927630000899613,-0.020482753602705968,-0.008591992202373324,-0.0010657889650379454,-0.023956077815337425,-3.9968842898074364e-5,-0.07112979412513992,-0.2049032822535744,-0.007537221483088045,-0.049095252167067616,-0.10733873720968126,-0.02599965859040296,-0.2520335969950139,-0.1589965239419307,-0.003011036259717716,-0.41955366231064894,-0.1865876983679314,-0.011986703461947556,-0.09003045998704555,-0.6068676491800115,-0.05584557858643148,-0.02121187633640806,-0.04124655343989652,-0.32411909513748555,-0.3483767002919134,-0.142784071449233,-0.4063560374173109,-0.028100294130166865,-0.023193388901162383,-0.35311117124502184,-0.6866231810744229,-0.1207963741614568,-0.037045939744569885,-0.08339016909419715,-0.511892799296424,-0.012701737825451045,-0.3803421635332631,-0.0002915171133272896,-0.4950123966045633,-0.4031737024321371,-0.2058826866859529,-0.1963970454023843,-0.05237334944042576,-0.2984696305710004,-0.19344002947339406,-0.5620611643746863,-0.047784673748658885,-0.049927054212590874,-0.10934865506877922,-0.2621086170126936,-0.6476328122454572,-0.023001832586345413,-0.22585170756391512,-0.35869732948256783,-0.0001841556860591655,-0.10104163196482369,-0.001806531641504886,-0.05904452128934111,-0.10353668370194138,-0.031255602183956274,-0.26329955909162794,-0.016904896339688516,-0.46287645312412307,-0.029745677189295952,-0.6057184664091895,-0.001683266641316626,-0.4347422159856255,-5.705384308674596e-5,-0.007818828565215949,-0.27981662961375464,-0.025317012644854288,-0.08446384179332998,-0.04968048927836752,-0.003218144553420306,-0.02464021216451158,-0.0046585658767299256,-0.00858672205361917,-0.3505350058219965,-0.3211340008377508,-0.20093035415965704,-0.1700539331421773,-0.00028305768797609306,-0.04227771581040854,-0.04789281119693732,-0.00853837720407432,-0.22298715061017588,-0.24860227600343623,-0.17313696767211453,-2.7473828414894896e-5,-0.04335114508495856,-0.14208126440871885,-0.023823706830640827,-0.29929256810623356,-0.01573098304251554,-0.3386385550796622,-0.14962446796254578,-0.00310627242449215,-0.366249851030997,-0.000588085063835823,-0.5114435264488728,-0.008403289685350908,-0.01013148721891924,-0.5839509315430484,-0.08308149450016739,-0.11987154501132913,-0.03165271030051839,-0.16040426643466849,-0.38806221401726454,-0.08910812012225953,-0.007101347089053804,-0.08588569471589015,-0.08928648064568358,-0.01384127143041729,-5.690062992537406e-9,-0.004636869418630325,-0.0684696665014638,-0.031084666940180677,-0.17406127126690235,-0.07564144656978558,-0.5203409321656743,-0.13246672425015527,-0.24278502969807225,-0.0018514069636593575,-0.009261705569627202,-0.04266489442304812,-0.1072776237611096,-0.0017739346250661048],"x":[1.463163674695489,0.6587916014424877,2.6577590222715126,0.8919040533399575,1.1981828978687403,6.786509341179631,2.585774578836145,1.931546746801921,0.7609606094899775,5.250268333402474,4.4326172935842845,9.254191090101154,1.0031425183141511,1.2413955205975007,6.8734427377816205,1.0280864264990421,0.6343681612884449,2.049789764572294,2.960194778705276,3.6722840667906924,1.3122913484387113,3.906673763034041,4.402972963868369,2.418340382704555,1.9445630630909474,4.165640337699461,4.365097173661722,8.082238920757323,3.6963478528852454,6.41571401272555,3.028883528667073,2.2704036731025967,2.0241062555954157,4.45135801252567,2.7826944360096837,2.0042197967175035,2.5680274028654777,2.0576199507066444,4.925673594059429,2.4092281298261367,0.6794672043651837,0.9070044435126206,7.831081806733383,2.350654982019063,1.5517554250127272,1.0351449305583331,2.0600345380404512,0.6679855700469102,1.517707518649681,1.4195622701147894,0.8942164759501441,0.7256536101155191,4.325376870739698,7.236325708094655,1.6492293181279112,0.9980216999039706,1.630167945998955,1.4017831328246113,2.273866222196541,5.833289123222868,2.899370433070725,7.026422963104127,5.41463136425388,1.8251770718400726,0.3020062069375378,1.8380512695177131,1.3631954436760971,7.859595230931154,0.7293799616199241,7.130154249108889,2.0640712774310908,2.02645845683531,4.598838894073054,6.196836836719693,4.782884819305092,3.499352924942502,1.9143206343366381,5.31092524691449,1.2923855096078873,1.2838187432678798,2.680056559708886,4.383816319906512,0.6638705767809434,0.396451633346718,1.5694910278612002,1.4610477826312813,2.306002179937619,7.460636854157755,1.4812694731063094,2.4380885361969025,3.328961165804545,4.453369457301115,7.729488641708448,4.495827752723757,1.3641149059765705,1.434407453473666,5.258150466267669,2.8790194866858854,1.3028892452471292,0.8303013212476051,3.7305769298492817,3.0243920235396873,1.658074658588783,3.4628637839131233,1.0962368894422372,4.412422452631008,3.361969979593624,0.786406490100937,2.684308792343458,1.1770977659547122,5.277380237444007,3.0359721745024832,1.4099952533504632,1.8856364955486833,2.8854387174315255,3.0003796270249268,1.4293603504419075,1.9319552583008444,0.8448577448106367,6.74485821706833,0.8988712983923624,0.7903763413376492,0.964398734998009,0.4268417691199227,5.140609288507692,1.5022934807993045,4.854866372063636,1.0128624947269271,4.485283027083397,9.081498921644865,2.374456539024763,1.4778146930187082,1.9807433163900037,2.474826406875493,3.4131559601899086,4.65032081172612,0.6052830478551849,6.935263966202601,3.7146026004086936,4.852310707784793,2.419098355623436,0.7762225018497149,4.9174627687995685,1.3450628787682952,3.0969388078332956,1.401979526112954,0.3424553076809429,0.7014228278207109,2.483087458466279,1.0737619613914586,1.8071324574439016,7.5888009974452935,5.831838787245511,2.282271452404884,3.0703509141192744,4.773522107945415,1.1520924122212575,1.6804669017019112,3.014591200879726,2.5388393925779438,5.2174863983028095,1.0717922674896274,1.8068390869121513,0.467308092193655,8.110155155637033,3.687810418131356,1.1775418133379394,1.6523428038438632,2.839066679517239,1.9435932078489453,0.2392125289066283,3.7117424819265112,4.527274415105669,1.080779043261744,9.482167240007236,0.31513656037922483,0.508644722248033,1.7426617031073657,1.4829416607619175,3.695124136488459,3.478774470281964,2.8454503157107705,3.9472423219450397,2.633036631148955,2.019917179999131,1.809723820852753,3.785317587179806,6.055958144324242,1.0732463300301078,1.132391481145672,2.447266274639532,8.752892120454435,5.739884212831223,1.5667699448096695,0.9541711037315932,10.692973971788533,1.54158100862402,1.4351655409079391,9.264621628686564,2.1181536429637076,0.7643935287419534,1.0089344432343224,0.15711206756260593,0.57518177546617,8.411810053919496,2.454097669676641,6.04129067536711,1.057554043799881,6.982444415603632,0.19869132216058796,2.344885081518004,0.9638810578514759,5.163181938871736,0.5757549913990485,3.8444991499445873,6.225451995678914,6.65764416944971,6.799802612337942,0.750359979671727,7.736296295828618,0.9821104899644515,2.767690494475347,4.107391328455849,6.435574048417691,1.500909139543424,6.676792393136683,7.810123598945427,6.367160005716018,5.666399081868341,0.5606817395911732,1.5387351048284623,1.1640785878799025,0.8721598456814187,0.7256342344149103,1.2584691011292006,1.5757652534139521,1.8331830985452437,4.494306561601351,4.481859995179487,2.978278725115925,2.8980502804457773,5.206240001119187,1.0284412233301032,3.4661633742236386,1.1564982426364074,7.053876958596704,2.234245154667924,3.1758705682044974,3.391852972657675,5.5536093750479205,1.1188248334924398,0.5419139404565161,5.922673760051242,5.392952927049702,2.368448569318269,1.2818402623915608,1.217396457304045,1.5196170689568311,2.2268456968105332,5.627352565188849,2.8876442599848033,0.945521373205541,4.78297674492396,3.1171967605466016,7.577307011892749,0.6931010477273143,0.8625533967776949,3.8397977170623507,1.847199886764888,4.75635578325453,0.7071028083017281,0.6775866604656635,3.5203642903117904,4.772361149177644,2.4375645789558473,1.0973270881984138,6.552057446643277,1.6044541433620867,4.786715691596775,1.0763964266434523,3.402546940302561,2.722522488025689,7.00393051248552,3.0057114563303093,4.646535943433111,1.1793504068499892,4.098571048447371,1.8693085800316531,5.682992237272253,0.6167611266847898,3.5436949467059993,3.903562510557503,4.558463336313318,3.189068325937557,0.5371713469462317,2.4108898889569135,0.780404293940141,1.05563117769651,1.1188686490964368,2.841994313144843,1.5055506785968729,0.9983954873589204,8.289921897105227,0.6304820011535011,2.8634681551942793,2.493189037421626,5.448280783342302,3.3713520399643366,1.562876573899453,0.749451662320398,0.9808539607651934,1.7995844845870903,1.8716071788800464,0.9648855156821123,2.529058681108668,2.9270607894322374,6.831682255230026,4.0541826927357345,1.286084050786823,4.998285272787355,1.4514874120551235,2.3667252389856457,3.9943534749962453,0.6838409910650312,6.655927907083127,2.84788691178458,0.17350268871332333,6.422709642407107,2.3999253285481235,3.6410436802830315,7.8513674946695176,0.8181166006590874,0.3859295118281866,4.474432281446312,0.9303121501467801,2.3438846169788707,7.290816878665992,0.5064120437879736,5.5884180335565,0.8955461863895973,6.77464296390877,3.3543626271447726,10.698572277916714,6.083075419761369,6.236999866249511,2.792004793553355,7.378345459667408,4.969518226683694,4.487837122787054,8.332648813818958,0.45486169249670116,2.232193402019318,7.263373475049731,0.2571522469817319,5.578804005390721,0.3065738643271347,3.839115500506141,3.300417635838864,3.372923137303448,2.1418652101276408,2.8321392430860044,2.952345412020814,0.7419776591997659,1.583166499529042,3.143252254010476,1.6772727107631855,1.3106421423256749,0.39734039371618063,2.9788432956372883,4.951008224667436,0.5086481486546974,3.921535652928151,5.753995749127627,1.1841703732115667,1.4901640212605367,1.6767566327825374,2.705077006083064,7.370094957924956,2.9569527955945576,3.0221783739677255,4.276436143500568,1.6879276255007598,1.514779746947415,1.3537018543308212,3.7786041873487672,7.368134284774963,7.5437279838185844,1.918170862986677,2.29340961174466,1.3246848256564996,4.4291364431386535,1.0868137380374925,4.800263523430533,1.4569899639003792,1.2284256790308583,0.9555500965488596,2.432281173877422,4.416125332993752,4.00234714633118,8.024797013239052,1.4618033168361528,4.502625225406348,4.7054231348674485,3.551015497383878,1.7757671544892242,6.4590315150038755,0.553292974966838,4.97411409221327,0.8230379333336499,4.033913106511396,5.630023417528515,2.1727388013425495,0.7629500626663898,0.9114283928755751,5.185365927443646,0.7937704085694804,1.1450908543086835,1.5765200521709708,1.106413877174504,5.31416398267516,1.0646119010520927,3.7705551577357186,3.4080256503927915,0.039103323296077894,7.885884082178065,2.090692149818139,0.11269196010156134,1.0194806534307748,4.005744043621879,1.1647327049424416,1.0761341493032057,2.4223280541281413,1.0777631006223463,2.770874577571738,1.7088252666175685,1.9046380575142263,0.4811860168879805,0.5425002920304429,6.824640751955959,0.8186532835751714,2.357058578008994,9.506826936295292,1.4267095451752891,4.968782454624427,1.9050877627181733,2.9637797279112847,3.121296297506233,5.8127522903364,2.9115819434289483,2.8441580076070645,4.185424483609683,5.737154566695828,0.28993901283372137,2.224364072843706,2.0624914339725198,0.5707578571617203,2.5666908114471614,1.2385272720498504,4.861916092168032,0.6867786913164363,0.538147310461673,3.4957781927496745,8.42727472215633,7.055439605196945,0.35616477972348054,0.9720099452582583,2.39469779002581,7.902931076944282,2.707498534755115,3.2124763379993366,4.250871743512079,1.466322551057218,4.081987395370274,4.381769803227742,1.7655843284051107,3.824780969276418,2.584968690747453,3.464911828103673,0.7775439180987418,0.353556765929311,0.8565104863666146,8.281438079862745,1.5978201378844645,4.391996693892286,2.823520293631006,0.6633640214432521,1.596661692379379,8.569119393553972,6.057117222492271,2.7513789768172825,1.0716813873223574,0.8682017095100409,0.7716250298351504,0.5719770756151005,6.634328545059926,8.546562764189744,0.17114755867613543,5.927884668137054,5.139843166938151,2.358472658131776,0.7848170629462428,5.021299792235814,1.8276935218258947,3.0594035152251227,2.618131667159008,3.778346622061277,7.554762770757786,2.1790231261978326,2.8454938973855137,1.8000427999892183,3.7815874889883156,5.288068125246833,0.9787674683528844,1.7141031115861296,6.38860321711503,0.30954937896245865,1.5714664521383048,0.5445641082824416,0.31627854094070407,5.519445269147056,9.804319580048867,4.588309136801188,4.723468393037235,1.7825753871562882,2.714289996986313,1.8299587048835106,1.1605787739404598,4.014065557500652,1.6928280941807743,0.5003965664179713,2.6292213478657525,4.836639308801664,1.964213971651734,0.5041142830634856,3.8799894607843557,3.232713716297913,3.09136032294861,3.18951728741607,5.522066944459787,4.5652697075860385,4.801452023087515,1.9797944864131618,1.7555622865718983,1.276006398408769,7.413258142735657,4.849657555904644,6.222201411214318,0.9596183243576514,9.269776427219483,7.143560299369607,0.39200286326006795,4.949381152691406,1.4339594677163092,6.460176446694566,0.8619712642759852,0.4503821862049517,1.966014438426302,6.465321839693605,0.9687539579460279,4.23784489009857,1.0812831027106569,5.22383473143285,6.600217603087486,1.3322733006548573,6.579891074053547,4.539370972944028,1.5524777957728186,1.9348271548232234,2.9754903503189176,2.0751377342675332,1.4311076410823318,1.6609326925979186,6.8805975913995105,3.2693240739857075,2.501974394064087,0.41289148162828515,0.9642316107554407,4.025433975812954,3.272210677357686,1.8834417283747964,1.9598983395857277,10.414963226022099,0.6205149238516218,2.8309330789867877,0.8551225539217023,3.2626600455382544,7.138516556007122,1.8840068349269157,7.927247521320981,3.376918465958882,3.010882211158417,1.0911719841504117,0.7436411396951877,8.998651959261428,1.0739924968895194,0.2574577618770122,3.2428998527459827,2.1184146170042037,0.7321275271470629,5.917304340365544,2.6413649769010927,2.8367343836873458,0.33356312993146203,0.4979516596361139,1.5142474590712953,0.8500223642034719,3.9305335027612234,1.01522566020114,6.248650080741621,0.3067881724624225,1.955933588544256,2.4985571652404284,1.228303225761557,3.8741360888815084,5.2422333810299735,2.438934073847112,0.8144919646093178,3.8275863286407596,3.4722905214724458,2.5538550727104523,7.487511586260543,5.167548540049551,8.710793272153882,3.027949310194866,2.112697424649861,1.5692925705379883,0.511421619642268,1.426971072089477,4.525816805364819,4.266233199562107,6.594732823661563,1.824052968553769,0.5589305896288954,4.49202628683044,4.8792686718075995,0.1703591067767366,4.884297715106198,2.2370962986208616,1.153190601813486,3.1018439849267176,0.6155190960188727,1.4978384524513575,4.727615672719963,1.5392546412371426,3.4655990226805558,8.288218182611217,1.0487233303189802,1.2909921647442832,3.9301057097353453,2.0343029922441738,1.7781804831559014,2.8469818164896963,1.6697174191899873,1.595969588892961,0.6966087381504862,2.587015845935491,0.43516430764376546,1.3696101771643687,3.320844159265561,2.1001186890660195,5.589318323889073,1.2703823931112608,1.5001695165456324,4.4108909612000655,1.759257686479997,1.4361932504012707,5.168533951791532,2.072506534040343,1.2786606748767329,3.1187905446896727,1.55215533239708,1.1935861056110655,0.8694844781501594,1.0583824788404823,1.3361838423060206,3.212765116412018,5.7771976576702775,3.9132343692221667,0.8667367313384886,1.0963839235500727,4.443325454425023,1.0813795942489342,0.7163274677204532,5.23338883076777,0.8402262805037497,2.7211288602853134,1.9656339866646104,4.716769536485026,3.426620709954111,1.5313220533211347,0.826820794591862,0.6726232883125268,3.156705646659345,2.517765004921235,1.1773026605408572,2.091301823258573,5.642326070080653,0.8223603876696342,5.064238972920519,1.2537963291870315,1.3087465997652954,1.5809834127000075,4.008011650054879,0.8936152867027378,4.924881296632202,4.048772458885365,4.947644053741687,1.0472064628793114,1.8104444605497334,4.765343941307545,3.3647079835741014,1.7337849828501835,5.046790724010731,0.6142552422330376,4.194250686968046,5.493563766730384,0.7373809603536903,0.8939979911371886,0.42014146775355476,1.6024076976958161,3.440939605430824,1.8342641759142662,1.2715621987835555,2.9532730171750936,2.043700136693028,0.3670440885138646,2.6060626022663596,0.6940660676539719,5.412504343838595,1.402658044225579,5.818365610103325,1.9737475183294126,2.6910209010272923,5.361375615390102,1.5735537217320865,6.324271064382426,1.9181129387377023,2.0857339866901476,6.112821631205671,3.761433479653048,3.3248296302578177,1.8422106373043252,3.6660049770564545,1.8664306791047007,5.254416653992482,0.39147677303676853,0.5094007874073994,1.7638939685165362,1.5087021330078936,0.8894105620322987,0.6504942798443661,6.6494303363284715,1.2885978108655136,1.2326166655761268,0.4289898307592788,8.421086806700037,4.488551457767642,5.41084618058056,1.2830216657583433,0.9063075791629218,3.556435938110221,5.152805103882651,1.5539043759944826,3.2748103026857187,0.3328414038084976,1.872287875710829,7.264541965309498,1.6712991209479129,0.4330018177316598,0.4217118638528947,1.792265474023378,3.0120237844969395,9.179024886461503,0.24106344615443787,1.8215137468768554,0.994867171117553,8.567192749902482,1.5141446570480164,5.347493439572535,1.6567028449906576,4.9051904347233215,1.8468686639916854,1.8996539165718929,1.4722670804726112,0.43504812380433355,2.0859948804650954,0.9352807984994045,1.7106163864074113,1.1238304435247226,0.7622274935070907,3.4490179490303903,6.86793275779244,8.707450963741403,1.3445903541253832,2.599717313387031,1.9006460543540027,0.45765916304670895,4.704542499139222,4.43358615686898,1.0697377454473864,6.007749140522996,5.846417795077032,1.3635166370932392,1.7896913826239447,4.438867302758673,3.153835058420067,1.03003264855503,1.535371736492301,2.890999447196762,0.8752269608567126,0.976223204364685,0.981504321652566,4.992161007057657,4.571579574713246,7.095582842126433,5.005132921419631,0.5183694308231164,0.7902787821924881,3.8507288126744115,6.632783519772116,2.6395945366395046,2.0407700570053504,0.48791588233333516,3.113751005810995,0.5503901169096017,5.4330164398925325,2.2160835600727116,1.7914095810916189,1.1074473217092635,4.123945401803527,0.31012651045195155,2.091721143523457,3.5253401128336277,1.2073438944828254,6.1225918865924545,2.800332424063394,2.3835492886871856,1.5507246976212248,3.3690679726793222,4.410413882962224,7.080997828192683,5.827717309002626,1.764537499297963,0.9385321313586152,5.690645123579561,3.8680283978342525,3.0060258317245925,5.340744149535,2.5492490106333143,1.9450764655250223,0.9424967735486394,2.0843758011923086,0.5204699419745358,3.331861341177012,5.000557991179699,2.726105272489395,1.5525473190936459,4.756467021765884,2.3668447617629718,0.79695395233679,7.898222810063721,0.4856493748298011,1.7061770975116,3.8236662797325502,0.3835304592616522,2.0854380523175253,6.74434748022954,3.103956702531848,1.7109708688000953,0.8354825224078497,3.7167570745760288,3.7545714172414053,2.043622842407178,2.727131753659111,2.7986548062843055,5.911620547849461,2.2164610478157973,5.119240309147384,6.540557738833185,3.1338049099853187,0.6951768152627082,2.8122241428364294,3.4719293701796587,5.209705392456801,1.9473830274556727,0.9317682325721922,3.880421864442649,2.18815946979963,0.5334922558253515,1.2037169527143687,0.9824634998687121,3.551671405290832,0.4770215885399792,2.093676601330551,3.1489780221611143,6.0086383083976544,2.3035071234609563,2.2258950562783317,3.1745050104436876,2.0114903863833744,4.318974938840078,5.142901681207885,1.425866789784506,0.13891975443733418,3.334427986070088,6.403434936985965,5.167292425596839,1.6683853411699392,1.3455482133302743,2.1803119414835512,5.377103281343726,1.3775190166747375,1.4342982066994254,2.754461879270572,1.246298766906842,1.5601610478331986,2.47090630065773,3.3183963783740404,1.0184178011732374,4.994412432661273,3.364720661715578,0.6756758825414416,3.0132767688210316,0.40083151377341725,5.3954059712865,1.8833892259354519,2.077066702947884,1.6619106199668148,3.0047336990811684,0.504383090194098,1.4973786917140668,2.598394352849187,6.255862566380305,2.6832354519201354,7.581424376442411,1.5306988422165375,4.686928285761203,0.3915091858677107,4.693438309232919,0.13476781883295394,7.782478570709211,4.485123761945221,1.428615530187915,6.662171013197181,2.740065985584539,3.5955327114851974,5.616730042944582,4.608177273092247,5.434767505808933,3.478587578653947,1.0781929358544717,2.3098131536369833,0.9167548197076271,4.176915778024237,2.740422648416568,5.295953441902577,5.056264586445761,1.9489922148745797,1.7082627585829897,0.8195693004564122,1.456743506756061,4.973679258830623,0.750670773153289,2.826160041441287,4.549992692198053,2.6288311887346274,6.529255126196592,0.6338380499623613,2.8003068679460927,8.483422342466158,2.116943024850468,1.4975996738539676,0.560736599356059,0.8305282022797749,1.5825087689578143,0.23604939031088867,1.1688578771020746,0.40016876235330895,0.947515194520521,2.821530005346588,1.7806709267242984,2.507236585815173,6.10548108849981,0.9237378763216539,2.3263569372194044,1.3421129000929068,5.49697796003543,6.626860817591885,3.520104413106199,1.369820682587287,1.9952514045199736,3.6488192720033688,1.5355304610214533,3.0566830027525285,0.5502112165614221,5.6704370694177335,2.1770529647403825,3.538882959179074,0.8820310589295821,4.732291103847629],"s":[0.49633068678821113,1.462881684504127,7.539714943858609,3.1011698526624354,4.133661121313635,8.679391658849214,7.949911909270004,6.50919943911674,5.336613484424171,8.68710144595238,4.442925200280252,8.89613316312822,1.6402284768014064,2.2501824546346127,8.291006422853084,1.5035733944708696,6.673026427879558,3.68089250934857,8.10565319314935,5.576882108332983,4.677026300604227,9.594538811984929,7.059613806130017,4.154979896324096,1.453951549008996,4.309181814230659,6.083955374022865,7.295321877543827,5.3644445086748505,6.075461977023126,7.374965959872595,7.228553284602938,3.3736720153189403,5.348114821055294,6.803698238730802,2.4502560207831325,6.770038372534916,2.96025117086562,5.105941787627146,9.641370753424653,0.773535550013631,3.0665217240407316,8.0166331441579,3.2878635866242445,4.984520457289882,0.9066500856675019,9.161119495727277,1.0804316124214508,5.291927138167836,8.493595145743988,0.19942841952032442,0.47026160361314684,4.084567883359707,7.969948856996282,2.798008124184883,0.5213747189708329,3.349505651564797,2.267045670197041,2.403119078077063,9.111581425790137,9.46465505837778,8.547612557839358,4.921147936399191,1.720736484374099,0.33203026952385306,3.1035049954105887,2.6508572760126348,9.606602038610571,7.9245092937150226,8.546611219873682,5.094510671866201,1.8868708345650265,6.122906503292955,9.536866836737204,4.583373439753995,6.160629291556843,2.5475532748794882,6.870597784829511,1.1622313732113398,2.046456638012828,9.285726771463409,7.1584058605273455,2.205310202368407,8.853530460544857,1.5817968531867255,4.550059977562302,7.162217547754917,9.053098673737075,1.3603928548249788,5.898387647243721,3.400651482512851,6.996087634708066,9.849282678478605,7.792656580565875,2.3312786993245904,0.9222878658322431,7.925452437697786,2.845401723985981,3.0766332917678008,0.030155123208599477,4.477366649518981,2.9492097431395226,7.470681753476988,7.220230998222263,8.174824949622694,6.215458466090045,3.5251608488246378,0.8288774790678621,2.614889442536923,2.8095694522621817,7.3259092990834995,6.1069380154115915,2.370603435192844,1.3397965603894657,3.357323369910108,4.500822196483448,9.846364796135683,8.66839911270345,2.6395728117911244,8.609147285644074,6.566985823845181,3.9825911759335453,0.920983209874553,2.8638104428994704,8.707114427787898,2.9482475631750438,9.384118065132352,0.9291051441683384,5.771053003665896,9.87939227032879,3.0181863019667476,3.324722963748803,1.3905510113435393,6.434735449945375,6.432681283019532,6.559110006133732,1.9778006739586829,9.145258649716506,9.121475252640076,6.991847672089526,4.061213182104925,1.2819170343358,5.502441487975567,1.7501849060585584,3.0769248152208806,6.906831983989932,3.7912632762865828,5.684858422069636,5.777072885243328,1.7189069662639844,6.295823447196258,7.917438809371873,6.636596023451052,7.223940343606792,8.174439272826458,4.081346361142499,0.7404344175640754,5.483995201227727,9.43946504552557,5.681463248834529,8.55117402220503,9.081843984090707,5.87199351531728,2.3670525237970996,7.962735201312006,4.441814401073099,0.49255966389540884,1.252146492415267,5.783687603673197,6.067738971567573,0.7118882629626411,7.290393299613558,6.562144353535229,0.40072851900179174,9.200171281415198,0.7935399066197335,1.2066527585046605,7.989579958729336,1.1813767701098965,5.845334755622716,3.462514856604242,4.903078134806926,5.0029695088500965,4.097972686581548,4.733538441123661,5.888829484150313,6.507369758624542,8.55075685379219,6.397101992140158,6.552356298859323,5.140045485819769,8.669685880598156,8.662749983557694,1.8554379781467545,6.459085006900085,9.884369691204792,3.7643129119203222,3.8403513023277314,9.129560985774201,1.7772577680985702,4.579308553698224,7.6167232000361995,0.12376249807315887,1.0730091977750122,9.777045724004585,4.483644421409679,6.3699513359768245,6.657493123437095,6.625827944615075,2.4854652703472,8.02828034956016,1.1624835672353129,9.26520300409324,6.4573643236972345,6.961220258485192,6.090542674885389,6.485191936362349,8.695334711019706,2.8271527549707876,8.4031580378704,0.25308944237536046,5.20548412979525,4.067016114706982,9.046064347294172,2.2214270019755955,9.320341292627518,7.681261928437532,8.68187702685727,7.436766046564472,2.277495005074186,0.9718287145045301,1.5463855474187005,3.595771691737475,1.1146385851472118,4.123258039205105,4.120071561085224,1.2936674963786476,9.714464839627116,6.082812996878801,3.221658754081922,7.514021833450735,6.078661270069907,4.173234760122044,4.591372579142499,3.7380911728611133,6.822939883803576,5.076205734561228,3.356451284643449,9.336506743085856,9.596305635863649,2.0444309986832065,0.5240282946200558,8.744754700241783,8.53057271471377,5.092764834853567,5.306907632979612,1.55424400061682,4.102753836285114,2.1491367843491593,6.524946576861916,8.214849692223446,0.8789048787039455,5.296029713673063,3.189382023588987,9.280785470739206,7.4004828802439615,0.02283319503115777,4.846527679462391,9.528182618101603,8.08150125394601,2.158072828514679,1.1817851081063102,8.930767694386752,8.299206387990022,7.372085940818498,4.673326404871161,9.577739173932052,2.312497134697409,7.834735918211704,1.3883410731756962,8.83159015231434,2.5816388236800702,7.409170486199093,9.739312654532084,9.203128774693852,0.8597885275440165,6.746015124115177,3.4783971546820003,7.293694784825828,7.152785164494109,4.467598794243342,5.702532603345631,5.859385748618731,4.468617871680687,1.4964236434447953,4.929387828919014,6.166633495790568,4.391628610580995,3.2567153739422006,8.656592269715077,1.918182804563544,0.8092450469619683,9.63019984766867,1.275120839573285,2.612402616120304,7.019633344967389,7.4500550687887035,5.476792391294085,6.281677851028816,0.2856389486896549,3.869958806992053,1.6264903606013825,1.1359443179149387,6.817311358507125,6.558081260598588,2.800878262741975,7.934310528664355,5.245140025457518,3.692171771526074,5.650976086633737,1.494950689401262,9.766335419340276,4.6555619218221445,1.8232522220360137,6.58542171565712,2.9387381293257064,0.3199530087536595,9.229165564464758,5.756442674894329,3.7238287645186863,7.399479751775204,0.7731994570012568,9.91351002730524,6.926290444818656,0.7020207512991439,2.714890636238527,9.110346728937316,4.460490706563602,8.05306510429286,0.062372623486606216,7.788257088011379,2.5285223285866065,9.974055742112025,9.552542212674759,6.313491332895753,8.747874722032895,9.42316663124351,5.4919045407584814,8.681807027264108,8.054870025370992,1.8903718074840459,2.1972927794034036,7.147524395615248,0.01990137732808206,8.343512837956222,3.9794092858024266,5.806707386230063,7.723170239294337,9.075750181791818,8.774644021286415,2.7853645425411266,6.005271169230024,4.573448888114053,1.0864315642027433,2.9735139432765623,1.823711313970997,4.16819122261413,0.22177823919996342,3.111198315728656,9.087204621724341,8.801931789353956,6.750515054862552,6.51433629560064,2.5379161960972008,2.955036382848748,1.924315944756092,5.747568168051329,7.353106045748423,3.980205662522829,8.458745757211346,5.320167589038416,1.1982860597565859,6.170470353350959,1.2203344037037533,6.596057029579092,7.250508701323318,7.510208289979577,2.843706826233996,7.30248468287316,1.0072634438251993,5.736078330606819,4.54666817583544,9.044619174432347,1.912562543190024,1.7993555971472408,2.7677056170544745,3.698579959876238,5.906797214221635,5.279263374511231,9.242344230677089,7.9401153122660295,4.611183206966151,7.8599367974804535,3.272994453518714,0.9945763663842477,6.972549301969526,2.003214214905913,6.797722232257719,0.5624969795107604,7.379842414472972,8.52374321040617,1.8509703583762516,5.308445666865138,6.712921573676596,6.633493870366398,0.04930284076869906,6.030674087256096,1.2029481286406485,4.832681443524319,6.183816395781938,2.7075781533293597,4.931787133646011,3.8769730886166354,9.007013394403074,8.553822470422993,2.508134943944489,0.4024968291850062,4.493561478427662,7.750866981601563,7.550204068282442,1.8226477416267772,3.8297922697801634,7.213689505528043,2.6350347728996137,4.553001899285746,4.51522570777632,0.41086600684825614,0.19177550080010652,7.536136130035597,4.318184109732385,2.6713167168170604,9.677580262928915,3.633380647663178,6.435559035558631,3.850198305020358,5.58306818559948,6.0207426059309155,7.527441893012218,4.132471185810371,3.303086670251285,4.223530562098816,8.978810251781827,0.06410468208315256,3.5119105914881565,3.0894748142923634,1.0296886594410792,2.279710540753974,2.376006446014909,4.270337269471753,1.365002867862417,0.835422181195653,3.632138787388093,9.541971130119801,6.9930628933831525,2.6680281584265653,9.280550091283713,2.984318831079402,8.920982821973258,4.103768371188488,5.276014289281516,7.97720831237916,6.132900048028365,4.533188311738394,6.821425028194888,5.155561718402453,7.291057765357367,3.807984273490974,7.919511510354978,0.40923074685597527,0.00896455846667088,1.1997236833809177,9.129879221261666,4.012743170652815,5.953453597395965,7.898754267423129,1.5412062005794236,3.441236349187342,9.25810103069734,9.60494453287688,8.15813613707486,2.1667296484427445,1.191165580781175,1.762104455752842,0.1117516063393742,6.2227313889772855,8.856527475223235,4.950334944562456,5.503257197772962,9.295590838982267,4.006358983244183,4.342252768407537,9.797876715383016,3.1542521204841867,6.568948964447947,2.2059714399734065,5.057212955793451,7.8761821824509575,6.069056669792485,5.322114190446965,4.3709537508753,3.1981158283385214,4.976839410193432,0.4415986718001452,7.385475274522982,7.001631821704977,9.031834704975438,0.7936960177934171,2.491866548802093,1.0998419930521197,9.545383738225773,9.986438751500277,8.050211447568401,7.162257680455415,1.4761888442558546,2.0967181860459982,4.485171059355881,1.5241341456397262,9.845763426829935,9.21070395456708,3.7689238439829897,6.977957213478387,8.046830248111226,4.901272904375289,4.3204102147078665,4.017957097475071,7.695467821430224,3.7792805760729653,8.216429849890796,5.5737391309654,9.206098287228109,8.339903402826438,8.624897651606245,4.283982297166771,0.4328104098591745,8.47828306346768,9.155531763764538,8.895910439710406,9.13670142775118,9.55088987743235,9.328138941872059,0.9650683073708888,9.959730155134876,3.2902684476114796,8.789888966462069,1.448330451521842,0.191034729570001,1.9022352212095384,6.634911956002025,1.0782602780702577,8.680452755978546,9.646472079507971,6.8656789141131425,8.036770877873085,3.828663389499092,8.295993046923709,4.796892318653572,3.593872030361742,1.964368127454288,7.054842048342856,2.5733750574115266,5.119469548986649,7.139291871599696,6.1397462700248955,4.761748313656926,2.8390774668148655,0.8537566080994319,1.640280806341743,4.647647992890156,5.926142727716018,2.898729875992989,8.709481815112415,9.919370152740616,1.9973118905066656,3.278903258278827,9.989486819497461,3.577340432688474,8.798376978036247,1.8468294979064437,9.523517729648203,4.513440302681491,2.7915602343206847,1.6571960436093858,7.128393474001844,8.375564431350337,0.6239138957710755,1.9528955244075252,3.307314334259477,2.590686573815335,0.8795573406957491,9.032350072692786,2.047042523138536,4.298928965026394,0.2454269875396431,0.7956926811265008,3.7922921043813362,1.626650617842178,4.877903649158766,0.4025273838226462,6.050749047173984,0.14031984877775683,2.9516153681861224,8.429047881892757,2.7041063045099256,4.888979219957193,6.055857574151204,4.439810074292414,0.20387905341151313,9.89208340293807,7.832598165056597,2.1683719655638023,7.547355166920835,5.2945512335384715,9.634792822806496,5.221641899362288,2.591824846237647,2.2971720534646356,0.9344784089576463,2.3467188650498283,4.56453585698277,9.555257817629059,7.782298911279007,2.370757484958197,0.16781350439071696,6.834695896300875,5.487785544185437,0.41314988335204417,7.079168540237378,3.4689339641773476,0.9904050421657784,8.678396539923956,7.741956153696712,8.341311549077211,4.612998550294591,9.617041453361697,7.269586137652791,7.49259110639751,1.6872888801736008,4.834137858475421,6.540871666589505,1.912723110752197,2.947350717990549,3.700519272254099,2.760168112904322,8.058037107637501,0.003557966417200298,5.705962139236789,0.22177924483150813,4.279454506957087,3.413622864502701,1.3015856885756771,6.86032027578441,1.4067457852096332,4.00363264724914,9.813222979469087,4.136179200297976,2.354519944207316,6.541674556245269,2.3657003911525187,8.878523444957429,7.989137716822041,3.0677468235739846,2.225312967505917,5.622853578989226,9.289752218476943,1.1326158607815384,7.427252884811992,7.476365829143255,7.357557941124524,1.3571678632598094,4.710345502665656,5.677838020422583,1.3673063851700884,3.44882246941157,6.647486679722938,0.10700666056572716,3.192641729887744,8.354519737598931,4.690869139406601,6.491315819777805,4.794815501789122,1.1813915060958347,1.5010835809340306,2.804410463363911,5.388691144290549,3.0953851167072544,4.880418013766397,5.750519390202598,0.9295070719605936,6.442437822957869,4.63843756003592,8.833395273225777,8.268695578216942,8.824803981858656,1.1295338947148292,4.420151221886847,5.645422360534711,6.373465240801965,2.8217286464802305,3.1594786480076187,5.023629430947379,8.195938291246762,1.0407022076129535,8.281082318864854,7.471509647438024,4.612993740258327,6.754752609238837,6.1757981315835835,0.009604703670085257,1.8023518109507197,1.7118325949127078,3.164014885081756,4.109063763992015,3.056383436576584,3.246041223105489,3.306622555154275,3.4088452539109615,2.4227120687040027,6.267601593559755,6.97648913720151,3.7763608182183406,7.281495537053977,5.608320548848756,3.996802079218875,9.089795256361136,0.9735965415214243,8.6890249072347,2.0201119863034034,3.0703039377333563,8.897674630791455,2.941786372240407,4.324057306905747,5.581300096404098,7.967003281332703,2.063349139273769,6.523805569190067,0.43852170839128846,8.772186991680709,6.72078765255165,0.8724465207873511,2.5222954461810576,0.8851090820184093,6.882368727773507,2.3072346078733497,1.0660421075601412,3.7464630227953055,8.715001406664822,4.719536049784592,6.167477954877052,6.190435984102189,0.9594773395855194,3.828734979949666,5.661291007421645,1.563119459124962,8.81531440561686,0.8963903310192123,1.6039731940636814,9.662084693145477,2.5891018127924004,4.341688882714103,0.7509532214111614,2.336823025569583,8.905727578933664,8.572376600085455,0.21693914257495228,2.1245948703913142,0.33988661154190636,8.769183157215359,9.404810954185,9.190228427679719,3.133211733868708,5.084609791565731,1.7958087566141923,2.166440518475641,2.5889506091986814,1.8919682460410892,2.1352678160511918,3.120338764772168,2.7763826279162895,0.8456579107173923,1.578666481528166,8.435763830517647,7.107426356627496,8.916068556159944,7.777420031368432,5.576089857809441,4.855305015791409,0.5017582002480392,5.127702260612996,5.46390218956539,0.6602642136750303,5.3985939317115506,8.640043337776238,6.9595667434543,4.65378577308639,5.23207614501726,3.5638453133133607,4.720328721754605,7.741126023917091,4.391506177163067,8.92105789363364,0.6545351882102346,3.1923748289965914,5.102965798037515,6.029232421538577,8.371068100622303,9.585249158220854,4.323304548814653,0.883859964227276,7.092428856685267,6.425512514446405,5.331569373504326,1.730741022872413,3.2565188372985476,4.040759362146029,0.6016127956493711,9.886505699500841,9.447213935697484,5.32548045790058,2.1036106646844432,3.6197726974477806,0.2092764553986992,5.6232913733191285,5.218658390449898,0.48835261474634795,6.787505089693415,9.996063039576676,3.3866875878072356,2.592308988237042,5.400615901656003,6.815553511158856,8.839939914948825,7.357504555675138,1.3815795263422181,1.167435563988788,5.074185507458799,4.192121489593383,5.607007888348066,9.38298035236095,2.145847191661414,1.9504600633751346,3.248455773502572,2.156119540623327,2.43813881065182,6.689207295713375,9.641396909429291,3.310220890369322,3.897169570904644,8.255758374946495,5.362615632742653,8.94906796869357,9.344642228069794,0.8505757103921696,2.5620256546779863,4.187441261770619,1.036562283747564,2.6616987628392774,8.03311047128578,4.938180818265481,2.8332213680347973,1.8979679295918284,8.546393216724557,5.827026759116842,2.2893565512180714,5.055082068578165,3.615044852820679,7.492237876090986,2.340726050781825,6.654992694761086,5.98217374222497,4.214875278904271,1.3505102540619074,3.2629361989034056,4.853482005915661,9.766187703521927,2.5401067337809358,2.7733307666566565,8.316612464762434,2.4659883278058503,0.5691288779918691,1.5061813451888795,0.13342111222751862,5.127348779948715,4.249625236140469,3.0745377056636913,3.712042025260456,9.089530060871198,6.8081395056756255,9.188468412534533,7.11024011410508,8.423372836993973,5.688791943700069,6.273536204529031,5.44634933192264,9.337482106585735,6.482564605878219,8.848913271848147,9.275241943325991,9.593478777050281,1.4415992866572558,9.94995306502091,5.411301345747328,6.356741309930099,6.08359398048681,6.857231564075419,1.5029379906795115,1.1385711745976046,7.669157891174663,7.907208212634407,1.3463859333027473,6.6030107781564045,5.360633690661311,1.2756651225922555,7.766750040025199,3.494015576841525,7.247725362958808,5.429028070362691,7.485222917014484,1.1099711578449223,4.351971508332422,0.5063186847294165,1.6678318793576685,3.559573347628102,9.097691395739849,6.732871645498381,9.410417479708975,9.608092119557707,5.776284008644648,6.856700384199965,5.0832862417656095,0.5190932734081866,7.8558598450110795,5.294782986059525,2.398714033843836,9.599719565494507,3.609854665814607,4.9577301080318525,5.677713527261073,6.499594946681362,6.4681508401940775,3.8489552448317887,1.40145782452469,7.74711085752982,2.5784761316694715,8.928062883869789,2.5616166158339237,7.198844791383392,7.668971586967817,2.3867515289905317,2.515129744122746,0.7225616193213269,1.4322090576665891,4.580934737946791,1.0952183738057686,5.056175564201593,6.577197316265568,8.236843118174622,7.755584710303931,0.7432035405589277,5.995426926360919,9.989403709241685,9.912684590535399,1.0911383639309902,4.287568812269951,0.36990796808374693,1.6167651750617473,3.090290565631011,1.4459865098351155,0.5910926620066803,1.1666350464518915,5.072035779650614,4.585184185984974,2.9483854199523107,7.691461582016896,1.6621310624288332,3.2069798499956015,1.6928776704489912,5.0110179796143095,7.918754810144097,5.4288914701342,1.039954402554859,4.311234513960014,4.9898913947638075,6.771554416722836,5.878123839585243,0.8870854055144095,5.663775079611122,2.118860472068338,5.545037568996758,1.139840847967164,4.502752344874946],"mu":[0.9833159174356698,0.14270223843552876,0.31557510010952106,0.009388683308020562,0.33097713252009786,0.7317442168631085,0.9243263760865665,0.04740329580145186,0.47312994083420823,0.06291747144268234,0.06872957777767708,0.8635909672376847,0.07274572749652375,0.7432535043691455,0.0068168069182121815,0.9969714681299793,0.21507606649410493,0.9941530600104713,0.6088823360406606,0.8314338773737278,0.9969089598685303,0.47497857794081866,0.24569810009015902,0.5867148824980024,0.980358365701469,0.46018758160498585,0.894973643678572,0.7956280863770633,0.7670333962191098,0.711405202520178,0.759259869125003,0.01011506913670246,0.9678808192059789,0.22722200620356459,0.6250227601099991,0.4740810282850889,0.5167236067974288,0.23872440727416055,0.6203905436879182,0.4774317705816462,0.6706698984749528,0.5798394227473744,0.9699490203612862,0.038593029075394414,0.7386444820216751,0.42894925253281313,0.0674854935776541,0.04717173037832256,0.004510138801194552,0.41712634651922276,0.8844276498864563,0.3013805349042442,0.3657776518802094,0.36916926643210357,0.20446339353165133,0.8224030722480653,0.18396839688078792,0.8277813339662421,0.5150817938524188,0.9986067120496989,0.5570047516422183,0.17284951166669793,0.8254424053860947,0.6928897721871365,0.11661909327699838,0.55940614721806,0.8452539842675779,0.7546257537675045,0.71629782992534,0.14601019599166798,0.35087794031302555,0.803936875363986,0.8628940424696738,0.9241476585959187,0.5388300658363057,0.9896272604152341,0.585952019170356,0.7998038885135479,0.7321145146586692,0.4970584387207313,0.22643724263317666,0.29045287944668274,0.2179327198439247,0.019802273462400377,0.8897244661653059,0.4131916573510528,0.37325950822092624,0.289335099862023,0.29658580430536086,0.1668099963546268,0.20291107379301132,0.8472141800258581,0.045696511060246525,0.8623669524897237,0.4071748934070183,0.8703649740154416,0.9070586059217922,0.727110910365345,0.6484379585611959,0.8167848889206797,0.7836230148695558,0.8750609420662885,0.4366436587303295,0.27679511265263845,0.6359427492182548,0.5732954407913073,0.05943039966745678,0.2445029988697569,0.7016263312463649,0.0021361221428919386,0.32526185991344314,0.21077800514224343,0.7306437974265458,0.7919860777219019,0.827140704592263,0.9948799578931433,0.7438067169973213,0.02563161874316644,0.5150645501567999,0.7651067593016496,0.5832038169150819,0.46161935335224613,0.5198234517396549,0.39508737401007266,0.2941331898405499,0.6648292190813967,0.5005678652494809,0.27254490774382045,0.31476098741059033,0.9469302740429282,0.28643220097506816,0.3124963502307825,0.7693664183833575,0.3314031611451407,0.10552994908567337,0.8183992389757888,0.15372301293585378,0.8423954206483013,0.21056565437241992,0.7171136944613019,0.1963681964954933,0.15975386661625857,0.7729191945892748,0.046351121932723505,0.22723361629916772,0.9899401158044887,0.20178013506288384,0.44662430002196696,0.11284201910893854,0.044379644832843734,0.2630847486892878,0.15265127656971278,0.5455920911632302,0.8768976402509936,0.8347027815834331,0.890868319595856,0.986574763768781,0.6196051366099473,0.570439918958562,0.7767197276266187,0.9385365607359091,0.7862714664740014,0.45464332712359634,0.41625600342244873,0.7882310133065571,0.5694620349523007,0.8041773986320147,0.5453362786734592,0.2423874162875732,0.17821117278703125,0.16821184752827723,0.8863828911447167,0.1669278564868104,0.9825217241269337,0.6082920654514492,0.1437435531260749,0.1728901833653229,0.8125418566618023,0.48436011796140543,0.019027349047593844,0.18173954187700736,0.49233430679019774,0.7824113881221955,0.01481218170052756,0.20380058143037605,0.3293510191409501,0.856308954573255,0.01961089653036252,0.04097295459739425,0.5100943358971768,0.7257547265002875,0.7968618392065501,0.8884831054712472,0.014236927602754967,0.3954571913359124,0.9451937122140097,0.7691844720822614,0.9503282540302576,0.8510049949067438,0.924781571164512,0.5232233232987664,0.7722495596670884,0.13052371953391617,0.3741148019244964,0.5118988795750923,0.6427107398561469,0.6424599941393299,0.8226867526683281,0.8506210988463974,0.12577261041981314,0.29053088314743025,0.06482846503557305,0.08703602953422918,0.07894946949153692,0.8681973430457974,0.37325360772959404,0.9525818255339054,0.9779552577591211,0.64900985809209,0.40655864527469987,0.8658270255909342,0.4750503466009286,0.748547496367717,0.5321723890889478,0.14503383496261435,0.46998586546216226,0.6885873447913831,0.9744753683870588,0.5847558648725277,0.13514928170306684,0.569522209291951,0.26719187359501895,0.7953023013885114,0.2400038368391586,0.2964423681672914,0.9225190488524315,0.7416675474195669,0.10968377314629585,0.3472106711737817,0.6037364790054089,0.4956246408507414,0.930599850507176,0.8915427529028324,0.9312218293927608,0.9752712618335537,0.9956114644208764,0.7632273589241094,0.08948167205537794,0.19535937153409355,0.26997962146669496,0.9848302539569838,0.27602939035213403,0.6427646976406372,0.9357016979142538,0.5827082959293721,0.9111197496114825,0.16360479784098847,0.46753294304227744,0.46060129826325547,0.22166719605390428,0.6418408695516196,0.28406776118618127,0.8816625923950006,0.4595524380232805,0.4052904653793392,0.4608199910812445,0.8399197318168914,0.6225193236259425,0.39580706075785743,0.4468053997830015,0.18759952549148307,0.20132798137745156,0.5897712160046853,0.8318978273716591,0.6032009911322671,0.3613724144165176,0.3133084996958033,0.9770191570150217,0.9163332678804283,0.940033079105842,0.24186081185555963,0.8031197946556923,0.8195846422195396,0.2321321168377295,0.31011449716710215,0.9816735879392287,0.3808686494715603,0.7684804012238571,0.36629870010753685,0.11600376259309941,0.3822947542930055,0.8881827757424894,0.040969526831878156,0.042316507080471855,0.4474057365005095,0.9048956615243846,0.4454197360081751,0.9479122334614214,0.9635907567946003,0.5479525301381847,0.8661567258221174,0.21995669219510927,0.11580245311696835,0.48543972439311034,0.8951792125119158,0.3613811618117653,0.21971371258982453,0.7646459782450494,0.8340527228573293,0.5350992454240702,0.11833983781319612,0.7009995715474264,0.8603406656543124,0.31360596856409684,0.47814403287413776,0.1266135873211951,0.5890387653662956,0.2883112438067106,0.2196658990468614,0.7444828859856463,0.862272282080905,0.7919885522767167,0.7760272527888084,0.6193099313283505,0.581778337350142,0.10380952377059338,0.03903362751590933,0.6981034126078651,0.3103400926475286,0.5734072223133415,0.9169847980788135,0.6258629575667309,0.23115332350784557,0.3867845570388586,0.883635958135442,0.01951973841762178,0.3027707237714061,0.14637109190723696,0.28920915602438413,0.8356536742882938,0.7656473125082726,0.9589723736071549,0.9063157202633993,0.16033978078749178,0.40121096577820814,0.8828736084247282,0.3942110584264684,0.9774432547476317,0.0276783254927504,0.3590222463570216,0.033345118822086794,0.13002885063632252,0.2988212832362427,0.25397976628909236,0.049534164783618495,0.2624260146331261,0.8315375464191577,0.5865226499768537,0.5030389328861584,0.22390980832635443,0.06778539984394283,0.39065003826627787,0.6082898849144343,0.8373057426528947,0.39357005675110446,0.9337086477219889,0.5558953866133158,0.2437854010411964,0.5279121578305372,0.2812365378375492,0.05563970607739477,0.7953593234742697,0.5459861930071719,0.8792608368342023,0.9463135848770443,0.8524040224909648,0.5142295292327677,0.835960020608965,0.3048114486845168,0.618623608984936,0.20529114013855554,0.7613657099327062,0.15467211504986822,0.9441005914210878,0.08848524435368987,0.9624372704981756,0.4041503695073203,0.7896336989263257,0.26595271364426964,0.377561301286109,0.21178402117092143,0.317158306245799,0.3424433240575464,0.9261237366587358,0.6883186591052104,0.04835337285886787,0.22128546705598406,0.6422420804283235,0.6082143761842396,0.5640186167783874,0.18656038068798453,0.7004174519064277,0.1857491140089398,0.32055238325585256,0.8448055875109421,0.006501281774901058,0.13218790350551912,0.014406016321234283,0.7584422952192744,0.36736827682021045,0.8162855672099194,0.47551558126000715,0.3310658654619967,0.8440909358888673,0.6789523580494303,0.748842989250017,0.9883313331668562,0.82691400788294,0.38231050795908805,0.5850377789794143,0.7726218718930078,0.9339579625410763,0.20072898717706855,0.00751083996755586,0.9610090037419001,0.9545745364117357,0.07469759036394019,0.6944143557941567,0.4469588623648173,0.4647867618456154,0.595860589368731,0.007519164041652315,0.7688753975649616,0.8689710100510157,0.5027282777546609,0.1722055901639823,0.48118015536807923,0.4300574673602451,0.7204317908029547,0.5734539727530115,0.3120316996780146,0.97843893252052,0.9952124923370826,0.21018424395629243,0.8560545647375135,0.17051004986076435,0.9069089153211334,0.7137880361916404,0.24134933462965003,0.11144331992813994,0.5851003755737498,0.6613974564866665,0.2631317437862615,0.4519504256607134,0.9740083258086925,0.29806856650536906,0.296352485007515,0.4027081824707497,0.8393731577075758,0.40383993489689884,0.3982810139077495,0.4184915648949141,0.13473681706115115,0.71294564735144,0.29137648331743793,0.5593977603531615,0.11883221391827692,0.7483793331315705,0.38260535984523414,0.5001392206950723,0.24890327749852337,0.8708482015860839,0.24141576230005612,0.9851291039319652,0.09360505534489594,0.6569333693111421,0.8766664499462049,0.044798009850724796,0.5657146663615655,0.35150813943346737,0.8104952329997799,0.6067214650451014,0.5707575733022714,0.8922415196536726,0.11327540612801323,0.43563962348435403,0.23106406468334306,0.4399926157761942,0.5088558196620871,0.3698740870045705,0.7782935447246113,0.5183432999195163,0.20534782376735872,0.5102494827554611,0.7600040828878734,0.05951731573767116,0.026786254067491466,0.4437559513987921,0.4478407082026721,0.3742996935073004,0.18164926519723767,0.5974587679561771,0.5072843905024405,0.49045267508980817,0.5123377040163137,0.721474415066431,0.06862824370156861,0.8949266416844226,0.930528976567659,0.7100540138597891,0.9957295146383895,0.974133930776387,0.7968927070129572,0.5081742084391045,0.6154912803711317,0.1955788730639476,0.8999889687092768,0.23712311337699354,0.15216082427739064,0.43966073880473,0.8354369684289638,0.5413523259932291,0.9716186469160126,0.7644169789737447,0.6297503371675419,0.02659928707993031,0.16454415784679077,0.6346635885267515,0.3269034100090966,0.35365656242920673,0.3325865847738403,0.24778936665894968,0.8494058363363883,0.2563549038852031,0.5633548009151326,0.4139358122292598,0.6426805601149039,0.32876565848826433,0.9050919148809031,0.52603941656613,0.004651926058060418,0.5664632057229577,0.42640841166789234,0.8951094200927958,0.7017589041164067,0.11681161614405866,0.4443723958400938,0.29101749822002576,0.9756801136890907,0.21106306849484113,0.0821243435571486,0.6136545063481738,0.7528383251844661,0.38870905691667446,0.6333113560542745,0.3978033314689784,0.35341842670065415,0.18965387730371686,0.6497671925106354,0.6042244868250608,0.28379641389807,0.7551709926796293,0.38318184338731354,0.2854143780585552,0.9661134270646805,0.8410184951526771,0.3751775715337613,0.40259549230563674,0.6163528387383421,0.37038060744937384,0.7809326653589548,0.6537488165027983,0.7956803234719869,0.9778376427270146,0.9850278027636441,0.25428143358778854,0.05180149779607213,0.45748284912830295,0.7021722571215221,0.9440996356207827,0.9599617864226022,0.8853807885807454,0.3514044649546002,0.8802106382023132,0.2528485846324786,0.7383423465960377,0.40392951793436493,0.8625458978308878,0.6070258715699526,0.3473668509135399,0.6467222935786623,0.7814270601236171,0.0986671907074741,0.8400117796925652,0.6474012589727882,0.10319431797319845,0.2381905695402471,0.09519413873999949,0.028369999759090048,0.7913857883151527,0.9352694622955506,0.712448103604534,0.2816793856636608,0.24370129295647946,0.39431086473358556,0.8143571587609251,0.31015226861507217,0.8810106420812094,0.9126648697380224,0.16718067737485276,0.4742140524937064,0.15973988496390734,0.4899529032580525,0.749975129836385,0.9717374518942419,0.46499993223616154,0.6968093554223858,0.15103153776955391,0.15082449528298447,0.43316283849855264,0.975238163922171,0.8218510199894868,0.2952804127510278,0.41246214497247746,0.9633197624590222,0.9033273294058142,0.025018579927331475,0.13347484890426897,0.831685333947427,0.20979634725175877,0.09796229522752142,0.1376445263219901,0.44240219390970803,0.17632166678343086,0.8843275462968752,0.06322277969158652,0.43798853311209585,0.12043176079740925,0.23446144184114082,0.37118636888000256,0.395368077233879,0.47657039354311626,0.6176931820877771,0.40218879257199225,0.008866090028411655,0.8110205939261808,0.34360061102020834,0.2950899233630755,0.8832443484740691,0.9042606098928652,0.6345084475547853,0.8003576196664937,0.05146652490976411,0.6032470719850844,0.6951060267165674,0.5669908206909349,0.3419056137621066,0.44947083460752046,0.518174773371874,0.9050836657738675,0.06074945490379924,0.9392802639143532,0.8223350579123268,0.8503674141124791,0.7168557938980713,0.5909265506638941,0.8869502112107093,0.6375263156199797,0.13250714950704734,0.17505646654227225,0.8288353394291046,0.29286362187401105,0.8228145380109135,0.9890079255405857,0.6424272298645417,0.5174547760801567,0.8706829006254109,0.05172221578348091,0.4283405574407604,0.7102359260528956,0.8828594399274803,0.8485938917748601,0.4749094145415633,0.7013174497847325,0.7551098542622283,0.5816980713112454,0.4964834218543104,0.45671983973961217,0.34628400664178294,0.08497199156651725,0.5554962841678839,0.5992393491042174,0.9192200018217682,0.7561005121377631,0.8299247547884798,0.2741182323064846,0.8613147578161977,0.4498702311197349,0.06743396232428167,0.7083307617493055,0.8998341203202103,0.34779485907529417,0.7584632455207454,0.23884136122694177,0.8217832284851583,0.39725840379278354,0.7540981693441189,0.837993443910507,0.05244088036077921,0.07964461628585129,0.553589037533522,0.7207395965664183,0.26137332294523064,0.04280595448911617,0.40396105052563525,0.5483215632211347,0.49160371760891786,0.8864626411833467,0.16156901724594808,0.8777465874180466,0.5998920654436775,0.006032311310493421,0.31401973951994,0.37753070269283584,0.1577417061676094,0.17009811904439132,0.22920182042292092,0.44904661534607215,0.431499269127122,0.7869938538582655,0.23829494422626407,0.9407193919519259,0.27897009669730277,0.10181116509303045,0.9649586714478577,0.5978421048057263,0.33307033882387205,0.4738691825330148,0.869543201781402,0.9715680438734393,0.7770481966057972,0.09940801709885538,0.44461101153010163,0.9206849422735315,0.15010715503874317,0.03144042379892875,0.05168262965936821,0.3610236232372719,0.8474640809274812,0.030397925753741006,0.047905119619510605,0.8395262192422586,0.14263827781743,0.6650844743325484,0.41504845580438143,0.77781925012066,0.8876810276274478,0.00010710272428338108,0.7228372446948268,0.1927183668904442,0.4438699299452533,0.14273741745584578,0.9051591922394329,0.34721763190395283,0.27382184219456507,0.9645706946214998,0.9419099471493739,0.2516445449685776,0.049456136571649933,0.16217768178811665,0.39450504564370914,0.13790490010485512,0.9223504603356147,0.11712520063154441,0.19815968266857875,0.8644417685283312,0.09727907217328102,0.8624250414123176,0.09080657918893609,0.8456965985701015,0.6114945862319452,0.4666732815863841,0.3601269477868161,0.4202310952594306,0.2664617106186704,0.37334089517881064,0.71780819019107,0.4245770833453668,0.6068742260447881,0.019683314847779743,0.4915158284662491,0.10834491653963396,0.5821798104874802,0.1747255564366077,0.2936671794989043,0.16700694375843073,0.3707076033553802,0.9761699097200238,0.2498565631421994,0.47070599433145244,0.7908512672970591,0.4106467928022721,0.44415084662796467,0.6673550475261734,0.9650168562258148,0.3537838939184208,0.6855478067123992,0.1510331286575164,0.5384953842756481,0.08802388948685613,0.5592577523054365,0.7781910962260656,0.8859382854235889,0.7747496066482966,0.26567422629347104,0.06811201005557366,0.3150173015290114,0.036208829037300605,0.5917562770295766,0.9131912749367113,0.32283567560035475,0.9948692197691309,0.27194631361701416,0.4011334313611703,0.13791703400526267,0.8669399253990873,0.4770757906139391,0.5950340902793012,0.8045763753121729,0.7838408753505794,0.3052166283344333,0.4326060976704642,0.613999074643335,0.8291838341814799,0.030458234453935695,0.40357058840260973,0.5772719393555523,0.26157187062646825,0.5236786373824489,0.32881285810388783,0.8151677183689767,0.3711718901622638,0.6966639303784499,0.7501818165077061,0.7489882261221592,0.49130270071965154,0.4141206724087796,0.5278023997159687,0.890973108321707,0.39729669653451793,0.19763032575803496,0.8637845074259562,0.26765514570281623,0.6681013723194897,0.21611622581230727,0.5491211379767251,0.9409474639762836,0.9500066918904424,0.1511507110353505,0.2601333210095653,0.09338287264377176,0.25043759624737083,0.3216490956178877,0.656803866146833,0.3615924889667945,0.7031049687877411,0.1600260053617033,0.014350443111338151,0.49565404058356943,0.5516361141233277,0.3685164781794774,0.6459143360836843,0.3325096996200865,0.9025489160544202,0.250919183187611,0.06795999456924617,0.1313835258180176,0.536538617215198,0.7767335612543182,0.824130734394698,0.22635525376738674,0.23624414138020033,0.5496074426413269,0.5333016844590206,0.22058673078418867,0.10514191165903264,0.5329549379859719,0.10354248577997294,0.4420270842903178,0.6491831491854252,0.8818936650340796,0.938554722212533,0.28523162055551765,0.2978145881702572,0.5459844651458927,0.32613489679195595,0.7149256030070021,0.2625194362741845,0.15629652652783133,0.5790052644403176,0.500520230887014,0.8014920693569969,0.2824260746199141,0.10836104778791777,0.37178799877200763,0.751676519232428,0.32128540346294865,0.7072824417723229,0.26592656772384027,0.2988666596089371,0.34905665069269065,0.6740088828351256,0.38582086131025717,0.3814889123842937,0.7101201700141062,0.8847826622358952,0.5138286190857178,0.47056383597247464,0.923742373401643,0.9944079835088933,0.14937230297632542,0.06913482774531321,0.7737084014547619,0.3194439658899315,0.37355123777573906,0.12156058719093799,0.538219916039524,0.6193794745200036,0.8737943528810272,0.06404491017310998,0.536599138251169,0.8708810758889038,0.2598175762722985,0.7494092653255466,0.7740986230666811,0.2689925260137529,0.8469495120044579,0.07773996558644192,0.2570833818329419,0.05680680444570152,0.24949222981443553,0.3189348368753202,0.7765142213670182,0.10844228788288124,0.861677481374258,0.6184805470875816,0.8369071232774783,0.1519696489465514,0.12480453173078243,0.4763736476862912,0.7811219015535713,0.4828904617544254,0.010162947359103613,0.7099688671008044,0.3584573970040148,0.8183629671915071,0.4128623145742736,0.0863092134282748,0.8844771156262046,0.6017702213941645,0.9061005054536106,0.5403015148522174,0.07302982780408285,0.6748796200505285,0.01700449600741627,0.5328142450693569,0.8673018575250586,0.4692486694708351,0.31204169961835304,0.05512919950298234,0.1368100145569746,0.5041513965262325,0.1300113965705052,0.5414067284118269,0.34184130821542213,0.05727739210007221,0.4124931514128043,0.12917352424909812,0.1803345724228944,0.7893497593767491,0.9399467106170352,0.9994703087090846,0.0011499492216924256,0.06346316193120027,0.6874333937511157,0.08684611761678274,0.49550827356214544,0.12381621417526434,0.5131309749381481,0.6837517312000008,0.3426444715424717,0.9628249278282073,0.8920948517172849,0.4743029120417763,0.27770065498777874,0.7508225489795746,0.5363789854153278,0.09649476963642267,0.33611669245301945,0.8127439751433898]}
},{}],120:[function(require,module,exports){
module.exports={"expected":[-0.3094479457361064,-0.33686398253008126,-0.07980874149123206,-0.546340755712849,-0.22429175385233535,-0.04986983497002901,-0.008305612778817537,-0.045806146186391956,-0.2771986097606644,-0.06530591781551359,-0.45880910747978676,-0.0013457052237698245,-0.02798756025625655,-0.04405390320413059,-0.41120906343908525,-0.00013526807945546566,-0.5498296963463405,-0.27662299498520737,-0.0001541061380174238,-0.16500049430307992,-0.16021770460719398,-0.011436195718068844,-0.030928800980511508,-0.18784091396340227,-1.797597409317326e-8,-0.2760119315409595,-0.03775267127048938,-0.0028667931832360018,-0.003996887373547259,-0.00051915526262605,-0.008016944428514096,-0.20565836455871922,-0.30923160758499774,-0.1950344837850924,-0.18130822595339768,-0.01564504223849254,-0.622027850625628,-0.0007323955146603979,-0.019556055557715935,-0.05387446353657933,-0.1903535130155019,-0.11017938906705152,-0.14338635688663834,-0.09493795062782852,-0.001329996140526361,-1.6935317211408647e-6,-0.09706968887377507,-0.3584122251803197,-0.00011047844609942846,-0.0012755951618596188,-0.20471906284761177,-0.28055430405447734,-0.07774295326814074,-0.015820728423166876,-0.20921122053609773,-0.6429795065289873,-0.11716846802650924,-0.2740384445456536,-0.12111328302629451,-0.48311141290585025,-0.25380444805780633,-0.10766413598321083,-0.5315664310661394,-0.03849194812418593,-0.010752248604213532,-0.13160866326094467,-0.021991239768653234,-0.00029881006896698034,-0.053288310652857745,-0.2594405889565147,-0.005155560866944912,-0.4093911611778685,-0.45422152359742407,-0.01198922494133991,-0.057957191122350045,-0.014413435225288578,-0.07155431075055994,-0.00010105787781107164,-0.007576309794594534,-0.0072243486100341614,-0.186686496801516,-0.009964641648281487,-0.22849553019278984,-0.6374485289767821,-0.016248800363842214,-0.2542391181509734,-0.2917852500525251,-0.23553031734746976,-0.14078070514297222,-0.007126796468922878,-0.12628324972729252,-0.021023648123782848,-0.10035244964295076,-0.684571902439999,-0.00012887634397779445,-0.010036087340540414,-0.4861536328716617,-0.10520814052603929,-0.37379133592842634,-0.3933421581837986,-0.28381156577952327,-0.00010512587515580764,-0.061414746864283144,-0.10230483014751286,-0.008016564840588042,-0.0016815827017072243,-0.08215607276700249,-0.17575265101950047,-0.00023819150843294926,-0.0025962725386805474,-0.014808391622605123,-0.27417607003419286,-0.15867535207460587,-0.012184109257366377,-4.172176241095045e-7,-0.006321613657183937,-2.8497389575612925e-6,-0.6663258236212206,-0.0005353657458722756,-0.10525012934785709,-0.22606385998112022,-0.3068270002437927,-0.000642901712870268,-0.4833406450360121,-0.1708096289777621,-0.0001909258651039901,-0.08282818131505922,-0.2597178312430614,-0.021442370869100103,-0.21090987628547458,-0.00012855244764148018,-0.2008293889150689,-0.017311881565441018,-0.1373677593864508,-0.05919058743958115,-0.0016120336324031315,-0.2524792430589017,-0.05988138838682031,-0.1570533917748971,-0.11621580596309727,-0.006889167732223778,-0.5193433310663987,-0.5420100478266764,-0.27324261151067325,-0.01631634573935466,-0.008530821191980589,-0.18836984178077593,-0.05010026339308699,-0.0015494022916793327,-0.3313382854399571,-0.07730419703669608,-0.00854006497836677,-0.31880105541014286,-0.1352610316568843,-0.2676277083104143,-0.026750418988373523,-0.04490040567136846,-0.2950118113301856,-0.12270717527278549,-0.13844254763390096,-0.06247767779079274,-0.06165785495991086,-0.28533404799999745,-0.6788844216374009,-0.16013687212622232,-0.269967974754206,-0.42737357364955425,-0.08645008773206769,-0.09583026359283343,-0.0007137453163641687,-0.29203377266994435,-0.20830691215132224,-0.0009658521656044128,-0.05807658252125304,-2.904370133166655e-7,-0.03726230710522472,-0.434067278405042,-0.015299855783484998,-0.028069806640049766,-0.578265784158537,-0.029081787421644238,-0.017842359467918907,-0.08674524187083163,-6.96306167339844e-7,-0.21795349669982925,-7.173466082167408e-5,-0.030949628329993963,-0.0274903107946226,-0.010618497073335221,-0.08678516187845742,-0.40153764086740407,-0.17606531077604234,-1.3201278571935824e-5,-0.05959766876625446,-0.1614168926860256,-0.3298405675890452,-0.29349521229744235,-0.09009766697269016,-0.10713745654435364,-0.11197314268632526,-0.0012427804659429311,-0.07715090315083309,-0.00020677572729869737,-0.5689590831773415,-0.27633166174689244,-0.03673031347758184,-0.17835794541892921,-0.004144676091422004,-0.4482595704939685,-0.026961885218117546,-0.6639433517564652,-0.012200168590312024,-0.08552183990839601,-0.0334817243736148,-0.028624922903350683,-6.099395435027974e-10,-0.6005941710969457,-0.4364841690782053,-0.4374817488163372,-0.034242623757690424,-3.7661866214824984e-5,-0.006403869766580477,-0.001527251086866922,-0.4444762590704623,-0.2164209088954891,-0.03556379645379039,-0.09892675299941217,-0.0365790201462023,-0.04968615372956038,-0.47224241763810554,-0.020539035422105036,-0.014737513780098407,-5.278054757300175e-6,-0.16895574142834446,-0.03596117163030474,-0.08481792725312085,-0.0007721815143657443,-5.342817103115611e-5,-0.04707929155684968,-0.0633381348403063,-0.6751436015148736,-0.06766892794590318,-0.2957487346646763,-0.13439340932296479,-0.02888757765466993,-0.002182088410307771,-0.03524767679355537,-0.2990296838276799,-0.0017880289246126923,-0.17686241023607893,-0.05250770405702365,-0.22118601307998817,-0.10359656374312379,-0.03615131113121998,-0.0002975456799044675,-0.46413956974298326,-0.0052492895882618055,-0.2785709227054028,-0.0002377049877146636,-0.073525867145053,-0.4052814259167044,-0.22080968442060314,-0.13324297074698688,-0.29460938811268855,-0.142396251993321,-0.0006617274865511152,-0.010569955528693777,-0.019415560617283632,-0.37641075866765644,-0.6152252740833929,-0.06956233470153461,-0.6357005542145343,-0.06279689114856708,-0.01569411425506497,-0.4269289694275208,-8.705043169328822e-7,-0.0027282400875305785,-0.03671206181048723,-0.30833905450026444,-0.09976700328765248,-0.6601690743981261,-0.12435802904113025,-0.6004680556697759,-0.09803379301805076,-0.19314860531700484,-0.2499652538400053,-0.0008141111087503457,-0.02126349917060978,-0.47569246058686265,-0.5950002273322963,-0.6523390780896459,-0.06782381346884177,-0.013330853700645528,-0.3246689721318486,-0.6228266079987911,-0.12586683089179823,-0.07573295651200569,-0.24298384786324564,-0.3069985746838346,-3.6643829009941412e-6,-0.09123977218826959,-0.001587222695860655,-0.15008638594424886,-0.6093918839955345,-0.0015332428685185023,-0.2718667493593029,-0.12735383830222294,-0.3159786121055114,-0.466176472761771,-0.25207986618718814,-0.34494924088013035,-2.1526782571363428e-5,-0.12317291329401348,-0.4133859934778914,-0.22522586546280143,-0.6580337632719238,-0.3118152491640778,-0.2908494357901975,-0.04695968166633088,-0.03533711004377638,-0.03905794731045895,-0.02406614613375211,-2.8425846161795197e-9,-0.15214707357627488,-0.028551922038352162,-0.01119120271998942,-0.03996267769369169,-0.28840100604749624,-0.3443433038218472,-0.0059939040865282355,-0.0008828475935755584,-0.3113525246650409,-0.5506728025310863,-0.17959622118777235,-1.9465610898150226e-5,-0.46438436730440014,-0.3469870865247259,-0.4386256245628769,-0.5449879909132175,-0.0002766976310728543,-1.0340294252708887e-5,-0.000884552373466093,-0.03207081655992184,-0.3244145549045184,-0.41824221953545926,-0.051535813990280795,-0.08814689774327719,-0.32017838455660114,-0.16933927079306357,-0.06311986407599608,-0.2242069580022301,-0.16200121227889344,-0.13158941026616833,-0.2788995331653408,-0.30637460937588407,-1.825284476005649e-5,-0.001167460891611322,-0.04235326345401622,-0.598000094745783,-0.12059612997665001,-0.00014750201818428157,-0.07563225975095199,-0.1112959083577591,-0.13972455562451755,-0.08265600818969171,-0.42903300201197914,-0.0019920036452463685,-0.03660593304302403,-0.05384388923901491,-0.038789072561835676,-0.43698463038275337,-0.2646683044898243,-0.49532902871774925,-0.004041490346626728,-0.007616330306171912,-0.0017519617003078176,-0.07905509243264086,-0.0007362238867192945,-0.05638660166544221,-0.29380318412465023,-0.5958387353232273,-0.00012771096129868164,-0.4075928112081644,-0.11155946534247357,-0.002166300337519526,-0.00010123517110026944,-0.00038317196264764494,-0.3155184489750194,-0.021655916081667646,-0.0183439613573789,-0.09784907474509731,-0.03884485495068889,-0.0006925361630127518,-0.12510985159454804,-5.67678160514946e-7,-0.009582292253698744,-0.17034495302555935,-0.0053950677152764465,-0.02537109477336525,-3.7366117189721896e-6,-0.2842869906974523,-0.0014423420163805622,-0.0011375028306460048,-0.00817615084757562,-0.18016241647321424,-0.08481714313891506,-0.2490818623654946,-0.09622297526138593,-0.10366491087587874,-0.13453670103412274,-0.28754562565657005,-0.6550071003342985,-0.14056370044299077,-0.17977613062868414,-0.39140276930034473,-0.5332078310579604,-0.011679679973798488,-0.15212931077011926,-0.17774195952968955,-0.594335443093786,-0.6012585707424245,-0.42370328406681124,-0.21706210526155284,-0.09130661902464346,-0.03143339240216383,-0.5957665608794038,-0.004140441081394474,-0.00935246058478318,-0.14499477400569868,-0.0001592146539862372,-0.3586229451449344,-0.07099603967770318,-0.02147592742777723,-0.3032898764337426,-8.784964583428169e-5,-0.0002701917418951105,-0.007057086596103006,-0.004775067556350557,-0.32242904136815337,-0.028773924248140976,-0.1674736146879543,-0.3220105937358995,-0.00018050467124629786,-0.008995938885259742,-0.07400771453151138,-0.03795749967951381,-0.06631189084958788,-0.00042921329209446294,-0.11682245715118231,-0.0013945473621632433,-0.0022100769543081473,-0.07777285756513354,-0.0005786176941242148,-0.005395376147781396,-0.20818877240048214,-0.24687998597592548,-0.251771523378929,-0.3551826106145721,-0.10832556824479202,-0.03449066539452002,-0.14072228223662842,-0.013915843364776694,-0.0042925835748795875,-0.06343528841713462,-0.538080487816047,-0.5994727839547638,-0.027914556742123453,-0.6556162106033047,-9.920098006420431e-5,-0.04897582989838103,-0.516893836013788,-0.33601592608093284,-0.0006189016748734446,-7.27028543083984e-6,-0.001241197072119249,-0.371303329893064,-0.38394567410988595,-0.36195916541328493,-0.08476296790433499,-0.044072592700364434,-0.03197146769547191,-0.38882128982525643,-0.0022747696416139575,-0.6695787207847683,-0.04659194934035063,-0.009883884939130186,-1.1705825159899806e-5,-0.12377220478539061,-0.06386011928538037,-0.1516767839566488,-0.6753579403897165,-0.02085468800866461,-0.07049531460721178,-0.5510279717751233,-0.10569311064382887,-0.002911328092465339,-0.0019779719021475045,-0.33709846903214646,-0.12338747410926845,-0.5482785632654171,-0.09323749012708454,-0.28582823864907886,-0.0008306715900392379,-0.04935505323334612,-0.291943447513408,-0.16563859520922233,-0.0007228921659771999,-0.0944222197445755,-0.48242290247228103,-0.24508367381636664,-0.1195214726286845,-0.001674302437093042,-0.0026404243944369906,-0.06569367590253199,-0.2564367491052904,-0.18122362758842567,-9.677501262319678e-5,-0.025810577414212527,-0.03847305041437128,-3.862185748855406e-6,-0.17682134989074208,-0.0015211114674775566,-0.28370966815112286,-0.5044828779067378,-0.6576737123697484,-0.6877696324412482,-0.4315994801880003,-0.000572275510071705,-0.01001907216301879,-0.20761898650536537,-0.1167583005246341,-0.645015702999853,-0.4417290298833531,-3.690760399281775e-5,-0.044092908029296024,-0.1935405522605187,-0.0022813864478766657,-0.5470157415562807,-0.5431004640928809,-0.24753716850010457,-0.021056275007506696,-0.27294402012301155,-0.3165395079903185,-0.0003020142293122364,-0.17423302758997267,-2.7838512082507457e-5,-0.12594600884101365,-0.00032295387461525843,-3.601347262809804e-5,-0.11526752176028429,-0.0131896337808599,-0.5415091466711024,-0.2870622099073464,-0.009895510619615544,-0.15028068600812847,-5.76402966957543e-5,-0.641726548621812,-0.5231826806473341,-0.646357242775695,-0.32126850579816646,-0.039675336411264944,-0.010106553673349413,-0.00015091933900028123,-0.004427808198514836,-0.009520122260566295,-0.650681032739127,-0.006327437116109812,-0.08329202857330478,-0.5619881060231129,-0.07873450373303971,-0.10389165227691947,-4.5672284170535013e-7,-0.0057829074183925085,-0.16302633497887317,-3.7069450973919474e-7,-0.22765387831677245,-0.017777465122991904,-0.18312657493099938,-0.3238230857422922,-0.21005641299414843,-0.00922102429580565,-0.012561049945581958,-0.5027476783946769,-0.050034179563973116,-0.21565843744539112,-0.011232231566757246,-0.03055000350950958,-0.025876550937854813,-0.02331965141631396,-0.018491074356860614,-0.1095797738064461,-2.960333644294748e-8,-0.16094987603721403,-0.20009508044904353,-0.1267086806971144,-0.1025350833692562,-0.5341039433655779,-0.03832100258363138,-0.41497817125542547,-0.17361262560641472,-0.37431118462555935,-0.5937832964198748,-0.0005885703807336764,-0.028804594137259425,-0.010075656460921078,-0.40392278964840184,-0.08907172843298305,-0.14925080210976185,-0.024980199158429167,-0.2022222291444306,-0.5852728825929001,-0.055085535468493284,-0.2591384219383368,-0.37332948087740664,-0.03503037761641673,-0.19974391094975127,-0.10735808505954181,-0.013905309346109694,-0.0015806647871498421,-0.009342038226556524,-0.6267645150384833,-0.4426600448676761,-0.31557361259600814,-0.6066248258782874,-0.006635063312646527,-0.08646204889090561,-0.3352688376004981,-0.1579791150731849,-0.6450952508223555,-0.37873306700108644,-0.25525749883930976,-0.04914076392091977,-0.00462127618884766,-1.060998478605895e-6,-0.36115357808083787,-0.49074051998699925,-0.2487105198129136,-0.007258353624215715,-0.2356734200300739,-0.001960502716042663,-0.0008973700720734002,-0.10904610703813447,-0.6754286004127857,-0.23789555182223454,-0.00019699530705740678,-0.2686614381793743,-0.0002855315173417668,-0.0031413790403625737,-0.678040435844352,-0.00012253049913898577,-0.2323855790926693,-0.018721398182736004,-0.5465619468225172,-0.43371160911828555,-0.10583735953513992,-0.41478191104417844,-0.02208262880200726,-0.18976662007947429,-0.2208194046170716,-0.14969246560164307,-0.4808148370665765,-0.04297556378673451,-0.14098669255574928,-0.025934053907499668,-0.09844179041322676,-0.6688215509785627,-0.006715940703205527,-0.10468575517084486,-0.0045642822031582465,-0.13166581203281136,-0.21399852192352317,-0.25250837271340904,-0.001660940771283538,-0.1653681121350668,-5.374392860322567e-6,-0.3479238641787167,-0.1471446384310116,-0.5367619010808806,-0.014260892878454926,-0.6751038069767276,-0.010970100782978607,-0.041377089659788036,-0.37802614522339884,-0.5838147818859557,-0.06585757600709578,-0.13966884344317063,-0.03477702707619607,-1.4709690906940675e-8,-0.00415794957987861,-0.0016162801457859136,-3.4904288575789983e-6,-0.013339962560967424,-0.6833347238892737,-0.545498124022846,-0.09581855695269757,-0.001639997428442209,-0.4812298740677808,-4.6359136493978486e-8,-0.2493404634962382,-0.0005441583895731989,-0.08790224897599834,-0.060331919539800695,-0.010930633804493592,-0.43299159614404203,-0.434811593966043,-0.02603465110462121,-0.6419484896938775,-0.00022860265463576146,-0.06998134900017831,-0.27496434609971476,-0.32841633632661876,-3.731443412552173e-5,-0.020539440654993014,-0.576388203644032,-0.0020956821109070233,-0.025682670519780706,-0.23166277048130687,-0.49539003963102296,-0.06367732204023038,-0.12635713362156414,-0.05921621704574899,-0.3070903579620422,-0.5576038407116486,-0.4898178992744624,-0.2455804261215817,-0.6892741026838046,-0.012477622844714173,-0.08621308527091462,-0.11139059485666725,-1.292164908099411e-5,-0.10104774349970133,-7.322926685154317e-5,-0.4794762904617528,-0.31109556389895204,-0.08161284188022602,-0.07539230618343847,-0.041685047929525126,-0.03085787244259841,-0.039987669777373766,-6.408269713883443e-6,-0.09745918056401627,-0.001661101998726139,-0.4821151752901351,-0.0575102177990312,-0.5412077919715683,-0.015005495865523166,-0.05521227479863527,-2.1836651614425663e-8,-0.0015438401928338427,-0.567777836900186,-0.14148657627540023,-9.564037780921587e-6,-2.1209242512939e-6,-0.0019275961767432413,-0.5384683275544084,-0.3001873640149606,-0.19316987453994622,-0.25774839746087114,-0.26054765063225216,-0.004620760735571417,-0.3464575670274267,-0.00011328243204131018,-4.691095099756482e-5,-0.06586678161311622,-0.001294756665721335,-0.03490902828657797,-4.0796794976413366e-5,-1.1173093379873374e-5,-0.021146375503104116,-0.15234502102978953,-0.014418447789214386,-0.5409164243757527,-0.08803793638706721,-0.10816161651921673,-0.3062554863936843,-0.6737257914178753,-0.0425077590230659,-0.3452093895338672,-0.34568885196789717,-0.034639694567611866,-0.12771633502218635,-0.0006486356105928789,-0.29809033067124135,-0.6268861456653657,-0.15393677003469847,-0.15814374864231126,-0.10957595075341157,-0.04898811783498051,-0.5859977706596162,-0.012796213774887474,-0.24447799728501837,-0.20020753554971912,-0.3792339688623627,-0.013270511657124964,-0.11127764937295405,-0.251443913569736,-0.34397502034790867,-8.112053666750705e-5,-0.015528915304456579,-0.19668625482911306,-0.0989014332439738,-0.07020472670103957,-0.0888465076339068,-0.2081579122659421,-0.3388389863714484,-0.010737984538358598,-0.052440881938279206,-0.06825372891102312,-0.16133394803027074,-4.973289638786778e-6,-0.6905947916758373,-0.008836822658461264,-0.027314486288336964,-0.190805511540923,-0.28872140088118703,-0.2957338770194475,-0.0703416923050916,-0.09532016870838773,-0.030443088019685375,-0.003911264315649301,-0.517566952109584,-0.35566471155793394,-0.006777210054430858,-0.025591663446372336,-0.5663582271426393,-0.005953354934707599,-0.35935461497391735,-0.006522228700691208,-0.037852787485727964,-0.09192709552437964,-0.0379868987919354,-0.1991820198657574,-0.5032139459466289,-0.005328477872530438,-0.48816105975850865,-0.06457655038947997,-0.00016971546014294092,-3.7508160461282727e-6,-3.689963977839177e-5,-0.0169948940755193,-0.24157785871118095,-0.21122447879808814,-0.41147132509119677,-0.31256624861430327,-0.017961772165192433,-0.0013710147068541417,-0.6897099875907087,-0.0004947162798767157,-5.0140625672997174e-5,-0.2826216444387034,-0.0311082935922435,-0.43472840626792303,-0.02765502157447344,-0.037136907096391725,-0.010794281535914958,-0.07337803658230149,-0.11620837517795882,-0.005415674699095637,-0.008369272718814455,-0.02279699501962789,-0.6438047963651384,-0.021629473692296914,-0.3697326382605689,-0.23992783551588692,-0.039822006445263416,-0.19809899450405694,-0.0027768059541128506,-0.29243905696526046,-0.006025079917084816,-0.009183317350444961,-0.24880028847408336,-0.017234084831814416,-0.5486578192742334,-0.01914815225527593,-0.26585624962999577,-0.5133241108587697,-0.017015945013126463,-0.07314004476366973,-0.278659433233019,-0.0002614438599827504,-0.00014871615902140636,-0.009653888179346039,-0.5172561232675092,-0.027986255019054655,-0.10346449348768191,-0.2940997288302476,-0.10057616889981286,-0.21909775020281524,-0.5796856871261951,-0.0030970353505150533,-0.009580984836116201,-0.042280858632883736,-0.11733290580289973,-0.1946778230252757,-0.32147564956874364,-0.34374954721684964,-0.3203836521817874,-0.1712032249687005,-0.19468545737431237,-0.014568375393061194,-0.0044120593569128355,-0.38776606122854257,-0.016900958554081018,-0.5393260623114958,-0.36926623253750096,-0.46630251016054275,-0.00603643129748863,-0.010780645948306132,-0.056202487628544275,-0.029755917218219807,-0.2645111373748196,-0.002973835360964183,-0.17890596756257673,-0.660997038097213,-0.005100617306334275,-0.0001925116485391243,-0.11072512010349184,-0.31053013312462996,-0.5468943055357661,-0.6673253460256552,-0.27878630453588676,-0.008872866788547588,-0.03775348151008722,-0.024300212304422333,-0.02203294425983087,-0.4986424565561318,-0.047066218454385605,-0.5954877016130579,-0.0006763077622036679,-0.20764002093119574,-0.4884683071518462,-0.001999552263878412,-0.03977282128637349,-0.5361565813017812,-0.0016511605961664706,-0.001273411163127681,-0.38556655793879024,-0.471701970251048,-0.42115502902592844,-0.18336625334737977,-0.14183829656062105,-0.0289088316684547,-0.1597256769608334,-0.4584701257704347,-9.484998298057882e-5,-0.00039228824972252545,-0.6357882697556189,-0.6798516087427019,-0.487431153834986,-0.0004485487277230688,-0.04399681608011787,-0.1921564021636559,-0.44472135074164454,-0.3217067528837757,-0.15440838904865456,-0.03585605515550864,-0.11999403387534568,-0.38059986703385457,-0.1898154386437363,-0.31552609793155256,-0.6166893638522698,-0.04874590761335816,-0.2258337634467728,-0.4697877529070351,-0.10303567655437235,-0.5632530722308807,-0.04353376503482009,-0.0923894503079305,-0.34498181305550984,-0.44390579773615674,-0.031080403740852122,-0.06389492371695271,-0.20888639221346278,-0.15255849079284614,-0.45347764077383623,-0.00044284988743720265,-0.00041088003213498616,-0.16262576728673547,-0.09006187828973611,-0.014344354694437218,-0.4284744757922718,-0.3358017821391921,-6.90809606067001e-6,-3.2545844144799994e-5,-0.3007359062946209,-0.301797343239526,-0.015947738350830357,-0.20088974127868248,-0.005356619248538935,-0.25983152817349525,-0.0012163830161201214,-0.22569099046843213,-0.012541365922358962,-2.136071772762381e-5,-0.0019257980446721948,-0.0002846652315653241,-0.36244115580865,-0.02061839364908012,-0.21537263548495253,-0.16471338439703476],"x":[-1.0311504623642063,-1.6856776616496467,0.13956720411766377,-3.810548234127873,-5.6259234160261125,-4.545237712382578,-3.8345485251157645,-1.8773610507757557,-6.234183603242832,-4.3125901293720545,-6.795611289255889,-3.9011912336121126,-8.640483549144896,-7.087739038183582,-3.7806872577322963,-7.256686401717009,-1.9328495789566489,-7.534594391550372,-4.716809037104633,-2.4112330274569547,0.0526041161582414,0.6213789280371901,-2.908619238117997,-7.268500458972319,-0.2930171126631358,-4.105387970857286,-5.43002386736477,-6.012306238981936,-4.046931489141345,-5.259594712345735,-6.004284126371745,-6.933868014923705,-6.494633545852295,-8.957428513710697,-0.7887329643018857,-8.243777222873376,-4.638197067123849,-5.299456100577573,-8.964845734108719,-2.0642387759584695,-2.8541000041960296,-0.3615492150701244,-2.0528542718230884,-7.210983474385599,-0.8314608392389498,-6.624303494534629,-7.855322379076238,-3.2253280578151626,-2.553337227521129,-3.234440968015035,-5.542408139040912,-7.748433555264246,-6.411970147196064,-6.308432768919425,-2.6974753793200343,-7.106418828471293,-1.3243833338974327,-7.216749449362764,-7.646880075029904,-6.316535244888253,-3.082549190573831,-1.3350697957135957,-4.771895486329828,-7.133580072209949,-1.1185862157335937,-3.958226773593244,-8.216011257637836,-7.449511603212457,-6.834234447904833,-8.39399944471866,-6.651200620757786,-6.623345140394617,-2.5035252418701006,-0.15477339067652773,-6.640882339888129,-8.082939914999772,-0.31417026179817187,-5.729902394411044,-4.02568245328875,-1.5736560751704474,-8.633647680896251,-3.0570628403652043,-3.586370546878949,-3.311150707870306,-7.145618618766644,-8.473644723189807,-5.92252530177367,-4.937657391216406,-6.658163852488912,-0.5565776581527468,-5.867815515218516,-5.602654289620144,-2.0899400834515176,-1.1905112662833,-2.3753263043021144,-0.677258806636762,-5.68413988816185,-5.224644084588981,-8.553309604140967,-3.299265003994457,-7.932598145163225,-2.3887882195866625,-0.8941545599857037,-0.5635155657631821,-4.549479834785117,-2.668076079468209,-3.738120450632848,-4.768811063247121,-6.058683891866627,-4.229113512565879,-3.5831070189433203,-2.0834360783977406,-2.4921245221250956,-3.7948451559559984,-8.238757820645388,-5.781163158402187,-8.743364062703508,-5.5232286659904135,-6.160527516973714,0.605799440500335,-5.45170095942736,-8.213781424633734,-1.5927740578872742,-0.7401559327155646,-9.097050309871586,0.6555905918289302,0.18404988593842314,-2.651516982129831,0.2752681792644162,-3.226082927761607,-6.12543913844376,-4.204474379631663,-7.837093887094843,-1.462463059190246,-8.26739699965918,-5.465704639720764,-6.518982610593108,-9.749118896923942,-5.030631502369667,-7.439160240491166,-2.313699739141313,-5.062239257575722,-1.8994144027235926,-0.6555035426596969,-8.905166985552244,-4.820808966308033,-8.965339797715567,-2.4206205788546615,-1.5376973364494069,-4.174842358420841,-2.6210034732234373,-0.494816929525742,-1.8319514200693203,-7.367285725204973,-4.140990002297345,-9.714698199985373,-7.853228581944588,-9.45647446559103,-3.177838104848312,-7.8727875473731945,0.03995691148441527,-0.9128002922904961,-8.201220222497964,-2.833651157990433,-2.7559474515648703,-0.45099785818007987,-8.854936096046098,-2.086696756367586,-8.437685594493688,-8.82460797295307,-8.66269698604605,-1.2805863346965558,-9.597239607109884,-6.89938138195015,-3.217899585455786,-3.015653409276279,-1.549213722354037,-6.782662219337735,-6.145808536614407,-0.8325877689447274,-8.297804160909768,-8.320679887620598,-0.01343416264787567,-0.8161436850753745,-0.7737832674897416,-2.195499105449667,-4.37047678801416,-6.259198021729168,-4.3113383681758615,-1.8136757090115836,-5.291942901137685,-6.829679031183506,-2.899578877733572,-0.898918774416935,-7.9782162445968225,-8.742666536383183,-0.8757101771013661,-7.244944048069342,-0.5593396158024412,-2.129641361853216,0.5770880059450206,-5.264530446563264,-6.941364857814322,-0.34252971135481497,-7.771991710767491,-4.5943566662192685,-0.881538585379759,-4.8508552078684435,-0.8055097437782899,-6.510709002126835,-6.920269445659439,-4.0457994591294675,-3.5472735637337043,-2.7229869715759376,-3.2034138583266025,0.0986440584717268,-4.394360388678363,-2.8591216871688157,0.05387541041740494,-6.961960410444242,-5.600004497356664,-5.572946859300733,-2.114357155821139,-4.924575657494948,-8.51725531868935,-0.644749623792725,-4.962641015734404,-0.7643769259573392,-2.103974866952389,-2.357157016865607,-7.505439370581801,-6.4922676294707955,-4.568530180285229,-1.455857384323253,-7.751408775029456,-3.5701573033790446,-8.482646277970161,-6.388578960455855,-8.485862652131807,-0.9856898841059538,-4.900460433794006,-7.0367008810716944,-9.071185491763096,-0.33338896105250826,-4.566705683102589,-1.4468644531096317,-7.3743030243786345,-6.375306776805372,-7.326706328852407,-7.3715348313913935,-6.773043393677039,-8.160540176668892,-7.870641123579479,-1.3278187164665671,-1.3759236743942271,-9.625082541188029,-4.805223631535543,-5.5617547259515066,-2.156518600929918,-1.671036038923713,-6.425990711994693,0.30714134957604233,-6.2275913623807,-6.919613598818473,-2.898170328050968,-7.172680873519509,-2.8977169229822204,-6.620176288562941,-0.3374747794709373,-0.1261675031777812,-2.1684494330833024,-3.0371000570563846,-8.193080029817624,-1.8320396752327353,-3.846932424125957,-3.3024684729071376,-0.41206346945350936,-0.48748434790163186,-7.112668652500198,-5.5992142689536655,-5.525939452257648,-6.64031785266577,-3.2273824803882474,-7.431913215436352,-9.15593030859153,-4.390996637325107,-8.040556652654644,-7.779133402704325,-7.90358422506639,-8.837985928417813,-4.190296011873419,-7.125212824940582,-0.1815923582381378,-1.5872515976090857,-0.15941687886935518,-1.5591876424725153,-4.028835676793761,-2.504159529198222,-0.37465540441968026,-2.9730165131722424,-4.189532721657645,-0.5985655923892332,-7.4399240905752455,-1.5445270340193327,-3.962396415001216,-3.743142246499437,-7.669943684514975,-8.7727419567029,-4.499709894500086,-3.8225505938197233,-5.406583473929295,0.1631238099347988,0.42584073686146773,-4.323714508751437,-7.356479038361694,-7.863767280785269,-8.053663875163243,-9.060187481561291,-9.302035891806943,-0.36238164646085225,-8.757969110951413,-4.276300028383277,-4.787975814395151,-4.715643863758286,-4.6641515548342305,-6.977563131297521,-3.241590296944872,-4.829845790432605,-9.77612553434978,-6.300893921463977,-7.548509671594438,-2.924239269097144,-2.376036623111792,-9.335124399122776,-2.260335963308936,-4.744147738190529,-5.037230728453367,-3.5687310770586516,-8.696969908559032,-2.839910405973293,-1.567479849958622,-6.323219641917536,0.6770268546068289,-8.450082398847526,-5.723546706777492,-5.181675392072842,0.22676754870366422,-6.4564484925958725,-2.5040954238806337,-8.96160104106873,-9.652198673954334,-7.533381018766506,-6.04848207387419,0.3264755005985272,-0.19872684359119003,-5.1351258232398775,-2.039100408119017,-1.7953275929603616,-3.481897670567549,-6.240514389844765,-7.49051693775062,-4.875679924386122,-2.763955607073904,-7.480155911816821,-6.213122559680197,-7.5458803695096375,-2.393349197101751,-7.578273087028173,-7.351519025789186,-6.9363442196160925,-1.643226212203784,0.4688061887415258,-5.138453305575389,-5.192888648162157,0.35206140241924333,-1.6417577445308198,-3.6683901489705506,-5.227387244070349,-4.502827543765532,-4.806226164758788,-7.525615298456219,-2.4660004736208716,-3.635967478322112,-4.885706132466664,-4.229958261334871,-3.6097806322216623,-7.879497092732901,-7.814435355127484,-5.051468707616859,-1.2842335288681708,-3.6723721310281126,-7.22837533583405,-4.856749435709329,-1.4201395790511708,1.1418462230768245,-0.9721399637280856,-6.299219512328178,-8.92123502520921,-1.902699944696578,-6.555962346491729,-3.8506656464770797,-0.950861855794328,-5.5673367045969755,-3.6435586131091835,-6.603024869698667,-6.7899704236378735,-6.958079719737437,-4.931322014438638,-2.555053895933789,-5.766956457477838,-7.955974584568055,-8.461934329872493,-3.939136346109492,0.022999149071172342,-2.8778894703911595,-8.465794551748955,0.14535162618018171,-1.7813851199005648,-1.5394649579673756,-9.329577764853923,-4.210809532588677,-5.143356918328349,-2.406384389782076,-5.740406902050974,-1.5587603622840354,-1.1093787566593227,0.6683868064970244,-3.6042840136537984,-6.9287559617604595,-4.115446735312117,-3.5204267713891264,-2.4846931203023432,0.7356957935895925,-4.551341287997022,0.5497770710570291,-7.238938971561223,-6.362798892728225,-2.4512390732875247,-3.553265539541091,-0.9325552217069055,-0.873016272572882,-2.226153434983076,-6.6156470360170845,-3.963364446524344,-2.768219336618377,-5.565339623576575,-5.294981339778248,-6.6688214387522695,-6.13079690236781,-4.39519406409588,-4.410799320704478,-9.190591776034248,-0.3821433508722939,-6.9965679507698795,-6.8811779364879495,-8.29812810483561,-7.236767495163897,-9.714675665137513,-6.240160710733258,-7.235135259100471,-0.2260708172243795,-3.491581161284996,-1.4522214666624085,-6.582277237821433,-5.209042539099965,-8.05762506558081,-1.4548855613407798,-5.838604994002581,-3.007217919940744,-3.1706250710856034,-8.599115028520723,-6.663783616706959,-6.435691212704095,-4.8922977688841645,-5.567073372427919,-8.123891416843353,-7.743783465674487,-6.16307835985027,-8.460213014880338,-8.176930913506638,-4.264016648032131,-3.2442787886334905,-7.106437167611605,-3.7402892049046255,-2.537350367939702,-2.38568775241502,1.1035073192753106,-6.522124484185062,-1.147948275214873,-3.658645711312916,-1.6673282267532565,0.45671470919192103,-0.08776147927609168,-5.32923327551288,-6.006859267563883,-4.6620126652566505,-0.6435024498304818,-2.410706817374469,-3.004300606759645,-0.5858274590497695,-1.924701095301592,-4.958043716197121,-9.321475649530782,-1.3867316978091078,-3.2944235990303286,-3.5604038182625026,-8.212456875838217,-2.142825952824893,-4.315418995440488,-7.486775551947768,-1.1870039733693982,-3.3170702461367823,-2.8398959557599914,-9.363177686900814,-1.7287350851738401,-7.666672537557715,-7.0527995166016995,-6.166141774314641,-3.60778977849891,-6.185028406682056,-6.603279830770653,-5.886134675291527,-7.77073309410842,-2.9533345889841343,-6.834333577064571,-0.6832603546517964,-2.795304618102231,-6.588492082747067,-3.453676569646035,-0.8140343921219422,-3.9283301539037767,-2.691843857059588,-1.2007302996732219,-5.276394887051509,-7.177640654803941,-8.394993499738531,-3.171432244471744,-1.1927485067673262,-7.637399154323844,-5.971386415958489,-0.49959332185149535,-3.5055072994356915,-5.097869350569088,-3.0776675432755605,-6.377217838809857,0.8962806942138257,-8.8281054393844,-4.1221827146526975,-5.338604403883212,-7.808261746680584,-4.557327332377626,-8.885403307691973,-5.485816944509761,-1.5043615182170826,-6.119631345538971,-3.106129343108137,-5.03747231380113,-7.440704001640788,-0.34380387411936647,-3.1069453421560196,-5.802420584842862,-4.3941700081632575,-9.407902056954187,-5.559863766239404,-7.48667463999557,-4.096988964489965,-7.3414964686525686,-3.03122510374734,-0.8738150673845617,0.2536110435358212,-2.3572800796798195,-1.4144157308217529,-8.927310868178047,-2.666021228342223,-6.439288421328655,-3.6597701727994245,0.008324178532971183,-7.325437365853562,-7.6291804107699654,-5.664552278110613,-5.745973113035335,-4.83197937509584,-0.273160064308248,-2.5354779876640174,-4.608767571215665,-1.1023816918271405,-1.2754167152030629,-4.7604626140045205,-1.3053889413763233,-1.2140997707065875,-2.5569202850989567,-7.635012339884949,-2.928928193682092,-1.1690767249284855,-1.7441619969855573,-2.8592285226755436,-4.591499597245296,-8.706071596428805,-4.260782859352887,-5.2288013867475875,-8.821148289588972,-4.27443199197706,-3.9825037141828523,-0.7729287608475172,-1.067785709997018,-7.7821726053849165,-1.1827587152573857,-3.3187375529125047,-9.171859727879609,-7.387851680115349,-2.3531653228881932,-3.1121462980983443,-2.4667608080764354,-8.022972237119813,-6.896814514543532,-5.448685845992848,-0.93685811216958,-2.742664848870965,-0.42386061898667604,-0.34272555915383385,-6.771674937293283,-5.82018184541126,-6.817800603920331,-7.818096675117991,-2.8278639224393265,-2.6460606066534256,-1.8717187464252967,-4.656300000224858,-6.427277707674228,-0.5425571727014027,-6.96210251667898,-4.016326902606403,-8.520427494615841,-6.345608628736758,-5.131653528851098,-6.741235684327512,-2.380064815269318,-3.0989411498712207,-2.9846565324491023,-3.397178545521607,-7.316518279460238,0.42064040946073233,-2.777913603947289,-4.832084229688657,-8.22156299956332,-8.161521785829938,-7.819102086824813,-9.333446524358676,-9.765384038185926,-0.3859133425926795,-7.999987336927438,-3.962782167227002,-7.326765896118491,-5.646185618720725,0.21441230935416516,-2.343871703386207,-7.743573226118354,-7.181633842749937,-8.3098033566995,-2.429540759406384,-4.657535536191049,-5.106826884948907,-9.175354228227986,-1.4918226785762831,-3.8296963372395636,-1.586741153900339,-7.0236840895243615,-1.1047242537422313,-6.550157629416143,-1.110872717203368,-6.2864243487287625,-9.639937477457373,-2.1980189869467535,-8.705208427524862,-6.585672198279663,-3.499469469697499,-4.655532501672195,-3.3121739598311986,-5.774989919019406,-0.816071183819677,0.7893371553968203,-2.5152157915726576,-4.116062050531538,-2.0281719512447687,-6.783470113942766,0.12878254778043963,0.8924088009126163,-0.3572640112454877,-8.435492481997374,-3.7005436015923125,-0.1676800933410862,-8.568708588277135,-3.2146738253891107,-7.1011711961278445,-1.3503358593878652,-5.6277465373048114,-1.4805276240235412,-5.9551411557802885,-9.936643101436635,0.173972619566363,-1.2533421216332887,-6.153011545897286,-1.571626211941692,-8.553468464600293,-0.01585812301800621,-5.088708351425922,-8.023192320990328,-7.423183202717703,-4.532249090077691,-5.329559258079968,-7.037597773219384,-0.0041515143177264235,-7.855711615076217,-8.809980497306604,-7.765113142837897,-3.681160668303823,-4.610945183625141,-9.413010097511753,-3.7458788469863835,-7.4293061128117195,-6.74465232946082,-8.424689468621656,-3.4362075647434587,-7.4362295016764115,-6.883682272725851,-1.7791966338134428,-5.799587795626547,-4.648641695546456,-4.455140069821303,-1.2187616442552378,-0.9276220970581277,-4.498591610847359,-0.0062812855474746465,-9.571999386218652,-4.932442357688865,-6.818541599706368,-0.7599340443696351,-5.41283404243173,-2.1897706024788595,-3.427199682459441,-8.343708688694711,-2.4949211398621376,-4.680286110251078,-7.966728200458288,-4.76473343832785,-6.163842416620687,-1.4331543421756012,-6.7525175414787615,-5.436017933334192,-2.574426961799212,-9.539069127994821,-4.7668306507347955,-3.464982164911444,-5.187983075158785,-3.8839136974186204,-3.8225922274063837,-1.134959269988886,-8.600098293274868,0.13945129393464617,-5.725080294434798,-8.501286475259105,-0.5027794527439731,-4.900569615742842,-0.3631303474538115,-3.8720123741623436,-2.5509076030109923,1.2774944505355421,-1.7424800469893849,-1.4208739622486932,-2.490211653029527,-6.701604877320465,-0.8349941302110808,-4.368667127218838,-7.3638274002038715,-4.864793189808354,-4.255293948641898,-5.287258328856967,-0.32006587449575763,-9.565806615260515,-1.748484331490095,-8.484416530739852,-8.035381335388672,-7.041805943222658,-5.036528403813365,-6.738059115292489,-0.831694711897629,-1.403996135702367,-1.831819343027701,-7.792299109822794,-0.841326663603564,-2.8410807330961196,-2.7653833390253344,-6.447937778277638,-8.43360953420083,-5.113990581588284,-7.542964098122521,-5.382602635812559,-7.32834504791731,-2.1513022930306516,-2.4031329698841293,0.008213136672312549,-9.381105609358453,-9.242737380572539,-6.457623345622559,-9.36768671961803,-1.022073018814428,-5.127026179273297,-1.3200872328183753,-2.4661759388562707,-2.8980940664168306,-5.933718537354347,-0.7945265218762446,-2.418275544883543,0.45517028116525327,-0.18055291223617745,-7.624969857164187,-5.159006496481634,-8.972013589819305,-8.176944411095485,-3.6367922196491422,-7.950135781383336,-2.40253761997968,-1.9164430810978608,-6.993199417605022,-2.7724505901713457,-9.048888371504813,-5.022010588486417,-2.873546030169063,-0.8149363247537973,-1.9775488364343299,-2.7464252085624414,-2.985154056155343,-5.452609632185239,-3.1129331501538333,-7.157421402749246,-8.303602438359576,-3.230171297429785,-2.9264219771090776,0.7413769179957317,-7.291765912976225,-4.130275773699184,-0.9808519880730545,-7.133061342727801,-7.894528145272698,-0.854208346603432,-1.9820597214629447,-4.068907636987922,-1.020617859716684,-9.204537176531232,-4.711406909835559,-4.404969981141439,-2.7188898648419406,-9.519019660894939,-4.613138986014348,-6.027222432078744,-9.061259511410764,-2.828896278392784,-0.47156244508278355,-0.4483173092500323,-5.00230940876811,-1.1101854760364847,-3.031163019205886,-4.69013223998125,-8.690301938573947,-7.516296038607929,-4.074698594525355,-7.632508113387451,-5.946626053500308,-8.670842246266236,-8.184435871066832,-1.339168341733597,-2.5192168330800713,-0.17073828623742227,-3.8484527662599857,-8.534429581264733,-7.724358417245577,-5.045823247497424,-8.17919346486054,-9.686800650647113,-6.785488286969208,-4.1262502361747675,-4.761329254903971,-6.183363483663176,-7.754335587484806,0.07541678783285272,-4.586981110971886,-1.9502896738238025,-5.18638738919348,-4.072537685727772,-8.630176759976283,-9.760355432059143,-7.459168376964118,-7.19273736460684,-0.594027222018972,-6.545269873357284,-8.358059925910199,-4.281651939992433,-6.489741509547854,-6.244426962951515,-4.500214116207794,-8.698550539728656,-4.580568748946245,-3.324081694003825,-5.539442853269081,-2.7657827834462267,-9.797296899855962,-8.19553639601514,-8.180354478745457,-6.354157826280845,-1.963675365904583,-0.07691502824889615,-3.8749414870826566,-4.554263371384574,-0.9901188052749912,-0.19837508578660223,-7.248653907666571,-0.3771098353065565,-9.655485547604346,-9.32570553160837,-8.450045131324678,-2.300752400092466,-5.3641740263470865,-8.264788227691797,0.25818225131084793,-0.6524059530628303,-5.237724563345093,-5.927448287968749,-7.310914218144775,-2.045744343529874,-4.242428834022203,0.13479841650402832,-0.1842949038284134,-7.218586292946493,-2.9043002756776217,-6.929018252782404,-5.4606564338221215,-1.8866811217192263,0.03342690505424122,-2.4845112761814674,-8.543832436803598,-4.228579545202203,-3.13888753875112,-9.156755043341594,-5.035685196762321,-6.036239201410963,-1.316315688476518,-0.7317246144077332,-5.435252570145555,-7.687084362526893,-4.019275020251093,-4.25205755264535,-3.561869695969629,-9.000100143517704,-8.750590326558969,-1.319676576963854,-7.4799206489459245,-3.949615191580932,0.02863308672815243,-4.744805158504158,-6.465453588211425,-2.956293440442167,-7.994092366238102,-1.1916561380446877,-7.059925095694765,-6.683313522292982,-7.116377100456002,-4.683924536801866,-4.217826356967533,-2.244137825441847,-3.68629172508044,-7.4561712610031625,-3.229859446901051,-6.43053955255042,-6.031095536606739,-5.0510664494047655,-0.031368319280074664,-0.5681584942308908,-8.474409815229984,-0.9739685964474218,-3.6375123494944086,-1.7820990567579638,-2.310691655182033,-6.751029166876232,-5.78932326749695,-1.5452197755510195,-8.7463964443798,-1.0752695621082888,-6.560826673698896,-0.42251200668045175,-0.3676686429908279,-1.591291923316747,-1.6614027394599027,-7.528934858944639,-6.992899806810054,-8.217795222014004,-1.0137794689980577,-3.6931174758688945,-0.3080842299089259,-8.350214153745666,-3.387151743051443],"s":[0.6443522407959477,0.9829344371944471,1.5736437867673962,1.6054149886718023,0.4543924099305112,1.8450176028744072,1.4059157172801546,0.8183834464671094,0.2348368373936709,0.30371711127297996,1.2232011940781775,0.3381117545738066,1.7389134125903043,0.08888283824876941,0.469978032521436,0.08392505179255672,1.54528176985866,0.4453531206508097,0.010657401955707524,1.6279727852623647,0.6817046942812821,1.1797768875350294,0.8502410261120472,0.5779461929764786,1.025185159776755,1.2759493088547647,1.712648182685609,0.7938518459906159,0.4604685283230947,0.9367400458694046,0.8433171682002865,0.7514772183576204,0.138256002511135,0.46352062525471993,0.39789791633904636,0.38973894689633015,0.9310761095524387,1.8599323595427952,0.4868813946992461,1.4304586397156611,0.6154780855286619,0.33184715127870934,1.1698868375603588,0.5438972182554789,1.2565488964750249,0.13624854956790644,0.5803173792195513,1.3247077204465438,1.5355768386919677,1.9139114817564242,0.8072714618937709,1.9626981896359927,1.9844388584051975,1.0585391819245022,1.0183442342835032,1.1116822319734498,0.41197381129939803,0.02508831047706206,0.12128041524107802,0.1666967564290931,1.533341965717831,0.786510377881223,0.5028266061130373,0.8792065700131486,0.14398974114455632,0.7667218238889335,1.3716830385927512,0.9006980487307281,1.6986755117716723,0.17229507667315325,0.7244076250614317,0.751087621711743,0.8040004104541163,0.6636797544690367,0.02505501454330572,1.4093881430953652,0.04727515318274511,1.328045016883436,1.703703506537011,0.2528611593016117,0.5681111633082203,1.0830309666133386,1.7720004926667698,1.9796419278556856,0.6633692226647172,0.981180760848376,1.4304267124396208,0.7633311670435567,1.1745548864824116,0.7906464626220977,1.9384102791399944,1.4307005070648984,1.249166091204859,0.6324759087831335,1.0346115073122366,0.5324849825368241,0.04120214892886587,1.3987698713863925,1.0797843551070945,1.8087260888141028,1.7493261581007173,1.9864317808681502,1.505412879304226,0.9860559121012695,1.0122369899359884,1.851687794806002,1.9615016166774737,0.8672768993213333,1.8322136554958495,1.9658540795150872,0.6597352455469521,0.20300449741874926,0.8116329336572252,1.0266380272891542,0.9662729939016188,1.8078286083551984,1.0120913388555883,1.6452390437966873,1.9363883584887867,1.7967187975531198,0.6168086610874397,0.9044362289625472,1.432795853806835,1.3732093075343297,1.5350690820285577,1.9290774916971025,0.5067801418286635,1.6588849764387055,0.4834795845669482,0.10147400177166022,0.7372208206651378,0.06552605652877697,1.4975306281176803,1.7574928858572978,1.6382859055489982,0.7594178238403875,0.7304330672517159,0.3485261043163752,1.8805596567698095,0.48568120455762465,0.6441759545834027,1.1484340729599878,1.9713251199377937,1.8956306288908755,0.9804298694594782,0.6456160419958628,0.3918366310638639,0.14394144807443565,1.3888337963758008,0.6321750171215643,1.949372908672372,0.5034811841749596,0.8655046877325772,0.0069838738317402616,1.8360983002050255,0.24936302853199654,1.3347474959086636,1.6497032093116286,0.4556617400461156,1.8994444059212987,0.8602162554406214,0.24530079298002683,1.9576925670688858,0.16873099977496464,0.7527956319357818,1.3022639750596654,1.4708462799103432,0.6317443639474485,0.23044955583526505,0.7008570094642277,1.848502096545861,0.8722882815008455,0.3259706568200116,0.15460700064167776,1.8012545111032936,0.4079879542644296,0.47430953610316395,1.2649650388737235,0.22539982445048423,1.499062316951024,0.24404861784272924,0.4833117808029743,1.2937800375746042,0.10060458697573038,1.111216467217591,0.6254145092314443,0.8432319948543703,1.5663071368558739,1.5250327221925248,1.9217414194847242,0.7644952242658651,0.7917314843356151,0.023162353933967594,0.9802688003236399,1.3437968729715846,0.28309262113518985,0.15591326841483166,0.8754442167388752,1.8567550796726118,1.0569821406506215,0.8461202094875278,1.5328192470796522,0.7770786525102027,0.5644427746490219,1.5701932841922979,0.3829904411016254,0.09276568894500548,1.1987974085898099,0.43937876687796473,1.922989634249014,0.14723469760640384,1.2309535265519425,0.7951809871475839,1.138661535167492,1.1458365715924068,0.2569949863855596,1.2715770924563552,1.6538065490021574,0.6378442842979148,1.567866858221385,0.1505902885649988,0.5694735556433095,0.20644094583454642,1.5438119694059784,0.05985934981731411,0.2622022414012819,1.279007206382095,1.3844859170224488,1.155778608458235,0.5443412823566409,0.3498442825527257,1.5734099305060267,1.592161626570212,0.5694028472173875,1.2602527040683653,1.9140149955216015,1.4078791936726143,1.6640808840042838,0.9820885847102678,0.3106475636306607,0.134592104851746,1.319531403974005,0.22469844537073103,1.5845410531939996,1.4703602533299476,1.7539818968828467,0.7704908140155733,1.3505156344094655,1.1425089695070811,0.8184673708931531,1.2673143696757663,0.46719408737415336,0.7239314852601391,1.6414000916502869,1.9791575674565562,1.1493803609796185,1.7026213825592293,1.8106435653163202,0.41893758921180524,1.0822730357928423,1.4643119355844707,1.8914873578740434,1.8072845129990451,1.852344255930877,0.5116218273020303,0.9128105421596824,0.33446961604991277,1.960054047823769,0.5597613031771016,1.6270958246479608,1.5005306342909739,1.9607781053972735,0.8241906414696518,0.11642333283603357,0.8886898935887428,0.16845368084331147,0.17221040841366664,1.4933618027032503,0.26930604812062775,1.10519278538335,0.8606067207728012,0.8095334324390433,0.5264963974380796,0.42224932745213906,1.611885361132313,1.6601113817712996,0.26530653691172823,1.961814198740063,0.7605523721738683,1.2233894136230186,0.42126139022496156,0.9144381328275464,1.5498992569438959,1.4580790539609625,0.29634268034793676,1.886946509164685,1.692135469919739,0.08207195699667569,0.5867877171348646,1.2056133599614034,0.8821057028667436,0.5104581674863935,1.6698611201155997,1.7587896836567545,1.4743244121607977,1.73224037851146,0.5912138883999467,0.3287284086980842,1.795865538130784,1.692378548255649,1.502263311074767,0.5661696164404066,1.7797794311277864,0.47252213888364736,0.36185954312607604,0.48286961387929006,1.8659271425171942,0.6085945164776745,0.9027728765556402,0.8628257997379025,1.3042601238098022,0.12030690270896294,0.9776839259037984,0.20798300488488897,0.7168806293711203,0.8091734332267722,1.9300404403149578,1.8357323329521553,0.8375242108680272,1.7075433010402605,1.5673901400240644,0.7518578998202785,0.36660933962974296,0.2459405244805848,0.7115964112687001,0.5534155331711026,0.3414534781949463,0.9692924591795054,0.42811826212519666,1.8490531799820298,1.043232888981641,1.9141838082098652,1.3520036612809467,1.4549016728368493,1.9067201331080414,0.6321319535268675,1.5708784747209257,1.37011600618851,0.49806270150545995,1.5459924841578423,0.37291755389783576,1.0719320030132322,1.5111185328821755,1.469838592617653,0.04050650650448828,1.0212027222177609,1.0524284693883779,0.8177908975232753,1.0432001578047791,1.27924725195069,1.9971362490703948,0.8395503467916265,1.7073648482563715,1.8662707403520695,1.1798158825497982,1.017739043947787,0.7872946939025307,0.6234592516290904,1.2847179757821077,0.25869885339424714,1.7872834025755995,1.9107018122800077,0.46039616928486904,0.46022315065969677,1.1353831735388247,0.3013581117256541,0.4458042392523871,0.4518119810975625,1.6898229441593946,1.6263899108151678,1.685103337524307,1.8648038381209568,1.4068362141544082,1.3538648535774276,1.5315196250706538,1.1725748573378105,0.8730541055511845,0.20044774166853863,1.4557770264036307,1.4126463008206422,0.9118466841070307,0.46266754774226726,1.5189145882391122,0.9553669503361006,1.2928040512908763,1.4895232617053011,1.562154962147377,1.1585103338171971,1.1038283050543272,0.024267641057901468,0.7241799927260701,0.7373971259394656,0.9668147972410615,0.35035154711719807,1.9744856518219835,0.6187462442999068,0.6634990862188017,1.7121902329374952,0.6013651112453307,1.6048781327889232,0.4135356395129164,0.8006736238694474,0.12345902957572141,0.5874241323478984,1.0825631059149847,1.1031075637046803,1.0332877361249397,1.678334891236621,1.163094542101395,1.6331706350066963,1.3399477486352804,0.7484916707706986,0.45713562582734024,0.9877426863645566,1.5328690124995088,0.8721852425620433,1.374813325784868,1.6489621964245083,0.24277484797585114,0.3506366578365152,1.6405114068228088,0.5288412442319439,1.3184076791958432,1.665124987605493,1.85700615715936,1.7201701602648476,0.7948120420017988,1.0514579247564715,1.3985017453585078,0.662181477467926,0.28294510644500237,0.552502080418297,1.1028325158328673,1.6865376764991424,1.2229452700271817,1.339516635058907,0.9401655054281965,1.8797022459563357,1.267727788132035,1.9569700274398252,0.7579196709402205,0.8583437413171326,1.015605507393293,1.1283829620830335,1.0167383401245549,0.36394990403507954,0.04721984315878425,0.22202201739186211,1.200035538617362,0.34036512353758885,1.7220159106673307,0.7325350498433032,1.1011915255807114,0.7192707606912259,0.8927174456407725,1.1155443951246005,1.5967140592001892,1.3933291190662072,1.944309317592483,1.5971844283944523,1.6733124818720864,0.868126352532046,1.0997717009937573,0.536635457408333,1.1550454358946163,1.5591095680841218,0.23778861249097583,0.40099192320139254,1.311512105232271,1.4215377751857377,0.08564297862792714,1.0130458402876168,1.1708737801097753,0.660409922383947,1.9681241825485385,1.2500412734466515,1.3116352411001002,1.863334963357695,1.4655630102490167,1.792826701847115,0.7928032464573924,1.4701756805658013,1.0864802789319077,1.821070956176344,1.6652678498348354,0.8387850004108519,1.523749306488397,1.940611890010758,0.04951846558536088,0.1970900802855784,1.0148893034752007,1.888120917560248,0.07663251708612373,0.2293859898741628,1.034115153505582,0.9301348527099402,0.39038760596318456,1.4866205063428946,1.6532294212328646,0.13482020710980747,1.0991193179404743,1.30957648470529,0.11008314026936361,0.5199920569818666,1.6607093128649013,0.3512542772281835,0.6905223412674544,0.005032882677220574,1.2355453638383769,0.4236772063556291,0.05328256294793876,1.1451407574226389,0.11651391391245092,0.5731814705333629,1.3738511553368475,1.1852255426403877,1.4425949595532401,1.2010872949654527,1.5496839518006653,0.8223753430760814,1.1152346698581201,1.4878639624166348,1.5329280743979083,1.8793338762300973,1.6850116998206452,1.9778284593622977,0.17871292412804696,0.5426866797310006,0.5364613901854312,0.006994090057457214,0.4420809417567866,0.5791200323113563,1.8816005226045704,0.5907565965084935,1.7735652135314237,1.3941756696140875,0.923203590698245,0.5213610503452868,0.9384736068756157,1.4015810013103431,1.8985795056409307,1.8256827175555692,1.9023589069597442,1.981348146783196,1.6649438962065974,1.3498736881933504,1.3630126000587883,1.1064628817134645,0.11524304608793834,0.34519355216509906,0.9450553588535104,1.6314820755012391,0.4788168912563848,1.9540348071161593,1.7569529235939685,0.12137461780183445,1.771495325015242,0.7870462573083845,1.7241263961462368,1.6606468009626516,0.8641275103198502,0.1787704722525496,0.7376414256255139,1.1756392898995753,1.7521720821669398,0.4010573425414905,0.8122614653259252,1.2200562175380867,1.3892969310039462,0.44788959724692345,1.5560378195349154,1.3741374885174178,1.1954953681876233,1.1133793646596826,0.8964603743106969,1.5897130941964646,0.7788774477005269,1.8558451983187214,0.18092383062298234,0.8624271030011941,1.3358704530338144,1.8497596495383153,1.7749171872982328,0.504155743618913,1.3356284166840333,0.08532815371678204,0.7995384040976954,1.2336569679137614,1.4083426963587815,0.7024151387464324,0.49777768959527213,1.736434551081517,1.831869712564631,0.049496662575223116,0.0010230403689375223,1.7731376483024088,1.021032952721368,0.6197082334811745,0.04351883874145468,0.04216272154266143,1.6680432911043828,1.6228942788475886,1.6100013784722118,1.2578355748334369,1.5992732967200807,1.1910927779745801,1.714731417111342,1.249314486732842,1.6045241637138692,0.9102127114641694,1.2351742054398342,0.9383426453186674,1.826777734986921,0.1139683940066889,0.36885972771035247,0.9579819977681456,1.6952070606956364,0.9740506253644399,0.9498112818776647,1.1146464101891396,1.9080550237402836,1.2634224164141186,1.1881515137691503,0.25076576554054775,0.17350992285346534,1.5864789139259678,0.02456750145277331,0.29163571590243276,0.421193280915209,1.1620013861977716,1.5694399005319042,1.6280318751628893,1.3508119103645075,0.15007279117537298,0.08105399891137655,0.9834486848150581,0.34999642233657013,0.5095453631449218,1.0534608069909157,1.8229034817674066,0.971140053361716,0.6459927889212063,1.6188280730604374,0.2502522780471641,0.6255794598358824,1.9144829368919272,1.624813198439671,0.016453368301910132,0.7575139591085094,0.5758848385264943,0.7397783270349354,1.305063159432215,0.25975286514197693,0.44198078839270893,0.9388923141248635,0.8885261263248219,0.9604425638296568,0.40946994955515903,0.2844156456650362,1.7150192954985273,0.8910115663292442,0.7758867633845701,0.37748604377988837,0.6034372532873613,1.5552325808879033,1.422942355686649,1.1467830297906612,1.6139688513869994,1.4024354209184882,0.80902774786956,1.7842877506851424,0.2877018476502302,1.4745579879085358,0.3416997633357526,0.02028831038336376,1.2148076835957582,1.8791452233128942,0.9869471745123981,0.12631105599045567,1.5504092543365573,0.3672679228607336,1.0049442255005525,1.321393718677955,1.8574301732121694,1.818574064407676,0.5064205825993549,0.8232125518235422,1.156243918404181,0.18197309009907192,0.8491696811708049,1.6416148118127878,1.4441705641212388,0.48493154788998716,0.9449095756020633,0.9495148600648275,0.9425661943465693,0.7971579720978847,0.0585786309551386,1.7002542025206306,1.2022436617086116,1.3946618508399413,1.4469805447866988,0.6834308788124366,1.563242722319504,0.059249917473882974,0.697809165811015,0.7141045401894424,1.3587047226392759,1.4314655384346682,0.5501927243683555,1.1321306675686662,1.3649749471790806,0.4096132773719612,1.8013978589020767,1.3326964778695878,1.4261773545065997,1.7308625286189043,1.7515422515593677,0.1843063077031406,0.34467631550265665,0.22658061028578924,0.6508797027640694,0.741559780909733,1.6240173048816304,0.025680327135151337,1.3204104458219756,1.550705143552399,1.4228953515118619,1.195056589850593,1.825102766190628,1.3229319057187974,0.8628677784113847,1.5410120502904792,0.9681930381657091,1.9698704443868111,0.9620352275018433,1.130923935885472,1.7086241343411004,1.992751311924684,0.6089528094503915,0.883180436290306,0.9973240321009609,1.8538665324778245,0.05712067004031818,1.4662256029014142,1.6247151787028207,1.1343613193225246,1.5907944102250835,1.9201935272463806,1.3100238320435684,0.1320111149034795,1.5169704216518722,1.9293594175180804,0.4238259977890473,1.4666805275199266,1.2387787764625657,1.4144995372912135,0.7444261882828065,0.7649048748076086,1.3087449676228449,1.4750956524386205,1.4720752385629337,1.1841577632210902,1.836847483549636,0.4858713585800727,0.2042193492060722,0.9110296771192554,1.3196607555320132,1.7556407338136526,1.7852779754041488,0.8869577920478711,0.9273399301666503,0.11134541552053845,0.10954521093155378,0.9771473736659666,0.73997442301639,1.591426658080605,1.9534058445078157,0.3853480363454609,1.0220316129261957,0.5167760907423071,1.3964808690421675,1.1685725397822435,1.4404479750562436,0.8615618153920037,0.09801976450866157,0.7029383369301874,1.43794666141704,1.0313563201510325,0.5364286187415597,0.1895402788911933,0.7651475399434666,0.89774356949447,0.6888084668466221,1.2139423965301264,0.8549850823812064,1.493329559352019,1.2540858294616162,0.45525620039683146,0.7371655437406099,1.8821120246872534,0.47578889994173856,0.5105208736175877,1.6119389764849759,0.811992659519305,0.5445134898728172,1.4289972657600698,1.0289300682240845,1.4009565576360972,0.11197079246705055,0.027855543777057346,1.7150723958302172,1.7148031296576605,1.177162117560333,1.0579311609404738,0.56744690710901,0.22565083634691563,1.2015753249560022,1.5845975746195218,1.8970372643693523,1.2902068981653905,0.6746469668254238,0.7993261629624384,1.9299616821952266,0.017011708572513662,1.0178895409810123,0.9875959782221941,1.7243925948204128,1.5466721896696969,1.1062589285800253,0.6524058913862141,1.4318562114907816,1.9888419153508905,1.557375419261163,1.458614585300258,0.17536561811197204,1.2322642531740509,1.6823693799930277,0.19103938000395848,1.4963423146009234,0.7760069363864854,1.8075364841081116,0.3455230835930707,0.08521005694498207,0.8797156113713744,0.3948799971547463,0.04339742422652071,1.4679275134620307,1.6409486849109345,0.24739305449913074,0.6514236317782371,0.3579506412072533,1.528194790669732,1.6924369554769587,1.114442689187897,0.45486106656746994,0.12432476260779746,0.0847326259021508,1.316928437151546,1.6838632902353803,0.6775457759234467,0.9645193833685295,1.226533626627086,1.1823940732071172,1.9944779230993963,0.6861806686258536,1.4477149060046224,0.7853675370320881,0.21808025021290334,1.9257705009717108,1.8853692458335463,1.1412995296245123,0.7871201398396139,1.7552260159520525,0.6562020364488763,1.9759346452938757,1.531692846407211,0.4178472318223494,1.9841537141912133,0.5628793717075662,0.28920324556987653,1.6507581677454857,1.3223384118633987,0.24488358931238308,0.9612855578983326,1.6172620466331802,0.24780797572167979,0.16141227943892877,1.1557817639210564,1.0334383029746443,0.6940426764078556,1.4789042239681072,0.11135795802486514,0.5108734139755482,1.2835001335481455,0.6146463949692058,1.4970232326945347,1.8979693895895027,0.9310442141882991,0.6673958964751723,0.679169924082816,1.6974891563178902,1.1772883542731059,1.213053701751425,1.9128650874136635,0.4162689837216411,0.34256871350108353,0.9216585060219145,0.1230436027002706,1.887612489052692,0.36120347908407835,0.7013700628216855,1.1489902156063772,0.9015248173773478,1.2967196447931735,0.8096614909601372,0.6803009397666453,1.9802721253050568,0.9115898108031222,1.2186513032773574,1.7115444001582718,1.1506548139118467,1.3546904929515349,0.8131145007685112,1.9374405575576672,0.1027625554304703,1.8073360396007652,0.4791875426852483,0.4085278370397729,1.5073864384589304,0.05227254559706429,1.4388666618495032,1.554956089735001,0.6951396487774564,1.0136373604508986,0.9130732873517036,0.6631709862964965,1.7085201144335884,0.4927924216409654,0.6202864133770354,1.857421673268584,1.5977867881916628,0.956307599841252,1.3146483454823925,1.8619931370731893,1.6335221680050376,0.7265868770020303,0.35253874932515394,0.6109950822559367,0.4522864130515485,0.62494992104997,0.8088585454720971,1.3996530471676047,0.09164924011794984,0.14154325501938425,0.9967482151657769,0.8248186688724748,0.33008280607417984,0.26251749322422047,0.8862630680139723,1.550584356282362,0.7108849336743015,0.04626601423007504,1.256507851340185,0.8051189043371081,0.9780524711010901,0.18921170072172178,0.9223996884976202,0.6177970233216268,0.3193463548992468,1.6095954962165155,0.8561442750660091,1.9849323931403684,1.1650446208528353,1.4687568462756695,1.173632103842205,1.280964512482261,1.8959589930835454,1.7697731254000226,1.8359361010527806,0.3145639433265006,1.0464374490326316,0.6960051095686461,1.7236185490840712,1.468587716387256,1.390509803186128,0.6045211700887538,1.8675232183195218,1.2779827775694197,0.825148930786455],"mu":[-1.189462502378058,-1.904766788831136,-0.693923416205009,-3.938140971258135,-5.774126800876607,-5.652183681166834,-4.93462579673523,-2.3777701577431953,-6.298587738328189,-4.483005022187703,-6.959516877818784,-4.19937878637408,-9.808467012277614,-7.142545994957674,-3.858985465717515,-7.336011125934247,-2.0524987960912555,-7.656968220461,-4.7268562821887645,-3.0538375796231576,-0.2206959876258785,-0.2724904148819185,-3.4700280848250276,-7.480428796308837,-1.315335933707098,-4.456709667243464,-6.519872320602427,-6.6853919940602875,-4.4290848838033074,-6.115889335274032,-6.666323800004969,-7.194107150798428,-6.528627486166416,-9.12351608668092,-0.9377365704887497,-8.528500687035116,-4.672550008580347,-6.98019739116059,-9.310222354693071,-2.9070826081614998,-3.0779765238588874,-0.5188749210750498,-2.5484687856695643,-7.483230852929736,-1.9402184421047153,-6.758818632867973,-8.14356185334264,-3.497961069828961,-4.010238941125812,-4.926368203154794,-5.82281340113302,-8.280682041124575,-7.47145764708357,-7.08066636139264,-3.0461304833978775,-7.135030982272646,-1.5150197454897008,-7.223702982403834,-7.702247254794448,-6.336240524204362,-3.5369370335153505,-1.7112486933072057,-4.816268290116026,-7.690937798903175,-1.22840101453501,-4.296034318389859,-9.17281915801803,-8.28588943503403,-7.8377325971138045,-8.444120223742793,-7.241399078198272,-6.7494475199595305,-2.6137048168109933,-0.6550286477023981,-6.655383347964059,-9.122969114300703,-0.34003227266139247,-6.991898436691846,-5.3700741089842685,-1.7740366818269515,-8.842743896601284,-3.88956384043587,-4.156532712049101,-3.3678849984232895,-7.627933957858364,-8.763991945296468,-6.295982765037246,-5.177741049411537,-7.160066265766504,-1.183877761597556,-6.737321935386193,-6.607196424376247,-2.7031038781715555,-1.1932347968788504,-3.3541344050210675,-1.0862702872055086,-5.688930525568338,-5.899478085681853,-8.762805663809496,-3.623891195185398,-8.40181301900666,-4.275117596246247,-1.7526681271445144,-1.0441648507999757,-5.3441321919494955,-4.284185281713276,-4.767754984257371,-5.099451457630694,-7.769593688490593,-5.905685654702495,-4.068355117412641,-2.1396754321796263,-2.8191516486988677,-4.567301858738199,-9.197324399340289,-7.230276081371678,-9.740139894218544,-5.545594390333049,-7.928905699747193,-0.2608955962809367,-5.651730767360419,-8.43802629849227,-2.8934136812504696,-0.9022824660778705,-9.691694030708014,-1.154858654041746,-0.08129098654515943,-3.1336475516078077,-0.06323048910132023,-3.2606359555528197,-6.822930158227467,-4.227520800551909,-8.917025072943376,-2.2220264941131473,-9.210565563326838,-6.129863268506385,-6.736379912655854,-9.949175422545638,-5.792372230873626,-7.664642862071878,-2.8263015121326207,-5.172060630803966,-2.0611233082998814,-1.1822972814834243,-9.617630833263423,-5.32470684845957,-9.108779227766437,-2.506889224926374,-2.7546157050344977,-4.318591642817193,-3.66354343051009,-0.887739377579364,-2.037744050136212,-7.370325333384484,-4.660855752261909,-9.883440436786248,-8.672912187860593,-9.882470384832496,-3.384729808610498,-8.690769927067192,-0.44842111200632084,-1.052548084402014,-8.723634232709161,-2.8348631162253812,-3.057827786155045,-0.8168621062085824,-9.083302261830493,-2.412979608590242,-8.552663416867972,-9.458522084570111,-9.144898174939005,-1.5801043594106678,-9.88876174125172,-6.988816655951419,-5.006422297262663,-3.2759395340083586,-1.6206681568602255,-7.7093481188878155,-6.29712976118189,-0.9241161041643964,-8.460670931998813,-8.66782909375494,-0.6809068006181285,-0.9157965326706519,-1.1436910544265189,-2.7931693299250737,-4.927191815066125,-7.3143782468495155,-5.47594265064342,-2.8049711542767453,-5.424601201290191,-7.131214333108867,-2.9221568996234693,-1.4622820223137678,-8.514856703905389,-8.807385838844976,-0.9161798656108311,-7.6909970667882295,-1.4490510001884305,-2.6276221824149903,-0.17174733076661175,-6.08478281191192,-7.669368322905581,-0.3799828441253128,-8.203868995024667,-4.839375047161649,-0.9166087985380189,-5.843262862521909,-0.8674722637244847,-7.810312913781983,-6.922451448840521,-4.97185020927663,-3.9594008519682866,-3.464222878540688,-3.9701442984085755,-0.15811830767528567,-4.456133387287087,-3.105531445865537,-0.04072623558955435,-7.978380368281462,-5.745206133634941,-6.028930609134879,-2.295366897203268,-5.1462195888301405,-8.537280132275031,-0.8135300153151026,-5.593673904203504,-1.6508059975457567,-2.7979867544331927,-2.425310801614613,-7.7518989766532105,-7.650216843951199,-6.131102832769679,-1.6777548069919512,-8.5609288231269,-4.564786440426358,-9.752466859671934,-7.985747948116584,-9.082766952610688,-1.1614226165693475,-4.901683058609896,-7.769949681111918,-9.129062526538982,-1.0250346512695696,-5.549072249459979,-2.957348241842046,-7.871106690332008,-6.719280697040686,-8.320842614734854,-7.682452585462853,-7.524335879407773,-8.314451953232613,-8.221901005600179,-2.3811086728840514,-3.2139465265503353,-9.775062761666431,-6.1904876374755275,-6.056047397165059,-2.5477388567956716,-2.2584781613638327,-6.676140290256987,-0.316743498037122,-7.019506095273513,-7.398594286737918,-3.1156262372702415,-8.000480900485321,-3.1532597521299333,-8.011962871527809,-0.4449714849296371,-0.19218530330941563,-2.995904710499371,-3.0951109709066182,-8.66037927156437,-1.9170593380565704,-3.9851857240725774,-3.4692054105405834,-0.5585077207186351,-1.4429549328448532,-7.1790905574052815,-6.142847501042472,-5.540369961591218,-7.005825796316785,-3.2529962203020313,-7.640912463317989,-9.737004786639396,-4.889173909193305,-8.279382913220356,-9.154331148701147,-7.99711139126372,-8.901205538943639,-4.199072375163652,-7.633035550502221,-1.3359032813362104,-1.9268085134088286,-0.17022327623960942,-2.4068035161937895,-4.939364273176842,-2.529355534114137,-0.5200563342423381,-4.158790805976662,-4.6370894666993685,-1.0453249901088135,-8.131911847622717,-1.6214744334143294,-5.254862414565293,-4.226741813203702,-7.934184078690977,-8.851684687156618,-4.73165299790965,-4.326909011340485,-5.731674110665912,-0.38623346498453337,-0.3809818166030765,-4.401707081508088,-7.474147089485577,-7.872397745377581,-8.50833940041179,-9.219586373244253,-9.851041615289882,-0.9184563391467915,-9.582391828826477,-4.359086219188548,-5.764181550249726,-4.801251368637978,-5.14405477958348,-7.592071030212509,-4.455982686567504,-5.314659136845014,-9.957770865927406,-7.675637171387486,-8.955161144984768,-3.107742657620245,-2.404241790195334,-9.427732487837638,-2.951498953188749,-4.816272929498626,-5.110568055631878,-3.711735810321861,-8.731336169639727,-4.560265786538253,-2.5864527487765776,-8.0409738161112,-0.20997434951688598,-8.789206232575797,-6.031732160030561,-5.55806358416895,-0.5794343207916697,-6.780643030052797,-2.697950769648303,-9.836963665337846,-9.773861707978135,-7.960641039447685,-6.714304040834682,-0.07433805139249072,-0.20878574169863606,-6.1276270564733775,-2.973027912006696,-2.3037941115731297,-3.5340713106869526,-6.825552057888091,-9.37497212538257,-5.327615328035686,-3.5702537811061053,-8.280436453269315,-6.831256847324793,-7.7027280891543715,-3.0746341225186313,-7.97739185914661,-8.108593586946093,-7.1000924141625665,-1.9089126978312576,-0.07751114221563604,-5.189314462164667,-5.574546097129296,-0.5434434051267867,-1.9042459481838248,-3.9051993854345346,-5.635594481864543,-5.487533468265484,-5.227937686011639,-7.611910214294664,-4.230527531936589,-3.8739706209758062,-5.524478054560474,-5.549380029094035,-4.72400455666492,-8.684807539602872,-7.862649870117946,-6.069229454987777,-2.2951360986346625,-4.124006480328135,-7.5211457553994805,-6.232039029679384,-1.850392726159369,-0.1395325669862757,-2.1216233455704647,-6.905265257772686,-9.861808075555295,-2.6560290159702316,-6.579828042472173,-4.0445984783473605,-1.5991426706194445,-6.42623301390066,-3.9180984555906084,-7.3451566185946415,-7.111506494613023,-7.1577626825238845,-5.784366091687801,-2.8467723544698287,-6.467143728110072,-8.065505373622138,-8.477502963898988,-3.9919299505085393,-0.19806534741234838,-3.0737236047490946,-8.56205651439964,-0.6357393727061011,-2.472241672375848,-1.9800482544639197,-9.414576169117428,-4.275413000981745,-5.261477163871325,-2.558995318616981,-6.2414376469200405,-2.5680208040163066,-1.1540786818631554,-0.4698144320318298,-4.8798802005255615,-7.031061058145984,-4.445789129654321,-3.8577855029882446,-2.774643533038599,-0.1871511065085829,-4.969272986240196,-1.219088669628261,-8.8403290313399,-6.993946811493177,-3.3128531695245433,-3.8815502426697845,-1.3752623280066323,-0.9838107938269824,-2.3560404920181943,-7.651919542109413,-5.273003542359422,-3.4307545039712206,-6.4168424916841165,-5.820326821982958,-8.39703731203234,-6.718123538151466,-6.118311716735656,-5.063049778823416,-9.648806454630039,-1.3073129834618191,-7.912677065160125,-7.230428341136155,-8.408450741387714,-7.250854048634254,-9.760928111786008,-6.812792067031223,-7.455492333398713,-0.9620529116449128,-4.0344103109424045,-2.3615809861538106,-6.989002417277614,-5.284352148116149,-8.112508603976014,-2.527823801553579,-5.865256357045439,-4.855425361695424,-4.132833991932657,-8.76162718967511,-6.857879082641578,-7.4353051311476275,-5.417836700212373,-6.589371089810889,-8.42932429957115,-7.788108434953031,-6.244503076284977,-9.141889161584045,-9.053400656578889,-4.32023511790383,-3.4294604527238715,-8.112481616868353,-3.748164983029114,-3.7363075728715067,-3.3473590636202966,-0.1763385432879283,-7.365104877688491,-1.975212955351422,-4.397725648182583,-1.6744434774131411,-0.576743206555399,-0.684647974498036,-5.468959423675479,-6.80888879425368,-5.372534553249373,-1.9625631644209962,-2.842887320953944,-3.026732294795351,-0.6012671121549573,-2.435865794715497,-5.461052135845293,-9.390407801302933,-1.5246814558269395,-3.5642663172377564,-3.9267941801833173,-8.565397274534682,-2.8883521803979884,-4.51157507157554,-7.52788312902648,-1.6915161836124648,-4.460279422426437,-2.933688146117346,-9.654477961060453,-2.216633514130164,-7.798244996116281,-7.709471963643704,-6.169567191081134,-4.391118264880076,-6.601610493107084,-6.623523383915428,-6.890397052116233,-7.8019958984452975,-3.013380036639519,-6.85914522294442,-0.6864557614230837,-3.015075803958145,-7.683020152232509,-4.644223050458054,-1.0970383781474946,-4.445122331907447,-2.728544466972962,-1.4236596983647365,-7.088931709906541,-8.216457031105923,-9.1070914311643,-3.324962419703761,-1.2356639696064464,-7.681059701776622,-5.973501963640864,-0.8099235676024019,-3.6666044131162634,-5.548837998997809,-3.6260868269794377,-7.056694209381433,-0.4527891361153724,-9.242697042408235,-4.605334125505269,-6.243993574222357,-8.461094183969385,-5.973066237696985,-9.035706027747477,-5.990508659610794,-3.02845428984182,-6.809141656513534,-4.400334081186381,-5.073453035828226,-7.54393303512598,-0.34656535607308303,-3.188310090597053,-6.397919109656147,-5.6464465062763995,-9.85949622315167,-7.169931850406888,-8.84341700368725,-4.099622644208205,-8.761376510539407,-3.4425836954174227,-0.9951252112237707,-0.6296091386741143,-2.776125691418301,-1.5917167851771974,-9.522909357539447,-3.1330600212733573,-8.17802625180412,-3.789166389834442,-0.5753829858564252,-7.779654936367388,-7.953694206999787,-5.817482457631544,-6.951364068553709,-5.86237590910099,-0.39968657640244043,-3.2029633851385464,-4.909397881474238,-2.3091790169895154,-1.7908146939499026,-6.023048964397233,-1.4304887769197094,-1.830594751259278,-3.1915735804009238,-9.478664583320489,-3.638812081692535,-1.3468137224374832,-2.3424186295509974,-2.900787310804185,-4.660842667129823,-9.488814064752358,-4.491652720916354,-5.498445334232676,-8.917529816206144,-4.365337661157551,-5.650320134715807,-0.80601421994279,-1.0685712106752376,-8.086808813029053,-1.7049723079691748,-3.5762491020861487,-9.20163285161185,-7.4026147389149655,-2.4484219117055206,-4.063263332798619,-2.935577743762925,-8.267452671672277,-7.929206795096362,-5.8690718569053395,-1.7578776169173138,-3.6685250715739603,-1.828437649690633,-1.0469210355137282,-6.814104533809875,-5.956050751141997,-7.257117844635459,-7.823255348325353,-3.122330893587153,-3.140816260474777,-2.2517599711234837,-5.049660582235244,-6.450666665574514,-0.7546694959067857,-7.524843360988893,-4.7768841930675325,-9.49640234991788,-6.5936445237085595,-5.16699417073913,-6.9210845662605,-2.3874674884582525,-3.329952934105229,-3.117069222022706,-4.4035489123319715,-8.724128907580159,-0.3542612960494873,-2.7899882821478905,-4.878924597463374,-8.29758027027539,-8.439018208715543,-8.144481144372174,-9.763061013691965,-9.77340200928442,-2.112138083167183,-8.308557808390747,-4.423786313872846,-7.455214075292183,-5.68394700264554,-0.08672703062381215,-2.6579785904208575,-8.876256999557322,-7.187629951435175,-8.559652599474658,-2.6684952728965228,-4.746071701301949,-5.915785481466838,-9.286274204758723,-1.7924084402085372,-4.293733657959995,-1.597682012487236,-7.789629737456907,-1.3026378390740634,-6.783994539448277,-1.8663427163697621,-6.586826647598619,-9.870841037758069,-2.5276780576355673,-8.943117538911087,-8.111827290233833,-3.8040316395450424,-5.135374372321024,-3.449593991908022,-6.811210150694884,-0.8234367261357689,-0.5685830383313273,-2.6949616845555724,-4.397445979927898,-2.0479653001353815,-6.794827990235202,-0.3922387336163724,-0.3223014575426597,-1.3416301773972439,-8.540033951753438,-5.056302592745247,-0.5290016054649849,-9.317096714152136,-3.221188926615315,-7.249714276790713,-2.2577126214149623,-6.070276344309342,-1.5788303143499172,-7.10695181841587,-9.99136244015226,-0.6011170396241416,-2.0966150971676156,-6.980387205668781,-1.940821124019898,-8.696515875646622,-0.15841771315516784,-5.7293383697006455,-8.044142369667144,-7.477936391825013,-5.468259347059021,-5.661747516207254,-7.358070588759855,-1.399513759994384,-8.337176198078948,-8.907090782865234,-7.816248243639851,-4.156471377176414,-4.838376322541695,-9.563057661025685,-4.554511717704903,-7.676042567275321,-7.396353501260169,-8.762810817122983,-3.4660672184008323,-7.641493408837077,-7.289372881641027,-1.7819638456992037,-7.098449213928899,-5.5540806565348655,-4.5421494799697,-1.5548044282932572,-1.0385646860379527,-5.1203980784651755,-0.0956671655928254,-9.968723220437482,-4.94595045563984,-7.529995468736013,-1.727280235149422,-6.3527414602187315,-2.941612161322227,-5.216117966003022,-8.999875056185251,-3.2484611803628716,-4.86343076428684,-8.528170510587564,-4.927258003005653,-6.870295985220778,-2.0955762457410487,-8.456044420915278,-7.1823952694144255,-2.615245485631028,-9.915581735310958,-5.741557904419454,-5.293425668061939,-5.237496625153684,-4.007266592349497,-4.234762147896413,-1.5438614250719662,-9.065445897499544,-0.4171009471599696,-6.801172632297623,-8.529695318208896,-1.941375462096786,-6.755644073136928,-0.6003891871788536,-5.167729749084662,-3.3511071669504,-0.0850215857536929,-2.469142001043718,-1.9574879039430426,-3.0285526695272824,-7.790076074951038,-0.9567019336172744,-4.976643884245102,-8.240836418927312,-4.985498445856029,-4.257296601423473,-5.853266621076352,-0.6053677210984065,-9.94469430678128,-2.9033700331444434,-8.880353191435205,-8.876932406551049,-7.070256944217221,-5.040284263078718,-7.137912121657557,-1.1303656793976136,-2.160070710313571,-3.0085636921113945,-7.814148328053756,-1.6060876861509366,-2.99896046323874,-3.257526374265294,-6.669873339897984,-9.50696891726344,-5.5208865838728745,-7.57223658357403,-5.535265081159086,-8.699831717193558,-2.905459433666411,-2.5943282456585393,-0.08531021739906386,-9.801950311379164,-9.702277896825054,-6.694253038658786,-9.636329442852965,-1.6742244442076881,-6.0125714409812225,-2.01531354144469,-2.648029897627009,-3.6218289673547965,-5.936123549442682,-1.1646268431843465,-2.7625639508313338,-0.13031240034330205,-0.394765885712951,-7.765230848314923,-5.944547972097791,-9.486328198489645,-9.104550385295095,-3.729857349184116,-7.952829671380357,-2.75918168414639,-3.2829218501604163,-7.795473390610173,-2.844225899133479,-9.505992282552164,-5.06828578552029,-3.834179555303898,-1.8227772416765742,-2.937623649461212,-3.5664584132921595,-3.223694780152031,-5.536975449899153,-4.681346667031199,-7.159377692021454,-8.876462710273747,-4.159375581734066,-4.622217299412776,-0.7503259490941372,-8.09146216624069,-4.331481931195,-1.4679223420409548,-7.464031382055866,-8.273023732911803,-1.9009590504322693,-2.1365886612514307,-4.071029050929766,-2.5608171233703625,-9.388055934989985,-5.114376939928729,-4.916841521107244,-2.9903752778681736,-9.751559793693385,-4.667536411941864,-6.697868412694145,-9.275719993770437,-2.849044506642149,-1.6629912362475752,-1.7313789225727616,-5.173955615927895,-1.1266686539525916,-3.281457672038288,-4.99133445313012,-9.215067192989114,-8.21800809244948,-4.23608780977699,-7.738120982212235,-5.968698981071896,-9.73065291600135,-9.489371644460547,-1.5432663969795235,-3.2151821204283415,-0.26654965115138207,-4.689652193454865,-9.102463035327377,-7.792499100465218,-6.092183932635016,-8.606130878870673,-9.7463173293723,-8.579734640112175,-5.904953104643685,-5.641428632942381,-6.259634574160846,-8.933284966794252,-0.24312938399467132,-5.098809225643461,-2.7015319590236664,-5.324971273744639,-4.192090831685087,-9.105179077872892,-9.983540166678695,-8.48590320682149,-7.804288922355629,-0.681873837948761,-6.77168606548288,-8.709584142296439,-4.340245312245436,-6.55218871599303,-6.659028155801243,-5.261836454624486,-9.27056779020048,-4.85205900986736,-3.404638459324847,-5.58216227408201,-3.019212593918985,-9.876630245723558,-9.400094850547593,-9.62745275925444,-6.897139257178713,-2.4073229376364758,-0.2712076300074995,-5.31100219077989,-4.998554014274914,-1.0099399310538004,-1.7581230276033488,-7.639253753455291,-0.5392093131633557,-9.88107763343619,-9.335444556373762,-8.474736789964389,-2.399287180787655,-5.909532324092521,-8.995948292855827,-0.36125202012857294,-1.5566709838341386,-5.3254886835242266,-6.340954279872182,-7.412710523028361,-2.8718167388009475,-4.661774917046769,-0.06168998513106372,-1.179816819642936,-8.071783223548687,-2.9738253077628674,-8.621472611492633,-5.55150694799265,-2.221403639515138,-0.02673733436354686,-2.5497080498242863,-9.104588339323074,-4.25083814602684,-4.100093075792268,-9.781146577119394,-5.128987762565904,-7.000519262989593,-2.1579815899821075,-0.7513140954170261,-5.446686707746792,-7.743982072779234,-4.588831060229923,-5.397697681433726,-4.139699774132051,-9.137238353468778,-9.059982378816597,-2.0804384412593224,-8.529793628116494,-4.282590105683932,-0.03796086078215355,-4.967435466034853,-6.5742409677720755,-2.9811539865023873,-8.481900489347069,-1.6458979618714276,-7.071546072836236,-6.752128975271441,-7.185781577973847,-5.193808690578496,-4.384595125660667,-2.3009399472507286,-3.8138732150737242,-8.479132902890473,-3.631073752378695,-6.44639639308946,-6.547588116037293,-5.161797973620869,-0.9297712520691426,-0.7423421975333566,-8.841322712628747,-1.288787854644593,-3.8733035009914363,-2.0307814065914087,-2.502256805110865,-8.695610523237999,-6.914659505043899,-1.9171229089899544,-9.042487474000138,-2.0088284805268786,-7.2275325185338986,-1.8601579050626071,-0.9010567224155674,-1.8699469254723278,-2.0011688620571144,-8.050926381484494,-8.665467691719382,-9.490862977898056,-2.3065854661214247,-3.815645568910342,-1.623000503176384,-8.779183130955357,-3.7131636078510244]}
},{}],121:[function(require,module,exports){
module.exports={"expected":[-0.3851005038493032,-0.006724566621196792,-0.11994069571852001,-0.007068985672268008,-0.03762982842507381,-0.0001725858188828211,-0.0006753617175868294,-0.5286067477469428,-0.04204097173377872,-0.42986296871979923,-0.0010276643003066925,-0.23343481864822194,-0.5275603708724682,-0.34604685524119533,-0.22806538315489788,-0.11124042235207564,-0.0016446636419198278,-0.05837415356569541,-0.10363968270924492,-0.02189900440752878,-0.017080053933783593,-2.8753997790587747e-5,-0.03924685549673198,-0.35525474529065293,-4.221174821069167e-8,-0.001787622047588124,-0.002074208487391884,-0.23848196618165302,-0.15541700301685635,-0.22527902451567466,-0.03426845494369921,-0.19734120120776832,-0.004958221357176357,-0.2671422724315548,-0.0750094066660933,-0.1747117450251348,-0.4676349995053395,-0.5547409068525136,-0.4086968555285581,-0.05151340504340067,-0.3622257706367115,-0.4248874633722689,-8.846365503100669e-5,-0.023051509140851693,-0.013203436101824334,-0.685333875210189,-0.2952553439948644,-0.0007543159500256759,-0.3225877237661722,-0.05915929446236707,-0.0002068245772572123,-0.38546518368378746,-0.086064666026157,-0.5635660872072741,-0.00021308706494511975,-0.18518259374365462,-0.0010718686515219817,-0.135727726052597,-0.17131852595664668,-0.003696043912055466,-0.20049669032506093,-0.006149062770720956,-0.17076688356612807,-0.07919312427495423,-0.10397351092183045,-0.4334189733272057,-0.07085678159790032,-0.001616658977260651,-0.14523198192635103,-0.13455125369756724,-0.13120854966827258,-0.20357043332675387,-0.6162944538845596,-0.008808522179960355,-0.6596887279494122,-0.018464024594211547,-0.6411890451264141,-0.5772282569812536,-0.08291503643824968,-0.018684045205885236,-0.0030176068974003744,-0.2726255339284316,-0.0660245465842302,-0.0003153210178115558,-0.016324894287984656,-0.1609714316135435,-0.003019027496406005,-0.1972410209873827,-0.049004014088644035,-0.08383911385425839,-0.5839151205466973,-0.22009279805608645,-0.3286434118326371,-0.06249688903390579,-0.15101071704391963,-0.1948218098729543,-0.14158604354514487,-3.2637147750195765e-5,-0.22185530246731947,-0.6858383334444236,-0.6792604279854156,-0.5088595483593761,-0.1720638707204748,-0.44234040469519276,-0.2554955220079716,-0.3370330703550539,-4.3485382775398246e-5,-0.29149335095975004,-1.0355949436691067e-9,-0.11301421298121879,-0.0032062044663701307,-0.11882811114101144,-0.5350042315171768,-0.27372987267310345,-0.0889141981940605,-0.0012606606706370637,-0.01797192235880293,-0.03805074609202457,-0.42490201617495776,-0.18286701484293125,-0.0007745891068569254,-0.5049051615055953,-0.017807212112689604,-0.011236631489501573,-0.1709208422635464,-0.6475614795902374,-0.34790993667371956,-0.0076614641270791204,-0.060918099489655306,-0.025683890567609537,-0.03229010387330058,-0.17656440902696022,-0.1716494095263205,-0.6625452249033418,-0.042383625043819616,-0.007954290326115948,-0.4604750799379315,-0.4467737774121663,-0.002796496147415734,-0.028230441327684184,-0.22587641307738418,-0.6105162545248588,-0.0941450760149388,-1.0470940028119166e-6,-3.783118456922228e-5,-0.04531335656745455,-0.11544544240829542,-0.45912084361750194,-0.05704978937043002,-0.39631689151652166,-0.5084737974823723,-0.06387824506674243,-0.020501845256552624,-0.003933227620587364,-0.5598803207092552,-0.060869760588445926,-0.28526016097379514,-0.010044973269977803,-0.15271320512312805,-0.07580939951540214,-0.00016907308227542456,-0.042614362091784125,-0.11880804267634545,-0.12281192795994941,-0.3260178867093487,-0.5524222276170715,-0.18960248289822243,-2.402188310477516e-8,-0.11870767465280202,-0.0037230493173564744,-0.30982867721912866,-0.022022707568687273,-0.0020842475757425127,-0.3718636272336735,-0.011027317591168422,-0.02108403247676986,-0.5617748467679606,-0.4655624805741332,-0.299662987972356,-0.1495249791926044,-0.31383115644081694,-0.00016945740675352613,-0.015194507716089711,-0.3933539087625815,-0.4676688601177468,-0.0002013166806076248,-0.14952875363446622,-0.3934589012465308,-0.19151042129021545,-0.05427024434798917,-0.022820371232553253,-0.5553463167279948,-0.017534374602018635,-0.20101915071872295,-0.23731906015343093,-0.05391060962693366,-0.3836406768922326,-0.3651404898366424,-0.15784326485541586,-0.06822835249989886,-0.017135149242041358,-0.3079550024667979,-0.053862059906562634,-0.028279096410410768,-0.005873076071339247,-0.11852312836356786,-0.16021688358987687,-0.017565616090398282,-0.0023341235477350912,-0.134712270805415,-0.5792253906328259,-0.1468062342680519,-0.0016733031487873584,-0.5856645829169187,-0.033909136286022504,-0.08849905782306643,-0.0005977501437835184,-0.09317537270352266,-1.0760434913685549e-5,-0.5128511921457001,-0.518826283233865,-0.5254120396304209,-0.005707850139334029,-0.2112185930384313,-0.09500798854965649,-0.21050799226525393,-0.001953373675853346,-0.07388324101339173,-0.07531215048185573,-0.40508722767938427,-0.6258836328147767,-0.052455227095435784,-0.23871267317519865,-0.3038539846114886,-0.003537839770195799,-0.4796814233869621,-0.4316210349846867,-0.0007720424438751009,-0.00013078358794829035,-0.22386386956136428,-0.5357138633622094,-0.002855122620641609,-0.012442815799644041,-0.011165607053476379,-0.05546240757190301,-0.01865386289258305,-0.00047056486957641806,-0.38996563271502177,-0.0079070061390903,-0.027197723174548806,-0.008130523169202042,-4.839634250080977e-10,-0.015124751295812333,-0.3181996746990706,-0.2722682333251738,-0.0009340054166777155,-0.3465238299075955,-0.12470869804599898,-0.00015092699411510546,-0.0010480200312694267,-0.07906666116905144,-0.18411568443069742,-0.2796303961131057,-0.00012141100906984537,-0.4959247069152375,-1.1096394286234156e-7,-0.5532901178988274,-0.05143361766226993,-0.5097201400491853,-0.6443971899357155,-0.066549327867775,-0.193243950221568,-0.4782534448808672,-0.0015821776834574882,-0.48145602700521234,-0.05233824335910007,-0.32109375936677265,-0.294192164600363,-0.002842855665125435,-0.026846466391696445,-0.00567998752017509,-0.12822612975316308,-0.5241118450328253,-0.16329374477301967,-0.36061056454928275,-0.11057141783785589,-0.05398716981610615,-0.2032526129817024,-0.37026052484413174,-0.22134828354143793,-5.3445420095002954e-5,-0.29088743450786725,-0.06403826950383291,-0.08144844794357334,-0.34979260236105725,-0.0006900427215401178,-0.407248884726813,-0.007334237941836197,-0.18503195311539047,-0.17428657292800623,-0.3581808201929164,-0.08029052408979337,-0.21164333554247938,-0.3224470849737202,-0.09262044983550587,-0.26917092147875554,-0.5926612039012995,-0.05871535354061295,-0.0004409456450192468,-0.03919386372715511,-0.5870154227231048,-0.23550384577516925,-0.17797687689032132,-0.4328984788481711,-0.251304441471287,-0.10499282255929791,-0.05823251575069944,-0.0625354728252574,-0.0037109581284394243,-0.6029633764885698,-0.001801723787455285,-0.21156613080545497,-0.05307704329343721,-0.0006629952570915665,-5.032271895842516e-6,-0.3341404686255707,-0.12663015585752052,-0.04323922570452202,-0.18047372684470653,-0.03239370236725413,-0.4256471687675112,-0.014449302580342748,-0.052246418522112766,-0.07642928123022506,-0.045041827717461125,-0.016246920203175724,-0.4438724667810222,-0.02965376759480856,-0.006779997538718988,-0.029791520254963576,-0.24355870327317322,-0.5228783878319081,-0.27849319450263194,-6.319051566643322e-5,-0.5089555234730301,-0.11437761185193224,-0.41180838906729045,-0.00014259370577761804,-0.03197446028450766,-0.020331600414244748,-0.23573682686716113,-0.014884503805691434,-0.5808296412518588,-0.3536158014852875,-0.24504626610387514,-0.07227164603666628,-0.05292884273697039,-0.5338988275918328,-0.0003792635774969443,-0.2138702779022299,-0.02804064854797863,-0.053394294957799765,-0.07261097515082968,-0.2121832427638245,-0.02360587093246421,-0.31500410242227017,-0.015767932809870447,-0.010289449992418613,-0.05615290160405957,-0.21342049444476546,-0.09961826593550024,-0.08638516302727509,-0.19558547431471607,-0.029162621389258056,-0.001767324911308912,-0.014104850051101354,-0.0096677227272524,-0.014028703002491347,-0.03714918127169871,-0.01756759020991291,-0.2883162535175651,-0.05355855277541355,-0.19804864250896245,-0.19406829309857415,-0.010195546449298532,-0.2500945288501902,-0.07440017188739513,-0.15291818868472956,-0.04813979533050992,-0.3121170199989379,-0.05280455868404276,-0.08848457234524672,-0.09659529878599431,-0.5340300336523089,-0.0069553579082975,-0.469693154133785,-0.04431131793745952,-0.21528480574393094,-0.07226790773794232,-0.6027992600846086,-0.46041166869874417,-0.17565848365403444,-0.008757697183617503,-0.17065350804240342,-0.1541031673785718,-0.10851204213912315,-0.06722942491607349,-0.0017878548551261805,-0.187648044779442,-0.0021401758453286597,-0.10261170351678159,-0.6590162082259131,-0.0009061009583367252,-0.17779061533053656,-0.005166259183424765,-0.004104190328200996,-0.009497797348430611,-0.004436790689991779,-0.04387467137089957,-0.10810432213554834,-0.330168188181238,-0.18912299356314274,-0.12563140176327373,-0.10487548497766681,-0.10162017742741498,-0.00042612855358286624,-0.40140634381793183,-0.35453993875533757,-0.03284662578970782,-0.11635003100376491,-0.004964437659761937,-0.10758421769716739,-0.005496700304701508,-0.6128735642323881,-0.2897407504980547,-0.09827336273864583,-0.06138091773741642,-0.023086274668845264,-0.0008667575983399174,-0.0027476712069316317,-0.48695344774812266,-0.0006528451447193926,-0.01656363659932817,-0.003177400439215177,-0.33405306951947755,-0.44885418491636164,-0.584536991011591,-0.061318397490383064,-0.28493155078129573,-0.224593956427813,-0.273483640012672,-0.13123869959388507,-0.0652773581798336,-0.638242388230698,-0.02743707257209905,-0.08885490625824857,-0.6392304880963334,-0.08023247419228952,-0.39408261298476166,-0.010494422324034731,-0.1740916652015575,-0.011937941768544546,-0.2378889586810441,-4.716011893264074e-6,-0.5391039439010316,-0.001760845968983352,-0.001528442468655419,-0.3080719784552488,-0.052160033754035946,-0.005726330826779026,-0.0074137430572605535,-0.5538420927996626,-0.07587312979167923,-0.02595302047549092,-0.5497516357168022,-0.3392679331810404,-0.4020579549351083,-0.24144682640548853,-1.9871581812038504e-6,-0.4264177707154649,-0.0012322926901410748,-1.3246961060342573e-8,-0.12664793012656084,-0.6811651059347572,-0.02753012308058736,-0.42243606594780186,-0.05643279072148668,-0.048013559546975705,-0.004584322211041212,-0.003706902504284911,-1.3813251919307344e-7,-0.07168544391043322,-0.07585874728467781,-0.3653570741550134,-0.2651125710536744,-0.16822097041158227,-0.15566406633354793,-0.0025149807295741173,-0.06852869195487095,-0.16046942576575443,-0.6597779164389037,-0.6217296747080698,-0.013968598225267503,-0.6338859764357441,-1.2207185270075645e-9,-0.6466928425586834,-0.659575420231503,-0.11205992767049075,-0.028370992021409882,-0.4082845599285252,-0.6605359336842734,-0.5101545408320571,-0.00018425157083333204,-0.007045245874307201,-0.08936474003200703,-0.001165966683073494,-0.3361796675544838,-0.19298597818721683,-0.0024059993898096032,-0.177459797093036,-0.6449991496619012,-3.0150603423719593e-5,-0.18902357691561675,-1.0942861145004622e-5,-0.5946634777825589,-0.00085619223696551,-0.0005142915374835312,-0.006480641632657257,-0.32042504935888266,-0.05582023144709197,-0.6426181805278354,-0.44433268255693015,-0.16997147904124818,-0.011792504406642375,-0.07482512834241117,-9.01027664594721e-5,-0.04259748044012088,-0.3486437930085631,-0.03126980560568851,-0.3827952358588202,-0.26883225443506775,-0.00478017212549558,-0.18743865482654903,-0.009695467348374719,-0.25954186253471784,-0.0018706901169618687,-0.17657120884891492,-0.1645384077331933,-0.006015846010850746,-0.3685176781939817,-0.0001559942585093012,-0.0016935085817283329,-0.0015197196811139553,-0.47106393696524484,-0.44287143522034167,-0.08236674524124808,-0.028571901078063282,-0.004672926948527858,-0.6827450549872559,-0.08999670629881476,-0.0021557332173492805,-0.2327251273592304,-0.5965766701189116,-0.5105525826811559,-0.24884367009301364,-0.2565821291854507,-0.26073273432562805,-0.01195519067679997,-0.006768194964444164,-0.0003679900848402513,-0.1407625889996083,-0.011531234154081482,-0.5973331081239336,-0.3098792161003345,-0.02353989003562625,-0.10916594426279538,-0.60694255452574,-0.5101705259296722,-0.4940858155136413,-0.021571005106908632,-0.1956044578435074,-0.45233548257384243,-0.013511612885195886,-0.6632351667486565,-0.11629345047034664,-0.5667951682466068,-1.9886299828504803e-5,-0.021384797622386778,-0.06099761220949039,-0.015183555306384319,-0.4325483954288649,-0.008364175060359153,-0.07313379845894627,-0.39076534901458926,-0.010359856362891282,-0.08186175502433361,-2.436275174492796e-5,-0.6741368706097299,-0.12585880252846543,-0.005109882611959757,-0.37152837106743164,-0.000931716437304756,-0.006405606978124206,-0.019701744336903346,-0.22804048017209977,-0.13574293864936188,-0.0045845081822503565,-0.1638757379286446,-0.00973910409897576,-0.5671536626546836,-0.1671509176013173,-0.05307871674600608,-0.11140085345278107,-0.025773555353809475,-0.14171456549273195,-0.4089101179173734,-0.10786659815532351,-0.07466815493366066,-0.6131795364233784,-0.3213344836878409,-0.40744062247428603,-6.67459879659279e-8,-0.0017095684931020191,-0.007080523555816357,-0.03263150675948426,-0.01996886394944253,-0.05169917532735824,-0.27386636440280365,-0.26200200592976663,-0.5775794631220661,-0.1829960312163313,-0.11550873285989774,-0.285989865158814,-0.12019002240026629,-0.18168565330947947,-8.898606214800424e-8,-0.04158928340763195,-0.010006779069319934,-0.00035055348423150383,-0.4489216728622478,-0.5554211359653192,-0.17058394356473822,-0.2391696782261816,-0.22971669995326888,-0.11480305179881124,-0.007526517210771983,-0.09844744941176026,-0.6647474116810348,-0.00022023556904209225,-0.0019198106561957788,-0.3470773239406828,-0.09895826195398694,-0.32208406117362415,-0.01359685442712336,-0.021459807295472574,-0.1404428563710198,-0.00010233953175333444,-0.04795039873061303,-0.04398264490591926,-0.3867430810253916,-0.19905321272807697,-0.4693293019580689,-0.11126789620177906,-0.11866288291531758,-0.3765345234003945,-0.05421309941132365,-0.03176230525011934,-0.021474349593678804,-0.05893233235533946,-0.10843118832798661,-0.5386391340717696,-0.03431877266951021,-0.2463929194261902,-0.054081793773562536,-0.6883394862299611,-0.0006582739633651155,-3.6486405935955406e-7,-0.0205362364858663,-0.4410012722877062,-0.2791384559685156,-0.31553454682675824,-0.2924824499302648,-0.41470223245537413,-0.28219542730791713,-0.189952965748971,-0.041091438423942986,-0.6379967156941556,-0.035698450925504256,-0.00028502954361929396,-0.06319970215273886,-0.6261627593440033,-0.4888705343924002,-0.37252975301752395,-0.21279411843770749,-0.14220953941861492,-0.6085288539756847,-0.2925653465433733,-0.14728764617873205,-0.1087029221407423,-0.5359587840858479,-0.4557982433177473,-0.050717228250373454,-0.4559285130254759,-0.38752352372504884,-0.165019953317275,-0.22716206377859954,-0.06694708499050558,-0.3043655959738451,-0.001812062259811933,-0.07446735736216273,-0.03791198212096524,-0.2831496384049572,-0.662597407141291,-0.4507891877578292,-0.42723963051408026,-0.25297200836724776,-0.15217246665822548,-0.3626186407612308,-0.09579907330731793,-0.08508277605730469,-0.25939843370320464,-0.6625805417225686,-0.0008125029383232456,-0.0001294112380378788,-0.30267355458329087,-4.0699024430601515e-6,-0.04299277228490961,-0.08065537583917938,-0.00025754054471160894,-0.002508178253480807,-0.025966411532295782,-0.32315769362448343,-0.00589789578699186,-0.054166485489071055,-0.5702303938105152,-0.005750581077484449,-0.023388294871295647,-0.41232539478144653,-0.007063080412775436,-0.026592137093684343,-0.1379328305139894,-0.2679775725096248,-0.3306467815234502,-0.00038428258368833405,-0.011083989872096606,-0.056366340739706554,-0.04060921776340947,-0.03315855610412376,-0.0006040621588107901,-0.0007495462433794157,-0.00520662699821026,-0.034473016115095165,-0.0047354491025060706,-0.003427579179304956,-0.550759138934494,-0.09245558555027279,-0.032433000403277734,-0.05595337318485299,-0.6881511257927547,-0.028625103944861903,-0.3035799812360611,-0.05299278676392534,-0.00022520496844125442,-0.0021101384147013402,-0.011158353507636859,-0.08422590424916215,-0.1026230528656126,-0.022149833847144872,-0.03632793307833368,-0.32744772618275675,-0.13647095068830162,-0.4717945425134872,-0.03706237462790307,-0.21730062938121,-0.44671150437238283,-0.1042857620631184,-0.0009761596988132248,-0.01429664862471943,-0.15957577145086174,-0.6851185398948608,-0.09353055493349889,-0.005974230969071477,-0.3956298112781005,-0.6068641587110465,-0.0007295675460865534,-0.2647786186532107,-0.3343945775918098,-0.05138414183320133,-0.021615446902359406,-0.06393571249200293,-0.0947076728509214,-0.6326426115937248,-0.04787821835440161,-0.6094441331253314,-0.39660305156039743,-0.6254704653517263,-7.516198169996261e-5,-0.09668901379927386,-0.0033212443858752177,-0.4578487084286267,-0.24530664119870432,-0.08995906591059422,-0.034603987506364016,-0.021737227445626107,-0.30388803664638353,-0.00418911197894434,-0.33549250999706326,-0.041184507073683686,-0.3657245285333909,-4.450170662994314e-5,-0.26434601232735955,-0.1516288629658957,-0.31649392641924895,-0.4286664426678999,-0.4103982153070244,-0.011631143975733605,-0.30674908874528445,-0.015725142080448538,-0.33809186452555867,-0.018485577484696623,-0.07533008141175142,-0.1201771499405833,-0.6791757287659269,-0.3075292751631003,-0.0011700787922364138,-0.017994141386845148,-0.3306037858376152,-0.5263505181632304,-0.25218346529852204,-0.005085525762359245,-0.19975133919244295,-0.05184508673837809,-0.5450052554504039,-0.29541234137346795,-0.0009907366946307174,-0.5695435180170608,-0.5443850480857978,-0.11233327887720063,-0.2510326274597013,-0.0010168040440440324,-0.04105582147516369,-0.23692727196115448,-0.025465682019391502,-0.0006721827434633837,-0.043018865372497175,-0.011726677627653271,-3.2357177991493638e-6,-0.28437571490104824,-0.5631935069232421,-0.003662100657059021,-0.44311534848969897,-0.6183231116155098,-0.10587400049189448,-0.0018639401250961287,-0.0006164436086367491,-0.0487708560278172,-0.28009447205826193,-0.62525012694436,-0.0002870082511800127,-0.062225691023270954,-0.27701720986927014,-0.13875224360394497,-0.006570971603732706,-0.030542359163700395,-0.0085358959023313,-0.11310897776325479,-0.013759348699200492,-0.3940225854640008,-0.1855197303625226,-0.00023320729563453704,-0.03849944098605249,-0.022102769895338895,-0.0015444523636624018,-0.48669625988462195,-0.049671007536346776,-0.0012100259490091332,-0.25687809873871226,-0.06789766921280502,-0.1951789891225234,-0.004106286887209682,-0.04987848557116544,-0.4322004040034113,-0.0010935865048547402,-0.1276529904835304,-0.18702676016512756,-0.05717812815009112,-0.05375779670883607,-0.3993471383335711,-0.03673780052842571,-0.009415580483544003,-0.05015645865028286,-4.770365816342264e-5,-0.10470898426017049,-0.042123346412171504,-0.022770664784248145,-0.010294583130173004,-0.09360402389997627,-0.38573303224464456,-0.014820886873383598,-0.06718435594989913,-0.000430056219368918,-0.1523886612842987,-0.02503012352517012,-0.4945227845854808,-0.023311686168412463,-0.270321532908762,-0.4875746359210759,-0.0724982545617546,-0.00018784805281530604,-0.1301250212163161,-0.5101388884238107,-0.007536343046482093,-0.5550320473545689,-0.0036568083450913874,-2.951821736885576e-5,-0.031705767904812304,-1.9216878334005808e-5,-0.0013610141703591437,-0.03209333139170958,-0.5531487576913429,-0.11068304081319548,-0.05329116279703881,-0.0005415410633074265,-0.22631628601818643,-0.00014942206816190106,-0.007657300486290885,-0.3366830211194271,-0.2066255854660434,-0.32375134565542407,-0.010315003419726545,-0.3582001707920677,-0.5076309725564041,-0.0005806309294535156,-0.06300432451970751,-0.008286879227306101,-0.1543228523014068,-0.004004739321322026,-0.028277649524896455,-0.4665385444303062,-0.3241799716939719,-0.5693247266775188,-0.25356017416770643,-0.07453615469090022,-0.1316422128980653,-0.000979603821068407,-0.6513913781579893,-0.3921883468965714,-0.043543416687841355,-0.37460538801708326,-0.04410288601656889,-0.36602024181031606,-0.024828752557734184,-3.595482877420353e-5,-0.05248197083754198,-0.44255738453800825,-0.0779406662736142,-0.00907650718293201,-0.019823104137087152,-0.5859097444557688,-0.2248178388702281,-0.21741870714873354,-0.1448094513185211,-0.09571210682364482,-0.12268209119308628,-0.10442908482314435,-0.6189294186912611,-0.46632369409130486,-0.159489453894588,-0.015211201031898377,-0.0028084876753334976,-0.024080452079689625,-0.5857958422999155,-0.07425040201709357,-0.014185620316567709,-0.02408311563056648,-0.010773720551134895,-0.23771526233779805,-0.00195811868660843,-0.6470116449477915,-0.029331023700472688,-0.012122582875661153,-0.4129880568196055,-0.28596893973557214,-0.008833198658322064,-0.012922765677168987,-0.61257614815043,-0.26025154449590937,-0.0009256497528987622,-0.0011222609818389191,-0.09739156880211688,-0.1540316863337172,-0.05529980542069556,-0.010009694671829411,-0.004745885571913901,-0.39878341654292104,-0.011892769028480422,-0.1039865277562093,-0.062313188202002566,-0.07683363340935496,-0.06542267212665748],"x":[7.654294213778821,5.589879017259559,7.7978135398160555,8.58382623958482,9.269014880329191,2.212432256270591,10.691007412021527,7.3194989643751835,6.308621200443447,1.9020545119703125,7.851402072278798,1.1558151605261608,5.538262058513917,6.074242555636467,6.661186715106446,9.626789651120355,9.301144800666345,6.5177844410866115,5.036858902522521,2.864437762291162,3.6741488334075916,7.893111867003973,1.39981599358757,0.4137997000753831,4.546052336590217,9.096553281947603,1.4939190146916175,5.455059014344732,9.767067581481816,0.44467633491192204,6.026592401822443,0.8563734334751651,9.435078705894933,7.659475688224006,9.04649895778051,3.150175702736913,3.531865124687267,3.019614463083146,5.695105153855101,3.7173718424153126,1.1426522573036908,1.949684036350268,6.147491421057803,6.453092657716397,4.210251482943456,0.514525976628119,5.380100849395763,7.125265619783322,6.6407028373350245,5.269883591050038,3.3935715319272024,2.438210391700692,8.894456658719822,0.7811197811856159,4.845777747326075,1.0552162262642142,11.633601749124491,4.7367355324069615,0.920396700534492,1.1426410840922128,8.351695242745189,1.6693200798154293,7.892397470366583,1.2852405719089042,7.082432149298275,6.06885095201626,7.024370652066865,7.647817748214893,7.998518271358096,2.649217076110734,2.38480332051294,10.472061009490714,4.247792250807289,2.94031443541756,5.67470353436357,7.6115905763599665,7.090564721234488,6.944469773311735,9.780257766288678,4.450958297143404,1.87379599977149,2.257574133391825,5.267095321534798,5.488561734870592,1.3689194484688454,7.350729798740405,7.794712286539287,2.6466424030649778,1.8984889722945708,4.58326123099121,2.984486535986101,3.7159027214886553,0.7560348887736955,6.492017735974544,1.2412519121506946,2.1357213688632948,1.0632631050032106,8.834964275096063,2.215106232860106,9.85423011676816,8.334890812964646,0.46590043481614096,9.378797393371372,8.923628823399206,9.213658378463652,3.2586732185867455,4.417222330321635,4.869161683062637,9.124493945167007,6.210870343343467,2.8983299424271474,4.948690388633396,1.4968945872114496,10.21010637184436,5.241789333878203,9.743498052287784,2.299185670049352,5.4502963046536586,2.587536095492854,5.079877047716509,3.4046974139641732,0.3104993886834915,7.7412499978785325,3.777286472503908,1.9639049301546398,1.6007968382402296,8.994547003103461,1.1850905440945716,3.3233274141278377,1.9587845212286705,7.8499331656647255,7.547396152848426,1.9330356283427155,0.6261208351750814,5.672972212537472,5.98581932221881,9.955872172239745,1.8170339589565232,5.37847028705381,7.364245043213632,8.57404120665146,9.295339863575265,2.829728637983115,5.554717053722834,4.420509383413377,4.428541611685771,8.916592597299696,6.9347762871214655,3.6915033220357043,2.495469387691737,6.333165775714375,1.2056987369137466,3.8138251118377147,10.122123279944878,3.9907738358446805,4.9474565799677945,6.629066861302638,7.276889022298478,3.731083275063475,2.7027406777149885,2.2634972365745134,2.8003787791999875,2.7505990176547126,1.4670446686066982,0.8984402323868209,1.1631870032758396,8.564567647508495,10.516114834179193,5.71911138933609,10.595145385644345,3.475835014133186,8.485081407061704,6.251439072772981,7.77766023571596,8.624809630409292,3.077458599062958,5.913357353057833,6.590127323637852,9.04024350256001,10.500833149127978,1.7073748379338185,4.86756914150704,1.2773402106410423,4.985393373484079,9.41411652390829,2.9451974489143926,0.08753969164635186,8.352679222588252,7.163160870051399,6.161862253168692,1.0514572300581029,6.168705839077866,4.665507581322784,1.7709159759910023,5.710318462182925,7.629377103783752,5.775804070981774,9.461172551584916,6.813248357672253,5.050512899262957,4.616745964424897,1.610947506213586,1.117322337256744,4.5769412838800605,5.442681349442525,9.922560927640845,7.343640018411458,8.994678656163616,10.203454286864485,1.911652832803583,7.245459478037296,3.868844985553517,9.665056086393133,1.1562557435918799,0.453331379095903,5.571943393724216,1.6723670166512146,0.20911147537635327,2.8244514831646117,6.705473900157747,4.955248354100237,2.1467856162029717,7.328137760823524,4.0705022209369135,2.7860661980355426,2.377653024426631,2.654976087922617,9.835862711276796,10.349620105967482,0.7461834306635164,1.894140793419014,10.356974698642789,3.5519370347145167,1.7706453502010642,6.978734042660486,0.5791245130098669,6.165567840615724,9.608388910890337,1.3115044044629327,6.82792299522552,7.97670773379197,8.48788033321218,9.7369590383382,1.6777002111962775,0.7164749926813838,1.6632874186845712,5.717220469191444,3.1372251063334624,1.153312476445499,6.3056427737714085,8.963182729338383,2.761189239410998,10.289486488739156,4.12473186940504,8.025729144098618,4.697509419060886,5.200284095165157,2.4795769953248503,1.1306471493054466,8.111363638831063,9.911471392041962,5.222330944903802,2.5561915201722667,3.121890250247776,7.240819528339718,7.528834601856202,5.129017942285577,1.0325873444948013,9.203935808155386,6.986244907533908,5.484805380950062,7.2429404247535905,2.0523254928218257,8.005294512981733,9.638035042063962,7.162161217595639,1.6764167157445984,1.1031310152002713,5.7143139321695715,2.742955640086937,10.485878868665047,3.8877294502973836,9.995289490155102,2.748720577097286,1.0459150614866017,0.493275043642773,7.168781425035159,2.0241792269979237,8.277817893017868,3.2904499652285435,7.572743667302998,8.220300617497358,10.494386658171454,6.773667578481832,6.03298180350779,8.365574105931024,1.953431316521463,5.551749047621226,10.062324650384552,0.6289930457327102,4.1412391750083986,9.143049532840514,1.092149337972403,9.259665969867969,6.429402514864935,8.317472132925637,3.6955851552658014,6.839751843597131,3.997324146251214,2.1801332691030355,8.354409949195652,8.643933733687726,2.3724952977562586,7.202994087317014,9.430086636028312,1.5452613722862258,5.206353978325041,6.501841967388221,5.628902873579058,5.882636745451367,3.2657241397808896,3.371378529216542,5.285018502259991,7.219404968733249,10.940360444361533,5.12096071484528,2.6397555438244122,10.092515005169336,2.937474659837368,4.247807615834639,2.574444316297183,3.705709749858443,5.262573768144117,2.7525117986042,6.813386563549598,3.6252290385573893,8.82358068664045,5.491856240129902,5.723820972780657,10.520440433726144,8.49437625127463,3.031724445532706,1.6643857939744362,4.6018690311064265,7.888382027459725,2.801087127202382,3.86654527876002,7.241281519770097,4.32293143247893,7.49968386370048,9.180015702790257,10.454831017348589,0.6999924857237074,7.093082661150739,8.263004183772804,3.37531495985354,10.07675707793989,6.998218771262816,4.121034067111411,3.4637660232873277,3.7328435471523216,3.3276442047886636,4.881463247739669,9.090404714883318,6.524594789518692,5.140672526568615,3.0761432778699827,10.085958512271556,0.5129679496293319,7.345937045206062,3.350954429474301,1.2103106588449473,6.720046527314347,7.540320694778464,10.415150985182763,6.393523019973371,1.9603690661231488,10.923666404594167,5.049639776199937,8.497166204351375,6.733458962807005,5.516367692473906,7.66074007882074,1.640156497095249,6.92912073724151,9.764088517584531,3.2632767600815535,9.197835350446725,0.8397432082526903,0.703282373516265,2.4835675280593015,6.168934736074524,5.677295764597292,5.900224090087819,6.727574590742633,2.7796429439470893,7.438515537210159,5.291761428035171,0.6139908497532343,9.713790312989909,9.127493868162333,5.493390997631798,1.641222657452467,6.634486091254814,4.826994198617979,4.00746971256855,5.096633844492377,2.548555064363348,4.072828963989462,6.116376994436839,4.3746474266540964,5.500569341168742,2.672197773279433,3.121520783086706,7.701173755645322,1.3909654939399985,10.12724531399564,2.819019466990267,9.480659799602694,9.407429222936962,6.497360140129855,8.762161463847441,9.979643395474369,9.10488184205591,7.56346728611169,10.916860883180933,7.293278775651108,6.988102857678266,9.28368237983445,4.231041535087705,1.0756171022457797,4.254919940588748,6.082383993258629,7.1532991456569075,5.374143680698357,9.760661151886474,8.798140071476427,10.144843054809858,0.4141430022558442,7.245318624961305,6.266580003083995,3.130018337905966,7.716572871950019,8.107339932705443,5.378585124511272,2.4583513231250436,2.7130488115491413,4.090625804879285,3.269289022940151,6.587300764810362,6.877647410867985,2.6564016027487316,3.2133903752450492,8.030977518167662,5.524241739494733,1.4497287894911564,3.2896613946521063,7.301134909446224,9.141831309787971,9.180079399264391,1.8798028229106518,7.2172229925901545,4.573524821680741,6.860583801277997,5.565179147209122,1.714091059254487,5.115468081158741,1.7181798875059329,0.3884919221856243,5.7754580818922125,9.346641074185403,4.4159940617833175,4.060756056866224,2.560052498860159,6.201123160622274,4.725884012495981,5.454732347545436,1.6697427071600877,10.573574243061667,8.268123632542476,9.586598144630571,9.818244388290088,7.096887503312937,0.823806153841031,2.759692920521462,2.996601572755349,4.016631869391398,6.375143385886858,10.0949891373069,8.123195777687595,5.505894270398295,7.544394180888356,6.677188408603358,5.299987329131651,4.580443814304797,5.926973482321079,0.8409890476333479,0.3937669675219243,4.616961782132065,2.5921168064971667,4.451416485826117,5.3256801944257095,2.5845750727932337,0.402459401648117,4.76630256627138,6.4643253073111975,9.213131294319355,1.9908909829439807,3.4164713784024543,1.3997504736368542,9.047264680153754,7.429196950744799,3.251670986446805,3.477837086711054,5.860621614326452,8.786847926060851,2.930658180550716,3.169234692542706,0.46949946488629984,8.45961625625357,7.947909278125986,9.077188724960934,4.860304296165187,9.371635053783802,9.46589166327692,8.872433548568518,9.82561833180806,5.1664409758216445,9.053608917426462,10.26776094301388,6.592680670000658,2.3803208471981168,7.040318510206134,8.280720377953484,6.743645485686571,2.844834012943522,2.757109830725061,2.801037363865988,6.906734034798702,1.3559514981869376,1.4043529577460856,6.303265665228666,5.174985501873758,4.4133208327126585,4.526109722677743,1.704922224974995,5.841685193956802,6.590546717632818,7.351887615919318,3.9076137769108774,1.0674719820844052,10.800627702015852,2.6946253524159784,8.484951899595151,6.332530256584817,5.741053511033542,1.6679042033025462,9.169010839449431,4.26484301621609,8.49255638950931,7.314368115483662,4.890128409910288,9.439186141983424,1.5558378303160283,0.9214214140436144,2.2256176484860366,4.117423450161472,10.158675571588205,9.967556903983521,9.373667233207376,2.1001846954042724,9.902037082798493,0.19296358260725088,3.28402980230772,10.09222477786619,10.06105433550269,1.348286554341808,9.985248383922318,5.925476353021242,6.0508175914756,3.167611903004468,8.767784523742769,2.495024455170686,5.052211607612563,3.084061981409768,7.068596411089782,7.443220116422637,2.759908238100844,5.552797289314043,8.31006682243354,5.701859986174614,8.260269354417366,3.050874717570208,2.3762581493678905,5.955256097893764,3.948844240533111,2.8021338246904257,7.330152889737708,5.676944166807764,3.7881080747850255,7.932006446545814,8.949021985045363,4.268429220367186,2.8648013491190385,7.817487399091762,0.3417547664491648,7.995330748548777,9.778900057772391,0.7024631512599027,5.520759448477489,9.501756307617624,5.308854179076707,5.230238493649345,6.896811429214756,2.4265343365969305,6.022339730952946,7.569037661802396,3.7740284691588633,1.317492436895449,5.746689463486772,4.310724661827287,10.113574994760185,1.8231709491131995,9.666826114212828,6.719448121747661,8.931318444968134,4.502078374621052,8.780598938018096,3.7495046167610258,1.2850799313449288,6.461421745098576,6.719057678571544,5.8994198552318355,3.5588074672379792,0.7616821292346542,11.073222032458675,2.4719918578781632,5.5602850825329915,7.6513364781887265,8.646641475447113,9.711113596556848,1.8729758638623046,9.84581927708542,3.603423634085352,3.807348110341021,3.9448185850825253,2.680800772405142,7.793406329483417,4.682634052209423,5.741015353613659,4.781259140994109,0.5987448169022369,3.6165232193213432,6.634577949593925,5.582707816149799,4.320203712184869,2.9976939162866767,9.139207758832187,8.140443040987881,1.0572056841781203,3.683085670217541,9.55138085612938,8.694063074078429,10.09131818217892,3.686432575061346,10.290079657677047,4.798518442061354,9.410351138312157,5.279075724577175,5.356369149030926,9.707073935320768,4.705174203716685,6.162191140199312,4.665181219023773,7.6830506911291305,0.8790578616929745,5.972725922733906,5.862812077081602,0.556873482081504,9.039122088680786,8.249287152230623,9.76493960682426,1.3342644412084474,6.660425334121786,3.4311659838118955,5.715415316853512,7.489088149814729,0.9667172845827905,8.708622844221988,3.4242272129960005,3.96642755507094,7.9452575859221914,4.774844922346567,8.72928675096264,5.2358321146476845,4.190665105707869,5.814483653516702,8.000751800209828,8.352511388512234,0.23850299179688128,1.7157393594499073,9.95079115670254,6.494048454810577,6.346387022854373,2.305249823984118,3.78786897177517,4.29366877842839,5.440922694801542,9.747648176225592,1.3977622593906536,1.862251252409313,9.282191102486017,2.8328535034028173,0.3891684335398483,0.2612294917472912,6.889524886262923,0.8366597902782831,3.7464745278428007,6.086304644313272,10.605405401497482,5.969479494437619,6.659246593606347,3.7082408423368287,6.230542687765657,2.4835174686069235,9.183106542539731,3.9690486167151056,7.0045945371656195,3.541667670865993,1.3770890919018848,6.76954184967649,4.407323357614032,2.5538522263117125,5.190594922863375,9.513916178244871,3.0830691947862516,1.6336429055156487,9.140053834264942,9.583249986798661,2.287997529132534,9.224967188182012,5.356569419326886,8.2205696145238,8.913751700490149,8.114557760412731,1.8270808806178316,5.440205112105113,9.796411785979917,1.0056620334344897,8.0481412855118,6.690694288989535,6.247191471663672,10.270507068146634,3.2883999458509963,6.458578700618207,0.986760784744128,1.146428001773346,3.306846692799301,4.708524807487178,8.142455819745015,2.0495485549380152,9.367210986671035,7.453491752736054,3.199342362923929,6.903036100618341,10.425683614982331,2.2089854962463367,9.8181518834051,4.29310749641141,7.904660751148858,0.9784036810360248,3.136484635221857,6.222426298194941,1.7736172678989126,3.0546037808987863,2.784531699853108,1.7969361099353929,6.465844141657943,2.3701858792248967,0.9463822557890885,6.224318500471953,6.987584961452476,4.332478199136972,6.674383379135513,4.379242212721271,3.7854157261864088,3.133544360163076,3.6495657155785484,7.094489587037019,5.412493260683905,8.336386108265431,3.9347797312456656,5.922234760104397,6.9616427487842385,8.154093275728416,6.65909240314562,2.202771398743978,0.9630831268087877,0.42477930262072017,2.6082953310569303,0.5644795186720842,6.238764940400824,7.528426602231242,10.512736704534731,10.098321082516756,3.6711161184404295,9.200864003649828,9.85740202147193,5.349573119034753,3.5214076135989023,7.220151957126686,2.6827558512972955,7.6785943482192645,6.221167766627991,2.8896406580991068,2.5926750510925265,4.8054960372002675,5.086230546797535,5.121534110842729,3.274021641783347,2.870817578124594,6.359937066170352,8.771318731084804,1.3488831385573283,3.7928857745800335,9.336625635742907,0.9814828998809775,2.251531824869594,1.1094264152627054,3.745437339411084,1.333100260721981,5.981728748889957,0.7669821998338426,7.192453440593867,11.179959318923897,4.271087548857171,1.0189325846482267,7.214683274776148,9.403649956422873,5.638709125681872,3.5825338477593656,3.675454136401488,3.4285251767146496,6.6175628831485716,2.866165935662073,4.708790541794593,1.974668865219694,9.395023104496534,2.5012197632482187,7.939584824677519,9.45715115694928,9.851707891516588,5.120634688905911,5.900305861195317,6.578165172696563,10.326974951567264,3.3065032002361425,6.7951872842341885,3.93072360041135,4.134203862075602,1.8399148165572525,7.631235637458943,1.306706973550344,5.255154610941726,10.480373999404133,7.336583039495151,9.368496196110554,4.028640334360208,0.42491131752721345,7.020780267856729,2.4676553623651447,0.551392455390245,3.918560941870522,2.6972310630176852,8.485931791900581,9.28003291050253,3.257748880812416,4.287363224447256,3.288975677874923,11.418489567566713,7.768546738394258,5.720167147787977,3.3458370519565426,3.8149950072957397,8.481871580756774,5.9547922980859695,4.622149084116727,9.843849470273252,1.089361969236324,8.316440746253097,5.532433421403914,8.350568027290352,0.9152158975490299,0.29289147677490346,0.8966803689494407,7.275024326190675,3.1846999599875234,7.744270928221824,9.953109427297305,9.843594076887928,10.044919891178317,0.9549932318495782,6.010886553171708,6.865719989524665,10.904950599812247,5.261502885453562,9.519185275436207,9.955662920004384,3.099822689427634,9.210972106734225,7.407624478993701,5.681614706084516,0.4097205523029293,8.806649442431208,4.251921364037643,10.594152632445429,5.859836619610797,1.3991869399035965,1.8314474672410408,0.47978996424812065,3.194870139340607,8.50398646384013,10.399581139329351,2.9353690352548787,2.975438076216161,8.64440662058114,6.168532241871574,1.1495213530738004,7.084482281327713,3.5099936812653034,6.603383770021144,5.649544146740654,7.296857174557722,2.1644032776577515,5.563562175191585,6.2213071916883855,8.80331593688603,7.577309445912046,9.91393892752915,9.298306257115975,9.925181713570433,0.8408375573542285,0.5579976265580513,3.9124452895029336,8.402745477040416,6.600907919332421,5.2364826262520685,9.384952613604218,2.3092647233450956,3.411489538126071,0.19079996934955756,2.297504712752901,10.678580252913974,1.532218661694753,4.670795847809435,7.573012093730069,4.68908679833911,1.5597966822158111,9.05178693356748,2.564841259152245,4.362826102071723,5.862087161793796,3.5694999166940207,2.305222420554045,7.494293825936608,0.26794553656796904,4.553992077349922,9.186690387793542,2.8788689503479263,3.486935240364662,5.997573954331696,4.805075729344681,6.796587604421203,6.6816389598897254,5.955632007265817,1.6935303475078367,3.699219154327661,0.6241450788311094,7.3495151866416295,3.9628462699851648,9.710034890361033,4.341884659390947,7.43575877855858,2.07747910788867,5.748486310359274,1.0136198048439802,6.685522060836222,1.408201994494157,3.157507842638024,9.85990024124026,5.026900018900439,4.991694646378923,3.5678073680925397,2.616586434254139,6.589254725569777,1.926550155536077,5.8312710475344485,8.498776302614576,6.106193071549797,7.402725697177636],"s":[0.8433215422173861,1.8779113943928607,1.659183849487289,0.004529391931205939,1.457236571375105,0.4630298500801757,1.6625816883491216,1.5941554290375635,1.4632740371602937,1.9913232112552568,0.4188095456868135,1.9098539851729774,1.2632134030245115,1.7707628060129808,1.7216736101350567,0.9671394222675387,0.6512779133175686,1.012673108965528,1.1136786062518622,0.8608960057272275,0.24964945037642794,1.5532060956955656,1.401916286875731,0.4814747322912303,0.7726875967255991,0.2896415615788075,1.499462884970145,0.5665085200036128,0.9258217570808829,0.3513027453441011,0.2154395706582264,1.0298572687219232,0.9937887783173442,1.3023463270187872,0.8476778091760528,1.5079842475358527,1.1874487268339622,1.376701522478165,0.5654715635870584,0.5810817671185728,1.677569855046681,1.418032068787849,1.1294464038340455,0.12059696018733534,1.7747571465499337,0.21206718772176858,1.3408556367753404,0.3967844963356999,1.676040556530813,0.12771727840055114,1.813777173894347,0.801698176876013,0.0887899038411537,1.075287733110701,0.11293078759169273,0.5882684399228708,1.9349714814132954,1.903627627531415,0.8579041348767564,1.2223161758352825,0.1756664764582565,1.6359729685759818,1.2345881699484296,1.4972848525869145,1.772780300610282,1.6265048351044555,1.9736865011977383,0.9384869322260703,0.3633396354851244,1.2341347465327037,1.416358017018256,1.5027270235171257,1.9750390868142298,1.1016682072813855,1.1939155683655462,0.7416328181440357,0.9702159405968183,0.1633352468427871,1.4447510393762109,0.1871541489936006,1.38675088878573,1.942425993188833,0.7239607422605028,0.12406643788030491,0.20698263194647204,1.796021719805593,1.4810439198303698,1.853394937539532,1.3261312309492364,0.4064700545580737,1.878204776482912,1.3807498274629597,0.45458407515679555,0.7513237646456847,0.637012220965536,1.2514357847938329,1.839289062217461,0.8345505710631924,0.9538594515030963,1.7904757648641554,0.5890100863108199,1.4207570819027704,0.17718912027232214,1.8244435387405389,1.094881768745128,0.49838660849658023,0.27822029809490045,1.595536558489595,0.7069949341022559,1.0044478144216402,1.5951813044195804,1.974868337062063,1.6782306985115039,1.8443771924043206,0.5445081063146131,0.14752550592815128,1.1318708126359187,0.37723020087393744,1.5034787413569992,0.2025570755085928,1.5580612893628376,1.7290666749251367,0.27682066652011406,1.0405705329912305,0.9466971781712856,0.5341188700453579,0.42512861551409564,1.4411476461776869,1.850372732632258,1.1914141817132844,0.013144493590027562,1.7105778483816838,0.8951428854106309,0.46885314027114466,0.09560868329907857,0.08653011876463701,1.1859941559918918,1.4202279956589323,0.45650138032517606,1.0766906915150187,0.8264963940934371,1.3200038747549385,0.14578077146667434,1.515088591963739,0.605997743820061,1.023263984289759,0.8492458063696633,1.935002975574601,0.349663080737332,1.324351987170247,0.4017139327090491,1.2316131787609055,1.6122614926979484,1.0453103434738842,1.9743042188634696,1.0532463458390873,1.7413582903713953,1.163288049197289,1.8115521573483009,1.7883000487912657,1.2003942162115737,1.38356869389867,1.4336362524786996,1.5422945343223078,1.0729125595399824,0.9711726485295418,0.9449059519496474,1.2233442085631085,0.04493003322412781,1.5672039616953413,0.8921764476621443,1.7056221790927477,0.5945990368018728,0.6311252440957857,1.1520729041486262,1.283262897531734,0.44400151743712746,1.3873800388212256,1.2668400405360978,1.4207719652637683,0.1843956127038484,0.3092958421727925,1.5088210264548203,1.9572386300103717,1.97575333238564,1.6014242734527757,0.09843099385520926,0.17640328653647552,0.7696251253967752,0.7248258231374067,1.103023551392444,0.6668635288136135,0.8903480735187532,0.9449233075715959,1.2141623337772143,1.8957999780045736,1.5345009386224593,0.5790963932123199,0.6978659029738168,0.7657765359960718,1.1939862800168966,0.8461053569835069,0.11318320180347197,1.9325248429755573,1.9338369640979853,0.9516796854363205,1.4252315195129253,0.4606658723653525,0.8077390642486981,0.8315873344093778,1.1769506237723406,1.9569936043227285,1.664167802814224,0.37721388089990215,0.6687034199230788,1.8705007391521966,1.0847310188101993,0.3851546755827786,0.5008780292979726,0.7115261557346719,0.046190456096466104,1.6136673778552093,0.5108840751483421,0.8024692051009668,0.2834397683025949,0.19462184859168197,0.8290097810069224,1.9944655134873144,1.2460806709157972,0.8638083051437997,1.5336405960423072,1.7727230686271245,1.3504003281090142,0.29767950460320325,1.1056534085775684,0.2975277665440119,1.695721605856893,0.9360026418006737,0.8810792656768687,1.9926567354516718,1.6178977005132533,0.42373335367057763,0.18103361415632513,0.23854694150925848,0.5533252273998275,0.9257122441994201,1.0257519208487356,0.35249195220035023,0.9356441722871671,1.6682040209940872,0.047579165844086724,0.09305500028113922,1.2776253602500827,1.9171979298702446,0.9582662117103298,0.23318480903916328,1.5340122772853544,0.7333745806709939,1.1191202098501751,0.8619007784973709,1.8928713386038334,0.288170526990597,0.2574532042633164,0.9492830831096866,1.124673790752189,1.1245794241341764,1.9571875520849784,1.4658211385832876,1.8187079426020594,1.4638876229346494,1.7292190630864352,0.492194740192446,1.962075345339322,1.2748225763268684,0.8552055938607306,1.8993655130705105,0.5317669769616664,0.2593730591699095,1.0269005475402597,0.18003122201033595,1.3367066702533372,0.6401254376091252,0.2778888445836398,1.2825878123859904,0.5828408113748158,0.8211169503335882,0.487023956074621,1.2626660654138226,1.409448572141545,0.7240380273582145,1.4333200777250896,1.843301736803899,1.8059599775857178,1.897874269421167,1.3247982781863903,0.4535292564328417,1.1068377568741425,1.7146320638824264,1.2137328914664618,0.9106930772899369,0.6195416179164406,1.137972004984562,1.5795906489539333,1.2293480590809343,0.5985227923165342,1.9335987331812232,1.3788912633529393,1.9967012269997433,1.0087584048983533,0.8803605413002451,0.6075571325651725,0.7200835810153356,0.59179864614867,1.8647587747228247,1.33088034586169,1.6747929311027931,0.17198581000844948,1.6929328354104318,0.8941494987636025,0.483712097714184,1.6506018725823752,1.33705600617637,1.8702198761913031,1.3843078123179184,1.7049411332561624,1.3475612778072987,1.4223021071616877,0.5186469205628756,0.5433908340188736,1.107412919287965,0.6075395785226445,0.25639191793606253,1.4117060674697726,1.9821897640030355,0.8247653872764951,0.13712302703017087,1.0570682517300725,0.4014424738387081,0.5181579278071258,0.7877328510151069,0.523826445876201,1.459043648269676,0.698700204700879,1.6627503107531383,1.6124541061715627,1.7946060351265833,1.4348120237120838,0.18144882374338467,0.44130165300862023,1.0298519882556043,1.9430956404967223,1.7923106185043247,0.5186721977203388,1.557460361149619,0.24495907517009297,0.4032701279814721,1.0413670258857035,0.8126213337616868,0.4787974482203081,1.3093999909634717,1.0911761623516871,0.9579145185425091,1.8494006205907496,0.45738398711124173,1.7914144488349786,0.6802856840572544,1.8708269948329717,0.4646874905616736,0.42249676013789195,0.6210990891607411,1.6611084635962725,1.577693081801109,0.46704764663748,0.351172387736137,1.9713195648780122,1.4280950667196088,1.15499008847884,1.3369600384144764,0.2709786031943886,0.06326001314585339,0.670209736515837,0.24373940774292713,0.5734567074831425,1.5889854017206901,1.0564938103549202,1.1572776492356431,0.39189384150598494,0.19590307769632842,0.1635613818135644,1.3591237495097834,0.4010269999346634,0.14805693581583856,0.1810891425801886,1.7019457295147062,1.7952868404052937,0.032829651316578445,0.9593814184790359,0.8701647180870968,0.404744165090984,1.5159701020764915,0.7126033829150353,0.09271749010662944,0.28956691679811497,0.9372030803250615,0.012621349746849475,1.0062619059340938,0.9320599046858087,1.855838121658718,0.9587447881169675,0.7706948433199674,0.9919792439808037,1.3652335248827248,0.48767775201090124,1.8459268545299752,0.9427774660144603,1.5984234407158793,0.4323811655158538,0.4536741803928921,0.7101862959794221,1.9725103618874495,0.10260959091629518,1.8678211825135613,0.9547280305399086,1.0750564990053868,0.6197937861854528,1.3393833462693379,0.8903726169945476,1.9133589326282423,1.6822909203804413,0.8177342638508205,1.0724392234654108,0.07653792403032433,0.40753996946382287,0.9354361095834869,1.167105996802868,1.2931320098831924,0.39658499020751625,1.016861450359067,0.15117084099440348,0.5862655799150183,1.9439565385232744,0.06561269647031809,1.8125434735261416,1.607788745703012,1.2267914421267059,1.3171558425897838,1.9647087693290732,0.9637333625205433,1.2659877098225074,0.5657527193378549,0.6414727279192767,0.4356504663009786,0.548908122161385,1.971797029645996,0.11644052667286564,1.2735548108035313,0.26756740479927865,0.172963537155026,1.9591997316038445,1.9598135972480897,1.5006172946230967,1.6745676763221877,0.446279108212142,0.9254298259433402,1.8878347737572767,1.1085396546235389,1.5190397070778907,0.6065446990289618,0.37922956887931214,1.2621051540270378,1.0992530717757791,1.6958895225592028,0.7485570243863573,0.023981398027475898,1.519771238958842,0.8503360691027337,0.2218049960647841,0.4002074644284277,1.4954256706982338,0.8874080370201991,1.9232500897496383,0.7171766193525326,1.9763468407981533,1.628385405958761,0.14946468263386148,0.9098294375969962,0.3479044337215025,0.04455007475475492,0.5343505580161305,1.2938912067468662,1.828299856291415,1.5339241204143286,1.609595389539229,1.1456053568179319,1.795392574548952,1.2207285082072712,1.5651764828876917,0.05660039444952236,0.9627197190664885,1.6528645180281867,1.0059366273092896,1.1033441562494803,1.1467109078926816,0.3780346062244493,1.281350640502413,1.5935338692641192,1.2973795211692387,1.8689622680608449,0.9701826461101617,1.490122614581887,0.7353118625005175,1.5984211315195958,1.9644453053819277,1.2343953391488998,0.03810829841345553,1.0780663111101623,1.9983874058338023,0.1562042282620788,0.004273350240546314,0.013819162647128458,1.3414811931672905,0.35174355563163173,0.5323096372956697,1.3056261507256668,1.810874594826609,0.8875406878283569,0.4756549464842843,0.6991011887905669,0.22948230768358657,0.6714002911170285,1.2625511425571272,0.9752798944977736,0.43148089072974427,1.398826005587137,0.18807609872543907,0.9869864092147149,0.6998583588660696,0.004174798535188984,0.18000129603062964,1.0825179866491248,0.1727529104833625,0.8125814430172884,1.4336797795066945,0.39313173552351,0.16867691385384775,1.7651290011297722,0.9574535959724879,1.1897598237438807,1.7158825526704073,1.8953873791280067,0.016915809591071973,1.7045905098607284,1.772808578793844,0.07160702177421818,0.5929899529572822,1.676204288020597,0.25260177476037216,1.4029493717452315,1.0457782515674356,1.0469149720226012,0.9852530984412944,1.2324436394467888,0.3912522117658619,1.424601418066302,1.3336673779850923,1.8193080226173421,1.206616391706051,1.4446761615741606,0.31276356872020195,1.5235537956797307,1.5422841161721794,0.8923087599888992,0.544635543076724,1.5313923977051975,1.1123215664374708,0.3336017872878321,0.021982820560790817,1.3853564972224488,1.3283402240792914,1.3433137237203177,0.1886548724730277,0.32811056512756664,0.9108499250675441,0.5274447756611647,0.9889437102254455,1.4273183450920999,0.9897134237209269,0.767624186420496,0.6061854485743692,0.6580442834929521,1.2227149947114007,1.4800982954742268,1.1067530754122692,0.8601978320798889,0.2746218674022929,1.6584245461202642,0.322066838973317,0.17428629785469862,1.6366445393308178,1.0313011834746022,1.652323314676802,1.6555009294995848,0.03754630129755876,1.7021698976095707,1.7661098855726545,0.6653123076126901,1.8229019761653378,1.8385835621234388,0.5899206268303021,1.4913970697274435,0.942686426465472,0.5581402882173312,0.3911529991001621,0.9100520834443682,0.7760935647067111,0.4652241102617669,0.5194512380194296,1.9081927359224742,1.069064612644357,1.7312762334528546,1.2897031209642003,0.3278765887437505,1.2750980442861737,1.9576888324872113,1.118020480749415,1.4919532067156562,1.060023996112549,0.5446242981779239,0.5105449270339797,1.2378140186947784,1.3420143184752371,1.8122172132294794,1.022384967042214,0.752804835317515,1.217256609109031,1.240376394130498,0.8377330628547721,1.0584117268737763,1.3620025664081914,0.4818086143643159,1.6039895087429383,0.719465089952688,1.1145808923484872,1.0065209513902191,0.843428647170704,1.05755778066795,1.7190545900155918,0.8688708398515783,0.2852759767010844,0.03557202375754809,0.18381597150691276,0.6710311583073523,1.8433614261094795,1.2057238637444208,0.648020174294087,1.6789279480087567,0.13474853927965702,0.28869851448481754,1.5177149952597495,1.1513719562265083,0.1377937432512275,0.24138545096965203,1.3273797297626158,1.0008854704448509,0.8580426192888346,1.984813389689692,1.9508508346022886,1.4566612259489902,0.2535291716809218,0.06137357392334808,0.8780721029312448,0.06269277113207794,1.1566315204192463,1.383167014999212,0.29933230507075015,0.30982604183386053,1.4043019625454947,0.1564175010279376,1.4237642460069675,1.0252201347557595,1.7393966015841826,0.009610572342896972,0.8119105094847123,1.401843704899823,1.9296815956708748,0.5198187693903606,0.2589903100312916,0.8257531649194978,0.32959397860406936,1.7727746375499787,0.17923387425127446,1.8963311573212374,0.1432174416273142,0.6481435067450914,1.613506234632434,0.3313249587960083,0.8893981788607035,1.1017041957601714,0.14015019031885778,1.6229948336331579,0.8388467547316298,1.125694883302054,1.3590377209443312,0.790805269924777,1.8205206551860735,0.7303213720982829,0.9279360314455452,1.2788974543045089,1.5421233011380528,0.8700287446374468,1.779943515240968,1.4742389136633771,0.6636170637618739,1.6686051052929183,1.66320833680859,0.15838470996794918,0.6938496517053689,1.990401210533335,1.3181477603511804,1.7070104870776879,0.28320765306879503,1.846254984575879,0.43289663519376287,1.49080333231164,0.31044044209940935,1.047156649555013,0.737786935702438,1.955516918818395,0.7106728112920804,0.2807174582524339,1.9353899115279893,0.25217909874549127,0.004618488845137492,1.0749573483989048,1.4639340586609344,1.7983786980557261,0.4628778316305384,1.3780247764967801,1.4712676887059417,0.09697691462553193,1.342927523309759,1.175804120810788,0.39175313068843165,0.6596257553033604,0.7538155732065501,1.3213980141201431,1.6147082988745307,1.8320182333673793,0.9981417107321873,1.6642337860137877,0.831436624286642,1.036550546461739,0.7805611536823198,0.3118032043725387,0.5486296747661425,1.6780225075970612,0.07883051685724807,0.9690135555869683,1.926275164062099,0.332299222576371,1.478876852088066,1.4331005632226619,1.6548806690268059,0.5173714699059104,0.21509856501571578,1.0771687959732574,1.067931986136431,0.386649487452833,1.7437114738754973,1.5191492726758282,1.9874960327704376,0.3239521013205442,0.6844081789670167,1.7790244525986916,0.10176496309946348,1.4116439382742105,0.30045365783241484,0.15324041881825412,1.9824598898467016,0.7685474966764256,1.1482151458639995,1.601783517020873,0.6818694457392929,0.18956332521576957,0.5737111490660025,1.034052686183697,0.431806466319427,1.9476630511783934,0.33893217131401254,0.34018836939477826,1.8547325073987309,0.7545837760534782,1.1275075523961866,1.1612817646382951,0.33724480477085006,0.8091175263194255,0.03386559829721181,1.6870007721590836,0.18662341088041146,1.5359819640538,0.3355937541064331,0.3800596183447178,1.47426898791363,0.8054897012941913,0.4665905467697229,0.13812610875697562,0.12686112803555227,0.6383245242691649,1.7100520667837529,1.526298183316368,1.1644871810248962,1.2003997295253526,0.18204996070130353,1.7876914201495806,1.2601016894150163,1.4913393885821056,1.405052515952586,0.14572489000517264,1.1691616333401025,1.0800626176887942,1.528514603743845,1.4164615027144123,0.08951660657800264,1.0675486323019747,0.7887511710605666,0.15098293123975592,0.8754813870548279,0.5501887718186254,0.9161797514556071,1.3603399730780237,0.05104494712612029,1.0759276061585146,1.6437201266690988,1.2616455392138128,1.6743704788622518,0.8156962340314715,1.378435785422007,1.3372254263825876,1.6621930206285698,0.8551529737298096,0.1463378638144932,1.1213662893955232,0.9376599885244756,0.8084521517471561,1.914858893356548,1.4393055489911077,0.938056663788938,0.8336818322679722,1.3484299302240084,1.198433216286955,1.923624900435676,0.5928759443805078,0.0418376125311406,1.7679600663685004,1.3783606910475723,1.8525047190592323,0.9512669999827601,0.6027266603950978,1.8864707152428002,1.6708542473819552,0.8105561962038967,1.1548789183242043,1.5988063466220237,1.3106049002986517,1.0659481037198573,0.2573930503258519,0.24105102261227307,1.5141955441664297,0.6367476894572839,0.08797431988578541,1.6196790384720718,0.5296070353943723,0.5083980791425877,1.656925766943187,0.8989199550280662,0.378562207208359,0.7174068277497292,1.2593584837148537,0.8656366584268094,1.8125364171465206,1.478045235262432,0.01381015257691498,1.6559932566657682,0.3952273988056363,1.4012019114117322,1.9974909521842892,0.4921648700821004,1.381689849059442,0.7097576426015428,1.3739725950399397,0.7479540969879923,0.5732845399582271,1.7133180933470893,0.38015842780175557,0.9634279690933165,1.3787484709898061,1.1467739216122363,0.16099967378476476,0.7793410607245037,0.9440328651479946,1.1698446425025102,0.2237533753797316,1.7990953586024196,1.081307989832212,1.4387524738530875,1.5300405160656605,1.5147451407810975,0.027278323260258475,1.0509285073809553,0.10973932094917327,1.6899593254129055,0.2957045666216742,0.3001482082774505,0.4939126977423034,1.4190206583944494,1.5378170570143515,0.3451432021355707,0.8609077892094068,1.3449569171603217,0.8576506600799574,1.3232797417794795,1.5017224313458164,0.636993803578795,0.632473549934117,1.4439100135999254,0.8677865464886048,1.0813694986598406,0.3061552039480522,1.919577980399088,1.4000062971929643,1.9581268326951968,0.13021526045301224,1.3003005441910904,0.05116395803242746,0.6706297299490793,0.725216521496725,0.7890833510154542,0.8942506598423154,1.7530864302208604,1.4220326258687725,0.06952374133333628,1.9474990617806145,0.3439879245985642,1.163543651889683,1.9483419950768246,1.7510442506231567,0.5833858461694494,1.9024733004531078,1.4784490482112926,1.9196213819309946,0.29961083604232064,1.1375870326562634,0.8654112634547686,1.0855777532716981,1.8941463997544057,1.7564648218143004,0.34108263555543683,1.4923263181139803,1.7485923371080827,0.22520066942048,1.2256639368283762,0.8458073461728421,1.5877313622325753,0.19353968566708346,1.822108368849218,1.7125822858748938,0.057750394657088755,1.0861958344125933,1.0331461866304719,0.8307934070365288,1.3588624370061937,1.6228957080793958,1.2942563039008923,1.8218772991379781,1.9028862354320148,0.1714861133691734,1.6033028148508905,0.3084105753199591,1.1080217108747288,1.1478608872848381,1.8782848029102879,1.0710349491042237,1.6120526213268285,1.1336585525268141,0.21508611350866857,0.7866270167417211,0.8275749550633305,1.1033636314101756,1.809979756697547,1.9882922416643627,1.53980161540892,0.7408757580245409,1.4164463563356624,1.2962401576235822,0.19025731700974546,0.3137271112396043,1.835074228969264,1.3847275253459714,1.1619253896042836,1.508801818787468],"mu":[7.497817887225528,4.0924233677234145,7.037316059465821,8.58023004913619,8.341107981751637,1.7769327259007284,9.184321710035665,7.175987888016748,5.397420492817706,1.5963049975467536,7.477780015182141,0.55103472861324,5.423748045155261,5.692595617309184,6.106447610583361,9.169972476957216,8.732111280173715,5.932735998185157,4.496571971041423,2.263554032470547,3.4937987407517412,6.39070182713287,0.514517000834589,0.3135242571857333,3.7762362468086774,8.844523346781967,0.19911379573607224,5.278577914777449,9.39004544323511,0.3304606907369645,5.886946314299733,0.49007994608961214,8.62300625784195,7.290140412750334,8.589072929583184,2.5733386541508763,3.3796328574792223,2.9169662131598106,5.5998865388362535,3.37134518462862,0.8023531702168518,1.7270715039765427,5.071777433998945,6.369559774901967,2.8870045884965223,0.5136942482580498,5.034145215010721,6.7670871164424256,6.247489979882868,5.196346321882377,1.694349650379141,2.2896739369361274,8.848532221079893,0.7064404345366704,4.740050851431135,0.8376517434020458,9.910365698768482,3.909504821874996,0.5886142696156482,0.12282113262740202,8.28984489470714,0.3549525647814966,7.414085742333909,0.49031260722612213,6.223408909865218,5.823095771645955,5.941644228135221,6.827164905133614,7.845527042966762,2.110806470099109,1.759935691874046,9.948161276998777,4.168802366942774,2.0830988061578504,5.654387517547034,7.081338806924098,7.064677963781884,6.934401017891361,9.024061778500014,4.317361916745552,0.7016665386991949,1.7166646431991706,4.862083098216803,5.373515589396403,1.2185182840657016,6.63245543353812,6.542919313059377,1.987225932545822,1.0996776214835502,4.371254697062874,2.875795363746716,3.259425890679013,0.6516630436884552,6.065496566500359,0.9780742505077322,1.6870037046419672,0.27940584033882665,8.028884394917576,1.9015449668183737,9.84766291746135,8.33077240034346,0.3209115663072515,9.310436798414521,8.659060702094196,8.890998146063232,3.1476545542861323,4.1494466995566786,4.452183392518405,8.418262448621451,5.7393497790454,1.5551009235241064,4.040038719616836,1.3522453281668967,9.698388094080874,4.9631344259409405,9.613015939738487,1.4869785087450582,5.210614293613769,2.3515247626919322,5.004403608025687,1.9995808725778663,0.12981842265162413,7.542365378444014,2.987392369406512,1.597312172846963,1.5883354221910406,8.903549100556074,0.04902864194148426,2.2658696232025277,1.1472623180644792,7.841320062020259,6.896960685837934,1.5872215605424778,0.6188345803621464,5.6135358027809374,5.917840383098929,9.79825645607487,1.6153313566860672,4.9908391100777205,6.642102161569121,8.30584791003248,9.238399662115553,2.7565470104836454,4.056049555055354,3.8362288396638355,3.801384641780583,8.521271521648275,6.675889784824818,3.488332857879859,2.2606519332092168,6.29207507730902,0.5105438792786265,2.677719880892415,9.253640163128459,3.8494565163827743,4.345420211270417,6.164266129062012,6.383426754273563,2.98681458957206,1.7407541975536311,1.1339866735861737,1.9412392076162166,2.0909268522307833,0.7670207356567649,0.6497786521863125,1.0894625899847066,8.220033518662653,9.296538058547107,5.698430200635585,9.288209224263964,3.256924917719073,7.295587413122602,5.738126653459734,7.6542899024908255,7.748516593167334,2.17680997421305,5.882062598385787,6.410384430614937,8.718282452358306,9.910981509948567,1.6627582601678248,4.576551158436459,0.17106738900985574,4.634129298369849,9.16086637383032,1.4440095803270814,0.04667531302929184,8.321033808660792,6.884252537545881,5.735535729463608,0.28627534115533315,6.119218774506674,4.024518508370152,1.4387757483626373,5.330647460031736,6.51252791179636,5.489417669924799,9.345000905958978,6.531297395213631,4.625946385667388,3.754556513126146,1.401984670817964,1.050629723928025,3.2811589389647056,3.8831748952204914,9.484227439984792,6.77225336674641,8.663108994638494,9.510410273892235,1.5490550152124638,7.174237291064367,3.0490785828893308,8.212260266623918,1.1347972113077676,0.019038018761110553,4.613227134192515,0.6852828277370437,0.015078257043563692,2.335376877214521,6.634609864277818,4.950816758235135,1.9984115217597087,6.915199911098304,3.797523447574609,2.6442267779665873,2.311296487069181,1.9368631514084877,8.754822801750501,9.67800508184779,0.5984980374447546,1.8407342530787552,9.305816710154257,3.1315696400006265,1.69607578416052,6.053579321421678,0.5433003804405967,5.907259392681004,8.764166477425729,0.47818103261319855,6.177106150328202,7.837943251477066,8.128520015443595,9.60106642840488,1.4964969122474447,0.39272935396183817,1.0023402693150651,4.7767135070713485,3.073087646260304,0.41785815626233624,5.179836193405814,8.925879693658544,2.6682122169498523,9.352196229134652,3.667908665622741,7.7585618750641405,4.488692796181333,4.870244822475267,2.14884910707434,0.075154639188737,7.343069759049785,8.906031378794077,5.115388041155439,2.486157939363174,2.222799016376771,7.1169945229890015,6.410023016750626,4.981433558355222,0.1593943550335175,9.019300884981083,6.949659803292136,4.519492953348749,7.065561644913359,1.8142802311022543,6.88938432651661,9.536035767646084,6.035316428730885,1.5509976323050156,1.0359665623834502,4.843193685440877,2.621200862902653,9.405022796120546,3.6024697263684047,9.969519714956231,2.239637221751647,0.9269566873175283,0.10452366456511708,6.881964621394532,1.5835232152029644,8.000586574896618,3.0520485360912164,6.1970629089560125,7.737578031641332,9.475733475629466,5.7747409315149145,5.7513844098579225,7.954877846427763,1.7659086826996773,4.194798255183471,9.613221687934105,0.2801547240441593,4.013622242449619,8.541429391675862,0.5555473437025871,8.971106918878561,6.12726509583577,7.772797239309015,3.6225367633597627,5.687895875248827,3.070597726821165,1.6240426366478689,8.320308129000251,8.417432916546252,2.148490034221908,6.92057384802002,9.032452923084167,0.7366448493209754,5.106932500750945,5.540931537170593,4.883083963139033,5.859769493965996,1.8300272123177797,2.9170551576672032,4.179136204936729,5.964100941992192,9.266604481745675,4.81762111308615,2.0025066465021335,9.771439213523811,2.733439953189838,3.5225783061941884,2.4793892444394405,3.5165671400189513,4.424698635590369,1.6888042221320299,6.307232008151149,3.525529639231586,8.671387234882337,5.224841927517496,5.310929954776407,9.996907288555366,8.333862729714062,2.8953319867175686,1.473595962622154,3.0098257808342233,7.723925857781699,1.9626134556499197,3.6281165928116077,7.069955328440793,4.033253408198165,6.773122310722918,8.569280303259099,9.1373754977547,0.6690755085092936,6.766716192822919,8.18830542808277,3.155334475927374,9.46057633029202,6.9276414769038634,3.6792613973382093,3.0221230622426143,3.000160012539548,2.762020725379104,3.873990149622397,8.935296386749052,5.288219174380058,4.9767450454563384,1.7107504271736151,9.729934505285975,0.2665160254302301,7.136145552880544,2.533435541849034,0.3952667293215062,6.552990918406887,7.306075075599125,8.69884156129174,5.336957116137333,1.0698401841563054,9.933889283689176,4.876660253455912,8.451634744130065,6.556407039614125,5.372551331065596,7.45723906613001,1.0690262809805429,6.118915931107381,9.416951702785429,3.05129489748424,9.117403370115348,0.7408241708185193,0.37244984331819664,2.2461461911823477,6.093044770326783,5.587195529950413,5.752541117329935,5.300161457785782,2.7754781759560343,6.847676608961486,4.9995985512802354,0.39320300817537346,9.641986668075763,9.032760832138315,5.458032671967352,1.4157833412357812,6.271256026162238,4.821832296039556,3.527617071322897,4.577769631465491,0.9337187310120743,3.7210468110389017,5.451981487928952,3.8916390995564987,5.476862928819434,2.234968875585952,2.4223884225125203,6.9331840847725985,0.06682710758757926,9.793276825908524,2.4452594847729614,9.042364475720285,8.46545802594754,6.473929587659375,8.08006165302692,9.550437589656626,8.58561196496403,7.260612436186835,9.68515956293288,7.138693356925765,6.58854291909742,8.184732183481971,3.8515754585822393,0.19935822977952267,4.218302442517931,5.751992644712667,7.114149275881236,5.067310325178564,9.121156756544726,8.571941499369096,9.44066240132977,0.2783799588736535,6.746979238661847,6.041541441061233,3.070488652773131,6.401956965127475,6.75272695219504,5.102343901200916,2.2731274342537566,2.600038499467734,3.54079990895688,2.9309984499288855,6.4029561640751975,6.699526033523804,2.4642211613145992,2.9053631344789865,7.975296874082849,5.445773707074075,0.7978368659024415,3.2822455387283456,7.2096726185437205,8.791258836272334,7.6816157945484775,1.3046340885876795,5.954403689164717,4.434230252395331,5.951718723473265,5.407068889716347,0.7487759676582662,3.7836058472167267,1.5684422490606487,0.1633241843503197,4.755585880532214,8.477532575323245,4.288658952623273,3.658182519787243,2.5437449517107202,6.083379707944692,4.538000472615176,5.416327090036177,1.546263558727119,9.098215560691013,8.129755216340635,7.883852615627647,9.1028789387207,6.211457390281563,0.8139914618644339,2.6590265232627774,2.8522165653353637,3.8139393377067132,6.348184434032014,9.655804222256918,7.043869578303483,3.687681724877827,6.7056954490271465,5.811500246303374,5.070359666343229,4.067850223699539,5.450120628737267,0.204116695247063,0.34540714791167826,4.083854805267886,1.9300144739570735,4.434345589982938,5.284794015241783,1.7352105314173705,0.3909105893207143,3.486413543384206,6.426421211291036,9.190978643363167,1.1106241407357609,2.7663053356860723,1.148393380831998,9.035074564261532,7.267353248171569,1.406602864826465,2.497479144153625,5.841152059842183,7.830117345118555,2.4841244222138226,3.112894644170343,0.46583910979527854,8.454376758625717,7.91480777171402,8.737131961842465,4.665850837811105,8.096949519633,9.371974653754158,8.074983579660826,9.39068347174053,4.607223075328153,8.999356529926633,9.875547102444433,6.5599452261014175,2.24020612576709,6.872721096416578,7.224420121759243,6.642081907593019,1.9050910469986393,2.322490413920082,2.8001461829278007,6.7881095111070415,1.1532384979895016,1.3556354819814742,5.637450899500031,4.648586355138226,4.110292653417995,4.4770578326021475,0.17251889143625077,5.47762802739425,6.120212188842265,5.970841948010557,3.532283346903733,1.0515285784604123,9.313415301091567,1.1398457640158233,8.475931644929616,6.2467520932475695,4.861882880250832,1.4988242673885788,8.017533772843963,4.259375347194469,7.958937036600274,6.465337853686098,4.498961293286596,9.419310016097814,1.4119428886810037,0.5197358713334577,1.6913798666307711,3.7679089544704203,9.069394718033452,9.718295868927173,7.96674669004995,1.441107268005164,9.226576442919356,0.16552361113679304,2.9083437250471333,9.32420885147971,9.902335026715603,1.3472953489800288,9.844991588408211,5.777693058807774,5.111142714152612,3.1001371298318725,8.72240824108896,1.8177171786912183,5.044202456029563,2.6250573548156497,6.972117975929429,6.482129546575712,2.222261118274751,5.206488845296611,7.827543587350505,5.516384095477744,7.102910719034856,2.4492124849061736,2.2202470274908648,5.745000437679442,3.0773247716090824,2.4900336219586428,7.328480298105822,4.941743877625608,2.9473025197448077,7.608595154761639,7.466381669733913,4.238366166598397,1.6585899447011787,7.248384746298003,0.05265472035563601,6.497084564591525,9.050508799697328,0.24795408768207627,5.420256376435941,9.132236936184306,4.978821945056453,5.045585154767169,6.277281294568715,2.0959241514588323,5.944072336452844,7.320766801159735,2.742943188918352,1.2729279074670519,5.338709788086804,4.092397381255671,9.787117944915838,0.7111946635030653,8.112706259327439,5.98823673133438,7.876065800869572,3.871378185540202,8.629562943981195,3.602235471861781,1.209021565019619,5.961590248343002,5.875661038371778,5.627198151763353,3.2140489191811494,0.3064009333233697,9.838756120856031,1.9491570555011917,4.747057398171366,6.391923467451093,8.578909362923746,9.592153458013046,1.594071396949841,9.499374801423993,3.280838953290568,3.413862128590426,3.109805152153713,1.8311940454628628,7.780889461103531,4.415757437636856,5.710174262833121,4.741792339542108,0.2677109178530479,3.1832824092844536,5.738661321800851,5.129062995969884,3.60197201939201,2.8696751926233266,8.964453794916075,7.204266581456795,0.8449719348820572,3.6343446044779104,9.520701545304721,8.06715057879722,9.630542127206294,3.5217337802925752,9.12236046050662,3.5164250004512354,8.390719877478412,5.132956148553644,5.3270938414902425,9.633291199547463,4.664548343266668,5.811028662184013,3.850952542952666,7.682329406110295,0.5980356676454979,4.579134273131289,5.752616352170583,0.3491169103588043,8.759776443779437,7.8309266156276625,9.762436413638822,1.2010095720086533,6.282362158316921,2.7283520408559903,5.39018892516096,7.481740965287269,0.43555766672483953,8.402197589895339,2.4207921406762956,3.960212857830032,7.72803875269735,4.74692158203994,8.509919082946185,4.549615643872997,4.176013298636803,5.582894199589599,7.539988927626817,8.285723178260469,0.09953821480856773,1.6016633993910911,9.278025711653864,6.309348491527908,6.201073091458391,1.5866868062304151,3.5518652911495185,3.7765040762260704,5.121120988906576,8.406691245229258,0.9272737627793259,0.7305121034667783,8.885878845284111,2.822558364864687,0.15668425870048353,0.0028425452321734213,6.842461205960253,0.5510893537857098,3.343320218327812,5.428568854607305,9.719231793320349,5.8870827185709445,6.630588334774483,3.3185231197936105,4.820259379065854,2.4054338149804932,8.153795059595623,3.5117612590595737,5.972201782154382,2.879288507051494,1.1372048066271545,5.453569647471726,4.348279631803116,2.5501290024058743,4.558037770919102,9.417842376321403,1.6303403243396186,1.3137287531711195,8.911567150224721,8.415025781875027,2.222310606188258,8.645663588168537,5.02404291781424,8.131267752791487,8.305358361403464,7.541501178373238,1.0569980912873422,4.427519511253333,8.601706276291514,0.09768834879803734,6.545489717017241,6.013807233869111,5.576050453755082,9.630484394107343,3.026960712827944,6.416397471690873,0.13917392482241553,1.0948142556815044,2.741105373264321,4.703700854225559,7.92009980155266,1.678735003783689,8.519482771477245,5.906143280478073,2.7529930343772313,6.739633134553184,9.864674959612074,1.6890157474128653,9.548733260974881,3.175205839583095,7.554370868706021,0.11686585170321617,3.095830389372245,5.785335585016151,1.180160392902525,3.040146727585229,2.1012587339498,1.5283472573685253,6.35265303098574,1.573741976773424,0.9432846003829587,5.646621787957735,5.6976437059045555,4.211236506803266,6.665827828378143,3.860732570741683,3.489862125239922,3.036432823592141,2.4890782344038676,6.8574710027483015,5.220527896722638,7.407222238908826,3.911228250921188,5.239505964697964,6.910869583712929,8.094367485152603,6.6307368438836045,2.1704316964039605,0.12400691405353825,0.2679830549587314,2.4015023964425075,0.46222908419311537,6.045019112693131,6.574547370886654,9.949912806131342,9.981452563347222,3.5568556960132414,9.172446577278313,9.458217255697667,5.007288662741038,2.052851338741062,6.886840928699467,2.1878219680243016,7.6349549148237905,5.945206862728236,2.678981749874967,1.4648180451770698,4.457034818476404,4.979839353976983,4.8620965901143816,2.501921624282004,2.0470336633806197,5.711218168709838,8.770688978115368,1.0848404293911407,3.0930126996564566,9.228301274883554,0.7818822066656583,2.2012544512853927,0.8364814318061353,2.6359676408538513,1.3150848126835002,5.341988063907664,0.635052865800938,6.86710943443928,9.684047684194663,4.217235438271509,0.9077918048673506,6.585458974738366,8.906586385288865,4.875495694223471,3.490960801565033,3.324354730484431,2.7889783359137144,5.884797765613225,1.6794695159452044,3.621256554248935,1.0514213704472786,9.171832866415803,2.407281087189268,6.939077191003726,9.179209151109655,9.828647609164298,5.100497644836288,4.365162678171439,5.325166952200037,9.209891590117481,3.0481380262471025,6.773993426274554,2.1771684719803885,3.184591132664081,1.6174843186531507,7.134406917724007,0.029300570550960803,4.387864643736785,9.648457418756333,7.215794094460046,9.18963207132614,3.7576289808437657,0.18967244552295037,6.9385894249257625,1.4409274616568646,0.18224447733748095,3.4730270443795064,2.5051493289169424,7.946118576543206,8.944609652314782,3.0472879462721014,3.5882030455254577,2.9789467344688214,9.917032761734362,6.881806543169278,5.718068957183416,1.8722717452560378,3.6385283266471236,7.966715744551356,4.794804284398575,4.332008956625415,9.601905198343845,0.6353118789058487,7.254276695173267,5.0842762966098265,7.799480009555233,0.08716725842511597,0.0562578198000252,0.22811903688432666,6.218739556366426,2.6078833064904194,7.714473301230543,9.379947814427116,9.317967981782617,8.969415551835695,0.8629673522341363,4.7804337656716145,6.745717227498613,9.91007320014508,4.83215091771857,9.34443108272864,9.940796220419791,2.113171274844934,9.16238074500433,7.236496039644392,5.448163304591045,0.3873920641931261,8.3942686172192,2.8797160490893248,9.583183330272217,5.52456176530673,0.6403206060370681,0.9491802021078466,0.415046940354975,2.5686177938918964,7.616850294899368,9.818068081797888,2.7304261598960533,1.613347682168349,7.960293693162348,5.927344256617008,1.0438275298986777,6.635990405211585,2.437642093824426,6.200066413958369,5.636156853106398,6.112477980437918,2.1354195302403967,5.038708068933014,5.924919763515353,8.148526055556353,6.9776979318157135,9.687935894032067,8.966567202228717,9.920583068763333,0.26325678108463535,0.3720284234457538,3.3998609971243843,6.661279656339638,6.563561829267481,5.131285018068345,8.208942034454068,2.023330583007754,2.2280924469614938,0.1308977305419723,1.518489161160539,9.843661150525243,0.8885893178446458,4.396398121975425,6.635957868788913,4.424457165960954,0.503194742658204,8.952555465227023,2.4915149482390198,3.9541176272808265,5.505446723499268,2.7769957825899616,2.2173388587196396,6.612793130928861,0.2018949909701928,4.546538945866077,8.750193708063236,2.1214651224277636,2.781659700891974,5.062592401673573,4.712873745394384,6.09608988895155,5.334653230899491,4.646350712188212,1.562772684246232,3.198507194081308,0.35702420659309286,7.323344819534661,3.19792959197859,8.29599197019132,4.164802187061698,7.006500960977484,1.1956090753682669,5.587723227485033,0.9805705672144427,6.445422099322878,0.4197956859462648,1.548653295783633,8.873478179910663,4.397001950800878,4.55790481875434,2.479517055495044,1.5539045000961837,6.555861534350223,1.6898645221312125,4.94210355650321,7.712069951293447,5.483647850868318,6.5565484785720685]}
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
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logcdf = factory( 0.0, 1.0 );
	t.equal( typeof logcdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, 1.0 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `mu` and `s`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `mu` and `s`, the function returns a function which returns `-infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a negative `s`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, -1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( PINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `sigma` equals `0`, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 2.0, 0.0 );

	y = logcdf( 2.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to mu' );

	y = logcdf( 3.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x greater than mu' );

	y = logcdf( 1.0, 2.0, 0.0 );
	t.equal( y, NINF, 'returns -infinity for x smaller than mu' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var logcdf;
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
		logcdf = factory( mu[i], s[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 600.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var logcdf;
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
		logcdf = factory( mu[i], s[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 600.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large variance ( = large `s`)', function test( t ) {
	var expected;
	var logcdf;
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
		logcdf = factory( mu[i], s[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 800.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cosine/logcdf/test/test.factory.js")
},{"./../lib/factory.js":116,"./fixtures/julia/large_variance.json":119,"./fixtures/julia/negative_mean.json":120,"./fixtures/julia/positive_mean.json":121,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63,"tape":260}],123:[function(require,module,exports){
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
var logcdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logcdf` functions', function test( t ) {
	t.equal( typeof logcdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cosine/logcdf/test/test.js")
},{"./../lib":117,"tape":260}],124:[function(require,module,exports){
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
var logcdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `s`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `s`, the function returns `-infinity`', function test( t ) {
	var y = logcdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided a negative `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `sigma` equals `0`, the function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var y;

	y = logcdf( 2.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x equal to mu' );

	y = logcdf( 3.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x greater than mu' );

	y = logcdf( 1.0, 2.0, 0.0 );
	t.equal( y, NINF, 'returns -infinity for x smaller than mu' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given positive `mu`', function test( t ) {
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
		y = logcdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 600.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given negative `mu`', function test( t ) {
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
		y = logcdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 600.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large variance ( = large `s` )', function test( t ) {
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
		y = logcdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 800.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/cosine/logcdf/test/test.logcdf.js")
},{"./../lib":117,"./fixtures/julia/large_variance.json":119,"./fixtures/julia/negative_mean.json":120,"./fixtures/julia/positive_mean.json":121,"@stdlib/constants/float64/eps":46,"@stdlib/constants/float64/ninf":52,"@stdlib/constants/float64/pinf":54,"@stdlib/math/base/assert/is-nan":61,"@stdlib/math/base/special/abs":63,"tape":260}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (logCDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 5.0 );
*
* var y = logcdf( 3.0 );
* // returns -Infinity
*
* y = logcdf( 6.0 );
* // returns 0.0
*
* y = logcdf( NaN );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the natural logarithm of the cumulative distribution function (logCDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} natural logarithm of cumulative distribution function
	*
	* @example
	* var y = logcdf( 10.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x < mu ) ? NINF : 0.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/ninf":52,"@stdlib/math/base/assert/is-nan":61,"@stdlib/utils/constant-function":142}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/degenerate/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/degenerate/logcdf' );
*
* var y = logcdf( 2.0, 5.0 );
* // returns -Infinity
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/logcdf' ).factory;
*
* var logcdf = factory( 5.0 );
*
* var y = logcdf( 3.0 );
* // returns -Infinity
*
* y = logcdf( 6.0 );
* // returns 0.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":125,"./logcdf.js":127,"@stdlib/utils/define-nonenumerable-read-only-property":143}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluates the natural logarithm of the cumulative distribution function (logCDF) for a degenerate distribution with mean `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of distribution
* @returns {number} natural logarithm of cumulative distribution function
*
* @example
* var y = logcdf( 2.0, 3.0 );
* // returns -Infinity
*
* @example
* var y = logcdf( 4.0, 3.0 );
* // returns 0.0
*
* @example
* var y = logcdf( 3.0, 3.0 );
* // returns 0.0
*
* @example
* var y = logcdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, NaN );
* // returns NaN
*/
function logcdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x < mu ) ? NINF : 0.0;
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/float64/ninf":52,"@stdlib/math/base/assert/is-nan":61}],128:[function(require,module,exports){
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
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e');
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

},{"./is_number.js":131}],129:[function(require,module,exports){
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

},{"./is_number.js":131,"./zero_pad.js":135}],130:[function(require,module,exports){
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

var formatInterpolate = require( './main.js' );


// EXPORTS //

module.exports = formatInterpolate;

},{"./main.js":133}],131:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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
var isnan = isNaN; // NOTE: We use the global `isNaN` function here instead of `@stdlib/math/base/assert/is-nan` to avoid circular dependencies.
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

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
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ?
						String( token.arg ) :
						fromCharCode( num );
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

},{"./format_double.js":128,"./format_integer.js":129,"./is_string.js":132,"./space_pad.js":134,"./zero_pad.js":135}],134:[function(require,module,exports){
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

var formatTokenize = require( './main.js' );


// EXPORTS //

module.exports = formatTokenize;

},{"./main.js":137}],137:[function(require,module,exports){
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

var format = require( './main.js' );


// EXPORTS //

module.exports = format;

},{"./main.js":140}],139:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"dup":132}],140:[function(require,module,exports){
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
	var tokens;
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	tokens = tokenize( str );
	args = new Array( arguments.length );
	args[ 0 ] = tokens;
	for ( i = 1; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":139,"@stdlib/string/base/format-interpolate":130,"@stdlib/string/base/format-tokenize":136}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":141}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":144}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":148}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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

},{"./define_property.js":146}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":145,"./has_define_property_support.js":147,"./polyfill.js":149}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":138}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":151,"./polyfill.js":152,"@stdlib/assert/has-tostringtag-support":24}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":153}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":153,"./tostringtag.js":154,"@stdlib/assert/has-own-property":20}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){

},{}],157:[function(require,module,exports){
arguments[4][156][0].apply(exports,arguments)
},{"dup":156}],158:[function(require,module,exports){
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
},{"base64-js":155,"buffer":158,"ieee754":246}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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
},{"_process":252}],161:[function(require,module,exports){
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

},{"events":159,"inherits":247,"readable-stream/lib/_stream_duplex.js":163,"readable-stream/lib/_stream_passthrough.js":164,"readable-stream/lib/_stream_readable.js":165,"readable-stream/lib/_stream_transform.js":166,"readable-stream/lib/_stream_writable.js":167,"readable-stream/lib/internal/streams/end-of-stream.js":171,"readable-stream/lib/internal/streams/pipeline.js":173}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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
},{"./_stream_readable":165,"./_stream_writable":167,"_process":252,"inherits":247}],164:[function(require,module,exports){
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
},{"./_stream_transform":166,"inherits":247}],165:[function(require,module,exports){
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
},{"../errors":162,"./_stream_duplex":163,"./internal/streams/async_iterator":168,"./internal/streams/buffer_list":169,"./internal/streams/destroy":170,"./internal/streams/from":172,"./internal/streams/state":174,"./internal/streams/stream":175,"_process":252,"buffer":158,"events":159,"inherits":247,"string_decoder/":259,"util":156}],166:[function(require,module,exports){
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
},{"../errors":162,"./_stream_duplex":163,"inherits":247}],167:[function(require,module,exports){
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
},{"../errors":162,"./_stream_duplex":163,"./internal/streams/destroy":170,"./internal/streams/state":174,"./internal/streams/stream":175,"_process":252,"buffer":158,"inherits":247,"util-deprecate":268}],168:[function(require,module,exports){
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
},{"./end-of-stream":171,"_process":252}],169:[function(require,module,exports){
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
},{"buffer":158,"util":156}],170:[function(require,module,exports){
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
},{"_process":252}],171:[function(require,module,exports){
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
},{"../../../errors":162}],172:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],173:[function(require,module,exports){
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
},{"../../../errors":162,"./end-of-stream":171}],174:[function(require,module,exports){
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
},{"../../../errors":162}],175:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":159}],176:[function(require,module,exports){
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

},{"./":177,"get-intrinsic":241}],177:[function(require,module,exports){
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

},{"function-bind":240,"get-intrinsic":241}],178:[function(require,module,exports){
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

},{"./lib/is_arguments.js":179,"./lib/keys.js":180}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],181:[function(require,module,exports){
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

},{"has-property-descriptors":242,"object-keys":250}],182:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],183:[function(require,module,exports){
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

},{"./ToNumber":213,"./ToPrimitive":215,"./Type":220}],184:[function(require,module,exports){
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

},{"../helpers/isFinite":229,"../helpers/isNaN":231,"../helpers/isPrefixOf":232,"./ToNumber":213,"./ToPrimitive":215,"./Type":220,"get-intrinsic":241}],185:[function(require,module,exports){
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

},{"get-intrinsic":241}],186:[function(require,module,exports){
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

},{"./DayWithinYear":189,"./InLeapYear":193,"./MonthFromTime":203,"get-intrinsic":241}],187:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":236,"./floor":224}],188:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":224}],189:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":187,"./DayFromYear":188,"./YearFromTime":222}],190:[function(require,module,exports){
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

},{"./modulo":225}],191:[function(require,module,exports){
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

},{"../helpers/assertRecord":228,"./IsAccessorDescriptor":194,"./IsDataDescriptor":196,"./Type":220,"get-intrinsic":241}],192:[function(require,module,exports){
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

},{"../helpers/timeConstants":236,"./floor":224,"./modulo":225}],193:[function(require,module,exports){
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

},{"./DaysInYear":190,"./YearFromTime":222,"get-intrinsic":241}],194:[function(require,module,exports){
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

},{"../helpers/assertRecord":228,"./Type":220,"has":245}],195:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":248}],196:[function(require,module,exports){
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

},{"../helpers/assertRecord":228,"./Type":220,"has":245}],197:[function(require,module,exports){
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

},{"../helpers/assertRecord":228,"./IsAccessorDescriptor":194,"./IsDataDescriptor":196,"./Type":220}],198:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":233,"./IsAccessorDescriptor":194,"./IsDataDescriptor":196,"./Type":220}],199:[function(require,module,exports){
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

},{"../helpers/isFinite":229,"../helpers/timeConstants":236}],200:[function(require,module,exports){
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

},{"../helpers/isFinite":229,"./DateFromTime":186,"./Day":187,"./MonthFromTime":203,"./ToInteger":212,"./YearFromTime":222,"./floor":224,"./modulo":225,"get-intrinsic":241}],201:[function(require,module,exports){
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

},{"../helpers/isFinite":229,"../helpers/timeConstants":236,"./ToInteger":212}],202:[function(require,module,exports){
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

},{"../helpers/timeConstants":236,"./floor":224,"./modulo":225}],203:[function(require,module,exports){
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

},{"./DayWithinYear":189,"./InLeapYear":193}],204:[function(require,module,exports){
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

},{"../helpers/isNaN":231}],205:[function(require,module,exports){
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

},{"../helpers/timeConstants":236,"./floor":224,"./modulo":225}],206:[function(require,module,exports){
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

},{"./Type":220}],207:[function(require,module,exports){
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


},{"../helpers/isFinite":229,"./ToNumber":213,"./abs":223,"get-intrinsic":241}],208:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":236,"./DayFromYear":188}],209:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":236,"./modulo":225}],210:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],211:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":213}],212:[function(require,module,exports){
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

},{"../helpers/isFinite":229,"../helpers/isNaN":231,"../helpers/sign":235,"./ToNumber":213,"./abs":223,"./floor":224}],213:[function(require,module,exports){
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

},{"./ToPrimitive":215}],214:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":185,"get-intrinsic":241}],215:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":237}],216:[function(require,module,exports){
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

},{"./IsCallable":195,"./ToBoolean":210,"./Type":220,"get-intrinsic":241,"has":245}],217:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":241}],218:[function(require,module,exports){
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

},{"../helpers/isFinite":229,"../helpers/isNaN":231,"../helpers/sign":235,"./ToNumber":213,"./abs":223,"./floor":224,"./modulo":225}],219:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":213}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":187,"./modulo":225}],222:[function(require,module,exports){
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

},{"call-bind/callBound":176,"get-intrinsic":241}],223:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":241}],224:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],225:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":234}],226:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":236,"./modulo":225}],227:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":183,"./5/AbstractRelationalComparison":184,"./5/CheckObjectCoercible":185,"./5/DateFromTime":186,"./5/Day":187,"./5/DayFromYear":188,"./5/DayWithinYear":189,"./5/DaysInYear":190,"./5/FromPropertyDescriptor":191,"./5/HourFromTime":192,"./5/InLeapYear":193,"./5/IsAccessorDescriptor":194,"./5/IsCallable":195,"./5/IsDataDescriptor":196,"./5/IsGenericDescriptor":197,"./5/IsPropertyDescriptor":198,"./5/MakeDate":199,"./5/MakeDay":200,"./5/MakeTime":201,"./5/MinFromTime":202,"./5/MonthFromTime":203,"./5/SameValue":204,"./5/SecFromTime":205,"./5/StrictEqualityComparison":206,"./5/TimeClip":207,"./5/TimeFromYear":208,"./5/TimeWithinDay":209,"./5/ToBoolean":210,"./5/ToInt32":211,"./5/ToInteger":212,"./5/ToNumber":213,"./5/ToObject":214,"./5/ToPrimitive":215,"./5/ToPropertyDescriptor":216,"./5/ToString":217,"./5/ToUint16":218,"./5/ToUint32":219,"./5/Type":220,"./5/WeekDay":221,"./5/YearFromTime":222,"./5/abs":223,"./5/floor":224,"./5/modulo":225,"./5/msFromTime":226}],228:[function(require,module,exports){
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

},{"./isMatchRecord":230,"get-intrinsic":241,"has":245}],229:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],230:[function(require,module,exports){
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

},{"has":245}],231:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],232:[function(require,module,exports){
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

},{"call-bind/callBound":176}],233:[function(require,module,exports){
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

},{"get-intrinsic":241,"has":245}],234:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],235:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){
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

},{"./helpers/isPrimitive":238,"is-callable":248}],238:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],239:[function(require,module,exports){
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

},{}],240:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":239}],241:[function(require,module,exports){
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

},{"function-bind":240,"has":245,"has-symbols":243}],242:[function(require,module,exports){
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

},{"get-intrinsic":241}],243:[function(require,module,exports){
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

},{"./shams":244}],244:[function(require,module,exports){
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

},{}],245:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":240}],246:[function(require,module,exports){
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

},{}],247:[function(require,module,exports){
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

},{}],248:[function(require,module,exports){
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

},{}],249:[function(require,module,exports){
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

},{"./isArguments":251}],250:[function(require,module,exports){
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

},{"./implementation":249,"./isArguments":251}],251:[function(require,module,exports){
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

},{}],252:[function(require,module,exports){
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

},{}],253:[function(require,module,exports){
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
},{"_process":252,"through":266,"timers":267}],254:[function(require,module,exports){
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

},{"buffer":158}],255:[function(require,module,exports){
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

},{"es-abstract/es5":227,"function-bind":240}],256:[function(require,module,exports){
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

},{"./implementation":255,"./polyfill":257,"./shim":258,"define-properties":181,"function-bind":240}],257:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":255}],258:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":257,"define-properties":181}],259:[function(require,module,exports){
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
},{"safe-buffer":254}],260:[function(require,module,exports){
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
},{"./lib/default_stream":261,"./lib/results":263,"./lib/test":264,"_process":252,"defined":182,"through":266,"timers":267}],261:[function(require,module,exports){
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
},{"_process":252,"fs":157,"through":266}],262:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":252,"timers":267}],263:[function(require,module,exports){
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
},{"_process":252,"events":159,"function-bind":240,"has":245,"inherits":247,"object-inspect":265,"resumer":253,"through":266,"timers":267}],264:[function(require,module,exports){
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
},{"./next_tick":262,"deep-equal":178,"defined":182,"events":159,"has":245,"inherits":247,"path":160,"string.prototype.trim":256}],265:[function(require,module,exports){
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

},{}],266:[function(require,module,exports){
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
},{"_process":252,"stream":161}],267:[function(require,module,exports){
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
},{"process/browser.js":252,"timers":267}],268:[function(require,module,exports){
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
