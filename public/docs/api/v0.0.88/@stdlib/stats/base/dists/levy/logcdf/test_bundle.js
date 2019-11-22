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

},{"@stdlib/utils/native-class":138}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":138}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":138}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":138}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":138}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":99}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":103,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/to-words":118}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c}. The implementation follows the original, but has been modified for JavaScript.
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
var exp = require( '@stdlib/math/base/special/exp' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var polyvalPP = require( './polyval_pp.js' );
var polyvalQQ = require( './polyval_qq.js' );
var polyvalPA = require( './polyval_pa.js' );
var polyvalQA = require( './polyval_qa.js' );
var polyvalRA = require( './polyval_ra.js' );
var polyvalSA = require( './polyval_sa.js' );
var polyvalRB = require( './polyval_rb.js' );
var polyvalSB = require( './polyval_sb.js' );


// VARIABLES //

var TINY = 1.0e-300;

// 2**-56 = 1/(2**56) = 1/72057594037927940
var SMALL = 1.3877787807814457e-17;

var ERX = 8.45062911510467529297e-1;  // 0x3FEB0AC1, 0x60000000

var PPC = 1.28379167095512558561e-1;  // 0x3FC06EBA, 0x8214DB68
var QQC = 1.0;

var PAC = -2.36211856075265944077e-3; // 0xBF6359B8, 0xBEF77538
var QAC = 1.0;

var RAC = -9.86494403484714822705e-3; // 0xBF843412, 0x600D6435
var SAC = 1.0;

var RBC = -9.86494292470009928597e-3; // 0xBF843412, 0x39E86F4A
var SBC = 1.0;


// MAIN //

/**
* Evaluates the complementary error function.
*
* ```tex
* \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int^{x}_{0} e^{-t^2}\ \mathrm{dt}
* ```
*
* Note that
*
* ```tex
* \begin{align*}
* \operatorname{erfc}(x) &= 1 - \operatorname{erf}(x) \\
* \operatorname{erf}(-x) &= -\operatorname{erf}(x) \\
* \operatorname{erfc}(-x) &= 2 - \operatorname{erfc}(x)
* \end{align*}
* ```
*
* ## Method
*
* 1.  For \\(|x| \in [0, 0.84375)\\),
*
*     ```tex
*     \operatorname{erf}(x) = x + x \cdot \operatorname{R}(x^2)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     1 - \operatorname{erf}(x) & \textrm{if}\ x \in (-.84375,0.25) \\
*     0.5 + ((0.5-x)-x \mathrm{R}) & \textrm{if}\ x \in [0.25,0.84375)
*     \end{cases}
*     ```
*
*     where \\(R = P/Q\\) and where \\(P\\) is an odd polynomial of degree \\(8\\) and \\(Q\\) is an odd polynomial of degree \\(10\\).
*
*     ```tex
*     \biggl| \mathrm{R} - \frac{\operatorname{erf}(x)-x}{x} \biggr| \leq 2^{-57.90}
*     ```
*
*     <!-- <note> -->
*
*     The formula is derived by noting
*
*     ```tex
*     \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\biggl(x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \ldots \biggr)
*     ```
*
*     and that
*
*     ```tex
*     \frac{2}{\sqrt{\pi}} = 1.128379167095512573896158903121545171688
*     ```
*
*     is close to unity. The interval is chosen because the fix point of \\(\operatorname{erf}(x)\\) is near \\(0.6174\\) (i.e., \\(\operatorname{erf(x)} = x\\) when \\(x\\) is near \\(0.6174\\)), and, by some experiment, \\(0.84375\\) is chosen to guarantee the error is less than one ulp for \\(\operatorname{erf}(x)\\).
*
*     <!-- </note> -->
*
* 2.  For \\(|x| \in [0.84375,1.25)\\), let \\(s = |x|-1\\), and \\(c = 0.84506291151\\) rounded to single (\\(24\\) bits)
*
*     ```tex
*     \operatorname{erf}(x) = \operatorname{sign}(x) \cdot \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     (1-c) - \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)} & \textrm{if}\ x > 0 \\
*     1 + \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr) & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*     where
*
*     ```tex
*     \biggl|\frac{\mathrm{P1}}{\mathrm{Q1}} - (\operatorname{erf}(|x|)-c)\biggr| \leq 2^{-59.06}
*     ```
*
*     <!-- <note> -->
*
*     Here, we use the Taylor series expansion at \\(x = 1\\)
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(1+s) &= \operatorname{erf}(1) + s\cdot \operatorname{poly}(s) \\
*     &= 0.845.. + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}
*     \end{align*}
*     ```
*
*     using a rational approximation to approximate
*
*     ```tex
*     \operatorname{erf}(1+s) - (c = (\mathrm{single})0.84506291151)
*     ```
*
*     <!-- </note> -->
*
*     Note that, for \\(x \in [0.84375,1.25)\\), \\(|\mathrm{P1}/\mathrm{Q1}| < 0.078\\), where
*
*     -   \\(\operatorname{P1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*     -   \\(\operatorname{Q1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*
* 3.  For \\(x \in [1.25,1/0.35)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erfc}(x) &= \frac{1}{x}e^{-x^2-0.5625+(\mathrm{R1}/\mathrm{S1})} \\
*     \operatorname{erf}(x) &= 1 - \operatorname{erfc}(x)
*     \end{align*}
*     ```
*
*     where
*
*     -   \\(\operatorname{R1}(z)\\) is a degree \\(7\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S1}(z)\\) is a degree \\(8\\) polynomial in \\(z\\)
*
* 4.  For \\(x \in [1/0.35,28)\\),
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ x > 0 \\
*     2.0 - \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ -6 < x < 0 \\
*     2.0 - \mathrm{tiny} & \textrm{if}\ x \leq -6
*     \end{cases}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erf}(x) = \begin{cases}
*     \operatorname{sign}(x) \cdot (1.0 - \operatorname{erfc}(x)) & \textrm{if}\ x < 6 \\
*     \operatorname{sign}(x) \cdot (1.0 - \mathrm{tiny}) & \textrm{otherwise}
*     \end{cases}
*     ```
*
*     where
*
*     -   \\(\operatorname{R2}(z)\\) is a degree \\(6\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S2}(z)\\) is a degree \\(7\\) polynomial in \\(z\\)
*
* 5.  For \\(x \in [28, \infty)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(x) &= \operatorname{sign}(x) \cdot (1 - \mathrm{tiny}) & \textrm{(raise inexact)}
*     \end{align*}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \mathrm{tiny} \cdot \mathrm{tiny} & \textrm{if}\ x > 0\ \textrm{(raise underflow)} \\
*     2 - \mathrm{tiny} & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{erf}(0) &= 0 \\
* \operatorname{erf}(-0) &= -0 \\
* \operatorname{erf}(\infty) &= 1 \\
* \operatorname{erf}(-\infty) &= -1 \\
* \operatorname{erfc}(0) &= 1 \\
* \operatorname{erfc}(\infty) &= 0 \\
* \operatorname{erfc}(-\infty) &= 2 \\
* \operatorname{erf}(\mathrm{NaN}) &= \mathrm{NaN} \\
* \operatorname{erfc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   To compute \\(\exp(-x^2-0.5625+(\mathrm{R}/\mathrm{S}))\\), let \\(s\\) be a single precision number and \\(s := x\\); then
*
*     ```tex
*     -x^2 = -s^2 + (s-x)(s+x)
*     ```
*
*     and
*
*     ```tex
*     e^{-x^2-0.5626+(\mathrm{R}/\mathrm{S})} = e^{-s^2-0.5625} e^{(s-x)(s+x)+(\mathrm{R}/\mathrm{S})}
*     ```
*
* -   `#4` and `#5` make use of the asymptotic series
*
*     ```tex
*     \operatorname{erfc}(x) \approx \frac{e^{-x^2}}{x\sqrt{\pi}} (1 + \operatorname{poly}(1/x^2))
*     ```
*
*     We use a rational approximation to approximate
*
*     ```tex
*     g(s) = f(1/x^2) = \ln(\operatorname{erfc}(x) \cdot x) - x^2 + 0.5625
*     ```
*
* -   The error bound for \\(\mathrm{R1}/\mathrm{S1}\\) is
*
*     ```tex
*     |\mathrm{R1}/\mathrm{S1} - f(x)| < 2^{-62.57}
*     ```
*
*     and for \\(\mathrm{R2}/\mathrm{S2}\\) is
*
*     ```tex
*     |\mathrm{R2}/\mathrm{S2} - f(x)| < 2^{-61.52}
*     ```
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* @example
* var y = erfc( -1.0 );
* // returns ~1.8427
*
* @example
* var y = erfc( 0.0 );
* // returns 1.0
*
* @example
* var y = erfc( Infinity );
* // returns 0.0
*
* @example
* var y = erfc( -Infinity );
* // returns 2.0
*
* @example
* var y = erfc( NaN );
* // returns NaN
*/
function erfc( x ) {
	var sign;
	var ax;
	var z;
	var r;
	var s;
	var y;
	var p;
	var q;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: +infinity
	if ( x === PINF ) {
		return 0.0;
	}
	// Special case: -infinity
	if ( x === NINF ) {
		return 2.0;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		sign = true;
		ax = -x;
	} else {
		sign = false;
		ax = x;
	}
	// |x| < 0.84375
	if ( ax < 0.84375 ) {
		if ( ax < SMALL ) {
			return 1.0 - x; // raise inexact
		}
		z = x * x;
		r = PPC + ( z*polyvalPP( z ) );
		s = QQC + ( z*polyvalQQ( z ) );
		y = r / s;

		// x < 1/4
		if ( x < 0.25 ) {
			return 1.0 - ( x + (x*y) );
		}
		r = x * y;
		r += x - 0.5;
		return 0.5 - r;
	}
	// 0.84375 <= |x| < 1.25
	if ( ax < 1.25 ) {
		s = ax - 1.0;
		p = PAC + ( s*polyvalPA( s ) );
		q = QAC + ( s*polyvalQA( s ) );
		if ( sign ) {
			return 1.0 + ERX + (p/q);
		}
		return 1.0 - ERX - (p/q);
	}
	// |x| < 28
	if ( ax < 28.0 ) {
		s = 1.0 / (ax*ax);

		// |x| < 1/0.35 ~ 2.857143
		if ( ax < 2.857142857142857 ) {
			r = RAC + ( s*polyvalRA( s ) );
			s = SAC + ( s*polyvalSA( s ) );
		}
		// |x| >= 1/0.35 ~ 2.857143
		else {
			// x < -6
			if ( x < -6.0 ) {
				return 2.0 - TINY; // raise inexact
			}
			r = RBC + ( s*polyvalRB( s ) );
			s = SBC + ( s*polyvalSB( s ) );
		}
		z = setLowWord( ax, 0 ); // pseudo-single (20-bit) precision x
		r = exp( -(z*z) - 0.5625 ) * exp( ((z-ax)*(z+ax)) + (r/s) );
		if ( sign ) {
			return 2.0 - (r/ax);
		}
		return r/ax;
	}
	if ( sign ) {
		return 2.0 - TINY; // raise inexact; ~2
	}
	return TINY * TINY; // raise inexact; ~0
}


// EXPORTS //

module.exports = erfc;

},{"./polyval_pa.js":75,"./polyval_pp.js":76,"./polyval_qa.js":77,"./polyval_qq.js":78,"./polyval_ra.js":79,"./polyval_rb.js":80,"./polyval_sa.js":81,"./polyval_sb.js":82,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/exp":85,"@stdlib/number/float64/base/set-low-word":115}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the complementary error function.
*
* @module @stdlib/math/base/special/erfc
*
* @example
* var erfc = require( '@stdlib/math/base/special/erfc' );
*
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* y = erfc( -1.0 );
* // returns ~1.8427
*
* y = erfc( 0.0 );
* // returns 1.0
*
* y = erfc( Infinity );
* // returns 0.0
*
* y = erfc( -Infinity );
* // returns 2.0
*
* y = erfc( NaN );
* // returns NaN
*/

// MODULES //

var erfc = require( './erfc.js' );


// EXPORTS //

module.exports = erfc;

},{"./erfc.js":73}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.41485611868374833;
	}
	return 0.41485611868374833 + (x * (-0.3722078760357013 + (x * (0.31834661990116175 + (x * (-0.11089469428239668 + (x * (0.035478304325618236 + (x * -0.002166375594868791))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return -0.3250421072470015;
	}
	return -0.3250421072470015 + (x * (-0.02848174957559851 + (x * (-0.005770270296489442 + (x * -0.000023763016656650163))))); // eslint-disable-line max-len
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
		return 0.10642088040084423;
	}
	return 0.10642088040084423 + (x * (0.540397917702171 + (x * (0.07182865441419627 + (x * (0.12617121980876164 + (x * (0.01363708391202905 + (x * 0.011984499846799107))))))))); // eslint-disable-line max-len
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
		return 0.39791722395915535;
	}
	return 0.39791722395915535 + (x * (0.0650222499887673 + (x * (0.005081306281875766 + (x * (0.00013249473800432164 + (x * -0.000003960228278775368))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return -0.6938585727071818;
	}
	return -0.6938585727071818 + (x * (-10.558626225323291 + (x * (-62.375332450326006 + (x * (-162.39666946257347 + (x * (-184.60509290671104 + (x * (-81.2874355063066 + (x * -9.814329344169145))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return -0.799283237680523;
	}
	return -0.799283237680523 + (x * (-17.757954917754752 + (x * (-160.63638485582192 + (x * (-637.5664433683896 + (x * (-1025.0951316110772 + (x * -483.5191916086514))))))))); // eslint-disable-line max-len
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
		return 19.651271667439257;
	}
	return 19.651271667439257 + (x * (137.65775414351904 + (x * (434.56587747522923 + (x * (645.3872717332679 + (x * (429.00814002756783 + (x * (108.63500554177944 + (x * (6.570249770319282 + (x * -0.0604244152148581))))))))))))); // eslint-disable-line max-len
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
		return 30.33806074348246;
	}
	return 30.33806074348246 + (x * (325.7925129965739 + (x * (1536.729586084437 + (x * (3199.8582195085955 + (x * (2553.0504064331644 + (x * (474.52854120695537 + (x * -22.44095244658582))))))))))); // eslint-disable-line max-len
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

},{"./expmulti.js":84,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/trunc":97}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":86,"@stdlib/math/base/special/ldexp":89}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exp.js":83}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./floor.js":87}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ldexp.js":90}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-max-base2-exponent":55,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":54,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":56,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-infinite":63,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/copysign":72,"@stdlib/number/float64/base/exponent":101,"@stdlib/number/float64/base/from-words":103,"@stdlib/number/float64/base/normalize":109,"@stdlib/number/float64/base/to-words":118}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":92}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
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

},{"./polyval_p.js":93,"./polyval_q.js":94,"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-ninf":57,"@stdlib/math/base/assert/is-nan":65,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/set-high-word":113}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
* Compute the principal square root.
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

// MAIN //

/**
* Computes the principal square root.
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

},{"./trunc.js":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/ceil":70,"@stdlib/math/base/special/floor":88}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-high-word-exponent-mask":53,"@stdlib/number/float64/base/get-high-word":107}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":41}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":104,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],106:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":41}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":106,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./normalize.js":111}],111:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/math/float64-smallest-normal":59,"@stdlib/math/base/assert/is-infinite":63,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68}],112:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":41,"dup":106}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":114}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":112,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],115:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
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
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-little-endian":41}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
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

},{"./low.js":116,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":120}],119:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":41,"dup":104}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./indices.js":119,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the cumulative distribution function (CDF) for a Lévy distribution with location parameter `mu` and scale parameter `c`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} c - scale parameter
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 3.0, 1.5 );
*
* var y = logcdf( 4.0 );
* // returns ~-1.511
*
* y = logcdf( 2.0 );
* // returns -Infinity
*/
function factory( mu, c ) {
	if (
		isnan( mu ) ||
		isnan( c ) ||
		c <= 0.0
	) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the logarithm of the cumulative distribution function (CDF) for a Lévy distribution.
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
		if ( x < mu ) {
			return NINF;
		}
		z = sqrt( c / ( 2.0 * ( x-mu ) ) );
		return ln( erfc( z ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":57,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/erfc":74,"@stdlib/math/base/special/ln":91,"@stdlib/math/base/special/sqrt":95,"@stdlib/utils/constant-function":132}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Lévy distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/levy/logcdf
*
* @example
* var logcdf = require( '@stdlib/stats/base/dists/levy/logcdf' );
*
* var y = logcdf( 10.0, 0.0, 3.0 );
* // returns ~-0.538
*
* y = logcdf( 0.3, 0.0, 3.0 );
* // returns ~-6.215
*
* @example
* var factory = require( '@stdlib/stats/base/dists/levy/logcdf' ).factory;
*
* var mylogcdf = factory( 2.0, 3.0 );
* var y = mylogcdf( 100.0 );
* // returns ~-0.15
*
* y = mylogcdf( 10.0 );
* // returns ~-0.616
*
* y = mylogcdf( 2.0 );
* // returns -Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":122,"./logcdf.js":124,"@stdlib/utils/define-nonenumerable-read-only-property":133}],124:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Evaluates the logarithm of the cumulative distribution function (CDF) for a Lévy distribution with location parameter `mu` and scale parameter `c` at value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} c - scale parameter
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 2.0, 0.0, 1.0 );
* // returns ~-0.735
*
* @example
* var y = logcdf( 12.0, 10.0, 3.0 );
* // returns ~-1.51
*
* @example
* var y = logcdf( 9.0, 10.0, 3.0 );
* // returns -Infinity
*
* @example
* var y = logcdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 2, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = logcdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function logcdf( x, mu, c ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( c ) ||
		c <= 0.0
	) {
		return NaN;
	}
	if ( x < mu ) {
		return NINF;
	}
	z = sqrt( c / ( 2.0 * ( x-mu ) ) );
	return ln( erfc( z ) );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/math/float64-ninf":57,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/erfc":74,"@stdlib/math/base/special/ln":91,"@stdlib/math/base/special/sqrt":95}],125:[function(require,module,exports){
module.exports={"expected":[-3.644488533448722,-1.5156156561257237,-0.31223735070118214,-19.743290796408864,-1.7238696337141517,-0.5954527314787691,-1.2625634042257436,-1.3173377243300235,-2.919115766834334,-3.217396343134337,-0.5425065098814159,-2.2822814223409877,-1.7722750272183108,-1.8523634217451264,-1.3139400843301763,-0.7511881115579835,-0.9403236362018205,-1.141864536941787,-1.0006504643794627,-2.1414320518562517,-0.405550019839682,-0.926969546178418,-1.3880619442097868,-1.1630013650470887,-0.7519635906969621,-2.682025060512348,-3.0370613896713317,-13.63855793174049,-0.3256740044363421,-1.2805983833273402,-0.6720656105442043,-1.7808412207022497,-3.128177727573205,-4.497089484991436,-1.0485823671089458,-2.8519753382762834,-0.4666050374957424,-1.3886942583022435,-2.709674186163782,-1.4850882136144379,-1.3542760083132694,-3.5520281117066768,-0.8281226975400318,-0.715495599702886,-0.9278063318755356,-4.419904209199871,-2.3446331260572126,-1.2948890689948989,-0.33637313450894646,-2.263968893762967,-0.3728991764776324,-0.7761725336625664,-1.3122125345108362,-0.9512478492687362,-5.974901005667159,-0.8311334511693755,-0.5474949424544733,-0.5845738607327613,-13.798916015061055,-0.5998676413414172,-1.0698954031580066,-0.8949939961246681,-3.7947265455410917,-1.1991096006880673,-3.128662503373736,-0.6207309919091751,-0.782118021108772,-1.307135951607623,-3.2296842411335094,-0.8798356657019716,-4.048760085303881,-3.500553245895362,-0.8759045648740387,-1.1582748085370624,-0.9192684879043759,-1.7117273093410184,-1.3696780104606618,-1.1649476020985607,-1.415918601189477,-1.1156614733096473,-0.7484451291690734,-2.4108296036687387,-0.6783290844180099,-0.861724175929037,-0.828427138479545,-3.1518889702196433,-1.7342573576780596,-1.1818061019672772,-1.4238045542628466,-1.65361041571279,-0.49159051946801235,-0.4843329997481238,-0.9423535975675681,-0.8509286844996558,-39.88931747003167,-0.36725676726386514,-0.7205749402821346,-1.0946102603883243,-0.6620063015155985,-1.2179769413972554,-0.9064578292889504,-36.50760229028932,-0.7002288559009138,-2.5565642188904203,-1.0676197416848743,-4.680206476187557,-2.7179755622077284,-3.781410945627427,-0.44851828487841894,-1.2546430241614388,-1.1050771822815881,-1.1157303190835552,-2.683714723865648,-0.7516126495899845,-2.7773897636314007,-12.135147905972667,-0.2512331261081131,-0.531147078409353,-1.1059799054479518,-1.6641344204887423,-8.052575833749748,-1.4799382424912713,-1.7281546333346154,-0.5789854460790571,-1.9339016482546738,-0.42276521082994806,-3.4541770083791303,-1.6781610323028406,-1.4358813636061234,-0.25141726345232807,-0.31185999988786645,-2.2953524908892597,-0.2888979114315567,-0.6488713327100528,-1.2404801131961756,-1.1882813753430508,-0.8513617714801297,-1.7807945910560923,-2.089920154955508,-0.9617321392341052,-1.4897676541416633,-2.216633891403305,-1.0629053691217711,-2.310200620360113,-0.8206378534544735,-0.42781713476245353,-0.8110174009322362,-1.863746458337012,-0.5193279000808064,-1.1818882313313142,-1.1802856065553522,-3.229193001194833,-1.3970558369830754,-0.31949256997521225,-1.0664803788473272,-1.0857124329244794,-1.5702992101985478,-5.249607049601664,-2.1561030802559205,-0.45845391185124285,-5.7682068773313855,-0.756126988550983,-1.748974632105515,-1.370741871150813,-0.5493515939212551,-1.0405601597988594,-1.9754157497454303,-1.7055966756336354,-0.8117474260431846,-2.025865886598256,-3.005963772910308,-5.680647597477202,-1.2649646450876022,-1.4878802657676784,-1.3858098034081932,-1.6957227710799978,-1.589324172163004,-1.7885330028779152,-2.0129882318587367,-1.024715607953618,-0.4695924559603319,-0.8487908098275854,-0.40414613051481635,-10.086949267162918,-1.3500331557006353,-0.7242713866235602,-0.6326770312399571,-0.6738940577347512,-1.0326210825553006,-0.28689643685827776,-3.2716871077507395,-7.380923606207269,-4.987520474792476,-1.1120550052652782,-0.6815426543064005,-1.0152993494981952,-5.167103892403433,-0.44975381006198384,-1.1421408675564813,-1.91877056930664,-1.4324531111579386,-0.8759018553599892,-0.4211967956878407,-1.0569690857897391,-1.2566315004228288,-2.4769684636689417,-4.113495998955325,-3.087778494785102,-0.8429429980365283,-0.9608345736824611,-1.2950065389241536,-0.7076721783282037,-1.9288700573347644,-1.5630630565465358,-1.1692071115211842,-1.125324616092707,-2.7797702877618304,-1.3936668477359884,-0.37022682957068764,-1.087705121008389,-1.685086477323628,-1.8188704184976972,-1.552956267349514,-1.5006935322838801,-0.5588769332730515,-0.4771008280759426,-5.659613428193506,-0.567034593968512,-1.1392284647153381,-2.0171889092626243,-0.9272469402385476,-1.7723937139095072,-1.01759553764899,-0.7158156440270396,-1.4065119453177888,-5.271207722220156,-0.8136559740612662,-2.30331441612133,-0.6816235677381658,-0.8528930718074023,-1.3082394476841643,-1.3138952132306756,-4.540334164783312,-2.0078304747801488,-2.0639710098018815,-1.7030720437489135,-0.6917714544783269,-1.0734721609505735,-0.8117318563898421,-1.7951089398382802,-1.524252098642631,-11.694819140136792,-1.9928625591128244,-0.7474456757090363,-0.7868211515960224,-1.2992897215418886,-1.1103002115753429,-2.5830842703270127,-1.5024407979390435,-8.289271646530707,-1.328168218343678,-1.901055123991842,-0.6513118088702124,-1.7846360769873295,-1.280927565393977,-2.13601001440903,-0.8474951510720867,-1.0088484805826046,-0.7327069400095989,-1.3594343897655656,-2.3702563376455275,-1.611998549436664,-0.5867175805320649,-1.2721734823354096,-0.4084273476970633,-0.4015101049200448,-32.74152188532455,-0.9808614776099482,-1.2334891756148232,-0.8370309167022071,-1.3847186797287598,-0.8555264856466698,-0.9482752551137793,-1.3149878931959587,-0.8238253236535125,-0.31880947038529506,-0.3392729196718211,-0.9158754215261827,-1.699966307669533,-2.405171897491783,-0.6291697583569014,-2.6540188569286256,-1.3556429904608038,-1.5913233163066052,-0.9604083726404333,-1.3108732664293494,-0.9868170380167796,-1.1256973800082088,-1.3096377399677315,-1.2456782390751473,-6.028806634966391,-0.7158712188100048,-1.7229797509001485,-0.8830076967509801,-12.312024849864494,-1.2979019211689728,-3.042980493994732,-3.6935446444077913,-0.4105539805044803,-2.85034371691296,-1.026997868580241,-1.723287238148179,-2.4756979839116373,-2.0563887554139697,-4.069886451901009,-0.3353303422609018,-1.8341228738929503,-1.8521534184196125,-6.486146285359973,-20.799408199545056,-2.0609059598350137,-6.969636100787701,-1.655882521318214,-1.6353931927509824,-0.7747751861742229,-0.9429807069310057,-1.404825714968412,-0.8365992567620677,-0.9215908734692878,-1.6480432500431952,-1.9657659598062431,-2.307924642633729,-1.0188738675280509,-0.7979258181534203,-0.36527073024820755,-0.5990579766735975,-1.9825017150299964,-5.530062513372352,-2.0807111179813003,-1.2793932377507191,-1.6685171282072426,-0.7338327450861639,-0.2582000870049657,-3.9806661279370954,-2.0962761465383926,-1.3063266384331806,-1.3473947867889058,-31.72135014234373,-1.081510324663915,-1.4028860169525479,-0.6800132287239882,-2.1138674579360295,-0.7517015264255905,-0.6642289695226303,-1.5099590074798068,-0.987123424439783,-1.2472914666772115,-0.5205668582080603,-1.4591571601390463,-1.0503247936347293,-2.0473333768908564,-0.40505744616389505,-1.0842711866558628,-1.665212092284504,-2.2785236166269125,-1.1030605156411166,-0.9236387428905859,-3.544207519400916,-2.127128351139842,-0.47348155380065265,-7.003848856465814,-0.6625320554688091,-3.6694959633423068,-0.7712655892945932,-0.45011791972870807,-1.1975943356719867,-2.2685599049750373,-1.4708119933949941,-2.2916821380384578,-0.7460234398529383,-1.4563923219902484,-6.035106498988254,-1.421921746300529,-0.6557249562115426,-2.1120005691163,-1.5933570415898335,-1.1236825422534469,-4.928755369418577,-0.9453586723112161,-27.301602257113217,-1.5011644881567323,-1.8090300097668435,-1.5097435223690363,-0.7289695585204137,-0.7092919584888147,-1.381019964992992,-1.0181227957152048,-5.575124138843855,-1.1696770265275387,-1.053996241698986,-0.3203667962672033,-15.77542043753347,-1.230084476527825,-2.5807164194467167,-2.7275484392812257,-2.3085288562829693,-0.7645728133663424,-1.1085191227915447,-0.9839774763715744,-0.36246720078453293,-2.5263548523585415,-2.241062583581622,-0.6441464830133302,-1.4575358635182094,-1.0027633212788394,-2.241711120496364,-1.9657001577199797,-0.9112055994084259,-1.879144123960015,-1.397326680915201,-0.5220205848324585,-1.219657589047614,-1.7620904906396113,-2.016495937352741,-0.7682225707904216,-0.6597704369937724,-0.39535978592581056,-7.006871634656699,-0.6684668631706874,-6.3148615224265034,-1.455095163499631,-3.051294656696599,-0.9001946754640655,-1.1702460063567484,-1.094885877532198,-0.73856345122791,-0.44346756181149083,-1.5079297586161156,-3.8749325096999323,-8.268448903229872,-2.5759229125322958,-1.1651236214241205,-3.371780892490215,-3.208931863856969,-0.7345554904644184,-2.4816749323474743,-5.565663972431341,-1.3071651481763749,-1.1932922190037527,-0.46216218706123646,-24.59455608638962,-0.7106111082549633,-1.112260436999623,-0.35528647979526407,-0.9098063233390645,-16.383493740962038,-1.7449965735949102,-1.1815944150053372,-0.3541431466277917,-0.9044439854884079,-0.5755545944701158,-0.8029476547182666,-1.8362838953903844,-2.1564136782075933,-3.8556660620546213,-1.653248239458553,-1.2440517073290351,-0.8560904817035596,-1.1180418380815573,-1.423998496799241,-2.0272808031544987,-0.5537760185612182,-1.9060258769830594,-1.9251271461642638,-0.686172424931182,-0.9979914378844231,-8.120642023368362,-2.400898873248701,-1.096739029305476,-0.833642618982514,-3.6590007346980236,-1.004618754084504,-0.8818842451597831,-1.315862798118336,-1.589880690250119,-1.0335637858086733,-1.1949533548784013,-6.569431111724462,-1.3542205766279722,-2.706882528348645,-0.9807691169109055,-0.5314711028185047,-6.434225596462899,-12.949183920723272,-4.878096114579231,-2.276751431886985,-2.5737419711067235,-0.6391771269378245,-4.179580590179094,-0.68488039089564,-1.5420440599160419,-0.8898802829160459,-0.9317937985648268,-0.7317961934444102,-0.995058945152471,-1.1431341300898645,-13.140198270088067,-1.253577398062782,-0.5410838425055862,-2.181596066709578,-1.6976022297390168,-1.5753216516934787,-1.4143861081048952,-3.257723252451905,-0.9791042279344763,-1.1011851713739338,-1.631590373446374,-1.6569118116224135,-2.313186681894268,-1.7484904407116917,-1.8796633157826828,-3.6091256141976222,-0.2922197820652478,-0.4790148926388025,-1.1377551029877493,-1.1824787250040787,-14.527116190301633,-1.0930831872316908,-2.7848779419677876,-12.063357487457404,-10.362762287701662,-0.9565921185052908,-6.957799329980543,-0.781368261934582,-2.0703941108547212,-1.0979459574579036,-0.892832359950576,-1.7934659765539396,-1.5105170648234196,-0.6988663617635366,-0.6041428356534979,-2.0834321782946406,-1.2463282828358349,-1.9862327664131632,-23.032721173699468,-1.0479658282584028,-1.4099481907105889,-1.7175525190345473,-1.3134124668740714,-0.6730712482834088,-0.407210691653684,-6.332645799137443,-1.2600093079329033,-1.4104115021279753,-1.258754327968574,-4.075483636276896,-0.5074815783252784,-4.327760199624063,-0.8533522698913341,-1.4480105119827849,-0.5235415507334688,-0.9223531499305758,-2.208511478019955,-0.902139714990919,-1.332847818013547,-1.1612539189622038,-1.313224626337279,-0.7765072556612129,-0.8498983848946389,-0.43071522427301223,-1.015915146379577,-1.303416408864429,-1.11166399278145,-1.0319544996407974,-4.101218674809631,-0.6314914171218025,-1.2108991012478987,-1.260579820877793,-1.858952576279297,-2.0177090049362376,-1.1683772962018166,-1.5313919921707098,-2.1450761063039727,-2.4043065405789137,-3.112742107935436,-0.7133746354244375,-0.64199201280829,-1.687945881933679,-0.3560486533773206,-0.38957639777157416,-1.0704424908455312,-0.5081876230562876,-5.999304407647216,-0.666475202311686,-2.1419504170973336,-1.0064895872396735,-0.9181039717468381,-0.7696482965683271,-0.7785748255474946,-2.4169461118376723,-0.7121792792770044,-13.05128302208883,-1.3297067160956895,-1.6240541297901558,-1.0023404075424593,-0.5726994095089086,-2.5545150783767423,-0.9956550910085803,-1.9333244509661585,-1.1751207864292512,-0.9540890124455655,-3.570267253428591,-0.881469965389168,-1.9075779038766363,-0.482149475675424,-9.014702227385703,-1.6482374577477403,-1.4141688577517189,-0.8916792056334574,-2.5075009392898107,-1.5066310479788263,-2.2288299237389504,-0.5717803159013419,-0.8286084009719348,-1.1484097080107936,-0.7867630873706096,-3.193059271333549,-0.8633791132778801,-1.8296814005536228,-0.9252816688385455,-0.32721355660637086,-1.3051580994872465,-1.8014351413360523,-1.3739501071903004,-1.3811783639852693,-4.172099372894391,-0.9594127465796172,-3.9750000753935097,-1.1621505664064802,-0.6169901012711353,-1.0913146536769294,-0.9071719378971497,-1.3078125374174125,-1.8627095951658235,-0.5854125153022378,-4.540573777623548,-1.5246142136206875,-1.0903411445289701,-0.6831048385983352,-1.4097699586019294,-5.83035582419476,-1.0135912208170337,-0.9847199757476066,-0.8361368382232983,-0.6636628604183704,-1.8447786441449519,-1.4138162514692827,-1.1973592601377838,-1.3581800083592321,-2.977459590321351,-0.990471979735126,-0.4505265960910039,-0.31338584851084245,-2.0684841109708962,-1.2728410443294307,-4.249533828376904,-11.921814373935156,-1.9827481209469175,-1.132489689975456,-1.312566971687173,-1.510231208980414,-1.1763767287173414,-1.9357598342724747,-1.3107562855858144,-2.2508622221838666,-2.9681807733187355,-2.6157065917155933,-1.6020687942141925,-0.8184717622894203,-1.3300483388052693,-0.7650798774609523,-1.5062737449570531,-0.9836577564713356,-0.8672356664943788,-4.581899119859029,-2.862822395876127,-0.35874082671522,-6.791764001948577,-0.9132186972952434,-0.9902718125664981,-0.8078150180524463,-1.1123011933372933,-2.4875182286323128,-1.4630723848406615,-1.2509332631492687,-1.36520528233452,-0.5862297779200429,-0.6987282675639443,-1.689838464055923,-1.199176964966398,-1.2783648564871355,-0.6237414467074268,-0.7379409552411417,-0.78756427296122,-2.6423644439916045,-2.730916610209362,-1.4558601570632184,-1.2422460762144785,-10.012705054754857,-15.41477756270894,-2.5768949563141805,-1.182516338709644,-1.8600736185000888,-0.776923535953199,-1.1958014676495645,-1.289951343151571,-0.6434718841971963,-6.396892826198781,-0.8712830197456674,-1.1108039537529497,-0.7180482723222223,-1.7567962093900293,-1.3992282774053446,-0.6614493177367347,-44.33019763522028,-0.8939752020347356,-1.0296570020797313,-1.2160518846975679,-1.1457239456180648,-1.2589050810882016,-1.3239623127392774,-1.4791441368726888,-1.187846555606519,-1.7828003343756542,-1.3579557045805055,-1.0546206200130395,-1.673554224107964,-1.4511135738937457,-5.290708494343294,-2.1584572352126496,-2.1143126291642655,-0.3683592950078879,-0.9668208222941235,-2.3728748345666366,-1.0140692194329195,-2.3077845032905087,-1.0354725654126278,-32.1205372052989,-0.9944064582052605,-1.019130594861451,-0.991294408217531,-2.8851555119054524,-0.6397897441515027,-0.9216724144482412,-1.3893331432272644,-1.2871882913967352,-1.4710229270503055,-0.6082719125959912,-0.3991654472682726,-2.3270501462503965,-1.7632100632648429,-1.0160028585832634,-1.10440198189857,-1.5041642164116946,-1.4210188265091201,-2.6629737251669128,-1.501603770652525,-1.758153013369183,-1.6253121592737783,-0.8722452590915564,-1.1680510070662142,-1.703968062109071,-2.078163926678707,-11.571314594157233,-2.6770690891884152,-0.831686644711097,-1.4216506112580363,-1.1699864266400477,-2.068124268673718,-7.675494909611824,-1.0932644544397416,-1.130478559936948,-0.49733759723254717,-0.960317571228563,-10.117330108212041,-1.8987662697821743,-2.043720337698076,-0.6779288813368679,-0.31796419145557336,-0.8637779257174593,-13.562391434531202,-0.9532704115575537,-1.6967849768479881,-3.226897915873867,-0.8142475758651146,-4.432155488241997,-1.1602396609444723,-4.361400094278869,-1.7274458588040515,-0.8731914689608214,-4.015611745123731,-2.9232624156132236,-2.523449397898292,-0.7859489850550857,-1.0572731931149049,-1.221563519613899,-6.261904965689402,-0.6326829909207267,-1.61727090528571,-3.3945672395706126,-1.2445802312413385,-1.4089772827028149,-1.0825610774433565,-4.528483421346138,-2.118191052685235,-7.4835516475398505,-1.6514087120000192,-1.2917113023676394,-1.0491157230208097,-0.8943457079479245,-1.7094634953712105,-0.7705227001170939,-15.067234036782125,-0.835079294441336,-2.231817611115895,-13.42228560751753,-1.0287887869887669,-1.0854907897331354,-1.1156751218949887,-1.0803401540988844,-1.1627262225161628,-2.402769793101714,-2.05920140891804,-0.7267014710670356,-0.8140753628532275,-3.992828198747481,-15.767425863209324,-0.8418165418210144,-0.539926326288418,-0.7099301897410574,-2.2541308637020836,-1.5677930334943033,-3.7279669558071866,-2.65552501511446,-0.6964217458974539,-1.3681847265290494,-0.8654619913927444,-1.703108179444578,-1.3418098935444065,-0.3542228891750169,-0.6188568777002168,-0.8863268716661657,-0.8974669605020166,-16.829474820869862,-0.9604943852615111,-0.983337529382733,-0.4338309105621376,-0.5417938367861397,-0.8496248508159738,-0.30371115067466736,-1.5762934938358353,-2.2389866984861846,-1.0936382874636401,-1.9866374494557169,-0.8455598755317527,-1.032923593477641,-1.980844025886296,-0.8946652133526846,-3.417576451047724,-1.1930904158103597,-1.2838092491334612,-1.0320668482424962,-0.42488732837983123,-1.4186286316680277,-0.6708300391280317,-0.9484574271634556,-1.2183705207210136,-0.5061862417981691,-0.8251104464891914,-0.8469011821721132,-0.3099472694857334,-1.2649739813584415,-0.42913880870182125,-0.4939012868644897,-1.4409274990033172,-1.2011834341746672,-0.5122710459902852,-0.6128455619669168,-1.9770303612470335,-1.892636305249891,-0.9690984595286263,-0.7080709586525753,-1.1599453801982869,-1.1187677149486137,-8.468681843556128,-2.0312487631035423,-1.0179853959521126,-9.487592352423341,-41.151585960198965,-1.951448822724778,-0.8221882891271057,-2.6271196361441422,-0.9578512505086034,-1.7148478606994677,-5.9781615900346,-0.6496357216665185,-2.717848427134591,-0.9687166087820147,-0.7808986809997995,-0.45586392523401353,-11.647999658191903,-0.5455287000281045,-0.7725221936546081,-1.181272483260103,-1.445211802212971,-8.658147187064284,-10.029455116160086,-9.036320435741805,-0.7570982383261222,-0.5875905182737365,-1.1955825244333873,-1.1684022203405353,-1.374898950984112,-1.0145965444193146,-1.1897448033076985,-1.0202058504337985,-1.431705115669486,-1.2258802501598065,-0.4832279104668949,-2.876403384057862,-2.061128606391936,-1.7656628239986782,-0.9997673631293428,-2.631520546748884,-7.704860429700335,-1.8221013078404145,-3.0886375257546863,-1.1240920064564786,-0.820637221317817,-1.2197650628515155,-0.9197683646183186,-7.063422887185171,-1.156830000374025,-3.4950531234925006,-0.6397292867825817,-1.0349958937906347,-0.762995575069375,-0.4007993688755429,-6.38386723302836,-2.5725269604261087,-1.1935607618350297,-0.6339179262242811,-1.0964778182239847,-0.5870109831543088,-3.422998139277979,-1.3912867636114323,-0.5174359117125695,-0.3684326184441737,-1.7390348419366348,-1.1915524583519577,-0.6696913000123862,-1.1768225863646673,-1.3955488584356182,-1.1911071106211502,-1.1095125090778466,-0.7404313960730435,-1.613193854546144,-1.1653465464130734,-3.222548163228258,-0.8852385355376364,-2.2364786835954944,-2.280284369014452,-1.2339965967885407,-2.372418422999805,-1.7059838623048988,-1.3305870066017598,-2.3596410269619215,-2.1588103229853317,-1.6736616366082349,-1.3331265550502511,-4.275870379763558,-0.2963722831216874,-0.9409679852509549,-2.084737355091024,-0.9012921407994171,-1.0521421519723584,-4.248449612287142,-8.99043261059277,-0.4553021180523536,-0.31202366232367107,-1.0896516340895106,-0.8572259492529017,-1.1294477277275032,-1.1850109139491256,-0.31050883666200557,-0.7923551721173987,-1.2226239169756257,-1.2516904815844225,-27.480423302254152,-0.7939582919187151],"c":[11.922479777341389,3.4909909207288408,1.7108106834026628,14.555586280173012,6.440181058181128,4.563642975534918,12.332381043109347,15.0991921199054,13.18339613249908,5.83333027526959,3.027362031399073,13.554765358578154,13.365924548561466,10.145814755466839,12.089669318776906,7.583923601376983,3.444191574452559,3.217965801478148,2.758381428474535,13.611405206632067,2.7765469768583175,10.307153772197113,15.138461536252178,13.074502808198243,2.8126416609013063,15.53917029037729,9.46529903472827,6.4650608857656735,1.9087585039421653,10.245616817640745,4.848182998064531,10.519964246901585,9.901476071524355,4.930053882565393,12.42870991066639,7.569500553325732,1.643879154858945,11.413881306146177,11.084731263804006,15.042290364110588,7.188158624194481,7.346359454229179,5.3442915539158475,7.0038876989508685,10.893755961379757,3.624264000623956,14.304836016698273,14.52915654308546,1.1091798035984315,12.940550213374076,1.8004415648136087,6.423729059002102,11.109326922168316,5.397933084296134,8.231875963274103,7.122040135365633,2.577243641644126,5.1342490764416295,14.30336330791321,1.6566481981497896,9.912558833694947,9.849729329755197,3.7320460281741377,13.279095021555397,9.064563191949524,5.377558178312729,3.9770139196781087,8.249993399614436,9.583416837114243,8.457442839128461,6.246111351962426,9.881190279351262,2.566799694978338,11.764986907184644,10.360344060364486,4.270069607010968,9.309013863257036,11.951782582253323,10.46905570306445,4.1650434704744645,4.61445900126229,13.956164505847626,5.735416354033188,6.182762637198848,4.79500948490452,14.983678530853586,7.238007409713189,8.593480623907666,14.059384633169815,15.788557258600285,3.7284950254208407,1.4128104268004495,1.5420627889246699,2.7032146113293334,11.987151714435253,1.5699716172339397,6.738955729068823,5.883325476379829,5.057079841378904,10.816583712060265,5.767413548634908,12.441563559034009,3.829485442016529,6.410090427285416,5.914909508576354,8.562240221960483,14.243676386671918,7.756251761078893,2.593974279074295,7.30616776210023,1.5716433133773158,6.795030348275894,12.474644100799201,3.219183669340775,10.08951750480942,13.773102288698365,1.0868496273834751,1.7009129145433801,6.337223798160615,14.403854387187904,13.50560873448265,7.847300083708397,8.754662450214095,3.9437127585787337,14.160039484055941,1.3065672052469504,10.887934500709681,15.114572115701264,7.778377984619247,1.1211110881349808,1.4970174890049361,6.557155544785699,1.5382201395831931,5.7968207199833355,6.997770812797406,9.75085456491435,6.668363394489974,11.452548872000285,9.904900518455683,1.4639872759187802,14.218726475655256,12.132241429726314,13.246986486624488,8.94971468206362,6.612845460148779,1.5116558990165865,7.904771985061416,7.9811921850396566,3.3820562205982743,13.527746077286887,13.005544815045608,6.176548535794906,14.352866302324172,1.5912642639701449,12.940396820763912,4.794335041383162,10.707032351552074,8.39583252820548,3.4933494620842653,2.72353940094947,12.848658055469489,4.327329312304802,3.5855864394800654,10.409493114926471,3.436677891217122,8.786808318490962,13.505421655948293,13.48518761624086,8.213481384582044,10.75511598278921,9.686908721706581,7.016833922154378,14.2150944834179,6.253559955660857,4.239904487447692,11.258454213916306,1.489703758210267,13.893326079642867,15.429715530323378,10.118648449782734,1.9331323958230353,8.44098231503978,2.2005839456121326,11.072745248334597,15.606073996972967,4.388183283002089,5.079447432194765,4.705974644701271,8.560846400877546,1.3413280481103453,4.763456991375933,13.230025184405346,14.451748960534143,4.217645144091867,4.526497854713959,10.099488468724253,13.498793101219684,1.2806148529184649,12.597626658197655,8.008999935836632,13.54064538367499,8.897118555586145,1.8292142245171774,7.702255358874021,14.67200652018173,14.466680431224201,11.626131793709584,14.265953529110675,5.806233316621027,10.05615647123172,10.945003453612893,5.949583756925043,13.520363879141735,15.228632562679039,8.322518870222813,9.825989173595145,15.242877757121224,11.69839647635576,2.0141093332921383,7.77248604507708,5.748478422112759,1.3945115161833601,2.1936224669765583,6.877538972224223,4.637634208342732,1.187262173676015,15.731487356527824,3.601848674846182,1.978238068087779,8.58318496067579,3.2480644008980333,10.666386650185773,5.585293753538045,6.876862137010295,12.11484150287435,11.575450509427991,5.96837559864378,5.430041004188553,4.408995968904486,2.5692258974592654,1.4982673530871773,13.411910189330907,15.316460584242147,10.711090894259286,11.12584307026765,13.908510528284484,6.736724146725258,5.103970879669551,7.934713495537068,9.68548201765809,11.92512639844577,14.657350984413593,2.7680794576227763,5.699954555338161,6.461566795182959,2.50877331480371,12.749253984864822,4.146324012741257,4.273193215105614,9.961616412179156,15.955331013277263,13.780114447069273,5.809859741157963,4.713974135175691,15.32743250012649,14.41053417615973,6.434264107251759,9.14584350445039,3.210256891744703,7.7644633195657375,7.423756943148563,13.908185826180704,2.4018091106309405,9.769420572886604,2.234189362546717,2.587210550743865,10.639904146261681,9.033116732341304,8.501670195727435,3.1645712513853033,4.2692877666265305,2.7159411406964797,9.616094685039675,15.312483313840978,7.088663176705164,1.2342130832565703,1.8606203247683475,4.176507125245024,14.459055678166283,9.626961811499335,3.7565855061640985,14.480047525116717,9.592150006324808,13.70914565322165,9.874411128352888,15.488834228772205,3.6482026178457394,6.986992400393875,11.675880970005442,5.155958221082613,10.681294126093936,2.3064202681090995,13.872327304451193,3.10321098520272,7.786854261490874,7.738910548835695,14.656657826452575,6.613764921848067,2.5568082076792935,2.1188066363312466,10.214343095587795,10.656585237765858,12.306245509066708,10.478347710721337,14.319899426689043,1.0089194509039325,11.928840078332277,7.953589385434062,14.980261758596427,4.516017634933469,10.300326140518084,15.185852062211588,14.172673333773572,11.944492220281747,4.21298880406998,7.9554404817109265,11.20732044867548,9.265074538374812,6.394999386961482,10.205398726273264,4.5961814010275095,11.78950522064212,7.465890759991275,7.836303159574401,1.3057885291135742,2.7941627884139377,13.441791428208903,15.480820376011394,8.825855265178486,9.422955769122405,14.548378193229203,6.670987478274265,1.0894487792859866,4.531542216598145,13.965731681004728,7.557389323417988,15.63370912290543,11.470255808947325,9.653738155362467,12.323908484916057,3.7057695550519414,4.526546689485809,6.606445276788916,4.761170959579772,15.653745791227413,9.728714505543175,5.709453240396508,2.846735904571304,1.3544076771465887,9.111397913392416,12.208958528367836,1.442388781626244,12.784611205950903,9.490162607235051,7.217168425808665,8.394673498863801,8.158584635264873,4.436233222125167,6.475869369468511,2.6649980725071147,15.42936433480478,4.823401919353121,11.174505421802692,6.223950382776778,1.3235038617516495,12.938614443485871,14.517649749881466,12.815026466924266,15.6962158798902,6.9931060483718,2.992128395556134,6.253954635607525,10.569098428019526,6.16008998319408,9.975966597901246,6.688412238039624,8.332631095637424,6.7799022722329605,9.314256987575131,13.221517954073587,15.049940945679628,14.182364900185439,3.3407525635567508,5.755865121903154,6.536980070704186,4.318274951447101,8.315459411430036,10.684568537616787,15.116102695860386,12.760183348616236,1.3724557832620812,12.945420496032567,12.288122174746398,6.184271815606878,7.864922000252176,10.83783549972104,5.557960384119132,13.41567014489746,10.757575913945407,2.2550904300872334,11.712579765812528,15.731336717292724,5.601579322243726,8.08683648486788,11.568746124091493,6.638392337063046,14.903378277202792,4.515811600305348,10.014183819153901,7.376313455816397,3.489413795435892,4.10934382075963,15.226230102309845,9.916100696066453,2.534486985454113,4.46230157258497,2.6570423075479592,15.374876842305897,4.303323575711677,15.174409910482984,13.816786829563528,15.681221718222211,9.29431052127983,11.315722111722383,13.888923040242297,7.028003621419336,2.601323696660366,9.13530370912319,11.691024821596937,12.001254674425262,14.160335036927068,12.674939119225073,15.929193606320247,14.925865836896575,4.077933694746447,4.59528032051198,11.251889657366743,5.55329993601446,15.837641976888763,3.07033954652742,13.171915674927114,2.744279789123161,13.425124593945844,1.5305153738386337,4.033134640122777,14.51219229426546,9.160768860005327,7.297654464622026,1.6364978231101714,10.48102633754806,3.504763830572463,3.703464429917183,8.459872582840381,8.797348519104427,10.406383392369346,7.380616090062406,8.309157838058347,5.316730672058928,7.350622777610595,14.350548350774705,2.8081825435513252,3.674378139620548,8.02547028603601,15.28980631308445,5.115669016506473,9.951187672086805,10.532954324433584,12.587236980939146,4.407124032081047,7.527590622368839,11.807222226723399,10.521843633751121,6.682999987639411,5.7498293684465365,15.079303176598417,4.044799927994038,2.932009879565669,2.7734639167692148,9.620116502141475,13.442033492453273,9.705463072472572,3.93337096043907,13.35967126523291,7.575576356395042,14.582368147186495,11.879153326047064,5.344678347658613,1.7241105317851082,14.856474471432605,6.184000594358521,11.615153336808836,8.236121954653076,8.253431186409127,7.131463379186809,9.147914610524278,13.115937741490054,11.694392680919512,14.572477672683592,3.334502019558343,12.696203546314557,9.209303273021414,9.891989183470407,14.323975728751071,9.846525392611118,4.234184349664234,13.40784747254811,15.008824576240151,10.919785656279764,13.772732967175893,4.937850585105689,1.9335918188418102,14.13420923516968,1.5445559358197793,3.01278564001371,11.87643901190169,13.596015329390609,14.860619350575572,6.628034725151018,14.489652974124107,9.505938596754683,7.333114129957926,9.11838852589668,14.547589626175098,5.898294166150185,9.34577477600017,9.061979220901726,8.168722262552116,10.283117777647515,9.031314114689007,2.464749860230098,1.5973681300971467,13.957841932921868,15.214532412932565,12.796740437775533,13.337876467212151,10.820680078172895,14.891976708543588,8.360535960825988,14.148147185553112,3.769991480820766,2.0400510166454833,15.702976710385302,15.115997107118863,10.343681813340183,12.100974582735816,13.723963425426465,4.068465470779276,13.676323363764444,8.246760598220208,10.72920338800752,1.2417658947460843,7.077915882565842,12.832669566989296,3.01875000873754,15.808596429289974,9.414727667969556,12.966875521791307,7.5702039739726885,6.804424349971678,1.93519660492152,12.207930311300434,3.496205595546619,12.48318125532882,5.538435110666876,8.798194091431132,4.608835678525598,6.596014568172728,7.798388009443672,11.299424257982027,7.625700420896555,7.26612396012531,5.833109833594413,10.837298440813072,13.36057200490067,12.041789871354812,5.5448171565231865,4.952289263997143,13.20540061926088,1.0486354644385678,2.519284839412096,13.457113820575938,3.734153501098554,9.238086217124861,4.981854311297476,7.6815303850916665,10.85991066161956,5.479300021854823,5.2822771810785945,6.882571734662266,9.808761360353742,6.706044473586881,14.318944776437991,1.731925723509348,8.600223728545755,11.28763765332499,4.886623769444901,7.296758152976142,10.235758043258446,4.008257008264406,15.334335260431617,10.542487852427726,12.484043493375978,9.110261739428438,13.411222102690065,2.192741877957012,10.038255552271234,10.143554085991903,4.70017954760336,9.160083213458408,9.064154952725755,8.326043301009184,8.455979553356869,2.9190527763080856,7.73487798529705,9.27565964288822,4.347348718000717,5.834759231182996,9.147036526489066,8.728659702580423,9.540110180555033,1.5568574202074494,15.277306775038696,10.198170407217512,1.5583571466814874,8.120986858786758,14.49950704776395,9.586211810594051,11.423906165136906,7.173677331831655,3.7857630138396337,3.855439801857128,10.405849809272478,15.737004044026978,11.622193501167478,3.4426525894530404,6.235802258084484,5.133478879462782,7.837852485340998,5.896999100098187,2.270341679422139,11.424443142733535,12.042687461650376,10.358337280662537,8.533846681711031,3.0152843670522302,4.365432528847264,5.67687938517,15.665874035301762,12.40456904353807,3.9257092692300226,6.130558855111159,2.5725537248083588,1.7279081922003972,14.438030438476096,12.22713324302895,14.091027168775696,14.673740862833801,13.361874475512037,9.908312860841322,15.196668038544114,9.795382478512133,10.121999176778408,11.578530442776078,15.96705818249091,4.903686668906126,13.015697499910125,12.248119428275379,3.997594732969462,5.0769134333974675,13.732237002451111,6.776355420685176,5.779382219088186,10.282515838354847,4.004024881890101,15.095718000861329,14.809438051265007,1.1428047442175617,14.761835164333034,9.118601263311017,6.881481061056984,4.202571655624771,4.213811718076563,10.826755091843179,10.364258233080783,4.374338353905435,6.14269714710699,3.9313652710308924,1.042982293129652,15.530461093343343,15.728650905813522,11.869441967656496,2.4432934021473853,4.115946648610227,3.3038712865105992,13.296846075825073,15.813099076800178,4.64500186595828,11.227931715968104,9.782761908795417,3.0974743183904234,11.043525766295001,11.47158385082868,7.432063654017568,6.155154852359633,12.66989599122716,14.500756087441351,4.627396483540176,6.068177814889964,5.678451377029937,12.788279092855097,4.807033785507389,4.418580712798491,10.388777568793651,4.33680306561747,14.08111538430852,6.930062320144332,5.40767186021921,15.399214096359946,9.767314819779116,15.120707872051256,14.310214704240092,11.103704609694438,8.373737864627502,7.385580060706434,15.695614191532734,5.833095673922951,13.749143522909092,10.890221513223501,9.010503684282043,7.971253342886008,15.70930067791645,2.17507956771166,7.358153693488905,15.888312332172271,10.993299322434467,5.696668718088822,11.773983734262115,11.792307856829792,8.937785682099992,5.781349919289374,8.365983213165002,10.841626240014334,4.695445435531639,7.9658176454236465,10.693036240062682,8.626370656343024,10.082160739791872,3.4695023767946656,2.6083285957108906,12.912996530833059,9.45470721769113,6.633772629279141,7.773792042747279,13.173825889071333,5.1092314680360325,13.344497801339939,7.348768362930785,15.487292674744026,6.093068198254213,8.388187104859561,8.393164580100596,11.197666558349182,10.417166175763779,11.925567682955789,8.338971121428234,4.553066631137299,7.758218041722552,13.135472317001298,10.607663304695853,5.68804863424277,10.203785970239924,10.644164065842405,3.013390434262016,9.355285232685919,14.55023569653835,15.732683635656187,9.60004973194939,2.0209295317356437,1.0882141645453949,8.766313536268475,5.4244028022844795,10.65113421017181,5.009465912352753,3.812748400151172,7.755188406723198,13.989376608805852,9.357512400550132,10.744758300679571,10.092403958924582,8.446952235350487,15.484922435697685,14.30992936535961,14.893158529200546,4.203047004844247,12.992658732796146,14.148589128519632,13.053488215939677,4.704718681996036,12.160398429782116,9.884899518970457,11.063662306852683,13.85340024834999,10.70569404135224,12.145421200293189,13.561947197101166,7.329360098302772,9.141109295822698,14.249954356272879,9.2472660866678,3.8219958898856867,10.16522180652266,6.755175067277411,12.870996465782117,8.483967020715315,14.643620442188356,11.9200658523781,9.293331113801257,12.372595418670542,7.100399647417294,13.316010609484296,10.255796713740743,10.091495156978294,15.629039025106167,5.00478939560276,7.475961986587112,14.712122394917193,15.769176787862301,8.757316597090146,2.6110527242114694,5.653746871449867,15.684080201517352,11.414984004726154,15.430592391929547,15.469689503736378,6.300609942984629,14.504214041994873,8.538085143027345,14.522685417124944,12.955926995801242,2.0987606332419473,3.6567128373869453,7.342519928958388,3.0756768635722955,15.29771421722988,10.58016934685922,7.072240265206461,1.0178655753164003,4.246226810113146,3.4239269072451677,1.3490777299355996,6.657808365345318,15.357044905188499,6.676117852781118,2.7581418793730696,9.001000527002542,4.50580926620796,4.483197174097265,8.812078381413286,6.718352749700926,14.998801823055295,9.61470082877607,9.655842361350055,2.1786526436367373,14.119619358991008,5.616002598492206,10.981618655503775,13.681577538941566,3.3924525380437647,4.404453025484048,6.002770946358401,1.6918554111132502,7.070910714685892,2.0863695049165942,3.1422987282690786,14.531305998351803,9.899771680506184,3.6296411921814467,2.4782767930094733,12.097108846664012,6.130303855444503,11.529840961796227,5.713367121713896,12.49989597030088,12.191531442071163,6.346024105764369,5.604799722564667,11.664495505280968,11.413861165989358,9.729595415269639,12.483994580131768,3.5253293413883626,4.9554500163795385,6.709268504992714,13.655489378580079,13.008857043669783,3.230571790737046,10.544959744781686,11.07089726444479,6.445086633023834,1.9669211789851384,14.914850167841589,2.795871439544041,1.4179423500802726,13.995458601028387,13.718821003709994,12.93179653596715,9.643958145054482,13.23997670616215,3.7023640215366895,2.879888262508993,10.149397803705432,7.353525449215768,9.507277219406287,4.0101452447693,14.414640620360341,11.040728233251597,14.215711846709452,7.800260255106253,2.0720122290115586,10.56274550912777,5.000756380550335,15.208431667104005,8.57218900447765,12.316659702857981,14.07561931917715,7.557581766284141,10.284162319871237,13.523738319475168,4.575851761647329,12.918549057307782,7.776790417019552,10.216752124275098,8.24591887323818,15.185985927460882,3.6660977780458692,8.897430786923026,5.375102887482721,1.7715488653023062,8.594717159297584,9.590837424173136,13.847126468013686,3.6352210169874413,12.04968751854963,3.109922578826678,15.820481633401894,9.137658510294713,4.097076973631414,1.1994860250419173,11.598344230860231,8.910906065655618,4.226911857950019,10.405373885801335,8.413168175536546,12.55984822542221,4.244369898726884,7.422656040451812,11.977805984078564,13.670195401935713,6.582303594227619,6.531121327508494,8.51496681074837,10.611787113879615,11.210648976296511,13.745616430657657,12.868766208534561,7.620621379212881,3.055703686148105,13.578992795451768,2.6807870094400656,11.315441699921319,5.612711291382015,1.4814568918834072,8.718098716215698,6.0722969277614895,9.200780671409097,8.799941919616042,12.12232237501538,11.286243562375704,1.165374096196076,1.5386668074093925,3.362442140554485,2.418138259871209,8.337609683991763,4.849780572625033,1.6708346864160475,4.656013478424893,14.430883582093156,11.793069678602825,13.256648555215108,7.537424515875322],"x":[2.8969615208475337,2.844044008096549,14.981783567307927,0.6380604150598744,3.911680016561815,13.499122985309446,11.60581588971007,12.99256647457695,3.927309761027118,1.872835430053229,10.129675061183644,6.008601266471756,7.302637352652459,5.473044731525922,10.172712006428437,14.98828507273998,4.735778758219902,3.408811079134408,3.9208053317449143,5.7149473755407545,15.63858304833321,14.482786709407263,12.127497075166225,13.789146979903919,5.929460434840138,5.1396632962368525,3.0972946045984187,0.5501598131152549,15.732728516753378,9.349272226289976,11.239979304829625,5.8088203775759855,3.222977566574261,0.8422935604430478,15.040036958607155,2.8454158897186805,7.221482088933527,9.324724649205283,4.150419950669326,10.452102158662777,6.540402074925792,2.056556080074947,9.424164330800977,14.775665500482678,15.991269101041894,1.4824455434083563,5.677678208203114,13.086218675986846,8.99211605657861,5.247727107335839,11.918654727115591,11.955859663811967,9.632185664702606,7.53486206774631,1.785213407187592,12.472346726365553,8.998066556643247,15.495450388681325,0.6518454162486925,4.6133581930963405,11.112416013051917,15.137006874144465,0.8023586598440701,13.035796434710775,2.657720461195357,14.879911888124134,7.711011273430431,7.442420417684338,2.549861534909812,13.307019289427727,1.5793306015857895,2.856913183546078,4.433418805856927,12.241334232688688,15.28267582068587,3.1602606187920963,7.432274307902226,12.284362275650821,8.33177556667766,4.687932849913565,9.248501967174153,5.671233292278044,13.526646993810807,9.691352750386148,8.091019049967842,4.542696936468036,4.316566812016746,9.156516757049143,10.575268058162862,9.657131821783103,14.695387366456421,5.847321143912378,2.3342069179429408,4.825399413514041,0.8189101309030499,10.383335843549453,14.371010196884205,6.3886360179066575,12.564219084097392,10.205716244735713,8.749605075425425,1.0984521693089693,8.571762989091225,2.9262504875673785,6.740413124501645,2.0168936335141714,4.524839165733847,2.0634255549058755,11.928949299638276,6.486834414069757,1.9565395969015085,7.669486252562733,4.34124394531861,6.673256522112639,2.941453599929955,1.1391606246122155,14.000618176414045,6.253908092190754,7.500999244627412,8.856689699896734,1.7496867797730544,6.186439854176896,5.190497191762759,12.010379856731468,7.09845294600641,7.090269536879295,2.815689990329265,9.553964176855851,6.043553496850785,14.884210796489112,13.482973860250402,2.6940158488523545,15.111742851153963,15.125763418282867,6.281672569687235,9.463537917393912,10.603076850595397,6.249808431627286,4.642620973405678,2.461955847798524,10.324740370697075,5.240686990556464,15.835582114547284,3.765749890149457,11.483013795367702,8.415251711958254,14.487410613230415,4.314517954907934,12.265259304075057,13.775134115197732,13.034652864357353,2.3090013630301285,11.087324089787758,13.337806822125055,14.785093007071637,5.86847331115599,6.8557860001564705,1.5903999236223065,1.7521724694345502,12.450648071937273,2.151702427429799,8.71046759321812,1.9540790223900208,8.189599247695266,11.183601056436254,10.822367972798736,6.81870768447579,8.223793534984605,14.98322449207981,5.581714108289902,3.346085964495545,0.9998513139544293,13.038055750010642,4.913359364783916,3.2089697910605275,7.226623793243965,1.025258094918507,7.961397321053507,7.524833637461698,12.791844759298707,8.690120608545698,13.99796439632022,11.999018722617576,0.6881473899307448,12.405097106012283,9.882591924846572,13.494298399641123,11.331252659361846,10.756947979977703,14.275304578509253,1.1892261556381056,1.3549870455092419,2.309476540718444,5.145150714562921,10.362909637830027,12.235351606419977,1.819953051017629,6.696650233604422,13.661842305665461,4.426621888934389,9.802846147160498,14.357870103766375,9.819077709099838,9.333859974285737,13.671462593935862,5.567606253894428,2.8632815947825203,3.640126639143258,10.277395025753904,14.086013808119,9.442817757218238,13.474384429646737,7.221448213154149,10.278682889662596,8.826271171094147,10.630660737829237,4.668913769081974,9.633586641617567,12.72006969371074,8.819254827547873,3.8586049974536905,1.4461952427155258,1.9351674739519633,5.22647636487315,14.589945991283841,4.9922898884097275,2.798385602676145,11.569713904289577,2.131101752574312,4.459851296178681,5.0932253436350186,6.206469828391346,6.8419920505428955,15.180559243848961,9.248115366466093,1.935861897027072,10.99023687957324,2.2668439151465987,10.009066860793812,4.391448154917944,1.3188358008370054,11.656676148924292,3.0043139565602015,5.139359419031133,4.779876798694329,7.994592401790909,15.744616569579028,5.937344158903489,14.334895359385461,5.7337721811643405,8.158668040572127,0.973548393273879,1.805109656336876,11.897106190617489,11.730886591358704,2.606963264170925,13.570381630226551,1.6908888652933487,3.6292234950457245,0.7807751753917537,13.359366510819106,6.833393096981121,14.484817367576593,3.1226306738560674,13.503564794681717,6.04979729501542,11.06806741656791,11.55171680240426,7.133128400252173,6.17304688775986,2.8992961341688446,9.006753328048587,6.948865990100618,8.880928367736738,12.633943007437574,14.581193505603343,0.8641759758625159,11.571140034694674,8.154846449612505,5.209660210960171,4.071702962542807,4.528248994641195,13.65544740598045,13.338986913462993,11.945587579502515,10.25494731163681,14.29106492426602,6.004706971198647,8.617502114159066,3.8184912778869027,10.585106029972469,5.394344822616881,8.394355353335717,9.112215907588622,13.704147074420584,12.88609560571395,5.279354426814304,7.792794896815039,10.341768389035355,4.824654067263275,1.4586317046839654,5.5714488645699785,8.618969139348364,5.087739651027443,0.44439377627235344,7.095298641065102,4.226141730684371,2.1306784847367557,14.210382541053816,0.6163307884871995,12.219330793297157,6.084472642643633,4.950078099346512,4.9731249904595,2.5929551252263194,7.73583209014418,6.931679040985058,4.028567562548152,1.7637379820572212,0.5509547311612454,5.165583566886075,2.386268854434437,9.215913372934507,7.564421612638138,8.105566039096443,11.225683955395972,8.629489690339904,15.926721264335864,9.639801740048465,6.984290320481145,3.042591454401691,4.621886476954773,9.12850699303501,14.176730894240952,8.518665291649617,8.390118750830641,6.538768704049333,2.1876634954667113,4.357890391297593,8.31855070853447,8.772975936759165,13.891058245513868,13.325085386168663,1.281147768173269,6.036255438087878,6.441692783250756,12.872298293479904,0.45188753218218747,11.324342308357291,9.158205093911512,8.81232478581697,2.1530319788117214,13.29115001869693,11.433898311050028,11.199537065319278,12.304437981431963,6.007785502102854,10.862333997433927,1.6201683161262883,10.887326304815366,5.880684337424255,8.718785351792196,14.722311947615026,6.2262655253762,3.008278678050648,9.837165450301299,11.640044491420293,1.5238733351552458,2.9466210702789373,11.701423312433471,1.602085028979161,11.622814974650908,3.0570391044714915,12.224499610388863,6.443638949284946,12.9010535725961,6.075054447262133,9.044166369985453,5.981969393787138,14.004649537328037,2.4860678795032194,1.0643701776742622,7.833903831806436,15.30255541283877,4.439083854598474,4.482984732005236,9.220466393624505,1.4744591173861201,12.53377455520272,0.7429430630972934,10.33508141178774,8.114963522815051,3.065870989695285,11.791342561596442,14.08045100677299,3.7047584653144403,10.451610344258151,1.8419855285341964,15.331983292864923,15.334796129993313,12.110762866381048,0.679564952509523,11.472099928293995,2.9415113875309586,2.7025126884332638,4.4052128401050235,11.189521165607326,14.529530971467196,13.63814811662342,14.85525419144901,4.453008640590165,6.617597818507389,14.655792878027224,5.924970172914229,14.472905122024624,3.1966933225348924,6.857916000871591,6.927096554997951,5.319248018674665,5.971196540836292,12.506616100746166,4.321456361325707,8.562826508192407,5.300151902203921,4.82614907092891,11.432356894720405,15.506823298131227,2.352583862946416,10.80982888001033,2.5437068029638588,9.808122222525817,4.02482991286171,13.750821498300395,11.692772392749394,15.322718209393342,14.756350735829185,12.58731227329838,6.69710382277684,3.171285170945584,1.180859999706657,4.712032785929223,13.02451260425786,4.191903673473894,4.055258819749486,8.257979583099702,2.4383969933342677,2.3182621575443516,4.868783403687302,15.899898733788989,13.994670388536159,1.253740698471041,6.204907245490629,14.956172146300682,10.61773286049725,6.561528764317365,1.4218731797091941,5.58949102185292,7.167349193107647,11.306887429156081,15.270816885844615,11.066318199659289,6.997723573141479,4.843053090793196,4.20469907318345,2.6202400384850755,4.497628620734886,7.557816050457548,9.130769057634241,8.557710970184116,10.471076938291427,1.8712743821402122,11.77742781325942,4.454881617677912,7.494329347218007,11.477256732463768,12.706703836930604,1.1970119502959402,4.648984737715032,5.1111712598948245,12.34806783909722,2.79390460568649,13.320954611896529,10.142141521225152,5.609729520028358,9.900354739536489,5.229701189296494,3.041378235827272,0.5802597563229172,8.49112432568059,4.628396566262192,12.819501175916734,14.228899968982825,1.4414461228445288,0.6285498557749868,2.691643006544304,4.929814575237105,2.3182070715419596,4.818703567344279,3.4459105336647324,14.421224039282146,8.068441553784055,13.109505412228348,12.015856423680576,14.742799127817252,12.317554715278325,13.306362831494967,1.3711595772273106,13.552269050574228,11.03688504780914,5.168249161310076,5.953771570339911,7.036635072923169,10.529756527001167,2.7706406349560004,5.5576243325646395,14.327493572549994,9.76288883788519,7.220147452348521,5.508549608827197,3.485067910691114,1.031828734382824,3.4878167369747506,15.181848272766615,12.52509949270692,12.868606313534835,13.301138431279417,0.7382694171815744,7.953100547378829,4.580827946511121,1.0548977770215147,0.7619979221221592,12.340846780089779,1.9921030074005248,11.3431912393425,4.372850169282251,10.47284369555819,12.124601083198563,5.960823400958571,6.810719183836827,6.170081970864395,5.308353312939814,5.987500439180728,13.975408887066887,6.227409747283177,1.2163763804058605,12.752037193961916,11.426275761493345,5.193488857531893,11.79983289089252,9.239134227844454,11.725840078655791,2.023672087787853,13.602589492989225,8.354455010828982,11.111198853385647,3.1433561117130417,15.361746592761222,3.0374071202324777,13.980880185872293,8.317767483237775,4.8804367954916135,10.757804817855087,5.872329938731776,5.174731065212926,12.763605628036837,9.344568993251327,11.458954349077528,14.48376378093362,10.833022867827358,9.872300360845333,15.18733501264119,3.0242926297014523,14.047826179383215,6.689900469140116,1.8167357299507678,12.650201045539967,6.434253421733061,7.358616754842106,5.9679032077203855,3.8631880338313658,7.274084001320728,3.911156900024174,4.851679640732275,4.901473218051267,3.826225102483362,11.767206900893838,12.34118012831174,8.321814759261269,7.3247063170542175,15.379355075058955,15.195336463727015,14.633653591773694,1.526967161264408,12.645023746172502,4.048403798595857,13.799075912521237,7.792805892372558,10.271630743566169,13.33465457656784,3.8499245089603282,14.327030533401171,1.2258957263921502,1.392108270777496,5.253170739645017,13.912938149870245,15.430770708877377,2.9360758853723863,13.003476067226034,2.081525866325808,15.736291811645536,14.27393002816783,2.7329517851141305,14.113980145424847,6.986272576000284,8.874707382164084,1.6580453962767607,6.559812853610987,3.653668742722734,13.795467072999562,3.730569085877829,6.143166212249993,3.598565378488631,9.038625883374333,13.546546192799317,9.868500588064757,8.531340070299887,1.4843324022897322,14.98251890969767,4.735643165263189,14.194405651053863,13.194014654718364,13.157062931588673,6.278465276100107,2.0154435561253172,6.380645987703337,3.3956740126399754,13.567358379507242,2.3577575044984083,7.153322333264547,10.854665315048372,4.783367239089961,15.636787202315043,13.690811830028158,6.341229808019746,10.048121807120372,1.3172776009654201,3.5635703848201135,9.003791238402055,14.201592777386523,2.026499884673239,2.0412951027710817,14.571302280378053,13.17980266597132,14.554263105997322,7.9365510780232755,3.067552006951655,4.724611558741902,14.83266779475725,10.60534072884539,1.6436274440408618,8.295209071779924,11.637551030512958,15.204852503187896,6.9754150438246905,10.883399481530253,2.5933496138712164,1.0250897226004823,6.451054947275161,11.01841437051337,12.925304328583973,6.908939320388862,10.620171292173367,5.7393170051039455,13.936616675980494,2.155808587119307,4.276724532983749,3.961557534125926,3.169707787926708,8.950573339159604,11.526547666871982,13.608883722782027,4.7540578552230635,13.952670435234896,6.618275623373224,3.229135206787602,4.984751813678491,7.700311464945605,2.3132207420170237,13.74550138336719,9.506855641667656,7.254809824048601,4.6959009460284875,3.789462484127413,8.116424931774663,4.7666552312872,5.204311878753935,11.504783238262721,2.325199553937123,9.61392166964698,14.740222909227445,10.795988281003202,7.097274410112064,8.566557361279111,6.253430837335335,5.06400103236774,5.552144016916955,3.610473154351506,10.48113314895933,1.1791760885038902,0.316582074264098,4.253676271065434,11.110631855250423,4.320206570117619,12.120854997534936,12.598196800012543,12.975229728092232,11.81403939905493,1.5360245692744277,8.785400247340132,13.440712548790717,10.795359171067066,3.122473613165063,8.277062200036367,10.785516102629533,0.8265972251851145,10.273768067935597,6.410952947225467,14.59993059188405,9.824810425422077,13.59181411272181,12.416606948392511,8.095300636709974,8.853955057320468,4.446910605852656,12.573947430469998,6.87543030740584,8.434147810095425,8.104902918185392,1.4687121429814536,3.9700473826606064,7.522521960553806,14.582903236423382,10.189672106650274,6.6367711332844515,14.079887768714611,2.8092029337661897,14.72777439958532,0.5562020546251308,12.057602729800319,7.82412211097357,10.99520551860862,3.673293004367981,12.046344035928119,12.059303252918887,8.734105797514355,7.863098208976647,7.347107097280336,9.442383928342595,14.52424231952055,5.542265886958013,5.643191980023671,8.106921134801432,8.915566545601667,8.930405900638094,3.8946705237719823,4.814635555984352,5.534026750363029,8.475870658811694,3.928843408217472,12.923988115544981,9.112341389832075,7.177126624055109,5.139333476372364,0.7843974292538346,3.3352668719412875,8.165706215532742,5.7358114937947455,13.182408535376497,4.850535966476952,0.840776159560194,11.92881911762646,11.704880144274844,11.725376600304092,12.800130618819498,1.6786016501685765,8.537633783289373,4.361667182699565,4.679954673552156,9.950705801810791,13.734211151444319,0.5998467829562725,14.461276277063908,3.622025199469034,1.8119235252813026,13.294344264716113,2.59052282860581,9.793744293154198,1.9076660011320845,5.7891547418822125,13.792953191178142,2.8025305414534825,4.784993839107701,5.250458355534473,8.064536000960624,14.749427049791104,13.251101304067614,1.8155692134389922,12.56984348903461,7.472318937502511,2.9044846619734224,10.685112764835123,10.227635982174016,12.123456640151224,2.4032437064736847,5.656656227844445,1.2964472743228537,6.108040899734063,12.582891353288803,11.253764532098211,6.5433670416894945,5.884983373064901,12.580872710908398,1.1855074817200417,13.94881500604932,5.662438736495026,0.9648214549990984,11.70134439838236,13.53063690800315,7.626442169410646,14.827314545721542,10.417992075737391,3.8510755860651695,6.976090069549556,10.892465711483165,13.397967785647808,3.4573531626166054,1.3324787445734227,14.665285615947166,8.718313312331402,12.337695408464848,6.628851241867607,7.601351186233511,3.6962177878562477,5.472096994999589,14.570607718613594,12.030226176289181,13.439742254033021,8.693789000688925,10.817562462365357,15.124730283455728,10.48226437723979,11.389053662604203,5.047994146144886,0.6937985243261041,14.077401519365953,9.648922897182477,5.743675285068152,14.628968624753291,6.213198038837135,12.675026030347746,4.729653345475803,6.008625937433275,7.872940718235303,2.051150478761868,14.886880672212886,5.843619228498746,2.2291081095561043,13.271410647109747,1.5641268242484576,14.689265946300281,9.038521579119099,11.6763991637036,11.543924885194297,10.730605126830229,13.60580929125068,15.152157068865813,13.479686636353511,12.729644582870275,8.131473861964267,9.649666612228826,14.91457443124865,6.4725248778611055,11.086983856907215,12.215488091344612,10.38383660104022,9.85768390726858,13.643358205037634,7.000304520236039,6.3270717521816,3.268494290548913,15.496230699329292,12.684329152505802,12.714326258279769,12.753357559720014,0.5610788077723837,2.61525380218966,14.581097903516495,1.4106990362128315,0.6906999475705974,6.236977085439327,6.078786697076153,1.9196482365775773,9.349604450651999,8.566717764957573,2.0241614084356843,8.25315680258966,3.74202354385007,14.978547542653816,12.573629950968316,9.280485905756647,1.6273221301106788,9.545515936025216,2.855932319694928,13.422280244360921,10.297370309822831,1.9106126240513994,0.7897408090853838,1.5063692328484586,7.9073064434266085,8.619982775333508,9.762454347219359,7.445652379320045,7.798311131082705,5.679534658591655,14.38881121326855,13.865292531973523,10.364555093480442,7.930598524043269,8.394453583171138,3.3460234531385065,3.141199960593809,9.069522912256051,11.307511332350524,3.8347094165626663,1.31723428806796,4.607732165572425,3.428650360146031,14.004895184279773,8.396332995472918,12.683923919494568,11.295609829742009,1.529597016702068,8.74982749313064,3.658050951915371,10.027748835637675,11.0667690922894,10.742512384848567,10.176198138462492,0.9674108256987427,3.6739989237535338,13.97940051823237,9.91644917452149,13.534411136235333,9.345359890555843,4.415690792505627,7.712226324510176,15.456669167841424,8.378928941188846,7.256080110433517,8.85540391254514,10.30042631397954,10.33584629308378,6.982181307923856,12.54928604439077,5.361189469499421,15.608159171913387,8.015288837739895,14.173834988595258,2.351011844251881,9.927998890093344,3.8555636252089953,4.71376215826595,10.554703432172808,5.332015101945885,7.370366876749477,6.525286055156161,1.7264626422686222,6.263036399201281,1.705593508402895,9.22836358324645,1.2564105342081073,14.225759730537339,12.776801846015344,3.144503896370064,13.968119888008912,11.014313043793615,2.714814271350255,0.9538976383140295,5.877424026422431,14.10861052919844,3.813446088325685,4.030590154401562,9.116114077476814,5.298763327885205,14.511631899129291,8.92349511225592,13.536537071352887,10.644956131485566,1.085440167606646,13.738043893185415],"mu":[0.48695810420148233,0.5267686801614488,0.4165092862234403,0.22705880995150918,0.35575891260363535,0.642718078732174,0.9096502974741765,0.6941813031166226,0.37696711939278593,0.48901287581568087,0.17631384469588185,0.9379733874756457,0.20601396294266516,0.41072033825807486,0.2880195008755906,0.3402637849154482,0.06492883541741912,0.1653066295167036,0.5222147217916804,0.16043453127838858,0.678180778583694,0.1910766117667695,0.7089097294669293,0.9695395870088013,0.505921729710187,0.45977884505916156,0.677020839739958,0.2760719298318568,0.6492092743001383,0.6479143233933173,0.03625148736801975,0.2611079942848724,0.7868006019913845,0.07706939373930499,0.7850377586127679,0.7436070464942561,0.25518213709358806,0.7212363014088059,0.8571929480392046,0.16900770660144526,0.919103846304792,0.5220793225553457,0.5832237391407946,0.14878315135831444,0.9073366837886141,0.9076809098400231,0.5185662273416352,0.9479324879224298,0.7124556389023085,0.3535435288270903,0.6980541271034275,0.17991706309613464,0.5313861796033879,0.34420701134320786,0.8816335387726022,0.7577766992872272,0.6529740971451732,0.5843958194626149,0.05328266899662326,0.0028454863626659055,0.08646595267899437,0.712382060626656,0.08569749641831992,0.598848964256472,0.42790822614990587,0.7320530274569739,0.5083743581907549,0.6452178873594392,0.28760909791715417,0.586290784488694,0.4740479266853832,0.7540718897641832,0.5455771449955387,0.6348979927408327,0.7297787292254636,0.7788193122307705,0.2722311186148314,0.5949844808055442,0.6611689305143391,0.34015974085395984,0.28355856280776104,0.8236875349915849,0.47061134316281894,0.08387362914091812,0.16334266973855915,0.8920768338937317,0.3539803204091594,0.9309542532052861,0.35714981816547886,0.40855087245007016,0.23125211021403147,0.22700888971561706,0.24991049053466297,0.540836978433,0.6590472128591462,0.3355868689733328,0.4567180847397916,0.0675274749089243,0.5877727620599356,0.30863889453451954,0.46938136182128787,0.9163217031996922,0.29126511915328335,0.8684875926932676,0.13978851140065363,0.7519159101002788,0.31022948482677104,0.5673510601574696,0.17089155037166903,0.09053324860858236,0.2921172319185026,0.5770045342814061,0.5874341564203687,0.4611582191837218,0.04026020354330817,0.47384033470327935,0.34662694282800177,0.4603772708319025,0.7979590941822086,0.49515510766570126,0.7075571388036519,0.7948601738197443,0.3736105229745217,0.3734663905436002,0.4458355462364907,0.5366839030606272,0.4586599531369735,0.8840374518193026,0.4594958211858051,0.8184268107914208,0.7105179378127919,0.26004209175001325,0.07514649121923811,0.9418456702243008,0.051079519961822806,0.20624749712730428,0.042251898333338866,0.21007379215341326,0.4631163657870674,0.5445290260488205,0.6488283922007037,0.5181672347103345,0.9529702871176409,0.4726208604861184,0.38557153576584025,0.9860457223038219,0.9722165011883828,0.36627606449804984,0.30293453269242,0.8279085650429143,0.5618764601762809,0.850684005847848,0.36307460052500407,0.33018230806596427,0.32103660787894794,0.6532217658274739,0.10231349994316541,0.5128215851311035,0.3398966286245346,0.5578740828576154,0.6803926969135452,0.43952683596103803,0.01440313927717285,0.19222938323002214,0.1182731589157151,0.6255876714697617,0.658269257776912,0.6646572834252893,0.9601946343010295,0.8442754115296915,0.8356262868579001,0.18139605087658195,0.7436820196562397,0.6499628419284253,0.0033001793691409542,0.86346130303922,0.10172629060234373,0.6791044737880425,0.6680830653952672,0.7707898477620416,0.5863634732978422,0.566090162583311,0.07079030144987852,0.028901588650150245,0.1444174635937696,0.8963094013610622,0.5417007438101571,0.5040148847172945,0.7054426740079456,0.9996114274319201,0.08340103351533901,0.22478479087964764,0.3349508961065297,0.7208619820114999,0.13748876333413595,0.0662065603034292,0.05366080249522032,0.9190203387536959,0.9688650066299611,0.6224555936856595,0.04819179907265725,0.8816507603008468,0.585166279321963,0.6064677186325154,0.856799316743337,0.7224547151127683,0.8465302665831294,0.07024089770914577,0.9370725671667279,0.8961605329911793,0.30011452193228516,0.8272326919576749,0.8462707010826853,0.6092420033017871,0.7309626816963519,0.506346067333052,0.2908549091684094,0.8616225699331321,0.009605055809736918,0.38788053547520973,0.580450108077579,0.732346878939081,0.5292687369934292,0.5955052036936377,0.07898924480287262,0.1473755343344938,0.9552062701613391,0.5677274159795296,0.1302081686925085,0.6565927593506433,0.5916110093984426,0.5436981926578168,0.13537822141390743,0.8292931852658778,0.28486707875447626,0.4575959387388113,0.8381084177912705,0.2607007658293623,0.05100034677577736,0.33398777580072503,0.08594429510114288,0.6903474358642419,0.6549809420732564,0.3625622873318177,0.0036559103901379064,0.18175734926784282,0.8889073713320899,0.28882769249065476,0.787399934438908,0.6832258260299526,0.30758193192867034,0.23547769920179307,0.5577710741053408,0.7995611364145694,0.13957776808546085,0.5215103484554318,0.16449478216952262,0.3780651074651422,0.7567189147382571,0.037547639441173564,0.5195380561389233,0.20277565493823402,0.3557578913704853,0.6441595909969948,0.49129602059308075,0.14868754750537727,0.8047936948163967,0.4234113618691562,0.6801863201891434,0.13486455751636406,0.2609575252394487,0.5576559574390036,0.015528446019844822,0.5024476306479835,0.7417774997176545,0.39785747352475553,0.6894384631483945,0.09423205256113087,0.5212743736380359,0.06216330093711786,0.8400938781043503,0.2598125246509573,0.7835311504172962,0.8339881725795508,0.1222656540894036,0.12773668645334535,0.6102682733610048,0.10424337177073317,0.47434031714080005,0.46404265890556085,0.9182306096570689,0.9721715205581412,0.9041885893410682,0.6286273542284915,0.74379365542491,0.1784533214951347,0.6871787573169634,0.5972699865124702,0.7490797939190608,0.262420571679838,0.29874806875601023,0.758801276068132,0.953812483405849,0.44644059350458765,0.07430066757071785,0.6520522682456165,0.48794953271740726,0.8163283041698621,0.7222936522025423,0.027562331945623297,0.12583333328042978,0.19766312162894262,0.8256539362436943,0.451970513898724,0.07548213402882009,0.16331603612838408,0.8965186019328024,0.05943854875528287,0.2729973883413477,0.43044209612457407,0.7346758519192484,0.9984419609558792,0.9301118613561614,0.4561564053915834,0.36014578180744294,0.48395795912135875,0.32313691146790724,0.8438812299878442,0.6920824280289855,0.9773850493965084,0.9317584176754528,0.27802540913991436,0.18096758825669212,0.4286482236627642,0.08224330514567524,0.5965333312503442,0.43774739084727154,0.3223774660096064,0.6109855723106661,0.30469170361005116,0.35911098069560765,0.5146935097079197,0.29765883017676953,0.46197690542294323,0.16780761410430722,0.20943281846262884,0.5545471734787648,0.25708990715645985,0.761054457612262,0.005834159584623633,0.41040153297102844,0.2726954620914881,0.5450219319816789,0.21954453407048424,0.7525032959512137,0.0642659689425058,0.9655067499837506,0.8336011052703041,0.670317409143484,0.46351972622343496,0.5806230365028291,0.9306837999701456,0.787213779277008,0.7222383555332741,0.3023937867580111,0.922309440948337,0.2640688628777521,0.5946375555998173,0.2795432968147049,0.6849331132759764,0.2001269852210319,0.21451990339273053,0.8178083533228553,0.6989370766634873,0.4807493445598905,0.7600536600734498,0.5995150544194745,0.1601267102522299,0.14295894065655967,0.347825393163121,0.381888663847062,0.38610161253569775,0.13763276235271715,0.4857240044971034,0.29001187222980085,0.3515858913884575,0.615899057497959,0.5345755141027977,0.006288862236551118,0.479553747365026,0.20584441641030216,0.7994529424747985,0.8358518366174428,0.12608966432672153,0.23578388959275998,0.4232437037845558,0.47463589866642675,0.5671756041086857,0.6374268047912304,0.8140922892763978,0.9458418820848624,0.2124040695324696,0.3931856129541389,0.9810263240389907,0.38615147155131924,0.4134139465431883,0.7532038416920614,0.38860106137442085,0.036849068846160904,0.08829317672947679,0.6327583765732756,0.5849653679595068,0.7851523144857537,0.244477736063911,0.26519442063364385,0.6520148017339098,0.013102146792282277,0.4963185164120285,0.4220078755811374,0.46128577997927067,0.2711514635518173,0.5691709448837659,0.4124524624763055,0.904180973689644,0.10309435937528932,0.8061585342087403,0.5466048535487482,0.9562875576673431,0.7781218382054922,0.9847480467185179,0.07904175370749966,0.03953273657692491,0.26207293746907934,0.7006414694771179,0.406002799321068,0.8086049158533064,0.5656632814689906,0.5885036207153844,0.9848970283988572,0.2828401263167777,0.21188535090057603,0.6306681794430484,0.6349067352315163,0.5023415963155751,0.09399459297681556,0.9032733152100341,0.9730038160831254,0.29354828154493373,0.9583461736454839,0.7700834935028629,0.9603206337502381,0.4101783521111373,0.8772168288391091,0.2386876909170106,0.8043519116000486,0.9195110584533537,0.6178588964914282,0.18025808161762624,0.14634440345744637,0.17106267310353096,0.6223558883078586,0.5646421488111191,0.5700153220903019,0.6488479705727959,0.6617994628594748,0.1728799724744403,0.19118245801087097,0.7835160209754939,0.909277229270091,0.043416499062588265,0.6355132909824635,0.1037494048087999,0.6072924334772709,0.2652802582409699,0.04693310353595015,0.39566661476096443,0.39217654957326586,0.2525155012636542,0.39003246071876174,0.025148743986319166,0.41924510967801654,0.4355776894311616,0.12683150315367797,0.9187137058966299,0.5567339245519192,0.4872201774216183,0.28101307121181285,0.30841496267458024,0.9675292463463359,0.629362168331385,0.48656359257143467,0.8449889648081488,0.09920481953279014,0.2882644193429895,0.644327712058056,0.4713291766561565,0.6177482308472098,0.4951043367767285,0.9197388080237361,0.5616113540131087,0.54830254115245,0.9395609650766297,0.6636469337750734,0.3791890110068443,0.948983537446972,0.10844377671123095,0.8543787517746944,0.778446114209542,0.025557045979189175,0.11742980337971454,0.7569486533666987,0.8258001027734982,0.01808038553717939,0.4721230333614639,0.16305543812762124,0.052081411688751356,0.8012713749480771,0.8417396082215525,0.44961942515206443,0.8128191294608242,0.08660881894513017,0.5950128756157442,0.38816944698253386,0.31380630152934597,0.8327020352512036,0.29831090594521936,0.15087977382209727,0.8167806497045889,0.42919125794921276,0.5926369221725865,0.33860417599404924,0.2989166909652474,0.6599367012228281,0.644678488425114,0.3779486252457429,0.7813493106933207,0.11651611435280995,0.5917184355774681,0.7865966806327964,0.8237622967552867,0.9145152979451432,0.07253329096249139,0.5233177282941608,0.43429692209773374,0.8975545398253284,0.3302134610099867,0.44753037169289267,0.55317536691738,0.2252418068358506,0.5481353522017889,0.8110133992010813,0.4158108089587427,0.45266087853384596,0.7324852320853759,0.5685562218600897,0.7348093527846535,0.40279504411885236,0.810898827231936,0.9681612095253265,0.7090199227389966,0.5474270165647597,0.8672832853071013,0.8520686701527471,0.8083657826446697,0.10757866485948941,0.09250764302479464,0.8485220773687225,0.6156337310123015,0.02753154102636568,0.4710525975630939,0.4913343877464966,0.13160718254254422,0.9460647652790615,0.1806610299808593,0.2848066796971769,0.8615271767521664,0.34622369386777807,0.5790868766612631,0.3579566184372862,0.4854016398753431,0.19879288940275885,0.09664057251382929,0.4395195627582671,0.24381363196966666,0.8443232244532115,0.13194636689456218,0.011035076212700723,0.8093632575165108,0.2401001868365935,0.8280632926545899,0.2383361991466484,0.9359745171652123,0.5178848947621644,0.975105676064715,0.914782023142408,0.5376137063473803,0.08099503386197116,0.457083677530574,0.7794816993549252,0.4545591853484996,0.21697968942819612,0.5883221181307432,0.0007397986662653899,0.08398466403262828,0.041478144165122854,0.7484659366594135,0.5911627691188948,0.2946924421847972,0.19759841703897196,0.9330911940259343,0.2947861211976808,0.142342104654257,0.4510776807670429,0.5639327029175609,0.0847937754516861,0.9782956635839359,0.5903126053114607,0.20366004527470838,0.30287305210300586,0.7443203255448942,0.5687651361591999,0.3315920443351843,0.24468423595149602,0.7627455905138256,0.5993474733807957,0.731780958646334,0.08648740604332761,0.8115373370268151,0.3044949908672412,0.9287669761350732,0.9932815883964914,0.5418523987293136,0.9868440621643508,0.8222897571487067,0.2104360733388293,0.9246664583901676,0.9650911774914883,0.2889406100259686,0.11176212994150547,0.7953674550545873,0.6220597964284067,0.7155187444900841,0.7349335110724224,0.5873273737567293,0.07352407223156465,0.36085437841013634,0.18502560669710522,0.5326721287910314,0.9295191889757999,0.3524371165939184,0.7498399297114395,0.023244523410106188,0.09847950866170896,0.6496977352576201,0.8245642238166286,0.8768243880251514,0.5561726437734769,0.12821571580002944,0.9456107551290565,0.6134835589785761,0.6221360793352244,0.06514584382711641,0.589412524882388,0.7959434981261957,0.40527932026717184,0.2465351755745735,0.3020005418525711,0.38735235763753284,0.9065872490190137,0.4811008617022918,0.37337629094814506,0.8644109542358269,0.30680419890146227,0.8348953445450975,0.2864930470603233,0.8472973940695145,0.14789390019569626,0.7196291922395253,0.3950180039895852,0.4987220471711773,0.8982087452876768,0.8833548058780214,0.9455050771104361,0.45827462048355105,0.9396344586880441,0.8931382344059078,0.08054920333898852,0.922293594923753,0.8046116121272113,0.8912423063748083,0.02431331336492981,0.2771129414548146,0.18402080400095322,0.8761605655129459,0.9201838819241435,0.4569281099652762,0.14044362382186049,0.06213141402504818,0.792817782003173,0.010305656585015699,0.689456243321779,0.7199998910057028,0.38701715796547775,0.3355498328449693,0.9793298379504274,0.9025090320818341,0.3421952015237508,0.5052770074151016,0.5918069823094183,0.20191792753665916,0.745817283812729,0.14007084024656935,0.6334445095765233,0.8546220764216441,0.6826735812047573,0.7920238871142529,0.33605093981044276,0.9221188954717072,0.11289101822861758,0.0030137902292548535,0.8137603778797917,0.7472008415626883,0.5323308360953274,0.5007931441660836,0.6584799213213595,0.10684675105261743,0.03369786552077714,0.4764888646314476,0.029882160280870762,0.4206537909133783,0.846723738632776,0.4604331392368155,0.8997164522685943,0.5581500853831365,0.34843914378563734,0.2435324821997391,0.5165485907987986,0.4059647965789921,0.3231653551809548,0.7522796065529858,0.9987354029250344,0.7350671446321393,0.6306962782470491,0.9986229942983635,0.8091287470337525,0.7100837657981565,0.9617918923610773,0.35857158245786813,0.9389637630358245,0.8981037663741158,0.5376101717679216,0.7083792412696792,0.28986733800337694,0.9152677987249542,0.679394214110427,0.5923860157520229,0.35908523002237525,0.0052899111486242045,0.07965747615059149,0.8374009675078067,0.5867645566768311,0.12219101040018243,0.6752425276660283,0.0894294568128664,0.17075157086316284,0.7574681278901563,0.5900919615584104,0.1595232497645136,0.2706399969332245,0.13512352414358708,0.9361816551594564,0.8917485771127711,0.7093882219881564,0.1766623521040711,0.817667593003583,0.684524375706959,0.08481357321639593,0.4183165386477259,0.30937090639758025,0.37662784234548763,0.9452954175889074,0.8129231133135673,0.2624381552474606,0.5193459723207425,0.8152775989089613,0.9547492198815786,0.18398750183167034,0.0751290450601021,0.9794394217676488,0.16289723478150364,0.3684401864234277,0.319307549512009,0.7932430728647262,0.9108836965131639,0.11802817626046846,0.37959284342278354,0.5858263192477629,0.17520300829877544,0.2330051689561392,0.9363461217141804,0.03392748096663856,0.9384425966326739,0.38531729115189717,0.5114496496392429,0.033952980198080907,0.361929766288549,0.460964227785986,0.5729895842946053,0.11941291723960656,0.7162200468511586,0.8826183561198848,0.004279551677693227,0.42636094689447623,0.5342631451584048,0.03879208791087074,0.680377175795561,0.7432053761086843,0.6345257768419768,0.6559180308262649,0.9398379106764461,0.20513306971599743,0.05235646697968632,0.6968949760901522,0.09792155686712944,0.015191330720220497,0.45039414473725947,0.727589711371172,0.06762394174641995,0.2146693999428695,0.2327300225937563,0.35856312352899655,0.330020923577357,0.24524250629062982,0.6984965314291409,0.6918159841575193,0.8080236032598156,0.7630993087789635,0.5479524951497452,0.06510647003748904,0.3809740652447089,0.6617854844179849,0.38479659649101894,0.6656343051482274,0.7512525138148276,0.8262882064494157,0.8564279632131058,0.26207176075490746,0.536198792798495,0.5470990856569855,0.8173002376129737,0.8139374187588,0.47148249666963027,0.5631126768528814,0.17962645385086473,0.19264823798743635,0.6982020858450644,0.8595593132806358,0.6375632868321852,0.7732166497191089,0.6110168721359057,0.5531474041308599,0.11208436851475412,0.6903811215156612,0.8028862891323916,0.47768633575645536,0.5556036977826673,0.19189108418571954,0.35899078406057994,0.08970957024432091,0.5355099158345951,0.9032073197507935,0.32992175559841797,0.7096420970131856,0.41407084984129394,0.5888796802747129,0.456747159614981,0.9671989225409492,0.2025064470446234,0.8032575874150603,0.06410119273635217,0.32145902711408203,0.35709123999735826,0.8873988332959915,0.12154222411191262,0.005016883879708445,0.6096739224584309,0.5069986823057717,0.34186928305768705,0.8152833224967473,0.3004183673527858,0.5721113240017692,0.5503348348479058,0.40957037495119875,0.0803203059062394,0.09921208790835134,0.15548024509161618,0.583021149587359,0.6818727810188998,0.5651188368528146,0.4450544522069373,0.18031907182178064,0.385607194386796,0.5072053042421485,0.9706182034741595,0.5971658120159808,0.36361525061124755,0.621646203590424,0.6397633676455301,0.872142233720002,0.6083369981218567,0.8728852663241482,0.43804242296069096,0.23697771104712562,0.01694674115642547,0.5410878829327408,0.9932085724806046,0.2118082078504555,0.6122801394099493,0.8453786696313965,0.3269644202587152,0.21474200609110428,0.2854845542649569,0.5264391479901702,0.8424718477799562,0.7290028915951259,0.6599206969707829,0.1157906972874474,0.8619454131217668,0.11984783790041798,0.44581552071318065,0.9903371678778028,0.9519183578082326,0.7314188673505013,0.030374122063515863,0.1737685893700469,0.7486525426227228,0.8560926455213074,0.04748880290333379,0.7172918289199204,0.8894102531638395,0.380990141764489,0.6104969650878447,0.5997554334758004,0.4197689476093531,0.8471396240881506,0.6566903284097247,0.6162358893060582,0.43461934283563575,0.09578678038199273,0.6206600143781891,0.9201393215281874,0.67630484787723,0.6215032911627736,0.3753143083368957,0.9507711586102197,0.8432641596533017,0.876294079102778,0.7449449631823633,0.9310123661351626,0.4302952300791507,0.476098256316974,0.31266245282392835,0.6860599006459751,0.667517796925589,0.8934250312966874,0.9367103956661733,0.7465925212893623,0.8106466152594842,0.7927441006480935,0.1982259148685026,0.5811307476993575,0.7393308880356626,0.49492761180069733,0.45295871689020406,0.15908900483176902,0.40910936648825147,0.6338814468054785,0.7828123758030228,0.16197306890742724,0.1722492413294805,0.32881334052776445,0.38878252454035445,0.9662722293910018,0.573442303047647,0.640455580001587,0.9733296099800006,0.6952377425826102,0.18726375175575294,0.7284871878192902,0.9930075893695143,0.1758436816685467,0.24201408603005325,0.5726560841689305,0.6754196183446854,0.14602032398421194,0.6636165951223159,0.4071999093829992,0.28431982179704796,0.8231844173730096,0.4093098456519033]}
},{}],126:[function(require,module,exports){
module.exports={"expected":[-0.5580685318562315,-0.6660262072681978,-0.7726554700411251,-2.1056641886745435,-1.1517300874459884,-2.2389042450147407,-1.112747186986297,-0.32013108867233314,-0.5878807388109112,-0.6372314960983847,-0.47022341492103986,-0.9009736129336637,-0.35144845112365364,-0.3207301814585779,-0.5910655811885834,-5.250734743718175,-0.409778453686372,-2.763523167652017,-0.5336101001557836,-0.25432679321218327,-2.274590580154256,-0.6849826586995097,-0.6644570627556621,-0.5012883344288693,-0.5768160978625392,-5.4342729643168415,-0.8408499427651116,-0.27787582620484386,-2.9947840194886055,-0.6460481810126645,-0.8298324923459738,-0.54905330080503,-0.48143988386946324,-0.7612458569179349,-0.6197989828192272,-1.8151667024586788,-0.7241777685049899,-0.6275308984519957,-0.5526053337680287,-0.27394045277935447,-0.39478398151173166,-0.7725077525809002,-0.6269050545138894,-0.8142376217534485,-0.9054749037198332,-0.6182409175255622,-0.9398585005383107,-0.8816475944652534,-0.6507401436138134,-1.8958706274338726,-0.36967145396435436,-1.6271290827309686,-0.6949155226907828,-1.2607655449245263,-0.6772247699433164,-0.7562998785311978,-1.4809392299145168,-0.8458451844044212,-1.0522577684951586,-1.0016395379192848,-0.796316056308462,-3.885777968602153,-0.5880020369791574,-0.45872756140310145,-3.84076750064748,-1.849327671931292,-0.6194129771145778,-3.0295733896944537,-0.3230312779530555,-0.967535033931832,-0.710251914146887,-2.0888430603363233,-1.3853710844768183,-0.8085169442531026,-0.4991306465306655,-3.59400431974977,-0.7748345379621377,-0.36075948413869896,-0.7577329371421593,-1.1437463557040757,-0.569123254149936,-6.128725249179932,-1.1025442150914804,-0.42148130275245566,-0.6202365516013137,-1.4538923272858975,-9.584934648872201,-0.2743920930372305,-0.8627398311548095,-2.462306452489786,-0.9742378232612432,-2.325653454181406,-1.073569294264845,-1.0672876084434497,-0.521907780735167,-0.63121296451665,-0.6158507011504551,-0.8244513252910357,-0.9214024087684194,-0.2819325456057132,-0.9570169180633541,-0.7557243514943448,-0.8287421028271574,-2.427221018664861,-1.0927154773806484,-1.229552053352363,-1.0599422162103729,-0.6211263976606847,-7.697843497161835,-0.6260440410648556,-0.6695130215759584,-0.9492819260183905,-0.8031074023796901,-4.622683419920613,-0.4687675791460496,-0.7718525370343245,-3.6368520630626557,-0.8725452269566389,-0.6586719793883511,-0.34045634988705414,-0.5530652577088123,-0.5155093608703327,-0.6106485318798753,-0.41355927966409745,-0.9008362947377362,-0.3268277178453677,-1.280478332817902,-0.36385830326388463,-0.3780395812280851,-6.635218485807952,-0.6785224030789828,-0.8623810686446876,-0.5020703157215802,-0.5693209094488115,-0.5920548724677533,-0.454215831930364,-0.8201568096554929,-0.7788034303179692,-0.6600775145329534,-0.732184749786275,-1.6304108583769512,-0.7814197362585809,-1.5373514278022127,-0.4937189702106979,-0.8092139891710567,-4.2661546607409635,-0.6676394653184959,-0.647311491734443,-0.8429336193666519,-0.5519965049556528,-0.4186233257044369,-0.8907322994215333,-0.8108383282185787,-2.267075956277047,-1.290470845958147,-0.3501195481621493,-0.36597409249533164,-0.8119960291155813,-3.0839302955999233,-0.8117949682436176,-0.6452235750509188,-0.9340326973501373,-0.9385130699580603,-1.2236426698448963,-0.6999353783984212,-0.2747278459222603,-0.7555249016497397,-0.8139113399940662,-1.1152066385983224,-0.6434804326169135,-0.6553521307913465,-0.4279386554243817,-0.644051247757264,-0.47319061405879087,-0.6585594792825711,-0.34350524993574244,-2.920189451104302,-5.884095167964945,-0.3690715728220845,-0.26601346289698496,-0.4666798129083679,-0.8005523448067077,-5.425151524036833,-0.6312048005281359,-0.6719286336700478,-26.233504829956594,-0.6924544869540658,-0.473658050915442,-0.5569654889381485,-0.8824315408008148,-1.6687305482549648,-2.8379516757863725,-0.6679198445747817,-0.6031892194912687,-0.8630058280803516,-1.9797579833427197,-0.6534494050543754,-1.0595325303097107,-1.0286501352135224,-3.2090420851676247,-1.334577179846069,-1.1895641507767454,-1.0793028542128011,-1.1148575759864374,-0.5145577839208364,-1.3924003974569314,-0.3664874473869537,-1.0433849877194574,-2.035483174920167,-0.6155730424894037,-1.3272542365177484,-1.4284523699600529,-1.7352836903263964,-0.7454282367735552,-2.5251152256057647,-0.49650902446698664,-0.5281386708048161,-0.6379462244219957,-0.6696901270214606,-0.4466074772725065,-0.6689302049761536,-2.332465555954579,-0.608485291976995,-3.584821315857376,-0.6212810295222261,-3.176173571909274,-0.4790167436544055,-0.8155790064560899,-0.4726470111880152,-0.6305149929980502,-0.30252417150465155,-0.6972453565625416,-0.7384050312872855,-0.3812346007871805,-0.3887962144959409,-1.8507355359019284,-0.5842917195690542,-0.35999054247326884,-0.34519932552560595,-0.4182240328382528,-0.3661296210032847,-0.595844572830839,-0.6830748411007304,-1.0457630509040112,-0.5485453858434807,-0.3594263439537603,-1.051192051256196,-0.4477379670871235,-0.6630154586773123,-1.0716859246850243,-0.31402993799861456,-0.5121744561201255,-1.5289757047302321,-0.7551375957471679,-0.7548013811923506,-0.5556033376841594,-0.623367816503267,-0.6675291075123274,-0.46605251454216917,-4.9536556822493765,-0.7242263866674459,-0.5306677844304959,-0.5410049243763924,-1.7061781572579497,-1.802375782207652,-1.384729542561602,-3.948325874618746,-0.3913788858271523,-0.9321345018261395,-0.5567291279948965,-1.1237078435827264,-1.1633843706557137,-0.5841747135409313,-0.9054845101911434,-0.5583184048014727,-4.365803872181578,-0.6084471284955372,-0.4005180219791089,-2.938889741275229,-0.41991322191856173,-0.6452644367659843,-1.75717208071142,-0.7659976664905939,-0.6713469644176188,-1.8315629319238576,-4.252351532770309,-0.7064360690055949,-0.94263339986014,-0.4023244528936534,-0.6708054850411608,-1.3676770807274647,-0.42978141911475315,-0.7076992377726518,-1.558331501297787,-0.712914790827553,-0.30812380830437064,-0.6087660702877602,-0.6547085518276285,-0.4628221494267515,-0.6551577196317349,-0.9935509498518444,-1.1845555964652157,-0.48291451421848697,-1.0233379985180435,-1.0883620638574885,-0.5753090092231805,-0.29326406531949845,-1.0628912911110786,-0.7805096918816762,-0.43408851524111475,-0.8070952848145346,-1.69860387290533,-0.6534949012627472,-0.37451712646759217,-0.5387016493925985,-0.30986297954448627,-0.8428217879285775,-0.34468808122570144,-0.4359188085425155,-0.7689723631382669,-1.073571700393467,-0.3678548313527173,-1.0803299338863348,-0.36700778336356965,-0.8283668611208405,-0.47524067565356193,-0.6223225693552523,-0.6816468497922965,-0.49275105404306635,-0.9017333349193535,-1.293165227564323,-0.6449404257174085,-2.5595435703913694,-0.2899881447189233,-0.4681009804611229,-0.50097001033089,-0.4303495534862929,-0.7681086336638716,-0.8095112624845808,-3.5508939625225078,-0.777750676076826,-0.49026091448528514,-0.8177375254135213,-1.1700606541455667,-1.14453792092719,-12.487079325557973,-0.7918379463620839,-0.6334599986796714,-1.0442261905412904,-0.7509896107357832,-0.45345156969391254,-1.1320375002852792,-0.5686005729614945,-0.46810016945090327,-1.2100068966862054,-0.47432880349649054,-1.324655535639685,-0.80357889475216,-0.7972957426567717,-0.47914392478305823,-10.159370411805003,-0.7798653945455215,-0.48691345380433554,-0.3345886242543626,-0.9870102113749767,-0.5059710852407173,-0.2611881580076654,-0.34342443078581875,-23.238905545924542,-0.44039266421089346,-0.7775265673785539,-0.5289696454387027,-0.5950005311140822,-0.7152600006626534,-0.4842356963440876,-0.29359249878786225,-0.7016875566106686,-0.5370286637693671,-0.6081152994182142,-1.8417391594473005,-0.3783721907810057,-0.4179157476890285,-1.0441904108338325,-0.36050364677163693,-1.580258149876832,-0.8153719917386635,-1.9981473908023,-0.7380893156634231,-1.208211391406545,-1.1265935981159867,-0.510548505753353,-0.5819787618521511,-3.244281840160124,-0.43042163053862204,-1.5836664391819661,-0.6078020411736607,-0.5622545423333454,-0.7676827899907571,-0.41110155541722665,-9.442937815682408,-0.3034277303311543,-1.0834368607760605,-0.6860710373905894,-0.503315178439982,-0.5499653640209534,-0.2652000933014413,-0.6069713880548867,-0.40486743499340144,-0.46248386115336854,-0.40631645610021305,-0.4563386841152691,-0.5552463967755278,-0.3928525197470256,-0.45735880996020595,-0.30645053779095444,-0.8260299799702643,-0.34439684023840744,-0.656042476435807,-5.886246817566095,-0.9223899351058353,-1.1504914809559976,-0.6119454680479567,-1.141401842998576,-0.5001314791623399,-1.9527901114605444,-1.8184879834371106,-1.0459734613227512,-0.9505136787599622,-0.350487799772897,-2.741097732490406,-0.5114274434281754,-0.4349582234245891,-0.5651327934364316,-0.7337750602272347,-2.099824047799108,-0.46051104651587965,-0.81150850075774,-0.6003497699829343,-0.6903419956232654,-0.4459655321763796,-0.3207743158660396,-0.7925265338633563,-5.725635008691071,-0.34131263435631615,-1.3922087122145463,-0.5487847140565871,-0.5600952601287171,-0.5036364260301271,-0.4074534119400573,-0.6280480635338411,-0.4710765832818996,-1.045737736711833,-0.7759497791632399,-0.8562463791296306,-0.8786299970615605,-0.27207806338594376,-0.6745192543637438,-1.689075421616584,-1.8949541163879244,-0.6468522186825324,-1.663607577971421,-0.5395388810959312,-1.3172847646105805,-0.2950304355305099,-0.946319563970192,-0.4652697666089297,-1.0644583046232559,-0.8585520908539745,-0.7708704068898471,-0.7214649660639022,-1.9779382909147358,-1.6400023643452644,-0.6188126884698009,-0.3075818072917372,-2.465126889314886,-0.5285920321214368,-0.48739675400065063,-0.4279485574928325,-0.7799901575755923,-0.7258781789671113,-0.9188629774246889,-2.598244631698959,-0.9759920115351619,-0.7134684243960212,-0.3399846794233118,-0.5600690809119764,-0.6612123868591538,-0.6268439451774811,-0.43885783609480944,-0.38758619576640213,-0.7574788771963082,-0.6710396525028565,-0.41436996288521427,-1.3138422466567636,-0.6265146834223244,-0.6294019240575827,-0.45748664587763177,-0.4037037074600466,-0.7059722772507564,-1.3538853819688759,-0.3947647317920559,-0.5857446569625355,-1.87339279728978,-1.4046868236727794,-0.6485760339299211,-0.6269936675077004,-0.5118293611876559,-6.304970308852829,-0.7706358882357336,-0.2309853565940174,-0.43675777692676754,-0.34833303930821335,-1.0494832709538624,-0.3448752192538808,-5.895320268890744,-0.5944861503907211,-0.5134131477568169,-0.46733278241969345,-1.1865781369523933,-1.4346488108310078,-0.6071265609125654,-1.007410006365847,-0.6175846199550681,-0.4270055784402105,-0.6352319264448109,-1.7992070730971645,-0.36842828461284444,-2.373057203331541,-0.44862583757636754,-3.6895950321461437,-0.5719766281198425,-0.4871640447608546,-0.8222092656465152,-3.448162021303731,-0.6673962569099484,-0.5631552536071048,-1.6978497532798111,-1.7193044626279397,-0.9049566861222254,-0.8419494107316845,-0.5306174823064059,-0.4049389702996867,-0.7893454236163673,-0.31445139587013315,-0.630828998544175,-0.826936696289819,-0.501695924972248,-0.6136671347602468,-0.3077002921047284,-0.6653059885859605,-0.52238484148013,-0.9288387560055549,-1.5908997412493218,-0.4573107114895763,-0.8463886872938902,-0.8144029120542026,-0.2420033989296991,-2.6512265878821744,-0.29331447594041316,-11.242257043233423,-0.6910865711047698,-1.0026928975509344,-0.6255951221993289,-2.5912317359756636,-1.8613780463795064,-1.075259578320336,-0.8941830049452915,-0.42303766020958344,-0.33861437737655786,-0.7111516904859426,-0.5251124905222081,-0.5647523364310253,-1.2015532432215985,-1.1740379285446185,-0.39929145406171296,-0.46015277653290065,-0.3094879457605664,-0.8433762291902406,-0.43571294640124697,-0.36663022610654133,-0.9477282191616382,-0.5444851303846677,-0.7144777376473688,-0.3176515192154049,-0.7943671337030926,-1.1104886365764495,-0.8950948196248301,-2.0148518042595507,-1.9645127911199163,-1.0007664956962423,-2.6940332734402963,-0.4846288896385335,-0.5448611873314478,-1.271094452592569,-0.4815113796170023,-1.067315359886381,-1.2231114250302666,-0.6127903194244443,-0.545314075146262,-1.2084669430222064,-0.8890670059959388,-0.27395828902121994,-0.2951700537178128,-0.45135474698588945,-0.588907796684517,-0.6307413023819246,-0.5815761334501405,-0.38828514353603294,-1.5761753331479087,-4.657480542317065,-0.45107357947154325,-2.5041473542523898,-1.203028738263235,-0.4647645013265744,-0.6513568121538634,-0.27935728980034535,-1.0337156403185896,-0.6240841856218269,-2.185806607382645,-0.5764977083065745,-0.6478878998592991,-0.6996102567612426,-0.42193511066562145,-0.3864586138823204,-0.7472202844289415,-0.6533895690392358,-4.33628096561008,-2.0535578646428836,-0.4570676533234497,-0.7316125882416779,-0.7020384710141617,-2.8273888762695245,-4.810096554700061,-1.2008077653187317,-0.40604569136726637,-1.3969625392725864,-0.5250772218995512,-0.7253759446893258,-1.5252728721198776,-0.5509938928615248,-0.8749572789397155,-0.30808679368109754,-0.4611250355980949,-0.6288221734776064,-0.6722408071412186,-0.5398791308923198,-1.3760144870110163,-1.5283461196292716,-1.1738679790677968,-0.44421039013459956,-0.6091821575093022,-1.0244405851821474,-1.8301009616547257,-0.6404897514638873,-0.8008872289230856,-0.7841104978121065,-1.2974462377167484,-1.0093489565379339,-0.4544016493519265,-0.5737900317836198,-0.4449368679801632,-0.48431879989586457,-0.6116109819838944,-0.9636326060177722,-0.4866877280319615,-0.808285515956782,-0.8026818735944278,-0.3980552462301472,-0.5446393467522288,-1.873212541091631,-0.6231080135409137,-0.6560208061757105,-0.6035684882955265,-0.9695226002658839,-1.7836866428471914,-1.1772253571082614,-0.5715644528810315,-0.670016851915909,-1.254957623341908,-0.9588104917290354,-0.4895585657182396,-0.5770667949843283,-0.48449829476494566,-0.7523466254369479,-0.31571062759169216,-0.39229112238957903,-1.63494298688469,-1.5223031730834637,-0.6605048775932031,-0.9376973484992436,-0.568702357161052,-0.6344365385305819,-0.7259626857193692,-2.522482185535467,-1.9745630736958641,-1.3278547877709574,-1.066786625130652,-0.33737615030463736,-0.666878074024421,-1.2630114298079635,-1.3767869700231445,-0.7736880977010674,-0.8949940754137082,-0.47917974895579185,-0.9339321342971971,-0.3167828065137859,-0.5897147834278036,-2.1846044214434617,-3.7073810238583236,-0.7520250305015785,-0.4779790864618513,-0.8191955796515844,-0.5414417628083941,-0.4547203056091823,-0.3538738750259529,-0.8532284970264331,-0.8088169271648136,-0.5542570068915988,-0.6556001723670069,-0.6142442923603236,-2.3925809399465936,-0.4002215799649257,-3.6971230025231385,-0.7198083872853135,-1.1675995136754054,-0.37693394259075635,-0.4439685619674531,-0.5718530443449901,-0.6711326881780587,-1.7850347148513979,-0.689892771746804,-0.32109054175855023,-0.4048395049321096,-0.6852720046833413,-0.6713606821360077,-1.7644379636146363,-1.5047237277714598,-1.1421535360330362,-1.3187219003189419,-0.7474049451073507,-0.6993577897658357,-2.919001405262523,-0.6436265491426256,-0.4850107228173266,-0.7416068227223174,-2.258183066312498,-0.25702098906535537,-0.9367732671258328,-0.7931502540608119,-0.6851101501213136,-0.6234308442440052,-1.2360162935322196,-1.8961031525640968,-0.9763890198600165,-3.1653636579239484,-3.13236150569291,-0.41499074900735955,-1.5213366599113256,-0.948748242220249,-0.5945920990135587,-0.8389714254097469,-0.6526376809490555,-0.5115111100229413,-2.4838388905498356,-1.4392181007070202,-0.35036101929630364,-1.1740281287768002,-0.6824322674937523,-0.4669224024886275,-0.7763973534328766,-1.0378591432495246,-0.5655606220072675,-0.6431062797564503,-0.9099342669252974,-0.48494203276367703,-1.1320694434357539,-0.6285751716345228,-1.027313813456749,-0.6557357564321044,-0.695078859614183,-1.6889150033887157,-0.3620664860303948,-0.8872053537775327,-0.8821521325788226,-0.8278145490430402,-0.7129015102640035,-0.594497315105258,-0.46441826657337837,-0.7445965812617873,-0.3805760735713919,-1.0922087631913602,-0.8918342538166862,-0.6088744168279565,-0.4675457862535674,-0.3222091672742167,-1.0416433572077168,-0.5851492855787739,-0.585325463026027,-0.578593560466007,-0.41731723501592366,-0.8167948681764309,-0.6876569822085742,-0.5986712945564897,-0.5085458499647526,-2.6609995925267,-0.6343866978598436,-0.9893649764004169,-0.904829273118774,-0.3851043481912246,-0.9365316583257739,-0.6796592598853968,-0.3694617724655341,-1.2477056244639682,-0.7959429344056738,-1.1301924471589353,-2.676776702919792,-0.46837280993817587,-0.6680699806047707,-0.5794440579599026,-1.2928719403982667,-0.5786242715011459,-0.5847404378652348,-0.6597382109195784,-0.8791492944549864,-0.8316403487480852,-0.7812485031070857,-1.3025704302768992,-0.42733412804717896,-1.1627852473872307,-1.1601909282638307,-0.68103896738139,-0.5977997420619323,-0.6188915340288222,-0.31759660716431976,-0.8208515142048057,-1.7216142266155898,-1.1740329067728945,-0.6335728068176394,-0.5688595056715697,-1.9638286049305007,-0.6629018833424747,-18.868360584687338,-0.8321130114293194,-1.6097101755210232,-2.1919174821756267,-0.8288066676085089,-3.15428287412354,-1.5365458307123174,-1.0667721370336505,-1.1501454553471087,-0.6032701657986531,-0.3675922770054695,-1.2647537003005742,-0.5326137283522437,-0.5445013631661025,-0.732647563074996,-0.845249233235077,-3.461069871752242,-1.0330844686046747,-1.3147420124026419,-0.6324891166296202,-1.3055376004278965,-0.768462710664396,-2.0859929096715346,-0.8807709263352945,-0.5950477389881367,-2.642331848532733,-0.29576979394242814,-0.3114856591859295,-0.289418359813691,-0.4307873206984388,-0.6654191411493001,-0.8366367838947582,-0.5990979499973406,-1.1768268775677948,-0.38832282985579636,-1.6456780417574493,-0.5826173758816098,-0.8795097457321475,-0.3298263787324864,-0.5264219557863216,-0.6144135403300978,-0.4604812587900769,-0.8288539364071111,-1.015713147645033,-0.4019954702279007,-0.9205744898119542,-1.1047339515683732,-0.6455881279477256,-0.33574975220544934,-1.1958765468545527,-2.8390993337371198,-0.6211659935310464,-1.0665922369008403,-0.8406029378324467,-0.6670196050216389,-7.639872795784434,-3.752722458150183,-0.43675062588571034,-0.7013890010060597,-0.8821338885592531,-6.095729540847816,-1.8248582622512106,-0.6645229142906947,-0.44754723962762977,-4.4076322984582985,-1.073912843593794,-1.3390660600457978,-1.130710647206503,-0.5990913500943035,-0.45574932841640187,-0.2999593882100112,-1.1018383196804047,-0.2826676336973293,-0.41575029721543333,-0.3969278249358494,-0.46601141130251533,-0.48787560936399715,-9.975221294259303,-0.6346056545094592,-0.6356698445570487,-0.6610439335274481,-0.4073528342457517,-0.721774391891957,-6.283161489445942,-0.3364816057846237,-0.5264390875362273,-0.4574488701245938,-0.5151934375998106,-0.7993378124673783,-0.514216127403258,-0.6476002849791826,-1.484928773791994,-0.5134967939145062,-0.7007059341734568,-0.9040794300413695,-1.2957188089660754,-0.49568658315702924,-1.598684395780376,-0.649125549407274,-0.3488180512547677,-16.890459185700866,-0.5958013078510588,-0.8224265726332542,-4.750974940594759,-1.402288089177963,-0.31342035505055826,-0.3564208838493221,-0.61486464362176,-0.7032425444899466,-0.5606897932809778,-1.0450142916089158,-0.453104129008674,-0.31848156704012315,-0.8469170386659378,-0.28888098062497625,-0.6494032080328721,-0.7376251098135607,-2.3662029793079316,-2.7036666697227703,-0.7211139339863992,-0.5511424576597097,-0.6287963773864853,-0.9310451877138679,-0.5851017596727288,-0.34892192194389976,-0.3779677721105712,-0.7866491893413439,-1.5406658419328247,-0.806450790590311,-0.8223751335586639,-0.2523928936676935,-0.42533058473294066,-0.7100723632142605,-1.2872920950979014,-0.8284503238091467,-0.42528324164580866,-1.5546053296667837,-0.6466494842905389,-0.24146234454481738,-0.7860181035314313,-0.5894595193444211,-1.1584061385848237,-3.4019133228297536,-0.6262533868271528,-0.31376491166596276,-0.5722845967124985,-0.5542847936048547,-1.5112581416874322,-0.7995149295623554,-0.4904980600709466,-0.5923518192424833,-0.4523341702061368,-0.3425170398460939,-1.568557497955237,-0.45301135503608125,-0.7673760615552899,-7.500407853929401,-0.8449574601043357,-0.810161044636885],"c":[4.123701254440232,5.200441626239445,2.1107235299775207,2.547882914051427,4.29438941170721,4.813174318713351,2.3390013564739034,1.8285204644013844,3.096052821136891,1.7829082600578707,2.8152073712332886,2.5108796632619823,1.734160924311248,1.785214874797806,4.259919283463405,2.142349728643819,1.2741788009287605,5.820027761233,3.5502604853231157,1.1363766341189454,2.3824229993697337,5.606792346930115,1.3913992884531292,3.5999008638219645,4.502360307005649,1.8566281709546575,4.494155809862035,1.1640380457943558,5.106959446117191,5.64804161795441,4.325463045045735,3.71881727013898,2.7531450552688765,5.358898019082613,4.792258767701753,3.2967813447206185,4.33300668572062,5.638856798070268,4.6878992229160845,1.160236810874228,1.9052751020238303,5.528899734735724,5.557793119080179,2.807715204229885,5.364571896549462,3.434553789758278,2.823966697927799,5.541956314040343,5.546514349368632,5.93817946103563,1.3249383885530976,5.880511360432205,5.284228194289774,3.3918832817438043,4.905622415107315,5.9672064674296035,4.265849069797513,2.0601173056274504,3.2621649037568456,2.7930114293612154,4.462934185660646,2.798340086478726,4.824487092703479,1.212596084135468,3.4134142881272966,5.664251110248122,4.957786365257129,1.390565956511616,1.5881754369771086,2.352989722858604,2.720145043471497,3.967185557686415,1.323314746110428,5.847418962277993,2.5380076369369977,4.770701397821089,4.374865901522712,1.5066007747729306,3.5469905169546934,2.1874710982585226,2.6715064313992056,4.872724277111295,2.0030119332851237,1.698624306562169,5.6047044690662675,1.2031464368130431,2.5012666483098522,1.1772107110330812,4.666550428178162,1.451699409865356,5.052488297748303,3.418869495836372,4.355414714814106,1.002802843897557,2.3240155365756423,4.111609737755273,3.8416239632171356,2.6868704878444407,5.054650544583138,1.2894475018404297,4.946212096645521,4.679284446564436,5.702452276948145,3.9000508184765152,1.913830203911038,1.4067044573981304,4.705068087753971,4.93957472157394,4.5966697462270165,2.1814133716659247,2.2732958427351804,2.9041593471998164,5.594125697360376,2.408486824964621,2.3290603049655614,2.9822152212052577,5.176705897726125,5.919304994198145,5.312925284589108,1.330024794899877,1.355535552725862,2.6551511669837926,3.8616823726015914,2.6776402736638962,3.454429267233711,1.5998330343095715,3.4379569690474834,1.014467772509722,2.199354243845568,5.923351155128472,2.801815902728131,4.706999953623691,1.678930943550261,1.6868120275074374,4.828233752370944,2.8464324747067575,5.81801562242749,4.7124005112680605,1.0220907324379815,5.073413809545821,2.9210506770153692,5.139761045092553,4.721990340038968,3.675438136085443,4.386090752516928,2.3187353089706866,4.045412193141868,4.840931287310837,5.8312581033784765,1.6356358480770208,2.3855735838955408,5.033568291944881,5.4383004319956125,5.29831758720236,4.364092383965583,1.4828545671808493,1.5083255452208735,5.105786895424625,3.968154109431408,4.381275564606607,4.451997756549718,5.58070637778728,5.280497551575804,3.604159209585003,5.170421457747549,1.1526983010375438,2.305676396658997,5.683496666248499,5.398369772856842,4.73483300924975,3.154744695543883,1.8310368220734832,4.930127249347834,1.0798395701810706,5.158349508761975,1.9512180580071983,2.962084602870755,5.381260505959305,2.179416501649111,1.3179611073989719,2.8605187730951545,3.9222147933034526,1.762226870364584,4.732848486459264,4.138611764813753,5.665469545657044,2.5630333213446845,3.4156161253814847,4.620439279062375,5.395650485501697,4.491868228743465,5.472143204501644,5.088797040776823,1.8303736531465467,4.831367012812555,4.215679194634253,4.9513341589308375,5.920018411300905,2.1661584849710014,5.292820151161061,4.793824863665058,1.2932494341693792,3.0303037937660817,4.244289726148965,3.820481362570985,5.3101901057198795,2.329371379231957,2.602749797997215,3.6189206007655876,5.413066435079175,4.300354415020777,4.670969749509084,5.604847402624742,5.276158444615791,5.943117295992499,3.390202967150862,4.054041727340556,3.7883175565009353,5.690601856872963,2.5985772813056487,5.193253459724399,5.7618436180165915,4.531713727264143,3.0202816816960114,5.310697682812895,2.806934039262318,2.9412471962680833,4.06486750080532,1.6844207779309486,1.304695687740224,1.6341786395491988,4.610452470037333,4.355074022563768,1.9206050008832645,2.4713737042510786,2.4847380891391184,5.164483953643391,1.5564170436182037,1.2779007862537075,2.2636697066174096,1.9325380761827928,3.9142157631076584,3.8288238306874227,5.583038117019243,4.098452666539718,1.600468243192085,3.9085631203651294,3.1303122457072856,2.9119536642737343,5.85431660644564,1.0949074828664387,3.5486513727636737,4.538693265440502,3.762654078392562,1.917980132954871,2.882280549452936,5.7030671226299265,4.3550197565946425,1.1704403065278748,5.445396740339657,3.5795195980736563,3.027813333612407,3.1473441341378585,4.8864801368055515,3.899389144812312,3.5883906764890687,1.6252063624547965,2.3372719888867812,4.283672437659631,2.380155957917194,4.591627608330227,5.657225817317817,2.2122679561108676,3.1870038978268247,4.210279885505269,3.8916541345364486,4.133899547014659,2.2750110269153914,4.122699084126101,2.3933187581892392,5.713625976631736,3.92354903434442,4.628885197724613,3.8447044706440607,5.672358205911027,2.4350346104371914,4.617718164411902,3.765770728618996,1.9934992132086773,5.304271923117503,3.0764174986441963,1.849208925703896,1.931382977669215,1.2065803446802383,1.1303771214809257,1.4651270127106755,1.928487448368045,4.425865906126148,2.329193908419717,4.334528620855998,4.294744006114487,5.12564260867493,2.8716654256726803,5.71330745352936,5.681124976024154,3.4419467141324827,1.1463036037279264,3.713721391091023,4.222963351201203,3.010585727330981,5.205760835742752,4.446119023369105,4.393907497273888,2.2601693281616146,4.1986437874825775,1.7119743818411972,4.34114667533526,2.094021093045243,2.3043673583713797,4.439487796119903,4.152045194672239,2.064624544468672,4.3404991412181975,1.5534059463498642,5.546409887860607,3.1471310729017135,3.9858232068690214,4.1588936338850395,1.8327127275135426,5.751628668161727,3.2221581262861347,3.9160245084541128,4.101399147408551,1.0766541772873108,3.0780690784955738,3.379898918351807,2.7176664051559243,3.1180658206924265,3.9047730170986705,5.324971040616507,4.918248463673074,3.00516123330854,4.4889530717854065,5.816300957106467,1.4380092083683684,5.239330413486836,4.7483134058571395,1.6441241350418636,3.963907355386527,5.723397532996727,2.994310597083887,5.706241169174082,3.5276473318538173,3.4480855569259763,1.2689688747579955,2.6771953711427514,3.741389947657656,4.239404754111925,2.801567955133371,3.185483384751726,4.069499904169142,4.399020069862841,3.823993667152882,1.7298202072020499,5.411172503839108,3.403974559529253,1.023763413589567,1.501340056071533,4.79387816901041,1.550233515924441,4.80860466974325,3.17968268234055,4.99616950298388,5.511840567063481,2.3313018870341753,1.118249919869503,4.255276031023376,4.502989160321157,2.774072600129697,5.737344745718575,2.1245857161903796,1.9517212018168186,5.2980933924287505,1.6219670959360912,5.668898271051258,4.336578871816467,2.6180001182446557,5.1897856558206295,4.292655077078478,1.7801743565243857,4.05126593989667,3.980941423312633,4.223992868978804,1.913117071558378,5.005708532693786,5.118243577186753,4.550905644424766,2.228294603672344,2.7687644585361273,3.0934987696787077,1.3182562415355994,5.705453189772218,4.424160263430943,3.9897804911368153,1.582797583591157,1.1338058942832476,4.420136131511126,1.0767148479631896,3.470566281367695,1.9718946647326199,2.3797436620347314,4.654309700726297,1.5378211749888318,3.040985334867451,1.3953354308378132,4.416999202203775,1.7935758438226848,5.9373692017649,3.155182285207391,4.346532225234813,5.86690467433338,4.412401795107853,2.532333378312326,2.6297578807032864,3.4313489300746385,5.573766121336144,2.4257530219238177,3.3855024138514027,2.1152630306314757,4.6656955967068905,2.434456597646018,2.672821954585102,3.5821667442338834,3.1269392669083818,5.848581300743819,2.9576161348343812,4.485854761388827,2.523237264078008,4.481229528309368,2.0533622110121845,1.5751876570221293,1.356372785540725,5.651995305768374,1.4923382870907933,1.3617863700006774,2.3803943379596095,4.61493440438268,1.8073956249857295,2.7794368912984657,5.170728806742339,3.412381883923711,3.138759855296315,5.173184803055722,3.8079167855012264,3.4348000942774615,1.285561874797523,3.4597404747548146,5.828725893971313,3.5916068836682458,5.656382816020221,4.307273260754289,3.757756886585515,1.3932501029808255,1.476037043135078,5.516576486077032,1.1749205404431708,2.1915661555053503,3.2087551370566247,2.968000209812107,5.232947414132912,3.228570823364847,2.2200947443769006,3.717912941743873,1.6246087715225135,5.029495163037038,3.6596489235634078,1.863253012695011,1.443684025453558,4.433171163887722,4.224890602080191,4.1075934228738875,2.876259207773195,5.980844522823774,1.5519267732588207,1.7879766425834733,2.9445350041139395,3.354488572937222,3.198229401866162,1.9872931684797204,1.072286751630437,5.156590129628583,4.366777831295716,2.7483982615236293,4.2925831920534385,3.6118020234029893,5.478314574262185,2.807331510828111,2.6305538103342823,2.9870657446188544,5.557107813405369,1.689970851787891,2.2087303269517538,3.6586676411043997,3.8124809843725753,5.532015538658657,4.769325712548342,1.9224246062461439,5.783325023505891,5.8612515327757775,1.0090047418395944,2.203927091150682,1.9646832431185826,5.474312264444611,1.5818696194014583,4.638310099135907,2.6844624658245753,2.6228491388069655,2.004373798781085,5.941922839121262,4.052537042653539,5.170810402948525,3.3983048614110047,4.0124894959279604,2.997021972014499,5.426917964492034,4.991098645286374,1.786361619891891,3.551400171457494,1.6623781932968353,5.545084140835154,1.608865139834781,3.8088029324805364,2.348648233338998,3.3158448592501815,3.2425292015424834,3.5982456066663353,2.2494522812129203,3.9879642215657465,2.3164861908652026,2.388780865937582,2.3800880200232104,1.8368466837134492,5.853478127885273,1.4041249292257998,4.3191069847824695,5.870180353831755,3.7803483479921534,3.903757824248335,1.7248238730940348,3.731439297951902,2.817647891483526,4.233253138318687,4.920330422787685,2.1749479415106148,5.533835839460107,2.8415006008433266,1.0667015145267014,2.170110127955989,1.322625211969323,3.848773755594012,5.4121428628621695,2.854195788997457,5.513491493723584,3.229151767114029,5.143544372414283,5.823425122736367,2.073917653526184,2.161358172451954,1.7383763330800452,2.909410237710029,2.5543791237932614,2.6876129618160474,2.181853940301921,1.784086908404159,1.258289310876908,2.2582677946321397,1.166174964803607,3.7343882385456353,1.0026889698073884,1.7298503349287166,3.1031296129624244,3.0248952109085803,5.190219438191702,1.67501474026197,3.0684656221613764,3.793018183152861,5.760119229140747,4.706390916350305,4.849805452644124,5.4025479686607465,2.331457033132045,1.7857139819663295,3.6344792918387805,4.619993726127312,2.74727965324065,4.112319950279765,5.679950919509345,4.3722244762249005,1.7016836608701638,3.9789032051653863,4.3138267727404696,1.0397249846081615,1.1578661845774143,1.8717674552396515,2.46592311705654,4.211506142515884,5.051759232677402,2.444512167720824,2.6092532018053687,5.9456651083765255,2.746777352022555,3.6736676147169702,3.7088619836195904,1.135672338533348,3.8007028964345873,1.136076385346079,5.549577394492327,1.2228667289007036,5.577009845416891,4.414938762266301,5.7120728784755,3.832278428813356,2.8036566099387628,2.310438289006397,3.8352419639135085,3.5335743037764233,1.85951682532586,5.881508065905499,1.2672790244753231,5.4155145192857574,3.1946232353055652,4.692850405662593,4.39122053921664,5.8681113003760945,2.042320625607659,5.2773726885430206,1.788432364647117,5.720319024098078,2.811138052262536,1.7838838274756177,5.6965048451897005,1.0989264239786303,2.859481716483554,3.890942908905715,5.588600899468258,2.393152607416941,3.969379558991223,1.538371291454005,2.89738690373914,2.32631937635339,4.980081451675504,3.0452662252964404,5.952872581704458,4.223597612881287,5.945673894338812,2.2035814441989743,3.9599843711714193,5.038401596411223,1.672761983496445,3.6322665506995535,1.3561348397892516,1.1277066705181062,4.2993498197708355,5.196068913004726,3.402654176510257,3.130281870216,1.3656756220783608,2.261019158113188,3.0564533602880686,3.315355993740813,3.355908519772373,5.927764667625514,2.80175005864693,2.556251623451672,4.360095499922835,5.375168526755201,3.9429552271718307,2.754673690621668,2.0771966897977467,5.695870571905056,3.767570367529477,4.820047844646832,2.766525608261096,5.012788897466677,1.7804994002500132,1.4751380165606878,5.774587766529979,5.423122492802819,3.8616163652327096,2.913451368186471,3.466840342045119,5.162098967823919,5.068270903046329,5.114136357535195,2.933788976446962,5.23946044033257,5.06140824408738,1.960933623208483,4.426506546457629,4.815321432794613,3.3118099100264846,5.192843176131934,4.784105731845856,3.25924428729937,3.1716072379946496,1.6894503522291995,2.361836312377064,3.8226838132507845,2.1375616639277917,2.426371346315123,3.464908364850843,4.699294302778205,4.476845349861291,1.359832390498227,1.9057188549016715,5.121794049861689,2.517860745754742,3.2693073178494227,1.7475097272398545,5.151198375347382,4.738182122092409,1.4937078518862958,5.637944500848462,1.6341694216203575,5.8032859737749245,2.3896326082322528,1.3064824807086164,3.404722956875319,5.936428474672256,1.2566788797131925,4.613184112163519,1.0436620908682095,2.6014253479593044,5.174906011458239,2.3177412150016456,5.959580357243648,4.164730846773594,3.070669301732252,3.777568636507511,5.032804091283709,4.792769193690343,3.7281071993784076,4.619285648364203,3.3912051801522836,3.5319622106241866,3.251609958419957,1.111757481850333,2.884415121022893,4.805664032244191,3.4863955316240105,5.562069518710653,3.348371052289233,5.1442718188704974,4.151253961183993,5.124283920621452,4.232706704697708,1.409277249495038,5.943029878550024,2.2227034780561743,5.341490603686278,1.7825028705729498,4.406461896964607,3.2876750801981682,3.1740324998266827,2.768330909889666,1.3722223533034574,5.982936391049576,4.073280911296735,2.3354896094736315,5.407733054988212,4.584855221940787,2.3864835819604315,3.0523121260395927,3.4145362017769543,3.3505585492567036,5.622068081774652,2.3291824302517075,5.761884238893042,2.012919188608322,3.0907219640447483,4.803906989986114,1.03323762094803,4.980309757302017,3.89553781206789,4.181739575791668,1.676714917234772,2.981864942397178,1.5599166199346228,4.121729252351482,2.015045788624299,5.370300566549501,2.620426852510246,5.226819264064636,2.1392534878163127,1.5605403950145427,4.187953813383043,4.999989786516967,3.9913321902683556,2.8310343614360236,2.7688107327419686,3.6889780451719822,5.9705383802072305,3.729011139339942,3.037212045514747,5.718083905523457,3.1599124342305087,5.029989252521728,5.43756336336709,2.117721106735674,1.7103803115867136,4.926617444448054,1.9167311453887739,2.227803334571207,5.263625982544356,4.509839572689767,4.307040730294876,3.075846554791545,4.943596244941809,3.960951555008738,1.3785937325024524,2.83632323330393,4.625745255744758,3.183783421009947,1.6108507287929454,2.956872058719412,2.43646961889793,5.0542479747392015,1.112262153029642,5.9765254820966405,5.315031101754996,5.212203568319472,1.5105699056531199,5.619083894092181,1.5747829482147226,2.7513498420234197,2.226194238613335,4.954695856201482,3.517658286866129,2.5913668095862556,5.696759566833073,5.1808027336244145,4.372317346589327,2.4990385976619427,4.555085927834955,5.481535924220484,4.124789277877584,5.180637966420878,3.04409063091445,4.918938553663011,1.7043398762657005,4.047721511335267,1.9193798285019739,2.5171659278670715,3.343727834591718,3.1827561728351763,4.0238486440911325,5.148601610158606,2.6400217469210276,2.599428332901426,3.2877501349162377,4.643617133422871,4.399208636766351,5.847179398267398,5.584229635159856,5.828697103553607,3.2938278211404297,3.6392161810689183,1.1157908413218744,1.1541300429071468,1.4646380336009615,1.6877907324741195,2.367543419556061,5.742894994640774,4.383917625515586,3.820465525301673,1.1114871603173195,5.515028605153541,4.602589455687203,5.514593059483526,1.6098030060118487,3.9649311245618026,4.339077646386611,1.3588021808821806,5.27857590461954,2.6384948675848388,1.5289468492810812,3.618020873550689,5.536775817329003,5.534179471537571,1.4455144494012053,1.9232531808417033,5.775542516144574,3.467404264619687,2.101799911179955,5.80097494151533,5.703317023486226,3.183908187644371,4.1295266218632,2.983825635014526,5.527222924466127,1.404229680661038,4.628181135838437,1.765883344839482,5.499728044737309,1.0348938915429653,2.817360987036042,5.409493208591597,3.3260770623937788,3.56111241572658,3.692479163057546,1.3235222091538303,1.3247135370718235,3.028500783338485,1.3061005252940951,1.5542085018637322,1.2285293252383835,1.4754451158538109,1.1074580735489783,3.4646667474483976,5.201085955528684,4.812444059432162,4.649416919687826,1.6209987300679332,4.183848087067627,4.212668990577309,1.2359833116882393,3.30163201269722,1.9105522163111646,3.4080195827732465,5.2826800641567395,3.1944006137329497,5.472346016314872,1.4187779833152672,2.704543376916301,5.365199225995333,2.8031397138986627,4.56671342808773,1.2495537476563259,3.6434700398315436,5.639870591998312,1.2239385414354744,3.8511248477415476,3.4761356552184663,4.461920813511794,2.5040523376149006,5.54347860203224,1.6571714270579698,1.8673059880486211,2.0879285941643504,5.370950518981218,4.711852380839877,3.9048108637321226,2.7671910509668476,1.5608855454716222,3.3021423016831086,1.1095239210361443,4.581394790951073,4.21653887999145,3.8922589405569843,2.808155552116295,5.627244695180151,4.361846678989013,5.622745116570951,4.731868486744455,5.1765239950275586,1.9983213169107996,1.0552654522198048,5.4199437296110045,5.724775970947874,2.985487277382375,1.8926411677063772,1.2086725839950454,2.1207429619013123,1.881385686068894,3.0498392347870698,5.673548943046849,2.1986645206512647,4.5922912238326665,2.732081912552792,1.11471706035179,3.88780667832079,5.040966964892001,5.258357178218635,3.2256076520004964,3.4800291014754783,1.0301034190702199,3.004989023183886,4.720711172050349,2.718396668760308,4.26238089348971,2.2005687954960376,4.213152719137108,2.2302456087342204,1.9145346622157136,4.673361986043854,2.917081944611371,2.2191429421592592,2.3566786319856297,5.508549197781467,5.609394679288233],"x":[12.337875268147654,6.239430505565833,2.175597937916822,-5.259170545819215,-5.5228875357219795,-2.1691081462759283,0.8020657554688645,10.334026076330423,4.738832219126776,-4.9118774785494415,9.664177186764956,-5.676757455500804,7.736362304654124,13.199677296958775,11.642528078742856,-0.7372051313927942,-2.789091923224255,-4.630188651151545,11.457889015796281,12.641887871223698,-4.07561546830018,3.000452591117544,-1.3507000089660468,11.380028696937474,8.22148196052541,-8.094439390753482,-1.50702069700371,7.389942887975819,-3.1625474445829203,7.957895745406082,2.7580652556058944,8.006119598539941,10.298083407876735,7.756399285065974,3.6675304090537595,-0.6601923314591153,0.7932368192196563,7.853694976120144,11.7383032181202,2.568585595491309,4.4997587685571006,9.823116306107258,7.931305624273737,-4.434081380994686,-1.8461804206729568,0.9519771919276078,-5.757282009722056,5.876266780804517,5.625601495162309,-1.8017828357159096,1.4074734289359783,-3.866434122796771,2.289372638408367,-3.826764071642761,6.695378506313391,2.7174461013250135,0.6223498954539907,-5.8452467372095205,-1.4949663971379583,-1.8985655988553787,1.648654253777099,-2.571755966661602,9.303649633473103,-0.5091301708329127,-5.272560729870529,-3.269549672631435,11.938156290956782,-3.6969716657783134,6.482751663561636,-2.409764035437519,0.16153004424253173,-2.371856266415088,-8.587027657305098,9.587293961257384,5.138402619066065,-2.493519251685794,6.738046506292848,2.373863128573636,-2.5611489203907305,-2.9062599290077125,4.053783524895154,-1.115675476173581,-3.3505627988243063,7.665632653918944,12.755247069390359,-0.2852291457424728,-8.276966401293956,6.282439065486649,-0.46650953252660143,-2.5350154947583925,4.823594407335836,-8.587131314713028,1.3797821183368488,-4.753364184948364,6.224391720414893,3.9657763302966402,4.049010364544788,3.2586877962154093,5.830355929250446,10.964007998678328,3.8125823743938807,0.7723744825872799,3.2130382626352323,-1.748363797978264,-6.635881928064505,-6.682269544947971,0.9705592367409887,10.139459379796493,0.30860151626893584,-3.6075390772522096,3.1373347279530037,-3.1932660965947384,6.215942063070063,-4.48443843892029,4.805546071753254,2.841453238145258,-2.2259746492526697,5.134076699620188,7.912402761619594,8.207119231442462,-2.909498918865926,0.29860010109276336,2.7732533669153328,13.315470641386518,3.5897540626314903,7.895934099047544,-2.1872595682258447,6.289102976085013,3.42853831599747,-9.23024834325756,0.4443059714323562,-0.3801484449929312,2.1131986093541983,-2.994460237168926,6.8932196850518075,10.014679232528223,6.879424289006416,3.3346801939223476,2.357852757297718,9.02447043126057,-8.223944606464512,1.9926153585954567,-4.827595166779792,10.28099692027132,2.964994272301698,-8.435091398306419,2.077389181936724,9.483687910066415,1.8463315341847566,-2.9940168907740152,11.371050372885025,2.170299194483882,0.7331860359306809,0.15978991931548495,-3.887612826829264,4.926438111531951,7.360133087182662,5.616656150436423,-6.531970894820324,-1.8197672945010548,3.0991975676903887,3.013864942875435,2.0147383363241897,2.671525075627408,5.314189099420666,3.631156178202041,3.170986605112983,0.1986634525592134,0.3001970401127346,5.736368055042867,2.788929183880256,8.745875336001903,11.59413202404991,4.026448028776503,6.203880969827761,7.949751148976889,-0.5114066227151183,-4.63853965796233,7.984941966438804,10.334491755090742,3.16196931364574,6.210938663668893,-3.370565409343517,2.398304760354709,7.568907460958975,-8.664653934921104,-0.4947393425068066,11.58757115111805,5.747092333766291,-0.6457891652081399,1.8225548420814306,-2.089964094437664,7.092245703850065,-1.221518468322778,6.726566116223206,1.7613883621894266,7.971147543838544,-2.455673393384887,-2.0938342736059368,-1.1075970391773626,-5.00882025076555,-2.081110185493761,1.0648613207811186,1.7628267214269693,7.6003950073047895,0.38359458797997925,13.050460387923232,-1.59684371266364,-4.5565746807019885,9.99909000162492,-5.792908382040832,-5.4607721645103435,0.7316986501717734,3.905494202472808,-6.758178124366898,11.941253208405376,8.610305133327357,2.9997133719316253,5.83663236686669,8.025797855799524,6.6669149261042655,-4.2419717321039165,9.007859652927602,-9.193885462340965,6.121499209937992,-8.073388809913054,7.17867676914649,6.863187486007021,-0.3687949481713112,-1.4251255185861762,11.302240575451426,1.988168238401459,1.956074136875396,8.752308699862946,11.344190916691751,-0.3044035069716279,10.984416878276365,7.160620912825223,1.6655967616451144,5.2031142301963,10.671821359330655,5.060498455300568,4.732592656897626,4.134351394874455,12.170807806163815,7.389229415638312,-3.138037245771464,9.371435283830213,4.73796916501936,6.315368132892191,4.150828995619026,9.016876958738353,-1.8419938488773568,0.43453418476955397,-6.278306127084731,8.399624893798174,12.608156008490935,3.082704330713691,1.6722574791627256,-8.134695451745014,-1.2736312529268141,8.166464740017753,5.408612973587767,1.7865104044554845,-5.172526804313993,-4.0637074656453205,-9.089882909299629,13.164215907426614,1.1845996958298008,6.435717910372526,-0.4938727179787771,1.6511681142359986,-2.0841624515371993,-5.2948960787729105,4.567893718571414,-5.489748722977183,2.903717781821362,2.9747380878640297,-7.476355299380772,4.924151401898904,12.583683631379062,1.1501030237211496,-1.2692478775480232,5.795347514246322,-4.661968261466374,-0.19648062015752207,2.7660833030191863,-4.041857933394965,4.339221010996043,10.046029040829909,-4.2769568983261,5.004113040040354,2.5404083506538484,-0.7706960467762382,-1.9285502703068764,3.1870083653390435,-1.142379504992959,1.5680841524071476,5.854683631282571,4.7089967500193985,4.145829794494484,0.42489276140120535,5.805556600936184,0.5568334060872656,0.3657383823887551,4.5054898154106535,7.173610423727952,2.116366059336716,4.205647949120386,10.159000087175114,7.783045668123073,0.8405202924623153,3.8709813908901105,10.081062274173968,9.893334075020823,10.806969663726948,-2.3695797890336467,5.259997112065184,9.26588902701159,3.1131609836318535,1.8032508344715859,10.030957719726457,2.005331491281581,5.990254830384956,7.6107960208518275,10.10709586317868,2.7745532008039624,0.5981876706007728,-1.781374350328075,0.7055593179862892,-7.190015288193677,9.43468747193085,0.8050785231435974,1.4711799153179155,3.157421353732009,10.432922528531396,10.996173069411011,-1.930365780345395,1.203748411091356,-1.884265115449798,0.9019178151189265,5.5252942306484965,-0.4927552211996137,-3.0164745735687757,-1.9201601178741168,-6.563254372697512,0.7502723854292327,0.3054641829556227,-0.7900937000633231,10.225894561803274,3.581348155398738,5.146216028030581,7.557389923302852,10.722218896778928,-1.6786528077870433,5.075679871287689,-6.656853757451704,6.1055242886565555,-1.2514915392789168,10.116425568103345,-1.8297845625786457,0.687665200990803,12.180545464662849,13.015979345476426,4.619718747707103,12.012324157791609,2.213200501660142,10.603143614554696,-7.975080401530917,2.7906870666937533,5.6579262857121915,8.32117650904015,5.1492119707071495,10.854130550509806,7.530599271551917,9.093809316436705,6.873770121147807,12.800747854562564,6.7057077616895535,-3.7461051655406687,12.263877433378505,6.788316541647783,-3.6734506515168577,3.9479911632004057,2.2483444174278087,4.141345486610082,-0.647543096067056,4.785295174093346,-1.2704979942962336,-1.7296567935541551,13.736035558250597,3.258037818026397,-4.232659376810381,-0.4907481219219868,0.22913076665788115,11.731972586017516,5.585083756255182,3.833343483541699,13.748399328222813,-6.081943435806945,10.046880981067748,-1.5508381311138906,8.564638556528301,7.089762355106105,0.5908874025869965,11.936565962027329,6.926265884784332,2.742988286147406,7.890929859735792,5.795828490755218,10.115057963370154,13.33534592727513,6.368018299767028,9.048831107703693,7.468277747774343,1.8257517673385562,6.0681119051050985,4.451975003092619,-5.5507411888912985,-3.145681645317651,-3.0479904087379235,4.105031193081333,-6.687812902793251,1.3223025224301126,-2.7483723134387197,-4.403837628811061,-0.22751691518096093,-1.70037848396364,14.225430929240602,-8.413522701557243,-0.8081318286588278,3.401411118961756,6.342550973045029,3.396062713515859,-2.393338338499939,7.168680744804298,-0.4279773207043137,5.729783323071155,6.596668937829814,1.3413835721156748,3.388785237547872,1.5272415441968468,-1.639253667450521,1.5530190329975988,-7.091411602915498,0.013401873516461299,5.909264513541784,4.717054698408317,6.224215485474465,13.112678709912052,11.095772171671083,-0.20816196564069508,5.940021385508812,0.9581202807226278,3.39969912697284,10.406155863693792,1.7003903332589831,-0.5048854518137978,0.31907224691223524,7.325172911661246,-0.5557723130680451,6.544940470900093,-4.1058611125718585,10.688211873620348,-0.09427192037749918,-0.2620648825615707,-2.67905721937096,1.5797509064989308,3.389933360153766,4.195214342936126,-7.727721572559209,1.2393591416843208,1.9016769380746017,10.117838459778671,1.351089222929508,3.3524672176805876,0.8191978320264294,-0.9647718970813838,-0.6029947213283601,0.28185285979151364,2.6998082540920443,-1.6211985318014888,4.473060570797003,-2.9756063200862575,11.95220939907323,-0.5660849756650986,3.7217975755847985,3.917781209008947,1.381401565396056,-0.5831094947558327,0.117845402192469,3.229875523015617,6.834923481129842,-0.5730001836161641,2.9080967488793337,8.05380180243099,11.855619878207602,11.053552531945602,-1.0040598729266796,-2.968460278200403,2.9751723397013277,-3.215714006037977,-5.584633552399886,-2.875543204979565,10.486540230533475,8.163496989975842,6.5989972803734815,-5.373695714210131,5.328777696077638,14.237965462993074,3.6984002431349823,7.578104447532629,1.5120351768477591,5.24137130426706,-6.296753316654917,-2.175279121012536,0.21047043758933484,7.621832871028118,1.266217824841617,-6.1300999272935774,7.402276822790759,-1.0147335146177592,6.659201526438622,12.314528443181912,10.795277846112873,-5.872021537300581,9.352345564028681,-3.441455763350324,4.570509996884398,-2.4500257222951247,-4.82957193887929,7.898984711221745,-5.083220883910496,-0.8394886341710429,3.1285649250055045,2.860995713573067,-5.64711102789113,-4.1784902702503866,-0.37093925565413255,-3.3803887809745805,-0.09629601539665131,2.2728077342713413,10.095122519624692,11.22853182114184,8.138204476538432,4.682428379739276,12.804693490905803,4.0593267805492825,14.654171934956455,1.0606230864658017,4.619600133479482,-1.9948947100568595,-6.934874346606488,8.43881812809106,1.8682741564918017,-5.141087612067164,6.187195843990299,-0.7561057177144072,11.77110789330213,-2.3723928356803605,2.4100105774897735,1.4796600220748313,13.438265968797316,-3.523591889893932,-4.256464967509514,5.356651338983835,-4.675456856157647,4.332566141652859,7.901107200092918,-2.081312388692193,3.187359673991564,-1.23629992221692,-5.686402529475611,-7.54017848063807,4.0189603782880186,6.4279208871202185,4.077612733181623,4.053407993354811,-4.273061365345464,6.931929408659968,-2.4492299845797834,3.004319588084844,7.362069609699239,8.138410055984552,0.18271111804233478,-0.05927900958364027,0.6634920079477137,-1.8193718157449046,-6.617957163494234,3.741201415203789,-2.5179953391604095,3.9407857806748647,8.593456057583138,-0.13521732555097596,10.399601582816393,-2.673439824942538,-1.5237665216673482,4.9313380811709004,2.5949793376386756,-5.114880660552114,1.9452101784726108,1.8075407843164037,7.9877314777040835,3.257589713970106,0.7149103412397663,3.5084469069827144,12.41576630679659,10.738586774812,0.6261113205665524,-2.2725871475620973,4.106925983016847,0.14464804615138652,-6.243068040521942,4.713891031706082,2.246875299756234,2.738915877734707,1.8678235189147716,-3.5369159360669693,-5.237037803728473,5.465810169171891,12.481007569896517,0.8944513280075274,4.8438896181732805,9.371631740137582,2.5356157091582356,1.8341297601599895,-7.011535661666974,-5.495257781733909,-3.8493090859190437,7.662773137917279,1.2094935460102474,-3.7925903479164504,-0.08513897296819292,0.5578388940597513,8.429205803855108,-1.8030703768285048,3.0815754335230428,8.027742246507044,-7.263892045087884,0.09442338939433484,2.736212842757427,4.266909389393897,11.64506181684178,6.302192967587946,6.9237681868978855,4.62409679862539,-3.666385251129277,-7.003654588912741,-0.5936712623736408,7.505645807164856,10.148602119296,1.9842096520150765,2.6232626532632453,7.090860899070732,4.716804540707118,-5.48431262746208,-5.886213747622142,-1.3161579541519708,3.4073919748101704,6.400471031515213,1.0704339536746121,0.9389540395755253,4.049344143614578,4.213182010849967,9.289407889865325,-2.632057129258786,-4.820236883940417,8.820149422376568,7.144796411747447,-7.833235200699905,6.200450086953593,14.05285521968542,1.8332768040573098,-2.345155936353782,-5.678064233994639,0.027830781665541343,11.4229985059412,1.3185206556955333,-2.14659663923609,0.4615960132578317,14.094660075445598,12.37407477104052,9.718580265011155,1.8661659366211896,8.264154853103577,3.113814931266472,0.028845316150245465,1.103150757711663,3.4780910944787453,-3.721624728957322,6.795307160371941,7.607089450687763,3.3280509317831375,-2.101222108055818,-6.500062324764527,3.570334588172353,-0.49615038790686017,8.959880561631817,3.984616083763559,0.20234813370735952,-0.22949528414777606,4.55340700234877,5.1705323915487575,4.217452340251677,-4.922839729573992,6.3452670423874515,4.563271540579977,-5.485696030325177,-6.188526766652379,-1.2063866911403003,7.742929098886183,7.540582668282836,11.343283182286632,1.6863736012184645,12.47455534579079,-1.811832616382436,-3.4911995954017425,9.070474250881702,-4.071726034317278,4.125211004547859,-4.731764664094069,5.76408482091357,-5.829895390981327,-2.443109850014053,1.7530316713438974,13.622358399638701,-0.40653922598656467,1.9115143765883702,6.8901676437929655,-0.2842087381259263,6.678676052651937,2.817170491948834,9.244439540142393,7.384380524674599,-1.3974396419218933,-1.0899036947665617,-1.1717527766251878,1.8568691171990306,-0.6673741604125271,1.1921584761790638,8.031397462886964,-8.31430404599671,6.614173301277402,6.74493781330116,5.0481488929225495,-7.1571508032498246,12.36309921037435,1.9985543742531555,1.449327191316144,4.8953598999099865,11.486268929263742,-4.865668978853168,2.031811292695559,4.600794260090929,-1.6841834357264895,-3.1429411964651415,3.2616062757175492,3.308711766707635,2.7527309830982585,13.807594891758347,-3.9319373081730604,2.249323815287188,3.493887300385943,-6.312302699232099,-7.247577539114327,4.089544885244731,-2.7875636292183263,4.368531357740875,9.63279043352169,6.7769050142269,4.396211235153084,5.525212677923875,6.692223805753358,-1.1721795405284277,8.953054329636776,-2.5989489065042517,2.165113933786537,4.0262180934334015,2.209530130660573,1.7700193418699315,-1.378766392318084,-1.3502030873080062,0.11457835213277648,1.3736971854928721,0.11501170988580647,1.3473264402696805,2.59703657649078,6.08977429250387,7.063604994405808,8.151862433739478,3.2699628900299573,-3.0387926373556815,8.008676835088208,2.7601391438291683,7.494286247812647,0.06467116402101017,5.260438102145647,9.334557716891679,4.646791489864665,9.384986633122201,-1.9555867892276662,7.941740430482519,3.2593934129551667,1.54329198265938,0.8899720854446257,1.3244503695052408,-1.0587863837954798,0.5381868137631528,11.701447036942596,-5.810883564711504,2.198933215952073,11.52153011098354,-2.131061794399757,3.558802140845391,4.304205902706347,-2.2344545879364017,3.4352071298184232,4.5764030391240444,3.4387069064906286,-6.756426367672276,8.128926638690444,11.94815389077804,6.456811429418966,-5.189316371387099,4.145198881762032,-0.252858130757209,3.968495908009979,-3.7294770454023634,2.8694697832122267,1.7628888919317123,2.685360626659078,-1.6338473432048208,10.124640408629489,5.01368901227451,0.5112207339041251,-7.880328256544035,-0.5789687684852135,2.3602050021413716,1.1355552592867801,-0.3517473399128336,3.381239190266664,-4.959280138927694,-5.793011004663311,-5.551907584931181,1.405422301742444,6.244468905940108,-8.258426504270842,-0.9904065024090226,-0.08439647261107605,-5.102992096181234,6.839340217879159,10.142052964621394,-6.381459245460719,6.787554312380472,5.505139662023673,3.516384258202803,8.082297988547737,-1.4720921004167487,-3.802077012337103,-0.816792856233839,5.308737809928568,-6.083639303830617,7.788348083055299,-5.385701786936295,3.0947296285120154,1.7261471191629858,-0.9287260745703686,7.970854631677684,1.0549278720605781,6.210738148760436,1.376976328640787,-0.5415661430306861,1.4999524284849,4.847132466926215,-1.734788393423801,5.1081730788582185,1.9734926594695636,4.899359865952999,4.835892255745639,11.013543107920833,5.014488496112525,8.5010475214115,-2.5021045293817346,6.783667239787117,-6.406197695740953,7.46952398375853,-1.7343493687790867,-1.1368273785144445,6.9433374852498115,8.996990477807485,-1.2813053464172464,-6.636642846605969,8.047168878418395,1.4761335830926936,-0.5023936133770232,4.762249372713111,-2.169835705765594,-8.878775753292135,7.112019415768206,9.01611902262366,-6.707369024378925,-0.020057076451373085,-1.7003533470033005,5.544505838448787,2.154149247535401,-7.944045182040162,5.195797036194729,-3.0255877121695858,0.6999894584580367,4.589885701350596,4.973064359010602,6.4226700853841745,2.5421069325867864,13.023651623459108,-1.277172114712918,-1.0634687278072827,-0.4369671482766272,-1.4857179550572446,-4.512945734783129,6.659767213955561,10.093725748250264,1.3062983490159596,0.32657356594789133,0.6572722480491467,-4.623078918683797,8.696701810798553,10.557264780967826,1.1127648778558155,11.197083919078436,6.207847651042584,11.159765031497535,5.291918123585381,-0.6432395116710966,8.850435892829081,7.519030356190285,-5.325734877373943,3.3337797662296276,-3.0857413408240606,0.5917800732194446,6.974554868579772,3.683113717196744,-6.0416028702489015,7.539675238853301,-1.2423372422455663,-1.6141795560540106,-2.141451485638584,6.636834100387898,5.364971711324358,-1.2506225593437965,11.373477127269917,5.64734495874578,-4.667769619650571,11.042081078859846,5.8900149168994265,-3.499565513143105,7.9387049105016345,4.30575760717634,-0.2424132304288392,-3.5147838478539812,-2.726323018985155,7.250214470243206,4.678808538412195,5.0572467158756265,6.109462272632706,10.897692418894929,8.548995607110127,3.4772804942266595,0.3423710006721027,-0.03796777345425059,1.6427439882196015,0.1759706250118475,6.279186262578502,4.223363921344379,-1.3589566287659145,-4.57666979497487,-0.13429090462487067,10.497989985938508,-1.5560433440194892,4.450080303815845,9.671149433538437,3.56154794475601,12.584190991778199,-0.5321550755226104,-3.202836322290231,-0.7762570081175998,-0.059637063309915556,4.660082167487527,14.568657151828814,0.20953683709196805,4.255365325530136,1.9345028231411203,3.9654481213494877,3.5066181634037705,4.3379926091207555,-1.313357261305756,11.818606936887248,-1.325652332968183,-7.168433888190126,5.740007239983475,7.529227503399974],"mu":[-0.5961004446027407,-5.955876943056843,-1.7218595079574128,-6.32323885666689,-9.795660405414491,-4.017283175978557,-1.6492272677157693,-4.5603482368710235,-4.169390174798824,-9.405262690667763,-2.1103978493155484,-9.31586280944725,-4.249483997095938,-1.2939606129661052,-0.5055876987239816,-1.012097003192498,-9.532790574281037,-6.314819735492298,-0.5415464333911113,-1.3222553753696875,-4.970941932461949,-9.562479855819003,-4.626141046734267,-2.132571221084132,-5.146687153787532,-8.322930053174385,-8.764993503508192,-4.808558250195814,-4.492530216679991,-5.960654389396327,-4.374202856253781,-3.9784744138106354,-0.7658334343110162,-2.3764156828158622,-8.971581913460431,-2.3526514900468642,-8.081896997949979,-6.7189815844570955,-3.2079431408056847,-9.904929038754702,-6.254802822117158,-0.3891245000665866,-6.45537571489478,-9.20457262466972,-9.56107826130764,-8.143817308534418,-9.589950065062588,-2.432533854741441,-7.882350980138664,-4.669990209439514,-6.975736442761722,-7.39138881636552,-9.278191457070257,-6.774853551534936,-4.501271078929907,-8.683669844837922,-2.3056812954711736,-9.141422369330265,-5.216565576455421,-5.334606365952519,-6.206283434542321,-3.0932409795421734,-4.573038125215179,-5.798750201661804,-5.91810469180996,-6.102271690472286,-1.150893072101833,-4.0536865383905685,-6.249310678520681,-5.4630503973979945,-5.58691885049166,-4.047051495154572,-9.588011592816992,-0.45932544801819297,-4.457776180211129,-3.4751666409645754,-1.3039974589327863,-7.573504986237662,-9.31766402235051,-5.105629503256665,-4.0568070042714695,-1.6344925983059255,-5.479201401166829,-0.8991123471245133,-2.009503544210842,-1.1334424835445178,-8.434827253312022,-6.336225808051516,-7.704535876604024,-3.025109784633957,-1.6631618936473092,-9.833814289224756,-3.4396513397787487,-5.872951786299614,-1.9276122525801376,-6.558667841928639,-6.189747776755786,-1.2174248117887632,-1.2442301234974185,-2.202644229143851,-2.7150046540323736,-8.178883646354809,-6.2092767456217395,-3.090696509266664,-8.697529788254457,-7.951366159731885,-4.337969198376488,-2.8425362422642064,-0.06521737463356159,-9.266990058557953,-2.1486201443298447,-7.074338240906,-3.4982385429613028,-4.84574211296644,-4.9871441229516495,-2.674346663322118,-3.2751905368351397,-3.8858016687631203,-4.773771315352715,-1.5126305251488392,-7.225318325658574,-9.20971237150457,-7.6634328519560135,-0.6336562280422142,-1.4180606729801482,-4.667717244354385,-5.107439816532158,-0.30963031015799114,-9.955452160557876,-9.804007991676047,-5.930768991226323,-7.685679637859577,-4.172315487106308,-8.112607637180343,-6.837614231038652,-2.612923101571216,-2.8932127016879283,-5.2576552367340845,-0.07423670880050137,-1.1852819262191217,-9.96987697201672,-7.329069087966404,-7.898264016826209,-3.873690899881028,-4.560600593102246,-8.81939176243079,-7.37208469707088,-2.4079184412482024,-7.534411873557019,-8.218431341005601,-0.7989431845293771,-5.256345190678154,-8.568205256390044,-1.840325950978312,-7.552040703920719,-5.390739078765298,-2.352180377471129,-3.0963261998123937,-7.526568343995031,-9.299307532409307,-7.894819636023587,-4.633607824516455,-5.1678475905982175,-0.603498664939055,-5.873385900151513,-8.697693296713547,-1.2415283642597763,-9.464092047666755,-5.3384857396818415,-6.007855698816684,-4.806194536798973,-0.24858064778110034,-0.6168052648241162,-0.44201720660847155,-6.116623492646189,-6.088049784093059,-1.3087232921561243,-5.240180816268694,-5.84385291232376,-4.601886084682436,-8.95680913219181,-0.6344633618577555,-3.587880578334226,-9.716574208828954,-1.9982289398729702,-8.78243308618351,-6.137683040140067,-2.5228792181500914,-8.792664179470634,-8.724003125760426,-0.7747856914422102,-3.619299925468571,-4.786310781635025,-6.269390941852815,-0.7634747094891958,-0.15572377261454218,-4.005915123827803,-9.138912677043132,-4.652205759158106,-2.3674311699881745,-8.839336361444662,-3.306916431751983,-2.261255092002099,-2.672499695110886,-6.123575636903937,-3.603513525182005,-1.9120433170439721,-4.604766091131911,-6.140242118600954,-4.438590747780893,-9.257069123840058,-8.839466846519086,-2.3342148569124133,-6.411481518411286,-8.697898098079817,-0.9913977629073356,-5.330185361000021,-6.530334832137994,-7.389689929374548,-3.8392892619029406,-5.425734055433303,-6.334704226032295,-3.3113547014343414,-9.817388509351604,-7.830168921193954,-8.75049107388161,-4.742581848528296,-0.025331182778614014,-7.352671971885314,-4.770795914944845,-3.4133143938886645,-8.050007435922947,-6.689960063740568,-2.765650576450578,-2.9800617597013157,-1.5457093961399337,-4.026422871366537,-3.1540493817548754,-7.449044193461958,-6.363958068372377,-1.7628330890593258,-5.954423922808811,-3.885357983918374,-2.2954229039228835,-1.0576186787677622,-3.2464942723878654,-7.603966396206355,-4.8599904499686435,-2.1412082340813887,-0.17997439436378881,-5.076777137924111,-3.830435471787088,-4.816802929721815,-6.772192385744649,-9.954487989004527,-0.7074564706143294,-2.292131582255703,-7.092699336404483,-3.297736706799783,-8.884929847960992,-8.604634795417311,-2.162251379027076,-4.987205588329767,-0.9512868724793533,-7.194353963542186,-6.779884819238626,-9.38670756496741,-0.2282127117393662,-4.704050394618431,-1.0595283605596095,-5.2351873411793415,-3.893023395693176,-8.516363203456942,-9.878114182997264,-8.627809455125613,-6.116443447448199,-8.335220019579383,-9.550522279043454,-8.576826714016242,-7.220928151128218,-1.5244117887383024,-0.9584209624320894,-9.935238699573585,-3.104877106286854,-7.537417393389174,-0.601692136178853,-7.077607990336099,-9.129441505197743,-6.551144756651464,-2.249093251708596,-6.648266428948806,-4.012900052587827,-1.5649187809210585,-1.5401626365853605,-4.3030018859037416,-9.583437488203217,-6.380890088550297,-9.104363700921663,-4.153317379775318,-5.7315302016051035,-1.2039220505388348,-4.464247205254425,-5.6750705239295325,-6.244624298667263,-5.791343316073023,-5.758535616464499,-3.736020588935174,-2.0559782278981165,-3.4675059339712755,-4.272281186586748,-1.1860824288087168,-1.6663307440336372,-6.756484491866388,-3.898852768725174,-4.074123767330122,-3.966806975063375,-9.354639975150455,-9.714535896918083,-1.7008130570791824,-5.147033407819603,-2.7911307946391117,-3.1451051638546046,-2.7520011393491917,-3.96324150388242,-1.5602372234342199,-2.8208655106753278,-7.667824200748021,-8.79448299227291,-8.862857170593557,-7.619528528476451,-9.887253569945713,-0.24269840707366042,-0.5095013291006056,-8.98294629720845,-9.815841033200531,-2.26746255379636,-2.2255794031696197,-7.742302867739983,-5.4921136289378865,-2.99697673152046,-8.085077987102693,-6.186226737898808,-8.068225826991275,-8.667792580808815,-3.364485550642775,-6.808360389659938,-7.6820866268168135,-3.8785778957991046,-5.365434403840741,-0.8332747944525609,-9.74046793457932,-0.680738866194448,-3.1687482788038146,-3.810609689108866,-2.851183465049134,-5.957726217676966,-9.679454596894118,-1.2493441217392554,-6.1727511451502455,-2.7889498483316455,-2.070106507387899,-7.315894750938064,-2.895625562273001,-0.018016478077840237,-2.189544099291054,-0.5663571505987486,-9.777597152114073,-0.20252871830467312,-8.088577003254285,-4.4592271150244915,-3.1327519664262193,-2.5839472566851973,-8.943327641055788,-0.6628738398168865,-1.7467238729098433,-1.5276156948843655,-2.2965521609236372,-2.2572006718063298,-0.8430045044016188,-6.6319729037272435,-0.6453594950640218,-3.197396263232404,-9.7890956509951,-6.7743693843093356,-1.2950095562426833,-3.210579076007094,-1.8229310637178098,-5.524940646924589,-5.245730744747585,-3.560760834195127,-1.0095050797514515,-8.388922701702402,-5.22397025583447,-9.795605279318787,-2.8900378637930224,-2.2074283561934904,-8.512618943966029,-0.32377390343535595,-0.8243205055461167,-6.280548069660572,-1.7610831749444977,-7.776996422622413,-1.32296055040368,-7.7848486838067,-4.495891867683913,-0.9837460964873457,-5.138973574272923,-3.0753869927754307,-7.039836588336225,-4.794437187667764,-0.3586356770044352,-1.3865122124228324,-2.3864284882609366,-4.28430571242068,-4.8119647946006205,-5.510428168197484,-6.776956580759286,-9.81789040530819,-5.903345139666465,-9.219052251466495,-8.894821478521209,-7.778526603201758,-9.241802470336198,-8.587269637551874,-4.338818983001769,-7.257883450596823,-3.0203075793846668,-6.2156400379696075,-0.46473129926568824,-9.778665833955626,-9.643330081545203,-9.366945671160973,-4.660506417521166,-2.8747265097317154,-4.84522066275294,-5.648186596695018,-8.090329316329967,-1.283188638880326,-3.318382765094632,-8.057313806275479,-9.39659278317219,-0.878169994485718,-2.292270495449311,-9.304873092295908,-8.114102468359736,-7.664127541013439,-8.478488055328409,-2.0140015585147952,-8.63124760592025,-0.2321783879524153,-3.1326329432172195,-3.8230867712691485,-3.5477661237385383,-5.018589446564712,-1.7776353231841568,-3.5848899508717946,-6.247612573164827,-3.817652618692604,-1.4168862045382702,-6.585667839434501,-3.0573012043392556,-5.923458460856869,-5.240739205100306,-3.210032023180056,-7.502292070831302,-5.265355553590563,-5.135753421526886,-3.4353230653350653,-2.110724978332721,-6.5881091280161,-9.19781357567437,-0.07654021343571848,-7.929614862099726,-4.087006497443442,-0.3442596064053638,-9.213774437114077,-6.514404453503342,-8.056184122868641,-8.666636241314809,-8.339273463961705,-3.0739775745002818,-2.524805570685913,-3.1843215145980075,-6.231484497117387,-1.146106447370423,-9.746829256214939,-4.238006428941528,-4.362350160837236,-7.9681626306095765,-6.831841943888177,-9.709993032301416,-6.886431638284247,-7.434611790612626,-4.08306530502114,-6.450817015413803,-6.035108608900581,-0.4472100885638297,-3.2323131584809506,-7.378402091178938,-7.316082551300633,-6.564882890901636,-9.60920011094505,-7.381521213420017,-5.701587654598064,-3.059495006642907,-4.1793303785458065,-0.3687146855412782,-5.96896339034471,-5.5392744850200115,-0.5238571833793926,-6.755826350690512,-6.214608283881741,-4.758459490674259,-6.059948055324353,-6.814144161971825,-9.758069604258369,-9.246664770488138,-0.8496834761563088,-4.387071761590189,-9.043035331241043,-6.706074380152318,-5.158720130563745,-3.985694796149293,-2.4627502561602688,-2.9524219116362915,-8.466314958707045,-2.0169704527023335,-4.701579579407101,-2.9616933409198642,-3.553497522717808,-9.673683320755975,-7.10424068590542,-9.012745179209942,-1.5589123779876601,-4.449981042702015,-8.255976436723437,-6.916217410947205,-6.388717676356823,-3.7052973613940243,-7.23029380232801,-8.216728287701699,-7.6501578451049586,-0.35203959270575735,-0.5770034782692313,-2.9283867615090164,-5.0504668785330775,-1.3658183763078369,-6.405913658426197,-0.41660370016654014,-7.705201842110698,-5.248801817499189,-7.846314613153849,-9.980869624156359,-1.0989038754988267,-6.976887686701532,-9.96743268520547,-8.152733095679723,-1.419780907471646,-0.8127595909237662,-2.5750167052849293,-9.543891539705529,-2.0259887998638626,-0.8827424882364587,-4.541728645038356,-6.8054764206113205,-1.0718011280610718,-7.716945966366646,-6.496556627189389,-4.924593308086582,-8.217201458784459,-5.681236627033268,-9.500863380538195,-7.723674008888111,-9.264853656434,-2.945480956542399,-3.3712809836272895,-6.0077343678412065,-1.9491396502712321,-9.048814130012243,-4.172058132479915,-6.606730528686915,-6.880709474794733,-3.5020331035161445,-5.694514320401716,-5.23894936307906,-4.046627763020991,-7.770542006983943,-3.9081492112468275,-8.847243134755134,-2.9140708025263895,-3.2160012705039764,-3.155641755440115,-3.2699581493782626,-4.102418273724218,-0.6379693625497995,-7.264492110877335,-6.688361620947001,-6.8173441128939105,-2.951846623225245,-8.798398118860554,-4.438142480325964,-9.369065923983316,-2.905455795519871,-5.136055890895285,-6.359821377252692,-7.2849015174143705,-2.3809947664297404,-3.4623255597126246,-1.0108739738201078,-3.1562881003602694,-8.223661514889615,-1.067841108205414,-9.699811158562031,-0.13120455839386702,-6.995053216556599,-9.053734198428188,-4.637530502441869,-6.725864191516997,-7.449846949158991,-7.654783244675394,-1.5301706126788917,-7.403921045798299,-9.266491368919954,-4.160623488788531,-4.935026495638044,-6.714708968927068,-7.313524516385604,-8.03781600906536,-9.411696669596974,-3.249107458520062,-5.669517312355938,-5.110592885664964,-0.712379453615144,-4.926503669116364,-2.55191457394073,-5.746630208689321,-3.1284148684518343,-3.6578800738950434,-9.112860201490129,-5.6207897795111705,-5.906713972736666,-5.31367465685322,-0.7184783178716225,-3.7194922996897906,-5.985536547541952,-3.3081318789686742,-6.6988557913321785,-8.01255292210174,-3.3951809164375413,-3.2144075079569,-3.3640136928979048,-1.6350835878928716,-0.3977705086080219,-3.465321735215683,-5.653241969198719,-9.45903003519702,-9.184921157753696,-7.442025963568697,-4.0082956998010255,-4.4786460582025,-5.16143072865443,-3.5474072304200233,-7.540150553091724,-2.571542113966272,-4.136144578739216,-8.012723161300123,-7.193720803529806,-3.761528862733461,-2.838644430845023,-9.461730854849414,-2.5734592249041177,-0.19469320945672886,-5.885500479592265,-5.651711142745204,-7.972196030672711,-5.147250993279744,-0.4629913739915459,-5.07893051262432,-3.964434469514073,-7.033603568760139,-0.6236766906729829,-1.9270608815017143,-1.2806061099818145,-7.791986930024941,-6.600275628198718,-5.3046169030757095,-3.4090103723711396,-2.473841351861399,-5.701044183869235,-7.689876359053292,-3.742812014188559,-5.496588537686762,-7.0121057309827535,-3.7727127690198237,-7.839099496799607,-0.6475136486395439,-6.151040159847074,-5.601362853144238,-6.374228833890951,-3.9718954653723526,-2.757525459274386,-5.014813459298361,-1.8356419303904414,-8.985079221568839,-9.269750295761988,-7.674651738287698,-2.1975277271820737,-7.003576951906512,-6.611309291082687,-5.884479810153406,-6.352484134506831,-0.36755724200452145,-3.424028324433721,-4.334837226872321,-0.5393321328027034,-9.895450277552523,-7.814668864685106,-1.3012762832358615,-8.27630508510899,-9.662871378686006,-6.394485479723524,-2.4701772801310162,-6.948942872213843,-5.823051429968487,-3.9034931442867604,-0.9938200675648234,-6.432624738002913,-8.343395228006024,-6.859378909297938,-0.9447261712894872,-3.5390901578947864,-5.639214545359814,-4.814873981633685,-4.202912415319837,-6.762672039804318,-4.273988003547249,-3.965208198569121,-1.236990192193812,-3.739465844517431,-8.607330499190653,-2.352861992231019,-9.318350222864826,-4.839201041477663,-6.713770784298248,-1.9153227717296928,-8.391216680199804,-1.0412502839938353,-1.9361591093160513,-7.06247092651151,-2.9141236271623816,-3.0432282120829823,-7.8629921577577555,-0.4525042184542949,-0.7107995757482355,-2.925767980847258,-4.182556389879089,-4.036449928305663,-0.6147963774094078,-0.22024086378267915,-1.2760574708885408,-6.820801712634859,-8.43133147856557,-8.434555417687568,-7.371396685210017,-9.228244777436887,-5.44636327553161,-8.571335172327268,-4.813636405377397,-0.25293478972821415,-3.131949329266537,-0.9455157575310413,-1.7959556920150699,-0.8858892581985556,-6.045258865939451,-4.347525541480972,-8.339705717574763,-3.8378933679525695,-2.7924823547885946,-2.63200370609294,-4.9932286152926135,-4.109444325468814,-8.129215274046295,-7.2791735135315605,-4.461480184147617,-6.806809453638767,-2.174859068870365,-5.825564548927849,-0.5737021398155417,-1.0104245174866255,-3.968817629175796,-2.5191912960847818,-6.897573902682856,-6.185211262989947,-6.27445222357008,-5.0726834389421915,-4.78758579124584,-9.237097267036091,-2.232604423709852,-3.71625324196196,-4.816224427709979,-8.192397185052476,-5.3520883813848075,-7.1527815756035995,-9.584658907022769,-0.850228763086287,-6.69782843212269,-7.365213946170714,-7.290377930754845,-0.77784661827067,-8.14499587724943,-8.98039533523001,-0.6180968885683291,-4.097565693191248,-5.712275954648833,-0.3123840657207433,-3.53497186015723,-9.515912338105084,-6.959003925432925,-8.233766753524407,-7.910821391944845,-0.24900558892166025,-1.4797608391009787,-1.1254201519083407,-7.615136062050207,-0.7136888513201578,-4.673281636358684,-0.21729288100088562,-9.20642302878839,-2.9921760874400594,-3.4675033151743984,-9.10319537910593,-5.86181412065306,-4.730818541542245,-7.995461123503976,-4.104098102767201,-9.111794727380591,-5.368699438512216,-6.589084338190694,-6.73778636246551,-2.9716160712151107,-8.861261113752605,-5.088976975100728,-9.89588477751375,-8.324712191731493,-0.7612185714832997,-0.5701934729469116,-9.519392283529317,-2.971447735847792,-5.580224669837744,-6.8022695927806565,-4.321150269485972,-2.1223457289184866,-8.559048525362158,-4.549204450923874,-4.895244690054488,-4.573011858425168,-0.16457463085798985,-2.0421471798666846,-6.852038581358968,-3.502487494491855,-6.538250166528563,-9.714719179585728,-3.102530068409699,-7.748152001726201,-5.657577623503551,-7.563434557546214,-2.046678816733569,-2.488600149320934,-8.813021280636441,-8.060647767580189,-6.820013077406342,-6.101815766801395,-7.848385148920203,-7.37931317214729,-5.414907851241491,-1.3477062681383,-1.2793134795040406,-8.541938791334118,-3.4633441713525026,-1.426383995123075,-8.694116639462104,-3.107996505289099,-8.391139334733344,-1.9364087469692004,-9.583406265893899,-0.8948322049654367,-6.805281646109719,-7.003214477858341,-6.710486408143677,-1.828577694423803,-3.0898770485168026,-8.249912131503079,-1.0647734471387493,-0.8727666560184622,-9.87518861963466,-8.579966049689352,-2.431061287034697,-9.68303420177816,-7.042016698644222,-2.903495566697749,-8.810851185079942,-0.5160305012408073,-2.6001420172995293,-7.400112190721035,-2.554241122145595,-8.392391365998233,-0.7871040269913676,-5.670196854270159,-2.9428962351321952,-5.7083724553129915,-0.864840576475554,-5.688171750464033,-0.6794609380508865,-0.25107179209660657,-9.300470620756078,-7.933370024338129,-6.703030188822401,-5.837347734574559,-4.721860380358458,-6.537121570740904,-2.0836287235994333,-9.730792168213604,-8.34098948882623,-7.958271321716531,-5.058477623301947,-0.5242720123316924,-0.8573856174276928,-7.261203242616848,-1.019881256782389,-3.0341834158629655,-0.32800061548108994,-8.140960393292485,-1.6132844217205666,-0.8985935239908183,-4.069390814569527,-9.366686746721202,-0.47783866401856834,-7.865779023570088,-1.6480341655094777,-6.8165161653834305,-4.888393641877746,-6.17053082846013,-2.2436255481896605,-8.704463297809768,-1.9773439356452238,-6.260889892858488,-7.377547881601889,-7.227550026111212,-6.8300686143894,-0.15989524404976807,-9.016684151660963,-9.169711254761946,-1.2853677942750452,-6.941008310807428,-8.772458504295692,-2.908382807997121,-6.88923080985639,-8.627612128501784,-4.901262961853094,-3.5630736935904173,-4.354701391452112,-9.289417619122542,-9.425918293586646,-0.40712507481244664,-4.113721571833839,-5.438379034598924,-2.946572872539348,-9.383763782019667,-3.749205698549365,-3.5075344156990274,-2.9895993000225873,-8.779452244494486,-6.304073457141051,-5.336486204314188,-7.146911455468823,-9.514058323697167,-0.4183387341119671,-4.494764768737214,-2.2724142094699085,-5.375177230010566,-3.424059207674297,-1.8559894463673499,-5.718764024152534,-3.914922162447443,-9.799886551826908,-8.75408459620217,-4.379530744994797,-0.4063662608680074,-1.6024202552728717,-3.1990362939472683,-6.634409574560571,-8.006267662093254,-6.457665229367066,-9.505762308109114,-4.265788791432767,-1.1811222632531404,-5.468335646167728,-7.366003296599861,-3.088213058139797,-2.0774920774169336]}
},{}],127:[function(require,module,exports){
module.exports={"expected":[-1.1803712997821085,-1.03198910287364,-1.4741771670153072,-0.2720212494655037,-0.6571737200340781,-3.1211746278772377,-1.616625766149723,-1.6971387697866072,-0.7578715418480317,-0.3008851438811379,-1.1189501475619221,-0.5739017479365254,-0.4449083169168556,-0.650259823268606,-0.491538606898004,-0.7589829330085641,-0.9402355290080058,-3.0633655020631374,-0.3991272369695572,-0.6755354782726123,-0.9398412103080666,-1.0648706505446086,-1.1062194666262959,-0.840448516012289,-0.7617530145849063,-0.8676157373490267,-0.27325242807888195,-0.9673617079912822,-1.673059616068516,-0.6720976724394572,-4.305965841803273,-0.4727465778330454,-0.866174165361994,-0.5710403988340749,-0.8544132186867874,-1.0309095499920318,-0.5798871084840631,-0.721469475322994,-0.8749319557854889,-0.6023055249064683,-0.6127389481945786,-0.34078207039641933,-2.090573660169077,-0.947681708199798,-2.6259275218613607,-0.3334469249694393,-0.5025066168807429,-1.8024875606291784,-0.5210870533179486,-3.978078393947218,-0.5647188945878131,-0.6176369982044121,-0.3355996756570892,-0.7173104704268459,-0.9455637308187653,-1.5703191397204739,-0.9939227659414926,-0.8141830243449102,-0.3529009738012932,-0.47343194142172346,-0.5761535183812941,-0.6002582217273433,-7.473886227819259,-0.6140586348053922,-5.122300621892251,-0.6105943260991034,-0.4263226329577171,-0.3624238503260052,-8.038826200858814,-0.5885015983804097,-2.2735481576856835,-0.9396123441915253,-1.4244489717126643,-1.0205463938797794,-1.6292529168313155,-1.3322316493975563,-3.8028064241915924,-1.440777876256656,-0.5364567552821747,-1.006372403455333,-0.6588535739174137,-0.9981734815811152,-0.6852022429051496,-0.9214302297559791,-0.6551496234610478,-0.3636776195294947,-0.6057195695743078,-0.6006737782950442,-0.6942404347851817,-1.0324056967645197,-1.2380811978440809,-1.2618194276951393,-1.7739741340698911,-8.048142528257005,-0.270390318510571,-0.28159433308722404,-0.6239113125264203,-0.7610450007257765,-5.094562300388605,-3.9330293089941204,-0.8542708572699709,-1.6501225604367358,-1.2328121158236187,-0.6722743984231216,-0.4404563007575709,-0.8431496566316454,-1.44564678645995,-0.5300244663943379,-1.4594781869159517,-0.5905420558428395,-0.6026663030283258,-0.5504519337221698,-0.556895515362363,-1.3785548880289287,-0.7267717624141107,-1.2947472990461248,-0.7971015866008357,-0.3842852933674269,-0.5746304118952342,-0.7080183327924472,-3.144250647593446,-0.2577128075847139,-0.6140489759250032,-2.3013678956168278,-0.3126461947797159,-0.7602768126892439,-0.6117206175899597,-0.6948170247920918,-15.841137872022882,-0.35154179677205155,-0.7318502646753035,-0.6340722024633575,-5.900215748940184,-0.615547597093216,-0.2892802502184388,-0.5228866805123696,-1.1047509460076017,-0.4899957241384087,-0.6291650580647083,-0.553747622501061,-0.35232640647697305,-0.6599076900186319,-0.7270798400126625,-0.7575003158414495,-0.4718335740484152,-1.0492781929639179,-1.5370208072219287,-0.865080559708465,-0.5720563763561454,-1.4832458937690032,-0.5176271598894637,-0.5441821410291175,-5.502881098466787,-2.058516898229809,-0.5484477165351971,-0.6770466921776832,-0.7931022573461501,-0.5414559720837597,-0.7505913097858453,-1.1314578007283864,-1.591497207207105,-5.8099963228607265,-1.2545424965349738,-0.6557122356888758,-0.28990093791678945,-0.8486190864215291,-0.4109774962185282,-1.2785546700748365,-2.3180085710395724,-1.4501500126224023,-0.45741557334950717,-0.9320312062051004,-1.1565199837797058,-5.736872789836315,-0.526249288748299,-0.3179503366607978,-0.6507361881903274,-0.36121054691099813,-0.5830388723449089,-0.4232846814016366,-0.509232423726209,-0.5158384131333955,-0.3389655514964636,-0.6143331582087257,-0.32716430956797754,-0.4017254201540914,-2.7237139466943714,-0.6501189284720444,-1.780765060600428,-0.4442210555690579,-0.6808108581546807,-0.8834762514195686,-0.6343079739771036,-3.3082503270778902,-2.789399772205253,-0.36162418918533007,-0.3206361782386041,-0.5983229484363572,-0.5996905016757982,-0.9018781386745184,-0.8251529124211746,-0.33312488401388446,-0.743429281158537,-0.7525581447522084,-0.444564264242309,-0.6065577687862336,-1.0372378955865986,-1.4229784693576157,-1.1223002175583985,-0.28290478622724197,-1.035733576283802,-1.068893033316006,-1.2817291850669252,-2.1713659439837594,-0.6214970858136212,-12.474140296473141,-3.099848445344988,-0.6931375331772243,-0.7023442399244602,-0.994739611213179,-1.1512961474590189,-1.16024345850612,-0.7180786094679992,-0.34725216295241995,-0.5860338518314213,-0.8273782997430079,-1.4750889569740764,-0.5658130081993109,-0.4589949420383237,-1.37091273141239,-0.35007950223939244,-0.5245777345176721,-0.6147145057667681,-0.4903311719505189,-0.3640058263935881,-0.6475114365505579,-0.8353443744615486,-0.7776560529460347,-0.620782997131404,-0.847812078590632,-0.7061965621158609,-0.2822502378492536,-1.5169951198038982,-0.4761732752343647,-1.3237078876219437,-0.34940110529041646,-0.6137459640394942,-0.3622188368735803,-0.4273391767496538,-0.8977486372785866,-0.6619306695053484,-0.5543938405782378,-0.6592121871851232,-0.7160823233500854,-1.255959056019506,-1.9554805554112022,-0.8492916674140107,-5.646483949705229,-0.4167570575913368,-0.7053617773822454,-0.6581314461966125,-0.729448527494294,-0.5374064305834736,-0.9845694595281429,-0.9852145717274238,-0.8003880239075595,-0.5093767670432601,-0.47676509710472414,-1.5576044828873439,-1.1209059508548145,-1.0990107302484267,-0.5453688590971775,-1.5802576172348894,-0.5398505259163378,-0.5688119646409335,-0.48743490046335747,-0.5513443127687278,-1.0625425462617493,-1.738957343332173,-0.6812014474173861,-0.4084587458814277,-1.192014635837873,-0.5183974364892878,-0.9488888147899261,-0.8098726234803043,-0.5038739683769347,-0.32949702503716655,-1.0487418125304708,-7.59358675024327,-0.5188436301478301,-0.9531376379109848,-1.3656749695444965,-0.5148304151720373,-0.6661215193642849,-0.7841352121285421,-0.6044242076843391,-0.6858854502239377,-0.46564327644671155,-1.0465742733557957,-1.4221419106134,-0.9848240283183651,-0.8230609048122487,-0.41913166324381657,-0.6887883413681243,-0.36838003809516845,-1.8885593047375342,-0.8048783262309946,-1.816550296545909,-1.427992840552256,-1.6875059342717278,-1.9668836564830168,-1.1091584274112904,-2.1221319572439263,-0.5839886261279577,-0.8285069422742062,-0.6148908277129626,-3.849120792963956,-0.6106242870991293,-0.5558562337983621,-0.317528656192919,-0.4887018247463178,-0.7684345708994045,-0.44647489916920263,-0.44815377143316243,-0.898700428613229,-0.2788677906887208,-1.3022768414189343,-0.3962005880539405,-0.5835711212106275,-0.38622692105199863,-1.1784210966113626,-1.083725072008714,-2.1693614650490582,-0.4520345171883896,-0.2825145063920375,-1.1438151363215117,-0.4624061996661697,-0.31054964604414875,-0.615967383594411,-0.8150307986253473,-0.7819323412319061,-2.347008665050312,-0.4191932560109355,-0.6101882177024583,-0.7481729819897219,-0.6020117648117917,-0.33459316992382054,-0.36258738836558363,-1.0574946114763724,-2.268011157786645,-1.4171769529136182,-3.0644008764071637,-0.501248981456551,-0.3741799313071642,-0.478193234310484,-0.4092389039619056,-0.40223374395053946,-1.1859153060939165,-0.6596577366811058,-0.543470538485697,-0.6151583142593429,-1.1931518010614397,-0.5374535599541133,-0.43597184302356967,-0.39955592275278395,-0.6905163973383754,-0.6418975201155497,-1.4345119779543014,-0.5984221585831795,-0.46362792728793945,-3.2072797299807654,-1.6768429379201704,-0.9347566324032983,-0.4281457162672627,-0.4747214421370899,-0.6246920675758161,-0.568586741941417,-0.3776912638860517,-1.1378971520695287,-0.5442770395394375,-0.4086685001214989,-0.6218812761381045,-0.9562738118031793,-1.771350893578407,-0.8983130183399055,-0.7036996494163748,-10.012935847216665,-0.4621952618903674,-3.631466255214136,-0.4439371281359282,-1.963864547706677,-0.6637776549032193,-1.0852536364696452,-0.626736566843424,-0.5695865984302984,-0.5951560661407267,-0.507033927626951,-1.4414261673013338,-0.834598671166907,-0.7194464282978189,-0.4072080693424538,-0.5702877015409812,-0.38338070930254364,-0.2742641130692716,-1.350939133960203,-0.6031079700082815,-1.090214647010885,-0.5557583592514748,-0.6868024406611327,-0.70216714478044,-0.6735293444713977,-0.7118083495895133,-0.3952889006496741,-0.34579807341703045,-1.0627251012307704,-1.6679993364869004,-0.40310100083337835,-0.80078969873851,-1.496889573537032,-0.3930867576332816,-0.31383575037498945,-0.42593413786589907,-0.8620117366343775,-0.6843284008631082,-0.5829852171446109,-0.39566125682175735,-0.6802861670036547,-0.38761457241432185,-0.8523033202430015,-0.2400343157363138,-1.688063245541029,-0.7777262121238029,-2.2671562871003483,-0.7203655588253347,-1.2047067198532893,-2.2489818547830795,-0.952569916951608,-0.6447496457869045,-7.318795678949057,-0.41240514513446136,-1.1230318349540789,-6.06660846612105,-1.323976478434799,-3.0563106529448536,-0.4085485170555485,-0.8852466470722884,-0.5330112852221808,-0.32135038076448663,-0.3842594012356131,-0.687037710275549,-0.3301810925883147,-0.5668115998053855,-0.6791333413670637,-0.43793637292888676,-0.5427049075789604,-1.5950573681167173,-0.5270040772138638,-0.5667260734621098,-0.3636672172577396,-0.6332545258904035,-0.5423362617887987,-0.6622676565121528,-0.39128220478953113,-1.0506744783523612,-1.3726307792099774,-0.3372944701870384,-2.138629074581652,-0.5661282165439605,-0.49996405767972635,-0.4149160935432027,-1.1327434522085353,-0.38739486142238555,-1.1735994302063044,-0.8410610624023559,-1.760084511620788,-0.37624032864650225,-0.75321512224947,-0.7520572288304845,-0.9953426631657984,-0.8538240580944728,-0.7575745180137424,-0.5338985369917233,-0.6978105777730068,-0.6121985688420252,-0.5401410396597777,-0.6898352290322673,-0.4395864719846395,-0.6075034262474484,-0.3867954861878128,-0.5535392592995277,-0.41575995585894765,-1.222580779104693,-0.710258421290256,-0.6770238116001064,-0.6382725420872483,-4.942022411021522,-0.45331623261193216,-0.6201165306683535,-1.2561291053238566,-0.5063418879516092,-0.40621553771316166,-4.327308048297382,-0.8130362654490372,-0.30985761152041097,-0.9819166268218948,-0.7306730661002959,-1.5568112873666364,-1.8771648410404649,-0.581406786207293,-0.5718445153068364,-0.5220484103412483,-1.0910143960087735,-26.73816435077014,-0.8846083151846105,-0.5971474604531606,-0.8665012463418292,-0.32367782602368356,-1.4909756228734417,-0.9714178975221728,-1.0102103141210812,-0.9642333720511833,-0.6925617743676632,-1.3655549107292877,-0.7287376170809244,-1.2762120526726373,-0.719526775700106,-0.9388047000049414,-0.6145040030948735,-0.3789514450184019,-3.2979555171312236,-1.7164291944741714,-0.47817741279190595,-1.2629678544317398,-3.9194584240519927,-2.3078515568192937,-1.7299732192940018,-1.5826820402725545,-9.357921166212423,-0.8767259964681163,-0.2815372675260691,-1.2433763808393765,-1.231096433313634,-0.7556327565069312,-0.5175280710110393,-0.6457214019130718,-0.6034012235774011,-1.0669056022004728,-0.5058669949891803,-0.6502018707946954,-0.5547655097123789,-0.6941736274466339,-0.42377472237127944,-0.5461479918631897,-7.262826141147895,-0.4682374219944302,-0.7476314338895006,-0.6798909088133216,-0.5202199947694578,-0.8102970500571894,-0.6738343296998424,-2.15464771038798,-1.4672297666720993,-0.8065576654991549,-3.3608668725466324,-1.019989338083954,-3.472578976922712,-0.5378110114229928,-2.1339740850563653,-0.3586986517806346,-1.2762689739290691,-9.564222968758664,-0.7467188329024822,-0.8725109035285115,-0.38798331649563755,-0.7061117671542446,-0.584904760849873,-1.4559185835118307,-3.4618572988675442,-6.055780111838758,-0.642573611100019,-0.6357283554498552,-0.2953865546344742,-1.4872232271602497,-1.4890831365120296,-0.9915712561352992,-0.6947870091973141,-1.453386830266803,-1.5313568021338142,-0.6127990896878022,-0.5327132011932183,-0.9623917850588153,-1.3569233718657074,-0.9461686397114999,-1.0398271206674274,-0.7145274388811583,-0.7461321399142611,-0.36005614914170264,-0.6719839888855812,-0.6653412770065577,-0.4840554054231013,-0.568241846823027,-0.8458323906642984,-0.6523078805439423,-0.4622503474381765,-0.3729076730916225,-0.5978673831384229,-0.4846678235701064,-0.37908845615019265,-1.0152642187720702,-0.5890856786897465,-0.3743338673956559,-0.45605561612194867,-0.5182086929873111,-0.734698565302391,-0.5492991412225705,-0.9225373336224042,-0.6432142171867984,-0.47057178676958084,-0.3861066380891412,-0.5475484146862647,-0.28794396715539267,-0.6639238453204515,-0.5356603103437619,-0.8879468532090713,-0.7273117980601018,-0.6154486238229766,-2.9446794014645605,-1.1505710873943187,-0.8296883360764825,-0.5589206616988295,-0.5337925614874728,-2.402314186232041,-0.7630400884813576,-0.7689486746919345,-3.201920676971486,-0.9248464793569076,-0.6217172447308534,-0.5414098059882066,-1.5590466030379362,-0.8682668579555327,-0.4966554579888053,-0.5332102461406306,-0.6727712632544572,-0.6403595779611131,-0.5075667621560291,-0.7271659055023624,-0.4991476912932462,-1.4888408455033837,-3.2972960102739926,-0.8322750676473047,-0.6452950414081269,-0.5022787311321552,-0.7340664955077559,-0.4328349389099278,-0.6597724239887259,-1.10019966291958,-0.7292821623264911,-0.7877906892827183,-1.539589781843798,-10.047552071397291,-0.49128493031641524,-0.5205775877784458,-0.6563662847529861,-0.6409843345877346,-0.3285749206146484,-0.8393327933746677,-0.4900750100468587,-0.9164911662730468,-0.34330245168999485,-0.6585453862993804,-2.559382424670656,-0.7939892569986181,-0.7120478639735891,-9.057575378241685,-0.6543681589841465,-0.4665168788398648,-2.269413301513846,-1.9505876447128205,-0.5957887975732779,-0.6089484417306357,-0.7750890332470067,-0.35858639236886747,-0.817914055954378,-1.0747383148341845,-0.38540427903908436,-1.3515552736104408,-0.28066518736609564,-1.137792457866118,-0.8691677359868039,-1.1102851110294272,-0.4914359999197631,-0.3090105012341733,-0.6482853129789812,-1.8384708220399149,-0.623502237427549,-0.9395754242402418,-0.8379318011387055,-0.6903968242689567,-0.578181576104744,-1.353507638935185,-0.7269278276852136,-0.3755670117428645,-0.3199641541693862,-0.7786715796536687,-0.6438495171188577,-0.5738976794996227,-0.466518231770117,-9.882195710106748,-2.331472353354681,-0.8841570374713429,-0.6896421901329057,-1.0749967623704872,-0.5616813217176004,-0.3250914132359552,-0.6542337088429724,-0.7226532305414674,-0.6313915426565385,-0.8307845818402555,-1.2997764647746548,-0.7595863365536805,-3.463435018449154,-2.5851388891348406,-0.6749723814884189,-0.2753620372389733,-0.9032320304316371,-1.1901587245489291,-0.4034852128148095,-1.4654363275546358,-0.36125460984748586,-0.43761309323265163,-0.42941398895144456,-0.898293397163104,-0.9539179506555591,-5.3602072420330185,-0.7211211508015113,-0.41002220253492044,-0.4854626816912858,-0.6443507952584231,-1.3830948058179213,-0.7526431250047904,-0.6191035753880778,-0.42450674502726915,-0.4585049850463727,-0.4766454054920287,-0.7271795222818994,-1.138867361580314,-0.38485547523730645,-0.5441107175917619,-1.6437988547468398,-0.44946518551383896,-9.38764879817642,-0.6788068859725694,-0.4398862274049854,-0.4636238069101405,-1.558821920284185,-0.45244168441665833,-0.5541651863770198,-0.3868251885248497,-0.6668784794422697,-0.7233995247919822,-0.4432819345692736,-0.7249756032457811,-0.748218100913426,-0.9577344706097499,-0.3509937894730916,-0.7620738739248943,-0.7544538163076671,-1.7479712681479875,-0.6123581969498821,-0.7725504370604606,-0.586798983159422,-0.8218278136147384,-1.0056092633212748,-1.0799136871898753,-0.6747692012223546,-0.9951132340296726,-0.5793839271270614,-0.5072560684889721,-0.8705692696773821,-0.7402143604617902,-0.6113529172296079,-0.4188866514673524,-0.41686551257774496,-1.3943001653424487,-0.5937631103809593,-0.5558807274035382,-1.24920483064986,-0.4215332535829539,-0.650624346582684,-0.8791590032293526,-0.6214013630875106,-1.7193225629563762,-0.8248227471597794,-0.8405218604930653,-0.5793976639104033,-1.042503908881303,-2.436115779024422,-0.6158906344559247,-11.258866890781384,-0.7248117312852489,-0.9847756720541617,-0.7339943680217792,-0.5872792771808555,-0.7737885545635456,-2.308143572079759,-0.35725958090134763,-0.6693439363972982,-0.7702160836994917,-0.5744361560386321,-1.830246967315149,-29.799086339976036,-1.0314921482244805,-0.26025297333461667,-0.9522921284264532,-0.7972723691334916,-0.7270991808179748,-2.2187371938553415,-1.0245139120971496,-0.4597009456465301,-0.3257611618152402,-0.5969294878336695,-1.0141321156170564,-1.2760189953496939,-0.4602656199552199,-1.0445026314669805,-0.7278501463309119,-0.4776789882388615,-0.5435203814663424,-0.509546397172968,-0.6491696629920944,-0.6184461419916925,-3.7277312313238866,-0.8614194815224274,-1.4928554018397007,-3.860459785174404,-0.6079113220236785,-0.3293024667153567,-0.5075555233913281,-6.585956543644202,-2.063736139931081,-5.829913718555204,-0.5029645285387649,-0.6295908930156301,-1.211348744792479,-0.9715083469026388,-0.4092114287887169,-0.43325171891322556,-0.7435390739121968,-0.311360856156412,-0.5522452191953005,-0.24657803325131572,-0.6783080752875712,-1.1386261719482103,-15.639676593029858,-1.116556531274006,-0.5119318316196191,-0.9236019646338669,-0.5864090708998271,-0.5467425390665435,-1.3955185010234947,-3.922116131527948,-0.5134211173428007,-3.0593191540792555,-1.66432042659788,-0.46578276768036087,-0.7659442186536619,-0.40429616868223167,-0.6218829380120217,-2.762366417314568,-0.5365374830101751,-0.4578858035885647,-0.5642826558910601,-1.2399266108734779,-8.398226961217253,-0.5875029554425526,-0.3566982126299685,-1.9989048072965832,-0.49238611681025385,-1.0985351795486593,-0.6434622197663827,-1.0422040560107981,-2.313863445894039,-0.46231779587783706,-1.6335501560092325,-1.088854887703305,-1.269517398857718,-0.9874619123093273,-0.7838424406614756,-0.6794053979078934,-1.38585213963392,-0.34432990148427806,-0.24293089804617596,-0.8029856317191358,-0.4222624787069214,-0.5646652873872096,-0.5963806881579292,-0.6489166717621575,-0.32082170890294487,-1.6811121965015396,-0.2815768396574181,-0.2701265462146746,-0.7296106379967009,-1.3411337364302873,-0.6801593141911617,-0.6458691204508935,-0.5501982947759975,-1.1018628270600015,-0.49368906354925013,-1.0731811083086173,-0.7707994926434227,-0.4399116770634307,-0.2753243662499852,-0.7172114326226862,-0.5130185345424844,-1.8504960988891372,-0.7596780487312125,-1.6773896351203812,-0.2611520101392562,-0.7443736147194746,-0.3386034512650766,-0.9619391408480047,-0.7639600700896084,-0.8871285609070036,-0.6496572101484285,-1.1585894825482665,-0.5265090379401784,-0.8968337202479473,-1.3729110362487669,-1.901116374289045,-0.6345416651326791,-0.863575806116467,-0.9897605483944099,-0.39778930228639464,-0.49136422572194327,-0.8598068477868746,-1.227197329545316,-0.5213220028519359,-0.5854231336071548,-0.5928501722370624,-0.2919619723829461,-0.9803214818367334,-0.9657735694205429,-0.3541639038108936,-0.34525183939825443,-2.292363652199825,-2.7991949945923484,-0.32757159414304604,-4.824446745779443,-0.6239771134758734,-0.6383979331594697,-0.7915107453214095,-0.3645800606047299,-0.37430349750304254,-0.6660883753766477,-0.8181503158058808,-0.25977267302419077,-0.9059538762108009,-0.787229090077599,-0.6008456439435013,-0.6598976939116592,-0.6406553230171028,-1.4866163403701256,-1.3451203159670926,-1.2463135965509249,-0.6529292754685462,-0.29530896984987176,-1.981475123083516,-0.8426139620999544,-0.3598585713381567,-1.0554715881140355,-0.6236733495310981,-0.8792360406530701,-0.8923650322252907,-0.3411739710270089,-0.9750941419700784,-0.713673833578661,-0.8957942957031682,-0.5578487835999948,-0.6481970426113413,-0.8930833855939586,-0.6747705018774138,-2.288156872506991,-0.6373321365678731,-0.564720078497448,-0.43335239129195163,-6.174313947622057,-0.8199879186608702,-0.5672488548843936,-0.5188578086641731,-0.246570863009577,-0.3111874636421613,-0.747899264576026,-1.7504761847914916,-0.8929449778260544,-1.6354555846123382,-1.5681273263923206,-3.2829282043614803,-0.5030919375298077,-1.1428217944186099,-0.5810375966443905],"c":[2.679322350342277,3.1545060798325,2.071067853822024,1.22164788687407,5.883366781269304,1.8223343907035674,2.636471645130703,4.70557545061843,2.561594525686345,1.5005683266341054,4.880386621089857,4.822904575070343,2.51488125089815,5.129037031804276,3.5990711943969247,3.267925736174342,1.3386626542619975,1.4207472659065647,2.199621049258226,4.059769122075323,4.421387190741612,2.290074370515942,3.765947374470671,5.224802084468429,5.902403182978915,5.954814092593382,1.2151347976623896,3.0230868240250723,5.786549162083328,4.346763022582831,3.0992618838431243,2.4608030572553075,4.431240629149222,2.7902560405736647,2.191904004258044,3.091395884984805,4.025370232862726,2.4988143233541287,4.116278545553933,3.378274021397057,5.451733276021485,2.0632437329907916,5.065638755561848,3.314096220197015,2.6597759549081426,1.7670288660454738,2.596863002669272,2.080907210003843,3.104305546734855,2.1721623706637763,2.9785958672762693,5.4165370660510455,1.9511824575945116,1.3294009081232474,5.981034900008433,3.6936559580320107,4.95412815526454,3.2122084547736645,1.793957323804354,3.385722846072201,4.7335436931898265,3.5198647717342357,5.653265856798804,5.309106781436061,3.166205363450977,5.471480213680502,2.0160773284835467,1.3651139215849464,4.517381560027558,1.0446309361723551,3.2800975117561526,2.16439341684639,3.0266392744238573,2.9844284499981004,3.047411033086568,2.0744703430502534,5.303895325648581,4.457184416849325,2.833566334471758,3.634340719649667,2.4692752696725933,1.965422317422313,3.278633673540613,5.4445641309970565,5.706334202103056,2.095204534134666,3.4077236999609752,2.116914939411701,5.059181514011549,4.6282260557501615,4.777156241417876,3.862929320763794,4.549006711065737,1.5163223800782224,1.3376388980179212,1.308632559092702,2.9700889981446323,2.9861971579380064,5.776685732416129,3.4885130413126877,3.6527190252834343,5.640409653885024,3.047791408886556,5.27416654967136,2.8218535406627865,5.773928866939157,5.896730200924252,3.396072016909012,2.9604817798396845,1.510488106086835,4.278430277194314,3.901426557646547,4.579368163926487,5.820878977589247,3.9511354471347575,5.482963247060583,3.995346971961678,2.02894629720745,2.2756741034351804,4.540783101631545,5.516363559829176,1.0724561534549129,5.313518075686154,5.6032020910857785,1.6564592594945828,4.255265664854068,2.960314679819697,5.38866795558887,4.005831567657113,1.246362314175278,1.8026800211451623,3.911415460905232,5.613019262516943,2.683392605142333,1.5121019306024177,2.1265859393481703,3.6625475740021787,2.8282647160509335,3.473108643178903,2.3125757772826994,2.087831813894412,4.128139428640068,1.7763432989950336,5.249691897304562,3.121422471673937,5.15029172493934,4.959391536386288,5.822893557905237,1.2777094234676813,5.16205458722379,3.234966829053443,3.57090399462516,5.9087079314387125,3.164622966333499,2.7996994861182216,4.196662273220845,4.171293112952869,4.029466655755537,2.3184588095239946,5.627478168135369,2.6655138516774204,2.342191859951014,2.5522667559469716,5.716972952769451,1.1298968723516047,2.5817858591900693,1.5832416329888301,5.946820366548429,5.696864996100501,3.4937864702061177,1.848085745314353,4.390576868820539,5.926201690174143,4.752439328905077,3.8235747230612374,1.4288533579463372,5.441669667190348,1.8623827247077032,4.294923101671036,2.1309050931601705,3.814891646216596,3.6702196520880395,1.5667851731799278,3.3626045572459797,1.055923752197189,2.5102492540135906,5.335768284061144,3.0551931854744687,2.99474178753651,3.189024507030611,3.869717437089647,5.220236589452597,3.894809233763614,1.0686116003261728,1.7710015434000683,2.043498976192022,1.6148896817981964,3.7614357012189505,4.837611341524944,5.129010306139826,2.4989342655864357,1.357548401783807,3.092655036494725,2.1338288412921993,2.4134066677363255,4.318650114677575,4.178227507260788,3.025244665118006,5.479034917253769,1.0151456125925076,3.2133580998519586,5.024396559428914,4.834195975979261,5.34450809158572,1.9769769775560655,5.870442300461976,3.082331233180107,2.7981864508934153,3.0415467873650317,2.4025615839946646,1.8106192933852396,5.737655113872177,1.7818185767867203,1.283945062761367,4.5233874897178,5.090158803336963,5.807323757547795,4.713392506920204,2.7385968184231535,2.374203625637885,2.143887570970721,2.199710223498087,4.203977296071766,3.4414417945861047,1.165983857596973,5.595065456039677,4.017424170760843,5.555271123745662,1.4340325013351232,5.019984413969805,4.207350846414928,1.3145653988394137,5.826392875063639,2.6321675434630247,4.380873407106856,1.1028404168853592,5.249220079441459,1.5929902744091098,1.3144812492158344,1.8949398978923273,2.8906390935314796,4.052268483366154,3.234383378309539,5.265571892190052,1.1789462532717456,1.751035838570674,2.186241024854552,5.108274933226486,2.2264003643995816,3.5681914144735263,4.182404770906442,5.260000190907759,1.05737750276671,5.572723775286475,4.367686588055918,1.8774864261954762,2.725359126942807,1.5188562258330243,4.02654675491781,5.6822068685021465,5.433771754037147,3.6976886297792024,4.705163620493305,4.459137391001683,3.7061558114267346,1.5828420936633627,1.954902101599786,5.383730239165608,2.7876849089315447,2.868338097765505,2.7543287509544014,5.391142647723569,3.65055626144438,1.6844663514705773,3.32761943255953,3.3621596752952403,1.8389161437140946,4.819896708307605,4.0728619299668125,1.9677677139031926,5.226711478631174,4.8653051987906295,1.0981108382190343,4.919177060525243,3.974360770687461,5.268321924065451,3.903138322492247,3.489002841122383,5.5155062485107305,5.416198267205763,4.756951700012161,5.501639274273773,1.4573468090895638,3.9765387261565412,2.266928787002377,1.2063609956620127,4.231102327952318,3.8888377495086415,3.106203322973318,5.200701766795777,1.3215806807498478,3.196067810131246,4.984786054001994,4.112565967495684,5.5521121024084685,3.288399308281738,3.6484726255075053,2.6044695160456213,2.12570788211113,1.2712296083684262,3.6940547076659116,2.3592145030282996,2.4226033903746926,1.2008879569763489,5.982179789614917,1.2771532559431555,5.478825472117359,1.0681849151958525,3.7858994041211527,1.8550239994508302,5.784480656519574,2.5113755499593715,2.592328313913234,1.898245640715547,1.1475507802341036,2.950608636318637,2.197184925884226,1.4318326198448086,3.7481632622721532,5.48711019202555,3.6739494299858624,4.393903946625818,2.7933891659312384,2.5838794993086958,4.6220326423292395,3.470081299308352,1.7607904399930032,1.6300525370590015,1.9401662031293179,3.480314738900554,5.350923551174272,5.0019709083445765,2.937189688886698,1.6139888623302614,3.445232811985669,1.1861713179596836,2.438612958694466,4.016187706543084,4.476170327679789,3.9791108015808696,4.044585769135887,3.9336304879562936,3.5437770280241545,1.1320107377906943,2.4281287310963533,3.6460185358285115,4.298947156595476,4.912930755702979,4.898946029766042,2.2185549094092507,2.536921122603779,5.644721500358237,3.5819725163905796,2.9143504884904305,2.7360680912074287,5.6255654983805705,4.949375623506684,2.011201747031726,4.331470354005054,3.537521665711341,1.9284404281203107,1.7373567286413452,5.237483855385963,4.956510065499204,3.010651616695661,5.658900162437824,5.788998879981539,2.991296323631598,4.24902926046211,1.164535808848859,5.636538292214901,5.5327872262612985,3.7775534111234315,3.9409854465187735,3.7210311142583254,4.6364776710587545,1.4611346792377213,4.896518719038253,4.474517901673259,2.3084796639050342,1.9134914581528941,4.3952908164587505,1.34476087168828,1.105894796359568,5.109399610867134,3.2129264270190205,5.846563093805494,4.3748774592332165,5.704773615979142,5.5318501066042485,4.461369329740024,3.3316352092483914,2.19327731944999,1.9407134599220446,4.271965735987587,3.1231085062479336,1.1295880232218405,2.8806952003076196,4.561536268985563,2.348480419289965,1.6432392143128385,2.9318427962292475,4.284775767765181,2.978643822996169,2.607421498120453,2.2780347295628647,3.392418722263139,2.3444215894088596,4.2943727883106,1.0321892947353375,2.405184558970322,5.220107866307684,1.1672927106968247,1.570836571624721,1.7973679992738592,3.8791223345071804,5.675391505699068,2.754986784161283,5.299977364331811,2.4698865126727814,4.664031834039766,1.8712168123119335,4.701338781434646,4.341993334718035,1.1992614765205003,4.96944981883102,4.335534466686607,1.1288889363136947,1.485655547061482,4.8903289062816535,1.154763118233725,1.191888570719303,4.9887282205253225,2.9780525283458927,3.333760527439318,3.375046555909368,2.8757785388942763,4.522658907734374,2.171348701998085,1.433479245932481,4.551397533136846,2.682981811086224,1.51653774744713,4.649499513499982,4.6727013995794255,1.2937308919029646,3.049384940798534,1.8194235523171134,3.8370302351108667,2.183827866671592,3.7977782528756148,1.912922133644427,2.053092129023936,4.477397444793901,5.906514750673566,2.3916789098932334,1.0272839801069535,4.731272616493363,5.936178996366756,4.000614718490898,5.7928289953966825,3.415338984032881,2.8910903475020593,3.85406768448404,2.2479434556105007,5.1088333101650685,2.565119232222516,3.3718098261822917,2.20269220502907,4.563727457084466,1.7754465204268501,3.056972314586706,4.533305936993223,5.712224441511635,5.669556829923415,5.857165658379162,1.8306484241791245,1.1297592144135051,1.9349788016784721,2.4253082597897038,1.9705364512563586,5.519833796933746,4.189652347661568,1.5443421377661817,2.510023098140719,4.136852169376696,3.366525636966709,4.143055075962558,1.9850133205793488,1.88210966645621,2.022134345639235,5.51182996024044,5.304099259253082,5.628280247458434,1.8422459067882382,4.578575496290268,1.8888692714332647,4.21250258745696,5.07635739355571,5.282477479215156,4.149851727890578,3.5395105796867776,3.846593405693625,3.546182678536828,3.8783185742718462,4.889503310417596,4.652082148726773,5.0866023075026945,1.5512964804480713,5.866589597886225,3.3915633614008014,2.2571830261189874,5.291299638844968,4.540458712458138,3.8471067117180135,5.499718077600521,5.642553802465167,1.8753584687841198,4.811660036072252,1.3090472408636102,3.7165811882494806,5.529540829699885,5.593124825179158,1.4277716711187307,3.6808075208805295,3.1118607320895544,4.959339689755497,3.8681402343022846,1.939576668228419,3.545163760782186,4.897728065997463,2.689690213408064,1.096774016441551,5.457620215203485,2.6819205353108257,4.138201003179012,5.730366305920642,3.6277345822017226,4.011643891034739,5.318151186318867,5.426922922834188,5.511157944287461,2.255559167321183,4.381182555000402,5.130879572857168,3.444042108750378,3.008848335984216,5.2402622261208345,1.9325665055583932,2.4873170801110525,1.9765722093455131,5.66720068614356,2.8322360761948353,2.338865005195915,5.373098076695946,5.1554206846748,5.532312811284318,2.4951788525423204,3.2214784048793446,3.498091015998688,4.318476723640744,1.5962790342012192,5.370957656703146,3.4277602040215474,4.926621638926874,4.364116976270564,2.6993595070344103,4.229629478514003,5.578965483959876,3.475110043468364,3.088909920887173,5.356737665672023,1.9882222624042125,2.120882457404657,3.655248839094927,3.062946480717133,1.3329134884278906,4.447140673206855,1.7256754648987518,3.0843150970995286,2.0656887612808106,1.898511906622942,5.943895019013311,2.8357241077994346,2.3856524098940004,4.34600326937619,1.3573070315918347,1.6014346231549927,2.7487770592569687,2.868924526227347,2.2492179846858953,1.677232702681092,3.2298681566195135,4.830401123752947,2.1170638178618484,4.69210281653309,2.1669359106093733,1.275806955678809,1.3949944872379552,1.933425559233133,1.2622575222849088,5.495792415448835,4.178867483781424,1.1817655945963692,1.0898669092929671,2.9787992297165626,1.7311701779764834,5.5691160293915605,3.2037999670518813,4.015551299013558,4.250598519460608,4.486992631251135,5.557174482491215,3.255241172668816,3.973648188336581,5.49623945576051,5.021682029782484,4.292699236775864,5.330250945343995,5.954015105949638,3.5685139170372895,2.5033258309882913,5.795938886353852,3.7817346468680992,3.615737602915104,4.402830604296704,2.758627058743171,2.332470970419446,5.701233730027434,5.561442255863214,4.71524877289536,3.4279231985240535,4.6012837020279616,2.980367704575081,5.291355372848402,5.795629925558486,4.84666585967703,4.369827511345261,3.8842375789911934,4.925008781298888,3.2986767427189667,3.362724461865109,5.605624056260487,3.540233867735857,1.915437172121898,4.856276956815554,1.7836779191498044,3.418266837762882,1.0199552596028418,2.232714182244016,3.0544758536908003,4.66527854220525,3.519333818464643,5.153397904566817,5.073975990830197,3.367466049350285,3.473942069632833,5.52176462748427,1.8584678297412152,3.370999072530211,3.0466133751966007,1.4076359157009035,4.41259508648743,4.316613312923996,1.6579987437273827,5.587503230533201,1.2065804877687405,3.032812508001882,5.112694356991061,4.3652201921792,2.6705524414154063,1.5130819076922155,5.512783087026072,2.1948096314933245,4.367842340899322,3.411508935993968,5.855961691076839,3.8765321241294997,4.691452810622831,4.664438701325837,3.300383389253554,1.948043083833302,1.648297022565676,2.7214468944363723,5.19163646132343,4.333637394419031,3.4659605738629797,3.8927177729830023,5.750507526672213,3.8495192986660376,5.243966517610984,4.1472825155584285,3.3753737235919683,1.4883518739770287,4.236779275508565,5.729838752459392,5.621880523547276,5.254407830323638,2.243653719358344,5.202634711463563,5.662318445277721,2.926961039459653,5.996147404976216,1.384588243159989,2.239258162797592,5.525550308019104,1.4497894775169742,3.536863862199578,2.239710574694536,1.5756256942572036,1.5105160581048607,4.323587580580498,4.9441146556236575,3.7127358898968157,4.979744740904372,1.7778505992419404,3.020727684114303,4.551139536592932,5.704897994255836,4.542413814925184,3.78117049176855,1.7692747492340002,3.010921505676855,3.3810371195947355,5.640936434054968,2.292845434898795,2.281364983869376,4.109468059843721,4.155103410275716,2.887667809542676,2.626487333260531,3.9325013241285336,1.578175592853174,1.9055672140571969,4.455766720573271,3.0485272754560224,1.1469723232796405,2.3126532619228315,1.8164898849650015,3.779539570139086,2.984069569762564,5.164927435647608,5.5730261319387235,4.406103634715128,1.128734250895025,3.5264685139572607,1.1334868328117544,5.672864207537204,1.8560305842358462,5.786702984430491,2.7382095797916444,2.9218016064749865,5.344679352850776,2.058926815610479,1.780558983083387,4.011442073917213,4.406154519864066,1.3754867027746922,5.64484669088253,5.534021460087941,1.0999850103813293,2.4538346080594122,2.2666764003095157,1.361184760185761,4.914506822957845,4.265039379628796,3.082696680137237,1.5555555710526294,3.4777311882457056,3.2579225089261703,4.590337742852196,4.763460386708754,3.3346566549696623,4.500576105876397,4.669667617030777,4.396546590066883,4.187267097309595,5.611604649246067,5.607285389833486,3.943405065346095,1.9502178111423698,1.9240530320887141,4.2266982160717905,5.676535713451516,4.281396923650518,1.7453536252744353,4.923800801317164,4.140960238328945,4.125271208053237,1.6709438383705058,5.996161930127927,4.804016402148129,1.1590956800338628,1.268300730662434,1.722588188085651,5.360108892739531,5.2351953771721575,5.936235573800475,1.2946271385032695,1.555360983711597,3.079227274846364,4.673288208788582,4.755783588444805,3.1944772602524143,2.337267267251405,3.5776742201272604,1.5577604885361631,4.214127176844007,3.814142164328363,5.667112563020982,1.7438183538206544,5.706652554700871,5.995303855740407,2.695060724985721,4.813875141094323,4.809688974802552,1.6145028455315038,1.5360934122149341,3.562856407398586,4.137658134046399,4.9628229248372895,3.9696929571234323,2.827359585266106,3.4190820379632627,2.2665738994663203,1.546739045878596,1.690471006528156,4.233297213111399,1.5588804537898062,4.109302809856941,1.1327071841548022,3.7514416000729645,5.822406763283943,3.989109199826119,3.2666299477747796,2.5710317555681663,5.218010454529671,1.023350162143898,2.281961490422691,5.475304833467497,5.495524682201147,2.9999585117476446,5.818849365352417,2.1383543103307723,3.1952671635363687,3.446604762305691,1.3698716828218374,4.068439088890641,4.540504926769506,2.2750997684793717,2.9666070423153292,2.5117111404707484,5.150376194594764,3.8254655949828966,3.5075173041880583,1.1378489465149424,4.824028475554359,1.8677035855131054,1.7549328865933347,5.762178354620036,3.47765112599435,1.3563158352334184,3.1302114592302868,5.686844779580731,5.857245608940932,4.362112999434855,5.936987545792304,4.125962029215371,4.013025123161837,3.8115959212589847,1.6994879050208935,1.1095540795697236,5.65241296164384,1.524544741288776,4.218607364478667,4.496657502747965,5.646657376504519,1.0333834505398767,5.594177685169024,1.1688103739516,1.2712552784560096,5.62591337589657,1.9584887356755478,4.460662499339949,4.105052480717592,2.681793959739566,1.0042859767018755,1.176420849935438,5.247436209294434,5.188306949888785,2.1256978797253447,1.1978761157952957,5.0762082009153175,3.8247550746084693,3.2347552498287673,4.109039660666203,5.834666347584328,1.1272446048970965,5.906266041262503,1.5220733938736666,3.6565434681228717,5.2905916181109145,5.474972105686152,5.645215193583718,5.326175933208845,1.6831828514899474,4.6480065426452954,5.56170778331079,5.961644135565605,2.4403160363362213,5.1174773014719594,2.8608563716764692,1.8686261443827836,2.9028422179695106,5.110858141655697,3.1102533974169155,3.0448942325155905,4.88308974404565,3.9066413757292753,1.170312868803788,4.5420455328840035,4.60917973569697,1.1880981690958572,1.0043531667978713,4.183585197723011,4.288820929193349,1.5258848704079422,5.347198451262199,4.760422984808876,5.216029931371135,3.896718823253841,1.3978720790253376,2.096013466541926,1.6569943467155304,5.557240618690543,1.0389371736148725,5.395644588741686,3.591731975721271,2.403639534452492,4.960380402467491,5.65931134707262,4.453377895715985,4.635682014983681,5.180490084251493,3.187208009828183,1.105246298905144,3.433931844958519,3.458369837282197,1.558443004029674,5.284605102961432,5.483113787494445,5.5280412530868075,4.679528246040978,2.0167913415012677,1.843541957343551,4.5269839031417005,1.1164717937925608,4.239791445266313,5.1631837829283995,5.951478272662771,4.988173161300511,5.629806601224196,5.434832903012378,3.1987143250589156,2.0959674355215987,2.065749659918752,2.9106080918179513,3.9189731488336843,1.3119962590791248,1.095526993990609,1.3406608608891326,5.908218509997518,4.60807908498211,2.90395689781098,2.562917832902284,2.4180719210468484,4.812445660941855,2.3247044248436035,5.974549256242763,4.421713401540323],"x":[3.7193510749352034,13.556964011211022,6.9303267659544945,14.933714183584039,24.0182919789572,10.259853438853332,6.02463886650557,9.943994451970374,12.012721393737992,14.831165588401738,11.55750440048489,19.178181302060914,19.223454092350384,17.8240627286443,19.92602664357139,11.98325744573266,2.214827719516832,0.9889714961143025,13.259492488535644,11.773680826078493,6.087324599388612,3.472003713368743,9.52180779573085,16.18916945804058,13.207285195064427,16.882340947254736,18.97789191084358,6.756436930006588,4.645441089416244,19.372149113654082,7.822752312823775,19.377711121256546,10.542001364640644,15.097161914029957,4.0113656257548795,9.071422945512206,11.87699847360089,6.122349529642216,14.005021970675587,9.802481951790226,24.439019238101213,21.524538780209888,8.543847530677686,5.6155987191640335,1.853765281950085,15.469071255745542,16.06884391789141,2.1821256671215274,13.081753876807515,10.368843744393127,18.888911028825785,16.865160196117976,24.425175795418568,8.269736980231576,9.855046001455422,3.4730216193748564,6.581255343223054,11.52514362277656,14.907107968831394,15.020992885231665,18.141041082891977,15.233020510927265,9.449689303798966,17.717206640805145,6.976980504434916,22.267243340650875,12.501061794596833,18.277585529029636,7.656440156285492,7.266408597007829,6.6623330793663165,7.602282043469159,6.517263183637359,7.220729728290962,1.9545574701521484,10.695450774019188,7.1562534980747206,4.773098693530026,14.92155028116082,7.206802076673021,10.14176074321574,3.271946917450659,12.232467925250473,14.992155989795501,21.660038301187022,20.589007329313567,15.666798330212332,7.536622879693817,11.572837353248557,14.604573535804397,7.071975022391467,9.938392699602426,9.331016076175352,4.954217508796573,24.18881246534538,21.50976391402348,14.107276414677184,13.94142668911901,7.7231053720543015,2.6883704162439526,12.303943162753235,6.174471116097682,7.4899420659718885,18.725508396217055,21.821128909646877,10.020697059031946,8.589638550818243,11.62251779865288,5.738283966336427,5.7420824539928805,12.917757364154872,14.668364068275965,18.818884156648128,13.636888021279061,10.328914016790995,14.526201048769485,7.5185193563258785,12.286670505961773,9.081586363263112,12.146383698386066,9.925793206036746,17.209149485821627,14.5228154218327,7.177070041668621,19.853447648070407,10.126820218395773,8.132064696984258,13.934339968919362,7.970584541072029,18.487517806874358,7.248791642515545,10.115487734038133,5.619832395830706,12.685657133059687,20.654110090464066,9.23980648316447,4.139620822327954,15.380364967201222,14.471727469552524,9.419628900045138,16.21767690085568,14.379551107555638,6.259804841169424,19.61848302107778,15.957366782595866,15.296584855794697,11.242082479122608,15.171136767887415,5.958307054712489,9.374943227541104,16.362605356458054,19.35849144663945,8.650220688976624,4.715465330051993,15.785814582863324,17.797496379697133,13.637771118780366,17.932490394589443,12.778601936124806,6.5520611811824505,5.259949706649062,6.750307698515149,10.247840062596746,20.119968131599858,15.406965374185967,6.561503173903111,10.582074922188681,5.388415260573938,11.132657444632196,7.236363883214977,8.234241039047928,8.003578386458367,6.847160880606895,10.403620654402578,19.158706092828734,17.486391389088034,17.858618258212598,16.44147120742127,13.80967809352043,20.204087135538103,21.25979144089664,15.923202841550983,13.428379069058616,17.29586867657809,8.369525959643875,18.258888652915452,6.66559787698291,7.509557048739747,11.51791138009335,23.116656278394295,15.969855692005206,15.855531469643157,11.330435952364835,9.473329983231343,1.9238938948190853,17.82202590128563,16.626630154851526,20.153129867700535,19.932954749102414,15.172287790396405,4.440688760559226,18.17525096815973,13.475542084791586,13.035410088401486,14.649538223442883,21.17940057966699,14.396269719697502,10.953019012300864,5.672192673922755,19.174236819717848,9.824023877238035,13.75855569502737,13.972810115688867,8.539849262923182,11.596497083082992,2.506140827684682,7.5862151391106645,10.55053156601939,9.03268262978607,10.802227585820424,8.777856052915364,13.769356236975582,12.839036112052822,11.524191907072813,21.33961277809769,13.715210893343384,12.965510431734916,18.205986339882173,17.64330077519758,2.2330768852172436,16.01300051151415,16.49044450231066,19.43376861347016,20.638623575954036,15.363633957130618,15.394217587770287,11.533387045022241,16.737188058080733,4.670794279853643,16.95455490478701,13.750717411217515,23.141414152955733,5.3591606974887736,17.531688636281206,8.697624031246432,12.859378002997286,19.498555230337274,11.953821676291488,11.177534716947244,5.911364675493891,13.111961712922794,17.909271695946487,16.849827698385745,14.129599670705991,10.294295244147156,2.9453056567445315,8.637882278720864,5.570469605185414,14.322162716041658,11.588803882826209,13.407531017058849,16.61206754797837,12.505439484923029,9.6841212548901,10.87851309774001,9.895231696404489,18.943196018915483,15.48140461380155,7.511865442318938,14.202375541576727,12.555951723892118,13.921564857246391,8.594547943591197,21.80693142951553,19.540550405235177,11.451273044945582,11.755712532575526,13.00238658651802,10.88736998429221,9.15986668391733,22.912781963315012,14.467326020864887,18.211484692386883,7.774316023126548,13.993502205937286,17.650538223638204,19.34191200431375,11.466276131595828,2.431295296501997,11.405107245828113,15.152877434804873,5.448898788184937,9.266695472409642,11.56613902687976,11.232381077806826,21.32443504796197,16.319825990395007,24.222018564596627,8.212547924424937,4.239566304979094,13.001475790944111,11.638782636331959,10.070834900208512,18.606152377596587,15.515545347714399,7.968972309890697,8.88108130820565,3.8641696280511617,7.562199727470382,11.300501385723932,7.923430906010919,7.884627483957397,8.26273079810668,12.057512571763171,17.517841296919045,16.363925679189222,5.828243940337777,11.7851831925946,10.033225047806981,11.639737298122485,19.11148119645978,8.01960614713086,17.437104195831928,8.559865163819172,14.270412098188864,21.41548553170461,11.952047184184343,8.391154538767319,17.00470235031768,16.98891750272949,9.551712824327492,7.1095894667595605,9.044235407635462,13.532162690420195,13.910942388909133,12.830375810663124,18.215975006837233,20.47009743140501,15.457395402146355,16.30688710897919,8.243501610643458,3.7736728805958997,22.888099712897507,13.037309853239957,12.42415722110327,12.906823261804934,14.471346628817756,14.255892268540657,10.911028114723635,9.655996713627498,12.755048124138064,7.602074191732398,13.171932203105488,18.377643845796797,16.804488848012266,9.052298973024612,15.185894616911794,4.721174098885372,13.944580295787224,14.364777090501265,17.171263256071363,10.061737013964052,19.46872204469695,14.020545032297061,16.233239242640533,10.74164126055211,14.82330886779289,3.788634904950939,15.459732036954819,10.999262133408646,8.228455647640356,11.080493016720524,12.964689316208313,20.974172152129903,15.606785928154848,23.65418555675432,20.57703635201017,14.326454631193544,7.830723617447329,18.726762471016073,12.366183020193565,12.729423209208628,8.248339093857748,7.1137466608316045,10.847240782870701,17.907635161454223,8.234954022397353,18.15238370016659,4.6944370082589835,10.061826321802846,10.09919941491481,14.273596375079775,6.240643787827048,17.760403186152146,16.488512928980633,21.961323459734192,9.711843572359259,12.796360154130296,7.8701497356073435,9.617827291604138,15.889124859338414,19.8919785193938,15.500206174583019,20.58862342290248,11.216504588922964,9.35853209234276,8.438185525142503,16.109749847089578,15.06973588284651,17.476327926479712,12.186041633878046,16.37347444557664,16.785974007044445,17.108029988468097,10.418658668051892,7.477036475297794,15.82750494815084,13.690799897307762,11.782102610887964,17.538727920320042,21.212733389715886,23.366890531418505,15.102017723952413,14.863745722076356,7.695173277421798,16.757452811661658,11.499335963774216,21.375469988031423,10.365646553174049,14.086579596671912,9.800506463861563,17.493868737800717,2.192045429562579,3.570557828419981,4.887959386677597,9.255719032452843,12.893953969499535,14.902396179953437,9.926891180166715,14.542670634849078,6.348690047485302,0.8811700126751941,6.425376683134683,4.353333016023047,10.448588212747334,13.134433666075742,19.51276250163756,18.72179367468923,9.20534470230106,16.476501066877304,11.18587922022346,11.773272565115022,19.57946338230299,23.62040067436191,13.783232268432796,2.7769770530165894,11.075045146486813,20.22639211043731,23.730050075711006,11.844406158781947,20.39408892432043,9.241669259927782,14.325743390779824,14.659947778927734,12.68357589394755,10.402089988444168,5.6977383726271436,12.622918633680742,19.118822385370603,21.28137041976711,7.588824414968666,15.918831885716758,8.900210341690869,8.937082069592991,7.815379339822835,17.83200490933681,8.874171308139143,18.018324803588072,14.56845566386127,6.874364266331034,15.2012337883224,18.41801206133704,8.320523463589664,14.273987864293494,13.569174032785773,15.71563997374277,19.211724953549265,16.047168396251966,12.98000196620667,23.846191830639405,12.227162530959175,5.4287162734488295,12.14441100137645,21.15808277447281,16.28244737968278,9.46597486421657,16.09535136348284,8.776748721517697,9.387449680836141,10.080087178734168,17.93838759413294,3.981781976208166,14.426214597757863,20.887895801881072,6.3000958958267805,16.437573313292596,3.4907578518654003,6.48884878591456,7.9304542249665095,7.32653282080336,11.849291751435002,9.042583068247524,6.320349127078906,11.290439216883822,6.217827410617255,12.824094987633956,21.530678454023402,12.675608954801556,8.202188130474273,7.904737231153732,8.572314334151555,13.266899603667186,9.667161466034175,8.463486341360804,11.973692442544257,20.042438592920973,9.413191609336002,15.3359392670376,18.713823148166767,2.173768050250523,2.407091108956189,15.08184663358758,7.91145369829154,3.5381116325523343,6.595197191908932,5.7027526005696965,4.334591543506846,7.972993499804348,16.624502640078152,17.440767604598104,3.328842897693721,8.292080201326558,16.77643900722747,11.277969094062058,11.36212712270798,12.63441627300946,6.271260969806459,23.53935609368336,6.409567955278577,16.016527268183246,12.083123333348263,19.79415918952247,4.1822773745815915,2.7587849918629206,13.29463090535624,16.560254110369016,18.419132168775846,14.57923602740519,15.669719101165194,16.42740716504735,3.5474448690406346,6.917473749747366,11.4631010212549,9.606151411499495,8.849377911316287,9.915557729758657,13.832019094666244,4.497513431140838,20.24237349859344,10.551481856704099,4.109492415912351,13.40895428380838,8.009033780751516,15.746133697540643,15.714878488066228,20.049676637701644,6.409726483416185,2.2359697251309076,10.252811837943623,18.544705861174172,13.961134471611608,24.688064870409846,10.720432576550419,4.3179339266045,14.770206442813693,13.83762515819118,4.052181372176982,6.520829318278357,17.982865724767297,21.067259301968985,10.138936360189986,5.884808772867538,8.935638009059915,8.628457331012731,15.739006064563752,12.133992932138133,10.7698602086933,16.738409266526816,13.550656065946336,21.846488581660253,12.097532731265437,6.619215167112103,21.126348568637113,21.68912002427475,20.805357131991887,18.9298566911203,13.389234047381082,11.207837488874844,8.971207689352827,13.83047575179487,19.15166838975309,11.088226816576128,16.069139962569047,14.341211200480085,14.292802359020323,8.473580926286944,15.134334017461025,5.801064662429717,14.207225846470095,11.06037602462793,17.918360712382935,17.608277064433814,22.57643888604712,8.733797904797385,4.270766508834651,16.494044315787875,0.8174519284536551,14.022002239988934,5.533471343791692,15.910920416406082,19.1780859387028,2.0697374424396595,13.26652403269764,6.370062988581331,5.690874576769247,15.173734888517247,14.409625050486637,16.496682552172334,10.9461531150403,17.62122680540555,22.83614742088698,8.62918075078457,18.987457138903537,16.127317822410635,17.564716589096882,12.723396140249914,14.17810701440301,2.3807718320409967,9.75459431527703,16.6955839690081,21.43145312158795,19.26485267547035,17.354569878235495,18.943688046624285,22.276230105004387,15.264995965855512,16.403580515495968,9.812156330947435,4.860747231154002,5.203288407317595,17.04138063916731,18.309653260307513,13.474184622917303,12.812345802242936,18.98046019193661,10.99962481306643,8.230417664585287,11.951770214022567,8.386046399911157,7.0286552089165495,7.759383758890041,16.489760873210713,11.727233509945926,1.6552544217093546,18.779756944938136,20.181946323388523,6.614393367009267,4.880562228656348,7.762364713405784,13.994959291928494,10.192106478188979,10.368085370866524,11.230468633672732,8.870098527316078,16.446436782992503,13.124057132509822,12.63556899254749,7.461028325673503,9.316495840065615,10.915564932334751,10.623771001499634,13.471235724628732,22.17468083783797,8.130680025139858,13.91464363093156,11.060870267517716,12.858760432441093,9.539023661996522,21.533853217877997,9.87632226708977,8.828607283834545,15.45378135141718,20.870772445403837,9.061550984575787,15.397634118741435,16.69054229525684,16.015436936589772,1.4270117809719451,10.059196471482126,6.555593620700144,19.072855062610124,7.716680814447748,16.576242662050163,12.512217509425428,18.011413610975435,19.730997322564267,21.74925339061429,13.27142210186838,4.891754927647096,12.096841623224707,7.347479238590829,5.111831313395241,17.474871463385032,15.03634631304308,3.295674550178659,10.354920858053672,16.54396008089531,12.353644260992136,18.090267719934182,14.451715526454928,7.521967635765092,13.197180495611855,15.28166359481222,4.155684923471597,18.583691881403638,14.086638499659228,21.945206384586957,20.8554457800466,10.922480295545796,9.910554950899352,11.047101874835226,9.135581217703736,20.6245988378961,18.815209241743972,17.56340715749525,6.915062047664566,22.503653912686786,21.54650095715771,2.928534410711112,14.713409464662982,1.3711849346410965,11.589447053395336,11.089608512477099,15.81355228498711,7.0370243024408845,21.009310240689242,4.802013315186364,19.12742217526433,12.179912356510135,13.78525084473391,22.748769331742626,18.113752228954713,19.65867145536101,12.325061340083023,17.204484392350103,15.81872510811303,8.955237317511775,4.242027858698629,11.559546480376294,16.789512970744497,8.761782366226198,12.470319373543536,12.457275949497308,2.3430866625750357,10.268511914355873,11.27164622304168,15.196961330624726,13.638496894024053,15.689636111464186,17.4340118814043,12.328167559255544,17.182337724335984,18.46444559651354,6.630092513169421,20.81268200376306,21.395430179237966,9.743955920193812,14.083903561728532,16.982356331780316,9.689302030783114,14.508374454639313,7.294398495788282,7.9050930537934505,12.854431509256626,21.051075882895297,12.256967688678818,8.659839859091266,21.39758349646756,6.301479380791701,12.576775512669466,5.17240649911594,8.399464393942724,20.113358395506662,17.21804823226764,4.903279560413502,19.000708826547978,19.871997840347653,12.121007312671958,14.811556723931202,5.295443968037483,3.7880211607910454,11.179945148149649,21.513484201648815,10.99821831579006,7.736094924460072,12.835636784075525,5.458696226288673,11.84333085272221,10.376127039123135,13.49099458075529,11.868944113442936,11.865983450903396,4.629608597753586,23.246271359685622,6.855455435910203,9.934749016349809,11.730964998584216,17.665622940908797,17.39030111899324,14.883461041580775,7.988484846264356,7.367144648533064,10.155420791999438,9.68587206854459,1.1691542806242605,15.927866111755998,18.9863352678108,5.7697505771290345,9.501381660944757,8.973378981575001,6.132285309716169,20.719148083453305,8.290674722345866,12.396828533070861,6.562087596014749,8.666271108723835,12.392146678418797,10.1272012492884,18.72073134246166,16.374504988566482,17.681885262045405,15.919804117198181,9.429569123995345,6.499917428251331,12.804737982553073,16.754082495793853,8.800871923549385,8.435778273582752,8.522173682987654,8.272086145348469,8.23343413990121,12.519310376414918,6.589750783600145,6.708455577120597,15.434400363452879,10.227354949203379,8.008389453309123,18.173234362597526,2.708096454482242,16.970200054866954,22.4594259196139,15.160313406644455,8.04267677179119,7.136249932696268,10.463716052303376,13.824761694179946,10.62191988201335,12.752155228804945,11.734046121929529,19.079987716877188,8.96755104067981,1.8879662884364579,22.471418747326943,11.164927561023703,11.652387335374577,10.987274711459806,10.364061958817276,11.696626775943553,14.179379404692751,12.85631829486153,13.74083317787998,21.080425328897643,19.17265985050036,17.534597162231165,13.402717964986879,15.618352604747102,19.38400360273141,14.500090800869213,5.459829606526853,14.219171810320875,16.189972422387708,13.8533141784922,7.50083508715731,13.564639605354353,15.343473765386358,11.351043991686458,2.740563369441696,6.075189704299918,9.703979263230341,17.924707718778624,15.909983090179535,13.064518923669562,18.07469492329153,14.57228599410967,3.062907257523535,14.677001273148734,7.442662784131819,19.045194214325484,21.199397981280967,16.35938349775897,11.509680348926704,12.012085378167267,10.6101496170247,23.56510873257674,7.988640787393168,9.083565507273011,10.601937458258064,4.408618564115754,5.169132190093418,10.058720334347537,10.188913724581544,4.498878016440358,17.698257799991637,16.571398862346726,13.45657269970085,4.88858902524095,12.848963571680232,16.483907081365647,17.769000298492813,16.498352802698793,15.583905547773714,14.820804708193803,17.07051234333153,8.121527574541945,7.67539577557157,10.678372295119102,17.312937372145782,8.189755127350717,19.638012843110317,22.779303482448494,7.74204037409986,16.77531353441195,19.36680949580007,10.882355756270963,9.805731083642199,17.913494338954123,15.07704276564162,6.762957132287983,11.531066055686201,16.45129384627875,19.792248561928243,5.1618536992787725,3.9858494804852485,10.134542933715299,13.273808326574043,18.292746923568576,10.762980080279286,7.622584467318308,12.957006897564016,15.276073770754179,23.54608363258975,10.779195305059051,9.003435735716343,17.062716180724962,4.451021611062703,17.185314185013993,3.368112104474575,19.98152083044463,18.683948614937602,11.122261704869764,12.295301784617221,2.2198295213603667,15.589214166839973,16.83803199921959,18.247565354675856,3.154680589723493,11.327293897092927,19.1220747464168,11.072603972702614,20.07590961136141,19.68255206609377,20.907875462069317,8.062722979778782,13.906019060464816,6.649977221696398,11.5126005470358,11.089966994129226,11.024601183437714,11.047552098971893,15.866654356483483],"mu":[1.150066037856019,9.849710560785374,5.4993065197552475,1.6332743661792426,9.917835748223816,9.810174673722223,4.4295600990229484,7.287601910278587,7.134671785444091,1.1876042275241327,6.485616105940979,4.737605759440582,7.665519472914695,5.31778349253498,5.961481450816002,5.7746895612596045,0.3991330080384836,0.6297504234985474,1.0762606673578223,2.4699977610466273,0.0864774105145294,0.9063948762042706,5.539776584550138,7.744870189299046,2.058649319393804,7.72743467738011,5.855119562391186,2.8325343442239226,1.3117897731335937,9.327937108578283,7.315007062545944,9.178474660475455,3.7116456632389694,6.673167088837895,0.5594644399704096,5.432518978496896,0.029686115657070467,0.9731954948037025,7.759384075852389,0.46323069340563183,9.787551353085302,6.471783088296323,6.407253616054966,1.1751127013645135,1.0298899990597676,2.0743355334003666,6.361026664292235,1.1032726917568914,2.163934860360268,9.975858399758534,9.728657860028026,2.497409569798741,9.801118524244878,5.504722171257499,1.8133773641728035,1.143286511355186,0.4136899127778615,6.066813063958003,2.5972257588110437,1.0227041419531568,4.059676252685636,5.447608438093161,8.973783329727373,3.499395512454866,6.558262457535382,7.477716023925918,2.5331343789020178,9.336571379808813,7.307172956792605,4.26594548649188,5.428887466869396,4.663589460052531,4.319004396106263,3.652998731721735,0.13124911459263533,9.033542840430462,6.140492012795066,1.5891244425951467,5.42924915536971,2.767973229574805,4.248283996771449,0.8411207444483582,4.889966876890288,7.372196997752201,7.914983036348751,6.948662497636837,6.333393378208367,1.6581929373171267,0.4805029496358948,9.16872340235601,2.806275473074289,6.5850504419504325,6.918988413612757,4.837138953838613,9.4674863204073,8.118485258837563,6.358465465631342,8.292628342773778,6.954079074022377,2.048109282446533,6.549983837648387,2.8604857123854455,4.751119275937121,6.5435148818377575,8.627541709723737,0.7359250527442107,4.397952519987404,0.014029213026141019,3.662750816528606,1.4282801333112727,1.1016794411138742,2.148455213739775,4.4053597775784015,9.201935230215435,2.2823228274826324,9.944754630938665,0.49754461719883514,0.28624251758256447,2.282151497797673,2.501556326359453,8.577545703829122,4.341172023853206,0.29282309873626344,5.1045751167133835,5.783569035923703,2.064415870765215,0.15447595055410934,2.1354463975875393,7.826686469573323,9.877152899624317,3.6184116022285173,0.1772592664892425,4.994339468894868,5.528051267111294,5.907680394474704,1.803727654999403,0.2591275158464068,4.34815471058905,5.53421778158169,2.0718358295485406,1.8503262522178976,4.55242955587898,2.6446973914799754,9.613656244893056,2.9775731878908274,9.395477435672666,8.016033967136998,6.177874608601693,2.1121571922148474,5.839747842064997,4.85738215135342,7.678325299999138,7.934020863383613,3.3519542540578473,6.7466445390214265,8.214898924078884,6.248861743622007,4.6414833929827,8.29490224483838,0.801093780872435,3.61071631396912,6.484422226754734,8.013151414420657,6.368529204258861,4.429971888497493,2.451879736250604,2.244731165832672,0.3259604794484505,9.046015186421087,4.764014687571281,0.13305990493898578,1.9669316246851598,0.9874817239314782,9.855832247981207,5.931569700317894,5.705978318325407,4.605872633949093,4.171860548061524,1.2818743657876097,9.538245960212171,7.314201351705625,2.793922047873285,1.8897244803355817,8.297408918939446,0.0922968097079413,4.510202952209818,5.091186062394533,0.05735824698627878,9.938536452591023,8.421722009707464,7.212876783784427,8.054389647320644,1.4404182481439487,9.228788279087327,1.41754523345071,4.3860900446476725,3.509016872925663,9.640337922426063,6.463151035193862,7.75025558006865,0.28325020063003414,7.867001737622507,7.402117969578786,8.926004385217334,3.543293558290963,9.377948537794348,9.523841643068643,8.752462404155022,0.003821773066328138,8.872134896738526,6.068455867950204,8.161838808191508,9.872605699156283,6.399970159891519,6.405766757279592,2.2311910988270633,6.81880576667206,4.399673372317922,2.487894477855954,7.814970583886344,6.975329100083803,8.123454259382259,9.139418061651156,2.461218041793678,8.256697694389718,5.2827176413423205,8.956491562681988,3.7571163078302305,5.708762638375315,0.40936508786953985,1.093598990766833,8.840180817834005,8.19522540308483,7.230104134690023,7.784710444792545,1.657026744826342,4.97783514099906,6.584210011042025,0.8985057399154828,8.951901549429206,4.776908575364862,9.745296164493777,1.4967526831885558,6.75499828457297,5.154661731192254,5.1585279441524285,5.42935305975438,1.5099817314905728,4.7049627431208085,3.149559217247997,6.264923388743604,5.058887616315766,9.137084485611354,3.1475093977973123,9.263773989921615,2.1352443111743358,5.1622100870536825,4.970278402566375,2.8765471187715974,3.9637167362342463,3.4074506759389545,5.963009334513362,8.973731873276803,2.644790912345507,5.366917047727336,6.617406862477495,8.985211456995053,9.275940877368708,4.942311560755883,8.312763706579869,6.7532362118736255,1.870559176571298,5.653576439274306,7.02558115660705,8.278587534744243,5.222167957747745,5.499218720673249,6.950774393404364,9.367031629204403,2.6749907098966874,8.253956845836566,9.37305136818033,5.260567610358777,5.521778572528902,8.29136661101538,5.139207470263509,5.106435237170381,5.9394201440619865,2.0947514249901933,4.434215139221386,8.21165263388375,1.6906442574766034,5.325558559289345,0.03309468309472985,4.063973787469601,6.844106337209686,7.592841768577352,9.384670949773039,1.8680591752548237,0.29645593270839266,6.9950000807595325,2.449026662924223,2.6516875090704106,9.775631765045961,1.0843600520738894,7.38313256732114,1.5593847973189057,1.869905188969998,5.314308096751239,8.340765717624842,7.316963466758784,4.518715607073545,6.203112563064497,0.09386763514036778,8.339828500965181,7.577148557181874,5.140139071780054,4.745814625572176,3.321753855197027,1.1342390337977881,4.6375657266700365,3.6251081864655954,6.3699031903857595,3.1088788512278454,5.566004475202584,8.116740604101643,7.4131237993719745,2.3989128245998503,5.9783138900304795,6.112717061704318,3.9910270599354614,4.37012097842339,8.004983973243942,5.041598794442179,2.236350867415786,9.863986375347775,8.760738081905114,8.162261899486401,5.4708377385375435,6.998274959534092,1.5872212619368975,2.1911598464153714,8.670941964496059,6.045384371626499,3.4392721231283008,3.306059405436874,1.2043110016706593,3.5880321423263006,8.714298505574936,8.342914158716608,8.839539888426092,6.337935203570271,2.1454288114046416,8.3789095103673,2.7997489016286115,2.760110070588888,1.8587091590116356,0.8968760293345879,3.282391711560795,1.3209539940290371,6.37163367070386,6.3500165801384405,7.634017043757211,8.634320998998701,2.8092881606968123,2.677851630165482,4.117272599896444,0.2567640127913662,1.771467454141884,1.4948063429878578,7.624170046634397,7.8389823364570805,8.06205969741658,6.670117854762854,4.3465606193838475,9.00743156973598,5.527394368793432,2.0678159147459096,3.4419203990546743,7.159152605738994,2.1119046913784234,8.172458859381674,1.328051328332911,4.480155790032379,6.463626229275398,5.7686663208389195,7.887384516428437,5.269820484485113,3.8316152712216422,4.689812879342252,7.507091611092633,1.227382928611409,2.128804895504597,7.554431579255514,5.206845308988475,8.88899248832801,4.331554990269519,9.300837802192719,0.5584363493954858,4.839349181264967,5.651312432552107,6.593206126987285,7.513858983075387,8.724481246158275,7.206335560579779,0.49583848512515516,2.118131805492227,2.2929559937722144,2.342057169614362,5.568068812462328,1.9125548500495793,9.35756262329394,4.433106384186434,3.3079056175456234,5.61798740073206,5.670029155514493,9.677152654954622,8.665513939679336,8.699307981289445,4.183186386815361,7.348742011268361,8.84851480519429,8.44733117542538,8.179270925347012,0.08846273465747956,3.948107979422808,3.8128606134159737,7.715128432762864,3.5763646971493435,0.0035653068186203285,8.432350528347229,7.9548149683037845,1.7514134550949656,0.3256486938392733,3.2162581675986712,7.775289668652734,5.349919625538031,8.090909179207546,9.469614977994967,1.6137454081270985,1.5282323678703458,0.6794902423346949,2.6243796946695896,3.2522003312005388,4.068411919660209,5.731275225624721,4.831659627448259,9.587917576566792,0.417242289744848,5.571943415455303,2.2792156349762105,8.1302252766106,8.244978759123985,9.559154793056962,2.8291795787044416,0.6954120166268773,1.1505323147473323,6.39927128838621,9.593280287205758,8.194485741538017,5.422163834674749,2.8917673454404635,5.632352495488123,9.343432466619264,9.10088814945319,0.7911801554873321,4.451113937945895,7.050643094404164,4.65179138031699,9.968737721860904,3.7143502480365242,4.761760471157251,6.914375393362933,1.709031470596154,4.6486207094569165,3.156363678737424,6.898548656681543,8.89695988748958,7.194501059491567,0.5671988346130363,4.163027547889307,6.885019966192032,2.0340896011518805,3.9011974621893386,6.124279995021471,4.3985304593702645,7.177879842034585,6.856706586872918,0.09830242441284387,9.336683057624303,3.0621323663944544,2.6473112484133243,2.5643730605211856,8.11415774721169,2.0317940400245282,8.656680266098677,7.946572681522652,5.799622861170317,7.696417671547307,1.1289060625408176,7.350878976204285,3.0830348963616516,7.2910759208654525,7.560320884751894,3.116295674540386,8.084894395865692,1.3408240941554594,4.459780571862666,2.113486104450706,1.6575424251918158,4.759406813589808,3.090994158890299,6.2123054975926735,2.8963384003940362,1.052236300851721,5.770812629181603,6.4414063548279525,9.812342439898977,1.6555869205308138,1.4905109920221293,3.158892234115145,5.476031145572469,6.695438026197715,1.272861728848378,8.663144970490144,9.923143424392569,3.0884294692388714,1.7302112340626863,9.312996010331965,0.8258444453936953,0.522939405502103,5.905969400662887,3.324365398907807,2.7011416139549627,5.1776639845751244,2.6812658955736968,0.8154524384674056,7.851339147630931,9.347136269851381,4.0403872701062715,0.031178491478904835,3.312775699306152,6.074973059782027,6.198439187302089,2.2839668873383334,4.057375575768178,0.7313480790844595,9.24049668915498,1.6795547024015356,4.7867841245679426,1.3431073671522986,6.3581560120017695,0.6163191922042355,2.2836418509306444,1.9966253787499277,8.506573938210204,5.423143063071418,1.7848365319956305,8.80115269728076,4.189948214295893,1.351441351739342,3.0833123867469125,7.572841683656176,8.623740391196087,2.7105435612759265,9.175050241683667,3.7949024476021087,2.348817383753683,7.3541485974712,8.428438856612583,3.9844369565669413,2.3579833437236153,3.692986686615236,2.1406233049985235,4.252441345935701,5.091135450918413,2.51735306127729,1.6973474411231626,9.904857081528469,9.848076577718292,3.035354272603925,9.689899872444405,7.0564117663868124,1.9837738567789853,8.614505075582066,4.281395681197253,2.148181990474567,3.7548047187743983,2.991880873996018,9.288734429816403,6.097583481989661,1.7077181810055686,6.265063513702202,6.16459790286604,8.088741720174635,6.153765345854119,1.939203113942587,6.459428440549441,9.497082245718822,9.564844461617978,5.810035068507203,3.581534940813329,6.7072928077446115,9.479032216205773,5.938231588144845,6.7680028127755225,7.996028698088516,1.5092708658432685,5.658956693668252,5.603637979745626,5.227633693042614,3.698607737315407,4.603675382972789,4.673814583572227,7.475249678341804,1.918975435695478,9.755858688172221,0.47171936455550956,6.0238054253146505,4.800979940441607,5.5063124406058765,4.653936885071248,8.542646309644253,6.981641324868155,2.053871011517685,8.546380435729223,0.3565416056286841,8.472518751661731,0.24926856580755885,3.3480684775293845,4.819805986198933,0.5037664700945244,2.798213539111325,0.31300262944433666,4.74231273258942,7.525560250475991,1.2324062235996047,2.3353999006782944,7.549160165089141,8.478307137347876,9.230060353611133,0.15764070827308352,5.616348634816532,6.672358818470892,4.274110106048519,3.7647228399799126,3.748368997153586,0.7920832333219452,8.444325172712343,7.567717822675711,9.789453822786221,6.440500190129772,8.132995835101209,4.586292301550577,9.675845468269317,9.085981678220367,6.587737557487827,1.9885131989280058,2.3401513038528066,4.908753839221072,4.231215582182994,6.463559770650895,0.012458853952095339,3.9752697198014353,4.079157183607247,3.134496803970188,1.2747278622330072,7.127575401036495,1.0404887415415764,1.695723935493163,6.780281202523453,8.240469940373554,4.320073346974283,1.308187525725999,6.534097352836293,5.906985166132783,5.304816537104027,2.31717825293303,2.53167717837389,4.84254451567288,4.594634849436943,0.9754671347555699,3.7863987251514164,4.101495627292797,6.68938379445742,8.741580013611351,0.21535588191802235,4.387646252968107,1.4782497107443437,6.325425619793528,0.25826321970128907,0.3498720540865108,8.665862797162966,7.023942955871001,2.506904465879136,6.428631730158541,3.349572939469607,0.9630116535404332,7.658669389881883,6.2255867604001995,2.109608019102731,3.4630333991707807,7.4320358780897795,4.0980750333171345,2.532411987725909,3.7147613425982406,1.3230219133706034,1.1897630367596324,7.969375770858516,0.8097813177699864,7.451136298771292,3.136813281598547,6.102343405984669,0.7136296141077247,7.782841245304663,7.954954905256293,7.365647095159642,4.623071305076745,3.027718412682079,2.225154655075907,6.125895606159542,4.1860697356659955,3.7150273505936204,0.28837745000339643,0.06288183340170006,5.121446100845109,8.663159773975359,9.88864516003111,3.3379181311098116,7.0027943601437475,0.14565836230142848,6.901670536640385,8.724040767796112,3.6910951549969906,8.314263116059683,4.686855547670444,9.975685897997373,9.591739673319173,6.596771368000671,1.1641874804287022,1.0562468620532406,0.3235551098833911,7.479417779018489,4.995709472791621,6.085839452090161,4.594849879795515,9.044948740198247,8.101787658878086,0.473824932516691,1.6711115668961174,1.201423617358961,2.647761691260182,3.6944791834095825,7.649835917953663,4.196755482477121,7.394629124182561,1.162284658456454,5.604454067126752,7.92899388996255,6.030369974947439,8.94844389553871,7.553333344846727,8.82617172303833,6.51699597305448,9.385397546284096,9.162302117341167,6.78108936102753,1.1707179196794404,6.5663885059356115,6.102033549233894,0.8591645499838885,7.578267313757352,5.921908235696289,0.08511258508103525,6.180522609974464,6.2868445056807225,2.2102947277936713,8.577318277610573,7.057373011268657,6.490453703419239,9.360947428790137,4.677642406668463,6.816992836717741,5.610095141155438,6.902793294159122,7.930461267828813,7.027682716504007,6.242196071817123,8.510249639669684,4.783201255496405,2.4529854973473797,4.6544115149516525,2.353769457811812,5.581622152206494,7.288272840534993,7.169449229551321,7.225733793293275,6.443036809532043,6.006768049074354,4.511000460331722,2.709732468704542,4.5428025944335,7.9313635896705375,6.760749366368728,3.325995390757772,7.27888761768809,8.418288347829325,4.436082746407896,2.4788458757490806,4.447548886379353,3.6792030551387134,5.529986787416772,7.849621218641039,9.31156425420895,4.7100402067028995,1.9275304966640472,3.4235130705568784,4.788898816088485,4.749008422891787,1.205920880735054,3.2297028688320295,6.225075854162652,0.5691435196005745,9.390399852727791,4.158754057999133,2.6660558657833477,5.387173684671169,3.8535120142757173,3.4618946208259183,1.0273116370893565,3.372812538812977,6.246262493161576,0.8340649537956635,7.857359057435245,0.2646237410792929,2.8326788798502744,6.4750708927172,0.12321982546371624,9.153203634478988,7.196842035057591,5.571220937778163,5.9020470279004815,1.0229580568723273,9.242812503707455,3.639475295477701,0.4604572856655653,4.262019802949608,1.8157250301145633,5.382645717082726,3.258747169159233,2.962349086404661,7.379636793877882,3.535786832677137,6.354585592573853,9.39892467431789,7.438667521330666,1.5246548927624382,5.47908962488658,1.1162438843179734,4.174428794106781,7.221276975734952,1.7027243180174279,5.115978232806526,5.467324035752672,1.8531090748608148,3.774058155356015,0.5877800383491238,7.502051916809727,1.3931006947002689,9.350649238930123,9.477880718522634,7.425980048233511,3.4538987027819323,6.85512371380832,0.3608697483836121,6.1619016186226405,8.45724162282549,5.526437429674889,9.858727064304817,4.786888131062308,4.9415760300190215,1.3899688902018847,8.996668816662583,7.775186256262156,5.308788148593104,7.234614932087295,2.898387191675995,4.2503616802888455,5.067629374972458,9.974609300413583,1.5654409924048518,6.267447530250367,9.354904587767056,9.872012450412553,0.42693841851022984,2.983145643124585,5.56908676060919,6.114583218491953,2.2589400158794293,2.25736855547797,2.1746881680462593,2.467515268648255,5.947144345177353,3.45470282859055,5.222756097838173,2.738398605570227,1.6722900912804595,1.5441455446858643,3.8942965671810414,8.307697383172084,5.95021988524596,0.30218819886447923,7.514366250616835,0.7636451214960371,1.4466206158777162,6.881848375137089,4.093628467133268,5.839085049661592,9.624100297308251,5.128923866576349,6.72219060021813,2.065095717971206,2.4809240686218703,9.779389006625859,2.7363881068811247,3.265634042276504,3.816852865332203,0.1455811658030126,2.300679697459751,3.8658035842955907,2.263530830563678,0.914239747021961,7.288065761672842,5.301499783642414,5.486928600023477,2.07456223706749,2.1481857181599495,2.3362711020274696,6.683635711261742,5.271498352058619,9.808171824027387,8.822994314314643,8.96878431401091,0.9598801831199721,6.119725637542375,9.45781383081993,5.377978901925116,7.42875591799355,7.220458895682944,9.672816984515437,0.8174544887476087,7.714077878307181,6.3893717827704455,6.997206918898923,0.4349174831629954,5.625280858090919,7.323849793325716,0.325107720922595,4.859579957142818,4.6427142675594935,5.653709559716877,2.122001501788342,0.32432783506588736,5.554077094263789,5.554078558004056,7.903319240688078,9.20325100378381,2.055783158428013,2.622289463654295,9.275159802957615,9.231968942492026,2.455667280787681,2.118867413213188,2.3785497235381747,2.087350665837542,7.692291625396814,1.735352743198142,6.674716327275895,6.028996497133954,2.3773815267612797,0.8429798218578743,0.12115075002328002,1.8955802086714546,7.000869678576434,8.171261872902635,2.9366731965481674,6.436696110171889,7.158922083636876,6.425020328107783,5.838781092617868,8.200262407151747,9.416013762587838,5.5729364010291,9.638020479362716,5.124846890735242,9.984363330736521,9.977707965006317,2.351212310009634,5.033183858690451,2.895451636889401]}
},{}],128:[function(require,module,exports){
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

tape( 'if provided a valid `mu` and `c`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `mu` and `c`, the function returns a function which returns `-infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'the created function returns `-infinity` for `x < mu`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0 );
	y= logcdf( -1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	logcdf = factory( 4.0, 1.0 );
	y = logcdf( 3.0 );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a nonpositive `c`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, -1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, 0.0 );

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

tape( 'the created function evaluates the logcdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], c[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var c;
	var i;
	var x;
	var y;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], c[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large variance ( = large `b`)', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( mu[i], c[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/logcdf/test/test.factory.js")
},{"./../lib/factory.js":122,"./fixtures/julia/large_variance.json":125,"./fixtures/julia/negative_mean.json":126,"./fixtures/julia/positive_mean.json":127,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68,"tape":205}],129:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/logcdf/test/test.js")
},{"./../lib":123,"tape":205}],130:[function(require,module,exports){
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

tape( 'if provided `+infinity` for `x` and a finite `mu` and `c`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `c`, the function returns `-infinity`', function test( t ) {
	var y = logcdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided a `x` smaller than `mu`, the function returns `-infinity`', function test( t ) {
	var y = logcdf( -1.0, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logcdf( 3.0, 4.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a nonpositive `c`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

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

tape( 'the function evaluates the logcdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	tol = EPS;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large variance ( = large `b` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], mu[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/levy/logcdf/test/test.logcdf.js")
},{"./../lib":123,"./fixtures/julia/large_variance.json":125,"./fixtures/julia/negative_mean.json":126,"./fixtures/julia/positive_mean.json":127,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68,"tape":205}],131:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":131}],133:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":136}],135:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":135,"./polyfill.js":137,"@stdlib/assert/has-define-property-support":14}],137:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/assert/has-property":21,"@stdlib/assert/is-object":43}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":139,"./polyfill.js":140,"@stdlib/assert/has-tostringtag-support":25}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":141}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":141,"./tostringtag.js":142,"@stdlib/assert/has-own-property":19}],141:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){

},{}],145:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"dup":144}],146:[function(require,module,exports){
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
},{"base64-js":143,"buffer":146,"ieee754":172}],147:[function(require,module,exports){
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
},{"../../insert-module-globals/node_modules/is-buffer/index.js":174}],148:[function(require,module,exports){
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

},{"./lib/is_arguments.js":149,"./lib/keys.js":150}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],151:[function(require,module,exports){
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

},{"object-keys":179}],152:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],153:[function(require,module,exports){
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

},{"function-bind":168,"has-symbols":169}],154:[function(require,module,exports){
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

},{"./GetIntrinsic":153,"./helpers/assertRecord":155,"./helpers/callBound":157,"./helpers/isFinite":158,"./helpers/isNaN":159,"./helpers/isPrefixOf":160,"./helpers/isPropertyDescriptor":161,"./helpers/mod":162,"./helpers/sign":163,"es-to-primitive/es5":164,"has":171,"is-callable":175}],155:[function(require,module,exports){
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

},{"../GetIntrinsic":153,"has":171}],156:[function(require,module,exports){
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

},{"../GetIntrinsic":153,"function-bind":168}],157:[function(require,module,exports){
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

},{"../GetIntrinsic":153,"./callBind":156}],158:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],159:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],160:[function(require,module,exports){
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

},{"../helpers/callBound":157}],161:[function(require,module,exports){
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

},{"../GetIntrinsic":153,"has":171}],162:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],163:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],164:[function(require,module,exports){
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

},{"./helpers/isPrimitive":165,"is-callable":175}],165:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":167}],169:[function(require,module,exports){
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
},{"./shams":170}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":168}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{"./isArguments":180}],179:[function(require,module,exports){
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

},{"./implementation":178,"./isArguments":180}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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
},{"_process":183}],182:[function(require,module,exports){
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
},{"_process":183}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":185}],185:[function(require,module,exports){
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
},{"./_stream_readable":187,"./_stream_writable":189,"core-util-is":147,"inherits":173,"process-nextick-args":182}],186:[function(require,module,exports){
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
},{"./_stream_transform":188,"core-util-is":147,"inherits":173}],187:[function(require,module,exports){
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
},{"./_stream_duplex":185,"./internal/streams/BufferList":190,"./internal/streams/destroy":191,"./internal/streams/stream":192,"_process":183,"core-util-is":147,"events":166,"inherits":173,"isarray":176,"process-nextick-args":182,"safe-buffer":198,"string_decoder/":204,"util":144}],188:[function(require,module,exports){
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
},{"./_stream_duplex":185,"core-util-is":147,"inherits":173}],189:[function(require,module,exports){
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
},{"./_stream_duplex":185,"./internal/streams/destroy":191,"./internal/streams/stream":192,"_process":183,"core-util-is":147,"inherits":173,"process-nextick-args":182,"safe-buffer":198,"timers":211,"util-deprecate":212}],190:[function(require,module,exports){
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
},{"safe-buffer":198,"util":144}],191:[function(require,module,exports){
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
},{"process-nextick-args":182}],192:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":166}],193:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":194}],194:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":185,"./lib/_stream_passthrough.js":186,"./lib/_stream_readable.js":187,"./lib/_stream_transform.js":188,"./lib/_stream_writable.js":189}],195:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":194}],196:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":189}],197:[function(require,module,exports){
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
},{"_process":183,"through":210,"timers":211}],198:[function(require,module,exports){
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

},{"buffer":146}],199:[function(require,module,exports){
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

},{"events":166,"inherits":173,"readable-stream/duplex.js":184,"readable-stream/passthrough.js":193,"readable-stream/readable.js":194,"readable-stream/transform.js":195,"readable-stream/writable.js":196}],200:[function(require,module,exports){
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

},{"es-abstract/es5":154,"function-bind":168}],201:[function(require,module,exports){
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

},{"./implementation":200,"./polyfill":202,"./shim":203,"define-properties":151,"function-bind":168}],202:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":200}],203:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":202,"define-properties":151}],204:[function(require,module,exports){
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
},{"safe-buffer":198}],205:[function(require,module,exports){
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
},{"./lib/default_stream":206,"./lib/results":208,"./lib/test":209,"_process":183,"defined":152,"through":210,"timers":211}],206:[function(require,module,exports){
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
},{"_process":183,"fs":145,"through":210}],207:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":183,"timers":211}],208:[function(require,module,exports){
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
},{"_process":183,"events":166,"function-bind":168,"has":171,"inherits":173,"object-inspect":177,"resumer":197,"through":210,"timers":211}],209:[function(require,module,exports){
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
},{"./next_tick":207,"deep-equal":148,"defined":152,"events":166,"has":171,"inherits":173,"path":181,"string.prototype.trim":201}],210:[function(require,module,exports){
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
},{"_process":183,"stream":199}],211:[function(require,module,exports){
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
},{"process/browser.js":183,"timers":211}],212:[function(require,module,exports){
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
},{}]},{},[128,129,130]);
