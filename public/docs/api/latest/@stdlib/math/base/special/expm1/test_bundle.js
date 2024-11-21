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

},{"@stdlib/math/base/special/ceil":98}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":26,"@stdlib/assert/is-uint16array":54,"@stdlib/constants/uint16/max":79}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":29,"@stdlib/assert/is-uint32array":56,"@stdlib/constants/uint32/max":80}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":32,"@stdlib/assert/is-uint8array":58,"@stdlib/constants/uint8/max":81}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":202}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":36,"./object.js":37,"./primitive.js":38,"@stdlib/utils/define-nonenumerable-read-only-property":184}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":40,"@stdlib/assert/has-tostringtag-support":22,"@stdlib/boolean/ctor":62,"@stdlib/utils/native-class":202}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/get-prototype-of":192,"@stdlib/utils/native-class":202}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":202}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":213}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":53,"@stdlib/assert/tools/array-function":60,"@stdlib/utils/define-nonenumerable-read-only-property":184}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":202}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":202}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":202}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":33,"@stdlib/string/format":177}],62:[function(require,module,exports){
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
* One half times the natural logarithm of 2.
*
* @module @stdlib/constants/float64/half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
* // returns 3.46573590279972654709e-01
*/

// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ```tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

},{}],67:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"@stdlib/number/ctor":137}],76:[function(require,module,exports){
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

},{"./main.js":83}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-integer":86}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":75,"@stdlib/constants/float64/pinf":77}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":118}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":75}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-even":82}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":77}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":97}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/high-word-abs-mask":67,"@stdlib/constants/float64/high-word-sign-mask":69,"@stdlib/number/float64/base/from-words":141,"@stdlib/number/float64/base/get-high-word":145,"@stdlib/number/float64/base/to-words":157}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":105,"@stdlib/math/base/special/ldexp":120}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./expmulti.js":102,"@stdlib/constants/float64/ninf":75,"@stdlib/constants/float64/pinf":77,"@stdlib/math/base/assert/is-nan":88,"@stdlib/math/base/special/trunc":135}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './main.js' );


// EXPORTS //

module.exports = expm1;

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
*
*
* ## Notice
*
* The following copyright, license, and long comment were part of the original implementation available as part of [FDLIBM]{@link http://www.netlib.org/fdlibm/s_expm1.c} and [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/s_expm1.c}. The implementation follows the original, but has been modified for JavaScript.
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
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/float64/exponent-bias' );
var HALF_LN2 = require( '@stdlib/constants/float64/half-ln-two' );
var polyval = require( './polyval_q.js' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* ## Method
*
* 1.  Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*     ```tex
*     x = k \cdot \ln(2) + r
*     ```
*
*     where
*
*     ```tex
*     |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*     ```
*
*     <!-- <note> -->
*
*     A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*
*     <!-- </note> -->
*
* 2.  To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\(\[0,0.34658]\\). Since
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     ```
*
*     we define \\(\operatorname{R1}(r^2)\\) by
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*     ```
*
*     That is,
*
*     ```tex
*     \begin{align*}
*     \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*     &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*     &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\(\[0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*     ```tex
*     \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*     ```
*
*     where
*
*     ```tex
*     \begin{align*}
*     \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*     \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*     \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*     \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*     \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*     \end{align*}
*     ```
*
*     where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*     ```tex
*     \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*     ```
*
*     \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*     ```tex
*     \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*     ```
*
*     To compensate for the error in the argument reduction, we use
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*     &\approx \operatorname{expm1}(r) + c + rc
*     \end{align*}
*     ```
*
*     Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*     &= r - \mathrm{E}
*     \end{align*}
*     ```
*
* 3.  To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*     ```tex
*     \operatorname{expm1}(x) = \begin{cases}
*     2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*     2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
* ## Notes
*
* -   For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
*
* -   To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
*
* -   To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*
*     -   if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*
*     -   if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*
*     -   if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*
*     -   if \\(k = 1\\),
*
*         -   if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*         -   else return \\(1+2(r-\mathrm{E})\\)
*
*     -   if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*
*     -   if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*
*     -   else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)
*
* -   For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
*
* -   The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
*
* @example
* var v = expm1( -9.0 );
* // returns ~-0.9999
*
* @example
* var v = expm1( 0.0 );
* // returns 0.0
*
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var twopk;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = getHighWord( y )|0; // asm type annotation

	// Argument reduction...
	if ( y > HALF_LN2 ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k |= 0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// If |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	} else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	twopk = fromWords( (FLOAT64_EXPONENT_BIAS+k)<<20, 0 ); // 2^k
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) ) - 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1.0 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);
		if ( k === 1024 ) {
			// Add k to y's exponent:
			hi = (getHighWord( y ) + (k<<20))|0; // asm type annotation
			y = setHighWord( y, hi );
		} else {
			y *= twopk;
		}
		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x3ff00000 = 00111111111100000000000000000000 and 0x200000 = 0 00000000010 00000000000000000000
		hi = (1072693248 - (0x200000>>k))|0; // asm type annotation
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (FLOAT64_EXPONENT_BIAS-k)<<20 )|0; // asm type annotation
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	y *= twopk;
	return y;
}


// EXPORTS //

module.exports = expm1;

},{"./polyval_q.js":108,"@stdlib/constants/float64/exponent-bias":65,"@stdlib/constants/float64/half-ln-two":66,"@stdlib/constants/float64/ninf":75,"@stdlib/constants/float64/pinf":77,"@stdlib/math/base/assert/is-nan":88,"@stdlib/number/float64/base/from-words":141,"@stdlib/number/float64/base/get-high-word":145,"@stdlib/number/float64/base/set-high-word":151}],108:[function(require,module,exports){
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
		return -0.03333333333333313;
	}
	return -0.03333333333333313 + (x * (0.0015873015872548146 + (x * (-0.0000793650757867488 + (x * (0.000004008217827329362 + (x * -2.0109921818362437e-7))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],109:[function(require,module,exports){
module.exports={"x":[-1,-1.354567283641821,-1.7091345672836418,-2.0637018509254625,-2.4182691345672835,-2.7728364182091045,-3.1274037018509251,-3.4819709854927461,-3.8365382691345671,-4.1911055527763885,-4.5456728364182091,-4.9002401200600296,-5.2548074037018502,-5.6093746873436716,-5.9639419709854922,-6.3185092546273136,-6.6730765382691342,-7.0276438219109547,-7.3822111055527762,-7.7367783891945967,-8.0913456728364181,-8.4459129564782387,-8.8004802401200592,-9.1550475237618798,-9.5096148074037004,-9.8641820910455227,-10.218749374687343,-10.573316658329164,-10.927883941970984,-11.282451225612805,-11.637018509254627,-11.991585792896448,-12.346153076538268,-12.700720360180089,-13.055287643821909,-13.409854927463732,-13.764422211105552,-14.118989494747373,-14.473556778389193,-14.828124062031014,-15.182691345672836,-15.537258629314657,-15.891825912956477,-16.246393196598298,-16.600960480240118,-16.955527763881939,-17.31009504752376,-17.66466233116558,-18.019229614807401,-18.373796898449225,-18.728364182091045,-19.082931465732866,-19.437498749374686,-19.792066033016507,-20.146633316658328,-20.501200600300148,-20.855767883941969,-21.210335167583789,-21.56490245122561,-21.919469734867434,-22.274037018509254,-22.628604302151075,-22.983171585792896,-23.337738869434716,-23.692306153076537,-24.046873436718357,-24.401440720360178,-24.756008004001998,-25.110575287643819,-25.465142571285639,-25.819709854927464,-26.174277138569284,-26.528844422211105,-26.883411705852925,-27.237978989494746,-27.592546273136566,-27.947113556778387,-28.301680840420207,-28.656248124062028,-29.010815407703848,-29.365382691345673,-29.719949974987493,-30.074517258629314,-30.429084542271134,-30.783651825912955,-31.138219109554775,-31.492786393196596,-31.847353676838416,-32.201920960480237,-32.556488244122058,-32.911055527763878,-33.265622811405699,-33.620190095047519,-33.97475737868934,-34.32932466233116,-34.683891945972981,-35.038459229614801,-35.393026513256629,-35.74759379689845,-36.10216108054027,-36.456728364182091,-36.811295647823911,-37.165862931465732,-37.520430215107552,-37.874997498749373,-38.229564782391193,-38.584132066033014,-38.938699349674835,-39.293266633316655,-39.647833916958476,-40.002401200600296,-40.356968484242117,-40.711535767883937,-41.066103051525758,-41.420670335167578,-41.775237618809399,-42.12980490245122,-42.48437218609304,-42.838939469734868,-43.193506753376688,-43.548074037018509,-43.902641320660329,-44.25720860430215,-44.611775887943971,-44.966343171585791,-45.320910455227612,-45.675477738869432,-46.030045022511253,-46.384612306153073,-46.739179589794894,-47.093746873436714,-47.448314157078535,-47.802881440720355,-48.157448724362176,-48.512016008003997,-48.866583291645817,-49.221150575287638,-49.575717858929458,-49.930285142571279,-50.284852426213106,-50.639419709854927,-50.993986993496748,-51.348554277138568,-51.703121560780389,-52.057688844422209,-52.41225612806403,-52.76682341170585,-53.121390695347671,-53.475957978989491,-53.830525262631312,-54.185092546273133,-54.539659829914953,-54.894227113556774,-55.248794397198594,-55.603361680840415,-55.957928964482235,-56.312496248124056,-56.667063531765876,-57.021630815407697,-57.376198099049518,-57.730765382691345,-58.085332666333166,-58.439899949974986,-58.794467233616807,-59.149034517258627,-59.503601800900448,-59.858169084542268,-60.212736368184089,-60.56730365182591,-60.92187093546773,-61.276438219109551,-61.631005502751371,-61.985572786393192,-62.340140070035012,-62.694707353676833,-63.049274637318653,-63.403841920960474,-63.758409204602295,-64.112976488244115,-64.467543771885943,-64.822111055527756,-65.176678339169584,-65.531245622811397,-65.885812906453225,-66.240380190095038,-66.594947473736866,-66.94951475737868,-67.304082041020507,-67.658649324662321,-68.013216608304148,-68.367783891945962,-68.722351175587789,-69.076918459229603,-69.43148574287143,-69.786053026513258,-70.140620310155072,-70.495187593796899,-70.849754877438713,-71.20432216108054,-71.558889444722354,-71.913456728364181,-72.268024012005995,-72.622591295647823,-72.977158579289636,-73.331725862931464,-73.686293146573277,-74.040860430215105,-74.395427713856918,-74.749994997498746,-75.104562281140559,-75.459129564782387,-75.8136968484242,-76.168264132066028,-76.522831415707842,-76.877398699349669,-77.231965982991497,-77.58653326663331,-77.941100550275138,-78.295667833916951,-78.650235117558779,-79.004802401200592,-79.35936968484242,-79.713936968484234,-80.068504252126061,-80.423071535767875,-80.777638819409702,-81.132206103051516,-81.486773386693343,-81.841340670335157,-82.195907953976985,-82.550475237618798,-82.905042521260626,-83.259609804902439,-83.614177088544267,-83.96874437218608,-84.323311655827908,-84.677878939469736,-85.032446223111549,-85.387013506753377,-85.74158079039519,-86.096148074037018,-86.450715357678831,-86.805282641320659,-87.159849924962472,-87.5144172086043,-87.868984492246113,-88.223551775887941,-88.578119059529755,-88.932686343171582,-89.287253626813396,-89.641820910455223,-89.996388194097037,-90.350955477738864,-90.705522761380678,-91.060090045022505,-91.414657328664319,-91.769224612306147,-92.123791895947974,-92.478359179589788,-92.832926463231615,-93.187493746873429,-93.542061030515256,-93.89662831415707,-94.251195597798898,-94.605762881440711,-94.960330165082539,-95.314897448724352,-95.66946473236618,-96.024032016007993,-96.378599299649821,-96.733166583291634,-97.087733866933462,-97.442301150575275,-97.796868434217103,-98.151435717858917,-98.506003001500744,-98.860570285142558,-99.215137568784385,-99.569704852426213,-99.924272136068026,-100.27883941970985,-100.63340670335167,-100.9879739869935,-101.34254127063531,-101.69710855427714,-102.05167583791895,-102.40624312156078,-102.76081040520259,-103.11537768884442,-103.46994497248623,-103.82451225612806,-104.17907953976987,-104.5336468234117,-104.88821410705351,-105.24278139069534,-105.59734867433716,-105.95191595797898,-106.3064832416208,-106.66105052526262,-107.01561780890445,-107.37018509254627,-107.72475237618809,-108.07931965982991,-108.43388694347173,-108.78845422711355,-109.14302151075537,-109.49758879439719,-109.85215607803902,-110.20672336168083,-110.56129064532266,-110.91585792896447,-111.2704252126063,-111.62499249624811,-111.97955977988994,-112.33412706353175,-112.68869434717358,-113.04326163081539,-113.39782891445722,-113.75239619809904,-114.10696348174086,-114.46153076538269,-114.8160980490245,-115.17066533266633,-115.52523261630814,-115.87979989994997,-116.23436718359179,-116.58893446723361,-116.94350175087543,-117.29806903451725,-117.65263631815907,-118.0072036018009,-118.36177088544271,-118.71633816908454,-119.07090545272635,-119.42547273636818,-119.78004002000999,-120.13460730365182,-120.48917458729363,-120.84374187093546,-121.19830915457727,-121.5528764382191,-121.90744372186091,-122.26201100550274,-122.61657828914457,-122.97114557278638,-123.32571285642821,-123.68028014007002,-124.03484742371185,-124.38941470735367,-124.74398199099549,-125.09854927463731,-125.45311655827913,-125.80768384192095,-126.16225112556278,-126.51681840920459,-126.87138569284642,-127.22595297648823,-127.58052026013006,-127.93508754377187,-128.2896548274137,-128.64422211105551,-128.99878939469733,-129.35335667833917,-129.70792396198098,-130.06249124562279,-130.41705852926464,-130.77162581290645,-131.12619309654826,-131.48076038019008,-131.83532766383192,-132.18989494747373,-132.54446223111555,-132.89902951475736,-133.2535967983992,-133.60816408204101,-133.96273136568283,-134.31729864932464,-134.67186593296648,-135.0264332166083,-135.38100050025011,-135.73556778389192,-136.09013506753377,-136.44470235117558,-136.79926963481739,-137.15383691845921,-137.50840420210105,-137.86297148574286,-138.21753876938467,-138.57210605302652,-138.92667333666833,-139.28124062031014,-139.63580790395196,-139.9903751875938,-140.34494247123561,-140.69950975487743,-141.05407703851924,-141.40864432216108,-141.76321160580289,-142.11777888944471,-142.47234617308652,-142.82691345672836,-143.18148074037018,-143.53604802401199,-143.8906153076538,-144.24518259129565,-144.59974987493746,-144.95431715857927,-145.30888444222111,-145.66345172586293,-146.01801900950474,-146.37258629314655,-146.7271535767884,-147.08172086043021,-147.43628814407202,-147.79085542771384,-148.14542271135568,-148.49998999499749,-148.85455727863931,-149.20912456228112,-149.56369184592296,-149.91825912956477,-150.27282641320659,-150.6273936968484,-150.98196098049024,-151.33652826413206,-151.69109554777387,-152.04566283141568,-152.40023011505752,-152.75479739869934,-153.10936468234115,-153.46393196598299,-153.81849924962481,-154.17306653326662,-154.52763381690843,-154.88220110055028,-155.23676838419209,-155.5913356678339,-155.94590295147572,-156.30047023511756,-156.65503751875937,-157.00960480240118,-157.364172086043,-157.71873936968484,-158.07330665332665,-158.42787393696847,-158.78244122061028,-159.13700850425212,-159.49157578789394,-159.84614307153575,-160.20071035517759,-160.5552776388194,-160.90984492246122,-161.26441220610303,-161.61897948974487,-161.97354677338669,-162.3281140570285,-162.68268134067031,-163.03724862431216,-163.39181590795397,-163.74638319159578,-164.1009504752376,-164.45551775887944,-164.81008504252125,-165.16465232616306,-165.51921960980488,-165.87378689344672,-166.22835417708853,-166.58292146073035,-166.93748874437216,-167.292056028014,-167.64662331165582,-168.00119059529763,-168.35575787893947,-168.71032516258128,-169.0648924462231,-169.41945972986491,-169.77402701350675,-170.12859429714857,-170.48316158079038,-170.83772886443219,-171.19229614807404,-171.54686343171585,-171.90143071535766,-172.25599799899948,-172.61056528264132,-172.96513256628313,-173.31969984992494,-173.67426713356676,-174.0288344172086,-174.38340170085041,-174.73796898449223,-175.09253626813407,-175.44710355177588,-175.8016708354177,-176.15623811905951,-176.51080540270135,-176.86537268634316,-177.21993996998498,-177.57450725362679,-177.92907453726863,-178.28364182091045,-178.63820910455226,-178.99277638819407,-179.34734367183592,-179.70191095547773,-180.05647823911954,-180.41104552276136,-180.7656128064032,-181.12018009004501,-181.47474737368682,-181.82931465732864,-182.18388194097048,-182.53844922461229,-182.89301650825411,-183.24758379189595,-183.60215107553776,-183.95671835917958,-184.31128564282139,-184.66585292646323,-185.02042021010504,-185.37498749374686,-185.72955477738867,-186.08412206103051,-186.43868934467233,-186.79325662831414,-187.14782391195595,-187.5023911955978,-187.85695847923961,-188.21152576288142,-188.56609304652324,-188.92066033016508,-189.27522761380689,-189.6297948974487,-189.98436218109052,-190.33892946473236,-190.69349674837417,-191.04806403201599,-191.40263131565783,-191.75719859929964,-192.11176588294146,-192.46633316658327,-192.82090045022511,-193.17546773386692,-193.53003501750874,-193.88460230115055,-194.23916958479239,-194.59373686843421,-194.94830415207602,-195.30287143571783,-195.65743871935967,-196.01200600300149,-196.3665732866433,-196.72114057028512,-197.07570785392696,-197.43027513756877,-197.78484242121058,-198.13940970485243,-198.49397698849424,-198.84854427213605,-199.20311155577787,-199.55767883941971,-199.91224612306152,-200.26681340670333,-200.62138069034515,-200.97594797398699,-201.3305152576288,-201.68508254127062,-202.03964982491243,-202.39421710855427,-202.74878439219609,-203.1033516758379,-203.45791895947971,-203.81248624312155,-204.16705352676337,-204.52162081040518,-204.876188094047,-205.23075537768884,-205.58532266133065,-205.93988994497246,-206.29445722861431,-206.64902451225612,-207.00359179589793,-207.35815907953975,-207.71272636318159,-208.0672936468234,-208.42186093046521,-208.77642821410703,-209.13099549774887,-209.48556278139068,-209.8401300650325,-210.19469734867431,-210.54926463231615,-210.90383191595797,-211.25839919959978,-211.61296648324159,-211.96753376688343,-212.32210105052525,-212.67666833416706,-213.0312356178089,-213.38580290145072,-213.74037018509253,-214.09493746873434,-214.44950475237619,-214.804072036018,-215.15863931965981,-215.51320660330163,-215.86777388694347,-216.22234117058528,-216.57690845422709,-216.93147573786891,-217.28604302151075,-217.64061030515256,-217.99517758879438,-218.34974487243619,-218.70431215607803,-219.05887943971985,-219.41344672336166,-219.76801400700347,-220.12258129064531,-220.47714857428713,-220.83171585792894,-221.18628314157078,-221.5408504252126,-221.89541770885441,-222.24998499249622,-222.60455227613807,-222.95911955977988,-223.31368684342169,-223.66825412706351,-224.02282141070535,-224.37738869434716,-224.73195597798897,-225.08652326163079,-225.44109054527263,-225.79565782891444,-226.15022511255626,-226.50479239619807,-226.85935967983991,-227.21392696348173,-227.56849424712354,-227.92306153076538,-228.27762881440719,-228.63219609804901,-228.98676338169082,-229.34133066533266,-229.69589794897448,-230.05046523261629,-230.4050325162581,-230.75959979989995,-231.11416708354176,-231.46873436718357,-231.82330165082539,-232.17786893446723,-232.53243621810904,-232.88700350175085,-233.24157078539267,-233.59613806903451,-233.95070535267632,-234.30527263631814,-234.65983991995995,-235.01440720360179,-235.36897448724361,-235.72354177088542,-236.07810905452726,-236.43267633816907,-236.78724362181089,-237.1418109054527,-237.49637818909454,-237.85094547273636,-238.20551275637817,-238.56008004001998,-238.91464732366182,-239.26921460730364,-239.62378189094545,-239.97834917458727,-240.33291645822911,-240.68748374187092,-241.04205102551273,-241.39661830915455,-241.75118559279639,-242.1057528764382,-242.46032016008002,-242.81488744372183,-243.16945472736367,-243.52402201100548,-243.8785892946473,-244.23315657828914,-244.58772386193095,-244.94229114557277,-245.29685842921458,-245.65142571285642,-246.00599299649824,-246.36056028014005,-246.71512756378186,-247.0696948474237,-247.42426213106552,-247.77882941470733,-248.13339669834915,-248.48796398199099,-248.8425312656328,-249.19709854927461,-249.55166583291643,-249.90623311655827,-250.26080040020008,-250.6153676838419,-250.96993496748374,-251.32450225112555,-251.67906953476736,-252.03363681840918,-252.38820410205102,-252.74277138569283,-253.09733866933465,-253.45190595297646,-253.8064732366183,-254.16104052026012,-254.51560780390193,-254.87017508754374,-255.22474237118558,-255.5793096548274,-255.93387693846921,-256.28844422211102,-256.64301150575284,-256.99757878939465,-257.35214607303652,-257.70671335667834,-258.06128064032015,-258.41584792396196,-258.77041520760378,-259.12498249124559,-259.4795497748874,-259.83411705852927,-260.18868434217109,-260.5432516258129,-260.89781890945471,-261.25238619309653,-261.60695347673834,-261.96152076038015,-262.31608804402197,-262.67065532766384,-263.02522261130565,-263.37978989494746,-263.73435717858928,-264.08892446223109,-264.4434917458729,-264.79805902951472,-265.15262631315653,-265.5071935967984,-265.86176088044022,-266.21632816408203,-266.57089544772384,-266.92546273136566,-267.28003001500747,-267.63459729864928,-267.98916458229115,-268.34373186593297,-268.69829914957478,-269.05286643321659,-269.40743371685841,-269.76200100050022,-270.11656828414203,-270.47113556778385,-270.82570285142572,-271.18027013506753,-271.53483741870934,-271.88940470235116,-272.24397198599297,-272.59853926963478,-272.9531065532766,-273.30767383691841,-273.66224112056028,-274.0168084042021,-274.37137568784391,-274.72594297148572,-275.08051025512754,-275.43507753876935,-275.78964482241116,-276.14421210605303,-276.49877938969485,-276.85334667333666,-277.20791395697847,-277.56248124062029,-277.9170485242621,-278.27161580790391,-278.62618309154573,-278.9807503751876,-279.33531765882941,-279.68988494247122,-280.04445222611304,-280.39901950975485,-280.75358679339666,-281.10815407703848,-281.46272136068035,-281.81728864432216,-282.17185592796397,-282.52642321160579,-282.8809904952476,-283.23555777888942,-283.59012506253123,-283.94469234617304,-284.29925962981491,-284.65382691345673,-285.00839419709854,-285.36296148074035,-285.71752876438217,-286.07209604802398,-286.42666333166579,-286.78123061530761,-287.13579789894948,-287.49036518259129,-287.8449324662331,-288.19949974987492,-288.55406703351673,-288.90863431715854,-289.26320160080036,-289.61776888444223,-289.97233616808404,-290.32690345172585,-290.68147073536767,-291.03603801900948,-291.3906053026513,-291.74517258629311,-292.09973986993492,-292.45430715357679,-292.80887443721861,-293.16344172086042,-293.51800900450223,-293.87257628814405,-294.22714357178586,-294.58171085542767,-294.93627813906949,-295.29084542271136,-295.64541270635317,-295.99997998999498,-296.3545472736368,-296.70911455727861,-297.06368184092042,-297.41824912456224,-297.77281640820411,-298.12738369184592,-298.48195097548773,-298.83651825912955,-299.19108554277136,-299.54565282641317,-299.90022011005499,-300.2547873936968,-300.60935467733867,-300.96392196098049,-301.3184892446223,-301.67305652826411,-302.02762381190593,-302.38219109554774,-302.73675837918955,-303.09132566283137,-303.44589294647324,-303.80046023011505,-304.15502751375686,-304.50959479739868,-304.86416208104049,-305.2187293646823,-305.57329664832412,-305.92786393196599,-306.2824312156078,-306.63699849924961,-306.99156578289143,-307.34613306653324,-307.70070035017505,-308.05526763381687,-308.40983491745868,-308.76440220110055,-309.11896948474237,-309.47353676838418,-309.82810405202599,-310.18267133566781,-310.53723861930962,-310.89180590295143,-311.2463731865933,-311.60094047023512,-311.95550775387693,-312.31007503751874,-312.66464232116056,-313.01920960480237,-313.37377688844418,-313.728344172086,-314.08291145572787,-314.43747873936968,-314.79204602301149,-315.14661330665331,-315.50118059029512,-315.85574787393693,-316.21031515757875,-316.56488244122056,-316.91944972486243,-317.27401700850425,-317.62858429214606,-317.98315157578787,-318.33771885942969,-318.6922861430715,-319.04685342671331,-319.40142071035518,-319.755987993997,-320.11055527763881,-320.46512256128062,-320.81968984492244,-321.17425712856425,-321.52882441220606,-321.88339169584788,-322.23795897948975,-322.59252626313156,-322.94709354677337,-323.30166083041519,-323.656228114057,-324.01079539769881,-324.36536268134063,-324.71992996498244,-325.07449724862431,-325.42906453226612,-325.78363181590794,-326.13819909954975,-326.49276638319157,-326.84733366683338,-327.20190095047519,-327.55646823411706,-327.91103551775888,-328.26560280140069,-328.6201700850425,-328.97473736868432,-329.32930465232613,-329.68387193596794,-330.03843921960976,-330.39300650325163,-330.74757378689344,-331.10214107053525,-331.45670835417707,-331.81127563781888,-332.16584292146069,-332.52041020510251,-332.87497748874432,-333.22954477238619,-333.584112056028,-333.93867933966982,-334.29324662331163,-334.64781390695344,-335.00238119059526,-335.35694847423707,-335.71151575787894,-336.06608304152076,-336.42065032516257,-336.77521760880438,-337.1297848924462,-337.48435217608801,-337.83891945972982,-338.19348674337164,-338.54805402701351,-338.90262131065532,-339.25718859429713,-339.61175587793895,-339.96632316158076,-340.32089044522257,-340.67545772886439,-341.0300250125062,-341.38459229614807,-341.73915957978988,-342.0937268634317,-342.44829414707351,-342.80286143071532,-343.15742871435714,-343.51199599799895,-343.86656328164082,-344.22113056528264,-344.57569784892445,-344.93026513256626,-345.28483241620808,-345.63939969984989,-345.9939669834917,-346.34853426713352,-346.70310155077539,-347.0576688344172,-347.41223611805901,-347.76680340170083,-348.12137068534264,-348.47593796898445,-348.83050525262627,-349.18507253626814,-349.53963981990995,-349.89420710355176,-350.24877438719358,-350.60334167083539,-350.9579089544772,-351.31247623811902,-351.66704352176083,-352.0216108054027,-352.37617808904452,-352.73074537268633,-353.08531265632814,-353.43987993996996,-353.79444722361177,-354.14901450725358,-354.5035817908954,-354.85814907453727,-355.21271635817908,-355.56728364182089,-355.92185092546271,-356.27641820910452,-356.63098549274633,-356.98555277638815,-357.34012006003002,-357.69468734367183,-358.04925462731364,-358.40382191095546,-358.75838919459727,-359.11295647823908,-359.4675237618809,-359.82209104552271,-360.17665832916458,-360.5312256128064,-360.88579289644821,-361.24036018009002,-361.59492746373184,-361.94949474737365,-362.30406203101546,-362.65862931465728,-363.01319659829915,-363.36776388194096,-363.72233116558277,-364.07689844922459,-364.4314657328664,-364.78603301650821,-365.14060030015003,-365.4951675837919,-365.84973486743371,-366.20430215107552,-366.55886943471734,-366.91343671835915,-367.26800400200096,-367.62257128564278,-367.97713856928459,-368.33170585292646,-368.68627313656827,-369.04084042021009,-369.3954077038519,-369.74997498749372,-370.10454227113553,-370.45910955477734,-370.81367683841916,-371.16824412206103,-371.52281140570284,-371.87737868934465,-372.23194597298647,-372.58651325662828,-372.94108054027009,-373.29564782391191,-373.65021510755378,-374.00478239119559,-374.3593496748374,-374.71391695847922,-375.06848424212103,-375.42305152576284,-375.77761880940466,-376.13218609304647,-376.48675337668834,-376.84132066033015,-377.19588794397197,-377.55045522761378,-377.90502251125559,-378.25958979489741,-378.61415707853922,-378.96872436218104,-379.32329164582291,-379.67785892946472,-380.03242621310653,-380.38699349674835,-380.74156078039016,-381.09612806403197,-381.45069534767379,-381.80526263131566,-382.15982991495747,-382.51439719859928,-382.8689644822411,-383.22353176588291,-383.57809904952472,-383.93266633316654,-384.28723361680835,-384.64180090045022,-384.99636818409203,-385.35093546773385,-385.70550275137566,-386.06007003501747,-386.41463731865929,-386.7692046023011,-387.12377188594297,-387.47833916958479,-387.8329064532266,-388.18747373686841,-388.54204102051023,-388.89660830415204,-389.25117558779385,-389.60574287143567,-389.96031015507754,-390.31487743871935,-390.66944472236116,-391.02401200600298,-391.37857928964479,-391.7331465732866,-392.08771385692842,-392.44228114057023,-392.7968484242121,-393.15141570785391,-393.50598299149573,-393.86055027513754,-394.21511755877935,-394.56968484242117,-394.92425212606298,-395.27881940970485,-395.63338669334667,-395.98795397698848,-396.34252126063029,-396.69708854427211,-397.05165582791392,-397.40622311155573,-397.76079039519755,-398.11535767883942,-398.46992496248123,-398.82449224612304,-399.17905952976486,-399.53362681340667,-399.88819409704848,-400.2427613806903,-400.59732866433211,-400.95189594797398,-401.30646323161579,-401.66103051525761,-402.01559779889942,-402.37016508254123,-402.72473236618305,-403.07929964982486,-403.43386693346673,-403.78843421710854,-404.14300150075036,-404.49756878439217,-404.85213606803399,-405.2067033516758,-405.56127063531761,-405.91583791895943,-406.2704052026013,-406.62497248624311,-406.97953976988492,-407.33410705352674,-407.68867433716855,-408.04324162081036,-408.39780890445218,-408.75237618809399,-409.10694347173586,-409.46151075537767,-409.81607803901949,-410.1706453226613,-410.52521260630311,-410.87977988994493,-411.23434717358674,-411.58891445722861,-411.94348174087042,-412.29804902451224,-412.65261630815405,-413.00718359179587,-413.36175087543768,-413.71631815907949,-414.07088544272131,-414.42545272636318,-414.78002001000499,-415.1345872936468,-415.48915457728862,-415.84372186093043,-416.19828914457224,-416.55285642821406,-416.90742371185587,-417.26199099549774,-417.61655827913955,-417.97112556278137,-418.32569284642318,-418.68026013006499,-419.03482741370681,-419.38939469734862,-419.74396198099049,-420.0985292646323,-420.45309654827412,-420.80766383191593,-421.16223111555774,-421.51679839919956,-421.87136568284137,-422.22593296648319,-422.58050025012506,-422.93506753376687,-423.28963481740868,-423.6442021010505,-423.99876938469231,-424.35333666833412,-424.70790395197594,-425.06247123561781,-425.41703851925962,-425.77160580290143,-426.12617308654325,-426.48074037018506,-426.83530765382687,-427.18987493746869,-427.5444422211105,-427.89900950475237,-428.25357678839418,-428.608144072036,-428.96271135567781,-429.31727863931962,-429.67184592296144,-430.02641320660325,-430.38098049024507,-430.73554777388694,-431.09011505752875,-431.44468234117056,-431.79924962481238,-432.15381690845419,-432.508384192096,-432.86295147573782,-433.21751875937969,-433.5720860430215,-433.92665332666331,-434.28122061030513,-434.63578789394694,-434.99035517758875,-435.34492246123057,-435.69948974487238,-436.05405702851425,-436.40862431215606,-436.76319159579788,-437.11775887943969,-437.4723261630815,-437.82689344672332,-438.18146073036513,-438.53602801400694,-438.89059529764882,-439.24516258129063,-439.59972986493244,-439.95429714857426,-440.30886443221607,-440.66343171585788,-441.0179989994997,-441.37256628314157,-441.72713356678338,-442.08170085042519,-442.43626813406701,-442.79083541770882,-443.14540270135063,-443.49996998499245,-443.85453726863426,-444.20910455227613,-444.56367183591794,-444.91823911955976,-445.27280640320157,-445.62737368684338,-445.9819409704852,-446.33650825412701,-446.69107553776882,-447.04564282141069,-447.40021010505251,-447.75477738869432,-448.10934467233614,-448.46391195597795,-448.81847923961976,-449.17304652326158,-449.52761380690345,-449.88218109054526,-450.23674837418707,-450.59131565782889,-450.9458829414707,-451.30045022511251,-451.65501750875433,-452.00958479239614,-452.36415207603801,-452.71871935967982,-453.07328664332164,-453.42785392696345,-453.78242121060526,-454.13698849424708,-454.49155577788889,-454.84612306153076,-455.20069034517257,-455.55525762881439,-455.9098249124562,-456.26439219609802,-456.61895947973983,-456.97352676338164,-457.32809404702346,-457.68266133066533,-458.03722861430714,-458.39179589794895,-458.74636318159077,-459.10093046523258,-459.45549774887439,-459.81006503251621,-460.16463231615802,-460.51919959979989,-460.8737668834417,-461.22833416708352,-461.58290145072533,-461.93746873436714,-462.29203601800896,-462.64660330165077,-463.00117058529264,-463.35573786893445,-463.71030515257627,-464.06487243621808,-464.41943971985989,-464.77400700350171,-465.12857428714352,-465.48314157078534,-465.83770885442721,-466.19227613806902,-466.54684342171083,-466.90141070535265,-467.25597798899446,-467.61054527263627,-467.96511255627809,-468.3196798399199,-468.67424712356177,-469.02881440720358,-469.3833816908454,-469.73794897448721,-470.09251625812902,-470.44708354177084,-470.80165082541265,-471.15621810905452,-471.51078539269633,-471.86535267633815,-472.21991995997996,-472.57448724362177,-472.92905452726359,-473.2836218109054,-473.63818909454722,-473.99275637818909,-474.3473236618309,-474.70189094547271,-475.05645822911453,-475.41102551275634,-475.76559279639815,-476.12016008003997,-476.47472736368178,-476.82929464732365,-477.18386193096546,-477.53842921460728,-477.89299649824909,-478.2475637818909,-478.60213106553272,-478.95669834917453,-479.3112656328164,-479.66583291645821,-480.02040020010003,-480.37496748374184,-480.72953476738365,-481.08410205102547,-481.43866933466728,-481.79323661830909,-482.14780390195097,-482.50237118559278,-482.85693846923459,-483.21150575287641,-483.56607303651822,-483.92064032016003,-484.27520760380185,-484.62977488744366,-484.98434217108553,-485.33890945472734,-485.69347673836916,-486.04804402201097,-486.40261130565278,-486.7571785892946,-487.11174587293641,-487.46631315657828,-487.82088044022009,-488.17544772386191,-488.53001500750372,-488.88458229114553,-489.23914957478735,-489.59371685842916,-489.94828414207097,-490.30285142571284,-490.65741870935466,-491.01198599299647,-491.36655327663829,-491.7211205602801,-492.07568784392191,-492.43025512756373,-492.7848224112056,-493.13938969484741,-493.49395697848922,-493.84852426213104,-494.20309154577285,-494.55765882941466,-494.91222611305648,-495.26679339669829,-495.62136068034016,-495.97592796398197,-496.33049524762379,-496.6850625312656,-497.03962981490741,-497.39419709854923,-497.74876438219104,-498.10333166583285,-498.45789894947472,-498.81246623311654,-499.16703351675835,-499.52160080040017,-499.87616808404198,-500.23073536768379,-500.58530265132561,-500.93986993496748,-501.29443721860929,-501.6490045022511,-502.00357178589292,-502.35813906953473,-502.71270635317654,-503.06727363681836,-503.42184092046017,-503.77640820410204,-504.13097548774385,-504.48554277138567,-504.84011005502748,-505.19467733866929,-505.54924462231111,-505.90381190595292,-506.25837918959473,-506.6129464732366,-506.96751375687842,-507.32208104052023,-507.67664832416204,-508.03121560780386,-508.38578289144567,-508.74035017508749,-509.09491745872936,-509.44948474237117,-509.80405202601298,-510.1586193096548,-510.51318659329661,-510.86775387693842,-511.22232116058024,-511.57688844422205,-511.93145572786392,-512.28602301150568,-512.6405902951476,-512.9951575787893,-513.34972486243123,-513.70429214607304,-514.05885942971486,-514.41342671335667,-514.76799399699848,-515.1225612806403,-515.47712856428211,-515.83169584792392,-516.18626313156574,-516.54083041520755,-516.89539769884937,-517.24996498249118,-517.60453226613299,-517.95909954977481,-518.31366683341662,-518.66823411705855,-519.02280140070036,-519.37736868434217,-519.73193596798399,-520.0865032516258,-520.44107053526761,-520.79563781890943,-521.15020510255124,-521.50477238619305,-521.85933966983487,-522.21390695347668,-522.56847423711849,-522.92304152076031,-523.27760880440212,-523.63217608804393,-523.98674337168586,-524.34131065532767,-524.69587793896949,-525.0504452226113,-525.40501250625312,-525.75957978989493,-526.11414707353674,-526.46871435717856,-526.82328164082037,-527.17784892446218,-527.532416208104,-527.88698349174581,-528.24155077538762,-528.59611805902944,-528.95068534267125,-529.30525262631306,-529.65981990995499,-530.0143871935968,-530.36895447723862,-530.72352176088043,-531.07808904452224,-531.43265632816406,-531.78722361180587,-532.14179089544768,-532.4963581790895,-532.85092546273131,-533.20549274637312,-533.56006003001494,-533.91462731365675,-534.26919459729856,-534.62376188094038,-534.97832916458231,-535.33289644822412,-535.68746373186593,-536.04203101550775,-536.39659829914956,-536.75116558279137,-537.10573286643319,-537.460300150075,-537.81486743371681,-538.16943471735863,-538.52400200100044,-538.87856928464225,-539.23313656828407,-539.58770385192588,-539.94227113556769,-540.29683841920962,-540.65140570285143,-541.00597298649325,-541.36054027013506,-541.71510755377687,-542.06967483741869,-542.4242421210605,-542.77880940470232,-543.13337668834413,-543.48794397198594,-543.84251125562776,-544.19707853926957,-544.55164582291138,-544.9062131065532,-545.26078039019501,-545.61534767383682,-545.96991495747875,-546.32448224112056,-546.67904952476238,-547.03361680840419,-547.388184092046,-547.74275137568782,-548.09731865932963,-548.45188594297144,-548.80645322661326,-549.16102051025507,-549.51558779389688,-549.8701550775387,-550.22472236118051,-550.57928964482232,-550.93385692846414,-551.28842421210607,-551.64299149574788,-551.99755877938969,-552.35212606303151,-552.70669334667332,-553.06126063031513,-553.41582791395695,-553.77039519759876,-554.12496248124057,-554.47952976488239,-554.8340970485242,-555.18866433216601,-555.54323161580783,-555.89779889944964,-556.25236618309145,-556.60693346673338,-556.96150075037519,-557.31606803401701,-557.67063531765882,-558.02520260130063,-558.37976988494245,-558.73433716858426,-559.08890445222607,-559.44347173586789,-559.7980390195097,-560.15260630315152,-560.50717358679333,-560.86174087043514,-561.21630815407696,-561.57087543771877,-561.9254427213607,-562.28001000500251,-562.63457728864432,-562.98914457228614,-563.34371185592795,-563.69827913956976,-564.05284642321158,-564.40741370685339,-564.7619809904952,-565.11654827413702,-565.47111555777883,-565.82568284142064,-566.18025012506246,-566.53481740870427,-566.88938469234608,-567.2439519759879,-567.59851925962982,-567.95308654327164,-568.30765382691345,-568.66222111055527,-569.01678839419708,-569.37135567783889,-569.72592296148071,-570.08049024512252,-570.43505752876433,-570.78962481240615,-571.14419209604796,-571.49875937968977,-571.85332666333159,-572.2078939469734,-572.56246123061521,-572.91702851425714,-573.27159579789895,-573.62616308154077,-573.98073036518258,-574.33529764882439,-574.68986493246621,-575.04443221610802,-575.39899949974983,-575.75356678339165,-576.10813406703346,-576.46270135067527,-576.81726863431709,-577.1718359179589,-577.52640320160071,-577.88097048524253,-578.23553776888446,-578.59010505252627,-578.94467233616808,-579.2992396198099,-579.65380690345171,-580.00837418709352,-580.36294147073534,-580.71750875437715,-581.07207603801896,-581.42664332166078,-581.78121060530259,-582.1357778889444,-582.49034517258622,-582.84491245622803,-583.19947973986984,-583.55404702351177,-583.90861430715358,-584.2631815907954,-584.61774887443721,-584.97231615807902,-585.32688344172084,-585.68145072536265,-586.03601800900447,-586.39058529264628,-586.74515257628809,-587.09971985992991,-587.45428714357172,-587.80885442721353,-588.16342171085535,-588.51798899449716,-588.87255627813897,-589.2271235617809,-589.58169084542271,-589.93625812906453,-590.29082541270634,-590.64539269634815,-590.99995997998997,-591.35452726363178,-591.70909454727359,-592.06366183091541,-592.41822911455722,-592.77279639819903,-593.12736368184085,-593.48193096548266,-593.83649824912447,-594.19106553276629,-594.54563281640822,-594.90020010005003,-595.25476738369184,-595.60933466733366,-595.96390195097547,-596.31846923461728,-596.6730365182591,-597.02760380190091,-597.38217108554272,-597.73673836918454,-598.09130565282635,-598.44587293646816,-598.80044022010998,-599.15500750375179,-599.5095747873936,-599.86414207103553,-600.21870935467734,-600.57327663831916,-600.92784392196097,-601.28241120560278,-601.6369784892446,-601.99154577288641,-602.34611305652822,-602.70068034017004,-603.05524762381185,-603.40981490745367,-603.76438219109548,-604.11894947473729,-604.47351675837911,-604.82808404202092,-605.18265132566273,-605.53721860930466,-605.89178589294647,-606.24635317658829,-606.6009204602301,-606.95548774387191,-607.31005502751373,-607.66462231115554,-608.01918959479735,-608.37375687843917,-608.72832416208098,-609.08289144572279,-609.43745872936461,-609.79202601300642,-610.14659329664823,-610.50116058029005,-610.85572786393197,-611.21029514757379,-611.5648624312156,-611.91942971485742,-612.27399699849923,-612.62856428214104,-612.98313156578286,-613.33769884942467,-613.69226613306648,-614.0468334167083,-614.40140070035011,-614.75596798399192,-615.11053526763374,-615.46510255127555,-615.81966983491736,-616.17423711855929,-616.5288044022011,-616.88337168584292,-617.23793896948473,-617.59250625312654,-617.94707353676836,-618.30164082041017,-618.65620810405198,-619.0107753876938,-619.36534267133561,-619.71990995497742,-620.07447723861924,-620.42904452226105,-620.78361180590286,-621.13817908954468,-621.49274637318661,-621.84731365682842,-622.20188094047023,-622.55644822411205,-622.91101550775386,-623.26558279139567,-623.62015007503749,-623.9747173586793,-624.32928464232111,-624.68385192596293,-625.03841920960474,-625.39298649324655,-625.74755377688837,-626.10212106053018,-626.45668834417199,-626.81125562781381,-627.16582291145573,-627.52039019509755,-627.87495747873936,-628.22952476238117,-628.58409204602299,-628.9386593296648,-629.29322661330662,-629.64779389694843,-630.00236118059024,-630.35692846423206,-630.71149574787387,-631.06606303151568,-631.4206303151575,-631.77519759879931,-632.12976488244112,-632.48433216608305,-632.83889944972486,-633.19346673336668,-633.54803401700849,-633.9026013006503,-634.25716858429212,-634.61173586793393,-634.96630315157574,-635.32087043521756,-635.67543771885937,-636.03000500250118,-636.384572286143,-636.73913956978481,-637.09370685342662,-637.44827413706844,-637.80284142071037,-638.15740870435218,-638.51197598799399,-638.86654327163581,-639.22111055527762,-639.57567783891943,-639.93024512256125,-640.28481240620306,-640.63937968984487,-640.99394697348669,-641.3485142571285,-641.70308154077031,-642.05764882441213,-642.41221610805394,-642.76678339169575,-643.12135067533757,-643.47591795897949,-643.83048524262131,-644.18505252626312,-644.53961980990493,-644.89418709354675,-645.24875437718856,-645.60332166083037,-645.95788894447219,-646.312456228114,-646.66702351175581,-647.02159079539763,-647.37615807903944,-647.73072536268126,-648.08529264632307,-648.43985992996488,-648.79442721360681,-649.14899449724862,-649.50356178089044,-649.85812906453225,-650.21269634817406,-650.56726363181588,-650.92183091545769,-651.2763981990995,-651.63096548274132,-651.98553276638313,-652.34010005002494,-652.69466733366676,-653.04923461730857,-653.40380190095038,-653.7583691845922,-654.11293646823412,-654.46750375187594,-654.82207103551775,-655.17663831915957,-655.53120560280138,-655.88577288644319,-656.24034017008501,-656.59490745372682,-656.94947473736863,-657.30404202101045,-657.65860930465226,-658.01317658829407,-658.36774387193589,-658.7223111555777,-659.07687843921951,-659.43144572286144,-659.78601300650325,-660.14058029014507,-660.49514757378688,-660.84971485742869,-661.20428214107051,-661.55884942471232,-661.91341670835413,-662.26798399199595,-662.62255127563776,-662.97711855927957,-663.33168584292139,-663.6862531265632,-664.04082041020501,-664.39538769384683,-664.74995497748864,-665.10452226113057,-665.45908954477238,-665.8136568284142,-666.16822411205601,-666.52279139569782,-666.87735867933964,-667.23192596298145,-667.58649324662326,-667.94106053026508,-668.29562781390689,-668.6501950975487,-669.00476238119052,-669.35932966483233,-669.71389694847414,-670.06846423211596,-670.42303151575788,-670.7775987993997,-671.13216608304151,-671.48673336668332,-671.84130065032514,-672.19586793396695,-672.55043521760877,-672.90500250125058,-673.25956978489239,-673.61413706853421,-673.96870435217602,-674.32327163581783,-674.67783891945965,-675.03240620310146,-675.38697348674327,-675.7415407703852,-676.09610805402701,-676.45067533766883,-676.80524262131064,-677.15980990495245,-677.51437718859427,-677.86894447223608,-678.22351175587789,-678.57807903951971,-678.93264632316152,-679.28721360680333,-679.64178089044515,-679.99634817408696,-680.35091545772877,-680.70548274137059,-681.0600500250124,-681.41461730865433,-681.76918459229614,-682.12375187593796,-682.47831915957977,-682.83288644322158,-683.1874537268634,-683.54202101050521,-683.89658829414702,-684.25115557778884,-684.60572286143065,-684.96029014507246,-685.31485742871428,-685.66942471235609,-686.0239919959979,-686.37855927963972,-686.73312656328164,-687.08769384692346,-687.44226113056527,-687.79682841420708,-688.1513956978489,-688.50596298149071,-688.86053026513252,-689.21509754877434,-689.56966483241615,-689.92423211605796,-690.27879939969978,-690.63336668334159,-690.98793396698341,-691.34250125062522,-691.69706853426703,-692.05163581790896,-692.40620310155077,-692.76077038519259,-693.1153376688344,-693.46990495247621,-693.82447223611803,-694.17903951975984,-694.53360680340165,-694.88817408704347,-695.24274137068528,-695.59730865432709,-695.95187593796891,-696.30644322161072,-696.66101050525253,-697.01557778889435,-697.37014507253627,-697.72471235617809,-698.0792796398199,-698.43384692346172,-698.78841420710353,-699.14298149074534,-699.49754877438716,-699.85211605802897,-700.20668334167078,-700.5612506253126,-700.91581790895441,-701.27038519259622,-701.62495247623804,-701.97951975987985,-702.33408704352166,-702.68865432716348,-703.0432216108054,-703.39778889444722,-703.75235617808903,-704.10692346173084,-704.46149074537266,-704.81605802901447,-705.17062531265628,-705.5251925962981,-705.87975987993991,-706.23432716358172,-706.58889444722354,-706.94346173086535,-707.29802901450716,-707.65259629814898,-708.00716358179079,-708.36173086543272,-708.71629814907453,-709.07086543271635,-709.42543271635816,-709.77999999999997],"expected":[-0.63212055882855767,-0.74194106338136312,-0.81897761245726486,-0.87301697348269391,-0.91092433790992722,-0.93751547908095056,-0.95616855083788088,-0.96925325012669294,-0.97843186465783738,-0.98487045089140635,-0.98938697051933489,-0.99255520478839065,-0.99477764799920931,-0.99633664061334648,-0.99743023794762387,-0.99819737123529539,-0.99873549752968915,-0.99911298070421939,-0.99937777643811665,-0.9995635245334521,-0.99969382253490768,-0.99978522357540089,-0.99984933929559561,-0.99989431499339831,-0.99992586440728159,-0.99994799559289971,-0.99996352010878065,-0.99997441019833544,-0.99998204934479407,-0.99998740802970854,-0.99999116702348734,-0.99999380387085846,-0.99999565355842579,-0.99999695107155984,-0.99999786124707435,-0.99999849971418919,-0.99999894758413321,-0.99999926175456122,-0.99999948213786483,-0.99999963673166536,-0.99999974517564827,-0.99999982124659903,-0.99999987460861517,-0.99999991204083782,-0.99999993829867806,-0.99999995671794684,-0.99999996963863869,-0.99999997870220592,-0.99999998506008902,-0.99999998951999725,-0.99999999264852002,-0.99999999484310642,-0.99999999638255821,-0.99999999746244805,-0.99999999821996588,-0.99999999875134715,-0.99999999912409887,-0.9999999993855756,-0.99999999956899543,-0.99999999969766029,-0.99999999978791565,-0.99999999985122767,-0.9999999998956397,-0.99999999992679367,-0.99999999994864741,-0.99999999996397737,-0.99999999997473099,-0.99999999998227429,-0.99999999998756584,-0.99999999999127775,-0.99999999999388156,-0.99999999999570799,-0.9999999999969893,-0.99999999999788802,-0.99999999999851852,-0.99999999999896072,-0.99999999999927103,-0.99999999999948863,-0.99999999999964129,-0.99999999999974842,-0.99999999999982347,-0.99999999999987621,-0.99999999999991318,-0.99999999999993905,-0.99999999999995726,-0.99999999999997002,-0.99999999999997902,-0.99999999999998523,-0.99999999999998967,-0.99999999999999278,-0.99999999999999489,-0.99999999999999645,-0.99999999999999745,-0.99999999999999822,-0.99999999999999878,-0.99999999999999911,-0.99999999999999944,-0.99999999999999956,-0.99999999999999967,-0.99999999999999978,-0.99999999999999989,-0.99999999999999989,-0.99999999999999989,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]}

},{}],110:[function(require,module,exports){
module.exports={"x":[1,1.354567283641821,1.7091345672836418,2.0637018509254625,2.4182691345672835,2.7728364182091045,3.1274037018509251,3.4819709854927461,3.8365382691345671,4.1911055527763885,4.5456728364182091,4.9002401200600296,5.2548074037018502,5.6093746873436716,5.9639419709854922,6.3185092546273136,6.6730765382691342,7.0276438219109547,7.3822111055527762,7.7367783891945967,8.0913456728364181,8.4459129564782387,8.8004802401200592,9.1550475237618798,9.5096148074037004,9.8641820910455227,10.218749374687343,10.573316658329164,10.927883941970984,11.282451225612805,11.637018509254627,11.991585792896448,12.346153076538268,12.700720360180089,13.055287643821909,13.409854927463732,13.764422211105552,14.118989494747373,14.473556778389193,14.828124062031014,15.182691345672836,15.537258629314657,15.891825912956477,16.246393196598298,16.600960480240118,16.955527763881939,17.31009504752376,17.66466233116558,18.019229614807401,18.373796898449225,18.728364182091045,19.082931465732866,19.437498749374686,19.792066033016507,20.146633316658328,20.501200600300148,20.855767883941969,21.210335167583789,21.56490245122561,21.919469734867434,22.274037018509254,22.628604302151075,22.983171585792896,23.337738869434716,23.692306153076537,24.046873436718357,24.401440720360178,24.756008004001998,25.110575287643819,25.465142571285639,25.819709854927464,26.174277138569284,26.528844422211105,26.883411705852925,27.237978989494746,27.592546273136566,27.947113556778387,28.301680840420207,28.656248124062028,29.010815407703848,29.365382691345673,29.719949974987493,30.074517258629314,30.429084542271134,30.783651825912955,31.138219109554775,31.492786393196596,31.847353676838416,32.201920960480237,32.556488244122058,32.911055527763878,33.265622811405699,33.620190095047519,33.97475737868934,34.32932466233116,34.683891945972981,35.038459229614801,35.393026513256629,35.74759379689845,36.10216108054027,36.456728364182091,36.811295647823911,37.165862931465732,37.520430215107552,37.874997498749373,38.229564782391193,38.584132066033014,38.938699349674835,39.293266633316655,39.647833916958476,40.002401200600296,40.356968484242117,40.711535767883937,41.066103051525758,41.420670335167578,41.775237618809399,42.12980490245122,42.48437218609304,42.838939469734868,43.193506753376688,43.548074037018509,43.902641320660329,44.25720860430215,44.611775887943971,44.966343171585791,45.320910455227612,45.675477738869432,46.030045022511253,46.384612306153073,46.739179589794894,47.093746873436714,47.448314157078535,47.802881440720355,48.157448724362176,48.512016008003997,48.866583291645817,49.221150575287638,49.575717858929458,49.930285142571279,50.284852426213106,50.639419709854927,50.993986993496748,51.348554277138568,51.703121560780389,52.057688844422209,52.41225612806403,52.76682341170585,53.121390695347671,53.475957978989491,53.830525262631312,54.185092546273133,54.539659829914953,54.894227113556774,55.248794397198594,55.603361680840415,55.957928964482235,56.312496248124056,56.667063531765876,57.021630815407697,57.376198099049518,57.730765382691345,58.085332666333166,58.439899949974986,58.794467233616807,59.149034517258627,59.503601800900448,59.858169084542268,60.212736368184089,60.56730365182591,60.92187093546773,61.276438219109551,61.631005502751371,61.985572786393192,62.340140070035012,62.694707353676833,63.049274637318653,63.403841920960474,63.758409204602295,64.112976488244115,64.467543771885943,64.822111055527756,65.176678339169584,65.531245622811397,65.885812906453225,66.240380190095038,66.594947473736866,66.94951475737868,67.304082041020507,67.658649324662321,68.013216608304148,68.367783891945962,68.722351175587789,69.076918459229603,69.43148574287143,69.786053026513258,70.140620310155072,70.495187593796899,70.849754877438713,71.20432216108054,71.558889444722354,71.913456728364181,72.268024012005995,72.622591295647823,72.977158579289636,73.331725862931464,73.686293146573277,74.040860430215105,74.395427713856918,74.749994997498746,75.104562281140559,75.459129564782387,75.8136968484242,76.168264132066028,76.522831415707842,76.877398699349669,77.231965982991497,77.58653326663331,77.941100550275138,78.295667833916951,78.650235117558779,79.004802401200592,79.35936968484242,79.713936968484234,80.068504252126061,80.423071535767875,80.777638819409702,81.132206103051516,81.486773386693343,81.841340670335157,82.195907953976985,82.550475237618798,82.905042521260626,83.259609804902439,83.614177088544267,83.96874437218608,84.323311655827908,84.677878939469736,85.032446223111549,85.387013506753377,85.74158079039519,86.096148074037018,86.450715357678831,86.805282641320659,87.159849924962472,87.5144172086043,87.868984492246113,88.223551775887941,88.578119059529755,88.932686343171582,89.287253626813396,89.641820910455223,89.996388194097037,90.350955477738864,90.705522761380678,91.060090045022505,91.414657328664319,91.769224612306147,92.123791895947974,92.478359179589788,92.832926463231615,93.187493746873429,93.542061030515256,93.89662831415707,94.251195597798898,94.605762881440711,94.960330165082539,95.314897448724352,95.66946473236618,96.024032016007993,96.378599299649821,96.733166583291634,97.087733866933462,97.442301150575275,97.796868434217103,98.151435717858917,98.506003001500744,98.860570285142558,99.215137568784385,99.569704852426213,99.924272136068026,100.27883941970985,100.63340670335167,100.9879739869935,101.34254127063531,101.69710855427714,102.05167583791895,102.40624312156078,102.76081040520259,103.11537768884442,103.46994497248623,103.82451225612806,104.17907953976987,104.5336468234117,104.88821410705351,105.24278139069534,105.59734867433716,105.95191595797898,106.3064832416208,106.66105052526262,107.01561780890445,107.37018509254627,107.72475237618809,108.07931965982991,108.43388694347173,108.78845422711355,109.14302151075537,109.49758879439719,109.85215607803902,110.20672336168083,110.56129064532266,110.91585792896447,111.2704252126063,111.62499249624811,111.97955977988994,112.33412706353175,112.68869434717358,113.04326163081539,113.39782891445722,113.75239619809904,114.10696348174086,114.46153076538269,114.8160980490245,115.17066533266633,115.52523261630814,115.87979989994997,116.23436718359179,116.58893446723361,116.94350175087543,117.29806903451725,117.65263631815907,118.0072036018009,118.36177088544271,118.71633816908454,119.07090545272635,119.42547273636818,119.78004002000999,120.13460730365182,120.48917458729363,120.84374187093546,121.19830915457727,121.5528764382191,121.90744372186091,122.26201100550274,122.61657828914457,122.97114557278638,123.32571285642821,123.68028014007002,124.03484742371185,124.38941470735367,124.74398199099549,125.09854927463731,125.45311655827913,125.80768384192095,126.16225112556278,126.51681840920459,126.87138569284642,127.22595297648823,127.58052026013006,127.93508754377187,128.2896548274137,128.64422211105551,128.99878939469733,129.35335667833917,129.70792396198098,130.06249124562279,130.41705852926464,130.77162581290645,131.12619309654826,131.48076038019008,131.83532766383192,132.18989494747373,132.54446223111555,132.89902951475736,133.2535967983992,133.60816408204101,133.96273136568283,134.31729864932464,134.67186593296648,135.0264332166083,135.38100050025011,135.73556778389192,136.09013506753377,136.44470235117558,136.79926963481739,137.15383691845921,137.50840420210105,137.86297148574286,138.21753876938467,138.57210605302652,138.92667333666833,139.28124062031014,139.63580790395196,139.9903751875938,140.34494247123561,140.69950975487743,141.05407703851924,141.40864432216108,141.76321160580289,142.11777888944471,142.47234617308652,142.82691345672836,143.18148074037018,143.53604802401199,143.8906153076538,144.24518259129565,144.59974987493746,144.95431715857927,145.30888444222111,145.66345172586293,146.01801900950474,146.37258629314655,146.7271535767884,147.08172086043021,147.43628814407202,147.79085542771384,148.14542271135568,148.49998999499749,148.85455727863931,149.20912456228112,149.56369184592296,149.91825912956477,150.27282641320659,150.6273936968484,150.98196098049024,151.33652826413206,151.69109554777387,152.04566283141568,152.40023011505752,152.75479739869934,153.10936468234115,153.46393196598299,153.81849924962481,154.17306653326662,154.52763381690843,154.88220110055028,155.23676838419209,155.5913356678339,155.94590295147572,156.30047023511756,156.65503751875937,157.00960480240118,157.364172086043,157.71873936968484,158.07330665332665,158.42787393696847,158.78244122061028,159.13700850425212,159.49157578789394,159.84614307153575,160.20071035517759,160.5552776388194,160.90984492246122,161.26441220610303,161.61897948974487,161.97354677338669,162.3281140570285,162.68268134067031,163.03724862431216,163.39181590795397,163.74638319159578,164.1009504752376,164.45551775887944,164.81008504252125,165.16465232616306,165.51921960980488,165.87378689344672,166.22835417708853,166.58292146073035,166.93748874437216,167.292056028014,167.64662331165582,168.00119059529763,168.35575787893947,168.71032516258128,169.0648924462231,169.41945972986491,169.77402701350675,170.12859429714857,170.48316158079038,170.83772886443219,171.19229614807404,171.54686343171585,171.90143071535766,172.25599799899948,172.61056528264132,172.96513256628313,173.31969984992494,173.67426713356676,174.0288344172086,174.38340170085041,174.73796898449223,175.09253626813407,175.44710355177588,175.8016708354177,176.15623811905951,176.51080540270135,176.86537268634316,177.21993996998498,177.57450725362679,177.92907453726863,178.28364182091045,178.63820910455226,178.99277638819407,179.34734367183592,179.70191095547773,180.05647823911954,180.41104552276136,180.7656128064032,181.12018009004501,181.47474737368682,181.82931465732864,182.18388194097048,182.53844922461229,182.89301650825411,183.24758379189595,183.60215107553776,183.95671835917958,184.31128564282139,184.66585292646323,185.02042021010504,185.37498749374686,185.72955477738867,186.08412206103051,186.43868934467233,186.79325662831414,187.14782391195595,187.5023911955978,187.85695847923961,188.21152576288142,188.56609304652324,188.92066033016508,189.27522761380689,189.6297948974487,189.98436218109052,190.33892946473236,190.69349674837417,191.04806403201599,191.40263131565783,191.75719859929964,192.11176588294146,192.46633316658327,192.82090045022511,193.17546773386692,193.53003501750874,193.88460230115055,194.23916958479239,194.59373686843421,194.94830415207602,195.30287143571783,195.65743871935967,196.01200600300149,196.3665732866433,196.72114057028512,197.07570785392696,197.43027513756877,197.78484242121058,198.13940970485243,198.49397698849424,198.84854427213605,199.20311155577787,199.55767883941971,199.91224612306152,200.26681340670333,200.62138069034515,200.97594797398699,201.3305152576288,201.68508254127062,202.03964982491243,202.39421710855427,202.74878439219609,203.1033516758379,203.45791895947971,203.81248624312155,204.16705352676337,204.52162081040518,204.876188094047,205.23075537768884,205.58532266133065,205.93988994497246,206.29445722861431,206.64902451225612,207.00359179589793,207.35815907953975,207.71272636318159,208.0672936468234,208.42186093046521,208.77642821410703,209.13099549774887,209.48556278139068,209.8401300650325,210.19469734867431,210.54926463231615,210.90383191595797,211.25839919959978,211.61296648324159,211.96753376688343,212.32210105052525,212.67666833416706,213.0312356178089,213.38580290145072,213.74037018509253,214.09493746873434,214.44950475237619,214.804072036018,215.15863931965981,215.51320660330163,215.86777388694347,216.22234117058528,216.57690845422709,216.93147573786891,217.28604302151075,217.64061030515256,217.99517758879438,218.34974487243619,218.70431215607803,219.05887943971985,219.41344672336166,219.76801400700347,220.12258129064531,220.47714857428713,220.83171585792894,221.18628314157078,221.5408504252126,221.89541770885441,222.24998499249622,222.60455227613807,222.95911955977988,223.31368684342169,223.66825412706351,224.02282141070535,224.37738869434716,224.73195597798897,225.08652326163079,225.44109054527263,225.79565782891444,226.15022511255626,226.50479239619807,226.85935967983991,227.21392696348173,227.56849424712354,227.92306153076538,228.27762881440719,228.63219609804901,228.98676338169082,229.34133066533266,229.69589794897448,230.05046523261629,230.4050325162581,230.75959979989995,231.11416708354176,231.46873436718357,231.82330165082539,232.17786893446723,232.53243621810904,232.88700350175085,233.24157078539267,233.59613806903451,233.95070535267632,234.30527263631814,234.65983991995995,235.01440720360179,235.36897448724361,235.72354177088542,236.07810905452726,236.43267633816907,236.78724362181089,237.1418109054527,237.49637818909454,237.85094547273636,238.20551275637817,238.56008004001998,238.91464732366182,239.26921460730364,239.62378189094545,239.97834917458727,240.33291645822911,240.68748374187092,241.04205102551273,241.39661830915455,241.75118559279639,242.1057528764382,242.46032016008002,242.81488744372183,243.16945472736367,243.52402201100548,243.8785892946473,244.23315657828914,244.58772386193095,244.94229114557277,245.29685842921458,245.65142571285642,246.00599299649824,246.36056028014005,246.71512756378186,247.0696948474237,247.42426213106552,247.77882941470733,248.13339669834915,248.48796398199099,248.8425312656328,249.19709854927461,249.55166583291643,249.90623311655827,250.26080040020008,250.6153676838419,250.96993496748374,251.32450225112555,251.67906953476736,252.03363681840918,252.38820410205102,252.74277138569283,253.09733866933465,253.45190595297646,253.8064732366183,254.16104052026012,254.51560780390193,254.87017508754374,255.22474237118558,255.5793096548274,255.93387693846921,256.28844422211102,256.64301150575284,256.99757878939465,257.35214607303652,257.70671335667834,258.06128064032015,258.41584792396196,258.77041520760378,259.12498249124559,259.4795497748874,259.83411705852927,260.18868434217109,260.5432516258129,260.89781890945471,261.25238619309653,261.60695347673834,261.96152076038015,262.31608804402197,262.67065532766384,263.02522261130565,263.37978989494746,263.73435717858928,264.08892446223109,264.4434917458729,264.79805902951472,265.15262631315653,265.5071935967984,265.86176088044022,266.21632816408203,266.57089544772384,266.92546273136566,267.28003001500747,267.63459729864928,267.98916458229115,268.34373186593297,268.69829914957478,269.05286643321659,269.40743371685841,269.76200100050022,270.11656828414203,270.47113556778385,270.82570285142572,271.18027013506753,271.53483741870934,271.88940470235116,272.24397198599297,272.59853926963478,272.9531065532766,273.30767383691841,273.66224112056028,274.0168084042021,274.37137568784391,274.72594297148572,275.08051025512754,275.43507753876935,275.78964482241116,276.14421210605303,276.49877938969485,276.85334667333666,277.20791395697847,277.56248124062029,277.9170485242621,278.27161580790391,278.62618309154573,278.9807503751876,279.33531765882941,279.68988494247122,280.04445222611304,280.39901950975485,280.75358679339666,281.10815407703848,281.46272136068035,281.81728864432216,282.17185592796397,282.52642321160579,282.8809904952476,283.23555777888942,283.59012506253123,283.94469234617304,284.29925962981491,284.65382691345673,285.00839419709854,285.36296148074035,285.71752876438217,286.07209604802398,286.42666333166579,286.78123061530761,287.13579789894948,287.49036518259129,287.8449324662331,288.19949974987492,288.55406703351673,288.90863431715854,289.26320160080036,289.61776888444223,289.97233616808404,290.32690345172585,290.68147073536767,291.03603801900948,291.3906053026513,291.74517258629311,292.09973986993492,292.45430715357679,292.80887443721861,293.16344172086042,293.51800900450223,293.87257628814405,294.22714357178586,294.58171085542767,294.93627813906949,295.29084542271136,295.64541270635317,295.99997998999498,296.3545472736368,296.70911455727861,297.06368184092042,297.41824912456224,297.77281640820411,298.12738369184592,298.48195097548773,298.83651825912955,299.19108554277136,299.54565282641317,299.90022011005499,300.2547873936968,300.60935467733867,300.96392196098049,301.3184892446223,301.67305652826411,302.02762381190593,302.38219109554774,302.73675837918955,303.09132566283137,303.44589294647324,303.80046023011505,304.15502751375686,304.50959479739868,304.86416208104049,305.2187293646823,305.57329664832412,305.92786393196599,306.2824312156078,306.63699849924961,306.99156578289143,307.34613306653324,307.70070035017505,308.05526763381687,308.40983491745868,308.76440220110055,309.11896948474237,309.47353676838418,309.82810405202599,310.18267133566781,310.53723861930962,310.89180590295143,311.2463731865933,311.60094047023512,311.95550775387693,312.31007503751874,312.66464232116056,313.01920960480237,313.37377688844418,313.728344172086,314.08291145572787,314.43747873936968,314.79204602301149,315.14661330665331,315.50118059029512,315.85574787393693,316.21031515757875,316.56488244122056,316.91944972486243,317.27401700850425,317.62858429214606,317.98315157578787,318.33771885942969,318.6922861430715,319.04685342671331,319.40142071035518,319.755987993997,320.11055527763881,320.46512256128062,320.81968984492244,321.17425712856425,321.52882441220606,321.88339169584788,322.23795897948975,322.59252626313156,322.94709354677337,323.30166083041519,323.656228114057,324.01079539769881,324.36536268134063,324.71992996498244,325.07449724862431,325.42906453226612,325.78363181590794,326.13819909954975,326.49276638319157,326.84733366683338,327.20190095047519,327.55646823411706,327.91103551775888,328.26560280140069,328.6201700850425,328.97473736868432,329.32930465232613,329.68387193596794,330.03843921960976,330.39300650325163,330.74757378689344,331.10214107053525,331.45670835417707,331.81127563781888,332.16584292146069,332.52041020510251,332.87497748874432,333.22954477238619,333.584112056028,333.93867933966982,334.29324662331163,334.64781390695344,335.00238119059526,335.35694847423707,335.71151575787894,336.06608304152076,336.42065032516257,336.77521760880438,337.1297848924462,337.48435217608801,337.83891945972982,338.19348674337164,338.54805402701351,338.90262131065532,339.25718859429713,339.61175587793895,339.96632316158076,340.32089044522257,340.67545772886439,341.0300250125062,341.38459229614807,341.73915957978988,342.0937268634317,342.44829414707351,342.80286143071532,343.15742871435714,343.51199599799895,343.86656328164082,344.22113056528264,344.57569784892445,344.93026513256626,345.28483241620808,345.63939969984989,345.9939669834917,346.34853426713352,346.70310155077539,347.0576688344172,347.41223611805901,347.76680340170083,348.12137068534264,348.47593796898445,348.83050525262627,349.18507253626814,349.53963981990995,349.89420710355176,350.24877438719358,350.60334167083539,350.9579089544772,351.31247623811902,351.66704352176083,352.0216108054027,352.37617808904452,352.73074537268633,353.08531265632814,353.43987993996996,353.79444722361177,354.14901450725358,354.5035817908954,354.85814907453727,355.21271635817908,355.56728364182089,355.92185092546271,356.27641820910452,356.63098549274633,356.98555277638815,357.34012006003002,357.69468734367183,358.04925462731364,358.40382191095546,358.75838919459727,359.11295647823908,359.4675237618809,359.82209104552271,360.17665832916458,360.5312256128064,360.88579289644821,361.24036018009002,361.59492746373184,361.94949474737365,362.30406203101546,362.65862931465728,363.01319659829915,363.36776388194096,363.72233116558277,364.07689844922459,364.4314657328664,364.78603301650821,365.14060030015003,365.4951675837919,365.84973486743371,366.20430215107552,366.55886943471734,366.91343671835915,367.26800400200096,367.62257128564278,367.97713856928459,368.33170585292646,368.68627313656827,369.04084042021009,369.3954077038519,369.74997498749372,370.10454227113553,370.45910955477734,370.81367683841916,371.16824412206103,371.52281140570284,371.87737868934465,372.23194597298647,372.58651325662828,372.94108054027009,373.29564782391191,373.65021510755378,374.00478239119559,374.3593496748374,374.71391695847922,375.06848424212103,375.42305152576284,375.77761880940466,376.13218609304647,376.48675337668834,376.84132066033015,377.19588794397197,377.55045522761378,377.90502251125559,378.25958979489741,378.61415707853922,378.96872436218104,379.32329164582291,379.67785892946472,380.03242621310653,380.38699349674835,380.74156078039016,381.09612806403197,381.45069534767379,381.80526263131566,382.15982991495747,382.51439719859928,382.8689644822411,383.22353176588291,383.57809904952472,383.93266633316654,384.28723361680835,384.64180090045022,384.99636818409203,385.35093546773385,385.70550275137566,386.06007003501747,386.41463731865929,386.7692046023011,387.12377188594297,387.47833916958479,387.8329064532266,388.18747373686841,388.54204102051023,388.89660830415204,389.25117558779385,389.60574287143567,389.96031015507754,390.31487743871935,390.66944472236116,391.02401200600298,391.37857928964479,391.7331465732866,392.08771385692842,392.44228114057023,392.7968484242121,393.15141570785391,393.50598299149573,393.86055027513754,394.21511755877935,394.56968484242117,394.92425212606298,395.27881940970485,395.63338669334667,395.98795397698848,396.34252126063029,396.69708854427211,397.05165582791392,397.40622311155573,397.76079039519755,398.11535767883942,398.46992496248123,398.82449224612304,399.17905952976486,399.53362681340667,399.88819409704848,400.2427613806903,400.59732866433211,400.95189594797398,401.30646323161579,401.66103051525761,402.01559779889942,402.37016508254123,402.72473236618305,403.07929964982486,403.43386693346673,403.78843421710854,404.14300150075036,404.49756878439217,404.85213606803399,405.2067033516758,405.56127063531761,405.91583791895943,406.2704052026013,406.62497248624311,406.97953976988492,407.33410705352674,407.68867433716855,408.04324162081036,408.39780890445218,408.75237618809399,409.10694347173586,409.46151075537767,409.81607803901949,410.1706453226613,410.52521260630311,410.87977988994493,411.23434717358674,411.58891445722861,411.94348174087042,412.29804902451224,412.65261630815405,413.00718359179587,413.36175087543768,413.71631815907949,414.07088544272131,414.42545272636318,414.78002001000499,415.1345872936468,415.48915457728862,415.84372186093043,416.19828914457224,416.55285642821406,416.90742371185587,417.26199099549774,417.61655827913955,417.97112556278137,418.32569284642318,418.68026013006499,419.03482741370681,419.38939469734862,419.74396198099049,420.0985292646323,420.45309654827412,420.80766383191593,421.16223111555774,421.51679839919956,421.87136568284137,422.22593296648319,422.58050025012506,422.93506753376687,423.28963481740868,423.6442021010505,423.99876938469231,424.35333666833412,424.70790395197594,425.06247123561781,425.41703851925962,425.77160580290143,426.12617308654325,426.48074037018506,426.83530765382687,427.18987493746869,427.5444422211105,427.89900950475237,428.25357678839418,428.608144072036,428.96271135567781,429.31727863931962,429.67184592296144,430.02641320660325,430.38098049024507,430.73554777388694,431.09011505752875,431.44468234117056,431.79924962481238,432.15381690845419,432.508384192096,432.86295147573782,433.21751875937969,433.5720860430215,433.92665332666331,434.28122061030513,434.63578789394694,434.99035517758875,435.34492246123057,435.69948974487238,436.05405702851425,436.40862431215606,436.76319159579788,437.11775887943969,437.4723261630815,437.82689344672332,438.18146073036513,438.53602801400694,438.89059529764882,439.24516258129063,439.59972986493244,439.95429714857426,440.30886443221607,440.66343171585788,441.0179989994997,441.37256628314157,441.72713356678338,442.08170085042519,442.43626813406701,442.79083541770882,443.14540270135063,443.49996998499245,443.85453726863426,444.20910455227613,444.56367183591794,444.91823911955976,445.27280640320157,445.62737368684338,445.9819409704852,446.33650825412701,446.69107553776882,447.04564282141069,447.40021010505251,447.75477738869432,448.10934467233614,448.46391195597795,448.81847923961976,449.17304652326158,449.52761380690345,449.88218109054526,450.23674837418707,450.59131565782889,450.9458829414707,451.30045022511251,451.65501750875433,452.00958479239614,452.36415207603801,452.71871935967982,453.07328664332164,453.42785392696345,453.78242121060526,454.13698849424708,454.49155577788889,454.84612306153076,455.20069034517257,455.55525762881439,455.9098249124562,456.26439219609802,456.61895947973983,456.97352676338164,457.32809404702346,457.68266133066533,458.03722861430714,458.39179589794895,458.74636318159077,459.10093046523258,459.45549774887439,459.81006503251621,460.16463231615802,460.51919959979989,460.8737668834417,461.22833416708352,461.58290145072533,461.93746873436714,462.29203601800896,462.64660330165077,463.00117058529264,463.35573786893445,463.71030515257627,464.06487243621808,464.41943971985989,464.77400700350171,465.12857428714352,465.48314157078534,465.83770885442721,466.19227613806902,466.54684342171083,466.90141070535265,467.25597798899446,467.61054527263627,467.96511255627809,468.3196798399199,468.67424712356177,469.02881440720358,469.3833816908454,469.73794897448721,470.09251625812902,470.44708354177084,470.80165082541265,471.15621810905452,471.51078539269633,471.86535267633815,472.21991995997996,472.57448724362177,472.92905452726359,473.2836218109054,473.63818909454722,473.99275637818909,474.3473236618309,474.70189094547271,475.05645822911453,475.41102551275634,475.76559279639815,476.12016008003997,476.47472736368178,476.82929464732365,477.18386193096546,477.53842921460728,477.89299649824909,478.2475637818909,478.60213106553272,478.95669834917453,479.3112656328164,479.66583291645821,480.02040020010003,480.37496748374184,480.72953476738365,481.08410205102547,481.43866933466728,481.79323661830909,482.14780390195097,482.50237118559278,482.85693846923459,483.21150575287641,483.56607303651822,483.92064032016003,484.27520760380185,484.62977488744366,484.98434217108553,485.33890945472734,485.69347673836916,486.04804402201097,486.40261130565278,486.7571785892946,487.11174587293641,487.46631315657828,487.82088044022009,488.17544772386191,488.53001500750372,488.88458229114553,489.23914957478735,489.59371685842916,489.94828414207097,490.30285142571284,490.65741870935466,491.01198599299647,491.36655327663829,491.7211205602801,492.07568784392191,492.43025512756373,492.7848224112056,493.13938969484741,493.49395697848922,493.84852426213104,494.20309154577285,494.55765882941466,494.91222611305648,495.26679339669829,495.62136068034016,495.97592796398197,496.33049524762379,496.6850625312656,497.03962981490741,497.39419709854923,497.74876438219104,498.10333166583285,498.45789894947472,498.81246623311654,499.16703351675835,499.52160080040017,499.87616808404198,500.23073536768379,500.58530265132561,500.93986993496748,501.29443721860929,501.6490045022511,502.00357178589292,502.35813906953473,502.71270635317654,503.06727363681836,503.42184092046017,503.77640820410204,504.13097548774385,504.48554277138567,504.84011005502748,505.19467733866929,505.54924462231111,505.90381190595292,506.25837918959473,506.6129464732366,506.96751375687842,507.32208104052023,507.67664832416204,508.03121560780386,508.38578289144567,508.74035017508749,509.09491745872936,509.44948474237117,509.80405202601298,510.1586193096548,510.51318659329661,510.86775387693842,511.22232116058024,511.57688844422205,511.93145572786392,512.28602301150568,512.6405902951476,512.9951575787893,513.34972486243123,513.70429214607304,514.05885942971486,514.41342671335667,514.76799399699848,515.1225612806403,515.47712856428211,515.83169584792392,516.18626313156574,516.54083041520755,516.89539769884937,517.24996498249118,517.60453226613299,517.95909954977481,518.31366683341662,518.66823411705855,519.02280140070036,519.37736868434217,519.73193596798399,520.0865032516258,520.44107053526761,520.79563781890943,521.15020510255124,521.50477238619305,521.85933966983487,522.21390695347668,522.56847423711849,522.92304152076031,523.27760880440212,523.63217608804393,523.98674337168586,524.34131065532767,524.69587793896949,525.0504452226113,525.40501250625312,525.75957978989493,526.11414707353674,526.46871435717856,526.82328164082037,527.17784892446218,527.532416208104,527.88698349174581,528.24155077538762,528.59611805902944,528.95068534267125,529.30525262631306,529.65981990995499,530.0143871935968,530.36895447723862,530.72352176088043,531.07808904452224,531.43265632816406,531.78722361180587,532.14179089544768,532.4963581790895,532.85092546273131,533.20549274637312,533.56006003001494,533.91462731365675,534.26919459729856,534.62376188094038,534.97832916458231,535.33289644822412,535.68746373186593,536.04203101550775,536.39659829914956,536.75116558279137,537.10573286643319,537.460300150075,537.81486743371681,538.16943471735863,538.52400200100044,538.87856928464225,539.23313656828407,539.58770385192588,539.94227113556769,540.29683841920962,540.65140570285143,541.00597298649325,541.36054027013506,541.71510755377687,542.06967483741869,542.4242421210605,542.77880940470232,543.13337668834413,543.48794397198594,543.84251125562776,544.19707853926957,544.55164582291138,544.9062131065532,545.26078039019501,545.61534767383682,545.96991495747875,546.32448224112056,546.67904952476238,547.03361680840419,547.388184092046,547.74275137568782,548.09731865932963,548.45188594297144,548.80645322661326,549.16102051025507,549.51558779389688,549.8701550775387,550.22472236118051,550.57928964482232,550.93385692846414,551.28842421210607,551.64299149574788,551.99755877938969,552.35212606303151,552.70669334667332,553.06126063031513,553.41582791395695,553.77039519759876,554.12496248124057,554.47952976488239,554.8340970485242,555.18866433216601,555.54323161580783,555.89779889944964,556.25236618309145,556.60693346673338,556.96150075037519,557.31606803401701,557.67063531765882,558.02520260130063,558.37976988494245,558.73433716858426,559.08890445222607,559.44347173586789,559.7980390195097,560.15260630315152,560.50717358679333,560.86174087043514,561.21630815407696,561.57087543771877,561.9254427213607,562.28001000500251,562.63457728864432,562.98914457228614,563.34371185592795,563.69827913956976,564.05284642321158,564.40741370685339,564.7619809904952,565.11654827413702,565.47111555777883,565.82568284142064,566.18025012506246,566.53481740870427,566.88938469234608,567.2439519759879,567.59851925962982,567.95308654327164,568.30765382691345,568.66222111055527,569.01678839419708,569.37135567783889,569.72592296148071,570.08049024512252,570.43505752876433,570.78962481240615,571.14419209604796,571.49875937968977,571.85332666333159,572.2078939469734,572.56246123061521,572.91702851425714,573.27159579789895,573.62616308154077,573.98073036518258,574.33529764882439,574.68986493246621,575.04443221610802,575.39899949974983,575.75356678339165,576.10813406703346,576.46270135067527,576.81726863431709,577.1718359179589,577.52640320160071,577.88097048524253,578.23553776888446,578.59010505252627,578.94467233616808,579.2992396198099,579.65380690345171,580.00837418709352,580.36294147073534,580.71750875437715,581.07207603801896,581.42664332166078,581.78121060530259,582.1357778889444,582.49034517258622,582.84491245622803,583.19947973986984,583.55404702351177,583.90861430715358,584.2631815907954,584.61774887443721,584.97231615807902,585.32688344172084,585.68145072536265,586.03601800900447,586.39058529264628,586.74515257628809,587.09971985992991,587.45428714357172,587.80885442721353,588.16342171085535,588.51798899449716,588.87255627813897,589.2271235617809,589.58169084542271,589.93625812906453,590.29082541270634,590.64539269634815,590.99995997998997,591.35452726363178,591.70909454727359,592.06366183091541,592.41822911455722,592.77279639819903,593.12736368184085,593.48193096548266,593.83649824912447,594.19106553276629,594.54563281640822,594.90020010005003,595.25476738369184,595.60933466733366,595.96390195097547,596.31846923461728,596.6730365182591,597.02760380190091,597.38217108554272,597.73673836918454,598.09130565282635,598.44587293646816,598.80044022010998,599.15500750375179,599.5095747873936,599.86414207103553,600.21870935467734,600.57327663831916,600.92784392196097,601.28241120560278,601.6369784892446,601.99154577288641,602.34611305652822,602.70068034017004,603.05524762381185,603.40981490745367,603.76438219109548,604.11894947473729,604.47351675837911,604.82808404202092,605.18265132566273,605.53721860930466,605.89178589294647,606.24635317658829,606.6009204602301,606.95548774387191,607.31005502751373,607.66462231115554,608.01918959479735,608.37375687843917,608.72832416208098,609.08289144572279,609.43745872936461,609.79202601300642,610.14659329664823,610.50116058029005,610.85572786393197,611.21029514757379,611.5648624312156,611.91942971485742,612.27399699849923,612.62856428214104,612.98313156578286,613.33769884942467,613.69226613306648,614.0468334167083,614.40140070035011,614.75596798399192,615.11053526763374,615.46510255127555,615.81966983491736,616.17423711855929,616.5288044022011,616.88337168584292,617.23793896948473,617.59250625312654,617.94707353676836,618.30164082041017,618.65620810405198,619.0107753876938,619.36534267133561,619.71990995497742,620.07447723861924,620.42904452226105,620.78361180590286,621.13817908954468,621.49274637318661,621.84731365682842,622.20188094047023,622.55644822411205,622.91101550775386,623.26558279139567,623.62015007503749,623.9747173586793,624.32928464232111,624.68385192596293,625.03841920960474,625.39298649324655,625.74755377688837,626.10212106053018,626.45668834417199,626.81125562781381,627.16582291145573,627.52039019509755,627.87495747873936,628.22952476238117,628.58409204602299,628.9386593296648,629.29322661330662,629.64779389694843,630.00236118059024,630.35692846423206,630.71149574787387,631.06606303151568,631.4206303151575,631.77519759879931,632.12976488244112,632.48433216608305,632.83889944972486,633.19346673336668,633.54803401700849,633.9026013006503,634.25716858429212,634.61173586793393,634.96630315157574,635.32087043521756,635.67543771885937,636.03000500250118,636.384572286143,636.73913956978481,637.09370685342662,637.44827413706844,637.80284142071037,638.15740870435218,638.51197598799399,638.86654327163581,639.22111055527762,639.57567783891943,639.93024512256125,640.28481240620306,640.63937968984487,640.99394697348669,641.3485142571285,641.70308154077031,642.05764882441213,642.41221610805394,642.76678339169575,643.12135067533757,643.47591795897949,643.83048524262131,644.18505252626312,644.53961980990493,644.89418709354675,645.24875437718856,645.60332166083037,645.95788894447219,646.312456228114,646.66702351175581,647.02159079539763,647.37615807903944,647.73072536268126,648.08529264632307,648.43985992996488,648.79442721360681,649.14899449724862,649.50356178089044,649.85812906453225,650.21269634817406,650.56726363181588,650.92183091545769,651.2763981990995,651.63096548274132,651.98553276638313,652.34010005002494,652.69466733366676,653.04923461730857,653.40380190095038,653.7583691845922,654.11293646823412,654.46750375187594,654.82207103551775,655.17663831915957,655.53120560280138,655.88577288644319,656.24034017008501,656.59490745372682,656.94947473736863,657.30404202101045,657.65860930465226,658.01317658829407,658.36774387193589,658.7223111555777,659.07687843921951,659.43144572286144,659.78601300650325,660.14058029014507,660.49514757378688,660.84971485742869,661.20428214107051,661.55884942471232,661.91341670835413,662.26798399199595,662.62255127563776,662.97711855927957,663.33168584292139,663.6862531265632,664.04082041020501,664.39538769384683,664.74995497748864,665.10452226113057,665.45908954477238,665.8136568284142,666.16822411205601,666.52279139569782,666.87735867933964,667.23192596298145,667.58649324662326,667.94106053026508,668.29562781390689,668.6501950975487,669.00476238119052,669.35932966483233,669.71389694847414,670.06846423211596,670.42303151575788,670.7775987993997,671.13216608304151,671.48673336668332,671.84130065032514,672.19586793396695,672.55043521760877,672.90500250125058,673.25956978489239,673.61413706853421,673.96870435217602,674.32327163581783,674.67783891945965,675.03240620310146,675.38697348674327,675.7415407703852,676.09610805402701,676.45067533766883,676.80524262131064,677.15980990495245,677.51437718859427,677.86894447223608,678.22351175587789,678.57807903951971,678.93264632316152,679.28721360680333,679.64178089044515,679.99634817408696,680.35091545772877,680.70548274137059,681.0600500250124,681.41461730865433,681.76918459229614,682.12375187593796,682.47831915957977,682.83288644322158,683.1874537268634,683.54202101050521,683.89658829414702,684.25115557778884,684.60572286143065,684.96029014507246,685.31485742871428,685.66942471235609,686.0239919959979,686.37855927963972,686.73312656328164,687.08769384692346,687.44226113056527,687.79682841420708,688.1513956978489,688.50596298149071,688.86053026513252,689.21509754877434,689.56966483241615,689.92423211605796,690.27879939969978,690.63336668334159,690.98793396698341,691.34250125062522,691.69706853426703,692.05163581790896,692.40620310155077,692.76077038519259,693.1153376688344,693.46990495247621,693.82447223611803,694.17903951975984,694.53360680340165,694.88817408704347,695.24274137068528,695.59730865432709,695.95187593796891,696.30644322161072,696.66101050525253,697.01557778889435,697.37014507253627,697.72471235617809,698.0792796398199,698.43384692346172,698.78841420710353,699.14298149074534,699.49754877438716,699.85211605802897,700.20668334167078,700.5612506253126,700.91581790895441,701.27038519259622,701.62495247623804,701.97951975987985,702.33408704352166,702.68865432716348,703.0432216108054,703.39778889444722,703.75235617808903,704.10692346173084,704.46149074537266,704.81605802901447,705.17062531265628,705.5251925962981,705.87975987993991,706.23432716358172,706.58889444722354,706.94346173086535,707.29802901450716,707.65259629814898,708.00716358179079,708.36173086543272,708.71629814907453,709.07086543271635,709.42543271635816,709.77999999999997],"expected":[1.7182818284590451,2.8750837816471901,4.5241786034002205,6.8750682467291258,10.226411081725178,15.003963626376047,21.814668899066184,31.523762808118974,45.364694218379782,65.095823003211365,93.223803092397588,133.3220292266208,190.48460307704261,271.97349084647249,388.14108762535182,553.74539160804648,789.82486865700923,1126.3711910855368,1606.139396928673,2290.0795145236998,3265.0796891055966,4655.0045026659664,6636.4308015681909,9461.0801204939926,13487.797530739546,19228.139524109902,27411.362443356516,39077.067626675365,55707.272958615802,79414.689273059194,113211.12035060383,161390.08420012903,230072.26405183983,327983.08346912439,467561.18916789576,666538.66383724031,950193.72010540799,1354562.0591860213,1931014.8670507539,2752785.0393908015,3924270.7307333937,5594298.1559348647,7975028.5579671031,11368911.294040626,16207107.175600976,23104263.385372993,32936598.608364169,46953218.356703684,66934802.051098198,95419821.556845754,136027030.10710821,193915190.79142186,276438448.78058141,394080606.15164411,561786990.12324989,800863116.00658822,1141681352.1034508,1627539442.814096,2320161078.9459867,3307537310.8336725,4715104981.8947897,6721682297.2395658,9582185991.1194611,13660016095.211212,19473222487.293262,27760318245.165787,39574100772.084099,56415399783.349533,80423743575.067871,114649165927.33276,163439684146.8775,232993673682.20746,332147313299.48236,473497138306.40808,675000311630.24011,962255912106.46887,1371757056152.2212,1955527004229.0278,2787728225721.8848,3974084041631.5513,5665309775977.3242,8076259717096.1133,11513222329795.059,16412831317781.23,23397535820081.172,33354676707052.449,47549214874035.539,67784432599796.422,96631023562605.828,137753675241133.67,196376632915881.12,279947390789203.72,399082825924882.38,568917972406164.25,811028784755733,1156173159586466,1648198436447298.5,2349611789015222.5,3349521172328694,4774955648558630,6807003232002425,9703816414395020,13833408005681506,19720403692693276,28112690787625736,40076430261591672,57131502446545632,81444593505320256,1.1610445248579181e+17,1.6551428777337942e+17,2.3595115321250493e+17,3.3636338863106387e+17,4.7950742207000115e+17,6.8356835372594995e+17,9.7447020152149274e+17,1.3891693032267558e+18,1.9803492708288292e+18,2.823113946847786e+18,4.0245286396125942e+18,5.7372217615044669e+18,8.1787748301000847e+18,1.1659364149092528e+19,1.6621165784005405e+19,2.3694529863439774e+19,3.3778060621337743e+19,4.8152775594811187e+19,6.8644846827574166e+19,9.7857598814903697e+19,1.3950223634226224e+20,1.9886931807209338e+20,2.8350087215396173e+20,4.0414853981105586e+20,5.7613947001441734e+20,8.2132348928856202e+20,1.170848916218599e+21,1.6691196617276137e+21,2.379436327415587e+21,3.3920379503317609e+21,4.8355660220536319e+21,6.8934071776386786e+21,9.8269907390363976e+21,1.4009000846253055e+22,1.9970722464480784e+22,2.8469536131121811e+22,4.0585136014122801e+22,5.7856694878995321e+22,8.2478401480688346e+22,1.1757821156284725e+23,1.6761522515145487e+23,2.3894617318239954e+23,3.4063298024939407e+23,4.8559399670741742e+23,6.9224515331909852e+23,9.8683953167261744e+23,1.4068025707403145e+24,2.0054866161341807e+24,2.8589488327255508e+24,4.0756135505398567e+24,5.8100465538967062e+24,8.2825912073963882e+24,1.180736100347262e+25,1.6832144720824547e+25,2.3995293767968575e+25,3.420681871269619e+25,4.8763997547104111e+25,6.9516182628564203e+25,9.9099743465040706e+25,1.4127299261109783e+26,2.0139364385272987e+26,2.8709945924295526e+26,4.0927855477838133e+26,5.8345263290700805e+26,8.3174886851926797e+26,1.1857109579507957e+27,1.6903064482762502e+27,2.4096394403085515e+27,3.4350944103725999e+27,4.8969457466475232e+27,6.9809078822401805e+27,9.9517285633981896e+27,1.4186822555202221e+28,2.0224218630021765e+28,2.8830911051673708e+28,4.1100298967082446e+28,5.8591092461695548e+28,8.3525331983702964e+28,1.1907067763839072e+29,1.6974283054669047e+29,2.4197921010833582e+29,3.4495676745857474e+29,4.9175783060946655e+29,7.010320909120088e+29,9.9936587055334908e+29,1.4246596641924986e+30,2.03094303956294e+30,2.8952385847794782e+30,4.1273469021562961e+30,5.8837957397685207e+30,8.3877253664411551e+30,1.1957236439619719e+31,1.7045801695535845e+31,2.4299875385985874e+31,3.464101919765343e+31,4.9382977977913236e+31,7.039857863455396e+31,1.0035765514145345e+32,1.4306622577955767e+32,2.0395001188457071e+32,2.9074372460072687e+32,4.1447368702554677e+32,5.9085862462712593e+32,8.4230658115272764e+32,1.2007616493724526e+33,1.7117621669659008e+33,2.4402259330877159e+33,3.4786974028457041e+33,4.9591045880136882e+33,7.0695192673961811e+33,1.0078049733591782e+34,1.4366901424424524e+34,2.0480932521213653e+34,2.9196873044969411e+34,4.1622001084232585e+34,5.9334812039208169e+34,8.458555158372256e+34,1.2058208816764922e+35,1.7189744246662301e+35,2.4505074655436235e+35,3.4933543818436536e+35,4.9799990445812355e+35,7.0993056452924203e+35,1.0120512111367213e+36,1.4427434246931924e+36,2.0567225912980729e+36,2.9319889768032432e+36,4.1797369253722482e+36,5.9584810528067101e+36,8.4941940343516007e+36,1.210901430310479e+37,1.7262170701518134e+37,2.4608323177217789e+37,3.5080731158632806e+37,5.0009815368631954e+37,7.1292175237036648e+37,1.0163153398115513e+38,1.4488222115568994e+38,2.0653882889240601e+38,2.9443424803934713e+38,4.1973476311157914e+38,5.9835862348726258e+38,8.5299830694842852e+38,1.2160033850876119e+39,1.7334902314571073e+39,2.4712006721434135e+39,3.5228538651002199e+39,5.0220524357850097e+39,7.1592554314077427e+39,1.020597434764328e+40,1.4549266104934821e+40,2.0740904981902958e+40,2.9567480336510621e+40,4.2150325369734386e+40,6.0087971939245695e+40,8.5659228964437812e+40,1.2211268361995556e+41,1.740794037156022e+41,2.481612712098892e+41,3.5376968908464541e+41,5.0432121138351729e+41,7.189419899410512e+41,1.0248975716933018e+42,1.4610567294156364e+42,2.0828293729331676e+42,2.9692058558796205e+42,4.2327919555763779e+42,6.0341143756382042e+42,8.6020141505691116e+42,1.2262718742179326e+43,1.7481286163641954e+43,2.4920686216507396e+43,3.5526024554948787e+43,5.0644609450713906e+43,7.2197114609551467e+43,1.0292158266157108e+44,1.4672126766907323e+44,2.0916050676373188e+44,2.9817161673067552e+44,4.250626200873205e+44,6.059538227567063e+44,8.6382574698765771e+44,1.2314385900959928e+45,1.7554940987412497e+45,2.5025685856370377e+45,3.5675708225438948e+45,5.0857993051274791e+45,7.2501306515314567e+45,1.0335522758690361e+46,1.4733945611427084e+46,2.1004177374382023e+46,2.9942791890879715e+46,4.2685355881351094e+46,6.0850691991503834e+46,8.6746534950702955e+46,1.2366270751702042e+47,1.7628906144931844e+47,2.513112789674655e+47,3.5826022566022658e+47,5.1072275712199294e+47,7.2806780088857692e+47,1.0379069961124107e+48,1.4796024920540804e+48,2.1092675381249403e+48,3.0068951433105372e+48,4.2865204339616912e+48,6.1107077417209613e+48,8.711202869554021e+48,1.2418374211618502e+49,1.7703182943745275e+49,2.5237014201624949e+49,3.5976970233934936e+49,5.1287461221545811e+49,7.3113540730298202e+49,1.0422800643279595e+50,1.4858365791677467e+50,2.1181546261430499e+50,3.019564252997582e+50,4.3045810562864951e+50,6.1364543085134777e+50,8.7479062394423931e+50,1.2470697201787205e+51,1.7777772696907466e+51,2.5343346642849312e+51,3.612855389760717e+51,5.1503553383332409e+51,7.3421593862507038e+51,1.046671557822145e+52,1.492096932689012e+52,2.1270791585971784e+52,3.0322867421117808e+52,4.322717774382571e+52,6.1623093546719876e+52,8.784764253572238e+52,1.2523240647166352e+53,1.7852676723005461e+53,2.5450127100149047e+53,3.6280776236713797e+53,5.1720556017607046e+53,7.3730944931203638e+53,1.0510815542271938e+54,1.4983836632875148e+54,2.1360412932540009e+54,3.0450628355594856e+54,4.3409309088683633e+54,6.1882733372583197e+54,8.8217775635145334e+54,1.2576005476611494e+55,1.792789634618172e+55,2.5557357461173881e+55,3.6433639942219151e+55,5.193847296051068e+55,7.4041599405051125e+55,1.0555101315023654e+56,1.5046968820991839e+56,2.1450411885448278e+56,3.0578927591946149e+56,4.3592207817130717e+56,6.2143467152600619e+56,8.8589468235851804e+56,1.2628992622891597e+57,1.8003432896158798e+57,2.566503962152688e+57,3.6587147716427085e+57,5.2157308064347259e+57,7.4353562775758227e+57,1.0599573679354632e+58,1.5110367007281822e+58,2.1540790035684974e+58,3.0707767398228634e+58,4.3775877162422804e+58,6.2405299495985915e+58,8.8962726908569418e+58,1.2682203022706431e+59,1.8079287708260057e+59,2.5773175484797582e+59,3.6741302273025165e+59,5.2377065197654841e+59,7.4666840558164817e+59,1.0644233421440401e+60,1.5174032312489849e+60,2.1631548980943091e+60,3.0837150052052328e+60,4.3960320371441667e+60,6.2668235031376669e+60,8.9337558251715686e+60,1.2735637616701149e+61,1.8155462123436581e+61,2.588176696259749e+61,3.6896106337137264e+61,5.2597748245265798e+61,7.4981438290353023e+61,1.0689081330770129e+62,1.5237965862081267e+62,2.1722690325645115e+62,3.0967077840626243e+62,4.414554070474938e+62,6.2932278406906285e+62,8.9713968891500675e+62,1.2789297349485626e+63,1.8231957488289357e+63,2.5990815974589824e+63,3.7051562645365499e+63,5.2819361108386596e+63,7.529736153373896e+63,1.0734118200158169e+64,1.53021687862647e+64,2.1814215680976008e+64,3.1097553060796217e+64,4.4331541436642109e+64,6.319743429029775e+64,9.009196548206319e+64,1.2843183169648254e+65,1.8308775155091525e+65,2.6100324448528234e+65,3.7207673945846472e+65,5.3041907704654918e+65,7.5614615873164472e+65,1.0779344825760192e+66,1.5366642220010737e+66,2.1906126664906736e+66,3.1228578019082862e+66,4.4518325855216857e+66,6.3463707368940853e+66,9.0471554705568062e+66,1.2897296029775257e+67,1.8385916481815908e+67,2.6210294320288683e+67,3.736444299829142e+67,5.3265391968219303e+67,7.5933206917010918e+67,1.0824762007086355e+68,1.5431387303070695e+68,2.199842490222721e+68,3.1360155031728517e+68,4.4705897262419457e+68,6.3731102349969577e+68,9.0852743272342131e+68,1.2951636886466442e+69,1.8463382832154855e+69,2.6320727533901428e+69,3.7521872574043477e+69,5.3489817849804296e+69,7.6253140297281115e+69,1.0870370547014513e+70,1.5496405179999816e+70,2.2091112024573164e+70,3.1492286424731111e+70,4.4894258974111821e+70,6.3999623960357969e+70,9.1235537920985197e+70,1.3006206700351009e+71,1.854117557554801e+71,2.6431626041590593e+71,3.7679965456118135e+71,5.3715189316775634e+71,7.6574421669714006e+71,1.0916171251806562e+72,1.5561697000173992e+72,2.2184189670453101e+72,3.1624974533891484e+72,4.5083414320126756e+72,6.4269276946989195e+72,9.1619945418481417e+72,1.3061006436107096e+73,1.8619296087204941e+73,2.6542991803802722e+73,3.7838724439259936e+73,5.3941510353221111e+73,7.689705671387813e+73,1.0962164931120225e+74,1.5627263917813172e+74,2.2277659485281656e+74,3.1758221704852061e+74,4.5273366644322994e+74,6.4540066076752214e+74,9.2005972560337038e+74,1.3116037062475895e+75,1.8697745748127888e+75,2.6654826789246651e+75,3.7998152329988665e+75,5.4168784960008728e+75,7.7221051133265542e+75,1.1008352398025839e+76,1.5693107092000438e+76,2.2371523121403655e+76,3.1892030293135558e+76,4.5464119304653269e+76,6.4811996136620548e+76,9.2393626170679715e+76,1.3171299552281354e+77,1.8776525945139846e+77,2.6767132974926108e+77,3.8158251946645732e+77,5.4397017154868164e+77,7.7546410655407841e+77,1.1054734469018248e+78,1.5759227686701163e+78,2.2465782238127731e+78,3.2026402664192965e+78,4.5655675673213369e+78,6.5085071933731437e+78,9.2782913102397393e+78,1.3226794882446282e+79,1.8855638070904865e+79,2.6879912346172335e+79,3.8319026119451547e+79,5.4626210972457249e+79,7.7873141031959981e+79,1.1101311964033411e+80,1.5825626870786707e+80,2.2560438501753768e+80,3.2161341193438129e+80,4.5848039136310819e+80,6.5359298295483635e+80,9.3173840237251726e+80,1.3282524034008479e+81,1.8935083523956377e+81,2.6993166896684536e+81,3.8480477690546882e+81,5.4856370464428553e+81,7.8201248038817242e+81,1.1148085706461979e+82,1.5892305818051496e+82,2.2655493585600454e+82,3.2296848266296066e+82,4.6041213094520848e+82,6.5634680069608053e+82,9.3566414485991658e+82,1.3338487992140706e+83,1.9014863708720335e+83,2.7106898628559008e+83,3.8642609514050715e+83,5.508749969951196e+83,7.8530737476210831e+83,1.1195056523162879e+84,1.5959265707236922e+84,2.2750949170039317e+84,3.2432926278242445e+84,4.6235200962742587e+84,6.5911222124266343e+84,9.3960642788494228e+84,1.3394687746165097e+85,1.9094980035538418e+85,2.7221109552329879e+85,3.8805424456107457e+85,5.5319602763574047e+85,7.8861615168803675e+85,1.1242225244480157e+86,1.6026507722050832e+86,2.2846806942519299e+86,3.256957763484316e+86,4.643000617026858e+86,6.6188929348131477e+86,9.4356532113865916e+86,1.345112428957328e+87,1.9175433920696726e+87,2.7335801687002393e+87,3.8968925394934278e+87,5.5552683759701316e+87,7.9193886965809032e+87,1.1289592704255122e+88,1.6094033051187084e+88,2.2943068597601107e+88,3.2706804751803298e+88,4.6625632160834943e+88,6.646780665046848e+88,9.4754089460584548e+88,1.3507798620042826e+89,1.9256226786446506e+89,2.7450977060086225e+89,3.9133115220879719e+89,5.5786746808268047e+89,7.9527558741075937e+89,1.1337159739843302e+90,1.6161842888349751e+90,2.3039735836985242e+90,3.2844610055002446e+90,4.6822082392691392e+90,6.6747858961234393e+90,9.5153321856615015e+90,1.3564711739453713e+91,1.9337360061033089e+91,2.7566637707636794e+91,3.9297996836465941e+91,5.6021796047004316e+91,7.986263639320878e+91,1.138492719212831e+92,1.6229938432270567e+92,2.3136810369540087e+92,3.2982995980545001e+92,4.7019360338658533e+92,6.7029091231150312e+92,9.5554236359525409e+92,1.3621864653908741e+93,1.9418835178719503e+93,2.7682785674285e+93,3.9463573156447783e+93,5.625783563108031e+93,8.0199125845664908e+93,1.1432895905535722e+94,1.6298320886733325e+94,2.3234293911336733e+94,3.3121964974795792e+94,4.7217469486185129e+94,6.7311508431802189e+94,9.595684005663069e+94,1.3679258373748221e+95,1.9500653579810185e+95,2.779942301327885e+95,3.9629847107860992e+95,5.6494869733167001e+95,8.0537033046852419e+95,1.1481066728050275e+96,1.6366991460593786e+96,2.3332188185674042e+96,3.3261519494429858e+96,4.7416413337419187e+96,6.7595115555723023e+96,9.6361140065096264e+96,1.3736893913570555e+97,1.9582816710680291e+97,2.7916551786517419e+97,3.9796821630070581e+97,5.6732902543521128e+97,8.0876363970251295e+97,1.1529440511228266e+98,1.6435951367799658e+98,2.3430494923113718e+98,3.3401662006473091e+98,4.7616195409259108e+98,6.7879917616475351e+98,9.6767143532085599e+98,1.3794772292249001e+99,1.9665326023796845e+99,2.8034174064584908e+99,3.9964499674830633e+99,5.6971938270054434e+99,8.1217124614500731e+99,1.1578018110214872e+100,1.65052018274153e+100,2.352921586150895e+100,3.3542394988342975e+100,4.7816819233425265e+100,6.816591964875333e+100,9.717485763486475e+100,1.3852894532948522e+101,1.97481829777483e+101,2.8152291926792799e+101,4.0132884206327507e+101,5.7211981138403257e+101,8.1559321003521178e+101,1.1626800383758304e+102,1.6574744063639541e+102,2.3628352746033095e+102,3.368372092789904e+102,4.8018288356518444e+102,6.8453126708456316e+102,9.7584289580948315e+102,1.3911261663146602e+103,1.9831389037268657e+103,2.8270907461210255e+103,4.030197820124012e+103,5.7453035392014507e+103,8.1902959186614035e+103,1.1675788194223997e+104,1.6644579305830606e+104,2.3727907329215239e+104,3.3825642323479223e+104,4.8220606340078394e+104,6.8741543872791759e+104,9.7995446608218778e+104,1.3969874714648272e+105,1.991494567326167e+105,2.8390022764706607e+105,4.0471784648789188e+105,5.769510529220772e+105,8.2248045238561571e+105,1.1724982407612152e+106,1.6714708788526443e+106,2.3827881370965783e+106,3.3968161683950712e+106,4.8423776760656382e+106,6.9031176240359218e+106,9.8408335985045977e+106,1.4028734723607112e+107,1.9998854362830792e+107,2.8509639942986054e+107,4.0642306550786643e+107,5.7938195118261755e+107,8.2594585259750548e+107,1.1774383893570408e+108,1.6785133751465121e+108,2.3928276638612286e+108,3.4111281528751447e+108,4.8627803209867448e+108,6.9322028931234558e+108,9.8822965010435174e+108,1.4087842730542384e+109,2.0083116589300756e+109,2.8629761110622431e+109,4.0813546921696702e+109,5.8182309167485629e+109,8.2942585376261476e+109,1.1823993525411536e+110,1.6855855439610062e+110,2.4029094906928681e+110,3.4255004387931748e+110,4.8832689294463488e+110,6.9614107087074188e+110,9.9239341014133622e+110,1.414719978035622e+111,2.0167733842247784e+111,2.8750388391101454e+111,4.0985508788678795e+111,5.8427451755291117e+111,8.3292051739995573e+111,1.1873812180127883e+112,1.692687510316825e+112,2.4130337958164611e+112,3.4399332802204827e+112,4.9038438636391548e+112,6.9907415871192202e+112,9.9657471356782709e+112,1.4206806922354908e+113,2.0252707617524204e+113,2.8871523916855841e+113,4.1158195191654979e+113,5.8673627215270676e+113,8.3642990528762416e+113,1.1923840738406206e+114,1.6998193997616151e+114,2.4232007582081691e+114,3.4544269322988833e+114,4.9245054872860625e+114,7.0201960468655581e+114,1.0007736343002266e+115,1.4266665210263805e+115,2.0338039417283747e+115,2.8993169829301361e+115,4.1331609183348595e+115,5.8920839899285705e+115,8.3995407946417423e+115,1.1974080084643556e+116,1.706981338371758e+116,2.4334105575980383e+116,3.468981651244999e+116,4.9452541656401738e+116,7.0497746086389751e+116,1.0049902465665711e+117,1.4326775702250829e+117,2.0423730750008672e+117,2.9115328278875494e+117,4.1505753829347518e+117,5.9169094177523526e+117,8.4349310222940844e+117,1.2024531106965305e+118,1.7141734527551793e+118,2.4436633744733105e+118,3.4835976943548808e+118,4.9660902654933921e+118,7.0794777953246794e+118,1.0092246249074755e+119,1.4387139460939893e+119,2.050978313054048e+119,2.9238001425081222e+119,4.1680632208153632e+119,5.9418394438584569e+119,8.4704703614566765e+119,1.2075194697236769e+120,1.7213958700529568e+120,2.4539593900821008e+120,3.4982753200092549e+120,4.9870141551838863e+120,7.109306132010975e+120,1.01347684417762e+121,1.4447757553432934e+121,2.0596198080099751e+121,2.9361191436515325e+121,4.1856247411246769e+121,5.9668745089570113e+121,8.5061594403884117e+121,1.2126071751080996e+122,1.7286487179419554e+122,2.4642987864357693e+122,3.5130147876769006e+122,5.0080262046009207e+122,7.1392601459997589e+122,1.017746979547247e+123,1.4508631051327138e+123,2.0682977126316489e+123,2.9484900490913291e+123,4.2032602543125138e+123,5.992015055613997e+123,8.5419988899967177e+123,1.2177163167896682e+124,1.7359321246368897e+124,2.4746817463125527e+124,3.5278163579198309e+124,5.0291267851925153e+124,7.169340366813426e+124,1.0220351065031441e+125,1.4569761030737187e+125,2.0770121803260669e+125,2.9609130775184501e+125,4.2209700721367268e+125,6.0172615282604206e+125,8.5779893438458005e+125,1.2228469850869934e+126,1.7432462188929834e+126,2.4851084532612192e+126,3.542680292398497e+126,5.0503162699714427e+126,7.1995473262054288e+126,1.0263413008502095e+127,1.4631148572309334e+127,2.0857633651462322e+127,2.9733884485457591e+127,4.2387545076694325e+127,6.042614373199489e+127,8.6141314381692912e+127,1.2279992706992295e+128,1.7505911300076558e+128,2.4955790916034698e+128,3.5576068538752185e+128,5.0715950335229734e+128,7.2298815581709148e+128,1.0306656387126756e+129,1.4692794761242969e+129,2.0945514217943444e+129,2.9859163827109233e+129,4.2566138753011141e+129,6.0680740386158738e+129,8.6504258118829699e+129,1.2331732647078876e+130,1.7579669878231001e+130,2.5060938464376172e+130,3.5725963062196248e+130,5.0929634520097751e+130,7.2603435989537112e+130,1.0350081965356886e+131,1.4754700687312311e+131,2.1033765056242988e+131,2.9984971014808082e+131,4.2745484907468879e+131,6.0936409745815727e+131,8.6868731065931198e+131,1.238369058578028e+132,1.765373922728881e+132,2.5166529036422846e+132,3.5876489144129169e+132,5.1144219031794179e+132,7.290933987057441e+132,1.0393690510863094e+133,1.4816867444880686e+133,2.11223877264491e+133,3.0111308272559113e+133,4.2925586710528168e+133,6.1193156330648946e+133,8.7234739666093354e+133,1.2435867441601556e+134,1.7728120656636399e+134,2.5272564498788417e+134,3.6027649445533679e+134,5.1359707663719286e+134,7.3216532632542133e+134,1.0437482794550448e+135,1.4879296132923181e+135,2.1211383795219543e+135,3.0238177833732686e+135,4.3106447346000658e+135,6.1450984679394935e+135,8.7602290389574011e+135,1.248826413691702e+136,1.7802815481177079e+136,2.5379046725952688e+136,3.6179446638598041e+136,5.1576104225247533e+136,7.352501970595856e+136,1.0481459590573891e+137,1.4941987855044414e+137,2.1300754835812943e+137,3.0365581941109125e+137,4.3288070011114904e+137,6.1709899349903081e+137,8.7971389733877614e+137,1.2540881597989419e+138,1.7877825021357349e+138,2.5485977600291877e+138,3.6331883406769367e+138,5.1793412541806559e+138,7.3834806544210091e+138,1.0525621676348374e+139,1.5004943719501418e+139,2.1390502428120257e+139,3.049352284692355e+139,4.3470457916568068e+139,6.1969904919226557e+139,8.8342044223889838e+139,1.259372075498203e+140,1.7953150603184178e+140,2.5593359012117655e+140,3.6484962444807277e+140,5.2011636454938898e+140,7.4145898623660166e+140,1.0569969832564362e+141,1.5068164839218165e+141,2.1480628158685443e+141,3.0622002812895379e+141,4.3653614286592517e+141,6.223100598371386e+141,8.8714260411982987e+141,1.2646782541977233e+142,1.8028793558252484e+142,2.5701192859701887e+142,3.6638686458819162e+142,5.2230779822381712e+142,7.4458301443758705e+142,1.0614504843203453e+143,1.5131652331807749e+143,2.1571133620737108e+143,3.0751024110275153e+143,4.3837542358998048e+143,6.2493207159068924e+143,8.9088044878151912e+143,1.2700067896995183e+144,1.8104755223766629e+144,2.5809481049314529e+144,3.6793058166314168e+144,5.2450846518117348e+144,7.4772020527114111e+144,1.0659227495548626e+145,1.5195407319594747e+145,2.1662020414220389e+145,3.0880589019881261e+145,4.4022245385236438e+145,6.2756513080446824e+145,8.9463404230100189e+145,1.2753577762006088e+146,1.8181036942568182e+146,2.5918225495261712e+146,3.6948080296257557e+146,5.2671840432450529e+146,7.5087061419603424e+146,1.0704138580200566e+147,1.5259430929629903e+147,2.1753290145817858e+147,3.1010699832147231e+147,4.4207726630466488e+147,6.3020928402528593e+147,8.9840345103371918e+147,1.2807313082948996e+148,1.8257640063153487e+148,2.6027428119910807e+148,3.7103755589106388e+148,5.2893765472086194e+148,7.5403429690483226e+148,1.0749238891090424e+149,1.5323724293712613e+149,2.1844944428982845e+149,3.1141358847151752e+149,4.4393989373596778e+149,6.3286457799617805e+149,9.021887416148444e+149,1.2861274809750719e+150,1.8334565939700566e+150,2.6137090853728798e+150,3.7260086796866342e+150,5.311662556018064e+150,7.5721130932462538e+150,1.0794529225496298e+151,1.5388288548413556e+151,2.1936984883965475e+151,3.1272568374664507e+151,4.4581036907353568e+151,6.3553105965701783e+151,9.059899809601545e+151,1.2915463896338258e+152,1.8411815932096199e+152,2.6247215635320848e+152,3.7417076683136133e+152,5.3340424636419745e+152,7.6040170761818703e+152,1.0840010384053664e+153,1.5453124835089573e+153,2.2029413137846305e+153,3.1404330734192402e+153,4.4768872538333986e+153,6.3820877614545251e+153,9.0980723626736609e+153,1.2969881300658577e+154,1.848939140595372e+154,2.6357804411455691e+154,3.7574728023164872e+154,5.3565166657097798e+154,7.6360554818488091e+154,1.0885683170771355e+155,1.5518234299907313e+155,2.212223082455761e+155,3.1536648255009911e+155,4.4957499587074683e+155,6.4089777479784527e+155,9.1364057501747852e+155,1.3024527984694062e+156,1.8567293732640261e+156,2.6468859137105975e+156,3.7733043603888399e+156,5.3790855595169231e+156,7.6682288766183111e+156,1.0931548393047629e+157,1.5583618093861741e+157,2.2215439584915985e+157,3.1669523276205531e+157,4.5146921388095234e+157,6.4359810314989574e+157,9.1749006497565713e+157,1.3079404914482493e+158,1.8645524289304171e+158,2.6580381775479833e+158,3.7892026223984863e+158,5.4017495440330973e+158,7.7005378292466389e+158,1.097760686168074e+159,1.5649277372800029e+159,2.2309041066655147e+159,3.1802958146728579e+159,4.5337141289964717e+159,6.4630980893758741e+159,9.2135577419263777e+159,1.313451306012969e+160,1.8724084458893046e+160,2.66923742980616e+160,3.8051678693930697e+160,5.424509019908686e+160,7.7329829108864191e+160,1.1023859390885119e+161,1.5715213297436688e+161,2.2403036924447521e+161,3.1936955225419909e+161,4.5528162655368623e+161,6.4903294009814246e+161,9.2523777100582496e+161,1.3189853395828863e+162,1.8802975630182389e+162,2.6804838684637653e+162,3.8212003836037402e+162,5.4473643894830825e+162,7.7655646950980665e+162,1.1070306798307644e+163,1.5781427033376714e+163,2.249742881993722e+163,3.2071516881060806e+163,4.5719988861152893e+163,6.5176754477064972e+163,9.2913612404071125e+163,1.3245426899880082e+164,1.8882199197798025e+164,2.6917776923335887e+164,3.8373004484507841e+164,5.4703160567899482e+164,7.7982837578572869e+164,1.1116949905038348e+165,1.5847919751138892e+165,2.2592218421773295e+165,3.2206645492411247e+165,4.5912623298391302e+165,6.5451367129706129e+165,9.3305090221177412e+165,1.3301234554703098e+166,1.896175656224505e+166,2.7031191010665462e+166,3.8534683485492916e+166,5.4933644275652813e+166,7.8311406775665701e+166,1.1163789535627435e+167,1.5914692626171139e+167,2.268740740563156e+167,3.2342343448259241e+167,4.6106069372453213e+167,6.5727136822297367e+167,9.3698217472385186e+167,1.3357277346857693e+168,1.9041649129926159e+168,2.7145082951542952e+168,3.869704369712883e+168,5.5165099092555224e+168,7.8641360350667548e+168,1.1210826518098593e+169,1.5981746838873923e+169,2.278299745424933e+169,3.2478613147452121e+169,4.6300330503048194e+169,6.6004068429863538e+169,9.4093001107352673e+169,1.3413556267059606e+170,1.9121878313169706e+170,2.7259454759332329e+170,3.8860087989596305e+170,5.5397529110228922e+170,7.8972704136446352e+170,1.1258061683966175e+171,1.6049083574623887e+171,2.2878990257452578e+171,3.2615456998944374e+171,4.649541012429688e+171,6.6282166847958465e+171,9.4489448105003493e+171,1.3470072310201104e+172,1.9202445530257951e+172,2.7374308455885229e+172,3.9023819245166912e+172,5.5630938437535532e+172,7.9305443990450374e+172,1.1305495868246087e+173,1.6116704023789363e+173,2.2975387512191014e+173,3.2752877421845848e+173,4.6691311684786386e+173,6.656143699276262e+173,9.4887565473665855e+173,1.3526826475363994e+174,1.9283352205445606e+174,2.7489646071567411e+174,3.9188240358262916e+174,5.5865331200658219e+174,7.9639585794802878e+174,1.1353129909472443e+175,1.6184609381755024e+175,2.3072190922560295e+175,3.2890876845453364e+175,4.6888038647641924e+175,6.6841883801181436e+175,9.5287360251212716e+175,1.358381976583956e+176,1.9364599768988259e+176,2.7605469645300835e+176,3.9353354235495155e+176,5.6100711543155749e+176,7.9975135456424184e+176,1.1400964649714333e+177,1.6252800848941203e+177,2.3169402199836013e+177,3.3029457709299222e+177,4.7085594490572102e+177,6.7123512230909903e+177,9.5688839505153881e+177,1.3641053189148619e+178,1.9446189657170977e+178,2.7721781224596579e+178,3.9519163795720997e+178,5.6337083626048332e+178,8.0312098907108927e+178,1.1449000934586844e+179,1.6321279630828795e+179,2.3267023062507932e+179,3.3168622463199959e+179,4.7283982705938309e+179,6.740632726053151e+179,9.6092010332782484e+179,1.3698527757054717e+180,1.9528123312327093e+180,2.7838582865597326e+180,3.968567197010274e+180,5.6574451627884786e+180,8.0650482103644454e+180,1.1497239613267934e+181,1.6390046937975045e+181,2.3365055236302449e+181,3.3308373567288419e+181,4.7483206800824555e+181,6.769033388961775e+181,9.6496879861289532e+181,1.3756244485584303e+182,1.9610402182868104e+182,2.7955876633104306e+182,3.9852881702145957e+182,5.6812819744829288e+182,8.0990291027929928e+182,1.15456815385154e+183,1.6459103986037682e+183,2.3463500454217049e+183,3.3448713492064732e+183,4.7683270297083349e+183,6.7975537138793562e+183,9.6903455247911886e+183,1.3814204395047055e+184,1.9693027723307053e+184,2.8073664600618444e+184,4.0020795947760497e+184,5.7052192190716281e+184,8.133153168705458e+184,1.1594327566678054e+185,1.6528451995799243e+185,2.356236045655495e+185,3.358964471843621e+185,4.7884176731406002e+185,6.8261942049841408e+185,9.7311743680025925e+185,1.3872408510049219e+186,1.9776001394288726e+186,2.8191948850381861e+186,4.0189417675308208e+186,5.7292573197134545e+186,8.1674210113417557e+186,1.164317855771346e+187,1.6598092193183044e+187,2.3661636990947875e+187,3.3731169737768822e+187,4.8085929655393284e+187,6.8549553685782663e+187,9.7721752375290881e+187,1.3930857859514859e+188,1.9859324662608747e+188,2.8310731473405092e+188,4.0358749865664559e+188,5.7533967013511811e+188,8.2018332364848616e+188,1.1692235375201819e+189,1.6668025809277637e+189,2.376133181239227e+189,3.3873291051919821e+189,4.8288532635601976e+189,6.8838377130982654e+189,9.8133488581793222e+189,1.3989553476702467e+190,1.994299900124287e+190,2.843001456950884e+190,4.052879551225764e+190,5.7776377907170358e+190,8.2363904524687301e+190,1.1741498886363896e+191,1.6738254080361428e+191,2.3861446683277648e+191,3.4016011173287647e+191,4.8491989253618722e+191,6.9128417491217268e+191,9.8546959578141457e+191,1.4048496399226393e+192,2.0027025889376404e+192,2.8549800247365914e+192,4.0699557621127878e+192,5.801981016341218e+192,8.271093270190907e+192,1.1790969962072372e+193,1.6808778247918854e+193,2.3961983373423154e+193,3.4159332624862143e+193,4.8696303106117899e+193,6.9419679893774779e+193,9.8962172673611408e+193,1.4107687669070441e+194,2.0111406812423595e+194,2.867009062452888e+194,4.0871039210988144e+194,5.8264268085604627e+194,8.3059423031223957e+194,1.1840649476869205e+195,1.6879599558666111e+195,2.4062943660100734e+195,3.4303257940257617e+195,4.890147780493624e+195,6.9712169487558365e+195,9.9379135208292316e+195,1.4167128332608652e+196,2.0196143262057238e+196,2.8790887827473904e+196,4.1043243313263282e+196,5.8509755995236786e+196,8.3409381673203801e+196,1.1890538308983135e+197,1.6950719264571291e+197,2.4164329328070607e+197,3.4447789663765311e+197,4.9107516977120107e+197,7.0005891443153507e+197,9.9797854553182923e+197,1.4226819440626226e+198,2.0281236736238525e+198,2.8912193991635113e+198,4.1216172972150562e+198,5.8756278232008984e+198,8.3760814814363008e+198,1.1940637340341164e+199,1.7022138622880354e+199,2.426614216961691e+199,3.4592930350394491e+199,4.9314424264997884e+199,7.0300850952931153e+199,1.0021833811034424e+200,1.428676204833327e+200,2.0366688739236643e+200,2.9034011261448882e+200,4.1389831244680562e+200,5.9003839153902893e+200,8.4113728667281822e+200,1.1990947456586842e+201,1.7093858896133596e+201,2.4368383984571209e+201,3.4738682565925496e+201,4.952220332625273e+201,7.0597053231151497e+201,1.00640593313019e+202,1.434695721538586e+202,2.0452500781659936e+202,2.9156341790381942e+202,4.1564221200757167e+202,5.925244313727195e+202,8.4468129470730676e+202,1.2041469547094558e+203,1.7165881352190826e+203,2.4471056580348366e+203,3.488504888694329e+203,4.9730857833970539e+203,7.0894503514032288e+203,1.0106462762578604e+204,1.4407406005907221e+204,2.0538674380480311e+204,2.9279187740974312e+204,4.1739345923221222e+204,5.9502094576898651e+204,8.4824023489751781e+204,1.2092204504988003e+205,1.7238207264256718e+205,2.4574161771982689e+205,3.5032031900888864e+205,4.9940391476713179e+205,7.1193207059857308e+205,1.0149044854465787e+206,1.4468109488501656e+206,2.0625211059064722e+206,2.9402551284882541e+206,4.1915208507900252e+206,5.9752797886082225e+206,8.518141701578409e+206,1.2143153227151863e+207,1.7310837910897482e+207,2.4677701382151707e+207,3.5179634206111012e+207,5.0150807958592213e+207,7.1493169149061258e+207,1.0191806359723031e+208,1.4529068736276691e+208,2.0712112347195082e+208,2.9526434602908147e+208,4.2091812063672761e+208,6.0004557496726874e+208,8.5540316366789182e+208,1.2194316614249702e+209,1.7383774576066365e+209,2.4781677241213909e+209,3.5327858411900289e+209,5.0362110999317449e+209,7.1794395084339378e+209,1.0234748034283298e+210,1.4590284826860407e+210,2.0799379781098827e+210,2.9650839885041115e+210,4.2269159712508906e+210,6.0257377859399786e+210,8.590072788733387e+210,1.2245695570741983e+211,1.7457018549129326e+211,2.488609118723832e+211,3.5476707138541091e+211,5.0574304334273969e+211,7.2096890190716848e+211,1.0277870637262821e+212,1.4651758842423792e+212,2.0887014903479585e+212,2.9775769330503675e+212,4.244725458953277e+212,6.0511263443419906e+212,8.6262657948721752e+212,1.2297291004897896e+213,1.7530571124881915e+213,2.4990945066042639e+213,3.5626183017364063e+213,5.0787391714582466e+213,7.2400659815654969e+213,1.0321174930976841e+214,1.4713491869694923e+214,2.0975019263537407e+214,2.990122514777911e+214,4.2626099843085057e+214,6.0766218736947335e+214,8.6626112949095995e+214,1.2349103828813479e+215,1.76044336035761e+215,2.5096240731217407e+215,3.5776288690780494e+215,5.1001376907177085e+215,7.2705709329158181e+215,1.0364661680951909e+216,1.4775484999980629e+216,2.1063394416999648e+216,3.0027209554657508e+216,4.2805698634764306e+216,6.1022248247042038e+216,8.6991099313572228e+216,1.2401134958429866e+217,1.7678607290941257e+217,2.5201980044162981e+217,3.5927026812337135e+217,5.1216263694854728e+217,7.3012044123844263e+217,1.0408331655941778e+218,1.4837739329188324e+218,2.115214192615208e+218,3.0153724778271567e+218,4.2986054139489967e+218,6.1279356499757257e+218,8.7357623494322528e+218,1.2453385313545258e+219,1.775309349821129e+219,2.5308164874126746e+219,3.6078400046758983e+219,5.1432055876350538e+219,7.3319669615051947e+219,1.0452185627937467e+220,1.4900255957840341e+220,2.1241263359859348e+220,3.0280773055142832e+220,4.3167169545565843e+220,6.1537548040212606e+220,8.7725691970704238e+220,1.2505855817833997e+221,1.7827893542141764e+221,2.5414797098227579e+221,3.6230411070004633e+221,5.1648757266413809e+221,7.3628591240949223e+221,1.0496224372182653e+222,1.4963035991095897e+222,2.1330760293597481e+222,3.0408356631209218e+222,4.3349048054724359e+222,6.1796827432684847e+222,8.8095311249394458e+222,1.2558547398862196e+223,1.7903008745037214e+223,2.5521878601494775e+223,3.6383062569301281e+223,5.1866371695857977e+223,7.3938814462604477e+223,1.0540448667189181e+224,1.502608053877318e+224,2.1420634309479309e+224,3.0536477761878484e+224,4.3531692882178028e+224,6.2057199260681731e+224,8.8466487864445168e+224,1.2611460988102687e+225,1.7978440434773507e+225,2.5629411276899906e+225,3.6536357243200403e+225,5.2084903011639948e+225,7.4250344764099664e+225,1.0584859294747252e+226,1.5089390715363885e+226,2.1510886996287337e+226,3.0665138712056015e+226,4.3715107256708474e+226,6.2318668127015862e+226,8.8839228377488835e+226,1.2664597520957233e+227,1.8054189944819264e+227,2.5737397025387375e+227,3.6690297801623433e+227,5.2304355076925232e+227,7.4563187652623124e+227,1.0629457039941619e+228,1.5152967640056308e+228,2.1601519949494503e+228,3.0794341756191786e+228,4.3899294420683959e+228,6.2581238653896671e+228,8.9213539377769151e+228,1.2717957936764475e+229,1.8130258614267643e+229,2.5845837755919716e+229,3.6844886965905467e+229,5.2524731771150228e+229,7.4877348658558423e+229,1.0674242691164872e+230,1.5216812436754274e+230,2.1692534771297248e+230,3.0924089178318828e+230,4.4084257630138967e+230,6.2844915483008539e+230,8.9589427482302748e+230,1.2771543178822246e+231,1.8206647787847713e+231,2.5954735385493825e+231,3.7000127468860109e+231,5.2746036990114699e+231,7.5192833335616079e+231,1.0719217040130167e+232,1.5280926234095274e+232,2.1783933070642648e+232,3.1054383272093596e+232,4.4270000154826791e+232,6.3109703275592952e+232,8.9966899335986027e+232,1.2825354194402832e+233,1.8283358815956415e+233,2.6064091839186496e+233,3.7156022054802707e+233,5.2968274646014868e+233,7.5509647260880857e+233,1.0764380881890072e+234,1.5345310165477365e+234,2.1875716463254341e+234,3.1185226340832993e+234,4.4456525278277347e+234,6.3375606712530808e+234,9.0345961611712696e+234,1.2879391934769711e+235,1.8360393054680386e+235,2.6173909050185551e+235,3.7312573479615567e+235,5.3191448667536393e+235,7.5827796034944239e+235,1.0809735014843345e+236,1.5409965369068791e+236,2.1967886571671047e+236,3.1316620697569252e+236,4.4643836297850152e+236,6.364263049441801e+236,9.0726621010481419e+236,1.293365735519436e+237,1.8437751865819935e+237,2.6284188959824028e+237,3.7469784510792503e+237,5.341556299991785e+237,7.6147285281994976e+237,1.085528024075389e+238,1.5474892987835039e+238,2.2060445025260346e+238,3.1448568665069578e+238,4.4831936524812884e+238,6.3910779341677387e+238,9.1108884261555454e+238,1.298815141497169e+239,1.8515436616911011e+239,2.6394933517614468e+239,3.7627657927487744e+239,5.3640621605020529e+239,7.6468120649918509e+239,1.0901017364763732e+240,1.5540094169557318e+240,2.215339346025741e+240,3.1581072575891356e+240,4.5020829284369528e+240,6.4180057994598917e+240,9.1492758122519876e+240,1.3042875077442876e+241,1.8593448681257791e+241,2.650614468128039e+241,3.7786196520560791e+241,5.3866628461398426e+241,7.6790307810396824e+241,1.0946947195407239e+242,1.5605570066852833e+242,2.2246733519791445e+242,3.1714134772419878e+242,4.5210517915739406e+242,6.4450471213452304e+242,9.1878249379442179e+242,1.3097829310003568e+243,1.8671789437944349e+243,2.6617824416802938e+243,3.7945403092642903e+243,5.409358756436242e+243,7.7113852458999923e+243,1.0993070544625422e+244,1.5671321837195188e+244,2.2340466853914741e+244,3.184775760690971e+244,4.5401005772211156e+244,6.4722023778563938e+244,9.2265364846981958e+244,1.3153015084126868e+245,1.8750460271867435e+245,2.6729974698437579e+245,3.8105280458160931e+245,5.4321502926075514e+245,7.7438760315321555e+245,1.1039388227779028e+246,1.5737350642933024e+246,2.243459511962929e+246,3.1981943441526306e+246,4.5592296221201993e+246,6.4994720490401436e+246,9.2654111368511343e+246,1.3208433375379039e+247,1.8829462573758855e+247,2.6842597508761032e+247,3.8265831443404191e+247,5.4550378575586921e+247,7.7765037123027839e+247,1.1085901063667975e+248,1.5803657651317745e+248,2.2529119980926266e+248,3.21166946483841e+248,4.5784392644312049e+248,6.5268566169658445e+248,9.3044495816236022e+248,1.3264085163436745e+249,1.8908797740210062e+249,2.6955694838703314e+249,3.8427058886570147e+249,5.4780218558927805e+249,7.8092688649993748e+249,1.1132609874538306e+250,1.5870244034513433e+250,2.2624043108800177e+250,3.2252013609603045e+250,4.5977298437404929e+250,6.5543565657332481e+250,9.3436525091306071e+250,1.3319971432104378e+251,1.8988467173696832e+251,2.7069268687582927e+251,3.8588965637814595e+251,5.5011026939176664e+251,7.8421720688396348e+251,1.1179515486101733e+252,1.5937110969624687e+252,2.271936618128857e+252,3.2387902717328844e+252,4.6171017010636628e+252,6.5819723814840204e+252,9.3830206123980455e+252,1.3376093169329918e+253,1.906847228260191e+253,2.7183321063142206e+253,3.8751554559302052e+253,5.524280779653122e+253,7.8752139054817199e+253,1.1226618727548983e+254,1.6004259638715678e+254,2.2815090883499154e+254,3.2524364373789801e+254,4.636555178853651e+254,6.6097045524058818e+254,9.4225545873685847e+254,1.3432451367228488e+255,1.9148814481248549e+255,2.7297853981579719e+255,3.8914828525251899e+255,5.5475565228374158e+255,7.9083949590345143e+255,1.1273920431564452e+256,1.6071691228831014e+256,2.2911218907639592e+256,3.2661400991335659e+256,4.6560906210062688e+256,6.6375535687442016e+256,9.4622551329182076e+256,1.3489047022090775e+257,1.9229495189912547e+257,2.7412869467598284e+257,3.9078790422006911e+257,5.5709303349370843e+257,7.9417158160670577e+257,1.1321421434339647e+258,1.6139406932016756e+258,2.3007751953047415e+258,3.2799014992480242e+258,4.6757083728662833e+258,6.66551992280993e+258,9.5021229508675107e+258,1.3545881134406709e+259,1.9310515834855988e+259,2.7528369554422213e+259,3.9243443148057748e+259,5.5944026291504219e+259,7.9751770656225235e+259,1.1369122575593106e+260,1.6207407945339621e+260,2.3104691726217436e+260,3.2937208809944282e+260,4.6954087812335188e+260,6.6936041089882916e+260,9.5421587459941048e+260,1.3602954708881642e+261,1.9391877848350307e+261,2.76443562838456e+261,3.9408789614111874e+261,5.6179738204173055e+261,8.0087792992232196e+261,1.1417024698577532e+262,1.6275695470915525e+262,2.3202039940842411e+262,3.307598488669465e+262,4.7151921943684567e+262,6.7218066237467707e+262,9.582363226045079e+262,1.36602687544541e+263,1.9473582668701595e+263,2.7760831706265344e+263,3.9574832743140599e+263,5.6416443254259009e+263,8.0425231108846475e+263,1.1465128650099837e+264,1.6344270715919793e+264,2.3299798317827613e+264,3.3215345676002599e+264,4.7350589620005268e+264,6.7501279656469346e+264,9.6227371017484169e+264,1.3717824284312067e+265,1.9555631740276042e+265,2.7877797880717383e+265,3.9741575470430712e+265,5.6654145626200264e+265,8.0764090971251088e+265,1.1513435280534833e+266,1.6413134892615846e+266,2.3397968585331711e+266,3.3355293641464572e+266,4.7550094353310884e+266,6.7785686353486736e+266,9.6632810868299302e+266,1.3775622315917119e+267,1.9638026513523228e+267,2.7995256874909923e+267,3.9909020743636416e+267,5.6892849522065529e+267,8.1104378569762479e+267,1.1561945443840256e+268,1.64822892183748e+268,2.3496552478794733e+268,3.3495831257060798e+268,4.7750439670417688e+268,6.8071291356220987e+268,9.7039958980193289e+268,1.3833663871013082e+269,1.9720768445010684e+269,2.8113210765272701e+269,4.0077171522826877e+269,5.7132559161621799e+269,8.144609991993637e+269,1.1610659997571871e+270,1.6551734915696984e+270,2.3595551740968705e+270,3.3636961007195237e+270,4.7951629113001685e+270,6.8358099713556712e+270,9.7448822550672496e+270,1.3891949975650309e+271,1.9803858997436272e+271,2.8231661636974641e+271,4.0246030780556734e+271,5.7373278782434948e+271,8.178926106266487e+271,1.16595798028973e+272,1.6621473212231665e+272,2.3694968121948511e+272,3.3778685386739532e+272,4.8153666237661217e+272,6.8646116495651219e+272,9.7859408807568942e+272,1.3950481660202261e+273,1.9887299639662958e+273,2.8350611583973384e+273,4.0415601501891364e+273,5.7615012639905704e+273,8.2133868064320365e+273,1.1708705724616547e+274,1.6691505340806294e+274,2.379480337920007e+274,3.392100690107324e+274,4.8356554615979809e+274,6.8935346794024211e+274,9.8271725009168069e+274,1.4009259959383727e+275,1.9971091846742539e+275,2.8470062709049174e+275,4.0585886684477858e+275,5.7857765007370778e+275,8.2479927016807156e+275,1.1758038631169344e+276,1.6761832539436992e+276,2.3895059277602256e+276,3.406392806614353e+276,4.8560297834583827e+276,6.9225795721639859e+276,9.8685778444336981e+276,1.4068285912269115e+277,2.0055237099941729e+277,2.8590017123841997e+277,4.0756889338593438e+277,5.810154017617201e+277,8.2827444037706134e+277,1.1807579394655791e+278,1.6832456051357968e+278,2.3995737589461876e+278,3.4207451408486589e+278,4.8764899495227914e+278,6.9517468413028678e+278,9.910157643264212e+278,1.4127560562309219e+279,2.0139736886766049e+279,2.8710476948888935e+279,4.0928612487198691e+279,5.8346342455732117e+279,8.3176425270373766e+279,1.1857328890850457e+280,1.6903377125041617e+280,2.4096840094555804e+280,3.4351579465287627e+280,4.8970363214825614e+280,6.9810370024331177e+280,9.9519126324523664e+280,1.4187084957356068e+281,2.0224592700995276e+281,2.8831444313658344e+281,4.1101059165986322e+281,5.8592176173630981e+281,8.3526876884050599e+281,1.1907287999217857e+282,1.6974597014220587e+282,2.4198368580159736e+282,3.4496314784421927e+282,4.9176692625535317e+282,7.0104505733420349e+282,9.9938435501357924e+282,1.4246860149671847e+283,2.0309806042696135e+283,2.8952921356600633e+283,4.1274232423453514e+283,5.8839045675675366e+283,8.3878805073960845e+283,1.1957457602927995e+284,1.7046116977909943e+284,2.4300324841079792e+284,3.4641659924499867e+284,4.9383891374818994e+284,7.0399880739985394e+284,1.0035951137563289e+285,1.4306887195953901e+285,2.0395378418257959e+285,2.9074910225166414e+285,4.1448135320927803e+285,5.9086955326002565e+285,8.4232216061460017e+285,1.2007838588870623e+286,1.7117938280427478e+286,2.4402710679684243e+286,3.4787617454912141e+286,4.9591963125506633e+286,7.0696500265623643e+286,1.0078236139106793e+287,1.4367167157351814e+287,2.0481311340417021e+287,2.9197413075857543e+287,4.1622770932639875e+287,5.9335909507117441e+287,8.4587116094087758e+287,1.2058431847676368e+288,1.7190062191423841e+288,2.4505527905932584e+288,3.4934189955871235e+288,4.9800911555855392e+288,7.0994369553932881e+288,1.0120699302274543e+289,1.4427701099486162e+289,2.0567606328283291e+289,2.9320432074261984e+289,4.1798142345773211e+289,5.9585912619996572e+289,8.4943511445716317e+289,1.2109238273724296e+290,1.7262489985893334e+290,2.4608778337418675e+290,3.5081380018472892e+290,5.0010740359637162e+290,7.1293493870595862e+290,1.0163341377723142e+291,1.4488490092467361e+291,2.0654264907367286e+291,2.9443969395092085e+291,4.1974252660518696e+291,5.9836969084159405e+291,8.530140841665204e+291,1.2160258765163179e+292,1.7335222944204192e+292,2.4712463799386174e+292,3.5229190244718126e+292,5.0221453246170055e+292,7.1593878503505898e+292,1.0206163119275434e+293,1.4549535210912921e+293,2.0741288609604678e+293,2.956802722222302e+293,4.2151104990129419e+293,6.0089083337746397e+293,8.5660813333746619e+293,1.2211494223926002e+294,1.7408262352119309e+294,2.4816586124771921e+294,3.537762324757509e+294,5.0433053940406485e+294,7.1895528762811679e+294,1.0249165283926925e+295,1.4610837533973064e+295,2.082867897339279e+295,2.9692607748728029e+295,4.2328702460970877e+295,6.0342259837590582e+295,8.6021732550509034e+295,1.2262945555745914e+296,1.7481609500818937e+296,2.4921147154235567e+296,3.5526681651021284e+296,5.0645546182993419e+296,7.2198449981043581e+296,1.0292348631863761e+297,1.4672398145339886e+297,2.0916437543603696e+297,2.9817713176930668e+297,4.2507048212595495e+297,6.0596503059323771e+297,8.638417244720803e+297,1.2314613670170839e+298,1.7555265686923542e+298,2.5026148736192115e+298,3.5676368090089952e+298,5.0858933730338476e+298,7.2502647513199786e+298,1.033571392647502e+299,1.473421813327311e+299,2.1004565871620908e+299,2.994334571842353e+299,4.26861453977693e+299,6.0851817497414648e+299,8.6748139431024116e+299,1.2366499480585142e+300,1.7629232212514687e+300,2.5131592726841724e+300,3.5826685210916663e+300,5.1073220354676354e+300,7.2808126736840979e+300,1.0379261934366211e+301,1.4796298590617688e+301,2.1093065515364466e+301,3.0069507594120805e+301,4.2865997182546831e+301,6.1108207665275495e+301,8.7113639936104049e+301,1.2418603904217404e+302,1.7703510385166089e+302,2.5237480990213961e+302,3.5977635670781999e+302,5.1288409844129664e+302,7.3114893052185401e+302,1.0422993425372819e+303,1.485864061482311e+303,2.118193803931848e+303,3.0196201034294185e+303,4.3046606746322364e+303,6.136567809533523e+303,8.7480680423713746e+303,1.2470927862162211e+304,1.7778101517954719e+304,2.5343815398183632e+304,3.612922213817486e+304,5.1504506002799228e+304,7.342295188219597e+304,1.0466909172572729e+305,1.4921245307961115e+305,2.1271185014558782e+305,3.0323428278612263e+305,4.3227977281886045e+305,6.1624233339119476e+305,8.7849267382342724e+305,1.2523472279395044e+306,1.7853006929492008e+306,2.5450597830515269e+306,3.6281447292815188e+306,5.1721512650796383e+306,7.3732308672709508e+306,1.0511009952304644e+307,1.498411377675194e+307,2.1360808018778267e+307,3.0451191576176708e+307,4.341011199548041e+307,6.1883877967331033e+307,8.821940732781878e+307,1.2576238084788633e+308,1.7928227943945155e+308]}

},{}],111:[function(require,module,exports){
module.exports={"expected":[-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,-0.9999999999999999,-0.9999999999999999,-0.9999999999999997,-0.9999999999999994,-0.9999999999999988,-0.9999999999999976,-0.999999999999995,-0.9999999999999898,-0.9999999999999792,-0.9999999999999579,-0.9999999999999144,-0.999999999999826,-0.9999999999996462,-0.9999999999992808,-0.9999999999985378,-0.9999999999970275,-0.9999999999939571,-0.999999999987715,-0.9999999999750252,-0.9999999999492274,-0.9999999998967816,-0.9999999997901619,-0.9999999995734089,-0.9999999991327603,-0.9999999982369423,-0.9999999964157863,-0.9999999927134615,-0.9999999851868087,-0.999999969885476,-0.9999999387785837,-0.9999998755397289,-0.9999997469780998,-0.999999485618331,-0.9999989542861658,-0.999997874112767,-0.9999956781708538,-0.9999912139238244,-0.9999821383187651,-0.9999636880388739,-0.9999261794842557,-0.9998499263500022,-0.9996949073005448,-0.9993797608356809,-0.9987390828373078,-0.9974366144825484,-0.9947887573383086,-0.9894057878168747,-0.9784624629733415,-0.9562151962640939,-0.9109875453345073,-0.8190418499220337,-0.6321205588285577],"x":[-709.78,-709.0705105105105,-708.361021021021,-707.6515315315315,-706.9420420420421,-706.2325525525525,-705.5230630630631,-704.8135735735735,-704.1040840840841,-703.3945945945947,-702.6851051051051,-701.9756156156157,-701.2661261261261,-700.5566366366367,-699.8471471471471,-699.1376576576577,-698.4281681681682,-697.7186786786787,-697.0091891891892,-696.2996996996997,-695.5902102102102,-694.8807207207208,-694.1712312312312,-693.4617417417418,-692.7522522522522,-692.0427627627628,-691.3332732732732,-690.6237837837838,-689.9142942942943,-689.2048048048048,-688.4953153153153,-687.7858258258258,-687.0763363363363,-686.3668468468469,-685.6573573573573,-684.9478678678679,-684.2383783783783,-683.5288888888889,-682.8193993993993,-682.1099099099099,-681.4004204204205,-680.6909309309309,-679.9814414414415,-679.2719519519519,-678.5624624624625,-677.852972972973,-677.1434834834835,-676.433993993994,-675.7245045045045,-675.015015015015,-674.3055255255256,-673.596036036036,-672.8865465465466,-672.177057057057,-671.4675675675676,-670.758078078078,-670.0485885885886,-669.3390990990991,-668.6296096096096,-667.9201201201201,-667.2106306306306,-666.5011411411411,-665.7916516516517,-665.0821621621621,-664.3726726726727,-663.6631831831832,-662.9536936936937,-662.2442042042042,-661.5347147147147,-660.8252252252253,-660.1157357357357,-659.4062462462463,-658.6967567567567,-657.9872672672673,-657.2777777777778,-656.5682882882883,-655.8587987987988,-655.1493093093093,-654.4398198198198,-653.7303303303303,-653.0208408408408,-652.3113513513514,-651.6018618618618,-650.8923723723724,-650.1828828828828,-649.4733933933934,-648.763903903904,-648.0544144144144,-647.344924924925,-646.6354354354354,-645.925945945946,-645.2164564564565,-644.506966966967,-643.7974774774775,-643.087987987988,-642.3784984984985,-641.669009009009,-640.9595195195195,-640.2500300300301,-639.5405405405405,-638.8310510510511,-638.1215615615615,-637.4120720720721,-636.7025825825826,-635.9930930930931,-635.2836036036036,-634.5741141141141,-633.8646246246246,-633.1551351351351,-632.4456456456456,-631.7361561561562,-631.0266666666666,-630.3171771771772,-629.6076876876876,-628.8981981981982,-628.1887087087088,-627.4792192192192,-626.7697297297298,-626.0602402402402,-625.3507507507508,-624.6412612612612,-623.9317717717718,-623.2222822822823,-622.5127927927928,-621.8033033033033,-621.0938138138138,-620.3843243243243,-619.6748348348349,-618.9653453453453,-618.2558558558559,-617.5463663663663,-616.8368768768769,-616.1273873873874,-615.4178978978979,-614.7084084084084,-613.9989189189189,-613.2894294294294,-612.5799399399399,-611.8704504504504,-611.160960960961,-610.4514714714715,-609.741981981982,-609.0324924924925,-608.323003003003,-607.6135135135136,-606.904024024024,-606.1945345345346,-605.485045045045,-604.7755555555556,-604.066066066066,-603.3565765765766,-602.6470870870871,-601.9375975975976,-601.2281081081081,-600.5186186186186,-599.8091291291291,-599.0996396396397,-598.3901501501501,-597.6806606606607,-596.9711711711711,-596.2616816816817,-595.5521921921921,-594.8427027027027,-594.1332132132133,-593.4237237237237,-592.7142342342343,-592.0047447447447,-591.2952552552553,-590.5857657657658,-589.8762762762763,-589.1667867867868,-588.4572972972973,-587.7478078078078,-587.0383183183184,-586.3288288288288,-585.6193393393394,-584.9098498498498,-584.2003603603604,-583.4908708708708,-582.7813813813814,-582.0718918918919,-581.3624024024024,-580.6529129129129,-579.9434234234234,-579.2339339339339,-578.5244444444445,-577.8149549549549,-577.1054654654655,-576.395975975976,-575.6864864864865,-574.976996996997,-574.2675075075075,-573.5580180180181,-572.8485285285285,-572.1390390390391,-571.4295495495495,-570.7200600600601,-570.0105705705706,-569.3010810810811,-568.5915915915916,-567.8821021021021,-567.1726126126126,-566.4631231231231,-565.7536336336336,-565.0441441441442,-564.3346546546546,-563.6251651651652,-562.9156756756756,-562.2061861861862,-561.4966966966967,-560.7872072072072,-560.0777177177177,-559.3682282282282,-558.6587387387387,-557.9492492492493,-557.2397597597597,-556.5302702702703,-555.8207807807808,-555.1112912912913,-554.4018018018018,-553.6923123123123,-552.9828228228229,-552.2733333333333,-551.5638438438439,-550.8543543543543,-550.1448648648649,-549.4353753753754,-548.7258858858859,-548.0163963963964,-547.3069069069069,-546.5974174174174,-545.8879279279279,-545.1784384384384,-544.468948948949,-543.7594594594594,-543.04996996997,-542.3404804804804,-541.630990990991,-540.9215015015016,-540.212012012012,-539.5025225225226,-538.793033033033,-538.0835435435436,-537.374054054054,-536.6645645645646,-535.9550750750751,-535.2455855855856,-534.5360960960961,-533.8266066066066,-533.1171171171171,-532.4076276276277,-531.6981381381381,-530.9886486486487,-530.2791591591591,-529.5696696696697,-528.8601801801802,-528.1506906906907,-527.4412012012012,-526.7317117117117,-526.0222222222222,-525.3127327327327,-524.6032432432432,-523.8937537537538,-523.1842642642642,-522.4747747747748,-521.7652852852852,-521.0557957957958,-520.3463063063064,-519.6368168168168,-518.9273273273274,-518.2178378378378,-517.5083483483484,-516.7988588588588,-516.0893693693694,-515.3798798798799,-514.6703903903904,-513.9609009009009,-513.2514114114114,-512.5419219219219,-511.8324324324324,-511.1229429429429,-510.4134534534534,-509.703963963964,-508.9944744744745,-508.284984984985,-507.5754954954955,-506.866006006006,-506.1565165165165,-505.44702702702705,-504.73753753753755,-504.02804804804805,-503.31855855855855,-502.60906906906905,-501.89957957957955,-501.1900900900901,-500.4806006006006,-499.7711111111111,-499.0616216216216,-498.3521321321321,-497.64264264264267,-496.93315315315317,-496.2236636636637,-495.5141741741742,-494.8046846846847,-494.0951951951952,-493.38570570570573,-492.67621621621623,-491.96672672672673,-491.25723723723723,-490.54774774774774,-489.83825825825824,-489.1287687687688,-488.4192792792793,-487.7097897897898,-487.0003003003003,-486.2908108108108,-485.5813213213213,-484.87183183183186,-484.16234234234236,-483.45285285285286,-482.74336336336336,-482.03387387387386,-481.32438438438436,-480.6148948948949,-479.9054054054054,-479.1959159159159,-478.4864264264264,-477.7769369369369,-477.0674474474474,-476.357957957958,-475.6484684684685,-474.938978978979,-474.2294894894895,-473.52,-472.8105105105105,-472.10102102102104,-471.39153153153154,-470.68204204204204,-469.97255255255254,-469.26306306306304,-468.5535735735736,-467.8440840840841,-467.1345945945946,-466.4251051051051,-465.7156156156156,-465.0061261261261,-464.29663663663666,-463.58714714714716,-462.87765765765766,-462.16816816816817,-461.45867867867867,-460.74918918918917,-460.0396996996997,-459.3302102102102,-458.6207207207207,-457.9112312312312,-457.2017417417417,-456.49225225225223,-455.7827627627628,-455.0732732732733,-454.3637837837838,-453.6542942942943,-452.9448048048048,-452.2353153153153,-451.52582582582585,-450.81633633633635,-450.10684684684685,-449.39735735735735,-448.68786786786785,-447.97837837837835,-447.2688888888889,-446.5593993993994,-445.8499099099099,-445.1404204204204,-444.4309309309309,-443.7214414414414,-443.01195195195197,-442.3024624624625,-441.592972972973,-440.8834834834835,-440.173993993994,-439.46450450450453,-438.75501501501503,-438.04552552552553,-437.33603603603603,-436.62654654654654,-435.91705705705704,-435.2075675675676,-434.4980780780781,-433.7885885885886,-433.0790990990991,-432.3696096096096,-431.6601201201201,-430.95063063063066,-430.24114114114116,-429.53165165165166,-428.82216216216216,-428.11267267267266,-427.40318318318316,-426.6936936936937,-425.9842042042042,-425.2747147147147,-424.5652252252252,-423.8557357357357,-423.1462462462462,-422.4367567567568,-421.7272672672673,-421.0177777777778,-420.3082882882883,-419.5987987987988,-418.8893093093093,-418.17981981981984,-417.47033033033034,-416.76084084084084,-416.05135135135134,-415.34186186186184,-414.63237237237234,-413.9228828828829,-413.2133933933934,-412.5039039039039,-411.7944144144144,-411.0849249249249,-410.37543543543546,-409.66594594594596,-408.95645645645646,-408.24696696696697,-407.53747747747747,-406.82798798798797,-406.1184984984985,-405.409009009009,-404.6995195195195,-403.99003003003,-403.2805405405405,-402.57105105105103,-401.8615615615616,-401.1520720720721,-400.4425825825826,-399.7330930930931,-399.0236036036036,-398.3141141141141,-397.60462462462465,-396.89513513513515,-396.18564564564565,-395.47615615615615,-394.76666666666665,-394.05717717717715,-393.3476876876877,-392.6381981981982,-391.9287087087087,-391.2192192192192,-390.5097297297297,-389.8002402402402,-389.0907507507508,-388.3812612612613,-387.6717717717718,-386.9622822822823,-386.2527927927928,-385.5433033033033,-384.83381381381383,-384.12432432432433,-383.41483483483483,-382.70534534534534,-381.99585585585584,-381.2863663663664,-380.5768768768769,-379.8673873873874,-379.1578978978979,-378.4484084084084,-377.7389189189189,-377.02942942942946,-376.31993993993996,-375.61045045045046,-374.90096096096096,-374.19147147147146,-373.48198198198196,-372.7724924924925,-372.063003003003,-371.3535135135135,-370.644024024024,-369.9345345345345,-369.225045045045,-368.5155555555556,-367.8060660660661,-367.0965765765766,-366.3870870870871,-365.6775975975976,-364.9681081081081,-364.25861861861864,-363.54912912912914,-362.83963963963964,-362.13015015015014,-361.42066066066064,-360.71117117117115,-360.0016816816817,-359.2921921921922,-358.5827027027027,-357.8732132132132,-357.1637237237237,-356.4542342342342,-355.74474474474476,-355.03525525525527,-354.32576576576577,-353.61627627627627,-352.90678678678677,-352.1972972972973,-351.4878078078078,-350.7783183183183,-350.0688288288288,-349.35933933933933,-348.64984984984983,-347.9403603603604,-347.2308708708709,-346.5213813813814,-345.8118918918919,-345.1024024024024,-344.3929129129129,-343.68342342342345,-342.97393393393395,-342.26444444444445,-341.55495495495495,-340.84546546546545,-340.13597597597595,-339.4264864864865,-338.716996996997,-338.0075075075075,-337.298018018018,-336.5885285285285,-335.879039039039,-335.1695495495496,-334.4600600600601,-333.7505705705706,-333.0410810810811,-332.3315915915916,-331.6221021021021,-330.91261261261263,-330.20312312312313,-329.49363363363364,-328.78414414414414,-328.07465465465464,-327.36516516516514,-326.6556756756757,-325.9461861861862,-325.2366966966967,-324.5272072072072,-323.8177177177177,-323.10822822822826,-322.39873873873876,-321.68924924924926,-320.97975975975976,-320.27027027027026,-319.56078078078076,-318.8512912912913,-318.1418018018018,-317.4323123123123,-316.7228228228228,-316.0133333333333,-315.3038438438438,-314.5943543543544,-313.8848648648649,-313.1753753753754,-312.4658858858859,-311.7563963963964,-311.0469069069069,-310.33741741741744,-309.62792792792794,-308.91843843843844,-308.20894894894894,-307.49945945945944,-306.78996996996995,-306.0804804804805,-305.370990990991,-304.6615015015015,-303.952012012012,-303.2425225225225,-302.533033033033,-301.82354354354356,-301.11405405405407,-300.40456456456457,-299.69507507507507,-298.98558558558557,-298.27609609609607,-297.5666066066066,-296.8571171171171,-296.1476276276276,-295.43813813813813,-294.72864864864863,-294.0191591591592,-293.3096696696697,-292.6001801801802,-291.8906906906907,-291.1812012012012,-290.4717117117117,-289.76222222222225,-289.05273273273275,-288.34324324324325,-287.63375375375375,-286.92426426426425,-286.21477477477475,-285.5052852852853,-284.7957957957958,-284.0863063063063,-283.3768168168168,-282.6673273273273,-281.9578378378378,-281.2483483483484,-280.5388588588589,-279.8293693693694,-279.1198798798799,-278.4103903903904,-277.7009009009009,-276.99141141141143,-276.28192192192193,-275.57243243243244,-274.86294294294294,-274.15345345345344,-273.44396396396394,-272.7344744744745,-272.024984984985,-271.3154954954955,-270.606006006006,-269.8965165165165,-269.187027027027,-268.47753753753756,-267.76804804804806,-267.05855855855856,-266.34906906906906,-265.63957957957956,-264.9300900900901,-264.2206006006006,-263.5111111111111,-262.8016216216216,-262.0921321321321,-261.3826426426426,-260.6731531531532,-259.9636636636637,-259.2541741741742,-258.5446846846847,-257.8351951951952,-257.1257057057057,-256.41621621621624,-255.7067267267267,-254.99723723723724,-254.28774774774774,-253.57825825825824,-252.86876876876877,-252.15927927927927,-251.44978978978978,-250.7403003003003,-250.0308108108108,-249.32132132132134,-248.61183183183184,-247.90234234234234,-247.19285285285287,-246.48336336336337,-245.77387387387387,-245.0643843843844,-244.3548948948949,-243.6454054054054,-242.93591591591593,-242.22642642642643,-241.51693693693693,-240.80744744744746,-240.09795795795796,-239.38846846846846,-238.678978978979,-237.9694894894895,-237.26,-236.55051051051052,-235.84102102102102,-235.13153153153152,-234.42204204204205,-233.71255255255255,-233.00306306306305,-232.29357357357358,-231.58408408408408,-230.87459459459458,-230.1651051051051,-229.4556156156156,-228.74612612612611,-228.03663663663664,-227.32714714714714,-226.61765765765765,-225.90816816816817,-225.19867867867868,-224.48918918918918,-223.7796996996997,-223.0702102102102,-222.3607207207207,-221.65123123123124,-220.94174174174174,-220.23225225225227,-219.52276276276277,-218.81327327327327,-218.1037837837838,-217.3942942942943,-216.6848048048048,-215.97531531531533,-215.26582582582583,-214.55633633633633,-213.84684684684686,-213.13735735735736,-212.42786786786786,-211.7183783783784,-211.0088888888889,-210.2993993993994,-209.58990990990992,-208.88042042042042,-208.17093093093092,-207.46144144144145,-206.75195195195195,-206.04246246246245,-205.33297297297298,-204.62348348348348,-203.91399399399398,-203.2045045045045,-202.495015015015,-201.78552552552551,-201.07603603603604,-200.36654654654654,-199.65705705705705,-198.94756756756757,-198.23807807807808,-197.52858858858858,-196.8190990990991,-196.1096096096096,-195.4001201201201,-194.69063063063064,-193.98114114114114,-193.27165165165164,-192.56216216216217,-191.85267267267267,-191.1431831831832,-190.4336936936937,-189.7242042042042,-189.01471471471473,-188.30522522522523,-187.59573573573573,-186.88624624624626,-186.17675675675676,-185.46726726726726,-184.7577777777778,-184.0482882882883,-183.3387987987988,-182.62930930930932,-181.91981981981982,-181.21033033033032,-180.50084084084085,-179.79135135135135,-179.08186186186185,-178.37237237237238,-177.66288288288288,-176.95339339339338,-176.2439039039039,-175.5344144144144,-174.82492492492491,-174.11543543543544,-173.40594594594594,-172.69645645645645,-171.98696696696697,-171.27747747747748,-170.56798798798798,-169.8584984984985,-169.149009009009,-168.4395195195195,-167.73003003003004,-167.02054054054054,-166.31105105105104,-165.60156156156157,-164.89207207207207,-164.18258258258257,-163.4730930930931,-162.7636036036036,-162.05411411411413,-161.34462462462463,-160.63513513513513,-159.92564564564566,-159.21615615615616,-158.50666666666666,-157.7971771771772,-157.0876876876877,-156.3781981981982,-155.66870870870872,-154.95921921921922,-154.24972972972972,-153.54024024024025,-152.83075075075075,-152.12126126126125,-151.41177177177178,-150.70228228228228,-149.99279279279278,-149.2833033033033,-148.5738138138138,-147.86432432432431,-147.15483483483484,-146.44534534534534,-145.73585585585585,-145.02636636636637,-144.31687687687688,-143.60738738738738,-142.8978978978979,-142.1884084084084,-141.4789189189189,-140.76942942942944,-140.05993993993994,-139.35045045045044,-138.64096096096097,-137.93147147147147,-137.22198198198197,-136.5124924924925,-135.803003003003,-135.0935135135135,-134.38402402402403,-133.67453453453453,-132.96504504504506,-132.25555555555556,-131.54606606606606,-130.8365765765766,-130.1270870870871,-129.4175975975976,-128.70810810810812,-127.99861861861862,-127.28912912912912,-126.57963963963964,-125.87015015015015,-125.16066066066067,-124.45117117117117,-123.74168168168168,-123.0321921921922,-122.3227027027027,-121.61321321321321,-120.90372372372373,-120.19423423423423,-119.48474474474475,-118.77525525525526,-118.06576576576576,-117.35627627627628,-116.64678678678679,-115.93729729729729,-115.2278078078078,-114.51831831831832,-113.80882882882882,-113.09933933933934,-112.38984984984985,-111.68036036036035,-110.97087087087087,-110.26138138138138,-109.5518918918919,-108.8424024024024,-108.13291291291291,-107.42342342342343,-106.71393393393393,-106.00444444444445,-105.29495495495496,-104.58546546546546,-103.87597597597598,-103.16648648648649,-102.45699699699699,-101.7475075075075,-101.03801801801802,-100.32852852852852,-99.61903903903904,-98.90954954954955,-98.20006006006005,-97.49057057057057,-96.78108108108108,-96.0715915915916,-95.3621021021021,-94.65261261261261,-93.94312312312313,-93.23363363363363,-92.52414414414415,-91.81465465465466,-91.10516516516516,-90.39567567567568,-89.68618618618619,-88.97669669669669,-88.2672072072072,-87.55771771771772,-86.84822822822822,-86.13873873873874,-85.42924924924925,-84.71975975975975,-84.01027027027027,-83.30078078078078,-82.59129129129128,-81.8818018018018,-81.17231231231231,-80.46282282282283,-79.75333333333333,-79.04384384384385,-78.33435435435436,-77.62486486486486,-76.91537537537538,-76.20588588588589,-75.49639639639639,-74.7869069069069,-74.07741741741742,-73.36792792792792,-72.65843843843844,-71.94894894894895,-71.23945945945945,-70.52996996996997,-69.82048048048048,-69.11099099099098,-68.4015015015015,-67.69201201201201,-66.98252252252253,-66.27303303303303,-65.56354354354355,-64.85405405405406,-64.14456456456456,-63.435075075075076,-62.725585585585584,-62.0160960960961,-61.30660660660661,-60.597117117117115,-59.88762762762763,-59.17813813813814,-58.468648648648646,-57.75915915915916,-57.04966966966967,-56.34018018018018,-55.63069069069069,-54.9212012012012,-54.211711711711715,-53.50222222222222,-52.79273273273273,-52.083243243243246,-51.37375375375375,-50.66426426426426,-49.954774774774776,-49.245285285285284,-48.5357957957958,-47.82630630630631,-47.116816816816815,-46.40732732732733,-45.69783783783784,-44.988348348348346,-44.27885885885886,-43.56936936936937,-42.85987987987988,-42.15039039039039,-41.4409009009009,-40.731411411411415,-40.02192192192192,-39.31243243243243,-38.602942942942946,-37.89345345345345,-37.18396396396396,-36.474474474474476,-35.764984984984984,-35.05549549549549,-34.34600600600601,-33.636516516516515,-32.92702702702703,-32.21753753753754,-31.50804804804805,-30.798558558558558,-30.08906906906907,-29.37957957957958,-28.67009009009009,-27.9606006006006,-27.25111111111111,-26.541621621621623,-25.83213213213213,-25.122642642642642,-24.413153153153154,-23.703663663663665,-22.994174174174173,-22.284684684684684,-21.575195195195196,-20.865705705705707,-20.156216216216215,-19.446726726726727,-18.737237237237238,-18.027747747747746,-17.318258258258258,-16.60876876876877,-15.899279279279279,-15.18978978978979,-14.4803003003003,-13.770810810810811,-13.061321321321321,-12.351831831831833,-11.642342342342342,-10.932852852852854,-10.223363363363363,-9.513873873873873,-8.804384384384385,-8.094894894894894,-7.385405405405406,-6.675915915915916,-5.966426426426427,-5.2569369369369365,-4.547447447447447,-3.837957957957958,-3.1284684684684683,-2.418978978978979,-1.7094894894894894,-1.0]}

},{}],112:[function(require,module,exports){
module.exports={"expected":[1.718281828459045,4.526139605036564,10.234382915941184,21.838974134305474,45.430564403080524,93.3911621472732,190.89281039456188,389.1090933033613,792.0735099718115,1611.2812900695583,3276.692326907691,6662.394939853256,13545.369730911094,27538.1350119472,55984.77126354929,113815.45003064431,231382.5105815943,470390.8366338771,956283.5658950494,1.9440807202804782e6,3.952226056588822e6,8.034691443164972e6,1.6334152309494097e7,3.320656741881039e7,6.7507396858952e7,1.3723937610785338e8,2.79001222959248e8,5.671964160282148e8,1.1530837415166144e9,2.3441652252587843e9,4.765578079224924e9,9.688196967507166e9,1.969565054139165e10,4.004033480525908e10,8.140012475987735e10,1.654826400205472e11,3.364184542574713e11,6.839229562131511e11,1.390383328011468e12,2.8265841660226807e12,5.746313183311399e12,1.168198548538473e13,2.3748929187686773e13,4.828046039497157e13,9.81519140306735e13,1.9953824278129853e14,4.056518991550718e14,8.246713060837882e14,1.6765181292001182e15,3.408282811347275e15,6.928879276520302e15,1.4086086949343948e16,2.86363548311272e16,5.821636775090438e16,1.1835114818540298e17,2.4060233947841443e17,4.891332838765486e17,9.943850500976485e17,2.0215382196466348e18,4.10969249094277e18,8.354812293909443e18,1.698494196835819e19,3.4529591272660636e19,7.019704133686012e19,1.4270729628793422e20,2.9011724747889538e20,5.8979477205502604e20,1.1990251395472278e21,2.437561934055444e21,4.955449211515154e21,1.0074196082907584e22,2.0480368657807375e22,4.163562997064869e22,8.46432850900819e22,1.7207583302790374e23,3.498221067475627e23,7.111719537598167e23,1.4457792634000888e24,2.939201507352518e24,5.975258962081781e24,1.2147421527453798e25,2.4695138855410728e25,5.0204060319280825e25,1.020625025556297e26,2.0748828604042807e26,4.218139646392603e26,8.575280280161115e26,1.743314305542441e27,3.544076308432735e27,7.204941094133833e27,1.464730769098349e28,2.97772903055404e28,6.053583611725806e28,1.2306651870649697e29,2.5018846683144406e29,5.0862143167265915e29,1.0340035415422764e30,2.102080756616804e30,4.273431695164021e30,8.687686424866277e30,1.7661659481352722e31,3.5905326272184534e31,7.2993846137344085e31,1.4839306941627655e32,3.0167615786884446e32,6.1329349533978755e32,1.2467969430637725e33,2.534679772482983e33,5.152885227041958e33,1.0475574252544317e34,2.1296351672005585e34,4.32944852094939e34,8.801566007284992e34,1.7893171337121245e35,3.637597902857043e35,7.395066114087081e35,1.503382294914111e36,3.056305771703304e36,6.213326445141211e36,1.2631401566989335e37,2.5679047601193956e37,5.220430070307349e37,1.0612889754409135e38,2.1575507654029278e38,4.386199624241668e38,8.916938341474034e38,1.8127717887303275e39,3.6852801176522753e39,7.492001822841556e39,1.5230888703575218e40,3.0963683163215003e40,6.294771721409309e40,1.2796975997909523e41,2.6015652662048933e41,5.288860302175652e41,1.0752005209822831e42,2.1858322857289538e42,4.4436946300677905e42,9.033822994662357e42,1.83653389111583e43,3.733587358541237e43,7.590208180361837e43,1.5430537627420194e44,3.1369560071787094e44,6.3772845953779945e44,1.2964720804937949e45,2.6356669995849262e45,5.358187528462056e45,1.0892944212864251e46,2.2144845247443276e46,4.501943289621154e46,9.15223979056915e46,1.8606074709378684e47,3.78252781846593e47,7.689701842515174e47,1.5632803581273612e48,3.17807572797578e48,6.460879061288674e48,1.313466443771158e49,2.6702157439374034e49,5.428423507112857e49,1.1035730666887203e50,2.24351234188889e50,4.5609554819151595e50,9.272208812766088e50,1.8849966110924724e51,3.832109797762591e51,7.790499683496476e51,1.5837720869583161e52,3.219734452646256e52,6.54556929682142e52,1.330683571878978e53,2.705217358753646e53,5.499580150199315e53,1.1180388788574473e54,2.2729206603008283e54,4.6207412154590904e54,9.393750408083512e54,1.9097054479949248e55,3.882341705569751e55,7.892618798690413e55,1.6045324246464722e56,3.261939246538981e56,6.631369665499698e56,1.348126384854262e57,2.74067778033201e57,5.571669525938102e57,1.1326943112044998e58,2.3027144676515153e58,4.681310629955237e58,9.516885190061268e58,1.9347381722813283e59,3.933232061254162e59,7.996076507570235e59,1.6255648921596907e60,3.3046972676166096e60,6.718294719125951e60,1.365797841010349e61,2.7766030227848744e61,5.644703860737691e61,1.1475418493015033e62,2.3328988169915814e62,4.742673998018997e62,9.641634042444913e62,1.9600990295192038e63,3.984789495856024e63,8.10089035663641e63,1.6468730566191503e64,3.3480157676696593e64,6.806359200250649e64,1.3837009374385438e65,2.8129991790586834e65,5.7186955412728235e65,1.162584011301288e66,2.3634788276079526e66,4.804841726920517e66,9.768018122726928e66,1.985792320927844e67,4.03702275355231e67,8.207078122390827e67,1.6684605319045866e68,3.391902093546041e68,6.895578044671195e68,1.4018387105166406e69,2.8498724219670017e69,5.793657116584114e69,1.1778233483651491e70,2.394459685891821e70,4.867824360350101e70,9.896058865736563e70,2.0118224041073873e71,4.0899406931400593e71,8.314657814353527e71,1.6903309792668612e72,3.4363636883973177e72,6.9859663839665905e72,1.4202142364236007e73,2.887229005237616e73,5.869601300207659e73,1.1932624450952784e74,2.42584664621842e74,4.931632580206846e74,1.002577798727311e75,2.0381936937783186e75,4.143552289539186e75,8.42364767811528e75,1.712488107949287e76,3.4814080929413676e76,7.077539548062208e76,1.438830631661591e77,2.925075264573424e77,5.946540972329955e77,1.2089039199733817e78,2.457645031838381e78,4.99627720840933e78,1.0157197487791164e79,2.064910662529813e79,4.197866635313822e79,8.534066198433931e79,1.7349356758163888e80,3.5270429467406087e80,7.170313067831331e80,1.4576910535842666e81,2.963417618726397e81,6.024489181973714e81,1.22475042580454e82,2.489860235780077e82,5.0617692087321384e82,1.0290339656129946e83,2.0919778415784573e83,4.2528929422153574e83,8.645932102367514e83,1.7576774899913759e84,3.573275989498466e84,7.2643026777276e84,1.4767987009323769e85,3.0022625705868714e85,6.1034591492096444e85,1.2408046501672253e86,2.522497721764841e86,5.128119688664192e86,1.0425227073294325e87,2.1193998215369277e87,4.308640542743812e87,8.75926436245232e87,1.780717407501989e88,3.620115062371228e88,7.359524318455214e88,1.4961568143764023e89,3.041616708285768e89,6.183464267399944e89,1.257069315869224e90,2.5555630251330543e90,5.19533990129373e90,1.0561882616285486e91,2.1471812531921466e91,4.365118891731594e91,8.874082199918935e91,1.8040593359343038e92,3.667568109298722e92,7.455994139671046e92,1.515768677065881e93,3.081486706312625e93,6.26451810546862e93,1.2735471814091809e94,2.589061753783512e94,5.263441247215839e94,1.0700329461978809e95,2.175326848294537e95,4.422337567946199e95,8.990405087952898e95,1.8277072340958613e96,3.7156431783507973e96,7.553728502724248e96,1.5356376151865715e97,3.1218793266469087e97,6.346634410203303e97,1.2902410414447245e98,2.622999589123952e98,5.3324352764664166e98,1.084059109105707e99,2.203841380356653e99,4.480306275715133e99,9.108252754998148e99,1.8516651126866795e100,3.764348423093105e100,7.652743983431797e100,1.5557669985242334e101,3.1628014199055456e101,6.429827108587249e101,1.3071537272661575e102,2.657382287035208e102,5.402333690481535e102,1.098269129199036e103,2.232729685463264e103,4.539034846572159e103,9.227645188101187e103,1.8759370349798817e104,3.813692103969224e104,7.753057374888264e104,1.5761602410364925e105,3.2042599265041777e105,6.514110310160114e105,1.3242881072769356e106,2.6922156788468976e106,5.47314834408095e106,1.1126654165073082e107,2.2619966630911242e107,4.5985332409238474e107,9.348602636302962e107,1.9005271175104675e108,3.863682589701943e108,7.854685690315661e108,1.5968208014314984e109,3.246261877834521e109,6.599498309412389e109,1.3416470874798563e110,2.7275056723266345e110,5.5448912474799075e110,1.1272504126508899e111,2.2916472769401742e111,4.658811549739753e111,9.471145614071031e111,1.9254395307736332e112,3.9143283587129365e112,7.957646165947374e112,1.617752183754927e113,3.288814397457082e113,6.686005588208288e113,1.359233611970218e114,2.763258252682228e114,5.617574568325011e114,1.1420265912554561e115,2.3216865557751957e115,4.719879996263479e115,9.59529490478094e115,1.9506784999322564e116,3.965638000560055e116,8.061956263951853e116,1.6389579379836778e117,3.33192470230914e117,6.77364681824337e117,1.3770506634348756e118,2.7994794835763174e118,5.691210633758149e118,1.1569964583711044e119,2.3521195942792175e119,4.781748937746276e119,9.721071564239238e119,1.9762483055331612e120,4.01762021739433e120,8.167633675395823e120,1.660441660628777e121,3.3756001039285545e121,6.862436863531553e121,1.3951012636582593e122,2.8361755081549135e122,5.765811932508329e122,1.1721625528979636e123,2.382951553916794e123,4.8444288672040274e123,9.84849692425562e123,2.0021532842332052e124,4.0702838254366636e124,8.27469632324196e124,1.6822069953445675e125,3.419848009694084e125,6.95239078292682e125,1.4133884740347517e126,2.873352550089855e126,5.841391117007843e126,1.1875274470162422e127,2.414187663809912e127,4.907930415196749e127,9.977592596259984e127,2.028397829535178e128,4.123637756471705e128,8.383162365390457e128,1.7042576335470887e129,3.464675924081397e129,7.043523832676614e129,1.4319153960882236e130,2.911016914633378e130,5.917961005539413e130,1.203093746622763e131,2.445833221624588e131,4.972264351631255e131,1.010838047497001e132,2.0549863925322652e132,4.177691059363594e132,8.493050197758171e132,1.7265973150399536e133,3.5100914499366185e133,7.135851469010914e133,1.4506851719975754e134,2.949174989688138e134,5.99553458440986e134,1.2188640917727925e135,2.477893594469907e135,5.037441587588865e135,1.0240882742101137e136,2.0819234826634065e136,4.232452901590427e136,8.604378457398081e136,1.7492298286490129e137,3.5561022897646037e137,7.229389350761227e137,1.4697009851299708e138,2.987833246890437e138,6.074125010152243e138,1.2348411571280708e139,2.5103742198074616e139,5.10347317717425e139,1.0375121870130836e140,2.1092136684779894e140,4.287932570798826e140,8.71716602566211e140,1.7721590128643576e141,3.602716247036072e141,7.324153342017929e141,1.4889660605805753e142,3.02699824270765e142,6.153745611758598e142,1.2510276524100243e143,2.5432806063741e143,5.170370319391335e143,1.0511120626108816e144,2.1368615784105536e144,4.3441394763801005e144,8.83143203140049e144,1.7953887564917197e145,3.649941227510883e145,7.420159514820007e145,1.5084836657198705e146,3.0666766195508886e146,6.234409892938482e146,1.2674263228596097e147,2.576618335116071e147,5.238144360042081e147,1.0648902075520698e148,2.164871901566265e148,4.401083151064634e148,8.947195854207969e148,1.818922999311917e149,3.6977852405786503e149,7.517424151882569e149,1.5282571107472992e150,3.1068751069005364e150,6.316131534410581e150,1.2840399497028416e151,2.610393060135414e151,5.306806793651927e151,1.0788489586196393e152,2.193249388515464e152,4.458773252539607e152,9.06447712771012e152,1.84276573274894e153,3.746256400617978e153,7.615963749355889e153,1.5482897492530123e154,3.147600522448253e154,6.398924396222265e154,1.3008713506224158e155,2.644610509649484e155,5.376369265417497e155,1.0929906832275646e156,2.2219988520998485e156,4.5172195650864526e156,9.183295742892697e156,1.8669210005473165e157,3.7953629283714105e157,7.71579501962484e157,1.5685849787865557e158,3.1888597732529095e158,6.482802520101712e158,1.3179233802358847e159,2.6792764869615816e159,5.44684357318281e159,1.1073177798222621e160,2.2511251682484865e160,4.5764320012412964e160,9.303671851477243e160,1.891392899457311e161,3.8451131523405107e161,7.816934894142907e161,1.5891462414330084e162,3.230659856912751e162,6.5677801318372256e162,1.3351989305793623e163,2.7143968714457814e163,5.5182416694399125e163,1.1218326782893032e164,2.2806332768052872e164,4.636420603474603e164,9.425625869335721e164,1.9161855799301493e165,3.895515510198172e165,7.91940052630332e165,1.6099770243971216e166,3.273007862751117e166,6.653871643691381e166,1.3527009315983085e167,2.7499776195437783e167,5.590575663355707e167,1.1365378403657788e168,2.31052818236604e168,4.697195545895404e168,9.549178479955125e168,1.9413032468217243e169,3.946578550219425e169,8.023209294350087e169,1.6310808605942129e170,3.3159109730195114e170,6.741091656844995e170,1.370432351644298e171,2.786024765775726e171,5.663857822826948e171,1.151435760057432e172,2.340814955127704e172,4.758767135976575e172,9.67435063794436e172,1.9667501601061847e173,3.9983109327321337e173,8.128378804322657e173,1.6524613292497084e174,3.359376464115538e174,6.829454963873107e174,1.388396197978767e175,2.8225444237627626e175,5.738100576558985e175,1.1665289640618956e176,2.3714987317481904e176,4.821145816302722e176,9.801163572590342e176,1.992530635597769e177,4.050721431584448e177,8.234926893043718e177,1.674122056506094e178,3.4034117078167914e178,6.918976551255361e178,1.4065955172825814e179,2.8595427872645075e179,5.813316516174944e179,1.1818200121970919e180,2.402584716217406e180,4.88434216634234e180,9.929638791455218e180,2.0186490456832094e181,4.103818935633747e181,8.342871631143399e181,1.6960667160378143e182,3.4480241725318854e182,7.009671601915408e182,1.4250333961730644e183,2.8970261312293706e183,5.889518398350624e183,1.197311497835647e184,2.434078180740401e184,4.948366904240469e184,1.0059798084026256e185,2.0451098200631826e185,4.157612450253738e185,8.452231326125965e185,1.7182990296747147e186,3.493221424565946e186,7.101555497797475e186,1.443712961727413e187,2.935000812858621e187,5.966719146979375e187,1.2130060483443286e188,2.4659844666307196e188,5.013230888637577e188,1.01916635254108e189,2.0719174465034718e189,4.2121110988627123e189,8.56302452547195e189,1.740822768032692e190,3.5390111294046312e190,7.194643822474773e190,1.462637382012968e191,2.97347327268524e191,6.044931855362001e191,1.2289063255299147e192,2.4983089852168365e192,5.078945120510643e192,1.0325257480079645e193,2.099076471596565e193,4.267324124469481e193,8.675270019785699e193,1.7636417511535762e194,3.585401053013807e194,7.28895236379207e194,1.4818098666248542e195,3.0124500356652437e195,6.124169788428722e195,1.2450150260905728e196,2.5310572187596405e196,5.145520745040073e196,1.046060260566241e197,2.1265915015320573e197,4.3232608912419286e197,8.788986845981806e197,1.7867598491528128e198,3.63239906315747e198,7.384497116544967e198,1.5012336672298316e199,3.051937712284981e199,6.2044463849885845e199,1.2613348820731488e200,2.5642347213828038e200,5.2129690534982155e200,1.0597721856786773e201,2.1544672028783325e201,4.379930886094945e201,8.904194290513277e201,1.8101809828762463e202,3.6800131307309177e202,7.481294285190162e202,1.5209120781181115e203,3.0919429996821137e203,6.285775260008332e203,1.2778686613368105e204,2.597847120013909e204,5.28130148516551e204,1.0736638488973937e205,2.182708303373773e205,4.437343720299169e205,9.020911892644546e205,1.8339091245644888e206,3.728251331113418e206,7.579360286595374e206,1.5408484367619003e207,3.132472682781276e207,6.368170206922942e207,1.2946191680220515e208,2.6319001153393474e208,5.3505296292703145e208,1.0877376062581575e209,2.2113195927290856e209,4.495509131112067e209,9.139159447762329e209,1.8579482985270195e210,3.7771218455376025e210,7.678711752822814e210,1.5610461243817867e211,3.173533635445512e211,6.451645199972873e211,1.3115892430265582e212,2.66639948277102e212,5.420665226954133e212,1.1019958446802146e213,2.2403059234388968e213,4.5544369834278736e213,9.258957010734941e213,1.8823025818246093e214,3.8266329624767894e214,7.77936553395173e214,1.581508566519676e215,3.21513282164103e215,6.536214396575515e215,1.3287817644869588e216,2.7013510734256957e216,5.4917201732641563e216,1.1164409823707446e217,2.2696722116052337e217,4.61413727145169e217,9.380324899312588e217,1.9069761049606857e218,3.876793079051584e218,7.881338700933595e218,1.6022392336201122e219,3.2572772966189957e219,6.621892139725574e219,1.3461996482668792e220,2.7367608151179786e220,5.56370651916883e220,1.1310754692352356e221,2.2994234377711743e221,4.674620120393989e221,9.503283697575388e221,1.9319730525823e222,3.9276107024527366e222,7.984648548488625e222,1.6232416416187814e223,3.299974208111748e223,6.708692960429533e223,1.3638458484517823e224,2.7726347133645956e224,5.6366364736029274e224,1.1459017872928626e225,2.3295646477655507e225,4.735895788188915e225,9.627854259421822e225,1.9572976641892008e226,3.9790944513846064e226,8.089312598040814e226,1.644519352538723e227,3.3432307975459984e227,6.796631580165971e227,1.3817233578494463e228,2.8089788524043332e228,5.7105224055375696e228,1.1609224510977665e229,2.360100953558593e229,4.797974667232731e229,9.754057712104942e229,1.982954234853173e230,4.031253057527815e230,8.195348600684575e230,1.666075975094919e231,3.387054401268909e231,6.885722913387253e231,1.3998352084982448e232,2.8457993962280395e232,5.785376846079627e232,1.1761400081648057e233,2.3910375341293196e233,4.860867286146062e233,9.881915459819952e233,2.0089471159469417e234,4.084095367017649e234,8.30277454020221e234,1.6879151653053035e235,3.431452451794797e235,6.975982070046793e235,1.4181844721804396e236,2.883102589626424e236,5.861212490593431e236,1.1915570394024665e237,2.4223796363437775e237,4.9245843115617444e237,1.0011449187331718e238,2.0352807158809237e238,4.1376303419477996e238,8.411608636106561e238,1.7100406271120468e239,3.476432479064578e239,7.0674243581593165e239,1.4367742609443464e240,2.9208947592466093e240,5.93804220085815e240,1.207176159550201e241,2.4541325758439465e241,4.9891365499325606e241,1.0142680863649048e242,2.061959500852605e242,4.191867061886642e242,8.521869346737586e242,1.7324561130091922e243,3.5220021117216505e243,7.160065286402646e243,1.4556077276308583e244,2.959182314667405e244,6.015879007247236e244,1.2230000176214733e245,2.4863017379511993e245,5.054534949362305e245,1.027563274575745e246,2.08898799560217e246,4.2468147254203966e246,8.633575372390155e246,1.755165424678485e247,3.568169078408484e247,7.253920566741593e247,1.4746880664093015e248,2.9979717494854137e248,6.094736110936308e248,1.239031297353991e249,2.5188925785774396e249,5.1207906014659684e249,1.0410327382390596e250,2.1163707841815245e250,4.3024826517118425e250,8.746745658482649e250,1.7781724136355142e251,3.6149412090742156e251,7.349006117098361e251,1.49401851331869e252,3.0372696424153212e252,6.174626886146859e252,1.255272717663765e253,2.551910625152383e253,5.187914743249224e253,1.0546787617851016e254,2.1441125107310678e254,4.3588802820793664e254,8.861399398776967e254,1.8014809818813485e255,3.6623264363054237e255,7.445338064049854e255,1.5136023468160453e256,3.0770826584080275e256,6.255564882409024e256,1.271727033107215e257,2.5853614775601904e257,5.255918759012445e257,1.0685036595892776e258,2.1722178802666036e258,4.416017181601132e258,8.977556038625909e258,1.8250950825657157e259,3.7103327966703164e259,7.542932745560185e259,1.5334428883336117e260,3.1174175497782846e260,6.337563826864452e260,1.2883970343479316e261,2.6192508090883164e261,5.324814182285606e261,1.0825097763637138e262,2.200691659478766e262,4.4739030407358974e262,9.095235278278092e262,1.8490187206568717e263,3.758968432080457e263,7.641806713757516e263,1.5535435028408049e264,3.158281157352315e264,6.420637626592389e264,1.3052855486295308e265,2.6535843673917588e265,5.3946126977796324e265,1.0966994875557626e266,2.229538677540741e266,4.5325476769649754e266,9.214457076216174e266,1.8732559536202045e267,3.8082415911745856e267,7.741976737734506e267,1.5739075994161213e268,3.1996804116269987e268,6.504800370966105e268,1.3223954402561795e269,2.688367975465496e269,5.465326143372324e269,1.1110751997505245e270,2.258763826926529e270,4.591961036460845e270,9.335241652538658e270,1.897810892107638e271,3.8581606307141965e271,7.84345980639836e271,1.5945386318248098e272,3.2416223339441866e272,6.590066334047568e272,1.3397296110772037e273,2.723607532634162e273,5.536966512114298e273,1.1256393510786237e274,2.288372064242482e274,4.652153195769923e274,9.457609492395469e274,1.9226877006541878e275,3.908734017003849e275,7.946273131349635e275,1.6154400991040821e276,3.284114037684063e276,6.676449977002456e276,1.3572910009802857e277,2.7593090155516903e277,5.60954595426111e277,1.1403944116305984e278,2.318368411065906e278,4.7131343635251814e278,9.581581349459197e278,1.9478905983836035e279,3.959970327325792e279,8.050434149798583e279,1.6366155461578195e280,3.327162729468656e280,6.7639659505579644e280,1.3750825883896315e281,2.795478479214012e281,5.6830767793383383e281,1.1553428838748138e282,2.348757954798527e282,4.774914882175999e282,9.70717824944162e282,1.9734238597254636e283,4.011878251393313e283,8.155960527527913e283,1.6580685643563303e284,3.3707757103866656e284,6.852629097485392e284,1.3931073907706383e285,2.832122057988173e285,5.757571458224227e285,1.1704873030827786e286,2.3795458495285536e286,4.837505229740609e286,9.83442149366729e286,1.9992918151383613e287,4.0644665928271963e287,8.262870161886266e287,1.679802792146737e288,3.4149603772306433e288,6.94245445511512e288,1.4113684651427516e289,2.8692459666502044e289,5.833042625269221e289,1.1858302377587515e290,2.4107373169039982e290,4.900916021586968e290,9.963332662677489e290,2.0254988518459067e291,4.117744270647519e291,8.371181184820777e291,1.7018219156695166e292,3.4597242237503184e292,7.033457257892398e292,1.4298689085966795e293,2.906856501441382e293,5.909503080436877e293,1.2013742900749513e294,2.442337647020157e294,4.9651580122287575e294,1.0093933619898035e295,2.052049414580146e295,4.17172032078489e295,8.480911965958825e295,1.724129669383083e296,3.5050748419258515e296,7.125652939954838e296,1.4486118588207703e297,2.94496004113513e297,5.986965791472706e297,1.2171220963138285e298,2.474352199314639e298,5.030242097153217e298,1.0226246515344071e299,2.0789480063346853e299,4.226403897616227e299,8.592081115715967e299,1.7467298366983097e300,3.5510199232543085e300,7.219057137755598e300,1.4676004946327002e301,2.9835630481178506e301,6.065443896108204e301,1.2330763273140956e302,2.5067864034782503e302,5.096179314667393e302,1.036029378937319e303,2.106199189130029e303,4.2818042755135755e303,8.704707488458952e303,1.7696262506196317e304,3.5975672600529185e304,7.313685692712992e304,1.4868380365180948e305,3.0226720694872875e305,6.144950704283608e305,1.2492396889246612e306,2.539645760375062e306,5.162980847768492e306,1.0496098176499464e307,2.1338075847854238e307,4.3379308504203717e307,8.818810185700627e307,1.7928227943945155e308],"x":[1.0,1.7094894894894894,2.418978978978979,3.1284684684684683,3.837957957957958,4.547447447447447,5.2569369369369365,5.966426426426427,6.675915915915916,7.385405405405406,8.094894894894894,8.804384384384385,9.513873873873873,10.223363363363363,10.932852852852854,11.642342342342342,12.351831831831833,13.061321321321321,13.770810810810811,14.4803003003003,15.18978978978979,15.899279279279279,16.60876876876877,17.318258258258258,18.027747747747746,18.737237237237238,19.446726726726727,20.156216216216215,20.865705705705707,21.575195195195196,22.284684684684684,22.994174174174173,23.703663663663665,24.413153153153154,25.122642642642642,25.83213213213213,26.541621621621623,27.25111111111111,27.9606006006006,28.67009009009009,29.37957957957958,30.08906906906907,30.798558558558558,31.50804804804805,32.21753753753754,32.92702702702703,33.636516516516515,34.34600600600601,35.05549549549549,35.764984984984984,36.474474474474476,37.18396396396396,37.89345345345345,38.602942942942946,39.31243243243243,40.02192192192192,40.731411411411415,41.4409009009009,42.15039039039039,42.85987987987988,43.56936936936937,44.27885885885886,44.988348348348346,45.69783783783784,46.40732732732733,47.116816816816815,47.82630630630631,48.5357957957958,49.245285285285284,49.954774774774776,50.66426426426426,51.37375375375375,52.083243243243246,52.79273273273273,53.50222222222222,54.211711711711715,54.9212012012012,55.63069069069069,56.34018018018018,57.04966966966967,57.75915915915916,58.468648648648646,59.17813813813814,59.88762762762763,60.597117117117115,61.30660660660661,62.0160960960961,62.725585585585584,63.435075075075076,64.14456456456456,64.85405405405406,65.56354354354355,66.27303303303303,66.98252252252253,67.69201201201201,68.4015015015015,69.11099099099098,69.82048048048048,70.52996996996997,71.23945945945945,71.94894894894895,72.65843843843844,73.36792792792792,74.07741741741742,74.7869069069069,75.49639639639639,76.20588588588589,76.91537537537538,77.62486486486486,78.33435435435436,79.04384384384385,79.75333333333333,80.46282282282283,81.17231231231231,81.8818018018018,82.59129129129128,83.30078078078078,84.01027027027027,84.71975975975975,85.42924924924925,86.13873873873874,86.84822822822822,87.55771771771772,88.2672072072072,88.97669669669669,89.68618618618619,90.39567567567568,91.10516516516516,91.81465465465466,92.52414414414415,93.23363363363363,93.94312312312313,94.65261261261261,95.3621021021021,96.0715915915916,96.78108108108108,97.49057057057057,98.20006006006005,98.90954954954955,99.61903903903904,100.32852852852852,101.03801801801802,101.7475075075075,102.45699699699699,103.16648648648649,103.87597597597598,104.58546546546546,105.29495495495496,106.00444444444445,106.71393393393393,107.42342342342343,108.13291291291291,108.8424024024024,109.5518918918919,110.26138138138138,110.97087087087087,111.68036036036035,112.38984984984985,113.09933933933934,113.80882882882882,114.51831831831832,115.2278078078078,115.93729729729729,116.64678678678679,117.35627627627628,118.06576576576576,118.77525525525526,119.48474474474475,120.19423423423423,120.90372372372373,121.61321321321321,122.3227027027027,123.0321921921922,123.74168168168168,124.45117117117117,125.16066066066067,125.87015015015015,126.57963963963964,127.28912912912912,127.99861861861862,128.70810810810812,129.4175975975976,130.1270870870871,130.8365765765766,131.54606606606606,132.25555555555556,132.96504504504506,133.67453453453453,134.38402402402403,135.0935135135135,135.803003003003,136.5124924924925,137.22198198198197,137.93147147147147,138.64096096096097,139.35045045045044,140.05993993993994,140.76942942942944,141.4789189189189,142.1884084084084,142.8978978978979,143.60738738738738,144.31687687687688,145.02636636636637,145.73585585585585,146.44534534534534,147.15483483483484,147.86432432432431,148.5738138138138,149.2833033033033,149.99279279279278,150.70228228228228,151.41177177177178,152.12126126126125,152.83075075075075,153.54024024024025,154.24972972972972,154.95921921921922,155.66870870870872,156.3781981981982,157.0876876876877,157.7971771771772,158.50666666666666,159.21615615615616,159.92564564564566,160.63513513513513,161.34462462462463,162.05411411411413,162.7636036036036,163.4730930930931,164.18258258258257,164.89207207207207,165.60156156156157,166.31105105105104,167.02054054054054,167.73003003003004,168.4395195195195,169.149009009009,169.8584984984985,170.56798798798798,171.27747747747748,171.98696696696697,172.69645645645645,173.40594594594594,174.11543543543544,174.82492492492491,175.5344144144144,176.2439039039039,176.95339339339338,177.66288288288288,178.37237237237238,179.08186186186185,179.79135135135135,180.50084084084085,181.21033033033032,181.91981981981982,182.62930930930932,183.3387987987988,184.0482882882883,184.7577777777778,185.46726726726726,186.17675675675676,186.88624624624626,187.59573573573573,188.30522522522523,189.01471471471473,189.7242042042042,190.4336936936937,191.1431831831832,191.85267267267267,192.56216216216217,193.27165165165164,193.98114114114114,194.69063063063064,195.4001201201201,196.1096096096096,196.8190990990991,197.52858858858858,198.23807807807808,198.94756756756757,199.65705705705705,200.36654654654654,201.07603603603604,201.78552552552551,202.495015015015,203.2045045045045,203.91399399399398,204.62348348348348,205.33297297297298,206.04246246246245,206.75195195195195,207.46144144144145,208.17093093093092,208.88042042042042,209.58990990990992,210.2993993993994,211.0088888888889,211.7183783783784,212.42786786786786,213.13735735735736,213.84684684684686,214.55633633633633,215.26582582582583,215.97531531531533,216.6848048048048,217.3942942942943,218.1037837837838,218.81327327327327,219.52276276276277,220.23225225225227,220.94174174174174,221.65123123123124,222.3607207207207,223.0702102102102,223.7796996996997,224.48918918918918,225.19867867867868,225.90816816816817,226.61765765765765,227.32714714714714,228.03663663663664,228.74612612612611,229.4556156156156,230.1651051051051,230.87459459459458,231.58408408408408,232.29357357357358,233.00306306306305,233.71255255255255,234.42204204204205,235.13153153153152,235.84102102102102,236.55051051051052,237.26,237.9694894894895,238.678978978979,239.38846846846846,240.09795795795796,240.80744744744746,241.51693693693693,242.22642642642643,242.93591591591593,243.6454054054054,244.3548948948949,245.0643843843844,245.77387387387387,246.48336336336337,247.19285285285287,247.90234234234234,248.61183183183184,249.32132132132134,250.0308108108108,250.7403003003003,251.44978978978978,252.15927927927927,252.86876876876877,253.57825825825824,254.28774774774774,254.99723723723724,255.7067267267267,256.41621621621624,257.1257057057057,257.8351951951952,258.5446846846847,259.2541741741742,259.9636636636637,260.6731531531532,261.3826426426426,262.0921321321321,262.8016216216216,263.5111111111111,264.2206006006006,264.9300900900901,265.63957957957956,266.34906906906906,267.05855855855856,267.76804804804806,268.47753753753756,269.187027027027,269.8965165165165,270.606006006006,271.3154954954955,272.024984984985,272.7344744744745,273.44396396396394,274.15345345345344,274.86294294294294,275.57243243243244,276.28192192192193,276.99141141141143,277.7009009009009,278.4103903903904,279.1198798798799,279.8293693693694,280.5388588588589,281.2483483483484,281.9578378378378,282.6673273273273,283.3768168168168,284.0863063063063,284.7957957957958,285.5052852852853,286.21477477477475,286.92426426426425,287.63375375375375,288.34324324324325,289.05273273273275,289.76222222222225,290.4717117117117,291.1812012012012,291.8906906906907,292.6001801801802,293.3096696696697,294.0191591591592,294.72864864864863,295.43813813813813,296.1476276276276,296.8571171171171,297.5666066066066,298.27609609609607,298.98558558558557,299.69507507507507,300.40456456456457,301.11405405405407,301.82354354354356,302.533033033033,303.2425225225225,303.952012012012,304.6615015015015,305.370990990991,306.0804804804805,306.78996996996995,307.49945945945944,308.20894894894894,308.91843843843844,309.62792792792794,310.33741741741744,311.0469069069069,311.7563963963964,312.4658858858859,313.1753753753754,313.8848648648649,314.5943543543544,315.3038438438438,316.0133333333333,316.7228228228228,317.4323123123123,318.1418018018018,318.8512912912913,319.56078078078076,320.27027027027026,320.97975975975976,321.68924924924926,322.39873873873876,323.10822822822826,323.8177177177177,324.5272072072072,325.2366966966967,325.9461861861862,326.6556756756757,327.36516516516514,328.07465465465464,328.78414414414414,329.49363363363364,330.20312312312313,330.91261261261263,331.6221021021021,332.3315915915916,333.0410810810811,333.7505705705706,334.4600600600601,335.1695495495496,335.879039039039,336.5885285285285,337.298018018018,338.0075075075075,338.716996996997,339.4264864864865,340.13597597597595,340.84546546546545,341.55495495495495,342.26444444444445,342.97393393393395,343.68342342342345,344.3929129129129,345.1024024024024,345.8118918918919,346.5213813813814,347.2308708708709,347.9403603603604,348.64984984984983,349.35933933933933,350.0688288288288,350.7783183183183,351.4878078078078,352.1972972972973,352.90678678678677,353.61627627627627,354.32576576576577,355.03525525525527,355.74474474474476,356.4542342342342,357.1637237237237,357.8732132132132,358.5827027027027,359.2921921921922,360.0016816816817,360.71117117117115,361.42066066066064,362.13015015015014,362.83963963963964,363.54912912912914,364.25861861861864,364.9681081081081,365.6775975975976,366.3870870870871,367.0965765765766,367.8060660660661,368.5155555555556,369.225045045045,369.9345345345345,370.644024024024,371.3535135135135,372.063003003003,372.7724924924925,373.48198198198196,374.19147147147146,374.90096096096096,375.61045045045046,376.31993993993996,377.02942942942946,377.7389189189189,378.4484084084084,379.1578978978979,379.8673873873874,380.5768768768769,381.2863663663664,381.99585585585584,382.70534534534534,383.41483483483483,384.12432432432433,384.83381381381383,385.5433033033033,386.2527927927928,386.9622822822823,387.6717717717718,388.3812612612613,389.0907507507508,389.8002402402402,390.5097297297297,391.2192192192192,391.9287087087087,392.6381981981982,393.3476876876877,394.05717717717715,394.76666666666665,395.47615615615615,396.18564564564565,396.89513513513515,397.60462462462465,398.3141141141141,399.0236036036036,399.7330930930931,400.4425825825826,401.1520720720721,401.8615615615616,402.57105105105103,403.2805405405405,403.99003003003,404.6995195195195,405.409009009009,406.1184984984985,406.82798798798797,407.53747747747747,408.24696696696697,408.95645645645646,409.66594594594596,410.37543543543546,411.0849249249249,411.7944144144144,412.5039039039039,413.2133933933934,413.9228828828829,414.63237237237234,415.34186186186184,416.05135135135134,416.76084084084084,417.47033033033034,418.17981981981984,418.8893093093093,419.5987987987988,420.3082882882883,421.0177777777778,421.7272672672673,422.4367567567568,423.1462462462462,423.8557357357357,424.5652252252252,425.2747147147147,425.9842042042042,426.6936936936937,427.40318318318316,428.11267267267266,428.82216216216216,429.53165165165166,430.24114114114116,430.95063063063066,431.6601201201201,432.3696096096096,433.0790990990991,433.7885885885886,434.4980780780781,435.2075675675676,435.91705705705704,436.62654654654654,437.33603603603603,438.04552552552553,438.75501501501503,439.46450450450453,440.173993993994,440.8834834834835,441.592972972973,442.3024624624625,443.01195195195197,443.7214414414414,444.4309309309309,445.1404204204204,445.8499099099099,446.5593993993994,447.2688888888889,447.97837837837835,448.68786786786785,449.39735735735735,450.10684684684685,450.81633633633635,451.52582582582585,452.2353153153153,452.9448048048048,453.6542942942943,454.3637837837838,455.0732732732733,455.7827627627628,456.49225225225223,457.2017417417417,457.9112312312312,458.6207207207207,459.3302102102102,460.0396996996997,460.74918918918917,461.45867867867867,462.16816816816817,462.87765765765766,463.58714714714716,464.29663663663666,465.0061261261261,465.7156156156156,466.4251051051051,467.1345945945946,467.8440840840841,468.5535735735736,469.26306306306304,469.97255255255254,470.68204204204204,471.39153153153154,472.10102102102104,472.8105105105105,473.52,474.2294894894895,474.938978978979,475.6484684684685,476.357957957958,477.0674474474474,477.7769369369369,478.4864264264264,479.1959159159159,479.9054054054054,480.6148948948949,481.32438438438436,482.03387387387386,482.74336336336336,483.45285285285286,484.16234234234236,484.87183183183186,485.5813213213213,486.2908108108108,487.0003003003003,487.7097897897898,488.4192792792793,489.1287687687688,489.83825825825824,490.54774774774774,491.25723723723723,491.96672672672673,492.67621621621623,493.38570570570573,494.0951951951952,494.8046846846847,495.5141741741742,496.2236636636637,496.93315315315317,497.64264264264267,498.3521321321321,499.0616216216216,499.7711111111111,500.4806006006006,501.1900900900901,501.89957957957955,502.60906906906905,503.31855855855855,504.02804804804805,504.73753753753755,505.44702702702705,506.1565165165165,506.866006006006,507.5754954954955,508.284984984985,508.9944744744745,509.703963963964,510.4134534534534,511.1229429429429,511.8324324324324,512.5419219219219,513.2514114114114,513.9609009009009,514.6703903903904,515.3798798798799,516.0893693693694,516.7988588588588,517.5083483483484,518.2178378378378,518.9273273273274,519.6368168168168,520.3463063063064,521.0557957957958,521.7652852852852,522.4747747747748,523.1842642642642,523.8937537537538,524.6032432432432,525.3127327327327,526.0222222222222,526.7317117117117,527.4412012012012,528.1506906906907,528.8601801801802,529.5696696696697,530.2791591591591,530.9886486486487,531.6981381381381,532.4076276276277,533.1171171171171,533.8266066066066,534.5360960960961,535.2455855855856,535.9550750750751,536.6645645645646,537.374054054054,538.0835435435436,538.793033033033,539.5025225225226,540.212012012012,540.9215015015016,541.630990990991,542.3404804804804,543.04996996997,543.7594594594594,544.468948948949,545.1784384384384,545.8879279279279,546.5974174174174,547.3069069069069,548.0163963963964,548.7258858858859,549.4353753753754,550.1448648648649,550.8543543543543,551.5638438438439,552.2733333333333,552.9828228228229,553.6923123123123,554.4018018018018,555.1112912912913,555.8207807807808,556.5302702702703,557.2397597597597,557.9492492492493,558.6587387387387,559.3682282282282,560.0777177177177,560.7872072072072,561.4966966966967,562.2061861861862,562.9156756756756,563.6251651651652,564.3346546546546,565.0441441441442,565.7536336336336,566.4631231231231,567.1726126126126,567.8821021021021,568.5915915915916,569.3010810810811,570.0105705705706,570.7200600600601,571.4295495495495,572.1390390390391,572.8485285285285,573.5580180180181,574.2675075075075,574.976996996997,575.6864864864865,576.395975975976,577.1054654654655,577.8149549549549,578.5244444444445,579.2339339339339,579.9434234234234,580.6529129129129,581.3624024024024,582.0718918918919,582.7813813813814,583.4908708708708,584.2003603603604,584.9098498498498,585.6193393393394,586.3288288288288,587.0383183183184,587.7478078078078,588.4572972972973,589.1667867867868,589.8762762762763,590.5857657657658,591.2952552552553,592.0047447447447,592.7142342342343,593.4237237237237,594.1332132132133,594.8427027027027,595.5521921921921,596.2616816816817,596.9711711711711,597.6806606606607,598.3901501501501,599.0996396396397,599.8091291291291,600.5186186186186,601.2281081081081,601.9375975975976,602.6470870870871,603.3565765765766,604.066066066066,604.7755555555556,605.485045045045,606.1945345345346,606.904024024024,607.6135135135136,608.323003003003,609.0324924924925,609.741981981982,610.4514714714715,611.160960960961,611.8704504504504,612.5799399399399,613.2894294294294,613.9989189189189,614.7084084084084,615.4178978978979,616.1273873873874,616.8368768768769,617.5463663663663,618.2558558558559,618.9653453453453,619.6748348348349,620.3843243243243,621.0938138138138,621.8033033033033,622.5127927927928,623.2222822822823,623.9317717717718,624.6412612612612,625.3507507507508,626.0602402402402,626.7697297297298,627.4792192192192,628.1887087087088,628.8981981981982,629.6076876876876,630.3171771771772,631.0266666666666,631.7361561561562,632.4456456456456,633.1551351351351,633.8646246246246,634.5741141141141,635.2836036036036,635.9930930930931,636.7025825825826,637.4120720720721,638.1215615615615,638.8310510510511,639.5405405405405,640.2500300300301,640.9595195195195,641.669009009009,642.3784984984985,643.087987987988,643.7974774774775,644.506966966967,645.2164564564565,645.925945945946,646.6354354354354,647.344924924925,648.0544144144144,648.763903903904,649.4733933933934,650.1828828828828,650.8923723723724,651.6018618618618,652.3113513513514,653.0208408408408,653.7303303303303,654.4398198198198,655.1493093093093,655.8587987987988,656.5682882882883,657.2777777777778,657.9872672672673,658.6967567567567,659.4062462462463,660.1157357357357,660.8252252252253,661.5347147147147,662.2442042042042,662.9536936936937,663.6631831831832,664.3726726726727,665.0821621621621,665.7916516516517,666.5011411411411,667.2106306306306,667.9201201201201,668.6296096096096,669.3390990990991,670.0485885885886,670.758078078078,671.4675675675676,672.177057057057,672.8865465465466,673.596036036036,674.3055255255256,675.015015015015,675.7245045045045,676.433993993994,677.1434834834835,677.852972972973,678.5624624624625,679.2719519519519,679.9814414414415,680.6909309309309,681.4004204204205,682.1099099099099,682.8193993993993,683.5288888888889,684.2383783783783,684.9478678678679,685.6573573573573,686.3668468468469,687.0763363363363,687.7858258258258,688.4953153153153,689.2048048048048,689.9142942942943,690.6237837837838,691.3332732732732,692.0427627627628,692.7522522522522,693.4617417417418,694.1712312312312,694.8807207207208,695.5902102102102,696.2996996996997,697.0091891891892,697.7186786786787,698.4281681681682,699.1376576576577,699.8471471471471,700.5566366366367,701.2661261261261,701.9756156156157,702.6851051051051,703.3945945945947,704.1040840840841,704.8135735735735,705.5230630630631,706.2325525525525,706.9420420420421,707.6515315315315,708.361021021021,709.0705105105105,709.78]}

},{}],113:[function(require,module,exports){
module.exports={"expected":[-0.6321205588285577,-0.6317521267700319,-0.631383325726,-0.6310141553269224,-0.6306446152028891,-0.6302747049836198,-0.6299044242984633,-0.6295337727763972,-0.6291627500460275,-0.6287913557355884,-0.6284195894729416,-0.628047450885576,-0.6276749396006078,-0.6273020552447796,-0.6269287974444597,-0.6265551658256432,-0.6261811600139496,-0.6258067796346242,-0.6254320243125365,-0.6250568936721808,-0.6246813873376746,-0.6243055049327598,-0.623929246080801,-0.6235526104047855,-0.6231755975273232,-0.6227982070706463,-0.622420438656608,-0.6220422919066836,-0.6216637664419685,-0.6212848618831792,-0.6209055778506523,-0.6205259139643439,-0.6201458698438294,-0.6197654451083038,-0.6193846393765801,-0.6190034522670897,-0.6186218833978823,-0.6182399323866243,-0.6178575988506,-0.6174748824067098,-0.6170917826714706,-0.6167082992610153,-0.6163244317910923,-0.6159401798770654,-0.6155555431339129,-0.6151705211762276,-0.6147851136182163,-0.6143993200736994,-0.6140131401561105,-0.6136265734784964,-0.6132396196535158,-0.61285227829344,-0.6124645490101516,-0.6120764314151448,-0.6116879251195244,-0.6112990297340061,-0.6109097448689154,-0.6105200701341875,-0.6101300051393674,-0.6097395494936086,-0.6093487028056735,-0.6089574646839324,-0.6085658347363635,-0.6081738125705524,-0.6077813977936916,-0.6073885900125804,-0.6069953888336241,-0.6066017938628339,-0.6062078047058266,-0.6058134209678235,-0.6054186422536513,-0.6050234681677402,-0.6046278983141247,-0.6042319322964425,-0.6038355697179345,-0.6034388101814441,-0.603041653289417,-0.6026440986439008,-0.6022461458465447,-0.6018477944985985,-0.6014490442009129,-0.6010498945539392,-0.6006503451577279,-0.6002503956119294,-0.599850045515793,-0.5994492944681667,-0.5990481420674968,-0.598646587911827,-0.5982446315987993,-0.5978422727256518,-0.5974395108892199,-0.5970363456859349,-0.596632776711824,-0.5962288035625101,-0.5958244258332105,-0.5954196431187377,-0.595014455013498,-0.5946088611114918,-0.5942028610063128,-0.5937964542911475,-0.5933896405587751,-0.5929824194015672,-0.5925747904114866,-0.5921667531800883,-0.5917583072985172,-0.5913494523575096,-0.5909401879473913,-0.5905305136580785,-0.590120429079076,-0.5897099337994779,-0.5892990274079666,-0.5888877094928125,-0.5884759796418741,-0.5880638374425966,-0.5876512824820124,-0.5872383143467399,-0.586824932622984,-0.5864111368965348,-0.5859969267527677,-0.585582301776643,-0.585167261552705,-0.5847518056650822,-0.5843359336974867,-0.5839196452332132,-0.5835029398551395,-0.5830858171457255,-0.582668276687013,-0.5822503180606252,-0.5818319408477662,-0.5814131446292208,-0.5809939289853538,-0.5805742934961099,-0.580154237741013,-0.5797337612991661,-0.5793128637492503,-0.5788915446695251,-0.5784698036378273,-0.5780476402315712,-0.5776250540277479,-0.5772020446029245,-0.5767786115332443,-0.5763547543944261,-0.5759304727617637,-0.5755057662101256,-0.5750806343139546,-0.5746550766472671,-0.5742290927836532,-0.5738026822962755,-0.5733758447578696,-0.5729485797407429,-0.5725208868167744,-0.5720927655574146,-0.5716642155336846,-0.5712352363161761,-0.5708058274750505,-0.5703759885800388,-0.5699457192004411,-0.5695150189051262,-0.569083887262531,-0.5686523238406604,-0.5682203282070863,-0.567787899928948,-0.5673550385729509,-0.5669217437053665,-0.5664880148920322,-0.5660538516983501,-0.5656192536892876,-0.5651842204293761,-0.5647487514827109,-0.5643128464129508,-0.5638765047833174,-0.5634397261565953,-0.5630025100951308,-0.5625648561608322,-0.5621267639151688,-0.5616882329191707,-0.5612492627334288,-0.5608098529180934,-0.5603700030328744,-0.5599297126370412,-0.5594889812894212,-0.5590478085484002,-0.558606193971922,-0.5581641371174872,-0.5577216375421535,-0.5572786948025351,-0.5568353084548019,-0.5563914780546795,-0.5559472031574483,-0.5555024833179435,-0.5550573180905546,-0.5546117070292246,-0.5541656496874497,-0.5537191456182794,-0.553272194374315,-0.5528247955077099,-0.5523769485701693,-0.5519286531129489,-0.5514799086868556,-0.5510307148422458,-0.550581071129026,-0.5501309770966518,-0.5496804322941278,-0.5492294362700063,-0.5487779885723881,-0.5483260887489213,-0.5478737363468008,-0.5474209309127682,-0.5469676719931109,-0.5465139591336621,-0.5460597918798,-0.5456051697764479,-0.5451500923680729,-0.544694559198686,-0.5442385698118416,-0.5437821237506368,-0.5433252205577115,-0.542867859775247,-0.5424100409449666,-0.5419517636081344,-0.5414930273055549,-0.5410338315775731,-0.5405741759640734,-0.5401140600044795,-0.5396534832377536,-0.5391924452023966,-0.538730945436447,-0.5382689834774803,-0.5378065588626094,-0.5373436711284835,-0.5368803198112874,-0.5364165044467418,-0.5359522245701024,-0.5354874797161591,-0.5350222694192361,-0.5345565932131915,-0.5340904506314161,-0.5336238412068337,-0.5331567644719002,-0.5326892199586032,-0.5322212071984617,-0.5317527257225254,-0.5312837750613746,-0.5308143547451191,-0.5303444643033983,-0.5298741032653806,-0.5294032711597629,-0.5289319675147698,-0.5284601918581537,-0.5279879437171937,-0.5275152226186961,-0.5270420280889926,-0.5265683596539409,-0.5260942168389238,-0.5256195991688486,-0.5251445061681471,-0.5246689373607746,-0.5241928922702097,-0.5237163704194536,-0.5232393713310302,-0.5227618945269847,-0.522283939528884,-0.5218055058578157,-0.5213265930343877,-0.5208472005787279,-0.5203673280104837,-0.5198869748488212,-0.5194061406124251,-0.5189248248194979,-0.5184430269877598,-0.5179607466344478,-0.5174779832763157,-0.5169947364296328,-0.5165110056101846,-0.516026790333271,-0.515542090113707,-0.5150569044658215,-0.514571232903457,-0.5140850749399689,-0.5135984300882256,-0.5131112978606074,-0.5126236777690063,-0.5121355693248254,-0.5116469720389786,-0.51115788542189,-0.5106683089834931,-0.510178242233231,-0.5096876846800552,-0.5091966358324256,-0.5087050951983095,-0.5082130622851819,-0.5077205366000243,-0.5072275176493243,-0.5067340049390754,-0.5062399979747765,-0.5057454962614311,-0.5052504993035467,-0.504755006605135,-0.5042590176697107,-0.5037625320002915,-0.5032655490993972,-0.5027680684690493,-0.5022700896107707,-0.5017716120255851,-0.5012726352140163,-0.5007731586760882,-0.5002731819113235,-0.4997727044187442,-0.4992717256968701,-0.49877024524371916,-0.4982682625568063,-0.4977657771331433,-0.49726278846923827,-0.496759296061095,-0.49625529940421254,-0.4957507979935847,-0.49524579132369945,-0.4947402788885386,-0.4942342601815771,-0.4937277346957827,-0.4932207019236153,-0.4927131613570264,-0.49220511248745885,-0.4916965548058461,-0.49118748780261184,-0.4906779109676693,-0.4901678237904209,-0.4896572257597578,-0.489146116364059,-0.48863449509119156,-0.4881223614285093,-0.4876097148628526,-0.48709655488054815,-0.486582880967408,-0.48606869260872926,-0.4855539892892937,-0.485038770493367,-0.48452303570469835,-0.48400678440651973,-0.4834900160815459,-0.4829727302119734,-0.48245492627948017,-0.48193660376522507,-0.4814177621498473,-0.480898400913466,-0.4803785195356796,-0.47985811749556534,-0.47933719427167876,-0.4788157493420533,-0.4782937821841994,-0.47777129227510434,-0.4772482790912317,-0.47672474210852056,-0.47620068080238537,-0.47567609464771504,-0.4751509831188726,-0.4746253456896947,-0.4740991818334909,-0.4735724910230436,-0.4730452727306068,-0.4725175264279063,-0.4719892515861385,-0.47146044767597045,-0.4709311141675391,-0.4704012505304505,-0.4698708562337797,-0.46933993074607,-0.46880847353533234,-0.4682764840690451,-0.4677439618141531,-0.4672109062370674,-0.46667731680366464,-0.4661431929792866,-0.46560853422873955,-0.4650733400162938,-0.4645376098056831,-0.46400134306010404,-0.4634645392422157,-0.46292719781413905,-0.4623893182374564,-0.46185089997321055,-0.4613119424819049,-0.46077244522350225,-0.46023240765742485,-0.45969182924255325,-0.4591507094372263,-0.4586090476992402,-0.45806684348584825,-0.45752409625376017,-0.45698080545914155,-0.45643697055761334,-0.45589259100425134,-0.45534766625358536,-0.45480219575959935,-0.4542561789757301,-0.45370961535486715,-0.45316250434935196,-0.45261484541097763,-0.45206663799098834,-0.45151788154007844,-0.4509685755083923,-0.45041871934552363,-0.44986831250051473,-0.44931735442185644,-0.4487658445574869,-0.4482137823547916,-0.4476611672606024,-0.44710799872119744,-0.44655427618230004,-0.4459999990890785,-0.4454451668861455,-0.44488977901755733,-0.44433383492681383,-0.44377733405685726,-0.4432202758500719,-0.44266265974828384,-0.4421044851927599,-0.44154575162420756,-0.44098645848277407,-0.4404266052080459,-0.43986619123904835,-0.4393052160142449,-0.43874367897153665,-0.4381815795482618,-0.43761891718119494,-0.43705569130654665,-0.4364919013599628,-0.43592754677652423,-0.4353626269907459,-0.4347971414365764,-0.4342310895473974,-0.4336644707560232,-0.4330972844947001,-0.4325295301951056,-0.43196120728834825,-0.4313923152049667,-0.4308228533749292,-0.4302528212276334,-0.42968221819190533,-0.4291110436959989,-0.42853929716759553,-0.42796697803380335,-0.42739408572115706,-0.4268206196556166,-0.4262465792625672,-0.4256719639668187,-0.4250967731926047,-0.42452100636358236,-0.42394466290283156,-0.4233677422328543,-0.4227902437755743,-0.4222121669523362,-0.4216335111839055,-0.4210542758904672,-0.42047446049162573,-0.4198940644064043,-0.41931308705324416,-0.41873152785000434,-0.41814938621396064,-0.4175666615618054,-0.41698335330964664,-0.41639946087300767,-0.4158149836668266,-0.4152299211054554,-0.41464427260265957,-0.4140580375716175,-0.4134712154249198,-0.41288380557456905,-0.41229580743197863,-0.41170722040797264,-0.41111804391278495,-0.41052827735605907,-0.40993792014684705,-0.409346971693609,-0.4087554314042129,-0.40816329868593343,-0.4075705729454519,-0.4069772535888553,-0.4063833400216357,-0.40578883164868984,-0.4051937278743185,-0.40459802810222606,-0.40400173173551934,-0.4034048381767076,-0.4028073468277016,-0.4022092570898131,-0.4016105683637545,-0.40101128004963776,-0.4004113915469742,-0.3998109022546736,-0.3992098115710438,-0.3986081188937902,-0.39800582362001485,-0.397402925146216,-0.39679942286828757,-0.39619531618151826,-0.39559060448059147,-0.3949852871595842,-0.3943793636119665,-0.39377283323060125,-0.393165695407743,-0.39255794953503786,-0.39194959500352256,-0.39134063120362406,-0.39073105752515863,-0.39012087335733164,-0.3895100780887366,-0.3888986711073549,-0.38828665180055466,-0.38767401955509084,-0.3870607737571039,-0.3864469137921197,-0.3858324390450487,-0.38521734890018533,-0.3846016427412073,-0.3839853199511751,-0.3833683799125314,-0.3827508220071005,-0.38213264561608734,-0.3815138501200773,-0.3808944348990354,-0.38027439933230567,-0.37965374279861064,-0.3790324646760504,-0.3784105643421024,-0.3777880411736207,-0.377164894546835,-0.3765411238373505,-0.37591672842014706,-0.3752917076695786,-0.37466606095937227,-0.3740397876626282,-0.37341288715181864,-0.37278535879878727,-0.3721572019747488,-0.37152841605028813,-0.37089900039535983,-0.3702689543792875,-0.369638277370763,-0.3690069687378461,-0.3683750278479636,-0.36774245406790873,-0.3671092467638406,-0.3664754053012836,-0.3658409290451266,-0.36520581735962243,-0.3645700696083872,-0.3639336851543997,-0.36329666336000077,-0.3626590035868927,-0.3620207051961382,-0.3613817675481605,-0.360742190002742,-0.36010197191902404,-0.3594611126555062,-0.35881961157004544,-0.3581774680198557,-0.35753468136150723,-0.3568912509509258,-0.356247176143392,-0.35560245629354104,-0.35495709075536164,-0.3543110788821955,-0.3536644200267366,-0.35301711354103105,-0.35236915877647546,-0.3517205550838174,-0.3510713018131538,-0.35042139831393093,-0.34977084393494356,-0.34911963802433404,-0.34846777992959216,-0.34781526899755405,-0.3471621045744017,-0.3465082860056624,-0.34585381263620796,-0.345198683810254,-0.3445428988713593,-0.3438864571624255,-0.3432293580256959,-0.34257160080275517,-0.3419131848345285,-0.34125410946128104,-0.34059437402261733,-0.33993397785748036,-0.3392729203041511,-0.3386112007002479,-0.3379488183827256,-0.3372857726878752,-0.3366220629513228,-0.3359576885080291,-0.33529264869228903,-0.3346269428377304,-0.3339605702773142,-0.33329353034333287,-0.33262582236741034,-0.3319574456805012,-0.3312883996128899,-0.33061868349419027,-0.3299482966533447,-0.32927723841862344,-0.3286055081176241,-0.3279331050772709,-0.32726002862381387,-0.32658627808282825,-0.32591185277921403,-0.32523675203719493,-0.3245609751803179,-0.32388452153145253,-0.32320739041279006,-0.32252958114584307,-0.32185109305144455,-0.3211719254497474,-0.3204920776602236,-0.3198115490016634,-0.3191303387921752,-0.3184484463491842,-0.3177658709894319,-0.3170826120289759,-0.3163986687831885,-0.31571404056675656,-0.3150287266936803,-0.3143427264772733,-0.31365603923016117,-0.31296866426428105,-0.3122806008908813,-0.3115918484205201,-0.3109024061630654,-0.3102122734276941,-0.30952144952289085,-0.30882993375644807,-0.3081377254354648,-0.3074448238663462,-0.30675122835480273,-0.3060569382058495,-0.30536195272380573,-0.3046662712122938,-0.3039698929742386,-0.30327281731186706,-0.30257504352670717,-0.30187657091958753,-0.3011773987906364,-0.30047752643928105,-0.29977695316424735,-0.2990756782635586,-0.2983737010345353,-0.297671020773794,-0.29696763677724697,-0.29626354834010127,-0.2955587547568581,-0.2948532553213121,-0.29414704932655067,-0.2934401360649532,-0.2927325148281905,-0.2920241849072238,-0.2913151455923044,-0.2906053961729727,-0.2898949359380576,-0.28918376417567576,-0.2884718801732308,-0.28775928321741284,-0.28704597259419745,-0.2863319475888453,-0.285617207485901,-0.28490175156919284,-0.2841855791218318,-0.2834686894262108,-0.2827510817640042,-0.2820327554161669,-0.2813137096629337,-0.28059394378381847,-0.27987345705761363,-0.27915224876238925,-0.2784303181754924,-0.2777076645735464,-0.27698428723245005,-0.2762601854273771,-0.2755353584327753,-0.2748098055223657,-0.27408352596914215,-0.27335651904537017,-0.27262878402258667,-0.2719003201715989,-0.2711711267624837,-0.27044120306458724,-0.2697105483465236,-0.26897916187617443,-0.2682470429206884,-0.26751419074647986,-0.26678060461922887,-0.26604628380387974,-0.26531122756464076,-0.26457543516498333,-0.26383890586764114,-0.2631016389346097,-0.2623636336271451,-0.2616248892057638,-0.2608854049302417,-0.2601451800596131,-0.25940421385217055,-0.2586625055654636,-0.2579200544562981,-0.257176859780736,-0.25643292079409374,-0.2556882367509422,-0.25494280690510573,-0.2541966305096613,-0.2534497068169378,-0.25270203507851546,-0.25195361454522486,-0.2512044444671463,-0.250454524093609,-0.24970385267319062,-0.24895242945371585,-0.24820025368225646,-0.2474473246051299,-0.24669364146789896,-0.24593920351537085,-0.24518400999159634,-0.24442806013986923,-0.2436713532027254,-0.24291388842194223,-0.24215566503853758,-0.24139668229276934,-0.24063693942413444,-0.23987643567136815,-0.23911517027244344,-0.23835314246456996,-0.2375903514841935,-0.23682679656699518,-0.23606247694789054,-0.23529739186102908,-0.23453154053979308,-0.23376492221679718,-0.23299753612388746,-0.23222938149214067,-0.23146045755186356,-0.2306907635325919,-0.22992029866308988,-0.22914906217134942,-0.22837705328458907,-0.22760427122925364,-0.22683071523101306,-0.22605638451476184,-0.22528127830461822,-0.2245053958239234,-0.22372873629524068,-0.22295129894035493,-0.22217308298027139,-0.22139408763521534,-0.220614312124631,-0.21983375566718094,-0.21905241748074517,-0.21827029678242038,-0.21748739278851925,-0.21670370471456957,-0.21591923177531344,-0.21513397318470656,-0.2143479281559174,-0.2135610959013264,-0.21277347563252524,-0.211985066560316,-0.2111958678947103,-0.21040587884492865,-0.2096150986193996,-0.2088235264257589,-0.20803116147084882,-0.20723800296071718,-0.20644405010061673,-0.2056493020950042,-0.20485375814753973,-0.20405741746108572,-0.20326027923770643,-0.20246234267866686,-0.2016636069844321,-0.20086407135466655,-0.20006373498823302,-0.199262597083192,-0.19846065683680086,-0.19765791344551298,-0.19685436610497697,-0.19605001401003597,-0.1952448563547267,-0.19443889233227865,-0.1936321211351134,-0.19282454195484375,-0.1920161539822728,-0.1912069564073934,-0.19039694841938704,-0.18958612920662318,-0.1887744979566585,-0.18796205385623596,-0.1871487960912841,-0.18633472384691607,-0.18551983630742905,-0.18470413265630312,-0.18388761207620077,-0.1830702737489658,-0.18225211685562276,-0.18143314057637586,-0.18061334409060834,-0.17979272657688158,-0.17897128721293434,-0.17814902517568182,-0.17732593964121496,-0.17650202978479942,-0.17567729478087504,-0.1748517338030548,-0.17402534602412403,-0.17319813061603964,-0.17237008674992926,-0.17154121359609031,-0.1707115103239894,-0.16988097610226127,-0.16904961009870806,-0.16821741148029845,-0.1673843794131669,-0.16655051306261265,-0.16571581159309906,-0.16488027416825268,-0.1640438999508625,-0.16320668810287886,-0.162368637785413,-0.16152974815873583,-0.1606900183822774,-0.15984944761462586,-0.15900803501352676,-0.15816577973588203,-0.15732268093774926,-0.15647873777434088,-0.15563394940002323,-0.1547883149683158,-0.1539418336318902,-0.15309450454256954,-0.15224632685132747,-0.1513972997082873,-0.15054742226272128,-0.1496966936630495,-0.1488451130568393,-0.14799267959080434,-0.14713939241080357,-0.14628525066184064,-0.14543025348806293,-0.14457440003276056,-0.14371768943836571,-0.1428601208464518,-0.1420016933977324,-0.1411424062320606,-0.1402822584884279,-0.13942124930496372,-0.13855937781893415,-0.13769664316674132,-0.13683304448392244,-0.13596858090514896,-0.13510325156422567,-0.13423705559408994,-0.13336999212681072,-0.13250206029358774,-0.13163325922475066,-0.13076358804975804,-0.12989304589719675,-0.12902163189478086,-0.1281493451693508,-0.12727618484687264,-0.12640215005243702,-0.12552723991025833,-0.12465145354367396,-0.12377479007514325,-0.12289724862624672,-0.1220188283176851,-0.12113952826927851,-0.12025934759996562,-0.11937828542780268,-0.11849634086996268,-0.11761351304273442,-0.11672980106152171,-0.11584520404084242,-0.1149597210943276,-0.1140733513347206,-0.11318609387387618,-0.11229794782275965,-0.1114089122914459,-0.11051898638911857,-0.10962816922406919,-0.10873645990369618,-0.10784385753450408,-0.10695036122210254,-0.1060559700712055,-0.10516068318563027,-0.10426449966829661,-0.10336741862122588,-0.10246943914554012,-0.10157056034146107,-0.10067078130830945,-0.09977010114450387,-0.09886851894756,-0.09796603381408976,-0.09706264483980018,-0.09615835111949275,-0.09525315174706239,-0.09434704581549652,-0.09344003241687418,-0.09253211064236519,-0.09162327958222907,-0.09071353832581434,-0.08980288596155743,-0.08889132157698186,-0.08797884425869731,-0.08706545309239867,-0.0861511471628652,-0.08523592555395952,-0.08431978734862675,-0.0834027316288936,-0.08248475747586737,-0.08156586396973513,-0.0806460501897628,-0.07972531521429407,-0.07880365812074967,-0.07788107798562638,-0.07695757388449602,-0.07603314489200465,-0.07510779008187154,-0.07418150852688833,-0.07325429929891805,-0.07232616146889416,-0.07139709410681971,-0.07046709628176637,-0.06953616706187338,-0.06860430551434682,-0.06767151070545854,-0.06673778170054527,-0.06580311756400765,-0.06486751735930935,-0.06393098014897604,-0.06299350499459458,-0.06205509095681194,-0.061115737095334376,-0.06017544246892642,-0.059234206135409945,-0.05829202715166324,-0.05734890457362006,-0.05640483745626866,-0.05545982485365088,-0.054513865818861175,-0.05356695940404567,-0.05261910466040121,-0.05167030063817441,-0.05072054638666073,-0.04976984095420346,-0.04881818338819283,-0.04786557273506501,-0.0469120080403012,-0.04595748834842662,-0.045002012703009596,-0.044045580146660566,-0.043088189721031185,-0.04212984046681327,-0.04117053142373791,-0.040210261630574486,-0.0392490301251297,-0.038286835944246624,-0.0373236781238037,-0.036359555698713825,-0.03539446770292336,-0.03442841316941114,-0.033461391130187555,-0.032493400616293515,-0.03152444065779956,-0.030554510283804803,-0.029583608522436022,-0.028611734400846654,-0.027638886945215824,-0.026665065180747384,-0.025690268131668914,-0.024714494821230764,-0.02373774427170506,-0.02276001550438474,-0.021781307539582555,-0.02080161939663011,-0.019820950093876855,-0.018839298648689124,-0.01785666407744913,-0.016873045395554013,-0.015888441617414803,-0.014902851756455483,-0.013916274825111962,-0.012928709834831114,-0.011940155796069768,-0.010950611718293722,-0.00996007660997676,-0.00896854947859964,-0.007976029330649118,-0.006982515171616939,-0.00598800600599885,-0.004992500837293596,-0.003995998668001923,-0.0029984984996255805,-0.001999999332666322,-0.001000500166624897,-5.551115123125783e-17],"x":[-1.0,-0.998998998998999,-0.997997997997998,-0.996996996996997,-0.995995995995996,-0.994994994994995,-0.993993993993994,-0.992992992992993,-0.991991991991992,-0.990990990990991,-0.98998998998999,-0.988988988988989,-0.987987987987988,-0.986986986986987,-0.985985985985986,-0.984984984984985,-0.983983983983984,-0.982982982982983,-0.9819819819819819,-0.980980980980981,-0.97997997997998,-0.978978978978979,-0.977977977977978,-0.9769769769769769,-0.975975975975976,-0.974974974974975,-0.973973973973974,-0.972972972972973,-0.9719719719719719,-0.970970970970971,-0.96996996996997,-0.968968968968969,-0.9679679679679679,-0.9669669669669669,-0.965965965965966,-0.964964964964965,-0.963963963963964,-0.9629629629629629,-0.9619619619619619,-0.960960960960961,-0.95995995995996,-0.958958958958959,-0.9579579579579579,-0.9569569569569569,-0.955955955955956,-0.954954954954955,-0.953953953953954,-0.9529529529529529,-0.9519519519519519,-0.950950950950951,-0.94994994994995,-0.948948948948949,-0.9479479479479479,-0.9469469469469469,-0.9459459459459459,-0.944944944944945,-0.943943943943944,-0.9429429429429429,-0.9419419419419419,-0.9409409409409409,-0.93993993993994,-0.938938938938939,-0.9379379379379379,-0.9369369369369369,-0.9359359359359359,-0.934934934934935,-0.933933933933934,-0.9329329329329329,-0.9319319319319319,-0.9309309309309309,-0.92992992992993,-0.928928928928929,-0.9279279279279279,-0.9269269269269269,-0.9259259259259259,-0.924924924924925,-0.923923923923924,-0.9229229229229229,-0.9219219219219219,-0.9209209209209209,-0.91991991991992,-0.918918918918919,-0.9179179179179179,-0.9169169169169169,-0.9159159159159159,-0.914914914914915,-0.913913913913914,-0.9129129129129129,-0.9119119119119119,-0.9109109109109109,-0.9099099099099099,-0.908908908908909,-0.9079079079079079,-0.9069069069069069,-0.9059059059059059,-0.9049049049049049,-0.9039039039039038,-0.9029029029029029,-0.9019019019019019,-0.9009009009009009,-0.8998998998998999,-0.8988988988988988,-0.8978978978978979,-0.8968968968968969,-0.8958958958958959,-0.8948948948948949,-0.8938938938938938,-0.8928928928928929,-0.8918918918918919,-0.8908908908908909,-0.8898898898898899,-0.8888888888888888,-0.8878878878878879,-0.8868868868868869,-0.8858858858858859,-0.8848848848848849,-0.8838838838838838,-0.8828828828828829,-0.8818818818818819,-0.8808808808808809,-0.8798798798798799,-0.8788788788788788,-0.8778778778778779,-0.8768768768768769,-0.8758758758758759,-0.8748748748748749,-0.8738738738738738,-0.8728728728728729,-0.8718718718718719,-0.8708708708708709,-0.8698698698698699,-0.8688688688688688,-0.8678678678678678,-0.8668668668668669,-0.8658658658658659,-0.8648648648648649,-0.8638638638638638,-0.8628628628628628,-0.8618618618618619,-0.8608608608608609,-0.8598598598598599,-0.8588588588588588,-0.8578578578578578,-0.8568568568568569,-0.8558558558558559,-0.8548548548548549,-0.8538538538538538,-0.8528528528528528,-0.8518518518518519,-0.8508508508508509,-0.8498498498498499,-0.8488488488488488,-0.8478478478478478,-0.8468468468468469,-0.8458458458458459,-0.8448448448448449,-0.8438438438438438,-0.8428428428428428,-0.8418418418418419,-0.8408408408408409,-0.8398398398398398,-0.8388388388388388,-0.8378378378378378,-0.8368368368368369,-0.8358358358358359,-0.8348348348348348,-0.8338338338338338,-0.8328328328328328,-0.8318318318318318,-0.8308308308308309,-0.8298298298298298,-0.8288288288288288,-0.8278278278278278,-0.8268268268268268,-0.8258258258258259,-0.8248248248248248,-0.8238238238238238,-0.8228228228228228,-0.8218218218218218,-0.8208208208208209,-0.8198198198198198,-0.8188188188188188,-0.8178178178178178,-0.8168168168168168,-0.8158158158158159,-0.8148148148148148,-0.8138138138138138,-0.8128128128128128,-0.8118118118118118,-0.8108108108108109,-0.8098098098098098,-0.8088088088088088,-0.8078078078078078,-0.8068068068068068,-0.8058058058058059,-0.8048048048048048,-0.8038038038038038,-0.8028028028028028,-0.8018018018018018,-0.8008008008008008,-0.7997997997997998,-0.7987987987987988,-0.7977977977977978,-0.7967967967967968,-0.7957957957957958,-0.7947947947947948,-0.7937937937937938,-0.7927927927927928,-0.7917917917917918,-0.7907907907907908,-0.7897897897897898,-0.7887887887887888,-0.7877877877877878,-0.7867867867867868,-0.7857857857857858,-0.7847847847847848,-0.7837837837837838,-0.7827827827827828,-0.7817817817817818,-0.7807807807807807,-0.7797797797797797,-0.7787787787787788,-0.7777777777777778,-0.7767767767767768,-0.7757757757757757,-0.7747747747747747,-0.7737737737737738,-0.7727727727727728,-0.7717717717717718,-0.7707707707707707,-0.7697697697697697,-0.7687687687687688,-0.7677677677677678,-0.7667667667667668,-0.7657657657657657,-0.7647647647647647,-0.7637637637637638,-0.7627627627627628,-0.7617617617617618,-0.7607607607607607,-0.7597597597597597,-0.7587587587587588,-0.7577577577577578,-0.7567567567567568,-0.7557557557557557,-0.7547547547547547,-0.7537537537537538,-0.7527527527527528,-0.7517517517517518,-0.7507507507507507,-0.7497497497497497,-0.7487487487487487,-0.7477477477477478,-0.7467467467467468,-0.7457457457457457,-0.7447447447447447,-0.7437437437437437,-0.7427427427427428,-0.7417417417417418,-0.7407407407407407,-0.7397397397397397,-0.7387387387387387,-0.7377377377377378,-0.7367367367367368,-0.7357357357357357,-0.7347347347347347,-0.7337337337337337,-0.7327327327327328,-0.7317317317317318,-0.7307307307307307,-0.7297297297297297,-0.7287287287287287,-0.7277277277277278,-0.7267267267267268,-0.7257257257257257,-0.7247247247247247,-0.7237237237237237,-0.7227227227227228,-0.7217217217217218,-0.7207207207207207,-0.7197197197197197,-0.7187187187187187,-0.7177177177177178,-0.7167167167167167,-0.7157157157157157,-0.7147147147147147,-0.7137137137137137,-0.7127127127127127,-0.7117117117117117,-0.7107107107107107,-0.7097097097097097,-0.7087087087087087,-0.7077077077077077,-0.7067067067067067,-0.7057057057057057,-0.7047047047047047,-0.7037037037037037,-0.7027027027027027,-0.7017017017017017,-0.7007007007007007,-0.6996996996996997,-0.6986986986986987,-0.6976976976976977,-0.6966966966966966,-0.6956956956956957,-0.6946946946946947,-0.6936936936936937,-0.6926926926926927,-0.6916916916916916,-0.6906906906906907,-0.6896896896896897,-0.6886886886886887,-0.6876876876876877,-0.6866866866866866,-0.6856856856856857,-0.6846846846846847,-0.6836836836836837,-0.6826826826826827,-0.6816816816816816,-0.6806806806806807,-0.6796796796796797,-0.6786786786786787,-0.6776776776776777,-0.6766766766766766,-0.6756756756756757,-0.6746746746746747,-0.6736736736736737,-0.6726726726726727,-0.6716716716716716,-0.6706706706706707,-0.6696696696696697,-0.6686686686686687,-0.6676676676676677,-0.6666666666666666,-0.6656656656656657,-0.6646646646646647,-0.6636636636636637,-0.6626626626626627,-0.6616616616616616,-0.6606606606606606,-0.6596596596596597,-0.6586586586586587,-0.6576576576576577,-0.6566566566566566,-0.6556556556556556,-0.6546546546546547,-0.6536536536536537,-0.6526526526526526,-0.6516516516516516,-0.6506506506506506,-0.6496496496496497,-0.6486486486486487,-0.6476476476476476,-0.6466466466466466,-0.6456456456456456,-0.6446446446446447,-0.6436436436436437,-0.6426426426426426,-0.6416416416416416,-0.6406406406406406,-0.6396396396396397,-0.6386386386386387,-0.6376376376376376,-0.6366366366366366,-0.6356356356356356,-0.6346346346346347,-0.6336336336336337,-0.6326326326326326,-0.6316316316316316,-0.6306306306306306,-0.6296296296296297,-0.6286286286286287,-0.6276276276276276,-0.6266266266266266,-0.6256256256256256,-0.6246246246246246,-0.6236236236236237,-0.6226226226226226,-0.6216216216216216,-0.6206206206206206,-0.6196196196196196,-0.6186186186186187,-0.6176176176176176,-0.6166166166166166,-0.6156156156156156,-0.6146146146146146,-0.6136136136136137,-0.6126126126126126,-0.6116116116116116,-0.6106106106106106,-0.6096096096096096,-0.6086086086086087,-0.6076076076076076,-0.6066066066066066,-0.6056056056056056,-0.6046046046046046,-0.6036036036036037,-0.6026026026026026,-0.6016016016016016,-0.6006006006006006,-0.5995995995995996,-0.5985985985985987,-0.5975975975975976,-0.5965965965965966,-0.5955955955955956,-0.5945945945945946,-0.5935935935935935,-0.5925925925925926,-0.5915915915915916,-0.5905905905905906,-0.5895895895895896,-0.5885885885885885,-0.5875875875875876,-0.5865865865865866,-0.5855855855855856,-0.5845845845845846,-0.5835835835835835,-0.5825825825825826,-0.5815815815815816,-0.5805805805805806,-0.5795795795795796,-0.5785785785785785,-0.5775775775775776,-0.5765765765765766,-0.5755755755755756,-0.5745745745745746,-0.5735735735735735,-0.5725725725725725,-0.5715715715715716,-0.5705705705705706,-0.5695695695695696,-0.5685685685685685,-0.5675675675675675,-0.5665665665665666,-0.5655655655655656,-0.5645645645645646,-0.5635635635635635,-0.5625625625625625,-0.5615615615615616,-0.5605605605605606,-0.5595595595595596,-0.5585585585585585,-0.5575575575575575,-0.5565565565565566,-0.5555555555555556,-0.5545545545545546,-0.5535535535535535,-0.5525525525525525,-0.5515515515515516,-0.5505505505505506,-0.5495495495495496,-0.5485485485485485,-0.5475475475475475,-0.5465465465465466,-0.5455455455455456,-0.5445445445445446,-0.5435435435435435,-0.5425425425425425,-0.5415415415415415,-0.5405405405405406,-0.5395395395395396,-0.5385385385385385,-0.5375375375375375,-0.5365365365365365,-0.5355355355355356,-0.5345345345345346,-0.5335335335335335,-0.5325325325325325,-0.5315315315315315,-0.5305305305305306,-0.5295295295295295,-0.5285285285285285,-0.5275275275275275,-0.5265265265265265,-0.5255255255255256,-0.5245245245245245,-0.5235235235235235,-0.5225225225225225,-0.5215215215215215,-0.5205205205205206,-0.5195195195195195,-0.5185185185185185,-0.5175175175175175,-0.5165165165165165,-0.5155155155155156,-0.5145145145145145,-0.5135135135135135,-0.5125125125125125,-0.5115115115115115,-0.5105105105105106,-0.5095095095095095,-0.5085085085085085,-0.5075075075075075,-0.5065065065065065,-0.5055055055055055,-0.5045045045045045,-0.5035035035035035,-0.5025025025025025,-0.5015015015015015,-0.5005005005005005,-0.4994994994994995,-0.4984984984984985,-0.4974974974974975,-0.4964964964964965,-0.4954954954954955,-0.4944944944944945,-0.4934934934934935,-0.4924924924924925,-0.4914914914914915,-0.4904904904904905,-0.4894894894894895,-0.48848848848848847,-0.4874874874874875,-0.48648648648648657,-0.48548548548548554,-0.48448448448448456,-0.4834834834834835,-0.48248248248248254,-0.48148148148148157,-0.48048048048048053,-0.47947947947947955,-0.4784784784784785,-0.47747747747747754,-0.4764764764764765,-0.47547547547547553,-0.47447447447447455,-0.4734734734734735,-0.47247247247247254,-0.4714714714714715,-0.4704704704704705,-0.46946946946946955,-0.4684684684684685,-0.46746746746746753,-0.4664664664664665,-0.4654654654654655,-0.46446446446446454,-0.4634634634634635,-0.46246246246246253,-0.4614614614614615,-0.4604604604604605,-0.45945945945945954,-0.4584584584584585,-0.45745745745745753,-0.4564564564564565,-0.4554554554554555,-0.45445445445445454,-0.4534534534534535,-0.4524524524524525,-0.4514514514514515,-0.4504504504504505,-0.44944944944944953,-0.4484484484484485,-0.4474474474474475,-0.4464464464464465,-0.4454454454454455,-0.4444444444444445,-0.4434434434434435,-0.4424424424424425,-0.4414414414414415,-0.4404404404404405,-0.43943943943943947,-0.4384384384384385,-0.4374374374374375,-0.4364364364364365,-0.4354354354354355,-0.43443443443443447,-0.4334334334334335,-0.4324324324324325,-0.4314314314314315,-0.4304304304304305,-0.42942942942942947,-0.4284284284284285,-0.4274274274274275,-0.4264264264264265,-0.4254254254254255,-0.42442442442442446,-0.4234234234234235,-0.4224224224224225,-0.42142142142142147,-0.4204204204204205,-0.41941941941941946,-0.4184184184184185,-0.41741741741741745,-0.41641641641641647,-0.4154154154154155,-0.41441441441441446,-0.4134134134134135,-0.41241241241241244,-0.41141141141141147,-0.4104104104104105,-0.40940940940940945,-0.4084084084084085,-0.40740740740740744,-0.40640640640640646,-0.4054054054054055,-0.40440440440440445,-0.40340340340340347,-0.40240240240240244,-0.40140140140140146,-0.4004004004004005,-0.39939939939939945,-0.39839839839839847,-0.39739739739739743,-0.39639639639639646,-0.3953953953953955,-0.39439439439439444,-0.39339339339339346,-0.39239239239239243,-0.39139139139139145,-0.3903903903903905,-0.38938938938938944,-0.38838838838838846,-0.3873873873873874,-0.38638638638638645,-0.3853853853853854,-0.38438438438438444,-0.38338338338338346,-0.3823823823823824,-0.38138138138138145,-0.3803803803803804,-0.37937937937937943,-0.37837837837837845,-0.3773773773773774,-0.37637637637637644,-0.3753753753753754,-0.37437437437437443,-0.37337337337337345,-0.3723723723723724,-0.37137137137137144,-0.3703703703703704,-0.3693693693693694,-0.36836836836836845,-0.3673673673673674,-0.36636636636636644,-0.3653653653653654,-0.3643643643643644,-0.36336336336336345,-0.3623623623623624,-0.36136136136136143,-0.3603603603603604,-0.3593593593593594,-0.35835835835835844,-0.3573573573573574,-0.35635635635635643,-0.3553553553553554,-0.3543543543543544,-0.3533533533533534,-0.3523523523523524,-0.3513513513513514,-0.3503503503503504,-0.3493493493493494,-0.3483483483483484,-0.3473473473473474,-0.3463463463463464,-0.3453453453453454,-0.3443443443443444,-0.3433433433433434,-0.3423423423423424,-0.3413413413413414,-0.3403403403403404,-0.3393393393393394,-0.3383383383383384,-0.3373373373373374,-0.3363363363363364,-0.3353353353353354,-0.3343343343343344,-0.33333333333333337,-0.3323323323323324,-0.3313313313313314,-0.3303303303303304,-0.3293293293293294,-0.32832832832832837,-0.3273273273273274,-0.3263263263263264,-0.3253253253253254,-0.3243243243243244,-0.32332332332332336,-0.3223223223223224,-0.32132132132132135,-0.3203203203203204,-0.3193193193193194,-0.31831831831831836,-0.3173173173173174,-0.31631631631631635,-0.31531531531531537,-0.3143143143143144,-0.31331331331331336,-0.3123123123123124,-0.31131131131131135,-0.31031031031031037,-0.3093093093093094,-0.30830830830830835,-0.3073073073073074,-0.30630630630630634,-0.30530530530530536,-0.3043043043043044,-0.30330330330330335,-0.3023023023023024,-0.30130130130130134,-0.30030030030030036,-0.2992992992992994,-0.29829829829829835,-0.29729729729729737,-0.29629629629629634,-0.29529529529529536,-0.2942942942942944,-0.29329329329329334,-0.29229229229229237,-0.29129129129129133,-0.29029029029029035,-0.2892892892892893,-0.28828828828828834,-0.28728728728728736,-0.28628628628628633,-0.28528528528528535,-0.2842842842842843,-0.28328328328328334,-0.28228228228228236,-0.2812812812812813,-0.28028028028028035,-0.2792792792792793,-0.27827827827827833,-0.27727727727727736,-0.2762762762762763,-0.27527527527527534,-0.2742742742742743,-0.27327327327327333,-0.27227227227227235,-0.2712712712712713,-0.27027027027027034,-0.2692692692692693,-0.26826826826826833,-0.26726726726726735,-0.2662662662662663,-0.26526526526526534,-0.2642642642642643,-0.2632632632632633,-0.26226226226226235,-0.2612612612612613,-0.26026026026026033,-0.2592592592592593,-0.2582582582582583,-0.2572572572572573,-0.2562562562562563,-0.2552552552552553,-0.2542542542542543,-0.25325325325325326,-0.2522522522522523,-0.2512512512512513,-0.2502502502502503,-0.24924924924924927,-0.2482482482482483,-0.24724724724724728,-0.24624624624624628,-0.24524524524524527,-0.24424424424424426,-0.24324324324324328,-0.24224224224224228,-0.24124124124124127,-0.24024024024024027,-0.23923923923923926,-0.23823823823823825,-0.23723723723723728,-0.23623623623623627,-0.23523523523523526,-0.23423423423423426,-0.23323323323323325,-0.23223223223223227,-0.2312312312312313,-0.2302302302302303,-0.22922922922922928,-0.22822822822822827,-0.2272272272272273,-0.2262262262262263,-0.22522522522522528,-0.22422422422422428,-0.22322322322322327,-0.22222222222222227,-0.2212212212212213,-0.22022022022022028,-0.21921921921921927,-0.21821821821821827,-0.21721721721721726,-0.21621621621621628,-0.21521521521521528,-0.21421421421421427,-0.21321321321321327,-0.21221221221221226,-0.21121121121121128,-0.21021021021021027,-0.20920920920920927,-0.20820820820820826,-0.20720720720720726,-0.20620620620620625,-0.20520520520520527,-0.20420420420420426,-0.20320320320320326,-0.20220220220220225,-0.20120120120120125,-0.20020020020020027,-0.19919919919919926,-0.19819819819819826,-0.19719719719719725,-0.19619619619619624,-0.19519519519519526,-0.19419419419419426,-0.19319319319319325,-0.19219219219219225,-0.19119119119119124,-0.19019019019019023,-0.18918918918918926,-0.18818818818818825,-0.18718718718718724,-0.18618618618618624,-0.18518518518518523,-0.18418418418418425,-0.18318318318318325,-0.18218218218218224,-0.18118118118118123,-0.18018018018018023,-0.17917917917917925,-0.17817817817817824,-0.17717717717717724,-0.17617617617617623,-0.17517517517517522,-0.17417417417417422,-0.17317317317317324,-0.17217217217217223,-0.17117117117117123,-0.17017017017017022,-0.16916916916916921,-0.16816816816816824,-0.16716716716716723,-0.16616616616616622,-0.16516516516516522,-0.1641641641641642,-0.16316316316316323,-0.16216216216216223,-0.16116116116116122,-0.16016016016016021,-0.1591591591591592,-0.1581581581581582,-0.15715715715715722,-0.15615615615615622,-0.1551551551551552,-0.1541541541541542,-0.1531531531531532,-0.15215215215215222,-0.15115115115115121,-0.1501501501501502,-0.1491491491491492,-0.1481481481481482,-0.14714714714714722,-0.1461461461461462,-0.1451451451451452,-0.1441441441441442,-0.1431431431431432,-0.14214214214214219,-0.1411411411411412,-0.1401401401401402,-0.1391391391391392,-0.1381381381381382,-0.13713713713713718,-0.1361361361361362,-0.1351351351351352,-0.1341341341341342,-0.13313313313313319,-0.13213213213213218,-0.1311311311311312,-0.1301301301301302,-0.1291291291291292,-0.12812812812812818,-0.12712712712712718,-0.12612612612612617,-0.12512512512512516,-0.12412412412412417,-0.12312312312312317,-0.12212212212212216,-0.12112112112112117,-0.12012012012012016,-0.11911911911911917,-0.11811811811811816,-0.11711711711711716,-0.11611611611611616,-0.11511511511511516,-0.11411411411411415,-0.11311311311311316,-0.11211211211211215,-0.11111111111111116,-0.11011011011011015,-0.10910910910910915,-0.10810810810810816,-0.10710710710710715,-0.10610610610610614,-0.10510510510510515,-0.10410410410410414,-0.10310310310310317,-0.10210210210210216,-0.10110110110110115,-0.10010010010010016,-0.09909909909909916,-0.09809809809809815,-0.09709709709709716,-0.09609609609609615,-0.09509509509509516,-0.09409409409409415,-0.09309309309309315,-0.09209209209209215,-0.09109109109109115,-0.09009009009009014,-0.08908908908908915,-0.08808808808808814,-0.08708708708708715,-0.08608608608608614,-0.08508508508508514,-0.08408408408408415,-0.08308308308308314,-0.08208208208208213,-0.08108108108108114,-0.08008008008008013,-0.07907907907907914,-0.07807807807807814,-0.07707707707707713,-0.07607607607607614,-0.07507507507507513,-0.07407407407407413,-0.07307307307307313,-0.07207207207207213,-0.07107107107107113,-0.07007007007007013,-0.06906906906906912,-0.06806806806806813,-0.06706706706706712,-0.06606606606606612,-0.06506506506506513,-0.06406406406406412,-0.06306306306306311,-0.062062062062062114,-0.061061061061061114,-0.06006006006006011,-0.05905905905905911,-0.05805805805805811,-0.0570570570570571,-0.056056056056056104,-0.055055055055055105,-0.054054054054054106,-0.0530530530530531,-0.0520520520520521,-0.0510510510510511,-0.0500500500500501,-0.049049049049049095,-0.048048048048048096,-0.0470470470470471,-0.0460460460460461,-0.04504504504504509,-0.04404404404404409,-0.04304304304304309,-0.042042042042042094,-0.04104104104104109,-0.04004004004004009,-0.039039039039039096,-0.0380380380380381,-0.03703703703703709,-0.03603603603603609,-0.03503503503503509,-0.03403403403403409,-0.033033033033033087,-0.03203203203203209,-0.031031031031031085,-0.030030030030030082,-0.029029029029029083,-0.02802802802802808,-0.02702702702702708,-0.026026026026026078,-0.02502502502502508,-0.024024024024024076,-0.023023023023023077,-0.022022022022022074,-0.021021021021021075,-0.020020020020020072,-0.019019019019019073,-0.01801801801801807,-0.01701701701701707,-0.016016016016016068,-0.01501501501501507,-0.01401401401401407,-0.013013013013013068,-0.012012012012012067,-0.011011011011011066,-0.010010010010010065,-0.009009009009009064,-0.008008008008008063,-0.0070070070070070625,-0.0060060060060060615,-0.0050050050050050605,-0.0040040040040040595,-0.003003003003003058,-0.0020020020020020575,-0.0010010010010010565,-5.551115123125783e-17]}

},{}],114:[function(require,module,exports){
module.exports={"expected":[5.551115123125783e-17,0.0010015021697125696,0.0020040073460210225,0.003007516533438696,0.004012030737484895,0.0050175509646859535,0.0060240782225762434,0.0070316135196991855,0.008040157865608258,0.00904971227086801,0.010060277747055072,0.011071855306759172,0.01208444596358415,0.013098050732148966,0.014112670628088731,0.015128306668055714,0.01614495986972036,0.01716263125177232,0.01818132183392146,0.019201032636898888,0.020221764682457975,0.02124351899337539,0.022266296593452094,0.023290098507514415,0.024314925761415022,0.025340779382033995,0.026367660397279818,0.027395569836090452,0.02842450872843432,0.029454478105311377,0.030485478998754107,0.0315175124418286,0.03255057946863555,0.0335846811143113,0.034619818415028904,0.03565599240799912,0.036693204131471494,0.03773145462473538,0.038770744928120986,0.03981107608300038,0.0408524491317886,0.041894865117944664,0.042938325085972624,0.04398283008142256,0.04502838115089171,0.04607497934202548,0.0471226257035185,0.048171321285115636,0.04922106713761311,0.05027186431285951,0.05132371386375685,0.05237661684426162,0.05343057430938586,0.0544855873151982,0.055541656918824955,0.0565987841784511,0.05765697015332142,0.058716215903741535,0.05977652249107896,0.06083789097776416,0.06190032242729163,0.062963817904221,0.06402837847417796,0.06509400520385554,0.066160699161015,0.06722846141448696,0.06829729303417252,0.06936719509104425,0.07043816865714732,0.07151021480560053,0.07258333461059747,0.07365752914740747,0.07473279949237677,0.0758091467229296,0.07688657191756917,0.07796507615587889,0.07904466051852332,0.08012532608724932,0.08120707394488715,0.08228990517535147,0.08337382086364253,0.08445882209584721,0.08554490995914006,0.08663208554178453,0.08772034993313386,0.08880970422363234,0.08990014950481635,0.09099168686931543,0.09208431741085335,0.09317804222424934,0.09427286240541899,0.09536877905137556,0.09646579326023086,0.09756390613119652,0.09866311876458506,0.09976343226181092,0.10086484772539159,0.10196736625894881,0.10307098896720952,0.10417571695600712,0.10528155133228244,0.10638849320408492,0.10749654368057378,0.10860570387201898,0.10971597488980246,0.11082735784641924,0.11193985385547844,0.11305346403170452,0.11416818949093831,0.11528403135013814,0.11640099072738103,0.1175190687418637,0.11863826651390377,0.11975858516494091,0.1208800258175378,0.12200258959538149,0.12312627762328432,0.12425109102718518,0.12537703093415056,0.12650409847237576,0.12763229477118587,0.1287616209610371,0.1298920781735178,0.13102366754134956,0.13215639019838843,0.133290247279626,0.1344252399211906,0.1355613692603483,0.13669863643550426,0.1378370425862037,0.13897658885313305,0.1401172763781212,0.1412591063041406,0.14240207977530836,0.14354619793688744,0.14469146193528773,0.14583787291806732,0.1469854320339335,0.14813414043274414,0.14928399926550856,0.15043500968438883,0.15158717284270098,0.15274048989491604,0.15389496199666128,0.15505059030472126,0.15620737597703918,0.1573653201727178,0.1585244240520208,0.15968468877637382,0.16084611550836575,0.16200870541174972,0.16317245965144442,0.16433737939353518,0.16550346580527517,0.1666707200550866,0.16783914331256183,0.1690087367484646,0.17017950153473108,0.17135143884447118,0.1725245498519698,0.17369883573268774,0.1748742976632631,0.17605093682151232,0.17722875438643151,0.17840775153819743,0.179587929458169,0.18076928932888806,0.18195183233408085,0.18313555965865913,0.18432047248872127,0.18550657201155368,0.1866938594156317,0.18788233589062098,0.1890720026273786,0.1902628608179543,0.19145491165559173,0.19264815633472943,0.1938425960510023,0.1950382320012426,0.19623506538348126,0.19743309739694898,0.1986323292420776,0.1998327621205011,0.20103439723505698,0.20223723578978725,0.20344127898993986,0.2046465280419699,0.20585298415354059,0.20706064853352468,0.2082695223920056,0.20947960694027867,0.2106909033908524,0.21190341295744955,0.21311713685500844,0.21433207629968418,0.2155482325088498,0.21676560670109762,0.21798420009624034,0.21920401391531227,0.22042504938057067,0.22164730771549684,0.22287079014479733,0.2240954978944054,0.22532143219148199,0.22654859426441698,0.22777698534283064,0.22900660665757455,0.23023745944073315,0.23146954492562466,0.23270286434680254,0.2339374189400567,0.23517320994241464,0.23641023859214272,0.23764850612874752,0.23888801379297692,0.2401287628268214,0.2413707544735154,0.24261398997753825,0.24385847058461588,0.24510419754172166,0.24635117209707785,0.24759939550015683,0.24884886900168224,0.25009959385363045,0.2513515713092316,0.25260480262297097,0.2538592890505902,0.25511503184908857,0.25637203227672417,0.2576302915930154,0.25888981105874204,0.26015059193594636,0.2614126354879347,0.2626759429792786,0.2639405156758161,0.26520635484465305,0.26647346175416403,0.2677418376739941,0.26901148387505996,0.2702824016295509,0.27155459221093053,0.2728280568939377,0.27410279695458795,0.27537881367017475,0.2766561083192708,0.2779346821817293,0.27921453653868517,0.28049567267255643,0.2817780918670455,0.28306179540714027,0.2843467845791158,0.2856330606705351,0.2869206249702507,0.2882094787684062,0.28949962335643703,0.29079106002707195,0.2920837900743346,0.2933778147935444,0.29467313548131824,0.29596975343557125,0.2972676699555188,0.2985668863416771,0.29986740389586514,0.30116922392120543,0.3024723477221256,0.3037767766043599,0.30508251187494995,0.3063895548422466,0.30769790681591086,0.30900756910691546,0.3103185430275462,0.3116308298914028,0.3129444310134009,0.31425934770977276,0.315575581298069,0.3168931330971599,0.3182120044272362,0.31953219660981114,0.3208537109677214,0.32217654882512836,0.3235007115075198,0.32482620034171056,0.32615301665584484,0.3274811617793964,0.32881063704317093,0.33014144377930676,0.3314735833212763,0.33280705700388746,0.334141866163285,0.3354780121369518,0.3368154962637103,0.33815431988372374,0.3394944843384975,0.3408359909708804,0.3421788411250664,0.3435230361465954,0.3448685773823549,0.3462154661805816,0.34756370389086194,0.3489132918641345,0.3502642314526905,0.3516165240101755,0.352970170891591,0.35432517345329523,0.35568153305300504,0.3570392510497968,0.35839832880410816,0.35975876767773934,0.3611205690338542,0.362483734236982,0.3638482646530183,0.36521416164922693,0.3665814265942409,0.3679500608580638,0.3693200658120716,0.37069144282901323,0.3720641932830128,0.37343831854957066,0.37481382000556435,0.37619069902925073,0.37756895700026666,0.378948595299631,0.38032961530974563,0.3817120184143968,0.3830958059987567,0.3844809794493847,0.38586754015422897,0.38725548950262756,0.38864482888531,0.39003555969439874,0.3914276833234102,0.3928212011672567,0.39421611462224726,0.39561242508608957,0.3970101339578911,0.39840924263816024,0.39980975252880846,0.40121166503315076,0.4026149815559079,0.4040197035032075,0.405425832282585,0.4068333693029861,0.40824231597476696,0.40965267370969666,0.411064443920958,0.412477628023149,0.4138922274322846,0.41530824356579765,0.4167256778425408,0.4181445316827876,0.4195648065082338,0.42098650374199936,0.42240962480862915,0.42383417113409494,0.4252601441457966,0.4266875452725633,0.4281163759446557,0.4295466375937662,0.43097833165302163,0.4324114595569837,0.43384602274165107,0.4352820226444605,0.43671946070428824,0.43815833836145185,0.43959865705771095,0.44104041823626944,0.44248362334177654,0.44392827382032807,0.4453743711194684,0.4468219166881914,0.4482709119769422,0.4497213584376187,0.4511732575235725,0.4526266106896112,0.4540814193919989,0.4555376850884586,0.4569954092381731,0.4584545933017863,0.4599152387414052,0.46137734702060107,0.46284091960441087,0.46430595795933904,0.4657724635533582,0.4672404378559118,0.46870988233791444,0.470180798471754,0.47165318773129317,0.4731270515918704,0.4746023915303019,0.4760792090248827,0.47755750555538873,0.47903728260307743,0.4805185416506901,0.4820012841824529,0.48348551168407833,0.48497122564276707,0.4864584275472089,0.48794711888758485,0.48943730115556827,0.4909289758443263,0.4924221444485217,0.49391680846431385,0.49541296938936086,0.49691062872282055,0.4984097879653522,0.499910448619118,0.5014126121877844,0.5029162801765242,0.5044214540920173,0.5059281354424525,0.5074363257375293,0.5089460264884589,0.510457239207966,0.5119699654102909,0.5134842066111894,0.5149999643279362,0.516517240079325,0.5180360353856708,0.5195563517688114,0.5210781907521083,0.5226015538604489,0.5241264426202478,0.5256528585594482,0.5271808032075236,0.5287102780954792,0.5302412847558536,0.5317738247227203,0.533307899531689,0.5348435107199072,0.5363806598260624,0.5379193483903826,0.5394595779546384,0.5410013500621447,0.5425446662577619,0.5440895280878975,0.5456359371005078,0.5471838948450997,0.5487334028727313,0.5502844627360145,0.5518370759891162,0.5533912441877598,0.5549469688892261,0.5565042516523566,0.5580630940375533,0.5596234976067808,0.5611854639235686,0.5627489945530117,0.5643140910617725,0.5658807550180829,0.5674489879917446,0.5690187915541319,0.570590167278193,0.5721631167384513,0.5737376415110069,0.5753137431735384,0.5768914233053046,0.5784706834871459,0.580051525301486,0.5816339503323329,0.5832179601652818,0.5848035563875151,0.5863907405878053,0.5879795143565159,0.5895698792856029,0.5911618369686171,0.5927553890007049,0.5943505369786104,0.5959472825006769,0.597545627166848,0.5991455725786704,0.600747120339294,0.6023502720534749,0.6039550293275759,0.6055613937695687,0.6071693669890357,0.6087789505971707,0.6103901462067816,0.6120029554322913,0.6136173798897397,0.6152334211967851,0.6168510809727059,0.6184703608384021,0.6200912624163971,0.6217137873308394,0.623337937207504,0.6249637136737939,0.6265911183587424,0.6282201528930136,0.6298508189089056,0.6314831180403506,0.6331170519229173,0.6347526221938127,0.6363898304918829,0.6380286784576161,0.6396691677331428,0.6413112999622381,0.642955076790324,0.6446004998644697,0.6462475708333942,0.647896291347468,0.6495466630587137,0.6511986876208089,0.6528523666890875,0.6545077019205412,0.6561646949738206,0.6578233475092383,0.6594836611887688,0.6611456376760518,0.6628092786363928,0.6644745857367652,0.6661415606458121,0.667810205033847,0.669480520572857,0.6711525089365035,0.6728261718001238,0.6745015108407337,0.6761785277370276,0.6778572241693817,0.6795376018198551,0.6812196623721913,0.6829034075118207,0.6845888389258603,0.6862759583031179,0.6879647673340925,0.6896552677109759,0.6913474611276548,0.6930413492797118,0.6947369338644285,0.6964342165807855,0.6981331991294657,0.6998338832128548,0.7015362705350434,0.7032403628018287,0.7049461617207167,0.7066536690009231,0.7083628863533753,0.7100738154907145,0.711786458127297,0.7135008159791959,0.7152168907642034,0.7169346842018313,0.718654198013314,0.7203754339216099,0.7220983936514024,0.7238230789291029,0.7255494914828509,0.7272776330425172,0.7290075053397052,0.730739110107752,0.7324724490817314,0.7342075239984538,0.73594433659647,0.7376828886160716,0.7394231817992928,0.7411652178899132,0.7429089986334578,0.7446545257772006,0.7464018010701652,0.7481508262631269,0.7499016031086142,0.7516541333609108,0.7534084187760577,0.755164461111854,0.7569222621278598,0.7586818235853973,0.7604431472475519,0.7622062348791758,0.7639710882468882,0.7657377091190776,0.7675060992659037,0.7692762604592986,0.7710481944729694,0.7728219030823994,0.7745973880648502,0.7763746511993636,0.778153694266762,0.7799345190496525,0.7817171273324268,0.7835015209012641,0.7852877015441325,0.78707567105079,0.7888654312127877,0.790656983823471,0.7924503306779811,0.7942454735732571,0.7960424143080376,0.7978411546828628,0.799641696500076,0.8014440415638259,0.8032481916800679,0.8050541486565657,0.8068619143028937,0.808671490430439,0.8104828788524021,0.8122960813838003,0.8141110998414677,0.8159279360440584,0.8177465918120481,0.8195670689677355,0.8213893693352441,0.8232134947405246,0.8250394470113563,0.8268672279773491,0.8286968394699452,0.8305282833224208,0.8323615613698883,0.834196675449298,0.8360336273994399,0.8378724190609457,0.83971305227629,0.8415555288897931,0.8433998507476222,0.8452460196977937,0.8470940375901745,0.8489439062764841,0.8507956276102967,0.8526492034470429,0.8545046356440111,0.8563619260603508,0.8582210765570718,0.8600820889970492,0.8619449652450231,0.8638097071676012,0.8656763166332611,0.8675447955123504,0.8694151456770913,0.8712873690015803,0.873161467361791,0.8750374426355758,0.8769152967026675,0.8787950314446819,0.8806766487451188,0.8825601504893645,0.8844455385646942,0.8863328148602717,0.8882219812671541,0.890113039678292,0.8920059919885317,0.8939008400946175,0.8957975858951925,0.8976962312908023,0.8995967781838953,0.9014992284788252,0.9034035840818536,0.9053098469011501,0.9072180188467962,0.9091281018307861,0.9110400977670287,0.9129540085713501,0.9148698361614945,0.9167875824571273,0.918707249379836,0.9206288388531331,0.9225523528024571,0.9244777931551746,0.9264051618405831,0.9283344607899117,0.9302656919363244,0.9321988572149202,0.934133958562737,0.9360709979187521,0.9380099772238852,0.9399508984209995,0.9418937634549039,0.9438385742723552,0.9457853328220598,0.9477340410546757,0.9496847009228151,0.9516373143810446,0.9535918833858891,0.9555484098958328,0.9575068958713212,0.9594673432747638,0.9614297540705342,0.9633941302249744,0.9653604737063955,0.9673287864850797,0.9692990705332826,0.9712713278252344,0.9732455603371434,0.9752217700471966,0.9771999589355622,0.9791801289843919,0.9811622821778215,0.9831464205019752,0.9851325459449655,0.9871206604968963,0.9891107661498646,0.9911028648979622,0.9930969587372783,0.9950930496659011,0.9970911396839197,0.999091230793427,1.0010933249985199,1.003097424305303,1.0051035307218903,1.0071116462584064,1.0091217729269897,1.0111339127417927,1.013148067718986,1.015164239876759,1.0171824312353226,1.0192026438169108,1.0212248796457828,1.023249140748225,1.0252754291525532,1.0273037468891149,1.0293340959902908,1.0313664784904966,1.033400896426186,1.0354373518358522,1.0374758467600296,1.0395163832412968,1.0415589633242772,1.0436035890556423,1.045650262484114,1.0476989856604646,1.049749760637522,1.0518025894701681,1.0538574742153441,1.0559144169320511,1.057973419681352,1.0600344845263734,1.062097613532309,1.0641628087664206,1.06623007229804,1.068299406198572,1.070370812541495,1.0724442934023646,1.0745198508588154,1.0765974869905621,1.0786772038794028,1.08075900360922,1.0828428882659835,1.084928859937752,1.0870169207146758,1.0891070726889986,1.0911993179550583,1.0932936586092916,1.0953900967502341,1.0974886344785235,1.0995892738969013,1.1016920171102143,1.1037968662254176,1.1059038233515766,1.108012890599869,1.110124070083587,1.1122373639181382,1.11435277422105,1.11647030311197,1.1185899527126688,1.1207117251470418,1.1228356225411114,1.1249616470230293,1.1270898007230785,1.129220085773676,1.131352504309374,1.133487058466862,1.13562375038497,1.1377625822046702,1.1399035560690782,1.1420466741234572,1.1441919385152173,1.1463393513939204,1.1484889149112807,1.1506406312211674,1.1527945024796076,1.154950530844786,1.15710871847705,1.1592690675389106,1.1614315801950439,1.1635962586122945,1.1657631049596766,1.167932121408377,1.1701033101317568,1.1722766733053542,1.1744522131068855,1.1766299317162483,1.1788098313155233,1.1809919140889766,1.183176182223062,1.1853626379064233,1.1875512833298953,1.1897421206865075,1.1919351521714858,1.194130379982255,1.1963278063184393,1.198527433381867,1.2007292633765714,1.2029332985087928,1.2051395409869816,1.2073479930217987,1.2095586568261207,1.211771534615039,1.2139866286058643,1.2162039410181278,1.2184234740735829,1.2206452299962085,1.2228692110122115,1.2250954193500274,1.227323857240324,1.2295545269160026,1.2317874306122012,1.2340225705662964,1.2362599490179051,1.238499568208888,1.2407414303833497,1.2429855377876433,1.2452318926703714,1.2474804972823885,1.2497313538768036,1.2519844647089813,1.2542398320365462,1.2564974581193833,1.2587573452196406,1.2610194956017322,1.2632839115323395,1.2655505952804145,1.2678195491171813,1.2700907753161386,1.2723642761530622,1.2746400539060068,1.2769181108553085,1.2791984492835877,1.2814810714757505,1.283765979718992,1.286053176302796,1.2883426635189414,1.2906344436615012,1.2929285190268465,1.2952248919136478,1.2975235646228773,1.2998245394578127,1.3021278187240377,1.3044334047294455,1.3067412997842403,1.3090515062009396,1.3113640262943775,1.3136788623817068,1.3159960167824,1.3183154918182534,1.3206372898133873,1.322961413094251,1.3252878639896235,1.3276166448306155,1.3299477579506722,1.3322812056855766,1.3346169903734504,1.3369551143547571,1.3392955799723043,1.3416383895712454,1.343983545499083,1.346331050105671,1.3486809057432154,1.3510331147662797,1.353387679531784,1.3557446023990098,1.358103885729601,1.3604655318875665,1.3628295432392838,1.3651959221534988,1.3675646710013307,1.3699357921562731,1.372309287994197,1.3746851608933524,1.3770634132343713,1.3794440474002696,1.3818270657764504,1.3842124707507055,1.386600264713218,1.3889904500565649,1.391383029175719,1.393778004468052,1.3961753783333368,1.3985751531737496,1.4009773313938716,1.403381915400693,1.4057889076036145,1.4081983104144498,1.4106101262474282,1.4130243575191959,1.4154410066488203,1.4178600760577917,1.420281568170025,1.4227054854118626,1.4251318302120768,1.427560605001873,1.4299918122148911,1.4324254542872077,1.4348615336573407,1.4373000527662478,1.4397410140573337,1.4421844199764486,1.4446302729718932,1.4470785754944195,1.4495293299972343,1.4519825389360008,1.4544382047688424,1.4568963299563435,1.459356916961554,1.4618199682499882,1.4642854862896322,1.4667534735509422,1.4692239325068492,1.4716968656327611,1.474172275406564,1.476650164308626,1.4791305348218,1.4816133894314247,1.484098730625328,1.4865865608938291,1.4890768827297425,1.4915696986283775,1.4940650110875437,1.496562822607552,1.499063135691217,1.5015659528438603,1.5040712765733124,1.5065791093899157,1.5090894538065256,1.5116023123385154,1.5141176875037774,1.516635581822725,1.5191559978182965,1.5216789380159557,1.524204404943697,1.5267324011320458,1.5292629291140625,1.5317959914253438,1.5343315906040256,1.5368697291907867,1.5394104097288492,1.541953634763983,1.544499406844508,1.547047728521295,1.5495986023477704,1.5521520308799175,1.55470801667628,1.5572665622979633,1.559827670308638,1.562391343274542,1.564957583764484,1.5675263943498448,1.5700977776045804,1.5726717361052247,1.575248272430892,1.57782738916328,1.5804090888866713,1.5829933741879374,1.5855802476565395,1.5881697118845333,1.5907617694665699,1.5933564229998989,1.5959536750843712,1.5985535283224415,1.6011559853191706,1.6037610486822282,1.6063687210218964,1.6089790049510708,1.6115919030852637,1.6142074180426071,1.6168255524438553,1.619446308912387,1.6220696900742082,1.624695698557955,1.6273243369948958,1.6299556080189346,1.6325895142666131,1.6352260583771139,1.6378652429922615,1.6405070707565272,1.643151544317031,1.645798666323544,1.6484484394284893,1.6511008662869486,1.6537559495566616,1.6564136918980301,1.6590740959741201,1.6617371644506647,1.6644028999960665,1.6670713052814006,1.6697423829804179,1.6724161357695464,1.6750925663278944,1.6777716773372535,1.6804534714821013,1.683137951449604,1.685825119929619,1.688514979614697,1.6912075332000855,1.6939027833837321,1.6966007328662855,1.6993013843510996,1.7020047405442351,1.7047108041544636,1.707419577893269,1.7101310644748513,1.7128452666161285,1.7155621870367388,1.718281828459045],"x":[5.551115123125783e-17,0.0010010010010010565,0.0020020020020020575,0.003003003003003058,0.0040040040040040595,0.0050050050050050605,0.0060060060060060615,0.0070070070070070625,0.008008008008008063,0.009009009009009064,0.010010010010010065,0.011011011011011066,0.012012012012012067,0.013013013013013068,0.01401401401401407,0.01501501501501507,0.016016016016016068,0.01701701701701707,0.01801801801801807,0.019019019019019073,0.020020020020020072,0.021021021021021075,0.022022022022022074,0.023023023023023077,0.024024024024024076,0.02502502502502508,0.026026026026026078,0.02702702702702708,0.02802802802802808,0.029029029029029083,0.030030030030030082,0.031031031031031085,0.03203203203203209,0.033033033033033087,0.03403403403403409,0.03503503503503509,0.03603603603603609,0.03703703703703709,0.0380380380380381,0.039039039039039096,0.04004004004004009,0.04104104104104109,0.042042042042042094,0.04304304304304309,0.04404404404404409,0.04504504504504509,0.0460460460460461,0.0470470470470471,0.048048048048048096,0.049049049049049095,0.0500500500500501,0.0510510510510511,0.0520520520520521,0.0530530530530531,0.054054054054054106,0.055055055055055105,0.056056056056056104,0.0570570570570571,0.05805805805805811,0.05905905905905911,0.06006006006006011,0.061061061061061114,0.062062062062062114,0.06306306306306311,0.06406406406406412,0.06506506506506513,0.06606606606606612,0.06706706706706712,0.06806806806806813,0.06906906906906912,0.07007007007007013,0.07107107107107113,0.07207207207207213,0.07307307307307313,0.07407407407407413,0.07507507507507513,0.07607607607607614,0.07707707707707713,0.07807807807807814,0.07907907907907914,0.08008008008008013,0.08108108108108114,0.08208208208208213,0.08308308308308314,0.08408408408408415,0.08508508508508514,0.08608608608608614,0.08708708708708715,0.08808808808808814,0.08908908908908915,0.09009009009009014,0.09109109109109115,0.09209209209209215,0.09309309309309315,0.09409409409409415,0.09509509509509516,0.09609609609609615,0.09709709709709716,0.09809809809809815,0.09909909909909916,0.10010010010010016,0.10110110110110115,0.10210210210210216,0.10310310310310317,0.10410410410410414,0.10510510510510515,0.10610610610610614,0.10710710710710715,0.10810810810810816,0.10910910910910915,0.11011011011011015,0.11111111111111116,0.11211211211211215,0.11311311311311316,0.11411411411411415,0.11511511511511516,0.11611611611611616,0.11711711711711716,0.11811811811811816,0.11911911911911917,0.12012012012012016,0.12112112112112117,0.12212212212212216,0.12312312312312317,0.12412412412412417,0.12512512512512516,0.12612612612612617,0.12712712712712718,0.12812812812812818,0.1291291291291292,0.1301301301301302,0.1311311311311312,0.13213213213213218,0.13313313313313319,0.1341341341341342,0.1351351351351352,0.1361361361361362,0.13713713713713718,0.1381381381381382,0.1391391391391392,0.1401401401401402,0.1411411411411412,0.14214214214214219,0.1431431431431432,0.1441441441441442,0.1451451451451452,0.1461461461461462,0.14714714714714722,0.1481481481481482,0.1491491491491492,0.1501501501501502,0.15115115115115121,0.15215215215215222,0.1531531531531532,0.1541541541541542,0.1551551551551552,0.15615615615615622,0.15715715715715722,0.1581581581581582,0.1591591591591592,0.16016016016016021,0.16116116116116122,0.16216216216216223,0.16316316316316323,0.1641641641641642,0.16516516516516522,0.16616616616616622,0.16716716716716723,0.16816816816816824,0.16916916916916921,0.17017017017017022,0.17117117117117123,0.17217217217217223,0.17317317317317324,0.17417417417417422,0.17517517517517522,0.17617617617617623,0.17717717717717724,0.17817817817817824,0.17917917917917925,0.18018018018018023,0.18118118118118123,0.18218218218218224,0.18318318318318325,0.18418418418418425,0.18518518518518523,0.18618618618618624,0.18718718718718724,0.18818818818818825,0.18918918918918926,0.19019019019019023,0.19119119119119124,0.19219219219219225,0.19319319319319325,0.19419419419419426,0.19519519519519526,0.19619619619619624,0.19719719719719725,0.19819819819819826,0.19919919919919926,0.20020020020020027,0.20120120120120125,0.20220220220220225,0.20320320320320326,0.20420420420420426,0.20520520520520527,0.20620620620620625,0.20720720720720726,0.20820820820820826,0.20920920920920927,0.21021021021021027,0.21121121121121128,0.21221221221221226,0.21321321321321327,0.21421421421421427,0.21521521521521528,0.21621621621621628,0.21721721721721726,0.21821821821821827,0.21921921921921927,0.22022022022022028,0.2212212212212213,0.22222222222222227,0.22322322322322327,0.22422422422422428,0.22522522522522528,0.2262262262262263,0.2272272272272273,0.22822822822822827,0.22922922922922928,0.2302302302302303,0.2312312312312313,0.23223223223223227,0.23323323323323325,0.23423423423423426,0.23523523523523526,0.23623623623623627,0.23723723723723728,0.23823823823823825,0.23923923923923926,0.24024024024024027,0.24124124124124127,0.24224224224224228,0.24324324324324328,0.24424424424424426,0.24524524524524527,0.24624624624624628,0.24724724724724728,0.2482482482482483,0.24924924924924927,0.2502502502502503,0.2512512512512513,0.2522522522522523,0.25325325325325326,0.2542542542542543,0.2552552552552553,0.2562562562562563,0.2572572572572573,0.2582582582582583,0.2592592592592593,0.26026026026026033,0.2612612612612613,0.26226226226226235,0.2632632632632633,0.2642642642642643,0.26526526526526534,0.2662662662662663,0.26726726726726735,0.26826826826826833,0.2692692692692693,0.27027027027027034,0.2712712712712713,0.27227227227227235,0.27327327327327333,0.2742742742742743,0.27527527527527534,0.2762762762762763,0.27727727727727736,0.27827827827827833,0.2792792792792793,0.28028028028028035,0.2812812812812813,0.28228228228228236,0.28328328328328334,0.2842842842842843,0.28528528528528535,0.28628628628628633,0.28728728728728736,0.28828828828828834,0.2892892892892893,0.29029029029029035,0.29129129129129133,0.29229229229229237,0.29329329329329334,0.2942942942942944,0.29529529529529536,0.29629629629629634,0.29729729729729737,0.29829829829829835,0.2992992992992994,0.30030030030030036,0.30130130130130134,0.3023023023023024,0.30330330330330335,0.3043043043043044,0.30530530530530536,0.30630630630630634,0.3073073073073074,0.30830830830830835,0.3093093093093094,0.31031031031031037,0.31131131131131135,0.3123123123123124,0.31331331331331336,0.3143143143143144,0.31531531531531537,0.31631631631631635,0.3173173173173174,0.31831831831831836,0.3193193193193194,0.3203203203203204,0.32132132132132135,0.3223223223223224,0.32332332332332336,0.3243243243243244,0.3253253253253254,0.3263263263263264,0.3273273273273274,0.32832832832832837,0.3293293293293294,0.3303303303303304,0.3313313313313314,0.3323323323323324,0.33333333333333337,0.3343343343343344,0.3353353353353354,0.3363363363363364,0.3373373373373374,0.3383383383383384,0.3393393393393394,0.3403403403403404,0.3413413413413414,0.3423423423423424,0.3433433433433434,0.3443443443443444,0.3453453453453454,0.3463463463463464,0.3473473473473474,0.3483483483483484,0.3493493493493494,0.3503503503503504,0.3513513513513514,0.3523523523523524,0.3533533533533534,0.3543543543543544,0.3553553553553554,0.35635635635635643,0.3573573573573574,0.35835835835835844,0.3593593593593594,0.3603603603603604,0.36136136136136143,0.3623623623623624,0.36336336336336345,0.3643643643643644,0.3653653653653654,0.36636636636636644,0.3673673673673674,0.36836836836836845,0.3693693693693694,0.3703703703703704,0.37137137137137144,0.3723723723723724,0.37337337337337345,0.37437437437437443,0.3753753753753754,0.37637637637637644,0.3773773773773774,0.37837837837837845,0.37937937937937943,0.3803803803803804,0.38138138138138145,0.3823823823823824,0.38338338338338346,0.38438438438438444,0.3853853853853854,0.38638638638638645,0.3873873873873874,0.38838838838838846,0.38938938938938944,0.3903903903903905,0.39139139139139145,0.39239239239239243,0.39339339339339346,0.39439439439439444,0.3953953953953955,0.39639639639639646,0.39739739739739743,0.39839839839839847,0.39939939939939945,0.4004004004004005,0.40140140140140146,0.40240240240240244,0.40340340340340347,0.40440440440440445,0.4054054054054055,0.40640640640640646,0.40740740740740744,0.4084084084084085,0.40940940940940945,0.4104104104104105,0.41141141141141147,0.41241241241241244,0.4134134134134135,0.41441441441441446,0.4154154154154155,0.41641641641641647,0.41741741741741745,0.4184184184184185,0.41941941941941946,0.4204204204204205,0.42142142142142147,0.4224224224224225,0.4234234234234235,0.42442442442442446,0.4254254254254255,0.4264264264264265,0.4274274274274275,0.4284284284284285,0.42942942942942947,0.4304304304304305,0.4314314314314315,0.4324324324324325,0.4334334334334335,0.43443443443443447,0.4354354354354355,0.4364364364364365,0.4374374374374375,0.4384384384384385,0.43943943943943947,0.4404404404404405,0.4414414414414415,0.4424424424424425,0.4434434434434435,0.4444444444444445,0.4454454454454455,0.4464464464464465,0.4474474474474475,0.4484484484484485,0.44944944944944953,0.4504504504504505,0.4514514514514515,0.4524524524524525,0.4534534534534535,0.45445445445445454,0.4554554554554555,0.4564564564564565,0.45745745745745753,0.4584584584584585,0.45945945945945954,0.4604604604604605,0.4614614614614615,0.46246246246246253,0.4634634634634635,0.46446446446446454,0.4654654654654655,0.4664664664664665,0.46746746746746753,0.4684684684684685,0.46946946946946955,0.4704704704704705,0.4714714714714715,0.47247247247247254,0.4734734734734735,0.47447447447447455,0.47547547547547553,0.4764764764764765,0.47747747747747754,0.4784784784784785,0.47947947947947955,0.48048048048048053,0.48148148148148157,0.48248248248248254,0.4834834834834835,0.48448448448448456,0.48548548548548554,0.48648648648648657,0.4874874874874875,0.48848848848848847,0.4894894894894895,0.4904904904904905,0.4914914914914915,0.4924924924924925,0.4934934934934935,0.4944944944944945,0.4954954954954955,0.4964964964964965,0.4974974974974975,0.4984984984984985,0.4994994994994995,0.5005005005005005,0.5015015015015015,0.5025025025025025,0.5035035035035035,0.5045045045045045,0.5055055055055055,0.5065065065065065,0.5075075075075075,0.5085085085085085,0.5095095095095095,0.5105105105105106,0.5115115115115115,0.5125125125125125,0.5135135135135135,0.5145145145145145,0.5155155155155156,0.5165165165165165,0.5175175175175175,0.5185185185185185,0.5195195195195195,0.5205205205205206,0.5215215215215215,0.5225225225225225,0.5235235235235235,0.5245245245245245,0.5255255255255256,0.5265265265265265,0.5275275275275275,0.5285285285285285,0.5295295295295295,0.5305305305305306,0.5315315315315315,0.5325325325325325,0.5335335335335335,0.5345345345345346,0.5355355355355356,0.5365365365365365,0.5375375375375375,0.5385385385385385,0.5395395395395396,0.5405405405405406,0.5415415415415415,0.5425425425425425,0.5435435435435435,0.5445445445445446,0.5455455455455456,0.5465465465465466,0.5475475475475475,0.5485485485485485,0.5495495495495496,0.5505505505505506,0.5515515515515516,0.5525525525525525,0.5535535535535535,0.5545545545545546,0.5555555555555556,0.5565565565565566,0.5575575575575575,0.5585585585585585,0.5595595595595596,0.5605605605605606,0.5615615615615616,0.5625625625625625,0.5635635635635635,0.5645645645645646,0.5655655655655656,0.5665665665665666,0.5675675675675675,0.5685685685685685,0.5695695695695696,0.5705705705705706,0.5715715715715716,0.5725725725725725,0.5735735735735735,0.5745745745745746,0.5755755755755756,0.5765765765765766,0.5775775775775776,0.5785785785785785,0.5795795795795796,0.5805805805805806,0.5815815815815816,0.5825825825825826,0.5835835835835835,0.5845845845845846,0.5855855855855856,0.5865865865865866,0.5875875875875876,0.5885885885885885,0.5895895895895896,0.5905905905905906,0.5915915915915916,0.5925925925925926,0.5935935935935935,0.5945945945945946,0.5955955955955956,0.5965965965965966,0.5975975975975976,0.5985985985985987,0.5995995995995996,0.6006006006006006,0.6016016016016016,0.6026026026026026,0.6036036036036037,0.6046046046046046,0.6056056056056056,0.6066066066066066,0.6076076076076076,0.6086086086086087,0.6096096096096096,0.6106106106106106,0.6116116116116116,0.6126126126126126,0.6136136136136137,0.6146146146146146,0.6156156156156156,0.6166166166166166,0.6176176176176176,0.6186186186186187,0.6196196196196196,0.6206206206206206,0.6216216216216216,0.6226226226226226,0.6236236236236237,0.6246246246246246,0.6256256256256256,0.6266266266266266,0.6276276276276276,0.6286286286286287,0.6296296296296297,0.6306306306306306,0.6316316316316316,0.6326326326326326,0.6336336336336337,0.6346346346346347,0.6356356356356356,0.6366366366366366,0.6376376376376376,0.6386386386386387,0.6396396396396397,0.6406406406406406,0.6416416416416416,0.6426426426426426,0.6436436436436437,0.6446446446446447,0.6456456456456456,0.6466466466466466,0.6476476476476476,0.6486486486486487,0.6496496496496497,0.6506506506506506,0.6516516516516516,0.6526526526526526,0.6536536536536537,0.6546546546546547,0.6556556556556556,0.6566566566566566,0.6576576576576577,0.6586586586586587,0.6596596596596597,0.6606606606606606,0.6616616616616616,0.6626626626626627,0.6636636636636637,0.6646646646646647,0.6656656656656657,0.6666666666666666,0.6676676676676677,0.6686686686686687,0.6696696696696697,0.6706706706706707,0.6716716716716716,0.6726726726726727,0.6736736736736737,0.6746746746746747,0.6756756756756757,0.6766766766766766,0.6776776776776777,0.6786786786786787,0.6796796796796797,0.6806806806806807,0.6816816816816816,0.6826826826826827,0.6836836836836837,0.6846846846846847,0.6856856856856857,0.6866866866866866,0.6876876876876877,0.6886886886886887,0.6896896896896897,0.6906906906906907,0.6916916916916916,0.6926926926926927,0.6936936936936937,0.6946946946946947,0.6956956956956957,0.6966966966966966,0.6976976976976977,0.6986986986986987,0.6996996996996997,0.7007007007007007,0.7017017017017017,0.7027027027027027,0.7037037037037037,0.7047047047047047,0.7057057057057057,0.7067067067067067,0.7077077077077077,0.7087087087087087,0.7097097097097097,0.7107107107107107,0.7117117117117117,0.7127127127127127,0.7137137137137137,0.7147147147147147,0.7157157157157157,0.7167167167167167,0.7177177177177178,0.7187187187187187,0.7197197197197197,0.7207207207207207,0.7217217217217218,0.7227227227227228,0.7237237237237237,0.7247247247247247,0.7257257257257257,0.7267267267267268,0.7277277277277278,0.7287287287287287,0.7297297297297297,0.7307307307307307,0.7317317317317318,0.7327327327327328,0.7337337337337337,0.7347347347347347,0.7357357357357357,0.7367367367367368,0.7377377377377378,0.7387387387387387,0.7397397397397397,0.7407407407407407,0.7417417417417418,0.7427427427427428,0.7437437437437437,0.7447447447447447,0.7457457457457457,0.7467467467467468,0.7477477477477478,0.7487487487487487,0.7497497497497497,0.7507507507507507,0.7517517517517518,0.7527527527527528,0.7537537537537538,0.7547547547547547,0.7557557557557557,0.7567567567567568,0.7577577577577578,0.7587587587587588,0.7597597597597597,0.7607607607607607,0.7617617617617618,0.7627627627627628,0.7637637637637638,0.7647647647647647,0.7657657657657657,0.7667667667667668,0.7677677677677678,0.7687687687687688,0.7697697697697697,0.7707707707707707,0.7717717717717718,0.7727727727727728,0.7737737737737738,0.7747747747747747,0.7757757757757757,0.7767767767767768,0.7777777777777778,0.7787787787787788,0.7797797797797797,0.7807807807807807,0.7817817817817818,0.7827827827827828,0.7837837837837838,0.7847847847847848,0.7857857857857858,0.7867867867867868,0.7877877877877878,0.7887887887887888,0.7897897897897898,0.7907907907907908,0.7917917917917918,0.7927927927927928,0.7937937937937938,0.7947947947947948,0.7957957957957958,0.7967967967967968,0.7977977977977978,0.7987987987987988,0.7997997997997998,0.8008008008008008,0.8018018018018018,0.8028028028028028,0.8038038038038038,0.8048048048048048,0.8058058058058059,0.8068068068068068,0.8078078078078078,0.8088088088088088,0.8098098098098098,0.8108108108108109,0.8118118118118118,0.8128128128128128,0.8138138138138138,0.8148148148148148,0.8158158158158159,0.8168168168168168,0.8178178178178178,0.8188188188188188,0.8198198198198198,0.8208208208208209,0.8218218218218218,0.8228228228228228,0.8238238238238238,0.8248248248248248,0.8258258258258259,0.8268268268268268,0.8278278278278278,0.8288288288288288,0.8298298298298298,0.8308308308308309,0.8318318318318318,0.8328328328328328,0.8338338338338338,0.8348348348348348,0.8358358358358359,0.8368368368368369,0.8378378378378378,0.8388388388388388,0.8398398398398398,0.8408408408408409,0.8418418418418419,0.8428428428428428,0.8438438438438438,0.8448448448448449,0.8458458458458459,0.8468468468468469,0.8478478478478478,0.8488488488488488,0.8498498498498499,0.8508508508508509,0.8518518518518519,0.8528528528528528,0.8538538538538538,0.8548548548548549,0.8558558558558559,0.8568568568568569,0.8578578578578578,0.8588588588588588,0.8598598598598599,0.8608608608608609,0.8618618618618619,0.8628628628628628,0.8638638638638638,0.8648648648648649,0.8658658658658659,0.8668668668668669,0.8678678678678678,0.8688688688688688,0.8698698698698699,0.8708708708708709,0.8718718718718719,0.8728728728728729,0.8738738738738738,0.8748748748748749,0.8758758758758759,0.8768768768768769,0.8778778778778779,0.8788788788788788,0.8798798798798799,0.8808808808808809,0.8818818818818819,0.8828828828828829,0.8838838838838838,0.8848848848848849,0.8858858858858859,0.8868868868868869,0.8878878878878879,0.8888888888888888,0.8898898898898899,0.8908908908908909,0.8918918918918919,0.8928928928928929,0.8938938938938938,0.8948948948948949,0.8958958958958959,0.8968968968968969,0.8978978978978979,0.8988988988988988,0.8998998998998999,0.9009009009009009,0.9019019019019019,0.9029029029029029,0.9039039039039038,0.9049049049049049,0.9059059059059059,0.9069069069069069,0.9079079079079079,0.908908908908909,0.9099099099099099,0.9109109109109109,0.9119119119119119,0.9129129129129129,0.913913913913914,0.914914914914915,0.9159159159159159,0.9169169169169169,0.9179179179179179,0.918918918918919,0.91991991991992,0.9209209209209209,0.9219219219219219,0.9229229229229229,0.923923923923924,0.924924924924925,0.9259259259259259,0.9269269269269269,0.9279279279279279,0.928928928928929,0.92992992992993,0.9309309309309309,0.9319319319319319,0.9329329329329329,0.933933933933934,0.934934934934935,0.9359359359359359,0.9369369369369369,0.9379379379379379,0.938938938938939,0.93993993993994,0.9409409409409409,0.9419419419419419,0.9429429429429429,0.943943943943944,0.944944944944945,0.9459459459459459,0.9469469469469469,0.9479479479479479,0.948948948948949,0.94994994994995,0.950950950950951,0.9519519519519519,0.9529529529529529,0.953953953953954,0.954954954954955,0.955955955955956,0.9569569569569569,0.9579579579579579,0.958958958958959,0.95995995995996,0.960960960960961,0.9619619619619619,0.9629629629629629,0.963963963963964,0.964964964964965,0.965965965965966,0.9669669669669669,0.9679679679679679,0.968968968968969,0.96996996996997,0.970970970970971,0.9719719719719719,0.972972972972973,0.973973973973974,0.974974974974975,0.975975975975976,0.9769769769769769,0.977977977977978,0.978978978978979,0.97997997997998,0.980980980980981,0.9819819819819819,0.982982982982983,0.983983983983984,0.984984984984985,0.985985985985986,0.986986986986987,0.987987987987988,0.988988988988989,0.98998998998999,0.990990990990991,0.991991991991992,0.992992992992993,0.993993993993994,0.994994994994995,0.995995995995996,0.996996996996997,0.997997997997998,0.998998998998999,1.0]}

},{}],115:[function(require,module,exports){
module.exports={"expected":[-5.551115123125783e-17,-5.5400017795359415e-17,-5.5288884359461e-17,-5.5177750923562586e-17,-5.506661748766417e-17,-5.4955484051765757e-17,-5.4844350615867345e-17,-5.473321717996893e-17,-5.4622083744070516e-17,-5.45109503081721e-17,-5.4399816872273687e-17,-5.4288683436375275e-17,-5.417755000047686e-17,-5.4066416564578446e-17,-5.395528312868003e-17,-5.3844149692781617e-17,-5.37330162568832e-17,-5.362188282098479e-17,-5.3510749385086376e-17,-5.339961594918796e-17,-5.3288482513289546e-17,-5.317734907739113e-17,-5.306621564149272e-17,-5.2955082205594306e-17,-5.284394876969589e-17,-5.2732815333797476e-17,-5.262168189789906e-17,-5.251054846200065e-17,-5.2399415026102235e-17,-5.228828159020382e-17,-5.2177148154305406e-17,-5.206601471840699e-17,-5.1954881282508577e-17,-5.1843747846610165e-17,-5.173261441071175e-17,-5.1621480974813336e-17,-5.151034753891492e-17,-5.1399214103016507e-17,-5.1288080667118095e-17,-5.117694723121968e-17,-5.1065813795321266e-17,-5.095468035942285e-17,-5.0843546923524437e-17,-5.0732413487626025e-17,-5.062128005172761e-17,-5.0510146615829196e-17,-5.039901317993078e-17,-5.0287879744032366e-17,-5.017674630813395e-17,-5.006561287223554e-17,-4.9954479436337126e-17,-4.984334600043871e-17,-4.9732212564540296e-17,-4.962107912864188e-17,-4.950994569274347e-17,-4.9398812256845055e-17,-4.928767882094664e-17,-4.9176545385048226e-17,-4.906541194914981e-17,-4.8954278513251397e-17,-4.8843145077352985e-17,-4.873201164145457e-17,-4.8620878205556156e-17,-4.850974476965774e-17,-4.8398611333759327e-17,-4.8287477897860915e-17,-4.81763444619625e-17,-4.8065211026064086e-17,-4.795407759016567e-17,-4.7842944154267257e-17,-4.7731810718368845e-17,-4.762067728247043e-17,-4.7509543846572016e-17,-4.73984104106736e-17,-4.7287276974775186e-17,-4.7176143538876775e-17,-4.706501010297836e-17,-4.6953876667079946e-17,-4.684274323118153e-17,-4.6731609795283116e-17,-4.66204763593847e-17,-4.650934292348629e-17,-4.6398209487587875e-17,-4.628707605168946e-17,-4.6175942615791046e-17,-4.606480917989263e-17,-4.5953675743994217e-17,-4.5842542308095805e-17,-4.573140887219739e-17,-4.5620275436298976e-17,-4.550914200040056e-17,-4.5398008564502147e-17,-4.5286875128603735e-17,-4.517574169270532e-17,-4.5064608256806906e-17,-4.495347482090849e-17,-4.4842341385010077e-17,-4.4731207949111665e-17,-4.462007451321325e-17,-4.4508941077314836e-17,-4.439780764141642e-17,-4.4286674205518006e-17,-4.4175540769619595e-17,-4.406440733372118e-17,-4.3953273897822766e-17,-4.384214046192435e-17,-4.3731007026025936e-17,-4.3619873590127525e-17,-4.350874015422911e-17,-4.3397606718330695e-17,-4.328647328243228e-17,-4.3175339846533866e-17,-4.306420641063545e-17,-4.2953072974737037e-17,-4.2841939538838625e-17,-4.273080610294021e-17,-4.2619672667041796e-17,-4.250853923114338e-17,-4.2397405795244967e-17,-4.2286272359346555e-17,-4.217513892344814e-17,-4.2064005487549726e-17,-4.195287205165131e-17,-4.1841738615752897e-17,-4.1730605179854485e-17,-4.161947174395607e-17,-4.1508338308057656e-17,-4.139720487215924e-17,-4.1286071436260826e-17,-4.1174938000362415e-17,-4.1063804564464e-17,-4.0952671128565586e-17,-4.084153769266717e-17,-4.0730404256768756e-17,-4.0619270820870345e-17,-4.050813738497193e-17,-4.0397003949073515e-17,-4.02858705131751e-17,-4.0174737077276686e-17,-4.0063603641378275e-17,-3.9952470205479857e-17,-3.9841336769581445e-17,-3.973020333368303e-17,-3.9619069897784616e-17,-3.95079364618862e-17,-3.9396803025987787e-17,-3.9285669590089375e-17,-3.917453615419096e-17,-3.9063402718292546e-17,-3.895226928239413e-17,-3.8841135846495717e-17,-3.8730002410597305e-17,-3.861886897469889e-17,-3.8507735538800476e-17,-3.839660210290206e-17,-3.8285468667003646e-17,-3.8174335231105235e-17,-3.806320179520682e-17,-3.7952068359308406e-17,-3.784093492340999e-17,-3.7729801487511576e-17,-3.7618668051613165e-17,-3.750753461571475e-17,-3.7396401179816335e-17,-3.728526774391792e-17,-3.7174134308019506e-17,-3.7063000872121095e-17,-3.6951867436222677e-17,-3.6840734000324265e-17,-3.672960056442585e-17,-3.6618467128527436e-17,-3.6507333692629024e-17,-3.6396200256730607e-17,-3.6285066820832195e-17,-3.617393338493378e-17,-3.6062799949035366e-17,-3.595166651313695e-17,-3.5840533077238537e-17,-3.5729399641340125e-17,-3.561826620544171e-17,-3.5507132769543296e-17,-3.539599933364488e-17,-3.5284865897746466e-17,-3.5173732461848055e-17,-3.506259902594964e-17,-3.4951465590051226e-17,-3.484033215415281e-17,-3.4729198718254396e-17,-3.4618065282355985e-17,-3.450693184645757e-17,-3.4395798410559155e-17,-3.428466497466074e-17,-3.4173531538762326e-17,-3.4062398102863915e-17,-3.3951264666965497e-17,-3.3840131231067085e-17,-3.372899779516867e-17,-3.3617864359270256e-17,-3.3506730923371844e-17,-3.3395597487473427e-17,-3.3284464051575015e-17,-3.31733306156766e-17,-3.3062197179778186e-17,-3.295106374387977e-17,-3.2839930307981357e-17,-3.2728796872082945e-17,-3.261766343618453e-17,-3.2506530000286116e-17,-3.23953965643877e-17,-3.2284263128489286e-17,-3.2173129692590875e-17,-3.206199625669246e-17,-3.1950862820794046e-17,-3.183972938489563e-17,-3.1728595948997216e-17,-3.1617462513098805e-17,-3.150632907720039e-17,-3.1395195641301975e-17,-3.128406220540356e-17,-3.1172928769505146e-17,-3.1061795333606735e-17,-3.0950661897708317e-17,-3.0839528461809905e-17,-3.072839502591149e-17,-3.0617261590013076e-17,-3.0506128154114664e-17,-3.0394994718216247e-17,-3.0283861282317835e-17,-3.017272784641942e-17,-3.0061594410521006e-17,-2.9950460974622594e-17,-2.9839327538724177e-17,-2.9728194102825765e-17,-2.961706066692735e-17,-2.9505927231028936e-17,-2.939479379513052e-17,-2.9283660359232106e-17,-2.9172526923333695e-17,-2.906139348743528e-17,-2.8950260051536866e-17,-2.883912661563845e-17,-2.8727993179740036e-17,-2.8616859743841625e-17,-2.850572630794321e-17,-2.8394592872044795e-17,-2.828345943614638e-17,-2.8172326000247966e-17,-2.8061192564349555e-17,-2.7950059128451137e-17,-2.7838925692552725e-17,-2.772779225665431e-17,-2.7616658820755896e-17,-2.750552538485748e-17,-2.7394391948959067e-17,-2.7283258513060655e-17,-2.717212507716224e-17,-2.7060991641263826e-17,-2.694985820536541e-17,-2.6838724769466997e-17,-2.6727591333568582e-17,-2.661645789767017e-17,-2.6505324461771756e-17,-2.639419102587334e-17,-2.6283057589974926e-17,-2.6171924154076512e-17,-2.60607907181781e-17,-2.5949657282279686e-17,-2.583852384638127e-17,-2.5727390410482856e-17,-2.5616256974584442e-17,-2.550512353868603e-17,-2.5393990102787615e-17,-2.52828566668892e-17,-2.5171723230990786e-17,-2.506058979509237e-17,-2.4949456359193957e-17,-2.4838322923295545e-17,-2.472718948739713e-17,-2.4616056051498716e-17,-2.45049226156003e-17,-2.4393789179701887e-17,-2.4282655743803475e-17,-2.417152230790506e-17,-2.4060388872006646e-17,-2.394925543610823e-17,-2.3838122000209817e-17,-2.3726988564311405e-17,-2.361585512841299e-17,-2.3504721692514576e-17,-2.339358825661616e-17,-2.3282454820717746e-17,-2.3171321384819332e-17,-2.306018794892092e-17,-2.2949054513022506e-17,-2.283792107712409e-17,-2.2726787641225676e-17,-2.2615654205327262e-17,-2.250452076942885e-17,-2.2393387333530435e-17,-2.228225389763202e-17,-2.2171120461733606e-17,-2.205998702583519e-17,-2.194885358993678e-17,-2.1837720154038365e-17,-2.172658671813995e-17,-2.1615453282241536e-17,-2.150431984634312e-17,-2.1393186410444707e-17,-2.1282052974546295e-17,-2.117091953864788e-17,-2.1059786102749466e-17,-2.094865266685105e-17,-2.0837519230952637e-17,-2.0726385795054225e-17,-2.061525235915581e-17,-2.0504118923257396e-17,-2.039298548735898e-17,-2.0281852051460566e-17,-2.0170718615562155e-17,-2.005958517966374e-17,-1.9948451743765326e-17,-1.983731830786691e-17,-1.9726184871968496e-17,-1.9615051436070082e-17,-1.950391800017167e-17,-1.9392784564273255e-17,-1.928165112837484e-17,-1.9170517692476426e-17,-1.905938425657801e-17,-1.89482508206796e-17,-1.8837117384781185e-17,-1.872598394888277e-17,-1.8614850512984356e-17,-1.850371707708594e-17,-1.839258364118753e-17,-1.8281450205289115e-17,-1.81703167693907e-17,-1.8059183333492286e-17,-1.794804989759387e-17,-1.7836916461695457e-17,-1.7725783025797045e-17,-1.761464958989863e-17,-1.7503516154000216e-17,-1.73923827181018e-17,-1.7281249282203386e-17,-1.7170115846304975e-17,-1.705898241040656e-17,-1.6947848974508146e-17,-1.683671553860973e-17,-1.6725582102711316e-17,-1.6614448666812905e-17,-1.650331523091449e-17,-1.6392181795016075e-17,-1.628104835911766e-17,-1.6169914923219246e-17,-1.605878148732083e-17,-1.594764805142242e-17,-1.5836514615524005e-17,-1.572538117962559e-17,-1.5614247743727176e-17,-1.550311430782876e-17,-1.539198087193035e-17,-1.5280847436031935e-17,-1.516971400013352e-17,-1.5058580564235106e-17,-1.494744712833669e-17,-1.483631369243828e-17,-1.4725180256539865e-17,-1.461404682064145e-17,-1.4502913384743036e-17,-1.439177994884462e-17,-1.4280646512946206e-17,-1.4169513077047795e-17,-1.405837964114938e-17,-1.3947246205250966e-17,-1.3836112769352551e-17,-1.3724979333454138e-17,-1.3613845897555723e-17,-1.350271246165731e-17,-1.3391579025758895e-17,-1.328044558986048e-17,-1.3169312153962068e-17,-1.3058178718063653e-17,-1.2947045282165238e-17,-1.2835911846266825e-17,-1.272477841036841e-17,-1.2613644974469997e-17,-1.2502511538571583e-17,-1.2391378102673168e-17,-1.2280244666774755e-17,-1.216911123087634e-17,-1.2057977794977926e-17,-1.1946844359079513e-17,-1.1835710923181098e-17,-1.1724577487282685e-17,-1.161344405138427e-17,-1.1502310615485856e-17,-1.1391177179587443e-17,-1.1280043743689028e-17,-1.1168910307790613e-17,-1.10577768718922e-17,-1.0946643435993786e-17,-1.0835510000095371e-17,-1.0724376564196958e-17,-1.0613243128298543e-17,-1.050210969240013e-17,-1.0390976256501715e-17,-1.02798428206033e-17,-1.0168709384704888e-17,-1.0057575948806473e-17,-9.946442512908058e-18,-9.835309077009645e-18,-9.72417564111123e-18,-9.613042205212817e-18,-9.501908769314403e-18,-9.390775333415988e-18,-9.279641897517575e-18,-9.16850846161916e-18,-9.057375025720746e-18,-8.946241589822333e-18,-8.835108153923918e-18,-8.723974718025505e-18,-8.61284128212709e-18,-8.501707846228676e-18,-8.390574410330263e-18,-8.279440974431848e-18,-8.168307538533433e-18,-8.05717410263502e-18,-7.946040666736606e-18,-7.834907230838192e-18,-7.723773794939778e-18,-7.612640359041363e-18,-7.50150692314295e-18,-7.390373487244535e-18,-7.27924005134612e-18,-7.168106615447708e-18,-7.056973179549293e-18,-6.94583974365088e-18,-6.834706307752465e-18,-6.723572871854051e-18,-6.612439435955637e-18,-6.501306000057223e-18,-6.390172564158809e-18,-6.279039128260395e-18,-6.1679056923619804e-18,-6.0567722564635666e-18,-5.945638820565153e-18,-5.834505384666739e-18,-5.723371948768324e-18,-5.61223851286991e-18,-5.5011050769714964e-18,-5.3899716410730825e-18,-5.278838205174668e-18,-5.167704769276254e-18,-5.05657133337784e-18,-4.945437897479426e-18,-4.834304461581012e-18,-4.723171025682598e-18,-4.612037589784184e-18,-4.50090415388577e-18,-4.389770717987355e-18,-4.2786372820889415e-18,-4.1675038461905276e-18,-4.056370410292114e-18,-3.945236974393699e-18,-3.834103538495285e-18,-3.722970102596871e-18,-3.6118366666984575e-18,-3.500703230800043e-18,-3.389569794901629e-18,-3.278436359003215e-18,-3.167302923104801e-18,-3.056169487206387e-18,-2.9450360513079727e-18,-2.833902615409559e-18,-2.7227691795111445e-18,-2.6116357436127307e-18,-2.5005023077143164e-18,-2.3893688718159025e-18,-2.2782354359174883e-18,-2.1671020000190744e-18,-2.05596856412066e-18,-1.9448351282222463e-18,-1.833701692323832e-18,-1.7225682564254181e-18,-1.611434820527004e-18,-1.50030138462859e-18,-1.389167948730176e-18,-1.2780345128317619e-18,-1.1669010769333478e-18,-1.0557676410349337e-18,-9.446342051365197e-19,-8.335007692381055e-19,-7.223673333396914e-19,-6.112338974412774e-19,-5.001004615428633e-19,-3.8896702564444924e-19,-2.7783358974603517e-19,-1.667001538476211e-19,-5.556671794920703e-20,5.556671794920703e-20,1.667001538476211e-19,2.7783358974603517e-19,3.8896702564444924e-19,5.001004615428633e-19,6.112338974412774e-19,7.223673333396914e-19,8.335007692381055e-19,9.446342051365197e-19,1.0557676410349337e-18,1.1669010769333478e-18,1.2780345128317619e-18,1.389167948730176e-18,1.50030138462859e-18,1.611434820527004e-18,1.7225682564254181e-18,1.833701692323832e-18,1.9448351282222463e-18,2.05596856412066e-18,2.1671020000190744e-18,2.2782354359174883e-18,2.3893688718159025e-18,2.5005023077143164e-18,2.6116357436127307e-18,2.7227691795111445e-18,2.833902615409559e-18,2.9450360513079727e-18,3.056169487206387e-18,3.167302923104801e-18,3.278436359003215e-18,3.389569794901629e-18,3.500703230800043e-18,3.6118366666984575e-18,3.722970102596871e-18,3.834103538495285e-18,3.945236974393699e-18,4.056370410292114e-18,4.1675038461905276e-18,4.2786372820889415e-18,4.389770717987355e-18,4.50090415388577e-18,4.612037589784184e-18,4.723171025682598e-18,4.834304461581012e-18,4.945437897479426e-18,5.05657133337784e-18,5.167704769276254e-18,5.278838205174668e-18,5.3899716410730825e-18,5.5011050769714964e-18,5.61223851286991e-18,5.723371948768324e-18,5.834505384666739e-18,5.945638820565153e-18,6.0567722564635666e-18,6.1679056923619804e-18,6.279039128260395e-18,6.390172564158809e-18,6.501306000057223e-18,6.612439435955637e-18,6.723572871854051e-18,6.834706307752465e-18,6.94583974365088e-18,7.056973179549293e-18,7.168106615447708e-18,7.27924005134612e-18,7.390373487244535e-18,7.50150692314295e-18,7.612640359041363e-18,7.723773794939778e-18,7.834907230838192e-18,7.946040666736606e-18,8.05717410263502e-18,8.168307538533433e-18,8.279440974431848e-18,8.390574410330263e-18,8.501707846228676e-18,8.61284128212709e-18,8.723974718025505e-18,8.835108153923918e-18,8.946241589822333e-18,9.057375025720746e-18,9.16850846161916e-18,9.279641897517575e-18,9.390775333415988e-18,9.501908769314403e-18,9.613042205212817e-18,9.72417564111123e-18,9.835309077009645e-18,9.946442512908058e-18,1.0057575948806473e-17,1.0168709384704888e-17,1.02798428206033e-17,1.0390976256501715e-17,1.050210969240013e-17,1.0613243128298543e-17,1.0724376564196958e-17,1.0835510000095371e-17,1.0946643435993786e-17,1.10577768718922e-17,1.1168910307790613e-17,1.1280043743689028e-17,1.1391177179587443e-17,1.1502310615485856e-17,1.161344405138427e-17,1.1724577487282685e-17,1.1835710923181098e-17,1.1946844359079513e-17,1.2057977794977926e-17,1.216911123087634e-17,1.2280244666774755e-17,1.2391378102673168e-17,1.2502511538571583e-17,1.2613644974469997e-17,1.272477841036841e-17,1.2835911846266825e-17,1.2947045282165238e-17,1.3058178718063653e-17,1.3169312153962068e-17,1.328044558986048e-17,1.3391579025758895e-17,1.350271246165731e-17,1.3613845897555723e-17,1.3724979333454138e-17,1.3836112769352551e-17,1.3947246205250966e-17,1.405837964114938e-17,1.4169513077047795e-17,1.4280646512946206e-17,1.439177994884462e-17,1.4502913384743036e-17,1.461404682064145e-17,1.4725180256539865e-17,1.483631369243828e-17,1.494744712833669e-17,1.5058580564235106e-17,1.516971400013352e-17,1.5280847436031935e-17,1.539198087193035e-17,1.550311430782876e-17,1.5614247743727176e-17,1.572538117962559e-17,1.5836514615524005e-17,1.594764805142242e-17,1.605878148732083e-17,1.6169914923219246e-17,1.628104835911766e-17,1.6392181795016075e-17,1.650331523091449e-17,1.6614448666812905e-17,1.6725582102711316e-17,1.683671553860973e-17,1.6947848974508146e-17,1.705898241040656e-17,1.7170115846304975e-17,1.7281249282203386e-17,1.73923827181018e-17,1.7503516154000216e-17,1.761464958989863e-17,1.7725783025797045e-17,1.7836916461695457e-17,1.794804989759387e-17,1.8059183333492286e-17,1.81703167693907e-17,1.8281450205289115e-17,1.839258364118753e-17,1.850371707708594e-17,1.8614850512984356e-17,1.872598394888277e-17,1.8837117384781185e-17,1.89482508206796e-17,1.905938425657801e-17,1.9170517692476426e-17,1.928165112837484e-17,1.9392784564273255e-17,1.950391800017167e-17,1.9615051436070082e-17,1.9726184871968496e-17,1.983731830786691e-17,1.9948451743765326e-17,2.005958517966374e-17,2.0170718615562155e-17,2.0281852051460566e-17,2.039298548735898e-17,2.0504118923257396e-17,2.061525235915581e-17,2.0726385795054225e-17,2.0837519230952637e-17,2.094865266685105e-17,2.1059786102749466e-17,2.117091953864788e-17,2.1282052974546295e-17,2.1393186410444707e-17,2.150431984634312e-17,2.1615453282241536e-17,2.172658671813995e-17,2.1837720154038365e-17,2.194885358993678e-17,2.205998702583519e-17,2.2171120461733606e-17,2.228225389763202e-17,2.2393387333530435e-17,2.250452076942885e-17,2.2615654205327262e-17,2.2726787641225676e-17,2.283792107712409e-17,2.2949054513022506e-17,2.306018794892092e-17,2.3171321384819332e-17,2.3282454820717746e-17,2.339358825661616e-17,2.3504721692514576e-17,2.361585512841299e-17,2.3726988564311405e-17,2.3838122000209817e-17,2.394925543610823e-17,2.4060388872006646e-17,2.417152230790506e-17,2.4282655743803475e-17,2.4393789179701887e-17,2.45049226156003e-17,2.4616056051498716e-17,2.472718948739713e-17,2.4838322923295545e-17,2.4949456359193957e-17,2.506058979509237e-17,2.5171723230990786e-17,2.52828566668892e-17,2.5393990102787615e-17,2.550512353868603e-17,2.5616256974584442e-17,2.5727390410482856e-17,2.583852384638127e-17,2.5949657282279686e-17,2.60607907181781e-17,2.6171924154076512e-17,2.6283057589974926e-17,2.639419102587334e-17,2.6505324461771756e-17,2.661645789767017e-17,2.6727591333568582e-17,2.6838724769466997e-17,2.694985820536541e-17,2.7060991641263826e-17,2.717212507716224e-17,2.7283258513060655e-17,2.7394391948959067e-17,2.750552538485748e-17,2.7616658820755896e-17,2.772779225665431e-17,2.7838925692552725e-17,2.7950059128451137e-17,2.8061192564349555e-17,2.8172326000247966e-17,2.828345943614638e-17,2.8394592872044795e-17,2.850572630794321e-17,2.8616859743841625e-17,2.8727993179740036e-17,2.883912661563845e-17,2.8950260051536866e-17,2.906139348743528e-17,2.9172526923333695e-17,2.9283660359232106e-17,2.939479379513052e-17,2.9505927231028936e-17,2.961706066692735e-17,2.9728194102825765e-17,2.9839327538724177e-17,2.9950460974622594e-17,3.0061594410521006e-17,3.017272784641942e-17,3.0283861282317835e-17,3.0394994718216247e-17,3.0506128154114664e-17,3.0617261590013076e-17,3.072839502591149e-17,3.0839528461809905e-17,3.0950661897708317e-17,3.1061795333606735e-17,3.1172928769505146e-17,3.128406220540356e-17,3.1395195641301975e-17,3.150632907720039e-17,3.1617462513098805e-17,3.1728595948997216e-17,3.183972938489563e-17,3.1950862820794046e-17,3.206199625669246e-17,3.2173129692590875e-17,3.2284263128489286e-17,3.23953965643877e-17,3.2506530000286116e-17,3.261766343618453e-17,3.2728796872082945e-17,3.2839930307981357e-17,3.295106374387977e-17,3.3062197179778186e-17,3.31733306156766e-17,3.3284464051575015e-17,3.3395597487473427e-17,3.3506730923371844e-17,3.3617864359270256e-17,3.372899779516867e-17,3.3840131231067085e-17,3.3951264666965497e-17,3.4062398102863915e-17,3.4173531538762326e-17,3.428466497466074e-17,3.4395798410559155e-17,3.450693184645757e-17,3.4618065282355985e-17,3.4729198718254396e-17,3.484033215415281e-17,3.4951465590051226e-17,3.506259902594964e-17,3.5173732461848055e-17,3.5284865897746466e-17,3.539599933364488e-17,3.5507132769543296e-17,3.561826620544171e-17,3.5729399641340125e-17,3.5840533077238537e-17,3.595166651313695e-17,3.6062799949035366e-17,3.617393338493378e-17,3.6285066820832195e-17,3.6396200256730607e-17,3.6507333692629024e-17,3.6618467128527436e-17,3.672960056442585e-17,3.6840734000324265e-17,3.6951867436222677e-17,3.7063000872121095e-17,3.7174134308019506e-17,3.728526774391792e-17,3.7396401179816335e-17,3.750753461571475e-17,3.7618668051613165e-17,3.7729801487511576e-17,3.784093492340999e-17,3.7952068359308406e-17,3.806320179520682e-17,3.8174335231105235e-17,3.8285468667003646e-17,3.839660210290206e-17,3.8507735538800476e-17,3.861886897469889e-17,3.8730002410597305e-17,3.8841135846495717e-17,3.895226928239413e-17,3.9063402718292546e-17,3.917453615419096e-17,3.9285669590089375e-17,3.9396803025987787e-17,3.95079364618862e-17,3.9619069897784616e-17,3.973020333368303e-17,3.9841336769581445e-17,3.9952470205479857e-17,4.0063603641378275e-17,4.0174737077276686e-17,4.02858705131751e-17,4.0397003949073515e-17,4.050813738497193e-17,4.0619270820870345e-17,4.0730404256768756e-17,4.084153769266717e-17,4.0952671128565586e-17,4.1063804564464e-17,4.1174938000362415e-17,4.1286071436260826e-17,4.139720487215924e-17,4.1508338308057656e-17,4.161947174395607e-17,4.1730605179854485e-17,4.1841738615752897e-17,4.195287205165131e-17,4.2064005487549726e-17,4.217513892344814e-17,4.2286272359346555e-17,4.2397405795244967e-17,4.250853923114338e-17,4.2619672667041796e-17,4.273080610294021e-17,4.2841939538838625e-17,4.2953072974737037e-17,4.306420641063545e-17,4.3175339846533866e-17,4.328647328243228e-17,4.3397606718330695e-17,4.350874015422911e-17,4.3619873590127525e-17,4.3731007026025936e-17,4.384214046192435e-17,4.3953273897822766e-17,4.406440733372118e-17,4.4175540769619595e-17,4.4286674205518006e-17,4.439780764141642e-17,4.4508941077314836e-17,4.462007451321325e-17,4.4731207949111665e-17,4.4842341385010077e-17,4.495347482090849e-17,4.5064608256806906e-17,4.517574169270532e-17,4.5286875128603735e-17,4.5398008564502147e-17,4.550914200040056e-17,4.5620275436298976e-17,4.573140887219739e-17,4.5842542308095805e-17,4.5953675743994217e-17,4.606480917989263e-17,4.6175942615791046e-17,4.628707605168946e-17,4.6398209487587875e-17,4.650934292348629e-17,4.66204763593847e-17,4.6731609795283116e-17,4.684274323118153e-17,4.6953876667079946e-17,4.706501010297836e-17,4.7176143538876775e-17,4.7287276974775186e-17,4.73984104106736e-17,4.7509543846572016e-17,4.762067728247043e-17,4.7731810718368845e-17,4.7842944154267257e-17,4.795407759016567e-17,4.8065211026064086e-17,4.81763444619625e-17,4.8287477897860915e-17,4.8398611333759327e-17,4.850974476965774e-17,4.8620878205556156e-17,4.873201164145457e-17,4.8843145077352985e-17,4.8954278513251397e-17,4.906541194914981e-17,4.9176545385048226e-17,4.928767882094664e-17,4.9398812256845055e-17,4.950994569274347e-17,4.962107912864188e-17,4.9732212564540296e-17,4.984334600043871e-17,4.9954479436337126e-17,5.006561287223554e-17,5.017674630813395e-17,5.0287879744032366e-17,5.039901317993078e-17,5.0510146615829196e-17,5.062128005172761e-17,5.0732413487626025e-17,5.0843546923524437e-17,5.095468035942285e-17,5.1065813795321266e-17,5.117694723121968e-17,5.1288080667118095e-17,5.1399214103016507e-17,5.151034753891492e-17,5.1621480974813336e-17,5.173261441071175e-17,5.1843747846610165e-17,5.1954881282508577e-17,5.206601471840699e-17,5.2177148154305406e-17,5.228828159020382e-17,5.2399415026102235e-17,5.251054846200065e-17,5.262168189789906e-17,5.2732815333797476e-17,5.284394876969589e-17,5.2955082205594306e-17,5.306621564149272e-17,5.317734907739113e-17,5.3288482513289546e-17,5.339961594918796e-17,5.3510749385086376e-17,5.362188282098479e-17,5.37330162568832e-17,5.3844149692781617e-17,5.395528312868003e-17,5.4066416564578446e-17,5.417755000047686e-17,5.4288683436375275e-17,5.4399816872273687e-17,5.45109503081721e-17,5.4622083744070516e-17,5.473321717996893e-17,5.4844350615867345e-17,5.4955484051765757e-17,5.506661748766417e-17,5.5177750923562586e-17,5.5288884359461e-17,5.5400017795359415e-17,5.551115123125783e-17],"x":[-5.551115123125783e-17,-5.5400017795359415e-17,-5.5288884359461e-17,-5.5177750923562586e-17,-5.506661748766417e-17,-5.4955484051765757e-17,-5.4844350615867345e-17,-5.473321717996893e-17,-5.4622083744070516e-17,-5.45109503081721e-17,-5.4399816872273687e-17,-5.4288683436375275e-17,-5.417755000047686e-17,-5.4066416564578446e-17,-5.395528312868003e-17,-5.3844149692781617e-17,-5.37330162568832e-17,-5.362188282098479e-17,-5.3510749385086376e-17,-5.339961594918796e-17,-5.3288482513289546e-17,-5.317734907739113e-17,-5.306621564149272e-17,-5.2955082205594306e-17,-5.284394876969589e-17,-5.2732815333797476e-17,-5.262168189789906e-17,-5.251054846200065e-17,-5.2399415026102235e-17,-5.228828159020382e-17,-5.2177148154305406e-17,-5.206601471840699e-17,-5.1954881282508577e-17,-5.1843747846610165e-17,-5.173261441071175e-17,-5.1621480974813336e-17,-5.151034753891492e-17,-5.1399214103016507e-17,-5.1288080667118095e-17,-5.117694723121968e-17,-5.1065813795321266e-17,-5.095468035942285e-17,-5.0843546923524437e-17,-5.0732413487626025e-17,-5.062128005172761e-17,-5.0510146615829196e-17,-5.039901317993078e-17,-5.0287879744032366e-17,-5.017674630813395e-17,-5.006561287223554e-17,-4.9954479436337126e-17,-4.984334600043871e-17,-4.9732212564540296e-17,-4.962107912864188e-17,-4.950994569274347e-17,-4.9398812256845055e-17,-4.928767882094664e-17,-4.9176545385048226e-17,-4.906541194914981e-17,-4.8954278513251397e-17,-4.8843145077352985e-17,-4.873201164145457e-17,-4.8620878205556156e-17,-4.850974476965774e-17,-4.8398611333759327e-17,-4.8287477897860915e-17,-4.81763444619625e-17,-4.8065211026064086e-17,-4.795407759016567e-17,-4.7842944154267257e-17,-4.7731810718368845e-17,-4.762067728247043e-17,-4.7509543846572016e-17,-4.73984104106736e-17,-4.7287276974775186e-17,-4.7176143538876775e-17,-4.706501010297836e-17,-4.6953876667079946e-17,-4.684274323118153e-17,-4.6731609795283116e-17,-4.66204763593847e-17,-4.650934292348629e-17,-4.6398209487587875e-17,-4.628707605168946e-17,-4.6175942615791046e-17,-4.606480917989263e-17,-4.5953675743994217e-17,-4.5842542308095805e-17,-4.573140887219739e-17,-4.5620275436298976e-17,-4.550914200040056e-17,-4.5398008564502147e-17,-4.5286875128603735e-17,-4.517574169270532e-17,-4.5064608256806906e-17,-4.495347482090849e-17,-4.4842341385010077e-17,-4.4731207949111665e-17,-4.462007451321325e-17,-4.4508941077314836e-17,-4.439780764141642e-17,-4.4286674205518006e-17,-4.4175540769619595e-17,-4.406440733372118e-17,-4.3953273897822766e-17,-4.384214046192435e-17,-4.3731007026025936e-17,-4.3619873590127525e-17,-4.350874015422911e-17,-4.3397606718330695e-17,-4.328647328243228e-17,-4.3175339846533866e-17,-4.306420641063545e-17,-4.2953072974737037e-17,-4.2841939538838625e-17,-4.273080610294021e-17,-4.2619672667041796e-17,-4.250853923114338e-17,-4.2397405795244967e-17,-4.2286272359346555e-17,-4.217513892344814e-17,-4.2064005487549726e-17,-4.195287205165131e-17,-4.1841738615752897e-17,-4.1730605179854485e-17,-4.161947174395607e-17,-4.1508338308057656e-17,-4.139720487215924e-17,-4.1286071436260826e-17,-4.1174938000362415e-17,-4.1063804564464e-17,-4.0952671128565586e-17,-4.084153769266717e-17,-4.0730404256768756e-17,-4.0619270820870345e-17,-4.050813738497193e-17,-4.0397003949073515e-17,-4.02858705131751e-17,-4.0174737077276686e-17,-4.0063603641378275e-17,-3.9952470205479857e-17,-3.9841336769581445e-17,-3.973020333368303e-17,-3.9619069897784616e-17,-3.95079364618862e-17,-3.9396803025987787e-17,-3.9285669590089375e-17,-3.917453615419096e-17,-3.9063402718292546e-17,-3.895226928239413e-17,-3.8841135846495717e-17,-3.8730002410597305e-17,-3.861886897469889e-17,-3.8507735538800476e-17,-3.839660210290206e-17,-3.8285468667003646e-17,-3.8174335231105235e-17,-3.806320179520682e-17,-3.7952068359308406e-17,-3.784093492340999e-17,-3.7729801487511576e-17,-3.7618668051613165e-17,-3.750753461571475e-17,-3.7396401179816335e-17,-3.728526774391792e-17,-3.7174134308019506e-17,-3.7063000872121095e-17,-3.6951867436222677e-17,-3.6840734000324265e-17,-3.672960056442585e-17,-3.6618467128527436e-17,-3.6507333692629024e-17,-3.6396200256730607e-17,-3.6285066820832195e-17,-3.617393338493378e-17,-3.6062799949035366e-17,-3.595166651313695e-17,-3.5840533077238537e-17,-3.5729399641340125e-17,-3.561826620544171e-17,-3.5507132769543296e-17,-3.539599933364488e-17,-3.5284865897746466e-17,-3.5173732461848055e-17,-3.506259902594964e-17,-3.4951465590051226e-17,-3.484033215415281e-17,-3.4729198718254396e-17,-3.4618065282355985e-17,-3.450693184645757e-17,-3.4395798410559155e-17,-3.428466497466074e-17,-3.4173531538762326e-17,-3.4062398102863915e-17,-3.3951264666965497e-17,-3.3840131231067085e-17,-3.372899779516867e-17,-3.3617864359270256e-17,-3.3506730923371844e-17,-3.3395597487473427e-17,-3.3284464051575015e-17,-3.31733306156766e-17,-3.3062197179778186e-17,-3.295106374387977e-17,-3.2839930307981357e-17,-3.2728796872082945e-17,-3.261766343618453e-17,-3.2506530000286116e-17,-3.23953965643877e-17,-3.2284263128489286e-17,-3.2173129692590875e-17,-3.206199625669246e-17,-3.1950862820794046e-17,-3.183972938489563e-17,-3.1728595948997216e-17,-3.1617462513098805e-17,-3.150632907720039e-17,-3.1395195641301975e-17,-3.128406220540356e-17,-3.1172928769505146e-17,-3.1061795333606735e-17,-3.0950661897708317e-17,-3.0839528461809905e-17,-3.072839502591149e-17,-3.0617261590013076e-17,-3.0506128154114664e-17,-3.0394994718216247e-17,-3.0283861282317835e-17,-3.017272784641942e-17,-3.0061594410521006e-17,-2.9950460974622594e-17,-2.9839327538724177e-17,-2.9728194102825765e-17,-2.961706066692735e-17,-2.9505927231028936e-17,-2.939479379513052e-17,-2.9283660359232106e-17,-2.9172526923333695e-17,-2.906139348743528e-17,-2.8950260051536866e-17,-2.883912661563845e-17,-2.8727993179740036e-17,-2.8616859743841625e-17,-2.850572630794321e-17,-2.8394592872044795e-17,-2.828345943614638e-17,-2.8172326000247966e-17,-2.8061192564349555e-17,-2.7950059128451137e-17,-2.7838925692552725e-17,-2.772779225665431e-17,-2.7616658820755896e-17,-2.750552538485748e-17,-2.7394391948959067e-17,-2.7283258513060655e-17,-2.717212507716224e-17,-2.7060991641263826e-17,-2.694985820536541e-17,-2.6838724769466997e-17,-2.6727591333568582e-17,-2.661645789767017e-17,-2.6505324461771756e-17,-2.639419102587334e-17,-2.6283057589974926e-17,-2.6171924154076512e-17,-2.60607907181781e-17,-2.5949657282279686e-17,-2.583852384638127e-17,-2.5727390410482856e-17,-2.5616256974584442e-17,-2.550512353868603e-17,-2.5393990102787615e-17,-2.52828566668892e-17,-2.5171723230990786e-17,-2.506058979509237e-17,-2.4949456359193957e-17,-2.4838322923295545e-17,-2.472718948739713e-17,-2.4616056051498716e-17,-2.45049226156003e-17,-2.4393789179701887e-17,-2.4282655743803475e-17,-2.417152230790506e-17,-2.4060388872006646e-17,-2.394925543610823e-17,-2.3838122000209817e-17,-2.3726988564311405e-17,-2.361585512841299e-17,-2.3504721692514576e-17,-2.339358825661616e-17,-2.3282454820717746e-17,-2.3171321384819332e-17,-2.306018794892092e-17,-2.2949054513022506e-17,-2.283792107712409e-17,-2.2726787641225676e-17,-2.2615654205327262e-17,-2.250452076942885e-17,-2.2393387333530435e-17,-2.228225389763202e-17,-2.2171120461733606e-17,-2.205998702583519e-17,-2.194885358993678e-17,-2.1837720154038365e-17,-2.172658671813995e-17,-2.1615453282241536e-17,-2.150431984634312e-17,-2.1393186410444707e-17,-2.1282052974546295e-17,-2.117091953864788e-17,-2.1059786102749466e-17,-2.094865266685105e-17,-2.0837519230952637e-17,-2.0726385795054225e-17,-2.061525235915581e-17,-2.0504118923257396e-17,-2.039298548735898e-17,-2.0281852051460566e-17,-2.0170718615562155e-17,-2.005958517966374e-17,-1.9948451743765326e-17,-1.983731830786691e-17,-1.9726184871968496e-17,-1.9615051436070082e-17,-1.950391800017167e-17,-1.9392784564273255e-17,-1.928165112837484e-17,-1.9170517692476426e-17,-1.905938425657801e-17,-1.89482508206796e-17,-1.8837117384781185e-17,-1.872598394888277e-17,-1.8614850512984356e-17,-1.850371707708594e-17,-1.839258364118753e-17,-1.8281450205289115e-17,-1.81703167693907e-17,-1.8059183333492286e-17,-1.794804989759387e-17,-1.7836916461695457e-17,-1.7725783025797045e-17,-1.761464958989863e-17,-1.7503516154000216e-17,-1.73923827181018e-17,-1.7281249282203386e-17,-1.7170115846304975e-17,-1.705898241040656e-17,-1.6947848974508146e-17,-1.683671553860973e-17,-1.6725582102711316e-17,-1.6614448666812905e-17,-1.650331523091449e-17,-1.6392181795016075e-17,-1.628104835911766e-17,-1.6169914923219246e-17,-1.605878148732083e-17,-1.594764805142242e-17,-1.5836514615524005e-17,-1.572538117962559e-17,-1.5614247743727176e-17,-1.550311430782876e-17,-1.539198087193035e-17,-1.5280847436031935e-17,-1.516971400013352e-17,-1.5058580564235106e-17,-1.494744712833669e-17,-1.483631369243828e-17,-1.4725180256539865e-17,-1.461404682064145e-17,-1.4502913384743036e-17,-1.439177994884462e-17,-1.4280646512946206e-17,-1.4169513077047795e-17,-1.405837964114938e-17,-1.3947246205250966e-17,-1.3836112769352551e-17,-1.3724979333454138e-17,-1.3613845897555723e-17,-1.350271246165731e-17,-1.3391579025758895e-17,-1.328044558986048e-17,-1.3169312153962068e-17,-1.3058178718063653e-17,-1.2947045282165238e-17,-1.2835911846266825e-17,-1.272477841036841e-17,-1.2613644974469997e-17,-1.2502511538571583e-17,-1.2391378102673168e-17,-1.2280244666774755e-17,-1.216911123087634e-17,-1.2057977794977926e-17,-1.1946844359079513e-17,-1.1835710923181098e-17,-1.1724577487282685e-17,-1.161344405138427e-17,-1.1502310615485856e-17,-1.1391177179587443e-17,-1.1280043743689028e-17,-1.1168910307790613e-17,-1.10577768718922e-17,-1.0946643435993786e-17,-1.0835510000095371e-17,-1.0724376564196958e-17,-1.0613243128298543e-17,-1.050210969240013e-17,-1.0390976256501715e-17,-1.02798428206033e-17,-1.0168709384704888e-17,-1.0057575948806473e-17,-9.946442512908058e-18,-9.835309077009645e-18,-9.72417564111123e-18,-9.613042205212817e-18,-9.501908769314403e-18,-9.390775333415988e-18,-9.279641897517575e-18,-9.16850846161916e-18,-9.057375025720746e-18,-8.946241589822333e-18,-8.835108153923918e-18,-8.723974718025505e-18,-8.61284128212709e-18,-8.501707846228676e-18,-8.390574410330263e-18,-8.279440974431848e-18,-8.168307538533433e-18,-8.05717410263502e-18,-7.946040666736606e-18,-7.834907230838192e-18,-7.723773794939778e-18,-7.612640359041363e-18,-7.50150692314295e-18,-7.390373487244535e-18,-7.27924005134612e-18,-7.168106615447708e-18,-7.056973179549293e-18,-6.94583974365088e-18,-6.834706307752465e-18,-6.723572871854051e-18,-6.612439435955637e-18,-6.501306000057223e-18,-6.390172564158809e-18,-6.279039128260395e-18,-6.1679056923619804e-18,-6.0567722564635666e-18,-5.945638820565153e-18,-5.834505384666739e-18,-5.723371948768324e-18,-5.61223851286991e-18,-5.5011050769714964e-18,-5.3899716410730825e-18,-5.278838205174668e-18,-5.167704769276254e-18,-5.05657133337784e-18,-4.945437897479426e-18,-4.834304461581012e-18,-4.723171025682598e-18,-4.612037589784184e-18,-4.50090415388577e-18,-4.389770717987355e-18,-4.2786372820889415e-18,-4.1675038461905276e-18,-4.056370410292114e-18,-3.945236974393699e-18,-3.834103538495285e-18,-3.722970102596871e-18,-3.6118366666984575e-18,-3.500703230800043e-18,-3.389569794901629e-18,-3.278436359003215e-18,-3.167302923104801e-18,-3.056169487206387e-18,-2.9450360513079727e-18,-2.833902615409559e-18,-2.7227691795111445e-18,-2.6116357436127307e-18,-2.5005023077143164e-18,-2.3893688718159025e-18,-2.2782354359174883e-18,-2.1671020000190744e-18,-2.05596856412066e-18,-1.9448351282222463e-18,-1.833701692323832e-18,-1.7225682564254181e-18,-1.611434820527004e-18,-1.50030138462859e-18,-1.389167948730176e-18,-1.2780345128317619e-18,-1.1669010769333478e-18,-1.0557676410349337e-18,-9.446342051365197e-19,-8.335007692381055e-19,-7.223673333396914e-19,-6.112338974412774e-19,-5.001004615428633e-19,-3.8896702564444924e-19,-2.7783358974603517e-19,-1.667001538476211e-19,-5.556671794920703e-20,5.556671794920703e-20,1.667001538476211e-19,2.7783358974603517e-19,3.8896702564444924e-19,5.001004615428633e-19,6.112338974412774e-19,7.223673333396914e-19,8.335007692381055e-19,9.446342051365197e-19,1.0557676410349337e-18,1.1669010769333478e-18,1.2780345128317619e-18,1.389167948730176e-18,1.50030138462859e-18,1.611434820527004e-18,1.7225682564254181e-18,1.833701692323832e-18,1.9448351282222463e-18,2.05596856412066e-18,2.1671020000190744e-18,2.2782354359174883e-18,2.3893688718159025e-18,2.5005023077143164e-18,2.6116357436127307e-18,2.7227691795111445e-18,2.833902615409559e-18,2.9450360513079727e-18,3.056169487206387e-18,3.167302923104801e-18,3.278436359003215e-18,3.389569794901629e-18,3.500703230800043e-18,3.6118366666984575e-18,3.722970102596871e-18,3.834103538495285e-18,3.945236974393699e-18,4.056370410292114e-18,4.1675038461905276e-18,4.2786372820889415e-18,4.389770717987355e-18,4.50090415388577e-18,4.612037589784184e-18,4.723171025682598e-18,4.834304461581012e-18,4.945437897479426e-18,5.05657133337784e-18,5.167704769276254e-18,5.278838205174668e-18,5.3899716410730825e-18,5.5011050769714964e-18,5.61223851286991e-18,5.723371948768324e-18,5.834505384666739e-18,5.945638820565153e-18,6.0567722564635666e-18,6.1679056923619804e-18,6.279039128260395e-18,6.390172564158809e-18,6.501306000057223e-18,6.612439435955637e-18,6.723572871854051e-18,6.834706307752465e-18,6.94583974365088e-18,7.056973179549293e-18,7.168106615447708e-18,7.27924005134612e-18,7.390373487244535e-18,7.50150692314295e-18,7.612640359041363e-18,7.723773794939778e-18,7.834907230838192e-18,7.946040666736606e-18,8.05717410263502e-18,8.168307538533433e-18,8.279440974431848e-18,8.390574410330263e-18,8.501707846228676e-18,8.61284128212709e-18,8.723974718025505e-18,8.835108153923918e-18,8.946241589822333e-18,9.057375025720746e-18,9.16850846161916e-18,9.279641897517575e-18,9.390775333415988e-18,9.501908769314403e-18,9.613042205212817e-18,9.72417564111123e-18,9.835309077009645e-18,9.946442512908058e-18,1.0057575948806473e-17,1.0168709384704888e-17,1.02798428206033e-17,1.0390976256501715e-17,1.050210969240013e-17,1.0613243128298543e-17,1.0724376564196958e-17,1.0835510000095371e-17,1.0946643435993786e-17,1.10577768718922e-17,1.1168910307790613e-17,1.1280043743689028e-17,1.1391177179587443e-17,1.1502310615485856e-17,1.161344405138427e-17,1.1724577487282685e-17,1.1835710923181098e-17,1.1946844359079513e-17,1.2057977794977926e-17,1.216911123087634e-17,1.2280244666774755e-17,1.2391378102673168e-17,1.2502511538571583e-17,1.2613644974469997e-17,1.272477841036841e-17,1.2835911846266825e-17,1.2947045282165238e-17,1.3058178718063653e-17,1.3169312153962068e-17,1.328044558986048e-17,1.3391579025758895e-17,1.350271246165731e-17,1.3613845897555723e-17,1.3724979333454138e-17,1.3836112769352551e-17,1.3947246205250966e-17,1.405837964114938e-17,1.4169513077047795e-17,1.4280646512946206e-17,1.439177994884462e-17,1.4502913384743036e-17,1.461404682064145e-17,1.4725180256539865e-17,1.483631369243828e-17,1.494744712833669e-17,1.5058580564235106e-17,1.516971400013352e-17,1.5280847436031935e-17,1.539198087193035e-17,1.550311430782876e-17,1.5614247743727176e-17,1.572538117962559e-17,1.5836514615524005e-17,1.594764805142242e-17,1.605878148732083e-17,1.6169914923219246e-17,1.628104835911766e-17,1.6392181795016075e-17,1.650331523091449e-17,1.6614448666812905e-17,1.6725582102711316e-17,1.683671553860973e-17,1.6947848974508146e-17,1.705898241040656e-17,1.7170115846304975e-17,1.7281249282203386e-17,1.73923827181018e-17,1.7503516154000216e-17,1.761464958989863e-17,1.7725783025797045e-17,1.7836916461695457e-17,1.794804989759387e-17,1.8059183333492286e-17,1.81703167693907e-17,1.8281450205289115e-17,1.839258364118753e-17,1.850371707708594e-17,1.8614850512984356e-17,1.872598394888277e-17,1.8837117384781185e-17,1.89482508206796e-17,1.905938425657801e-17,1.9170517692476426e-17,1.928165112837484e-17,1.9392784564273255e-17,1.950391800017167e-17,1.9615051436070082e-17,1.9726184871968496e-17,1.983731830786691e-17,1.9948451743765326e-17,2.005958517966374e-17,2.0170718615562155e-17,2.0281852051460566e-17,2.039298548735898e-17,2.0504118923257396e-17,2.061525235915581e-17,2.0726385795054225e-17,2.0837519230952637e-17,2.094865266685105e-17,2.1059786102749466e-17,2.117091953864788e-17,2.1282052974546295e-17,2.1393186410444707e-17,2.150431984634312e-17,2.1615453282241536e-17,2.172658671813995e-17,2.1837720154038365e-17,2.194885358993678e-17,2.205998702583519e-17,2.2171120461733606e-17,2.228225389763202e-17,2.2393387333530435e-17,2.250452076942885e-17,2.2615654205327262e-17,2.2726787641225676e-17,2.283792107712409e-17,2.2949054513022506e-17,2.306018794892092e-17,2.3171321384819332e-17,2.3282454820717746e-17,2.339358825661616e-17,2.3504721692514576e-17,2.361585512841299e-17,2.3726988564311405e-17,2.3838122000209817e-17,2.394925543610823e-17,2.4060388872006646e-17,2.417152230790506e-17,2.4282655743803475e-17,2.4393789179701887e-17,2.45049226156003e-17,2.4616056051498716e-17,2.472718948739713e-17,2.4838322923295545e-17,2.4949456359193957e-17,2.506058979509237e-17,2.5171723230990786e-17,2.52828566668892e-17,2.5393990102787615e-17,2.550512353868603e-17,2.5616256974584442e-17,2.5727390410482856e-17,2.583852384638127e-17,2.5949657282279686e-17,2.60607907181781e-17,2.6171924154076512e-17,2.6283057589974926e-17,2.639419102587334e-17,2.6505324461771756e-17,2.661645789767017e-17,2.6727591333568582e-17,2.6838724769466997e-17,2.694985820536541e-17,2.7060991641263826e-17,2.717212507716224e-17,2.7283258513060655e-17,2.7394391948959067e-17,2.750552538485748e-17,2.7616658820755896e-17,2.772779225665431e-17,2.7838925692552725e-17,2.7950059128451137e-17,2.8061192564349555e-17,2.8172326000247966e-17,2.828345943614638e-17,2.8394592872044795e-17,2.850572630794321e-17,2.8616859743841625e-17,2.8727993179740036e-17,2.883912661563845e-17,2.8950260051536866e-17,2.906139348743528e-17,2.9172526923333695e-17,2.9283660359232106e-17,2.939479379513052e-17,2.9505927231028936e-17,2.961706066692735e-17,2.9728194102825765e-17,2.9839327538724177e-17,2.9950460974622594e-17,3.0061594410521006e-17,3.017272784641942e-17,3.0283861282317835e-17,3.0394994718216247e-17,3.0506128154114664e-17,3.0617261590013076e-17,3.072839502591149e-17,3.0839528461809905e-17,3.0950661897708317e-17,3.1061795333606735e-17,3.1172928769505146e-17,3.128406220540356e-17,3.1395195641301975e-17,3.150632907720039e-17,3.1617462513098805e-17,3.1728595948997216e-17,3.183972938489563e-17,3.1950862820794046e-17,3.206199625669246e-17,3.2173129692590875e-17,3.2284263128489286e-17,3.23953965643877e-17,3.2506530000286116e-17,3.261766343618453e-17,3.2728796872082945e-17,3.2839930307981357e-17,3.295106374387977e-17,3.3062197179778186e-17,3.31733306156766e-17,3.3284464051575015e-17,3.3395597487473427e-17,3.3506730923371844e-17,3.3617864359270256e-17,3.372899779516867e-17,3.3840131231067085e-17,3.3951264666965497e-17,3.4062398102863915e-17,3.4173531538762326e-17,3.428466497466074e-17,3.4395798410559155e-17,3.450693184645757e-17,3.4618065282355985e-17,3.4729198718254396e-17,3.484033215415281e-17,3.4951465590051226e-17,3.506259902594964e-17,3.5173732461848055e-17,3.5284865897746466e-17,3.539599933364488e-17,3.5507132769543296e-17,3.561826620544171e-17,3.5729399641340125e-17,3.5840533077238537e-17,3.595166651313695e-17,3.6062799949035366e-17,3.617393338493378e-17,3.6285066820832195e-17,3.6396200256730607e-17,3.6507333692629024e-17,3.6618467128527436e-17,3.672960056442585e-17,3.6840734000324265e-17,3.6951867436222677e-17,3.7063000872121095e-17,3.7174134308019506e-17,3.728526774391792e-17,3.7396401179816335e-17,3.750753461571475e-17,3.7618668051613165e-17,3.7729801487511576e-17,3.784093492340999e-17,3.7952068359308406e-17,3.806320179520682e-17,3.8174335231105235e-17,3.8285468667003646e-17,3.839660210290206e-17,3.8507735538800476e-17,3.861886897469889e-17,3.8730002410597305e-17,3.8841135846495717e-17,3.895226928239413e-17,3.9063402718292546e-17,3.917453615419096e-17,3.9285669590089375e-17,3.9396803025987787e-17,3.95079364618862e-17,3.9619069897784616e-17,3.973020333368303e-17,3.9841336769581445e-17,3.9952470205479857e-17,4.0063603641378275e-17,4.0174737077276686e-17,4.02858705131751e-17,4.0397003949073515e-17,4.050813738497193e-17,4.0619270820870345e-17,4.0730404256768756e-17,4.084153769266717e-17,4.0952671128565586e-17,4.1063804564464e-17,4.1174938000362415e-17,4.1286071436260826e-17,4.139720487215924e-17,4.1508338308057656e-17,4.161947174395607e-17,4.1730605179854485e-17,4.1841738615752897e-17,4.195287205165131e-17,4.2064005487549726e-17,4.217513892344814e-17,4.2286272359346555e-17,4.2397405795244967e-17,4.250853923114338e-17,4.2619672667041796e-17,4.273080610294021e-17,4.2841939538838625e-17,4.2953072974737037e-17,4.306420641063545e-17,4.3175339846533866e-17,4.328647328243228e-17,4.3397606718330695e-17,4.350874015422911e-17,4.3619873590127525e-17,4.3731007026025936e-17,4.384214046192435e-17,4.3953273897822766e-17,4.406440733372118e-17,4.4175540769619595e-17,4.4286674205518006e-17,4.439780764141642e-17,4.4508941077314836e-17,4.462007451321325e-17,4.4731207949111665e-17,4.4842341385010077e-17,4.495347482090849e-17,4.5064608256806906e-17,4.517574169270532e-17,4.5286875128603735e-17,4.5398008564502147e-17,4.550914200040056e-17,4.5620275436298976e-17,4.573140887219739e-17,4.5842542308095805e-17,4.5953675743994217e-17,4.606480917989263e-17,4.6175942615791046e-17,4.628707605168946e-17,4.6398209487587875e-17,4.650934292348629e-17,4.66204763593847e-17,4.6731609795283116e-17,4.684274323118153e-17,4.6953876667079946e-17,4.706501010297836e-17,4.7176143538876775e-17,4.7287276974775186e-17,4.73984104106736e-17,4.7509543846572016e-17,4.762067728247043e-17,4.7731810718368845e-17,4.7842944154267257e-17,4.795407759016567e-17,4.8065211026064086e-17,4.81763444619625e-17,4.8287477897860915e-17,4.8398611333759327e-17,4.850974476965774e-17,4.8620878205556156e-17,4.873201164145457e-17,4.8843145077352985e-17,4.8954278513251397e-17,4.906541194914981e-17,4.9176545385048226e-17,4.928767882094664e-17,4.9398812256845055e-17,4.950994569274347e-17,4.962107912864188e-17,4.9732212564540296e-17,4.984334600043871e-17,4.9954479436337126e-17,5.006561287223554e-17,5.017674630813395e-17,5.0287879744032366e-17,5.039901317993078e-17,5.0510146615829196e-17,5.062128005172761e-17,5.0732413487626025e-17,5.0843546923524437e-17,5.095468035942285e-17,5.1065813795321266e-17,5.117694723121968e-17,5.1288080667118095e-17,5.1399214103016507e-17,5.151034753891492e-17,5.1621480974813336e-17,5.173261441071175e-17,5.1843747846610165e-17,5.1954881282508577e-17,5.206601471840699e-17,5.2177148154305406e-17,5.228828159020382e-17,5.2399415026102235e-17,5.251054846200065e-17,5.262168189789906e-17,5.2732815333797476e-17,5.284394876969589e-17,5.2955082205594306e-17,5.306621564149272e-17,5.317734907739113e-17,5.3288482513289546e-17,5.339961594918796e-17,5.3510749385086376e-17,5.362188282098479e-17,5.37330162568832e-17,5.3844149692781617e-17,5.395528312868003e-17,5.4066416564578446e-17,5.417755000047686e-17,5.4288683436375275e-17,5.4399816872273687e-17,5.45109503081721e-17,5.4622083744070516e-17,5.473321717996893e-17,5.4844350615867345e-17,5.4955484051765757e-17,5.506661748766417e-17,5.5177750923562586e-17,5.5288884359461e-17,5.5400017795359415e-17,5.551115123125783e-17]}

},{}],116:[function(require,module,exports){
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
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );
var incrspace = require( '@stdlib/array/base/incrspace' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var expm1 = require( './../lib' );


// FIXTURES //

var cppMediumPositive = require( './fixtures/cpp/medium_positive.json' );
var cppMediumNegative = require( './fixtures/cpp/medium_negative.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var tiny = require( './fixtures/julia/tiny.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof expm1, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function agrees with `exp(x) - 1` for most `x`', function test( t ) {
	var expected;
	var delta;
	var val;
	var tol;
	var x;
	var y;
	var i;
	x = incrspace( -10.0, 50.0, 0.5 );
	for ( i = 0; i < x.length; i++ ) {
		val = x[ i ];
		y = expm1( val );
		expected = exp( val ) - 1.0;
		delta = abs( y - expected );
		tol = 1e-12 * abs( expected );
		t.ok( delta <= tol, 'within tolerance. x: '+x+'. y: '+y+'. Δ: '+delta+'. E: '+ expected[i]+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for negative medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for negative medium numbers (tested against the Boost C++ library)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = cppMediumNegative.x;
	expected = cppMediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for positive medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for positive medium numbers (tested against the Boost C++ library)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = cppMediumPositive.x;
	expected = cppMediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for negative small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for positive small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for very small `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = tiny.x;
	expected = tiny.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function returns `+infinity` for very large `x`', function test( t ) {
	t.equal( expm1( 800.0 ), PINF, 'equals +infinity' );
	t.equal( expm1( 900.0 ), PINF, 'equals +infinity' );
	t.equal( expm1( 1000.0 ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `-1` for negative large `x`', function test( t ) {
	t.equal( expm1( -800.0 ), -1.0, 'equals -1' );
	t.equal( expm1( -900.0 ), -1.0, 'equals -1' );
	t.equal( expm1( -1000.0 ), -1.0, 'equals -1' );
	t.end();
});

tape( 'the function returns `x` for `x` smaller than `2**-54`', function test( t ) {
	var val = pow( 2.0, -80 );
	t.equal( expm1( val ), val, 'equals input value' );
	val = pow( 2.0, -55 );
	t.equal( expm1( val ), val, 'equals input value' );
	val = pow( 2.0, -60 );
	t.equal( expm1( val ), val, 'equals input value' );
	t.end();
});

tape( 'the function returns `-1` if provided `-infinity`', function test( t ) {
	t.equal( expm1( NINF ), -1.0, 'equals -1' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	t.equal( expm1( PINF ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `0` if provided `0`', function test( t ) {
	var v = expm1( 0.0 );
	t.equal( isPositiveZero( v ), true, 'equals 0' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0` (IEEE 754-2008)', function test( t ) {
	var v = expm1( -0.0 );
	t.equal( isNegativeZero( v ), true, 'equals -0' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var val = expm1( NaN );
	t.equal( isnan( val ), true, 'equals NaN' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/expm1/test/test.js")
},{"./../lib":106,"./fixtures/cpp/medium_negative.json":109,"./fixtures/cpp/medium_positive.json":110,"./fixtures/julia/medium_negative.json":111,"./fixtures/julia/medium_positive.json":112,"./fixtures/julia/small_negative.json":113,"./fixtures/julia/small_positive.json":114,"./fixtures/julia/tiny.json":115,"@stdlib/array/base/incrspace":1,"@stdlib/constants/float64/eps":64,"@stdlib/constants/float64/ninf":75,"@stdlib/constants/float64/pinf":77,"@stdlib/math/base/assert/is-nan":88,"@stdlib/math/base/assert/is-negative-zero":90,"@stdlib/math/base/assert/is-positive-zero":94,"@stdlib/math/base/special/abs":96,"@stdlib/math/base/special/exp":103,"@stdlib/math/base/special/pow":122,"tape":339}],117:[function(require,module,exports){
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
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );
var incrspace = require( '@stdlib/array/base/incrspace' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var tryRequire = require( '@stdlib/utils/try-require' );
var EPS = require( '@stdlib/constants/float64/eps' );


// FIXTURES //

var cppMediumPositive = require( './fixtures/cpp/medium_positive.json' );
var cppMediumNegative = require( './fixtures/cpp/medium_negative.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var tiny = require( './fixtures/julia/tiny.json' );


// VARIABLES //

var expm1 = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( expm1 instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof expm1, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function agrees with `exp(x) - 1` for most `x`', opts, function test( t ) {
	var expected;
	var delta;
	var val;
	var tol;
	var x;
	var y;
	var i;
	x = incrspace( -10.0, 50.0, 0.5 );
	for ( i = 0; i < x.length; i++ ) {
		val = x[ i ];
		y = expm1( val );
		expected = exp( val ) - 1.0;
		delta = abs( y - expected );
		tol = 1e-12 * abs( expected );
		t.ok( delta <= tol, 'within tolerance. x: '+x+'. y: '+y+'. Δ: '+delta+'. E: '+ expected[i]+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for negative medium numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for negative medium numbers (tested against the Boost C++ library)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = cppMediumNegative.x;
	expected = cppMediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for positive medium numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for positive medium numbers (tested against the Boost C++ library)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = cppMediumPositive.x;
	expected = cppMediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for negative small numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for positive small numbers', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function accurately computes `exp(x) - 1` for very small `x`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = tiny.x;
	expected = tiny.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = expm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+v+'. E: '+ expected[i]+'. Δ: '+delta+'. tol: '+tol+'.' );
	}
	t.end();
});

tape( 'the function returns `+infinity` for very large `x`', opts, function test( t ) {
	t.equal( expm1( 800.0 ), PINF, 'equals +infinity' );
	t.equal( expm1( 900.0 ), PINF, 'equals +infinity' );
	t.equal( expm1( 1000.0 ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `-1` for negative large `x`', opts, function test( t ) {
	t.equal( expm1( -800.0 ), -1.0, 'equals -1' );
	t.equal( expm1( -900.0 ), -1.0, 'equals -1' );
	t.equal( expm1( -1000.0 ), -1.0, 'equals -1' );
	t.end();
});

tape( 'the function returns `x` for `x` smaller than `2**-54`', opts, function test( t ) {
	var val = pow( 2.0, -80 );
	t.equal( expm1( val ), val, 'equals input value' );
	val = pow( 2.0, -55 );
	t.equal( expm1( val ), val, 'equals input value' );
	val = pow( 2.0, -60 );
	t.equal( expm1( val ), val, 'equals input value' );
	t.end();
});

tape( 'the function returns `-1` if provided `-infinity`', opts, function test( t ) {
	t.equal( expm1( NINF ), -1.0, 'equals -1' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', opts, function test( t ) {
	t.equal( expm1( PINF ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `0` if provided `0`', opts, function test( t ) {
	var v = expm1( 0.0 );
	t.equal( isPositiveZero( v ), true, 'equals 0' );
	t.end();
});

tape( 'the function returns `-0` if provided `-0` (IEEE 754-2008)', opts, function test( t ) {
	var v = expm1( -0.0 );
	t.equal( isNegativeZero( v ), true, 'equals -0' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', opts, function test( t ) {
	var val = expm1( NaN );
	t.equal( isnan( val ), true, 'equals NaN' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/expm1/test/test.native.js","/lib/node_modules/@stdlib/math/base/special/expm1/test")
},{"./fixtures/cpp/medium_negative.json":109,"./fixtures/cpp/medium_positive.json":110,"./fixtures/julia/medium_negative.json":111,"./fixtures/julia/medium_positive.json":112,"./fixtures/julia/small_negative.json":113,"./fixtures/julia/small_positive.json":114,"./fixtures/julia/tiny.json":115,"@stdlib/array/base/incrspace":1,"@stdlib/constants/float64/eps":64,"@stdlib/constants/float64/ninf":75,"@stdlib/constants/float64/pinf":77,"@stdlib/math/base/assert/is-nan":88,"@stdlib/math/base/assert/is-negative-zero":90,"@stdlib/math/base/assert/is-positive-zero":94,"@stdlib/math/base/special/abs":96,"@stdlib/math/base/special/exp":103,"@stdlib/math/base/special/pow":122,"@stdlib/utils/try-require":207,"path":221,"tape":339}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":119}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/exponent-bias":65,"@stdlib/constants/float64/max-base2-exponent":73,"@stdlib/constants/float64/max-base2-exponent-subnormal":72,"@stdlib/constants/float64/min-base2-exponent-subnormal":74,"@stdlib/constants/float64/ninf":75,"@stdlib/constants/float64/pinf":77,"@stdlib/math/base/assert/is-infinite":84,"@stdlib/math/base/assert/is-nan":88,"@stdlib/math/base/special/copysign":100,"@stdlib/number/float64/base/exponent":139,"@stdlib/number/float64/base/from-words":141,"@stdlib/number/float64/base/normalize":148,"@stdlib/number/float64/base/to-words":157}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":125}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_l.js":126,"@stdlib/constants/float64/exponent-bias":65,"@stdlib/constants/float64/num-high-word-significand-bits":76,"@stdlib/number/float64/base/get-high-word":145,"@stdlib/number/float64/base/set-high-word":151,"@stdlib/number/float64/base/set-low-word":153}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":128,"@stdlib/number/float64/base/set-low-word":153}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./log2ax.js":123,"./logx.js":124,"./pow2.js":129,"./x_is_zero.js":130,"./y_is_huge.js":131,"./y_is_infinite.js":132,"@stdlib/constants/float64/high-word-abs-mask":67,"@stdlib/constants/float64/ninf":75,"@stdlib/constants/float64/pinf":77,"@stdlib/math/base/assert/is-infinite":84,"@stdlib/math/base/assert/is-integer":86,"@stdlib/math/base/assert/is-nan":88,"@stdlib/math/base/assert/is-odd":92,"@stdlib/math/base/special/abs":96,"@stdlib/math/base/special/sqrt":133,"@stdlib/number/float64/base/set-low-word":153,"@stdlib/number/float64/base/to-words":157,"@stdlib/number/uint32/base/to-int32":160}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":127,"@stdlib/constants/float64/exponent-bias":65,"@stdlib/constants/float64/high-word-abs-mask":67,"@stdlib/constants/float64/high-word-significand-mask":70,"@stdlib/constants/float64/ln-two":71,"@stdlib/constants/float64/num-high-word-significand-bits":76,"@stdlib/math/base/special/ldexp":120,"@stdlib/number/float64/base/get-high-word":145,"@stdlib/number/float64/base/set-high-word":151,"@stdlib/number/float64/base/set-low-word":153,"@stdlib/number/uint32/base/to-int32":160}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/ninf":75,"@stdlib/constants/float64/pinf":77,"@stdlib/math/base/assert/is-odd":92,"@stdlib/math/base/special/copysign":100}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"@stdlib/constants/float64/high-word-abs-mask":67,"@stdlib/number/float64/base/get-high-word":145}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":77,"@stdlib/math/base/special/abs":96}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":98,"@stdlib/math/base/special/floor":118}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":138}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/float64/exponent-bias":65,"@stdlib/constants/float64/high-word-exponent-mask":68,"@stdlib/number/float64/base/get-high-word":145}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":143}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":50}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":142,"@stdlib/array/float64":3,"@stdlib/array/uint32":9}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":50}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":146}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":144,"@stdlib/array/float64":3,"@stdlib/array/uint32":9}],147:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/smallest-normal":78,"@stdlib/math/base/assert/is-infinite":84,"@stdlib/math/base/assert/is-nan":88,"@stdlib/math/base/special/abs":96}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":147,"./main.js":149,"@stdlib/utils/define-nonenumerable-read-only-property":184}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":147}],150:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":50,"dup":144}],151:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":150,"@stdlib/array/float64":3,"@stdlib/array/uint32":9}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":155}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":50}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./low.js":154,"@stdlib/array/float64":3,"@stdlib/array/uint32":9}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":158,"@stdlib/array/float64":3,"@stdlib/array/uint32":9}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":156,"./main.js":159,"@stdlib/utils/define-nonenumerable-read-only-property":184}],158:[function(require,module,exports){
arguments[4][142][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":50,"dup":142}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./assign.js":156}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],162:[function(require,module,exports){
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

},{"./main.js":163}],163:[function(require,module,exports){
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

},{"./main.js":165,"./regexp.js":166,"@stdlib/utils/define-nonenumerable-read-only-property":184}],165:[function(require,module,exports){
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

},{"./main.js":165}],167:[function(require,module,exports){
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

},{"./is_number.js":170}],168:[function(require,module,exports){
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

},{"./is_number.js":170,"./zero_pad.js":174}],169:[function(require,module,exports){
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

},{"./main.js":172}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{"./format_double.js":167,"./format_integer.js":168,"./is_string.js":171,"./space_pad.js":173,"./zero_pad.js":174}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
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

},{"./main.js":176}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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

},{"./main.js":179}],178:[function(require,module,exports){
arguments[4][171][0].apply(exports,arguments)
},{"dup":171}],179:[function(require,module,exports){
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

},{"./is_string.js":178,"@stdlib/string/base/format-interpolate":169,"@stdlib/string/base/format-tokenize":175}],180:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":181}],181:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-buffer":41,"@stdlib/regexp/function-name":164,"@stdlib/utils/native-class":202}],184:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":185}],185:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":189}],186:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{"./define_property.js":187}],189:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":186,"./has_define_property_support.js":188,"./polyfill.js":190}],190:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":177}],191:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":194,"./polyfill.js":195,"@stdlib/assert/is-function":47}],192:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":193}],193:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":191,"@stdlib/object/ctor":162}],194:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],195:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./proto.js":196,"@stdlib/utils/native-class":202}],196:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],197:[function(require,module,exports){
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

},{"./codegen.js":198,"./global_this.js":199,"./self.js":200,"./window.js":201,"@stdlib/assert/is-boolean":35,"@stdlib/string/format":177}],198:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],201:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],202:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":203,"./polyfill.js":204,"@stdlib/assert/has-tostringtag-support":22}],203:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":205}],204:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":205,"./tostringtag.js":206,"@stdlib/assert/has-own-property":18}],205:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],206:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":180}],207:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":208}],208:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-error":43}],209:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":210,"./fixtures/re.js":211,"./fixtures/typedarray.js":212}],210:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":197}],211:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],212:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],213:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./check.js":209,"./main.js":214,"./polyfill.js":215}],214:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":182}],215:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":182}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){

},{}],218:[function(require,module,exports){
arguments[4][217][0].apply(exports,arguments)
},{"dup":217}],219:[function(require,module,exports){
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
},{"base64-js":216,"buffer":219,"ieee754":322}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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
},{"_process":329}],222:[function(require,module,exports){
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

},{"events":220,"inherits":323,"readable-stream/lib/_stream_duplex.js":224,"readable-stream/lib/_stream_passthrough.js":225,"readable-stream/lib/_stream_readable.js":226,"readable-stream/lib/_stream_transform.js":227,"readable-stream/lib/_stream_writable.js":228,"readable-stream/lib/internal/streams/end-of-stream.js":232,"readable-stream/lib/internal/streams/pipeline.js":234}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
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
},{"./_stream_readable":226,"./_stream_writable":228,"_process":329,"inherits":323}],225:[function(require,module,exports){
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
},{"./_stream_transform":227,"inherits":323}],226:[function(require,module,exports){
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
},{"../errors":223,"./_stream_duplex":224,"./internal/streams/async_iterator":229,"./internal/streams/buffer_list":230,"./internal/streams/destroy":231,"./internal/streams/from":233,"./internal/streams/state":235,"./internal/streams/stream":236,"_process":329,"buffer":219,"events":220,"inherits":323,"string_decoder/":338,"util":217}],227:[function(require,module,exports){
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
},{"../errors":223,"./_stream_duplex":224,"inherits":323}],228:[function(require,module,exports){
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
},{"../errors":223,"./_stream_duplex":224,"./internal/streams/destroy":231,"./internal/streams/state":235,"./internal/streams/stream":236,"_process":329,"buffer":219,"inherits":323,"util-deprecate":347}],229:[function(require,module,exports){
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
},{"./end-of-stream":232,"_process":329}],230:[function(require,module,exports){
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
},{"buffer":219,"util":217}],231:[function(require,module,exports){
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
},{"_process":329}],232:[function(require,module,exports){
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
},{"../../../errors":223}],233:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],234:[function(require,module,exports){
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
},{"../../../errors":223,"./end-of-stream":232}],235:[function(require,module,exports){
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
},{"../../../errors":223}],236:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":220}],237:[function(require,module,exports){
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

},{"./":238,"get-intrinsic":313}],238:[function(require,module,exports){
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

},{"es-define-property":298,"es-errors/type":304,"function-bind":312,"get-intrinsic":313,"set-function-length":333}],239:[function(require,module,exports){
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

},{"./lib/is_arguments.js":240,"./lib/keys.js":241}],240:[function(require,module,exports){
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

},{}],241:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],242:[function(require,module,exports){
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

},{"es-define-property":298,"es-errors/syntax":303,"es-errors/type":304,"gopd":314}],243:[function(require,module,exports){
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

},{"define-data-property":242,"has-property-descriptors":315,"object-keys":327}],244:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],245:[function(require,module,exports){
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

},{"./ToNumber":276,"./ToPrimitive":278,"./Type":283}],246:[function(require,module,exports){
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

},{"../helpers/isFinite":291,"../helpers/isNaN":292,"../helpers/isPrefixOf":293,"./ToNumber":276,"./ToPrimitive":278,"es-errors/type":304,"get-intrinsic":313}],247:[function(require,module,exports){
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

},{"call-bind/callBound":237,"es-errors/type":304}],248:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":306}],249:[function(require,module,exports){
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

},{"./DayWithinYear":252,"./InLeapYear":256,"./MonthFromTime":266,"es-errors/eval":299}],250:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":297,"./floor":287}],251:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":287}],252:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":250,"./DayFromYear":251,"./YearFromTime":285}],253:[function(require,module,exports){
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

},{"./modulo":288}],254:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":295,"./IsAccessorDescriptor":257,"./IsDataDescriptor":259,"es-errors/type":304}],255:[function(require,module,exports){
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

},{"../helpers/timeConstants":297,"./floor":287,"./modulo":288}],256:[function(require,module,exports){
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

},{"./DaysInYear":253,"./YearFromTime":285,"es-errors/eval":299}],257:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":295,"es-errors/type":304,"hasown":321}],258:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":324}],259:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":295,"es-errors/type":304,"hasown":321}],260:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":257,"./IsDataDescriptor":259,"./IsPropertyDescriptor":261,"es-errors/type":304}],261:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":295}],262:[function(require,module,exports){
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

},{"../helpers/isFinite":291,"../helpers/timeConstants":297}],263:[function(require,module,exports){
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

},{"../helpers/isFinite":291,"./DateFromTime":249,"./Day":250,"./MonthFromTime":266,"./ToInteger":275,"./YearFromTime":285,"./floor":287,"./modulo":288,"get-intrinsic":313}],264:[function(require,module,exports){
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

},{"../helpers/isFinite":291,"../helpers/timeConstants":297,"./ToInteger":275}],265:[function(require,module,exports){
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

},{"../helpers/timeConstants":297,"./floor":287,"./modulo":288}],266:[function(require,module,exports){
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

},{"./DayWithinYear":252,"./InLeapYear":256}],267:[function(require,module,exports){
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

},{"../helpers/isNaN":292}],268:[function(require,module,exports){
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

},{"../helpers/timeConstants":297,"./floor":287,"./modulo":288}],269:[function(require,module,exports){
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

},{"./Type":283}],270:[function(require,module,exports){
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


},{"../helpers/isFinite":291,"./ToNumber":276,"./abs":286,"get-intrinsic":313}],271:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":297,"./DayFromYear":251}],272:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":297,"./modulo":288}],273:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],274:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":276}],275:[function(require,module,exports){
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

},{"../helpers/isFinite":291,"../helpers/isNaN":292,"../helpers/sign":296,"./ToNumber":276,"./abs":286,"./floor":287}],276:[function(require,module,exports){
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

},{"./ToPrimitive":278,"call-bind/callBound":237,"safe-regex-test":332}],277:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":307}],278:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":309}],279:[function(require,module,exports){
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

},{"./IsCallable":258,"./ToBoolean":273,"./Type":283,"es-errors/type":304,"hasown":321}],280:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":313}],281:[function(require,module,exports){
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

},{"../helpers/isFinite":291,"../helpers/isNaN":292,"../helpers/sign":296,"./ToNumber":276,"./abs":286,"./floor":287,"./modulo":288}],282:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":276}],283:[function(require,module,exports){
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

},{}],284:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":250,"./modulo":288}],285:[function(require,module,exports){
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

},{"call-bind/callBound":237,"get-intrinsic":313}],286:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":313}],287:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],288:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":294}],289:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":297,"./modulo":288}],290:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":245,"./5/AbstractRelationalComparison":246,"./5/Canonicalize":247,"./5/CheckObjectCoercible":248,"./5/DateFromTime":249,"./5/Day":250,"./5/DayFromYear":251,"./5/DayWithinYear":252,"./5/DaysInYear":253,"./5/FromPropertyDescriptor":254,"./5/HourFromTime":255,"./5/InLeapYear":256,"./5/IsAccessorDescriptor":257,"./5/IsCallable":258,"./5/IsDataDescriptor":259,"./5/IsGenericDescriptor":260,"./5/IsPropertyDescriptor":261,"./5/MakeDate":262,"./5/MakeDay":263,"./5/MakeTime":264,"./5/MinFromTime":265,"./5/MonthFromTime":266,"./5/SameValue":267,"./5/SecFromTime":268,"./5/StrictEqualityComparison":269,"./5/TimeClip":270,"./5/TimeFromYear":271,"./5/TimeWithinDay":272,"./5/ToBoolean":273,"./5/ToInt32":274,"./5/ToInteger":275,"./5/ToNumber":276,"./5/ToObject":277,"./5/ToPrimitive":278,"./5/ToPropertyDescriptor":279,"./5/ToString":280,"./5/ToUint16":281,"./5/ToUint32":282,"./5/Type":283,"./5/WeekDay":284,"./5/YearFromTime":285,"./5/abs":286,"./5/floor":287,"./5/modulo":288,"./5/msFromTime":289}],291:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":292}],292:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],293:[function(require,module,exports){
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

},{"call-bind/callBound":237}],294:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],295:[function(require,module,exports){
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

},{"es-errors/type":304,"hasown":321}],296:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],297:[function(require,module,exports){
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

},{}],298:[function(require,module,exports){
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

},{"get-intrinsic":313}],299:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],300:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],301:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],302:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],303:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],304:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],305:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],306:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":304}],307:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":308,"./RequireObjectCoercible":306}],308:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],309:[function(require,module,exports){
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

},{"./helpers/isPrimitive":310,"is-callable":324}],310:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],311:[function(require,module,exports){
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

},{}],312:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":311}],313:[function(require,module,exports){
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

},{"es-errors":300,"es-errors/eval":299,"es-errors/range":301,"es-errors/ref":302,"es-errors/syntax":303,"es-errors/type":304,"es-errors/uri":305,"function-bind":312,"has-proto":316,"has-symbols":317,"hasown":321}],314:[function(require,module,exports){
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

},{"get-intrinsic":313}],315:[function(require,module,exports){
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

},{"es-define-property":298}],316:[function(require,module,exports){
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

},{}],317:[function(require,module,exports){
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

},{"./shams":318}],318:[function(require,module,exports){
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

},{}],319:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":318}],320:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":312}],321:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":312}],322:[function(require,module,exports){
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

},{}],323:[function(require,module,exports){
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

},{}],324:[function(require,module,exports){
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

},{}],325:[function(require,module,exports){
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

},{"call-bind/callBound":237,"has-tostringtag/shams":319}],326:[function(require,module,exports){
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

},{"./isArguments":328}],327:[function(require,module,exports){
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

},{"./implementation":326,"./isArguments":328}],328:[function(require,module,exports){
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

},{}],329:[function(require,module,exports){
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

},{}],330:[function(require,module,exports){
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
},{"_process":329,"through":345,"timers":346}],331:[function(require,module,exports){
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

},{"buffer":219}],332:[function(require,module,exports){
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

},{"call-bind/callBound":237,"es-errors/type":304,"is-regex":325}],333:[function(require,module,exports){
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

},{"define-data-property":242,"es-errors/type":304,"get-intrinsic":313,"gopd":314,"has-property-descriptors":315}],334:[function(require,module,exports){
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

},{"es-abstract/es5":290,"function-bind":312}],335:[function(require,module,exports){
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

},{"./implementation":334,"./polyfill":336,"./shim":337,"define-properties":243,"function-bind":312}],336:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":334}],337:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":336,"define-properties":243}],338:[function(require,module,exports){
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
},{"safe-buffer":331}],339:[function(require,module,exports){
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
},{"./lib/default_stream":340,"./lib/results":342,"./lib/test":343,"_process":329,"defined":244,"through":345,"timers":346}],340:[function(require,module,exports){
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
},{"_process":329,"fs":218,"through":345}],341:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":329,"timers":346}],342:[function(require,module,exports){
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
},{"_process":329,"events":220,"function-bind":312,"has":320,"inherits":323,"object-inspect":344,"resumer":330,"through":345,"timers":346}],343:[function(require,module,exports){
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
},{"./next_tick":341,"deep-equal":239,"defined":244,"events":220,"has":320,"inherits":323,"path":221,"string.prototype.trim":335}],344:[function(require,module,exports){
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

},{}],345:[function(require,module,exports){
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
},{"_process":329,"stream":222}],346:[function(require,module,exports){
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
},{"process/browser.js":329,"timers":346}],347:[function(require,module,exports){
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
},{}]},{},[116,117]);
