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

var ctor = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./float32array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float32array-support":36}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./float64array.js":4,"./polyfill.js":6,"@stdlib/assert/has-float64array-support":39}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Int16Array === 'function' ) ? Int16Array : null; // eslint-disable-line stdlib/require-globals


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

var ctor = ( typeof Int32Array === 'function' ) ? Int32Array : null; // eslint-disable-line stdlib/require-globals


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

var ctor = ( typeof Int8Array === 'function' ) ? Int8Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./type.js":19,"@stdlib/assert/is-typed-array":121}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":16,"@stdlib/assert/instance-of":70,"@stdlib/utils/constructor-name":209,"@stdlib/utils/get-prototype-of":222}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./polyfill.js":21,"./uint16array.js":22,"@stdlib/assert/has-uint16array-support":58}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":24,"./uint32array.js":25,"@stdlib/assert/has-uint32array-support":61}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":27,"./uint8array.js":28,"@stdlib/assert/has-uint8array-support":64}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":30,"./uint8clampedarray.js":31,"@stdlib/assert/has-uint8clampedarray-support":67}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Uint8ClampedArray === 'function' ) ? Uint8ClampedArray : null; // eslint-disable-line stdlib/require-globals


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

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


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
* Test for `Object.defineProperty` support.
*
* @module @stdlib/assert/has-define-property-support
*
* @example
* var hasDefinePropertySupport = require( '@stdlib/assert/has-define-property-support' );
*
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/

// MODULES //

var hasDefinePropertySupport = require( './main.js' );


// EXPORTS //

module.exports = hasDefinePropertySupport;

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

var defineProperty = require( './define_property.js' );


// MAIN //

/**
* Tests for `Object.defineProperty` support.
*
* @returns {boolean} boolean indicating if an environment has `Object.defineProperty` support
*
* @example
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/
function hasDefinePropertySupport() {
	var bool;

	if ( typeof defineProperty !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		defineProperty( {}, 'x', {} );
		bool = true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./define_property.js":32}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isFloat32Array = require( '@stdlib/assert/is-float32array' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
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

},{"./float32array.js":35,"@stdlib/assert/is-float32array":84,"@stdlib/constants/math/float64-pinf":142}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./float64array.js":38,"@stdlib/assert/is-float64array":86}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var INT16_MAX = require( '@stdlib/constants/math/int16-max' );
var INT16_MIN = require( '@stdlib/constants/math/int16-min' );
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

},{"./int16array.js":42,"@stdlib/assert/is-int16array":90,"@stdlib/constants/math/int16-max":143,"@stdlib/constants/math/int16-min":144}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
var INT32_MIN = require( '@stdlib/constants/math/int32-min' );
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

},{"./int32array.js":45,"@stdlib/assert/is-int32array":92,"@stdlib/constants/math/int32-max":145,"@stdlib/constants/math/int32-min":146}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var INT8_MAX = require( '@stdlib/constants/math/int8-max' );
var INT8_MIN = require( '@stdlib/constants/math/int8-min' );
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

},{"./int8array.js":48,"@stdlib/assert/is-int8array":94,"@stdlib/constants/math/int8-max":147,"@stdlib/constants/math/int8-min":148}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Test whether an object has a specified property, either own or inherited.
*
* @module @stdlib/assert/has-property
*
* @example
* var hasProp = require( '@stdlib/assert/has-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasProp( beep, 'boop' );
* // returns true
*
* bool = hasProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasProp = require( './main.js' );


// EXPORTS //

module.exports = hasProp;

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
* Tests if an object has a specified property, either own or inherited.
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
* var bool = hasProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasProp( beep, 'bap' );
* // returns false
*/
function hasProp( value, property ) {
	if ( value === void 0 || value === null ) {
		return false;
	}
	if ( typeof property === 'symbol' ) {
		return property in Object( value );
	}
	return ( String( property ) in Object( value ) );
}


// EXPORTS //

module.exports = hasProp;

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

},{"@stdlib/assert/has-symbol-support":54}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isUint16Array = require( '@stdlib/assert/is-uint16array' );
var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
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

},{"./uint16array.js":60,"@stdlib/assert/is-uint16array":124,"@stdlib/constants/math/uint16-max":149}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var isUint32Array = require( '@stdlib/assert/is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
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

},{"./uint32array.js":63,"@stdlib/assert/is-uint32array":126,"@stdlib/constants/math/uint32-max":150}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isUint8Array = require( '@stdlib/assert/is-uint8array' );
var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
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

},{"./uint8array.js":66,"@stdlib/assert/is-uint8array":128,"@stdlib/constants/math/uint8-max":151}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8clampedarray.js":69,"@stdlib/assert/is-uint8clampedarray":130}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":232}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":75,"./object.js":76,"./primitive.js":77,"@stdlib/utils/define-nonenumerable-read-only-property":213}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./object.js":76,"./primitive.js":77}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":79,"@stdlib/assert/has-tostringtag-support":56,"@stdlib/utils/native-class":232}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

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

},{"./tostring.js":78}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-object-like":110}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/array/max-typed-array-length":137,"@stdlib/math/base/assert/is-integer":152}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":232}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":232}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":241}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":232}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":232}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":232}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":98,"./object.js":99,"./primitive.js":100,"@stdlib/utils/define-nonenumerable-read-only-property":213}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
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

},{"@stdlib/constants/math/float64-ninf":141,"@stdlib/constants/math/float64-pinf":142,"@stdlib/math/base/assert/is-integer":152}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./object.js":99,"./primitive.js":100}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./integer.js":97,"@stdlib/assert/is-number":104}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./integer.js":97,"@stdlib/assert/is-number":104}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/uint16":20,"@stdlib/array/uint8":26}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":101}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":105,"./object.js":106,"./primitive.js":107,"@stdlib/utils/define-nonenumerable-read-only-property":213}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./object.js":106,"./primitive.js":107}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":109,"@stdlib/assert/has-tostringtag-support":56,"@stdlib/number/ctor":182,"@stdlib/utils/native-class":232}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":182}],109:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"./tostring.js":108,"dup":79}],110:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":111,"@stdlib/assert/tools/array-function":133,"@stdlib/utils/define-nonenumerable-read-only-property":213}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":72}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":115}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-function":88,"@stdlib/assert/is-object":112,"@stdlib/utils/get-prototype-of":222,"@stdlib/utils/native-class":232}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":117,"./object.js":118,"./primitive.js":119,"@stdlib/utils/define-nonenumerable-read-only-property":213}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./object.js":118,"./primitive.js":119}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-integer":96}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-integer":96}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/float32":2,"@stdlib/array/float64":5,"@stdlib/array/int16":7,"@stdlib/array/int32":10,"@stdlib/array/int8":13,"@stdlib/array/uint16":20,"@stdlib/array/uint32":23,"@stdlib/array/uint8":26,"@stdlib/array/uint8c":29}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var ctorName = require( '@stdlib/utils/constructor-name' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var hasFloat64ArraySupport = require( '@stdlib/assert/has-float64array-support' );
var Float64Array = require( '@stdlib/array/float64' );
var CTORS = require( './ctors.js' );
var NAMES = require( './names.json' );


// VARIABLES //

// Abstract `TypedArray` class:
var TypedArray = ( hasFloat64ArraySupport() ) ? getPrototypeOf( Float64Array ) : Dummy; // eslint-disable-line max-len


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

},{"./ctors.js":120,"./names.json":123,"@stdlib/array/float64":5,"@stdlib/assert/has-float64array-support":39,"@stdlib/utils/constructor-name":209,"@stdlib/utils/get-prototype-of":222}],123:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":232}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":232}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":232}],130:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":232}],132:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":72}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./arrayfcn.js":132}],134:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Blas level 1 routine to copy values from `x` into `y`.
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
* // Use the `ndarray` interface...
* var gcopy = require( '@stdlib/blas/base/gcopy' ).ndarray;
*
* var x = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
* var y = [ 6.0, 7.0, 8.0, 9.0, 10.0 ];
*
* gcopy( x.length, x, 1, 0, y, 1, 0 );
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

},{"./main.js":135,"./ndarray.js":136,"@stdlib/utils/define-nonenumerable-read-only-property":213}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* @param {(Array|TypedArray)} x - input array
* @param {integer} strideX - `x` stride length
* @param {(Array|TypedArray)} y - destination array
* @param {integer} strideY - `y` stride length
* @returns {(Array|TypedArray)} `y`
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

// VARIABLES //

var M = 8;


// MAIN //

/**
* Copies values from `x` into `y`.
*
* @param {PositiveInteger} N - number of values to copy
* @param {(Array|TypedArray)} x - input array
* @param {integer} strideX - `x` stride length
* @param {NonNegativeInteger} offsetX - starting `x` index
* @param {(Array|TypedArray)} y - destination array
* @param {integer} strideY - `y` stride length
* @param {NonNegativeInteger} offsetY - starting `y` index
* @returns {(Array|TypedArray)} `y`
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
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/math/float64-eps' );
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
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/constants/math/float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
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
* Maximum safe double-precision floating-point integer.
*
* @module @stdlib/constants/math/float64-max-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );
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
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants/math/float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/math/float64-ninf' );
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

},{"@stdlib/number/ctor":182}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* @module @stdlib/constants/math/float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/math/float64-pinf' );
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
* Maximum signed 16-bit integer.
*
* @module @stdlib/constants/math/int16-max
* @type {integer32}
*
* @example
* var INT16_MAX = require( '@stdlib/constants/math/int16-max' );
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
* Minimum signed 16-bit integer.
*
* @module @stdlib/constants/math/int16-min
* @type {integer32}
*
* @example
* var INT16_MIN = require( '@stdlib/constants/math/int16-min' );
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
* Maximum signed 32-bit integer.
*
* @module @stdlib/constants/math/int32-max
* @type {integer32}
*
* @example
* var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
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
* Minimum signed 32-bit integer.
*
* @module @stdlib/constants/math/int32-min
* @type {integer32}
*
* @example
* var INT32_MIN = require( '@stdlib/constants/math/int32-min' );
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
* Maximum signed 8-bit integer.
*
* @module @stdlib/constants/math/int8-max
* @type {integer32}
*
* @example
* var INT8_MAX = require( '@stdlib/constants/math/int8-max' );
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
* Minimum signed 8-bit integer.
*
* @module @stdlib/constants/math/int8-min
* @type {integer32}
*
* @example
* var INT8_MIN = require( '@stdlib/constants/math/int8-min' );
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
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants/math/uint16-max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
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

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants/math/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
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
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants/math/uint8-max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
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

},{}],152:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_integer.js":153}],153:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":174}],154:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a numeric value is `NaN`.
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

var isnan = require( './is_nan.js' );


// EXPORTS //

module.exports = isnan;

},{"./is_nan.js":155}],155:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Tests if a numeric value is `NaN`.
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

/**
* Test if a numeric value is positive zero.
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

var isPositiveZero = require( './is_positive_zero.js' );


// EXPORTS //

module.exports = isPositiveZero;

},{"./is_positive_zero.js":157}],157:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Tests if a numeric value is positive zero.
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

},{"@stdlib/constants/math/float64-pinf":142}],158:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Computes the absolute value of `x`.
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
	if ( x < 0.0 ) {
		return -x;
	}
	if ( x === 0.0 ) {
		return 0.0; // handle negative zero
	}
	return x;
}


// EXPORTS //

module.exports = abs;

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

/**
* Compute an absolute value.
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

var abs = require( './abs.js' );


// EXPORTS //

module.exports = abs;

},{"./abs.js":158}],160:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the hyperbolic arccosine of a number.
*
* @module @stdlib/math/base/special/acoth
*
* @example
* var acoth = require( '@stdlib/math/base/special/acoth' );
*
* var v = acoth( 2.0 );
* // returns ~0.5493
*
* v = acoth( 0.0 );
* // returns NaN
*
* v = acoth( 0.5 );
* // returns NaN
*
* v = acoth( 1.0 );
* // returns Infinity
*
* v = acoth( NaN );
* // returns NaN
*/

// MODULES //

var acoth = require( './main.js' );


// EXPORTS //

module.exports = acoth;

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

var atanh = require( '@stdlib/math/base/special/atanh' );


// MAIN //

/**
* Computes the inverse hyperbolic cotangent of a number.
*
* @param {number} x - input value
* @returns {number} inverse hyperbolic cotangent (in radians)
*
* @example
* var v = acoth( 2.0 );
* // returns ~0.5493
*
* @example
* var v = acoth( 0.0 );
* // returns NaN
*
* @example
* var v = acoth( 0.5 );
* // returns NaN
*
* @example
* var v = acoth( 1.0 );
* // returns Infinity
*
* @example
* var v = acoth( NaN );
* // returns NaN
*/
function acoth( x ) {
	return atanh( 1.0/x );
}


// EXPORTS //

module.exports = acoth;

},{"@stdlib/math/base/special/atanh":172}],162:[function(require,module,exports){
module.exports={"expected":[-1.0e-300,-1.0019899700803996e-305,-5.00997495012525e-306,-3.3399888778370363e-306,-2.5049937500405933e-306,-2.003996004031968e-306,-1.6699972278046017e-306,-1.4314265367579942e-306,-1.2524984437706837e-306,-1.113332104956911e-306,-1.0019990060169862e-306,-9.109082702635492e-307,-8.349993111255683e-307,-7.707686443921621e-307,-7.157137806248462e-307,-6.679995604562892e-307,-6.2624961407367526e-307,-5.894114231939694e-307,-5.566663623557219e-307,-5.2736814820900544e-307,-5.009997540091208e-307,-4.7714263424908375e-307,-4.554543425703383e-307,-4.3565198847682755e-307,-4.174998298688193e-307,-4.007998433674212e-307,-3.853844707172141e-307,-3.711109770988138e-307,-3.578570183740229e-307,-3.4551712545235752e-307,-3.3399989178403507e-307,-3.232257052089807e-307,-3.1312490508401315e-307,-3.0363627447771213e-307,-2.947057984484668e-307,-2.8628563518908304e-307,-2.7833325864724224e-307,-2.708107401804421e-307,-2.6368414363381198e-307,-2.5692301348285587e-307,-2.504999397547645e-307,-2.4439018661976355e-307,-2.385713740408288e-307,-2.330232038443599e-307,-2.277272231448455e-307,-2.2266661931289897e-307,-2.1782604168658787e-307,-2.131914460430147e-307,-2.0874995851094575e-307,-2.044897561471964e-307,-2.0039996184384724e-307,-1.964705515993148e-307,-1.9269227248891176e-307,-1.8905656992175756e-307,-1.855555229802526e-307,-1.8218178681342688e-307,-1.7892854120242857e-307,-1.7578944454017103e-307,-1.7275859257170491e-307,-1.698304813304841e-307,-1.6699997378100412e-307,-1.6426226974249252e-307,-1.616128787232087e-307,-1.5904759534195363e-307,-1.5656247705381197e-307,-1.5415382393197954e-307,-1.5181816028760636e-307,-1.4955221793562331e-307,-1.473529209371135e-307,-1.4521737166843367e-307,-1.4314283808441068e-307,-1.4112674205788777e-307,-1.3916664869097454e-307,-1.372602565048249e-307,-1.3540538842483777e-307,-1.3359998348704203e-307,-1.3184208919924018e-307,-1.301298544973876e-307,-1.284615232437888e-307,-1.2683542821910123e-307,-1.2524998556493915e-307,-1.2370368963813603e-307,-1.2219510824152443e-307,-1.207228781994789e-307,-1.1928570124949122e-307,-1.1788234022375224e-307,-1.165116154971349e-307,-1.1517240168014396e-307,-1.1386362453734627e-307,-1.1258425811354745e-307,-1.113333220515567e-307,-1.101098790868022e-307,-1.0891303270534132e-307,-1.077419249529667e-307,-1.0659573438415672e-307,-1.0547367414056605e-307,-1.043749901496103e-307,-1.0329895943447855e-307,-1.0224488852761436e-307,-1.0121211198034978e-307,-1.0019999096196082e-307,-9.920791194194766e-308,-9.823528544982776e-308,-9.72815449071739e-308,-9.634614552703473e-308,-9.542856327624561e-308,-9.452829389647628e-308,-9.36448519801736e-308,-9.277777009784014e-308,-9.192659797335304e-308,-9.109090170426505e-308,-9.027026302425184e-308,-8.946427860507073e-308,-8.867255939558361e-308,-8.789472999556839e-308,-8.713042806220088e-308,-8.637930374723593e-308,-8.564101916305111e-308,-8.491524787584075e-308,-8.420167442436314e-308,-8.349999386275046e-308,-8.280991132598911e-308,-8.213114161677011e-308,-8.146340881249297e-308,-8.080644589128552e-308,-8.015999437597481e-308,-7.952380399501172e-308,-7.889763235941509e-308,-7.828124465485877e-308,-7.76744133480804e-308,-7.707691790684059e-308,-7.648854453270821e-308,-7.590908590599206e-308,-7.533834094217909e-308,-7.477611455927855e-308,-7.422221745550648e-308,-7.367646589677798e-308,-7.31386815135066e-308,-7.260869110623848e-308,-7.208632645967626e-308,-7.157142416467375e-308,-7.106382544780471e-308,-7.056337600813356e-308,-7.006992586083451e-308,-6.958332918732664e-308,-6.910344419161023e-308,-6.863013296250727e-308,-6.816326134152458e-308,-6.7702698796074e-308,-6.724831829779762e-308,-6.679999620576021e-308,-6.635761215428291e-308,-6.59210489452045e-308,-6.549019244436774e-308,-6.506493148213884e-308,-6.464515775777751e-308,-6.423076574748541e-308,-6.382165261596838e-308,-6.341771813135733e-308,-6.301886458333944e-308,-6.262499670435954e-308,-6.223602159375813e-308,-6.185184864471896e-308,-6.147238947390584e-308,-6.109755785367356e-308,-6.072726964674396e-308,-6.0361442743243e-308,-5.999999700000014e-308,-5.964285418201545e-308,-5.928993790600483e-308,-5.894117358593786e-308,-5.859648838048644e-308,-5.825581114230679e-308,-5.79190723690803e-308,-5.758620415624269e-308,-5.7257140151334e-308,-5.693181550990457e-308,-5.661016685291594e-308,-5.629213222557771e-308,-5.597765105756387e-308,-5.566666412455567e-308,-5.535911351105899e-308,-5.5054942574447635e-308,-5.475409591018554e-308,-5.445651931818299e-308,-5.416215977024408e-308,-5.38709653785641e-308,-5.358288536523788e-308,-5.329787003274116e-308,-5.301587073534906e-308,-5.273683985145715e-308,-5.24607307567721e-308,-5.218749779833993e-308,-5.191709626938183e-308,-5.164948238490815e-308,-5.138461325808293e-308,-5.112244687731162e-308,-5.086294208402699e-308,-5.060605855114792e-308,-5.03517567621879e-308,-5.009999799099008e-308,-4.985074428206736e-308,-4.960395843152641e-308,-4.935960396855549e-308,-4.911764513745683e-308,-4.887804688020471e-308,-4.86407748195118e-308,-4.840579524238613e-308,-4.817307508416242e-308,-4.794258191299199e-308,-4.771428391477558e-308,-4.748814987852481e-308,-4.726414918213783e-308,-4.704225177857575e-308,-4.682242818242647e-308,-4.660464945684376e-308,-4.638888720084883e-308,-4.617511353698322e-308,-4.596330109930147e-308,-4.575342302169268e-308,-4.554545292652072e-308,-4.533936491357268e-308,-4.513513354930611e-308,-4.493273385638567e-308,-4.473214130349974e-308,-4.453333179544894e-308,-4.433628166349759e-308,-4.414096765598018e-308,-4.3947366929155173e-308,-4.375545703829833e-308,-4.3565215929028397e-308,-4.33766219288582e-308,-4.318965373896408e-308,-4.30042904261674e-308,-4.2820511415121674e-308,-4.263829648069901e-308,-4.245762574057028e-308,-4.2278479647973124e-308,-4.2100838984662143e-308,-4.1924684854036216e-308,-4.1749998674437533e-308,-4.157676217261759e-308,-4.140495737736498e-308,-4.1234566613290697e-308,-4.106557249476624e-308,-4.089795792001003e-308,-4.0731706065318306e-308,-4.056680037943586e-308,-4.040322457806325e-308,-4.024096263849619e-308,-4.0079998794393636e-308,-3.992031753067098e-308,-3.976190357851477e-308,-3.9604741910515745e-308,-3.9448817735916697e-308,-3.929411649597236e-308,-3.9140623859417754e-308,-3.8988325718042696e-308,-3.8837208182368887e-308,-3.8687257577427317e-308,-3.8538460438633175e-308,-3.839080350775535e-308,-3.8244273728978524e-308,-3.8098858245054897e-308,-3.795454439354342e-308,-3.781131970313424e-308,-3.7669171890056e-308,-3.7528088854563846e-308,-3.7388058677506147e-308,-3.7249069616967734e-308,-3.7111110104987674e-308,-3.6974168744349913e-308,-3.6838234305444453e-308,-3.6703295723197703e-308,-3.656934209407004e-308,-3.64363626731187e-308,-3.6304346871124793e-308,-3.617328425178227e-308,-3.60431645289478e-308,-3.591397756394961e-308,-3.578571336295411e-308,-3.5658362074388647e-308,-3.5531913986419215e-308,-3.5406359524481537e-308,-3.528168924886433e-308,-3.515789385234351e-308,-3.503496415786593e-308,-3.4912891116281635e-308,-3.479166580412329e-308,-3.4671279421431755e-308,-3.4551723289626655e-308,-3.4432988849420786e-308,-3.4315067658777466e-308,-3.419795139090964e-308,-3.408163183231989e-308,-3.396610088088023e-308,-3.3851350543950894e-308,-3.373737293653711e-308,-3.3624160279482924e-308,-3.351170489770138e-308,-3.339999921844001e-308,-3.328903576958093e-308,-3.3178807177974665e-308,-3.30693061678071e-308,-3.296052555899846e-308,-3.285245826563398e-308,-3.274509729442524e-308,-3.263843574320153e-308,-3.2532466799430788e-308,-3.2427183738768986e-308,-3.232257992363789e-308,-3.221864880183003e-308,-3.2115383905140545e-308,-3.201277884802541e-308,-3.191082732628506e-308,-3.1809523115773256e-308,-3.1708860071130436e-308,-3.160883212454101e-308,-3.150943328451408e-308,-3.141065763468717e-308,-3.131249933265236e-308,-3.1214952608804274e-308,-3.111801176520969e-308,-3.1021671174497994e-308,-3.0925925278772306e-308,-3.083076858854061e-308,-3.0736195681666615e-308,-3.0642201202339883e-308,-3.054877986006471e-308,-3.0455926428667523e-308,-3.0363635745322323e-308,-3.0271902709593756e-308,-3.018072228249747e-308,-3.009008948557748e-308,-2.999999940000001e-308,-2.9910447165663635e-308,-2.9821427980325266e-308,-2.9732937098741745e-308,-2.964496983182663e-308,-2.955752154582192e-308,-2.9470587661484442e-308,-2.9384163653286446e-308,-2.929824504863036e-308,-2.921282742707717e-308,-2.91279064195883e-308,-2.904347770778073e-308,-2.8959537023194904e-308,-2.887608014657543e-308,-2.87931029071641e-308,-2.871060118200508e-308,-2.862857089526205e-308,-2.8547008017546946e-308,-2.846590856526021e-308,-2.8385268599942223e-308,-2.8305084227635747e-308,-2.8225351598259085e-308,-2.814606690498991e-308,-2.8067226383659357e-308,-2.7988826312156305e-308,-2.791086300984165e-308,-2.783333283697223e-308,-2.775623219413449e-308,-2.767955752168738e-308,-2.760330529921454e-308,-2.7527472044985515e-308,-2.7452054315425793e-308,-2.7377048704595547e-308,-2.730245184367692e-308,-2.7228260400469645e-308,-2.715447107889484e-308,-2.708108061850695e-308,-2.700808579401342e-308,-2.69354834148023e-308,-2.6863270324477296e-308,-2.679144340040036e-308,-2.6719999553241606e-308,-2.6648935726536335e-308,-2.657824889624919e-308,-2.6507936070345184e-308,-2.6437994288367534e-308,-2.6368420621022165e-308,-2.629921216976874e-308,-2.6230366066418144e-308,-2.6161879472736203e-308,-2.6093749580053715e-308,-2.602597360888245e-308,-2.595854880853715e-308,-2.5891472456763426e-308,-2.5824741859371356e-308,-2.5758354349874777e-308,-2.56923072891361e-308,-2.562659806501659e-308,-2.5561224092031967e-308,-2.549618281101335e-308,-2.543147168877323e-308,-2.5367088217776644e-308,-2.5303029915817267e-308,-2.523929432569841e-308,-2.517587901491882e-308,-2.511278157536323e-308,-2.5049999622997503e-308,-2.4987530797568427e-308,-2.492537276230787e-308,-2.486352320364143e-308,-2.480197983090139e-308,-2.47407403760439e-308,-2.4679802593370384e-308,-2.4619164259253005e-308,-2.4558823171864193e-308,-2.4498777150910146e-308,-2.443902403736824e-308,-2.4379561693228197e-308,-2.432038800123716e-308,-2.426150086464833e-308,-2.420289820697333e-308,-2.414457797173814e-308,-2.408653812224252e-308,-2.4028776641322914e-308,-2.39712915311188e-308,-2.3914080812842266e-308,-2.3857142526551025e-308,-2.380047473092457e-308,-2.374407550304351e-308,-2.368794293817213e-308,-2.363207514954388e-308,-2.3576470268150036e-308,-2.352112644253125e-308,-2.3466041838572035e-308,-2.3411214639298196e-308,-2.3356643044677006e-308,-2.330232527142023e-308,-2.324825955278988e-308,-2.3194444138406636e-308,-2.314087729406099e-308,-2.30875573015269e-308,-2.303448245837813e-308,-2.2981651077807007e-308,-2.2929061488445773e-308,-2.2876712034190284e-308,-2.2824601074026186e-308,-2.277272698185744e-308,-2.2721088146337177e-308,-2.266968297070085e-308,-2.2618509872601644e-308,-2.256756728394814e-308,-2.2516853650744104e-308,-2.2466367432930486e-308,-2.2416107104229543e-308,-2.2366071151990995e-308,-2.2316258077040293e-308,-2.226666639352889e-308,-2.221729462878649e-308,-2.216814132317527e-308,-2.2119205029946057e-308,-2.207048431509636e-308,-2.202197775723029e-308,-2.197368394742036e-308,-2.192560148907105e-308,-2.1877728997784183e-308,-2.183006510122603e-308,-2.178260843899622e-308,-2.1735357662498296e-308,-2.1688311434811946e-308,-2.164146843056692e-308,-2.15948273358186e-308,-2.154838684792508e-308,-2.150214567542596e-308,-2.1456102537922593e-308,-2.14102561659599e-308,-2.136460530090971e-308,-2.131914869485559e-308,-2.127388511047913e-308,-2.1228813320947644e-308,-2.118393210980338e-308,-2.113924027085403e-308,-2.109473660806471e-308,-2.105041993545124e-308,-2.1006289076974807e-308,-2.0962342866437917e-308,-2.091858014738168e-308,-2.087499977298438e-308,-2.083160060596125e-308,-2.078838151846559e-308,-2.0745341391991053e-308,-2.070247911727512e-308,-2.0659793594203845e-308,-2.061728373171773e-308,-2.0574948447718716e-308,-2.0532786668978436e-308,-2.0490797331047463e-308,-2.044897937816577e-308,-2.040733176317421e-308,-2.036585344742713e-308,-2.0324543400706034e-308,-2.028340060113426e-308,-2.0242424035092747e-308,-2.0201612697136775e-308,-2.0160965589913726e-308,-2.0120481724081867e-308,-2.008016011823005e-308,-2.00399997987984e-308,-1.99999998e-308,-1.9960159163743435e-308,-1.99204769395563e-308,-1.9880952184509637e-308,-1.9841583963143224e-308,-1.9802371347391775e-308,-1.976331341651203e-308,-1.9724409257010665e-308,-1.9685657962573096e-308,-1.964705863399308e-308,-1.9608610379103175e-308,-1.957031231270599e-308,-1.953216355650628e-308,-1.949416323904374e-308,-1.945631049562673e-308,-1.9418604468266634e-308,-1.9381044305613027e-308,-1.934362916288964e-308,-1.9306358201831005e-308,-1.9269230590619823e-308,-1.9232245503825136e-308,-1.919540212234113e-308,-1.9158699633326637e-308,-1.9122137230145394e-308,-1.908571411230694e-308,-1.9049429485408204e-308,-1.901328256107573e-308,-1.8977272556908577e-308,-1.89413986964219e-308,-1.89056602089911e-308,-1.887005632979667e-308,-1.8834586299769636e-308,-1.879924936553756e-308,-1.876404477937129e-308,-1.872897179913215e-308,-1.8694029688219815e-308,-1.8659217715520737e-308,-1.862453515535717e-308,-1.8589981287436713e-308,-1.855555539680247e-308,-1.8521256773783744e-308,-1.8487084713947253e-308,-1.84530385180489e-308,-1.8419117491986103e-308,-1.838532094675061e-308,-1.8351648198381836e-308,-1.831809856792075e-308,-1.828467138136422e-308,-1.825136596961987e-308,-1.821818166846149e-308,-1.818511781848479e-308,-1.81521737650638e-308,-1.8119348858307633e-308,-1.8086642453017767e-308,-1.8054053908645733e-308,-1.8021582589251333e-308,-1.7989227863461284e-308,-1.795698910442826e-308,-1.7924865689790417e-308,-1.789285700163138e-308,-1.7860962426440567e-308,-1.7829181355074023e-308,-1.779751318271566e-308,-1.7765957308838843e-308,-1.773451313716845e-308,-1.7703180075643347e-308,-1.767195753637916e-308,-1.764084493563157e-308,-1.7609841693759904e-308,-1.757894723519114e-308,-1.7548160988384283e-308,-1.751748238579515e-308,-1.7486910863841454e-308,-1.7456445862868314e-308,-1.74260868271141e-308,-1.739583320467665e-308,-1.7365684447479795e-308,-1.733564001124029e-308,-1.730569935543505e-308,-1.7275861943268725e-308,-1.724612724164166e-308,-1.721649472111808e-308,-1.718696385589472e-308,-1.7157534123769707e-308,-1.712820500611177e-308,-1.7098975987829795e-308,-1.7069846557342654e-308,-1.7040816206549357e-308,-1.7011884430799524e-308,-1.698305072886412e-308,-1.695431460290654e-308,-1.692567555845394e-308,-1.6897133104368846e-308,-1.686868675282114e-308,-1.6840336019260225e-308,-1.681208042238751e-308,-1.678391948412919e-308,-1.675585272960929e-308,-1.6727879687122944e-308,-1.669999988811e-308,-1.667221286712883e-308,-1.6644518161830446e-308,-1.6616915312932853e-308,-1.6589403864195647e-308,-1.6561983362394917e-308,-1.653465335729831e-308,-1.6507413401640394e-308,-1.648026305109829e-308,-1.6453201864267516e-308,-1.6426229402638e-308,-1.639934523057047e-308,-1.6372548915272973e-308,-1.634584002677762e-308,-1.6319218137917645e-308,-1.629268282430458e-308,-1.6266233664305746e-308,-1.6239870239021877e-308,-1.621359213226506e-308,-1.6187398930536773e-308,-1.6161290223006247e-308,-1.613526560148895e-308,-1.610932466042535e-308,-1.6083466996859807e-308,-1.6057692210419746e-308,-1.603199990329498e-308,-1.6006389680217213e-308,-1.5980861148439823e-308,-1.595541391771776e-308,-1.5930047600287637e-308,-1.5904761810848073e-308,-1.587955616654017e-308,-1.5854430286928176e-308,-1.582938379398037e-308,-1.5804416312050074e-308,-1.5779527467856905e-308,-1.5754716890468137e-308,-1.572998421128031e-308,-1.5705329064000946e-308,-1.5680751084630474e-308,-1.5656249911444336e-308,-1.5631825184975214e-308,-1.5607476547995455e-308,-1.5583203645499687e-308,-1.5559006124687516e-308,-1.5534883634946456e-308,-1.551083582783502e-308,-1.54868623570659e-308,-1.546296287848937e-308,-1.5439137050076805e-308,-1.541538453190438e-308,-1.539170498613689e-308,-1.5368098077011743e-308,-1.5344563470823083e-308,-1.532110083590607e-308,-1.529770984262129e-308,-1.5274390163339346e-308,-1.5251141472425513e-308,-1.522796344622463e-308,-1.5204855763046044e-308,-1.5181818103148763e-308,-1.5158850148726657e-308,-1.51359515838939e-308,-1.5113122094670463e-308,-1.5090361368967734e-308,-1.5067669096574366e-308,-1.5045044969142117e-308,-1.502248868017191e-308,-1.4999999925e-308,-1.497757840078425e-308,-1.4955223806490533e-308,-1.493293584287926e-308,-1.491071421249203e-308,-1.48885586196384e-308,-1.486646877038276e-308,-1.484444437253136e-308,-1.4822485135619374e-308,-1.4800590770898194e-308,-1.4778760991322734e-308,-1.475699551153889e-308,-1.473529404787111e-308,-1.471365631831008e-308,-1.469208204250049e-308,-1.467057094172896e-308,-1.4649122738911973e-308,-1.462773715858405e-308,-1.4606413926885907e-308,-1.4585152771552793e-308,-1.456395342190289e-308,-1.454281560882582e-308,-1.4521739064771267e-308,-1.4500723523737696e-308,-1.4479768721261153e-308,-1.4458874394404154e-308,-1.443804028174472e-308,-1.441726612336546e-308,-1.4396551660842747e-308,-1.4375896637236036e-308,-1.43553007970772e-308,-1.433476388636004e-308,-1.4314285652529797e-308,-1.4293865844472844e-308,-1.427350421250639e-308,-1.4253200508368324e-308,-1.4232954485207094e-308,-1.4212765897571753e-308,-1.4192634501401986e-308,-1.417256005401831e-308,-1.4152542314112326e-308,-1.4132581041737005e-308,-1.411267599829716e-308,-1.4092826946539907e-308,-1.407303365054523e-308,-1.4053295875716655e-308,-1.403361338877198e-308,-1.401398595773407e-308,-1.3994413351921755e-308,-1.3974895341940795e-308,-1.39554316996749e-308,-1.393602219827685e-308,-1.391666661215972e-308,-1.389736471698808e-308,-1.3878116289669357e-308,-1.385892110834524e-308,-1.383977895238317e-308,-1.3820689602367847e-308,-1.380165284009289e-308,-1.3782668448552495e-308,-1.376373621193319e-308,-1.374485591560568e-308,-1.372602734611672e-308,-1.370725029118106e-308,-1.3688524539673474e-308,-1.366984988162088e-308,-1.3651226108194434e-308,-1.363265301170179e-308,-1.3614130385579365e-308,-1.3595658024384674e-308,-1.357723572378875e-308,-1.3558863280568593e-308,-1.354054049259971e-308,-1.3522267158848695e-308,-1.3504043079365886e-308,-1.3485868055278063e-308,-1.346774188878122e-308,-1.344966438313337e-308,-1.343163534264747e-308,-1.341365457268431e-308,-1.339572187964554e-308,-1.337783707096672e-308,-1.33599999551104e-308,-1.334221034155932e-308,-1.332446804080961e-308,-1.330677286436406e-308,-1.3289124624725427e-308,-1.327152313538985e-308,-1.325396821084026e-308,-1.323645966653986e-308,-1.3218997318925653e-308,-1.3201580985402055e-308,-1.3184210484334486e-308,-1.316688563504311e-308,-1.3149606257796515e-308,-1.3132372173805543e-308,-1.31151832052171e-308,-1.3098039175108033e-308,-1.308093990747909e-308,-1.306388522724885e-308,-1.3046874960247803e-308,-1.302990893321237e-308,-1.301298697377905e-308,-1.2996108910478584e-308,-1.297927457273014e-308,-1.296248379083559e-308,-1.2945736395973798e-308,-1.292903222019496e-308,-1.2912371096415e-308,-1.289575285840998e-308,-1.2879177340810594e-308,-1.286264437909667e-308,-1.2846153809591717e-308,-1.2829705469457557e-308,-1.281329919668893e-308,-1.279693483010819e-308,-1.278061220936003e-308,-1.276433117490624e-308,-1.274809156802051e-308,-1.2731893230783266e-308,-1.2715736006076554e-308,-1.2699619737578974e-308,-1.2683544269760615e-308,-1.266750944787807e-308,-1.265151511796947e-308,-1.263556112684953e-308,-1.26196473221047e-308,-1.260377355208829e-308,-1.2587939665915633e-308,-1.257214551345935e-308,-1.2556390945344565e-308,-1.2540675812944217e-308,-1.2524999968374376e-308,-1.2509363264489614e-308,-1.249376555487839e-308,-1.247820669385849e-308,-1.2462686536472487e-308,-1.244720493848324e-308,-1.243176175636941e-308,-1.241635684732107e-308,-1.2400990069235247e-308,-1.238566128071159e-308,-1.237037034104801e-308,-1.235511711023641e-308,-1.233990144895836e-308,-1.23247232185809e-308,-1.230958228115232e-308,-1.2294478499397945e-308,-1.2279411736716045e-308,-1.2264381857173676e-308,-1.22493887255026e-308,-1.2234432207095225e-308,-1.2219512168000596e-308,-1.2204628474920366e-308,-1.218978099520486e-308,-1.2174969596849095e-308,-1.21601941484889e-308,-1.2145454519397024e-308,-1.2130750579479274e-308,-1.2116082199270683e-308,-1.2101449249931734e-308,-1.208685160324457e-308,-1.2072289131609233e-308,-1.2057761708039983e-308,-1.204326920616159e-308,-1.2028811500205655e-308,-1.2014388465006987e-308,-1.1999999976e-308,-1.1985645909215105e-308,-1.1971326141275163e-308,-1.195704054939195e-308,-1.194278901136264e-308,-1.1928571405566327e-308,-1.1914387610960567e-308,-1.1900237507077936e-308,-1.188612097402262e-308,-1.1872037892467035e-308,-1.185798814364847e-308,-1.1843971609365726e-308,-1.182998817197582e-308,-1.1816037714390685e-308,-1.1802120120073916e-308,-1.178823527303751e-308,-1.177438305783864e-308,-1.1760563359576477e-308,-1.174677606388898e-308,-1.17330210569498e-308,-1.1719298225465065e-308,-1.1705607456670344e-308,-1.169194863832751e-308,-1.16783216587217e-308,-1.1664726406658254e-308,-1.165116277145971e-308,-1.1637630642962766e-308,-1.1624129911515335e-308,-1.161066046797356e-308,-1.159722220369888e-308,-1.1583815010555113e-308,-1.1570438780905543e-308,-1.155709340761006e-308,-1.1543778784022277e-308,-1.15304948039867e-308,-1.151724136183591e-308,-1.1504018352387757e-308,-1.1490825670942577e-308,-1.147766321328043e-308,-1.1464530875658355e-308,-1.145142855480764e-308,-1.143835614793113e-308,-1.142531355270052e-308,-1.14123006672537e-308,-1.1399317390192083e-308,-1.1386363620577996e-308,-1.137343925793205e-308,-1.136054420223055e-308,-1.1347678353902903e-308,-1.1334841613829056e-308,-1.132203388333697e-308,-1.130925506420007e-308,-1.129650505863475e-308,-1.1283783769297847e-308,-1.1271091099284216e-308,-1.125842695212423e-308,-1.124579123178134e-308,-1.1233183842649663e-308,-1.122060468955156e-308,-1.120805367773524e-308,-1.1195530712872384e-308,-1.1183035701055785e-308,-1.117056854879699e-308,-1.1158129163023993e-308,-1.1145717451078875e-308,-1.113333332071556e-308,-1.1120976680097463e-308,-1.1108647437795293e-308,-1.1096345502784735e-308,-1.108407078444426e-308,-1.1071823192552853e-308,-1.105960263728784e-308,-1.1047409029222673e-308,-1.103524227932475e-308,-1.102310229895326e-308,-1.1010988999857023e-308,-1.0998902294172336e-308,-1.098684209442088e-308,-1.097480831350758e-308,-1.0962800864718526e-308,-1.0950819661718893e-308,-1.093886461855085e-308,-1.092693564963152e-308,-1.091503266975095e-308,-1.0903155594070055e-308,-1.089130433811862e-308,-1.087947881779329e-308,-1.0867678949355593e-308,-1.085590464942994e-308,-1.0844155835001687e-308,-1.083243242341516e-308,-1.082073433237175e-308,-1.080906147992794e-308,-1.079741378449344e-308,-1.0785791164829246e-308,-1.0774193540045787e-308,-1.076262082960101e-308,-1.075107295329855e-308,-1.073954983128586e-308,-1.0728051384052385e-308,-1.071657753242769e-308,-1.0705128197579715e-308,-1.0693703301012906e-308,-1.0682302764566444e-308,-1.0670926510412475e-308,-1.065957446105432e-308,-1.0648246539324727e-308,-1.0636942668384114e-308,-1.062566277171883e-308,-1.0614406773139453e-308,-1.060317459677904e-308,-1.0591966167091437e-308,-1.0580781408849597e-308,-1.0569620247143887e-308,-1.0558482607380404e-308,-1.054736841527934e-308,-1.053627759687329e-308,-1.052521007850567e-308,-1.051416578682902e-308,-1.050314464880345e-308,-1.0492146591694965e-308,-1.0481171543073914e-308,-1.047021943081338e-308,-1.045929018308759e-308,-1.0448383728370384e-308,-1.0437499995433595e-308,-1.0426638913345555e-308,-1.041580041146952e-308,-1.040498441946216e-308,-1.0394190867272e-308,-1.0383419685137966e-308,-1.0372670803587824e-308,-1.0361944153436733e-308,-1.035123966578572e-308,-1.0340557272020247e-308,-1.0329896903808694e-308,-1.0319258493100955e-308,-1.030864197212696e-308,-1.0298047273395236e-308,-1.028747432969149e-308,-1.027692307407716e-308,-1.0266393439888054e-308,-1.0255885360732884e-308,-1.024539877049193e-308,-1.0234933603315593e-308,-1.022448979362307e-308,-1.0214067276100966e-308,-1.0203665985701904e-308,-1.019328585764321e-308,-1.018292682740556e-308,-1.0172588830731634e-308,-1.0162271803624785e-308,-1.0151975682347726e-308,-1.014170040342122e-308,-1.0131445903622763e-308,-1.0121212119985305e-308,-1.011099898979595e-308,-1.010080645059468e-308,-1.0090634440173054e-308,-1.0080482896573e-308,-1.0070351758085504e-308,-1.006024096324938e-308,-1.005015045085004e-308,-1.0040080159918234e-308,-1.0030030029728826e-308,-1.00199999997996e-308,-1.000999000989001e-308,-1.0e-308],"x":[-1.0e300,-9.98013982035928e304,-1.996017964071856e305,-2.9940219461077846e305,-3.992025928143713e305,-4.99002991017964e305,-5.988033892215569e305,-6.986037874251497e305,-7.984041856287425e305,-8.982045838323353e305,-9.98004982035928e305,-1.097805380239521e306,-1.1976057784431138e306,-1.2974061766467066e306,-1.3972065748502995e306,-1.4970069730538922e306,-1.5968073712574852e306,-1.696607769461078e306,-1.7964081676646707e306,-1.8962085658682634e306,-1.9960089640718562e306,-2.095809362275449e306,-2.195609760479042e306,-2.2954101586826347e306,-2.3952105568862274e306,-2.4950109550898204e306,-2.5948113532934132e306,-2.694611751497006e306,-2.794412149700599e306,-2.894212547904192e306,-2.9940129461077844e306,-3.0938133443113774e306,-3.19361374251497e306,-3.293414140718563e306,-3.3932145389221553e306,-3.493014937125749e306,-3.5928153353293414e306,-3.6926157335329344e306,-3.792416131736527e306,-3.89221652994012e306,-3.9920169281437123e306,-4.091817326347306e306,-4.1916177245508984e306,-4.291418122754491e306,-4.391218520958084e306,-4.491018919161676e306,-4.5908193173652693e306,-4.6906197155688624e306,-4.7904201137724554e306,-4.890220511976048e306,-4.990020910179641e306,-5.089821308383233e306,-5.1896217065868263e306,-5.2894221047904194e306,-5.3892225029940124e306,-5.489022901197605e306,-5.588823299401198e306,-5.688623697604791e306,-5.788424095808384e306,-5.888224494011976e306,-5.988024892215569e306,-6.08782529041916e306,-6.187625688622755e306,-6.287426086826348e306,-6.38722648502994e306,-6.487026883233533e306,-6.586827281437126e306,-6.686627679640719e306,-6.786428077844312e306,-6.886228476047904e306,-6.986028874251498e306,-7.08582927245509e306,-7.185629670658683e306,-7.285430068862275e306,-7.385230467065869e306,-7.485030865269462e306,-7.584831263473054e306,-7.684631661676647e306,-7.784432059880239e306,-7.884232458083833e306,-7.984032856287426e306,-8.083833254491018e306,-8.183633652694611e306,-8.283434050898204e306,-8.383234449101797e306,-8.483034847305389e306,-8.582835245508982e306,-8.682635643712576e306,-8.782436041916168e306,-8.882236440119761e306,-8.982036838323353e306,-9.081837236526947e306,-9.18163763473054e306,-9.28143803293413e306,-9.381238431137725e306,-9.481038829341318e306,-9.580839227544911e306,-9.680639625748501e306,-9.780440023952096e306,-9.88024042215569e306,-9.980040820359282e306,-1.0079841218562874e307,-1.0179641616766467e307,-1.0279442014970061e307,-1.0379242413173654e307,-1.0479042811377244e307,-1.0578843209580839e307,-1.0678643607784432e307,-1.0778444005988024e307,-1.0878244404191615e307,-1.097804480239521e307,-1.1077845200598804e307,-1.1177645598802395e307,-1.1277445997005988e307,-1.1377246395209582e307,-1.1477046793413176e307,-1.1576847191616768e307,-1.167664758982036e307,-1.1776447988023952e307,-1.1876248386227546e307,-1.1976048784431138e307,-1.207584918263473e307,-1.2175649580838324e307,-1.2275449979041918e307,-1.237525037724551e307,-1.24750507754491e307,-1.2574851173652696e307,-1.2674651571856288e307,-1.277445197005988e307,-1.2874252368263474e307,-1.2974052766467066e307,-1.307385316467066e307,-1.3173653562874252e307,-1.3273453961077843e307,-1.3373254359281438e307,-1.347305475748503e307,-1.3572855155688624e307,-1.3672655553892216e307,-1.3772455952095807e307,-1.3872256350299404e307,-1.3972056748502993e307,-1.4071857146706585e307,-1.417165754491018e307,-1.4271457943113774e307,-1.4371258341317366e307,-1.4471058739520957e307,-1.4570859137724552e307,-1.4670659535928146e307,-1.4770459934131735e307,-1.4870260332335327e307,-1.4970060730538924e307,-1.5069861128742516e307,-1.5169661526946107e307,-1.5269461925149702e307,-1.5369262323353294e307,-1.5469062721556885e307,-1.5568863119760477e307,-1.5668663517964071e307,-1.5768463916167666e307,-1.5868264314371258e307,-1.5968064712574852e307,-1.6067865110778444e307,-1.6167665508982035e307,-1.626746590718563e307,-1.6367266305389221e307,-1.6467066703592813e307,-1.6566867101796408e307,-1.6666667500000002e307,-1.6766467898203594e307,-1.6866268296407185e307,-1.696606869461078e307,-1.7065869092814372e307,-1.7165669491017963e307,-1.7265469889221555e307,-1.7365270287425152e307,-1.7465070685628744e307,-1.7564871083832335e307,-1.766467148203593e307,-1.776447188023952e307,-1.7864272278443113e307,-1.7964072676646705e307,-1.80638730748503e307,-1.8163673473053894e307,-1.8263473871257486e307,-1.836327426946108e307,-1.8463074667664672e307,-1.856287506586826e307,-1.8662675464071858e307,-1.876247586227545e307,-1.8862276260479041e307,-1.8962076658682636e307,-1.906187705688623e307,-1.9161677455089822e307,-1.926147785329341e307,-1.9361278251497005e307,-1.94610786497006e307,-1.9560879047904191e307,-1.9660679446107783e307,-1.976047984431138e307,-1.9860280242514972e307,-1.9960080640718563e307,-2.0059881038922155e307,-2.0159681437125747e307,-2.0259481835329341e307,-2.0359282233532933e307,-2.0459082631736527e307,-2.0558883029940122e307,-2.0658683428143714e307,-2.0758483826347305e307,-2.0858284224550897e307,-2.095808462275449e307,-2.1057885020958086e307,-2.1157685419161678e307,-2.125748581736527e307,-2.1357286215568864e307,-2.1457086613772458e307,-2.1556887011976047e307,-2.165668741017964e307,-2.1756487808383233e307,-2.1856288206586828e307,-2.195608860479042e307,-2.205588900299401e307,-2.2155689401197608e307,-2.2255489799401197e307,-2.235529019760479e307,-2.2455090595808383e307,-2.2554890994011975e307,-2.265469139221557e307,-2.2754491790419164e307,-2.2854292188622753e307,-2.295409258682635e307,-2.305389298502994e307,-2.315369338323353e307,-2.325349378143713e307,-2.335329417964072e307,-2.345309457784431e307,-2.355289497604791e307,-2.3652695374251497e307,-2.375249577245509e307,-2.385229617065868e307,-2.395209656886228e307,-2.405189696706587e307,-2.415169736526946e307,-2.4251497763473053e307,-2.435129816167664e307,-2.445109855988024e307,-2.455089895808383e307,-2.4650699356287425e307,-2.475049975449102e307,-2.4850300152694614e307,-2.4950100550898203e307,-2.5049900949101797e307,-2.514970134730539e307,-2.524950174550898e307,-2.534930214371258e307,-2.5449102541916165e307,-2.5548902940119764e307,-2.5648703338323353e307,-2.574850373652694e307,-2.584830413473054e307,-2.5948104532934126e307,-2.6047904931137725e307,-2.614770532934132e307,-2.624750572754491e307,-2.6347306125748503e307,-2.64471065239521e307,-2.6546906922155687e307,-2.664670732035928e307,-2.674650771856288e307,-2.6846308116766465e307,-2.6946108514970064e307,-2.7045908913173653e307,-2.7145709311377243e307,-2.724550970958084e307,-2.7345310107784426e307,-2.7445110505988025e307,-2.7544910904191615e307,-2.764471130239521e307,-2.7744511700598803e307,-2.78443120988024e307,-2.7944112497005987e307,-2.804391289520958e307,-2.8143713293413175e307,-2.8243513691616765e307,-2.8343314089820364e307,-2.8443114488023953e307,-2.854291488622755e307,-2.8642715284431137e307,-2.8742515682634726e307,-2.8842316080838326e307,-2.8942116479041915e307,-2.904191687724551e307,-2.91417172754491e307,-2.92415176736527e307,-2.9341318071856287e307,-2.9441118470059876e307,-2.9540918868263476e307,-2.9640719266467065e307,-2.974051966467066e307,-2.9840320062874253e307,-2.994012046107785e307,-3.0039920859281437e307,-3.013972125748503e307,-3.023952165568862e307,-3.0339322053892215e307,-3.0439122452095814e307,-3.05389228502994e307,-3.0638723248503e307,-3.073852364670658e307,-3.083832404491018e307,-3.0938124443113776e307,-3.103792484131736e307,-3.113772523952096e307,-3.1237525637724554e307,-3.1337326035928143e307,-3.1437126434131737e307,-3.1536926832335336e307,-3.163672723053892e307,-3.1736527628742515e307,-3.183632802694611e307,-3.19361284251497e307,-3.20359288233533e307,-3.213572922155688e307,-3.223552961976048e307,-3.233533001796407e307,-3.243513041616766e307,-3.253493081437126e307,-3.263473121257485e307,-3.2734531610778443e307,-3.2834332008982037e307,-3.293413240718563e307,-3.303393280538922e307,-3.3133733203592815e307,-3.323353360179641e307,-3.3333334e307,-3.3433134398203593e307,-3.3532934796407187e307,-3.363273519461078e307,-3.373253559281437e307,-3.3832335991017965e307,-3.3932136389221554e307,-3.403193678742515e307,-3.4131737185628743e307,-3.423153758383233e307,-3.433133798203593e307,-3.443113838023952e307,-3.4530938778443115e307,-3.463073917664671e307,-3.47305395748503e307,-3.4830339973053893e307,-3.4930140371257487e307,-3.5029940769461077e307,-3.512974116766467e307,-3.522954156586827e307,-3.5329341964071855e307,-3.542914236227545e307,-3.552894276047904e307,-3.562874315868263e307,-3.572854355688623e307,-3.5828343955089816e307,-3.5928144353293415e307,-3.602794475149701e307,-3.61277451497006e307,-3.6227545547904193e307,-3.6327345946107787e307,-3.6427146344311377e307,-3.652694674251497e307,-3.6626747140718565e307,-3.6726547538922155e307,-3.6826347937125754e307,-3.692614833532934e307,-3.7025948733532933e307,-3.7125749131736527e307,-3.7225549529940116e307,-3.7325349928143715e307,-3.7425150326347305e307,-3.75249507245509e307,-3.7624751122754493e307,-3.7724551520958083e307,-3.7824351919161677e307,-3.792415231736527e307,-3.8023952715568865e307,-3.8123753113772455e307,-3.822355351197605e307,-3.8323353910179643e307,-3.8423154308383233e307,-3.8522954706586827e307,-3.8622755104790416e307,-3.872255550299401e307,-3.8822355901197605e307,-3.89221562994012e307,-3.902195669760479e307,-3.912175709580839e307,-3.9221557494011977e307,-3.9321357892215566e307,-3.9421158290419166e307,-3.9520958688622755e307,-3.962075908682635e307,-3.9720559485029943e307,-3.9820359883233533e307,-3.9920160281437127e307,-4.001996067964072e307,-4.011976107784431e307,-4.0219561476047905e307,-4.0319361874251494e307,-4.041916227245509e307,-4.051896267065869e307,-4.061876306886227e307,-4.0718563467065866e307,-4.0818363865269466e307,-4.091816426347305e307,-4.101796466167665e307,-4.1117765059880244e307,-4.1217565458083833e307,-4.1317365856287427e307,-4.1417166254491016e307,-4.151696665269461e307,-4.1616767050898205e307,-4.1716567449101794e307,-4.181636784730539e307,-4.1916168245508983e307,-4.201596864371257e307,-4.211576904191617e307,-4.221556944011976e307,-4.231536983832335e307,-4.241517023652695e307,-4.251497063473054e307,-4.2614771032934133e307,-4.2714571431137727e307,-4.281437182934132e307,-4.291417222754491e307,-4.30139726257485e307,-4.31137730239521e307,-4.321357342215569e307,-4.3313373820359283e307,-4.341317421856287e307,-4.3512974616766467e307,-4.361277501497006e307,-4.371257541317365e307,-4.3812375811377244e307,-4.391217620958084e307,-4.4011976607784433e307,-4.411177700598802e307,-4.421157740419162e307,-4.431137780239521e307,-4.44111782005988e307,-4.45109785988024e307,-4.4610778997005984e307,-4.4710579395209583e307,-4.4810379793413177e307,-4.4910180191616767e307,-4.500998058982036e307,-4.510978098802395e307,-4.520958138622754e307,-4.530938178443114e307,-4.540918218263473e307,-4.550898258083833e307,-4.560878297904192e307,-4.570858337724551e307,-4.58083837754491e307,-4.590818417365269e307,-4.600798457185629e307,-4.610778497005987e307,-4.620758536826348e307,-4.630738576646706e307,-4.640718616467066e307,-4.650698656287426e307,-4.660678696107784e307,-4.670658735928143e307,-4.680638775748503e307,-4.690618815568863e307,-4.700598855389221e307,-4.710578895209582e307,-4.72055893502994e307,-4.730538974850299e307,-4.740519014670659e307,-4.750499054491018e307,-4.760479094311377e307,-4.770459134131736e307,-4.780439173952097e307,-4.790419213772455e307,-4.800399253592814e307,-4.810379293413174e307,-4.820359333233532e307,-4.830339373053893e307,-4.840319412874252e307,-4.850299452694611e307,-4.86027949251497e307,-4.870259532335329e307,-4.880239572155689e307,-4.890219611976047e307,-4.900199651796407e307,-4.910179691616766e307,-4.920159731437126e307,-4.930139771257485e307,-4.940119811077844e307,-4.950099850898203e307,-4.960079890718563e307,-4.970059930538923e307,-4.980039970359281e307,-4.990020010179641e307,-5.00000005e307,-5.009980089820359e307,-5.019960129640719e307,-5.029940169461078e307,-5.039920209281437e307,-5.049900249101796e307,-5.059880288922156e307,-5.069860328742515e307,-5.079840368562874e307,-5.089820408383233e307,-5.099800448203593e307,-5.109780488023953e307,-5.119760527844311e307,-5.129740567664671e307,-5.13972060748503e307,-5.149700647305389e307,-5.159680687125749e307,-5.169660726946108e307,-5.179640766766467e307,-5.189620806586826e307,-5.199600846407187e307,-5.209580886227545e307,-5.2195609260479035e307,-5.229540965868263e307,-5.239521005688623e307,-5.249501045508982e307,-5.259481085329341e307,-5.269461125149701e307,-5.279441164970059e307,-5.28942120479042e307,-5.299401244610779e307,-5.309381284431137e307,-5.319361324251497e307,-5.329341364071857e307,-5.339321403892216e307,-5.349301443712575e307,-5.359281483532935e307,-5.369261523353293e307,-5.379241563173652e307,-5.389221602994013e307,-5.399201642814371e307,-5.40918168263473e307,-5.41916172245509e307,-5.42914176227545e307,-5.439121802095808e307,-5.449101841916168e307,-5.459081881736527e307,-5.469061921556886e307,-5.479041961377247e307,-5.489022001197605e307,-5.499002041017964e307,-5.508982080838323e307,-5.518962120658683e307,-5.528942160479042e307,-5.5389222002994e307,-5.548902240119761e307,-5.55888227994012e307,-5.568862319760479e307,-5.578842359580839e307,-5.588822399401197e307,-5.598802439221556e307,-5.608782479041917e307,-5.618762518862276e307,-5.628742558682634e307,-5.638722598502995e307,-5.648702638323353e307,-5.658682678143712e307,-5.668662717964073e307,-5.678642757784431e307,-5.68862279760479e307,-5.69860283742515e307,-5.70858287724551e307,-5.718562917065868e307,-5.728542956886227e307,-5.738522996706587e307,-5.748503036526946e307,-5.758483076347306e307,-5.768463116167665e307,-5.778443155988024e307,-5.788423195808384e307,-5.798403235628743e307,-5.808383275449102e307,-5.818363315269461e307,-5.82834335508982e307,-5.83832339491018e307,-5.84830343473054e307,-5.858283474550898e307,-5.868263514371257e307,-5.878243554191616e307,-5.888223594011976e307,-5.898203633832336e307,-5.908183673652694e307,-5.918163713473054e307,-5.928143753293414e307,-5.938123793113772e307,-5.948103832934132e307,-5.958083872754491e307,-5.96806391257485e307,-5.97804395239521e307,-5.98802399221557e307,-5.998004032035928e307,-6.007984071856287e307,-6.017964111676646e307,-6.027944151497006e307,-6.037924191317366e307,-6.047904231137724e307,-6.057884270958084e307,-6.067864310778444e307,-6.077844350598802e307,-6.087824390419162e307,-6.097804430239521e307,-6.10778447005988e307,-6.11776450988024e307,-6.1277445497006e307,-6.137724589520958e307,-6.147704629341316e307,-6.157684669161678e307,-6.167664708982036e307,-6.177644748802395e307,-6.187624788622754e307,-6.197604828443114e307,-6.207584868263473e307,-6.217564908083832e307,-6.227544947904192e307,-6.23752498772455e307,-6.24750502754491e307,-6.25748506736527e307,-6.267465107185629e307,-6.277445147005988e307,-6.287425186826347e307,-6.297405226646707e307,-6.307385266467066e307,-6.317365306287426e307,-6.327345346107784e307,-6.337325385928143e307,-6.347305425748504e307,-6.357285465568862e307,-6.367265505389221e307,-6.377245545209581e307,-6.387225585029941e307,-6.397205624850299e307,-6.40718566467066e307,-6.417165704491018e307,-6.427145744311376e307,-6.437125784131738e307,-6.447105823952096e307,-6.457085863772455e307,-6.467065903592814e307,-6.477045943413174e307,-6.487025983233533e307,-6.497006023053891e307,-6.506986062874252e307,-6.51696610269461e307,-6.52694614251497e307,-6.53692618233533e307,-6.546906222155689e307,-6.556886261976047e307,-6.566866301796407e307,-6.576846341616767e307,-6.586826381437125e307,-6.596806421257486e307,-6.606786461077844e307,-6.616766500898204e307,-6.626746540718564e307,-6.636726580538922e307,-6.646706620359281e307,-6.65668666017964e307,-6.666666700000001e307,-6.676646739820359e307,-6.686626779640719e307,-6.696606819461078e307,-6.706586859281436e307,-6.716566899101797e307,-6.726546938922156e307,-6.736526978742515e307,-6.746507018562874e307,-6.756487058383235e307,-6.766467098203593e307,-6.776447138023952e307,-6.786427177844311e307,-6.79640721766467e307,-6.806387257485031e307,-6.816367297305389e307,-6.826347337125749e307,-6.836327376946107e307,-6.846307416766466e307,-6.856287456586827e307,-6.866267496407185e307,-6.876247536227545e307,-6.886227576047904e307,-6.896207615868264e307,-6.906187655688623e307,-6.916167695508982e307,-6.926147735329341e307,-6.9361277751497e307,-6.946107814970061e307,-6.956087854790419e307,-6.966067894610779e307,-6.976047934431137e307,-6.986027974251497e307,-6.996008014071857e307,-7.005988053892215e307,-7.015968093712575e307,-7.025948133532934e307,-7.035928173353294e307,-7.045908213173653e307,-7.055888252994012e307,-7.065868292814371e307,-7.07584833263473e307,-7.085828372455091e307,-7.095808412275449e307,-7.105788452095808e307,-7.115768491916168e307,-7.125748531736527e307,-7.135728571556886e307,-7.145708611377246e307,-7.155688651197605e307,-7.165668691017963e307,-7.175648730838324e307,-7.185628770658683e307,-7.195608810479041e307,-7.205588850299401e307,-7.215568890119761e307,-7.22554892994012e307,-7.235528969760479e307,-7.245509009580839e307,-7.255489049401197e307,-7.265469089221557e307,-7.275449129041917e307,-7.285429168862275e307,-7.295409208682634e307,-7.305389248502994e307,-7.315369288323354e307,-7.325349328143712e307,-7.335329367964072e307,-7.345309407784431e307,-7.35528944760479e307,-7.365269487425151e307,-7.375249527245509e307,-7.385229567065868e307,-7.395209606886228e307,-7.405189646706588e307,-7.415169686526946e307,-7.425149726347305e307,-7.435129766167665e307,-7.445109805988024e307,-7.455089845808384e307,-7.465069885628743e307,-7.475049925449102e307,-7.48502996526946e307,-7.495010005089821e307,-7.50499004491018e307,-7.514970084730538e307,-7.524950124550899e307,-7.534930164371257e307,-7.544910204191617e307,-7.554890244011977e307,-7.564870283832335e307,-7.574850323652694e307,-7.584830363473055e307,-7.594810403293414e307,-7.604790443113772e307,-7.614770482934132e307,-7.624750522754491e307,-7.63473056257485e307,-7.64471060239521e307,-7.654690642215569e307,-7.664670682035928e307,-7.674650721856287e307,-7.684630761676648e307,-7.694610801497006e307,-7.704590841317365e307,-7.714570881137725e307,-7.724550920958084e307,-7.734530960778444e307,-7.744511000598802e307,-7.754491040419162e307,-7.764471080239521e307,-7.77445112005988e307,-7.78443115988024e307,-7.794411199700598e307,-7.804391239520958e307,-7.814371279341318e307,-7.824351319161677e307,-7.834331358982036e307,-7.844311398802395e307,-7.854291438622754e307,-7.864271478443114e307,-7.874251518263474e307,-7.884231558083832e307,-7.894211597904192e307,-7.904191637724551e307,-7.91417167754491e307,-7.92415171736527e307,-7.934131757185628e307,-7.944111797005988e307,-7.954091836826348e307,-7.964071876646707e307,-7.974051916467066e307,-7.984031956287425e307,-7.994011996107784e307,-8.003992035928144e307,-8.013972075748504e307,-8.023952115568862e307,-8.033932155389222e307,-8.043912195209582e307,-8.05389223502994e307,-8.063872274850299e307,-8.073852314670659e307,-8.083832354491018e307,-8.093812394311377e307,-8.103792434131738e307,-8.113772473952096e307,-8.123752513772454e307,-8.133732553592814e307,-8.143712593413174e307,-8.153692633233533e307,-8.163672673053892e307,-8.173652712874252e307,-8.183632752694611e307,-8.19361279251497e307,-8.20359283233533e307,-8.213572872155688e307,-8.223552911976048e307,-8.233532951796408e307,-8.243512991616767e307,-8.253493031437125e307,-8.263473071257485e307,-8.273453111077844e307,-8.283433150898203e307,-8.293413190718564e307,-8.303393230538922e307,-8.313373270359281e307,-8.323353310179642e307,-8.33333335e307,-8.343313389820359e307,-8.353293429640719e307,-8.363273469461078e307,-8.373253509281437e307,-8.383233549101797e307,-8.393213588922156e307,-8.403193628742514e307,-8.413173668562875e307,-8.423153708383234e307,-8.433133748203593e307,-8.443113788023951e307,-8.453093827844312e307,-8.463073867664671e307,-8.473053907485029e307,-8.48303394730539e307,-8.493013987125748e307,-8.502994026946107e307,-8.512974066766468e307,-8.522954106586827e307,-8.532934146407185e307,-8.542914186227545e307,-8.552894226047905e307,-8.562874265868263e307,-8.572854305688623e307,-8.582834345508982e307,-8.592814385329341e307,-8.602794425149701e307,-8.61277446497006e307,-8.622754504790419e307,-8.632734544610778e307,-8.642714584431139e307,-8.652694624251497e307,-8.662674664071857e307,-8.672654703892216e307,-8.682634743712574e307,-8.692614783532935e307,-8.702594823353293e307,-8.712574863173653e307,-8.722554902994012e307,-8.732534942814371e307,-8.742514982634731e307,-8.75249502245509e307,-8.762475062275449e307,-8.772455102095808e307,-8.782435141916168e307,-8.792415181736527e307,-8.802395221556887e307,-8.812375261377245e307,-8.822355301197604e307,-8.832335341017965e307,-8.842315380838323e307,-8.852295420658683e307,-8.862275460479042e307,-8.872255500299402e307,-8.882235540119761e307,-8.892215579940119e307,-8.902195619760479e307,-8.912175659580838e307,-8.922155699401198e307,-8.932135739221557e307,-8.942115779041917e307,-8.952095818862275e307,-8.962075858682634e307,-8.972055898502995e307,-8.982035938323353e307,-8.992015978143713e307,-9.001996017964071e307,-9.011976057784432e307,-9.02195609760479e307,-9.03193613742515e307,-9.041916177245509e307,-9.051896217065867e307,-9.061876256886228e307,-9.071856296706586e307,-9.081836336526947e307,-9.091816376347305e307,-9.101796416167663e307,-9.111776455988024e307,-9.121756495808384e307,-9.131736535628743e307,-9.141716575449101e307,-9.151696615269462e307,-9.16167665508982e307,-9.17165669491018e307,-9.181636734730539e307,-9.191616774550897e307,-9.201596814371258e307,-9.211576854191616e307,-9.221556894011977e307,-9.231536933832337e307,-9.241516973652695e307,-9.251497013473054e307,-9.261477053293412e307,-9.271457093113773e307,-9.281437132934131e307,-9.29141717275449e307,-9.30139721257485e307,-9.31137725239521e307,-9.321357292215569e307,-9.33133733203593e307,-9.341317371856288e307,-9.351297411676646e307,-9.361277451497007e307,-9.371257491317365e307,-9.381237531137723e307,-9.391217570958084e307,-9.401197610778442e307,-9.411177650598803e307,-9.421157690419163e307,-9.431137730239522e307,-9.44111777005988e307,-9.45109780988024e307,-9.461077849700599e307,-9.471057889520957e307,-9.481037929341316e307,-9.491017969161676e307,-9.500998008982037e307,-9.510978048802397e307,-9.520958088622756e307,-9.530938128443114e307,-9.540918168263472e307,-9.550898208083833e307,-9.560878247904191e307,-9.57085828772455e307,-9.58083832754491e307,-9.59081836736527e307,-9.600798407185629e307,-9.610778447005987e307,-9.620758486826348e307,-9.630738526646706e307,-9.640718566467067e307,-9.650698606287425e307,-9.660678646107784e307,-9.670658685928142e307,-9.680638725748504e307,-9.690618765568863e307,-9.700598805389223e307,-9.710578845209582e307,-9.72055888502994e307,-9.730538924850299e307,-9.740518964670657e307,-9.750499004491017e307,-9.760479044311378e307,-9.770459084131738e307,-9.780439123952097e307,-9.790419163772455e307,-9.800399203592814e307,-9.810379243413174e307,-9.820359283233534e307,-9.830339323053893e307,-9.840319362874251e307,-9.85029940269461e307,-9.860279442514968e307,-9.87025948233533e307,-9.88023952215569e307,-9.89021956197605e307,-9.900199601796408e307,-9.910179641616766e307,-9.920159681437125e307,-9.930139721257483e307,-9.940119761077844e307,-9.950099800898204e307,-9.960079840718564e307,-9.970059880538923e307,-9.980039920359281e307,-9.99001996017964e307,-1.0e308]}
},{}],163:[function(require,module,exports){
module.exports={"expected":[1.0e-300,1.0019899700803996e-305,5.00997495012525e-306,3.3399888778370363e-306,2.5049937500405933e-306,2.003996004031968e-306,1.6699972278046017e-306,1.4314265367579942e-306,1.2524984437706837e-306,1.113332104956911e-306,1.0019990060169862e-306,9.109082702635492e-307,8.349993111255683e-307,7.707686443921621e-307,7.157137806248462e-307,6.679995604562892e-307,6.2624961407367526e-307,5.894114231939694e-307,5.566663623557219e-307,5.2736814820900544e-307,5.009997540091208e-307,4.7714263424908375e-307,4.554543425703383e-307,4.3565198847682755e-307,4.174998298688193e-307,4.007998433674212e-307,3.853844707172141e-307,3.711109770988138e-307,3.578570183740229e-307,3.4551712545235752e-307,3.3399989178403507e-307,3.232257052089807e-307,3.1312490508401315e-307,3.0363627447771213e-307,2.947057984484668e-307,2.8628563518908304e-307,2.7833325864724224e-307,2.708107401804421e-307,2.6368414363381198e-307,2.5692301348285587e-307,2.504999397547645e-307,2.4439018661976355e-307,2.385713740408288e-307,2.330232038443599e-307,2.277272231448455e-307,2.2266661931289897e-307,2.1782604168658787e-307,2.131914460430147e-307,2.0874995851094575e-307,2.044897561471964e-307,2.0039996184384724e-307,1.964705515993148e-307,1.9269227248891176e-307,1.8905656992175756e-307,1.855555229802526e-307,1.8218178681342688e-307,1.7892854120242857e-307,1.7578944454017103e-307,1.7275859257170491e-307,1.698304813304841e-307,1.6699997378100412e-307,1.6426226974249252e-307,1.616128787232087e-307,1.5904759534195363e-307,1.5656247705381197e-307,1.5415382393197954e-307,1.5181816028760636e-307,1.4955221793562331e-307,1.473529209371135e-307,1.4521737166843367e-307,1.4314283808441068e-307,1.4112674205788777e-307,1.3916664869097454e-307,1.372602565048249e-307,1.3540538842483777e-307,1.3359998348704203e-307,1.3184208919924018e-307,1.301298544973876e-307,1.284615232437888e-307,1.2683542821910123e-307,1.2524998556493915e-307,1.2370368963813603e-307,1.2219510824152443e-307,1.207228781994789e-307,1.1928570124949122e-307,1.1788234022375224e-307,1.165116154971349e-307,1.1517240168014396e-307,1.1386362453734627e-307,1.1258425811354745e-307,1.113333220515567e-307,1.101098790868022e-307,1.0891303270534132e-307,1.077419249529667e-307,1.0659573438415672e-307,1.0547367414056605e-307,1.043749901496103e-307,1.0329895943447855e-307,1.0224488852761436e-307,1.0121211198034978e-307,1.0019999096196082e-307,9.920791194194766e-308,9.823528544982776e-308,9.72815449071739e-308,9.634614552703473e-308,9.542856327624561e-308,9.452829389647628e-308,9.36448519801736e-308,9.277777009784014e-308,9.192659797335304e-308,9.109090170426505e-308,9.027026302425184e-308,8.946427860507073e-308,8.867255939558361e-308,8.789472999556839e-308,8.713042806220088e-308,8.637930374723593e-308,8.564101916305111e-308,8.491524787584075e-308,8.420167442436314e-308,8.349999386275046e-308,8.280991132598911e-308,8.213114161677011e-308,8.146340881249297e-308,8.080644589128552e-308,8.015999437597481e-308,7.952380399501172e-308,7.889763235941509e-308,7.828124465485877e-308,7.76744133480804e-308,7.707691790684059e-308,7.648854453270821e-308,7.590908590599206e-308,7.533834094217909e-308,7.477611455927855e-308,7.422221745550648e-308,7.367646589677798e-308,7.31386815135066e-308,7.260869110623848e-308,7.208632645967626e-308,7.157142416467375e-308,7.106382544780471e-308,7.056337600813356e-308,7.006992586083451e-308,6.958332918732664e-308,6.910344419161023e-308,6.863013296250727e-308,6.816326134152458e-308,6.7702698796074e-308,6.724831829779762e-308,6.679999620576021e-308,6.635761215428291e-308,6.59210489452045e-308,6.549019244436774e-308,6.506493148213884e-308,6.464515775777751e-308,6.423076574748541e-308,6.382165261596838e-308,6.341771813135733e-308,6.301886458333944e-308,6.262499670435954e-308,6.223602159375813e-308,6.185184864471896e-308,6.147238947390584e-308,6.109755785367356e-308,6.072726964674396e-308,6.0361442743243e-308,5.999999700000014e-308,5.964285418201545e-308,5.928993790600483e-308,5.894117358593786e-308,5.859648838048644e-308,5.825581114230679e-308,5.79190723690803e-308,5.758620415624269e-308,5.7257140151334e-308,5.693181550990457e-308,5.661016685291594e-308,5.629213222557771e-308,5.597765105756387e-308,5.566666412455567e-308,5.535911351105899e-308,5.5054942574447635e-308,5.475409591018554e-308,5.445651931818299e-308,5.416215977024408e-308,5.38709653785641e-308,5.358288536523788e-308,5.329787003274116e-308,5.301587073534906e-308,5.273683985145715e-308,5.24607307567721e-308,5.218749779833993e-308,5.191709626938183e-308,5.164948238490815e-308,5.138461325808293e-308,5.112244687731162e-308,5.086294208402699e-308,5.060605855114792e-308,5.03517567621879e-308,5.009999799099008e-308,4.985074428206736e-308,4.960395843152641e-308,4.935960396855549e-308,4.911764513745683e-308,4.887804688020471e-308,4.86407748195118e-308,4.840579524238613e-308,4.817307508416242e-308,4.794258191299199e-308,4.771428391477558e-308,4.748814987852481e-308,4.726414918213783e-308,4.704225177857575e-308,4.682242818242647e-308,4.660464945684376e-308,4.638888720084883e-308,4.617511353698322e-308,4.596330109930147e-308,4.575342302169268e-308,4.554545292652072e-308,4.533936491357268e-308,4.513513354930611e-308,4.493273385638567e-308,4.473214130349974e-308,4.453333179544894e-308,4.433628166349759e-308,4.414096765598018e-308,4.3947366929155173e-308,4.375545703829833e-308,4.3565215929028397e-308,4.33766219288582e-308,4.318965373896408e-308,4.30042904261674e-308,4.2820511415121674e-308,4.263829648069901e-308,4.245762574057028e-308,4.2278479647973124e-308,4.2100838984662143e-308,4.1924684854036216e-308,4.1749998674437533e-308,4.157676217261759e-308,4.140495737736498e-308,4.1234566613290697e-308,4.106557249476624e-308,4.089795792001003e-308,4.0731706065318306e-308,4.056680037943586e-308,4.040322457806325e-308,4.024096263849619e-308,4.0079998794393636e-308,3.992031753067098e-308,3.976190357851477e-308,3.9604741910515745e-308,3.9448817735916697e-308,3.929411649597236e-308,3.9140623859417754e-308,3.8988325718042696e-308,3.8837208182368887e-308,3.8687257577427317e-308,3.8538460438633175e-308,3.839080350775535e-308,3.8244273728978524e-308,3.8098858245054897e-308,3.795454439354342e-308,3.781131970313424e-308,3.7669171890056e-308,3.7528088854563846e-308,3.7388058677506147e-308,3.7249069616967734e-308,3.7111110104987674e-308,3.6974168744349913e-308,3.6838234305444453e-308,3.6703295723197703e-308,3.656934209407004e-308,3.64363626731187e-308,3.6304346871124793e-308,3.617328425178227e-308,3.60431645289478e-308,3.591397756394961e-308,3.578571336295411e-308,3.5658362074388647e-308,3.5531913986419215e-308,3.5406359524481537e-308,3.528168924886433e-308,3.515789385234351e-308,3.503496415786593e-308,3.4912891116281635e-308,3.479166580412329e-308,3.4671279421431755e-308,3.4551723289626655e-308,3.4432988849420786e-308,3.4315067658777466e-308,3.419795139090964e-308,3.408163183231989e-308,3.396610088088023e-308,3.3851350543950894e-308,3.373737293653711e-308,3.3624160279482924e-308,3.351170489770138e-308,3.339999921844001e-308,3.328903576958093e-308,3.3178807177974665e-308,3.30693061678071e-308,3.296052555899846e-308,3.285245826563398e-308,3.274509729442524e-308,3.263843574320153e-308,3.2532466799430788e-308,3.2427183738768986e-308,3.232257992363789e-308,3.221864880183003e-308,3.2115383905140545e-308,3.201277884802541e-308,3.191082732628506e-308,3.1809523115773256e-308,3.1708860071130436e-308,3.160883212454101e-308,3.150943328451408e-308,3.141065763468717e-308,3.131249933265236e-308,3.1214952608804274e-308,3.111801176520969e-308,3.1021671174497994e-308,3.0925925278772306e-308,3.083076858854061e-308,3.0736195681666615e-308,3.0642201202339883e-308,3.054877986006471e-308,3.0455926428667523e-308,3.0363635745322323e-308,3.0271902709593756e-308,3.018072228249747e-308,3.009008948557748e-308,2.999999940000001e-308,2.9910447165663635e-308,2.9821427980325266e-308,2.9732937098741745e-308,2.964496983182663e-308,2.955752154582192e-308,2.9470587661484442e-308,2.9384163653286446e-308,2.929824504863036e-308,2.921282742707717e-308,2.91279064195883e-308,2.904347770778073e-308,2.8959537023194904e-308,2.887608014657543e-308,2.87931029071641e-308,2.871060118200508e-308,2.862857089526205e-308,2.8547008017546946e-308,2.846590856526021e-308,2.8385268599942223e-308,2.8305084227635747e-308,2.8225351598259085e-308,2.814606690498991e-308,2.8067226383659357e-308,2.7988826312156305e-308,2.791086300984165e-308,2.783333283697223e-308,2.775623219413449e-308,2.767955752168738e-308,2.760330529921454e-308,2.7527472044985515e-308,2.7452054315425793e-308,2.7377048704595547e-308,2.730245184367692e-308,2.7228260400469645e-308,2.715447107889484e-308,2.708108061850695e-308,2.700808579401342e-308,2.69354834148023e-308,2.6863270324477296e-308,2.679144340040036e-308,2.6719999553241606e-308,2.6648935726536335e-308,2.657824889624919e-308,2.6507936070345184e-308,2.6437994288367534e-308,2.6368420621022165e-308,2.629921216976874e-308,2.6230366066418144e-308,2.6161879472736203e-308,2.6093749580053715e-308,2.602597360888245e-308,2.595854880853715e-308,2.5891472456763426e-308,2.5824741859371356e-308,2.5758354349874777e-308,2.56923072891361e-308,2.562659806501659e-308,2.5561224092031967e-308,2.549618281101335e-308,2.543147168877323e-308,2.5367088217776644e-308,2.5303029915817267e-308,2.523929432569841e-308,2.517587901491882e-308,2.511278157536323e-308,2.5049999622997503e-308,2.4987530797568427e-308,2.492537276230787e-308,2.486352320364143e-308,2.480197983090139e-308,2.47407403760439e-308,2.4679802593370384e-308,2.4619164259253005e-308,2.4558823171864193e-308,2.4498777150910146e-308,2.443902403736824e-308,2.4379561693228197e-308,2.432038800123716e-308,2.426150086464833e-308,2.420289820697333e-308,2.414457797173814e-308,2.408653812224252e-308,2.4028776641322914e-308,2.39712915311188e-308,2.3914080812842266e-308,2.3857142526551025e-308,2.380047473092457e-308,2.374407550304351e-308,2.368794293817213e-308,2.363207514954388e-308,2.3576470268150036e-308,2.352112644253125e-308,2.3466041838572035e-308,2.3411214639298196e-308,2.3356643044677006e-308,2.330232527142023e-308,2.324825955278988e-308,2.3194444138406636e-308,2.314087729406099e-308,2.30875573015269e-308,2.303448245837813e-308,2.2981651077807007e-308,2.2929061488445773e-308,2.2876712034190284e-308,2.2824601074026186e-308,2.277272698185744e-308,2.2721088146337177e-308,2.266968297070085e-308,2.2618509872601644e-308,2.256756728394814e-308,2.2516853650744104e-308,2.2466367432930486e-308,2.2416107104229543e-308,2.2366071151990995e-308,2.2316258077040293e-308,2.226666639352889e-308,2.221729462878649e-308,2.216814132317527e-308,2.2119205029946057e-308,2.207048431509636e-308,2.202197775723029e-308,2.197368394742036e-308,2.192560148907105e-308,2.1877728997784183e-308,2.183006510122603e-308,2.178260843899622e-308,2.1735357662498296e-308,2.1688311434811946e-308,2.164146843056692e-308,2.15948273358186e-308,2.154838684792508e-308,2.150214567542596e-308,2.1456102537922593e-308,2.14102561659599e-308,2.136460530090971e-308,2.131914869485559e-308,2.127388511047913e-308,2.1228813320947644e-308,2.118393210980338e-308,2.113924027085403e-308,2.109473660806471e-308,2.105041993545124e-308,2.1006289076974807e-308,2.0962342866437917e-308,2.091858014738168e-308,2.087499977298438e-308,2.083160060596125e-308,2.078838151846559e-308,2.0745341391991053e-308,2.070247911727512e-308,2.0659793594203845e-308,2.061728373171773e-308,2.0574948447718716e-308,2.0532786668978436e-308,2.0490797331047463e-308,2.044897937816577e-308,2.040733176317421e-308,2.036585344742713e-308,2.0324543400706034e-308,2.028340060113426e-308,2.0242424035092747e-308,2.0201612697136775e-308,2.0160965589913726e-308,2.0120481724081867e-308,2.008016011823005e-308,2.00399997987984e-308,1.99999998e-308,1.9960159163743435e-308,1.99204769395563e-308,1.9880952184509637e-308,1.9841583963143224e-308,1.9802371347391775e-308,1.976331341651203e-308,1.9724409257010665e-308,1.9685657962573096e-308,1.964705863399308e-308,1.9608610379103175e-308,1.957031231270599e-308,1.953216355650628e-308,1.949416323904374e-308,1.945631049562673e-308,1.9418604468266634e-308,1.9381044305613027e-308,1.934362916288964e-308,1.9306358201831005e-308,1.9269230590619823e-308,1.9232245503825136e-308,1.919540212234113e-308,1.9158699633326637e-308,1.9122137230145394e-308,1.908571411230694e-308,1.9049429485408204e-308,1.901328256107573e-308,1.8977272556908577e-308,1.89413986964219e-308,1.89056602089911e-308,1.887005632979667e-308,1.8834586299769636e-308,1.879924936553756e-308,1.876404477937129e-308,1.872897179913215e-308,1.8694029688219815e-308,1.8659217715520737e-308,1.862453515535717e-308,1.8589981287436713e-308,1.855555539680247e-308,1.8521256773783744e-308,1.8487084713947253e-308,1.84530385180489e-308,1.8419117491986103e-308,1.838532094675061e-308,1.8351648198381836e-308,1.831809856792075e-308,1.828467138136422e-308,1.825136596961987e-308,1.821818166846149e-308,1.818511781848479e-308,1.81521737650638e-308,1.8119348858307633e-308,1.8086642453017767e-308,1.8054053908645733e-308,1.8021582589251333e-308,1.7989227863461284e-308,1.795698910442826e-308,1.7924865689790417e-308,1.789285700163138e-308,1.7860962426440567e-308,1.7829181355074023e-308,1.779751318271566e-308,1.7765957308838843e-308,1.773451313716845e-308,1.7703180075643347e-308,1.767195753637916e-308,1.764084493563157e-308,1.7609841693759904e-308,1.757894723519114e-308,1.7548160988384283e-308,1.751748238579515e-308,1.7486910863841454e-308,1.7456445862868314e-308,1.74260868271141e-308,1.739583320467665e-308,1.7365684447479795e-308,1.733564001124029e-308,1.730569935543505e-308,1.7275861943268725e-308,1.724612724164166e-308,1.721649472111808e-308,1.718696385589472e-308,1.7157534123769707e-308,1.712820500611177e-308,1.7098975987829795e-308,1.7069846557342654e-308,1.7040816206549357e-308,1.7011884430799524e-308,1.698305072886412e-308,1.695431460290654e-308,1.692567555845394e-308,1.6897133104368846e-308,1.686868675282114e-308,1.6840336019260225e-308,1.681208042238751e-308,1.678391948412919e-308,1.675585272960929e-308,1.6727879687122944e-308,1.669999988811e-308,1.667221286712883e-308,1.6644518161830446e-308,1.6616915312932853e-308,1.6589403864195647e-308,1.6561983362394917e-308,1.653465335729831e-308,1.6507413401640394e-308,1.648026305109829e-308,1.6453201864267516e-308,1.6426229402638e-308,1.639934523057047e-308,1.6372548915272973e-308,1.634584002677762e-308,1.6319218137917645e-308,1.629268282430458e-308,1.6266233664305746e-308,1.6239870239021877e-308,1.621359213226506e-308,1.6187398930536773e-308,1.6161290223006247e-308,1.613526560148895e-308,1.610932466042535e-308,1.6083466996859807e-308,1.6057692210419746e-308,1.603199990329498e-308,1.6006389680217213e-308,1.5980861148439823e-308,1.595541391771776e-308,1.5930047600287637e-308,1.5904761810848073e-308,1.587955616654017e-308,1.5854430286928176e-308,1.582938379398037e-308,1.5804416312050074e-308,1.5779527467856905e-308,1.5754716890468137e-308,1.572998421128031e-308,1.5705329064000946e-308,1.5680751084630474e-308,1.5656249911444336e-308,1.5631825184975214e-308,1.5607476547995455e-308,1.5583203645499687e-308,1.5559006124687516e-308,1.5534883634946456e-308,1.551083582783502e-308,1.54868623570659e-308,1.546296287848937e-308,1.5439137050076805e-308,1.541538453190438e-308,1.539170498613689e-308,1.5368098077011743e-308,1.5344563470823083e-308,1.532110083590607e-308,1.529770984262129e-308,1.5274390163339346e-308,1.5251141472425513e-308,1.522796344622463e-308,1.5204855763046044e-308,1.5181818103148763e-308,1.5158850148726657e-308,1.51359515838939e-308,1.5113122094670463e-308,1.5090361368967734e-308,1.5067669096574366e-308,1.5045044969142117e-308,1.502248868017191e-308,1.4999999925e-308,1.497757840078425e-308,1.4955223806490533e-308,1.493293584287926e-308,1.491071421249203e-308,1.48885586196384e-308,1.486646877038276e-308,1.484444437253136e-308,1.4822485135619374e-308,1.4800590770898194e-308,1.4778760991322734e-308,1.475699551153889e-308,1.473529404787111e-308,1.471365631831008e-308,1.469208204250049e-308,1.467057094172896e-308,1.4649122738911973e-308,1.462773715858405e-308,1.4606413926885907e-308,1.4585152771552793e-308,1.456395342190289e-308,1.454281560882582e-308,1.4521739064771267e-308,1.4500723523737696e-308,1.4479768721261153e-308,1.4458874394404154e-308,1.443804028174472e-308,1.441726612336546e-308,1.4396551660842747e-308,1.4375896637236036e-308,1.43553007970772e-308,1.433476388636004e-308,1.4314285652529797e-308,1.4293865844472844e-308,1.427350421250639e-308,1.4253200508368324e-308,1.4232954485207094e-308,1.4212765897571753e-308,1.4192634501401986e-308,1.417256005401831e-308,1.4152542314112326e-308,1.4132581041737005e-308,1.411267599829716e-308,1.4092826946539907e-308,1.407303365054523e-308,1.4053295875716655e-308,1.403361338877198e-308,1.401398595773407e-308,1.3994413351921755e-308,1.3974895341940795e-308,1.39554316996749e-308,1.393602219827685e-308,1.391666661215972e-308,1.389736471698808e-308,1.3878116289669357e-308,1.385892110834524e-308,1.383977895238317e-308,1.3820689602367847e-308,1.380165284009289e-308,1.3782668448552495e-308,1.376373621193319e-308,1.374485591560568e-308,1.372602734611672e-308,1.370725029118106e-308,1.3688524539673474e-308,1.366984988162088e-308,1.3651226108194434e-308,1.363265301170179e-308,1.3614130385579365e-308,1.3595658024384674e-308,1.357723572378875e-308,1.3558863280568593e-308,1.354054049259971e-308,1.3522267158848695e-308,1.3504043079365886e-308,1.3485868055278063e-308,1.346774188878122e-308,1.344966438313337e-308,1.343163534264747e-308,1.341365457268431e-308,1.339572187964554e-308,1.337783707096672e-308,1.33599999551104e-308,1.334221034155932e-308,1.332446804080961e-308,1.330677286436406e-308,1.3289124624725427e-308,1.327152313538985e-308,1.325396821084026e-308,1.323645966653986e-308,1.3218997318925653e-308,1.3201580985402055e-308,1.3184210484334486e-308,1.316688563504311e-308,1.3149606257796515e-308,1.3132372173805543e-308,1.31151832052171e-308,1.3098039175108033e-308,1.308093990747909e-308,1.306388522724885e-308,1.3046874960247803e-308,1.302990893321237e-308,1.301298697377905e-308,1.2996108910478584e-308,1.297927457273014e-308,1.296248379083559e-308,1.2945736395973798e-308,1.292903222019496e-308,1.2912371096415e-308,1.289575285840998e-308,1.2879177340810594e-308,1.286264437909667e-308,1.2846153809591717e-308,1.2829705469457557e-308,1.281329919668893e-308,1.279693483010819e-308,1.278061220936003e-308,1.276433117490624e-308,1.274809156802051e-308,1.2731893230783266e-308,1.2715736006076554e-308,1.2699619737578974e-308,1.2683544269760615e-308,1.266750944787807e-308,1.265151511796947e-308,1.263556112684953e-308,1.26196473221047e-308,1.260377355208829e-308,1.2587939665915633e-308,1.257214551345935e-308,1.2556390945344565e-308,1.2540675812944217e-308,1.2524999968374376e-308,1.2509363264489614e-308,1.249376555487839e-308,1.247820669385849e-308,1.2462686536472487e-308,1.244720493848324e-308,1.243176175636941e-308,1.241635684732107e-308,1.2400990069235247e-308,1.238566128071159e-308,1.237037034104801e-308,1.235511711023641e-308,1.233990144895836e-308,1.23247232185809e-308,1.230958228115232e-308,1.2294478499397945e-308,1.2279411736716045e-308,1.2264381857173676e-308,1.22493887255026e-308,1.2234432207095225e-308,1.2219512168000596e-308,1.2204628474920366e-308,1.218978099520486e-308,1.2174969596849095e-308,1.21601941484889e-308,1.2145454519397024e-308,1.2130750579479274e-308,1.2116082199270683e-308,1.2101449249931734e-308,1.208685160324457e-308,1.2072289131609233e-308,1.2057761708039983e-308,1.204326920616159e-308,1.2028811500205655e-308,1.2014388465006987e-308,1.1999999976e-308,1.1985645909215105e-308,1.1971326141275163e-308,1.195704054939195e-308,1.194278901136264e-308,1.1928571405566327e-308,1.1914387610960567e-308,1.1900237507077936e-308,1.188612097402262e-308,1.1872037892467035e-308,1.185798814364847e-308,1.1843971609365726e-308,1.182998817197582e-308,1.1816037714390685e-308,1.1802120120073916e-308,1.178823527303751e-308,1.177438305783864e-308,1.1760563359576477e-308,1.174677606388898e-308,1.17330210569498e-308,1.1719298225465065e-308,1.1705607456670344e-308,1.169194863832751e-308,1.16783216587217e-308,1.1664726406658254e-308,1.165116277145971e-308,1.1637630642962766e-308,1.1624129911515335e-308,1.161066046797356e-308,1.159722220369888e-308,1.1583815010555113e-308,1.1570438780905543e-308,1.155709340761006e-308,1.1543778784022277e-308,1.15304948039867e-308,1.151724136183591e-308,1.1504018352387757e-308,1.1490825670942577e-308,1.147766321328043e-308,1.1464530875658355e-308,1.145142855480764e-308,1.143835614793113e-308,1.142531355270052e-308,1.14123006672537e-308,1.1399317390192083e-308,1.1386363620577996e-308,1.137343925793205e-308,1.136054420223055e-308,1.1347678353902903e-308,1.1334841613829056e-308,1.132203388333697e-308,1.130925506420007e-308,1.129650505863475e-308,1.1283783769297847e-308,1.1271091099284216e-308,1.125842695212423e-308,1.124579123178134e-308,1.1233183842649663e-308,1.122060468955156e-308,1.120805367773524e-308,1.1195530712872384e-308,1.1183035701055785e-308,1.117056854879699e-308,1.1158129163023993e-308,1.1145717451078875e-308,1.113333332071556e-308,1.1120976680097463e-308,1.1108647437795293e-308,1.1096345502784735e-308,1.108407078444426e-308,1.1071823192552853e-308,1.105960263728784e-308,1.1047409029222673e-308,1.103524227932475e-308,1.102310229895326e-308,1.1010988999857023e-308,1.0998902294172336e-308,1.098684209442088e-308,1.097480831350758e-308,1.0962800864718526e-308,1.0950819661718893e-308,1.093886461855085e-308,1.092693564963152e-308,1.091503266975095e-308,1.0903155594070055e-308,1.089130433811862e-308,1.087947881779329e-308,1.0867678949355593e-308,1.085590464942994e-308,1.0844155835001687e-308,1.083243242341516e-308,1.082073433237175e-308,1.080906147992794e-308,1.079741378449344e-308,1.0785791164829246e-308,1.0774193540045787e-308,1.076262082960101e-308,1.075107295329855e-308,1.073954983128586e-308,1.0728051384052385e-308,1.071657753242769e-308,1.0705128197579715e-308,1.0693703301012906e-308,1.0682302764566444e-308,1.0670926510412475e-308,1.065957446105432e-308,1.0648246539324727e-308,1.0636942668384114e-308,1.062566277171883e-308,1.0614406773139453e-308,1.060317459677904e-308,1.0591966167091437e-308,1.0580781408849597e-308,1.0569620247143887e-308,1.0558482607380404e-308,1.054736841527934e-308,1.053627759687329e-308,1.052521007850567e-308,1.051416578682902e-308,1.050314464880345e-308,1.0492146591694965e-308,1.0481171543073914e-308,1.047021943081338e-308,1.045929018308759e-308,1.0448383728370384e-308,1.0437499995433595e-308,1.0426638913345555e-308,1.041580041146952e-308,1.040498441946216e-308,1.0394190867272e-308,1.0383419685137966e-308,1.0372670803587824e-308,1.0361944153436733e-308,1.035123966578572e-308,1.0340557272020247e-308,1.0329896903808694e-308,1.0319258493100955e-308,1.030864197212696e-308,1.0298047273395236e-308,1.028747432969149e-308,1.027692307407716e-308,1.0266393439888054e-308,1.0255885360732884e-308,1.024539877049193e-308,1.0234933603315593e-308,1.022448979362307e-308,1.0214067276100966e-308,1.0203665985701904e-308,1.019328585764321e-308,1.018292682740556e-308,1.0172588830731634e-308,1.0162271803624785e-308,1.0151975682347726e-308,1.014170040342122e-308,1.0131445903622763e-308,1.0121212119985305e-308,1.011099898979595e-308,1.010080645059468e-308,1.0090634440173054e-308,1.0080482896573e-308,1.0070351758085504e-308,1.006024096324938e-308,1.005015045085004e-308,1.0040080159918234e-308,1.0030030029728826e-308,1.00199999997996e-308,1.000999000989001e-308,1.0e-308],"x":[1.0e300,9.98013982035928e304,1.996017964071856e305,2.9940219461077846e305,3.992025928143713e305,4.99002991017964e305,5.988033892215569e305,6.986037874251497e305,7.984041856287425e305,8.982045838323353e305,9.98004982035928e305,1.097805380239521e306,1.1976057784431138e306,1.2974061766467066e306,1.3972065748502995e306,1.4970069730538922e306,1.5968073712574852e306,1.696607769461078e306,1.7964081676646707e306,1.8962085658682634e306,1.9960089640718562e306,2.095809362275449e306,2.195609760479042e306,2.2954101586826347e306,2.3952105568862274e306,2.4950109550898204e306,2.5948113532934132e306,2.694611751497006e306,2.794412149700599e306,2.894212547904192e306,2.9940129461077844e306,3.0938133443113774e306,3.19361374251497e306,3.293414140718563e306,3.3932145389221553e306,3.493014937125749e306,3.5928153353293414e306,3.6926157335329344e306,3.792416131736527e306,3.89221652994012e306,3.9920169281437123e306,4.091817326347306e306,4.1916177245508984e306,4.291418122754491e306,4.391218520958084e306,4.491018919161676e306,4.5908193173652693e306,4.6906197155688624e306,4.7904201137724554e306,4.890220511976048e306,4.990020910179641e306,5.089821308383233e306,5.1896217065868263e306,5.2894221047904194e306,5.3892225029940124e306,5.489022901197605e306,5.588823299401198e306,5.688623697604791e306,5.788424095808384e306,5.888224494011976e306,5.988024892215569e306,6.08782529041916e306,6.187625688622755e306,6.287426086826348e306,6.38722648502994e306,6.487026883233533e306,6.586827281437126e306,6.686627679640719e306,6.786428077844312e306,6.886228476047904e306,6.986028874251498e306,7.08582927245509e306,7.185629670658683e306,7.285430068862275e306,7.385230467065869e306,7.485030865269462e306,7.584831263473054e306,7.684631661676647e306,7.784432059880239e306,7.884232458083833e306,7.984032856287426e306,8.083833254491018e306,8.183633652694611e306,8.283434050898204e306,8.383234449101797e306,8.483034847305389e306,8.582835245508982e306,8.682635643712576e306,8.782436041916168e306,8.882236440119761e306,8.982036838323353e306,9.081837236526947e306,9.18163763473054e306,9.28143803293413e306,9.381238431137725e306,9.481038829341318e306,9.580839227544911e306,9.680639625748501e306,9.780440023952096e306,9.88024042215569e306,9.980040820359282e306,1.0079841218562874e307,1.0179641616766467e307,1.0279442014970061e307,1.0379242413173654e307,1.0479042811377244e307,1.0578843209580839e307,1.0678643607784432e307,1.0778444005988024e307,1.0878244404191615e307,1.097804480239521e307,1.1077845200598804e307,1.1177645598802395e307,1.1277445997005988e307,1.1377246395209582e307,1.1477046793413176e307,1.1576847191616768e307,1.167664758982036e307,1.1776447988023952e307,1.1876248386227546e307,1.1976048784431138e307,1.207584918263473e307,1.2175649580838324e307,1.2275449979041918e307,1.237525037724551e307,1.24750507754491e307,1.2574851173652696e307,1.2674651571856288e307,1.277445197005988e307,1.2874252368263474e307,1.2974052766467066e307,1.307385316467066e307,1.3173653562874252e307,1.3273453961077843e307,1.3373254359281438e307,1.347305475748503e307,1.3572855155688624e307,1.3672655553892216e307,1.3772455952095807e307,1.3872256350299404e307,1.3972056748502993e307,1.4071857146706585e307,1.417165754491018e307,1.4271457943113774e307,1.4371258341317366e307,1.4471058739520957e307,1.4570859137724552e307,1.4670659535928146e307,1.4770459934131735e307,1.4870260332335327e307,1.4970060730538924e307,1.5069861128742516e307,1.5169661526946107e307,1.5269461925149702e307,1.5369262323353294e307,1.5469062721556885e307,1.5568863119760477e307,1.5668663517964071e307,1.5768463916167666e307,1.5868264314371258e307,1.5968064712574852e307,1.6067865110778444e307,1.6167665508982035e307,1.626746590718563e307,1.6367266305389221e307,1.6467066703592813e307,1.6566867101796408e307,1.6666667500000002e307,1.6766467898203594e307,1.6866268296407185e307,1.696606869461078e307,1.7065869092814372e307,1.7165669491017963e307,1.7265469889221555e307,1.7365270287425152e307,1.7465070685628744e307,1.7564871083832335e307,1.766467148203593e307,1.776447188023952e307,1.7864272278443113e307,1.7964072676646705e307,1.80638730748503e307,1.8163673473053894e307,1.8263473871257486e307,1.836327426946108e307,1.8463074667664672e307,1.856287506586826e307,1.8662675464071858e307,1.876247586227545e307,1.8862276260479041e307,1.8962076658682636e307,1.906187705688623e307,1.9161677455089822e307,1.926147785329341e307,1.9361278251497005e307,1.94610786497006e307,1.9560879047904191e307,1.9660679446107783e307,1.976047984431138e307,1.9860280242514972e307,1.9960080640718563e307,2.0059881038922155e307,2.0159681437125747e307,2.0259481835329341e307,2.0359282233532933e307,2.0459082631736527e307,2.0558883029940122e307,2.0658683428143714e307,2.0758483826347305e307,2.0858284224550897e307,2.095808462275449e307,2.1057885020958086e307,2.1157685419161678e307,2.125748581736527e307,2.1357286215568864e307,2.1457086613772458e307,2.1556887011976047e307,2.165668741017964e307,2.1756487808383233e307,2.1856288206586828e307,2.195608860479042e307,2.205588900299401e307,2.2155689401197608e307,2.2255489799401197e307,2.235529019760479e307,2.2455090595808383e307,2.2554890994011975e307,2.265469139221557e307,2.2754491790419164e307,2.2854292188622753e307,2.295409258682635e307,2.305389298502994e307,2.315369338323353e307,2.325349378143713e307,2.335329417964072e307,2.345309457784431e307,2.355289497604791e307,2.3652695374251497e307,2.375249577245509e307,2.385229617065868e307,2.395209656886228e307,2.405189696706587e307,2.415169736526946e307,2.4251497763473053e307,2.435129816167664e307,2.445109855988024e307,2.455089895808383e307,2.4650699356287425e307,2.475049975449102e307,2.4850300152694614e307,2.4950100550898203e307,2.5049900949101797e307,2.514970134730539e307,2.524950174550898e307,2.534930214371258e307,2.5449102541916165e307,2.5548902940119764e307,2.5648703338323353e307,2.574850373652694e307,2.584830413473054e307,2.5948104532934126e307,2.6047904931137725e307,2.614770532934132e307,2.624750572754491e307,2.6347306125748503e307,2.64471065239521e307,2.6546906922155687e307,2.664670732035928e307,2.674650771856288e307,2.6846308116766465e307,2.6946108514970064e307,2.7045908913173653e307,2.7145709311377243e307,2.724550970958084e307,2.7345310107784426e307,2.7445110505988025e307,2.7544910904191615e307,2.764471130239521e307,2.7744511700598803e307,2.78443120988024e307,2.7944112497005987e307,2.804391289520958e307,2.8143713293413175e307,2.8243513691616765e307,2.8343314089820364e307,2.8443114488023953e307,2.854291488622755e307,2.8642715284431137e307,2.8742515682634726e307,2.8842316080838326e307,2.8942116479041915e307,2.904191687724551e307,2.91417172754491e307,2.92415176736527e307,2.9341318071856287e307,2.9441118470059876e307,2.9540918868263476e307,2.9640719266467065e307,2.974051966467066e307,2.9840320062874253e307,2.994012046107785e307,3.0039920859281437e307,3.013972125748503e307,3.023952165568862e307,3.0339322053892215e307,3.0439122452095814e307,3.05389228502994e307,3.0638723248503e307,3.073852364670658e307,3.083832404491018e307,3.0938124443113776e307,3.103792484131736e307,3.113772523952096e307,3.1237525637724554e307,3.1337326035928143e307,3.1437126434131737e307,3.1536926832335336e307,3.163672723053892e307,3.1736527628742515e307,3.183632802694611e307,3.19361284251497e307,3.20359288233533e307,3.213572922155688e307,3.223552961976048e307,3.233533001796407e307,3.243513041616766e307,3.253493081437126e307,3.263473121257485e307,3.2734531610778443e307,3.2834332008982037e307,3.293413240718563e307,3.303393280538922e307,3.3133733203592815e307,3.323353360179641e307,3.3333334e307,3.3433134398203593e307,3.3532934796407187e307,3.363273519461078e307,3.373253559281437e307,3.3832335991017965e307,3.3932136389221554e307,3.403193678742515e307,3.4131737185628743e307,3.423153758383233e307,3.433133798203593e307,3.443113838023952e307,3.4530938778443115e307,3.463073917664671e307,3.47305395748503e307,3.4830339973053893e307,3.4930140371257487e307,3.5029940769461077e307,3.512974116766467e307,3.522954156586827e307,3.5329341964071855e307,3.542914236227545e307,3.552894276047904e307,3.562874315868263e307,3.572854355688623e307,3.5828343955089816e307,3.5928144353293415e307,3.602794475149701e307,3.61277451497006e307,3.6227545547904193e307,3.6327345946107787e307,3.6427146344311377e307,3.652694674251497e307,3.6626747140718565e307,3.6726547538922155e307,3.6826347937125754e307,3.692614833532934e307,3.7025948733532933e307,3.7125749131736527e307,3.7225549529940116e307,3.7325349928143715e307,3.7425150326347305e307,3.75249507245509e307,3.7624751122754493e307,3.7724551520958083e307,3.7824351919161677e307,3.792415231736527e307,3.8023952715568865e307,3.8123753113772455e307,3.822355351197605e307,3.8323353910179643e307,3.8423154308383233e307,3.8522954706586827e307,3.8622755104790416e307,3.872255550299401e307,3.8822355901197605e307,3.89221562994012e307,3.902195669760479e307,3.912175709580839e307,3.9221557494011977e307,3.9321357892215566e307,3.9421158290419166e307,3.9520958688622755e307,3.962075908682635e307,3.9720559485029943e307,3.9820359883233533e307,3.9920160281437127e307,4.001996067964072e307,4.011976107784431e307,4.0219561476047905e307,4.0319361874251494e307,4.041916227245509e307,4.051896267065869e307,4.061876306886227e307,4.0718563467065866e307,4.0818363865269466e307,4.091816426347305e307,4.101796466167665e307,4.1117765059880244e307,4.1217565458083833e307,4.1317365856287427e307,4.1417166254491016e307,4.151696665269461e307,4.1616767050898205e307,4.1716567449101794e307,4.181636784730539e307,4.1916168245508983e307,4.201596864371257e307,4.211576904191617e307,4.221556944011976e307,4.231536983832335e307,4.241517023652695e307,4.251497063473054e307,4.2614771032934133e307,4.2714571431137727e307,4.281437182934132e307,4.291417222754491e307,4.30139726257485e307,4.31137730239521e307,4.321357342215569e307,4.3313373820359283e307,4.341317421856287e307,4.3512974616766467e307,4.361277501497006e307,4.371257541317365e307,4.3812375811377244e307,4.391217620958084e307,4.4011976607784433e307,4.411177700598802e307,4.421157740419162e307,4.431137780239521e307,4.44111782005988e307,4.45109785988024e307,4.4610778997005984e307,4.4710579395209583e307,4.4810379793413177e307,4.4910180191616767e307,4.500998058982036e307,4.510978098802395e307,4.520958138622754e307,4.530938178443114e307,4.540918218263473e307,4.550898258083833e307,4.560878297904192e307,4.570858337724551e307,4.58083837754491e307,4.590818417365269e307,4.600798457185629e307,4.610778497005987e307,4.620758536826348e307,4.630738576646706e307,4.640718616467066e307,4.650698656287426e307,4.660678696107784e307,4.670658735928143e307,4.680638775748503e307,4.690618815568863e307,4.700598855389221e307,4.710578895209582e307,4.72055893502994e307,4.730538974850299e307,4.740519014670659e307,4.750499054491018e307,4.760479094311377e307,4.770459134131736e307,4.780439173952097e307,4.790419213772455e307,4.800399253592814e307,4.810379293413174e307,4.820359333233532e307,4.830339373053893e307,4.840319412874252e307,4.850299452694611e307,4.86027949251497e307,4.870259532335329e307,4.880239572155689e307,4.890219611976047e307,4.900199651796407e307,4.910179691616766e307,4.920159731437126e307,4.930139771257485e307,4.940119811077844e307,4.950099850898203e307,4.960079890718563e307,4.970059930538923e307,4.980039970359281e307,4.990020010179641e307,5.00000005e307,5.009980089820359e307,5.019960129640719e307,5.029940169461078e307,5.039920209281437e307,5.049900249101796e307,5.059880288922156e307,5.069860328742515e307,5.079840368562874e307,5.089820408383233e307,5.099800448203593e307,5.109780488023953e307,5.119760527844311e307,5.129740567664671e307,5.13972060748503e307,5.149700647305389e307,5.159680687125749e307,5.169660726946108e307,5.179640766766467e307,5.189620806586826e307,5.199600846407187e307,5.209580886227545e307,5.2195609260479035e307,5.229540965868263e307,5.239521005688623e307,5.249501045508982e307,5.259481085329341e307,5.269461125149701e307,5.279441164970059e307,5.28942120479042e307,5.299401244610779e307,5.309381284431137e307,5.319361324251497e307,5.329341364071857e307,5.339321403892216e307,5.349301443712575e307,5.359281483532935e307,5.369261523353293e307,5.379241563173652e307,5.389221602994013e307,5.399201642814371e307,5.40918168263473e307,5.41916172245509e307,5.42914176227545e307,5.439121802095808e307,5.449101841916168e307,5.459081881736527e307,5.469061921556886e307,5.479041961377247e307,5.489022001197605e307,5.499002041017964e307,5.508982080838323e307,5.518962120658683e307,5.528942160479042e307,5.5389222002994e307,5.548902240119761e307,5.55888227994012e307,5.568862319760479e307,5.578842359580839e307,5.588822399401197e307,5.598802439221556e307,5.608782479041917e307,5.618762518862276e307,5.628742558682634e307,5.638722598502995e307,5.648702638323353e307,5.658682678143712e307,5.668662717964073e307,5.678642757784431e307,5.68862279760479e307,5.69860283742515e307,5.70858287724551e307,5.718562917065868e307,5.728542956886227e307,5.738522996706587e307,5.748503036526946e307,5.758483076347306e307,5.768463116167665e307,5.778443155988024e307,5.788423195808384e307,5.798403235628743e307,5.808383275449102e307,5.818363315269461e307,5.82834335508982e307,5.83832339491018e307,5.84830343473054e307,5.858283474550898e307,5.868263514371257e307,5.878243554191616e307,5.888223594011976e307,5.898203633832336e307,5.908183673652694e307,5.918163713473054e307,5.928143753293414e307,5.938123793113772e307,5.948103832934132e307,5.958083872754491e307,5.96806391257485e307,5.97804395239521e307,5.98802399221557e307,5.998004032035928e307,6.007984071856287e307,6.017964111676646e307,6.027944151497006e307,6.037924191317366e307,6.047904231137724e307,6.057884270958084e307,6.067864310778444e307,6.077844350598802e307,6.087824390419162e307,6.097804430239521e307,6.10778447005988e307,6.11776450988024e307,6.1277445497006e307,6.137724589520958e307,6.147704629341316e307,6.157684669161678e307,6.167664708982036e307,6.177644748802395e307,6.187624788622754e307,6.197604828443114e307,6.207584868263473e307,6.217564908083832e307,6.227544947904192e307,6.23752498772455e307,6.24750502754491e307,6.25748506736527e307,6.267465107185629e307,6.277445147005988e307,6.287425186826347e307,6.297405226646707e307,6.307385266467066e307,6.317365306287426e307,6.327345346107784e307,6.337325385928143e307,6.347305425748504e307,6.357285465568862e307,6.367265505389221e307,6.377245545209581e307,6.387225585029941e307,6.397205624850299e307,6.40718566467066e307,6.417165704491018e307,6.427145744311376e307,6.437125784131738e307,6.447105823952096e307,6.457085863772455e307,6.467065903592814e307,6.477045943413174e307,6.487025983233533e307,6.497006023053891e307,6.506986062874252e307,6.51696610269461e307,6.52694614251497e307,6.53692618233533e307,6.546906222155689e307,6.556886261976047e307,6.566866301796407e307,6.576846341616767e307,6.586826381437125e307,6.596806421257486e307,6.606786461077844e307,6.616766500898204e307,6.626746540718564e307,6.636726580538922e307,6.646706620359281e307,6.65668666017964e307,6.666666700000001e307,6.676646739820359e307,6.686626779640719e307,6.696606819461078e307,6.706586859281436e307,6.716566899101797e307,6.726546938922156e307,6.736526978742515e307,6.746507018562874e307,6.756487058383235e307,6.766467098203593e307,6.776447138023952e307,6.786427177844311e307,6.79640721766467e307,6.806387257485031e307,6.816367297305389e307,6.826347337125749e307,6.836327376946107e307,6.846307416766466e307,6.856287456586827e307,6.866267496407185e307,6.876247536227545e307,6.886227576047904e307,6.896207615868264e307,6.906187655688623e307,6.916167695508982e307,6.926147735329341e307,6.9361277751497e307,6.946107814970061e307,6.956087854790419e307,6.966067894610779e307,6.976047934431137e307,6.986027974251497e307,6.996008014071857e307,7.005988053892215e307,7.015968093712575e307,7.025948133532934e307,7.035928173353294e307,7.045908213173653e307,7.055888252994012e307,7.065868292814371e307,7.07584833263473e307,7.085828372455091e307,7.095808412275449e307,7.105788452095808e307,7.115768491916168e307,7.125748531736527e307,7.135728571556886e307,7.145708611377246e307,7.155688651197605e307,7.165668691017963e307,7.175648730838324e307,7.185628770658683e307,7.195608810479041e307,7.205588850299401e307,7.215568890119761e307,7.22554892994012e307,7.235528969760479e307,7.245509009580839e307,7.255489049401197e307,7.265469089221557e307,7.275449129041917e307,7.285429168862275e307,7.295409208682634e307,7.305389248502994e307,7.315369288323354e307,7.325349328143712e307,7.335329367964072e307,7.345309407784431e307,7.35528944760479e307,7.365269487425151e307,7.375249527245509e307,7.385229567065868e307,7.395209606886228e307,7.405189646706588e307,7.415169686526946e307,7.425149726347305e307,7.435129766167665e307,7.445109805988024e307,7.455089845808384e307,7.465069885628743e307,7.475049925449102e307,7.48502996526946e307,7.495010005089821e307,7.50499004491018e307,7.514970084730538e307,7.524950124550899e307,7.534930164371257e307,7.544910204191617e307,7.554890244011977e307,7.564870283832335e307,7.574850323652694e307,7.584830363473055e307,7.594810403293414e307,7.604790443113772e307,7.614770482934132e307,7.624750522754491e307,7.63473056257485e307,7.64471060239521e307,7.654690642215569e307,7.664670682035928e307,7.674650721856287e307,7.684630761676648e307,7.694610801497006e307,7.704590841317365e307,7.714570881137725e307,7.724550920958084e307,7.734530960778444e307,7.744511000598802e307,7.754491040419162e307,7.764471080239521e307,7.77445112005988e307,7.78443115988024e307,7.794411199700598e307,7.804391239520958e307,7.814371279341318e307,7.824351319161677e307,7.834331358982036e307,7.844311398802395e307,7.854291438622754e307,7.864271478443114e307,7.874251518263474e307,7.884231558083832e307,7.894211597904192e307,7.904191637724551e307,7.91417167754491e307,7.92415171736527e307,7.934131757185628e307,7.944111797005988e307,7.954091836826348e307,7.964071876646707e307,7.974051916467066e307,7.984031956287425e307,7.994011996107784e307,8.003992035928144e307,8.013972075748504e307,8.023952115568862e307,8.033932155389222e307,8.043912195209582e307,8.05389223502994e307,8.063872274850299e307,8.073852314670659e307,8.083832354491018e307,8.093812394311377e307,8.103792434131738e307,8.113772473952096e307,8.123752513772454e307,8.133732553592814e307,8.143712593413174e307,8.153692633233533e307,8.163672673053892e307,8.173652712874252e307,8.183632752694611e307,8.19361279251497e307,8.20359283233533e307,8.213572872155688e307,8.223552911976048e307,8.233532951796408e307,8.243512991616767e307,8.253493031437125e307,8.263473071257485e307,8.273453111077844e307,8.283433150898203e307,8.293413190718564e307,8.303393230538922e307,8.313373270359281e307,8.323353310179642e307,8.33333335e307,8.343313389820359e307,8.353293429640719e307,8.363273469461078e307,8.373253509281437e307,8.383233549101797e307,8.393213588922156e307,8.403193628742514e307,8.413173668562875e307,8.423153708383234e307,8.433133748203593e307,8.443113788023951e307,8.453093827844312e307,8.463073867664671e307,8.473053907485029e307,8.48303394730539e307,8.493013987125748e307,8.502994026946107e307,8.512974066766468e307,8.522954106586827e307,8.532934146407185e307,8.542914186227545e307,8.552894226047905e307,8.562874265868263e307,8.572854305688623e307,8.582834345508982e307,8.592814385329341e307,8.602794425149701e307,8.61277446497006e307,8.622754504790419e307,8.632734544610778e307,8.642714584431139e307,8.652694624251497e307,8.662674664071857e307,8.672654703892216e307,8.682634743712574e307,8.692614783532935e307,8.702594823353293e307,8.712574863173653e307,8.722554902994012e307,8.732534942814371e307,8.742514982634731e307,8.75249502245509e307,8.762475062275449e307,8.772455102095808e307,8.782435141916168e307,8.792415181736527e307,8.802395221556887e307,8.812375261377245e307,8.822355301197604e307,8.832335341017965e307,8.842315380838323e307,8.852295420658683e307,8.862275460479042e307,8.872255500299402e307,8.882235540119761e307,8.892215579940119e307,8.902195619760479e307,8.912175659580838e307,8.922155699401198e307,8.932135739221557e307,8.942115779041917e307,8.952095818862275e307,8.962075858682634e307,8.972055898502995e307,8.982035938323353e307,8.992015978143713e307,9.001996017964071e307,9.011976057784432e307,9.02195609760479e307,9.03193613742515e307,9.041916177245509e307,9.051896217065867e307,9.061876256886228e307,9.071856296706586e307,9.081836336526947e307,9.091816376347305e307,9.101796416167663e307,9.111776455988024e307,9.121756495808384e307,9.131736535628743e307,9.141716575449101e307,9.151696615269462e307,9.16167665508982e307,9.17165669491018e307,9.181636734730539e307,9.191616774550897e307,9.201596814371258e307,9.211576854191616e307,9.221556894011977e307,9.231536933832337e307,9.241516973652695e307,9.251497013473054e307,9.261477053293412e307,9.271457093113773e307,9.281437132934131e307,9.29141717275449e307,9.30139721257485e307,9.31137725239521e307,9.321357292215569e307,9.33133733203593e307,9.341317371856288e307,9.351297411676646e307,9.361277451497007e307,9.371257491317365e307,9.381237531137723e307,9.391217570958084e307,9.401197610778442e307,9.411177650598803e307,9.421157690419163e307,9.431137730239522e307,9.44111777005988e307,9.45109780988024e307,9.461077849700599e307,9.471057889520957e307,9.481037929341316e307,9.491017969161676e307,9.500998008982037e307,9.510978048802397e307,9.520958088622756e307,9.530938128443114e307,9.540918168263472e307,9.550898208083833e307,9.560878247904191e307,9.57085828772455e307,9.58083832754491e307,9.59081836736527e307,9.600798407185629e307,9.610778447005987e307,9.620758486826348e307,9.630738526646706e307,9.640718566467067e307,9.650698606287425e307,9.660678646107784e307,9.670658685928142e307,9.680638725748504e307,9.690618765568863e307,9.700598805389223e307,9.710578845209582e307,9.72055888502994e307,9.730538924850299e307,9.740518964670657e307,9.750499004491017e307,9.760479044311378e307,9.770459084131738e307,9.780439123952097e307,9.790419163772455e307,9.800399203592814e307,9.810379243413174e307,9.820359283233534e307,9.830339323053893e307,9.840319362874251e307,9.85029940269461e307,9.860279442514968e307,9.87025948233533e307,9.88023952215569e307,9.89021956197605e307,9.900199601796408e307,9.910179641616766e307,9.920159681437125e307,9.930139721257483e307,9.940119761077844e307,9.950099800898204e307,9.960079840718564e307,9.970059880538923e307,9.980039920359281e307,9.99001996017964e307,1.0e308]}
},{}],164:[function(require,module,exports){
module.exports={"expected":[-0.34657359027997264,-0.3404625388971485,-0.33457109364634363,-0.32888723800141867,-0.32339984141210615,-0.3180985771608443,-0.3129738493750175,-0.3080167280062865,-0.3032188907641098,-0.29857257113706154,-0.2940705117583707,-0.28970592247547644,-0.285472442570696,-0.28136410665409234,-0.27737531381254793,-0.27350079965272023,-0.2697356109214776,-0.26607508242682765,-0.2625148160162577,-0.2590506613986834,-0.2556786986215131,-0.2523952220363065,-0.2491967256055976,-0.2460798894200992,-0.2430415673100419,-0.24007877544713213,-0.23718868184477704,-0.23436859667404164,-0.2316159633214523,-0.22892835012238874,-0.2263034427105594,-0.2237390369300278,-0.22123303226156635,-0.21878342571982545,-0.2163883061820061,-0.21404584911246846,-0.2117543116510497,-0.209512028035861,-0.20731740533400853,-0.2051689194560914,-0.2030651114324875,-0.20100458393138315,-0.19898599800025205,-0.1970080700140687,-0.19506956881496879,-0.1931693130293561,-0.1913061685496268,-0.18947904616873648,-0.1876868993568,-0.1859287221697821,-0.18420354728113442,-0.1825104441279542,-0.18084851716390002,-0.17921690421169933,-0.17761477490863203,-0.17604132923887542,-0.17449579614705407,-0.17297743222775977,-0.17148552048618954,-0.17001936916540536,-0.16857831063604226,-0.16716170034459002,-0.16576891581664793,-0.1643993557118045,-0.1630524389270272,-0.16172760374566036,-0.1604243070293291,-0.15914202345022826,-0.15788024476144552,-0.1566384791031227,-0.15541625034240525,-0.15421309744526276,-0.15302857387838759,-0.15186224703949394,-0.15071369771444632,-0.14958251955974575,-0.14846831860899332,-0.14737071280203803,-0.14628933153559295,-0.145223815234181,-0.14417381494033768,-0.14313899192306542,-0.14211901730359117,-0.1411135716975377,-0.14012234487266978,-0.1391450354214251,-0.13818135044748728,-0.13723100526569784,-0.13629372311464796,-0.13536923488132424,-0.13445727883722083,-0.13355760038536138,-0.13266995181770525,-0.13179409208244222,-0.13092978656070547,-0.13007680685225964,-0.12923493056974283,-0.1284039411410666,-0.1275836276195951,-0.12677378450174875,-0.12597421155169242,-0.1251847136327896,-0.12440510054551648,-0.12363518687154913,-0.12287479182374932,-0.12212373910178903,-0.12138185675316715,-0.12064897703938371,-0.11992493630704866,-0.1192095748637136,-0.11850273685822443,-0.11780427016540394,-0.11711402627488128,-0.11643186018389479,-0.11575763029390307,-0.11509119831084653,-0.11443242914890948,-0.11378119083763925,-0.11313735443228681,-0.11250079392723795,-0.11187138617241163,-0.11124901079250638,-0.11063355010898254,-0.11002488906467202,-0.10942291515091222,-0.10882751833710647,-0.10823859100261622,-0.10765602787089558,-0.10707972594578172,-0.10650958444985963,-0.105945504764822,-0.1053873903737495,-0.10483514680523891,-0.10428868157931083,-0.10374790415503064,-0.10321272587977946,-0.10268305994011473,-0.10215882131416243,-0.10163992672548543,-0.10112629459837419,-0.1006178450145096,-0.10011449967094793,-0.09961618183938206,-0.0991228163266325,-0.09863432943632637,-0.09815064893172172,-0.09767170399963773,-0.09719742521545262,-0.09672774450913209,-0.09626259513225348,-0.09580191162599098,-0.09534562979003001,-0.09489368665237892,-0.09444602044004786,-0.09400257055056606,-0.09356327752430939,-0.09312808301761154,-0.09269692977663274,-0.09226976161196136,-0.09184652337392453,-0.09142716092858447,-0.0910116211343985,-0.09059985181952153,-0.09019180175973017,-0.08978742065694863,-0.08938665911835764,-0.08898946863606766,-0.08859580156733862,-0.08820561111532939,-0.08781885131036,-0.08743547699167115,-0.08705544378966538,-0.08667870810861529,-0.08630522710982402,-0.08593495869522509,-0.08556786149140737,-0.08520389483405284,-0.08484301875277463,-0.08448519395634334,-0.08413038181828997,-0.08377854436287441,-0.0834296442514087,-0.08308364476892435,-0.08274050981117419,-0.08240020387195818,-0.08206269203076469,-0.0817279399407173,-0.08139591381681881,-0.0810665804244838,-0.08073990706835155,-0.08041586158137103,-0.08009441231415076,-0.0797755281245658,-0.07945917836761426,-0.07914533288551726,-0.07883396199805462,-0.0785250364931304,-0.07821852761756136,-0.07791440706808284,-0.07761264698256543,-0.0773132199314374,-0.07701609890930634,-0.0767212573267757,-0.07642866900245006,-0.07613830815512451,-0.0758501493961532,-0.075564167721992,-0.07528033850691103,-0.07499863749587221,-0.07471904079756761,-0.07444152487761452,-0.07416606655190286,-0.07389264298009116,-0.07362123165924707,-0.07335181041762912,-0.07308435740860512,-0.072818851104705,-0.07255527029180339,-0.07229359406342949,-0.07203380181520064,-0.07177587323937647,-0.07151978831953061,-0.0712655273253372,-0.07101307080746883,-0.0707623995926038,-0.07051349477853941,-0.07026633772940889,-0.07002091007099948,-0.06977719368616903,-0.06953517071035871,-0.06929482352719973,-0.06905613476421127,-0.06881908728858802,-0.06858366420307464,-0.06834984884192546,-0.06811762476694706,-0.06788697576362183,-0.06765788583731083,-0.06743033920953362,-0.06720432031432362,-0.06697981379465702,-0.0667568044989536,-0.06653527747764763,-0.06631521797982756,-0.06609661144994233,-0.06587944352457338,-0.06566370002927034,-0.06544936697544936,-0.06523643055735204,-0.06502487714906445,-0.06481469330159394,-0.0646058657400031,-0.06439838136059926,-0.0641922272281783,-0.0639873905733217,-0.06378385878974537,-0.06358161943169947,-0.06338066021141767,-0.06318096899661509,-0.06298253380803359,-0.0627853428170336,-0.06258938434323127,-0.062394646852179984,-0.06220111895309541,-0.062008789396622944,-0.06181764707264666,-0.06162768100813914,-0.06143888036505081,-0.06125123443823829,-0.061064732653430966,-0.06087936456523462,-0.06069511985517166,-0.06051198832975703,-0.060329959918609025,-0.06014902467259428,-0.05996917276200644,-0.05979039447477725,-0.05961268021472009,-0.059436020499804725,-0.059260405960462836,-0.05908582733792381,-0.05891227548257977,-0.058739741352379846,-0.058568216011252484,-0.05839769062755546,-0.058228156472553305,-0.05805960491892103,-0.057892027439274046,-0.05772541560472367,-0.05755976108345749,-0.057395055639344356,-0.05723129113056335,-0.05706845950825623,-0.056906552815203106,-0.05674556318452049,-0.05658548283838161,-0.056426304086758555,-0.05626801932618552,-0.05611062103854294,-0.0559541017898622,-0.05579845422915034,-0.05564367108723433,-0.055489745175624786,-0.05533666938539848,-0.055184436686099396,-0.05503304012465806,-0.05488247282432856,-0.054732727983643155,-0.054583798875384074,-0.05443567884557193,-0.05428836131247092,-0.054141839765610045,-0.053996107764820174,-0.053851158939286874,-0.053706986986618376,-0.053563585671928544,-0.05342094882693471,-0.053279070349069764,-0.05313794420060859,-0.0529975644078083,-0.0528579250600621,-0.05271902030906679,-0.05258084436800308,-0.05244339151072908,-0.05230665607098634,-0.052170632441618396,-0.052035315073801464,-0.051900698476287234,-0.05176677721465731,-0.05163354591058935,-0.05150099924113444,-0.05136913193800565,-0.05123793878687766,-0.05110741462669694,-0.05097755434900263,-0.05084835289725772,-0.05071980526619054,-0.05059190650114603,-0.05046465169744713,-0.050338035999765524,-0.05021205460150216,-0.050086702744176856,-0.049961975716827194,-0.049837868855416384,-0.04971437754224996,-0.049591497205401104,-0.04946922331814467,-0.049347551398399414,-0.04922647700817853,-0.04910599575304837,-0.048986103281594987,-0.048866795284898616,-0.0487480674960158,-0.04862991568946905,-0.048512335680744,-0.04839532332579385,-0.0482788745205509,-0.04816298520044534,-0.048047651339930775,-0.04793286895201668,-0.047818634087807614,-0.04770494283604889,-0.04759179132267887,-0.04747917571038757,-0.04736709219818156,-0.04725553702095505,-0.047144506449067,-0.04703399678792425,-0.04692400437757045,-0.046814525592280935,-0.046705556840163004,-0.04659709456276206,-0.04648913523467305,-0.04638167536315749,-0.046274711487765595,-0.04616824017996383,-0.04606225804276751,-0.04595676171037852,-0.04585174784782798,-0.04574721315062382,-0.045643154344403206,-0.04553956818458969,-0.04543645145605506,-0.04533380097278575,-0.045231613577553814,-0.04512988614159236,-0.04502861556427532,-0.04492779877280159,-0.044827432721883394,-0.04472751439343879,-0.044628040796288425,-0.04452900896585615,-0.04443041596387377,-0.044332258878089705,-0.04423453482198143,-0.044137240934471834,-0.044040374379649236,-0.043943932346491105,-0.04384791204859154,-0.04375231072389211,-0.043657125634416365,-0.04356235406600783,-0.04346799332807131,-0.04337404075331765,-0.04328049369751176,-0.04318734953922395,-0.04309460567958439,-0.04300225954204087,-0.04291030857211955,-0.042818750237188855,-0.04272758202622638,-0.04263680144958878,-0.04254640603878454,-0.04245639334624976,-0.04236676094512666,-0.04227750642904497,-0.04218862741190607,-0.04210012152766981,-0.042011986430144116,-0.04192421979277712,-0.04183681930845199,-0.04174978268928431,-0.04166310766642194,-0.041576791989847435,-0.04149083342818287,-0.04140522976849712,-0.041319978816115585,-0.04123507839443208,-0.041150526344723264,-0.04106632052596525,-0.040982458814652435,-0.040898939104618615,-0.040815759306860294,-0.040732917349362074,-0.04065041117692427,-0.04056823875099255,-0.040486398049489676,-0.04040488706664924,-0.04032370381285154,-0.04024284631446121,-0.04016231261366705,-0.040082100768323595,-0.04000220885179469,-0.03992263495279888,-0.03984337717525668,-0.03976443363813967,-0.03968580247532133,-0.03960748183542972,-0.03952946988170184,-0.039451764791839775,-0.03937436475786849,-0.03929726798599531,-0.03922047269647107,-0.03914397712345285,-0.039067779514868416,-0.03899187813228209,-0.03891627125076236,-0.038840957158750855,-0.03876593415793302,-0.03869120056311012,-0.038616754702072896,-0.03854259491547647,-0.038468719556716935,-0.0383951269918092,-0.038321815599266236,-0.03824878376997981,-0.038176029907102484,-0.03810355242593107,-0.038031349753791244,-0.03795942032992367,-0.037887762605371245,-0.03781637504286778,-0.03774525611672775,-0.03767440431273751,-0.03760381812804754,-0.037533496071066035,-0.03746343666135362,-0.03739363842951923,-0.0373240999171173,-0.037254819676545835,-0.037185796270945905,-0.03711702827410207,-0.03704851427034397,-0.03698025285444896,-0.03691224263154597,-0.036844482217020226,-0.03677697023641911,-0.03670970532535915,-0.03664268612943383,-0.03657591130412261,-0.036509379514700804,-0.036443089436150475,-0.036377039753072375,-0.03631122915959875,-0.036245656359307106,-0.03618032006513496,-0.03611521899929549,-0.03605035189319406,-0.03598571748734567,-0.035921314531293345,-0.035857141783527315,-0.0357931980114051,-0.035729481991072475],"x":[-3.0,-3.049800796812749,-3.099601593625498,-3.149402390438247,-3.199203187250996,-3.249003984063745,-3.298804780876494,-3.348605577689243,-3.398406374501992,-3.448207171314741,-3.49800796812749,-3.547808764940239,-3.597609561752988,-3.647410358565737,-3.697211155378486,-3.747011952191235,-3.7968127490039842,-3.846613545816733,-3.896414342629482,-3.946215139442231,-3.99601593625498,-4.0458167330677295,-4.095617529880478,-4.145418326693227,-4.195219123505976,-4.245019920318725,-4.294820717131474,-4.344621513944223,-4.394422310756972,-4.444223107569721,-4.49402390438247,-4.543824701195219,-4.5936254980079685,-4.643426294820717,-4.693227091633466,-4.743027888446215,-4.792828685258964,-4.842629482071713,-4.892430278884462,-4.942231075697211,-4.99203187250996,-5.04183266932271,-5.091633466135458,-5.1414342629482075,-5.191235059760956,-5.241035856573705,-5.290836653386454,-5.340637450199203,-5.390438247011952,-5.440239043824701,-5.49003984063745,-5.539840637450199,-5.589641434262949,-5.639442231075697,-5.6892430278884465,-5.739043824701195,-5.788844621513944,-5.838645418326693,-5.888446215139442,-5.938247011952191,-5.98804780876494,-6.03784860557769,-6.087649402390438,-6.137450199203188,-6.187250996015936,-6.2370517928286855,-6.286852589641434,-6.336653386454183,-6.386454183266932,-6.436254980079681,-6.48605577689243,-6.535856573705179,-6.585657370517929,-6.635458167330677,-6.685258964143427,-6.735059760956175,-6.7848605577689245,-6.834661354581673,-6.884462151394422,-6.934262948207171,-6.98406374501992,-7.03386454183267,-7.083665338645418,-7.133466135458168,-7.183266932270916,-7.233067729083666,-7.282868525896414,-7.3326693227091635,-7.382470119521912,-7.432270916334661,-7.48207171314741,-7.531872509960159,-7.581673306772909,-7.631474103585657,-7.681274900398407,-7.731075697211155,-7.780876494023905,-7.830677290836653,-7.8804780876494025,-7.930278884462151,-7.9800796812749,-8.02988047808765,-8.079681274900398,-8.129482071713147,-8.179282868525897,-8.229083665338646,-8.278884462151394,-8.328685258964143,-8.378486055776893,-8.428286852589641,-8.47808764940239,-8.52788844621514,-8.577689243027889,-8.627490039840637,-8.677290836653386,-8.727091633466136,-8.776892430278885,-8.826693227091633,-8.876494023904382,-8.926294820717132,-8.97609561752988,-9.025896414342629,-9.07569721115538,-9.125498007968128,-9.175298804780876,-9.225099601593625,-9.274900398406375,-9.324701195219124,-9.374501992031872,-9.42430278884462,-9.474103585657371,-9.52390438247012,-9.573705179282868,-9.623505976095618,-9.673306772908367,-9.723107569721115,-9.772908366533864,-9.822709163346614,-9.872509960159363,-9.922310756972111,-9.97211155378486,-10.02191235059761,-10.071713147410359,-10.121513944223107,-10.171314741035857,-10.221115537848606,-10.270916334661354,-10.320717131474103,-10.370517928286853,-10.420318725099602,-10.47011952191235,-10.5199203187251,-10.569721115537849,-10.619521912350598,-10.669322709163346,-10.719123505976096,-10.768924302788845,-10.818725099601593,-10.868525896414342,-10.918326693227092,-10.96812749003984,-11.01792828685259,-11.06772908366534,-11.117529880478088,-11.167330677290837,-11.217131474103585,-11.266932270916335,-11.316733067729084,-11.366533864541832,-11.41633466135458,-11.466135458167331,-11.51593625498008,-11.565737051792828,-11.615537848605578,-11.665338645418327,-11.715139442231076,-11.764940239043824,-11.814741035856574,-11.864541832669323,-11.914342629482071,-11.96414342629482,-12.01394422310757,-12.063745019920319,-12.113545816733067,-12.163346613545817,-12.213147410358566,-12.262948207171315,-12.312749003984063,-12.362549800796813,-12.412350597609562,-12.46215139442231,-12.51195219123506,-12.56175298804781,-12.611553784860558,-12.661354581673306,-12.711155378486056,-12.760956175298805,-12.810756972111554,-12.860557768924302,-12.910358565737052,-12.9601593625498,-13.00996015936255,-13.0597609561753,-13.109561752988048,-13.159362549800797,-13.209163346613545,-13.258964143426295,-13.308764940239044,-13.358565737051793,-13.408366533864541,-13.458167330677291,-13.50796812749004,-13.557768924302788,-13.607569721115539,-13.657370517928287,-13.707171314741036,-13.756972111553784,-13.806772908366534,-13.856573705179283,-13.906374501992032,-13.95617529880478,-14.00597609561753,-14.055776892430279,-14.105577689243027,-14.155378486055778,-14.205179282868526,-14.254980079681275,-14.304780876494023,-14.354581673306773,-14.404382470119522,-14.45418326693227,-14.50398406374502,-14.55378486055777,-14.603585657370518,-14.653386454183266,-14.703187250996017,-14.752988047808765,-14.802788844621514,-14.852589641434262,-14.902390438247012,-14.952191235059761,-15.00199203187251,-15.05179282868526,-15.101593625498008,-15.151394422310757,-15.201195219123505,-15.250996015936256,-15.300796812749004,-15.350597609561753,-15.400398406374501,-15.450199203187251,-15.5,-15.549800796812749,-15.599601593625499,-15.649402390438247,-15.699203187250996,-15.749003984063744,-15.798804780876495,-15.848605577689243,-15.898406374501992,-15.94820717131474,-15.99800796812749,-16.04780876494024,-16.09760956175299,-16.147410358565736,-16.197211155378486,-16.247011952191237,-16.296812749003983,-16.346613545816734,-16.39641434262948,-16.44621513944223,-16.49601593625498,-16.545816733067728,-16.595617529880478,-16.64541832669323,-16.695219123505975,-16.745019920318725,-16.794820717131476,-16.844621513944222,-16.894422310756973,-16.94422310756972,-16.99402390438247,-17.04382470119522,-17.093625498007967,-17.143426294820717,-17.193227091633467,-17.243027888446214,-17.292828685258964,-17.342629482071715,-17.39243027888446,-17.44223107569721,-17.49203187250996,-17.54183266932271,-17.59163346613546,-17.641434262948206,-17.691235059760956,-17.741035856573706,-17.790836653386453,-17.840637450199203,-17.890438247011954,-17.9402390438247,-17.99003984063745,-18.0398406374502,-18.089641434262948,-18.139442231075698,-18.189243027888445,-18.239043824701195,-18.288844621513945,-18.338645418326692,-18.388446215139442,-18.438247011952193,-18.48804780876494,-18.53784860557769,-18.58764940239044,-18.637450199203187,-18.687250996015937,-18.737051792828684,-18.786852589641434,-18.836653386454184,-18.88645418326693,-18.93625498007968,-18.98605577689243,-19.03585657370518,-19.08565737051793,-19.13545816733068,-19.185258964143426,-19.235059760956176,-19.284860557768923,-19.334661354581673,-19.384462151394423,-19.43426294820717,-19.48406374501992,-19.53386454183267,-19.583665338645417,-19.633466135458168,-19.683266932270918,-19.733067729083665,-19.782868525896415,-19.83266932270916,-19.882470119521912,-19.932270916334662,-19.98207171314741,-20.03187250996016,-20.08167330677291,-20.131474103585656,-20.181274900398407,-20.231075697211157,-20.280876494023904,-20.330677290836654,-20.3804780876494,-20.43027888446215,-20.4800796812749,-20.529880478087648,-20.5796812749004,-20.62948207171315,-20.679282868525895,-20.729083665338646,-20.778884462151396,-20.828685258964143,-20.878486055776893,-20.92828685258964,-20.97808764940239,-21.02788844621514,-21.077689243027887,-21.127490039840637,-21.177290836653388,-21.227091633466134,-21.276892430278885,-21.326693227091635,-21.37649402390438,-21.426294820717132,-21.47609561752988,-21.52589641434263,-21.57569721115538,-21.625498007968126,-21.675298804780876,-21.725099601593627,-21.774900398406373,-21.824701195219124,-21.874501992031874,-21.92430278884462,-21.97410358565737,-22.02390438247012,-22.073705179282868,-22.12350597609562,-22.173306772908365,-22.223107569721115,-22.272908366533866,-22.322709163346612,-22.372509960159363,-22.422310756972113,-22.47211155378486,-22.52191235059761,-22.57171314741036,-22.621513944223107,-22.671314741035857,-22.721115537848604,-22.770916334661354,-22.820717131474105,-22.87051792828685,-22.9203187250996,-22.970119521912352,-23.0199203187251,-23.06972111553785,-23.1195219123506,-23.169322709163346,-23.219123505976096,-23.268924302788843,-23.318725099601593,-23.368525896414344,-23.41832669322709,-23.46812749003984,-23.51792828685259,-23.567729083665338,-23.617529880478088,-23.66733067729084,-23.717131474103585,-23.766932270916335,-23.816733067729082,-23.866533864541832,-23.916334661354583,-23.96613545816733,-24.01593625498008,-24.06573705179283,-24.115537848605577,-24.165338645418327,-24.215139442231077,-24.264940239043824,-24.314741035856574,-24.36454183266932,-24.41434262948207,-24.46414342629482,-24.51394422310757,-24.56374501992032,-24.61354581673307,-24.663346613545816,-24.713147410358566,-24.762948207171316,-24.812749003984063,-24.862549800796813,-24.91235059760956,-24.96215139442231,-25.01195219123506,-25.061752988047807,-25.111553784860558,-25.161354581673308,-25.211155378486055,-25.260956175298805,-25.310756972111555,-25.360557768924302,-25.410358565737052,-25.4601593625498,-25.50996015936255,-25.5597609561753,-25.609561752988046,-25.659362549800797,-25.709163346613547,-25.758964143426294,-25.808764940239044,-25.858565737051794,-25.90836653386454,-25.95816733067729,-26.00796812749004,-26.05776892430279,-26.10756972111554,-26.157370517928285,-26.207171314741036,-26.256972111553786,-26.306772908366533,-26.356573705179283,-26.406374501992033,-26.45617529880478,-26.50597609561753,-26.55577689243028,-26.605577689243027,-26.655378486055778,-26.705179282868524,-26.754980079681275,-26.804780876494025,-26.85458167330677,-26.904382470119522,-26.954183266932272,-27.00398406374502,-27.05378486055777,-27.10358565737052,-27.153386454183266,-27.203187250996017,-27.252988047808763,-27.302788844621514,-27.352589641434264,-27.40239043824701,-27.45219123505976,-27.50199203187251,-27.551792828685258,-27.60159362549801,-27.65139442231076,-27.701195219123505,-27.750996015936256,-27.800796812749002,-27.850597609561753,-27.900398406374503,-27.95019920318725,-28.0]}
},{}],165:[function(require,module,exports){
module.exports={"expected":[0.34657359027997264,0.3404625388971485,0.33457109364634363,0.32888723800141867,0.32339984141210615,0.3180985771608443,0.3129738493750175,0.3080167280062865,0.3032188907641098,0.29857257113706154,0.2940705117583707,0.28970592247547644,0.285472442570696,0.28136410665409234,0.27737531381254793,0.27350079965272023,0.2697356109214776,0.26607508242682765,0.2625148160162577,0.2590506613986834,0.2556786986215131,0.2523952220363065,0.2491967256055976,0.2460798894200992,0.2430415673100419,0.24007877544713213,0.23718868184477704,0.23436859667404164,0.2316159633214523,0.22892835012238874,0.2263034427105594,0.2237390369300278,0.22123303226156635,0.21878342571982545,0.2163883061820061,0.21404584911246846,0.2117543116510497,0.209512028035861,0.20731740533400853,0.2051689194560914,0.2030651114324875,0.20100458393138315,0.19898599800025205,0.1970080700140687,0.19506956881496879,0.1931693130293561,0.1913061685496268,0.18947904616873648,0.1876868993568,0.1859287221697821,0.18420354728113442,0.1825104441279542,0.18084851716390002,0.17921690421169933,0.17761477490863203,0.17604132923887542,0.17449579614705407,0.17297743222775977,0.17148552048618954,0.17001936916540536,0.16857831063604226,0.16716170034459002,0.16576891581664793,0.1643993557118045,0.1630524389270272,0.16172760374566036,0.1604243070293291,0.15914202345022826,0.15788024476144552,0.1566384791031227,0.15541625034240525,0.15421309744526276,0.15302857387838759,0.15186224703949394,0.15071369771444632,0.14958251955974575,0.14846831860899332,0.14737071280203803,0.14628933153559295,0.145223815234181,0.14417381494033768,0.14313899192306542,0.14211901730359117,0.1411135716975377,0.14012234487266978,0.1391450354214251,0.13818135044748728,0.13723100526569784,0.13629372311464796,0.13536923488132424,0.13445727883722083,0.13355760038536138,0.13266995181770525,0.13179409208244222,0.13092978656070547,0.13007680685225964,0.12923493056974283,0.1284039411410666,0.1275836276195951,0.12677378450174875,0.12597421155169242,0.1251847136327896,0.12440510054551648,0.12363518687154913,0.12287479182374932,0.12212373910178903,0.12138185675316715,0.12064897703938371,0.11992493630704866,0.1192095748637136,0.11850273685822443,0.11780427016540394,0.11711402627488128,0.11643186018389479,0.11575763029390307,0.11509119831084653,0.11443242914890948,0.11378119083763925,0.11313735443228681,0.11250079392723795,0.11187138617241163,0.11124901079250638,0.11063355010898254,0.11002488906467202,0.10942291515091222,0.10882751833710647,0.10823859100261622,0.10765602787089558,0.10707972594578172,0.10650958444985963,0.105945504764822,0.1053873903737495,0.10483514680523891,0.10428868157931083,0.10374790415503064,0.10321272587977946,0.10268305994011473,0.10215882131416243,0.10163992672548543,0.10112629459837419,0.1006178450145096,0.10011449967094793,0.09961618183938206,0.0991228163266325,0.09863432943632637,0.09815064893172172,0.09767170399963773,0.09719742521545262,0.09672774450913209,0.09626259513225348,0.09580191162599098,0.09534562979003001,0.09489368665237892,0.09444602044004786,0.09400257055056606,0.09356327752430939,0.09312808301761154,0.09269692977663274,0.09226976161196136,0.09184652337392453,0.09142716092858447,0.0910116211343985,0.09059985181952153,0.09019180175973017,0.08978742065694863,0.08938665911835764,0.08898946863606766,0.08859580156733862,0.08820561111532939,0.08781885131036,0.08743547699167115,0.08705544378966538,0.08667870810861529,0.08630522710982402,0.08593495869522509,0.08556786149140737,0.08520389483405284,0.08484301875277463,0.08448519395634334,0.08413038181828997,0.08377854436287441,0.0834296442514087,0.08308364476892435,0.08274050981117419,0.08240020387195818,0.08206269203076469,0.0817279399407173,0.08139591381681881,0.0810665804244838,0.08073990706835155,0.08041586158137103,0.08009441231415076,0.0797755281245658,0.07945917836761426,0.07914533288551726,0.07883396199805462,0.0785250364931304,0.07821852761756136,0.07791440706808284,0.07761264698256543,0.0773132199314374,0.07701609890930634,0.0767212573267757,0.07642866900245006,0.07613830815512451,0.0758501493961532,0.075564167721992,0.07528033850691103,0.07499863749587221,0.07471904079756761,0.07444152487761452,0.07416606655190286,0.07389264298009116,0.07362123165924707,0.07335181041762912,0.07308435740860512,0.072818851104705,0.07255527029180339,0.07229359406342949,0.07203380181520064,0.07177587323937647,0.07151978831953061,0.0712655273253372,0.07101307080746883,0.0707623995926038,0.07051349477853941,0.07026633772940889,0.07002091007099948,0.06977719368616903,0.06953517071035871,0.06929482352719973,0.06905613476421127,0.06881908728858802,0.06858366420307464,0.06834984884192546,0.06811762476694706,0.06788697576362183,0.06765788583731083,0.06743033920953362,0.06720432031432362,0.06697981379465702,0.0667568044989536,0.06653527747764763,0.06631521797982756,0.06609661144994233,0.06587944352457338,0.06566370002927034,0.06544936697544936,0.06523643055735204,0.06502487714906445,0.06481469330159394,0.0646058657400031,0.06439838136059926,0.0641922272281783,0.0639873905733217,0.06378385878974537,0.06358161943169947,0.06338066021141767,0.06318096899661509,0.06298253380803359,0.0627853428170336,0.06258938434323127,0.062394646852179984,0.06220111895309541,0.062008789396622944,0.06181764707264666,0.06162768100813914,0.06143888036505081,0.06125123443823829,0.061064732653430966,0.06087936456523462,0.06069511985517166,0.06051198832975703,0.060329959918609025,0.06014902467259428,0.05996917276200644,0.05979039447477725,0.05961268021472009,0.059436020499804725,0.059260405960462836,0.05908582733792381,0.05891227548257977,0.058739741352379846,0.058568216011252484,0.05839769062755546,0.058228156472553305,0.05805960491892103,0.057892027439274046,0.05772541560472367,0.05755976108345749,0.057395055639344356,0.05723129113056335,0.05706845950825623,0.056906552815203106,0.05674556318452049,0.05658548283838161,0.056426304086758555,0.05626801932618552,0.05611062103854294,0.0559541017898622,0.05579845422915034,0.05564367108723433,0.055489745175624786,0.05533666938539848,0.055184436686099396,0.05503304012465806,0.05488247282432856,0.054732727983643155,0.054583798875384074,0.05443567884557193,0.05428836131247092,0.054141839765610045,0.053996107764820174,0.053851158939286874,0.053706986986618376,0.053563585671928544,0.05342094882693471,0.053279070349069764,0.05313794420060859,0.0529975644078083,0.0528579250600621,0.05271902030906679,0.05258084436800308,0.05244339151072908,0.05230665607098634,0.052170632441618396,0.052035315073801464,0.051900698476287234,0.05176677721465731,0.05163354591058935,0.05150099924113444,0.05136913193800565,0.05123793878687766,0.05110741462669694,0.05097755434900263,0.05084835289725772,0.05071980526619054,0.05059190650114603,0.05046465169744713,0.050338035999765524,0.05021205460150216,0.050086702744176856,0.049961975716827194,0.049837868855416384,0.04971437754224996,0.049591497205401104,0.04946922331814467,0.049347551398399414,0.04922647700817853,0.04910599575304837,0.048986103281594987,0.048866795284898616,0.0487480674960158,0.04862991568946905,0.048512335680744,0.04839532332579385,0.0482788745205509,0.04816298520044534,0.048047651339930775,0.04793286895201668,0.047818634087807614,0.04770494283604889,0.04759179132267887,0.04747917571038757,0.04736709219818156,0.04725553702095505,0.047144506449067,0.04703399678792425,0.04692400437757045,0.046814525592280935,0.046705556840163004,0.04659709456276206,0.04648913523467305,0.04638167536315749,0.046274711487765595,0.04616824017996383,0.04606225804276751,0.04595676171037852,0.04585174784782798,0.04574721315062382,0.045643154344403206,0.04553956818458969,0.04543645145605506,0.04533380097278575,0.045231613577553814,0.04512988614159236,0.04502861556427532,0.04492779877280159,0.044827432721883394,0.04472751439343879,0.044628040796288425,0.04452900896585615,0.04443041596387377,0.044332258878089705,0.04423453482198143,0.044137240934471834,0.044040374379649236,0.043943932346491105,0.04384791204859154,0.04375231072389211,0.043657125634416365,0.04356235406600783,0.04346799332807131,0.04337404075331765,0.04328049369751176,0.04318734953922395,0.04309460567958439,0.04300225954204087,0.04291030857211955,0.042818750237188855,0.04272758202622638,0.04263680144958878,0.04254640603878454,0.04245639334624976,0.04236676094512666,0.04227750642904497,0.04218862741190607,0.04210012152766981,0.042011986430144116,0.04192421979277712,0.04183681930845199,0.04174978268928431,0.04166310766642194,0.041576791989847435,0.04149083342818287,0.04140522976849712,0.041319978816115585,0.04123507839443208,0.041150526344723264,0.04106632052596525,0.040982458814652435,0.040898939104618615,0.040815759306860294,0.040732917349362074,0.04065041117692427,0.04056823875099255,0.040486398049489676,0.04040488706664924,0.04032370381285154,0.04024284631446121,0.04016231261366705,0.040082100768323595,0.04000220885179469,0.03992263495279888,0.03984337717525668,0.03976443363813967,0.03968580247532133,0.03960748183542972,0.03952946988170184,0.039451764791839775,0.03937436475786849,0.03929726798599531,0.03922047269647107,0.03914397712345285,0.039067779514868416,0.03899187813228209,0.03891627125076236,0.038840957158750855,0.03876593415793302,0.03869120056311012,0.038616754702072896,0.03854259491547647,0.038468719556716935,0.0383951269918092,0.038321815599266236,0.03824878376997981,0.038176029907102484,0.03810355242593107,0.038031349753791244,0.03795942032992367,0.037887762605371245,0.03781637504286778,0.03774525611672775,0.03767440431273751,0.03760381812804754,0.037533496071066035,0.03746343666135362,0.03739363842951923,0.0373240999171173,0.037254819676545835,0.037185796270945905,0.03711702827410207,0.03704851427034397,0.03698025285444896,0.03691224263154597,0.036844482217020226,0.03677697023641911,0.03670970532535915,0.03664268612943383,0.03657591130412261,0.036509379514700804,0.036443089436150475,0.036377039753072375,0.03631122915959875,0.036245656359307106,0.03618032006513496,0.03611521899929549,0.03605035189319406,0.03598571748734567,0.035921314531293345,0.035857141783527315,0.0357931980114051,0.035729481991072475],"x":[3.0,3.049800796812749,3.099601593625498,3.149402390438247,3.199203187250996,3.249003984063745,3.298804780876494,3.348605577689243,3.398406374501992,3.448207171314741,3.49800796812749,3.547808764940239,3.597609561752988,3.647410358565737,3.697211155378486,3.747011952191235,3.7968127490039842,3.846613545816733,3.896414342629482,3.946215139442231,3.99601593625498,4.0458167330677295,4.095617529880478,4.145418326693227,4.195219123505976,4.245019920318725,4.294820717131474,4.344621513944223,4.394422310756972,4.444223107569721,4.49402390438247,4.543824701195219,4.5936254980079685,4.643426294820717,4.693227091633466,4.743027888446215,4.792828685258964,4.842629482071713,4.892430278884462,4.942231075697211,4.99203187250996,5.04183266932271,5.091633466135458,5.1414342629482075,5.191235059760956,5.241035856573705,5.290836653386454,5.340637450199203,5.390438247011952,5.440239043824701,5.49003984063745,5.539840637450199,5.589641434262949,5.639442231075697,5.6892430278884465,5.739043824701195,5.788844621513944,5.838645418326693,5.888446215139442,5.938247011952191,5.98804780876494,6.03784860557769,6.087649402390438,6.137450199203188,6.187250996015936,6.2370517928286855,6.286852589641434,6.336653386454183,6.386454183266932,6.436254980079681,6.48605577689243,6.535856573705179,6.585657370517929,6.635458167330677,6.685258964143427,6.735059760956175,6.7848605577689245,6.834661354581673,6.884462151394422,6.934262948207171,6.98406374501992,7.03386454183267,7.083665338645418,7.133466135458168,7.183266932270916,7.233067729083666,7.282868525896414,7.3326693227091635,7.382470119521912,7.432270916334661,7.48207171314741,7.531872509960159,7.581673306772909,7.631474103585657,7.681274900398407,7.731075697211155,7.780876494023905,7.830677290836653,7.8804780876494025,7.930278884462151,7.9800796812749,8.02988047808765,8.079681274900398,8.129482071713147,8.179282868525897,8.229083665338646,8.278884462151394,8.328685258964143,8.378486055776893,8.428286852589641,8.47808764940239,8.52788844621514,8.577689243027889,8.627490039840637,8.677290836653386,8.727091633466136,8.776892430278885,8.826693227091633,8.876494023904382,8.926294820717132,8.97609561752988,9.025896414342629,9.07569721115538,9.125498007968128,9.175298804780876,9.225099601593625,9.274900398406375,9.324701195219124,9.374501992031872,9.42430278884462,9.474103585657371,9.52390438247012,9.573705179282868,9.623505976095618,9.673306772908367,9.723107569721115,9.772908366533864,9.822709163346614,9.872509960159363,9.922310756972111,9.97211155378486,10.02191235059761,10.071713147410359,10.121513944223107,10.171314741035857,10.221115537848606,10.270916334661354,10.320717131474103,10.370517928286853,10.420318725099602,10.47011952191235,10.5199203187251,10.569721115537849,10.619521912350598,10.669322709163346,10.719123505976096,10.768924302788845,10.818725099601593,10.868525896414342,10.918326693227092,10.96812749003984,11.01792828685259,11.06772908366534,11.117529880478088,11.167330677290837,11.217131474103585,11.266932270916335,11.316733067729084,11.366533864541832,11.41633466135458,11.466135458167331,11.51593625498008,11.565737051792828,11.615537848605578,11.665338645418327,11.715139442231076,11.764940239043824,11.814741035856574,11.864541832669323,11.914342629482071,11.96414342629482,12.01394422310757,12.063745019920319,12.113545816733067,12.163346613545817,12.213147410358566,12.262948207171315,12.312749003984063,12.362549800796813,12.412350597609562,12.46215139442231,12.51195219123506,12.56175298804781,12.611553784860558,12.661354581673306,12.711155378486056,12.760956175298805,12.810756972111554,12.860557768924302,12.910358565737052,12.9601593625498,13.00996015936255,13.0597609561753,13.109561752988048,13.159362549800797,13.209163346613545,13.258964143426295,13.308764940239044,13.358565737051793,13.408366533864541,13.458167330677291,13.50796812749004,13.557768924302788,13.607569721115539,13.657370517928287,13.707171314741036,13.756972111553784,13.806772908366534,13.856573705179283,13.906374501992032,13.95617529880478,14.00597609561753,14.055776892430279,14.105577689243027,14.155378486055778,14.205179282868526,14.254980079681275,14.304780876494023,14.354581673306773,14.404382470119522,14.45418326693227,14.50398406374502,14.55378486055777,14.603585657370518,14.653386454183266,14.703187250996017,14.752988047808765,14.802788844621514,14.852589641434262,14.902390438247012,14.952191235059761,15.00199203187251,15.05179282868526,15.101593625498008,15.151394422310757,15.201195219123505,15.250996015936256,15.300796812749004,15.350597609561753,15.400398406374501,15.450199203187251,15.5,15.549800796812749,15.599601593625499,15.649402390438247,15.699203187250996,15.749003984063744,15.798804780876495,15.848605577689243,15.898406374501992,15.94820717131474,15.99800796812749,16.04780876494024,16.09760956175299,16.147410358565736,16.197211155378486,16.247011952191237,16.296812749003983,16.346613545816734,16.39641434262948,16.44621513944223,16.49601593625498,16.545816733067728,16.595617529880478,16.64541832669323,16.695219123505975,16.745019920318725,16.794820717131476,16.844621513944222,16.894422310756973,16.94422310756972,16.99402390438247,17.04382470119522,17.093625498007967,17.143426294820717,17.193227091633467,17.243027888446214,17.292828685258964,17.342629482071715,17.39243027888446,17.44223107569721,17.49203187250996,17.54183266932271,17.59163346613546,17.641434262948206,17.691235059760956,17.741035856573706,17.790836653386453,17.840637450199203,17.890438247011954,17.9402390438247,17.99003984063745,18.0398406374502,18.089641434262948,18.139442231075698,18.189243027888445,18.239043824701195,18.288844621513945,18.338645418326692,18.388446215139442,18.438247011952193,18.48804780876494,18.53784860557769,18.58764940239044,18.637450199203187,18.687250996015937,18.737051792828684,18.786852589641434,18.836653386454184,18.88645418326693,18.93625498007968,18.98605577689243,19.03585657370518,19.08565737051793,19.13545816733068,19.185258964143426,19.235059760956176,19.284860557768923,19.334661354581673,19.384462151394423,19.43426294820717,19.48406374501992,19.53386454183267,19.583665338645417,19.633466135458168,19.683266932270918,19.733067729083665,19.782868525896415,19.83266932270916,19.882470119521912,19.932270916334662,19.98207171314741,20.03187250996016,20.08167330677291,20.131474103585656,20.181274900398407,20.231075697211157,20.280876494023904,20.330677290836654,20.3804780876494,20.43027888446215,20.4800796812749,20.529880478087648,20.5796812749004,20.62948207171315,20.679282868525895,20.729083665338646,20.778884462151396,20.828685258964143,20.878486055776893,20.92828685258964,20.97808764940239,21.02788844621514,21.077689243027887,21.127490039840637,21.177290836653388,21.227091633466134,21.276892430278885,21.326693227091635,21.37649402390438,21.426294820717132,21.47609561752988,21.52589641434263,21.57569721115538,21.625498007968126,21.675298804780876,21.725099601593627,21.774900398406373,21.824701195219124,21.874501992031874,21.92430278884462,21.97410358565737,22.02390438247012,22.073705179282868,22.12350597609562,22.173306772908365,22.223107569721115,22.272908366533866,22.322709163346612,22.372509960159363,22.422310756972113,22.47211155378486,22.52191235059761,22.57171314741036,22.621513944223107,22.671314741035857,22.721115537848604,22.770916334661354,22.820717131474105,22.87051792828685,22.9203187250996,22.970119521912352,23.0199203187251,23.06972111553785,23.1195219123506,23.169322709163346,23.219123505976096,23.268924302788843,23.318725099601593,23.368525896414344,23.41832669322709,23.46812749003984,23.51792828685259,23.567729083665338,23.617529880478088,23.66733067729084,23.717131474103585,23.766932270916335,23.816733067729082,23.866533864541832,23.916334661354583,23.96613545816733,24.01593625498008,24.06573705179283,24.115537848605577,24.165338645418327,24.215139442231077,24.264940239043824,24.314741035856574,24.36454183266932,24.41434262948207,24.46414342629482,24.51394422310757,24.56374501992032,24.61354581673307,24.663346613545816,24.713147410358566,24.762948207171316,24.812749003984063,24.862549800796813,24.91235059760956,24.96215139442231,25.01195219123506,25.061752988047807,25.111553784860558,25.161354581673308,25.211155378486055,25.260956175298805,25.310756972111555,25.360557768924302,25.410358565737052,25.4601593625498,25.50996015936255,25.5597609561753,25.609561752988046,25.659362549800797,25.709163346613547,25.758964143426294,25.808764940239044,25.858565737051794,25.90836653386454,25.95816733067729,26.00796812749004,26.05776892430279,26.10756972111554,26.157370517928285,26.207171314741036,26.256972111553786,26.306772908366533,26.356573705179283,26.406374501992033,26.45617529880478,26.50597609561753,26.55577689243028,26.605577689243027,26.655378486055778,26.705179282868524,26.754980079681275,26.804780876494025,26.85458167330677,26.904382470119522,26.954183266932272,27.00398406374502,27.05378486055777,27.10358565737052,27.153386454183266,27.203187250996017,27.252988047808763,27.302788844621514,27.352589641434264,27.40239043824701,27.45219123505976,27.50199203187251,27.551792828685258,27.60159362549801,27.65139442231076,27.701195219123505,27.750996015936256,27.800796812749002,27.850597609561753,27.900398406374503,27.95019920318725,28.0]}
},{}],166:[function(require,module,exports){
module.exports={"expected":[-0.035729481991072475,-0.03554724134027826,-0.035366851088091206,-0.03518828318299127,-0.035011510137841796,-0.03483650501576095,-0.034663241416415635,-0.03449169346272319,-0.03432183578794688,-0.03415364352317151,-0.03398709228514617,-0.03382215816448174,-0.03365881771419102,-0.033497047938559885,-0.03333682628233855,-0.03317813062024202,-0.033020939246749634,-0.032865230866193695,-0.032710984583127746,-0.03255817989296524,-0.0324067966728799,-0.03225681517295913,-0.03210821600760244,-0.03196098014715696,-0.0318150889097823,-0.031670523953537796,-0.03152726726868465,-0.031385301170196514,-0.031244608290471886,-0.03110517157224186,-0.030966974261667266,-0.030829999901619384,-0.030694232325138376,-0.030559655649064155,-0.030426254267834272,-0.03029401284744386,-0.030162916319562583,-0.03003294987580395,-0.029904098962142356,-0.029776349273473474,-0.029649686748313586,-0.029524097563633996,-0.029399568129826182,-0.029276085085794146,-0.029153635294170026,-0.029032205836649515,-0.02891178400944342,-0.02879235731884226,-0.02867391347689035,-0.02855644039716645,-0.028439926190667847,-0.028324359161794887,-0.028209727804433152,-0.02809602079813057,-0.02798322700436663,-0.027871335462911324,-0.027760335388271135,-0.02765021616621975,-0.027540967350411154,-0.0274325786590727,-0.027325039971776217,-0.02721834132628469,-0.027112472915472766,-0.027007425084318838,-0.026903188326966927,-0.026799753283856403,-0.026697110738917743,-0.026595251616832554,-0.0264941669803562,-0.026393848027701245,-0.026294286089980273,-0.026195472628706366,-0.026097399233349854,-0.026000057618949742,-0.025903439623778512,-0.02580753720705882,-0.025712342446730808,-0.02561784753726866,-0.02552404478754526,-0.02543092661874355,-0.025338485562313547,-0.025246714257973802,-0.025155605451756154,-0.025065151994092722,-0.024975346837944088,-0.02488618303696758,-0.024797653743724706,-0.024709752207926775,-0.0246224717747177,-0.024535805882993117,-0.02444974806375495,-0.024364291938500447,-0.02427943121764496,-0.024195159698977634,-0.024111471266149067,-0.024028359887190428,-0.02394581961306299,-0.023863844576237588,-0.02378242898930311,-0.023701567143603438,-0.02362125340790212,-0.023541482227074157,-0.023462248120824137,-0.02338354568243032,-0.023305369577513835,-0.02322771454283257,-0.023150575385099098,-0.02307394697982206,-0.022997824270170584,-0.022922202265861048,-0.022847076042065796,-0.02277244073834328,-0.022698291557589068,-0.022624623765007325,-0.02255143268710229,-0.02247871371068926,-0.02240646228192467,-0.02233467390535483,-0.022263344142982915,-0.02219246861335379,-0.02212204299065627,-0.02205206300384241,-0.021982524435763543,-0.021913423122322532,-0.021844754951642044,-0.021776515863248407,-0.021708701847270705,-0.02164130894365484,-0.021574333241392175,-0.021507770877762462,-0.021441618037590787,-0.021375870952518135,-0.02131052590028544,-0.021245579204030616,-0.02118102723159852,-0.02111686639486339,-0.02105309314906364,-0.020989703992148594,-0.020926695464137092,-0.020864064146487525,-0.020801806661479263,-0.020739919671605014,-0.020678399878974102,-0.02061724402472631,-0.020556448888456074,-0.02049601128764688,-0.0204359280771156,-0.020376196148466575,-0.020316812429555256,-0.020257773883961216,-0.020199077510470283,-0.020140720342565747,-0.020082699447928242,-0.02002501192794439,-0.019967654917223767,-0.019910625583124265,-0.019853921125285463,-0.019797538775170057,-0.019741475795613,-0.01968572948037836,-0.01963029715372359,-0.019575176169971224,-0.019520363913087715,-0.019465857796269366,-0.01941165526153517,-0.019357753779326425,-0.019304150848113048,-0.019250843994006367,-0.019197830770378344,-0.019145108757487064,-0.019092675562108388,-0.019040528817173642,-0.018988666181413247,-0.018937085339006104,-0.018885783999234792,-0.018834759896146212,-0.018784010788217877,-0.018733534458029444,-0.018683328711939628,-0.01863339137976825,-0.01858372031448342,-0.01853431339189364,-0.018485168510344877,-0.018436283590422427,-0.018387656574657477,-0.018339285427238308,-0.018291168133726082,-0.018243302700775055,-0.018195687155857176,-0.01814831954699101,-0.01810119794247489,-0.018054320430624174,-0.018007685119512635,-0.01796129013671781,-0.01791513362907029,-0.017869213762406865,-0.017823528721327482,-0.01777807670895587,-0.017732855946703877,-0.017687864674039357,-0.017643101148257612,-0.017598563644256278,-0.017554250454313608,-0.01751015988787013,-0.01746629027131356,-0.01742263994776694,-0.01737920727687998,-0.017335990634623467,-0.01729298841308678,-0.017250199020278377,-0.01720762087992926,-0.01716525243129935,-0.017123092128986675,-0.017081138442739452,-0.01703938985727079,-0.016997844872076253,-0.01695650200125399,-0.016915359773327497,-0.01687441673107102,-0.01683367143133737,-0.016793122444888352,-0.016752768356227566,-0.016712607763435628,-0.01667263927800776,-0.01663286152469371,-0.016593273141339973,-0.01655387277873422,-0.01651465910045196,-0.01647563078270541,-0.016436786514194442,-0.016398124995959693,-0.0163596449412377,-0.016321345075318097,-0.016283224135402796,-0.01624528087046717,-0.01620751404112312,-0.016169922419484107,-0.016132504789032002,-0.016095259944485855,-0.016058186691672378,-0.016021283847398315,-0.015984550239324484,-0.01594798470584164,-0.015911586095947932,-0.015875353269128128,-0.01583928509523443,-0.01580338045436894,-0.015767638236767703,-0.01573205734268633,-0.01569663668228717,-0.015661375175528004,-0.01562627175205221,-0.015591325351080454,-0.015556534921303771,-0.015521899420778135,-0.01548741781682038,-0.015453089085905541,-0.015418912213565554,-0.015384886194289292,-0.015351010031423903,-0.015317282737077486,-0.015283703332023021,-0.015250270845603585,-0.015216984315638768,-0.015183842788332362,-0.015150845318181203,-0.015117990967885266,-0.015085278808258851,-0.015052707918142979,-0.015020277384318883,-0.014987986301422656,-0.014955833771860952,-0.014923818905727802,-0.014891940820722467,-0.014860198642068409,-0.014828591502433187,-0.014797118541849482,-0.01476577890763705,-0.014734571754325729,-0.014703496243579339,-0.014672551544120623,-0.0146417368316571,-0.01461105128880784,-0.014580494105031169,-0.014550064476553295,-0.014519761606297801,-0.014489584703816035,-0.014459532985218343,-0.014429605673106204,-0.01439980199650515,-0.014370121190798547,-0.014340562497662196,-0.014311125164999723,-0.01428180844687878,-0.014252611603468017,-0.014223533900974823,-0.014194574611583844,-0.014165733013396247,-0.0141370083903697,-0.014108400032259109,-0.014079907234558065,-0.014051529298440996,-0.014023265530706016,-0.01399511524371846,-0.013967077755355117,-0.013939152388949112,-0.013911338473235446,-0.013883635342297208,-0.013856042335512412,-0.013828558797501469,-0.01380118407807528,-0.013773917532183962,-0.013746758519866164,-0.013719706406198979,-0.013692760561248456,-0.013665920360020699,-0.013639185182413534,-0.013612554413168713,-0.013586027441824753,-0.013559603662670231,-0.013533282474697709,-0.013507063281558122,-0.013480945491515753,-0.013454928517403686,-0.013429011776579828,-0.013403194690883352,-0.013377476686591741,-0.01335185719437825,-0.013326335649269898,-0.01330091149060592,-0.013275584161996708,-0.013250353111283196,-0.01322521779049676,-0.013200177655819496,-0.013175232167545025,-0.013150380790039688,-0.013125622991704205,-0.013100958244935772,-0.013076386026090545,-0.01305190581544661,-0.013027517097167303,-0.013003219359264979,-0.012979012093565181,-0.01295489479567121,-0.012930866964929061,-0.01290692810439279,-0.012883077720790241,-0.012859315324489163,-0.01283564042946368,-0.012812052553261169,-0.012788551216969455,-0.012765135945184419,-0.012741806265977915,-0.012718561710866064,-0.012695401814777883,-0.012672326116024278,-0.012649334156267332,-0.012626425480489973,-0.01260359963696594,-0.012580856177230097,-0.012558194656049036,-0.01253561463139204,-0.012513115664402318,-0.012490697319368577,-0.012468359163696884,-0.01244610076788284,-0.012423921705484045,-0.012401821553092851,-0.012379799890309429,-0.01235785629971508,-0.012335990366845892,-0.0123142016801666,-0.012292489831044797,-0.012270854413725359,-0.01224929502530518,-0.01222781126570814,-0.012206402737660368,-0.012185069046665742,-0.012163809800981655,-0.012142624611595026,-0.012121513092198574,-0.012100474859167326,-0.012079509531535384,-0.012058616730972915,-0.0120377960817634,-0.012017047210781097,-0.011996369747468755,-0.011975763323815542,-0.011955227574335217,-0.011934762136044512,-0.011914366648441746,-0.011894040753485642,-0.011873784095574384,-0.011853596321524868,-0.011833477080552181,-0.011813426024249266,-0.011793442806566808,-0.011773527083793337,-0.011753678514535505,-0.011733896759698575,-0.011714181482467115,-0.011694532348285876,-0.011674949024840852,-0.011655431182040562,-0.011635978491997483,-0.011616590629009703,-0.011597267269542712,-0.011578008092211439,-0.01155881277776239,-0.011539681009056052,-0.011520612471049378,-0.011501606850778511,-0.011482663837341667,-0.011463783121882168,-0.011444964397571653,-0.011426207359593456,-0.01140751170512615,-0.011388877133327244,-0.011370303345317039,-0.011351790044162646,-0.01133333693486218,-0.011314943724329054,-0.01129661012137649,-0.011278335836702126,-0.011260120582872816,-0.01124196407430955,-0.011223866027272517,-0.011205826159846334,-0.01118784419192541,-0.011169919845199426,-0.011152052843138993,-0.011134242910981421,-0.011116489775716634,-0.011098793166073212,-0.01108115281250458,-0.011063568447175317,-0.011046039803947598,-0.011028566618367763,-0.011011148627653016,-0.010993785570678257,-0.010976477187963019,-0.010959223221658541,-0.01094202341553498,-0.010924877514968694,-0.010907785266929707,-0.010890746419969234,-0.010873760724207364,-0.010856827931320836,-0.010839947794530944,-0.010823120068591534,-0.010806344509777131,-0.010789620875871177,-0.010772948926154356,-0.010756328421393065,-0.010739759123827937,-0.010723240797162543,-0.010706773206552115,-0.010690356118592445,-0.01067398930130884,-0.010657672524145213,-0.010641405557953227,-0.010625188174981585,-0.0106090201488654,-0.010592901254615655,-0.010576831268608764,-0.010560809968576237,-0.010544837133594418,-0.01052891254407435,-0.010513035981751682,-0.01049720722967672,-0.010481426072204527,-0.010465692294985144,-0.010450005684953875,-0.01043436603032166,-0.010418773120565557,-0.010403226746419287,-0.010387726699863873,-0.010372272774118356,-0.010356864763630604,-0.010341502464068196,-0.010326185672309383,-0.010310914186434145,-0.010295687805715307,-0.010280506330609741,-0.010265369562749661,-0.010250277304933967,-0.010235229361119695,-0.010220225536413515,-0.010205265637063317,-0.010190349470449877,-0.010175476845078586,-0.010160647570571247,-0.010145861457657963,-0.010131118318169069,-0.010116417965027168,-0.010101760212239193,-0.010087144874888581,-0.010072571769127485,-0.010058040712169076,-0.010043551522279882,-0.010029104018772229,-0.01001469802199671,-0.010000333353334763],"x":[-28.0,-28.143426294820717,-28.286852589641434,-28.43027888446215,-28.573705179282868,-28.717131474103585,-28.860557768924302,-29.00398406374502,-29.147410358565736,-29.290836653386453,-29.43426294820717,-29.577689243027887,-29.721115537848604,-29.86454183266932,-30.00796812749004,-30.15139442231076,-30.294820717131476,-30.438247011952193,-30.58167330677291,-30.725099601593627,-30.868525896414344,-31.01195219123506,-31.155378486055778,-31.298804780876495,-31.44223107569721,-31.58565737051793,-31.729083665338646,-31.872509960159363,-32.01593625498008,-32.1593625498008,-32.30278884462152,-32.44621513944223,-32.58964143426295,-32.733067729083665,-32.876494023904385,-33.0199203187251,-33.16334661354582,-33.30677290836653,-33.45019920318725,-33.59362549800797,-33.73705179282869,-33.8804780876494,-34.02390438247012,-34.167330677290835,-34.310756972111555,-34.45418326693227,-34.59760956175299,-34.7410358565737,-34.88446215139442,-35.02788844621514,-35.17131474103586,-35.31474103585657,-35.45816733067729,-35.601593625498005,-35.745019920318725,-35.88844621513944,-36.03187250996016,-36.17529880478088,-36.31872509960159,-36.462151394422314,-36.60557768924303,-36.74900398406375,-36.89243027888446,-37.03585657370518,-37.179282868525895,-37.322709163346616,-37.46613545816733,-37.60956175298805,-37.75298804780876,-37.896414342629484,-38.0398406374502,-38.18326693227092,-38.32669322709163,-38.47011952191235,-38.613545816733065,-38.756972111553786,-38.9003984063745,-39.04382470119522,-39.18725099601593,-39.330677290836654,-39.47410358565737,-39.61752988047809,-39.7609561752988,-39.90438247011952,-40.04780876494024,-40.191235059760956,-40.33466135458168,-40.47808764940239,-40.62151394422311,-40.764940239043824,-40.908366533864545,-41.05179282868526,-41.19521912350598,-41.33864541832669,-41.48207171314741,-41.625498007968126,-41.76892430278885,-41.91235059760956,-42.05577689243028,-42.199203187250994,-42.342629482071715,-42.48605577689243,-42.62948207171315,-42.77290836653386,-42.91633466135458,-43.059760956175296,-43.20318725099602,-43.34661354581673,-43.49003984063745,-43.633466135458164,-43.776892430278885,-43.9203187250996,-44.06374501992032,-44.20717131474104,-44.35059760956175,-44.49402390438247,-44.63745019920319,-44.78087649402391,-44.92430278884462,-45.06772908366534,-45.211155378486055,-45.354581673306775,-45.49800796812749,-45.64143426294821,-45.78486055776892,-45.92828685258964,-46.07171314741036,-46.21513944223108,-46.35856573705179,-46.50199203187251,-46.645418326693225,-46.788844621513945,-46.93227091633466,-47.07569721115538,-47.21912350597609,-47.36254980079681,-47.50597609561753,-47.64940239043825,-47.79282868525896,-47.93625498007968,-48.0796812749004,-48.223107569721115,-48.366533864541836,-48.50996015936255,-48.65338645418327,-48.79681274900398,-48.940239043824704,-49.08366533864542,-49.22709163346614,-49.37051792828685,-49.51394422310757,-49.657370517928285,-49.800796812749006,-49.94422310756972,-50.08764940239044,-50.23107569721115,-50.374501992031874,-50.51792828685259,-50.66135458167331,-50.80478087649402,-50.94820717131474,-51.091633466135455,-51.235059760956176,-51.37848605577689,-51.52191235059761,-51.66533864541832,-51.808764940239044,-51.95219123505976,-52.09561752988048,-52.2390438247012,-52.38247011952191,-52.52589641434263,-52.669322709163346,-52.81274900398407,-52.95617529880478,-53.0996015936255,-53.243027888446214,-53.386454183266935,-53.52988047808765,-53.67330677290837,-53.81673306772908,-53.9601593625498,-54.103585657370516,-54.24701195219124,-54.39043824701195,-54.53386454183267,-54.677290836653384,-54.820717131474105,-54.96414342629482,-55.10756972111554,-55.25099601593625,-55.39442231075697,-55.537848605577686,-55.68127490039841,-55.82470119521912,-55.96812749003984,-56.11155378486056,-56.254980079681275,-56.398406374501995,-56.54183266932271,-56.68525896414343,-56.82868525896414,-56.97211155378486,-57.11553784860558,-57.2589641434263,-57.40239043824701,-57.54581673306773,-57.689243027888445,-57.832669322709165,-57.97609561752988,-58.1195219123506,-58.26294820717131,-58.40637450199203,-58.54980079681275,-58.69322709163347,-58.83665338645418,-58.9800796812749,-59.123505976095615,-59.266932270916335,-59.41035856573705,-59.55378486055777,-59.69721115537848,-59.8406374501992,-59.98406374501992,-60.12749003984064,-60.27091633466136,-60.41434262948207,-60.55776892430279,-60.701195219123505,-60.844621513944226,-60.98804780876494,-61.13147410358566,-61.27490039840637,-61.418326693227094,-61.56175298804781,-61.70517928286853,-61.84860557768924,-61.99203187250996,-62.135458167330675,-62.278884462151396,-62.42231075697211,-62.56573705179283,-62.70916334661354,-62.852589641434264,-62.99601593625498,-63.1394422310757,-63.28286852589641,-63.42629482071713,-63.569721115537845,-63.713147410358566,-63.85657370517928,-64.0,-64.14342629482071,-64.28685258964144,-64.43027888446215,-64.57370517928287,-64.71713147410358,-64.86055776892431,-65.00398406374502,-65.14741035856574,-65.29083665338645,-65.43426294820718,-65.57768924302789,-65.7211155378486,-65.86454183266932,-66.00796812749005,-66.15139442231076,-66.29482071713147,-66.43824701195219,-66.58167330677291,-66.72509960159363,-66.86852589641434,-67.01195219123505,-67.15537848605578,-67.2988047808765,-67.44223107569721,-67.58565737051792,-67.72908366533865,-67.87250996015936,-68.01593625498008,-68.1593625498008,-68.30278884462152,-68.44621513944223,-68.58964143426294,-68.73306772908367,-68.87649402390439,-69.0199203187251,-69.16334661354581,-69.30677290836654,-69.45019920318725,-69.59362549800797,-69.73705179282868,-69.88047808764941,-70.02390438247012,-70.16733067729083,-70.31075697211155,-70.45418326693228,-70.59760956175299,-70.7410358565737,-70.88446215139442,-71.02788844621514,-71.17131474103586,-71.31474103585657,-71.45816733067728,-71.60159362549801,-71.74501992031873,-71.88844621513944,-72.03187250996017,-72.17529880478088,-72.3187250996016,-72.4621513944223,-72.60557768924303,-72.74900398406375,-72.89243027888446,-73.03585657370517,-73.1792828685259,-73.32270916334662,-73.46613545816733,-73.60956175298804,-73.75298804780877,-73.89641434262948,-74.0398406374502,-74.18326693227091,-74.32669322709164,-74.47011952191235,-74.61354581673307,-74.75697211155378,-74.9003984063745,-75.04382470119522,-75.18725099601593,-75.33067729083665,-75.47410358565737,-75.61752988047809,-75.7609561752988,-75.90438247011951,-76.04780876494024,-76.19123505976096,-76.33466135458167,-76.4780876494024,-76.62151394422311,-76.76494023904382,-76.90836653386454,-77.05179282868527,-77.19521912350598,-77.33864541832669,-77.4820717131474,-77.62549800796813,-77.76892430278885,-77.91235059760956,-78.05577689243027,-78.199203187251,-78.34262948207171,-78.48605577689243,-78.62948207171314,-78.77290836653387,-78.91633466135458,-79.0597609561753,-79.20318725099601,-79.34661354581674,-79.49003984063745,-79.63346613545816,-79.77689243027888,-79.9203187250996,-80.06374501992032,-80.20717131474103,-80.35059760956176,-80.49402390438247,-80.63745019920319,-80.7808764940239,-80.92430278884463,-81.06772908366534,-81.21115537848605,-81.35458167330677,-81.4980079681275,-81.64143426294821,-81.78486055776892,-81.92828685258964,-82.07171314741036,-82.21513944223108,-82.35856573705179,-82.5019920318725,-82.64541832669323,-82.78884462151395,-82.93227091633466,-83.07569721115537,-83.2191235059761,-83.36254980079681,-83.50597609561753,-83.64940239043824,-83.79282868525897,-83.93625498007968,-84.0796812749004,-84.22310756972112,-84.36653386454184,-84.50996015936255,-84.65338645418326,-84.79681274900399,-84.9402390438247,-85.08366533864542,-85.22709163346613,-85.37051792828686,-85.51394422310757,-85.65737051792829,-85.800796812749,-85.94422310756973,-86.08764940239044,-86.23107569721115,-86.37450199203187,-86.5179282868526,-86.66135458167331,-86.80478087649402,-86.94820717131473,-87.09163346613546,-87.23505976095618,-87.37848605577689,-87.5219123505976,-87.66533864541833,-87.80876494023904,-87.95219123505976,-88.09561752988049,-88.2390438247012,-88.38247011952191,-88.52589641434263,-88.66932270916335,-88.81274900398407,-88.95617529880478,-89.0996015936255,-89.24302788844622,-89.38645418326693,-89.52988047808765,-89.67330677290836,-89.81673306772909,-89.9601593625498,-90.10358565737052,-90.24701195219123,-90.39043824701196,-90.53386454183267,-90.67729083665338,-90.8207171314741,-90.96414342629483,-91.10756972111554,-91.25099601593625,-91.39442231075697,-91.5378486055777,-91.6812749003984,-91.82470119521912,-91.96812749003983,-92.11155378486056,-92.25498007968127,-92.39840637450199,-92.54183266932272,-92.68525896414343,-92.82868525896414,-92.97211155378486,-93.11553784860558,-93.2589641434263,-93.40239043824701,-93.54581673306772,-93.68924302788845,-93.83266932270917,-93.97609561752988,-94.11952191235059,-94.26294820717132,-94.40637450199203,-94.54980079681275,-94.69322709163346,-94.83665338645419,-94.9800796812749,-95.12350597609561,-95.26693227091633,-95.41035856573706,-95.55378486055777,-95.69721115537848,-95.8406374501992,-95.98406374501992,-96.12749003984064,-96.27091633466135,-96.41434262948208,-96.55776892430279,-96.7011952191235,-96.84462151394422,-96.98804780876495,-97.13147410358566,-97.27490039840637,-97.41832669322709,-97.56175298804781,-97.70517928286853,-97.84860557768924,-97.99203187250995,-98.13545816733068,-98.2788844621514,-98.42231075697211,-98.56573705179282,-98.70916334661355,-98.85258964143426,-98.99601593625498,-99.13944223107569,-99.28286852589642,-99.42629482071713,-99.56972111553785,-99.71314741035856,-99.85657370517929,-100.0]}
},{}],167:[function(require,module,exports){
module.exports={"expected":[0.035729481991072475,0.03554724134027826,0.035366851088091206,0.03518828318299127,0.035011510137841796,0.03483650501576095,0.034663241416415635,0.03449169346272319,0.03432183578794688,0.03415364352317151,0.03398709228514617,0.03382215816448174,0.03365881771419102,0.033497047938559885,0.03333682628233855,0.03317813062024202,0.033020939246749634,0.032865230866193695,0.032710984583127746,0.03255817989296524,0.0324067966728799,0.03225681517295913,0.03210821600760244,0.03196098014715696,0.0318150889097823,0.031670523953537796,0.03152726726868465,0.031385301170196514,0.031244608290471886,0.03110517157224186,0.030966974261667266,0.030829999901619384,0.030694232325138376,0.030559655649064155,0.030426254267834272,0.03029401284744386,0.030162916319562583,0.03003294987580395,0.029904098962142356,0.029776349273473474,0.029649686748313586,0.029524097563633996,0.029399568129826182,0.029276085085794146,0.029153635294170026,0.029032205836649515,0.02891178400944342,0.02879235731884226,0.02867391347689035,0.02855644039716645,0.028439926190667847,0.028324359161794887,0.028209727804433152,0.02809602079813057,0.02798322700436663,0.027871335462911324,0.027760335388271135,0.02765021616621975,0.027540967350411154,0.0274325786590727,0.027325039971776217,0.02721834132628469,0.027112472915472766,0.027007425084318838,0.026903188326966927,0.026799753283856403,0.026697110738917743,0.026595251616832554,0.0264941669803562,0.026393848027701245,0.026294286089980273,0.026195472628706366,0.026097399233349854,0.026000057618949742,0.025903439623778512,0.02580753720705882,0.025712342446730808,0.02561784753726866,0.02552404478754526,0.02543092661874355,0.025338485562313547,0.025246714257973802,0.025155605451756154,0.025065151994092722,0.024975346837944088,0.02488618303696758,0.024797653743724706,0.024709752207926775,0.0246224717747177,0.024535805882993117,0.02444974806375495,0.024364291938500447,0.02427943121764496,0.024195159698977634,0.024111471266149067,0.024028359887190428,0.02394581961306299,0.023863844576237588,0.02378242898930311,0.023701567143603438,0.02362125340790212,0.023541482227074157,0.023462248120824137,0.02338354568243032,0.023305369577513835,0.02322771454283257,0.023150575385099098,0.02307394697982206,0.022997824270170584,0.022922202265861048,0.022847076042065796,0.02277244073834328,0.022698291557589068,0.022624623765007325,0.02255143268710229,0.02247871371068926,0.02240646228192467,0.02233467390535483,0.022263344142982915,0.02219246861335379,0.02212204299065627,0.02205206300384241,0.021982524435763543,0.021913423122322532,0.021844754951642044,0.021776515863248407,0.021708701847270705,0.02164130894365484,0.021574333241392175,0.021507770877762462,0.021441618037590787,0.021375870952518135,0.02131052590028544,0.021245579204030616,0.02118102723159852,0.02111686639486339,0.02105309314906364,0.020989703992148594,0.020926695464137092,0.020864064146487525,0.020801806661479263,0.020739919671605014,0.020678399878974102,0.02061724402472631,0.020556448888456074,0.02049601128764688,0.0204359280771156,0.020376196148466575,0.020316812429555256,0.020257773883961216,0.020199077510470283,0.020140720342565747,0.020082699447928242,0.02002501192794439,0.019967654917223767,0.019910625583124265,0.019853921125285463,0.019797538775170057,0.019741475795613,0.01968572948037836,0.01963029715372359,0.019575176169971224,0.019520363913087715,0.019465857796269366,0.01941165526153517,0.019357753779326425,0.019304150848113048,0.019250843994006367,0.019197830770378344,0.019145108757487064,0.019092675562108388,0.019040528817173642,0.018988666181413247,0.018937085339006104,0.018885783999234792,0.018834759896146212,0.018784010788217877,0.018733534458029444,0.018683328711939628,0.01863339137976825,0.01858372031448342,0.01853431339189364,0.018485168510344877,0.018436283590422427,0.018387656574657477,0.018339285427238308,0.018291168133726082,0.018243302700775055,0.018195687155857176,0.01814831954699101,0.01810119794247489,0.018054320430624174,0.018007685119512635,0.01796129013671781,0.01791513362907029,0.017869213762406865,0.017823528721327482,0.01777807670895587,0.017732855946703877,0.017687864674039357,0.017643101148257612,0.017598563644256278,0.017554250454313608,0.01751015988787013,0.01746629027131356,0.01742263994776694,0.01737920727687998,0.017335990634623467,0.01729298841308678,0.017250199020278377,0.01720762087992926,0.01716525243129935,0.017123092128986675,0.017081138442739452,0.01703938985727079,0.016997844872076253,0.01695650200125399,0.016915359773327497,0.01687441673107102,0.01683367143133737,0.016793122444888352,0.016752768356227566,0.016712607763435628,0.01667263927800776,0.01663286152469371,0.016593273141339973,0.01655387277873422,0.01651465910045196,0.01647563078270541,0.016436786514194442,0.016398124995959693,0.0163596449412377,0.016321345075318097,0.016283224135402796,0.01624528087046717,0.01620751404112312,0.016169922419484107,0.016132504789032002,0.016095259944485855,0.016058186691672378,0.016021283847398315,0.015984550239324484,0.01594798470584164,0.015911586095947932,0.015875353269128128,0.01583928509523443,0.01580338045436894,0.015767638236767703,0.01573205734268633,0.01569663668228717,0.015661375175528004,0.01562627175205221,0.015591325351080454,0.015556534921303771,0.015521899420778135,0.01548741781682038,0.015453089085905541,0.015418912213565554,0.015384886194289292,0.015351010031423903,0.015317282737077486,0.015283703332023021,0.015250270845603585,0.015216984315638768,0.015183842788332362,0.015150845318181203,0.015117990967885266,0.015085278808258851,0.015052707918142979,0.015020277384318883,0.014987986301422656,0.014955833771860952,0.014923818905727802,0.014891940820722467,0.014860198642068409,0.014828591502433187,0.014797118541849482,0.01476577890763705,0.014734571754325729,0.014703496243579339,0.014672551544120623,0.0146417368316571,0.01461105128880784,0.014580494105031169,0.014550064476553295,0.014519761606297801,0.014489584703816035,0.014459532985218343,0.014429605673106204,0.01439980199650515,0.014370121190798547,0.014340562497662196,0.014311125164999723,0.01428180844687878,0.014252611603468017,0.014223533900974823,0.014194574611583844,0.014165733013396247,0.0141370083903697,0.014108400032259109,0.014079907234558065,0.014051529298440996,0.014023265530706016,0.01399511524371846,0.013967077755355117,0.013939152388949112,0.013911338473235446,0.013883635342297208,0.013856042335512412,0.013828558797501469,0.01380118407807528,0.013773917532183962,0.013746758519866164,0.013719706406198979,0.013692760561248456,0.013665920360020699,0.013639185182413534,0.013612554413168713,0.013586027441824753,0.013559603662670231,0.013533282474697709,0.013507063281558122,0.013480945491515753,0.013454928517403686,0.013429011776579828,0.013403194690883352,0.013377476686591741,0.01335185719437825,0.013326335649269898,0.01330091149060592,0.013275584161996708,0.013250353111283196,0.01322521779049676,0.013200177655819496,0.013175232167545025,0.013150380790039688,0.013125622991704205,0.013100958244935772,0.013076386026090545,0.01305190581544661,0.013027517097167303,0.013003219359264979,0.012979012093565181,0.01295489479567121,0.012930866964929061,0.01290692810439279,0.012883077720790241,0.012859315324489163,0.01283564042946368,0.012812052553261169,0.012788551216969455,0.012765135945184419,0.012741806265977915,0.012718561710866064,0.012695401814777883,0.012672326116024278,0.012649334156267332,0.012626425480489973,0.01260359963696594,0.012580856177230097,0.012558194656049036,0.01253561463139204,0.012513115664402318,0.012490697319368577,0.012468359163696884,0.01244610076788284,0.012423921705484045,0.012401821553092851,0.012379799890309429,0.01235785629971508,0.012335990366845892,0.0123142016801666,0.012292489831044797,0.012270854413725359,0.01224929502530518,0.01222781126570814,0.012206402737660368,0.012185069046665742,0.012163809800981655,0.012142624611595026,0.012121513092198574,0.012100474859167326,0.012079509531535384,0.012058616730972915,0.0120377960817634,0.012017047210781097,0.011996369747468755,0.011975763323815542,0.011955227574335217,0.011934762136044512,0.011914366648441746,0.011894040753485642,0.011873784095574384,0.011853596321524868,0.011833477080552181,0.011813426024249266,0.011793442806566808,0.011773527083793337,0.011753678514535505,0.011733896759698575,0.011714181482467115,0.011694532348285876,0.011674949024840852,0.011655431182040562,0.011635978491997483,0.011616590629009703,0.011597267269542712,0.011578008092211439,0.01155881277776239,0.011539681009056052,0.011520612471049378,0.011501606850778511,0.011482663837341667,0.011463783121882168,0.011444964397571653,0.011426207359593456,0.01140751170512615,0.011388877133327244,0.011370303345317039,0.011351790044162646,0.01133333693486218,0.011314943724329054,0.01129661012137649,0.011278335836702126,0.011260120582872816,0.01124196407430955,0.011223866027272517,0.011205826159846334,0.01118784419192541,0.011169919845199426,0.011152052843138993,0.011134242910981421,0.011116489775716634,0.011098793166073212,0.01108115281250458,0.011063568447175317,0.011046039803947598,0.011028566618367763,0.011011148627653016,0.010993785570678257,0.010976477187963019,0.010959223221658541,0.01094202341553498,0.010924877514968694,0.010907785266929707,0.010890746419969234,0.010873760724207364,0.010856827931320836,0.010839947794530944,0.010823120068591534,0.010806344509777131,0.010789620875871177,0.010772948926154356,0.010756328421393065,0.010739759123827937,0.010723240797162543,0.010706773206552115,0.010690356118592445,0.01067398930130884,0.010657672524145213,0.010641405557953227,0.010625188174981585,0.0106090201488654,0.010592901254615655,0.010576831268608764,0.010560809968576237,0.010544837133594418,0.01052891254407435,0.010513035981751682,0.01049720722967672,0.010481426072204527,0.010465692294985144,0.010450005684953875,0.01043436603032166,0.010418773120565557,0.010403226746419287,0.010387726699863873,0.010372272774118356,0.010356864763630604,0.010341502464068196,0.010326185672309383,0.010310914186434145,0.010295687805715307,0.010280506330609741,0.010265369562749661,0.010250277304933967,0.010235229361119695,0.010220225536413515,0.010205265637063317,0.010190349470449877,0.010175476845078586,0.010160647570571247,0.010145861457657963,0.010131118318169069,0.010116417965027168,0.010101760212239193,0.010087144874888581,0.010072571769127485,0.010058040712169076,0.010043551522279882,0.010029104018772229,0.01001469802199671,0.010000333353334763],"x":[28.0,28.143426294820717,28.286852589641434,28.43027888446215,28.573705179282868,28.717131474103585,28.860557768924302,29.00398406374502,29.147410358565736,29.290836653386453,29.43426294820717,29.577689243027887,29.721115537848604,29.86454183266932,30.00796812749004,30.15139442231076,30.294820717131476,30.438247011952193,30.58167330677291,30.725099601593627,30.868525896414344,31.01195219123506,31.155378486055778,31.298804780876495,31.44223107569721,31.58565737051793,31.729083665338646,31.872509960159363,32.01593625498008,32.1593625498008,32.30278884462152,32.44621513944223,32.58964143426295,32.733067729083665,32.876494023904385,33.0199203187251,33.16334661354582,33.30677290836653,33.45019920318725,33.59362549800797,33.73705179282869,33.8804780876494,34.02390438247012,34.167330677290835,34.310756972111555,34.45418326693227,34.59760956175299,34.7410358565737,34.88446215139442,35.02788844621514,35.17131474103586,35.31474103585657,35.45816733067729,35.601593625498005,35.745019920318725,35.88844621513944,36.03187250996016,36.17529880478088,36.31872509960159,36.462151394422314,36.60557768924303,36.74900398406375,36.89243027888446,37.03585657370518,37.179282868525895,37.322709163346616,37.46613545816733,37.60956175298805,37.75298804780876,37.896414342629484,38.0398406374502,38.18326693227092,38.32669322709163,38.47011952191235,38.613545816733065,38.756972111553786,38.9003984063745,39.04382470119522,39.18725099601593,39.330677290836654,39.47410358565737,39.61752988047809,39.7609561752988,39.90438247011952,40.04780876494024,40.191235059760956,40.33466135458168,40.47808764940239,40.62151394422311,40.764940239043824,40.908366533864545,41.05179282868526,41.19521912350598,41.33864541832669,41.48207171314741,41.625498007968126,41.76892430278885,41.91235059760956,42.05577689243028,42.199203187250994,42.342629482071715,42.48605577689243,42.62948207171315,42.77290836653386,42.91633466135458,43.059760956175296,43.20318725099602,43.34661354581673,43.49003984063745,43.633466135458164,43.776892430278885,43.9203187250996,44.06374501992032,44.20717131474104,44.35059760956175,44.49402390438247,44.63745019920319,44.78087649402391,44.92430278884462,45.06772908366534,45.211155378486055,45.354581673306775,45.49800796812749,45.64143426294821,45.78486055776892,45.92828685258964,46.07171314741036,46.21513944223108,46.35856573705179,46.50199203187251,46.645418326693225,46.788844621513945,46.93227091633466,47.07569721115538,47.21912350597609,47.36254980079681,47.50597609561753,47.64940239043825,47.79282868525896,47.93625498007968,48.0796812749004,48.223107569721115,48.366533864541836,48.50996015936255,48.65338645418327,48.79681274900398,48.940239043824704,49.08366533864542,49.22709163346614,49.37051792828685,49.51394422310757,49.657370517928285,49.800796812749006,49.94422310756972,50.08764940239044,50.23107569721115,50.374501992031874,50.51792828685259,50.66135458167331,50.80478087649402,50.94820717131474,51.091633466135455,51.235059760956176,51.37848605577689,51.52191235059761,51.66533864541832,51.808764940239044,51.95219123505976,52.09561752988048,52.2390438247012,52.38247011952191,52.52589641434263,52.669322709163346,52.81274900398407,52.95617529880478,53.0996015936255,53.243027888446214,53.386454183266935,53.52988047808765,53.67330677290837,53.81673306772908,53.9601593625498,54.103585657370516,54.24701195219124,54.39043824701195,54.53386454183267,54.677290836653384,54.820717131474105,54.96414342629482,55.10756972111554,55.25099601593625,55.39442231075697,55.537848605577686,55.68127490039841,55.82470119521912,55.96812749003984,56.11155378486056,56.254980079681275,56.398406374501995,56.54183266932271,56.68525896414343,56.82868525896414,56.97211155378486,57.11553784860558,57.2589641434263,57.40239043824701,57.54581673306773,57.689243027888445,57.832669322709165,57.97609561752988,58.1195219123506,58.26294820717131,58.40637450199203,58.54980079681275,58.69322709163347,58.83665338645418,58.9800796812749,59.123505976095615,59.266932270916335,59.41035856573705,59.55378486055777,59.69721115537848,59.8406374501992,59.98406374501992,60.12749003984064,60.27091633466136,60.41434262948207,60.55776892430279,60.701195219123505,60.844621513944226,60.98804780876494,61.13147410358566,61.27490039840637,61.418326693227094,61.56175298804781,61.70517928286853,61.84860557768924,61.99203187250996,62.135458167330675,62.278884462151396,62.42231075697211,62.56573705179283,62.70916334661354,62.852589641434264,62.99601593625498,63.1394422310757,63.28286852589641,63.42629482071713,63.569721115537845,63.713147410358566,63.85657370517928,64.0,64.14342629482071,64.28685258964144,64.43027888446215,64.57370517928287,64.71713147410358,64.86055776892431,65.00398406374502,65.14741035856574,65.29083665338645,65.43426294820718,65.57768924302789,65.7211155378486,65.86454183266932,66.00796812749005,66.15139442231076,66.29482071713147,66.43824701195219,66.58167330677291,66.72509960159363,66.86852589641434,67.01195219123505,67.15537848605578,67.2988047808765,67.44223107569721,67.58565737051792,67.72908366533865,67.87250996015936,68.01593625498008,68.1593625498008,68.30278884462152,68.44621513944223,68.58964143426294,68.73306772908367,68.87649402390439,69.0199203187251,69.16334661354581,69.30677290836654,69.45019920318725,69.59362549800797,69.73705179282868,69.88047808764941,70.02390438247012,70.16733067729083,70.31075697211155,70.45418326693228,70.59760956175299,70.7410358565737,70.88446215139442,71.02788844621514,71.17131474103586,71.31474103585657,71.45816733067728,71.60159362549801,71.74501992031873,71.88844621513944,72.03187250996017,72.17529880478088,72.3187250996016,72.4621513944223,72.60557768924303,72.74900398406375,72.89243027888446,73.03585657370517,73.1792828685259,73.32270916334662,73.46613545816733,73.60956175298804,73.75298804780877,73.89641434262948,74.0398406374502,74.18326693227091,74.32669322709164,74.47011952191235,74.61354581673307,74.75697211155378,74.9003984063745,75.04382470119522,75.18725099601593,75.33067729083665,75.47410358565737,75.61752988047809,75.7609561752988,75.90438247011951,76.04780876494024,76.19123505976096,76.33466135458167,76.4780876494024,76.62151394422311,76.76494023904382,76.90836653386454,77.05179282868527,77.19521912350598,77.33864541832669,77.4820717131474,77.62549800796813,77.76892430278885,77.91235059760956,78.05577689243027,78.199203187251,78.34262948207171,78.48605577689243,78.62948207171314,78.77290836653387,78.91633466135458,79.0597609561753,79.20318725099601,79.34661354581674,79.49003984063745,79.63346613545816,79.77689243027888,79.9203187250996,80.06374501992032,80.20717131474103,80.35059760956176,80.49402390438247,80.63745019920319,80.7808764940239,80.92430278884463,81.06772908366534,81.21115537848605,81.35458167330677,81.4980079681275,81.64143426294821,81.78486055776892,81.92828685258964,82.07171314741036,82.21513944223108,82.35856573705179,82.5019920318725,82.64541832669323,82.78884462151395,82.93227091633466,83.07569721115537,83.2191235059761,83.36254980079681,83.50597609561753,83.64940239043824,83.79282868525897,83.93625498007968,84.0796812749004,84.22310756972112,84.36653386454184,84.50996015936255,84.65338645418326,84.79681274900399,84.9402390438247,85.08366533864542,85.22709163346613,85.37051792828686,85.51394422310757,85.65737051792829,85.800796812749,85.94422310756973,86.08764940239044,86.23107569721115,86.37450199203187,86.5179282868526,86.66135458167331,86.80478087649402,86.94820717131473,87.09163346613546,87.23505976095618,87.37848605577689,87.5219123505976,87.66533864541833,87.80876494023904,87.95219123505976,88.09561752988049,88.2390438247012,88.38247011952191,88.52589641434263,88.66932270916335,88.81274900398407,88.95617529880478,89.0996015936255,89.24302788844622,89.38645418326693,89.52988047808765,89.67330677290836,89.81673306772909,89.9601593625498,90.10358565737052,90.24701195219123,90.39043824701196,90.53386454183267,90.67729083665338,90.8207171314741,90.96414342629483,91.10756972111554,91.25099601593625,91.39442231075697,91.5378486055777,91.6812749003984,91.82470119521912,91.96812749003983,92.11155378486056,92.25498007968127,92.39840637450199,92.54183266932272,92.68525896414343,92.82868525896414,92.97211155378486,93.11553784860558,93.2589641434263,93.40239043824701,93.54581673306772,93.68924302788845,93.83266932270917,93.97609561752988,94.11952191235059,94.26294820717132,94.40637450199203,94.54980079681275,94.69322709163346,94.83665338645419,94.9800796812749,95.12350597609561,95.26693227091633,95.41035856573706,95.55378486055777,95.69721115537848,95.8406374501992,95.98406374501992,96.12749003984064,96.27091633466135,96.41434262948208,96.55776892430279,96.7011952191235,96.84462151394422,96.98804780876495,97.13147410358566,97.27490039840637,97.41832669322709,97.56175298804781,97.70517928286853,97.84860557768924,97.99203187250995,98.13545816733068,98.2788844621514,98.42231075697211,98.56573705179282,98.70916334661355,98.85258964143426,98.99601593625498,99.13944223107569,99.28286852589642,99.42629482071713,99.56972111553785,99.71314741035856,99.85657370517929,100.0]}
},{}],168:[function(require,module,exports){
module.exports={"expected":[-1.5222612188617113,-1.504586603996554,-1.4875757829269853,-1.4711827314360777,-1.4553660422356198,-1.4400883274295309,-1.4253157146233255,-1.4110174196020666,-1.397165382025739,-1.3837339533089152,-1.3706996279639225,-1.3580408113409939,-1.3457376180039984,-1.3337716960170605,-1.3221260732461817,-1.3107850224467472,-1.299733942447189,-1.2889592531779241,-1.27844830265359,-1.268189284311477,-1.258171163352654,-1.2483836109342261,-1.23881694522946,-1.2294620785132346,-1.2203104695484495,-1.2113540806486411,-1.2025853388762893,-1.1939971009078294,-1.185582621157269,-1.177335522802342,-1.1692497714017163,-1.1613196508300776,-1.1535397412909425,-1.1459048991955825,-1.1384102387211692,-1.131051114882736,-1.123823107972237,-1.1167220092343302,-1.1097438076627764,-1.1028846778138675,-1.096140968544315,-1.0895091925906872,-1.0829860169160574,-1.0765682537570536,-1.0702528523112094,-1.0640368910104332,-1.0579175703316916,-1.0518922061007079,-1.045958223248642,-1.0401131499854857,-1.0343546123572196,-1.028680329156812,-1.0230881071618,-1.017575836673619,-1.01214148733604,-1.0067831042119981,-1.0014988040999027,-0.996286772072088,-0.9911452582195268,-0.9860725745882294,-0.9810670922939403,-0.9761272388028316,-0.9712514953668497,-0.966438394603295,-0.9616865182089999,-0.9569944948002216,-0.9523609978700524,-0.9477847438557462,-0.9432644903089489,-0.9387990341623247,-0.9343872100865429,-0.9300278889320407,-0.9257199762503567,-0.9214624108902181,-0.9172541636638843,-0.913094236079575,-0.9089816591360902,-0.904915492175996,-0.9008948217939962,-0.8969187607973309,-0.8929864472152577,-0.8890970433548595,-0.8852497349006028,-0.8814437300552372,-0.877678258719779,-0.8739525717104644,-0.8702659400106908,-0.8666176540560862,-0.8630070230509628,-0.859433374314514,-0.8558960526552202,-0.8523944197720077,-0.8489278536808073,-0.845495748165227,-0.8420975122501315,-0.838732569696995,-0.8354003585199522,-0.8321003305215402,-0.8288319508471755,-0.8255946975574674,-0.8223880612175182,-0.8192115445024044,-0.8160646618180856,-0.8129469389370146,-0.8098579126477796,-0.806797130418126,-0.8037641500707564,-0.8007585394713281,-0.7977798762281019,-0.7948277474027244,-0.7919017492316563,-0.7890014868577703,-0.7861265740716873,-0.7832766330624223,-0.7804512941769463,-0.777650195688278,-0.774872983571753,-0.7721193112891199,-0.7693888395801399,-0.7666812362613812,-0.7639961760319074,-0.7613333402855826,-0.7586924169297257,-0.7560731002098495,-0.753475090540255,-0.7508980943402339,-0.7483418238756678,-0.745805997105809,-0.7432903375350367,-0.7407945740694069,-0.7383184408777962,-0.7358616772574791,-0.7334240275039592,-0.7310052407848993,-0.7286050710179959,-0.726223276752647,-0.723859621055281,-0.7215138713982013,-0.7191857995518269,-0.7168751814802011,-0.7145817972396494,-0.7123054308804763,-0.7100458703515905,-0.7078029074079553,-0.7055763375207622,-0.7033659597902362,-0.7011715768609779,-0.6989929948397534,-0.6968300232156529,-0.6946824747825285,-0.6925501655636415,-0.6904329147384397,-0.6883305445713936,-0.686242880342823,-0.6841697502816474,-0.6821109854999962,-0.680066419929618,-0.6780358902600289,-0.6760192358783447,-0.6740162988107384,-0.6720269236654789,-0.6700509575774879,-0.6680882501543787,-0.6661386534239223,-0.664202021782897,-0.662278211947281,-0.6603670829037412,-0.6584684958623832,-0.6565823142107182,-0.6547084034688138,-0.6528466312455901,-0.6509968671962252,-0.6491589829806407,-0.6473328522230288,-0.6455183504723947,-0.6437153551640811,-0.6419237455822467,-0.6401434028232714,-0.638374209760057,-0.636616051007203,-0.6348688128870277,-0.6331323833964104,-0.6314066521744348,-0.6296915104708036,-0.6279868511150107,-0.6262925684862418,-0.624608558483988,-0.6229347184993499,-0.6212709473870122,-0.619617145437874,-0.6179732143523102,-0.6163390572140529,-0.6147145784646723,-0.6130996838786391,-0.6114942805389592,-0.6098982768133553,-0.6083115823309908,-0.6067341079597129,-0.6051657657838074,-0.6036064690822471,-0.6020561323074223,-0.6005146710643429,-0.5989820020902936,-0.5974580432349389,-0.5959427134408578,-0.5944359327245021,-0.5929376221575666,-0.591447703848758,-0.589966100925957,-0.5884927375187573,-0.5870275387413794,-0.5855704306759414,-0.5841213403560853,-0.5826801957509458,-0.5812469257494518,-0.5798214601449581,-0.5784037296201924,-0.5769936657325129,-0.5755912008994714,-0.5741962683846682,-0.5728088022838976,-0.571428737511574,-0.5700560097874312,-0.5686905556234922,-0.5673323123112965,-0.5659812179093863,-0.5646372112310383,-0.5633002318322411,-0.5619702199999086,-0.5606471167403256,-0.5593308637678198,-0.5580214034936534,-0.5567186790151332,-0.5554226341049291,-0.5541332132005997,-0.5528503613943196,-0.5515740244228013,-0.5503041486574124,-0.5490406810944769,-0.5477835693457634,-0.5465327616291508,-0.5452882067594687,-0.5440498541395113,-0.5428176537512175,-0.5415915561470147,-0.5403715124413231,-0.5391574743022175,-0.5379493939432407,-0.5367472241153685,-0.5355509180991189,-0.5343604296968083,-0.5331757132249442,-0.5319967235067573,-0.5308234158648681,-0.5296557461140837,-0.5284936705543233,-0.5273371459636709,-0.5261861295915498,-0.5250405791520187,-0.5239004528171849,-0.5227657092107335,-0.5216363074015704,-0.5205122068975743,-0.5193933676394598,-0.5182797499947439,-0.5171713147518193,-0.5160680231141268,-0.5149698366944296,-0.5138767175091854,-0.5127886279730118,-0.5117055308932492,-0.5106273894646124,-0.5095541672639345,-0.5084858282449976,-0.5074223367334505,-0.5063636574218122,-0.5053097553645565,-0.5042605959732793,-0.5032161450119463,-0.5021763685922174,-0.5011412331688482,-0.5001107055351686,-0.4990847528186323,-0.49806334247644046,-0.4970464422912359,-0.4960340203668667,-0.49502604512421744,-0.49402248529710896,-0.49302330992826193,-0.4920284883653261,-0.49103799025697104,-0.4900517855490416,-0.48906984448077095,-0.4880921375810552,-0.48711863566478664,-0.4861493098292431,-0.4851841314505345,-0.48422307218010474,-0.48326610394128733,-0.48231319892591507,-0.48136432959098097,-0.48041946865535134,-0.47947858909652896,-0.4785416641474657,-0.4776086672934234,-0.47667957226888286,-0.4757543530545002,-0.4748329838741066,-0.47391543919175716,-0.47300169370882084,-0.4720917223611145,-0.47118550031608153,-0.47028300297001047,-0.4693842059452955,-0.46848908508773746,-0.4675976164638854,-0.4667097763584157,-0.46582554127155107,-0.4649448879165162,-0.46406779321703173,-0.4631942343048432,-0.46232418851728674,-0.4614576333948899,-0.46059454667900696,-0.45973490630948777,-0.45887869042238094,-0.45802587734766914,-0.4571764456070364,-0.45633037391166853,-0.45548764116008295,-0.4546482264359907,-0.4538121090061874,-0.45297926831847485,-0.45214968399961114,-0.4513233358532893,-0.45050020385814504,-0.44968026816579115,-0.4488635090988796,-0.4480499071491907,-0.4472394429757481,-0.4464320974029601,-0.44562785141878586,-0.44482668617292814,-0.4440285829750491,-0.4432335232930106,-0.44244148875113953,-0.44165246112851575,-0.4408664223572831,-0.4400833545209831,-0.439303239852912,-0.43852606073449824,-0.437751799693703,-0.43698043940344145,-0.43621196268002504,-0.4354463524816246,-0.43468359190675265,-0.4339236641927684,-0.4331665527143994,-0.4324122409822842,-0.43166071264153405,-0.4309119514703128,-0.4301659413784362,-0.4294226664059878,-0.4286821107219546,-0.42794425862287955,-0.42720909453153044,-0.4264766029955883,-0.42574676868635003,-0.42501957639744914,-0.4242950110435926,-0.4235730576593135,-0.42285370139774003,-0.4221369275293787,-0.4214227214409153,-0.4207110686340288,-0.42000195472422097,-0.41929536543966117,-0.4185912866200448,-0.41788970421546645,-0.41719060428530674,-0.41649397299713387,-0.4157997966256173,-0.4151080615514561,-0.4144187542603204,-0.413731861341805,-0.4130473694883972,-0.41236526549445535,-0.41168553625520227,-0.41100816876572893,-0.41033315012001087,-0.4096604675099374,-0.4089901082243513,-0.40832205964810064,-0.4076563092611023,-0.40699284463741653,-0.4063316534443322,-0.4056727234414634,-0.40501604247985734,-0.40436159850111175,-0.4037093795365033,-0.40305937370612677,-0.4024115692180438,-0.40176595436744195,-0.4011225175358033,-0.4004812471900837,-0.39984213188190076,-0.39920516024673136,-0.39857032100311923,-0.39793760295189134,-0.39730699497538285,-0.3966784860366722,-0.3960520651788241,-0.3954277215241415,-0.3948054442734263,-0.3941852227052488,-0.3935670461752247,-0.3929509041153011,-0.39233678603305056,-0.39172468151097284,-0.39111458020580514,-0.39050647184783915,-0.3899003462402472,-0.389296193258415,-0.38869400284928224,-0.3880937650306902,-0.38749546989073774,-0.3868991075871432,-0.38630466834661403,-0.38571214246422414,-0.3851215203027965,-0.38453279229229376,-0.3839459489292161,-0.3833609807760043,-0.38277787846045,-0.3821966326751136,-0.3816172341767463,-0.38103967378572035,-0.38046394238546466,-0.3798900309219069,-0.37931793040292144,-0.3787476318977833,-0.3781791265366284,-0.37761240550991904,-0.3770474600679155,-0.3764842815201535,-0.37592286123492685,-0.37536319063877616,-0.3748052612159821,-0.3742490645080656,-0.37369459211329165,-0.37314183568617965,-0.3725907869370185,-0.37204143763138703,-0.37149377958967866,-0.3709478046866322,-0.3704035048508673,-0.36986087206442436,-0.36931989836230933,-0.3687805758320439,-0.3682428966132196,-0.367706852897057,-0.3671724369259695,-0.3666396409931313,-0.36610845744205067,-0.36557887866614586,-0.3650508971083283,-0.3645245052605866,-0.36399969566357804,-0.3634764609062219,-0.36295479362529837,-0.3624346865050508,-0.3619161322767923,-0.36139912371851646,-0.3608836536545119,-0.3603697149549805,-0.3598573005356597,-0.35934640335744894,-0.3588370164260394,-0.3583291327915473,-0.35782274554815174,-0.35731784783373527,-0.35681443282952846,-0.3563124937597581,-0.3558120238912986,-0.3553130165333275,-0.354815465036983,-0.35431936279502707,-0.3538247032415097,-0.3533314798514377,-0.3528396861404467,-0.35234931566447575,-0.35186036201944604,-0.3513728188409417,-0.35088667980389465,-0.3504019386222722,-0.3499185890487672,-0.3494366248744922,-0.34895603992867563,-0.34847682807836167,-0.3479989832281121,-0.34752249931971263,-0.34704737033187966,-0.34657359027997264],"x":[-1.1,-1.103784860557769,-1.1075697211155378,-1.1113545816733068,-1.1151394422310756,-1.1189243027888447,-1.1227091633466135,-1.1264940239043826,-1.1302788844621514,-1.1340637450199202,-1.1378486055776893,-1.1416334661354581,-1.1454183266932272,-1.149203187250996,-1.1529880478087648,-1.156772908366534,-1.1605577689243027,-1.1643426294820718,-1.1681274900398406,-1.1719123505976095,-1.1756972111553785,-1.1794820717131473,-1.1832669322709164,-1.1870517928286852,-1.1908366533864543,-1.1946215139442231,-1.198406374501992,-1.202191235059761,-1.2059760956175298,-1.2097609561752989,-1.2135458167330677,-1.2173306772908365,-1.2211155378486056,-1.2249003984063744,-1.2286852589641435,-1.2324701195219123,-1.2362549800796814,-1.2400398406374502,-1.243824701195219,-1.247609561752988,-1.251394422310757,-1.255179282868526,-1.2589641434262948,-1.2627490039840636,-1.2665338645418327,-1.2703187250996015,-1.2741035856573706,-1.2778884462151394,-1.2816733067729085,-1.2854581673306773,-1.2892430278884461,-1.2930278884462152,-1.296812749003984,-1.300597609561753,-1.304382470119522,-1.3081673306772907,-1.3119521912350598,-1.3157370517928286,-1.3195219123505977,-1.3233067729083665,-1.3270916334661356,-1.3308764940239044,-1.3346613545816732,-1.3384462151394423,-1.3422310756972111,-1.3460159362549802,-1.349800796812749,-1.3535856573705178,-1.357370517928287,-1.3611553784860557,-1.3649402390438248,-1.3687250996015936,-1.3725099601593624,-1.3762948207171315,-1.3800796812749003,-1.3838645418326694,-1.3876494023904382,-1.3914342629482073,-1.395219123505976,-1.399003984063745,-1.402788844621514,-1.4065737051792828,-1.4103585657370519,-1.4141434262948207,-1.4179282868525895,-1.4217131474103586,-1.4254980079681274,-1.4292828685258965,-1.4330677290836653,-1.4368525896414344,-1.4406374501992032,-1.444422310756972,-1.448207171314741,-1.45199203187251,-1.455776892430279,-1.4595617529880478,-1.4633466135458166,-1.4671314741035857,-1.4709163346613545,-1.4747011952191236,-1.4784860557768924,-1.4822709163346615,-1.4860557768924303,-1.4898406374501991,-1.4936254980079682,-1.497410358565737,-1.501195219123506,-1.504980079681275,-1.5087649402390437,-1.5125498007968128,-1.5163346613545816,-1.5201195219123507,-1.5239043824701195,-1.5276892430278886,-1.5314741035856574,-1.5352589641434262,-1.5390438247011953,-1.542828685258964,-1.5466135458167332,-1.550398406374502,-1.5541832669322708,-1.5579681274900399,-1.5617529880478087,-1.5655378486055778,-1.5693227091633466,-1.5731075697211154,-1.5768924302788845,-1.5806772908366533,-1.5844621513944224,-1.5882470119521912,-1.5920318725099603,-1.595816733067729,-1.599601593625498,-1.603386454183267,-1.6071713147410358,-1.6109561752988049,-1.6147410358565737,-1.6185258964143425,-1.6223107569721116,-1.6260956175298804,-1.6298804780876495,-1.6336653386454183,-1.6374501992031874,-1.6412350597609562,-1.645019920318725,-1.648804780876494,-1.652589641434263,-1.656374501992032,-1.6601593625498008,-1.6639442231075696,-1.6677290836653387,-1.6715139442231075,-1.6752988047808766,-1.6790836653386454,-1.6828685258964144,-1.6866533864541833,-1.690438247011952,-1.6942231075697212,-1.69800796812749,-1.701792828685259,-1.7055776892430279,-1.7093625498007967,-1.7131474103585658,-1.7169322709163346,-1.7207171314741037,-1.7245019920318725,-1.7282868525896415,-1.7320717131474104,-1.7358565737051792,-1.7396414342629483,-1.743426294820717,-1.7472111553784861,-1.750996015936255,-1.7547808764940238,-1.7585657370517929,-1.7623505976095617,-1.7661354581673308,-1.7699203187250996,-1.7737051792828684,-1.7774900398406375,-1.7812749003984063,-1.7850597609561754,-1.7888446215139442,-1.7926294820717132,-1.796414342629482,-1.800199203187251,-1.80398406374502,-1.8077689243027888,-1.8115537848605578,-1.8153386454183267,-1.8191235059760955,-1.8229083665338646,-1.8266932270916334,-1.8304780876494025,-1.8342629482071713,-1.8380478087649403,-1.8418326693227092,-1.845617529880478,-1.849402390438247,-1.853187250996016,-1.856972111553785,-1.8607569721115538,-1.8645418326693226,-1.8683266932270917,-1.8721115537848605,-1.8758964143426295,-1.8796812749003984,-1.8834661354581674,-1.8872509960159363,-1.891035856573705,-1.8948207171314742,-1.898605577689243,-1.902390438247012,-1.9061752988047809,-1.9099601593625497,-1.9137450199203188,-1.9175298804780876,-1.9213147410358566,-1.9250996015936255,-1.9288844621513945,-1.9326693227091634,-1.9364541832669322,-1.9402390438247012,-1.94402390438247,-1.9478087649402391,-1.951593625498008,-1.9553784860557768,-1.9591633466135459,-1.9629482071713147,-1.9667330677290837,-1.9705179282868526,-1.9743027888446214,-1.9780876494023905,-1.9818725099601593,-1.9856573705179283,-1.9894422310756972,-1.9932270916334662,-1.997011952191235,-2.000796812749004,-2.004581673306773,-2.008366533864542,-2.0121513944223106,-2.0159362549800797,-2.0197211155378487,-2.0235059760956173,-2.0272908366533864,-2.0310756972111554,-2.0348605577689245,-2.038645418326693,-2.042430278884462,-2.046215139442231,-2.05,-2.053784860557769,-2.057569721115538,-2.061354581673307,-2.0651394422310756,-2.0689243027888446,-2.0727091633466137,-2.0764940239043823,-2.0802788844621514,-2.0840637450199204,-2.087848605577689,-2.091633466135458,-2.095418326693227,-2.099203187250996,-2.102988047808765,-2.106772908366534,-2.110557768924303,-2.1143426294820715,-2.1181274900398406,-2.1219123505976096,-2.1256972111553787,-2.1294820717131473,-2.1332669322709163,-2.1370517928286854,-2.140836653386454,-2.144621513944223,-2.148406374501992,-2.152191235059761,-2.15597609561753,-2.159760956175299,-2.163545816733068,-2.1673306772908365,-2.1711155378486056,-2.1749003984063746,-2.1786852589641432,-2.1824701195219123,-2.1862549800796813,-2.1900398406374504,-2.193824701195219,-2.197609561752988,-2.201394422310757,-2.2051792828685257,-2.2089641434262948,-2.212749003984064,-2.216533864541833,-2.2203187250996015,-2.2241035856573705,-2.2278884462151396,-2.231673306772908,-2.2354581673306773,-2.2392430278884463,-2.243027888446215,-2.246812749003984,-2.250597609561753,-2.254382470119522,-2.2581673306772907,-2.2619521912350598,-2.265737051792829,-2.2695219123505974,-2.2733067729083665,-2.2770916334661355,-2.2808764940239046,-2.284661354581673,-2.2884462151394422,-2.2922310756972113,-2.29601593625498,-2.299800796812749,-2.303585657370518,-2.307370517928287,-2.3111553784860557,-2.3149402390438247,-2.318725099601594,-2.3225099601593624,-2.3262948207171315,-2.3300796812749005,-2.333864541832669,-2.337649402390438,-2.3414342629482072,-2.3452191235059763,-2.349003984063745,-2.352788844621514,-2.356573705179283,-2.3603585657370516,-2.3641434262948207,-2.3679282868525897,-2.3717131474103588,-2.3754980079681274,-2.3792828685258964,-2.3830677290836655,-2.386852589641434,-2.390637450199203,-2.394422310756972,-2.398207171314741,-2.40199203187251,-2.405776892430279,-2.409561752988048,-2.4133466135458166,-2.4171314741035856,-2.4209163346613547,-2.4247011952191233,-2.4284860557768924,-2.4322709163346614,-2.4360557768924305,-2.439840637450199,-2.443625498007968,-2.447410358565737,-2.451195219123506,-2.454980079681275,-2.458764940239044,-2.462549800796813,-2.4663346613545816,-2.4701195219123506,-2.4739043824701197,-2.4776892430278883,-2.4814741035856573,-2.4852589641434264,-2.489043824701195,-2.492828685258964,-2.496613545816733,-2.500398406374502,-2.504183266932271,-2.50796812749004,-2.511752988047809,-2.5155378486055775,-2.5193227091633466,-2.5231075697211156,-2.5268924302788847,-2.5306772908366533,-2.5344621513944223,-2.5382470119521914,-2.54203187250996,-2.545816733067729,-2.549601593625498,-2.553386454183267,-2.5571713147410358,-2.560956175298805,-2.564741035856574,-2.5685258964143425,-2.5723107569721115,-2.5760956175298806,-2.579880478087649,-2.5836653386454183,-2.5874501992031873,-2.5912350597609564,-2.595019920318725,-2.598804780876494,-2.602589641434263,-2.6063745019920317,-2.6101593625498007,-2.61394422310757,-2.617729083665339,-2.6215139442231075,-2.6252988047808765,-2.6290836653386456,-2.632868525896414,-2.6366533864541832,-2.6404382470119523,-2.644223107569721,-2.64800796812749,-2.651792828685259,-2.655577689243028,-2.6593625498007967,-2.6631474103585657,-2.666932270916335,-2.6707171314741034,-2.6745019920318724,-2.6782868525896415,-2.6820717131474106,-2.685856573705179,-2.689641434262948,-2.6934262948207173,-2.697211155378486,-2.700996015936255,-2.704780876494024,-2.708565737051793,-2.7123505976095617,-2.7161354581673307,-2.7199203187250998,-2.7237051792828684,-2.7274900398406374,-2.7312749003984065,-2.735059760956175,-2.738844621513944,-2.742629482071713,-2.7464143426294823,-2.750199203187251,-2.75398406374502,-2.757768924302789,-2.7615537848605576,-2.7653386454183266,-2.7691235059760957,-2.7729083665338647,-2.7766932270916334,-2.7804780876494024,-2.7842629482071715,-2.78804780876494,-2.791832669322709,-2.795617529880478,-2.799402390438247,-2.803187250996016,-2.806972111553785,-2.810756972111554,-2.8145418326693226,-2.8183266932270916,-2.8221115537848607,-2.8258964143426293,-2.8296812749003983,-2.8334661354581674,-2.8372509960159364,-2.841035856573705,-2.844820717131474,-2.848605577689243,-2.8523904382470118,-2.856175298804781,-2.85996015936255,-2.863745019920319,-2.8675298804780875,-2.8713147410358566,-2.8750996015936257,-2.8788844621513943,-2.8826693227091633,-2.8864541832669324,-2.890239043824701,-2.89402390438247,-2.897808764940239,-2.901593625498008,-2.9053784860557768,-2.909163346613546,-2.912948207171315,-2.9167330677290835,-2.9205179282868525,-2.9243027888446216,-2.9280876494023906,-2.9318725099601592,-2.9356573705179283,-2.9394422310756974,-2.943227091633466,-2.947011952191235,-2.950796812749004,-2.954581673306773,-2.9583665338645417,-2.962151394422311,-2.96593625498008,-2.9697211155378485,-2.9735059760956175,-2.9772908366533866,-2.981075697211155,-2.9848605577689242,-2.9886454183266933,-2.9924302788844623,-2.996215139442231,-3.0]}
},{}],169:[function(require,module,exports){
module.exports={"expected":[1.5222612188617113,1.504586603996554,1.4875757829269853,1.4711827314360777,1.4553660422356198,1.4400883274295309,1.4253157146233255,1.4110174196020666,1.397165382025739,1.3837339533089152,1.3706996279639225,1.3580408113409939,1.3457376180039984,1.3337716960170605,1.3221260732461817,1.3107850224467472,1.299733942447189,1.2889592531779241,1.27844830265359,1.268189284311477,1.258171163352654,1.2483836109342261,1.23881694522946,1.2294620785132346,1.2203104695484495,1.2113540806486411,1.2025853388762893,1.1939971009078294,1.185582621157269,1.177335522802342,1.1692497714017163,1.1613196508300776,1.1535397412909425,1.1459048991955825,1.1384102387211692,1.131051114882736,1.123823107972237,1.1167220092343302,1.1097438076627764,1.1028846778138675,1.096140968544315,1.0895091925906872,1.0829860169160574,1.0765682537570536,1.0702528523112094,1.0640368910104332,1.0579175703316916,1.0518922061007079,1.045958223248642,1.0401131499854857,1.0343546123572196,1.028680329156812,1.0230881071618,1.017575836673619,1.01214148733604,1.0067831042119981,1.0014988040999027,0.996286772072088,0.9911452582195268,0.9860725745882294,0.9810670922939403,0.9761272388028316,0.9712514953668497,0.966438394603295,0.9616865182089999,0.9569944948002216,0.9523609978700524,0.9477847438557462,0.9432644903089489,0.9387990341623247,0.9343872100865429,0.9300278889320407,0.9257199762503567,0.9214624108902181,0.9172541636638843,0.913094236079575,0.9089816591360902,0.904915492175996,0.9008948217939962,0.8969187607973309,0.8929864472152577,0.8890970433548595,0.8852497349006028,0.8814437300552372,0.877678258719779,0.8739525717104644,0.8702659400106908,0.8666176540560862,0.8630070230509628,0.859433374314514,0.8558960526552202,0.8523944197720077,0.8489278536808073,0.845495748165227,0.8420975122501315,0.838732569696995,0.8354003585199522,0.8321003305215402,0.8288319508471755,0.8255946975574674,0.8223880612175182,0.8192115445024044,0.8160646618180856,0.8129469389370146,0.8098579126477796,0.806797130418126,0.8037641500707564,0.8007585394713281,0.7977798762281019,0.7948277474027244,0.7919017492316563,0.7890014868577703,0.7861265740716873,0.7832766330624223,0.7804512941769463,0.777650195688278,0.774872983571753,0.7721193112891199,0.7693888395801399,0.7666812362613812,0.7639961760319074,0.7613333402855826,0.7586924169297257,0.7560731002098495,0.753475090540255,0.7508980943402339,0.7483418238756678,0.745805997105809,0.7432903375350367,0.7407945740694069,0.7383184408777962,0.7358616772574791,0.7334240275039592,0.7310052407848993,0.7286050710179959,0.726223276752647,0.723859621055281,0.7215138713982013,0.7191857995518269,0.7168751814802011,0.7145817972396494,0.7123054308804763,0.7100458703515905,0.7078029074079553,0.7055763375207622,0.7033659597902362,0.7011715768609779,0.6989929948397534,0.6968300232156529,0.6946824747825285,0.6925501655636415,0.6904329147384397,0.6883305445713936,0.686242880342823,0.6841697502816474,0.6821109854999962,0.680066419929618,0.6780358902600289,0.6760192358783447,0.6740162988107384,0.6720269236654789,0.6700509575774879,0.6680882501543787,0.6661386534239223,0.664202021782897,0.662278211947281,0.6603670829037412,0.6584684958623832,0.6565823142107182,0.6547084034688138,0.6528466312455901,0.6509968671962252,0.6491589829806407,0.6473328522230288,0.6455183504723947,0.6437153551640811,0.6419237455822467,0.6401434028232714,0.638374209760057,0.636616051007203,0.6348688128870277,0.6331323833964104,0.6314066521744348,0.6296915104708036,0.6279868511150107,0.6262925684862418,0.624608558483988,0.6229347184993499,0.6212709473870122,0.619617145437874,0.6179732143523102,0.6163390572140529,0.6147145784646723,0.6130996838786391,0.6114942805389592,0.6098982768133553,0.6083115823309908,0.6067341079597129,0.6051657657838074,0.6036064690822471,0.6020561323074223,0.6005146710643429,0.5989820020902936,0.5974580432349389,0.5959427134408578,0.5944359327245021,0.5929376221575666,0.591447703848758,0.589966100925957,0.5884927375187573,0.5870275387413794,0.5855704306759414,0.5841213403560853,0.5826801957509458,0.5812469257494518,0.5798214601449581,0.5784037296201924,0.5769936657325129,0.5755912008994714,0.5741962683846682,0.5728088022838976,0.571428737511574,0.5700560097874312,0.5686905556234922,0.5673323123112965,0.5659812179093863,0.5646372112310383,0.5633002318322411,0.5619702199999086,0.5606471167403256,0.5593308637678198,0.5580214034936534,0.5567186790151332,0.5554226341049291,0.5541332132005997,0.5528503613943196,0.5515740244228013,0.5503041486574124,0.5490406810944769,0.5477835693457634,0.5465327616291508,0.5452882067594687,0.5440498541395113,0.5428176537512175,0.5415915561470147,0.5403715124413231,0.5391574743022175,0.5379493939432407,0.5367472241153685,0.5355509180991189,0.5343604296968083,0.5331757132249442,0.5319967235067573,0.5308234158648681,0.5296557461140837,0.5284936705543233,0.5273371459636709,0.5261861295915498,0.5250405791520187,0.5239004528171849,0.5227657092107335,0.5216363074015704,0.5205122068975743,0.5193933676394598,0.5182797499947439,0.5171713147518193,0.5160680231141268,0.5149698366944296,0.5138767175091854,0.5127886279730118,0.5117055308932492,0.5106273894646124,0.5095541672639345,0.5084858282449976,0.5074223367334505,0.5063636574218122,0.5053097553645565,0.5042605959732793,0.5032161450119463,0.5021763685922174,0.5011412331688482,0.5001107055351686,0.4990847528186323,0.49806334247644046,0.4970464422912359,0.4960340203668667,0.49502604512421744,0.49402248529710896,0.49302330992826193,0.4920284883653261,0.49103799025697104,0.4900517855490416,0.48906984448077095,0.4880921375810552,0.48711863566478664,0.4861493098292431,0.4851841314505345,0.48422307218010474,0.48326610394128733,0.48231319892591507,0.48136432959098097,0.48041946865535134,0.47947858909652896,0.4785416641474657,0.4776086672934234,0.47667957226888286,0.4757543530545002,0.4748329838741066,0.47391543919175716,0.47300169370882084,0.4720917223611145,0.47118550031608153,0.47028300297001047,0.4693842059452955,0.46848908508773746,0.4675976164638854,0.4667097763584157,0.46582554127155107,0.4649448879165162,0.46406779321703173,0.4631942343048432,0.46232418851728674,0.4614576333948899,0.46059454667900696,0.45973490630948777,0.45887869042238094,0.45802587734766914,0.4571764456070364,0.45633037391166853,0.45548764116008295,0.4546482264359907,0.4538121090061874,0.45297926831847485,0.45214968399961114,0.4513233358532893,0.45050020385814504,0.44968026816579115,0.4488635090988796,0.4480499071491907,0.4472394429757481,0.4464320974029601,0.44562785141878586,0.44482668617292814,0.4440285829750491,0.4432335232930106,0.44244148875113953,0.44165246112851575,0.4408664223572831,0.4400833545209831,0.439303239852912,0.43852606073449824,0.437751799693703,0.43698043940344145,0.43621196268002504,0.4354463524816246,0.43468359190675265,0.4339236641927684,0.4331665527143994,0.4324122409822842,0.43166071264153405,0.4309119514703128,0.4301659413784362,0.4294226664059878,0.4286821107219546,0.42794425862287955,0.42720909453153044,0.4264766029955883,0.42574676868635003,0.42501957639744914,0.4242950110435926,0.4235730576593135,0.42285370139774003,0.4221369275293787,0.4214227214409153,0.4207110686340288,0.42000195472422097,0.41929536543966117,0.4185912866200448,0.41788970421546645,0.41719060428530674,0.41649397299713387,0.4157997966256173,0.4151080615514561,0.4144187542603204,0.413731861341805,0.4130473694883972,0.41236526549445535,0.41168553625520227,0.41100816876572893,0.41033315012001087,0.4096604675099374,0.4089901082243513,0.40832205964810064,0.4076563092611023,0.40699284463741653,0.4063316534443322,0.4056727234414634,0.40501604247985734,0.40436159850111175,0.4037093795365033,0.40305937370612677,0.4024115692180438,0.40176595436744195,0.4011225175358033,0.4004812471900837,0.39984213188190076,0.39920516024673136,0.39857032100311923,0.39793760295189134,0.39730699497538285,0.3966784860366722,0.3960520651788241,0.3954277215241415,0.3948054442734263,0.3941852227052488,0.3935670461752247,0.3929509041153011,0.39233678603305056,0.39172468151097284,0.39111458020580514,0.39050647184783915,0.3899003462402472,0.389296193258415,0.38869400284928224,0.3880937650306902,0.38749546989073774,0.3868991075871432,0.38630466834661403,0.38571214246422414,0.3851215203027965,0.38453279229229376,0.3839459489292161,0.3833609807760043,0.38277787846045,0.3821966326751136,0.3816172341767463,0.38103967378572035,0.38046394238546466,0.3798900309219069,0.37931793040292144,0.3787476318977833,0.3781791265366284,0.37761240550991904,0.3770474600679155,0.3764842815201535,0.37592286123492685,0.37536319063877616,0.3748052612159821,0.3742490645080656,0.37369459211329165,0.37314183568617965,0.3725907869370185,0.37204143763138703,0.37149377958967866,0.3709478046866322,0.3704035048508673,0.36986087206442436,0.36931989836230933,0.3687805758320439,0.3682428966132196,0.367706852897057,0.3671724369259695,0.3666396409931313,0.36610845744205067,0.36557887866614586,0.3650508971083283,0.3645245052605866,0.36399969566357804,0.3634764609062219,0.36295479362529837,0.3624346865050508,0.3619161322767923,0.36139912371851646,0.3608836536545119,0.3603697149549805,0.3598573005356597,0.35934640335744894,0.3588370164260394,0.3583291327915473,0.35782274554815174,0.35731784783373527,0.35681443282952846,0.3563124937597581,0.3558120238912986,0.3553130165333275,0.354815465036983,0.35431936279502707,0.3538247032415097,0.3533314798514377,0.3528396861404467,0.35234931566447575,0.35186036201944604,0.3513728188409417,0.35088667980389465,0.3504019386222722,0.3499185890487672,0.3494366248744922,0.34895603992867563,0.34847682807836167,0.3479989832281121,0.34752249931971263,0.34704737033187966,0.34657359027997264],"x":[1.1,1.103784860557769,1.1075697211155378,1.1113545816733068,1.1151394422310756,1.1189243027888447,1.1227091633466135,1.1264940239043826,1.1302788844621514,1.1340637450199202,1.1378486055776893,1.1416334661354581,1.1454183266932272,1.149203187250996,1.1529880478087648,1.156772908366534,1.1605577689243027,1.1643426294820718,1.1681274900398406,1.1719123505976095,1.1756972111553785,1.1794820717131473,1.1832669322709164,1.1870517928286852,1.1908366533864543,1.1946215139442231,1.198406374501992,1.202191235059761,1.2059760956175298,1.2097609561752989,1.2135458167330677,1.2173306772908365,1.2211155378486056,1.2249003984063744,1.2286852589641435,1.2324701195219123,1.2362549800796814,1.2400398406374502,1.243824701195219,1.247609561752988,1.251394422310757,1.255179282868526,1.2589641434262948,1.2627490039840636,1.2665338645418327,1.2703187250996015,1.2741035856573706,1.2778884462151394,1.2816733067729085,1.2854581673306773,1.2892430278884461,1.2930278884462152,1.296812749003984,1.300597609561753,1.304382470119522,1.3081673306772907,1.3119521912350598,1.3157370517928286,1.3195219123505977,1.3233067729083665,1.3270916334661356,1.3308764940239044,1.3346613545816732,1.3384462151394423,1.3422310756972111,1.3460159362549802,1.349800796812749,1.3535856573705178,1.357370517928287,1.3611553784860557,1.3649402390438248,1.3687250996015936,1.3725099601593624,1.3762948207171315,1.3800796812749003,1.3838645418326694,1.3876494023904382,1.3914342629482073,1.395219123505976,1.399003984063745,1.402788844621514,1.4065737051792828,1.4103585657370519,1.4141434262948207,1.4179282868525895,1.4217131474103586,1.4254980079681274,1.4292828685258965,1.4330677290836653,1.4368525896414344,1.4406374501992032,1.444422310756972,1.448207171314741,1.45199203187251,1.455776892430279,1.4595617529880478,1.4633466135458166,1.4671314741035857,1.4709163346613545,1.4747011952191236,1.4784860557768924,1.4822709163346615,1.4860557768924303,1.4898406374501991,1.4936254980079682,1.497410358565737,1.501195219123506,1.504980079681275,1.5087649402390437,1.5125498007968128,1.5163346613545816,1.5201195219123507,1.5239043824701195,1.5276892430278886,1.5314741035856574,1.5352589641434262,1.5390438247011953,1.542828685258964,1.5466135458167332,1.550398406374502,1.5541832669322708,1.5579681274900399,1.5617529880478087,1.5655378486055778,1.5693227091633466,1.5731075697211154,1.5768924302788845,1.5806772908366533,1.5844621513944224,1.5882470119521912,1.5920318725099603,1.595816733067729,1.599601593625498,1.603386454183267,1.6071713147410358,1.6109561752988049,1.6147410358565737,1.6185258964143425,1.6223107569721116,1.6260956175298804,1.6298804780876495,1.6336653386454183,1.6374501992031874,1.6412350597609562,1.645019920318725,1.648804780876494,1.652589641434263,1.656374501992032,1.6601593625498008,1.6639442231075696,1.6677290836653387,1.6715139442231075,1.6752988047808766,1.6790836653386454,1.6828685258964144,1.6866533864541833,1.690438247011952,1.6942231075697212,1.69800796812749,1.701792828685259,1.7055776892430279,1.7093625498007967,1.7131474103585658,1.7169322709163346,1.7207171314741037,1.7245019920318725,1.7282868525896415,1.7320717131474104,1.7358565737051792,1.7396414342629483,1.743426294820717,1.7472111553784861,1.750996015936255,1.7547808764940238,1.7585657370517929,1.7623505976095617,1.7661354581673308,1.7699203187250996,1.7737051792828684,1.7774900398406375,1.7812749003984063,1.7850597609561754,1.7888446215139442,1.7926294820717132,1.796414342629482,1.800199203187251,1.80398406374502,1.8077689243027888,1.8115537848605578,1.8153386454183267,1.8191235059760955,1.8229083665338646,1.8266932270916334,1.8304780876494025,1.8342629482071713,1.8380478087649403,1.8418326693227092,1.845617529880478,1.849402390438247,1.853187250996016,1.856972111553785,1.8607569721115538,1.8645418326693226,1.8683266932270917,1.8721115537848605,1.8758964143426295,1.8796812749003984,1.8834661354581674,1.8872509960159363,1.891035856573705,1.8948207171314742,1.898605577689243,1.902390438247012,1.9061752988047809,1.9099601593625497,1.9137450199203188,1.9175298804780876,1.9213147410358566,1.9250996015936255,1.9288844621513945,1.9326693227091634,1.9364541832669322,1.9402390438247012,1.94402390438247,1.9478087649402391,1.951593625498008,1.9553784860557768,1.9591633466135459,1.9629482071713147,1.9667330677290837,1.9705179282868526,1.9743027888446214,1.9780876494023905,1.9818725099601593,1.9856573705179283,1.9894422310756972,1.9932270916334662,1.997011952191235,2.000796812749004,2.004581673306773,2.008366533864542,2.0121513944223106,2.0159362549800797,2.0197211155378487,2.0235059760956173,2.0272908366533864,2.0310756972111554,2.0348605577689245,2.038645418326693,2.042430278884462,2.046215139442231,2.05,2.053784860557769,2.057569721115538,2.061354581673307,2.0651394422310756,2.0689243027888446,2.0727091633466137,2.0764940239043823,2.0802788844621514,2.0840637450199204,2.087848605577689,2.091633466135458,2.095418326693227,2.099203187250996,2.102988047808765,2.106772908366534,2.110557768924303,2.1143426294820715,2.1181274900398406,2.1219123505976096,2.1256972111553787,2.1294820717131473,2.1332669322709163,2.1370517928286854,2.140836653386454,2.144621513944223,2.148406374501992,2.152191235059761,2.15597609561753,2.159760956175299,2.163545816733068,2.1673306772908365,2.1711155378486056,2.1749003984063746,2.1786852589641432,2.1824701195219123,2.1862549800796813,2.1900398406374504,2.193824701195219,2.197609561752988,2.201394422310757,2.2051792828685257,2.2089641434262948,2.212749003984064,2.216533864541833,2.2203187250996015,2.2241035856573705,2.2278884462151396,2.231673306772908,2.2354581673306773,2.2392430278884463,2.243027888446215,2.246812749003984,2.250597609561753,2.254382470119522,2.2581673306772907,2.2619521912350598,2.265737051792829,2.2695219123505974,2.2733067729083665,2.2770916334661355,2.2808764940239046,2.284661354581673,2.2884462151394422,2.2922310756972113,2.29601593625498,2.299800796812749,2.303585657370518,2.307370517928287,2.3111553784860557,2.3149402390438247,2.318725099601594,2.3225099601593624,2.3262948207171315,2.3300796812749005,2.333864541832669,2.337649402390438,2.3414342629482072,2.3452191235059763,2.349003984063745,2.352788844621514,2.356573705179283,2.3603585657370516,2.3641434262948207,2.3679282868525897,2.3717131474103588,2.3754980079681274,2.3792828685258964,2.3830677290836655,2.386852589641434,2.390637450199203,2.394422310756972,2.398207171314741,2.40199203187251,2.405776892430279,2.409561752988048,2.4133466135458166,2.4171314741035856,2.4209163346613547,2.4247011952191233,2.4284860557768924,2.4322709163346614,2.4360557768924305,2.439840637450199,2.443625498007968,2.447410358565737,2.451195219123506,2.454980079681275,2.458764940239044,2.462549800796813,2.4663346613545816,2.4701195219123506,2.4739043824701197,2.4776892430278883,2.4814741035856573,2.4852589641434264,2.489043824701195,2.492828685258964,2.496613545816733,2.500398406374502,2.504183266932271,2.50796812749004,2.511752988047809,2.5155378486055775,2.5193227091633466,2.5231075697211156,2.5268924302788847,2.5306772908366533,2.5344621513944223,2.5382470119521914,2.54203187250996,2.545816733067729,2.549601593625498,2.553386454183267,2.5571713147410358,2.560956175298805,2.564741035856574,2.5685258964143425,2.5723107569721115,2.5760956175298806,2.579880478087649,2.5836653386454183,2.5874501992031873,2.5912350597609564,2.595019920318725,2.598804780876494,2.602589641434263,2.6063745019920317,2.6101593625498007,2.61394422310757,2.617729083665339,2.6215139442231075,2.6252988047808765,2.6290836653386456,2.632868525896414,2.6366533864541832,2.6404382470119523,2.644223107569721,2.64800796812749,2.651792828685259,2.655577689243028,2.6593625498007967,2.6631474103585657,2.666932270916335,2.6707171314741034,2.6745019920318724,2.6782868525896415,2.6820717131474106,2.685856573705179,2.689641434262948,2.6934262948207173,2.697211155378486,2.700996015936255,2.704780876494024,2.708565737051793,2.7123505976095617,2.7161354581673307,2.7199203187250998,2.7237051792828684,2.7274900398406374,2.7312749003984065,2.735059760956175,2.738844621513944,2.742629482071713,2.7464143426294823,2.750199203187251,2.75398406374502,2.757768924302789,2.7615537848605576,2.7653386454183266,2.7691235059760957,2.7729083665338647,2.7766932270916334,2.7804780876494024,2.7842629482071715,2.78804780876494,2.791832669322709,2.795617529880478,2.799402390438247,2.803187250996016,2.806972111553785,2.810756972111554,2.8145418326693226,2.8183266932270916,2.8221115537848607,2.8258964143426293,2.8296812749003983,2.8334661354581674,2.8372509960159364,2.841035856573705,2.844820717131474,2.848605577689243,2.8523904382470118,2.856175298804781,2.85996015936255,2.863745019920319,2.8675298804780875,2.8713147410358566,2.8750996015936257,2.8788844621513943,2.8826693227091633,2.8864541832669324,2.890239043824701,2.89402390438247,2.897808764940239,2.901593625498008,2.9053784860557768,2.909163346613546,2.912948207171315,2.9167330677290835,2.9205179282868525,2.9243027888446216,2.9280876494023906,2.9318725099601592,2.9356573705179283,2.9394422310756974,2.943227091633466,2.947011952191235,2.950796812749004,2.954581673306773,2.9583665338645417,2.962151394422311,2.96593625498008,2.9697211155378485,2.9735059760956175,2.9772908366533866,2.981075697211155,2.9848605577689242,2.9886454183266933,2.9924302788844623,2.996215139442231,3.0]}
},{}],170:[function(require,module,exports){
(function (__filename){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var EPS = require( '@stdlib/constants/math/float64-eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var acoth = require( './../lib' );


// FIXTURES //

var largerPositive = require( './fixtures/julia/larger_positive.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );
var largerNegative = require( './fixtures/julia/larger_negative.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var hugeNegative = require( './fixtures/julia/huge_negative.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.true( typeof acoth, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the inverse hyperbolic cotangent for medium positive values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acoth( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i]+'.' );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse hyperbolic cotangent for medium negative values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acoth( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i]+'.' );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse hyperbolic cotangent for large positive values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acoth( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i]+'.' );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse hyperbolic cotangent for large negative values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acoth( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i]+'.' );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse hyperbolic cotangent for larger positive values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerPositive.x;
	expected = largerPositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acoth( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i]+'.' );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse hyperbolic cotangent for larger negative values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerNegative.x;
	expected = largerNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acoth( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i]+'.' );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse hyperbolic cotangent for huge positive values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugePositive.x;
	expected = hugePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acoth( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i]+'.' );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse hyperbolic cotangent for huge negative values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugeNegative.x;
	expected = hugeNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acoth( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i]+'.' );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = acoth( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if provided a value on the open interval (-1,1)', function test( t ) {
	var v;
	var i;

	for ( i = 0; i < 1e3; i++ ) {
		v = (randu() * 0.99) - 0.99;
		t.equal( isnan( acoth( v ) ), true, 'returns NaN when provided '+v );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/acoth/test/test.js")
},{"./../lib":160,"./fixtures/julia/huge_negative.json":162,"./fixtures/julia/huge_positive.json":163,"./fixtures/julia/large_negative.json":164,"./fixtures/julia/large_positive.json":165,"./fixtures/julia/larger_negative.json":166,"./fixtures/julia/larger_positive.json":167,"./fixtures/julia/medium_negative.json":168,"./fixtures/julia/medium_positive.json":169,"@stdlib/constants/math/float64-eps":138,"@stdlib/math/base/assert/is-nan":154,"@stdlib/math/base/special/abs":159,"@stdlib/random/base/randu":205,"tape":306}],171:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_atanh.c?view=markup}. The implementation follows the original, but has been modified for JavaScript.
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
var log1p = require( '@stdlib/math/base/special/log1p' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// VARIABLES //

var NEAR_ZERO = 1.0 / (1 << 28); // 2**-28


// MAIN //

/**
* Computes the hyperbolic arctangent of a number.
*
* ## Method
*
* 1.  Reduce \\( x \\) to positive by \\( \operatorname{atanh}(-x) = -\operatorname{atanh}(x) \\)
*
* 2.  For \\( x \ge 0.5 \\), we calculate
*
*     ```tex
*     \operatorname{atanh}(x) = \frac{1}{2} \cdot \log\left( 1 + \tfrac{2x}{1-x} \right) = \frac{1}{2} \cdot \operatorname{log1p}\left( 2 \tfrac{x}{1-x} \right)
*     ```
*
*     For \\( x < 0.5 \\), we have
*
*     ```tex
*     \operatorname{atanh}(x) = \frac{1}{2} \cdot \operatorname{log1p}\left( 2x + \tfrac{2x^2}{1-x} \right)
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{atanh}(\mathrm{NaN}) &= \mathrm{NaN}\\
* \operatorname{atanh}(1.0) &= \infty \\
* \operatorname{atanh}(-1.0) &= -\infty \\
* \end{align*}
* ```
*
* @param {number} x - input value
* @returns {number} hyperbolic arctangent (in radians)
*
* @example
* var v = atanh( 0.0 );
* // returns 0.0
*
* @example
* var v = atanh( 0.9 );
* // returns ~1.472
*
* @example
* var v = atanh( 1.0 );
* // returns Infinity
*
* @example
* var v = atanh( -1.0 );
* // returns -Infinity
*
* @example
* var v = atanh( NaN );
* // returns NaN
*/
function atanh( x ) {
	var sgn;
	var t;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x < -1.0 || x > 1.0 ) {
		return NaN;
	}
	if ( x === 1.0 ) {
		return PINF;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x < 0.0 ) {
		sgn = true;
		x = -x;
	}
	// Case: |x| < 2**-28
	if ( x < NEAR_ZERO ) {
		return ( sgn ) ? -x : x;
	}
	if ( x < 0.5 ) {
		t = x + x;
		t = 0.5 * log1p( t + ( t*x/(1-x) ) );
	} else {
		t = 0.5 * log1p( (x+x) / (1-x) );
	}
	return ( sgn ) ? -t : t;
}


// EXPORTS //

module.exports = atanh;

},{"@stdlib/constants/math/float64-ninf":141,"@stdlib/constants/math/float64-pinf":142,"@stdlib/math/base/assert/is-nan":154,"@stdlib/math/base/special/log1p":175}],172:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the hyperbolic arctangent of a number.
*
* @module @stdlib/math/base/special/atanh
*
* @example
* var atanh = require( '@stdlib/math/base/special/atanh' );
*
* var v = atanh( 0.0 );
* // returns 0.0
*
* v = atanh( 0.9 );
* // returns ~1.472
*
* v = atanh( 1.0 );
* // returns Infinity
*
* v = atanh( -1.0 );
* // returns -Infinity
*
* v = atanh( NaN );
* // returns NaN
*/

// MODULES //

var atanh = require( './atanh.js' );


// EXPORTS //

module.exports = atanh;

},{"./atanh.js":171}],173:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Rounds a numeric value toward negative infinity.
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
* Round a numeric value toward negative infinity.
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

var floor = require( './floor.js' );


// EXPORTS //

module.exports = floor;

},{"./floor.js":173}],175:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var log1p = require( './log1p.js' );


// EXPORTS //

module.exports = log1p;

},{"./log1p.js":176}],176:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
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
*
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
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

},{"./polyval_lp.js":177,"@stdlib/constants/math/float64-exponent-bias":139,"@stdlib/constants/math/float64-ninf":141,"@stdlib/constants/math/float64-pinf":142,"@stdlib/math/base/assert/is-nan":154,"@stdlib/number/float64/base/get-high-word":185,"@stdlib/number/float64/base/set-high-word":188}],177:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],178:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./max.js":179}],179:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


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

},{"@stdlib/constants/math/float64-ninf":141,"@stdlib/constants/math/float64-pinf":142,"@stdlib/math/base/assert/is-nan":154,"@stdlib/math/base/assert/is-positive-zero":156}],180:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":183}],183:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],184:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":102}],185:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":186}],186:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":184,"@stdlib/array/float64":5,"@stdlib/array/uint32":23}],187:[function(require,module,exports){
arguments[4][184][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":102,"dup":184}],188:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
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

},{"./main.js":189}],189:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
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

},{"./high.js":187,"@stdlib/array/float64":5,"@stdlib/array/uint32":23}],190:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-nan":154}],191:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
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

},{"./create_table.js":190,"./rand_int32.js":194,"@stdlib/array/int32":10,"@stdlib/array/to-json":17,"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-boolean":74,"@stdlib/assert/is-collection":82,"@stdlib/assert/is-int32array":92,"@stdlib/assert/is-plain-object":114,"@stdlib/assert/is-positive-integer":116,"@stdlib/blas/base/gcopy":134,"@stdlib/constants/math/int32-max":145,"@stdlib/math/base/special/floor":174,"@stdlib/utils/define-nonenumerable-read-only-accessor":211,"@stdlib/utils/define-nonenumerable-read-only-property":213,"@stdlib/utils/define-nonenumerable-read-write-accessor":215}],192:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./factory.js":191,"./main.js":193,"@stdlib/utils/define-nonenumerable-read-only-property":213}],193:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./factory.js":191,"./rand_int32.js":194}],194:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
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

},{"@stdlib/constants/math/int32-max":145,"@stdlib/math/base/special/floor":174}],195:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
var INT32_MAX = require( '@stdlib/constants/math/int32-max' );
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

},{"./rand_int32.js":198,"@stdlib/array/int32":10,"@stdlib/array/to-json":17,"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-boolean":74,"@stdlib/assert/is-collection":82,"@stdlib/assert/is-int32array":92,"@stdlib/assert/is-plain-object":114,"@stdlib/assert/is-positive-integer":116,"@stdlib/blas/base/gcopy":134,"@stdlib/constants/math/int32-max":145,"@stdlib/utils/define-nonenumerable-read-only-accessor":211,"@stdlib/utils/define-nonenumerable-read-only-property":213,"@stdlib/utils/define-nonenumerable-read-write-accessor":215}],196:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./factory.js":195,"./main.js":197,"@stdlib/utils/define-nonenumerable-read-only-property":213}],197:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./factory.js":195,"./rand_int32.js":198}],198:[function(require,module,exports){
arguments[4][194][0].apply(exports,arguments)
},{"@stdlib/constants/math/int32-max":145,"@stdlib/math/base/special/floor":174,"dup":194}],199:[function(require,module,exports){
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
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/math/float64-max-safe-integer' );
var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
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
* @param {ArrayLikeObject} seed - seed array
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

},{"./rand_uint32.js":202,"@stdlib/array/to-json":17,"@stdlib/array/uint32":23,"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-boolean":74,"@stdlib/assert/is-collection":82,"@stdlib/assert/is-plain-object":114,"@stdlib/assert/is-positive-integer":116,"@stdlib/assert/is-uint32array":126,"@stdlib/blas/base/gcopy":134,"@stdlib/constants/math/float64-max-safe-integer":140,"@stdlib/constants/math/uint32-max":150,"@stdlib/math/base/special/max":178,"@stdlib/math/base/special/uimul":180,"@stdlib/utils/define-nonenumerable-read-only-accessor":211,"@stdlib/utils/define-nonenumerable-read-only-property":213,"@stdlib/utils/define-nonenumerable-read-write-accessor":215}],200:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./factory.js":199,"./main.js":201,"@stdlib/utils/define-nonenumerable-read-only-property":213}],201:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./factory.js":199,"./rand_uint32.js":202}],202:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
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

},{"@stdlib/constants/math/uint32-max":150,"@stdlib/math/base/special/floor":174}],203:[function(require,module,exports){
module.exports={
	"name": "mt19937",
	"copy": true
}

},{}],204:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./defaults.json":203,"./prngs.js":207,"@stdlib/array/to-json":17,"@stdlib/assert/has-own-property":50,"@stdlib/assert/is-boolean":74,"@stdlib/assert/is-plain-object":114,"@stdlib/utils/define-nonenumerable-read-only-accessor":211,"@stdlib/utils/define-nonenumerable-read-only-property":213,"@stdlib/utils/define-nonenumerable-read-write-accessor":215}],205:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./factory.js":204,"./main.js":206,"@stdlib/utils/define-nonenumerable-read-only-property":213}],206:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./factory.js":204}],207:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/random/base/minstd":196,"@stdlib/random/base/minstd-shuffle":192,"@stdlib/random/base/mt19937":200}],208:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* @type {RegExp}
*
* @example
* var RE_FUNCTION_NAME = require( '@stdlib/regexp/function-name' );
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
var RE_FUNCTION_NAME = /^\s*function\s*([^(]*)/i;


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{}],209:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":210}],210:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var RE = require( '@stdlib/regexp/function-name' );
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

},{"@stdlib/assert/is-buffer":80,"@stdlib/regexp/function-name":208,"@stdlib/utils/native-class":232}],211:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":212}],212:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":218}],213:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":214}],214:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":218}],215:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":216}],216:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":218}],217:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var hasDefinePropertySupport = require( '@stdlib/assert/has-define-property-support' );
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

},{"./builtin.js":217,"./polyfill.js":219,"@stdlib/assert/has-define-property-support":33}],219:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

var hasProperty = require( '@stdlib/assert/has-property' );
var isObject = require( '@stdlib/assert/is-object' );


// VARIABLES //

var objectProtoype = Object.prototype;
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

	if ( !isObject( obj ) ) {
		throw new TypeError( 'invalid argument. First argument must be an object. Value: `' + obj + '`.' );
	}
	if ( !isObject( descriptor ) ) {
		throw new TypeError( 'invalid argument. Property descriptor must be an object. Value: `' + descriptor + '`.' );
	}
	hasValue = hasProperty( descriptor, 'value' );
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
	hasGet = hasProperty( descriptor, 'get' );
	hasSet = hasProperty( descriptor, 'set' );

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

},{"@stdlib/assert/has-property":52,"@stdlib/assert/is-object":112}],220:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native.js":223,"./polyfill.js":224,"@stdlib/assert/is-function":88}],221:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./detect.js":220}],222:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./get_prototype_of.js":221}],223:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":225,"@stdlib/utils/native-class":232}],225:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],226:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],227:[function(require,module,exports){
(function (global){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
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

},{"./main.js":229}],229:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./codegen.js":226,"./global.js":227,"./self.js":230,"./window.js":231,"@stdlib/assert/is-boolean":74}],230:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],231:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native_class.js":233,"./polyfill.js":234,"@stdlib/assert/has-tostringtag-support":56}],233:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":235}],234:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":235,"./tostringtag.js":236,"@stdlib/assert/has-own-property":50}],235:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],236:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],237:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":238,"./fixtures/re.js":239,"./fixtures/typedarray.js":240}],238:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":228}],239:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],240:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],241:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./check.js":237,"./polyfill.js":242,"./typeof.js":243}],242:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":209}],243:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":209}],244:[function(require,module,exports){
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
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
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

},{}],245:[function(require,module,exports){

},{}],246:[function(require,module,exports){
arguments[4][245][0].apply(exports,arguments)
},{"dup":245}],247:[function(require,module,exports){
(function (Buffer){
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
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? Symbol.for('nodejs.util.inspect.custom')
    : null

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
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
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
  Object.setPrototypeOf(buf, Buffer.prototype)
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
    throw new TypeError(
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
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

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
  Object.setPrototypeOf(buf, Buffer.prototype)

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
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
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
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
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
    out += hexSliceLookupTable[buf[i]]
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
  Object.setPrototypeOf(newBuf, Buffer.prototype)

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
  } else if (typeof val === 'boolean') {
    val = Number(val)
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

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

}).call(this,require("buffer").Buffer)
},{"base64-js":244,"buffer":247,"ieee754":273}],248:[function(require,module,exports){
(function (Buffer){
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

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../insert-module-globals/node_modules/is-buffer/index.js")})
},{"../../insert-module-globals/node_modules/is-buffer/index.js":275}],249:[function(require,module,exports){
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

},{"./lib/is_arguments.js":250,"./lib/keys.js":251}],250:[function(require,module,exports){
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

},{}],251:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],252:[function(require,module,exports){
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

},{"object-keys":280}],253:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],254:[function(require,module,exports){
'use strict';

/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined; // eslint-disable-line no-shadow-restricted-names

var $TypeError = TypeError;

var ThrowTypeError = Object.getOwnPropertyDescriptor
	? (function () { return Object.getOwnPropertyDescriptor(arguments, 'callee').get; }())
	: function () { throw new $TypeError(); };

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': JSON,
	'$ %JSONParse%': JSON.parse,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': $TypeError,
	'$ %TypeErrorPrototype%': $TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = require('function-bind');
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[key];
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	if (parts.length === 0) {
		return getBaseIntrinsic(name, allowMissing);
	}

	var value = getBaseIntrinsic('%' + parts[0] + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			value = value[parts[i]];
		}
	}
	return value;
};

},{"function-bind":269,"has-symbols":270}],255:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var $Object = GetIntrinsic('%Object%');
var $EvalError = GetIntrinsic('%EvalError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');
var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');
var $floor = GetIntrinsic('%Math.floor%');
var $DateUTC = GetIntrinsic('%Date.UTC%');
var $abs = GetIntrinsic('%Math.abs%');

var assertRecord = require('./helpers/assertRecord');
var isPropertyDescriptor = require('./helpers/isPropertyDescriptor');
var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');
var sign = require('./helpers/sign');
var mod = require('./helpers/mod');
var isPrefixOf = require('./helpers/isPrefixOf');
var callBound = require('./helpers/callBound');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
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
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		return isPropertyDescriptor(this, Desc);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.9.3
	'Abstract Equality Comparison': function AbstractEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType === yType) {
			return x === y; // ES6+ specified this shortcut anyways.
		}
		if (x == null && y == null) {
			return true;
		}
		if (xType === 'Number' && yType === 'String') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if (xType === 'String' && yType === 'Number') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (xType === 'Boolean') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (yType === 'Boolean') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
			return this['Abstract Equality Comparison'](x, this.ToPrimitive(y));
		}
		if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
			return this['Abstract Equality Comparison'](this.ToPrimitive(x), y);
		}
		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.9.6
	'Strict Equality Comparison': function StrictEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType !== yType) {
			return false;
		}
		if (xType === 'Undefined' || xType === 'Null') {
			return true;
		}
		return x === y; // shortcut for steps 4-7
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-11.8.5
	// eslint-disable-next-line max-statements
	'Abstract Relational Comparison': function AbstractRelationalComparison(x, y, LeftFirst) {
		if (this.Type(LeftFirst) !== 'Boolean') {
			throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
		}
		var px;
		var py;
		if (LeftFirst) {
			px = this.ToPrimitive(x, $Number);
			py = this.ToPrimitive(y, $Number);
		} else {
			py = this.ToPrimitive(y, $Number);
			px = this.ToPrimitive(x, $Number);
		}
		var bothStrings = this.Type(px) === 'String' && this.Type(py) === 'String';
		if (!bothStrings) {
			var nx = this.ToNumber(px);
			var ny = this.ToNumber(py);
			if ($isNaN(nx) || $isNaN(ny)) {
				return undefined;
			}
			if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
				return false;
			}
			if (nx === 0 && ny === 0) {
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
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	msFromTime: function msFromTime(t) {
		return mod(t, msPerSecond);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	SecFromTime: function SecFromTime(t) {
		return mod($floor(t / msPerSecond), SecondsPerMinute);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	MinFromTime: function MinFromTime(t) {
		return mod($floor(t / msPerMinute), MinutesPerHour);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10
	HourFromTime: function HourFromTime(t) {
		return mod($floor(t / msPerHour), HoursPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
	Day: function Day(t) {
		return $floor(t / msPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2
	TimeWithinDay: function TimeWithinDay(t) {
		return mod(t, msPerDay);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	DayFromYear: function DayFromYear(y) {
		return (365 * (y - 1970)) + $floor((y - 1969) / 4) - $floor((y - 1901) / 100) + $floor((y - 1601) / 400);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	TimeFromYear: function TimeFromYear(y) {
		return msPerDay * this.DayFromYear(y);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	YearFromTime: function YearFromTime(t) {
		// largest y such that this.TimeFromYear(y) <= t
		return $getUTCFullYear(new $Date(t));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.6
	WeekDay: function WeekDay(t) {
		return mod(this.Day(t) + 4, 7);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	DaysInYear: function DaysInYear(y) {
		if (mod(y, 4) !== 0) {
			return 365;
		}
		if (mod(y, 100) !== 0) {
			return 366;
		}
		if (mod(y, 400) !== 0) {
			return 365;
		}
		return 366;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
	InLeapYear: function InLeapYear(t) {
		var days = this.DaysInYear(this.YearFromTime(t));
		if (days === 365) {
			return 0;
		}
		if (days === 366) {
			return 1;
		}
		throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
	DayWithinYear: function DayWithinYear(t) {
		return this.Day(t) - this.DayFromYear(this.YearFromTime(t));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4
	MonthFromTime: function MonthFromTime(t) {
		var day = this.DayWithinYear(t);
		if (0 <= day && day < 31) {
			return 0;
		}
		var leap = this.InLeapYear(t);
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
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.5
	DateFromTime: function DateFromTime(t) {
		var m = this.MonthFromTime(t);
		var d = this.DayWithinYear(t);
		if (m === 0) {
			return d + 1;
		}
		if (m === 1) {
			return d - 30;
		}
		var leap = this.InLeapYear(t);
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
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.12
	MakeDay: function MakeDay(year, month, date) {
		if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
			return NaN;
		}
		var y = this.ToInteger(year);
		var m = this.ToInteger(month);
		var dt = this.ToInteger(date);
		var ym = y + $floor(m / 12);
		var mn = mod(m, 12);
		var t = $DateUTC(ym, mn, 1);
		if (this.YearFromTime(t) !== ym || this.MonthFromTime(t) !== mn || this.DateFromTime(t) !== 1) {
			return NaN;
		}
		return this.Day(t) + dt - 1;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.13
	MakeDate: function MakeDate(day, time) {
		if (!$isFinite(day) || !$isFinite(time)) {
			return NaN;
		}
		return (day * msPerDay) + time;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.11
	MakeTime: function MakeTime(hour, min, sec, ms) {
		if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
			return NaN;
		}
		var h = this.ToInteger(hour);
		var m = this.ToInteger(min);
		var s = this.ToInteger(sec);
		var milli = this.ToInteger(ms);
		var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
		return t;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.14
	TimeClip: function TimeClip(time) {
		if (!$isFinite(time) || $abs(time) > 8.64e15) {
			return NaN;
		}
		return $Number(new $Date(this.ToNumber(time)));
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-5.2
	modulo: function modulo(x, y) {
		return mod(x, y);
	}
};

module.exports = ES5;

},{"./GetIntrinsic":254,"./helpers/assertRecord":256,"./helpers/callBound":258,"./helpers/isFinite":259,"./helpers/isNaN":260,"./helpers/isPrefixOf":261,"./helpers/isPropertyDescriptor":262,"./helpers/mod":263,"./helpers/sign":264,"es-to-primitive/es5":265,"has":272,"is-callable":276}],256:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(ES, Desc) {
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

module.exports = function assertRecord(ES, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(ES, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"../GetIntrinsic":254,"has":272}],257:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

var GetIntrinsic = require('../GetIntrinsic');

var $Function = GetIntrinsic('%Function%');
var $apply = $Function.apply;
var $call = $Function.call;

module.exports = function callBind() {
	return bind.apply($call, arguments);
};

module.exports.apply = function applyBind() {
	return bind.apply($apply, arguments);
};

},{"../GetIntrinsic":254,"function-bind":269}],258:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var callBind = require('./callBind');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"../GetIntrinsic":254,"./callBind":257}],259:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],260:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],261:[function(require,module,exports){
'use strict';

var $strSlice = require('../helpers/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

},{"../helpers/callBound":258}],262:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

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

    for (var key in Desc) { // eslint-disable-line
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"../GetIntrinsic":254,"has":272}],263:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],264:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

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

},{"./helpers/isPrimitive":266,"is-callable":276}],266:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],267:[function(require,module,exports){
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

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
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
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
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
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
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

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],268:[function(require,module,exports){
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

},{}],269:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":268}],270:[function(require,module,exports){
(function (global){
'use strict';

var origSymbol = global.Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./shams":271}],271:[function(require,module,exports){
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
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
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

},{}],272:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":269}],273:[function(require,module,exports){
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

},{}],274:[function(require,module,exports){
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

},{}],275:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],276:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

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
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],277:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],278:[function(require,module,exports){
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

},{}],279:[function(require,module,exports){
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

},{"./isArguments":281}],280:[function(require,module,exports){
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

},{"./implementation":279,"./isArguments":281}],281:[function(require,module,exports){
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

},{}],282:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
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
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

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

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
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
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":284}],283:[function(require,module,exports){
(function (process){
'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


}).call(this,require('_process'))
},{"_process":284}],284:[function(require,module,exports){
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

},{}],285:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":286}],286:[function(require,module,exports){
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

var pna = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
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

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};
},{"./_stream_readable":288,"./_stream_writable":290,"core-util-is":248,"inherits":274,"process-nextick-args":283}],287:[function(require,module,exports){
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

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":289,"core-util-is":248,"inherits":274}],288:[function(require,module,exports){
(function (process,global){
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

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
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

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
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
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
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
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
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
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
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
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
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
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
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
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

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
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
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
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
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
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
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
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
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

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
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
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
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
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":286,"./internal/streams/BufferList":291,"./internal/streams/destroy":292,"./internal/streams/stream":293,"_process":284,"core-util-is":248,"events":267,"inherits":274,"isarray":277,"process-nextick-args":283,"safe-buffer":299,"string_decoder/":305,"util":245}],289:[function(require,module,exports){
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

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
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
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
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
};

// This is the part where you do stuff!
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
  throw new Error('_transform() is not implemented');
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
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":286,"core-util-is":248,"inherits":274}],290:[function(require,module,exports){
(function (process,global,setImmediate){
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

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
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
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
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
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
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

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

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
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
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

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
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
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
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

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
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
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
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

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
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
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
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
  cb(new Error('_write() is not implemented'));
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

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
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
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
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
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"./_stream_duplex":286,"./internal/streams/destroy":292,"./internal/streams/stream":293,"_process":284,"core-util-is":248,"inherits":274,"process-nextick-args":283,"safe-buffer":299,"timers":312,"util-deprecate":313}],291:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":299,"util":245}],292:[function(require,module,exports){
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
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
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":283}],293:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":267}],294:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":295}],295:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":286,"./lib/_stream_passthrough.js":287,"./lib/_stream_readable.js":288,"./lib/_stream_transform.js":289,"./lib/_stream_writable.js":290}],296:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":295}],297:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":290}],298:[function(require,module,exports){
(function (process,setImmediate){
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

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":284,"through":311,"timers":312}],299:[function(require,module,exports){
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

},{"buffer":247}],300:[function(require,module,exports){
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
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

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

},{"events":267,"inherits":274,"readable-stream/duplex.js":285,"readable-stream/passthrough.js":294,"readable-stream/readable.js":295,"readable-stream/transform.js":296,"readable-stream/writable.js":297}],301:[function(require,module,exports){
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

},{"es-abstract/es5":255,"function-bind":269}],302:[function(require,module,exports){
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

},{"./implementation":301,"./polyfill":303,"./shim":304,"define-properties":252,"function-bind":269}],303:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":301}],304:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":303,"define-properties":252}],305:[function(require,module,exports){
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
},{"safe-buffer":299}],306:[function(require,module,exports){
(function (process,setImmediate){
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

}).call(this,require('_process'),require("timers").setImmediate)
},{"./lib/default_stream":307,"./lib/results":309,"./lib/test":310,"_process":284,"defined":253,"through":311,"timers":312}],307:[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"_process":284,"fs":246,"through":311}],308:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":284,"timers":312}],309:[function(require,module,exports){
(function (process,setImmediate){
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

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":284,"events":267,"function-bind":269,"has":272,"inherits":274,"object-inspect":278,"resumer":298,"through":311,"timers":312}],310:[function(require,module,exports){
(function (__dirname){
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


}).call(this,"/node_modules/tape/lib")
},{"./next_tick":308,"deep-equal":249,"defined":253,"events":267,"has":272,"inherits":274,"path":282,"string.prototype.trim":302}],311:[function(require,module,exports){
(function (process){
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


}).call(this,require('_process'))
},{"_process":284,"stream":300}],312:[function(require,module,exports){
(function (setImmediate,clearImmediate){
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
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":284,"timers":312}],313:[function(require,module,exports){
(function (global){

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[170]);