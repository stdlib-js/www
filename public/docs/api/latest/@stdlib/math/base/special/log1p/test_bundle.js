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
* Generate a linearly spaced numeric array according to a provided increment.
*
* @module @stdlib/array/base/incrspace
*
* @example
* var incrspace = require( '@stdlib/array/base/incrspace' );
*
* var arr = incrspace( 0, 11, 2 );
* // returns [ 0, 2, 4, 6, 8, 10 ]
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

// MODULES //

var ceil = require( '@stdlib/math/base/special/ceil' );


// MAIN //

/**
* Generates a linearly spaced numeric array according to a provided increment.
*
* @param {number} x1 - first array value
* @param {number} x2 - array element bound
* @param {number} increment - increment
* @returns {Array} linearly spaced numeric array
*
* @example
* var arr = incrspace( 0, 11, 2 );
* // returns [ 0, 2, 4, 6, 8, 10 ]
*/
function incrspace( x1, x2, increment ) {
	var arr;
	var len;
	var i;

	len = ceil( ( x2-x1 ) / increment );
	if ( len <= 1 ) {
		return [ x1 ];
	}
	arr = [ x1 ];
	for ( i = 1; i < len; i++ ) {
		arr.push( x1 + (increment*i) );
	}
	return arr;
}


// EXPORTS //

module.exports = incrspace;

},{"@stdlib/math/base/special/ceil":77}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":4,"./polyfill.js":5,"@stdlib/assert/has-float64array-support":16}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":7,"./polyfill.js":8,"@stdlib/assert/has-uint16array-support":24}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":10,"./polyfill.js":11,"@stdlib/assert/has-uint32array-support":27}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":13,"./polyfill.js":14,"@stdlib/assert/has-uint8array-support":30}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

},{"./float64array.js":15,"@stdlib/assert/is-float64array":45}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/has-symbol-support":20}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":26,"@stdlib/assert/is-uint16array":54,"@stdlib/constants/uint16/max":68}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":29,"@stdlib/assert/is-uint32array":56,"@stdlib/constants/uint32/max":69}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":31}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint8array.js":32,"@stdlib/assert/is-uint8array":58,"@stdlib/constants/uint8/max":70}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":146}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var Boolean = require( '@stdlib/boolean/ctor' );
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
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
var main = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( main, 'isPrimitive', isPrimitive );
setReadOnly( main, 'isObject', isObject );


// EXPORTS //

module.exports = main;

},{"./main.js":36,"./object.js":37,"./primitive.js":38,"@stdlib/utils/define-nonenumerable-read-only-property":128}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":37,"./primitive.js":38}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var Boolean = require( '@stdlib/boolean/ctor' );
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
* var Boolean = require( '@stdlib/boolean/ctor' );
*
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

},{"./try2serialize.js":40,"@stdlib/assert/has-tostringtag-support":22,"@stdlib/boolean/ctor":62,"@stdlib/utils/native-class":146}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
}


// EXPORTS //

module.exports = isBoolean;

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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":39}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":42}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-object-like":52}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":44}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":136,"@stdlib/utils/native-class":146}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":146}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/utils/type-of":157}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/uint16":6,"@stdlib/array/uint8":12}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":51}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":49}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var main = require( './main.js' );


// VARIABLES //

var isObjectLikeArray = arrayfun( main );


// MAIN //

setReadOnly( main, 'isObjectLikeArray', isObjectLikeArray );


// EXPORTS //

module.exports = main;

},{"./main.js":53,"@stdlib/assert/tools/array-function":60,"@stdlib/utils/define-nonenumerable-read-only-property":128}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":146}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":146}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":59}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":146}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var isArray = require( '@stdlib/assert/is-array' );
var format = require( '@stdlib/string/format' );


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
		throw new TypeError( format( 'invalid argument. Must provide a function. Value: `%s`.', predicate ) );
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

},{"@stdlib/assert/is-array":33,"@stdlib/string/format":121}],62:[function(require,module,exports){
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
* Boolean constructor.
*
* @module @stdlib/boolean/ctor
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var b = Boolean( null );
* // returns false
*
* b = Boolean( [] );
* // returns true
*
* b = Boolean( {} );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var b = new Boolean( false );
* // returns <Boolean>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":63}],63:[function(require,module,exports){
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

// MAIN //

/**
* Returns a boolean.
*
* @name Boolean
* @constructor
* @type {Function}
* @param {*} value - input value
* @returns {(boolean|Boolean)} boolean
*
* @example
* var b = Boolean( null );
* // returns false
*
* b = Boolean( [] );
* // returns true
*
* b = Boolean( {} );
* // returns true
*
* @example
* var b = new Boolean( false );
* // returns <Boolean>
*/
var Bool = Boolean; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Bool;

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

},{"@stdlib/number/ctor":98}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":66}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":76}],76:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyval_p.js":81,"./polyval_q.js":82,"@stdlib/constants/float64/exponent-bias":65,"@stdlib/constants/float64/ninf":66,"@stdlib/math/base/assert/is-nan":71,"@stdlib/number/float64/base/get-high-word":101,"@stdlib/number/float64/base/set-high-word":104}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{"./polyval_lp.js":85,"@stdlib/constants/float64/exponent-bias":65,"@stdlib/constants/float64/ninf":66,"@stdlib/constants/float64/pinf":67,"@stdlib/math/base/assert/is-nan":71,"@stdlib/number/float64/base/get-high-word":101,"@stdlib/number/float64/base/set-high-word":104}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
module.exports={"expected":[20.79441541772968,29.831166018770002,30.52425371918751,30.929698999795306,31.217371158349476,31.440508761277943,31.622826352461743,31.776974199700692,31.91050346787872,32.02828485118471,32.13364404496025,32.22895314322323,32.315963618927505,32.39600556397434,32.47011288244757,32.53910518741108,32.60364321284038,32.66426739726696,32.72142542231577,32.775492295720156,32.8267852770283,32.87557515793533,32.92209491605888,32.9665464435106,33.0091058424035,33.049927638639886,33.08914816876187,33.12688832727126,33.1632558140739,33.198346987369895,33.23224840229797,33.26503809719576,33.29678667558046,33.32755822158578,33.35741107870117,33.386398515599225,33.41456929814488,33.4419681830158,33.468636345481656,33.494611751607906,33.51992948332903,33.544622023376384,33.56871950586685,33.59224993740187,33.615239392745714,33.63771218851162,33.65969103775668,33.68119718794962,33.70225054441225,33.72286978103225,33.74307243979033,33.762875020431366,33.78229306142775,33.801341213230586,33.82003330467368,33.83838240328443,33.85640087016027,33.874100409988166,33.89149211671375,33.90858651530664,33.92539360001549,33.94192286946105,33.95818335887576,33.974183669763754,33.98993199722528,34.00543615516252,34.020703599561216,34.03574145002148,34.050556509693656,34.065155283758735,34.079543996579226,34.093728607633416,34.107714826335325,34.12150812583244,34.135113755864765,34.14853675476074,34.161781960638706,34.174854021876136,34.1877574069034,34.20049641337367,34.21307517675605,34.22549767839492,34.237767753074856,34.24988909612693,34.261865270109574,34.27369971109401,34.28539573458213,34.29695654108228,34.308385221366365,34.319684761429954,34.330858047175305,34.34190786883555,34.352836925157185,34.36364782735645,34.3743431028641,34.38492519887205,34.3953964856943,34.405759259953776,34.416015747605634,34.426168106807154,34.43621843064341,34.446168749717295,34.456021034611986,34.465777198233276,34.475439098038706,34.485008538160095,34.49448727142544,34.503877001285886,34.513179383653046,34.52239602865172,34.531528502292495,34.5405783280687,34.54954698848174,34.55843592649863,34.56724654694536,34.57598021783931,34.58463827166407,34.59322200658956,34.60173268764015,34.610171547813515,34.61853978915275,34.62683858377386,34.63506907485112,34.643232377562065,34.651329579994346,34.659361744016074,34.66732990611155,34.67523507818392,34.68307824832637,34.69086038156331,34.69858242056296,34.70624528632258,34.71384987882769,34.721397077686426,34.72888774274008,34.736322714650996,34.74370281546872,34.751028849175505,34.75830160221183,34.76552184398311,34.77269032734811,34.779807789090086,34.78687495037118,34.793892517170924,34.80086118070949,34.80778161785623,34.81465449152421,34.821480451051286,34.82826013256825,34.83499415935458,34.8416831421823,34.84832767964839,34.85492835849629,34.86148575392674,34.86800042989867,34.87447293942017,34.88090382483025,34.88729361807148,34.89364284095409,34.899952005411635,34.9062216137487,34.9124521588809,34.918644124567415,34.924797985636346,34.930914208203276,34.9369932498831,34.94303555999548,34.94904157976413,34.95501174251015,34.96094647383968,34.966846191825866,34.972711307185705,34.97854222345152,34.984339337137634,34.990103037902124,34.995833708704026,35.00153172595597,35.00719745967261,35.01283127361473,35.01843352542946,35.024004566786466,35.02954474351043,35.03505439570987,35.040533857902446,35.045983459136785,35.05140352311109,35.05679436828852,35.062156308009435,35.06748965060071,35.07279469948213,35.078071753269946,35.08332110587776,35.088543046614724,35.09373786028126,35.09890582726223,35.10404722361777,35.109162321171745,35.11425138759803,35.11931468650452,35.12435247751506,35.12936501634939,35.13435255490095,35.13931534131291,35.14425362005219,35.14916763198176,35.15405761443112,35.15892380126508,35.16376642295088,35.16858570662366,35.17338187615043,35.17815515219243,35.182905752266066,35.187633890802374,35.19233977920512,35.19702362590751,35.20168563642756,35.20632601342224,35.210944956740335,35.21554266347404,35.2201193280095,35.22467514207606,35.2292102947945,35.23372497272412,35.2382193599088,35.24269363792202,35.247147985910864,35.25158258063909,35.25599759652918,35.26039320570352,35.26476957802471,35.26912688113487,35.27346528049423,35.27778493941881,35.282086019117315,35.28636867872725,35.29063307535021,35.29487936408649,35.29910769806895,35.30331822849611,35.307511104664606,35.31168647400098,35.31584448209275,35.31998527271888,35.32410898787964,35.32821576782577,35.33230575108715,35.33637907450082,35.34043587323845,35.34447628083326,35.3485004292064,35.35250844869276,35.35650046806635,35.36047661456509,35.36443701391515,35.368381790354825,35.37231106665789,35.37622496415656,35.38012360276393,35.38400710099606,35.38787557599356,35.39172914354283,35.39556791809682,35.399392012795424,35.40320153948553,35.40699660874059,35.41077732987994,35.41454381098765,35.41829615893107,35.42203447937906,35.42575887681977,35.42946945457827,35.43316631483364,35.43684955863594,35.44051928592273,35.44417559553537,35.44781858523496,35.45144835171807,35.45506499063211,35.45866859659045,35.4622592631873,35.46583708301226,35.46940214766467,35.47295454776768,35.47649437298205,35.48002171201976,35.48353665265734,35.48703928174896,35.490529685239316,35.49400794817629,35.49747415472339,35.50092838817195,35.50437073095314,35.507801264649814,35.511220070008044,35.514627226948555,35.518022814577954,35.521406911199726,35.52477959432507,35.52814094068356,35.531491026233624,35.53482992617282,35.538157714947985,35.5414744662652,35.54478025309955,35.548075147704814,35.55135922162289,35.554632545693124,35.557895190061515,35.56114722418968,35.564388716863796,35.56761973620324,35.570840349669275,35.57405062407342,35.57725062558583,35.580440419743425,35.583620071457986,35.58678964502406,35.58994920412676,35.593098811849465,35.59623853068133,35.59936842252479,35.60248854870283,35.605598969966216,35.60869974650058,35.61179093793343,35.614872603341006,35.61794480125508,35.621007589669595,35.624061026047265,35.627105167326015,35.63014006992537,35.63316578975273,35.63618238220954,35.63918990219738,35.642188404123964,35.64517794190905,35.648158568990226,35.651130338328706,35.6540933024149,35.65704751327402,35.65999302247159,35.66292988111876,35.6658581398777,35.66877784896684,35.67168905816601,35.67459181682152,35.67748617385123,35.68037217774945,35.683249876591844,35.68611931804023,35.688980549347285,35.69183361736127,35.69467856853058,35.69751544890831,35.70034430415674,35.70316517955168,35.70597811998692,35.70878316997843,35.711580373668625,35.714369774830516,35.71715141687185,35.71992534283913,35.722691595421644,35.72545021695535,35.728201249426846,35.73094473447714,35.73368071340545,35.736409227172935,35.739130316406396,35.74184402140187,35.74455038212822,35.74724943823069,35.74994122903437,35.75262579354763,35.755303170465524,35.75797339817312,35.76063651474884,35.76329255796767,35.765941565304395,35.768583573936795,35.771218620748726,35.77384674233326,35.776467974995704,35.77908235475661,35.78168991735476,35.78429069825009,35.786884732626575,35.78947205539511,35.79205270119628,35.794626704403214,35.79719409912426,35.799754919205746,35.80230919823464,35.80485696954118,35.80739826620152,35.80993312104026,35.81246156663303,35.814983635308984,35.81749935915328,35.82000877000953,35.822511899482215,35.82500877893909,35.82749943951352,35.82998391210682,35.83246222739056,35.83493441580883,35.83740050758049,35.83986053270137,35.84231452094649,35.84476250187218,35.847204504818265,35.84964055891013,35.85207069306083,35.85449493597315,35.85691331614162,35.85932586185455,35.86173260119599,35.864133562047705,35.86652877209112,35.868918258809224,35.87130204948845,35.873680171220585,35.87605265090456,35.878419515248346,35.88078079077069,35.88313650380294,35.88548668049077,35.88783134679599,35.89017052849818,35.89250425119645,35.89483254031111,35.89715542108531,35.8994729185867,35.90178505770906,35.904091863173896,35.906393359532,35.90868957116506,35.910980522287204,35.9132662369465,35.91554673902649,35.91782205224771,35.92009220016912,35.92235720618962,35.924617093549465,35.92687188533169,35.92912160446357,35.931366273717956,35.9336059157147,35.93584055292202,35.938070207657844,35.94029490209114,35.94251465824324,35.94472949798918,35.946939443058945,35.94914451503878,35.95134473537245,35.95354012536248,35.955730706171394,35.95791649882297,35.9600975242034,35.96227380306253,35.96444535601501,35.9666122035415,35.968774365989816,35.970931863576055,35.97308471638575,35.975232944375,35.97737656737157,35.97951560507597,35.981650077062575,35.98378000278068,35.985905401555556,35.988026292589545,35.99014269496303,35.99225462763553,35.99436210944669,35.996465159117285,35.99856379525022,36.00065803633155,36.0027479007314,36.004833406704975,36.006914572393505,36.00899141582519,36.01106395491613,36.01313220747127,36.015196191185304,36.01725592364358,36.01931142232302,36.021362704592974,36.02340978771615,36.02545268884943,36.02749142504478,36.02952601325008,36.03155647030997,36.033582812966706,36.03560505786094,36.03762322153261,36.0396373204217,36.04164737086904,36.04365338911715],"x":[1.073741824e9,9.026321344286268e12,1.8051568946748535e13,2.7076816549210805e13,3.610206415167307e13,4.512731175413534e13,5.415255935659761e13,6.317780695905988e13,7.220305456152214e13,8.122830216398442e13,9.025354976644669e13,9.927879736890895e13,1.0830404497137122e14,1.1732929257383348e14,1.2635454017629577e14,1.3537978777875803e14,1.4440503538122028e14,1.5343028298368256e14,1.6245553058614484e14,1.714807781886071e14,1.8050602579106938e14,1.8953127339353162e14,1.985565209959939e14,2.075817685984562e14,2.1660701620091844e14,2.2563226380338072e14,2.3465751140584297e14,2.4368275900830525e14,2.5270800661076753e14,2.6173325421322978e14,2.7075850181569206e14,2.797837494181543e14,2.8880899702061656e14,2.978342446230789e14,3.068594922255411e14,3.158847398280034e14,3.249099874304657e14,3.3393523503292794e14,3.429604826353902e14,3.519857302378525e14,3.6101097784031475e14,3.70036225442777e14,3.7906147304523925e14,3.8808672064770156e14,3.971119682501638e14,4.0613721585262606e14,4.151624634550884e14,4.241877110575506e14,4.332129586600129e14,4.422382062624752e14,4.5126345386493744e14,4.602887014673997e14,4.6931394906986194e14,4.7833919667232425e14,4.873644442747865e14,4.9638969187724875e14,5.0541493947971106e14,5.144401870821733e14,5.2346543468463556e14,5.324906822870978e14,5.415159298895601e14,5.505411774920224e14,5.595664250944846e14,5.685916726969469e14,5.776169202994091e14,5.866421679018715e14,5.956674155043338e14,6.04692663106796e14,6.137179107092582e14,6.227431583117205e14,6.317684059141828e14,6.407936535166451e14,6.498189011191074e14,6.588441487215696e14,6.678693963240319e14,6.768946439264941e14,6.859198915289564e14,6.949451391314186e14,7.03970386733881e14,7.129956343363432e14,7.220208819388055e14,7.310461295412678e14,7.4007137714373e14,7.490966247461922e14,7.581218723486545e14,7.671471199511169e14,7.761723675535791e14,7.851976151560414e14,7.942228627585036e14,8.032481103609659e14,8.122733579634281e14,8.212986055658904e14,8.303238531683528e14,8.39349100770815e14,8.483743483732772e14,8.573995959757395e14,8.664248435782018e14,8.75450091180664e14,8.844753387831264e14,8.935005863855886e14,9.025258339880509e14,9.115510815905131e14,9.205763291929754e14,9.296015767954376e14,9.386268243978999e14,9.476520720003622e14,9.566773196028245e14,9.657025672052868e14,9.74727814807749e14,9.837530624102112e14,9.927783100126735e14,1.0018035576151358e15,1.0108288052175981e15,1.0198540528200604e15,1.0288793004225226e15,1.0379045480249849e15,1.0469297956274471e15,1.0559550432299094e15,1.0649802908323716e15,1.074005538434834e15,1.0830307860372962e15,1.0920560336397585e15,1.1010812812422208e15,1.110106528844683e15,1.1191317764471452e15,1.1281570240496075e15,1.1371822716520698e15,1.146207519254532e15,1.1552327668569942e15,1.1642580144594568e15,1.173283262061919e15,1.1823085096643812e15,1.1913337572668435e15,1.2003590048693058e15,1.209384252471768e15,1.2184095000742302e15,1.2274347476766925e15,1.2364599952791548e15,1.245485242881617e15,1.2545104904840792e15,1.2635357380865415e15,1.2725609856890038e15,1.2815862332914662e15,1.2906114808939285e15,1.2996367284963908e15,1.308661976098853e15,1.3176872237013152e15,1.3267124713037775e15,1.3357377189062398e15,1.344762966508702e15,1.3537882141111642e15,1.3628134617136265e15,1.3718387093160888e15,1.380863956918551e15,1.3898892045210132e15,1.3989144521234755e15,1.407939699725938e15,1.4169649473284002e15,1.4259901949308625e15,1.4350154425333248e15,1.444040690135787e15,1.4530659377382492e15,1.4620911853407115e15,1.4711164329431738e15,1.480141680545636e15,1.4891669281480982e15,1.4981921757505605e15,1.5072174233530228e15,1.516242670955485e15,1.5252679185579475e15,1.5342931661604098e15,1.543318413762872e15,1.5523436613653342e15,1.5613689089677965e15,1.5703941565702588e15,1.579419404172721e15,1.5884446517751832e15,1.5974698993776455e15,1.6064951469801078e15,1.61552039458257e15,1.6245456421850322e15,1.6335708897874945e15,1.6425961373899568e15,1.6516213849924192e15,1.6606466325948815e15,1.6696718801973438e15,1.678697127799806e15,1.6877223754022682e15,1.6967476230047305e15,1.7057728706071928e15,1.714798118209655e15,1.7238233658121172e15,1.7328486134145795e15,1.7418738610170418e15,1.750899108619504e15,1.7599243562219662e15,1.7689496038244288e15,1.777974851426891e15,1.7870000990293532e15,1.7960253466318155e15,1.8050505942342778e15,1.81407584183674e15,1.8231010894392022e15,1.8321263370416645e15,1.8411515846441268e15,1.850176832246589e15,1.8592020798490512e15,1.8682273274515135e15,1.8772525750539758e15,1.886277822656438e15,1.8953030702589005e15,1.9043283178613628e15,1.913353565463825e15,1.9223788130662872e15,1.9314040606687495e15,1.9404293082712118e15,1.949454555873674e15,1.9584798034761362e15,1.9675050510785985e15,1.9765302986810608e15,1.985555546283523e15,1.9945807938859852e15,2.0036060414884475e15,2.01263128909091e15,2.0216565366933722e15,2.0306817842958345e15,2.0397070318982968e15,2.048732279500759e15,2.0577575271032212e15,2.0667827747056835e15,2.0758080223081458e15,2.084833269910608e15,2.0938585175130702e15,2.1028837651155325e15,2.1119090127179948e15,2.120934260320457e15,2.1299595079229192e15,2.1389847555253818e15,2.148010003127844e15,2.1570352507303062e15,2.1660604983327685e15,2.1750857459352308e15,2.184110993537693e15,2.1931362411401552e15,2.2021614887426175e15,2.2111867363450798e15,2.220211983947542e15,2.2292372315500042e15,2.2382624791524665e15,2.2472877267549288e15,2.256312974357391e15,2.2653382219598535e15,2.2743634695623155e15,2.283388717164778e15,2.29241396476724e15,2.3014392123697025e15,2.3104644599721645e15,2.319489707574627e15,2.3285149551770895e15,2.3375402027795515e15,2.346565450382014e15,2.355590697984476e15,2.3646159455869385e15,2.3736411931894005e15,2.382666440791863e15,2.391691688394325e15,2.4007169359967875e15,2.4097421835992495e15,2.418767431201712e15,2.427792678804174e15,2.4368179264066365e15,2.445843174009099e15,2.454868421611561e15,2.4638936692140235e15,2.4729189168164855e15,2.481944164418948e15,2.49096941202141e15,2.4999946596238725e15,2.5090199072263345e15,2.518045154828797e15,2.527070402431259e15,2.5360956500337215e15,2.5451208976361835e15,2.554146145238646e15,2.5631713928411085e15,2.5721966404435705e15,2.581221888046033e15,2.590247135648495e15,2.5992723832509575e15,2.6082976308534195e15,2.617322878455882e15,2.626348126058344e15,2.6353733736608065e15,2.6443986212632685e15,2.653423868865731e15,2.662449116468193e15,2.6714743640706555e15,2.680499611673118e15,2.68952485927558e15,2.6985501068780425e15,2.7075753544805045e15,2.716600602082967e15,2.725625849685429e15,2.7346510972878915e15,2.7436763448903535e15,2.752701592492816e15,2.761726840095278e15,2.7707520876977405e15,2.7797773353002025e15,2.788802582902665e15,2.797827830505127e15,2.8068530781075895e15,2.815878325710052e15,2.824903573312514e15,2.8339288209149765e15,2.8429540685174385e15,2.851979316119901e15,2.861004563722363e15,2.8700298113248255e15,2.8790550589272875e15,2.88808030652975e15,2.897105554132212e15,2.9061308017346745e15,2.9151560493371365e15,2.924181296939599e15,2.9332065445420615e15,2.9422317921445235e15,2.951257039746986e15,2.960282287349448e15,2.9693075349519105e15,2.9783327825543725e15,2.987358030156835e15,2.996383277759297e15,3.0054085253617595e15,3.0144337729642215e15,3.023459020566684e15,3.032484268169146e15,3.0415095157716085e15,3.050534763374071e15,3.059560010976533e15,3.0685852585789955e15,3.0776105061814575e15,3.08663575378392e15,3.095661001386382e15,3.1046862489888445e15,3.1137114965913065e15,3.122736744193769e15,3.131761991796231e15,3.1407872393986935e15,3.1498124870011555e15,3.158837734603618e15,3.1678629822060805e15,3.1768882298085425e15,3.185913477411005e15,3.194938725013467e15,3.2039639726159295e15,3.2129892202183915e15,3.222014467820854e15,3.231039715423316e15,3.2400649630257785e15,3.2490902106282405e15,3.258115458230703e15,3.267140705833165e15,3.2761659534356275e15,3.2851912010380895e15,3.294216448640552e15,3.3032416962430145e15,3.3122669438454765e15,3.321292191447939e15,3.330317439050401e15,3.3393426866528635e15,3.3483679342553255e15,3.357393181857788e15,3.36641842946025e15,3.3754436770627125e15,3.3844689246651745e15,3.393494172267637e15,3.402519419870099e15,3.4115446674725615e15,3.420569915075024e15,3.429595162677486e15,3.4386204102799485e15,3.4476456578824105e15,3.456670905484873e15,3.465696153087335e15,3.4747214006897975e15,3.4837466482922595e15,3.492771895894722e15,3.501797143497184e15,3.5108223910996465e15,3.5198476387021085e15,3.528872886304571e15,3.5378981339070335e15,3.5469233815094955e15,3.555948629111958e15,3.56497387671442e15,3.5739991243168825e15,3.5830243719193445e15,3.592049619521807e15,3.601074867124269e15,3.6101001147267315e15,3.6191253623291935e15,3.628150609931656e15,3.637175857534118e15,3.6462011051365805e15,3.655226352739043e15,3.664251600341505e15,3.6732768479439675e15,3.6823020955464295e15,3.691327343148892e15,3.700352590751354e15,3.7093778383538165e15,3.7184030859562785e15,3.727428333558741e15,3.736453581161203e15,3.7454788287636655e15,3.7545040763661275e15,3.76352932396859e15,3.772554571571052e15,3.7815798191735145e15,3.790605066775977e15,3.799630314378439e15,3.8086555619809015e15,3.8176808095833635e15,3.826706057185826e15,3.835731304788288e15,3.8447565523907505e15,3.8537817999932125e15,3.862807047595675e15,3.871832295198137e15,3.8808575428005995e15,3.8898827904030615e15,3.898908038005524e15,3.9079332856079865e15,3.9169585332104485e15,3.925983780812911e15,3.935009028415373e15,3.9440342760178355e15,3.9530595236202975e15,3.96208477122276e15,3.971110018825222e15,3.9801352664276845e15,3.9891605140301465e15,3.998185761632609e15,4.007211009235071e15,4.0162362568375335e15,4.025261504439996e15,4.034286752042458e15,4.0433119996449205e15,4.0523372472473825e15,4.061362494849845e15,4.070387742452307e15,4.0794129900547695e15,4.0884382376572315e15,4.097463485259694e15,4.106488732862156e15,4.1155139804646185e15,4.1245392280670805e15,4.133564475669543e15,4.1425897232720055e15,4.1516149708744675e15,4.16064021847693e15,4.169665466079392e15,4.1786907136818545e15,4.1877159612843165e15,4.196741208886779e15,4.205766456489241e15,4.2147917040917035e15,4.2238169516941655e15,4.232842199296628e15,4.24186744689909e15,4.2508926945015525e15,4.2599179421040145e15,4.268943189706477e15,4.2779684373089395e15,4.2869936849114015e15,4.296018932513864e15,4.305044180116326e15,4.3140694277187885e15,4.3230946753212505e15,4.332119922923713e15,4.341145170526175e15,4.3501704181286375e15,4.3591956657310995e15,4.368220913333562e15,4.377246160936024e15,4.3862714085384865e15,4.395296656140949e15,4.404321903743411e15,4.4133471513458735e15,4.4223723989483355e15,4.431397646550798e15,4.44042289415326e15,4.4494481417557225e15,4.4584733893581845e15,4.467498636960647e15,4.476523884563109e15,4.4855491321655715e15,4.4945743797680335e15,4.503599627370496e15]}

},{}],87:[function(require,module,exports){
module.exports={"expected":[460.51701859880916,684.5629218024621,685.2560689830221,685.6615340911303,685.949216163582,686.1723597148963,686.3546812716902,686.5088319515175,686.642363344142,686.7601463797984,686.8655068954562,686.9608170752606,687.0478284522502,687.1278711599238,687.2019791320774,687.2709720035645,687.3355105247019,687.3961351465184,687.4532935603584,687.5073607816287,687.5586540760162,687.6074442401856,687.6539642558205,687.6984160183913,687.7409756328101,687.7817976273304,687.8210183404836,687.8587586684665,687.8951263126374,687.9302176324487,687.9641191841243,687.9969090069474,688.0286577052619,688.0594293639286,688.0892823270783,688.1182698639516,688.1464407409183,688.1738397151064,688.2005079621886,688.2264834485918,688.2518012565761,688.2764938691665,688.3005914207456,688.3241219181557,688.3471114363805,688.3695842922325,688.3915631989513,688.4130694041722,688.4341228133701,688.4547421005728,688.4749448078903,688.4947474351865,688.5141655210437,688.5332137160143,688.5519058490264,688.5702549876946,688.5882734931973,688.6059730702967,688.6233648130086,688.6404592463679,688.6572663646842,688.6737956666354,688.6900561875073,688.7060565288538,688.7218048858218,688.7373090723578,688.7525765444886,688.7676144218532,688.7824295076383,688.7970283070595,688.8114170445116,688.8256016795035,688.8395879214783,688.8533812436106,688.8669868956664,688.8804099159985,688.8936551427486,688.9067272243159,688.9196306291518,688.9323696549292,688.9449484371361,688.9573709571346,688.9696410497264,688.9817624102587,688.9937386013055,689.0055730589525,689.0172690987157,689.0288299211168,689.0402586169404,689.0515581721943,689.0627314727925,689.073781308979,689.0847103795112,689.0955212956154,689.1062165847322,689.1167986940627,689.12726999393,689.1376327809655,689.1478892811327,689.1580416525968,689.1680919884503,689.1780423193035,689.1878946157465,689.1976507906918,689.2073127016035,689.2168821526197,689.2263608965743,689.2357506369241,689.2450530295864,689.2542696846913,689.2634021682546,689.2724520037746,689.2814206737572,689.2903096211745,689.2991202508567,689.3078539308254,689.3165119935685,689.32509573726,689.3336064269279,689.3420452955737,689.3504135452442,689.3587123480589,689.3669428471954,689.3751061578346,689.3832033680673,689.3912355397645,689.3992037094137,689.4071088889208,689.4149520663818,689.4227342068239,689.4304562529178,689.4381191256633,689.4457237250485,689.453270930684,689.4607616024131,689.4681965809007,689.4755766881982,689.4829027282904,689.4901754876194,689.4973957355929,689.5045642250715,689.5116816928404,689.5187488600634,689.5257664327221,689.5327351020381,689.5396555448827,689.5465284241706,689.5533543892409,689.5601340762263,689.5668681084077,689.5735570965585,689.5802016392771,689.5868023233085,689.5933597238546,689.5998744048758,689.6063469193814,689.6127778097117,689.6191676078105,689.6255168354892,689.6318260046825,689.638095617696,689.6443261674466,689.6505181376946,689.6566720032689,689.6627882302864,689.6688672763628,689.6749095908187,689.6809156148789,689.6868857818655,689.6928205173853,689.6987202395125,689.7045853589649,689.7104162792756,689.7162133969599,689.7219771016768,689.7277077763857,689.7334057975004,689.739071535036,689.7447053527543,689.7503076083029,689.7558786533524,689.761418833728,689.7669284895389,689.7724079553036,689.7778575600712,689.7832776275405,689.7886684761754,689.7940304193168,689.7993637652921,689.8046688175218,689.8099458746227,689.8151952305088,689.82041717449,689.825611991367,689.8307799615255,689.835921361026,689.8410364616927,689.8461255312002,689.8511888331567,689.8562266271866,689.8612391690102,689.8662267105212,689.8711894998634,689.876127781504,689.8810417963064,689.8859317816006,689.8907979712518,689.8956405957275,689.9004598821635,689.905256054427,689.9100293331796,689.9147799359382,689.9195080771342,689.9242139681716,689.9288978174841,689.9335598305898,689.9382002101463,689.9428191560027,689.9474168652513,689.9519935322787,689.9565493488145,689.9610845039799,689.9655991843345,689.9700935739223,689.9745678543172,689.9790222046666,689.9834568017345,689.9878718199436,689.9922674314166,689.9966438060164,690.0010011113853,690.0053395129839,690.0096591741285,690.0139602560279,690.0182429178199,690.0225073166064,690.0267536074878,690.0309819435973,690.0351924761337,690.0393853543937,690.0435607258041,690.0477187359528,690.0518595286188,690.0559832458027,690.0600900277553,690.0641800130069,690.0682533383946,690.0723101390902,690.0763505486271,690.0803746989269,690.0843827203245,690.088374741594,690.0923508899737,690.0963112911897,690.1002560694807,690.1041853476206,690.1080992469417,690.1119978873575,690.1158813873838,690.1197498641617,690.1236034334777,690.1274422097849,690.1312663062233,690.1350758346399,690.1388709056085,690.1426516284484,690.1464181112439,690.1501704608625,690.1539087829731,690.157633182064,690.1613437614606,690.1650406233418,690.1687238687582,690.1723935976471,690.1760499088502,690.1796929001288,690.1833226681794,690.1869393086495,690.1905429161528,690.1941335842836,690.1977114056315,690.201276471796,690.2048288734003,690.2083687001054,690.2118960406234,690.2154109827309,690.218913613282,690.2224040182218,690.2258822825981,690.2293484905746,690.2328027254428,690.2362450696337,690.2396756047305,690.2430944114792,690.2465015698009,690.249897158802,690.2532812567863,690.2566539412649,690.2600152889676,690.2633653758529,690.2667042771184,690.2700320672111,690.2733488198371,690.2766546079715,690.2799495038684,690.2832335790696,690.2865069044145,690.2897695500494,690.2930215854358,690.29626307936,690.2994940999414,690.3027147146414,690.3059249902717,690.3091249930023,690.3123147883705,690.3154944412878,690.3186640160491,690.3218235763395,690.3249731852424,690.328112905247,690.331242798256,690.3343629255922,690.3374733480066,690.3405741256848,690.3436653182545,690.3467469847919,690.3498191838289,690.3528819733594,690.3559354108463,690.3589795532275,690.3620144569227,690.3650401778392,690.3680567713786,690.3710642924426,690.3740627954389,690.3770523342872,690.3800329624254,690.3830047328146,690.3859676979453,690.3889219098427,690.3918674200723,690.3948042797457,690.3977325395248,690.4006522496281,690.4035634598356,690.4064662194935,690.4093605775199,690.412246582409,690.4151242822367,690.4179937246646,690.4208549569456,690.423708025928,690.4265529780603,690.4293898593954,690.4322187155959,690.4350395919377,690.4378525333142,690.4406575842419,690.4434547888629,690.4462441909504,690.4490258339123,690.4517997607951,690.4545660142879,690.4573246367271,690.460075670099,690.4628191560447,690.4655551358635,690.4682836505168,690.4710047406311,690.4737184465027,690.4764248081004,690.4791238650696,690.4818156567353,690.484500222106,690.4871775998768,690.4898478284326,690.4925109458521,690.4951669899102,690.4978159980818,690.5004580075446,690.5030930551826,690.5057211775888,690.5083424110687,690.5109567916428,690.5135643550499,690.5161651367499,690.5187591719271,690.5213464954919,690.5239271420854,690.5265011460806,690.5290685415858,690.5316293624476,690.5341836422526,690.5367314143315,690.5392727117601,690.5418075673633,690.5443360137167,690.5468580831493,690.5493738077466,690.551883219352,690.5543863495702,690.5568832297688,690.5593738910812,690.5618583644089,690.5643366804234,690.5668088695687,690.5692749620639,690.5717349879047,690.5741889768664,690.576636958505,690.5790789621606,690.5815150169584,690.5839451518117,690.5863693954233,690.5887877762875,690.5912003226929,690.5936070627234,690.596008024261,690.5984032349869,690.6007927223843,690.6031765137396,690.6055546361446,690.6079271164982,690.6102939815084,690.6126552576942,690.6150109713866,690.6173611487316,690.6197058156908,690.622044998044,690.6243787213903,690.6267070111498,690.6290298925659,690.6313473907063,690.6336595304647,690.6359663365625,690.6382678335509,690.6405640458112,690.6428549975578,690.6451407128386,690.6474212155374,690.6496965293745,690.6519666779091,690.6542316845399,690.6564915725073,690.6587463648945,690.6609960846284,690.6632407544822,690.6654803970757,690.6677150348771,690.6699446902045,690.6721693852265,690.6743891419649,690.6766039822944,690.6788139279453,690.6810190005035,690.6832192214131,690.6854146119766,690.6876051933564,690.6897909865763,690.6919720125227,690.6941482919453,690.6963198454588,690.6984866935439,690.7006488565485,690.7028063546884,690.7049592080496,690.7071074365879,690.7092510601311,690.7113900983799,690.7135245709085,690.7156544971663,690.7177798964786,690.7199007880478,690.7220171909541,690.7241291241572,690.7262366064969,690.7283396566936,690.7304382933505,690.7325325349536,690.734622399873,690.7367079063641,690.7387890725679,690.7408659165128,690.7429384561148,690.7450067091788,690.7470706933997,690.7491304263626,690.7511859255447,690.7532372083153,690.7552842919371,690.7573271935669,690.7593659302568,690.7614005189545,690.7634309765049,690.7654573196501,690.7674795650308,690.7694977291872,690.7715118285588,690.7735218794868,690.7755278982137],"x":[1.0e200,2.0040080160320642e297,4.0080160320641283e297,6.012024048096192e297,8.016032064128257e297,1.0020040080160321e298,1.2024048096192385e298,1.4028056112224448e298,1.6032064128256513e298,1.8036072144288579e298,2.0040080160320642e298,2.2044088176352705e298,2.404809619238477e298,2.6052104208416835e298,2.8056112224448896e298,3.006012024048096e298,3.2064128256513026e298,3.406813627254509e298,3.6072144288577157e298,3.807615230460922e298,4.0080160320641283e298,4.208416833667335e298,4.408817635270541e298,4.609218436873747e298,4.809619238476954e298,5.0100200400801605e298,5.210420841683367e298,5.410821643286574e298,5.611222444889779e298,5.811623246492986e298,6.012024048096192e298,6.212424849699399e298,6.412825651302605e298,6.613226452905812e298,6.813627254509018e298,7.014028056112225e298,7.214428857715431e298,7.414829659318637e298,7.615230460921844e298,7.81563126252505e298,8.016032064128257e298,8.216432865731463e298,8.41683366733467e298,8.617234468937877e298,8.817635270541082e298,9.01803607214429e298,9.218436873747495e298,9.418837675350703e298,9.619238476953908e298,9.819639278557114e298,1.0020040080160321e299,1.0220440881763528e299,1.0420841683366734e299,1.062124248496994e299,1.0821643286573147e299,1.1022044088176354e299,1.1222444889779558e299,1.1422845691382767e299,1.1623246492985971e299,1.182364729458918e299,1.2024048096192384e299,1.2224448897795593e299,1.2424849699398798e299,1.2625250501002006e299,1.282565130260521e299,1.3026052104208417e299,1.3226452905811624e299,1.342685370741483e299,1.3627254509018037e299,1.3827655310621243e299,1.402805611222445e299,1.4228456913827656e299,1.4428857715430863e299,1.462925851703407e299,1.4829659318637274e299,1.5030060120240482e299,1.5230460921843687e299,1.5430861723446895e299,1.56312625250501e299,1.5831663326653309e299,1.6032064128256513e299,1.623246492985972e299,1.6432865731462926e299,1.6633266533066133e299,1.683366733466934e299,1.7034068136272546e299,1.7234468937875754e299,1.743486973947896e299,1.7635270541082164e299,1.783567134268537e299,1.803607214428858e299,1.8236472945891785e299,1.843687374749499e299,1.8637274549098194e299,1.8837675350701407e299,1.903807615230461e299,1.9238476953907816e299,1.943887775551102e299,1.963927855711423e299,1.9839679358717437e299,2.0040080160320642e299,2.0240480961923847e299,2.0440881763527055e299,2.0641282565130263e299,2.0841683366733468e299,2.1042084168336673e299,2.124248496993988e299,2.1442885771543086e299,2.1643286573146294e299,2.18436873747495e299,2.2044088176352707e299,2.2244488977955912e299,2.2444889779559117e299,2.264529058116233e299,2.2845691382765533e299,2.3046092184368738e299,2.3246492985971943e299,2.3446893787575155e299,2.364729458917836e299,2.3847695390781564e299,2.404809619238477e299,2.4248496993987977e299,2.4448897795591186e299,2.464929859719439e299,2.4849699398797595e299,2.5050100200400803e299,2.525050100200401e299,2.5450901803607216e299,2.565130260521042e299,2.585170340681363e299,2.6052104208416834e299,2.6252505010020043e299,2.6452905811623247e299,2.6653306613226456e299,2.685370741482966e299,2.705410821643287e299,2.7254509018036073e299,2.745490981963928e299,2.7655310621242486e299,2.785571142284569e299,2.80561122244489e299,2.8256513026052108e299,2.8456913827655313e299,2.8657314629258517e299,2.8857715430861726e299,2.9058116232464934e299,2.925851703406814e299,2.9458917835671343e299,2.9659318637274548e299,2.985971943887776e299,3.0060120240480965e299,3.026052104208417e299,3.0460921843687374e299,3.0661322645290583e299,3.086172344689379e299,3.1062124248496996e299,3.12625250501002e299,3.146292585170341e299,3.1663326653306617e299,3.186372745490982e299,3.2064128256513026e299,3.2264529058116235e299,3.246492985971944e299,3.2665330661322648e299,3.2865731462925853e299,3.306613226452906e299,3.3266533066132266e299,3.3466933867735474e299,3.366733466933868e299,3.386773547094188e299,3.406813627254509e299,3.42685370741483e299,3.446893787575151e299,3.466933867735471e299,3.486973947895792e299,3.5070140280561126e299,3.527054108216433e299,3.5470941883767536e299,3.567134268537074e299,3.587174348697395e299,3.607214428857716e299,3.627254509018036e299,3.647294589178357e299,3.667334669338678e299,3.687374749498998e299,3.707414829659319e299,3.727454909819639e299,3.7474949899799605e299,3.767535070140281e299,3.7875751503006014e299,3.807615230460922e299,3.827655310621242e299,3.847695390781563e299,3.867735470941884e299,3.887775551102204e299,3.907815631262526e299,3.927855711422846e299,3.9478957915831666e299,3.9679358717434875e299,3.9879759519038076e299,4.0080160320641284e299,4.0280561122244485e299,4.048096192384769e299,4.068136272545091e299,4.088176352705411e299,4.108216432865732e299,4.128256513026053e299,4.148296593186373e299,4.1683366733466936e299,4.188376753507014e299,4.2084168336673346e299,4.228456913827656e299,4.248496993987976e299,4.268537074148297e299,4.288577154308617e299,4.308617234468938e299,4.328657314629259e299,4.348697394789579e299,4.3687374749499e299,4.3887775551102206e299,4.4088176352705415e299,4.428857715430862e299,4.4488977955911824e299,4.468937875751503e299,4.488977955911823e299,4.509018036072144e299,4.529058116232466e299,4.549098196392786e299,4.569138276553107e299,4.5891783567134275e299,4.6092184368737476e299,4.6292585170340685e299,4.6492985971943886e299,4.6693386773547094e299,4.689378757515031e299,4.709418837675351e299,4.729458917835672e299,4.749498997995992e299,4.769539078156313e299,4.789579158316634e299,4.809619238476954e299,4.8296593186372746e299,4.8496993987975955e299,4.869739478957916e299,4.889779559118237e299,4.909819639278557e299,4.929859719438878e299,4.949899799599199e299,4.969939879759519e299,4.98997995991984e299,5.010020040080161e299,5.0300601202404815e299,5.050100200400802e299,5.0701402805611225e299,5.090180360721443e299,5.1102204408817634e299,5.130260521042084e299,5.150300601202405e299,5.170340681362726e299,5.190380761523047e299,5.210420841683367e299,5.230460921843688e299,5.2505010020040085e299,5.2705410821643286e299,5.2905811623246495e299,5.3106212424849695e299,5.330661322645291e299,5.350701402805612e299,5.370741482965932e299,5.390781563126253e299,5.410821643286574e299,5.430861723446894e299,5.450901803607215e299,5.470941883767535e299,5.490981963927856e299,5.511022044088177e299,5.531062124248497e299,5.551102204408818e299,5.571142284569138e299,5.591182364729459e299,5.61122244488978e299,5.6312625250501e299,5.6513026052104216e299,5.671342685370742e299,5.6913827655310625e299,5.711422845691383e299,5.7314629258517035e299,5.751503006012024e299,5.771543086172345e299,5.791583166332665e299,5.811623246492987e299,5.831663326653307e299,5.851703406813628e299,5.8717434869739486e299,5.891783567134269e299,5.9118236472945895e299,5.9318637274549096e299,5.9519038076152305e299,5.971943887775552e299,5.991983967935872e299,6.012024048096193e299,6.032064128256513e299,6.052104208416834e299,6.072144288577155e299,6.092184368737475e299,6.112224448897796e299,6.1322645290581165e299,6.152304609218437e299,6.172344689378758e299,6.192384769539078e299,6.212424849699399e299,6.23246492985972e299,6.25250501002004e299,6.272545090180361e299,6.292585170340682e299,6.3126252505010026e299,6.3326653306613234e299,6.3527054108216435e299,6.372745490981964e299,6.3927855711422844e299,6.412825651302605e299,6.432865731462926e299,6.452905811623247e299,6.472945891783568e299,6.492985971943888e299,6.513026052104209e299,6.5330661322645296e299,6.55310621242485e299,6.5731462925851705e299,6.5931863727454906e299,6.613226452905812e299,6.633266533066133e299,6.653306613226453e299,6.673346693386774e299,6.693386773547095e299,6.713426853707416e299,6.733466933867736e299,6.753507014028056e299,6.773547094188377e299,6.793587174348698e299,6.813627254509018e299,6.833667334669339e299,6.85370741482966e299,6.873747494989981e299,6.893787575150302e299,6.913827655310623e299,6.933867735470942e299,6.953907815631263e299,6.973947895791584e299,6.993987975951904e299,7.014028056112225e299,7.034068136272545e299,7.054108216432865e299,7.074148296593186e299,7.094188376753507e299,7.114228456913828e299,7.134268537074147e299,7.15430861723447e299,7.17434869739479e299,7.194388777555111e299,7.214428857715432e299,7.234468937875752e299,7.254509018036072e299,7.274549098196393e299,7.294589178356714e299,7.314629258517035e299,7.334669338677356e299,7.354709418837675e299,7.374749498997996e299,7.394789579158317e299,7.414829659318638e299,7.434869739478958e299,7.454909819639278e299,7.4749498997996e299,7.494989979959921e299,7.515030060120242e299,7.535070140280563e299,7.555110220440882e299,7.575150300601203e299,7.595190380761524e299,7.615230460921844e299,7.635270541082165e299,7.655310621242485e299,7.675350701402806e299,7.695390781563126e299,7.715430861723447e299,7.735470941883768e299,7.755511022044087e299,7.775551102204408e299,7.79559118236473e299,7.815631262525051e299,7.835671342685372e299,7.855711422845692e299,7.875751503006012e299,7.895791583166333e299,7.915831663326654e299,7.935871743486975e299,7.955911823647294e299,7.975951903807615e299,7.995991983967936e299,8.016032064128257e299,8.036072144288578e299,8.056112224448897e299,8.076152304609218e299,8.096192384769539e299,8.116232464929861e299,8.136272545090182e299,8.156312625250503e299,8.176352705410822e299,8.196392785571143e299,8.216432865731464e299,8.236472945891785e299,8.256513026052105e299,8.276553106212425e299,8.296593186372746e299,8.316633266533066e299,8.336673346693387e299,8.356713426853708e299,8.376753507014027e299,8.396793587174348e299,8.416833667334669e299,8.436873747494991e299,8.456913827655312e299,8.476953907815632e299,8.496993987975952e299,8.517034068136273e299,8.537074148296594e299,8.557114228456915e299,8.577154308617234e299,8.597194388777555e299,8.617234468937876e299,8.637274549098197e299,8.657314629258518e299,8.677354709418837e299,8.697394789579158e299,8.717434869739479e299,8.7374749498998e299,8.757515030060122e299,8.777555110220441e299,8.797595190380762e299,8.817635270541083e299,8.837675350701404e299,8.857715430861725e299,8.877755511022044e299,8.897795591182365e299,8.917835671342686e299,8.937875751503006e299,8.957915831663327e299,8.977955911823647e299,8.997995991983967e299,9.018036072144288e299,9.038076152304609e299,9.058116232464932e299,9.078156312625252e299,9.098196392785572e299,9.118236472945893e299,9.138276553106213e299,9.158316633266534e299,9.178356713426855e299,9.198396793587174e299,9.218436873747495e299,9.238476953907816e299,9.258517034068137e299,9.278557114228458e299,9.298597194388777e299,9.318637274549098e299,9.338677354709419e299,9.35871743486974e299,9.378757515030062e299,9.398797595190381e299,9.418837675350702e299,9.438877755511023e299,9.458917835671344e299,9.478957915831665e299,9.498997995991984e299,9.519038076152305e299,9.539078156312626e299,9.559118236472947e299,9.579158316633267e299,9.599198396793587e299,9.619238476953908e299,9.639278557114228e299,9.659318637274549e299,9.67935871743487e299,9.699398797595191e299,9.719438877755512e299,9.739478957915833e299,9.759519038076153e299,9.779559118236474e299,9.799599198396794e299,9.819639278557114e299,9.839679358717435e299,9.859719438877756e299,9.879759519038077e299,9.899799599198398e299,9.919839679358717e299,9.939879759519038e299,9.959919839679359e299,9.97995991983968e299,1.0e300]}

},{}],88:[function(require,module,exports){
module.exports={"expected":[-9.210340371976294,-6.665823406897177,-6.012722983078581,-5.62097128889857,-5.340217095924538,-5.12125342781266,-4.941728197830983,-4.7895796925760115,-4.65755256598916,-4.540941081452377,-4.436518795917759,-4.341976914232403,-4.255606236893283,-4.176105980501844,-4.1024632009066035,-4.033873671424788,-3.969688208043418,-3.909375211325653,-3.8524938791215604,-3.7986746380932495,-3.747604578513181,-3.6990164316430305,-3.6526801035196064,-3.608396085105911,-3.56599026088695,-3.525309774242528,-3.4862197015194503,-3.448600352117213,-3.4123450583063053,-3.377358351902363,-3.3435544492817297,-3.310855984207969,-3.279192941364033,-3.2485017536111744,-3.218724533708076,-3.1898084171509273,-3.1617049973889793,-3.134369838258661,-3.1077620513037725,-3.081843927887681,-3.0565806177892108,-3.031939847407582,-3.0078916718594715,-2.984408256191294,-2.961463681697369,-2.9390337739642898,-2.9170959497810336,-2.8956290804842255,-2.8746133696657132,-2.8540302434683285,-2.833862251946198,-2.8140929801769228,-2.794706967991105,-2.775689637335732,-2.757027226416473,-2.738706729873618,-2.7207158443402024,-2.7030429188115352,-2.6856769093247257,-2.6686073375066965,-2.6518242526010916,-2.6353181966294974,-2.6190801723815462,-2.6031016139626626,-2.5873743596580896,-2.571890626897954,-2.5566429891311486,-2.541624354435993,-2.5268279457134843,-2.512247282324649,-2.4978761630474726,-2.483708650241235,-2.469739055117017,-2.455961924022943,-2.4423720256614185,-2.428964339163364,-2.4157340429514087,-2.402676504330252,-2.3897872697479197,-2.3770620556767055,-2.3644967400670778,-2.3520873543318706,-2.339830075821769,-2.3277212207563993,-2.315757237578293,-2.3039347006997484,-2.292250304615028,-2.280700858352591,-2.269283280244043,-2.257994592988359,-2.2468319189916173,-2.2357924759639682,-2.2248735727569975,-2.214072605425911,-2.2033870535021114,-2.192814476462827,-2.1823525103854284,-2.171998864774948,-2.1617513195541544,-2.151607722206302,-2.141565985061336,-2.1316240827170025,-2.121780049586911,-2.1120319775680954,-2.102378013821174,-2.0928163586566346,-2.083345263521229,-2.0739630290788216,-2.064668003380437,-2.05545858011858,-2.0463331969612018,-2.037290333960997,-2.028328512035992,-2.019446291517598,-2.0106422707625926,-2.00191508482567,-1.99326340418941,-1.9846859335487217,-1.9761814106469797,-1.9677486051612294,-1.959386317634006,-1.9510933784494522,-1.942868646851535,-1.9347110100023155,-1.9266193820783133,-1.9185927034031467,-1.9106299396147,-1.9027300808651881,-1.8948921410525765,-1.8871151570818836,-1.879398188154985,-1.8717403150876177,-1.8641406396523326,-1.8565982839462245,-1.8491123897823356,-1.8416821181036627,-1.8343066484187753,-1.8269851782581008,-1.8197169226499628,-1.8125011136155247,-1.80533699968183,-1.798223845412157,-1.7911609309529617,-1.7841475515967047,-1.777183017359909,-1.770266652575804,-1.7633977955009583,-1.7565757979353394,-1.7498000248552361,-1.7430698540585372,-1.7363846758218706,-1.7297438925691224,-1.723146918550889,-1.7165931795344407,-1.7100821125037715,-1.703613165369351,-1.6971857966872121,-1.6907994753869993,-1.6844536805086494,-1.6781479009473785,-1.6718816352066517,-1.665654391158852,-1.6594656858133467,-1.6533150450916962,-1.6472020036097264,-1.6411261044662224,-1.6350868990380092,-1.6290839467811753,-1.6231168150382291,-1.6171850788509798,-1.61128832077893,-1.6054261307229902,-1.5995981057543383,-1.5938038499482288,-1.5880429742225923,-1.5823150961812604,-1.576619839961651,-1.5709568360867647,-1.5653257213213578,-1.559726138532131,-1.554157736551816,-1.5486201700470277,-1.54311309938975,-1.5376361905323448,-1.5321891148859619,-1.526771549202247,-1.521383175458233,-1.5160236807443157,-1.51069275715522,-1.5053901016838522,-1.5001154161179526,-1.4948684069394624,-1.4896487852265146,-1.484456266557968,-1.4792905709204114,-1.474151422617554,-1.4690385501819314,-1.4639516862888615,-1.4588905676725745,-1.4538549350444538,-1.4488445330133295,-1.4438591100077542,-1.4388984182002094,-1.43396221343318,-1.429050255147049,-1.4241623063097495,-1.4192981333481294,-1.4144575060809792,-1.409640197653671,-1.4048459844743622,-1.4000746461517275,-1.3953259654341637,-1.3905997281504305,-1.3858957231516946,-1.3812137422549235,-1.3765535801875985,-1.3719150345337163,-1.3672979056810306,-1.3627019967695082,-1.3581271136409654,-1.3535730647898503,-1.3490396613151405,-1.344526716873325,-1.3400340476324457,-1.3355614722271647,-1.3311088117148289,-1.326675889532515,-1.322262531455018,-1.3178685655537612,-1.3134938221566101,-1.309138133808558,-1.304801335233263,-1.3004832632954197,-1.296183756963937,-1.2919026572759018,-1.2876398073013173,-1.2833950521085837,-1.2791682387307097,-1.2749592161322387,-1.2707678351768632,-1.2665939485957187,-1.2624374109563328,-1.2582980786322224,-1.2541758097731133,-1.2500704642757698,-1.2459819037554272,-1.241909991517799,-1.2378545925316544,-1.2338155734019518,-1.229792802343509,-1.2257861491552016,-1.2217954851946797,-1.2178206833535827,-1.2138616180332464,-1.20991816512089,-1.2059902019662698,-1.202077607358789,-1.198180261505056,-1.1942980460068757,-1.1904308438396671,-1.1865785393312964,-1.1827410181413192,-1.1789181672406146,-1.1751098748914097,-1.1713160306276837,-1.167536525235942,-1.1637712507363491,-1.1600201003642205,-1.1562829685518579,-1.1525597509107193,-1.1488503442139275,-1.1451546463790951,-1.1414725564514667,-1.1378039745873745,-1.1341488020379915,-1.130506941133382,-1.1268782952668435,-1.1232627688795294,-1.1196602674453482,-1.116070697456136,-1.1124939664070939,-1.1089299827824817,-1.105378656041569,-1.1018398966048353,-1.0983136158404099,-1.0947997260507525,-1.0912981404595676,-1.0878087731989456,-1.0843315392967277,-1.0808663546640904,-1.0774131360833448,-1.0739718011959432,-1.0705422684906951,-1.0671244572921825,-1.0637182877493712,-1.0603236808244183,-1.0569405582816684,-1.0535688426768317,-1.0502084573463502,-1.046859326396936,-1.0435213746952883,-1.0401945278579783,-1.036878712241506,-1.0335738549325162,-1.0302798837381788,-1.026996727176728,-1.0237243144681525,-1.0204625755250403,-1.0172114409435726,-1.013970841994663,-1.0107407106152366,-1.0075209793996565,-1.004311581591282,-1.0011124510741622,-0.9979235223648665,-0.9947447306044398,-0.9915760115504875,-0.9884173015693867,-0.9852685376286174,-0.982129657289216,-0.9790005986983448,-0.9758813005819811,-0.972771702237716,-0.9696717435276662,-0.966581364871497,-0.9635005072395508,-0.9604291121460803,-0.9573671216425891,-0.9543144783112699,-0.9512711252585442,-0.9482370061087009,-0.9452120649976297,-0.942196246566649,-0.939189495956428,-0.9361917588009989,-0.9332029812218574,-0.9302231098221538,-0.927252091680969,-0.9242898743476744,-0.9213364058363753,-0.9183916346204392,-0.9154555096270998,-0.9125279802321424,-0.909608996254668,-0.9066985079519306,-0.9037964660142519,-0.9009028215600086,-0.8980175261306922,-0.895140531686039,-0.8922717905992323,-0.8894112556521705,-0.8865588800308033,-0.8837146173205366,-0.8808784215016996,-0.8780502469450764,-0.8752300484075033,-0.8724177810275244,-0.8696134003211107,-0.866816862177437,-0.8640281228547206,-0.8612471389761149,-0.8584738675256604,-0.8557082658442942,-0.852950291625912,-0.8501999029134839,-0.8474570580952263,-0.844721715900824,-0.8419938353977026,-0.8392733759873555,-0.8365602974017178,-0.8338545596995885,-0.8311561232631046,-0.8284649487942592,-0.8257809973114674,-0.8231042301461791,-0.8204346089395359,-0.817772095639073,-0.815116652495464,-0.8124682420593106,-0.8098268271779736,-0.8071923709924443,-0.8045648369342603,-0.8019441887224588,-0.7993303903605702,-0.7967234061336528,-0.7941232006053637,-0.7915297386150686,-0.7889429852749898,-0.7863629059673898,-0.7837894663417906,-0.7812226323122315,-0.7786623700545594,-0.7761086460037531,-0.7735614268512853,-0.7710206795425145,-0.7684863712741112,-0.7659584694915176,-0.7634369418864374,-0.7609217563943595,-0.7584128811921099,-0.7559102846954372,-0.7534139355566264,-0.7509238026621422,-0.7484398551303034,-0.7459620623089844,-0.7434903937733451,-0.7410248193235904,-0.7385653089827556,-0.7361118329945191,-0.7336643618210434,-0.731222866140841,-0.7287873168466655,-0.7263576850434317,-0.7239339420461569,-0.7215160593779293,-0.7191040087679008,-0.7166977621493039,-0.7142972916574915,-0.7119025696280004,-0.7095135685946398,-0.7071302612876004,-0.7047526206315856,-0.7023806197439679,-0.7000142319329642,-0.6976534306958329,-0.6952981897170941,-0.6929484828667697,-0.6906042841986426,-0.6882655679485389,-0.6859323085326282,-0.683604480545745,-0.681282058759728,-0.6789650181217809,-0.6766533337528495,-0.6743469809460196,-0.6720459351649327,-0.6697501720422193,-0.6674596673779506,-0.6651743971381088,-0.6628943374530727,-0.6606194646161226,-0.6583497550819614,-0.6560851854652513,-0.6538257325391699,-0.6515713732339791,-0.6493220846356126,-0.6470778439842787,-0.644838628673078,-0.6426044162466364,-0.640375184399756,-0.6381509109760766,-0.6359315739667558,-0.6337171515091623,-0.6315076218855828,-0.6293029635219451,-0.6271031549865536,-0.6249081749888388,-0.622718002378122,-0.6205326161423916,-0.6183519954070941,-0.6161761194339371,-0.6140049676197066,-0.6118385194950959,-0.6096767547235483,-0.6075196531001109,-0.6053671945503023,-0.6032193591289909,-0.6010761270192866,-0.5989374785314437,-0.5968033941017751,-0.594673854291579,-0.5925488397860762,-0.5904283313933588,-0.5883123100433513,-0.58620075678678,-0.5840936527941558,-0.5819909793547668,-0.5798927178756809,-0.5777988498807596,-0.5757093570096818,-0.5736242210169777,-0.5715434237710735,-0.5694669472533442,-0.5673947735571785,-0.5653268848870519,-0.5632632635576093,-0.561203891992758,-0.5591487527247699,-0.5570978283933914,-0.5550511017449642,-0.5530085556315543,-0.55097017301009,-0.5489359369415088,-0.5469058305899124,-0.5448798372217305,-0.5428579402048943,-0.5408401230080162,-0.5388263691995787,-0.5368166624471329,-0.5348109865165019],"x":[-0.9999,-0.9987262925851703,-0.9975525851703407,-0.996378877755511,-0.9952051703406813,-0.9940314629258516,-0.9928577555110221,-0.9916840480961924,-0.9905103406813627,-0.9893366332665331,-0.9881629258517034,-0.9869892184368737,-0.9858155110220441,-0.9846418036072144,-0.9834680961923847,-0.9822943887775551,-0.9811206813627255,-0.9799469739478958,-0.9787732665330662,-0.9775995591182365,-0.9764258517034068,-0.9752521442885772,-0.9740784368737475,-0.9729047294589178,-0.9717310220440881,-0.9705573146292585,-0.9693836072144288,-0.9682098997995991,-0.9670361923847696,-0.9658624849699399,-0.9646887775551102,-0.9635150701402806,-0.9623413627254509,-0.9611676553106212,-0.9599939478957916,-0.9588202404809619,-0.9576465330661322,-0.9564728256513026,-0.955299118236473,-0.9541254108216433,-0.9529517034068137,-0.951777995991984,-0.9506042885771543,-0.9494305811623246,-0.948256873747495,-0.9470831663326653,-0.9459094589178356,-0.944735751503006,-0.9435620440881763,-0.9423883366733466,-0.9412146292585171,-0.9400409218436874,-0.9388672144288577,-0.9376935070140281,-0.9365197995991984,-0.9353460921843687,-0.9341723847695391,-0.9329986773547094,-0.9318249699398797,-0.9306512625250501,-0.9294775551102205,-0.9283038476953908,-0.9271301402805612,-0.9259564328657315,-0.9247827254509018,-0.9236090180360721,-0.9224353106212425,-0.9212616032064128,-0.9200878957915831,-0.9189141883767535,-0.9177404809619238,-0.9165667735470941,-0.9153930661322646,-0.9142193587174349,-0.9130456513026052,-0.9118719438877756,-0.9106982364729459,-0.9095245290581162,-0.9083508216432866,-0.9071771142284569,-0.9060034068136272,-0.9048296993987976,-0.903655991983968,-0.9024822845691383,-0.9013085771543086,-0.900134869739479,-0.8989611623246493,-0.8977874549098196,-0.89661374749499,-0.8954400400801603,-0.8942663326653306,-0.893092625250501,-0.8919189178356713,-0.8907452104208416,-0.8895715030060121,-0.8883977955911824,-0.8872240881763527,-0.8860503807615231,-0.8848766733466934,-0.8837029659318637,-0.8825292585170341,-0.8813555511022044,-0.8801818436873747,-0.879008136272545,-0.8778344288577155,-0.8766607214428858,-0.8754870140280561,-0.8743133066132265,-0.8731395991983968,-0.8719658917835671,-0.8707921843687375,-0.8696184769539078,-0.8684447695390781,-0.8672710621242485,-0.8660973547094188,-0.8649236472945891,-0.8637499398797596,-0.8625762324649299,-0.8614025250501002,-0.8602288176352706,-0.8590551102204409,-0.8578814028056112,-0.8567076953907815,-0.8555339879759519,-0.8543602805611222,-0.8531865731462925,-0.852012865731463,-0.8508391583166333,-0.8496654509018036,-0.848491743486974,-0.8473180360721443,-0.8461443286573146,-0.844970621242485,-0.8437969138276553,-0.8426232064128256,-0.841449498997996,-0.8402757915831663,-0.8391020841683366,-0.8379283767535071,-0.8367546693386774,-0.8355809619238477,-0.834407254509018,-0.8332335470941884,-0.8320598396793587,-0.830886132264529,-0.8297124248496994,-0.8285387174348697,-0.82736501002004,-0.8261913026052105,-0.8250175951903808,-0.8238438877755511,-0.8226701803607215,-0.8214964729458918,-0.8203227655310621,-0.8191490581162325,-0.8179753507014028,-0.8168016432865731,-0.8156279358717435,-0.8144542284569138,-0.8132805210420841,-0.8121068136272545,-0.8109331062124249,-0.8097593987975952,-0.8085856913827655,-0.8074119839679359,-0.8062382765531062,-0.8050645691382765,-0.8038908617234469,-0.8027171543086172,-0.8015434468937875,-0.800369739478958,-0.7991960320641283,-0.7980223246492986,-0.796848617234469,-0.7956749098196393,-0.7945012024048096,-0.79332749498998,-0.7921537875751503,-0.7909800801603206,-0.789806372745491,-0.7886326653306613,-0.7874589579158316,-0.786285250501002,-0.7851115430861724,-0.7839378356713427,-0.782764128256513,-0.7815904208416834,-0.7804167134268537,-0.779243006012024,-0.7780692985971944,-0.7768955911823647,-0.775721883767535,-0.7745481763527055,-0.7733744689378758,-0.7722007615230461,-0.7710270541082165,-0.7698533466933868,-0.7686796392785571,-0.7675059318637275,-0.7663322244488978,-0.7651585170340681,-0.7639848096192384,-0.7628111022044088,-0.7616373947895791,-0.7604636873747495,-0.7592899799599199,-0.7581162725450902,-0.7569425651302605,-0.7557688577154309,-0.7545951503006012,-0.7534214428857715,-0.7522477354709419,-0.7510740280561122,-0.7499003206412825,-0.748726613226453,-0.7475529058116233,-0.7463791983967936,-0.745205490981964,-0.7440317835671343,-0.7428580761523046,-0.7416843687374749,-0.7405106613226453,-0.7393369539078156,-0.7381632464929859,-0.7369895390781563,-0.7358158316633266,-0.734642124248497,-0.7334684168336674,-0.7322947094188377,-0.731121002004008,-0.7299472945891784,-0.7287735871743487,-0.727599879759519,-0.7264261723446894,-0.7252524649298597,-0.72407875751503,-0.7229050501002005,-0.7217313426853708,-0.7205576352705411,-0.7193839278557114,-0.7182102204408818,-0.7170365130260521,-0.7158628056112224,-0.7146890981963928,-0.7135153907815631,-0.7123416833667334,-0.7111679759519038,-0.7099942685370741,-0.7088205611222445,-0.7076468537074149,-0.7064731462925852,-0.7052994388777555,-0.7041257314629259,-0.7029520240480962,-0.7017783166332665,-0.7006046092184369,-0.6994309018036072,-0.6982571943887775,-0.6970834869739478,-0.6959097795591183,-0.6947360721442886,-0.6935623647294589,-0.6923886573146293,-0.6912149498997996,-0.6900412424849699,-0.6888675350701403,-0.6876938276553106,-0.6865201202404809,-0.6853464128256513,-0.6841727054108216,-0.682998997995992,-0.6818252905811624,-0.6806515831663327,-0.679477875751503,-0.6783041683366734,-0.6771304609218437,-0.675956753507014,-0.6747830460921844,-0.6736093386773547,-0.672435631262525,-0.6712619238476953,-0.6700882164328658,-0.6689145090180361,-0.6677408016032064,-0.6665670941883768,-0.6653933867735471,-0.6642196793587174,-0.6630459719438878,-0.6618722645290581,-0.6606985571142284,-0.6595248496993988,-0.6583511422845691,-0.6571774348697395,-0.6560037274549099,-0.6548300200400802,-0.6536563126252505,-0.6524826052104209,-0.6513088977955912,-0.6501351903807615,-0.6489614829659318,-0.6477877755511022,-0.6466140681362725,-0.6454403607214428,-0.6442666533066133,-0.6430929458917836,-0.6419192384769539,-0.6407455310621243,-0.6395718236472946,-0.6383981162324649,-0.6372244088176353,-0.6360507014028056,-0.6348769939879759,-0.6337032865731463,-0.6325295791583166,-0.631355871743487,-0.6301821643286574,-0.6290084569138277,-0.627834749498998,-0.6266610420841683,-0.6254873346693387,-0.624313627254509,-0.6231399198396793,-0.6219662124248497,-0.62079250501002,-0.6196187975951903,-0.6184450901803608,-0.6172713827655311,-0.6160976753507014,-0.6149239679358718,-0.6137502605210421,-0.6125765531062124,-0.6114028456913828,-0.6102291382765531,-0.6090554308617234,-0.6078817234468938,-0.6067080160320641,-0.6055343086172345,-0.6043606012024048,-0.6031868937875752,-0.6020131863727455,-0.6008394789579158,-0.5996657715430862,-0.5984920641282565,-0.5973183567134268,-0.5961446492985972,-0.5949709418837675,-0.5937972344689378,-0.5926235270541083,-0.5914498196392786,-0.5902761122244489,-0.5891024048096193,-0.5879286973947896,-0.5867549899799599,-0.5855812825651303,-0.5844075751503006,-0.5832338677354709,-0.5820601603206412,-0.5808864529058116,-0.579712745490982,-0.5785390380761523,-0.5773653306613227,-0.576191623246493,-0.5750179158316633,-0.5738442084168337,-0.572670501002004,-0.5714967935871743,-0.5703230861723447,-0.569149378757515,-0.5679756713426853,-0.5668019639278558,-0.5656282565130261,-0.5644545490981964,-0.5632808416833668,-0.5621071342685371,-0.5609334268537074,-0.5597597194388777,-0.5585860120240481,-0.5574123046092184,-0.5562385971943887,-0.5550648897795591,-0.5538911823647295,-0.5527174749498998,-0.5515437675350702,-0.5503700601202405,-0.5491963527054108,-0.5480226452905812,-0.5468489378757515,-0.5456752304609218,-0.5445015230460922,-0.5433278156312625,-0.5421541082164328,-0.5409804008016033,-0.5398066933867736,-0.5386329859719439,-0.5374592785571143,-0.5362855711422846,-0.5351118637274549,-0.5339381563126252,-0.5327644488977956,-0.5315907414829659,-0.5304170340681362,-0.5292433266533066,-0.528069619238477,-0.5268959118236473,-0.5257222044088177,-0.524548496993988,-0.5233747895791583,-0.5222010821643287,-0.521027374749499,-0.5198536673346693,-0.5186799599198397,-0.51750625250501,-0.5163325450901803,-0.5151588376753508,-0.5139851302605211,-0.5128114228456914,-0.5116377154308617,-0.5104640080160321,-0.5092903006012024,-0.5081165931863727,-0.5069428857715431,-0.5057691783567134,-0.5045954709418837,-0.5034217635270541,-0.5022480561122245,-0.5010743486973948,-0.4999006412825651,-0.4987269338677355,-0.49755322645290584,-0.49637951903807614,-0.4952058116232465,-0.4940321042084168,-0.4928583967935872,-0.49168468937875753,-0.49051098196392784,-0.4893372745490982,-0.48816356713426856,-0.48698985971943887,-0.48581615230460923,-0.48464244488977953,-0.4834687374749499,-0.48229503006012026,-0.48112132264529056,-0.4799476152304609,-0.4787739078156313,-0.4776002004008016,-0.47642649298597195,-0.4752527855711423,-0.4740790781563126,-0.472905370741483,-0.4717316633266533,-0.47055795591182364,-0.469384248496994,-0.4682105410821643,-0.46703683366733467,-0.46586312625250503,-0.46468941883767534,-0.4635157114228457,-0.462342004008016,-0.46116829659318637,-0.4599945891783567,-0.45882088176352703,-0.4576471743486974,-0.45647346693386776,-0.45529975951903806,-0.4541260521042084,-0.4529523446893788,-0.4517786372745491,-0.45060492985971945,-0.44943122244488976,-0.4482575150300601,-0.4470838076152305,-0.4459101002004008,-0.44473639278557114,-0.4435626853707415,-0.4423889779559118,-0.44121527054108217,-0.4400415631262525,-0.43886785571142284,-0.4376941482965932,-0.4365204408817635,-0.43534673346693387,-0.4341730260521042,-0.43299931863727453,-0.4318256112224449,-0.43065190380761526,-0.42947819639278556,-0.4283044889779559,-0.4271307815631262,-0.4259570741482966,-0.42478336673346695,-0.42360965931863725,-0.4224359519038076,-0.421262244488978,-0.4200885370741483,-0.41891482965931864,-0.417741122244489,-0.4165674148296593,-0.41539370741482967,-0.41422]}

},{}],89:[function(require,module,exports){
module.exports={"expected":[0.34657814235925116,0.4785858844890398,0.595182251568324,0.6995924174293255,0.7941243659720124,0.8804867539453567,0.9599799879006676,1.0336167421573337,1.1022010451122317,1.1663819317996247,1.2266908875555331,1.283568625664578,1.3373846492237516,1.38845181170791,1.4370373362739142,1.483371279558839,1.5276531197409626,1.570056946601365,1.6107355951296811,1.6498239706653723,1.6874417481997765,1.723695582076311,1.7586809289341494,1.7924835623867388,1.8251808399483826,1.8568427693013405,1.887532910872609,1.9173091459793865,1.946224333876744,1.974326876448506,2.0016612056946848,2.0282682063451967,2.0541855836917415,2.0794481849443427,2.104088280985775,2.128135814239695,2.1516186174283707,2.1745626072286197,2.196991956204979,2.2189292458800804,2.2403956033723387,2.2614108236734576,2.2819934793395893,2.302161019119494,2.3219298568321842,2.341315451628415,2.36033238061931,2.3789944047269636,2.397314528502193,2.4153050545607577,2.4329776332087776,2.4503433077586823,2.467412555977123,2.484195328054396,2.5007010814399253,2.5169388128491725,2.5329170877131806,2.5486440673121105,2.564127533807947,2.5793749133686,2.5943932975553956,2.609189463128157,2.623769890406317,2.6381407803105814,2.6523080701973214,2.666277448586885,2.680054368877272,2.693644062125911,2.7070515489745115,2.720281650785023,2.7333390000485074,2.7462280501231606,2.7589530843527097,2.7715182246119006,2.783927439321733,2.796184550973451,2.8082932431969714,2.8202570674064615,2.832079449053059,2.84376369351228,2.855312991631429,2.8667304249603056,2.878018970686661,2.889181506296176,2.900220813975213,2.9111395847731925,2.9219404225401697,2.9326258476540312,2.9431983005506517,2.953660145069384,2.9640136716253487,2.9742611002191857,2.984404583294143,2.9944462084497143,3.0043880010203825,3.0142319265274256,3.023979893011222,3.0336337532509727,3.043195306878297,3.052666302390735,3.062048439070796,3.071343368815811,3.0805526978835265,3.089677988558051,3.0987207607404716,3.1076824934681992,3.1165646263668316,3.1253685610381075,3.1340956623872946,3.142747259893151,3.1513246488234263,3.1598290913986724,3.16826181790698,3.176624027772111,3.1849168905773344,3.1931415470471616,3.2012991099890358,3.209390665196922,3.2174172723186327,3.2253799656886213,3.233279755127878,3.241117626712482,3.2488945435122636,3.256611446300968,3.264269254239224,3.2718688655315624,3.279411158058657,3.2868969899858995,3.2943272003493664,3.3017026096201727,3.309024020248172,3.3162922171858917,3.323507968393569,3.3306720253260944,3.3377851234026332,3.34484798245967,3.3518613071881593,3.358825787555454,3.365742099212648,3.37261090388792,3.379432849766469,3.3862085718575727,3.3929386923492935,3.399623820951332,3.406264555226492,3.4128614809112148,3.419415172225609,3.425926192173388,3.4323950928321025,3.4388224156340503,3.4452086916382143,3.4515544417935717,3.457860177194101,3.4641263993257985,3.4703536003060087,3.4765422631153413,3.482692861822461,3.4888058618020055,3.494881719945881,3.5009208848681825,3.506923797103957,3.512890889302042,3.518822586412178,3.5247193058666153,3.5305814577563828,3.5364094450024344,3.5422036635218275,3.5479645023891186,3.553692343993137,3.5593875641892927,3.5650505324475716,3.570681611996365,3.5762811599622726,3.581849527506009,3.587387059954554,3.5928940969296557,3.5983709724728246,3.603818015166913,3.60923554825441,3.6146238897525413,3.6199833525652934,3.625314244592443,3.630616868835703,3.6358915235020626,3.641138502104423,3.6463580935596007,3.6515505822837895,3.656716248285557,3.6618553672564484,3.6669682106592796,3.672055045814179,3.677116135982455,3.6821517404483504,3.687162114598751,3.692147510000905,3.6971081744782137,3.7020443521841564,3.7069562836743937,3.711844205977114,3.716708352661665,3.7215489539055255,3.7263662365596653,3.7311604242123373,3.7359317372513465,3.7406803929248436,3.745406605400678,3.75011058582436,3.754792542375659,3.759452680323891,3.764091202081916,3.7687083072588963,3.7733041927118363,3.777879052595946,3.7824330784138587,3.7869664590637306,3.7914793808862584,3.7959720277106346,3.8004445808994847,3.804897219392793,3.8093301197508636,3.8137434561963297,3.8181374006552384,3.8225121227972405,3.826867790074903,3.8312045677621676,3.8355226189919827,3.8398221047931242,3.8441031841262263,3.848366013919048,3.852610749100989,3.8568375426368764,3.86104654556004,3.865237907004696,3.8694117742376526,3.873568292689359,3.8777076059843094,3.881829855970823,3.8859351827502087,3.8900237247053404,3.8940956185286417,3.8981509992495114,3.902190000261189,3.906212753347083,3.9102193887065724,3.91421003498029,3.9181848192749067,3.922143867187423,3.9260873028289827,3.9300152488482176,3.9339278264541386,3.937825155438575,3.9417073541981855,3.9455745397560373,3.949426827782773,3.9532643326173695,3.957087167287503,3.960895443529523,3.9646892718080484,3.968468761335194,3.972234020089435,3.975985154834116,3.979722271135617,3.983445473381179,3.9871548647963992,3.9908505474624043,3.9945326223327053,3.9982011892497455,4.001856346961145,4.00549819313565,4.00912682437879,4.012742336248259,4.016344823269006,4.019934378948075,4.023511095789158,4.027075065306904,4.030626378040969,4.034165123569814,4.037691390524263,4.041205266600827,4.044706838574786,4.048196192313048,4.051673412786783,4.055138584083839,4.058591789420947,4.0620331111557055,4.06546263079837,4.068880429023438,4.0722865856810335,4.075681179808103,4.079064289639416,4.08243599261839,4.085796365407722,4.08914548389985,4.092483423227237,4.095810257772483,4.099126061178272,4.102430906357156,4.105724865501167,4.109008010091288,4.112280410906756,4.115542138034218,4.11879326087674,4.122033848162663,4.125263967954327,4.128483687656643,4.131693074025536,4.134892193176251,4.138081110591519,4.141259891129606,4.144428599032228,4.1475872979323345,4.150736050861782,4.15387492025888,4.157003967975818,4.160123255285982,4.163232842891149,4.1663327909285774,4.169423158977989,4.172504006068433,4.175575390685056,4.178637370775761,4.181690003757771,4.184733346524084,4.1877674554498405,4.190792386398585,4.193808194728443,4.196814935298193,4.199812662473258,4.202801430131605,4.205781291669551,4.20875230000749,4.211714507595532,4.214667966419057,4.217612728004192,4.220548843423202,4.223476363299806,4.226395337814414,4.229305816709288,4.232207849293627,4.235101484448584,4.237986770632199,4.2408637558842734,4.243732487831168,4.246593013690533,4.249445380275972,4.252289634001639,4.255125820886769,4.257953986560144,4.260774176264505,4.263586434860884,4.266390806832894,4.269187336290948,4.27197606697642,4.2747570422657555,4.277530305174515,4.2802958983613655,4.283053864132023,4.285804244443131,4.288547080906094,4.291282414790847,4.294010287029593,4.296730738220469,4.2994438086311755,4.302149538202553,4.3048479665521056,4.307539132977488,4.310223076459935,4.312899835667651,4.315569448959154,4.318231954386568,4.3208873896988855,4.323535792345174,4.326177199477743,4.32881164795528,4.331439174345922,4.334059814930319,4.336673605704623,4.3392805823834655,4.341880780402882,4.344474234923202,4.347060980831901,4.34964105274642,4.3522144850169395,4.354781311729129,4.357341566706853,4.359895283514845,4.36244249546135,4.364983235600729,4.367517536736032,4.370045431421544,4.372566951965288,4.375082130431507,4.3775909986431065,4.380093588184076,4.382589930401867,4.385080056409757,4.387563997089172,4.3900417830919825,4.392513444842777,4.3949790125411035,4.397438516163679,4.399891985466582,4.40233944998741,4.404780939047408,4.407216481753588,4.409646107000801,4.4120698434737955,4.414487719649255,4.4168997637978,4.419306003985971,4.4217064680781935,4.424101183738707,4.426490178433485,4.42887347943212,4.431251113809693,4.433623108448618,4.435989490040468,4.438350285087775,4.440705519905813,4.443055220624354,4.445399413189412,4.447738123364959,4.450071376734628,4.452399198703386,4.4547216144991975,4.457038649174668,4.4593503276086555,4.461656674507887,4.463957714408532,4.466253471677772,4.468543970515352,4.470829234955105,4.473109288866472,4.475384155955991,4.4776538597687825,4.479918423690005,4.482177870946309,4.484432224607255,4.486681507586741,4.488925742644385,4.49116495238692,4.49339915926955,4.495628385597309,4.497852653526391,4.5000719850654765,4.502286402077035,4.504495926278619,4.506700579244141,4.508900382405142,4.5110953570520325,4.5132855243353385,4.515470905266917,4.517651520721171,4.51982739143624,4.5219985380151915,4.524164980927181,4.526326740508621,4.528483836964317,4.530636290368608,4.532784120666481,4.534927347674684,4.537065991082824,4.539200070454447,4.541329605228118,4.543454614718478,4.545575118117298,4.547691134494521,4.549802682799287,4.55190978186095,4.554012450390094,4.556110706979519,4.558204570105234,4.560294058127433,4.562379189291459,4.564459981728758,4.566536453457832,4.568608622385168,4.5706765063061665,4.572740122906062,4.574799489760825,4.576854624338066,4.578905543997918,4.580952265993921,4.582994807473893,4.585033185480791,4.58706741695356,4.589097518727985,4.591123507537524,4.593145400014132,4.595163212689087,4.597176961993794,4.5991866642605945,4.601192335723556,4.60319399251926,4.6051916506875825,4.607185326172467,4.609175034822682,4.611160792392582,4.613142614542854,4.61512051684126],"x":[0.41422,0.6137907014028056,0.8133614028056112,1.0129321042084167,1.2125028056112224,1.412073507014028,1.6116442084168336,1.8112149098196393,2.010785611222445,2.2103563126252506,2.409927014028056,2.609497715430862,2.8090684168336675,3.008639118236473,3.2082098196392788,3.407780521042084,3.6073512224448896,3.8069219238476952,4.006492625250501,4.2060633266533065,4.405634028056112,4.605204729458918,4.804775430861723,5.004346132264529,5.203916833667335,5.40348753507014,5.603058236472946,5.802628937875752,6.002199639278557,6.201770340681363,6.4013410420841685,6.600911743486974,6.80048244488978,7.0000531462925855,7.199623847695391,7.399194549098197,7.598765250501002,7.798335951903808,7.997906653306614,8.197477354709418,8.397048056112224,8.59661875751503,8.796189458917835,8.995760160320641,9.195330861723447,9.394901563126252,9.594472264529058,9.794042965931864,9.99361366733467,10.193184368737475,10.39275507014028,10.592325771543086,10.791896472945892,10.991467174348697,11.191037875751503,11.390608577154309,11.590179278557114,11.78974997995992,11.989320681362726,12.188891382765531,12.388462084168337,12.588032785571142,12.787603486973948,12.987174188376754,13.18674488977956,13.386315591182365,13.58588629258517,13.785456993987976,13.985027695390782,14.184598396793588,14.384169098196393,14.583739799599199,14.783310501002005,14.98288120240481,15.182451903807616,15.382022605210421,15.581593306613227,15.781164008016033,15.980734709418838,16.180305410821642,16.379876112224448,16.579446813627253,16.77901751503006,16.978588216432865,17.17815891783567,17.377729619238476,17.57730032064128,17.776871022044087,17.976441723446893,18.1760124248497,18.375583126252504,18.57515382765531,18.774724529058116,18.97429523046092,19.173865931863727,19.373436633266532,19.573007334669338,19.772578036072144,19.97214873747495,20.171719438877755,20.37129014028056,20.570860841683366,20.770431543086172,20.970002244488978,21.169572945891783,21.36914364729459,21.568714348697394,21.7682850501002,21.967855751503006,22.16742645290581,22.366997154308617,22.566567855711423,22.76613855711423,22.965709258517034,23.16527995991984,23.364850661322645,23.56442136272545,23.763992064128256,23.963562765531062,24.163133466933868,24.362704168336673,24.56227486973948,24.761845571142285,24.96141627254509,25.160986973947896,25.3605576753507,25.560128376753507,25.759699078156313,25.95926977955912,26.158840480961924,26.35841118236473,26.557981883767535,26.75755258517034,26.957123286573147,27.156693987975952,27.356264689378758,27.555835390781564,27.75540609218437,27.954976793587175,28.15454749498998,28.354118196392786,28.553688897795592,28.753259599198397,28.952830300601203,29.15240100200401,29.351971703406814,29.55154240480962,29.751113106212426,29.95068380761523,30.150254509018037,30.349825210420843,30.549395911823648,30.748966613226454,30.94853731462926,31.148108016032065,31.34767871743487,31.547249418837676,31.746820120240482,31.946390821643288,32.14596152304609,32.345532224448895,32.5451029258517,32.74467362725451,32.94424432865731,33.14381503006012,33.343385731462924,33.54295643286573,33.742527134268535,33.94209783567134,34.141668537074146,34.34123923847695,34.54080993987976,34.74038064128256,34.93995134268537,35.139522044088174,35.33909274549098,35.538663446893786,35.73823414829659,35.9378048496994,36.1373755511022,36.33694625250501,36.536516953907814,36.73608765531062,36.935658356713425,37.13522905811623,37.334799759519036,37.53437046092184,37.73394116232465,37.93351186372745,38.13308256513026,38.332653266533065,38.53222396793587,38.731794669338676,38.93136537074148,39.13093607214429,39.33050677354709,39.5300774749499,39.729648176352704,39.92921887775551,40.128789579158315,40.32836028056112,40.52793098196393,40.72750168336673,40.92707238476954,41.12664308617234,41.32621378757515,41.525784488977955,41.72535519038076,41.924925891783566,42.12449659318637,42.32406729458918,42.52363799599198,42.72320869739479,42.922779398797594,43.1223501002004,43.321920801603206,43.52149150300601,43.72106220440882,43.92063290581162,44.12020360721443,44.319774308617234,44.51934501002004,44.718915711422845,44.91848641282565,45.118057114228456,45.31762781563126,45.51719851703407,45.71676921843687,45.91633991983968,46.115910621242485,46.31548132264529,46.515052024048096,46.7146227254509,46.91419342685371,47.11376412825651,47.31333482965932,47.512905531062124,47.71247623246493,47.912046933867735,48.11161763527054,48.31118833667335,48.51075903807615,48.71032973947896,48.90990044088176,49.10947114228457,49.309041843687375,49.50861254509018,49.708183246492986,49.90775394789579,50.1073246492986,50.3068953507014,50.50646605210421,50.706036753507014,50.90560745490982,51.105178156312626,51.30474885771543,51.50431955911824,51.70389026052104,51.90346096192385,52.103031663326654,52.30260236472946,52.502173066132265,52.70174376753507,52.901314468937876,53.10088517034068,53.30045587174349,53.50002657314629,53.6995972745491,53.899167975951904,54.09873867735471,54.298309378757516,54.49788008016032,54.69745078156313,54.89702148296593,55.09659218436874,55.296162885771544,55.49573358717435,55.695304288577155,55.89487498997996,56.09444569138277,56.29401639278557,56.49358709418838,56.69315779559118,56.89272849699399,57.092299198396795,57.2918698997996,57.491440601202406,57.69101130260521,57.89058200400802,58.09015270541082,58.28972340681363,58.489294108216434,58.68886480961924,58.888435511022045,59.08800621242485,59.28757691382766,59.48714761523046,59.68671831663327,59.886289018036074,60.08585971943888,60.285430420841685,60.48500112224449,60.684571823647296,60.8841425250501,61.08371322645291,61.28328392785571,61.48285462925852,61.682425330661324,61.88199603206413,62.081566733466936,62.28113743486974,62.48070813627255,62.68027883767535,62.87984953907816,63.079420240480964,63.27899094188377,63.478561643286575,63.67813234468938,63.877703046092186,64.07727374749498,64.27684444889779,64.4764151503006,64.6759858517034,64.87555655310621,65.07512725450901,65.27469795591182,65.47426865731462,65.67383935871743,65.87341006012024,66.07298076152304,66.27255146292585,66.47212216432865,66.67169286573146,66.87126356713426,67.07083426853707,67.27040496993988,67.46997567134268,67.66954637274549,67.86911707414829,68.0686877755511,68.2682584769539,68.46782917835671,68.66739987975951,68.86697058116232,69.06654128256513,69.26611198396793,69.46568268537074,69.66525338677354,69.86482408817635,70.06439478957915,70.26396549098196,70.46353619238477,70.66310689378757,70.86267759519038,71.06224829659318,71.26181899799599,71.4613896993988,71.6609604008016,71.8605311022044,72.06010180360721,72.25967250501002,72.45924320641282,72.65881390781563,72.85838460921843,73.05795531062124,73.25752601202404,73.45709671342685,73.65666741482966,73.85623811623246,74.05580881763527,74.25537951903807,74.45495022044088,74.65452092184368,74.85409162324649,75.0536623246493,75.2532330260521,75.4528037274549,75.65237442885771,75.85194513026052,76.05151583166332,76.25108653306613,76.45065723446893,76.65022793587174,76.84979863727455,77.04936933867735,77.24894004008016,77.44851074148296,77.64808144288577,77.84765214428857,78.04722284569138,78.24679354709419,78.44636424849699,78.6459349498998,78.8455056513026,79.04507635270541,79.24464705410821,79.44421775551102,79.64378845691382,79.84335915831663,80.04292985971944,80.24250056112224,80.44207126252505,80.64164196392785,80.84121266533066,81.04078336673346,81.24035406813627,81.43992476953908,81.63949547094188,81.83906617234469,82.03863687374749,82.2382075751503,82.4377782765531,82.63734897795591,82.83691967935872,83.03649038076152,83.23606108216433,83.43563178356713,83.63520248496994,83.83477318637274,84.03434388777555,84.23391458917835,84.43348529058116,84.63305599198397,84.83262669338677,85.03219739478958,85.23176809619238,85.43133879759519,85.630909498998,85.8304802004008,86.0300509018036,86.22962160320641,86.42919230460922,86.62876300601202,86.82833370741483,87.02790440881763,87.22747511022044,87.42704581162324,87.62661651302605,87.82618721442886,88.02575791583166,88.22532861723447,88.42489931863727,88.62447002004008,88.82404072144288,89.02361142284569,89.2231821242485,89.4227528256513,89.6223235270541,89.82189422845691,90.02146492985972,90.22103563126252,90.42060633266533,90.62017703406813,90.81974773547094,91.01931843687375,91.21888913827655,91.41845983967936,91.61803054108216,91.81760124248497,92.01717194388777,92.21674264529058,92.41631334669339,92.61588404809619,92.815454749499,93.0150254509018,93.21459615230461,93.41416685370741,93.61373755511022,93.81330825651303,94.01287895791583,94.21244965931864,94.41202036072144,94.61159106212425,94.81116176352705,95.01073246492986,95.21030316633266,95.40987386773547,95.60944456913828,95.80901527054108,96.00858597194389,96.20815667334669,96.4077273747495,96.6072980761523,96.80686877755511,97.00643947895792,97.20601018036072,97.40558088176353,97.60515158316633,97.80472228456914,98.00429298597194,98.20386368737475,98.40343438877755,98.60300509018036,98.80257579158317,99.00214649298597,99.20171719438878,99.40128789579158,99.60085859719439,99.8004292985972,100.0]}

},{}],90:[function(require,module,exports){
module.exports={"expected":[-0.5348109865165019,-0.5343960255891126,-0.5339812367828735,-0.5335666199550559,-0.5331521749631086,-0.5327379016646575,-0.5323237999175057,-0.5319098695796324,-0.5314961105091934,-0.5310825225645204,-0.5306691056041206,-0.5302558594866772,-0.5298427840710478,-0.5294298792162655,-0.5290171447815374,-0.528604580626245,-0.5281921866099442,-0.5277799625923638,-0.5273679084334069,-0.5269560239931489,-0.5265443091318386,-0.5261327637098968,-0.5257213875879172,-0.5253101806266651,-0.5248991426870775,-0.5244882736302627,-0.5240775733175004,-0.5236670416102411,-0.5232566783701058,-0.5228464834588856,-0.522436456738542,-0.5220265980712058,-0.5216169073191776,-0.5212073843449272,-0.520798029011093,-0.520388841180482,-0.5199798207160699,-0.5195709674810002,-0.5191622813385842,-0.5187537621523011,-0.5183454097857966,-0.517937224102884,-0.5175292049675431,-0.5171213522439202,-0.5167136657963277,-0.5163061454892438,-0.5158987911873124,-0.5154916027553427,-0.515084580058309,-0.5146777229613507,-0.5142710313297711,-0.5138645050290385,-0.5134581439247844,-0.5130519478828048,-0.5126459167690589,-0.5122400504496689,-0.5118343487909202,-0.5114288116592607,-0.5110234389213009,-0.5106182304438132,-0.5102131860937322,-0.509808305738154,-0.5094035892443359,-0.5089990364796966,-0.5085946473118153,-0.5081904216084321,-0.5077863592374472,-0.507382460066921,-0.5069787239650736,-0.5065751508002849,-0.5061717404410938,-0.5057684927561983,-0.5053654076144551,-0.5049624848848797,-0.5045597244366458,-0.5041571261390847,-0.503754689861686,-0.5033524154740966,-0.5029503028461204,-0.5025483518477187,-0.5021465623490093,-0.5017449342202668,-0.5013434673319215,-0.5009421615545598,-0.5005410167589246,-0.5001400328159133,-0.4997392095965792,-0.4993385469721302,-0.498938044813929,-0.4985377029934932,-0.49813752138249423,-0.4977374998527575,-0.49733763827626254,-0.49693793652514184,-0.4965383944716818,-0.49613901198832144,-0.4957397889476525,-0.49534072522241956,-0.49494182068551923,-0.4945430752100002,-0.49414448866906313,-0.49374606093606005,-0.49334779188449446,-0.49294968138802076,-0.49255172932044433,-0.4921539355557212,-0.4917562999679575,-0.4913588224314098,-0.4909615028204844,-0.4905643410097371,-0.49016733687387337,-0.4897704902877478,-0.48937380112636364,-0.4889772692648732,-0.48858089457857695,-0.4881846769429239,-0.48778861623351066,-0.48739271232608194,-0.4869969650965299,-0.48660137442089363,-0.4862059401753599,-0.4858106622362618,-0.4854155404800792,-0.4850205747834383,-0.4846257650231114,-0.4842311110760169,-0.4838366128192185,-0.4834422701299257,-0.48304808288549295,-0.48265405096341985,-0.4822601742413504,-0.48186645259707384,-0.4814728859085229,-0.48107947405377494,-0.48068621691105085,-0.48029311435871525,-0.4799001662752762,-0.4795073725393849,-0.4791147330298353,-0.4787222476255644,-0.47832991620565135,-0.4779377386493179,-0.4775457148359275,-0.4771538446449857,-0.4767621279561396,-0.4763705646491774,-0.47597915460402884,-0.47558789770076443,-0.4751967938195954,-0.47480584284087346,-0.47441504464509043,-0.4740243991128787,-0.47363390612500994,-0.47324356556239566,-0.4728533773060869,-0.47246334123727357,-0.4720734572372848,-0.4716837251875884,-0.47129414496979083,-0.4709047164656366,-0.4705154395570085,-0.4701263141259271,-0.4697373400545509,-0.4693485172251756,-0.4689598455202343,-0.46857132482229685,-0.4681829550140702,-0.467794735978398,-0.46740666759825994,-0.4670187497567722,-0.4666309823371867,-0.4662433652228912,-0.46585589829740925,-0.4654685814443994,-0.46508141454765545,-0.46469439749110614,-0.46430753015881476,-0.4639208124349796,-0.4635342442039327,-0.4631478253501404,-0.4627615557582029,-0.4623754353128541,-0.4619894638989614,-0.4616036414015254,-0.4612179677056798,-0.46083244269669105,-0.4604470662599584,-0.4600618382810134,-0.45967675864552,-0.459291827239274,-0.4589070439482032,-0.4585224086583669,-0.4581379212559558,-0.45775358162729207,-0.4573693896588287,-0.45698534523714945,-0.4566014482489688,-0.4562176985811316,-0.4558340961206131,-0.45545064075451835,-0.45506733237008223,-0.4546841708546694,-0.4543011560957737,-0.4539182879810185,-0.45353556639815606,-0.4531529912350674,-0.4527705623797622,-0.4523882797203785,-0.4520061431451829,-0.4516241525425697,-0.45124230780106117,-0.4508606088093073,-0.4504790554560853,-0.4500976476303,-0.4497163852209831,-0.44933526811729313,-0.44895429620851535,-0.4485734693840616,-0.4481927875334698,-0.4478122505464043,-0.447431858312655,-0.44705161072213784,-0.44667150766489405,-0.44629154903109025,-0.44591173471101847,-0.4455320645950953,-0.4451525385738624,-0.4447731565379858,-0.4443939183782559,-0.4440148239855878,-0.44363587325101983,-0.4432570660657148,-0.4428784023209588,-0.44249988190816136,-0.4421215047188557,-0.44174327064469754,-0.44136517957746585,-0.44098723140906226,-0.4406094260315107,-0.44023176333695785,-0.4398542432176722,-0.43947686556604426,-0.4390996302745864,-0.4387225372359326,-0.4383455863428381,-0.43796877748817964,-0.4375921105649548,-0.4372155854662821,-0.43683920208540067,-0.4364629603156701,-0.4360868600505707,-0.4357109011837024,-0.4353350836087854,-0.4349594072196596,-0.43458387191028436,-0.4342084775747388,-0.433833224107221,-0.4334581114020482,-0.43308313935365644,-0.4327083078566005,-0.43233361680555393,-0.43195906609530826,-0.4315846556207734,-0.4312103852769772,-0.4308362549590653,-0.4304622645623011,-0.4300884139820654,-0.4297147031138562,-0.42934113185328876,-0.42896770009609514,-0.4285944077381244,-0.42822125467534194,-0.42784824080382977,-0.427475366019786,-0.42710263021952477,-0.42673003329947634,-0.42635757515618655,-0.4259852556863169,-0.42561307478664406,-0.42524103235406013,-0.424869128285572,-0.42449736247830183,-0.4241257348294861,-0.423754245236476,-0.4233828935967369,-0.4230116798078486,-0.42264060376750484,-0.42226966537351307,-0.4218988645237946,-0.4215282011163841,-0.4211576750494297,-0.4207872862211926,-0.4204170345300472,-0.42004691987448045,-0.4196769421530922,-0.4193071012645946,-0.41893739710781247,-0.41856782958168254,-0.4181983985852536,-0.41782910401768625,-0.41745994577825285,-0.41709092376633716,-0.4167220378814345,-0.4163532880231512,-0.41598467409120454,-0.4156161959854229,-0.415247853605745,-0.41487964685222056,-0.4145115756250093,-0.4141436398243812,-0.4137758393507164,-0.4134081741045047,-0.413040643986346,-0.41267324889694945,-0.41230598873713364,-0.41193886340782654,-0.41157187281006485,-0.4112050168449947,-0.41083829541387057,-0.4104717084180557,-0.4101052557590217,-0.40973893733834843,-0.4093727530577241,-0.40900670281894463,-0.40864078652391383,-0.4082750040746431,-0.4079093553732514,-0.4075438403219651,-0.4071784588231176,-0.4068132107791493,-0.40644809609260757,-0.40608311466614644,-0.4057182664025264,-0.40535355120461464,-0.40498896897538417,-0.4046245196179144,-0.4042602030353905,-0.4038960191311034,-0.4035319678084499,-0.40316804897093206,-0.4028042625221572,-0.40244060836583784,-0.40207708640579154,-0.4017136965459409,-0.401350438690313,-0.4009873127430395,-0.4006243186083564,-0.40026145619060405,-0.39989872539422694,-0.3995361261237734,-0.39917365828389567,-0.39881132177934947,-0.39844911651499404,-0.3980870423957922,-0.39772509932680966,-0.39736328721321534,-0.397001605960281,-0.3966400554733812,-0.396278635657993,-0.3959173464196961,-0.3955561876641723,-0.3951951592972056,-0.3948342612246821,-0.39447349335258963,-0.3941128555870179,-0.3937523478341581,-0.39339197000030274,-0.3930317219918457,-0.3926716037152819,-0.3923116150772076,-0.39195175598431936,-0.39159202634341483,-0.39123242606139197,-0.3908729550452492,-0.39051361320208544,-0.39015440043909944,-0.3897953166635899,-0.38943636178295554,-0.3890775357046946,-0.388718838336405,-0.38836026958578407,-0.38800182936062816,-0.387643517568833,-0.387285334118393,-0.3869272789174018,-0.38656935187405145,-0.38621155289663256,-0.3858538818935342,-0.38549633877324363,-0.3851389234443463,-0.3847816358155258,-0.3844244757955633,-0.38406744329333775,-0.38371053821782575,-0.38335376047810116,-0.38299710998333536,-0.38264058664279677,-0.38228419036585065,-0.38192792106195944,-0.3815717786406819,-0.38121576301167404,-0.3808598740846877,-0.3805041117695712,-0.3801484759762693,-0.3797929666148223,-0.37943758359536717,-0.3790823268281359,-0.3787271962234565,-0.3783721916917525,-0.37801731314354253,-0.37766256048944086,-0.37730793364015647,-0.3769534325064935,-0.37659905699935087,-0.37624480702972224,-0.3758906825086956,-0.37553668334745377,-0.3751828094572736,-0.37482906074952604,-0.37447543713567627,-0.3741219385272831,-0.3737685648359994,-0.3734153159735714,-0.3730621918518391,-0.37270919238273553,-0.3723563174782871,-0.37200356705061355,-0.37165094101192725,-0.3712984392745335,-0.37094606175083034,-0.37059380835330835,-0.3702416789945507,-0.3698896735872327,-0.3695377920441218,-0.3691860342780778,-0.368834400202052,-0.36848288972908794,-0.3681315027723205,-0.3677802392449762,-0.3674290990603731,-0.36707808213192017,-0.366727188373118,-0.36637641769755797,-0.3660257700189223,-0.36567524525098405,-0.36532484330760695,-0.36497456410274515,-0.3646244075504434,-0.3642743735648365,-0.3639244620601494,-0.36357467295069723,-0.3632250061508847,-0.3628754615752066,-0.36252603913824727,-0.3621767387546805,-0.3618275603392693,-0.3614785038068662,-0.3611295690724128,-0.3607807560509397,-0.3604320646575663,-0.3600834948075008,-0.3597350464160401,-0.3593867193985696,-0.35903851367056305,-0.3586904291475824,-0.35834246574527795,-0.3579946233793877,-0.35764690196573795,-0.35729930142024247,-0.3569518216589028,-0.35660446259780804,-0.35625722415313454,-0.3559101062411461,-0.35556310877819375,-0.35521623168071537,-0.3548694748652359,-0.354522838248367,-0.354176321746807,-0.3538299252773411,-0.35348364875684046,-0.353137492102263,-0.35279145523065253,-0.3524455380591391,-0.35209974050493875,-0.3517540624853533,-0.35140850391777034,-0.3510630647196631,-0.3507177448085901,-0.35037254410219554,-0.3500274625182088,-0.3496824999744442,-0.3493376563888013,-0.3489929316792645,-0.3486483257639029,-0.34830383856087044,-0.34795946998840555,-0.3476152199648309,-0.3472710884085538,-0.34692707523806565,-0.3465831803719419],"x":[-0.41422,-0.413976873747495,-0.41373374749499,-0.413490621242485,-0.41324749498998,-0.4130043687374749,-0.4127612424849699,-0.4125181162324649,-0.4122749899799599,-0.41203186372745493,-0.4117887374749499,-0.4115456112224449,-0.4113024849699399,-0.4110593587174349,-0.4108162324649299,-0.4105731062124249,-0.4103299799599198,-0.4100868537074148,-0.4098437274549098,-0.4096006012024048,-0.4093574749498998,-0.40911434869739477,-0.40887122244488977,-0.40862809619238477,-0.40838496993987977,-0.4081418436873748,-0.4078987174348697,-0.4076555911823647,-0.4074124649298597,-0.4071693386773547,-0.4069262124248497,-0.40668308617234467,-0.40643995991983967,-0.40619683366733467,-0.40595370741482967,-0.40571058116232467,-0.4054674549098196,-0.4052243286573146,-0.4049812024048096,-0.4047380761523046,-0.4044949498997996,-0.4042518236472946,-0.40400869739478956,-0.40376557114228456,-0.40352244488977956,-0.40327931863727456,-0.40303619238476956,-0.4027930661322645,-0.4025499398797595,-0.4023068136272545,-0.4020636873747495,-0.4018205611222445,-0.40157743486973946,-0.40133430861723446,-0.40109118236472946,-0.40084805611222446,-0.40060492985971946,-0.4003618036072144,-0.4001186773547094,-0.3998755511022044,-0.3996324248496994,-0.3993892985971944,-0.39914617234468935,-0.39890304609218435,-0.39865991983967936,-0.39841679358717436,-0.39817366733466936,-0.3979305410821643,-0.3976874148296593,-0.3974442885771543,-0.3972011623246493,-0.3969580360721443,-0.3967149098196393,-0.39647178356713425,-0.39622865731462925,-0.39598553106212425,-0.39574240480961925,-0.39549927855711425,-0.3952561523046092,-0.3950130260521042,-0.3947698997995992,-0.3945267735470942,-0.3942836472945892,-0.39404052104208415,-0.39379739478957915,-0.39355426853707415,-0.39331114228456915,-0.39306801603206415,-0.3928248897795591,-0.3925817635270541,-0.3923386372745491,-0.3920955110220441,-0.3918523847695391,-0.39160925851703404,-0.39136613226452904,-0.39112300601202404,-0.39087987975951904,-0.39063675350701405,-0.39039362725450905,-0.390150501002004,-0.389907374749499,-0.389664248496994,-0.389421122244489,-0.389177995991984,-0.38893486973947894,-0.38869174348697394,-0.38844861723446894,-0.38820549098196394,-0.38796236472945894,-0.3877192384769539,-0.3874761122244489,-0.3872329859719439,-0.3869898597194389,-0.3867467334669339,-0.38650360721442883,-0.38626048096192384,-0.38601735470941884,-0.38577422845691384,-0.38553110220440884,-0.3852879759519038,-0.3850448496993988,-0.3848017234468938,-0.3845585971943888,-0.3843154709418838,-0.38407234468937873,-0.38382921843687373,-0.38358609218436873,-0.38334296593186373,-0.38309983967935873,-0.38285671342685373,-0.3826135871743487,-0.3823704609218437,-0.3821273346693387,-0.3818842084168337,-0.3816410821643287,-0.3813979559118236,-0.38115482965931863,-0.38091170340681363,-0.38066857715430863,-0.38042545090180363,-0.3801823246492986,-0.3799391983967936,-0.3796960721442886,-0.3794529458917836,-0.3792098196392786,-0.3789666933867735,-0.3787235671342685,-0.3784804408817635,-0.3782373146292585,-0.3779941883767535,-0.37775106212424847,-0.37750793587174347,-0.3772648096192385,-0.3770216833667335,-0.3767785571142285,-0.3765354308617235,-0.3762923046092184,-0.3760491783567134,-0.3758060521042084,-0.3755629258517034,-0.3753197995991984,-0.37507667334669337,-0.37483354709418837,-0.37459042084168337,-0.37434729458917837,-0.37410416833667337,-0.3738610420841683,-0.3736179158316633,-0.3733747895791583,-0.3731316633266533,-0.3728885370741483,-0.37264541082164326,-0.37240228456913826,-0.37215915831663327,-0.37191603206412827,-0.37167290581162327,-0.3714297795591182,-0.3711866533066132,-0.3709435270541082,-0.3707004008016032,-0.3704572745490982,-0.37021414829659316,-0.36997102204408816,-0.36972789579158316,-0.36948476953907816,-0.36924164328657316,-0.36899851703406816,-0.3687553907815631,-0.3685122645290581,-0.3682691382765531,-0.3680260120240481,-0.3677828857715431,-0.36753975951903806,-0.36729663326653306,-0.36705350701402806,-0.36681038076152306,-0.36656725450901806,-0.366324128256513,-0.366081002004008,-0.365837875751503,-0.365594749498998,-0.365351623246493,-0.36510849699398795,-0.36486537074148295,-0.36462224448897795,-0.36437911823647295,-0.36413599198396795,-0.3638928657314629,-0.3636497394789579,-0.3634066132264529,-0.3631634869739479,-0.3629203607214429,-0.36267723446893785,-0.36243410821643285,-0.36219098196392785,-0.36194785571142285,-0.36170472945891785,-0.36146160320641285,-0.3612184769539078,-0.3609753507014028,-0.3607322244488978,-0.3604890981963928,-0.3602459719438878,-0.36000284569138274,-0.35975971943887775,-0.35951659318637275,-0.35927346693386775,-0.35903034068136275,-0.3587872144288577,-0.3585440881763527,-0.3583009619238477,-0.3580578356713427,-0.3578147094188377,-0.35757158316633264,-0.35732845691382764,-0.35708533066132264,-0.35684220440881764,-0.35659907815631264,-0.3563559519038076,-0.3561128256513026,-0.3558696993987976,-0.3556265731462926,-0.3553834468937876,-0.3551403206412826,-0.35489719438877754,-0.35465406813627254,-0.35441094188376754,-0.35416781563126254,-0.35392468937875754,-0.3536815631262525,-0.3534384368737475,-0.3531953106212425,-0.3529521843687375,-0.3527090581162325,-0.35246593186372743,-0.35222280561122243,-0.35197967935871743,-0.35173655310621244,-0.35149342685370744,-0.3512503006012024,-0.3510071743486974,-0.3507640480961924,-0.3505209218436874,-0.3502777955911824,-0.35003466933867733,-0.34979154308617233,-0.34954841683366733,-0.34930529058116233,-0.34906216432865733,-0.3488190380761523,-0.3485759118236473,-0.3483327855711423,-0.3480896593186373,-0.3478465330661323,-0.3476034068136273,-0.3473602805611222,-0.3471171543086172,-0.3468740280561122,-0.3466309018036072,-0.34638777555110223,-0.3461446492985972,-0.3459015230460922,-0.3456583967935872,-0.3454152705410822,-0.3451721442885772,-0.3449290180360721,-0.3446858917835671,-0.3444427655310621,-0.3441996392785571,-0.3439565130260521,-0.34371338677354707,-0.34347026052104207,-0.34322713426853707,-0.34298400801603207,-0.34274088176352707,-0.342497755511022,-0.342254629258517,-0.342011503006012,-0.341768376753507,-0.341525250501002,-0.341282124248497,-0.34103899799599197,-0.34079587174348697,-0.34055274549098197,-0.34030961923847697,-0.34006649298597197,-0.3398233667334669,-0.3395802404809619,-0.3393371142284569,-0.3390939879759519,-0.3388508617234469,-0.33860773547094186,-0.33836460921843686,-0.33812148296593186,-0.33787835671342686,-0.33763523046092186,-0.3373921042084168,-0.3371489779559118,-0.3369058517034068,-0.3366627254509018,-0.3364195991983968,-0.33617647294589176,-0.33593334669338676,-0.33569022044088176,-0.33544709418837676,-0.33520396793587176,-0.3349608416833667,-0.3347177154308617,-0.3344745891783567,-0.3342314629258517,-0.3339883366733467,-0.3337452104208417,-0.33350208416833665,-0.33325895791583166,-0.33301583166332666,-0.33277270541082166,-0.33252957915831666,-0.3322864529058116,-0.3320433266533066,-0.3318002004008016,-0.3315570741482966,-0.3313139478957916,-0.33107082164328655,-0.33082769539078155,-0.33058456913827655,-0.33034144288577155,-0.33009831663326655,-0.3298551903807615,-0.3296120641282565,-0.3293689378757515,-0.3291258116232465,-0.3288826853707415,-0.32863955911823645,-0.32839643286573145,-0.32815330661322645,-0.32791018036072145,-0.32766705410821645,-0.32742392785571145,-0.3271808016032064,-0.3269376753507014,-0.3266945490981964,-0.3264514228456914,-0.3262082965931864,-0.32596517034068134,-0.32572204408817634,-0.32547891783567134,-0.32523579158316634,-0.32499266533066135,-0.3247495390781563,-0.3245064128256513,-0.3242632865731463,-0.3240201603206413,-0.3237770340681363,-0.32353390781563124,-0.32329078156312624,-0.32304765531062124,-0.32280452905811624,-0.32256140280561124,-0.3223182765531062,-0.3220751503006012,-0.3218320240480962,-0.3215888977955912,-0.3213457715430862,-0.32110264529058113,-0.32085951903807614,-0.32061639278557114,-0.32037326653306614,-0.32013014028056114,-0.31988701402805614,-0.3196438877755511,-0.3194007615230461,-0.3191576352705411,-0.3189145090180361,-0.3186713827655311,-0.31842825651302603,-0.31818513026052103,-0.31794200400801603,-0.31769887775551103,-0.31745575150300603,-0.317212625250501,-0.316969498997996,-0.316726372745491,-0.316483246492986,-0.316240120240481,-0.3159969939879759,-0.31575386773547093,-0.31551074148296593,-0.31526761523046093,-0.31502448897795593,-0.3147813627254509,-0.3145382364729459,-0.3142951102204409,-0.3140519839679359,-0.3138088577154309,-0.3135657314629259,-0.3133226052104208,-0.3130794789579158,-0.3128363527054108,-0.3125932264529058,-0.3123501002004008,-0.31210697394789577,-0.3118638476953908,-0.3116207214428858,-0.3113775951903808,-0.3111344689378758,-0.3108913426853707,-0.3106482164328657,-0.3104050901803607,-0.3101619639278557,-0.3099188376753507,-0.30967571142284567,-0.30943258517034067,-0.30918945891783567,-0.30894633266533067,-0.30870320641282567,-0.3084600801603206,-0.3082169539078156,-0.3079738276553106,-0.3077307014028056,-0.3074875751503006,-0.30724444889779556,-0.30700132264529056,-0.30675819639278556,-0.30651507014028057,-0.30627194388777557,-0.30602881763527057,-0.3057856913827655,-0.3055425651302605,-0.3052994388777555,-0.3050563126252505,-0.3048131863727455,-0.30457006012024046,-0.30432693386773546,-0.30408380761523046,-0.30384068136272546,-0.30359755511022046,-0.3033544288577154,-0.3031113026052104,-0.3028681763527054,-0.3026250501002004,-0.3023819238476954,-0.30213879759519036,-0.30189567134268536,-0.30165254509018036,-0.30140941883767536,-0.30116629258517036,-0.3009231663326653,-0.3006800400801603,-0.3004369138276553,-0.3001937875751503,-0.2999506613226453,-0.2997075350701403,-0.29946440881763525,-0.29922128256513025,-0.29897815631262525,-0.29873503006012025,-0.29849190380761526,-0.2982487775551102,-0.2980056513026052,-0.2977625250501002,-0.2975193987975952,-0.2972762725450902,-0.29703314629258515,-0.29679002004008015,-0.29654689378757515,-0.29630376753507015,-0.29606064128256515,-0.2958175150300601,-0.2955743887775551,-0.2953312625250501,-0.2950881362725451,-0.2948450100200401,-0.29460188376753504,-0.29435875751503005,-0.29411563126252505,-0.29387250501002005,-0.29362937875751505,-0.29338625250501,-0.293143126252505,-0.2929]}

},{}],91:[function(require,module,exports){
module.exports={"expected":[0.25688775727837054,0.25707578682107474,0.25726378101531644,0.25745173987438386,0.25763966341155753,0.2578275516401105,0.25801540457330857,0.2582032222244099,0.25839100460666514,0.25857875173331757,0.258766463617603,0.25895414027274977,0.2591417817119787,0.25932938794850335,0.2595169589955297,0.25970449486625624,0.2598919955738742,0.26007946113156744,0.26026689155251215,0.26045428684987726,0.26064164703682435,0.26082897212650746,0.2610162621320734,0.26120351706666156,0.2613907369434038,0.2615779217754247,0.2617650715758416,0.26195218635776435,0.2621392661342954,0.26232631091852987,0.2625133207235556,0.26270029556245306,0.2628872354482954,0.26307414039414834,0.2632610104130705,0.2634478455181129,0.2636346457223194,0.26382141103872664,0.26400814148036367,0.2641948370602526,0.2643814977914079,0.264568123686837,0.26475471475954004,0.26494127102250975,0.26512779248873164,0.265314279171184,0.2655007310828378,0.2656871482366568,0.2658735306455975,0.2660598783226092,0.2662461912806338,0.26643246953260624,0.2666187130914539,0.2668049219700973,0.26699109618144945,0.2671772357384163,0.2673633406538965,0.26754941094078155,0.26773544661195586,0.2679214476802964,0.26810741415867334,0.26829334605994914,0.2684792433969796,0.26866510618261297,0.26885093442969066,0.26903672815104673,0.269222487359508,0.2694082120678944,0.26959390228901847,0.2697795580356859,0.26996517932069486,0.27015076615683675,0.2703363185568957,0.2705218365336487,0.27070732009986564,0.27089276926830946,0.27107818405173567,0.271263564462893,0.271448910514523,0.2716342222193601,0.27181949959013174,0.27200474263955804,0.2721899513803523,0.2723751258252207,0.2725602659868624,0.27274537187796943,0.2729304435112267,0.27311548089931226,0.273300484054897,0.27348545299064486,0.2736703877192127,0.2738552882532504,0.27404015460540077,0.27422498678829954,0.2744097848145757,0.27459454869685096,0.2747792784477402,0.27496397407985124,0.2751486356057849,0.27533326303813505,0.27551785638948867,0.2757024156724256,0.2758869408995189,0.2760714320833344,0.2762558892364313,0.2764403123713617,0.27662470150067076,0.27680905663689664,0.2769933777925706,0.2771776649802171,0.27736191821235356,0.27754613750149054,0.2777303228601315,0.2779144743007732,0.2780985918359055,0.2782826754780113,0.2784667252395665,0.2786507411330404,0.278834723170895,0.27901867136558584,0.27920258572956136,0.27938646627526315,0.279570313015126,0.27975412596157784,0.27993790512703964,0.2801216505239257,0.28030536216464325,0.280489040061593,0.2806726842271684,0.2808562946737565,0.2810398714137373,0.28122341445948407,0.2814069238233632,0.2815903995177342,0.28177384155494994,0.28195724994735644,0.28214062470729295,0.2823239658470919,0.2825072733790789,0.28269054731557275,0.2828737876688857,0.283056994451323,0.28324016767518323,0.2834233073527582,0.283606413496333,0.2837894861181859,0.28397252523058847,0.28415553084580564,0.2843385029760954,0.2845214416337092,0.28470434683089163,0.2848872185798807,0.28507005689290754,0.2852528617821968,0.2854356332599661,0.28561837133842677,0.28580107602978305,0.2859837473462328,0.28616638529996696,0.28634898990317,0.28653156116801953,0.2867140991066866,0.28689660373133563,0.28707907505412433,0.2872615130872037,0.28744391784271817,0.28762628933280543,0.2878086275695967,0.2879909325652164,0.2881732043317824,0.2883554428814059,0.2885376482261916,0.2887198203782374,0.2889019593496347,0.2890840651524684,0.28926613779881644,0.2894481773007506,0.2896301836703358,0.2898121569196304,0.28999409706068635,0.2901760041055487,0.2903578780662563,0.29053971895484115,0.2907215267833288,0.29090330156373834,0.29108504330808205,0.29126675202836594,0.29144842773658924,0.2916300704447448,0.29181168016481895,0.2919932569087913,0.29217480068863516,0.2923563115163172,0.29253778940379754,0.29271923436302993,0.2929006464059615,0.2930820255445329,0.29326337179067824,0.2934446851563253,0.29362596565339527,0.29380721329380277,0.293988428089456,0.29416961005225684,0.29435075919410053,0.2945318755268758,0.2947129590624652,0.29489400981274444,0.29507502778958306,0.2952560130048441,0.29543696547038417,0.2956178851980534,0.29579877219969536,0.2959796264871475,0.29616044807224057,0.2963412369667991,0.2965219931826411,0.29670271673157816,0.2968834076254156,0.29706406587595213,0.29724469149498023,0.297425284494286,0.297605844885649,0.29778637268084257,0.2979668678916336,0.29814733052978265,0.2983277606070439,0.29850815813516507,0.2986885231258877,0.29886885559094684,0.29904915554207123,0.2992294229909833,0.29940965794939917,0.2995898604290285,0.29977003044157474,0.299950167998735,0.3001302731121999,0.30031034579365407,0.3004903860547755,0.30067039390723616,0.30085036936270143,0.3010303124328306,0.3012102231292767,0.3013901014636862,0.3015699474476996,0.30174976109295093,0.30192954241106806,0.3021092914136725,0.3022890081123794,0.30246869251879793,0.30264834464453083,0.30282796450117455,0.3030075521003194,0.3031871074535494,0.3033666305724422,0.3035461214685694,0.3037255801534964,0.3039050066387822,0.3040844009359797,0.30426376305663555,0.30444309301229017,0.3046223908144778,0.3048016564747264,0.3049808900045579,0.30516009141548783,0.30533926071902573,0.3055183979266748,0.3056975030499321,0.3058765761002886,0.306055617089229,0.3062346260282318,0.30641360292876946,0.3065925478023082,0.30677146066030814,0.3069503415142231,0.307129190375501,0.30730800725558344,0.3074867921659059,0.30766554511789784,0.3078442661229824,0.3080229551925768,0.30820161233809196,0.3083802375709328,0.3085588309024982,0.3087373923441807,0.30891592190736694,0.30909441960343736,0.3092728854437664,0.3094513194397223,0.30962972160266733,0.3098080919439576,0.3099864304749431,0.31016473720696786,0.31034301215136983,0.3105212553194808,0.31069946672262666,0.310877646372127,0.31105579427929564,0.3112339104554402,0.3114119949118623,0.31159004765985737,0.3117680687107151,0.31194605807571896,0.3121240157661464,0.3123019417932689,0.31247983616835195,0.31265769890265493,0.31283553000743125,0.3130133294939284,0.3131910973733878,0.3133688336570449,0.313546538356129,0.31372421148186375,0.31390185304546653,0.31407946305814893,0.31425704153111633,0.3144345884755684,0.31461210390269867,0.3147895878236948,0.3149670402497386,0.3151444611920056,0.3153218506616657,0.3154992086698826,0.3156765352278144,0.3158538303466129,0.3160310940374243,0.3162083263113885,0.3163855271796398,0.3165626966533065,0.31673983474351086,0.31691694146136945,0.3170940168179927,0.31727106082448525,0.31744807349194587,0.3176250548314674,0.3178020048541369,0.3179789235710353,0.3181558109932378,0.3183326671318138,0.3185094919978267,0.31868628560233414,0.31886304795638776,0.31903977907103337,0.3192164789573111,0.31939314762625504,0.3195697850888935,0.3197463913562489,0.3199229664393379,0.3200995103491712,0.32027602309675396,0.32045250469308506,0.320628955149158,0.32080537447596014,0.3209817626844732,0.321158119785673,0.3213344457905297,0.3215107407100075,0.3216870045550648,0.32186323733665434,0.32203943906572297,0.32221560975321173,0.322391749410056,0.3225678580471853,0.32274393567552334,0.3229199823059881,0.32309599794949184,0.3232719826169411,0.3234479363192364,0.32362385906727287,0.3237997508719396,0.32397561174412,0.3241514416946919,0.32432724073452723,0.32450300887449224,0.32467874612544745,0.3248544524982477,0.3250301280037419,0.3252057726527736,0.32538138645618037,0.32555696942479406,0.325732521569441,0.3259080429009417,0.326083533430111,0.32625899316775797,0.3264344221246861,0.32660982031169317,0.3267851877395712,0.3269605244191068,0.3271358303610804,0.32731110557626725,0.32748635007543675,0.3276615638693526,0.3278367469687729,0.3280118993844501,0.32818702112713083,0.32836211220755646,0.3285371726364623,0.3287122024245784,0.3288872015826288,0.32906217012133215,0.32923710805140144,0.32941201538354403,0.32958689212846165,0.32976173829685035,0.3299365538994007,0.3301113389467976,0.3302860934497204,0.3304608174188427,0.33063551086483267,0.3308101737983528,0.3309848062300601,0.3311594081706058,0.3313339796306357,0.33150852062079017,0.3316830311517036,0.3318575112340052,0.33203196087831843,0.3322063800952612,0.33238076889544593,0.33255512728947945,0.33272945528796305,0.33290375290149243,0.33307802014065785,0.333252257016044,0.3334264635382299,0.3336006397177893,0.3337747855652902,0.33394890109129516,0.3341229863063613,0.3342970412210401,0.33447106584587755,0.33464506019141427,0.33481902426818516,0.33499295808671986,0.3351668616575424,0.33534073499117123,0.3355145780981194,0.3356883909888946,0.3358621736739988,0.33603592616392874,0.3362096484691755,0.33638334060022473,0.3365570025675567,0.33673063438164624,0.33690423605296255,0.3370778075919695,0.33725134900912557,0.3374248603148836,0.3375983415196912,0.3377717926339905,0.33794521366821806,0.3381186046328051,0.3382919655381775,0.33846529639475553,0.3386385972129543,0.3388118680031833,0.3389851087758466,0.33915831954134296,0.33933150031006576,0.3395046510924029,0.3396777718987369,0.33985086273944487,0.34002392362489864,0.3401969545654645,0.34036995557150357,0.3405429266533714,0.34071586782141816,0.3408887790859888,0.3410616604574228,0.3412345119460543,0.3414073335622122,0.34158012531621973,0.34175288721839514,0.3419256192790511,0.342098321508495,0.342270993917029,0.3424436365149496,0.3426162493125483,0.34278883232011126,0.3429613855479191,0.3431339090062473,0.34330640270536583,0.3434788666555396,0.34365130086702805,0.34382370535008533,0.3439960801149603,0.3441684251718965,0.3443407405311323,0.3445130262029005,0.34468528219742894,0.34485750852494,0.3450297051956508,0.34520187221977316,0.3453740096075136,0.3455461173690735,0.3457181955146489,0.3458902440544306,0.346062262998604,0.3462342523573494,0.3464062121408419,0.34657814235925116],"x":[0.2929,0.293143126252505,0.29338625250501,0.29362937875751505,0.29387250501002005,0.29411563126252505,0.29435875751503005,0.29460188376753504,0.2948450100200401,0.2950881362725451,0.2953312625250501,0.2955743887775551,0.2958175150300601,0.29606064128256515,0.29630376753507015,0.29654689378757515,0.29679002004008015,0.29703314629258515,0.2972762725450902,0.2975193987975952,0.2977625250501002,0.2980056513026052,0.2982487775551102,0.29849190380761526,0.29873503006012025,0.29897815631262525,0.29922128256513025,0.29946440881763525,0.2997075350701403,0.2999506613226453,0.3001937875751503,0.3004369138276553,0.3006800400801603,0.3009231663326653,0.30116629258517036,0.30140941883767536,0.30165254509018036,0.30189567134268536,0.30213879759519036,0.3023819238476954,0.3026250501002004,0.3028681763527054,0.3031113026052104,0.3033544288577154,0.30359755511022046,0.30384068136272546,0.30408380761523046,0.30432693386773546,0.30457006012024046,0.3048131863727455,0.3050563126252505,0.3052994388777555,0.3055425651302605,0.3057856913827655,0.30602881763527057,0.30627194388777557,0.30651507014028057,0.30675819639278556,0.30700132264529056,0.30724444889779556,0.3074875751503006,0.3077307014028056,0.3079738276553106,0.3082169539078156,0.3084600801603206,0.30870320641282567,0.30894633266533067,0.30918945891783567,0.30943258517034067,0.30967571142284567,0.3099188376753507,0.3101619639278557,0.3104050901803607,0.3106482164328657,0.3108913426853707,0.3111344689378758,0.3113775951903808,0.3116207214428858,0.3118638476953908,0.31210697394789577,0.3123501002004008,0.3125932264529058,0.3128363527054108,0.3130794789579158,0.3133226052104208,0.3135657314629259,0.3138088577154309,0.3140519839679359,0.3142951102204409,0.3145382364729459,0.3147813627254509,0.31502448897795593,0.31526761523046093,0.31551074148296593,0.31575386773547093,0.3159969939879759,0.316240120240481,0.316483246492986,0.316726372745491,0.316969498997996,0.317212625250501,0.31745575150300603,0.31769887775551103,0.31794200400801603,0.31818513026052103,0.31842825651302603,0.3186713827655311,0.3189145090180361,0.3191576352705411,0.3194007615230461,0.3196438877755511,0.31988701402805614,0.32013014028056114,0.32037326653306614,0.32061639278557114,0.32085951903807614,0.32110264529058113,0.3213457715430862,0.3215888977955912,0.3218320240480962,0.3220751503006012,0.3223182765531062,0.32256140280561124,0.32280452905811624,0.32304765531062124,0.32329078156312624,0.32353390781563124,0.3237770340681363,0.3240201603206413,0.3242632865731463,0.3245064128256513,0.3247495390781563,0.32499266533066135,0.32523579158316634,0.32547891783567134,0.32572204408817634,0.32596517034068134,0.3262082965931864,0.3264514228456914,0.3266945490981964,0.3269376753507014,0.3271808016032064,0.32742392785571145,0.32766705410821645,0.32791018036072145,0.32815330661322645,0.32839643286573145,0.32863955911823645,0.3288826853707415,0.3291258116232465,0.3293689378757515,0.3296120641282565,0.3298551903807615,0.33009831663326655,0.33034144288577155,0.33058456913827655,0.33082769539078155,0.33107082164328655,0.3313139478957916,0.3315570741482966,0.3318002004008016,0.3320433266533066,0.3322864529058116,0.33252957915831666,0.33277270541082166,0.33301583166332666,0.33325895791583166,0.33350208416833665,0.3337452104208417,0.3339883366733467,0.3342314629258517,0.3344745891783567,0.3347177154308617,0.3349608416833667,0.33520396793587176,0.33544709418837676,0.33569022044088176,0.33593334669338676,0.33617647294589176,0.3364195991983968,0.3366627254509018,0.3369058517034068,0.3371489779559118,0.3373921042084168,0.33763523046092186,0.33787835671342686,0.33812148296593186,0.33836460921843686,0.33860773547094186,0.3388508617234469,0.3390939879759519,0.3393371142284569,0.3395802404809619,0.3398233667334669,0.34006649298597197,0.34030961923847697,0.34055274549098197,0.34079587174348697,0.34103899799599197,0.341282124248497,0.341525250501002,0.341768376753507,0.342011503006012,0.342254629258517,0.342497755511022,0.34274088176352707,0.34298400801603207,0.34322713426853707,0.34347026052104207,0.34371338677354707,0.3439565130260521,0.3441996392785571,0.3444427655310621,0.3446858917835671,0.3449290180360721,0.3451721442885772,0.3454152705410822,0.3456583967935872,0.3459015230460922,0.3461446492985972,0.34638777555110223,0.3466309018036072,0.3468740280561122,0.3471171543086172,0.3473602805611222,0.3476034068136273,0.3478465330661323,0.3480896593186373,0.3483327855711423,0.3485759118236473,0.3488190380761523,0.34906216432865733,0.34930529058116233,0.34954841683366733,0.34979154308617233,0.35003466933867733,0.3502777955911824,0.3505209218436874,0.3507640480961924,0.3510071743486974,0.3512503006012024,0.35149342685370744,0.35173655310621244,0.35197967935871743,0.35222280561122243,0.35246593186372743,0.3527090581162325,0.3529521843687375,0.3531953106212425,0.3534384368737475,0.3536815631262525,0.35392468937875754,0.35416781563126254,0.35441094188376754,0.35465406813627254,0.35489719438877754,0.3551403206412826,0.3553834468937876,0.3556265731462926,0.3558696993987976,0.3561128256513026,0.3563559519038076,0.35659907815631264,0.35684220440881764,0.35708533066132264,0.35732845691382764,0.35757158316633264,0.3578147094188377,0.3580578356713427,0.3583009619238477,0.3585440881763527,0.3587872144288577,0.35903034068136275,0.35927346693386775,0.35951659318637275,0.35975971943887775,0.36000284569138274,0.3602459719438878,0.3604890981963928,0.3607322244488978,0.3609753507014028,0.3612184769539078,0.36146160320641285,0.36170472945891785,0.36194785571142285,0.36219098196392785,0.36243410821643285,0.36267723446893785,0.3629203607214429,0.3631634869739479,0.3634066132264529,0.3636497394789579,0.3638928657314629,0.36413599198396795,0.36437911823647295,0.36462224448897795,0.36486537074148295,0.36510849699398795,0.365351623246493,0.365594749498998,0.365837875751503,0.366081002004008,0.366324128256513,0.36656725450901806,0.36681038076152306,0.36705350701402806,0.36729663326653306,0.36753975951903806,0.3677828857715431,0.3680260120240481,0.3682691382765531,0.3685122645290581,0.3687553907815631,0.36899851703406816,0.36924164328657316,0.36948476953907816,0.36972789579158316,0.36997102204408816,0.37021414829659316,0.3704572745490982,0.3707004008016032,0.3709435270541082,0.3711866533066132,0.3714297795591182,0.37167290581162327,0.37191603206412827,0.37215915831663327,0.37240228456913826,0.37264541082164326,0.3728885370741483,0.3731316633266533,0.3733747895791583,0.3736179158316633,0.3738610420841683,0.37410416833667337,0.37434729458917837,0.37459042084168337,0.37483354709418837,0.37507667334669337,0.3753197995991984,0.3755629258517034,0.3758060521042084,0.3760491783567134,0.3762923046092184,0.3765354308617235,0.3767785571142285,0.3770216833667335,0.3772648096192385,0.37750793587174347,0.37775106212424847,0.3779941883767535,0.3782373146292585,0.3784804408817635,0.3787235671342685,0.3789666933867735,0.3792098196392786,0.3794529458917836,0.3796960721442886,0.3799391983967936,0.3801823246492986,0.38042545090180363,0.38066857715430863,0.38091170340681363,0.38115482965931863,0.3813979559118236,0.3816410821643287,0.3818842084168337,0.3821273346693387,0.3823704609218437,0.3826135871743487,0.38285671342685373,0.38309983967935873,0.38334296593186373,0.38358609218436873,0.38382921843687373,0.38407234468937873,0.3843154709418838,0.3845585971943888,0.3848017234468938,0.3850448496993988,0.3852879759519038,0.38553110220440884,0.38577422845691384,0.38601735470941884,0.38626048096192384,0.38650360721442883,0.3867467334669339,0.3869898597194389,0.3872329859719439,0.3874761122244489,0.3877192384769539,0.38796236472945894,0.38820549098196394,0.38844861723446894,0.38869174348697394,0.38893486973947894,0.389177995991984,0.389421122244489,0.389664248496994,0.389907374749499,0.390150501002004,0.39039362725450905,0.39063675350701405,0.39087987975951904,0.39112300601202404,0.39136613226452904,0.39160925851703404,0.3918523847695391,0.3920955110220441,0.3923386372745491,0.3925817635270541,0.3928248897795591,0.39306801603206415,0.39331114228456915,0.39355426853707415,0.39379739478957915,0.39404052104208415,0.3942836472945892,0.3945267735470942,0.3947698997995992,0.3950130260521042,0.3952561523046092,0.39549927855711425,0.39574240480961925,0.39598553106212425,0.39622865731462925,0.39647178356713425,0.3967149098196393,0.3969580360721443,0.3972011623246493,0.3974442885771543,0.3976874148296593,0.3979305410821643,0.39817366733466936,0.39841679358717436,0.39865991983967936,0.39890304609218435,0.39914617234468935,0.3993892985971944,0.3996324248496994,0.3998755511022044,0.4001186773547094,0.4003618036072144,0.40060492985971946,0.40084805611222446,0.40109118236472946,0.40133430861723446,0.40157743486973946,0.4018205611222445,0.4020636873747495,0.4023068136272545,0.4025499398797595,0.4027930661322645,0.40303619238476956,0.40327931863727456,0.40352244488977956,0.40376557114228456,0.40400869739478956,0.4042518236472946,0.4044949498997996,0.4047380761523046,0.4049812024048096,0.4052243286573146,0.4054674549098196,0.40571058116232467,0.40595370741482967,0.40619683366733467,0.40643995991983967,0.40668308617234467,0.4069262124248497,0.4071693386773547,0.4074124649298597,0.4076555911823647,0.4078987174348697,0.4081418436873748,0.40838496993987977,0.40862809619238477,0.40887122244488977,0.40911434869739477,0.4093574749498998,0.4096006012024048,0.4098437274549098,0.4100868537074148,0.4103299799599198,0.4105731062124249,0.4108162324649299,0.4110593587174349,0.4113024849699399,0.4115456112224449,0.4117887374749499,0.41203186372745493,0.4122749899799599,0.4125181162324649,0.4127612424849699,0.4130043687374749,0.41324749498998,0.413490621242485,0.41373374749499,0.413976873747495,0.41422]}

},{}],92:[function(require,module,exports){
module.exports={"expected":[-1.8626451509656805e-9,-1.8589123952598974e-9,-1.8551796395541282e-9,-1.8514468838483728e-9,-1.8477141281426315e-9,-1.8439813724369043e-9,-1.8402486167311909e-9,-1.8365158610254913e-9,-1.8327831053198058e-9,-1.829050349614134e-9,-1.8253175939084762e-9,-1.8215848382028325e-9,-1.8178520824972027e-9,-1.814119326791587e-9,-1.810386571085985e-9,-1.8066538153803967e-9,-1.8029210596748227e-9,-1.7991883039692625e-9,-1.7954555482637162e-9,-1.791722792558184e-9,-1.7879900368526654e-9,-1.784257281147161e-9,-1.7805245254416706e-9,-1.776791769736194e-9,-1.7730590140307314e-9,-1.7693262583252827e-9,-1.7655935026198477e-9,-1.7618607469144269e-9,-1.75812799120902e-9,-1.754395235503627e-9,-1.750662479798248e-9,-1.746929724092883e-9,-1.7431969683875316e-9,-1.7394642126821944e-9,-1.7357314569768712e-9,-1.7319987012715617e-9,-1.7282659455662664e-9,-1.7245331898609846e-9,-1.720800434155717e-9,-1.7170676784504636e-9,-1.713334922745224e-9,-1.7096021670399982e-9,-1.7058694113347863e-9,-1.7021366556295882e-9,-1.6984038999244042e-9,-1.6946711442192343e-9,-1.6909383885140782e-9,-1.687205632808936e-9,-1.6834728771038078e-9,-1.6797401213986933e-9,-1.676007365693593e-9,-1.6722746099885067e-9,-1.6685418542834341e-9,-1.6648090985783756e-9,-1.6610763428733308e-9,-1.6573435871683e-9,-1.6536108314632833e-9,-1.6498780757582805e-9,-1.6461453200532917e-9,-1.6424125643483168e-9,-1.6386798086433555e-9,-1.6349470529384085e-9,-1.6312142972334753e-9,-1.627481541528556e-9,-1.6237487858236508e-9,-1.6200160301187594e-9,-1.6162832744138819e-9,-1.6125505187090184e-9,-1.6088177630041688e-9,-1.6050850072993332e-9,-1.6013522515945116e-9,-1.5976194958897037e-9,-1.5938867401849097e-9,-1.59015398448013e-9,-1.586421228775364e-9,-1.582688473070612e-9,-1.578955717365874e-9,-1.5752229616611495e-9,-1.5714902059564395e-9,-1.567757450251743e-9,-1.5640246945470608e-9,-1.5602919388423923e-9,-1.556559183137738e-9,-1.5528264274330972e-9,-1.5490936717284705e-9,-1.5453609160238579e-9,-1.541628160319259e-9,-1.5378954046146744e-9,-1.5341626489101033e-9,-1.5304298932055463e-9,-1.5266971375010034e-9,-1.5229643817964743e-9,-1.519231626091959e-9,-1.515498870387458e-9,-1.5117661146829704e-9,-1.5080333589784972e-9,-1.5043006032740378e-9,-1.5005678475695923e-9,-1.4968350918651608e-9,-1.4931023361607432e-9,-1.4893695804563392e-9,-1.4856368247519495e-9,-1.4819040690475737e-9,-1.4781713133432119e-9,-1.474438557638864e-9,-1.4707058019345297e-9,-1.4669730462302097e-9,-1.4632402905259035e-9,-1.4595075348216112e-9,-1.455774779117333e-9,-1.4520420234130686e-9,-1.448309267708818e-9,-1.4445765120045816e-9,-1.440843756300359e-9,-1.4371110005961504e-9,-1.4333782448919557e-9,-1.4296454891877751e-9,-1.4259127334836081e-9,-1.4221799777794552e-9,-1.4184472220753161e-9,-1.4147144663711911e-9,-1.4109817106670802e-9,-1.407248954962983e-9,-1.4035161992588997e-9,-1.3997834435548303e-9,-1.396050687850775e-9,-1.3923179321467335e-9,-1.3885851764427062e-9,-1.3848524207386924e-9,-1.381119665034693e-9,-1.377386909330707e-9,-1.3736541536267353e-9,-1.3699213979227776e-9,-1.3661886422188338e-9,-1.3624558865149036e-9,-1.3587231308109876e-9,-1.3549903751070856e-9,-1.3512576194031973e-9,-1.3475248636993232e-9,-1.3437921079954627e-9,-1.3400593522916164e-9,-1.336326596587784e-9,-1.3325938408839655e-9,-1.328861085180161e-9,-1.3251283294763704e-9,-1.3213955737725937e-9,-1.3176628180688308e-9,-1.3139300623650821e-9,-1.3101973066613472e-9,-1.3064645509576262e-9,-1.3027317952539194e-9,-1.298999039550226e-9,-1.2952662838465468e-9,-1.2915335281428817e-9,-1.2878007724392305e-9,-1.284068016735593e-9,-1.2803352610319696e-9,-1.2766025053283601e-9,-1.2728697496247645e-9,-1.269136993921183e-9,-1.2654042382176153e-9,-1.2616714825140614e-9,-1.2579387268105215e-9,-1.2542059711069955e-9,-1.2504732154034837e-9,-1.2467404596999857e-9,-1.2430077039965017e-9,-1.2392749482930315e-9,-1.235542192589575e-9,-1.2318094368861329e-9,-1.2280766811827046e-9,-1.22434392547929e-9,-1.2206111697758897e-9,-1.216878414072503e-9,-1.2131456583691303e-9,-1.2094129026657717e-9,-1.205680146962427e-9,-1.2019473912590962e-9,-1.1982146355557794e-9,-1.1944818798524762e-9,-1.1907491241491872e-9,-1.1870163684459122e-9,-1.183283612742651e-9,-1.1795508570394038e-9,-1.1758181013361705e-9,-1.172085345632951e-9,-1.1683525899297456e-9,-1.1646198342265541e-9,-1.1608870785233767e-9,-1.157154322820213e-9,-1.1534215671170633e-9,-1.1496888114139274e-9,-1.1459560557108058e-9,-1.1422233000076978e-9,-1.1384905443046039e-9,-1.134757788601524e-9,-1.1310250328984576e-9,-1.1272922771954056e-9,-1.1235595214923673e-9,-1.1198267657893431e-9,-1.1160940100863327e-9,-1.1123612543833364e-9,-1.1086284986803538e-9,-1.1048957429773852e-9,-1.1011629872744306e-9,-1.09743023157149e-9,-1.0936974758685633e-9,-1.0899647201656503e-9,-1.0862319644627514e-9,-1.0824992087598666e-9,-1.0787664530569956e-9,-1.0750336973541384e-9,-1.0713009416512953e-9,-1.067568185948466e-9,-1.0638354302456505e-9,-1.0601026745428492e-9,-1.056369918840062e-9,-1.0526371631372884e-9,-1.0489044074345289e-9,-1.0451716517317832e-9,-1.0414388960290516e-9,-1.0377061403263338e-9,-1.0339733846236301e-9,-1.03024062892094e-9,-1.026507873218264e-9,-1.0227751175156021e-9,-1.019042361812954e-9,-1.0153096061103199e-9,-1.0115768504076997e-9,-1.0078440947050934e-9,-1.004111339002501e-9,-1.0003785832999226e-9,-9.96645827597358e-10,-9.929130718948076e-10,-9.89180316192271e-10,-9.854475604897482e-10,-9.817148047872393e-10,-9.779820490847447e-10,-9.742492933822637e-10,-9.705165376797968e-10,-9.66783781977344e-10,-9.630510262749045e-10,-9.593182705724794e-10,-9.555855148700683e-10,-9.51852759167671e-10,-9.481200034652877e-10,-9.443872477629184e-10,-9.406544920605627e-10,-9.369217363582211e-10,-9.331889806558936e-10,-9.294562249535799e-10,-9.257234692512801e-10,-9.219907135489943e-10,-9.182579578467225e-10,-9.145252021444645e-10,-9.107924464422205e-10,-9.070596907399904e-10,-9.033269350377743e-10,-8.99594179335572e-10,-8.958614236333838e-10,-8.921286679312094e-10,-8.88395912229049e-10,-8.846631565269025e-10,-8.809304008247699e-10,-8.771976451226513e-10,-8.734648894205467e-10,-8.697321337184559e-10,-8.659993780163791e-10,-8.622666223143161e-10,-8.585338666122672e-10,-8.548011109102323e-10,-8.510683552082111e-10,-8.47335599506204e-10,-8.436028438042108e-10,-8.398700881022315e-10,-8.361373324002661e-10,-8.324045766983148e-10,-8.286718209963772e-10,-8.249390652944537e-10,-8.212063095925442e-10,-8.174735538906484e-10,-8.137407981887666e-10,-8.100080424868989e-10,-8.062752867850449e-10,-8.02542531083205e-10,-7.988097753813789e-10,-7.95077019679567e-10,-7.913442639777688e-10,-7.876115082759845e-10,-7.838787525742143e-10,-7.801459968724579e-10,-7.764132411707155e-10,-7.726804854689871e-10,-7.689477297672726e-10,-7.652149740655718e-10,-7.614822183638852e-10,-7.577494626622125e-10,-7.540167069605537e-10,-7.502839512589088e-10,-7.465511955572779e-10,-7.428184398556608e-10,-7.390856841540578e-10,-7.353529284524685e-10,-7.316201727508934e-10,-7.278874170493321e-10,-7.241546613477847e-10,-7.204219056462513e-10,-7.166891499447319e-10,-7.129563942432263e-10,-7.092236385417347e-10,-7.054908828402571e-10,-7.017581271387932e-10,-6.980253714373434e-10,-6.942926157359076e-10,-6.905598600344856e-10,-6.868271043330776e-10,-6.830943486316836e-10,-6.793615929303034e-10,-6.756288372289372e-10,-6.718960815275849e-10,-6.681633258262465e-10,-6.644305701249222e-10,-6.606978144236116e-10,-6.569650587223151e-10,-6.532323030210326e-10,-6.494995473197638e-10,-6.457667916185092e-10,-6.420340359172683e-10,-6.383012802160413e-10,-6.345685245148285e-10,-6.308357688136295e-10,-6.271030131124444e-10,-6.233702574112732e-10,-6.196375017101161e-10,-6.159047460089727e-10,-6.121719903078435e-10,-6.08439234606728e-10,-6.047064789056265e-10,-6.00973723204539e-10,-5.972409675034654e-10,-5.935082118024057e-10,-5.8977545610136e-10,-5.860427004003281e-10,-5.823099446993103e-10,-5.785771889983064e-10,-5.748444332973163e-10,-5.711116775963403e-10,-5.673789218953782e-10,-5.636461661944299e-10,-5.599134104934957e-10,-5.561806547925754e-10,-5.524478990916689e-10,-5.487151433907765e-10,-5.449823876898979e-10,-5.412496319890333e-10,-5.375168762881827e-10,-5.337841205873458e-10,-5.30051364886523e-10,-5.263186091857142e-10,-5.225858534849192e-10,-5.188530977841383e-10,-5.151203420833713e-10,-5.11387586382618e-10,-5.076548306818789e-10,-5.039220749811536e-10,-5.001893192804422e-10,-4.964565635797449e-10,-4.927238078790614e-10,-4.889910521783918e-10,-4.852582964777362e-10,-4.815255407770945e-10,-4.777927850764668e-10,-4.740600293758531e-10,-4.703272736752531e-10,-4.665945179746672e-10,-4.628617622740952e-10,-4.5912900657353716e-10,-4.55396250872993e-10,-4.516634951724628e-10,-4.4793073947194657e-10,-4.441979837714442e-10,-4.404652280709558e-10,-4.3673247237048135e-10,-4.329997166700208e-10,-4.292669609695742e-10,-4.255342052691415e-10,-4.218014495687228e-10,-4.18068693868318e-10,-4.1433593816792713e-10,-4.1060318246755024e-10,-4.068704267671872e-10,-4.0313767106683813e-10,-3.9940491536650296e-10,-3.956721596661818e-10,-3.9193940396587455e-10,-3.882066482655812e-10,-3.844738925653018e-10,-3.8074113686503633e-10,-3.7700838116478476e-10,-3.732756254645472e-10,-3.6954286976432354e-10,-3.658101140641138e-10,-3.62077358363918e-10,-3.5834460266373617e-10,-3.546118469635682e-10,-3.5087909126341417e-10,-3.4714633556327417e-10,-3.43413579863148e-10,-3.396808241630358e-10,-3.3594806846293753e-10,-3.322153127628532e-10,-3.284825570627828e-10,-3.247498013627263e-10,-3.210170456626838e-10,-3.172842899626552e-10,-3.1355153426264053e-10,-3.0981877856263985e-10,-3.0608602286265303e-10,-3.0235326716268016e-10,-2.986205114627212e-10,-2.9488775576277626e-10,-2.9115500006284517e-10,-2.8742224436292803e-10,-2.8368948866302486e-10,-2.799567329631356e-10,-2.7622397726326023e-10,-2.724912215633988e-10,-2.687584658635514e-10,-2.6502571016371784e-10,-2.6129295446389826e-10,-2.5756019876409264e-10,-2.538274430643009e-10,-2.5009468736452307e-10,-2.4636193166475923e-10,-2.426291759650093e-10,-2.388964202652733e-10,-2.3516366456555123e-10,-2.314309088658431e-10,-2.276981531661489e-10,-2.2396539746646866e-10,-2.202326417668023e-10,-2.1649988606714993e-10,-2.1276713036751145e-10,-2.0903437466788693e-10,-2.0530161896827635e-10,-2.015688632686797e-10,-1.9783610756909697e-10,-1.9410335186952816e-10,-1.903705961699733e-10,-1.8663784047043238e-10,-1.829050847709054e-10,-1.7917232907139234e-10,-1.754395733718932e-10,-1.7170681767240802e-10,-1.6797406197293674e-10,-1.6424130627347941e-10,-1.6050855057403605e-10,-1.5677579487460656e-10,-1.5304303917519106e-10,-1.4931028347578944e-10,-1.455775277764018e-10,-1.4184477207702808e-10,-1.3811201637766828e-10,-1.3437926067832242e-10,-1.306465049789905e-10,-1.2691374927967252e-10,-1.2318099358036846e-10,-1.1944823788107833e-10,-1.1571548218180213e-10,-1.1198272648253989e-10,-1.0824997078329156e-10,-1.0451721508405717e-10,-1.0078445938483672e-10,-9.705170368563018e-11,-9.33189479864376e-11,-8.958619228725895e-11,-8.585343658809423e-11,-8.212068088894342e-11,-7.838792518980657e-11,-7.465516949068364e-11,-7.092241379157466e-11,-6.71896580924796e-11,-6.345690239339848e-11,-5.97241466943313e-11,-5.5991390995278046e-11,-5.225863529623872e-11,-4.852587959721333e-11,-4.479312389820188e-11,-4.1060368199204353e-11,-3.7327612500220764e-11,-3.3594856801251113e-11,-2.986210110229539e-11,-2.6129345403353605e-11,-2.2396589704425753e-11,-1.866383400551183e-11,-1.4931078306611845e-11,-1.1198322607725791e-11,-7.46556690885367e-12,-3.7328112099954845e-12,-5.551115123125783e-17],"x":[-1.862645149230957e-9,-1.8589123935321198e-9,-1.8551796378332825e-9,-1.851446882134445e-9,-1.8477141264356078e-9,-1.8439813707367706e-9,-1.8402486150379333e-9,-1.836515859339096e-9,-1.8327831036402588e-9,-1.8290503479414214e-9,-1.8253175922425841e-9,-1.8215848365437469e-9,-1.8178520808449096e-9,-1.8141193251460724e-9,-1.8103865694472351e-9,-1.8066538137483977e-9,-1.8029210580495604e-9,-1.7991883023507232e-9,-1.795455546651886e-9,-1.7917227909530487e-9,-1.7879900352542112e-9,-1.784257279555374e-9,-1.7805245238565367e-9,-1.7767917681576995e-9,-1.7730590124588622e-9,-1.769326256760025e-9,-1.7655935010611875e-9,-1.7618607453623503e-9,-1.758127989663513e-9,-1.7543952339646758e-9,-1.7506624782658385e-9,-1.7469297225670013e-9,-1.7431969668681638e-9,-1.7394642111693266e-9,-1.7357314554704893e-9,-1.731998699771652e-9,-1.7282659440728148e-9,-1.7245331883739773e-9,-1.72080043267514e-9,-1.7170676769763028e-9,-1.7133349212774656e-9,-1.7096021655786283e-9,-1.705869409879791e-9,-1.7021366541809536e-9,-1.6984038984821164e-9,-1.6946711427832791e-9,-1.6909383870844419e-9,-1.6872056313856046e-9,-1.6834728756867674e-9,-1.67974011998793e-9,-1.6760073642890927e-9,-1.6722746085902554e-9,-1.6685418528914182e-9,-1.664809097192581e-9,-1.6610763414937435e-9,-1.6573435857949062e-9,-1.653610830096069e-9,-1.6498780743972317e-9,-1.6461453186983945e-9,-1.6424125629995572e-9,-1.6386798073007198e-9,-1.6349470516018825e-9,-1.6312142959030453e-9,-1.627481540204208e-9,-1.6237487845053708e-9,-1.6200160288065335e-9,-1.616283273107696e-9,-1.6125505174088588e-9,-1.6088177617100216e-9,-1.6050850060111843e-9,-1.601352250312347e-9,-1.5976194946135096e-9,-1.5938867389146724e-9,-1.5901539832158351e-9,-1.5864212275169979e-9,-1.5826884718181606e-9,-1.5789557161193234e-9,-1.575222960420486e-9,-1.5714902047216487e-9,-1.5677574490228114e-9,-1.5640246933239742e-9,-1.560291937625137e-9,-1.5565591819262997e-9,-1.5528264262274622e-9,-1.549093670528625e-9,-1.5453609148297877e-9,-1.5416281591309505e-9,-1.5378954034321132e-9,-1.5341626477332757e-9,-1.5304298920344385e-9,-1.5266971363356012e-9,-1.522964380636764e-9,-1.5192316249379267e-9,-1.5154988692390895e-9,-1.511766113540252e-9,-1.5080333578414148e-9,-1.5043006021425775e-9,-1.5005678464437403e-9,-1.496835090744903e-9,-1.4931023350460658e-9,-1.4893695793472283e-9,-1.485636823648391e-9,-1.4819040679495538e-9,-1.4781713122507166e-9,-1.4744385565518793e-9,-1.4707058008530419e-9,-1.4669730451542046e-9,-1.4632402894553674e-9,-1.4595075337565301e-9,-1.4557747780576929e-9,-1.4520420223588556e-9,-1.4483092666600182e-9,-1.444576510961181e-9,-1.4408437552623437e-9,-1.4371109995635064e-9,-1.4333782438646692e-9,-1.429645488165832e-9,-1.4259127324669945e-9,-1.4221799767681572e-9,-1.41844722106932e-9,-1.4147144653704827e-9,-1.4109817096716455e-9,-1.407248953972808e-9,-1.4035161982739708e-9,-1.3997834425751335e-9,-1.3960506868762963e-9,-1.392317931177459e-9,-1.3885851754786218e-9,-1.3848524197797843e-9,-1.381119664080947e-9,-1.3773869083821098e-9,-1.3736541526832726e-9,-1.3699213969844353e-9,-1.366188641285598e-9,-1.3624558855867606e-9,-1.3587231298879234e-9,-1.3549903741890861e-9,-1.3512576184902489e-9,-1.3475248627914116e-9,-1.3437921070925742e-9,-1.340059351393737e-9,-1.3363265956948997e-9,-1.3325938399960624e-9,-1.3288610842972252e-9,-1.325128328598388e-9,-1.3213955728995504e-9,-1.3176628172007132e-9,-1.313930061501876e-9,-1.3101973058030387e-9,-1.3064645501042014e-9,-1.3027317944053642e-9,-1.2989990387065267e-9,-1.2952662830076895e-9,-1.2915335273088522e-9,-1.287800771610015e-9,-1.2840680159111777e-9,-1.2803352602123403e-9,-1.276602504513503e-9,-1.2728697488146658e-9,-1.2691369931158285e-9,-1.2654042374169913e-9,-1.261671481718154e-9,-1.2579387260193166e-9,-1.2542059703204793e-9,-1.250473214621642e-9,-1.2467404589228048e-9,-1.2430077032239676e-9,-1.2392749475251303e-9,-1.2355421918262929e-9,-1.2318094361274556e-9,-1.2280766804286184e-9,-1.2243439247297811e-9,-1.2206111690309439e-9,-1.2168784133321064e-9,-1.2131456576332692e-9,-1.209412901934432e-9,-1.2056801462355947e-9,-1.2019473905367574e-9,-1.1982146348379202e-9,-1.1944818791390827e-9,-1.1907491234402455e-9,-1.1870163677414082e-9,-1.183283612042571e-9,-1.1795508563437337e-9,-1.1758181006448965e-9,-1.172085344946059e-9,-1.1683525892472218e-9,-1.1646198335483845e-9,-1.1608870778495473e-9,-1.15715432215071e-9,-1.1534215664518726e-9,-1.1496888107530353e-9,-1.145956055054198e-9,-1.1422232993553608e-9,-1.1384905436565236e-9,-1.1347577879576863e-9,-1.1310250322588489e-9,-1.1272922765600116e-9,-1.1235595208611744e-9,-1.119826765162337e-9,-1.1160940094634999e-9,-1.1123612537646626e-9,-1.1086284980658251e-9,-1.104895742366988e-9,-1.1011629866681506e-9,-1.0974302309693134e-9,-1.0936974752704761e-9,-1.0899647195716387e-9,-1.0862319638728014e-9,-1.0824992081739642e-9,-1.078766452475127e-9,-1.0750336967762897e-9,-1.0713009410774524e-9,-1.067568185378615e-9,-1.0638354296797777e-9,-1.0601026739809405e-9,-1.0563699182821032e-9,-1.052637162583266e-9,-1.0489044068844287e-9,-1.0451716511855913e-9,-1.041438895486754e-9,-1.0377061397879168e-9,-1.0339733840890795e-9,-1.0302406283902423e-9,-1.0265078726914048e-9,-1.0227751169925676e-9,-1.0190423612937303e-9,-1.015309605594893e-9,-1.0115768498960558e-9,-1.0078440941972186e-9,-1.0041113384983811e-9,-1.0003785827995439e-9,-9.966458271007066e-10,-9.929130714018694e-10,-9.891803157030321e-10,-9.854475600041949e-10,-9.817148043053574e-10,-9.779820486065202e-10,-9.74249292907683e-10,-9.705165372088457e-10,-9.667837815100084e-10,-9.63051025811171e-10,-9.593182701123337e-10,-9.555855144134965e-10,-9.518527587146592e-10,-9.48120003015822e-10,-9.443872473169847e-10,-9.406544916181473e-10,-9.3692173591931e-10,-9.331889802204728e-10,-9.294562245216355e-10,-9.257234688227982e-10,-9.219907131239609e-10,-9.182579574251237e-10,-9.145252017262863e-10,-9.10792446027449e-10,-9.070596903286118e-10,-9.033269346297744e-10,-8.995941789309372e-10,-8.958614232321e-10,-8.921286675332626e-10,-8.883959118344253e-10,-8.846631561355881e-10,-8.809304004367507e-10,-8.771976447379135e-10,-8.734648890390762e-10,-8.697321333402389e-10,-8.659993776414016e-10,-8.622666219425643e-10,-8.58533866243727e-10,-8.548011105448898e-10,-8.510683548460524e-10,-8.473355991472152e-10,-8.436028434483779e-10,-8.398700877495406e-10,-8.361373320507033e-10,-8.324045763518661e-10,-8.286718206530287e-10,-8.249390649541915e-10,-8.212063092553542e-10,-8.174735535565169e-10,-8.137407978576796e-10,-8.100080421588424e-10,-8.06275286460005e-10,-8.025425307611678e-10,-7.988097750623304e-10,-7.950770193634932e-10,-7.913442636646559e-10,-7.876115079658186e-10,-7.838787522669813e-10,-7.801459965681441e-10,-7.764132408693067e-10,-7.726804851704695e-10,-7.689477294716322e-10,-7.652149737727949e-10,-7.614822180739576e-10,-7.577494623751204e-10,-7.54016706676283e-10,-7.502839509774458e-10,-7.465511952786085e-10,-7.428184395797712e-10,-7.390856838809339e-10,-7.353529281820966e-10,-7.316201724832593e-10,-7.278874167844221e-10,-7.241546610855847e-10,-7.204219053867475e-10,-7.166891496879102e-10,-7.129563939890729e-10,-7.092236382902356e-10,-7.054908825913984e-10,-7.01758126892561e-10,-6.980253711937238e-10,-6.942926154948865e-10,-6.905598597960491e-10,-6.868271040972119e-10,-6.830943483983746e-10,-6.793615926995373e-10,-6.756288370007e-10,-6.718960813018627e-10,-6.681633256030254e-10,-6.644305699041882e-10,-6.606978142053508e-10,-6.569650585065136e-10,-6.532323028076763e-10,-6.49499547108839e-10,-6.457667914100017e-10,-6.420340357111645e-10,-6.383012800123271e-10,-6.345685243134899e-10,-6.308357686146526e-10,-6.271030129158153e-10,-6.23370257216978e-10,-6.196375015181408e-10,-6.159047458193034e-10,-6.121719901204662e-10,-6.084392344216288e-10,-6.047064787227916e-10,-6.009737230239543e-10,-5.97240967325117e-10,-5.935082116262797e-10,-5.897754559274425e-10,-5.860427002286051e-10,-5.823099445297679e-10,-5.785771888309306e-10,-5.748444331320933e-10,-5.71111677433256e-10,-5.673789217344188e-10,-5.636461660355814e-10,-5.599134103367442e-10,-5.561806546379069e-10,-5.524478989390696e-10,-5.487151432402323e-10,-5.44982387541395e-10,-5.412496318425577e-10,-5.375168761437205e-10,-5.337841204448831e-10,-5.300513647460459e-10,-5.263186090472086e-10,-5.225858533483713e-10,-5.18853097649534e-10,-5.151203419506968e-10,-5.113875862518594e-10,-5.076548305530222e-10,-5.039220748541849e-10,-5.001893191553476e-10,-4.964565634565103e-10,-4.927238077576731e-10,-4.889910520588357e-10,-4.852582963599984e-10,-4.815255406611611e-10,-4.777927849623238e-10,-4.740600292634866e-10,-4.703272735646492e-10,-4.66594517865812e-10,-4.628617621669747e-10,-4.5912900646813744e-10,-4.5539625076930014e-10,-4.5166349507046284e-10,-4.479307393716256e-10,-4.441979836727883e-10,-4.40465227973951e-10,-4.3673247227511374e-10,-4.3299971657627644e-10,-4.2926696087743913e-10,-4.2553420517860183e-10,-4.218014494797646e-10,-4.180686937809273e-10,-4.1433593808209e-10,-4.1060318238325273e-10,-4.0687042668441543e-10,-4.0313767098557813e-10,-3.9940491528674083e-10,-3.956721595879036e-10,-3.919394038890663e-10,-3.88206648190229e-10,-3.844738924913917e-10,-3.807411367925544e-10,-3.770083810937171e-10,-3.7327562539487987e-10,-3.6954286969604257e-10,-3.6581011399720527e-10,-3.6207735829836797e-10,-3.583446025995307e-10,-3.546118469006934e-10,-3.508790912018561e-10,-3.4714633550301887e-10,-3.4341357980418156e-10,-3.3968082410534426e-10,-3.3594806840650696e-10,-3.322153127076697e-10,-3.284825570088324e-10,-3.247498013099951e-10,-3.2101704561115786e-10,-3.1728428991232056e-10,-3.1355153421348326e-10,-3.09818778514646e-10,-3.060860228158087e-10,-3.023532671169714e-10,-2.986205114181341e-10,-2.9488775571929685e-10,-2.9115500002045955e-10,-2.8742224432162225e-10,-2.83689488622785e-10,-2.799567329239477e-10,-2.762239772251104e-10,-2.724912215262731e-10,-2.6875846582743585e-10,-2.6502571012859855e-10,-2.6129295442976124e-10,-2.57560198730924e-10,-2.538274430320867e-10,-2.500946873332494e-10,-2.4636193163441214e-10,-2.4262917593557484e-10,-2.3889642023673754e-10,-2.3516366453790024e-10,-2.3143090883906296e-10,-2.2769815314022569e-10,-2.239653974413884e-10,-2.202326417425511e-10,-2.1649988604371383e-10,-2.1276713034487653e-10,-2.0903437464603926e-10,-2.0530161894720198e-10,-2.0156886324836468e-10,-1.978361075495274e-10,-1.941033518506901e-10,-1.9037059615185283e-10,-1.8663784045301555e-10,-1.8290508475417825e-10,-1.7917232905534097e-10,-1.7543957335650367e-10,-1.717068176576664e-10,-1.679740619588291e-10,-1.6424130625999182e-10,-1.6050855056115455e-10,-1.5677579486231724e-10,-1.5304303916347997e-10,-1.4931028346464267e-10,-1.455775277658054e-10,-1.4184477206696812e-10,-1.3811201636813081e-10,-1.3437926066929354e-10,-1.3064650497045624e-10,-1.2691374927161896e-10,-1.2318099357278169e-10,-1.1944823787394438e-10,-1.157154821751071e-10,-1.1198272647626982e-10,-1.0824997077743253e-10,-1.0451721507859524e-10,-1.0078445937975796e-10,-9.705170368092067e-11,-9.331894798208339e-11,-8.95861922832461e-11,-8.585343658440881e-11,-8.212068088557153e-11,-7.838792518673424e-11,-7.465516948789695e-11,-7.092241378905967e-11,-6.718965809022239e-11,-6.34569023913851e-11,-5.972414669254781e-11,-5.5991390993710526e-11,-5.225863529487324e-11,-4.852587959603595e-11,-4.479312389719867e-11,-4.106036819836138e-11,-3.732761249952409e-11,-3.359485680068681e-11,-2.986210110184952e-11,-2.6129345403012234e-11,-2.239658970417495e-11,-1.866383400533766e-11,-1.4931078306500375e-11,-1.119832260766309e-11,-7.465566908825803e-12,-3.732811209988517e-12,-5.551115123125783e-17]}

},{}],93:[function(require,module,exports){
module.exports={"expected":[5.551115123125783e-17,3.73281120998155e-12,7.465566908797936e-12,1.119832260760039e-11,1.4931078306388906e-11,1.866383400516349e-11,2.2396589703924145e-11,2.6129345402670864e-11,2.986210110140365e-11,3.35948568001225e-11,3.7327612498827417e-11,4.1060368197518404e-11,4.479312389619545e-11,4.852587959485857e-11,5.2258635293507756e-11,5.5991390992143006e-11,5.972414669076432e-11,6.345690238937171e-11,6.718965808796516e-11,7.092241378654468e-11,7.465516948511026e-11,7.838792518366191e-11,8.212068088219963e-11,8.58534365807234e-11,8.958619227923326e-11,9.331894797772918e-11,9.705170367621115e-11,1.007844593746792e-10,1.0451721507313332e-10,1.0824997077157351e-10,1.1198272646999975e-10,1.1571548216841206e-10,1.1944823786681044e-10,1.2318099356519492e-10,1.269137492635654e-10,1.3064650496192198e-10,1.3437926066026466e-10,1.3811201635859334e-10,1.4184477205690815e-10,1.4557752775520898e-10,1.493102834534959e-10,1.5304303915176887e-10,1.5677579485002792e-10,1.6050855054827304e-10,1.6424130624650423e-10,1.6797406194472145e-10,1.7170681764292477e-10,1.7543957334111416e-10,1.791723290392896e-10,1.829050847374511e-10,1.8663784043559872e-10,1.9037059613373235e-10,1.9410335183185205e-10,1.9783610752995784e-10,2.0156886322804967e-10,2.0530161892612762e-10,2.0903437462419158e-10,2.1276713032224161e-10,2.1649988602027774e-10,2.202326417182999e-10,2.2396539741630817e-10,2.2769815311430247e-10,2.3143090881228283e-10,2.3516366451024924e-10,2.3889642020820177e-10,2.426291759061404e-10,2.4636193160406506e-10,2.500946873019757e-10,2.538274429998725e-10,2.5756019869775534e-10,2.612929543956242e-10,2.6502571009347925e-10,2.687584657913203e-10,2.7249122148914737e-10,2.7622397718696057e-10,2.799567328847598e-10,2.8368948858254515e-10,2.8742224428031647e-10,2.9115499997807394e-10,2.9488775567581745e-10,2.98620511373547e-10,3.0235326707126264e-10,3.060860227689644e-10,3.0981877846665216e-10,3.13551534164326e-10,3.172842898619859e-10,3.210170455596319e-10,3.247498012572639e-10,3.2848255695488204e-10,3.322153126524862e-10,3.359480683500764e-10,3.396808240476527e-10,3.434135797452151e-10,3.4714633544276357e-10,3.5087909114029806e-10,3.5461184683781864e-10,3.5834460253532527e-10,3.6207735823281794e-10,3.6581011393029675e-10,3.695428696277616e-10,3.7327562532521255e-10,3.770083810226495e-10,3.807411367200725e-10,3.8447389241748164e-10,3.8820664811487675e-10,3.91939403812258e-10,3.9567215950962536e-10,3.994049152069787e-10,4.0313767090431813e-10,4.0687042660164365e-10,4.106031822989552e-10,4.1433593799625283e-10,4.180686936935366e-10,4.218014493908064e-10,4.2553420508806216e-10,4.292669607853041e-10,4.3299971648253206e-10,4.367324721797461e-10,4.4046522787694617e-10,4.4419798357413237e-10,4.479307392713046e-10,4.516634949684629e-10,4.5539625066560726e-10,4.5912900636273773e-10,4.628617620598542e-10,4.665945177569568e-10,4.703272734540454e-10,4.740600291511201e-10,4.777927848481809e-10,4.815255405452277e-10,4.852582962422607e-10,4.889910519392796e-10,4.927238076362847e-10,4.964565633332757e-10,5.001893190302529e-10,5.039220747272162e-10,5.076548304241654e-10,5.113875861211008e-10,5.151203418180223e-10,5.188530975149297e-10,5.225858532118233e-10,5.26318608908703e-10,5.300513646055687e-10,5.337841203024204e-10,5.375168759992582e-10,5.412496316960821e-10,5.449823873928921e-10,5.487151430896881e-10,5.524478987864703e-10,5.561806544832384e-10,5.599134101799926e-10,5.63646165876733e-10,5.673789215734593e-10,5.711116772701718e-10,5.748444329668702e-10,5.785771886635549e-10,5.823099443602254e-10,5.860427000568821e-10,5.89775455753525e-10,5.935082114501537e-10,5.972409671467686e-10,6.009737228433696e-10,6.047064785399566e-10,6.084392342365297e-10,6.121719899330889e-10,6.159047456296341e-10,6.196375013261655e-10,6.233702570226828e-10,6.271030127191862e-10,6.308357684156758e-10,6.345685241121512e-10,6.383012798086129e-10,6.420340355050607e-10,6.457667912014943e-10,6.494995468979141e-10,6.532323025943201e-10,6.569650582907121e-10,6.6069781398709e-10,6.644305696834542e-10,6.681633253798043e-10,6.718960810761405e-10,6.756288367724629e-10,6.793615924687712e-10,6.830943481650657e-10,6.868271038613462e-10,6.905598595576127e-10,6.942926152538654e-10,6.980253709501041e-10,7.017581266463288e-10,7.054908823425396e-10,7.092236380387365e-10,7.129563937349194e-10,7.166891494310885e-10,7.204219051272436e-10,7.241546608233847e-10,7.27887416519512e-10,7.316201722156252e-10,7.353529279117246e-10,7.3908568360781e-10,7.428184393038815e-10,7.465511949999391e-10,7.502839506959828e-10,7.540167063920124e-10,7.577494620880282e-10,7.6148221778403e-10,7.652149734800179e-10,7.689477291759919e-10,7.726804848719519e-10,7.764132405678979e-10,7.801459962638302e-10,7.838787519597483e-10,7.876115076556526e-10,7.91344263351543e-10,7.950770190474194e-10,7.988097747432819e-10,8.025425304391305e-10,8.062752861349651e-10,8.100080418307859e-10,8.137407975265926e-10,8.174735532223853e-10,8.212063089181643e-10,8.249390646139293e-10,8.286718203096802e-10,8.324045760054174e-10,8.361373317011405e-10,8.398700873968497e-10,8.436028430925451e-10,8.473355987882263e-10,8.510683544838937e-10,8.548011101795473e-10,8.585338658751868e-10,8.622666215708125e-10,8.659993772664242e-10,8.697321329620219e-10,8.734648886576058e-10,8.771976443531757e-10,8.809304000487316e-10,8.846631557442737e-10,8.883959114398017e-10,8.921286671353158e-10,8.958614228308161e-10,8.995941785263024e-10,9.033269342217746e-10,9.070596899172332e-10,9.107924456126776e-10,9.145252013081081e-10,9.182579570035248e-10,9.219907126989275e-10,9.257234683943162e-10,9.294562240896911e-10,9.33188979785052e-10,9.369217354803989e-10,9.406544911757318e-10,9.44387246871051e-10,9.481200025663562e-10,9.518527582616473e-10,9.555855139569246e-10,9.59318269652188e-10,9.630510253474374e-10,9.667837810426729e-10,9.705165367378945e-10,9.74249292433102e-10,9.779820481282956e-10,9.817148038234755e-10,9.854475595186415e-10,9.891803152137933e-10,9.929130709089311e-10,9.966458266040552e-10,1.0003785822991652e-9,1.0041113379942613e-9,1.0078440936893437e-9,1.011576849384412e-9,1.0153096050794663e-9,1.0190423607745066e-9,1.022775116469533e-9,1.0265078721645456e-9,1.0302406278595445e-9,1.033973383554529e-9,1.0377061392494998e-9,1.0414388949444565e-9,1.0451716506393994e-9,1.0489044063343286e-9,1.0526371620292436e-9,1.0563699177241445e-9,1.0601026734190317e-9,1.063835429113905e-9,1.067568184808764e-9,1.0713009405036095e-9,1.075033696198441e-9,1.0787664518932583e-9,1.0824992075880618e-9,1.0862319632828515e-9,1.089964718977627e-9,1.093697474672389e-9,1.0974302303671369e-9,1.1011629860618707e-9,1.1048957417565906e-9,1.1086284974512965e-9,1.1123612531459888e-9,1.116094008840667e-9,1.119826764535331e-9,1.1235595202299814e-9,1.1272922759246176e-9,1.1310250316192401e-9,1.1347577873138486e-9,1.1384905430084433e-9,1.1422232987030238e-9,1.1459560543975904e-9,1.1496888100921432e-9,1.1534215657866818e-9,1.157154321481207e-9,1.1608870771757179e-9,1.164619832870215e-9,1.1683525885646979e-9,1.172085344259167e-9,1.1758180999536225e-9,1.1795508556480637e-9,1.183283611342491e-9,1.1870163670369043e-9,1.1907491227313037e-9,1.1944818784256893e-9,1.198214634120061e-9,1.2019473898144186e-9,1.2056801455087624e-9,1.2094129012030922e-9,1.213145656897408e-9,1.2168784125917099e-9,1.220611168285998e-9,1.2243439239802722e-9,1.2280766796745322e-9,1.2318094353687784e-9,1.2355421910630107e-9,1.2392749467572292e-9,1.2430077024514334e-9,1.246740458145624e-9,1.2504732138398005e-9,1.2542059695339631e-9,1.2579387252281117e-9,1.2616714809222466e-9,1.2654042366163673e-9,1.2691369923104741e-9,1.272869748004567e-9,1.276602503698646e-9,1.280335259392711e-9,1.2840680150867624e-9,1.2878007707807995e-9,1.2915335264748228e-9,1.2952662821688322e-9,1.2989990378628275e-9,1.302731793556809e-9,1.3064645492507767e-9,1.3101973049447302e-9,1.3139300606386698e-9,1.3176628163325956e-9,1.3213955720265072e-9,1.3251283277204054e-9,1.3288610834142893e-9,1.3325938391081593e-9,1.3363265948020153e-9,1.3400593504958574e-9,1.3437921061896856e-9,1.3475248618835e-9,1.3512576175773004e-9,1.3549903732710866e-9,1.358723128964859e-9,1.3624558846586176e-9,1.3661886403523624e-9,1.369921396046093e-9,1.3736541517398098e-9,1.3773869074335125e-9,1.3811196631272012e-9,1.3848524188208762e-9,1.3885851745145374e-9,1.3923179302081845e-9,1.3960506859018175e-9,1.3997834415954367e-9,1.4035161972890418e-9,1.4072489529826331e-9,1.4109817086762107e-9,1.4147144643697743e-9,1.4184472200633238e-9,1.4221799757568592e-9,1.4259127314503808e-9,1.4296454871438887e-9,1.4333782428373826e-9,1.4371109985308624e-9,1.4408437542243284e-9,1.4445765099177803e-9,1.4483092656112183e-9,1.4520420213046427e-9,1.4557747769980528e-9,1.459507532691449e-9,1.4632402883848313e-9,1.4669730440781996e-9,1.4707057997715541e-9,1.4744385554648947e-9,1.4781713111582213e-9,1.481904066851534e-9,1.4856368225448327e-9,1.4893695782381175e-9,1.4931023339313884e-9,1.4968350896246453e-9,1.5005678453178883e-9,1.5043006010111173e-9,1.5080333567043324e-9,1.5117661123975337e-9,1.515498868090721e-9,1.5192316237838944e-9,1.5229643794770537e-9,1.526697135170199e-9,1.5304298908633307e-9,1.5341626465564482e-9,1.537895402249552e-9,1.5416281579426418e-9,1.5453609136357175e-9,1.5490936693287794e-9,1.5528264250218272e-9,1.5565591807148614e-9,1.5602919364078815e-9,1.5640246921008875e-9,1.5677574477938797e-9,1.5714902034868578e-9,1.5752229591798223e-9,1.5789557148727727e-9,1.5826884705657093e-9,1.5864212262586318e-9,1.5901539819515402e-9,1.593886737644435e-9,1.5976194933373155e-9,1.6013522490301826e-9,1.6050850047230354e-9,1.6088177604158743e-9,1.6125505161086992e-9,1.6162832718015103e-9,1.6200160274943076e-9,1.6237487831870908e-9,1.62748153887986e-9,1.6312142945726152e-9,1.6349470502653566e-9,1.638679805958084e-9,1.6424125616507977e-9,1.6461453173434972e-9,1.649878073036183e-9,1.6536108287288546e-9,1.6573435844215124e-9,1.6610763401141561e-9,1.6648090958067862e-9,1.6685418514994023e-9,1.6722746071920042e-9,1.6760073628845923e-9,1.6797401185771666e-9,1.683472874269727e-9,1.6872056299622733e-9,1.6909383856548056e-9,1.694671141347324e-9,1.6984038970398286e-9,1.702136652732319e-9,1.705869408424796e-9,1.7096021641172585e-9,1.7133349198097072e-9,1.717067675502142e-9,1.7208004311945631e-9,1.72453318688697e-9,1.7282659425793632e-9,1.7319986982717424e-9,1.7357314539641074e-9,1.7394642096564587e-9,1.743196965348796e-9,1.7469297210411196e-9,1.750662476733429e-9,1.7543952324257244e-9,1.758127988118006e-9,1.7618607438102736e-9,1.7655934995025274e-9,1.7693262551947672e-9,1.773059010886993e-9,1.776791766579205e-9,1.7805245222714029e-9,1.7842572779635869e-9,1.787990033655757e-9,1.7917227893479134e-9,1.7954555450400556e-9,1.7991883007321838e-9,1.8029210564242982e-9,1.8066538121163986e-9,1.8103865678084853e-9,1.8141193235005578e-9,1.8178520791926166e-9,1.8215848348846612e-9,1.825317590576692e-9,1.8290503462687087e-9,1.8327831019607118e-9,1.8365158576527008e-9,1.8402486133446758e-9,1.843981369036637e-9,1.8477141247285841e-9,1.8514468804205173e-9,1.8551796361124369e-9,1.8589123918043421e-9,1.8626451474962336e-9],"x":[5.551115123125783e-17,3.732811209988517e-12,7.465566908825803e-12,1.119832260766309e-11,1.4931078306500375e-11,1.866383400533766e-11,2.239658970417495e-11,2.6129345403012234e-11,2.986210110184952e-11,3.359485680068681e-11,3.732761249952409e-11,4.106036819836138e-11,4.479312389719867e-11,4.852587959603595e-11,5.225863529487324e-11,5.5991390993710526e-11,5.972414669254781e-11,6.34569023913851e-11,6.718965809022239e-11,7.092241378905967e-11,7.465516948789695e-11,7.838792518673424e-11,8.212068088557153e-11,8.585343658440881e-11,8.95861922832461e-11,9.331894798208339e-11,9.705170368092067e-11,1.0078445937975796e-10,1.0451721507859524e-10,1.0824997077743253e-10,1.1198272647626982e-10,1.157154821751071e-10,1.1944823787394438e-10,1.2318099357278169e-10,1.2691374927161896e-10,1.3064650497045624e-10,1.3437926066929354e-10,1.3811201636813081e-10,1.4184477206696812e-10,1.455775277658054e-10,1.4931028346464267e-10,1.5304303916347997e-10,1.5677579486231724e-10,1.6050855056115455e-10,1.6424130625999182e-10,1.679740619588291e-10,1.717068176576664e-10,1.7543957335650367e-10,1.7917232905534097e-10,1.8290508475417825e-10,1.8663784045301555e-10,1.9037059615185283e-10,1.941033518506901e-10,1.978361075495274e-10,2.0156886324836468e-10,2.0530161894720198e-10,2.0903437464603926e-10,2.1276713034487653e-10,2.1649988604371383e-10,2.202326417425511e-10,2.239653974413884e-10,2.2769815314022569e-10,2.3143090883906296e-10,2.3516366453790024e-10,2.3889642023673754e-10,2.4262917593557484e-10,2.4636193163441214e-10,2.500946873332494e-10,2.538274430320867e-10,2.57560198730924e-10,2.6129295442976124e-10,2.6502571012859855e-10,2.6875846582743585e-10,2.724912215262731e-10,2.762239772251104e-10,2.799567329239477e-10,2.83689488622785e-10,2.8742224432162225e-10,2.9115500002045955e-10,2.9488775571929685e-10,2.986205114181341e-10,3.023532671169714e-10,3.060860228158087e-10,3.09818778514646e-10,3.1355153421348326e-10,3.1728428991232056e-10,3.2101704561115786e-10,3.247498013099951e-10,3.284825570088324e-10,3.322153127076697e-10,3.3594806840650696e-10,3.3968082410534426e-10,3.4341357980418156e-10,3.4714633550301887e-10,3.508790912018561e-10,3.546118469006934e-10,3.583446025995307e-10,3.6207735829836797e-10,3.6581011399720527e-10,3.6954286969604257e-10,3.7327562539487987e-10,3.770083810937171e-10,3.807411367925544e-10,3.844738924913917e-10,3.88206648190229e-10,3.919394038890663e-10,3.956721595879036e-10,3.9940491528674083e-10,4.0313767098557813e-10,4.0687042668441543e-10,4.1060318238325273e-10,4.1433593808209e-10,4.180686937809273e-10,4.218014494797646e-10,4.2553420517860183e-10,4.2926696087743913e-10,4.3299971657627644e-10,4.3673247227511374e-10,4.40465227973951e-10,4.441979836727883e-10,4.479307393716256e-10,4.5166349507046284e-10,4.5539625076930014e-10,4.5912900646813744e-10,4.628617621669747e-10,4.66594517865812e-10,4.703272735646492e-10,4.740600292634866e-10,4.777927849623238e-10,4.815255406611611e-10,4.852582963599984e-10,4.889910520588357e-10,4.927238077576731e-10,4.964565634565103e-10,5.001893191553476e-10,5.039220748541849e-10,5.076548305530222e-10,5.113875862518594e-10,5.151203419506968e-10,5.18853097649534e-10,5.225858533483713e-10,5.263186090472086e-10,5.300513647460459e-10,5.337841204448831e-10,5.375168761437205e-10,5.412496318425577e-10,5.44982387541395e-10,5.487151432402323e-10,5.524478989390696e-10,5.561806546379069e-10,5.599134103367442e-10,5.636461660355814e-10,5.673789217344188e-10,5.71111677433256e-10,5.748444331320933e-10,5.785771888309306e-10,5.823099445297679e-10,5.860427002286051e-10,5.897754559274425e-10,5.935082116262797e-10,5.97240967325117e-10,6.009737230239543e-10,6.047064787227916e-10,6.084392344216288e-10,6.121719901204662e-10,6.159047458193034e-10,6.196375015181408e-10,6.23370257216978e-10,6.271030129158153e-10,6.308357686146526e-10,6.345685243134899e-10,6.383012800123271e-10,6.420340357111645e-10,6.457667914100017e-10,6.49499547108839e-10,6.532323028076763e-10,6.569650585065136e-10,6.606978142053508e-10,6.644305699041882e-10,6.681633256030254e-10,6.718960813018627e-10,6.756288370007e-10,6.793615926995373e-10,6.830943483983746e-10,6.868271040972119e-10,6.905598597960491e-10,6.942926154948865e-10,6.980253711937238e-10,7.01758126892561e-10,7.054908825913984e-10,7.092236382902356e-10,7.129563939890729e-10,7.166891496879102e-10,7.204219053867475e-10,7.241546610855847e-10,7.278874167844221e-10,7.316201724832593e-10,7.353529281820966e-10,7.390856838809339e-10,7.428184395797712e-10,7.465511952786085e-10,7.502839509774458e-10,7.54016706676283e-10,7.577494623751204e-10,7.614822180739576e-10,7.652149737727949e-10,7.689477294716322e-10,7.726804851704695e-10,7.764132408693067e-10,7.801459965681441e-10,7.838787522669813e-10,7.876115079658186e-10,7.913442636646559e-10,7.950770193634932e-10,7.988097750623304e-10,8.025425307611678e-10,8.06275286460005e-10,8.100080421588424e-10,8.137407978576796e-10,8.174735535565169e-10,8.212063092553542e-10,8.249390649541915e-10,8.286718206530287e-10,8.324045763518661e-10,8.361373320507033e-10,8.398700877495406e-10,8.436028434483779e-10,8.473355991472152e-10,8.510683548460524e-10,8.548011105448898e-10,8.58533866243727e-10,8.622666219425643e-10,8.659993776414016e-10,8.697321333402389e-10,8.734648890390762e-10,8.771976447379135e-10,8.809304004367507e-10,8.846631561355881e-10,8.883959118344253e-10,8.921286675332626e-10,8.958614232321e-10,8.995941789309372e-10,9.033269346297744e-10,9.070596903286118e-10,9.10792446027449e-10,9.145252017262863e-10,9.182579574251237e-10,9.219907131239609e-10,9.257234688227982e-10,9.294562245216355e-10,9.331889802204728e-10,9.3692173591931e-10,9.406544916181473e-10,9.443872473169847e-10,9.48120003015822e-10,9.518527587146592e-10,9.555855144134965e-10,9.593182701123337e-10,9.63051025811171e-10,9.667837815100084e-10,9.705165372088457e-10,9.74249292907683e-10,9.779820486065202e-10,9.817148043053574e-10,9.854475600041949e-10,9.891803157030321e-10,9.929130714018694e-10,9.966458271007066e-10,1.0003785827995439e-9,1.0041113384983811e-9,1.0078440941972186e-9,1.0115768498960558e-9,1.015309605594893e-9,1.0190423612937303e-9,1.0227751169925676e-9,1.0265078726914048e-9,1.0302406283902423e-9,1.0339733840890795e-9,1.0377061397879168e-9,1.041438895486754e-9,1.0451716511855913e-9,1.0489044068844287e-9,1.052637162583266e-9,1.0563699182821032e-9,1.0601026739809405e-9,1.0638354296797777e-9,1.067568185378615e-9,1.0713009410774524e-9,1.0750336967762897e-9,1.078766452475127e-9,1.0824992081739642e-9,1.0862319638728014e-9,1.0899647195716387e-9,1.0936974752704761e-9,1.0974302309693134e-9,1.1011629866681506e-9,1.104895742366988e-9,1.1086284980658251e-9,1.1123612537646626e-9,1.1160940094634999e-9,1.119826765162337e-9,1.1235595208611744e-9,1.1272922765600116e-9,1.1310250322588489e-9,1.1347577879576863e-9,1.1384905436565236e-9,1.1422232993553608e-9,1.145956055054198e-9,1.1496888107530353e-9,1.1534215664518726e-9,1.15715432215071e-9,1.1608870778495473e-9,1.1646198335483845e-9,1.1683525892472218e-9,1.172085344946059e-9,1.1758181006448965e-9,1.1795508563437337e-9,1.183283612042571e-9,1.1870163677414082e-9,1.1907491234402455e-9,1.1944818791390827e-9,1.1982146348379202e-9,1.2019473905367574e-9,1.2056801462355947e-9,1.209412901934432e-9,1.2131456576332692e-9,1.2168784133321064e-9,1.2206111690309439e-9,1.2243439247297811e-9,1.2280766804286184e-9,1.2318094361274556e-9,1.2355421918262929e-9,1.2392749475251303e-9,1.2430077032239676e-9,1.2467404589228048e-9,1.250473214621642e-9,1.2542059703204793e-9,1.2579387260193166e-9,1.261671481718154e-9,1.2654042374169913e-9,1.2691369931158285e-9,1.2728697488146658e-9,1.276602504513503e-9,1.2803352602123403e-9,1.2840680159111777e-9,1.287800771610015e-9,1.2915335273088522e-9,1.2952662830076895e-9,1.2989990387065267e-9,1.3027317944053642e-9,1.3064645501042014e-9,1.3101973058030387e-9,1.313930061501876e-9,1.3176628172007132e-9,1.3213955728995504e-9,1.325128328598388e-9,1.3288610842972252e-9,1.3325938399960624e-9,1.3363265956948997e-9,1.340059351393737e-9,1.3437921070925742e-9,1.3475248627914116e-9,1.3512576184902489e-9,1.3549903741890861e-9,1.3587231298879234e-9,1.3624558855867606e-9,1.366188641285598e-9,1.3699213969844353e-9,1.3736541526832726e-9,1.3773869083821098e-9,1.381119664080947e-9,1.3848524197797843e-9,1.3885851754786218e-9,1.392317931177459e-9,1.3960506868762963e-9,1.3997834425751335e-9,1.4035161982739708e-9,1.407248953972808e-9,1.4109817096716455e-9,1.4147144653704827e-9,1.41844722106932e-9,1.4221799767681572e-9,1.4259127324669945e-9,1.429645488165832e-9,1.4333782438646692e-9,1.4371109995635064e-9,1.4408437552623437e-9,1.444576510961181e-9,1.4483092666600182e-9,1.4520420223588556e-9,1.4557747780576929e-9,1.4595075337565301e-9,1.4632402894553674e-9,1.4669730451542046e-9,1.4707058008530419e-9,1.4744385565518793e-9,1.4781713122507166e-9,1.4819040679495538e-9,1.485636823648391e-9,1.4893695793472283e-9,1.4931023350460658e-9,1.496835090744903e-9,1.5005678464437403e-9,1.5043006021425775e-9,1.5080333578414148e-9,1.511766113540252e-9,1.5154988692390895e-9,1.5192316249379267e-9,1.522964380636764e-9,1.5266971363356012e-9,1.5304298920344385e-9,1.5341626477332757e-9,1.5378954034321132e-9,1.5416281591309505e-9,1.5453609148297877e-9,1.549093670528625e-9,1.5528264262274622e-9,1.5565591819262997e-9,1.560291937625137e-9,1.5640246933239742e-9,1.5677574490228114e-9,1.5714902047216487e-9,1.575222960420486e-9,1.5789557161193234e-9,1.5826884718181606e-9,1.5864212275169979e-9,1.5901539832158351e-9,1.5938867389146724e-9,1.5976194946135096e-9,1.601352250312347e-9,1.6050850060111843e-9,1.6088177617100216e-9,1.6125505174088588e-9,1.616283273107696e-9,1.6200160288065335e-9,1.6237487845053708e-9,1.627481540204208e-9,1.6312142959030453e-9,1.6349470516018825e-9,1.6386798073007198e-9,1.6424125629995572e-9,1.6461453186983945e-9,1.6498780743972317e-9,1.653610830096069e-9,1.6573435857949062e-9,1.6610763414937435e-9,1.664809097192581e-9,1.6685418528914182e-9,1.6722746085902554e-9,1.6760073642890927e-9,1.67974011998793e-9,1.6834728756867674e-9,1.6872056313856046e-9,1.6909383870844419e-9,1.6946711427832791e-9,1.6984038984821164e-9,1.7021366541809536e-9,1.705869409879791e-9,1.7096021655786283e-9,1.7133349212774656e-9,1.7170676769763028e-9,1.72080043267514e-9,1.7245331883739773e-9,1.7282659440728148e-9,1.731998699771652e-9,1.7357314554704893e-9,1.7394642111693266e-9,1.7431969668681638e-9,1.7469297225670013e-9,1.7506624782658385e-9,1.7543952339646758e-9,1.758127989663513e-9,1.7618607453623503e-9,1.7655935010611875e-9,1.769326256760025e-9,1.7730590124588622e-9,1.7767917681576995e-9,1.7805245238565367e-9,1.784257279555374e-9,1.7879900352542112e-9,1.7917227909530487e-9,1.795455546651886e-9,1.7991883023507232e-9,1.8029210580495604e-9,1.8066538137483977e-9,1.8103865694472351e-9,1.8141193251460724e-9,1.8178520808449096e-9,1.8215848365437469e-9,1.8253175922425841e-9,1.8290503479414214e-9,1.8327831036402588e-9,1.836515859339096e-9,1.8402486150379333e-9,1.8439813707367706e-9,1.8477141264356078e-9,1.851446882134445e-9,1.8551796378332825e-9,1.8589123935321198e-9,1.862645149230957e-9]}

},{}],94:[function(require,module,exports){
module.exports={"expected":[-5.551115123125783e-17,-5.539990643921122e-17,-5.528866164716461e-17,-5.5177416855118e-17,-5.506617206307139e-17,-5.495492727102478e-17,-5.4843682478978173e-17,-5.4732437686931564e-17,-5.4621192894884955e-17,-5.4509948102838346e-17,-5.439870331079174e-17,-5.428745851874513e-17,-5.417621372669852e-17,-5.406496893465191e-17,-5.39537241426053e-17,-5.384247935055869e-17,-5.3731234558512083e-17,-5.3619989766465474e-17,-5.3508744974418865e-17,-5.3397500182372256e-17,-5.328625539032565e-17,-5.317501059827904e-17,-5.306376580623243e-17,-5.295252101418582e-17,-5.284127622213921e-17,-5.27300314300926e-17,-5.2618786638045993e-17,-5.2507541845999384e-17,-5.239629705395278e-17,-5.228505226190617e-17,-5.2173807469859564e-17,-5.2062562677812955e-17,-5.1951317885766346e-17,-5.1840073093719737e-17,-5.172882830167313e-17,-5.161758350962652e-17,-5.150633871757991e-17,-5.13950939255333e-17,-5.128384913348669e-17,-5.117260434144008e-17,-5.1061359549393474e-17,-5.0950114757346865e-17,-5.0838869965300256e-17,-5.0727625173253647e-17,-5.061638038120704e-17,-5.050513558916043e-17,-5.039389079711382e-17,-5.028264600506721e-17,-5.01714012130206e-17,-5.006015642097399e-17,-4.9948911628927384e-17,-4.9837666836880775e-17,-4.9726422044834166e-17,-4.961517725278756e-17,-4.950393246074095e-17,-4.939268766869434e-17,-4.928144287664773e-17,-4.917019808460112e-17,-4.905895329255451e-17,-4.8947708500507903e-17,-4.8836463708461294e-17,-4.8725218916414685e-17,-4.8613974124368076e-17,-4.850272933232147e-17,-4.839148454027486e-17,-4.828023974822825e-17,-4.816899495618164e-17,-4.805775016413503e-17,-4.794650537208842e-17,-4.7835260580041813e-17,-4.7724015787995204e-17,-4.7612770995948595e-17,-4.7501526203901986e-17,-4.739028141185538e-17,-4.727903661980877e-17,-4.716779182776216e-17,-4.705654703571555e-17,-4.694530224366894e-17,-4.683405745162233e-17,-4.6722812659575724e-17,-4.6611567867529115e-17,-4.6500323075482506e-17,-4.6389078283435897e-17,-4.627783349138929e-17,-4.6166588699342685e-17,-4.6055343907296076e-17,-4.5944099115249467e-17,-4.583285432320286e-17,-4.572160953115625e-17,-4.561036473910964e-17,-4.549911994706303e-17,-4.538787515501642e-17,-4.527663036296981e-17,-4.5165385570923204e-17,-4.5054140778876595e-17,-4.4942895986829986e-17,-4.483165119478338e-17,-4.472040640273677e-17,-4.460916161069016e-17,-4.449791681864355e-17,-4.438667202659694e-17,-4.427542723455033e-17,-4.4164182442503723e-17,-4.4052937650457114e-17,-4.3941692858410505e-17,-4.3830448066363896e-17,-4.371920327431729e-17,-4.360795848227068e-17,-4.349671369022407e-17,-4.338546889817746e-17,-4.327422410613085e-17,-4.316297931408424e-17,-4.3051734522037633e-17,-4.2940489729991024e-17,-4.2829244937944415e-17,-4.2718000145897806e-17,-4.26067553538512e-17,-4.249551056180459e-17,-4.238426576975798e-17,-4.227302097771137e-17,-4.216177618566476e-17,-4.205053139361815e-17,-4.1939286601571543e-17,-4.1828041809524934e-17,-4.1716797017478325e-17,-4.1605552225431716e-17,-4.149430743338511e-17,-4.13830626413385e-17,-4.127181784929189e-17,-4.116057305724528e-17,-4.104932826519867e-17,-4.093808347315206e-17,-4.0826838681105454e-17,-4.0715593889058845e-17,-4.0604349097012236e-17,-4.0493104304965627e-17,-4.038185951291902e-17,-4.027061472087241e-17,-4.01593699288258e-17,-4.0048125136779197e-17,-3.993688034473259e-17,-3.982563555268598e-17,-3.971439076063937e-17,-3.960314596859276e-17,-3.949190117654615e-17,-3.938065638449954e-17,-3.9269411592452934e-17,-3.9158166800406325e-17,-3.9046922008359716e-17,-3.893567721631311e-17,-3.88244324242665e-17,-3.871318763221989e-17,-3.860194284017328e-17,-3.849069804812667e-17,-3.837945325608006e-17,-3.8268208464033453e-17,-3.8156963671986844e-17,-3.8045718879940235e-17,-3.7934474087893626e-17,-3.782322929584702e-17,-3.771198450380041e-17,-3.76007397117538e-17,-3.748949491970719e-17,-3.737825012766058e-17,-3.726700533561397e-17,-3.7155760543567363e-17,-3.7044515751520754e-17,-3.6933270959474145e-17,-3.6822026167427536e-17,-3.671078137538093e-17,-3.659953658333432e-17,-3.648829179128771e-17,-3.63770469992411e-17,-3.626580220719449e-17,-3.615455741514788e-17,-3.6043312623101273e-17,-3.5932067831054665e-17,-3.5820823039008056e-17,-3.5709578246961447e-17,-3.559833345491484e-17,-3.548708866286823e-17,-3.537584387082162e-17,-3.526459907877501e-17,-3.51533542867284e-17,-3.504210949468179e-17,-3.4930864702635184e-17,-3.4819619910588575e-17,-3.4708375118541966e-17,-3.4597130326495357e-17,-3.448588553444875e-17,-3.437464074240214e-17,-3.426339595035553e-17,-3.415215115830892e-17,-3.404090636626231e-17,-3.39296615742157e-17,-3.38184167821691e-17,-3.370717199012249e-17,-3.359592719807588e-17,-3.348468240602927e-17,-3.3373437613982664e-17,-3.3262192821936055e-17,-3.3150948029889446e-17,-3.303970323784284e-17,-3.292845844579623e-17,-3.281721365374962e-17,-3.270596886170301e-17,-3.25947240696564e-17,-3.248347927760979e-17,-3.2372234485563183e-17,-3.2260989693516574e-17,-3.2149744901469965e-17,-3.2038500109423356e-17,-3.192725531737675e-17,-3.181601052533014e-17,-3.170476573328353e-17,-3.159352094123692e-17,-3.148227614919031e-17,-3.13710313571437e-17,-3.1259786565097093e-17,-3.1148541773050484e-17,-3.1037296981003875e-17,-3.0926052188957266e-17,-3.081480739691066e-17,-3.070356260486405e-17,-3.059231781281744e-17,-3.048107302077083e-17,-3.036982822872422e-17,-3.025858343667761e-17,-3.0147338644631004e-17,-3.0036093852584395e-17,-2.9924849060537786e-17,-2.9813604268491177e-17,-2.970235947644457e-17,-2.959111468439796e-17,-2.947986989235135e-17,-2.936862510030474e-17,-2.925738030825813e-17,-2.914613551621152e-17,-2.9034890724164914e-17,-2.8923645932118305e-17,-2.8812401140071696e-17,-2.8701156348025087e-17,-2.858991155597848e-17,-2.847866676393187e-17,-2.836742197188526e-17,-2.825617717983865e-17,-2.814493238779204e-17,-2.803368759574543e-17,-2.7922442803698824e-17,-2.7811198011652215e-17,-2.769995321960561e-17,-2.7588708427559e-17,-2.747746363551239e-17,-2.7366218843465782e-17,-2.7254974051419173e-17,-2.7143729259372564e-17,-2.7032484467325955e-17,-2.6921239675279346e-17,-2.6809994883232737e-17,-2.6698750091186128e-17,-2.658750529913952e-17,-2.647626050709291e-17,-2.63650157150463e-17,-2.6253770922999692e-17,-2.6142526130953086e-17,-2.6031281338906477e-17,-2.5920036546859868e-17,-2.580879175481326e-17,-2.569754696276665e-17,-2.558630217072004e-17,-2.5475057378673432e-17,-2.5363812586626823e-17,-2.5252567794580214e-17,-2.5141323002533605e-17,-2.5030078210486997e-17,-2.4918833418440388e-17,-2.480758862639378e-17,-2.469634383434717e-17,-2.458509904230056e-17,-2.4473854250253952e-17,-2.4362609458207343e-17,-2.4251364666160734e-17,-2.4140119874114125e-17,-2.4028875082067516e-17,-2.3917630290020907e-17,-2.3806385497974298e-17,-2.369514070592769e-17,-2.358389591388108e-17,-2.347265112183447e-17,-2.3361406329787862e-17,-2.3250161537741253e-17,-2.3138916745694644e-17,-2.3027671953648038e-17,-2.291642716160143e-17,-2.280518236955482e-17,-2.269393757750821e-17,-2.2582692785461602e-17,-2.2471447993414993e-17,-2.2360203201368384e-17,-2.2248958409321775e-17,-2.2137713617275166e-17,-2.2026468825228557e-17,-2.1915224033181948e-17,-2.180397924113534e-17,-2.169273444908873e-17,-2.158148965704212e-17,-2.1470244864995512e-17,-2.1359000072948903e-17,-2.1247755280902294e-17,-2.1136510488855685e-17,-2.1025265696809076e-17,-2.0914020904762467e-17,-2.0802776112715858e-17,-2.069153132066925e-17,-2.058028652862264e-17,-2.046904173657603e-17,-2.0357796944529422e-17,-2.0246552152482813e-17,-2.0135307360436204e-17,-2.0024062568389598e-17,-1.991281777634299e-17,-1.980157298429638e-17,-1.969032819224977e-17,-1.9579083400203163e-17,-1.9467838608156554e-17,-1.9356593816109945e-17,-1.9245349024063336e-17,-1.9134104232016727e-17,-1.9022859439970118e-17,-1.891161464792351e-17,-1.88003698558769e-17,-1.868912506383029e-17,-1.8577880271783682e-17,-1.8466635479737073e-17,-1.8355390687690464e-17,-1.8244145895643855e-17,-1.8132901103597246e-17,-1.8021656311550637e-17,-1.7910411519504028e-17,-1.779916672745742e-17,-1.768792193541081e-17,-1.75766771433642e-17,-1.7465432351317592e-17,-1.7354187559270983e-17,-1.7242942767224374e-17,-1.7131697975177765e-17,-1.7020453183131156e-17,-1.690920839108455e-17,-1.679796359903794e-17,-1.6686718806991332e-17,-1.6575474014944723e-17,-1.6464229222898114e-17,-1.6352984430851505e-17,-1.6241739638804896e-17,-1.6130494846758287e-17,-1.6019250054711678e-17,-1.590800526266507e-17,-1.579676047061846e-17,-1.568551567857185e-17,-1.5574270886525242e-17,-1.5463026094478633e-17,-1.5351781302432024e-17,-1.5240536510385415e-17,-1.5129291718338806e-17,-1.5018046926292197e-17,-1.4906802134245588e-17,-1.479555734219898e-17,-1.468431255015237e-17,-1.457306775810576e-17,-1.4461822966059152e-17,-1.4350578174012543e-17,-1.4239333381965934e-17,-1.4128088589919325e-17,-1.4016843797872716e-17,-1.3905599005826107e-17,-1.37943542137795e-17,-1.3683109421732891e-17,-1.3571864629686282e-17,-1.3460619837639673e-17,-1.3349375045593064e-17,-1.3238130253546455e-17,-1.3126885461499846e-17,-1.3015640669453239e-17,-1.290439587740663e-17,-1.279315108536002e-17,-1.2681906293313412e-17,-1.2570661501266803e-17,-1.2459416709220194e-17,-1.2348171917173585e-17,-1.2236927125126976e-17,-1.2125682333080367e-17,-1.2014437541033758e-17,-1.1903192748987149e-17,-1.179194795694054e-17,-1.1680703164893931e-17,-1.1569458372847322e-17,-1.1458213580800714e-17,-1.1346968788754105e-17,-1.1235723996707496e-17,-1.1124479204660888e-17,-1.1013234412614279e-17,-1.090198962056767e-17,-1.079074482852106e-17,-1.0679500036474452e-17,-1.0568255244427843e-17,-1.0457010452381234e-17,-1.0345765660334625e-17,-1.0234520868288016e-17,-1.0123276076241407e-17,-1.0012031284194799e-17,-9.90078649214819e-18,-9.789541700101581e-18,-9.678296908054972e-18,-9.567052116008363e-18,-9.455807323961754e-18,-9.344562531915145e-18,-9.233317739868536e-18,-9.122072947821927e-18,-9.010828155775318e-18,-8.89958336372871e-18,-8.7883385716821e-18,-8.677093779635491e-18,-8.565848987588882e-18,-8.454604195542275e-18,-8.343359403495666e-18,-8.232114611449057e-18,-8.120869819402448e-18,-8.009625027355839e-18,-7.89838023530923e-18,-7.787135443262621e-18,-7.675890651216012e-18,-7.564645859169403e-18,-7.453401067122794e-18,-7.342156275076185e-18,-7.230911483029576e-18,-7.119666690982967e-18,-7.008421898936358e-18,-6.89717710688975e-18,-6.785932314843141e-18,-6.674687522796532e-18,-6.563442730749923e-18,-6.452197938703315e-18,-6.340953146656706e-18,-6.229708354610097e-18,-6.118463562563488e-18,-6.007218770516879e-18,-5.89597397847027e-18,-5.784729186423661e-18,-5.673484394377053e-18,-5.562239602330444e-18,-5.450994810283835e-18,-5.339750018237226e-18,-5.228505226190617e-18,-5.117260434144008e-18,-5.0060156420973996e-18,-4.894770850050791e-18,-4.783526058004182e-18,-4.672281265957573e-18,-4.561036473910964e-18,-4.449791681864355e-18,-4.338546889817746e-18,-4.2273020977711375e-18,-4.1160573057245285e-18,-4.0048125136779195e-18,-3.8935677216313106e-18,-3.7823229295847016e-18,-3.6710781375380926e-18,-3.5598333454914836e-18,-3.448588553444875e-18,-3.337343761398266e-18,-3.2260989693516574e-18,-3.1148541773050484e-18,-3.0036093852584395e-18,-2.8923645932118305e-18,-2.781119801165222e-18,-2.669875009118613e-18,-2.558630217072004e-18,-2.4473854250253953e-18,-2.3361406329787863e-18,-2.2248958409321773e-18,-2.1136510488855687e-18,-2.0024062568389598e-18,-1.8911614647923508e-18,-1.7799166727457418e-18,-1.668671880699133e-18,-1.5574270886525242e-18,-1.4461822966059152e-18,-1.3349375045593064e-18,-1.2236927125126977e-18,-1.1124479204660887e-18,-1.0012031284194799e-18,-8.899583363728709e-19,-7.787135443262621e-19,-6.674687522796532e-19,-5.562239602330443e-19,-4.4497916818643545e-19,-3.337343761398266e-19,-2.2248958409321773e-19,-1.1124479204660886e-19,0.0],"x":[-5.551115123125783e-17,-5.539990643921122e-17,-5.528866164716461e-17,-5.5177416855118e-17,-5.506617206307139e-17,-5.495492727102478e-17,-5.4843682478978173e-17,-5.4732437686931564e-17,-5.4621192894884955e-17,-5.4509948102838346e-17,-5.439870331079174e-17,-5.428745851874513e-17,-5.417621372669852e-17,-5.406496893465191e-17,-5.39537241426053e-17,-5.384247935055869e-17,-5.3731234558512083e-17,-5.3619989766465474e-17,-5.3508744974418865e-17,-5.3397500182372256e-17,-5.328625539032565e-17,-5.317501059827904e-17,-5.306376580623243e-17,-5.295252101418582e-17,-5.284127622213921e-17,-5.27300314300926e-17,-5.2618786638045993e-17,-5.2507541845999384e-17,-5.239629705395278e-17,-5.228505226190617e-17,-5.2173807469859564e-17,-5.2062562677812955e-17,-5.1951317885766346e-17,-5.1840073093719737e-17,-5.172882830167313e-17,-5.161758350962652e-17,-5.150633871757991e-17,-5.13950939255333e-17,-5.128384913348669e-17,-5.117260434144008e-17,-5.1061359549393474e-17,-5.0950114757346865e-17,-5.0838869965300256e-17,-5.0727625173253647e-17,-5.061638038120704e-17,-5.050513558916043e-17,-5.039389079711382e-17,-5.028264600506721e-17,-5.01714012130206e-17,-5.006015642097399e-17,-4.9948911628927384e-17,-4.9837666836880775e-17,-4.9726422044834166e-17,-4.961517725278756e-17,-4.950393246074095e-17,-4.939268766869434e-17,-4.928144287664773e-17,-4.917019808460112e-17,-4.905895329255451e-17,-4.8947708500507903e-17,-4.8836463708461294e-17,-4.8725218916414685e-17,-4.8613974124368076e-17,-4.850272933232147e-17,-4.839148454027486e-17,-4.828023974822825e-17,-4.816899495618164e-17,-4.805775016413503e-17,-4.794650537208842e-17,-4.7835260580041813e-17,-4.7724015787995204e-17,-4.7612770995948595e-17,-4.7501526203901986e-17,-4.739028141185538e-17,-4.727903661980877e-17,-4.716779182776216e-17,-4.705654703571555e-17,-4.694530224366894e-17,-4.683405745162233e-17,-4.6722812659575724e-17,-4.6611567867529115e-17,-4.6500323075482506e-17,-4.6389078283435897e-17,-4.627783349138929e-17,-4.6166588699342685e-17,-4.6055343907296076e-17,-4.5944099115249467e-17,-4.583285432320286e-17,-4.572160953115625e-17,-4.561036473910964e-17,-4.549911994706303e-17,-4.538787515501642e-17,-4.527663036296981e-17,-4.5165385570923204e-17,-4.5054140778876595e-17,-4.4942895986829986e-17,-4.483165119478338e-17,-4.472040640273677e-17,-4.460916161069016e-17,-4.449791681864355e-17,-4.438667202659694e-17,-4.427542723455033e-17,-4.4164182442503723e-17,-4.4052937650457114e-17,-4.3941692858410505e-17,-4.3830448066363896e-17,-4.371920327431729e-17,-4.360795848227068e-17,-4.349671369022407e-17,-4.338546889817746e-17,-4.327422410613085e-17,-4.316297931408424e-17,-4.3051734522037633e-17,-4.2940489729991024e-17,-4.2829244937944415e-17,-4.2718000145897806e-17,-4.26067553538512e-17,-4.249551056180459e-17,-4.238426576975798e-17,-4.227302097771137e-17,-4.216177618566476e-17,-4.205053139361815e-17,-4.1939286601571543e-17,-4.1828041809524934e-17,-4.1716797017478325e-17,-4.1605552225431716e-17,-4.149430743338511e-17,-4.13830626413385e-17,-4.127181784929189e-17,-4.116057305724528e-17,-4.104932826519867e-17,-4.093808347315206e-17,-4.0826838681105454e-17,-4.0715593889058845e-17,-4.0604349097012236e-17,-4.0493104304965627e-17,-4.038185951291902e-17,-4.027061472087241e-17,-4.01593699288258e-17,-4.0048125136779197e-17,-3.993688034473259e-17,-3.982563555268598e-17,-3.971439076063937e-17,-3.960314596859276e-17,-3.949190117654615e-17,-3.938065638449954e-17,-3.9269411592452934e-17,-3.9158166800406325e-17,-3.9046922008359716e-17,-3.893567721631311e-17,-3.88244324242665e-17,-3.871318763221989e-17,-3.860194284017328e-17,-3.849069804812667e-17,-3.837945325608006e-17,-3.8268208464033453e-17,-3.8156963671986844e-17,-3.8045718879940235e-17,-3.7934474087893626e-17,-3.782322929584702e-17,-3.771198450380041e-17,-3.76007397117538e-17,-3.748949491970719e-17,-3.737825012766058e-17,-3.726700533561397e-17,-3.7155760543567363e-17,-3.7044515751520754e-17,-3.6933270959474145e-17,-3.6822026167427536e-17,-3.671078137538093e-17,-3.659953658333432e-17,-3.648829179128771e-17,-3.63770469992411e-17,-3.626580220719449e-17,-3.615455741514788e-17,-3.6043312623101273e-17,-3.5932067831054665e-17,-3.5820823039008056e-17,-3.5709578246961447e-17,-3.559833345491484e-17,-3.548708866286823e-17,-3.537584387082162e-17,-3.526459907877501e-17,-3.51533542867284e-17,-3.504210949468179e-17,-3.4930864702635184e-17,-3.4819619910588575e-17,-3.4708375118541966e-17,-3.4597130326495357e-17,-3.448588553444875e-17,-3.437464074240214e-17,-3.426339595035553e-17,-3.415215115830892e-17,-3.404090636626231e-17,-3.39296615742157e-17,-3.38184167821691e-17,-3.370717199012249e-17,-3.359592719807588e-17,-3.348468240602927e-17,-3.3373437613982664e-17,-3.3262192821936055e-17,-3.3150948029889446e-17,-3.303970323784284e-17,-3.292845844579623e-17,-3.281721365374962e-17,-3.270596886170301e-17,-3.25947240696564e-17,-3.248347927760979e-17,-3.2372234485563183e-17,-3.2260989693516574e-17,-3.2149744901469965e-17,-3.2038500109423356e-17,-3.192725531737675e-17,-3.181601052533014e-17,-3.170476573328353e-17,-3.159352094123692e-17,-3.148227614919031e-17,-3.13710313571437e-17,-3.1259786565097093e-17,-3.1148541773050484e-17,-3.1037296981003875e-17,-3.0926052188957266e-17,-3.081480739691066e-17,-3.070356260486405e-17,-3.059231781281744e-17,-3.048107302077083e-17,-3.036982822872422e-17,-3.025858343667761e-17,-3.0147338644631004e-17,-3.0036093852584395e-17,-2.9924849060537786e-17,-2.9813604268491177e-17,-2.970235947644457e-17,-2.959111468439796e-17,-2.947986989235135e-17,-2.936862510030474e-17,-2.925738030825813e-17,-2.914613551621152e-17,-2.9034890724164914e-17,-2.8923645932118305e-17,-2.8812401140071696e-17,-2.8701156348025087e-17,-2.858991155597848e-17,-2.847866676393187e-17,-2.836742197188526e-17,-2.825617717983865e-17,-2.814493238779204e-17,-2.803368759574543e-17,-2.7922442803698824e-17,-2.7811198011652215e-17,-2.769995321960561e-17,-2.7588708427559e-17,-2.747746363551239e-17,-2.7366218843465782e-17,-2.7254974051419173e-17,-2.7143729259372564e-17,-2.7032484467325955e-17,-2.6921239675279346e-17,-2.6809994883232737e-17,-2.6698750091186128e-17,-2.658750529913952e-17,-2.647626050709291e-17,-2.63650157150463e-17,-2.6253770922999692e-17,-2.6142526130953086e-17,-2.6031281338906477e-17,-2.5920036546859868e-17,-2.580879175481326e-17,-2.569754696276665e-17,-2.558630217072004e-17,-2.5475057378673432e-17,-2.5363812586626823e-17,-2.5252567794580214e-17,-2.5141323002533605e-17,-2.5030078210486997e-17,-2.4918833418440388e-17,-2.480758862639378e-17,-2.469634383434717e-17,-2.458509904230056e-17,-2.4473854250253952e-17,-2.4362609458207343e-17,-2.4251364666160734e-17,-2.4140119874114125e-17,-2.4028875082067516e-17,-2.3917630290020907e-17,-2.3806385497974298e-17,-2.369514070592769e-17,-2.358389591388108e-17,-2.347265112183447e-17,-2.3361406329787862e-17,-2.3250161537741253e-17,-2.3138916745694644e-17,-2.3027671953648038e-17,-2.291642716160143e-17,-2.280518236955482e-17,-2.269393757750821e-17,-2.2582692785461602e-17,-2.2471447993414993e-17,-2.2360203201368384e-17,-2.2248958409321775e-17,-2.2137713617275166e-17,-2.2026468825228557e-17,-2.1915224033181948e-17,-2.180397924113534e-17,-2.169273444908873e-17,-2.158148965704212e-17,-2.1470244864995512e-17,-2.1359000072948903e-17,-2.1247755280902294e-17,-2.1136510488855685e-17,-2.1025265696809076e-17,-2.0914020904762467e-17,-2.0802776112715858e-17,-2.069153132066925e-17,-2.058028652862264e-17,-2.046904173657603e-17,-2.0357796944529422e-17,-2.0246552152482813e-17,-2.0135307360436204e-17,-2.0024062568389598e-17,-1.991281777634299e-17,-1.980157298429638e-17,-1.969032819224977e-17,-1.9579083400203163e-17,-1.9467838608156554e-17,-1.9356593816109945e-17,-1.9245349024063336e-17,-1.9134104232016727e-17,-1.9022859439970118e-17,-1.891161464792351e-17,-1.88003698558769e-17,-1.868912506383029e-17,-1.8577880271783682e-17,-1.8466635479737073e-17,-1.8355390687690464e-17,-1.8244145895643855e-17,-1.8132901103597246e-17,-1.8021656311550637e-17,-1.7910411519504028e-17,-1.779916672745742e-17,-1.768792193541081e-17,-1.75766771433642e-17,-1.7465432351317592e-17,-1.7354187559270983e-17,-1.7242942767224374e-17,-1.7131697975177765e-17,-1.7020453183131156e-17,-1.690920839108455e-17,-1.679796359903794e-17,-1.6686718806991332e-17,-1.6575474014944723e-17,-1.6464229222898114e-17,-1.6352984430851505e-17,-1.6241739638804896e-17,-1.6130494846758287e-17,-1.6019250054711678e-17,-1.590800526266507e-17,-1.579676047061846e-17,-1.568551567857185e-17,-1.5574270886525242e-17,-1.5463026094478633e-17,-1.5351781302432024e-17,-1.5240536510385415e-17,-1.5129291718338806e-17,-1.5018046926292197e-17,-1.4906802134245588e-17,-1.479555734219898e-17,-1.468431255015237e-17,-1.457306775810576e-17,-1.4461822966059152e-17,-1.4350578174012543e-17,-1.4239333381965934e-17,-1.4128088589919325e-17,-1.4016843797872716e-17,-1.3905599005826107e-17,-1.37943542137795e-17,-1.3683109421732891e-17,-1.3571864629686282e-17,-1.3460619837639673e-17,-1.3349375045593064e-17,-1.3238130253546455e-17,-1.3126885461499846e-17,-1.3015640669453239e-17,-1.290439587740663e-17,-1.279315108536002e-17,-1.2681906293313412e-17,-1.2570661501266803e-17,-1.2459416709220194e-17,-1.2348171917173585e-17,-1.2236927125126976e-17,-1.2125682333080367e-17,-1.2014437541033758e-17,-1.1903192748987149e-17,-1.179194795694054e-17,-1.1680703164893931e-17,-1.1569458372847322e-17,-1.1458213580800714e-17,-1.1346968788754105e-17,-1.1235723996707496e-17,-1.1124479204660888e-17,-1.1013234412614279e-17,-1.090198962056767e-17,-1.079074482852106e-17,-1.0679500036474452e-17,-1.0568255244427843e-17,-1.0457010452381234e-17,-1.0345765660334625e-17,-1.0234520868288016e-17,-1.0123276076241407e-17,-1.0012031284194799e-17,-9.90078649214819e-18,-9.789541700101581e-18,-9.678296908054972e-18,-9.567052116008363e-18,-9.455807323961754e-18,-9.344562531915145e-18,-9.233317739868536e-18,-9.122072947821927e-18,-9.010828155775318e-18,-8.89958336372871e-18,-8.7883385716821e-18,-8.677093779635491e-18,-8.565848987588882e-18,-8.454604195542275e-18,-8.343359403495666e-18,-8.232114611449057e-18,-8.120869819402448e-18,-8.009625027355839e-18,-7.89838023530923e-18,-7.787135443262621e-18,-7.675890651216012e-18,-7.564645859169403e-18,-7.453401067122794e-18,-7.342156275076185e-18,-7.230911483029576e-18,-7.119666690982967e-18,-7.008421898936358e-18,-6.89717710688975e-18,-6.785932314843141e-18,-6.674687522796532e-18,-6.563442730749923e-18,-6.452197938703315e-18,-6.340953146656706e-18,-6.229708354610097e-18,-6.118463562563488e-18,-6.007218770516879e-18,-5.89597397847027e-18,-5.784729186423661e-18,-5.673484394377053e-18,-5.562239602330444e-18,-5.450994810283835e-18,-5.339750018237226e-18,-5.228505226190617e-18,-5.117260434144008e-18,-5.0060156420973996e-18,-4.894770850050791e-18,-4.783526058004182e-18,-4.672281265957573e-18,-4.561036473910964e-18,-4.449791681864355e-18,-4.338546889817746e-18,-4.2273020977711375e-18,-4.1160573057245285e-18,-4.0048125136779195e-18,-3.8935677216313106e-18,-3.7823229295847016e-18,-3.6710781375380926e-18,-3.5598333454914836e-18,-3.448588553444875e-18,-3.337343761398266e-18,-3.2260989693516574e-18,-3.1148541773050484e-18,-3.0036093852584395e-18,-2.8923645932118305e-18,-2.781119801165222e-18,-2.669875009118613e-18,-2.558630217072004e-18,-2.4473854250253953e-18,-2.3361406329787863e-18,-2.2248958409321773e-18,-2.1136510488855687e-18,-2.0024062568389598e-18,-1.8911614647923508e-18,-1.7799166727457418e-18,-1.668671880699133e-18,-1.5574270886525242e-18,-1.4461822966059152e-18,-1.3349375045593064e-18,-1.2236927125126977e-18,-1.1124479204660887e-18,-1.0012031284194799e-18,-8.899583363728709e-19,-7.787135443262621e-19,-6.674687522796532e-19,-5.562239602330443e-19,-4.4497916818643545e-19,-3.337343761398266e-19,-2.2248958409321773e-19,-1.1124479204660886e-19,0.0]}

},{}],95:[function(require,module,exports){
module.exports={"expected":[0.0,1.1124479204660886e-19,2.2248958409321773e-19,3.337343761398266e-19,4.4497916818643545e-19,5.562239602330443e-19,6.674687522796532e-19,7.787135443262621e-19,8.899583363728709e-19,1.0012031284194799e-18,1.1124479204660887e-18,1.2236927125126977e-18,1.3349375045593064e-18,1.4461822966059152e-18,1.5574270886525242e-18,1.668671880699133e-18,1.7799166727457418e-18,1.8911614647923508e-18,2.0024062568389598e-18,2.1136510488855687e-18,2.2248958409321773e-18,2.3361406329787863e-18,2.4473854250253953e-18,2.558630217072004e-18,2.669875009118613e-18,2.781119801165222e-18,2.8923645932118305e-18,3.0036093852584395e-18,3.1148541773050484e-18,3.2260989693516574e-18,3.337343761398266e-18,3.448588553444875e-18,3.5598333454914836e-18,3.6710781375380926e-18,3.7823229295847016e-18,3.8935677216313106e-18,4.0048125136779195e-18,4.1160573057245285e-18,4.2273020977711375e-18,4.338546889817746e-18,4.449791681864355e-18,4.561036473910964e-18,4.672281265957573e-18,4.783526058004182e-18,4.894770850050791e-18,5.0060156420973996e-18,5.117260434144008e-18,5.228505226190617e-18,5.339750018237226e-18,5.450994810283835e-18,5.562239602330444e-18,5.673484394377053e-18,5.784729186423661e-18,5.89597397847027e-18,6.007218770516879e-18,6.118463562563488e-18,6.229708354610097e-18,6.340953146656706e-18,6.452197938703315e-18,6.563442730749923e-18,6.674687522796532e-18,6.785932314843141e-18,6.89717710688975e-18,7.008421898936358e-18,7.119666690982967e-18,7.230911483029576e-18,7.342156275076185e-18,7.453401067122794e-18,7.564645859169403e-18,7.675890651216012e-18,7.787135443262621e-18,7.89838023530923e-18,8.009625027355839e-18,8.120869819402448e-18,8.232114611449057e-18,8.343359403495666e-18,8.454604195542275e-18,8.565848987588882e-18,8.677093779635491e-18,8.7883385716821e-18,8.89958336372871e-18,9.010828155775318e-18,9.122072947821927e-18,9.233317739868536e-18,9.344562531915145e-18,9.455807323961754e-18,9.567052116008363e-18,9.678296908054972e-18,9.789541700101581e-18,9.90078649214819e-18,1.0012031284194799e-17,1.0123276076241407e-17,1.0234520868288016e-17,1.0345765660334625e-17,1.0457010452381234e-17,1.0568255244427843e-17,1.0679500036474452e-17,1.079074482852106e-17,1.090198962056767e-17,1.1013234412614279e-17,1.1124479204660888e-17,1.1235723996707496e-17,1.1346968788754105e-17,1.1458213580800714e-17,1.1569458372847322e-17,1.1680703164893931e-17,1.179194795694054e-17,1.1903192748987149e-17,1.2014437541033758e-17,1.2125682333080367e-17,1.2236927125126976e-17,1.2348171917173585e-17,1.2459416709220194e-17,1.2570661501266803e-17,1.2681906293313412e-17,1.279315108536002e-17,1.290439587740663e-17,1.3015640669453239e-17,1.3126885461499846e-17,1.3238130253546455e-17,1.3349375045593064e-17,1.3460619837639673e-17,1.3571864629686282e-17,1.3683109421732891e-17,1.37943542137795e-17,1.3905599005826107e-17,1.4016843797872716e-17,1.4128088589919325e-17,1.4239333381965934e-17,1.4350578174012543e-17,1.4461822966059152e-17,1.457306775810576e-17,1.468431255015237e-17,1.479555734219898e-17,1.4906802134245588e-17,1.5018046926292197e-17,1.5129291718338806e-17,1.5240536510385415e-17,1.5351781302432024e-17,1.5463026094478633e-17,1.5574270886525242e-17,1.568551567857185e-17,1.579676047061846e-17,1.590800526266507e-17,1.6019250054711678e-17,1.6130494846758287e-17,1.6241739638804896e-17,1.6352984430851505e-17,1.6464229222898114e-17,1.6575474014944723e-17,1.6686718806991332e-17,1.679796359903794e-17,1.690920839108455e-17,1.7020453183131156e-17,1.7131697975177765e-17,1.7242942767224374e-17,1.7354187559270983e-17,1.7465432351317592e-17,1.75766771433642e-17,1.768792193541081e-17,1.779916672745742e-17,1.7910411519504028e-17,1.8021656311550637e-17,1.8132901103597246e-17,1.8244145895643855e-17,1.8355390687690464e-17,1.8466635479737073e-17,1.8577880271783682e-17,1.868912506383029e-17,1.88003698558769e-17,1.891161464792351e-17,1.9022859439970118e-17,1.9134104232016727e-17,1.9245349024063336e-17,1.9356593816109945e-17,1.9467838608156554e-17,1.9579083400203163e-17,1.969032819224977e-17,1.980157298429638e-17,1.991281777634299e-17,2.0024062568389598e-17,2.0135307360436204e-17,2.0246552152482813e-17,2.0357796944529422e-17,2.046904173657603e-17,2.058028652862264e-17,2.069153132066925e-17,2.0802776112715858e-17,2.0914020904762467e-17,2.1025265696809076e-17,2.1136510488855685e-17,2.1247755280902294e-17,2.1359000072948903e-17,2.1470244864995512e-17,2.158148965704212e-17,2.169273444908873e-17,2.180397924113534e-17,2.1915224033181948e-17,2.2026468825228557e-17,2.2137713617275166e-17,2.2248958409321775e-17,2.2360203201368384e-17,2.2471447993414993e-17,2.2582692785461602e-17,2.269393757750821e-17,2.280518236955482e-17,2.291642716160143e-17,2.3027671953648038e-17,2.3138916745694644e-17,2.3250161537741253e-17,2.3361406329787862e-17,2.347265112183447e-17,2.358389591388108e-17,2.369514070592769e-17,2.3806385497974298e-17,2.3917630290020907e-17,2.4028875082067516e-17,2.4140119874114125e-17,2.4251364666160734e-17,2.4362609458207343e-17,2.4473854250253952e-17,2.458509904230056e-17,2.469634383434717e-17,2.480758862639378e-17,2.4918833418440388e-17,2.5030078210486997e-17,2.5141323002533605e-17,2.5252567794580214e-17,2.5363812586626823e-17,2.5475057378673432e-17,2.558630217072004e-17,2.569754696276665e-17,2.580879175481326e-17,2.5920036546859868e-17,2.6031281338906477e-17,2.6142526130953086e-17,2.6253770922999692e-17,2.63650157150463e-17,2.647626050709291e-17,2.658750529913952e-17,2.6698750091186128e-17,2.6809994883232737e-17,2.6921239675279346e-17,2.7032484467325955e-17,2.7143729259372564e-17,2.7254974051419173e-17,2.7366218843465782e-17,2.747746363551239e-17,2.7588708427559e-17,2.769995321960561e-17,2.7811198011652215e-17,2.7922442803698824e-17,2.803368759574543e-17,2.814493238779204e-17,2.825617717983865e-17,2.836742197188526e-17,2.847866676393187e-17,2.858991155597848e-17,2.8701156348025087e-17,2.8812401140071696e-17,2.8923645932118305e-17,2.9034890724164914e-17,2.914613551621152e-17,2.925738030825813e-17,2.936862510030474e-17,2.947986989235135e-17,2.959111468439796e-17,2.970235947644457e-17,2.9813604268491177e-17,2.9924849060537786e-17,3.0036093852584395e-17,3.0147338644631004e-17,3.025858343667761e-17,3.036982822872422e-17,3.048107302077083e-17,3.059231781281744e-17,3.070356260486405e-17,3.081480739691066e-17,3.0926052188957266e-17,3.1037296981003875e-17,3.1148541773050484e-17,3.1259786565097093e-17,3.13710313571437e-17,3.148227614919031e-17,3.159352094123692e-17,3.170476573328353e-17,3.181601052533014e-17,3.192725531737675e-17,3.2038500109423356e-17,3.2149744901469965e-17,3.2260989693516574e-17,3.2372234485563183e-17,3.248347927760979e-17,3.25947240696564e-17,3.270596886170301e-17,3.281721365374962e-17,3.292845844579623e-17,3.303970323784284e-17,3.3150948029889446e-17,3.3262192821936055e-17,3.3373437613982664e-17,3.348468240602927e-17,3.359592719807588e-17,3.370717199012249e-17,3.38184167821691e-17,3.39296615742157e-17,3.404090636626231e-17,3.415215115830892e-17,3.426339595035553e-17,3.437464074240214e-17,3.448588553444875e-17,3.4597130326495357e-17,3.4708375118541966e-17,3.4819619910588575e-17,3.4930864702635184e-17,3.504210949468179e-17,3.51533542867284e-17,3.526459907877501e-17,3.537584387082162e-17,3.548708866286823e-17,3.559833345491484e-17,3.5709578246961447e-17,3.5820823039008056e-17,3.5932067831054665e-17,3.6043312623101273e-17,3.615455741514788e-17,3.626580220719449e-17,3.63770469992411e-17,3.648829179128771e-17,3.659953658333432e-17,3.671078137538093e-17,3.6822026167427536e-17,3.6933270959474145e-17,3.7044515751520754e-17,3.7155760543567363e-17,3.726700533561397e-17,3.737825012766058e-17,3.748949491970719e-17,3.76007397117538e-17,3.771198450380041e-17,3.782322929584702e-17,3.7934474087893626e-17,3.8045718879940235e-17,3.8156963671986844e-17,3.8268208464033453e-17,3.837945325608006e-17,3.849069804812667e-17,3.860194284017328e-17,3.871318763221989e-17,3.88244324242665e-17,3.893567721631311e-17,3.9046922008359716e-17,3.9158166800406325e-17,3.9269411592452934e-17,3.938065638449954e-17,3.949190117654615e-17,3.960314596859276e-17,3.971439076063937e-17,3.982563555268598e-17,3.993688034473259e-17,4.0048125136779197e-17,4.01593699288258e-17,4.027061472087241e-17,4.038185951291902e-17,4.0493104304965627e-17,4.0604349097012236e-17,4.0715593889058845e-17,4.0826838681105454e-17,4.093808347315206e-17,4.104932826519867e-17,4.116057305724528e-17,4.127181784929189e-17,4.13830626413385e-17,4.149430743338511e-17,4.1605552225431716e-17,4.1716797017478325e-17,4.1828041809524934e-17,4.1939286601571543e-17,4.205053139361815e-17,4.216177618566476e-17,4.227302097771137e-17,4.238426576975798e-17,4.249551056180459e-17,4.26067553538512e-17,4.2718000145897806e-17,4.2829244937944415e-17,4.2940489729991024e-17,4.3051734522037633e-17,4.316297931408424e-17,4.327422410613085e-17,4.338546889817746e-17,4.349671369022407e-17,4.360795848227068e-17,4.371920327431729e-17,4.3830448066363896e-17,4.3941692858410505e-17,4.4052937650457114e-17,4.4164182442503723e-17,4.427542723455033e-17,4.438667202659694e-17,4.449791681864355e-17,4.460916161069016e-17,4.472040640273677e-17,4.483165119478338e-17,4.4942895986829986e-17,4.5054140778876595e-17,4.5165385570923204e-17,4.527663036296981e-17,4.538787515501642e-17,4.549911994706303e-17,4.561036473910964e-17,4.572160953115625e-17,4.583285432320286e-17,4.5944099115249467e-17,4.6055343907296076e-17,4.6166588699342685e-17,4.627783349138929e-17,4.6389078283435897e-17,4.6500323075482506e-17,4.6611567867529115e-17,4.6722812659575724e-17,4.683405745162233e-17,4.694530224366894e-17,4.705654703571555e-17,4.716779182776216e-17,4.727903661980877e-17,4.739028141185538e-17,4.7501526203901986e-17,4.7612770995948595e-17,4.7724015787995204e-17,4.7835260580041813e-17,4.794650537208842e-17,4.805775016413503e-17,4.816899495618164e-17,4.828023974822825e-17,4.839148454027486e-17,4.850272933232147e-17,4.8613974124368076e-17,4.8725218916414685e-17,4.8836463708461294e-17,4.8947708500507903e-17,4.905895329255451e-17,4.917019808460112e-17,4.928144287664773e-17,4.939268766869434e-17,4.950393246074095e-17,4.961517725278756e-17,4.9726422044834166e-17,4.9837666836880775e-17,4.9948911628927384e-17,5.006015642097399e-17,5.01714012130206e-17,5.028264600506721e-17,5.039389079711382e-17,5.050513558916043e-17,5.061638038120704e-17,5.0727625173253647e-17,5.0838869965300256e-17,5.0950114757346865e-17,5.1061359549393474e-17,5.117260434144008e-17,5.128384913348669e-17,5.13950939255333e-17,5.150633871757991e-17,5.161758350962652e-17,5.172882830167313e-17,5.1840073093719737e-17,5.1951317885766346e-17,5.2062562677812955e-17,5.2173807469859564e-17,5.228505226190617e-17,5.239629705395278e-17,5.2507541845999384e-17,5.2618786638045993e-17,5.27300314300926e-17,5.284127622213921e-17,5.295252101418582e-17,5.306376580623243e-17,5.317501059827904e-17,5.328625539032565e-17,5.3397500182372256e-17,5.3508744974418865e-17,5.3619989766465474e-17,5.3731234558512083e-17,5.384247935055869e-17,5.39537241426053e-17,5.406496893465191e-17,5.417621372669852e-17,5.428745851874513e-17,5.439870331079174e-17,5.4509948102838346e-17,5.4621192894884955e-17,5.4732437686931564e-17,5.4843682478978173e-17,5.495492727102478e-17,5.506617206307139e-17,5.5177416855118e-17,5.528866164716461e-17,5.539990643921122e-17,5.551115123125783e-17],"x":[0.0,1.1124479204660886e-19,2.2248958409321773e-19,3.337343761398266e-19,4.4497916818643545e-19,5.562239602330443e-19,6.674687522796532e-19,7.787135443262621e-19,8.899583363728709e-19,1.0012031284194799e-18,1.1124479204660887e-18,1.2236927125126977e-18,1.3349375045593064e-18,1.4461822966059152e-18,1.5574270886525242e-18,1.668671880699133e-18,1.7799166727457418e-18,1.8911614647923508e-18,2.0024062568389598e-18,2.1136510488855687e-18,2.2248958409321773e-18,2.3361406329787863e-18,2.4473854250253953e-18,2.558630217072004e-18,2.669875009118613e-18,2.781119801165222e-18,2.8923645932118305e-18,3.0036093852584395e-18,3.1148541773050484e-18,3.2260989693516574e-18,3.337343761398266e-18,3.448588553444875e-18,3.5598333454914836e-18,3.6710781375380926e-18,3.7823229295847016e-18,3.8935677216313106e-18,4.0048125136779195e-18,4.1160573057245285e-18,4.2273020977711375e-18,4.338546889817746e-18,4.449791681864355e-18,4.561036473910964e-18,4.672281265957573e-18,4.783526058004182e-18,4.894770850050791e-18,5.0060156420973996e-18,5.117260434144008e-18,5.228505226190617e-18,5.339750018237226e-18,5.450994810283835e-18,5.562239602330444e-18,5.673484394377053e-18,5.784729186423661e-18,5.89597397847027e-18,6.007218770516879e-18,6.118463562563488e-18,6.229708354610097e-18,6.340953146656706e-18,6.452197938703315e-18,6.563442730749923e-18,6.674687522796532e-18,6.785932314843141e-18,6.89717710688975e-18,7.008421898936358e-18,7.119666690982967e-18,7.230911483029576e-18,7.342156275076185e-18,7.453401067122794e-18,7.564645859169403e-18,7.675890651216012e-18,7.787135443262621e-18,7.89838023530923e-18,8.009625027355839e-18,8.120869819402448e-18,8.232114611449057e-18,8.343359403495666e-18,8.454604195542275e-18,8.565848987588882e-18,8.677093779635491e-18,8.7883385716821e-18,8.89958336372871e-18,9.010828155775318e-18,9.122072947821927e-18,9.233317739868536e-18,9.344562531915145e-18,9.455807323961754e-18,9.567052116008363e-18,9.678296908054972e-18,9.789541700101581e-18,9.90078649214819e-18,1.0012031284194799e-17,1.0123276076241407e-17,1.0234520868288016e-17,1.0345765660334625e-17,1.0457010452381234e-17,1.0568255244427843e-17,1.0679500036474452e-17,1.079074482852106e-17,1.090198962056767e-17,1.1013234412614279e-17,1.1124479204660888e-17,1.1235723996707496e-17,1.1346968788754105e-17,1.1458213580800714e-17,1.1569458372847322e-17,1.1680703164893931e-17,1.179194795694054e-17,1.1903192748987149e-17,1.2014437541033758e-17,1.2125682333080367e-17,1.2236927125126976e-17,1.2348171917173585e-17,1.2459416709220194e-17,1.2570661501266803e-17,1.2681906293313412e-17,1.279315108536002e-17,1.290439587740663e-17,1.3015640669453239e-17,1.3126885461499846e-17,1.3238130253546455e-17,1.3349375045593064e-17,1.3460619837639673e-17,1.3571864629686282e-17,1.3683109421732891e-17,1.37943542137795e-17,1.3905599005826107e-17,1.4016843797872716e-17,1.4128088589919325e-17,1.4239333381965934e-17,1.4350578174012543e-17,1.4461822966059152e-17,1.457306775810576e-17,1.468431255015237e-17,1.479555734219898e-17,1.4906802134245588e-17,1.5018046926292197e-17,1.5129291718338806e-17,1.5240536510385415e-17,1.5351781302432024e-17,1.5463026094478633e-17,1.5574270886525242e-17,1.568551567857185e-17,1.579676047061846e-17,1.590800526266507e-17,1.6019250054711678e-17,1.6130494846758287e-17,1.6241739638804896e-17,1.6352984430851505e-17,1.6464229222898114e-17,1.6575474014944723e-17,1.6686718806991332e-17,1.679796359903794e-17,1.690920839108455e-17,1.7020453183131156e-17,1.7131697975177765e-17,1.7242942767224374e-17,1.7354187559270983e-17,1.7465432351317592e-17,1.75766771433642e-17,1.768792193541081e-17,1.779916672745742e-17,1.7910411519504028e-17,1.8021656311550637e-17,1.8132901103597246e-17,1.8244145895643855e-17,1.8355390687690464e-17,1.8466635479737073e-17,1.8577880271783682e-17,1.868912506383029e-17,1.88003698558769e-17,1.891161464792351e-17,1.9022859439970118e-17,1.9134104232016727e-17,1.9245349024063336e-17,1.9356593816109945e-17,1.9467838608156554e-17,1.9579083400203163e-17,1.969032819224977e-17,1.980157298429638e-17,1.991281777634299e-17,2.0024062568389598e-17,2.0135307360436204e-17,2.0246552152482813e-17,2.0357796944529422e-17,2.046904173657603e-17,2.058028652862264e-17,2.069153132066925e-17,2.0802776112715858e-17,2.0914020904762467e-17,2.1025265696809076e-17,2.1136510488855685e-17,2.1247755280902294e-17,2.1359000072948903e-17,2.1470244864995512e-17,2.158148965704212e-17,2.169273444908873e-17,2.180397924113534e-17,2.1915224033181948e-17,2.2026468825228557e-17,2.2137713617275166e-17,2.2248958409321775e-17,2.2360203201368384e-17,2.2471447993414993e-17,2.2582692785461602e-17,2.269393757750821e-17,2.280518236955482e-17,2.291642716160143e-17,2.3027671953648038e-17,2.3138916745694644e-17,2.3250161537741253e-17,2.3361406329787862e-17,2.347265112183447e-17,2.358389591388108e-17,2.369514070592769e-17,2.3806385497974298e-17,2.3917630290020907e-17,2.4028875082067516e-17,2.4140119874114125e-17,2.4251364666160734e-17,2.4362609458207343e-17,2.4473854250253952e-17,2.458509904230056e-17,2.469634383434717e-17,2.480758862639378e-17,2.4918833418440388e-17,2.5030078210486997e-17,2.5141323002533605e-17,2.5252567794580214e-17,2.5363812586626823e-17,2.5475057378673432e-17,2.558630217072004e-17,2.569754696276665e-17,2.580879175481326e-17,2.5920036546859868e-17,2.6031281338906477e-17,2.6142526130953086e-17,2.6253770922999692e-17,2.63650157150463e-17,2.647626050709291e-17,2.658750529913952e-17,2.6698750091186128e-17,2.6809994883232737e-17,2.6921239675279346e-17,2.7032484467325955e-17,2.7143729259372564e-17,2.7254974051419173e-17,2.7366218843465782e-17,2.747746363551239e-17,2.7588708427559e-17,2.769995321960561e-17,2.7811198011652215e-17,2.7922442803698824e-17,2.803368759574543e-17,2.814493238779204e-17,2.825617717983865e-17,2.836742197188526e-17,2.847866676393187e-17,2.858991155597848e-17,2.8701156348025087e-17,2.8812401140071696e-17,2.8923645932118305e-17,2.9034890724164914e-17,2.914613551621152e-17,2.925738030825813e-17,2.936862510030474e-17,2.947986989235135e-17,2.959111468439796e-17,2.970235947644457e-17,2.9813604268491177e-17,2.9924849060537786e-17,3.0036093852584395e-17,3.0147338644631004e-17,3.025858343667761e-17,3.036982822872422e-17,3.048107302077083e-17,3.059231781281744e-17,3.070356260486405e-17,3.081480739691066e-17,3.0926052188957266e-17,3.1037296981003875e-17,3.1148541773050484e-17,3.1259786565097093e-17,3.13710313571437e-17,3.148227614919031e-17,3.159352094123692e-17,3.170476573328353e-17,3.181601052533014e-17,3.192725531737675e-17,3.2038500109423356e-17,3.2149744901469965e-17,3.2260989693516574e-17,3.2372234485563183e-17,3.248347927760979e-17,3.25947240696564e-17,3.270596886170301e-17,3.281721365374962e-17,3.292845844579623e-17,3.303970323784284e-17,3.3150948029889446e-17,3.3262192821936055e-17,3.3373437613982664e-17,3.348468240602927e-17,3.359592719807588e-17,3.370717199012249e-17,3.38184167821691e-17,3.39296615742157e-17,3.404090636626231e-17,3.415215115830892e-17,3.426339595035553e-17,3.437464074240214e-17,3.448588553444875e-17,3.4597130326495357e-17,3.4708375118541966e-17,3.4819619910588575e-17,3.4930864702635184e-17,3.504210949468179e-17,3.51533542867284e-17,3.526459907877501e-17,3.537584387082162e-17,3.548708866286823e-17,3.559833345491484e-17,3.5709578246961447e-17,3.5820823039008056e-17,3.5932067831054665e-17,3.6043312623101273e-17,3.615455741514788e-17,3.626580220719449e-17,3.63770469992411e-17,3.648829179128771e-17,3.659953658333432e-17,3.671078137538093e-17,3.6822026167427536e-17,3.6933270959474145e-17,3.7044515751520754e-17,3.7155760543567363e-17,3.726700533561397e-17,3.737825012766058e-17,3.748949491970719e-17,3.76007397117538e-17,3.771198450380041e-17,3.782322929584702e-17,3.7934474087893626e-17,3.8045718879940235e-17,3.8156963671986844e-17,3.8268208464033453e-17,3.837945325608006e-17,3.849069804812667e-17,3.860194284017328e-17,3.871318763221989e-17,3.88244324242665e-17,3.893567721631311e-17,3.9046922008359716e-17,3.9158166800406325e-17,3.9269411592452934e-17,3.938065638449954e-17,3.949190117654615e-17,3.960314596859276e-17,3.971439076063937e-17,3.982563555268598e-17,3.993688034473259e-17,4.0048125136779197e-17,4.01593699288258e-17,4.027061472087241e-17,4.038185951291902e-17,4.0493104304965627e-17,4.0604349097012236e-17,4.0715593889058845e-17,4.0826838681105454e-17,4.093808347315206e-17,4.104932826519867e-17,4.116057305724528e-17,4.127181784929189e-17,4.13830626413385e-17,4.149430743338511e-17,4.1605552225431716e-17,4.1716797017478325e-17,4.1828041809524934e-17,4.1939286601571543e-17,4.205053139361815e-17,4.216177618566476e-17,4.227302097771137e-17,4.238426576975798e-17,4.249551056180459e-17,4.26067553538512e-17,4.2718000145897806e-17,4.2829244937944415e-17,4.2940489729991024e-17,4.3051734522037633e-17,4.316297931408424e-17,4.327422410613085e-17,4.338546889817746e-17,4.349671369022407e-17,4.360795848227068e-17,4.371920327431729e-17,4.3830448066363896e-17,4.3941692858410505e-17,4.4052937650457114e-17,4.4164182442503723e-17,4.427542723455033e-17,4.438667202659694e-17,4.449791681864355e-17,4.460916161069016e-17,4.472040640273677e-17,4.483165119478338e-17,4.4942895986829986e-17,4.5054140778876595e-17,4.5165385570923204e-17,4.527663036296981e-17,4.538787515501642e-17,4.549911994706303e-17,4.561036473910964e-17,4.572160953115625e-17,4.583285432320286e-17,4.5944099115249467e-17,4.6055343907296076e-17,4.6166588699342685e-17,4.627783349138929e-17,4.6389078283435897e-17,4.6500323075482506e-17,4.6611567867529115e-17,4.6722812659575724e-17,4.683405745162233e-17,4.694530224366894e-17,4.705654703571555e-17,4.716779182776216e-17,4.727903661980877e-17,4.739028141185538e-17,4.7501526203901986e-17,4.7612770995948595e-17,4.7724015787995204e-17,4.7835260580041813e-17,4.794650537208842e-17,4.805775016413503e-17,4.816899495618164e-17,4.828023974822825e-17,4.839148454027486e-17,4.850272933232147e-17,4.8613974124368076e-17,4.8725218916414685e-17,4.8836463708461294e-17,4.8947708500507903e-17,4.905895329255451e-17,4.917019808460112e-17,4.928144287664773e-17,4.939268766869434e-17,4.950393246074095e-17,4.961517725278756e-17,4.9726422044834166e-17,4.9837666836880775e-17,4.9948911628927384e-17,5.006015642097399e-17,5.01714012130206e-17,5.028264600506721e-17,5.039389079711382e-17,5.050513558916043e-17,5.061638038120704e-17,5.0727625173253647e-17,5.0838869965300256e-17,5.0950114757346865e-17,5.1061359549393474e-17,5.117260434144008e-17,5.128384913348669e-17,5.13950939255333e-17,5.150633871757991e-17,5.161758350962652e-17,5.172882830167313e-17,5.1840073093719737e-17,5.1951317885766346e-17,5.2062562677812955e-17,5.2173807469859564e-17,5.228505226190617e-17,5.239629705395278e-17,5.2507541845999384e-17,5.2618786638045993e-17,5.27300314300926e-17,5.284127622213921e-17,5.295252101418582e-17,5.306376580623243e-17,5.317501059827904e-17,5.328625539032565e-17,5.3397500182372256e-17,5.3508744974418865e-17,5.3619989766465474e-17,5.3731234558512083e-17,5.384247935055869e-17,5.39537241426053e-17,5.406496893465191e-17,5.417621372669852e-17,5.428745851874513e-17,5.439870331079174e-17,5.4509948102838346e-17,5.4621192894884955e-17,5.4732437686931564e-17,5.4843682478978173e-17,5.495492727102478e-17,5.506617206307139e-17,5.5177416855118e-17,5.528866164716461e-17,5.539990643921122e-17,5.551115123125783e-17]}

},{}],96:[function(require,module,exports){
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
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var incrspace = require( '@stdlib/array/base/incrspace' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var log1p = require( './../lib' );


// FIXTURES //

var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var bigPositive = require( './fixtures/julia/big_positive.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof log1p, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function agrees with `ln(x+1)` for most `x`', function test( t ) {
	var expected;
	var delta;
	var val;
	var tol;
	var x;
	var y;
	var i;

	x = incrspace( -0.5, 1000.0, 0.5 );
	for ( i = 0; i < x.length; i++ ) {
		val = x[ i ];
		y = log1p( val );
		expected = ln( val + 1.0 );
		delta = abs( y - expected );
		tol = 1.0e-12 * abs( expected );
		t.ok( delta <= tol, 'within tolerance. x: ' + val + '. Value: ' + y + '. Expected: ' + expected + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for negative medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for negative small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for negative tiny numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive tiny numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for negative large numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive large numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive big numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = bigPositive.x;
	expected = bigPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive huge numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = hugePositive.x;
	expected = hugePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function returns `-infinity` if provided `-1`', function test( t ) {
	t.equal( log1p( -1.0 ), NINF, 'equals -infinity' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	t.equal( log1p( PINF ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `NaN` if provided a number smaller than -1', function test( t ) {
	var val;

	val = log1p( -2.0 );
	t.equal( isnan( val ), true, 'returns NaN' );

	val = log1p( NINF );
	t.equal( isnan( val ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var val = log1p( NaN );
	t.equal( isnan( val ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `0` if provided `+0`', function test( t ) {
	t.equal( log1p( +0.0 ), 0.0, 'equals 0' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0` (IEEE 754-2008)', function test( t ) {
	t.equal( isNegativeZero( log1p( -0.0 ) ), true, 'returns -0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/log1p/test/test.js")
},{"./../lib":83,"./fixtures/julia/big_positive.json":86,"./fixtures/julia/huge_positive.json":87,"./fixtures/julia/large_negative.json":88,"./fixtures/julia/large_positive.json":89,"./fixtures/julia/medium_negative.json":90,"./fixtures/julia/medium_positive.json":91,"./fixtures/julia/small_negative.json":92,"./fixtures/julia/small_positive.json":93,"./fixtures/julia/tiny_negative.json":94,"./fixtures/julia/tiny_positive.json":95,"@stdlib/array/base/incrspace":1,"@stdlib/constants/float64/eps":64,"@stdlib/constants/float64/ninf":66,"@stdlib/constants/float64/pinf":67,"@stdlib/math/base/assert/is-nan":71,"@stdlib/math/base/assert/is-negative-zero":73,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/ln":79,"tape":283}],97:[function(require,module,exports){
(function (__filename,__dirname){(function (){
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

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var incrspace = require( '@stdlib/array/base/incrspace' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var tryRequire = require( '@stdlib/utils/try-require' );
var EPS = require( '@stdlib/constants/float64/eps' );


// FIXTURES //

var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var bigPositive = require( './fixtures/julia/big_positive.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );


// VARIABLES //

var log1p = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( log1p instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof log1p, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function agrees with `ln(x+1)` for most `x`', opts, function test( t ) {
	var expected;
	var delta;
	var val;
	var tol;
	var x;
	var y;
	var i;

	x = incrspace( -0.5, 1000.0, 0.5 );
	for ( i = 0; i < x.length; i++ ) {
		val = x[ i ];
		y = log1p( val );
		expected = ln( val + 1.0 );
		delta = abs( y - expected );
		tol = 1.0e-12 * abs( expected );
		t.ok( delta <= tol, 'within tolerance. x: ' + val + '. Value: ' + y + '. Expected: ' + expected + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for negative medium numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive medium numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for negative small numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive small numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for negative tiny numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive tiny numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for negative large numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive large numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive big numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = bigPositive.x;
	expected = bigPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `ln(x+1)` for positive huge numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var v;
	var x;
	var i;

	x = hugePositive.x;
	expected = hugePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = log1p( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function returns `-infinity` if provided `-1`', opts, function test( t ) {
	t.equal( log1p( -1.0 ), NINF, 'equals -infinity' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', opts, function test( t ) {
	t.equal( log1p( PINF ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `NaN` if provided a number smaller than -1', opts, function test( t ) {
	var val;

	val = log1p( -2.0 );
	t.equal( isnan( val ), true, 'returns NaN' );

	val = log1p( NINF );
	t.equal( isnan( val ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', opts, function test( t ) {
	var val = log1p( NaN );
	t.equal( isnan( val ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `0` if provided `+0`', opts, function test( t ) {
	t.equal( log1p( +0.0 ), 0.0, 'equals 0' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0` (IEEE 754-2008)', opts, function test( t ) {
	t.equal( isNegativeZero( log1p( -0.0 ) ), true, 'returns -0' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/log1p/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/log1p/test")
},{"./fixtures/julia/big_positive.json":86,"./fixtures/julia/huge_positive.json":87,"./fixtures/julia/large_negative.json":88,"./fixtures/julia/large_positive.json":89,"./fixtures/julia/medium_negative.json":90,"./fixtures/julia/medium_positive.json":91,"./fixtures/julia/small_negative.json":92,"./fixtures/julia/small_positive.json":93,"./fixtures/julia/tiny_negative.json":94,"./fixtures/julia/tiny_positive.json":95,"@stdlib/array/base/incrspace":1,"@stdlib/constants/float64/eps":64,"@stdlib/constants/float64/ninf":66,"@stdlib/constants/float64/pinf":67,"@stdlib/math/base/assert/is-nan":71,"@stdlib/math/base/assert/is-negative-zero":73,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/ln":79,"@stdlib/utils/try-require":151,"path":165,"tape":283}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":50}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":100,"@stdlib/array/float64":3,"@stdlib/array/uint32":9}],103:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":50,"dup":100}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":103,"@stdlib/array/float64":3,"@stdlib/array/uint32":9}],106:[function(require,module,exports){
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
* Object constructor.
*
* @module @stdlib/object/ctor
*
* @example
* var Object = require( '@stdlib/object/ctor' );
*
* var o = new Object( null );
* // returns {}
*
* o = new Object( 5.0 );
* // returns <Number>
*
* o = new Object( 'beep' );
* // returns <String>
*
* var o1 = {};
*
* var o2 = new Object( o1 );
* // returns {}
*
* var bool = ( o1 === o2 );
* // returns true
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":107}],107:[function(require,module,exports){
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

// MAIN //

/**
* Returns an object.
*
* @name Object
* @constructor
* @type {Function}
* @param {*} value - input value
* @returns {Object} object
*
* @example
* var o = new Object( null );
* // returns {}
*
* @example
* var o = new Object( 5.0 );
* // returns <Number>
*
* @example
* var o = new Object( 'beep' );
* // returns <String>
*
* @example
* var o1 = {};
*
* var o2 = new Object( o1 );
* // returns {}
*
* var bool = ( o1 === o2 );
* // returns true
*/
var Obj = Object; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Obj;

},{}],108:[function(require,module,exports){
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
var main = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( main, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = main;

},{"./main.js":109,"./regexp.js":110,"@stdlib/utils/define-nonenumerable-read-only-property":128}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":109}],111:[function(require,module,exports){
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

},{"./is_number.js":114}],112:[function(require,module,exports){
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

},{"./is_number.js":114,"./zero_pad.js":118}],113:[function(require,module,exports){
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

},{"./main.js":116}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{"./format_double.js":111,"./format_integer.js":112,"./is_string.js":115,"./space_pad.js":117,"./zero_pad.js":118}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{"./main.js":120}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{"./main.js":123}],122:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"dup":115}],123:[function(require,module,exports){
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

},{"./is_string.js":122,"@stdlib/string/base/format-interpolate":113,"@stdlib/string/base/format-tokenize":119}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"@stdlib/assert/is-buffer":41,"@stdlib/regexp/function-name":108,"@stdlib/utils/native-class":146}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":129}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":133}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{"./define_property.js":131}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":130,"./has_define_property_support.js":132,"./polyfill.js":134}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":121}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":138,"./polyfill.js":139,"@stdlib/assert/is-function":47}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var Object = require( '@stdlib/object/ctor' );
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

},{"./detect.js":135,"@stdlib/object/ctor":106}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./proto.js":140,"@stdlib/utils/native-class":146}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MODULES //

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var GlobalThis = require( './global_this.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @private
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
			throw new TypeError( format( 'invalid argument. Must provide a boolean. Value: `%s`.', codegen ) );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: 2020 revision of ECMAScript standard
	if ( GlobalThis ) {
		return GlobalThis;
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":142,"./global_this.js":143,"./self.js":144,"./window.js":145,"@stdlib/assert/is-boolean":35,"@stdlib/string/format":121}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func, stdlib/require-globals
}


// EXPORTS //

module.exports = getGlobal;

},{}],143:[function(require,module,exports){
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

// MAIN //

var obj = ( typeof globalThis === 'object' ) ? globalThis : null; // eslint-disable-line no-undef


// EXPORTS //

module.exports = obj;

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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":147,"./polyfill.js":148,"@stdlib/assert/has-tostringtag-support":22}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":149}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":149,"./tostringtag.js":150,"@stdlib/assert/has-own-property":18}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],150:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":124}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":43}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":154,"./fixtures/re.js":155,"./fixtures/typedarray.js":156}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":141}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

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
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : builtin;


// EXPORTS //

module.exports = main;

},{"./check.js":153,"./main.js":158,"./polyfill.js":159}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":126}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":126}],160:[function(require,module,exports){
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
},{}]},{},[96,97]);
