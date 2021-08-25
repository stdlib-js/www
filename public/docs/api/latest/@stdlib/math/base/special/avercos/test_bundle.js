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

var ctor = ( typeof Float32Array === 'function' ) ? Float32Array : void 0; // eslint-disable-line stdlib/require-globals


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

},{"./float32array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float32array-support":33}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./float64array.js":4,"./polyfill.js":6,"@stdlib/assert/has-float64array-support":36}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array constructor which returns a typed array representing an array of twos-complement 16-bit signed integers in the platform byte order.
*
* @module @stdlib/array/int16
*
* @example
* var ctor = require( '@stdlib/array/int16' );
*
* var arr = new ctor( 10 );
* // returns <Int16Array>
*/

// MODULES //

var hasInt16ArraySupport = require( '@stdlib/assert/has-int16array-support' );
var builtin = require( './int16array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasInt16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./int16array.js":8,"./polyfill.js":9,"@stdlib/assert/has-int16array-support":41}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Int16Array === 'function' ) ? Int16Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of twos-complement 16-bit signed integers in the platform byte order.
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

/**
* Typed array constructor which returns a typed array representing an array of twos-complement 32-bit signed integers in the platform byte order.
*
* @module @stdlib/array/int32
*
* @example
* var ctor = require( '@stdlib/array/int32' );
*
* var arr = new ctor( 10 );
* // returns <Int32Array>
*/

// MODULES //

var hasInt32ArraySupport = require( '@stdlib/assert/has-int32array-support' );
var builtin = require( './int32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasInt32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./int32array.js":11,"./polyfill.js":12,"@stdlib/assert/has-int32array-support":44}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Int32Array === 'function' ) ? Int32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of twos-complement 32-bit signed integers in the platform byte order.
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

/**
* Typed array constructor which returns a typed array representing an array of twos-complement 8-bit signed integers in the platform byte order.
*
* @module @stdlib/array/int8
*
* @example
* var ctor = require( '@stdlib/array/int8' );
*
* var arr = new ctor( 10 );
* // returns <Int8Array>
*/

// MODULES //

var hasInt8ArraySupport = require( '@stdlib/assert/has-int8array-support' );
var builtin = require( './int8array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasInt8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./int8array.js":14,"./polyfill.js":15,"@stdlib/assert/has-int8array-support":47}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Int8Array === 'function' ) ? Int8Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of twos-complement 8-bit signed integers in the platform byte order.
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

// MODULES //

var Int8Array = require( '@stdlib/array/int8' );
var Uint8Array = require( '@stdlib/array/uint8' );
var Uint8ClampedArray = require( '@stdlib/array/uint8c' );
var Int16Array = require( '@stdlib/array/int16' );
var Uint16Array = require( '@stdlib/array/uint16' );
var Int32Array = require( '@stdlib/array/int32' );
var Uint32Array = require( '@stdlib/array/uint32' );
var Float32Array = require( '@stdlib/array/float32' );
var Float64Array = require( '@stdlib/array/float64' );


// MAIN //

var CTORS = [
	[ Float64Array, 'Float64Array' ],
	[ Float32Array, 'Float32Array' ],
	[ Int32Array, 'Int32Array' ],
	[ Uint32Array, 'Uint32Array' ],
	[ Int16Array, 'Int16Array' ],
	[ Uint16Array, 'Uint16Array' ],
	[ Int8Array, 'Int8Array' ],
	[ Uint8Array, 'Uint8Array' ],
	[ Uint8ClampedArray, 'Uint8ClampedArray' ]
];


// EXPORTS //

module.exports = CTORS;

},{"@stdlib/array/float32":2,"@stdlib/array/float64":5,"@stdlib/array/int16":7,"@stdlib/array/int32":10,"@stdlib/array/int8":13,"@stdlib/array/uint16":20,"@stdlib/array/uint32":23,"@stdlib/array/uint8":26,"@stdlib/array/uint8c":29}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return a JSON representation of a typed array.
*
* @module @stdlib/array/to-json
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var toJSON = require( '@stdlib/array/to-json' );
*
* var arr = new Float64Array( [ 5.0, 3.0 ] );
* var json = toJSON( arr );
* // returns { 'type': 'Float64Array', 'data': [ 5.0, 3.0 ] }
*/

// MODULES //

var toJSON = require( './to_json.js' );


// EXPORTS //

module.exports = toJSON;

},{"./to_json.js":18}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isTypedArray = require( '@stdlib/assert/is-typed-array' );
var typeName = require( './type.js' );


// MAIN //

/**
* Returns a JSON representation of a typed array.
*
* ## Notes
*
* -   We build a JSON object representing a typed array similar to how Node.js `Buffer` objects are represented. See [Buffer][1].
*
* [1]: https://nodejs.org/api/buffer.html#buffer_buf_tojson
*
* @param {TypedArray} arr - typed array to serialize
* @throws {TypeError} first argument must be a typed array
* @returns {Object} JSON representation
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
*
* var arr = new Float64Array( [ 5.0, 3.0 ] );
* var json = toJSON( arr );
* // returns { 'type': 'Float64Array', 'data': [ 5.0, 3.0 ] }
*/
function toJSON( arr ) {
	var out;
	var i;
	if ( !isTypedArray( arr ) ) {
		throw new TypeError( 'invalid argument. Must provide a typed array. Value: `' + arr + '`.' );
	}
	out = {};
	out.type = typeName( arr );
	out.data = [];
	for ( i = 0; i < arr.length; i++ ) {
		out.data.push( arr[ i ] );
	}
	return out;
}


// EXPORTS //

module.exports = toJSON;

},{"./type.js":19,"@stdlib/assert/is-typed-array":116}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var instanceOf = require( '@stdlib/assert/instance-of' );
var ctorName = require( '@stdlib/utils/constructor-name' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var CTORS = require( './ctors.js' );


// MAIN //

/**
* Returns the typed array type.
*
* @private
* @param {TypedArray} arr - typed array
* @returns {(string|void)} typed array type
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
*
* var arr = new Float64Array( 5 );
* var str = typeName( arr );
* // returns 'Float64Array'
*/
function typeName( arr ) {
	var v;
	var i;

	// Check for typed array objects from the same realm (same Node.js `vm` or same `Window` object)...
	for ( i = 0; i < CTORS.length; i++ ) {
		if ( instanceOf( arr, CTORS[ i ][ 0 ] ) ) {
			return CTORS[ i ][ 1 ];
		}
	}
	// Walk the prototype tree until we find an object having a desired native class...
	while ( arr ) {
		v = ctorName( arr );
		for ( i = 0; i < CTORS.length; i++ ) {
			if ( v === CTORS[ i ][ 1 ] ) {
				return CTORS[ i ][ 1 ];
			}
		}
		arr = getPrototypeOf( arr );
	}
}


// EXPORTS //

module.exports = typeName;

},{"./ctors.js":16,"@stdlib/assert/instance-of":68,"@stdlib/utils/constructor-name":197,"@stdlib/utils/get-prototype-of":214}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyfill.js":21,"./uint16array.js":22,"@stdlib/assert/has-uint16array-support":56}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

},{"./polyfill.js":24,"./uint32array.js":25,"@stdlib/assert/has-uint32array-support":59}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyfill.js":27,"./uint8array.js":28,"@stdlib/assert/has-uint8array-support":62}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order clamped to 0-255.
*
* @module @stdlib/array/uint8c
*
* @example
* var ctor = require( '@stdlib/array/uint8c' );
*
* var arr = new ctor( 10 );
* // returns <Uint8ClampedArray>
*/

// MODULES //

var hasUint8ClampedArraySupport = require( '@stdlib/assert/has-uint8clampedarray-support' ); // eslint-disable-line id-length
var builtin = require( './uint8clampedarray.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint8ClampedArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":30,"./uint8clampedarray.js":31,"@stdlib/assert/has-uint8clampedarray-support":65}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order clamped to 0-255.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

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

// MAIN //

var ctor = ( typeof Uint8ClampedArray === 'function' ) ? Uint8ClampedArray : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

// MAIN //

var main = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


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

var isFloat32Array = require( '@stdlib/assert/is-float32array' );
var PINF = require( '@stdlib/constants/float64/pinf' );
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

},{"./float32array.js":32,"@stdlib/assert/is-float32array":82,"@stdlib/constants/float64/pinf":137}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./float64array.js":35,"@stdlib/assert/is-float64array":84}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Dummy function.
*
* @private
*/
function foo() {
	// No-op...
}


// EXPORTS //

module.exports = foo;

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
* Test for native function `name` support.
*
* @module @stdlib/assert/has-function-name-support
*
* @example
* var hasFunctionNameSupport = require( '@stdlib/assert/has-function-name-support' );
*
* var bool = hasFunctionNameSupport();
* // returns <boolean>
*/

// MODULES //

var hasFunctionNameSupport = require( './main.js' );


// EXPORTS //

module.exports = hasFunctionNameSupport;

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

var foo = require( './foo.js' );


// MAIN //

/**
* Tests for native function `name` support.
*
* @returns {boolean} boolean indicating if an environment has function `name` support
*
* @example
* var bool = hasFunctionNameSupport();
* // returns <boolean>
*/
function hasFunctionNameSupport() {
	return ( foo.name === 'foo' );
}


// EXPORTS //

module.exports = hasFunctionNameSupport;

},{"./foo.js":38}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Int16Array` support.
*
* @module @stdlib/assert/has-int16array-support
*
* @example
* var hasInt16ArraySupport = require( '@stdlib/assert/has-int16array-support' );
*
* var bool = hasInt16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasInt16ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasInt16ArraySupport;

},{"./main.js":43}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Int16Array === 'function' ) ? Int16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInt16Array = require( '@stdlib/assert/is-int16array' );
var INT16_MAX = require( '@stdlib/constants/int16/max' );
var INT16_MIN = require( '@stdlib/constants/int16/min' );
var GlobalInt16Array = require( './int16array.js' );


// MAIN //

/**
* Tests for native `Int16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Int16Array` support
*
* @example
* var bool = hasInt16ArraySupport();
* // returns <boolean>
*/
function hasInt16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalInt16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalInt16Array( [ 1, 3.14, -3.14, INT16_MAX+1 ] );
		bool = (
			isInt16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&      // truncation
			arr[ 2 ] === -3 &&     // truncation
			arr[ 3 ] === INT16_MIN // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasInt16ArraySupport;

},{"./int16array.js":42,"@stdlib/assert/is-int16array":88,"@stdlib/constants/int16/max":138,"@stdlib/constants/int16/min":139}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Int32Array` support.
*
* @module @stdlib/assert/has-int32array-support
*
* @example
* var hasInt32ArraySupport = require( '@stdlib/assert/has-int32array-support' );
*
* var bool = hasInt32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasInt32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasInt32ArraySupport;

},{"./main.js":46}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Int32Array === 'function' ) ? Int32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

},{}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isInt32Array = require( '@stdlib/assert/is-int32array' );
var INT32_MAX = require( '@stdlib/constants/int32/max' );
var INT32_MIN = require( '@stdlib/constants/int32/min' );
var GlobalInt32Array = require( './int32array.js' );


// MAIN //

/**
* Tests for native `Int32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Int32Array` support
*
* @example
* var bool = hasInt32ArraySupport();
* // returns <boolean>
*/
function hasInt32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalInt32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalInt32Array( [ 1, 3.14, -3.14, INT32_MAX+1 ] );
		bool = (
			isInt32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&      // truncation
			arr[ 2 ] === -3 &&     // truncation
			arr[ 3 ] === INT32_MIN // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasInt32ArraySupport;

},{"./int32array.js":45,"@stdlib/assert/is-int32array":90,"@stdlib/constants/int32/max":140,"@stdlib/constants/int32/min":141}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test for native `Int8Array` support.
*
* @module @stdlib/assert/has-int8array-support
*
* @example
* var hasInt8ArraySupport = require( '@stdlib/assert/has-int8array-support' );
*
* var bool = hasInt8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasInt8ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasInt8ArraySupport;

},{"./main.js":49}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Int8Array === 'function' ) ? Int8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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

// MODULES //

var isInt8Array = require( '@stdlib/assert/is-int8array' );
var INT8_MAX = require( '@stdlib/constants/int8/max' );
var INT8_MIN = require( '@stdlib/constants/int8/min' );
var GlobalInt8Array = require( './int8array.js' );


// MAIN //

/**
* Tests for native `Int8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Int8Array` support
*
* @example
* var bool = hasInt8ArraySupport();
* // returns <boolean>
*/
function hasInt8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalInt8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalInt8Array( [ 1, 3.14, -3.14, INT8_MAX+1 ] );
		bool = (
			isInt8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&     // truncation
			arr[ 2 ] === -3 &&    // truncation
			arr[ 3 ] === INT8_MIN // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasInt8ArraySupport;

},{"./int8array.js":48,"@stdlib/assert/is-int8array":92,"@stdlib/constants/int8/max":142,"@stdlib/constants/int8/min":143}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":53}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/has-symbol-support":52}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":58,"@stdlib/assert/is-uint16array":119,"@stdlib/constants/uint16/max":144}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":61,"@stdlib/assert/is-uint32array":121,"@stdlib/constants/uint32/max":145}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":64,"@stdlib/assert/is-uint8array":123,"@stdlib/constants/uint8/max":146}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test for native `Uint8ClampedArray` support.
*
* @module @stdlib/assert/has-uint8clampedarray-support
*
* @example
* var hasUint8ClampedArraySupport = require( '@stdlib/assert/has-uint8clampedarray-support' );
*
* var bool = hasUint8ClampedArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ClampedArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasUint8ClampedArraySupport;

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

var isUint8ClampedArray = require( '@stdlib/assert/is-uint8clampedarray' );
var GlobalUint8ClampedArray = require( './uint8clampedarray.js' );


// MAIN //

/**
* Tests for native `Uint8ClampedArray` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8ClampedArray` support
*
* @example
* var bool = hasUint8ClampedArraySupport();
* // returns <boolean>
*/
function hasUint8ClampedArraySupport() { // eslint-disable-line id-length
	var bool;
	var arr;

	if ( typeof GlobalUint8ClampedArray !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalUint8ClampedArray( [ -1, 0, 1, 3.14, 4.99, 255, 256 ] );
		bool = (
			isUint8ClampedArray( arr ) &&
			arr[ 0 ] === 0 &&   // clamped
			arr[ 1 ] === 0 &&
			arr[ 2 ] === 1 &&
			arr[ 3 ] === 3 &&   // round to nearest
			arr[ 4 ] === 5 &&   // round to nearest
			arr[ 5 ] === 255 &&
			arr[ 6 ] === 255    // clamped
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ClampedArraySupport;

},{"./uint8clampedarray.js":67,"@stdlib/assert/is-uint8clampedarray":125}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Uint8ClampedArray === 'function' ) ? Uint8ClampedArray : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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
* Test whether a value has in its prototype chain a specified constructor as a prototype property.
*
* @module @stdlib/assert/instance-of
*
* @example
* var instanceOf = require( '@stdlib/assert/instance-of' );
*
* var bool = instanceOf( [], Array );
* // returns true
*
* bool = instanceOf( {}, Object ); // exception
* // returns true
*
* bool = instanceOf( 'beep', String );
* // returns false
*
* bool = instanceOf( null, Object );
* // returns false
*
* bool = instanceOf( 5, Object );
* // returns false
*/

// MODULES //

var instanceOf = require( './main.js' );


// EXPORTS //

module.exports = instanceOf;

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

// MAIN //

/**
* Tests whether a value has in its prototype chain a specified constructor as a prototype property.
*
* @param {*} value - value to test
* @param {Function} constructor - constructor to test against
* @throws {TypeError} constructor must be callable
* @returns {boolean} boolean indicating whether a value is an instance of a provided constructor
*
* @example
* var bool = instanceOf( [], Array );
* // returns true
*
* @example
* var bool = instanceOf( {}, Object ); // exception
* // returns true
*
* @example
* var bool = instanceOf( 'beep', String );
* // returns false
*
* @example
* var bool = instanceOf( null, Object );
* // returns false
*
* @example
* var bool = instanceOf( 5, Object );
* // returns false
*/
function instanceOf( value, constructor ) {
	// TODO: replace with `isCallable` check
	if ( typeof constructor !== 'function' ) {
		throw new TypeError( 'invalid argument. `constructor` argument must be callable. Value: `'+constructor+'`.' );
	}
	return ( value instanceof constructor );
}


// EXPORTS //

module.exports = instanceOf;

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

},{"@stdlib/utils/native-class":224}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* // Use interface to check for boolean primitives...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* // Use interface to check for boolean objects...
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
var isBoolean = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./main.js":73,"./object.js":74,"./primitive.js":75,"@stdlib/utils/define-nonenumerable-read-only-property":201}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":74,"./primitive.js":75}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":77,"@stdlib/assert/has-tostringtag-support":54,"@stdlib/utils/native-class":224}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
}


// EXPORTS //

module.exports = isBoolean;

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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

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

},{"./tostring.js":76}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isBuffer = require( './main.js' );


// EXPORTS //

module.exports = isBuffer;

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

},{"@stdlib/assert/is-object-like":105}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a collection.
*
* @module @stdlib/assert/is-collection
*
* @example
* var isCollection = require( '@stdlib/assert/is-collection' );
*
* var bool = isCollection( [] );
* // returns true
*
* bool = isCollection( {} );
* // returns false
*/

// MODULES //

var isCollection = require( './main.js' );


// EXPORTS //

module.exports = isCollection;

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

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/constants/array/max-typed-array-length' );


// MAIN //

/**
* Tests if a value is a collection.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a collection
*
* @example
* var bool = isCollection( [] );
* // returns true
*
* @example
* var bool = isCollection( {} );
* // returns false
*/
function isCollection( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH
	);
}


// EXPORTS //

module.exports = isCollection;

},{"@stdlib/constants/array/max-typed-array-length":132,"@stdlib/math/base/assert/is-integer":147}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":224}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":224}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isFunction = require( './main.js' );


// EXPORTS //

module.exports = isFunction;

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

},{"@stdlib/utils/type-of":233}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an Int16Array.
*
* @module @stdlib/assert/is-int16array
*
* @example
* var isInt16Array = require( '@stdlib/assert/is-int16array' );
*
* var bool = isInt16Array( new Int16Array( 10 ) );
* // returns true
*
* bool = isInt16Array( [] );
* // returns false
*/

// MODULES //

var isInt16Array = require( './main.js' );


// EXPORTS //

module.exports = isInt16Array;

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

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasInt16Array = ( typeof Int16Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is an Int16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an Int16Array
*
* @example
* var bool = isInt16Array( new Int16Array( 10 ) );
* // returns true
*
* @example
* var bool = isInt16Array( [] );
* // returns false
*/
function isInt16Array( value ) {
	return (
		( hasInt16Array && value instanceof Int16Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Int16Array]'
	);
}


// EXPORTS //

module.exports = isInt16Array;

},{"@stdlib/utils/native-class":224}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an Int32Array.
*
* @module @stdlib/assert/is-int32array
*
* @example
* var isInt32Array = require( '@stdlib/assert/is-int32array' );
*
* var bool = isInt32Array( new Int32Array( 10 ) );
* // returns true
*
* bool = isInt32Array( [] );
* // returns false
*/

// MODULES //

var isInt32Array = require( './main.js' );


// EXPORTS //

module.exports = isInt32Array;

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

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasInt32Array = ( typeof Int32Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is an Int32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an Int32Array
*
* @example
* var bool = isInt32Array( new Int32Array( 10 ) );
* // returns true
*
* @example
* var bool = isInt32Array( [] );
* // returns false
*/
function isInt32Array( value ) {
	return (
		( hasInt32Array && value instanceof Int32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Int32Array]'
	);
}


// EXPORTS //

module.exports = isInt32Array;

},{"@stdlib/utils/native-class":224}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is an Int8Array.
*
* @module @stdlib/assert/is-int8array
*
* @example
* var isInt8Array = require( '@stdlib/assert/is-int8array' );
*
* var bool = isInt8Array( new Int8Array( 10 ) );
* // returns true
*
* bool = isInt8Array( [] );
* // returns false
*/

// MODULES //

var isInt8Array = require( './main.js' );


// EXPORTS //

module.exports = isInt8Array;

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

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasInt8Array = ( typeof Int8Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is an Int8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an Int8Array
*
* @example
* var bool = isInt8Array( new Int8Array( 10 ) );
* // returns true
*
* @example
* var bool = isInt8Array( [] );
* // returns false
*/
function isInt8Array( value ) {
	return (
		( hasInt8Array && value instanceof Int8Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Int8Array]'
	);
}


// EXPORTS //

module.exports = isInt8Array;

},{"@stdlib/utils/native-class":224}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":96,"./object.js":97,"./primitive.js":98,"@stdlib/utils/define-nonenumerable-read-only-property":201}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":136,"@stdlib/constants/float64/pinf":137,"@stdlib/math/base/assert/is-integer":147}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./object.js":97,"./primitive.js":98}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./integer.js":95,"@stdlib/assert/is-number":99}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./integer.js":95,"@stdlib/assert/is-number":99}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":100,"./object.js":101,"./primitive.js":102,"@stdlib/utils/define-nonenumerable-read-only-property":201}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./object.js":101,"./primitive.js":102}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":104,"@stdlib/assert/has-tostringtag-support":54,"@stdlib/number/ctor":174,"@stdlib/utils/native-class":224}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{"@stdlib/number/ctor":174}],104:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"./tostring.js":103,"dup":77}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var isObjectLike = require( './main.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./main.js":106,"@stdlib/assert/tools/array-function":128,"@stdlib/utils/define-nonenumerable-read-only-property":201}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":70}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a plain object.
*
* @module @stdlib/assert/is-plain-object
*
* @example
* var isPlainObject = require( '@stdlib/assert/is-plain-object' );
*
* var bool = isPlainObject( {} );
* // returns true
*
* bool = isPlainObject( null );
* // returns false
*/

// MODULES //

var isPlainObject = require( './main.js' );


// EXPORTS //

module.exports = isPlainObject;

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

// MODULES //

var isObject = require( '@stdlib/assert/is-object' );
var isFunction = require( '@stdlib/assert/is-function' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var objectPrototype = Object.prototype;


// FUNCTIONS //

/**
* Tests that an object only has own properties.
*
* @private
* @param {Object} obj - value to test
* @returns {boolean} boolean indicating if an object only has own properties
*/
function ownProps( obj ) {
	var key;

	// NOTE: possibility of perf boost if key enumeration order is known (see http://stackoverflow.com/questions/18531624/isplainobject-thing).
	for ( key in obj ) {
		if ( !hasOwnProp( obj, key ) ) {
			return false;
		}
	}
	return true;
}


// MAIN //

/**
* Tests if a value is a plain object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a plain object
*
* @example
* var bool = isPlainObject( {} );
* // returns true
*
* @example
* var bool = isPlainObject( null );
* // returns false
*/
function isPlainObject( value ) {
	var proto;

	// Screen for obvious non-objects...
	if ( !isObject( value ) ) {
		return false;
	}
	// Objects with no prototype (e.g., `Object.create( null )`) are plain...
	proto = getPrototypeOf( value );
	if ( !proto ) {
		return true;
	}
	// Objects having a prototype are plain if and only if they are constructed with a global `Object` function and the prototype points to the prototype of a plain object...
	return (
		// Cannot have own `constructor` property:
		!hasOwnProp( value, 'constructor' ) &&

		// Prototype `constructor` property must be a function (see also https://bugs.jquery.com/ticket/9897 and http://stackoverflow.com/questions/18531624/isplainobject-thing):
		hasOwnProp( proto, 'constructor' ) &&
		isFunction( proto.constructor ) &&
		nativeClass( proto.constructor ) === '[object Function]' &&

		// Test for object-specific method:
		hasOwnProp( proto, 'isPrototypeOf' ) &&
		isFunction( proto.isPrototypeOf ) &&

		(
			// Test if the prototype matches the global `Object` prototype (same realm):
			proto === objectPrototype ||

			// Test that all properties are own properties (cross-realm; *most* likely a plain object):
			ownProps( value )
		)
	);
}


// EXPORTS //

module.exports = isPlainObject;

},{"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-function":86,"@stdlib/assert/is-object":107,"@stdlib/utils/get-prototype-of":214,"@stdlib/utils/native-class":224}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a positive integer.
*
* @module @stdlib/assert/is-positive-integer
*
* @example
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' );
*
* var bool = isPositiveInteger( 5.0 );
* // returns true
*
* bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isPositiveInteger( -5.0 );
* // returns false
*
* bool = isPositiveInteger( 3.14 );
* // returns false
*
* bool = isPositiveInteger( null );
* // returns false
*
* @example
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
*
* var bool = isPositiveInteger( 3.0 );
* // returns true
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isObject;
*
* var bool = isPositiveInteger( 3.0 );
* // returns false
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isPositiveInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isPositiveInteger, 'isPrimitive', isPrimitive );
setReadOnly( isPositiveInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isPositiveInteger;

},{"./main.js":112,"./object.js":113,"./primitive.js":114,"@stdlib/utils/define-nonenumerable-read-only-property":201}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Tests if a value is a positive integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a positive integer
*
* @example
* var bool = isPositiveInteger( 5.0 );
* // returns true
*
* @example
* var bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isPositiveInteger( 0.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( -5.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( 3.14 );
* // returns false
*
* @example
* var bool = isPositiveInteger( null );
* // returns false
*/
function isPositiveInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isPositiveInteger;

},{"./object.js":113,"./primitive.js":114}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Tests if a value is a number object having a positive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a positive integer value
*
* @example
* var bool = isPositiveInteger( 3.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( new Number( 3.0 ) );
* // returns true
*/
function isPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() > 0.0
	);
}


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":94}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Tests if a value is a number primitive having a positive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a positive integer value
*
* @example
* var bool = isPositiveInteger( 3.0 );
* // returns true
*
* @example
* var bool = isPositiveInteger( new Number( 3.0 ) );
* // returns false
*/
function isPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value > 0.0
	);
}


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":94}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var Int8Array = require( '@stdlib/array/int8' );
var Uint8Array = require( '@stdlib/array/uint8' );
var Uint8ClampedArray = require( '@stdlib/array/uint8c' );
var Int16Array = require( '@stdlib/array/int16' );
var Uint16Array = require( '@stdlib/array/uint16' );
var Int32Array = require( '@stdlib/array/int32' );
var Uint32Array = require( '@stdlib/array/uint32' );
var Float32Array = require( '@stdlib/array/float32' );
var Float64Array = require( '@stdlib/array/float64' );


// MAIN //

var CTORS = [
	Float64Array,
	Float32Array,
	Int32Array,
	Uint32Array,
	Int16Array,
	Uint16Array,
	Int8Array,
	Uint8Array,
	Uint8ClampedArray
];


// EXPORTS //

module.exports = CTORS;

},{"@stdlib/array/float32":2,"@stdlib/array/float64":5,"@stdlib/array/int16":7,"@stdlib/array/int32":10,"@stdlib/array/int8":13,"@stdlib/array/uint16":20,"@stdlib/array/uint32":23,"@stdlib/array/uint8":26,"@stdlib/array/uint8c":29}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a typed array.
*
* @module @stdlib/assert/is-typed-array
*
* @example
* var Int8Array = require( '@stdlib/array/int8' );
* var isTypedArray = require( '@stdlib/assert/is-typed-array' );
*
* var bool = isTypedArray( new Int8Array( 10 ) );
* // returns true
*/

// MODULES //

var isTypedArray = require( './main.js' );


// EXPORTS //

module.exports = isTypedArray;

},{"./main.js":117}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var fcnName = require( '@stdlib/utils/function-name' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
var Float64Array = require( '@stdlib/array/float64' );
var CTORS = require( './ctors.js' );
var NAMES = require( './names.json' );


// VARIABLES //

// Abstract `TypedArray` class:
var TypedArray = ( hasFloat64ArraySupport() ) ? getPrototypeOf( Float64Array ) : Dummy; // eslint-disable-line max-len

// Ensure abstract typed array class has expected name:
TypedArray = ( fcnName( TypedArray ) === 'TypedArray' ) ? TypedArray : Dummy;


// FUNCTIONS //

/**
* Dummy constructor.
*
* @private
*/
function Dummy() {} // eslint-disable-line no-empty-function


// MAIN //

/**
* Tests if a value is a typed array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a typed array
*
* @example
* var Int8Array = require( '@stdlib/array/int8' );
*
* var bool = isTypedArray( new Int8Array( 10 ) );
* // returns true
*/
function isTypedArray( value ) {
	var v;
	var i;

	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for the abstract class...
	if ( value instanceof TypedArray ) {
		return true;
	}
	// Check for typed array objects from the same realm (same Node.js `vm` or same `Window` object)...
	for ( i = 0; i < CTORS.length; i++ ) {
		if ( value instanceof CTORS[ i ] ) {
			return true;
		}
	}
	// Walk the prototype tree until we find an object having a desired class...
	while ( value ) {
		v = ctorName( value );
		for ( i = 0; i < NAMES.length; i++ ) {
			if ( NAMES[ i ] === v ) {
				return true;
			}
		}
		value = getPrototypeOf( value );
	}

	return false;
}


// EXPORTS //

module.exports = isTypedArray;

},{"./ctors.js":115,"./names.json":118,"@stdlib/array/float64":5,"@stdlib/assert/has-float64array-support":36,"@stdlib/utils/constructor-name":197,"@stdlib/utils/function-name":211,"@stdlib/utils/get-prototype-of":214}],118:[function(require,module,exports){
module.exports=[
	"Int8Array",
	"Uint8Array",
	"Uint8ClampedArray",
	"Int16Array",
	"Uint16Array",
	"Int32Array",
	"Uint32Array",
	"Float32Array",
	"Float64Array"
]

},{}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":120}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":224}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":224}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":124}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":224}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Uint8ClampedArray.
*
* @module @stdlib/assert/is-uint8clampedarray
*
* @example
* var isUint8ClampedArray = require( '@stdlib/assert/is-uint8clampedarray' );
*
* var bool = isUint8ClampedArray( new Uint8ClampedArray( 10 ) );
* // returns true
*
* bool = isUint8ClampedArray( [] );
* // returns false
*/

// MODULES //

var isUint8ClampedArray = require( './main.js' );


// EXPORTS //

module.exports = isUint8ClampedArray;

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
*/

'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var hasUint8ClampedArray = ( typeof Uint8ClampedArray === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Uint8ClampedArray.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8ClampedArray
*
* @example
* var bool = isUint8ClampedArray( new Uint8ClampedArray( 10 ) );
* // returns true
*
* @example
* var bool = isUint8ClampedArray( [] );
* // returns false
*/
function isUint8ClampedArray( value ) {
	return (
		( hasUint8ClampedArray && value instanceof Uint8ClampedArray ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Uint8ClampedArray]'
	);
}


// EXPORTS //

module.exports = isUint8ClampedArray;

},{"@stdlib/utils/native-class":224}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
		throw new TypeError( 'invalid argument. Must provide a function. Value: `' + predicate + '`.' );
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

},{"@stdlib/assert/is-array":70}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":127}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* BLAS level 1 routine to copy values from `x` into `y`.
*
* @module @stdlib/blas/base/gcopy
*
* @example
* var gcopy = require( '@stdlib/blas/base/gcopy' );
*
* var x = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
* var y = [ 6.0, 7.0, 8.0, 9.0, 10.0 ];
*
* gcopy( x.length, x, 1, y, 1 );
* // y => [ 1.0, 2.0, 3.0, 4.0, 5.0 ]
*
* @example
* var gcopy = require( '@stdlib/blas/base/gcopy' );
*
* var x = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
* var y = [ 6.0, 7.0, 8.0, 9.0, 10.0 ];
*
* gcopy.ndarray( x.length, x, 1, 0, y, 1, 0 );
* // y => [ 1.0, 2.0, 3.0, 4.0, 5.0 ]
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var gcopy = require( './main.js' );
var ndarray = require( './ndarray.js' );


// MAIN //

setReadOnly( gcopy, 'ndarray', ndarray );


// EXPORTS //

module.exports = gcopy;

},{"./main.js":130,"./ndarray.js":131,"@stdlib/utils/define-nonenumerable-read-only-property":201}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var M = 8;


// MAIN //

/**
* Copies values from `x` into `y`.
*
* @param {PositiveInteger} N - number of values to copy
* @param {NumericArray} x - input array
* @param {integer} strideX - `x` stride length
* @param {NumericArray} y - destination array
* @param {integer} strideY - `y` stride length
* @returns {NumericArray} `y`
*
* @example
* var x = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
* var y = [ 6.0, 7.0, 8.0, 9.0, 10.0 ];
*
* gcopy( x.length, x, 1, y, 1 );
* // y => [ 1.0, 2.0, 3.0, 4.0, 5.0 ]
*/
function gcopy( N, x, strideX, y, strideY ) {
	var ix;
	var iy;
	var m;
	var i;
	if ( N <= 0 ) {
		return y;
	}
	// Use unrolled loops if both strides are equal to `1`...
	if ( strideX === 1 && strideY === 1 ) {
		m = N % M;

		// If we have a remainder, run a clean-up loop...
		if ( m > 0 ) {
			for ( i = 0; i < m; i++ ) {
				y[ i ] = x[ i ];
			}
		}
		if ( N < M ) {
			return y;
		}
		for ( i = m; i < N; i += M ) {
			y[ i ] = x[ i ];
			y[ i+1 ] = x[ i+1 ];
			y[ i+2 ] = x[ i+2 ];
			y[ i+3 ] = x[ i+3 ];
			y[ i+4 ] = x[ i+4 ];
			y[ i+5 ] = x[ i+5 ];
			y[ i+6 ] = x[ i+6 ];
			y[ i+7 ] = x[ i+7 ];
		}
		return y;
	}
	if ( strideX < 0 ) {
		ix = (1-N) * strideX;
	} else {
		ix = 0;
	}
	if ( strideY < 0 ) {
		iy = (1-N) * strideY;
	} else {
		iy = 0;
	}
	for ( i = 0; i < N; i++ ) {
		y[ iy ] = x[ ix ];
		ix += strideX;
		iy += strideY;
	}
	return y;
}


// EXPORTS //

module.exports = gcopy;

},{}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var M = 8;


// MAIN //

/**
* Copies values from `x` into `y`.
*
* @param {PositiveInteger} N - number of values to copy
* @param {NumericArray} x - input array
* @param {integer} strideX - `x` stride length
* @param {NonNegativeInteger} offsetX - starting `x` index
* @param {NumericArray} y - destination array
* @param {integer} strideY - `y` stride length
* @param {NonNegativeInteger} offsetY - starting `y` index
* @returns {NumericArray} `y`
*
* @example
* var x = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
* var y = [ 6.0, 7.0, 8.0, 9.0, 10.0 ];
*
* gcopy( x.length, x, 1, 0, y, 1, 0 );
* // y => [ 1.0, 2.0, 3.0, 4.0, 5.0 ]
*/
function gcopy( N, x, strideX, offsetX, y, strideY, offsetY ) {
	var ix;
	var iy;
	var m;
	var i;
	if ( N <= 0 ) {
		return y;
	}
	ix = offsetX;
	iy = offsetY;

	// Use unrolled loops if both strides are equal to `1`...
	if ( strideX === 1 && strideY === 1 ) {
		m = N % M;

		// If we have a remainder, run a clean-up loop...
		if ( m > 0 ) {
			for ( i = 0; i < m; i++ ) {
				y[ iy ] = x[ ix ];
				ix += strideX;
				iy += strideY;
			}
		}
		if ( N < M ) {
			return y;
		}
		for ( i = m; i < N; i += M ) {
			y[ iy ] = x[ ix ];
			y[ iy+1 ] = x[ ix+1 ];
			y[ iy+2 ] = x[ ix+2 ];
			y[ iy+3 ] = x[ ix+3 ];
			y[ iy+4 ] = x[ ix+4 ];
			y[ iy+5 ] = x[ ix+5 ];
			y[ iy+6 ] = x[ ix+6 ];
			y[ iy+7 ] = x[ ix+7 ];
			ix += M;
			iy += M;
		}
		return y;
	}
	for ( i = 0; i < N; i++ ) {
		y[ iy ] = x[ ix ];
		ix += strideX;
		iy += strideY;
	}
	return y;
}


// EXPORTS //

module.exports = gcopy;

},{}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum length of a typed array.
*
* @module @stdlib/constants/array/max-typed-array-length
*
* @example
* var MAX_TYPED_ARRAY_LENGTH = require( '@stdlib/constants/array/max-typed-array-length' );
* // returns 9007199254740991
*/

// MAIN //

/**
* Maximum length of a typed array.
*
* ```tex
* 2^{53} - 1
* ```
*
* @constant
* @type {number}
* @default 9007199254740991
*/
var MAX_TYPED_ARRAY_LENGTH = 9007199254740991;


// EXPORTS //

module.exports = MAX_TYPED_ARRAY_LENGTH;

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

},{}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/fourth-pi
* @type {number}
*
* @example
* var FOURTH_PI = require( '@stdlib/constants/float64/fourth-pi' );
* // returns 7.85398163397448309616e-1
*/


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.85398163397448309616e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FOURTH_PI = 7.85398163397448309616e-1;


// EXPORTS //

module.exports = FOURTH_PI;

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
* Maximum safe double-precision floating-point integer.
*
* @module @stdlib/constants/float64/max-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );
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

},{"@stdlib/number/ctor":174}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum signed 16-bit integer.
*
* @module @stdlib/constants/int16/max
* @type {integer32}
*
* @example
* var INT16_MAX = require( '@stdlib/constants/int16/max' );
* // returns 32767
*/


// MAIN //

/**
* Maximum signed 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{15} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 32767
*/
var INT16_MAX = 32767|0; // asm type annotation


// EXPORTS //

module.exports = INT16_MAX;

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
* Minimum signed 16-bit integer.
*
* @module @stdlib/constants/int16/min
* @type {integer32}
*
* @example
* var INT16_MIN = require( '@stdlib/constants/int16/min' );
* // returns -32768
*/


// MAIN //

/**
* Minimum signed 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -(2^{15})
* ```
*
* which corresponds to the two's complement bit sequence
*
* ```binarystring
* 1000000000000000
* ```
*
* @constant
* @type {integer32}
* @default -32768
*/
var INT16_MIN = -32768|0; // asm type annotation


// EXPORTS //

module.exports = INT16_MIN;

},{}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Maximum signed 32-bit integer.
*
* @module @stdlib/constants/int32/max
* @type {integer32}
*
* @example
* var INT32_MAX = require( '@stdlib/constants/int32/max' );
* // returns 2147483647
*/


// MAIN //

/**
* Maximum signed 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{31} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 01111111111111111111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 2147483647
*/
var INT32_MAX = 2147483647|0; // asm type annotation


// EXPORTS //

module.exports = INT32_MAX;

},{}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Minimum signed 32-bit integer.
*
* @module @stdlib/constants/int32/min
* @type {integer32}
*
* @example
* var INT32_MIN = require( '@stdlib/constants/int32/min' );
* // returns -2147483648
*/


// MAIN //

/**
* Minimum signed 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -(2^{31})
* ```
*
* which corresponds to the two's complement bit sequence
*
* ```binarystring
* 10000000000000000000000000000000
* ```
*
* @constant
* @type {integer32}
* @default -2147483648
*/
var INT32_MIN = -2147483648|0; // asm type annotation


// EXPORTS //

module.exports = INT32_MIN;

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
* Maximum signed 8-bit integer.
*
* @module @stdlib/constants/int8/max
* @type {integer32}
*
* @example
* var INT8_MAX = require( '@stdlib/constants/int8/max' );
* // returns 127
*/


// MAIN //

/**
* Maximum signed 8-bit integer.
*
* ## Notes
*
* The number is given by
*
* ```tex
* 2^{7} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 01111111
* ```
*
* @constant
* @type {integer32}
* @default 127
*/
var INT8_MAX = 127|0; // asm type annotation


// EXPORTS //

module.exports = INT8_MAX;

},{}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Minimum signed 8-bit integer.
*
* @module @stdlib/constants/int8/min
* @type {integer32}
*
* @example
* var INT8_MIN = require( '@stdlib/constants/int8/min' );
* // returns -128
*/


// MAIN //

/**
* Minimum signed 8-bit integer.
*
* ## Notes
*
* The number is given by
*
* ```tex
* -(2^{7})
* ```
*
* which corresponds to the two's complement bit sequence
*
* ```binarystring
* 10000000
* ```
*
* @constant
* @type {integer32}
* @default -128
*/
var INT8_MIN = -128|0; // asm type annotation


// EXPORTS //

module.exports = INT8_MIN;

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

},{"./is_integer.js":148}],148:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":166}],149:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isPositiveZero = require( './main.js' );


// EXPORTS //

module.exports = isPositiveZero;

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

},{"@stdlib/constants/float64/pinf":137}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":154}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* Copyright 1984, 1995, 2000 by Stephen L. Moshier
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
var asin = require( '@stdlib/math/base/special/asin' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PIO4 = require( '@stdlib/constants/float64/fourth-pi' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS.


// MAIN //

/**
* Computes the arccosine of a number.
*
* ## Method
*
* -   Analytically,
*
*     ```tex
*     \operatorname{acos}(x) = \frac{\pi}{2} - \operatorname{asin}(x)
*     ```
*
*     However, if \\(\|x\|\\) is near \\(1\\), there is cancellation error in subtracting \\(\opertorname{asin}(x)\\) from \\(\pi/2\\). Hence, if \\(x < -0.5\\),
*
*     ```tex
*     \operatorname{acos}(x) = \pi - 2.0 \cdot \operatorname{asin}(\sqrt{(1+x)/2})
*     ```
*
*     or, if \\(x > +0.5\\),
*
*     ```tex
*     \operatorname{acos}(x) = 2.0 \cdot \operatorname{asin}( \sqrt{(1-x)/2} )}
*     ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain | # trials | peak    | rms     |
*     |:-----------|:------:|:---------|:--------|:--------|
*     | DEC        | -1, 1  | 50000    | 3.3e-17 | 8.2e-18 |
*     | IEEE       | -1, 1  | 10^6     | 2.2e-16 | 6.5e-17 |
*
*
* @param {number} x - input value
* @returns {number} arccosine (in radians)
*
* @example
* var v = acos( 1.0 );
* // returns 0.0
*
* @example
* var v = acos( 0.707 ); // ~pi/4
* // returns ~0.7855
*
* @example
* var v = acos( NaN );
* // returns NaN
*/
function acos( x ) {
	var z;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x < -1.0 || x > 1.0 ) {
		return NaN;
	}
	if ( x > 0.5 ) {
		return 2.0 * asin( sqrt( 0.5 - (0.5*x) ) );
	}
	z = PIO4 - asin( x );
	z += MOREBITS;
	z += PIO4;
	return z;
}


// EXPORTS //

module.exports = acos;

},{"@stdlib/constants/float64/fourth-pi":134,"@stdlib/math/base/assert/is-nan":149,"@stdlib/math/base/special/asin":158,"@stdlib/math/base/special/sqrt":170}],156:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the arccosine of a number.
*
* @module @stdlib/math/base/special/acos
*
* @example
* var acos = require( '@stdlib/math/base/special/acos' );
*
* var v = acos( 1.0 );
* // returns 0.0
*
* v = acos( 0.707 ); // ~pi/4
* // returns ~0.7855
*
* v = acos( NaN );
* // returns NaN
*/

// MODULES //

var acos = require( './acos.js' );


// EXPORTS //

module.exports = acos;

},{"./acos.js":155}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* Copyright 1984, 1995, 2000 by Stephen L. Moshier
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
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PIO4 = require( '@stdlib/constants/float64/fourth-pi' );
var ratevalPQ = require( './rational_pq.js' );
var ratevalRS = require( './rational_rs.js' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS


// MAIN //

/**
* Computes the arcsine of a number.
*
* ## Method
*
* -   A rational function of the form
*
*     ```tex
*     x + x^3 \frac{P(x^2)}{Q(x^2)}
*     ```
*
*     is used for \\(\|x\|\\) in the interval \\(\[0, 0.5\]\\). If \\(\|x\| > 0.5\\), it is transformed by the identity
*
*     ```tex
*     \operatorname{asin}(x) = \frac{\pi}{2} - 2 \operatorname{asin}( \sqrt{ (1-x)/2 } )
*     ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain | # trials | peak    | rms     |
*     |:-----------|:-------|:---------|:--------|:--------|
*     | DEC        | -1, 1  | 40000    | 2.6e-17 | 7.1e-18 |
*     | IEEE       | -1, 1  | 10^6     | 1.9e-16 | 5.4e-17 |
*
* @param {number} x - input value
* @returns {number} arcsine (in radians)
*
* @example
* var v = asin( 0.0 );
* // returns ~0.0
*
* @example
* var v = asin( 3.141592653589793/4.0 );
* // returns ~0.903
*
* @example
* var v = asin( -3.141592653589793/6.0 );
* // returns ~-0.551
*
* @example
* var v = asin( NaN );
* // returns NaN
*/
function asin( x ) {
	var sgn;
	var zz;
	var a;
	var p;
	var z;

	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x > 0.0 ) {
		a = x;
	} else {
		sgn = true;
		a = -x;
	}
	if ( a > 1.0 ) {
		return NaN;
	}
	if ( a > 0.625 ) {
		// arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
		zz = 1.0 - a;
		p = zz * ratevalRS( zz );
		zz = sqrt( zz + zz );
		z = PIO4 - zz;
		zz = ( zz*p ) - MOREBITS;
		z -= zz;
		z += PIO4;
	} else {
		if ( a < 1.0e-8 ) {
			return x;
		}
		zz = a * a;
		z = zz * ratevalPQ( zz );
		z = ( a*z ) + a;
	}
	return ( sgn ) ? -z : z;
}


// EXPORTS //

module.exports = asin;

},{"./rational_pq.js":159,"./rational_rs.js":160,"@stdlib/constants/float64/fourth-pi":134,"@stdlib/math/base/assert/is-nan":149,"@stdlib/math/base/special/sqrt":170}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the arcsine of a number.
*
* @module @stdlib/math/base/special/asin
*
* @example
* var asin = require( '@stdlib/math/base/special/asin' );
*
* var v = asin( 0.0 );
* // returns 0.0
*
* v = asin( 3.141592653589793/4.0 );
* // returns ~0.903
*
* v = asin( -3.141592653589793/6.0 );
* // returns ~-0.551
*
* v = asin( NaN );
* // returns NaN
*/

// MODULES //

var asin = require( './asin.js' );


// EXPORTS //

module.exports = asin;

},{"./asin.js":157}],159:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
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
		return 0.16666666666666713;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -8.198089802484825 + (x * (19.562619833175948 + (x * (-16.262479672107002 + (x * (5.444622390564711 + (x * (-0.6019598008014124 + (x * 0.004253011369004428))))))))); // eslint-disable-line max-len
		s2 = -49.18853881490881 + (x * (139.51056146574857 + (x * (-147.1791292232726 + (x * (70.49610280856842 + (x * (-14.740913729888538 + (x * 1.0))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.004253011369004428 + (x * (-0.6019598008014124 + (x * (5.444622390564711 + (x * (-16.262479672107002 + (x * (19.562619833175948 + (x * -8.198089802484825))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-14.740913729888538 + (x * (70.49610280856842 + (x * (-147.1791292232726 + (x * (139.51056146574857 + (x * -49.18853881490881))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
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
		return 0.08333333333333809;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 28.536655482610616 + (x * (-25.56901049652825 + (x * (6.968710824104713 + (x * (-0.5634242780008963 + (x * 0.002967721961301243))))))); // eslint-disable-line max-len
		s2 = 342.43986579130785 + (x * (-383.8770957603691 + (x * (147.0656354026815 + (x * (-21.947795316429207 + (x * 1.0))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.002967721961301243 + (x * (-0.5634242780008963 + (x * (6.968710824104713 + (x * (-25.56901049652825 + (x * 28.536655482610616))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-21.947795316429207 + (x * (147.0656354026815 + (x * (-383.8770957603691 + (x * 342.43986579130785))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

// MODULES //

var acos = require( '@stdlib/math/base/special/acos' );


// MAIN //

/**
* Computes the inverse versed cosine.
*
* @param {number} x - input value
* @returns {number} inverse versed cosine
*
* @example
* var v = avercos( 0.0 );
* // returns 0.0
*
* @example
* var v = avercos( -3.141592653589793/2.0 );
* // returns ~2.1783
*
* @example
* var v = avercos( -3.141592653589793/6.0 );
* // returns ~1.0742
*
* @example
* var v = avercos( NaN );
* // returns NaN
*/
function avercos( x ) {
	return acos( 1.0 + x );
}


// EXPORTS //

module.exports = avercos;

},{"@stdlib/math/base/special/acos":156}],162:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the inverse versed cosine.
*
* @module @stdlib/math/base/special/avercos
*
* @example
* var avercos = require( '@stdlib/math/base/special/avercos' );
*
* var v = avercos( 0.0 );
* // returns 0.0
*
* v = avercos( -3.141592653589793/2.0 );
* // returns ~2.1783
*
* v = avercos( -3.141592653589793/6.0 );
* // returns ~1.0742
*
* v = avercos( NaN );
* // returns NaN
*/

// MODULES //

var avercos = require( './avercos.js' );


// EXPORTS //

module.exports = avercos;

},{"./avercos.js":161}],163:[function(require,module,exports){
module.exports={"expected":[3.141592653589793,3.0968899159295726,3.07836816959741,3.0641523385199543,3.052164825964355,3.0416009650486684,3.032048109209716,3.0232611482004135,3.015080392498856,3.007394930597909,3.000124015175136,2.993206693537321,2.9865956153839868,2.980253128580564,2.9741487074049333,2.968257196325838,2.9625575738852543,2.957032059973097,2.951665456637678,2.9464446518410985,2.94135823947975,2.9363962240160117,2.9315497877742365,2.9268111053803394,2.922173194172544,2.917629792411285,2.9131752592236726,2.9088044917220874,2.904512855825948,2.9002961281154374,2.896150446640372,2.892072269054204,2.888058336782583,2.8841056441963078,2.880211411960091,2.8763730638859677,2.872588206744052,2.8688546125815653,2.8651702031795017,2.86153303633932,2.8579412937430306,2.854393270171535,2.850887363899983,2.8474220681168387,2.843995963236361,2.8406077099934115,2.8372560432254246,2.8339397662597725,2.830657745836022,2.827408907502071,2.8241922314312133,2.821006748614036,2.8178515373849,2.8147257202477616,2.8116284609704114,2.8085589619198905,2.8055164616150683,2.8025002324751407,2.799509578745209,2.796543834582219,2.793602362286361,2.790684550664646,2.7877898135147903,2.7849175882187605,2.7820673344364515,2.7792385328909157,2.7764306842374182,2.7736433080093637,2.770875941634803,2.7681281395178248,2.7653994721796757,2.762689525454941,2.75999789973852,2.7573242092795374,2.7546680815186555,2.7520291564655843,2.7494070861138336,2.746801533890032,2.7442121741353454,2.74163869161674,2.739080781066011,2.7365381467446843,2.73401050203303,2.731497569041573,2.728999078243628,2.726514768127465,2.724044384866856,2.721587682008818,2.7191444201774777,2.716714366793043,2.714297295804958,2.7118929874383686,2.709501227953108,2.7071218094144385,2.7047545294748736,2.7023991911664207,2.7000556027026454,2.6977235772900015,2.695402932947894,2.693093492336993,2.6907950825953364,2.688507535181793,2.686230685726497,2.683964373887858,2.6817084432158182,2.6794627410210134,2.6772271182495295,2.675001429362975,2.672785532223582,2.6705792879840935,2.6683825609821867,2.6661952186392117,2.664017131363026,2.6618481724547336,2.6596882180191255,2.6575371468786586,2.65539484049079,2.653261182868519,2.6511360605039767,2.6490193622949305,2.646910979474061,2.6448108055408923,2.6427187361962443,2.6406346692791067,2.638558504705816,2.63649014441144,2.6344294922932665,2.632376454156313,2.6303309376607613,2.62829285227124,2.6262621092078744,2.6242386213990305,2.6222223034356777,2.6202130715273073,2.6182108434593436,2.616215538551981,2.6142270776203924,2.6122453829362544,2.610270378190535,2.608301988457493,2.6063401401598427,2.6043847610350364,2.602435780102625,2.6004931276326473,2.5985567351150207,2.5966265352298783,2.594702461818836,2.592784449857136,2.5908724354266495,2.5889663556896934,2.5870661488636437,2.5851717541963053,2.5832831119420163,2.5814001633384613,2.579522850584166,2.577651116816646,2.575784906091193,2.573924163360272,2.572068834453508,2.5702188660582426,2.568374205700642,2.5665348017273324,2.564700603287554,2.5628715603158065,2.561047623514975,2.559228744339917,2.5574148749815007,2.555605968351072,2.5538019780653425,2.552002858431679,2.55020856443379,2.548419051717785,2.546634276578605,2.5448541959468054,2.543078767375684,2.5413079490287407,2.5395416996674607,2.53777997863941,2.5360227458666333,2.534269961834342,2.532521587579895,2.5307775846820437,2.5290379152504543,2.527302541915483,2.5255714278182047,2.523844536600686,2.5221218323964956,2.520403279821439,2.518688843964524,2.516978490379137,2.5152721850744304,2.5135698945069165,2.511871585572255,2.510177225597237,2.5084867823319543,2.5068002239421503,2.5051175190017476,2.503438636485547,2.501763545762094,2.500092216586706,2.498424619094659,2.4967607237945266,2.4951005015616685,2.493443923631862,2.4917909615950804,2.490141587389401,2.4884957732950523,2.4868534919285907,2.4852147162372007,2.483579419493122,2.4819475752881957,2.480319157528525,2.4786941404292517,2.4770724985094468,2.4754542065871026,2.4738392397742333,2.4722275734720807,2.4706191833664155,2.4690140454229392,2.4674121358827774,2.4658134312580717,2.4642179083276554,2.4626255441328193,2.4610363159731676,2.4594502014025514,2.4578671782250856,2.45628722449125,2.4547103184940613,2.453136438765324,2.451565564071957,2.4499976734123923,2.4484327460130393,2.4468707613248233,2.44531169901979,2.4437555389877734,2.442202261333131,2.440651846371539,2.4391042746268505,2.4375595268280104,2.436017583906034,2.434478426991036,2.4329420374093207,2.4314083966805238,2.4298774865148074,2.428349288810108,2.4268237856494346,2.4253009592982178,2.4237807922017036,2.4222632669824007,2.420748366437568,2.4192360735367524,2.4177263714193673,2.4162192433923178,2.4147146729276656,2.413212643660337,2.4117131393858706,2.4102161440582055,2.408721641787509,2.4072296168380394,2.405740053626052,2.4042529367177328,2.402768250827177,2.401285980814397,2.3998061116833647,2.398328628580091,2.3968535167907326,2.3953807617397374,2.3939103489880145,2.392442264231142,2.390976493297598,2.389513022147027,2.3880518368685304,2.386592923678992,2.385136268921422,2.3836818590633366,2.3822296806951604,2.3807797205286545,2.379331965395373,2.377886402245141,2.376443018144561,2.37500180027554,2.373562735933844,2.372125812527669,2.3706910175762457,2.3692583387084545,2.367827763661472,2.366399280279432,2.3649728765121116,2.363548540413637,2.36212626014121,2.3607060239538518,2.35928782021117,2.357871637372141,2.3564574639939164,2.3550452887306395,2.3536351003322893,2.352226887643536,2.350820639602614,2.349416345240217,2.3480139936784035,2.346613574129522,2.3452150758951547,2.34381848836507,2.342423801016199,2.3410310034116195,2.339640085199563,2.3382510361124282,2.336863845965814,2.3354785046575666,2.3340950021668387,2.3327133285531634,2.3313334739555405,2.329955428591539,2.328579182756408,2.327204726822205,2.3258320512369326,2.3244611465236913,2.323092003279841,2.321724612176177,2.320358963956117,2.3189950494348976,2.317632859498786,2.316272385104298,2.3149136172774316,2.313556547112907,2.3122011657734234,2.310847464488915,2.3094954345558323,2.3081450673364188,2.3067963542580077,2.3054492868123235,2.3041038565547947,2.302760055103874,2.3014178741403715,2.3000773054067922,2.298738340706686,2.2974009719040067,2.2960651909224734,2.2947309897449513,2.293398360412829,2.292067295025414,2.2907377857393296,2.289409824767922,2.288083404380676,2.286758516902637,2.2854351547138423,2.284113310248758,2.282792975995723,2.2814741444964026,2.2801568083452475,2.2788409601889583,2.2775265927259625,2.276213698705889,2.2749022709290596,2.2735923022459783,2.2722837855568327,2.270976713811,2.2696710800065585,2.2683668771898047,2.2670640984547807,2.2657627369428006,2.2644627858419897,2.2631642383868256,2.2618670878576843,2.2605713275803963,2.259276950925802,2.257983951309319,2.25669232219051,2.2554020570726574,2.254113149502344,2.2528255930690397,2.2515393814046876,2.250254508183303,2.248970967120572,2.2476887519734574,2.2464078565398062,2.2451282746579664,2.243850000206404,2.2425730271033277,2.2412973493063175,2.240022960811955,2.2387498556554624,2.2374780279103423,2.236207471688023,2.2349381811375086,2.2336701504450325,2.232403373833714,2.2311378455632216,2.2298735599294366,2.2286105112641255,2.227348693934609,2.2260881023434433,2.2248287309280976,2.223570574160641,2.222313626547428,2.2210578826287932,2.2198033369787424,2.2185499842046563,2.2172978189469874,2.2160468358789673,2.214797029706318,2.21354839516696,2.2123009270307277,2.211054620099091,2.2098094692048753,2.208565469211983,2.207322615015127,2.206080901539556,2.2048403237407905,2.2036008766043613,2.202362555145545,2.2011253544091094,2.199889269469057,2.1986542954283745,2.197420427418782,2.196187660600487,2.1949559901619407,2.193725411319597,2.192495919317673,2.1912675094279135,2.1900401769493563,2.188813917208104,2.1875887255570907,2.186364597375861,2.185141528070343,2.183919513072627,2.182698547840748,2.181478627858469,2.180259748635063,2.1790419057051063,2.177825094628264,2.176609310989084,2.175394550396792,2.1741808084850867,2.1729680809119403,2.171756363359396,2.170545651533374,2.1693359411634745,2.1681272280027866,2.1669195078276924,2.165712776437684,2.1645070296551716,2.1633022633253,2.1620984733157647,2.1608956555166303,2.15969380584015,2.1584929202205885,2.1572929946140467,2.1560940249982834,2.154896007372548,2.1536989377574054,2.1525028121945677,2.151307626746728,2.1501133774973935,2.148920060550721,2.1477276720313534,2.146536208084262,2.1453456648745832,2.1441560385874627,2.1429673254278994,2.1417795216205886,2.1405926234097707,2.1394066270590786,2.138221528851388,2.137037325088667,2.13585401209183,2.134671586200592,2.133490043773323,2.1323093811869036,2.1311295948365867,2.1299506811358544,2.1287726365162793,2.127595457427386,2.126419140336517,2.1252436817286946,2.124069078106488,2.122895325989882,2.121722421916144,2.1205503624396926,2.1193791441319734,2.1182087635813254,2.117039217392858,2.115870502188325,2.1147026146059993,2.1135355513005516,2.112369308942927,2.111203884220224,2.110039273835576,2.108875474508033,2.107712482972442,2.1065502959793316,2.1053889102947982,2.104228322700389,2.103068529992992,2.1019095289847187,2.100751316502799,2.0995938893894657,2.0984372445018495,2.0972813787118665,2.0961262889061154,2.0949719719857676,2.093818424866464,2.092665644478209,2.0915136277652677,2.090362371686065,2.08921187321308,2.0880621293327506,2.086913137045367,2.0857648933649795,2.0846173953192957,2.0834706399495846,2.0823246243105813,2.081179345470389,2.0800348005103877,2.0788909865251366,2.077747900622284,2.0766055399224728,2.0754639015592504,2.0743229826789777,2.0731827804407397,2.0720432920162537,2.070904514589785,2.0697664453580567,2.0686290815301627,2.067492420327483,2.066356458983597,2.0652211947442005,2.064086624867018,2.062952746621726,2.0618195572898625,2.060687054164752,2.05955523455142,2.0584240957665156,2.0572936351382283,2.056163850006212,2.0550347377215044,2.0539062956464504,2.0527785211546257,2.0516514116307567,2.0505249644706494,2.0493991770811095,2.048274046879872,2.047149571295524,2.046025747767432,2.044902573745671,2.0437800466909493,2.0426581640745383,2.0415369233782026,2.040416322094127,2.0392963577248486,2.0381770277831865,2.037058329792173,2.035940261284986,2.0348228198048814,2.033706002905124,2.032589808148924,2.0314742331093676,2.0303592753693547,2.0292449325215314,2.0281312021682263,2.027018081921387,2.0259055694025165,2.024793662242609,2.0236823580820893,2.0225716545707484,2.021461549367685,2.0203520401412423,2.019243124568947,2.0181348003374517,2.017027065142473,2.015919916688733,2.0148133526899015,2.0137073708685356,2.012601968956025,2.0114971446925316,2.0103928958269353,2.0092892201167745,2.008186115328193,2.0070835792358834,2.00598160962303,2.0048802042812577,2.0037793610105745,2.0026790776193186,2.0015793519241063,2.0004801817497757,1.9993815649293372,1.9982834993039196,1.9971859827227183,1.996089013042944,1.994992588129771,1.9938967058562878,1.9928013641034446,1.9917065607600049,1.9906122937224962,1.9895185608951584,1.9884253601898978,1.9873326895262364,1.9862405468312643,1.985148930039593,1.9840578370933055,1.9829672659419117,1.9818772145423003,1.980787680858692,1.9796986628625945,1.9786101585327556,1.9775221658551185,1.9764346828227768,1.9753477074359285,1.9742612377018331,1.9731752716347666,1.9720898072559776,1.971004842593644,1.9699203756828292,1.9688364045654407,1.9677529272901864,1.9666699419125315,1.965587446494658,1.964505439105423,1.963423917820316,1.962342880721418,1.961262325897363,1.9601822514432934,1.959102655460824,1.9580235360579985,1.9569448913492522,1.9558667194553716,1.9547890185034547,1.9537117866268736,1.9526350219652349,1.951558722664341,1.9504828868761532,1.949407512758753,1.9483325984763047,1.9472581421990183,1.9461841421031125,1.9451105963707778,1.9440375031901396,1.9429648607552226,1.941892667265914,1.9408209209279288,1.9397496199527728,1.9386787625577084,1.9376083469657195,1.9365383714054754,1.935468834111298,1.9343997333231258,1.933331067286481,1.932262834252435,1.9311950324775744,1.930127660223968,1.9290607157591337,1.9279941973560046,1.9269281032928973,1.9258624318534783,1.9247971813267326,1.9237323500069305,1.9226679361935965,1.9216039381914767,1.920540354310508,1.9194771828657866,1.9184144221775363,1.9173520705710785,1.9162901263768006,1.9152285879301258,1.9141674535714825,1.9131067216462754,1.912046390504853,1.9109864585024803,1.9099269239993084,1.9088677853603442,1.9078090409554227,1.9067506891591768,1.905692728351009,1.9046351569150628,1.9035779732401936,1.9025211757199414,1.9014647627525016,1.9004087327406982,1.8993530840919548,1.898297815218268,1.897242924536179,1.896188410466748,1.8951342714355246,1.8940805058725234,1.8930271122121958,1.8919740888934033,1.8909214343593923,1.8898691470577662,1.8888172254404605,1.8877656679637165,1.8867144730880554,1.8856636392782522,1.8846131650033118,1.8835630487364416,1.8825132889550276,1.8814638841406093,1.8804148327788541,1.8793661333595335,1.878317784376498,1.8772697843276525,1.8762221317149321,1.8751748250442788,1.874127862825616,1.873081243572826,1.8720349658037245,1.8709890280400396,1.8699434288073866,1.868898166635244,1.8678532400569325,1.8668086476095902,1.86576438783415,1.864720459275318,1.863676860481549,1.8626335900050255,1.8615906464016339,1.8605480282309441,1.8595057340561856,1.8584637624442264,1.857422111965551,1.8563807811942383,1.8553397687079405,1.8542990730878608,1.853258692918733,1.8522186267887994,1.8511788732897902,1.8501394310169017,1.8491002985687766,1.8480614745474815,1.8470229575584882,1.8459847462106513,1.844946839116189,1.8439092348906618,1.8428719321529532,1.8418349295252485,1.8407982256330162,1.8397618191049863,1.838725708573132,1.8376898926726488,1.8366543700419369,1.8356191393225785,1.8345841991593217,1.8335495482000588,1.832515185095809,1.8314811085006972,1.8304473170719375,1.829413809469812,1.8283805843576535,1.8273476404018267,1.8263149762717086,1.825282590639671,1.824250482181062,1.8232186495741871,1.8221870915002922,1.8211558066435436,1.820124793691012,1.8190940513326535,1.8180635782612913,1.8170333731725992,1.8160034347650835,1.8149737617400648,1.813944352801661,1.8129152066567706,1.811886322015054,1.8108576975889172,1.809829332093495,1.808801224246633,1.8077733727688705,1.8067457763834258,1.8057184338161762,1.8046913437956442,1.803664505052979,1.8026379163219404,1.801611576338883,1.8005854838427389,1.799559637575002,1.798534036279712,1.797508678703437,1.7964835635952587,1.7954586897067564,1.79443405579199,1.793409660607485,1.7923855029122167,1.7913615814675943,1.7903378950374456,1.7893144423880003,1.7882912222878766,1.7872682335080636,1.7862454748219079,1.7852229450050965,1.7842006428356434,1.7831785670938727,1.7821567165624053,1.7811350900261425,1.7801136862722517,1.7790925040901517,1.778071542271498,1.7770507996101672,1.7760302749022432,1.7750099669460024,1.773989874541899,1.7729699964925507,1.7719503316027245,1.7709308786793223,1.7699116365313656,1.7688926039699833,1.7678737798083957,1.7668551628619014,1.7658367519478628,1.7648185458856929,1.7638005434968402,1.762782743604776,1.7617651450349798,1.7607477466149262,1.7597305471740703,1.7587135455438356,1.757696740557599,1.7566801310506779,1.7556637158603163,1.7546474938256729,1.7536314637878054,1.7526156245896591,1.7515999750760534,1.7505845140936676,1.7495692404910286,1.7485541531184978,1.7475392508282581,1.7465245324743006,1.745509996912412,1.744495643000161,1.7434814695968872,1.7424674755636864,1.741453659763399,1.7404400210605966,1.7394265583215707,1.7384132704143183,1.737400156208531,1.7363872145755814,1.7353744443885115,1.7343618445220197,1.7333494138524488,1.7323371512577732,1.7313250556175879,1.7303131258130944,1.7293013607270904,1.7282897592439568,1.7272783202496453,1.7262670426316673,1.7252559252790807,1.7242449670824795,1.7232341669339803,1.7222235237272119,1.7212130363573024,1.7202027037208678,1.7191925247160003,1.7181824982422567,1.7171726232006466,1.7161628984936208,1.7151533230250597,1.714143895700262,1.7131346154259326,1.712125481110172,1.7111164916624644,1.710107645993666,1.709098943015994,1.7080903816430157,1.7070819607896364,1.706073679372089,1.7050655363079221,1.7040575305159888,1.7030496609164365,1.7020419264306947,1.7010343259814646,1.7000268584927078,1.6990195228896356,1.6980123180986975,1.6970052430475704,1.6959982966651488,1.694991477881532,1.6939847856280148,1.6929782188370763,1.6919717764423687,1.6909654573787072,1.6899592605820586,1.6889531849895312,1.687947229539364,1.6869413931709163,1.685935674824656,1.6849300734421506,1.6839245879660563,1.6829192173401057,1.6819139605091007,1.6809088164188986,1.6799037840164037,1.678898862249557,1.6778940500673245,1.6768893464196881,1.6758847502576346,1.6748802605331456,1.6738758761991877,1.672871596209701,1.6718674195195908,1.6708633450847161,1.6698593718618788,1.6688554988088158,1.6678517248841866,1.6668480490475648,1.665844470259427,1.6648409874811436,1.663837599674968,1.6628343058040271,1.6618311048323118,1.6608279957246652,1.6598249774467755,1.6588220489651633,1.6578192092471737,1.6568164572609656,1.6558137919755016,1.654811212360539,1.6538087173866194,1.6528063060250593,1.6518039772479396,1.650801730028097,1.6497995633391136,1.6487974761553066,1.6477954674517201,1.6467935362041146,1.6457916813889566,1.6447899019834107,1.6437881969653287,1.6427865653132403,1.6417850060063435,1.6407835180244956,1.6397821003482027,1.638780751958611,1.6377794718374972,1.636778258967258,1.6357771123309022,1.6347760309120403,1.6337750136948748,1.6327740596641918,1.6317731678053504,1.6307723371042742,1.6297715665474417,1.6287708551218767,1.627770201815139,1.626769605615315,1.6257690655110086,1.6247685804913323,1.6237681495458967,1.622767771664802,1.6217674458386284,1.6207671710584282,1.6197669463157138,1.618766770602451,1.6177666429110489,1.61676656223435,1.6157665275656214,1.6147665378985472,1.6137665922272162,1.6127666895461157,1.61176682885012,1.6107670091344828,1.609767229394828,1.6087674886271393,1.607767785827752,1.6067681199933443,1.605768490120927,1.6047688952078356,1.60376933425172,1.6027698062505369,1.6017703102025387,1.6007708451062665,1.59977140996054,1.5987720037644482,1.597772625517341,1.5967732742188199,1.5957739488687286,1.5947746484671448,1.59377537201437,1.5927761185109217,1.5917768869575237,1.590777676355097,1.5897784857047512,1.5887793140077753,1.5877801602656283,1.5867810234799316,1.5857819026524578,1.5847827967851238,1.5837837048799805,1.5827846259392047,1.581785558965089,1.5807865029600348,1.5797874569265402,1.5787884198671944,1.577789390784667,1.5767903686816986,1.575791352561093,1.5747923414257077,1.5737933342784447,1.5727943301222422,1.5717953279600654,1.5707963267948966,1.569797325629728,1.5687983234675509,1.5677993193113486,1.5668003121640857,1.5658013010287002,1.5648022849080947,1.5638032628051262,1.5628042337225987,1.5618051966632531,1.5608061506297586,1.559807094624704,1.5588080276505885,1.5578089487098128,1.5568098568046695,1.5558107509373356,1.5548116301098618,1.5538124933241648,1.552813339582018,1.5518141678850421,1.5508149772346962,1.5498157666322696,1.5488165350788714,1.5478172815754232,1.5468180051226486,1.5458187047210645,1.5448193793709732,1.543820028072452,1.542820649825345,1.5418212436292533,1.5408218084835268,1.5398223433872547,1.5388228473392564,1.537823319338073,1.5368237583819575,1.535824163468866,1.534824533596449,1.5338248677620412,1.532825164962654,1.5318254241949654,1.5308256444553103,1.5298258247396734,1.5288259640436777,1.527826061362577,1.526826115691246,1.5258261260241717,1.5248260913554434,1.5238260106787445,1.5228258829873422,1.5218257072740795,1.5208254825313652,1.5198252077511647,1.5188248819249914,1.5178245040438967,1.516824073098461,1.5158235880787845,1.5148230479744784,1.5138224517746544,1.5128217984679164,1.5118210870423514,1.510820316485519,1.509819485784443,1.5088185939256016,1.5078176398949183,1.506816622677753,1.505815541258891,1.5048143946225352,1.5038131817522962,1.502811901631182,1.5018105532415906,1.5008091355652977,1.4998076475834496,1.498806088276553,1.4978044566244646,1.4968027516063824,1.4958009722008365,1.4947991173856787,1.493797186138073,1.4927951774344865,1.4917930902506797,1.490790923561696,1.4897886763418535,1.488786347564734,1.4877839362031737,1.4867814412292542,1.4857788616142917,1.4847761963288277,1.4837734443426196,1.4827706046246298,1.4817676761430179,1.480764657865128,1.4797615487574816,1.478758347785766,1.4777550539148252,1.4767516661086497,1.475748183330366,1.4747446045422283,1.4737409287056065,1.4727371547809773,1.4717332817279143,1.4707293085050772,1.4697252340702023,1.4687210573800922,1.4677167773906057,1.4667123930566477,1.4657079033321587,1.464703307170105,1.4636986035224686,1.4626937913402362,1.4616888695733894,1.4606838371708948,1.4596786930806926,1.4586734362496874,1.457668065623737,1.4566625801476425,1.4556569787651372,1.454651260418877,1.453645424050429,1.452639468600262,1.4516333930077348,1.450627196211086,1.4496208771474244,1.448614434752717,1.4476078679617783,1.4466011757082613,1.4455943569246446,1.4445874105422227,1.4435803354910959,1.4425731307001577,1.4415657950970853,1.4405583276083287,1.4395507271590984,1.4385429926733568,1.4375351230738045,1.4365271172818712,1.4355189742177041,1.4345106928001568,1.4335022719467776,1.4324937105737994,1.4314850075961274,1.430476161927329,1.429467172479621,1.4284580381638605,1.4274487578895312,1.4264393305647336,1.4254297550961725,1.4244200303891466,1.4234101553475365,1.422400128873793,1.4213899498689255,1.4203796172324907,1.4193691298625812,1.4183584866558128,1.4173476865073138,1.4163367283107124,1.415325610958126,1.4143143333401478,1.4133028943458363,1.4122912928627027,1.411279527776699,1.4102675979722055,1.40925550233202,1.4082432397373446,1.4072308090677734,1.4062182092012816,1.4052054390142117,1.4041924973812623,1.403179383175475,1.4021660952682227,1.4011526325291968,1.4001389938263944,1.399125178026107,1.398111183992906,1.3970970105896323,1.3960826566773814,1.3950681211154927,1.3940534027615352,1.3930385004712955,1.3920234130987648,1.3910081394961258,1.3899926785137398,1.388977029000134,1.387961189801988,1.3869451597641205,1.3859289377294768,1.3849125225391155,1.3838959130321942,1.3828791080459575,1.3818621064157228,1.3808449069748672,1.3798275085548135,1.3788099099850173,1.377792110092953,1.3767741077041005,1.3757559016419305,1.374737490727892,1.3737188737813977,1.37270004961981,1.3716810170584277,1.370661774910471,1.3696423219870686,1.3686226570972426,1.3676027790478944,1.366582686643791,1.36556237868755,1.364541853979626,1.363521111318295,1.3625001494996414,1.3614789673175416,1.3604575635636509,1.359435937027388,1.3584140864959204,1.35739201075415,1.3563697085846966,1.3553471787678855,1.3543244200817295,1.3533014313019167,1.352278211201793,1.3512547585523478,1.3502310721221988,1.3492071506775765,1.3481829929823084,1.3471585977978033,1.3461339638830367,1.3451090899945344,1.3440839748863562,1.3430586173100814,1.342033016014791,1.3410071697470543,1.3399810772509102,1.3389547372678527,1.3379281485368142,1.336901309794149,1.3358742197736169,1.3348468772063675,1.3338192808209226,1.3327914293431604,1.331763321496298,1.3307349560008759,1.3297063315747393,1.3286774469330227,1.3276483007881321,1.3266188918497286,1.3255892188247098,1.324559280417194,1.323529075328502,1.3224986022571399,1.321467859898781,1.3204368469462495,1.319405562089501,1.318374004015606,1.3173421714087312,1.3163100629501223,1.3152776773180848,1.3142450131879666,1.3132120692321396,1.3121788441199813,1.3111453365178558,1.3101115450890959,1.3090774684939843,1.3080431053897343,1.3070084544304716,1.3059735142672146,1.3049382835478565,1.3039027609171443,1.3028669450166614,1.301830834484807,1.3007944279567771,1.2997577240645448,1.2987207214368401,1.2976834186991315,1.2966458144736044,1.295607907379142,1.2945696960313051,1.2935311790423116,1.2924923550210168,1.2914532225728914,1.290413780300003,1.2893740268009939,1.2883339606710602,1.2872935805019323,1.2862528848818529,1.2852118723955548,1.2841705416242422,1.2831288911455667,1.2820869195336075,1.2810446253588492,1.2800020071881593,1.2789590635847679,1.277915793108244,1.2768721943144752,1.2758282657556432,1.2747840059802031,1.2737394135328608,1.2726944869545491,1.2716492247824067,1.2706036255497535,1.2695576877860688,1.2685114100169674,1.2674647907641772,1.2664178285455143,1.265370521874861,1.2643228692621409,1.2632748692132953,1.2622265202302598,1.2611778208109392,1.260128769449184,1.2590793646347658,1.2580296048533517,1.2569794885864813,1.255929014311541,1.254878180501738,1.2538269856260769,1.2527754281493326,1.2517235065320271,1.250671219230401,1.2496185646963898,1.2485655413775976,1.24751214771727,1.2464583821542687,1.2454042431230454,1.244349729053614,1.2432948383715252,1.2422395694978383,1.2411839208490951,1.2401278908372915,1.2390714778698517,1.2380146803495995,1.2369574966747305,1.2358999252387841,1.2348419644306163,1.2337836126343704,1.232724868229449,1.231665729590485,1.2306061950873128,1.2295462630849403,1.228485931943518,1.2274252000183106,1.2263640656596675,1.2253025272129925,1.2242405830187146,1.2231782314122568,1.2221154707240067,1.2210522992792852,1.2199887153983167,1.2189247173961968,1.2178603035828626,1.2167954722630605,1.2157302217363148,1.214664550296896,1.2135984562337887,1.2125319378306596,1.211464993365825,1.210397621112219,1.2093298193373583,1.2082615863033122,1.2071929202666674,1.2061238194784953,1.2050542821843178,1.2039843066240739,1.2029138910320847,1.2018430336370205,1.2007717326618643,1.199699986323879,1.1986277928345705,1.1975551503996535,1.1964820572190153,1.1954085114866806,1.1943345113907748,1.1932600551134886,1.1921851408310404,1.19110976671364,1.1900339309254522,1.1889576316245585,1.1878808669629195,1.1868036350863385,1.1857259341344217,1.184647762240541,1.1835691175317948,1.1824899981289692,1.1814104021464997,1.1803303276924304,1.179249772868375,1.1781687357694774,1.1770872144843703,1.176005207095135,1.1749227116772618,1.1738397262996068,1.1727562490243524,1.1716722779069642,1.1705878109961494,1.1695028463338155,1.1684173819550265,1.16733141588796,1.1662449461538649,1.1651579707670165,1.1640704877346746,1.1629824950570375,1.1618939907271988,1.1608049727311012,1.1597154390474929,1.1586253876478814,1.1575348164964878,1.1564437235502003,1.1553521067585288,1.154259964063557,1.1531672933998953,1.152074092694635,1.1509803598672972,1.1498860928297883,1.1487912894863488,1.1476959477335056,1.1466000654600221,1.1455036405468493,1.1444066708670748,1.1433091542858738,1.1422110886604562,1.1411124718400179,1.140013301665687,1.1389135759704745,1.1378132925792188,1.1367124493085354,1.135611043966763,1.13450907435391,1.1334065382616,1.1323034334730187,1.131199757762858,1.1300955088972615,1.1289906846337683,1.1278852827212578,1.126779300899892,1.1256727369010602,1.1245655884473202,1.1234578532523414,1.122349529020846,1.121240613448551,1.120131104222108,1.1190209990190447,1.117910295507704,1.116798991347184,1.1156870841872768,1.1145745716684061,1.113461451421567,1.112347721068262,1.1112333782204384,1.1101184204804255,1.1090028454408694,1.107886650684669,1.1067698337849117,1.105652392304807,1.1045343237976204,1.103415625806607,1.1022962958649447,1.1011763314956662,1.1000557302115905,1.0989344895152549,1.0978126068988439,1.0966900798441221,1.095566905822361,1.0944430822942692,1.093318606709921,1.0921934765086836,1.0910676891191438,1.0899412419590364,1.0888141324351674,1.0876863579433427,1.086557915868289,1.0854288035835815,1.084299018451565,1.0831685578232777,1.082037419038373,1.0809055994250412,1.0797730962999306,1.0786399069680674,1.077506028722775,1.0763714588455928,1.075236194606196,1.07410023326231,1.0729635720596304,1.0718262082317365,1.070688139000008,1.0695493615735394,1.068409873149054,1.0672696709108154,1.0661287520305427,1.0649871136673206,1.0638447529675092,1.0627016670646565,1.0615578530794056,1.0604133081194043,1.0592680292792123,1.0581220136402085,1.0569752582704974,1.0558277602248136,1.054679516544426,1.0535305242570427,1.052380780376713,1.0512302819037282,1.0500790258245254,1.0489270091115845,1.0477742287233294,1.0466206816040255,1.0454663646836777,1.0443112748779266,1.043155409087944,1.0419987642003274,1.0408413370869944,1.0396831246050746,1.0385241235968015,1.0373643308894038,1.036203743294995,1.0350423576104617,1.0338801706173515,1.0327171790817602,1.031553379754217,1.0303887693695692,1.0292233446468664,1.0280571022892413,1.0268900389837936,1.0257221514014683,1.0245534361969353,1.0233838900084677,1.0222135094578197,1.0210422911501005,1.0198702316736497,1.0186973275999112,1.0175235754833052,1.0163489718610987,1.015173513253276,1.013997196162407,1.012820017073514,1.0116419724539385,1.0104630587532064,1.0092832724028897,1.0081026098164705,1.006921067389201,1.005738641497963,1.0045553285011262,1.0033711247384052,1.0021860265307143,1.0010000301800224,0.9998131319692045,0.9986253281618938,0.9974366150023303,0.9962469887152099,0.9950564455055313,0.9938649815584398,0.9926725930390725,0.9914792760923997,0.9902850268430652,0.9890898413952256,0.987893715832388,0.9866966462172452,0.9854986285915097,0.9842996589757467,0.9830997333692045,0.9818988477496433,0.9806969980731629,0.9794941802740283,0.978290390264493,0.9770856239346215,0.9758798771521092,0.974673145762101,0.9734654255870069,0.9722567124263184,0.9710470020564193,0.9698362902303973,0.968624572677853,0.9674118451047063,0.9661981031930015,0.9649833426007094,0.9637675589615295,0.9625507478846871,0.96133290495473,0.9601140257313243,0.9588941057490449,0.9576731405171662,0.9564511255194506,0.9552280562139324,0.9540039280327028,0.9527787363816896,0.9515524766404369,0.9503251441618799,0.94909673427212,0.9478672422701961,0.9466366634278526,0.9454049929893065,0.9441722261710115,0.9429383581614188,0.9417033841207363,0.940467299180684,0.9392300984442482,0.937991776985432,0.9367523298490025,0.9355117520502375,0.9342700385746663,0.9330271843778098,0.931783184384918,0.930538033490702,0.9292917265590656,0.9280442584228336,0.926795623883475,0.9255458177108257,0.924294834642806,0.9230426693851368,0.9217893166110506,0.9205347709610002,0.9192790270423652,0.9180220794291525,0.9167639226616955,0.91550455124635,0.9142439596551842,0.9129821423256679,0.9117190936603564,0.9104548080265719,0.9091892797560794,0.9079225031447609,0.9066544724522845,0.9053851819017702,0.9041146256794508,0.9028427979343306,0.901569692777838,0.9002953042834757,0.8990196264864654,0.8977426533833894,0.896464378931827,0.8951847970499869,0.8939039016163357,0.892621686469221,0.8913381454064904,0.8900532721851059,0.8887670605207537,0.8874795040874489,0.8861905965171359,0.8849003313992834,0.8836087022804742,0.8823157026639911,0.881021326009397,0.8797255657321087,0.8784284152029675,0.8771298677478033,0.8758299166469927,0.8745285551350125,0.8732257763999883,0.8719215735832349,0.870615939778793,0.8693088680329605,0.8680003513438151,0.8666903826607337,0.865378954883904,0.8640660608638308,0.8627516934008348,0.861435845244546,0.8601185090933907,0.8587996775940704,0.8574793433410353,0.8561574988759508,0.8548341366871564,0.8535092492091175,0.8521828288218712,0.8508548678504635,0.8495253585643789,0.848194293176964,0.8468616638448421,0.8455274626673198,0.8441916816857867,0.842854312883107,0.8415153481830012,0.8401747794494219,0.8388325984859192,0.8374887970349987,0.8361433667774696,0.8347962993317855,0.8334475862533745,0.832097219033961,0.830745189100878,0.8293914878163701,0.828036106476886,0.8266790363123618,0.8253202684854952,0.8239597940910073,0.8225976041548956,0.8212336896336764,0.8198680414136164,0.8185006503099526,0.8171315070661022,0.8157606023528606,0.8143879267675883,0.8130134708333849,0.8116372249982542,0.8102591796342526,0.8088793250366297,0.8074976514229543,0.8061141489322264,0.8047288076239791,0.8033416174773649,0.80195256839023,0.8005616501781736,0.7991688525735945,0.7977741652247232,0.7963775776946387,0.7949790794602709,0.7935786599113898,0.7921763083495761,0.790772013987179,0.7893657659462574,0.7879575532575038,0.7865473648591539,0.7851351895958769,0.783721016217652,0.7823048333786234,0.7808866296359412,0.7794663934485832,0.7780441131761562,0.7766197770776817,0.7751933733103613,0.7737648899283212,0.7723343148813385,0.7709016360135476,0.7694668410621243,0.7680299176559495,0.7665908533142528,0.7651496354452321,0.7637062513446522,0.7622606881944203,0.7608129330611387,0.759362972894633,0.7579107945264566,0.7564563846683713,0.7549997299108013,0.7535408167212627,0.7520796314427666,0.7506161602921952,0.7491503893586513,0.7476823046017785,0.7462118918500561,0.7447391367990607,0.7432640250097023,0.7417865419064283,0.7403066727753963,0.7388244027626162,0.7373397168720605,0.7358525999637414,0.7343630367517537,0.7328710118022844,0.7313765095315877,0.7298795142039227,0.7283800099294561,0.7268779806621274,0.7253734101974754,0.7238662821704259,0.722356580053041,0.7208442871522253,0.7193293866073927,0.7178118613880895,0.7162916942915756,0.7147688679403585,0.7132433647796854,0.711715167074986,0.7101842569092696,0.7086506161804725,0.7071142265987573,0.7055750696837594,0.7040331267617829,0.7024883789629428,0.700940807218254,0.6993903922566623,0.6978371146020198,0.6962809545700033,0.6947218922649698,0.6931599075767537,0.6915949801774007,0.6900270895178361,0.6884562148244696,0.6868823350957322,0.685305429098543,0.6837254753647074,0.6821424521872419,0.6805563376166255,0.678967109456974,0.677374745262138,0.6757792223317213,0.6741805177070157,0.6725786081668541,0.6709734702233776,0.6693650801177127,0.6677534138155602,0.6661384470026908,0.6645201550803462,0.6628985131605415,0.6612734960612684,0.6596450783015974,0.658013234096671,0.6563779373525924,0.6547391616612026,0.6530968802947409,0.6514510662003922,0.6498016919947126,0.648148729957931,0.6464921520281249,0.6448319297952665,0.6431680344951343,0.6415004370030873,0.6398291078276992,0.6381540171042461,0.6364751345880456,0.6347924296476428,0.633105871257839,0.6314154279925565,0.6297210680175385,0.6280227590828767,0.6263204685153628,0.6246141632106565,0.6229038096252694,0.6211893737683545,0.6194708211932979,0.6177481169891069,0.6160212257715887,0.6142901116743105,0.6125547383393388,0.6108150689077494,0.6090710660098982,0.6073226917554511,0.6055699077231601,0.6038126749503832,0.6020509539223328,0.6002847045610528,0.5985138862141094,0.5967384576429878,0.5949583770111881,0.5931736018720082,0.5913840891560034,0.5895897951581142,0.5877906755244509,0.585986685238721,0.5841777786082926,0.5823639092498761,0.5805450300748183,0.5787210932739867,0.5768920503022392,0.5750578518624611,0.5732184478891516,0.5713737875315504,0.5695238191362854,0.5676684902295215,0.5658077474986006,0.5639415367731474,0.5620698030056273,0.5601924902513319,0.558309541647777,0.556420899393488,0.5545265047261494,0.5526262979000998,0.550720218163144,0.5488082037326573,0.5468901917709573,0.5449661183599149,0.5430359184747727,0.5410995259571458,0.5391568734871683,0.5372078925547566,0.5352525134299506,0.5332906651323,0.5313222753992581,0.5293472706535389,0.5273655759694009,0.5253771150378124,0.5233818101304497,0.5213795820624861,0.5193703501541156,0.5173540321907626,0.5153305443819188,0.5132998013185535,0.5112617159290321,0.5092161994334803,0.5071631612965265,0.5051025091783532,0.5030341488839771,0.5009579843106865,0.4988739173935489,0.49678184804890085,0.494681674115732,0.49257329129486277,0.49045659308581646,0.4883314707212742,0.4861978130990029,0.48405550671113473,0.4819044355706679,0.4797444811350598,0.47757552222676714,0.4753974349505818,0.4732100926076066,0.4710133656056998,0.46880712136621133,0.46659122422681837,0.4643655353402636,0.46212991256878005,0.4598842103739751,0.4576282797019354,0.4553619678632964,0.4530851184080002,0.45079757099445705,0.4484991612528,0.4461897206418992,0.44386907629979194,0.44153705088714773,0.43919346242337254,0.43683812411491957,0.4344708441753548,0.43209142563668546,0.4296996661514246,0.4272953577848353,0.42487828679675005,0.4224482334123157,0.42000497158097555,0.4175482687229375,0.4150778854623282,0.41259357534616536,0.41009508454822013,0.40758215155676353,0.40505450684510874,0.40251187252378223,0.39995396197305344,0.3973804794544479,0.3947911196997614,0.3921855674759597,0.38956349712420885,0.38692457207113784,0.3842684443102561,0.38159475385127317,0.3789031281348525,0.37619318141011754,0.3734645140719684,0.3707167119549899,0.36794934558042947,0.36516196935237527,0.36235412069887735,0.35952531915334157,0.3566750653710329,0.35380284007500307,0.35090810292514724,0.34799029130343223,0.345048819007574,0.3420830748445843,0.3390924211146525,0.3360761919747248,0.3330336916699029,0.32996419261938165,0.32686693334203176,0.3237411162048935,0.320585904975757,0.31740042215857983,0.3141837460877224,0.31093490775377153,0.30765288733002066,0.3043366103643685,0.3009849435963817,0.2975966903534324,0.29417058547295444,0.29070528968980985,0.28719938341825857,0.2836513598467625,0.2800596172504731,0.27642245041029156,0.27273804100822796,0.2690044468457411,0.2652195897038253,0.26138124162970217,0.2574870093934855,0.2535343168072103,0.2495203845355891,0.24544220694942132,0.241296525474356,0.23707979776384536,0.23278816186770565,0.22841739436612082,0.2239628611785085,0.21941945941724922,0.2147815482094537,0.21004286581555673,0.20519642957378156,0.20023441411004353,0.1951480017486949,0.18992719695211513,0.18456059361669613,0.1790350797045388,0.17333545726395508,0.16744394618485994,0.1613395250092296,0.15499703820580663,0.14838596005247204,0.14146863841465734,0.13419772299188398,0.12651226109093763,0.1183315053893799,0.10954454438007719,0.09999168854112497,0.0894278276254381,0.07744031506983888,0.06322448399238306,0.044702737660220405,0.0],"x":[-2.0,-1.999000999000999,-1.998001998001998,-1.997002997002997,-1.996003996003996,-1.995004995004995,-1.994005994005994,-1.993006993006993,-1.992007992007992,-1.991008991008991,-1.99000999000999,-1.989010989010989,-1.988011988011988,-1.9870129870129871,-1.986013986013986,-1.985014985014985,-1.9840159840159841,-1.983016983016983,-1.982017982017982,-1.981018981018981,-1.98001998001998,-1.979020979020979,-1.978021978021978,-1.977022977022977,-1.976023976023976,-1.975024975024975,-1.974025974025974,-1.973026973026973,-1.972027972027972,-1.971028971028971,-1.97002997002997,-1.969030969030969,-1.968031968031968,-1.967032967032967,-1.966033966033966,-1.965034965034965,-1.9640359640359641,-1.963036963036963,-1.962037962037962,-1.9610389610389611,-1.96003996003996,-1.959040959040959,-1.9580419580419581,-1.957042957042957,-1.956043956043956,-1.9550449550449551,-1.954045954045954,-1.953046953046953,-1.9520479520479521,-1.951048951048951,-1.95004995004995,-1.949050949050949,-1.948051948051948,-1.947052947052947,-1.946053946053946,-1.945054945054945,-1.944055944055944,-1.943056943056943,-1.942057942057942,-1.9410589410589412,-1.94005994005994,-1.939060939060939,-1.9380619380619382,-1.937062937062937,-1.936063936063936,-1.9350649350649352,-1.934065934065934,-1.933066933066933,-1.9320679320679321,-1.931068931068931,-1.93006993006993,-1.9290709290709291,-1.928071928071928,-1.927072927072927,-1.9260739260739261,-1.925074925074925,-1.924075924075924,-1.9230769230769231,-1.922077922077922,-1.921078921078921,-1.9200799200799201,-1.919080919080919,-1.9180819180819182,-1.9170829170829171,-1.916083916083916,-1.9150849150849152,-1.914085914085914,-1.913086913086913,-1.9120879120879122,-1.911088911088911,-1.91008991008991,-1.9090909090909092,-1.908091908091908,-1.907092907092907,-1.9060939060939062,-1.905094905094905,-1.904095904095904,-1.9030969030969032,-1.902097902097902,-1.901098901098901,-1.9000999000999002,-1.899100899100899,-1.898101898101898,-1.8971028971028971,-1.896103896103896,-1.8951048951048952,-1.8941058941058941,-1.893106893106893,-1.8921078921078922,-1.8911088911088911,-1.89010989010989,-1.8891108891108892,-1.8881118881118881,-1.887112887112887,-1.8861138861138862,-1.8851148851148851,-1.884115884115884,-1.8831168831168832,-1.8821178821178821,-1.881118881118881,-1.8801198801198802,-1.879120879120879,-1.878121878121878,-1.8771228771228772,-1.876123876123876,-1.875124875124875,-1.8741258741258742,-1.873126873126873,-1.872127872127872,-1.8711288711288712,-1.87012987012987,-1.8691308691308692,-1.8681318681318682,-1.867132867132867,-1.8661338661338662,-1.8651348651348651,-1.864135864135864,-1.8631368631368632,-1.8621378621378621,-1.861138861138861,-1.8601398601398602,-1.8591408591408591,-1.858141858141858,-1.8571428571428572,-1.8561438561438561,-1.855144855144855,-1.8541458541458542,-1.8531468531468531,-1.852147852147852,-1.8511488511488512,-1.8501498501498501,-1.849150849150849,-1.8481518481518482,-1.847152847152847,-1.8461538461538463,-1.8451548451548452,-1.844155844155844,-1.8431568431568432,-1.8421578421578422,-1.841158841158841,-1.8401598401598402,-1.8391608391608392,-1.838161838161838,-1.8371628371628372,-1.8361638361638362,-1.835164835164835,-1.8341658341658342,-1.8331668331668332,-1.832167832167832,-1.8311688311688312,-1.8301698301698301,-1.829170829170829,-1.8281718281718282,-1.8271728271728271,-1.826173826173826,-1.8251748251748252,-1.8241758241758241,-1.8231768231768233,-1.8221778221778222,-1.8211788211788211,-1.8201798201798203,-1.8191808191808192,-1.8181818181818181,-1.8171828171828173,-1.8161838161838162,-1.8151848151848151,-1.8141858141858143,-1.8131868131868132,-1.812187812187812,-1.8111888111888113,-1.8101898101898102,-1.809190809190809,-1.8081918081918082,-1.8071928071928072,-1.806193806193806,-1.8051948051948052,-1.8041958041958042,-1.803196803196803,-1.8021978021978022,-1.8011988011988012,-1.8001998001998003,-1.7992007992007992,-1.7982017982017982,-1.7972027972027973,-1.7962037962037962,-1.7952047952047951,-1.7942057942057943,-1.7932067932067932,-1.7922077922077921,-1.7912087912087913,-1.7902097902097902,-1.7892107892107891,-1.7882117882117883,-1.7872127872127872,-1.7862137862137861,-1.7852147852147853,-1.7842157842157842,-1.7832167832167831,-1.7822177822177823,-1.7812187812187812,-1.7802197802197801,-1.7792207792207793,-1.7782217782217782,-1.7772227772227773,-1.7762237762237763,-1.7752247752247752,-1.7742257742257743,-1.7732267732267732,-1.7722277722277722,-1.7712287712287713,-1.7702297702297702,-1.7692307692307692,-1.7682317682317683,-1.7672327672327672,-1.7662337662337662,-1.7652347652347653,-1.7642357642357642,-1.7632367632367631,-1.7622377622377623,-1.7612387612387612,-1.7602397602397601,-1.7592407592407593,-1.7582417582417582,-1.7572427572427571,-1.7562437562437563,-1.7552447552447552,-1.7542457542457544,-1.7532467532467533,-1.7522477522477522,-1.7512487512487513,-1.7502497502497503,-1.7492507492507492,-1.7482517482517483,-1.7472527472527473,-1.7462537462537462,-1.7452547452547453,-1.7442557442557443,-1.7432567432567432,-1.7422577422577423,-1.7412587412587412,-1.7402597402597402,-1.7392607392607393,-1.7382617382617382,-1.7372627372627372,-1.7362637362637363,-1.7352647352647352,-1.7342657342657342,-1.7332667332667333,-1.7322677322677322,-1.7312687312687314,-1.7302697302697303,-1.7292707292707292,-1.7282717282717284,-1.7272727272727273,-1.7262737262737262,-1.7252747252747254,-1.7242757242757243,-1.7232767232767232,-1.7222777222777224,-1.7212787212787213,-1.7202797202797202,-1.7192807192807193,-1.7182817182817183,-1.7172827172827172,-1.7162837162837163,-1.7152847152847153,-1.7142857142857142,-1.7132867132867133,-1.7122877122877123,-1.7112887112887112,-1.7102897102897103,-1.7092907092907093,-1.7082917082917084,-1.7072927072927073,-1.7062937062937062,-1.7052947052947054,-1.7042957042957043,-1.7032967032967032,-1.7022977022977024,-1.7012987012987013,-1.7002997002997002,-1.6993006993006994,-1.6983016983016983,-1.6973026973026972,-1.6963036963036964,-1.6953046953046953,-1.6943056943056942,-1.6933066933066934,-1.6923076923076923,-1.6913086913086912,-1.6903096903096904,-1.6893106893106893,-1.6883116883116882,-1.6873126873126874,-1.6863136863136863,-1.6853146853146854,-1.6843156843156843,-1.6833166833166833,-1.6823176823176824,-1.6813186813186813,-1.6803196803196803,-1.6793206793206794,-1.6783216783216783,-1.6773226773226773,-1.6763236763236764,-1.6753246753246753,-1.6743256743256743,-1.6733266733266734,-1.6723276723276723,-1.6713286713286712,-1.6703296703296704,-1.6693306693306693,-1.6683316683316682,-1.6673326673326674,-1.6663336663336663,-1.6653346653346652,-1.6643356643356644,-1.6633366633366633,-1.6623376623376624,-1.6613386613386614,-1.6603396603396603,-1.6593406593406594,-1.6583416583416584,-1.6573426573426573,-1.6563436563436564,-1.6553446553446554,-1.6543456543456543,-1.6533466533466534,-1.6523476523476524,-1.6513486513486513,-1.6503496503496504,-1.6493506493506493,-1.6483516483516483,-1.6473526473526474,-1.6463536463536463,-1.6453546453546453,-1.6443556443556444,-1.6433566433566433,-1.6423576423576423,-1.6413586413586414,-1.6403596403596403,-1.6393606393606395,-1.6383616383616384,-1.6373626373626373,-1.6363636363636365,-1.6353646353646354,-1.6343656343656343,-1.6333666333666335,-1.6323676323676324,-1.6313686313686313,-1.6303696303696305,-1.6293706293706294,-1.6283716283716283,-1.6273726273726274,-1.6263736263736264,-1.6253746253746253,-1.6243756243756244,-1.6233766233766234,-1.6223776223776223,-1.6213786213786214,-1.6203796203796204,-1.6193806193806193,-1.6183816183816184,-1.6173826173826173,-1.6163836163836163,-1.6153846153846154,-1.6143856143856143,-1.6133866133866135,-1.6123876123876124,-1.6113886113886113,-1.6103896103896105,-1.6093906093906094,-1.6083916083916083,-1.6073926073926075,-1.6063936063936064,-1.6053946053946053,-1.6043956043956045,-1.6033966033966034,-1.6023976023976023,-1.6013986013986015,-1.6003996003996004,-1.5994005994005993,-1.5984015984015985,-1.5974025974025974,-1.5964035964035963,-1.5954045954045954,-1.5944055944055944,-1.5934065934065933,-1.5924075924075924,-1.5914085914085914,-1.5904095904095905,-1.5894105894105894,-1.5884115884115884,-1.5874125874125875,-1.5864135864135864,-1.5854145854145854,-1.5844155844155845,-1.5834165834165834,-1.5824175824175823,-1.5814185814185815,-1.5804195804195804,-1.5794205794205793,-1.5784215784215785,-1.5774225774225774,-1.5764235764235763,-1.5754245754245755,-1.5744255744255744,-1.5734265734265733,-1.5724275724275725,-1.5714285714285714,-1.5704295704295703,-1.5694305694305695,-1.5684315684315684,-1.5674325674325675,-1.5664335664335665,-1.5654345654345654,-1.5644355644355645,-1.5634365634365635,-1.5624375624375624,-1.5614385614385615,-1.5604395604395604,-1.5594405594405594,-1.5584415584415585,-1.5574425574425574,-1.5564435564435564,-1.5554445554445555,-1.5544455544455544,-1.5534465534465534,-1.5524475524475525,-1.5514485514485514,-1.5504495504495504,-1.5494505494505495,-1.5484515484515484,-1.5474525474525473,-1.5464535464535465,-1.5454545454545454,-1.5444555444555446,-1.5434565434565435,-1.5424575424575424,-1.5414585414585416,-1.5404595404595405,-1.5394605394605394,-1.5384615384615385,-1.5374625374625375,-1.5364635364635364,-1.5354645354645355,-1.5344655344655345,-1.5334665334665334,-1.5324675324675325,-1.5314685314685315,-1.5304695304695304,-1.5294705294705295,-1.5284715284715285,-1.5274725274725274,-1.5264735264735265,-1.5254745254745254,-1.5244755244755244,-1.5234765234765235,-1.5224775224775224,-1.5214785214785216,-1.5204795204795205,-1.5194805194805194,-1.5184815184815186,-1.5174825174825175,-1.5164835164835164,-1.5154845154845156,-1.5144855144855145,-1.5134865134865134,-1.5124875124875126,-1.5114885114885115,-1.5104895104895104,-1.5094905094905096,-1.5084915084915085,-1.5074925074925074,-1.5064935064935066,-1.5054945054945055,-1.5044955044955044,-1.5034965034965035,-1.5024975024975025,-1.5014985014985014,-1.5004995004995005,-1.4995004995004995,-1.4985014985014986,-1.4975024975024975,-1.4965034965034965,-1.4955044955044956,-1.4945054945054945,-1.4935064935064934,-1.4925074925074926,-1.4915084915084915,-1.4905094905094904,-1.4895104895104896,-1.4885114885114885,-1.4875124875124874,-1.4865134865134866,-1.4855144855144855,-1.4845154845154844,-1.4835164835164836,-1.4825174825174825,-1.4815184815184814,-1.4805194805194806,-1.4795204795204795,-1.4785214785214784,-1.4775224775224776,-1.4765234765234765,-1.4755244755244756,-1.4745254745254746,-1.4735264735264735,-1.4725274725274726,-1.4715284715284715,-1.4705294705294705,-1.4695304695304696,-1.4685314685314685,-1.4675324675324675,-1.4665334665334666,-1.4655344655344655,-1.4645354645354645,-1.4635364635364636,-1.4625374625374625,-1.4615384615384615,-1.4605394605394606,-1.4595404595404595,-1.4585414585414584,-1.4575424575424576,-1.4565434565434565,-1.4555444555444554,-1.4545454545454546,-1.4535464535464535,-1.4525474525474527,-1.4515484515484516,-1.4505494505494505,-1.4495504495504496,-1.4485514485514486,-1.4475524475524475,-1.4465534465534466,-1.4455544455544456,-1.4445554445554445,-1.4435564435564436,-1.4425574425574426,-1.4415584415584415,-1.4405594405594406,-1.4395604395604396,-1.4385614385614385,-1.4375624375624376,-1.4365634365634365,-1.4355644355644355,-1.4345654345654346,-1.4335664335664335,-1.4325674325674325,-1.4315684315684316,-1.4305694305694305,-1.4295704295704297,-1.4285714285714286,-1.4275724275724275,-1.4265734265734267,-1.4255744255744256,-1.4245754245754245,-1.4235764235764237,-1.4225774225774226,-1.4215784215784215,-1.4205794205794207,-1.4195804195804196,-1.4185814185814185,-1.4175824175824177,-1.4165834165834166,-1.4155844155844155,-1.4145854145854146,-1.4135864135864136,-1.4125874125874125,-1.4115884115884116,-1.4105894105894106,-1.4095904095904095,-1.4085914085914086,-1.4075924075924076,-1.4065934065934067,-1.4055944055944056,-1.4045954045954046,-1.4035964035964037,-1.4025974025974026,-1.4015984015984015,-1.4005994005994007,-1.3996003996003996,-1.3986013986013985,-1.3976023976023977,-1.3966033966033966,-1.3956043956043955,-1.3946053946053947,-1.3936063936063936,-1.3926073926073925,-1.3916083916083917,-1.3906093906093906,-1.3896103896103895,-1.3886113886113887,-1.3876123876123876,-1.3866133866133865,-1.3856143856143857,-1.3846153846153846,-1.3836163836163837,-1.3826173826173827,-1.3816183816183816,-1.3806193806193807,-1.3796203796203796,-1.3786213786213786,-1.3776223776223777,-1.3766233766233766,-1.3756243756243756,-1.3746253746253747,-1.3736263736263736,-1.3726273726273726,-1.3716283716283717,-1.3706293706293706,-1.3696303696303695,-1.3686313686313687,-1.3676323676323676,-1.3666333666333665,-1.3656343656343657,-1.3646353646353646,-1.3636363636363635,-1.3626373626373627,-1.3616383616383616,-1.3606393606393605,-1.3596403596403597,-1.3586413586413586,-1.3576423576423577,-1.3566433566433567,-1.3556443556443556,-1.3546453546453547,-1.3536463536463537,-1.3526473526473526,-1.3516483516483517,-1.3506493506493507,-1.3496503496503496,-1.3486513486513487,-1.3476523476523476,-1.3466533466533466,-1.3456543456543457,-1.3446553446553446,-1.3436563436563436,-1.3426573426573427,-1.3416583416583416,-1.3406593406593406,-1.3396603396603397,-1.3386613386613386,-1.3376623376623376,-1.3366633366633367,-1.3356643356643356,-1.3346653346653348,-1.3336663336663337,-1.3326673326673326,-1.3316683316683318,-1.3306693306693307,-1.3296703296703296,-1.3286713286713288,-1.3276723276723277,-1.3266733266733266,-1.3256743256743257,-1.3246753246753247,-1.3236763236763236,-1.3226773226773227,-1.3216783216783217,-1.3206793206793206,-1.3196803196803197,-1.3186813186813187,-1.3176823176823176,-1.3166833166833167,-1.3156843156843157,-1.3146853146853146,-1.3136863136863137,-1.3126873126873126,-1.3116883116883118,-1.3106893106893107,-1.3096903096903096,-1.3086913086913088,-1.3076923076923077,-1.3066933066933066,-1.3056943056943058,-1.3046953046953047,-1.3036963036963036,-1.3026973026973028,-1.3016983016983017,-1.3006993006993006,-1.2997002997002998,-1.2987012987012987,-1.2977022977022976,-1.2967032967032968,-1.2957042957042957,-1.2947052947052946,-1.2937062937062938,-1.2927072927072927,-1.2917082917082916,-1.2907092907092907,-1.2897102897102897,-1.2887112887112888,-1.2877122877122877,-1.2867132867132867,-1.2857142857142858,-1.2847152847152847,-1.2837162837162837,-1.2827172827172828,-1.2817182817182817,-1.2807192807192807,-1.2797202797202798,-1.2787212787212787,-1.2777222777222776,-1.2767232767232768,-1.2757242757242757,-1.2747252747252746,-1.2737262737262738,-1.2727272727272727,-1.2717282717282716,-1.2707292707292708,-1.2697302697302697,-1.2687312687312686,-1.2677322677322678,-1.2667332667332667,-1.2657342657342658,-1.2647352647352648,-1.2637362637362637,-1.2627372627372628,-1.2617382617382618,-1.2607392607392607,-1.2597402597402598,-1.2587412587412588,-1.2577422577422577,-1.2567432567432568,-1.2557442557442557,-1.2547452547452547,-1.2537462537462538,-1.2527472527472527,-1.2517482517482517,-1.2507492507492508,-1.2497502497502497,-1.2487512487512487,-1.2477522477522478,-1.2467532467532467,-1.2457542457542456,-1.2447552447552448,-1.2437562437562437,-1.2427572427572429,-1.2417582417582418,-1.2407592407592407,-1.2397602397602399,-1.2387612387612388,-1.2377622377622377,-1.2367632367632369,-1.2357642357642358,-1.2347652347652347,-1.2337662337662338,-1.2327672327672328,-1.2317682317682317,-1.2307692307692308,-1.2297702297702298,-1.2287712287712287,-1.2277722277722278,-1.2267732267732268,-1.2257742257742257,-1.2247752247752248,-1.2237762237762237,-1.2227772227772227,-1.2217782217782218,-1.2207792207792207,-1.2197802197802199,-1.2187812187812188,-1.2177822177822177,-1.2167832167832169,-1.2157842157842158,-1.2147852147852147,-1.2137862137862139,-1.2127872127872128,-1.2117882117882117,-1.2107892107892109,-1.2097902097902098,-1.2087912087912087,-1.2077922077922079,-1.2067932067932068,-1.2057942057942057,-1.2047952047952049,-1.2037962037962038,-1.2027972027972027,-1.2017982017982018,-1.2007992007992008,-1.1998001998001997,-1.1988011988011988,-1.1978021978021978,-1.196803196803197,-1.1958041958041958,-1.1948051948051948,-1.193806193806194,-1.1928071928071928,-1.1918081918081918,-1.190809190809191,-1.1898101898101898,-1.1888111888111887,-1.187812187812188,-1.1868131868131868,-1.1858141858141857,-1.1848151848151849,-1.1838161838161838,-1.1828171828171827,-1.1818181818181819,-1.1808191808191808,-1.1798201798201797,-1.1788211788211789,-1.1778221778221778,-1.1768231768231767,-1.1758241758241759,-1.1748251748251748,-1.173826173826174,-1.1728271728271729,-1.1718281718281718,-1.170829170829171,-1.1698301698301699,-1.1688311688311688,-1.167832167832168,-1.1668331668331668,-1.1658341658341658,-1.164835164835165,-1.1638361638361638,-1.1628371628371628,-1.161838161838162,-1.1608391608391608,-1.1598401598401598,-1.158841158841159,-1.1578421578421578,-1.1568431568431568,-1.155844155844156,-1.1548451548451548,-1.1538461538461537,-1.152847152847153,-1.1518481518481518,-1.150849150849151,-1.1498501498501499,-1.1488511488511488,-1.147852147852148,-1.1468531468531469,-1.1458541458541458,-1.144855144855145,-1.1438561438561439,-1.1428571428571428,-1.141858141858142,-1.1408591408591409,-1.1398601398601398,-1.138861138861139,-1.1378621378621379,-1.1368631368631368,-1.135864135864136,-1.1348651348651349,-1.1338661338661338,-1.132867132867133,-1.1318681318681318,-1.1308691308691308,-1.12987012987013,-1.1288711288711288,-1.127872127872128,-1.126873126873127,-1.1258741258741258,-1.124875124875125,-1.123876123876124,-1.1228771228771228,-1.121878121878122,-1.120879120879121,-1.1198801198801198,-1.118881118881119,-1.1178821178821179,-1.1168831168831168,-1.115884115884116,-1.1148851148851149,-1.1138861138861138,-1.112887112887113,-1.1118881118881119,-1.1108891108891108,-1.10989010989011,-1.1088911088911089,-1.1078921078921078,-1.106893106893107,-1.1058941058941059,-1.1048951048951048,-1.103896103896104,-1.1028971028971029,-1.101898101898102,-1.100899100899101,-1.0999000999000998,-1.098901098901099,-1.097902097902098,-1.0969030969030968,-1.095904095904096,-1.094905094905095,-1.0939060939060938,-1.092907092907093,-1.091908091908092,-1.0909090909090908,-1.08991008991009,-1.088911088911089,-1.0879120879120878,-1.086913086913087,-1.085914085914086,-1.0849150849150848,-1.083916083916084,-1.0829170829170829,-1.0819180819180818,-1.080919080919081,-1.0799200799200799,-1.078921078921079,-1.077922077922078,-1.0769230769230769,-1.075924075924076,-1.074925074925075,-1.0739260739260739,-1.072927072927073,-1.071928071928072,-1.0709290709290709,-1.06993006993007,-1.068931068931069,-1.0679320679320679,-1.066933066933067,-1.065934065934066,-1.0649350649350648,-1.063936063936064,-1.062937062937063,-1.0619380619380618,-1.060939060939061,-1.05994005994006,-1.0589410589410588,-1.057942057942058,-1.056943056943057,-1.055944055944056,-1.054945054945055,-1.053946053946054,-1.052947052947053,-1.051948051948052,-1.050949050949051,-1.04995004995005,-1.048951048951049,-1.0479520479520479,-1.046953046953047,-1.045954045954046,-1.0449550449550449,-1.043956043956044,-1.042957042957043,-1.0419580419580419,-1.040959040959041,-1.03996003996004,-1.0389610389610389,-1.037962037962038,-1.036963036963037,-1.0359640359640359,-1.034965034965035,-1.033966033966034,-1.032967032967033,-1.031968031968032,-1.030969030969031,-1.02997002997003,-1.028971028971029,-1.027972027972028,-1.026973026973027,-1.025974025974026,-1.024975024975025,-1.023976023976024,-1.022977022977023,-1.021978021978022,-1.020979020979021,-1.01998001998002,-1.018981018981019,-1.017982017982018,-1.016983016983017,-1.0159840159840159,-1.014985014985015,-1.013986013986014,-1.0129870129870129,-1.011988011988012,-1.010989010989011,-1.00999000999001,-1.008991008991009,-1.007992007992008,-1.006993006993007,-1.005994005994006,-1.004995004995005,-1.003996003996004,-1.002997002997003,-1.001998001998002,-1.000999000999001,-1.0,-0.999000999000999,-0.998001998001998,-0.997002997002997,-0.996003996003996,-0.995004995004995,-0.994005994005994,-0.993006993006993,-0.9920079920079921,-0.991008991008991,-0.99000999000999,-0.989010989010989,-0.988011988011988,-0.987012987012987,-0.986013986013986,-0.985014985014985,-0.984015984015984,-0.983016983016983,-0.9820179820179821,-0.981018981018981,-0.98001998001998,-0.9790209790209791,-0.978021978021978,-0.977022977022977,-0.9760239760239761,-0.975024975024975,-0.974025974025974,-0.973026973026973,-0.972027972027972,-0.971028971028971,-0.97002997002997,-0.9690309690309691,-0.968031968031968,-0.967032967032967,-0.9660339660339661,-0.965034965034965,-0.964035964035964,-0.9630369630369631,-0.962037962037962,-0.961038961038961,-0.9600399600399601,-0.9590409590409591,-0.958041958041958,-0.957042957042957,-0.9560439560439561,-0.955044955044955,-0.954045954045954,-0.9530469530469531,-0.952047952047952,-0.951048951048951,-0.9500499500499501,-0.949050949050949,-0.948051948051948,-0.9470529470529471,-0.9460539460539461,-0.945054945054945,-0.9440559440559441,-0.9430569430569431,-0.942057942057942,-0.9410589410589411,-0.9400599400599401,-0.939060939060939,-0.938061938061938,-0.9370629370629371,-0.936063936063936,-0.935064935064935,-0.9340659340659341,-0.9330669330669331,-0.932067932067932,-0.9310689310689311,-0.9300699300699301,-0.929070929070929,-0.9280719280719281,-0.9270729270729271,-0.926073926073926,-0.9250749250749251,-0.9240759240759241,-0.9230769230769231,-0.922077922077922,-0.9210789210789211,-0.9200799200799201,-0.919080919080919,-0.9180819180819181,-0.9170829170829171,-0.916083916083916,-0.9150849150849151,-0.9140859140859141,-0.913086913086913,-0.9120879120879121,-0.9110889110889111,-0.9100899100899101,-0.9090909090909091,-0.9080919080919081,-0.9070929070929071,-0.906093906093906,-0.9050949050949051,-0.9040959040959041,-0.903096903096903,-0.9020979020979021,-0.9010989010989011,-0.9000999000999002,-0.8991008991008991,-0.8981018981018981,-0.8971028971028971,-0.8961038961038961,-0.8951048951048951,-0.8941058941058941,-0.8931068931068931,-0.8921078921078921,-0.8911088911088911,-0.8901098901098901,-0.8891108891108891,-0.8881118881118881,-0.8871128871128872,-0.8861138861138861,-0.8851148851148851,-0.8841158841158842,-0.8831168831168831,-0.8821178821178821,-0.8811188811188811,-0.8801198801198801,-0.8791208791208791,-0.8781218781218781,-0.8771228771228772,-0.8761238761238761,-0.8751248751248751,-0.8741258741258742,-0.8731268731268731,-0.8721278721278721,-0.8711288711288712,-0.8701298701298701,-0.8691308691308691,-0.8681318681318682,-0.8671328671328671,-0.8661338661338661,-0.8651348651348651,-0.8641358641358642,-0.8631368631368631,-0.8621378621378621,-0.8611388611388612,-0.8601398601398601,-0.8591408591408591,-0.8581418581418582,-0.8571428571428571,-0.8561438561438561,-0.8551448551448552,-0.8541458541458542,-0.8531468531468531,-0.8521478521478522,-0.8511488511488512,-0.8501498501498501,-0.8491508491508492,-0.8481518481518482,-0.8471528471528471,-0.8461538461538461,-0.8451548451548452,-0.8441558441558441,-0.8431568431568431,-0.8421578421578422,-0.8411588411588412,-0.8401598401598401,-0.8391608391608392,-0.8381618381618382,-0.8371628371628371,-0.8361638361638362,-0.8351648351648352,-0.8341658341658341,-0.8331668331668332,-0.8321678321678322,-0.8311688311688312,-0.8301698301698301,-0.8291708291708292,-0.8281718281718282,-0.8271728271728271,-0.8261738261738262,-0.8251748251748252,-0.8241758241758241,-0.8231768231768232,-0.8221778221778222,-0.8211788211788211,-0.8201798201798202,-0.8191808191808192,-0.8181818181818182,-0.8171828171828172,-0.8161838161838162,-0.8151848151848152,-0.8141858141858141,-0.8131868131868132,-0.8121878121878122,-0.8111888111888111,-0.8101898101898102,-0.8091908091908092,-0.8081918081918081,-0.8071928071928072,-0.8061938061938062,-0.8051948051948052,-0.8041958041958042,-0.8031968031968032,-0.8021978021978022,-0.8011988011988012,-0.8001998001998002,-0.7992007992007992,-0.7982017982017982,-0.7972027972027972,-0.7962037962037962,-0.7952047952047953,-0.7942057942057942,-0.7932067932067932,-0.7922077922077922,-0.7912087912087912,-0.7902097902097902,-0.7892107892107892,-0.7882117882117882,-0.7872127872127872,-0.7862137862137862,-0.7852147852147852,-0.7842157842157842,-0.7832167832167832,-0.7822177822177823,-0.7812187812187812,-0.7802197802197802,-0.7792207792207793,-0.7782217782217782,-0.7772227772227772,-0.7762237762237763,-0.7752247752247752,-0.7742257742257742,-0.7732267732267732,-0.7722277722277723,-0.7712287712287712,-0.7702297702297702,-0.7692307692307693,-0.7682317682317682,-0.7672327672327672,-0.7662337662337663,-0.7652347652347652,-0.7642357642357642,-0.7632367632367633,-0.7622377622377622,-0.7612387612387612,-0.7602397602397603,-0.7592407592407593,-0.7582417582417582,-0.7572427572427572,-0.7562437562437563,-0.7552447552447552,-0.7542457542457542,-0.7532467532467533,-0.7522477522477522,-0.7512487512487512,-0.7502497502497503,-0.7492507492507493,-0.7482517482517482,-0.7472527472527473,-0.7462537462537463,-0.7452547452547452,-0.7442557442557443,-0.7432567432567433,-0.7422577422577422,-0.7412587412587412,-0.7402597402597403,-0.7392607392607392,-0.7382617382617382,-0.7372627372627373,-0.7362637362637363,-0.7352647352647352,-0.7342657342657343,-0.7332667332667333,-0.7322677322677322,-0.7312687312687313,-0.7302697302697303,-0.7292707292707292,-0.7282717282717283,-0.7272727272727273,-0.7262737262737263,-0.7252747252747253,-0.7242757242757243,-0.7232767232767233,-0.7222777222777222,-0.7212787212787213,-0.7202797202797203,-0.7192807192807192,-0.7182817182817183,-0.7172827172827173,-0.7162837162837162,-0.7152847152847153,-0.7142857142857143,-0.7132867132867133,-0.7122877122877123,-0.7112887112887113,-0.7102897102897103,-0.7092907092907093,-0.7082917082917083,-0.7072927072927073,-0.7062937062937062,-0.7052947052947053,-0.7042957042957043,-0.7032967032967034,-0.7022977022977023,-0.7012987012987013,-0.7002997002997003,-0.6993006993006993,-0.6983016983016983,-0.6973026973026973,-0.6963036963036963,-0.6953046953046953,-0.6943056943056943,-0.6933066933066933,-0.6923076923076923,-0.6913086913086913,-0.6903096903096904,-0.6893106893106893,-0.6883116883116883,-0.6873126873126874,-0.6863136863136863,-0.6853146853146853,-0.6843156843156843,-0.6833166833166833,-0.6823176823176823,-0.6813186813186813,-0.6803196803196803,-0.6793206793206793,-0.6783216783216783,-0.6773226773226774,-0.6763236763236763,-0.6753246753246753,-0.6743256743256744,-0.6733266733266733,-0.6723276723276723,-0.6713286713286714,-0.6703296703296703,-0.6693306693306693,-0.6683316683316683,-0.6673326673326674,-0.6663336663336663,-0.6653346653346653,-0.6643356643356644,-0.6633366633366633,-0.6623376623376623,-0.6613386613386614,-0.6603396603396603,-0.6593406593406593,-0.6583416583416584,-0.6573426573426573,-0.6563436563436563,-0.6553446553446554,-0.6543456543456544,-0.6533466533466533,-0.6523476523476524,-0.6513486513486514,-0.6503496503496503,-0.6493506493506493,-0.6483516483516484,-0.6473526473526473,-0.6463536463536463,-0.6453546453546454,-0.6443556443556444,-0.6433566433566433,-0.6423576423576424,-0.6413586413586414,-0.6403596403596403,-0.6393606393606394,-0.6383616383616384,-0.6373626373626373,-0.6363636363636364,-0.6353646353646354,-0.6343656343656343,-0.6333666333666333,-0.6323676323676324,-0.6313686313686314,-0.6303696303696303,-0.6293706293706294,-0.6283716283716284,-0.6273726273726273,-0.6263736263736264,-0.6253746253746254,-0.6243756243756243,-0.6233766233766234,-0.6223776223776224,-0.6213786213786214,-0.6203796203796204,-0.6193806193806194,-0.6183816183816184,-0.6173826173826173,-0.6163836163836164,-0.6153846153846154,-0.6143856143856143,-0.6133866133866134,-0.6123876123876124,-0.6113886113886113,-0.6103896103896104,-0.6093906093906094,-0.6083916083916084,-0.6073926073926074,-0.6063936063936064,-0.6053946053946054,-0.6043956043956044,-0.6033966033966034,-0.6023976023976024,-0.6013986013986014,-0.6003996003996004,-0.5994005994005994,-0.5984015984015985,-0.5974025974025974,-0.5964035964035964,-0.5954045954045954,-0.5944055944055944,-0.5934065934065934,-0.5924075924075924,-0.5914085914085914,-0.5904095904095904,-0.5894105894105894,-0.5884115884115884,-0.5874125874125874,-0.5864135864135864,-0.5854145854145855,-0.5844155844155844,-0.5834165834165834,-0.5824175824175825,-0.5814185814185814,-0.5804195804195804,-0.5794205794205795,-0.5784215784215784,-0.5774225774225774,-0.5764235764235764,-0.5754245754245755,-0.5744255744255744,-0.5734265734265734,-0.5724275724275725,-0.5714285714285714,-0.5704295704295704,-0.5694305694305695,-0.5684315684315684,-0.5674325674325674,-0.5664335664335665,-0.5654345654345654,-0.5644355644355644,-0.5634365634365635,-0.5624375624375625,-0.5614385614385614,-0.5604395604395604,-0.5594405594405595,-0.5584415584415584,-0.5574425574425574,-0.5564435564435565,-0.5554445554445554,-0.5544455544455544,-0.5534465534465535,-0.5524475524475524,-0.5514485514485514,-0.5504495504495505,-0.5494505494505495,-0.5484515484515484,-0.5474525474525475,-0.5464535464535465,-0.5454545454545454,-0.5444555444555444,-0.5434565434565435,-0.5424575424575424,-0.5414585414585414,-0.5404595404595405,-0.5394605394605395,-0.5384615384615384,-0.5374625374625375,-0.5364635364635365,-0.5354645354645354,-0.5344655344655345,-0.5334665334665335,-0.5324675324675324,-0.5314685314685315,-0.5304695304695305,-0.5294705294705294,-0.5284715284715285,-0.5274725274725275,-0.5264735264735265,-0.5254745254745254,-0.5244755244755245,-0.5234765234765235,-0.5224775224775224,-0.5214785214785215,-0.5204795204795205,-0.5194805194805194,-0.5184815184815185,-0.5174825174825175,-0.5164835164835165,-0.5154845154845155,-0.5144855144855145,-0.5134865134865135,-0.5124875124875125,-0.5114885114885115,-0.5104895104895105,-0.5094905094905094,-0.5084915084915085,-0.5074925074925075,-0.5064935064935064,-0.5054945054945055,-0.5044955044955045,-0.5034965034965035,-0.5024975024975025,-0.5014985014985015,-0.5004995004995005,-0.4995004995004995,-0.4985014985014985,-0.4975024975024975,-0.4965034965034965,-0.4955044955044955,-0.4945054945054945,-0.4935064935064935,-0.4925074925074925,-0.4915084915084915,-0.4905094905094905,-0.48951048951048953,-0.4885114885114885,-0.4875124875124875,-0.4865134865134865,-0.4855144855144855,-0.48451548451548454,-0.4835164835164835,-0.4825174825174825,-0.48151848151848153,-0.4805194805194805,-0.47952047952047955,-0.4785214785214785,-0.4775224775224775,-0.47652347652347654,-0.4755244755244755,-0.4745254745254745,-0.47352647352647353,-0.4725274725274725,-0.47152847152847155,-0.47052947052947053,-0.4695304695304695,-0.46853146853146854,-0.4675324675324675,-0.46653346653346656,-0.46553446553446554,-0.4645354645354645,-0.46353646353646355,-0.46253746253746253,-0.46153846153846156,-0.46053946053946054,-0.4595404595404595,-0.45854145854145856,-0.45754245754245754,-0.4565434565434565,-0.45554445554445555,-0.45454545454545453,-0.45354645354645357,-0.45254745254745254,-0.4515484515484515,-0.45054945054945056,-0.44955044955044954,-0.4485514485514486,-0.44755244755244755,-0.44655344655344653,-0.44555444555444557,-0.44455544455544455,-0.4435564435564436,-0.44255744255744256,-0.44155844155844154,-0.4405594405594406,-0.43956043956043955,-0.4385614385614386,-0.43756243756243757,-0.43656343656343655,-0.4355644355644356,-0.43456543456543456,-0.43356643356643354,-0.4325674325674326,-0.43156843156843155,-0.4305694305694306,-0.42957042957042957,-0.42857142857142855,-0.4275724275724276,-0.42657342657342656,-0.4255744255744256,-0.4245754245754246,-0.42357642357642356,-0.4225774225774226,-0.42157842157842157,-0.4205794205794206,-0.4195804195804196,-0.41858141858141856,-0.4175824175824176,-0.4165834165834166,-0.4155844155844156,-0.4145854145854146,-0.41358641358641357,-0.4125874125874126,-0.4115884115884116,-0.41058941058941056,-0.4095904095904096,-0.4085914085914086,-0.4075924075924076,-0.4065934065934066,-0.40559440559440557,-0.4045954045954046,-0.4035964035964036,-0.4025974025974026,-0.4015984015984016,-0.4005994005994006,-0.3996003996003996,-0.3986013986013986,-0.39760239760239763,-0.3966033966033966,-0.3956043956043956,-0.3946053946053946,-0.3936063936063936,-0.3926073926073926,-0.3916083916083916,-0.3906093906093906,-0.38961038961038963,-0.3886113886113886,-0.3876123876123876,-0.3866133866133866,-0.3856143856143856,-0.38461538461538464,-0.3836163836163836,-0.3826173826173826,-0.38161838161838163,-0.3806193806193806,-0.37962037962037964,-0.3786213786213786,-0.3776223776223776,-0.37662337662337664,-0.3756243756243756,-0.37462537462537465,-0.37362637362637363,-0.3726273726273726,-0.37162837162837165,-0.3706293706293706,-0.3696303696303696,-0.36863136863136864,-0.3676323676323676,-0.36663336663336665,-0.36563436563436563,-0.3646353646353646,-0.36363636363636365,-0.3626373626373626,-0.36163836163836166,-0.36063936063936064,-0.3596403596403596,-0.35864135864135865,-0.35764235764235763,-0.35664335664335667,-0.35564435564435565,-0.3546453546453546,-0.35364635364635366,-0.35264735264735264,-0.3516483516483517,-0.35064935064935066,-0.34965034965034963,-0.34865134865134867,-0.34765234765234765,-0.34665334665334663,-0.34565434565434566,-0.34465534465534464,-0.3436563436563437,-0.34265734265734266,-0.34165834165834164,-0.34065934065934067,-0.33966033966033965,-0.3386613386613387,-0.33766233766233766,-0.33666333666333664,-0.3356643356643357,-0.33466533466533466,-0.3336663336663337,-0.33266733266733267,-0.33166833166833165,-0.3306693306693307,-0.32967032967032966,-0.32867132867132864,-0.3276723276723277,-0.32667332667332666,-0.3256743256743257,-0.3246753246753247,-0.32367632367632365,-0.3226773226773227,-0.32167832167832167,-0.3206793206793207,-0.3196803196803197,-0.31868131868131866,-0.3176823176823177,-0.3166833166833167,-0.3156843156843157,-0.3146853146853147,-0.31368631368631367,-0.3126873126873127,-0.3116883116883117,-0.3106893106893107,-0.3096903096903097,-0.3086913086913087,-0.3076923076923077,-0.3066933066933067,-0.30569430569430567,-0.3046953046953047,-0.3036963036963037,-0.3026973026973027,-0.3016983016983017,-0.3006993006993007,-0.2997002997002997,-0.2987012987012987,-0.2977022977022977,-0.2967032967032967,-0.2957042957042957,-0.2947052947052947,-0.2937062937062937,-0.29270729270729273,-0.2917082917082917,-0.2907092907092907,-0.2897102897102897,-0.2887112887112887,-0.28771228771228774,-0.2867132867132867,-0.2857142857142857,-0.28471528471528473,-0.2837162837162837,-0.2827172827172827,-0.2817182817182817,-0.2807192807192807,-0.27972027972027974,-0.2787212787212787,-0.2777222777222777,-0.27672327672327673,-0.2757242757242757,-0.27472527472527475,-0.27372627372627373,-0.2727272727272727,-0.27172827172827174,-0.2707292707292707,-0.26973026973026976,-0.26873126873126874,-0.2677322677322677,-0.26673326673326675,-0.26573426573426573,-0.2647352647352647,-0.26373626373626374,-0.2627372627372627,-0.26173826173826176,-0.26073926073926074,-0.2597402597402597,-0.25874125874125875,-0.25774225774225773,-0.25674325674325676,-0.25574425574425574,-0.2547452547452547,-0.25374625374625376,-0.25274725274725274,-0.2517482517482518,-0.25074925074925075,-0.24975024975024976,-0.24875124875124874,-0.24775224775224775,-0.24675324675324675,-0.24575424575424576,-0.24475524475524477,-0.24375624375624375,-0.24275724275724275,-0.24175824175824176,-0.24075924075924077,-0.23976023976023977,-0.23876123876123875,-0.23776223776223776,-0.23676323676323677,-0.23576423576423577,-0.23476523476523475,-0.23376623376623376,-0.23276723276723277,-0.23176823176823177,-0.23076923076923078,-0.22977022977022976,-0.22877122877122877,-0.22777222777222778,-0.22677322677322678,-0.22577422577422576,-0.22477522477522477,-0.22377622377622378,-0.22277722277722278,-0.2217782217782218,-0.22077922077922077,-0.21978021978021978,-0.21878121878121878,-0.2177822177822178,-0.21678321678321677,-0.21578421578421578,-0.21478521478521478,-0.2137862137862138,-0.2127872127872128,-0.21178821178821178,-0.21078921078921078,-0.2097902097902098,-0.2087912087912088,-0.2077922077922078,-0.20679320679320679,-0.2057942057942058,-0.2047952047952048,-0.2037962037962038,-0.20279720279720279,-0.2017982017982018,-0.2007992007992008,-0.1998001998001998,-0.19880119880119881,-0.1978021978021978,-0.1968031968031968,-0.1958041958041958,-0.19480519480519481,-0.1938061938061938,-0.1928071928071928,-0.1918081918081918,-0.19080919080919082,-0.18981018981018982,-0.1888111888111888,-0.1878121878121878,-0.18681318681318682,-0.18581418581418582,-0.1848151848151848,-0.1838161838161838,-0.18281718281718282,-0.18181818181818182,-0.18081918081918083,-0.1798201798201798,-0.17882117882117882,-0.17782217782217782,-0.17682317682317683,-0.17582417582417584,-0.17482517482517482,-0.17382617382617382,-0.17282717282717283,-0.17182817182817184,-0.17082917082917082,-0.16983016983016982,-0.16883116883116883,-0.16783216783216784,-0.16683316683316685,-0.16583416583416583,-0.16483516483516483,-0.16383616383616384,-0.16283716283716285,-0.16183816183816183,-0.16083916083916083,-0.15984015984015984,-0.15884115884115885,-0.15784215784215785,-0.15684315684315683,-0.15584415584415584,-0.15484515484515485,-0.15384615384615385,-0.15284715284715283,-0.15184815184815184,-0.15084915084915085,-0.14985014985014986,-0.14885114885114886,-0.14785214785214784,-0.14685314685314685,-0.14585414585414586,-0.14485514485514486,-0.14385614385614387,-0.14285714285714285,-0.14185814185814186,-0.14085914085914086,-0.13986013986013987,-0.13886113886113885,-0.13786213786213786,-0.13686313686313686,-0.13586413586413587,-0.13486513486513488,-0.13386613386613386,-0.13286713286713286,-0.13186813186813187,-0.13086913086913088,-0.12987012987012986,-0.12887112887112886,-0.12787212787212787,-0.12687312687312688,-0.1258741258741259,-0.12487512487512488,-0.12387612387612387,-0.12287712287712288,-0.12187812187812187,-0.12087912087912088,-0.11988011988011989,-0.11888111888111888,-0.11788211788211789,-0.11688311688311688,-0.11588411588411589,-0.11488511488511488,-0.11388611388611389,-0.11288711288711288,-0.11188811188811189,-0.1108891108891109,-0.10989010989010989,-0.1088911088911089,-0.10789210789210789,-0.1068931068931069,-0.10589410589410589,-0.1048951048951049,-0.1038961038961039,-0.1028971028971029,-0.1018981018981019,-0.1008991008991009,-0.0999000999000999,-0.0989010989010989,-0.0979020979020979,-0.0969030969030969,-0.0959040959040959,-0.09490509490509491,-0.0939060939060939,-0.09290709290709291,-0.0919080919080919,-0.09090909090909091,-0.0899100899100899,-0.08891108891108891,-0.08791208791208792,-0.08691308691308691,-0.08591408591408592,-0.08491508491508491,-0.08391608391608392,-0.08291708291708291,-0.08191808191808192,-0.08091908091908091,-0.07992007992007992,-0.07892107892107893,-0.07792207792207792,-0.07692307692307693,-0.07592407592407592,-0.07492507492507493,-0.07392607392607392,-0.07292707292707293,-0.07192807192807193,-0.07092907092907093,-0.06993006993006994,-0.06893106893106893,-0.06793206793206794,-0.06693306693306693,-0.06593406593406594,-0.06493506493506493,-0.06393606393606394,-0.06293706293706294,-0.061938061938061936,-0.060939060939060936,-0.059940059940059943,-0.058941058941058944,-0.057942057942057944,-0.056943056943056944,-0.055944055944055944,-0.054945054945054944,-0.053946053946053944,-0.052947052947052944,-0.05194805194805195,-0.05094905094905095,-0.04995004995004995,-0.04895104895104895,-0.04795204795204795,-0.04695304695304695,-0.04595404595404595,-0.04495504495504495,-0.04395604395604396,-0.04295704295704296,-0.04195804195804196,-0.04095904095904096,-0.03996003996003996,-0.03896103896103896,-0.03796203796203796,-0.03696303696303696,-0.03596403596403597,-0.03496503496503497,-0.03396603396603397,-0.03296703296703297,-0.03196803196803197,-0.030969030969030968,-0.029970029970029972,-0.028971028971028972,-0.027972027972027972,-0.026973026973026972,-0.025974025974025976,-0.024975024975024976,-0.023976023976023976,-0.022977022977022976,-0.02197802197802198,-0.02097902097902098,-0.01998001998001998,-0.01898101898101898,-0.017982017982017984,-0.016983016983016984,-0.015984015984015984,-0.014985014985014986,-0.013986013986013986,-0.012987012987012988,-0.011988011988011988,-0.01098901098901099,-0.00999000999000999,-0.008991008991008992,-0.007992007992007992,-0.006993006993006993,-0.005994005994005994,-0.004995004995004995,-0.003996003996003996,-0.002997002997002997,-0.001998001998001998,-0.000999000999000999,0.0]}
},{}],164:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"x":[-1.0e-200,-9.995004995054944e-201,-9.99000999010989e-201,-9.985014985164835e-201,-9.980019980219779e-201,-9.975024975274725e-201,-9.97002997032967e-201,-9.965034965384615e-201,-9.96003996043956e-201,-9.955044955494505e-201,-9.950049950549451e-201,-9.945054945604396e-201,-9.940059940659339e-201,-9.935064935714285e-201,-9.93006993076923e-201,-9.925074925824176e-201,-9.920079920879122e-201,-9.915084915934067e-201,-9.910089910989011e-201,-9.905094906043957e-201,-9.9000999010989e-201,-9.895104896153845e-201,-9.890109891208791e-201,-9.885114886263736e-201,-9.880119881318681e-201,-9.875124876373627e-201,-9.870129871428572e-201,-9.865134866483516e-201,-9.860139861538461e-201,-9.855144856593406e-201,-9.850149851648352e-201,-9.845154846703296e-201,-9.840159841758241e-201,-9.835164836813187e-201,-9.830169831868132e-201,-9.825174826923075e-201,-9.820179821978021e-201,-9.815184817032966e-201,-9.81018981208791e-201,-9.805194807142857e-201,-9.800199802197803e-201,-9.795204797252748e-201,-9.790209792307694e-201,-9.785214787362637e-201,-9.780219782417582e-201,-9.775224777472528e-201,-9.770229772527472e-201,-9.765234767582419e-201,-9.760239762637363e-201,-9.755244757692308e-201,-9.750249752747253e-201,-9.745254747802197e-201,-9.740259742857142e-201,-9.735264737912088e-201,-9.730269732967033e-201,-9.725274728021977e-201,-9.720279723076924e-201,-9.715284718131868e-201,-9.710289713186811e-201,-9.705294708241758e-201,-9.700299703296702e-201,-9.695304698351647e-201,-9.690309693406593e-201,-9.685314688461538e-201,-9.680319683516484e-201,-9.67532467857143e-201,-9.670329673626373e-201,-9.665334668681318e-201,-9.660339663736264e-201,-9.655344658791209e-201,-9.650349653846155e-201,-9.6453546489011e-201,-9.640359643956044e-201,-9.635364639010989e-201,-9.630369634065934e-201,-9.625374629120878e-201,-9.620379624175824e-201,-9.615384619230769e-201,-9.610389614285714e-201,-9.60539460934066e-201,-9.600399604395605e-201,-9.595404599450548e-201,-9.590409594505494e-201,-9.585414589560439e-201,-9.580419584615383e-201,-9.57542457967033e-201,-9.570429574725274e-201,-9.565434569780219e-201,-9.560439564835165e-201,-9.55544455989011e-201,-9.550449554945054e-201,-9.54545455e-201,-9.540459545054945e-201,-9.535464540109891e-201,-9.530469535164836e-201,-9.52547453021978e-201,-9.520479525274725e-201,-9.51548452032967e-201,-9.510489515384615e-201,-9.505494510439561e-201,-9.500499505494505e-201,-9.49550450054945e-201,-9.490509495604396e-201,-9.485514490659341e-201,-9.480519485714284e-201,-9.47552448076923e-201,-9.470529475824175e-201,-9.46553447087912e-201,-9.460539465934066e-201,-9.45554446098901e-201,-9.450549456043955e-201,-9.445554451098901e-201,-9.440559446153844e-201,-9.435564441208792e-201,-9.430569436263737e-201,-9.425574431318681e-201,-9.420579426373628e-201,-9.415584421428572e-201,-9.410589416483517e-201,-9.405594411538463e-201,-9.400599406593406e-201,-9.395604401648351e-201,-9.390609396703297e-201,-9.385614391758242e-201,-9.380619386813186e-201,-9.375624381868133e-201,-9.370629376923077e-201,-9.36563437197802e-201,-9.360639367032967e-201,-9.355644362087911e-201,-9.350649357142856e-201,-9.345654352197802e-201,-9.340659347252747e-201,-9.335664342307691e-201,-9.330669337362638e-201,-9.325674332417581e-201,-9.320679327472527e-201,-9.315684322527473e-201,-9.310689317582418e-201,-9.305694312637364e-201,-9.300699307692309e-201,-9.295704302747253e-201,-9.2907092978022e-201,-9.285714292857143e-201,-9.280719287912087e-201,-9.275724282967033e-201,-9.270729278021978e-201,-9.265734273076923e-201,-9.260739268131869e-201,-9.255744263186814e-201,-9.250749258241757e-201,-9.245754253296703e-201,-9.240759248351648e-201,-9.235764243406592e-201,-9.230769238461538e-201,-9.225774233516483e-201,-9.220779228571428e-201,-9.215784223626374e-201,-9.210789218681317e-201,-9.205794213736263e-201,-9.200799208791208e-201,-9.195804203846153e-201,-9.1908091989011e-201,-9.185814193956045e-201,-9.18081918901099e-201,-9.175824184065936e-201,-9.170829179120879e-201,-9.165834174175824e-201,-9.16083916923077e-201,-9.155844164285714e-201,-9.150849159340659e-201,-9.145854154395605e-201,-9.14085914945055e-201,-9.135864144505493e-201,-9.130869139560439e-201,-9.125874134615384e-201,-9.120879129670329e-201,-9.115884124725275e-201,-9.11088911978022e-201,-9.105894114835165e-201,-9.10089910989011e-201,-9.095904104945053e-201,-9.0909091e-201,-9.085914095054944e-201,-9.080919090109889e-201,-9.075924085164835e-201,-9.070929080219781e-201,-9.065934075274726e-201,-9.060939070329672e-201,-9.055944065384615e-201,-9.05094906043956e-201,-9.045954055494506e-201,-9.04095905054945e-201,-9.035964045604395e-201,-9.030969040659341e-201,-9.025974035714286e-201,-9.02097903076923e-201,-9.015984025824176e-201,-9.01098902087912e-201,-9.005994015934065e-201,-9.000999010989011e-201,-8.996004006043956e-201,-8.991009001098902e-201,-8.986013996153846e-201,-8.98101899120879e-201,-8.976023986263736e-201,-8.97102898131868e-201,-8.966033976373625e-201,-8.961038971428571e-201,-8.956043966483516e-201,-8.95104896153846e-201,-8.946053956593408e-201,-8.941058951648352e-201,-8.936063946703296e-201,-8.931068941758242e-201,-8.926073936813187e-201,-8.921078931868132e-201,-8.916083926923078e-201,-8.911088921978022e-201,-8.906093917032966e-201,-8.901098912087912e-201,-8.896103907142857e-201,-8.891108902197803e-201,-8.886113897252747e-201,-8.881118892307692e-201,-8.876123887362638e-201,-8.871128882417583e-201,-8.866133877472526e-201,-8.861138872527472e-201,-8.856143867582417e-201,-8.851148862637362e-201,-8.846153857692308e-201,-8.841158852747252e-201,-8.836163847802197e-201,-8.831168842857143e-201,-8.826173837912088e-201,-8.821178832967032e-201,-8.816183828021979e-201,-8.811188823076923e-201,-8.806193818131868e-201,-8.801198813186814e-201,-8.796203808241759e-201,-8.791208803296702e-201,-8.786213798351648e-201,-8.781218793406593e-201,-8.776223788461539e-201,-8.771228783516484e-201,-8.766233778571428e-201,-8.761238773626374e-201,-8.756243768681319e-201,-8.751248763736262e-201,-8.746253758791208e-201,-8.741258753846153e-201,-8.736263748901098e-201,-8.731268743956044e-201,-8.726273739010989e-201,-8.721278734065933e-201,-8.71628372912088e-201,-8.711288724175823e-201,-8.706293719230769e-201,-8.701298714285715e-201,-8.69630370934066e-201,-8.691308704395604e-201,-8.68631369945055e-201,-8.681318694505495e-201,-8.676323689560438e-201,-8.671328684615384e-201,-8.666333679670329e-201,-8.661338674725275e-201,-8.65634366978022e-201,-8.651348664835165e-201,-8.646353659890111e-201,-8.641358654945055e-201,-8.636363649999999e-201,-8.631368645054945e-201,-8.62637364010989e-201,-8.621378635164834e-201,-8.61638363021978e-201,-8.611388625274725e-201,-8.60639362032967e-201,-8.601398615384616e-201,-8.596403610439559e-201,-8.591408605494504e-201,-8.58641360054945e-201,-8.581418595604396e-201,-8.57642359065934e-201,-8.571428585714287e-201,-8.566433580769231e-201,-8.561438575824176e-201,-8.556443570879121e-201,-8.551448565934065e-201,-8.546453560989012e-201,-8.541458556043956e-201,-8.536463551098901e-201,-8.531468546153847e-201,-8.526473541208792e-201,-8.521478536263735e-201,-8.516483531318681e-201,-8.511488526373626e-201,-8.50649352142857e-201,-8.501498516483517e-201,-8.496503511538461e-201,-8.491508506593406e-201,-8.486513501648352e-201,-8.481518496703295e-201,-8.47652349175824e-201,-8.471528486813186e-201,-8.466533481868131e-201,-8.461538476923077e-201,-8.456543471978023e-201,-8.451548467032968e-201,-8.446553462087912e-201,-8.441558457142857e-201,-8.436563452197802e-201,-8.431568447252748e-201,-8.426573442307693e-201,-8.421578437362637e-201,-8.416583432417583e-201,-8.411588427472528e-201,-8.406593422527471e-201,-8.401598417582417e-201,-8.396603412637362e-201,-8.391608407692307e-201,-8.386613402747253e-201,-8.381618397802198e-201,-8.376623392857142e-201,-8.371628387912088e-201,-8.366633382967032e-201,-8.361638378021976e-201,-8.356643373076922e-201,-8.351648368131867e-201,-8.346653363186812e-201,-8.34165835824176e-201,-8.336663353296704e-201,-8.33166834835165e-201,-8.326673343406593e-201,-8.321678338461538e-201,-8.316683333516484e-201,-8.311688328571429e-201,-8.306693323626374e-201,-8.30169831868132e-201,-8.296703313736264e-201,-8.291708308791208e-201,-8.286713303846154e-201,-8.281718298901098e-201,-8.276723293956043e-201,-8.271728289010989e-201,-8.266733284065934e-201,-8.261738279120879e-201,-8.256743274175825e-201,-8.251748269230768e-201,-8.246753264285713e-201,-8.241758259340659e-201,-8.236763254395603e-201,-8.23176824945055e-201,-8.226773244505494e-201,-8.221778239560439e-201,-8.216783234615386e-201,-8.21178822967033e-201,-8.206793224725274e-201,-8.20179821978022e-201,-8.196803214835165e-201,-8.19180820989011e-201,-8.186813204945056e-201,-8.1818182e-201,-8.176823195054944e-201,-8.17182819010989e-201,-8.166833185164835e-201,-8.16183818021978e-201,-8.156843175274726e-201,-8.15184817032967e-201,-8.146853165384615e-201,-8.141858160439561e-201,-8.136863155494504e-201,-8.131868150549449e-201,-8.126873145604395e-201,-8.12187814065934e-201,-8.116883135714286e-201,-8.11188813076923e-201,-8.106893125824175e-201,-8.101898120879121e-201,-8.096903115934066e-201,-8.09190811098901e-201,-8.086913106043957e-201,-8.081918101098902e-201,-8.076923096153846e-201,-8.071928091208792e-201,-8.066933086263737e-201,-8.06193808131868e-201,-8.056943076373626e-201,-8.051948071428571e-201,-8.046953066483516e-201,-8.041958061538462e-201,-8.036963056593407e-201,-8.031968051648351e-201,-8.026973046703297e-201,-8.02197804175824e-201,-8.016983036813185e-201,-8.011988031868131e-201,-8.006993026923076e-201,-8.001998021978022e-201,-7.997003017032967e-201,-7.992008012087912e-201,-7.987013007142858e-201,-7.982018002197801e-201,-7.977022997252746e-201,-7.972027992307693e-201,-7.967032987362638e-201,-7.962037982417583e-201,-7.957042977472529e-201,-7.952047972527473e-201,-7.947052967582417e-201,-7.942057962637363e-201,-7.937062957692307e-201,-7.932067952747252e-201,-7.927072947802198e-201,-7.922077942857143e-201,-7.917082937912088e-201,-7.912087932967034e-201,-7.907092928021977e-201,-7.902097923076923e-201,-7.897102918131868e-201,-7.892107913186812e-201,-7.887112908241759e-201,-7.882117903296703e-201,-7.877122898351648e-201,-7.872127893406594e-201,-7.867132888461537e-201,-7.862137883516482e-201,-7.857142878571428e-201,-7.852147873626374e-201,-7.847152868681319e-201,-7.842157863736265e-201,-7.83716285879121e-201,-7.832167853846153e-201,-7.827172848901099e-201,-7.822177843956044e-201,-7.817182839010988e-201,-7.812187834065934e-201,-7.807192829120879e-201,-7.802197824175825e-201,-7.79720281923077e-201,-7.792207814285713e-201,-7.78721280934066e-201,-7.782217804395604e-201,-7.777222799450549e-201,-7.772227794505495e-201,-7.76723278956044e-201,-7.762237784615384e-201,-7.75724277967033e-201,-7.752247774725274e-201,-7.747252769780218e-201,-7.742257764835164e-201,-7.737262759890109e-201,-7.732267754945055e-201,-7.727272750000001e-201,-7.722277745054946e-201,-7.717282740109889e-201,-7.712287735164835e-201,-7.70729273021978e-201,-7.702297725274725e-201,-7.697302720329671e-201,-7.692307715384615e-201,-7.687312710439562e-201,-7.682317705494506e-201,-7.67732270054945e-201,-7.672327695604396e-201,-7.66733269065934e-201,-7.662337685714285e-201,-7.657342680769231e-201,-7.652347675824176e-201,-7.64735267087912e-201,-7.642357665934067e-201,-7.63736266098901e-201,-7.632367656043955e-201,-7.6273726510989e-201,-7.622377646153845e-201,-7.61738264120879e-201,-7.612387636263736e-201,-7.607392631318682e-201,-7.602397626373626e-201,-7.597402621428572e-201,-7.592407616483516e-201,-7.587412611538461e-201,-7.582417606593407e-201,-7.577422601648352e-201,-7.572427596703298e-201,-7.567432591758243e-201,-7.562437586813186e-201,-7.557442581868132e-201,-7.552447576923077e-201,-7.547452571978021e-201,-7.542457567032967e-201,-7.537462562087912e-201,-7.532467557142857e-201,-7.527472552197803e-201,-7.522477547252746e-201,-7.517482542307691e-201,-7.512487537362637e-201,-7.507492532417582e-201,-7.502497527472526e-201,-7.497502522527472e-201,-7.492507517582417e-201,-7.487512512637362e-201,-7.482517507692308e-201,-7.477522502747253e-201,-7.472527497802199e-201,-7.467532492857143e-201,-7.462537487912088e-201,-7.457542482967034e-201,-7.452547478021979e-201,-7.447552473076922e-201,-7.442557468131868e-201,-7.437562463186813e-201,-7.432567458241758e-201,-7.427572453296704e-201,-7.422577448351648e-201,-7.417582443406593e-201,-7.412587438461539e-201,-7.407592433516482e-201,-7.402597428571427e-201,-7.397602423626373e-201,-7.392607418681318e-201,-7.387612413736263e-201,-7.382617408791209e-201,-7.377622403846153e-201,-7.372627398901097e-201,-7.367632393956044e-201,-7.362637389010989e-201,-7.357642384065935e-201,-7.35264737912088e-201,-7.347652374175824e-201,-7.34265736923077e-201,-7.337662364285715e-201,-7.332667359340658e-201,-7.327672354395605e-201,-7.32267734945055e-201,-7.317682344505494e-201,-7.31268733956044e-201,-7.307692334615385e-201,-7.30269732967033e-201,-7.297702324725276e-201,-7.292707319780219e-201,-7.287712314835163e-201,-7.28271730989011e-201,-7.277722304945054e-201,-7.272727299999999e-201,-7.267732295054945e-201,-7.26273729010989e-201,-7.257742285164834e-201,-7.252747280219779e-201,-7.247752275274724e-201,-7.242757270329671e-201,-7.237762265384616e-201,-7.232767260439561e-201,-7.227772255494507e-201,-7.222777250549452e-201,-7.217782245604395e-201,-7.212787240659341e-201,-7.207792235714286e-201,-7.20279723076923e-201,-7.197802225824176e-201,-7.192807220879121e-201,-7.187812215934066e-201,-7.182817210989012e-201,-7.177822206043955e-201,-7.1728272010989e-201,-7.167832196153846e-201,-7.16283719120879e-201,-7.157842186263735e-201,-7.152847181318681e-201,-7.147852176373626e-201,-7.142857171428572e-201,-7.137862166483515e-201,-7.13286716153846e-201,-7.127872156593406e-201,-7.122877151648352e-201,-7.117882146703297e-201,-7.112887141758243e-201,-7.107892136813188e-201,-7.102897131868131e-201,-7.097902126923077e-201,-7.092907121978022e-201,-7.087912117032967e-201,-7.082917112087913e-201,-7.077922107142857e-201,-7.072927102197802e-201,-7.067932097252748e-201,-7.062937092307691e-201,-7.057942087362636e-201,-7.052947082417582e-201,-7.047952077472527e-201,-7.042957072527472e-201,-7.037962067582418e-201,-7.032967062637362e-201,-7.027972057692309e-201,-7.022977052747252e-201,-7.017982047802196e-201,-7.012987042857143e-201,-7.007992037912087e-201,-7.002997032967032e-201,-6.99800202802198e-201,-6.993007023076924e-201,-6.988012018131867e-201,-6.983017013186814e-201,-6.978022008241758e-201,-6.973027003296703e-201,-6.968031998351649e-201,-6.963036993406594e-201,-6.958041988461538e-201,-6.953046983516485e-201,-6.948051978571428e-201,-6.943056973626372e-201,-6.938061968681319e-201,-6.933066963736263e-201,-6.92807195879121e-201,-6.923076953846154e-201,-6.918081948901099e-201,-6.913086943956045e-201,-6.908091939010988e-201,-6.903096934065933e-201,-6.898101929120879e-201,-6.893106924175824e-201,-6.888111919230768e-201,-6.883116914285714e-201,-6.87812190934066e-201,-6.873126904395604e-201,-6.86813189945055e-201,-6.863136894505495e-201,-6.858141889560439e-201,-6.853146884615385e-201,-6.84815187967033e-201,-6.843156874725275e-201,-6.838161869780221e-201,-6.833166864835164e-201,-6.828171859890109e-201,-6.823176854945055e-201,-6.81818185e-201,-6.813186845054946e-201,-6.80819184010989e-201,-6.803196835164835e-201,-6.798201830219781e-201,-6.793206825274724e-201,-6.788211820329669e-201,-6.783216815384615e-201,-6.77822181043956e-201,-6.773226805494505e-201,-6.76823180054945e-201,-6.763236795604395e-201,-6.75824179065934e-201,-6.753246785714286e-201,-6.748251780769231e-201,-6.743256775824176e-201,-6.738261770879122e-201,-6.733266765934066e-201,-6.728271760989011e-201,-6.723276756043957e-201,-6.7182817510989e-201,-6.713286746153845e-201,-6.708291741208791e-201,-6.703296736263736e-201,-6.698301731318682e-201,-6.693306726373627e-201,-6.688311721428571e-201,-6.683316716483517e-201,-6.67832171153846e-201,-6.673326706593407e-201,-6.668331701648352e-201,-6.663336696703296e-201,-6.658341691758242e-201,-6.653346686813187e-201,-6.648351681868132e-201,-6.643356676923076e-201,-6.638361671978022e-201,-6.633366667032967e-201,-6.628371662087912e-201,-6.623376657142857e-201,-6.618381652197803e-201,-6.613386647252746e-201,-6.608391642307692e-201,-6.603396637362638e-201,-6.598401632417583e-201,-6.593406627472527e-201,-6.588411622527472e-201,-6.583416617582418e-201,-6.578421612637363e-201,-6.573426607692308e-201,-6.568431602747252e-201,-6.563436597802197e-201,-6.558441592857143e-201,-6.553446587912088e-201,-6.548451582967033e-201,-6.543456578021979e-201,-6.538461573076923e-201,-6.533466568131868e-201,-6.5284715631868134e-201,-6.523476558241758e-201,-6.518481553296703e-201,-6.513486548351648e-201,-6.5084915434065936e-201,-6.503496538461538e-201,-6.498501533516483e-201,-6.493506528571428e-201,-6.488511523626373e-201,-6.483516518681319e-201,-6.478521513736264e-201,-6.4735265087912085e-201,-6.468531503846154e-201,-6.463536498901099e-201,-6.458541493956044e-201,-6.453546489010989e-201,-6.448551484065934e-201,-6.4435564791208795e-201,-6.4385614741758234e-201,-6.433566469230769e-201,-6.428571464285714e-201,-6.4235764593406596e-201,-6.418581454395604e-201,-6.41358644945055e-201,-6.408591444505495e-201,-6.403596439560439e-201,-6.3986014346153845e-201,-6.39360642967033e-201,-6.3886114247252746e-201,-6.383616419780219e-201,-6.378621414835165e-201,-6.373626409890109e-201,-6.368631404945055e-201,-6.3636363999999994e-201,-6.358641395054945e-201,-6.35364639010989e-201,-6.3486513851648356e-201,-6.34365638021978e-201,-6.338661375274725e-201,-6.3336663703296704e-201,-6.328671365384616e-201,-6.32367636043956e-201,-6.318681355494505e-201,-6.3136863505494505e-201,-6.308691345604395e-201,-6.30369634065934e-201,-6.298701335714286e-201,-6.2937063307692314e-201,-6.2887113258241754e-201,-6.283716320879121e-201,-6.278721315934066e-201,-6.273726310989011e-201,-6.2687313060439556e-201,-6.263736301098901e-201,-6.2587412961538456e-201,-6.253746291208791e-201,-6.248751286263736e-201,-6.243756281318681e-201,-6.2387612763736265e-201,-6.233766271428572e-201,-6.2287712664835166e-201,-6.223776261538461e-201,-6.218781256593407e-201,-6.213786251648352e-201,-6.208791246703296e-201,-6.2037962417582415e-201,-6.198801236813187e-201,-6.1938062318681315e-201,-6.188811226923076e-201,-6.1838162219780216e-201,-6.178821217032968e-201,-6.173826212087912e-201,-6.168831207142857e-201,-6.1638362021978025e-201,-6.158841197252747e-201,-6.153846192307692e-201,-6.148851187362637e-201,-6.143856182417582e-201,-6.138861177472527e-201,-6.133866172527472e-201,-6.1288711675824174e-201,-6.123876162637362e-201,-6.118881157692308e-201,-6.113886152747253e-201,-6.1088911478021976e-201,-6.103896142857143e-201,-6.0989011379120884e-201,-6.0939061329670324e-201,-6.088911128021978e-201,-6.083916123076923e-201,-6.0789211181318686e-201,-6.0739261131868125e-201,-6.068931108241758e-201,-6.063936103296703e-201,-6.058941098351647e-201,-6.0539460934065934e-201,-6.048951088461539e-201,-6.0439560835164835e-201,-6.038961078571428e-201,-6.0339660736263736e-201,-6.028971068681319e-201,-6.023976063736264e-201,-6.018981058791208e-201,-6.013986053846154e-201,-6.0089910489010984e-201,-6.003996043956044e-201,-5.9990010390109885e-201,-5.994006034065934e-201,-5.989011029120879e-201,-5.984016024175825e-201,-5.979021019230769e-201,-5.974026014285714e-201,-5.9690310093406595e-201,-5.964036004395605e-201,-5.959040999450549e-201,-5.954045994505494e-201,-5.94905098956044e-201,-5.944055984615384e-201,-5.939060979670329e-201,-5.934065974725275e-201,-5.92907096978022e-201,-5.9240759648351645e-201,-5.91908095989011e-201,-5.914085954945055e-201,-5.90909095e-201,-5.904095945054945e-201,-5.89910094010989e-201,-5.894105935164835e-201,-5.88911093021978e-201,-5.884115925274725e-201,-5.8791209203296695e-201,-5.874125915384616e-201,-5.869130910439561e-201,-5.864135905494506e-201,-5.8591409005494504e-201,-5.854145895604396e-201,-5.849150890659341e-201,-5.844155885714285e-201,-5.8391608807692306e-201,-5.834165875824176e-201,-5.829170870879121e-201,-5.824175865934065e-201,-5.819180860989011e-201,-5.814185856043956e-201,-5.809190851098901e-201,-5.804195846153846e-201,-5.7992008412087916e-201,-5.794205836263736e-201,-5.789210831318681e-201,-5.7842158263736264e-201,-5.779220821428571e-201,-5.7742258164835165e-201,-5.769230811538461e-201,-5.764235806593406e-201,-5.759240801648351e-201,-5.754245796703297e-201,-5.749250791758242e-201,-5.744255786813187e-201,-5.739260781868132e-201,-5.7342657769230775e-201,-5.7292707719780215e-201,-5.724275767032967e-201,-5.719280762087912e-201,-5.714285757142857e-201,-5.709290752197802e-201,-5.704295747252747e-201,-5.6993007423076925e-201,-5.6943057373626364e-201,-5.6893107324175825e-201,-5.684315727472528e-201,-5.6793207225274726e-201,-5.674325717582417e-201,-5.669330712637363e-201,-5.6643357076923074e-201,-5.659340702747253e-201,-5.6543456978021975e-201,-5.649350692857142e-201,-5.6443556879120875e-201,-5.639360682967033e-201,-5.6343656780219776e-201,-5.629370673076923e-201,-5.6243756681318684e-201,-5.619380663186814e-201,-5.614385658241758e-201,-5.609390653296703e-201,-5.6043956483516486e-201,-5.599400643406593e-201,-5.594405638461538e-201,-5.5894106335164834e-201,-5.584415628571429e-201,-5.579420623626373e-201,-5.574425618681318e-201,-5.569430613736264e-201,-5.564435608791209e-201,-5.5594406038461536e-201,-5.554445598901099e-201,-5.549450593956044e-201,-5.544455589010989e-201,-5.539460584065934e-201,-5.534465579120879e-201,-5.529470574175824e-201,-5.524475569230769e-201,-5.519480564285714e-201,-5.5144855593406586e-201,-5.509490554395605e-201,-5.50449554945055e-201,-5.499500544505494e-201,-5.4945055395604395e-201,-5.489510534615385e-201,-5.48451552967033e-201,-5.479520524725274e-201,-5.47452551978022e-201,-5.469530514835165e-201,-5.46453550989011e-201,-5.4595405049450544e-201,-5.4545455e-201,-5.449550495054945e-201,-5.44455549010989e-201,-5.439560485164835e-201,-5.43456548021978e-201,-5.4295704752747254e-201,-5.42457547032967e-201,-5.4195804653846155e-201,-5.41458546043956e-201,-5.4095904554945056e-201,-5.40459545054945e-201,-5.399600445604395e-201,-5.39460544065934e-201,-5.389610435714286e-201,-5.3846154307692304e-201,-5.379620425824176e-201,-5.374625420879121e-201,-5.3696304159340666e-201,-5.3646354109890106e-201,-5.359640406043956e-201,-5.3546454010989014e-201,-5.349650396153846e-201,-5.344655391208791e-201,-5.339660386263736e-201,-5.334665381318681e-201,-5.3296703763736255e-201,-5.324675371428572e-201,-5.319680366483517e-201,-5.314685361538462e-201,-5.3096903565934064e-201,-5.304695351648352e-201,-5.2997003467032965e-201,-5.294705341758242e-201,-5.2897103368131866e-201,-5.284715331868131e-201,-5.279720326923077e-201,-5.274725321978022e-201,-5.269730317032966e-201,-5.264735312087912e-201,-5.2597403071428575e-201,-5.254745302197803e-201,-5.249750297252747e-201,-5.244755292307692e-201,-5.239760287362638e-201,-5.2347652824175824e-201,-5.229770277472527e-201,-5.2247752725274725e-201,-5.219780267582417e-201,-5.214785262637362e-201,-5.209790257692307e-201,-5.2047952527472534e-201,-5.199800247802198e-201,-5.194805242857143e-201,-5.189810237912088e-201,-5.184815232967033e-201,-5.179820228021978e-201,-5.174825223076923e-201,-5.1698302181318676e-201,-5.164835213186813e-201,-5.1598402082417584e-201,-5.154845203296702e-201,-5.149850198351648e-201,-5.144855193406594e-201,-5.139860188461539e-201,-5.134865183516483e-201,-5.1298701785714286e-201,-5.124875173626374e-201,-5.119880168681319e-201,-5.1148851637362634e-201,-5.109890158791209e-201,-5.1048951538461535e-201,-5.099900148901098e-201,-5.0949051439560436e-201,-5.089910139010989e-201,-5.0849151340659336e-201,-5.079920129120879e-201,-5.0749251241758244e-201,-5.069930119230769e-201,-5.0649351142857145e-201,-5.059940109340659e-201,-5.054945104395604e-201,-5.049950099450549e-201,-5.044955094505495e-201,-5.0399600895604394e-201,-5.034965084615384e-201,-5.0299700796703295e-201,-5.024975074725275e-201,-5.0199800697802195e-201,-5.014985064835165e-201,-5.00999005989011e-201,-5.004995054945055e-201,-5.00000005e-201,-4.995005045054945e-201,-4.9900100401098905e-201,-4.9850150351648345e-201,-4.98002003021978e-201,-4.975025025274725e-201,-4.97003002032967e-201,-4.9650350153846146e-201,-4.960040010439561e-201,-4.9550450054945054e-201,-4.950050000549451e-201,-4.9450549956043955e-201,-4.94005999065934e-201,-4.9350649857142856e-201,-4.930069980769231e-201,-4.925074975824176e-201,-4.9200799708791204e-201,-4.915084965934066e-201,-4.910089960989011e-201,-4.905094956043955e-201,-4.900099951098901e-201,-4.895104946153847e-201,-4.890109941208791e-201,-4.885114936263736e-201,-4.8801199313186814e-201,-4.875124926373627e-201,-4.8701299214285715e-201,-4.865134916483516e-201,-4.8601399115384616e-201,-4.855144906593406e-201,-4.850149901648351e-201,-4.845154896703296e-201,-4.840159891758242e-201,-4.835164886813187e-201,-4.830169881868132e-201,-4.825174876923077e-201,-4.820179871978022e-201,-4.815184867032967e-201,-4.810189862087912e-201,-4.805194857142857e-201,-4.800199852197802e-201,-4.7952048472527475e-201,-4.7902098423076914e-201,-4.785214837362637e-201,-4.780219832417582e-201,-4.7752248274725284e-201,-4.770229822527472e-201,-4.765234817582418e-201,-4.760239812637363e-201,-4.755244807692308e-201,-4.7502498027472525e-201,-4.745254797802198e-201,-4.7402597928571426e-201,-4.735264787912087e-201,-4.730269782967033e-201,-4.725274778021977e-201,-4.720279773076923e-201,-4.715284768131868e-201,-4.7102897631868136e-201,-4.705294758241758e-201,-4.7002997532967036e-201,-4.695304748351648e-201,-4.690309743406593e-201,-4.6853147384615384e-201,-4.680319733516484e-201,-4.675324728571428e-201,-4.670329723626373e-201,-4.6653347186813186e-201,-4.660339713736264e-201,-4.655344708791209e-201,-4.650349703846154e-201,-4.6453546989010995e-201,-4.640359693956044e-201,-4.635364689010989e-201,-4.630369684065934e-201,-4.625374679120879e-201,-4.6203796741758236e-201,-4.615384669230769e-201,-4.610389664285714e-201,-4.605394659340659e-201,-4.600399654395604e-201,-4.59540464945055e-201,-4.5904096445054945e-201,-4.58541463956044e-201,-4.5804196346153846e-201,-4.575424629670329e-201,-4.570429624725275e-201,-4.56543461978022e-201,-4.560439614835164e-201,-4.5554446098901095e-201,-4.550449604945055e-201,-4.5454546e-201,-4.540459595054944e-201,-4.5354645901098904e-201,-4.530469585164836e-201,-4.5254745802197804e-201,-4.520479575274725e-201,-4.5154845703296705e-201,-4.510489565384615e-201,-4.50549456043956e-201,-4.500499555494505e-201,-4.495504550549451e-201,-4.4905095456043954e-201,-4.48551454065934e-201,-4.4805195357142855e-201,-4.47552453076923e-201,-4.470529525824176e-201,-4.465534520879121e-201,-4.4605395159340656e-201,-4.455544510989011e-201,-4.4505495060439564e-201,-4.445554501098901e-201,-4.440559496153846e-201,-4.435564491208791e-201,-4.4305694862637366e-201,-4.4255744813186806e-201,-4.420579476373626e-201,-4.415584471428571e-201,-4.410589466483517e-201,-4.4055944615384614e-201,-4.400599456593407e-201,-4.3956044516483515e-201,-4.390609446703297e-201,-4.3856144417582416e-201,-4.380619436813187e-201,-4.375624431868132e-201,-4.3706294269230764e-201,-4.365634421978022e-201,-4.3606394170329665e-201,-4.355644412087912e-201,-4.350649407142857e-201,-4.345654402197802e-201,-4.340659397252747e-201,-4.335664392307693e-201,-4.3306693873626374e-201,-4.325674382417582e-201,-4.3206793774725275e-201,-4.315684372527473e-201,-4.310689367582417e-201,-4.305694362637362e-201,-4.300699357692308e-201,-4.295704352747252e-201,-4.290709347802198e-201,-4.285714342857143e-201,-4.2807193379120886e-201,-4.275724332967033e-201,-4.270729328021978e-201,-4.265734323076923e-201,-4.260739318131868e-201,-4.255744313186813e-201,-4.250749308241758e-201,-4.245754303296703e-201,-4.240759298351648e-201,-4.235764293406593e-201,-4.230769288461538e-201,-4.225774283516484e-201,-4.220779278571429e-201,-4.215784273626374e-201,-4.2107892686813184e-201,-4.205794263736264e-201,-4.200799258791209e-201,-4.195804253846153e-201,-4.1908092489010986e-201,-4.185814243956044e-201,-4.180819239010989e-201,-4.175824234065933e-201,-4.1708292291208795e-201,-4.165834224175825e-201,-4.1608392192307696e-201,-4.155844214285714e-201,-4.15084920934066e-201,-4.145854204395604e-201,-4.140859199450549e-201,-4.1358641945054944e-201,-4.130869189560439e-201,-4.1258741846153845e-201,-4.120879179670329e-201,-4.1158841747252746e-201,-4.110889169780219e-201,-4.1058941648351654e-201,-4.10089915989011e-201,-4.095904154945055e-201,-4.09090915e-201,-4.0859141450549455e-201,-4.0809191401098895e-201,-4.075924135164835e-201,-4.07092913021978e-201,-4.065934125274726e-201,-4.06093912032967e-201,-4.055944115384615e-201,-4.0509491104395605e-201,-4.045954105494506e-201,-4.0409591005494506e-201,-4.035964095604396e-201,-4.030969090659341e-201,-4.025974085714285e-201,-4.020979080769231e-201,-4.0159840758241754e-201,-4.010989070879121e-201,-4.0059940659340655e-201,-4.000999060989011e-201,-3.9960040560439556e-201,-3.991009051098901e-201,-3.9860140461538464e-201,-3.981019041208791e-201,-3.9760240362637365e-201,-3.971029031318682e-201,-3.966034026373626e-201,-3.961039021428571e-201,-3.9560440164835166e-201,-3.951049011538462e-201,-3.946054006593406e-201,-3.9410590016483514e-201,-3.936063996703297e-201,-3.9310689917582415e-201,-3.926073986813187e-201,-3.921078981868132e-201,-3.916083976923077e-201,-3.9110889719780216e-201,-3.906093967032967e-201,-3.9010989620879124e-201,-3.896103957142857e-201,-3.891108952197802e-201,-3.886113947252747e-201,-3.881118942307692e-201,-3.876123937362637e-201,-3.871128932417582e-201,-3.8661339274725274e-201,-3.861138922527473e-201,-3.856143917582418e-201,-3.851148912637362e-201,-3.8461539076923075e-201,-3.841158902747253e-201,-3.836163897802198e-201,-3.831168892857142e-201,-3.826173887912088e-201,-3.821178882967033e-201,-3.816183878021978e-201,-3.8111888730769225e-201,-3.806193868131868e-201,-3.801198863186813e-201,-3.796203858241759e-201,-3.791208853296703e-201,-3.786213848351649e-201,-3.7812188434065934e-201,-3.776223838461538e-201,-3.7712288335164835e-201,-3.766233828571428e-201,-3.7612388236263736e-201,-3.756243818681318e-201,-3.751248813736263e-201,-3.746253808791208e-201,-3.7412588038461545e-201,-3.736263798901099e-201,-3.731268793956044e-201,-3.726273789010989e-201,-3.721278784065935e-201,-3.7162837791208786e-201,-3.711288774175824e-201,-3.7062937692307694e-201,-3.701298764285714e-201,-3.696303759340659e-201,-3.691308754395604e-201,-3.686313749450549e-201,-3.681318744505495e-201,-3.67632373956044e-201,-3.671328734615385e-201,-3.66633372967033e-201,-3.6613387247252744e-201,-3.65634371978022e-201,-3.6513487148351645e-201,-3.64635370989011e-201,-3.6413587049450546e-201,-3.636363699999999e-201,-3.631368695054945e-201,-3.62637369010989e-201,-3.6213786851648355e-201,-3.61638368021978e-201,-3.6113886752747256e-201,-3.606393670329671e-201,-3.601398665384615e-201,-3.59640366043956e-201,-3.591408655494506e-201,-3.5864136505494504e-201,-3.581418645604395e-201,-3.5764236406593405e-201,-3.571428635714286e-201,-3.5664336307692306e-201,-3.561438625824176e-201,-3.5564436208791214e-201,-3.551448615934066e-201,-3.546453610989011e-201,-3.541458606043956e-201,-3.536463601098901e-201,-3.531468596153846e-201,-3.526473591208791e-201,-3.5214785862637356e-201,-3.516483581318681e-201,-3.5114885763736264e-201,-3.506493571428571e-201,-3.501498566483516e-201,-3.496503561538462e-201,-3.491508556593407e-201,-3.486513551648351e-201,-3.481518546703297e-201,-3.476523541758242e-201,-3.471528536813187e-201,-3.4665335318681314e-201,-3.461538526923077e-201,-3.456543521978022e-201,-3.451548517032967e-201,-3.4465535120879116e-201,-3.441558507142857e-201,-3.4365635021978024e-201,-3.431568497252747e-201,-3.4265734923076925e-201,-3.421578487362637e-201,-3.4165834824175825e-201,-3.411588477472527e-201,-3.4065934725274726e-201,-3.401598467582417e-201,-3.396603462637363e-201,-3.3916084576923074e-201,-3.386613452747252e-201,-3.3816184478021975e-201,-3.3766234428571436e-201,-3.3716284379120876e-201,-3.366633432967033e-201,-3.3616384280219784e-201,-3.356643423076924e-201,-3.351648418131868e-201,-3.346653413186813e-201,-3.3416584082417585e-201,-3.336663403296703e-201,-3.3316683983516486e-201,-3.326673393406593e-201,-3.321678388461539e-201,-3.3166833835164834e-201,-3.311688378571428e-201,-3.3066933736263735e-201,-3.301698368681319e-201,-3.2967033637362635e-201,-3.291708358791209e-201,-3.2867133538461536e-201,-3.281718348901098e-201,-3.276723343956044e-201,-3.271728339010989e-201,-3.2667333340659345e-201,-3.261738329120879e-201,-3.2567433241758242e-201,-3.251748319230769e-201,-3.2467533142857143e-201,-3.2417583093406594e-201,-3.2367633043956044e-201,-3.2317682994505494e-201,-3.2267732945054945e-201,-3.2217782895604395e-201,-3.2167832846153846e-201,-3.2117882796703296e-201,-3.206793274725275e-201,-3.2017982697802197e-201,-3.196803264835165e-201,-3.1918082598901098e-201,-3.1868132549450545e-201,-3.18181825e-201,-3.176823245054945e-201,-3.1718282401098903e-201,-3.166833235164835e-201,-3.16183823021978e-201,-3.156843225274725e-201,-3.15184822032967e-201,-3.1468532153846155e-201,-3.1418582104395605e-201,-3.1368632054945052e-201,-3.1318682005494506e-201,-3.1268731956043953e-201,-3.1218781906593407e-201,-3.1168831857142858e-201,-3.1118881807692308e-201,-3.106893175824176e-201,-3.101898170879121e-201,-3.096903165934066e-201,-3.091908160989011e-201,-3.086913156043956e-201,-3.0819181510989014e-201,-3.076923146153846e-201,-3.0719281412087908e-201,-3.066933136263736e-201,-3.061938131318681e-201,-3.0569431263736266e-201,-3.0519481214285713e-201,-3.0469531164835163e-201,-3.0419581115384614e-201,-3.0369631065934064e-201,-3.0319681016483515e-201,-3.026973096703297e-201,-3.0219780917582415e-201,-3.016983086813187e-201,-3.0119880818681316e-201,-3.006993076923077e-201,-3.0019980719780217e-201,-2.997003067032967e-201,-2.992008062087912e-201,-2.9870130571428572e-201,-2.9820180521978022e-201,-2.9770230472527473e-201,-2.972028042307692e-201,-2.9670330373626377e-201,-2.9620380324175824e-201,-2.9570430274725278e-201,-2.9520480225274725e-201,-2.947053017582417e-201,-2.9420580126373626e-201,-2.9370630076923076e-201,-2.932068002747253e-201,-2.9270729978021977e-201,-2.9220779928571427e-201,-2.9170829879120878e-201,-2.9120879829670328e-201,-2.9070929780219782e-201,-2.9020979730769233e-201,-2.897102968131868e-201,-2.8921079631868133e-201,-2.887112958241758e-201,-2.882117953296703e-201,-2.8771229483516485e-201,-2.8721279434065935e-201,-2.8671329384615386e-201,-2.8621379335164836e-201,-2.8571429285714283e-201,-2.8521479236263737e-201,-2.8471529186813184e-201,-2.842157913736264e-201,-2.8371629087912088e-201,-2.8321679038461535e-201,-2.827172898901099e-201,-2.8221778939560436e-201,-2.817182889010989e-201,-2.812187884065934e-201,-2.807192879120879e-201,-2.802197874175824e-201,-2.797202869230769e-201,-2.792207864285714e-201,-2.7872128593406592e-201,-2.7822178543956043e-201,-2.7772228494505497e-201,-2.7722278445054943e-201,-2.7672328395604397e-201,-2.7622378346153844e-201,-2.7572428296703295e-201,-2.752247824725275e-201,-2.74725281978022e-201,-2.742257814835165e-201,-2.73726280989011e-201,-2.7322678049450547e-201,-2.7272728e-201,-2.722277795054945e-201,-2.7172827901098898e-201,-2.7122877851648352e-201,-2.70729278021978e-201,-2.7022977752747253e-201,-2.69730277032967e-201,-2.6923077653846154e-201,-2.6873127604395604e-201,-2.6823177554945054e-201,-2.6773227505494505e-201,-2.6723277456043955e-201,-2.6673327406593402e-201,-2.662337735714286e-201,-2.6573427307692307e-201,-2.652347725824176e-201,-2.6473527208791207e-201,-2.6423577159340658e-201,-2.637362710989011e-201,-2.6323677060439562e-201,-2.6273727010989013e-201,-2.6223776961538463e-201,-2.617382691208791e-201,-2.6123876862637364e-201,-2.607392681318681e-201,-2.602397676373627e-201,-2.5974026714285715e-201,-2.5924076664835162e-201,-2.5874126615384616e-201,-2.5824176565934063e-201,-2.5774226516483517e-201,-2.5724276467032967e-201,-2.5674326417582418e-201,-2.5624376368131868e-201,-2.557442631868132e-201,-2.5524476269230765e-201,-2.547452621978022e-201,-2.5424576170329666e-201,-2.5374626120879124e-201,-2.532467607142857e-201,-2.527472602197802e-201,-2.522477597252747e-201,-2.517482592307692e-201,-2.5124875873626372e-201,-2.5074925824175826e-201,-2.5024975774725273e-201,-2.4975025725274727e-201,-2.4925075675824174e-201,-2.4875125626373628e-201,-2.4825175576923075e-201,-2.4775225527472525e-201,-2.472527547802198e-201,-2.4675325428571426e-201,-2.462537537912088e-201,-2.4575425329670327e-201,-2.4525475280219777e-201,-2.447552523076923e-201,-2.442557518131868e-201,-2.4375625131868132e-201,-2.4325675082417582e-201,-2.427572503296703e-201,-2.4225774983516483e-201,-2.4175824934065934e-201,-2.4125874884615388e-201,-2.4075924835164835e-201,-2.4025974785714285e-201,-2.3976024736263735e-201,-2.3926074686813186e-201,-2.387612463736264e-201,-2.382617458791209e-201,-2.3776224538461537e-201,-2.372627448901099e-201,-2.3676324439560438e-201,-2.362637439010989e-201,-2.3576424340659342e-201,-2.352647429120879e-201,-2.3476524241758243e-201,-2.342657419230769e-201,-2.337662414285714e-201,-2.332667409340659e-201,-2.3276724043956045e-201,-2.3226773994505495e-201,-2.3176823945054946e-201,-2.3126873895604392e-201,-2.3076923846153846e-201,-2.3026973796703293e-201,-2.297702374725275e-201,-2.2927073697802198e-201,-2.2877123648351648e-201,-2.28271735989011e-201,-2.277722354945055e-201,-2.27272735e-201,-2.2677323450549453e-201,-2.26273734010989e-201,-2.2577423351648354e-201,-2.25274733021978e-201,-2.2477523252747255e-201,-2.24275732032967e-201,-2.237762315384615e-201,-2.2327673104395606e-201,-2.2277723054945053e-201,-2.2227773005494507e-201,-2.2177822956043954e-201,-2.2127872906593404e-201,-2.2077922857142855e-201,-2.202797280769231e-201,-2.1978022758241756e-201,-2.192807270879121e-201,-2.1878122659340656e-201,-2.182817260989011e-201,-2.1778222560439557e-201,-2.172827251098901e-201,-2.167832246153846e-201,-2.1628372412087912e-201,-2.1578422362637362e-201,-2.1528472313186813e-201,-2.147852226373626e-201,-2.1428572214285717e-201,-2.1378622164835164e-201,-2.1328672115384618e-201,-2.1278722065934065e-201,-2.1228772016483515e-201,-2.1178821967032966e-201,-2.1128871917582416e-201,-2.107892186813187e-201,-2.1028971818681317e-201,-2.0979021769230767e-201,-2.0929071719780218e-201,-2.087912167032967e-201,-2.0829171620879122e-201,-2.0779221571428573e-201,-2.072927152197802e-201,-2.0679321472527474e-201,-2.062937142307692e-201,-2.0579421373626374e-201,-2.0529471324175825e-201,-2.0479521274725275e-201,-2.0429571225274726e-201,-2.0379621175824176e-201,-2.0329671126373626e-201,-2.0279721076923077e-201,-2.0229771027472527e-201,-2.017982097802198e-201,-2.0129870928571428e-201,-2.007992087912088e-201,-2.002997082967033e-201,-1.9980020780219776e-201,-1.9930070730769233e-201,-1.988012068131868e-201,-1.983017063186813e-201,-1.978022058241758e-201,-1.973027053296703e-201,-1.9680320483516482e-201,-1.9630370434065936e-201,-1.9580420384615383e-201,-1.9530470335164837e-201,-1.9480520285714284e-201,-1.9430570236263738e-201,-1.9380620186813184e-201,-1.933067013736264e-201,-1.928072008791209e-201,-1.923077003846154e-201,-1.918081998901099e-201,-1.913086993956044e-201,-1.9080919890109887e-201,-1.903096984065934e-201,-1.898101979120879e-201,-1.8931069741758245e-201,-1.8881119692307692e-201,-1.8831169642857143e-201,-1.8781219593406593e-201,-1.873126954395604e-201,-1.8681319494505497e-201,-1.8631369445054944e-201,-1.8581419395604395e-201,-1.8531469346153845e-201,-1.8481519296703295e-201,-1.8431569247252742e-201,-1.83816191978022e-201,-1.8331669148351647e-201,-1.82817190989011e-201,-1.8231769049450547e-201,-1.8181818999999998e-201,-1.813186895054945e-201,-1.8081918901098902e-201,-1.8031968851648353e-201,-1.7982018802197803e-201,-1.793206875274725e-201,-1.7882118703296704e-201,-1.783216865384615e-201,-1.778221860439561e-201,-1.7732268554945055e-201,-1.7682318505494506e-201,-1.7632368456043956e-201,-1.7582418406593403e-201,-1.7532468357142857e-201,-1.7482518307692307e-201,-1.7432568258241758e-201,-1.7382618208791208e-201,-1.733266815934066e-201,-1.728271810989011e-201,-1.723276806043956e-201,-1.718281801098901e-201,-1.7132867961538464e-201,-1.708291791208791e-201,-1.7032967862637365e-201,-1.698301781318681e-201,-1.6933067763736262e-201,-1.6883117714285716e-201,-1.6833167664835166e-201,-1.6783217615384617e-201,-1.6733267565934067e-201,-1.6683317516483514e-201,-1.6633367467032968e-201,-1.658341741758242e-201,-1.6533467368131865e-201,-1.648351731868132e-201,-1.643356726923077e-201,-1.638361721978022e-201,-1.633366717032967e-201,-1.628371712087912e-201,-1.6233767071428571e-201,-1.6183817021978024e-201,-1.6133866972527472e-201,-1.6083916923076923e-201,-1.6033966873626375e-201,-1.5984016824175825e-201,-1.5934066774725274e-201,-1.5884116725274726e-201,-1.5834166675824175e-201,-1.5784216626373625e-201,-1.5734266576923077e-201,-1.5684316527472526e-201,-1.5634366478021976e-201,-1.5584416428571429e-201,-1.5534466379120879e-201,-1.548451632967033e-201,-1.543456628021978e-201,-1.538461623076923e-201,-1.533466618131868e-201,-1.5284716131868133e-201,-1.5234766082417581e-201,-1.5184816032967032e-201,-1.5134865983516484e-201,-1.5084915934065934e-201,-1.5034965884615385e-201,-1.4985015835164835e-201,-1.4935065785714286e-201,-1.4885115736263736e-201,-1.4835165686813188e-201,-1.4785215637362639e-201,-1.4735265587912087e-201,-1.468531553846154e-201,-1.4635365489010988e-201,-1.4585415439560439e-201,-1.453546539010989e-201,-1.448551534065934e-201,-1.443556529120879e-201,-1.4385615241758242e-201,-1.4335665192307692e-201,-1.4285715142857141e-201,-1.4235765093406591e-201,-1.4185815043956044e-201,-1.4135864994505494e-201,-1.4085914945054945e-201,-1.4035964895604395e-201,-1.3986014846153845e-201,-1.3936064796703296e-201,-1.3886114747252748e-201,-1.3836164697802198e-201,-1.3786214648351647e-201,-1.37362645989011e-201,-1.368631454945055e-201,-1.36363645e-201,-1.3586414450549452e-201,-1.3536464401098901e-201,-1.3486514351648351e-201,-1.3436564302197802e-201,-1.3386614252747252e-201,-1.33366642032967e-201,-1.3286714153846153e-201,-1.3236764104395603e-201,-1.3186814054945054e-201,-1.3136864005494506e-201,-1.3086913956043955e-201,-1.3036963906593405e-201,-1.2987013857142857e-201,-1.2937063807692308e-201,-1.2887113758241758e-201,-1.2837163708791209e-201,-1.2787213659340659e-201,-1.273726360989011e-201,-1.2687313560439562e-201,-1.2637363510989012e-201,-1.258741346153846e-201,-1.2537463412087913e-201,-1.2487513362637363e-201,-1.2437563313186814e-201,-1.2387613263736264e-201,-1.2337663214285714e-201,-1.2287713164835165e-201,-1.2237763115384615e-201,-1.2187813065934066e-201,-1.2137863016483514e-201,-1.2087912967032967e-201,-1.2037962917582417e-201,-1.1988012868131867e-201,-1.193806281868132e-201,-1.1888112769230768e-201,-1.1838162719780219e-201,-1.178821267032967e-201,-1.1738262620879121e-201,-1.168831257142857e-201,-1.1638362521978022e-201,-1.1588412472527473e-201,-1.1538462423076923e-201,-1.1488512373626375e-201,-1.1438562324175824e-201,-1.1388612274725274e-201,-1.1338662225274726e-201,-1.1288712175824177e-201,-1.1238762126373627e-201,-1.1188812076923076e-201,-1.1138862027472528e-201,-1.1088911978021978e-201,-1.1038961928571427e-201,-1.098901187912088e-201,-1.0939061829670328e-201,-1.0889111780219778e-201,-1.083916173076923e-201,-1.0789211681318681e-201,-1.073926163186813e-201,-1.0689311582417582e-201,-1.0639361532967032e-201,-1.0589411483516483e-201,-1.0539461434065935e-201,-1.0489511384615383e-201,-1.0439561335164834e-201,-1.0389611285714286e-201,-1.0339661236263736e-201,-1.0289711186813187e-201,-1.0239761137362637e-201,-1.0189811087912088e-201,-1.0139861038461538e-201,-1.008991098901099e-201,-1.003996093956044e-201,-9.99001089010989e-202,-9.940060840659342e-202,-9.890110791208792e-202,-9.84016074175824e-202,-9.790210692307691e-202,-9.740260642857141e-202,-9.690310593406592e-202,-9.640360543956044e-202,-9.590410494505495e-202,-9.540460445054943e-202,-9.490510395604395e-202,-9.440560346153846e-202,-9.390610296703296e-202,-9.340660247252748e-202,-9.290710197802197e-202,-9.240760148351647e-202,-9.1908100989011e-202,-9.14086004945055e-202,-9.09091e-202,-9.04095995054945e-202,-8.991009901098901e-202,-8.941059851648352e-202,-8.891109802197804e-202,-8.841159752747253e-202,-8.791209703296703e-202,-8.741259653846155e-202,-8.691309604395606e-202,-8.641359554945054e-202,-8.591409505494505e-202,-8.541459456043955e-202,-8.491509406593405e-202,-8.441559357142858e-202,-8.391609307692308e-202,-8.341659258241757e-202,-8.291709208791209e-202,-8.24175915934066e-202,-8.19180910989011e-202,-8.14185906043956e-202,-8.0919090109890115e-202,-8.041958961538461e-202,-7.992008912087912e-202,-7.942058862637363e-202,-7.892108813186813e-202,-7.842158763736264e-202,-7.792208714285715e-202,-7.742258664835164e-202,-7.692308615384615e-202,-7.642358565934066e-202,-7.592408516483516e-202,-7.542458467032967e-202,-7.492508417582418e-202,-7.442558368131868e-202,-7.392608318681319e-202,-7.3426582692307695e-202,-7.29270821978022e-202,-7.24275817032967e-202,-7.192808120879122e-202,-7.142858071428571e-202,-7.092908021978022e-202,-7.042957972527472e-202,-6.993007923076922e-202,-6.943057873626374e-202,-6.893107824175823e-202,-6.843157774725275e-202,-6.793207725274726e-202,-6.743257675824175e-202,-6.693307626373627e-202,-6.643357576923077e-202,-6.5934075274725275e-202,-6.543457478021977e-202,-6.493507428571428e-202,-6.443557379120879e-202,-6.393607329670329e-202,-6.3436572802197805e-202,-6.29370723076923e-202,-6.243757181318681e-202,-6.193807131868133e-202,-6.143857082417582e-202,-6.0939070329670335e-202,-6.043956983516484e-202,-5.994006934065934e-202,-5.944056884615384e-202,-5.894106835164835e-202,-5.844156785714286e-202,-5.794206736263736e-202,-5.744256686813187e-202,-5.694306637362637e-202,-5.644356587912088e-202,-5.594406538461538e-202,-5.544456489010989e-202,-5.49450643956044e-202,-5.44455639010989e-202,-5.394606340659341e-202,-5.344656291208791e-202,-5.294706241758241e-202,-5.244756192307691e-202,-5.194806142857143e-202,-5.144856093406593e-202,-5.094906043956044e-202,-5.044955994505495e-202,-4.995005945054944e-202,-4.945055895604396e-202,-4.895105846153847e-202,-4.845155796703297e-202,-4.795205747252748e-202,-4.745255697802197e-202,-4.695305648351648e-202,-4.645355598901098e-202,-4.5954055494505495e-202,-4.5454555e-202,-4.49550545054945e-202,-4.445555401098902e-202,-4.395605351648351e-202,-4.3456553021978025e-202,-4.295705252747253e-202,-4.245755203296703e-202,-4.195805153846154e-202,-4.145855104395604e-202,-4.095905054945055e-202,-4.0459550054945055e-202,-3.996004956043956e-202,-3.9460549065934063e-202,-3.896104857142857e-202,-3.8461548076923076e-202,-3.7962047582417584e-202,-3.746254708791209e-202,-3.6963046593406593e-202,-3.6463546098901097e-202,-3.5964045604395605e-202,-3.546454510989011e-202,-3.4965044615384614e-202,-3.446554412087912e-202,-3.3966043626373627e-202,-3.346654313186813e-202,-3.2967042637362635e-202,-3.2467542142857144e-202,-3.1968041648351648e-202,-3.146854115384615e-202,-3.096904065934066e-202,-3.0469540164835165e-202,-2.997003967032967e-202,-2.9470539175824177e-202,-2.897103868131868e-202,-2.847153818681318e-202,-2.797203769230769e-202,-2.74725371978022e-202,-2.6973036703296703e-202,-2.6473536208791207e-202,-2.5974035714285716e-202,-2.5474535219780215e-202,-2.4975034725274724e-202,-2.4475534230769232e-202,-2.3976033736263737e-202,-2.347653324175824e-202,-2.297703274725275e-202,-2.247753225274725e-202,-2.1978031758241753e-202,-2.1478531263736266e-202,-2.097903076923077e-202,-2.0479530274725275e-202,-1.9980029780219779e-202,-1.9480529285714288e-202,-1.8981028791208792e-202,-1.8481528296703296e-202,-1.7982027802197802e-202,-1.7482527307692309e-202,-1.6983026813186813e-202,-1.6483526318681317e-202,-1.5984025824175826e-202,-1.548452532967033e-202,-1.4985024835164834e-202,-1.4485524340659343e-202,-1.3986023846153844e-202,-1.348652335164835e-202,-1.298702285714286e-202,-1.2487522362637361e-202,-1.1988021868131868e-202,-1.1488521373626374e-202,-1.0989020879120878e-202,-1.0489520384615385e-202,-9.99001989010989e-203,-9.490519395604394e-203,-8.991018901098902e-203,-8.491518406593407e-203,-7.992017912087911e-203,-7.492517417582418e-203,-6.993016923076923e-203,-6.493516428571428e-203,-5.994015934065934e-203,-5.494515439560439e-203,-4.995014945054945e-203,-4.495514450549451e-203,-3.9960139560439556e-203,-3.4965134615384614e-203,-2.997012967032967e-203,-2.4975124725274722e-203,-1.998011978021978e-203,-1.4985114835164834e-203,-9.99010989010989e-204,-4.995104945054945e-204,-1.0e-208]}
},{}],165:[function(require,module,exports){
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
var randu = require( '@stdlib/random/base/randu' );
var abs = require( '@stdlib/math/base/special/abs' );
var EPS = require( '@stdlib/constants/float64/eps' );
var avercos = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof avercos, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the inverse versed cosine', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = avercos( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 15.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse versed cosine (small negative numbers)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = avercos( x[i] );
		if ( y === expected[ i ] ) {
			t.strictEqual( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = avercos( NaN );
	t.strictEqual( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if provided a value less than `-2`', function test( t ) {
	var v;
	var i;
	for ( i = 0; i < 1e4; i++ ) {
		v = -(randu()*1.0e6) - (2.0+EPS);
		t.strictEqual( isnan( avercos( v ) ), true, 'returns NaN when provided '+v );
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a value greater than `0`', function test( t ) {
	var v;
	var i;
	for ( i = 0; i < 1e4; i++ ) {
		v = (randu()*1.0e6) + 0.0 + EPS;
		t.strictEqual( isnan( avercos( v ) ), true, 'returns NaN when provided '+v );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/avercos/test/test.js")
},{"./../lib":162,"./fixtures/julia/data.json":163,"./fixtures/julia/small_negative.json":164,"@stdlib/constants/float64/eps":133,"@stdlib/math/base/assert/is-nan":149,"@stdlib/math/base/special/abs":153,"@stdlib/random/base/randu":191,"tape":339}],166:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":167}],167:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],168:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './max.js' );


// EXPORTS //

module.exports = max;

},{"./max.js":169}],169:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* @example
* var v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
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
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
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
	m = NINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === PINF ) {
			return v;
		}
		if ( v > m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isPositiveZero( v )
		) {
			m = v;
		}
	}
	return m;
}


// EXPORTS //

module.exports = max;

},{"@stdlib/constants/float64/ninf":136,"@stdlib/constants/float64/pinf":137,"@stdlib/math/base/assert/is-nan":149,"@stdlib/math/base/assert/is-positive-zero":151}],170:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var sqrt = require( './main.js' );


// EXPORTS //

module.exports = sqrt;

},{"./main.js":171}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Perform C-like multiplication of two unsigned 32-bit integers.
*
* @module @stdlib/math/base/special/uimul
*
* @example
* var uimul = require( '@stdlib/math/base/special/uimul' );
*
* var v = uimul( 10>>>0, 4>>>0 );
* // returns 40
*/

// MODULES //

var uimul = require( './main.js' );


// EXPORTS //

module.exports = uimul;

},{"./main.js":173}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// Define a mask for the least significant 16 bits (low word): 65535 => 0x0000ffff => 00000000000000001111111111111111
var LOW_WORD_MASK = 0x0000ffff>>>0; // asm type annotation


// MAIN //

/**
* Performs C-like multiplication of two unsigned 32-bit integers.
*
* ## Method
*
* -   To emulate C-like multiplication without the aid of 64-bit integers, we recognize that a 32-bit integer can be split into two 16-bit words
*
*     ```tex
*     a = w_h*2^{16} + w_l
*     ```
*
*     where \\( w_h \\) is the most significant 16 bits and \\( w_l \\) is the least significant 16 bits. For example, consider the maximum unsigned 32-bit integer \\( 2^{32}-1 \\)
*
*     ```binarystring
*     11111111111111111111111111111111
*     ```
*
*     The 16-bit high word is then
*
*     ```binarystring
*     1111111111111111
*     ```
*
*     and the 16-bit low word
*
*     ```binarystring
*     1111111111111111
*     ```
*
*     If we cast the high word to 32-bit precision and multiply by \\( 2^{16} \\) (equivalent to a 16-bit left shift), then the bit sequence is
*
*     ```binarystring
*     11111111111111110000000000000000
*     ```
*
*     Similarly, upon casting the low word to 32-bit precision, the bit sequence is
*
*     ```binarystring
*     00000000000000001111111111111111
*     ```
*
*     From the rules of binary addition, we recognize that adding the two 32-bit values for the high and low words will return our original value \\( 2^{32}-1 \\).
*
* -   Accordingly, the multiplication of two 32-bit integers can be expressed
*
*     ```tex
*     \begin{align*}
*     a \cdot b &= ( a_h \cdot 2^{16} + a_l) \cdot ( b_h \cdot 2^{16} + b_l) \\
*           &= a_l \cdot b_l + a_h \cdot b_l \cdot 2^{16} + a_l \cdot b_h \cdot 2^{16} + (a_h \cdot b_h) \cdot 2^{32} \\
*           &= a_l \cdot b_l + (a_h \cdot b_l + a_l \cdot b_h) \cdot 2^{16} + (a_h \cdot b_h) \cdot 2^{32}
*     \end{align*}
*     ```
*
* -   We note that multiplying (dividing) an integer by \\( 2^n \\) is equivalent to performing a left (right) shift of \\( n \\) bits.
*
* -   Further, as we want to return an integer of the same precision, for a 32-bit integer, the return value will be modulo \\( 2^{32} \\). Stated another way, we only care about the low word of a 64-bit result.
*
* -   Accordingly, the last term, being evenly divisible by \\( 2^{32} \\), drops from the equation leaving the remaining two terms as the remainder.
*
*     ```tex
*     a \cdot b = a_l \cdot b_l + (a_h \cdot b_l + a_l \cdot b_h) << 16
*     ```
*
* -   Lastly, the second term in the above equation contributes to the middle bits and may cause the product to "overflow". However, we can disregard (`>>>0`) overflow bits due modulo arithmetic, as discussed earlier with regard to the term involving the partial product of high words.
*
*
* @param {uinteger32} a - integer
* @param {uinteger32} b - integer
* @returns {uinteger32} product
*
* @example
* var v = uimul( 10>>>0, 4>>>0 );
* // returns 40
*/
function uimul( a, b ) {
	var lbits;
	var mbits;
	var ha;
	var hb;
	var la;
	var lb;

	a >>>= 0; // asm type annotation
	b >>>= 0; // asm type annotation

	// Isolate the most significant 16-bits:
	ha = ( a>>>16 )>>>0; // asm type annotation
	hb = ( b>>>16 )>>>0; // asm type annotation

	// Isolate the least significant 16-bits:
	la = ( a&LOW_WORD_MASK )>>>0; // asm type annotation
	lb = ( b&LOW_WORD_MASK )>>>0; // asm type annotation

	// Compute partial sums:
	lbits = ( la*lb )>>>0; // asm type annotation; no integer overflow possible
	mbits = ( ((ha*lb) + (la*hb))<<16 )>>>0; // asm type annotation; possible integer overflow

	// The final `>>>0` converts the intermediate sum to an unsigned integer (possible integer overflow during sum):
	return ( lbits + mbits )>>>0; // asm type annotation
}


// EXPORTS //

module.exports = uimul;

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

},{"./number.js":175}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],176:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// VARIABLES //

var NUM_WARMUPS = 8;


// MAIN //

/**
* Initializes a shuffle table.
*
* @private
* @param {PRNG} rand - pseudorandom number generator
* @param {Int32Array} table - table
* @param {PositiveInteger} N - table size
* @throws {Error} PRNG returned `NaN`
* @returns {NumberArray} shuffle table
*/
function createTable( rand, table, N ) {
	var v;
	var i;

	// "warm-up" the PRNG...
	for ( i = 0; i < NUM_WARMUPS; i++ ) {
		v = rand();

		// Prevent the above loop from being discarded by the compiler...
		if ( isnan( v ) ) {
			throw new Error( 'unexpected error. PRNG returned `NaN`.' );
		}
	}
	// Initialize the shuffle table...
	for ( i = N-1; i >= 0; i-- ) {
		table[ i ] = rand();
	}
	return table;
}


// EXPORTS //

module.exports = createTable;

},{"@stdlib/math/base/assert/is-nan":149}],177:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable max-len */

'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var setReadOnlyAccessor = require( '@stdlib/utils/define-nonenumerable-read-only-accessor' );
var setReadWriteAccessor = require( '@stdlib/utils/define-nonenumerable-read-write-accessor' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isCollection = require( '@stdlib/assert/is-collection' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var isInt32Array = require( '@stdlib/assert/is-int32array' );
var gcopy = require( '@stdlib/blas/base/gcopy' );
var floor = require( '@stdlib/math/base/special/floor' );
var Int32Array = require( '@stdlib/array/int32' );
var INT32_MAX = require( '@stdlib/constants/int32/max' );
var typedarray2json = require( '@stdlib/array/to-json' );
var createTable = require( './create_table.js' );
var randint32 = require( './rand_int32.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = (INT32_MAX - 1)|0; // asm type annotation
var MAX_SEED = (INT32_MAX - 1)|0; // asm type annotation
var A = 16807|0; // asm type annotation

// Define the number of elements in the shuffle table:
var TABLE_LENGTH = 32;

// Define the state array schema version:
var STATE_ARRAY_VERSION = 1; // NOTE: anytime the state array schema changes, this value should be incremented!!!

// Define the number of sections in the state array:
var NUM_STATE_SECTIONS = 3; // table, other, seed

// Define the index offset of the "table" section in the state array:
var TABLE_SECTION_OFFSET = 2; // | version | num_sections | table_length | ...table | other_length | shuffle_state | prng_state | seed_length | ...seed |

// Define the index offset of the "state" section in the state array:
var STATE_SECTION_OFFSET = TABLE_LENGTH + 3; // | version | num_sections | table_length | ...table | state_length | shuffle_state | prng_state | seed_length | ...seed |

// Define the index offset of the seed section in the state array:
var SEED_SECTION_OFFSET = TABLE_LENGTH + 6; // | version | num_sections | table_length | ...table | state_length | shuffle_state | prng_state | seed_length | ...seed |

// Define the length of the "fixed" length portion of the state array:
var STATE_FIXED_LENGTH = TABLE_LENGTH + 7; // 1 (version) + 1 (num_sections) + 1 (table_length) + TABLE_LENGTH (table) + 1 (state_length) + 1 (shuffle_state) + 1 (prng_state) + 1 (seed_length)

// Define the indices for the shuffle table and PRNG states:
var SHUFFLE_STATE = STATE_SECTION_OFFSET + 1;
var PRNG_STATE = STATE_SECTION_OFFSET + 2;


// FUNCTIONS //

/**
* Verifies state array integrity.
*
* @private
* @param {Int32Array} state - state array
* @param {boolean} FLG - flag indicating whether the state array was provided as an option (true) or an argument (false)
* @returns {(Error|null)} an error or `null`
*/
function verifyState( state, FLG ) {
	var s1;
	if ( FLG ) {
		s1 = 'option';
	} else {
		s1 = 'argument';
	}
	// The state array must have a minimum length...
	if ( state.length < STATE_FIXED_LENGTH+1 ) {
		return new RangeError( 'invalid '+s1+'. `state` array has insufficient length.' );
	}
	// The first element of the state array must equal the supported state array schema version...
	if ( state[ 0 ] !== STATE_ARRAY_VERSION ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible schema version. Expected: '+STATE_ARRAY_VERSION+'. Actual: '+state[ 0 ]+'.' );
	}
	// The second element of the state array must contain the number of sections...
	if ( state[ 1 ] !== NUM_STATE_SECTIONS ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible number of sections. Expected: '+NUM_STATE_SECTIONS+'. Actual: '+state[ 1 ]+'.' );
	}
	// The length of the "table" section must equal `TABLE_LENGTH`...
	if ( state[ TABLE_SECTION_OFFSET ] !== TABLE_LENGTH ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible table length. Expected: '+TABLE_LENGTH+'. Actual: '+state[ TABLE_SECTION_OFFSET ]+'.' );
	}
	// The length of the "state" section must equal `2`...
	if ( state[ STATE_SECTION_OFFSET ] !== 2 ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible state length. Expected: '+(2).toString()+'. Actual: '+state[ STATE_SECTION_OFFSET ]+'.' );
	}
	// The length of the "seed" section much match the empirical length...
	if ( state[ SEED_SECTION_OFFSET ] !== state.length-STATE_FIXED_LENGTH ) {
		return new RangeError( 'invalid '+s1+'. `state` array length is incompatible with seed section length. Expected: '+(state.length-STATE_FIXED_LENGTH)+'. Actual: '+state[ SEED_SECTION_OFFSET ]+'.' );
	}
	return null;
}


// MAIN //

/**
* Returns a linear congruential pseudorandom number generator (LCG) whose output is shuffled.
*
* @param {Options} [options] - options
* @param {PRNGSeedMINSTD} [options.seed] - pseudorandom number generator seed
* @param {PRNGStateMINSTD} [options.state] - pseudorandom number generator state
* @param {boolean} [options.copy=true] - boolean indicating whether to copy a provided pseudorandom number generator state
* @throws {TypeError} options argument must be an object
* @throws {TypeError} a seed must be either a positive integer less than the maximum signed 32-bit integer or an array-like object containing integers less than the maximum signed 32-bit integer
* @throws {RangeError} a numeric seed must be a positive integer less than the maximum signed 32-bit integer
* @throws {TypeError} state must be an `Int32Array`
* @throws {Error} must provide a valid state
* @throws {TypeError} `copy` option must be a boolean
* @returns {PRNG} shuffled LCG PRNG
*
* @example
* var minstd = factory();
*
* var v = minstd();
* // returns <number>
*
* @example
* // Return a seeded LCG:
* var minstd = factory({
*     'seed': 1234
* });
*
* var v = minstd();
* // returns 1421600654
*/
function factory( options ) {
	var STATE;
	var state;
	var opts;
	var seed;
	var slen;
	var err;

	opts = {};
	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
		}
		if ( hasOwnProp( options, 'copy' ) ) {
			opts.copy = options.copy;
			if ( !isBoolean( options.copy ) ) {
				throw new TypeError( 'invalid option. `copy` option must be a boolean. Option: `' + options.copy + '`.' );
			}
		}
		if ( hasOwnProp( options, 'state' ) ) {
			state = options.state;
			opts.state = true;
			if ( !isInt32Array( state ) ) {
				throw new TypeError( 'invalid option. `state` option must be an Int32Array. Option: `' + state + '`.' );
			}
			err = verifyState( state, true );
			if ( err ) {
				throw err;
			}
			if ( opts.copy === false ) {
				STATE = state;
			} else {
				STATE = new Int32Array( state.length );
				gcopy( state.length, state, 1, STATE, 1 );
			}
			// Create a state (table) "view":
			state = new Int32Array( STATE.buffer, STATE.byteOffset+((TABLE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), TABLE_LENGTH );

			// Create a seed "view":
			seed = new Int32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), state[ SEED_SECTION_OFFSET ] );
		}
		// If provided a PRNG state, we ignore the `seed` option...
		if ( seed === void 0 ) {
			if ( hasOwnProp( options, 'seed' ) ) {
				seed = options.seed;
				opts.seed = true;
				if ( isPositiveInteger( seed ) ) {
					if ( seed > MAX_SEED ) {
						throw new RangeError( 'invalid option. `seed` option must be a positive integer less than the maximum signed 32-bit integer. Option: `' + seed + '`.' );
					}
					seed |= 0; // asm type annotation
				} else if ( isCollection( seed ) && seed.length > 0 ) {
					slen = seed.length;
					STATE = new Int32Array( STATE_FIXED_LENGTH+slen );

					// Initialize sections:
					STATE[ 0 ] = STATE_ARRAY_VERSION;
					STATE[ 1 ] = NUM_STATE_SECTIONS;
					STATE[ TABLE_SECTION_OFFSET ] = TABLE_LENGTH;
					STATE[ STATE_SECTION_OFFSET ] = 2;
					STATE[ PRNG_STATE ] = seed[ 0 ];
					STATE[ SEED_SECTION_OFFSET ] = slen;

					// Copy the provided seed array to prevent external mutation, as mutation would lead to an inability to reproduce PRNG values according to the PRNG's stated seed:
					gcopy.ndarray( slen, seed, 1, 0, STATE, 1, SEED_SECTION_OFFSET+1 );

					// Create a state (table) "view":
					state = new Int32Array( STATE.buffer, STATE.byteOffset+((TABLE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), TABLE_LENGTH );

					// Create a seed "view":
					seed = new Int32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), slen );

					// Initialize the internal PRNG state:
					state = createTable( minstd, state, TABLE_LENGTH );
					STATE[ SHUFFLE_STATE ] = state[ 0 ];
				} else {
					throw new TypeError( 'invalid option. `seed` option must be either a positive integer less than the maximum signed 32-bit integer or an array-like object containing integer values less than the maximum signed 32-bit integer. Option: `' + seed + '`.' );
				}
			} else {
				seed = randint32()|0; // asm type annotation
			}
		}
	} else {
		seed = randint32()|0; // asm type annotation
	}
	if ( state === void 0 ) {
		STATE = new Int32Array( STATE_FIXED_LENGTH+1 );

		// Initialize sections:
		STATE[ 0 ] = STATE_ARRAY_VERSION;
		STATE[ 1 ] = NUM_STATE_SECTIONS;
		STATE[ TABLE_SECTION_OFFSET ] = TABLE_LENGTH;
		STATE[ STATE_SECTION_OFFSET ] = 2;
		STATE[ PRNG_STATE ] = seed;
		STATE[ SEED_SECTION_OFFSET ] = 1;
		STATE[ SEED_SECTION_OFFSET+1 ] = seed;

		// Create a state (table) "view":
		state = new Int32Array( STATE.buffer, STATE.byteOffset+((TABLE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), TABLE_LENGTH );

		// Create a seed "view":
		seed = new Int32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), 1 );

		// Initialize the internal PRNG state:
		state = createTable( minstd, state, TABLE_LENGTH );
		STATE[ SHUFFLE_STATE ] = state[ 0 ];
	}
	setReadOnly( minstdShuffle, 'NAME', 'minstd-shuffle' );
	setReadOnlyAccessor( minstdShuffle, 'seed', getSeed );
	setReadOnlyAccessor( minstdShuffle, 'seedLength', getSeedLength );
	setReadWriteAccessor( minstdShuffle, 'state', getState, setState );
	setReadOnlyAccessor( minstdShuffle, 'stateLength', getStateLength );
	setReadOnlyAccessor( minstdShuffle, 'byteLength', getStateSize );
	setReadOnly( minstdShuffle, 'toJSON', toJSON );
	setReadOnly( minstdShuffle, 'MIN', 1 );
	setReadOnly( minstdShuffle, 'MAX', INT32_MAX-1 );
	setReadOnly( minstdShuffle, 'normalized', normalized );

	setReadOnly( normalized, 'NAME', minstdShuffle.NAME );
	setReadOnlyAccessor( normalized, 'seed', getSeed );
	setReadOnlyAccessor( normalized, 'seedLength', getSeedLength );
	setReadWriteAccessor( normalized, 'state', getState, setState );
	setReadOnlyAccessor( normalized, 'stateLength', getStateLength );
	setReadOnlyAccessor( normalized, 'byteLength', getStateSize );
	setReadOnly( normalized, 'toJSON', toJSON );
	setReadOnly( normalized, 'MIN', (minstdShuffle.MIN-1.0) / NORMALIZATION_CONSTANT );
	setReadOnly( normalized, 'MAX', (minstdShuffle.MAX-1.0) / NORMALIZATION_CONSTANT );

	return minstdShuffle;

	/**
	* Returns the PRNG seed.
	*
	* @private
	* @returns {PRNGSeedMINSTD} seed
	*/
	function getSeed() {
		var len = STATE[ SEED_SECTION_OFFSET ];
		return gcopy( len, seed, 1, new Int32Array( len ), 1 );
	}

	/**
	* Returns the PRNG seed length.
	*
	* @private
	* @returns {PositiveInteger} seed length
	*/
	function getSeedLength() {
		return STATE[ SEED_SECTION_OFFSET ];
	}

	/**
	* Returns the PRNG state length.
	*
	* @private
	* @returns {PositiveInteger} state length
	*/
	function getStateLength() {
		return STATE.length;
	}

	/**
	* Returns the PRNG state size (in bytes).
	*
	* @private
	* @returns {PositiveInteger} state size (in bytes)
	*/
	function getStateSize() {
		return STATE.byteLength;
	}

	/**
	* Returns the current PRNG state.
	*
	* ## Notes
	*
	* -   The PRNG state array is comprised of a preamble followed by `3` sections:
	*
	*     0.  preamble (version + number of sections)
	*     1.  shuffle table
	*     2.  internal PRNG state
	*     3.  PRNG seed
	*
	* -   The first element of the PRNG state array preamble is the state array schema version.
	*
	* -   The second element of the PRNG state array preamble is the number of state array sections (i.e., `3`).
	*
	* -   The first element of each section following the preamble specifies the section length. The remaining section elements comprise the section contents.
	*
	* @private
	* @returns {PRNGStateMINSTD} current state
	*/
	function getState() {
		var len = STATE.length;
		return gcopy( len, STATE, 1, new Int32Array( len ), 1 );
	}

	/**
	* Sets the PRNG state.
	*
	* ## Notes
	*
	* -   If PRNG state is "shared" (meaning a state array was provided during PRNG creation and **not** copied) and one sets the generator state to a state array having a different length, the PRNG does **not** update the existing shared state and, instead, points to the newly provided state array. In order to synchronize PRNG output according to the new shared state array, the state array for **each** relevant PRNG must be **explicitly** set.
	* -   If PRNG state is "shared" and one sets the generator state to a state array of the same length, the PRNG state is updated (along with the state of all other PRNGs sharing the PRNG's state array).
	*
	* @private
	* @param {PRNGStateMINSTD} s - generator state
	* @throws {TypeError} must provide an `Int32Array`
	* @throws {Error} must provide a valid state
	*/
	function setState( s ) {
		var err;
		if ( !isInt32Array( s ) ) {
			throw new TypeError( 'invalid argument. Must provide an Int32Array. Value: `' + s + '`.' );
		}
		err = verifyState( s, false );
		if ( err ) {
			throw err;
		}
		if ( opts.copy === false ) {
			if ( opts.state && s.length === STATE.length ) {
				gcopy( s.length, s, 1, STATE, 1 ); // update current shared state
			} else {
				STATE = s; // point to new shared state
				opts.state = true; // setting this flag allows updating a shared state even if a state array was not provided at PRNG creation
			}
		} else {
			// Check if we can reuse allocated memory...
			if ( s.length !== STATE.length ) {
				STATE = new Int32Array( s.length ); // reallocate
			}
			gcopy( s.length, s, 1, STATE, 1 );
		}
		// Create a new state (table) "view":
		state = new Int32Array( STATE.buffer, STATE.byteOffset+((TABLE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), TABLE_LENGTH );

		// Create a new seed "view":
		seed = new Int32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), STATE[ SEED_SECTION_OFFSET ] );
	}

	/**
	* Serializes the pseudorandom number generator as a JSON object.
	*
	* ## Notes
	*
	* -   `JSON.stringify()` implicitly calls this method when stringifying a PRNG.
	*
	* @private
	* @returns {Object} JSON representation
	*/
	function toJSON() {
		var out = {};
		out.type = 'PRNG';
		out.name = minstdShuffle.NAME;
		out.state = typedarray2json( STATE );
		out.params = [];
		return out;
	}

	/**
	* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
	*
	* @private
	* @returns {integer32} pseudorandom integer
	*/
	function minstd() {
		var s = STATE[ PRNG_STATE ]|0; // asm type annotation
		s = ( (A*s)%INT32_MAX )|0; // asm type annotation
		STATE[ PRNG_STATE ] = s;
		return s|0; // asm type annotation
	}

	/**
	* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
	*
	* @private
	* @returns {integer32} pseudorandom integer
	*
	* @example
	* var v = minstd();
	* // returns <number>
	*/
	function minstdShuffle() {
		var s;
		var i;

		s = STATE[ SHUFFLE_STATE ];
		i = floor( TABLE_LENGTH * (s/INT32_MAX) );

		// Pull a state from the table:
		s = state[ i ];

		// Update the PRNG state:
		STATE[ SHUFFLE_STATE ] = s;

		// Replace the pulled state:
		state[ i ] = minstd();

		return s;
	}

	/**
	* Generates a pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = normalized();
	* // returns <number>
	*/
	function normalized() {
		return (minstdShuffle()-1) / NORMALIZATION_CONSTANT;
	}
}


// EXPORTS //

module.exports = factory;

},{"./create_table.js":176,"./rand_int32.js":180,"@stdlib/array/int32":10,"@stdlib/array/to-json":17,"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-boolean":72,"@stdlib/assert/is-collection":80,"@stdlib/assert/is-int32array":90,"@stdlib/assert/is-plain-object":109,"@stdlib/assert/is-positive-integer":111,"@stdlib/blas/base/gcopy":129,"@stdlib/constants/int32/max":140,"@stdlib/math/base/special/floor":166,"@stdlib/utils/define-nonenumerable-read-only-accessor":199,"@stdlib/utils/define-nonenumerable-read-only-property":201,"@stdlib/utils/define-nonenumerable-read-write-accessor":203}],178:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) whose output is shuffled.
*
* @module @stdlib/random/base/minstd-shuffle
*
* @example
* var minstd = require( '@stdlib/random/base/minstd-shuffle' );
*
* var v = minstd();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/minstd-shuffle' ).factory;
*
* var minstd = factory({
*     'seed': 1234
* });
*
* var v = minstd();
* // returns 1421600654
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var minstd = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( minstd, 'factory', factory );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":177,"./main.js":179,"@stdlib/utils/define-nonenumerable-read-only-property":201}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var factory = require( './factory.js' );
var randint32 = require( './rand_int32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
*
* ## Method
*
* Linear congruential generators (LCGs) use the recurrence relation
*
* ```tex
* X_{n+1} = ( a \cdot X_n + c ) \operatorname{mod}(m)
* ```
*
* where the modulus \\( m \\) is a prime number or power of a prime number and \\( a \\) is a primitive root modulo \\( m \\).
*
* <!-- <note> -->
*
* For an LCG to be a Lehmer RNG, the seed \\( X_0 \\) must be coprime to \\( m \\).
*
* <!-- </note> -->
*
* In this implementation, the constants \\( a \\), \\( c \\), and \\( m \\) have the values
*
* ```tex
* \begin{align*}
* a &= 7^5 = 16807 \\
* c &= 0 \\
* m &= 2^{31} - 1 = 2147483647
* \end{align*}
* ```
*
* <!-- <note> -->
*
* The constant \\( m \\) is a Mersenne prime (modulo \\(31\\)).
*
* <!-- </note> -->
*
* <!-- <note> -->
*
* The constant \\( a \\) is a primitive root (modulo \\(31\\)).
*
* <!-- </note> -->
*
* Accordingly, the maximum possible product is
*
* ```tex
* 16807 \cdot (m - 1) \approx 2^{46}
* ```
*
* The values for \\( a \\), \\( c \\), and \\( m \\) are taken from Park and Miller, "Random Number Generators: Good Ones Are Hard To Find". Park's and Miller's article is also the basis for a recipe in the second edition of _Numerical Recipes in C_.
*
* This implementation subsequently shuffles the output of a linear congruential pseudorandom number generator (LCG) using a shuffle table in accordance with the Bays-Durham algorithm.
*
*
* ## Notes
*
* -   The generator has a period of approximately \\(2.1\mbox{e}9\\) (see [Numerical Recipes in C, 2nd Edition](#references), p. 279).
*
*
* ## References
*
* -   Bays, Carter, and S. D. Durham. 1976. "Improving a Poor Random Number Generator." _ACM Transactions on Mathematical Software_ 2 (1). New York, NY, USA: ACM: 59–64. doi:[10.1145/355666.355670](http://dx.doi.org/10.1145/355666.355670).
* -   Herzog, T.N., and G. Lord. 2002. _Applications of Monte Carlo Methods to Finance and Insurance_. ACTEX Publications. [https://books.google.com/books?id=vC7I\\\_gdX-A0C](https://books.google.com/books?id=vC7I\_gdX-A0C).
* -   Press, William H., Brian P. Flannery, Saul A. Teukolsky, and William T. Vetterling. 1992. _Numerical Recipes in C: The Art of Scientific Computing, Second Edition_. Cambridge University Press.
*
*
* @function minstd
* @type {PRNG}
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = minstd();
* // returns <number>
*/
var minstd = factory({
	'seed': randint32()
});


// EXPORTS //

module.exports = minstd;

},{"./factory.js":177,"./rand_int32.js":180}],180:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var INT32_MAX = require( '@stdlib/constants/int32/max' );
var floor = require( '@stdlib/math/base/special/floor' );


// VARIABLES //

var MAX = INT32_MAX - 1;


// MAIN //

/**
* Returns a pseudorandom integer on the interval \\([1, 2^{31}-1)\\).
*
* @private
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = randint32();
* // returns <number>
*/
function randint32() {
	var v = floor( 1.0 + (MAX*Math.random()) ); // eslint-disable-line stdlib/no-builtin-math
	return v|0; // asm type annotation
}


// EXPORTS //

module.exports = randint32;

},{"@stdlib/constants/int32/max":140,"@stdlib/math/base/special/floor":166}],181:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable max-len */

'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var setReadOnlyAccessor = require( '@stdlib/utils/define-nonenumerable-read-only-accessor' );
var setReadWriteAccessor = require( '@stdlib/utils/define-nonenumerable-read-write-accessor' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isCollection = require( '@stdlib/assert/is-collection' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var isInt32Array = require( '@stdlib/assert/is-int32array' );
var INT32_MAX = require( '@stdlib/constants/int32/max' );
var Int32Array = require( '@stdlib/array/int32' );
var gcopy = require( '@stdlib/blas/base/gcopy' );
var typedarray2json = require( '@stdlib/array/to-json' );
var randint32 = require( './rand_int32.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = (INT32_MAX - 1)|0; // asm type annotation
var MAX_SEED = (INT32_MAX - 1)|0; // asm type annotation
var A = 16807|0; // asm type annotation

// Define the state array schema version:
var STATE_ARRAY_VERSION = 1; // NOTE: anytime the state array schema changes, this value should be incremented!!!

// Define the number of sections in the state array:
var NUM_STATE_SECTIONS = 2; // state, seed

// Define the index offset of the "state" section in the state array:
var STATE_SECTION_OFFSET = 2; // | version | num_sections | state_length | ...state | seed_length | ...seed |

// Define the index offset of the seed section in the state array:
var SEED_SECTION_OFFSET = 4; // | version | num_sections | state_length | ...state | seed_length | ...seed |

// Define the length of the "fixed" length portion of the state array:
var STATE_FIXED_LENGTH = 5; // 1 (version) + 1 (num_sections) + 1 (state_length) + 1 (state) + 1 (seed_length)


// FUNCTIONS //

/**
* Verifies state array integrity.
*
* @private
* @param {Int32Array} state - state array
* @param {boolean} FLG - flag indicating whether the state array was provided as an option (true) or an argument (false)
* @returns {(Error|null)} an error or `null`
*/
function verifyState( state, FLG ) {
	var s1;
	if ( FLG ) {
		s1 = 'option';
	} else {
		s1 = 'argument';
	}
	// The state array must have a minimum length...
	if ( state.length < STATE_FIXED_LENGTH+1 ) {
		return new RangeError( 'invalid '+s1+'. `state` array has insufficient length.' );
	}
	// The first element of the state array must equal the supported state array schema version...
	if ( state[ 0 ] !== STATE_ARRAY_VERSION ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible schema version. Expected: '+STATE_ARRAY_VERSION+'. Actual: '+state[ 0 ]+'.' );
	}
	// The second element of the state array must contain the number of sections...
	if ( state[ 1 ] !== NUM_STATE_SECTIONS ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible number of sections. Expected: '+NUM_STATE_SECTIONS+'. Actual: '+state[ 1 ]+'.' );
	}
	// The length of the "state" section must equal `1`...
	if ( state[ STATE_SECTION_OFFSET ] !== 1 ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible state length. Expected: '+(1).toString()+'. Actual: '+state[ STATE_SECTION_OFFSET ]+'.' );
	}
	// The length of the "seed" section much match the empirical length...
	if ( state[ SEED_SECTION_OFFSET ] !== state.length-STATE_FIXED_LENGTH ) {
		return new RangeError( 'invalid '+s1+'. `state` array length is incompatible with seed section length. Expected: '+(state.length-STATE_FIXED_LENGTH)+'. Actual: '+state[ SEED_SECTION_OFFSET ]+'.' );
	}
	return null;
}


// MAIN //

/**
* Returns a linear congruential pseudorandom number generator (LCG) based on Park and Miller.
*
* @param {Options} [options] - options
* @param {PRNGSeedMINSTD} [options.seed] - pseudorandom number generator seed
* @param {PRNGStateMINSTD} [options.state] - pseudorandom number generator state
* @param {boolean} [options.copy=true] - boolean indicating whether to copy a provided pseudorandom number generator state
* @throws {TypeError} options argument must be an object
* @throws {TypeError} a seed must be either a positive integer less than the maximum signed 32-bit integer or an array-like object containing integers less than the maximum signed 32-bit integer
* @throws {RangeError} a numeric seed must be a positive integer less than the maximum signed 32-bit integer
* @throws {TypeError} state must be an `Int32Array`
* @throws {Error} must provide a valid state
* @throws {TypeError} `copy` option must be a boolean
* @returns {PRNG} LCG PRNG
*
* @example
* var minstd = factory();
*
* var v = minstd();
* // returns <number>
*
* @example
* // Return a seeded LCG:
* var minstd = factory({
*     'seed': 1234
* });
*
* var v = minstd();
* // returns 20739838
*/
function factory( options ) {
	var STATE;
	var state;
	var opts;
	var seed;
	var slen;
	var err;

	opts = {};
	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
		}
		if ( hasOwnProp( options, 'copy' ) ) {
			opts.copy = options.copy;
			if ( !isBoolean( options.copy ) ) {
				throw new TypeError( 'invalid option. `copy` option must be a boolean. Option: `' + options.copy + '`.' );
			}
		}
		if ( hasOwnProp( options, 'state' ) ) {
			state = options.state;
			opts.state = true;
			if ( !isInt32Array( state ) ) {
				throw new TypeError( 'invalid option. `state` option must be an Int32Array. Option: `' + state + '`.' );
			}
			err = verifyState( state, true );
			if ( err ) {
				throw err;
			}
			if ( opts.copy === false ) {
				STATE = state;
			} else {
				STATE = new Int32Array( state.length );
				gcopy( state.length, state, 1, STATE, 1 );
			}
			// Create a state "view":
			state = new Int32Array( STATE.buffer, STATE.byteOffset+((STATE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), 1 );

			// Create a seed "view":
			seed = new Int32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), state[ SEED_SECTION_OFFSET ] );
		}
		// If provided a PRNG state, we ignore the `seed` option...
		if ( seed === void 0 ) {
			if ( hasOwnProp( options, 'seed' ) ) {
				seed = options.seed;
				opts.seed = true;
				if ( isPositiveInteger( seed ) ) {
					if ( seed > MAX_SEED ) {
						throw new RangeError( 'invalid option. `seed` option must be a positive integer less than the maximum signed 32-bit integer. Option: `' + seed + '`.' );
					}
					seed |= 0; // asm type annotation
				} else if ( isCollection( seed ) && seed.length > 0 ) {
					slen = seed.length;
					STATE = new Int32Array( STATE_FIXED_LENGTH+slen );

					// Initialize sections:
					STATE[ 0 ] = STATE_ARRAY_VERSION;
					STATE[ 1 ] = NUM_STATE_SECTIONS;
					STATE[ STATE_SECTION_OFFSET ] = 1;
					STATE[ SEED_SECTION_OFFSET ] = slen;

					// Copy the provided seed array to prevent external mutation, as mutation would lead to an inability to reproduce PRNG values according to the PRNG's stated seed:
					gcopy.ndarray( slen, seed, 1, 0, STATE, 1, SEED_SECTION_OFFSET+1 );

					// Create a state "view":
					state = new Int32Array( STATE.buffer, STATE.byteOffset+((STATE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), 1 );

					// Create a seed "view":
					seed = new Int32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), slen );

					// Initialize the internal PRNG state:
					state[ 0 ] = seed[ 0 ];
				} else {
					throw new TypeError( 'invalid option. `seed` option must be either a positive integer less than the maximum signed 32-bit integer or an array-like object containing integer values less than the maximum signed 32-bit integer. Option: `' + seed + '`.' );
				}
			} else {
				seed = randint32()|0; // asm type annotation
			}
		}
	} else {
		seed = randint32()|0; // asm type annotation
	}
	if ( state === void 0 ) {
		STATE = new Int32Array( STATE_FIXED_LENGTH+1 );

		// Initialize sections:
		STATE[ 0 ] = STATE_ARRAY_VERSION;
		STATE[ 1 ] = NUM_STATE_SECTIONS;
		STATE[ STATE_SECTION_OFFSET ] = 1;
		STATE[ SEED_SECTION_OFFSET ] = 1;
		STATE[ SEED_SECTION_OFFSET+1 ] = seed;

		// Create a state "view":
		state = new Int32Array( STATE.buffer, STATE.byteOffset+((STATE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), 1 );

		// Create a seed "view":
		seed = new Int32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), 1 );

		// Initialize the internal PRNG state:
		state[ 0 ] = seed[ 0 ];
	}
	setReadOnly( minstd, 'NAME', 'minstd' );
	setReadOnlyAccessor( minstd, 'seed', getSeed );
	setReadOnlyAccessor( minstd, 'seedLength', getSeedLength );
	setReadWriteAccessor( minstd, 'state', getState, setState );
	setReadOnlyAccessor( minstd, 'stateLength', getStateLength );
	setReadOnlyAccessor( minstd, 'byteLength', getStateSize );
	setReadOnly( minstd, 'toJSON', toJSON );
	setReadOnly( minstd, 'MIN', 1 );
	setReadOnly( minstd, 'MAX', INT32_MAX-1 );
	setReadOnly( minstd, 'normalized', normalized );

	setReadOnly( normalized, 'NAME', minstd.NAME );
	setReadOnlyAccessor( normalized, 'seed', getSeed );
	setReadOnlyAccessor( normalized, 'seedLength', getSeedLength );
	setReadWriteAccessor( normalized, 'state', getState, setState );
	setReadOnlyAccessor( normalized, 'stateLength', getStateLength );
	setReadOnlyAccessor( normalized, 'byteLength', getStateSize );
	setReadOnly( normalized, 'toJSON', toJSON );
	setReadOnly( normalized, 'MIN', (minstd.MIN-1.0) / NORMALIZATION_CONSTANT );
	setReadOnly( normalized, 'MAX', (minstd.MAX-1.0) / NORMALIZATION_CONSTANT );

	return minstd;

	/**
	* Returns the PRNG seed.
	*
	* @private
	* @returns {PRNGSeedMINSTD} seed
	*/
	function getSeed() {
		var len = STATE[ SEED_SECTION_OFFSET ];
		return gcopy( len, seed, 1, new Int32Array( len ), 1 );
	}

	/**
	* Returns the PRNG seed length.
	*
	* @private
	* @returns {PositiveInteger} seed length
	*/
	function getSeedLength() {
		return STATE[ SEED_SECTION_OFFSET ];
	}

	/**
	* Returns the PRNG state length.
	*
	* @private
	* @returns {PositiveInteger} state length
	*/
	function getStateLength() {
		return STATE.length;
	}

	/**
	* Returns the PRNG state size (in bytes).
	*
	* @private
	* @returns {PositiveInteger} state size (in bytes)
	*/
	function getStateSize() {
		return STATE.byteLength;
	}

	/**
	* Returns the current PRNG state.
	*
	* ## Notes
	*
	* -   The PRNG state array is comprised of a preamble followed by `2` sections:
	*
	*     0.  preamble (version + number of sections)
	*     1.  internal PRNG state
	*     2.  PRNG seed
	*
	* -   The first element of the PRNG state array preamble is the state array schema version.
	*
	* -   The second element of the PRNG state array preamble is the number of state array sections (i.e., `2`).
	*
	* -   The first element of each section following the preamble specifies the section length. The remaining section elements comprise the section contents.
	*
	* @private
	* @returns {PRNGStateMINSTD} current state
	*/
	function getState() {
		var len = STATE.length;
		return gcopy( len, STATE, 1, new Int32Array( len ), 1 );
	}

	/**
	* Sets the PRNG state.
	*
	* ## Notes
	*
	* -   If PRNG state is "shared" (meaning a state array was provided during PRNG creation and **not** copied) and one sets the generator state to a state array having a different length, the PRNG does **not** update the existing shared state and, instead, points to the newly provided state array. In order to synchronize PRNG output according to the new shared state array, the state array for **each** relevant PRNG must be **explicitly** set.
	* -   If PRNG state is "shared" and one sets the generator state to a state array of the same length, the PRNG state is updated (along with the state of all other PRNGs sharing the PRNG's state array).
	*
	* @private
	* @param {PRNGStateMINSTD} s - generator state
	* @throws {TypeError} must provide an `Int32Array`
	* @throws {Error} must provide a valid state
	*/
	function setState( s ) {
		var err;
		if ( !isInt32Array( s ) ) {
			throw new TypeError( 'invalid argument. Must provide an Int32Array. Value: `' + s + '`.' );
		}
		err = verifyState( s, false );
		if ( err ) {
			throw err;
		}
		if ( opts.copy === false ) {
			if ( opts.state && s.length === STATE.length ) {
				gcopy( s.length, s, 1, STATE, 1 ); // update current shared state
			} else {
				STATE = s; // point to new shared state
				opts.state = true; // setting this flag allows updating a shared state even if a state array was not provided at PRNG creation
			}
		} else {
			// Check if we can reuse allocated memory...
			if ( s.length !== STATE.length ) {
				STATE = new Int32Array( s.length ); // reallocate
			}
			gcopy( s.length, s, 1, STATE, 1 );
		}
		// Create a new state "view":
		state = new Int32Array( STATE.buffer, STATE.byteOffset+((STATE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), 1 );

		// Create a new seed "view":
		seed = new Int32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), STATE[ SEED_SECTION_OFFSET ] );
	}

	/**
	* Serializes the pseudorandom number generator as a JSON object.
	*
	* ## Notes
	*
	* -   `JSON.stringify()` implicitly calls this method when stringifying a PRNG.
	*
	* @private
	* @returns {Object} JSON representation
	*/
	function toJSON() {
		var out = {};
		out.type = 'PRNG';
		out.name = minstd.NAME;
		out.state = typedarray2json( STATE );
		out.params = [];
		return out;
	}

	/**
	* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
	*
	* @private
	* @returns {integer32} pseudorandom integer
	*/
	function minstd() {
		var s = state[ 0 ]|0; // asm type annotation
		s = ( (A*s)%INT32_MAX )|0; // asm type annotation
		state[ 0 ] = s;
		return s|0; // asm type annotation
	}

	/**
	* Generates a pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*/
	function normalized() {
		return (minstd()-1) / NORMALIZATION_CONSTANT;
	}
}


// EXPORTS //

module.exports = factory;

},{"./rand_int32.js":184,"@stdlib/array/int32":10,"@stdlib/array/to-json":17,"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-boolean":72,"@stdlib/assert/is-collection":80,"@stdlib/assert/is-int32array":90,"@stdlib/assert/is-plain-object":109,"@stdlib/assert/is-positive-integer":111,"@stdlib/blas/base/gcopy":129,"@stdlib/constants/int32/max":140,"@stdlib/utils/define-nonenumerable-read-only-accessor":199,"@stdlib/utils/define-nonenumerable-read-only-property":201,"@stdlib/utils/define-nonenumerable-read-write-accessor":203}],182:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) based on Park and Miller.
*
* @module @stdlib/random/base/minstd
*
* @example
* var minstd = require( '@stdlib/random/base/minstd' );
*
* var v = minstd();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/minstd' ).factory;
*
* var minstd = factory({
*     'seed': 1234
* });
*
* var v = minstd();
* // returns 20739838
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var minstd = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( minstd, 'factory', factory );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":181,"./main.js":183,"@stdlib/utils/define-nonenumerable-read-only-property":201}],183:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var factory = require( './factory.js' );
var randint32 = require( './rand_int32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
*
* ## Method
*
* Linear congruential generators (LCGs) use the recurrence relation
*
* ```tex
* X_{n+1} = ( a \cdot X_n + c ) \operatorname{mod}(m)
* ```
*
* where the modulus \\( m \\) is a prime number or power of a prime number and \\( a \\) is a primitive root modulo \\( m \\).
*
* <!-- <note> -->
*
* For an LCG to be a Lehmer RNG, the seed \\( X_0 \\) must be coprime to \\( m \\).
*
* <!-- </note> -->
*
* In this implementation, the constants \\( a \\), \\( c \\), and \\( m \\) have the values
*
* ```tex
* \begin{align*}
* a &= 7^5 = 16807 \\
* c &= 0 \\
* m &= 2^{31} - 1 = 2147483647
* \end{align*}
* ```
*
* <!-- <note> -->
*
* The constant \\( m \\) is a Mersenne prime (modulo \\(31\\)).
*
* <!-- </note> -->
*
* <!-- <note> -->
*
* The constant \\( a \\) is a primitive root (modulo \\(31\\)).
*
* <!-- </note> -->
*
* Accordingly, the maximum possible product is
*
* ```tex
* 16807 \cdot (m - 1) \approx 2^{46}
* ```
*
* The values for \\( a \\), \\( c \\), and \\( m \\) are taken from Park and Miller, "Random Number Generators: Good Ones Are Hard To Find". Park's and Miller's article is also the basis for a recipe in the second edition of _Numerical Recipes in C_.
*
*
* ## Notes
*
* -   The generator has a period of approximately \\(2.1\mbox{e}9\\) (see [Numerical Recipes in C, 2nd Edition](#references), p. 279).
*
*
* ## References
*
* -   Park, S. K., and K. W. Miller. 1988. "Random Number Generators: Good Ones Are Hard to Find." _Communications of the ACM_ 31 (10). New York, NY, USA: ACM: 1192–1201. doi:[10.1145/63039.63042](http://dx.doi.org/10.1145/63039.63042).
* -   Press, William H., Brian P. Flannery, Saul A. Teukolsky, and William T. Vetterling. 1992. _Numerical Recipes in C: The Art of Scientific Computing, Second Edition_. Cambridge University Press.
*
*
* @function minstd
* @type {PRNG}
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = minstd();
* // returns <number>
*/
var minstd = factory({
	'seed': randint32()
});


// EXPORTS //

module.exports = minstd;

},{"./factory.js":181,"./rand_int32.js":184}],184:[function(require,module,exports){
arguments[4][180][0].apply(exports,arguments)
},{"@stdlib/constants/int32/max":140,"@stdlib/math/base/special/floor":166,"dup":180}],185:[function(require,module,exports){
/* eslint-disable max-lines, max-len */

/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The original C code and copyright notice are from the [source implementation]{@link http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/MT2002/CODES/mt19937ar.c}. The implementation has been modified for JavaScript.
*
* ```text
* Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions
* are met:
*
*   1. Redistributions of source code must retain the above copyright
*      notice, this list of conditions and the following disclaimer.
*
*   2. Redistributions in binary form must reproduce the above copyright
*      notice, this list of conditions and the following disclaimer in the
*      documentation and/or other materials provided with the distribution.
*
*   3. The names of its contributors may not be used to endorse or promote
*      products derived from this software without specific prior written
*      permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
* A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
* CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
* EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
* PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
* PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
* LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
* NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* ```
*/

'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var setReadOnlyAccessor = require( '@stdlib/utils/define-nonenumerable-read-only-accessor' );
var setReadWriteAccessor = require( '@stdlib/utils/define-nonenumerable-read-write-accessor' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var isCollection = require( '@stdlib/assert/is-collection' );
var isUint32Array = require( '@stdlib/assert/is-uint32array' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );
var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
var Uint32Array = require( '@stdlib/array/uint32' );
var max = require( '@stdlib/math/base/special/max' );
var uimul = require( '@stdlib/math/base/special/uimul' );
var gcopy = require( '@stdlib/blas/base/gcopy' );
var typedarray2json = require( '@stdlib/array/to-json' );
var randuint32 = require( './rand_uint32.js' );


// VARIABLES //

// Define the size of the state array (see refs):
var N = 624;

// Define a (magic) constant used for indexing into the state array:
var M = 397;

// Define the maximum seed: 11111111111111111111111111111111
var MAX_SEED = UINT32_MAX >>> 0; // asm type annotation

// For seed arrays, define an initial state (magic) constant: 19650218 => 00000001001010111101011010101010
var SEED_ARRAY_INIT_STATE = 19650218 >>> 0; // asm type annotation

// Define a mask for the most significant `w-r` bits, where `w` is the word size (32 bits) and `r` is the separation point of one word (see refs): 2147483648 => 0x80000000 => 10000000000000000000000000000000
var UPPER_MASK = 0x80000000 >>> 0; // asm type annotation

// Define a mask for the least significant `r` bits (see refs): 2147483647 => 0x7fffffff => 01111111111111111111111111111111
var LOWER_MASK = 0x7fffffff >>> 0; // asm type annotation

// Define a multiplier (see Knuth TAOCP Vol2. 3rd Ed. P.106): 1812433253 => 01101100000001111000100101100101
var KNUTH_MULTIPLIER = 1812433253 >>> 0; // asm type annotation

// Define a (magic) multiplier: 1664525 => 00000000000110010110011000001101
var MAGIC_MULTIPLIER_1 = 1664525 >>> 0; // asm type annotation

// Define a (magic) multiplier: 1566083941 => 01011101010110001000101101100101
var MAGIC_MULTIPLIER_2 = 1566083941 >>> 0; // asm type annotation

// Define a tempering coefficient: 2636928640 => 0x9d2c5680 => 10011101001011000101011010000000
var TEMPERING_COEFFICIENT_1 = 0x9d2c5680 >>> 0; // asm type annotation

// Define a tempering coefficient: 4022730752 => 0xefc60000 => 11101111110001100000000000000000
var TEMPERING_COEFFICIENT_2 = 0xefc60000 >>> 0; // asm type annotation

// Define a constant vector `a` (see refs): 2567483615 => 0x9908b0df => 10011001000010001011000011011111
var MATRIX_A = 0x9908b0df >>> 0; // asm type annotation

// MAG01[x] = x * MATRIX_A; for x = {0,1}
var MAG01 = [ 0x0 >>> 0, MATRIX_A >>> 0 ]; // asm type annotation

// Define a normalization constant when generating double-precision floating-point numbers: 2^53 => 9007199254740992
var FLOAT64_NORMALIZATION_CONSTANT = 1.0 / ( FLOAT64_MAX_SAFE_INTEGER+1.0 ); // eslint-disable-line id-length

// 2^26: 67108864
var TWO_26 = 67108864 >>> 0; // asm type annotation

// 2^32: 2147483648 => 0x80000000 => 10000000000000000000000000000000
var TWO_32 = 0x80000000 >>> 0; // asm type annotation

// 1 (as a 32-bit unsigned integer): 1 => 0x1 => 00000000000000000000000000000001
var ONE = 0x1 >>> 0; // asm type annotation

// Define the maximum normalized pseudorandom double-precision floating-point number: ( (((2^32-1)>>>5)*2^26)+( (2^32-1)>>>6) ) / 2^53
var MAX_NORMALIZED = FLOAT64_MAX_SAFE_INTEGER * FLOAT64_NORMALIZATION_CONSTANT;

// Define the state array schema version:
var STATE_ARRAY_VERSION = 1; // NOTE: anytime the state array schema changes, this value should be incremented!!!

// Define the number of sections in the state array:
var NUM_STATE_SECTIONS = 3; // state, other, seed

// Define the index offset of the "state" section in the state array:
var STATE_SECTION_OFFSET = 2; // | version | num_sections | state_length | ...state | other_length | state_index | seed_length | ...seed |

// Define the index offset of the "other" section in the state array:
var OTHER_SECTION_OFFSET = N + 3; // | version | num_sections | state_length | ...state | other_length | state_index | seed_length | ...seed |

// Define the index offset of the seed section in the state array:
var SEED_SECTION_OFFSET = N + 5; // | version | num_sections | state_length | ...state | other_length | state_index | seed_length | ...seed |

// Define the length of the "fixed" length portion of the state array:
var STATE_FIXED_LENGTH = N + 6; // 1 (version) + 1 (num_sections) + 1 (state_length) + N (state) + 1 (other_length) + 1 (state_index) + 1 (seed_length)


// FUNCTIONS //

/**
* Verifies state array integrity.
*
* @private
* @param {Uint32Array} state - state array
* @param {boolean} FLG - flag indicating whether the state array was provided as an option (true) or an argument (false)
* @returns {(Error|null)} an error or `null`
*/
function verifyState( state, FLG ) {
	var s1;
	if ( FLG ) {
		s1 = 'option';
	} else {
		s1 = 'argument';
	}
	// The state array must have a minimum length...
	if ( state.length < STATE_FIXED_LENGTH+1 ) {
		return new RangeError( 'invalid '+s1+'. `state` array has insufficient length.' );
	}
	// The first element of the state array must equal the supported state array schema version...
	if ( state[ 0 ] !== STATE_ARRAY_VERSION ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible schema version. Expected: '+STATE_ARRAY_VERSION+'. Actual: '+state[ 0 ]+'.' );
	}
	// The second element of the state array must contain the number of sections...
	if ( state[ 1 ] !== NUM_STATE_SECTIONS ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible number of sections. Expected: '+NUM_STATE_SECTIONS+'. Actual: '+state[ 1 ]+'.' );
	}
	// The length of the "state" section must equal `N`...
	if ( state[ STATE_SECTION_OFFSET ] !== N ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible state length. Expected: '+N+'. Actual: '+state[ STATE_SECTION_OFFSET ]+'.' );
	}
	// The length of the "other" section must equal `1`...
	if ( state[ OTHER_SECTION_OFFSET ] !== 1 ) {
		return new RangeError( 'invalid '+s1+'. `state` array has an incompatible section length. Expected: '+(1).toString()+'. Actual: '+state[ OTHER_SECTION_OFFSET ]+'.' );
	}
	// The length of the "seed" section much match the empirical length...
	if ( state[ SEED_SECTION_OFFSET ] !== state.length-STATE_FIXED_LENGTH ) {
		return new RangeError( 'invalid '+s1+'. `state` array length is incompatible with seed section length. Expected: '+(state.length-STATE_FIXED_LENGTH)+'. Actual: '+state[ SEED_SECTION_OFFSET ]+'.' );
	}
	return null;
}

/**
* Returns an initial PRNG state.
*
* @private
* @param {Uint32Array} state - state array
* @param {PositiveInteger} N - state size
* @param {uinteger32} s - seed
* @returns {Uint32Array} state array
*/
function createState( state, N, s ) {
	var i;

	// Set the first element of the state array to the provided seed:
	state[ 0 ] = s >>> 0; // equivalent to `s & 0xffffffffUL` in original C implementation

	// Initialize the remaining state array elements:
	for ( i = 1; i < N; i++ ) {
		/*
		* In the original C implementation (see `init_genrand()`),
		*
		* ```c
		* mt[i] = (KNUTH_MULTIPLIER * (mt[i-1] ^ (mt[i-1] >> 30)) + i)
		* ```
		*
		* In order to replicate this in JavaScript, we must emulate C-like multiplication of unsigned 32-bit integers.
		*/
		s = state[ i-1 ]>>>0; // asm type annotation
		s = ( s^(s>>>30) )>>>0; // asm type annotation
		state[ i ] = ( uimul( s, KNUTH_MULTIPLIER ) + i )>>>0; // asm type annotation
	}
	return state;
}

/**
* Initializes a PRNG state array according to a seed array.
*
* @private
* @param {Uint32Array} state - state array
* @param {NonNegativeInteger} N - state array length
* @param {Collection} seed - seed array
* @param {NonNegativeInteger} M - seed array length
* @returns {Uint32Array} state array
*/
function initState( state, N, seed, M ) {
	var s;
	var i;
	var j;
	var k;

	i = 1;
	j = 0;
	for ( k = max( N, M ); k > 0; k-- ) {
		/*
		* In the original C implementation (see `init_by_array()`),
		*
		* ```c
		* mt[i] = (mt[i]^((mt[i-1]^(mt[i-1]>>30))*1664525UL)) + seed[j] + j;
		* ```
		*
		* In order to replicate this in JavaScript, we must emulate C-like multiplication of unsigned 32-bit integers.
		*/
		s = state[ i-1 ]>>>0; // asm type annotation
		s = ( s^(s>>>30) )>>>0; // asm type annotation
		s = ( uimul( s, MAGIC_MULTIPLIER_1 ) )>>>0; // asm type annotation
		state[ i ] = ( ((state[i]>>>0)^s) + seed[j] + j )>>>0; /* non-linear */ // asm type annotation

		i += 1;
		j += 1;
		if ( i >= N ) {
			state[ 0 ] = state[ N-1 ];
			i = 1;
		}
		if ( j >= M ) {
			j = 0;
		}
	}
	for ( k = N-1; k > 0; k-- ) {
		/*
		* In the original C implementation (see `init_by_array()`),
		*
		* ```c
		* mt[i] = (mt[i]^((mt[i-1]^(mt[i-1]>>30))*1566083941UL)) - i;
		* ```
		*
		* In order to replicate this in JavaScript, we must emulate C-like multiplication of unsigned 32-bit integers.
		*/
		s = state[ i-1 ]>>>0; // asm type annotation
		s = ( s^(s>>>30) )>>>0; // asm type annotation
		s = ( uimul( s, MAGIC_MULTIPLIER_2 ) )>>>0; // asm type annotation
		state[ i ] = ( ((state[i]>>>0)^s) - i )>>>0; /* non-linear */ // asm type annotation

		i += 1;
		if ( i >= N ) {
			state[ 0 ] = state[ N-1 ];
			i = 1;
		}
	}
	// Ensure a non-zero initial state array:
	state[ 0 ] = TWO_32; // MSB (most significant bit) is 1

	return state;
}

/**
* Updates a PRNG's internal state by generating the next `N` words.
*
* @private
* @param {Uint32Array} state - state array
* @returns {Uint32Array} state array
*/
function twist( state ) {
	var w;
	var i;
	var j;
	var k;

	k = N - M;
	for ( i = 0; i < k; i++ ) {
		w = ( state[i]&UPPER_MASK ) | ( state[i+1]&LOWER_MASK );
		state[ i ] = state[ i+M ] ^ ( w>>>1 ) ^ MAG01[ w&ONE ];
	}
	j = N - 1;
	for ( ; i < j; i++ ) {
		w = ( state[i]&UPPER_MASK ) | ( state[i+1]&LOWER_MASK );
		state[ i ] = state[ i-k ] ^ ( w>>>1 ) ^ MAG01[ w&ONE ];
	}
	w = ( state[j]&UPPER_MASK ) | ( state[0]&LOWER_MASK );
	state[ j ] = state[ M-1 ] ^ ( w>>>1 ) ^ MAG01[ w&ONE ];
	return state;
}


// MAIN //

/**
* Returns a 32-bit Mersenne Twister pseudorandom number generator.
*
* ## Notes
*
* -   In contrast to the original C implementation, array seeds of length `1` are considered integer seeds. This ensures that the seed `[ 1234 ]` generates the same output as the seed `1234`. In the original C implementation, the two seeds would yield different output, which is **not** obvious from a user perspective.
*
* @param {Options} [options] - options
* @param {PRNGSeedMT19937} [options.seed] - pseudorandom number generator seed
* @param {PRNGStateMT19937} [options.state] - pseudorandom number generator state
* @param {boolean} [options.copy=true] - boolean indicating whether to copy a provided pseudorandom number generator state
* @throws {TypeError} options argument must be an object
* @throws {TypeError} a seed must be either a positive integer less than or equal to the maximum unsigned 32-bit integer or an array-like object containing integers less than or equal to the maximum unsigned 32-bit integer
* @throws {RangeError} a numeric seed must be a positive integer less than or equal to the maximum unsigned 32-bit integer
* @throws {TypeError} state must be a `Uint32Array`
* @throws {Error} must provide a valid state
* @throws {TypeError} `copy` option must be a boolean
* @returns {PRNG} Mersenne Twister PRNG
*
* @example
* var mt19937 = factory();
*
* var v = mt19937();
* // returns <number>
*
* @example
* // Return a seeded Mersenne Twister PRNG:
* var mt19937 = factory({
*     'seed': 1234
* });
*
* var v = mt19937();
* // returns 822569775
*/
function factory( options ) {
	var STATE;
	var state;
	var opts;
	var seed;
	var slen;
	var err;

	opts = {};
	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
		}
		if ( hasOwnProp( options, 'copy' ) ) {
			opts.copy = options.copy;
			if ( !isBoolean( options.copy ) ) {
				throw new TypeError( 'invalid option. `copy` option must be a boolean. Option: `' + options.copy + '`.' );
			}
		}
		if ( hasOwnProp( options, 'state' ) ) {
			state = options.state;
			opts.state = true;
			if ( !isUint32Array( state ) ) {
				throw new TypeError( 'invalid option. `state` option must be a Uint32Array. Option: `' + state + '`.' );
			}
			err = verifyState( state, true );
			if ( err ) {
				throw err;
			}
			if ( opts.copy === false ) {
				STATE = state;
			} else {
				STATE = new Uint32Array( state.length );
				gcopy( state.length, state, 1, STATE, 1 );
			}
			// Create a state "view":
			state = new Uint32Array( STATE.buffer, STATE.byteOffset+((STATE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), N );

			// Create a seed "view":
			seed = new Uint32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), state[ SEED_SECTION_OFFSET ] );
		}
		// If provided a PRNG state, we ignore the `seed` option...
		if ( seed === void 0 ) {
			if ( hasOwnProp( options, 'seed' ) ) {
				seed = options.seed;
				opts.seed = true;
				if ( isPositiveInteger( seed ) ) {
					if ( seed > MAX_SEED ) {
						throw new RangeError( 'invalid option. `seed` option must be a positive integer less than or equal to the maximum unsigned 32-bit integer. Option: `' + seed + '`.' );
					}
					seed >>>= 0; // asm type annotation
				} else if ( isCollection( seed ) === false || seed.length < 1 ) {
					throw new TypeError( 'invalid option. `seed` option must be either a positive integer less than or equal to the maximum unsigned 32-bit integer or an array-like object containing integer values less than or equal to the maximum unsigned 32-bit integer. Option: `' + seed + '`.' );
				} else if ( seed.length === 1 ) {
					seed = seed[ 0 ];
					if ( !isPositiveInteger( seed ) ) {
						throw new TypeError( 'invalid option. `seed` option must be either a positive integer less than or equal to the maximum unsigned 32-bit integer or an array-like object containing integer values less than or equal to the maximum unsigned 32-bit integer. Option: `' + seed + '`.' );
					}
					if ( seed > MAX_SEED ) {
						throw new RangeError( 'invalid option. `seed` option must be either a positive integer less than or equal to the maximum unsigned 32-bit integer or an array-like object containing integer values less than or equal to the maximum unsigned 32-bit integer. Option: `' + seed + '`.' );
					}
					seed >>>= 0; // asm type annotation
				} else {
					slen = seed.length;
					STATE = new Uint32Array( STATE_FIXED_LENGTH+slen );

					// Initialize sections:
					STATE[ 0 ] = STATE_ARRAY_VERSION;
					STATE[ 1 ] = NUM_STATE_SECTIONS;
					STATE[ STATE_SECTION_OFFSET ] = N;
					STATE[ OTHER_SECTION_OFFSET ] = 1;
					STATE[ OTHER_SECTION_OFFSET+1 ] = N; // state index
					STATE[ SEED_SECTION_OFFSET ] = slen;

					// Copy the provided seed array to prevent external mutation, as mutation would lead to an inability to reproduce PRNG values according to the PRNG's stated seed:
					gcopy.ndarray( slen, seed, 1, 0, STATE, 1, SEED_SECTION_OFFSET+1 );

					// Create a state "view":
					state = new Uint32Array( STATE.buffer, STATE.byteOffset+((STATE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), N );

					// Create a seed "view":
					seed = new Uint32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), slen );

					// Initialize the internal PRNG state:
					state = createState( state, N, SEED_ARRAY_INIT_STATE );
					state = initState( state, N, seed, slen );
				}
			} else {
				seed = randuint32() >>> 0; // asm type annotation
			}
		}
	} else {
		seed = randuint32() >>> 0; // asm type annotation
	}
	if ( state === void 0 ) {
		STATE = new Uint32Array( STATE_FIXED_LENGTH+1 );

		// Initialize sections:
		STATE[ 0 ] = STATE_ARRAY_VERSION;
		STATE[ 1 ] = NUM_STATE_SECTIONS;
		STATE[ STATE_SECTION_OFFSET ] = N;
		STATE[ OTHER_SECTION_OFFSET ] = 1;
		STATE[ OTHER_SECTION_OFFSET+1 ] = N; // state index
		STATE[ SEED_SECTION_OFFSET ] = 1;
		STATE[ SEED_SECTION_OFFSET+1 ] = seed;

		// Create a state "view":
		state = new Uint32Array( STATE.buffer, STATE.byteOffset+((STATE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), N );

		// Create a seed "view":
		seed = new Uint32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), 1 );

		// Initialize the internal PRNG state:
		state = createState( state, N, seed );
	}
	// Note: property order matters in order to maintain consistency of PRNG "shape" (hidden classes).
	setReadOnly( mt19937, 'NAME', 'mt19937' );
	setReadOnlyAccessor( mt19937, 'seed', getSeed );
	setReadOnlyAccessor( mt19937, 'seedLength', getSeedLength );
	setReadWriteAccessor( mt19937, 'state', getState, setState );
	setReadOnlyAccessor( mt19937, 'stateLength', getStateLength );
	setReadOnlyAccessor( mt19937, 'byteLength', getStateSize );
	setReadOnly( mt19937, 'toJSON', toJSON );
	setReadOnly( mt19937, 'MIN', 1 );
	setReadOnly( mt19937, 'MAX', UINT32_MAX );
	setReadOnly( mt19937, 'normalized', normalized );

	setReadOnly( normalized, 'NAME', mt19937.NAME );
	setReadOnlyAccessor( normalized, 'seed', getSeed );
	setReadOnlyAccessor( normalized, 'seedLength', getSeedLength );
	setReadWriteAccessor( normalized, 'state', getState, setState );
	setReadOnlyAccessor( normalized, 'stateLength', getStateLength );
	setReadOnlyAccessor( normalized, 'byteLength', getStateSize );
	setReadOnly( normalized, 'toJSON', toJSON );
	setReadOnly( normalized, 'MIN', 0.0 );
	setReadOnly( normalized, 'MAX', MAX_NORMALIZED );

	return mt19937;

	/**
	* Returns the PRNG seed.
	*
	* @private
	* @returns {PRNGSeedMT19937} seed
	*/
	function getSeed() {
		var len = STATE[ SEED_SECTION_OFFSET ];
		return gcopy( len, seed, 1, new Uint32Array( len ), 1 );
	}

	/**
	* Returns the PRNG seed length.
	*
	* @private
	* @returns {PositiveInteger} seed length
	*/
	function getSeedLength() {
		return STATE[ SEED_SECTION_OFFSET ];
	}

	/**
	* Returns the PRNG state length.
	*
	* @private
	* @returns {PositiveInteger} state length
	*/
	function getStateLength() {
		return STATE.length;
	}

	/**
	* Returns the PRNG state size (in bytes).
	*
	* @private
	* @returns {PositiveInteger} state size (in bytes)
	*/
	function getStateSize() {
		return STATE.byteLength;
	}

	/**
	* Returns the current PRNG state.
	*
	* ## Notes
	*
	* -   The PRNG state array is comprised of a preamble followed by `3` sections:
	*
	*     0.  preamble (version + number of sections)
	*     1.  internal PRNG state
	*     2.  auxiliary state information
	*     3.  PRNG seed
	*
	* -   The first element of the PRNG state array preamble is the state array schema version.
	*
	* -   The second element of the PRNG state array preamble is the number of state array sections (i.e., `3`).
	*
	* -   The first element of each section following the preamble specifies the section length. The remaining section elements comprise the section contents.
	*
	* @private
	* @returns {PRNGStateMT19937} current state
	*/
	function getState() {
		var len = STATE.length;
		return gcopy( len, STATE, 1, new Uint32Array( len ), 1 );
	}

	/**
	* Sets the PRNG state.
	*
	* ## Notes
	*
	* -   If PRNG state is "shared" (meaning a state array was provided during PRNG creation and **not** copied) and one sets the generator state to a state array having a different length, the PRNG does **not** update the existing shared state and, instead, points to the newly provided state array. In order to synchronize PRNG output according to the new shared state array, the state array for **each** relevant PRNG must be **explicitly** set.
	* -   If PRNG state is "shared" and one sets the generator state to a state array of the same length, the PRNG state is updated (along with the state of all other PRNGs sharing the PRNG's state array).
	*
	* @private
	* @param {PRNGStateMT19937} s - generator state
	* @throws {TypeError} must provide a `Uint32Array`
	* @throws {Error} must provide a valid state
	*/
	function setState( s ) {
		var err;
		if ( !isUint32Array( s ) ) {
			throw new TypeError( 'invalid argument. Must provide a Uint32Array. Value: `' + s + '`.' );
		}
		err = verifyState( s, false );
		if ( err ) {
			throw err;
		}
		if ( opts.copy === false ) {
			if ( opts.state && s.length === STATE.length ) {
				gcopy( s.length, s, 1, STATE, 1 ); // update current shared state
			} else {
				STATE = s; // point to new shared state
				opts.state = true; // setting this flag allows updating a shared state even if a state array was not provided at PRNG creation
			}
		} else {
			// Check if we can reuse allocated memory...
			if ( s.length !== STATE.length ) {
				STATE = new Uint32Array( s.length ); // reallocate
			}
			gcopy( s.length, s, 1, STATE, 1 );
		}
		// Create a new state "view":
		state = new Uint32Array( STATE.buffer, STATE.byteOffset+((STATE_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), N );

		// Create a new seed "view":
		seed = new Uint32Array( STATE.buffer, STATE.byteOffset+((SEED_SECTION_OFFSET+1)*STATE.BYTES_PER_ELEMENT), STATE[ SEED_SECTION_OFFSET ] );
	}

	/**
	* Serializes the pseudorandom number generator as a JSON object.
	*
	* ## Notes
	*
	* -   `JSON.stringify()` implicitly calls this method when stringifying a PRNG.
	*
	* @private
	* @returns {Object} JSON representation
	*/
	function toJSON() {
		var out = {};
		out.type = 'PRNG';
		out.name = mt19937.NAME;
		out.state = typedarray2json( STATE );
		out.params = [];
		return out;
	}

	/**
	* Generates a pseudorandom integer on the interval \\( [1,2^{32}-1) \\).
	*
	* @private
	* @returns {uinteger32} pseudorandom integer
	*
	* @example
	* var r = mt19937();
	* // returns <number>
	*/
	function mt19937() {
		var r;
		var i;

		// Retrieve the current state index:
		i = STATE[ OTHER_SECTION_OFFSET+1 ];

		// Determine whether we need to update the PRNG state:
		if ( i >= N ) {
			state = twist( state );
			i = 0;
		}
		// Get the next word of "raw"/untempered state:
		r = state[ i ];

		// Update the state index:
		STATE[ OTHER_SECTION_OFFSET+1 ] = i + 1;

		// Tempering transform to compensate for the reduced dimensionality of equidistribution:
		r ^= r >>> 11;
		r ^= ( r << 7 ) & TEMPERING_COEFFICIENT_1;
		r ^= ( r << 15 ) & TEMPERING_COEFFICIENT_2;
		r ^= r >>> 18;

		return r >>> 0;
	}

	/**
	* Generates a pseudorandom number on the interval \\( [0,1) \\).
	*
	* ## Notes
	*
	* -   The original C implementation credits Isaku Wada for this algorithm (2002/01/09).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var r = normalized();
	* // returns <number>
	*/
	function normalized() {
		var x = mt19937() >>> 5;
		var y = mt19937() >>> 6;
		return ( (x*TWO_26)+y ) * FLOAT64_NORMALIZATION_CONSTANT;
	}
}


// EXPORTS //

module.exports = factory;

},{"./rand_uint32.js":188,"@stdlib/array/to-json":17,"@stdlib/array/uint32":23,"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-boolean":72,"@stdlib/assert/is-collection":80,"@stdlib/assert/is-plain-object":109,"@stdlib/assert/is-positive-integer":111,"@stdlib/assert/is-uint32array":121,"@stdlib/blas/base/gcopy":129,"@stdlib/constants/float64/max-safe-integer":135,"@stdlib/constants/uint32/max":145,"@stdlib/math/base/special/max":168,"@stdlib/math/base/special/uimul":172,"@stdlib/utils/define-nonenumerable-read-only-accessor":199,"@stdlib/utils/define-nonenumerable-read-only-property":201,"@stdlib/utils/define-nonenumerable-read-write-accessor":203}],186:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* A 32-bit Mersenne Twister pseudorandom number generator.
*
* @module @stdlib/random/base/mt19937
*
* @example
* var mt19937 = require( '@stdlib/random/base/mt19937' );
*
* var v = mt19937();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/mt19937' ).factory;
*
* var mt19937 = factory({
*     'seed': 1234
* });
*
* var v = mt19937();
* // returns 822569775
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var mt19937 = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( mt19937, 'factory', factory );


// EXPORTS //

module.exports = mt19937;

},{"./factory.js":185,"./main.js":187,"@stdlib/utils/define-nonenumerable-read-only-property":201}],187:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var factory = require( './factory.js' );
var randuint32 = require( './rand_uint32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{32}-1) \\).
*
* ## Method
*
* -   When generating normalized double-precision floating-point numbers, we first generate two pseudorandom integers \\( x \\) and \\( y \\) on the interval \\( [1,2^{32}-1) \\) for a combined \\( 64 \\) random bits.
*
* -   We would like \\( 53 \\) random bits to generate a 53-bit precision integer and, thus, want to discard \\( 11 \\) of the generated bits.
*
* -   We do so by discarding \\( 5 \\) bits from \\( x \\) and \\( 6 \\) bits from \\( y \\).
*
* -   Accordingly, \\( x \\) contains \\( 27 \\) random bits, which are subsequently shifted left \\( 26 \\) bits (multiplied by \\( 2^{26} \\), and \\( y \\) contains \\( 26 \\) random bits to fill in the lower \\( 26 \\) bits. When summed, they combine to comprise \\( 53 \\) random bits of a double-precision floating-point integer.
*
* -   As an example, suppose, for the sake of argument, the 32-bit PRNG generates the maximum unsigned 32-bit integer \\( 2^{32}-1 \\) twice in a row. Then,
*
*     ```javascript
*     x = 4294967295 >>> 5; // 00000111111111111111111111111111
*     y = 4294967295 >>> 6; // 00000011111111111111111111111111
*     ```
*
*     Multiplying \\( x \\) by \\( 2^{26} \\) returns \\( 9007199187632128 \\), which, in binary, is
*
*     ```binarystring
*     0 10000110011 11111111111111111111 11111100000000000000000000000000
*     ```
*
*     Adding \\( y \\) yields \\( 9007199254740991 \\) (the maximum "safe" double-precision floating-point integer value), which, in binary, is
*
*     ```binarystring
*     0 10000110011 11111111111111111111 11111111111111111111111111111111
*     ```
*
* -   Similarly, suppose the 32-bit PRNG generates the following values
*
*     ```javascript
*     x = 1 >>> 5;  // 0 => 00000000000000000000000000000000
*     y = 64 >>> 6; // 1 => 00000000000000000000000000000001
*     ```
*
*     Multiplying \\( x \\) by \\( 2^{26} \\) returns \\( 0 \\), which, in binary, is
*
*     ```binarystring
*     0 00000000000 00000000000000000000 00000000000000000000000000000000
*     ```
*
*     Adding \\( y \\) yields \\( 1 \\), which, in binary, is
*
*     ```binarystring
*     0 01111111111 00000000000000000000 00000000000000000000000000000000
*     ```
*
* -   As different combinations of \\( x \\) and \\( y \\) are generated, different combinations of double-precision floating-point exponent and significand bits will be toggled, thus generating pseudorandom double-precision floating-point numbers.
*
*
* ## References
*
* -   Matsumoto, Makoto, and Takuji Nishimura. 1998. "Mersenne Twister: A 623-dimensionally Equidistributed Uniform Pseudo-random Number Generator." _ACM Transactions on Modeling and Computer Simulation_ 8 (1). New York, NY, USA: ACM: 3–30. doi:[10.1145/272991.272995][@matsumoto:1998a].
* -   Harase, Shin. 2017. "Conversion of Mersenne Twister to double-precision floating-point numbers." _ArXiv_ abs/1708.06018 (September). <https://arxiv.org/abs/1708.06018>.
*
* [@matsumoto:1998a]: https://doi.org/10.1145/272991.272995
*
*
* @function mt19937
* @type {PRNG}
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = mt19937();
* // returns <number>
*/
var mt19937 = factory({
	'seed': randuint32()
});


// EXPORTS //

module.exports = mt19937;

},{"./factory.js":185,"./rand_uint32.js":188}],188:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var UINT32_MAX = require( '@stdlib/constants/uint32/max' );
var floor = require( '@stdlib/math/base/special/floor' );


// VARIABLES //

var MAX = UINT32_MAX - 1;


// MAIN //

/**
* Returns a pseudorandom integer on the interval \\([1, 2^{32}-1)\\).
*
* @private
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = randuint32();
* // returns <number>
*/
function randuint32() {
	var v = floor( 1.0 + (MAX*Math.random()) ); // eslint-disable-line stdlib/no-builtin-math
	return v >>> 0; // asm type annotation
}


// EXPORTS //

module.exports = randuint32;

},{"@stdlib/constants/uint32/max":145,"@stdlib/math/base/special/floor":166}],189:[function(require,module,exports){
module.exports={
	"name": "mt19937",
	"copy": true
}

},{}],190:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var setReadOnlyAccessor = require( '@stdlib/utils/define-nonenumerable-read-only-accessor' );
var setReadWriteAccessor = require( '@stdlib/utils/define-nonenumerable-read-write-accessor' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var typedarray2json = require( '@stdlib/array/to-json' );
var defaults = require( './defaults.json' );
var PRNGS = require( './prngs.js' );


// MAIN //

/**
* Returns a pseudorandom number generator for generating uniformly distributed random numbers on the interval \\( [0,1) \\).
*
* @param {Options} [options] - function options
* @param {string} [options.name='mt19937'] - name of pseudorandom number generator
* @param {*} [options.seed] - pseudorandom number generator seed
* @param {*} [options.state] - pseudorandom number generator state
* @param {boolean} [options.copy=true] - boolean indicating whether to copy a provided pseudorandom number generator state
* @throws {TypeError} must provide an object
* @throws {TypeError} must provide valid options
* @throws {Error} must provide the name of a supported pseudorandom number generator
* @returns {PRNG} pseudorandom number generator
*
* @example
* var uniform = factory();
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'name': 'minstd'
* });
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'seed': 12345
* });
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'name': 'minstd',
*     'seed': 12345
* });
* var v = uniform();
* // returns <number>
*/
function factory( options ) {
	var opts;
	var rand;
	var prng;

	opts = {
		'name': defaults.name,
		'copy': defaults.copy
	};
	if ( arguments.length ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid argument. Must provide an object. Value: `' + options + '`.' );
		}
		if ( hasOwnProp( options, 'name' ) ) {
			opts.name = options.name;
		}
		if ( hasOwnProp( options, 'state' ) ) {
			opts.state = options.state;
			if ( opts.state === void 0 ) {
				throw new TypeError( 'invalid option. `state` option cannot be undefined. Option: `' + opts.state + '`.' );
			}
		} else if ( hasOwnProp( options, 'seed' ) ) {
			opts.seed = options.seed;
			if ( opts.seed === void 0 ) {
				throw new TypeError( 'invalid option. `seed` option cannot be undefined. Option: `' + opts.seed + '`.' );
			}
		}
		if ( hasOwnProp( options, 'copy' ) ) {
			opts.copy = options.copy;
			if ( !isBoolean( opts.copy ) ) {
				throw new TypeError( 'invalid option. `copy` option must be a boolean. Option: `' + opts.copy + '`.' );
			}
		}
	}
	prng = PRNGS[ opts.name ];
	if ( prng === void 0 ) {
		throw new Error( 'invalid option. Unrecognized/unsupported PRNG. Option: `' + opts.name + '`.' );
	}
	if ( opts.state === void 0 ) {
		if ( opts.seed === void 0 ) {
			rand = prng.factory();
		} else {
			rand = prng.factory({
				'seed': opts.seed
			});
		}
	} else {
		rand = prng.factory({
			'state': opts.state,
			'copy': opts.copy
		});
	}
	setReadOnly( uniform, 'NAME', 'randu' );
	setReadOnlyAccessor( uniform, 'seed', getSeed );
	setReadOnlyAccessor( uniform, 'seedLength', getSeedLength );
	setReadWriteAccessor( uniform, 'state', getState, setState );
	setReadOnlyAccessor( uniform, 'stateLength', getStateLength );
	setReadOnlyAccessor( uniform, 'byteLength', getStateSize );
	setReadOnly( uniform, 'toJSON', toJSON );
	setReadOnly( uniform, 'PRNG', rand );
	setReadOnly( uniform, 'MIN', rand.normalized.MIN );
	setReadOnly( uniform, 'MAX', rand.normalized.MAX );

	return uniform;

	/**
	* Returns the PRNG seed.
	*
	* @private
	* @returns {*} seed
	*/
	function getSeed() {
		return rand.seed;
	}

	/**
	* Returns the PRNG seed length.
	*
	* @private
	* @returns {PositiveInteger} seed length
	*/
	function getSeedLength() {
		return rand.seedLength;
	}

	/**
	* Returns the PRNG state length.
	*
	* @private
	* @returns {PositiveInteger} state length
	*/
	function getStateLength() {
		return rand.stateLength;
	}

	/**
	* Returns the PRNG state size (in bytes).
	*
	* @private
	* @returns {PositiveInteger} state size (in bytes)
	*/
	function getStateSize() {
		return rand.byteLength;
	}

	/**
	* Returns the current pseudorandom number generator state.
	*
	* @private
	* @returns {*} current state
	*/
	function getState() {
		return rand.state;
	}

	/**
	* Sets the pseudorandom number generator state.
	*
	* @private
	* @param {*} s - generator state
	* @throws {Error} must provide a valid state
	*/
	function setState( s ) {
		rand.state = s;
	}

	/**
	* Serializes the pseudorandom number generator as a JSON object.
	*
	* ## Notes
	*
	* -   `JSON.stringify()` implicitly calls this method when stringifying a PRNG.
	*
	* @private
	* @returns {Object} JSON representation
	*/
	function toJSON() {
		var out = {};
		out.type = 'PRNG';
		out.name = uniform.NAME + '-' + rand.NAME;
		out.state = typedarray2json( rand.state );
		out.params = [];
		return out;
	}

	/**
	* Returns a uniformly distributed pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = uniform();
	* // returns <number>
	*/
	function uniform() {
		return rand.normalized();
	}
}


// EXPORTS //

module.exports = factory;

},{"./defaults.json":189,"./prngs.js":193,"@stdlib/array/to-json":17,"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-boolean":72,"@stdlib/assert/is-plain-object":109,"@stdlib/utils/define-nonenumerable-read-only-accessor":199,"@stdlib/utils/define-nonenumerable-read-only-property":201,"@stdlib/utils/define-nonenumerable-read-write-accessor":203}],191:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Uniformly distributed pseudorandom numbers on the interval \\( [0,1) \\).
*
* @module @stdlib/random/base/randu
*
* @example
* var randu = require( '@stdlib/random/base/randu' );
*
* var v = randu();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/random/base/randu' ).factory;
*
* var randu = factory({
*     'name': 'minstd',
*     'seed': 12345
* });
*
* var v = randu();
* // returns <number>
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var randu = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( randu, 'factory', factory );


// EXPORTS //

module.exports = randu;

},{"./factory.js":190,"./main.js":192,"@stdlib/utils/define-nonenumerable-read-only-property":201}],192:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var factory = require( './factory.js' );


// MAIN //

/**
* Returns a uniformly distributed random number on the interval \\( [0,1) \\).
*
* @name randu
* @type {PRNG}
* @returns {number} pseudorandom number
*
* @example
* var v = randu();
* // returns <number>
*/
var randu = factory();


// EXPORTS //

module.exports = randu;

},{"./factory.js":190}],193:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/random/base/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/random/base/minstd-shuffle' );
prngs[ 'mt19937' ] = require( '@stdlib/random/base/mt19937' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/random/base/minstd":182,"@stdlib/random/base/minstd-shuffle":178,"@stdlib/random/base/mt19937":186}],194:[function(require,module,exports){
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
var reFunctionName = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( reFunctionName, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = reFunctionName;

},{"./main.js":195,"./regexp.js":196,"@stdlib/utils/define-nonenumerable-read-only-property":201}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":195}],197:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var constructorName = require( './main.js' );


// EXPORTS //

module.exports = constructorName;

},{"./main.js":198}],198:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":78,"@stdlib/regexp/function-name":194,"@stdlib/utils/native-class":224}],199:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define a non-enumerable read-only accessor.
*
* @module @stdlib/utils/define-nonenumerable-read-only-accessor
*
* @example
* var setNonEnumerableReadOnlyAccessor = require( '@stdlib/utils/define-nonenumerable-read-only-accessor' );
*
* function getter() {
*     return 'bar';
* }
*
* var obj = {};
*
* setNonEnumerableReadOnlyAccessor( obj, 'foo', getter );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/

// MODULES //

var setNonEnumerableReadOnlyAccessor = require( './main.js' ); // eslint-disable-line id-length


// EXPORTS //

module.exports = setNonEnumerableReadOnlyAccessor;

},{"./main.js":200}],200:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Defines a non-enumerable read-only accessor.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {Function} getter - accessor
*
* @example
* function getter() {
*     return 'bar';
* }
*
* var obj = {};
*
* setNonEnumerableReadOnlyAccessor( obj, 'foo', getter );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/
function setNonEnumerableReadOnlyAccessor( obj, prop, getter ) { // eslint-disable-line id-length
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'get': getter
	});
}


// EXPORTS //

module.exports = setNonEnumerableReadOnlyAccessor;

},{"@stdlib/utils/define-property":208}],201:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":202}],202:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":208}],203:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Define a non-enumerable read-write accessor.
*
* @module @stdlib/utils/define-nonenumerable-read-write-accessor
*
* @example
* var setNonEnumerableReadWriteAccessor = require( '@stdlib/utils/define-nonenumerable-read-write-accessor' );
*
* function getter() {
*     return name + ' foo';
* }
*
* function setter( v ) {
*     name = v;
* }
*
* var name = 'bar';
* var obj = {};
*
* setNonEnumerableReadWriteAccessor( obj, 'foo', getter, setter );
*
* var v = obj.foo;
* // returns 'bar foo'
*
* obj.foo = 'beep';
*
* v = obj.foo;
* // returns 'beep foo'
*/

// MODULES //

var setNonEnumerableReadWriteAccessor = require( './main.js' );


// EXPORTS //

module.exports = setNonEnumerableReadWriteAccessor;

},{"./main.js":204}],204:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Defines a non-enumerable read-write accessor.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {Function} getter - get accessor
* @param {Function} setter - set accessor
*
* @example
* function getter() {
*     return name + ' foo';
* }
*
* function setter( v ) {
*     name = v;
* }
*
* var name = 'bar';
* var obj = {};
*
* setNonEnumerableReadWriteAccessor( obj, 'foo', getter, setter );
*
* var v = obj.foo;
* // returns 'bar foo'
*
* obj.foo = 'beep';
*
* v = obj.foo;
* // returns 'beep foo'
*/
function setNonEnumerableReadWriteAccessor( obj, prop, getter, setter ) { // eslint-disable-line id-length
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'get': getter,
		'set': setter
	});
}


// EXPORTS //

module.exports = setNonEnumerableReadWriteAccessor;

},{"@stdlib/utils/define-property":208}],205:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
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

},{"./define_property.js":206}],208:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":205,"./has_define_property_support.js":207,"./polyfill.js":209}],209:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		throw new TypeError( 'invalid argument. First argument must be an object. Value: `' + obj + '`.' );
	}
	if ( typeof descriptor !== 'object' || descriptor === null || toStr.call( descriptor ) === '[object Array]' ) {
		throw new TypeError( 'invalid argument. Property descriptor must be an object. Value: `' + descriptor + '`.' );
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

},{}],210:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var hasFunctionNameSupport = require( '@stdlib/assert/has-function-name-support' );
var RE = require( '@stdlib/regexp/function-name' ).REGEXP;


// VARIABLES //

var isFunctionNameSupported = hasFunctionNameSupport();


// MAIN //

/**
* Returns the name of a function.
*
* @param {Function} fcn - input function
* @throws {TypeError} must provide a function
* @returns {string} function name
*
* @example
* var v = functionName( Math.sqrt );
* // returns 'sqrt'
*
* @example
* var v = functionName( function foo(){} );
* // returns 'foo'
*
* @example
* var v = functionName( function(){} );
* // returns '' || 'anonymous'
*
* @example
* var v = functionName( String );
* // returns 'String'
*/
function functionName( fcn ) {
	// TODO: add support for generator functions?
	if ( isFunction( fcn ) === false ) {
		throw new TypeError( 'invalid argument. Must provide a function. Value: `' + fcn + '`.' );
	}
	if ( isFunctionNameSupported ) {
		return fcn.name;
	}
	return RE.exec( fcn.toString() )[ 1 ];
}


// EXPORTS //

module.exports = functionName;

},{"@stdlib/assert/has-function-name-support":39,"@stdlib/assert/is-function":86,"@stdlib/regexp/function-name":194}],211:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the name of a function.
*
* @module @stdlib/utils/function-name
*
* @example
* var functionName = require( '@stdlib/utils/function-name' );
*
* var v = functionName( String );
* // returns 'String'
*
* v = functionName( function foo(){} );
* // returns 'foo'
*
* v = functionName( function(){} );
* // returns '' || 'anonymous'
*/

// MODULES //

var functionName = require( './function_name.js' );


// EXPORTS //

module.exports = functionName;

},{"./function_name.js":210}],212:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":215,"./polyfill.js":216,"@stdlib/assert/is-function":86}],213:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

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

},{"./detect.js":212}],214:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":213}],215:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],216:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./proto.js":217,"@stdlib/utils/native-class":224}],217:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],218:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func
}


// EXPORTS //

module.exports = getGlobal;

},{}],219:[function(require,module,exports){
(function (global){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var obj = ( typeof global === 'object' ) ? global : null;


// EXPORTS //

module.exports = obj;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],220:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Return the global object.
*
* @module @stdlib/utils/global
*
* @example
* var getGlobal = require( '@stdlib/utils/global' );
*
* var g = getGlobal();
* // returns {...}
*/

// MODULES //

var getGlobal = require( './main.js' );


// EXPORTS //

module.exports = getGlobal;

},{"./main.js":221}],221:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var Global = require( './global.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
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
			throw new TypeError( 'invalid argument. Must provide a boolean primitive. Value: `'+codegen+'`.' );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: Node.js
	if ( Global ) {
		return Global;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":218,"./global.js":219,"./self.js":222,"./window.js":223,"@stdlib/assert/is-boolean":72}],222:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],224:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":225,"./polyfill.js":226,"@stdlib/assert/has-tostringtag-support":54}],225:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":227}],226:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":227,"./tostringtag.js":228,"@stdlib/assert/has-own-property":50}],227:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],228:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],229:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":230,"./fixtures/re.js":231,"./fixtures/typedarray.js":232}],230:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":220}],231:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],232:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],233:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : typeOf;


// EXPORTS //

module.exports = main;

},{"./check.js":229,"./polyfill.js":234,"./typeof.js":235}],234:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":197}],235:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":197}],236:[function(require,module,exports){
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

},{}],237:[function(require,module,exports){

},{}],238:[function(require,module,exports){
arguments[4][237][0].apply(exports,arguments)
},{"dup":237}],239:[function(require,module,exports){
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
},{"_process":331}],241:[function(require,module,exports){
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

},{"events":239,"inherits":326,"readable-stream/lib/_stream_duplex.js":243,"readable-stream/lib/_stream_passthrough.js":244,"readable-stream/lib/_stream_readable.js":245,"readable-stream/lib/_stream_transform.js":246,"readable-stream/lib/_stream_writable.js":247,"readable-stream/lib/internal/streams/end-of-stream.js":251,"readable-stream/lib/internal/streams/pipeline.js":253}],242:[function(require,module,exports){
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
},{"./_stream_readable":245,"./_stream_writable":247,"_process":331,"inherits":326}],244:[function(require,module,exports){
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
},{"./_stream_transform":246,"inherits":326}],245:[function(require,module,exports){
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
},{"../errors":242,"./_stream_duplex":243,"./internal/streams/async_iterator":248,"./internal/streams/buffer_list":249,"./internal/streams/destroy":250,"./internal/streams/from":252,"./internal/streams/state":254,"./internal/streams/stream":255,"_process":331,"buffer":256,"events":239,"inherits":326,"string_decoder/":338,"util":237}],246:[function(require,module,exports){
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
},{"../errors":242,"./_stream_duplex":243,"inherits":326}],247:[function(require,module,exports){
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
},{"../errors":242,"./_stream_duplex":243,"./internal/streams/destroy":250,"./internal/streams/state":254,"./internal/streams/stream":255,"_process":331,"buffer":256,"inherits":326,"util-deprecate":347}],248:[function(require,module,exports){
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
},{"./end-of-stream":251,"_process":331}],249:[function(require,module,exports){
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
},{"buffer":256,"util":237}],250:[function(require,module,exports){
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
},{"_process":331}],251:[function(require,module,exports){
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
},{"base64-js":236,"buffer":256,"ieee754":325}],257:[function(require,module,exports){
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

},{"./":258,"get-intrinsic":321}],258:[function(require,module,exports){
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

},{"function-bind":320,"get-intrinsic":321}],259:[function(require,module,exports){
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

},{"./lib/is_arguments.js":260,"./lib/keys.js":261}],260:[function(require,module,exports){
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

},{}],261:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],262:[function(require,module,exports){
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

},{"object-keys":329}],263:[function(require,module,exports){
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

},{"./ToNumber":294,"./ToPrimitive":296,"./Type":301}],265:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/isNaN":311,"../helpers/isPrefixOf":312,"./ToNumber":294,"./ToPrimitive":296,"./Type":301,"get-intrinsic":321}],266:[function(require,module,exports){
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

},{"get-intrinsic":321}],267:[function(require,module,exports){
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

},{"./DayWithinYear":270,"./InLeapYear":274,"./MonthFromTime":284,"get-intrinsic":321}],268:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":316,"./floor":305}],269:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":305}],270:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":268,"./DayFromYear":269,"./YearFromTime":303}],271:[function(require,module,exports){
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

},{"./modulo":306}],272:[function(require,module,exports){
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
	} else {
		throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
	}
};

},{"../helpers/assertRecord":309,"./IsAccessorDescriptor":275,"./IsDataDescriptor":277,"./Type":301,"get-intrinsic":321}],273:[function(require,module,exports){
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

},{"../helpers/timeConstants":316,"./floor":305,"./modulo":306}],274:[function(require,module,exports){
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

},{"./DaysInYear":271,"./YearFromTime":303,"get-intrinsic":321}],275:[function(require,module,exports){
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

},{"../helpers/assertRecord":309,"./Type":301,"has":324}],276:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":327}],277:[function(require,module,exports){
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

},{"../helpers/assertRecord":309,"./Type":301,"has":324}],278:[function(require,module,exports){
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

},{"../helpers/assertRecord":309,"./IsAccessorDescriptor":275,"./IsDataDescriptor":277,"./Type":301}],279:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":313,"./IsAccessorDescriptor":275,"./IsDataDescriptor":277,"./Type":301}],280:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/timeConstants":316}],281:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"./DateFromTime":267,"./Day":268,"./MonthFromTime":284,"./ToInteger":293,"./YearFromTime":303,"./floor":305,"./modulo":306,"get-intrinsic":321}],282:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/timeConstants":316,"./ToInteger":293}],283:[function(require,module,exports){
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

},{"../helpers/timeConstants":316,"./floor":305,"./modulo":306}],284:[function(require,module,exports){
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

},{"./DayWithinYear":270,"./InLeapYear":274}],285:[function(require,module,exports){
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

},{"../helpers/isNaN":311}],286:[function(require,module,exports){
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

},{"../helpers/timeConstants":316,"./floor":305,"./modulo":306}],287:[function(require,module,exports){
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

},{"./Type":301}],288:[function(require,module,exports){
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


},{"../helpers/isFinite":310,"./ToNumber":294,"./abs":304,"get-intrinsic":321}],289:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":316,"./DayFromYear":269}],290:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":316,"./modulo":306}],291:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],292:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":294}],293:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/isNaN":311,"../helpers/sign":315,"./ToNumber":294,"./abs":304,"./floor":305}],294:[function(require,module,exports){
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

},{"./ToPrimitive":296}],295:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":266,"get-intrinsic":321}],296:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":317}],297:[function(require,module,exports){
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

},{"./IsCallable":276,"./ToBoolean":291,"./Type":301,"get-intrinsic":321,"has":324}],298:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":321}],299:[function(require,module,exports){
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

},{"../helpers/isFinite":310,"../helpers/isNaN":311,"../helpers/sign":315,"./ToNumber":294,"./abs":304,"./floor":305,"./modulo":306}],300:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":294}],301:[function(require,module,exports){
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

},{}],302:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":268,"./modulo":306}],303:[function(require,module,exports){
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

},{"call-bind/callBound":257,"get-intrinsic":321}],304:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":321}],305:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],306:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":314}],307:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":316,"./modulo":306}],308:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":264,"./5/AbstractRelationalComparison":265,"./5/CheckObjectCoercible":266,"./5/DateFromTime":267,"./5/Day":268,"./5/DayFromYear":269,"./5/DayWithinYear":270,"./5/DaysInYear":271,"./5/FromPropertyDescriptor":272,"./5/HourFromTime":273,"./5/InLeapYear":274,"./5/IsAccessorDescriptor":275,"./5/IsCallable":276,"./5/IsDataDescriptor":277,"./5/IsGenericDescriptor":278,"./5/IsPropertyDescriptor":279,"./5/MakeDate":280,"./5/MakeDay":281,"./5/MakeTime":282,"./5/MinFromTime":283,"./5/MonthFromTime":284,"./5/SameValue":285,"./5/SecFromTime":286,"./5/StrictEqualityComparison":287,"./5/TimeClip":288,"./5/TimeFromYear":289,"./5/TimeWithinDay":290,"./5/ToBoolean":291,"./5/ToInt32":292,"./5/ToInteger":293,"./5/ToNumber":294,"./5/ToObject":295,"./5/ToPrimitive":296,"./5/ToPropertyDescriptor":297,"./5/ToString":298,"./5/ToUint16":299,"./5/ToUint32":300,"./5/Type":301,"./5/WeekDay":302,"./5/YearFromTime":303,"./5/abs":304,"./5/floor":305,"./5/modulo":306,"./5/msFromTime":307}],309:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Type, Desc) {
		if (Type(Desc) !== 'Object') {
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

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(Type, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"get-intrinsic":321,"has":324}],310:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],311:[function(require,module,exports){
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

},{"call-bind/callBound":257}],313:[function(require,module,exports){
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

},{"get-intrinsic":321,"has":324}],314:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],315:[function(require,module,exports){
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

},{"./helpers/isPrimitive":318,"is-callable":327}],318:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],319:[function(require,module,exports){
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

},{}],320:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":319}],321:[function(require,module,exports){
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

},{"function-bind":320,"has":324,"has-symbols":322}],322:[function(require,module,exports){
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

},{"./shams":323}],323:[function(require,module,exports){
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

},{}],324:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":320}],325:[function(require,module,exports){
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

},{}],326:[function(require,module,exports){
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

},{}],327:[function(require,module,exports){
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

},{}],328:[function(require,module,exports){
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

},{"./isArguments":330}],329:[function(require,module,exports){
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

},{"./implementation":328,"./isArguments":330}],330:[function(require,module,exports){
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

},{}],331:[function(require,module,exports){
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

},{}],332:[function(require,module,exports){
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
},{"_process":331,"through":345,"timers":346}],333:[function(require,module,exports){
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

},{"buffer":256}],334:[function(require,module,exports){
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

},{"es-abstract/es5":308,"function-bind":320}],335:[function(require,module,exports){
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

},{"./implementation":334,"./polyfill":336,"./shim":337,"define-properties":262,"function-bind":320}],336:[function(require,module,exports){
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

},{"./polyfill":336,"define-properties":262}],338:[function(require,module,exports){
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
},{"safe-buffer":333}],339:[function(require,module,exports){
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
},{"./lib/default_stream":340,"./lib/results":342,"./lib/test":343,"_process":331,"defined":263,"through":345,"timers":346}],340:[function(require,module,exports){
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
},{"_process":331,"fs":238,"through":345}],341:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":331,"timers":346}],342:[function(require,module,exports){
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
},{"_process":331,"events":239,"function-bind":320,"has":324,"inherits":326,"object-inspect":344,"resumer":332,"through":345,"timers":346}],343:[function(require,module,exports){
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
},{"./next_tick":341,"deep-equal":259,"defined":263,"events":239,"has":324,"inherits":326,"path":240,"string.prototype.trim":335}],344:[function(require,module,exports){
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
},{"_process":331,"stream":241}],346:[function(require,module,exports){
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
},{"process/browser.js":331,"timers":346}],347:[function(require,module,exports){
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
},{}]},{},[165]);
