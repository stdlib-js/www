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

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/assert/has-float64array-support":17}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/assert/has-uint16array-support":27}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/assert/has-uint32array-support":30}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/assert/has-uint8array-support":33}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


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

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

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

},{"./main.js":15}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./define_property.js":13}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":18}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./float64array.js":16,"@stdlib/assert/is-float64array":38}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":20}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":22}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":24}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":26}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/has-symbol-support":23}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./uint16array.js":29,"@stdlib/assert/is-uint16array":45,"@stdlib/constants/math/uint16-max":60}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":32,"@stdlib/assert/is-uint32array":47,"@stdlib/constants/math/uint32-max":61}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":35,"@stdlib/assert/is-uint8array":49,"@stdlib/constants/math/uint8-max":62}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":116}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":116}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ctors.js":40}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":36}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":116}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":116}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":50}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":116}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* @module @stdlib/constants/math/float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
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
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* @module @stdlib/constants/math/float64-max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
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
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
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
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
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

},{"@stdlib/number/ctor":83}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants/math/float64-smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
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
* Test if a numeric value is infinite.
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

var isInfinite = require( './is_infinite.js' );


// EXPORTS //

module.exports = isInfinite;

},{"./is_infinite.js":64}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Tests if a numeric value is infinite.
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

},{"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_nan.js":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./abs.js":67}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Rounds a numeric value toward positive infinity.
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
* Round a numeric value toward positive infinity.
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

var ceil = require( './ceil.js' );


// EXPORTS //

module.exports = ceil;

},{"./ceil.js":69}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


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

},{"@stdlib/number/float64/base/from-words":87,"@stdlib/number/float64/base/get-high-word":91,"@stdlib/number/float64/base/to-words":96}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var copysign = require( './copysign.js' );


// EXPORTS //

module.exports = copysign;

},{"./copysign.js":71}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var expmulti = require( './expmulti.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01;
var LN2_LO = 1.90821492927058770002e-10;
var LOG2_E = 1.44269504088896338700e+00;
var OVERFLOW = 7.09782712893383973096e+02;
var UNDERFLOW = -7.45133219101941108420e+02;
var NEARZERO = 1.0 / (1 << 28); // 2^-28;
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
	// Reduce and compute `r = hi - lo` for extra precision.
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

},{"./expmulti.js":74,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/trunc":81}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
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
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi);

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":76,"@stdlib/math/base/special/ldexp":79}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var exp = require( './exp.js' );


// EXPORTS //

module.exports = exp;

},{"./exp.js":73}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

},{"./floor.js":77}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":80}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
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

},{"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-max-base2-exponent":55,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":54,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":56,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-infinite":63,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/copysign":72,"@stdlib/number/float64/base/exponent":85,"@stdlib/number/float64/base/from-words":87,"@stdlib/number/float64/base/normalize":93,"@stdlib/number/float64/base/to-words":96}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Round a numeric value toward zero.
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

var trunc = require( './trunc.js' );


// EXPORTS //

module.exports = trunc;

},{"./trunc.js":82}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Rounds a numeric value toward zero.
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

},{"@stdlib/math/base/special/ceil":70,"@stdlib/math/base/special/floor":78}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./number.js":84}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
*/

'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var EXP_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );


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

},{"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-high-word-exponent-mask":53,"@stdlib/number/float64/base/get-high-word":91}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":89}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":41}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":88,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":41}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":90,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var out = normalize( new Array( 2 ), 3.14e-319 );
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
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
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

},{"./normalize.js":95}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
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
* var out = normalize( new Array( 2 ), 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
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

},{"@stdlib/constants/math/float64-smallest-normal":59,"@stdlib/math/base/assert/is-infinite":63,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Split a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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

},{"./main.js":98}],97:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":41,"dup":88}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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

},{"./to_words.js":99}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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

},{"./indices.js":97,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluates the cumulative distribution function (CDF) for a Laplace distribution with location parameter `mu` and scale parameter `b` at value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.932
*
* @example
* var y = cdf( 5.0, 10.0, 3.0 );
* // returns ~0.094
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 2, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = cdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function cdf( x, mu, b ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( b ) ||
		b <= 0.0
	) {
		return NaN;
	}
	z = ( x - mu ) / b;
	if ( x < mu ) {
		return 0.5 * exp( z );
	}
	return 1.0 - ( 0.5 * exp( -z ) );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/exp":75}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a function for evaluating the cumulative distribution function (CDF) for a Laplace distribution with location parameter `mu` and scale parameter `b`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} b - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 3.0, 1.5 );
*
* var y = cdf( 1.0 );
* // returns ~0.132
*
* y = cdf( 4.0 );
* // returns ~0.743
*/
function factory( mu, b ) {
	if (
		isnan( mu ) ||
		isnan( b ) ||
		b <= 0.0
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Laplace distribution.
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
		z = ( x - mu ) / b;
		if ( x < mu ) {
			return 0.5 * exp( z );
		}
		return 1.0 - (0.5 * exp( -z ));
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/exp":75,"@stdlib/utils/constant-function":110}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Laplace distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/laplace/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/laplace/cdf' );
*
* var y = cdf( 10.0, 0.0, 3.0 );
* // returns ~0.982
*
* y = cdf( 0.0, 0.0, 3.0 );
* // returns 0.5
*
* var myCDF = cdf.factory( 2.0, 3.0 );
* y = myCDF( 10.0 );
* // returns ~0.965
*
* y = myCDF( 2.0 );
* // returns 0.5
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":100,"./factory.js":101,"@stdlib/utils/define-nonenumerable-read-only-property":111}],103:[function(require,module,exports){
module.exports={"expected":[0.5186908944849433,0.5861790556094011,0.5401750268958334,0.6857560204651926,0.5191618996545182,0.6223227416631845,0.8414611918708667,0.6050045193171928,0.7972389013742173,0.5186775357422511,0.49397063634171645,0.5543882346986104,0.6128787325602136,0.8251388565780822,0.627038444232922,0.784995779867445,0.6998204234660821,0.6031117164149348,0.5693287504234229,0.6139255814864866,0.9554956465973773,0.5706175725518625,0.7509064790038363,0.5048113918699457,0.6803772492796006,0.5198377283252451,0.5904713914914338,0.5853448568041888,0.7003271795328803,0.7325151508301848,0.533114254329919,0.47719546807891233,0.5579436727872242,0.6806466606331979,0.5818394625564987,0.5047602896646497,0.5914117942863468,0.5622317146793228,0.5926015085047546,0.5200366351353356,0.5481949439321641,0.5584847021767726,0.5744702950727182,0.6456892310670429,0.5833421608487148,0.6067696851544677,0.9088742228977937,0.9999999982108462,0.5519554267927691,0.5773440071672691,0.7020127230721419,0.7370704859815551,0.6395164252179765,0.5118940391602318,0.6056122991981916,0.6017017359537213,0.6179473767024812,0.6746706842188362,0.6829072109421158,0.5885069042696541,0.5396921008370671,0.539961321202951,0.7594340358716656,0.5213261915907841,0.6403858025979126,0.639463464025545,0.5782265689844615,0.9441544964109068,0.588520533198831,0.5809351603827578,0.68530451992759,0.6133408968501435,0.5386795720298938,0.5668275678218584,0.5020761072579427,0.5757025335293297,0.5743289074666684,0.5197448592279743,0.6713665329731962,0.5706471502280682,0.6477723211821972,0.6845457200322603,0.678994894440466,0.5363016247785579,0.5954180235179397,0.661047841419806,0.5901314531246316,0.6787944091771487,0.7600298175726051,0.5760990387230215,0.6453494882589373,0.9563853970247242,0.5223779274990421,0.5294525319133242,0.6113156478765625,0.6212397863052532,0.4951143053612592,0.5278287223355698,0.9999999999994796,0.5124264127665648,0.5783324977228769,0.512072792170192,0.7073482145631503,0.5640414751319704,0.6042865207614107,0.5164106553915574,0.969738533918787,0.40858058625665244,0.6982378324767013,0.5879602004727842,0.5176392420903576,0.5580664428189583,0.5085952247085397,0.6944625089698595,0.5134099817535597,0.525462251462826,0.5804399367969446,0.5797087554312015,0.7569871166456885,0.5736939178345893,0.5221180998128081,0.4463276142719848,0.573789261184937,0.5355833217360694,0.6758493758643698,0.6043560284310839,0.49980410484955456,0.5828170769454464,0.6168748388667104,0.5134494521105764,0.6344532419062239,0.5642644063954454,0.7678309127285924,0.5248283942137171,0.5886038455563525,0.5799176415088871,0.6475299527925082,0.5835893073613166,0.5436963435411526,0.5545196699089019,0.6444590593192094,0.548713512547349,0.5958717270083181,0.5199104667716395,0.470155046061341,0.6045308388005313,0.9027959243201517,0.8096546018730388,0.715485292014405,0.5737206724247057,0.7541605755842856,0.48339110702700433,0.5708560883758137,0.5683672796118153,0.5753119568141387,0.6008411626740567,0.5399623749384685,0.7097729787861371,0.6176529267927229,0.5315389415887243,0.5107174746434322,0.8303294311465046,0.6489470357558608,0.634431545324437,0.6756813940567821,0.5871770235968563,0.5078112145753544,0.5761337401788085,0.515685564961835,0.6378896424693234,0.5282200600406524,0.5261148665681981,0.5568381633656101,0.6151916180780974,0.8731973518832746,0.5786422468359944,0.4802565631007131,0.6275571330392671,0.6278265662364407,0.6729366354915809,0.6211220277086447,0.6123509138407139,0.5483510463792851,0.6970608710943345,0.5458016035868016,0.623437404962997,0.6253846847381791,0.6218821593570599,0.9336086483608603,0.5131376778115619,0.5031250927368756,0.8808496892532066,0.6899134543965514,0.6381409167887271,0.6318678268709226,0.6031330773012992,0.6024360710321484,0.6211291467426665,0.5440294392177472,0.9464840925614761,0.717318961629264,0.589256419242493,0.5304892885867942,0.5096857734737388,0.7547247065100224,0.5822805572117196,0.4886593636004458,0.5855258908374055,0.905005891651496,0.6532484149426847,0.5930650123913387,0.5695384381978452,0.7286650557015832,0.6067223663489898,0.5709229427469412,0.9075465139297774,0.6135383795416931,0.5168984469087545,0.4926823942794571,0.5038676766513017,0.5090571080389075,0.7288194374383445,0.734416103559526,0.4993953088189804,0.6425294110866205,0.5766189375644775,0.5454669622880549,0.5509883834756326,0.6686795079170655,0.5005339072876879,0.6000486993684694,0.997297011837903,0.6595215732956234,0.5399634686244978,0.5965342646605512,0.6019742300333614,0.6616938826430359,0.7460522388894733,0.5686092098708225,0.5799256436430045,0.520519747660424,0.49137993241503997,0.4923708240853739,0.5372791686641023,0.5851609438546236,0.5957065640529009,0.8866590165326071,0.2667803519686723,0.5515603062475654,0.6248032299166546,0.601230432314839,0.4811895969216734,0.6908485521112656,0.5323116149546951,0.6673563756870031,0.6049410904706436,0.7502252010786985,0.6089060302445483,0.5643557105248967,0.5388397645528652,0.7980470718326265,0.4613307057854467,0.5011679579267976,0.9652357360304421,0.49956648636008827,0.7768417153189013,0.807165641000589,0.4464628637534197,0.6417417144779531,0.5594968484211269,0.5297063429469262,0.8573347407691823,0.9410707662672949,0.49534384144849813,0.7686488934859748,0.47714776785457225,0.8734236686926296,0.587500714902413,0.5625001745758738,0.5526707347033429,0.45974458108527694,0.5499680180237778,0.5389754706515171,0.5451344777150793,0.5112091908114619,0.6368692751661506,0.8341997628647463,0.5322773563067351,0.6097964241178826,0.5900881936676207,0.5818211077212595,0.686339878851727,0.5554826467992178,0.7832087701885603,0.5255033942489242,0.7263810101743342,0.5489869342735672,0.7720422486419392,0.5025603956068319,0.6626290728051862,0.6113340988627776,0.47583538944505954,0.47380028231267673,0.8354471465846176,0.6712710115353415,0.5178114311558543,0.6091760623461756,0.6891839245930598,0.6846737369184888,0.5122864530449487,0.6105525408176572,0.5602198572329444,0.6281135367361899,0.6121523219923285,0.5813787838894113,0.6067436932741884,0.4905428497623841,0.6536263696772924,0.7380353653255921,0.7034360443711867,0.5605157374774387,0.530838893492924,0.5504524788791108,0.5798581379964172,0.7549018404614003,0.6772159282772005,0.5990899503003927,0.5989820540403414,0.5563830568444528,0.6377029640254769,0.6178306070275087,0.7139597626424623,0.8174060739419402,0.49958402078569947,0.6209044561745487,0.735566521222619,0.5124123400198506,0.6673439992310103,0.5912646404864177,0.6298744021197706,0.8432850674014282,0.6031080020009988,0.9746021485984803,0.5495517519502608,0.5564119893625423,0.9996189798531803,0.5983881888020705,0.5848267418403532,0.5559062515137695,0.6599141705940357,0.6102101145589749,0.6072087172786771,0.565874004311672,0.5961254332331802,0.8279108287772063,0.7584175463221157,0.5648955015964939,0.45701895866873526,0.522304926162127,0.601044620440574,0.4785948949040155,0.5398034931450899,0.7379399252581973,0.19482292442382435,0.6566369535529264,0.760435601688654,0.6167607961255536,0.5654202522502298,0.9269689575364687,0.8217597617555942,0.6329123234394771,0.5234413404440785,0.6367163651598126,0.4752018535536544,0.6639388616494104,0.6942290675082976,0.6055550829204663,0.536279301657635,0.5158885183101927,0.56601635935292,0.682891767431046,0.5848382784866906,0.7712337873016284,0.5944150783850584,0.4795255341464117,0.9402782452698656,0.6352312197661809,0.6328915964998424,0.5033127690112996,1.0,0.5553231002178962,0.5146975851158835,0.9898908850894401,0.6197609823086049,0.5608410370266531,0.5878294581543804,0.5575873481415303,0.48343154761918605,0.49767929972966407,0.5085875643003981,0.5962741774602356,0.4897722421237512,0.9770425615040313,0.6125453406712114,0.7029913679949047,0.6449181407507635,0.5672520200637317,0.5390809436700745,0.6009116198355837,0.5584783419007242,0.5245596824032777,0.48841784943104444,0.5657609494905758,0.8936941681288079,0.6309936526426462,0.574592621092725,0.5232401793058945,0.6498082613253066,0.6391449767447461,0.5141952003701806,0.8201143407056588,0.5792410757634915,0.6122654649249772,0.9891244531730619,0.5073651870726358,0.5320714857858706,0.5042638125423634,0.7586605149104837,0.5310088730529534,0.5542881153262256,0.5723412585672895,0.565934648590837,0.558803644064036,0.63773648822524,0.7218225006884658,0.5200069111947572,0.48970579327629915,0.6293946733025397,0.5548978588645848,0.7096345974473814,0.5175735086092172,0.7732399559049029,0.6123079506641457,0.6972873557681091,0.5591226393859217,0.8275881061934329,0.5989075512413569,0.6603990996570844,0.9586370780189014,0.6713049852991737,0.5783798932274935,0.5331425322351635,0.5854978254353145,0.5141692415801591,0.6408170671017308,0.5142699593457613,0.5549586968219473,0.6220238000953837,0.568406428498353,0.9729885296798724,0.5799971424730705,0.7119981117157892,0.49654784236438365,0.5320458064089728,0.5878473978179113,0.5577427335844947,0.6172152511078435,0.5474883963901958,0.6711024037935325,0.5994651175195449,0.5614473040486656,0.5295558170645465,0.5644297821630502,0.6221800191507367,0.5660609632754485,0.5892862376808017,0.0047921001418346175,0.5197776188274904,0.6849144240890978,0.48874355549817916,0.4348075810347236,0.7295059832621702,0.5594585188999815,0.6440771359962132,0.5727328122812024,0.49465421734592624,0.6556370370329675,0.5336693777686206,0.5651827378753709,0.5402458012485744,0.7082127646964206,0.8558411864643162,0.5902934671530556,0.6305458144029262,0.7659628170150603,0.7229062849697324,0.5262362754545784,0.5985952027604713,0.6094598436635736,0.4876954444806936,0.9968812112486708,0.4634934590080578,0.6108248763021823,0.6030739814789947,0.5168842941179597,0.5790270325695199,0.5066544268834056,0.5689610347471921,0.5306067675184166,0.5911099538041081,0.5227992103750427,0.6460128431703385,0.655969479747996,0.7294358690191862,0.5440846784381104,0.5566489121670726,0.9999998606115035,0.99999999994905,0.5452902635857056,0.5285574360437946,0.6393982566570201,0.6074913779214347,0.7721051498776764,0.6550912115884853,0.6287101474753422,0.5211324628472112,0.5274479412852545,0.620662699382736,0.6289416292668867,0.7364999223002309,0.5801107103555236,0.588709171565432,0.7331743495050942,0.5028488543697505,0.750097344622545,0.6421452932200438,0.8580310696149138,0.5153856242711616,0.6049114584439089,0.6404419619492788,0.7675280730857816,0.7944162064142406,0.47957832253586846,0.5466274103642288,0.6445186278407078,0.5758754281274798,0.4658462247624733,0.5073331799135143,0.7181105182423331,0.56323638583166,0.6318111388793491,0.5296080694099844,0.8054051781703468,0.5552917275301266,0.6009462983032952,0.6109777291911498,0.49708483383060265,0.47952683774154253,0.5106091830396543,0.5285904272424675,0.501987820044248,0.516769701293094,0.7664836765831955,0.6881959510081875,0.6090027168950309,0.4855607396206252,0.5268166895817132,0.5306893667433659,0.6043160348610908,0.4994613500806877,0.5431297427494595,0.6061260991562747,0.5848066479004485,0.30659905084182276,0.5532527723645249,0.5472003906816227,0.4610166826640061,0.9999871749027716,0.6324295207174223,0.59826442123005,0.6150285203220556,0.5919646352304722,0.5254850517927485,0.6772691964867524,0.6239678695729645,0.8507658130549506,0.9313192554197401,0.6113843569247652,0.5211536112836903,0.6270944377091088,0.6174872919710256,0.7939057113891279,0.5125553944256487,0.5495830083641968,0.6432365559306619,0.9907312318122551,0.4582226242127491,0.6148381898096968,0.6639610345881707,0.9933389770155023,0.6229916849751276,0.5996610066403935,0.506549919439253,0.5515104010194252,0.5690160357365487,0.47928367400624194,0.6326806873107205,0.5565634963247063,0.5091157679768894,0.5594223101321356,0.5308736621174205,0.7624940659466629,0.5923889716752387,0.5350075254176797,0.7343546214128489,0.5244074555091098,0.6107543342929043,0.48267396172593663,0.5600350505673057,0.4998425691793357,0.644680353697975,0.8239780516496646,0.7198981416288801,0.7416248908696621,0.5261658928100827,0.562053724896546,0.6920534013625541,0.5223193765162227,0.5521669577590038,0.5751547185727497,1.0,0.8282373957225087,0.49890653534584395,0.5388776837458914,0.853135524735168,1.0,0.4993726905928633,0.5791278923638968,0.5686237132821047,0.716417130169495,0.5364720122529477,0.566151647960442,0.7289972265064045,0.5672184299409824,0.543196787150315,0.6719705602831442,0.503661117129484,0.6072714654717872,0.8610348041082625,0.6216114729851372,0.6127049765963513,0.44814601892777417,0.3710506173359676,0.7637809755555871,0.6030312975767071,0.6035722340919392,0.8182078330217389,0.5651374117039472,0.6132545467000928,0.674777003232635,0.6194349104871766,3.1863930127792705e-6,0.6622094087542384,0.5232201150784708,0.5561381141061384,0.6086734967205023,0.9672981026824008,0.6235397358845202,0.5781207268972799,0.6737772853754431,0.5634100303464291,0.7408671156475954,0.6048825488312699,0.5966599000403094,0.6310254259033283,0.7585203244620382,0.5614260267201208,0.5766896361634501,0.5145147209773453,0.6994764919404475,0.5742258792534674,0.49692039238726193,0.6265992418367599,0.7396350397386777,0.6873747805975745,0.6417092809330758,0.5505123898851793,0.59686279912381,0.6251215182832057,0.5864469934767377,0.5916911627019581,0.9530560202558332,0.6223048045278755,0.8184814804278338,0.5023379158104876,0.5121635114714342,0.5607574943739494,0.5705798281890478,0.5662247684512705,0.5713400328030903,0.5214440217121115,0.5449150580359651,0.7152796192162642,0.5687995691327221,0.5583170635688567,0.9971901117580628,0.6914101109054597,0.5332567631665913,0.5934998158090052,0.7076692623033406,0.7572199633027553,0.6304000054262617,0.5209460227095565,0.9047400956848215,0.47501325263543803,0.4933627632985831,0.5882750539201118,0.7041237692547695,0.5232400957157962,0.5175831162098377,0.5250318281477657,0.5738664128249312,0.491923807696118,0.5245994528826108,0.5217327422939688,0.6040156685196165,0.6167334334847374,0.4990712644696376,0.81257129118157,0.5383484299391721,0.4851267312107839,0.5177913055469269,0.5020825370285911,0.64334174297481,0.5181521753514013,0.6559578206642817,0.5967999380245211,0.6000024056791975,0.6045269148983242,0.5190301572034206,0.5875355422687345,0.6731927695626321,0.9998372821680831,0.5334080651352044,0.5435715840650517,1.0,0.614385803179077,0.5308326391050424,0.5968916179736767,0.5836951670554844,0.5394450717802282,0.8081483561192391,0.782481063788071,0.4961718967613559,0.5786617643509865,0.7366901865602373,0.7707810922199808,0.6086013820794662,0.4941147165165535,0.4999482497411667,0.5884769638803782,0.585417705961164,0.6850500669305523,0.5213803258821961,0.6319693619559208,0.565401197093175,0.6093358023425837,0.5693931017578685,0.5331837001919375,0.7244549687214767,0.5696553465922556,0.7067072109991264,0.4518140923759264,0.5475252229048224,0.537997995305878,0.4564484394443652,0.506906473550042,0.47818852001425616,0.5731007452315652,0.7641480282687636,0.5636324597497098,0.5943016109170169,0.5547163772341548,0.5994098361689504,0.49719679254295596,0.6445557141163176,0.4886365680445721,0.7661708055408131,0.9993447215038835,0.5424469540976599,0.572014555395089,0.7104502355118215,0.6026634384977771,0.5650811092442068,0.5433531154935444,0.5553725755848182,0.7586238772567415,0.4809856207492786,0.7138300987844785,0.6290074485991635,0.5770784547353788,0.7044064558607381,0.4824072476995108,0.4732206248049337,0.9999999999841033,0.507413688639486,0.7768639033833715,0.6599009898171887,0.6098290299073157,0.5140558441105973,0.4880967529582947,0.908160980129638,0.5187068392731647,0.5735121319711665,0.7974104837717375,0.618091583798052,0.8707186021997415,0.5586462804466539,0.7949959182159929,0.48272544196251305,0.7609513777516159,0.603910373996702,0.5562735958784748,0.5687729033063671,0.521497454591163,0.7971561356957156,0.6194251870564846,0.542068844706337,0.5044008392401067,0.6229691281467133,0.48203660448364755,0.7812047915212956,0.7610424151867665,0.5884918999581411,0.6232022289475176,0.6432535976591215,0.5255451288274126,0.6167359578841229,0.48344794234856053,0.6339393966262474,0.7603291424532517,0.5917991236443794,0.5565070451257093,0.48872776974598836,0.6322434801808379,0.747725815026425,0.5521509649109904,0.7187886270483491,0.7739386434842049,0.5188528027993287,0.5080052272093565,0.538464278875606,0.5324889860983014,0.7616442306170829,0.7081435913403291,0.8992570271527941,0.645382385757403,0.4984038011476271,0.5300402993112374,0.6065926928576933,0.5268434369489291,0.7925375240017114,0.6804655040858669,0.5634230436023542,0.816169183740378,0.5140551408234452,0.5598671367294771,0.8556003250307908,0.5428864880303703,0.6042560488205817,0.5653037958317649,0.5782336451977259,0.5230747335688373,0.6294202612964861,0.5288253934095831,0.6238939833872852,0.6632434067231823,0.6410362252005916,0.5363428929193769,0.4828376369879612,0.6480509290087699,0.6122597045318257,0.5615694483653393,0.49587348327696357,0.5190956630897016,0.6397829432079528,0.9999997264237193,0.8534355984946154,0.5771662204934549,0.48614987980969954,0.680519790267186,0.5876354094549989,0.6019311638223978,0.6367120013989833,0.5196465400073971,0.6710610104082648,0.6012766444479857,0.6037253417099476,0.5880635989556059,0.49565833198308773,0.5447439563402837,0.8375675641885941,0.6091020367483972,0.5714801744545848,0.5642405945821705,0.5588428260446521,0.5539434665280505,0.5957797516080462,0.6207633863908568,0.6189253713737464,0.5794401079217043,0.5165121763437902,0.6280415079718983,0.4292139460543902,0.5231453344080613,0.4940214670715596,0.5880609563964913,0.9668791049687387,0.6187484804642418,0.5940652098277461,0.6271609264073866,0.5372356984910212,0.48760051420510514,0.6361224625695041,0.6450624582222384,0.4122797728324382,0.8903777539159409,0.5048035754891903,0.6632853748002179,0.5730877963476563,0.7035724560078886,0.5173584140602446,0.6465677220324182,0.508705615817107,0.5086200167071508,0.5921731738883252,0.6641732470836939,0.691539570670284,0.6453108855886972,0.8414037373781689,0.6141771775878404,0.5639299413916395,0.580671865707298,0.5675844464647066,0.5269076051352825,0.6107071374456365,0.6440002003110268,0.5936061780072797,0.49058034981674026,0.7048338016342035,0.5436260749113031,0.5439838429239339,0.56631934596106,0.7605370722164688,0.5605539445595006,0.7426964069571704,0.6364182915472301,0.5420218484661923,0.5587448557958308,0.9999999999990588,0.7625277634730698,0.6237073278112596,0.6965705163949983,0.6040096867823048,0.6356719333511669,0.7081603730919026,0.5913931305991302,0.9671610436157467,0.6487908913708156,0.6840512720842522,0.5082992243341833,0.5010153063408285,0.999920617476003,0.4915068703389558,0.5596287510260285,0.5538565880168944,0.5680697063229218,0.587916361506353,0.5666245092772033,0.6088576545871163,0.5836114523704132,0.6157844229229142,0.9556360096100283,0.8368352096602116,0.5661874417639647,0.5618654926011807,0.9944160032687092,0.5910245900548705,0.7627420318534438,0.5317508478962802,0.6114936419323505,0.5870180513475662,0.601498106015929,0.5588288709935006,0.7569785863854723,0.6231923786459831,0.5614341812440147,0.4873193154853991,0.5743833908760019,0.5401818121204824],"x":[1.3830579101183038,3.979045043409013,2.2929573618740626,2.891572351765397,0.823167109811751,4.989392258764641,4.670165417270967,4.3240610704143245,3.1358999764692985,0.617350135898993,0.677337474571883,2.1113933579599173,4.427805498101756,4.348455721391287,4.43686029115796,3.3261952408418436,4.161165092840213,1.9526084632585639,1.9426225818023468,3.7390413373780618,1.6805261339003508,0.9326825812865425,2.646162312726761,0.41914170151331254,3.782712385310676,1.3741582166083122,3.8794546377297623,4.181959260079196,3.442791673864333,2.744125561762263,1.2294835544050187,0.20182771727520255,1.7228258575970046,4.795477257878829,3.320629256163844,0.798361239393024,2.306614741718219,2.155061380980108,2.716623872104532,0.7318690196613808,2.2847283852981803,1.741833911646845,3.9266218571410483,3.804319835122334,2.08131039381679,3.2177070341269443,2.9897060909618878,2.5219237263491054,2.389608093963105,2.99382267838461,0.8553764845731382,3.727705408490616,2.7896941321609523,1.1989319633191287,2.510264454720371,3.72200421509731,2.2950431380868554,3.4772371747895328,3.5305504392183384,2.131775382448792,1.4837068767065498,1.270244181311464,4.764171024774844,0.8805485141497371,3.019109663160199,4.222575012093451,3.40445908509164,3.0839309282144347,1.8827233410643862,3.4051799409166126,4.947056995545088,4.945652018061529,1.1573935465110163,2.5763687585193473,0.42944193099602956,2.9559091753352496,2.891978331711295,1.2431492848382963,3.597132905370141,3.0753263398252284,4.920857116691867,2.643489828152136,3.429289316966835,1.6788183640702048,3.031273401799812,3.8565070676100377,2.7817672458670883,2.6644835398455937,2.1559489273289367,3.095638577483496,3.8530127018616334,3.3115747771969453,0.9143236872070681,0.9037201362087455,3.7050742687334925,2.6422723375705095,0.591638585185863,0.4715453322075891,4.636214848742445,0.5454130206566921,3.4371983588758894,0.7755445858038512,4.529760669001818,2.999315701154961,4.674465969842231,1.4436971966843426,3.5809871977020036,0.717381246833152,4.630025801618758,2.2001412765539605,1.4288679633172885,2.5063096289792863,0.8502074990426556,4.549052754541632,0.35512641614007245,0.7734067851090309,2.1204239898202015,1.8192126350704008,3.863974150623445,3.1634042566819542,1.7272605710956945,0.29246675084567797,2.856173752959802,1.4692931015277433,3.9198201023116273,2.4736562135813536,0.6782919780207697,2.842713666533556,4.1584082994809,0.3276331444413305,4.124760545740629,2.5974372413371647,4.633755891005177,0.8416490298560497,3.2395352544635294,2.318480350760246,4.943067530416327,4.211915127784892,1.761065491582029,1.4341503587334636,3.5448747004818024,2.1728113393498294,3.9087755205128283,1.1145134683602953,0.17619293276452064,4.900222400676424,3.7206527088316688,4.115930433907011,3.994187670386294,3.404708081800929,2.0682755610335435,0.2998926592814455,2.6252538370645926,1.6935353517294571,3.1884993750173765,3.4341379545482575,2.4316621670554883,4.608449691507653,2.9338481908263434,1.474210180585096,0.950598836572143,3.8644322951401486,4.042658603378097,4.6162265325368885,1.9648665896663753,2.0113920663361884,0.4095644346009131,2.383272061878674,1.1568353422054545,4.4943516852614165,1.5529994396137203,0.4064835758386809,2.853246471243361,3.4529080681573676,4.130762552098657,2.2485323821145355,0.001302505650594421,2.7943123484260823,3.6690114446001267,2.835910800989303,2.9427452516701957,3.808356662770188,2.62725689276208,1.0477496882417214,1.053076153558159,4.417310971459046,4.51789614396931,4.037171040071419,4.633586289290438,1.0600726240613911,0.09705652491814654,2.705264389319504,3.7173851692739026,3.7310710449153883,1.1589391283458594,3.330655988513571,3.592373311144228,4.880259119169759,1.1688742245468653,3.027881689945958,1.9061316128725325,2.8014428296320784,1.4061758644769462,1.2586782354486803,3.1876856275803567,0.7275033125185382,0.9014161176861735,3.0358815984600342,3.2814384826538134,3.6244159151022948,2.621445031113765,2.403835611109626,3.271916387706195,3.9465397027186375,1.6747907805755236,3.9340762086315086,2.3400039128819095,1.051866338702352,0.20277341779162739,0.466913902427446,0.8363637925542389,4.015004151549771,4.745062028749171,0.6087148830954192,4.69029323555384,2.753860908125474,0.8476312394506458,1.285117102522162,3.976029674158774,0.9307699737494501,1.4731508709903363,3.461635385531924,4.7531473352099844,0.8069602049612223,3.8391732816312385,3.865732868220041,4.281072473491142,4.999180238912775,3.1438687632694027,3.7593931550875115,1.268448502495605,0.367258342799901,0.18804004157890408,0.9606159678999993,4.004558570114959,1.1530911077210437,1.8573570739406542,0.06845800654140644,1.9735817237279318,2.1382971170434493,3.6915248431299097,0.2868299811088737,2.575860653356351,1.6023258489461478,1.4376620185767242,2.6247925833242105,4.7492834046091055,3.372756487354528,3.5091672034584818,1.2699096242768093,3.313015511755263,0.0829766558645273,0.249552573496149,3.017227629691507,0.6559728587756664,2.319274596789712,3.650860844707966,0.13101673617405218,4.7735023782158805,2.520571633249127,1.882441639989495,4.416914587645998,4.1192828112398425,0.21082085025220243,4.781155379585419,0.6530470455030024,4.384604042428891,3.4376163062406895,0.5422846502092438,2.6295696792626644,0.3358623681449535,1.8460530623316185,1.8005549041606306,2.504079882570256,1.0144801158121786,3.5728624892700624,2.085020571602972,1.1352730107511266,4.351991126058193,2.9927205455459482,3.13223798514184,2.8662927497274984,2.4853205208037012,4.511863476423484,1.31156154158944,3.4338225975834122,2.3524681751436036,3.492152512605987,0.25509793666483094,3.982514795832884,2.1147103432351635,0.060972654626713085,0.34340801638836016,4.55632559024485,3.911960901303061,1.3302524883771272,1.4576683821789116,4.79218826195488,1.2890377078713022,0.6876755820226943,2.912507256035637,2.870620646290761,2.8021493287412937,4.256507855802627,2.724502334437066,4.902470292216305,0.39235313922264203,4.234215117324941,0.941907933740227,3.483758097843175,1.946738982846048,1.0895218551950792,3.0048554359780266,2.4873633280690575,4.417297376241162,2.982243476289611,3.6146111754904364,3.1928378816547642,1.4957486921373486,3.1355132023981955,4.665511120010071,1.809257045325079,4.097553874464169,0.6728372650473791,4.67453932469338,2.8362046340665015,1.1836843513889173,4.39090374012014,3.2553187287046192,4.1099396332757685,1.535186130762598,4.603671457832775,2.17839378053329,2.3067710844314417,2.406852159274484,4.225447247610825,2.188579658249555,3.3570463774571433,0.9467137709681306,4.335462248182785,2.029271913595867,1.1397814388648775,1.8103475071341435,4.722384082407962,3.484152950210637,4.037581232004825,2.7666138359931756,0.21243649003703458,1.4481889322043717,2.915617512065407,0.21284642902234419,1.9763902895418894,1.511620663862041,0.502924482757825,4.841520078648884,3.669334958489822,3.4765322175988222,1.3955044497501312,2.146540510880919,3.5057322283982506,4.2446956952229975,1.15480033280009,2.069262150588748,0.365171238941866,2.443902019177541,4.7159653827697054,4.624788433462548,1.294671012854277,0.6854839350057629,2.3987286115918813,3.368457118241075,2.7140058100033504,3.295095008654698,3.9142743390259014,0.18111009964304814,2.9778937574882978,3.5154245492334537,4.498446944508469,0.729261928873749,4.274132298808744,1.0889885299889657,0.724470408108917,1.4164825942875081,4.368274544657432,2.624682782283434,4.1780858677108785,1.6407354933789697,0.188205801640835,0.8116578403383101,0.3878430647841957,2.189834066801005,0.6110612100678448,4.237903941218151,3.880677304601533,3.480154285785162,1.1763494024715215,2.982407716041263,0.507741998196537,1.8008798704090934,2.1527487583426517,1.045983135423374,0.3828472635297775,3.1370471590603,3.7043484447450856,2.843571977165855,2.717535265931076,1.3128133890260818,4.890409547092523,2.001371644699197,0.693136714951551,4.747532001858942,2.9160143345561718,4.375053607784043,2.9799957030251347,0.2756698289061532,1.5500969999706415,0.509339067272051,3.4281186448399783,0.9713676461908238,0.7583168429631582,1.691010019567607,0.35411258860369554,2.0562471829085007,4.377090800892184,3.3864297663364864,1.6048004474217425,0.6434530661823978,4.345252191018796,2.6407433216617915,4.790355434902516,0.747545746813465,2.3422669864514987,4.756099089978473,3.929095303759569,1.826423453326912,4.722223071470645,3.652061264094276,3.9089416712251026,2.004170451129006,4.941035682535313,2.974801104363325,1.1479947158387127,2.007406251690541,1.4561245228596797,3.0039233603412563,1.1696009518986694,3.234942807910998,4.969193508191605,2.1350006799731833,4.108313121736705,3.77030712043675,4.944654780317413,0.49826195217061775,0.7708414573545186,3.916125286157288,2.840795335452664,4.669760970208088,0.8711015962244228,1.564011475626087,3.4826382785478915,2.183445390143144,1.2514771479185283,1.8074203254977539,1.6848657903865771,1.7252280425874345,3.7758755428789326,0.31961948127056106,1.104020826581792,4.852929926036675,0.5652451273434478,0.2841560516011499,3.9477720599670176,2.4432430889056853,4.339836632142635,2.509281120642396,0.6485340644288851,3.187494050186962,1.4481287388150188,2.497047406370511,1.4922999772846468,3.755767162557002,4.047196913895634,4.73779691991672,3.6887791644080234,3.3797785614422136,2.4245630437520727,0.8242115624880386,4.61385822669638,3.1998896745313132,0.08611848604716199,4.108683447699116,0.1483958454271117,3.205935870492178,1.3975771992496078,0.22182519618336394,4.198546105990633,0.7445657245690995,3.0188463570539836,0.7731223648260099,1.6710338047234619,1.0571743233679187,2.5253416407086293,4.7678338820407395,2.992243510123569,1.936416666521279,0.6888596510460854,4.80376614287056,4.329859811115369,2.6078232803834456,1.9095751527956528,4.762792947844749,4.251006265192171,4.32678629023635,1.0006923992078087,3.4177424446450466,1.074784977547415,1.194326597671912,4.82198097629847,4.617195178228722,4.660792553629271,1.481936317423339,4.094538063004034,3.528164726345996,0.9442950670365557,4.155025570724288,4.717794543272182,4.211679287949038,0.5718874650175698,2.757891024043957,3.214360466497407,2.972908945326255,2.994927459777048,0.28014072645048516,1.1533169180182312,3.1217652252004866,3.83873729300979,0.1094687959482088,0.15168312674817885,2.6464033613242597,1.9577357254718175,2.4113333313895136,1.375522855825918,3.7771760604227023,1.7765134954346373,3.539620612610709,3.5846258628318473,0.1815194592266145,0.4691043131562611,1.0810471113507802,1.1426581051850482,1.0145247461686757,0.932219628018085,3.5318863310212247,3.283508667257271,4.560589878777498,0.5649653445666047,1.5031697298107949,1.097471135838598,3.915686992597899,0.7242936455424864,1.730582813172452,4.702959160809929,2.6934834499510596,0.024301034924290033,2.1793062182006695,1.8797034230398335,0.4961195496061066,4.277767445451484,4.5675308483703505,3.488588976563914,4.617099383240442,3.002506023805939,0.6412359713671179,4.576128936651403,2.1595638160710076,2.541860051984124,1.9996857963933001,2.983738155328941,0.8510656270068684,3.667900191799104,4.335745766670266,4.4646993208520644,1.0655386132969302,1.8233604329561126,4.366236588573108,3.164991336207245,0.15668408681778767,2.6495106383908054,4.82337677796838,1.3529617212946088,2.199820655242839,3.9732981883060114,0.1774520595607587,1.9352265782163924,1.9703772240437134,0.022206944942173568,3.9092545192685413,2.7676897849863447,0.3292622506052134,1.7737008548708844,1.5437795229830364,2.7211139084859326,3.793339332098814,1.7411544961681114,3.2488074424569646,0.9300547881631294,4.446405513399,0.24627836058382035,2.4527631127434057,0.8947802034645747,4.784663551178042,3.180258298154949,4.6610773712909035,2.7084108282651496,1.0973706902668856,2.382041475182164,3.662763107686958,1.4112113352190059,2.0164981467094556,4.008792172570924,4.176974156305634,4.682836464325741,0.2207478534051699,2.0476895632748606,3.4644685695758115,3.2072842585263106,0.6879316032570715,1.9297555340464378,2.5212388941671158,3.7701743387880193,1.842139051980941,3.5402806886921168,4.206823042100757,2.3396417897322985,2.0097721836329043,3.5419205484495073,0.7667736148041404,4.505525248556582,3.7304546630462343,3.3177518613282206,3.572076719935592,0.07465656325321923,0.1314565426160852,2.3862829013160916,3.7256908988262003,3.518133733357196,2.9248895688548524,2.0797640993052346,4.096378927934086,3.7675724062894878,2.64309902331455,0.24290238738821635,2.7875394565491485,1.0877386582061044,2.9156944792129433,3.3581206821543077,4.673091361371734,2.021392176165703,2.7510631983800424,3.0830534437155577,1.2073600507034654,2.3846454371211054,3.8024896961059005,4.317751243287567,3.9115888453126626,3.872627614795212,2.0770188908632092,3.335441112030515,0.7927638940749038,4.754550042644378,3.3966608678366326,0.5008914493373262,4.691022648685279,3.351857012710453,2.6528634095881465,4.636728260498693,2.221725606231082,4.090976294935444,4.544640925296831,3.118442492926582,3.7343656616806307,2.3615234273558725,4.17915253173017,2.1297760102149157,0.5031855975298061,0.8523951883776115,2.670276583846829,2.3660651048620087,1.863504066632432,2.387678616371951,0.4077802875703196,1.808732948178372,2.6603798206957174,2.153124406628711,3.003833213823949,4.863065959363453,3.9695827052944654,1.445339976757326,2.7224724983500614,1.5461081590506276,4.156390078840558,3.4985855730493753,1.5711369317712298,3.9816235543413625,0.04394249257915983,0.20297068324837575,3.8206432473004037,4.267110658287149,0.9580742254440666,0.43682505613571565,1.1371673156901185,0.9702819624460002,0.586163929955047,1.216519283971118,1.08864781580984,3.8784526321792567,4.442464052053001,0.35515602497265597,2.0130434627973126,1.4650436222998608,0.5000465773969898,0.6457632788768375,0.39036033486161137,3.3896846129996483,0.8391789107769521,3.6157036109926786,2.434530314497091,4.70108249580909,4.549293545337932,1.2614288768243898,4.134973166222773,4.35072354271803,4.8325122168556325,1.75671281183301,1.0581519417027818,3.0136042796830664,1.3859495005861233,1.435669698024571,4.2605322252750355,4.234240616182383,2.0825263786054347,1.8579368710647248,1.1986113256335518,0.4425944671492188,3.725815611603547,3.3067269147125486,4.789453408049646,4.176366471170027,0.15488889825962748,0.08070029539377299,2.429295620320999,3.095521507845792,2.0309117527429397,0.573033583515602,3.384983219516039,1.8270713490295787,3.727588185616514,2.720715922060072,1.0663212404013922,4.99210298411049,2.1175999630534204,3.5837208662267885,0.48464562028143976,1.7090868173140938,1.498966907699023,0.28448353093091794,1.094573182062244,0.18294498242378388,2.2964890840322862,3.492476668944746,1.796689495773156,3.6623275025080226,1.8353120523818967,3.3132548438858187,0.1511606563852641,3.951324963249289,0.2078608944466398,4.174272862205517,4.160378787567409,1.4130318283022758,0.6341507448658612,3.844808378014207,4.320770182063926,3.241762978271885,2.04476036292478,2.4313295786971922,2.069986449375667,0.05615417141084267,4.718590218506584,4.671157239053595,2.4030760335790857,2.3879037142450943,0.024402831317272833,0.2495468339496809,3.831760599711406,1.1383800905198793,2.7691132840731623,2.7739490786603938,4.575981775503784,1.0439202341622855,0.30534128451593534,4.09257416436537,1.383525801832698,1.340399262290628,2.324290752134818,3.1472757595778402,2.623140439724725,3.1592407257352817,2.859404811101051,0.20065948094030284,1.2187686140921117,1.5413758785576637,1.9237065388585028,2.298716912713733,1.4092751004911241,4.742381011016126,2.610685016381391,1.0344399502301194,0.6217027036371447,4.905397702762921,0.3092403772358665,3.6016112238299867,1.0904756522733683,2.7045872196916374,4.089244742920874,4.729137272067029,0.9008848072378972,4.738485502930821,0.10090164131390189,3.3536030418163243,2.6896226832614345,2.4724423862309983,1.3777144003108621,0.02360513314879853,2.257378531736103,2.1419775814369313,2.8283905144183255,3.8285387343099178,3.2553925161787722,1.7398230653223057,0.6467072166595123,1.1395041868949352,1.9745517158584958,4.392950494666511,4.860277754003738,2.9828731517284712,3.210475161650254,0.35772013819328263,1.3523289499408098,4.69493405128525,1.119379001898827,4.2210406447777435,4.153208834439216,3.0563233864021724,3.8322856328460473,1.0679812283448287,1.9513521316216875,4.199146005730189,2.3935450775331635,1.8367417607430914,1.7243063023933292,1.2427319222463928,0.6188200965043678,4.934026488591339,1.818478892376827,3.8238356836274736,3.864927583065636,3.802102163507406,1.6569882622879684,0.1208573953608727,4.093057198481736,4.485913438685095,2.5711664631686713,0.4297334062314906,0.4601230532173495,3.902294937430698,0.6591503931030307,4.366258323890797,3.090754304511214,0.6046726364808641,4.675392651693708,3.212525113920649,3.7380801674788886,3.54010007910047,0.2377562279857104,4.264974792824266,3.1787264300790796,4.006485498339753,3.451264820018487,0.11483289898149729,2.2448338652013056,3.786698561112738,1.7473768760327402,2.011771474897348,2.669521431353731,2.801746440480076,2.1857694810441997,3.788814746774257,4.04126250141913,4.286310095307594,4.221017267549349,1.02634425491256,4.263853418773755,0.02097597189136935,0.9792119019472179,0.06281164227368907,4.332207392853833,2.25266102310787,0.9575254928479704,4.320539803514924,4.433011288979067,1.8321758918877418,0.30835660902314377,4.873595261222718,2.3371677874538332,0.4170417909488555,4.166325494483485,0.6116800063381322,3.266141335754964,2.2519216106835738,2.5224663880084206,0.5649502785756855,4.020387493058502,0.3603633364426062,0.4947173095780366,1.7694676877569193,3.5015747395320918,2.285169133397532,3.6310962147839954,3.2493080612445215,3.428068667231031,2.6961913732163847,3.469504037367482,2.7129855726485763,1.124238221652305,3.4086841014861013,1.030042687662368,1.6665042176523892,0.29404494986757457,3.85045859913148,1.7713369406426238,2.2097057643135387,1.85291638521483,2.2917933119119747,1.1422018564301106,1.4881982501757185,3.908338511435673,2.468182965033062,2.17307946805683,2.2744734993295976,2.4398879773306623,4.383354369547891,4.279458435190696,2.764668432415701,4.7158388347054085,3.2569302044951653,0.7667745199444065,2.183365070594311,3.175843121339952,4.969057749373867,0.6369774301646858,0.03743498138683021,4.86528809180021,0.5507595767546114,2.6512998546381796,1.8951583030170172,1.622054337721548,4.3367582802259665,2.753325907005686,4.8164394759742235,3.935321922218533,2.94674381625762,1.5090355373728537,3.4945102186562806,1.7623690005457215,0.5413526668905932,2.2107254778395746,3.8301167167915837,0.9456278173258459,1.4268215679006868,4.422801354160448,2.5443722866320497,4.841916605323951,1.1022275142140336,4.183317267102148,1.2369799449844154,2.4984810574338265,0.7842028510954857,1.8440069911414625,1.4345566996568082],"b":[18.69900171846917,18.73249421508152,17.331577957252136,4.928082763231143,11.461131201897707,17.168886619237593,3.6737164428641744,15.78788204542887,3.0040605894999306,13.83228073077072,1.7532510460678585,18.24770019361398,16.787368702981627,3.8218799496154077,12.660780534326431,3.5178660235765147,8.14010570386384,8.411507627991632,10.932825600869034,13.029691782424857,0.5563212488409208,2.64064441033677,3.3937631635603394,9.14788078229039,7.859759949681013,16.148802432461217,14.708727795665038,19.606453886938713,5.6080050440135,3.805339468216715,8.874768582637023,13.55325917337446,11.698292645415815,9.707475562465454,15.058143612457627,10.380511748808301,8.31082634030587,12.934756164249945,12.323746163557807,7.0927467287061985,13.635229985249193,12.529139675026432,19.528974363968004,10.05311162303579,10.534979478238448,11.841256438194595,1.6945983723753377,0.11539000583242753,18.445730938586053,15.186002685176799,0.73825457737696,4.442977277247717,8.33453979667826,14.370285239614478,9.266920953918948,14.272782289186479,6.455559334635481,7.0016018133053315,7.0783348503504095,6.475531163392398,16.146160726159223,12.578081169185996,5.824458924614171,17.16227655306014,7.698874280258341,10.137501439535166,17.72217799189317,1.1967182928025055,7.317825651961494,15.896113399643884,10.347181520191429,17.18220713306315,8.245070887461235,14.950856229163833,13.448355088799246,17.962588634149018,13.213908995177604,8.210501322985916,8.16753601292968,19.378564857170993,13.834167504446278,5.295803363470157,6.404064427680183,18.076736912269347,14.019441271652106,8.707075735218881,12.51752169279392,5.099286698494256,2.8005819840963264,15.633858919712221,11.183876661078212,1.211639530018389,15.11130076811586,13.638409237103733,13.110059842780636,8.768282845354175,14.153446465838124,7.281995155407803,0.15512564564102327,14.504201347056224,18.915630257906443,13.998185292303841,7.277186727178018,19.107145327922723,18.544269819152667,17.017949346338234,0.9313265104061763,1.3312195579688924,7.711080349954593,10.59046313125565,19.79178582846618,12.87844877397568,15.690507674941383,7.88326694424395,10.127445128752717,8.391045020648766,10.222812595276999,9.862279486671156,4.887970841682487,17.506122921136186,19.63538920273575,1.5854134521577112,17.82098996987774,11.463631145252013,8.005886983358037,7.69907425731176,19.551228954903497,15.283554411056821,12.460272961782938,8.998327798950978,11.183480092665508,12.011826826016968,5.004816456312584,10.34027443850265,14.959338933924236,12.997327175228758,12.277969368108831,18.25454185093944,13.652393045413035,6.842908287117182,7.576540859728342,17.709266454140185,15.079716339340585,12.28686500473096,7.836973312415378,17.378979821615467,2.096118779071623,4.246207606562038,6.4362049048579895,17.37153583236648,2.8737722429795642,13.070750853281169,17.15719249185101,6.177544350188069,16.672118925217042,14.076338226087648,18.657012921955157,7.733720063444478,10.627651940045952,8.204848039879508,14.47022574073053,2.9611880495795706,9.953313964304392,14.351405825264166,3.187177991060506,9.074800980819195,17.224983070454456,9.311558146907215,9.972464922653392,10.874245774467472,10.015568140580399,6.443961807809067,18.2091975571217,12.747063488601302,2.628376165337496,12.705189528759107,17.553386862139455,8.865685882331867,11.054782082216672,5.118660518763365,9.36471175254522,11.09343114256725,18.362058213658287,1.8791687478557062,10.260661373648468,13.470757322925069,14.89475218529654,12.11945323395826,2.12593487432557,19.97189564189876,9.093686240773081,1.874002355894131,5.690251938250985,9.973855505821678,1.6658382584493259,14.081694222324717,14.274623212763323,16.023902147644264,11.099285198477418,1.2517415256874953,2.871865959988069,14.206622314048612,13.105323674679305,17.401329820138383,3.567503503036331,1.4611958634163758,2.017061020474311,13.410742954832365,1.833606326168118,9.550912805644876,11.893289195973189,10.525816942981528,4.927825019799852,12.958637428361182,8.071090669278828,2.116471324026765,6.099104079989939,17.789980936888277,5.960050167217972,17.522622918650832,15.760135477240622,6.234780654644401,6.667425193011227,2.7865923336050535,12.341582998963755,11.673213924413236,7.797536120473723,6.581678743386377,8.536988174448572,19.187049252276076,5.533306720878146,0.6107171732745309,11.628484278074879,9.353034554244974,17.493329212553892,15.395533381088523,10.725036946075598,7.335288024402193,15.27552014791278,19.555428469480205,19.884802368594457,16.450667516773887,8.986353648257275,10.62604096675237,18.796308051665047,2.78836097423496,0.9801082498815061,1.1786478675950907,16.853356565145635,7.123674449390314,15.11162246425426,2.7315543213219984,4.931060348225116,17.302145573818223,2.4361166019756597,9.328962021043674,6.240694776533693,12.019775734993372,18.500441175852337,14.80728994565688,3.593462780233043,8.295577478827889,11.36659833889356,1.085300025259155,5.666781454028604,2.8083090831941693,3.14936477058664,4.514931388225407,11.813208628657122,16.466596438328306,17.665733188267293,3.2606561848080062,1.6872723975565052,16.5555169030168,5.430694843082691,1.0771336222360572,2.6514757468761374,16.680100635921526,2.593782348507361,16.806681201006132,4.874694451793347,8.16930258997322,19.033439912200805,18.696717906233303,10.084100635778807,9.480296459177925,1.5252264518075087,8.077631534563512,13.588096926726463,14.327521347042008,13.235148524117552,5.95074482747215,16.74840524556066,4.817712294294152,17.782345897577937,4.73152326955542,17.561945095311895,3.2091463035559142,11.644322949945689,8.96334500100366,5.695348295447249,17.43554450897211,11.428148357234003,4.044227427530398,8.067990642097822,9.981859994105914,5.208165688023083,9.343638974288293,1.7724825333337169,16.107525831576627,10.995455963692567,14.748435084827364,6.135527805190999,16.191075761101857,13.626075643011863,16.776153214482974,19.15154918869272,11.149070815625265,0.6832122624720816,5.929259922664558,13.003024555774982,9.768649874094649,19.50718873035157,9.88574434672068,4.9495854321469634,5.908115361927289,13.113374953289636,14.395438537052359,7.512237775167132,7.5560058452608025,15.863353615155429,2.805185707350528,4.020626979106243,15.25689342860419,16.77957083567925,3.466706028657347,9.174542136470102,9.872461275032801,13.198335539930586,13.38178081611245,1.003216483688596,18.067713571927303,0.6147162385019156,18.737735046020738,16.034614132839387,0.5423213428216522,8.439529283750327,16.700271854676004,4.299999019663732,10.008081957791948,4.545499448489614,4.278815523243917,10.803744249141118,19.11820261434617,2.3356132278914155,4.9794521394870195,18.603302089012097,7.408463716608584,14.062613796327321,9.732299392196971,12.66997150213044,14.842017950809868,1.259210456883486,0.512730105458532,12.65958731432308,4.489269849247983,10.886585892583316,9.743648445416664,1.0991012320889038,3.349744894755604,11.749476757091228,19.113494279794278,6.203983557465307,9.485475182092657,5.665252476078484,7.869388918360594,17.02505109147506,10.656478984307922,9.089209263966232,16.773418739499895,7.121462348269789,12.137369331293213,4.148882972421504,17.24773846295319,3.0486275852712286,1.3507637163368225,8.350755305341128,12.11277436846876,15.27614140321866,0.03766438703932007,5.634209304960156,7.777100610246936,0.12877703576652966,15.893795838569297,16.717431674421697,17.440303802120283,11.563326127182624,10.889291632521271,12.396833841279822,12.769263161436522,7.992232607929446,10.183032199695866,1.309766630634761,13.655561986489664,6.3635942106834875,2.7620991964636588,16.590519807268436,3.002368541040905,4.656441092143142,11.896832151220034,16.939130296905734,16.523998522708645,15.792667173568407,2.084401368567863,8.190772914979206,14.721276699701335,11.522933406830402,12.113738831002557,4.898237655299957,15.528490054889726,3.9047344194493983,12.231727607418929,14.4794498330443,0.572479152516161,13.851450863451088,13.685054668122945,16.36133412857032,4.029186745484563,13.41370013863273,2.8060405253392418,5.765069839155861,1.6673444958182326,8.486833501612562,12.032272825263144,5.638261577672221,18.88130347128158,16.66821953760055,13.014709576140419,17.872764667603214,8.20412762914858,16.893367822439753,2.7023904501164164,18.047213556083296,6.10486427480692,11.401547394885148,4.04515652219442,13.796169147765372,9.00062101658368,0.645507642297698,10.568663824423897,14.248993738550801,14.554072033828941,9.87870073759197,18.477987656141522,6.22254102002699,17.61386523633313,19.2313592259574,16.873984392204363,10.741720322065387,1.0769712232634587,16.20041046166165,8.123941453431511,10.823515370160951,10.234770513436091,16.645521254836723,19.582120365678847,17.209628432374856,4.202294241933231,3.276301290253243,15.673856948500319,16.52053910796414,18.756059074131525,13.068291317651592,5.300560675831489,7.93512454302661,18.918458850824255,0.11921985409271141,12.002910706022881,8.618384361630739,17.869721496698894,4.363274924334664,5.898391039738913,17.43711040482356,12.518333279470024,14.473174493945464,18.41882817233834,8.507109903616815,19.44506413313004,17.657225453944324,14.446611177606673,6.445850889626152,2.963365837958709,19.297368968539335,10.88380690618909,4.275547311114787,3.487946543430396,9.10188692011262,18.596231651480547,11.341219519383245,7.816388501181715,0.7760476132870542,9.769273458164317,10.001987000500808,2.3017418426122083,5.179913314575573,19.965117848606276,17.259782761889237,15.083321272056214,11.038470518162832,4.715124241473876,16.108942949227618,6.3522176163470645,11.049687215420132,3.4314703800251234,15.973075174908221,5.13914594499862,0.273889961488778,0.18759582668544272,17.009700909504705,19.66392926926705,12.746752016989404,14.238160212821679,4.348158314079984,1.834830215173624,9.056336906488376,17.789247982928966,4.502388159735293,14.030115317688425,15.243026989357977,7.136017575681488,5.467811717471931,16.990740666321898,4.600873005931971,5.019613591346799,5.712930541460857,13.521070896521978,2.766393023076237,11.108915581074378,9.427647172138318,9.68804658881389,3.231876451883302,2.382060546687681,8.144840329667563,9.764965993342676,6.788373126789979,17.95162591928267,12.284325003420985,0.5726912425516995,3.4144855282733255,9.547797290004954,6.007556767726094,11.566597798031054,2.9934682582061267,10.082033794014071,12.177346611871634,11.034388563676822,16.99436143282083,10.65220025815664,18.899097666154297,11.487083322975874,14.004300089482541,7.780811879166039,4.0257754514640265,6.837722014267449,16.51354757973206,1.542260827673494,12.678972074731064,15.37125440258205,14.417651553725118,4.694692499991877,13.915534603268593,17.16993692661294,13.015532388839354,1.395652860598644,12.31814533274961,13.849810251448368,5.1967734666411,0.3670509960730062,12.061721839210318,13.0810377872728,13.86758855648016,13.04717638755621,12.125260004310476,8.17958540186497,4.967058596919509,1.5900446957828285,0.9595577148271772,10.26117185944897,8.764064538926322,9.12998803994153,15.396397690540308,4.698320984907451,16.821697251979415,16.237564579625037,12.424195903677994,0.7448513284489966,2.5777720913714797,8.632181020833606,11.18958237705531,0.3086650724790774,4.554679669201507,14.21691593522703,6.669400767303659,16.401004760928316,11.103205154650176,19.712015864170137,11.977525523795176,19.89086285156286,15.056085321281572,6.796685730898555,17.20715560846964,2.591481271452274,17.663085421306313,14.938435748505317,3.626724247577453,2.7390432763383954,15.723035120538636,9.937341203748545,16.899011543805756,16.659990138535488,11.7245576868123,2.5972232087705738,7.190593926452107,4.058529192317559,12.761306066643062,15.4634667435037,6.013901335475227,18.214801380547534,10.241673315314719,19.452342780556442,0.006598010170648649,3.8268258604908345,19.4639492515299,13.095042213326256,2.1280118711288054,0.004188688335093893,19.547851670738233,9.681430181556404,12.909241549124815,5.264543239488084,15.561172820821687,19.34434985019958,5.284935180580526,15.903364104792225,12.498760632524558,6.233660383514299,19.77347440182911,17.7840042712921,2.4988807021248327,8.952109265410822,11.491556312992103,6.913308758439234,2.5082895517318216,2.6194743984357594,12.528569504825029,13.217941697170005,2.887985489897704,13.343661693868189,15.68958730759789,8.522816901315382,9.359359932623192,0.00828600628555165,5.218142437462601,17.962074233366458,18.944091567560942,11.772623361098535,1.645502677702786,3.914698841018467,14.915363174719678,6.547293990256109,5.727367203414211,2.422545148445674,11.95350179089482,19.496278072460058,10.124243467868608,5.148500930847675,8.916257718429975,18.23411768506957,11.552335828625925,7.891425342778811,17.243109718222666,17.116642114903392,13.616967934050294,4.304712020477259,4.224838605155665,13.152618567511007,16.03109456251435,16.10460642255449,14.491797744702888,12.883347475663328,14.348829732467463,0.6551055367150838,11.64999415954762,2.024312879124497,11.86408191913948,17.583068247152895,19.50597889627913,12.806496625303545,10.109573740755856,9.605732870688186,3.7119775661669463,19.10277776939646,3.0273950871865996,13.731437323281739,19.704214043806072,0.9067999041663244,6.3613982586583395,14.384280672918187,11.674997770383877,1.5144015805062194,4.922852328009029,9.558412295482043,17.864755457670853,2.0650257622087187,14.875970877513648,17.304535989675,15.940159793801838,8.088068374854135,18.110535056122202,6.2284073153882735,11.20122148809835,1.855790992787698,10.111506388504825,11.433586548332034,9.820260792996184,14.157266738012758,13.172542725966698,9.550501382700386,1.729747359122844,13.026582269170731,16.180220528869455,14.486405954809204,17.578059325673735,7.134239390417183,8.41428380999056,8.59510289257328,7.253382065737122,17.805796591678313,19.20599111666863,15.421538685157557,16.495506599521445,8.927133946994822,0.5882374375363097,14.273200948749976,11.422561286235148,0.00770014573814759,5.32156659496974,14.387341058991314,17.170485433222602,18.919782607629884,17.60231819034051,1.0484571154596622,1.2963043289420417,18.416999700943677,19.250509640800736,4.688377377455657,5.999552990456158,15.328142984737001,7.964860084680905,15.582165794233024,9.199833843707438,11.878172086290313,4.095674074229678,8.580319942213404,9.318303077430695,11.617975133782586,12.333801214841413,13.70641249342745,12.890007796389904,8.2371955364296,11.899915449650909,5.850888350451986,4.145000901693785,10.033481852025595,13.010342026281823,7.66451770271948,10.909075809642683,17.87177917775881,11.396779547523185,3.6902994088392793,6.312079779790354,14.324991506762563,13.037099451909931,13.50850071164572,14.17819844665322,9.83402374463871,17.089367993179682,4.936445362852475,0.5821642725411458,8.56498921854203,2.8887350085838204,5.533742355062179,17.335769698857636,18.42482060342728,15.402995147770579,15.078456831435929,2.454635189675969,18.970304779621607,7.572869273455862,15.596539064952083,13.326686329049142,4.136463248838997,16.353258375820253,11.96062917531988,0.12317103591907852,17.243802626325962,2.816126172285327,5.268455461192452,15.937576525390721,18.328428428567655,12.852537136208223,2.080713351834471,16.59241551647215,5.005148903352756,1.5070675144788837,11.419049452184211,1.93161944391123,18.56747513155802,3.004313678963393,17.51492193844053,1.1142252814812803,6.460721623385917,8.500025329169842,9.470316175133355,16.507666385108376,4.352960609684935,5.939130710575684,6.486690288389765,19.283804277935467,14.705794497277832,11.150286269310223,3.8857321680998425,1.2784667080023615,10.637801002829024,13.542570305501705,12.167268838695033,7.945473128533904,17.254103802041243,19.78840735651806,8.094883998107182,3.1473379479892127,10.155216750691793,6.616247507618689,10.604209765786056,4.367610877490784,2.9118088808013454,19.357901917720646,5.227987254431787,3.7858062893309086,19.28231402442274,10.134203096586237,9.366389901995667,17.031886289805858,4.985977988634227,7.442317886342686,1.421551223873565,9.285286212589895,12.286158621904569,14.909705692425241,16.596336289137817,18.549573933394417,4.167820657525452,7.171446582335741,16.269858589070097,3.487403493424508,12.213887140940546,14.02451196347776,2.8300434333836266,18.550041786425556,7.3743401202917225,11.718639593494192,4.74865701720363,1.8353031988233548,15.180763193920633,17.211352265054252,10.603949042890122,7.44937291938264,11.173906979388569,16.542513559444345,19.085305169696486,9.278748469437286,15.885609946129723,14.438647799324421,12.41981573493982,8.137756708977314,11.592756320823415,0.028571973648712223,3.222357426601805,17.643215539662215,13.847041252285276,10.308451501437323,12.55374679201978,15.097815151668733,9.824183766699814,5.683830404211916,8.346296473848799,12.153191337144115,15.43591514387765,14.945450893454142,16.778426730633747,14.312186566327568,2.5847913544366685,6.463944872019423,12.564633015286892,17.68638030008284,18.686048324183368,18.275538747098672,16.234127447569602,11.037821015580551,13.173986363016308,18.700642522650686,4.680685086104934,13.220501430803555,4.846765932387056,9.03871632695305,12.302316422537594,18.69075707329609,0.48264297979936366,3.3785187601014455,16.125473734341274,13.03849718920115,12.757380893104816,17.304809298955877,15.055084644239445,6.365650316738405,0.555079267884091,2.737164654597488,4.908727873845362,7.165314552854913,10.505825738512264,3.698996741361178,12.225790471336072,9.41533504530895,19.128599450574512,10.291512231626498,4.484045833273149,7.876059223474936,3.262160797917293,9.01158126295031,2.1517710906404064,11.562195591062906,15.27863009248659,18.325799039988233,13.503862147625671,6.920514806602798,10.070531124925296,1.7033023250385648,6.13067946746666,8.868161200390432,7.294838354154973,14.96445734070571,18.202367926305936,7.950327945323785,2.6532725804497925,8.607139307695778,1.2022527086622325,11.801119004083045,17.44545917476268,10.737324079687598,0.0799305377283055,2.459605749351419,12.762520548862417,7.7328554003385275,8.833987708699729,14.621764283152391,5.294874263953475,2.658716869771629,0.6899003480108501,7.472014064997725,10.114369670112652,14.527355253599543,9.718131412760368,0.5154692567262309,13.089182122205285,14.958511355616224,8.562605080143184,6.108480126604929,18.326738007150134,13.41822505549728,19.032249969460455,17.81535838906548,8.176437872103172,0.5389678839072509,2.6680453987429775,10.615095576159042,2.787414075132033,0.37404651198504,19.02130093031829,0.4663132485414545,15.902079526218508,14.316368018664614,11.793032184810247,18.394474147572836,7.888334153226602,4.698592437195974,4.0014987554376,17.66976712663005,4.874262422757369,9.538174000544108,16.25981013865857],"mu":[0.6706557937323794,0.4353307024015509,0.8412267029808751,0.6027814321241272,0.3752950453073045,0.1723506796629033,0.4505027906840464,0.6023240382346313,0.4244959715214023,0.09074623029853646,0.6986079576478217,0.009988078154220759,0.13241975710993192,0.3331278569550249,0.7255708539698744,0.3572906554755224,0.007861634618301139,0.009943364439536806,0.31075556316288,0.3698503020211861,0.3347733030527309,0.5306177007629225,0.2814570807795511,0.33068734865082483,0.2657315214775908,0.720390330464181,0.9435729258924279,0.5123976283646883,0.5719595800830115,0.36371382842745725,0.6213531130162946,0.8345196764038789,0.28193794203341205,0.44351926019139487,0.6290963297156749,0.6990592941212403,0.6286565635215238,0.43579484370196786,0.19251981282225272,0.4417875897917791,0.9026982412767814,0.1832662027337688,0.7771189145650259,0.3416894821434808,0.16033333772352631,0.37328785613695237,0.10487709918985644,0.27777551907439335,0.3658277664864076,0.4418224295980697,0.4732874331078325,0.8721056795119362,0.06295188139204955,0.8529589644105662,0.31146819601460596,0.4762740890343544,0.5581765647670018,0.46815771473800094,0.30698007661691395,0.8702392309807401,0.14821777005003955,0.22252111126794105,0.5029166880802771,0.1324668895045118,0.48174304431196924,0.9074620187543263,0.3892108779927905,0.4607015912043959,0.4568524918345509,0.5982054187763051,0.15628445809520763,0.5287137146129135,0.49353980592093993,0.4313361802919091,0.3734852230915098,0.00693141175723011,0.7653168385063782,0.9123433221063741,0.16950349046821556,0.1234084702424545,0.07432882810915031,0.20427277381588316,0.5913213118982596,0.3163058130122556,0.06260454351221045,0.4716389843698412,0.29363933695254674,0.4079129715075507,0.10006011311520324,0.5143594534717497,0.011627670338075546,0.35612416026586735,0.22240258244096434,0.07571518315234771,0.40343000266112283,0.2072783218883245,0.7306175402030848,0.05453239663556175,0.3561127235970263,0.18038765342873453,0.21414512328958812,0.433402788953257,0.6319201351298669,0.38047152195816336,0.33663327918875496,0.8757739629625836,0.9688650544338984,0.9861796755731855,0.7361699156110184,0.15101212646568296,0.7180300639797637,0.9164837917440742,0.5781353409305028,0.6662630841446129,0.07979985427543035,0.3348326291805297,0.32732830075134256,0.10652732517535912,0.3373342828433348,0.37204407400886885,0.8388678484351375,0.47249814538125623,0.010621749632027333,0.6229798060654883,0.4500702740943707,0.6713541036838242,0.6859534608411504,0.07511706952918362,0.8409058397989733,0.08227303108856465,0.6219391494296482,0.9449404869973888,0.7943501453999586,0.3149973005494482,0.3216942241042542,0.054900751349706844,0.6501682120078212,0.8725007401636262,0.5125596461795501,0.6441023487835624,0.9615190490549288,0.35750999308220566,0.6986693921557388,0.6152307576851992,0.6585239449330771,0.8242383549719292,0.287638895193977,0.01507989046549274,0.36530635636159436,0.6337176223912688,0.028099806528397275,0.7414491180273677,0.003364128141205791,0.7852321268742777,0.4667223587345979,0.2634614595100917,0.877536373696558,0.40173403899716065,0.0826688094618031,0.9396223226365823,0.6370577779817055,0.6641301711670089,0.5224601893168443,0.12201855291765118,0.5851955176689025,0.27275797111143874,0.1383442381161708,0.8450946737847458,0.838975553467679,0.9856775697463078,0.9711404969258586,0.060809226387774196,0.6558866019400285,0.11492891474580058,0.5246930810573449,0.07434595339272887,0.7084868758624547,0.1831510931385818,0.4051076740904038,0.663273993653037,0.3450311674084152,0.9849942916910535,0.7597828435533911,0.10614293825810384,0.06729337960893389,0.5980305327188657,0.21765570068330753,0.6509690994317494,0.3412359836749326,0.5282865252307638,0.04004093407338538,0.017528444885456462,0.9988294056218912,0.5059925988945078,0.6489159944474545,0.07768490733413658,0.31988239900576176,0.4350250318660627,0.1457437722974384,0.23070358410313463,0.2683383069003755,0.00786725448342751,0.5816284045694613,0.9182797864999501,0.6468137674834138,0.46478310067983863,0.9476924385661998,0.52005855860937,0.23619751676656242,0.12878690878871857,0.17196668249154246,0.8275938304988548,0.25976321966987315,0.8352707799633923,0.4401433290287904,0.3616791100101122,0.7690239130267704,0.44022523223011323,0.29064459885321425,0.33084326500896055,0.5482639921825858,0.20042059479172747,0.5267333694742666,0.6120869782012994,0.5490132480976435,0.8121914059830999,0.10423366131104239,0.5771960872237547,0.4628717604196164,0.9102708163010131,0.23775544641312552,0.2735389330797757,0.2848286135620013,0.02783188678030135,0.08656494952507199,0.3541449281031792,0.0912623570401423,0.029672847602312924,0.889298019123913,0.3532997303712653,0.4351681279122277,0.6533432936937154,0.3262138408503259,0.13726587287626213,0.4949594867032361,0.5606559774223874,0.4026732835156719,0.8088638885793422,0.1393654019721906,0.09268064366900375,0.2729075267081227,0.3915761669487452,0.20512114494792577,0.44644099221035005,0.4448558803460789,0.4271390858515982,0.41793923721505966,0.4199755501614346,0.9601387164317929,0.07255464495074171,0.055277536295933904,0.7507121298941852,0.22297009691922964,0.12379807860193859,0.6608882440797377,0.05373644732050753,0.6502200335104633,0.6423411743863023,0.8355231605384872,0.43441032150908865,0.8004014099472248,0.32770265660454934,0.5114375074013904,0.3657134023281068,0.5958730945420845,0.7034373702129404,0.7421059254938589,0.22880486910503417,0.19593224604949966,0.7587648256371458,0.7450297019427772,0.9859117092366467,0.25586091729223703,0.7352529799116279,0.7858383251159771,0.5406351203012247,0.40143835972001596,0.5962314961286155,0.9829650859367878,0.1463282100568688,0.7671330180678013,0.09147165100320409,0.515389770391024,0.4858300289525883,0.3805911178775787,0.5813220297583237,0.5416246020755466,0.9715356480747666,0.19531659515926192,0.4561098996587023,0.680120509818082,0.9246619580445374,0.9584962268954289,0.061667146398141304,0.5284519213955217,0.9681820857893748,0.17463193604308125,0.3501591437278966,0.47192283495039344,0.2869226127169644,0.16497222875051865,0.9779071910174895,0.9859134739329904,0.14404879458343856,0.3039443710007921,0.8737354927632981,0.7580608549997372,0.14150215900212681,0.5002804933877216,0.38663763002292795,0.26926833133381445,0.467631255890659,0.9299434579250416,0.767088827983627,0.8884938232619535,0.39670740166401064,0.7182467887676136,0.017176514089104034,0.5969346158058912,0.7013936605319917,0.40232762062842164,0.24262925343907837,0.04740184546755821,0.685535649126148,0.029621368688518723,0.6278491869840208,0.9530546303783327,0.36788393398878605,0.5953236161720079,0.08515900363380302,0.37127477239543505,0.4310432198478946,0.3465741099130759,0.3512091527009451,0.4873185050139581,0.3318451335609456,0.3392921087478109,0.25226250092557456,0.43685251114243795,0.4782466478367744,0.8974413701889494,0.10717610873269634,0.28406697159407424,0.6405761889256651,0.9929988152601086,0.41554138692950726,0.18034799199449836,0.8783330888575498,0.8064346562864364,0.7184680200351725,0.7672031640519761,0.7451779430855532,0.6981274824920889,0.9861813401206341,0.08379692941474604,0.36619381081245495,0.581258296847583,0.029165963084225366,0.03217363256060968,0.05055141641943184,0.614020687410125,0.2370223671760472,0.08755962829556863,0.8476824674138796,0.1930122563741945,0.846021330339092,0.5876619873186641,0.49196458644278307,0.39196715315186914,0.02359139373906105,0.12559273537779592,0.4571837970374615,0.05105220630525942,0.304705193177939,0.30857612709266347,0.10764007386710595,0.8820604243020715,0.7561942008215672,0.6277124906174374,0.8239526416763518,0.42832031372333645,0.49243387675293215,0.914101406447603,0.016425306775843085,0.4556520519137941,0.8091267173350607,0.22578850915537596,0.555157183897383,0.8693304562630306,0.1666241106185684,0.4805184318539337,0.8215203250520251,0.2025573573042856,0.39838248392751696,0.16569599341859864,0.2309940328035267,0.5858644533222894,0.2633922720144479,0.7512006971271581,0.6730085946372901,0.1928143748059643,0.7701170791123371,0.9100772305451759,0.47709491824787675,0.35526223781014,0.33915328928343214,0.7643764363285022,0.5763768179493565,0.40390049130849115,0.24589753526193991,0.7557740334265812,0.805453523308606,0.6931151285639343,0.7884932743243465,0.07011508159211233,0.6428796706950488,0.3692174387988456,0.4932448998409127,0.11256556522625139,0.43580358285974574,0.7900301812275587,0.11832840746247064,0.9943909504052517,0.4998567077434666,0.08044241016769549,0.8337561195297192,0.9902071965042216,0.44773175866716164,0.5620637243037385,0.33167493047787255,0.1431088390597468,0.20544439080543775,0.16494641237077912,0.8655272115735875,0.39163727439997387,0.4152569281014875,0.6111627460728066,0.4271685038187407,0.3954213142381313,0.5077159954751962,0.5452990722333957,0.1498168488123941,0.15485471127658457,0.9249236044797176,0.9456544062282755,0.659589709238777,0.9956240230354731,0.24824300425689572,0.5546384002911531,0.9653379260762813,0.9458209046238757,0.4631550912269835,0.5732500844030475,0.09291395984681694,0.6999704846308445,0.4377492934995888,0.07246205047793497,0.45173493550416444,0.19169449871686806,0.006063354084035799,0.01713814523658086,0.10865583992700123,0.004622354360810155,0.19970033036201884,0.6007888165837927,0.05439582683642019,0.8737103652746963,0.6195976615758656,0.8732717812251047,0.9721417753377117,0.8937252266237901,0.32404763183885343,0.2356440690164967,0.08492944432945881,0.2341190977187857,0.8465204570856795,0.015091767336475215,0.09255058640192981,0.030646555728788716,0.2799966758804502,0.28414011235030934,0.36168094338384704,0.8943984413448998,0.3955421124393217,0.13409048016506486,0.3657944764002081,0.33362556957918277,0.5294244761058922,0.39773176221349726,0.2808792552139603,0.1685629145213814,0.8890613790329716,0.6996513040153385,0.8662012518270896,0.04388524514002823,0.7637576694734893,0.5133155259377515,0.7803365931270636,0.07585273127428493,0.722530857993193,0.305357817913652,0.3316193828588099,0.6366019825244995,0.8849811695154395,0.46208578322569216,0.07089729653001275,0.6699850288703035,0.013837248236965527,0.9927721656049591,0.7531233609439492,0.5967215969100479,0.8046653612195938,0.9103349927107209,0.31936838569177173,0.7223495642766544,0.3065726758020024,0.9401209500172232,0.9471112637230668,0.07098197085154312,0.08978484325645075,0.5271633404591718,0.7761185996867339,0.6387582880821532,0.9156129819084893,0.19289894770998095,0.1952526691897296,0.7287908457292767,0.22468247064569868,0.5376970583537346,0.01989670994800896,0.4978131267937549,0.8778606847069066,0.6197876977007095,0.19738712088573318,0.8060118646148637,0.884242816417431,0.9786156056025919,0.14322162842907815,0.6895855622140132,0.6667209737412134,0.5729483751623536,0.6694762546627238,0.9522743753071925,0.5950040008557884,0.7934816073192006,0.8153087581858338,0.28089220465111087,0.9144540090886171,0.6757236167920242,0.466289437442593,0.9587377211291037,0.6667791799324512,0.4668375686413475,0.054509620467534825,0.49978489130353654,0.6101593103965262,0.8042383949204799,0.12380641447387752,0.5420679252171856,0.7293539632445118,0.47528123901754804,0.6066021570601134,0.2743674272246297,0.706869110349237,0.7920964334568938,0.5063779225120228,0.917961753475524,0.39768626632121107,0.8562232558472387,0.6262748987262394,0.991573039265949,0.3506119801329193,0.00690326345524972,0.9951919379002534,0.7442823984250437,0.6193508407134507,0.09483014172805726,0.39774525321122534,0.4722105061689079,0.990230867749557,0.21187881127398867,0.3006980723731596,0.6377385611150979,0.1276017967488623,0.17263366209894682,0.19455581315545678,0.38160231482487794,0.39698990636531484,0.3768496041624587,0.02004252800250561,0.9138485011465334,0.8129285754125612,0.08950668299352516,0.15206656890338377,0.32113805395457784,0.8563298651567186,0.2156663191415844,0.37972252139543183,0.052233616793785353,0.9137753328059603,0.44706444062687356,0.7919751085631006,0.18486387589057296,0.656820103002089,0.9551007709102921,0.7929749582627148,0.5093980413288255,0.5967355934602494,0.2911592566074632,0.9000266212953265,0.7796683506367363,0.4687588145247634,0.49445333872621156,0.028987477434193165,0.41143998895889133,0.3329488099470248,0.7479351154476859,0.5794189338983888,0.8879926515623726,0.8403354554990194,0.6640238816379751,0.5938929982364025,0.2633607471741648,0.9877144811435079,0.8574457507013995,0.9842541203873667,0.7124721034494881,0.2618475212171427,0.6154819779919909,0.7846323459014806,0.6635150989321381,0.7950651047410344,0.969910998790203,0.04359431530617752,0.880441583167703,0.9144031565320971,0.6214549227060258,0.21087535689815295,0.5309263300121385,0.8229191335425963,0.6368877613456576,0.8315877153336535,0.879603089613584,0.4220735491806038,0.8347152662389559,0.4500610669134961,0.0029875671541954585,0.21728240451393876,0.06664390424406652,0.10193436171695991,0.08845356233940649,0.3420318066357897,0.741078193257144,0.23358506662071243,0.6595544829526538,0.473052847470661,0.18551759588431316,0.9104178816996649,0.21710843604515428,0.28717704819574874,0.43065100343188845,0.7923862096366903,0.9883361426588946,0.12940536575920514,0.8350300789371579,0.1254313125938662,0.9082793542071566,0.29941551997566496,0.4524421031151067,0.7371665175402258,0.6257082106413163,0.6066425392695123,0.7154693796659406,0.5429301464925349,0.6688664947529994,0.25344217852584494,0.5144171037562875,0.6231529446783621,0.3709137064898218,0.672894525752531,0.8275186629671265,0.811770965287814,0.9110893050841498,0.07864014795879282,0.44758104783632,0.4193626679924525,0.14315153097299937,0.4172718608551915,0.427119673077748,0.9089326087259659,0.2450660948568968,0.010702878322169429,0.9556520733885281,0.12038998946084467,0.5601991064854126,0.16451545620961272,0.899604203633519,0.45528711261697863,0.30547107189688294,0.7332950993326601,0.5998642701260481,0.6101598032614881,0.8066179392940889,0.557812683615013,0.8065650080607998,0.43421754457526585,0.7242261036853588,0.02356913228970381,0.09610186837882972,0.21385147460222464,0.5618691831848932,0.6736240917150536,0.7508222918534175,0.6396903533263947,0.652251083216425,0.5765043986594021,0.9401832306674651,0.37291230090074556,0.31579884367637967,0.42555271915097315,0.9886559085813413,0.12090482660842583,0.31699352059680996,0.9795242461628157,0.5280207930195577,0.4024773901408798,0.8737821750500006,0.7277267224553758,0.04500144219368307,0.663018781442869,0.9602799766745922,0.5545704325227727,0.10876219904871354,0.7696778056929925,0.016685965593208563,0.6197466006894949,0.0035623206329225,0.5199363390671894,0.5619644255588261,0.7683193020567305,0.636038801462675,0.853634779270602,0.11966846942517573,0.5841413697950975,0.43066396401878126,0.3001794526123762,0.11021831064004539,0.4227866816166945,0.24919593620112268,0.08231314108646437,0.637691467107095,0.8703050701109594,0.1379140705227042,0.19805801889196673,0.5294646436153843,0.1984080018954717,0.6841026420900012,0.6728066537884569,0.18113501018668687,0.08391211402358101,0.3323545218390951,0.46264224284012534,0.904688833629099,0.7069820006281493,0.4706441992406565,0.9829690585332937,0.9428362988276227,0.9800808488991379,0.4951135350185374,0.7195719334192305,0.9374688210216675,0.6684315104406391,0.32435570789018286,0.31883590505591264,0.230873179731649,0.5955668122287976,0.6007300824869839,0.4224895397640278,0.2963780874451476,0.6531864706767541,0.18489782114901177,0.8218305236370222,0.33658705397688493,0.6724485946637935,0.6477443177440285,0.6615497575981797,0.2823941843063764,0.7916466080926003,0.4927595029293079,0.016742708040878407,0.17190343419156662,0.2136845284316442,0.6101672064922601,0.9079361900186125,0.8544994557501555,0.8807852405460384,0.49698886524547903,0.743637460161163,0.6230951092196957,0.521296338324649,0.6150160717240376,0.5666579960030049,0.7508315750510757,0.5444595756011386,0.9627663928456571,0.07067247710974112,0.010399738234962763,0.8427354324572709,0.18082420391798437,0.816485003923267,0.3965359543533322,0.036237167927837044,0.9088040852729036,0.8973635387425878,0.6838198174303076,0.8152637616117708,0.9897458489345072,0.4643296605535778,0.45122149264184097,0.7542309421345372,0.7172075456942713,0.3901626702541645,0.14655551503576603,0.6325627835229397,0.25805876476104483,0.6216750481067055,0.4842115387077017,0.15089637234017106,0.7670676434053751,0.8295437727597064,0.3752543395040604,0.4124698582462265,0.5842530969741286,0.2654073299742723,0.915705204764564,0.1500336819966206,0.6960808760343282,0.8198242537944196,0.25021324852872073,0.9987101825496829,0.48314111386645986,0.38973736431028594,0.830261185403204,0.6991200558304722,0.8537344368537065,0.7054974149955808,0.020347646755431104,0.3970051829388386,0.4285064299869552,0.7157530082900359,0.09578077984778655,0.554785470986179,0.9422448169809918,0.8494238744673301,0.34281675734038664,0.7197274039308978,0.16278571367297112,0.6841666227363603,0.7300449762568373,0.11232102129440369,0.08415738928789951,0.43471659286505826,0.5321051514660791,0.3867889144737733,0.7964798364056529,0.8044986664525611,0.9205800391052237,0.09921888761970354,0.408643659189313,0.7874623801843457,0.8350880231011528,0.4466424718227009,0.6738317460425753,0.532659875320852,0.14324098903760607,0.10101491702301102,0.24718430052062468,0.4119644299367935,0.13324055864218143,0.9936516363481134,0.05810560701073775,0.7934154471632324,0.29603266771256687,0.4021359864980276,0.009914824630149255,0.7700816048572392,0.4279698641509442,0.4176267987040998,0.5557462055380546,0.2611618515874983,0.9030935043853165,0.8804988372399747,0.1562022774286509,0.07341179219328264,0.2373287951264007,0.4621245752470031,0.09939015710925991,0.33665677094536917,0.9898814096206014,0.7080858918385036,0.9854096850867906,0.869157640017657,0.3528875975067909,0.7608473691019937,0.5508098455405015,0.210797763599885,0.7111963275361823,0.9425538053401472,0.041444236484108776,0.9597400510649179,0.6067181277229072,0.8448790976638958,0.7429088586011563,0.08922902695558599,0.15587418134313502,0.5241198673804612,0.012492635439018462,0.5642931238398945,0.4331741805842979,0.5916889277718043,0.5886113577060137,0.13296690819216672,0.7540551696028681,0.02437733291263977,0.31574407103083324,0.8557740262135947,0.36680323907682055,0.7094980646355062,0.5368217578015835,0.7785447511184203,0.43080251214843623,0.6059955858961343,0.24500001103675095,0.7519406262870485,0.7414133979951862,0.888270060870286,0.4514684793173196,0.3957038470576171,0.4627086919280323,0.005571675350959815,0.4051476229303057,0.5336343222060493,0.7215874586192814,0.33842887560813284,0.031079306469150803,0.689479962203027,0.14845427100504915,0.9367050780970945,0.8310768219395388,0.1164781130732706,0.6085703632487736,0.7557243700219141,0.41721530098380977,0.7044204035674329,0.0872702993299086,0.4061504688612587,0.2301002786849653,0.30477153295499404,0.5365312301588527,0.3262773368125922,0.3938222408018561,0.017681157520819113,0.3559191499113761,0.7750058090861027,0.75171880279096,0.9192983536351025,0.7281156524857486,0.7927013629454296,0.8344719271536791,0.14332648117653468,0.6753025786440372,0.7930348834578844,0.2035583162546002,0.5067064500631762,0.255072654442265,0.17318504890855135,0.5294973792095876,0.007727964686490507,0.5980099076039516,0.3835248060063843,0.8108022747286128,0.28949483375981533,0.668286805763249,0.11480330966818597,0.7934776409633932,0.10506266943927245,0.1820064264945107,0.9094153978260588,0.3077015462485946,0.07235971070903391]}
},{}],104:[function(require,module,exports){
module.exports={"expected":[0.013108453437912412,0.0004535580392393318,0.06978255978619193,0.00017608810501426792,4.72749254976832e-35,0.026921809805709983,2.3113696496331638e-5,0.2454864505150633,0.00012960715722722856,0.013772135889811498,0.019793341405789443,8.465207896216785e-8,3.5031956913758323e-11,0.01756519173941169,0.012221193729351544,0.01682993280640924,0.0010931236504011306,3.588310770406342e-5,0.0038325486285604093,0.09442510896071667,0.02527178165912711,0.18005650617918068,0.04898814157466194,0.0001039333933518511,0.0003475316176011988,0.008130401110666072,0.09610756248910131,0.0004084243681158191,0.1988472651873044,3.648471090349365e-9,0.032989877276971,4.456805817238863e-14,8.802827900539713e-10,0.2966030484933257,1.1117707518503639e-6,0.003253106836624697,0.1336721196076221,0.05927268534573017,0.01833635281418343,0.0003079104673902139,0.03327014064761573,0.05450231718829506,0.0339416994241635,0.0914532631877255,0.00997595250953746,0.06435993398916963,0.021161004014180737,0.02393454952476927,0.0012950583229355867,1.2165472922814055e-106,0.01403382581102372,0.21268863933837903,0.004070643327853279,0.03367841386975375,0.014950876265741726,1.7062831493676297e-10,2.7673342595383445e-9,0.0040106625745162374,0.039180703087774174,0.05015569792598259,0.004612654985869448,0.0001259786084771941,0.030844863774058057,0.0001822015649287709,5.632612371518082e-22,0.0013313401896887025,0.13286515488627376,0.0031354642446202283,3.2084025226761603e-9,0.004808985136486235,0.10934966875215359,0.011734459250495995,0.1513893378576074,6.239379597120331e-7,0.002150640073333389,5.244685798348554e-6,0.13007378181664786,0.04452352850505062,3.317188275539745e-11,1.3177326433886869e-12,0.0038768157886577828,0.054629497266222515,0.0008581280608055661,0.012471333010618169,9.347532944269055e-7,0.029504343476257067,5.5824486076475945e-8,0.00472233613797816,0.03831079442580608,0.00011244362971481395,1.5683427664037733e-18,0.0003821541852937233,0.033754678578032556,0.07774885031196864,3.383621926913427e-5,0.15371113929232771,0.060400896444455156,0.042728860908740174,0.0023766861366753596,0.04335755293732907,0.026515744534864175,0.05937467595991804,0.006747994015930477,0.13430445501897245,4.40786272792389e-5,0.03699992687342174,8.738310688170015e-16,0.09463539383340241,0.039516921312148914,0.07553674101705336,0.00030256113368964927,0.03770554325854985,0.050962071042173346,0.12235668371824644,0.1533902418172423,0.06484442637596319,0.020927511834394927,0.001161267554178093,0.006267513067562177,0.1698270488929572,5.584382805297182e-56,1.7940675926576005e-20,2.5249181982517592e-5,0.00015984522564033447,1.188701741901376e-10,9.684622366450243e-9,0.002085432918581585,0.3220728108312487,4.588177521250979e-11,0.16254651823956834,0.08475233850370101,0.058687782669027286,2.91054321345324e-5,0.10110237630821244,0.020824911143804616,7.2243526387979215e-19,0.00924062402528099,0.0020204893110643174,1.2386641448424636e-111,0.0035520230837013667,0.03623749773898865,8.47041807858821e-8,0.0040248259309542764,0.007631169942467409,0.00026830090561923554,0.0024423151123159565,1.4199543500589274e-6,1.800756906083142e-5,1.215559055300356e-90,3.930416043344222e-8,6.153147286055429e-22,3.91986394895446e-13,0.3869834167758919,0.04688762084703001,0.03885799551367383,0.008199656394966068,0.00014477897471716178,0.06350504681328081,9.657686731332093e-17,0.029345915384798187,4.5567017876864315e-5,0.038467554831874466,0.002233391794489192,0.0021707198846649435,0.025040394929309116,1.348747789412189e-13,0.005673626121088848,0.11530879413932674,0.12433217865900296,0.30251792407606143,0.0033844036873798278,0.01695988306284854,9.102638211744244e-22,6.697431266771271e-5,0.004591693267215402,0.09507989623608387,8.043877312315359e-9,0.008320245913873522,0.0071966870982074944,0.0014247669818727806,0.00935485728113695,0.0004335335445628802,0.039795028758206175,1.0091805205562631e-9,0.0035933919036676377,0.013695193594930013,0.10211521739481477,0.0002724002723361098,7.25865409181425e-6,0.09810490630945093,0.007107598563510975,1.660996679002261e-5,0.029453642833027285,0.10288753128697886,1.6489744052338186e-5,0.21746451698575683,0.017699500227926927,0.09493536885686789,0.023864098035710928,0.015586699486650256,0.04908107603506856,0.07342611918894304,0.1307822719702967,0.001478137703767954,5.375072866652026e-15,0.2519908131186606,1.7318849884950514e-17,8.749160819652438e-7,1.4290953359851602e-6,0.09086861785186795,1.4920651120386864e-12,2.105032372945971e-6,3.231657888024967e-5,0.020813837882102726,1.0551448819863705e-5,0.008407883585470581,0.0627879759873905,0.05347048806077151,0.12964333906477718,4.2048862091855965e-21,0.0036357553472067083,4.277272778664197e-36,0.015379784050927433,0.005325716932662022,0.08352881856672245,3.097789439505402e-23,0.017223313138544256,0.00044906049770237317,9.401770766670131e-5,0.03085632819505947,0.015428531690150326,0.0092545970707239,0.05594750922144945,0.0007334616953780782,0.26464667730488367,0.03892013982940151,2.098326062638004e-12,0.05037321891590163,0.011580268165679718,0.008451320004933215,1.0079677990036944e-5,5.112220694503446e-18,0.06946863644261819,0.19998733161241278,0.0252930879703372,0.2262197548858476,0.008864863776860823,0.08307217275016024,0.020152132209269705,0.012222352562763964,0.05385648171686054,0.00986012437705788,0.04712510614719582,0.05822533089629278,0.04334860674525641,0.06284276125535351,8.989893583339576e-5,1.7472961453011837e-9,0.025185553491224352,0.01221582190173877,1.6653003617905844e-12,6.4001272614533376e-6,0.0005455053520575614,0.017000084306178057,0.005626383482418697,0.00815531864313648,0.0008712889921003535,0.005656883269443842,3.698328491595037e-12,0.16246418147913505,0.0230767509306019,0.025646814268483857,0.059598048526252306,0.0018563863966561142,0.04098493418315961,0.028697332511206312,0.012902830990061395,0.03216654305494634,0.26983514764592836,0.08520978006171896,0.04863390729044756,2.28190553780101e-5,0.06491540450589144,0.0008136425383989856,0.037418205240196165,0.00544667929991546,0.055759683201983504,0.001219424468768868,6.07014672668653e-10,0.050713710861328254,0.009539808397079042,0.010802132556169328,0.023053253934099235,0.03386093185495277,5.1438678796778915e-5,0.010825360280377477,0.2606095438944476,0.05689839269011521,0.0010979240196485433,0.005118148046266341,0.03127182350032336,0.11080717822739673,2.638481397709704e-9,0.008430323214253342,0.09151763813634782,0.07262011325741954,0.15791114057303757,3.297100472780692e-5,0.03561555571764373,0.01049392543374993,0.0008055724158184247,1.2100285166981868e-6,0.012847047661208675,0.05682292149440258,3.732040527276354e-8,0.0035347555213820713,0.03550109455290749,0.19045862724651844,0.07051621417191278,0.021523229803130685,0.019038143880599986,0.0030989805173427002,0.01083881034501074,3.236264679832518e-14,0.01183972428371155,4.553714163927245e-5,0.003830597113583515,0.005057893885557028,1.0414921380635744e-7,0.008761403523147679,0.011213276284557152,0.050667038297606125,0.06633153835264191,0.00019824447484522432,0.020290222449865614,4.759926575742446e-12,6.10411503766928e-7,0.06553772168899576,5.9658047787546155e-9,0.0032367939737350518,0.014474412902614444,0.027136247778235652,3.785674393560223e-5,6.19785676482804e-5,0.39458121249825673,0.000455360767714367,1.2513520296394317e-5,0.00013759782535595442,0.0008406788029150928,0.0011746903941148986,1.610505068899498e-7,0.13682921240204024,0.03896737884533009,0.0020406301044265307,3.483861632411868e-5,0.13747033503776773,0.0013858243705514811,0.0041931265734391435,1.4060980093107469e-8,0.052676315591612496,0.03396474101056198,0.010422626421260486,0.048589603768261075,0.023599508255674577,0.0865799603482598,2.6856670060079106e-5,0.028738545900432986,2.0267477859472177e-8,0.009616859803474051,0.0018345798650279462,0.018899305962806326,0.019446436200363567,0.03825612022238523,0.030166574134795714,2.4623216854579888e-5,3.685779813818873e-33,0.001052190197386377,0.021372606550309006,1.373041064394079e-27,0.08842255964700516,1.6793009166523355e-69,0.042155809453395074,0.07591396453830129,0.01910885290389642,0.06249809852390863,0.00020131590612636676,5.985464412654704e-5,1.537151372443584e-8,0.0395604184217844,0.06377511866069357,1.2007785475899495e-9,0.002923519856842377,0.0166437832924148,0.038010626099168415,0.10927433171213186,0.001501558105157739,5.322029380750588e-7,0.00017402843487666718,0.0006962979416891616,1.914273427396789e-12,0.0025038471582143505,0.005416547208561204,6.071019971708624e-5,9.133881921511838e-11,1.455510053206831e-9,0.03509620285361894,0.025446437514566187,0.01399675996730605,0.3269436342296165,0.037314498431239115,6.597606608486808e-6,0.24863312749473432,0.019666951035363422,2.9952106187305647e-9,0.2409749125145865,1.7830610310268505e-7,3.6697268348473674e-9,0.002288960132595555,0.0007971623368414103,0.0004165781240445755,0.13568191697355428,1.8344081363029923e-7,6.0542203836519755e-15,0.0001462221379430064,0.0018642227937827709,3.336502064797892e-60,0.03851234020488465,0.17906173316660484,0.004634824683911213,3.0961753649491666e-22,0.030890754892114347,0.021589986536773728,1.1951377806790624e-14,0.0004663906004992128,0.0002585673847933958,8.141100628534651e-8,0.04082598874674041,0.02246262903530343,0.007080413138155818,0.09793219418941587,6.8700456591774365e-6,0.35142443952389035,0.014981960757847183,0.020815230024129966,0.012451200688715858,0.02186547140272144,0.0013081036061739658,4.6252183803872924e-8,0.03784526553679577,0.0006832815638531987,0.011513451758327083,0.0137279749490797,0.03614838840590895,0.015933941028908674,0.04574905469730736,0.07866173616176705,0.1771977732547339,0.04335831374689564,0.014882676658584011,0.0003136369955682766,0.003581244819070572,0.06261238614823826,0.20319253816719568,4.463741282558197e-16,7.089325279194383e-38,8.630916354691411e-7,0.06663733788766261,2.200373808161087e-5,1.642747608529254e-8,1.3261478074444e-7,1.141015095764477e-40,0.09516137548352646,0.0003015919880504828,3.239833760210437e-166,0.004312337221755469,0.0007464562432762511,0.029499138990032054,0.00550464013260259,5.351164597323335e-5,0.01218249075086135,0.001095221936509502,0.012998128693079977,0.010886416457926647,0.06514566675545333,3.861265132165289e-9,0.0037999923149386896,0.005702824007908477,0.0024171206000109047,0.029405727101156475,0.04101674923371594,4.49058081513307e-8,0.0018897503599026367,0.01553673821088803,0.03587386485552805,0.03164534544756033,0.1449262141879607,0.0017282059030880705,1.1028264655610885e-5,0.00900885313930721,0.004276978533768965,0.007983289291223956,0.0068362869300433145,0.004816151362844931,0.1525331701491431,0.03177301085916398,1.3910754952205328e-5,0.001650397709207847,0.0017295298645267011,0.007402240416118544,2.013038341219667e-18,0.0658354629333545,0.03207859004095027,0.04173374296222662,9.603231518654457e-5,7.284041409611905e-5,0.04302954911387763,0.05480285516596672,0.002797912200584652,0.00037197817265431106,0.01044809757086771,0.022719046698336194,0.08631979728254369,0.0222974385831849,2.9861492600333837e-6,0.3208960797646859,0.050334067436664146,0.26097743780989097,1.2645488777945053e-7,0.14099366378568062,0.13527576975422356,0.004245171769408129,0.04005237173725633,0.15842315851955205,0.00022677417211894047,0.1416587766820474,0.014475649232382513,6.326288728547777e-224,0.00267531128361872,5.2922015978292015e-8,0.021794818841738738,3.8718323514320906e-7,0.08535312940103934,0.23916510223397197,0.007573346056922396,0.21845542077586627,0.0036918558366115456,0.02385194311073281,0.019039553098328475,0.09726413700734746,1.1881752184828094e-5,7.743454081258436e-75,7.539555419385593e-6,0.022330807720875416,2.337776162425693e-8,0.010766479858697789,0.02891619774115918,0.0150786539604039,0.02428725009169163,0.030225429864014497,0.012874561572059958,0.00047849357445738935,0.0014334494769540546,0.013071729894766942,2.9313112656754944e-7,0.0032837548771507373,1.3181171224716443e-7,0.004646759740707072,0.0015435433812858324,0.030399175417970846,3.4342024063755785e-7,0.05241991958875748,0.00021799683941405094,0.01231826486214098,0.014901212851066374,0.27183077015060886,0.1415615892192443,5.60671313663038e-5,0.007363343843664664,0.058455953011315925,0.21085516391240816,0.11501018314286166,6.639366615309392e-6,2.742537243513005e-9,0.03900318897317412,0.00014883661205201447,0.21073252689905003,0.0718122275712268,0.08755650807901723,0.051120596708660655,0.0019835729122240887,0.05570648689792608,0.025873754814482595,0.006854342047143862,0.053574235620075086,0.1341076497308893,0.005350448457777935,0.000594460352123325,0.12516755605118643,0.15321419123918012,0.045201721373363285,0.010551485764089638,0.039626926565141295,0.0006199257716403778,0.00015258187749765887,0.06759693202571078,0.0039010756915915648,0.01774295687807053,0.02676709247490029,0.04639813089157381,0.2555359048407272,6.809189882312064e-5,4.3747366397239294e-8,0.04550226877834726,4.754271886804588e-12,0.016537540801642516,0.02400097766644828,0.0002588693368632749,0.011355518712417252,0.0019158649738463564,8.923496599546929e-63,0.0015137876426505096,0.006520142938736611,0.0016574521417372485,5.374576571788161e-5,0.028643910145824857,0.0003935412135036699,0.05436123074905248,0.07492220072736128,0.028097380543648836,0.10273861279239362,0.0011408924483539947,1.7943486548533501e-12,0.052298505317693776,0.006053415690552725,5.189761877897884e-16,0.000622283020722725,0.028284380875558988,0.000818254198623376,0.015297035619484218,0.35764109765032936,0.0023915196610159546,0.0032876170774200097,0.0038594777176407425,6.990981013191192e-7,0.005611189491821946,0.008934322073815431,0.023212937775058905,0.034452627613742,0.048584650882281144,0.16954738184616897,0.13882275329802268,5.2118848157976455e-6,0.058190936608606456,0.05045947005348245,0.010259450469488542,0.0011878106171587471,0.17380581835816616,0.0009568332002461981,1.4658479001875023e-82,0.0010990452834704078,0.0015506380776234535,0.07756240202715316,0.019387749162192467,0.04671692615850538,5.273317697062812e-7,3.167296585071304e-5,0.031482309785103836,0.005872519613237461,0.08954353074904685,0.0001574872946599618,0.00027334389603663107,1.7603631267266336e-8,0.07693948028723087,0.024560378513925042,2.4874892012759835e-8,0.007577603633777777,5.4241191393955034e-9,0.000622760446508102,5.3043545734485925e-8,0.00046601260251387546,0.0008365291303472918,0.002189269095465053,2.115300765318352e-5,0.0032201020506595064,0.0003923006087625092,0.010298199766174469,0.0494029253632007,0.00045542245123578114,0.08698644567794059,0.0002812895168270163,0.00047315697280202645,0.013415222480161715,6.181022406687559e-7,0.05202913229577652,0.017658664900046857,0.026269239604388834,0.0007879621788840156,0.02499173035712084,0.004324275568111504,0.011312597638858939,0.02827396054953944,0.007269136295501202,0.0010514731520185185,0.014533358385714155,0.015680229539841044,0.00011257001285590238,0.004169327654680784,0.15971674452874265,0.23388462327407616,0.0026442502174490764,9.911601279244015e-5,0.012032268299998053,2.1882802193409007e-19,0.05324237064844367,0.009600934687366159,0.0031357715595577615,0.026231235636802092,0.06007576112544307,0.01139298739992201,5.0314567399575186e-129,5.812930352543291e-8,0.1740964609435017,3.055197132121683e-26,0.16826926751384055,0.008427738114329246,0.005743177688950324,0.009314443999538733,0.06864430583782985,1.3230000480388387e-7,0.021829053991193496,0.004707655526957157,0.1081242751301858,0.002620383951373948,0.21052072979344227,6.803418750209005e-5,0.0004482343771671414,0.051720524750991405,0.062133725799566636,1.022647925753296e-12,0.248484931286244,0.02282916969733416,0.03247909976151055,0.006763355810948512,0.009789964156272882,0.07450089542848658,2.9610057237789452e-5,0.017572995216864888,2.765018539014843e-16,0.11880742242389372,1.7411667499495538e-44,0.08766784007166965,0.03369503858526846,0.024965734956503047,0.022190144526092092,1.0661108609599946e-6,5.562034223444716e-7,0.02785948582743448,0.0009204863770538932,0.024213071165106965,0.027258445723523775,0.010000411405985486,3.928308273076076e-9,0.0020137441955897805,0.12782022706622603,1.483911891178202e-15,0.0007747330942940117,0.18943244377531235,0.0705842115469912,0.0420669343730456,0.000550168737321776,0.00019475947189470208,0.002327452543407696,0.027067111639315772,0.06575066447514538,0.014695719216383497,0.01661992226827481,0.1558026938900863,3.181690033941193e-17,0.061250843767327055,0.05084604685842786,0.0030740965663169344,0.018254307214070908,0.005935367483922854,7.493169737719204e-5,1.5491746578904027e-17,9.628631722477594e-23,0.004081422461751615,0.0022996474271733416,0.3813123859265628,0.019726894373894945,5.043091851542359e-19,0.00476399794074888,0.3416649327810236,0.04930659539800225,1.6719968206023283e-23,0.00020425593748896707,2.501769888719499e-7,0.001080636713191722,2.952431169719882e-20,0.01972602955433344,3.621765699057092e-11,5.040028965747753e-7,0.02796515674966661,0.09658440668049126,0.02772295381418466,0.09858486575990108,0.0014133963227168167,0.025352774719643714,0.1515986199493178,0.026209824742854323,0.0017780195807838106,0.28489960307188306,0.030427109350289958,0.00882765581906971,6.042444404705456e-34,1.9441207887234167e-6,0.021005823910317436,0.0005797337498865463,0.0038044423707595796,0.08370438469745502,0.02337174479934506,0.028586297825997198,5.315160779777609e-12,0.01892242979119723,3.336621661403156e-11,0.00024958727845290083,2.4430530635670835e-6,0.005013152480796519,0.013455563444100467,0.11115416682382039,0.010845710010066848,0.01294452502598559,1.1486579477954177e-7,0.0011919900318375378,1.5863712985289232e-35,0.023995497696960404,0.0006825676823144422,0.05197824569732548,1.0980508423469503e-5,1.4006407931108329e-5,0.008620771309301105,0.001426998243220095,0.00037117946105010274,0.03944317367999899,0.07883262028969316,0.004112251670290831,1.1968407396757405e-7,0.26512872668790516,4.362900707304483e-5,0.09894109518687715,0.0015396941035039375,0.0002012504274922218,0.33793970288350506,9.367428723518886e-25,0.021271132596679787,3.463224232060906e-5,1.6778658264675598e-6,0.025393055615795707,1.0495364528616309e-6,5.8260653165381205e-5,0.09131761524917026,0.12095861881287581,0.06547847106998582,0.0012507963224129522,0.015022576083896217,0.040431473146291,2.092547216236589e-10,0.0018281308680945282,0.18505408482823754,6.036788768164716e-7,0.00015060407062260055,3.003255742781422e-13,2.000317298682609e-9,0.05050696228952049,0.00036452123450477777,0.12145773631423856,0.01382595207351176,0.06425769563605925,0.001874465383022625,1.6456900115133686e-7,4.352782251918766e-15,0.24162417860260227,0.0313477159413484,0.0762420410703304,0.00011256739174721656,1.344214781207726e-5,0.020333394604511237,0.005283222958803661,0.001085355034556216,9.236390849337536e-16,0.00721110211995641,0.004406283927932314,0.05745186309328016,0.02559809672002669,0.032054672494617055,0.19352287700018544,2.8377946739193473e-5,0.05891710131380971,0.21303395154292767,0.014482347714410633,0.06952069028616513,1.6818911483689053e-10,1.5795610434782652e-6,0.014435065307258849,0.014861518363753158,0.00051718138897747,0.016295697673599365,0.0001598918092294409,0.040196881031369605,0.022572669924567433,6.642865048796727e-29,0.014480232347890162,0.03841845894275718,0.3095052875021773,0.005087589285046072,1.0611027213789087e-7,0.17127245498266755,0.06663221151512702,0.062352799044831785,0.014541294192285373,6.96669507347382e-7,0.009244122013834195,0.09998441391742866,0.044290258524285066,0.015224795566888391,0.0004396217832121858,0.0018876126673748569,0.10342100269178829,1.9138007010721622e-6,0.2270403612553455,0.003935659012908245,0.03115010073917207,0.13236992425294222,6.723156433041375e-9,2.544093850584199e-6,0.00021252674825281162,0.0027960370753931218,0.0002398190501698639,0.038619168799649314,2.7757410947516594e-7,0.12198523463393926,2.7624774935643457e-13,9.591819170223528e-5,0.07157379911185083,0.015611797907272842,0.0011000486413890213,0.007399593741508082,0.0010784996663233757,0.027611979300402753,0.024034431744062345,0.04756601968735113,0.0011793818553408417,0.09903737182166955,0.0480604507436683,0.09369755513396251,1.7116514992644777e-100,0.01723116311147634,0.0004243496674404942,0.03366265362762527,0.0019558862205884893,0.10514835850561234,0.02660884712451146,0.0642608565790953,0.02976461076146623,0.011333598894339263,0.06545540132795417,0.05299299252402566,0.036138458622103416,3.078641564959393e-93,0.0003960748421763654,0.015639345581577053,2.3183470001439328e-8,1.0426544450611719e-12,0.0013611762655788427,0.029613427279470684,5.175254821430513e-6,2.025354595085678e-5,0.037377757521809926,0.0001193221190877364,0.007449345910771582,0.00046746665836140065,2.8437195806837093e-5,0.0035697210938381804,4.5114336510035676e-10,0.0002471524331312596,0.007403681613611599,0.05259098248791304,0.002720219239132889,0.03727687437668487,0.06462804742195828,0.09312438082411625,0.11393860339184972,0.037292737437751494,2.6943165509557734e-8,6.156809754962444e-5,0.10986510647061414,0.08295906451195531,5.756619666384946e-5,0.0036540754476370205,0.03810503212870682],"x":[-15.35501944867135,-16.925846419142157,-11.335089600966768,-13.55331100270335,-15.449462262113286,-11.867725272628682,-12.748564872426584,-12.095057827627507,-15.565440107355204,-19.796407347887065,-12.922180772746382,-18.6194543980767,-15.708588426086314,-12.81816186244476,-16.31961516443888,-16.590376775125065,-12.336713310394764,-10.009067441851947,-12.710416366525479,-15.036726273683826,-15.17499465730122,-12.500187666466553,-11.102198793845048,-16.78943675527356,-17.619312562983097,-14.340350591347477,-13.883207331546544,-15.060763295272,-10.523003351266274,-18.8725666865726,-16.86148232089268,-19.914259730708,-14.203438800890238,-10.932291681495396,-13.947362175769518,-16.963461576741963,-14.071704862114142,-15.319319147771083,-18.934047139831186,-14.540713519693844,-10.585349110087227,-11.179764120809082,-15.413643938926771,-15.97830595884126,-12.717162109476485,-14.414637463179272,-16.910235594851535,-19.340510393432172,-14.763840049581102,-18.850490595199844,-19.714314415912412,-10.632940893671506,-14.370794710005283,-17.977576884323835,-16.399305418865588,-16.99630301432244,-15.91511020448553,-14.605439022610984,-14.26442913733754,-16.494806517119997,-14.764346157905306,-11.829516926129575,-15.60713329703707,-19.23627450348532,-18.78203666152092,-16.66803362897739,-10.397132573211232,-13.398950933519597,-16.423466819056063,-10.821136729450728,-12.52551952964241,-10.215965745597986,-13.258168320924126,-18.001121151221582,-11.907797627062664,-17.73576550164611,-10.663718078399736,-12.277921729853485,-13.31482675381151,-14.176311110884054,-11.227612854507207,-15.027344773557239,-17.468119170716893,-18.507138874722074,-17.753529706295716,-19.478735928537876,-19.908620433205503,-16.159794416365926,-17.492957300473844,-19.929402341780072,-16.004020877587276,-17.905222051908403,-11.066901018689808,-17.458091017349883,-14.661074990106776,-13.114449116061838,-11.475472707482089,-10.021547947750854,-14.943039097898353,-18.079130038857397,-13.03448634264819,-14.878026282287076,-18.314678740626846,-12.535235496271165,-14.949180135917679,-16.330274559059006,-19.879433751594785,-13.408620579622536,-19.875471767041105,-13.217441440031163,-10.547082221698801,-12.924657988839797,-15.728175508989343,-10.669709442954183,-11.17960637597728,-17.787966092437422,-10.871763235208519,-19.584787772180995,-15.333003678891497,-10.871375579959404,-19.412320514819406,-17.082144129723,-17.409310321663966,-16.742986347449285,-19.23604487678203,-12.696632946731798,-17.285180051622074,-11.073876194070952,-11.843544379458365,-11.07856230690538,-15.872832833361024,-12.026061494003741,-14.349468188423721,-13.065224205243215,-17.506161292987194,-16.284414967001858,-13.880370981460512,-16.372320727895488,-19.09780745470022,-15.424414132143845,-11.942445615132202,-19.978117793842458,-16.773956386223862,-17.416899934487205,-17.965517339316087,-13.629643558779721,-17.936550783848908,-18.352289474992418,-17.55193029361394,-15.48016611083024,-19.547148484286524,-16.697361136866647,-10.35940324691169,-12.701075407969695,-12.578730807118166,-17.11705935915635,-10.082236205300326,-13.267705462095156,-18.610175383475582,-15.862212494233578,-16.78502417005213,-12.072679846125805,-16.429313981223824,-16.115767525250973,-15.919407988721057,-19.324246172645317,-19.922857787234854,-10.767677100257352,-13.486551629016361,-10.59843198435382,-16.37653853802916,-18.057328118183765,-16.88652282065135,-14.836597214162008,-12.291876888606275,-12.470254506058895,-18.803958144524373,-14.214274461021875,-15.040331201514803,-17.43965144314298,-19.926562432627797,-11.741219474832935,-13.065379284842392,-12.00570144396865,-13.053408876468735,-13.390013241601652,-10.743034694461306,-18.612781579841744,-18.042280293945364,-10.00366597388269,-18.997351001543873,-13.688015983051836,-15.32786583451337,-13.061194155331737,-19.874135706324406,-11.902302073572022,-12.961355172366575,-13.916654021822445,-19.284818430476825,-11.812119389807417,-10.550556377469668,-10.778532888795816,-14.20349263014437,-13.354885710740046,-15.594844559477671,-12.877781873696199,-14.922651263356528,-11.002732944545691,-14.9595631614386,-14.779714356969265,-11.075594250364386,-16.470310287127813,-19.25001677204871,-19.305724353583148,-11.218000220249829,-14.164583515976867,-12.526276185975524,-11.372451123309915,-11.974945831212242,-14.958074251963232,-15.023587083876961,-16.62052436270422,-17.240005644865853,-14.0829478750476,-10.105519312007909,-16.12127810831526,-17.842565100123736,-13.639022694646833,-10.513192580600073,-14.56794659244764,-10.441590733764208,-13.666352230887588,-10.77570991289864,-13.467354240438246,-10.071896128311273,-18.252959466720608,-13.46997987791621,-11.369784819116015,-17.673171709890802,-13.061902429684636,-19.25962748204608,-18.665797905454646,-14.649221635860952,-12.459919462845857,-13.275531428162722,-11.177112913217226,-19.161473684737903,-16.659033964835135,-12.674118919851342,-12.562645803070078,-14.800857720745043,-11.816612580429188,-14.601698715638635,-14.509824873139433,-15.376055461964611,-12.195713038024692,-15.177303898572918,-18.399427740740467,-10.204639621090035,-17.92321858477115,-19.306950036560313,-16.39365770018848,-18.88230101248198,-14.38803866804861,-12.29691508495332,-19.492820645368404,-18.15046333419087,-14.06032310849033,-11.307436205894115,-11.52989078915812,-14.22050618778228,-19.30792926712159,-12.955212930294234,-19.96419700758699,-16.914322610490505,-16.981414773468273,-19.37586467261542,-10.543555591384038,-11.870666657787687,-11.244183329509061,-16.999109544859387,-15.525277150996853,-16.18739131203964,-19.927760965493228,-13.059307032253367,-10.574577706779195,-10.976650321537091,-11.613515195372804,-16.756916148522446,-14.597141822627538,-17.788944863861808,-10.3216029133586,-18.38045308970227,-11.063441276275526,-17.470804845186564,-19.45966929036365,-12.627628168555926,-11.470118615117173,-16.649484061882347,-15.742422667955804,-13.326538386011793,-14.415517158085592,-10.247358055342858,-13.844403533811803,-10.546911617240006,-17.905556587847922,-14.582870087823125,-18.635557195885553,-12.75576018626416,-13.221508100999841,-18.255213931106084,-16.680558313505426,-17.65598111803879,-16.573232840814036,-18.612302441372574,-12.928628263689927,-16.817700658536616,-10.027675417732587,-10.271028472905515,-12.236308879845426,-17.671649987440155,-14.725177242141644,-16.059763703371182,-13.506606851279848,-14.6711098756011,-11.520370637712041,-17.335046624874895,-14.578221315946456,-10.941405177842707,-17.75490922044666,-17.834754673352712,-11.431057329804904,-15.886717465068376,-18.499133595427367,-19.771922453779936,-12.73883026490582,-19.434839772038263,-11.198738738485186,-13.933633134011522,-10.467246968658728,-18.680894988277117,-12.839212933413958,-13.556940234216254,-17.789898615430943,-10.764716571947872,-14.11609054264659,-19.336966840886735,-14.660889619860045,-11.621254752052028,-14.564184074784198,-17.505760837827793,-13.94196186409912,-11.505319001686312,-16.587157927819757,-16.103016540596343,-11.95934161352737,-12.655609493600803,-19.60910998762933,-17.922771092085064,-11.033430025634662,-19.781764982721704,-14.745183004505355,-11.587410599946498,-11.69254441584333,-11.780066320954486,-16.492324108916876,-19.0378097656724,-16.303507888350858,-18.63492550244611,-11.472361992600586,-14.300396103463733,-17.16663379016539,-13.06076308884252,-16.194062479383728,-18.96337149317446,-18.29105169421232,-10.035659086623445,-19.695570240911685,-18.709969232207865,-10.591817268189969,-11.159739172955124,-14.498549598328573,-16.893437692142605,-18.38064511668189,-16.21878947382151,-12.899746000047196,-13.219646257563282,-15.812615268908164,-14.763492244467662,-10.958318061062506,-15.005713873860977,-12.058657858383437,-10.856276734593157,-12.122781220314433,-15.334719043477826,-19.790386073327117,-19.52978889497087,-18.48705173729508,-17.837672630604246,-17.830052375756104,-15.842677103139739,-16.199438121575717,-12.554837152644833,-17.537383553844055,-12.865691651188925,-18.833172163780418,-10.454984671288043,-18.639961836203945,-10.244017026229685,-13.358073198474813,-15.251058311184433,-12.414924110559696,-10.771836834153037,-19.52220158543296,-10.051532341365188,-17.036174184202025,-16.031977130994882,-15.015843085826246,-10.972637189511298,-19.671123024423814,-11.755099917792297,-16.64877486091217,-11.208091356092778,-16.194771210244582,-14.641409851228332,-16.958404473773424,-18.407607327086918,-11.374210654002344,-19.929551847917377,-15.085061124942138,-19.83589358523939,-18.743414990958108,-11.299884980462132,-17.34518574397721,-17.90321971031792,-19.668180964498116,-11.754848336581698,-11.014933371018113,-13.591913447484846,-14.635894198648561,-12.946332187213978,-10.381138902027464,-13.88879734746645,-17.150521157268923,-11.968059202914274,-16.629934238446268,-12.87811883920096,-14.28817234072037,-15.457773970237765,-10.128922045911699,-19.448456970318617,-14.64642740875174,-14.506031836930259,-18.800897115135502,-19.038060898192082,-14.96764392560942,-11.240112989575138,-13.366133641394448,-19.558428779255973,-11.189612259654584,-11.599938050151914,-13.06465713516933,-13.633382281397239,-11.13784957811766,-10.798129762881466,-19.32739221583869,-12.815180939705353,-14.768642724096715,-10.812098037042588,-12.362852602360192,-14.601405659200687,-12.171457337376921,-16.56736871287383,-19.21823290080315,-13.436043739707834,-16.2533243378877,-13.949349971379712,-18.83951274053301,-17.77686133155029,-14.460308305753582,-14.531839824226378,-16.538538064802736,-17.962751693174376,-18.61077027246192,-18.396414166374974,-13.003063442112214,-18.802319900826035,-17.864082911606975,-13.686128743296614,-12.638853420807392,-13.374513852965286,-13.7034591727938,-13.132099006970998,-11.485602842173384,-15.813743709866344,-14.63630517665624,-16.13197805440671,-18.530421441692397,-18.124449410352053,-19.96596890927324,-12.384169431753914,-14.945577423229883,-18.436913443133264,-14.683317572389956,-16.550250863214092,-17.859982650619138,-17.545979503969953,-13.185835804103,-18.974423705336868,-15.300180419199839,-16.94302995769865,-12.511944318213228,-16.418226157899813,-17.630949179104427,-14.929443010750749,-18.50677826519432,-14.999455399740267,-18.1497472806676,-16.1583051096764,-16.780017435760076,-10.956047359755988,-14.246530369364134,-12.183542612768354,-18.96905139266197,-10.363486842384331,-12.652448631062004,-10.435646639465183,-13.978264118015723,-12.098773171701627,-11.655830218396774,-16.9534970446646,-16.687161164399487,-13.450040949447605,-16.968163835115607,-11.96127224198568,-13.782877861562637,-14.88393165364734,-14.705362051960702,-19.45959079098116,-14.260621993561786,-17.284639408134506,-15.114512969542815,-12.68947310595449,-19.45480470646905,-10.60151017201159,-15.24199070895606,-11.844570260245158,-15.169684711532428,-10.24061812463884,-18.961416360116317,-11.747978005202837,-18.091214299378628,-11.22033330485107,-13.6976375234294,-13.877502048580954,-12.73716984127013,-16.214934114987138,-13.980410898281892,-13.322546209867232,-13.801139107635912,-17.36270665374467,-17.74269319685424,-17.821681991993923,-19.45423944681665,-19.027984562515815,-11.630930956059684,-16.032469650927258,-19.95686308870214,-12.27777600717673,-16.66314220727151,-13.369667958276102,-19.73634277921399,-13.064624704529308,-14.548372121235815,-10.479388956772484,-10.533772659512424,-19.76073824159295,-17.8803105029315,-16.619329411994205,-13.791184001600925,-10.645662289795476,-14.490779784568753,-13.468447323541994,-14.282255893863224,-11.743956391271793,-10.389991379115413,-13.205062200224,-16.015874974642802,-13.072141017768825,-18.26049236419066,-18.189939448013035,-10.060201091132104,-12.46675122979431,-10.984957670513358,-12.606466943173873,-16.870622491189714,-18.04243674708154,-12.911478600094089,-12.48343456770122,-11.830118959961645,-15.87819853871266,-12.2927046450524,-17.770801070899445,-14.698903607745343,-13.578486806371483,-15.133305736871117,-11.856443112989211,-18.642743010789683,-13.207769417086933,-10.531218815656178,-15.605304260420542,-19.7846385060079,-14.912839770809317,-16.669584846793256,-17.302661015107045,-18.676883204525943,-15.898091837651055,-16.4996940379778,-11.665493411328796,-16.757940408681314,-12.210292139622867,-15.457787623115202,-17.289285515243616,-13.143171085581216,-16.723465934490413,-19.405791504562192,-14.142575722283242,-16.029831323693774,-11.276500215622637,-10.925150360549274,-11.339741378639363,-19.752766850655913,-11.57879414918645,-11.962917634590278,-12.57727081800136,-19.195429064714656,-17.503512667355057,-13.767825173747434,-18.682868323559866,-10.453101033433065,-14.071692974796656,-15.034265952111415,-18.669336420057,-15.780261084634361,-11.889955166833753,-16.76818974988212,-17.819857205672264,-14.309324179723799,-11.677105322212844,-10.689421486996828,-12.857323504478039,-15.176827558323096,-12.308854898927631,-13.062187040045982,-18.194124351253166,-18.63892429097325,-12.583607480160254,-15.117119427960295,-15.695728299501559,-13.49580779076611,-19.364634060649514,-16.47112484713986,-12.65467352614191,-17.861229141576786,-19.31187940064833,-14.022079813103188,-15.848355795712326,-10.878302070506088,-14.988118471729827,-14.481388811950941,-19.737698376571227,-12.57548480187481,-14.29350410954168,-17.44086203218482,-18.12060355348627,-13.267805978567456,-18.93952751201767,-10.975446893423658,-14.04533952572824,-19.756585800828155,-11.342799359624053,-16.498553423710277,-15.396936505069096,-14.911010308173257,-17.882173008107443,-19.947430257600434,-16.245067284850258,-13.723107702480226,-13.568468573967344,-19.534586237797328,-17.122574614556065,-12.67022732350628,-19.27425841284071,-10.59267205877462,-15.06855903640928,-12.022680409894468,-19.22280122202468,-16.076693399075786,-17.348239600369283,-18.16775090717965,-15.995517165226868,-13.260008273681489,-17.71102188884596,-18.70093322034198,-19.153792633302203,-11.939401408855371,-18.968988914755425,-10.34423317255284,-11.095932534777633,-18.288875151275676,-14.307582131179071,-14.618276461093412,-17.702826170102416,-18.0315705246463,-14.816081794698423,-16.196209354555982,-15.928015919337689,-16.71859007486143,-19.126895722387815,-15.147551034840765,-15.721004432695953,-12.489070344384537,-13.578572300426242,-10.468042253574463,-19.9144285362715,-16.828344345162304,-17.088038786781734,-10.128244719816067,-19.107489794997154,-12.470311097822687,-17.367607730637484,-13.491426707562482,-16.49891461016896,-11.194113936129462,-16.930170242915654,-14.322816557012384,-10.286510519675321,-10.198600777979308,-19.157526463788166,-10.134201918785415,-17.87770159731837,-14.48994224965906,-17.92246641211114,-13.130396540057298,-13.559020376573883,-15.479821975694296,-10.639714208510247,-19.582495606833273,-13.509471153628024,-15.754492020738857,-13.208820211613595,-14.089273570696923,-11.378845989490378,-11.769562810223846,-17.01170498791651,-19.981276535923797,-12.4690370980618,-13.585771187224696,-15.68343359057079,-16.503367506550138,-15.186356269141438,-16.69600962912024,-15.703432804258577,-14.52941609528847,-19.37757409849901,-17.928636062731748,-11.055162973653177,-15.627640557611453,-13.407249245528623,-17.30439875912122,-14.508289046572372,-13.080032187488854,-14.326809758847256,-12.922475325363642,-17.966838377901652,-17.36744631095103,-14.2395313098816,-18.806928703264745,-18.87670535580581,-15.66469800767814,-13.864884618435484,-19.044337326668582,-11.184150075619836,-15.823002670608247,-16.255597914347202,-18.70578724705297,-19.428304237664104,-19.838771170235656,-10.531128039196256,-11.418337639460347,-17.81506223599963,-17.54527565832622,-10.063251571712977,-14.198633550105983,-11.600353926890627,-15.121672938627785,-18.981766271924844,-16.173466316753405,-10.071600306530845,-15.70834431953487,-12.676165710659093,-13.549559942889445,-11.388894900246395,-15.277037930721711,-15.560839160999064,-12.710282124357077,-14.226245117023169,-19.58133483243721,-11.485129032944219,-10.494502403885155,-17.32626411755267,-11.671032203564284,-15.5260766051346,-19.248457236078917,-17.047301251495654,-17.8833518236069,-16.18750994586867,-13.38432081129074,-15.911420748739022,-11.34860930053703,-11.328494350509938,-13.705104933735814,-13.808151940093552,-17.192440908033383,-11.765270925502207,-14.732141400477554,-13.406759976062348,-17.489405800506272,-16.69810346646434,-13.653474180075323,-18.67725829637286,-16.67643625532824,-16.4990639386878,-16.222666847544474,-17.455916658311526,-10.213036755847023,-12.842467227998522,-17.801102890022882,-16.28211864025381,-12.72935242437758,-16.93581272287249,-17.016971673886612,-15.791541206141348,-15.846356870628224,-11.683479087310385,-17.311012418800985,-17.170087539936777,-10.064873954007954,-10.793329739377278,-14.794389328836075,-19.249045717246503,-17.576206188451906,-11.155755651981892,-15.866297931157822,-15.18890765924363,-16.89256092365919,-19.03235082119213,-13.85687233777997,-11.551915389492088,-17.513509700809585,-10.36769232543502,-13.250907522080098,-13.195006024380824,-18.016892463216273,-10.290114468548188,-18.117865971240402,-18.6034178277808,-18.53616110042506,-11.020092025115176,-12.832714674082744,-13.584738897104776,-12.668983528565889,-11.773880239317648,-13.571211836489809,-18.92180208394805,-10.82765140849656,-12.994590921802791,-13.041811012612705,-14.772171259697851,-17.851522306096776,-19.89275492621649,-10.114133587783964,-17.84024495677024,-11.790980675028333,-16.911811581422228,-10.421742204092707,-14.4394413025447,-15.606541531986704,-18.97616941635886,-18.3826316540657,-12.835799570537175,-18.9568379210543,-15.566480147171436,-12.144160224966638,-18.39520676175922,-10.860944839896813,-16.503170011992133,-16.240402594849506,-10.815191717610572,-16.347325308899613,-11.130026316990719,-19.072290625858702,-14.94839204364087,-15.45805086935072,-14.01813254398083,-19.678164276937093,-15.326241273677013,-19.759075138517705,-13.863535962280302,-14.232446457200787,-16.137061870435968,-10.485805041198901,-12.89320453675252,-12.017952159558023,-15.843732024292978,-17.9269242176658,-12.513434461348545,-11.217995702847702,-14.321272544323483,-13.09966881660976,-16.982162003207094,-15.353704626424937,-13.442348764432543,-16.906778425566216,-19.84467842558877,-16.672414108828736,-14.523166752164006,-11.10149885679968,-11.07419133354157,-11.104405958229064,-13.851511007509252,-17.222415974350355,-11.683431185735929,-17.951455724191522,-12.7721020296394,-18.819410046394008,-11.670373575109963,-15.019888388281128,-13.965431404006008,-19.02395594731726,-12.041010255161027,-11.75583597737845,-18.799744217538546,-12.362759190731856,-18.017140819060117,-17.048709684224733,-17.847976026823755,-13.284135682074567,-12.95515525782838,-15.562063040290905,-15.018640572828732,-18.989694589515434,-15.10684947000675,-18.188092374008964,-14.515856014212705,-18.113657203738647,-13.58708941764811,-13.840536858631413,-16.646331914358065,-13.063011302957982,-14.606226093458245,-17.581359113283224,-10.639445663998332,-13.48279906932177,-11.549929107703802,-12.174144332883081,-19.879442561381904,-13.1095864044849,-11.347952275326898,-18.776800762745555,-18.674818985227024,-13.855491260316253,-15.405030667589568,-12.427293106817869,-18.725513585892447,-13.064340161210424,-15.111938913324458,-14.208867813913347,-18.7765641928922,-19.03570406928,-14.64961639641595,-19.679022739669144,-19.237392414640414,-12.530126382142182,-11.584116233553141,-19.607164915365807,-19.122635020886833,-14.439731874716784,-15.021066629131282,-11.474092050606771,-10.468829714459186,-13.501051175055721,-12.695102098207139,-15.619709546211935,-12.626902788529545,-12.378302484802974,-10.751449488527411,-18.610819569328672,-13.786643143924008,-11.586842678211893],"b":[4.155056344065638,1.248837883492524,2.3811212715515353,0.5375183909167369,0.14233011683965513,3.1070428572973396,0.8677910256332622,4.6008375033249225,1.8449108524427926,4.491774335131384,2.9776992385581567,0.8457131283887342,0.2974444556370581,1.1365603996888718,2.129218626575966,3.7075400903234113,1.699068385984157,0.5527213258660224,1.9260902650233325,3.5361925488445003,4.7343493353530075,4.6296680595534925,4.761490464184192,1.0440217034210209,2.346960046276779,2.1263808365909798,3.8761520397835856,1.8097048877097532,4.08951302087304,0.8751018665339616,3.502940940146372,0.5920903805290312,0.5332174961250336,3.598533230945339,0.8287672763607612,3.1628838979566565,3.967895910286665,3.2241491626839505,3.7927294169265013,1.8415785624111225,1.0716632814211147,3.8865703378154737,3.3873497812707853,4.408234147335262,2.539043728221777,4.254743237415842,4.763276056690055,3.4304347513439417,1.615777654867664,0.07016374602806796,3.5475005208704182,2.9484957120663315,2.3727916645103297,4.758192489134845,4.510547349956914,0.5745061825991782,0.785451081924804,2.971562743001872,2.1221942247564285,2.922603045722987,1.9868400195635394,1.3129682594816605,4.247624368968003,1.5847316220472663,0.38194106089753155,2.321161191681175,2.507698086501403,1.4556848980895143,0.765052712842974,1.0143527755126824,3.4903178579772898,2.1646927458590914,4.918029136851272,1.058746459804063,1.684959726688049,0.6924165504544799,2.070666561573523,3.7671211234277093,0.3341454001997035,0.4063658096133993,1.1364042456695878,4.096455245463625,2.495738814601689,3.6863909695611152,1.1543670750497925,4.6790908126483375,1.0717597089371966,3.056854590757804,3.7253761991096503,2.2800111227455764,0.3678315269019006,1.9614567353364554,3.281579290168314,4.714699437983246,1.4438323175513146,3.795838698118229,3.3025196531591483,3.381910581090416,1.3765138798979348,4.818990271035657,3.469408761822054,2.872383870927595,4.009694798377165,4.962135536956083,1.5535632607776517,3.9158659523012695,0.4571736297250084,3.2554818270462826,4.572093978419943,1.7209345262269915,0.90271322895073,1.6763665453986476,4.551995435957366,1.9263837505432901,2.691861240060971,4.8305175443017205,0.29485081963338544,1.7506112611552005,1.6296312297722937,3.2879678526943676,0.1083483796634821,0.32361909290804847,1.0780347687853087,1.0615498674073975,0.7664095157796347,0.34683989229047696,2.2230392213291394,3.200827966040143,0.26714858128222274,3.32254170528834,3.876505425598112,1.8592051296807832,1.3764813002161647,3.151087278596755,4.596745960372267,0.2836443072201833,3.4534532640759776,2.8731799597236343,0.05850658355588623,1.2971922144002845,4.3053481327922904,0.7973794543532353,2.0827896521386857,2.8077121576468467,1.1458575987558506,1.7272094022383633,0.977581871800498,1.4068748798304098,0.07330633358435978,0.8938994541810519,0.3447276920051845,0.4866304753061901,3.73420776454911,4.373652042425072,2.9240354707749394,3.9121370225800858,0.672427364869782,3.5380162045499164,0.3190312943712248,3.4157270081378286,1.287820402155322,2.0223400179678075,2.9170253296494653,2.7590243282905846,3.8873290412781145,0.48181010889104314,3.846816110301389,2.307667879934907,4.382752135093348,1.7853889810005386,1.9626608904592946,4.613451468126702,0.1857861397221383,1.5622072498947082,0.5231127166979477,4.1218740736345225,1.0232810286938132,1.8447156459071856,2.468826675454292,1.7371877246013823,4.5131171895665245,1.1928798051062595,1.3797520350539072,0.36183201674473864,2.3559976849703688,3.5536372161608156,4.86279601648543,2.3616899269685385,1.4718269680046225,4.5720582011843405,2.280218182168736,1.1897699469124623,3.5147338151279706,2.2364561546655226,1.200452434474012,3.353339031784006,3.492853142235478,3.299110601192523,3.6608406793652493,2.290016154609882,1.731921550012695,2.3721710844995805,4.166303660022757,2.0563515526011034,0.24738368684406598,4.246415295692567,0.24404942513981398,0.6692309444375943,0.7103974536162394,4.69179271974003,0.19780716617925131,1.2364644776918088,1.2782734134669316,4.204126563553876,0.42963021490875497,1.4955298605920986,1.7105869214074987,3.6549934617604087,3.487704209910677,0.20393438560853405,2.5692526589793765,0.09252714684829466,4.406054622221886,2.1570453661063063,3.8829575199671673,0.31338261160413716,4.984156325240532,1.3022134440571165,0.8626308549020412,2.678412373792546,2.716305514225138,2.1054924069349834,3.5263323671263924,1.571186835496774,2.7257786646405755,3.5581120000218105,0.34742504657879425,3.1328111205362577,3.039917809471685,2.404325987967252,1.4405410605375546,0.28804957615170657,4.573302131347997,4.773075634592786,1.757647535287179,2.087793291461039,3.3131372435105764,4.226649421501253,3.6882760016167007,2.102653081176401,4.201366810304346,0.6515163152678349,4.352527884670362,4.748813335093392,3.076258845014115,4.566530400714309,1.506284771488774,0.6837575145211916,2.345744571961259,3.747455364402985,0.47755396172976194,1.3711199762088255,1.7154642304494006,3.1362694300444316,2.7134733574802428,2.5679834966310224,2.3184498653811145,1.878622249954971,0.27296113620116413,4.013771354495313,2.77514379145563,3.702000858453304,3.5051071050597793,2.027451395840921,4.935177400952152,4.397678965226207,4.4487870301382015,3.2449562026005596,3.649847425725148,2.704054309921969,3.8218367132240862,0.5776836486331494,4.9547214717524755,1.9490839359238676,4.746849347422009,1.451773652888051,4.8901328097935215,1.8305142131691976,0.6092905410874072,3.1084452798363094,2.0099753808073784,2.130221352569185,3.4286886501756166,2.218439253596639,1.255345443042044,4.906625705332216,4.996616825958684,1.5879290049100803,1.3881720776275175,2.5275593944243657,3.0981997951616513,3.7673443031312717,0.4495585484803033,1.364285690581406,3.1435172265918663,4.791371200014741,4.089931208675013,1.8346726700203109,4.147514237603371,1.9969895733161647,2.7411951325476194,0.9197043439380792,3.295185644996206,4.885573862262209,0.6731169771377687,2.3572112384605215,3.4074334798356185,2.151602734163011,2.5509080315665167,1.6494469083446106,2.536172153245243,2.2882254620820075,1.7427851449680198,0.29550439461798916,1.2494291787228973,0.5877184118514844,2.079256527253439,2.9728573055459195,0.449848260216289,3.387753489494507,3.8833624755944407,4.652358489085612,4.753784428961368,2.3485748655970715,4.025931162955917,0.23960475969280082,1.4245409330781866,2.045560387937474,0.5557712580756069,0.805015473373375,3.66687662965321,4.351195981969266,1.3381800918033993,1.148928276739396,4.802300457907097,1.3619085145731946,1.383967338524008,1.6961315801334453,1.3110039244133587,2.169109539775503,1.0696655618848294,4.1908052104691205,3.1881009281377914,1.5381943089769468,1.6794982821767324,3.806052923273856,1.9831039954449314,2.3634696793565038,0.47099368671163266,3.510145914406083,4.353997299733639,3.321591944150838,3.077423459813513,1.4752705010381284,1.4620743766140398,1.3620754033284288,4.819457135457183,0.47005040057098935,2.5329036875600286,1.9446105493890453,3.085516940337738,4.827815502720774,4.382232982879165,2.4844262028251443,1.8549910656630142,0.1449414746517219,0.9332002212338231,3.4725814525226006,0.16044679461744038,3.675202961126814,0.03077985467763389,4.739991606820193,4.122381673414615,3.0160916394857473,3.5539756059264715,1.3960203199731358,0.7866246344202665,0.8170631052447908,3.4667173691155853,2.1116205754211617,0.7436391445570445,2.219465408908471,2.9899781255743294,2.6786998489516045,4.180203590449251,1.828345865965565,0.8137359963361457,1.5339678616656915,2.47243020056548,0.571747463420329,2.3327068021136723,2.5129926630227106,0.6538819654719863,0.5180589647574874,0.5302550895076996,3.7621671107503305,3.415792717175367,4.617453644254638,4.683591857505641,4.816008671131483,1.2735614083540692,4.398485862876566,1.659351775639285,1.011238295416531,3.945124462582906,1.010580789925365,0.670173160008114,1.7095135088222713,1.0891878804677735,1.4143380545335382,1.8323722290916156,0.9492841244956374,0.21620114018608527,0.8705988463801462,2.1791846350443023,0.11207473443870852,4.661958216872463,2.108888156978338,4.02662485075003,0.21013082859043908,4.465528230541743,4.260550928002448,0.2582148440964549,1.6019645262989646,2.1308530691113594,0.9668437669023755,3.029924240674621,2.0257907055581215,1.8406834723572818,3.3818026479322825,0.3060162298830271,4.949401168942903,2.3654652377329013,2.486035308969411,2.5113714183259637,4.621395153642672,2.0108369530753603,0.7085129331613049,2.4903130334713586,1.2558157366545997,4.671307527588924,3.9390216121660524,4.34108652833892,4.544900957191505,3.8705878200728994,4.691296406252643,4.177584610815091,4.497090114602278,3.3298969258094626,0.8573073553659827,1.984017924435495,3.6475828193002666,4.460137773557631,0.17322514747103668,0.06353341930733558,1.1415488927647954,1.7090011877420153,1.4503545407938778,0.32904427430714644,0.20499407108867107,0.111444404812302,3.7796574533900396,2.103838069685863,0.042076759399775066,0.8469016003080121,1.6552100008667892,3.894435349904576,3.3685299742376937,1.923125104772222,3.839147344176795,1.152148716807434,4.4568750678702695,4.063388445496752,4.844862391384232,0.5211582349385946,1.8344711399464908,3.8590265048880945,3.0360199306517965,3.619137238299733,4.690522137531091,0.3705711575747972,1.2829098338416511,3.46529573363504,3.9275210720867406,4.150335320688727,4.6971965787119885,1.7028286180060204,1.4380769786521663,3.543984531067199,4.006894387113826,2.8742968824052517,3.430106018171031,2.224566261965084,4.025422678246654,2.556770841906334,0.8152099820096015,2.475488706209118,1.3158148006667147,2.533000146591866,0.29451609337612594,4.893629390095377,4.190742930670137,3.1512221376077143,1.7072636584988254,1.0559794834689218,3.978592087588578,4.552026993271888,2.8714161338633404,1.191943467047929,4.17895215919228,1.5975198439518623,4.083263155229019,3.8300053615375864,1.5604301000597365,4.67391205466382,4.74975435330533,4.6734441889468705,0.6643291778795324,4.178042142141595,3.6058262683738143,3.4807077500016756,3.2401552597495953,4.399187996319515,1.2569471354113615,2.9106401087087717,2.9098582684894057,0.01866835236945308,2.741668675902542,1.0309558074826841,3.826804158568009,0.6023057532911602,4.558154091797331,4.535017093366579,4.247906614242899,3.501418908092835,2.0778562080164855,3.861359121901713,3.0004909499983223,4.442903636297078,1.1652775294316464,0.0634422572967519,1.2716229137453905,2.515266969683406,0.6658746947010541,2.8123982476142215,3.718988401337283,3.4979150137189663,3.839259905279598,2.696860777960354,1.3228070892175714,2.406045291634409,1.557991735247829,3.088987526171171,0.8419259157424275,2.6558680134703803,0.4529904667714635,3.3697226521015833,3.006030815958951,4.2612653053290686,0.6156522037640833,2.4260228966578,1.768838045533786,2.9422364481951235,2.931787013174328,4.5677348442873935,2.0644891205975577,1.9459084425203166,4.0573472585619985,3.575187400158738,4.714511494196827,1.9772319064186383,0.48039520567679683,0.5284335248722549,3.5886749713063537,1.2470482719580878,3.4605900153942692,3.232396185034825,4.990181287506256,4.834103429742916,3.278501784840049,4.670022243407893,2.017029664246195,2.277947823072388,2.670931346622588,3.6247581992111577,2.3229745195774196,2.1321212565970846,3.267639114866027,3.06345476106641,4.13136547077078,2.3058513416844706,1.7639359173461044,2.500390166367372,0.8824132106178584,3.3572205005570055,1.6767728389383596,2.65251773028911,3.795584834802548,4.099032092955888,4.10480398930448,1.6663103857816108,0.9164657239274554,4.511898287755141,0.5273480863620494,3.4161825204210707,4.169586695487812,1.7578325249264803,3.329466106892953,1.4680021759044592,0.07710427013360999,1.763238905162865,3.510788051096693,2.9137757780201667,1.4135438590348604,3.434843213107942,1.3832012427519202,4.671069407470728,3.578669138562508,1.5378444326002028,2.354336392176929,0.8078199832106436,0.5754556589068716,3.67955389005046,1.6487642584556772,0.29014407121889074,2.47160277449224,2.7429923354038377,0.7769468514447009,2.5549362828704725,4.442574063588691,2.416910241247099,1.341217494852035,2.349939071420011,1.1162373285375615,1.6430653571164588,1.9572094231945336,2.648317268092044,4.4894027764692845,3.865003217295555,4.082621719009525,2.250118724234232,1.1606856195556658,3.6774295198657647,2.9054486180112438,3.5141058965608387,1.7844106375442692,3.372955664576515,1.6546752365452277,0.0828291776230905,2.1590321811621846,3.3003111764259128,4.74084346007424,2.751005419425261,3.674077221248453,0.6952547771115514,0.6555237017811699,3.7985393278356048,2.0847615388121046,4.248157587714418,0.5749014431298638,1.3120695118179582,0.7095648093208173,4.052917095041716,4.654538654062808,1.0730350582158599,2.6517454442128185,0.8145408283590738,1.3148450113835963,0.4799172243601124,1.6180360846095265,0.5850758727426997,2.7250057783730544,0.7105646690407297,2.726859731575514,1.8484773579909086,4.967600299726901,4.939585271989797,1.8126386858049537,3.9761704932803346,2.0600842043923864,1.3684315555340398,3.270138486734724,0.9702540115276925,2.9670037363425514,3.0547728399477094,1.699444349245267,1.9218288777207304,3.014989485673729,2.37817428564157,4.543614224677549,4.239742810021437,3.0012522450910026,1.9052692022888207,4.554061013514708,3.100775897490938,1.4034540923012062,2.2970836426598495,4.492552389117439,3.7834381361170832,1.7606910175886048,1.5305780037459416,2.1410663976100395,0.2376208670214186,4.092210780168185,3.125320168325365,3.0222291706299087,4.8859255155145185,4.9384966132690415,2.9556200721115555,0.03163171586179403,0.8627618587401664,4.141955743782779,0.21125168478717926,4.417001119116893,3.1191643198821293,2.919812853047609,3.3289419557740807,3.8827230261827186,1.0085011804734578,1.0810562570216786,1.7284584937763992,4.536082716881285,1.263878022740792,2.4872387520410566,1.3139827629273837,1.2870305134054683,3.557793899338696,4.841410745367551,0.3863637165686351,4.776853077207303,4.960547422241132,3.8797598219130505,4.030862004411182,1.0890360868418614,2.141614449967194,0.7810871914548889,2.799956434503245,0.31219643923489193,4.809232757163567,0.13391866962424226,3.0131260574450778,4.467793562767023,3.567788594680701,1.8322373556165494,0.8439665133871921,1.2671431691242718,2.3254900245138788,1.7810467932039875,3.4595840499375208,4.7440033338551,3.0917199138099694,0.6315797126955713,1.6624838925532415,4.387964645814194,0.5763358002055274,2.300004946644721,3.1533574766336803,4.826313923957021,4.089063484672561,1.8520270587874,1.708579814854383,0.7092279999021778,4.037356563067428,2.6036683775393312,2.4172903820779155,2.9008688533385074,3.8042777121463356,0.4087458912435282,4.462154255426061,4.966063421164881,1.9751422331244095,3.7644209472238535,0.8518258005270585,1.6924572313591602,0.21478920167992355,0.3594754291560076,3.834117977374756,3.587028959148607,3.348310975318496,2.4477515167912522,0.402193970981507,2.6085221242140264,2.583222205171234,3.895941661839725,0.2094356235360817,1.3176198961961572,1.1495076831665352,1.9699567434552867,0.15678666883750525,4.351575893975222,0.22719618801655073,0.9630219240177473,2.246854854873257,4.405924284111544,3.7680830874108526,2.149730695661034,0.9858369115110133,4.639441637708062,1.8052849577429497,3.0946319067297456,2.702229503806567,4.108413727828433,2.713567320650585,2.582152005424101,0.20811211243622396,1.313606092061308,3.6304804266248505,1.2682540542593146,2.8682719614607963,4.8069204286925284,2.4167947507055896,4.333311056989643,0.33159670518442597,2.52751222417428,0.18605680343248499,0.8863253119718761,0.4666144124125471,3.5527463971933413,3.408924505047665,2.686506640188562,3.8868014723225484,2.718250864095161,0.7171576200063368,2.33056589422168,0.15610900685089635,2.1059372922795205,1.3573015933972954,4.057083284938528,0.6666275216754047,0.5715938461775949,3.642404684253048,2.0073077368624217,1.8698124838757346,4.56464369262597,4.757717184439251,3.3143016600838093,1.0391024202309795,2.230043717453313,0.20484800649105295,3.550894844586537,2.9485526062029543,2.2252168513611705,4.525791413805477,0.23249258298268294,1.912514492833537,1.1907556772091588,1.1561955490064746,4.3128944154351,0.8614144457944228,1.6679015357257099,2.359754650392939,4.478808330936451,4.415610199263379,1.745065248435742,1.6494766123781446,4.080477968702048,0.8139910072603851,1.6421901682561468,4.533966150321303,0.5419409395482289,0.4501879409326637,0.3694113570259616,0.3572488570976595,4.5718312673212935,2.0325661445457577,4.34407625677375,1.4784484191508829,4.551919130255207,2.5064910599378476,0.7743400656739785,0.40919846954223793,1.5032037410225518,4.883012552485732,4.249106685250933,1.5095371354335452,0.8690020409829335,3.075727360509796,3.0916130323390236,3.0838589459783106,0.3310576323401948,2.4695399222122525,2.6746866735435804,4.231833289900923,3.803915548055129,3.741406530588586,4.493805590502285,1.5848819408152837,4.953826013748328,2.0270801567067154,3.071193330569356,4.522291284708841,0.4761829732007983,1.145227671039728,4.020405650398083,3.2440461209836444,2.4987991781183885,4.1142161205650964,2.349361798865577,2.0243982363511126,1.6308482277589564,0.17239356236599446,2.7264273649885737,2.7178124273497186,4.334897462611723,3.4297993002246074,0.6034625156464501,4.14636838874493,3.3104039791836226,4.057926735637749,1.8486549087107629,0.5975859893560975,3.5695211453183537,4.703241887952062,3.0439401527361465,4.906526986623966,1.4611927684609638,1.722529408195237,4.746175626719749,0.7511096090807279,4.426623657429555,2.2234642889192626,3.4410798035503465,2.5813545144791905,0.9349177219529892,0.9607635435383721,2.3844676744785143,0.4868992077793477,1.8688271526454903,3.4999250009858294,1.1372183883141962,3.7782211331114866,0.3282435703748676,1.3827322236632267,4.732729668434183,2.8409462499635882,1.7075352607353866,3.370835150725069,0.9532130734372735,4.289991500266035,4.304976165228377,3.817103298737494,2.081612724772326,4.653650643839709,4.2707398803529895,2.940776213602738,0.06327418792596351,1.3832484495865682,1.5990021489273776,2.4720696664693254,2.205728857359758,4.78639143813404,4.279821800234761,2.512995378271575,3.108704140252383,1.5318068837999144,4.031234361654866,4.814915156040247,1.4787800696798326,0.03623925090766145,2.5631423808926366,4.6164174903923065,0.6814596159353159,0.5518035000862487,0.7149171554038125,3.3836925736348356,0.6262327512814292,0.6366303248607708,4.499023843785761,1.3085500601028877,3.924270824226216,1.745460888361039,1.2583993254308912,1.8744931150694888,0.5466572414567727,1.0617819777481452,3.6884917444883767,4.946319479143641,1.7858169838202287,2.992791591534668,4.915829061828952,1.6294790773917656,3.4002394760110777,4.543388148004634,0.8597933107500011,0.6686634148872395,2.474733142793072,4.86060253385551,0.9960248943216587,2.7789593572350526,2.8476847902717752],"mu":[-0.22500180701441996,-8.177437155147453,-6.6461284945234915,-9.279298604919738,-4.298760679248721,-2.789967120833874,-4.086328645739535,-8.822176873110305,-0.3304331182758946,-3.662130526220777,-3.306408255860198,-5.433459812236419,-8.753857205253126,-9.012174671496702,-8.417155516229055,-4.016443336663082,-1.9289530734760452,-4.734947085627754,-3.328280299802835,-9.142596728733096,-1.04334217979833,-7.771734649984722,-0.04111437085586367,-7.937580630578445,-0.5533744429883369,-5.58179252059306,-7.490889601653157,-2.1936590679996137,-6.752181663406674,-2.476823985585488,-7.339061981447825,-2.122765737818497,-3.4550374167276687,-9.05308944162808,-3.159788041460041,-1.038348713052566,-8.837184498266957,-8.443951582701816,-6.396336107442804,-0.926743949666271,-7.681197578685097,-2.5657061187134778,-6.301795756259372,-8.48968577122455,-2.778251516696375,-5.691916864176387,-1.846622546947565,-8.914441179057217,-5.140183723326313,-1.7877301266528312,-7.0386070833903425,-8.112629298626636,-2.9557518525261472,-5.141158318176677,-0.5680140847675608,-4.472995290492722,-0.9819303131312251,-0.26571239788648837,-8.860423380407749,-9.774351035443232,-5.454402276605945,-0.949932033160894,-3.7747900727516592,-6.689558380161373,-0.35905171679798453,-2.9072105497512912,-7.0737471103845255,-6.0159633582111045,-1.9912481185770203,-6.110358661643489,-7.220036109165056,-2.093868958936529,-7.382337352827868,-3.6084500820423093,-2.726717302375925,-9.797107243721593,-7.875552598058024,-3.166799052008469,-5.483737907861778,-3.341801592841631,-5.705149652099251,-5.957653094869187,-1.576227652526947,-4.900023039687569,-2.5276172816468856,-6.2365785408015455,-2.751991688633215,-1.9078075730028288,-7.922926289721481,-0.7775110324751799,-1.1791725924597563,-3.828750854960752,-2.2214399222487358,-8.683449163670867,-0.7990840901719332,-8.637132199093733,-4.495253457177206,-1.702949173755799,-7.580202683504453,-6.296085952627983,-2.845285884588127,-8.75772222981649,-1.0514878340195266,-6.012514171892562,-0.44451019982362894,-6.134565070928448,-4.344446405562012,-7.989621870276668,-8.272049876078324,-9.964894245588782,-3.8579049550873346,-8.591584101564436,-5.333573542358687,-7.95800129385883,-7.998841695203673,-7.921068172228775,-9.936041348018033,-8.967162465767764,-8.196476214253451,-7.320937346304057,-5.7028218993403,-2.592400456689694,-6.743698285048929,-8.199465958352711,-2.252531091383194,-6.536902357202337,-5.1037440198892225,-9.66605456428363,-5.669258208687136,-7.3452086818583995,-8.992521198098649,-8.042944069102202,-0.9267953750253555,-8.028291643526417,-2.895596506811391,-4.632728901461807,-0.0976435636254025,-0.5374548567915616,-4.197364524479745,-9.007086495500376,-0.6430006012829659,-7.546211642864391,-6.730481345154358,-5.674017456403657,-9.33691829259988,-4.438019448072501,-5.451130604174523,-3.957748966163519,-2.4255856848321167,-0.857054196571605,-2.9496266318811926,-3.132827602796986,-9.402601168470666,-2.3492778026421135,-5.108714238059077,-1.0361581279692111,-4.603866163346268,-5.967048938818332,-7.0666516232037875,-6.1770731891871495,-4.8042001723768735,-6.885796437539637,-0.6450370619029067,-1.1079188321915545,-4.280286988052804,-5.380043733714377,-2.6938160460266847,-7.382341238143253,-7.387289122425793,-9.701331922346473,-6.572202718184402,-2.446527744244873,-8.014275884603448,-0.9047482496213854,-9.838290324884671,-5.628394694222349,-0.4409678186083643,-6.658473601937924,-4.570068616274141,-7.2586893777927886,-1.970167131748668,-3.330946611547414,-9.573411633600237,-4.761469865889096,-1.4253551564442968,-0.6055789100475262,-3.018452390523876,-0.8644673292830429,-1.645879201445155,-2.5577458584255797,-9.298571416498099,-1.4186794341324083,-5.374876005204254,-9.52542040957129,-7.485917037515435,-9.11040454284381,-1.291482404221611,-8.435472851098133,-8.147688316206638,-3.869907930856209,-6.530533421679796,-6.227929777937707,-8.616170265739846,-1.3790539011527692,-7.63803101095109,-9.968072431855967,-5.6727902569302024,-2.131413781675169,-5.891111084630543,-6.779300400557428,-5.826244485751331,-1.1653127584413125,-6.918790536601032,-5.940847838583312,-6.592558278447898,-8.054688528823398,-8.977074305868879,-3.201792838892714,-7.267169572299565,-5.531229191979056,-2.37312342373851,-9.14927179500552,-1.9000877780699854,-4.285516758719583,-3.1572914702259847,-0.09626359529497419,-1.054210963796316,-4.503727441173362,-3.112785790723338,-7.107855027636203,-0.9932218935396198,-5.266516192594115,-3.052357276533346,-3.2160074632546642,-8.337721791608697,-9.168757068178062,-4.368578340273079,-4.179518277762632,-6.226952556918648,-3.2515660703366467,-3.6847250535546916,-7.39679422527418,-5.622745572023908,-8.086092150897851,-8.030575944597738,-9.521281538301178,-5.801206251864421,-9.0726280305368,-0.8299655768726022,-4.758981856237321,-5.4390136665266535,-9.258688305803046,-4.321888781209015,-4.298510445845444,-7.85357654473221,-2.72485527455248,-2.187590147683778,-5.08526782968497,-3.1947630517068526,-4.013128545438596,-6.6862167673903645,-0.9465576586489743,-7.181718603785279,-3.783089222325846,-0.12117691113595841,-8.923160328087869,-3.4227663771843786,-5.640835987181174,-4.311444202113295,-7.017807543066914,-5.684767642969179,-8.312288021945546,-5.499901755998591,-8.618627051372158,-4.569452299426262,-4.413710570871263,-3.105932671425291,-1.6404301933809573,-9.619452116011173,-6.459381180377752,-8.09313263942151,-9.751463435773712,-6.072212748876755,-7.413000481172549,-0.7533339226513136,-4.013138633265636,-0.24986519994874445,-0.6007223219932256,-4.248595065234824,-7.483738985748576,-9.831181592933646,-2.1524926182493664,-7.831059837783667,-5.090634779092474,-5.944256903897076,-0.6539637800348674,-9.371908535227362,-8.019007394660047,-8.152223246803434,-4.161612022923505,-4.738667453618859,-8.738820447383123,-1.6788102740494981,-8.274334770863057,-5.208979270298539,-8.661247072984686,-9.86891506861922,-0.9736498709584263,-1.798750906779214,-5.505516744775749,-0.6271081011018631,-4.787199760242153,-5.590678427672884,-5.9487302026971856,-7.566063501501336,-1.255803162594169,-7.804887235266113,-7.9510063212313975,-5.2743980137441016,-7.048014386488495,-9.38302457666689,-3.092903231951676,-9.382326242403964,-4.532544902310303,-9.994311848875912,-6.052335457618938,-7.20576671899432,-0.9219317798031046,-4.020807270473856,-4.053980439870603,-3.0876482382895576,-0.7802616927748018,-6.284345677680352,-0.10306986784772931,-6.870950921953836,-6.658226525602333,-0.03831132480856647,-7.042196404553445,-3.7941007893853795,-6.4099490403778825,-5.691990589638349,-0.16096912639255612,-0.8595458528220723,-7.454628436621462,-9.62761289846398,-4.580996718263243,-4.673066594926823,-0.7559549998130932,-3.246360164298281,-1.4332550164778124,-1.5159714752290099,-8.511203942740327,-3.36965766883478,-8.12501349131045,-0.027468739962397404,-7.044966270167445,-0.9784726106452113,-8.308979882994155,-9.733738064036903,-3.1340496601405787,-8.072624740620608,-1.8885327728406653,-4.413325632309899,-7.187979693515427,-9.216260836174854,-3.1006041880434743,-5.2716627034184915,-8.302732483601336,-8.627194284369235,-0.5673893447916489,-4.193838132122513,-1.4909858880675375,-1.797089735106736,-9.21810772402116,-0.5643205727371803,-7.5671684277254165,-4.283660963400822,-8.748263934323008,-8.897103874893817,-4.224598107618558,-6.306776545579435,-2.775433634462867,-9.122717546904477,-8.534745557896002,-8.828396834302128,-1.986373857821162,-6.116076270273765,-1.6793823605255254,-5.969196372137446,-6.609974004592907,-0.24659732632308584,-0.646566723015729,-0.6826628945158597,-5.220461893732564,-8.977688757424032,-9.17116168657984,-8.338401427447241,-6.271843731563913,-1.5775234513634628,-2.799648717351886,-3.4868431000789046,-4.82777054766979,-6.659272796944256,-5.920792976994549,-2.443653927024041,-8.838918219893406,-0.28264347570717163,-2.1289531634002112,-8.254332059073397,-0.8594415593814686,-0.9417598854074805,-9.342011374839082,-5.402724590073468,-0.3763216645196832,-7.171925762755047,-2.032468346952736,-3.4796328863575,-5.807530664160076,-3.956845811554144,-9.643056964000944,-9.365146351680202,-2.5820676130190257,-4.279953146344204,-9.110502570937761,-2.4559239543916056,-1.687433412901267,-6.456074256808613,-9.208640910389619,-1.0808817645681934,-4.8236252730388856,-7.403188010225086,-5.355151452587766,-3.2010325196694,-6.167734742855428,-1.7786133618849753,-4.555824872609748,-4.164011736252031,-4.7294009240622525,-5.755616172318405,-9.122430569938418,-9.520421547289962,-8.63591384630903,-5.591310078634604,-9.247605919722162,-2.6940893329638027,-2.1663568110722964,-0.9216227171974256,-2.8130898070002863,-9.03002149282617,-1.8462441623413794,-1.8325263902401057,-0.4849657025665288,-3.1021028783793647,-3.138456646847745,-9.78179409247105,-6.291319876319812,-6.906530574079996,-2.3702552877907967,-7.855805050833893,-4.867718835710553,-1.8010765982492916,-5.486275008463586,-9.617232914285987,-5.1352124388511955,-5.407541744171054,-4.179497552973319,-9.370957275212886,-0.21991728461391968,-5.1422823962939646,-9.258695008090477,-4.428945581997827,-5.900877270092007,-0.9710105522225687,-3.213897498549554,-9.410611977144088,-5.482829201147941,-2.9271359188466772,-3.6507548275555846,-0.19475916780755886,-0.19937947850017013,-7.4764830972018075,-0.27182341740466187,-2.4117891311667483,-8.737026429885734,-8.661634991075214,-4.051561458187369,-1.5383990736594688,-1.6759302169768109,-3.4315978182274987,-0.909604318217494,-7.361792446683637,-6.5471785399053095,-1.1026690690600782,-1.1381594919915572,-4.3587475698093,-8.81937512692794,-6.4811555201429005,-3.1115011720442842,-3.8903887970550644,-0.8876970886335545,-0.49246286783658055,-0.22231602762874614,-8.109068789742954,-9.904231039950648,-9.50381373013826,-9.308673606515441,-3.402047522094298,-5.729431122403081,-8.303336387314236,-3.5037095954430097,-7.021443718181177,-1.0024071873102858,-8.592802169671128,-3.020735459732631,-5.600822641628714,-8.748401782015716,-4.935534580261889,-3.259345278496517,-7.5721067313792645,-0.6150440586180439,-6.017467382595751,-7.0740780431599255,-0.27170395349040977,-0.1996072253104053,-8.290650001502959,-1.7473642813367452,-7.397094083036924,-3.886949097286627,-6.8098182571571275,-6.941959987865585,-0.35460807010100126,-8.507647752047037,-8.393885137885011,-7.291671083006166,-8.290411026316358,-3.475751842633843,-5.302564083678893,-0.36494791341815214,-2.901101081273618,-2.271490151131421,-8.809462285173115,-7.056558097718604,-9.345106698090536,-1.6561902054604283,-7.702243828896953,-5.042877500021337,-0.09544909107399802,-5.363811619795076,-2.966795106785236,-6.554287489055753,-0.9657197812321039,-3.9734021828470745,-3.4012716260183717,-2.458782394451864,-3.0830380389689926,-2.1372860984345343,-3.9675863367194286,-2.3679681889516235,-5.7553585341384945,-8.960518761757726,-0.6365520471158415,-8.62139266562625,-6.564928874482856,-7.373024683646367,-5.680599692830555,-4.768694261460988,-0.26743130870874987,-2.5804195074345615,-0.3454123695472977,-7.9263209596534505,-7.898206518835811,-6.049281268014179,-2.1679784940696067,-4.248519164330203,-7.695681644951189,-7.9286491323985935,-2.0611177069424613,-0.7660386098988181,-8.945781108800785,-9.720502096268362,-7.739947143990205,-9.096255415254916,-3.4169889788391994,-5.1276727686080825,-1.6185301934633411,-7.399977882109027,-6.932424998682752,-7.321363815768542,-2.0483518980776827,-0.1313335748182376,-7.9415219440433376,-4.087011859335627,-2.6949797471039494,-5.01932613895665,-7.836411059754722,-6.330293519840849,-3.683219775077524,-8.385946089605449,-8.860068463076502,-1.9004938918706715,-6.981436804040575,-7.820952028409717,-1.036280705393211,-7.556066902446082,-6.860535829081506,-6.995330612480162,-3.000695809015319,-7.531415658471479,-3.462939887562173,-7.775888960347876,-0.7726338109836006,-4.8905241926989635,-4.098514811445899,-3.2861072134281732,-5.656979859907976,-6.015876777486335,-2.5982607569868055,-3.897983644747216,-3.496885006813144,-5.795176186536,-1.9835184520291982,-0.22197929185925336,-0.6535881647071395,-0.22606808059663974,-6.900957329575084,-9.51980659468262,-3.777674176474035,-9.236952416823875,-6.849151058946578,-7.199601188871063,-6.4259361716561365,-4.5876504545876635,-3.271684976071423,-4.685296255311291,-2.5668574582984593,-2.662956280670319,-9.624820284565343,-8.783563243249882,-9.77393570689901,-8.964491599779977,-1.158917158959878,-8.295392297291981,-7.2390536398491445,-0.733016240302129,-4.512845779369197,-8.890993667634596,-9.689792493476793,-2.3000692568507675,-2.6666216100509765,-6.274165420930031,-9.973998566011522,-1.8621132180876043,-4.399150867537238,-6.398721767354005,-4.536872198362369,-7.856629609943941,-9.019508412057194,-4.760946776987447,-0.1456769593298013,-0.28217196858823623,-0.3022294793697,-7.636443122564205,-3.713997471121009,-9.1518233757594,-9.743582394955599,-7.685197823833962,-5.34470206355806,-1.6129456600108738,-7.681783544918385,-9.845947787876685,-9.881914149855689,-0.39792399809559953,-6.7081092352800376,-3.4145327549859106,-0.07616733171450729,-2.1585542012817283,-4.001448921846507,-2.18149858360277,-6.3383461981595035,-8.465686164994647,-7.60234960784175,-1.698937069227755,-8.241137253499659,-1.1534710976099838,-4.664940709553265,-0.6600316051913913,-4.8119108306340515,-1.0325742550501338,-6.614719789894259,-4.1190195433711025,-7.5942730299876615,-0.8381532893894139,-6.075442144573701,-3.878923245298982,-4.855288017294843,-7.015761424472499,-6.821406125410152,-7.043594611978574,-6.051047346732159,-0.9533998670812949,-3.816148587847319,-0.5617982079314143,-5.966150094720013,-2.5879298147021434,-8.418263237014367,-0.15208800187318516,-7.973186477689516,-5.217304537661008,-8.221351273647329,-9.058944525543556,-1.257763307967823,-6.638487670352933,-7.657914036940639,-8.86602678658624,-2.462479870666141,-0.8682704104487504,-1.5259824052104443,-6.253907616194169,-7.949893086746753,-5.824905589201352,-1.9448986645685062,-8.119312918021986,-1.31388652496637,-5.657739785430971,-7.178632094873589,-3.786721579061021,-3.8287238775141175,-2.418438420495961,-3.833692472050547,-9.085128005030745,-9.303626224458219,-6.54520150748435,-9.86192807003844,-9.042592793218471,-5.232631797304792,-5.29166280153494,-2.214753519130177,-0.10271414884680086,-8.758362093078109,-6.794102558180837,-2.5666296637358177,-3.8826350544282917,-0.5773088239714808,-8.846945021350017,-9.481821310224035,-7.876524527288556,-1.2647748117463564,-8.614670373411712,-6.598102486768278,-2.35378087161239,-7.962808139849917,-2.0384838978964215,-0.6858131797339007,-6.062217014775002,-5.990898193122625,-2.6100303931597546,-5.75433677229017,-2.3696981537641637,-5.2087974072170296,-2.7019009957011986,-3.0916040325679406,-4.909526006834193,-6.5354786397617985,-8.544305607286532,-0.09859553579185887,-3.0479610145043723,-7.994591039371743,-6.178675380111387,-3.285402005910334,-4.68813420468191,-1.0949156707141428,-9.271595731513534,-2.5527124353696773,-7.640313511815737,-9.440929847327551,-7.492871369571478,-9.803676259035953,-3.563410042441437,-9.507830304551792,-4.313241832802037,-3.8082562708718615,-6.5833246263107625,-7.4074277808324425,-0.9195858332181772,-8.090799432787588,-0.731451834320449,-0.9932418502232032,-0.5339111888374215,-9.623772098511816,-3.5056744101207338,-1.1489684837715575,-5.406463489488649,-9.07961849683658,-5.173488937194599,-0.7615805195885317,-4.840298625622332,-2.3047662413989167,-4.083728151615222,-3.1297254027177646,-1.6411396621017627,-7.371514780325787,-0.2525994407745369,-4.90975467295695,-8.032857793591177,-4.662233950079071,-9.219785160482743,-8.440750245009308,-5.747819292983307,-9.330753002501826,-1.3700614060159588,-2.088100243758242,-9.36016759798693,-7.930057797793449,-8.825036212387998,-1.2732486158374523,-1.5190336023610107,-4.679582702124801,-4.8111841179869135,-1.918731897151018,-2.7571199676609237,-3.9256579777214773,-1.3045527811460178,-5.429594971777303,-8.916708433240858,-7.405898617515552,-7.9938047254025335,-7.700478729141647,-1.1377372294084576,-4.374106965659735,-9.613801089753897,-3.78754962331465,-6.744123801500335,-5.536338533853982,-2.148416952241252,-5.055260031514377,-3.8178487802899497,-3.889024977336928,-8.616747452911541,-9.131710760295968,-6.737420763865707,-2.146070581368451,-5.256085405847668,-2.3182750706082667,-4.25331627438643,-2.8946374626787286,-1.4002520196578128,-1.3286977533461286,-8.650150656653835,-8.878688932735644,-9.041643452595238,-2.1974942401429853,-0.1798762103348306,-9.382819350634984,-3.1642420051636466,-9.150607464418592,-5.4880052244147,-4.458690069825453,-1.0038761132979634,-0.28977018987121017,-2.4065975949585194,-6.355485521109701,-6.894763662066865,-4.218570796616408,-7.562507248518089,-4.508609942101556,-7.855465599984893,-1.02583418723315,-9.321316357715858,-6.513511186097065,-5.447644162045573,-9.934746061840563,-2.2734664206429023,-4.8658259526490095,-3.0903028081476136,-4.238994324587136,-4.680602159870794,-7.689828270834623,-3.7026084658999148,-0.7701988296942419,-6.293111752808096,-6.645030595701202,-9.020966908070234,-4.316904342231142,-3.7997066895715337,-4.233494034561067,-1.2763923176618253,-4.589905752363423,-1.539480324847886,-0.0637847466839081,-7.1514805876128795,-2.3674536757015496,-6.301353549921103,-6.410228917689798,-0.8385804963862342,-8.116945173773594,-6.595369005016467,-1.008173821659859,-5.64676106372584,-9.08577500758193,-5.470148716588826,-2.207619378986212,-8.685413855759133,-0.4438357746244881,-1.2059228603080552,-2.6126085066929816,-2.501494401827231,-1.240370857982509,-0.8517262351799393,-8.760395047849299,-9.180293561916844,-5.071416108241504,-0.8292800777018616,-5.919107458090203,-9.938792621131283,-0.10848508265494994,-8.65433656954491,-8.071212297725756,-4.5461413766399765,-5.873482553639464,-6.559838333383734,-8.924427544543772,-1.109101415136604,-5.872039850317257,-9.528744348576122,-2.7126429685750253,-6.390806293375373,-4.91266668155477,-3.622475132575096,-1.7053967148859894,-7.609673812358977,-3.0798720986936257,-7.670698935765474,-8.252791317196255,-1.0064825316482229,-1.0617502233996423,-0.3080828247809908,-9.145117082578494,-0.7374166875752941,-5.002615761268285,-2.643427372070337,-6.71104314214598,-2.4913807628235385,-6.9651220243952805,-3.1629052543432112,-8.168769976077947,-6.599868221831495,-3.6460306756202288,-7.432325144732976,-0.5298023948414832,-2.495941025605608,-6.0389452786814335,-6.396733512164181,-7.572073330412676,-8.185385414670174,-9.591420370694122,-3.622102602112953,-8.928462809200388,-2.532704547920699,-9.976146381771278,-0.8349695303109783,-7.143113175012175,-5.027082466055502,-5.4836400624885195,-4.712249479380706,-5.74922699503424,-3.977681074210906,-9.07261389445193,-9.224460779734489,-3.6535338493016867,-0.4740156915223026,-2.6797716143691153,-2.347901384872606,-0.5636662738830989,-8.20480731545181,-9.161911839955724,-5.876143307562931,-8.673038486616491,-2.5405042034413317,-7.8625544474976365,-2.5283300055946545,-2.4749649976504307,-7.378590422118167,-9.973421318629379,-1.145394148258243,-3.5014516022993547,-4.068911331571375,-7.983209813923824,-5.128668526904803,-7.251076489310764,-1.4165043343455186,-7.730209739438408,-8.472272572128388,-0.901331992819856,-1.2298742464171375,-6.607447930724977,-8.62820376297546,-2.020539639411014,-9.577443658007333,-0.11759514135912141,-4.256156651849565]}
},{}],105:[function(require,module,exports){
module.exports={"expected":[4.706737494631647e-37,9.95935998992214e-5,1.3302707748077982e-6,0.002081788190911965,0.005527171007724199,0.00040585104251389625,2.457189081484206e-50,4.510178403047713e-10,8.802813838335241e-13,0.00017063204117392575,0.00014882818551614012,0.02565544639092896,3.0370628571513915e-7,0.0014338137064387607,7.511035718701009e-5,5.065269847189183e-5,7.830985149351621e-8,3.272262643959183e-7,0.0012192989637619558,0.008260812884993234,4.2946865082087347e-7,5.756457750596012e-17,0.0032076794166322918,7.548951079932155e-7,6.402457146366411e-10,9.352216595105824e-82,1.6003509715397536e-13,0.0030386854544135547,2.420986326355472e-8,1.3628156829425708e-11,0.00012011430944955105,5.881887004593562e-29,8.764736384054631e-9,8.58651658580127e-6,0.0024800592351128022,1.5931338077262243e-9,0.0037478710997806254,0.01150072036929035,0.00031931924103597935,4.2594830285106974e-21,0.0022760636799140327,2.7017016254187723e-5,0.0029530490604467215,0.0038214024503525233,6.917259226238944e-5,0.0031462693690348913,0.008517598837509997,5.070315439256136e-7,0.00012283244014608594,9.626318179020522e-6,0.0021229061432404546,0.002758190087874924,0.0006530611339399096,2.779300885045476e-107,3.6038507558487136e-15,3.728551547590718e-5,0.0035940328049229326,0.0018454478692009676,3.0098710575276944e-28,0.022618753836644225,0.011443884150037428,0.0005663507445506675,0.00047320882261185794,9.3033579119767e-34,1.1415681715397598e-5,2.6326927730275014e-7,0.00011956339136074353,5.263461955767248e-23,0.013764180855844979,2.7058006210245775e-10,0.008766892724290223,0.0032644857343899344,0.00951105879991075,0.001012202480150946,4.5619955302208e-57,0.00016957967560344878,0.012422843802060697,1.5117696222557714e-5,4.5568620924990996e-77,0.008883773003778656,0.00020635420453919408,6.575708034047104e-31,0.003443020403492374,7.49844593302975e-9,0.003187505246961258,3.6239669100423325e-11,0.015588849818615667,0.0095413201303788,0.005410446269108472,2.489520995082741e-7,0.0047723155117423395,0.007832334906658547,9.159689345003472e-26,1.2374282593340694e-19,1.2790245227431017e-16,9.029605408251837e-15,0.000237002421194672,0.000831246142768288,0.006982483619470234,9.840671463049033e-13,4.015195765650361e-27,6.682081595292443e-162,0.00417460465464319,4.3843293335909386e-6,0.005361288285805616,0.01718685805570273,2.0271245247403198e-7,0.0030890295320615078,1.4537266649896563e-13,3.566764359390978e-10,0.002898352996705076,5.371637454232229e-9,0.0031906939239738806,0.0016528082779574118,8.902976852464216e-5,0.013802088116621983,2.6680743426587686e-11,1.2968828152953448e-9,0.0021510314213360193,0.001645405412997538,0.0,6.191808025143699e-7,3.053911675582873e-10,1.938632033171432e-7,0.0027320618773499054,0.0012072750302140015,0.0025904010722315237,0.0008000260369738837,2.64262330965205e-5,0.0030507085133022337,0.0002931035072317037,0.002175473905074462,5.70156589524573e-5,3.522852255211739e-35,0.0013100999306485189,4.796420892664972e-5,0.00029155885577527516,1.1901528921740735e-20,0.010650830155406334,0.0013204394766221897,0.0017112507283767783,0.00248894107261261,0.00016369758065838599,7.522145639155247e-5,2.6406346321090743e-5,0.000305796287676495,0.0004991365413808184,0.0002608708920757892,2.420177154936418e-8,0.0021780477601619237,0.0007955007327829848,4.682187517727981e-38,6.37288055600411e-5,0.000999984175431755,5.312566131327926e-5,0.000265869587503586,0.0001078459849369692,0.0025841425736691064,0.0026208663113023454,0.004338001042985753,3.5788719029663524e-5,0.0007926225274224019,2.375814113077209e-11,0.004723929096568041,3.204382739217247e-5,3.550600478700468e-6,1.7505600919866246e-9,0.00518160053997424,3.831503623115408e-6,0.001878860557110602,1.6907278537878266e-7,0.005668465619504502,0.002223521428648112,6.562476518378194e-13,3.9710747164189e-10,0.0001022764917579898,1.8686809068852212e-7,0.007698879193248582,9.866001293139143e-5,0.0005334425067806618,1.616797475079946e-9,0.000334297354378722,1.6495889118198783e-10,0.0008253440894594424,1.0890697320297126e-6,3.20912544140553e-7,1.7299981159859752e-12,0.0,0.020134947675819075,0.0010683715360117793,0.00019534162487901073,1.43543921864449e-17,6.59553639742216e-9,3.7396058384015397e-7,7.177363278020865e-10,0.0002451276540209434,0.0001284732854374751,1.409952546658046e-7,0.003048950543964684,0.008292058719332784,1.615741014494266e-8,0.0028305526596549804,0.00729338276913583,7.6691323899127e-8,0.001031368899537468,2.9032903774331877e-9,2.3282524359895766e-15,0.014809921971215277,0.0026791992691037273,3.33173946423223e-19,0.0050121352999926636,2.131497094951911e-6,0.004340658962899839,1.1788526136844136e-9,0.0021354201063248455,0.0074598075735435344,0.001345496743921315,0.0012361457716656443,1.1794809639549058e-14,3.9780580785521556e-8,1.4512324695243004e-7,9.567952571357894e-5,2.642737013040174e-7,0.0013851049959425904,0.0014462388624643808,5.791468764753157e-23,6.242873519386617e-5,0.002241857128494694,0.0003782784286549927,0.0016974713805023637,0.0009008013309824994,0.0004749881630673322,4.08045679761373e-5,1.9655181381825276e-6,1.0177360546215497e-5,0.0014575671596051996,3.055448866913819e-7,1.7181961905355112e-18,0.002515327635132715,0.00487920640646397,2.278316039830282e-49,0.002346190279176744,9.448051647392519e-9,0.009364452203233396,1.3859382164987953e-31,0.0022924225132188126,1.0010360592785944e-5,0.0009333444106632525,7.094972810719024e-13,8.657087345425182e-8,0.00016003633096870303,7.5682580555421e-6,8.641058504517914e-15,4.577598214879677e-20,0.0014077621272095757,0.005805962353048496,0.02147163075802397,0.00859059978493689,0.00025518569611397056,0.0086178611197884,3.795038393175385e-6,1.602560543358274e-5,2.5887780677495082e-102,3.656565197781032e-14,0.0006248333635856994,0.009655508028405119,0.0013569223370775252,3.060900089539887e-5,5.816793048036661e-5,0.005123759082961959,0.004369320534242103,5.138040425619663e-11,0.0007296358189982364,0.0050729164154947855,8.195967838716999e-6,0.0008757641129900468,0.005190753949616128,2.9683249075403392e-50,0.015523934315233676,3.3071756712593375e-18,0.020284651356306985,2.120580751269799e-141,0.0007676028188918838,0.0009523516106615104,0.0,0.0,0.003788385497299647,2.124593862856519e-11,0.006581406550583426,7.083114757768988e-5,3.0840667352087576e-7,4.762705667429583e-6,8.698460038741856e-217,0.01023418295242765,0.0008896719446014069,0.0013265129530944996,0.020832792792127693,0.009569116536775266,0.008689565200570125,0.00039609365935776373,4.870177695479749e-10,7.182450103099738e-20,0.0,0.0018407729692361337,0.025261811456451483,0.000979076729537891,4.6118879302172045e-6,0.00323526906281811,4.848234027613178e-13,8.939488999780273e-11,0.0006480458460280949,0.00422445231532235,9.490426498435824e-5,0.005911844251437875,2.3098301292881538e-5,4.1622035037786446e-8,3.2784302451851314e-7,0.0009099605065834677,7.283034275965228e-5,0.00022458860775273349,0.0002405281595890227,0.005292458848812942,0.0032259869452403037,0.0037682875459850483,0.016084745297904074,0.0021384902668979853,3.214406217845318e-10,3.2709560561600745e-11,0.0009409856718501804,0.001073821634389045,0.0011528750162545964,0.0004378622111849402,9.281820056164796e-33,0.0032932085232728805,0.0005968870270267677,3.605997250647869e-11,9.107731409984328e-7,1.355807505211569e-17,8.848302514474847e-7,0.0011000848884838545,0.00011662938307229594,9.200039193724579e-5,0.0009075719407140682,0.0015237164998527,3.4618659027159717e-7,0.0016366652335822692,2.9210435040734654e-5,0.01122408412737716,7.65308162252803e-18,0.00336492987729415,2.547059969822065e-5,0.007670885645970467,7.067035908612242e-9,2.0363295980796396e-6,3.8999819104383234e-7,2.468028565386159e-16,0.0008706643627282162,6.56509282424873e-9,1.0707219907300521e-106,0.0003225261060496688,0.00029438002774658596,3.927732004211632e-6,1.5058059581897598e-6,2.67740042055079e-13,3.693640681294384e-8,0.00610829790074084,0.00124100456521145,0.0036893193713266495,0.00043054824024374975,7.916888291192247e-25,0.02043299518550063,0.0017284984906066796,0.014999882101360103,0.00037350927796469787,0.01243546574391357,0.00078669153058124,0.035893765594263674,5.0630870027668334e-11,0.003610543159141002,0.00021336105640326999,4.44496204738755e-5,0.009701022698187423,0.0004138788179600069,1.3802520101447019e-8,0.004100950698563214,0.008090196879886796,0.0016005905524852152,0.0005206207335233705,3.0560108827505416e-7,0.0001675671742197515,0.0005340241034829672,2.2016093023168607e-42,3.890378541589075e-6,2.0493721026766978e-18,1.8883241650538512e-76,9.383283876701552e-5,0.0049266001099969176,9.934626254052854e-11,0.004332223211001532,1.0807293377993127e-9,0.0033193515650817205,0.002485747823239717,1.242854628632938e-6,0.004211983444140729,0.0031093190332540533,0.00014249599745805018,0.007221227783013874,0.005812628122189347,1.4101587539314431e-5,0.0023346879190945277,0.0006245515473352162,2.9539658319540164e-25,6.941302874500504e-34,0.0001696278490557466,2.3370532583167706e-12,2.147252704688222e-43,2.1443837367178965e-6,1.608161912306483e-12,8.259666929634044e-6,0.00438610095581377,4.371617246404195e-12,2.140528215230601e-15,1.9335821643771953e-21,5.922827963549755e-7,1.4003805877748209e-9,4.4659115008531504e-8,1.8413451829236527e-14,0.0036763176531007975,0.0047593642744245095,1.401838957692449e-17,1.9008190330705022e-7,0.006206811968773225,4.0563361716912707e-7,0.0010758842897828794,0.04570993039314203,0.007085545102581824,4.1342639134833056e-8,0.002367325988146194,7.870447125073667e-8,6.668077329318375e-13,0.0007012754696108902,4.269975837848308e-7,2.144993668861128e-5,0.004382264787255248,4.75907427738213e-9,5.6769627978278405e-6,5.041423508892449e-12,0.005602421807618677,3.4613635494608446e-6,0.0002106245426620502,2.514687868862905e-7,1.7742417359492233e-5,0.00018178900404451919,4.893679365061152e-5,0.0003131077805044062,0.01134237720860766,2.0809498379158693e-6,7.923274464936598e-26,0.025360652450236394,0.010860415732608363,1.053155818600684e-6,7.47394757467356e-6,1.5793962725634633e-13,7.079256043191099e-7,0.01897309149345431,8.36262213987402e-8,0.0011269313890802405,8.470697601660929e-5,5.927926685076081e-5,4.016290788292314e-20,1.2917954988840543e-5,0.00032502059822127956,0.010373783117413705,3.858347321020185e-8,2.265427957725954e-5,0.0005007737580950065,2.1518818292854031e-7,4.416491738856514e-18,0.00016540241863643174,2.855525006491494e-19,0.00023825741076088564,5.6246288729632e-7,0.0021538801402917495,6.116479409068183e-11,1.1585733233028264e-74,2.041720913474828e-10,2.0972150603654775e-11,0.00234521051906573,5.11829989942711e-9,0.005768054891077209,0.0033358024016307223,3.708706541087738e-5,0.0004252433959354082,0.004890861476595532,2.2085530050030316e-39,8.097706045013948e-8,0.0011567793719843445,2.6184454864195707e-12,0.02081222138979776,0.00043931481740237436,0.0016314874457585852,0.016132313849994723,0.0018068952238772748,5.330804582350862e-13,7.44255063107551e-10,0.0008406748684981632,0.0009304511460381647,0.002392795274144231,8.088663740160393e-6,4.76520318556228e-5,0.00012338257049242552,0.00526961576123444,2.6859185714696323e-8,1.1382720263432386e-5,7.356821849440814e-5,0.0009147191778982283,0.013600231168551597,0.00042921524765074815,2.9004673376380456e-12,7.062888843631074e-7,0.0004854880632489148,2.018794757493933e-11,0.0037384058741685594,0.002067463890211358,8.958202427170574e-51,5.744048223536823e-40,0.008656137405203154,1.6862683015124414e-8,0.00011710071959438893,4.562557131715671e-17,0.0037718674717695565,0.0008918480986124154,4.0335842921483e-6,0.0006777025412658903,7.358559298025624e-5,0.0030950930504242725,2.9306155431707446e-6,6.056348197047286e-5,5.845505991634659e-5,5.5468997729833564e-11,5.136929266034387e-18,7.078730369331844e-8,8.69595004139969e-5,3.7048503642364787e-9,0.005513624246709661,0.001432282489258696,0.0005930994977006284,0.006531989735056738,4.187352401759316e-5,4.35859021640806e-12,1.187817659071337e-5,0.0012127824588174473,0.00042350494969048316,0.004744715349108931,9.991683608058296e-5,0.01846906682110603,0.0018500881880861807,0.0004888070823101682,6.90752649850213e-7,0.0004072035760299844,7.1271061552682734e-9,0.0001180243337379519,1.8575124349264536e-5,0.004561222671161698,0.0015315325939278305,0.0009779100346626191,9.049049360215635e-50,0.015502199700889542,2.1365345069427753e-5,0.0068901878032121685,1.837694803176798e-6,2.748027248624834e-6,2.0561536308931427e-13,0.00024187718241700854,1.1610442103799351e-7,0.003015651878174005,4.693629113419332e-5,0.0002866164951617501,2.445545270100316e-6,2.8197986024783398e-8,0.006320890347164385,5.005666538793724e-7,7.544362925469887e-10,4.3872740362479145e-75,0.007153030376039042,0.03351244848735619,0.0026036830042790744,7.769366024358812e-6,0.001624470663740865,1.611570774730438e-6,0.021847331091230653,1.5846367249448485e-14,8.493376799643018e-6,2.8643286680413764e-9,3.172031495816151e-37,0.004281500010140187,8.888604323213551e-23,6.506449554185975e-8,2.844722726886866e-39,3.509756372572936e-8,6.90040746776004e-87,9.998715197599947e-5,1.7651246007512061e-6,0.003028690189270457,0.0005693039496376532,0.005529860388752984,1.4814761200973939e-6,3.10117241649504e-7,1.4669339449266201e-5,0.0007153007214392173,0.00013440908504798663,8.023681336373746e-8,9.070636690649148e-7,0.005949687823900643,5.896424010472296e-12,4.822722503786083e-7,3.637292059166536e-8,2.2246445197784805e-39,0.010939806403325394,2.697867535031231e-18,0.00030626508929647474,0.0034357107236157114,6.333293240746722e-8,1.4856519374487166e-6,1.8812582419713032e-6,2.714829805346962e-16,6.321525384924617e-5,0.00011212319972680172,9.830071393968489e-9,0.00539884103195077,0.0008985988292214799,7.41313541252293e-5,9.247632659937614e-10,9.28298773158249e-45,0.007721123638901837,0.0030994279595129974,0.0006187491342619189,4.196727160386252e-16,0.01035939790620418,0.0002470052362281453,9.298184490130433e-20,5.5364833189093075e-21,0.005530421869335292,2.673694740743399e-9,1.5089686571305003e-12,0.000375799299305031,7.784316152220703e-5,5.147568574022597e-6,0.0024178190017213655,0.01600499901871569,0.007517013838587612,0.000864466249350024,0.011963377614339401,0.010086529696260638,3.9436827920399786e-6,2.76778044755856e-7,2.59316208462632e-8,0.0015738101251156944,0.00436857792907216,0.008611755686844146,0.00015416359069499104,6.688930931907223e-5,9.86682842339657e-6,0.0018391380155424624,0.004263260230891656,3.345782511186752e-7,5.4907037541012575e-21,0.0010551392374724563,7.03400316243676e-12,0.03149016938857649,9.250234198104792e-6,1.2166726483478043e-180,0.0004135492480706939,0.0,7.191202945096216e-8,0.0035830985945281228,0.0028901483930733876,0.0001779662751634916,0.0010167108306097332,4.421283370495994e-6,0.00042588427185414116,0.0026241893884175645,0.002832677580571762,0.0,0.0004989877586305681,0.005249936568848699,1.9481961045247345e-6,0.00035039284883552253,0.0009950179539454536,0.0011073927913882128,0.0008923103610925489,5.685325167600271e-9,3.435301707967178e-13,0.003656800022400053,0.010021438451911429,0.0006956230025291889,0.00045065509989723887,5.227683555819885e-6,0.0030170233083444986,3.912335579498259e-6,0.0053593282716392025,1.2572421994501062e-7,0.0026482017640962812,1.103491208844592e-54,3.656396575247188e-5,7.662473476740502e-5,3.8958198103947704e-7,6.760602953896872e-11,0.000617183995830186,1.5900612327439934e-21,0.013127554886337807,0.004187304638493552,0.011609398501363678,1.2875729369623784e-7,0.0017194240488728777,0.0006245720331337901,0.01808602828457747,7.582372223841674e-9,0.0008009472751854088,4.441662702742962e-7,0.0009645514757484619,2.282841496727722e-19,6.297437563366641e-9,6.46719571953168e-5,1.1465307210370413e-6,9.797260674992038e-5,0.0053905070210526745,0.00023034627714285715,2.4692035732336294e-7,1.6199182659672247e-13,0.0018670899720900868,6.397229213483256e-5,0.003107584115899099,0.00021953699584223354,0.0062455710095343665,2.873771154037404e-8,4.8413582362784724e-5,2.462220468032823e-20,0.0027798756076538424,0.007280620151500698,2.8473138689042324e-8,0.0011334654363788154,0.0,0.0004405532788808003,0.01054744064922658,1.1033842648974322e-7,5.249523908168369e-9,0.007162750150170518,0.025849464655705215,8.220105650203672e-40,1.6895097997184074e-5,2.5190625673389915e-6,4.144549797001673e-10,7.195710451608432e-5,4.279797140033972e-7,0.0016638009520988017,0.004794334366033819,1.3040537994793946e-11,0.0200483007393618,0.00038671940392391086,0.00020822619048731217,0.0004215088629463996,0.011785846411843826,8.09534663695325e-23,6.23342979852202e-6,2.849109087760833e-7,0.0015457422075640728,0.00229606834522174,1.7178019468620628e-5,0.0013778296370975218,0.0074013840580372525,1.0806247381470149e-8,9.665470413125628e-6,0.001560956856939966,8.381060997952967e-5,7.254742748402564e-17,2.04331876067165e-7,0.005764704879263283,0.00024759634872368723,0.008219645527511036,4.724240512764451e-5,1.050519199402183e-37,7.452580808170929e-63,0.0089738483226053,0.001230445510906414,0.019661139528381687,0.0004404712265460312,6.085155801284869e-23,0.0011265139047428796,2.028916431747834e-13,0.004527256385449385,5.638657391698766e-5,0.005810485441847627,0.004276751199055752,0.0,1.641206724796808e-5,0.006216397865115767,0.0002841784577913383,0.0002997261642693693,5.907832035312062e-21,5.2871981701515565e-28,0.00849066031596523,1.3600348349774907e-6,0.0001766519306908034,0.00010106122947471569,0.00015837578709151812,2.449117861286569e-9,0.0017891533340999618,3.924693496655355e-6,1.4631469997188613e-9,0.00920339378150906,1.6410421272426152e-32,3.8120947154472956e-5,4.0152785273439045e-12,0.03410424878533784,0.0034194315112515373,8.268240902533604e-5,1.9790992111286963e-8,4.027163177532236e-10,0.004913517936394342,0.0006062228734171475,0.0004157384515216261,0.0030060142125526977,4.412400479569078e-5,0.00013567687050616625,0.0005020006535209622,1.2735924289454332e-8,0.002579903837980681,6.724478502922118e-7,0.0035550522456583144,6.698231008818133e-5,0.001814016863586473,0.005475337552708674,0.000854494832754456,2.9074343567625165e-5,4.914346415394943e-7,0.00010316967052108873,0.00016760730696532714,8.791229268075774e-6,5.747392283263559e-11,0.001686657364943533,0.0023837250791458376,4.5396512411821765e-5,0.00107045232884524,0.012633361181262924,0.013619646182744874,0.01913730829873963,5.773313619105071e-16,5.729137640854861e-5,8.765785943927604e-5,3.2407571073052735e-7,0.00959106199011364,4.307878814264182e-9,0.014678048814540682,0.0014383513259487763,0.001271265847504425,0.0002831272896854076,6.318493467588161e-10,3.1900117053214145e-9,8.744165770659515e-9,1.3386838287685068e-8,1.725593849921461e-5,2.608458319132927e-25,0.00015505121202846365,1.0474686868714199e-11,6.227128649405687e-8,0.0005823019256631785,7.619738033386147e-11,0.013241055374223777,0.021544093864030105,0.0009495879554417634,0.0014953667013695889,0.006789327592240545,0.0014999936064718001,0.013709239085458517,0.01627168649578695,0.004129518767336098,0.009169442687790134,3.6201357496580334e-5,0.024223243489852633,8.793903813417736e-5,4.502295668302144e-8,0.002820969589988495,5.165354136862642e-6,8.760376623660692e-8,0.0014255868092725116,3.594442766544562e-5,6.5288259430121176e-31,1.8876907573893315e-6,1.9485347213042023e-126,2.0291196431803693e-7,0.003277013311518049,0.002835836719519637,0.0004554397773912531,0.0004509975598916746,0.0011458235702952056,0.0017445488127201753,7.026674173397078e-27,0.001453708316121964,0.008623968446017748,2.8483060845304335e-5,0.007281341736955053,1.0873331336364495e-32,8.209635993709476e-5,0.00358739242932693,2.1485027897640384e-92,0.006991730223535795,0.00459094575808191,0.008108694390020288,0.00028040153539743895,5.195815531538172e-5,2.199856482277509e-5,8.889563937586393e-5,0.0021554185614726528,0.003518485571716673,0.005397064005957172,0.0004478531439480022,0.007480871099793104,7.874933508501943e-71,1.025860700982759e-79,0.011661513757698768,0.0018616872223066218,0.0005945062261647343,6.9231516772346705e-6,5.258233207986507e-12,4.158387924000606e-6,0.010192299280497228,0.019454539220489973,3.0528342275755105e-5,6.250474167869672e-8,1.0703856993611652e-112,0.0015505635829421427,0.004338828401549454,8.530852165877683e-12,0.0033942176363221154,0.008653725130910278,3.2405006805876893e-9,0.01663419915055893,0.004825907767655598,4.589141191613389e-6,1.657419558547271e-20,0.005040706055918769,0.002374678543399196,0.004300656112916738,0.00092790589259575,0.036769031523034235,1.5855955011848574e-9,4.154572482182154e-8,4.05710496893232e-57,0.00011797988478102398,7.985950340175962e-17,0.001406915222143516,0.0009044785860862649,0.00020370682277654135,0.00144846469575603,3.054624660706022e-9,0.03331594901065416,0.0022554916223091804,0.000266463540514405,2.1855952369422354e-8,1.6417335888510436e-6,0.002177910347192915,0.009592129078561057,0.0033363336689785214,3.430332900112504e-6,5.117536827557012e-9,1.8443020586540157e-7,0.0014352027026062724,0.0008045553542919364,0.00012255050683552737,0.007596792121059633,3.956241519778995e-5,2.45009342495188e-12,0.0027242744825705144,0.013769956006284336,9.88297491001955e-6,2.1792514454262686e-5,3.879413942489922e-12,4.757488198034906e-5,0.00031752327214025386,0.0036566025092272937,4.7032791571730606e-29,1.0446973286415624e-6,0.002881152314490419,0.015253903645196978,0.006555422241936294,0.00028527016206201643,0.01022007526308125,0.0001786492458158337,0.002290160216852657,1.2988316338376445e-5,4.77162295183566e-7,9.76848389658406e-27,0.0003894955219913554,1.1179054563650013e-7,0.0012212599172668154,0.019784651190764273,1.7187612895183434e-147,3.442743117746551e-8,4.198438799213839e-5],"x":[-13.93372803160478,-18.149838213472268,-16.832047371682076,-17.938505144807163,-15.436853754198081,-11.975097287083813,-15.336411988853104,-13.852181847962857,-14.798358357734312,-15.415782815963105,-19.583264605776517,-11.865431428113311,-10.64214007621045,-11.459425862816769,-18.86347745918546,-18.622353086006715,-19.469089820461242,-11.86777684999771,-16.224065164184363,-12.043593235747473,-11.18804154143912,-15.763871931052755,-12.924839715372956,-12.237850309872247,-15.844439009295678,-18.576353839406483,-12.175125483612241,-19.13530139451176,-15.518145303505879,-13.700444968843035,-13.761031577253958,-19.002895723354307,-18.445153270286227,-11.624433317895697,-10.554195742356839,-18.350685789616065,-19.746458025314784,-14.008892068905123,-18.188209083619267,-19.21002143691802,-13.278161979161101,-13.724434113852217,-16.29039745405376,-10.808258158643318,-13.620137819086422,-16.57257304831498,-12.19090506325044,-17.308580620668813,-12.702434541392659,-19.157885188601544,-17.004537986817382,-14.88067632010538,-16.083478990112777,-12.35028445832735,-12.811162420302102,-16.474322677282206,-16.033478306452157,-10.021718904499119,-19.15429470628059,-12.864888891110882,-10.14632914242749,-14.777241312657283,-19.80302344205444,-14.21235773688333,-13.489789510054045,-18.58443329574123,-18.709651915798812,-14.758743722790047,-16.24440260842048,-18.162338256713586,-13.775633467517732,-11.35148550338275,-13.075154729053985,-17.132110420515026,-16.89521805941355,-19.77474406847593,-11.86449815079493,-17.476886987028056,-10.183808390435598,-11.03179097736097,-13.633860067076323,-19.94696849739568,-14.016742545241685,-18.50658386790738,-19.800964084192156,-19.595055510998783,-13.469283787512671,-16.171650075726188,-11.367135251682193,-14.937342997447374,-14.198603862919612,-14.331119171672718,-10.524938401173191,-10.859360162520652,-16.10318643935542,-13.837865973046878,-15.75617477735863,-16.807078918445715,-10.335061012338418,-19.92331038567573,-18.625707381028032,-13.493176709395456,-16.593326314458842,-16.74156012753521,-15.42677294351474,-15.223557492445988,-11.460265167162603,-17.25826536364619,-17.89512715974366,-11.684042986234033,-13.504349192079172,-13.244035278597295,-19.51451435934665,-15.11429428827103,-14.894854601630483,-12.049126471532237,-19.203556241054134,-16.485052510373336,-13.742054556511214,-11.087181517780667,-10.43049103580238,-14.646381694649149,-19.730246913238805,-17.120029873015504,-16.515256654568365,-18.077661576614208,-19.03384597340118,-18.71234074691013,-11.48217353859338,-11.90638484235607,-13.863883075167134,-15.222600262303047,-18.21049947289049,-12.008226646505696,-11.499620767082474,-17.908013369771446,-16.4115839930527,-18.16333199356799,-13.992335483211406,-13.210627069240871,-16.234517438643202,-13.188685782921466,-19.380539670127238,-16.597348246816356,-17.363004539564475,-18.97071776838685,-11.079614079469525,-16.63140420351645,-12.972671750198561,-16.171575109852725,-11.055472765274812,-15.616616162014223,-13.09008720578773,-19.57819766466683,-12.951983551280037,-18.352616108034102,-15.79205302774152,-13.864429189437224,-15.7362774013684,-11.664248886938154,-16.361160929121265,-13.656597513677944,-13.732630797719876,-15.48790125037172,-17.981394210998864,-13.838705530455558,-13.738381398300529,-15.40935738311515,-16.36884175649097,-13.739444316361283,-16.411271067895893,-12.310364289072652,-11.029726820827266,-19.625106752984983,-10.55789426257068,-19.468343531927268,-18.234880216824262,-16.64015737969496,-15.882394084327927,-15.444920846668031,-17.276521341613492,-18.709579767164296,-17.069426778022812,-13.330630471023085,-10.068925484805373,-13.187103214342908,-11.314880284386348,-16.125606956619315,-11.463110419660527,-15.572537323356743,-13.451875131810457,-17.986304683526168,-18.380559839195868,-16.586640478812477,-15.767018399821215,-14.578213109918552,-12.945643603545456,-17.09196596579461,-16.54116529304463,-10.378668451764455,-19.897723516020662,-16.51678447210592,-17.05988301465272,-11.016942945724024,-19.050475408266824,-13.424483686916812,-10.767490606727224,-13.479444049515974,-13.575650574302742,-15.95769890398962,-10.605228669105124,-14.455447227335851,-10.552796482938518,-17.758934816465924,-14.817677401780333,-18.41830452512807,-15.815968480018178,-19.996805245844854,-12.188110272721817,-17.07853385172116,-12.154945737401308,-15.481056695955731,-17.468774100336432,-12.407491367631687,-18.289942105275824,-18.863823648534314,-17.60602017633168,-12.439761883915638,-13.876256386478849,-14.2904447957855,-15.052806730206285,-12.817319060058818,-17.399572888022508,-16.819464788270825,-10.71721591565706,-13.68721928441273,-16.204392370541644,-12.493371995506164,-12.100844919401414,-12.729810470779983,-16.50123127298069,-11.247687120661142,-17.642413256565067,-13.52519438128239,-15.254484422755585,-13.742102733788421,-16.11936179607349,-18.67313160818202,-10.947695245418709,-11.88541689882605,-13.71649468985331,-16.17699337787473,-19.76382373114482,-19.14664256986477,-19.341357055582694,-12.499536023028323,-11.41713971982207,-15.160780863348176,-13.301419928121865,-15.632930992222175,-18.20230007739716,-18.442676614635726,-17.22534176447821,-18.18807664372523,-16.05380589896514,-10.852561677276087,-17.531697900688748,-10.046667301410663,-13.33210285583506,-17.298448902924914,-13.268835165548502,-13.376728338748102,-16.876456089329487,-13.077890655210895,-13.129698921460369,-19.865892378520606,-16.71537436014691,-11.585340378621527,-12.236653700645144,-17.825426219508564,-10.083189412328455,-17.755170746852784,-15.304557965539358,-17.098935218980255,-13.69454472299285,-15.687163585906056,-11.673372636854495,-14.314784655816723,-13.522932243564721,-13.526614473419226,-16.694295770140382,-12.141495824930985,-11.459172407869847,-10.677736274050549,-16.52862264741851,-12.730102111457413,-10.304615799064464,-11.57874612595856,-13.92772982654453,-15.806679368812047,-16.865796035112563,-11.45291751539802,-14.502835597409966,-19.36013067009591,-10.687671864941418,-18.050226392350282,-18.00830770550911,-19.483225996405427,-13.767822942204049,-14.742819994832239,-16.970198132733906,-11.745500307299729,-17.980819773512074,-14.677569551631294,-16.879484115360583,-16.41100948892433,-11.61779258461168,-14.626855074731031,-15.183840566250401,-15.859489092012591,-15.991775362624281,-12.533203321352879,-12.25045555408249,-15.706468935523043,-15.982573273174054,-18.29084678832595,-10.781844087662622,-15.906768500470577,-18.8847229976444,-17.083395707925497,-14.818434191079549,-11.644378485553851,-15.853207052098925,-13.143417431083602,-17.07466120507831,-18.54602503028598,-12.755571903729205,-14.030062277610082,-18.817168403941054,-19.68500742042069,-13.65858124053876,-19.642984720366258,-17.853621365358837,-16.903449675359006,-12.866454634396147,-12.11705370010124,-16.769848938474592,-10.03037359773237,-17.7660156005346,-10.566011490935338,-13.10819726725027,-16.104585553786983,-12.793043707147708,-18.909867569691464,-18.194262172598798,-13.380009178746203,-10.45902295823976,-19.896857031953502,-18.54561983991963,-19.34724226457639,-19.627395363635834,-10.623788042518903,-14.228789036891246,-19.509960655884846,-16.417619787693802,-18.52967710963517,-10.340815002733233,-14.991562189827102,-11.959592684795908,-17.5905608041761,-10.59270498363891,-19.00007605490175,-13.292892664281029,-16.76510128982731,-13.442241317361958,-14.526368412686189,-10.587279705984072,-14.492329346063393,-17.059193850492708,-15.854167760841474,-10.831447443297819,-12.868080717250763,-16.463387879934825,-12.415450809735633,-11.51141137227892,-17.5270545485052,-16.215111206794685,-19.320139294640914,-13.542142483361557,-13.78438849008774,-19.09333175233547,-18.73321042224714,-17.042129383363594,-18.41511054216175,-18.46795834758736,-19.0169388645899,-13.812433221653828,-18.18804816890189,-18.822876733398807,-17.962417914323726,-16.3350892287121,-15.918956933875613,-14.95827916535064,-19.13017473749309,-13.085021912438288,-12.992777416975738,-10.524151111962489,-17.667273815950637,-18.96530446963814,-13.025521250228598,-19.86090327959738,-18.00468407634935,-11.677316290294046,-11.521738051305896,-10.843596496496453,-12.55512288350618,-14.440178035813434,-19.534963137934408,-19.596510142791875,-11.005536939083743,-10.357193241392403,-11.944711116246205,-19.8855452608421,-18.848426256383153,-17.205785506370756,-13.58123821527768,-19.018272670472356,-18.372730183560783,-10.14841991563326,-12.874147829336769,-18.040294845908345,-15.69247353505566,-19.768358180255397,-14.942242222349876,-10.181001890277932,-13.366523583770832,-17.342823332982398,-11.33930870008815,-18.30760219048142,-14.225422610851,-16.494391491403878,-15.272202446697246,-10.164837345556396,-17.13658252797772,-14.550511942861906,-14.990167360453386,-18.837946396593985,-11.152868341967633,-18.377115053925984,-14.561448837255284,-19.358638688583206,-19.455767806832686,-11.159425346398526,-14.887266747310617,-13.529703577650498,-12.276161660406284,-19.306429648962805,-14.332863349495122,-13.499523605421968,-18.101570967446946,-19.088005384134444,-17.26708597637754,-17.257912434263,-18.35935779461744,-10.64514724500454,-19.117203873468608,-18.182348742875885,-12.854864566180868,-11.506800674028945,-12.596342445337283,-15.204737900552104,-15.179315724330763,-16.54501707975662,-13.481021594196054,-12.532953671035944,-14.119945832623644,-12.200103742654164,-17.740619894644485,-11.928573138441296,-10.318681903413566,-12.239832577557262,-10.441275148019502,-12.035246952158303,-10.327466227406305,-17.675951848784933,-19.197282249805053,-18.047588353029557,-10.914214169036017,-14.706737512297696,-10.086116577142219,-10.978145204393396,-17.053074318930804,-16.475431510149097,-14.921528729386083,-19.998958599760233,-14.965461535399829,-15.943423208554604,-19.367453840172068,-12.71787450477417,-15.405932138442287,-12.19610180611408,-11.95267121576733,-17.540749299756147,-12.174081175714612,-14.845746176685912,-12.015785738275895,-14.818964928740039,-16.688919249113713,-18.833927957820254,-13.167714013719301,-11.373422281135067,-12.022939066622742,-19.3199167449338,-14.428466612612558,-14.095867206274384,-15.678553644555283,-14.895226253542935,-13.273480238030423,-12.895096375854143,-16.800372276206698,-12.614415214112881,-16.589374241552168,-15.68251001398017,-10.499773874465534,-13.70805879191256,-10.026495007651805,-13.15149819764158,-19.25797436049531,-17.636836648114954,-16.81480062826527,-16.204785331847823,-13.744981862906013,-16.662922827272325,-11.157159933218379,-16.72211786257821,-10.662332521903863,-17.64855958205211,-18.47991158020306,-16.40160971791976,-18.38411939682682,-12.833911234769484,-19.486272934443974,-18.71479913225929,-10.450984208762709,-12.76586473507784,-13.496891902991218,-13.80424473834527,-16.468379544964645,-15.331677860165652,-10.602667598927273,-13.622594199476017,-15.890811025497932,-19.669167609129808,-10.724487789717623,-14.088758076473232,-11.381522309061125,-15.502121428780928,-17.211458813713975,-13.370936786833532,-16.021489640052565,-19.727682487932235,-10.729432280630895,-19.7589644967227,-17.347757768582255,-17.206946294408432,-17.361357602465187,-17.202830658248498,-11.689321674054325,-16.833105537388,-18.989984849978715,-18.563628811983698,-11.784563770666157,-15.140944351221059,-12.197732578938723,-16.185792363692894,-16.545298607549142,-10.391154571074797,-12.932545058803273,-19.827940402946822,-11.804410522059868,-11.855836070570353,-17.52532833982159,-15.679712126722933,-17.006309480731506,-11.176882092564448,-10.304466293810409,-19.255257197265937,-14.83982268807817,-19.90187327379324,-14.902064522249567,-10.833676693397297,-12.258627760968617,-18.82693755637128,-15.440027349655592,-11.12545393491663,-12.384388617121173,-13.125594321960378,-19.152824313862915,-12.368947362042897,-17.305899902514845,-18.49276846123082,-15.77927410731822,-13.259363864059967,-11.154348212208944,-15.98553789279054,-12.366697511658653,-11.383970330295455,-18.314401096360413,-14.379438523783094,-17.688364592479875,-16.648992878211352,-12.453968747550725,-15.921812675266576,-15.01984077484622,-16.904958238069607,-15.579932551136169,-12.925962544446726,-10.16287745038121,-10.126660660156535,-18.98149117244689,-13.807635121126221,-15.072159004499445,-16.327810180498066,-17.371885511222306,-14.781972581591507,-19.00914256119352,-10.978353099505958,-16.403336223712845,-19.291018253931817,-11.241648577929498,-11.616809600019995,-19.35863612777438,-13.027375261455255,-19.558993632387953,-11.731828424478262,-16.24617815671734,-18.69007685634664,-18.09752888159361,-13.970763051872693,-18.215762051480795,-14.162231034103566,-12.367774080687335,-13.66715326585916,-17.74491523726782,-10.821641405707805,-19.091016061802893,-17.40639678197357,-18.012462430570498,-15.312650943639612,-11.044759750563134,-11.47452428781163,-16.832768807298145,-16.232913538066992,-13.632183891832101,-12.381185425812724,-10.762839012600388,-12.644049422740641,-16.848237345500742,-16.057847914723105,-14.938827983844575,-18.23042914250081,-15.900945320552399,-14.680143723309735,-18.604669861836015,-12.715258601726394,-19.21893618252569,-11.780850927216672,-12.660333010343647,-19.62279519388232,-10.032060423171899,-18.744658043783872,-10.807960716761736,-17.052252746829314,-18.79724309223912,-16.191257990743853,-11.470862650425532,-13.041113852503297,-10.954353651921359,-18.864165387515744,-14.03263257752187,-18.748581348685782,-17.83780160228817,-14.455095834319522,-14.51048841142298,-11.289780027833773,-16.01373947479905,-16.562923971161467,-17.498744152356725,-13.281611049320079,-17.171925504074416,-10.88520595082533,-19.95436627961031,-14.58492216118946,-11.078881759903327,-15.307289243870304,-15.360281630801616,-16.988487576308145,-18.937720937994214,-13.872219829710666,-13.219785649919224,-19.774386664976127,-18.590328267211657,-17.793302443934685,-15.447912172595885,-19.904167777397547,-14.806334423472231,-14.939659217769861,-19.34680253454188,-18.41752168723025,-11.381201943567632,-17.179839578156336,-12.256377330448876,-12.862812580173435,-16.75843373790533,-13.528740312327143,-13.96007310275708,-14.282863516084095,-10.230858104396885,-13.045209303989267,-16.70564067630632,-11.592417789034515,-14.98372033575074,-16.064189396849784,-17.434206632463656,-18.080340177565077,-16.448657811508916,-10.96408285107438,-19.57679226921874,-18.0993747438624,-15.50415714197001,-12.917350937836538,-16.898377573007874,-18.99311392623637,-19.63420976782411,-12.53489763899225,-19.964123524281618,-13.869708925622144,-14.527157269474122,-19.317685068222197,-14.330762242434174,-12.832664373131173,-19.296969027843005,-13.923260545825446,-15.535058379873597,-13.670838548204374,-12.655129061794357,-11.894505776877262,-19.06110838865096,-11.380971429318812,-15.800265141125237,-10.570981706597195,-12.940235425005467,-16.16485986056391,-18.31116642614788,-10.717877064036026,-15.657952250966119,-16.335757107168263,-19.322640708351916,-13.14094511351707,-12.443309480546318,-17.212881735798412,-17.860462363818165,-13.894190529831874,-13.282356426283119,-13.707848763764725,-15.291899892507715,-17.19316150536929,-17.481363363355726,-17.85673019139398,-11.565381021954323,-11.77625968336407,-14.715294535854124,-14.695001773536989,-10.114141893438608,-14.708025594614229,-18.72758957293417,-11.666011461752444,-12.925383873093503,-18.82592686666962,-13.563804309375872,-12.578336892929622,-14.717328996158386,-13.044282633807882,-12.383223358424665,-14.38957790814451,-14.048478373804844,-19.42633027862413,-15.153751247108264,-11.331161734674875,-10.199892230535001,-13.194270766333709,-14.690871505777158,-12.191956836903632,-13.814385980940134,-13.520510387976458,-10.824246815882859,-10.28370005073062,-11.832641345533805,-14.82597022188039,-16.06295909973786,-18.012877867238885,-10.44463676755619,-13.870667683170437,-15.921165683349708,-14.791770185804129,-18.45809109533727,-16.46107944542977,-11.380683880387965,-17.50241586369328,-17.85121216273669,-17.935224872129055,-15.822157864021227,-11.616787469668884,-15.374862320942444,-11.332232969402149,-15.783782264424243,-10.61559050271159,-18.605993150190507,-18.618648582106985,-17.88611396819867,-13.74731797026432,-15.757454687808728,-13.663758281593335,-14.740919719333514,-13.373951329290277,-19.49369849547268,-19.243420346814325,-14.244735850432356,-13.726834621762855,-13.958024934049508,-17.22882600411632,-15.842332253633014,-15.487397074871803,-15.831311056778317,-15.457646478926677,-19.003047471744527,-17.049133055330337,-14.951964907009756,-15.604746964590229,-12.494165850650433,-14.495233267618687,-19.95989569358437,-16.353567404121595,-19.82502544670479,-14.574168291433221,-13.44509588451994,-11.1419816948008,-12.038133394064745,-11.425638329064467,-12.452978975637087,-10.313692914501388,-12.617537087274108,-19.119095749724146,-14.90840820908575,-18.478845353891927,-19.22717049263519,-14.663079060244929,-13.103458138914526,-13.553853443431036,-15.606008101359873,-12.160038429659046,-12.621862457341964,-19.246416905445347,-10.820646348801999,-19.413699152920202,-18.28495037179354,-18.927620785652792,-12.453187986133273,-11.799156314225485,-11.598345828776232,-19.94088641036562,-16.86334366018069,-11.729251957677302,-16.365125223402135,-12.979238397813788,-12.829322818149151,-13.018689402697326,-13.492975399728115,-18.252054761654417,-10.281373818490065,-12.590158300007758,-11.637699321759769,-17.289973323350246,-14.742522461038313,-16.160741774085132,-19.99178357578352,-16.14677067051469,-14.438299403883319,-11.12367047758626,-18.310778615221533,-18.12258204319059,-13.163816905258463,-12.684257608709483,-10.101248235370457,-19.82268234044669,-15.402144430327906,-12.045031420320152,-16.33784289716635,-17.54163901698094,-15.870462620108338,-18.877502975822082,-19.824985837701007,-19.7147730817114,-12.051784779957549,-13.115067902054623,-19.267506467041294,-10.076760508873653,-12.163519978710633,-18.078409993542607,-18.3135380232912,-16.694476062102797,-14.500963236045227,-16.257072632875566,-17.697610909343517,-11.081753682059542,-14.787586383294016,-11.90167471179425,-15.28634765673392,-15.494469933347016,-19.44437495838106,-13.086993404825622,-19.472683027094416,-14.106767378123939,-17.80598269757846,-19.998756417891638,-16.466833695758993,-16.634048028301716,-12.217368068125932,-14.511257976117435,-16.53887016252244,-15.36317788816466,-18.09026579633601,-14.332005836318746,-14.502382363218732,-16.96976965920811,-10.350321848516463,-13.689020169340523,-13.928903040615292,-16.240503002695938,-17.42815370925748,-10.825097789645737,-13.780085182532533,-13.131326344944885,-11.923178787907876,-10.695018347724211,-10.66903556166795,-11.907099001504086,-12.206851645823587,-19.083586023573314,-15.895043686792299,-13.181734638881043,-10.119896146498963,-18.632735552349825,-18.787890233725225,-18.579761623939113,-19.88127882117605,-11.770012506142223,-15.743598374805636,-17.363930970640165,-17.94519205136061,-18.228666710454892,-15.137787639671053,-15.168695509027186,-19.61411430479758,-17.80583156580279,-19.38723475631561,-14.371978772770166,-10.450183794681212,-17.97434836058428,-19.204243314365932,-10.712928476187189,-14.919660966207925,-15.064105279393939,-12.004040673416988,-13.152350534381208,-11.228004624797215,-13.88572039268457,-14.636721684345886,-19.833085731176176,-15.653116860887131,-12.78086394233626,-17.556580561484875,-15.975358649825292,-10.065696500932056,-13.905746935357989,-13.862883432505065,-16.653027830956173,-17.69956881739802,-15.135807240259728,-10.955893816692742,-12.405438224551283,-10.988624357612176,-12.789927250352624,-16.750810979352938,-12.679112131542889,-15.231263252222195,-10.74806727251633,-18.466381119161653,-14.99310320451589,-18.28872720586691],"b":[0.25584853839685007,2.4360037489422304,1.9627093761415915,3.3602533845240936,4.3795728744579785,2.255491335740377,0.1380178958251821,0.751663042016395,0.5885998816094529,2.8967612495323056,3.36191194739114,4.621253719765393,1.0952369574897447,2.196106661498166,3.1315058705136134,2.477785119703814,1.2943578098663178,1.4810291701879719,4.092201402929071,4.501167333672173,1.2952199779918783,0.63847774298326,2.8746884697130746,1.4582082547145625,1.245620915658221,0.1304758722291821,0.6374553192993193,4.550487213548399,1.4033631703975913,0.7254674514613635,2.56703055054077,0.43216736504935405,1.4572616532571347,1.1557976464945974,3.724678664095753,1.1507905346144387,4.439416722155171,4.419389090902946,3.1730000583898077,0.5432670940744277,3.77832212644945,1.5112998099575947,3.91849052356249,2.7438451390186156,2.377462746733865,4.509943300221994,4.399976719398441,1.5539879691378267,2.457988447850923,2.492408989173115,3.424729105293689,3.4006210432238406,3.4740832270125086,0.05630789396007918,0.4598016882763345,2.0623104211056287,3.7323597877536594,1.9260086057858627,0.3390334607347545,4.456568267348798,3.2274366868367013,2.23435141094922,2.969450207570806,0.25453301004476514,1.2729709114871868,1.8456957380211103,2.973341500056328,0.40742506402965395,4.845391585034905,1.3000827305312135,3.567246740737974,3.6894998467039897,4.842778156020257,3.7301553885421725,0.1418505919391433,2.9424674072692083,4.024186481643515,2.528884700059767,0.07889316902707111,4.501493110577554,2.883768363909155,0.3685460934393181,4.813772796111336,1.2154591972111672,4.056129023773965,1.0734180148595318,4.701478196660652,4.23291899610429,4.292856267446955,1.0393255596844575,3.429671439773321,3.5321265251209564,0.21530729436456508,0.4410787540126193,0.5053959063910429,0.6906836896014112,2.6098330115654855,2.691680992899803,2.4331202534771155,0.7929886823593635,0.36768332530431547,0.039544137586450256,4.456543737712099,1.5392223562557639,3.758307046330142,4.9210770060669375,0.9492669774884444,4.388071060794343,0.9443385200766063,0.79321192542672,3.012312948904344,0.9647019339074969,4.0805384907041775,3.7590726033447455,2.2893553888752702,4.494296703161963,1.0103666116873877,1.141773390823535,3.6973737535820783,1.9904997935867186,0.0034995327167786083,1.4223543226968949,1.3012724751428206,1.372547973218755,4.942147202465645,3.6181641453908164,4.5419900435524525,3.0621027259511955,1.7583082138303818,4.2415191313759575,2.1795697176695974,4.004521280990899,2.7751987599071413,0.16126940374903587,3.5282205022929345,2.3652791015667987,3.3982634513080354,0.48551689773323803,4.077047041672499,3.0624891678187574,3.1589828840069014,3.445027244416571,3.6144802629308237,2.8022733812394884,2.269472029689368,2.871975081649717,2.454924463600495,2.2854856149861993,1.013941561636753,3.666741689666538,3.0661266507974116,0.29319299528347664,1.7319245379694248,4.296093390913739,1.5426450498788191,3.117994185949138,2.727983096351949,3.745486945245414,4.824500142257454,2.876280617720477,2.2219773525197253,3.276261183266609,0.7138980647432647,4.569137705415858,1.9349428431326376,1.9726983903165907,1.0610132066430178,4.4418048359936595,2.174894284306057,4.230104877386216,1.4907886199905174,4.754909075055681,3.67903132683451,0.9493726363736066,0.887811123455563,3.2608567187891415,1.3966769047277583,4.946632194068869,2.4962239373006434,2.491237696492785,0.9917500360084353,3.809749870888411,0.900213801663664,2.861057162729048,1.3395304336988423,1.1775712670314498,0.4782053398340558,0.002488736178618556,4.4390594882105985,3.1259974271309634,2.8308770776244008,0.6891979401414339,1.5097549030819102,1.2902863869472692,1.041020658827344,2.070288870132514,1.898609206592875,1.6019512976193728,3.381603506534675,3.631931866512889,1.3849325488623132,4.6606496892385465,4.330380978361539,1.166265313478223,4.442638045526891,0.7143162568680139,0.48504498563209486,4.524232921716674,2.999834665381087,0.5245150792410624,3.1079205973240978,1.9369308733062385,2.946920374198827,1.0313233995722215,4.113576634275816,4.686056316631364,4.144162138970804,4.03456408908241,0.3993902904891733,1.308854387953693,1.1691810918155787,2.020525204603385,1.7643729047385315,3.7343113825931127,3.5080117074297523,0.5003212372657806,2.0860573777980527,3.3149074550750424,2.6153310626843282,3.56007785751045,2.902943343609415,2.7949248326303513,2.2102066246851813,1.6746742317731722,1.1904452674910238,3.05972468839933,1.211035595055806,0.37865922573440014,3.8011573212046343,2.999854545065155,0.23658088323386228,3.930541852304442,1.1329909195620858,3.7785413692866774,0.31468921662833327,3.3120318481776634,2.3369933044768265,4.421008446892829,0.4926632906272155,0.808677420230618,1.9513929437928867,1.5805147623746696,0.930971791031463,0.5426362370324334,3.4102997715177787,3.58172167280151,4.554337804231469,4.9658008795860145,2.111175685970342,4.351890378269606,1.668881008013866,2.608890857494748,0.08272917180587203,0.8645043146319087,2.64353635674326,2.767066120646856,3.2927027546937095,1.4777780849094924,2.0572137495436937,4.357715722241338,4.3973754719369,0.8616305609502273,3.0014647738179745,4.179038310516688,1.9296156486780947,3.4997217977471218,4.064690291890369,0.17839193627847694,3.9267269648554546,0.4731746952540239,4.566505281036022,0.07072530469965477,2.4831848872874076,3.1319704026024087,0.01789266644077414,0.017602430369118016,3.1904512110816343,0.6010176903776754,4.682356270344097,2.2469823234196475,1.5290200246175079,1.8506347103234944,0.029219706159115955,2.822296669093758,2.9361840886243797,3.617202696954779,4.8597987031882806,4.987723559681369,3.704764300618524,3.361314089503221,1.1493688688048065,0.4898891330256916,0.018652787393547143,4.211866078951651,4.65282903564562,2.9079861453402565,2.0451564528823907,4.89255279800892,0.8034562417838398,1.0492813050946637,3.991340065886736,4.219693663116101,2.8448282743941955,4.790694513506861,1.8861093245193994,1.37114566956971,1.4021457262599435,3.268317588778764,2.7533129572912873,2.8447345765284737,2.786381848993904,4.73343042143555,3.4474769194537256,4.4875502282765805,4.898472357580781,4.843280902466298,0.93844391207903,1.103568997003579,4.561131717678339,3.2116632511977183,3.347097270624526,2.6205153836775565,0.2775402336652222,2.8894873623090254,3.022199566547088,1.0119870268395215,1.7075285548910624,0.40789789901478857,1.8055468814473374,4.3161626840279315,2.0577045780915126,3.3749252251550788,4.054917233671128,4.139591554800232,1.3623336026696453,2.8797943882372525,2.1224353914472847,3.9976504942020186,0.5535598215705573,3.836317931429506,2.033895375956698,4.000066444958965,0.9252746142203094,1.772874831939265,1.479398281854436,0.63210315450412,2.5213985352437582,1.2822030915345173,0.11420260958410644,3.4211077919703783,2.895705957691317,1.5586288439960672,1.5677569376151779,0.8182575930301594,1.5885571983675384,4.6689556390049916,2.514654471381953,4.549754386814514,2.6457381733878647,0.454588809221248,4.352534217611823,4.609948468167917,4.733699045584176,2.7358456589863844,4.197744664781725,2.88247086139485,4.2361019570707805,0.6601921126154142,4.4203110295112715,3.2057482257419445,1.2003075535691166,4.340929037546333,3.189696502429251,1.2380653270944286,2.522404018081713,4.757035654658734,4.203607869847352,2.9585091608396388,1.559340394919393,2.3798865246483345,4.137673219507326,0.28534673111884845,2.2468209586677146,0.5390235136280941,0.16207354543739005,3.255900630772782,3.7874161708018574,0.9108023805955967,4.111743577548128,0.9281599894170267,3.9643848137894278,4.635661091932893,1.437994815866812,4.262978423122075,4.377000771358923,2.674761670237383,3.6421446008304406,4.566866834409193,2.427970963463326,3.2119991260578526,3.3418571524947547,0.37156318673222,0.2110631257584228,2.1576325488364367,0.6945675726452871,0.185098583423291,1.3959716853345705,0.9354501871053011,2.4152928489801315,3.1551120240362875,0.5314115823086019,0.5399163165338106,0.5802934452831543,1.8515167770650542,1.1274095836571207,1.0194684492029749,0.829740101706874,4.991727708841838,3.9735875562741407,0.4168476702575741,1.657038479521984,4.17150900311965,1.684986709341053,3.0113049020878835,4.708327811716266,4.0292874631100855,1.60003386793656,3.5506375426735106,1.1842771690166742,0.6676277055488322,3.0219675491285947,1.5485778397749683,1.172493040035092,4.28598603624902,1.0336691382049568,1.5874374726789775,1.0496423883112471,3.814318120645636,1.6464749462580663,2.3409337275710485,2.008617128992447,2.390012011349778,1.9331831802185118,1.9710836667655118,2.838796859937701,3.6235524083664616,1.7327162009653785,0.36318828586709206,4.774171184908077,4.759957252868029,1.996079898229931,2.055265048160183,0.8651553056484618,2.0753868196696668,4.494917917180636,1.6788272741285115,3.7647268268714553,2.420891303535938,2.3765138917060002,0.3343621601478086,2.2576497069208767,2.339283991069425,4.648477991207887,0.9897259106791179,1.3477777256472545,2.344078803933971,1.4131028730473816,0.690174009821648,2.625704101072195,0.46238779019247556,1.9982240357650516,1.2408756228805373,3.042967982390503,0.6211904728799311,0.15180461963940406,1.1062180530410448,0.9172498754106639,3.683942881259845,1.240952023256876,3.278349532026067,3.4323003699668595,1.797332971210014,3.4432671780291235,3.4402963895906247,0.30170453195276004,1.3408867095381871,3.6141761872264833,1.008730675066738,4.4916388239100975,2.5190061051261714,3.7809167490649456,4.788536289939136,4.8545601069112685,0.7276759212501283,1.1503686633832422,3.0249944099439405,2.479773397837789,3.767670210152997,2.1057038002546715,2.057750981240404,2.455450506497537,3.0039810021270172,1.5890302618513175,2.1238661484553054,1.8889156431473053,2.8630267031265797,4.5346253002913635,2.13508745830656,0.6462075251419819,1.5252154923754102,2.9243733552754514,0.7179032571381883,3.239961016929235,3.4729653219256793,0.1651366601762283,0.1620115353363727,4.834198895649527,1.6346696089202384,3.272316664706616,0.5758146126733654,3.7599019611648474,3.218995128858644,1.5548506135810813,2.0800862919232266,2.09085236895178,2.636939256663946,1.521506125745249,2.7395429509038625,2.674811766639529,1.1418608478362446,0.5494275992066888,1.3737062882515927,2.4213717577169525,0.5771828847887428,4.57972649768167,3.540451874279009,3.048302722692241,4.191112029886463,1.986101494208904,0.7015266223753336,1.560561498382813,3.259418438942431,4.1170893171792144,3.8809208295067465,2.38703576953705,3.705493167213003,4.2379181518103,3.8005500314770813,1.5755045907375453,2.56774824409284,1.4328896468976926,2.3547222654583564,2.5268365733293674,4.648874653304944,4.313951604889378,3.921004938378031,0.16797647207525523,3.4004920602728883,1.8533004686137544,4.988495468608938,1.8159944111543336,1.1543446270555313,0.8444812399023505,1.7086804932801036,1.3276365456695471,4.287228749979757,2.035536256786429,2.1051364140361004,1.9232178596137572,0.751395151239127,4.884840949062845,1.299363509985254,0.9986087872326999,0.14718182110239897,4.636122383020787,4.006152405258989,4.433354469470018,1.8023254136184341,3.88125004683479,1.6460420648542673,4.8179515212372745,0.703674787984967,2.610864625033067,1.0638674675884952,0.1952341824481718,3.213580962022883,0.38423660672827653,1.4726128471780775,0.2022966515273794,1.3082107118132835,0.12028750699384694,2.696386563538322,1.5463712234767246,3.6926949606105075,3.2072640792122185,4.643079556939648,1.5978504901510593,1.7639331992193519,1.4702289897214704,3.551398654795662,2.0948374922434567,1.2863484414652104,1.5829846930678904,4.4618684198273755,0.9954305163063859,1.5957585014831421,1.3743878689086364,0.16686339832521435,4.6841167687371925,0.6683904533805662,2.6852329437922284,3.2996805874157364,1.4914289742930942,1.6699729753334691,1.5256806070514484,0.6839736025172427,1.925579096317942,2.66552488525166,1.3437654361992157,3.465225481868315,3.069736119271754,3.017172190329428,0.9235728174988067,0.2674981802834664,4.505389615884475,3.3561440392969146,3.9862134606557653,0.6332358318706865,3.9314594495186195,2.43167244252682,0.426051238343903,0.37786126085086247,4.675828344513385,1.3031207433234793,0.595490585589662,2.802133743572023,2.2165740808768817,2.249868577237147,4.102783298851281,3.773393121546209,4.591319501401584,3.494788030163307,4.6475385036676045,3.7705392536267155,1.674992005844923,0.9697817490977179,1.0900628274427304,3.105306993204615,3.5826532267540614,4.406370035816916,3.449265420357875,2.8926549535949384,1.817397312945137,3.544171762021897,3.7364829053449578,1.8926411740227955,0.36532426661021855,2.756573765996746,0.8959800521634176,4.12180774652711,2.2365509960707075,0.04423586559870518,3.533574630714238,0.005996743206663213,1.3920905501862424,3.687833683077665,4.027539302157158,2.2404642147739784,4.4237531885207595,2.047496468065656,2.9477864302002987,3.7010760827317126,4.670367236202462,0.014399822415487318,2.4615224443599457,4.585894176437026,1.9895901313095765,3.4085728851795762,3.0304225906389726,3.944156200611303,2.6228039735796504,1.1766625936674269,0.8109380534683552,3.8367446960206752,4.947578240527656,3.558011948824232,3.6853301446160023,2.323776229424157,4.632108138550564,1.4816476275806922,4.751393077902307,1.5717965831703395,3.608602065214508,0.1957639236125519,2.344959849471129,2.6373399412274234,1.6629428725433426,1.2073587837833466,3.0750858445252405,0.41089856928721136,4.953478986709518,3.424484805856255,4.4411646795449,1.4009561650128244,3.451927781402311,2.4897058963944954,4.954437959329001,0.7060235929689651,3.2401125000636144,1.486333009628803,3.141673700012668,0.38357904204802007,1.3766951356045387,2.8719104590903513,1.628562389613345,3.052045356160095,3.6511537982462503,3.163271661840017,1.2679964449993963,0.7132815005083726,3.470077904298531,2.62328778388723,3.7438196942776694,3.5018153340867397,3.236422519198526,1.6816455674159192,2.130558166334915,0.35288390132548364,4.115344061733062,4.015850633861556,1.0085873341981533,3.5996722661389544,0.00287590488009859,2.9218188978775306,4.900003884229598,1.2470291196135275,0.9610342089257651,4.742605707435022,4.607714006552724,0.19392482507815,1.8946793410467544,1.5505962624802727,1.1118980913946563,2.887145787526879,1.4309386943145186,3.844037074367849,3.843554013150051,1.202708442763506,4.6273110239742135,2.5133737421851574,2.5394267881072774,3.0073159133228544,3.734013988792091,0.41316733703869124,1.8421327669785559,1.6132687176533977,3.2165189819920768,3.852784550443541,2.641278224539718,2.621976277697172,3.0292696891227147,1.175226464991318,1.7777112791769767,1.969424037967713,2.6859116220456727,0.6839745182101364,1.4205946947236636,3.4812158183533715,3.048497738269378,4.189595528525735,1.8097790334391095,0.266394518587596,0.13861795357024032,3.938274751170252,3.227606260345147,4.814007205854615,2.869320682959775,0.45759493560411757,1.9765823923314496,0.5963261914801554,3.806878314655032,1.908721716292403,4.338854608081634,4.489237864348406,0.004276653500122629,1.9661094190649853,4.279881496462933,1.7150544730219608,2.389058488939846,0.5632453923392411,0.3689459983130594,3.2878500586805393,1.8132068449024563,2.9927204244670067,1.825860958411849,3.2925535513475257,1.2136588041695484,3.548322652759386,2.3203000085015146,1.3271995956812443,4.782232019830099,0.2723308479112996,2.1809742930361575,0.6255511034323769,4.7358918085663095,4.413825437536123,2.329172122851928,1.5057446901665483,1.0821863174389468,4.0646569021728896,2.783535822544423,2.5564393887927883,2.8537579862524676,1.7982344828151064,2.2391050876766014,4.1034252121649475,1.6239651100919705,4.233212060646725,1.6086447795267045,4.4160287073037505,2.429961024879428,4.079981656422547,3.9745961164768397,2.6114706276906685,1.7916880779195055,1.539615128065892,2.7558696186905838,2.125017145110025,1.8780701338494465,0.6954463409789491,2.7995517525319946,3.7706958776726074,2.735836690198722,3.257152146082075,4.0897909478882655,4.252216967632448,4.831274221665449,0.35250528244228585,2.13387575917659,1.4741682627856534,1.3864197917008958,4.217674241075335,1.124037326854801,4.747403087570267,4.544371121618099,4.626593260250303,2.6618889898946474,0.660203499444828,0.850518166712878,1.326805775263168,1.1584072786742194,1.76921752718881,0.44696387903634727,1.9402039542518634,1.0442026425472772,1.3206341336445893,4.109012722251282,0.9152322363433874,4.924691744967187,3.770541711145643,3.453671183909991,4.150276109510399,3.193207130760677,4.4770795693551735,4.875837224512121,4.905517794560385,3.7546164147551577,4.596838268942028,2.917726325816864,4.0929157996618475,2.5589098862427506,1.1358926757727006,3.464030053224132,1.3186927917906077,1.2078910641797214,4.863433431260752,2.524865151391915,0.31307547835229044,1.212285862104665,0.08481144082494896,1.3848280167134175,2.6957254977152525,3.9664703439258107,1.6612177481587143,4.041305542347001,2.758858019579046,2.9237252440187858,0.3874754339805031,4.653124970717442,4.946058824167161,2.4935178914829557,4.8062190289376225,0.28864094507424,2.1220936263870396,3.0962752352488665,0.11152965226236877,3.607609236957112,4.26094455417565,4.745360313250454,3.5763750743272418,2.392443006532572,2.329057818958348,2.516114995826463,4.0574811828381545,4.027883472450723,4.18428769278672,2.834344573037213,4.862333778800501,0.12986082384362718,0.1285898612392622,4.63612563752918,4.995385923075273,3.4434928151900825,2.2563579055381036,1.1621533304536047,1.8110578034500535,4.908258850976921,4.649175424843072,2.18975206947798,1.2300110236783046,0.07927284357440723,3.7913569501374687,3.590712472335358,0.6038063337671273,3.6805367608141015,4.68257405072908,1.2399309813635173,4.2623888390219955,4.748856187552946,2.0493410784751322,0.45912301430860003,3.830570523276079,3.227888133652448,3.8057175338922313,2.208867867448445,4.778446223909599,1.0206228935279194,1.0347685357625047,0.19670707993898806,1.9753192190727586,0.5080362957326645,2.5106744754879062,4.469074026209368,2.599261839091589,3.9192334599462297,1.5706793431113564,4.42901221052019,3.566390691589988,3.3186860767477,1.5927125471331671,1.9246094964977167,4.389929971574515,4.169987749565084,4.919901597195832,1.6821721675935952,1.0971718527911356,1.1254900739755802,2.90078501104004,3.4264955261771304,3.2579558161744004,4.503472087794122,2.2107501388064623,0.7457413377665223,3.5732011687701792,4.5525854683118485,1.9179206730457743,2.3147742374418323,0.7563127300755956,2.2802928028375815,2.1932374794373066,3.198610849836289,0.3945256053632773,1.970202532971358,2.816298454035351,4.605580026522466,4.447965558385505,3.3014146089369256,4.61765863139659,2.622364139089451,2.94584319604649,2.003179857350299,0.8328372410327978,0.30690076686781254,2.539392877981258,1.4257733952238794,2.830684497228005,4.452423066922032,0.058978784695816744,1.4604589946554558,2.1853924544438486],"mu":[7.28980530208527,2.607996424288841,8.363215334995896,0.48032346497951295,4.292824171325805,4.075829774079103,0.33373819133148963,1.8022285550462103,1.132325581477871,7.708639153640952,7.714017656484451,1.8590091649114093,5.035144805178962,1.3971760896418495,8.704436716400142,4.1667555992726175,0.8127790074057661,9.221288826096341,8.39597718778639,6.4250793994247335,6.90303404683829,7.668565846923645,1.5896358438216551,7.307302136834545,9.66092214327577,5.676921039361565,6.164614534130983,4.086668017827028,8.119203728048515,3.9470846795863346,7.632394408844392,8.789762840461744,7.580639581684561,1.057175226307081,9.210162203622547,4.163858534571361,1.9774731122295974,2.661920495756509,5.152925163598361,5.895433154300478,7.095157739080397,1.1254413664292606,3.8183941977993197,2.5652172830768483,7.505422368696988,6.28558151815861,5.727884072207217,4.138854945359942,7.727240233958814,7.904349041560503,1.7007232166281971,2.8026666822182045,6.986839899810581,1.42607573320507,2.161647922473384,3.125377416329087,2.386960802745217,0.7675619382293686,2.09542016770069,0.9318831456827459,2.0441918806397896,0.3786990161347159,0.8727434532708234,4.970362357085976,0.11492846652594535,8.098681609452232,6.083605763024442,5.859213903373746,1.162853066906071,9.57792466341896,0.6489769967236825,7.212254583635684,6.112672750212351,6.0041017907458505,1.4086777584569532,3.73274721362991,3.005156932243198,8.839945029832855,3.6295390401671046,7.110944675552451,8.83868135076731,5.4103326092437065,9.947465143207149,3.3904275465176292,0.7042670403416351,5.466807297448821,2.8356879918926636,0.5863756730037362,8.063519272380088,0.14624142179804123,1.75546107157305,0.34962584329681246,1.7388042455725694,8.037747936529055,2.0415963269006854,8.018902643369456,4.22025182724197,0.4181651656266361,0.05729054903527819,1.450855079012181,3.467120359515592,1.1550082384097138,4.733857870630818,1.1816478662987429,1.6186671174433065,1.3627508367743602,2.5113596286905215,5.062760037638128,9.364458922589263,5.021828995527571,2.0104645907060026,4.457266873548049,1.1100356427012081,6.358025636848367,4.870049238929271,4.084446822830836,4.695586735460882,6.087984521787093,6.403680287711344,0.2917519857479234,4.476949835726305,4.700085446976039,7.877914879342707,3.142849029203638,9.23111375613696,3.7262723156619493,4.869718246337853,1.000616470505371,5.833656622343721,9.722114722192448,2.356120722639774,6.551429858105047,6.985633940759657,0.6736864198924009,9.473902525035689,3.975331962887829,8.895696768197103,3.7744931143728744,1.7000973306016087,4.970279282686247,1.700240101234105,5.079435022703382,9.623288541730005,8.068057104396964,4.988478549867614,2.2803016601182913,5.882646459654913,0.6430680175324177,4.105848452845262,3.7614895961917316,8.700781966969195,9.381405904501516,2.4413387338388226,7.120407098444708,1.1627609553905027,5.1550566223672405,7.236650666348588,5.856362379166493,9.597670647845963,1.9900144854553137,4.847014398989389,7.465511655562467,3.2366895633874204,5.813268907480966,0.700979713594756,9.548120431680687,6.919739759439924,4.887443631964993,9.249468688428799,9.88121847696882,5.8011653375253385,8.990152591510888,8.894125937165335,6.348865578156893,8.045004361135867,8.231602324147385,2.4355408781106003,4.004777000375325,5.412102645660526,1.602648801043558,2.111865904817012,9.1409585229495,2.5842008510524583,4.998912488286804,7.394585694018088,3.6038266255243645,1.3048408116349197,5.710742655169174,2.795819410746394,3.647572011903175,8.763753838998294,8.264782075377807,9.012018754344366,1.6140983357471272,5.430006554018654,1.1985976793333175,2.7494797459292952,7.067690193617482,0.704372286902355,4.509745523027759,3.9892328373333474,7.598051426418335,1.2474115586573142,7.2821447739976435,8.421559435121093,0.12200549503304847,5.239241901124583,2.4427374567667037,2.110755262258448,5.994555367012753,3.699740635355424,9.495746606705877,3.435002505736391,2.7288996435174395,7.625769233983714,1.2869300431816177,8.708539997238827,4.221108726689458,0.34394613703843113,4.3169682421651085,5.444193914581588,1.8173850385523527,8.031942758498477,9.583241568925231,2.2166377662192227,6.40736403446402,1.1441680138424681,5.484948802830544,4.919429325517868,5.950265285973604,3.2911205526788123,6.6327682591314225,3.4063604337359066,4.024548036986813,2.1422091889398764,4.174961998409003,1.1231315178032797,2.733314245049294,8.015658979259355,1.158392667565713,9.832607134892317,9.827152098481278,2.507048609893243,1.5046614782347811,6.887241883072292,4.093185370396315,9.163967600340628,9.10666888596329,2.4926877288710303,0.7050073890647068,1.9862911894545965,1.3641923689158242,9.7378382940967,4.64110847731882,0.685992568244973,3.459622600397134,2.9193488286984337,5.01993368511984,2.702076869667136,2.0391000103991797,1.4715854758473768,8.55458408624341,2.068701606423673,7.96017029957315,1.6179131428836868,0.06926846463236602,1.9261633753203733,4.289360258285415,5.304256566182783,2.663025496182616,7.574727146354006,6.439582993309678,2.7225621543699474,6.106787988580149,8.132197685670688,2.347774898095427,1.851029939810771,8.635048380633394,1.397826290792481,0.8920823927888399,4.551289112017358,5.1046382581293575,0.7842227423454884,2.517939252921191,7.204855400009871,8.190856239923852,3.904541908311596,0.03854443777789651,6.753354249961943,6.386287887776501,5.1687019013804765,9.25470519686846,3.057314126334989,0.2978218701075308,2.0618579868659537,8.727341203806336,5.1402121781884595,8.153023516628792,1.0857726521337785,8.19549877353282,6.983117585824483,9.80186022480665,7.886803318395954,4.244946446804967,3.2024850585908538,0.08325799162628655,5.702675989520878,5.177666819065525,8.457258686792253,8.808099968640441,9.565834878608847,8.398129293374165,6.397921134278,6.581857199909653,1.9487989372632386,5.940706479992716,8.345374617594157,5.992836979200531,9.139561323244793,6.067989751368441,5.2948617955420225,8.995977309306689,5.136443240125679,6.228620180721258,0.8521868077639283,8.126867645830957,9.080378650349129,9.972152397473845,9.73836474149756,2.647085539880889,5.506309449200264,6.805252901633764,4.425021231987001,1.3697430065190108,3.2666625351113154,5.086594777305118,9.810826339357808,1.5297750260573184,5.096799608322891,6.726544837122499,3.550747315623788,9.383297746402432,7.739355890784587,7.079090539706863,6.455714598604105,4.360978084403968,3.919306080508831,5.146891436170833,3.666866408974585,8.620185485782015,6.996530138275039,0.6043960819953376,3.9309965563337324,3.0936620857669883,2.6119605798304613,8.898336684870214,5.559691276637637,3.3730160208464044,9.241307115309645,5.78482896431095,1.9093940485792915,7.6968048741828365,5.7021599426520435,3.6104089790882443,9.667952402764922,2.036885441966836,4.743809866848217,7.343937852918259,6.712185918464542,7.322034188838609,3.3243364235056183,7.1261384057218695,3.3061343141397193,2.931402121335258,2.0644607329083664,4.078618055517955,0.5708012637047455,0.7008780288136296,4.736254218105628,9.020443040979977,0.36502976303521173,4.245497148602622,6.1732188612651795,9.133407347298292,0.6046770325995432,2.090746574284863,7.93140210333537,0.9969536195471984,8.768647333241997,5.257033774070019,9.216307339764107,8.439285345232705,9.389150883636106,3.165154555688867,9.678970196330019,8.921451143947676,3.685274131935816,2.15860537535683,0.7018496670915053,0.5566780599304244,3.5456609442521825,8.668749656304573,3.5989756627950498,1.232685312334052,9.151036474950756,8.841434407210393,4.909739321497685,2.6761783155197794,6.470303857056498,4.212410401121374,2.4805129584269636,2.7242061682791463,4.291140750847127,5.715062918396969,7.276965161727109,5.501951488190606,2.813349600034971,5.219651308208871,6.998228971457435,3.9376018701556603,3.1740021984034383,5.918191608270429,7.389271144208114,6.417620599543092,4.996713761575052,2.965815582620106,6.6477026366768115,6.150112985533321,8.346619503219932,3.013173464999084,6.455147580840648,2.6161155596250074,3.8630215502476006,3.551581979709373,1.0826955571733965,3.7843451678649798,8.750887816011936,7.66671101465084,0.2434112284848644,4.029606842112949,3.3583113038092005,6.366602692238709,1.6265050346084542,3.166315192786895,4.54142473125928,3.084311579405812,7.739193532597639,5.978794884184047,1.1841611186161094,3.6329581801759847,9.771933372606343,5.033263559932573,4.150451097338371,3.309450144002828,7.408739437267451,1.4428331125653515,2.1611251863435843,6.406735200533364,0.734234486487515,0.12660681007040875,7.001901001371083,5.568840782634588,7.644212944554292,9.591494574689579,4.060364903305487,7.078816566087696,4.764074424864284,8.166135080612339,9.97713150371798,2.104958510950463,8.64449829591174,1.9874609361437146,1.4693520696842444,2.728011244750439,0.9475388177884136,2.068752203616675,8.514014145738397,9.36115992707827,9.113772191275341,9.104709696153295,3.044606511929453,6.555982896638552,4.540825634518759,3.8507728315578538,8.062667196115061,4.717947067008572,3.8698025603107267,8.839945649912213,8.123424582643716,4.542774620844079,6.217318735222996,0.037935848278642936,7.867440229586524,0.9975470957049648,6.646177876976907,6.00057969287072,5.990897712402965,6.83462112329442,1.5613494787523474,2.3206843626201623,9.450085003429638,4.490126961827898,9.75643282161509,7.885729544745783,8.536060739681577,7.308357691151439,0.7706111307749941,3.4385245098458306,4.395985447180683,5.883846085635229,9.024185600797246,1.653136992621107,7.279672455709489,8.27622945560536,2.572208255173627,2.369240252284066,1.4499272657745488,1.801101589690386,3.824232253622595,3.744424261267485,7.672572999389016,0.5920523335926697,0.1801732865735195,8.560851052462382,5.207705392685105,4.499798229291536,6.457653745531687,8.866541731632974,9.717534818995713,4.451712185008619,2.169997936114254,6.628255758362098,1.571911143427347,2.579012132959606,1.7273838752666348,2.7459501784642315,0.6812543001037352,6.227125734230404,7.816417206678552,7.789671673679141,8.658009160330591,2.1776782857798116,2.2468245944357856,0.3541540100038798,7.876730059674946,7.2336532562722144,6.732174379054698,1.7122306387969055,3.3132662735468155,7.262216639690671,2.9937349196826823,3.7363990863669483,9.454291292336892,7.351198476602148,6.244072705921844,0.8410870317058006,8.227570637771562,9.127855947750065,7.886301870198025,2.2430323419323406,6.159207613132908,8.935966096536177,6.016133276417317,4.488087280990274,7.763668753352723,7.0937372903684555,1.6497479453217845,0.12271653187704068,1.8121964755382347,2.3832726550725924,4.1614554207333,2.1962581937883185,8.943341363413701,0.8462203219644726,4.0946905416870845,5.3658361327688215,8.485537878077059,2.780652705829152,3.6893507997317876,0.7370268371651556,9.494572847625948,0.42457020607844953,4.603932791736285,8.091432948258825,8.51306348140614,0.5229262852378169,4.053906875777691,5.1158393543890535,2.335461971802053,5.912390940125045,4.2490618601142565,9.61347678601417,9.848388919854685,4.749820352207559,5.146949894288094,2.9132358777860667,6.117566634750673,4.195068967676672,5.44574200614578,4.242929854425057,5.288092775506552,7.186717627726198,6.154000205824522,7.702316822513396,5.753134156982762,8.547801441076842,8.955586914695527,6.897792869275181,0.9647589571795057,5.572090306018451,0.5736619359856387,7.671127854990298,5.00509618443266,4.751899983445074,8.143585299792859,6.5238916533323055,9.6638806742002,4.572507928498455,7.776970443040733,7.594330067547574,6.057482824531267,1.3615183475332682,7.35863705235036,3.8810417353379356,4.274422871915862,5.03217735010195,6.30529392647611,5.99444329018641,4.553659273670176,4.450360937420683,7.788609189753939,7.242337320180101,5.544137420372007,7.376735244815973,7.058566648819788,0.8144126805258622,7.996280753208762,3.884562372596223,1.2703807596149086,0.2964480116020529,4.212820139985068,4.994867821566906,7.3943860752762465,7.075179036730381,4.974608365414195,1.065595447147356,2.027787359710327,7.824665847058534,6.562331922954927,1.942153717962125,7.797259869837325,5.394960653701859,1.115222901383699,1.0857663980088073,7.300386663778924,3.208712339125821,5.641379035749711,1.0417734407359136,0.9245394337084489,2.957555296788734,9.654636521667344,9.899582078577058,5.008057423877301,1.2615154787488136,5.0874903957294615,7.689212516751304,5.008752162555606,4.322739781322468,2.7651640519167886,1.3644605331935344,5.6286361928292035,7.486933835397909,8.027599801164552,1.1805672027951686,5.740676333843096,6.741061981384626,7.714005442330059,6.836655825887547,8.554413287658647,9.791899896399945,2.0869501112575373,1.5922410572135681,9.706515204320706,5.027319673033819,5.718802992357261,4.881392540570224,8.218335346039664,7.2587720090370915,5.566413163129223,6.937122435626872,5.713338475665271,1.5694169083943543,8.12649625776405,7.790304025141341,4.037155165900394,8.042739527803697,8.851798349826993,7.712263013381271,9.799415689959801,4.201766225538042,1.7768369200494605,5.294736430450184,1.1183967998580502,8.738322966004011,2.4275887422523135,8.358591794459125,8.449706012099519,8.089431883224327,2.176931507061304,8.01212873179907,0.8503020888201918,4.121395408655893,3.8483712884848953,4.497138634563306,6.052729837022202,2.6843495332852663,2.163236611811088,2.4805972087849115,7.8099959605699,4.004804099757566,8.045242560836654,1.215033060124564,8.977861861185492,8.278110229395066,3.06755665336917,9.608714930928766,5.5755293947403795,4.725926875127011,0.31326859907218507,5.0084516898921265,6.48117240858451,6.6165467435180965,0.02834472972513602,7.437773440186528,1.6494863077096844,8.072117345683328,5.822151711326084,1.1611756355846325,2.0500122589183167,2.653844519257811,3.991739816953195,2.6226175357498738,5.555819341859571,5.017985757838845,5.236928256030888,6.4575455541741515,5.761596707465411,1.074639496257801,2.2685436664438163,1.5179341168145344,8.93538602930539,5.974676709247131,7.0859405909888995,7.2293717403418505,9.273828762999997,6.2742142824131975,1.5259041649417648,9.98713687717271,1.742632820999861,5.564168893191805,2.553352155850619,3.4268912128613915,0.09980634430737378,7.448323200623557,7.094318838869887,7.903584363233341,1.3954359206261713,3.259754948241378,9.292262793649602,3.888805591333264,0.9858750348571954,6.0274457881331305,4.599927297683943,1.2480741214327296,8.64276298348333,6.216375605641407,9.231466579689622,2.610774546465604,4.374859004207212,3.647393535428285,4.193014762863845,7.780545021171623,6.689529102937439,3.4497969968894227,4.9994010266338496,1.529475753757945,0.7579584426603758,7.936698611747226,0.7170572482993309,6.815057441541345,4.715157797890033,2.6596614160663323,7.137397371806862,7.560736023110373,9.515823363294542,9.474548093966783,8.493926842563406,0.983550771738495,2.8996351541678833,9.781477345444742,4.903814304628453,2.9554608032922514,9.365311608948634,7.865521147459176,0.7401658562957847,8.07130608076605,6.76154235471315,8.606540686091966,9.772885035422789,8.22763486250777,1.169963217980352,3.9202611580951308,9.062337192602953,0.6065716529387455,1.3845180001226587,6.219728049499677,9.665341535447244,7.059262121046068,4.041944992635662,0.9032419037395023,4.944447080419849,2.37359837943925,0.9303403093601736,2.046245493088248,5.013775059385872,8.835372373065828,9.152733341385279,8.050982373128656,8.02074638088001,7.884705563643077,4.4414080343241835,7.0833476303296194,2.455337482211233,0.8085956928990812,2.015804502303815,2.2941248186266083,6.337144720219121,2.0497439009566265,4.957508280622076,3.4221964626215673,1.4394217430615464,0.19803208408005313,9.108667949663012,0.19514751750443038,0.46917507816056414,1.8760448571684019,4.622313202582893,0.0862745532943654,7.937605388558103,0.2969874938635986,9.441598865859772,4.058204111930919,1.7539098811036258,1.8416404650532892,8.110772473841784,8.414850300713432,5.238445582044966,0.4235985502924766,2.495504370869215,8.093041002750972,8.037773238920696,5.5554447022530296,5.744549661771437,4.853500672482218,6.26210811410576,2.7113075375994877,8.830298121984727,8.235221980831813,6.08380708586526,0.2581466608641425,1.700974960803523,7.259043194940277,1.9991635680089725,9.642889256925937,4.556895984083422,3.9729661061871457,4.990130060010829,4.888546998554785,9.563408633194761,2.109091564924601,9.533458933911819,6.789826387419733,0.6451373521290082,0.39658469971252774,2.630775435545225,8.5080558429157,7.941425822965121,7.104663316413,4.014154134745884,6.17983923498671,2.2584116451329317,0.3894165834613439,7.831402183845977,1.52910314447392,8.510512539643159,1.367531126553081,4.497733865911215,6.727382783387852,9.634892459411809,4.210846537168633,5.491781586589848,0.5019224111426723,1.328839718148196,6.441135825358433,2.1718080127817196,4.196091755220799,5.327298180016129,7.8225343982208635,1.4804050899399335,8.4597091454652,5.248831014733781,8.862715138392353,5.469329466655186,4.401960095351596,8.882762655137348,4.1620190386624145,7.989466405482835,5.1464375261791435,5.377632999464965,3.8542488999408175,4.337022953082701,8.467134429829933,9.08389017552812,7.437003921696929,9.378247113310787,4.717536653402197,2.4736840925916126,2.8763086221856615,6.7374564145655285,3.012002827345004,5.0201187043811135,3.8085726376560336,2.713119700249089,0.46850338512945067,1.4054382379906016,8.645093358469376,9.689123127583649,0.5766341671836317,5.797082914715997,6.341478150983175,9.768081188223448,3.8292847619983306,4.137055351854975,6.17620680261421,3.1975082398878385,1.8024803969871428,8.06563228201421,4.663315091610638,6.321867749088021,0.6025246227455727,5.297128279918571,4.625818715599113,9.58948814104051,1.5011199745656545,4.324646055480013,9.825705142082166,0.22628536510377328,3.519334165349055,7.649423984072947,9.044349920502366,6.0726280118046105,8.726935092187848,1.3180400404755965,5.033291866563432,2.194701058466322,0.7979245233746979,2.29973411484518,6.52898692075448,4.065123079579727,7.881880497430485,8.14257787886335,5.959732952027661,4.35630254702547,6.6209343616742515,3.2010781370661623,9.546048670625195,9.356457456474578,4.711414154018685,1.2825588946588096,0.4930857123931309,2.9501398213688557,7.9035614838330055,9.792203463280167,4.456314907438578,2.1666802849927347,5.4160029332900095,8.004995919494833,0.2642968338133289,5.677737005551354,4.910377336936547,8.74476203969322,0.5563836658607224,5.377827537501563,1.4249215009044414,9.154456871270346,1.7945257117903335,3.631930869802109,1.423934320796869,9.091713086043478,2.221324215603653]}
},{}],106:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var cdf = require( './../lib' );


// FIXTURES //

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `b`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `b`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a negative `b`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	b = positiveMean.b;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var x;
	var y;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	b = negativeMean.b;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large variance ( = large `b` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var b;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	b = largeVariance.b;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/cdf/test/test.cdf.js")
},{"./../lib":102,"./fixtures/julia/large_variance.json":103,"./fixtures/julia/negative_mean.json":104,"./fixtures/julia/positive_mean.json":105,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68,"tape":183}],107:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
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
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `mu` and `b`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a valid `mu` and `b`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `b`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, 0.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var mu;
	var b;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	b = positiveMean.b;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], b[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var mu;
	var b;
	var i;
	var x;
	var y;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	b = negativeMean.b;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], b[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large variance ( = large `b`)', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var mu;
	var b;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	b = largeVariance.b;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], b[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/cdf/test/test.factory.js")
},{"./../lib/factory.js":101,"./fixtures/julia/large_variance.json":103,"./fixtures/julia/negative_mean.json":104,"./fixtures/julia/positive_mean.json":105,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68,"tape":183}],108:[function(require,module,exports){
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
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/laplace/cdf/test/test.js")
},{"./../lib":102,"tape":183}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":109}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":112}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":114}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":113,"./polyfill.js":115,"@stdlib/assert/has-define-property-support":14}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/assert/has-property":21,"@stdlib/assert/is-object":43}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":117,"./polyfill.js":118,"@stdlib/assert/has-tostringtag-support":25}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":119}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":119,"./tostringtag.js":120,"@stdlib/assert/has-own-property":19}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){

},{}],123:[function(require,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"dup":122}],124:[function(require,module,exports){
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
},{"base64-js":121,"buffer":124,"ieee754":150}],125:[function(require,module,exports){
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
},{"../../insert-module-globals/node_modules/is-buffer/index.js":152}],126:[function(require,module,exports){
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

},{"./lib/is_arguments.js":127,"./lib/keys.js":128}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],129:[function(require,module,exports){
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

},{"object-keys":157}],130:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],131:[function(require,module,exports){
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

},{"function-bind":146,"has-symbols":147}],132:[function(require,module,exports){
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

},{"./GetIntrinsic":131,"./helpers/assertRecord":133,"./helpers/callBound":135,"./helpers/isFinite":136,"./helpers/isNaN":137,"./helpers/isPrefixOf":138,"./helpers/isPropertyDescriptor":139,"./helpers/mod":140,"./helpers/sign":141,"es-to-primitive/es5":142,"has":149,"is-callable":153}],133:[function(require,module,exports){
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

},{"../GetIntrinsic":131,"has":149}],134:[function(require,module,exports){
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

},{"../GetIntrinsic":131,"function-bind":146}],135:[function(require,module,exports){
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

},{"../GetIntrinsic":131,"./callBind":134}],136:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],137:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],138:[function(require,module,exports){
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

},{"../helpers/callBound":135}],139:[function(require,module,exports){
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

},{"../GetIntrinsic":131,"has":149}],140:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],141:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],142:[function(require,module,exports){
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

},{"./helpers/isPrimitive":143,"is-callable":153}],143:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":145}],147:[function(require,module,exports){
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
},{"./shams":148}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":146}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{"./isArguments":158}],157:[function(require,module,exports){
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

},{"./implementation":156,"./isArguments":158}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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
},{"_process":161}],160:[function(require,module,exports){
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
},{"_process":161}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":163}],163:[function(require,module,exports){
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
},{"./_stream_readable":165,"./_stream_writable":167,"core-util-is":125,"inherits":151,"process-nextick-args":160}],164:[function(require,module,exports){
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
},{"./_stream_transform":166,"core-util-is":125,"inherits":151}],165:[function(require,module,exports){
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
},{"./_stream_duplex":163,"./internal/streams/BufferList":168,"./internal/streams/destroy":169,"./internal/streams/stream":170,"_process":161,"core-util-is":125,"events":144,"inherits":151,"isarray":154,"process-nextick-args":160,"safe-buffer":176,"string_decoder/":182,"util":122}],166:[function(require,module,exports){
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
},{"./_stream_duplex":163,"core-util-is":125,"inherits":151}],167:[function(require,module,exports){
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
},{"./_stream_duplex":163,"./internal/streams/destroy":169,"./internal/streams/stream":170,"_process":161,"core-util-is":125,"inherits":151,"process-nextick-args":160,"safe-buffer":176,"timers":189,"util-deprecate":190}],168:[function(require,module,exports){
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
},{"safe-buffer":176,"util":122}],169:[function(require,module,exports){
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
},{"process-nextick-args":160}],170:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":144}],171:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":172}],172:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":163,"./lib/_stream_passthrough.js":164,"./lib/_stream_readable.js":165,"./lib/_stream_transform.js":166,"./lib/_stream_writable.js":167}],173:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":172}],174:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":167}],175:[function(require,module,exports){
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
},{"_process":161,"through":188,"timers":189}],176:[function(require,module,exports){
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

},{"buffer":124}],177:[function(require,module,exports){
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

},{"events":144,"inherits":151,"readable-stream/duplex.js":162,"readable-stream/passthrough.js":171,"readable-stream/readable.js":172,"readable-stream/transform.js":173,"readable-stream/writable.js":174}],178:[function(require,module,exports){
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

},{"es-abstract/es5":132,"function-bind":146}],179:[function(require,module,exports){
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

},{"./implementation":178,"./polyfill":180,"./shim":181,"define-properties":129,"function-bind":146}],180:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":178}],181:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":180,"define-properties":129}],182:[function(require,module,exports){
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
},{"safe-buffer":176}],183:[function(require,module,exports){
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
},{"./lib/default_stream":184,"./lib/results":186,"./lib/test":187,"_process":161,"defined":130,"through":188,"timers":189}],184:[function(require,module,exports){
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
},{"_process":161,"fs":123,"through":188}],185:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":161,"timers":189}],186:[function(require,module,exports){
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
},{"_process":161,"events":144,"function-bind":146,"has":149,"inherits":151,"object-inspect":155,"resumer":175,"through":188,"timers":189}],187:[function(require,module,exports){
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
},{"./next_tick":185,"deep-equal":126,"defined":130,"events":144,"has":149,"inherits":151,"path":159,"string.prototype.trim":179}],188:[function(require,module,exports){
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
},{"_process":161,"stream":177}],189:[function(require,module,exports){
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
},{"process/browser.js":161,"timers":189}],190:[function(require,module,exports){
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
},{}]},{},[106,107,108]);
