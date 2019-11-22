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

},{"./uint16array.js":29,"@stdlib/assert/is-uint16array":45,"@stdlib/constants/math/uint16-max":55}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":32,"@stdlib/assert/is-uint32array":47,"@stdlib/constants/math/uint32-max":56}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":35,"@stdlib/assert/is-uint8array":49,"@stdlib/constants/math/uint8-max":57}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":94}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":94}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":94}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":94}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":94}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":67}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_nan.js":59}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./abs.js":60}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./log1p.js":63}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_lp.js":64,"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-ninf":53,"@stdlib/constants/math/float64-pinf":54,"@stdlib/math/base/assert/is-nan":58,"@stdlib/number/float64/base/get-high-word":70,"@stdlib/number/float64/base/set-high-word":73}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./number.js":68}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":41}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":69,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],72:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":41,"dup":69}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":72,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a function for evaluating the quantile function of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the quantile function
*
* @example
* var quantile = factory( 5.0 );
*
* var y = quantile( 0.3 );
* // returns 5.0
*
* y = quantile( 0.1 );
* // returns 5.0
*
* y = quantile( 1.1 );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return quantile;

	/**
	* Evaluates the quantile function of a degenerate distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.5 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return mu;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/utils/constant-function":88}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution quantile function.
*
* @module @stdlib/stats/base/dists/degenerate/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/degenerate/quantile' );
*
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/quantile' ).factory;
*
* var quantile = factory( 10.0 );
*
* var y = quantile( 0.5 );
* // returns 10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = quantile;

},{"./factory.js":75,"./quantile.js":77,"@stdlib/utils/define-nonenumerable-read-only-property":89}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluates the quantile function for a degenerate distribution centered at `mu`.
*
* @param {Probability} p - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var y = quantile( 0.9, 4.0 );
* // returns 4.0
*
* @example
* var y = quantile( 1.1, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN );
* // returns NaN
*/
function quantile( p, mu ) {
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	return mu;
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":58}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/quantile' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a Rayleigh distribution with scale parameter `sigma`.
*
* @param {NonNegativeNumber} sigma - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 10.0 );
* var y = quantile( 0.5 );
* // returns ~11.774
*
* y = quantile( 0.8 );
* // returns ~17.941
*/
function factory( sigma ) {
	var s2;
	if ( isnan( sigma ) || sigma < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( sigma === 0.0 ) {
		return degenerate( 0.0 );
	}
	s2 = sigma * sigma;
	return quantile;

	/**
	* Evaluates the quantile function for a Rayleigh distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return sqrt( -2.0 * s2 * log1p( -p ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/log1p":62,"@stdlib/math/base/special/sqrt":65,"@stdlib/stats/base/dists/degenerate/quantile":76,"@stdlib/utils/constant-function":88}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Rayleigh distribution quantile function.
*
* @module @stdlib/stats/base/dists/rayleigh/quantile
*
* @example
* var quantile = require( '@stdlib/stats/base/dists/rayleigh/quantile' );
*
* var y = quantile( 0.5, 4.0 );
* // returns ~4.71
*
* var myQuantile = quantile.factory( 0.4 );
*
* y = myQuantile( 0.4 );
* // returns ~0.404
*
* y = myQuantile( 1.0 );
* // returns Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = quantile;

},{"./factory.js":78,"./quantile.js":80,"@stdlib/utils/define-nonenumerable-read-only-property":89}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Evaluates the quantile function for a Rayleigh distribution with scale parameter `sigma` at a probability `p`.
*
* @param {Probability} p - input value
* @param {NonNegativeNumber} sigma - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 1.0 );
* // returns ~1.794
*
* @example
* var y = quantile( 0.5, 4.0 );
* // returns ~4.71
*
* @example
* var y = quantile( 1.1, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = quantile( 0.5, -1.0 );
* // returns NaN
*/
function quantile( p, sigma ) {
	var s2;
	if ( isnan( sigma ) || sigma < 0.0 ) {
		return NaN;
	}
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	if ( sigma === 0.0 ) {
		return 0.0;
	}
	s2 = sigma * sigma;
	return sqrt( -2.0 * s2 * log1p( -p ) );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/log1p":62,"@stdlib/math/base/special/sqrt":65}],81:[function(require,module,exports){
module.exports={"sigma":[20.614414882364784,47.88581434368766,26.21981820713245,33.31390231221707,8.916282301334011,30.78198080853972,38.728290600723334,7.095168831423571,29.02962064773773,25.320815721354684,44.08226619565513,39.12328919220624,1.4316738501422566,49.78636109444179,41.72118418345227,25.13711000032811,39.52287645099607,11.249603362633753,5.3831715505872735,45.4307676371367,34.4039297391852,49.48587623891425,7.5276248530928065,35.12790403576862,26.41296604652803,17.516665936414487,43.26894050790643,10.866577288020519,44.91854518492705,30.433493167826885,13.441336611922905,42.01038744032075,6.241523185173237,40.673507739350946,30.067924445243055,1.2522511244921652,49.64203248016344,14.11911744095391,36.04329912413707,10.243734010054716,39.45729428976898,11.891031791129214,24.108948439316226,21.957315771837692,36.072553658747665,29.713964618448152,21.8658404942946,2.410362049106529,4.671290267513307,20.40830441648971,9.140193064722357,28.733654993195156,11.085755539571151,43.05468406219448,16.69068265506165,19.60306951236258,9.931032527468842,11.804693561977174,43.721385156945615,16.284814663747195,5.642648217507107,26.580823463525082,49.39069211701468,9.274931020992327,33.867626317008956,27.740104637708708,4.1221274822494935,33.58841496309618,22.30342213705576,9.108627058752672,24.155125267146115,16.76169086216187,40.825245608169425,38.08485309887557,24.394135505493008,8.96600504023658,43.473737439953375,32.33797007189732,15.96285221886793,12.113714162760392,28.801343755265417,36.013263389077544,5.485540544777246,12.369105904717891,42.775203989619115,24.37112740646462,46.29306629968247,20.847183908181645,37.96267341457761,19.939562305872872,37.51183488249558,30.498663317435827,17.12408843579415,11.044254715348744,32.891461309625036,2.7327085591756672,37.01462726397728,26.058317779597417,11.87684995596574,37.78108835686725,4.058718539957329,8.508360207180676,34.421338328302134,44.763405273582,41.15003786859128,46.64772668544054,25.7934865773383,20.286082966215236,18.175901313370613,28.064971331963196,10.352879937569748,19.6386185686946,23.954839172503238,31.15437451713925,35.66893686570099,28.51919082312795,39.667393732991144,16.277559604293945,2.800260416392819,47.90661901334771,1.09618783051052,20.697246970716964,5.1628451813638065,30.495288469689186,45.766060668317685,19.770437661960493,15.87271274964116,43.4389902412527,8.432572534765391,29.534136100179786,15.990111880784308,21.40262227494749,42.6987947857183,7.778340638576209,38.15235317120553,21.805038425966416,10.894216591099237,33.24107272625836,22.30569997501124,6.520856975697564,40.88857695692316,17.334408741607366,38.78779520316932,46.61471147038594,19.90469718363458,14.312211639380912,30.053929717663152,36.54274883133909,36.32036900746907,42.954112512011186,6.026112040692899,30.692523906856263,29.091255275184302,7.554122472075775,0.2583281912615365,27.873140831880818,16.186467705627372,32.778371961917486,18.129105046396354,32.28059815443528,23.636490585478363,35.72871681302126,31.633374948908923,32.316874920029385,34.85597059352039,5.600145990783611,31.153709832154508,25.169026611630528,20.503062200290522,38.09943773726355,29.46646380120672,25.67988789338872,20.800724798294755,32.84015712197619,19.653519451468725,19.42459864685905,42.78870824163717,15.546265696946449,26.831022708746342,3.2530008004589384,34.49429174976836,29.297791191165178,25.40786724818269,23.511925859348903,28.676504188593032,43.44028483870632,23.873833954035252,33.90867590962054,10.564466507634817,11.557293161253623,49.687939385327816,37.98937846254415,39.10938355234791,32.5407256707222,33.1367571015283,45.467574030101645,15.370999488101356,32.78428913669336,1.0265070754195915,30.901486903788754,4.219453883016699,12.932750434081619,43.72358344153079,23.392924628128707,42.12529558103809,33.40061841143075,8.519939653259978,13.875364444557736,45.99377343240031,4.2625878103773935,20.858661809703772,1.013451548084765,1.9131158425621742,49.53827154064804,25.987446741785536,34.61780244513771,24.105380256746876,18.877564382285815,17.689198780333292,23.515645773924554,22.029198643945914,28.29164507029408,21.036155959444113,34.81067288059811,46.19059854225965,7.21656742989868,5.226534933048188,21.27708274941075,48.39512139708392,11.675284474697412,32.871838376389185,15.751373935061597,40.964839699671664,31.617623693613517,49.13357742759925,20.88377475678366,3.693381282475383,17.749635154306777,38.98201980710911,2.5972423325898997,23.72517346216273,8.96375263439685,40.932958986276056,29.8381049513881,17.30155234050882,44.34445294483835,13.210143213957327,37.85198798851962,17.376870215585484,33.505458930023345,45.89987355513786,25.85264009796716,43.42512250379982,11.46199213988609,39.52562274982693,46.49400737999818,20.19851403236058,39.57651066322339,1.9591572770387478,13.009135467164812,48.46910265749047,42.03597051421048,4.162980698856011,14.276132809074005,33.06072207538641,9.796789317003608,25.379394838222304,26.84240093405711,45.68525221148927,4.8596512181966816,19.14035389270876,23.21649629302519,26.74586931000844,20.05054538073715,10.73733175311984,10.942474820276482,11.120207224181156,30.86276471261291,24.767586187792034,33.936702850927624,39.561551558126396,13.287885894758722,41.12593409028329,14.207048021052582,2.897335515482169,19.07038362351362,7.142353614276587,22.81757788327209,4.719790383610956,35.21195836004437,25.223109744917004,14.081238838955324,15.162118214935482,42.219313816647954,42.35991510582794,41.889980909434534,41.554471751941904,17.706592848310276,49.40137621899824,14.227747716469274,4.277422813498788,35.07136627760635,19.069948732486186,0.8043902175043915,12.819515686402095,9.397234343280115,1.8772992483055861,0.5157020903528098,22.604664334900704,8.745817670490208,14.59727296186647,11.820003804639834,27.649746938724817,28.909864289476573,9.212450089778091,23.280576071922553,16.182700857424102,35.90361774194651,16.513605198541104,22.408869322526115,14.041902244054072,4.327838081975244,40.858476687742275,1.5998623982777072,10.057965313189044,45.84907989503356,16.615525182023884,33.5009265722537,13.08902040532165,44.53573757361613,39.82915114974064,47.81852725090335,34.50280950586523,41.19742829780386,36.628716559909044,16.165982759175368,38.2558362515381,18.255980096572888,47.366349775186286,0.47049207143373684,25.88216834586158,11.897699348038726,1.1524803104896786,18.929077234840065,8.91831326522663,29.18981502338882,24.047343751291017,5.359669725995653,14.049147415976726,35.44208148906378,13.563213790931183,2.7002878317165746,11.53870086173704,47.8294861767369,7.10975776231807,37.06863989798572,21.802819452393372,39.641011623163614,39.843108194206266,9.64394959009679,15.7009068387983,23.251657638948274,44.85423639325622,10.37354246034602,38.42979383513341,38.03291749182512,5.437489155671571,45.40094350298654,2.8240622333722487,47.534577077031216,47.9866403040382,2.906774445770721,4.092228792850161,18.475141098033898,13.604227357409215,42.69622933853346,4.221916770537437,13.427771391917409,31.08449774207498,30.728739792238592,33.44407319415912,16.202590581215105,47.97928165021676,11.41180351662926,2.377427509012864,27.908112912003745,18.8883591819057,39.419836238671216,0.906768097631161,31.284022166507608,18.493216490156506,13.475008290637824,34.756945462626675,43.151564390371114,32.52004886317237,8.602114310175569,41.764546601152695,3.271873103708789,35.278521140819784,4.727178727791115,18.524463214164754,25.25109545313342,44.270858981634916,9.3882117071436,10.729198996075606,3.9784607514187775,21.714035988358916,14.33061047246974,36.721959679781214,38.681576710270264,35.96058916757768,20.501705291938254,22.824565011059484,47.45845723976234,45.70346508833975,37.5572034830587,43.481221699558006,31.410731526592684,37.69323789068897,13.84645804836696,44.550497151587024,14.00577648377277,16.67114986703455,49.62038987485637,7.497048388481975,41.262200943194735,14.486965602347235,36.753018624579155,22.360288606305122,15.241274791496984,11.306714892352721,5.246723561310452,28.67462541171848,6.855251933406537,30.589722695810018,10.144264299781192,45.765038743136486,13.421242588078808,6.4509701993334385,16.35479343200933,35.70116992648108,20.969676439142717,44.52510517987667,37.27759295628247,38.369491989521286,30.64443364320677,44.225338535060196,31.868124929479613,13.269337515135039,45.92582556962091,16.726893790963683,22.8680141021126,32.12549290226151,3.2975315255347915,46.3136940058965,29.868186446295997,16.410188645156175,15.727942240476466,20.923179097569843,18.889303350097297,21.01834767557471,9.122049819622614,36.00511533279668,29.370665954914976,20.299485491964465,26.94972285113444,28.791605716669043,2.6053281010148255,32.9525119281324,40.14883679499709,42.159253044508326,45.1371125387528,36.07310117100423,31.926495072163252,24.738364294250758,37.89060270547585,27.708648364158883,35.120281823465675,11.839115913066934,32.965352241779065,38.67090821812271,37.204635709808976,35.68273086702067,40.31414101311432,42.71313223394498,27.047016040568128,38.269327259635524,19.758296819725274,42.537884691599515,21.379278840583595,7.239824188259925,33.70737031062436,4.65799722323792,16.50395015347492,11.316900252822304,47.299583703156145,11.365251776201092,24.87424112114415,48.28894439272895,48.74487819516934,12.264335317524722,16.8759018950693,20.336925520639316,27.6443091427415,37.93307593490599,32.19997607453957,46.025799749356324,14.014135410947715,40.96159280074561,7.2535055797923516,6.563660675588867,30.75660119397874,41.73970855625287,21.7665380458143,0.31379306480293634,33.05419001372314,17.27973575345717,35.9651998539257,35.41966510657873,11.230585546006955,30.079170867214323,47.992576817476575,23.40020435555007,38.652662332829934,12.737860314156391,42.114650170922054,8.567402497168974,45.93177942033233,9.027054221146768,16.90547088916363,35.79088059456779,29.5570236698948,32.01939965881139,20.257402080899233,2.167412113222933,49.27260220010624,15.047068410761177,32.677138294826136,45.27142091810805,38.89734377515156,24.310251903960424,20.438927719486134,0.9602415850975543,13.884089191001314,29.283952529342727,48.68760029649528,26.691435358787206,38.89900218467782,5.818925446634227,28.130384295616206,12.634665867969597,26.894949925307333,42.754698351273504,28.920988796351853,21.366322061872765,35.461088792471806,22.574781932196576,27.375721563162948,30.80618913489024,4.441133128603559,27.82255530735347,46.87387895712545,36.154189111143396,12.56075352833006,32.05947601444029,3.8940811842487655,7.954971011217504,2.7526955202122005,33.27446438502503,29.789102644327393,41.74398213738907,34.07826291334545,30.25453745814296,31.769613402616216,22.353411479170802,43.41867791328191,13.172664426742543,34.826030702006406,35.58871011329233,48.160593529763496,3.9468562175596245,49.66949968143782,13.944964648561896,11.17698614128162,30.30668881842332,48.70567535429717,10.121460987690767,49.879758595279064,47.16536194550023,33.36300283164822,39.09900942503839,14.194906148475372,32.29698302385844,23.14348730471636,8.327910419102036,4.185943107471902,30.298365400292525,20.176569776251284,48.084915177954734,47.11034002484431,17.826247761463122,18.046707427320918,15.134745960831196,37.93705111013544,23.45012038685592,26.518253540986315,38.800466694411476,18.10261939465958,14.827664951858177,23.733548099994284,18.792633155819914,26.048009020056938,39.596964959598836,5.727581961589989,34.60292024132251,23.804671821749245,44.735953956017426,30.61640603925504,44.86505671053689,39.07423934248375,22.83875191048237,13.37791563027223,38.292741617558214,14.959420935912105,28.413037499280193,3.258204629708794,18.00782456610427,3.045977937985156,23.427765473070227,31.73943330931572,41.694570561765744,36.2059580290261,21.741281528446144,26.457701613184337,32.59201149053336,23.180998476845826,8.811292010896409,20.684507215484814,10.354765835433621,49.147065310652216,10.90088682758077,15.00598668611608,21.85981654656821,16.883176386925257,47.810977047845796,14.887594038044117,9.119665924410935,1.4011746040705098,16.86419863852806,34.366933831972624,7.114687737409476,1.9339943068195864,29.975314928465046,6.394773524364616,16.39320159869716,20.37700577281415,33.429946847429534,5.81486145913892,42.49740047595682,19.652207737958662,9.07781193089956,6.351912059120557,23.39410703142374,46.87531780498796,23.596460705358012,9.018799377006204,30.59609493740716,45.92965376268452,7.701206739562028,4.464411000168655,12.520891766400755,11.84718240655841,31.874503033141423,4.0208715755221665,16.393266910984728,35.54493975675417,33.389319205908265,25.524995115364423,13.961643073107489,44.21839352167651,6.181914076342087,36.6680300749846,36.50710555612602,7.432551622754824,45.323645577330865,19.537514919211464,15.570748546822099,48.15634549124549,49.92094429732874,16.028181698289423,29.825789860502173,44.46678013625648,34.29808236862695,27.044545270532527,1.6559405220708645,46.348920557306215,15.662921118129125,28.257397024273413,36.539683589265735,19.931854033536634,28.34796941735552,8.603186898460214,7.911941923110177,20.728428114977792,37.81435325937894,24.22756339238713,47.14415257410928,22.49669534707759,2.7174010378279934,35.17137543736983,8.627834069626362,4.642198212873461,44.393348781198064,46.496811907984736,37.00270004857729,0.7523820982691665,32.23786445417809,27.374841518066305,42.321266787961285,36.2937343121732,14.989417959663786,45.83367059148787,23.05731641685449,48.82514874501571,39.886673676480456,18.09354202083603,2.1303962001042343,43.76361521701892,14.025695506109681,13.489704390971301,2.6360968272873597,22.80729865911183,19.303967440438065,14.444445963908858,41.166379348393534,11.596552420795659,41.716866418013254,9.497278510019857,28.009659687838017,33.12379368499598,21.270058497912146,18.77793084951762,40.61127582466766,24.505575780048982,23.53617455879914,0.9498223636311032,38.519966025399924,37.2237641730529,21.737981323716504,44.07194244053149,1.5715053739764673,8.468085750797394,37.15976950447213,21.869938259978138,37.97003219289316,20.39243103738677,45.06524234947592,49.8367330510358,22.836290399230318,39.27502928448714,0.16499905466259568,35.040400304763665,13.152320550983642,25.602746894305984,39.971126013510805,9.156487361622457,19.433503587387047,26.307943455766193,10.437400091849003,12.702807979864794,14.041877253451984,37.11339690410303,9.151850125416228,16.627590837486117,15.920385665440307,32.141774886664244,29.20977573979978,5.9959010875214265,40.04890105182384,38.19728433898315,32.47471798193157,9.517531593328988,17.32370425767449,3.3785979116794262,0.4570568387627705,43.518185964125,35.259975839001314,23.758011430687233,17.870559537496934,23.75485261201048,12.054266761734178,38.11359431681599,37.37307106259179,28.69082832840748,28.260013303152597,19.302500180251513,30.736717395133052,28.650038357411866,16.85254124946498,12.17457531894114,1.4634758279481352,8.048833459571691,32.779372953788354,48.05857535852894,5.270101030807417,23.86635190504831,33.02045402825537,27.020924661444667,42.735244412758924,0.8855651644606888,25.133551545477705,27.90992517810332,36.45023520060524,11.942779343729681,15.72878002471806,18.88669067526092,37.06034301233059,40.771518755684156,27.521666268919788,41.41028687547086,44.665329884475305,49.911448457253236,30.36848726085466,24.552833495152615,2.639539302112681,25.725958735214626,37.951002763269145,22.60015722082137,35.14008963201158,12.846048273285671,9.247846921754842,48.6746341602014,32.05725218775994,40.08280658357205,1.972240590965224,35.62854362892983,1.136101942045653,14.579149777806045,11.571385107090693,7.100263742848634,7.231614942110454,6.460599681898193,18.4746441038113,22.40382538911082,32.61721050657707,47.25767913514498,23.622445700955463,30.85834304436824,42.89006351863278,29.37313888798263,26.026898736999172,47.886816723876905,33.96399475814687,5.81633055460814,49.88504680295732,35.510229588562595,19.30419255583341,0.9373646015626624,27.773974002996095,32.377856656961335,39.2498807304081,19.25989750275222,42.754105195352324,14.00150300997456,1.211252208329061,30.604828030128374,47.022800887153394,42.22714495819982,15.899847726862692,23.773662587442846,19.85668301085166,24.504025829449393,8.756787814979672,47.14349621672624,44.093708331903315,14.999124782716489,26.390929428982336,33.534724367290494,12.474679562808744,21.82680795191885,49.16565169724246,29.293148099897937,22.677998151613053,40.571311013816405,40.64601009663231,38.60826588189713,28.502845201237513,41.637528991735984,33.32117943036257,2.3283103450309928,3.3143161757190676,37.77956512603519,20.871407069527802,26.95589963357923,7.877911078192145,27.1971655494593,12.669186667978426,33.997208102179954,1.5264655140318384,40.96720365704122,30.017691585221606,15.145742239051973,21.470320134473255,35.28310411017106,19.127505062919205,2.6489316865222823,44.194783492433444,29.92536888061903,7.374570476074471,4.095962506675921,4.418903565669973,46.92380016486426,29.9069351701312,6.285949786913314,37.76595921924874,8.536502833290028,15.701076411492076,26.374307000976703,36.59077490100769,0.21174616283489156,9.702768474741886,38.475927562954425,3.7306714252519857,11.35042109394634,27.563553120380845,6.635727219125698,21.712511575897274,27.229776467987243,31.03068607774908,17.673933808255672,42.279715438772726,35.02260183274488,29.37485111689969,12.737006302574772,43.58237791563473,43.42381655016765,12.147876893491782,35.53371624680317,31.824861746085876,48.51274439898145,8.432712488235694,48.856199916958296,49.8309086611194,29.803268236139203,45.07622083688106,45.61900228918956,35.47335243623281,1.6593367612492416,36.64611107153796,49.84242288229872,43.13103165885861,15.979295629640545,7.235557397615366,21.98576001391902,29.924710707789316,33.19857156654326,33.96041450286161,22.888941379668537,39.04691266065468,28.348043290651393,39.3698910114636,8.447375607094198,32.839626739007976,48.481726255336675,28.593266358590043,43.643878668562195,5.013626483505352,19.436699447339645,46.1530324334351,36.969457683042194,45.206791744884846,8.14928008671597,17.435832251898585,48.30038654737835,30.056246580191115,34.7322687791477,22.914262745306978,45.95409022151477,1.1239725599503814,12.96279767151336,31.761742822072712,40.2369426403248,6.525891123214511,12.8415313485171,9.264433039630315,29.091143001377084,27.67494754816783,33.28923567828868,38.36285716644937,29.48092389927742,17.560923439352027,47.65754077642795,29.29830345665161,5.827696994152321,29.108057729082283,16.58473929433999,37.03859351147,34.36889450757824,10.049544338637784,48.897444442124005],"expected":[17.72179620527612,11.133791739742806,19.662938397692916,77.21235202200222,5.802747500321391,22.077064852763016,25.690762825068845,7.6025640932202325,18.827244617859318,31.74032172531701,33.27676847251525,59.31148710133774,0.7693407619782539,47.46344484968941,52.74878254511832,14.387556418617555,17.43045182256672,20.890070306468196,4.26654829374008,27.483399544886282,69.94376283994758,83.42374175322487,6.426711232913727,37.23691333814649,32.048746002073166,17.859377784973866,64.81895995984283,8.90319663636847,23.78381395364209,44.17112355222774,11.22527365534525,33.40148522673732,12.402834045484724,108.06181144985945,5.519164191795274,2.5261798826226043,55.36248832269195,37.07788889365953,52.60938443619909,15.492424291245918,38.6383948949587,29.805569758943907,23.7880989583381,27.726651464719566,90.38973710623124,37.3175191015628,7.710401178309569,3.2695418763097623,3.6530710041120336,26.245041343994156,1.8516585025644452,18.69474743499273,22.72794927249699,4.885371104792635,12.346782263007471,7.669545567873627,9.263758712693798,13.311336249612625,35.98300395564215,7.915663311577381,11.457823855189643,28.32525638676873,100.18357311580996,21.211596038359957,44.58693011284757,21.70335716618973,1.0222426791778185,48.46849152730882,18.282193170836525,8.631047295018133,50.7335320116813,28.674268518522453,58.799822762146185,52.73249384038894,39.21759374782938,8.977149199162216,55.609668345280184,18.422486667056,14.819902505926985,14.659578502087863,69.75120322393123,59.56464719569797,8.525555568968178,9.262772094098409,4.850105690786707,15.264512043012127,68.38759287134081,27.70028020507289,51.1485321451878,9.391458568243173,40.12905988387863,17.967418683804926,19.417534184274114,6.283805505368491,24.50670205121654,0.7793813832903949,75.24097406609424,25.663139302912693,33.489992487347436,55.01409120501703,5.008666083930032,7.597601107822294,10.237104890821357,56.438232682164205,51.45967783954498,11.43686992649146,33.89984032339853,6.165314540289495,54.22136753757245,35.8858637847424,18.269455034614378,24.01414152681643,43.42913731528892,17.940121745937834,60.69767137373179,51.70346708304804,46.01362251252678,30.9239243359058,2.958584724840016,38.31865422114892,0.21198754591711458,23.282210145898187,7.156452297467828,44.92159571237653,42.40310779477788,26.097047921039366,12.517463976641256,62.426074196753845,18.58823269130357,21.150722995028644,17.706770099494637,32.69941070144715,72.56827569897871,9.99757532624834,87.61443543688908,23.85375757112007,25.262953270978905,22.953938805405972,14.140923008299785,1.9434414851454587,20.32025987059381,26.584145650617053,36.39461422701535,126.21726255284909,32.54736498505752,35.13169139010758,19.719696555304314,33.79754367116879,92.18886644707361,15.006420167048582,7.95603880279539,25.067392420482406,32.37880538582289,10.636692718356914,0.2596692343326918,14.002682600468528,27.609094172798017,15.928301277373981,27.226781236557855,25.920083309222484,20.41066470594233,21.359857193613337,75.24126067062215,41.34765179278166,57.17929569020928,2.287959844432338,42.10015901601972,45.04602568533246,22.574884695386945,22.93756506384075,58.96150479192345,13.199910545141543,11.566198586702578,35.203337842469324,16.283210003045415,14.007324522683254,28.629580793161356,13.419110971422716,56.19334535022239,2.636448183120165,16.142805623301594,4.154973650911496,3.47814617045604,77.46659138755642,14.75156559327788,83.82058631715095,33.582483340232514,76.24422288042304,5.385533105530394,21.465517891304707,35.61008547612378,44.637641568415695,84.3488298400885,9.245473897650063,40.44632374894137,51.78579541618169,23.10170512787201,55.81235880261976,1.115765643166903,43.687264059622315,8.20506462083203,22.071521249199037,39.45781517885084,57.20504181315213,123.0781223402453,94.01121604416244,4.926041377562137,28.006985295476895,83.38513673519334,6.548144966353582,19.696449121261253,0.3783484336666938,4.92459585409606,73.05054862941567,25.1442568738235,46.40147355124924,32.14216406531362,30.483065764721818,11.510593324010664,9.778570952844076,51.20115038817667,11.769586886826598,55.14720470754008,30.24509076222761,47.60325519033336,6.265198787055942,11.660482714122324,44.87021131308935,35.91223983691664,13.186760737867026,39.57520284986593,4.258866534845373,36.80670561380675,54.32732794606724,72.63938727970913,13.523092440410963,11.854140941135823,49.28085073652933,36.84206454976015,6.090210989111784,61.37033229347473,9.857859634478809,63.914851326939186,41.93024547743105,24.894176432395803,71.21483916688268,8.268605419117634,55.862080453549105,49.38664403787248,27.51798927823076,46.797177192625256,37.780721503297926,30.41447626726617,28.899702467143538,27.89513346738538,25.716717435666986,34.881330117691235,90.78267115511515,2.3106040284565523,5.9549610527158245,89.43716165678251,25.021305728646148,5.88854681690235,25.42661777309559,49.402585395914976,7.559574898764829,4.723280759203121,41.529039084593656,135.74176791958223,7.958285034345601,30.41058846565381,3.8855124634272076,68.99229217505857,9.755103693380944,12.382841294301135,12.643686107693522,32.481568885754164,52.46495102650672,39.37732759649314,82.16294676633244,63.072321587949745,18.625456947712607,68.60045519394006,18.717773770705847,2.9145567806554613,12.240119574353866,9.732324252922137,20.946637012686782,12.489060511688105,66.38837596333168,47.95507131364016,17.494646657453988,14.81811288200137,46.94837975925542,47.55872059552714,107.17808551326263,52.785085998534605,14.344265593693832,52.09147319739749,13.004337289129554,11.228574956075375,10.077274617054773,29.10383661308502,1.267609378233499,43.03962879448502,16.95563461430927,4.5426264192353685,0.3570497257171135,44.16839345818156,19.643582607229998,13.554050453797712,33.52567303650947,42.73096561507201,15.770723182374653,13.087097296734811,18.44630530140819,28.788453729712618,75.53357495458025,17.185928893075115,22.88250114998252,21.5263560588291,5.809925698958285,39.95772346993977,2.6832969498216572,6.92319201732704,63.2495477053312,22.361506909361857,78.37005011264935,9.235814752138857,34.531372831007836,49.53805598982962,77.6118701621098,12.271336286225596,27.574645571693004,59.163840679473374,8.679196065315107,17.626988757592553,11.888816716978692,54.897574562951974,0.6915350762140352,28.261395412624584,23.07806468801251,0.9922651720667943,47.00893314764063,0.7051567622188232,56.09116566994266,21.1842692241961,7.397797207884069,2.5480070621429727,7.14969259562031,14.031354142795893,4.18978034512862,20.382218061846043,83.13507871907112,5.0898885448166205,77.74523690348796,40.389255519379184,22.84672036416843,24.287205920142807,6.910255935758586,15.048302510528082,57.37162512687408,154.1977243168105,17.837960141602785,28.575750306897284,33.17553928243841,1.0393723661468264,117.78472913904427,1.565618214940941,51.9461213999486,90.17467285974212,2.680866620573223,3.99865368271737,16.784209064391188,19.819941266934293,42.73867965926644,5.115841172865553,18.696122292411115,32.65227118894057,17.215018089741424,19.16645247643783,6.113228853635937,14.639063478101297,18.573318462015852,0.43321114111184655,58.33176746569473,17.475848487176457,68.32011424681392,1.2507149408775404,21.090212794761914,30.884354074656866,19.531238353385252,47.27012623888891,43.25835012297315,34.794847087070224,11.789221527508895,37.47861526646625,5.634164750201419,36.09379260852446,7.944847764647296,27.167727825757023,14.411033772477206,40.074491039245544,13.961136613098214,28.563010846735082,10.50924531066343,42.52132729093797,14.747957458327464,35.80471527208552,64.31435340951505,36.307439384503375,41.9429039185272,11.879811463829137,54.77485768802643,45.980312286643,59.625338396022684,36.55025853012887,35.84883689903398,48.78887361557256,20.40742734587318,63.412703890713594,16.81347185082193,13.376208242007653,108.93603824873156,3.1218464539620365,10.180140411296408,23.484099742470708,113.32610535472183,13.992413515137086,20.163698453632815,16.927562105364796,3.6503702044027353,52.9471783725691,3.5996563426873935,12.852024889774603,9.116452842469759,11.54089327563766,19.819990114514702,11.599902818767285,18.700917458180314,50.76635162281713,15.96317299744039,15.264716952535494,40.041082823321055,23.85043519237357,26.29438758192175,23.94044285347171,10.527743633308718,11.352702681212975,61.50542452338771,23.944375425790046,39.57944389101348,122.59423769978468,4.7740097866428215,6.228070925808992,64.93782007118054,11.017540989789186,32.2631347068853,24.852454521516094,27.0182870212345,43.39083440296013,17.45997268037497,67.14443130490326,39.5491416891872,28.43721301807896,21.462458618838518,58.46805755450418,4.051700394305443,37.49539955030264,62.81472531841648,108.3323250830142,72.85770995990191,77.94341038164688,28.727152827030263,57.8679916160933,57.17749418822126,38.620095175625714,26.613403789293425,7.279859043064952,26.790061772526418,66.0836980457807,32.29079344872308,29.307116037277858,90.2243886899237,31.564777325534163,11.713503704595372,42.409854737721034,16.442484460059713,3.265329328282817,10.099144004979934,15.244469304379257,6.889858293349485,1.5600175003332237,20.94005332080669,11.728344765335045,62.093018090518086,5.54825188278045,57.369019109251056,6.5231303596758945,35.42551262651695,19.251134571319547,11.11880327604662,16.493236763207186,37.05601035898309,35.8158096311769,12.419341462854286,78.5849405878234,33.42116434087664,80.78239562490127,5.552728190975811,5.695641229264707,49.733872100753516,104.91358765233464,37.632221734635216,0.5434043008309556,62.10296155328048,57.84030398565456,5.793381444482591,25.45361403093523,6.746411265678245,43.857166232241724,128.07777702277934,27.471853858511388,22.998824699468447,13.896571459396066,31.62233022411832,12.837049170657956,80.23376658995385,10.933462659364347,24.55311303946082,99.21009328158627,44.34507067648468,34.624651687441606,17.7759781915861,2.882678617340928,82.2603030637919,20.615615025549967,48.91910647609007,59.261788529577416,49.88346531625029,28.65313622775534,35.10490803799446,0.035668742458418744,21.850692573420716,50.05003745380199,70.88141393109855,18.779876050741553,40.6902607956758,9.150391005278255,50.05384286980653,25.41362189920165,49.18987790321651,71.48384014669142,35.491460744770414,22.042566845383526,74.14223660817628,31.587451603232616,28.437439652480702,23.81294765754966,2.304882134795361,33.84229788685666,25.713603981899173,24.238652706888757,11.78056052118168,39.049515326150136,7.31137032275936,6.212709155659787,5.831293719602577,52.763011623122345,33.21749995943346,34.95656029117555,44.99037798098701,22.93907635216089,46.66298283681974,18.65007942453171,68.33990371324843,20.252178866922247,64.96146533109135,30.708125419901908,94.5893156095088,1.3373924666721246,23.89043786452407,26.890150667100233,2.5640544159372856,53.7275263381413,26.26965589417456,36.58801261347361,39.4775279579667,35.43266089935338,17.654083093023715,54.472339244484516,9.876432468894501,40.51645491888802,50.759371045438506,15.059866660435203,7.101714945175545,35.47637741530038,9.12949059024464,51.56759507083301,72.11883989358876,19.04258764675792,12.755262943968763,16.128547540342026,35.16083405516611,61.62062890243234,42.64315774874041,44.50305306694645,13.416297690247406,8.54418801295908,38.263984662356776,24.4490631405432,71.53980224906853,18.212299476422167,4.920090009713867,33.620858180781234,16.809981219906525,86.97704126732818,4.694755242309252,74.011654621941,47.07338244115159,13.9113888093274,22.754694821238836,36.10847082602508,19.264784219947696,37.98723903878353,8.52358367534089,23.73126668938281,2.73155095008059,16.441256214209563,29.41008721693793,95.1766525680476,80.65350903426524,31.856496579044315,32.98294720268993,25.129241005413125,26.639567090433044,7.392542987966792,38.109886472305796,11.832763464097072,21.145874146474554,2.935001321958763,36.29399163785057,27.80992949120031,33.063303257099456,11.089142972129403,23.147104029595027,23.825309139966606,1.5943460719805778,15.775566594812679,38.68943927434424,9.520277752916199,3.2836570376174357,15.157589634436762,4.607639801104692,39.38959540610987,30.266465280582274,12.646109070125556,8.003215850024684,58.91101906077728,29.33701550709112,6.569477824690751,9.304514034861882,29.20013403109392,93.12268529692416,2.2511441467660593,17.42471191556969,37.37501495867782,63.50011885859286,11.317247854808906,2.922014205214146,9.334859720963745,16.861692431700757,40.91188667889051,3.924532113278211,23.941964076441213,74.23627025577444,39.279393108544795,23.37773389119629,28.38271411767452,71.09422639648812,6.4684779569394975,89.57978881636555,10.28471072021704,14.327718979360887,76.73853254540104,17.661034477870462,3.098532318962655,52.04600076332683,128.51246295044425,13.453242286982917,62.76305438819094,30.429035890154434,6.624968029164232,9.888091862587208,0.16968982082119327,18.174824220425865,1.2565485223588448,19.355239787084724,13.508954499752829,33.66497188509854,37.113846392277026,12.642632309881302,11.071408075520303,16.472419317898197,79.37258702143245,8.325787292859978,63.37666077308357,3.1392996820806376,2.9304008380103657,45.14809970342429,10.157789298159628,7.272551116843273,59.39849806313463,36.958038428689434,51.72694228957479,1.4889363722608404,51.35555349073717,36.63690818768155,62.2351776772453,111.92523989263168,7.2482571240168525,36.46819799092932,14.33019985066402,76.58215673299422,11.249898920648493,32.037555145622036,1.5184981691164614,38.06928909820908,28.77604474222085,19.215722815054566,4.295975866586211,22.447357832432036,26.45486356693773,16.130796397632412,36.92704792319793,18.051804675827697,68.93280486676677,12.283105452063594,26.68745457592063,29.983869097432805,29.493501496355474,20.93020668736049,35.86902114387632,25.694849526444834,55.82915975230985,0.46000532065124033,49.12942527096432,68.44164959757134,11.869800187672631,36.956858323546086,1.266249702878038,14.56696822670435,71.4531860051636,28.949896397378414,98.45017164430931,29.169148652735863,27.393036234241013,61.6831742546127,55.08333225308418,54.811332700798694,0.2001559290997352,49.262436125069115,17.463895369073082,4.503298219325356,16.17088832559628,13.924724012994899,27.220041899572898,29.812137556093305,17.382951208464387,10.661552673489071,13.223868338926263,51.04080030387766,13.522476946595733,6.44755655647464,17.82196629846445,49.01703481496843,56.55627373086328,5.415689974155951,50.16351257159929,46.38657389203476,31.2326201023521,10.095310115490836,27.811403181157967,6.444810252425602,0.15955600302193582,46.58616923486274,77.48935268167538,16.783467179451105,16.139688212424648,1.6505796768767147,30.48477513598396,23.354794570508886,44.7427223211658,21.821177848677937,16.480308920082628,24.5206409501598,59.36141675580277,58.76901920780906,32.1921750582364,14.569745686324273,1.5835443048310738,11.722073979058136,57.05382139188385,49.97474801055751,5.398586574572103,39.694307475775595,48.27626026496735,26.76714164388827,108.48065703254704,0.565163039856897,47.09414531210296,11.747868310899108,58.52643777095413,31.472464156220937,17.469937604571577,23.892646955437417,52.302814034315794,73.24671747158727,3.837463856525105,31.031976513561645,56.49850191431023,24.176359861528024,59.17693522875626,19.618683850372598,6.156385760989442,19.84433774120995,87.1444882841054,10.591281229239446,32.77037413414528,22.49344568582642,16.051496267568147,85.94769089768069,23.17007852612967,80.82905440752275,1.0296619130917544,45.064809284741855,2.5419005152600973,20.807882771224104,16.303177014345103,15.865223548800778,5.7592177442030295,2.8016423606896095,22.421227618607197,17.119368832796955,48.468643055777044,52.90900405066402,11.92414306792948,18.852605009232413,58.28110205260694,70.44270555590967,50.608051960861836,50.303954802637946,36.798203734402506,8.707991509202731,71.91570864633859,30.21124299599118,26.516340462959203,1.4096782851329364,33.425970054847696,31.64473164826188,83.12652918742845,26.040310063215703,60.57879753134461,24.866100672328646,1.8552766818355149,55.39515314748145,52.23283594413127,49.55512086619151,17.510839624945863,41.908406082743376,35.455731767707505,5.928478725118694,2.1488747470544975,42.374603671999466,16.301328345005064,26.92435898189313,34.94967011352388,52.86208680346611,12.691364873370537,22.252197585897214,26.29671360504018,35.1402260421932,44.883799245338935,48.26955687706247,56.47284318574699,38.15764450083479,60.95609396650484,35.27503679569504,16.89800027530756,1.1731086480053254,3.6460585801277983,98.38528893698299,26.732371569350004,26.754416980538796,11.303523966920446,58.948907617891145,20.227187424714145,30.7502991566548,1.6241392999126623,74.66106340073175,27.755930296737002,16.76182053919205,34.423426906116035,40.290045835201354,9.806033090004105,1.4848877430977159,63.66756044705131,22.511997632542876,11.361572518435757,8.316979558407075,2.587149857216753,93.70622494745837,39.07689859543548,17.81641999563433,78.49394673582002,7.0417870985416195,33.63685567804859,65.69780445953613,54.99105076657866,0.4180878420320581,21.42738757895562,127.43262637696715,1.8043295935147055,18.928940887334672,17.30424648074246,6.582942023758255,29.25524754653716,79.53589942272377,41.13074687001043,33.032167653233856,71.55550412919763,67.08395639607345,63.38524135938851,14.96894144543172,51.262157237752355,41.42968298281302,10.630302930627657,39.691618509236136,50.57881922740751,74.29582623394087,5.17304129423097,35.01284897541045,101.74957167692567,64.0835806757335,94.78781726360803,111.91510629504585,34.719764894369604,4.8294459109163705,72.50316118167572,28.141932268909358,61.56812984993616,17.18513810506597,11.164294328617661,24.272923657042817,45.4979544059325,46.2391779220339,57.15220471417118,4.652448047123104,19.514157160910113,16.125642093760074,23.439340126325053,3.631485597854054,64.89417882896316,67.09294040114919,53.92805788606536,89.4165417454953,3.25545568389901,16.21853939474539,85.99583594414821,57.30312698472945,86.93568661445575,9.648917170106051,26.74657976463103,67.52281147876046,64.33105365751054,54.0424402340953,39.739530036722456,66.05969379271319,1.852474972765334,11.956801286065756,44.300780575070284,54.512792700397284,13.937109883397996,18.713626484679658,2.38417607087982,5.958912006736812,38.13920898717341,26.82942203604733,88.76919936523684,61.18453401029472,46.017711430285964,151.87781549927084,12.617018549818043,11.705440998814705,28.70703359735945,20.36841180661653,78.11920129419538,72.34845137647822,11.744330441406296,41.167457181511445],"p":[0.3089372750660073,0.02666774023060814,0.24511882937048401,0.9318413212231234,0.19085130768057978,0.22678121540620677,0.19749936098306353,0.4367714714186448,0.1896673455967559,0.5441834029800026,0.24792633863790647,0.6830941338091883,0.13444475705859205,0.3651907931319407,0.5503330745120776,0.15108805104549994,0.09267097528173407,0.8216756776472143,0.26954290476139686,0.16721769188493085,0.8733817215432003,0.7585218301627961,0.3054177567743519,0.429841157973893,0.5210386930315738,0.405334546428642,0.6743962921752886,0.28512106205477483,0.13079699571454495,0.6512077025736638,0.2944105264589594,0.2709941879367008,0.8611525978061749,0.9706751970911762,0.016705392980461475,0.8692896794090792,0.46306249500924146,0.9681952642967928,0.6553547912529185,0.6813453918222978,0.3808831779369526,0.9567785499755521,0.38539791730414996,0.5494434635630021,0.9566936729966053,0.5455338647623955,0.060278324000645034,0.601473718733309,0.2634531447644788,0.562594937591226,0.02031106862760268,0.19075573973435223,0.8777451743876552,0.006416927780244386,0.23937009976294354,0.07367967435938216,0.35277838825492847,0.470475386231763,0.28728255105874956,0.11142401116732548,0.8727521675094567,0.43321825659582136,0.872186418045015,0.9268426211884779,0.5796190277180897,0.2636581205829962,0.03028134557861617,0.646948754028331,0.28534610279462314,0.36169748688404657,0.8898239203959226,0.7685176688348565,0.645555881605318,0.6165576816625875,0.7253597186150185,0.3942232179123608,0.5587392628511567,0.14978926049611374,0.35011686711864387,0.5191732328867307,0.9467398444742019,0.7453330672047711,0.701130587735286,0.2445172122817667,0.006407566416177124,0.17810968572692687,0.6641769248740317,0.5863610569935576,0.5965324120110369,0.10498850914089797,0.43571995606673,0.15930981747760375,0.4742343619832423,0.14944071076783105,0.24237789824121125,0.03985490618954479,0.8733095159495323,0.38427191547508066,0.9812310835257221,0.6535975442810864,0.5330070231343307,0.3287987346340018,0.04326142696360824,0.5483389568330588,0.5424743796286537,0.02960828728339937,0.5783858738554133,0.04513299202245191,0.9883165277928652,0.5584657606683219,0.7892402982999998,0.526508980248668,0.8066802776907893,0.15278375006066613,0.7649328083310993,0.8066722663986359,0.4897139320747308,0.8354595125743567,0.427726053287357,0.273770436305075,0.018525358236243905,0.46884070996456706,0.6173746822505024,0.6620856562179043,0.3489822589429403,0.5815528525576998,0.2672546447716695,0.6439289325515778,0.9119236369333319,0.22619224022853457,0.45834190701037825,0.6887382241391917,0.76406920367062,0.5622075283785295,0.9284106556830412,0.4502931338931906,0.9320323923590392,0.21212469399720701,0.18204886560889277,0.04344054541366704,0.11616769521323,0.6914813578374743,0.35609499637830955,0.9744147382529638,0.737334558091552,0.9508407981340115,0.19367006820694477,0.34799211610146563,0.9600954517161349,0.0592011952956657,0.5816948698978246,0.283603109578092,0.4617292624642453,0.6289145840978259,0.3966179569272241,0.1185515518564475,0.7665270337671994,0.11136485077749891,0.6762366131302351,0.27557260006357676,0.31122209501450104,0.16364574465418746,0.940911989593783,0.5589024690860127,0.7395982296351677,0.08007030000614823,0.5987213254635273,0.798423332668003,0.45455587615576665,0.16575563698100138,0.8649270278151109,0.12375274256858071,0.14323757284865546,0.4370414174516888,0.2905160971547558,0.22894976632854713,0.200558585846085,0.3110134232104358,0.8884335385455466,0.27994521261118277,0.10372223231900413,0.010005871770281116,0.00932601710057579,0.9956071768967327,0.12393093526978194,0.8445760429811557,0.6281828272970966,0.9201746053956175,0.12184909688182266,0.8217925440112079,0.22648580788959127,0.4985825390937262,0.9022915182955409,0.03955841191721876,0.5252264727807399,0.4772312773529206,0.6767779736552215,0.7652191776398602,0.4460795259725865,0.6318841789779728,0.8490331831485665,0.7669043410489049,0.33448693301174304,0.9497120050752201,0.9859931707776504,0.9809586291189076,0.15392297724560278,0.8695946277254778,0.806682707317733,0.6927028024206605,0.35970982406303964,0.06731371679801379,0.9635952164499881,0.6628625786914164,0.37379677992779103,0.5927496691520635,0.5889253897424356,0.7284891421610074,0.1908037172106425,0.08282625623842144,0.93286477389613,0.08289367104833345,0.9678147178499068,0.31438985093247984,0.41201325480889994,0.3139868928704541,0.9169835126718608,0.8917841749221513,0.24067767007066254,0.4715670546855564,0.5155382417273979,0.035892855420244896,0.3321199421432981,0.7714980046838078,0.6647378445920471,0.1891355894769633,0.9942043533584919,0.9788119500544812,0.3602071498563233,0.9360223532761247,0.9647593453689955,0.45377356809931135,0.7044940180986119,0.6274468192864129,0.6448202132571381,0.7246005833103979,0.17790001692510593,0.6634462349221213,0.9823803448816011,0.2862808654414555,0.40532499776403097,0.656245146328621,0.21750859894295105,0.9583562840701587,0.2204513618798123,0.1418447888176395,0.7748832092780191,0.9279848851432146,0.5011632991919761,0.09946708396254111,0.8177647143755384,0.16234813808562643,0.6322708925412575,0.7952741380204704,0.6725644092421728,0.2574852923686235,0.01716879825811013,0.6978483087305198,0.987894898574438,0.7383918184836156,0.7169623756635783,0.013907072864263181,0.9641007061718145,0.11161811829382562,0.48572350279659426,0.48703817291013984,0.985961817561051,0.7642312112905376,0.7174355991674366,0.9466444178553963,0.7194124959255472,0.625574799011781,0.7512257015217019,0.580168572953446,0.3970744120671006,0.18614964812843526,0.6048020936382101,0.34385012226526235,0.9698308560158362,0.8309149060610177,0.8359113070319253,0.53781455522048,0.379710459351855,0.46113232708991836,0.46754698163333486,0.9621118944766507,0.5537086876715525,0.2797364440456793,0.42646510600651544,0.34144635685747526,0.9681118623927047,0.04044060001350802,0.6879480711920833,0.7110995941705729,0.9964325591648031,0.8036366572088636,0.9464765666693857,0.21311943639299935,0.8517656971136627,0.9197316813267598,0.3501975054796185,0.9820908212799158,0.6970504783786902,0.13825211314694474,0.6354294981084447,0.26941321168647536,0.7945099611189101,0.890623639708088,0.418149715413501,0.4062870185075931,0.6911988052868172,0.5938740879874631,0.3801001327692697,0.7550026854147229,0.21092870303599187,0.6138511839526322,0.5957071557971758,0.9351874030559508,0.2203783702197819,0.25962173941807776,0.5385927326710955,0.7321011979180077,0.061289082292157016,0.2006855462384769,0.7286879620033346,0.13421630362223969,0.10071264286142645,0.19107522989571857,0.4891298816053764,0.6604636374721171,0.4490716263223731,0.8475980593529913,0.3097112413350154,0.9542104092462567,0.003121025396503496,0.8421759394295718,0.3216064641847771,0.6142532255283308,0.0163119138971215,0.020141668339570318,0.4143957754926557,0.6999299039790698,0.7898899423636141,0.7792207758326324,0.22605750982853645,0.8891303753345676,0.8201870980367267,0.15302507104532825,0.16955073543989196,0.22641004667637343,0.368273707742506,0.9523600152362384,0.9972852845510811,0.7720088606191919,0.24153453470371233,0.31643974174061196,0.018103164527775606,0.9654468615958118,0.1424462820821979,0.4496020047069438,0.8289201693037449,0.3464278327931205,0.3796025141172661,0.3381151436857073,0.6539848226562224,0.3940723774397401,0.5200867652903052,0.6206574327487331,0.4240346350400097,0.14523286571421745,0.1514411832281537,0.06870337681253047,0.04548003835443337,0.7340547638903532,0.016464730556641216,0.8874474939491035,0.34819777846999944,0.7772907070311266,0.6137417167493868,0.20327128001115913,0.7520459013407472,0.6502163853122054,0.6033998258761069,0.39497029835518527,0.43582860724816674,0.6090356608094738,0.33145012729286516,0.7729628488618321,0.40748352266772403,0.7564256487239864,0.6588516981143147,0.15028520795743883,0.3361532388346178,0.6690280462754681,0.9710906218290323,0.9694641812498326,0.853004744181401,0.4111282327172303,0.37832253307506525,0.7489795801976464,0.3993193218293001,0.8766463978437493,0.12667855366784098,0.486264958811347,0.39714333443298866,0.7164074291326261,0.2976357178158453,0.4786191217367761,0.5672922125376048,0.6624691279175314,0.6368788099199856,0.5135204704769682,0.2752207190314875,0.9101726291345149,0.08304664386455585,0.029976481412741895,0.7312307343405455,0.9913814015182982,0.17781881311808956,0.5831881658004674,0.6739456451777643,0.214966612481992,0.8181817657756167,0.12878127408153617,0.084476839830536,0.33223125114009533,0.031296439245319,0.6639226711300281,0.8014465624819189,0.47990353364301663,0.6361500204118566,0.2515501128522004,0.05707407602390213,0.43835233970365395,0.17567681843225613,0.307967927905918,0.13629012055690937,0.05310463851347502,0.30649074982747093,0.5921165384352582,0.6410532809842029,0.7763773728363759,0.9993117281989281,0.6493594913081238,0.009001115244122948,0.9059056253506308,0.201785847678299,0.8780286259058097,0.5061032929508413,0.640466686200184,0.8812729874858312,0.8398709927290628,0.8242772629726915,0.596105561859104,0.6251529500122592,0.2717548880152456,0.8727927731053962,0.7015820698265454,0.47657659138970376,0.7059198710319556,0.9631690406440423,0.7282104508620195,0.9031244253326629,0.33289735566305745,0.9351662677880723,0.6797211921095672,0.6214201288691652,0.24957407106311713,0.17225514032368783,0.2812336582039261,0.7677926747128578,0.3138410480285938,0.28629624467141435,0.9182750918731954,0.2389502629303515,0.08951591096824552,0.4588438614616983,0.29267344374065707,0.002941931702578282,0.10557250706474175,0.8910494991938838,0.020673428439677233,0.05453924993877357,0.5528738567423801,0.41551113380357374,0.5775439533507853,0.11233270904357351,0.930027585421054,0.009082532167830948,0.23209200530513852,0.70827812031685,0.19510718795927784,0.2802563037924968,0.5927844444937036,0.3596509552095848,0.07168111340105954,0.7672116391995234,0.9417888743317553,0.8569680644630697,0.2539875809446621,0.3137397114304392,0.7294688558196718,0.9575271876988374,0.7756508875582335,0.776745139493443,0.8288110417606274,0.9963101833938215,0.012890064895008546,0.22757018955633823,0.16508959893671094,0.6545702917947294,0.9715890071671307,0.49799173718379164,0.16223701472915253,0.4484944164959912,0.2456490592047884,0.6745481124339647,0.7825225751033784,0.5197692571418906,0.651702795151081,0.978545469949617,0.67550461210044,0.4427130017870764,0.31955466957638046,0.5870639677901859,0.7518209323431024,0.6088065190787122,0.6739061424489001,0.5754747657220507,0.5605910358652877,0.5007263905233064,0.7712192898415138,0.0006896595902032843,0.7101562687083205,0.767893762301824,0.653452985151703,0.21926596938260512,0.42137993804613694,0.7095760295036384,0.7946513406947944,0.8677294153755248,0.812233006426661,0.7528384682635021,0.5290455672363357,0.4126596969896654,0.887604755360683,0.6242874571703405,0.416980863207181,0.25826153024945686,0.12599815470823938,0.5227754804896991,0.1396917509427107,0.2012717296229558,0.35584474029728685,0.5237454440999747,0.8284045173799901,0.2628533352645477,0.8939449102054413,0.7155528013810948,0.46297558074898326,0.2957503590283883,0.5816654926792664,0.24981525529561965,0.6599546549342905,0.2939376230915649,0.7102388433336206,0.6932924541890981,0.8244264494817577,0.3108283615570584,0.8546667485385253,0.055792834210011355,0.10923512226096399,0.8441998000740283,0.02597010629317409,0.7922458526492271,0.1353685900083592,0.9985464271961824,0.2688960405106535,0.24586450680419714,0.13064233539084147,0.6211022285269019,0.21498310206089766,0.5447373806997846,0.9097493937464538,0.805064076628631,0.7628737310696716,0.49616388416560264,0.09730359770218722,0.4373235964119413,0.6901757497764973,0.4347917108095003,0.22102572015227828,0.4332400487339969,0.3491643038681471,0.968333230017588,0.7255377408521992,0.4819961001075588,0.24014897353456344,0.152972539056341,0.7273716970140611,0.5709963860580032,0.9769829477789154,0.10037136743886288,0.30854351862902063,0.3762601075758496,0.22067971829532462,0.848930856912506,0.011687915192740483,0.7435119154323908,0.5160002899856,0.16931908903890802,0.7646203638385227,0.35891003465731863,0.563609603017361,0.5908763380136337,0.9673471990725822,0.5803520232871957,0.3310867903850825,0.2182741283707479,0.3490375798597576,0.9261252826404276,0.9163546632611888,0.6581845919776494,0.5402361820139532,0.2571338723614571,0.4833184323256601,0.2966833244999525,0.8168199477911136,0.4794778089467626,0.08840602339961712,0.03559720895478691,0.9463297020353596,0.5548032258785625,0.8530382595237858,0.026538912459493913,0.7014112999796771,0.9670455916346727,0.4765779630246365,0.3543712866177171,0.46936709126848086,0.5915056774099927,0.7633963939732133,0.1200151647889316,0.22862703201061496,0.9442415033720095,0.6681573569689774,0.0690507067112276,0.6121565095239343,0.6174178338274963,0.6718357706708447,0.2303813210896275,0.6579756378429218,0.5411265394759932,0.8610022264785189,0.004540410010962503,0.8453198545432277,0.5257906471917175,0.6154665664257908,0.6603287547387862,0.19280783117679712,0.2426403010508149,0.6368150663823651,0.5612058419053529,0.37893975661508406,0.6557868834312592,0.8870663854222764,0.49940878842942227,0.3425683981950436,0.8733533428271849,0.7254183301512689,0.42156529325721803,0.949415526535202,0.03890549143299693,0.8440174049451337,0.7614875358439659,0.3353982761823573,0.019605173141389987,0.4423553824811257,0.963613613715453,0.2968981943967719,0.890746535818481,0.20874871490408808,0.018482184059392948,0.06465503754479807,0.005236637466352612,0.07400195410067112,0.0032128054133422346,0.20910209351550302,0.06605843531185407,0.7598199593533901,0.575580933716396,0.6603221751526012,0.6243361396168714,0.2707628661852397,0.8895193521587934,0.05733796157019788,0.5948886801663253,0.009689147934041298,0.44091605304593573,0.561279144432,0.4999516214386597,0.7068720054689981,0.591444679108732,0.2708633186396632,0.6235970345197923,0.8588803797125426,0.7188468944905964,0.5916293444854859,0.6608273810088059,0.9913926088607965,0.11033856940940479,0.27133452655022694,0.17562785546522375,0.707734681284953,0.03899448357678259,0.7914596490519057,0.22432819430831508,0.31500894074459596,0.8781137445710059,0.6374388011811227,0.734971276760739,0.3838979765527235,0.6090002043633758,0.46396846969026084,0.33123466818294456,0.7022746374173483,0.7446722151653398,0.566710817051141,0.36485937350747255,0.33615015203013243,0.6176268667500469,0.4626931158922707,0.3229742446998951,0.4228819018248047,0.9399950625205844,0.11066072781045055,0.556633127493195,0.8155405430131666,0.13849951633436386,0.2964310160134822,0.27719895380346316,0.7722662210534779,0.8425587860703434,0.5836090762858035,0.9653135600806659,0.6404885038917509,0.1686817181544753,0.535111109803085,0.945475457172722,0.6223614526250183,0.5208651889949081,0.6277697979177679,0.5858599459728093,0.015349831214726217,0.07857704465116333,0.6853642295002145,0.6250440085939843,0.47379798844776744,0.7501411635050641,0.2968731222295109,0.3581764554276874,0.6115840818457734,0.6643220165923394,0.07242338737603227,0.46558172297047884,0.6874065426533,0.8465615086123104,0.3349639701236018,0.5436288758220151,0.5216330008586685,0.370282082985387,0.4302453316056136,0.7243567830229596,0.8378695783016059,0.0591141608711534,0.43615953084093784,0.9106192003451707,0.22082881074717609,0.3349110724460247,0.002411094440631034,0.9591489533959006,0.17117178836574354,0.5116064396013746,0.25115848707495747,0.1563705414098271,0.5537497856495608,0.8450936228494081,0.8780151285202542,0.838699003098323,0.5113397666377191,0.44312190247663885,0.6537193737081843,0.780134737022752,0.41764000828642556,0.40825370140567596,0.7492007734969246,0.6565582581234062,0.3877729162611765,0.9601178780674766,0.1842491245029867,0.8271758966603953,0.0847766673715118,0.7244706555193825,0.9689553107760454,0.4603453860574993,0.550751170121415,0.6305968864104834,0.8008578256066239,0.009673864106408026,0.24480858285775664,0.5506816224721469,0.11069448604329368,0.8502186612692202,0.27329311199556905,0.9341237951616521,0.25733408991457907,0.9283779054083032,0.1039961366419968,0.352630198096193,0.7841135202819793,0.7782775301719591,0.7896438137317883,0.22987277638070136,0.8690893844531271,0.12740375303663143,0.5506370607837499,0.9181569482073171,0.6388640668882446,0.6293623407955287,0.9176186124218215,0.27175811862733856,0.0897412537357769,0.5211839217946626,0.2531904417509767,0.6684821994909802,0.4656667921683626,0.11961989695039343,0.1702443492291188,0.6027679801956325,0.9436225037184027,0.8489956357801185,0.42405895829843976,0.4439678682774768,0.6739640575968604,0.646243503577137,0.30365476003814074,0.6106963727938983,0.6772310561297377,0.515290624378437,0.37973815408340084,0.8938293319795574,0.599089548465287,0.6335230201029847,0.7934093269512437,0.6905796474494221,0.8056460910384322,0.4604048612630216,0.497718546606843,0.45471910305899566,0.78854567912899,0.7969191655647256,0.0288430945695779,0.029660657962738757,0.3323287781074391,0.06605532366418787,0.8003368930612378,0.5839265150402599,0.7113158193938554,0.40400372907358384,0.4052887208272058,0.13327827566389505,0.5130173879947779,0.8589404512360428,0.5072472871798017,0.6190897354094362,0.3863904614424347,0.8984087803781053,0.3015336445532253,0.12066368147112572,0.11920479267098938,0.4539818994127027,0.9663220269002253,0.5596745195741895,0.38893589387739436,0.6427714981835242,0.9045308879035641,0.7204323101255343,0.3357226054742912,0.43222726484582585,0.809990088718231,0.347856743150573,0.457948607523905,0.7234296672153866,0.4789850376276157,0.1231449013385797,0.14539363369992553,0.6457251598713605,0.2464471256034686,0.6948002454903355,0.8727406851207029,0.15750661344259687,0.8638473771466053,0.5741310026507556,0.9819876386168451,0.8846677355417503,0.2883951509153251,0.899216904101577,0.9550625776617125,0.6767418011322384,0.8576232985522314,0.9127055437620475,0.9958502305359795,0.11037691978780595,0.7510712753146709,0.17886106242865574,0.3886446750043113,0.5965616355138712,0.9859604393814747,0.5845765273449965,0.8256231737114215,0.7612077774661299,0.8403018219170646,0.9025157255860079,0.49871751827371336,0.4992951385054527,0.3656356876107272,0.31810397991232087,0.4641274255214527,0.7171717891010136,0.6904701076505706,0.17151786180316386,0.22647276008972184,0.8756520033357809,0.9009096110525114,0.8904041494889301,0.9506705157549726,0.38058629433103186,0.9855261380100309,0.858742099954604,0.14734202459546952,0.6389833498604631,0.4391546740675556,0.6958967783895238,0.45634496965210136,0.6852037374516031,0.6208997598746546,0.7573383670560379,0.020445776902876522,0.11739803120619197,0.14938214484447832,0.1624112091751828,0.08826409575281624,0.858077353767656,0.616172991999415,0.8311212625125701,0.8773894302449261,0.19007144025469902,0.29399686998934915,0.823758251745216,0.6991879427918646,0.842620190383288,0.503887534786571,0.6916683074693877,0.6236250123984193,0.8987903228809921,0.7019590974937338,0.7777265933325415,0.6441424187989782,0.7428764632648042,0.3464949076932706,0.6219435050409172,0.6005769735870126,0.8977699977487699,0.6541753362340612,0.03257153554124992,0.02076035789168773,0.6131034442193091,0.2773113561716971,0.9312411685567101,0.883937939735522,0.9677232264984632,0.993767838049769,0.08855621779507383,0.8669742347188927,0.38511364745290266,0.5295973072422246,0.8918476345475619,0.8909152976867254,0.49483154111924343,0.29841262676468494]}
},{}],82:[function(require,module,exports){
module.exports={"sigma":[14.672747505232863,8.679279351043743,1.8603819818365164,11.64880715001452,14.582920491566039,12.178092259491597,11.389801486693539,1.644698215257776,8.193151908788728,15.8843079868445,13.87926063988569,6.265646400912557,5.5540275896520175,13.745595265125834,6.108146905499989,11.852626804527278,3.865788052493442,15.19262879686934,4.5653692375725985,15.858572758696369,4.435130339612683,3.601244580433698,2.5844137911450815,4.2964102825464545,7.136095667902955,19.632274982389475,1.5035474997756326,3.8361629702255495,11.667628910095779,16.643655499058653,3.891282070927793,2.469189604315929,1.7151809982125643,19.140257530768565,16.010160411761568,2.570103723512416,5.7450146161371185,5.711755286697833,6.686031777510646,5.873671693005882,15.231606385710318,15.820660686597968,0.292472573221092,16.028365450945383,10.039797254026293,8.881250781203388,15.273723942641041,2.79540346564223,17.10511066731135,4.731384532060141,8.94239765467383,5.574133804108357,16.323102040210955,7.259656029261414,7.617296044028352,9.035186353669008,0.8741979731804994,16.20444629938735,6.93785054789144,14.348084569120845,13.094364768763116,12.531526134762995,17.157414174326444,10.271864142276188,17.67168890619569,1.6948644649297684,11.115625037741225,13.481207521947947,1.5977600498854683,19.29564760914534,11.389882911225012,4.905894710932217,14.134200561294104,13.849449180416693,2.730622682264241,3.218156457513235,7.704987763460567,18.449095466769137,8.467022840092646,7.726418309198144,9.850964620362298,13.790075859931203,7.532659690823316,7.794467786448287,0.8531829522948309,14.169162765774157,3.2265400356974405,13.381124429635292,13.229917160994255,19.928972042969356,17.386982942411933,15.104891424133093,11.789033949038167,3.061636411896651,10.354517899735786,11.030391474404126,8.616468093874904,19.723647894248884,1.6842180120857986,12.888940120069945,4.700999662454364,8.140022310615326,5.131722811530288,19.976486549723447,9.804357420889719,4.986432530953522,3.608427605304021,11.154064338706636,10.801104793034263,3.6971164049757865,17.55299323797488,1.8852647548311108,10.716738274167747,11.327092694580285,1.6089498207007225,6.157283948112586,2.3019168249478072,0.8472350963739084,13.421164658569964,6.711413723515043,15.991353360427816,5.948218123666655,3.0625551708059007,3.0353724183273467,13.339560809676296,4.655713077281427,3.2710667274338467,7.175908163575366,14.571150769171318,14.869619763684646,14.463385341449388,17.462751409645637,12.006205388552708,8.334672339410748,18.809170919978303,13.837587418091877,1.8669214638387688,11.462611654506585,9.935110630441969,8.96173908061305,10.787514890402395,15.980715109928575,3.3144936245484358,14.763358409349404,17.33536623168955,10.456690102220092,17.182299385634835,17.596220763016586,17.026448878466436,14.872317120065382,19.45287128566841,15.17188670364642,12.502581721904757,14.500147840108006,11.08309894241636,9.28190376246822,15.921213718455958,14.09302573946228,2.443938388285556,4.350603918661653,14.02965185704371,11.138295633224802,18.555678131368612,10.250649959270927,4.7626641398482406,0.11127078226434328,5.524161149910394,15.336818917188836,12.109565072480294,9.918718365383853,12.67792472719654,6.259506983208625,16.721805691422766,18.279122087107037,16.177836491398313,13.40860252073127,8.26599793112463,7.0687957609883645,4.609236205662639,10.424715959435172,6.890594799394201,11.144135878951946,9.755464200419413,1.3068615017104968,0.8067270259059844,10.223342002111288,6.876735314434761,13.640474066094782,17.97028547160076,14.515028426158295,3.7060702190805106,13.912130060187229,16.3258660791612,8.7592398516973,15.338335208880697,6.8153065789885625,12.430145896850476,13.209203630455892,2.4751501179808244,8.201611129280145,9.867021164856219,7.191959535868304,1.6048688042673742,14.290352823731162,19.414453185692516,17.449398489474003,3.183422870459598,19.656846713915066,4.850290119368679,6.335933549580548,1.181697456603099,2.763948103161562,0.6290794975692648,6.763584651447032,16.321032800910828,14.849510877738968,6.605831154008102,10.263138359162216,11.597923168509222,18.249975950912347,2.61224912946167,13.14369944710688,1.2179769652034977,3.4035335892004337,16.511886138030828,6.166198703871544,14.794243294265357,16.3632509859106,4.421854752110317,18.61828727408337,6.3461961219588625,2.385279961288229,5.464344650249928,8.162644548454509,4.095249464140354,10.278495662193258,5.798149980350975,14.015009062273336,2.868041571391422,16.591153905464722,18.35308388345481,4.19564990351752,1.0384339104620155,9.160219804913915,5.663456875202257,1.6612755584252836,17.61751168262023,0.9939903951964268,1.954493605265566,15.405998473513517,15.833841233972045,10.748578985205475,15.215110320094238,11.993874501287692,6.427345466662553,7.5763721325319455,0.5366673823783996,11.816138084312339,10.21384094155733,8.388942653589812,12.005727532242517,5.580673745328815,5.4238410109924295,11.529439973945713,2.240085305851416,15.257155180899451,5.3903291981406465,19.732534775247686,10.390376549416978,1.0908945259451697,7.965423193816887,2.7614856728323556,4.803686393285722,18.62670658728945,14.333152843438498,17.81931822332005,6.7178263249584935,2.5391190919652873,4.1653116641748245,15.684216919679063,16.432403305833738,12.845373122712536,11.776905547077611,3.461327040411688,10.029430524432188,9.050280784624704,19.640653876297694,18.460589459574457,11.664078003494684,12.220632194257451,11.328904897779095,13.571480168303577,11.05981622942564,4.096947021353938,9.264164046975768,19.355188965481748,4.605821418174889,8.215414540632885,2.7804741944641664,6.607347253555784,3.6074229840378536,0.540983777251629,4.4672851960229165,6.727974190779729,11.825677128267206,3.211411786024625,9.58749265406793,6.456349651162867,2.626396966261475,0.8973937703194235,0.7315407193731094,0.856924825175831,0.4194299542282076,15.115276606635595,10.38022229734838,4.313537314295401,15.775239017057983,12.472239263950101,2.9122169149183863,13.160247663802558,3.2342092562207636,15.82410220563288,0.5315097068995112,17.551672952868998,7.685833345784361,16.680627461708998,7.234898867928465,12.087082472231616,16.394288260634866,4.275981101834958,17.05293082829934,3.3441781408089843,9.639501185686763,12.249208415115556,17.78891466808334,1.367473156030088,7.771364867753805,5.971056921271751,0.8377365552025706,2.7666835976857396,12.330230637827801,0.888812886509287,12.67620739145347,4.112453964884488,14.958047934375053,6.7776751723280615,8.41588107667488,9.750460609773711,8.220611685424938,14.90762256397061,11.033378123689829,18.603788457682967,18.932323523056326,1.5188663953248804,15.560986018152065,15.081427849112963,8.007131741703223,19.09070183788466,15.376838420498942,4.601447135974124,11.790755182908326,7.29289421155376,5.4836093263695584,3.1977732124638436,14.520195765080546,6.075321537122091,16.35312356293074,4.260800369885112,0.5400909784735575,7.190851063647412,8.78991935278476,17.97684833714338,0.3756723950660179,17.7574680650023,15.022814695791858,1.5246058973656007,15.579551183831928,14.564913181288702,1.9790223108175597,0.5643368919966685,1.4709014385206398,1.50959191933548,13.134337405929429,19.897619957686572,2.6664644358469314,11.351036074900467,14.95120604261492,0.3823162681681902,14.465893494812345,14.778720392766878,2.8169587301871957,9.635157245770095,10.147643150415583,14.226547586178668,13.87767059729882,15.022910957675952,17.02355874696879,16.885503102907048,4.850765298150623,19.771672574777888,7.950356299069408,15.916546960381407,14.75593958880982,14.775023219919948,6.381469716516919,17.8078738231777,18.970002425003724,9.75260724850151,7.596500288895487,15.775592010334085,8.230244420251935,5.870734074022126,11.23701171334822,16.436051540418703,18.662808953855453,1.1134800401514466,17.972478386922294,0.306334743793526,3.213314459661256,10.4072309842388,16.27773192184405,11.830083392919747,3.6935247652179903,11.851552586618626,3.2283821926265777,10.898122937138748,8.412245840671426,18.85670679170324,18.769457567473328,2.9292266671734213,10.695653065319576,17.050058794845533,17.517937630891545,10.977942755968172,13.524569070823716,2.7545448763909564,16.332390028591114,18.95207654160942,5.280486834936533,9.004934501586712,19.554508170339474,7.820750916993311,11.007013699493076,5.41722126876564,5.702813046202633,15.808098485184253,16.713202189826546,3.7694656400019655,1.7309407692290613,2.1995424597076907,8.805513864072285,7.966037217739057,17.376555036269483,17.286427342328714,17.556095947206547,18.218177334524732,3.6154458313523508,3.3621648462922726,12.201688156368938,11.631215285068048,9.321010769726893,17.93751371849289,1.8832885874520322,17.372960861788975,2.0484374825436102,2.2590115575869962,6.724692330637954,7.677539268818063,10.33919014578216,18.792066563051396,12.440504500223799,3.2786201986548447,1.2446775118041309,7.210330860282053,10.9962521498288,0.07355216844011636,13.761487763363803,4.873790556747961,11.200007004784887,8.547433371334261,12.545864619513644,3.3158603309445844,13.063745472577676,11.791598479144888,16.837725594262697,15.557767329771345,17.401775731371735,13.684188382632199,4.670686682059011,2.719076649736527,15.936583761195756,19.27848226118462,0.20888813902271153,1.6467413988271495,10.272242080958819,3.2414108615165826,19.344726793114077,15.973560820864039,2.31465639331367,3.5725701163552337,3.0207812072531626,14.722759206338356,4.946877908077596,16.68089143754955,5.456097227038961,9.996863852299729,18.04482448124302,19.132894281327886,11.109862266512614,10.040077927259334,10.732124211319425,11.804424576223141,1.0051636293614274,4.574248853122804,13.565325082264433,1.5880730024863876,1.8464883001581223,11.318130479820665,12.353203126740064,3.7792722501248788,14.594747638765417,9.653677346406067,14.13802995730733,11.606022695272644,9.345376517125636,19.64061666836084,17.260142896114257,19.313997969573734,13.869151289520861,7.485250045764795,19.11468060094218,10.641412347403229,4.215074121484088,3.049106707086753,13.925519262128251,14.48854746777263,6.3570906324775756,2.208038513438071,15.029341209366972,1.0514450907579542,14.786275713199974,1.113275518290382,5.260592713317349,18.70935669364411,9.77430440073325,6.126234825830426,3.5783107162346894,19.547835558930323,16.712673842542788,10.594586975925765,2.4473271120376516,0.9641459039327227,9.044232085195723,0.8134315313607043,18.900519245452646,8.935848009678512,12.46043393880203,12.298311808039028,3.9150830287308436,13.098757618525836,17.81180918542369,3.4620776487596983,7.883616701852905,13.72131287618024,11.477085946072215,2.7426175160043,16.12241006220692,17.684748517542992,14.698678722381615,5.315054998102315,15.327927750411794,10.282119820498492,19.04613777257606,0.36283025603329744,0.11974563557918039,11.038007317935072,14.270195658551309,17.547245751592744,9.061435673537751,6.091375357919269,13.142485550183949,15.435415894192165,15.355101428074821,11.817948033969392,3.4551594801895913,11.671483571948794,7.17670392255866,13.495549534063343,18.15374769754927,0.34723644858227765,3.6106856543663834,19.593754992458603,19.506041005581647,14.950221197215683,1.1055681078300772,11.718671299849746,18.166390737447095,13.318562973230566,7.8666091199293,11.049022748316952,0.7255065799655602,12.329538649097458,3.2912800686165555,7.630689852912749,9.497081708439907,14.164607626985095,0.2268338235914813,5.505733715803793,13.991273843511575,3.21770851186713,13.55474495096956,12.841764457500489,16.969739282245612,3.8499096792932264,8.11567628553799,15.753799989246708,0.09795600385867687,16.627229513117125,2.7537516056315425,7.764080455963778,1.0136377829438459,15.538510556297194,14.599664616102146,7.633524384239712,12.138359660708971,11.535467784678243,13.618626763633138,19.141433541692045,9.297189770602756,15.469167500958921,0.6513729550433034,4.716262544539882,9.157274724581681,8.867445366924077,3.759312362611271,13.581752485433118,7.209024531709494,16.67509163140008,5.970805131041885,4.801748228987774,14.348264281903838,5.640961623911496,18.950079357175923,2.676380191491541,10.750187440701971,18.7614593266763,9.549628072052974,9.658181080305335,6.699978716594002,2.8051734181219157,7.92834227604907,12.828290879046115,18.024786093738285,10.01076709371699,18.120485423036897,13.789771351978356,13.325914448438002,18.662001938093802,7.7313083612884625,9.483711392311168,19.447086104685724,18.17558390520078,19.62052942666059,17.281938778028206,10.966828654888694,9.004270606232243,6.373260925207482,4.361253071335196,12.454115788335605,1.7071396629936197,8.336871025581555,11.37519276615139,5.046104889990604,18.434842635192446,18.366353140711315,14.951928560002896,8.58853556624862,18.51983054591848,16.509889671193104,16.279324466326536,1.589717037763445,6.730156416351045,4.3372334043886696,12.284762093389148,16.013579587541564,2.1286795120107938,15.127309200101573,7.028275164046014,2.662002706312583,2.2865052313021828,0.35861220962704277,9.881804525575069,16.395108358389436,10.822030225802193,17.083456649549966,14.683760316423168,12.16619811625602,11.286574814924357,6.140843660106645,18.425802346971505,18.655165389622688,17.90696519337246,2.187321184905757,10.947019346074276,17.76371220106516,9.091331227675688,15.023527139052927,14.185621328191713,16.154602552969635,16.02165973734874,9.963795888822172,17.788942105538148,0.7907293045551445,12.06263760601168,0.06993163309927386,15.749933942648973,4.49204723935805,1.34385045715125,0.14030732584187966,12.682887156032763,16.499255779363917,0.7663419518213566,11.140860207520639,18.617114650429638,9.11044020395288,3.2915690262014596,8.648921937768929,13.923433268994758,16.98614532644612,8.909784099390286,6.840064791023299,11.423292046293362,1.9185975400506372,11.585004745647435,1.2500967552214037,4.070326677364942,19.56512971767335,12.258647797938611,3.1850604575372277,14.90339386902432,17.070061538320786,13.380676010788232,2.9735623423327073,9.403357590859613,2.3010602595279828,11.4110145538735,7.547698464541068,19.24370904368825,0.5755485523613624,17.531759996647462,7.065271532942323,3.065807592614651,13.737285817569575,15.298666668358685,16.745831561276468,15.044046840456886,12.473924129702855,18.59466205638761,16.63949765571179,10.021370612885088,2.292493312582886,19.237539441137606,6.051481593666614,6.272354064649126,14.572537241696768,0.762690427622088,10.07226201107185,18.932317151287208,15.850546733104585,8.544195071824792,6.806664782935057,6.3436237980999,6.816071919499986,2.6311274199056367,19.876888133051345,1.1716299730041513,4.79989129877219,5.489088393510406,8.769134824115685,4.870177448568853,6.911173234060457,9.967878573582576,5.197536688906839,3.587371344826824,9.92868508083681,12.933104492054962,10.901043560356296,16.474649735061163,2.4992910700015214,5.712366668900799,7.36437165504499,19.684543702027124,18.197269984319774,7.367016825167538,16.20493117406224,6.243180502738697,18.51088743245643,19.511015050999827,13.763527967742109,9.648560780295075,4.907562309642013,19.72295085583923,5.687652857160157,16.036119880218706,0.0047737075297416,14.256233368575062,14.809188167020135,19.756466712934134,8.111291558838989,19.62230445755853,5.978116352735743,13.337171655232698,4.655567814376704,2.3524473974860083,0.5320677344387814,11.013889030775154,2.5809673131906496,2.1975476948598827,8.693400798598848,16.13954599558136,6.731213463254164,1.5749823295955734,10.941854684049769,17.469191500639365,6.296926809108343,5.285616334559724,11.018311767715048,1.7566518276361753,13.919889663951338,11.745536336505502,10.462538610287972,6.5165080977522205,6.201266912985077,13.635497656308942,0.9485062711638648,10.283737149095007,2.628300171090978,12.246398981477032,10.351563280471003,16.343127770449563,4.7224527455804965,16.400838073837352,12.487136656106435,1.3965872630838572,19.18295612093345,2.127869761290091,18.39060507323098,10.489988989325045,2.2347724813623593,7.695271703596465,7.683326134774142,7.752337222336294,4.881897872171637,1.6652431215251307,9.974789781326985,1.4766589594797974,13.204549440707329,4.196558307657892,2.0753736688361935,18.064822889612163,3.7511956427386606,9.079916990245982,4.006069797886558,19.482947295153945,12.658867845031772,4.264374153952066,10.475422047494124,16.62694986050194,3.079701033656419,17.432058101620676,17.79887949060315,10.189921707147604,0.2301898530401747,15.99006154669068,12.117758860987573,19.633550872130378,9.252696844790034,5.75259469324044,2.103401375187337,16.644181949772722,10.875467636649914,1.8077458739092656,10.023573509223196,3.500421414167798,4.347854197548147,2.1810604370489584,17.897372502898378,2.3221793477622477,9.700780835462268,16.21510015834484,14.919519802520096,16.97229781625176,16.37141518637959,11.007623221100635,13.223332783029171,1.2211770957894563,14.48900153041112,2.226148471164038,3.557889242060326,5.02781553885284,3.8772751489098978,8.967431372133156,10.009356622892746,10.77147754401,17.141267164229443,10.70363229369752,5.805454967538539,15.118792600455468,13.764993675625865,3.7535390128047785,13.414291663515453,19.08790921091462,14.561345279651157,14.996350796296802,13.449969881779694,5.337045048084894,5.883024336789129,7.820822431591372,11.007116895996557,17.156286200373255,17.37084799144416,1.1727136435491259,8.414298690644113,1.915393674198751,4.303510422082364,10.148132558989694,15.005298998460308,18.893238210137667,17.924145159992378,4.588262988886971,7.739489747803661,7.740809964058246,19.805113227587576,11.973728821651397,19.19606944900242,8.75255330565527,1.9501818108263924,4.380558595093551,5.616024422563846,1.6549661454997056,1.1198794303604265,7.765144419394123,1.6384039387194616,4.16153939170361,10.141337749659623,5.722849815620954,9.214839795740236,0.7381877434796857,14.482639670955102,11.005932047411665,11.318080547688023,7.94987433220216,8.87315859837964,6.117748673603689,2.3939082955840663,5.437650206600018,16.617894119492984,16.248548037727836,9.436436060497666,5.495986938929001,7.313558123743551,16.608630689998346,10.291372836634846,15.395122222114047,18.426907903785583,0.400891672854784,8.573456990051685,10.834526187477964,9.50682473735494,6.750521549694279,12.681445662567267,10.700928247790586,0.765331095083428,4.627942478467872,14.633161735286912,0.8833089660018079,16.478536003643924,0.5063844437138298,9.050553890156516,11.9522598978279,14.49093959894185,9.372302035075716,18.866593907567058,18.989880045825135,16.089424256331775,13.567970533467722,19.10367604884463,0.5715543298779302,17.766561707124083,9.997398705891714,13.07070271530604,16.80845677331622,7.828785346811897,4.029480683838971,11.560997143166523,2.542874707342273,12.126465906562132,3.6765332195175704,8.34301401213732,14.137192603157388],"expected":[10.061574926820873,13.80735182017781,3.080531252759896,8.493406856254719,6.986322313107392,31.453772071606974,13.514598189633235,1.435582521275158,12.107715599029202,9.17222353824149,14.68278955111885,2.2650468970968993,8.678827647646784,14.589146057119317,9.79376800053283,15.897676849807675,3.2372817937653564,28.291828026854372,9.606044481034779,53.84956397180844,0.37210069933291445,2.854194822360398,1.1769764560138483,2.933371135716092,6.20049203212482,15.997691187647252,3.0061581940970217,7.579581589372045,21.551414788454494,18.05727520705924,0.15692838561743194,4.381186339574115,1.2078907240031473,14.320928154118244,22.340859632308906,3.453585155609905,10.025801158650323,5.407595875293937,9.975029155181744,8.60758619588896,18.181052928463092,10.333689800879105,0.6431963349910913,28.73903546318674,10.064232366850874,8.912272336482166,16.58026650770755,2.9320916120137333,31.039973040852388,3.513239237104551,3.2494649038539776,8.866237487047968,19.068058884302662,14.455371355668735,7.130114326256313,6.657802206934535,2.0943941538219613,23.144190068861874,2.1987686540068023,23.271251671577076,3.1221841668965715,11.869378566331697,7.069334167318064,10.352343179101943,35.650630743222806,0.7028243030271748,7.623551825208697,16.30844919217345,3.3678057744292635,38.705612174564976,19.02951616469151,3.021264718614241,13.577031079276356,2.6334817234925905,5.360557660880028,1.8531626795412153,6.181136692789402,16.068766594975887,7.534494555523808,9.38266097174111,10.500666886357243,10.64226840869915,13.01154497634866,15.178623686076968,2.0517270916319723,12.948978721710475,4.492275138821288,16.679453189002253,7.714439240505666,37.097845410300955,18.11855824678448,14.229634972409757,11.472803900373489,4.940647499896678,15.169814841719809,7.815087114591997,13.03539167580795,15.910901730595196,2.4558554644607007,12.734219489684818,7.742485731124277,7.737586093145168,6.3562610638944905,18.039572372715803,18.78968720803226,11.122605497396922,2.342494810675297,14.8817363411279,11.67232530741708,2.5507429044611474,19.50616939724248,2.388226054190367,25.685105620663055,10.015397544120745,1.4574015664020872,8.933845631734986,1.3407958476001038,1.6514464296657179,15.653684547369423,9.171989751223599,19.251776300976807,4.546791824251977,7.272784015247563,2.79045103344849,26.078848334548248,8.390587379069038,2.4377866920282987,3.310977591788388,51.20761253110456,21.059533235098957,21.14925432761874,36.157491689948145,13.196564100805993,12.777444541980474,39.23943158047967,15.518537184229256,1.5566222712265003,15.357366570153207,12.245174046652487,11.635487942535006,22.75589499324809,24.363801277447564,1.828802729621036,2.2097392361102015,7.0379250486931655,16.35209681713776,7.943965552279882,44.18647065871174,22.389092367749186,15.864555847003675,30.330173855484645,32.20151452356288,15.604449318192735,15.144170493592023,4.371042537219631,6.955862744942347,9.010272146946429,32.23442414283576,5.3871594475644855,5.175654923970625,10.00577340918853,24.631643135724783,17.69035978915871,2.957095666036788,3.9006839686838677,0.1250573652044949,9.214649111856108,11.142599229452669,29.006168254849502,17.682629138896594,13.748926824252042,7.235260607632475,2.868129413012979,11.068976925919339,18.721790961909875,17.51282644320023,1.3688322200666583,20.947853953492018,6.715938472568375,15.149325845169779,8.187050913618622,17.173042815375187,7.3994788759944665,1.957632925164149,1.3760638652873385,12.355616661395947,11.364448387811999,6.2901775711713865,20.41345593581375,16.66872628308632,1.988828980629382,18.936296576700446,16.858115324285574,15.389233953635172,18.07310022924011,5.118585734433129,24.2520960273797,22.21087381957868,6.02688900906867,6.082600819979647,11.026645817135847,16.54266937017218,1.3558555645960257,13.665624816133633,42.08451356996151,15.422689325794938,7.180913299549949,3.4888628694116073,3.4072700005589915,9.209649121432532,1.3057067844816967,3.957358358664326,0.2392863181082752,14.490131453058108,22.631150975062138,16.7396883545559,9.904919051282786,17.038681568076058,7.936650360025423,15.287968800169534,4.438145603616409,11.240941219634996,0.6039646973737577,4.192908156146025,18.76747451027317,14.377311232786932,22.400510378885183,37.65003008407332,6.6887378535155815,27.94094672859718,4.015417385837802,0.9418571192494427,6.792197414553889,1.3770360881539487,5.89338418687275,7.638718427108178,5.51383300524865,9.100707293143415,1.9173477853937269,10.376676736411486,29.812031162972378,4.079681556551723,0.5243882760116734,3.5018573937877693,5.807194513022991,0.8364191385400477,31.715276711498454,1.4584305428275202,3.4777788732122312,6.923712545763309,10.492802162450278,22.06032755501686,25.958699981078208,9.29177563748902,2.7246995524929827,11.282856762784002,0.8363029984798488,14.455795072558526,8.099666908128548,12.584116617401449,0.8359711483262247,3.583766443616315,1.5380829147335837,18.854805417881476,2.8178473460589317,9.312746209106736,5.65605902339517,26.896692160705964,12.491491287813645,0.6466634388698044,12.503963005101733,5.516896117182465,3.694357469967782,12.990151633236193,8.390669660108173,9.358021809895483,11.45662054575516,5.503642587613352,4.912177941609132,25.75607252755354,13.867004681871528,24.376539351434857,4.3795990598274805,3.0472650793213965,5.870256380447256,7.579771089391013,46.753352936010934,0.7095625255784256,28.98258817871271,6.21763122494008,17.04054309591382,16.210475676005046,7.940084260703696,4.9165970011832725,6.882930320508836,32.26052683176332,14.927657875923012,13.138937593724927,0.9707669228261122,4.910479904630607,8.628440706438123,0.17805336833200996,1.0747806320718858,8.06710535631247,9.34086312830149,5.929285390417012,16.09033662451145,12.17630485587955,4.361520178025144,1.8775357471773642,0.20147410901959434,1.9936836965845552,0.6392014072701513,11.304806514013675,16.59939104185047,5.6916909783287055,23.13097628347048,17.6019062706803,2.858435836241759,7.4801958496157885,4.431198816728124,9.96756945581712,0.4121772985928973,9.29952784254516,5.3437295965105305,35.098965116467696,6.574017641402302,11.507859143743804,41.071108622410954,10.907212090437955,20.82593209520599,4.794939618431351,16.8189387367862,18.613305158784733,12.907017396000793,0.815706700077046,3.8395452279865725,8.124257160688538,0.26565369973720593,5.327181438696194,18.616962331412914,1.2314358618337484,18.857702013956168,7.9697928689691215,7.5103668931738055,3.6316775626675333,9.576169875386336,28.689114025230275,5.05887271700388,15.73334114590831,17.063687128421684,23.368575165605723,13.469089245443032,3.7005325621858587,14.11741718361324,14.815829835306918,10.679461691920737,16.46255330346729,31.34421203040672,4.673367592846067,12.82487631044327,4.931602301411742,10.053796195138919,2.8989161600930147,17.506560961638286,10.67255793634205,21.126256045587272,2.196729502147593,0.736231397886459,10.879945559845254,9.071185523466138,8.589701207909213,0.6946968033056079,20.113955648036306,47.48448102374822,2.160559082214136,16.18024002998645,14.231860903425925,1.2289781872542307,0.663776404367333,1.9729509225932196,0.6768442394766012,7.214528726357834,16.749506239304917,2.9355905894426817,20.999804283279257,12.895997219336042,0.8642957048213424,15.047646540924697,33.00311331815113,4.1846996068420985,16.16066318182055,4.7989002008740185,5.825904635214953,26.631673288227745,42.81687793348258,10.552274341649092,20.19158592929066,11.666019702260241,14.008120681141305,12.01225963440586,14.321327518598283,6.172044972104776,40.9188089607647,11.79737985179734,14.763980697137377,21.836117505668312,16.28608672082826,6.321784027204754,8.175694530035456,27.186214418147244,2.0629956110651335,14.413941047792036,25.072300868946858,28.84881974948986,2.4026729220667593,11.151571873205159,0.11398360635336731,6.230473762955489,12.176204561604596,23.034720903373756,12.538086005060197,0.5339160587600403,26.953035940836855,3.587793933417798,4.247014771177245,7.423899228703309,6.640156861510296,39.484863105088685,1.7590302738748056,11.972483775696634,27.630976426723198,6.354549843618698,6.665364232504038,13.291629685239464,1.115356653384988,8.118696175999661,18.855308458956166,4.462791588777217,18.915176064532588,30.375725178021714,14.918030407275156,8.988216398305113,2.5595664413114205,5.2088405187657045,27.766323588212945,7.4366120489405185,4.6195908123171545,0.15319566615987293,3.4915358438882147,18.74196290834096,2.785902673660458,15.47700815835704,17.639140864090443,41.58643080591677,7.0849767949408164,3.656502690052654,2.7570416584564477,34.22020465048184,4.927676785929427,11.156068005128786,8.300736119105977,3.648564090023019,31.825923890238176,5.424681373253553,2.5334499575095486,7.580816562556091,8.010023669002926,19.576424029687004,23.780490365696668,14.813598641790232,7.456127911991571,0.665999757890018,6.4149795599611625,10.287350023874167,0.04566228664331104,28.373065311108046,15.365812559140005,6.185392311268205,8.284899025525853,8.393922665128304,6.769081362539717,4.76487287768804,11.689711907182188,3.090680424257227,37.56722687913025,26.09536617881008,11.28712027198152,3.0619650481615626,2.2298633830026278,34.89522091809344,22.969354209816053,0.10086874242898897,2.8550148169263054,7.807073141804345,1.8272829711697627,31.21157415688802,17.023384538221997,1.8333154246701138,2.341839907316138,5.710353451711874,24.142038334208557,3.279702107153228,32.40225150662414,4.92616740403907,5.668157393049747,18.58593400682383,48.482635978590416,12.117880754828722,11.345742064376283,15.442922151107638,5.982782504315396,0.6387414187111583,2.267937182426565,47.2754620347374,3.0208586997840654,3.9427042988793333,20.478376300515297,3.6834826664596307,8.248062182304643,13.540482482240442,11.485182925313056,12.489648551082622,0.3538605988406148,12.103283130115944,27.317304992631527,32.34282405477513,44.24386990727517,4.68062267110418,2.6556707456564075,20.14936984351256,12.420302920671572,3.082292038027956,0.6899177805017107,9.876200662940112,13.07039311655195,10.156881687281999,3.124303268742862,5.58847165617738,1.7097673004340816,3.480698518126971,0.10480243392983289,11.595469138695014,19.768434125081264,10.503565947014646,11.534734622924411,0.4943577509967415,23.549807333581352,31.252892542931324,18.0685987839471,2.5476942622654093,1.3402467584484115,9.947114215038278,0.9027139802413774,11.5258546407435,4.491338929069731,4.127092705414989,14.738752348124322,1.0509215645531205,33.21581977594057,11.874316170292355,1.6095650043818428,7.928961306235669,29.913844294542848,12.331915200082378,0.9147270551061172,28.882616507140675,27.653148311082617,16.843131839273592,7.9985551851514325,15.850423919304633,10.748228880842976,29.44142180577306,0.4312651405312094,0.17154498129416482,13.865413771694556,2.993034489550303,16.302633831724147,11.743070973315763,6.454226094077765,20.87527893934582,10.735355297557907,20.3657613120982,21.112382057979218,3.1159786499722455,22.418968249646344,6.301290553825101,24.372779221700167,13.961757634381609,0.11216892668344845,6.0164636267187745,17.02612455582325,25.342857448257732,35.78162430123524,1.3576337241622307,13.987936992111921,9.63827709820412,23.307739888847184,16.189928605984974,22.10458594780749,0.8178910257231023,6.894348937552281,1.7203954644689774,11.889318592190252,7.1544282289123915,9.30972804415529,0.17841519722993093,6.6268877057011055,13.962560715363672,3.7925251010064147,7.82246722985505,29.93831945201899,25.16376899278771,7.340117290036999,2.146532377048514,50.534147232335975,0.08112715400337651,4.488777442912766,3.1180471084061208,10.877714694605658,2.71857832545899,8.373974586228833,29.38846954557339,7.404926943741104,16.11965460038646,19.56384091986012,19.24871549779246,16.219288001600123,3.159327964846965,18.43434258986621,1.3050910739037136,9.666402992401883,24.395936712745357,16.93818290161195,13.339330168361576,15.761817452860809,4.59857040010858,22.945322062115363,11.30916032775495,10.35472783855706,33.41775355452628,1.6159541262076442,41.1013185327953,3.150290745357497,25.49876076841228,7.446937348422145,10.706661191147264,17.88367615438988,7.805786264951945,2.0687693856345204,4.290350126880587,10.279508672037053,24.89961784404106,25.323127391207837,22.34386022940861,18.2285243298989,5.854883094798061,12.877307705713264,3.831934002688007,5.288884309395472,44.311266762433945,20.54248030983007,14.89343378882595,21.35586647364988,8.026070371574992,4.8574006156531855,6.022987169006674,8.521265150687807,14.448334235415828,1.9223885759854784,14.079659536738703,9.540291464055613,15.140719528232923,18.299872312272615,17.46558656849743,18.3644204779173,17.25000680414737,12.54119267477911,12.071822270160332,3.2214016993411727,0.8048926887060589,3.476580498843072,2.5080351643080165,5.685126838515535,19.07198077134528,2.7198711188658713,28.213532523278946,8.390777701547961,3.338029033973374,2.9966732721111935,0.8152136499354479,5.708834815403335,25.783751392597523,19.48729417218921,4.901193129394034,25.882032666147495,20.93080242880866,23.04640675735446,4.995172291960736,15.026294181980155,24.76814862721139,22.282246125621054,3.509161242672876,14.371719376262899,30.522044192541948,15.916459285523526,19.159387655491866,30.83079993179138,17.837149528298852,18.407055258805748,16.21509673391265,10.736919754603075,1.6815637843280102,17.52414865796614,0.09667198251756594,23.857484163752627,3.455708797373313,2.1411892763124336,0.06498268007273564,6.740681421281353,4.982167630587459,0.8478737779596905,1.4025031175689286,37.89882355819702,7.941303935924921,5.323718295261815,8.54619557446878,8.218518448349512,18.47097921105337,14.894211438258656,4.605420688259388,18.577818648103364,2.067430292952697,12.068743110305476,2.796739027783297,3.1542015866830417,14.242944175142178,12.180368043138891,6.253278794701148,36.17746348612413,23.946009625467614,32.427953223959356,6.201801391071289,9.612333303340124,2.18101242742711,11.982373575483274,1.5924055453028003,18.53303229976127,0.9426534481714038,10.469419461605,4.542459994472617,5.121935231116262,23.386106818245594,17.063568664998602,26.90896682008373,25.058697495114487,36.913633350215875,6.752510516174985,24.148491062089096,14.423650383612802,4.349203788960237,41.64551423417116,7.982600831849989,1.8707278016889437,9.209327958611976,1.1202488097325691,8.620962323922491,6.239692987940085,12.405508017459908,7.5960050792125,6.295754808987349,15.921117934504613,10.547264819657862,5.123354073692138,21.789729362034276,2.6705127212440614,8.783606988593336,11.213848703708798,6.485998378344417,3.829397336130371,16.416978523487362,4.928489344631633,8.883534149819733,6.989694724458862,27.851014729967275,9.439597254275155,24.403904879475416,28.28113299453251,3.9375266979505223,4.2684279354437,16.46968278465842,14.717858245741985,7.332147193506842,13.426678800861175,9.129620420945365,8.684700012071575,0.7559959353346343,19.742751010861724,20.534768209665557,26.703961189957262,6.620931934751579,21.597572796357657,12.614888316519739,24.302885773565766,0.013975593757588368,18.52549033668087,27.30970690744234,6.4359946369081165,7.1479775247479775,39.42041181979284,8.456193204031992,13.996662529540654,13.703736675658849,4.510000411511627,0.6549655698168529,8.987598108115511,6.006679029500655,5.099309967902248,3.266709027521045,3.2589063750745573,11.854743167763791,1.437037443304377,9.762517675801634,15.58208144361621,1.1756530906726221,2.4892421346341895,19.878790477502235,1.9795506614460099,7.280990697606748,20.25041638528796,14.527893239833785,3.759853026879006,11.845227717703384,4.896783950452302,2.332083944128794,19.32872083653512,4.678406378724617,5.48330393805316,27.567316174372863,30.015640138427766,9.373721915325486,4.82436245807841,6.810548106898999,0.21871239918552207,26.992299568315154,3.1485623725366603,42.737279140354445,3.3436380998363324,0.8802284476099164,5.160492929952271,8.279825789396536,13.973788595714598,6.242732431890614,0.7427317132674043,5.276790161288782,0.5538059512747807,16.927317351591316,2.380239635478889,3.451064987563003,37.580753832622314,2.4700617317334808,15.293181188932255,8.561127968823223,52.574892587487845,13.467572276115321,7.567849321281913,26.907646993815465,19.321075137486627,2.864076233743625,36.11954178794691,13.547597942951489,3.65944889290727,0.21754206086035022,5.415746834270308,3.477590060020851,11.54045870365795,13.260684270575101,9.634246659553042,4.7338517346926725,15.110837610302696,22.260532025481723,1.270311828224159,27.623454641473334,4.393692057784868,10.814096763565319,1.5362452075674993,27.99602812927646,6.121468813686183,22.540455925942165,12.596956832122489,22.085047359660997,17.710549390991137,8.446380519801043,14.796502945677886,29.80199569961233,2.307419524764358,13.499739142939896,3.099695704061106,1.3568264196087296,4.810986102813085,2.7853967857551987,10.598850707316435,13.31537956810788,8.823090641529054,8.567632422479804,16.757702575047198,10.978239187350148,13.597620087040982,26.9475028586275,5.85971803560055,24.61033251841466,34.292012886163775,22.339957443453077,12.07702139561136,20.64220927860337,7.989857261273857,5.3395872252376435,12.790555501309008,19.599471130069052,10.30965125269015,24.987791234635516,0.6442220402895422,11.019746904371468,0.29847324342722753,2.6896811424082294,18.763044796691936,25.59613217462259,28.971114386157357,16.06671534584765,7.108672725474831,8.606896317137867,4.220861076596022,30.599474057140494,8.419665781019779,6.557111306514882,12.12963990817154,4.672522483491684,7.843956577557017,4.090450288696282,1.7226803226952276,1.6592452994236495,4.900143751645452,1.7359752728182472,4.972594574474481,3.2096377185227056,13.785115619348622,6.317097351409719,1.7243743648405665,31.699216244416416,28.631630538578342,15.338994439602807,17.825770614436884,11.567617884625458,5.544153395846217,5.470484896111881,9.375717370556663,12.54444403175475,28.352839534053427,3.8945300001959238,5.342631488599879,1.221399979607648,31.354046721862524,25.61499100000592,19.50641631825612,18.238836974436136,0.8526275930376688,14.000174702048499,5.5957862629438475,6.634220345974806,8.465413356141381,18.15549470986992,14.707871778118621,0.20958406677243804,10.887655593941158,9.580231539272832,2.73773636817059,29.41209543379508,0.8062255427959641,8.720354028908018,9.231658235016445,17.42824982636668,11.127425110333665,26.197253938399754,35.627422911162675,17.672553591247844,2.0696944423443346,19.03743967520197,0.7216793307102899,21.84455659201208,9.641783374358019,14.567708013705255,18.443182105989347,3.1820779959749865,4.735430295638015,2.5137980403297355,4.524391069996893,44.95598517301057,5.430073025731869,12.76049891786525,20.971284623055165],"p":[0.20951950879245618,0.7178699788390537,0.7461306230416624,0.233415063911379,0.10841700113592267,0.9644021258661866,0.5053740689367121,0.31677950556374146,0.6644297654601725,0.15356178365452933,0.42854531255871375,0.06325298902564502,0.705032081196344,0.4306454185422244,0.7234701918725754,0.5932328564725151,0.2957590576797917,0.8234071496836111,0.8906981481956258,0.99686489084017,0.0035132914704518736,0.2695350341593661,0.098504875403157,0.20790449470775219,0.31441728086923737,0.2825155742601484,0.8644959930150318,0.8580016133037527,0.8183931260468111,0.4448635720059142,0.0008128511492195845,0.7928152601338851,0.21961942652472444,0.24414744002160438,0.6222773717801391,0.5945818838507453,0.7818866753106763,0.36120160929159506,0.6713998692152978,0.6582840175157672,0.5095284924194738,0.1921024466144996,0.9109155096200658,0.7996008620861881,0.39494552705499686,0.395587898630017,0.44522938190309413,0.42310381303198286,0.8072761277356724,0.24094599383586845,0.06388931378652063,0.717763515166042,0.4945486433366033,0.8622649592986307,0.3547309803976262,0.237758864578401,0.9432955844062689,0.6393927078783455,0.04898009672395398,0.7316036176662701,0.028025936186703237,0.36145135106738757,0.08138071669916691,0.3982213508067911,0.8693096657209993,0.08238671844367929,0.209578526794171,0.5189133616005783,0.8915507123552191,0.8662611871067967,0.7523363263697986,0.172736305121014,0.3695724355442789,0.017916196144944996,0.8544059142815568,0.15278377689363265,0.2751443704511296,0.3156609695557091,0.3269451970644044,0.5216135042067513,0.4334149468585813,0.25754021525555926,0.7750484464032057,0.849847331270752,0.9445077009041989,0.3413694154662821,0.6206264244686839,0.5401569735037357,0.15634032172105483,0.8231754177523158,0.4189748475721915,0.35836366494772354,0.3772036382313102,0.7280286509520373,0.6580790194478294,0.22196956965416614,0.6815697835991825,0.2777440456199407,0.6546206636972656,0.3861888126293569,0.7423834987726547,0.3635076717995098,0.5356382209669535,0.3348487962893736,0.8406121938947537,0.9169015825807454,0.18999347719306825,0.5893618518129338,0.442288434612113,0.21179738334514342,0.4606895841919729,0.5517359177404508,0.9434229760665318,0.3235545222607559,0.33651243219251814,0.650975274773792,0.15602738711104847,0.8503904867412124,0.4934733121074837,0.6069556226340684,0.5155163011368293,0.25334371334915917,0.9403764199098756,0.3446371916285862,0.8520696196314226,0.8028885822561385,0.24247921106714854,0.10097627301598466,0.9979196199258191,0.6331944438615997,0.6566842250204121,0.8827665079224964,0.4534121226449319,0.6912170183084954,0.8865151912386822,0.4667982585911459,0.2936212389606001,0.5924142368233809,0.5321215586495804,0.569521711918531,0.8919242844994364,0.6871916910453524,0.14119996349723718,0.011139138317297848,0.07910801352451657,0.7055729395695389,0.1013633349606371,0.957271850182577,0.5787628793096724,0.4338763418163989,0.7034361574119727,0.894852285194041,0.5410777696510782,0.42039082822889107,0.07482372674308158,0.24482102755370616,0.14797350882708438,0.9268893177856194,0.9119153213973714,0.5071854501980595,0.2245550301481707,0.913293602385729,0.3652053590202453,0.04075620853366546,0.2849416765275039,0.46824740699695866,0.7512276789367014,0.23196508663758952,0.9432305058988453,0.7958917701668591,0.44458847632292153,0.4872840494907298,0.014601951779546818,0.16752093804985124,0.4880933747787557,0.573837291677503,0.013617766429335765,0.9876110107793539,0.654068129247356,0.6521253442270798,0.5063105524269884,0.694965605873691,0.24998191467364128,0.6743557418846373,0.7665456635181549,0.5182451009575801,0.7447553320428413,0.10086794673949218,0.4754414170414285,0.4828306961502742,0.13410510449087476,0.6040016230922371,0.41323625869677105,0.7863409949344891,0.5005215497415909,0.24575083749414262,0.8509299339768004,0.756751066183126,0.948414395065093,0.24043633963452793,0.4644341360621167,0.9290210384794761,0.30014098218472984,0.3669708529502107,0.9045773868799123,0.32334745134307075,0.9214592943743105,0.01562767207314053,0.21865978349644233,0.6523002432844365,0.4568925350072821,0.6412011038124332,0.06978793671882721,0.8992269481744666,0.6176291573820318,0.4702711989418844,0.6750652898152969,0.7479436949574301,0.20875256411885545,0.2959240112445245,0.763842846391096,0.30629797147695914,0.11568872594307833,0.5317829163123022,0.4758273873356289,0.93401024581319,0.6821912040255076,0.9291397692308954,0.6814773209675986,0.6757009445228086,0.18141046675521433,0.07499683136708946,0.5381561214957948,0.014129037570354441,0.6449416080313752,0.2413041854709459,0.3637517402344468,0.19008870113534915,0.20025357905030527,0.177645763480897,0.7326707155913244,0.3767090467432277,0.11970866275735759,0.07046674519442342,0.40885970837775565,0.11904267340711994,0.8021772289529447,0.6591826340803697,0.7946602484577681,0.09605582339398877,0.1971390483241242,0.8782958520015665,0.7666955581872372,0.2592468681264135,0.08593660836689687,0.6700725747218552,0.703049768610579,0.5268518436813372,0.2697961728042939,0.6753883193455514,0.0024213039239460166,0.18632483470399608,0.039410662444146594,0.7374212041132868,0.5466908497444707,0.1699631867999587,0.42334587888834596,0.6050399486637656,0.5145423943944418,0.1611267733515509,0.7083219980163065,0.8640682624367022,0.2560133227039174,0.21586895938345596,0.1574719257797932,0.12881189166318552,0.7664139192127939,0.9045464139508508,0.5011159509243703,0.740332416425868,0.2995751324252347,0.8348025981398088,0.06681095245243296,0.32126865247630776,0.15742267140221267,0.2958177071244641,0.9411781456982891,0.00073841383262363,0.9543635653075504,0.1214032905272695,0.677372311522175,0.5100036153306071,0.22717753425635512,0.5132848939258969,0.2411847519283179,0.7506881247504418,0.9947638807868178,0.7216525526143878,0.05912819900930533,0.24130984088624863,0.9427593219195416,0.05272221748935957,0.028526788429110717,0.5126864885062772,0.26798555045700945,0.8181265077786333,0.7554373524703366,0.8310900840106163,0.7481383758770432,0.8879343298879712,0.03721534835169327,0.9332253452451782,0.6869061320508152,0.243975665325326,0.7215783452559381,0.58127192097322,0.6587001921933344,0.6305962922984945,0.3822695743108757,0.14916362219995682,0.6088212634903492,0.17994651099662762,0.2596911046053645,0.1309578811281087,0.2147084341702188,0.8907129039162271,0.33822242919219736,0.3644263798384555,0.9566320485962203,0.9613540726073246,0.5256114981606899,0.6422481390262775,0.78175830310625,0.6847907723143982,0.23142907369042498,0.1629822771972571,0.11489519050967623,0.6037161917569271,0.04903595098653368,0.8433479099176302,0.6801309368842321,0.6170238984997833,0.669300266496637,0.847082183919962,0.11842913563985569,0.1337282047578472,0.47658094781757465,0.9868148669074599,0.17250458644735,0.427030613377096,0.6975715991033284,0.5456637309781924,0.2235855487049232,0.9485923716309448,0.3373673576309557,0.3827888786291316,0.5891126370052895,0.31051449436941314,0.8747628128923997,0.40294862422853783,0.44653251760834745,0.20438260794619056,0.8137614463494534,0.33695294776333196,0.5165559969495244,0.7862630407452644,0.5658979379910938,0.12445159443047493,0.6050930318279424,0.6816564189127796,0.4128709750670594,0.10788128810360065,0.8190956982329418,0.47350277091210136,0.993231026427233,0.6336343663701307,0.41684340536310227,0.37960238427673265,0.17537139784376987,0.49929101068463666,0.5932558651347635,0.09562792507923179,0.14003056929630375,0.2983359107978203,0.45448413480875116,0.8193715577573275,0.31063658928571636,0.9223343908029076,0.4178482558650354,0.9173781873414311,0.66826266046543,0.7550253244472755,0.10579562430158518,0.08042986695227605,0.8413950960068046,0.9827776973774454,0.17478809798724648,0.5107892161671423,0.9445335739811793,0.22196378495321678,0.6806354393003107,0.33288875094633297,0.08376015663974057,0.9783975666113851,0.8189230728735073,0.29084336041283443,0.4844393328339909,0.7519980324302884,0.29268264913925535,0.1256646953883136,0.9957276601840166,0.05987473938892718,0.5607495190819585,0.6876065998612624,0.6972162329730465,0.9025154572423097,0.17510403867957836,0.06688319284637778,0.8473754395441528,0.49561794637226386,0.6325848650923311,0.4297261036173412,0.010393627728453092,0.9246821351818946,0.4607229273629567,0.07312227538728444,0.3225454445083835,0.06011755550500464,0.8905980969631744,0.16498551375577186,0.4655430427632423,0.7310255866581805,0.06367447757375655,0.16833157040285873,0.38302384303004366,0.07870786106467031,0.1162226361717269,0.39037246073535337,0.3003236185682059,0.8898731838717002,0.7007590250456939,0.8378551893564199,0.283523296038072,0.10561769993674841,0.3410662859628797,0.7861711396063076,0.09425021596779759,0.5280872233849982,0.003908844273452061,0.7163194486136648,0.8961821683640392,0.05932062300277474,0.3274362727102027,0.40584332744206275,0.9395262626111256,0.0728315921076006,0.40035678304489286,0.28553138980990633,0.9804101007019348,0.08583459571349894,0.5114203305079215,0.10153964154813377,0.8468958296402229,0.8132474228850728,0.9699980696690769,0.46680362249871954,0.47028414039294764,0.4197195889972467,0.8334598177203787,0.5509794155007559,0.5078389512193404,0.9246729832108815,0.13337967899893743,0.3268429729162621,0.3544227645614899,0.17527526958008877,0.880621261289547,0.993056133136752,0.14144052491389614,0.37484565865026065,0.2005409127514748,0.8755322640614989,0.06435364478562411,0.38822867774434333,0.01670545476648244,0.9458160406880245,0.6751432829048858,0.2883519005627344,0.19336695628943557,0.285567322468413,0.9090312859655956,0.5082461311267632,0.11004865301284505,0.7775204804124676,0.2508473533233928,0.14691507699022988,0.7279027749214073,0.43327568739894406,0.26923898752562403,0.19333259290510307,0.8324919529922583,0.7393127601973917,0.19729985524402083,0.848415016047187,0.33474880784138006,0.14848728520520438,0.411651944065651,0.9596660750750003,0.4483535887195087,0.4719166241710335,0.6448728683260025,0.12053015839717607,0.18282727564456813,0.11565806470949314,0.9976950369452868,0.8362171549082995,0.897678442275373,0.8054099866405586,0.04348209044277884,0.9075916479841564,0.3497335555668273,0.5072326193656909,0.32308179532685277,0.0004646935700192145,0.5677079698798169,0.619870280412341,0.8272045283939999,0.9274737569563127,0.055356689125248826,0.060997343859815034,0.42626959296590905,0.4939597863333769,0.23460756710112896,0.025273918723708988,0.22236160179482933,0.33429542836892434,0.7209494555553515,0.6325128235293849,0.06679608007114246,0.7334303827292197,0.027326415840398743,0.004421255242538891,0.9118996202112883,0.4277669839613214,0.43864029999942256,0.8301004218656083,0.009497864249749632,0.5160064497318515,0.8259602459549646,0.7664337644892123,0.4183299251320798,0.6194626843945428,0.4538232193892686,0.45978275086334497,0.16967515906963726,0.11866158523806458,0.053374720235689344,0.5123345513841364,0.03538579616049842,0.959850244334199,0.19925590515418823,0.10243708608506874,0.39695791551862425,0.9071174612813824,0.43856267016076944,0.054100470737010964,0.799042219621342,0.7055173699297606,0.4813556277623048,0.6777223632914953,0.41413673058505407,0.42094597340672224,0.6972175957513751,0.5065835233717018,0.6416123583173161,0.5456824096826522,0.02175535060836875,0.3505219803645001,0.5681726344960185,0.4295570525706389,0.716764807156355,0.21483483795852587,0.5850349249783955,0.7972402226297619,0.33412402699114274,0.8419429581227256,0.3198620811743067,0.8042258302112903,0.25602297937658247,0.05083748648196962,0.750492860253158,0.3144561867877538,0.5700132484818226,0.9429680784501788,0.5295133312164444,0.509531664944072,0.1312887850310318,0.783742070309065,0.8797038851386785,0.8648248686446733,0.47030044495935575,0.1447294226087139,0.12769359354587695,0.7029413554440911,0.24704693465085326,0.19425714230937619,0.26605939151035196,0.5153688893707362,0.39222460958654803,0.500724887641963,0.15339684425424305,0.9339627857751944,0.6669420432499376,0.8375690194891399,0.03437337801883822,0.9941704106351295,0.29033166297985735,0.03578470207012363,0.47325621347375546,0.6252302502803355,0.9725823069007056,0.13516454228574437,0.8681373125803868,0.37531133128037397,0.5859557714407755,0.762636382724756,0.6317028466693446,0.30161999526532934,0.05610206862172862,0.5083823912250018,0.8656365934068895,0.8775936348909401,0.971238752407606,0.8386764709750738,0.9981551724202968,0.49002658156930967,0.1840909055574118,0.6119886455153059,0.8336668315937457,0.9022299850685136,0.9336110974065854,0.04020150099179176,0.9048327919167531,0.4998006767724452,0.939977819757146,0.07575277359004606,0.46660865536871143,0.8199145866155853,0.49270702816638856,0.23810081006325512,0.13620233940640092,0.2746154038024071,0.6148593348448907,0.9592137606249016,0.5324425622682178,0.5825928209314319,0.0920072746789975,0.2118520572142859,0.11558490001069854,0.14401632122389363,0.9254218559172842,0.4720232832099378,0.2503108837744996,0.5339760912360949,0.23494075145174032,0.13541526052949426,0.36016848768523735,0.8517386562652993,0.4897963411231292,0.4695536673369409,0.7597545030840205,0.2965107947161072,0.9889068762543638,0.3890287179714944,0.36374654878468093,0.5296487654948283,0.8669486964863038,0.20489727316777206,0.23456996146215436,0.019388421724929383,0.12030135686398791,0.12490342176551694,0.15396159467403425,0.10154807987395698,0.5079752120316157,0.5579326541954106,0.8243475979154682,0.5096574443980151,0.5444274778497784,0.5763401722552457,0.9245151209511961,0.15369498495616485,0.7096338304415009,0.8023526607873481,0.04031958933810098,0.7884791713339767,0.7723392535834097,0.8756606876763788,0.2816781881472916,0.2828874252868827,0.5857854757233336,0.5389199406046556,0.7238800625777568,0.5775898721804897,0.771483666156898,0.7840107004763797,0.5565566216045035,0.9057494506271038,0.45641907916334157,0.483132715081555,0.7339890697013165,0.16652369039351989,0.8957757732645457,0.6518979420814306,0.6153744781176986,0.6824944290386394,0.2561436058805904,0.7189831906860817,0.10170053793518119,0.13171448178798228,0.044567230133724545,0.4577620952287853,0.007892611092099155,0.8740705221237717,0.31607356519054375,0.7296287381822395,0.38626569678014877,0.15987661997566227,0.44635691477636597,0.7527212202750129,0.20281375387403244,0.7335164483823478,0.44042771483270604,0.4187808064017642,0.918125877820366,0.25937072284321006,0.23277448785166843,0.38959628465121665,0.854459956624787,0.9474658892110523,0.6261626171624319,0.9469571541807034,0.8863874965365395,0.4069463804114275,0.36185530649409703,0.42381378394470093,0.02201022109832307,0.3710802310154009,0.7384818043637276,0.16331302826590788,0.18671861682017976,0.7523056038998308,0.7652072520412001,0.46313974462196494,0.7250242726353215,0.7502411122430195,0.9874573621447411,0.06380941557209696,0.6511453504853537,0.6450494109629745,0.8346331839218197,0.9039791111046622,0.5810620002197915,0.043501870576468704,0.18101510652855635,0.6599641628510238,0.3066996929650767,0.052862630072505024,0.2638153758897923,0.326443191956848,0.34803002498533653,0.9571266503332494,0.697973475672732,0.8498034884207648,0.4516628672274292,0.9255506604248867,0.8125749043078643,0.875915305697071,0.23931298352816932,0.2659147411690348,0.9404729013266375,0.11505876849602203,0.7679148377063181,0.8501565329816132,0.9804408097942521,0.23383784791511353,0.918392586972407,0.7708631489757591,0.7109145802363013,0.2435911346534838,0.9179759754250649,0.2438512753453248,0.07796726121776598,0.8100178246988046,0.14674899417615173,0.6199823688635988,0.0008336300519260487,0.40067288017303637,0.671423948773447,0.9782899119886528,0.5975054763411334,0.45094945724973146,0.9145338579731808,0.6828511103133406,0.9862329138770118,0.5701443924515037,0.817382730841328,0.05167869047335549,0.32178444686054974,0.8670734841224115,0.6322824103447644,0.4234366814006243,0.9868606293402586,0.840822740164672,0.5312369212013865,0.283192252135269,0.9333404565943346,0.9322719666877293,0.06816647916543328,0.020179570093555865,0.7879306808105211,0.34048497980542103,0.3283556465572224,0.3282101209712822,0.01727793926002774,0.10496751852020325,0.8035791103693399,0.4700320751171627,0.1278535145231019,0.7737808784189624,0.6186560295469956,0.15333422249969142,0.8386692780369502,0.062448597581757026,0.9513245754915816,0.8290424449193543,0.7948926384621875,0.09537904378261963,0.9711622013615109,0.8148396572412524,0.8605385050748344,0.04234061717275073,0.1382011304180042,0.012187667647118872,0.6284093442749354,0.6653679471142595,0.9328061614206933,0.04953067192303595,0.0746378166071473,0.2013687789998384,0.4404650272421291,0.8029996556731607,0.5585110242328657,0.09468009705577973,0.1305784745723475,0.06791143658066479,0.5603046437641059,0.14858141790213253,0.7490644144237901,0.8851216967723348,0.194903767962068,0.7579014560591737,0.8980699158229604,0.973773192140724,0.432165360131618,0.7929352347165783,0.9630788296000905,0.4909255953740044,0.35107374112552514,0.883122596509542,0.25149233970663265,0.062449958786587656,0.3601774665495949,0.05574309236459141,0.040343243558263575,0.15865220387484902,0.641915976819889,0.7539989817168697,0.9205424485001721,0.33775424322721714,0.8769067060484861,0.21877889696866015,0.9775699061892456,0.5451330351804395,0.9546410161565049,0.21968640763823566,0.7057850199720324,0.9690220504577529,0.9327603240982114,0.26048464958969264,0.6656652401766401,0.4198354204649044,0.12461193111010771,0.5948280100592918,0.9211082876397838,0.8322219801710926,0.352122781505136,0.6206867852787752,0.07013571088387249,0.367328501962064,0.22743744665994292,0.5026572772331996,0.5872198150748795,0.2850020403550304,0.11742585206839218,0.7064084316242778,0.8327023703944241,0.33265423221027013,0.8528440849861956,0.7043399617098465,0.8141737672974125,0.8008627689855943,0.6917606409353261,0.2769513374682533,0.6920179322591138,0.673912288617569,0.33760464652475375,0.7374586182155678,0.7951137510946786,0.16519388353865705,0.6446410057063747,0.14005674127221646,0.5758149297650486,0.012067878729316694,0.17742089994619947,0.8189976406497561,0.766573355723787,0.6913896719321617,0.3308466727111792,0.6988633720640813,0.46117038468769334,0.1381394302622736,0.6968590159069832,0.21903881668635838,0.05667135428915482,0.6172129616251205,0.9433163235690698,0.7987438185338194,0.23298530020879604,0.4182722922699995,0.6663329137786278,0.1805385611424677,0.4295478194803459,0.5102619990783059,0.04884965647547279,0.9450385328127353,0.20941276816047028,0.934672754338286,0.9088605441492912,0.9660826913705756,0.6008312949872241,0.9190472023555327,0.5724867423741737,0.33677182022467145,0.9265388479020766,0.7738306334620051,0.2479245607819376,0.7818163935162294,0.08163979028337653,0.37654963543320497,0.013848531354837101,0.8316862582037734,0.954838188395889,0.5518870909849287,0.38727910942914257,0.8958265988227923,0.7363917188644513,0.12486259754611373,0.21611166695897244,0.544475681576644,0.6411398398219568,0.6111470215234363,0.03680196836103877,0.9371712237561842,0.1929031419915752,0.9917963016829392,0.7966620628841377,0.7184444122150531,0.3713506182175863,0.25790915126990543,0.51482390767405,0.5057933298822723,0.6186504463526072,0.8279423850544954,0.452961721704046,0.011567212363065682,0.3913663821878468,0.5493914750067805,0.5304002299679371,0.37190374643651736,0.4626416406081735,0.45227694797197415,0.07928463609297975,0.49869622655419676,0.02336237662875984,0.7946115386949977,0.9989634894411972,0.6640179677592031,0.6895272904810839,0.6672141020550655]}
},{}],83:[function(require,module,exports){
module.exports={"sigma":[4.44918557076401,4.805816418759186,2.026225293367332,3.1318660221189965,3.87086606619918,4.664507863299714,4.750083906185026,3.3202177781567532,0.08491387714364085,0.3252483913988813,4.224962800303701,4.086252321095528,1.5715982086985447,3.619709700063108,0.550586237675168,1.5141374866627144,4.1363496572092915,1.6243767738064607,2.400063975593385,1.5364229231857984,3.6212543793279983,4.286605603520752,4.288965804051578,2.2780444406188027,1.2904133437102339,1.1741308212683688,2.655954975610274,3.75617303220117,3.938550998206666,3.713763085723303,1.9538483122177919,4.1283239256599344,1.2467221649274984,2.2737287267906368,4.999156710726932,2.6527829296194527,2.848694467208881,3.301168982312326,0.9767272850112885,2.397408233055629,3.241018412525775,1.8709068719706123,1.106489883711581,3.0075056789209365,2.3150280359038025,2.3644637090883203,4.59198193192012,4.939614031645922,1.2124400015127568,0.9283017629208823,0.9689483830001666,4.625494258634394,1.771252154832813,3.449131456333956,3.9381172019472697,3.380167000946146,4.842122456020749,0.9359576204415854,0.6592821270180749,4.188303252329918,0.4482681618176487,1.3025389498888706,4.680253332545662,2.3751001988510767,2.4666171139955253,3.1808224325935672,2.241352422771282,4.694438629065834,3.6799199159626816,2.130777683004056,0.7932855705705077,1.1480273304910438,4.397540245272906,3.334793066307803,3.2081137807698203,4.028566819650868,3.473334222232082,0.993604132352699,0.0714801726629466,3.978899001370344,2.9645289898792484,3.7692358358886926,3.633076076965831,2.0959748883404505,0.2528392797541179,4.470205341404262,1.234787879702316,4.588507123010048,2.486625251272443,1.401191084779666,4.582006425453908,3.41556552741356,1.067927741804332,3.5127081407086704,1.1541897280408897,0.42141962372100217,0.6578337947478341,4.37686938615805,2.230078775864357,3.5880166429151394,4.906461000410269,2.2393080952859403,0.6911183872674376,3.1195479525596124,0.5689203573457313,0.11585987562229616,1.1746131278393779,3.4877891090839555,2.328688486500078,4.983498558961599,1.5662870757682867,3.8064422785890217,0.5969509662608974,2.1327541701068875,1.944233177626995,4.837924592253325,2.3378191255858836,3.221880249332086,2.542362104131093,1.2870729922639057,4.6647322355619245,2.246643969533848,3.4389339298868182,1.9093842367456049,0.4104036254487198,3.7291088601416975,3.857537759274723,3.132472427490617,1.5988212736254859,1.840506417019886,0.2177877177389087,3.075733103466426,1.7694833436760038,0.29985765240949647,0.28207266958937827,1.887918986242415,4.520715797695518,3.6525460259274647,4.798501699369217,1.5236568620236957,4.510832925261958,4.545165153197152,2.4500660167841115,3.1154552394471247,4.995098032526205,1.1245415897107136,0.37036058168431585,4.541073790129204,4.140792007181511,4.085391589725828,2.3859798548676494,3.5660425523012105,4.934329845185838,2.1656717823991767,2.887186454197516,3.1124192054050126,1.7005084723129837,3.81490365135201,4.029743205242569,3.492887487621401,1.154928502199336,3.61666372453346,0.0679316764513882,2.2655697609626713,2.6437226600868735,0.03468073830010243,4.43370653613735,4.9673499819055476,0.39083090546297994,1.7380881571664442,1.084196862394552,2.5944705544406665,1.6275529285570156,2.695589400944609,3.134500009174088,0.21343892906504291,4.883397431345687,4.082048714595604,3.7788389627700436,1.9713490620745966,2.420804523415282,0.324135010721347,1.2775197957045414,3.9132631211207016,1.5094111250286801,2.214122545748851,4.959599104565965,3.914555038869467,3.1186709046466943,0.14698456579923302,1.3775330402857278,0.9620024308874819,3.493782376113467,0.8088402968534747,3.803042688901513,1.2215261248395737,1.6912863630765274,3.1757110444596437,4.41201218019504,2.382826871441978,0.7511821744254077,1.9206371883626805,3.2755586289288754,1.5384169345083476,1.2221167047456039,3.3690428261788097,2.4950981582074174,4.786097397464092,0.30241373597229226,1.3170616205744357,0.9631034363893209,2.855337566653817,4.926366898185455,1.7586903995489245,0.45842408712162164,4.097140237549921,4.71755255581909,2.4743396709504886,2.627520984671934,4.60084009638037,4.387625206658718,1.956671128094496,2.7987026778411317,0.4914991004667235,4.934742943708077,1.2511635401580234,4.630294391073045,4.7043192086119054,0.8049039512350364,2.113414239821564,1.3434439101464002,2.0147768265612975,4.570010926980801,3.8907069969636474,1.9664103678677325,3.5477268848382115,0.037524182398834816,4.442052941264568,3.304991536721168,4.976707632468315,0.21902360202366022,0.186644240257281,3.9686186415905467,3.627205038457484,0.8364298637610923,4.141561659120692,1.9509354738088847,2.4968430190316084,3.827189891359033,0.23902118477299283,2.524615242039151,2.767675118559225,1.9339325471800495,2.11274740653793,2.647148478952178,1.066994629977398,3.429280585050133,0.9092686278187678,2.384867859910532,4.536134612065862,4.900766007028109,3.146726259065753,1.4584266008716995,0.8119044659272234,4.19129729538684,4.6775523443407465,2.5342037083247804,2.104587647432524,4.997265977329295,2.03658605065564,2.7252512070345514,0.13186933793570943,2.3226480259965787,0.3804003572958703,0.29905544875274415,4.0999261289444044,1.0759197754564809,1.6555013831421472,1.6175040046138445,3.2244231081044283,0.43803134861899906,0.004076573280946683,4.707873248256323,0.22144553116382193,2.244433607238131,0.8549240116229662,2.329430075676757,4.228390601095791,0.1325349077171445,0.011028898312400726,3.8409702487080377,4.597220410339501,1.2963650379428648,4.730223154626529,2.76489663925486,1.3277705571916076,4.082559935969306,1.1011874553797774,0.9725602765092078,3.901474115713194,1.6099123037215646,2.0537238879493644,0.4783058941309437,1.647236334323925,4.396628684638733,2.3338670326915247,1.2597516123875485,3.099465284221897,3.683111390394883,0.36127878490489707,2.8321564591909865,0.8201756603584476,4.332827707282777,0.8418009755873934,0.2195789881190724,1.085075167617181,3.6869236258070304,0.1789950965477205,1.5891600494483171,4.343419812008781,2.2641423681960204,3.8106746885410834,2.369376687209744,4.897848220778095,3.720265295383791,2.334997724207266,3.415674695775679,3.1518300813296154,1.6348526637039718,2.5002858267657,1.5821699301304593,2.2796104375953674,2.411612647569865,3.6555924380984606,3.7734173721186046,4.757478659115071,4.1816390223883655,1.2911079908273082,1.2964107503910027,2.1331435600392377,4.0310715071546985,3.0496749276437427,4.903407285796834,2.476224086330884,0.22355529754209735,1.2870200224939587,1.973160165958383,1.4799361381445397,3.962673998472325,4.447894637805904,1.2938719807379018,3.61858129692771,2.3696243590918464,2.7400456996384746,1.2922119640904228,4.904103787185127,2.7765686236307063,2.007662083226418,4.02841986516831,0.10763933966137063,3.8237091944208257,4.374137553439371,1.5036148769513413,2.0353598138822413,3.604782924389326,3.496891576318478,3.212685592810729,3.071334683733559,3.3778255892018794,2.649046481330447,0.6706839130633468,1.596956880312883,4.652669420721773,1.418386403052685,0.702321653649951,1.0270944569242135,0.9456935654605492,2.6516699533625188,4.123991587956887,0.7119985355187364,2.1103850718915584,1.953438196732733,0.7795610268663833,4.248252316609252,2.5557750355293196,2.6881104476463236,1.9698807389392992,1.049039082155474,1.4528752117175825,0.528876921794641,0.7053521942773477,4.830744148142853,1.2728604147951117,1.9414426701806808,4.629346855108726,1.7865000243070706,3.085199108556539,1.3419170466719221,0.046383308013563385,1.1730208499328842,4.151961881728187,1.953325522717685,0.1810761878529521,3.452255028950584,1.5060013774453385,2.4147532630363266,2.8040084283558575,3.8141742367294693,4.764401080085139,3.327552348534101,2.4922285049285096,3.8385539352866416,4.469521579908639,0.9478948376066221,4.894773384072463,1.1331388570841638,1.5959341880672717,2.3701012807140542,4.479874066081827,1.8814242480453558,3.8490117075611217,0.8259556776079424,0.17649450173474635,2.7249453151907446,3.3242677264602047,4.028492073653165,1.0737222294976312,4.818856716629789,1.8685889868729633,1.0133257086246361,0.3549257697634778,1.3852187084309786,2.832288306800912,4.564918084536288,3.608783865788303,4.6508231222921985,1.1802646180517329,4.0959486819930735,3.1849099054303376,1.4597453550517536,4.594218555745045,4.832562601229318,2.092432901844653,0.4767571695699824,2.6427613686389764,2.402221833514977,1.8972729387676979,3.486065937046213,0.9387285678150425,4.549573417061151,0.6492298913154981,4.581602254710796,0.8501964836188958,2.0901460978881836,1.198382616646595,0.6956834250218147,2.2248481596301364,0.1696180026760019,0.07631204994273166,1.9483486299351516,4.887501618878285,2.788501517853026,1.6162793368163664,0.10164548061699863,2.186420161990089,2.075514101922046,3.6315435116100403,3.7456055225828058,1.947411892386327,2.292036720263082,0.40313683537223644,0.3303605265070464,0.5732118328795688,2.39097897486423,0.862586760283035,3.504591336192371,2.7394809690790964,2.026375240381274,2.8620510556592125,3.6137630964404464,4.998834588289026,1.9050696382017984,4.612503982450989,2.903433447050733,2.1659641286935924,0.7844015392178738,1.6558679076790794,1.0026067603100874,3.8959768325256894,1.6373163495850995,1.1651678641864238,0.8871995280896339,3.447125322894485,4.797840832782098,3.457155373735259,3.8203821840318177,2.555423291242065,4.261859478014427,4.779107201642204,4.653943949718481,1.6901778185085548,4.047597932511687,2.6570788550697486,0.7007601921815099,2.2915372744445572,4.888268599322231,2.8644711631338984,3.485550955536658,2.1453430154825637,0.8624400772097573,1.0079862035282505,4.344645430358046,3.1395078168024346,4.440017653668154,4.357036033664244,4.685256832663503,2.8402512955634798,0.6261248373518369,3.3508928422122697,0.2434125845373769,0.9288434627908049,4.209406138269562,0.7306956848475343,1.1530883666455372,4.696338435083103,1.9807705417169252,3.402064147232824,3.6572177364061353,1.4996003568343352,3.3331804166621892,4.184298781286152,0.6909923347969116,4.18382814810863,2.621921649709872,4.357387001584647,2.6567222408595548,3.9838271866316424,3.83750685000092,1.4545252108982198,1.3488314718613525,4.759231534996787,0.7938365464691566,1.2364803619868558,0.16574023604683963,2.731092699674825,2.9983793837617423,1.8754776886589986,3.346014986407444,2.868986715993529,2.214258462792901,3.1867228290900353,2.299188641960739,4.3455368994671915,1.675070354691215,3.6456842357509722,2.1234654682315544,2.5426629963538883,3.289630322665118,4.835418775511199,0.34883942387211375,1.426844976409819,2.0666261356711555,1.851207849786679,1.1183499216273185,4.6664806702904755,3.937606517504455,3.8082271571250725,4.108171065545415,2.9415812373660524,2.695130574505532,4.511280043122186,2.7277323171749988,4.2049409341867925,4.69482676693688,4.144829496217982,4.996137191092557,0.11999387088738267,0.16935954640430184,1.4497629872760731,0.16470426273533345,0.22845748409999533,4.306019875328882,1.1989583261883296,3.7797715681276536,4.991512495117702,0.08920919603959576,0.1552695371951085,4.755196129789927,0.42689520282676696,0.1635463926362668,1.5253932037777385,1.015317476835882,2.107956067004848,4.912061794097112,1.1943846901668165,2.131301561197987,1.052195460716282,0.49237244027107274,2.567463618900546,1.3141153445608245,4.55855596452345,3.8349957299191297,2.405003636871786,4.609327954421126,3.967012007236322,1.516351139270189,2.871010045515492,1.5674519772397433,3.4879446152521263,3.42703864149383,2.2506039582448647,1.5807829597010148,2.013129217134657,0.22718748442980385,3.4755994177667904,2.394363867897532,0.22948497838204407,0.5417542294225675,2.0086710914830155,0.19627819627121346,4.296466537201348,1.1124110096868356,2.4714367637808063,3.4929497622522963,3.1557606590616096,1.8566858185289037,1.732824481669032,3.194455184685292,4.367504415064968,2.5589844209930734,3.89186588804294,1.4564149496478473,0.2635650774706999,3.276321443533999,1.553180085703304,3.1192093663470146,2.5156922159918893,2.1631430089354287,4.288358160106597,4.1764970826033885,3.687097719151194,1.8488779309582992,3.19677220539756,2.118631111016114,4.426604323686796,3.5947719403688225,4.924468657496775,1.0529744352778092,2.4499035125934663,4.498272965407814,2.3671978239576386,2.9389532121770836,0.3865497228019743,0.6734744623235178,3.782594334350483,4.764133689707534,4.603660301495992,0.14913117061464254,1.9552650279250827,0.10195275647217117,0.7626869464385433,4.808575062696361,2.3765165955732757,4.499279583410146,4.884034900823222,3.21643192326575,1.3045887418942603,0.24230904773900996,2.561843183313975,4.666575724200012,3.942927242603637,2.0166178299493067,3.1595675787221977,4.2473623634952435,2.5991384652927882,0.6860544191546747,4.36180993541649,2.9632048931999466,3.147016826511435,2.421574582271214,1.544257236472153,2.92229703968136,4.097379702024012,2.5412896643048466,3.804926512009624,2.9478371880541254,1.6420203533745226,0.059022328553142156,1.2830045401027002,1.9155304386349292,2.360062662231728,3.0079732668498735,0.7568471547723576,0.7109113220125118,4.550815409839107,2.3821833786363444,0.7996534823478352,3.433510703444833,3.5918822596651356,1.514236141830011,2.2180797388588402,2.212626811519308,2.30228227889243,3.0992762827135167,1.680733887990119,3.2264418889563604,1.1639726342732415,0.6135322398615195,4.07167474343392,3.4460234572174233,0.04175114942756242,2.7262708143708734,4.791720974533781,0.12737100977649574,2.8474001730921126,1.7410430937354904,3.6663569165720955,1.5546709931618496,4.70971944489067,2.8428500960114156,0.1524464067531206,1.4614446785409663,2.478976242281309,3.0382445462677374,2.985874739232217,1.573436044091212,3.3746027999451247,4.511670257298698,3.6740238874002684,0.3355498024388759,0.9624862381765364,4.789420563155632,1.557853849143087,2.0327128413429274,0.4448365618888439,1.4744389803825786,2.951932423752549,4.398007424744726,4.863336173249639,3.164167559670046,1.1934121270860332,3.9855952139424,0.49404019469345584,3.6564374118831164,0.50296288216788,2.9081839488971095,2.506678815207776,2.9445945326019887,0.520392971095941,2.3546901241593154,3.765896511632354,4.8698230851652555,3.6274193803987576,0.7723279915862713,0.11765422822223814,4.885117732728967,0.4297256204169386,0.0573264813862806,4.211190548384467,1.1543578208893135,3.2850806144559606,4.959274859412592,1.7432492978908876,4.658261811766823,2.8029832094915386,1.0805657894651266,3.527859036892921,3.451558221478006,3.220655831368661,1.5479631391380733,0.4109928468355628,2.5462528069082135,3.998603034832721,4.105886859552386,3.8601247764894184,3.7955422089659354,0.8387802463406702,1.1485670448138552,4.760610301483616,4.393088119273263,3.419529548281899,4.20509257939866,2.122126215900877,2.2542607354048547,4.899583002153847,4.433284012657699,3.938636327518007,0.7905975689403966,4.049930932851219,2.0798782245919356,3.5019666073932934,0.18574597535014892,4.555798822951319,1.572467052213331,1.4068396171575959,1.5029204812669927,4.042958362490903,2.268186567284145,3.0288750121083674,1.253180580955514,3.661287321362001,0.19424975579979797,0.3372463824800953,4.858024287025251,2.585905345042386,4.174813131091932,2.9014985415828565,3.832379628531882,1.494592693783242,0.35906333073981056,2.7838269862204545,4.963210855714259,1.025409742549076,0.06435303712603702,0.8502020737697191,1.2464540578969008,0.4522935315760124,1.7171752075136981,0.7726660085832737,0.7983918828463921,1.6516835052865997,0.529119598445631,0.6868629718102104,4.48799121381732,3.0072817498708404,3.652912927915559,0.9673992648081198,0.41863355940044866,1.9996702780514597,3.1858689280407226,1.7269373299413882,3.2178954045858568,2.9818181502566143,3.4941350769359802,0.11782272392306337,4.104610911751329,3.7925641043283154,1.4027652813819103,1.9619999383110442,0.6520254838218809,4.120996299337522,2.846309212381942,4.1032804684633035,2.483006705409668,0.6113555127593429,3.0540273742955346,0.7688998571724581,2.2509957739109065,1.588666674239273,0.15498960684691365,1.2180793893746233,1.2864645244200679,2.8343640985389227,3.106990117921602,1.5078832181163204,0.6989013962609159,0.2354060758449772,1.0663735131049201,2.534529748124248,2.8294325524221975,1.1513324052974672,1.3830530166714539,2.052846221174537,4.746629801523533,1.8278966797539775,4.582652633212429,4.454973729940672,2.8440267110826367,2.3016447768607007,2.9935887728672785,1.2831271176935055,1.461647072608252,1.657262968813139,1.6937911211152146,1.5285016663506668,3.643717761461829,0.6610816201237935,2.9328060774018914,1.7167832914070547,2.583228755825051,3.763219795546495,2.4594803302151624,0.6865635012694193,3.375562012597999,3.772906176011359,0.39472107024063674,1.0506921787035328,0.35974590997339684,3.508608042908119,2.977881040614363,3.1185114957874704,0.8377850481725602,0.10250732833291809,0.07317420376309891,0.3819515673643059,1.2105542884298715,3.9110131547890123,1.0486884363768656,1.8094702995882306,3.56566761568353,1.5834690763793047,0.9153396048507623,0.1741794830672505,2.1375916489774474,2.4332104035819313,0.32880627617302594,4.699207931305656,2.3324020614668184,2.557630434150396,2.2154493965898348,1.518303411150117,4.3595350898693415,3.0036082535734066,4.90089919799772,1.529089046297718,4.227158756135577,0.22943049082057465,2.9404172681351834,2.053373217452962,4.416152344959335,3.739075491143853,4.46952744101469,1.1073895306482417,2.2515584048027093,2.4559751054180468,4.0742873524722985,1.6122363148221786,3.6335533464809022,0.7212026366202373,2.869176501874582,2.4835540392267443,3.5339137954639344,3.1921860608295773,3.8702174134777936,1.9886304815628786,4.00957271006055,4.933284504899601,0.864435784809775,1.324231185175655,4.070733613047844,3.012182610484265,3.7423859339741727,0.2608737330814104,2.261880361013385,4.078981018375964,4.004300126193193,3.0880102376493013,4.554357932445093,1.392645833307935,2.11797203887228,3.4224234469641743,2.683974104027751,1.1516108237803602,4.203135170437475,1.0715031770990013,4.9492944623046755,2.2875994125760135,3.3233225340561723,0.21863692590136652,1.6068022197497567,2.613940390414876,0.166292139710692,1.6015498277153806,1.8781488479918929,1.948435765139258,3.587497561792107,2.9987061971903417,4.881094465149809,3.416284474359993,3.61218006688759,0.5306492931426288,0.16412807672782526,1.4690256433284854,2.655131075021384,2.1078916971881103,3.28899589739599,4.271025559216789,0.3962326462606147,1.5315999681205605,0.16856287548782212,4.380159313502405,3.2549711688842353,4.506758278081456,3.2373504822152976,0.8649283641979477,2.502114699537019,4.385637649932425,3.029065645295117,4.879544254209217,4.390017793410773,3.5415527219390563,0.07256518783736343,4.61895377792962,3.060708100846062,2.3945184362639194,1.0373717323159493,4.2031441926058655,2.8640144988428817,1.3407115912259726,2.4609635559002028],"expected":[4.388508686255201,6.385370581037229,2.3950429996088816,5.2950386535281,7.723098269814399,7.145158022788492,2.878303102216952,4.975182194390962,0.07976867652975042,0.4343717380015932,5.340571563052066,3.340220198819976,2.577478450717638,3.8500580895030736,0.34955369710739553,0.7280761344852557,6.767259723256183,2.608457356092985,3.7931829067795473,0.6796015175487073,4.894995872737532,3.3315696737798968,4.071363041211485,2.0408457910936573,0.9049318647427561,1.0741852400856344,3.7955400668409265,6.007140707125294,1.6479029773115665,0.4090924350872443,2.994951442025344,4.178912951325609,2.5533027954112857,4.92696309874735,4.687216601852124,4.345231788966176,4.636982652957354,4.7856440136338065,1.3159750517805282,2.740604240292055,4.378681295020797,3.3687330732116747,0.5668391886986135,3.1994561274051545,2.745540080365321,1.8353025869167139,5.226436097824627,10.362219969377904,1.26593075131024,0.45264871684878477,1.7889512522714086,9.662802968897015,2.9684666864996383,4.723728384120601,1.7447783166470765,4.22186378676853,3.307894252962533,1.8707381486315164,1.0360952024272563,11.7737425548777,0.490624655834534,0.8007057320378753,9.4983690338699,5.196342623291203,0.3027561252025797,5.916666637513431,2.1795956907196605,4.798134525077358,2.0821043454115142,6.585987049746644,0.13812655482909889,1.1997987077316083,5.335542410634621,1.2793955137250739,2.909314318199478,0.25165408893274216,6.153379071482496,1.7399781388161328,0.07489466805715271,2.6894834912414587,4.783419521712354,2.517175696239639,6.566334461015521,4.079765674292927,0.19256969643873556,9.026302908984192,0.8258495163779086,3.505767989068654,4.105163645589232,2.8131098189988197,4.672093773032108,1.4767234333458439,0.02160981520143147,2.03234107088668,1.3643126154563747,0.5561595717667658,1.4319898517000913,2.454270762943117,1.9559131061512312,5.106443182891991,3.4242270902133054,2.210864144474231,0.5118034064919927,4.636227635537403,0.269027851048215,0.24690856497890531,1.6672348470588099,4.167119737412372,1.727643959295936,10.205625132582549,1.3135106263480094,3.225979794414013,0.4463982416969661,0.9755777846545413,1.7343501527874485,6.320030413260995,2.711017638481308,6.200526606016744,3.88487860791501,1.6328044180910395,3.933674375121398,2.2133918387495317,3.5382519258435328,2.1692539162782345,0.1756920655714758,2.7013060643723805,7.141961039295586,4.94637641286683,4.1575666493524706,1.4545288647900947,0.2568116100358498,5.869205179946571,0.5717055778422067,0.4865667468929065,0.5791491658041144,0.9225352427911424,5.073643127997581,5.1723211079599025,2.211608723397142,2.503538049999746,6.100161013100975,7.521875480745753,0.879672907873997,6.041099659259134,8.152782018032891,2.0049900572911548,0.2197671231114899,5.94000007829033,7.872806996020049,1.398246789695923,4.952239172186223,0.36000723810488,11.440065472244267,1.9137429610695487,6.449733348132246,5.544785705569465,1.6244806459365146,6.37342793889798,9.149289283528933,3.9534391538904807,0.3174287310023848,3.1108209704653875,0.08176895978185458,2.839299346802675,3.4469828909866043,0.03096501594238684,3.6746972347118083,3.6915424076333934,0.4146438827383452,3.0805978886726297,1.7715861948578775,1.592250521742143,1.7953147830478005,4.622473948369773,3.7802963438945727,0.3550668586939445,5.405781063785877,4.9900483018396296,3.314408242501501,0.08634265130019413,1.6728230178573507,0.6165881985130954,3.064783666992824,6.243956004215712,1.1965823509780644,1.8508566500996868,4.911936060795204,7.87812181880918,3.3530407488949043,0.13944641097920868,1.5458068418818611,1.6016038506063481,4.282004896442536,1.9566735720762993,13.93937173445304,2.284748189138869,1.603516026895462,2.414333897394023,8.342234401049751,0.6798861164501877,0.7785930598111805,2.8016639164964428,4.782977494915286,1.061894035754787,0.45522625892257,1.154620989907506,5.934354702509216,2.2954978434544664,0.48571878692486486,2.4955191118061397,0.9908016420544624,5.777660250649057,7.00644575997932,0.2020809661321915,0.4371067602649961,3.1534329771776743,2.9517402972364035,0.18936733446475143,1.8658463469840985,5.596307112224521,13.011530837954151,2.2299529289288853,4.324334440250635,0.5595885507308259,5.913912597804371,2.4720763462538295,5.926246281008347,3.856660225265493,0.4671080486495002,3.491570102923775,1.9477363698408472,0.5412960651757828,2.305974448657803,0.9290999721749938,0.9370150709902132,2.349044646747873,0.07954594106388684,11.147779267637926,6.977096313485472,6.740753264777028,0.32563950657527396,0.16587271482896457,7.45433618288488,5.038722975277345,1.3684196534514224,11.086252836475797,1.0713584463111696,4.496662070307699,3.060783032061818,0.31528054528369737,4.261877694553043,4.354319843675429,1.8197611560899474,3.30763218831284,1.056223343226426,0.4712465309788592,1.310472827310202,0.849272187540016,4.435501034486277,9.774631208041047,6.1848513185490654,1.6827502156909289,1.9328597523491926,0.8821711573855195,4.801546746690191,3.534117055479522,4.059623831871307,4.052504933906748,15.450137284338574,4.540095773699558,1.608922931683585,0.1722224672710568,3.171439504214518,0.3362644680851714,0.3726373652338855,2.7033129688465483,0.9947769787473153,2.537491133312011,1.219213734004108,4.789077528526051,0.5150696430675038,0.006665829580864773,7.970263048138288,0.17026152848442888,2.1130212515045814,1.8839947607742595,2.120259164078579,8.044667131657496,0.05136982595379561,0.0046774290036278605,3.631830932494785,8.71444816736709,1.623742666028863,2.1780486956131613,2.0949667140933457,1.6101332035394715,10.798025982013769,2.632824062667306,1.0334637145856949,2.3070845687055526,1.74082062161728,2.7927930821782425,0.1922030493655767,0.2678891972628159,8.561659943853757,4.345591265940141,2.8000145821425635,5.511557796358101,4.38752677823399,1.0719543322444138,5.647969492034234,0.24710847090174826,4.529901582345777,1.0150358667167054,0.30634513486628545,1.0446341192360693,6.356302934077201,0.1315428790051351,0.595799645674422,9.154930197476993,2.4611292084951044,2.750897112553003,2.823284941052724,3.74458516498053,1.4424672740497144,2.916413771530916,5.902242442536531,5.838476082719449,3.1525033352183027,5.059390155431391,1.037423287562824,2.593224597764579,0.6403617580501509,10.326213190168367,5.471305865562726,3.8775736120080815,5.4121924386290035,2.8870346131816573,0.7603429179411758,2.5835212330923314,6.862024066240137,2.5657613773190295,8.620164293116206,2.8032571691704558,0.2349240713263489,1.7079560598505175,2.0813304709949154,1.3597613539806748,3.933136446176383,4.8599236087699555,2.0754111124672225,5.017854665600671,1.4469636972240538,1.2000933699534502,1.3230468123486476,8.50822689011807,2.6433826413128263,3.317931566093212,9.350424507528338,0.02583783697460264,3.284524864031271,9.520549443127972,0.763229270707323,5.0769634695186365,8.61101862306316,7.334845033998832,7.167781256095253,3.7325527793168116,2.0585665304628895,6.749243030268706,0.6332969344716198,2.641422552398616,9.015150771397899,1.347094997695923,0.8706996915830189,1.034406187391205,1.7917227873359438,1.908730186422141,5.396068823790079,0.7725847780462193,1.939787696138521,1.762687955658432,0.8655260243262597,5.820511344253292,0.928133965726063,1.7796717370163104,2.788005298138203,3.1828335419859437,1.4474659662086313,0.13177277554676614,1.2908396010200964,3.2931258740216633,2.6669044043338275,1.477445762586947,8.000945529581958,0.9667723287809386,2.3249215299821024,1.6160382690792874,0.024481002977877326,2.6992106161605585,3.3346898890033247,0.7721326404364552,0.14157193419319639,5.422165013663412,1.5541392544198525,1.858832489627396,2.353049267785028,4.700438474611966,14.391900355302518,5.084939299047572,1.7828625213523537,2.94887501250158,3.8714921562127684,0.7059949046935322,9.039324699965825,2.2260327692566233,4.018604896171274,4.580803690942507,4.157163587368217,3.0729199409472523,3.2374635037414135,1.7799574193443353,0.06682061885705945,1.7565988190987387,3.9741809397339605,8.368177552438112,1.408502631545329,2.637517570758595,1.1962284658718334,1.4001190013486504,0.43464491138909916,1.9518555358918277,0.8122635066326341,3.163232481453864,5.266724459623002,6.841181223778403,0.49776541484160564,4.238820729479736,1.0348598778199034,0.6286090706080152,2.9541597981755663,4.515474961144097,1.3646379904630592,0.8764410823122799,4.796714912204533,2.413242535146167,3.350526793262495,3.6229254022295185,1.3669437428811062,2.9088010148916137,0.7092043558895,3.9754401352656843,0.8605246536509877,2.269140839137646,2.5291665755307653,0.19121213477026863,1.590964831999231,0.0824957704575573,0.07670060374389705,1.5230365368347347,2.189072475353611,4.25604564034656,0.8705369728888401,0.11149881620448726,1.0556160017204506,2.3836750295537024,4.9416716497788045,5.901739439850836,4.171046742894985,0.9456389190599844,0.7675522838090381,0.21785794712154885,0.364337713277945,1.1996369764543444,1.0688659443831259,1.789698187332817,5.405151744986613,1.464564379433368,3.5918518745295214,1.6548610824134264,3.8181989353990335,2.943670105410027,0.9505120924802578,3.577554024137856,4.031292897574503,0.5173625432409149,2.8256611447260016,1.3329358350925922,2.2856036894995486,0.9937417408873321,1.715718064262031,2.068317170032548,2.5494775752132126,4.240286931514905,3.5432763080816514,2.9554026302943823,6.864076298976801,3.574688571794002,7.487940550371492,8.784189003713283,1.9036449383712852,2.0760652465091476,4.336094931453003,0.6157549651874997,4.809374243641002,5.355126042305352,4.506311367493786,3.090594788537503,1.2698495579381508,1.2272841860673733,0.9284121088576963,4.876532264375778,4.055841313071603,3.730101733521128,6.031493055914726,3.7056647637355864,3.184878518268298,1.03421640763031,1.456373140086777,0.5770352722302752,1.3591063917934796,2.5376071998808234,1.0729630993127879,1.3734726148907277,6.96085278261485,1.1246140505533138,5.208712301167626,3.310710101153544,1.5185348197739452,2.9349540463384,6.580695475576832,1.3046035495829504,6.277465245442804,5.0743999632230805,3.047873662658503,1.6332227292739638,4.6276637330262735,2.524582444626444,0.9327786551593054,1.0543221742226951,1.3450549102696938,0.4896138026979611,1.109691649754278,0.16734278793669288,2.2997374199852425,5.732227441022413,1.224583730986785,5.083717643722265,7.484688583659835,6.526122638267373,4.341932249892919,0.7362086524383593,3.651229006741538,2.3326800481519405,3.8453290588263758,1.8599833984178609,2.820795983490244,2.702662787314067,1.7942508875068515,0.8007919218949167,2.3099338313802518,2.4441255494025573,2.754401150173949,0.615428975832142,3.0984757392390017,2.844068832903145,3.209590598495748,2.801539458216983,3.1392296990659547,1.6783928173333293,3.203190393091547,2.190265202697854,8.106179333430042,3.3334617670078384,3.9278523184718055,2.4741197176782133,0.10191016578536671,0.09456663543265935,0.293880708550114,0.23126520753346627,0.1750895062218188,1.1317290979862855,1.6487487381389707,4.927158751270048,1.9989619675015413,0.09533486715130317,0.17946793607305905,0.06072682910558558,0.42893721101755605,0.30683247466092056,1.689070831655964,1.8325675256729224,1.5396337300378016,7.296580841210937,1.7950786613121072,6.276107058236749,2.737745632856745,0.4498946583545647,3.7868063620975456,1.7131353968030858,4.00630545828439,3.6080569173341086,2.1915727510239797,6.14519320175212,1.1503250591918368,1.6172905595118137,5.502539598333169,1.7850011395697356,2.139129698559476,4.771571050110168,3.338325097157073,1.246626070142819,1.1993915373062976,0.21039071925458994,4.22508185829588,2.6031874514465714,0.08976439677136289,0.85389415016432,0.5252748217152687,0.45590886269725783,6.634512157355472,1.6773708310685238,4.102054705048683,5.085654388993002,3.4512447460946944,4.2998413617223745,2.8883014480482583,4.297028071497027,7.234212277554242,5.300427883534003,9.958065033298261,1.8044537132414094,0.46393423450477256,7.0915812734547625,2.0286544767926995,2.6149147542940523,2.5855655392258905,1.6473974060627568,1.9546217408168889,7.598556270169027,4.187982319900651,2.7358355092447195,1.7373201281212027,0.7311523661546118,2.3880170699880763,5.087804036395637,3.138377000565046,1.770842835640137,5.200962519286224,2.5895819309883974,1.1223038253412279,2.6704788166133198,0.7322087753981288,1.0350761104825028,2.87066105007795,4.820789449501491,9.190874646478594,0.18660917424005188,3.6634023448676873,0.1833768802127058,1.035537047943437,10.901547100045464,2.146533239245435,6.307369338269855,1.6069998829559509,0.7901197998763783,2.9370499680339903,0.5451145140460317,0.4525458259827433,7.752290315761148,2.6149747837605024,1.4425566513949297,1.9965272204802815,3.219770654031268,2.1195324721880318,0.6752039828200561,3.0491938818138906,0.7467110948147717,3.2114673202562583,0.9937203816711342,3.2512887259301184,2.8926602802875827,3.4180341397684058,3.103454622052397,2.250409901944497,7.9863935995090545,1.756813628853214,0.07506122138153189,1.3698330694573297,1.011378601074052,4.5438713582171095,4.021516776005527,1.545627812056091,1.4199187031619962,5.6863850785981525,2.034138586447898,0.7836587775644374,4.469497556491996,4.279866468644945,0.4713677266870146,2.3439893620184296,2.919308114822426,1.7197800033691506,9.73563657721049,0.4074725304515597,2.0625956145245516,1.9152187754153542,0.6065575141971596,4.275153877553618,4.64844864474826,0.049626346601635916,2.2444111039342136,4.999319900724984,0.23416057963630044,5.049128276385458,1.1210304119524268,3.7020789676278003,2.5971099462743163,10.074185948558195,4.483283960211733,0.17721838846965612,3.381476757867195,3.6290322171522407,1.6461645065692183,4.648985456247585,0.22322533162383357,1.9422715582695762,2.3188800193426244,5.155630564355465,0.16053151029414753,1.5853300267030779,6.860171655072186,3.9500431283400506,1.1439101086208079,0.43704511026366333,1.4257594389108537,3.2210154167228433,6.483987809057987,7.1345876129440065,2.4354334084372415,1.15690859826654,8.568014389822446,0.32609613638089485,4.359388723299654,0.47935951995605275,2.394513500543608,8.12728758565308,0.9259466171913058,0.6207837432758626,7.634201107790484,4.115085384019085,14.999712335934673,9.239070750047786,0.7111515326560193,0.18520398686953332,1.40062523579693,0.8701004518942445,0.11268620917067908,4.918963066098314,1.338441100884596,4.697621379386838,10.059958870616963,1.8702748070151622,0.6115214711811572,5.654828066044473,0.08020530437248631,4.412015489088605,9.425756017841492,2.8455441815884357,0.5732824659975695,0.6878660814264403,1.7312203241349122,4.744399033624242,8.195069028526627,9.480209250533164,5.197058807085537,1.4472618506127761,0.8615707169853525,5.3585111262322656,7.809604728216507,6.719581335307842,8.993169291807872,2.0277468872390747,5.464123830838205,1.6553382116023645,6.993803427682649,3.02718629713895,1.0891079171959681,6.057994200192432,1.422963099513951,5.144731005863223,0.28029387792316673,1.3103697342695049,3.7992739648697995,0.8556262243734997,0.49719650445737057,2.9234941455314503,2.5217086617879803,3.94476305118066,0.7842824024799906,3.381792016856868,0.16084140546916204,0.828179709334959,6.416900251529412,6.467449277405911,5.188142675253608,6.035247938196776,4.121649577544009,1.2361594916008827,0.264269600496268,3.9969195844476313,13.743864339296257,1.8050039080055391,0.019739255778534148,1.2018832759054874,1.8551740559513723,0.6091395351474775,0.6649651705881452,0.994185293163456,0.9453082963195564,1.9630294570842262,0.566794023893237,1.0268619141956679,3.4912846942198215,3.7280114289197166,10.356742302589916,2.1992456650398373,0.6839977496083267,1.921219563852,1.362767455683859,4.290022738146018,1.2288684055917511,3.0572298993381333,3.3738876816452916,0.11969832408842702,2.4611510419184874,1.0935490603055595,0.6642262920392717,2.4386330807828713,0.8661286484461673,3.576865659671985,1.8715987102357134,1.4468177337464208,0.44727720745580496,0.8158729113273231,2.876244337481994,0.24172185670447746,2.439332507689839,1.22396825044785,0.11419823566413127,2.761077241496495,1.2199230558706355,3.619103092593589,1.9633252423866712,2.1886747861061218,1.7279239469824736,0.213491745794784,2.320637197695667,2.678329473461264,3.1459151297772894,1.8479830135436242,2.335340207368478,3.7192813329095924,11.847547602800287,4.316028316058887,5.671425601088484,4.470528990417632,4.7815615366774535,3.039167231428199,5.467425184569473,2.031606615862308,0.46784956467812,0.9353489569091185,1.6760388773668409,2.220757930204451,7.178431552648843,1.073644648423315,6.310877701327522,3.47700660406077,4.704191300800653,4.307903653059901,1.306439186165648,1.2470785575324792,4.726051054985799,4.459026029154253,0.09877792166439936,2.1348490957964064,0.4776177926142819,1.2943656854824583,4.6898042193594955,1.8177545241653,0.30253183335771,0.1885547373910338,0.10374455825797224,0.5991615840104778,2.7014720538855332,5.6564022696174305,1.5712673430910225,3.143604082513683,9.190172199469728,0.36068723661607843,0.42074174949899473,0.3087362145487048,4.307727129863068,3.7678268292072774,0.546612679379082,2.1559347809261475,1.329849950355365,0.3720001841090235,4.271960319295355,1.3179098657011938,6.28870944561796,5.64430962113502,8.813782091837004,0.6386929703979902,0.9775150789108309,0.4099331578582598,4.860183564758278,2.6039246581021778,11.080012483792492,3.942881390392796,15.582137270043187,2.758217373148184,3.3420217116228645,2.7742818746543487,3.726883678701338,3.054738665797232,10.663136570382877,1.2247188123994455,3.011774715648386,4.62151234390009,3.8383460942239984,3.6966137582477034,9.142875878337314,2.940630888592471,2.188281050393142,2.2057526381154227,0.7054250503770124,3.5590796106648255,2.995314828524248,4.3764009105893065,3.070253632427094,0.5719928572551674,2.364776697252676,6.227003220787796,6.0010304569682456,3.994173355941471,5.579106876789241,0.9153534148969275,2.054887042064686,1.4256918756924317,3.046528615513367,0.8383472420714541,11.785518006736599,1.63579056551832,13.993204612026513,2.959798447833932,4.474260298470057,0.13142368686758804,1.648726414952883,6.369392667587473,0.19889225377259148,0.8772988692973941,0.41205573444837923,1.2794209262193714,6.973615907218195,3.787864003157885,2.35692278330793,5.373109174707992,8.197606160193258,0.5077042450137484,0.27289073181494167,0.8982197457179076,3.308984338406748,2.2825565710001112,4.794296671302695,3.6767858680119696,0.5261663396800892,0.9308672866988036,0.2970531038360109,6.917824185946201,5.55361993170926,3.181366478024768,6.207909307552831,0.775473329500001,1.2115614423662016,9.516312607745169,4.409279624299185,8.089181455158332,2.112952169317161,1.9034683185947685,0.0475960734407098,5.803605490942068,0.24947244259188964,0.917642258146524,0.4464297844182671,4.410063085213913,1.6295741834741018,1.52995818713747,2.62655898625991],"p":[0.3851981407866709,0.5863310676569897,0.502713061125168,0.7605065813232186,0.8633570334037897,0.6906329755733516,0.16772003209699382,0.6745925022477659,0.35676336177218015,0.5900788425230858,0.5501825278195311,0.2840141644917398,0.7394237845504372,0.4320160428873592,0.1825237527602006,0.1091768475936965,0.7377150617323802,0.7245446063456702,0.7131833978231887,0.09319390406741146,0.5989226852978091,0.2606793165197625,0.36272344104124765,0.3305488494446911,0.21799317962612585,0.34196682358079444,0.6398078239647196,0.7216385311685314,0.08380924345065743,0.006048778944648614,0.6911225501093166,0.4009014760738876,0.8771975064329156,0.9044157451738051,0.35567256553451343,0.7385482551867975,0.7341429692298449,0.6503380353458803,0.5965289546869323,0.479725804817007,0.5985321285254124,0.8023107964080918,0.12297381730602219,0.4321287402881726,0.5050286476572527,0.2601036294369259,0.4767576420849684,0.8892343925467607,0.4202112558968838,0.11208697924211863,0.8181143827542536,0.8871872817010023,0.7544719910162758,0.6085203902295395,0.09348358776989829,0.541600180665994,0.20812103514677216,0.8643239910519183,0.7091319633146744,0.9807673093155009,0.4506136164573764,0.17216761724710095,0.8724626717195565,0.908674485138939,0.007504430077036828,0.8227150611745548,0.3767616562054821,0.40686488617626204,0.14791218633131753,0.9915769436829169,0.015044498575106813,0.4208030866143344,0.5209979154565676,0.07095110439274843,0.3371448124134828,0.0019491858032854026,0.7918077952151357,0.7841805222777323,0.4224205891536468,0.20423005478035172,0.7279512098600311,0.1998792256828139,0.8047167049297501,0.8495892216778993,0.25176581791408226,0.869790860671189,0.20041256040630806,0.25313641977424717,0.7440393183638512,0.8667251169980501,0.4053928793806898,0.08922894656098634,0.00020471229020380122,0.15411389446122703,0.5027308313067611,0.5814010258097291,0.9064525226453555,0.14547776447111826,0.31928884175508787,0.6367777425697956,0.21614665569022895,0.385765533239927,0.2398218972478483,0.6685817163573595,0.10578145943732542,0.8967689866308275,0.6348090295559328,0.5101923191258959,0.2405832768586369,0.8771650490099177,0.29646447868044823,0.30171822587508923,0.24391411280060926,0.09933274526005786,0.32825414391063146,0.5739835078143214,0.4895063304793519,0.843055166810478,0.6888504894769492,0.5527762548918853,0.2992193801011047,0.3844928584905021,0.41098139072116635,0.4755279196500237,0.08756005015567814,0.2307705260082329,0.8198375755943039,0.7125546580956159,0.965987485836542,0.26822121423676526,0.5010435526360151,0.8380828097898916,0.05085543613233323,0.7319311073345875,0.878494696108741,0.11253868813453782,0.46729608503064024,0.6330943263059627,0.1007663836513164,0.7407357932121341,0.5992454388743806,0.7457346165922905,0.062421730742918013,0.8474106364419556,0.7360425906314172,0.795959611959278,0.16142731390985743,0.5749342319653832,0.8359253420107007,0.056887151582125206,0.8839773855527722,0.00508292076937189,0.9319584927915923,0.3232395273209141,0.9175193351865407,0.7954366065106915,0.36637029936421306,0.7523061116559919,0.9240324042507266,0.4729958701953745,0.03706605240303884,0.30920803568166266,0.515404022911796,0.5440186744793447,0.5725830162059355,0.32874002134467184,0.2906898722674105,0.24129661834958527,0.43037970139061654,0.792102794341565,0.7368394148322279,0.17164999986412877,0.4557728000887249,0.7701477709587952,0.5167650821667442,0.7493514244802628,0.4581102917854001,0.5262977807753875,0.31931086233024786,0.000958705988533648,0.21239134428455952,0.8362298675434325,0.9437318252656213,0.71999579731328,0.2696449830139813,0.2948829362431524,0.3876406019841683,0.868021883275468,0.43896632930748414,0.3623908137646099,0.46720414677411815,0.7498981812604246,0.5281322511442461,0.9463914313835087,0.9987901858635928,0.8260881724624995,0.3620216739392841,0.25098025178847694,0.8326324654098494,0.03988854373339712,0.41559211225226744,0.6549016987557905,0.6556494310133922,0.21197330670395576,0.06702269422409168,0.05703558450523194,0.9408929991362085,0.10864869812468503,0.7246859386123998,0.8338829587600707,0.41090797926156974,0.8709034112608258,0.6362813180745914,0.006579749061090601,0.3652854209037004,0.25635649715667674,0.17777891159978854,0.0029243255300779314,0.22285848415744525,0.5227780338819026,0.9876871795200803,0.47765139814853264,0.6969021355486134,0.47697713574900225,0.5123267220080714,0.858001122562718,0.5591512108348629,0.28541002380546465,0.15497588402571605,0.7445467813636593,0.650402333701152,0.035446437543863896,0.11953466443783012,0.02811001714952477,0.1073235663006189,0.19684364825309575,0.8942734387824582,0.9571070538257747,0.892291421802744,0.6003960901750414,0.6688734461508681,0.32625478961393695,0.8286493450021262,0.6189655359916519,0.7377056399245288,0.9721996608630101,0.13996611486966026,0.8024356081940229,0.2737039073683094,0.5810252100634219,0.7594652615033057,0.7099205400244057,0.357704465215938,0.7063857891891885,0.07651634005023422,0.0929256136430825,0.07041435071891655,0.35350751511873946,0.8226312811578045,0.9018895594128042,0.5490251879320709,0.1332331881987905,0.5844766156504084,0.4458337682069766,0.4811802409202319,0.2483065396827535,0.7228216770815816,0.843372705062341,0.9915986272570849,0.9166592403229856,0.1599315615521768,0.5737925213847019,0.6063192395575339,0.3234209893768081,0.5399027881725824,0.19537222617239447,0.34781481332636965,0.6910825172129371,0.2472927412916488,0.6681211255110122,0.49909546694108164,0.7373324451835894,0.7614233592541488,0.2558971652902895,0.3579979159363216,0.9117995784251554,0.33915547156879033,0.8363167991609168,0.07236303138433842,0.08600778123289499,0.3604770517404201,0.8341434489541284,0.5436166046861866,0.10058326619592273,0.2495302135099975,0.5206245593522829,0.9697357749128381,0.9426275178708987,0.4314025158644792,0.16040824142097532,0.4426823542967284,0.603317981771587,0.07756485063530394,0.013137119516998697,0.8498371803220544,0.8233291411789998,0.915426585833164,0.7942407467808796,0.5081319837567952,0.9877456519623067,0.8630959988285902,0.04437242155105592,0.4210379143612444,0.5166265421351572,0.6221351342599524,0.3708743388867186,0.773748890299433,0.23664834556835812,0.06786773505598576,0.8915371209775387,0.44610913080674797,0.229383412528678,0.5083179115505989,0.2534242942935012,0.07241254213503767,0.5415946136545937,0.7752957144877726,0.8201636816606577,0.8442012907396239,0.8709204151910366,0.1934335170262731,0.47640501378690736,0.0346396028343261,0.981494122633751,0.6504793450499387,0.2826214730787937,0.5672410402165169,0.9179191779511633,0.15801259728918304,0.5197372621934544,0.7651676734490611,0.2980633473475951,0.7867463081391046,0.4731241857495092,0.42428786010209096,0.5854441166138074,0.4266870243974601,0.34432776419143085,0.38894837826267237,0.44949827648882645,0.7237525211685121,0.6176642672756671,0.17008707386380095,0.09145834658682195,0.4079396850679158,0.7779768007995358,0.3643979523506875,0.7447725953753834,0.9323756187187813,0.02839875575590134,0.3085270277609722,0.9063972090326347,0.12087393747505115,0.955442244208403,0.9423361709958207,0.8891771253725296,0.9169966853239315,0.5221512952430141,0.16948207007817606,0.9610565518728453,0.3596940496600558,0.7453628959327709,0.8469827409030339,0.3630096807760812,0.5362843391016638,0.39778706772943173,0.8338356859383595,0.2282323966707278,0.5751549920921681,0.4449591918110576,0.3445480182778411,0.3344351141502615,0.46009049057066465,0.608817402775953,0.0638125605947879,0.19680449349414175,0.6326943038469972,0.9899754643013963,0.3912111573085051,0.030562543210647775,0.8126106936491226,0.20733810947657938,0.8886351438573126,0.25140981364640913,0.7754209189064838,0.13620865334445598,0.24718505299897764,0.51574329995423,0.1300201273918722,0.9291702622557516,0.2756879914603847,0.075153607208293,0.2633438056468582,0.7087043106398574,0.4128499571476403,0.2564221499008503,0.2967944161732361,0.5320325146022802,0.9895626146181875,0.6888853354652416,0.22576223439354992,0.2555318503869226,0.3128136548873157,0.2422227056020656,0.8182650167794232,0.854793443871396,0.9580060294633244,0.8455297079925213,0.3498544063215727,0.7365325683823114,0.2979408809492534,0.9019298595773155,0.06916063051411236,0.1876126462523786,0.5106204487668986,0.8843838768084074,0.5770080194338096,0.1391082511218571,0.18528226311863705,0.6150172735722284,0.5275542192009739,0.6294342146464749,0.04028930156484489,0.21343953117698478,0.6552551090229146,0.661036788739636,0.0850927029084192,0.41461741895528004,0.051419323798935324,0.08855204283981699,0.18676512684901603,0.3537299630978108,0.1915753884218272,0.815433289519786,0.8074083738669657,0.39625190869792637,0.789721984961925,0.41726901729168286,0.6536163639576122,0.18485445830924063,0.4493438372891434,0.31370559949944177,0.40083710138248585,0.44528694407205327,0.8921560510393778,0.03706817297316323,0.2256073723508114,0.11154746406980798,0.3965575519074789,0.2632689841972682,0.09543723552073158,0.6880060984302643,0.13501918644692146,0.45208590669964877,0.11001497884769851,0.4828885430229719,0.6038009620731282,0.710999368741277,0.899111724068768,0.081588196976492,0.8367565048865708,0.19542455689991334,0.18290377885939813,0.11826949958421618,0.5359366645933599,0.12224973967501729,0.8572237708115242,0.22986109051623105,0.5450204314209868,0.09954157032576894,0.25301399630595056,0.6969284121446444,0.02100918740580382,0.5319285716667379,0.8230756637026537,0.1954819985444698,0.7668308955437309,0.5867677681845278,0.15809109555430267,0.1682172481134685,0.6618070609465709,0.9339570971084139,0.23928810473336282,0.32331064605335813,0.40857547376531866,0.25860324295367954,0.9728809281094255,0.29655205245691696,0.706958992194588,0.8315767831874581,0.46967979081349553,0.12325564470541761,0.7359333343599495,0.32026554441546407,0.8894608250193345,0.4512247781986498,0.709873461854164,0.3250437764212257,0.16069289825234812,0.6366966894826582,0.3456889402016248,0.4673641472169796,0.5658938761710917,0.2973470104058533,0.6164013744859842,0.26858734028690545,0.46671441742326447,0.7444092715405002,0.09012524597930316,0.9397881322914039,0.6571673254862649,0.16615629108919094,0.659764918157316,0.5080556234663776,0.6666090551831123,0.1488603662348167,0.6902683326294416,0.33617862785066865,0.40112719652370044,0.3213593690470018,0.7096624247039935,0.8317491707574642,0.6755480503516385,0.8463129639302538,0.2170066649633109,0.17217989554325586,0.4906764877391643,0.19458433379311568,0.18586506422443505,0.263239959023543,0.039150111147495004,0.17320791378969758,0.3314988848132967,0.39933373785866655,0.2984972912651225,0.8391756121834271,0.19198008189921123,0.6846869754740967,0.9667262959926282,0.9870069427025603,0.6047404733094703,0.04997330683029788,0.2974151320673719,0.6207836220207399,0.4266514162732209,0.31860758306681736,0.459558669778547,0.2864401283160498,0.06652801485402327,0.9282712963493478,0.7302973048414272,0.5030907002742726,0.6694225668344904,0.14050953160870927,0.19783295397417433,0.22960109523728112,0.2989384741152534,0.20746870616988722,0.43416262238989756,0.17626700723613076,0.2228163320854808,0.27557274509099394,0.8440403431961943,0.22280996294226862,0.36174751127451854,0.11539560861856302,0.30277757030128516,0.14434922956569074,0.020335945539475375,0.6268527249270153,0.2544875475429538,0.0339488106913437,0.6115225415521559,0.5724287091457287,0.07705809657472984,0.435053305658307,0.4872628496308573,8.154111358416039e-5,0.39637059364400495,0.8279398273356182,0.4583085808753464,0.8038487742204783,0.23412480817297143,0.6682150783782457,0.6767734823182929,0.9869075110255565,0.9661235916272812,0.3412754084052225,0.6630080315453541,0.5724742152963977,0.32036013902264826,0.3576199157863209,0.3397873360511947,0.588819041026245,0.041170562398522126,0.4337858503768195,0.8406500006609068,0.4771303860497269,0.17143811053341418,0.6206486143426888,0.6671596200235637,0.2672533496693792,0.1626219934898676,0.3487095549272383,0.5223570382531173,0.44623664308277844,0.07364843633294016,0.7112368076591153,0.03361413604171726,0.9326348433069549,0.6964606263888697,0.6791673024124953,0.7477775439892205,0.6535214819784729,0.4500988966395907,0.9315481637715732,0.7507102973215802,0.5953436433071075,0.7463460132922204,0.8829488943815285,0.9621240342377806,0.5358384970266443,0.7875818773622643,0.9039147278480155,0.5738599623613523,0.2962945182973271,0.41031142112287866,0.25173558174549804,0.09866254195965829,0.8089150874920541,0.475376943808834,0.6653923841582325,0.1372883576303825,0.05781071496004708,0.1354218291822813,0.6327034039641195,0.1837848900254826,0.7568669486423529,0.8949591792335412,0.152704526524708,0.10630299040967861,0.3382199943378703,0.8337109342590594,0.6930470957497745,0.2502194225395544,0.40068195070601154,0.8636951898786969,0.5429155404845927,0.8271282909246971,0.8016184449124282,0.6021739691281427,0.9234555556174917,0.3349607614348298,0.6256666676125091,0.05269177782244516,0.02972157551940091,0.9206769453229127,0.9203807492239202,0.015481265011745515,0.7483849448254278,0.19741812032253558,0.225743330157816,0.18098108365289223,0.24973603729340477,0.2828711503595127,0.3838774314693121,0.21678401146965398,0.0312518360079741,0.4058892813588748,0.0807509380903404,0.890995660646489,0.38731836208279713,0.29386215907338564,0.5255883838502848,0.16046271755077712,0.9745231798867231,0.435803940487677,0.5545475958841377,0.4344553042679231,0.13010788597559841,0.843300432714625,0.590869345621573,0.8757271492250729,0.8639383582454014,0.541898223817949,0.30550464763579366,0.38133911275909527,0.5714072433119681,0.5082978608240236,0.0472959508804649,0.4278627039257499,0.5812115072421535,0.24345739918799691,0.9928006260550906,0.028960288723193894,0.18481372672550056,0.7417162034533071,0.3865745074951348,0.423755382560812,0.5973983733289217,0.5065883518687344,0.2874269851462654,0.41973072068814243,0.8154587082861002,0.792410516161302,0.18721896246717962,0.3993787036595713,0.7522461498485469,0.8985007759809529,0.7116341131727855,0.4911992838221553,0.9312179968849739,0.6575180710797821,0.1365172834557591,0.7024322301420935,0.010013255344471617,0.15264210354329255,0.12373305333435436,0.6264027292095287,0.10813426066197063,0.7424397546373158,0.6415000479034245,0.9598266132092446,0.14644393130623912,0.38284685702033117,0.37345167928990586,0.44860809787428235,0.6626998446097416,0.6590660975533775,0.25637070838664133,0.37492289498879194,0.9008084376698904,0.19574553061383226,0.5087147824612832,0.3650268167430233,0.287495939610001,0.9947844103751964,0.04823908552975675,0.5091031123392924,0.9947822508651383,0.44955202732212296,0.9912928929748792,0.9609779373584324,0.34552813683864914,0.7103132636953393,0.040268846998250174,0.8712483468184633,0.855137843469062,0.49449286741626763,0.48940735003500113,0.6402805621468513,0.872218650531253,0.4375887301725001,0.008579774387361239,0.869321604290243,0.0027509058190329228,0.5425221264284905,0.9759789526342826,0.32315441470074857,0.06627956127690449,0.753547091774025,0.20637018734666635,0.5053515150047287,0.8635601375915503,0.9509935990944913,0.6083659183209402,0.7743037346898534,0.24523208489570347,0.4692584791615204,0.7940482770436075,0.8549578294204838,0.898417650945623,0.3665125050691149,0.9470108676933096,0.05547420637813194,0.711874499605994,0.2557388547365196,0.6128167799976001,0.6733116198553386,0.2086661598123143,0.6601068554312668,0.6797221907918622,0.04052074227166602,0.9460029255681879,0.16885227089336174,0.053250758561402156,0.23005973203325047,0.46098918301841163,0.5717739469796348,0.1778511285772193,0.3472595859448875,0.290222057856667,0.9509668501137336,0.5820406063292891,0.9561770324830916,0.5379961827465383,0.8850541223842852,0.43916534982250566,0.2896782016778561,0.23726599656123293,0.643246301524788,0.9783789893751487,0.7876002922469472,0.04595346686880131,0.6318243105433434,0.6696523743702494,0.5962289017289941,0.07223686081034919,0.5629867149909709,0.503884368404049,0.5065179153502346,0.43658396750898554,0.6729088351774559,0.2610887316900701,0.5362363943512476,0.982032348744138,0.9245345388012363,0.7367852006845423,0.369686360590721,0.08742649682963055,0.954296230730092,0.07032327769485547,0.4088055701866453,0.37260446375007006,0.40312378775127944,0.16453258110668623,0.040717877620906284,0.10605125725864473,0.5381154641778911,0.5861610747562882,0.31386335751337757,0.1944160571148239,0.060270742759429785,0.016093460630961065,0.5895440052871883,0.3582020235045169,0.04821432113106994,0.44410084050901677,0.25679763363898567,0.23772364676644298,0.9233932387107757,0.36212529867638055,0.55744625555962,0.18098469171183473,0.6512531862571309,0.9529356684436634,0.33717310477400186,0.9063240075434573,0.42784523498989113,0.4610375386789862,0.7242179072461323,0.7596318332495329,0.8062626406879476,0.9556209055166287,0.9384331073241552,0.5350424861615828,0.3955871314714925,0.7566672401272938,0.5817899140732745,0.811343732426264,0.7144842980096195,0.0499368499763817,0.1472340766712712,0.38711266224040775,0.6519667194629368,0.8563845861428834,0.7325455901461881,0.9012505790697831,0.8713843037887707,0.8095019587277097,0.4806687962890348,0.13157910478950763,0.8078860678918947,0.6247300308824297,0.5026145470271925,0.03082674047384848,0.8730811767001649,0.585768983896884,0.06578421055135686,0.7106513565577735,0.15623509992472462,0.0631198408602418,0.8158023041064124,0.6339711065042846,0.7078201848777685,0.9170914949442373,0.6486092137019697,0.674527201528389,0.7788947671652793,0.9639017246368629,0.02560891682189581,0.10025332193967862,0.7921439438056168,0.8687386567738289,0.6984822690607118,0.74887709436727,0.09989394578595956,0.15002051785045656,0.010521699484894453,0.8441858699718829,0.3138951812443942,0.6466971372806123,0.8289247727343865,0.8015311474519906,0.08353792207828903,0.026383158895872283,0.7973396764326215,0.7448799701904645,0.5524937581826443,0.957039572357022,0.42649724463797734,0.9977053211325031,0.9550357844690147,0.6676595475971925,0.47165393362084673,0.34187994715225356,0.8338699914723431,0.9865129884442454,0.7635165033404576,0.423589441384681,0.8229590957197419,0.4455931598124103,0.48854956528765614,0.9386027435870226,0.6648941462432072,0.1383699311166362,0.09512327355206862,0.28320895090881826,0.9729954762028525,0.23716482907891812,0.651967561285584,0.28575420595283174,0.9096222084283614,0.42104251994166275,0.6881600821136671,0.6746880461033886,0.5667761900908419,0.5277833770163156,0.1942697062728096,0.37540886266443874,0.08310916309274186,0.47492002484816176,0.2327755752030225,0.9803790870212445,0.6881715113441678,0.9816265652585261,0.5669998024161609,0.5959799110045063,0.1652837554272093,0.40929118653018315,0.9486328945932645,0.5109337415376294,0.13931966533387707,0.023779696750657164,0.1939327206657775,0.8488236520330354,0.5496788546006661,0.11004163698145564,0.7096996811980334,0.9238588584471539,0.36725973103596155,0.7489830410413427,0.17049728670810693,0.5400246211882735,0.4436153691720581,0.6543789886353419,0.30964283083394406,0.5859172294503918,0.16864208638687672,0.7883445876992268,0.7126861966565585,0.7667286695299553,0.2205405249793957,0.8409560586358893,0.3309681109963587,0.11062123595649243,0.9050298048662873,0.6533598875384086,0.7469345858006415,0.10937236618673851,0.13448924610158675,0.19354528066281196,0.5458674760684314,0.003316272582626567,0.07079989891951866,0.08844127338177232,0.4233047547523858,0.14944870157655044,0.4785365267947004,0.4342215760529311]}
},{}],84:[function(require,module,exports){
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
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var smallScale = require( './fixtures/julia/small_scale.json' );
var mediumScale = require( './fixtures/julia/medium_scale.json' );
var largeScale = require( './fixtures/julia/large_scale.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var quantile = factory( 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1.0 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN );
	y = quantile( 0.2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `sigma`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `sigma`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( -1.0 );

	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF );
	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `sigma` equals `0`, the created function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0 );

	y = quantile( 0.3 );
	t.equal( y, 0.0, 'returns 0 for p inside [0,1]' );

	y = quantile( 0.9 );
	t.equal( y, 0.0, 'returns 0 for p inside [0,1]' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given small scale parameter `sigma`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var sigma;
	var tol;
	var i;
	var p;
	var y;

	expected = smallScale.expected;
	p = smallScale.p;
	sigma = smallScale.sigma;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( sigma[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given medium scale parameter `sigma`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var sigma;
	var tol;
	var i;
	var p;
	var y;

	expected = mediumScale.expected;
	p = mediumScale.p;
	sigma = mediumScale.sigma;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( sigma[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile function at `p` given large scale parameter `sigma`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var sigma;
	var tol;
	var i;
	var p;
	var y;

	expected = largeScale.expected;
	p = largeScale.p;
	sigma = largeScale.sigma;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( sigma[i] );
		y = quantile( p[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/rayleigh/quantile/test/test.factory.js")
},{"./../lib/factory.js":78,"./fixtures/julia/large_scale.json":81,"./fixtures/julia/medium_scale.json":82,"./fixtures/julia/small_scale.json":83,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":53,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":61,"tape":161}],85:[function(require,module,exports){
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
var quantile = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `quantile` functions', function test( t ) {
	t.equal( typeof quantile.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/rayleigh/quantile/test/test.js")
},{"./../lib":79,"tape":161}],86:[function(require,module,exports){
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
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var quantile = require( './../lib' );


// FIXTURES //

var smallScale = require( './fixtures/julia/small_scale.json' );
var mediumScale = require( './fixtures/julia/medium_scale.json' );
var largeScale = require( './fixtures/julia/large_scale.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and a valid `sigma`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a negative `sigma`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.2, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.8, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `sigma` equals `0`, the function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var y;

	y = quantile( 0.3, 0.0 );
	t.equal( y, 0.0, 'returns 0 for p inside [0,1]' );

	y = quantile( 0.9, 0.0 );
	t.equal( y, 0.0, 'returns 0 for p inside [0,1]' );

	y = quantile( 1.1, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	y = quantile( -0.1, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN for p outside [0,1]' );

	t.end();
});

tape( 'the function evaluates the quantile function at `p` given small scale parameter `sigma`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var i;
	var p;
	var y;

	expected = smallScale.expected;
	p = smallScale.p;
	sigma = smallScale.sigma;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], sigma[i] );
		if ( expected[i] !== null) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given medium scale parameter `sigma`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var i;
	var p;
	var y;

	expected = mediumScale.expected;
	p = mediumScale.p;
	sigma = mediumScale.sigma;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], sigma[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile function at `p` given large scale parameter `sigma`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var i;
	var p;
	var y;

	expected = largeScale.expected;
	p = largeScale.p;
	sigma = largeScale.sigma;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], sigma[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'p: '+p[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 1.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/rayleigh/quantile/test/test.quantile.js")
},{"./../lib":79,"./fixtures/julia/large_scale.json":81,"./fixtures/julia/medium_scale.json":82,"./fixtures/julia/small_scale.json":83,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":53,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":61,"tape":161}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":87}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":92}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":91,"./polyfill.js":93,"@stdlib/assert/has-define-property-support":14}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/assert/has-property":21,"@stdlib/assert/is-object":43}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":95,"./polyfill.js":96,"@stdlib/assert/has-tostringtag-support":25}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":97}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":97,"./tostringtag.js":98,"@stdlib/assert/has-own-property":19}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){

},{}],101:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"dup":100}],102:[function(require,module,exports){
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
},{"base64-js":99,"buffer":102,"ieee754":128}],103:[function(require,module,exports){
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
},{"../../insert-module-globals/node_modules/is-buffer/index.js":130}],104:[function(require,module,exports){
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

},{"./lib/is_arguments.js":105,"./lib/keys.js":106}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],107:[function(require,module,exports){
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

},{"object-keys":135}],108:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],109:[function(require,module,exports){
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

},{"function-bind":124,"has-symbols":125}],110:[function(require,module,exports){
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

},{"./GetIntrinsic":109,"./helpers/assertRecord":111,"./helpers/callBound":113,"./helpers/isFinite":114,"./helpers/isNaN":115,"./helpers/isPrefixOf":116,"./helpers/isPropertyDescriptor":117,"./helpers/mod":118,"./helpers/sign":119,"es-to-primitive/es5":120,"has":127,"is-callable":131}],111:[function(require,module,exports){
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

},{"../GetIntrinsic":109,"has":127}],112:[function(require,module,exports){
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

},{"../GetIntrinsic":109,"function-bind":124}],113:[function(require,module,exports){
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

},{"../GetIntrinsic":109,"./callBind":112}],114:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],115:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],116:[function(require,module,exports){
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

},{"../helpers/callBound":113}],117:[function(require,module,exports){
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

},{"../GetIntrinsic":109,"has":127}],118:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],119:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],120:[function(require,module,exports){
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

},{"./helpers/isPrimitive":121,"is-callable":131}],121:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":123}],125:[function(require,module,exports){
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
},{"./shams":126}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":124}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{"./isArguments":136}],135:[function(require,module,exports){
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

},{"./implementation":134,"./isArguments":136}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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
},{"_process":139}],138:[function(require,module,exports){
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
},{"_process":139}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":141}],141:[function(require,module,exports){
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
},{"./_stream_readable":143,"./_stream_writable":145,"core-util-is":103,"inherits":129,"process-nextick-args":138}],142:[function(require,module,exports){
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
},{"./_stream_transform":144,"core-util-is":103,"inherits":129}],143:[function(require,module,exports){
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
},{"./_stream_duplex":141,"./internal/streams/BufferList":146,"./internal/streams/destroy":147,"./internal/streams/stream":148,"_process":139,"core-util-is":103,"events":122,"inherits":129,"isarray":132,"process-nextick-args":138,"safe-buffer":154,"string_decoder/":160,"util":100}],144:[function(require,module,exports){
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
},{"./_stream_duplex":141,"core-util-is":103,"inherits":129}],145:[function(require,module,exports){
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
},{"./_stream_duplex":141,"./internal/streams/destroy":147,"./internal/streams/stream":148,"_process":139,"core-util-is":103,"inherits":129,"process-nextick-args":138,"safe-buffer":154,"timers":167,"util-deprecate":168}],146:[function(require,module,exports){
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
},{"safe-buffer":154,"util":100}],147:[function(require,module,exports){
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
},{"process-nextick-args":138}],148:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":122}],149:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":150}],150:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":141,"./lib/_stream_passthrough.js":142,"./lib/_stream_readable.js":143,"./lib/_stream_transform.js":144,"./lib/_stream_writable.js":145}],151:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":150}],152:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":145}],153:[function(require,module,exports){
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
},{"_process":139,"through":166,"timers":167}],154:[function(require,module,exports){
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

},{"buffer":102}],155:[function(require,module,exports){
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

},{"events":122,"inherits":129,"readable-stream/duplex.js":140,"readable-stream/passthrough.js":149,"readable-stream/readable.js":150,"readable-stream/transform.js":151,"readable-stream/writable.js":152}],156:[function(require,module,exports){
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

},{"es-abstract/es5":110,"function-bind":124}],157:[function(require,module,exports){
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

},{"./implementation":156,"./polyfill":158,"./shim":159,"define-properties":107,"function-bind":124}],158:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":156}],159:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":158,"define-properties":107}],160:[function(require,module,exports){
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
},{"safe-buffer":154}],161:[function(require,module,exports){
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
},{"./lib/default_stream":162,"./lib/results":164,"./lib/test":165,"_process":139,"defined":108,"through":166,"timers":167}],162:[function(require,module,exports){
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
},{"_process":139,"fs":101,"through":166}],163:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":139,"timers":167}],164:[function(require,module,exports){
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
},{"_process":139,"events":122,"function-bind":124,"has":127,"inherits":129,"object-inspect":133,"resumer":153,"through":166,"timers":167}],165:[function(require,module,exports){
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
},{"./next_tick":163,"deep-equal":104,"defined":108,"events":122,"has":127,"inherits":129,"path":137,"string.prototype.trim":157}],166:[function(require,module,exports){
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
},{"_process":139,"stream":155}],167:[function(require,module,exports){
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
},{"process/browser.js":139,"timers":167}],168:[function(require,module,exports){
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
},{}]},{},[84,85,86]);
