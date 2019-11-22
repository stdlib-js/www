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

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Returns a function for evaluating the moment-generating function (MGF) of a uniform distribution with minimum support `a` and maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} MGF
*
* @example
* var mgf = factory( 6.0, 7.0 );
* var y = mgf( 0.1 );
* // returns ~1.916
*
* y = mgf( 1.1 );
* // returns ~1339.321
*/
function factory( a, b ) {
	if (
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return constantFunction( NaN );
	}
	return mgf;

	/**
	* Evaluates the moment-generating function (MGF) of a uniform distribution.
	*
	* @private
	* @param {number} t - input value
	* @returns {number} evaluated MGF
	*
	* @example
	* var y = mgf( 0.5 );
	* // returns <number>
	*/
	function mgf( t ) {
		var ret;
		if ( isnan( t ) ) {
			return NaN;
		}
		if ( t === 0.0 ) {
			return 1.0;
		}
		// Case: t not equal to zero
		ret = exp( t * b ) - exp( t * a );
		ret /= t * ( b - a );
		return ret;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/exp":75,"@stdlib/utils/constant-function":110}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the moment-generating function (MGF) of a uniform distribution.
*
* @module @stdlib/stats/base/dists/uniform/mgf
*
* @example
* var mgf = require( '@stdlib/stats/base/dists/uniform/mgf' );
*
* var y = mgf( 2.0, 0.0, 4.0 );
* // returns ~372.495
*
* y = mgf( -0.2, 0.0, 4.0 );
* // returns ~0.688
*
* y = mgf( 2.0, 0.0, 1.0 );
* // returns ~3.195
*
* var mymgf = mgf.factory( 6.0, 7.0 );
* y = mymgf( 0.1 );
* // returns ~1.916
*
* y = mymgf( 1.1 );
* // returns ~1339.321
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var mgf = require( './mgf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( mgf, 'factory', factory );


// EXPORTS //

module.exports = mgf;

},{"./factory.js":100,"./mgf.js":102,"@stdlib/utils/define-nonenumerable-read-only-property":111}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Evaluates the moment-generating function (MGF) of a uniform distribution with minimum support `a` and maximum support `b` at a value `t`.
*
* @param {number} t - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {number} evaluated MGF
*
* @example
* var y = mgf( 2.0, 0.0, 4.0 );
* // returns ~372.495
*
* @example
* var y = mgf( -0.2, 0.0, 4.0 );
* // returns ~0.688
*
* @example
* var y = mgf( 2.0, 0.0, 1.0 );
* // returns ~3.195
*
* @example
* var y = mgf( 0.5, 3.0, 2.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.5, 3.0, 3.0 );
* // returns NaN
*
* @example
* var y = mgf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = mgf( 0.0, 0.0, NaN );
* // returns NaN
*/
function mgf( t, a, b ) {
	var ret;
	if (
		isnan( t ) ||
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return NaN;
	}
	if ( t === 0.0 ) {
		return 1.0;
	}
	// Case: t not equal to zero
	ret = exp( t * b ) - exp( t * a );
	ret /= t * ( b - a );
	return ret;
}


// EXPORTS //

module.exports = mgf;

},{"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/exp":75}],103:[function(require,module,exports){
module.exports={"expected":[3.4463270050914215e60,8.236935482262843e44,3.639203167514774e83,4.977850066808273e43,2.298704644376541e7,1.554479369918862e9,3.281155187743956e145,2.6552582214477903e93,2.271996145653517e31,3.1311966159740567e81,5.881647754477183e126,1.1666138653004032e122,4.427101188501874e36,2.0457349860057743e45,4.470281260411073e8,7.0312570507114685e143,5323.22367604403,4.993180410706128e79,3.235695480288228e88,3.223777676800386e64,5.85690033403712e17,6.681902218587885e11,2.726337704919572e45,1.3712415062021298e15,1.4296687728407632e103,1.3871955509495296e123,2.1091531603521927e26,1.842426972576228,1.575388621815708e6,3.71078511738974e68,4.822861937930256e10,5.591252329410616e103,9.099489302587908e20,1.9598158156757233e143,1.0870755030204382e67,1.447672159495407e21,1.0584148908091296e137,8.054894494863775e19,3.883301999977147e15,2.224884016358024e170,3148.1017102595374,1.9816969454700724e46,1.905347494407749e38,2.0836684614397466e132,2.5290902188487826e132,6.2090995544500646e153,3.729227826115076e13,2.4002059959994152e126,6.684875265924518e43,8.425104202065296e36,14.939521819671645,3.4845177778401687e98,2.1773819185012964e11,4.589404881324206e57,2.081751905509972e98,5.165433075835477e117,3.7048277878205006e151,1.871851085437019e140,5.21416569897669e29,9.590010135891714e27,2.3076515108500584e63,42105.325965750286,4.166743686304165e158,4.5169453443598153e145,1.8322500926590346e42,7.96303911010997e189,2.7103021743552918e32,2.990594643745346e55,8.87807425161712e68,1.2658993789825934,3.596198960859304e51,2.25379523043287e81,88.68438830457848,1.4139013467473182e28,1.758169382340202e6,2.3527605242398996e88,1.2868416879886712e40,2.9439626168648137e69,1.0232716092134631e15,10.030542280938796,1.0524611336096512e78,2.477716638071503e41,9.692743180009686e37,2.4270354484225194e45,2.1514447170016171e83,4.973979350520082e55,4.987022036886158e8,721166.9377890202,2.630591117779813e46,3.0309303373726396e119,251.82015179554435,2.733342378290481e19,2.879968085030212e209,5.9931644785043604e112,6.934311835741859e73,1.713450190683408e94,5.911822550455627e48,5.395325839975909e197,2.184245235525719e68,8.699193098733751e14,9.157323383297612e19,2.271512277578953e125,1.7964203069637186e70,9.32735844645063e47,4.12883778552293e7,9.562672172168989e163,2.4910311469672737e57,2.3507658327645856e16,5.650833646281215e146,77361.72097502567,7.852716855811269e32,3.612800601780081e104,1.8365813643265484e13,1.826751836948661e35,1909.8980176248085,2.7957692940836394e96,8.497859440704459e89,1.1312955499283519e78,1.116006376483726e22,2.555500407768318e175,1.820399165978617e177,2.0395078529870512e36,1.904541345926796e64,2.0613498433418927e102,2730.577467945774,8.28319114331405,5.716453032055885e62,2.122235056025336e108,2.7805680936336425e119,2.5760725476598882e34,2.612914125409377e12,2.1638975893807015e71,8.225651251000201e23,1.4773631885437496e22,1.6915928205810587e21,1.0362075635908926e48,2.9448157683156825e30,1.1825653293738053e106,574.5158791613021,2.581978490396093e65,2.832709641750284e7,1.1592554818282916e160,2.2069801789497126e7,7.462758444961295e36,2.2297874584537854e131,2.903882958525618e6,5.043002073518982e100,9.66233383628726e19,5.730341190701005e65,3.0852079092158506e38,12521.665812075435,8.779642087931894e87,2.7706418301406964e30,1.245407747593306e15,1.8406418114651386e38,1.4289919174927892e7,4.097193820186312e26,1.188892272416402e153,1.2002701681445512e85,84.07958547675966,9.03680809805882e18,7.547105280865318e72,6.8307907003675524e47,1552.4950452401597,5.428392049472906e59,1.2726018281028543e39,5.307248459978655e161,2.6578396303195328e51,1.1534421978755213e60,2.0200299870709724e33,6.393943722494191e61,3.002308855742281e17,1.5634294597574759e9,4.479145796498564e13,9.060190386667577e56,6.195811639286925e161,3.250229712806707e89,1.0620789029610738e53,598175.9683420511,2.3240502375088922e21,6.067694360162896e46,4.783039842666672e82,3.578865008405548e57,3.7536166844930687e28,2.4166752960205413e108,2.0585436889940074e111,3.8527002455959473e27,3.7757825648978156,1.3302255559575914e45,4.6208736085755447e79,7.259855560845242e96,2.6866429760691198e23,1.1645878435755391e70,2.6384030519945373e130,9.081444150070568e31,2.3799436726564687e151,2.6448898826152185e30,3.824826417774455e98,1.521789245425824e77,49.13720721878486,3.0520145449856703e94,1.1026502518491216e57,3.2498468513108167,3.110575300472573e9,3.3668713472414376e191,4.285107175237832e16,3.699262020393927e12,7.577476169405153e40,1.7332704678702241e170,2.74643583765162e14,2.5509267750578757e85,2.947687509883647e170,6.334964905235429e171,4.289219407515205e32,7.271003298844826e107,6.109707125199151e80,3.6351086887033336e92,1.3585571756507846e47,4.023432552498657e125,3.8748724223028876e7,2.0173784064260524e74,3.2417657931087308e16,4335.182299148076,1.1103212795424014e71,4.2509944647811496e110,9.242160347897381e41,1.263773868802767e50,3.199960162044446e7,6.112433014200306e149,2.253805972658912e94,1.0294252682188637e17,4.532385067062548e61,1.8022843318879318e124,1.4922914743422143e90,1.3652125364930143e23,4.3423366262208337e8,1.0375648858083837e63,8.002480850024702e47,1.9539479061700687e68,2.437217310006266e11,1.7034573300741273e181,2.527920766206246e59,3.006447786608414e122,2.3653606037393906e76,7.345559767454792e24,1.0894865110220545e160,6.323376574462757e89,6.615453209121371e152,1.342266327820248e125,1.7338501306683472e17,1.5252191150532104e16,4.755863812868541e68,8.716321671666876e229,5.934083844886407e30,3.1845663156022316e194,1.8095701829198349e25,2.8980668484908995e15,2.623060367603851e22,6.824554441707548e33,3.2363221954578193e46,4.553134843538176e106,1.3280676420916496e21,1.3574133468239769e131,5.056537085566211e17,2.374398732520488,2.4416462087582483e59,5.2498423235143135e10,9.374795038441285e108,2.684586141428066e17,2.0255153485244854e74,3.395817175020367e77,1.9563521155991375e67,2.385319533522536e64,1.8040315604432516e65,6.6671456705550825e65,2.109128950293069e11,2.8459093111178955e22,2.920015327159117e75,3.241632657121715e106,5.787198635090374e52,8.960380680175732e117,1.287188006537728e28,2.9984948659978065e9,2.178042309724368e32,3.8003776258077545e38,3.2549037991364314e17,3.3044004208101204e151,9.768387785299436e197,6.652477535919687e141,2.1104050724832484e13,2.2519824513511198e30,8.886931854503754e46,2.502021268400302e111,3.356901443509749e194,2.5656379939176445e89,4.012276393017217e66,4.018680998981421,1.4718530194812848e189,3.1282171268378825e167,5.048150146886608e109,1.9790772864434503e40,2.1642568588646788e24,1.2326099958894821e21,5.9078779619536325e75,4.1730372976258426e99,3.688032837816906e173,8.882888479784161e8,6.817578962391847e38,1.8635371195847997e24,2126.9841601696667,6.492778898075675e61,6.086229544850051e51,7.330854295516402e41,5.831259174287086e97,9.940969128278992e13,3.988717596084982e73,1.0271627335326094e35,1.9578976975346115e70,1.801234496712917e39,1.9596059668990014e173,5.702699791607315e45,5.073998569506827e44,8.057166490297499e54,4.854809866779905e69,2.46242861865175e66,1.695718076288609e28,2.932088210650803e21,4.676907375967414e126,1.4995417824966524e22,1.6505769539660285e55,6.644077419680823e48,1.0333515277548236e40,4.791846759762434e74,1.6202083437105497e28,4.2103269008991186e53,9956.618195921668,1.351561317991819,6.4936042843157485e59,4.543604065459982e72,2463.569355791013,1.071796619388001e34,2.2157608806678422e92,9.692241964346843e112,2.6024332684838496e125,7.598043481880982e24,22.7278623571142,1.1638273300684059e7,2.7961562702887445e122,8.23797963396858e31,2.754146837089291e9,3.9715608537983914e43,2.2175052057702164e67,3.7291700652105056e24,2.626666799799383e143,8.752419079886e55,4.462516363743198e75,3.429094337397444e19,929.2822352470622,9.242880580529003e43,5.261791097270214e41,51.8156913951922,2.4506708803632824e84,2.214644280718278e48,3.2481234235938593e124,2.1439264754735556e121,5.0911370331270616e141,1.141453399826289e72,8.574298837339011e7,1.1129441159882272e225,1.5685557672308439e56,2.3114832511692877e81,1.4429562802081582e110,2.7491874526827078e132,1.755462605080733e17,1.557162243340633e20,3.11573424139544e79,4.030913893824758e50,1.2049411827327972e23,4.4572500386168715e15,3.170165835794146e39,5.295729836119007e22,1.603125380436345e13,1.7971536902789815e67,1.86388845484921e37,1.6191417700797586e130,1.7969002076403157e100,3.858680202347545e163,4.3915232523772845e101,1.0557658637167568e106,1.3514181389997715e12,2.63547015519263e83,1.041567007414266e31,2.93203622725178e98,4.945596671515766e26,7.075471359961407e48,9.774523661192734e55,2.2266056073129044e109,5.645805955216579e16,5.398998129933702e27,1.328248436334819e91,2.5030175292445766e75,4.398205074036576e48,2.1880250399336926e24,4.795577302449538e10,1.79380379552732e70,9.115579925392643e32,1.3441409778274953e99,4.7947998103089084e48,1.5128074864004693e30,7.760517500150738e68,5.938692069485166e81,15.97317891512679,1.7192343841049782,1.8354236909238172e48,3.610451529976663e89,109670.0143681028,1.9003693404887395e53,2.4628413479491513e35,5622.3846189393935,4.515827526875598e9,1.3502453171985496e71,1.2717932129201262e222,9.462661743122359e138,5.298605800718977e119,4.007529528084901e102,6.419878785783457e189,2.7881382477300624e94,100.90690369367226,8.859068830644863e6,1.3273265400463112e66,4.008236592782865e170,5.055947003020957e76,2.025421648810807e20,3.0808383930641775e48,6.270129464217026e50,2.241778653237162e46,813372.2017206958,4.332000440214459e58,1.8831912807683678e47,9.706576995742719e119,1.0264738092677893e66,93.09389052303258,9.052617110848195e78,43130.7722972522,2.206505069920693e52,1.452806972173838e11,6.178823894706613e10,5.829897001005078e49,3.9655755084590654e21,3.021781322368912e11,3.553548827069408e35,4.2580376333764675e213,2.4097401596134505e50,7.429243518922005e16,1.8665407182781992e27,102.7789455466895,1.9741965660821448e89,8.173485805349255e30,2.912827915905633e167,1.6781260912251519e25,5.711601162401141e37,2.8593561357005542e54,6.161262938700414e65,9.700396781452936e47,2.07198432485126e73,2.913719036874774e10,6.521907485043243e55,1.1342859125553866e30,4.841444204985963e109,1.3609443166067228e166,1.1997435888656926e47,4.586468595454108e69,3.3839550801279594e48,9.694709195050475e133,3.6176600888067695e23,4.334685205865144e36,2.6090831580941342e110,5.518530133705138e85,2.073694657332999e151,3.0190218704503447e74,2.8360390745512764e194,1.6040174459344406e50,887828.3999901188,7.517574396206687e144,2.9165742164204336e33,1.1428342973695594e21,1.5408875162505487e53,1.0104554362172155e15,1.1626288343773733e72,3.049703361787376e58,1.3723402034936135e25,1.2539860889016848e69,7.137561766702201e144,2770.6582813852992,1.0248275351907077e28,9.663687409204437e163,4.152623374441851e19,2.6279590396169993e71,7.732207598217395e44,6.808000810501093e78,5.2555361270316556e126,2.088771521647478e62,2.0209142636605155e45,4.9803587044208787e61,3.581269245851936e17,9.272038896499881e52,20.139667675947543,7.683898336678035e17,2.6012471286901008e98,3.9641481443747882e62,3.173295204323673e32,4.919778306504408e12,7.262237974573392e178,3.1054398616229703e111,1.88880863493112e85,2.485582713669993e44,2.152131029323205e9,5.860550038018513e92,4.776828572719451e107,1.039485589605743e32,7.09948875463032e147,4.3293052093898455e15,1.0548744108276253e18,1.8077956811498672e107,3.525710865019827e172,2.375000937576375e174,2.5246813244855898e33,146789.38504792645,3.728957255020865e13,6.4516377142008296e122,4.774827400075882e18,1.8858841614867225e7,4.585795801026887e28,3.117325195291564e39,2.220154889611571e15,6.179653465476116e29,6.932873673434186e88,1.123245135766363e57,1.2962025479934932e174,3.335725100341025e36,1.2360613172146762e172,8.995463257484989e136,1.2774285110022603e86,6.9512581576709835e189,2.8074570319194926e145,5.032481421542792e169,8.421271577945801e113,9.902866265356358e29,3.001425676177507e16,3.8943608626104846e34,1.5826855340364601e153,1.1416745595471594e13,7.839083352872669e164,1.3768158316018652e24,1.731393453183322e49,3.5196164337953185e31,1.5966317358447103e211,1.0069022701799123e66,2.760299566841431e122,21.056358861085418,7.39348552414925e114,4.924112362999554e126,1.0106610989316456e7,8.275448936974689e119,1.2666878382962741e81,9.90405912270406e111,2.3856721933547578e173,1.1559937337670265e30,2.0917329799855907e9,5.771536833717043e55,4.139292753604934e58,663.7283812369196,2.664330458036287e15,1.814756847375697e91,8.334235606740969e12,7912.96287672155,1.4353572779981746e100,7.64730155715812e10,2.698250703767691e69,6.867732403604501e7,2.225677227196443e58,1.9290331818979472e8,1.4525289309273957,33079.36996879544,2.4807662383011266e71,4.5056696371580985e107,1.225438048558313e137,8.417518003662752e55,1.7848495781898397e73,1.1955488819930175e147,2.8550150109048315e130,2.1793444751664265e6,3.6047140055143746e26,8.142373534584731e26,1.3472640568090702e30,1.9173328829066722e91,1.2463243206702901e59,2.541333827464681e52,9.725605484319975e131,1.9719687039936054e123,2.374270513778844e28,7.61084114383961e109,2.384046969991844e21,1.394642691071549e158,7.262160026401549e51,7.861281964901296e57,2.1906929491052745e94,2.3165704931815023e146,1.0287309298992907e174,5.124893590631308e21,1.5765024076250366e29,6.371935241119408e82,6.51108881880231e121,1.975000131874877e57,1.8283577996271176e97,1.98087920441415e22,7.402711171053e114,1.6896646755208819e25,8.378249764713254e145,1.0191751692513194e116,259.08379609806303,6.014261969697112e34,5.764266691485717e29,2.065423852890669e13,2.7510961573987634e32,1.99876383159486e24,1.6783424711296303e56,1.3589310994090412e31,2.1935604322537055e106,1.1726393680455268e39,3.5392916282016103e43,1.0760305908449823e101,6.207386374182346e121,8.037893101467106e32,2.8168488526633175e27,4.940136489718087,5.2872694879534845e62,4.899768354525395e145,4.9703772700372014e60,3.346306818561674e18,9.138895402478481e187,66263.84081297654,5.703029312433527e31,2.4763713631812538e32,1.7367934028519546e12,6.227360733088344e163,8.023812245778924e105,8.996901494401131e185,9.318418194557514e62,9.484208495973896e29,2.532931631554907e100,1.4791064684969104e22,1.481554948984724e54,1.2598157651703292e133,1.9935321617339505e44,2.98333851734257e227,3.678727359663141,4.312127939357226e128,43.44490785519888,1.2726168080182577e46,2.6888026827745937e10,4.319041261102874e68,3.302602431874038e63,3.93461264364127e27,6.441471158803859e8,1.008788976371327e29,1.1407616496388176e79,673165.9396872245,9.526435248991168e144,1.558641771689944e123,1.318908880178573e139,3.076426965287449e120,2.8541674949550006e79,1.9995407054457384e109,1.1843505055902628e92,348149.67333306064,1.1529765427182922e24,1.3201569704329881e67,6.555036705486781e62,5.950356978064662e17,1.056901549498511e28,1.9538736479493828e90,2.008303519438908e65,3.897596025126521e46,8.354109401553377e35,396516.7327432376,3.460464526792595e205,1.211292937279639e19,1.4678217030504285e33,70750.75481530408,8.676140955528203e53,5.910430545373381e18,2.186770504490261e60,5.261763858250051e109,3.5306503519571473e106,1.233265167961497e12,6.767526907919965e76,4.494065897811145e108,1.3981904636661816e12,1.1865046941700859e127,3.279089969860325e28,1.6629095155195707e26,3.160639812282213e112,1.8287044767153814e45,1.0939966716332542e63,1.495365681587219e109,2.2857323279873614e25,8.377349834844898e64,3.0779129466601197e75,6.910686656777931e69,1.8085586812533916e92,3.7052164738023296e83,8.36803065338727e112,7.03304841551572e114,4.2517620389473517e71,3.2363039425420716e32,9.632831672657067,4.540167686470921e25,71.76599282899875,1.7537343481218697e88,4.73740846315798e200,1.8355822632766284e100,7.296107052658457e85,3.405730878950593e14,5.978662388009439e94,1.976053171732522e56,1.809870940672005e15,4.1480989948415113e107,3829.720111937877,1.9867929755358206e48,4.157837968545788e106,9.496453447292833e44,1.2319622270535865e138,3.3866764984054903e61,5.016300450604586e88,1.3812197898861063e118,1.8047022455137265e31,1.5452103622242857e152,1.7717293616696317e38,3.1234361097361924e27,1.0640305881440923e86,3.25275742291591e66,2.0913572955461143e18,77.52824744524663,5.357482299985488e49,5.207382111178686e15,2.992894953263543e12,6.9596473686856755e90,7.766495583411194e18,1.55297357468277e172,5.545862524519229e45,189.97920911805974,332.79851375995673,4.420403046208615e17,3.204442610595131e23,1.0270517933456874e54,3.969825017467969e25,4.2601322677504533e43,1.9611060948585384e10,7.017437659414418e120,1.2864388151994638e31,2.33448941045379e74,1.6781378359138565e38,5.903303197538e23,4.451512492490901e11,2.1856890112925697e48,2.14987173479011e66,7.840352682458165e10,4.1621616690621414e64,4.307647385850736e61,1.8520081135840827e70,1.2416849985357704e52,1.9847657841071588e33,2.6800825397870074e36,3.7703743820676675e86,1.235527038506002e135,1.0006318171852335e105,1.972182884613818e167,7.520612696484083e26,2.4543268431734307e50,4.2629403535140537e167,3.127011158761127e118,1.3230232875674326e9,1.2597946725157379e11,2.058728949215494e59,7.596749010384891e6,2.8889049241434805e130,3.1243669307084133e21,2.307861530915512e59,9.623639031430263e90,2.1460686904228102e15,2.873289099704567e71,3.965323641234373e32,1.1575059524662455e112,1.2751428225315243e120,2.0141280988514494e7,293.57834708311634,3.376015218472919e27,2.8339052093409203e107,4.638491787757205e34,2.5069221827127888e97,5.936247246253159e95,2.340981299084391e107,1.279686842189577e45,3.878920180668353e44,2.464680191141801e91,5.053965635434841e73,4.307325949188368e37,13455.45387137551,8.161879839389031e115,1.1668691000793654e40,1.9810010263947278e170,9.534520859689961e81,45766.62090889142,2.5174194120915804e120,1.9287412760518062e29,1.291079629153697e79,2193.087622036284,6.089779413102986e74,4.926824476144464e28,2.0675339395168501e55,5.7584267185749414e17,135.30165700481203,4.4192685477824005e15,1.3248718752240298e178,4.685736084937992e31,3.663242233178708e69,236797.23497130614,5.7559709542743764e54,6.1871776398303435e96,4.6876065150077725e96,1.8072996673439598e111,8866.17335301855,6.390822298376615e153,1.5463887940646666e202,1.6100815526249098e39,5.20655800586124e34,2.6069000129223308e8,2.0268164681138843e132,28.98035501886696,3.1217459619048355e72,1.465685473667244e19,3.1455771783100514e46,1.6120493595640356e29,98.34288096255129,2.391185722116623e33,2.3345159891612512e122,2.0338818827403077e117,7.110105899300395e23,3.372573178147761e75,1.3373268607722856e39,3.078905598782807e82,3.1677862306020336e121,2.9555143030789592e110,4.658213996246599e30,2.54276883943704e161,2.570934593513367e27,3.6587602163530293,3.096755173542818e44,2.8321381755220123e96,7.0200803638447545e59,1.4073598088843421e47,2.8267215324801485e61,3.163380188551948e50,1.0817198146952608e51,7.299303197177534e84,1.957588767782361e23,2.2480333033057164e7,2.9315965314488164e58,7.528852051439567e11,5.297099036437033e78,1.9403734563565698e98,2.327419224520425e22,1.64371654193877e110,1.2269087697630921e29,2.779449061203336e202,2.9060975188306772e135,2.7156384638237845e25,2.4264573604220235e56,2.974005092091589e110,9.11028030725144e29,1.0669090051605661e89,2.4959825050312183e11,3.9342938953706175e121,3.0567370833168946e52,7.988325329418907e154,5.8163122513299105e84,9.726689192988808e138,5.887705151287543e90,1.149308852781302e138,2.024142366378784e121,8.65102581947166e6,4.8342055178923497e92,7.959626900465591e20,5.122356408263429e9,1.846701959742912e47,1.5707442847215833e95,6.15202531709217e85,3.253647711352056e76,15266.163854911461,811.4606792272683,3.405345603388112e31,2.226771582531352e143,1.5551092353263566e31,3.3098959978995307e58,2.347701467819434e49,1.5768615978440077e166,2.2361800795998234e134,8.095563479982043e23,5.001376693117771,3.0324187043380004e121,6.849482042863931e33,2.2566263119230446e100,1.6081379038091516e186,5.811574067240046e11,2.5245167090808858e178,8.921227446085495e29,7.127680713909217e19,3.369749523223428e160,3.2363490686221214e39,1.6237480409819197e29,2.7204451490403092e26,3.4583333664023056e16,1.9133142779213797e11,3.2713286942712745e119,4.993809099544257e38,8.798209402191246e111,2.3590713579226567e47,2.3689665325723664e80,6.654839936137868e59,9.127034628271647e65,1.18129823626792e34,2.217632115710177e67,7.554208634192715e168,7.016199439679601e51,4.527697247249403e21,1.0454816914015795e142,5.547893575523619e14,3.095796174926745e30,9.720001123060146e133,2.1423716067507162e43,8.213651074152197e58,3.116594220316773e82,1.0046162192767466e81,1.0904122693532738e158,2.5295017802642245e82,17.720409083746485,1.5774161840710122e195,1.1308019586618685e154,2.753977068092714e86,3.562813412575876e201,6.036133022916907e65,1.6902580483081526e16,4.9607989509695776e26,95.49808400910447,7.172216392190681e226,7.55952365950687e10,6.60190785093156e14,5.157469090519375e110,3.5424284022378954e78,2.0666333359211016e14,6.277202154244396e83,2.1652573122497562e88,2.0026903629661557,1.8811747930166168e9,5.3086723792307716e51,8.629323028524993e50,1.5551274898334408e41,3.533373912407373e99,2.6166374945658295e28,1.4214061520138315e11,3.4546981997116755e49,1.0524809780620007e53,3.22322214109269e98,2.1031919655321077e12,1.3040051403609824e67,7.365118272549435e103,3.913704672377988e164,2.9188171875264354e108,3.913108187918163e112,8.514935199001391e201,3.4401658657678666e108,6.715913343157668e36,7.487075700982511e8,3.3560149511404736e76,1.8472315953100464e12,7.105164873241255e34,6.909191837665811e44,4.998564267260639e77,1.1468397568740327e31,1.4892787697053347e67,4.990972919435358e66,2.485693076212809e61,1.0413813076790194e8,3.7237619027197448e68,5.100278171276061e64,6.90661743770998e71,1.1667900462904231e36,1.5667892408425803e28,1.5226392458221839e85],"x":[9.044066622749158,2.2688558663616876,4.4713426859558325,8.741917726730888,0.5942379722135227,4.5108335514248825,9.949195735615037,9.28959275618469,2.2994423600718616,9.122799474392359,5.969200957180583,6.9778354290843065,3.080258917248899,2.2965245200711637,9.539822436868718,9.635228583868678,0.5182216353630409,8.388885292176084,4.955471658794615,6.528900824037773,6.654530385749964,0.8865176121936802,9.618808684505717,3.8109412782691976,7.563277484032865,9.962192790892662,7.3255000245962005,0.0345611043525218,0.32841998425757746,6.003494878704794,1.9302005071515582,5.124931927297494,1.275704768458814,7.949655080012357,3.8788667991234194,4.5222907626814735,8.940194408153985,1.758313709785968,0.9925253588216343,9.477640703780704,0.20921236751250127,6.56930746203968,5.343287292320264,6.5713066411923515,5.447420901662126,7.094480897135272,2.0447207318309735,7.9266712791137195,3.8318715596801134,8.05309119171068,0.09737108843074882,9.407793371365049,0.7242463728756432,4.063879389999386,7.339538981476692,5.879886198007105,8.412710129221264,5.921640631912646,3.239355421929442,4.981598683674104,8.722472060601667,0.3686408341276848,8.31160727445032,8.570032324298731,2.3222162764656384,9.692594038105797,3.123985797443356,5.416381243828729,5.753685066858858,0.0993506723643045,5.08378977379254,4.185876501114183,0.18056717790416066,1.6497379614080332,3.48139273811096,5.732270990220895,2.4951478482655665,8.217452266578926,6.182365950425622,0.06805898567971758,8.326674596966107,3.838038134559514,6.048676456048767,3.8459414856214402,4.195245459037913,6.522885592836802,0.4890033178282627,2.9892007858967418,4.601249986731755,9.43928420196107,1.7333043039794171,7.624431397020568,9.593294070206076,8.889595017653624,8.299902388495168,4.043240013139336,4.433608762087909,9.658657118297235,7.431786347651073,7.256798870486136,5.072553113395017,9.065773416868572,3.6974461552566695,6.206404653030681,0.6389564786245461,7.2825523523757045,3.054187393237977,1.8339880217088478,7.925735629032773,0.8716961052389105,1.8889121101803408,6.685252680275388,1.1206444196659127,1.9650053980504212,1.2597672516876512,4.283580308951935,4.656609605342146,3.62396283892489,1.0998727885741255,7.322071468280093,7.907559721880197,5.379020488627373,6.528927918067189,7.89205461861862,0.4748917423581833,0.6315881259661871,8.054897463308642,7.8778268567120495,6.090102101126003,2.9377008808628435,2.9767820510200993,7.425108388241377,1.2504005789226436,1.5845454805130665,4.923555913129221,3.1756123606804576,1.458343155510362,8.322913284320014,0.37688250777386134,9.063602430425703,0.5902305640710925,9.235386410351772,1.651970803339149,7.1526596268980125,9.54401647678667,1.950934339361814,4.211335530056115,7.9864056391555955,3.3784559520467505,7.443940676852461,0.5018889532241921,6.133201405685995,2.869996176099334,3.1659817843340776,8.514345125085026,1.9194090330108637,6.430427542323098,6.734739620219061,7.502899733047752,0.1196009944284393,7.065215093384259,8.310243277944739,2.8090605670897717,2.6536907796543496,5.402479446027275,9.389031331665404,9.800052386742177,2.381440826416068,2.5905183372121265,4.203463586370759,3.9048780727926946,0.9368195627315545,5.237516227786796,8.074470143584595,9.881485723616784,9.272449397510236,6.079565766062878,7.593058253387579,1.0174348335354733,6.306186391526851,7.386992235887668,6.653473308428506,6.468888111684712,3.0811122791551626,4.9071297544155374,6.194565758620882,1.6494193960499959,0.04887696667696062,4.006721344584405,4.129575357537599,9.736390489215502,5.54097928297838,6.349224544289416,8.81239198328286,4.474385459110142,7.347984344565191,1.7880736179032408,6.21530219601291,4.38603745031142,0.11026135847959972,9.754651859029643,7.668266792110479,0.11860862468621836,0.7253582340501219,8.407554701670117,2.5998678183744883,2.288580066184307,4.524873393942766,6.937785640205867,7.788569329029828,4.385109387872048,8.343632179045526,7.336750315299414,2.0293603923074643,6.705791022553482,6.773708763606024,5.4210225524728095,7.651904925837448,9.532713425169275,1.8845841300354738,5.563567515606547,5.764588252445588,3.3048076141597793,7.560276730206921,6.04657626689902,5.936838637298423,7.659370840518445,2.1593484150811726,8.91905963368079,5.944623887262434,3.674659540316818,6.134922156695442,7.682213854606874,6.012043274253919,1.2284646645481745,0.7690862570032175,6.0043768407036,8.205098116595318,6.094698024646458,4.13001271224799,9.895870323641283,9.094978637133593,6.04005302104153,8.406083241553139,1.5558519444341656,7.018584835936026,8.423022962724804,9.129324330172405,8.407843870671147,0.7671502519545026,1.8516483842296427,3.1134046811590577,9.27053066970559,3.6609899493677767,8.728165062371563,2.2436037613814075,2.2595429789194066,1.7671926925119075,3.248505471688974,9.67879626239945,5.42796933075209,7.025976214346377,8.64245858048937,1.0561137585076241,0.052436958470643,3.420603609178572,1.0109526932721224,7.782741781266898,0.9081860545541032,7.952420321076847,5.415079814109916,7.40084877079088,7.866283807434691,4.567410853088909,9.850411907613665,0.723639730502672,2.278692704775378,4.942961513336055,5.054605068376334,3.5193107239092325,4.958549506933327,2.075492383413109,1.4775319971834766,2.332070116283531,9.290844034659697,1.72579272648407,9.620521472572744,9.651627178095598,6.840073564901099,2.530345091187425,3.6622179009814504,2.473738082923984,6.012572058206668,8.085691316713357,4.376626706529054,3.808162150401855,0.13560741784133468,7.669479980224407,8.52109814058351,6.503572326893661,2.5818505482971266,1.2648528593426822,9.28425865803969,7.412464626694759,6.0276352365055725,8.437717861989702,5.614270439026516,5.05054518116938,3.935865473397422,0.19985675174836182,7.620633629485782,2.454990244001547,2.0742513109925254,4.4105572882510025,1.3577940246749343,8.155036441820489,4.188471446784812,6.6710525137328975,8.450921731064092,9.577936149894972,2.3524686965213526,9.23849635789917,7.963206977594666,8.789694508717558,3.2821134590767653,4.569957654540362,2.3067403704566347,6.736462840552919,5.019576940935595,7.752134881664912,4.267765478251748,4.004286186770845,5.874023522466365,3.3321668218181455,8.945924741702276,4.0116804282838885,0.4012888138002668,3.118303534506679,9.39298154336864,0.41964337797668394,2.05424145689006,8.454132370601002,6.525456260429758,9.855297657534765,1.4388133862919683,0.19930171315986067,1.1612848222381578,6.3484714269962055,3.052031288674919,4.2843340572797945,2.2658768368098614,9.315211237892285,4.4293294597508925,6.972264460540247,5.939167974575009,3.982799463439104,2.4695160747127476,0.18249267674706582,8.905027937813195,6.9642595931589835,0.15016582379459464,6.471997444243771,7.240933715429336,5.473196887534286,9.238384572117182,9.871647410802009,4.809204863655205,0.6433068636537742,9.63414140344623,5.727426158944771,4.264718708320261,9.07697246788032,6.292251116955063,4.083728209537982,5.410303462067425,9.11826842141682,7.306208893176924,5.947339878058353,2.247518403983777,1.92740037246669,2.894940107049848,2.9992736215199245,6.485883437139288,7.33859876024427,7.189546558429076,5.249842752503493,7.101198298293494,6.25264485428815,8.67549659940222,0.6653113999155202,4.570260926541653,1.5852930622041095,6.739781837071519,2.048414393505784,5.241707366992687,8.667733593944721,5.17015809568774,0.8474592022095839,7.305618261889164,9.501233885110842,3.4268385499453213,5.504250249129903,3.3429970809781495,2.776274849885849,4.474101251005285,2.685501369272978,9.568628997093167,9.504187029830483,1.9921408088756865,4.380313361257409,7.113523695004891,0.08480651786082483,0.03083977855842912,7.143962726126265,8.518169534340798,3.180145893324262,4.2355811587417485,9.52359974591371,0.31479354725388653,0.4965118963857251,6.880111515234557,9.882482130073917,6.290665969884557,7.516767229305614,5.229876596257914,9.847134375180666,6.540887005909486,0.6767283858968498,0.5847201905546928,8.387593850406724,7.555754665489125,8.795514486514158,9.150149701907786,5.176035936387196,5.96117155445242,6.793034363533678,6.142491211790116,3.823837923574376,2.0607177282694145,5.286146702843362,4.257909646771267,0.38204475308024843,4.7059572381565085,0.2681001666344329,6.352643856818467,4.474491914608945,1.129075126127923,6.699685687302653,9.476790536780463,5.632552349327156,5.103666683854156,8.917138610196059,3.716561530107527,5.701816055531468,1.7871689443442507,0.9963331629060845,9.526757475089415,3.3451840674903877,7.125622632724042,5.7068360318191775,8.96997364164179,4.898846621104919,8.336065749602074,3.656042538680946,7.535415671394365,1.7945090295291366,3.9185998748345408,2.50802008948245,8.12403284499358,7.096972868347029,3.0326581284609633,4.731618805729734,2.4755045488258887,6.352876873190785,1.1395581973820423,3.3137543242518963,5.629930500749747,6.802596397099481,8.595599654521536,9.194034658135733,9.105209791890879,2.661050925156707,1.395397165557437,6.963368601287163,2.052840712354611,2.0291157418166095,7.519990237992966,0.8477315619542969,3.739466866411525,2.5279475515073146,4.597088088273531,4.365057186841752,8.41881905048109,0.22899298249084543,1.9845676831843218,9.85039262726185,3.1518654218005038,7.527622495954294,9.2562063807909,5.584644248846223,9.899328026217912,4.236229061577901,7.874851257644162,2.814698564825293,4.798578315780386,5.820553993753692,0.9137332845158164,1.3109174576002647,7.419508080494925,6.696381627422545,5.871321666878564,3.2139486428267405,8.317021016192733,9.595278890854734,4.435646065858252,2.6323454400686286,2.0967611598772895,4.662205512284352,6.228359394121683,5.44110324360229,9.281758303124892,0.6777569346319368,3.774382334177231,6.215271603126786,8.581972610204163,9.428716552348357,6.93904921815953,0.8745951971768506,0.6226411923100827,5.767466622799033,1.9631675517089664,2.0899220188738954,8.552232843658125,3.5812866937450583,1.6759943046215198,7.513022100200615,4.881944837559484,9.429177820311798,9.248590417134437,9.03035251368098,9.094716437096606,7.979658809330954,7.7123430861615105,9.988517758304463,9.552622222451435,7.686089369039459,6.046024869655515,7.55943027120262,1.2460948722796417,7.093292127100601,9.607581555909391,2.2679227798148793,7.329339108019712,6.87277676966259,6.0902328558223,3.508184039332989,8.595759414102794,4.524041433817263,7.478622091854595,0.35505576982237663,9.19600050965268,9.253510017657966,0.3682001044002936,6.864017678965033,8.546093845688167,7.473009366542298,8.417448442168498,8.108784869041862,2.3223624020627587,6.865930480872442,4.528681847782772,0.846158128873542,2.7955823025369364,6.590079570141507,1.6352039254603312,3.6790347521169253,8.94342731906338,1.6732082681265936,9.399513572555197,2.5623595910615715,3.039596925005734,1.1108186321279656,0.03967367268069122,1.858484304414838,3.6045948362950275,8.179721421784302,9.480402837458083,5.681096179038516,9.37664038227075,7.124713908910911,6.4992522070444565,0.6469369989191831,4.611126254861324,1.742217786517266,2.4809038059513178,5.449733006751824,3.527509457500413,5.671973514292061,9.93125127872746,9.09688126876315,3.6301375080721265,6.806263596131739,6.476993949370183,9.083463012588425,8.047000905551304,4.166286345706323,6.663914318378024,6.731956221530766,8.117875535631473,1.5145348225362087,3.044413530376875,5.130778971938012,6.330505473738752,5.620881280488367,4.877720741911724,4.951832769485096,7.489686328038118,1.7582629108429138,6.531917447383007,6.459573690823901,0.21837513708822698,2.5272193545142962,8.642150941007483,4.437751741794241,2.527841204153889,3.40796937743312,2.974348945244849,3.0545262778096527,8.209759657436756,5.300434757996147,4.990178668226843,9.616796997974193,7.352823627911422,8.928338033050649,1.580830438360541,0.10693288246272692,2.8451702911411147,6.029863603450208,5.403510216575691,6.601234134574899,8.12037400911758,2.093562146018708,6.922949935808235,2.194323339294628,1.8916547130822003,8.376341844242157,6.151882907919162,7.557928385760104,7.843188641283398,2.348573024994116,4.4616188662451055,2.17772996080956,3.016810465167261,7.209778931882644,6.3871311208040975,9.375910362360392,0.05327230824902829,8.531962365317325,0.2896904273762324,4.986286670384392,1.0573134785185956,9.43854144611909,3.2962886987369555,1.721720833993714,5.5002028849593,1.7422688472780212,9.602620214597678,1.2717529239078496,7.759709647665107,7.112384049805756,5.915141588555888,6.349550103838196,3.832586906125337,4.701865540680381,4.338751449215536,0.8056935083723382,1.1939727216831786,6.685158498679183,9.431572377951362,3.409062552586686,1.5199479933384552,6.664070863650142,4.564346084294161,9.318187923892227,1.763240658361176,0.41203303513192235,8.269113047497484,2.9991424361451546,4.240187796836001,0.31441154332233934,5.141650547954706,4.493117452134696,3.56256532370379,4.670885168031267,6.369701536041394,1.2413148490374537,8.983619471970819,7.976616434082122,4.537711111529228,7.038591456805571,1.7101851678200486,3.7777614303714846,9.672498968724373,5.133564412183331,9.904208334716714,5.374851948881371,1.8326473118391795,3.1716559269971767,8.068719257409748,7.6859415438967105,6.46533092474465,4.646306941698912,5.033789523111871,6.352205921306937,3.292624000795512,6.94455532708699,0.44991892729226324,3.8366940693448304,0.1616629130133007,4.456002169537734,8.208141643700301,9.284949418694723,4.6645947600009645,5.512720788102152,4.788502923280545,4.92002349756226,1.4151580209158343,9.146434829096632,1.184124367857755,3.0412634600046506,5.6633957009264435,9.503123864008543,8.276799324812869,5.069144089373738,9.030021992039572,8.178353753710333,5.613282461566101,9.674684873799729,6.846245879290578,5.666841107803087,4.856258885775572,7.245372557666283,2.6794556631579702,0.32945993455773204,2.5686694340718463,3.188790791778582,0.7100499981001218,5.531577228584812,4.417855825514403,9.968174449244142,3.651467360512106,0.7570963357395666,0.16919586878177517,5.3254942409223105,1.5456475914074175,9.08184457739485,8.954605686733363,5.450332850927795,3.4105501518178105,7.136176135429841,6.549128819446777,3.1431368697671047,8.820653051263667,6.753987340486908,2.7607588053663368,5.107418333754747,5.583260068446614,0.8377256081524376,3.4810423417484992,7.381773102439544,3.385994169800439,6.084788662094738,2.4734647107602603,3.0949632725534593,6.273212180900741,7.739412067472086,4.966321929074436,7.3705541627251865,2.8355968993444036,2.865342629536334,8.429056061409629,8.468205956004898,3.5205434139778347,1.7071232850454843,9.939603789647162,0.6066923553061709,7.684033913236057,4.165870792266673,8.297524255830327,6.665839747569473,1.297878979726883,3.2114098162379445,2.6872188940746566,8.379759597449741,7.595509307015094,0.43404660131157513,0.5444275897917827,8.430444073002842,7.597173497791232,5.371598613045496,8.406505130306874,4.663881299388546,8.186437901897035,2.4351317753988333,2.0504181281836287,8.954256450938608,6.881237357197194,5.444670026300525,0.6066721000468811,6.9463498562918025,9.769662033570059,7.025730660775551,5.566296309316052,0.25057393294449337,9.497076203534252,1.5691893538559643,6.128276973364191,0.44712874440569594,5.9077517409208,1.6616850119256177,8.80873679469321,1.9313146590337582,0.2712305037991758,2.0866486008740126,8.198427183096523,7.11969707877323,6.556569695675023,0.5423600113055849,5.265376493460052,9.78834277580958,6.561390727311767,5.194157783979292,0.8416437260241483,7.118185732234883,9.80764826059014,2.2381880893753614,3.0142403996492084,0.9251497818816223,6.98484286002417,0.10259409745255077,9.351300535379934,3.693643094661785,6.169791614571196,1.3403897352410343,1.2217604863267972,8.945675608227079,5.544284218112214,7.428377784817226,7.545056116481897,8.211369556351691,5.987314946487048,4.221779607280012,7.1261273927299795,7.833192951446177,4.559918437678949,8.90502191854927,2.488311865199291,0.06632529281703992,3.3656690770855913,6.544026148240485,9.27030863259552,6.00460087912359,3.615471580293168,9.577212061290716,3.2021081862819445,5.146823649792602,5.358324591874264,3.195543017689324,3.7196142876796223,5.735401673524283,9.378527513106004,8.182311160191514,1.8203152751287721,5.10026475714072,8.148616141817481,9.656289430573358,8.788278484848027,2.026549336529475,4.569817209414671,9.645172410676503,3.0346440437297195,8.917895680702637,1.7656176501258325,5.985565623495903,2.665359209712599,8.122625506243988,5.869189566470585,9.192453886399354,7.043479604649335,8.595449727598755,8.455374991929546,2.040853267337801,4.278094583018581,1.4226588339377377,1.3767120735843008,4.169147707047854,6.79013993657567,7.846597515495133,8.796470982159729,6.07474908751305,1.90431759794488,1.6609095820900643,9.0871228741009,4.458654538367661,4.598194876619727,3.477085994497453,7.438494405153344,8.568628284830858,6.844485922492165,0.08464034722594604,7.156152877587447,7.0226783783427615,5.365611375259467,9.251817069477275,0.9829306943007476,8.190397310069258,6.444798402067526,3.224392650525474,8.778104363647543,6.630709212678251,5.036418787342729,1.1518005156738576,3.7164327694117305,4.037504190979022,6.764487191246047,2.334680113071632,4.658838515014583,6.328146588131873,9.659523210447594,4.559091048633938,8.264453769645712,3.463546691318662,5.2237663253660145,8.825250060982983,6.5034868506033705,1.3570751519425839,8.06113043164152,5.968885017517762,3.369186145220342,7.132154671265005,3.5262530952541837,3.0690441234823695,5.321272430494199,7.436821606261366,6.347383922281519,8.148855739985393,0.12847314820929157,7.825461795318875,9.722192997242441,9.893225309102341,9.237247552333109,5.838700714898371,3.059373235579419,5.615641176266164,0.20112236357620716,9.831350774183235,4.454055691142093,5.168257666617009,9.599430502156158,4.799794658092962,1.5686427496284039,5.213443911346197,4.753946609994606,0.051922880647579106,2.3270525027518185,9.397427564054528,9.216907587085272,6.794482556953718,6.033968816138868,2.007781724872444,2.8541563258280034,3.0191370719823696,2.5771505791538796,5.956122964361683,2.875036491567955,6.05069785662571,8.143876052365972,8.6970512601887,9.353717434661707,6.633797242489104,9.457404039779302,9.193348694624087,2.8316276594905965,0.8760174876825011,9.06696556458358,0.6988958275306589,6.989470829462294,8.822785485968739,5.024937030377181,3.8419374399444894,3.826630265922326,5.395208501701843,8.784396723982727,1.2535186715948887,5.928040805088795,3.7018742062594834,6.1317734403383835,2.508250452689902,5.392108608886148,7.39763752750914],"b":[15.888820753923591,47.58111509155909,44.188339702166836,11.939347573146364,33.48308262789261,5.3124117059258325,34.23696973168353,23.736290319952793,33.15213999503467,21.141143176670738,49.837644963199416,41.083992008097056,28.824768348228524,47.41787451097353,2.2753000996366635,34.94621370766717,21.126453944966638,22.48979159033286,42.17792697548904,23.502446716741225,6.653185521612571,34.46943443240498,11.284451836450366,10.006162943508686,32.120283321502505,29.016380625635982,8.60349982351989,26.83420557238825,51.67609201442448,27.136393905910992,13.812742147224073,47.642325648087784,40.8944226343097,42.23047670643805,41.09048684876736,11.553430940437385,35.91168835605862,28.2358484892576,39.65095608821413,42.01632472659524,49.130378940985366,16.84545873268665,17.328452697661334,47.205750932215224,56.99046136301484,50.74009515225264,16.722264272403937,37.420636770397245,27.504619956047705,11.060031921745084,41.953509015896664,24.693592241928936,40.49604224801705,33.8525994181224,31.56873536836836,47.04031449897787,42.15814039561815,55.502697982450556,22.385255179121938,13.727974694731433,17.208422796117574,35.15704822364213,44.626644310218865,39.78163495580458,43.86798238982489,45.71826121532213,25.260697800099873,24.402756477971053,28.461757620212328,2.85601573676747,24.253352654382,46.00638135173817,33.78291753405364,41.788712176296556,4.755299136527375,36.390358156810564,38.796366645549554,20.04763925841155,5.7082181501926,50.85003713508957,22.145527183810188,26.01507671337054,15.063917677257413,28.303938539705413,46.96127792941689,20.316948110075284,47.12180282366577,5.133021670000817,24.184317746332326,29.72502365837094,4.199304231348151,6.313041347625705,50.90094879844214,29.825326757720724,21.07264960340722,54.96725446445844,26.38006200589312,47.7724267549912,21.829446916740327,5.2188128520874795,9.65934779354075,32.45597034228265,45.12391767935646,18.5480105109576,32.12382589318847,52.64359280854475,44.86513808166667,22.44555991429175,43.342866060950044,15.35297926707978,42.28298656378843,36.81610190475439,30.278306502720977,43.50818562042617,7.656495504969493,53.08662974873689,45.60052971199147,50.97886676389517,49.761346454356804,55.965342486833855,52.35875605649356,16.331050953573854,23.437500882580885,30.521052191400614,20.68767563336087,4.782199938602805,18.481612083306878,32.34210177454492,46.07450649767272,28.346750905251646,9.771175610152545,22.79294561124877,47.29668395802292,34.626103363513664,10.27370252181779,36.21062568094185,51.03682452591586,29.964462452716287,21.092855014451246,17.105457004787553,34.04846194782424,40.53362665549647,12.008838459681717,12.372947082209445,32.25716409320146,8.625690147424852,56.3137409124944,6.039841480180749,46.249852531957934,12.503035742975573,23.54963301635125,33.881845891664526,25.877790463003468,12.124278857285287,10.821737224298742,9.99291143643579,9.873670183851011,53.18600610896583,26.81361569942693,50.5545358648098,6.564706857705536,20.74114090472378,40.85811385789755,3.3790111511121412,26.338879283195116,9.833186291989376,38.60129483293726,51.687055064860466,55.24409617424358,19.25286499852439,37.65443182761209,46.792307345580525,4.619069533191674,4.031494500350696,13.667349329270788,40.793207321044356,34.736492063440096,16.68073481544184,15.403050480467606,8.310934299934472,15.215335260467782,29.3670391067601,21.221226845601535,22.689072780005322,51.957911505203185,42.23816982719421,40.94372701393661,43.781824083494065,27.088775019814932,45.67176544650476,23.425116514367474,10.42077758524405,26.19307787048864,34.69021263274959,17.3063117978574,48.22932332362493,41.50308869037859,37.37135061812988,41.68087496721697,48.76693647130341,22.797985283353405,17.68692521354658,13.840587399400704,34.19230832487683,53.15907028437536,15.922473482584516,14.049719887846965,21.687571005312854,57.343219864379385,4.688094212337301,46.017577048577486,47.75646823347543,54.71685864344442,39.138623081902104,37.85956575527345,28.177620114462226,40.26377867755181,14.70009762264809,30.911678936007604,10.5987737705804,31.619531713750387,7.214438108660017,3.0482117301649425,22.300818061020166,43.01187647989356,17.007280388198147,15.674507071322418,9.060073839766387,39.29762082412422,37.4141157203736,11.489588400541681,23.879349861000655,37.973598656508656,35.416244617860166,46.52737367102405,29.772499104373658,24.97350308584853,13.86642575470568,26.609843892339118,6.711733622596567,42.76135634938019,15.574737330856529,47.624820937840454,21.504393381798348,39.32055230154563,53.32228239195709,25.16047914123497,39.162608207175566,34.9431844798752,56.43836331688559,21.902194271301383,52.407688556475435,57.77311349196754,20.533540124903507,52.00086921597691,27.588994413425134,17.151541808556267,31.301748566096204,25.314431359545747,11.333233313719859,46.262317243071635,7.297710882162636,35.58396246363407,42.02762266005778,23.160890780265095,41.40038224727008,27.517934389138244,32.94546609567579,48.15732044189794,22.089676121913236,33.89476712169549,21.558117510118258,19.45185082712378,33.992636534145596,15.836129783689266,40.53979100624918,24.28958678183256,36.13843978899585,49.603604325248305,35.836178668837086,55.87469351535777,33.21142174394234,16.68993933073017,33.69956109259604,9.976252570878309,25.42634201152371,36.851121698896435,47.86341703500427,48.559016894015734,13.462045017576013,20.22814197828181,45.52301366488207,43.54792494014249,56.13027971763108,48.23056159600897,41.53763733367094,12.872874460504761,57.56758285979274,45.96122496275693,39.68470471321207,37.623488522031934,47.40493768818327,5.641815795815834,24.23569958408831,38.94380836885938,48.063045787026354,4.168329385665799,18.476588242383365,15.12864016812384,48.790377989134115,19.24057452293791,50.45313659970069,48.69230885766347,52.24055056224491,26.27779950575343,21.359158863043625,20.278747347554823,25.011967627209867,11.232760723732682,42.262630734620174,46.75821603209903,11.62527368797626,16.429492703353443,18.821522369642754,48.07738521499839,15.128913579878454,22.958697694300845,44.127265786049705,10.625984754201806,16.97435916292764,27.416835811133822,24.03659924306088,30.147248253975942,20.717412809207097,14.311281475233882,2.5372252834773112,1.0412058801266033,45.74335926606463,18.324048142409026,23.295908468952568,40.28617157291302,25.7477866799741,40.70672988744215,29.875997880458833,42.5404708279423,20.676433782100666,16.157927264706686,45.29335324031004,25.46818228217382,5.7244923788428554,46.33148398564891,17.147231583938858,13.643713561053122,48.18672196191271,22.482329597022463,45.02739622343081,19.662503068119047,48.91333695566679,11.888178811634091,14.405988852868772,35.596109809630846,30.809534912894158,15.990071801005458,53.40044381471391,30.81479373512112,33.635048064694544,35.56768584137071,32.988334128731985,54.424813575838286,23.41503271720265,45.128393387245325,28.51144553398019,49.342777938118004,10.428183442180528,8.847039883534123,20.607437869814994,16.571311971708365,9.602398694799135,17.548572421883033,49.551978232655834,19.368796768099592,10.580556713639714,24.596714737329577,12.273931071384983,42.46106467409537,44.97161538342631,53.869007760760425,38.28719364096727,28.749519391357182,46.83043409360468,43.17137895983508,47.69492246467164,34.430170650452446,31.891298380960265,22.352300978714997,15.351168202183704,49.7382806294396,49.85103298262997,9.316452173541535,22.643617132085833,52.14563353510572,21.15830529061335,17.826659977130838,9.750775222251782,37.254812225038144,29.8777127234495,24.390083528210692,12.204867405388928,37.003284441838076,37.34978283526557,27.200589736071002,49.535989164811326,30.278411636701072,16.19984339111658,24.79944592641731,4.378765928852875,30.01441167314123,8.722826337469794,34.63355509182276,51.20761472331933,24.50225785167755,52.371980211952774,51.78115613279976,37.39533941810976,46.21071602932053,44.97847931444332,34.02541127688885,7.4794978190625505,31.782205635958007,18.729942136798954,52.77373960725434,20.61151902017855,5.526083135477302,22.453985010051838,20.381490364720996,16.39054040032374,2.4189099161061467,36.531098312866874,55.02907289203982,53.301832371360376,36.83734363045938,14.03384111298647,39.690318250840676,48.575223296914295,19.633364629311394,5.9558534816581865,24.677714421525884,17.807123517200232,5.643872337310114,5.1315693016820525,16.887960871036174,55.842436336028086,32.426033373006014,6.8674734171456215,37.40917927526807,6.340870133446581,22.111477689174706,22.527584797874596,54.93309364830123,10.679926072848016,10.1797563763798,26.53149621970808,18.692933535254948,31.42556822074964,23.041528083815766,15.03540102653595,34.02505273424686,29.17637308777907,31.757199809637257,54.72732486257612,37.22659178113312,34.915227841544635,46.978350670018614,49.46268036182764,51.13974530401688,26.67751196970496,46.11653802377986,29.784565322054945,41.20566794081172,19.15127359725834,49.82337133154776,45.21265469512533,11.731621808314827,48.74283701312316,39.62516759418951,25.71459237837572,16.88902673801106,45.02166904015097,45.68506258780293,55.17024246427403,13.258983386770668,37.59947164581528,40.30203390671266,44.343413565049126,34.55215258575675,38.91993429656786,15.4139741950271,22.524694958610805,11.648225504201967,33.39561705725303,30.021376604711804,34.994739136514816,13.838898404637671,52.206675848719904,8.501592076697252,21.73355737649783,4.0881947563348,34.25470773427854,31.274297485112935,22.26040221588996,13.352959641010695,9.852330245602152,50.239539084651796,27.31137235228813,45.44015733050669,40.52793447890144,11.617424350668145,46.95025582649818,40.67247902686356,14.195641085371381,37.30629186407498,58.30333963665532,11.785508118819386,40.58276558398143,46.99090501630829,43.20126391494763,11.538595863639213,16.38918482261889,55.70560674752416,49.99340220226912,23.759762112734254,8.118607263342035,8.105041360331034,26.59611017854908,23.219926875345795,9.689536378628937,42.96131125606243,14.343767738962567,43.98163711862559,9.77873651377935,44.214877181002464,40.22815864737235,26.345227852759415,44.36512449822005,35.644176604440375,51.58985554186215,44.28002284148412,9.668861891056446,33.33344618607823,11.83575452160063,37.30626574303771,14.683875260991423,52.60159414432916,8.589194268506668,19.347529021378325,21.860739289587407,57.27628411400192,34.68164426385964,38.42270304876514,9.688647514058104,29.36827442276476,32.131525744359024,51.31358851008366,41.040326557325756,22.402376396366368,35.23870350927146,48.13451508604205,8.846978476868726,10.11756324901677,19.310179855538376,30.844366188394662,9.55565261753263,13.978250930390564,32.67345421137186,20.068486570824835,3.006665156807058,26.369308895160927,16.731362744552705,17.495271256492657,7.931499193053826,45.77269178403705,19.556340079803945,15.606005143158576,5.6800275470598,46.99587927253272,30.96264968568479,33.87009851972417,23.442408542623344,18.507936479279465,48.34156815931587,47.08420432416247,26.55535847625749,13.983915646192383,37.90705782487799,29.57961604500394,39.523756086148566,39.95322093780794,22.10727442240155,31.158693981595505,31.801132722185088,19.15447943791263,37.97925582920736,8.127924322351852,40.723380393341714,15.427978810167982,33.113466646976725,33.39043368898177,50.91325496579349,50.073288129334514,35.53951926210226,23.408624862566853,38.180424822584776,45.164439719050655,24.313478299397108,47.02040776346094,11.161296313817397,36.019701108023554,35.337274812077844,52.31201761444937,42.20586778297116,32.85038500044471,33.40124781426143,8.015224947160906,7.615875231997665,31.16027705976284,17.600541627011168,45.089724130437496,24.77222917946309,30.493034321813333,17.823509850129277,20.934390796773922,24.755730145838356,38.883898525154635,8.937827152817157,42.633305606820095,21.039110193542076,52.467449374600854,56.57929190986417,26.756619802993143,7.02998122568288,54.03486844039937,6.268163215810234,11.088951536005878,35.97865152606662,16.401656871774772,45.71575534228814,40.50669946235004,57.43581161435585,19.07270655057077,31.124590844261107,53.01237467497196,25.18607139781775,42.88764647847944,43.292649248252516,16.68634350423786,56.518657031471136,37.69479895497582,35.377600809047436,18.39418446517469,22.233329162741718,25.810165180436563,17.239841839044843,45.84498570438187,39.34666861314664,4.211087310556055,40.629271839681806,19.481626776949135,12.617159759304453,43.767813418204874,40.672456202848785,55.10955861869256,44.577468720129175,49.07221983591538,54.68232928808293,50.09870090441048,19.07254618138836,49.69069271919916,23.843131422856693,15.82922134772262,13.093348678294618,45.17267818505981,31.98547983676259,34.036013819002626,11.933664590027988,49.37257058150536,37.88115677496865,57.95950583582378,15.600826027192404,18.979813467842533,43.49364128759875,25.02478455433303,9.7069832539601,40.344266655994275,55.25292390510013,39.378178191916405,24.931017325562017,20.2258003545803,32.022444907735704,6.78314120364033,42.374636218841474,40.75857448015908,16.891379926953952,27.318578847609032,21.15141501846887,15.107146693980498,47.793560210697976,34.04681965102127,48.674149821792426,22.17856294506683,21.5645411286212,33.66924556516917,42.506811971660845,52.72176174393032,42.50067387610119,51.60976997822881,11.234198069566137,7.486011428961716,16.32780988255471,35.5830840345741,46.745560662162845,57.02515227383874,25.40966520667306,43.48839652418298,6.283239421502335,46.653951058424866,27.33816809046242,27.211893511804085,27.695925220726235,8.548271131096072,38.09715580449743,44.31886264789641,11.214930286039891,39.11234235479093,28.895504854796673,23.20180621315034,33.92308076844313,13.567736985399463,36.80435229328225,13.345068918345252,11.813174308456855,41.83643126929776,21.794382895432165,17.00890524354994,17.562871781521853,46.35427711829829,12.21432365534858,45.28799535822921,38.7814560639257,10.645089986472676,40.36259391051179,30.130887240895316,9.226354672978545,46.17547567854629,8.318607237127868,37.45156184468089,14.152983948359669,6.771350171985677,19.21874825405984,7.898749448697151,39.76798244634739,11.32372534023655,56.07380468882597,10.489355559069125,8.684844163313375,9.995068413037178,22.638106636580066,28.1890709300713,33.83708365637309,44.18798213978958,19.86344244387269,49.29195877181491,20.408647664822645,32.74879252104017,28.432170103556373,32.59851666655341,40.903191489582255,49.78228569023395,53.04643602233928,23.27959615901514,42.114898562263996,46.48752409231216,32.867795514006254,6.435627029924047,16.71568760789865,14.221660939843897,30.870456050449533,39.83425771378551,12.808417228200524,17.000255660404775,32.18513121386645,29.998854041902305,52.80415942995268,29.412074808912784,31.438335911684014,37.130062862015805,45.26604530081426,12.565858993762898,8.004173042896811,33.258039782711705,15.672962150681622,27.289747475841597,48.41877363073888,30.85165758551021,44.562847425746845,52.30006147529343,24.056255146884293,25.34906883270967,16.65420530902624,19.367471586335103,39.20690197295585,9.869391126611227,56.6401762145776,34.82885279432443,52.48421651146303,29.78515197788052,45.687144548482806,30.563164573354157,22.307994711522753,29.97045722083132,42.22893145069894,14.95845853694504,23.110742745016857,24.94220796977111,18.799792806435505,50.757765772559075,10.704124196146475,25.17227521363856,27.12322214606131,24.79001278322044,23.28126098355523,34.7085125508513,50.35433403730882,11.725627839781868,50.5500413378478,48.091442626286344,42.258415480260346,27.87676211237899,23.78616268614796,44.431873736374484,46.38376906069043,18.396515751155604,12.688374800271134,18.064522939161776,53.280945921000956,4.466035017050278,9.003143600900039,51.82297513451872,37.10196595963774,7.766977927125787,21.77562832244913,15.747418893398756,46.18359315182157,40.04158680914934,33.173787093184515,16.262143637200907,42.374159361316536,26.894092054630896,30.093306847184017,31.78425651074438,34.74326601780823,15.324258677674582,18.79069500096356,40.44290186033746,12.559103804652556,38.11869421806851,38.96677791173393,10.719184226134416,5.3706912826407445,37.46460204231928,5.299440028192937,19.8740727583263,28.30092656213743,30.43887212110768,50.819395683049166,8.515326830951977,48.90270942956411,36.133365138570284,30.85270203611365,29.407233345883302,26.90681550185426,24.132595951202187,23.544787353690943,16.492654308533343,47.711802208812735,47.08885225069017,44.634530010868765,34.15529855673305,35.44128653260464,30.40686945109387,37.65330676810176,33.669480177743516,8.28023340581515,51.127094688678405,36.41425067310728,18.549353058158704,27.19752762732103,33.028585037083076,25.813640211116088,20.55839712882237,1.9340745170624518,4.408728734101713,46.22100529179103,36.93080866084966,16.877334881907842,30.2998045780002,34.01457371234883,52.21995502324865,36.73777043805925,8.357755416782492,26.62225504320109,39.86448398977747,11.670114695089511,44.038566605169514,46.97625080098147,30.747109463406407,50.876271005283144,11.014635485718223,15.189980276049948,42.78181023143246,14.253346990068856,14.072160934198159,56.33919109424286,10.620032644611582,6.928710184516465,41.47988183756104,40.00915957884351,56.48212650022833,17.97319001128618,19.646608582652014,31.267857445824717,18.963747749400635,23.89790747264597,30.634251978600467,44.71865379062849,19.036948528511452,39.62196183168927,41.254972546559905,6.286466916341354,21.985922183088256,44.029261933211735,29.53504084697079,45.79780356525673,36.660110632803566,25.745141953617903,58.23669354024692,23.88004925910522,33.764443365889356,58.195849434948194,37.087856722844215,20.623036774781344,50.883786912399835,26.738389660321147,13.13278106651742,11.677389766542111,29.7286312256358,53.75268289425066,6.223825743265669,7.220456626721768,27.10327989378051,38.770859436246695,23.279902112341293,37.977897811557405,43.87356233353549,22.09010211465475,10.410966391662607,13.129678201883834,13.19672365342819,14.591058992890666,38.85492916552679,34.635628930811635,9.343403186305586,39.27424324639996,49.23318694195795,38.966781425335576,10.933744586638793,26.337105583880547,30.001326713542586,44.25689845006889,27.251820354078056,39.899011030814904,49.801147554476685,27.75400913149194,31.41114726435937,26.781377231391414,19.97566140943092,45.03006725108496,11.893828048099262,12.186697291458906,36.624056427073604,19.676684095360855,41.73476544701027,29.331654218929945,16.588066465452265,17.10495801775941,27.43850137616424,41.55036339547807,27.754902164762093,34.77915518846302,12.75876124176146,27.21203123805805],"a":[7.681472125455267,6.602761597591657,4.653064164666354,7.042911898510273,1.4441081236734843,1.6704720465006018,7.931220911351627,0.2921556505443679,8.669318626113114,0.9584518139655751,4.833874592714851,2.0235798107735947,2.197715419299584,5.620719042675322,1.6504406530474536,9.684312292022554,0.5184321208079967,1.894163267111042,5.237840064231625,2.7449946336101116,2.317150935680712,2.957187555083678,6.025275042697958,3.043721103388426,2.5253364796895195,3.9198372803992143,7.081441716489834,7.450153860646351,6.303396929340279,1.7597235646439757,9.740745203370079,9.47076734107486,1.8073800151801778,1.699102590740924,1.748596936647786,4.054866938228178,7.237769747702519,2.5040482487138216,7.622655099952647,0.44030958508632256,4.943107868294792,8.01928550387126,1.3352772596369689,8.908059753518362,8.236022804630094,1.6438028423120898,7.447549901808488,2.6220329113190988,4.4051175288636575,3.9811891770458074,1.9169936784759978,0.9097559228541874,5.850254892855493,3.8992132105602417,3.904542919221994,3.411677909152533,7.880774712449998,6.12113360975221,3.9902976792171074,3.2320154234541887,9.556223079309278,7.7641068673758395,9.255054675837789,9.848934618702232,2.8380432166432135,9.346572302023866,3.16974017878755,8.798367804370919,2.651337998033878,1.882617282006649,4.932750099192605,0.25113845591553385,6.126667554918141,4.411060703746916,2.226618927368069,7.305866857638506,4.579177012669627,5.518873545148246,5.434945946767888,6.483156815692435,8.322085031435291,1.7613829127751313,8.704741804261298,8.112205071539693,6.5368668498281775,9.256107967778116,5.418337081957867,2.9983658624472964,6.624014656000659,4.657568704056678,0.8901462639678903,2.4658207261920606,8.437558172788348,3.512812057490633,5.280745437856247,7.156596982879854,2.605372454520236,0.5514225398376404,4.210714874671599,0.7794323966980166,5.563229517854449,2.778607757655438,1.7932300756133146,1.4933117746571112,1.013057950455063,7.2667508991231795,2.344969450296155,4.943955955272166,8.711631599775089,5.731756257794318,9.521233474559923,4.624455347960518,3.813938449768961,5.971943641347572,1.2368511985307173,5.154960274553879,3.6836141999988903,9.17662975725829,1.8511793828531675,6.528060916895426,7.408610801344131,3.4368263005490785,0.4299163876722023,5.4700487069409025,6.453495987026557,1.2976771527345554,8.728506834944188,5.505517878650908,3.061495144981161,9.000692295764196,9.405665548282533,3.1096225770970665,0.32136067562836157,5.859731133752382,9.163066505583323,9.74734655479351,1.9149859953436144,9.248504616036321,8.101026430969869,7.932974082084678,2.0926027167053385,5.396107913321908,0.6889557517739164,7.274141366384539,8.534337412574597,5.03848425720304,9.705971348939137,4.887921385991598,8.842597759381064,1.0345443135512844,1.9334566074146697,0.9931420217707831,3.271749122523837,0.24799541867794872,4.202995217306613,2.198539537862263,8.449969997456838,7.669173878795705,0.7040716386200763,8.817606449922328,4.387496062249605,9.277881142357703,4.364891012751942,1.4889186841003688,4.920861918349761,8.789650897319905,0.9995544757925234,6.4188881450688555,7.725082948311295,2.7359058447425944,8.84517635649761,8.013057764656967,0.6976385435257981,3.6732714641467767,8.642481966880748,8.143706080489943,8.449985280356847,4.085499719380832,4.889629384440131,4.3709716003572225,0.7182180123408388,6.706661854577161,3.257728990475137,2.859237111194808,6.719726523288426,8.638911499599185,7.3485551282571215,4.472852594361562,1.3622623915436294,3.0648568428223455,7.4715515062253735,2.405159713545706,3.45419257243909,9.628109406620293,6.816864481662057,1.8682193321799256,5.656196373977469,5.796181676645016,4.47326009742627,9.34342743967034,9.992615198208963,8.237974029675765,5.32207942355758,8.020351716551739,8.416565336158941,7.385908158308492,3.1708448129465583,9.561721230700094,7.518621259969147,1.319840945132389,7.245322085334971,2.133115865163908,7.113718887994898,3.2714280532060513,0.7132186915371364,9.31358380085749,8.697158723624892,7.873187487333624,6.325723694376089,4.123698296421303,9.241847365431173,1.04842920883075,1.4002585728638461,2.4299043449204105,8.421132337735802,4.090360472682657,1.4128369312265021,4.520831078132932,8.907143260421925,8.197438107096971,5.7584286615145,8.774495370354687,2.357723296689709,2.391425476105864,6.853134891243908,3.432762302957799,3.6864827549268497,9.933525269370136,3.8293287152500954,5.639248857537966,7.310123693373769,1.2173699033582919,1.0113207790433587,5.363312426109457,6.899880578770778,8.662220475350237,4.628201557184386,8.152357750783654,0.12365965715432692,8.616342788728018,7.38132604192602,3.2289526487319287,8.202595093509977,0.10189373952474101,5.205203406878596,8.8056306923832,6.804889754724881,8.527844325873541,1.977465429246057,9.943981397228484,0.24405865996037557,5.312120885916274,4.645303493631587,6.627114889287555,8.941939666389885,3.335697879794992,4.771969447180058,1.854041534861386,7.684133429240152,9.958339481436294,5.898112291030042,8.060813281659687,4.325861843877529,1.489532973811647,7.339536933993571,4.488091948214175,7.476667114107105,9.893281104228196,2.316711828138218,6.748648734385823,8.359376251884001,0.9132104717820377,5.122780591739344,7.0750144925789655,4.895581706361063,5.122699444473362,7.553538172138716,2.9689115254232945,9.504370755521215,1.818199962066207,2.1910374099066443,8.82267410529099,9.179446049818873,9.161039585951505,6.191247603141927,8.917274611514207,7.291130533740646,8.112210278951812,0.11056545711170873,2.3770414813853313,7.548808515481376,7.312172409669242,0.7462200245934292,0.3582568296482713,3.845657242282554,5.22640777650913,1.2470864216027788,8.703724234857347,5.257226162222892,8.404988402117894,9.59857557202281,8.941788671624366,0.6345143440758139,7.001846973587318,3.0881256832924087,7.706945949115973,2.3332407309375314,2.690607720249276,0.1696601732030234,8.836028284359328,2.744322785036528,2.2432431544674603,6.146799977731831,2.319045115378775,6.181765280677207,1.413756443819567,8.16919621339319,4.2505557452755465,8.686326771896018,5.9924590172411225,4.319328418646487,8.767275343166887,1.4473728710119493,2.986396230451631,3.7002016656998737,1.9374172846251247,0.4485171012923428,1.8812189029294313,5.158071227486576,6.279727260383641,0.6244060062998269,7.443833266306708,4.348582118825181,0.8190018991519366,7.585973461679845,8.208198117871113,5.728685702375094,2.6991676086222993,2.708541665129125,1.9271597050859302,2.8142783682589445,5.8013859317502785,2.9887454878517916,3.7864771946062348,3.6936856599275014,1.9279660783602681,5.2018376444195225,4.5393103082214115,0.3814059521402391,4.232405681825339,9.164215633326984,5.825505370402566,3.999464803962196,5.330791880045133,9.053936999361438,2.0820349855176956,0.2873088159337467,3.14712426134766,5.885120568778697,3.968201371387219,6.179694047415733,9.58024823062334,9.485978025167645,6.069467371814308,8.134641452253542,6.408276958062242,3.61614624109053,0.7570057813675635,4.117049268696902,0.36019328345375357,4.713976403281759,9.35364167968277,8.11269640111078,2.6717130992442018,9.83162415703603,8.696260136094278,4.340553859775278,4.4199185436121695,5.931082449703897,9.036594618826317,2.6726012093722984,6.0659574986582925,4.020064631599736,8.699039208498904,1.7200609489118013,8.120947984748037,8.075108284066443,3.3276627470416864,0.12946043275359198,1.0634191857077324,5.074963576176437,5.518713773220421,7.418782467094125,5.4612750728913895,6.740324200665901,1.2016425179170431,6.762036450037154,6.97705123776182,2.7074748184734854,4.174762799801877,1.6882961800155716,1.0676936029757411,2.9558286205090134,2.278127485909127,6.810145398983316,1.1795108362417661,9.810063415448944,8.216694484529521,3.9513489769028287,2.0769468547908354,6.939095871818655,4.903005895801272,2.6352633403611003,7.43555643047973,2.826307913439743,9.320694123419532,9.248186193388378,6.041590437518383,9.059486378451755,3.570692890687337,3.602810779402492,8.4577416685141,0.6064303577152508,3.739317076516473,4.781942732703155,1.5193980903815318,1.8707206193518156,8.542990923276623,9.339754072105027,7.889390676117878,6.736389233498324,8.879484764857219,8.893231462293032,9.425222890148511,9.15756880840172,5.435641098984119,6.601158937924277,1.1905424315476476,1.1396632854883415,3.0335784731320636,1.9763675122252367,8.027559810885126,8.094438330525534,6.752362753685861,4.884267352518011,0.9536174821551846,5.889837666223617,2.978122965228751,7.088250313830661,7.600888498142893,1.3324256735321005,6.555341044578553,9.498310994193567,9.15720976026284,6.749771122899406,5.049739565634665,2.6037540956209226,8.021291968947505,3.46122873053077,5.257290289942347,7.78290765601856,9.130058373035329,8.674634652479023,1.7110727139209247,1.6982152339084489,9.477217090392141,7.198890838786438,3.546061659944,3.998784045418149,8.531809455477726,9.396878579230982,3.421302191065878,1.344586016571101,0.11575981439070793,4.13644611566327,5.9777762454528105,4.4805124779397705,1.1045801139366573,9.738825367230781,6.983115812343774,8.565632859180756,2.9419813221795788,2.685764871474965,3.836990741596511,4.922448822867668,5.825104171622602,5.812460495843384,0.5679997557263161,2.3115854683317982,7.270838375976842,7.510824283456683,7.740595732157911,0.4327557359226675,5.307137995824391,8.333714747695065,5.638365207703848,2.2262818277220586,2.7135421289280925,0.5067637128848612,1.6661022098820433,7.351828517176104,6.280464022126235,1.7104362769577608,5.577701137692548,4.541279220802423,7.696151035096062,3.2122633657592248,4.591257337360566,5.7433168577300435,7.995835273014542,0.7116503920949713,8.887261211524498,6.55335175777396,9.483385453136739,1.3740211190812568,7.545594672575517,8.157171852402701,3.308566393168806,5.873702928742848,5.143101872727646,4.462846913866905,7.905162751583436,4.867991881614564,5.799720705220565,1.8131995313714322,0.8003700823462334,6.8918901233677365,9.17540744883927,6.101329887960243,2.3370833157893656,5.4501528446330045,4.290279671744834,8.64731418055989,3.392979652649315,7.6661272642279865,9.825877102429434,7.833648839078897,2.2761139840866584,4.074864551709529,1.3722644291949715,7.167995430455775,3.4725039669255264,5.138207908484094,4.006757373045851,5.212239084159083,5.450455001164958,9.403913668392095,4.286124250700595,8.275060518688313,7.309501370270413,0.6768574513812609,2.627501403426571,8.188845115824863,2.399288883065811,9.446639333413325,3.8020788567010055,2.402881296119652,7.3207802492802765,6.82281615110475,9.720740913655499,6.227544567183035,3.818603309005133,1.417445148583203,5.45479581231519,6.964616950322384,0.8199579547663749,5.854324172141245,5.484291122669418,7.161610530612226,4.12223069996609,6.5674034142085125,6.867165283592089,2.6599299775009766,5.514838148579086,5.4505419812284455,4.327031710917848,9.447834118890935,9.017762562078762,4.5507138828423095,3.7448886630124667,4.337480555671032,6.051484217527497,7.912003355349175,4.024602408015356,7.383209872405416,6.002728993992223,3.2797560013882654,2.237017839298574,5.733930539330627,7.604871538213085,0.8517374405207301,2.5465878200960312,3.4014773730563475,5.497498219470227,1.2860658144532389,7.988579311863406,3.8114097583695727,5.243954101968436,8.95224080764402,4.898658421783971,4.829297075672447,1.7216388612634104,9.217288959964137,4.051060955902663,1.7085851099312155,0.8966844563289045,9.808440778696053,2.9185586316720658,6.680324086959408,3.82782951349127,9.945540389817104,3.3431077956963473,7.81540318879779,2.4178747843366977,7.914018096913509,1.132541188470071,9.927358728771976,7.241344656702429,1.2508156441903417,0.6307807611430394,7.6870998965211035,0.87798622398511,6.656169602493258,2.617178349257543,0.8431606370896017,7.1486427273416915,7.42399948188202,6.94598136415451,3.7905395062735048,0.5746493198476865,4.976384253300701,2.66434601367596,5.547375299734371,0.3409635052779292,7.324528569754463,7.0458999167551255,6.65918853864291,8.130521188530686,6.406706380364056,6.097203932632147,6.5978407801428895,4.656445012139256,8.17814776518923,3.6379560961791313,1.5071358805349222,7.320342536431728,7.154442462972586,2.1222433245708006,2.1627423835848236,0.14450411123572815,0.8131264716009579,5.820135479777364,6.6738774690054985,0.44469928275948867,0.9774361892674044,9.185273288979555,3.415572730696259,1.7497816125720767,1.235881274040287,2.0238757753631953,7.301512077035492,1.4350298383916593,5.387226623218511,5.95170017257133,1.1290152089918926,2.2572417626625407,7.269149357916518,4.846325235437881,4.696657200318586,1.125670509082326,4.166560114809988,3.359879225232656,1.945843862871135,6.5202132095880945,5.760295839991986,1.1191103263836966,9.056846434224028,9.84640834318471,4.622228716536405,4.436245224883811,8.015891945689766,9.519723457781705,6.523563398437293,6.024424089186368,1.2791964945119516,6.930788839018119,6.803892920122355,8.160185317193191,3.1090256488605417,1.6421549905564081,7.371816690271597,8.670388876106216,8.603414276423472,5.873410110336346,6.272598829720486,2.3062542636368644,4.120535027756409,6.893873049626187,1.1376359862550078,3.517725891312111,4.1216730389167155,8.063376311450213,9.767759151170935,2.897499705490987,6.504125502885342,7.842274425308626,1.182074127177426,7.09642578320463,8.792368725687554,9.600450947494231,7.972624225670943,8.410055208541145,6.571411081239487,5.7218278668095435,9.866102002660277,0.6225226976803033,6.517636288229831,0.41041528803591243,3.0680538748255137,3.6092534893416484,1.2750948788026184,9.075395188421286,0.7835482766128821,4.9742848748551864,1.6149488637025566,6.662108980567738,1.8175294174984802,7.641271244831083,9.410768852771492,5.127154689794535,8.591889393242306,5.708508299373872,5.934364324976189,5.012017541635654,9.006886877099662,7.2591746981463405,1.8254881612075735,0.7140249759930772,2.904579643912306,5.2986859637150685,0.2433715848234752,1.7396461437284483,2.3040542996925484,0.9442263471692458,9.583589564838299,7.034919630080587,6.1680020695953,5.856424654245112,0.41414672473037983,4.338620662442725,9.409745693756992,8.450055929092324,0.21190810460312015,1.2049002896868588,9.339194401276718,7.971529520230409,9.440511420687788,2.70865816962512,0.30947867319292666,4.829225859944937,0.6050378019671765,9.099388763004647,1.9783751624812829,8.589488585688429,5.168689629963261,9.09121293125028,2.3116554446286774,9.523614876695436,1.4244110776384566,5.742177237869138,4.700232592471119,4.370065441801588,4.959299182737482,5.224906153591233,2.2020621620625924,1.3414756771191083,1.2940164764488515,1.360964166634453,7.462724426822147,8.917803173644801,0.8697838351239451,4.857607368017957,9.568785142122074,4.75391809859188,5.914664909086611,6.253065728402576,6.993989819230371,0.9020756700595434,8.203337836598783,1.008107897940389,6.949805560862887,5.774035803098361,5.431944637758739,1.4655488013324858,5.3234657660464,7.99446268795911,8.981924359789756,6.416785852382658,3.845596296799001,5.762602417383977,3.292211587151739,8.890353735613921,5.261424799471679,7.61040226082174,0.19538500167336492,0.5644022034885143,2.710659199186387,0.41136581144876505,8.128194757709068,5.766843137710982,5.7433591025765285,1.3239396486134725,1.355105241802621,6.997999120613654,1.9230218917781938,6.950973438264436,5.354302177414891,8.067177301725854,8.706974963276807,7.900420048027081,8.611553745550404,9.005573382791209,9.552512202215555,9.63294571951259,2.364854778689418,9.159116754017091,8.06843194495732,8.836042489407383,1.5600451315353947,7.927391414641591,0.736324574223024,8.516878900194008,5.00176319376412,5.252252253150857,2.7583751039769444,4.561899967132894,5.047935583679184,4.325521488247002,2.5054708151850313,5.451345053630976,4.684243232792451,9.580118272707754,3.007030961607813,2.2887413636578757,8.719603838149501,9.034456633777793,8.806668784021516,5.835826177039847,4.191216648647245,4.985569414103866,7.691146244497034,6.910379276701779,9.314154056842849,6.856527144523168,8.571716354343284,5.457322426177413,2.329134398396717,5.217960413096751,7.054754067998044,1.6280115571539189,2.0184435618433993,4.993010844045475,3.116602820814498,6.926159342075293,7.150808880057338,3.902586562361001,4.289080724016962,4.94516538586359,8.606041315660697,9.089919401208535,1.0432048490277035,7.311588262081303,6.437327866984637,2.5503173473650254,7.577251658970048,0.8695907952901849,0.49257397888151866,0.8917959982743628,5.56481809326325,1.056212562051726,8.25457009474899,7.172880485010866,3.685766021240855,8.575084749074156,1.078397753949294,4.371587313576855,9.549515878832633,6.6569714312810575,8.488079384650327,0.5689683529127532,1.555993173587693,7.512441057719792,9.33354335642812,9.962458795059543,9.144510127146187,5.645574512494045,9.842655251597721,9.813727208915042,7.098977488646446,9.345173703403983,3.767385697623993,3.5297388033155452,9.521862426960467,9.076110144191636,7.382865050934306,5.828901818211545,9.841229284436599,7.067679232352681,0.5792325507045226,9.08360418721444,6.706007434873092,7.809537340962278,9.564848869191927,5.10446973188087,8.837201926215785,8.373598916092357,9.917245438490292,1.3265859947224112,8.177398238670522,4.478067775673729,3.5727766929693994,2.254129074408169,3.4316131081130408,7.4077843939253585,6.176655103901904,3.0183220315225023,9.339212926182155,0.31478615315750247,7.797939938385134,9.531664555794357,7.007898642709507,2.0526505351032087,4.906541878586966,6.799266511047655,8.456908916364704,8.124400147168679,0.6193508391261116,9.180557314119326,1.2193986701127413,5.726405638682794,9.917971697015261,8.796253721942634,7.693613230675059,0.8541483136715633,9.511383188319583,8.08191208287389,2.9733811848182956,2.5038258950007175,7.226708035286644,0.02045706558969851,0.9589291424589463,8.225421327822303,6.775290145603439,3.1153225998589806,2.818924178389919,5.411469303180918,4.802682399475557,3.839631041109388,7.859226786614628,4.386130448115598,8.48375836574583,9.221677254148204,2.404698873411011,6.41600254650138,3.5123126762201973,5.865208812289455,8.52824291392178,1.6041914668286772,8.716375880948364,5.572788372182924,5.925881719894637,7.281281630812321,9.073386925672487,3.2233885559157094,4.994774731380598,8.98137833832553,9.337826358260557,4.047581224133836,3.1436114878872568,4.290583640239634,1.6883637296421106,9.512834768542195,7.786431718031695,1.3964738552399814,7.625442254362493,8.080740522510565,8.509612918076732,8.522316138360587,3.821057046657381,3.561047479511843]}
},{}],104:[function(require,module,exports){
module.exports={"expected":[5.735052315596863e83,29.207059855920562,1.6009580711932525e129,1.6730578463754645e72,1.4695651763556382e112,3.2008994890212387e105,4.1071865173094226e45,5.406314428563572e41,1.0245269549448579e44,5.171775435863698e55,86454.89207475826,2.3112310250631353e22,2.0043443396542387e78,3.050736470966949e45,1.6818246202394137e35,8.353208943712915e120,1.2482741130918096e87,3.057202660469804e59,1.2586607090889802e7,2.6288447322783343e63,3142.5033589007917,9.392787014352875e175,6.4770306560710426e66,2.2476329459503182e89,3.2062846493430754e26,1.85704125605219e134,6.165209295928006e67,5.819464559871179e14,1.6236303762634167e75,2.2920491302192315e97,5.369383625206076e154,1.423931595518728e26,1.3915275418708011e57,2.111599935438525e73,1.2900051729928625,13202.297255280833,5.235509579943175e24,7.58231348400753e72,2.7094417477393876e36,1.1708975751818184e16,2.5174457863876872e138,1.701973907377091e117,1.2140661591644848e84,6.704066038991312e81,2.1201878980059536e84,7.706473196503268e30,2.3960987915314885e74,153300.01725373813,1.0855992620127015e46,3.6787353474390615e39,8.468989993412369e141,2.9456553339064806e14,1.7314554929832012e91,9.007253278358649e41,2.195691771526992e97,8.87354444409655e71,5.175830258851471e84,4.6304241239016714e45,2.5376468823385643e32,1.3133450104928576e25,5.698830757829609e24,6.031565356891514e132,2.837049525384574e104,3.67670575998722e26,1.9537517385890304e27,2.9634398547788266e48,2.776422277280738e25,3.664494147918496e150,2.8740733098100465e75,7.177572837654206e69,1.1021449216276837e60,3.64774441153031e158,1.6227397844574418,1.8408376172070466e23,2.844342094567705e19,3.0679074397692367e111,2.59655448287076e59,2.8620052177501787e58,2.299423552410548e17,3.654842317347666e101,8.35898391776189e22,7.807795798537142e31,2.0123932940737373e94,1.2205349976007889e207,3.4518079137913045e140,1.387414779665046e77,4.5086967146526865e172,7.876919178335001e202,5.423957459638372e12,1.2339752216088314e101,3.414663046732055e180,3.8666505745461796e22,3.2746895335905765e23,3.304726895035777e111,8.788385940460188e11,10544.240158252402,6.1609887844541894e60,1.163128199453075e10,1.0722616598908626e68,2.8005459162715357e64,5.235055218317704e66,1.744860587545055e63,316.07141419658456,9.038057646888766e92,8.42754648645058e84,4.942819880443383e135,4.967427179767741e164,1.0065928521453099e94,4.053480923916939e22,2.067714396255534e103,3.0345991766968044e59,3.795112004121728e171,1.7646475483645166e11,3.2744188090556506e123,2.4982644026381967e105,2.0332278356476665e173,1.8103555130375599e124,8.338661173680501e177,4.1003183414945086e6,1.071575230773068e155,1.3203036134009426e161,7.747012455626558e21,3.0086100830947546e196,3.351058967229563e134,8.426916209302955e134,6.939519937318573e120,1.852185141182186e49,2.3526092885349504e73,8.949400333043663,2.222054068527319e34,3.86258056790634e30,2.534302118544378e110,6.437151113624638,3.0592564324921363e62,6.28435200648825e143,3.5845872397668737e134,8.400530997198757e70,3.8760332799844356e39,3.4130602348749086e162,5.014777379084113e198,12.25674811058606,6.81069003506409e118,3.6467695512355063e6,2.511794247950098e72,6.071075547329018e26,7.391682250598441e63,5.0917963735489695e50,1.5162457818013061e35,1.4846499133035423e27,4.157886651001672e55,9.795406332347035e34,2.9988331903224224e72,2.854809389683483e9,4.246411642182171e56,3.250833995727422e20,2.7787636503696092e153,1.229568511039624e8,1.578611241421485,2.116357943782216e10,4.90895847310579e42,4.2472008863700834e41,9.23658942654372e10,7.915759102776312e202,1.4357342733137473e98,4.692084835025876e203,2.548163228452931e24,2.4336376115061276e29,3.0313279901577587e9,1.9884082329015645e130,1.0152855415156942e54,45033.24664526577,7.530376709307179e69,1.1325030297592524e163,1.9754774472122996e13,3.965512398832459e12,9.670089693153614e130,7.087497590314e122,9.489028892853886e14,148.40888758967006,1.1836303758611212e34,2.9851297938485916e40,1.5551690063385472e44,2.9409649365429727e12,523956.4356446187,8.130514608415935e86,1.4947726612624849e61,1.1615675668113236e58,2.404442306436227e83,1.5276434000054624e109,5.011062195006608e13,2.5233896056428694e222,4.4392859609297746e123,9.789599929678256e14,1.4571490453429467e83,1.2073655392817764,37.83624803527189,4.504954970884039e28,1.8431137505394722e77,1.4744049622783489e12,59825.46574721881,2.8809883810163776e44,1.000338809009122e14,1.1377789553263913e31,8.306520766485065e136,2.777391951963733e49,2.1231393787936596e59,2.7311632607892492e116,7.129042161094695e109,1.0169943424367182e69,9.511129930770626e130,1.2785277779163157e35,7.426230411636865e146,4.293340249252539e63,5.647301206792057e96,1.0419193888439331e11,4.328660088102692e16,7.542070152159989e122,4.9387281118542e136,4.2120386189160457e27,2.1694204483834011e12,1.5612376835677852e75,3.101744171372377e45,6.06202413147227e11,1.2794487395819753e12,1.2238936856653779e45,7.531035681172755e84,4.282459122803366e23,8.455521971150215e128,5.64294431160677e33,8.6744995132017e13,1.5294351156177727e46,8.538645771997691e37,7.442375211916664e31,9.954749497010514e176,188.68655780085533,1.6474523050548236e43,3.297024954205923e30,3.7185497803562764e77,1.2824777971647883e57,4.2865676951208305e47,1.8539174995661003e6,2.9479184043057845e37,2.899343811233408e199,7.181573838040823e39,1.016811399301356e75,2.406229644107526e76,9.194917348653591e49,1.2566202171170078e132,1.8354189125763055e142,401.68568470780707,2.157466425640097e59,7.55783153910737e16,2.5203856934741966e26,1.7582988085657623e11,1.3336832388518119e82,2.429907202281472e16,3.0049471677358437e40,1.831840385306697e50,9.480689537460887e87,7.253756144476253e56,8.354734862212622e119,6.363613756484299e23,6.272623544066743e62,4.765553633218823e86,1.2966558314309503e42,9.228158593595756e44,1.0229255476338375e19,3.482330779357181e36,1.7274307973645082e8,7.50193107999468e96,1.180935277160939e26,6.951807318935239e39,3.8934171344209115e110,8.139121049242255e63,1.8465070367156178e18,3.4796348448252763,1.4753447216221011e94,8.576073960687722e9,4.558984639271307,2036.4035306609487,1.082385494428335e90,2.3534386453633012e33,4.559610882937145e28,60.05512664304669,8.631535177006272e153,6.938685134632759e20,1.4362510220244018e33,1.845870067054644e11,4.07923757851365e92,8.994576282763279e211,5.335397651996011e117,5.865841889578677e50,6.377397483117065e13,3.4824712845603842e47,1.3345257853215554e86,1.7765633623949044e53,8.610520743071443e10,2.372213043689915e22,8.610900043945062e136,1.825139176130082e35,9.398271470588687e131,3.382913649834343e42,2.2265259062539348e42,253.12619105291873,2.1726101043999918e58,2.171403428733376e31,4.1021332064691e19,6.043015621801642e44,4.155594983344114e19,1.0582328774362707e23,7.404574983307335e72,1.5792075988143097e192,3.117279021325804e76,2.0023718265257405e160,7.98891645152763e110,101828.58025905228,1.3948247107496754e89,3.3544620634741483e67,3.167867139546504e131,6.764052946862251e82,5.256053267255827e50,6.042017782156745e30,8.446496758615149e61,1.560367272182159e119,1.1409060687602254e50,6.842866221303555e31,1.6148636751869575e15,249.83358581733498,1.7448330757147612e139,1.4800118114762167e68,3.0591359421541106e45,1.6405207284531991e90,3.015685357160244e49,4.0504662064199707e33,1.409911541738174e66,3.2449618633505774e120,7.844374006986454e27,6.761180416182888e77,3.918458123437082e28,5.291840231159399e106,7.550805413846266e46,1.9872468734143264e45,1.2927036217994763e60,5.548595650069242e31,7.937509987682977e25,1.5460439383090253e24,1.007241249231009e41,1.9938411922874943,9.028250492273328e12,8.669183905446125e105,2.555985791406667e76,1.2838908359345367e13,2.2588048716297394e68,2.1382573496197155e44,1.6844966026882295e36,4.332606192717622e16,1.6880660502331863e19,4.55045399723462e7,1.698093019003518e97,2.937725153315929e43,8.766246341978951e41,1.9502189435050605e17,9.250899548580784e23,4.7830042778038214e17,5.946656015103605e102,1.9081594621931074e139,494771.9845621336,1.7198495846828563e72,9.70981745554721e21,1.1665057874706689e51,5.205925809943184e7,2.196928760653283e156,2.7140404005112816e79,3.7314621715343404e23,3.0444291803526227,122.11029246793443,2.6395117990443366e49,3.0656713875021136e36,1.898685440031768e59,4.568462965800506e40,5.4118388135447e182,5.579903014321881e44,2.0832004207700294e81,2.6195783976863704e130,8.649806391576041e24,1.8797852384464146e36,220.69869425554725,7.139475495098226e51,1.673216413876e82,1.6067410735550001e22,1.4699211412242999e86,105817.96456441465,2.489541329601531e102,1.0943981264318606e131,8.106203224786581e121,3.5708754084349853e93,4.757969579683045e160,1.1270673213342068e36,1.4418427365484586e25,4.149396296302942e19,1.4371151480671507e224,5.692249616662061e186,2.3004236737759436e31,2.218967023418903e103,1.0104426878840216e119,4.106685920916567e37,8.741782193539003e52,1.9592140539605908e24,5.187734655931245e117,1.7771172561263656e13,9.338196172910474e41,1.6388718671454699e28,4.0807277050711524e141,1.2419785079447269e165,1.3587668692806629e29,1.4646705671226174e8,1.3593898238280048e108,273.439914062239,1.2386069580998353e124,1.5661176511219095e96,1.2946108376616055e19,6.439433889044615e40,3.260130300718555e81,6.510057483295017e17,1.3191384630622717e12,8.81516130019998e16,1.256563983830806e14,81641.48800885201,1.4698993214804023e69,3.7757899516001,2.115843796029375e93,2.022374713748869e50,4.101600584416746e90,2.9529440405266796e34,3.439052857281797e144,4.1516686022210454e155,1.1067854039081578e46,2.7553632213869317e68,4.905204716677309e102,262.8923016933591,1.3938007679706302e107,1.32479136991319e188,3.79593028972879e154,1.2691182119736452e121,3.5373516642056775e8,2.521748049502695e115,1.405644085131099e86,4.441831952676263e11,3.4792303687788626e84,1.1309259683220852e12,9.518267205767084e44,5.988980401231121e67,2.329770025402674e80,1.2860572703643332e13,1.1705316270601806e103,1.2576178719861844e65,3.550996680477805e74,2.4302304654766033e35,1.983634047178505e89,1.7057266969780347e22,29.13635672698058,3.0239441447121647e156,1.4959760416394916e59,2.1804429954004237e39,5.835750808466315e55,3.331384489235939e82,2.7815477385622925e57,8.951389709772069e105,7.798382512545031e29,2.098832772467326e154,8.632082522759905e6,1.1025421222385738e106,2.3467093829912583e30,2.9951206351884596e16,8.699345412853897e29,3.657471261983477e165,5.320759254083285e85,7.788800110631983e53,1.7663814077440231e78,3.8856587801618905e86,5.950012736168724e46,1.5966497118216881e44,81386.66242830803,1.0179515511466384e22,5.774994156510037e93,333600.02700266696,1.628182357099344e130,175115.4739622435,1.2197071181540725e97,9.363902625440542e50,27.71323228634714,25436.408558317296,8.718762502307276e34,1.2708975892057823e121,52.76226261624744,7.424612190475148e33,9.050884664227699e44,4.2026690427804184e16,3.2261757651034346e74,6.19654060006999e189,3.0229044241607485e87,1.234986476149909e53,1.542492213039367e172,3.187408734163186e46,1.2829885208956924e16,5.096409731550415e84,1.2551582076873363e229,7.206242855055611e25,1.5415298293276906e60,1.6460336512958135e45,8.625428819085973e32,3.250757131688708e92,6.40766172155641e98,5.804151772122165e47,6.524802408703493e78,1.6362823773812258e28,9.414520800975215e55,1.3937260574556404e132,7.810841306938956e89,1.5213933194398954e94,9.675538484727044e61,6.87512087622776e23,1.2307278087150657e27,4.811225309890104e13,5.439602375345958e31,3.0577620330832548e44,1.0006818310688258e16,1.2482124379046508e58,8.965710540126489e50,3.822817917151525e36,3.2453800780305703e22,6.743195324323604e12,3.6254867711322315e30,1.3401185931306174e27,2.200919512949607e63,1.5009442899850923e110,5.912166257998595e66,5.060983622995048e66,2.1139484529428278e15,1.2133704634898022e54,3.895624989773366,1.3601840356549084e44,1.6820010589898615e92,1.3961537705259062e7,144.8848822575754,9.882234872859467,4.8005682169339875e60,7.719629196804885e48,3.649707852171671e121,2.5811874868930205e173,5.328417015663178e138,3.6421633057881844e46,171566.60100761164,1.389386817738531e52,9.106575234070255e145,2.255959677767377e44,9.692160753048848e32,8.99898341739358e93,4.502112706052448e26,2.974927483699331e39,5.822088012614944e39,1.3787986060971347e74,192166.62455712818,5.053581107001022e41,1.0342073785922506e42,4.757792049717903,9.269951326561768e53,2.775505685137261e148,1.3677632808564977e20,16156.923730175326,4.0379231285735147e70,1.1227971912370033e55,2.5748507001673237e49,1.003463361349661e65,113136.58572270951,1.7014407963848752e34,1.4599343684870886e78,2.024201767583439e129,4.1388992633993596e82,3.7728194127674494e20,1.049938025658695e120,3.1093571003570764e116,6.135298343898633e128,4.810839313629514e19,8.348133109750831e124,3.5421495817138963e52,3.960750077099678e68,1.1123153444732043e144,418790.0042535133,1.1837686468650348e11,2.2855719293170075e9,7.919257069050867e9,2.0666729369832234e150,1.6895899529110825e24,3.799102915066146e83,2.811240906419488e101,4.481157372421361e34,1.2473039154798868e103,1.0790015633413135e79,7.083796961441894e59,1.524913590376823e103,1.2902884239646725e136,7.966584553919927e30,3.209167418151808e12,2.0471031010399502e91,4.653842518683753e34,2.9141792927943036e102,1.2241213520516e50,4.965933406436564e38,6.752090830341094e14,3.3941102666321256e178,6.117309451187674e20,1.132392440260305e93,3.2010021197438373e72,7.085791980664426e119,3.559099599601775e97,2.4802245540616043e121,3.999480065220898e21,4.4755410918185114e30,1.4311448457278005e42,9.401066364828443e55,3.2181496757779046e45,2.78563718909832e44,7.4460335409032755e59,3.804876368271952e78,9.876881168725698e42,2.958602991309159e93,3.5128755263730428e22,5.347546419276922e172,4.9774767915959365e38,1.1518518134952151e212,6.668953189489679e58,282061.53031698463,6.19289425216359e59,7.532487607161529e62,1.07704104085338e42,2.5391254877232603e133,175449.6090351966,8.341909269610315e98,3.184051478274781e20,2.822687048070618e122,10266.905378929516,729.2008634190348,3.3379733505556267e24,1.3148481752973276e95,4.318173826441325e142,1.0947279451708194,3.110352360214027e73,6.566562945167937e135,1.7728822685892568e16,3.948688500493787e41,5.438383281164952e66,1.7335697615847478e14,4.646036921359503,118.735380258459,1.9892903884940782e89,1.728728307073213e89,6.618127437575747e162,2.6668721203462464e24,1.8900286278586844e11,269541.7209347129,2.978171297372708e101,5.035771073527262e76,1.8319670184064192e20,3.6042834715180526e44,1.8543514851846754e63,1.6205171594494362e99,9.091029067011043e17,5.333517780361218e70,2.112316049941023e74,6.21927394224665e47,1.4064266321492446e21,1.065930061521447e41,6.554384865640951e14,2.155388002953513e47,9.509564404632925e134,1.167645115299455e151,4.80882485975641e140,3.362809437829454e28,3.4125601031487273e47,1.831261394726299e97,7.883082756659777e72,4.4159641355765906e179,3.1414327956147984e48,6.063093856917701e66,2.9702170994501565e64,1.2854372792969354e27,5.028612254800349e85,2.6713208180844727,1.5853579061326624e96,9.948499328017625e11,5.435077873581952e102,3.0054849797980846e133,1.6893451942992755e54,6.457748285158131e77,8.848016236472254e20,3.141128000407524e130,4.9829240791130875e34,3.919909630515706e82,1.0692893158336089e108,1398.0128579572295,1.0762546174161785e35,1.465940066727693e44,2.6238411585784983e89,3.127174770570615e58,7.451059803387486e48,7.615989600008216e91,2.0857808144038123e32,1.2543896384856617e69,4.425903917810359e192,1.3073640468655123e41,2.731436946814345e30,1.7600944222897785e42,1.9240924290564397e27,3.781201296673146e57,1.0315143921383278e88,3.709522750155108e106,1.7041322416184887e174,2.815594015526867e30,2.2333318316334805e122,4.841357891939573e28,7.8971750624488e72,2.290450230966893e106,4.166595365298165e8,1.8223507817556538e17,4.660145738362584e113,5.326428298507591e43,1.7767479355785753e158,7.120833930699039e99,1.4526717103065735e57,1.0043301366571013e221,5.6879704406499e24,3.806183426877965e82,4.988702044684625e198,5.929478270989319e31,2.1511724647454946e110,3.3441315132873984e76,3.1168953255033166e55,9.299951135753173e19,4043.210982140756,1.8501197328561408e18,1.9027974043257133e40,1.106168431292218e42,1.1233821097815628e42,4.754351732137149e26,2.018386127643658e28,7.39553601483117e26,2.8510305585032467e7,2.9854296904003164e29,2.2805470250387754e52,1.0215678639081891e142,1.6580787125473682e38,5.636867959964637e37,2.1623821327793012e68,4.8505213282625995e75,4.559603765906069e135,8.520773419961258e22,5.656169313023524e16,9.264345558197258e66,1.0644178226384628e6,9.878453696251341e93,7.207414737922521e92,8.317919882478111e119,2.3714184633446606e54,1.2199748935076848e17,3.938223211631731e66,1.1086309177615412e51,6.460944762691442e61,3.443642305770897e157,2.8668874560335396e142,2.1532467887545286e39,1.9218052841694517e48,1.042873915809401e32,7.401321001769778e38,1.4465250371547667e134,2.8272209010944114e79,1.2257969933485313e23,1.8187131987201215e118,2.902042114877816e41,4.014375514795787e141,2.2909106902615474e20,4.1142138285199465e157,9.351956564990422e77,7.939326569889496e30,2.138257249491646e46,3.861630927726016e112,1.3005468129744628,4.012196833986673e46,3.616031120213453e128,3.775758839264328e41,8.38280029498824,2.7144845834033294e125,2.9571638536470914e89,1.7788260573305907e48,1.6489228272669334e87,1.2106886164707886e67,2.1465217230026275e75,7.104095112517611e24,1.7958628238623328e43,1.483542365238193e89,4.255622641582848,2.6281592061642905e15,1.8203913379947967e116,3.969064814022229e113,3.1668813205152275e6,5.55008704361638e9,8.631788967077728e83,9.65230141877917e85,5.79696296507314e166,2.7983229439578176e132,1.6943550139328e39,3.1454228223475235e46,1.3641181613055006e99,4.074968067395647e42,1.3064129223880387e23,1.738364934942052e125,8.918484967863545e76,4.539918772558346e46,9.980284316542203e163,2.405502673911943e136,1.5164137957020334e34,2.682946564432314e97,5.330295358973076e87,4.503105048210444e47,1.1147098584361024e140,3.65066914809644e85,3.6975481279743874e55,5.656501652580997e61,1.2700362712897161e67,1.0877968012876266e11,1.9326107754633007e10,126432.78483092849,1.3999451384215874e25,2.1240892776235343e88,9.830415400792352e92,1.403514652072906e122,198.16536040255104,5.117293100374152e52,6.960303230891488e38,3.315064847920697e19,8.010498026755537e164,9.578031850224805e82,8.161536674691236e102,1.1960379463038179e75,6.87442639221429e66,7.436486714317886e16,3.2628164267911503e10,1.1548828234491188e140,2.385707301831737e106,1.4849070070632265e10,5.811578810252464e81,5.297159256342018e10,3.445235224087998e136,9.375653770116221e14,1.986119803514712e69,7.276674134387189e77,6.229957655919336e194,2.969194320146013e126,9.086534525755606e21,7.714921466675413e112,7.987879407483828e139,1.2501744081283615e13,1.6121704174901382e90,4.877162234862251e67,1.217938066978071e40,2.1690021985940708e20,5.580806058624935e83,4.940765802972544e47,4.5461571811755037e139,1.0124830236179414e120,3.520528460858383e125,349762.85985345993,2.66781966514604e162,4.552205358913439e155,3.107059279185664e21,9.247182484957936e41,1.0788689263152377e99,1.0708720686573219e63,2.2189910716948027e109,2.6795297064363195e62,5.9245362131549015e193,1.192362120233212e13,7.326978681649943e109,4.009545569435137e84,2.1609802134550315e8,1.119992874504108e29,3.2545317346618205e90,4.343743165695314e84,2.481732707586295e88,1.0171755785556181e8,5971.979884364806,2554.0615829593326,4.8296596086444394e58,7.398803447857398e13,6.423976510367944e42,4.090028965627231e51,1.405702354258785e54,3.591884070344029e64,4.600850141294251e19,9.964276648376208e36,1.2849654180992207e55,1.0574658256676895e107,6281.968859756074,1.7079231778409807e51,5.8574696582573375e110,3.972419990464415e11,2.0014690343470813e91,9.50560604664692e16,1.0036752689289496e29,1.4344515003347648e94,1.3793859059747773e104,9.59275217692549e31,1.8543827495849763e49,1.4523503434900637e108,1.152682021238539e73,3.359689782012328e25,273564.8400642492,5.734515581176454e42,4.2023724814846136e16,1.9163733236004105e10,4629.552937436913,1.4604022477401506e137,1.0715801294844724e7,4.396008668318027e14,5.072056419307682e60,8.098066215793333e82,4.722595717917084e62,1.4038392443964618e44,5966.34427880884,9.299021764458454e110,1.0759775286182582e41,5.287530588724404e6,3.2581091179156135e108,1.1649826293723697e19,4.9625344132135866e91,2.4533587887114147e50,4.279706986562749e170,2.7268481137782893e17,4.1280159242391616e34,5.467969653300097e109,3.9929808358219184e109,7.404745902751851e43,2.3595346648519785e89,2.2019821625896458e147,6.003519630372721e65,1.9049977226769253e21,103733.5103023296,1.8435557318772516e39,6.073152501840401e41,270.71174974535415,3.823956700791143e47,5.302648499183508e70,6.568059750762362e20,26524.765509052802,8.655827202440241e117,1.0470826834568371e13,4.415954745262923e121,3.3887056714457104e42,25.651237382647288,8.453390470494039e30,1.1950666499995438e13,1.7270749610860502e53,9049.707308233548,3.6828925026611734e13,2.471068451017744e17,1.722764638288239e16,5.463014841261238e92,1.3488635347947938e13,2.702035872505087e8,2.587019307678947e69,4.98452193167265e12,4.1668807875554426e93,5.963451796160948e175,3.0999142309020176e6,2.2773812181945762e100,9.334764557086634e27,140.2335578133232,3.398768538766847e74,2.66905991133001e57,17.040661842673586,1.0999662745967225e19,1.2959669711342282e110,1.2386335989154228e30,2.3576957536841167e51,7.112390022364733e60,4.213110384396636e17,1.0968348393651009e165,5.921954492175724e108,1.3007326177388052e82,1.771704127191277e140,2.95645071972831e171,6.564604914791822e125,5.6031729667875285e50,6.142769311284337e76,2.5753369605807233e105,2.1040976026018553e162,3.6441165208585845e39,5.960022079797811e112,5.224678781814658e89,129322.24722640851],"x":[6.5740958279921635,0.10406223789778846,9.916127962242399,5.715019952531177,8.105441496250041,7.360941873613502,3.9560581185984245,3.1784349122366073,7.96674050157268,8.579311323440953,0.27093329328879534,1.761332158963469,6.7476720117109545,4.877162131927166,5.142369562809785,9.32506870210075,7.03528046915308,5.20614573810422,2.2591933067036485,7.327642477548373,1.2461533381218048,9.770656764675579,6.253442887873186,4.120949036238755,2.180695340325418,7.585322200078037,7.714878973559893,1.3082744514344347,4.360672468730515,7.593311457927441,9.070401625947289,1.5896404365107797,4.699428898465561,5.072235875405992,0.046327707624782555,0.46625730165401835,7.5432661411664075,5.424222881707621,4.8022675901139555,3.9712263207688614,7.819284876130572,7.325074175086616,9.235275494789,6.2415277921733825,9.505595095302153,2.567132390268263,3.645262856099545,2.804786376581574,2.5126293119464016,3.370768305323788,9.067349369102466,6.071889056787649,7.5647450351406675,4.190171243011496,7.631572027164926,7.794079425715108,7.043176004674095,7.689418830740533,7.593372877815623,3.585727272128447,7.823189488814504,7.282471735980403,9.347461294483708,1.4398934629931293,8.481612859308925,8.31634766995146,3.9738733019143346,8.422238371598942,7.799122981837179,8.68674991766535,4.415152638780229,9.118667778538267,0.021687826710368174,1.527436079873219,5.0526785696925565,7.706803610156001,5.439300528839319,7.414097816675045,1.763709014011532,9.106564457010684,8.772112279096973,1.617040732600603,4.459956406216694,9.358766940036485,7.181039999076917,5.283432333724476,9.772308045979907,9.632702600460796,1.0641919413220946,6.613191959881841,9.799641977325038,3.443984623381209,8.008776528494934,7.395508356034974,1.311150336561,0.21819964190028962,7.724607751511847,0.878753861131949,3.774545783661023,6.046394209299564,4.42116455886878,3.854642570675364,0.35234397528765005,5.701929350293343,5.1211342890897305,9.053365800789596,8.866053939954902,9.328647482587833,2.505886603216483,8.031813457409363,4.756072017654018,8.637040337843164,0.8378855064326074,9.044234157774323,4.614814323102118,9.576246260864014,5.964946864498144,9.100164674227303,0.43201626652287883,9.989268300164051,7.5295916828671805,0.9841863522474847,9.984364864071186,8.387083944998482,7.7749241430514315,6.361102237204371,2.8379965336106294,7.99103333341423,0.06788362989611052,1.6130343422693305,3.984836366458069,5.339027924969068,0.07208324349364359,9.055178304661753,9.934852608637403,9.645054248252718,8.189710951373163,4.491097424684241,9.441846837958632,7.948639296622906,0.09832514618855148,8.528986771422666,0.3264703585844453,3.642570868249384,6.908477409948349,5.0378946296155735,2.6916601869037304,4.777146142801341,1.73432390653953,5.5507060225110365,5.680314959067605,9.283525358709053,0.8243234279620748,4.300450871418535,2.63038242445236,8.035783431085878,1.2055576225862286,0.10268969354769286,1.4439507072655666,2.8784950387883113,8.399411289530608,4.042971901518246,9.509085761955252,7.202474112177413,9.29780340777856,2.1204845625792412,3.8692697792995445,1.1027281808611922,5.920166490509267,2.8468793865494613,6.469733226011069,5.244729669566679,9.262298609955453,6.915619882689878,1.566751104217985,8.132787329493656,6.379435336195343,2.3751237237451006,0.3397664142182788,2.614922059612532,4.653016986680676,5.767160611227662,2.8555998559318363,0.5393157462173503,6.486387847316961,5.325034312325537,2.8881181172819836,9.260711161695204,6.664995189921106,0.9952085584380788,9.989033880345126,8.909874849245634,3.2412902300255197,8.830676462613232,0.010011110623127095,0.6100632262908801,1.3918961308793132,6.4952897381286405,0.8381413084299938,2.7962478238808375,5.426235622422892,0.8322073978236322,2.38566364268596,7.6581278701618345,7.856486960442888,5.855067177586952,7.532439521194833,6.979683627530278,5.516354542561473,5.698219260471744,2.558921560598615,8.731857947216666,9.71075994089,6.908093472748302,1.9140010586915035,0.9624787367755983,8.023398018254266,6.658440395234429,1.2026264197515135,2.9326904579154256,5.4640047793471,8.015167199354195,2.9409149371581678,3.245345061001288,3.9840290971110925,4.87824314064224,1.4790554938693368,7.695823508357728,2.377784527292288,6.493181515988116,8.788128070279742,6.759831622959853,3.5903985976131603,9.950419029808831,0.29098549557068587,4.297025313191114,2.1752352505239436,7.159606475220106,3.2538365789757173,9.445857253818236,2.752013352996312,2.515543555246713,8.47324050671955,2.6189340861561528,8.909384628571843,7.950908350530373,7.953756187543844,6.926028791487029,8.368294255771298,0.2719516782572695,7.225003006815598,1.1404852391640086,4.796507301030148,1.798878483660058,8.700101671192574,1.0341723895474497,2.6515376731052442,4.384363818876642,6.994097046568037,2.4591865745026875,5.427702538876115,3.4261686132140046,4.233560446240341,7.404268570840122,4.125471255369426,5.002055078325394,2.208775405591372,5.933408477477641,1.3011596090758837,9.405038427889075,1.6086851693575377,2.423834130190645,8.4311707084057,4.247996280774724,1.4344321620989353,0.1065970568560104,7.8785607048531725,0.4467894284267815,0.33107329441878885,0.5138187413375528,5.363569781512789,2.4712209141004404,1.899039124065407,0.33480719829132255,6.326564221497555,3.8058110185321348,7.10673968250505,1.5536149395503052,5.411072696124091,9.045415850795301,7.983190092533579,4.952858927461643,1.0308380358178892,2.462557281622162,6.957923755797033,7.974034812764215,3.1719560982867367,1.7674697476259515,9.923257482923866,2.0983912942902827,9.389618060141089,4.343945424617798,9.76125060954097,6.226141157561522,6.529631851945976,4.052796539186891,7.1911909733484585,4.1568128563713085,1.2456225991297454,6.595731684721242,4.204471687327289,9.197225020961106,7.18128114728692,7.821026836464069,6.787544298720311,0.27123430092835354,3.8493317708727637,7.8663515962422785,7.62559925885367,6.223475632743738,8.741153705267378,2.7270808508976208,6.431868998996428,9.70573181361031,4.496722928033055,2.6191993256513912,0.8751128694792842,0.18749211503585217,9.769315512409456,5.139871201199395,3.139062759816078,6.15760887324726,2.9770943175941644,8.44761579144979,4.315091808754808,9.875183968051473,3.0191299877309374,4.628243994059136,2.923522791608315,9.893841263714684,3.7040333446269447,2.3090417300968835,7.888297426302476,1.5193521236656715,1.41193628091151,3.8778771024958814,2.864462337001692,0.22490485007130134,0.9487334096539368,8.497075434750325,7.373700113362687,1.242640947837561,2.7697364931901536,2.7077898773833886,1.7486711806045219,0.9959705529717922,1.9055162097821654,0.5602340499329017,6.859900269238908,7.217686451799108,1.804102070476501,2.412219857813871,2.72277982020273,1.6121998074136745,5.83410827310005,5.446529820200543,1.9597051705843227,8.574003618106687,2.483591916439054,7.2809263597899605,0.667416504599474,8.932105896205947,5.122175946803182,2.4872172905789203,0.1260487317120873,0.1725218241045856,9.712366722061896,4.889869895363237,4.7900194407247305,7.52174160349835,9.08761927476384,3.2991308424918575,5.59799863220523,5.525608850024632,1.2602293663044462,4.7806607505305525,1.480535182914684,3.466953529573056,6.911763329603353,5.10844881970272,7.815167254138897,3.362827823501122,7.892121760660633,7.817364656974397,8.736413250364768,9.774987706957805,8.576359160933862,6.435986146667099,2.200097086177022,1.1546856498084423,9.540111932672545,8.750252683995809,5.8082700798714075,8.520767877529128,6.027454481609514,3.013124955159807,4.698562292161633,2.394398379775866,6.41332700582856,0.9286657488685468,4.637941771126499,9.703990161601748,8.562228098400329,8.300701596782593,4.309253540349001,1.3348892424486736,7.591064642006408,0.18436613339938068,8.133134395643841,6.122410869873384,1.6517392643943363,1.989346064824955,4.191559734246557,2.1481127460876492,1.3452441315066554,3.2557912954205204,2.188142881235786,0.3922630609932942,5.234764347060617,0.08634698354771819,5.3634121505387045,3.8440541997696576,6.336021441264339,6.7276622669335335,7.376085914155142,9.309649703363954,2.8091349306813873,3.6774593851296733,6.431817973804224,0.5344194751544395,6.565934857708527,9.950803937416797,7.741253346452992,7.4763191296904115,0.5521781965248529,5.330822292020468,8.244348394910046,0.8783667277968354,5.648960562499683,0.8796767493295743,6.21671506821035,6.816398936504104,4.39794264071624,0.7046556737013376,6.585836206397762,4.617730691064401,6.440299235922488,4.392500294071144,7.762262900858126,8.202713738353111,0.2347087140746562,9.597870472397672,8.855935790133946,2.612758132852364,3.8753848725258844,8.70547451771412,3.8430851804434307,5.754785409827894,1.6515397814553467,8.779986112983346,3.1150007353242004,9.198278666432216,6.396656564563068,2.249064377476697,2.3775655422339947,8.385114008838105,4.932548107007411,3.449663193086483,8.201982118026585,5.854211194139552,2.3206856492907058,4.433489990641388,0.3274295091285673,7.403436322359109,8.170531580134021,1.3661604356804014,8.81931845590226,0.46403133955989606,8.291998233024113,3.31069019728647,0.5114362960679952,0.365926990199128,2.5799527209755446,9.937597993076583,0.12840130919831383,2.375829656574462,6.586961705723566,2.0302879188505774,5.4546750106557145,8.950462451886505,7.073399992254597,5.70212212772584,9.413414627279053,3.5403941795535165,1.8449804319021301,7.830487747069705,9.118619242104405,3.146827481354495,4.009722766731219,4.136233100462934,6.69072814494209,7.919683246149161,8.193070691191181,3.3057843137286613,7.299595962347625,5.93398562985092,4.9054946491233515,9.588586810025951,5.959055482516891,6.461602189857276,5.936850754923421,1.8245265686673395,1.6128846773624894,3.346171942787115,1.7070006765889123,5.056927169805463,7.8140606392525624,5.6793104512641985,7.301331986323185,3.6241036704922225,2.1921118853700228,2.9274978753662473,6.944239584281644,1.501588331421082,3.7320525778889357,4.932747883844764,4.578417140137487,2.7797545844998406,0.9860226455888976,3.433113611322278,0.09726350225552238,7.703832901171945,8.04609914626554,0.6913460313746711,2.301055132892873,1.9468360000120466,3.192255922494267,2.9715353133476996,8.404086041001646,6.986178840992303,8.455993863729496,3.787355838677009,2.0554026634876554,5.861732806221482,8.102598124799954,6.190918045338584,2.3050880125189344,9.629517873409599,5.481184319638799,9.598856956858468,4.949559211005967,8.821562781570089,0.9165859663950426,7.284163029458264,4.796815553271165,0.28404408075355825,6.8275040772699995,6.186561619807824,2.5499939225947443,2.5941089702369347,5.796099817768128,4.107515728348126,7.034502236647073,4.8766589212801765,0.3505332059786159,3.86424064514991,5.791851630263949,9.38490276309019,5.105266575853273,1.4101915387077857,7.0416767410821235,7.624329603745668,8.489454151720874,0.9722805243888155,6.699191624486578,2.8788496265209473,3.8554356658563793,6.59776926631638,1.083906559177723,2.794047919351359,1.6404676956606545,1.6410569399879216,7.957763485808355,4.263001634979393,6.10340200505356,4.746579475317921,2.2348307618849006,9.162618726901627,7.2027687853413935,3.2439685311782873,5.392708807515618,8.693231709468094,2.483547197890994,1.893297729971657,4.988769697031614,4.074198201427821,7.576155766261805,6.10259246693828,4.4034297153525355,1.2480269578896919,9.188868381568387,2.163694380496317,6.438871161211395,6.5428996806151085,6.28845772672719,9.819823523743565,9.366782995742982,1.637253984364928,1.892308263347442,4.146801750763236,2.6124358469567177,3.7282550448181495,2.843191071667872,6.62693736563517,8.12869037856068,2.144915980943012,9.626931692832976,4.562288915575681,8.50513708106095,6.557334546553539,9.397572932179123,4.309281202751389,0.3747829183349949,4.998962976413271,9.243720391291788,4.281642996348214,7.961476175482833,0.3661884258309933,5.353279864952554,4.128418016718635,6.670097348584731,0.8557787139396789,0.5234384759367527,2.0252238758867924,5.538225360292357,6.356966025229194,0.003858729461125865,8.258469083472868,6.557899735737656,1.4652092115421889,4.753338244488949,5.1205807976670865,2.9064663189568285,0.055696373978204594,0.33724985533725604,6.028034047489679,8.646489664992341,8.202529203616443,1.4679487549168568,1.9707491255235698,0.5538383090239707,8.368970856910018,6.553463643143993,3.322557476391639,2.7642057868866443,4.274605645399658,5.884658460990845,0.800152142783177,8.797852565922872,5.501298670432149,2.968639734583982,3.5037726701670846,8.298952906825619,0.9084846689601189,5.768949925837694,9.15561633090382,7.492822518433561,8.280893067411172,2.8016964871668737,3.6933716286656137,8.735073115977537,8.931896052297377,9.397358434896914,6.6248368988236495,7.7932827539678895,9.01240050133697,2.459667919757149,6.030305692800484,0.06106810600609247,5.274384578168889,0.8142801632535623,5.729186751343185,9.071086707761317,5.971411820393612,6.26873942418221,1.745186936037293,5.961734382431585,9.44828776428264,9.690671931212439,8.397269063857273,2.512263089622042,4.2603343036994445,2.9773810387399524,5.873018279388937,4.981683238518809,4.186887552920253,5.314845175452034,8.968384131004017,7.004993417933001,9.299868592007437,4.469575592761911,1.741545347757918,4.581239190099087,7.15665111192318,2.475805890363718,9.50008570529818,6.193578518622425,9.796560292425173,9.199526349774729,8.371771263376148,1.6080856029146262,8.006298271965871,7.725778851168776,0.9176550328558597,0.9703015931059378,7.373456587479657,3.9855852200001696,9.13529669115864,8.634728248811555,8.84305724541105,9.221296349860278,3.6934836943518867,4.69485598257177,9.723470326436905,3.3361154462665676,6.198067820817517,5.280873397011206,2.669024821725261,0.9863749386856435,0.7739175149111466,1.8895397426793448,2.0891216485707442,4.884437740671109,7.276622418020238,4.928455435276304,2.6167285145908448,6.813670611502561,0.3786540910180114,4.523450339299673,4.0001236754009035,8.164249831417811,2.472526996374498,2.0910577223004045,5.577998170250429,6.8053461571358635,7.210670950512532,1.5811014068660234,8.235823986826105,8.040223870712905,5.006414114215714,8.467030385775294,5.389510959547392,8.791216304368755,3.0104458811697343,1.5580276634755386,5.980989327969979,6.82347601278739,5.639250942798888,7.819135445062395,8.079240395243364,2.5905250085736986,2.909803863124867,4.4321712168428355,6.523438578488774,8.040235424255908,7.669124810849011,5.267878794656808,7.398707099166295,9.496592035919232,8.72838267502332,1.4149948457239225,9.092990514198975,5.40635508770948,4.95624117463003,4.019458213771017,4.886713500261289,0.009863414406434678,4.100587573086834,8.46168230707319,3.0114310580057557,0.19917158714060967,6.852305270487529,5.745327378167859,2.8838133521927833,4.607773337729039,4.534940823399203,6.993483295641387,6.0528362990844675,4.6292247774973045,6.008237086318311,0.04454740134527846,1.8928497282555012,5.798269747846179,5.165440400094341,2.164383478065537,3.883061350823316,5.438386337412351,4.250002324833293,9.571728241236704,7.571254614311471,1.9107032083177544,2.3258478660275195,5.588654375359319,3.6607526999791995,1.476332097105002,9.182244339523905,4.698779546675613,5.305062976543438,6.703996367767829,9.149443420550199,2.348171455315269,5.215709210323693,8.521205367990333,4.716076620432339,7.86774980535519,4.84175082132142,3.8676616474008774,6.8989178993436395,8.877322873743061,0.9283257768593312,2.828675313373803,0.49759560884660603,8.918870504982317,8.720745166385136,4.527573917303154,7.882908141307006,0.7594491869203757,4.037125596401561,3.387496222644504,1.27517036537941,8.916298338472151,6.606163161964636,8.319580178302736,3.610767038914242,8.277420353629946,0.9709866981350812,1.5381481117126938,8.007765614561947,9.623076986880186,2.224976266399603,5.5066524190631805,0.8996923292701453,6.413920064364264,3.0145905312655086,3.1178633319827154,6.237208712557045,9.354530828306926,5.779340917815459,2.927700167195608,6.289023710126187,8.352338459933899,2.04285044181971,4.200229507575715,4.329951310044455,7.250944264135624,1.7763141617489797,4.262952778670672,2.3602044937593303,7.770271838096794,6.927098880535123,8.856008849428466,0.7447846834536964,8.939464579866382,9.54536120281782,1.694145131650091,6.863258773975291,7.541305943846459,7.555187266262395,5.068680516874511,5.394492786626048,8.872375811354216,2.92764503553125,8.936245026893452,4.933535977233944,1.0592159195359963,7.856768445566549,5.501236006990666,3.9455146664989504,4.4192558955120775,0.6923142926436388,0.7992133340554974,1.9338697846656405,7.209875480698318,2.7708299421052995,6.070851579769403,3.2207300132278993,3.0483348976122815,8.707549092846222,2.3942115663949526,1.7687102737772298,3.2378465099161957,8.090995184172108,0.8087528632306573,5.166038600808742,8.401421324943865,2.2072153695560304,7.338015989605095,2.0252459701948866,3.6274031796407247,7.070150412366427,7.697125959742199,7.875359133188664,3.1576897510016266,4.744192069481561,6.6076349434938875,2.5864647502428206,0.5379010974434917,2.3797318982689375,4.545075440997309,2.554190089414423,1.2016543319177253,9.004808981683317,1.8845912089235761,1.8421122170048165,9.137227024866599,7.752045503180036,3.8139550225611996,9.266955061801633,0.21994274748181386,6.612740149956123,6.478838009708174,0.9774633663018384,7.955139327904774,9.758071259776234,6.400133175287699,4.954345209204711,9.682511911742038,5.2033552679733415,2.0485973386457923,5.622317818166033,9.97512260899424,2.088719000728654,6.205122994202785,7.564205827197219,3.4472091463037957,1.1982170533349068,0.9980248082346455,4.679991608635239,4.5695195957242944,0.4748266016505265,3.830599712538516,4.720672574768228,2.0187798890523023,0.337135274328928,7.590833301712278,1.8681130389750056,5.800184391694161,5.762743212574497,0.1814586364712345,2.4371608444110926,1.0100682591970966,5.245712360992272,0.5757964292587348,1.1246649989807223,1.5098837766198092,1.5885727236750657,4.571003058113286,5.23792191999727,0.8523140439127452,6.121792501810872,3.2340839247251596,5.619820945986653,9.092888210608363,4.769934916019649,6.05776019002358,1.3929983631637377,0.22606558415756428,6.3468225420546425,9.290696756672869,0.154331319012031,1.0669657246011965,5.815395668328856,3.772090853610992,7.813771140159367,6.6658842839949735,8.853145527857722,7.085545782443572,5.661991480940212,8.356372637296532,9.078823845358405,9.862912874715086,5.580947424699463,4.116055965268107,5.267042521415974,8.96260026385172,9.922279003302465,4.760450508821168,8.538619253421766,6.812201327509271,2.8340904914772658],"b":[30.135236027972013,44.43379647889475,30.519618943378553,29.907902713344477,32.51057687018374,33.74602973772962,27.691415539407764,31.42993684215432,13.26101170837639,15.483610307325272,50.03067671645498,31.409613018272967,27.451707690977862,22.352416847445397,16.45704949483639,30.44739705333767,29.223742832180378,27.169830879100108,8.340799676161389,20.507340490299214,7.607269571357049,42.0591104326951,25.20897241803246,51.12894542358009,29.7824259516928,41.48559401718002,20.78456230495345,28.6095118559787,40.778995276320515,30.215613062642205,39.85853264435407,40.30411161072302,29.011404207336767,34.16903164009835,5.758005636623373,25.318459522330055,7.974512280870343,31.74941698242041,18.266780433406844,10.183753091982028,41.4241674246298,37.554875867367,21.437187529715658,30.880782590224626,20.949760543068283,29.141588747571213,48.322848578593565,4.64517886229344,43.999074608120985,28.201044829726868,36.66853961730451,5.7766222795288735,28.350494418416552,24.112220093161504,30.048118190028607,21.904729279000225,28.363180642618495,14.277865817566537,9.962404013909607,16.959009657983387,7.713531477055975,42.7289418976121,26.265659537285558,45.222141865396004,7.650113056390593,13.982832092868986,15.367200149808879,41.838049621247535,22.925961790185124,18.961742840050224,32.39723326014213,40.656267553147984,31.734305075681316,37.376612856564805,9.551320545467789,33.94476774272544,26.03593865411675,18.760207023720852,24.251683157418633,26.24261406553422,6.274402474983187,47.84312265849306,49.83504230054088,51.55857415173023,45.85120293808367,34.57676578780044,41.23367033372443,49.10581646454709,30.688203255570002,35.939341536642615,43.02836545836947,16.087436565823893,7.004350881590891,35.45963297198122,22.651898958558142,52.01882732534311,18.516186098363395,29.865306799903145,42.68932257182129,25.344248268914924,35.851534788540945,38.968024196006596,16.98709855353767,38.47394394532087,39.19598621174869,35.07687636131186,43.40966984065625,23.724177493647048,21.89459616769828,30.201315232012426,29.65788463451917,46.39308017756811,34.08735703351187,31.99451952119667,53.689488274806244,42.239865823651925,48.83875424481252,45.62411675993452,40.99586304763618,36.28549261880956,50.01420094206304,54.914248023265515,45.88339329767684,37.59310785132085,40.636379512841344,44.55841319011947,41.63622708460798,21.656078416543277,46.70403776959994,51.50664962814015,18.751161643010615,48.6054528675948,33.5127479046358,16.408094349874098,33.85703500425186,32.67186621554474,20.534162300891225,21.071779259570658,40.194876598577714,58.279468885490246,33.38029934381609,32.71365781937591,54.05931209110675,47.048684601506686,9.430728908159143,29.984630359508095,44.962792949574094,17.825159297125882,38.10476756199232,23.823752764828612,14.934699494967308,18.49124637528078,29.737639631851803,31.384779690030097,18.87196780251812,44.65468119611622,16.483982615206074,5.464008755173326,18.650334204715268,35.570539160486405,11.920476269131083,6.493644228911202,49.73274825436917,32.11839273843565,51.07501105707529,28.199070489431183,18.354625981774557,22.578413714844608,51.58439139286899,45.24527992348707,1.9653766045464138,31.53567030220669,41.16993869196441,4.839819455109233,20.708154313499158,37.70465878702967,45.165910065651545,15.934275197873129,16.627855520414943,31.656665913758186,21.01380314420318,18.251720983509315,10.09732521124322,27.181189685397868,31.652160724227084,27.386133277518482,47.84192282817198,21.255460406534304,38.55045213055306,34.99236883387844,51.848801986281316,32.48586719779775,11.370636283506789,22.253205520654618,22.141909408893675,8.377502729852324,50.090427077973736,28.08684492038024,37.020100678558464,4.800443824181473,19.632346151132353,42.94658236819919,31.48484227354316,41.8885582765715,14.621218228823253,24.09078542769796,36.26114369539486,36.97853377291832,29.667805063406483,53.87556350351908,33.05777936864687,39.39704975750606,15.595057794363939,33.01641828974678,15.000631736884724,43.39473062967163,35.92735049745774,48.05917889722042,56.04348758947113,10.585115937439923,32.53905589879563,13.600418211444975,9.703012866643078,9.268807210085207,27.12590076882922,41.07122413587458,39.06716972375344,39.3044050197626,34.523896450551305,5.461783061752712,12.477702467133515,13.586366953147216,21.44083833934607,41.55731349432922,23.400827798215595,23.961386669610853,33.984246363457984,25.546160808972097,41.73018902473331,12.058974601301028,5.684373007674037,36.04396583319182,54.88502993203464,36.76351318973826,19.5508455618674,22.528249210826374,14.890846566613702,44.69439958460389,39.829435414674705,27.92990527313269,19.517669505230288,36.862911977131176,13.212476516325054,15.411276697910843,22.23156353717769,39.74589069408292,36.60467214148161,27.467486196882692,29.69893587270512,55.07030363957968,51.853659177301616,17.06134306193535,35.25709257480691,27.629751642510673,24.600897928847584,21.626837576090733,21.01706341051993,14.93040645891718,16.483920905188963,24.23766873783103,39.84568291499148,39.52052104739544,30.817616295888673,35.78430576429685,31.827111853187755,17.39294302225038,28.185028477686366,57.64045831077132,7.014103689023354,18.00892887674061,39.590418190831244,32.53882372604659,36.69530236922369,13.52205502419159,56.89732234267248,13.255003218404097,11.258574590141247,18.204598265719625,40.369333577191085,54.591522639943705,34.592081675063426,24.34114563570876,33.979150602747154,46.16031336290284,29.11724760445987,15.945956904419202,8.793908600862865,30.853058053266857,32.351229837227045,40.61658197869674,32.926551253031654,23.189565451315364,10.449512405775256,1.0557862273788965,21.29171583830388,18.420224106657717,6.513289729812972,25.57990677073143,39.03605700354341,8.577169317552622,41.07625536413483,48.75361112868907,25.18194310033481,47.89578349831956,38.439024391683496,50.92306538779576,54.62546033828761,20.372791672651317,40.45068074639679,31.433653994003997,13.87128584453956,27.102219448971496,22.775892065150558,28.841979333504714,26.424860612535575,29.588168373902203,43.708143798565615,38.55410547901613,33.32563878742998,31.468918456828554,34.60401375501359,34.506097963645516,39.66629056848632,9.552926283845622,36.34783954490345,28.609021216609413,22.459508790394782,39.73929887399545,23.4934881194363,25.294990639996797,30.341150348208593,47.03586174727178,18.13316413905564,50.78523683640921,44.86833213183615,15.078729824225494,34.389687873124885,4.025502990879248,35.04358571047573,29.338221017783102,24.456132074360923,26.60352332989263,58.52195035636012,39.392487010720544,50.12145627633268,41.654341573015486,24.483552950127393,36.62137143255045,33.39865573258178,14.351981205368611,55.85679310441944,17.761528252171438,20.681505004649807,27.46483212807967,41.40029123535189,59.87078773394494,8.048798948581442,19.93099181833774,21.986358168389508,16.7789244477037,30.289960953799195,40.946356049242596,36.676709587991056,23.346296047279978,14.290891272366597,38.725735102844055,12.127475955797436,18.081689087570666,29.49746240192813,13.02129361038797,46.91413361782347,32.5664132536355,34.34033317232688,55.31964449015254,48.55076524421839,17.91579631295778,3.813257633058842,35.77375020260186,28.09830329788454,10.662524928957527,26.01744125361054,4.058875785189775,30.470918260865286,39.30918812819475,32.77387870433808,22.52574002587047,43.80485755912251,13.300554331398335,27.669020283731523,42.31740344726218,54.712995778232056,49.79219676777482,12.571707784856242,28.53462812773875,46.36961285131183,30.105329405976313,26.855701577932628,25.013028596187947,43.10272751811544,36.224981486595986,21.72729066595632,6.906960649177973,38.75637406012283,46.455100691560475,16.22471538977735,15.256868365160617,33.511466111983886,37.19342106994522,35.78989798573052,37.00259208927993,28.972791606985673,49.29606492144605,45.93868868779296,20.829004086514704,22.811676935563895,12.83280355085985,16.47057048615835,33.51030644391356,31.33986789345814,22.864001548010446,41.038547403007044,31.285646617648645,33.71703775960721,12.19767573527065,45.86863073465856,39.089299901006825,39.347754988510204,44.18590451870048,37.58321373979002,11.746241543061728,38.384914628632856,44.10261713938806,46.708568826849316,37.99941617767952,40.62270814637209,50.85178937962851,24.556384413126068,34.133497237920835,35.34179861814686,35.013960518109236,17.194307861749127,23.49931519111984,43.22821679766251,47.32521017967113,36.831579755069995,33.445597368632704,27.34523260785973,19.521556576452696,27.162829191299878,6.6922977905707315,16.988920967493584,38.13267434650077,15.633781686230202,36.3024280410485,34.29249212837077,22.401718344433217,35.68734727662633,43.313646591821524,43.98379048904038,41.117117083226034,6.0252182421773925,27.141676037308518,11.507642625886128,17.027425759119087,30.382759836967463,46.136046896756895,41.01840144081122,37.288636568171285,22.36026204561246,34.96000072028322,48.23993839993719,23.90271537404523,41.75356232870471,7.247253557106892,27.02140333207484,11.064834638189716,34.59873159991228,29.67773227531349,27.60616862434435,36.85173561789399,8.120082494478886,34.582571228376764,32.77048470649528,28.606826293409085,42.92276653665041,34.39437389419355,16.13975189561458,20.66690430242445,32.26327509753506,49.480170753097994,29.168184446920918,22.230034298268784,42.68909455131978,31.565758287221268,21.57761038137852,25.56068256142936,58.49387729205649,20.184622035631392,35.759104935003975,26.0340124281057,11.952403669010092,27.547340264916865,28.376590491008365,34.697756438351036,25.388155269085473,11.256399316401339,27.135273920748666,32.31063330346933,35.52600011008798,34.396566496710236,24.836402694569646,32.21328076439717,40.858106361965156,10.235658782737914,45.19968304769188,21.15721840626277,4.911841146010247,24.34374793224673,16.640343846242892,24.309483934272833,24.859894531320368,10.941039324346784,10.557279144955519,44.090209134230754,40.26146403994004,52.46419306705951,34.53555016908631,56.93370311409081,39.35131593822985,37.631310793699306,18.78633431200704,13.755230854124964,26.984798247270927,27.86712130313164,2.493164713159537,1.569218258733236,45.21584348209034,39.29748939404723,33.95827054504084,57.954375445447766,38.445580788432196,29.46648155840653,7.144196974508472,21.265504983104805,42.17540349368816,17.029017975733616,34.75420461258707,22.98933040660625,11.931495984428043,9.897152633612007,19.309383420494335,19.924720972623973,15.891599301705334,13.784787707213875,20.575180728071402,6.573119560766703,18.778947438212754,56.12825572249346,19.625772153612814,4.620239002336324,28.887273919522592,31.97107946618669,16.492248001862766,31.698366979171208,39.94488130745749,21.33591359648539,31.851706426129066,32.26707459586414,38.28209814210217,35.99146820198469,39.995720723172106,35.83349641406147,35.591794263853544,50.35305454250641,43.767482656163196,43.67683924174193,42.16006356845051,51.08524984610782,13.089016848165498,10.322403886184146,14.861740223757764,15.795242883687486,44.21796572241952,13.94779259241449,32.37063357002087,50.267354033593506,37.52061792753991,26.505947970582408,25.794564336035556,43.95193590499328,45.02311769347589,36.701666371804194,30.205832772105932,16.915416710383184,43.179218136052256,20.07235617529723,31.79859005921246,19.634011821631905,20.873107561173768,30.176130318231127,45.366828853576095,23.381316349178,34.075147116948294,26.255992725290795,44.693186349453306,23.37079960458164,30.378087777635088,32.65635959198976,39.4560048259911,24.253560626150175,51.04181437139725,29.163512256671915,37.51949275097442,21.43046259946288,22.85211384926194,48.11102947912346,22.916230533472756,12.244191565323174,47.43695533692589,14.136211013266786,52.58399098901751,32.51387183919164,39.1684366516257,28.48078433462224,16.034852569465556,23.529635815126756,39.28121204549817,39.52345571160245,43.51205182646939,12.24300598487015,43.05015385714043,12.940978070565983,15.502329404677218,29.428284925895127,40.48241359689065,52.50538866499507,40.92767060779117,21.115765117757,48.48630130440681,27.191591768074673,20.997403011189544,30.964851366771036,11.801653455755634,41.14376697072922,15.3759112560162,34.9446543653704,24.22113473356962,46.38824727684495,40.83241373356792,14.88488201920517,26.31982407371364,28.56359234291595,27.659789113003477,14.97314614778035,38.57252511393959,35.15098738718674,39.713971174198186,55.876696531520324,18.948632285406624,31.950557851647297,38.65079556816736,14.92770537684613,11.909006854852677,40.86015200840086,19.58487689265827,34.55778454504982,47.179193122996125,39.74726976080051,24.84708421024061,30.6390830642598,26.223123674559176,19.33362015764053,44.605592426713955,17.357392553788124,20.336358537794972,16.798834564207034,26.915090996685848,33.564377668487154,23.143244454330723,42.92832090875331,37.716431335425895,42.19242654678888,34.46878876738807,21.58992314695621,29.31768227513127,29.474869075004506,51.302301797429294,8.771338812374978,20.121424958689783,30.225270793789868,3.6320498116621502,19.88936577621449,35.674275492950144,35.96108395901838,27.94459252027279,27.88134136095231,40.76639744244856,8.730176022519638,23.21287887205408,48.30368125432161,22.005179250205558,42.62474525434211,21.92890931517212,9.335213555516159,55.38095449461056,21.798331049803025,40.467934805071444,41.50338930045774,7.963570625512042,34.31181364620565,43.46010821681864,21.57818441010794,32.406755054397316,24.987073117870136,44.65629715424485,36.24671432084934,26.41913288199344,40.50550817016805,27.213957222234914,15.244620909920096,55.8183045527665,15.970108541303745,41.56383602599711,47.645878188164005,23.011866433937076,41.798469892772594,34.25816465213403,49.56967056703799,50.32659176717,10.866252674220434,23.866283984488383,46.40955656033075,20.512346986969582,13.60422980627865,13.2738914081638,26.495314705463173,9.446061240936455,51.97867945981944,15.48754435535531,31.212863272689617,40.74542041144305,37.24602785922308,43.53859544169971,29.093618913593907,26.248524706823247,44.099017096022884,35.82926713311919,4.899840103029693,19.79036860470782,3.155358491544864,26.07890659284778,40.62098248223597,31.95720102417095,43.045243358568726,27.44337210544035,26.444780527910492,17.877873642525984,25.97373503912832,47.09146701985329,41.299739877766974,36.56452090265587,39.688108276080804,17.163416721239408,14.363703862947723,39.1082621387928,24.359305985270694,10.71525534174198,37.51896266256833,10.438034844063736,38.00459863684279,35.642751521560385,40.51784139467124,34.017164328597566,15.036704164301762,27.470044332890332,54.113764736162665,44.47370383800974,27.0612268460983,35.62094952503517,33.21638827749132,13.232387243130304,42.892894851428494,36.706008845877044,40.01240278755658,44.64176950588391,35.00246764007231,25.413470238727243,10.065581971235545,22.51221689417033,35.06109093701135,43.98829302142022,20.457063135513522,47.106396125899664,51.64963401616979,7.81718518183852,5.893443581439408,36.42774859057458,47.745348836504775,40.71664716059055,40.976514293907414,49.421677067323316,47.93728426893642,41.78677596677359,28.04763420712717,38.453133782669994,31.984385545379467,38.73910384058192,21.014879978951694,57.16175513320971,34.91880662674457,35.329162196428136,43.96440860510266,24.253053945160126,24.15873832804518,41.68607642278671,41.759885324076016,34.1752334918332,21.26298397420426,17.70427453684505,30.043552408295866,9.023874795218427,28.55031698344423,6.846592753487775,23.7685927862252,48.40706923635568,36.34092479851025,8.458766259591627,31.101996650728935,27.43859014625707,37.80277582389089,43.23672847142743,29.615594441911533,29.124853539897483,49.190412884941985,18.754731315331092,43.550823207715766,17.683191593616627,40.97896616130707,25.982339893983465,11.744828989508447,35.08607497854687,30.45756985641369,49.84481540422466,12.42229187324055,52.699027387432224,29.402793128676954,48.58126759639995,51.30596661438926,18.297546831687352,42.20501153422711,39.21078418687588,16.046221670597497,50.61086957695989,37.07102591794325,13.299606655322634,28.047053942907688,46.39192668091097,48.4190417559559,42.0887218820008,40.632340321684865,33.28426236218924,19.16297038759014,42.480479601296686,38.09707121284086,31.39450077287472,14.724716197128224,30.83303844419913,19.648778598223874,50.689883893168314,27.35539379035064,50.940749541130614,11.165962063736297,28.915948230419037,40.54215364311294,19.30872448589082,8.707991630119793,38.736907383747464,50.63351495624076,47.16041100106318,30.820412673977227,11.071582429788775,4.6098427025402655,19.13528275857715,11.750450245974386,16.860309356579627,38.35861389337457,42.424038247793355,17.523261613744808,20.252625348665646,50.560815228284184,40.57723457747521,31.134382859145347,12.675221147584086,23.61882730214742,30.984521352209565,13.587206866791126,29.286660674502848,20.688499034652548,18.935602032129474,31.36253351499619,31.754726421518743,9.875261872196477,37.34774576758137,53.572408430940996,26.22263207619268,23.93536573345731,26.70185373729678,43.1309717030152,8.882389192881796,10.196379287106643,8.697850224394852,35.67340862044847,9.773569077607803,19.75691585063369,15.821359725382202,25.22494100177717,38.97335087698027,11.401774606712252,48.926518733487214,39.44345437715764,15.211578568900762,17.86839265584554,32.072951536946064,4.882560208809332,33.69059413622877,24.320414716228022,41.167019835262394,8.268361836085516,40.963508345872796,45.861689637444144,25.853598570153025,50.42924382874891,33.94855229337746,45.57994919303954,45.35643633594922,43.71268675893137,14.22243148989169,20.20520966446403,21.82727604594806,15.242409058487798,29.66094460963005,35.473322272560885,25.427445444432824,37.38813075446426,36.466132512032814,17.220287277062294,49.21889855336347,17.776111087710206,19.359865161639824,30.71054920358054,33.01764127341615,24.261715894560147,16.859039040387227,30.684491462067797,28.44489405284643,25.205948826339583,47.83522259124139,6.19320892463219,26.378291469858276,26.88104469013275,10.096697748125564,39.19912454064391,45.15916512547959,3.44662840918069,39.01755685453802,49.110662912483505,29.576479008500016,27.85391176584863,14.741394540927883,25.52392595854223,44.59221791876172,44.50747922636081,19.30522664848846,15.739244950826595,21.732434249005074,4.842557633933264,54.418383400265284,45.16222782045856,23.227333623573614,36.150315381334586,40.597397631932836,52.846510955205616,29.51565386242649,34.4293897871673,27.69516502462227,38.267371662711504,19.153599426434575,30.99913690267701,31.03684659719699,4.94264092336397],"a":[1.12546213807589,12.065438714130504,13.434547931626163,12.086800669582614,9.27821462906326,1.560761389560943,4.482564364212562,17.30328496832587,3.925845886296826,4.4166575663913,17.134847595875616,5.306913502535937,6.775826653472965,7.471416229858621,9.9011921844682,4.436747287473306,7.034122052059715,10.220326138843134,2.97351732973246,11.025294662441048,4.319438471015271,9.812438266026762,18.032135156913995,16.532741361015812,6.806925452634389,8.699802646325683,11.622158330295903,4.968456992866908,16.90788069765627,4.9588785427706705,18.76291510161562,10.78896632482374,4.18673384789392,16.821526859425195,5.234193399383029,3.5655228818897156,4.601835234667133,16.673563183760617,8.654192661608796,2.3080593244403858,17.59798438864173,13.825743579978308,12.902154500585654,18.699128660089777,5.778423058174518,13.531561767656353,12.055503396907437,3.6514821715679524,6.248964520785729,12.703839248266902,4.18055826266289,4.823734630167844,17.795940589192686,4.0754187142645915,6.832315056490672,1.6736604501291241,12.663089170517035,0.8186047767034932,9.619307445201022,11.505728547057771,4.098781165667518,11.272540583099126,10.298775531230318,9.303094125122149,6.738546998833348,1.0801558832938118,12.357717261521909,6.930712925430211,2.865076381412077,13.46153164697129,5.248680980888065,10.144283816835022,12.22269261373674,15.242530205091281,3.220780410913231,16.559658915775284,3.458783460675039,6.757061542320608,14.962152000297063,7.8138327798316976,5.182515670635546,16.3924690828407,12.323310876883507,19.933124443065168,5.92363787819441,4.823702215005512,18.634084924700357,13.573717629426838,4.269399923453059,15.58360390398442,3.110062041856514,7.425014679973203,6.126980066631842,3.6795443135692985,15.781992563480308,15.082958290464266,15.763655359920921,5.417510603955038,19.14308544531337,4.300709705027783,6.092334960065711,13.460048947077027,15.63148234021542,2.0351943188121036,4.52582073243645,16.65142934413386,11.48473963724619,9.825014016959663,15.273343964278595,16.80189613633495,17.066494516764617,14.350037142669482,16.940950061458302,16.199541520859547,18.851206241349516,18.115417399222803,18.25102028333305,18.5055398071395,13.236023045194454,11.895066871044975,14.3691992762332,16.04516189524095,15.697850413630698,7.2011041154742905,15.70739646811262,16.25516990609153,2.095384576844399,14.027606275744656,10.963295786144345,17.80480981976747,0.4140624033929674,11.396550786879951,16.418518044452423,4.26894711112654,14.542219210673393,11.924257934415209,4.785997449255603,13.845779697945932,19.655937958863646,19.987569446410394,14.85766535589355,6.991576947320155,15.243654690844966,17.72621300050949,4.7264139870812105,19.188327041980394,18.452948275084395,4.590593869324899,18.60475380638148,12.14774898939413,2.4190030428780096,5.666670702322891,10.928286399193784,8.757781991182195,14.639712111755658,13.656843428015852,13.704008588182933,3.390978966739686,2.4143054224514993,14.816991628876274,3.3820870928114077,5.873169907971252,17.60640966202761,3.8299847459594494,11.230574333777028,10.969381614854733,10.953893157700136,3.1293454014064315,15.479647713775426,15.074726568304953,0.8236387559381342,14.393774759907254,2.443859307609566,2.325121505965666,0.8847489441167733,18.73258945920381,15.015172027208008,3.8186260737785105,12.27754509627809,2.8098311680935772,0.04532616956485214,12.479261971227572,10.008488119083419,19.056118678601166,3.9767964044673354,0.27307606984189103,17.491418668156122,7.478221404997529,0.6028102421535086,8.303307748153488,18.116425830093487,19.686561537822975,8.174261556374955,5.110340536426987,15.467246520623519,1.289543133091291,19.75111791138284,13.924172912601769,12.843903116200188,0.7624299238798038,7.849875556230246,2.997444268292253,16.097423617607678,9.31325151206158,14.294224864280803,9.499225849614973,15.952339761173073,12.211558284200965,8.442565360936563,14.776632162097973,16.339695994780143,0.5348561481187319,1.4876214183126946,3.9825420714886883,0.23165849069764377,10.341170158478192,10.363156214242913,19.42467642712238,19.18349659151019,5.819312026975179,13.317851193692501,4.754142690979415,8.342192326458594,6.479792599295293,9.493859064294234,13.00822670367567,19.435898591850247,3.667750339003777,1.1256439079173575,0.981875771634968,9.355830420580936,0.25254077899099503,11.310195762526085,2.61652622425542,7.036411914495337,16.613791829934996,16.2407240400538,15.37437878605806,19.371021347155356,4.781450274328916,4.513641681977876,3.8773443415664577,16.860637285913217,2.085244143567766,19.06657865521852,19.299062006178964,11.150425097073157,13.201764445428395,3.0245876481737266,9.85196120297208,8.314260109075487,15.827498809784446,10.455248309021346,11.951920363927204,13.615689859225007,11.490430661618035,18.79282576067942,2.568368803664627,5.2151029471570975,18.397475672143855,14.356426551226287,5.887876305673423,10.140749287744777,7.698013881342374,2.29715326986184,0.8719811501296659,14.607761694042871,0.536049662008673,7.298350672729925,10.060526856473032,3.6035317676797485,15.807677541394503,9.6388150908159,5.651715024891435,6.465508181068476,4.561880069853119,4.580887059717154,17.732601693910436,1.2646997648682756,8.093197855822897,10.958700244008828,18.17484198045942,15.477364634950511,10.724583727603921,17.689945470625158,10.188047326766107,5.766143973729059,11.51245557672528,6.947390306313985,19.474368582657316,14.486322157233268,16.496000948035082,9.193559941151692,18.99410431178517,18.685918598650787,4.173835627928626,4.0317190699650585,19.361618314727597,1.4714737474649908,13.60740956635896,11.83309804309423,19.377724022292817,1.3075741592974266,0.6345439327268521,4.433287916834212,15.420571362823363,5.772501225838629,19.569517993907727,13.731438766389976,3.2637947321687033,8.630185967412798,11.20001028571016,9.792098378321432,17.036273498241428,0.7610277904709672,14.842586025224097,15.733856681787888,5.291496081490057,2.45530383491122,9.791320914968873,3.953155724373323,19.48492606555942,15.094148942737133,4.1308808421819565,18.57221653993794,4.280753846234746,14.776538397739127,9.250960859305387,18.835812832029383,8.33445810450642,19.02717745323156,15.784189914258837,18.14928001182085,6.293905988613107,14.8489135209349,13.090907590199631,10.594261949942112,15.674644045731103,17.605715464482635,15.971624122853498,7.360748195082549,14.967959572203409,5.164055769163647,12.36091323562167,15.788727917181959,10.939823643265552,13.434608750648835,2.0369998929417843,2.9624471420444864,4.356468739041954,13.44001737851935,12.33740864033285,18.835604768960255,2.9144794135817254,10.768943442227208,17.535231959819075,18.807059356982062,4.721014713513139,6.1366320401064245,9.767067365757534,19.097334358115255,9.157112751801645,19.6090969409558,5.439746905884091,18.67333675798249,19.922532204544382,0.7433100193436504,8.782573411615203,0.4872572211556747,3.382301152426641,12.959630653094493,5.881434957355074,8.785278078100799,5.533993562245003,1.7566940209238613,0.9425472582748062,6.5661844292107086,1.3615907876656541,4.136739682503676,3.0228680513336137,17.783331551109406,7.680949334650018,7.991313403576132,16.21472577446308,14.282243270218785,16.16457521543369,3.4618779355878493,6.250614658060387,9.013885651229048,5.150196631102522,8.432167997575295,1.6798115860655471,16.4779619331769,5.892389309370456,1.1718093241658378,10.39454097482122,8.509690644689734,11.230459557096854,19.036986774029888,7.594804701182727,19.164419309614825,16.50116644451529,12.243222347020119,7.81399602928603,6.866028694956299,10.022267141307806,11.470728173414674,3.179702744268358,9.157263168428479,11.537230228857478,8.323516091892383,6.0998111524807985,1.3148230319422582,17.942605322789873,12.273187837768354,11.709330343109535,4.301566769761398,18.993030098022935,9.907449300066574,11.561964225328127,0.5741373540939065,18.9313136460035,15.04582727661758,1.5085441384292508,10.83813999866448,7.964916287020838,0.15147256366327966,17.57310882863058,8.283639722301043,5.86704145838326,6.668822919462145,9.447318190405959,10.576464643106434,10.005446684670458,11.905741443025155,10.516991157402739,6.891202738650737,7.576266662189881,7.222298459078651,8.701122957922154,7.1256831131364695,14.389444754748496,9.953825193204583,12.646267765886922,12.381026909212478,10.962458732875575,17.32054134398162,7.239141304834211,9.577336057238552,11.084511325447606,12.7219568639768,14.490051484760556,7.300678463170214,13.781931824092748,8.096818885874928,13.044113033701032,14.010388520580413,3.239233502403711,3.098187942295727,1.7408763077329814,11.069901918644703,7.529877615888618,14.61840965961883,8.952579379065844,11.28598233692118,5.315528732548511,1.464887135722286,8.588429521677096,16.58804740625239,8.141893399872728,0.758889715469393,0.9341949150798001,5.310455936407097,16.688101182831772,18.99304997803473,12.813214691306625,12.854706000315286,10.032907467049995,19.284590394152843,1.2951003623784896,18.108700153729206,8.998997817452192,9.266555764845199,4.5881964518961516,10.82572560579694,3.0071962647191786,11.569572683234446,17.953557711332756,1.9278837325273201,5.6208859962550495,4.252500042152718,0.9304421011728214,9.54710219772112,5.634401961378304,6.743492288609958,16.93776535719384,13.654860872417665,1.0869321946229116,16.98223192825557,10.379817853741296,10.426068466886464,6.279981884078243,19.81566646546188,1.2136407156597828,13.352050488009017,4.4684958316234535,19.871620747193504,3.2128161908225206,5.569605179078128,17.46407254825146,2.632770547357639,5.785859426240099,10.610536156586763,0.6572104192346151,18.97591458482748,10.207412965522082,13.161927208375467,5.747461250061501,16.781361341174758,0.3262411593144865,5.891295499959117,5.4962901565578015,19.869364822629908,5.580858196701821,10.47996199385397,2.2730070000466096,4.3211660125006945,8.744474211393172,7.741191930284885,11.133025486191306,18.327982290717557,6.819772837755531,7.814910802999475,15.976298136038082,18.30182462414605,19.139906741326573,17.262058387196333,18.567282832485112,5.2944822574036365,6.87483171013235,8.29069724979204,3.7318752504839603,12.409007316458593,3.745184360025058,1.720010336030624,0.6506629799935082,13.526627771303081,16.720123271184214,5.396587469997036,19.853887588686927,4.2901131568557105,8.20513369007502,0.38433833000203865,4.472278953928561,7.211181695791393,12.658630196930316,7.029019407347454,6.969784066983884,1.6981836831981,3.545785441305176,8.162494323811407,2.1554876179628746,3.866670804567023,2.7742530840693824,19.10657572482412,4.286205130082621,11.17556677815183,18.972954530030467,4.066914223139033,0.7935208625741152,6.69707142633829,8.614232316938327,15.153967143059397,3.8666753367688544,9.560388553959228,11.598546654856868,16.304561475970395,15.05514383517668,2.4932646907635947,15.260804359549018,12.164797590980934,16.90333777194319,3.418708240370325,11.280634172411563,4.821450243792813,3.9310877544184386,16.531461440657527,18.51944962081899,10.00723520441003,0.18065407270576372,4.528755424282189,1.879939336367471,4.242693647299558,4.713158375064794,4.90828750905175,18.897533405652382,11.463495904472033,0.41693434570584387,19.513378162547493,7.660964816370992,11.126569626913119,4.010440818728873,11.001905027224996,3.5780813578290083,8.28516148322855,18.343215066165783,12.63910683477242,5.075424837262155,17.09189969852816,3.252166457522736,9.86308243641429,16.314703941576738,7.542323348131972,6.912513837008509,18.985771413674136,10.008156805717,14.151664543704108,7.29357068227396,7.988779603444791,16.206381016735328,17.920425731641117,15.318353220094467,10.62452940832625,11.780166151121932,7.604280792415881,17.164993552590502,0.1952078666990431,0.8806738924419255,10.989790694889496,8.595493511399521,14.794604121907003,7.90154690070918,16.72571447755668,6.520558319747711,12.653593618119459,11.244719782011593,6.62019202009271,9.483888140427329,11.057189883427444,5.445906978760098,15.991360959200174,5.61237281584277,6.838861219603407,18.117248382137596,8.353689122913263,19.538460943589744,5.580301026996337,0.017171985621020625,19.7932776316655,19.45939839939546,9.180401539819645,4.898181587347175,10.254220109269747,9.472397320864525,12.761801792818645,9.581586361486485,18.212615126184623,13.670655235186441,13.362912259693571,0.13955107183925897,11.980938383109896,2.2275845659359517,11.630864250467683,8.345088848060156,18.289654940494504,12.424720541096619,6.857843998671869,19.946532698977446,13.594878369316689,13.307098836871312,1.9414595636950027,4.398986054669067,2.4561106011082057,18.651690551592466,10.170726707560473,5.0472143728046825,8.856699370710404,17.62523791048045,6.6982912388748606,19.549366838048226,7.348897894450728,5.2443837474845,17.860425827611095,13.177416819679625,6.027286433797467,14.692092769366809,9.078302988505925,7.206081568373581,7.855475932251212,17.173221434165,10.837710818386878,11.433991951788563,11.821882907025376,11.896933772397826,13.117822874919241,15.315172852822435,15.260082099961423,6.687129423377716,7.430107800405907,11.391707465933386,1.0223073966816498,6.125670601068975,4.840011367081369,1.6653100362094442,9.490706541399874,11.896470064176498,9.855972878959523,3.3431130648768903,18.4805381714002,18.217212802812476,13.136579788309115,6.180872933470001,16.639704789613845,1.822682599996388,17.723334153009137,12.985610490098832,9.501756630821898,18.73069783184905,5.431088848398198,4.139821417200991,14.585803825861658,4.657780344905991,1.8345296153257795,1.2350631843631987,7.46217585536427,1.9679636163251413,1.1601592720162923,9.490857070626383,8.850110154917722,12.502674569657376,18.481257290532213,14.000813198530171,10.340923523500338,14.869241091582621,11.929426619730465,17.384870118097638,13.2425702732194,15.035459953746075,10.85892830562717,10.590551344967913,12.863186865364673,14.216951947819352,14.48834688620439,12.40329682823016,2.2674151820166166,2.098812625594837,7.668354102275399,19.28141478597435,13.515604743658018,12.85334950679542,5.313783987616958,13.134848113901763,14.195150935059893,4.107352562800846,14.779842006935944,5.941749709366553,6.097864515138123,4.18169579968755,2.7131081694957837,1.7956552694689387,16.64844479511794,9.749379946156239,17.903646790330228,16.46404688965373,7.92540647235946,5.6226096522729385,5.275220624406076,14.73695495040214,16.656395183917432,6.104222067961862,11.991483542914395,14.175426737852135,14.80596855951514,4.1324590876078915,7.9334754316030365,18.10144243235948,5.652098147252667,10.747407598940836,6.368933845743823,4.964553608028801,10.949437435776982,13.390659469729842,19.334660525656666,9.133451857419042,17.040497704306862,17.098711846689394,7.700783807928957,17.596735566267782,9.536446163962932,8.88279826202723,7.596010568880325,19.111926631409727,13.938220549708312,14.754228915631437,16.241881216506783,19.23550382611131,15.176864050386891,3.365770891739932,0.6430391519310508,0.6730284083175286,18.678615530225006,7.273078124009409,7.495281668667104,15.759235102964269,4.568962176932629,5.642767588010917,13.215656549876233,15.155699114772485,8.146108876211251,15.211653650377572,17.777162620432833,11.852074764082271,7.158263236754703,1.8846118465010564,15.040105172557151,9.89516198495695,11.772132714880277,10.158241963584992,17.2163667708317,9.266821678449816,5.333525590402188,16.408247636145244,11.769826734117323,9.902177092606195,10.426043229821694,5.196794383337684,16.436692636238227,8.200819165803765,16.102977555285875,17.211070710464714,6.8000580792072896,5.050198189391097,4.196367914716417,18.109267688800315,14.177560401142873,12.932074567838669,4.577448124226149,14.655978642429943,17.567869849376166,17.427835753098215,5.937181949816783,14.942782649564649,3.975543618304722,17.427323885245798,18.30327540465192,11.447725475345397,4.742886043709333,5.687807570987449,9.165554266432881,4.98487466444459,9.765483494577039,13.762349347601335,18.22999034564794,5.931712247912131,15.856129111280568,19.654437216408045,8.607356232096159,16.61878634845314,11.377426352349955,3.466832291488493,13.627325219287073,9.301268093461402,19.675848610261767,12.72384257935014,4.688852981373484,16.802662287421345,13.843313818412142,11.781554434031879,11.614078749730572,15.947701257818983,0.07336359871067621,13.171517520337828,7.2391180975618585,18.44959341762099,7.546539889816866,2.5050389236508286,19.02071544331376,15.991814624352653,16.60279783594905,18.879900673581254,14.177228516813717,6.6562618668471085,3.470300687733623,3.4171051604253577,16.08734276989619,8.127268503408786,18.986183777976528,16.956612964244407,17.44969328340208,4.576949315198884,10.676511307174156,3.2022593999879367,16.76539433801349,11.241501075875142,9.586169462073407,4.141046064679479,8.369997851974368,11.615024016213553,9.864555516533414,11.500264959744637,13.05382261242968,1.6190533642442029,7.166930260643998,12.523217433134505,8.029433748992968,1.5217252457672537,14.646171579116075,12.519349139598566,17.079052182841718,11.710786880065772,18.441020825909828,1.9793173553142562,9.17001669592604,18.811241902196052,2.8737053372325017,15.07833298881545,14.974547900330744,15.523563612474929,7.0967523753667505,6.019990237525681,2.480616566638858,11.101547369964631,4.829683402877261,11.858561629825196,2.7274556776930003,11.85069661850774,19.06167564815489,5.470001589736757,13.011332809797334,8.688630335864005,6.135938987399938,10.427897390966443,7.277929415278024,0.5573846107977065,19.805576588572137,6.775705170193005,10.08939169094944,4.857969121314811,8.016884345070139,14.625782201031715,0.6645781568489628,14.459120507898774,13.021775711588406,13.01217363622495,6.6819438614995885,19.236900996352688,0.11452549398333733,6.682092994902233,14.357306708764375,4.489546354188398,14.580490453260634,14.21336460484607,10.60708634433273,4.0640124012288625,11.420410305998626,12.43872083210345,11.777494827694731,1.9963534456026943,16.25607172508647,15.167805823475934,7.7823019792168635,3.5824244770578595,14.529100140044937,7.231836939110727,16.409471785460394,16.240713682327893,11.259426225424289,4.458849916297485,1.1566544513262977,8.350043016577683,0.6801969437036304,19.15011079463617,5.445043618489507,2.524817749400876,6.683307967703347,9.619715538713614,4.385760955857827,0.1611595470573146,2.5621129048899682,7.132393604805634,5.373545607872163,10.571501783011307,10.263250135303918,1.7617889271829545,4.410988431559955,3.7275120854117905,17.565969296586594,11.495268892600578,5.083597061363179,14.768394139109846,13.653041219690776,19.41791437209683,4.472511147318379,16.830281313597595,0.30407399043179684,0.09606955929256866,19.117009004873836,13.351122461759623,12.364088440320756,1.6357022128820953]}
},{}],105:[function(require,module,exports){
module.exports={"expected":[6.769860395113166e64,2.4666649449234946e46,1.13362778454869e10,8.189386613062514e111,354412.3117808593,4.066432993636327e67,9.445056391671743e80,7.836738850568271e10,5.99998367348217e12,1.3254697941843784e22,362993.79970164737,2.0715511956073642e76,1.310724187087086e108,4.110612832009254e103,2.508734423454994e71,3.8184294244308275e59,2.4589279767607935e84,2.0281718943244806e31,2.143896748430103e105,2.349402434313031e47,1.1686222538930152e73,9.934049681958925e65,8.161004801545948e68,4.708900635570976e28,1.2401142051579878e86,8.99493751471155e39,3.3906338981707065e80,3.0279834493215305e99,562292.9026941517,1.5269189406330491e114,6.977903169503474e57,1.2402551334895245e6,9.230196683249717e63,1.999590104595419e49,5.642255253903475e86,4.2122728341567044e33,1.5181670321198163e68,1.606746630644468e88,3.177304047352189e50,2.2962806709458774e12,5.3469692493677154e7,60924.57120295371,1.2585088721582308e22,189.91094414116452,3.110228927974462e33,3.53566784359661e9,1.9333182914803152e98,4.351425847852854e39,2.1217398504694395e19,2.9575349419765635e32,9.138495960569374e57,6.138956303849263e11,6.219866696238729e18,1.6253438900535227e124,1.7346727094388626e30,1.5327618476640123e86,5.394181901140666e9,179936.28782218302,8.352548820933131e28,5.1847856078942805e13,1.0271123753175713e36,5.2746914402755964e94,1.3097445415118742e94,8.407505902364024,8.035544192574745e13,1.410431802277617e74,4.073396458877124e37,1.1402874912078437e111,1.6844075516636227e6,4.4579992321907456e18,1.7657814752056544e17,1.4564935176328883e45,7.007426515078575e36,1.850359989003339e15,3.480984289294339e33,5.656551722432572e25,7.066420674056461e35,5.776261207848903e32,2.2243245778520739e102,3.496590369018729e70,8.821443025867373e12,2.1032652498130816e43,476.0467812662668,2.1806468608689265e30,1.8021771862775517e47,1.8300995258014097e14,1.2501705045893614e9,1.1040183779425505e36,3.9306173022951614e60,3.0807505587142855e30,3.872460212968944e19,1.2305540556043796e8,1.7647594282827798e120,4.983485654975881e21,3.038433526842491e50,5.621172084514516e112,22.847501729841298,3.377093476077593e58,9.972608006802126e10,5533.79159675163,3.499956267451307e91,1.3003525043706005e49,8.193694810594282e57,1.5776642998148912e8,6.158114514416484e33,4.684717388007384e68,2.2776586567777012e21,3.5077032988622374e55,1.141617124687277e85,5.892413907191804e73,6.932971227558268e82,5.481303042362369e137,1.0584534473994236e113,3.995707020742003e57,3.39761482432902e48,1.1896324267777649e47,2.8524023348767863e19,2.574805743439148e19,2.8222926150757505e69,1.4114212486895726e20,1501.023154738722,122.96926559920051,8.108716838381646e118,1.6742886675622043e11,6.04562722232403e128,1.0605899663469568e11,5.032200920466755e6,8.186328419890042e25,5.098670688338636e39,1.8388884058051098e38,6.286309884099286e40,5.395019480643351e10,1.2480919449167897e30,2.8532983817397545e32,8.952016487938099e75,1.2746983058745642e22,2.059152216678813e22,1.9778348770356355e30,1.4432718013864919e78,1.629268430476344e29,2.57853642677631e74,380.0870802587805,2.2451386576671998e111,1.4015021029136949e29,4.471552392584823e37,1.9065113811687294e83,9.669103239153823e25,4784.835164004737,1.0965287228363704e15,1.81412444795652e72,7.022555321541051e88,1.52047600771209e46,4.0886051404252695e32,1.3390617227213472e20,4.720993264164059e19,2.5873056674149424e63,1.9225210514854527e10,3.3083351516589535e52,1.608912834874738e96,2.1082277785560107e12,4.0489713181127585e72,3.012356905107097e21,1.6407100722834677e73,1.8587052270928948e16,2.3588889138489035e151,1.3566877132347615e50,74.14325500429717,1.6905990407095027e66,4.8322290769084637e27,2.741848869644389e47,1.5902093680669023e25,8.032225773483246e90,9.760293833443902e8,8.992231276300545e38,53263.03647451027,1.1897017635487956e40,1.117936950592805e15,8.911665554060751e21,5.650886708439962e62,1.6037947698617985e76,4.219694709997873e34,3.076586810987429e124,525.7168395570683,1.2609642943710666e106,4.662011518484596e56,1.2758465192825044e24,3.1454186637993346e105,4.149202458543387e37,8.930132160732684e14,3.4960478309623226e110,9.978019272299292e29,7.680184966730668e86,6.220906718581602e89,6.740932194828625e6,1.1785057639882164e9,1.9028612229760423e102,3.3943139441307842e75,1.889577472572194e11,1.1696027973614475e12,4.828344958325064,2.8739478877299584e57,1.4642716681051742e51,2.3457023862146765e35,3.660966000108504e67,6.734508826443682e61,2.1917819624102108e49,4.017023843001093e76,3.7720343841247935e91,5.872286909156334e102,5.607799058457762e47,1.816182655265555e18,2.819997700007108e28,668827.7816191339,2.5268818447744502e17,405.0206274168256,1.8125590295644348e94,1.4450973509064246e79,1.7009342567454049e13,6.4638904001098286e69,4.1424553798634784e11,1.6659635821589656e14,2.9255686276280556e81,3.024266409047996e41,7.950590170273119e34,3.7803301099089385e58,23568.284132110057,2.0290658774496794e121,9.27249626291156e101,1.1636740765593917e17,3.7457047739904573e62,1.9113156442382704e37,5.22744381803838e40,8.534395924225759e31,4.960685596516948e9,3.886784877510653e16,6.0974445504591e11,5.068302770326075e54,1.922476168088055e96,1.7492789400237156e13,4.815962417090197e54,1.8584243126097987e77,8.131437920765372e64,9.356259992756889e134,1.6046374614544958e15,1.1158697298267266e15,2.0501125086638688e61,7.08913350401371e23,1.8882230883903778e33,3.838476791531658e7,1.5231761424872703e91,3.437539181163069e21,6.39762224438845e25,9.912465926481015e18,537.8851380818741,1.322756254377798e7,8.915187374751454e19,2.238364110183866e33,4.98471430187934,6829.744911169774,2.0311754571796648e102,821058.8384741691,4.767468406254218e66,1.1555349148279876e56,5.477769815625293e40,3.366212476693479e44,1.1922550009676286e83,1.2918954719204921e45,5.302541419652032e70,2.0560189804105706e54,3.552504896504959e50,228.61473382031446,264420.1959773973,55848.84747221237,3.6970132320547963e46,1.098740452648212e28,1.8827088576413946e19,2.0194147102981198e15,9.743850249909727e33,1.1524832866578891e50,3.448555197334354e46,1.3999879771589186e16,992.8167413356836,3.5130427174184883e18,1.9134629174338516e21,1.2240224295853572e87,6.5804649341313e50,2.189703224805775e85,1.3166729178974722e36,365.3097576986308,1.0251283736331498e18,1.130867625098569e6,6.773856105983367e64,6.464413563989072e43,1.8392771907705848e35,1.2643931477437065e44,3.3433633999834784e45,6.802421376191821e54,9.037347424153636e52,6.755261555057407e35,5.109894383400488e28,3.080874003910777e108,1.5145079702937836e11,1.26395334431557e35,3.7347902531638845e44,2.8399289644444482e75,1.206468867672586e52,1.231727580538359e49,2.8282308604304476e65,1.3881073146624586e100,4.145385768827003e44,1.1680857468040357e24,5.003438776995012e39,7.9112683781166e36,1.701036387193634e117,1.3175855469644978e63,4.75408624978241e92,9.129055097551216,2.807151334974019e10,2.7181574269815836e16,8.15103546086331e12,2.550496182378147e116,7.138182822781101e36,3.730071781540535e15,8.464687120896288e20,5.9584730103152686e141,3.578785229884287e51,9.144000633243395e32,7.595785868254472e25,33814.98225688711,7.45596437098352e12,1.5808754897970768e57,7.035670796166521e7,5.0270126476874146e10,2.849355589662257e32,2.4535597674618587e79,7.36476244102451e22,1.0788362372582967e70,8.83806529157722e60,51.004345384115126,4.7092729296792006e14,1.3421196513954456e11,5.752827866313724e9,6.286660748340779e40,2.3995454907975627e66,9.84791413939893e35,1.3617443548548637e29,2.046074151883089e51,1.0634699223348526e11,1.8695673234326377e27,1.6025346402039848e84,1.538510997884256e20,797600.9881154014,8.789409418031292e78,2.1377149008718027e91,5.682904680699867e9,8.036749229451231e19,4.4321364765681055e24,2.2782132021082407e67,2.6926964596603843e57,1.1327765782863374e108,6.4633743690520405e63,5.321244860317005e75,1.0258330934126475e31,2.0120340399446401e6,4.3391961374298975e67,48378.86281983634,3.706763735671633e7,56951.54247814446,2.3071911184203862e80,4.2470687535463045e15,2.0932938815625916e19,5.771872869414109e15,3.2467027967841683e34,9.517811182515238e85,1.1412941275443626e105,8.940903867840797e12,8.802989205026939e60,5.4475013534265e7,2.390803109533397e8,3.0213223623174893e27,5.948770576072158e28,12193.648006124504,8.343028053480607e64,1.978431481613922e98,1.0686974011191376e34,64700.42260883641,8.30563108693543e104,4.134850125103653e50,1.0907532788304068e27,2.193080897447754e64,9.86361387021084e47,5.726202611337791e125,5006.536019691691,7.249041251260015e30,2.138551860372866e60,6.566876829425333e12,7.990159549569653e31,4.225090704457453e40,1.3067425702286282e16,9.081225748101698e19,4.40706019719973e45,1.4916728907482935e22,4.318447907045451e29,4.060299291608529e14,3.867558862478639e16,6.222735176051922e33,2.757963872209266e38,2.1602432671114884e37,2.052616782155829e42,1.305637703119032e49,1.2240235808517735e7,3.6800392959074725e27,6.962114239016719e57,3.3115529763431716e18,1.8523334767635062e83,2.8587152142701066e38,1.7051253642098583e31,4.389898713958815e14,3.327839897731088e16,3.841226083502918e48,16269.433431073174,8.513932026929477e70,6.12975829867096e11,2.4951635987350805e107,4.5496311335507685e8,1.3656731305707102e23,2.64836785208208e22,5.316483269724473e22,7.569334354429477e18,2.919463825766686e23,62.11727511986713,3.2961499393798732e81,6.317531350638905e58,1.095262827754536e65,2.7600802894109267e102,1.0161568306052749e40,1.1014101110888114e18,2.5381803819561446e29,1.9872414623307116e42,2.999654800015959e107,1.2495516357461233e35,1.1806739273626123e75,1.761075542009222e95,179.62836980097168,109529.30988751065,2.0801654169380082e48,3.2085965013025537e9,2.8466021242523793e54,6.048421945556935e18,2.5962228809973933e47,2.4367628662078003e62,5.302834564635662e15,7.98032687897411e48,3.826887672806728e24,3.4757516226413645e13,4.735548200388463e31,6.7581881255459615e103,9.865420571479199e33,2.5689528223010314e83,1.0187689241738502e67,5.4917641684445436e115,4.039324586451257e21,2.9516438192951073e76,6.03098839530907e29,1.3277867897803042,7.078984022442555e66,1.4653704623958646e96,124569.26856777446,7.411758445388434e25,2.455991996016523e25,8.038996009727078e16,16669.827209915697,8.889871767344927e28,1.817917020534446e22,4.893526693965321e41,2.739405979849969e6,2.569592659228299e49,7.679239215755018e88,1.4824003576665388e57,1.4616875498945452e111,1.126894837606542e30,9.053217774341819e61,9.729164636915578e92,3.190328261158088e17,7.453724387165014e17,7.126031983888238e111,1.8838701885652695e10,1.597732617014497e96,5.4280600474690725e59,3.469255788609168e20,4.6053419144769176e63,1.0414280324128637e49,2.1506238083978972e48,5.442821244973951e43,6.155350496308085e18,3.2992519466579104e17,1.0709371857688209e36,1.9522488717175108e8,3.3268448259755556e25,2.7240617099305774e11,1.2351803733251811e14,3.6394866823562786e32,1.7864565996454404e32,1.238852586071404e16,4.2766534505772443e64,1.617892199669679e27,1.063750848405245e9,5.489039608751287e74,3.501826014545501e110,2.619572260531761e95,3.8329114269085776e42,3.326276939403517e126,1.269987697443541e50,1.4071853619866737e108,1.9941991085764415e19,1.628862849732331e67,1.3571079182007726,146.19436646567445,2.995578898898659e8,2.9284081577317197e60,1.7481565672199852e42,4.0129936122083724e88,1.741959382294217e35,2.2719940317625313e48,1.0078731835612797e73,2.403258567697129e78,1.57929061165884e70,9.847519275470272e110,11026.768237939626,8.210003644508746e56,8.983082092507295e28,1.4380306530835465e23,2.6750822428712626e20,4.3883275645300174e106,8.64830423216531e68,4.679145926745938e70,2.9897253084358325e87,8.308512969660838e56,6.178240938786956e18,7.673650449114144e21,5.079880184721855e47,4.814065933077014e9,2.7682222653993743e149,270288.4617087987,6.659503899038384e73,1010.2263737166005,6.2926912632772255e25,2.337051092637586e71,1.842495079853578e20,3.4486160715977714e99,120.1405687245449,3.4561172437300176e77,1.4749805533700826e45,7277.873821700879,2.7838580263345316e39,7.880400495955512e154,8.625416767372494e100,1.0120132526921566e12,4.466226042744299e24,2.740595504666988e110,2.3065803574742496e7,2.492343251166844e100,3.317811609549239e28,5.17618908935859e34,1.6605546365741984e74,3.7043201815546524e52,1.7473920185944051e31,8.663550211234109e31,5.592084015453737e59,2.0091988942242077e79,23.77524327733568,1.8157865675522743e85,6.303421473312704e74,2.2761931815961053e88,880173.1405854676,1.7401377914819776e39,1.1857641372763335e36,2.6744220432758646e26,7.891206204106273e15,9.468144040718608e77,1.0209909976042775e13,2.0527126722920272e15,7.490460835244492e19,3.0490358237558407e44,3.944700167328943e13,9.907668943774181e19,8.434906689481212e53,2.1033235531185003e91,2.639068654186847e80,4.329313989510396e90,6.434144912677407e6,2.2406600823274004e49,6.806437309115209e29,3.3684374377253275e108,1.8690983156854025e55,3.41824133392031e36,2.80838571935024e54,1.9364811776785478e6,3.5035413048508888,3.254908487755297e19,8.021240144827303e56,1.772461008406507e23,2.1249687285225927e66,2.8044361821553523e55,3.032247225148374e35,2.8974018938867064e9,2.896570569173143e28,5.888396060889972,4.549857754147755e65,1.0007606052815579e32,3.8838707969856197e8,1.826860654213691e54,8.046075562930287e45,3.451974471412035e60,2.5893874187324676e39,4.237636197261117,229175.4885464692,2.607091213789784e133,1159.024632735331,9.47958495398437e63,5.987298104018401e38,4.7156291303020894e39,6.156861509739778e130,7.210221195672128e19,2.8767864652325486e43,4.4049723951089975e15,2.866689251000429e23,2.512141357911278e93,3.1696029556198436e24,7.250887627960984e81,1.6825099363922482e37,1.76783103447828e83,7.261928173329544e65,9.339185428132856e27,1.682920065388961e95,2.7658397198518007e59,1.7364968447154447e25,1.2721525160201081e104,2.8406331875610257e31,1.3921563698513268e33,3.160008733194094e23,2.159732151121889e6,6.748949039911114e50,1.8228518182460186e34,3.7421255874842793e12,1.0944148230054959e21,3.0034023230691497e43,7.982753633629806e20,1.8165444358154803e25,1.1374227874284215e53,7.382678859507069e26,4.149634803848668e11,3.1220418824729487e61,1.6460184153033957e71,2.605758420918153e38,1.7777127665983644e93,2.877918912178982e80,3.990029677752212e39,2.6317395317425775e54,7.549641114214293e85,2.177538115576887e45,4.4011578195101406e35,7.828590741068398e26,8.871625996080906e27,3.392925936745861e32,1.1135672802646405e82,5.2125601535060975e14,6.410522801261847e38,6.8070166086991876e103,5.739857377025756e24,4.9501202210075315e22,41491.541947716265,3.326982453074936e38,7.04659138119084e113,1.5904923923358857e34,1.6438508729828417e61,6.465774204893121e16,7.349239853055166e65,3.113387300124816e110,4.937252132690319e14,1.3773069380220738e28,1.9900964714013103e8,2.0524479965204517e10,665.535294396375,6.54488550827036e13,4.103491057903011e7,3.25351887635313e45,9.126465692758099e89,1.991187959274781e41,5.845414799073869e56,4.445987147453074e11,5.84142529837664e19,71.58949093075177,1.1989778911427803e9,9.457313628313666e123,7.519153143453454e86,1.56038369520381e82,7.349517261747863e53,4.661655821608733e51,4.345796812806173e44,74.32875446541723,1.668945814505803e40,1.8646319310088343e20,4.4095751308921354e38,4.2054603147508405e74,2.602066977590317e28,2.4796530920756386e131,8.150388244301168e11,1.935230084743659e96,7.38125115118006e33,1.6002834627947714e105,3.304087133045719e11,4.435264631422147e47,3.8277000862877005e15,9.647560418170185e72,6.911864592689823e100,3.404243331965567e86,3.602970863908366e84,5.306062792820681e45,1.01440614665054e69,1.3780057039512904e42,7.323391529136358e80,9.489937638618703e54,1.4816921470902973e13,3.3041438490313064e45,5.904447910910279e27,10.141351225353878,3.1408004322349e34,1.1278446641675444e18,1.436287717803211e23,1.1425291349068375e61,3.257457284918893e20,2.696985256047473e27,3.0384199542431995e27,1.6603122440918426e66,2.781712087757791e50,1.1483489715836573e28,3.4265998577726078e22,1.883960954903632e102,1.8697319683582685e33,9.495483973092914e15,1.3590818259528235e28,6.242657898075076e111,4.409954481598151e41,10026.438617057089,1.3772910049184416e45,1.1214485485208635e27,1.0672146077044614e31,2.335964702748002e20,1.1626613173355398e89,4.289813376148462e61,1.2238362615959522e56,6.776549533469705e13,2.2708692385896315e75,5.081678489065485e28,7.463949571544448e59,8.11843682062254e26,5.0956110722197576e16,1.2047795399361672e9,784.7209004060743,1.2550567652974605e33,7.054388027786016e83,2.480991308813546e12,7.161135046085978e66,2.930953377472521e52,1.6332817847339474e129,2.6957455013443894e74,1.4573978631283448e48,7.072419167767476e57,1.3071316194881384e110,1.8247194023720778e26,8.745599279469692e24,3.2089964298613496e9,9.767298259144406e91,1.5537501025139108e27,3.382058250484845e17,3.391742080373794e103,1.0875065820582226e132,65.59636579670214,1.3047009388427026e66,1.656163510830442e40,9.224230233221132e42,2.444287603877825e36,2.7894238009786618e125,1.709187709310895e48,2.1832756706828825e19,5.971150202147806e6,1.0069191178272992e57,62.452627942597175,9.728438599499774e51,2.538069845889313e52,4.953051502290732e30,2.2722367296548536e36,1.8273016153349686e8,1.9117563258599583e18,3.4439196531669675e59,1.0095628285065047e14,1.3882102851227639e87,8.608025947010391e117,1.616695634560283e85,1.4449678163413662e49,3.937222433764183e12,1.5486179008969105e15,1.0147095039643783e84,8.410543421935714,1.2820484404818044e33,1.6132888213981972e9,5.619054709639597e47,3.4962726205741404e18,1.574382446270126e34,2.2821009761491105e7,1.4671772538627297,3.5714038741898355e30,1.2631634922021952e49,2.271514870372638e32,2641.572231088407,1.3069571085144268e102,1.825985791689319e49,4.9775156865916987e45,10.266090910550677,4.587815538626633e103,5.2480773486360996e79,3.487627744022058e7,7.354899332408884e34,4.203833208618888e8,90369.59006087173,2.15415200106872e65,7.585756677935092e94,8.001855917332628e51,1.946690662983078e35,4.324125904595483e17,105.62142896279714,2.870312149836546e39,1.3922966610001646e80,3.882219087364587e23,2.8338958815112664e32,2.4817233632054024e39,1.0081499789573063e21,8.8573274511524e58,6.137334112064353e41,12404.72380437563,3.7314900512552744e16,2.084951532578002e107,6.580497038390616e17,1.3673441076882626e36,5.8737121060173574e60,6.830006800311815e25,4.9228344373805105e63,1.088290030208759e33,4.3718390988657845e63,8.975362025790219e55,7.099152824062497e60,1.918545494033605e52,21.18274951172142,1.8670394029003467e29,1.138561747350173e9,6.63994821905935e16,5.044844018755687e68,4.574251808477952e9,8.441574644358233e28,7.798808853745122e57,2.6465955871954738e39,5.389584459201304e44,783.6284022310633,1.4869466677481385e73,2.6897231189688376e86,8.567635119007002e73,1.8549396752305048e26,8.223282921765209e47,7.207064275843604e9,2.6981928002854224e76,1.1506618267609309e67,1.984277871445836e55,8.196138793932545e47,9.549178033758904e69,2.1938076180709595e58,1.4021615017273771e26,3.305248453927898e43,4.904615090345216e15,2.1818418263851307e34,49007.79656414766,108066.05718671673,1.231047797244114e105,6.892289894424591e8,1.1773922783435933e36,3.9949269142974726e76,5.3165640522716505e47,1.0254385878207967e83,3.3275439739581195e60,3.7445186025592113e96,3.100323967058593e9,241.39872119303882,7.033609025252159e108,3.966633669252195e86,3.7424526919800536e16,1.239232973094372e15,2.877363557986325e48,9.548263191702329e77,1.5133137380401187e28,25.280668535163418,1.1935655152206194e71,2.065482100020411e14,4.241733615696237e7,8.547744610439592e18,3.6178335982320326e17,5.155122341727128e19,1.8747687293707175e72,3.2699043140005684e12,2.1998145845223423e41,4.4691409034446563e24,1.1476294704358324e50,5.13165801340739e107,6.234415903544343e74,1.4893712301941537e58,1.0782618900480792e47,2.2485009173350492e126,7.476383692316253e107,1.5912695570643063e82,1.0683127111277615e57,5.063721413324431e65,1.6533519396585726e95,5.449513679087604e43,1.3777268834332626e7,2.6475604288972973e44,3.4272192552620575e39,1.2957438214031365e61,1.746836515104419e30,1.186040294642608e108,5.436003044664755e6,1.493572679001877e48,7.874077487993907e23,3.9011806414586296e30,6.640816339018599e60,2.262476620511273e64,2.1728518183562798e10,3451.286552057222,2.5414163728442196e65,7.829392428543098e12,100511.81856879019,4.476460390674741e40,2.410385636126162e12,5.425455874034999e64,5.574583606927262e45,30.675034260647156,1.231253279386449e38,6.147297528642517e34,1.1412539040802498e15,3.2292314809181266e31,6.657522599642942e28,1.227129078378426e60,5.307817901285674e83,2.166844256941714e35,1.8290733015362922e33,8.48116635738597e30,7.570602173609982e7,3.1097195920316623e59,7644.975205191629,1.9536497081294912e39,8.753959058082413e93,45945.452471302844,1.5335673639965432e64,1.5994594314465547e7,5.365475134507625e6,1.2989980862708078e53,2.116952736774318e19,8.597115016933299e38,1.7673536044733342e65,1.7795067585152386e40,1.667684980554719e50,3.1724155972733886e82,1.0481729433360959e11,2.843570986136287e11,9.414879001117578e66,9.367158601614636e77,5.020006077267377e7,1.2761764881813957e17,2.524216837786463e59,3.3887870561254616e16,4.916836635646825e9,2.051536571409246e84,1627.3585057537857,5.018628612803986e32,5.200170563282503e69,2.2145535256418067e61,4.7134178277164764e11,7.407688927162192e46,2.2942813302948795e24,2.1354577313851994e112,5.6893960421681273e48,1.7215485959004414e10,5.869755044308367e17,4.0037329078616795e36,2.1423564449346664e16,9.467387436098493e45,1.543699074932478e76,583904.1575403346,9.500899330307313e30,2.0862416150747358e43,1.307276849512011e89,3.775402184974713e81],"x":[4.174884985473646,6.487246942652987,4.1326868907207714,9.914382719915826,0.7722180683347091,7.0298056226806676,8.543533739864355,9.085309874916671,2.1362379299100986,5.919033614667026,0.8861828509003167,8.654136159197634,9.726981682507589,8.98560314781336,6.076461627981442,7.209758942027231,6.558771205600394,3.943328788443592,9.763590713053583,3.7267861772160593,5.6115917725379845,4.945029762119195,6.234375135489136,2.542656233021552,5.52361044197581,5.418416660251486,6.5184125552728815,6.5227399146854514,0.4370258472206312,6.951972122955623,6.190897830472162,0.9984033852350405,6.789223516700636,7.85313675795118,9.509068224386844,3.124017053210373,7.024572469176739,7.401757086896195,5.706787125713603,1.45894031445718,1.7867900481112864,6.033883898997432,2.426698371287206,0.4131744951434224,7.049510001392609,2.6981592231934792,7.156534853405598,7.636561750427928,3.4398542341442973,4.418527972454058,8.407796009433612,1.104546444807597,1.3206391084591829,8.357713844698305,4.010311503695445,8.742584886601358,1.6328179368004747,0.6083673548143298,5.723310047813337,2.081855247162281,3.2907053296717192,8.765277859481863,7.936622521220418,0.38731451235545444,7.8557864881809465,7.69726219689211,9.954984256593342,7.73720723232401,0.7269471246582038,1.7610272014328654,8.228090452003142,6.720473524708908,8.03884180068113,5.328425341512633,3.339101838935421,2.2381349083362445,7.708266117191345,8.95604481560567,8.079095745320746,8.22295316251705,1.9125035126397383,6.666634155919349,0.9916644845885858,6.278762600718542,7.115649430641444,2.195847957862662,4.780999959510616,2.834103010265998,8.845052191057018,4.705409582860101,1.936249044731253,2.1246505855844955,8.164601900447899,1.9622969094728915,5.552746753018598,9.831127909638063,0.8876338402821649,5.55172397469764,1.1085328261309946,1.388435949118243,8.44376047724473,8.454934919778236,8.680556676334083,0.8211080914633739,2.599350654031005,9.684941047112773,7.055211353283076,8.540185457687897,9.779683420458142,8.749102015371154,5.17392542567356,9.988007175974381,7.559473982211349,6.8978919726273125,4.315842697907783,6.4316649946710776,2.8680144052018175,2.444457862444178,8.484278220863494,2.288318239705429,1.566577425584712,0.2482186891281768,9.667137379484455,1.155679322416301,8.994794625844115,0.9327948152981724,3.0894489062512043,2.340779439339755,6.248697848482429,5.524089352614164,2.67211758649192,4.318157983578175,4.56925356372111,4.1341547835227965,9.308797593610297,3.4191887069553495,2.6637510712906476,8.278643365291137,6.336886083014857,6.327308742787869,8.349305784158549,1.4172916818167813,9.507631934881665,8.468607173185866,7.3498462232903865,7.800987797420191,3.9819228747358815,0.5798448947876111,3.0459321156367714,8.467307032285305,7.80254302133547,4.051762249350796,8.937001879011683,4.242493906598604,4.045331507177421,8.913000011807606,1.639508620126866,5.186289914856346,9.701309405531456,1.4679060637239383,5.342974165722598,2.481254662620389,6.421223273738899,1.6341597012382403,9.252667410981159,3.7380465159930054,4.880392062333567,4.048056904006572,3.8508062838759205,5.9283935548564575,3.0072390060689203,7.683894961656364,1.011807646657179,8.030161071509145,0.5533299505331701,4.583422255730807,4.178018153753329,5.657866383061229,5.843882531632067,7.749131517056174,3.41700636557811,9.193905474162529,0.3150467074446506,9.135193725430515,5.644297814349488,6.327168296684949,8.43894617629504,5.9351715309289705,1.692204194316489,8.868838031233398,2.470365718755836,8.850553699955036,9.144762297194216,1.3223791592968137,1.0394803052348611,8.090848541950313,9.076973910458335,2.342018553263343,1.1782085000614417,0.0772620612356123,6.353323156839432,7.196568099374621,3.320548698796568,9.35193278951475,5.243230868405071,3.9846653505150442,8.839710650026992,8.010654283958223,7.802651748235132,4.1809440366215505,4.925632977768091,3.510419228423094,1.693587800938483,3.4504747496940213,0.3895706623533246,6.38890581925498,9.260957978098707,2.1935585495228382,7.769485472606393,1.2971442051696558,2.7157071500801644,9.106544825112781,3.6266624122746016,3.1550589390151984,4.542309034687002,2.354933857021553,9.191387270901076,8.536172602845351,2.459951072099451,4.9271184223854725,4.357953001413549,4.786658507593722,4.02167774871147,1.4073444134832669,3.4080018711200655,1.966496122651058,6.498225576266224,7.647427150559514,1.7593936843824265,6.499329082440049,7.987800034922863,5.979440974780383,7.973896069896311,1.5770731945756578,1.2575711588802618,6.347982286320509,2.0566020964297738,3.2109648188661244,1.4181411312160774,8.4474128482485,4.799767693124027,3.200043359728255,3.448810186641229,0.29107409704179465,1.4883100978687325,6.548685645533865,3.008676735709117,0.10187263900976795,0.5150498660106884,8.139334991534215,5.30870388828342,6.074849904195414,6.064524177056958,6.004696771436658,8.514226749338697,8.056693657501777,5.151615625297756,5.286616191922812,7.328525394176387,5.185096415589299,0.738039565544848,2.41755158940677,8.049818950726602,6.476887496312358,2.452951075335146,5.2037311242042605,2.0593392463539884,4.171770694100314,6.29095623736492,6.339665351694796,4.65416721279291,0.7698798788224814,2.1426354418802585,2.235382521442648,9.808228274201378,6.962068948877493,8.508790558813352,5.2007155254262605,1.3994910762840895,6.0195148477435945,1.0688424454257461,5.409582577066847,6.478902286826513,4.33683400308984,5.2482349800747645,5.427754035519596,7.574429091112913,3.703733001469922,5.291703092685025,7.5239448580366375,9.820201692428615,1.0280817193976821,4.49311850630566,4.538056824926109,8.72557356907954,3.520719003450681,4.989201449453809,7.811884372035188,6.612374457440955,6.006099483585256,2.817948509318553,3.283428886328932,2.6746296885398424,7.280237656016206,5.614529900557126,9.964648313986697,0.13714376909576442,1.7474661226771548,5.848541543078989,0.9746507786131287,7.595346162077316,7.831260416296352,1.4028891621171447,9.278289759025945,9.753691324683295,7.377163876645534,2.9057477142321075,3.14875413146785,1.0828105917087538,2.2788937138083543,6.715056935206388,2.130035827855843,4.560201836731565,8.263657213547592,5.7259227536685975,5.027347000270805,7.4869557599295256,8.82766493070433,0.3677958937884229,1.1939031867873728,6.838679964167998,2.7238776963375777,5.436861921810361,9.699291370104051,9.550592216365715,7.428567653114011,9.237183732842498,6.094219457677063,4.612844398762206,8.216887065566464,2.434001935635257,1.7758505212165976,8.98778706381914,6.797632175262498,1.6245846602037206,7.226795396186416,2.4535842469820213,6.4504762078009925,4.757593925114398,7.867940121412243,3.9846713071918716,7.681355287735716,3.2362667053886573,1.4515224853445563,9.023542276034696,0.8685599345641482,2.2693052107303124,0.4383080341055301,6.2393069161303805,2.254564398238741,2.2014165956063425,2.939571369572913,6.517515300439218,8.49898771383849,8.712731939604069,2.6518459725929855,5.040339819688238,0.8958192389072428,1.1480254904766318,2.7737799500832305,3.3767704590869085,2.5520718288846833,9.279959112022574,8.283645497366487,4.671391402738578,0.5564948334018971,7.367567554993226,7.30432817210202,2.779107850669622,9.734691753009184,4.390668982355668,9.757171591689094,1.117161020499191,3.538453360459002,8.223624797083588,1.0935993008081457,2.836067884162705,3.745316860357133,2.2450581342893883,3.9471031768081954,7.729872063137635,2.859334146342911,4.999880481968965,3.9232079376260454,1.4735842362538554,8.74848083571116,3.5785334365776666,6.382084625416715,5.340982314009435,7.4207606852097125,0.9740924871128742,4.933291061251404,5.106400984514716,5.779231130483149,6.3357101309252535,8.924952209214576,2.3729466848724434,3.7568024840446657,2.062064325295918,4.879487731756833,0.4588062129493875,7.793928171546387,1.5333659558178714,6.832092622139729,4.67342129076563,2.5324630109060386,3.433220178129799,3.012981855007082,3.802084726654673,9.574697445322206,0.22334322037126597,9.180163123285993,6.8475467527408185,8.677281623158375,8.605297640912209,3.519777932489534,2.833001988011694,6.90362829174652,8.836763768074166,7.723373118249857,7.5278460062151975,6.784484009892086,7.0976054739890815,0.29050862764447016,1.0741997971295336,7.849926197967402,1.080413056191445,6.520399211218983,1.9217133317017043,7.943298568598733,5.053235318274638,2.2770347585196626,7.027817809918469,1.713714433033986,1.9244669443110785,8.694282223717986,7.61273103940802,3.935244272957863,9.260077422847981,8.62849194736725,8.95543642476559,2.892276846144588,9.135692431055254,6.933995956872705,0.08746879722549838,8.248653474925536,7.226993621586852,0.4770424440574761,6.916186375355755,3.4507246426069282,4.859348342377475,2.415181778773079,5.730655961472413,3.622742085138153,4.988381001424269,0.6663087045430238,9.938864607662454,7.01942500506097,6.135057086790132,9.193908391001049,7.173629525072824,8.503268639438538,6.883259517111629,3.240820253701424,1.2526947300900049,9.11890712761906,3.0047655397762263,6.338690776740446,4.295667457399723,1.7697588699352562,7.511966150609053,7.175878589008702,3.7622785914391543,5.488753858344248,1.5330745202097606,1.937984988243553,4.212645570603395,0.7284997336536447,2.1444699378753884,1.6545555104445642,1.3512107723918243,3.4036712109479517,7.723105882827575,2.4077778720064558,4.649646535299022,3.7415074427309647,0.9140022812214643,8.753818128494606,9.736865626700089,9.363159465719209,3.9582557045138733,9.783852808130465,5.998232216490351,9.73028152304577,1.7671126132110282,6.787465356156622,0.6116632945191247,0.26194085133046663,1.4763777748835993,4.23632306610722,7.049544074710377,9.360692492096518,3.4658957559745818,3.4559510480399047,6.417500406111925,5.927146312045759,7.808297262608759,9.24536673853366,0.9706946314804021,4.450692239811591,3.5897480588832464,4.5051332442794,8.789623290859094,8.664397940833377,8.40473587204929,5.799650906222458,6.590557572240439,5.821826453183272,6.793735172372372,1.7133048234273485,4.882021945618731,2.0571994142856864,9.6685874418825,0.8042864192480836,8.48013300282976,0.4446904931438467,2.688044732870809,7.700436364852417,5.773981094728569,8.558797032225357,0.3166969357026672,6.413176980957374,6.0606913244971095,0.5423545696412058,4.235795096681514,9.164918413906554,8.033774400316187,4.651667579596532,2.6856663362837407,9.88057286796139,1.2093623265929554,9.56469279737918,3.4321675797266282,3.631445053298168,9.24980548213079,5.0780682557340695,3.383137748516576,3.0908562664062544,8.790721446618539,6.121759697446832,0.1436556981883519,6.522388856611112,9.176121518485335,9.575169297530548,4.001669758156239,9.830638797833958,7.1695403545978635,3.883227901808324,2.4269220278399617,6.941863560051573,2.572268504342925,1.0775983606665274,4.913834169501277,4.7360022050689405,1.9613685667009872,1.4701926978988311,5.773506123789449,7.880252248963915,9.435730105361062,8.167649954771498,5.78200272268626,3.7142678414662678,9.769729865858663,6.739825151474969,5.301171946135222,9.5594114729509,5.1844278831726704,0.9759015331429777,0.08559464524738436,2.989932130912847,5.080673308233344,6.38823167435723,9.887433735008617,5.404527387462677,3.7966298470255255,3.041507045547993,5.7634871712818185,0.1268247255992394,5.754676076025076,7.117663052905381,1.0558850149006593,8.158808896569333,3.8698339152232375,8.552342040392562,5.415157648029522,0.07787250614088581,1.312924746828219,9.902336689161345,0.7916819936473996,6.70834591545292,3.752012919641041,8.76145595174922,7.821371481082775,2.14027249157545,5.180156230681825,1.7158197689279686,7.766141103787554,9.577277437350322,2.867115137654639,9.358449366343248,3.968568258495424,6.315574717819967,8.589929805733545,8.603596599377772,7.292169612143102,5.558724308775858,4.117092274858747,9.214355571318348,8.13367166211779,8.790124875208425,2.5107258968313184,1.9216304497261505,4.62723111145162,8.315267181611517,3.116517245380892,4.586728102515436,3.798230884143463,2.434423056171564,2.1741540767805345,3.6407719144868156,4.228793899502419,1.1453268920306114,4.535483169891307,5.7667812836316745,4.96387631379454,7.697888078266988,7.639073895784316,4.4660111522446595,3.840832723398504,9.675724329361508,9.427625969684053,6.0711199083796235,3.3979928065679488,3.976614394198479,3.4342902211912385,7.164075583612739,2.5124293616536497,4.218661476328293,7.648938400171752,3.6120838258656263,2.4366684221732005,0.7881867493985317,3.2262304520289797,8.722180739652375,9.43142300244375,9.366998106931383,1.567212957059958,5.511791548964764,7.344047890934442,5.204878800138619,4.693764396566891,1.1009425997256939,1.0191987987772988,0.3972853492271389,1.9010815556975857,1.1409761052042677,6.752340443917147,7.2790461480089785,7.804380965630933,5.437221479714054,1.9207700601699318,3.347592845835088,0.48275649884687466,1.8570419607843514,8.643053349794767,9.255186203450714,9.926175072371013,4.79824856073887,6.884817826959566,9.01650709767586,0.2091157419169587,2.962886990234972,2.3144473029670376,3.5292075624432795,5.354290057235939,2.558467604388872,9.135403837281492,2.373937391778096,8.208625453123378,4.774302636091798,7.481377665744762,2.07818010330288,5.899555754222434,3.0760331541636354,8.739535345630667,9.493324713646203,6.844174883151204,6.345848627982599,6.976326599513795,8.61390571924087,6.383846095625234,8.947622181037943,7.898315869687014,1.338237482652016,5.147735002019886,7.020887090300607,0.20454557759501446,2.7154510927266506,3.2204911777743472,1.5961088533516632,7.911950152178453,2.872121635577576,3.8175741460523316,2.814623917656529,6.393437347331046,4.006953269955904,2.3857104450643773,2.111169190106994,7.130163979751791,5.249921606024637,2.050190084530177,4.68040356510217,9.72500449425947,6.408822827599893,0.6696633680925435,3.520992793828499,3.324139150628156,3.822733453257796,4.874153166876026,8.961453349253075,5.509499300256289,5.452773899269938,1.919449601896288,9.110206706697578,4.308784184462935,4.982205506782842,5.318252457923824,3.0833676180869296,2.839583922150808,0.9440849107803362,5.642236310325797,5.421628945899757,1.9157480719166875,5.305247826195343,4.4392832642933815,9.33596125826722,8.32003853248619,4.752373101753642,5.722334437235839,7.645224029286551,3.6251870134526887,8.602240573729558,4.822734194062413,6.387265908428579,8.42228053694602,7.434067970929039,7.949150006488248,9.555881492789847,0.8042131179057477,4.155263837447302,4.846291068397575,7.509109854893346,3.600180918662421,9.594539346532864,5.297354276859316,2.6039209616383663,1.2224239152256478,7.038060644062383,0.7304302827002296,5.636010595841001,5.198184743810823,3.8240660872606957,4.331017763017884,4.511324534896454,3.409163179407426,7.850002225091284,1.796725142585922,9.10344347009177,9.33540984183978,6.552008180137436,9.271784003267697,1.6922390338150706,3.0031729681904618,7.0880122935067025,0.19080462344799098,2.620252229443083,1.5654715884189896,5.756071816619606,1.44942063669103,5.632352788942397,0.7766509118670317,0.07815520440562995,6.521839433016517,4.970551153069335,5.271918012485948,1.368228003321601,8.467144931694193,5.600899965954831,8.84843650458997,0.12122051142132717,8.83202330457104,8.418886100385205,1.3600523860658331,2.612644394033512,2.1433485987231493,4.787461997807048,8.00299290523568,6.5439307309433055,6.298405613160822,2.7166624946022777,1.7968758053403744,0.1988570915015253,8.369962889131333,8.571052736228237,3.8135273634578892,3.939625638978199,2.9683793403495184,6.498923866928608,8.540834908521212,3.48472200335906,0.5185196312045837,2.6819168867589327,9.596857312839617,1.544676730207608,8.04993618000901,9.896604025877242,7.302287586859146,5.936129195927807,4.3513377801435515,8.68120274842784,6.358575299922833,9.67496086139463,5.052011616441439,0.14591903987424049,3.2204825856208075,1.466365535183145,1.7914584631455566,7.493658309276272,1.4344962560188201,3.488348371005565,5.980659968476704,8.506415604927998,6.205205985909008,0.379495057461825,7.896081244495095,9.598319725255752,6.456367839764505,3.342700110057848,8.022231123418898,1.7800620667708311,6.994080849729524,8.299419253537927,8.046634335403569,7.052157055454398,6.86798242347106,6.677040609850509,4.939889402833222,8.44431288584763,5.03344419349717,8.514215861511396,2.217495850828992,1.2007349734578443,8.926644139977034,1.4366792140102835,5.4256670187497384,8.129749055453505,5.892840096675711,7.819954357890271,6.165638024093683,6.789947075931753,0.9131792292474494,0.21084910430796855,7.950053194179086,7.094094960781656,5.627809736562403,8.487193707045872,5.473549940880458,7.846211066661944,6.3841349269851015,0.4105603097344668,6.975193682628844,2.383419502868722,2.4854960135112503,3.205828884507116,4.181427578863617,2.114680180385795,5.2219901620482005,2.2034814078877085,3.9015463830891717,3.072762219607992,6.859851420257432,6.485595148984711,6.988745641480046,5.660042005348105,4.837632539386318,8.95306973606581,9.620059945206272,5.78114106709398,8.169543549540846,6.032724947222321,7.709504433938836,5.136414111551801,6.4286572577522065,8.929730128170485,4.302985648782958,7.789308281506335,5.067371910279485,9.43470035448956,0.8578151103313125,3.7963348370630956,2.5104575037573373,3.6364483635423728,6.929862638447066,7.46219248788782,0.8890961299145772,4.1511408498751585,9.41800758811403,2.6525308123197777,5.453596680365962,7.971936128800006,3.0928085002995465,8.646690480681618,4.81120639993849,1.2707330225619762,6.201853709170388,6.5498198404373875,2.229101680376331,5.200133810337066,3.262289316992477,5.044135007193802,9.70790248119772,6.265116724739295,9.105622663844656,4.588702150347046,5.219074129980459,9.233601167547922,0.37210195577066285,8.705066283503925,8.144003110127432,0.8269538902609619,7.505089063985606,0.921302056038209,0.742098183887816,3.4793009137031805,9.484745566523936,9.98927061757369,5.2156667038069155,7.850775062284441,5.208230885549487,8.247355917268171,3.756674782013465,0.9367246230548121,9.885523466051687,6.42486574044407,0.8431386970187371,3.883119512603266,4.8343235518417575,1.4154110623721738,1.2537240183468423,7.129268775464146,0.37141140984261023,4.72258693712585,8.834871963165883,5.2814961219247465,1.108108791279201,3.003975333392459,4.874500367938326,8.838179797848213,5.277568850295884,0.9920142330909076,8.42703412525738,3.9684836674725754,2.8631014975966584,4.783396599834406,9.41475710835328,0.5425308864794687,4.773782666336432,4.6346447380769895,9.70420099765497,8.558326178084517],"b":[36.814102545786,17.15461956066479,6.358754661149115,26.51421844697682,18.595502518913936,22.719968635430916,22.40045037601376,2.877560130218111,15.256131450098941,9.015056999320938,16.25868538627045,20.836925608213676,26.099017592745817,27.04528562012697,27.71572456421878,19.61882664772266,30.334225156585028,18.97555225978177,25.340526799181525,30.413775034427637,30.805684189347385,31.61719725915691,26.13741094910388,27.213511633847745,36.72380060246856,17.383759567938583,29.087270653421733,35.84598974177223,34.89338716648754,38.523951128490594,22.233932474962387,16.565579576292503,22.335540966721336,14.821089718864144,21.527725523788344,26.010258776359645,22.94105898685978,28.065936428758853,21.173231610752083,21.233281205707378,10.353822906410661,2.0003031346713263,22.56369924411567,16.904253455584136,11.434877365838663,9.218468018275336,32.28563160140717,12.289857450856871,13.96681774705947,17.401065158678914,16.255915903985155,27.157868336979682,35.20603542063246,34.81427285819448,18.09897906429811,23.173555579898924,14.55427302875265,23.759238816175884,12.363769297946323,16.237603412967214,26.445448928472793,25.419212000412728,27.94080322852439,7.179845421746185,4.497129073771542,22.827435504812847,9.1009957823821,33.67906619289,22.241000337882966,25.894544613630213,5.181186942077112,16.108025878968704,11.106256820178618,7.150785391341556,23.947875611174524,28.117470192465078,11.235073532654031,8.588855477316901,29.71965702074747,20.175569779077495,17.107280121571296,15.394411013193944,7.865297075737998,11.750026723744451,15.863930733798675,16.480391920471025,4.382214449231614,30.576410104697896,16.282950831881678,15.5661985261785,24.487091119458515,10.106551871099153,34.52076016247936,27.196674829187266,21.750631662230234,26.922589181935603,5.220070309063383,25.062821617823612,25.542952498600098,7.9352473091428255,25.542438827065936,13.936008666958184,15.911386077197548,26.23616882901586,31.282696645566645,16.80473344129295,7.415622618754267,15.518834831361978,20.551306221809938,19.999191923606187,37.75975079635979,32.26222631834464,35.07287856667306,19.911233562646927,26.718149849888515,17.558403825162564,16.663102266598084,19.528214117783435,19.20395281425138,21.428028083489593,5.321931116827336,20.684320479809667,28.80500802085229,25.051742369806746,33.53383838634674,29.611643442304004,5.653825498777034,26.686713880340115,15.076673749977441,16.630432152558022,36.622486861249,6.36963076172028,15.825126888029203,19.00949815160089,19.270264024198557,15.857761895382293,20.373931746813543,8.913948918452906,29.131113246715373,11.140311473997011,21.105446427409795,5.124478009853273,27.516383197791182,8.424845184622646,12.22484611719438,25.191038867294292,15.65051488371747,18.70466051876411,12.356049382219506,20.238016491901995,26.80754388192886,27.299153821443696,8.580946536710009,11.797382534882882,11.891504171450364,16.933059533600616,15.239103059346721,24.20712459627448,23.335385166119163,21.3822517127523,32.130990924252856,20.25890086580752,26.98601662635457,24.66950707269011,38.23166935153604,31.950774240814482,1.0981074079860553,38.75147991925044,17.418262258972796,19.1318107418601,20.51165549200615,27.895540845838784,22.17774132633868,11.471657793732927,21.21069778764513,21.071956238639714,9.141802409830726,9.620509119056818,25.532449402512455,23.09655418614448,24.243903043636138,31.72084811299859,21.336971233217266,27.25088021806252,23.812463817267258,9.163864778420464,29.35515419391566,15.288591884773751,22.196096141933317,29.19727109680204,29.499032254801634,23.177057831586865,23.134572228845247,12.276451209592441,22.586060774530537,29.68429248561217,19.55825066207257,12.118998540259334,25.805627841322412,23.07868594540374,21.474339872426253,16.73276084578059,25.403911240485478,17.174219977059163,27.96712643904616,29.609104647180885,20.296609582673465,26.949040822542898,30.974034549214327,27.320115346528674,9.311490835734793,19.796497906500985,8.666383683284401,11.985477979923495,18.572747292801807,34.71754416895868,20.202148306215673,15.344695152699103,21.299347639799997,22.8804199726247,13.166732019737726,21.12947776589218,27.487437344732363,26.58550811453148,30.559577572676226,4.494013015333347,30.93954984432107,28.0387618103312,17.10541823827835,30.092009171332226,20.655533678986707,20.446035191530623,19.319103417272146,17.090004521782575,12.27749155690297,15.084720951579321,20.128756762714787,29.63784689764653,19.273322081041428,19.821089710886163,22.881594164440365,25.626775494198668,39.60962594644554,23.801661273090104,29.827165061022143,22.866712135727013,28.292505984062192,24.996350550976786,14.386001530695275,25.426277742919385,11.000999158571378,19.663497413219858,13.718336703760343,25.43134855895375,11.670820296894743,7.57441003657553,26.60966056717651,22.426646774368997,18.041829070904953,29.485536582293417,2.8660204865211636,25.96541372238941,21.958020540209027,16.263698541770015,12.410414035949078,24.28788915177328,20.921354264395468,31.588289782846005,17.563682846389828,23.305950721076673,7.566213984879506,6.074732274102339,1.48508013733049,17.178444025833933,27.590995170484362,9.08776345681694,18.840887000765534,19.557600413826016,18.958711386689345,17.57211581797662,8.762525821694215,11.04325758588002,21.107151541510696,23.418595890538594,20.85259425260039,17.372532642192798,23.66483388246558,16.719949655458954,5.506698091936042,7.409723651007667,14.182367723156366,28.414549861466316,16.10191291384878,19.73948465684316,20.05811134454957,19.885713747660965,17.241967865638188,34.02988641112095,16.42469672261404,9.315782192858716,25.960181822787952,27.324108633946913,18.717101565292502,23.43845427220018,20.300213797804947,35.247056117081556,23.528989580497054,19.868045066696777,35.59406007100867,17.824781133894508,20.105705302178343,29.067083314730315,33.214990505050594,37.758233821564076,26.684321790028644,21.907487602337895,18.487115051999304,13.958236475282959,7.024923381432537,33.135189872125444,35.93319749346448,11.343568592360999,27.396581985881312,5.578200050651785,34.00235607407183,16.691664808087936,27.293525324825367,20.18417746059818,11.79421464342921,14.008257125440005,20.30067649284468,9.578978818390635,6.041701441271923,9.528934981031982,32.722950456341295,11.246502705054212,22.20471441239729,16.37498555904066,12.536548600557422,30.901567682343437,4.095238263222285,9.404974382700505,17.92482644346899,16.144521623056967,9.08097536904573,9.527908389165187,13.228282465083673,4.586746626763687,14.075412831100444,24.176761168973595,20.68196057344149,9.041673960203322,20.54228782538177,31.644542524520645,15.674573059289637,6.839531373467467,24.490642476579687,24.69102508888315,28.586617096547766,32.253040087216164,37.94951095118314,23.185870314016526,23.204058950411714,11.753867118979628,17.727388791038198,14.775940463621037,8.60012202238905,27.91271511747717,30.42897608143895,17.489035902328133,21.79895694224659,13.409154670867984,12.716996413566394,23.814238637670215,28.282982049634874,11.86142808433856,28.701256943008666,23.00194856976098,17.058075893731235,24.035472140331883,20.591309041921928,4.574278755972099,16.389025222936937,27.865898256887583,17.070878489552236,23.11444135268444,33.456060226754644,16.22349515276607,23.691502048061395,15.6990874517897,26.008988360131198,30.198013075042166,8.039143319735128,21.22657163906451,17.30917238679091,29.24676073412234,26.970800115251496,25.90098407660102,18.14507392823326,11.8994095364787,14.073985265617681,18.52083248164061,14.351518887783579,9.483199868796266,28.194449933642318,9.233308137555625,25.68408694608194,14.080006430226067,19.076298867484642,15.825059792296372,17.317865526348992,13.041255916613355,26.9735181032459,7.895517387109945,30.988697579708724,10.260733937555923,31.833228915343064,9.880747705021076,19.410407823537902,23.748135248400008,25.38955011806371,21.4323253908462,19.72973958574235,36.90883952451926,4.705170832352539,22.286595681115877,16.060234368371496,18.205643299058035,12.120979732113245,6.021276866794167,25.2399078478086,20.931048384692964,20.266532737552165,17.828947622825503,27.940759773906038,27.128932341694938,15.467027704186005,10.29586012823498,11.1834641861603,32.64856804937807,11.192570077359294,26.04843313708766,31.568575913510877,22.225830555876215,12.79331397167413,14.727637369746537,21.59873606025969,19.961464900266343,24.031603194935563,14.052180512216182,29.27820282470374,17.40964730355207,16.644963189779713,35.0138584789233,17.884383399387737,8.740233364227038,32.060862748875365,20.998384519549802,21.23683496930444,18.328037725299254,30.2925602510289,17.84496799641813,19.822097193201365,10.4360734255771,4.884715520536349,18.86106160451114,31.26380518801166,28.20985577176608,9.155393291619113,17.714792460938817,8.564502849660709,4.970038226834808,12.262662755208469,15.190091190692264,20.145309893373334,24.241205736554125,11.881718628211747,29.776820798848355,22.11944012228635,28.35165120022696,10.115585901854406,17.198540615487644,31.785571082950618,13.421513172861834,35.231746027101394,28.765945490017284,8.573596246746016,35.67865465109046,33.02680459942516,28.57533089059395,19.719851394508723,16.25856655154304,30.701641766919625,19.160464195728704,30.06831306692747,21.65928607217421,20.737671604321687,29.69144522629065,28.880436379072446,16.16355463655044,26.08735545417477,23.07650582509483,10.102679899057216,16.725674165931053,32.92600713373053,17.58358472164126,25.494620903729324,20.02770464572145,26.619912078886824,24.009685751661678,25.81326641276465,30.267749373376397,19.652474602839746,26.105370231552254,26.70152396537572,23.41900246261937,0.6804233360240097,23.05921989450207,14.726314025986301,33.86345791426143,13.991194103512473,22.1840048135456,24.51086557416639,33.33526427325286,26.90071655398541,31.198570380085894,21.302507005334373,28.138265458196365,11.528551561646022,30.38540500324561,19.534279685902384,12.70783412918458,5.759843343730084,28.893258187881532,19.46894481155064,28.75391317796995,31.217035885279778,23.2457984268595,6.89915269503361,31.429209163476283,23.358223771437938,12.180404344551476,36.11972269291323,17.971281067177433,20.62111615573578,16.63224816786427,23.527749073049694,21.984253371500344,8.69963700213142,27.37002983081529,15.623484587694684,28.54140652423172,17.735595711458988,19.689024097888876,22.387485090521913,39.48328646547019,29.516162884748333,6.631410062232033,22.445230792623057,26.248988359653428,15.405269518191073,24.634925863511626,20.060099896595304,23.027927090306182,18.979123960112794,24.70178597648423,22.183374564264287,24.928834365093053,15.941026149788922,30.555940928454078,24.559200861118498,30.8207927113839,19.329204101311262,21.761397080669926,3.9137761799801973,9.568673574626509,12.168299580370292,16.649928507741542,15.63711257009944,26.41865726479137,12.752685840518755,35.44113578955151,9.836822699701928,22.557285769509342,16.468214738782667,33.60195621280057,22.15152579810499,27.24353259663766,20.122999335945607,26.170359339246737,2.8167192547040987,31.698419581751267,7.3974698404621275,37.79902176285354,24.737980672734395,9.055114736074223,25.022590188918503,17.40472985839054,18.096879756752788,16.162116858353258,26.686121803873352,8.806481167291992,15.844135281583362,24.31736798560567,22.506163712330277,8.180490231267697,11.911251741905868,21.463496420344523,26.92663825325502,10.961251538231075,21.379627904086504,15.857154383055795,28.36548921177817,16.56482353629529,17.368571570310163,26.27161077932633,10.838907008303046,31.5338459934419,9.824002549746748,22.648949359009865,24.870214689193958,10.867611944468862,39.14604840582554,23.025875684938825,20.146532875990385,22.561814943419463,7.355207197175999,22.957423489095625,20.230858865569044,20.614567851230838,22.364288607997388,31.07007211067849,18.239017303350867,7.970953537883232,30.6703056250289,25.323944803648565,14.942838064429665,26.53139777981998,9.413388362738452,9.044950758755208,22.616066622281355,7.831836458409991,26.207462935218402,9.61484966701335,10.04834020647149,11.383456047607442,27.493847755324257,21.35831235475909,28.415107089793846,34.71233928040918,15.17695889777983,24.93501283264337,32.14316994678396,29.196166102680607,18.42359134523471,28.486855552802268,24.826295707182673,21.26199036430662,33.695086517423015,20.871768292940956,11.33254673182121,14.212938632361677,18.99074380721228,17.098200816481473,22.870168057548092,26.921625013293948,14.778791162600472,21.908591242385672,31.888346586436022,16.73882849413444,22.97240123760516,16.467589964391436,28.74880319838522,30.62785312131256,8.81143843759537,15.491702039815443,26.484431874110694,28.28683870376146,35.303272129752116,7.087547883605345,14.670197867119933,20.097997746023815,25.716260254151546,21.258065765778824,18.594453138586292,18.00087300499518,16.089341617864882,29.131182152167973,12.618357134109193,24.830288978574828,14.133987556109897,14.755510058374805,10.813978598627836,12.665159365120374,33.60257197261163,22.168450255684874,19.568774034543118,26.738798367983055,17.946390033464805,11.894861506098433,23.351831306427368,32.56095739442896,21.25152689700045,26.398548633822738,32.92700030009919,26.955510447559167,33.6807118623297,12.889333482843627,27.618312489053647,17.187384739706797,33.02944208070548,13.251392355603585,19.195762354801598,12.706750225871431,19.531648398766066,24.89118402306665,29.78475568644999,31.439077376153914,15.658749326273483,19.030332128731384,15.904291762858792,21.158007303495054,16.423597226251367,24.85730030993283,21.169513954368085,9.638414085788241,14.260412905457919,30.71820584354214,13.98046735897807,35.47911059635201,18.35944626757251,16.896531437024993,17.013808926098044,23.62311612199821,24.4287709150455,30.07000563730107,28.63792252231366,25.85460756587853,33.69023014796214,15.335343423458552,19.704261776984165,14.39106306582142,26.945742524322668,15.182761475021422,14.768056489528306,30.69349131552937,19.279144919660652,19.417419639498608,10.199473323631878,23.31603755544242,26.58271987036105,24.403688882779406,17.669251305506993,19.55482319988451,16.15215345826946,28.546171117348162,12.419869603443718,13.006597894615197,8.350184957060378,8.586379301520047,14.15694860659456,36.46423930346438,16.470636909909828,29.88123209492828,28.20847451359881,32.409171279019205,21.165908025174375,24.03639086124203,24.09251617569919,33.80408616917109,17.818387106445535,7.044637075266742,4.815988541953566,33.88526564769817,7.91654115422439,5.86024139135616,30.593968331077754,32.343300751644264,7.3760606343430535,37.694897760539824,19.653720056273862,13.78020070273283,24.29301890610322,30.634402941848066,21.778824614207508,18.381736444552047,14.660731829146524,19.208545501235402,7.697908548818062,22.029195557136653,23.984003107253738,18.920873553903622,20.072773167715038,4.6687104627908615,13.353876290510396,17.900740640355853,19.865198349661696,22.501593388139476,29.631072412165015,30.681918242498053,12.606201478590311,19.141865477024826,12.56079651265173,27.941754530163216,13.322084928971623,30.58707761895473,15.461733896593643,19.753224028835522,31.497639191269254,14.566183635869875,23.688954676247874,7.790704398828363,11.352890669542738,23.64578905234335,14.952106926753345,7.169555275565189,28.349546376254082,21.028757660594266,12.277841409414414,26.57307637099295,27.598848130384727,22.35833865941988,14.718423206285962,32.23100404571396,9.645109363115001,2.558505738764101,19.34126914944485,34.0843615273928,19.36627790042853,31.209555220948957,23.987006748905465,30.103096678145736,11.350600722615258,22.127500848582045,14.947880956969684,20.036946104843143,31.850882212726667,8.041307521657561,16.374046175839396,28.633723198693893,22.510755077680972,15.358399935218717,26.267097351134886,28.56639812016885,10.7865755708942,14.500979046110729,8.60509985498636,25.436547307069,18.28371824601293,17.300233419035308,20.95177647607577,14.913521147768936,24.63589614635565,24.690782067824163,21.92985728020123,15.892954293551504,22.691486636656343,21.67133849523256,17.62450145767182,20.103721964203938,22.99667121527078,10.694333451338547,16.995898370587945,18.99969934543351,21.727832101914597,21.019080215617368,27.104232837920915,19.168265802184983,14.312343710179732,14.146706759313492,25.776509757703018,18.834172960232248,16.229364666365846,16.014061410158735,24.047107399341925,20.852010792249935,12.901663996429686,12.386853493487102,7.809176326951177,9.735362631921456,5.982393307968152,10.078498644498737,27.63533531668068,16.167215441475385,16.080343197266497,22.283274281399994,19.3734952161774,25.06184264048332,23.12829715901968,33.43405992433565,26.122790837668237,32.368082271554,32.112949829308214,28.731969890939045,7.387936099901031,4.503269020929563,21.180512426625125,23.317923942157133,10.742618288874217,9.640976073048781,24.15199158700023,15.014549801439854,8.014885878704728,14.681268215782456,10.186612923597998,22.247033190555648,32.72528885228005,14.545961615620982,25.272192466672738,19.602387999577306,17.44116173117776,38.98914538733546,25.26081199653211,24.32770042798366,22.99922497068928,33.050479712471954,26.302920353139392,33.54251721595013,16.622377541190833,25.694464360820398,29.043442676432985,20.36792334892068,2.826988391935812,11.913343381460413,22.14491754283438,18.677318594964987,14.544966131840042,26.913987638436762,20.66353059288623,30.348078255547005,23.08896511737407,20.544607188080626,20.768241279145705,20.477723389025,29.621566793083414,1.9729007893446493,16.39832021976537,11.844982996853641,2.3110691170294695,12.24137686453243,10.335848116734786,17.689452603408267,22.479961600998706,3.3772738522164136,14.679421244254875,12.888043357266259,15.871224846070898,14.765601928941349,21.571648524080675,28.24471195412206,20.34592663765516,13.48766881115773,8.892593493374008,16.368337758563744,3.530375638649712,15.290353379604786,29.20832675190593,10.834004390241772,27.108122578705274,14.442723872751957,20.12817943573481,20.99244889720741,23.414325154019302,36.31670082108733,4.960384703741076,9.426393716953076,29.651791223504596,12.378994852320208,22.78992049491706,23.62235880458651,7.4889110077436305,31.030015284511478,16.046155418543826,28.6647885531442,23.55417593185222,11.058397868301462,29.204229733090664,28.790749698437235,20.120693335544928,27.828832500019136,21.76907515495664,16.754950121016932,18.732865078356387,27.53848443671191,26.549393831524746,37.280570427048744,11.953065312794383,29.791959902412536,22.140649098275194,26.58861625141332,4.992476078719297,22.22418872913762,14.2267629052111,23.06479191612863,19.119435750235297,27.683414872122324,15.809710302489203,22.35572958724129,21.498514499786523,22.424333518823985],"a":[16.97547853154496,3.762937597223459,0.8378573360840846,8.550782113666887,12.349236540012036,14.628285398787174,6.256749167291158,2.581840033807854,4.134383146854481,7.111735694990107,10.675646094693562,9.331839439250604,12.085918061232155,17.626150679998954,18.638266233606856,9.84981147993961,14.572793091756306,15.049857473645476,11.85236983330272,11.222998698607425,12.63967458268986,15.407669621367987,14.604636322325826,17.824325566975006,18.523915318604192,15.726704146895823,19.109346992582235,18.121408018964004,17.833695804074473,19.217169937142785,8.293053829997007,4.261925179141337,10.859032600835302,12.569763134358759,6.59189622182232,11.218623327769123,13.839670461225303,14.138971915677416,4.659674731151684,12.750286380451868,9.443336843845582,1.5587074092164954,2.8372381709630057,3.192317216621814,6.78277219737744,2.5715274892774964,16.284731885917815,10.560095452732456,3.9222208788953195,15.515993075733743,13.289307411641635,11.443093690278957,16.25096832239368,17.72801708127185,13.31485247777632,15.936737288530702,12.23142629723446,6.455255243376565,1.0932727095234451,11.793181260893508,8.028652214989753,12.868981782820374,8.423732555622884,3.349238315510963,1.0076429347910265,4.04919321546465,3.6157013388727632,16.941628514590615,13.673003819167647,17.778298059020806,2.930622835787462,5.55891260632313,0.5457350004718409,3.5713190573056286,19.34781143936953,11.212513270032648,3.7357634732642575,8.101846547122662,19.175816624289563,16.267314370303772,7.513513194863228,12.737561239151788,2.7284581485154336,3.7352968752841242,7.620815478751557,3.52768227795067,4.380195958463848,16.80009955767919,6.109416889896524,11.111760777948367,19.283727517675352,2.012425210669786,16.879675809248088,11.811278706701245,4.959348746620877,10.839093655002024,0.20664720725137808,10.754971745704921,7.613031333683664,0.004401259178927752,9.855730333823853,0.41842821567726673,2.3410295228410716,8.718600849246943,18.393910968188713,6.190577600992442,4.136475429481914,3.435790004348389,3.215346850958909,1.0143330018942365,18.185069773533797,16.167972616912905,17.597602983129406,3.763956015094747,18.53660324794497,3.0693413436529893,9.710478854755102,10.967511100331242,16.798969826117684,15.31739446538543,3.6818581475713907,17.9312385003888,17.833991749660875,5.690603691392484,15.302971768884554,19.59940439187271,3.1760269007595943,19.657082327404737,12.49765978306141,8.85102621994501,17.802075586977388,2.5851231536532104,11.385817418531449,7.562515334721369,9.626932347730172,7.7591270173733085,13.606099763064691,2.078176846979569,12.92143076089185,7.1645495651646,5.382382179002323,2.5450965352634425,8.06659497720986,0.27640906420820066,9.026366449119628,10.297929412949397,12.634882991431065,0.20841622853149389,5.730357591322921,3.061258403760565,14.179129496663583,9.616374317008196,8.032494115508646,2.1998962914353193,7.810361803906645,1.7014776708818369,13.051825630955038,4.748748028944401,10.034865506484604,7.557906140901078,15.443115710116878,19.485534940687646,9.873871060119654,14.0621912908693,18.71108636612563,17.356689274865666,0.5514637820592938,19.176352077969018,10.168520624225144,7.986505147401828,7.65405544199365,7.9867946662408285,16.562684103137364,10.064673924175063,17.517181132241042,4.91871245701498,0.8562108896050802,0.9765546795691105,6.404483987123477,18.78276972257079,17.656558949101044,15.673141333517847,18.172671677605486,15.959507189624812,14.87922105767851,7.284746017776995,14.82353320328281,4.897438631893962,8.615085288634155,19.92219182761358,11.439394010149616,5.213353523763304,9.818208374742948,11.425519988363394,9.75935129441976,16.57471830086099,15.470452453808253,7.3262520219870275,14.185618479945376,17.47708936560446,11.68390548886585,14.8520503537019,19.86536958644754,0.6365695956269901,14.283127245187558,9.752522135865087,17.95721216192684,8.112117885986105,11.064125586645513,10.072419125000547,0.037025020380774265,4.476595949886648,6.644489671534806,10.96972298662346,10.102305856464028,16.27207929142029,6.83179256980095,4.219879730777145,6.565235801274123,8.450347902535679,5.693400234874031,7.329573666213629,9.553664562260472,15.902029162232276,19.337723946887458,4.010943592631286,13.845234938298221,16.890867500528643,10.533396615403783,16.745526491577145,5.769814999521312,7.702429886907023,3.2118980203103,13.109898475303252,1.0693073250476326,8.715465959978218,0.6938291713388356,11.149829302643756,1.9581690376750327,16.990302288706374,6.812430449216591,18.352962518937037,19.83460939274968,15.879110139731004,15.922981437707149,14.420135518673964,15.519274270640725,13.11599229323364,1.0713871629886507,10.600552241974919,5.8219057674030195,9.278873474462346,3.403480084999737,15.546514329093956,10.055245832723486,1.6071200884539216,17.87487867156958,7.173444657218875,16.07830521933237,19.272581563205225,1.9432049958636366,14.948824885427484,12.247967090922076,8.40253682051307,9.70350245856829,14.282038012831237,11.270702349773769,19.6369530471088,12.284587049432822,6.846406576409838,7.142958500171663,2.3395043102529556,1.1655370267307141,8.436175524739632,18.424799181242754,5.565607611741741,1.7967079177331646,12.874785657220752,10.303713688746052,6.574943408076397,0.8640306971251821,4.647335473464849,15.295433284441543,10.714734835306835,15.28625681329418,10.0208197884306,8.567526978700503,8.231264194409844,1.1687175479932232,3.6036986123015557,11.134621068097958,12.862919650036652,11.262961697119657,0.8260451268093583,12.18499947643728,15.748878242039833,7.102745015100398,17.70841400732134,0.8183393042618592,2.146685899274199,8.752146525004555,17.146737688629095,12.841045596670707,14.220964737527723,16.888926446624506,16.81313662131979,7.909713858041383,8.354293323630944,17.67508225764179,5.2851604609932545,18.923978296096205,11.953565440360162,15.17416443016514,18.265171954931642,10.949079723399585,8.382584334504086,13.477459994391738,13.552658827532738,2.640543534319648,19.7821195757834,18.44757010075039,4.537636203279027,17.997346070424175,1.7558162718002635,15.432728988414901,5.311245969206846,16.85412533579466,3.477902730070608,2.185687713950877,9.704240918704286,5.263627898237795,4.732231884662368,2.0134423982829297,2.8285217127730222,15.907122449427625,1.5515986916601854,2.6011230635982763,8.678054743400594,8.306662968334182,12.164058129840711,2.5100180499811753,0.8801187098137087,11.754384045190772,11.784526466101536,4.155840854698525,4.110352278344012,7.049780141715121,2.4584447443551305,12.247596312142978,9.840524506770691,1.2313520798316047,2.4023468018357574,18.61009157096347,13.535612711083601,3.2622418626628136,1.8017957636647441,13.001750065650906,14.635489977276324,19.508376726287754,14.10921951371376,19.686820699795714,17.74182564933017,10.844125623907267,2.962855289330122,10.16554620083435,5.863433394341708,5.045462535909779,19.918627576840958,10.70147704657975,3.5847728533994383,6.745180182611041,5.663512596014857,8.037491261792336,13.997620057101736,17.758985120674893,9.942867236522307,13.575216143181482,4.78500874564197,16.52430144340492,13.301565179211474,12.748185678118734,0.7998598442694504,14.93439276348369,17.04698301376803,16.22781189809406,12.427472716843976,15.155844662011116,15.25915699344528,10.72403965871208,4.683317668008273,16.920352181672747,13.736855422876403,7.135781169320139,4.992341076566391,13.558655400811297,18.423517005413895,19.65341631286868,17.38076809232465,1.38305643694705,11.257085745947858,8.890507677936208,16.1843794455265,7.607868281014047,0.45631493964713776,8.795590504821199,7.018819300710679,17.322195518369917,6.386101125826147,2.9076208658198466,5.481761126592839,16.064831764895118,12.620966692575909,8.445741359889233,4.46812309615912,15.21735717573133,7.946443305260296,16.02317604381168,1.8686559232899702,15.894115256733174,12.459253972987433,10.055332295130706,16.14136773317803,5.088321541809648,17.764253803920944,3.0378565111139455,12.8962484793715,6.3419756371734115,14.057524805333603,8.528637552775944,2.1175832704252917,5.241979835276407,11.619588342663691,15.965410087334423,1.5956285848297025,16.837520477387123,18.880789456329108,12.03345705267806,6.073775388191827,10.718190574596473,18.667285768211865,7.038569103733852,19.01572058848108,15.28704846901961,10.413320505195847,4.893450723396375,4.814802082491925,17.726828161910856,1.858724681430708,14.232351644165009,12.600430277542284,14.7124417277753,3.776827646241947,5.322046842699941,17.53490765147367,4.636488088996935,6.2998513354223284,12.687799435305616,1.1235243517428772,10.52914095153,12.873433917489535,16.958769629754396,15.622625778604252,3.417444436980057,4.041971014331787,1.5152072879887335,18.232973016217002,18.64459163967993,16.49229937162849,2.9906482156511993,13.548077328143018,5.526099064531538,0.9133780767156185,5.774520839379966,3.1530577792792025,2.125572666079578,18.715703785954073,4.313762627480031,18.73742274997989,12.641229392037419,16.44132480060791,6.068345592413675,12.967070396956961,16.20093187205785,5.907160602593793,19.484505328581953,15.921190971025156,5.849903178493219,19.356351221597336,15.38166264999175,13.621611783053694,19.10193768167617,10.015247354823638,12.6495357954914,3.37777056730892,18.980617335385695,19.02123350030339,1.424794339467912,12.276789302663431,17.816581021956228,15.624615655517315,13.891376888157732,12.638868124648134,4.535476301863679,6.370805947103544,17.45624889847543,11.419727126917882,11.936405174605369,17.154741793419714,15.80481684776085,6.528263144133422,10.209583086482095,17.75314904697902,17.597270403004394,10.976917894870827,17.89147138675748,13.647141297885575,0.31107037495611056,12.848654009065932,8.46684163830924,17.691356793960583,13.448139839923549,18.11213483610996,11.527810675674388,19.596772968338033,12.318881604768555,16.895335963011068,7.2445588520461035,17.622441022778244,4.76904082845099,15.610826534551485,10.711518170426416,1.4334099198798533,1.6326427006077004,15.01260156684802,3.51998000804286,18.96951803397162,19.835986025197222,10.948933880657545,1.4934731558691272,12.93769168947573,9.853837396748846,4.479273899354332,18.755171824478683,9.26800319758069,5.020276252535711,14.277594464098549,6.225928350397392,3.5421625349225794,2.556378883184638,8.945678658385683,14.589625019744457,14.47852777687206,12.352986719221786,8.720149846268113,9.444264466531891,19.73171331068979,15.65186910754798,1.3355434243838316,9.842848276999243,10.259424645428155,11.004843810317677,15.64875474184471,13.068254781094817,11.970979029363885,7.618494938216167,8.76707656836226,15.548458702455461,14.083518452233585,14.470605196752647,16.510193485691097,19.21498815263356,13.81247356549068,0.8225266942801657,7.466603177403313,2.1164474558458712,5.407126730878087,3.072410278819695,5.086418085511477,14.091991342338485,19.66449569701846,6.03889345930428,18.00340269126281,7.167801347812466,5.3110781257925055,15.206173608350483,14.041082830895327,14.985854693072502,16.833324221397,8.494562216922974,7.02451699010509,2.579259316458402,15.404388621539468,3.731266217471929,18.556460004516424,15.670223233614609,7.85569064955582,9.994067216917916,4.809621787472471,10.822508676143375,6.196898338964862,7.93666641084537,6.415848410565843,10.677612789519042,16.44576572245242,11.331189380900692,0.9262564430830533,8.00376720381562,3.069848262085171,19.381214948949733,0.2378078175969378,5.853312818139846,5.535954313616207,13.260774405682966,15.428589438705483,12.355187127894762,8.881436067849888,5.8119878367584965,15.671678323472777,7.711921885444779,7.443815588690401,9.94278294113434,5.4261906675988,19.74557561846484,6.645258240314247,5.999290375761404,13.971749518818392,4.471177235145856,10.167322979135607,18.536243794783406,11.647189106638107,17.10568575503401,16.21966865520497,0.5912130592582487,0.41246016332312063,19.645417165873276,16.445786285608396,7.631700327287905,13.859202318644407,1.6824297535910526,6.281567403419626,16.8491370943174,7.304308155815842,11.366550150343592,9.290578374613304,6.632543661831587,1.9416804632198437,7.755930606373256,1.739812953328177,11.288762398212878,16.138774979136873,12.78544915902411,19.62654447285989,17.606174788694954,15.268332524849937,14.391503029854956,15.908990746371426,14.311785630915988,11.532386917163425,17.827766527138955,13.92259129832647,10.110125441252471,3.050374420507329,15.006969489520387,7.516404563731944,11.796515857895562,19.679380742143827,4.58115179234766,16.808606129145886,15.554926134941919,7.995506310032643,6.040337916344196,3.2138138518054804,10.95855117192345,13.663033191973897,0.5762242949765595,8.67879605253278,16.0034578219635,15.58634498926427,17.929538114887706,3.0029181760801915,2.2452691687347137,1.524953320239164,14.173334020736066,3.67207961727567,0.5135045301731234,0.24443594692904025,9.166982541238319,10.571945185872567,8.84086339082302,11.311376325926759,13.771861944411015,0.27060926754807646,5.978878583722134,5.305518989045788,17.03724916517286,3.8450420743638603,4.822470717778726,11.866426482793585,3.691544229859649,2.233902140840156,17.205506716061322,16.559544440944578,15.930862546261011,7.803929584521785,16.562218663091926,13.53608888176931,14.990851642444092,2.840875379245835,9.538387062446564,4.879044189255546,15.712284157346662,12.027810815700711,13.380379917382722,4.688633048137323,17.920669550490494,18.481853597701658,15.18013196608694,12.123369660897808,8.17414868269748,1.2261364723521595,1.784621146325156,18.637181235882807,13.530632044351417,10.748107418631712,8.678811437981162,3.733269180564842,7.659170636242547,10.981962825850523,4.129222835818718,18.37301476558204,4.899553203002904,15.660301630195427,15.449606539875314,14.827760129730908,18.063082091144473,10.987824025115405,11.494988331820398,18.841589742438455,17.96171524162224,5.941688310851809,1.711727743989857,11.580444309473164,16.413772038236658,14.55253249673564,12.454180659104143,12.943748417948209,17.459636615759727,15.19054088071294,6.7791949323940015,17.993950491807496,9.517049342648427,15.150967379837494,13.549649323457613,8.252125796087943,8.481027757157715,12.834354522249996,1.179550457166525,11.354225010938856,2.550341582724114,4.181423754847411,7.239271022793665,17.605688641550646,5.839327131865932,11.351798051944462,9.571205387440012,15.752257430494282,7.708472414000935,18.16250574366887,5.597426838182011,16.455077574998008,0.7292838976854554,4.2796186225322375,4.0457016169021465,17.99649824002917,0.9995497750318316,2.550306366041868,15.17851766969633,16.119612228773093,0.25517357042611266,18.178020162220907,16.762941240113154,1.2202112676541388,13.363558166023823,13.977602154562021,7.725773763704136,7.602439434539292,6.343704090268862,11.927096542738358,1.709540168496444,6.83809220655025,13.402147004675559,17.52863216514566,14.284080114961721,2.9672411607378857,4.287955124126652,13.960628050929408,2.3927196258415773,15.255864275862931,12.698494677225543,11.608598751490927,8.299187742162676,1.5917103059610627,7.372342691740514,13.626231369738848,8.654946652110675,11.503645550983785,2.588151576750035,12.341537355553488,18.24846505356213,9.751831383461301,18.25413149619825,1.7844938567059199,5.205288963973551,6.0301961494766365,0.6455543039389378,2.137052905880603,12.356669289779635,7.1792288034361995,8.828445026778521,8.761444926786792,9.684227632868772,9.681901817559257,4.306149770246717,12.845427372566292,8.742227761258107,2.1416442876392683,9.63476677655041,19.23596738974725,17.49830115072669,18.658371903775265,17.251046069803596,11.640390326069468,3.7804123343310803,2.639010902899317,11.091481333760914,2.876526936674164,16.243987977170807,0.4590963421743144,9.189115046290022,18.54117125892648,4.279549058252474,7.627299399931653,11.25586025921573,14.22745790478042,6.123630749248785,10.858503532497036,4.698086659217462,12.541690764253985,10.758687636821218,12.87364492568857,8.310331978018466,8.206793288577948,12.98882401156276,16.314020236525124,14.116219890901274,7.975634342312077,18.901990699238738,12.741523969214983,3.0720622206926773,10.38741190716339,11.461292657652326,10.646551579597293,15.100476357359597,15.800526448671409,18.974190204196884,19.41185740040886,9.054574135312858,8.342589837471674,3.2201266074076296,7.413617457188391,15.302679522179083,18.030283301173476,12.978002985779504,14.088574603282602,15.93454257601644,0.8571771200064138,6.010617785182695,2.820015503967812,3.040848195983621,4.374209110805496,0.6712271800492609,9.139946102914456,15.176088118159509,3.8168718943915936,3.9090339171447885,7.69226359435272,7.2050670645582215,8.844134746767986,18.97303007069469,18.076739199140533,18.036098965023836,14.723674637748672,18.69503484786925,16.93521736318492,1.9734623084280845,0.7286891734707712,7.002302928792674,19.491576398706385,4.4345830752267545,5.528276949554285,6.6559898284738805,7.944414695309785,3.7628358154097485,4.622307061934836,8.103330445557129,19.782806392019005,15.88716070629092,3.0046192922712622,17.543835878224524,9.099377545955463,5.839606562936246,19.178987245345382,14.502196498560789,16.83382879517439,18.990296928575777,17.007557591165195,15.460504093324348,15.67627710958789,5.780747229894168,18.87142768446654,15.311734269722507,10.639533981804297,1.948084715591758,5.186053084020585,5.743210535541632,3.5898460682111777,2.9962848709123824,9.9481126143878,9.964024497626074,11.200520981910422,15.54786899612331,0.8653788188409361,13.831175847029137,6.783715487174318,15.438120355813151,1.9518927989119028,11.464428326906265,9.725573636254104,1.8018689142007815,5.492941098177568,0.08960134682959087,11.98357438167501,18.98877946089887,1.7349603741176534,10.159435912252285,1.5175827119161545,15.138749031891177,1.5415220293119969,4.754496835061417,16.15770326138174,8.645937452906072,9.807082281256982,0.09400560862323104,5.666358841979462,3.41631476694376,8.082849842541302,10.774102724763317,5.488246920415274,16.50198300271263,10.557452637167604,16.619795742107655,3.9689932113995585,14.593909731890733,19.685246024740085,3.6115988297864376,0.2958432025598867,13.777848614612665,0.8559160343454364,18.71750427871552,8.04782594191229,3.2918514770785112,15.254670795347165,7.709458615014961,12.690503718834037,13.596852663804153,2.0637776781595862,12.284116244903318,18.394016164107903,5.480847874718453,17.86181834704,17.496969081245282,6.993195540490973,2.342477911670975,15.016975820488954,15.098022013366808,17.816997329295123,10.151622045400774,17.85778930044771,3.5502383382617886,9.891628026868688,4.632951975881352,9.574211441518932,6.242337265661551,4.914000360274389,8.821775870040952,17.20066575324516,2.6120079651916317,12.069749891594356,18.323451535680277,15.535122960633538]}
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
var factory = require( './../lib/factory.js' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var mgf = factory( 0.0, 1.0 );
	t.equal( typeof mgf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, 1.0 );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, 1.0 );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 1.0, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NaN );
	y = mgf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `a >= b`, the created function always returns `NaN`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.0, -1.0 );

	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( 0.0, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( PINF, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NINF, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	mgf = factory( NaN, NINF );
	y = mgf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided valid parameters `a` and `b`, the created function returns `1` for `t = 0`', function test( t ) {
	var mgf;
	var y;

	mgf = factory( 0.2, 0.4 );
	y = mgf( 0.0 );
	t.equal( y, 1.0, 'returns 1' );

	mgf = factory( 0.0, 10.0 );
	y = mgf( 0.0 );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'the created function evaluates the MGF for `x` given small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( a[i], b[i] );
		y = mgf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 550.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the MGF for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( a[i], b[i] );
		y = mgf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 300.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the MGF for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var mgf;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < x.length; i++ ) {
		mgf = factory( a[i], b[i] );
		y = mgf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 400.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/mgf/test/test.factory.js")
},{"./../lib/factory.js":100,"./fixtures/julia/large_range.json":103,"./fixtures/julia/medium_range.json":104,"./fixtures/julia/small_range.json":105,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68,"tape":183}],107:[function(require,module,exports){
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
var mgf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `mgf` functions', function test( t ) {
	t.equal( typeof mgf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/mgf/test/test.js")
},{"./../lib":101,"tape":183}],108:[function(require,module,exports){
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
var mgf = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof mgf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = mgf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = mgf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = mgf( 2.0, 3.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 0.0, 2.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = mgf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided valid parameters, the function returns `1` for `t = 0`', function test( t ) {
	var y;

	y = mgf( 0.0, 2.0, 4.0 );
	t.equal( y, 1.0, 'returns 1' );

	y = mgf( 0.0, 1.0, 2.0 );
	t.equal( y, 1.0, 'returns 1' );

	y = mgf( 0.0, 0.2, 0.8 );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'the function evaluates the mgf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], a[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 550.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the mgf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], a[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 300.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the mgf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = mgf( x[i], a[i], b[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 400.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/mgf/test/test.mgf.js")
},{"./../lib":101,"./fixtures/julia/large_range.json":103,"./fixtures/julia/medium_range.json":104,"./fixtures/julia/small_range.json":105,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":57,"@stdlib/constants/math/float64-pinf":58,"@stdlib/math/base/assert/is-nan":65,"@stdlib/math/base/special/abs":68,"tape":183}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
