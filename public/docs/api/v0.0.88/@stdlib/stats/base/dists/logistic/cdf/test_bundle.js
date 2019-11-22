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

},{"@stdlib/utils/native-class":119}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":119}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":119}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":119}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":119}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a degenerate distribution with mean value `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of distribution
* @returns {Probability} evaluated cumulative distribution function
*
* @example
* var y = cdf( 2.0, 3.0 );
* // returns 0.0
*
* @example
* var y = cdf( 4.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( 3.0, 3.0 );
* // returns 1.0
*
* @example
* var y = cdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN );
* // returns NaN
*/
function cdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return (x < mu) ? 0.0 : 1.0;
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":65}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - constant value of distribution
* @returns {Function} function to evaluate the cumulative distribution function
*
* @example
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*
* y = cdf( NaN );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated cumulative distribution function
	*
	* @example
	* var y = cdf( 10.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return (x < mu) ? 0.0 : 1.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/utils/constant-function":113}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/degenerate/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/degenerate/cdf' );
*
* var y = cdf( 2.0, 5.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
*
* var cdf = factory( 5.0 );
*
* var y = cdf( 3.0 );
* // returns 0.0
*
* y = cdf( 6.0 );
* // returns 1.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":100,"./factory.js":101,"@stdlib/utils/define-nonenumerable-read-only-property":114}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluates the cumulative distribution function (CDF) for a logistic distribution with location parameter `mu` and scale parameter `s` at a value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.881
*
* @example
* var y = cdf( 5.0, 10.0, 3.0 );
* // returns ~0.159
*
* @example
* var y = cdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*/
function cdf( x, mu, s ) {
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
		return ( x < mu ) ? 0.0 : 1.0;
	}
	z = ( x - mu ) / s;
	return 1.0 / ( 1.0 + exp( -z ) );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/exp":75}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/cdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a logistic distribution with location parameter `mu` and scale parameter `s`.
*
* @param {number} mu - location parameter
* @param {NonNegativeNumber} s - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 3.0, 1.5 );
*
* var y = cdf( 1.0 );
* // returns ~0.209
*
* y = cdf( 4.0 );
* // returns ~0.661
*/
function factory( mu, s ) {
	if ( isnan( mu ) || isnan( s ) || s < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( s === 0.0 ) {
		return degenerate( mu );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a logistic distribution.
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
		z = ( x - mu ) / s;
		return 1.0 / ( 1.0 + exp( -z ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/exp":75,"@stdlib/stats/base/dists/degenerate/cdf":102,"@stdlib/utils/constant-function":113}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Logistic distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/logistic/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/logistic/cdf' );
*
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.881
*
* var mycdf = cdf.factory( 3.0, 1.5 );
*
* y = mycdf( 1.0 );
* // returns ~0.209
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":103,"./factory.js":104,"@stdlib/utils/define-nonenumerable-read-only-property":114}],106:[function(require,module,exports){
module.exports={"expected":[0.6507277039190164,0.5060859394811594,0.6561186296973692,0.7376460683338767,0.5683962723469259,0.5027958671404433,0.487432083381425,0.641840930439563,0.4940245819656031,0.5217168307914296,0.5448976488051364,0.8756170714796441,0.5419356283534315,0.5377829606593736,0.5645955155988946,0.5260157687988207,0.4612162835456648,0.5207518211345684,0.5664089631602542,0.5832746691393919,0.530233147926704,0.9989643882616814,0.5697386559226884,0.5138568797436897,0.5122160224737875,0.7643353721679884,0.5936699889246921,0.5342495333061669,0.929682726105949,0.5519201283004396,0.5358988935413049,0.5234187855316873,0.5203302671536096,0.5883697348639353,0.6570160410730033,0.5525341364552318,0.5888999157223261,0.5614283690625758,0.5601650613741569,0.5753818397067054,0.5886427109123967,0.8020793813312476,0.5150315706844517,0.5622440767108954,0.5396702227807526,0.5468556940754313,0.5589089380463292,0.5685450239400364,0.6888506135858378,0.4909180017014739,0.5475185709672935,0.5402147508917577,0.7979907425165983,0.539671955033806,0.5534647047701776,0.9835580745770478,0.6980087980540128,0.55690974473388,0.5482993835023356,0.5610637939040086,0.5022732292403993,0.6597232744303226,0.4861042639280924,0.5233313287137384,0.9446797288708433,0.4950923976208948,0.5148907077623267,0.5527907890695312,0.5017764070392645,0.5160264472318242,0.4968007910218967,0.9945999100584586,0.8881993647376296,0.49556065161651236,0.5233755351449033,0.6242686153449475,0.5829163828166078,0.5543970869615158,0.5439650817075427,0.5318008306995384,0.5498030869887838,0.43179302795435154,0.5029048982864112,0.52412255779746,0.5220120219758984,0.546695264612902,0.5185251495848858,0.7901958177872231,0.5573925243617331,0.5287391844458661,0.6270039611635153,0.5117234393396497,0.512651836093685,0.540602583239708,0.6740172557656353,0.5494812923750017,0.834467295442779,0.9960272927609075,0.5669776179109243,0.5907393429114897,0.5165545377557726,0.4837235978997644,0.5114597928381849,0.535761902881703,0.5427022110827602,0.5454837711112503,0.6687617067597146,0.5985632325032288,0.7859521539991193,0.5613024787208181,0.4960450011349134,0.5064038925454073,0.4919639743169728,0.4923606574182967,0.530555084249525,0.646027271644675,0.5795846639109956,0.5684651670797322,0.5762164760735465,0.5449902519307007,0.5873469315078195,0.5553045847793167,0.6817027034462392,0.5232884096314008,0.6454384925294324,0.5954358443666289,0.5042326147796025,0.6218547349353892,0.5513180357053351,0.5486686363501948,0.997816601622706,0.4932190295826576,0.501909238948789,0.5228377725342895,0.4981264533359631,0.5660548232774796,0.5259095852612078,0.587143423194773,0.5412080583578709,0.5585437297495052,0.6163703738612369,0.5434798977080548,0.524450173170641,0.625022417230333,0.5157640772206001,0.5103655838637823,0.5407648295248638,0.5414000543983557,0.5684944484573008,0.9753944109211267,0.604554442184478,0.9078768110649508,0.5222840869111167,0.6712983285696928,0.5745221329238746,0.54377056491925,0.542965508668165,0.48582388001716603,0.5314884745724147,0.45702485876057286,0.5448823117486882,0.556160222330005,0.5632090988166062,0.5226676993487551,0.7202012932020538,0.5863160894115517,0.6278730498405761,0.5458569345510327,0.5572238346170975,0.5859532955462133,0.628056361378561,0.538931677476834,0.5284898260953006,0.5465180038241617,0.5591607497123579,0.5596804899581121,0.5904473537285236,0.5471957006347556,0.5490785761854858,0.520166000251777,0.5268883365315247,0.6488397616327071,0.6322592307327114,0.9888575281889288,0.5181743878294832,0.5587903297932669,0.8235356235934261,0.9972821481251012,0.5278647846116181,0.7427770152962277,0.5238903184655576,0.4714537673360362,0.42801639121446183,0.5235388648087094,0.9327374083212652,0.7516969269910367,0.8840272335310481,0.5679804201849125,0.5428969231421436,0.5208961266334102,0.5711393786664057,0.49145519596706017,0.4914098317832502,0.5442180914533158,0.5300929961559308,0.6393422696223615,0.5175885131850974,0.565885615409798,0.9479969336828143,0.912630427312299,0.7678831160561674,0.49539647862578434,0.5085010091200504,0.5662947069214456,0.595447481413705,0.5411608045571986,0.5161337363034941,0.512620207247697,0.5824188428289185,0.5321024276223261,0.5096352985448634,0.5460376821484328,0.5520387503314799,0.5018762383703639,0.5127930578528772,0.515885622263954,0.5048665765767792,0.7260946948375275,0.5233694299336078,0.9919809443171337,0.5446101076284143,0.5528931858212721,0.5241361537377234,0.5321422067497253,0.9498764554216206,0.5804551262561668,0.5256132880704808,0.6579932544881602,0.5344535533090793,0.9688516340830622,0.6795987991798238,0.5593582785969778,0.5691435617589621,0.5155095391224837,0.49888509253649405,0.6350639347415368,0.49442424880335717,0.5036092261239198,0.6093162256603416,0.5975850438862332,0.5779475975500323,0.5123957936095938,0.9996186430130537,0.5323533061189754,0.981363993625493,0.47982551465470774,0.7032689389678624,0.5492931925653036,0.5633293709299686,0.5784160422855346,0.6043581165629119,0.7231357656230403,0.5015443685176393,0.6325909244275875,0.6115234605845412,0.5396148042270315,0.5118743511409988,0.9685623019922477,0.5023167101855563,0.5777155157075753,0.5526660836650097,0.671772849336824,0.4973941484750001,0.9997333579322293,0.6069047689339828,0.5719278340333754,0.5414807346664534,0.6371072365374619,0.5337630303334415,0.6944719775148794,0.6045253374793434,0.955072187006134,0.540207095864957,0.7220427834193885,0.5570864912303785,0.7385547851440902,0.640384689382923,0.5242687672994654,0.49995309452656833,0.5729686892510762,0.6291302885407547,1.0,0.5253230891855366,0.5732280902595069,0.6700881332936736,0.5045666566680904,0.5647888867081445,0.5463156487405213,0.5749312574013384,0.5357274987313502,0.6819441141417549,0.49228764295567307,0.5298023255688203,0.5695235913924994,0.5352040518310494,0.5881198926202624,0.5295918340504514,0.5825523747811525,0.5333111464143399,0.6245541692215626,0.5390435311470547,0.4933047282766572,0.5007316677245731,0.687060410413982,0.8081212059712116,0.5250895897026201,0.5845172054789616,0.4908581667173965,0.9999999999999956,0.5017465414121628,0.5759213554388565,0.5185015459897908,0.5103854698297839,0.6492622576558567,0.5028159540647478,0.5826002193386137,0.5208727768997958,0.544463667620277,0.5150365634398015,0.7135167985789316,0.5589743080500892,0.5086707014199814,0.5792581599831622,0.5703401548128686,0.9609563429842608,0.9637474757558194,0.5892208495433727,0.5993095808564762,0.5632447422080793,0.5731670696405751,0.5529062521739382,0.5056551602524806,0.564861936225473,0.5340443448499453,0.5500916774195967,0.5665688515572247,0.5116402302696909,0.5119882202237467,0.5501951729245941,0.5651240735299105,0.8876125546304795,0.550731771880787,0.638524689455354,0.9027602708565793,0.5394648442398305,0.5165882585414626,0.5315064277965234,0.5271119054718221,0.6683902906407684,0.5254336263799134,0.5059134689595143,0.4767828699444988,0.5376212696324522,0.525065452955079,0.9320067394873519,0.494846845526136,0.560002363054838,0.5226730929949381,0.5184534970881203,0.5916971596260435,0.5329915303712799,0.5612972616130488,0.6637258399185678,0.8170031757623055,0.5832420821027723,0.49130485262175533,0.5416753122315141,0.8149177595479368,0.497429771129057,0.5477590249074862,0.6103371827922391,0.7262448667657396,0.6559228784141581,0.5275942233709648,0.6586642353225467,0.7580205628298249,0.5530703933405239,0.5657032623784264,0.5161169017942494,0.5281295574728203,0.5281481052996563,0.5805723631828003,0.5129381299942374,0.48801832939361434,0.554429070318972,0.5574965717147397,0.49852544330879944,0.967675661669797,0.9999999999860703,0.65975812726564,0.5587584183894578,0.597999070471544,0.7105235561060028,0.5403116944386086,0.5064413238391839,0.5546024730084373,0.4983212005231507,0.9999999999999891,0.5313990334030401,0.8157032896485079,0.6115736827660048,0.6804844801782277,0.5720128530163414,0.5603043418739712,0.5465178953646882,0.5787525352765128,0.5248372130589923,0.5255596882836342,0.5523210573989954,0.5844860744323571,0.5391050922747788,0.5700950485798696,0.5192901085347189,0.6437655080377216,0.5926199584208176,0.6339166169114054,0.5049829619252052,0.7351804212618602,0.5483481028930351,0.5091116653984509,0.5209481951437137,0.5407299412753557,0.6079290981855014,0.887352597712434,0.5883842390903241,0.5258032352720576,0.5995729505064039,0.5696530101627548,0.5146077803243633,0.5013427317784157,0.5033738668200564,0.5187148656821979,0.9192080904164918,0.5607528756187286,0.5115354317823125,0.5393711544950917,0.5210159516596277,0.6395648207674627,0.885032088072864,0.5256191028111169,0.48047651325430757,0.671560039027178,0.5609547647733651,0.6092013744215083,0.5130787190624504,0.5084426198184457,0.8056931362104435,0.5522261072194696,0.5925851059369093,0.5158627090001416,0.5182669205546142,0.5188268097989923,0.551864034747003,0.5706772892142785,0.4972842614619872,0.6614887589029254,0.5377859271751759,0.5357867345656819,0.5253571076044415,0.48004686227496307,0.5417114266741981,0.6395137861557489,0.5173033106931846,0.5012419833806997,0.5139910475094253,0.5039598147299873,0.5092769674251579,0.7489936847585874,0.5931594881346309,0.557621387981669,0.5832389925452657,0.5268214617296082,0.537308549981557,0.5379605529609467,0.6102018933074743,0.5601706522801839,0.5269713336252827,0.5124442265746131,0.5348010741842082,0.5715198430729795,0.6131106398419183,0.5341100125220416,0.563155834098683,0.5703687880890597,0.6073456014282336,0.5672011828780613,0.48032502274437266,1.0,0.5196773133850708,0.685005255369859,0.5527966687764996,0.5024368469283912,0.49476499858761297,0.5449876193648472,0.5260382076650439,0.5177179099163539,0.537746383686136,0.48267043898625817,0.6895993168382951,0.5515335725433101,0.5249168827469278,0.5786961429875717,0.5663317092523018,0.5557423550679806,0.574393094346879,0.5725626721730447,0.5629242339077972,0.6097025903723308,0.5625614180134265,0.5255884378214862,0.498072845159989,0.5700544476379013,0.5089341040955901,0.5962262485305464,0.9452314504685714,0.8443020135340065,0.5491158681344613,0.7434835409615683,0.49557762679057427,0.5617730204673176,0.5418769612191554,0.5427263378795009,0.4655523270533667,0.5031060971777904,0.8684241839712772,0.6759170566368462,0.9992211398439967,0.5343213881895384,0.9897313565210435,0.5010423541668281,0.592055453448962,0.5487998234467591,0.08866259725089418,0.8970275918193057,0.4789577182141552,0.7151537944448206,0.49884968611006963,0.5468917523508715,0.57766618764331,0.9606331348536745,0.5684337374471243,0.5815162567151001,0.5002806539487159,0.6512072938887631,0.557082159730888,0.5640603147029833,0.6677811217741935,0.7315787721175463,0.48612321124608104,0.5624631113656634,0.5068448463299001,0.5626000714430993,0.5523884146771407,0.5696638011468895,0.5593920343430048,0.5874344640064036,0.5941286205726732,0.5021804718301076,0.5271098796331604,0.5536588985252979,0.8975505586831354,0.6245594550762962,0.5553384956340399,0.49419108326613476,0.49707883911428263,0.48155094260783066,0.9999013266642907,0.5071605052577163,0.5552384221948551,0.5339782577003005,0.5562180141765716,0.5116943600332123,0.5367810248696551,0.5072785784197561,0.5373296901026129,0.5423322942072288,0.5675564613555947,0.746954905780785,0.7402146826608116,0.5023287975687387,0.5632471402747736,0.5542221988645082,0.5040378507413202,0.5405279288548748,0.5478543643737038,0.5104461398907518,0.5130988042673296,0.5113410911001697,0.5438939660170439,0.5660216604642925,0.5086800977464367,0.6346727020502687,0.5614211902107737,0.5280722486365503,0.5543380847668703,0.5033202834141285,0.6768154289729204,0.5587571047594746,0.749503895936434,0.509786845082325,0.5367180258301675,0.55231790121959,0.5829601416164335,0.48563203181976,0.5133760820861025,0.5060129045381759,0.4300358263142534,0.48975565239506746,0.5722811314778682,0.5134191667855151,0.6096584575790404,0.5724741652058778,0.5508793950077339,0.5764474849854415,0.5012080243507445,0.5428869821720135,0.5502593378187319,0.6447705009098148,0.48828524052638933,0.594269255348251,0.5499660172225032,0.5188444249069764,0.5693198187352172,0.5481111757853121,0.7271175379998135,0.5432249362161704,0.505857983725712,0.5368739934968889,0.5161899010935072,0.49754087992019014,0.564370298798004,0.5485146089919786,0.5054808415908711,0.5623865717008724,0.6485656326765626,0.8882203463857743,0.6376073468103999,0.8123450200657086,1.0,0.5867691272969517,0.49564709573845345,0.6737857817645663,0.606962712418705,0.5085289419474834,0.5454381444961554,0.5245207948257161,0.5290614592155021,0.5565008893166925,0.6582310392646047,0.9365108183395728,0.5592948265226756,0.6638016819597903,0.48490802110597486,0.8489413841490289,0.5257180070891166,0.5106967044147912,0.5467780096239101,0.5225019012065497,0.5858227860416045,0.5511223477774267,0.5337682670941138,0.5484114068604011,0.7074330427526955,0.6302662647224264,0.6787245710029498,0.5045168123725534,0.5112993664691513,0.6099901827397486,0.9997371054119026,0.556383507421248,0.540651980726925,0.4920174098454157,0.4871164363256921,0.5585247966738843,0.5071306202719373,0.5583982089316816,0.6669901110305836,0.5740785174036789,0.5682703576010948,0.4798495160447048,0.5595570048427819,0.5299208104186953,0.5648518719149803,0.5612521576352872,0.607493753959896,0.5215607121322107,0.5149213729678843,0.5079357761384313,0.5260138599908742,0.5507862149716571,0.5093480402027553,0.5329575335876127,0.5678316951108062,0.5585240578053408,0.7996454247331094,0.5033083125711303,0.5224973837203333,0.5702532438155177,0.5793073398957114,0.529106393315469,0.4958058400851476,0.557960861003998,0.5780901732178566,0.49100645689482,0.5418147605426897,0.5270132322195287,0.5660990391320359,0.5267315798784973,0.5310695935605058,0.6795602155973833,0.6575934809872873,0.5412897802587379,0.6012607456649401,0.504267862546869,0.627096196803842,0.6276102439318324,0.5419159051084532,0.5222711883565873,0.5575840279682277,0.5367004620875401,0.5401565550468421,0.5289910973692581,0.5262068776472564,0.5455061838137809,0.969197026530277,0.49853503129163657,0.5868896132559732,0.5280463769136823,0.6395765058605603,0.5564042281811284,0.5474962306016075,0.5913839238770837,0.5852779082945124,0.5076532936614166,0.5450590450480008,0.5025499706651061,0.5952555190802326,0.5351942558074144,0.5274648911513468,0.5689679550759623,0.49738192546655624,0.9990512907779762,0.5187213335271527,0.5514466970059603,0.5703406206657671,0.6598259783606018,0.592211559003459,0.5233058146025716,0.5281391169474521,0.693153096126984,0.5382503291100574,0.5156625384592498,1.0,0.5923925886647188,0.5124741242215988,0.8102427624195072,0.5079694566435786,0.49248447902205605,0.9986962530165545,0.5334411665936794,0.4631988779664194,0.5375803335646406,0.5713832390334387,0.5145819284447501,0.6130376129013428,0.5296898392351351,0.5468376926990011,0.49262512289278315,0.6013089093345315,0.5605218415906713,0.5974081097847602,0.6297625835082443,0.5676488604790484,0.5635472952869254,0.9970925283465913,0.477240588625768,0.5001476811415919,0.5499355184792766,0.6082134389828914,0.9999980205441612,0.5629686600708291,0.5002954754281415,0.5365938148455218,0.27547319353060373,0.5665567931812855,0.6831315911215115,0.9378933154928211,0.5561871212147841,0.5094644090030234,0.5080173647044832,0.49827879033943856,0.48824711211642446,0.5167759289863185,0.6335861503135553,0.6343680162451096,0.5319103249715473,0.5050599465942479,0.4558264593310606,0.5676791097850437,0.8473232952144351,0.5406212056946541,0.5447904293392118,0.5168262640245009,0.5271309939034639,0.9288364696177713,0.5254480520218273,0.502868855673248,0.5168347873869517,0.9181592428125811,0.6343497793627876,0.7345209080497044,0.51257534272492,0.5169359378113898,0.525383048731879,0.6347788397694687,0.49840525048778683,0.538460453979239,0.5813147735867251,0.5203754709994884,0.5635278796606107,0.5757094325507907,0.5200442655464174,0.5460085453336694,0.5391314343013124,0.5074414092746816,0.5159746428104974,0.5453174429970429,0.5358367275889768,0.5124119837663424,0.8066952083531725,0.6423055279575464,0.5090855504235171,0.5354875811392863,0.5250762370677097,0.5299752948039823,0.6064561719272356,0.43352089350220163,0.7751255993567354,0.5421922010420394,0.5301016710904533,0.5495985712354444,0.9381919796205062,0.5263567971583568,0.5090340473948005,0.5336467006316059,0.7623520462702958,0.5510758573051262,0.5462179011417897,0.5255699684314019,0.5705190032239646,0.5190229732969383,0.5818444148669528,0.5444340096272787,0.6722386236098041,0.6262906332119269,0.6002640416181083,0.5493278921504214,0.5373713264782708,0.47260062754380033,0.56480849897342,0.7531199852700796,0.5402544375331381,0.5007886121345295,0.6747152217306652,0.4908381146379175,0.5413895785593842,0.5635047230693896,0.512813617853949,0.6193178717489242,0.5598432679625678,0.5213558010591459,0.5030510506135775,0.5669291142525168,0.5187767986187353,0.8716198136255451,0.5445204829858219,0.5315719843497434,0.42992776108143516,0.5130409673066295,0.6368594242631511,0.5293783941721073,0.7971584892726526,0.5525726850416182,0.513196865147062,0.5222950137493014,0.5325779955050625,0.5708280551678305,0.5530879679545557,0.8024603570562415,0.4915944246329879,0.6116900354862268,0.533747161687629,0.5445314560326487,0.5479249109861722,0.5326028132650366,0.6073763831215813,0.8375242652998133,0.5195708307340097,0.48635011207157247,0.5411400778021808,0.5516709943602572,0.5351795463551917,0.5148673235599092,0.493737773301347,0.7947161259360209,0.861195538050718,0.5116259662172594,0.545672823438102,0.5092252717265268,0.5747122925408364,0.5076549768923195,0.607965276028525,0.5272770912394639,0.5470022080175706,0.5343694831445739,0.5403308943526506,0.6509692323782837,0.4950978882106436,0.5300256123305933,0.5980431164657498,0.6070493820944076,0.685173217321771,0.4965320929559098,0.5273220855488873,0.5499778704261828,0.5270395774148159,0.5076164401377922,0.4999109119916663,0.701521774739701,0.5291695389396547,0.5055050507969874,0.5001723091360628,0.5337130780572444,0.5276794666176081,0.5485318180621862,0.5227519453129957,0.5869920357100356,0.5482524882727847,0.5500411217151483,0.5519654986652899,0.5438370690340865,0.6533107107290704,0.4963041101303417,0.9973648910958427,0.5732020582885438,0.7822033707648198,0.5538118368636933,0.5220655136377,0.6822289948185433,0.597201243713575,0.7362697664607081,0.516228893685025,0.5586383462387473,0.5698364626571499,0.545978600263055,0.5140176753107941,0.5131946517688293,0.5614568457921655,0.582584248182863,0.6233938403606155,0.6142601925565708,0.5171256444707693,0.5374483634507723,0.501689377449248,0.6180458499313535,0.9999999969776805,0.5587239938386728,0.571373127101968,0.5682862560221031,0.648803499292223,0.6586747464850771,0.9588168801766327,0.6277072205494085,0.605202462784925,0.5693912210086659,0.5118656417436918,0.5455986108273964,0.653078350154642,0.5327332892351198,0.5377888243770732,0.5331841010662369,0.978145016694338,0.5069670724039609,0.5811176072620788,0.5516719740339736,0.5945165930772005,0.5530533334323661,0.6361383656581149,0.5774180763433759,0.5233772335796695],"x":[4.669088454929142,0.9400710363284848,0.7760426831622502,4.724252314692148,4.896492810585304,0.4766490419336611,0.6592946270455058,4.947892283198185,0.15368521897967558,1.7128400882631745,1.5789803426092963,2.773181903717191,3.340727127154306,1.8813010895808668,4.922542808409846,2.323236713182033,0.42079423113197567,2.004853724875586,3.810813986375401,1.8726574359984771,2.882279794363952,3.3114557630864514,4.587053522377262,1.8674232301683602,1.3303364939317963,4.455060696534153,4.405640242451638,1.2911116263196243,3.952976108538113,4.11480360588828,1.9683752491265805,1.4306341670961442,1.524948278342645,4.2237751330900934,4.946731476488604,4.461575001439431,4.784617461086594,3.8055440900406854,4.037669028409718,2.299433992037059,4.585087988940276,2.241452929136385,0.8631999816708924,1.8159357087958072,3.226626730382457,2.3347576930750815,4.480523035148812,4.102787936670312,2.403865947854078,0.010809994226479436,3.889868517977791,1.9325751500835442,4.774179476784695,3.2210681524705764,1.742934149964811,3.0920061141696333,2.297063068797832,3.76126978571338,2.0754513573548374,2.8771697566157375,0.22817128098597816,1.8476774259343087,0.47999680568324377,1.961497549345671,2.4237686868514063,0.10648478906311709,1.0211972853434148,3.971783328392866,1.0112360306121937,1.7157367099457543,0.23772950076061283,4.062823859590888,3.2723424897181843,0.17778209056615535,2.7702178653558898,4.62421027058547,4.731030175883046,4.416463954659909,3.6252879230558865,0.7760561006285205,3.686548041885639,0.06714416241745069,0.7775354554671843,0.9407139339760617,2.2452912340797937,3.31686055217141,1.0002287305045,0.6998752345268988,2.2354881754964797,2.1232447479049377,3.004883906890592,0.953042781324418,1.0501288143067355,3.933751085111062,2.7949849192600382,2.0260250478131137,2.4854420337547847,4.8365735472480855,4.1213719891280665,4.387441171106136,1.0026901203914873,0.14289307280688446,1.1014034695881647,1.98262264279636,3.3814662348186264,3.8656273272264996,3.8526761846048716,3.5428628091323633,4.305710793905211,4.923445339862269,0.02940057950310826,0.6983010515460331,0.6893088860817509,0.22086440402270258,2.362795590399176,2.7046810679496804,3.563015213128203,3.8749092376146885,4.495074236082585,3.9829430365636265,3.9233543009936547,2.033204121649823,3.5252172448416985,1.7569273898291016,4.4794106117854815,3.3414062386019094,0.9168457604904501,0.9417005021300062,3.9099675537077125,3.011887531180376,4.342259270506842,0.4695182890321281,0.742215952042351,1.797717957382663,0.05996385948761063,4.240862734753246,1.477727715449969,2.4024456963690333,2.8608518640916527,4.114986811154134,4.023134104995672,2.3053060039201236,0.6098885232594542,3.4794831198073304,1.5041932147005344,0.635416114971098,2.001263069704925,1.173314778917699,3.091648469275865,4.269450683511059,2.8851415489687127,4.801669073134215,2.420065128358746,3.9741967839156933,4.860496781358325,3.254937688145587,3.1802834207315933,0.08366222715183058,1.9830746656093867,0.19869866899938082,2.324225357150469,4.54706747940728,4.924294194493336,2.252649912460829,2.798420760423397,4.194901962360021,1.948022569020329,3.377149311190059,3.408164286612363,4.93508621156486,4.8310702652800614,3.862842957545226,2.5976256514853455,2.083886343098371,4.696872655582595,3.454263012891612,1.7029936355153086,3.2173519038282383,3.1924208985223324,1.7360206578970672,2.127709080745668,4.943483405747533,4.8193494189640855,2.506526761821797,1.544721811410662,4.587482631367639,2.4035329052217502,1.4798045054216902,1.3882111861454793,4.701718030775207,1.2451688846961317,0.3691903291350629,0.19017669801170256,2.076018633165344,4.854255341105855,2.1136508610621507,4.973570313011196,1.3040307060898237,2.9457045582107466,1.3174144658957332,2.598425590666862,0.2892923603922082,0.7564574009997949,2.6994075680654595,2.3528530119619875,4.569049788650524,1.8476549612107596,3.2325108144963943,3.9133491685381285,4.018848974053531,3.7304144203415057,0.13501681498705342,1.3026801034991387,2.8962950241402674,1.318679240806253,1.9107431058609214,1.833720868511164,0.6813859515345178,0.9112366751678913,1.8998898670897058,1.2909943055812323,3.0748612407767273,4.046129456659497,0.614598906475865,1.2165341385104922,1.965082287148151,0.8719665247131092,4.0913429215481125,2.451560432886267,2.685965343607324,3.317065457059841,2.7447188492347854,2.1401015605633713,1.9094691280701448,3.939490574934158,4.6156543011874085,1.6019675463389293,1.415214803450634,3.0647365749238,3.3178299709256764,3.6082546008505556,4.853693383787734,2.731918027940318,1.398164844899774,0.4671009401930537,4.319467845120265,0.33677970428866555,1.202145135697863,2.3563507993372914,4.751222651166391,3.788746214920944,0.6962241930388435,4.238257623014066,2.1385840381065355,4.746879500257694,0.26289915510690043,2.912946906436269,4.1783883909191175,2.823720419777287,3.125595665420653,3.685761192011221,4.002811886865233,0.12354818771976972,3.2749889320018766,1.5904128579699373,1.1399071984574305,1.6405791576563944,2.3471607832013888,0.6064348817296605,1.3666486204204864,3.893925522172017,1.9475772855323303,0.01913362067559987,4.1492080950717725,3.935870845942737,3.2132767464701795,2.7981587498257077,4.028752618078148,1.8586282382606034,2.1548264433925235,1.5790074940972942,1.2246392838166065,2.077116008569775,3.991759065014271,2.2417548017657585,3.881516546816183,3.0822906675352835,1.6720963546013201,0.3823199874056338,2.2023836432072486,3.6448089171698106,4.347125531431192,1.7980596336931387,2.4196966315711146,1.2811123162356997,1.1118948431213949,3.0027382496200037,3.0558079162594245,4.702335460413645,2.617926656408238,3.2860940024641616,0.04533174580840016,2.8678279622596414,1.8216993113824298,1.113713097879494,2.1995756611816852,1.3589223844498421,2.5257751166875195,3.2471400528314245,2.227838297781001,3.675017705273432,0.46365429397415947,0.40786679295800043,3.927826264958129,2.459297083807267,2.6031714443979235,4.808127137998857,0.21621962308661646,4.707205076787215,0.4736406453006248,4.683901324480933,0.3333226838821779,0.6178470132550995,2.998267954816336,0.4186365689614935,3.3177394177619037,1.427582587666404,1.9160052617602918,1.2225471523135678,1.776909487817212,3.697266286463783,0.80565801243906,1.7263764008596505,3.0940080326489747,2.277178055916982,2.745547821289697,4.693899835581466,4.879721624124457,4.33224442656825,2.8744400098300096,2.5521816403191266,0.47509048138905885,3.4714760299083247,1.3950474852683314,3.868741319064959,4.276501748998677,1.485498058479725,1.1850960015016243,3.9720866853162184,4.4565366486524365,4.78166655484594,2.7424226404465477,2.172859979795433,2.250806703035153,1.5082359854961214,1.8826406633172077,1.5019978561815661,2.2479648932640917,3.808281165689149,0.8146740629229077,1.292938034954031,0.17693712588527588,2.543645855020701,2.1364404791149703,2.87837647918617,0.1293450575565247,4.83219550177198,0.5194663340563499,1.7497534271535953,4.6344139263090725,2.73612880597656,2.4968528973523507,3.065358676206457,3.971970247767629,3.5554814403663224,0.379380461025276,2.0926594384269093,3.0547004211939353,0.06004028464839717,3.0531461067583487,2.9833704649350423,1.7079839807743924,4.509421438535604,1.6774168719064042,3.059440937260608,4.906091690812401,4.1939071909578765,4.785027087845065,1.1762394075380644,1.7769770330517831,2.207914895131682,2.1462633350447238,1.5106805561206749,0.6548049751268803,4.533912950616443,4.232606792531333,0.060992432664586094,4.351735224209591,4.858655544281789,3.631810571682863,3.5674861281492323,3.0803933991104215,2.938707030397193,1.4215465695021157,0.5649478136221531,2.8826035217054926,0.7904777169341015,2.6500335689397128,2.1657431682632025,4.032655480573849,2.378298225858877,2.203332565812457,1.940269875139875,3.114633767768502,3.3433423857837563,3.761020542677762,2.4218277581674763,1.6687911060065719,3.1854279763027105,4.396000843379863,2.642441123810728,4.3711998775948455,0.9174261055741317,3.3349710335800395,1.1950428134579416,4.355523031103034,1.0961350579591866,4.692981167577505,2.806737047793643,0.7428333072419968,1.2081128945829034,2.26599880347379,4.390132373184377,3.742425351000793,2.938690028211962,1.3219436477382818,4.485272110314761,4.425884523139163,1.3687198009008517,0.2692298752852107,0.6973478091950003,2.0580001830222305,4.761593226918013,0.8139680361360302,1.0964876388490852,3.269622242744817,1.6235363543819148,4.408141938292726,4.768921742986885,1.2652750807490554,0.08567329473090357,4.09230524943556,3.98632575471608,3.230742600797989,1.3720046384906148,1.4833095956782005,4.247189963721089,4.0209258264318795,4.770878021847388,1.1845638978181794,1.3134854617676717,1.7474744316565105,4.5809181162019295,1.9580090341155276,0.04918671134482855,4.4461393668738,2.397743614613251,3.5891738958179076,1.7422878761624083,0.06448520434922167,1.9226261901497677,1.6940419699182852,0.23266800119661202,0.19256518226592023,2.078229317845567,0.31199945417942243,0.8412546289944633,3.46646327280274,3.3498393427310456,3.2837095951190554,3.787591377378506,2.115598478356342,2.6538091368298886,3.395572581406192,4.348619301712678,4.570866595499382,0.9595218052465848,0.35985622341896506,3.626904376454151,3.3340949241840114,1.58956298369621,1.8475833391159246,4.924108704262581,4.264698759842071,3.715491142369637,3.830963912543371,0.33258308836698447,3.456493937571622,1.6987452755009813,4.725681962019037,3.4106673557222535,0.9980449686525228,0.13679626448446225,3.2782272050463392,2.329983768671914,0.568854728797572,2.37769793553422,0.7559784806822456,3.3592534409894927,1.9329845127642553,1.9583088725079778,1.8694828165919286,2.8561454315565404,2.068700645424153,3.2010930334838505,3.1286103904834297,3.3005890405979854,1.1091401344006802,4.895612403143497,2.422399075007294,0.3474610526916755,4.012716796399751,1.0718084840924513,4.614686769757505,4.325364122997276,3.915199111865819,3.87613392184061,4.694400510321588,0.7113442490034838,3.4672331737557793,1.559137477274164,2.640178541662955,0.0684664928763623,0.5405607484708586,4.727158306579695,4.406737567143162,4.435742431537143,2.6826518226802465,1.3100621617217656,0.7883085895133279,4.351439819389231,4.010540147729364,0.11946240094278471,4.169240865772191,0.18876448939188495,1.0601934257576329,0.4920742595688721,4.407602492900229,2.4247259275249657,3.0679698948794676,4.4126816096019805,3.2721458091252753,0.056032043450738866,3.772813636294895,4.672789783688884,3.823958235388367,2.9074986494127906,4.429570118885826,0.08033495529526591,4.203867836257544,1.1578054474697974,3.4290852763161084,3.942194828999458,4.97294305220921,3.328930088741312,4.088423375585867,1.8332269040660543,0.280444548572204,2.0429193537608628,2.137746183077337,0.8977491409812788,4.484427599958179,2.0328352674139216,0.33805194098087243,0.50570168617317,0.29498394365682246,4.218650584863197,0.7701796948551498,4.657049543459562,3.3434682505501034,2.8243536917761167,0.9040380291886108,3.133106043380799,0.5319847842428649,1.8540464340839813,2.7437449626071917,0.745511989703953,3.8497774259947692,4.998062008837362,0.9829671967768727,4.020335569471555,0.8641447307735173,0.5429467453292081,3.7692445936529664,3.312382365136537,0.779006674683782,1.2408020004500309,1.4720490987738488,1.332292821374198,4.646269101596,0.6776651627429109,4.940832067149785,4.991542223588396,1.8353364947002948,3.8892456835824984,0.9953822902314136,4.989107317409963,4.178213209256779,2.2960041480951157,1.6759829549199545,2.8482433118494974,0.8952215844026512,1.429901082566658,0.20898067645214735,1.3716574980279617,0.9700876514531065,0.24527420537381772,0.20944631057103202,4.49173743725641,1.5274585745251046,2.8186335116235393,4.605986768089833,2.9828392433293893,2.1884589010210465,0.7956488768512693,3.296775560030616,4.090122360823259,3.990268252522542,0.49752874461532537,2.7107871268065784,2.1729462297818394,1.3050723302423228,2.516747526233795,4.459557909931082,4.464609821868533,1.9539589151501757,1.298431895989104,2.8918226409480763,1.5929654232713153,0.29635301652075396,3.5327183159705844,3.7845934409864137,0.5878439169057492,4.355802731350372,2.8998583536051683,1.2490135360462606,4.343561252452,1.4694168230421945,2.9922771000777946,4.194507160424311,0.7289161478045358,4.717080793077662,3.068228794600769,1.5590834826369604,2.2686006777313072,1.1278308280359262,2.427130000147568,2.1919867411806173,3.158620357451869,4.737385940453588,3.0159309044526097,1.2293754292142012,0.04708455642404075,4.185744304867831,1.753721068758829,1.0814068117394393,3.030779104501046,1.6713747720202543,2.297476516179789,3.6047620364073962,2.606240883970866,3.735644877289878,3.0273398886132705,3.292206367572338,3.814761261473837,0.7987749629087482,1.155969043279187,3.833285872340786,1.8908012136940733,3.1693876071439275,2.625222875945324,0.27433005300690927,0.3297700879164145,2.5264158546763262,1.493447196392863,3.363565695427848,3.480885600352064,4.926077919776165,3.3399137597132746,0.022735937107207782,2.9904294990698856,2.3661832746827374,3.390389055304077,4.823622713774787,3.7722440547159297,0.4196550885236372,1.0549517205345094,0.8863537672808108,2.0843491178271902,4.114851583024327,0.8177820426955529,2.362062170726843,4.422015607053321,3.2633248981374052,4.6636759098036515,0.6115631241178954,2.1141756877275064,4.589703498882997,4.975387640874509,2.9454358009383528,0.0434097489665175,3.341895554585582,3.147583227194569,0.29247364597517755,1.4850228493441642,1.687093757540592,4.957940823786312,1.0311662418695289,2.1103069950444473,4.395671361686825,4.385161392698571,2.7178422696861726,2.651980525062493,0.44146784425840524,1.925904921577416,4.697396806053956,2.0167596617700436,1.7418520875889176,4.745192051648592,2.460609732541802,1.957559354440579,2.7093151424634856,1.2799496117318232,3.329693144883803,1.2352460965494516,0.04200692716322285,2.0365290274570915,2.01435096491388,4.581578397896991,3.4069982006435073,4.2699231132333875,1.9510932631637445,1.7704492325362597,1.0877358395568837,3.4787548277433245,0.4810771943818448,4.042075141614591,3.0873791148739373,1.6925035218818718,4.574737548524447,0.4045780717186409,4.055982899347599,1.5532597405497794,4.644822406531118,3.446945920496441,2.601599617383127,1.7834894933382817,1.1174255145384049,2.6594743850410243,4.765252514586359,1.7840531840352991,1.4625235008149362,4.689689490336373,3.891924834120044,0.5301193419057293,0.757910335015024,1.3871055151395661,0.6769225224058184,4.912433862774646,2.359416614392418,0.08238652463373297,2.5523635737454287,4.5446920798548955,1.2667066190660237,2.797145697259192,2.992677232165181,2.620580338513394,0.3027360091903264,4.316831892634111,2.3606709218838695,4.356825928530301,4.6609777932646255,4.764247340691405,3.8515634479260905,4.2924910767601885,0.1356348906297511,0.0758665221295729,2.697449493673636,4.645684704792526,2.473155542660951,4.157674488257345,0.3298157669608881,3.105066910825812,0.009727536395415237,3.6214944545173102,3.106159098162048,4.9961168076308,4.092401563987931,0.7107827889200524,0.8545657613729463,0.4284118023487904,0.21320943286167626,1.1824101601782244,4.136539472025595,4.93510048237495,2.6925311364999294,1.320642188347101,0.10128982875812098,4.592381114841048,4.647121017402589,0.2282807934012443,3.099943961092265,2.2613327227804847,2.966332361867349,4.937527240512889,1.17097368091168,0.24754989618051781,2.1051103222677603,1.826696331700497,4.743055958826519,3.2870824472642015,0.8763076246242119,1.1356727246924836,1.7596664283245445,3.9900036093489355,0.4603242948414277,1.597703508082522,4.42712486570639,1.8032957850286813,4.148521935187138,2.2879906057944623,1.7045780676615674,2.3939086644677876,2.19949484270486,1.2091753026993701,1.3739687767561137,2.526513683942931,1.3632141173490242,1.2016056626507832,3.2769562057792667,4.249003268838573,0.9455750267108654,0.8095409090766881,1.6238465697925186,2.369144784481645,3.8613371399714183,0.3136848998346087,2.0808012685545094,3.6414975607485145,1.832222623294777,3.3498418663515395,1.6490463705071157,2.2292367715552865,0.6757080469196663,1.7617506643594616,3.9115258607684433,2.9400093812187245,2.609800532724278,2.0384154205460456,1.7091389405171609,2.0368470050336995,4.12648156959434,1.1948235578572808,3.91625746277858,1.4284593342067753,2.777840948975049,2.8555446928939174,2.4811472300205217,0.15406554659278981,0.7598182538897758,4.281131404172152,2.7682980248762745,0.21230138122214526,1.6871788759969553,0.18345560901746882,3.127405460595647,2.030843973003833,1.5635866314163316,4.636700823337892,3.221605078924731,1.0688834761617916,1.1448746666937448,3.19614943878931,0.9564957934505836,4.612140198913716,2.5679818964452306,2.140108247563796,0.1880838329004253,1.7940890791193365,3.779418193823434,2.5324163143984513,3.582797698463188,3.8938767483602152,1.416935461298655,1.024554756128584,2.951978045412318,3.5713116666680342,4.09656608179072,4.890052049504537,0.20661177600146408,3.270351266875118,2.9084890024846164,3.4229567030043473,2.6579047350849674,1.68705772993889,3.2247358464797005,3.147482780129367,1.4399761665219157,0.2552635183799634,2.369558646978396,3.380968564850715,1.356029968550686,1.7681937946973236,0.3929935357865344,4.526336007656178,4.720490806384477,1.3512149846470178,3.672252358091667,0.9257691734109263,3.971894386176956,1.270609749202094,2.7758847283043844,1.8939824499268632,2.8007844069235976,3.205139488025001,2.1701529821738266,2.4156635303485374,0.2700333335445926,2.0511154046882285,4.979395331275136,4.729891722553692,3.7552440476536986,0.24385777113813956,2.432838136254553,3.764964235803754,2.508850826885575,1.1625804083936342,0.1956163571329783,3.0487326595312303,1.2921833731645949,1.290625195395917,0.3550684220402289,1.7857903366701644,1.7650628724846584,2.409228100031229,1.6686610610475061,4.582360489773519,2.714742563614203,3.509594995773826,3.0737255866795277,1.72084695025302,3.9521259656947274,0.3491773893312289,4.0374513502587215,2.795896778129051,1.5567780486380556,4.330675444087389,1.461172313504322,3.828419081123294,4.2555830368830225,4.891671357412285,1.6493670848865538,1.6097649495835142,4.353496561485368,2.719840260892771,1.516248392122611,1.024792294585879,4.645314284892347,4.612005062177172,3.912089940038732,2.2980748319531132,1.0666030385026581,2.38112807042815,0.5754987871360073,3.758173459827354,1.999635770852658,3.7943432896035114,2.8365204453224777,3.1504273874646227,3.651470633213388,3.4155844231337653,4.918983521396454,3.7657010628553564,3.4070782215623066,4.909412001668899,1.095205099512907,3.8356588776485245,0.7359892339523566,2.655473860920835,3.45066917842216,2.7673231879687634,0.9235817212482622,0.9260945195084569,2.5774577807689933,3.7675127584754895,4.943907072529226,2.8592294893141688,1.7154569641784834,4.6566562950144235,1.6560548760436422],"s":[7.274388918282324,16.51803299454715,0.8807897388142871,3.6414648753362933,14.491179727852348,12.470094855808345,4.2699901675989205,8.311697837242082,13.066036955568695,13.443284687180972,5.560731727364057,1.3193937392545818,19.39311819343522,10.632187769949578,15.60124051128096,15.99104395211954,3.3931342853613167,17.383432131434464,13.392740850736686,2.8703819374577,16.72633564093665,0.43686864805084547,14.564321885208367,18.24409995078514,9.950627461764615,3.5785649346444526,10.461224839727654,9.006681289777738,1.22012785498673,17.236158718660775,12.116533737010311,14.00503942637096,17.51803425763141,10.216704488762488,7.381780331447949,19.377045446302148,12.795849517109676,12.148302526222011,14.730932157514305,5.555229874946148,11.92423965434109,1.3105243244416842,13.684764293325507,6.613384457120799,15.288040719080636,9.249682490546975,16.998637807427134,12.954056836770071,2.5514036998432577,19.834178235060783,17.610085931158658,10.646027620206318,3.092804243469276,14.778806561071356,5.796656697449212,0.6102923065700594,2.1565257540586735,15.084192385251832,8.717447632367188,7.7449085738878765,18.30105561303266,2.4403366113267477,2.45604368322923,16.72156561408931,0.6276868621962661,19.192610106360796,13.292786187835306,17.444145036880883,17.187927392110346,19.9347893538884,14.96135004002677,0.7566455442270836,1.4053468874858677,18.617364317577035,19.336101936311504,8.508755044287089,13.624017996098381,18.474490872657196,16.426970308646077,5.3789793779115325,17.03154004729201,1.0810057215715485,16.212844773264635,8.741122321398871,15.698472727820034,16.470740008861803,7.058868483020606,0.02199584394844134,6.557002091141744,14.798271773654573,4.794125598369026,14.66471479329654,18.607912199252418,19.030060796846307,3.7041893219310706,8.297013680267975,0.9864188455759804,0.7456279235180041,12.54255375904394,10.493574920461665,11.962914156202524,6.737109981446503,12.115397926750964,7.819874274368317,14.921073359788952,17.370812138990313,5.323098472005032,6.410531824874703,3.2326722245946327,19.69877497808301,18.018412878955658,17.304333757213946,8.342574089040763,7.86063931843056,12.798084911833115,3.475840059513118,9.059496734119627,10.615670586574225,14.297723688115674,19.425156742190914,8.807614035812964,8.726588477900862,3.8356727491019793,13.080318282399336,5.8434476339232955,6.084627251079611,18.136214515117672,1.2349529190730602,17.195955694508086,15.00830211754636,0.6693775397299806,2.6191807815002033,6.237516478912863,11.074584323062378,14.653046330034162,15.088086589300179,13.793838511000477,6.198772707964628,12.18956743883711,15.786321857824044,8.470408410525568,8.205911752655837,5.541314172728438,5.305915748618681,9.763258031748112,5.36946586862173,11.092960021945139,5.0028589461186,11.12146239167178,1.0436760724900385,5.352520116903676,1.7146812290148583,19.290247180032644,4.265968127675541,15.380388260419252,16.348549388298295,14.321808933099316,11.578966141744388,15.303801369302645,0.3071677731807876,12.680030110651934,16.88430549931674,15.477276061107833,17.394779752567246,2.830927890061403,12.011886131605642,3.6201430927958356,14.61774073135468,12.236673777647793,13.738325595502374,7.622784243964209,19.7362423986627,14.771109313697139,9.124932544031159,16.11629655801581,14.283299264379572,2.749349261192453,11.81452706972209,15.59569625614797,15.976979972004708,11.384841555212105,6.933769486115939,8.87645856401505,0.34663963947539234,18.152779642963857,18.080882146022986,1.1286778152445054,0.1322745947955939,11.072255508283252,4.3579096664671235,12.749041951967776,4.943984985373127,2.762657295024984,16.47900877661165,1.6533221982312396,1.5931288951103006,2.052229012203579,3.9568605126133605,16.05388800299505,14.805419077908809,7.959410632974784,11.046613137811892,5.873731501778994,12.678383797998109,12.346384412141255,7.755267160099981,19.772797660267987,10.355896243334492,1.1212553858918195,1.6889757534551864,2.9881654886494546,14.880087447191691,13.702757346097073,9.470160167121527,1.608759564556017,7.413001872921936,15.306328220783016,10.343225960441798,1.4944081323716096,12.975947588265942,12.588704815722199,11.243443988750865,17.570978350934396,4.955011544826524,12.807725289482343,19.053728726825184,6.913915083569626,4.098116501079807,16.136000671043014,0.43043325290339496,14.431074539279756,10.450646062005745,13.518777410447953,8.055213248179879,1.1610540032103245,12.043975459530811,10.731773810142617,1.6645158007835947,17.50898815631143,0.9186923310881356,4.629697484080202,19.64396239674761,9.787513185018915,18.452040531207597,13.884085519805769,7.19075629701635,18.66417811327928,18.64107850916906,3.9492095343966804,10.46302054160436,11.934344593164155,11.528938890270283,0.45845942301828035,11.015553833762963,1.181815423990309,8.25125953442646,3.0650320672793763,18.711500770233613,8.886881977704025,7.227417129445919,7.255778228214309,4.078707960535404,17.670809525220506,4.194215789198128,3.165205503190842,5.5292593816778846,13.6581556844226,0.5436167363174249,11.044669145144939,3.5474203922789993,15.431025690211268,1.5567334313088077,19.940992923962284,0.49552828221082645,7.619634461030893,7.9444085310102075,13.105407417610856,6.118953058177072,10.478133310677729,1.6483483321718007,2.7295014371972703,0.25922029558996584,11.380696529551333,3.741312981257092,7.097028989284695,3.4665658484718787,4.023111658791549,10.155632884382095,9.641301883940624,7.071885905913202,5.346453740655401,0.01724118909260497,17.56605908278096,7.446763785202526,1.0907792909287695,18.307188072753288,10.625047479533002,13.694311884102817,13.545728623832876,14.601499463737442,4.305694638482045,19.8003010103376,18.503123093420175,4.464862322630223,2.542247884905726,4.88001544650738,10.20115597646424,6.980290448666127,18.515761790135393,2.864636882766627,18.557935616755987,18.913616054455694,17.88601727214266,4.336670015376383,1.4795835984880368,18.125658793024463,13.171008244228748,7.887698683301272,0.12144410333627231,2.0475982496520517,15.021432238985298,3.214100633429915,11.431810087937556,3.872421781337856,18.10281734070585,7.929228816040066,13.87511315093068,7.329305793160397,13.779107130693369,0.9409118991345267,13.35849854351606,10.243038231999119,5.304164938183753,7.652871431118622,0.5209429230892448,0.7862689726518646,12.993970736636854,10.106035209853118,16.721622740270433,6.990703618025531,10.068761558863311,15.038665309581361,11.349049616618965,8.894178929610232,18.718787028209917,12.970860099101,18.19436209105559,15.447450760700141,19.430857294361044,15.08714545431005,2.2023469021814934,11.529888318602675,2.8586538279323292,0.9772286782035788,9.009563228005476,16.084870451648925,7.81407635581532,13.799984575492541,5.040830962854348,4.809066607093824,18.487771656753964,8.476124838064937,12.47592400571705,17.57122127532895,0.7856921624368152,19.255943340277113,17.63016780613965,1.9946954766441616,12.61257998270812,11.614666924580428,17.255944997292673,9.410369737012765,3.176021227351713,2.6047451254833787,8.443496375555632,11.578969964738896,12.047285179082788,1.8241798566299927,5.8095121148114925,14.515754511039196,5.964273461412359,0.9187181178211645,6.6409375130225845,10.596751758173934,3.2804125482125768,3.512821331285494,18.96664346727309,16.60717931866614,10.86992261770865,9.372396344990754,16.334393464920616,5.111135933195388,13.850646281932434,1.8688265706294072,17.078998041568507,15.310496986147367,3.7684443123512112,1.1515824143581987,0.1872948073607672,5.083285493938243,13.232295038342183,6.843319405998778,2.8921740347966773,6.083982884921473,17.369193136753406,11.609231418391346,17.9715867030767,0.07087524901442155,11.40311273776371,2.488609368631387,4.79620593594821,2.819148483312519,6.3926140103913065,11.780686916223342,16.412907301955805,10.772114503443175,16.658639407346595,11.639334114876911,12.630039314751338,10.495116271420315,16.349994145699096,15.229884636950999,4.115483227844257,4.6109904959656856,1.9621799144080088,7.168585911630148,8.421752878982023,4.074240163363356,9.403754469921338,5.3793605684348655,10.911073139470396,11.629404335776856,7.75067408392609,1.753960666254919,6.232650706169309,4.345311284268312,9.960909432927615,12.32752832600907,10.134807927631515,15.890737559581023,9.975548390298187,17.734879155080613,1.8119608434216872,3.29541917272945,18.5780442313972,14.584037860355368,14.161411308282975,7.629829680795832,1.9374303000936521,10.602836099074766,11.131835124938805,5.378632906519116,13.227912258191097,6.379812695764193,16.204268076305933,15.51381035590769,2.5587830853020455,16.3563554533248,10.50361865612345,14.020792773205578,9.367943431731987,17.48646490655424,17.39467868992619,4.7963862670391455,19.00008127189565,6.220454648323508,11.75484555614104,18.407948346145893,13.94926884133556,3.2176678681358117,10.889229095595692,1.4752148347253558,2.9618020804816947,13.654555369850602,19.267961468969368,14.616212823300124,19.399360935690993,2.500045458507678,6.678941638918348,11.346231452195333,11.181991691509552,12.559002929701549,16.67828784849819,18.189560570143968,8.135449328872344,18.78821112385753,7.8517010340527715,2.1956919224446203,19.124430288362785,8.863182149200487,2.74414855504169,11.335722251480549,18.134844078167667,12.33262206299376,7.701066640354606,12.321123102344789,6.328919476892918,0.06249651479308671,15.292553448685403,5.816013447241262,12.024943194105617,7.895215840472725,10.140761662257706,17.371203397962105,16.39392204352882,2.3052494339524277,11.998415679433778,2.6944539095263265,3.575159154563421,5.2541139447663365,14.81841496506059,3.6731398705480256,8.297820038322797,6.776141633991535,9.227419493274706,8.366978811833015,12.222622339025563,2.0563385731095085,19.446157948842764,16.774854943820394,17.97084590822232,11.043448549361186,7.522579621204013,10.830323680699472,1.2739947280240616,2.024472439423688,18.44806989408312,4.380489725742773,9.430351668620354,10.820919688415067,7.971658742179746,12.28722566308097,1.9197807168400693,15.230394981059238,2.090308074231828,5.515674426493988,0.6113008095525219,18.792355317813918,0.11444859890088477,19.737073980890123,10.182402723086721,16.177922367356285,0.21782003751464885,1.8730359158599397,8.949002223789524,0.7938929153509067,10.83909496836188,18.45931178074311,7.558181966547308,0.9419312234529631,14.063855147772305,8.696760456833337,18.643361630420436,5.886096268351073,17.445696865662445,11.520019997440766,3.427450494384505,4.147096704451481,13.152423581343236,15.027850876202669,19.01798608841975,11.11004086034864,15.812915268201442,14.990937488214474,9.998917087900985,10.599167718444566,3.1237249531036104,2.55470830382472,15.23787373439216,9.902367338328437,0.2628921448860755,7.88600863715657,8.790698947220141,6.282285781699448,13.242985878994329,6.519697870669909,0.41098664061856915,14.93513715340617,17.327408053755416,19.661546678224635,11.296315191518307,3.4377336536621383,18.477988903129273,11.688747240625904,11.621623285807958,11.541935348029382,0.9298601809946438,2.795314522168195,4.614606531091949,8.38215697486676,13.77587655933121,2.222792376941589,16.078119639121308,19.530472390143743,15.872576517360786,16.478565055650396,10.769724285570494,17.96197366324585,4.481241794376167,16.19467273238802,15.4423978183965,8.862945288975755,17.970285267241238,8.949776983050892,16.15485476793898,15.082141178245877,6.2817983658261545,13.567189017829122,1.4115320833468692,18.561779914075633,19.310276707584993,1.881278635259358,3.33056666307725,4.046886441259425,15.253310268796131,19.162141842801496,2.490548019637857,18.790856913499336,14.748575496842511,16.978143658847593,6.219469434142408,14.872075993376907,11.87302026493208,6.124466823783634,13.219056115834181,16.839150883221553,19.854236775401763,5.694427086240679,7.3137897159372445,6.078961710711481,5.912444091180937,14.905766933838716,8.49041384994968,18.494596448984208,3.9240461584397934,7.911516364486859,18.073696058358916,14.963590971665557,17.590635426837387,17.89254099407642,12.941510473347702,18.555206657004376,10.748553391808322,14.793270511707085,3.3934100034780634,0.31246579909979477,6.52283806759403,0.9297393754219829,0.05215730628544968,9.90244586531254,13.134095907697798,6.456582433454061,7.041796425217086,18.960124891052974,11.276439762343076,9.008799984771208,19.529752685512598,9.074034654201162,4.416287752904382,1.3956608388770197,10.630610469730462,1.4564679128732427,9.173528218604364,2.364786149078175,12.622166389590959,10.195704040260193,12.672642617616567,9.922987530782175,5.350634643670418,13.718526874187717,18.554533131273967,18.68237761380737,2.752975223280001,5.198477426572534,4.393470268183055,5.151025117424379,18.777932073201722,7.82305236926514,0.14034622115297601,12.214832950562977,10.2302064035253,17.63150404295859,11.8846539254614,9.485220071636542,19.390458160314296,11.182800523305442,3.715249651656105,15.947148728698197,10.902594440422519,11.442302704138232,10.728650099071476,16.124794498180748,11.992755518136775,18.6791930752746,7.14643370162968,2.7174261592452,16.5620705885188,19.239420974580078,13.173973450650243,15.990996295516684,15.754907260250711,14.87151616513303,13.170481493957125,10.128370275269404,2.6575249730754447,19.315690131435616,17.14037944900546,13.189967580863918,14.554370952805442,16.84633847108474,19.350309701287838,12.825023430531552,8.334395797247694,13.527430976094731,7.621384195797827,10.257084372373368,17.895704051637047,5.560155711028938,15.567121667821148,4.544746231326093,5.430798980690641,13.713744899389777,4.153544384482717,18.343857518678973,3.46935698028644,8.728498808373612,10.856726455081937,8.671500592848664,19.264017189823612,14.673925743927008,10.61099474574803,16.140342953528585,10.627466444444075,15.231042555585228,0.2734686462263092,4.467478232630748,5.566853326252108,16.903382126869857,7.228976409351464,13.760317976460218,17.744364565012592,4.087124718108104,3.2555326856834466,9.478692988945031,15.97525613611499,11.491993541992533,9.708538337629067,17.458844619700407,12.104817952665346,13.26631392940254,10.523546921649768,0.5739216104231915,8.72593916889107,18.52814458053158,10.389365441758894,3.631611854102643,3.9335031797573583,6.666781233613683,15.748754432622247,5.79021224527184,10.401426343979523,18.653677559752,0.10667832066503902,10.072641869083899,1.0367923925896472,0.5197458298995272,18.192720669795953,8.35724047181583,0.6082298120836249,12.722724493521088,0.8287552610679194,10.36811367729424,12.925326633237635,15.49253040989722,5.837440949634667,16.789515595511418,8.872278693040956,15.662394955413443,8.86882141168475,7.78771016548951,9.432041069461071,8.383145994519005,16.782607034379424,14.644927892408308,0.6376664469691118,8.283397043576306,10.772960429743716,9.78538985025898,9.791974870944404,0.14274775384133243,14.731108202844716,19.747289880834458,14.74329180416563,0.9201403556205134,11.5971838909413,3.7133111812982333,1.580476630401062,18.07868119059527,12.95048910843093,17.743291081079697,15.368710932522358,13.521282369119184,10.952398517523259,7.143565251373274,8.414532360883179,13.34544075491802,19.119452264995655,4.835294457421067,15.422304652650837,2.4532710690626924,0.5464650876873689,12.916943538586034,18.79054313486952,19.532136576558084,1.8872610883188257,8.23337790141839,16.97743751813438,18.015709742965107,0.4229439969011528,8.557599959746982,3.1184750561892027,4.621060708293836,11.73732909549555,16.530676387116472,6.733302465049418,12.918356815009941,8.43989468390442,12.83557645947341,16.44076477516805,13.677446092731728,5.089494676573865,16.839775301423483,10.580382832180376,11.409070416516842,17.879727405518935,18.00757403141363,12.794803132813808,6.689439488360351,8.959133710290272,2.095587480720895,6.338884808513692,6.146166187790811,5.02710043427367,13.648574299293937,14.854516279855265,6.818482688357075,1.2932781888002998,1.5529859649234856,17.36893997325266,10.468635032388033,13.274189272372237,0.30935968986211204,17.783795319200383,18.23353688237571,10.503844511209394,3.2778711440590635,12.972644743483649,13.11010972141991,15.449783584907495,4.702258574222484,15.11847214516635,9.830712525047062,1.304626814917862,4.584172144321292,2.7306834166472838,5.92744534652597,9.413920484194197,15.600764629735608,6.190995886664115,2.5812678092207086,3.3674496101912865,16.134737722771625,10.279355730437807,1.9297102367344054,17.978443401323283,16.357877505877305,6.30648580593784,14.961360093474392,7.520262792270596,11.740826594145117,10.164272903724614,17.418195050804,11.684194238339796,8.791900790275022,2.0635437972275072,14.28127311653447,16.7714260502073,0.6057769844376137,18.213417546651982,6.060122420663245,15.500963142098186,2.2743717086516613,17.41990860007107,18.23737630609811,8.00966507890501,18.513866204867956,12.189691195562578,16.030403617071688,3.3632268037996926,11.092142552875766,5.620260317484118,16.29304811243976,13.692522311021214,11.859618595894052,7.877709866384515,5.39103983608797,1.31190038352484,7.166275900507424,5.525293423454718,14.240905784675482,13.246269066189956,7.343289790124863,14.289929605919296,15.154195773947258,2.779202451198599,2.3574922147133126,17.326909751245665,18.747883342119437,10.996697296565308,12.212801650885915,10.742974709189298,4.596911622833377,14.4700607169206,14.843026715400015,16.043296727013985,11.933433420997414,3.5139825469243924,18.698632624218522,13.907856604962321,11.744639943482333,9.54412796169201,3.8396966911799257,10.632511400523907,16.5167577992181,16.599304238550513,18.055647970753604,10.276433136716836,19.3050340861338,3.123806972917982,9.903787039399736,15.656655005447618,14.483165155086946,6.724426040669469,7.698664811876466,10.3527235071369,16.08878050712303,11.954972818660403,13.739827234145823,13.611202521262339,12.657662307454718,4.707216704539556,5.039817514514837,18.227149495120262,0.6119622685015003,6.668374066404721,1.0654711469172318,19.28334117895887,15.184355781555992,4.996094850659598,10.179583296625893,4.27952000939531,17.074499402017995,5.749240632136918,14.625851446778832,13.829723748743845,16.223982381039605,8.459862182245903,18.120735660348338,13.68563479538949,7.043378416011552,4.022482047308293,15.47246866275339,11.458230809302844,4.042253942199396,6.82305029331324,0.06767409930469981,14.28407631182476,8.02813190946206,10.104922036888805,5.423960156562639,5.0691849837293335,1.3641814419655107,5.636295064871097,6.9166849140721,15.872559496343449,19.255097803521167,16.655979028958793,0.9507564763093246,16.532366440120203,16.52141846967038,19.459002052348282,0.14796763893828668,16.259301962085033,6.169532353950027,15.887315861172286,12.894363742441687,11.577830180827977,2.419279819440394,14.1037587503113,8.722128152851983],"mu":[0.14267673046481089,0.537940179749635,0.2070129940041554,0.9598164413834547,0.9069120939863868,0.3371886746139581,0.8739993737638696,0.09915292900993333,0.46600021953019644,0.5443227669148367,0.577628043882465,0.1983006832654397,0.08001664270710407,0.2713699329757284,0.8688081323857366,0.6576553517361228,0.9482472091035365,0.561072850516442,0.23207824936906918,0.9075463906009931,0.8570500677827342,0.3094137544016229,0.49761103808392404,0.8559390232632123,0.8440113572039192,0.24453215982563647,0.43918392689412,0.05527778416919116,0.8028184261807045,0.5222393445851699,0.2254956994764652,0.11774949561757975,0.09957715380234933,0.5740615907569366,0.1483915270895324,0.3746661451640765,0.18553901225284886,0.8053866346172638,0.4752586007241326,0.6115131105221814,0.3119503373168784,0.4075817926835008,0.0401379556940471,0.1607738665261067,0.7955971799823804,0.5960548857400088,0.4563468669806885,0.5285389593936807,0.3761345604542088,0.7314251441719208,0.5325116366443057,0.21635866928221503,0.5253361279154936,0.8709114789218657,0.4985105745696188,0.5950914557198912,0.4902528518261773,0.3125753632142563,0.38599387429682186,0.9759455138706039,0.06176015539233459,0.2320250438886584,0.6165461074823833,0.39981804579611935,0.6425775660753452,0.48325568459970225,0.229207104725065,0.2744428597209001,0.8891044959036776,0.4373633961552956,0.42919005506209595,0.11621748973957491,0.35979059905481825,0.5083866428249946,0.9609320118904987,0.3042620401674847,0.1702944042313621,0.3806565998803644,0.7289555653290576,0.0909072035860985,0.28236694916059646,0.36392279031603225,0.5891466758408845,0.09662571591018465,0.8621767194445156,0.2314472312075726,0.47692281294838446,0.670706410475512,0.7235327630560549,0.42020656668959244,0.5148867029471016,0.2652331430718613,0.10823073435259256,0.8362519694130353,0.10422007018574742,0.37844451161938486,0.889786479679767,0.7174811720383907,0.7407723199495386,0.5360618155807357,0.21023841469721716,0.5816717499043591,0.5459463924830825,0.8620949475203283,0.8265911287841505,0.6965061882813801,0.1127216642371045,0.9819698324754003,0.10098583603792899,0.06868658087673074,0.31445773470815075,0.2550164359733469,0.9574965381664211,0.461083563956284,0.7966578384823262,0.6135397499468129,0.6542949880744249,0.9493173957166343,0.10194638315320348,0.4776916632471988,0.8141920526000364,0.09479165842240866,0.6039389484451918,0.5375658770726133,0.9789045061346977,0.9897992962503137,0.6097839872457393,0.3274002187037952,0.3676432712840114,0.08087295886030454,0.2425313937529483,0.5405649946183397,0.6945800828978304,0.7853381869579183,0.16977703771958996,0.23086078318691605,0.046875536466192136,0.21943096896547254,0.8470504244467536,0.40119228544740304,0.0067165912656852456,0.8745233588604742,0.06751156424809057,0.7685778976767652,0.888354093372034,0.41275361752774486,0.18842873997550647,0.34293912113570824,0.02533704145587934,0.42886019122340224,0.6131112826701712,0.8785092730201911,0.6994631222389169,0.9280264628053125,0.24137103842561758,0.38525111174974636,0.7128228338181806,0.740417495567532,0.05294682929722461,0.2516315869721517,0.0416450974185143,0.7380899588760421,0.9900268534558787,0.6743694894560428,0.12189080984121858,0.0056742164184000465,0.054315087814369,0.6882941634809541,0.5949206271035068,0.16429732555997845,0.8375883042188845,0.7831490131227217,0.9124950338262643,0.38106733385196434,0.86511515025226,0.028193083302308297,0.6972403835792134,0.9803127035709771,0.12087254540790093,0.44655404679923216,0.9020488557378548,0.6865431472165855,0.00900810558938292,0.9515754614930807,0.22447752642722674,0.31579978865962577,0.6648185178223511,0.6986976382531547,0.15282711985117192,0.08036168986557901,0.02592579006808937,0.9343334838769095,0.9912059840923988,0.5232821988606717,0.506812422944724,0.348968825837078,0.8052213148491494,0.22137021857921568,0.18426634282171395,0.0791895907773903,0.31804408542831775,0.6668937012993694,0.9583026283499079,0.45107819275522076,0.8648958428600886,0.12907751445099325,0.45598429373843596,0.4873293827388283,0.65829030905571,0.05620121019573254,0.15538376590118586,0.40902776021818044,0.8366861379498487,0.3701357556790772,0.6968427862887052,0.6874743072725522,0.8455847743477876,0.15914040795823614,0.4140307462562658,0.23135695745514018,0.8057505168113246,0.9984917815489518,0.37534981450915184,0.5774116007853831,0.5609911809109651,0.7539533189385719,0.7373738856290852,0.09609736168736305,0.9421040971290513,0.6121881936381881,0.7351127059986624,0.5253433108595711,0.8339212090148986,0.8723896597624219,0.5238542123648455,0.7056739419214015,0.5015002138231641,0.32601522121121196,0.6479191231916144,0.15996316003120592,0.12705237646195422,0.16746755966443994,0.007487752526019964,0.25306690791343733,0.5290189250934163,0.3357636609356067,0.753064214485115,0.9330209911672869,0.601168397102898,0.6140101808957539,0.03714059467803521,0.12446564713587405,0.6295432298531731,0.7110311055007885,0.062342915826439915,0.9291205153158018,0.2680903768394767,0.4769669976590125,0.5603623622546228,0.8397482116809409,0.6117965949670188,0.08696784442783745,0.014386872927315553,0.9960697952646462,0.15429410897511353,0.26190483080962257,0.9917302093752327,0.4837485822213303,0.5040849592708572,0.2548787690601746,0.631055817657572,0.832622446781367,0.22698856988114402,0.07133902062003439,0.6265112836352804,0.9116145582609003,0.6186616220342815,0.5848185085276876,0.441377369362838,0.8013506314038334,0.4207248260659959,0.432272860766411,0.24281634441225752,0.4202373825716168,0.6140796112577869,0.28159008869817814,0.7608176723241915,0.6854623010624052,0.3841289067283975,0.12343493801626404,0.8192746659244721,0.5378794172125034,0.017228435952225007,0.2226481286517219,0.508203892829886,0.777474974155457,0.23363010704054687,0.5114701550075411,0.6115311300216784,0.5276640862747839,0.002051998441717773,0.656208159729639,0.6594658594753156,0.5719500375303335,0.7551300726386361,0.46132137846849863,0.15002593467598557,0.19952347052083996,0.7763551572669052,0.7699562262604274,0.770835891249539,0.9702117668193424,0.35552026935715353,0.5174166880162401,0.3318805246048775,0.7825809962661234,0.31226916594643894,0.5046838751456135,0.6964103859466555,0.45933572656538013,0.0865590128435445,0.09535070876008112,0.14287982498492302,0.6136385266563169,0.21472760475950592,0.6736845320702582,0.2684603787215145,0.6090014062368774,0.3935355005201129,0.9183028409723588,0.5312970633724632,0.4503650899438807,0.0304820497978584,0.9264155568955317,0.6084683936877084,0.16633375494786207,0.006385354585663583,0.8111411249577292,0.07924587738171018,0.8136884400052591,0.4133736794412348,0.13489172520291048,0.5103050209085926,0.18198456878812297,0.10549548206330517,0.8020538114345241,0.6381987058933394,0.4442042411981202,0.05755969730928068,0.5039377520748749,0.2303336660049662,0.3946169766085559,0.5463814289988747,0.0732698575959887,0.08302738101823537,0.8149688675213516,0.515916823715739,0.7499200363910805,0.27509435397728144,0.32500342059266196,0.8556101882784224,0.9646687760777073,0.6626503620768358,0.3732399693864392,0.8214882526358267,0.5262745141938197,0.5802988925689672,0.3384385207056131,0.8183455431281128,0.3255374903413306,0.45561521464648536,0.17786872266773246,0.9058472037859937,0.07481783731808656,0.717649203374696,0.782144467239493,0.0796917037663647,0.35074246112796104,0.11976791379347573,0.2716330735027126,0.3070234110060144,0.8116337023256461,0.22483866863171365,0.5065906778073934,0.9030707424803648,0.8949493912294639,0.15241543918231937,0.39505804432707703,0.47523865471474647,0.7212968713188395,0.3668393885921313,0.4845132502251823,0.7937146569310065,0.7443887828991538,0.8007439840768265,0.6957573311320897,0.08321963620817407,0.43741848365497504,0.17684839925516416,0.26557484551736077,0.44301466055505556,0.36267312452105416,0.34174247525659407,0.4383900129062126,0.11740066255174098,0.3368802943067981,0.9111609318628018,0.37121895395703564,0.7316691739652945,0.33083994110596127,0.201147108925952,0.07205865978156512,0.08597521757790183,0.25902704090310325,0.2805093320440861,0.3392096504284059,0.7654477562070952,0.4777619127161705,0.53244813807715,0.814890570907354,0.0797352396047093,0.07273311060403698,0.5997159402938061,0.6064388830865597,0.4596044364861218,0.4195657984575687,0.928268404569075,0.5329082491252732,0.9824221697786781,0.5467518655427206,0.2933082318964637,0.3671314099997838,0.9905660812841932,0.12228594149512961,0.7118268352727894,0.873052506948647,0.4641919138855697,0.9688069057230655,0.7763630360054403,0.18388167690101564,0.5627210789959276,0.7297561427747341,0.3555645594234975,0.009166957327712444,0.2391124528699884,0.9680959640039859,0.4323724127952717,0.03261891552854368,0.8146829972176037,0.17778213656867337,0.9554444535429192,0.2452414609037854,0.7449869746772917,0.39838345219089355,0.5240869390298191,0.9593509853001971,0.6079242216118073,0.591502263667375,0.8355666329624083,0.29463422274543083,0.6286867676836951,0.4299941616551486,0.9592586597635764,0.5928855259950319,0.25558575275811335,0.278834791757516,0.6176787731732283,0.9496190065061967,0.32622058894755823,0.32143193964525785,0.10157273461684224,0.8483684801596554,0.027590180279911225,0.12473011938872847,0.999631888672081,0.08048463451700671,0.12130304944860582,0.7332824432325116,0.8315973734436444,0.6568968932959249,0.029501716408883993,0.7669005638948496,0.16020340985287662,0.6283044170371455,0.7026286416158019,0.026850033103860804,0.11161535772208353,0.2505388969424871,0.9603899909343467,0.7810129850699752,0.3261387466847496,0.29853075532259354,0.31822371700843166,0.77017686635272,0.35653110002703303,0.4988262434871964,0.8309257961281089,0.7767123099483759,0.49445782373311675,0.207392365436744,0.8616574698302073,0.9210866294415976,0.3491516307426781,0.14379420881625093,0.6209643365433157,0.405409486067565,0.5626574045550232,0.9428281363710456,0.5053943027690893,0.8460718021249087,0.48016962267904906,0.7035429327369569,0.6414570106466837,0.5515217124801362,0.4347326772080782,0.6828209582190667,0.20779519413192116,0.1918851356100033,0.003659051292236315,0.7039284285129059,0.4859921493711594,0.8976548186934126,0.8029498309524052,0.39340017279820017,0.6966274814970863,0.49264195879882955,0.24003632461616542,0.03288573126054839,0.8781667375421196,0.7797398656744488,0.22068660627842585,0.5350920119856826,0.3334141352455109,0.35132996675227535,0.7825440992580468,0.3523258565865761,0.06072373983973289,0.09866939396615404,0.7872222073777762,0.706016385079077,0.5588099299080316,0.8425363043391307,0.626999440223003,0.1148194641843765,0.9424393528669173,0.3293767222466186,0.5419477935461969,0.9350398010896319,0.05750223266791843,0.05881225707382831,0.5386002091759676,0.41090392995093583,0.03510270901703216,0.0978280486419072,0.6719952956647293,0.8557411085751949,0.5145677587610111,0.27149435760983587,0.8105761004909642,0.42940468876114135,0.6370721469188241,0.6324538128105848,0.6163341066543664,0.7682908528458157,0.9422382974263783,0.3429994973044781,0.6429017762501903,0.25816252935707906,0.3889095804121634,0.004129343992934853,0.32719431101471286,0.4708718431787109,0.0789749480126174,0.48403160905679266,0.6604430162095176,0.7763315907389343,0.42787538814758963,0.3423779346630349,0.8128037419804408,0.6670828375395002,0.2733417342733788,0.7432003169283827,0.4096288710674718,0.1916508890614077,0.11548497499040722,0.7846686229446065,0.49269373296890784,0.824025266073326,0.1661782592759602,0.9048852450225797,0.5164275166030423,0.3801426642305641,0.2832569106222065,0.5961648949224656,0.2647657310443463,0.09035688429624322,0.6763908138608754,0.6570757981136903,0.5434643126891812,0.34435311399208635,0.14144520038911823,0.045687547350062196,0.5541057727695518,0.8293170861787142,0.36402802506977405,0.7950714130039738,0.34575889960657125,0.9747372943572172,0.749009945130966,0.9492450760143702,0.006987497931431941,0.5000770505608119,0.3143710248318792,0.441626869205062,0.5553446007488043,0.5091849134076074,0.946873994011193,0.9795543630575194,0.1974798279693739,0.6159095048429821,0.04551645056158149,0.2640412117198314,0.5580783085892174,0.3008569841806372,0.7317729858365354,0.40093839326555725,0.08515391093186553,0.5956472467907377,0.8403086253826315,0.39079540519314726,0.9873037596708361,0.18097746586574415,0.14727193424487162,0.8893248278341572,0.6188602369014633,0.5826366900771238,0.8749108477370837,0.6807388637817027,0.45340446276565927,0.4723540629808243,0.1819280367727525,0.17243469772346032,0.3521900041104582,0.6448586541806969,0.8205795159859093,0.6013687067285622,0.6581946067570885,0.10705103979206099,0.1480636015954251,0.7224622538106504,0.957607773710812,0.03374737920607207,0.008125507789409125,0.9121815163922673,0.21340856541631514,0.24350967492137432,0.15431584968269663,0.1324261254741248,0.2640924550872794,0.9812557183000554,0.4826496167403047,0.23856621135283906,0.6010396052015627,0.10336148468818052,0.45410628580199686,0.6450985110412817,0.6526203823346346,0.7776267235378354,0.4422863035562363,0.7896315607748547,0.09620225987396025,0.10651503545520202,0.5966019797922666,0.519550292536231,0.5288118433345133,0.7057075752960462,0.3071095745329475,0.33426179237968845,0.7338579139527148,0.40275989422697833,0.958030196731436,0.8373581747737331,0.9423724723787603,0.2957087138347694,0.9403457210561685,0.739367306851316,0.9002619216551555,0.16567604229304211,0.34390563685731923,0.9455074805453993,0.4223728166952765,0.4340070041802122,0.2617546656135663,0.22395685187561165,0.650757258454993,0.18515109369107074,0.06614278035364518,0.2755835266883273,0.7122866149302423,0.8551217060651835,0.22860336261348313,0.39870142733301983,0.8263430290836431,0.8813938673761081,0.9854494436224406,0.35595003192289876,0.5706787323160005,0.8584667284988248,0.3189989405307405,0.981871183385342,0.3680505365975517,0.3550708405845502,0.5227631588330643,0.7791642720421788,0.20729308273095648,0.5777055253611758,0.19852936143294686,0.43607183495982627,0.17315455498068677,0.9791517076734442,0.8410858055733332,0.4477225257549968,0.9460326713166913,0.12830398867402115,0.12260440060404743,0.14130978445292097,0.19219936029253915,0.9688421014021582,0.2882177521151985,0.3025691047834169,0.24947654826686616,0.8355083678816142,0.16487690146386202,0.5495734834547754,0.2920919252950869,0.06818586533911031,0.08188484222080183,0.11604384406115975,0.43556860581978807,0.28916697962763926,0.8885661639641513,0.44012658709374897,0.6489893427717364,0.7975402907962095,0.5916029051232532,0.3638591924554233,0.2971540427607977,0.625503732360914,0.3613335751064204,0.8914559007568275,0.514784799703021,0.06179895290212878,0.8995092469519528,0.8184333178833374,0.5042515723009553,0.19558843133687942,0.315838797343599,0.495475758440832,0.8849752077380726,0.046797241994490646,0.18950577421212222,0.293485254966819,0.02922640801498355,0.12611569963277702,0.47837629651706104,0.003453342753739763,0.8071120018026865,0.9281775100798462,0.8730530060404653,0.6550211848480632,0.2046040342665325,0.9908700916724973,0.8286998673194859,0.36280641654446777,0.11134614789936093,0.9964167108184212,0.9534642653629579,0.7648024714661397,0.6724390666991322,0.4660753103373012,0.6342152051052263,0.20786379637478314,0.19493179098507207,0.10874102252152729,0.5700751133493229,0.8902573257834656,0.06950266956615936,0.7363578751453215,0.3390892893220989,0.5984940285382518,0.42747723374752367,0.3064764085153202,0.9431481648357514,0.8995294275396195,0.5155766594601241,0.253589981852699,0.7054663798035938,0.01201145220898181,0.22044931829247738,0.2854992440286779,0.5342233152241698,0.8489830058796082,0.44718755158085965,0.22449061667564219,0.29867687257987074,0.9867833304204712,0.9336553477682066,0.9578914428617116,0.3915273478305026,0.44280399687267846,0.13929238039984582,0.7795018611513695,0.9961564177029596,0.8445431713420593,0.08924367519824816,0.3321551677282133,0.0527244864266565,0.8914890076265491,0.8041888411317879,0.028474666405219118,0.113465351832166,0.6438129056621908,0.34023772712704403,0.07982648536867432,0.26801199564654254,0.5427307471971581,0.29672483447416576,0.2148352176503341,0.462600015203263,0.6540396950990193,0.7347554381114216,0.353690379554791,0.4412328761558122,0.41002214571814366,0.6769345261942232,0.2229187705567579,0.20082034935033088,0.4026565536858986,0.7567117733787991,0.2830370249815142,0.5383158269693116,0.7221852263590471,0.09474049147851482,0.25367747714135414,0.585932382514291,0.9127523493004457,0.6596370814410828,0.15900745552380147,0.7031747069492453,0.5702028067425031,0.7076291964700407,0.8076123107210831,0.3526017215943371,0.01674578778995528,0.34593209867128705,0.09078005890203156,0.2803766246799264,0.17917494046881943,0.4568337769644233,0.37384335509130096,0.8858982924103413,0.8789105327196856,0.9623310232012068,0.6233203655419233,0.01850881978482044,0.3679467448044329,0.9920075900101557,0.14470483908026166,0.8332635556755985,0.08688027150911748,0.525340400237367,0.16468383788278218,0.1798756556776464,0.2792822238174806,0.8423951139836277,0.41301143825759734,0.42017910077692244,0.7965820873365308,0.9769352479951181,0.39763110071300445,0.20009015103044714,0.9322968493885544,0.04921205870762635,0.29585011059415667,0.6597165897503869,0.017991858796301052,0.019257717159427257,0.35900131971217086,0.8437912234208036,0.3750903259645135,0.7087420977849332,0.47002758203024153,0.21704128402486567,0.4540070354659751,0.30977840952974356,0.53597668023184,0.09444126162645716,0.679600846118239,0.17567185984698375,0.5795902759025848,0.716382580906338,0.705763586773277,0.9774851559090374,0.37741913021613827,0.6582559807327115,0.8726400730956114,0.996069042086696,0.8786895153342063,0.5570170406879777,0.020760683052710283,0.6333679143429807,0.3209853313846083,0.918131179799426,0.7726094231997465,0.7644320161120775,0.4174654340574815,0.545301454346806,0.23760300993845407,0.5199330346839981,0.2945751571638662,0.9416351516817958,0.7589099922541207,0.3136087236307281,0.0019003503623857831,0.9960564881421721,0.24081723262830068,0.22539012209164722,0.6366962317953262,0.378735540795343,0.3130381906092181,0.5789004891881806,0.76930742147585,0.39135038096688435,0.6259491756114879,0.4354544873851567,0.5540753580153683,0.8494768380471773,0.20249574535596682,0.3792679281536566,0.1353141249806875,0.9458485389379332,0.3450860949437411,0.8776079784172681,0.9118107876620216,0.3931346992500737,0.20344499092482615,0.3796570399365624,0.05454020170840912,0.7759640222043058,0.4331435601718736,0.8933199194924928,0.7587772493914926,0.6186444458400853,0.4047257168659666,0.829209285428756,0.1945166771713569,0.16384949595785803,0.1200988211155889,0.011230963740966438,0.24668931759360424,0.49801721682064004,0.5405766601761075,0.2550272121855339,0.24094178804996202,0.169148959983356,0.6063198776008376,0.5781888624486862,0.16810279270342554,0.04933656319629698,0.36237854846941464,0.4265927886965688,0.006284281162988847,0.6615399245598994,0.5481831125742413,0.4744981510762185,0.6720566402768364,0.4235147213618682,0.5287883406426961,0.3729630043809604,0.322330681290822,0.08313257323064427,0.624988273037578,0.8213384972496873,0.45233971902604764,0.4751302252243066,0.18113711157793455,0.7892364109518435,0.13454245021433509,0.48773850442544253,0.9485980486206367,0.18060281151763147,0.36112284498686065,0.4729462541441083,0.5577813855249332,0.4720313848533526,0.009637996557181783,0.39297605564403115,0.3639446171377696,0.2536991492768166,0.8398628938952755]}
},{}],107:[function(require,module,exports){
module.exports={"expected":[0.009074596653587872,0.023175993366237397,7.3820582073451205e-9,0.055800572044619696,0.03146999919299366,0.3578960873216818,0.4001383148316418,0.18489961575812547,7.6408866597282425e-47,0.0027753996012777464,0.11399176751301693,0.0026733093737277597,6.0345103457332395e-5,0.0851149487152962,0.022850945705859042,0.06160508123449751,0.02832722167685684,0.07271863013793409,0.26896646691399084,0.29141887449760245,0.005571252281530314,0.07678035844049068,0.26604368958588753,2.924451342193028e-7,0.38415466423502576,0.022438533929021447,0.03194724977264782,0.0032065805818089974,0.019297548080655827,3.585002594063224e-5,3.098679046371304e-16,0.075946687924035,8.11273164235605e-18,0.08780914115793576,0.0011947040554194063,0.12438007764561433,3.146754443034636e-10,6.593715905861557e-15,0.1517307538169205,0.08679762400412354,0.017498188173290536,0.002398871351402261,0.07244570488482444,0.07143989546112806,0.04615871905730571,0.023741591965859035,0.2892206693571446,0.10833850689711813,0.011290291478382957,0.0001357182179218776,0.022077979405154248,0.014724818591569572,0.1858198340148624,4.518696115584414e-12,1.1048684637688252e-9,0.2692359726767767,8.757914222349318e-8,0.00017965808585933504,0.315935246449082,0.06800838377436871,0.0012606996536128807,0.0024922140598190494,0.14479986542485476,0.0001092847966009464,0.16358431424980824,1.8193183489615128e-17,0.04784899745501401,0.0231798549801287,0.026721537192623702,1.1305742197902356e-5,0.00042307524603090965,0.08418942714164755,1.4671225247920354e-31,0.0006747226029429216,8.21505697489539e-6,4.798201988619583e-16,0.04684398293284073,1.0169726702613116e-5,0.02572415294217861,0.01756459472088479,0.04239592972999659,0.08673869129311464,0.005273754644634847,0.0007249620993579026,3.9482338143831274e-9,0.02176592581571468,0.0006391461466945252,0.004023033254023465,0.006517401185623913,0.00029699809495938126,0.0020845896280828778,0.03200045388010342,0.224042070372691,0.005282686388698318,0.044687996951704834,0.00044092845481004584,4.3637453846811255e-17,0.012864007338689788,0.15919691227020583,0.00019182222262953896,0.06754793300069936,0.04225002612450593,2.8175882089551727e-21,0.01433360861705085,0.16981775153453005,3.672680947599743e-6,1.0110698725219624e-6,8.663704899030466e-9,0.01505486103852666,0.2737046294370451,0.18640384107272237,0.03511980500046642,0.0366665077058617,1.814195440170189e-5,0.0024088734805289983,0.04255157029914171,1.67677255097839e-8,6.187413157142279e-9,0.029063891372563776,0.027243547069199694,4.402685407575867e-9,0.007767175597523477,4.287280204412194e-15,0.021268326332575672,0.035975750366197004,7.948283351679364e-7,0.03086577562733679,2.2565714320832885e-21,0.08457448819966215,0.0030797216303102438,0.017018419806410764,0.09712170206715655,8.736713601396564e-9,0.010036703952884855,0.012695614274527227,0.15812443560114897,0.1755828947879972,0.00017914473833934927,0.007564212910106653,0.05348889181093822,0.08161084796384882,0.014322181561906643,5.3259242491674145e-16,3.0148555301877817e-12,0.029576340411748545,0.06701440783517347,6.648172294309725e-5,0.10290127028314601,1.7739666191404036e-6,0.24181816626993521,0.2172278460378962,0.17957587591446322,2.1965364047456766e-7,0.03442707840557189,1.9220082496915e-9,0.00886636951401994,0.0007609271737163143,1.1324180279787743e-5,0.18957733262630655,0.08602125049746172,0.12750727262694742,0.01795336811005243,3.69053474551504e-7,0.013362631270221855,0.07443843454697399,6.54571763805e-13,0.007700787041625763,0.12725382699270205,0.1891075569945361,1.7658815755509795e-16,0.4365533559782644,2.7031940575241863e-9,0.0003691929000797208,4.1071669626945826e-27,0.0016704878685035568,0.030185975805208886,0.06412081760763444,0.05161249043138805,0.03658211548799242,0.18288822628108778,1.4376174885212758e-5,0.010133074618205812,0.004526810926423427,0.0013259494213582097,0.01884004824673176,0.021920457937100245,1.2975550557431026e-8,0.0005094661696863339,2.1170328087970002e-6,0.014686231992344975,0.08255527592864023,0.010709386405983165,0.02821898003793166,0.056487280029040327,0.022063409631818784,0.011180757085418278,0.054004028172209964,0.08114178296143937,0.012127245626029863,0.010361585710312655,0.23012774074100545,0.024953030687851367,0.1495011082158757,0.014748838731773666,0.0007622517060572659,0.1753331960382685,0.002820876889752945,0.11994963221384977,0.31215326309970026,6.1775949522837e-6,0.035705085556453166,3.0392528110727458e-5,0.0022495303711525614,0.08831013262547907,0.3698115154425559,0.07358613744265156,0.12923827034956345,0.0011932590293792966,0.09014515709173741,4.3247026090806574e-7,0.00031181619165659817,0.000912666449012578,5.572727747990261e-8,5.279484614509558e-35,1.8513506780382952e-62,0.0013062277438393437,0.01466213299290775,0.02021661845168763,0.11990936279808712,0.028999834538998213,0.03633079609998727,0.002490528289600727,0.00939290064054757,0.07482998490282705,0.0364596364316244,0.15789059347931347,0.0329761542303221,0.019185812839608227,0.24391944426814677,0.03259033581393041,0.09648380789748184,0.0010828272717151055,0.0,0.0001766096768206517,0.05662605535653626,0.0037966480750620674,0.0003361132563443271,0.0896273432619533,0.29925751713427173,2.950936441753255e-25,0.2265036168611307,0.040637188275846114,0.2696282010019649,0.042002866692767676,0.12603859659201766,8.17950085286573e-65,0.22770065909045967,0.03227348964817814,1.4030504883053902e-5,0.008284521917181356,0.021992219000816736,0.03398883223289311,0.011935258300982179,9.277947658257502e-22,0.05634331042910019,1.8278629427557719e-6,5.295301172450581e-68,0.057330057539135885,0.009747018563085654,0.13609885000887686,0.18989045517709233,0.021926735053610032,0.0016112685586432685,0.0018474274172016766,0.21755840238079002,0.06668119388105376,0.11746172042980824,0.0008908537831006326,0.03837210629414089,0.09806277703718384,0.10575825728635392,0.006117631668923312,0.098538313453773,3.363313568725597e-7,0.007279393545820552,0.03486284533799469,0.00035933856225405013,0.008680983222681328,0.0008863888061682774,5.988264344726887e-5,0.07613552183156795,0.000542536687435441,0.0439946525589988,0.002284778843303463,9.529110208524606e-6,0.036534033624862544,0.002367727229377538,9.844271308527273e-51,0.003862582151384709,0.44036578600955084,0.0002013733577169679,0.12175771541027718,0.029426054333310126,0.00038218426196268943,0.13479593850159097,0.011390083952514339,0.16261537406361803,0.0021142337561086116,0.012981996933997911,0.07221557056212097,0.04770337314131967,0.20494518258828634,0.03086650174749416,4.627970511605394e-5,0.002614815869090432,1.1785714902334495e-18,0.05119833580186991,0.10960641131432496,0.0,0.0004192596007886862,6.603708583027213e-9,2.2505501683230165e-7,0.0,0.012182631484136798,0.033628455725949934,5.2499230565398956e-12,0.00912646818363955,0.00010214765776910586,0.044533422273498616,0.08218060003248326,9.265566625998057e-6,0.04523418348125515,0.014147025384400243,7.508233236640879e-6,1.5706010702160653e-5,0.04308777043622834,0.00927833454041038,5.804240594222269e-6,9.291119403140615e-18,0.23086669806857438,0.0071565835345370424,0.022689996955535693,0.40885667726950864,0.2653861070940073,0.23767283250146365,4.791984726996924e-44,3.805881469644886e-41,2.3943631535961494e-5,0.03368663039524486,0.01440320219625806,0.31939331301427004,0.1076766317683252,0.03532941742883028,0.39787473630756387,2.1309219772152038e-5,6.270265284406914e-79,0.015306109970527315,0.011692455487550917,0.004232885351007297,0.02823326703720098,0.1531919181439317,8.210370295776058e-7,0.20862571807843694,0.08478582067353296,0.01019480253711911,0.0005178724805458751,0.0009229019265367831,0.004340135694596004,1.0314960515596851e-13,0.041665663375147786,8.998372620263314e-11,7.493404517283507e-14,0.284672465275646,4.459862721149751e-9,4.2540807247699204e-5,0.026096583421226886,3.452117053689219e-7,0.3536112481075937,0.002478945494898937,6.584992608371409e-8,0.278194815171006,0.025458083449345373,0.11611949848862219,2.971990055614556e-14,0.06623001696523304,2.164681500819863e-5,8.265344725244399e-7,0.092494219195157,0.06658814514382076,0.0006378253345858029,0.21640810621460638,7.2387457869519216e-6,0.039635261779556646,0.06906305405158296,0.0009577814344896526,4.4864952387739675e-7,1.2485843240181204e-5,0.11677308628122854,0.12378326992047047,0.0014655490434701067,0.007909446384578259,0.0007256296564635178,0.08985187935539236,0.24002110073322033,0.0036316117026689724,0.012434108924538513,0.0004042087719139955,0.019966146425414215,0.06773355729148807,0.0017872956706661974,2.3860586790305365e-233,0.0028169838858004273,2.708014342078952e-40,0.26289027960193,2.625992867968568e-6,0.00015579921649706366,0.0017988204703687084,0.06394104600549529,0.04129747887422049,7.356449275715555e-8,0.11652870547651473,0.2778717422901886,0.059332112458411065,0.1972431289213889,0.18164758127708835,0.009647673546986318,6.307747137242352e-13,0.031356588763249205,0.055329139335920596,1.0691752567320223e-12,0.07901115129013472,0.0003568475187332745,2.393514321634783e-31,0.01672804205749289,1.1929870534959006e-23,0.00011486291209851741,0.02483965584511441,0.07291170648120353,0.0013939822727938155,1.2323915193779802e-10,0.0832361157595666,0.17914767066243226,6.582599250186454e-10,0.027545152307139078,0.2525073378977843,1.7792708417181804e-6,0.00017515966805560872,0.03630810126125586,0.44009905562832036,0.0032271796408324025,0.000193861215074054,0.037775578599111855,0.07477586368453565,0.10442707882685798,1.3962744636960565e-17,0.06369758277615852,0.18612998097564612,0.0006999861238685542,0.12968842420626156,0.21462380694106875,0.052570680818991355,0.005155539261717981,8.664808354201119e-6,0.0017455631766817097,0.2522685836863616,0.38569504445179803,5.266070793572808e-6,0.0019802240399017053,0.005399916374469994,0.14811078318590007,0.09913573889940269,0.10502808904447569,0.03503864866086746,0.21069252359302879,0.029071840515701892,0.03958499001281231,0.06908764909597125,0.20684358822856033,0.0003328264002955838,0.12116750038447668,0.10953166424758297,0.05931017174525351,0.025521611922006745,0.07366499536630271,0.005388204323908911,0.015117189244769506,7.899656819127531e-10,0.10090252726288716,2.731734756927706e-15,7.031273401667123e-5,0.001593155838669067,0.44507784236921827,0.11367155854255227,0.007982392114556165,0.0004989368738799019,0.02731048282932546,0.0003028291932122634,0.12681765586667743,0.053897465175051514,0.10325201250174738,0.0003757258202686626,0.01907943839988721,0.07959036652852748,0.03332776582401297,0.0005281354813904182,0.0008138479581455914,0.06665431153929924,0.03851948810032784,0.0015372079838356053,1.8413861112042936e-11,0.2883018740860745,0.13038315563075578,0.07869666383643789,0.43214524537650434,0.09735474713141788,0.0024922868384640636,0.07438192917059447,0.1224974857964582,0.21342682178971742,0.00023048272739726726,0.01636542274095535,0.06390685274990215,0.023407350406991507,0.00010948639508483577,9.789400642224237e-11,0.030348396024549022,0.008330932584057215,0.43500362895233613,0.12475338614446702,0.03955451844837123,0.0017910682793345685,0.005940236532220124,0.05103556675884027,1.2185541225876134e-5,0.041654194879508964,0.025165065855502378,0.09398699806450339,0.0024656549616195256,0.000528088949418371,0.004297218480182567,0.04917782920710398,0.048402003991266145,2.4075788944729846e-12,0.06104102769878142,0.05030804676935475,0.03619547644829097,0.24121861081191434,1.357075260212974e-6,0.30679095088385167,0.07873890941819774,0.0007329107207523709,0.0014708328637745409,0.06304057708951126,0.03845082041168099,0.04662867482688855,0.1865543750928309,0.04119933859975915,0.18411899997833497,0.012190968330935161,0.0635974839498591,9.640867966024862e-6,3.3319032969984197e-6,0.0005307474922377523,0.13808613610765588,0.04115420497735508,0.16651925524858152,0.0009247707151544418,0.00018937450306817953,0.03852888491991924,0.0689898784618223,8.346231796936755e-6,2.8084369057932294e-27,0.07236718408690881,0.05027440893295156,0.11323612074213374,0.019159764380800706,0.005768475452638086,0.00435086017904948,0.12950650579137463,0.21463043293245146,5.7305187944977785e-5,0.14914705146022889,0.08600804972200245,0.03501716397126797,0.13207403498528272,0.0004500012856101523,0.03437461831720184,0.05598233886873286,0.016066660112876618,1.2273371765274011e-5,0.1107406269024424,1.8470983399585564e-25,0.0228653072677325,2.0165194288472937e-21,0.4321393452418797,2.0557653984999496e-5,0.0,0.1702646862577064,0.010709054083520802,0.01813215805482966,0.13610624917978348,0.001577601325430069,0.018205323658921205,0.23045270593719072,0.04585997163136805,0.043641647694055055,0.043516322966995674,0.20902235288819895,1.3872138993433118e-5,3.146052893704866e-13,0.02428442948699597,0.004569527405253819,0.0008078021924053131,0.08138791020158849,0.02039216477997435,8.242389776276286e-32,2.3301018072849406e-5,0.02246715495032377,0.07581449099210898,2.7662456709892425e-14,0.00129071191110515,0.2069515526189124,4.179380690997324e-6,4.7662479903319326e-5,0.2145406540002235,0.012610834098711195,0.04784229956808366,0.008338964135521178,0.03839575178174163,0.04269891836953019,0.023331403309632716,0.0014823083663688555,4.885181193568948e-7,0.28364283974716176,1.3324733777304347e-8,0.02426918939430724,3.96600932286039e-21,0.36912432633067427,0.033120514896120036,0.024549651946123956,1.4822021346494186e-6,0.006394389041875901,0.019404102965649164,0.07135830852452954,0.000807055924145244,0.024181844727834974,0.0004224286090199974,0.019453024401387662,0.24299743388682363,7.116817036003015e-156,5.068233766376434e-10,0.1697011758730275,0.2567547948341002,0.003813720073773825,0.03259306303153071,0.04916764589442899,8.964991838564898e-5,2.698796688647664e-93,0.004730382929457097,1.3284461784009579e-5,0.019727267727138533,0.12142250308151398,0.27358303699695435,0.01752160462132479,0.0024438633847178354,0.009885899074099464,0.021516518557764822,0.006660665782910094,0.05724813230120419,0.027195796988194125,0.00020609860895504778,0.0035091424567000157,0.0014852777316689673,0.03389002922570096,0.26305292344731973,0.05614321425448115,2.3821998235363743e-27,0.11311497201875953,0.005227789783631265,3.4698220743187816e-38,0.17775984527644903,0.09491081559043711,0.11130710876349019,0.0600924958516329,0.0013166445252485888,0.030199973038428238,0.041108509894508795,0.04374896754223314,0.07003263805854727,0.03359099009516447,0.02701906725064833,0.14214200767676974,4.898405829911114e-5,0.0005968867251561697,0.011780486105086543,0.06072287403043708,0.004522720174288827,0.1549780960030988,0.03208863938541791,6.007687637243571e-11,0.08529534253842391,0.1178585889499043,0.24080475576559254,0.0647806905764441,0.019159747733099922,0.0029223539183331703,0.00041239616729193485,0.00167990697056258,2.2975959042305206e-6,0.142163076434478,0.0350980227742701,0.1669817389239886,0.0009397995635885062,7.68123733122554e-16,1.0207890583890246e-98,0.062373737082874074,0.03129984348888646,0.00010699864685500564,0.026377608933001388,0.022072580347070884,0.1919132157095147,2.053769918877976e-33,0.003909881568102154,0.15619903633836105,0.006863851184680886,0.00013123101737649756,3.2732381866544775e-7,0.00037546910199433287,0.02924096727188736,5.401089715455013e-20,0.12482860549225315,0.2730643838214641,0.021001748762556706,0.014292336473248925,0.0002628016706733226,0.0458416436057436,0.002230468821587519,0.023116701991336357,0.1744730870922022,0.0017330739924253473,0.016228627142531257,0.0005127530477508109,0.006835462430974462,0.000702787753903346,0.0032012478509292268,0.10532977969278856,0.019960641138034977,0.017683956070655964,1.6157940707886238e-44,0.016726570694314626,8.887228554421715e-7,6.163874342510581e-15,5.0900976543459714e-5,0.0026819151495311726,0.00042416998984698954,2.621700957859082e-23,0.2285812038225061,0.0032564256936577288,3.3710266329414435e-5,0.06015653329777505,1.5327079353350845e-20,0.042181249913449126,3.265943511810828e-14,9.60393328498391e-28,0.1681309062462172,1.4452903444792374e-5,0.19553595815417255,0.010014639141136034,8.174017598127107e-5,0.02093164410661121,1.6734454171970666e-16,0.061072273168871975,9.369826776547189e-11,0.0001465941121731586,0.2692045446673345,0.04479096385422118,0.0003846256915183706,0.0012016741551639266,0.01370334353570638,0.016505091571265392,0.025218818627330854,3.351976248355945e-55,7.919092213553443e-14,0.19425129537448915,0.015568901920728897,0.003505059613836685,0.006760800132625526,0.020065472348793946,0.03737319299062432,0.035167327455125,2.7577870129421567e-26,0.09721572327118692,0.02131458415788013,0.04065522171166127,0.0104439365328589,0.0007688264206664022,0.04332837153980739,0.03430025720432766,0.005169648316155222,9.736190402950045e-9,0.028685412456432944,0.06914137392358936,0.04949401268706844,0.14092724991168407,0.03099249086253721,0.1970994222591999,0.032408768708768985,0.03774337068216043,0.07661003478960592,0.0226786263920877,0.022176919579274076,0.0036258989725309093,0.05236876825821503,0.10859250346333109,0.0007001543283478683,7.017218903386117e-6,8.66335838955613e-6,0.049515688507001394,0.002738447683541257,0.010151593159417405,0.15179450831136734,0.05033477006465057,0.16006179910798435,0.002205958543483837,0.0932064264293691,0.1508227825930205,0.07998840673935091,0.012859326251745472,0.02030846466727735,2.9340706689409938e-28,0.03485977454099718,0.012244095728808295,1.4101104674279505e-35,0.3124161169894735,0.1663218179458243,2.64697820736472e-13,1.0307667789261913e-5,0.2771708637639983,0.08720730346375558,0.0027798025065371977,0.1274907102385658,0.2403176767228163,0.3799381884234657,0.017289727660472858,0.032250277967558715,0.22787493568565262,1.1061231717439775e-8,0.020166300134803583,0.00493999756074465,0.17219376405559042,0.004686747619334352,0.11407484812138807,0.024192029247047955,7.210035084874645e-10,4.6710972523143585e-63,0.00013249582656638177,1.867308062604897e-10,0.32062234307017523,0.08265069371854103,0.01805306390100085,0.05931406322104562,0.06917654238618712,0.08481704792306956,0.0532658511778071,0.1067688212640871,0.08052887123876995,0.005674358624578208,0.0026131058585157816,0.14777363982777741,0.00048626188488585853,0.044288100950075314,0.00013134482672694166,0.03184714463552729,0.0002291847467128477,2.8471210949196444e-114,0.008692109586478492,0.2458049097279091,0.0792116256933338,0.001440877010341306,0.09221864461904872,0.0545473552911502,3.6356713587091966e-8,2.6592680909823885e-20,0.25330253870495034,0.07398507719948594,0.2344733283085092,0.0009300370897361454,0.013907835708413804,0.06389062490437827,0.3050468946768571,0.004815857027274622,1.0886655309324358e-13,0.00045578469153851074,0.03309694410190126,0.3047599992377425,0.008409419991606699,0.057842579920990476,0.017817543246143454,1.5362177038236772e-5,9.067312005652838e-12,0.001332462403493615,0.012648309480933982,1.5446276503320335e-6,0.0919873340805443,0.01770126048367476,0.24243076598675206,1.1510404980858615e-5,0.03619705758379485,0.2606562181558594,0.006211849537851677,0.2651800185265928,0.07142230346933102,5.59841353375828e-18,0.004542155955556753,0.010673457144932437,0.01986957370612312,0.03562261594341858,0.1793493855702218,0.0019670989393683123,0.0019343416858183438,5.597350563937508e-46,0.06446737322835581,1.2066669129076116e-10,8.090145132827462e-9,0.04649575483656371,0.005363192328282105,0.09577951103059985,0.034312913861960705,0.07620586449686279,0.0836141209319285,0.010628772168320224,0.0025491014348688738,0.11543778525770645,0.0022292516011514257,0.016740722056295138,0.11086102867993261,0.010517743491495486,6.548328181128567e-6,0.0,2.6663077266190897e-8,0.052051157883211706,8.611420945131946e-7,0.0505924825932376,2.1466360758563817e-9,0.008515200753154489,0.1702722818042771,0.059842326149979495,0.04521669400072005,0.036263638768201954,0.06534067214239345,0.005069229961478433,0.01287502029692564,0.02687681161217379,0.004091652917212919,0.16514227577135987,0.0003138359020568879,0.047092362205997516,0.23776366045549502,0.0067432250120070284,4.344328539777297e-6,0.08484388143385883,0.024242600193397808,0.07345410897428832,0.23914918704957383,0.019300828135985385,2.1215892741821263e-5,3.885043416194333e-6,0.025914217824355594,0.16212363590987552,0.017982459181347967,4.327840316673234e-145,0.06262454141117024,0.0554763253430104,8.02124261535948e-30,0.0004356070793867566,0.0002970308938567374,0.24120123707731786,0.16728591774807616,3.8551706584839396e-5,0.15919291010485595,0.00410365660439841,0.06936209690133018,0.03637466646287199,0.00032480339572592417,0.033572333583370625,0.007058976368223546,0.011914750218578187,7.249561181892775e-9,0.10422446686264014,0.024363289953229103,8.434561759874204e-5,0.14114097567624592,0.1253524151489479,9.374602011443149e-91,0.22521681547220304,1.0915865579257748e-10,0.08749502690881518,0.0006938108401772428,0.00968253209883761,0.02199488120312119],"x":[-17.565736826755426,-17.302524011546502,-17.395968606266404,-15.552374893249956,-16.118046853703945,-11.454902159762224,-10.703690278444162,-11.299171625412946,-16.37053314196848,-16.62125991801265,-14.662431951213708,-14.738065638203956,-14.497138839930566,-15.313959579936828,-12.547581792256079,-17.857850864329357,-14.015877529495675,-14.332124172824335,-13.55423638055047,-10.205467159271876,-19.206813430237705,-11.880549273205325,-12.93883095608279,-12.413234342547433,-11.22192441507143,-17.345504180827817,-13.838831622950636,-10.920878360103476,-11.061564729635954,-13.703560582003218,-16.968306565328326,-17.97879502644767,-19.18934128108201,-11.383189921816381,-18.9688685086118,-10.484850030149747,-16.913253542589302,-10.098804458732122,-13.32942020338838,-12.639857097613913,-14.334718261063383,-14.651935712464255,-18.69344559293307,-14.420359211966352,-17.06171678270706,-11.856300895908538,-10.072502609739686,-13.644477265742905,-18.08649526232361,-17.402789545321177,-16.990114831982805,-11.001098765343862,-11.760079937318501,-10.496218495825445,-10.998573638579218,-10.528798811648869,-13.903708795016534,-16.683608227719418,-11.774767219609641,-17.832571072009177,-10.24813988570749,-18.43549926677008,-12.378734804655043,-19.871042260447307,-10.454252332710592,-14.15372954351104,-13.629318145876056,-16.591509810818298,-19.076014117474664,-19.609236986830958,-19.097206924950626,-12.661610002824332,-17.126318033290975,-14.693909423722886,-18.71067072527903,-13.201057376578902,-10.751893941777231,-10.228490981754009,-14.33798392656945,-13.90630346946944,-15.400269694452506,-10.409628230890444,-16.223327099821095,-18.98832662949037,-18.632564508364126,-14.841799461874707,-18.925581684706955,-11.319836889042564,-13.483280463352184,-12.413617536985079,-12.056118655808042,-16.187677931331894,-13.317419894397133,-15.16642498538687,-11.89438223853934,-18.49276390480027,-16.159063131061956,-14.477228866574166,-12.658478869651024,-16.82440401049687,-13.695049468286363,-14.99597083933981,-16.8256534620566,-16.78841800752345,-11.924618189800153,-19.658215231147164,-15.398212864359683,-15.997863337733422,-19.083962153959572,-11.951611236739579,-12.536993374877113,-18.451634531690235,-16.340092899868303,-16.884203117554588,-11.368229273144584,-18.111533861376998,-16.250720153306286,-16.371585673287644,-11.739524144817185,-17.300290330197324,-18.95254708853239,-15.312541777797719,-17.977717576319108,-17.23626989968764,-13.376686845760005,-19.743417426696837,-13.195028742761663,-13.79268851850809,-14.869041600959015,-18.593287430663423,-16.995178607385903,-18.497085674647447,-15.190168047326111,-16.721503478830307,-17.98399861143554,-16.438126164625906,-10.880789637512372,-14.763004104414604,-17.679107117117265,-17.6656665412589,-17.360260077040795,-19.112274531534872,-14.880060330370151,-16.09748502986825,-19.366784497925412,-17.462808800577378,-18.287014486852776,-15.276852955440958,-18.940512581079275,-14.044646674365875,-11.2087418256662,-12.18208662625305,-12.728570503631357,-15.701049455403089,-16.319190665239553,-16.776765719268827,-18.882711276873536,-15.30019686581857,-13.739707709373139,-15.203756639362034,-15.162582544896772,-14.015479450879532,-11.10858359385875,-18.264043953304245,-16.06151824919966,-13.886937522922837,-13.714083494806095,-12.829632373639978,-14.143571871000775,-16.70725705515761,-11.124393028616627,-16.539833498632756,-19.713478641371218,-18.826762650463337,-12.289694924334253,-10.01386680962793,-12.224516964278045,-17.492585712224383,-11.068739652314118,-11.242839567275313,-17.218414196275308,-12.942348306084376,-14.996289355396781,-17.808294176860436,-18.172654361302826,-16.044603654391473,-14.544113142096295,-15.131834223955739,-17.516568592328706,-11.558855738150257,-10.483170155104283,-19.593552266385114,-11.421859905588057,-12.11819842620267,-19.354023197283393,-19.19805174291376,-11.256380441150746,-18.80694826650351,-13.925927757359325,-17.535194228680922,-12.074401255393028,-11.871816423629209,-13.01569344489465,-19.78353050365693,-13.139488776399613,-12.850901461793915,-10.799517910069472,-18.427659364378698,-11.984439303949783,-19.098178163030703,-14.388667268922655,-14.09340262877047,-12.471769528872453,-11.813574800073628,-11.082212966085747,-12.584861976186051,-17.437802586587352,-17.564398615217236,-16.934501105321498,-19.89265110116099,-17.019755137248225,-19.884342199770153,-16.719810556171982,-11.240872547029866,-12.708077115840315,-11.635187277873296,-16.513836361856615,-17.474122302995422,-16.377397694861543,-15.978228364452928,-17.54057633609268,-12.480364389279309,-18.056322553715287,-16.78047409425447,-16.153839589846726,-13.927860174190796,-11.674004610124701,-18.678108333657896,-10.331464076477271,-17.24667861888588,-11.974028526416824,-11.354404492245898,-18.368209779694936,-19.33459197308422,-14.972209851861528,-16.937002789942305,-19.97225112188003,-11.650118097936657,-13.095839833579287,-12.991653455456333,-10.00322323098493,-14.957219838250973,-10.490183279004778,-14.052937914399713,-12.009662915417469,-11.428894793082582,-12.302070012463265,-11.0775846931473,-15.051585840094678,-18.409440301940567,-14.528394323113822,-15.735704125532513,-11.68429747091474,-16.163597107687785,-15.649298575458312,-17.214437552371706,-16.701557721032735,-19.697247962343294,-11.667955678134863,-13.133447092777358,-11.454410553389566,-13.390773232965138,-10.730922100979747,-14.701560474800193,-11.362914840876977,-12.977079081663232,-14.656301264593692,-18.933170145507976,-17.104031464218327,-17.335935090323172,-16.275282048311027,-13.672326348684933,-16.58612383834043,-16.69493027443334,-11.009473119609122,-15.829207386441093,-15.670068525290077,-17.607365003128017,-19.41195797192637,-18.39905221812295,-16.593520263809165,-15.992534470808144,-18.995223343056445,-17.226370845722027,-18.56411490222638,-10.197560831021121,-19.90298196823843,-19.17123951831048,-11.794465568919424,-10.810786260691028,-18.370373702826917,-18.010833900631603,-12.13402780333392,-12.488038557230665,-16.232318667484243,-18.5499433493703,-13.315539637667529,-13.428432497494846,-18.408169659964443,-19.08938774090575,-18.49229875979749,-14.926437297575454,-17.082290563353805,-15.68714162588175,-18.883054569737862,-10.801680046476331,-13.616925518455428,-13.507178469153743,-19.915122892418275,-17.9204609056,-11.173265971682502,-17.71758773508497,-18.502521252743115,-18.861421822189428,-19.656487368049156,-16.793767457253278,-13.633929819964958,-16.138415066143125,-19.582504568592867,-19.95629381306474,-17.975754426266434,-15.953193891799183,-14.773172784181599,-13.080106005333146,-15.582393229849956,-17.346206572097508,-19.44843970318849,-12.57565390129922,-11.12013924944896,-11.055032953543426,-10.955373632667014,-18.844433755179494,-10.661805291135096,-12.676594393875305,-13.411189030186891,-16.27594500402992,-18.813708923252815,-19.901060182878155,-15.241129923301438,-19.411264022668046,-13.058141510980061,-11.248537108918853,-15.47918926626715,-10.92040677760901,-10.76967100790242,-17.608187110672734,-13.664801327719596,-18.16710271130197,-16.67039928204375,-19.437460595157795,-14.012151849575451,-12.110838829832456,-11.690054407722343,-15.56210127968944,-12.406718305890063,-17.486126275879013,-10.007171242475234,-15.32270624568826,-19.703515158973236,-16.81967556766793,-19.049520591810328,-17.134443979227036,-11.522737773941813,-16.379158161118802,-14.081617422681969,-18.538296277292602,-14.742832808123211,-11.948559963377791,-11.224678796858534,-19.707158802903287,-11.367654188163904,-17.190488743343817,-13.389248796919212,-19.192541328358757,-17.20078760994867,-18.147128955827625,-16.25348232580578,-16.097898196763122,-10.732081204719265,-18.739621163595753,-11.229238539276952,-19.58612241278067,-17.82568699021165,-14.752145173182047,-19.433617240707196,-17.992016978348676,-17.8690565282244,-10.06433086607686,-12.974420907531643,-14.408451429731068,-14.712457754610757,-12.476191625965695,-16.715097602518743,-14.050501149862416,-17.785245176574165,-15.926732186304593,-18.427994563951064,-13.27496264939304,-12.634532040420632,-13.530950915529896,-17.23059144460445,-16.951626112859795,-14.066323208934921,-10.977084362746385,-13.438769919905777,-12.519570488478635,-17.844318946909365,-16.524124406699958,-11.693247329809102,-19.354265989290397,-13.58535565186202,-12.695625389824578,-15.114598271069006,-11.444932911561441,-12.083142142298728,-15.984047579959723,-14.202746603778717,-12.501914271263301,-14.072595655191382,-18.335632449869482,-13.479781516425103,-14.317924869023358,-16.935479790801967,-19.146806529631256,-10.016528326691045,-19.444675361853463,-12.761838602946705,-12.349647864264693,-14.140431116092778,-13.717766363975398,-18.267926312075016,-10.279992594254674,-18.73696640297988,-19.480865035071425,-11.744836424655489,-17.21845846296166,-16.35828437849988,-16.507534688929425,-10.24850149342695,-11.60119600054945,-17.105566096700898,-18.46650429600646,-17.433464286230418,-14.564957109303231,-16.33071640679852,-17.243836305625734,-14.55594042461138,-17.701595620790386,-13.909169230468496,-14.196882444056707,-15.112720230949318,-19.67876679691947,-11.835124333831695,-17.194111754309873,-12.807484053214948,-11.75825837753816,-18.793517818975943,-19.24712894127918,-12.696843759304578,-12.370209393465576,-10.25583720111879,-14.352745651196251,-14.844877835232973,-12.413753651111177,-14.466135506915505,-13.263708769925461,-18.3162605356631,-12.819766743593746,-13.361598460336188,-13.501353668795346,-12.060257646706278,-19.212872340678828,-19.097269753288607,-14.284737831845574,-10.782225204922039,-13.175281453200107,-14.603703167066291,-11.698077481713238,-17.04803885669848,-17.964477212980306,-15.78233865081317,-10.395644083890453,-16.520557419270098,-15.073859332218195,-18.86934431339073,-11.610693285876291,-16.889612387707142,-12.760042613958436,-13.654220842941008,-19.610282269027785,-18.85746390759325,-13.128579105176767,-15.334198219321813,-11.437621045614046,-19.0585784056418,-18.939421096339824,-11.629000208014634,-14.32121002859991,-15.060650789472621,-19.698925358266624,-10.106959195110644,-15.752659459525386,-11.995383997411388,-10.076274864791957,-16.76216216371596,-12.887665800442495,-13.214064646806511,-16.61979001799356,-11.925010942927187,-13.362422300397728,-15.128861563086309,-16.39333688274148,-14.779559556712666,-11.585421127568047,-14.395344988877206,-11.333537361998564,-17.918703498081566,-10.901881196710262,-10.609908928908409,-17.74565580985401,-10.442970232981795,-13.77245000684951,-12.427989814413085,-10.114888291671528,-17.621094255818445,-18.640880244082176,-17.670404298753176,-16.85003497973882,-14.199053745004022,-18.946446681725323,-10.93623968384315,-15.666499614651377,-19.087427768971196,-12.96753146664045,-13.947245168229266,-13.156400886308344,-13.07052689721813,-17.829944276590986,-11.982799843723502,-12.715290419298883,-14.783230869090584,-15.374060097966007,-18.540637536480894,-16.137656552873803,-12.890538797515905,-10.859499521098158,-13.201415241543783,-13.7851529536523,-14.145450851862078,-19.530878589052623,-14.453629901705725,-12.160095343668619,-17.340746676433486,-14.967430465621295,-13.805647089089419,-12.802252065284684,-16.665421283484413,-12.28471151122638,-16.218721844987705,-17.418912267917225,-15.795911208716504,-10.941878358864779,-19.144300251568897,-10.161842542263688,-11.267861626237286,-17.585952424205495,-15.008394873873955,-19.738228414432633,-10.79519157354476,-12.72333466171013,-11.753997360166462,-10.506533877869614,-17.6022661759426,-14.719368353873657,-12.279891400230238,-19.505887138839963,-13.785498015577787,-18.078778597454995,-15.463513736607329,-13.258504389604385,-14.09469202936667,-13.763816926208179,-17.136914137404652,-11.986040817285113,-10.37223545863859,-18.09609823814397,-13.699304053482159,-13.251387787709367,-17.22864990954938,-12.030479590438913,-10.143219563863013,-19.39244353949522,-10.10968412447564,-13.654246908364712,-17.113245171390798,-12.810628447896203,-13.83819811753201,-10.951571816206812,-18.761698703331366,-16.702895989731076,-17.74862249801046,-14.438874044687386,-13.95336210301625,-14.190359089462813,-17.34722502927728,-18.46915833685117,-19.774721925287317,-19.747732316961937,-15.552922145969077,-13.137935550117426,-15.427366936900743,-11.444299003421065,-17.19414640426767,-12.714057048734768,-13.93555965449677,-17.17414033751312,-16.379431505962255,-13.938917230149531,-18.911061515220577,-14.309760139564943,-18.314305058346353,-19.4994764462013,-19.166485385803423,-11.167735211439748,-15.093883216516076,-18.034501665877208,-13.65031904887585,-10.699533545285348,-15.51385281564793,-18.516558965541744,-19.227962176663233,-15.902938566950702,-16.654764057992438,-11.484689424170147,-14.851955375918815,-17.842226756214274,-18.22708376845516,-19.153546106325443,-11.355641144484352,-13.987592181351465,-19.919853830241806,-10.32131679112358,-10.769980117524938,-19.28365873879818,-18.475548158566607,-16.738438040218128,-11.112314932717135,-16.141900986595854,-10.205861338317863,-15.373910077796664,-16.252376037745382,-14.764934797723395,-10.848098101514491,-18.312433082442084,-15.778491323012627,-16.919346542232475,-13.548807024651968,-17.822583653004887,-16.095553230891525,-15.865229178952497,-17.929759598480814,-14.7844298188096,-12.757016270879245,-17.17378210761862,-10.748721034116457,-19.512592594336777,-11.074885885446644,-11.90938648057324,-10.717529561234482,-11.63127589148228,-12.477871301573458,-14.31227521060462,-11.835189026178218,-14.3487874422635,-11.080976177995002,-14.848548333230127,-12.600074064389732,-16.085524325812344,-12.158671836202544,-16.37239908747844,-17.41651529038412,-13.554731993364799,-15.586457432027236,-10.533730904836824,-17.355308832720507,-13.319344900091298,-16.8757798243811,-11.114535652337022,-17.968526586615475,-13.364734497790566,-15.845231964115872,-14.70100090263619,-12.203536310289172,-16.92083016865703,-17.563720861514582,-15.092392803294945,-19.78581162421206,-16.87608725927002,-14.139268545806235,-13.151965273938892,-12.646020396642141,-16.29611345478355,-13.162468005957482,-16.452729264160975,-14.40898147284974,-16.95336368726354,-17.60556645898543,-19.136774932598637,-11.439969433336278,-14.49270999911056,-13.369673710852277,-12.597813639039936,-19.23819021996823,-11.793451149618635,-18.362018758951756,-17.43549866936039,-17.308039840483357,-18.034718626550635,-19.94028192327608,-19.824003212592636,-10.34249398575805,-10.556613514281226,-15.46065458220749,-11.558999690396508,-19.62734969236109,-11.019067208453883,-19.822028548700075,-10.021840029549349,-14.495952628309228,-19.168151929984568,-16.334226324816548,-18.6015173065381,-12.589040273522391,-13.103809392370511,-18.165536316053686,-11.795757512416564,-15.975664684113601,-18.534500523465645,-19.21637532434394,-19.419094883649148,-13.03949323600279,-17.011187327211122,-16.131844169777125,-18.246256634634697,-15.40412635538943,-16.8938820421308,-11.315955588523947,-13.34736093000586,-15.461492247663081,-18.00024504968214,-10.737596340444815,-15.30635852205086,-15.987643903338832,-19.097860292744457,-15.333425970973503,-18.965338651230514,-13.177950661003193,-11.978553406986112,-14.08242113949443,-17.12295245176738,-19.662855194536313,-15.875431452813887,-13.655821757566976,-12.816888716563001,-11.726487663497199,-11.834910932305736,-13.1860647997046,-19.501938607339955,-19.750455499680154,-17.522310896251458,-19.18569862615672,-17.51499692057476,-18.39069233739299,-14.756989305746934,-19.099237875331397,-15.093724326291593,-13.449555680696545,-13.176319442168975,-15.286655280282613,-16.435268262044204,-11.552101259264306,-11.25364600094163,-18.190632680096357,-15.928148446512335,-10.946819793661476,-10.720434421629308,-13.394283555557562,-19.61413427439559,-15.090237333912784,-19.321668117720336,-15.47845299443395,-18.77185502557187,-13.943476322252637,-11.312665045032107,-18.442885531947844,-13.550140271090093,-18.854590716403806,-18.45740147163279,-13.136617483769172,-14.360868859404277,-11.025923645103195,-16.506466287689072,-17.879548057755514,-12.61483499726281,-14.87682598270499,-14.359649056569598,-19.670405099906496,-15.01894859753735,-19.63570373640755,-16.941259946756016,-13.249725081612656,-11.94898337433254,-16.723936618142943,-18.320576415009747,-13.836886218420565,-11.380217403113775,-15.797559928431157,-12.10171760345359,-16.514621942782256,-15.275388769507769,-12.986530105565205,-13.680559805098628,-12.98273181180443,-11.006858901261356,-12.504967390657903,-14.568515495319229,-12.82936543884979,-12.719441341573663,-10.359043202794847,-17.914304045781012,-11.95915993805938,-13.821071474604638,-10.75643544578297,-14.705890572432114,-11.248296594383465,-12.777469188589013,-18.6218837246344,-12.964759921181567,-12.489169325316595,-11.796342838083566,-12.286479878683066,-14.138462767385837,-15.074156303350549,-12.994888054538904,-12.414913584648943,-14.140211540065724,-12.818700741701075,-10.183432374996695,-15.610635369080708,-16.31575807126169,-15.84498441314253,-12.772999783304385,-12.287851015878797,-13.233712361642135,-17.10626336001835,-14.409793025372743,-10.305042164007588,-19.17336809733643,-13.259265706010122,-17.20467268552821,-10.09387334735276,-17.555682197747878,-17.05133267450034,-18.96825474172269,-19.253165563579262,-18.39896593854953,-11.789305165267425,-15.285317464087644,-19.307470537220706,-15.82527653805153,-15.717779330461482,-16.739997447843116,-14.076201338067627,-13.840248243954157,-16.19855524800395,-10.210997047547096,-15.478277122557653,-17.641770982360946,-19.034148450838654,-10.682469738001393,-18.569510665263422,-18.197600162749712,-18.483131322766532,-14.284295672597986,-10.47472529214627,-14.708957766128751,-13.052243052788342,-10.809474827627827,-16.807037328129756,-15.57667948590999,-17.89039731767436,-17.362061111772963,-17.524996611589135,-17.37627744348935,-12.029653379335272,-12.939947213110404,-18.061747342726203,-18.13342569649919,-12.937051390641825,-19.64870625720787,-11.14673663103236,-13.19140474123304,-14.287422324311066,-18.991305718541568,-19.198215335475982,-11.56559242652585,-17.27862175985201,-17.460352340152724,-11.026404491656015,-12.844631720307941,-15.350967987391911,-19.67751668591265,-13.286643098724928,-11.164200775132244,-18.4258138760364,-15.59811393691781,-13.935210877030272,-17.46392222524618,-15.02878146329696,-12.020120381370315,-12.85013918564615,-15.492282250928849,-12.743037543048604,-19.406209514351097,-19.186333862279362,-16.833064073637686,-13.832658633676198,-17.158200320275295,-14.636791593207954,-14.51957485013265,-15.235641481798691,-15.884621749448096,-15.28303262848988,-11.64749784606464,-18.272954813302423,-13.461309781129211,-16.59078614446225,-11.614031590605498,-15.737594646347619,-17.744842963169347,-19.732401676051385,-17.851577939764503,-10.701082641837466,-17.023012676461928,-13.065414363720713,-18.14127557398741,-17.981675896310698,-15.162934773110202,-16.681742855712386,-16.412179045349447,-16.79932772984254,-13.994189434788481,-15.72090431123449,-13.829673914666278,-16.012895015294337,-14.285054455731785,-12.941320789452329,-10.531313513631037,-10.103890757092458,-10.254439415400967,-19.2969110718221,-14.8319043003577,-10.590187503261447,-15.478285820487551,-12.2187922393622,-17.713517408002136,-13.9249203763804,-16.034285582467284,-18.752076903170284,-17.18259623394477,-18.617708384867317,-13.376564668372822,-17.159854902670208,-15.922566643473479,-15.994113994232544,-15.371744139405854,-18.723332181379845,-17.96035899041944,-13.769426055127525,-17.27633987056703,-14.83585297293567,-12.211194744465324,-14.86236106703084,-15.648191787621483,-10.290597980505078,-16.1541841982625,-16.170014362059476,-19.651359840896813,-12.596094793464099,-18.682429058308966],"s":[3.206828257951094,2.725493334531998,0.9223244407534315,3.2478711222821266,3.7124196558273317,4.94017278203258,2.933775303320272,4.6418459691165035,0.15281548156117042,2.204938469962113,3.657444495296547,1.8990576179914098,1.1653812469825686,4.936946488259108,2.8400363783140814,3.8731077457190666,3.2953522278231393,1.9188389558555552,4.887666130507139,4.775109973065591,2.4895450289640717,3.1911649706809486,3.483799845204465,0.719554351564542,4.368329363769691,3.936660043999196,2.4781092808115246,1.5075376941840546,0.8072167376674455,1.2892388005166244,0.45815460347021997,4.864770148158587,0.36810368350868483,3.8025149672110468,2.3213430017547276,2.9097220454536044,0.49453787474188937,0.047898804160256825,3.7902788925192166,4.998442067538602,1.5236737867168237,2.39690353394396,3.492766217925217,4.062403530863545,4.788915110998559,2.620090997058042,3.4596954303760477,4.4085198575834506,2.8259649113448084,1.8955960131964866,3.9668675185393134,1.6907762788467218,3.1712970831775875,0.29903747573688744,0.4769881361371897,4.654956184593026,0.8297751515812768,1.8276346870453186,4.248054867772933,3.3708384254658554,0.8410727313545319,2.602788986163942,3.6709314066437857,1.546322174974979,3.6842008440275533,0.2447500935381508,2.5927730454323683,3.8834579106507117,4.381556275588444,1.6539562127748386,2.0377404403093644,2.4706255894970464,0.17189154218976932,1.6762519400068687,1.535336304519439,0.3436905045757732,2.074017541041695,0.38546288723690036,3.091310906743636,2.3655880260213644,1.8741726098092548,1.9310913650797068,1.3501529243265042,1.2907189163247201,0.7776261981650068,3.8375427040973484,1.230418535819655,0.7859637916738915,1.9312839013183314,0.944831023727406,0.8279334912919512,3.689065911722087,4.916298855903314,1.268282077973063,1.9967095912064203,1.1305395916930705,0.3284626401255675,1.4809060919950878,4.821423511200194,1.589986315081261,3.044823142951627,4.723042012421772,0.3365086640845183,3.385612119919453,3.5685459798847976,1.0917193776513678,0.6796825264166995,0.4671287842294114,4.168819948116401,3.804821519007391,3.766409596359698,4.260415363776044,4.400570005045107,1.173148144901136,1.3591897923562568,4.860036690131655,0.8546484402405441,0.35109688272266015,0.6975166222259999,3.349862760187612,0.8662862251952141,1.6788002059664564,0.30037274703385575,2.9440861329950616,2.8874857133092724,1.156408493416028,1.4969154380865257,0.18513706945103459,2.8763290752117197,3.1847564447554353,2.959649892388695,3.9925390511296266,0.48947039185719743,3.027701245903308,3.938845974859616,4.517191793769738,4.7422297916326075,1.317788267654716,3.078982411124689,3.1959379141006994,4.312929066183876,2.931146884678153,0.3641657613489213,0.4041080373506145,4.139317026728846,4.860107750229775,1.4920851626991816,2.777872952620929,0.7955382018180235,4.538778247328461,2.8446423135511867,4.977278228704228,0.8209390472231171,3.0399762164989106,0.3312574251028566,3.179151123793702,1.5364145279184582,0.8103407272819174,3.2266922060250494,4.132402620456607,3.6639336482497917,2.2328550408670624,0.6561050376263955,3.633770713979656,3.054189167090189,0.3972686125750746,1.5894315560212613,3.2385726161584296,4.441601072818849,0.27744011603166197,4.430259812360716,0.5884367897757514,2.465303065442349,0.2679249866474598,1.2560467511937057,0.7654781438861913,3.848060136242516,4.1632567157616664,2.145806657012689,3.9295118819068984,1.4770360165075924,2.589331833988864,1.9720555622108427,1.4339863901527328,3.8486966650535495,2.5090059828071123,0.6155389479402118,1.869538913235519,1.0753225479412587,2.340080183909208,2.7421996523568137,3.4061579569902323,0.8528584494676239,3.9788272024016047,2.680582912981392,3.5587676225164655,3.318057034854085,3.964113288008726,2.0882149668385397,1.7650734518693856,4.819963565608937,1.340670051415932,2.960860225167259,4.6619189266285375,1.0207791925619003,3.2017920779299436,0.4372304888324374,4.591378606341844,4.465623749063482,1.2433120143064813,4.172572471001442,0.41314611890131525,1.4739680669019473,2.3088898168968273,3.790164424932161,4.71852386884694,4.073850336459563,1.2000313001531793,4.864822898694195,0.8586337270569233,1.6692535295302624,2.107528255653132,0.8123463926643315,0.13531926456337384,0.08700604785010446,1.6085445447905833,3.01604812009584,4.268603671600669,4.7935136339199955,4.291505015774534,2.92298112837487,0.7874167396555787,2.2729601771974792,4.395109165448421,1.9306648743033572,2.9032147716983947,1.0465916100492945,4.581107544967726,1.446014974566796,2.860556451443438,1.7123761628467715,1.211856113437666,0.013716960171988868,1.3489653521843992,3.8756019421858854,2.5153516273186813,2.4599324221137984,4.948084375614501,4.099920882456903,0.22647886850346577,4.905999938716574,3.2998980482095828,3.043791725301527,4.357067391754979,3.2733648209532182,0.04312337585890669,3.641061733177864,2.7774858490121455,1.2061868043050972,2.8484766464838263,3.2386369288723538,2.2961818318969716,1.9731292587935167,0.1597255183537094,3.9487692857907977,1.1411812255174192,0.07984895291810568,4.044589473106839,0.9703637988865099,3.0119134469815845,3.624612954833182,2.804884677118069,1.377063931310566,2.010496940202432,1.2500864577256432,1.2172234827342177,3.2981199467032454,2.672917651014318,3.5044885077486354,4.9528532646678345,4.400917829789175,2.376596989128912,3.63753297947785,0.6412707386380179,0.8919538389383741,1.9461729948524797,1.0385977919198763,2.945445290286547,1.4521769268278661,0.9277023994534572,4.313220188730331,1.3968633006910902,3.809105684953976,1.3904091300701527,1.4804797865740338,1.2855161489367284,2.3363352464449747,0.1136237295388487,1.395442280448701,4.881315878588467,1.370498825765013,4.203128300482288,2.352700518419666,1.4350562311397819,3.467199646763154,3.3466022347571647,4.693021272703789,1.6762475620115025,4.232100994070174,4.631815511140126,4.932585288445257,4.188346976143134,2.842310033784786,1.2002810837828115,2.3989086278420246,0.23020636139808648,3.9431222975915023,1.8562801245399652,0.020095818432411816,1.5259287400602661,0.2743638650834701,1.0866806910874327,0.006012847447496306,3.0688465450678004,3.0024932751343347,0.5681539984842798,2.3905684345969913,1.2289988979831235,4.458642912796028,4.347444362841589,0.9400209464309273,3.2748198961713584,2.828196439617796,0.7854910184862351,0.8221146277383751,2.530870553011205,3.7179769060785626,0.8772995782639581,0.2516511487477069,3.6578004322491897,1.3523121214867884,4.199605192607293,4.881046893607406,3.569183264150265,3.082505915574003,0.06694375930408114,0.10096067947542364,1.682734073182064,2.626904873796504,4.247680117516246,4.632333098449229,3.974580031845907,4.168653399133734,4.163498876254765,0.7463036259144562,0.09645104355413214,3.10518839016366,3.8547385630325106,2.4148381339923306,3.7017835183369807,4.527563898563312,0.6477881587761536,2.1517153960833344,2.906663759977095,1.767534549075388,1.480137229805859,0.8271441102490373,2.4077163637400565,0.3436167347940611,2.4716643244544425,0.5792448886543433,0.5531656343330826,4.426507551784682,0.5144866203861453,1.1514284226829763,3.00446699147507,0.9732152969073016,3.8035367420131996,0.40453822972074116,0.8461762372261561,2.455323058447836,2.111031682703459,2.082290962219032,0.49795236787787966,4.828097689395463,1.3993099687674126,1.0477124081353684,3.7583227226951346,2.3668852762305583,2.271555267091893,3.3946458379733135,1.6360802833845856,2.737385826142351,4.4283299563968646,1.5373996776183307,0.9161051312356572,1.3107046876442374,4.947878764721026,4.993556074137233,1.5332664248396533,2.8532744371681016,0.47250579584986685,3.9255317573822657,3.8805823708874145,2.4482524073075327,2.3881209839321373,1.564631009297759,2.217511333885355,3.8079555065896917,1.4136077719518192,0.014100500853194697,2.4189821593361973,0.055999274426912216,3.6536569551518596,0.7873205939546823,0.6436079322481525,2.778784505938331,3.8434328675838882,2.9937595696471666,1.090999958716392,4.313997401888812,4.779991305218468,2.6071606812608525,3.280738137666251,2.1362165627743144,2.861256664254046,0.30196159569268466,1.541864904525334,4.940922363755864,0.34625568450664335,2.2260157259878133,1.1551145388620032,0.23785133724424812,2.682752810316764,0.14934919094884647,1.8706422181496085,2.477372501258537,4.1512334046880515,1.8089777275990804,0.4026788456642705,4.3032434189959226,2.846420217105977,0.7707265968326171,2.813788998668998,2.86833342116842,0.9808475252778615,1.2600250210220343,2.7634432251691097,4.085789881941917,1.505311412671737,1.4848631718431204,4.4498237001743215,4.522609378029619,3.602808361601193,0.24656406782186502,4.616576679425224,4.381700148912385,2.0013092496133176,4.282305768550337,3.8434218932400768,4.250018234552963,2.0597834354352162,0.747143099192149,2.092398516780798,2.898725864357189,4.652236192734376,1.1480594963413837,2.993232176605666,1.0719673111085215,3.525219918008453,4.03175058634559,4.909544506153287,3.793551074550071,3.346093634070275,2.7012188126911294,3.5171658883143087,3.7786430136013216,3.969492436840778,1.496330641793887,4.563598000422533,4.3869375711245535,3.604291596496141,3.0458953189964344,4.2602983747512315,1.3392289437812699,2.0091883326703632,0.37536042468354847,0.9097395020436005,0.412033331168854,1.184068172860634,1.0474031539486184,3.344137222171837,4.411809441339561,2.3670521531329958,2.121029779617636,2.6970359707063274,0.9841769604026229,4.304654215074355,3.0507462232969873,4.546754277748516,1.4133096123729694,2.3819320736440233,4.800771576747921,2.9645506109778696,1.6775929739772644,1.4628046556393592,1.6938820131536936,3.8529332660354765,2.1998157688363595,0.5724442084604497,4.446551815063739,4.05361412074765,2.064958596647414,3.182107842955093,3.7433096360535076,1.1954389155134082,1.6721030984817742,4.158905227229206,3.445129396833316,1.3850507208946317,2.0361432039478613,3.8445581879315815,3.087991310595223,1.0285520731428321,0.31755749404451694,2.4095828173426614,3.393117135397228,4.507788152595726,4.559628012695089,4.048328011907873,0.3024124055814148,2.5526811783337533,0.8645184906063774,0.49053811051730345,2.999087058883391,4.874628244968378,3.633795492908617,2.231897628064663,1.8312010035547621,3.0219924101350824,1.9612359542366309,2.5859985196770663,0.6118178778003114,4.549093502190983,4.497570673794204,2.7641829166697383,3.920382831268727,0.7498621468740285,3.7245672456982923,3.5895981796619103,0.943608493545196,1.42804923753872,4.857543602780488,3.581481566325709,4.212389411962123,3.4009965999057257,1.6466038155298834,3.2919889512866685,1.7702553738735272,3.917865391302927,1.01797655505509,0.550697391863818,1.0189714323688792,3.440272562852255,2.9791466109532525,4.734457330156328,1.9364418976678188,1.1607056908885671,4.810585331970543,3.0428972929212317,1.3285841363475304,0.13556535688651117,4.447582004905781,2.9202118904553753,4.400396423191494,2.148315065709181,2.509182490520141,2.6945402413811568,2.2199556131949016,2.5265425507145824,0.9550426517811794,4.321989822658261,4.548757275095698,4.033729261210752,3.828446039280972,1.399712218349568,3.3265680281303833,4.501824812619827,3.3644859096019353,0.9824199944644307,2.0936749138700437,0.16405361722324985,2.9917965840538416,0.2464730510413926,2.7521984190458157,0.9217294600709303,0.004576110501200992,3.570592341403719,3.5394441763412567,2.7622900257280767,1.0401117484445466,2.420575718422986,1.7701543734084668,4.773020506612169,3.6935799217536602,2.4531498055000043,3.14820044362612,3.377085998511534,1.3827501936806919,0.37118002359394886,3.092710979505353,1.9979032921477502,0.5869292676766769,4.852495229732185,3.509069864819203,0.23929275694552055,1.2122442845731096,2.8642379815851493,2.336084636498841,0.3213608621999797,1.312130935238175,3.5611297927441465,1.2817872389048146,0.39975986090891813,3.712241028704989,3.143825680378285,4.588646097699617,1.223285241088664,4.2067962382192565,4.304695951879356,3.893965925451637,1.8711653713254528,0.8444134069026188,4.441927599828288,0.3753824440793563,3.587628064249598,0.167660112362088,4.091606478453064,3.9304904620324788,3.230598983361548,0.828671140639976,1.6185133394758222,2.8894562960876478,4.0282567480756315,1.7633704956449503,4.806031135623844,1.1229616957308541,4.062229001466471,4.0337416116447695,0.018169548588010676,0.6350639154929538,4.639936415091493,4.500636497894926,2.8471639054976263,3.8062235828745905,3.4571318702655995,1.1185555731385821,0.0693421037122044,0.935765305748284,0.6691142276046957,2.6689056328651417,4.969713025504033,3.1000992893738966,3.9187799351496313,2.5444698000564148,2.8047832125858987,2.825379393093094,1.5803438413092596,3.4191104636942207,3.648997658906894,1.3342016149396907,1.7576028232767438,1.6588483425768297,3.6199485565258236,4.974657226606055,4.096023908761188,0.15644180963687027,4.19882636751248,1.452265578366968,0.07250337193657197,4.677700307366579,4.361851898078987,4.053576446289114,3.7920156658366153,1.4266044358136487,3.193458072289881,2.095716071432813,4.72736087311541,4.196418824645423,3.4516941001647625,3.058066766187446,4.594135287938266,1.3245193235057529,1.1072522251819406,2.7103647894875826,3.8919048483423735,2.697253356721616,3.613018855448397,4.027047606920333,0.20993522967416856,4.053272274276448,3.13535296143559,2.50417481014255,3.4337063514334263,3.7725061981201757,2.1998343818327903,1.832909563732722,2.3522863167126387,0.5360280308338794,2.9710183499085274,3.533627026961901,4.8249109548915445,1.317968496784847,0.45551813804970864,0.03224098042174939,4.084768662993774,3.2784858003111363,1.6926397596009135,2.509414537767775,3.0299854159761375,2.8024811340053946,0.08728628857079923,2.66854817951676,4.385601836290434,2.6170038085611083,1.3950358019762077,0.5926437940125717,2.141316316957208,3.6156860655589296,0.29067828927115125,1.6900644439741896,2.5939615737605948,3.018994249773348,2.041274200623034,2.2324040677220127,2.0935581847434848,3.213517315829846,0.6109575067517348,4.448106952037291,2.8310004494877727,2.9164316017609684,1.5013825479652942,1.1932041040070185,0.5451509093254947,2.8962887537714965,2.8362335351155177,1.9822793872220013,2.5816143067091444,0.16135255188978848,3.7278107610008027,0.4341589226597453,0.2859259000685521,1.31180200010931,2.8125996106184137,1.4327040061271845,0.20899337413272323,1.0948379410851194,1.3142949605150134,0.8307791946837173,4.584943828852853,0.1881572601176884,2.131565014755037,0.3430745603569729,0.24268701297820772,4.709141030307454,0.8739840161421153,2.6099107237824803,1.190750758056398,1.041696759616697,2.7925800409541637,0.5314469937482769,4.39618785813281,0.17585980383411082,0.6763057469003153,4.863547730011742,2.9542168456732942,0.9992752590332943,1.4774084025800016,4.1960867026722966,3.5374687252066996,4.931446099819507,0.09235739603982385,0.48849531731330886,3.3450773170071333,2.912296466992672,1.4454632488044972,0.9082017467278125,2.428387943872284,3.702018532692782,2.364068347630205,0.05878784275305082,2.0819718334722315,4.568372297011126,2.5943964722065616,1.8960355359654035,0.687357284189799,1.579531949127384,4.7932406634776985,1.9920758147895246,0.9853299586285114,2.8081838757596946,4.171639656889098,1.9930260266206123,2.230916032110329,3.0746572626804944,4.674462466604435,3.8418736484184244,2.8931749332724688,3.016196073141213,2.434582438120091,0.562699223653943,2.1614680107312125,3.5505654706781975,4.624417988361065,1.743687620003096,1.1637624680172043,0.9514389720650673,3.59924854128572,1.88227018220114,1.6768452430156289,1.9250648692423955,1.62961561392848,4.228964435724405,2.5963636862677753,3.841148200778741,1.9010515772494518,4.005923730193758,2.6672423041836293,2.971227361721369,0.18923870474486515,2.9423103162166275,2.850085505943226,0.12829363916755931,2.8404563440620025,4.23349989781979,0.41504717275836045,0.9895573162537596,2.900657219284344,3.0783949626241194,1.7029672352117808,2.4989424811195837,4.774754813568584,3.921359043859044,2.8448499614590728,2.6209581618677005,3.471429529357012,0.9683425754584629,1.1440412522158405,1.7408982092074188,2.0395833144594633,0.8620431386834038,4.7995812245000655,3.88754565954444,0.23484565142826042,0.0860706039739656,1.0412034392853597,0.4939841021355029,2.2075798777702547,2.826970208402594,3.6001863478275045,2.921259459375344,4.816314735184718,3.4571447739959336,2.1467695355080396,4.500973612282912,4.210273060323491,1.638328728956776,2.8388700185407734,4.344656080595785,1.9445699953050744,1.0398614596006084,1.0619513758388655,3.115647546661733,1.4975793015033134,0.046950581736380226,2.3749803728770127,4.496609738650605,4.005316234324663,1.757919203863646,2.636289550311038,3.877103542719218,0.6698687423511873,0.11270882312666375,4.118207052427913,2.5874813093513938,4.938601184817801,1.6327717316487278,3.65042664274518,4.81040168015093,1.3271158982605191,2.8651313876114037,0.4266992961938687,2.3117221147109692,4.04453326529357,4.169487034100273,2.4200038119667733,2.4243955575464216,2.313034388695413,0.9834082652331422,0.3748626260692989,2.300636105561542,3.7282656763419464,0.6986600351445715,4.534483431692735,1.2827417220150306,4.213397610488661,1.4215400250504717,3.761857823345723,4.500274780970763,3.848735801664498,1.8942581511654488,1.3639147899870918,0.24478185154928944,1.9561427083472127,4.175595029260844,1.1652985169737495,4.441795903990004,4.9573685926657465,1.2493891347307018,1.99193654548259,0.13061517968862457,3.8308547952952066,0.5101408891129422,0.17142893641855173,4.17371976166801,1.4328331406633898,4.159744582517209,4.314417428378041,3.8952408655744897,4.189865099277718,1.506713686377048,2.310261879976123,1.4715558109286275,2.369139679686094,3.446208762610381,3.664544043116366,2.7425987353233596,0.6430353650266207,0.0066370688426276025,0.4007681885299097,4.142560242361303,0.6161544635606286,3.283461720185741,0.42167454814197036,3.264264612439012,2.9056375221831363,4.558445041303212,3.510390310822239,4.311229342661319,4.4367445726230805,2.6227303558821724,2.989632136630865,1.9855755112280582,1.334108517721898,3.7356427235888,2.1242174860892273,2.688976724229347,4.84711368534298,2.7785379034568205,1.301812802227319,4.259932584259519,3.458908608778646,4.126493602727609,4.815989645205169,2.3900328004156632,0.9046632357533724,0.8223118896701365,2.83852045754017,2.677307194948988,1.1759882115592324,0.05192212266587393,2.995218057500076,2.9870134472136423,0.22916055584642492,1.3185808689792133,1.8794837712289958,3.6400143700578305,3.8196744657500457,1.0079204089275773,4.5552748011645425,3.0544580607577085,4.287864410705337,4.7999041580595705,1.8348142212634244,3.805215130763573,1.7496677323648746,3.6933864574466413,0.5427112604994655,4.281919582403843,4.334058604006633,1.4244290191025666,2.4945432916608112,3.7981404951289175,0.02977893613075655,4.736594505855781,0.6953825014462245,4.168424404529095,1.4625083090908841,0.619244024466088,4.715684080713203],"mu":[-2.5155776803413055,-7.1059368977267905,-0.12616900894874217,-6.365598373305124,-3.396532201045712,-8.567334300365443,-9.515837429851192,-4.413001410258904,-0.1433649682572602,-3.6470022417338344,-7.162476227759413,-3.4922998829340846,-3.175028365320156,-3.5897200434167753,-1.8814085412788573,-7.309726484498993,-2.36616197337429,-9.447413681247138,-8.667192850372187,-5.962768137113241,-6.299646249144013,-3.9443826675737115,-9.40350932599957,-1.5875474191863792,-9.160288703830696,-2.487441299494755,-5.3855040502606455,-2.268609357936009,-7.890582437850407,-0.5067440816938196,-0.6074290195592535,-5.823008278059305,-4.703321303730672,-2.4827053677906363,-3.3493375532168534,-4.806265297564838,-6.093022327599034,-8.534781123937076,-6.806007212849465,-0.8766321599114479,-8.197352865625065,-0.19775609638538194,-9.787890847121886,-4.001193415507835,-2.558911601447942,-2.1187356702633764,-6.961641148464485,-4.35208484099324,-5.447487093225329,-0.5228975002941594,-1.952318159610933,-3.8941124713672504,-7.074792606266933,-2.6845230322586167,-1.161389950328966,-5.880813970050984,-0.41926275209441366,-0.9215834250717925,-8.493079814429976,-9.008751491871562,-4.634124962922696,-2.8393574237837838,-5.8592231552400165,-5.766351167038137,-4.442383783542015,-4.719718561750346,-5.87518057873845,-2.0634201195224344,-3.3234414422201164,-0.7703639585294075,-3.2689819587474545,-6.76486858891683,-4.922562597497063,-2.456375210470525,-0.7325985943263547,-1.0780208881877695,-4.5029702770324835,-5.79717684592584,-3.103343613445222,-4.3868238718193275,-9.5577576532209,-5.863603568346411,-9.148897063215799,-9.65815074001458,-3.5854995259623967,-0.23840190674294437,-9.876175640138065,-6.987849711535066,-3.775216800088732,-4.740183912986165,-6.946861186492425,-3.6098758352071725,-7.210076570970269,-8.523133230445566,-5.779792464344922,-9.758003717033464,-3.785673190821981,-8.049541782262,-4.634590580639841,-3.2161091163909394,-5.702448752442983,-0.25544275270511063,-0.9025999804383211,-2.4648718435511396,-6.261623198380175,-5.995800298158778,-6.015535090667439,-7.326026953063143,-1.6546053172457231,-8.238458337425785,-6.987005730682975,-4.335861355325184,-1.9566717891371743,-4.076633657296389,-3.1775010901542755,-2.97954183305126,-0.9492569632420822,-9.735591710191198,-9.292102855194093,-5.3234688641675625,-2.2842895121798845,-7.170274850428022,-8.040448785631165,-5.963250503145985,-3.8818503330002097,-3.5014995330541843,-8.035527769067883,-4.991190710410747,-8.018326606870286,-0.18593151806357566,-4.989968192726648,-9.595229111207637,-6.107686767517794,-2.8200581525578516,-0.8353590804122879,-8.884252515366985,-3.546621449587475,-3.3942637554034927,-2.6637288639619694,-8.482750315206077,-6.920129431136579,-6.709067715361135,-2.072796525412801,-5.377521513995928,-4.9174304420797,-4.663801940736116,-3.935367973379118,-9.26165815594268,-8.405764436121787,-8.858016026714013,-7.562209413899503,-4.620488050656013,-0.14257855812095377,-5.566138992492586,-9.670888848522878,-1.7820325343830512,-7.850929728980807,-6.0715837264624195,-9.052101908458246,-5.43800922460737,-8.11617527703554,-5.07990381444862,-1.3901432530476376,-2.6321420580122545,-8.363653593862626,-2.7416479701317997,-5.991508974799034,-6.593887003813748,-7.677402485396449,-6.643751782800993,-9.99395890368296,-4.9306630622555385,-0.22816197441506425,-2.54842708323076,-4.259828647297626,-7.3578667129356585,-1.9089555446891482,-5.373347584687864,-4.049961036941951,-5.36075042340425,-0.7495750631074127,-1.0786364533687687,-4.360598332561912,-8.309138559257331,-2.9597160554346735,-6.514970782545786,-3.365803377627985,-0.9576678719181131,-3.4669494220238084,-1.7163622273238865,-3.879612669450976,-4.17773252172664,-8.403478129892077,-0.9154349725214916,-9.190528029539948,-3.246525833642988,-1.756186990514157,-9.186307743118702,-4.737574601182022,-9.487810712475804,-6.253861189334284,-6.9576032766158775,-7.868180789365229,-0.19539542564379175,-5.811854749665621,-7.893594675937246,-8.233900721313335,-9.27746779539039,-8.45627612518407,-4.1851785227242155,-0.6354342714178673,-9.79615277178645,-3.4882558633050276,-6.423598462423826,-9.06195868462497,-0.633480788891243,-9.666075026158289,-9.488340292923807,-5.687692929362848,-7.310445542234376,-3.544230602940315,-5.135381066050957,-3.151354451520776,-0.5605763453336032,-0.3406581022436428,-0.9555697622359105,-3.8231611899538342,-0.9084118590888912,-6.82254088766517,-0.910597552871748,-7.958803556346766,-7.761559500645221,-7.468047068294332,-5.727834430807432,-9.832053956207856,-9.067856595159931,-8.13815926962496,-0.6550603379353026,-8.695573018230762,-7.547658027000603,-8.143582042084619,-3.0809459825161123,-3.370280947285118,-7.677653771588315,-4.070166661200361,-2.926914758892918,-0.298385108343433,-0.1795006412284761,-9.607479555040936,-0.1995596855868942,-3.9778699500572734,-4.524309319452639,-7.457015173670481,-0.4279223443032487,-5.670962051119293,-5.065333465346578,-7.855094384359562,-1.6321791856485723,-1.573337686320282,-4.779344801020318,-2.2383212537068187,-8.050054289116186,-2.9704627737471623,-8.428212973960958,-4.520486421551377,-2.1367389645360957,-4.332238950976159,-8.372837639422169,-7.1839055363242,-7.567199449174518,-6.1961043457832155,-2.7381636796592823,-1.8776115753675682,-2.051288436924754,-9.762864238116382,-9.765040687951757,-8.0050168468214,-0.16276899619946272,-5.815033940004639,-6.345865406614967,-6.880113562638703,-1.5743928962861453,-8.53418232051675,-7.136681767647395,-6.625161697327249,-9.366261595464792,-7.433067691900527,-3.6521350502429084,-9.2068309596565,-9.378942443852216,-5.827505036546674,-5.489921380019062,-7.268147143877255,-8.773797535515113,-1.4480664871099869,-5.990975451044653,-5.783446854047365,-6.088040856093886,-4.046203501891908,-9.640843856003869,-6.707225206352165,-9.705917348919652,-3.908970064732711,-1.1952575450046798,-9.786089572626167,-3.6121945788649934,-5.624167018926382,-3.107866188068229,-0.07841237191849482,-7.263697016911506,-3.724757653064894,-9.24842713600001,-7.285612852013772,-3.707423299952799,-4.624077567651083,-1.2982484169075237,-2.1050085401450347,-9.618702767817137,-0.1654837230805506,-6.053922076907061,-6.0054485074546875,-1.083852548304658,-3.5710192456094747,-5.37234813254994,-9.57358718237042,-2.0372129132914885,-2.4283599136637024,-4.8451576950749615,-5.912484570107566,-9.465556795137008,-7.081667173777532,-5.966260500288065,-2.7702990377262227,-3.8117024811903244,-6.488612258278879,-9.499312110420874,-2.082693233697841,-1.998126608838846,-1.2510172104150485,-6.6531487857399725,-4.28503965320068,-3.0418244680453155,-8.862193444126953,-9.042597360263354,-9.818587746635515,-9.598519272430998,-9.4173549025757,-1.9971327240683956,-6.424220170292065,-1.4614310290490473,-9.553497617074708,-2.8435086062270787,-1.6931577263862807,-9.195351449276137,-2.742168436912422,-0.2404016643527629,-0.734552405283595,-1.0634344864529854,-3.4838628501249658,-6.338274561342394,-6.271001961781639,-3.0335797673854548,-8.821324595330527,-8.647061593934893,-4.319133988024609,-6.288498092643118,-4.227862195068712,-2.2355637485748514,-9.428482765338298,-9.069724271093664,-5.6507798451023845,-0.4165792100954646,-7.444148166691273,-6.486533359061733,-2.4924854773099114,-7.663604762867116,-0.26225766396837047,-9.65425532165471,-8.798485040555908,-5.714883768233692,-9.026666604072853,-9.495917127671213,-9.162818553933123,-3.6828390826348234,-4.425175944295248,-3.1176575142820973,-1.5791978367314208,-7.51556610391866,-4.482746735376361,-2.028225080657906,-6.8612719184220055,-0.22138560254029827,-9.100012418276947,-3.233298906351567,-8.748792927753492,-4.601286860398462,-3.070017549131261,-0.053042693716516265,-3.2016259143293824,-4.4053312575192844,-0.9261301698222635,-9.061040272010565,-7.625745403210198,-9.577882271497947,-4.03967767737758,-5.4791809746744065,-6.203259052095325,-4.640973712850558,-2.64993210075837,-4.58951039574081,-9.677902330371918,-2.75397261766948,-8.964386782020608,-7.2101640487215235,-3.3216618096396977,-6.877197065303752,-0.2856696013106652,-6.2094384474100695,-2.2785339787276393,-1.434478978619389,-4.846399834977067,-8.130527595363697,-7.909867574365245,-6.840040412889607,-8.867656356418031,-2.732583804089297,-5.720093507706392,-7.212589680940324,-0.0525462784534092,-8.79139451872449,-8.013000916773496,-5.1488046161003815,-0.16520632117124068,-8.21781009810304,-2.1334304516071567,-2.4748520239307226,-3.669483877995303,-1.7938932287579124,-2.247857465915384,-4.5298856961495755,-7.9437197601702225,-5.947363062060358,-2.442710759147144,-9.452529245997601,-8.631879541541847,-4.232718782154801,-5.459524786226093,-7.446948425070088,-9.264806496611799,-2.971374675106253,-4.412697098353742,-4.059822344690582,-6.056655589332534,-6.822613338743794,-6.761530665024733,-4.83543887896686,-8.091375363887279,-3.1645859292864897,-5.756873321408933,-9.210903197266518,-2.823393974971933,-8.839126224914288,-3.126250967129629,-3.909618052232513,-9.657874867776348,-9.592900823471531,-4.839749223398471,-0.6215528436063433,-7.105508077101792,-6.202851380442795,-1.3583096301739706,-3.8337298601097802,-2.266841995351334,-7.994380031426179,-4.988956699143666,-2.047763999069885,-8.488806774699444,-7.484540473991615,-1.3796460901840124,-4.458947344568949,-2.867281400132402,-9.251213566353691,-8.002971546687096,-3.498905416723268,-3.793940647539946,-4.783524227589224,-6.736512160516133,-9.708262057496832,-3.230979241915748,-6.641840321465349,-9.036597292995337,-9.6579987971418,-7.459696313569275,-3.6587438693950425,-2.7441477231301503,-1.9747384946576974,-8.915772512628648,-4.454668037206735,-4.9130168311803395,-9.782008451275416,-7.711715523352032,-3.7440519768502245,-3.5822657957389703,-1.4545898649758504,-6.400083475150056,-8.53460448925503,-7.158412091839084,-1.9251293073112863,-0.8140958637464801,-5.5492966896518485,-6.088851607731285,-8.060621674191356,-6.91519645292453,-9.207228724875744,-8.425930910667574,-5.72452506877606,-8.99827692661393,-8.430950064057514,-7.431212606887998,-1.7624782953125706,-6.788648525929235,-6.073433972647912,-3.258203662000052,-2.2054368495159005,-7.0765543026294475,-2.9862770260558524,-1.7015918033027644,-9.723252661622928,-1.7269929533667172,-4.8326339711171435,-8.530771122097251,-0.7025988846597486,-9.901133204030842,-4.564327785825957,-8.21653726985192,-0.8152841013736145,-9.436597256471856,-3.452334944024087,-0.3813281121300327,-2.49024487562034,-5.127285982477037,-7.963840661661896,-2.7198314921441114,-0.533832822666851,-0.7335056162968367,-4.084478748095832,-8.577728615946453,-7.699173676141475,-8.946662843417975,-3.8862930301177756,-7.97249737740785,-6.0625299508072565,-5.430800724072582,-4.608274012045051,-0.17843731664749507,-5.851340444659099,-8.019123287669006,-8.884414354133792,-6.365543130727593,-8.99389122531437,-2.6965200884048524,-5.214719924344928,-9.65699562964879,-8.66733612653336,-4.426089518428508,-5.177410190359534,-3.139298084391442,-2.335612863544674,-0.7427979700695397,-9.50034916674541,-0.25985744712127,-2.653796164219111,-7.799038729305399,-1.5802832803198896,-2.211390158562323,-9.131049854661882,-2.087203377961868,-5.098733731927718,-6.5654453922691225,-9.445810787782493,-2.426036480226914,-2.9806245894770766,-6.851820245214402,-1.342425053329448,-5.071908429633365,-8.719970707547851,-2.689871727140798,-5.360634553448451,-1.6192873264778362,-2.149233991109658,-9.733152261757569,-4.420797504472391,-5.902706862407989,-0.24088171696718064,-9.620533097379385,-8.14855732308915,-5.779329539170326,-7.596453074059964,-1.2094833677717132,-1.0040540491617156,-8.221078529697042,-3.7790744533864573,-3.050895928131463,-7.899145209415512,-5.902425713275699,-5.2374587275850315,-4.109856988823157,-6.457249487044785,-3.294788438195988,-6.017566801736014,-6.326202512673391,-3.6826312436080966,-9.774199624871141,-2.4296711657035464,-3.760100983198409,-1.3421543133695146,-6.843724018171189,-8.941027059263561,-9.711254308707911,-3.10546711957723,-6.700030076117844,-6.66027868918369,-1.318771408945727,-8.735919392964032,-9.117926651810883,-3.4654634339646972,-2.655614706213625,-8.093519231802304,-5.362417301591287,-0.9223952302842098,-3.772884483686212,-7.3131914512683345,-6.895563667449805,-7.0524535101718655,-8.28683167443556,-4.781878506653108,-5.7742293254196175,-8.506533545847415,-2.2526885671944585,-6.620842274956349,-8.105554563654813,-7.736050603508526,-5.3203634572784,-1.1481456004912372,-2.2944470586081023,-0.07108981098569389,-9.502718464210105,-3.229169699284995,-6.772036978883776,-7.496687855082412,-6.3276706817690105,-2.9542736921820123,-5.986233389817723,-3.4382544377942836,-5.5704719057932905,-6.49806095203596,-0.6879266332309664,-1.3617974712230807,-5.200445685075934,-7.860491849987032,-5.828087008214142,-4.929734093954423,-7.8207922602330004,-2.5329026045460945,-0.4818302608367908,-3.9985214697850013,-2.7638169497095477,-9.913195219518196,-6.517229486824263,-2.812325239765334,-6.60645760334996,-4.855962996071486,-1.956806913660496,-5.046386758847349,-5.624023974063852,-7.95333205030836,-1.4847255592154984,-3.2626988260225054,-3.0952770887893655,-5.377560607326821,-5.3135099268723724,-4.475881237625927,-3.4140517968592543,-3.921136842901154,-1.6206610078452477,-3.769647553736619,-5.99948475766785,-1.503731756256168,-1.3059434114676427,-4.777022061498146,-6.456949331937729,-5.296259436750876,-2.4419718139509627,-2.3143915358749867,-5.349855299765382,-2.6602344312699477,-2.3265020832503525,-4.9865711190435995,-4.249831331836276,-8.42382571187516,-6.228918955636886,-8.38995281315308,-9.328061190528352,-7.753612002169607,-2.716653019036823,-2.2619924800311497,-5.501739141964778,-1.8512452631740905,-7.179670913896672,-7.811740453478091,-0.9359983849022435,-8.541655982391605,-3.977672479861245,-0.599522439285336,-7.134359972060773,-5.882794562960905,-6.352681849124466,-3.6616680522542766,-2.3847269085637457,-3.005734335914738,-9.34075343360128,-6.028156053882814,-4.4535509505389825,-4.395881239901758,-5.343474015751539,-4.96608267697213,-8.458495695050852,-1.1462449809118214,-7.27631414878239,-6.928031513506097,-7.051130482937181,-8.016787121976224,-3.8619076725653922,-2.9169870533186337,-1.2237497094397343,-4.663785101814204,-0.2089345033685963,-7.73453010073869,-7.582476332104456,-1.1739620416983243,-4.363392365469574,-7.228239225762703,-6.648348823455961,-9.146148665525475,-1.5379188051140447,-5.728035789452123,-8.25700506091626,-8.163496762791066,-2.946565407185937,-4.2324086558780465,-6.990148783051735,-7.655671615296329,-3.1639237716621404,-1.5997772342863614,-4.279248512370161,-6.027139091761606,-9.984260531185406,-5.824516162982469,-6.9063985881356675,-5.397319796774765,-2.1529842303874203,-8.650157206198735,-5.3342721942721605,-4.00025028214078,-7.803828699121917,-9.225135703097697,-9.486409474949928,-6.508670452021792,-4.278092925482733,-6.384534458968094,-0.3572582723754447,-3.8620544465634077,-9.595053330193025,-6.84666695872904,-6.869446747650696,-2.7952325456448612,-5.328908106260779,-9.569562485525655,-1.8066572517152224,-3.0631071811278088,-1.16312460575561,-5.930365833695754,-3.6542957578277324,-9.998217904402498,-7.022560520471071,-6.926804162445639,-8.917783108846738,-3.7335688223971797,-3.259862795177717,-8.605858680592117,-8.092273055732974,-6.613865239213679,-0.7083000626539215,-7.72694144969593,-2.3175167895207394,-5.792167780112736,-8.506180974573294,-3.6157343950948873,-4.612381587120067,-1.14487655726504,-5.587294532547715,-7.9257833619494615,-8.053799899983645,-7.280039338207265,-7.8582936093623035,-6.984752048035647,-5.806125239557865,-9.087937390821313,-5.628329500661778,-5.198579267166508,-8.895388705259734,-4.367617541744386,-7.59833524887074,-2.8795135125946136,-2.2115346014614157,-0.5491209149808629,-8.580052396476038,-4.3843133686290585,-8.534785974935028,-9.261440949116889,-9.937467622499515,-7.162128566513024,-9.7132932923455,-2.445409871462856,-5.097897017392901,-8.094891587147755,-6.0130729387254185,-0.5239036303083866,-4.99755048953139,-3.278413388032222,-3.2152945853282544,-1.1675678637314646,-2.687576498660298,-8.76617108872007,-5.68089203800022,-2.5486715431443097,-1.4666625400826905,-9.939049096717953,-3.1302923837650876,-7.896443086305509,-7.152869395034058,-8.325621619641863,-8.835712252183477,-3.212122665305819,-2.3332467372586474,-8.5411115977086,-0.8820225579584173,-8.522024486831729,-3.252941460609846,-8.59387328217732,-7.667378057100449,-4.3003883340190585,-0.7009568549030698,-8.051298528909168,-0.0619342490483743,-4.843486256711806,-1.752788456458958,-8.525731417432286,-8.806499421817549,-1.9286147068872639,-7.771315905564959,-0.25343364344055264,-4.064591614897162,-7.055904532074811,-7.545387581959615,-4.157008167056664,-1.8412602874020934,-2.2974234999841636,-5.646687357850782,-2.3709544241390113,-6.899688821393514,-8.064435413584956,-6.413134037555692,-6.41741264603904,-6.978011452944479,-7.149611335856687,-6.74809796508735,-5.459847553316655,-7.808813088949551,-9.79650092087256,-4.657974805115403,-5.265221639616275,-8.996003187870096,-9.388155418815893,-9.659920281712326,-4.367534420506772,-4.082582558921599,-2.0862173411217966,-6.120338017809477,-9.589750574407663,-3.295455791317574,-5.461200702218692,-0.6989741743169131,-0.6353820322158987,-7.036013694672302,-3.1656417187399843,-6.287095277114741,-1.5351470740287665,-5.907346515914376,-6.045292931629566,-2.661582172047654,-1.1161332478007835,-8.17641801981315,-6.994090472468968,-6.8778295897578,-8.139207188891248,-1.8956421473290752,-5.7873505597277575,-8.2452420158682,-0.11612046478337801,-9.21607721143677,-9.69290347975569,-4.563696202539848,-8.448085799441955,-0.2858412828996548,-7.0226807625752485,-2.627349176773721,-9.921376151850403,-3.243676703480509,-0.4028924576140147,-1.7413076248697723,-9.430145727848942,-1.6360510905375314,-7.9700306901559355,-5.81791274655944,-8.114686829592028,-4.596482605950163,-3.0653389644843076,-5.309957515949899,-1.9886400910350677,-6.019445247489568,-1.701261738038975,-9.746418502362232,-4.945318240397503,-5.149826839861033,-9.203570872528816,-1.3699659538148778,-9.48274100169166,-8.955444644721084,-7.530183222525338,-3.2136271952898654,-7.280021307341502,-5.655807535804378,-3.2311421202329282,-2.7437031877437867,-8.859655172923448,-4.0353041858745105,-0.9072777622488215,-1.596752828960153,-5.9405849259076415,-5.8857381168999146,-4.878046459263836,-3.5743621159465544,-9.692478322393098,-7.011977392234021,-1.0066439262401716,-9.894828056245565,-9.516146659261986,-2.8100287522694067,-0.33917153381990195,-6.668007623545624,-1.21316736034637,-5.261057051093103,-8.25588961329137,-6.624564738445851,-4.550209688854867,-2.6966529454013566,-0.23682978905905205,-5.706383371754276,-5.550236815505761,-2.037490226923173,-6.727063881357491,-2.122827621963994,-0.12556909594486854,-2.0151727883092074,-2.449520516549566,-9.75308165557912,-9.90376186942472,-8.508106414581789,-9.601500581313534,-1.8433432816458994,-2.242997358535057,-1.431384937074669,-1.1854018647876785,-3.208955951057504,-6.717238024327501,-2.405980978080704,-7.788688225058258,-4.55840492424784,-1.2836081261806198,-1.4739917787012313,-7.706434781810005,-7.4837440892774065,-9.475100537125803,-4.438442319715536,-0.20334827618339713,-6.396678237080307,-9.01509683375676,-9.730417909369297,-0.7877983902071595]}
},{}],108:[function(require,module,exports){
module.exports={"expected":[1.5927482031259814e-37,0.0029940703894838975,0.0006212128791938051,0.004006333787066821,0.012924840117170155,0.0018155738350020367,1.5653055906410877e-6,4.615375683696602e-10,0.00237255166970806,5.095409315551527e-7,0.00211141183335813,9.8186455991542e-7,1.2621527935022962e-22,0.001167586319571651,0.0032653096764838296,0.0007973612465506219,4.509951243443388e-5,1.9445385807446786e-29,8.02668500714544e-6,5.244235276537172e-14,0.014187494536292214,0.06192424222493529,0.0012410622284033967,0.042390831174631306,0.03944538157927103,2.0450171014950724e-10,2.1968215340749722e-7,2.8909782365169724e-38,1.5227176417550045e-5,3.1791944925253586e-19,0.0016773605320269858,1.3472581761427458e-7,4.8394451487774675e-6,4.939669127396947e-5,9.139736540373507e-6,0.02653201313612984,0.0008483263540792406,0.0011697691474940133,0.000220146261535644,2.2476964694727586e-38,0.0006151367615568503,5.353319975666328e-38,2.8507220951022646e-10,0.0016693856007568776,0.00037243845808545927,6.388864244928248e-8,8.188135747919536e-9,0.0008232846065979062,1.27403199473249e-7,0.04168497792676993,0.006138096013638812,2.823080910059028e-58,0.10575548485096263,3.469751547752892e-17,0.00738522872147866,1.450553054712581e-13,0.015264384864128433,0.037506625533148374,0.000911118197670662,1.9170230113458666e-6,0.0025075252378035148,2.1698295407346346e-13,9.053792054133158e-8,2.5789848771946487e-9,5.6709756697302964e-5,5.270845696487936e-6,4.339971757896909e-7,0.00016467581170069126,1.619020966953781e-5,0.018665898901586313,0.013635475097624904,0.01111243277409482,0.0046993822801353015,7.44806412157269e-5,2.1264673958115503e-9,0.02181852248145549,0.0002894969342639506,2.443466590661179e-12,0.004421901849734223,0.0009083766931737956,2.8561726245378e-6,0.00016588753234935671,1.1402179386507342e-25,0.0028118900365503604,7.644955582148672e-9,0.02061246120384405,0.00010001364203013292,5.035259741130189e-20,3.3071562311992334e-7,0.00023116835216868085,0.0011083612102957697,0.0379077120402725,0.005032258402656111,2.23196204240615e-11,0.0006330599286029789,7.3103217309923795e-6,0.00911143524873145,0.0003169829759717802,6.766506583203066e-5,0.052811930825385975,1.694180154472662e-10,1.3420697686590785e-29,0.002052335261029414,0.0017838590302355632,0.009008155756263746,0.038354738189509324,0.012202202752449369,0.000925879281316411,0.0008418544116745854,0.0,3.782944442298994e-5,0.00022557654965933986,0.01229426687365612,5.292283840736258e-16,0.008014733528546937,0.003728356618479412,0.0001265595528510478,0.010715977653963125,2.1357308443001443e-285,0.01449015981569848,3.225177582976986e-21,6.580108294143407e-56,0.013199078758258766,0.010926170727890143,3.060918283533952e-9,0.005016955596266549,4.010092322077813e-11,0.0002682898814266197,2.570079008814401e-48,8.861902455469742e-6,1.3850769535615778e-5,1.6383197533093528e-8,1.4523238906150832e-7,0.0016541797233312707,0.0025400999708658505,0.0,4.972953322652598e-6,2.6849212393557647e-5,0.0027567210883116273,0.008211411377421884,3.7688874478155436e-39,0.009815252292845834,2.142415593912257e-22,0.009422197533126203,0.0013344353638799517,1.203653534149291e-5,0.0007774892351213288,0.008312497378936027,0.0003442684169333355,0.002849910876014135,0.010577422479471767,0.010866898415718864,0.0011994867123812307,2.4059975047976325e-23,2.3788006815667222e-12,0.00041031093452241566,0.03793262182038164,0.002171362438930961,5.577953383962243e-5,2.598700689003783e-12,0.002859622179483833,0.005866852307397165,0.0290045760655953,0.023152673404139477,0.021027601442402066,0.006190812537337626,1.6184659735520517e-8,4.513831489962777e-106,0.00816780360957346,7.29589525144639e-10,3.9376611908331523e-7,2.991612100648592e-17,0.0004414458211165108,4.668400366146967e-8,5.104778033069723e-6,0.001019122679818848,0.000665623857223766,0.007019844444008771,0.0015537895131816709,0.003141844971285574,0.003932745681868682,0.009497495212647387,1.4079081391434742e-13,0.0026475774140058464,0.013057753475251848,2.4421009599383318e-15,2.062390776663251e-6,0.0017289033863299647,2.1361958126593423e-6,0.0016070972592126917,7.030616773089653e-48,1.4178400195303171e-5,0.00014382477250403242,0.001894227423217012,0.006699488860943269,0.002308061598339788,1.1987870625074421e-6,0.011446048000757271,1.6935813488151488e-5,0.0010970080555179002,2.215924408272192e-19,0.0018998479751821651,3.563001922747701e-8,0.0015633924143591087,0.0012687652525182034,0.005947519521224164,4.967930026234001e-10,2.2917870414556735e-29,0.005801900769777169,0.018544207200640966,0.0039053567944595745,1.8954249072359893e-8,0.0013256674967322575,1.2121813910869777e-28,0.025251329630379057,1.335565934896468e-12,0.007020520492689437,0.01939475631971503,1.7555253167340855e-5,0.010640006859430128,5.176609919556814e-6,0.00010540859063361655,0.004257258614976375,0.004670914205924657,0.05327929432056316,0.0001006045977463281,2.27461243699757e-16,1.900206722274862e-12,0.0015492186189062327,0.0009182508540779115,0.0023756153840455894,3.135879167200963e-11,0.00024761369249213356,1.8386332420470883e-5,3.455682210477266e-7,0.00019726444243511364,0.0027476301869596644,6.79113032333544e-6,7.936584408749749e-5,0.00015182570638141096,7.739945848668596e-5,0.00036624067008640313,0.0014747098635498857,0.002042531539318766,0.0004467485203501928,6.581647109404619e-6,4.122235217676557e-22,0.007259836695132616,0.0020921115999119194,0.019621078760290733,1.7142225499671513e-8,1.0153714806038502e-15,1.5089174966148649e-127,0.0024431621167393105,0.0008741646161157428,1.4473385163147657e-21,4.868185557428695e-35,0.012995768640637851,0.0036850557409248475,0.008061878454015707,0.00014346839827963898,4.5313016413669385e-6,0.0018619922366929947,0.017020164295367294,0.0004969372878226373,0.009611635613949189,0.04373413811789201,0.012179532744793093,0.007318886041179034,0.002086454387281822,2.630629773001902e-6,1.3879416855214162e-7,0.00290608855465571,4.400612839753749e-5,0.018720866636563416,0.009921709847468608,1.0728054233625322e-9,0.0001846783547169583,2.8597984468154715e-7,0.002821092941687097,0.009092547037953714,1.1416175379447946e-8,0.0020146647432995467,9.473797383379276e-6,0.03096273020240368,0.00024931485199885915,0.004798518253527013,4.628983651702544e-34,4.537080718632843e-6,0.05508726860243414,0.009876639027813649,7.502269547945193e-7,5.03893851027876e-5,0.00047620512361212965,2.0495266975778e-8,6.212967497073573e-8,3.457573495269355e-7,0.026726369316480095,0.019680063857729458,4.133364407761866e-6,2.401080462997831e-7,1.062097466326911e-6,4.905856773539268e-5,0.03183853951422605,1.995345952899944e-9,2.8467656094066476e-5,0.0024206606333756864,0.002547243157500739,0.0003205439087854196,0.00044564419887624927,0.00014554754229970224,0.013189290756481916,0.00018134493924864683,0.06721593199755077,0.006675802066946033,0.002657367178086167,0.022002614089159007,0.0011902232633219001,0.0011907719799161844,0.006192309604846461,2.2878966938515742e-6,0.02693678693045308,0.012056373239439165,0.0019715867790413896,0.0008231457018968546,0.003895325498449735,0.01607153652967604,0.004614129442715184,0.04819845872801785,4.519851892201017e-5,1.604207884649724e-188,0.0003629206655428117,0.006409810167547718,0.01976308450977071,2.642042657076866e-5,0.0002481964843811321,0.0004344169342921926,0.00024396464108282517,0.007237118808905638,3.4384872724987496e-8,0.0023727352421277405,0.006614003936999595,0.0035474972508349216,0.004870707766209061,0.002576167056707693,0.000917644135625783,0.025655461731066753,0.012659781752630689,0.008436609121200263,0.02362736204277711,0.0009738897961842834,0.0011724102749027228,0.0031865782229468435,6.604201019484122e-7,0.0008717657129164017,0.007529754792154436,0.03521530472108254,0.006454463215760333,0.0012314750387444127,0.001278834307827292,0.0010787252027644526,4.753926477660215e-8,1.5155449285794146e-5,6.179499564981132e-7,0.0062664949962930976,5.520553877291561e-5,5.516981748517487e-13,0.027066011463884748,4.7666970463704e-19,0.00144999349910152,0.001252215667871881,0.00040878327566440544,0.011705443893233412,0.002838128269425751,1.991929306575811e-5,0.0012119968050459781,0.004089480522160465,0.0006448824909694112,0.01291584238140014,0.0007928046482190785,4.819893497863768e-9,0.003987950235452903,1.4801488324811648e-26,0.0015451995454986238,1.0704069657447825e-72,0.00040267896054617364,0.025592306885658903,1.8892559036941513e-5,4.300479174130259e-8,2.8334360442515546e-5,0.011167178063339346,0.00035917879440257707,6.939471184061022e-10,2.7711125369756945e-6,4.15019197358072e-6,0.010441022827254473,1.6011348691869432e-5,1.4572611229943568e-32,0.00117475160045975,1.902934405949711e-10,9.540712012578978e-8,0.008767142456149,0.001123744491946015,0.04103038497848057,0.010610372549199746,0.016899918591434786,0.005655429914337053,0.002524700118344536,0.00015168327805215623,0.015397620883215134,3.8635779033113006e-29,0.015151970235983034,2.344018655556476e-28,0.050966747135478954,4.63466088186866e-19,0.00023610874118250972,0.00018479802017175995,0.00487406640578141,1.1798258077843558e-15,4.8678516424696264e-5,0.001975670926307503,0.00010625943406016592,0.0008125209446488234,0.029548490761628295,1.110765508564041e-115,0.004939475248901225,1.4642391204538363e-15,0.0,2.027008395641034e-8,3.9168860389440785e-15,1.6706062215959715e-5,0.0033831492279905646,2.5320512258995057e-9,2.4027041516522074e-16,0.0020494529857005054,0.0005314565833997098,1.197447397294984e-7,1.368178092239251e-5,0.0,0.00023934025929051378,2.4218431706847458e-68,0.01628871661263429,0.0010543161937433306,0.029644181228150098,0.027672687326441524,0.005441058289176182,0.017793615422809092,3.588529447061532e-10,0.00027765042725565317,7.770338272623839e-16,0.0026331996017124873,0.005076078708631252,0.03860329382193608,0.00361071467165275,6.883587118558933e-32,4.517379972666307e-9,0.0004025694607170107,5.2094952080460394e-36,0.016226273866256465,6.630248456868765e-8,0.022563318059087567,8.633651717800511e-9,1.7583081528115009e-7,0.0034334553844663322,0.000856542594385751,0.002389991881587612,3.116766859740465e-5,1.6834636591037144e-7,1.0605029383043244e-6,0.0004927632308410122,8.595946722309828e-59,1.0580258613227295e-60,1.511340771261602e-8,3.749940373363558e-20,2.4647232187700903e-5,3.958942462263105e-13,0.0009559983895297045,0.0009896815077288254,0.008985073778720876,0.001770792026686004,1.0212503415417792e-20,2.3393784598007838e-48,0.0004362467961306735,0.008204461054315342,0.00020062795521677736,0.008245284467119467,0.001661159803640234,5.832834774918107e-54,1.8469587113900713e-6,6.970821384985264e-6,0.0010776745598302258,1.9630561282120755e-8,1.9370181980114684e-10,2.032294094365487e-22,0.00040239323423837183,1.2197031490776822e-8,0.0004561306326166814,0.0045833154253279145,3.8702330166650376e-10,0.0035811101414606043,5.439531995672001e-6,2.7302021070745456e-38,0.0027853022119780162,0.0006067746726521167,0.00670058885373154,9.189325610608685e-20,1.3998276557308437e-7,7.049545950384632e-7,2.1287032615118608e-7,0.001174432721728457,1.3496881407470435e-9,0.011864389627580648,1.4190467893834624e-13,2.3013765059667478e-5,0.001116460784387043,2.7796979192440462e-5,1.5912538329969048e-7,1.3653844755372185e-10,0.0007522934290838966,3.321389594717396e-8,0.0022200764567182093,0.0012420956213820453,0.0027127603559996003,0.0012549929923212652,0.0024173875929878992,3.5377999536756436e-28,0.002684383604042829,0.0001644492320967954,0.008178142825692255,1.0598337766436888e-5,0.009321332992937697,3.4896640358164e-5,0.00016738140897747602,0.02571318577895526,9.02498321253677e-9,0.001857691991810759,3.2788463338400766e-12,0.00039984481486555606,0.0030246446188048936,0.00019885749967315258,3.907617494336379e-7,7.513698353920775e-23,0.0019651802815001517,0.0048747686661948135,0.0004337601229290509,3.109305981636608e-48,0.0002257450180901865,1.8880941532162994e-12,3.386895971191473e-6,6.409038294340172e-7,8.015881545405549e-10,0.0019887309942380285,7.057527600837103e-8,3.4339726463771e-15,0.01158357622631451,0.0007057402698515776,4.4983965509064087e-13,0.012595788795423085,6.905400064609397e-40,0.009380597158431718,0.007875922536459523,1.6537418400053105e-9,0.007780176535324123,1.359340097365227e-16,0.006156781860948479,4.978334901895907e-5,0.03249228183191019,0.0006470756932849928,6.435393820174894e-6,1.136298338169357e-7,0.00720331522466529,0.0012665137608398015,3.6527219302430413e-19,0.01277176257839022,1.9135799783320187e-8,0.00036137969285563804,2.4974010635139687e-6,3.093273481140637e-8,4.666666327179316e-6,2.5071072080857944e-8,1.7405112072935213e-73,2.548716407940222e-12,1.291901893205359e-10,0.008568327513516327,0.007075096151433842,0.004942720472497432,2.2192632629718564e-24,5.577251496754884e-114,0.004608348528229321,1.628823622960977e-7,0.0004364012902653149,4.5911728452797885e-65,0.002624374549303911,7.002466853020424e-5,9.648573503799211e-7,2.158558230154001e-6,0.0006309349575383225,0.0008990673721273309,0.001635824014480036,0.015382831002608342,0.010602267928550287,5.632646777149659e-5,0.002552997165602326,0.03800512987247032,0.002194479426217538,1.0878299061918217e-9,0.0065921213209930865,0.0035197135214712536,1.9971366150169936e-5,0.002309663721877768,0.00021445177102023482,0.002417544142423007,0.022416577121790723,0.0011512685258909022,0.0035198464822544235,0.007895873171354125,0.0003972513272883885,0.007224304516062277,1.1970533178334795e-60,1.6509852937866368e-6,0.004133336392125159,0.0033674745484661922,0.005917034358411116,4.6333943907328576e-11,0.023058481395454994,0.0028349084110313822,6.973452189293048e-22,3.199936224502332e-7,0.0008875749739785229,0.0011022312619956268,0.013436581514060587,0.0010189923330750379,0.0007766845753958758,1.3006023427227471e-11,0.002888341518071188,0.00022147422938531647,0.00233071354756133,2.940055182552285e-20,0.02882256725391549,9.166216260137693e-5,0.0003055375221523788,6.4643845099304856e-12,0.017995555843568527,0.01850366048230268,0.012758885216123254,0.0016665692310267853,8.924836182738643e-16,0.026850170074831037,0.0035708368196490452,2.219976241817659e-6,2.9731954299400005e-22,0.00803966430790583,0.0025438161363217507,0.002869214274626928,0.004273558597859447,5.445528562227363e-6,0.013865210460477288,0.009179510618777888,0.020209227852914208,9.207936229169098e-6,1.1223176198557856e-5,0.009782044980161731,0.001258543225387269,0.010454912895324351,2.894506338623413e-5,0.001953921718251747,0.011501851530181802,0.00682125487592578,0.0034557403572592427,9.383094944718112e-16,0.04001001437660161,1.7127175017454693e-9,0.0035697876615627096,1.3549834410856101e-8,0.006874436136917071,0.05338787925145786,0.0030031328069496633,1.897281765291998e-10,0.03587387471887301,0.0029947708036431684,0.028678796660798492,7.173650375458985e-8,4.0538906476364015e-13,8.743751514774983e-29,0.0010727110532047115,0.007168093708275558,0.0007472864031312822,0.0033619416850668685,0.0017012072545555222,0.01070987324820556,0.0033455568115794048,0.017318328583295607,0.041420108923383575,2.5096062540500187e-6,0.002808974184380695,4.633010165592559e-6,0.00834204177837319,0.0012574022200597245,0.00020297196427591203,0.007239477151006236,7.913519039004035e-123,9.588709898018215e-273,1.4477553022846845e-14,0.0027729981798300628,1.600879662847645e-17,4.795643569449287e-7,0.015534059619280671,0.0007695245019087766,6.591911674139413e-8,0.0043882733147777905,5.1424067561246216e-12,5.093725104485355e-93,3.672275306903142e-5,0.0006113890101128806,6.867804576788559e-23,4.454792652578889e-36,2.676216319211616e-56,1.8291631066431707e-5,0.0012269223212827654,3.117047883355289e-5,0.004925601460223047,0.0023939267986701346,5.365377419380964e-16,7.261451438747285e-64,0.002051264822156837,0.020535801030500383,4.4304755874444995e-18,0.00549010868729018,9.363538367895609e-15,0.005140872979373157,0.022096230356969854,4.988200303923947e-13,0.0005554421103161815,2.174470104941045e-5,5.650795193211539e-23,4.914377885199934e-128,2.7069239350508873e-11,0.0040761157537059075,1.3706678511898616e-6,0.016000300085727996,0.0001114608713039883,4.329368561075769e-157,1.1514735252939907e-5,6.823311117550897e-10,0.007123019233580071,0.0005429087250726353,0.0011110673261059162,0.04290266088543283,1.3232933737644897e-9,1.8288631729997262e-70,3.314985469434638e-9,0.011535579876770152,0.0,1.9415461989309366e-8,0.004682967760851864,8.668887121148407e-11,1.0810452621238273e-9,0.0020516109531981156,1.0133851046124422e-20,0.0032317344748077847,3.549074145107238e-13,1.1704614576661526e-5,0.000540008641573908,1.8773226437147035e-56,9.89467395678008e-69,0.005875825711072527,2.562242314552175e-7,0.0017631822194688759,2.590237702676401e-28,0.01627393300439841,0.0038123262264003117,0.001967618304126427,0.07006233181174462,0.009536195857610022,0.030586792785325823,0.0006487569329899488,2.0976016366780566e-19,2.4644037071613357e-73,0.005459317488673734,3.324008786321093e-8,0.0068007680380920395,1.2327674993213029e-7,0.004241873245727862,0.0017989865906196196,2.800614895511505e-16,0.0020677981429633265,3.1275362803753926e-14,0.0008316331220673699,9.334863953224398e-20,0.005115317641207847,0.019378882972980373,0.004876539139757979,0.001891018241813221,0.0007277654511134317,0.03076163024770405,0.004885749079916982,0.005377097749776587,0.00034978983493161265,0.0037090597639763494,4.9917838377683804e-8,0.020884450902442103,0.05043469537247198,1.0931137722220262e-87,9.783455450136848e-203,0.013509481896608276,0.02786562730771072,0.021909608601588127,0.0002528523200110459,2.0423217743349945e-9,1.958168495784647e-6,1.537621095140426e-51,8.706778586838734e-17,0.0013313187571765688,7.254745740847932e-5,0.0005305085936017379,4.6721541279795876e-8,0.0068066320929822234,3.516608150299363e-5,0.0005905420929143191,0.0003015251836692432,8.370367465464404e-8,6.441911881938793e-7,0.007727011916540408,1.1590151441927573e-29,0.006087957538552695,0.0001122854743916324,0.0016782883226254797,0.015362651577652193,0.00027424151815239815,0.0002454285815449662,0.004636717814622672,3.488025008072267e-16,0.0019505246997931725,0.0014068552908695932,0.0031201721820312005,5.523408131685963e-5,1.2015261865838233e-26,8.142987095085773e-9,2.5570825821919147e-7,2.5644031130713683e-5,0.00014420252789360693,0.00018005065215685373,1.0090299270613104e-5,7.673695982637438e-5,7.636058463483329e-7,3.951379598170988e-10,0.00018222556573727275,0.0013120877753025964,0.07310099347143474,0.004118643427867721,0.0021238519584249257,0.0003921021422119639,0.0006433784045974521,1.6166623513842504e-58,0.0033942316458397846,0.00015326767361123229,0.001406192792884979,4.775135953262065e-5,4.679956537542513e-44,6.210513711469854e-5,0.007372084337952976,0.010561760734376952,1.5147223698635508e-5,0.00023050009919255916,0.0073342797960257,1.3408813880754674e-6,9.521297098418686e-79,0.0004393651464385708,0.0005048255042014154,0.005864573622436988,0.004781354459900831,0.0022107930509533643,0.004580486498239863,0.006216958342768304,1.5150806291437843e-14,3.660224643146133e-11,0.00010581946491459484,0.000824890247243046,4.0722155334046216e-18,1.400095004345705e-18,1.6792830491513928e-16,4.109103101775216e-5,0.0015020134859030194,0.010055910559160625,8.442322527508176e-21,0.012560328875225147,0.03159597670402725,0.07749953205413858,0.00013907284636227368,0.001171858156204726,0.0014715049422081067,0.00022522917422787924,0.000695842023663842,1.3923339088988887e-6,0.011036394792147857,0.00023471579901097634,8.480463630083842e-5,0.0028066346005101495,0.0015852992633636675,4.894266859550695e-5,0.0018915033137666658,2.0504496299319878e-18,7.778832977800846e-6,9.643702231056507e-12,3.0390556288503997e-6,3.2476474302692915e-9,0.01770301510403663,1.2819258252399897e-5,0.005681356955209338,0.0003021570488273967,0.017597833348360955,2.119078931747466e-9,0.0005597728092402265,0.0030917095860273597,0.0014439441629775047,3.6402865492053465e-7,0.01992702062784477,0.0004897719312767438,0.011298823974681948,0.021855785651714962,0.005508416955526574,1.5154444846290788e-16,8.732443967985884e-5,0.006903378077219616,0.09285242807424382,7.169449780923183e-6,1.7687823819419195e-6,1.7098410179300906e-5,1.1940506116158443e-31,2.32376756536963e-6,1.1665883216766952e-5,0.020141780127088303,0.027174685583308177,6.609293712862325e-10,7.419695664196703e-23,2.9023620506605e-6,2.9063138647331357e-5,0.003834401155390401,0.005873166733999188,4.0074140787319356e-11,0.011841704260062423,0.0024885226578105738,0.0013931542585894656,0.008044645172460388,3.2257451308097403e-9,0.008436815676584065,0.0011234486516123504,0.007460331950932191,7.523223923816712e-8,2.217461002471056e-28,0.02228585264806132,0.010799762654230221,0.0010687855539453757,5.178173408131957e-32,0.015435951947917517,9.669414012508805e-17,0.007889779605982502,2.0231816633200115e-5,0.001532906231337892,0.005074856866702817,0.0007886958967393264,1.0668911431190267e-23,0.00028636338143250926,3.21164635334627e-6,3.393153939562607e-5,0.015194000766084155,0.00024635174830877477,0.007780237199607111,0.004216674057444433,0.10821264367255412,2.1049041335396018e-5,0.018608607406406307,0.03215054934531818,0.002533906842161767,3.251345940862034e-5,0.0003265082446523848,6.098211151459836e-7,0.06546454219101598,0.0002415184444000581,0.0001605400015450648,0.00046633572900146825,0.005170833980483087,0.09013126283931155,0.003008575622190884,6.231089508865278e-23,0.017444286924152733,0.00023730137747680379,2.1420267026480355e-18,1.7857270940856533e-7,0.00022498787124128152,4.663503555287716e-7,0.00018772981511686398,0.0010548304805653053,0.0006140345191408044,0.0037985042391396944,0.00016314404691714388,0.008032138420517037,0.0006943442351183356,0.0010248790761365667,0.0038955426370309784],"x":[-18.442980648670265,-15.133235304954649,-14.388475428758877,-19.451292744633392,-12.28806160616206,-13.906708247423845,-15.174096636126158,-17.45942024331706,-13.303013990162228,-18.115798836419085,-13.446836192591473,-13.703542959690855,-19.877158213686734,-10.22497613394076,-16.091732658057623,-19.279046399575936,-11.998335847159643,-13.181339433885682,-17.911713426208983,-16.92597896753968,-14.793197133728437,-13.133442785605807,-11.826580362503718,-11.007071544922617,-11.401560565801812,-13.050196536017737,-12.117424402327213,-15.489742992264976,-15.045577388500922,-16.49953103355574,-17.53722768580422,-10.655771844397016,-16.321297262267493,-14.397596558548438,-17.12636183321058,-10.238649853443482,-12.046334074211453,-19.209145156030495,-14.137688055858643,-16.555152836402147,-15.563740601868378,-10.546799928323596,-15.801293287095998,-15.557068742909976,-13.623872327292384,-10.787588346399506,-12.802040124915132,-18.66679651367932,-15.558024327938472,-10.736928055869445,-12.25416295685283,-11.596274603252073,-10.337286336803977,-17.366872352310317,-16.320950362769906,-12.983285756798717,-12.456201202103614,-12.85988108351109,-19.19282704412816,-13.247572200497713,-16.893211880176338,-13.556395471396534,-12.598039930736428,-17.671337833187767,-17.14713232860962,-14.119503416533345,-16.962000454811236,-16.962960176139415,-16.35930770062836,-10.40132700174166,-14.12535956329572,-14.445736906587982,-19.553142241699522,-19.298335748555335,-18.60159764010001,-13.453207166414778,-19.608412680468966,-14.911826082666,-10.455188784575665,-18.262498638774098,-15.803205149156245,-15.917690854143487,-11.63929770526784,-16.49679463358156,-15.001070749684056,-15.413612574320172,-19.36476209262675,-19.203335663299626,-13.840147952793787,-15.360861104293502,-13.375482832073368,-14.187050032097478,-10.825080126727402,-18.48938494597777,-17.471861320529158,-12.069252485724718,-10.90196087484495,-18.880903356845074,-13.697759152648757,-12.810982400740219,-19.181323924684843,-11.475819984527105,-16.653959633585632,-10.568674769557374,-14.521073373985388,-10.81678013128638,-13.966462830996385,-10.012458744775962,-18.84760954190709,-16.646763018379634,-14.767787687872243,-12.494502503145968,-13.712097108925995,-15.44947403344019,-13.085414564551922,-15.603167397193898,-18.212184406565722,-14.602207798454279,-16.80220966962477,-11.05622301325823,-14.414932563171785,-18.017469188931344,-11.120775963071894,-11.870955079346004,-13.765607255665941,-14.890246383049881,-14.654939379312033,-14.914124911863833,-11.288800566329492,-12.956587945258919,-16.563019451672332,-17.431155443325906,-17.68389624937806,-18.648650734650744,-15.135658643778305,-17.28561364904998,-15.038998001412251,-17.97711939847501,-19.343771617105578,-19.648707970230085,-19.900730528229868,-18.765700251080926,-19.538222154845727,-14.992919726683622,-19.942770951609777,-18.556442943207855,-14.357400462314986,-15.06066658979002,-13.889842253242673,-16.863631731178153,-17.335754377637947,-11.393407489193688,-11.635024827500517,-18.79209623892859,-16.190345031631395,-13.847883204799121,-10.834812743927829,-10.845061452684757,-16.76253986737132,-18.6463050258768,-13.146497849954182,-14.01669586646527,-10.053261478357893,-11.266009749044025,-14.500782211055123,-15.278386349198936,-15.010403824744072,-18.176080841896624,-14.50359264979343,-17.962482867206603,-14.32253125142502,-15.512953735847603,-19.718084577022708,-19.85016992879863,-18.33164825209002,-13.706623820743136,-11.597050891315348,-16.74127555366879,-13.281321081407675,-12.822984246036086,-15.05260376627463,-16.963001421560154,-12.335084574649953,-19.117251032892014,-12.497939739624487,-11.824910787640153,-18.350718459086725,-18.880307021537618,-10.945222450037395,-14.96856286168417,-19.26835202331333,-13.048629206168016,-11.709498419065218,-13.438682772638638,-17.121542501526164,-12.49517372174801,-13.271983972405925,-15.11556201265485,-18.048695271745895,-19.801797924873693,-15.626378335279584,-17.958497013805687,-11.300882355875155,-14.101850181456514,-18.243539107195698,-14.875121417090629,-16.647664666329558,-19.95173970319035,-15.380812405715892,-12.05333165237686,-12.560687447154539,-19.58703935626572,-14.947976465482594,-12.329309784913974,-13.669754502631957,-16.489897899285765,-14.019135878031472,-12.606703191800609,-17.877124114033784,-13.322388126629148,-17.197875042651138,-14.30544626406435,-13.515300009993679,-15.64052838383189,-10.392221292667465,-12.738506041897061,-12.020110312099344,-12.418741304126922,-15.36878109195097,-13.74311391528048,-13.079726240536555,-14.429194894880819,-15.379137466464165,-10.672749307781995,-16.325265593739054,-16.734055130832267,-11.586520220183798,-19.304685512282003,-14.176338756013465,-17.550835588794996,-19.896899221515415,-18.266396160711356,-13.068335329303647,-19.85229795241356,-15.621145470266457,-17.021203101855257,-19.78415219127459,-11.624029798356958,-18.02055386223065,-15.453460502550435,-13.294545074285738,-14.725516997523664,-11.567411753535238,-13.603694438716143,-19.795611707835047,-18.32743283802186,-13.62828066948036,-13.339491483448022,-18.718505969478997,-16.670647150512906,-17.62302623555258,-16.608728728603374,-13.916612679997996,-15.391556586557895,-10.26928144846198,-16.44805663406176,-11.26442722277918,-15.34580399130367,-19.333065009836112,-16.190175571840733,-16.861049322658065,-15.41934773237071,-15.375675446811773,-13.47774360955099,-16.429274910965223,-14.782903261563662,-16.51702697869569,-15.083076363545276,-15.746883748805594,-11.647710732950651,-11.328164048997563,-13.894590082944358,-18.280558598719235,-18.455895905993867,-11.100449978452453,-18.478555206094025,-16.167579260028198,-17.443543170061655,-18.62909825269582,-12.114657621056178,-12.594737680484764,-17.011249413217982,-14.857939026689202,-11.013163294978947,-11.381435141014515,-17.5608078817982,-18.570687930834296,-16.828040872069046,-11.844932513668242,-17.07572826969312,-18.994464083035705,-13.866040386685272,-12.379361398976156,-11.167105239060533,-14.145171131175232,-18.84209705244298,-16.551949037524057,-16.580258790063198,-12.818845305239918,-11.70630799030528,-13.730311847151736,-11.795492726082319,-17.306489813409883,-10.607586914626266,-13.006091224760578,-19.749335100527027,-14.96465797943121,-10.469715946101996,-11.27021594295446,-16.357699544941255,-18.560966920686774,-12.005226404848353,-18.396050203200026,-11.374651755463713,-18.47775930057387,-16.364309125149884,-17.975642452868787,-19.687880127271477,-13.63961213908696,-14.48014193249884,-17.574240982259486,-17.02129824298243,-15.634798001112497,-14.572915054982152,-19.314965334571305,-15.564482204983118,-18.952574275859938,-18.02398292871337,-11.787998748117694,-17.675082731615404,-11.649453330522764,-13.890311366021763,-12.88457961373455,-10.096586327343537,-11.6470532674402,-18.070557488326955,-11.602078375763341,-18.093615727717772,-11.901163682001831,-10.219941433408966,-11.89559634783829,-19.281362609246784,-17.64238842261776,-14.718656435676829,-19.720591179722216,-10.326105200561809,-11.63585947040353,-16.355631057178773,-12.677428262021515,-13.022066739580778,-10.64501912592065,-16.983144359262695,-18.29554109472465,-13.984700483556393,-17.478033408394946,-14.291702197734747,-13.82051063210237,-11.833582509831889,-14.994229339109973,-16.40917738241192,-12.818964120752678,-18.77321632348798,-12.554053738741601,-18.293575744555206,-15.667750372993668,-15.827794236079338,-13.208295810999118,-11.953818745917616,-15.10066240418219,-13.973225965207144,-18.398017259412015,-19.899362491723853,-14.007469835697766,-13.583296842560866,-16.6649189439403,-10.030053108346237,-12.294484404587728,-15.57617107979995,-13.657270392520948,-17.442533924561786,-12.349417267572264,-15.391620385697674,-12.129793181072568,-13.780011773963952,-12.986990092125225,-19.00087186261733,-18.015782775070427,-12.818676849234096,-19.27768429844218,-17.112732760867114,-18.359225911512894,-17.507925596518923,-18.986044965452763,-10.878767241350879,-11.036364653604833,-10.741086985792291,-15.79494365552177,-13.903202128461913,-12.076628400260976,-10.947781460629354,-13.894766010493784,-12.234832612121378,-12.769604790282749,-11.080142805444543,-17.174023947060995,-12.488539938832076,-16.736886754746273,-18.551520080857898,-15.357560310035916,-17.27920185714304,-17.65221413053434,-13.292129087627607,-14.314901490804692,-10.14772677712202,-18.58710667444275,-16.235587802241778,-14.617034723350601,-15.045769250649435,-18.333337364523963,-10.123362011975992,-15.40600745626,-12.827170531509681,-19.881537920117836,-18.40201050114358,-17.3867040904654,-11.276549523039108,-18.17793706030388,-14.784316442671482,-18.62944193364764,-10.125033463616184,-13.788421925738984,-10.25134483625015,-16.878239586827167,-11.057972522018364,-10.116509155761502,-16.01462922759518,-14.396872722539422,-19.743978671259292,-18.047089287219055,-14.443559017130772,-11.856810553804195,-16.061459097745576,-14.484247245120393,-17.27047475228193,-19.70055354394073,-17.04545677680683,-11.702225269724726,-13.548541402975975,-16.698253387369284,-17.94456279527069,-12.766361642610411,-12.399003737867975,-14.42139378849965,-12.84185657186281,-16.096096137020808,-17.928950859020638,-19.152237675456668,-19.812225294504827,-19.24505948650292,-13.138155918588623,-19.558354240163617,-13.648409967695523,-17.796488700375285,-19.62032633358159,-17.525797115132455,-10.86924463210864,-10.7343220516894,-10.833085841959374,-16.640005540141654,-17.279665863215527,-17.714741588229202,-16.07720651688347,-10.845585086464062,-17.621045582033528,-15.084642661757801,-16.077167179725958,-15.812909996301439,-12.607860407144916,-18.43684961059954,-10.587893823896305,-12.99153889383389,-16.7231943662981,-17.492486759716385,-12.530023344892165,-14.230768231765317,-16.504441942461987,-17.93379495884578,-16.466072495957057,-18.43376195628079,-12.529257929154438,-19.317709602433986,-16.586322374572575,-14.485203579744706,-13.785378336570027,-15.873676481945614,-10.487352595655835,-15.759771042386745,-16.800203738736023,-18.898183651497376,-19.485580892267027,-10.29706298592739,-12.267337899215313,-15.096545903742072,-12.073483207885074,-12.433349178054074,-17.64399402762291,-17.70844890965012,-11.553939078241026,-10.238223590775082,-10.939235115334052,-10.880143458451963,-14.768062556428694,-11.663536445442524,-19.60680969217955,-12.890822984410805,-17.915168915811183,-14.466259518135292,-19.299184845536853,-12.47340006906439,-16.359684820732763,-11.179005236495739,-16.85692087861719,-15.535074231850343,-17.053883276129024,-12.705832331889507,-18.602359922576323,-18.424389614022225,-19.03041749446392,-18.72835388224264,-12.16056845014255,-16.001157293481732,-18.54188865227053,-19.873712464232874,-11.753492398063642,-17.064128953560797,-16.04906630940676,-11.40382000554511,-18.33525121258223,-12.321960538975373,-14.506090581656805,-19.58737805198503,-19.334104223616176,-18.74734061368223,-10.564879279846124,-13.139322791919529,-15.57584146855749,-14.828182521979592,-16.50908689748358,-10.909439240588751,-15.380444100699942,-15.041668957550298,-13.345700063052933,-14.62494144795684,-14.05136517643091,-15.988665617670101,-11.813815752685521,-10.85401467857375,-17.383628119401852,-19.05866953754527,-15.975685191812325,-12.791604052603944,-19.610918340429244,-15.391287504539433,-10.462385438722748,-16.813207381221098,-13.557647492118896,-12.347731495735685,-15.888434712049861,-18.3869809625619,-18.054261882824864,-13.582175898393274,-17.9402562907902,-12.5037160843955,-14.489747413126533,-15.415001544178429,-11.260275444198335,-13.924746240599188,-14.243475426925027,-18.223248173333218,-16.028200141196415,-12.598554319237216,-15.98438937609725,-17.095796808325687,-19.61737564474588,-12.98900243393766,-12.221102268610364,-15.966309525896204,-17.423840848852336,-16.61896921867494,-13.833691832254457,-19.036795745705774,-16.705751669958715,-14.778931728520899,-11.191885621979061,-18.516271066649686,-15.961011571976071,-16.335703940915025,-15.494523496254828,-15.54456192310965,-16.78687938709552,-16.127998847224948,-17.13999666004127,-12.076995075202454,-16.078417633947474,-15.692022516956719,-16.565703420251513,-11.40323487849046,-13.677576003876016,-16.773126247950138,-13.930306864036687,-14.493775470873773,-17.68054708815508,-17.330875066319386,-18.33904406199066,-10.582718723249354,-18.475495418001852,-16.348043434938145,-19.97566469841035,-14.345462126638806,-19.162600835262754,-13.45637392774021,-18.312848437668706,-18.6062241898516,-11.47704011660723,-17.57396381142877,-19.513436568759705,-17.176482498513398,-17.838565150674263,-11.703751624682493,-18.38657893448806,-10.328634193212494,-10.34635431610068,-17.962050150565663,-12.040594542196438,-14.874982255255544,-14.848696997481156,-16.457377652227013,-11.433937216657155,-18.595173115203988,-15.135664595772411,-13.778729851248983,-11.731349676039805,-19.719871670262354,-10.1713160191953,-15.835871134078324,-14.316673325324796,-11.16271462200868,-11.837204022648955,-14.877543607285306,-15.977137667834358,-17.46035966309797,-14.101492848571075,-16.293273591046475,-14.005593577061347,-19.94150016811631,-17.72485162856932,-15.702691753786823,-10.664292077280022,-15.533007076611343,-17.069496819182454,-11.786704843537859,-11.1586211223578,-15.919099331053284,-15.097271255581894,-10.110317757370936,-10.108974950059421,-12.823189691425759,-19.977825729581205,-11.93239106688842,-18.89362630057729,-12.174746328821124,-16.223196168141804,-19.697113944259502,-18.640405064933674,-14.537777359821405,-15.735348611486744,-11.704225069682185,-14.004938979637656,-10.795848305339854,-10.480199206967304,-17.463592586659114,-17.80609958368818,-11.420310259586458,-18.565340318294187,-10.079206345451336,-19.317051574324665,-10.193544789154505,-15.722607795784016,-19.71726984566835,-15.846383371749509,-11.831350682407303,-14.061638326186138,-13.496826803364911,-19.381196757342046,-13.640832320478571,-11.628033286817052,-15.750590240995525,-19.55607695382993,-18.927615982887673,-16.602703518946342,-11.798462394757554,-17.96828554705247,-17.922097304063666,-16.407274472213587,-19.704095748123603,-12.985094649560338,-15.81878751257288,-10.80494808986068,-18.06926848315006,-19.31365335263899,-15.479433775872408,-14.371115421049225,-14.821263243625243,-14.845346560944261,-10.176750457468582,-12.037862746605953,-10.09793344845331,-10.280696337827946,-16.02518224428078,-18.1936272052218,-14.765924041507962,-19.761442251725512,-15.604261163382693,-19.68485681127308,-15.212569646386545,-17.270777678006887,-18.47069824906623,-10.178754533649828,-15.720297698330851,-16.359782772947508,-14.577264216451919,-18.53592989053487,-10.858314765332569,-19.567806700524166,-17.530999953473895,-17.196544947492406,-14.925623055267119,-12.342637809882333,-10.438934879637188,-14.956460795388866,-14.586493974986263,-16.47351011143841,-12.875056508792746,-13.251905763547121,-14.407623543250804,-17.56989244743693,-13.510639939025776,-10.122174278530952,-16.071795844017927,-19.02890883032447,-15.18620344498862,-12.242433091018901,-12.927181181635913,-13.572415907741375,-19.990913917624727,-15.756180593617966,-19.73776121970543,-13.180861689769754,-15.943349747079917,-11.45073639183375,-16.291598107343653,-11.61076583720289,-10.132427489638804,-14.07767880988466,-11.420942962991935,-10.642789462056339,-17.05173357048866,-13.774346113132784,-16.9743320953406,-19.529056546480124,-18.25846138658681,-13.42260758241496,-16.386273247043867,-10.545645016179465,-15.368830330451104,-15.144678583742554,-10.417525479872955,-11.973319482881326,-13.929206183634244,-11.759804854588502,-17.309542948022465,-13.05879778693716,-19.6002634150478,-10.144379556000205,-11.76453595861005,-16.43341552962013,-19.309313920431354,-12.754956736403141,-15.324727763338968,-13.605204847605584,-13.302482529710158,-10.279890115132437,-12.123995891762716,-13.750616258128478,-10.188308004531992,-13.545671310400454,-13.424999238132395,-17.141393753648664,-18.07081820578029,-18.260957157247567,-18.80562432321742,-12.408069846877938,-10.621530239319416,-10.396724586260442,-18.042563642201863,-13.251539223980856,-10.296018088284338,-10.009040704877668,-16.253400038066744,-18.14022481043089,-19.408711966619684,-19.944365709923886,-14.099574096659651,-19.114898642492506,-11.549094988284107,-16.397286108410572,-12.790092231959822,-11.890881916422265,-18.49670298380301,-16.965800894127945,-19.42694909966795,-18.53674696782127,-10.342053372742539,-15.938778443444846,-11.787684813616462,-19.922787284067567,-17.489298422284264,-19.422920918550346,-19.814548251210052,-17.615620254641918,-10.146770318957664,-15.098327422999605,-15.35686767378383,-13.261290544233308,-10.75648294932166,-19.60532271855829,-18.39304166280245,-13.372122295348879,-10.877582782761039,-12.90153970235039,-12.996513476737483,-19.522171336070922,-18.80284816750701,-18.481447930140096,-17.41587342768706,-13.328520206385022,-17.905294343092862,-13.187181868744602,-10.312410317145886,-14.401948144124452,-14.006793730757659,-19.71433632450624,-19.33488078325523,-19.606977982541107,-10.505870611726554,-16.036682665764502,-18.384038357235333,-15.13078930835311,-16.349003662503808,-13.730436316659862,-13.924501844858426,-12.229878560665517,-15.334111943373522,-11.01123771715066,-10.453866394483208,-13.27439124458991,-11.348917338313061,-11.508635790162229,-17.661693630025173,-12.533727393039404,-16.371421087978195,-17.001048112689368,-19.544809821841053,-11.425982457343471,-14.738295546292592,-17.25347880696958,-11.190828179861205,-10.328313657683905,-14.396778552536286,-12.75457447590961,-14.607873079887693,-18.370443959066417,-17.516071864945012,-10.085329155821668,-11.563976462299028,-18.99395850381565,-15.221051331050353,-15.894485230726405,-17.089576023638177,-17.209608814329115,-12.992021998671806,-19.148914573657194,-15.84246885487768,-17.684461060519666,-19.716843860961333,-13.057279895191856,-13.53235089051273,-17.55707755763561,-15.98647630583935,-18.94444233837249,-10.591549098018431,-12.521743952106528,-19.1166329803145,-12.599358448816055,-16.856852126418744,-15.577117649837962,-17.701758006041224,-12.677847097533038,-12.042781396763992,-18.00779448642672,-17.896815470110187,-10.697666880136653,-15.13083300882232,-12.20218740613095,-10.339794069609606,-12.869733967326088,-17.53983009904331,-12.87678326358677,-13.025164910462708,-15.467624894843786,-16.692326942593624,-11.26282589387137,-14.397276053029792,-17.063522648208163,-12.727802542372435,-11.243521933912179,-16.023636620214027,-11.560078349308512,-14.27696616610963,-10.112682001316326,-13.204325351372962,-12.53688295107546,-10.834796013122997,-15.597793425877896,-12.021275559018619,-14.64103921000973,-19.37091073237651,-19.298970736743282,-11.018583056526358,-16.372227158792942,-15.435912398901792,-16.4740959230821,-16.849847496594876,-18.626743753570302,-13.107130546099663,-11.387396759274989,-16.490886429446274,-15.186248415288286,-14.528513933350318,-13.126614359912981,-10.608291466929828,-13.849195449274731,-16.834362110819633,-19.485927962979083,-14.739767671734185,-15.738838185177723,-10.444449827390887,-16.31308274949313,-13.7555656681958,-10.206168177658327,-15.583495758637229,-12.804764013253436,-11.695621515836176,-10.422031443687843,-17.821008289598364,-10.883728017892736,-18.211004084347447,-10.18908550008695,-19.15598317837847,-13.852766671233475,-13.991829888406642,-16.932634982716475,-10.756784477566928,-13.018611800892563,-14.463791810377524,-17.06678638450824,-18.88141975829808,-12.039067060923257,-14.864993365748028,-12.32670963188881,-17.36610778817348,-13.585576175986631,-11.120653799082138,-14.976120355672604,-12.129682511580794,-17.355936936646078,-12.116002608733238,-11.462175690980654,-10.944339390946842,-10.809518074768842],"s":[0.27332010605707335,4.248462425324808,2.5292893806630468,4.814799001409731,3.143163161405255,3.4832625581885592,1.832538654269783,0.8838281970787676,3.1628047023142445,1.7220432282492415,3.1155959349957643,1.373526862348473,0.5568872816353543,2.8871670832081167,2.90112591959351,2.8113921912244444,2.120160511144147,0.29664457680678713,2.2051387150544177,0.5821105723892162,3.9409183560929737,4.935654164920607,2.06200039218551,4.10974036818472,4.462814413691847,0.7806484126365065,1.144675624992726,0.28945911540357194,1.5382608700115397,0.4994744156806763,3.369563301749665,0.9396501107125177,1.9120839305134774,1.9438107946023175,1.8672445224971712,3.1342656367687125,2.807325786155678,3.5387340234042544,2.055968203501344,0.30117602471730454,2.3866995190778484,0.23517884645527842,0.9716684808085663,2.51324780293507,2.8777790202037568,0.8706053099989131,0.9314566272758085,3.155521872188467,1.2375923723060855,3.433830050295996,3.1839930385370008,0.1589375739320542,4.9662234614115786,0.504232460647851,3.896690974994467,0.7743832663532835,4.103333985920429,4.292516162644945,3.0039445956481083,1.0764787790918529,3.982619068678063,0.6742411474588106,1.1068065011077333,1.1818703806356945,2.282339969085946,1.6942234019972369,1.5534847744271063,2.447896530832959,2.194075139092689,3.3311652973121744,4.05948704503942,3.400123629828169,4.884793837623365,2.219896736468634,1.3309294947178407,3.8963177497685964,3.4985243854780235,0.8526237415016868,3.7436074122890517,2.856250678622523,1.6933630634281571,1.8684680311624557,0.32360138219036827,4.162355574372088,1.2562178858799145,4.547501629581049,2.5814589747175045,0.6556853487944825,1.5149688081372403,1.9144861303670302,2.4092999936216364,4.7273661069825526,3.508626230981944,0.8262892888977735,3.6927075261906572,1.6132249670606702,4.215533944132,2.7649400323219564,1.9197965394949779,4.876618660874946,1.2385965352632866,0.3023132845419485,4.097167846987524,2.335948108201925,4.699216177030795,4.837114495868732,3.5500091669137532,2.5816832025514955,4.039889132498478,0.03281193261954418,2.0614016386769665,1.7345134624022607,3.960497218663128,0.6137701366252535,4.448680518488085,3.461981584942863,2.3729001984020694,4.889060358142322,0.027646304876621786,2.8263765613761516,0.3429267945877157,0.18280780804419194,4.075926554734402,3.7100866031668933,0.806546440208985,3.776801134351647,0.8107565769102443,2.152933782703801,0.1860461835338012,1.5027413811761103,1.626393139475547,1.2579208501995542,1.4754576765412275,3.086041898310772,3.3685463142619976,0.027133864701277544,1.778414670629932,2.108489374229523,3.458667719898502,4.298752783917581,0.27329693070102246,4.1526694519729865,0.5587049194113891,3.486473721308111,4.40547166722478,1.865757818523861,3.181078238016257,4.292407256308053,1.8943809388200827,4.0371213969828155,4.2823131484728485,3.758539702461742,1.8153773610073276,0.5370911331353634,0.6217752620036432,2.061121152157397,4.925878196814542,2.863926646431775,2.1527763036648517,0.928003256646921,3.0346753782191085,3.1285601285445273,3.5955387017541174,3.666018720771688,4.981685096907267,3.808163973685926,0.9538726082890914,0.08558198958165786,3.2942324869495465,0.8593734178752344,1.5778119151900394,0.6217003264720522,3.5227218617422795,1.5423295401808645,1.680712303291303,3.3699191572828613,2.3304298034241135,3.401330520241789,3.436220538748268,3.0945886614888973,2.9978004256312865,4.938352057059033,0.4322960002930121,3.8383681317902276,4.2268939564396915,0.6470098819506942,2.0966884641425585,4.053106069001037,1.0838297403223196,3.7879201567691343,0.2516059243588409,1.6691875676447976,1.8406170828332724,3.558767391873542,4.6398001489319345,3.205448873866781,1.6845576612292124,4.848515415581521,1.9229345237584206,3.4296676883477284,0.38363337393389707,4.166124693148704,0.9649840829575596,2.791003915937816,4.015386563713914,2.974483517920943,1.1850352585282287,0.3826237100863328,3.0330196973334465,4.1959591699290915,3.8060774868373337,1.364416156726248,3.5982100770682046,0.26964496424595974,4.524076772648864,0.7406041831647237,3.8399070908492625,4.906184640671947,2.167392412844227,4.833368592377951,1.7969352303068442,1.9600848461536668,2.9739323752031224,4.212543993127524,4.522801058483299,2.154957009724291,0.5589454880623179,0.6108890975935011,2.9723632099894925,3.360506981181628,3.427274451800215,0.9220234657583593,2.390956078631242,1.832882624400849,1.2388111185432948,2.232921220865871,2.7957792124528655,1.680114905439113,2.3612002829516876,2.876540910787276,2.7368127757996352,3.17609523951048,2.5580307785311374,3.5274717938115985,2.501978747982616,1.8835860891153355,0.47114656098347196,4.28619139926087,4.509408722531694,4.4815742397644645,0.9796168393117455,0.6527460923256845,0.05670194382711102,2.833033274635607,3.5557185000202174,0.5045454682280848,0.2580065359206296,3.804567204261049,4.010642397788654,4.118013183180994,2.465219139764651,1.6843241417920418,2.6895637210430423,4.938978908513923,2.3773576310932176,4.000551575019454,3.8817957069066287,3.510999542217749,4.812479075413606,3.91964827644957,2.0704728041487774,1.2990330075700818,3.4119933084978236,2.1289672221385425,4.336890160602903,4.26719544897408,1.072118373882902,2.5002771526584433,1.620308507721533,2.9846629627595114,2.611698739584707,1.1529776507664746,3.6939365467965537,2.0320453615960643,4.617435565023994,3.2232601986660803,3.60896961055822,0.341866949602061,1.893948440480141,4.8607373353271,4.62120974921357,1.691951910263081,2.047680243297899,1.5689836489880127,1.025924267696351,1.1382364530117417,1.4605639379984592,4.690136789784978,3.235282094935752,1.5619167919019727,1.6148605961094664,1.2264925388799741,1.6953269943774019,3.879474199969853,1.0751743984070339,1.9936257177689265,4.14022337380697,3.339532063195053,2.4264740819449546,1.994498987571447,2.6321400688905805,4.322684710105582,2.543528062512416,4.8907490034876115,3.5977534868526764,4.867719752825966,4.579202031895604,2.5944022924713925,2.9026386741562717,4.2979428191575995,1.827602790050109,4.298229293043425,4.408608199391832,1.9585674997437996,3.215830801391549,4.459882304089798,4.497939346459506,4.497776386175996,4.705322610977291,2.335917267585763,0.05601082910945743,3.236992860608101,4.5966200601582,4.5546574838590415,2.3561744860190528,1.9818748866839253,2.5410820023198264,2.644483567800191,2.4542597430143154,1.4901127630063316,3.231789562556684,4.601036547808006,2.448195494932407,3.278030016104182,2.401387532768001,3.545487337206119,4.973055007166423,4.529346559083704,3.0670930149125653,4.651454920963777,1.904631229881344,4.23169357601147,3.781742501238017,1.5965964048900538,3.4704740623997377,2.4681354196467953,3.9529981962840166,4.802082795031078,2.8288088175228667,2.8620997526095184,2.861011306796736,1.2035839970755835,1.7330207292323863,1.3969795097669668,3.52253509346638,1.9248716445985237,0.5669646649802529,4.273656500983448,0.542360101326198,3.272236446077187,2.7252056441340375,2.9522876053971023,4.697938025515835,4.118910825638601,1.4920152600263137,3.1032047001883067,3.233748177990355,2.4806900663050957,4.209338035705007,2.8974649588749326,1.3716714461750512,4.2830815013167465,0.4004687451049427,2.291619941450845,0.15580043843160807,2.182198954464918,3.577849876041265,1.8036925174011287,1.239143252928523,1.682200683299725,4.607575718320809,2.185540704056593,1.0297534690679833,1.3908153324644768,1.7175562448312243,4.2228804755439375,2.159389946538538,0.19706206916500935,3.7368431553802495,1.069707461155811,1.5443239760969196,4.443617665425227,3.14689898185734,4.355918948406529,3.3886951096317586,2.920765180619931,3.402181784616096,2.3634059695800493,2.044834893719142,4.7190404485158775,0.3506184224487585,3.6834960820137574,0.34557129417221444,4.167171899447238,0.44522087181200654,2.680171758045616,2.2182656214812346,4.699167318292606,0.57428751142795,1.9675321070831298,4.339755298866498,1.6192856273622336,2.503287143780588,3.8832898597707843,0.08024914401952632,3.686506732937709,0.46393216751347666,0.0184200562530501,1.5703044689869283,0.4490060758669112,1.4289688607079998,3.250917696473341,1.293913570804749,0.541663542856955,4.161064578139843,2.1596257277321804,1.5174763449383954,1.9522679331466797,0.03131261805317753,1.9020736396327165,0.13945968544020193,4.485231890155151,3.170840125755686,3.8226872179273563,4.252849899314804,4.653483905676342,3.811242694965027,1.235542656712012,2.694927314405098,0.683692952217313,3.1401249053102664,4.054188002341331,4.957121438795512,4.760662509400346,0.2772529873170959,1.1807730149590334,2.0472385220322353,0.2802093903775027,4.162808165475037,1.4431872468815432,3.57682577115348,0.7884748516275697,1.1554639916787757,3.608174211350427,3.5844968452476,3.8606431384363074,2.5998529100988357,1.8190943336150711,2.045039168072634,2.3818602269799314,0.1918616115539984,0.15594281610379124,1.4761577356739375,0.5990130171722741,1.997400073946084,0.46562740967561744,2.4229340839422076,2.1770821312812516,4.704498393094756,3.58353384550779,0.43214601661892504,0.1730907227092915,2.1188634904084145,4.586984649200437,2.5112998679150422,3.623531391934521,2.8227664518921713,0.1784673646890078,1.9949419989358186,1.019023177793117,3.3454848266868664,0.9583972862395784,1.1066801673222393,0.3380863550201163,2.221452026139871,1.4083348579860144,2.389817059600291,3.5853521180508463,1.0431873187091534,2.6032532180753543,2.3138908091082824,0.21241272312234272,2.6343387607857958,2.2595529707879947,3.9732133951722437,0.4580828645892876,1.527242446576863,1.4407836738061708,1.7379728611090184,3.1187884602787,0.820394627563199,4.728367058311455,0.6610430791070576,2.0464972504382994,2.67917962542131,1.8730308062394685,1.5043287022884433,0.665599233960189,2.303303926820873,0.889842737322426,2.1575865284870552,3.639540387808906,3.5687828250534945,2.9706230781426415,3.2552323231500946,0.3941378372529536,3.398797874990093,2.2388427753168507,3.4909781008549965,1.4851202160883203,3.8113470847650777,2.2133869781958015,2.2738064693472557,4.769364557181428,0.771777074874096,3.7159168420778874,0.7118115205067344,3.258583857125823,3.5406073827453186,2.524111948285533,1.7516971619291966,0.503125190478122,4.403372155647784,2.4617865869302213,2.523528659275377,0.2294108772281589,1.6340599013811752,0.8088532737614662,1.7553882970222534,1.075113351668091,0.963645749819454,4.705704703382637,1.2960211058093296,0.42038450812823647,3.4872653786297034,2.896743121648191,0.8314897618905581,4.5434975783276155,0.16062659213219144,4.622815973506672,3.5169126485434807,0.7895622197825247,4.853958431232103,0.4187143173340324,4.62272049401649,2.101791416044887,3.7988360314118976,3.3685542783883737,1.6560370528804758,1.3953840501444303,4.003983228926348,3.8869103801918725,0.5195524340389968,4.288967344745172,1.4650564176234315,2.5360369075877154,1.1898872630129231,1.1816292534151707,1.9270622223067724,1.2177171351446237,0.14060874009348967,1.0365151412947426,0.8262505721816105,3.08963599527154,4.726874337841188,2.5750523826009877,0.3232550168896342,0.0915787165893922,3.918197660895153,1.439385794924225,2.484820286314855,0.1134590165671634,3.9365063815799637,2.651858029804269,0.9477374046374409,1.2198892110135018,2.9300195145903363,3.4123273672608456,3.8674647925231467,4.657796567871559,4.744318408720618,1.9128335527113616,4.0126651865284435,4.132129713749055,4.53208504364992,0.9132796271044563,4.061009470972533,3.8189521041781793,1.8080844654353379,4.243926049432662,2.807327651684024,3.281808017684087,4.874434415786681,2.3971221995402345,4.401315683187512,4.8385807624393795,2.269806906024364,3.1953799864956123,0.12943634996489095,1.6184342816162955,4.414467629677091,4.404107209088178,3.4507187828977024,0.8161121606864186,3.5047470754134604,4.600908973823081,0.5069347307031102,1.8647740209214503,3.3280917808637356,2.8688372528447523,4.541092705723681,3.7688244474225954,3.3182529102562395,0.7115088425046845,3.5112714421893743,3.3788360863495734,3.0325696050233306,0.5426417839925823,3.787456097218156,2.15299681729459,1.566952648905846,0.6345922339235976,4.554472134225315,3.6980301735855345,3.5202329776407595,2.98238335546234,0.58177116273604,4.95939466036845,3.5124833912606865,1.7260255328236962,0.36295229637597903,3.4494770120966525,4.8497712816326946,2.950383936957912,4.266727516610446,1.2723606615028193,3.0046688872479024,3.6100589219056864,3.8844641208617334,1.498521401506988,2.205402767688037,3.940694227828596,3.7001712727510085,4.919353896428033,2.583107558937469,2.9052708462303523,4.407039283184341,2.7520757818502837,4.366263422070952,0.587845065055459,4.6610903349677795,0.9307028340960055,2.8730188149812497,1.1797744460744153,2.330229259603671,4.905664899178652,3.8934407973544003,1.1992977966849128,4.918300877241602,4.749191695680908,4.5505768036340175,1.0696524693137432,0.8343204974937146,0.41248584241264874,2.8655259703797755,4.985927269682238,2.5730652850918787,3.8732302239112104,2.8621628159664922,4.501122587032869,4.063084074296633,4.507588565615355,4.037700464623501,1.7073033362675927,3.120796166248936,1.7440864581761817,4.064999997351663,3.5397245600855998,3.4932385254488265,3.587542702996971,0.0727091883337605,0.022459267887228185,0.506304927243415,3.9822738918749643,0.5327102708345133,1.4196847431276793,4.293555153081243,3.386555528005044,1.608190895374566,3.1406917743359006,0.5246387659139073,0.10695020825770007,2.09236335970723,2.4318834404717924,0.578341216720808,0.21804931385284387,0.19375129991986983,1.371406441317835,4.009077401023368,2.8237616304487387,4.747408209736075,2.6414706445813207,0.6553089088059261,0.14133469831448586,2.9445031801053343,3.882543337281825,0.5011303332011641,2.7344121998256785,0.539581321026189,3.701183034391553,4.156982768462116,0.7880272864475302,2.901887738069233,2.650459996286205,0.3158938272650924,0.06959488855507678,0.9771042328078083,2.4168418675470638,1.2117225179973756,4.329467519018653,1.9968646820768088,0.07187630033386738,1.5179660478830792,1.362181046429698,3.681802329796019,3.31433675717551,3.642989447904018,4.1302479877226626,0.935284106955403,0.12210687761309402,0.7827394379866304,4.3273200901254905,0.013413343372258302,1.020709309665474,3.6846263481803354,1.0458248500764333,0.9699412841446398,3.0088420458260123,0.5386039149393651,4.334652518981978,0.6606030838866539,1.7681966214869915,2.6653562056234903,0.1475016437903376,0.16370381900610131,4.872269815636776,1.3381896716082764,2.9637809902503545,0.3840938523038917,4.5551003284122915,4.353006844549926,2.719855887352632,4.0697031519977465,4.064495766782487,4.716452259966307,2.7787843724045214,0.6205120470604919,0.13653645900334577,4.299476192651737,1.626610357330125,4.110511956669763,1.003211301951823,4.707144938720731,3.067723969478917,0.5637516107118012,3.933857709981087,0.5619640184723862,2.31226686769371,0.31920135117077475,3.67673819879398,4.45943740122627,4.07911005708794,3.4110255960380407,1.8067156984628785,3.450217392535974,3.624558478508834,4.998632973000018,2.2445274909745594,3.3422875963201526,0.8818546964721019,4.420506998690294,3.678131083022275,0.08918620754650552,0.05066153831521536,4.022079640111844,4.761779627607425,4.2146490121592315,2.8685505583011772,1.1770721984046462,1.8901911472020705,0.17867196093210524,0.48649004085177583,2.378340981671893,1.8542465283746823,3.0759663687220584,1.2595736721740047,3.437182650558519,1.4317532441820646,2.6673227264121713,3.1485026554775732,1.647841465130181,2.055577635348804,4.654255606272798,0.4062041720708376,3.1783500883794815,2.2939092855352805,3.1534230168620967,4.428589373698243,2.7496469109073427,2.2918110531943556,4.58042189493757,0.5823577009744396,1.787815338054931,3.0680739620185262,2.4149666842894346,2.152178932850827,0.30247823590342726,1.3834641493834765,1.3831161734786301,2.3506254738856223,1.9776528754302436,2.3437957928755617,1.6596903805483376,2.057430898242848,0.8696054653991026,1.2163903704193069,2.3243937681543816,3.503197907510308,4.301449101538975,3.977773258130121,2.9427064552160234,3.525054158621399,2.835798538493053,0.1872424521261562,3.3861777048883446,2.5247149675009384,4.0056369730618,2.2114260509194086,0.18061645009989968,1.633740312573042,4.749786952136557,4.467286959790753,2.0231447406685366,3.518613224379865,4.0885674669996686,1.3214140835221766,0.12010987138788565,2.8095392284131138,3.4130619698247178,3.7525224753854802,2.64135737358714,3.1948144546037485,4.19963141464558,3.711906998158463,0.5430702167953028,0.7817749723561629,1.277054654728207,1.9091924385172176,0.671768273317429,0.33624616030217713,0.6342810259332499,2.3944491181654315,4.0526538984323945,3.7420179746578763,0.5316565337690815,4.1972748216494695,3.7280223479098282,4.65598108675183,2.440933912297749,2.0225651221704477,3.2248719663958134,3.2568401027104823,3.5217341228736765,1.3841371899073596,3.780664582213995,3.450583107378802,2.670382962314121,3.2827157413767827,3.238793251533052,2.5885838398398886,3.1113690504487668,0.7024646737792972,1.6682149595411178,0.8272371135749401,1.8738771611587834,0.9410960937251089,3.681099304931684,2.370240722215832,3.7118445309936687,3.4494674817592963,4.366914850086192,0.7464710478698622,3.888190524740467,3.418764382795131,3.86862088539658,1.0893382156772424,4.614585372093929,1.8537047406324747,3.116644403169142,4.8920619512354016,3.8461054438135656,0.4674710108689617,2.431419747381507,3.9065968726806135,4.904692870023463,1.2641897239567745,1.555425011041457,1.9275534385052917,0.2915129591170207,1.598283049041599,1.6449148636069966,3.817073329146974,4.389022109428824,0.9248038000847925,0.39782141683507133,1.2830039897508472,2.0742538079380415,3.3250819970323295,3.871776185693875,0.43321544350103713,4.496953387052468,2.8262535945747578,2.8524783938226026,4.0015978527643545,0.7647861601156414,4.376249019402222,4.3169905845704415,4.593970551435575,0.780696662966448,0.4030931931640014,4.690446350724111,3.9093045705130534,2.8114104318831923,0.3106854213467869,3.157732575717158,0.3356529086632276,4.778937242411326,2.1910694552743037,2.9420144106363733,4.262182861342554,2.5776413451388547,0.3281521749125482,2.9757497561909165,2.243562604641074,1.5767483913754599,4.4363456786613495,1.6164484001893997,4.727003290568023,3.8539434769471237,4.933426675021858,2.1610891068680917,3.9528342055429135,3.82744782685857,3.148282035406252,1.9270315763535695,1.3761513792825597,1.8913390810346487,3.9792481910349364,2.6030943622286404,2.52201749451193,2.6256806207342565,3.2472391030074474,4.717880875070328,3.65398292977277,0.333837271255476,4.273925933396581,3.1678431631646067,0.519803554782754,1.5069895178573867,2.6497167404208657,1.6907162580114499,2.2264996677246653,2.324809469216138,3.3390480372956066,3.4638552237720335,2.5284679510155197,4.026728525709149,2.711734207365424,2.977879897861133,2.8704013953371623],"mu":[4.71548318149154,9.542356688681581,4.285812696075569,7.106485384913719,1.339421308369293,8.07106391446485,9.322231739363945,1.539755173829478,5.804798233371143,6.836185883571524,5.739890884093546,5.297568715287135,8.203355711126981,9.268160789470251,0.5059859352374563,0.7757528397965463,9.217249648808055,6.429816624567833,7.96058574674529,0.8744162414110646,1.9206524735801245,0.28126531164238244,1.969327695412757,1.8050754349636344,2.8463933964272448,4.366416764897965,5.431693611607291,9.53012995499612,2.0174483710487245,4.774327475363592,3.9904238782831936,4.209515430164088,7.08013512806001,4.876410441234094,4.5390333544617345,1.0525825128700217,7.805379547342442,4.676525338352782,3.1756165608478093,9.553293069597004,2.0812497390948326,9.636370170008103,5.554307291695975,0.5117049005660568,9.096383658871881,3.6349673194220644,4.542222130651483,3.7417791051475224,4.089879372104173,0.0282518584927427,3.9430760311980473,9.464878133798782,0.26485364394453814,1.7434691236787936,2.776189522058843,9.90877008584974,4.641779570127329,1.0693750046624695,1.8345640069365077,0.9239858457257766,6.946539959174021,6.103773557583252,5.351591149520541,5.7011771372071784,5.168464007577269,6.470926359714058,5.796904716114621,4.361565138930079,7.843727468203405,2.7974651160617148,3.2547298733454744,0.8157727160050521,6.6079267988849395,1.8015537101244594,7.975472220452393,1.364239670960905,8.89433246714238,7.885289325278045,9.823010462324328,1.739660959253364,5.814310419039678,0.3455195640599573,6.946232477166221,7.940738587798979,8.476661436204175,2.144434964773083,4.410743387396369,9.932198042528812,8.766226668868729,0.6674716365735467,3.0168251655086986,1.101043028128359,7.7244704503436035,1.7758184420938794,9.722389787664337,7.00909437063006,8.864980613578428,3.3944087082840646,4.7339633365971645,1.2666479199231495,8.685428479002296,8.622195318908705,8.694081028423222,4.211314644673769,7.56794913562866,4.767278438104167,1.6317858759029424,8.017604677821083,9.751013100364288,7.097133955111543,6.222197386090085,2.069557271596485,3.6596408127948243,6.139959023565376,8.35022649629135,3.7425671177103847,3.0838142361695464,7.521991101525554,1.319333371378144,0.870207993637917,1.765484900277805,5.210221426740835,6.464080716310548,4.8452411106472475,2.0463734606558392,5.088663007184686,4.754266410442625,2.7898246007359506,9.09816772712576,4.525914916759097,1.6316941768902105,5.119603653356579,5.547082395806693,1.1106412940663501,4.984697152987105,8.019003571048732,6.678097972964181,4.215252529070188,1.031076634131427,0.9594490394904054,4.278952715848634,0.3945256080172199,8.338325199276454,1.2373827023535489,9.212251532268937,2.5780255513794548,8.414866518079386,5.464113765631482,1.2154675192621656,6.7842653764328915,2.0990945155565166,5.561769446586132,0.572773141748526,9.180411614635979,0.4511121302821186,2.2251206691994496,5.091896290155655,6.71145823702342,4.3218540497395574,6.109118693055664,4.619104968000554,2.0408044719238183,2.570200805266518,2.4530392556187475,4.632213933069346,4.06129396158069,2.101309536652849,2.5832747997091277,1.306594882044716,0.11747832913588496,8.946263089750481,8.141583702213593,7.494990128371315,6.1841432892987065,2.1483832486006427,9.50468343716848,5.447992296902589,0.10200985250119476,8.935574793000235,5.001222235317943,1.5386535930607748,5.986430690970308,0.4572030347875944,3.6498727513633344,5.784346399051195,9.944330436640012,9.098377587446649,6.891520122589705,3.2057808637620155,9.394268672723125,8.049461809767532,5.585808045949303,4.574019451675957,8.864283976599484,6.072827786301779,6.958812532249463,9.695610567480974,6.502022531399678,3.076784745317813,3.5682017047717607,0.8519975017644654,8.138440329593113,5.248669242800812,3.9261723392520076,8.53283138412889,0.3507116836133761,8.739165160472487,5.280624136783912,0.22028538915452645,4.599924731427112,8.530664793193615,4.673968629299006,8.8884116293468,5.003458018128011,2.858059020082502,3.7594543095512534,4.995594981969267,6.6410796633236195,5.856125746645375,8.584551163310127,4.673261548441266,3.6441502914633794,2.7070951457975134,6.945947131163319,2.6219413007939174,7.096175101581044,8.11285565266149,4.068580247808011,3.857814114691276,9.753958427320104,7.621423832912386,7.8704280256051495,4.473910675818951,9.312791288549596,2.105859648754762,2.314477985658616,4.892543555251758,0.688490951436449,8.11661043997827,7.741511450999534,6.011011306392431,6.862404280793644,3.6044442681616062,1.9881165699459835,3.6767864162636887,5.45227492292975,3.41532897338763,9.455937956309231,9.79116619515743,2.0754764035387763,4.222690004317505,7.809576989019051,4.99051491801918,3.428546873760465,5.241508284576419,5.882959752093009,6.756237015298359,3.134476684330003,3.740200151946844,3.1473495209757774,4.192319880817794,4.116032268038032,2.9852634531839906,4.641879436418712,7.814207433147089,2.094990967059045,0.7105514593913353,0.0876514222478697,4.295973086116696,7.994840124467977,9.740974630080759,5.092738956087377,4.543667465231948,7.87821963717112,0.7414195184541805,4.859248091483814,5.625421711725187,6.4110816720008135,8.666862272777738,5.865711974902794,0.9237484666206153,7.191335663082922,4.6413733310800875,5.048714403703148,4.799776398857613,8.263366945769805,3.084967301726347,8.796644567052725,4.672570301100201,1.7004033912179284,8.698213006941174,6.850161111261013,5.405248640454337,0.9882837548549506,6.780575868508542,1.3271356734354556,3.1588933382685203,0.033069238865484074,0.7994326516986772,2.286440045025677,5.619526277996096,3.0046880356348593,4.4424302637027235,2.0802182585901874,7.39320451480612,2.0246122034980663,8.37754149568283,3.3573925791576764,6.702552870522169,3.682336588908812,9.52428299309895,6.857207540378272,4.605821914517478,2.256371349066717,4.991914294850714,9.10533216050473,2.410417690708604,6.996898863318819,8.270237247504586,5.46826660737914,5.175710303704404,3.412333596263275,1.0284195621880987,0.82123653665791,4.359636310384336,8.361613318518666,0.5311443023429119,4.483202816401093,0.3965040355832383,8.889311207136048,6.645590242591222,8.618803451217447,7.548233127280975,3.2083699012600686,5.522286790514457,0.8871437198951582,0.7181226720802814,3.973474691566914,0.29007283952167784,7.933472304926528,7.874874345492442,9.169762179743815,0.918246502867448,7.341331672699358,2.662510377611811,6.722265483353304,6.484964929151147,1.6388652954940808,2.7187559999724553,7.090163691528881,1.3096653511364087,9.272076489976644,4.086051532259319,8.001531523251915,4.725836597844857,1.721689510554103,1.450241347698058,7.830097513732792,6.2708111911711235,6.041024967063637,8.898251552453864,3.311339710874861,0.9360243221843079,5.98771683517344,0.36801663303577703,4.5804940760200825,2.1825065949540456,3.4748152766117846,7.886567446877645,4.974053896558825,5.389736560327513,4.260285246346163,8.285655281515321,5.850525331561496,0.48152719692216017,5.0079702130885355,4.561924791312855,6.268827773764436,3.1522928662796157,6.712183739029641,7.870195974220069,3.745311764672248,9.81043672117947,1.2459037321745536,9.15403178785617,7.028126675436448,0.7272361708085162,4.04209375145002,7.361020771129308,0.17247409456890628,8.30886195305897,1.9426263862249726,9.586291937033417,4.0172213153955365,8.297571157413941,0.21963963654888508,5.828625944620651,1.6271875594413054,5.929277584937848,6.829945079510498,6.604944947075855,3.5012256982571777,2.3812873980058047,2.849113879550671,4.332235682921118,1.127156447990647,1.7925250743784016,0.22785054763187818,5.9047585432081355,8.674106106973023,9.043874181327734,3.1413942049948806,9.215819181398597,1.1057947767466803,1.621221690947392,9.893526048151083,2.33146271896161,6.443072299575325,4.382659541465143,2.258832863935085,9.36219671668489,1.5235582756816224,3.4948751148626522,3.411668141299684,2.654218714785479,3.3233375845923896,1.229700758322716,8.298092093692581,9.483223987036208,4.771731811811697,0.3122530314995742,5.656115116787315,5.730492792012811,1.0787924232162571,8.36250779336087,5.005640802136419,6.007454350732903,7.079975106471674,4.733442735581514,5.733286712351,7.92423186159378,8.141962347392814,4.854089857301325,2.2770779868490187,5.020432301700621,8.222230982937958,0.8898759279620361,7.126737003938464,4.021320156550852,9.342835156288277,6.785856411014151,5.337060942092329,1.4531436789785301,9.485554486764487,0.19334171464831185,5.643490680835601,4.301530110705823,9.216392519614516,0.3890923145612457,5.909934626122397,0.7132926495342162,2.2410805535019884,3.5503966520339647,7.619192866457629,9.216723029878327,5.366449570463557,7.824091152793608,8.560629447345438,8.88806628347287,4.999683215459367,6.093779157952211,7.887090335785332,8.785692664667353,7.173503114394915,3.6682581355515986,2.4279703133627684,6.109425961561059,4.2260899653479616,5.486026007221114,5.420429952047606,2.177230891543893,2.9063798826276477,5.547777994629137,4.372807025421713,6.2962070206728304,1.2789479748606891,2.2487776597232734,9.26797168816615,7.900311548272867,1.5117535473713284,9.864383510343949,0.28469467738359455,7.25808445154172,4.356614787092337,3.1358290200000805,9.158338962326575,0.44933525387323536,2.825770756321493,4.174752985698456,2.1231395155122867,8.730839985727854,1.7860735143508832,1.00631451354531,2.9505567988669723,3.9877685709651822,9.592095626117255,8.342781917868013,3.6086868030199137,7.801567707808279,1.5531264442809145,6.458178314482044,8.642818084422114,4.459501906011198,9.781869349512968,5.775626898070804,2.005139426027125,5.839670566760895,3.5647580615925345,6.326289564795475,4.384121516428565,2.2983758534041487,9.579416055172063,9.417521134101491,0.2350795188948318,6.714293876506878,6.9978413776815,5.6465216929322875,0.20727954214945,4.2765866397853625,0.6520743669261475,6.605062651553046,5.859258039939645,4.235827792900341,0.2813346889919144,1.5900021758975846,4.75797800113132,0.3984193147566706,6.4648538002405775,1.7998485466954528,9.351738997073111,9.845427579614995,7.088681748912107,7.560195136191021,1.3402481047614367,2.4745062780949056,9.046117267677616,2.3155486556179694,3.5001094688633505,9.78819655468638,0.8254405730057601,0.5956292016025833,9.927227921965473,2.5937022292177003,3.436051397054116,2.366857946166443,5.441644200530671,8.81097595160232,3.3083635260515543,3.574437260609522,6.160431315778457,1.9662537337365804,2.6194259354483695,8.908823877149173,1.2460953214135428,7.5133620981693605,9.010271628576945,2.0381742654154755,7.349644794033285,0.7370858156791882,6.3369517764344385,6.931955378248884,6.315628653722176,6.665606643730165,8.18460593150056,9.223342938919409,6.541002742476825,3.002120526482801,4.543649391763855,5.2678252188335435,3.257676828459617,9.974643697807046,9.7299624062582,6.309790868998235,0.18935256901079223,7.955014979836077,2.400079821750636,3.6812952466946003,9.638056383372112,2.838109328512173,6.46974159765648,6.625287273087739,0.8238713213164095,6.288172427861518,5.751870669816164,0.13837808861052903,3.69365519242153,5.621126821266618,6.507674683317419,8.186839559003715,5.5380882258190445,2.483567640320079,2.009965928882609,9.168377187950256,2.160215416193123,9.218337900140071,2.8882406602395316,4.03133934069035,6.066706310607843,4.021065477888044,8.966711080359,7.586090772994368,2.624963204292705,6.325373802766155,0.13988539172217873,9.156977712222359,6.821517803312094,6.370588154738652,2.0534515305999768,1.0858855411604873,7.617748319698602,9.717497847924257,7.379787653209487,0.35055724894838214,1.0804641935698323,2.5474416562638136,8.499204697264478,8.347161143944636,7.911964493992323,9.03814202430138,0.3722182692158671,6.05328043579207,7.646518642455796,5.151468701395894,6.3573619918384505,2.946539543634341,8.919411057508222,1.1986069378508946,6.565812218306855,1.6180590410218687,1.6304982235665455,2.352921028488777,6.0037326607365955,0.2534290893836433,2.644688979910299,0.43340698976007674,4.2245993969964495,3.702461244996973,6.371608330636409,1.1849488604259006,7.333756233646378,4.211811833197981,4.878902467438245,9.240745362542341,7.090919310650648,7.42217015920509,1.1052416343375082,1.6504259996431037,5.063501558561212,0.19883747645584426,1.398870744825269,7.675758941278552,4.09417613226823,8.411071845580345,8.378319313905422,7.052185495704702,0.39230393326231017,3.9248454279265133,3.0434319128037624,9.1986303498085,3.2713837266361345,3.025275724227703,7.62778733933176,0.26080312603725897,6.276574374582569,1.4780229929913946,3.9963112085715946,9.778590834567344,6.8689696095010255,4.254783806050913,8.689148642920472,3.854656605860558,1.372871510907785,4.109328007270003,8.008914461295646,5.0523704581917395,8.849867969947889,6.817508019924013,8.040979998754372,7.449622425312146,9.891078589070583,5.682866827409385,0.39788625822550827,1.2648784719784323,3.4509886973561765,8.246492583433149,2.1043400037070126,9.22931073878872,7.913723217621498,9.983081437135624,1.8077007483910679,8.610793546452047,0.005615053521876856,2.6371756304080685,4.0546814968223455,6.960881505620106,9.028929506113286,2.0636461374674298,4.722031064025427,7.663558794485866,0.43373253445228244,1.8387353174763676,4.759960343536993,3.4452790585689064,1.5866336963988625,9.810167544549593,4.763919509897785,8.973698814322322,4.155791469552388,8.799643418641862,9.98571972110495,9.72157083910089,1.5633540443808869,8.220311992482474,5.702296976364821,8.041613057840598,2.967530249693826,9.926244803320577,3.936338458620068,1.4043483054776495,1.2945014095054241,0.989058310881541,2.5606371261789063,6.145940445442752,8.770796358444306,0.9699322049740089,3.130179340110235,5.3048107890088065,3.1103140849321242,0.6382120694046067,1.4733723647446428,3.5976499636423465,7.342444756125534,6.4038000750597295,9.181713648939585,0.6470709563347654,7.720725926187617,9.851522991516683,0.48166344626001445,8.681211140752623,4.651127277315837,0.6963468610726675,2.7861647570285486,3.2601502687386996,4.873029567579357,5.338765353153443,6.66050515492397,6.514125156983579,8.49376086880924,8.724669619739398,5.815149173509306,3.7512519450138027,7.836351371322429,7.125320411388188,5.354245504383965,5.642873639553388,9.243511477110538,0.5722279461605795,5.6061615601056065,8.454534865478966,7.2332959950339415,7.935915138429666,5.33111284150028,0.39073523977354085,4.794094803731943,4.879694472991789,9.75294171519046,9.635448449056803,9.052742350856946,5.404257577708515,8.48037545080647,2.227901593145094,2.5373143732026704,9.307674616939261,8.838478054183334,4.819973154930011,9.163418903355211,7.057277145356866,4.423628945861699,0.05754127555385624,7.618029585743333,0.18929921230438795,8.635667736395536,1.7825931737958722,2.9087867320624095,0.1395504993413632,2.8366762598341366,6.7846243833929165,5.106607436902591,3.3695588057893677,1.2213188370352546,3.7060580476172467,0.5166198859140203,5.734282217588751,9.814298430546879,7.0694781228845915,3.368646606046357,2.5850901886108257,6.6172387579859375,5.481429577805894,6.582768304014614,2.0992815641674434,5.5822563171247275,5.123688959199734,7.276464501716122,5.153740919472353,8.008880945651821,6.831559064915902,4.674152018516226,3.575154163510157,7.382656839778267,7.444484328253433,9.35844773689297,8.49812157611305,7.94942801991755,4.645666854880417,4.464336425933208,7.354923691906046,6.5335292821643165,4.053775798225034,2.084326398699783,5.165798813586548,2.19054335715845,0.8098102927883244,4.203098000312977,2.138805094865468,1.1769062620880355,0.5636976213606504,6.3456327811225215,1.1800880538311787,7.233250811460586,7.343883592882479,5.110096186130217,3.7360876030874834,6.23297080943712,1.4920955396028446,6.731701452120178,1.6201816612926234,9.8709748422798,0.0481093590041648,8.928894766400637,5.108187147047529,8.126929384179405,2.0349792713251658,6.434824968350972,1.8253291674021588,8.846484051496715,8.393563754593687,8.815302701280013,7.707775138337807,1.423473021137056,9.279774949788525,0.5666878898643857,3.117328398900099,9.86150889138649,9.560142887337284,1.831719157584104,3.193783064408542,6.586219178315673,9.558842467281716,5.531050133881507,0.1756940197197543,7.297436767259427,7.265612597924367,7.823862345607095,6.827020350276332,5.51237392859335,0.3408198648494043,2.0455517980189697,9.237482971108546,1.2893494255641613,6.667565155110662,7.182120779681529,6.795193744524584,5.74796371870153,9.835416785520923,1.0658295966066245,1.5687741275331524,1.2036947231096295,7.279626533894481,0.893678943636047,6.418282605093508,8.981042684151552,8.085849868539263,8.579107198766229,5.431846547401897,9.842220840449752,9.813990648207415,3.3847683610081813,3.785727498427074,8.481599219118923,6.511563990400299,9.461398625947226,3.782572836864071,3.2981734165720145,4.088817951311463,5.336758492880831,1.2515281869951433,9.142615549010198,3.1847093114936342,9.01094397576193,6.973164869578781,2.386988042676621,9.995881059578842,7.147200964441818,8.439796467101653,0.5734465598458938,0.27459191567229757,1.4493865651855597,1.8938970949711198,0.5878695341637696,2.0873728672521463,6.330269810393398,7.592712295052813,7.208977914786487,0.8394415005355582,2.1054459784237367,3.0621123202400136,8.281022420992992,7.7313700738322355,5.265811734792489,1.9919818087835361,3.565021501847474,1.3062880963283385,2.4844012732786647,7.5433146965295395,5.114756803468015,5.644041134816343,6.927045835628398,5.5909403961719235,0.25862128694767117,6.691164821700346,4.40247832754152,7.919652477600081,3.6685854179155553,2.931901346093524,6.219129505503272,9.942440004161,3.1686097546618064,1.7869390965947707,9.295142972242239,2.299909524000434,1.1856894997848855,2.3806578764617514,3.7544967026359632,0.014825977745658303,0.9897971559294549,6.6117674418758465,8.49534270425316,4.532961495777523,9.370760296506527,7.807256590352154,3.5083180856858687,7.441693061877248,8.892275432521215,1.4867576475087918,2.7675730266764775,2.985817832007047,6.6051204858360375,7.304242984725917,0.1990675595219682,7.688482937590422,2.869595702206862,1.335487289604238,8.390388825388428,2.0925966792768103,0.16226588638813988,8.854246479884004,0.3899086218973613,2.5234279014533767,8.181613082786853,6.147503578625,0.14633936689482985,0.1511130244306269,8.186457509442741,2.605276468286668,0.1620281286664338,7.557216370877661,9.109025811356995,8.551016355228827,9.928894684692063,7.28170868555035,5.518501304468712,4.812009013294418,9.7156229560342,7.161712471289208,4.694108585121541,7.277688034506524,8.257143604100275,9.549892361822621,5.1040422091485045]}
},{}],109:[function(require,module,exports){
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

tape( 'if provided `+infinity` for `x` and a finite `mu` and `s`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `s`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a negative `s`, the function returns `NaN`', function test( t ) {
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

tape( 'if provided `sigma` equals `0`, the function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to mu' );

	y = cdf( 3.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than mu' );

	y = cdf( 1.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x smaller than mu' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given positive `mu`', function test( t ) {
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
		y = cdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given negative `mu`', function test( t ) {
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
		y = cdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large variance ( = large `s` )', function test( t ) {
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
		y = cdf( x[i], mu[i], s[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/cdf/test/test.cdf.js")
},{"./../lib":105,"./fixtures/julia/large_variance.json":106,"./fixtures/julia/negative_mean.json":107,"./fixtures/julia/positive_mean.json":108,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68,"tape":186}],110:[function(require,module,exports){
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

tape( 'if provided a valid `mu` and `s`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a valid `mu` and `s`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a negative `s`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, -1.0 );

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

tape( 'if `sigma` equals `0`, the created function evaluates a degenerate distribution centered at `mu`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 2.0, 0.0 );

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to mu' );

	y = cdf( 3.0, 2.0, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x greater than mu' );

	y = cdf( 1.0, 2.0, 0.0 );
	t.equal( y, 0.0, 'returns 0 for x smaller than mu' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var cdf;
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
		cdf = factory( mu[i], s[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var x;
	var s;
	var y;
	var i;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	s = negativeMean.s;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], s[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large variance ( = large `s`)', function test( t ) {
	var expected;
	var delta;
	var cdf;
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
		cdf = factory( mu[i], s[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/cdf/test/test.factory.js")
},{"./../lib/factory.js":104,"./fixtures/julia/large_variance.json":106,"./fixtures/julia/negative_mean.json":107,"./fixtures/julia/positive_mean.json":108,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68,"tape":186}],111:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/logistic/cdf/test/test.js")
},{"./../lib":105,"tape":186}],112:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],113:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":112}],114:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":117}],116:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],117:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":116,"./polyfill.js":118,"@stdlib/assert/has-define-property-support":14}],118:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/assert/has-property":21,"@stdlib/assert/is-object":43}],119:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":120,"./polyfill.js":121,"@stdlib/assert/has-tostringtag-support":25}],120:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":122}],121:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":122,"./tostringtag.js":123,"@stdlib/assert/has-own-property":19}],122:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){

},{}],126:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"dup":125}],127:[function(require,module,exports){
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
},{"base64-js":124,"buffer":127,"ieee754":153}],128:[function(require,module,exports){
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
},{"../../insert-module-globals/node_modules/is-buffer/index.js":155}],129:[function(require,module,exports){
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

},{"./lib/is_arguments.js":130,"./lib/keys.js":131}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],132:[function(require,module,exports){
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

},{"object-keys":160}],133:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],134:[function(require,module,exports){
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

},{"function-bind":149,"has-symbols":150}],135:[function(require,module,exports){
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

},{"./GetIntrinsic":134,"./helpers/assertRecord":136,"./helpers/callBound":138,"./helpers/isFinite":139,"./helpers/isNaN":140,"./helpers/isPrefixOf":141,"./helpers/isPropertyDescriptor":142,"./helpers/mod":143,"./helpers/sign":144,"es-to-primitive/es5":145,"has":152,"is-callable":156}],136:[function(require,module,exports){
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

},{"../GetIntrinsic":134,"has":152}],137:[function(require,module,exports){
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

},{"../GetIntrinsic":134,"function-bind":149}],138:[function(require,module,exports){
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

},{"../GetIntrinsic":134,"./callBind":137}],139:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],140:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],141:[function(require,module,exports){
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

},{"../helpers/callBound":138}],142:[function(require,module,exports){
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

},{"../GetIntrinsic":134,"has":152}],143:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],144:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],145:[function(require,module,exports){
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

},{"./helpers/isPrimitive":146,"is-callable":156}],146:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":148}],150:[function(require,module,exports){
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
},{"./shams":151}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":149}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{"./isArguments":161}],160:[function(require,module,exports){
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

},{"./implementation":159,"./isArguments":161}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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
},{"_process":164}],163:[function(require,module,exports){
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
},{"_process":164}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":166}],166:[function(require,module,exports){
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
},{"./_stream_readable":168,"./_stream_writable":170,"core-util-is":128,"inherits":154,"process-nextick-args":163}],167:[function(require,module,exports){
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
},{"./_stream_transform":169,"core-util-is":128,"inherits":154}],168:[function(require,module,exports){
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
},{"./_stream_duplex":166,"./internal/streams/BufferList":171,"./internal/streams/destroy":172,"./internal/streams/stream":173,"_process":164,"core-util-is":128,"events":147,"inherits":154,"isarray":157,"process-nextick-args":163,"safe-buffer":179,"string_decoder/":185,"util":125}],169:[function(require,module,exports){
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
},{"./_stream_duplex":166,"core-util-is":128,"inherits":154}],170:[function(require,module,exports){
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
},{"./_stream_duplex":166,"./internal/streams/destroy":172,"./internal/streams/stream":173,"_process":164,"core-util-is":128,"inherits":154,"process-nextick-args":163,"safe-buffer":179,"timers":192,"util-deprecate":193}],171:[function(require,module,exports){
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
},{"safe-buffer":179,"util":125}],172:[function(require,module,exports){
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
},{"process-nextick-args":163}],173:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":147}],174:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":175}],175:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":166,"./lib/_stream_passthrough.js":167,"./lib/_stream_readable.js":168,"./lib/_stream_transform.js":169,"./lib/_stream_writable.js":170}],176:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":175}],177:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":170}],178:[function(require,module,exports){
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
},{"_process":164,"through":191,"timers":192}],179:[function(require,module,exports){
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

},{"buffer":127}],180:[function(require,module,exports){
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

},{"events":147,"inherits":154,"readable-stream/duplex.js":165,"readable-stream/passthrough.js":174,"readable-stream/readable.js":175,"readable-stream/transform.js":176,"readable-stream/writable.js":177}],181:[function(require,module,exports){
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

},{"es-abstract/es5":135,"function-bind":149}],182:[function(require,module,exports){
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

},{"./implementation":181,"./polyfill":183,"./shim":184,"define-properties":132,"function-bind":149}],183:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":181}],184:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":183,"define-properties":132}],185:[function(require,module,exports){
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
},{"safe-buffer":179}],186:[function(require,module,exports){
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
},{"./lib/default_stream":187,"./lib/results":189,"./lib/test":190,"_process":164,"defined":133,"through":191,"timers":192}],187:[function(require,module,exports){
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
},{"_process":164,"fs":126,"through":191}],188:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":164,"timers":192}],189:[function(require,module,exports){
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
},{"_process":164,"events":147,"function-bind":149,"has":152,"inherits":154,"object-inspect":158,"resumer":178,"through":191,"timers":192}],190:[function(require,module,exports){
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
},{"./next_tick":188,"deep-equal":129,"defined":133,"events":147,"has":152,"inherits":154,"path":162,"string.prototype.trim":182}],191:[function(require,module,exports){
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
},{"_process":164,"stream":180}],192:[function(require,module,exports){
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
},{"process/browser.js":164,"timers":192}],193:[function(require,module,exports){
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
},{}]},{},[109,110,111]);
