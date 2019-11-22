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

},{"@stdlib/utils/native-class":90}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":90}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":90}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":90}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":90}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":66}],54:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":63}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":64,"./polyval_q.js":65,"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-ninf":53,"@stdlib/math/base/assert/is-nan":58,"@stdlib/number/float64/base/get-high-word":69,"@stdlib/number/float64/base/set-high-word":72}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"./number.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-little-endian":41}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":68,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],71:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":41,"dup":68}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./high.js":71,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (PDF) for a Pareto (Type I) distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} logPDF
*
* @example
* var mylogpdf = factory( 0.5, 0.5 );
*
* var y = mylogpdf( 0.8 );
* // returns ~-0.705
*
* y = mylogpdf( 2.0 );
* // returns ~-2.079
*/
function factory( alpha, beta ) {
	var num;
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	num = ln( alpha ) + ( alpha * ln( beta ) );
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (PDF) for a Pareto (Type I) distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( 4.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x >= beta ) {
			return num - ( ( alpha + 1.0 ) * ln( x ) );
		}
		return NINF;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":53,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/ln":62,"@stdlib/utils/constant-function":84}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Evaluate the natural logarithm of the probability density function (PDF) for a Pareto (Type I) distribution.
*
* @module @stdlib/stats/base/dists/pareto-type1/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/pareto-type1/logpdf' );
*
* var y = logpdf( 4.0, 1.0, 1.0 );
* // returns ~-2.773
*
* y = logpdf( 20.0, 1.0, 10.0 );
* // returns ~-3.689
*
* y = logpdf( 7.0, 2.0, 6.0 );
* // returns ~-1.561
*
* var mylogpdf = logpdf.factory( 0.5, 0.5 );
*
* y = mylogpdf( 0.8 );
* // returns ~-0.705
*
* y = mylogpdf( 2.0 );
* // returns ~-2.079
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":74,"./logpdf.js":76,"@stdlib/utils/define-nonenumerable-read-only-property":85}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (PDF) for a Pareto (Type I) distribution with shape parameter `alpha` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 4.0, 1.0, 1.0 );
* // returns ~-2.773
*
* @example
* var y = logpdf( 20.0, 1.0, 10.0 );
* // returns ~-3.689
*
* @example
* var y = logpdf( 7.0, 2.0, 6.0 );
* // returns ~-1.561
*
* @example
* var y = logpdf( 7.0, 6.0, 3.0 );
* // returns ~-5.238
*
* @example
* var y = logpdf( 1.0, 4.0, 2.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( 1.5, 4.0, 2.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( 0.5, -1.0, 0.5 );
* // returns NaN
*
* @example
* var y = logpdf( 0.5, 0.5, -1.0 );
* // returns NaN
*
* @example
* var y = logpdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.5, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.5, 1.0, NaN );
* // returns NaN
*/
function logpdf( x, alpha, beta ) {
	var denom;
	var num;
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x >= beta ) {
		num = ln( alpha ) + ( alpha * ln( beta ) );
		denom = ( alpha + 1.0 ) * ln( x );
		return num - denom;
	}
	return NINF;
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ninf":53,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/ln":62}],77:[function(require,module,exports){
module.exports={"expected":[-13.350623885292947,-13.977415891749246,-5.8597658699507775,-4.752448147000393,-12.453046887690647,-7.764716551859081,-4.807136511072521,-19.540158617645574,-5.72397069139236,-11.653145656524927,-1.0927575589570893,-5.489762819917139,-8.210040040441427,-6.844101189998554,-9.530563998159288,-4.615356025002868,-15.029658261161003,-13.887480136443244,-12.574733830962813,-6.386973012370213,-10.093259661754352,-12.734712656530519,-25.95348453184137,-10.416240420833049,-6.025505132937397,-8.453778269004815,-26.966297535682727,-8.568914677091186,-7.405849875321721,-12.15993866293227,-11.750112916800148,-10.737034411852768,-7.052344708547068,-1.5914798868701965,-7.261181524528496,-4.51659204926824,-19.950648980982734,-9.912343698952753,-7.326236154796717,-18.35128411337959,-12.896546476055455,-10.264550713406209,-9.92907254927865,-1.8043150501860623,-5.255210785625842,-3.5787051274069697,-4.424474537005921,-12.275534211231019,-4.228909212891509,-9.289727518073043,-2.883673832290725,-0.9942832161819126,-6.280880190114942,-6.956577055983772,-9.604410851769089,-8.411726743834919,-6.035269367080019,-9.945043408884288,-5.76529892918326,-5.6794758602116815,-3.074849516179313,-2.2688424222682855,-13.105716079702432,-18.961390332303395,-5.456076150624909,-2.695327144947896,-8.273750032769641,-10.481617904299412,-12.48778217617474,-5.049486770175292,-8.524150694222556,-8.492048927702385,-11.878660211367318,-12.174507213186061,-3.530654997105941,-1.8274553672481773,-9.301987999208471,-14.387006572663438,-13.690270048067383,-1.388836832123225,-15.98201933644124,-6.627215787642733,-9.062310753309973,-2.543762202417163,-3.178587993114334,-8.180749942849438,-18.230216867649574,-7.068406409799309,-7.890384737705581,-6.260865899193888,-1.7698576648898978,-6.02336565206479,-2.278692758814742,-4.627760227800849,-13.340367336423924,-7.978689933427582,-21.054343364290602,-4.887960967875863,-5.150087404920484,-7.412277395269612,-2.8455855476122096,-10.886633228619004,-5.264251494728882,-17.338817226885425,-8.83931908385427,-3.025794521003604,-9.77668753021537,-9.085911746208765,-9.310255119237446,-6.501150371890596,-5.753661029534143,-2.1731879406462156,-10.711666885033907,-2.2009825469558066,-4.395839196140159,-8.045704715989771,-0.3582867083610779,-0.8225646097262853,-14.615891983628089,-11.349536258393599,-7.292730775875178,-7.744039309808571,-0.3404623662063244,-3.0237344599629736,-11.98963201463139,-8.403064767887045,-6.722737356382133,-7.948318602366825,-9.232144810957621,-5.909047985565863,-4.610162513103795,-8.63983944316692,-8.77140581454379,-20.476434565299357,-10.367406358225026,-9.348509406175225,-3.118263961644672,-14.720553294437835,-10.962188741589067,-20.613437088294262,-7.353952593153643,-8.233720036246218,-6.182296209583406,-5.54552539025498,-3.5458283527378143,-8.805030473835018,-8.37804736854791,-10.126857633038568,-9.05314793056683,-10.857181182192654,-6.03614983624859,-5.10390299729589,-14.590758932362121,-9.254378217161879,-11.401502906727764,-3.050753135738546,-10.456513988187595,-4.843623512246083,-1.733389201963952,-16.580331235685122,-19.12743389066445,-16.304526464399984,-15.184715184005228,-7.340190619887672,-12.078470205250156,-13.072317654974867,-13.349188965113328,-9.071326992454125,-10.822232436247603,-4.669454681105243,-6.414904902962313,-6.432667790478227,-6.674749767016792,-0.6193996110727582,-10.35813306722197,-3.0648185290226664,-6.172449079395058,-6.485899830945428,-17.39518905999389,-8.996729600045917,-10.44290559787251,-5.01737913478307,-0.6867156614417809,-12.183404768458146,-6.261934651821491,-14.460211160496428,-1.784071580374814,-6.145132124273957,-4.628812393849238,-17.87021472508664,-21.62986498705351,-8.605475787342812,-8.016688000382395,-7.603965583164751,-18.376972552029045,-0.8071102678983451,-0.8968294890794084,-18.199051316758336,-1.3466799694437341,-9.515531552307422,-7.936021696482634,-5.368886618029769,-6.73574771201875,-15.184840947377467,-0.3133123902207018,-7.021245148058604,-3.49411409184291,-2.643251405892009,-10.239390791372898,-2.6380330971614043,-13.57264612350869,-3.256612149144175,-2.7281800070281577,-7.635043246121192,-0.9628816208364839,-2.9336094781082096,-11.882442428250151,-11.076881732032426,-17.48954309929097,-3.3714788417781065,-14.998120910488623,-12.958892211639636,-0.22884331733069985,-7.86527839178077,-18.886312753135968,-2.676904550098648,-1.261849722229968,-24.421339821074923,-4.999750601623262,-2.494085662315854,-13.601491721851886,-2.4084696875825102,-14.301907787943989,-0.32235206237487546,-14.382045356097493,-0.10514140527557458,-6.3115328782311835,-14.538104553264688,-9.026419924029568,-3.720949798874898,-6.390667902041798,-3.776700863334753,-8.08447477181544,-15.383681095373987,-6.563002605474544,-3.709282350482333,-13.28161914194763,-17.315059581974552,-6.771790883549478,-9.444901797963333,-3.7178056935508437,-8.910867108646912,-6.489082641184396,-5.877582995458013,-11.637436050158186,-5.7331005234789245,-16.72829288904127,-7.95820706071332,-16.47791747391819,-12.703455474730802,-2.420997597635626,-13.510751939175726,-3.3700887089390648,-5.601423691729508,-6.763800233105748,-3.026776402778353,-4.891397832247975,-22.20016372249978,-8.309268655486875,-8.742720961635413,-7.5800188565917495,-2.3451639134178563,-5.266042341235149,-6.848447292411123,-6.983430492631619,-6.386724512196821,-10.179964639060962,-13.971690488951282,-0.9200344891565777,-11.002039594775113,-8.431078814586435,-7.144627223827058,-3.3876203134697818,-1.2024879839328122,-1.2529559959793488,-17.564578597655526,-4.28177254811645,-4.178745159365647,-1.0593464507840977,-17.175963012952536,-7.517452443229217,-11.875310494962022,-11.775511977442363,-5.709803263319074,-8.799783400591608,-4.316097931974554,-7.820316004019418,-13.340112783197604,-2.2547659081710947,-10.069084237436172,-7.887864643837744,-8.154298256723166,-4.033387362331624,-5.232402466959712,-8.811286131807414,-3.667328658160983,-4.133934592702204,-7.245152404489261,-8.642791235330506,-0.4645810972107256,-5.940411245261593,-0.3041201183359803,-16.793524946316985,-14.075423227313692,-4.132396514568583,-5.4517969250587015,-9.891657356894498,-15.888837047998479,-11.858013687896694,-0.1286381786478401,-3.760960102122283,-3.9519571129148474,-21.959839367171426,-10.290855733105985,-5.976893357700391,-8.722297453763993,-1.6664402732548496,-1.2516817162745824,-17.328064949775808,-1.825637111878855,-5.011843036165104,-13.152195938687505,-12.044546016943826,-11.156904961082304,-11.35980826645757,-13.30587680417564,-8.97180582064476,-8.721050729836698,-1.532547756969862,-21.501886558697976,-11.524977213255426,-8.424959568627735,-11.060212243314268,-2.39984427157183,-3.6428888793700054,-2.898522979978921,-10.549679551120363,-6.733467867759572,-6.941005378310592,-0.034852493057087486,-2.7944528916403684,-1.2751472697697857,-3.3092848217869175,-8.313179173205874,-7.942751315453478,-0.9371238026007873,-3.4805642304737816,-4.252090252845676,-8.197656329450389,-15.76366930802945,-16.196229478935678,-18.81088376637716,-0.2933077525487633,-19.154255662048485,-6.880555758180108,-3.9294184130803345,-8.263854390641768,-9.509928976951478,-14.417292368607704,-3.8723271620850355,-9.717263064902141,-3.998348708046777,-10.912201093956696,-1.2586286046660504,-2.461949318621514,-16.585563599858162,-12.959829903270318,-3.9464657398703764,-7.711270125040173,-3.994958824060518,-3.7985739258818683,-2.9916684081394607,-12.429210231733649,-4.601361053684528,-12.413588657593024,-3.016291651012999,-5.645613091016315,-11.248795484565576,-14.8672205808151,-5.50774093944306,-8.374092460242153,-6.313710945800921,-5.039516678976682,-4.710714504559888,-13.285902028090902,-20.2144381473791,-8.048654754787222,-7.7102254250546025,-7.538679043277114,-3.4823925532231357,-3.044532883142523,-21.90602104434437,-6.237149099344649,-8.821733109948127,-14.027226483322224,-11.037908598615928,-4.596426078725841,-12.359620283335104,-7.340697510005157,-22.981668729466946,-10.230172737250786,-16.293219062727047,-5.778509690612623,-3.7165277823551506,-1.4205012912216262,-2.431727784424062,-13.069905276151701,-12.976740721220153,-15.33897026000362,-3.467106674239041,-7.672025720433304,-4.425558480928309,-9.848849623160003,-8.382780442902472,-11.344910919402352,-6.246492029954176,-8.710905931907071,-10.47518530229366,-5.100277623355886,-5.854608204851765,-7.2451009072180454,-13.48656914032324,-4.611828307406725,-4.477753233169494,-16.4617905141685,-6.376754761545072,-2.028043801980104,-12.515181601948804,-5.846041657176528,-6.263024623872553,-6.4082329729072995,-2.5246116686736997,-3.6462207505166617,-13.623236975182522,-6.887983008802429,-0.7146095436513207,-15.357623308211885,-12.384204038855813,-1.3658830613887432,-4.562169398294671,-1.8288686029550547,-8.7448859319815,-1.4201239594144397,-1.420303405059073,-6.068784448341489,-10.336357711979609,-14.73696718228328,-1.2671792477886612,-2.4291231119728423,-2.0035712814539153,-15.960774068458107,-3.848990435104362,-7.57984707223919,-9.144352691628896,-11.695833390572545,-11.780641152436615,-2.746726067015878,-11.223896560040359,-3.7122300513298114,-9.080397881672589,-11.329450355851876,-14.967113843802181,-9.572923530836306,-7.035368907495801,-7.571185183059725,-14.591854816855665,-2.9026626016754875,-0.10089774278392838,-7.931744751350308,-14.27424563321226,-2.0238413551549144,-3.3999005620875735,-1.8223956669034465,-6.684695644544419,-6.002342257933378,-2.047014018538839,-9.101564927534241,-4.541365484302133,-6.708500875487818,-7.948783775018207,-12.28333322814391,-0.6552649990107042,-1.9778789818092548,-9.107770344973225,-4.673770713027572,-0.48779663846578103,-3.276203140279158,-14.162542048122802,-10.45649414210655,-1.3367327312060127,-3.9619598609287934,-1.8002080143726573,-10.31130872651211,-10.454204617707418,-0.7137180943661718,-23.570773243932216,-12.159924192105876,-8.345619929197873,-10.215767637916471,-2.4115575398406577,-3.223551199783387,-1.1629633179520837,-5.74036007270584,-13.747550977896339,-5.480162982772413,-5.1435274940661415,-1.6357110353798276,-12.890951142339844,-16.117445019330134,-23.052333964775336,-20.511629890630715,-18.89069877143521,-2.1182658166004984,-7.929576622886387,-7.742244011925244,-1.07301336916791,-4.12114941911689,-4.951764730430121,-0.9844625401496891,-6.884782229197079,-16.106900487078164,-12.182108873567508,-5.557506202938946,-6.508506288485336,-0.0279222412341511,-2.5996548530131562,-15.88488816959466,-3.9182145222535922,-13.669626550208378,-17.40633882523636,-5.843023790049116,-7.745448026161512,-9.987557319012751,-10.287665179295708,-10.247624644294959,-1.4145769332883305,-6.154793088753877,-1.5263274172359331,-5.294140755380155,-9.169976649726593,-4.381262511696548,-2.3685014837626994,-8.963574678724491,-1.1028913995018002,-3.897767810708835,-13.320917214832733,-6.8958267636460775,-14.247458064584308,-12.47742100311153,-2.1936786513310196,-4.473743787646448,-6.59975347996896,-8.560938981681652,-14.957693935826875,-17.19665914721695,-22.678711346666816,-14.061836060785367,-20.696399681627327,-4.984812514191191,-11.586025983120791,-7.026182012418815,-2.5594454572083123,-1.588537242079198,-4.488070209949527,-3.3395879281772736,-10.786833977908366,-2.5774117420900353,-2.3556940224272225,-10.844863831900327,-12.95862404017035,-2.296038913179146,-0.07286536274210675,-6.9314526435411885,-13.341341873879259,-3.3782693526840504,-5.727920071931415,-2.998720868217042,0.78891552677824,-5.1866584542468,-1.0663036613192958,-14.309362984926153,-2.336112368629564,-12.916580613059963,-5.645776578956166,-9.602938459803212,-0.40725517596918337,-9.414615538975568,-5.6282176842080816,-12.649812197786957,-2.8424538976988174,-1.7840084658789692,-11.884219745235491,-4.650512523835175,-9.562437568489667,-10.560952391557613,-3.5812618237223575,-5.575506693718225,-7.575866352331879,-11.901642836339356,-10.495377092117096,-15.021592041257918,-8.22723666549723,-7.034972557221131,-11.572502720857173,-1.3841684348803511,-20.18241118765711,-11.872769688705077,-15.463896989410344,-9.487591022698886,-4.21190436924411,-11.613936011126754,-14.387707274904244,-12.744004655191517,-11.368740202961305,-15.514194627445448,-2.0801427593838966,-5.331263877179381,-5.287704395194581,-8.174260374346389,-3.519979254732064,-8.81722841484379,-0.44774510340408114,-2.2585161971894507,-16.15151865232916,-6.044710955366135,-8.106917259173812,-11.428120661695033,-4.012688542203222,-6.65124184686087,-9.071395795244172,-20.697707252304028,-6.113899341581991,-13.211770601297864,-2.4251429284186017,-1.477139830570593,-5.158364148983132,-5.4164804927636965,-5.096218599956089,-3.1010710685050853,-1.973267532750782,-17.263671977366663,-10.073975817878463,-2.1246793786374454,-9.59358432067225,-1.9103001591879547,-24.071016459310385,-13.27115355373212,-13.301358239169645,-13.287972505814324,-9.87796030106,-5.145229519400033,-4.732844639667995,-5.091861974053316,-11.39847323644021,-5.625701595633174,-15.827520126851056,-11.807182010777396,-25.94221296173241,-4.348832520148264,-10.529898893517228,-7.650947514695183,-14.634487825620354,-16.029296428908594,-16.816467508750975,-2.47216160260966,-9.716105453357443,-6.420546022649077,-10.840176851352261,-4.606256421968922,-6.383015813822929,-4.4498689726875895,-4.580065314186442,-10.616597088390677,-1.2202756087420141,-0.18794325749740892,-4.895741843755317,-16.00123014621198,-16.386686301788842,-10.65500683551447,-3.2574699463999153,-9.410230987831213,-7.495450919082231,-6.7738523327698275,-6.104299986125788,-5.816298240985034,-6.135914088516557,-0.9813761744132705,-16.18407886406834,-11.760537199454873,-17.149793569139298,-12.114847772096773,-12.444796834447715,-11.07373821551144,-6.979325526021505,-10.415254736623496,-7.459678683675087,-5.675138676364881,-8.258644160368519,-15.205018517158976,-4.9553314228080865,-12.127605991250704,-10.943475745603891,-6.30758445544312,-6.3391880855869545,-7.09074842001376,-7.616531310678653,-16.358799462480263,-6.320437420633951,-6.800101112949363,-15.295758881208187,-13.671972236916389,-7.5910540731507865,-8.527478130715437,-7.569923924034505,-6.971983773376223,-15.107879981696911,-12.555091337862052,-2.5951576154962552,-19.96441633124077,-7.923315954267132,-4.6942666460601785,-2.680410826895205,-8.603686331729278,-10.28796835329694,-14.946242047025862,-2.1348187840385293,-12.308625007833172,-10.672364918045481,-9.068116223151648,-13.639228326747997,-11.702793508061006,-3.3500871451205185,-7.468471067433043,-11.88739578128714,-0.5052076905144958,-9.442807377774052,-9.766854539120501,-2.375877116046496,-7.913527165145126,-5.418047908597202,-11.646811294102797,-6.41584041916407,-6.9331270812129375,-0.17191560638691072,-2.9508320807620834,-4.273945534396844,-6.033146514387852,-2.101592160388037,-7.4478952055173835,-0.9529351311427732,-20.777886792058567,-0.7896916062638013,-0.7995627593576131,-15.12175711120269,-6.08651416306995,-10.53694046038897,-10.299926547323913,-9.68052713651577,-7.530486558101472,-3.3160787767377826,-4.206459542392189,-8.99056125502127,-3.3059792636389744,-7.392415039937283,-0.7612678873778194,-12.32183510254599,-3.303304619351863,-12.97029615678116,-5.199508197861704,-6.326775400896906,-8.64778843788406,-21.292999720302433,-7.716864066344272,-9.586798553065066,-8.005781050088807,-5.48761050537091,-2.5165972412886504,-10.194384245176565,-7.342886322720965,-8.616253080252804,-7.178594475128278,-3.997382255271802,-2.7095424764658063,-2.764278421853895,-2.3647436770655332,-5.247560756432662,-1.3986622598138467,-12.162975154278527,-23.97903029472843,-20.094036398440693,-7.384575818224398,-18.769231552243326,-10.733554376427179,-19.228779751564062,-14.36645136683559,-2.9496724456544783,-7.3267295209209635,-13.81127642884691,-7.467901805332559,-16.691308220527603,-2.402107209600956,-5.396916719822123,-10.91296448261889,-8.644310610279447,-0.7589712006398415,-11.158082264971,-27.329671588337362,-14.782599277665526,-4.811001355735854,-4.139027626984401,-10.229146073487676,-9.59877441313784,-4.896153401000937,-8.405244011889323,-12.535267571959523,-3.256552901502907,-5.196530046123989,-3.124052557946314,-9.854579265689324,-7.657512567143314,-7.094896321049873,-2.538086903100826,-14.842917834314747,-12.473798901489701,-5.601827559211316,-7.5408237632835124,-6.776756648828737,-6.881779369765994,-11.945373645611951,-7.889895020305971,-11.18360548022639,-8.458847822392435,-6.798806006317989,-7.334540371744438,-7.491001886110574,-6.2397952738099605,-10.2155051538072,-4.330165800537074,-6.06245896917445,-1.234086866698938,-4.193411135185414,-8.42286568406498,-4.098626817044135,-5.564747082891799,-4.384695330936751,-8.2093884631837,-5.812557440800916,-0.12227192479753057,-11.256055475111964,-2.1934810053636085,-9.996305366031308,-3.384650715459891,-16.721743183706963,-8.873322940853186,-2.8510504080716714,-8.120786023667392,-20.15970167620442,-7.00850483724955,-5.371336644992894,-3.117811485517592,-14.588203281849076,-10.621687333272334,-3.8591214215839216,-7.187599569694257,-0.5811141176358348,-3.8582880682518095,-4.344816617545234,-4.255023780423187,-9.288490545749006,-8.930093614805983,-9.944229138284733,-7.233681471602367,-16.99045908812242,-13.999672605314615,-5.590100936328348,-16.558561570256003,-12.638028515486695,-10.376226520441918,-4.596283127801179,-8.419818204109212,-12.022449923817717,-15.191559210367835,-2.8368288826619192,-18.573325631034024,-2.4002634743426086,-0.6887123270487976,-4.873591512971622,-11.423126481940656,-23.90430547267428,-7.552944750145095,-20.039048508302088,-4.580562740801355,-3.5134743793791188,-2.4282748333774435,-9.991429700999412,-11.832199775046924,-1.7841313240825087,-12.491281124489177,-1.8152720940555298,-6.963959961057689,-7.072280835010041,-29.15568450650487,-1.6740894575534284,-11.30828622678753,-8.997291331317626,-13.929368875130557,-4.744537550960651,-25.393685767937285,-1.0432747114525966,-9.297452514068894,-20.993675207542196,0.06263190288046161,-14.381526030700329,-6.873225889950888,-11.224026774623887,-12.423052493379487,-2.8280378043737144,-3.7411602238694286,0.410436649822131,-6.126727569206956,-7.360302815946724,-7.589277657418521,-1.5834039626361474,-4.58803333847996,-2.7445399713440253,-0.6713108107191061,-12.085653900073602,-6.587473654197126,-15.159652447368941,-9.994837290133134,-3.5975072542553335,-9.65859149613226,-0.7930228088278994,-11.065302956568686,-0.811755219452607,-7.58271878041738,-9.716809705469316,-14.258787171774976,-10.48863282691405,-5.30406104053084,-6.4805547417790805,-2.596222572487534,-9.477554462187797,-18.08792361914449,-5.7717971455057295,-5.423754377265425,-5.011086381652568,-23.9928603087387,-9.563154877315753,-2.4282689154519232,-3.4297894087462026,-16.75380298786689,-15.196347910394174,-6.591511435149464,-3.2184651354635605,-4.3744082885492475,-0.6115811606384938,-1.291082069747958,-15.468870611853788,-14.197242565327343,-4.4838061390244235,-8.399518763216832,-9.409653419325736,-8.093355117933072,-6.490951651365279,-23.739924210905215,-5.470669685248751,-1.3103977968888358,-14.405403268997944,-7.162702386310755,-7.676496336976854,-3.623022899787358,-12.918328931879245,-9.411800969033365,-5.493610511672969,-8.20720019084586,-3.3250706152823355,-3.3629306045456673,-6.851896978050988,-6.553516655310574,-3.4561653139356423,-7.711202907374428,-5.8753946814947255,-6.58002879448307,-18.706253319503205,-7.646737723191777,-5.7229925107937945,-9.338946437945204,-5.536287915644252,-12.144192431328605],"alpha":[23.381356376359083,23.874509416290582,23.243514968603133,24.818399036436475,26.14274116262644,27.771717345614757,10.905956873875002,21.192857190231194,12.46140036543629,14.9282272753671,15.586190876927791,15.181855428929335,25.189088033298983,23.16208822034075,12.25483957741464,14.851965365581577,14.42884134372013,24.48236148922156,21.0378732823793,11.296042451840664,13.213757195952475,25.056364448796952,25.64335166681812,27.051658436597556,11.396966206956268,28.891792481555004,29.926479748127477,25.636263432338055,10.8056102174847,15.498662464770089,24.003307404630874,12.61010328715483,15.62753736440143,11.702589430786716,14.053687626394016,26.936054416784035,25.693452456077132,20.555254631983416,19.85807293414716,27.689740172152327,16.162256865196948,24.33009886807703,15.340163845204877,26.67834891421627,11.35531748768094,17.98477097954568,16.05815345570377,20.986820797606327,25.303403313622876,15.901582324010883,27.41618971175057,15.972038426096926,16.749642363373155,28.727129643938326,18.675042267070797,13.36656332569293,25.531880176183957,29.627470537851398,26.97395045110089,26.27762562486787,28.851441662636717,15.265595275366731,27.736021584221024,26.52882006818889,25.56023478540859,22.006932357776627,10.715968391457187,16.17615793284978,21.197231296273596,19.68696204273249,14.370087302654433,23.211706931046237,20.790500401086316,23.505467497716083,20.33651228507692,10.121796833437164,16.795061982791136,28.842169550665368,15.15290563753731,16.3473823465589,21.758983406257965,15.230925400342592,24.717695294648436,13.990830190850563,12.044706064388988,14.160388597197793,23.30029479085903,17.675298118991876,10.299992241964846,26.532276425805208,12.113816167221927,10.821765042930839,18.80367247582674,13.174004535975751,26.52893392125826,11.400923791004116,23.296040262648447,11.340567114745355,15.992887154956179,16.941173215606504,16.688037784560755,16.688233529704295,22.82653509810729,27.033030775154245,19.143770069943592,17.564328431520227,25.852144187434888,28.427516384738833,18.7757874952839,11.65523343518526,13.837536370655448,11.437385321294746,19.680734317228584,13.34947744355456,10.1755032106519,20.903060405068807,24.549219026055038,15.592290336854106,26.127749176601675,23.214933837952806,18.301694351884663,29.193294615897724,20.497494030410245,11.431336078894798,21.57910801132758,12.51324344951981,11.134972230157217,12.871074574581002,23.49430314258352,29.858482588117894,11.647165517199284,19.144921851328633,12.022229017900612,29.0741491866304,25.539722203689955,23.862344589862246,15.061697346978352,22.37615078425953,15.834822046719719,25.431986737154833,19.285977832177434,16.564679171611406,13.297184001275028,18.987963922837263,18.576099860683332,18.61485707334574,24.486480627826722,12.998105781830667,17.73802990317169,14.501283245114426,19.351568162457845,25.419521066410987,21.948909901186866,15.264491866628958,17.362154037972708,19.457214115182207,18.55566547142319,27.930010432811855,19.804669366295464,26.15393646834008,19.041827513722744,23.050035735061492,22.478941585318786,14.537503132934756,23.021064551868342,26.797683693967702,28.527573173482295,13.072079352367663,22.03250039759606,17.912743017857508,10.731705736357483,12.493672918419506,23.678132897472132,18.960253730138387,19.833666932556575,11.283997237633328,16.957755112122083,18.31234407797469,17.791494381874934,18.72648421539764,22.43498253459073,18.309033449831702,28.277765509435433,23.32788519254217,19.527842103343428,29.06958516101195,20.133930243640542,20.996971070719205,13.98144361406787,24.530535787022238,28.510407709622193,26.708560160148878,11.109905195704508,14.574420240819244,22.647429379941,16.888211525641367,23.047031436165383,22.818499953032095,17.87513923507642,26.593707398994937,19.878333496334587,12.0327667139323,21.24093685455211,19.649268115668924,22.81731035639069,15.983749203572582,11.505508636509143,16.03089506415678,24.59657550582778,10.601587368019839,23.1352387555265,10.314822355165859,11.448649099390803,15.033046380358117,28.61434632572015,19.684090627214562,21.99380395163447,19.86356725975609,23.006278684910097,12.962245290827266,26.888135288145122,21.11590099422971,21.312881365436933,10.538649146594977,26.910944060997892,21.85068596609988,25.634867869710362,29.478365439016656,20.226830399609874,22.90356787878162,22.491605223834593,29.830415767104462,14.878268765395802,25.088156999501724,28.180721377997024,29.874853680791517,10.097469562273904,21.55787145512841,13.889717394610352,23.27492860249261,13.762597603859135,28.178395584095405,10.02025353033677,28.93996498625816,16.946907563416623,13.670596865128868,29.46317607397186,29.658624308484555,10.101588859930143,13.87263394733321,10.347598775945581,23.004369912406233,16.80299954253289,13.440821968986022,26.662615029034527,18.50421710463266,19.12149987292411,13.342132733383632,21.012612731427737,27.937775367760413,17.85225448110277,18.44773633916879,20.534630372057805,22.72537764403411,18.006707350943483,29.302471641397393,11.476660169223889,27.04688332976186,24.932204632125767,21.020518988836557,20.9805447846297,16.579140011940794,28.35956746254164,28.177330713761883,15.52223530079559,12.911172077737687,15.649681489797382,27.006382373747947,13.125866299844123,27.141884033287518,11.603399189153944,18.87858542776612,13.154168045676911,16.462644787584217,20.773732762147933,23.37795998247424,12.952060946988047,25.66218081905666,11.822393391902644,25.55501545445562,28.96491821846383,24.25168480941469,23.495392976125963,27.554010945676257,18.244693933005344,22.772865401320992,13.223750615230712,18.471754156039605,22.006019143601236,28.778350804151444,20.954678728194835,13.749378533476676,23.371911857545552,13.189907534586753,10.271096869453453,10.71731087667278,20.902749725050253,25.17000954930394,16.806633406793907,19.711444400102607,18.589598754956977,19.38250612044485,18.520799406396996,26.15630520671965,29.13048235805086,11.085630703174063,14.784481493084938,27.33806773074091,14.33052895905561,17.449718531191763,25.35852287392786,18.518201740480333,26.04184079481636,20.82764676723589,28.466660543170548,16.439416996660153,23.09432738047466,12.314324005376132,20.309692050684003,18.40597019433307,18.168473884509456,18.642690775365672,18.083623824839176,26.6541541713664,18.85904467990203,26.058454961458875,23.988264458068098,10.94911192691162,20.80220140900229,29.36181734407155,26.10890353905861,20.660731185453027,24.134373065802222,14.052380029604317,16.547474182887946,14.11571065553408,19.210079898238174,24.35268497068801,25.571797791205846,21.702579291971496,10.727546948515482,10.405793147380248,10.215212170299202,12.894180816767937,17.81891275948576,14.517877351179958,15.32825580724056,19.84851526007752,17.677641489344605,29.27190914394025,27.480465964814762,29.93727538915572,15.467641718978498,23.680791604461792,16.06733308554407,16.0356119386061,12.153586299137856,17.892592498961157,26.73564234369534,16.132439950476165,10.549572230995473,24.7331413203609,25.794997555972717,16.124652432660685,14.582581026679357,24.20654995957601,21.1773185578576,17.161454473204444,10.563556918887294,12.201468523045316,19.988115287275512,10.603999140864545,28.87741125693983,27.945861631242288,19.486936667601427,10.305666143790276,19.71329448150509,25.18397377441783,27.935991490005243,17.05940940393146,24.58789199673811,15.65641374213746,12.04555870925577,29.06945475396458,21.377519383774732,25.289916357754592,25.166937350416898,23.77875595210229,16.44437337752375,25.11776306028001,20.76346068417947,26.238820784896518,21.03508843210752,20.476102053835564,26.478934069829087,21.76174757395927,23.917991605272306,21.774086771097465,17.738761601286747,27.314424647515906,11.135669437261274,22.21982831736346,13.063531261333896,16.49993419496448,11.229167932399724,15.376826452530143,19.898855112168793,26.89593475436351,24.07020914828732,17.23809444679928,14.525089941759193,11.264763080078254,10.066529984284958,26.658272980869086,23.830929159787328,19.122561008139822,15.200834484525409,17.279889702056714,12.570156379075375,12.365377156367629,15.767523488368793,18.52618591363528,19.366837696212915,28.448361812625734,23.364522689748522,20.90789164066164,26.573751088299453,16.875596339400584,18.65761685425341,11.132441468234703,10.32724725155505,20.99143604222021,25.054625576506616,24.916035051359323,10.945413874289965,15.510601196879703,22.76120775601372,27.313446030701904,24.735090766789412,29.242129572720273,22.55331834870923,19.900635095212355,13.14274586734458,28.948629363496572,16.626925535649512,14.815076365183346,26.04111512580583,24.88046411848709,24.409701281189466,13.420192920512335,29.756192080614397,11.170459244757875,12.71294047499711,25.415289069554813,10.357433801692784,22.027442918436485,11.464388541721524,24.079258699278654,28.376729729439912,18.493397461464976,12.730833404085944,18.166313112617168,19.878068645341838,16.031708643354037,15.537731035081205,17.121085572143055,16.486562966128524,25.43372413195991,23.57094444236116,22.66972582316491,15.671963288452261,11.298060295120376,12.722371847568152,29.76688362632666,22.501959923997738,11.666054763212031,18.408278278589535,23.925503565807425,10.107965785609272,15.498876668817303,18.66033455510882,15.617583723504143,22.0624466330707,14.909301439072188,11.052408012088097,25.23088812094436,11.230419820442311,25.87938434127707,26.374578426838184,25.806039623481738,13.174487807923851,13.358467170307753,16.411377342737488,26.749435866044387,22.40503174420634,23.91962757825042,23.55354539823592,10.986427121048049,19.786025698221195,10.111347744864801,13.333201866283915,16.421812310334186,14.877340670539855,20.799473694290608,14.91172810940975,11.279317871955827,27.284196845589843,19.80632582574414,25.555988138430333,24.798966320626437,23.045493070643023,25.099720235649468,13.408842561974277,19.768549408677927,17.71553180482915,20.81951135429527,22.767546507050284,13.9042604725074,11.21560877188867,13.89227187112349,23.46208727264308,13.282474287521882,15.830409556097123,25.83896229451785,23.77672770796766,10.943862279742195,23.621165235252786,16.49068067074402,26.066318792897647,27.044372656030156,23.031311094285776,15.43873456825963,25.257934780926135,18.026604939900565,18.35140665801342,17.372533658852007,21.460903748588606,28.4554096633198,10.174953700180009,21.420609882296937,21.610086282061886,10.560311255308342,11.36229988181789,29.062567173661673,11.876283924275608,24.253902943490676,12.469031941230519,18.59503920988861,19.385181578310156,12.660195505981765,10.958436323115833,12.262188307428396,15.550971114806016,21.507726680344092,26.658043492022884,28.15709096687053,24.996390138631487,26.536937203550117,15.35319887670099,26.45760999190673,11.761295130601077,10.174134632527586,20.55504566967455,10.066793382492026,17.52764035731505,13.716128536484522,23.573685261907272,18.469031117740755,23.006613215120467,24.990356622513268,20.671035266871645,25.071451193327654,11.149151522908145,18.180878699406364,12.06787880486619,12.646690582453006,11.765895134933238,29.14163358749051,11.23465900614898,22.90312475614148,21.979561029480212,16.970993527466437,23.995925876209036,10.907010516683705,20.455357701694407,11.887390263516355,26.871102063960688,19.83441351293655,14.12938126225312,24.44776410647799,29.326713996476997,20.815386462861913,10.075645661453239,10.010032656862577,17.304486804123265,11.820825348806409,12.925503566315196,15.046325840073091,13.133421649880859,21.193050230574446,24.353116333724905,28.19313593798026,14.303981862972982,26.739617699426454,19.23492976514138,21.978425285161343,21.85326098066443,24.213224240877096,18.565289204892533,19.747410118115383,24.366349518286007,23.809755361227076,25.376971690116342,16.570914711500798,29.15964470976818,14.794888841106829,28.87322601835656,23.06444784051118,25.506434670842616,16.768713420597567,20.342486324097987,14.97584919815425,16.7799201274723,28.289241582458224,11.740480127643597,26.67074375004301,18.82984109290242,21.585684071525787,12.23721434380829,26.537773934273183,25.80102427783984,12.255713463248448,17.819140608448492,14.713661420698244,16.82330547655909,10.452219282112999,11.944033352991053,20.73884564186734,12.247984553301524,22.564546730980123,25.319592778513666,29.502835360907824,21.386528093038795,29.560883851432965,24.671848922602297,29.485805319044864,21.290982747684772,23.108923707385458,28.519534454997558,21.334353893852082,11.61205784400285,18.567936911021533,20.590811181246956,25.740655337501373,21.90838511753411,29.812960136992057,22.260135069125795,29.804154853502048,14.379793037527108,20.22464290645088,17.7332586530825,23.91045573356276,24.039396591081164,26.72276226847897,25.0243906943134,12.976913482380708,11.582029722143275,17.38149908766923,10.964968736277996,14.139469376200102,19.86270834190007,11.124771988854274,16.23744908679486,17.750166139764033,22.421223637068227,21.165793807562086,29.792560568544356,28.465620506713464,15.87839585284291,14.563842611514124,20.92132807802214,29.914537799348953,20.009896722156697,10.37855376345211,14.640677156336244,23.74585788060816,27.796914518182902,25.758422533090325,23.805148155847444,17.542876772465355,15.674624058250268,22.149615171291707,23.637087142339098,12.24527535280381,17.113685213437464,16.006418501825802,11.119131858010935,16.4257971122273,23.24154769480156,12.074592424192133,29.475889339241267,20.138311131779293,24.47351676152291,25.29561718506209,20.03600281560962,28.35331916669515,23.466616962158298,28.18322442198937,28.780611087580855,29.13382859495818,25.80855203241512,20.959163663019066,24.0274229041059,10.835040980510286,15.502748807269136,20.09334099505708,19.935301140860766,12.468398971579301,27.728886259049222,10.49303584361573,14.791177948490777,14.272114295797547,20.469726152107008,16.504280712162895,20.68884533156179,26.18653053001296,24.41474569446525,12.298819000420407,23.41366491654616,21.080556919100353,21.435156393716177,10.609127048903218,21.0950993582019,17.86389381111587,13.084764443695045,15.692599835042156,26.10092742206885,29.811627575125364,10.691893109372721,24.246637913779963,13.654584277867453,22.340098514246186,15.913726856056183,14.28242609203226,25.788989629115914,26.36308808127822,18.441101254053088,17.49471700885808,18.948295659216228,10.236211368224307,28.56947581744601,19.414054705196477,26.732590540718423,14.18357313631887,28.098030376171653,16.845238621099988,13.03449050507615,11.990489537733527,17.26932610283848,10.00860581919821,15.36312985553157,15.028640942177853,23.111893550129835,12.741110707277663,19.165562851243898,15.68448896974132,22.803940561251466,23.065322257533172,22.809848771453268,28.5870370594545,25.8864077227756,25.4316663945138,14.250070492434501,25.12147471573484,12.751361148303214,21.84108018475241,11.746555068796717,24.868436975622824,12.427377244129104,17.166581829206788,26.12521254385304,14.136098049352182,15.62210176918606,15.716764622092052,23.239705620899358,21.687261657180045,29.1026349904828,21.4275778144373,28.419687272313205,28.225385522082043,12.709507192377467,28.10523081399536,24.585579887878207,25.67841344909853,22.33128908209553,19.094411892372936,19.526462388231685,27.07602524064134,21.16456563769986,27.6393666194881,24.17650236465478,19.600728386274714,27.272134744962855,13.449029542023627,15.394235562004553,20.616774605222076,27.395980045865628,29.909706037420687,19.66227200719849,18.857579115343867,10.242710626548309,20.193080718645216,17.976769647977644,20.331166671012497,24.16219026866952,12.809550173505947,15.56768496303983,10.506822103540259,24.721318181529924,22.7706575478806,28.752465435711812,14.388416553266321,21.345136031613308,24.269476417987224,13.190651091484774,22.284862791894806,21.32504865283183,25.83114232354248,22.45094809617661,12.849639920536644,13.60017434661303,24.202196243358237,16.18321424541672,20.809638546122287,17.7155290346155,20.245101108471424,17.622240889735213,10.17164215930752,10.384374021779688,10.331768813806864,12.686567031721637,13.097882812751426,10.604648008660313,22.49099176879547,16.722726873707142,11.811050570107188,18.014591597058327,25.735990157586457,15.269605407556956,11.424778429182485,20.746738356657602,15.411651008352433,27.73075313817136,22.119551982824586,21.833666877266623,13.197421381281064,28.344656112225746,10.661168353933297,22.0606435793529,14.08651418976909,25.45337281838335,20.37766586058389,12.393529252615686,11.384852403851863,17.202688279515804,17.250131033489936,23.470558805050207,26.73689170737315,10.605783268038165,10.926231214066231,17.48174752792967,12.447341826799665,23.120234534063258,22.23464043916511,11.296354374067178,20.031773349438172,21.258486792157182,25.40577681596002,14.945277348059545,12.204365326901051,29.194092331267175,19.991819093462556,26.635700291359964,23.137204778641962,19.07674423461655,18.0102016960253,17.186454026984098,22.518453445380974,28.439844904583612,14.388388205821165,28.776177597598135,11.511426126461842,16.34490026454629,15.277871750905977,15.07626637634409,19.990466526476265,17.089970013813016,28.05553961440966,18.025129588504033,10.531216252452502,17.290547443029617,26.666298169819235,10.359980336901224,15.354744668074524,18.64055513990898,19.67912409281005,17.430660073837316,29.555339842401,24.776391967477643,15.240539397035366,29.634525054538756,20.918638966880067,28.487124359324977,27.716620271002334,19.160824192637357,24.302289855004105,10.455952989636241,26.557450542137882,24.79597497368481,11.505000759640511,21.708109877850834,11.240077651682746,14.276688394031115,13.528207615139557,17.276759298904906,21.70765395297154,16.786086552731042,28.720293402535845,18.07013141389809,21.880732876413443,15.39699292790569,27.56074160512081,21.94962937252548,19.209483649243772,29.553438607948564,13.633312141495772,15.858048613827908,20.495222151225594,22.458536770600006,13.749237837693737,15.12086228413796,15.864900885567842,14.877045593841597,17.158443987366383,25.586203552027655,11.648453410029838,15.356095520082436,27.68612277199309,21.518052819250684,22.824486067703607,19.707454310950034,24.43392242547108,18.86425840258614,13.48609270821278,12.141233514647102,19.371831843854103,29.30718417744317,18.08709523598649,29.415326481764183,24.162731307428697,14.064248365517074,20.011206158579185,17.79467298447644,24.125174872375542,27.57335885767221,25.934734684048514,23.29344347555932,12.559268801932678,26.94027200190801,21.533520987340463,16.74958286829289,10.014421934438968,26.386475699002816,19.601015372382612,25.197024824197328,17.831054712534318,10.445412195422502,24.386411725858856,21.72286126096298,22.823803228587074,23.562197278904705,10.343495623169963,20.313436219450132,13.140628670440236,25.623176532278485,13.288457631587548,13.744271314737858,15.831033282241913,23.866576676089206,21.144867698282297],"x":[43.54190527657507,29.013873722691464,34.472029976067326,34.927742244821985,42.78754522939163,17.07304003223455,31.81511884894394,33.47488893786793,39.383933891987866,32.346815037095624,27.219664887156803,34.40407071127417,20.15599214121645,19.18817423673451,24.375451880152173,25.19095923646829,30.289766853292463,42.69529975036981,46.54119935406235,24.557454543156627,37.20100188995261,32.14505388075901,30.65403901823415,22.149007181505507,24.110032165025768,27.836518435172614,26.055757145327533,21.56181040211887,40.556505177075636,26.07811321379082,28.96912743490349,35.630242008573774,23.14793151986685,31.56909938742942,31.378190297089724,19.9144687436955,33.34442208135621,39.98398066719396,33.081836521099305,34.649600149189126,33.02324456286177,43.78988848099016,25.853821616696614,29.762204608476726,20.699030236162834,30.741480117482062,36.09669060600352,39.75660367337311,29.878402901013523,30.85630493309653,28.241319387449604,11.177846496898635,36.02082322767352,36.428211436448414,43.49273320450863,42.94175700055793,32.40247155409168,23.62666362731558,31.853402122401928,30.47295123069115,21.70356705646377,26.5359877352534,46.8316404863578,31.004764064272656,30.748725492889065,14.466937512097292,28.54477233745186,23.11024025444437,30.361410813638155,34.42080666190415,49.3771041909032,25.709295539613283,43.677129420484185,33.915926789676995,25.040886988742145,19.02756332308148,43.67228773446311,38.536351303327585,32.99460696408055,18.897385778179306,38.32415330742197,35.547712261292105,25.86756895264942,33.32043053974979,17.199653863079945,35.391147947074515,25.587184511091504,33.90872523318355,36.30929352949818,25.99839513037169,18.77149638710766,22.671823076304563,28.67121939387617,35.55424151876552,36.68413720870206,27.88645372425802,26.705424783856838,40.50698448989227,21.02973633473812,26.880890805525183,29.675571034995773,41.35023049156622,20.606949400803362,37.86288671681472,19.543829090428808,12.257027651563707,36.61266628469228,17.55237027215177,33.13646354379735,32.71609138818149,39.30839867301955,29.927908929488567,25.45708423274361,29.06301524165127,24.69931455386773,26.12758440303598,13.897604384451125,24.28896246802939,25.70241541854285,30.212865562415523,26.72349460993665,33.415548009160375,26.44578273062925,14.805251463124097,26.188781002276812,43.48218157638496,44.41587153218338,30.43001713237731,37.366083020794264,31.192587385654797,28.283235380610844,37.730525360358186,31.05079146292343,31.6342186385714,21.39676680572191,18.509924862303542,26.844082443218962,41.10792777935634,25.47861117249637,29.80757186615715,15.568250407716683,18.695256157478582,27.33963221580029,37.01537895725052,32.409860509859044,30.90208725261892,39.82818585109793,29.188343513395296,31.7347760791574,36.935368531484244,28.817444747263387,34.03605259779908,34.196746720288694,48.10616080681865,39.279296163062604,28.764683709694403,47.69519676636399,17.86582000522025,12.556771922298333,30.488747876392516,27.325835815109116,37.4019285429999,37.184477619861404,40.41048909244403,26.811280922954115,46.1222649169552,44.702190535131,30.368060803814227,16.85071205382265,22.744731886688903,45.940811174763304,41.05918797283761,24.869215952454674,20.01119043706393,34.7955666370374,17.1935963478547,38.971183345799304,31.290696265428412,28.547125255428462,31.67245050280042,18.174347771323657,33.7456896055137,22.441676647587823,46.00303972797661,34.109968166258994,36.677000480790284,31.30739295953708,19.780598374428024,27.801563164129785,35.04090610314587,27.47558340057621,20.048643153570154,33.41931516076809,30.6689395155251,35.81722276849288,20.912067430470593,27.8647785587327,22.366075663635407,26.42979333008878,23.478542320362298,26.498962293691566,37.00988632777959,30.635775889360055,32.287252443220176,18.007523825620417,18.785503034879675,35.06830127799205,15.188883133033123,37.92798251663268,26.40789738506077,33.24711752798025,33.2267373763257,16.19196604693853,42.77174623899218,24.62137708327825,15.59343498505915,24.367008053127243,17.800027675695837,28.460681949105986,31.91269265329225,34.270492025218026,41.74364854478977,26.406914705731108,40.54537966084621,25.639613506310134,16.454817281508525,28.506706046583094,32.72031384322127,35.699837192778304,16.122637183662697,38.92099197084246,25.819376009268336,30.991717126772745,18.179064564973157,43.630038034982306,28.68645257539328,40.41095343116478,21.726601440152365,29.862677091521096,27.20465437005761,36.20764615424156,21.869018872923167,31.98840492997672,36.81647881838806,27.164676773230877,29.80539048610295,33.75970047825389,39.81652197297732,37.12245073597209,43.586576225320044,16.078436457431003,24.62502288494448,19.15229282894918,33.96949574503548,42.3541558152686,38.715519706209875,26.491137883216815,43.804661238034825,29.08858186033221,28.925027879912754,26.736377383449057,39.73369823387401,29.47620415730043,21.61842833889008,36.43943032014683,11.463213910516373,35.839633270128815,30.84091385121132,28.321643294913812,27.99783572864127,37.797335255694975,29.8048034824782,19.396823391478144,33.805573595194915,34.306546237046746,31.66783077387547,29.011725918283496,46.232303904157334,28.704207878001235,33.76570258923235,33.99546794778582,33.46022247903326,27.751389779081876,13.314166414969973,26.861134213124735,23.458979188007802,27.47973918857496,34.66088498988008,26.446525783148545,41.081159971342196,27.25958352347144,38.198032737030324,34.45656160204008,35.823521417187045,43.588941291489945,28.864000572712747,33.51209476697349,22.474420020547758,11.938723740660215,17.437851463125067,32.417669613472285,41.25210522262762,18.471470381150347,40.006771614556726,37.794674355339716,37.354485906637876,32.19103108936317,31.673720728630443,45.135810005024084,23.297873077477426,32.64170129100215,18.866782326309647,29.892683149040515,40.36147184269322,26.880360394111346,25.896930562600687,37.67643878950187,28.69890802659334,25.05385743796773,14.176842661072643,31.872755644389407,26.048235705479833,24.554523633078603,28.551396311234278,19.47478740469734,37.342245201928336,21.265112185398845,15.85701669743898,32.230590162616124,29.098605361543193,34.04891719226666,32.49357284876078,22.870093969180278,30.469004398814434,33.581811019616694,38.91720781714339,27.126070134258022,35.89496207434166,24.0318488587266,38.55681675566797,30.53516064019331,27.920571464552076,45.56748017201714,19.452239443519623,33.49582009246171,13.092231048121295,39.56746653703112,36.50230482059318,17.748909275764593,16.114486157791056,26.992009813329894,15.551627321458223,29.77940304183701,18.802577014917045,41.37899589928238,14.20104743339878,23.433806038490395,33.38073967718103,35.23744930873865,27.291302401438003,29.73684017626716,29.094509918427967,17.58486860671488,31.759402566184008,36.180032786855236,21.043130938822788,28.076068936619343,23.018604436908838,30.299406884661188,16.722488274518273,30.078027359709058,30.821435793429572,16.845588333293215,26.768242208802032,12.218325692525358,37.37644192349281,20.13965787915484,24.731968002548985,40.9218337779554,24.449292236395912,32.12597433214236,21.459184787612777,35.01016951855042,18.82699850513958,37.480529643544244,35.08588990102201,34.798079589328204,42.67946991554964,44.406198407062206,28.052493627544273,21.77550122030834,29.880306899279212,15.844471364325887,18.696657803717905,34.17093252138325,35.49537408460706,28.21897261874698,40.53973542844985,34.50094265048735,17.98519521208263,30.10949071337322,29.369074778834907,33.336976182363934,30.616422385515946,46.57113404930443,42.47738134084675,35.31807292883856,37.88674677393187,22.399957901323248,24.46778513982024,23.812489514788947,28.442355621925486,30.722054590669007,35.13446208268513,16.09629933807141,21.300857507935063,38.26981650703961,21.000441297033554,38.13249568877398,21.48350784260084,18.324823814304395,23.215040266717555,29.968150591279343,39.520154331510284,32.53639991191504,29.69920976354237,26.09776848311234,36.47589125513447,17.369507218443946,34.65949702557323,31.51573930614279,20.686407846120648,30.42718241174267,13.343717394731552,37.320802254002174,27.420855448098575,26.300189341805925,34.99993077489383,28.3866313797086,31.464063242865034,19.63716247849257,15.638816723906462,19.30550564240142,35.03124423552106,39.43148414029261,22.620117031765595,30.244209964106304,39.519597425803056,21.282423204066088,27.62533673048742,13.703079515899121,41.45938704422604,18.484353834602775,19.19489515364453,22.979924643108216,36.1847968701703,38.99886081277918,23.978899702073846,18.33785231351861,30.142738371327766,46.91217824411331,36.55940486796175,35.07070747439445,40.11739819040443,28.426434088652467,36.00540916226168,21.30628922355347,38.72192597118023,28.034841916898415,40.030066237385064,30.880309221616336,31.001437288365832,37.43704531722513,39.11767671160152,33.006790905025134,25.102105918745913,25.09475996938348,14.396334130061202,33.229445427229365,38.5176055984409,31.9225007693295,21.34720979942405,21.282930100164183,22.53066102718546,38.07221788631815,31.714475907515745,35.90044509465504,24.453853175896075,21.33247847194375,33.573691376907846,38.73646947640478,19.278891789742524,18.440832570307528,33.70847025356021,33.88691964106361,27.566892045177312,30.06543034590641,34.887412050730674,41.74940237625189,22.633092610652437,26.481124417124846,19.00257422481591,46.04768311819036,36.83610363386917,24.066389549089184,27.216549849278877,47.836117446823636,23.552155150196693,18.640587263251035,16.426777125752178,22.217294225975202,26.01786797752515,25.850145251175185,27.72562132664041,39.329286044328796,33.133310793690626,16.773379962798977,36.510955411848414,24.88960512213926,28.749387489259906,28.084832394302516,27.10694672899483,25.250934057383702,33.709832049313746,42.66049709544626,20.31136507377153,17.581282435013325,32.64142785878423,12.634001440670556,28.699541843818494,40.171064544242775,24.948509754671292,28.855243269093783,30.02468670495796,21.797653922243597,25.618612900535382,28.41972676942266,25.389536981858107,34.53405648465723,36.18523203696814,37.23034683667518,45.19952526651859,30.27663643106012,32.94323977455169,36.18530393765877,23.140137154941378,36.77255530987459,16.020151642739343,32.792295024411295,33.50799619032475,15.900038901232271,30.222533674066963,33.65941254259347,28.10003022503668,26.296906520249486,40.08148803241765,40.847447860330725,25.985402048348675,40.16712429227837,29.617336335024696,31.605594048597958,36.8819921514191,37.23282460217102,32.44077041036236,29.080959632464744,29.506421857913892,39.47804051811929,31.55431572372708,25.5482183919634,44.84299685511654,37.717398785263896,22.317035150526724,18.889590781833967,19.463657177413417,34.23300638791683,26.271118000961216,24.16709035391413,12.090232742997765,44.32284526854481,27.164818536946996,21.373440535924733,19.463922320447427,23.31817505964338,30.478947960762532,33.26422658032647,40.971798637482436,25.241342285677312,10.883529763622445,16.378824704433377,18.963081275409728,36.144920877057686,27.425167746503597,27.439767660022518,25.647579108584768,21.594516622879894,15.914138725943157,37.622930747178,35.23781695610819,33.744384105427784,13.108779723924902,19.142530564874356,26.30728422660159,40.99700793665831,29.601555854176933,37.78102022399912,27.56754194633008,35.56690391622156,39.72874690714525,35.44221671645666,27.879174565621824,39.11457773667383,19.412770878678916,33.491821251314995,41.94461157618183,30.680255746440494,29.386394363354036,21.667718337656318,28.600829396001952,29.723362063762305,24.31664677485981,33.791492065601915,28.729869525885103,20.325423467468575,40.52191353990213,31.312479509662452,20.6406097946456,21.486190172830593,29.14081881084065,24.791165479632976,13.924298044514696,16.009998516619895,15.823123229618655,31.863153849172257,19.49547274775692,40.01618404471766,39.39700027088756,28.681374253186405,19.194829974954896,44.35522961501225,27.930770735271228,30.026963253338856,21.018867054282243,23.949367039449818,17.929089768889593,29.544612624922834,36.25174443624718,29.094008902044582,28.145094905976354,33.18176536561832,22.975488393814626,20.85641143897464,23.26188747409514,13.03100494442988,40.923032418531335,24.150876237263944,29.86874776006799,24.570435528673528,26.794588070974328,25.727293906161815,45.76276299073479,19.780366310729715,21.484906199577324,36.50914010019588,45.528590652348015,36.34274351991972,28.533143345502236,36.64992862295842,29.011461945670973,28.121914644795545,29.83626043080675,16.17226947469166,40.48315590858682,25.30539898284038,22.446836878876134,29.482182113820567,31.09600617794858,43.736856689272145,45.15040480568099,19.653289400159316,39.87619848469949,20.01358195755717,26.147897943617224,21.155785753377824,29.496018066507478,22.50312910777628,30.53331894571104,24.55728572903309,39.631495367460246,36.268812396998925,31.113271338631655,32.26953740390931,30.291844163036412,25.9620103034907,43.18506262811841,19.254440533139512,13.706867399000014,20.49626584925521,41.282132845945654,23.582103367849484,30.742663680128768,22.01778306696425,42.3276717782027,31.94426956966973,20.694784349352858,25.280531782597716,29.600735761513075,27.12164641228678,42.00954309213215,28.655908917111514,36.33348289082005,37.58218521779159,18.157948307649118,25.130620826235816,17.212245719628477,24.648904024489017,15.366876700582619,31.501360472283217,33.988156702049395,28.79481036811929,49.25792398550689,26.86749866416545,30.581608415262515,41.37305678881346,30.79630083993236,21.960189172635687,34.77637802067586,42.4977167689364,27.63242903648812,28.09312381733414,35.48087023202666,34.01013391351394,16.851558042578507,36.42749365322037,35.868837509617435,37.24593080415863,26.694899483593936,39.90917376944866,34.752999388362625,26.562366806399087,24.561092755096524,39.95362254242371,30.941045199462913,18.694824922321203,42.625799988732105,10.95607402137257,38.21497084931627,25.770817546469097,31.729624750215912,24.322589763843627,30.390089592208646,29.258776550403883,38.38802452972451,17.681560129044225,14.031731974662462,27.36251207404812,21.87821564576492,34.79420225115278,19.472731433955648,22.97156386743081,20.205062622005073,36.368388145332474,15.775315802755312,21.936056687087017,29.252411801504362,31.477288932770914,44.377381300889226,39.15490564934669,36.85973526263986,42.739677467969024,34.903110340955834,16.2822078225093,33.21682271304936,23.6289175815767,46.48036627550021,16.39815446780287,23.979042909220944,22.63793317234132,28.873294137785575,35.74456045040426,28.082660412564632,38.76939569188461,31.84975648692884,24.815618047820543,37.13679595052223,45.604548969189736,32.77230973056733,26.60425739840215,24.32989312974945,39.085767997475706,44.508508554548584,28.067247470630456,31.269440242754484,14.194979264492726,25.97004263853083,26.67373113336406,29.542923369516203,16.335902088346398,33.268043351145266,31.88632613240055,38.76315912116711,41.35446541014068,24.2739082266064,41.516781856499634,28.181354949034613,24.919356805862513,14.626029182263487,16.14972699790922,39.733417469636535,38.638690595314756,34.66444456451371,22.89974300859377,23.33861058696642,43.3759626855644,34.004639584254555,27.19668048788304,34.16625144745816,29.4611996216202,21.430021021890497,19.29895971123104,32.49359434515661,25.961674438862147,18.42450247851268,18.399037121000806,16.940799739892327,45.53047700135098,28.548711010541304,28.494455073904586,35.2204928661495,28.80336143099134,22.935424789463333,19.70288520204522,29.33051657375391,26.211136948720025,31.22314082053667,39.158475400356565,29.1242365418791,34.73714864246837,26.831635227678483,40.613475661862665,30.86224046978356,36.04781161611552,16.335640727702195,38.114131933104716,39.27963225117909,25.407006634071465,28.413316837473445,46.903736255867386,27.943587853147353,21.4485601786704,15.82704766571075,30.381277231027973,47.366755344522105,30.816299349051647,13.346921924003915,14.297778012187706,31.056220597086504,35.02538700198704,13.328916917022887,24.64339824523158,24.597020821955443,31.00616513880139,21.684665006194574,34.260982595220035,22.86351254208876,20.24817779437397,25.531112991444736,29.545658302105082,21.6106996573573,31.771908733471513,17.80093847076886,45.586218101387715,25.40829968229623,17.007654990635785,49.02394635211117,11.697656520267582,19.236963313637705,16.828826478805343,26.337321757548388,24.290887208727074,23.40184611949209,42.08642149968635,37.28718224047985,31.96826093119318,20.012448020510263,37.70399900153655,27.55085091751036,40.30935647032453,21.145046672381383,19.49462179130854,32.56829802327276,17.989747020029178,33.57092511607628,28.948822605510077,29.41765082680157,23.858228916935836,11.581730043729097,25.37312669901536,40.0013289280686,28.954285320184127,44.049639946231125,35.49532264686624,36.99232029238406,21.50726821202013,30.75226666458676,27.64561288343989,31.76923848705717,30.405341777905225,32.57178740142344,15.731657591652075,39.529533031360586,29.180233153501774,29.9531035673649,26.890089306832486,26.131628004353892,35.795040604872725,30.69796688090048,32.71831785079536,31.4948410610102,16.912378550391804,36.8066218889104,34.38008410768346,12.227201358967216,17.65845217392898,24.20780246746254,40.31055792963396,41.087452706057995,32.20703423710497,30.195772615012146,14.09522488073954,36.992182912761294,21.325269455557972,33.90497283444082,24.922944810747232,17.34331020460916,29.37968676684931,23.13627114154661,26.716603158379378,31.472722534599157,30.61079532612973,31.206018716587252,19.277968285448594,16.463117085468358,22.636323759596642,31.23018632471034,30.5948730084467,19.713911439600814,35.49181960830434,27.92575718957794,20.05112292345084,16.46116262790164,24.565139335338323,19.473592754457883,28.733986442476656,30.01500895654873,24.108717652354287,37.46763028691126,27.524000570260217,29.74357257230091,34.44313508783483,23.086352769867176,33.468472935688965,28.679813947982655,26.100245434997255,43.41370288920426,30.33677503071135,22.909237429224035,17.89379458231199,24.41779146149855,42.02010698372386,29.680788495237735,21.533257438432027,35.20059510196711,17.440725197060107,37.80451495345744,27.28774162871013,32.32846317458734,36.07328173269043,22.26729608863079,32.653978974217246,37.543276932861474,44.51976990852435,25.621109166897792,25.32535803626766,41.81882754449887,23.15446060838168,44.590324647216335,23.190618079131507,27.39357550226639,24.787419646610456,21.48870876300823,20.76866292416146,32.32107253636911,28.857203624502,22.83401612211643,34.05600575029982,47.710510202733516,41.20256759310419,30.23645090650595,30.799459923453114,31.01126059442464],"beta":[25.262538068570798,16.288946269217334,27.248575074529235,29.240664710105037,27.0786199865179,12.684634311292893,22.586001557606036,13.60380314240421,27.285756057712117,15.60673741164894,26.30085353574451,25.291278430893126,14.421437406338695,14.1636753569666,11.846015416157218,19.13085598741461,11.25222246632446,24.76819355163903,26.58537263899134,14.944525553883231,18.74307211901261,19.530137248718663,11.21924312201903,14.95956770094072,15.175436966269928,20.748200650256056,10.533132053360621,15.331697614037086,23.097574253231265,12.306036378637998,17.895405340019742,16.51224296875528,15.116219394987876,29.993599696275663,19.818044880907927,16.652423832871047,15.49546828031469,25.498487963439047,23.470764760056912,18.004778879021117,15.540965773044753,29.419884993296527,14.002359143621362,27.930165780205968,13.737969223517572,25.956847368795202,28.821270100793814,22.83516450451545,25.446443697485158,17.93633848837024,25.449250074099968,10.271126176634118,25.915127875995108,28.830979330247253,27.209655959742904,24.974308212009987,25.82096333194712,16.761207707145843,25.882642823544472,24.688627577662,19.317939407833773,23.714720891961512,29.752975443042317,15.260549055066011,25.018596263718173,12.557621876510261,14.451617296561846,12.35872162892068,17.13288244258123,27.400240034596738,29.731172376732328,17.910791592933116,25.563854230544596,20.522865567225846,21.26645135035087,16.906570058085897,26.569410979691458,23.63739630177081,14.072499749602727,17.5128178563965,18.87036923058978,24.322614284830394,17.960898773346564,29.55870979753321,13.606784906756634,21.187882329173114,11.748281734883484,23.58542321758721,19.074260931174564,20.517886105929076,16.817056585502645,13.913587961684811,25.97525680005816,26.981227878112417,22.459205168618738,14.980757511128084,10.88032576092349,29.450724173511386,15.502999629658776,17.834532242809207,25.901513135522542,22.739334983510847,16.28960418228276,20.187035736288482,12.329644679105982,10.108201610128148,25.42361332985778,12.536079777027744,20.80148927549434,20.463288240799812,27.968756284477475,26.920438394506018,14.966266832729826,26.124432180969436,17.495139055888778,17.970992553456995,13.382466885019042,23.70520570092166,14.681022565234256,18.741262505569406,18.31561529183295,25.748612116675922,26.33548449506393,11.62424797717426,15.16044981204856,24.54129384590726,27.497519078370978,17.54461969360658,25.727504586293392,25.62946384200302,20.5451400723852,24.893827713037812,16.199030213756018,15.687414856206736,14.159375945025472,12.377677388140773,22.677673969410918,21.87870888069842,13.139099542487877,13.336076138124792,10.515171444010175,11.455952579216806,18.13076977830835,28.62939645602652,27.59250105158206,19.78732948321818,28.85522670679808,14.252097239244321,19.684401059538136,18.63305449065026,21.534106012377208,28.16604006568442,17.949683725460268,28.28527428986896,21.34959002870755,25.08944575037329,28.56511652295804,14.782909923702071,11.242803796512773,16.26913425164438,10.199160413414248,18.828446159821052,19.351565989581495,26.16704497049681,15.970974197433598,28.897145166465204,28.440867258423516,16.182438273446994,10.186153915608793,17.76070112437635,28.936441428426207,26.98745653852001,18.79908827890862,19.423206750534554,21.233521122659873,13.602483461409198,28.44298518535103,22.610059910791552,11.027671802990259,20.14752447621436,11.303917518090763,26.528265075023867,21.724934667691365,28.09379955855229,25.4695688243974,22.48193440112907,29.2877585569881,14.719775644210014,20.971961310098656,17.159714257067982,12.849891701937754,14.371158771591489,17.933693845454076,19.15500196590747,16.236005487111626,20.19004098440416,27.02296182249335,10.065470779224626,25.05396867241272,16.339584472879114,18.035419601593734,26.007124945075148,22.698502486917604,15.289298203765558,17.578618490429434,12.23029777149848,28.51616932635272,12.836765141017512,25.457317432023455,22.441599874990352,18.783449317828076,27.140858671700133,13.150978874152358,27.592638169761074,23.681931465684567,13.276299740675341,14.262388795607945,10.135355141142615,13.430979158264948,26.374842202045002,19.79660097059742,23.338854281048377,26.388919149305657,21.844417972614107,12.686422821477251,14.369813049833024,27.25011235525959,14.340476149804537,28.675706087647463,14.23923439835518,21.784080061945538,23.701674192403228,12.450738116437549,17.718018656917195,26.599867478873847,28.546856973011877,24.813378218643308,11.073150846618312,16.47519394411566,23.341236722247956,24.415196381436214,18.954607108711397,16.029038516986795,21.817039869677846,18.96302090494259,24.05570861015534,21.608806592775743,22.430028679567165,21.60008066571628,23.961392705172535,11.713937236608354,16.76623593918302,13.118515966220654,23.50353648719295,27.853375774891894,29.556678294537516,11.234808706107554,26.373785518231653,13.485721805603955,18.379665794808147,23.879883904662297,19.91375334535857,25.458990514794905,16.85867811968081,26.02796790694462,10.012355560817978,25.843847488237582,13.63844430203445,20.398559200616173,18.724806387145225,27.085735597474397,26.80515254539894,15.895350939431037,26.683369056081972,23.023828937125867,20.69983442299836,15.747026356273196,28.11315618032149,28.404922894238098,22.69485267912139,18.034059390917196,23.62303394430957,22.70323674356401,12.217769817881955,25.60370180796029,11.06813916141304,20.924862006352768,29.79940974693912,25.88391626110593,21.37044202086478,20.98428299031,23.851500843745693,21.217200130698274,29.397441614133115,28.2253175407455,24.1304686875868,19.902435902617842,11.032065305849525,10.480713157282757,12.077581828978804,22.716732366899514,24.693626028796608,15.387958784934224,29.26745004161218,18.19489295058394,29.80773860969397,26.965975217212463,23.96920765458889,28.62291535157126,22.94897918660446,24.442419728950547,18.547240560669593,12.387931528906,23.95872754433295,23.261000082618327,17.09649004594402,20.55801845068914,16.077773604865193,11.387825374480634,13.906193905895595,27.728375532848133,21.4337246208312,10.542193973364483,17.68566481944348,15.577446855828203,23.091397804983945,19.71415045652606,14.621610996403316,14.04775905690277,27.01485977630934,26.74950176516312,16.532963413671524,11.902737151773813,20.148868127971248,18.958004239161813,23.7174750164937,18.75783907533843,18.038906719121563,22.480435249403836,18.710854321566337,19.756004073708446,18.843390893722223,29.584544319086202,16.782280411761626,28.04720347551056,10.6052215736573,23.72305313054348,28.14858525836953,13.337931783618124,15.869434095266811,22.67045039827947,14.299671801796174,23.917256060027768,10.160681290688473,27.779740331635104,13.293114912397105,19.197958300578037,27.65876918020421,23.043892121959708,15.889350975690029,16.54172174529259,15.506394055274084,17.39825865191005,14.321069928881208,24.798784382261083,16.751341677142122,15.239006260294738,13.720364985952656,17.753004870112093,13.18325622387302,13.223598178419596,26.45508754922549,10.854012855894846,25.548901098483494,10.195827403654128,19.17904858071477,10.895513467088014,20.074077881951172,22.418270238471006,18.655650556582867,27.203991376780976,17.29648448963863,22.917355888231228,15.744728217075284,20.498781763243695,29.488285054911813,26.896678653227006,27.882505136598695,26.516852886914247,20.91311644077223,15.413865604551313,20.805436217592618,10.667551842526532,15.660037577757763,18.76186843298134,16.17551330687182,20.588487276170117,29.978177818026847,22.8194372818312,15.449982899588278,26.472596287633145,12.798997553747974,25.331440401656074,20.29454400511808,28.009795390896283,26.376917479661678,29.62196778965599,22.0300886483574,15.005083202665865,10.506070892017213,10.17343022405882,13.81447592878919,21.075328804972088,29.363291100999742,14.645811379716003,18.574659555141345,20.505860733548765,12.843838783301402,20.55125208385089,17.79516858375708,10.979872529886832,16.711984490182704,12.55514147575973,29.28649105200587,20.47832890190196,21.92192867220782,15.2465398281185,20.773549264541188,11.878120751581406,23.463718606541008,20.79917873680457,10.048836134185763,24.545619409451398,11.100999359135098,18.822104092254914,20.476568625990765,24.35821541015458,17.408501333314366,21.222851326501946,19.679610841846134,11.23612683861249,13.673568145114881,16.518079150703223,20.555932603059198,23.626185107424288,22.133529656485415,15.596788439031632,25.454976754846538,20.01702198448519,23.588863767348514,12.359649502278884,27.720389129590956,17.0273494522851,18.018303650762533,16.266143541926205,19.12933916620739,22.49131650148206,22.75443641369606,16.407449984056555,27.575970142166078,27.859982567784233,28.803956515668702,20.925223983794833,28.50195899672588,10.130753125177346,21.56691135450126,17.69839442527907,24.7793787047372,24.586596011295725,25.543417134789294,13.59631284408688,14.007044058625997,23.877220645967924,26.66558253931999,21.283391916835615,10.946578310433228,21.586732761340247,14.022043359732926,24.082872916516642,21.006611563291855,29.35811459632898,16.715087364347134,19.203757004271786,17.83124404194691,29.84770079349255,28.992354887845927,22.70549885207606,20.244598244103425,11.827638737195985,21.13126760329676,20.85645241515676,18.73773845884665,16.72309804337653,19.328599459018232,24.569980665710247,27.134110495553564,24.516249913961346,20.417969997389083,28.578021845431103,21.381583876431772,20.670241484313262,17.050763041307,26.16022362481499,25.219572370631035,23.38637528485236,10.21449714691026,29.417633926883266,11.810586434717454,11.08968147250577,13.577360253296176,18.126930148418076,24.92789324577617,18.239796685875717,14.515533215252908,29.063992163150093,23.105252596248732,15.518158844507525,19.641442383349712,13.233406552859908,11.41591725642385,11.632017297598964,12.810040395653047,22.603204508189975,23.188721648693743,28.95809885442055,19.268177136373865,14.504676064058856,24.308480949703196,11.695842171271513,18.42160789458128,20.688123896476913,10.455374722784159,21.097423235336127,23.47516621710467,21.692638262696228,21.83453926175794,14.620542608547108,20.550889788944232,20.662501524073726,19.217014761373456,29.496687304005007,29.34071004339261,20.53496790868791,19.250551644910615,21.48251195209842,21.685512241768986,28.305435528138485,14.880014065798042,21.86520940863307,22.299865790997764,12.799180421712371,26.678927033631062,16.826986048453136,27.02231206329083,20.250633695794747,23.627195508203908,25.841236896242435,12.296742649739691,21.91066463836007,26.63477324952476,23.14424027525301,23.55429797775656,22.710440633102642,16.49518963999786,15.306286347154483,13.208164652061116,22.907699466419743,14.560712276342173,19.088008950770366,29.523915741857234,22.9152513106367,18.746219228758363,17.413020321678392,13.3059731113328,29.395728208153244,12.546200485295117,21.68698105670181,10.401069338797889,28.46346294300878,16.227645701116302,19.15742596284367,19.212449477710443,13.379350864510883,15.05398260816718,27.345799512827362,28.585905999784913,20.873695729190707,10.810574593558222,10.67472794151271,17.951871243521293,19.28132852751076,24.583827463023177,16.107740546575457,16.530627695340193,13.539759172502448,15.760229158653472,26.836870237593963,27.312229952566955,14.66029858832135,11.37618802863695,17.752642843189914,15.031688557195665,29.702270748503054,12.690539675954117,21.469409139700964,21.874274326095588,24.987353428933478,25.61306067135032,15.444954782271525,17.211731149515977,21.523123675472533,14.308857228602587,21.73577387989587,27.671462775561185,29.251510846973865,11.887234544775382,12.580377242345243,15.205521720491664,18.28799125481817,19.854134543569486,21.263481664798967,15.824332511123242,12.19392447679942,21.53627256328153,18.438044816696983,18.341533467672726,17.68173184612428,23.40666897750821,17.973417343706977,11.163359933088287,10.257417082590594,15.41358668553932,28.935530867618304,10.87079383665889,26.54573056336641,29.498933484406187,15.985471820800301,15.852177133138357,28.615170243339954,19.882246909773045,13.541645418503258,13.337421651554418,11.601073405273898,15.410282083593074,27.9822898994091,24.92709753100044,19.91719093742261,22.339677943991234,27.94342289082321,21.068475174105565,10.466420375725214,16.400348179675248,11.528467207221155,29.90898708542996,22.332148687955765,13.20890022437096,13.262624118327246,15.165294268613367,16.087045200536387,29.851483258101624,13.29603966094178,16.782147175640418,29.31469160295379,29.894515723179623,28.76943136603778,16.755065816923114,22.05176498047627,12.138276727135375,21.775077951817707,18.070895783103666,10.450561234024867,22.440215124231635,13.01835080603916,11.885640011902407,26.884422130990867,15.732053687906209,28.178548209195494,25.56585083035113,13.61775970431566,27.321514171489248,16.00275319109226,18.706819854634134,11.182774684751674,28.335617461849026,22.318917110179058,24.651223924694065,14.259651058500737,22.546588448438616,19.52978059657599,26.208607255083308,21.010995962781873,23.587934885243484,18.748676296169076,27.514270484650602,13.186356523677855,10.343479144970704,19.569583219432246,22.430880439364785,14.383177388256287,11.941710666777347,10.387817028781976,24.849258659244033,20.251816730841306,12.2163301132995,14.072750570784226,19.301183908527086,17.639312633001914,26.90415297724353,15.031575909607216,26.405764540312518,25.11163193045124,10.491363437624548,19.442057913720213,13.194452267174931,17.482031001180953,11.495798312228406,15.88648929539577,27.34120783949155,22.73575114140761,29.668303595438267,15.843028893040803,21.67679540337675,29.676071400555003,16.863520923980715,14.324437717430282,16.85004846452484,23.514780715248975,23.91906921860308,13.681016899517719,18.727540512183765,26.195335392446964,14.129660034887564,24.61038750562542,20.156978728235522,18.606878459769796,24.623055453996706,24.59607802576325,15.878579111401017,18.130294039874837,12.954036629938601,23.826694077196695,24.958161806978314,13.046010469246472,23.004749234296558,10.399045968531775,22.158209885033934,17.717616195324357,29.360375635163344,12.530127703904018,24.53192035975099,13.184380917816249,29.511761316519028,11.512946087652022,13.846667512514625,24.46022450408032,18.472804031575176,25.964234782541055,17.374621809236377,15.663833794835966,19.673443302661017,17.72316268358271,14.985444917137322,21.132764204394448,10.599984558905625,25.44937018939467,25.146508063482038,19.33092312946654,18.055085272178182,29.12336005396258,28.39062139751031,12.429251163663082,19.251720673291114,20.499206931647795,28.800841886802225,15.631863890830573,11.230567358291053,19.57884823736518,16.615321114514053,29.024533661603627,22.493207789876344,28.19564946058633,13.91009844824473,15.012279415180668,25.752981865333755,26.899561222108204,25.969205263208636,23.021436047343215,16.133417411888317,23.73851667788275,28.481607287557313,21.382469325348016,24.928825870558427,11.861682022515687,22.488789188583645,24.236384754659262,23.52662151751528,15.263484108700336,19.24970876679554,13.769829811893981,19.236249566870764,25.38055206940973,12.383534245671623,27.407843552945046,13.375867752778392,13.160533683046399,12.35872909209081,10.98970604949503,24.197893011627162,27.93401438101398,19.106186634841876,20.687392247873838,17.879795392489562,29.570282158770937,19.15802525889571,26.86330224467782,20.379422127368407,10.893293967260401,12.928127425202556,15.095863841863565,26.85383845589631,10.47244330615548,11.402044136188643,14.030448549512617,11.104331533617868,27.82145808149403,23.569360677558137,21.215634083283316,29.35368185697287,19.45389451817485,16.390643919038975,15.193413125617695,25.83497162795872,13.20279157832083,18.86993269913331,27.810846825774533,21.01420111398815,25.865402911653366,20.58656498991956,24.494221807482653,17.88042756248401,17.016877376341256,11.331650470531116,26.401015741920695,28.46786618697081,16.988380542127928,21.229408555281616,27.769952685513385,20.16263705781951,12.828923377389101,14.637030411417529,23.385643381361408,27.46721701781869,23.15343448604212,10.182422473777585,10.897528266110807,16.820386269296637,26.319847641845477,12.93089395643165,12.166678881655479,21.709563291878023,19.525619478563968,17.79907217215557,18.889935299814262,15.331122372749872,17.70826517713651,14.50606676822153,14.529284197172533,11.966109493399632,25.32109094514381,14.505561104853474,26.294666755845412,15.25125255397108,12.779191858190684,29.642869282156198,11.058380025887296,15.479027179136814,13.78805061268812,22.449751618602647,10.940190256542191,11.080816837280448,25.05683119302169,22.77468643038643,15.547265945923057,10.611999063228396,25.5747164164464,12.247587388892288,22.92407783231888,13.953915556086347,14.590620195086256,17.705281239112097,11.72128716550327,16.114170588635304,26.105637693936238,13.319474438245486,21.285624161956083,10.877259502059315,19.5463028310241,24.708567988087115,12.501228437908747,28.166902787984462,17.819924997821282,27.50053836168927,17.640990267236965,27.462241906226783,14.834563764796789,17.989343340725018,28.33033945888106,20.979224455146202,14.117527671173002,23.135729374280626,19.980016566863906,10.080858648226245,25.084054602312374,12.952735594157847,22.877162111798555,15.470982797093962,25.838520079365715,13.366922004397983,15.967039002294076,21.189034753722513,17.014573847770155,11.953060459292132,10.48120514866521,18.799105283295262,23.327884688044467,25.181826740649065,27.36620411563176,26.355209570876823,14.007724321643295,24.039391676071283,15.180554902955423,19.040921748149188,23.19429683097425,12.58398538901545,25.84656488676415,22.497689798187444,13.369693892320207,25.1018413578227,13.620659599152663,20.086508565959406,15.48563099895162,11.38138716461107,21.8637522788491,18.00502377251047,29.800850446777105,11.613707049234726,20.234068335736076,14.138914011259395,12.506073430600253,11.339879476407546,16.524370313438553,16.748892039450244,15.883303674296112,10.806177349418459,19.195318554144777,26.001498081318353,20.629740442419838,12.535940410164038,22.572819336690078,20.766740453931867,28.88845948304834,14.542463015282298,11.865000227606405,29.040807958472833,25.095792958521976,18.437475675050344,17.231709898871447,23.115960436907343,25.138344702518523,16.63393414925846,16.136385741563068,23.796653212786296,10.266523745372712,27.538183452530696,21.555980874591135,13.0537203542305,29.06313915578923,20.996978843173487,19.26692802353291,27.623829213649223,29.844092097936215,19.5982407984269,15.497352368242243,26.89222193582948,18.556241273982547,29.625769386188537,18.206467994991456,23.978917873593502,18.192112992043867,16.082818183569792,17.839349307181447,17.12192168419325,21.98599775213389,14.433624183001328,16.59427742796481,29.54464705260195,29.42923131226634,17.46166989777447,24.68545163196474,17.780963999943285]}
},{}],78:[function(require,module,exports){
module.exports={"expected":[-25.762235882575187,-10.052927753920308,-24.37603594158841,-14.172688164537032,-7.715678731762054,-25.670917754703527,-1.1388182641202391,-14.873873096396437,-20.669239188738537,-77.99417449518415,-8.9617922215647,-16.338873132972758,-44.6462780796856,-6.178330213777308,-14.988481374232634,-69.47345956702243,-55.632044284258654,-11.393138756886742,-14.954537716074668,-21.149483619466245,-10.380293522220988,-11.976389830129605,-3.391587649819929,-57.21666803947558,-0.22618036938140307,-16.11559998481968,-7.404838808490496,-6.914074550415659,-25.82663966005953,-27.513074898231036,-18.04255845053092,-2.683964845879835,-12.443120954889721,-17.42083126970787,-7.12970217720234,-17.889207530238938,-18.839285264477425,-21.22986386016865,-10.967389260738102,-55.73770200214892,-23.746696119576306,-20.564626452547817,-38.576701755134515,-9.958625111954564,-1.683150298956111,-25.756924965962654,-57.79250987477664,-21.2232108068473,-3.4724526420905484,-4.583017758013252,-14.382776849418011,-21.610977187445336,-17.81223402822029,-13.965756369363827,-1.649789469422199,-16.198355712856326,-1.3125246358463407,-8.712665003897115,-28.346609129485337,-9.390064589637255,-0.23417759150025574,-16.821114674930957,-17.527662915693536,-7.200247117275744,-11.828823631146136,-20.909693441901275,-28.424479867148086,-12.441232840699087,-7.824623873105914,-14.94931500872675,-6.515130521139529,-13.252964549390796,-27.846463916847725,-1.4653763836023792,-22.40848552865351,-7.298533850036222,-12.42667598737846,-11.898914409810583,-6.8825169799397194,-22.243619819177304,-3.013455753831483,-10.478761229662567,-49.290039334146584,-16.889831068769116,-0.49168886485142593,-0.370934935682115,-15.361111866960002,-8.378628118880933,-63.25645251033003,-38.4171951816591,-42.67829487464113,-20.15834251607192,-17.59925463815471,-18.870022042172195,-13.78150087695559,-2.5081271089148274,-8.429076817543214,-10.06431863923751,-17.459642170944953,-12.375220187321041,-13.937609960513036,-16.279756396316948,-15.80368512781245,-12.870098994509839,-15.348793327618958,-6.831924159631072,-10.609092604079644,-1.7246414419041614,-4.9695426602468125,-11.799162921855661,-8.553435976544172,-9.693548438196188,-36.72688211161599,-35.59123434313566,-42.49642546495106,-3.6850714812689773,0.42449810974362734,-11.789254294686216,-5.961901254430526,-25.958996485314078,-14.083586428333867,-6.040628620460392,-49.32906390041746,-12.861736139250368,-4.898759938135193,-7.948041925374891,-45.418420253796874,-9.194089047194861,-28.96067984492967,-1.0733971452369317,-21.14308713683673,-21.852675915314002,-45.98929547861593,-11.0407134090914,-21.721561867206972,-17.778895641830168,-8.882590708960354,-12.466020119738062,-19.482490976397383,-15.409517687843401,-18.641493120774317,-5.5781116699287026,-34.11723145223981,-16.235437029619554,-25.521182958092503,-11.337906305747993,-17.598848043966367,-36.21445783128787,-24.879595252916562,-8.275755928859283,-30.52885279234405,-3.201546283867099,-11.366382244966815,-13.46062733909784,-16.9877166290787,-34.25441212062363,-10.19025484131236,-7.024423101898076,-8.844246291995717,-64.64988045398496,-16.42019179441879,-17.195224716037988,-34.879438843561545,-1.3577177752991183,-8.685031943818668,-31.958790992753023,-26.17106876770861,-14.779242933745572,-14.116603209072984,-32.42319810818375,-4.829430065575572,-80.07314217278795,-76.68806297246641,-13.287152183214804,-28.188166050606252,-14.358102157573654,-27.063980016032268,-27.821797892877647,-24.066874968360125,-11.544975602340614,-3.540022424030923,-10.49780730193488,-46.76855488745948,-4.317474833582928,-11.938236963910278,-17.202726650338406,-20.34885722125366,-11.062705064966217,-12.789266913819112,-13.613376156531963,-22.40693289383082,-35.38343478616248,-6.060275321269003,-6.484533728962582,-16.93225714383673,-34.6426909828657,-36.47456597899183,-26.26704210601084,-17.448584489247338,-4.873178484379089,-28.692603932513858,-25.83402123108389,-6.230350202936467,-15.868919417155617,-33.11364692993504,-21.80365053585649,-24.022117772487142,-13.438810238637181,-12.289516058716064,-35.66319898459448,-1.7749850286238456,-26.774761734076762,-26.515699598857985,-26.034589947900376,-13.772106845305633,-25.110439177631594,-13.399340760134223,-21.690441892282166,-1.112027922512837,-9.421084131752856,0.49550256943380333,-25.647012537576607,-17.546404802622583,-17.390542521914846,-45.44979990633119,-4.4246226295244675,-0.9195725757608813,-11.193184385355506,-8.740966714667934,-48.39555116463005,-18.03954920350592,-23.193478129252803,-19.98246873893482,-21.434849358322857,-22.84728465092654,-17.609277937324258,-41.68696730693048,-11.906200957724245,-14.46020356372523,-47.36464687643316,-22.31278024171958,-7.420260462206972,-13.281135432301468,-2.74782725622062,-11.682739956286028,-12.432673984017338,-12.018266436961213,-24.92835746103558,-48.554104231438956,-16.98514294213632,-17.519878236798448,-29.486126529471907,-15.653892473432826,-1.9806642411819624,-18.114142414813706,-42.19513300597027,-19.080663761044356,-17.93933704617622,-25.33634724900061,-8.351821157894925,-14.654025639522551,-16.439933461124063,-11.458506219663235,-10.184848483117655,-39.44971229362255,-38.61378987998166,-13.971888257220861,-76.53838350894794,-19.56078603298767,-20.78710003651029,-1.5543957519250189,-8.315162601444548,-17.067923940420606,-13.538989268621002,-10.539941802876836,-4.308899909964698,-6.8522837467563065,-24.27834327869406,-8.708281322468832,-21.81228810746081,-112.31134451439812,-2.794313496125497,-52.578848801461454,-16.685792661726985,-19.505437333734086,-4.675233876889791,-58.14222696941096,-74.18355198678088,-19.171181361907188,-21.092175946749055,-29.441719096591306,-10.691817393863445,-1.3078851303520516,-5.8671744723848605,-7.770357803723378,-68.08806160228664,-45.56370081470334,-15.434593301502563,-6.214849313073351,-9.980764194332234,-22.87182464686697,-3.518826665596432,-2.973404813077959,-21.96379726522776,-3.849259289778523,-19.005013600411026,-8.361096158899741,-4.99318339540163,-20.030664840588305,-18.512002449131323,-29.819432493444445,-8.236158862721457,-56.21241287465916,-18.56897159101754,-42.72816795408937,-22.14233702054042,-26.177479808644,-5.260891061908627,-31.513230360288507,-21.01275663168419,-19.357600830806774,-9.32900351911579,-16.448477816970296,-14.495093240749224,-23.18145192433864,-15.475998867002932,-15.542963352038683,-0.7287858707817918,-26.77161248417184,-16.76004754954196,-12.741342644568448,-12.002772665504331,-9.422839499818927,-13.26925128888869,-3.4498400471823913,-16.405496896135503,-4.497229139076051,-32.641506910817014,-3.6311699657143492,-0.9502692682260729,-22.464562991621897,-25.37936013319369,-55.88877357851568,-17.694480079159106,-45.89775936321615,-14.928898664104572,-8.586489959340806,-10.178355163539276,-26.430083025819496,-26.24650159615662,-28.30977461223036,-13.537594471480624,-35.595084466121776,-20.31222055360041,-2.675304941774776,-21.571281175027416,-15.444928572353412,-7.350662233240872,-13.54427847348282,-29.14501728217688,-17.60515001535076,-1.5546418321418378,-29.310171117032834,-15.635043581827809,-6.7160890089217204,-10.787325310118781,-11.047580996641706,-15.290619844670715,-20.32185535951175,-1.8850666547101298,-23.02016447028473,-12.14125324339242,-25.81511326744387,-10.421097018702348,-2.8020657180535906,-13.95410542823889,-18.64313956319869,-20.512963801733513,-6.382940781694401,-26.67300416743566,-19.052056604222095,-22.79107065221931,0.6563226108327243,-51.51051204669465,-3.840049404359,-24.931410217765084,-29.51044275060346,-51.43180893872604,-1.2881177595502926,-12.782361756983693,-28.62136890083947,-11.589661501546512,-36.36668604175401,-9.555397513943179,-28.855995750210333,-22.375581521472334,-25.32257752146836,-42.959049533543435,-5.536590323987504,-6.171558095284048,-37.14942237768679,-14.426103477283302,-13.880228660492342,-54.03649960124561,-4.747158611871967,-7.347389460962752,-16.769424633187782,-24.38412931474398,-18.890763045702965,-9.420710499447686,-23.82128785349201,-14.281862752301144,-21.092928655166233,-36.779654966389444,-10.910397628606717,-134.1881394188863,-12.399346052462644,-0.053292231708489624,-14.193405512603057,-19.92440079790658,-15.207669833382084,-13.583967425734613,-3.0077597730156,-13.265817559823393,-14.217374667060554,-65.55128400698972,-6.37445523003111,-20.737829787566334,-4.267505721156847,-8.765716871803498,-17.361072324817037,-14.85628784693381,-14.900103866567079,-19.569361315087626,-16.11094147682125,-4.742545193772422,-14.215822977866573,-24.100638423756912,-16.78926047953494,-4.512457933318423,-56.813104689850405,-10.397188964603401,-17.095476758284946,-40.75901446463387,-15.799015082128186,-4.846343617524141,-24.964913085503447,-23.983973396196618,-13.020469212472694,1.264012453849153,-0.7893879237391381,-70.2311370045256,-18.30085809033031,-0.8471597788194103,-12.472308442449702,-6.172093176872334,-12.442727371732992,-16.51885333641401,-13.307350089314177,-16.70323568489191,-15.688354425504443,-11.627060077714486,-23.690039846830903,-10.159418503621612,-21.399277853727654,-50.26616371055351,-36.53795882150342,-13.506989599658084,-14.005079691838173,0.29484020974322434,-24.26740129258779,-6.989039082886627,-30.526448025457967,-9.237387043822164,-16.92795951865984,-40.904026718402875,-31.88267363525145,-27.024541864171578,-9.249005954555535,-18.150791825007737,-13.578155382163096,-8.27988849753251,-16.88031952309472,-14.951056238624773,-0.6080736752138804,-37.17598020630223,-27.135037613817726,-0.9706697475746253,-50.593295356890515,-8.843838974261551,-3.8205738255153463,-14.939984610140918,-3.4220445630323155,-3.9819584008207016,-23.954028087144604,-14.99354487727839,-1.060379924279804,-17.027708590574306,-15.419255370429582,-18.795593216140112,-0.08003694512632364,-24.554922294705214,-11.817155296687023,-7.291035549815909,-3.04869214863508,-24.202065685815537,-41.952578121788285,-12.814417785817213,-1.534034721450734,-10.544218517759937,0.2666144808054334,-17.23271812698763,-11.749012595317602,-7.665975678668474,-0.28182009264108654,-13.958631787654262,-29.22192199386094,-22.888965818371453,-52.3888521595731,-23.251146446120458,-37.00592904272787,-24.237709070981317,-10.33959955760264,-17.370087843603883,-24.084528112983357,-17.730019979246208,-14.231062092689061,-15.886284092698684,-41.55615014123825,-19.75121093375412,-13.351830768951828,-12.797895721223576,-32.7691774643021,-16.12605328366442,-0.06410862194729106,-10.674224783229597,-7.914507764785903,-8.624748735978393,-7.394561258000003,-28.746543534280914,-11.700830697843038,-8.802393762707688,-1.5135967147853222,-3.907155684381877,-34.310230529212916,-12.254386007982383,-12.485526403500806,-12.543053640561062,-26.822022341864475,-19.295564515794325,-16.64601850549745,-5.341891871685473,-28.047716976509722,-21.341901097299782,-10.5353587351023,-9.868070011417,-2.029015889472035,-24.243803879121437,-29.927369542249288,-25.656580963220264,-9.812492718598183,-22.740222286203757,-39.09736011965986,-0.7042300321107682,-24.862393552641826,-20.805567328653083,-0.5932308950587384,-10.704322212427066,-2.348211157956591,-6.830747087280905,-25.12395757914442,-18.39410650927183,-8.379015112472882,-19.80107282296234,-4.040605610198696,-13.666178135144818,-27.283734309476145,-44.02661445516239,-12.323517151331313,-3.610232577162673,-10.766070544758563,-63.242752972429386,-19.74097962422865,-17.64433764036547,-6.486015483136875,-6.871602611855987,-13.332617845413473,-39.44233687454194,-27.994812320415924,-36.7449935149553,-11.282776051097692,-13.204090368586602,-7.543020782917427,-8.751296887213918,-25.119018631612057,-4.453215797117348,-20.744009850529466,-41.964699765390364,-8.752249051777474,-2.4751920753745296,-39.08103481068467,-13.29654630306528,-8.756008316641353,-40.29087037322994,-12.039038110095333,-43.052169024206854,-22.98071119017048,-43.59071532558682,-21.114921671143044,-30.378261961634667,-56.04663546874383,-19.094311961677505,-13.235412592609833,-16.66168008824821,-6.418963132607587,-62.63393940193077,-9.578570124087031,-8.076567047256873,-30.52107765143314,-1.9188437077214164,-43.434079757703515,-11.409506457591412,-16.994661006826576,-15.00107261620932,-11.035039684190714,-18.88600898743345,-23.09043018148543,-20.264156046185885,-7.373612666862691,-45.77750755273605,-28.23094736830034,-18.61616463253643,-46.16326885437432,-10.466368591884013,-33.04242839760564,-30.592362925507317,-6.269004757729629,-22.657226507867996,-21.377616969960066,-7.618611534514848,-16.828474101800584,-10.792291676332098,-21.3365050748261,-13.61551067080452,-27.675675903315398,-26.531337530164777,-7.228447294980626,-8.382123532031159,-55.52257093321043,-6.533452386499771,-14.007463567264779,-8.27677950050672,-25.545129720278563,-10.734412124508317,-14.443158959183883,-5.490839910982146,-95.74642859141062,-7.581573425199419,-12.799119034637805,-5.879654106862024,-5.2045471707397795,-7.5185073413575765,-7.446657665915556,-8.484348960933609,-36.80278066777451,-18.538654703601928,-14.3074527131714,-4.143739597544155,-8.869351711116138,-59.984917950059106,-15.476476471953529,-11.27006608822041,-9.12878971281819,-11.665240400991696,-31.938603895287798,-63.46572644630561,-12.694658335469505,-16.491807292453558,-14.213602594618827,-30.858982809968857,-10.38555631226118,-34.46899991116644,-9.733527136861618,-13.073311431960626,-49.679381918497036,-7.488311330287619,-13.824171630752815,-6.143927846270792,-14.745907675558136,-24.40156000176291,-15.666224206305706,-24.406098216246257,-13.95813655923163,-16.43921568004199,-8.436666932873521,-10.780392190862386,-24.772704133261822,-56.152538378209265,-21.99660073949794,-30.083772561650036,-20.068184466019105,-27.58798816066907,-8.217856697194406,-28.551842207307455,-43.32756116547735,-22.094606195426977,-19.310043119466044,-33.68743274024244,-16.6565793512195,-12.358736219821417,-9.053152260720235,-4.238089335928088,-7.840772816872104,-21.821680109586012,-45.82832861657135,-17.877231605112424,-19.467641483377136,-17.68897658435251,-9.443877560966989,-56.591022926932155,-15.692007917594744,-24.089605929731928,-17.403693557774556,-12.70424281166267,-37.62301461622116,-13.240086216068743,-0.6595036236190097,-19.770164484200826,-97.40828759000104,-18.21722539884165,-10.65251929551821,-4.5331435469042205,-18.647510722636795,-10.336093687724997,-3.060933736083289,-25.281054299531384,-12.834663416882307,-23.376630229998494,-15.349133938060362,-19.744581441553624,-11.606222264780467,-0.6009342092704877,-20.168254845374943,-18.741499217300348,-6.056201751463199,-24.134115007028996,-10.087833310643049,-10.84863247878976,-0.1831764962737381,-6.029825994153235,-8.607446874262159,-38.3539697475174,-13.098675019915277,-11.881193848867511,-41.36836038282151,-4.768804782642491,-31.474597595419898,-4.118745589211288,-29.134992672348954,-37.316448803261096,-20.325119615909017,-14.663132558950075,-12.612091393263292,2.759488829456179,-3.25623764131894,-8.008664369916161,-15.876217675539174,-12.035107684254022,-19.170946741318474,-13.90489112897816,-12.19052781370349,-15.193950738725363,-20.855450494689247,-8.454054770783848,-12.703487661012257,-10.610937257909004,-10.434246981233295,-35.30620800425019,-57.8329103897468,-20.645348189581995,-26.191557765935748,-18.68399063421812,-12.219517215893454,-16.43285179411645,-28.23615630367634,-26.20099403769065,-9.827341614200765,-18.172289340567794,-9.523435239315884,-1.8473172705879364,-16.931208971252758,-13.405739446715778,-4.718267333517161,-23.067166051404136,-21.863793130383197,-13.16252885207438,-51.48043317328879,-8.320046737023919,-12.822380238838935,-8.06188172666232,-0.11363042885179908,-16.367331066914602,-27.580049083200862,-14.309933457161968,0.6222076141130515,-14.01667977264027,-42.36444816378553,-6.853410756359011,-21.723588432710635,-53.283335113679044,-32.24482489861404,-33.41847625511669,-23.21976467442273,-18.475509103625,-14.686413099391693,-21.82028033881323,-27.44860545831817,-2.892414642324617,-18.911712475033006,-34.60605924029285,-16.45847632497152,-57.10978468306648,-15.253271341639888,-21.799993323511483,-29.55228071976242,-11.323599246201656,-15.335338641168729,-26.96024243495134,-9.065756458100623,-13.122825960631221,-8.626330927944563,-45.39876885454416,-12.131628592888546,-22.529497666893057,-2.4177978338222275,-28.913587645012804,-10.247380578858568,-18.49353446446765,0.6009747477784693,-1.7740788831157062,-17.96553728671423,-12.368497134931317,-20.00217277182736,-21.13262197470995,-12.967530611613508,-22.808034868350227,-12.720214913731184,-14.709140722493707,-15.35735660074441,-22.252299402098842,-23.686277606596228,-20.93786169711526,-31.019405294464757,-14.509371605518716,-36.303090443945024,-9.754611412461664,-20.058751389701207,-48.883242810105784,-2.314725948062943,-17.724359183024596,-10.428169318851886,-29.37119960570086,-16.67836565768699,-8.784138005147913,-13.26107532647935,-21.80093108539537,-13.787563619112731,-16.438323447818256,-23.11513547719853,-17.856571326915933,-44.573637184235345,-10.242044062490152,-16.485711441614,-16.57754441525929,-17.87061230615977,-2.9400832253031837,-11.194296328790912,-14.829487258279045,-3.558706721930058,-24.778204815175148,-21.52803576622184,-11.235035682088725,-6.8081590217731005,-12.194657491339619,-14.252897673336356,-17.158379858051305,-73.07427014105669,-17.036038762057544,-21.037933988158784,-7.560905607431451,-13.238705354507903,-16.73772392591453,-31.86904658863816,-117.43716701185934,-9.925935265108746,-1.9316612595808778,-52.57667776851914,-21.404179547523054,-17.8047755303433,-3.063240881740409,-1.0401389414414481,-32.64261494205729,-12.959622199070381,-54.74119021396761,-5.790850945393828,-2.8386839967422333,-33.1625886671946,-20.508636600939266,-20.582872428988814,-26.092319122376708,-14.043925649811065,0.3058091520768791,-1.9548070482184485,-10.558330254824227,-3.4719999950534337,-70.52060442436314,-19.01642530209397,-49.073274358018715,-11.80152129471566,-16.389443463451038,-10.941736061762754,-8.518986017437186,-11.974477711305422,-9.38074721531283,-11.406875425574647,-7.1481484087967,-29.23366777080114,-7.694003259615052,-36.50511760526848,1.1207240872285382,-15.630593453337283,-3.219622797206185,-14.829255101935512,-27.440681648571815,-5.765511943189587,-19.766234027806508,-1.0079979355538669,-14.44010634977397,-59.15386866543015,-35.91378123291412,-8.548877576857503,-11.791321935129663,-26.7088175963561,-81.73217974440425,-13.188607218633962,-5.140090469054918,-16.069209770066088,-34.65903405136095,-12.461737978311312,-12.161938317155574,-5.366794835178354,-20.341987655843717,-15.355408006149442,-51.974225442849395,-29.531245975414407,-17.51904508982915,-33.615726697350034,-26.70766194847066,-16.216618235470563,-94.04215369548284,-20.33348059288483,-4.833201422622388,-28.217688382057016,-17.834275688036364,-12.369939032481192,-12.005630874850763,-18.664928350629864,-73.0108479531822,-25.206429376845655,-26.360788356341367,-1.4035583597835135,-12.726431489368316,-30.441622989071853,-28.900530619883376,-12.158437049832958,-7.309672257258541,-22.91235685922803,-23.762786943256117,-9.887815939339742,-11.831700470176806,-0.7647039464382246,-0.14644088458100413,-24.42055431822984,-11.887700229015344,-0.2859930143615941,-7.73193992826328,-23.82594973930075,-64.85544265711087,-18.518740070095205,-33.124774050148645,-38.768881483542984,-19.503019275445382,-1.0632049582317329,-34.99177466141828,-16.147363631657782,-31.94892303373072,-12.018550037303527,-5.777157511666751,-2.1068587900556768,-15.924982375768437],"alpha":[12.758479520168324,10.486790575666864,15.32000972097173,11.276568652814614,11.0752305630763,19.18063447870724,14.311452987042173,10.007559717094503,15.758707911836487,16.620190202962938,11.529443052995685,19.221103698523073,14.119708890499682,14.419433391353454,13.50098449764989,17.61834096008674,16.44590483159685,11.506184197332042,18.240154471775416,18.254518870856213,10.487400299025637,16.04559339157707,10.1228606875533,19.12318772382931,16.394947925337718,13.456014427214939,11.455459739267102,10.333474500382831,14.28192807252158,10.883615108500075,19.934246568949106,18.559467822206084,15.763031273573201,12.466135873369076,19.044058272251284,11.692813782316435,10.285930376895895,13.016017403766378,12.886518123445432,18.2554260655299,13.850396589699535,10.120811490415974,16.166441705957865,13.111067190948646,11.208848573741212,19.991335013496855,19.62828227813581,15.071484694035217,10.980527850885837,11.000941206073989,10.077741364118944,15.402700910097897,15.10936278865207,10.198140837555833,14.730714413783117,15.11439708879703,11.09493669229879,13.420337340586224,11.206394885072191,17.272191208189582,17.938700472328804,11.210622663718954,13.946059787863586,16.814823392371654,10.463258743153766,17.608456432421747,16.893546521169178,10.022171549067057,11.818668533935657,18.82452178519377,10.727041524344756,18.840089007889745,18.398936867845716,11.826347000204262,18.275823585441522,18.067565962434664,13.268850996877294,11.917876499428239,12.658138639320182,16.448990024967063,12.135449738342086,11.954104472834103,18.195017998319933,13.029555149908296,17.82144508909925,15.14728808971472,18.616007647116426,15.841652065675616,11.880999514049925,19.094673887610345,12.88959816199478,13.244719070274229,19.5799787423207,19.843446412041935,17.074946888061067,13.324546893476903,10.096634703221492,17.48347899650389,15.60045384193917,15.583987371667323,12.018798741985034,18.561429871788008,16.862118766423162,11.790155181784097,13.856686490514283,17.270351959972725,10.071961744680936,13.715283089247157,16.74198719676765,18.48015319554742,16.2225708076327,17.98534307208581,12.507086649110587,19.846066325053847,15.130877305702203,16.08492710928672,13.04465735820152,12.301890764186494,11.283489076535494,16.536453752790358,10.446114446739083,13.931842169024389,11.88959493375036,13.320460699677518,15.751288161248016,12.472484945948475,19.940586776731365,10.729608066544907,12.675060759355304,14.318989021109159,14.842774734934645,10.425235085430815,17.405862709191155,16.346408143734447,14.682287731905053,10.278671594344427,13.019953128042088,10.41435989491482,14.158829167566232,13.146608447070989,12.557012066174117,14.952412848864684,12.095771249791339,14.2996296036054,17.214298376266242,13.828374795888632,14.902421703045007,18.474300394925162,16.730618390436206,10.021354109742326,17.1063881511839,14.667704987327408,10.072696661734229,12.873573388674247,14.255308011483583,11.95487170557777,18.18703149828534,12.07665478396208,16.264032080404874,17.623313380248952,13.968049710643577,12.330550491946202,10.796177956867208,11.269932917835547,13.969762704656803,17.435909537225207,19.85884311003371,11.116246628384008,14.354363280436528,13.137542128255467,16.10601395417917,11.96584886904878,18.4290194382786,17.314074642342337,16.09578239154102,15.168390565244385,12.526621286122747,13.102777862200368,16.676495708385566,18.9438667008268,12.799419498938175,14.052284313315804,19.420561793239294,14.624322303115218,15.36304842918571,14.465318953787556,12.992083913341315,13.914822019589543,19.63075684267647,11.478532422128982,11.458014056826432,19.643453920127115,17.819422028835767,16.04823094102871,14.25606860695348,13.703532763056188,17.62001643441215,19.241428159598797,18.95357364951554,13.245310174233554,14.30108798732119,17.684642156337524,10.775913173325133,19.762398552294986,19.5768853029978,15.365217880770182,15.891439631876342,12.338250616476266,10.502660782779847,14.32832208854463,17.570640919694018,17.418662372594877,19.36594813482761,19.346027633147173,19.79069376672959,15.940657068351685,18.68143562640082,17.11653535358805,16.506295782246568,15.036640639178563,16.69337293748742,18.76309422818836,18.848994049059655,13.071697262974201,17.99776197871958,10.790358281020717,17.194044040837333,11.130412867432113,14.458042560576832,10.498300999912388,15.216796649369837,19.30894485278884,19.023012144786968,19.9896867619307,10.950311934083492,15.335335000323944,19.351176306412626,19.867905629792702,14.62976922658396,15.578547442120914,16.737385113919345,16.46637508778811,19.185538192581685,15.942048676803907,14.548943706195487,10.733851748534505,15.729985979905772,19.340463176971195,14.881102917387723,19.267490768799863,16.68534212515062,16.825853388970273,19.008401732176562,16.633252255141283,16.737417968698985,17.218523867502046,16.47800273870645,13.95252591174814,15.915264232400999,18.25247023374286,10.691302017055651,16.445845729258146,11.797657421073017,19.40932965673096,16.501638805725566,14.47380621865313,11.461867754334861,18.90873932163167,10.184591335819356,17.61946974288968,19.704840638365013,12.591748799221381,14.369987663452406,12.07599513026443,10.09458411762133,12.297146619884781,18.839674729783166,14.272367403090751,11.931411890571544,19.76959619672634,19.729104116337943,17.831720174700777,17.33124323717703,19.319401690121758,19.16718535794434,19.18843318317497,12.488611921389197,16.494818887653867,13.724577958373231,11.161302114745315,19.228418172492482,13.805593852051643,15.101982039761214,10.648593939139555,15.115570056983707,17.108867644730744,11.468587987488029,14.278104033792642,19.335884837886027,15.009989610239867,19.00207197824968,10.977251008323488,14.45793651238385,18.06767134466611,12.549845252923149,18.71983766020738,10.781803514436614,12.13278763495845,15.429580440335673,14.836739983598598,12.407078711429687,12.600282489230457,18.354576795585423,15.999858484495102,18.685884671148035,12.350640397675532,16.98190413459293,10.929171785455065,15.01374226908932,13.94446476861641,12.032930429339523,12.3170190450623,18.696828628053595,13.275011303796893,17.368326263139036,10.637138025353705,11.969952261755214,14.091322908158057,13.38880491934024,15.768194341360385,14.977803996013026,10.107393851788293,15.878966965413275,10.237587230542005,14.160771908559466,16.293178750641587,11.369163722890889,18.54612060320113,18.161334929931435,16.955598527734058,14.400462498775003,13.009604349821284,16.221564723025192,14.41711702776698,13.525009957744336,13.168922416807309,11.198778459726801,16.800157127431536,12.925010745710185,16.979716029462086,18.57571357782016,13.45385670261045,17.0671259169262,19.80844546893152,19.92427304960732,19.159807111861465,12.10118733391714,10.389361671031136,10.566525903432067,12.7505816960458,18.15585825429082,11.466364391639312,18.767927582388797,15.529089199829444,15.39088224185761,13.707210230611334,17.568111088710907,17.73764948098246,14.63605670788464,18.678273636700876,19.034486631472223,13.781350839175982,10.367912945222466,14.032990497471857,10.319688810450746,17.432647853134764,11.726635953599622,12.490734719988774,10.035377339751392,16.194421666053174,14.713167992675713,15.878559728901623,14.902174066154824,19.309197777203224,15.172179242111874,15.072050757000541,10.494108846276484,15.148750322882531,17.26369075657935,12.22267966896391,11.427298759130762,10.934411225148,16.238482485608877,13.117152077627857,19.806016362837653,17.658663972094537,13.580230793942654,15.414563529742065,13.42984228445034,17.123300212516575,17.27892089591292,11.459435132369105,19.86739002633381,15.089466806086158,10.971764310436765,11.968596850536034,18.674799978802728,19.923720937021706,11.968293352343016,13.020779871001945,16.435682595256225,18.51865468050868,16.97586417929844,13.504680712018517,10.25455913036904,17.407973853303435,10.337031322544254,11.386984947343027,12.672328323574115,14.613768337984435,13.56260515577789,17.763066302659137,19.801561881681284,12.406345118111306,13.798776705090201,16.14227761381884,19.748660910610724,17.740277705797524,15.759061576671305,13.187674451424797,16.280532253219683,15.126337464992208,13.950724750851089,15.08798492981608,11.83427927039922,19.46547287422634,11.62586075142394,17.27438919293896,16.10833717859238,10.070032485538224,15.49525117065479,17.94723852260025,14.299540091070481,10.420529803633446,14.541611148116111,10.007443228619424,19.680653322515877,16.613827741193575,17.17044537473975,13.061563121119129,11.377298614697253,19.813909638862107,17.713832796963082,13.563395208564653,11.577055114166248,14.30565990657265,10.634887308738483,11.951544728877817,18.27520780723516,12.639184429054888,13.600234270642332,10.124815625507608,13.30059926126384,10.366190488107998,15.646817051222557,19.191285950347265,14.731785754425106,14.60061878387322,11.520303695165808,16.570395551203447,16.81544335051764,15.5060760882066,12.40575604379167,12.085811357654459,14.008495043811847,11.871798391551017,13.50458843678304,19.222975974420645,19.066517430741243,11.742700045651034,17.892729981113668,16.787653380671607,16.008903302779945,13.095934021021453,18.3689978316909,19.413441851382366,16.832336857177904,11.220298850527389,19.920088691433477,11.096640636574591,18.370063185451855,19.46335324690384,18.8123223373816,18.380313842899895,16.90910232379973,15.946477836353177,12.682090338781496,15.550379201588902,19.3046775048047,13.042224763004224,12.301658042063245,19.628341764230683,10.854994194467277,12.762994737691235,10.621055412238212,15.991055211266573,12.406453320527,16.728371237386988,16.184104243454847,10.007949035451094,11.170465219106852,10.198934884606386,16.45379143015445,16.336156327951485,10.026930562692877,19.290701654697003,13.55723431108836,19.449495070891125,18.129519306147493,15.73021602362733,17.249995780657073,15.889180332736005,14.721495845571333,15.143985761483606,14.898918562535197,15.413555460481874,11.483522700695426,11.973621752089148,19.606756505454726,16.417653554025435,12.916032498760174,17.38334082993409,11.621256706926248,11.367077238634533,15.447495754094247,14.707063675322594,13.67474566385557,11.890872891885508,15.592317030921254,19.331555744687588,17.75972507737798,10.186322781143408,10.03349761820834,10.756278586495554,11.990439659948107,12.479721672635243,15.405201842751984,10.193497676919101,18.205818909176354,15.510588899304672,14.386198694725774,11.151331137699485,16.65134434532763,17.351987007282382,15.37602971609842,12.219092345094715,15.654635996695498,13.779512409456558,10.522178224073153,18.58834718852173,12.666714944529007,10.980716383397027,12.5698128148176,18.745696085926724,15.736505403174451,17.76362550115129,11.190870379724407,15.142797736109996,18.45723850871721,15.898574156910763,13.15189009146724,19.293443412317302,10.235484652364429,13.307172734022597,18.254355295851273,13.965670231472744,18.93903014338432,16.620069727766005,14.147293740036584,11.48290358607074,10.544590945303042,18.058533414758937,17.474296496567035,15.4795416614039,18.978667986128137,13.08447548014513,13.524587596976396,16.48387913399232,12.293561311019921,19.890691076230148,14.306260681934845,12.25006940243649,10.160906425199595,10.967837545964159,19.440004120432057,12.606977487265008,18.45401281344092,17.75445691234453,17.83151128391019,10.02604328032416,19.56119140372838,11.1055885159354,10.020920194350376,16.677825604092916,15.326890376238957,18.67181677640813,13.249852183881202,11.505698558013464,11.929497352975142,12.30622153621821,11.035865421190598,19.56274114639907,11.157144988734498,12.875873770661704,10.515739159117263,15.659033160834355,11.985576468632171,11.0444752639158,15.25592578102952,11.242768592381015,12.035545712206766,10.759383068651768,17.363430326408565,19.969370468697214,12.309611976823525,15.690203255563894,19.18347448548664,14.645440608155846,13.997780721762316,16.5052405653322,19.139806893181653,17.950023441267312,14.358601262059256,13.968825174661184,13.655117211666141,17.161337839102483,11.683172813915817,11.497573215876516,12.512828025913068,13.881879569185037,14.41938307368692,12.154371098487859,18.27674258983773,10.046265539228852,19.403269471351713,15.152372570873517,18.29747612988577,12.395675606464795,14.413744337229081,10.299180240412767,14.151500255292328,11.395460232079373,14.797129216079012,10.901011633070759,15.565697619037657,14.190639272485532,17.600456904131004,13.106715888734685,17.841242937023676,11.031631418848725,16.963323971263357,10.247098874079706,12.551182808877657,18.561183100864422,11.231316844499384,15.186636441356287,13.397080563012276,17.859904066047715,12.222925739911028,14.91588456919764,11.688791254168185,17.670424428316696,13.219192889330902,12.377050634035287,13.761131872527042,17.98910161507996,10.539503484698173,18.76197787130703,12.391762000951683,12.342961007688976,11.740984213159848,16.31593031044227,10.201893068736874,18.450543292353416,12.087569205354411,13.707716460220675,18.998495063810186,13.554182601296308,10.719036088867359,10.999508890599056,18.585187325088793,17.757930400548997,10.665021706198612,16.333399810478483,17.473567547551898,15.689223342642277,12.944712681357464,11.335757887895074,14.339608310735713,12.378189382435103,16.399733233269945,10.750429198496377,15.852605159499817,16.98091585634564,11.497983826664644,12.986907286708476,16.249081588020722,16.157691760967488,13.604861534861248,16.12911828170448,10.99426520604185,11.300584851183393,13.375567768996303,13.80936262971137,15.178743451566465,14.154404971294785,19.42709636946615,17.316059725105468,15.458902533343908,16.694345554213633,13.052284766507793,14.851064227030456,11.127968643824136,19.604920452523046,12.69026943065511,11.502531275723006,19.979038995221323,17.07852459117992,13.80620091527457,10.69718989714701,15.797716239678039,18.007649729783353,18.26186572795228,18.423613401608186,14.785112620893512,18.110906346618947,17.413200241164006,11.695832050912603,12.054040209720272,11.965829635428985,13.451893182097477,13.654315527908086,14.89622416352624,12.810095887859399,17.20246379492535,18.811228151715312,15.786294481829232,14.915871281036488,12.664741469750906,17.257242704320017,11.009214244442553,15.143250699014082,15.401924922978685,14.738324271590571,19.379769404929768,10.963127609337722,16.186177537932153,12.768415125666836,15.208770429374942,19.950273245029138,18.717416261908586,13.51352627969634,11.586490652412964,13.994443275286262,12.856399044972289,18.537697440376835,17.232232505391355,16.76369093540647,18.58578391351717,11.432470086562978,17.418180224367152,15.161509444041666,13.605379470089694,14.649309034963405,10.014530425148909,10.073482169804848,10.69333699520425,19.906157069788144,18.284086176150616,19.232380721615677,15.224853013690858,15.118369406198633,17.542418581378335,13.730012388745598,13.793931864510323,11.709523231414762,14.637466093945084,16.60632455606835,10.248221226333856,15.462913538703857,11.942916747125418,12.417837326183253,16.446503313087675,17.78459444595346,19.440770794933815,15.274702394344812,15.297236463474475,10.537446696890715,10.407285108627493,10.428786250659064,16.01605403529412,18.880742444753658,18.329404785964293,16.617919518733103,19.023545808334287,11.116104339239302,17.83559975673607,11.758062222368629,12.712662029194293,12.356958169692602,17.538796840941615,15.654941100693133,11.20129429916988,19.314801511170952,12.432143976850458,15.197846676008727,10.548184320958798,10.37012206510843,15.7131939847106,19.869401142616667,18.706123839269225,18.545147804851005,14.75914950914407,16.51264599143569,18.64579824328263,15.672473591961165,19.948548096350567,15.090298262627718,18.179170263271857,10.61722181957319,15.892817429647298,10.580242827369492,13.870566858577702,15.8390319583203,11.428025237393562,19.333046722248948,11.881042670930828,10.192250444524154,12.432309967486193,16.172499463798772,15.245193875771486,19.994298743746,18.647341007600183,19.371904824640723,13.823731131109868,18.68265377295227,11.492476606599954,15.985142150859255,15.593209015588796,19.77680541483293,19.36545460791429,13.244090831380085,13.067460270800975,11.90024340996689,19.676139950962405,11.150700284570611,11.642725360945345,13.000989148985484,18.783415496196458,16.577274262912216,17.761181086732343,19.543200280530655,16.687392804683697,13.320261937919529,18.76645932537568,18.466862818398393,15.687800139057336,10.048552110470922,18.47229719832015,18.98202168535601,10.516097206037605,11.095995229572226,19.010732363682287,19.883074231339283,15.944888294883398,18.986770558954067,10.646568918551724,14.465254155130454,11.903123117129713,17.479154936152852,18.453085708773145,13.053024323354649,13.594863873486698,18.988664934263657,14.93987682096403,17.97225755871779,18.337709802967638,15.496645431783275,17.419560467618147,14.418113959795072,14.205201432078727,13.148843248839007,17.95958118230534,17.834085846644,10.078508176983066,15.861517633363837,13.105641895935019,13.198640869909305,14.076359181902982,10.653419501846674,13.217532644460082,15.656991463713176,19.07380213225893,13.770758321052947,10.81138922687592,16.150769477878047,19.671301654279937,11.633025224402925,11.161433121854305,18.588419505045216,15.862492020473809,12.789977618525171,17.579136245445035,13.583466685682488,13.114762996815923,19.562210507506208,15.541191221443151,14.836664062860535,12.875139594985143,18.575431794802025,17.56428359554718,11.19987089347272,10.801524359371866,13.17203460285466,13.221258223906204,19.061349480243997,19.075758075063973,16.28252349577066,18.993411629404058,15.746674856222269,19.652173471447796,14.691992290375048,12.732524106622805,19.67990456001654,19.791334334844244,14.399541050243505,10.44977060390442,12.993303483737717,15.992422902082765,14.667894880468264,12.913331845540181,10.398514658120146,19.904405629050917,15.139602820217648,14.491263970786614,14.749569984493432,15.063340202910762,16.305745126219275,17.57165651694596,17.722291694127335,17.39167428164539,14.90212675291658,13.926942637120039,18.770134749706955,11.633410811293462,16.69990795638929,15.036117203815081,14.560937794924548,19.284508046899326,15.96514871593949,16.353091122704342,16.401320531518913,13.291263677808164,14.1412111959605,10.538392085891623,14.620659760276753,19.73847905384389,18.587489442751377,18.813050570178373,14.28797612732133,14.365830758993853,12.89378350678823,17.878587169089634,19.2089380472256,16.73121987488618,10.223441706495805,12.19998340609803,15.072772895766459,11.866464694639811,13.662854546954541,16.891860518636634,15.384128976384776,19.033179455593903,15.971081704093004,17.35901173406546,13.76131763651111,15.488875055801683,16.32255030556739,19.19835349284135,14.802667669284881,19.53645690834286,12.945632882135556,13.587258934694662,17.34615119176771,13.271279669755558,16.548816920202956,17.721215416447148,19.781432896452422,14.725167645776562,19.371402504767147],"x":[17.82380678713509,11.464496664358471,20.24986670409806,15.028017059192791,16.147564269335664,16.14205858652434,10.669882364889489,23.717273395998898,27.494804449160597,11.608884995333032,18.54495466934652,15.083787722163489,8.520600538940233,15.231309269815794,16.66450477043167,15.416809417107316,18.27771836807726,25.052864469033054,19.290252717777356,23.27623939770131,6.8321060045793125,19.25268363629638,7.9855428181814325,20.302669220591,8.640900229449269,23.964755839495787,17.88648441741689,9.827233670633799,21.598703006193908,17.490860469862422,21.773778448527928,7.859455786729619,6.497607618634942,23.062641360220795,4.011728482634613,6.367846073125591,17.855269725240028,9.516356914141195,18.969650124350004,19.061414231758818,24.242220368025404,18.456686313651968,5.6310428354839415,15.668519082078305,5.5964285433104095,18.129924737670514,3.6650849181518796,24.73216378794077,10.559844686262338,11.172321951248028,24.102515779039702,21.901456097427598,22.752100849359174,27.72251417986493,3.9911225261312033,24.636927693536414,5.820599998407456,10.966429304126146,20.598826928746593,14.938658414911352,5.719530449542103,25.301922896492968,26.693551662695427,5.050701346645495,22.011337095618593,17.994679458714444,9.193074578618482,23.15120028912989,12.22316644725009,19.42520346093249,6.438639482995409,17.3178655624298,10.127521314026913,7.818285236944047,16.02433699811931,12.153487890455686,23.02225574202898,4.192066817195624,13.845947486762926,14.842860605999027,9.247210998332978,17.458045002955068,20.828790335297736,27.341959183632458,10.468286350585124,7.381971636001666,21.155627325561973,12.296693381602681,8.570247921032053,22.497834117781164,16.37793882112265,8.988655523848388,16.77903763992435,23.039031800522185,19.614978386618134,7.144051059539882,6.4672218126215615,6.273477489214317,16.53212783266803,13.085191380976553,7.974544314463001,13.185335907479832,16.635708629079282,17.440685775429532,4.970423345180777,12.580531301964875,6.931765519760522,11.204260216611864,7.1384884818753065,12.73787376393945,15.983452447168144,6.3581061917182335,5.70451300596063,19.01978748275645,14.75061469965518,12.034412362295798,8.530853902411025,22.232166580398463,14.532377039112477,19.8987636671215,14.838568692740955,12.504244547357349,16.040260611596956,15.459112006629415,11.361190940308287,13.78547925261361,16.620180641692674,21.74668696343259,20.428180384695096,4.693325540119216,20.941045014721183,13.142268562645313,6.546551948482692,6.29587339967808,11.69000526680464,19.006538318637638,17.392668436354313,18.31880842963419,7.2708089401079885,24.421921342643248,15.713301730736605,12.79819889524505,14.090452309407627,25.03391793490386,17.344373863364922,12.325122284206053,4.897692333209427,10.18142716529812,15.584197471553013,11.536800402567078,16.49101269607292,5.946184771223877,19.58994191310227,18.095032549737635,19.91505503113215,13.419338747527885,11.146816546353271,10.891705215301515,6.343676562842955,5.770180798343123,14.850926987980012,19.282701918590895,11.629204504766212,3.823875058536863,5.725633965024793,18.789966711970475,20.710892262439273,25.578028231681188,13.068771713085034,15.443309818754418,11.746672349032993,4.816635863481549,6.324324854765817,6.652529079152725,17.049373698174822,24.6615887981022,15.521457017857639,21.337086635894373,9.400996519472756,16.58550587205169,8.778865860723954,9.843850830147884,8.020347275835935,7.038366078572547,18.022192760771347,19.67179230568271,20.721247261032246,6.958707660187273,12.53789677843164,27.258870205129448,19.75111660984731,21.549495510513196,9.447692919835951,4.021759958425488,29.056947668353075,11.11217699379081,22.697924848070194,4.3147976994758785,22.062120112810923,12.632489577786647,22.46409704921539,14.338922554718232,13.847357766673147,7.782232375031459,22.595810311838484,7.36840198947654,16.7623646959693,22.892070030135184,19.461146869167678,10.811931581964426,6.65786090090729,14.808452567874053,22.67445037061484,8.239267188701454,9.011677865106043,16.329252099080666,16.26166769950427,23.23680558751829,6.648812025960942,18.07114919878357,6.776646147641849,19.219424634778065,18.585577066204614,18.501366157696257,19.229656258715732,10.885200452844295,9.32296447595666,3.6603596888414835,16.92914462201598,16.231651890598883,29.336612212742825,15.90792539093822,26.377084398803845,14.51573240028868,12.828417569027845,17.770813300557037,11.885599379738027,15.945986849260816,21.542822107400355,18.59191167524288,26.95488787781342,7.782596779772885,16.16410966654186,1.4824136478801142,20.094789836375764,18.28083749581783,17.549635626437798,21.52791190263944,19.22646145733245,11.36035074091,25.02437727505716,20.215850319417704,17.676206223763227,7.547271534907836,22.07348748881708,15.79146331620237,29.20741108042447,27.87515683069582,12.372482773927286,9.051660504209188,26.28641107722536,22.761472663800024,18.51025709090502,12.33903249362092,10.774679963120517,17.001987988380197,6.010827207555851,18.196199399700177,10.917470678256784,28.616516802242565,1.0437238526207637,2.047281363269522,28.098308590158776,21.871299984376012,18.347888527673973,13.546243103773708,13.345185670723227,13.575961907409685,9.509070409741947,13.795650917173255,13.49308362020603,11.901887466810852,11.642760569521833,17.883278825287174,15.347617045701904,8.037414258154843,5.242061251644905,13.999823062340608,19.541185947966376,16.107248633884772,5.1957323455793425,5.454499536514266,6.039411490014033,6.582754299438798,7.9120300115745135,9.382357003835299,18.590464013175687,12.80225978590822,9.493652064260068,12.326637791346744,13.541348657344017,5.447621836118001,6.258373253365577,23.798744104869254,10.37738967162354,16.087646604473598,16.454358594304463,12.233372440775685,17.486396435682554,16.428447711793854,19.25239560525628,14.244629826263386,18.92051783460586,19.33092661957975,17.591176637577362,14.423493908804463,3.9111521313376385,15.514366844788736,20.482169471455876,17.3879869919247,19.598940649230723,10.431166377950587,19.841436961045375,25.717365382201184,11.813299910581534,15.536277277156891,20.617967614562787,8.990526687241118,12.533793881691867,26.122376743370644,19.94181574393088,15.081080726508763,9.506045445112218,24.966751558303066,8.203513928141394,21.727261382179336,11.891590885436578,16.455235122855292,8.961014458918058,7.552307913968261,23.240809854671696,9.42162562982687,14.018281392292822,27.860259590437117,19.621150470133163,21.670158425826216,10.647670427079834,6.622283354381187,16.57326918838613,17.34914827754971,20.88053202409472,25.379365875018422,4.128391673581793,17.069884144248185,9.129700729468142,27.72057972405817,21.59559665393632,9.7103785136994,26.671872900296826,15.74753710916979,19.5977166060443,0.8435798748255352,21.38888825973668,24.559921572725926,13.801952949616577,8.839879035061779,12.957666697691096,6.112402355739652,22.059213074323647,10.5742561524976,2.625217993618476,13.019282141546132,16.560797976529578,18.666062154870275,4.019507911773923,21.08923770519076,16.269614514600924,19.260085204781838,7.753153380489229,23.354777115036363,25.63519839857628,21.095107135157903,7.695445280232345,6.620996578029437,9.833334378699725,18.889743787282207,12.31022356829513,18.162961293219983,5.876758780860172,19.692619540383795,21.277269786734948,4.540856375659066,10.156245627051003,2.2272915534911952,15.3132926041974,4.815665028853562,2.4778708836213736,21.31191745793823,14.857366692048188,10.342653136385733,21.524585656924973,28.185897141034662,10.750617908065633,12.91027124358348,12.076013934747984,5.610656267141858,22.289786968594015,16.915587937559582,22.19396141313723,15.673880999140575,8.525060630019484,19.39925880639116,25.157891660921912,11.23114624987649,14.761676359156343,5.491053094270684,20.069722080837483,7.774530799067776,21.922307502874837,27.08822177034983,21.874819053723556,11.37450302955655,7.950127918940459,7.100861409241006,24.55703694717811,16.16152682631011,7.380581245851259,10.3432026057869,1.4733962326251038,15.469766099955256,14.070226467989636,18.47292351152388,26.644430612380315,25.451033359987225,9.07506773233976,12.311804263785387,20.448403838038246,24.518670499949202,17.77102968369325,11.941682300076685,18.370975042322222,7.586146372055991,12.141232802846616,14.748062017277693,26.856678538150554,7.2989635229556376,26.233760013375665,10.434361762776053,10.566258635590696,2.8017627539321355,10.188724335906592,13.893292992924632,25.37710580252628,6.954373901190804,16.709881646264606,0.3496598536292028,17.407099694484906,12.36063977414466,15.46360026308616,11.75079169798883,25.66579633833132,3.3833073062004715,12.08430035593808,15.503948164247586,11.869111035841454,5.516041863198899,15.226998981652047,22.050223719386835,25.558773354019834,4.440279929224801,5.367800181411441,11.666623208836015,16.365710690295373,7.350813561917711,10.179709665602745,6.150337410196498,13.558012207519724,13.351430474105815,14.45065666870294,20.58980818777045,14.014618252607873,16.011451468429286,13.496140287103426,26.173989103609735,8.848786951780589,21.44876650256524,9.652203748614617,8.421819310019048,10.903392237958828,17.24690041055724,10.4823860409102,20.556743462411166,10.973644740912658,8.374074918618318,8.73286947844491,5.825149513037848,3.3516238349874405,27.18713162075708,18.73301552205121,19.298684301563366,9.204834118734318,17.845699242794183,13.41789647172299,15.221976708406903,11.333921949958988,19.93993545897513,18.702498950326426,0.5494360952623722,5.685265293673473,10.155038465346939,5.689190194040751,18.79529618926406,16.092835191524575,12.297470845338111,1.4244661436313089,19.89830882835629,15.16057200364364,16.09920568251266,20.5240785683781,18.440047238567338,20.906599272874068,19.022331177938046,15.861132363230224,14.428680881945597,24.143444181517566,27.07082101345857,25.046737890363396,10.318365023909578,6.748043427960731,15.179175017505877,24.124399864056215,2.3590027738676556,21.159617829249935,7.766431322263189,7.378414318220758,16.645985959030142,15.781642402793295,15.099474665194741,15.166508020815806,19.537584210612394,7.834308289471206,9.27352399656215,8.513145245927333,12.38828067750109,20.449025844426107,23.160498573754243,15.374571470570526,25.76752295828217,10.492839004274447,26.542066047748214,4.444745501168052,12.59398868538538,19.231708279781795,24.338405570927883,16.918348760353172,16.95012836772688,11.463651185561108,7.7303631294117015,19.110381719585867,13.42038440754286,13.123499580582621,21.785161127484763,11.507149250189642,4.284728523005008,16.636034446778122,22.702647171335247,7.4897832440167456,15.13684926052325,11.61767313653872,12.849297487484382,21.633898557764383,25.29940553496543,16.540814657715387,6.260832829845535,12.58126006583048,17.155716497784287,20.653184176749733,7.055743798296239,17.910522290357306,12.877875968139355,21.452556536180932,3.7595214323536608,19.35952021501039,29.769398480044742,11.18442898424769,13.38088055946592,15.253665282946669,11.710803210908105,20.169062200061198,18.787180001088963,20.629002419284753,19.758397052219607,15.164063802468036,14.204774646869872,20.685458141402588,8.125784249799217,21.549910646386273,19.074621568777737,1.4235028768426772,3.7525004215254443,21.580296139586313,25.733228900451195,16.71636128741854,16.281147267192395,20.61390457801374,16.76860744423062,15.90697588028218,17.983263184137193,18.686096767787365,8.378792808883194,9.944357240900043,23.79993525246386,28.0661900699458,10.06803361927429,16.810051424158743,12.725309182166004,5.869371584080449,10.629060524443457,21.55931088222012,1.854177304398359,17.754809129172497,15.852204241637484,19.829840336647514,16.963931589824135,23.12761485622569,26.51476249792286,16.254124383576254,19.900140837288323,12.620634542583922,15.041749702460105,14.468062715048717,21.713976372100063,9.571010909721117,12.734811447030701,16.02725096532606,15.863642724374184,14.08582838005388,21.32161618583761,22.820126410654876,15.302172726038691,21.839650484125368,11.866083882179122,10.742251691545572,9.788045764123613,5.9597351037156105,6.385279948369633,12.180761158397509,12.45993954919022,16.55764595531063,13.037622675876378,19.922060385127928,16.474572910395665,10.54946649531129,23.458865405881003,24.122785235489204,12.645332291353707,11.308615442780315,5.549257588329272,11.027366129773311,11.04032903745177,10.736745161737558,19.53949651117877,7.829572252984336,15.555342257660978,12.840227861771782,28.71876628723391,19.12344595429705,7.337001223787967,15.714401355507732,19.294444172685083,27.17026840640745,8.779926532610368,8.236046050102843,18.22829890599598,19.92399349413263,12.339960188772995,27.31031318539501,17.41267533231052,22.123378035714296,20.728964042720637,22.024541367314583,13.823034303748033,21.39103284566135,19.2872120437444,5.108306361798903,14.457057066592654,6.317814754340702,14.683703350921888,4.343954096970181,13.278437847027453,19.1133723017075,22.71688008387318,15.514253357920976,25.494032338788607,15.841635630619848,18.014643692012093,19.161608554883017,18.199119538310494,8.228380118964571,20.116010486902486,24.25515245163545,18.764789866919525,7.813695174665973,19.022299233475337,12.082983656063197,22.15777559139055,26.148947617411764,15.072780032857802,15.610101590239914,9.547932411849038,12.961101520846318,6.754814916231515,15.7228890498095,13.271157429069868,14.040836503220453,25.45541501565116,24.93296278958929,24.616043093379325,9.698688526675411,17.600500377427807,12.448419679665506,23.253691721944488,15.497477614705346,2.5049449767000187,14.146692399311673,21.98972738051733,8.13190861463833,21.753754735643504,16.4619236858344,24.753702864399123,17.291092632967647,6.8712964112650665,19.156875257820715,17.320186752057907,3.2208740139708136,18.56030318559047,17.706410048498228,9.712628966193769,16.845165000617072,17.490655765429807,17.1985992237259,4.754757121195132,20.76214419484187,24.113674793740284,11.59028306199556,5.229599710236945,14.371795793355444,13.096737814473249,4.452726291107867,14.108252760211641,17.436205643515027,21.28854493876732,18.226670511085565,15.640460604168641,22.337695139073322,14.423223810492257,20.891368590155217,4.088997120765157,22.394209525409877,16.41713715220701,24.61182677266153,13.346697227753012,22.618259381493917,0.8006579370828004,7.7339177165251405,11.81821726332712,18.220739531790677,12.89886624556193,16.798429918146567,21.94484487580356,19.81839021735189,5.358102641277225,13.429163798705586,14.550835566222984,27.78349419495916,19.386809042376427,1.2360832894012708,17.247982914269105,14.565569337217962,20.36888430119763,12.270389910714801,8.597818719390853,19.879893060329874,11.881386869186258,11.844349040056542,18.56045903439135,13.772052661832959,27.931124693431528,20.84196773468161,9.67851693907242,15.53591857265383,26.67640351283937,11.514408517572752,19.739848881963596,8.135529041356723,20.690771653584015,7.370689577399583,16.90419163749823,28.43068446531836,6.628936626381547,4.515319856222296,21.77272460955144,22.360351310392474,18.755314575321435,5.1372534090773,27.224444805286677,15.015910373960036,3.774360489366859,11.036826620825607,18.15926218798654,20.757139835446836,15.605594331799074,19.579991934600276,9.632504330913294,15.105430714551055,15.16301661219144,21.3840734038709,6.249645796177781,6.341338125294767,11.608394735677392,20.896504230763806,13.742960406548159,23.74236560289317,13.191393410418433,8.106379899628024,13.3541566812353,8.377894412494884,12.743375937409214,13.050800541182067,24.041455343630595,0.9995217733437833,12.734325949314343,22.221797058081144,7.726735991397062,9.590698736604292,25.392721783561967,19.107661081152326,11.695761635834014,6.767251776867276,8.528451652556459,16.3106710081696,16.10736677114895,28.247920249649006,25.26730963230428,19.449204334206044,22.49637510523943,9.257810225728981,19.60378026332606,21.65650874219155,28.549502985913364,16.390234174821547,18.610167973925613,11.044879017958511,28.88124595224905,2.0622255569109305,15.302172386840098,14.961524899406756,13.481446835846258,6.29560356760575,14.903860305782036,12.81836269395642,14.65722665032343,3.9436968867345823,6.304868674070859,11.517599793296391,19.324120248941718,21.919053083748665,25.01612825446422,23.052172021517322,22.021312055467316,14.752716026129082,22.89172532931819,15.831545197716693,10.240130522848567,29.219773193838773,7.70725992011172,26.086840192734122,4.736629794199835,12.412883757382449,18.15020607505396,27.919134544283423,20.10750115259068,15.117331287090257,14.460988395116786,22.67651891783685,13.248170497719583,13.93137048036662,25.54749195787023,20.907073445235135,8.64657213524561,17.0456890561181,1.8659347406837967,10.799261272154084,13.885507022081141,6.859461484745866,11.272480613128067,9.896301736257815,11.337982174946443,9.075356071853946,12.28621771264195,9.641587654355355,10.1490632170701,14.117285507707704,18.51298849419139,10.424273365843653,8.85575483771374,21.380617126378514,20.254527992205904,14.737348877324507,20.03460531023962,22.795564475394144,8.054723887980654,6.5313037521002455,7.647517414976837,7.214102133448639,18.470521604121927,26.243583426617917,15.443035592357102,20.152884680827235,12.363684759096438,15.082151617182486,13.481950068451871,9.646796234336481,10.422282146030772,1.6555698857961532,11.122734386544316,16.70916983956304,10.422977770980433,19.963218581756387,4.451312676913591,9.699750486373874,11.898466804374602,1.2368925858942026,8.140958122302695,7.651539178344457,12.683980480329957,10.026578093140166,28.017106794635207,9.253750678148586,19.144034053003335,14.658240603817967,14.593753360475025,21.864750671775546,12.229103088301713,22.64930925209864,12.182644574841373,23.200921115650736,22.43038476775519,16.61284803672848,18.982894169737698,11.27336992586033,22.973784409594757,18.51187762721646,18.918995351795832,12.042578783865219,26.13958345055724,20.75326594304222,4.199884533121114,11.675610045835963,9.639371874474032,18.82806348593491,11.5818163560607,22.45157262036714,23.56571874401581,27.2588387723721,14.507402884721083,23.441106959921456,12.950032632889869,20.758520026506773,19.55369278410273,6.6184758562175565,5.607947627494041,9.271343016641534,25.140098679889718,6.125246937140146,16.115581491835528,20.552663274738677,9.555699594951204,3.962633855973563,18.2368483908213,8.269621387232837,8.688779450648278,27.389405397469183,19.16955473999064,7.414272032420241,6.971653815451364,7.218063953543668,16.149801617509553,12.87802319105706,17.334636301912735,20.80373852084232,18.094221239279502,8.551572342316081,10.01267151832247,25.880322432690477,12.922541062408625,15.115840065886106,11.515390157300892,2.636751444560723,19.9984815193234],"beta":[2.4290874249793526,4.433225456056538,4.200631535072357,4.38661448378104,8.324089078191339,4.195696190739553,9.653626439413106,5.848358273277197,7.6730177207453165,0.10408401365028297,8.882880775233437,6.365936357543185,0.3480992314712772,9.961019682925148,5.577255964976125,0.2966019496216532,0.6246116793487566,9.958612317699666,8.523266419096425,7.405011681578952,2.437525423445699,9.23138575422318,5.579849687701084,1.0221184528132543,8.195999485916015,7.552103432964731,9.742905922327804,5.008826327890292,3.6446180528875005,1.4583905681244547,8.846578161485471,6.493523111311079,2.789397107573768,5.9901186546392555,2.54226920750942,1.3091214541735652,3.017289849007525,1.8182873429108404,8.345901348132399,0.9019644595654852,4.544866079519732,2.567359662732336,0.4852151674545757,7.431191274167093,4.526727788065907,4.974229846484524,0.17710857425731197,6.251354005032002,7.669593382078608,7.376080083829224,6.306997250979758,5.50877783885425,7.191230603176728,7.774618698435713,3.2655461356080995,8.713348764165307,4.879103972049885,5.643917446015814,1.7333445046146423,8.601157368825072,5.29684463289978,6.068003507076538,7.95782975379578,3.0642125598428716,7.630270314427811,5.494942416382527,1.6485027990832046,7.273336438495319,6.3225598443738456,8.794262312708206,3.3446969560604356,8.531984638985179,2.1583086362953763,6.6696163517567975,4.668265952826407,7.938409126501613,9.407059974668252,1.4149787274515835,8.095882919040147,3.8152032401401015,7.054076256629733,7.499973823991466,1.397633820945221,7.917202932040577,9.88388848293547,6.8695558701692665,9.333587340385051,7.130928806819523,0.040625246778684954,3.034588460309473,0.6086282849106905,1.9054251402795574,6.776133053155313,8.968959943709747,8.822428389675817,5.6477994378007175,2.685285846354153,3.3269665421361894,5.418660030816511,5.848401996263249,2.416867680302053,5.38494214388005,6.511173688523417,6.052175494176717,1.5247541404752996,8.316302089410598,2.329580221327645,9.735745624611436,5.041758449108206,6.592720757555107,9.425165839092283,3.5006406893086828,0.28422315185080205,3.1581057975508986,0.8878192791865192,9.399279537783178,8.530728942114154,8.946987899202846,8.762057107296389,4.187258205491114,3.985320949454143,8.042371222570955,0.25959294747500916,5.952517779992091,8.153554300468361,7.347753906028949,1.6884252631051688,9.859283068256586,2.159150805794432,4.028034312915077,5.157390402776336,1.651884420500882,0.44068954267000526,3.022561423539356,2.6215656917294905,3.5783420819639877,8.989523371399939,5.842463938939013,1.7520746635087359,7.928476688969408,3.6248610129489034,8.721947927368072,0.8500374967221092,8.36468503013191,3.9398719660278325,5.383915132524011,1.3953644331610682,1.3882622163818303,3.507645586635648,5.123215054995116,2.762200208300525,4.494799727194188,6.770805687373436,6.5304932008112555,6.191971856328533,0.7718640476094496,6.196178855948384,6.036334908576578,3.475639313606469,0.1381962323140451,4.603866482804657,4.957731105003658,0.46286639315580524,3.079859531878688,2.884648520982569,3.0182679675295843,5.556234078266149,7.294940588158196,4.8561822193168425,1.3251209659998109,8.534534587904016,0.00553990079717126,0.09302397300792187,2.9221877926777706,2.969557014416968,9.881941160209738,1.8199684901390234,2.649340666621842,2.145308760832878,8.95381974372416,6.464410736983764,4.546983267915201,0.6895245780690895,4.983557520561814,8.372229935317515,6.117780763776615,4.485456291248637,2.9896708177675047,6.388029056716187,8.977689885400494,2.9304749749729897,3.574349109640471,6.488740906798474,2.4631026160855085,9.313675062419115,0.8734832152552241,2.905430103367701,1.0194091211814849,8.85762625357872,8.712669927131731,3.1179383719362175,3.2880745366004827,7.950167951410709,3.3257679713632515,4.193868882915268,1.6995189590758497,3.7093431679534983,8.098563477274354,6.4045814377744215,0.8798510876768684,5.694769071369958,3.1542389790482828,5.813548618944971,2.052496380142248,4.3183903163807225,3.3845606665436523,7.878446906126875,6.661704860248485,5.882489026582219,9.776681766576987,6.613808558781393,4.905299051816703,7.320991460727042,5.022983300998074,1.5446995131905328,7.229441366761562,8.528385760501795,1.2116760480430444,9.349990554520202,0.1684062301304068,9.360257681885265,4.737953349202824,9.386200809803087,4.888718574437756,1.615537951944801,5.6910102642139755,1.3443422063482924,8.661354513328781,8.232460759643754,0.8991560159712075,7.31205787651964,4.738621178368831,8.017400219103614,1.0749916722382835,9.204217195124006,6.032674791139807,8.231405101606072,5.965352214315287,0.7487882011372693,4.577561620397972,8.972158549845972,3.542901474996154,7.728168733092556,6.389137031992855,7.603864271035253,1.355104630618571,9.499240664470015,8.097835735503214,2.478616860385896,5.512129700645492,7.261221037711381,8.543667979099435,7.280877985012372,7.132695341662901,0.9614750176518938,1.193170146234177,1.6791028277888365,0.3170813536489758,1.6105273874749915,9.04063262817653,0.8309439385256456,0.9156540355007659,8.97664174161849,7.487321663525823,6.852322931397341,9.617438133499387,9.10786013449351,2.468775834779706,4.496795114910248,4.494386724078463,0.04461198220701679,9.947490242515748,0.5476983235265265,7.509638094206941,5.483359598240851,6.020128618943829,0.04649472691037326,0.1543885223786834,4.960064624818326,2.5152570767886484,1.0498297334348594,2.35071712633091,5.212264183726532,3.6266313012139317,4.533503855545571,0.16931785978645308,0.3648949224697984,4.310193719225821,6.635403695327071,6.256992657558984,3.991907713139442,3.7091242579928596,4.8083156686197785,7.165234437807168,7.521501448379599,5.781846306470177,7.879906437640192,8.111668111150225,4.813066880336665,4.750117975388437,1.803316188369375,7.48174456935196,0.8863162588185669,6.128535050757202,1.781599956307811,2.431751356631855,0.7678781578784677,9.899248782858942,2.563267041417232,3.9146177823168316,4.08490257731928,4.82542252975305,8.258174754390492,9.070908428157143,3.0414609344818255,3.758007129099439,5.88903364050311,8.269396771382365,1.6886808646333895,9.31758800448238,8.681972698505579,4.785110999612662,5.0845189260025725,7.452080840982818,6.186639342153417,8.079575421899989,8.038314121018185,2.8127873305087103,7.057193114322072,6.808084619633556,5.048843785881112,1.3065462408986184,0.4430933513104196,8.54692436860674,0.6774432501183658,7.243554588188646,4.923897772351278,3.4184196943655754,2.1861635713610705,3.7026723894096403,4.5772249870665505,9.72681289916315,0.4719589125511847,6.0761534277748925,7.675939253669124,9.166833180825122,6.322003716255455,4.754881010710042,8.080284582591535,1.6281773814583533,7.462977169164519,0.5866870202966523,4.518232251835979,9.242494368836864,8.858365042161536,3.897323558526151,6.790455804782516,2.430784590205737,5.659191506255052,9.272374611355968,0.7058818424510993,5.372601890131536,1.4366359012331098,9.065021947559595,2.7962097435016364,9.575691487135016,3.4123809506615244,3.8591616195883027,4.000202515199412,4.601403462319304,7.292194422885274,5.112023074000889,7.693092999903353,0.43480717979005323,7.419381912844447,3.6672808030196147,0.7509201536240817,0.6164638886922291,5.124182892425675,7.195639698519853,1.835633616964334,1.4518230645470154,1.0509047327353316,0.9390783651902979,3.5211977959379226,1.2600812968183939,0.33873522274450174,1.3409379973886293,9.912111061496226,7.0035317581578305,2.539395629806369,8.657933232024352,5.1831276421691825,0.35579963248646207,7.903383338361292,2.8504537705784005,9.167213243174121,4.933981110547048,4.821181970717959,7.711592479705891,1.922652712790256,8.993738039430335,7.432184946331775,0.7272868873840554,5.278307100378566,0.0023075015863627257,6.448771199263095,7.483192387608448,7.468721189268523,7.227762044987354,7.383792783215943,5.163162274475517,6.522169341989176,2.3302205545857357,9.137946932203768,0.27855564566001245,5.084696320317561,3.117244218970958,0.9669517282227136,8.055056328417024,4.80054145556557,7.010242504657274,9.591802618236947,7.20225393312522,2.2744071135785293,9.425195881858082,6.319874080686347,6.199957053841063,6.305336567488298,7.75901940559587,0.47486417963425787,4.051243241032583,3.631474139872455,0.30514401685312054,9.452076441950368,4.357603472696734,7.486868695811781,2.395261978619323,4.811852003014192,2.743304032888676,9.41402703690962,0.3941410457010841,9.216570560480449,6.219322889504923,5.873018791573987,0.17522615267575148,5.658840096891494,3.1117371792037307,7.397807309876243,3.1161882308364564,8.485164648229455,0.9629237156433801,2.020956710241495,6.048885141196568,2.9702164096691397,0.3766178275487464,1.2777515499549175,8.993133950246042,8.121093797982788,4.174679286825331,1.1845346863168271,7.298401479266994,1.428822714149789,3.2849565660328817,2.971891992888982,0.18556160809730438,1.2794021943697764,3.2117528635930515,8.76801182879121,4.603929078808298,6.472635326108833,9.750039199967429,4.652036684775657,8.810868969356662,8.226949985528693,3.176697150834793,1.8627797649649036,7.528878660792769,0.8344416851191361,8.088067651213288,8.25796205903683,9.567783338889654,8.89011319264381,6.460633048803855,2.0368038325913207,2.135692161382594,2.7756957894137924,9.427837048769662,8.414856727506116,4.706512873755488,8.932069513967225,5.083086159393888,4.606547239108356,8.717053666243668,8.558065695090754,4.45065140616796,0.6571962298690548,0.20823376686828432,4.8474393128091116,3.546082596873419,5.485097635676974,3.683590469050013,7.869266977179317,7.559048387290432,1.1400443671947724,9.666328441168098,1.7709114772121803,4.914591779214154,1.148828449980075,4.248257990957991,2.474252158970458,4.1850484337976095,7.897841023070329,4.5677792053490744,4.952459011040913,8.888059977951384,7.7631870510255885,2.703983639055676,0.7674904577777109,4.536246708055536,9.005660741366663,1.0071524864376125,1.3282978786866129,1.8178194438856443,7.004665498022042,8.123821296870608,8.940201509759262,7.459026720436626,9.42221202727534,4.418770498398194,3.8712942119489058,3.872144274264977,7.202154396524307,8.728902487905179,1.222613266440289,9.116191828084766,6.835373003922078,8.244905197559218,2.333009040827423,7.919598571579103,1.2878783004117866,7.886033899108078,3.599521592982531,7.254448066894019,8.58000773970125,7.763746511067257,9.871643339084672,1.276086698186365,1.176715240309647,3.316795207412193,6.064995504522683,2.9232494149797805,0.5094234625049299,3.8142975696226133,3.439015248576174,7.135245905823635,6.85272868045379,7.4649161385829865,9.976396084945227,8.250305283204408,3.3261353758974077,9.88918297954161,7.64536481584334,1.3359635783610546,9.879568051197742,6.5437303223955645,4.91275844587973,0.4739226062702717,7.621505580482246,9.498127447361298,8.26636371742594,0.10386030464543339,6.292334276934122,9.933163093139248,7.72844061331117,7.927729371586805,5.742586029432227,1.0481110897042156,2.1537872981536443,2.9534055731569375,9.6178542635362,6.991700256063494,7.508046920207764,6.5486032183671945,5.700164144100195,5.51223149789251,7.0616850877805915,1.8017951253572528,0.7561823646686716,2.6578700029931346,2.941490119634189,8.382670850963548,7.342501225353759,1.451691937974653,9.581334361378065,1.6619984829661116,2.846639908840176,0.4230086491054741,3.3049525223048426,0.687934775598471,0.06135849383226866,9.058012621934928,9.308932754235787,2.708073365608641,9.546473986457073,0.23003694611891445,2.4868201701304105,5.097977325611791,2.982829175473396,1.331706809114701,0.4966564424645026,5.69109459838365,7.508800021602136,7.938444246566812,9.932401316440398,8.2273097556269,4.835798869656758,5.093738467556239,7.397664142304787,0.9339716116029217,3.2619902035705617,7.779176672554426,0.37361282751423586,5.980188059258175,1.4422970217248188,2.655984387144368,8.369488064681862,3.1356182400812393,4.337111682832782,8.90127850650428,6.996747637149041,4.873314218903793,3.2468788351924394,2.5175573093012593,1.346958749723004,1.0470688532472083,8.02504932175281,6.339008034771263,0.355017194186662,7.073571870715782,7.5850061081284466,8.230461710411488,1.8346462627308435,9.40118897556706,9.81014858391594,8.51840863509102,0.04785568602812873,2.9143318278043107,5.238436832620195,6.479510119346399,7.68981911457248,9.991204931031469,4.16620691855212,9.755041602579965,0.4905161252080159,8.835545717105468,6.74988834982323,5.535075459168901,7.764032968619432,0.3518772743686527,7.769778291665825,4.459754849186988,3.9834842983356045,7.328449108755799,2.0095062518186513,0.3548288001091815,8.963138301801445,7.200993046986914,7.362413696912935,1.7743023329815677,9.594409867418962,1.6546281065094903,8.859197067452524,9.518965982703289,0.07805478968309965,8.4046158127702,2.8799603428888365,9.387295098459516,1.0088847803895118,1.4693747073917085,8.239623254127741,5.827565756376165,4.341083620677955,9.575664319028688,9.720197305246124,9.141947368784372,2.9138550828552057,0.13392971016378485,1.7072429295871494,1.841092552727912,7.306785407490479,1.5182760249950356,4.449800762652214,3.5640214253171387,0.28022556459246006,4.212377810625161,8.204734793526,1.8657676805797485,4.635357995121416,4.295554046178555,5.774658167751376,4.435700088763457,8.855198841259782,2.7251003156374742,0.6822167769282594,7.503558606064036,9.271523475746816,9.044680678605735,5.108630971838119,0.5952711519409637,3.727442125031968,4.73308435347374,3.3417075232380844,1.1797528260247336,0.7358923272765949,7.358477640767318,7.521716174901016,6.9334003938267585,0.014384439689563155,4.876436175398718,8.860485970699884,5.063796753470178,6.918259353745846,9.850243740113294,2.36209789647724,4.6019320039662475,8.480933191705649,1.295408284008257,4.847519755797977,3.4670739229698277,7.39126515945653,4.211743466581741,5.482182005198291,5.8657602037114165,7.965801637855909,1.3543486696790996,7.5405588957955905,6.273422266854364,4.041097887464544,9.832339179304515,8.318442720700137,1.7296488992521875,7.872393896759766,7.012886476419737,2.6617651577606716,9.57230752881998,3.036075562022309,2.7089137977766353,3.38235829232284,2.504483492363332,8.43137841900522,4.505410154475154,8.068544668628846,0.7948722690493182,5.7707784743266055,7.488271614859725,7.275321308366185,6.193985849757784,5.955771388439006,6.884732411936653,9.915984691910701,1.8365073083242267,2.896745542266055,8.166922878762957,8.652332914598963,7.215492918623189,0.3807544921231587,2.9062459024762055,0.6084783959445517,6.983327597733111,2.16561158069408,2.406875394848371,9.97687251499628,3.5522608848063664,1.5125632930135824,2.060176569324712,7.008300029878307,9.64802460856988,8.81944397477316,8.33230774901546,3.847792359384399,9.638839382942452,8.45735305847154,5.427472879130324,2.5263993896216386,8.915896130293607,0.24278904415706126,8.027267404224007,9.133731154652821,2.929857189967968,4.142619599080975,9.21955327919382,5.020078822406788,7.985629109227554,4.955053676709804,8.362516269584177,1.3829061728305225,1.9130926562694772,1.9764509570791278,0.25115713913449467,3.3334591447007234,1.845473478222408,2.5893656713753743,3.5700374738321328,4.708620780485944,3.6073023456061137,1.6945744235718019,4.50313452488841,1.7964010293976318,1.9798147183847736,8.720330085523653,0.6218023836843067,8.723254526831434,3.475593753609185,1.588910114567288,6.417949022252545,3.718655394117918,2.1111129437339926,7.782900669801953,7.544088199132391,0.48805718322930236,0.17744682362715425,9.587127841782344,1.7806259840649319,7.6437554605776015,5.771965400996302,8.394551114077597,1.9314223235404127,6.763318021095246,7.345905818099503,5.042043194121224,8.58369033384034,9.881224944576461,8.604938723328079,7.8024768739959915,6.702520104873382,3.0036352761334606,7.911460539569129,8.260592754484012,9.4407138633618,4.7824453632583115,3.929337042347527,1.0154262753569565,9.19305190725073,0.2905781499852855,6.56386693107001,2.7296304503467206,0.314787435039694,5.251023163096882,5.083524650849998,6.996316227176931,3.2133908099124353,1.3313785902106656,3.082413595215232,5.535738678267059,5.949266531166928,9.298054031765899,5.335590224225757,6.675270081566924,8.663555530073971,0.21980986177426942,9.708500214667435,6.5876665373839804,4.302472952539135,9.89529555152841,6.295462039865711,9.91611614666018,1.5729712240137395,9.237630167896587,4.407251479692205,8.891678447766878,8.78874135924962,9.233709640566424,7.499996922144192,8.982197760487704,5.013708033351014,0.25518633957319015,8.788653824174153,6.314476950055077,4.939656698661836,6.798949226707762,0.45037344485127084,1.7800987529019796,0.01890798025682594,2.4659804481533443,9.767391625689147,0.17533969599774268,2.2143294942437763,2.483104188735381,9.340196627144966,8.701759495406932,1.2273201864846905,7.044008412882463,0.3551502972493492,6.080818786539042,7.157067358408318,3.978419280147658,3.643993713899436,2.3897254928002587,4.942171603480809,9.62218306606762,7.956707206128395,5.523895815982646,3.3696075875406484,5.2894975741727706,0.5007241758191139,7.98463690285468,0.5668219983003442,8.343926593745767,5.005465694805196,8.019564627359978,6.406271432292572,3.1505190839237063,5.022853840717669,0.5970410256531022,7.43147087642642,3.5841098423864826,6.322313321616235,2.928601472623449,4.411154374977267,4.22411107314349,9.420742732989076,0.3213606748414266,1.9303574187357975,5.449773275905427,3.186206951262709,9.068637175975304,9.782568726872192,0.22134148417803923,1.6848669716255849,7.635420556012418,4.851290807991047,5.741614863878038,0.05453833303814992,9.401218708540393,8.48719279825914,8.216054462270892,2.7302741902106553,8.148124005353022,9.594257136264876,8.076274299063932,6.039738421314771,6.273148453514155,1.1872053587973208,0.954024791124537,9.404889541460001,2.2670283538587355,0.6159883350970619,4.906529575543248,0.025830155527002407,5.477033671204168,8.444702933891907,2.79485127356208,6.922321435304535,9.223552969197561,6.378836097213439,9.185166681342672,0.24999840183038913,5.464923163596193,3.1586976717981674,5.687196213949262,1.9593120192423408,1.6282606571863445,5.662905253963997,2.788959656715193,8.242559597604691,3.2794524919510915,1.9162378726902274,1.5702308662239184,7.835019581671492,7.5763753221848,8.292716403297772,7.7386524717446115,9.211257798332795,6.944327038082038,3.783227577128234,1.4755472356463684,0.3035804505666051,4.807239545036506,1.8693980522279574,2.8688524216027367,4.11617591406491,7.642980954413177,1.2903420761272666,8.06144885108743,1.8467742232034734,7.603195282745001,8.36689661096126,2.0333025667899096,8.804066727438958]}
},{}],79:[function(require,module,exports){
module.exports={"expected":[-8.615288563981768,-5.620067529202162,-5.87992225071779,-3.3046319081950575,-3.88253867227598,-5.053024363690387,-9.66673072934104,-3.637566955118137,-4.513136015202548,-4.709316189891707,-3.7223723960718704,-3.7487736950036155,-1.126389585574728,-4.89574218885925,-2.5413013128764375,-1.9749887649042286,-8.456920786845703,-3.5538831865354616,-3.0959061945474637,-4.830679575164634,-7.910698724295713,-3.07445066915688,-0.9252484765033522,-4.889005662301667,-1.5233165178488495,-2.4517428512207147,-4.26914540585296,-3.65610882612393,-3.835223143055286,-3.2474035636119307,-4.1008240149908115,-2.917791089436051,-5.1532358693899205,-5.332920218057708,-7.159184141100351,-3.430764558371898,-2.622579399579543,-3.6500974997617126,-2.717711683075666,-4.153416650766317,-1.2539020592666397,-2.7401217272027942,-5.151459557368371,-4.387967203696599,-4.146879715394711,-3.0267092151508184,-5.9116192728341765,-3.6635346704468432,-3.7431302402672344,-3.4513568085683533,-4.352474522853201,-2.4039191186321816,-3.4336588584630103,-5.3241777934510885,-3.346045527362291,-4.087450374647762,-8.162715366540443,-3.3050951339915784,-3.1692497577775534,-2.763319081465867,-4.773554830287923,-2.6735945610067757,-8.595130442415407,-4.258599530898515,-3.9333777779388432,-1.2373460734636303,-4.841997391183382,-10.448803627259366,-3.4523006437777806,-2.1303329942243554,-4.624651170107544,-4.31309722894655,-3.635911817539874,-2.186207967077465,-2.4303671996312133,-3.720825839479108,-2.476560786156897,-3.553887080176878,-4.286091919692975,-2.720565709976981,-4.271914070293089,-5.6217215885796215,-4.23307447839723,-4.510435085428631,-2.9784607266418552,-3.6668193499598836,-5.029455282561585,-5.221258458861442,-4.178365991352454,-2.3207796255215705,-5.18424649552931,-4.911075614755681,-1.8613364422590237,-4.13013236251347,-4.362585552934409,-5.070972566424074,-5.068525781069821,-3.4271826503706357,-0.7177017989399168,-5.85655912196323,-1.7524656203825888,-6.071387355502068,-6.191446668031954,-2.03005612437979,-3.384868636799983,-5.071482075862555,-3.6745062694961947,-4.957140618955229,-4.80722716052254,-2.3881332108878084,-3.182369433101048,-4.093929123233834,-3.207377677508691,-8.960197495647396,-4.625222601116544,-5.475094449971824,-3.981377873644467,-1.4940802117296883,-5.077763493857116,-6.106613446162697,-2.8711755977326643,-3.0612782883509126,-3.0564481284080083,-2.637584314774532,-5.109860148821042,-8.37445296570462,-4.30796451397633,-7.725799407054872,-4.162363027558198,-6.654664036571678,-6.849688929204998,-4.173062590690181,-2.4899596878967287,-5.235571766181852,-6.5201823969642785,-4.07573376672528,-6.9185694051065525,-5.205179411203364,-2.5274036204466395,-3.672180643057185,-3.9067956864946387,-8.084226649871514,-3.830497587442242,-6.2257509084652725,-3.989243156656755,-5.153418977228157,-3.1004778957736328,-3.3959285904933756,-1.4236793182572036,-5.26597291638025,-0.6624485462792293,-9.842996523776876,-1.254735707118563,-5.2547489582732645,-4.064487223675951,-5.359911115795548,-3.830693913713782,-3.5450098445425517,-3.3272276382797714,-1.5391623108404247,-7.7323784276712075,-2.717546265152574,-2.8655533059420293,-7.87426979186413,-2.1280519507484073,-3.328548756746329,-6.926019118568405,-4.675817272647316,-4.611831227247354,-3.1248606271373127,-2.192361793307576,-4.2196168195446955,-9.377469188435771,-4.544518688673068,-5.1819797926242686,-5.301612814010365,-3.1953670450138834,-2.9505471645969976,-4.651802220235169,-3.9726179432794524,-4.269578268315285,-3.7537621385807394,-2.829038566258294,-5.14986195775551,-0.5129321332418542,-5.174919715855559,-7.098339749671954,-3.3532734340981674,-3.1373097168192867,-4.622507011908283,-4.84654198081444,-7.710638153677152,-2.155564805604783,-6.2256439325278485,-2.6766410028566217,-2.349860675537892,-2.030914574039386,-1.585108487458644,-4.036986598281797,-2.054856963553526,-3.5796767234987357,-9.77389505404118,-7.307139122141898,-3.5808133153144652,-4.2740030938277185,-4.373995731062962,-4.812290787913383,-2.126087542244864,-6.395631016093279,-0.13757072416536076,-2.2093374877385266,-6.4004340120864285,-4.440448958659154,-0.9995395481865472,-1.082723457574037,-3.114962020714831,-1.552191836441267,-1.8892010291036208,-6.530714484713457,-5.123636110723792,-4.380494851735179,-3.98363994582299,-5.588118214523476,-7.617645235389997,-4.266917259407494,-5.236245205339181,-2.0484886250405765,-2.4720993081033953,-7.380222636391551,-4.287710007179703,-6.543915840517869,-5.8873754466573835,-4.983799761316508,-4.592833790338233,-3.9195370877795903,-3.8202902282402342,-5.505462963834425,-1.375822876640246,-1.4845936002890845,-3.646482662097597,-4.4605245959497015,-4.228063110187419,-3.6100456085009185,-3.8468051961302727,-6.127214926980411,-7.414564291112249,-7.240915743655993,-4.249178195581779,-3.644155903262824,-2.326276878530905,-2.473637628301133,-4.0215254718969256,-4.155333760769569,-4.446359201186443,-3.3712571527186626,-6.691271156345518,-6.017988588621062,-5.321905943006756,-3.7475923771840542,-3.669385779172849,-6.095823256009965,-4.042167994612615,-3.992037439475265,-3.976660496079315,-4.3579812310170425,-3.2729675155078963,-3.7838410254746577,-5.728714645093053,-4.994888766092075,-6.879390476016145,-4.015675812322208,-1.7733255275691704,-2.345161493411453,-2.768691081980297,-8.375754339870785,-7.0688741725615,-6.2777443292900195,-4.182295262142905,-2.7080960872801043,-5.119999340265686,-5.389578493529296,-2.241043128521669,-3.190952401893183,-3.8892937044103073,-3.2899196708919822,-2.1713719219620486,-4.405548596174077,-3.675689433260473,-4.576080609725754,-5.500037412720545,-4.373678625379286,-3.821746941166854,-5.111294177994363,-7.18062341245243,-1.2807914090076924,-4.577096613591927,-5.626369198430991,-2.870955067186257,-3.988981617741338,-2.2585883229733312,-2.2932047390436274,-2.7209025767854174,-1.8366581754580498,-3.009061346690565,-2.2387705325528025,-2.469994276028955,-6.00237653515107,-4.6679263057579625,-2.3298244182531977,-2.336393022215173,-3.898905863283596,-4.450478440115782,-4.534221405885709,-4.567100007180592,-3.8837843007636965,-6.034929708124611,-8.267470511625266,-6.271436199376115,-2.668418227126571,-5.264829191006108,-6.779897373077489,-4.266199963392474,-5.066211521414591,-3.416775604120595,-1.9219706960170857,-3.2581877533798025,-2.6085415822530713,-4.396763850562818,-3.6436763348991663,-2.597747769542611,-4.049167849252834,-4.073863486933643,-7.7703912284124215,-3.805836168333391,-0.5648390562666314,-4.70122240030603,-4.459370792240621,-10.048278723199747,-1.7766407280626773,-4.640867932257842,-3.524202583482767,-1.7754607800557896,-4.224294021592318,-2.975404269351604,-5.871471669597572,-2.6498785055358525,-5.916373771112731,-3.8277671043470862,-4.819243072970362,-4.402996958779356,-4.427357946465975,-7.025360872080231,-2.658563064095926,-4.868329886398445,-2.4881341897647253,-3.7932715642105244,-3.62938828795682,-4.137969320625174,-1.4330109031130362,-4.161225946824024,-3.2324415735322747,-5.055521847208793,-4.646392681006979,-3.9368695984500324,-4.948162654134213,-4.327082296570744,-4.790173251439821,-8.081175491649592,-1.408521026197569,-1.703979307627904,-4.351327539893237,-2.815033340368643,-3.6000067069951154,-3.6235104781068586,-5.14215048311932,-3.477541386398199,-2.476742119514194,-10.613886255985587,-3.008178496277811,-5.639827146138153,-3.690686933072577,-3.677060817744249,-7.0525277117155625,-7.602878484863275,-7.644540835889281,-5.863340780728432,-8.10843149886789,-6.691915387896099,-1.0082453209230877,-4.16580452706766,-4.166085586142655,-6.798237170824475,-4.1783647636227235,-1.8074539408892605,-6.649728502976348,-1.870473722412779,-1.1668598254320095,-2.8406803393905165,-4.271049365542549,-4.59030392086,-4.517779067048762,-3.8398980932415014,-2.223811748994926,-6.845323578264772,-1.0679134853485728,-7.5033128649620195,-4.657188169026641,-4.129456936636112,-3.7818128837895983,-4.074397313238398,-5.726264818117116,-5.05946669475156,-4.984847155518831,-4.657861468919765,-1.0723392414615454,-4.701184982913311,-5.157684332878464,-4.398013548600232,-5.990101612603841,-1.4876365167158543,-2.9973735537698705,-3.0331880381654024,-4.1492336757239245,-2.6125109594751486,-8.105081411354647,-5.303099114914154,-4.353682572424514,-6.241938985441774,-1.1427133273184786,-4.050746436636162,-4.165996344117719,-3.547987613074575,-7.995966066272171,-2.3876031667583826,-3.752119976126605,-3.9744629099236874,-3.5314234334394996,-3.943297345497877,-9.10896876546689,-4.33349200694209,-2.2180034642038855,-4.19237035444443,-3.786634287819491,-2.8973566796191896,-4.022932954557488,-3.83992343655477,-5.208077269623672,-2.8814900768622493,-1.342954778143394,-6.286773727521659,-4.390663651680506,-4.431862349243021,-5.49406869668227,-5.334750138137792,-6.105270079923734,-3.926256447595904,-3.7720131188365666,-4.698402074121261,-3.1775091881256294,-2.82145033296003,-4.981518067607944,-4.233803980480783,-2.4842805553789358,-5.339921465192262,-6.213667299001976,-2.409783960889161,-4.452596232350627,-6.496390819444805,-5.338806788501831,-1.7109464537495978,-5.82348802504697,-4.445708893554125,-5.596589029436334,-2.3847481356686515,-4.091274111578187,-5.975790841781862,-3.388057908643972,-4.353698015939035,-2.049249976110236,-5.07535732198815,-4.036642051026751,-3.079825755050839,-5.948508192501341,-3.1636684036895737,-5.688743672304154,-2.1792346532882974,-3.524758690922692,-1.6639726529534045,-2.8299328091633473,-7.7296153892245485,-7.409670808274456,-3.6442013519989027,-3.8610502847191617,-4.443457688691883,-5.398903720644663,-6.82052786161794,-3.182112589701709,-1.8233111017010675,-4.7226056659751166,-4.697748428929502,-2.710678385084398,-5.685146046752726,-4.455602021781839,-4.2133377831451,-1.524720255847777,-2.5640047251773854,-4.157516867359028,-2.801708084937058,-2.7716623337618778,-4.401478879277296,-1.3083321410341853,-3.5824102821767703,-5.298764808376001,-5.502847657861146,-2.7520111697147627,-3.1108343685844377,-5.337889550314383,-1.7332937699084034,-3.4651305259896965,-3.8281017183887798,-4.161467021318167,-1.3831176758919383,-5.993717969207559,-4.369690536010108,-5.2449265769085045,-2.502337534036908,-3.112680052376679,-6.557187751912798,-3.787596899217535,-5.648250519101513,-4.591470126433677,-3.993590161818439,-7.591290917752346,-2.4571922296916107,-3.7937917300229156,-6.791941087720037,-6.115016987242605,-4.74321778224826,-5.680616110524868,-4.469429308587465,-5.428077907467586,-3.3610433762990803,-5.137080934329209,-5.189382487043122,-1.6780022721415335,-5.049955788135549,-6.3443698312452845,-3.0860655894716196,-2.9934330362506243,-4.177999041776857,-4.903184476960133,-2.0822809094022574,-2.353800925873891,-4.660058687279751,-2.2346322702842194,-5.497381209142311,-4.931390922569202,-9.132710846256376,-4.423024851940639,-7.021537165615708,-3.461247655354441,-4.112979770709513,-3.693904463936607,-6.407136721153794,-5.0516304837141135,-3.2786472983216663,-8.172500601915633,-6.0513172203380705,-1.2951995366628921,-6.1103667921147515,-6.631089735867025,-5.630344570799917,-5.661791925994698,-4.927030976314184,-3.1522075978748223,-4.92957326398237,-3.4766087072725345,-2.933947292993774,-4.231221239772208,-7.492010303428753,-2.0068488600931254,-5.322786748772611,-6.155906309431849,-4.694604934111315,-1.1113399928855543,-3.7246476451374537,-5.435076674862711,-4.130376841314802,-3.1201434506702697,-4.967191184776876,-4.017579193628061,-6.828703937354685,-3.511201781333554,-5.294457538314235,-5.87248934000943,-2.803202087857372,-8.570080888303568,-3.645263345119434,-4.258350124241037,-5.913633236825653,-3.7582423472761732,-3.2378578079179112,-5.85261630445796,-5.07802799495272,-5.183390232273091,-8.37937265961088,-3.3496616154596652,-3.4271326285009582,-7.433990259565753,-2.5532143589035616,-2.576270602413725,-8.626209484430422,-4.91739221012525,-4.176138692170488,-3.878018558669467,-3.073079310145155,-5.134540328063608,-5.5072621244718025,-5.6562960781136375,-3.932359170098964,-4.6283773470116465,-4.007587717384525,-5.078250698840929,-4.0817448504407885,-3.2715199129270474,-2.564363713452117,-5.1949863488325185,-5.596833340487356,-3.6582192916122978,-3.2924493490564672,-4.0150051387355035,-6.142463951433886,-2.5528924119964334,-2.320053466036775,-3.003031357521971,-4.183793301066492,-1.9449841748340262,-6.4633938546680305,-4.764187407171757,-5.013660871692604,-3.98557373385429,-6.524742759097908,-3.3496489756782957,-4.654552706129799,-4.020969624476976,-4.078840647430477,-2.1882688850907606,-3.489250075426682,-6.060135166375812,-3.0414808745529065,-8.128598612574748,-4.553726087727297,-5.335855428270889,-6.783848817181116,-5.483534874943128,-3.852968314086283,-2.9157522972476784,-5.279766502750462,-4.5723269535969315,-7.541706235775976,-4.944529927082918,-3.1216114291604224,-7.536223463717015,-3.19630460271493,-3.201364935824309,-6.571154982613599,-3.6192767925163625,-4.984948916684218,-3.9798149779595167,-4.737805421680857,-2.4496804474523337,-1.2307550454040648,-3.6752421240283866,-2.9150414575782833,-4.501206339803292,-1.4471249064330216,-2.7693642201284927,-3.0076877622078086,-2.699779208516544,-4.359655692983315,-4.047766616204184,-4.660155565652371,-3.43639004689018,-7.720413367781177,-3.101328579452095,-8.11228925889547,-3.0276103307508198,-2.5079869148372502,-3.9311954375081863,-6.6412588674161945,-3.633217314855127,-1.6845714152758013,-7.371888441969915,-2.1347748967441653,-2.2269634490869947,-3.8243069756372923,-4.432590374299867,-4.428682898199174,-2.5515042668087204,-0.9145029888197875,-7.871758333134945,-1.1497548616518571,-2.6184663530566112,-1.7378236390567707,-4.8712473627844,-0.8248264621058858,-2.795186925098802,-1.8805705283605096,-3.7902832250169656,-4.123322751258751,-3.6838862413964932,-2.519993302237557,-6.609061387306609,-3.6594537295150795,-3.276388502106384,-4.235490224570333,-2.9705658089294698,-4.320143721380273,-6.969087468778934,-7.9462440556222305,-5.343909602128058,-4.436514777220127,-5.068862601669359,-4.299340298378048,-6.92557706047322,-2.486707779049649,-4.971019699287341,-4.1620495219890605,-6.396579818899756,-4.929493116197776,-3.3884067110945875,-3.1342296152151903,-2.802404033855846,-4.292201719564553,-3.102771733297752,-4.022802494340393,-4.846610202239162,-4.898981905132551,-3.9506245057806364,-8.398213138385131,-4.541977903267275,-4.281737829621875,-4.939824429817509,-6.704855647367886,-6.588720293437341,-6.5443458432017145,-1.5106468056444093,-3.034683415938036,-2.501420850633483,-6.660374942410073,-6.409089504862912,-3.837350664722852,-3.46096314159154,-2.867146116531604,-4.340674489558825,-5.884647457750784,-2.7653389830928,-3.8656217104401955,-3.311409914565111,-4.477699950373616,-1.4074257942412185,-5.068086421668731,-6.903286657317377,-4.373289943841658,-3.2291841691849985,-0.562189300631939,-6.493706519020796,-6.3053366697692965,-7.293683045870367,-1.6261318945226364,-3.7679014348403603,-3.840422100955035,-4.723236131179966,-2.7913449687601695,-6.845501245173018,-4.526179182205596,-4.602456484585435,-5.869261145795523,-8.068063953422023,-2.1502001291489714,-4.25233939361326,-6.186756949181989,-5.07939401220905,-7.637838695200308,-6.452345941022994,-6.600478992520891,-3.718785703985642,-4.627140399856545,-2.6925433377672103,-2.6365853512793365,-0.9953957613081172,-3.8838547304921103,-4.596444521181569,-4.721625653679389,-1.8838231312047728,-3.417719297618083,-4.326079232033912,-2.8226773142120525,-3.64377623720074,-4.994528432464961,-2.07260860224296,-4.723303982349719,-3.571529714688147,-3.2676785851313745,-4.143136670971966,-3.951392746361818,-4.141684603262721,-4.979375629783183,-1.589354365451765,-5.590906230817845,-6.470462279589295,-4.385375321899865,-4.215758346747079,-3.2356938619694393,-4.178474523466209,-2.1537588896734015,-7.933107076837597,-3.943932493949161,-4.939161334282364,-4.748050100998861,-3.2219446905802265,-5.860181496769263,-5.5118627844393835,-2.266666467663235,-2.0533751393314255,-5.421110869657048,-2.712017729812967,-4.41137503789454,-6.018586447615871,-3.82545120496823,-3.8041876843261146,-2.539361693351802,-3.0516562337297337,-1.4914649939969067,-4.386155498810198,-1.3421215641828859,-5.703541511388387,-7.404202520959359,-2.487813229894922,-3.52019567021226,-5.547024378196788,-4.288337381200403,-3.1356756631002582,-6.8455460338554275,-3.7838445674964367,-6.819135652547381,-4.454463538823527,-4.387456038237815,-7.670067209248803,-3.9791239712624,-4.190228872438965,-3.654146738232164,-4.923129770923481,-5.048287518676654,-3.639535240633549,-1.5913932901004912,-4.241182008039477,-2.644022366156438,-1.1906920097390135,-8.278922345668033,-4.392016928028477,-3.447493103024577,-4.013601668546659,-4.428850008993875,-5.53839728215067,-3.530762779294701,-4.40336498020428,-7.969839122497489,-3.7224529650374016,-6.944680168936163,-8.44664529246321,-7.474761892902354,-3.972701295701322,-4.574503851100999,-9.108468074742767,-4.31012470774867,-9.384252156292082,-3.392548764103706,-3.189207359287721,-4.208708215722014,-5.042363971612804,-1.2056461937724787,-3.5819474511534155,-4.498115342113236,-6.714930752827453,-2.1875245938740058,-3.1487574631458433,-3.0075538516817133,-4.512870256497109,-1.75669274163862,-1.3702831623750313,-2.2875426754042536,-5.494877030063794,-4.368255385446178,-8.011519838411344,-4.546587785743869,-1.951488273948641,-1.4567686761761856,-5.199536096881147,-3.851355014710851,-3.7299801486683553,-3.0295934937864573,-3.6983463496266307,-6.791786564671199,-2.8631833210959154,-6.798192562418379,-4.2013764520917904,-5.605239625133795,-5.217174088564667,-1.7754660703390144,-5.551197160025708,-4.177854681854949,-0.798758561642817,-4.702085488002762,-3.6589168944287627,-6.464080238262326,-4.5653306025776565,-3.759828388192174,-3.2137614222860673,-4.380219814544995,-3.1501172018173342,-3.734710332615755,-6.272437731845148,-6.074616795313943,-3.840730528267617,-5.964393922305817,-8.99610459429531,-2.3882422980977296,-4.17231627170594,-6.918637873810113,-6.074330896146815,-2.358007502881267,-3.4513435876648906,-3.103805633945683,-3.8666000531465974,-4.810177223159645,-4.079136155241746,-6.5526701138987065,-9.719196033907032,-4.212020724474067,-2.653535901446392,-1.7973838290373862,-4.290779460839911,-6.154031012194508,-6.594000533707192,-9.071823226760717,-1.8794130051391917,-5.747028587865689,-7.638111694945938,-2.4091069459629786,-6.34803580974927,-4.074561696784482,-1.3778314239389537,-4.303772084596625,-7.9963870076779955,-3.414411419843333,-4.077452440001215,-5.721122496853415,-9.845609120354641,-3.7028952499371677,-5.933168536094925,-6.034811141190808,-5.428909862943357,-1.6902684562628298,-1.6843357766858738,-5.098867986159792,-3.722022912842025,-4.7935902018531,-2.5663594113753554,-5.069159745321912,-3.0192569421363844,-3.731382478211744,-3.4352789773958428,-2.8246595091224247,-4.239499662364035,-4.359567493591885,-4.873485725457203,-5.387840729919104,-5.255776328386215,-3.3988373243116587,-5.827138055528671,-5.584206582583901,-4.896118389670718,-7.369715972445778,-7.02438753157594,-6.312191688497027,-6.470596223274811,-2.4561508766884934,-4.836271085066601,-4.313340017288499,-4.282664490394668,-3.2224473675910446,-5.133000290901604,-2.5683684870139043,-4.983520063346653,-4.031972512091016,-3.7328459843487636,-1.5561329668511572,-5.452424255383363,-6.491232496525697],"alpha":[7.479711964754121,4.8233056989048055,7.349947626686895,0.7938719888606993,2.0080114601321197,5.916416670492552,8.982479535625139,2.9526616379586756,3.7832905555208107,3.0509670618220164,1.9325676599701924,2.676763617229898,8.905378666195883,4.613055630588525,2.1150928061572216,2.5565186820222174,9.941957703544183,4.3356720045043655,8.858085089151189,5.096085392267906,7.939881963794382,2.7860380726187883,6.705851963078537,8.027124914789745,4.694618996639212,9.815089255164533,0.41419858018197475,1.904129336489333,1.0299396699552354,1.1910273380009184,2.0649092248334244,6.03760620503468,3.2700288456171056,5.045176951836659,8.70710932295178,6.0793536597468485,6.780963323335369,2.2808839047856977,2.2902492417298737,0.5627258367533994,7.221903499952882,5.082694558883459,4.88727879696402,2.232735581673402,1.0253997858824615,5.0040344953938725,5.939657234247557,6.354793983706362,4.801693629622703,1.2727710414962967,0.6567958944338215,9.332439999524098,1.5992380212871726,8.974350157770107,2.80013115327854,3.3085636889113923,9.956991522748178,1.0308079133106962,3.844662656209681,1.2171392660966074,3.7065510933313517,2.3671090101311587,8.178167949957949,9.862523027498899,1.2114946937104776,8.357223596560813,4.151508625759912,9.56501678100501,1.8735409699998717,4.105629233386421,0.5282267440188981,1.8398080988777021,7.565864078927234,7.028750910082399,3.8866396736295594,6.559519147702497,4.753545798475107,5.794829820174863,3.6868694830384574,1.5952580726773036,1.3810389368306963,6.950318808801641,0.7151520546620804,4.606225619986873,0.8179685305095119,3.263013173979288,0.27202156633841845,5.007579090227257,6.878172240754474,2.53090139531128,0.11130787926681318,7.87144050221386,6.705634055082084,1.0164860335125958,2.9080003035836177,2.6964240967349418,4.450815275499405,4.14813598767341,8.233016924545824,7.46755775383016,5.129212103089255,5.215332812712101,6.920203802368201,5.4737414640458955,0.596252618585662,3.980519988078668,1.0644406025475095,5.247828241517343,7.2538840649308955,5.691148376006156,4.992590238453203,1.6254623460356266,1.5043416566096646,7.469586967718391,9.255886757878834,9.59988861145808,1.624997729040436,9.309864577117308,6.557799473110972,6.898147866505382,2.4321414587049373,1.3859590051399029,2.6881573601461173,4.475089657920734,6.740590941287923,9.41998934383178,8.104536637185555,8.616406510047783,4.615420026101324,8.17908373138864,8.49511179843261,2.3899963597443596,7.41099621589278,8.962633049223141,0.040813828390411366,1.3627768323620248,7.320341680935451,6.233052200128604,4.479222096933779,0.4296765060114738,0.9644451416803634,9.084937943341,5.665158197466136,8.598867066626061,1.2219216885190987,0.21698096755571772,7.688464605203002,0.719766938754971,6.5160969462011575,3.448611008313416,5.8069676648679085,9.72108578111624,6.252224062149696,7.257604132912922,0.4205383201847068,4.338534413802428,0.8904439470770509,5.937173723611126,0.7719286820196269,4.011975572229187,7.891270386260869,9.673271693003977,7.270047995655893,9.5371349888277,7.403519208466212,4.686338324440451,7.254388829942718,0.46159523566870586,8.55377558608603,2.080209934201327,2.439509248324956,2.0605819711461737,7.980924691130589,2.3202732097690704,9.838319930923653,4.121297741502506,1.9309791372338103,6.322315912096785,5.712445617048141,5.465141566128635,0.24043756686135787,1.155425977263027,1.9026060407577217,3.488741036917433,6.972534172965032,0.23611113277018925,8.252720473133783,1.0402683086971032,2.6008852911838365,6.279231297338022,5.2312799565426005,7.931653991281404,4.1981828265963,5.338224966843523,2.1500877144767605,4.701539882664996,3.221372891193668,9.15024680053052,1.567769429981547,7.881621879883474,5.471562057992192,8.286764539089933,9.566416636303767,5.467740665513075,2.58585240516372,0.5413638827416523,5.2670340033119984,6.398227283898079,7.756572119745117,9.45756055705859,3.009919912161254,5.418336185748722,9.532338891415401,9.441845540478294,8.330337465690864,2.2511605206736762,4.221992955111327,2.3381632363840366,8.083023223462805,2.5941643162785955,5.0660841500125375,8.986187781696632,5.06525175421912,6.630522686157498,2.8080138949713596,8.270174254968554,9.293484202896474,4.8171150468725665,6.9203977279738975,0.5809676261908292,9.960478717672839,7.726408877401574,5.536951140149345,2.7722369244124367,0.3799513590306325,1.2654791012190603,8.368241762361507,5.843481324208559,9.360782665815712,1.4727694289980642,0.4770666369615184,0.6191532685181156,6.698804086777441,8.66909479110758,5.107352306221086,9.60448077014979,9.483953375198563,4.049817642174267,3.430649054207102,6.108335648782772,1.4305464681168067,0.23307146558626757,3.6554094051398067,0.38594327373230986,5.576140375591336,8.56710573788828,8.311925794644049,3.0636202255645895,0.885594083518273,6.844206171604885,0.07558810825242901,1.7894793450665425,6.598953631162083,0.7410469870986058,1.4299213087547846,2.2468060094392905,5.550217758061924,8.453518533606362,4.170538023973749,6.8053020926850305,8.133540875089613,3.388297430280438,9.188468253015309,8.266567098025694,9.325870055600003,8.58320299187977,0.06385016896951479,1.0006782182529794,3.3628570612553865,6.8554221420565975,7.000615668318,3.366772863527767,3.4392421529918815,1.0105547327222664,0.5072789802087119,8.29792274852033,0.9857124963008235,5.652672342673997,7.798750397837681,5.926380920194569,0.9974435152261796,8.851942530230513,5.548901857269739,8.25939075672525,5.26083607443995,5.669736758958912,4.519125154263335,5.087059481650265,1.6504299845904047,7.928327340703751,4.168921687986278,1.3851822217404486,4.995724282016669,3.3281439124831103,7.637467781563911,2.366389086459524,0.08418108237603583,6.208838488667407,4.080530110306901,9.963957471567905,1.936066630702702,0.7061744853482566,0.40746111494815773,8.435043838872154,1.0004412463311296,6.158392833051883,6.17973593023825,6.098042424318908,2.61000246578716,8.227941211499026,7.648610481108253,3.218865824205863,6.980000568190463,7.083110295392066,3.6007269842596368,3.0881286754496062,5.737815462062887,3.0239653216609375,1.7578106035548746,5.867359051605428,5.162628980210937,5.718022548366559,6.921211861732797,5.302845629634232,8.758407028222749,0.1936239934773254,2.700907528771963,9.231362606196011,3.7262902187627023,0.39157816381059307,1.9762115111855971,2.9291959684073055,8.311590081023482,1.0091058648576756,6.058621392631249,7.77830901283046,5.941561426786572,0.7079410394776908,5.5340572949540645,0.5393475368488221,5.119173105653632,8.86432378453847,8.639840502784445,3.5618976343002906,5.921972248229768,1.8008869021525964,0.8792448687545518,3.7196901688970785,6.879267977066195,1.4617369159895932,1.265661129351916,3.919756685378031,9.351922708647667,0.3019124212206492,0.34347963066178266,1.7340356676058155,6.970546725907216,6.738566719379728,6.61509727560478,5.896403082695625,5.42020483922558,8.403549464475756,2.582519964064194,0.8614466035784241,5.099868021134655,5.153584225791061,1.666639220079833,9.765086103772893,8.570214485821179,6.261108578119245,7.749156839495502,1.987963053088626,0.030883366475495944,7.53436840801633,9.86811083589011,5.252499858784951,9.861101400622301,6.688948693317835,8.877277010016124,7.6237861815179215,5.183308105250144,6.026175469066956,1.0326777193635595,2.617747142742455,9.833352832803588,3.4435996478546826,7.2353378739466745,1.4550016169075697,2.982976641749202,3.6646310408497396,5.266370697339633,3.057205072088154,5.032292985579458,7.260560223306081,5.714696011771185,9.191273476934374,3.9864414688755545,4.533297170067952,9.242571242554359,0.7517006325535935,6.389643273553062,4.9103059342627775,0.2911621445746104,0.20945892184851544,9.334205396397156,4.84743397665336,9.938607910825352,1.4106300665383897,8.636886132470705,3.881447604610113,3.864179340366929,8.812211378579695,1.6483643353136812,9.650539360878124,8.875150202441219,6.763240628186313,9.031292396015973,7.635725413204375,8.826857864096594,0.7354462857255717,3.474654328455069,8.603504852260413,6.875654636882196,1.6284751305891398,1.8147964761116042,2.1784271627447094,8.22614025807753,2.382269966744881,9.538468064019884,1.5900711935152945,7.173422345709188,0.5588329969376526,1.9901299543169237,7.090729926195087,0.9894177048367614,2.1401033283395288,5.021597477505968,1.398986825205435,5.57809964627054,7.828828760800272,1.7098488275964363,4.0253088591591375,9.816783290821613,7.345850440738923,8.97000332668987,5.564596408125537,4.108421372275277,0.37546656764906094,5.731493064159421,6.8681066402987545,5.377751307869831,3.9852633917062708,3.0713701816030325,0.11682655648963536,6.059222916281268,4.390756237780575,0.29255747814965094,4.647847515905794,6.13398468103332,4.729997983957269,8.706738144479559,2.6570224491505257,9.18205637653456,8.456005505029475,6.012361463490428,9.070438259129329,1.287641980495402,1.08016998073718,6.218430346975619,5.060029048133552,5.686077702153551,1.2947777623357926,5.680012583707925,3.6534248522585444,0.12579857513809634,5.1685093148765615,9.351236696340097,5.8406587080103805,4.939350089914254,9.402215778802711,7.58728315072124,1.6094632727270808,1.662458124114612,0.810105706657438,5.229943875032537,7.053100216605454,2.10412332119178,3.8545339399479994,4.598328231962128,1.8994891750947684,2.5917564145819583,4.733052543474527,6.916735273658741,2.989631832098596,3.1817921309623665,2.28851699926941,6.377686920511099,5.73854241191648,3.7924535596394082,0.3468051383609838,7.489921099541337,3.0436490915451886,4.740476952416537,8.53727703911095,4.056865762218658,1.0689652496661095,6.450175062595143,7.268193331784627,3.1668582025065106,6.505798774121454,5.536700086433224,6.313051290468832,9.906708905411904,3.3995744039900955,5.897241291282023,5.048380726170056,1.899136046441654,4.334629380483959,1.7566468217942521,6.462227425946844,8.673450902835953,6.083980223580527,9.778126793898217,7.8461192957965125,3.12551469626692,8.23317995833268,5.440542107241502,0.3947472212475067,5.276379525816681,3.4038749942583935,9.677406898048497,0.5836391517594408,6.636033546517288,5.890467939972471,8.273038665365327,5.014480109234785,9.622189776695194,4.777337572016651,2.2023812521311026,3.120049603967423,3.0811789138528822,3.1423680871819326,7.92070133820582,4.237865509959846,1.9739441568928373,9.747313645512968,3.966989267623222,9.93695424612454,1.6793751035412696,7.296779602348222,3.255232543435258,4.578792552749147,2.1441452344768397,9.710995448416348,3.429392852786597,2.250139400710802,8.058373712154003,6.681848719852801,5.8160562596641885,5.123596525876797,6.7272000489389105,5.382974387744895,0.10661221115328967,0.18632070250901078,3.120332639942711,4.114392373655784,3.069592496541007,2.061377677064553,1.1219226516691516,6.371080794957802,3.6114417672135546,5.650912701668314,8.73331382572944,0.38510958239187376,6.012380403960158,4.30492599962313,0.08230934363083753,1.722857068127801,1.76969211147884,8.121383154517206,0.5370925134457494,6.312761468770571,5.193859559084881,3.391785077550038,5.370469116430794,5.866246021014872,8.297682359257818,1.031653632121745,9.0812304328207,9.236754474171939,9.51003240264663,1.5458724622540032,6.144072229450135,7.86070220997064,4.581373669072457,6.833398173226182,0.5329689726451581,1.851735486802053,8.415652509635294,1.9034177754248893,7.797005287174777,8.6740329125997,8.218474646846905,0.25816041625640773,6.479234558119731,1.2168110903463614,8.006125995699215,4.715764484048988,6.03065316747805,3.9205393002001987,8.66948373892688,2.050576015852914,7.127574281007534,0.1821416045329194,2.6362832757973864,9.984988654323196,9.6692708269307,0.12365058125634931,7.833217675366411,1.0979434767404772,1.2927326038534925,9.061923275469157,2.598497414681886,3.4425625541000504,4.1922685267430975,2.3428929542576338,5.653482808356336,6.337218108463927,6.943120053260201,5.7076264037188995,4.538915802519144,9.732430466909861,5.120262963034639,5.126138436225112,4.877905914035237,1.1700480344229747,4.980651583341702,6.293518375084874,8.426980657918783,6.213904698408026,8.928353466288502,2.8654268105174308,9.598490994025823,8.15826017429771,8.42026658598283,4.235057622953691,7.707050039035943,5.301763195420759,7.98084012192029,8.138202404292933,7.9974352989646125,4.114317271711856,9.63658665152628,2.923713210580905,1.053583854485698,7.025555158085508,0.9348780619434449,5.213587817241971,0.8517549141240255,3.3130055238867895,3.2297179488569805,3.564183011690727,1.9305235632571383,9.273149468978401,2.5093875547432987,8.659653454808321,3.68064565033968,4.751977616355665,2.0314550499038675,1.080736496272241,2.9895229926791056,8.663692264360348,3.6021704440344937,7.428174900813264,1.4960472320470597,6.877297076321181,1.4224832988411373,5.591368292526926,0.7764696626538115,4.889299892645851,7.302387039174906,6.545629950971106,7.806095509953601,7.07078279180304,7.159314139049404,0.336792808882036,0.5023099091948979,6.986183815411964,7.369621460464659,7.359317978187296,9.409543591122734,7.230914713740464,1.2176501060428824,7.7199993492032215,0.2604809087259752,9.270480262762655,1.7704165813473138,3.8804047046253154,1.3108707603692182,2.159760610784809,9.456205744650816,3.2684391729189244,5.561838420215541,0.6349839004150271,4.2357778987373385,0.5472523036371091,4.070446782025305,0.6831956089294011,8.658409207908434,9.537138053351146,5.314926097857775,0.6852513687636064,5.909128517863202,2.4633190253802506,7.589117458873771,9.590213298051255,5.639549033249207,0.5341839213038813,8.478099831030384,9.816742799040787,2.0366323940088282,6.538203830488705,1.2287191950976917,1.0890709944923094,0.7516831950636949,1.1580422022134695,7.599875335686946,2.908426114391871,2.097700636594002,8.432115196604197,3.2327055911975755,3.447774790094129,7.514705721007178,8.7047073294364,9.761798108040887,8.530220904903732,8.234626025978525,0.9406559889942789,6.148801599751739,6.758914217332324,9.243068834461425,0.6213684265778441,4.117523881917409,8.154263659197508,5.615378145086658,9.856162738211882,7.235557487855743,2.426123704560692,4.058963295079141,9.876039700941917,5.411543441018718,4.161581578776592,7.160831664901459,2.677235984195745,3.183273060500429,8.812881450968941,5.000860610287933,6.707694301391431,9.07581349387054,6.519930221569739,1.7536525845398199,3.5314254418685964,8.958736614724621,2.2392939220926777,6.697466197844745,2.5222601753013563,5.262865817795723,0.0957109306850712,7.165563960741219,2.4927377667139994,5.896528170182977,4.327283294691828,3.407559774668243,9.412637095187977,8.3414858536352,7.594550599740291,2.861580336050189,0.20495687122592088,4.136434880560151,5.16929675483045,8.290154939287703,0.4426745066236992,2.638925704141555,4.992526084299163,3.5498998861110054,2.5389728836945835,8.774364320653776,4.083614253099402,9.416412520973164,8.455371163503408,2.442904255329883,6.650696762481725,1.365230925633265,3.842155408478074,7.52606261810731,0.34746866843999635,8.400571039172753,3.0082868085663406,4.719322674689921,4.460080736558856,0.05582257751206132,0.46921267614634665,1.5247629988049916,1.1111445709994872,0.9333876884988501,3.634521125140404,7.383847047909249,1.3299287194210474,5.970830384895887,2.2085186996699813,9.189271552875635,4.784226116390482,6.227559798336591,5.177442634858664,2.682467595585325,0.18342993581282885,3.0711330318460583,1.8289119330536652,8.7297083201613,1.7684920062058285,5.3828686191075885,3.09766291776876,3.5787131918634496,7.63329030304877,1.9318348509027405,5.667260642536518,4.569637469859282,8.940927398303629,7.37368783218582,5.551620906200975,9.20088206838846,4.353368906755783,1.4159094426846752,7.761750859639347,1.531689005558492,7.419164794217592,2.03337917297856,0.7011087671127658,8.120162412207904,2.4238947867070415,2.557273701297609,8.701828724931078,5.411570102269017,3.996359002127865,8.371652510752982,8.98322930866902,3.9543901145382,7.7132329408436995,6.637329974320558,8.738837144881678,3.4834246015830184,5.665692574772645,0.7492005891559317,3.2731973097906897,0.16697363710079127,5.860007648467473,7.909183918029015,0.006514387394251919,3.9826011614627155,7.735987057229739,9.976499309432342,6.5437384225095645,2.8576515970175653,9.588080142065206,9.102362426126652,1.8384346050363831,8.656010889194633,3.9008388774490332,9.55544080536862,1.3229715930731345,4.727198840805247,3.6922385604358587,0.5676055329028551,5.294363861015574,7.231585487042784,3.6097649835445145,2.9893530349943798,6.286065690552995,1.9442203445412676,7.521834116232629,9.801510155548103,3.35522065503437,0.16331153281382127,4.654140691740674,0.0050493679598973,5.139767169693796,9.667840125669372,4.9749843378382845,8.515107008202287,1.72072786199033,1.4973545606122651,7.2729638059375805,1.4238797901291078,8.452564523706616,1.82026160869444,6.093932222433405,1.938889664892216,3.6667149376555375,3.960849925984413,3.0566159907352097,9.433276404433578,1.0911271400297329,9.475677865656989,2.8967470936954443,1.086308076655993,7.341825915617772,7.422610261089726,2.6511205437870977,4.084803138690718,1.0657135335068713,8.942672843369428,7.338701787802179,9.672094813504863,8.858537952219685,1.2885721537821038,5.812659337329706,8.840260453143046,8.530667919017127,0.7011648303075968,8.181819323733631,8.606493958939128,1.9852644799949526,9.51052120596026,6.9951797401107285,0.6626155327826022,3.2802403160118154,1.2997854047312352,8.70494955337876,8.984174988727766,1.346743395054324,1.6819466069911226,8.913932865964885,6.2193948769545955,6.497213335307825,9.583230429675746,9.59632727458363,2.039496496923059,4.793404673930866,6.963922351308991,2.9051438815717945,7.442158393559843,1.2265367796024829,7.335068022808673,2.332372766246893,8.545317375898998,8.285283844308047,3.1920671682678714,4.703974728252874,9.621166570451775,6.037273697075642,6.704710029758347,5.967126407207417,0.06766441901316256,2.808011451497461,3.529889727276796,6.6176676262760274,1.4137671231960902,4.051694023672492,5.378426886344824,4.698079666044464,2.4008954620949985,1.6978399501401098,1.1473424364722584,5.254303565761546,2.240130582467128,1.3926464121538196,0.2363729067022624,0.15965823516737476,7.7081275806878,5.437780364776215,5.8354183172545415,4.0980072940475125,2.9704651353294076,7.661593779972453,5.942074926897368,9.399448323530763,7.69127904764682,4.340308550472114,1.988472729055446,1.178983904808797,1.1140025043327673,7.558758204619829,4.3897096011335535,3.0636231927920954,5.342821239284454,4.697318392508121,6.976378252888682,4.968339268383383,5.614962952950591,7.098985153848005],"x":[30.003866106584134,24.133727508378513,33.590920552667,16.37032098576057,28.190835061849967,33.27360406090755,31.986162913771288,25.472334860047127,35.657602719095266,38.080208771082894,24.940096204438348,27.882517913936898,17.420821097167433,36.45963019212179,21.53494514017575,17.06057277674712,26.102252020396378,23.179210643471244,21.16733334362393,28.944878709127153,32.11775800939652,23.640568027530485,16.782464034909133,24.223199326357346,12.056035255134445,21.00476496099965,24.769884669230123,26.665623250390606,22.706580620020496,23.497441461275052,36.266867336290446,24.837118877602077,28.147123308080822,29.227686818527072,24.396810182656612,18.322519778700528,16.699323114848728,29.960437265532303,21.967853298280843,28.0733580862191,15.494619194870161,18.347148436072086,36.083785001609144,33.6651312800376,35.60116249550183,23.782755195845095,36.96644219222785,21.345205601760178,21.619325924633735,27.110561839785525,32.80187876068025,12.961890944125638,18.73093055293147,29.665131159108434,21.970628876898555,29.632566609672228,24.62800654831496,19.505274946770353,24.296457484509574,17.22887202365417,22.71309696452239,14.495266974440153,29.696571550602016,20.58439148995982,23.509147557547376,18.769563795347345,35.207623625771035,30.258660113570834,28.647914660033063,18.38898823785898,37.64991272582728,37.42470328308544,18.40874405451366,20.296387824984244,19.59704479612516,19.750466729206128,20.255099198421213,26.675636983156362,23.768841071772336,20.578871900961737,38.70899653166197,19.451691648732982,30.570248812011812,32.6121626490046,14.033099981928538,25.143692093610436,32.25757432615179,36.51371361446077,29.515934962462794,21.147306420179817,19.68487291686182,24.02217503841063,17.99968463535334,27.58471245917096,36.888834881209476,28.85084551716758,36.81737109416258,19.953130053259397,12.57270486019149,31.90059008149654,14.143099669439405,27.62558354144474,27.26139320106296,17.094197232881047,16.560751922869034,33.80182984695729,20.778941428590628,31.380838080195176,20.249218253459077,18.730966572051777,21.250661191046433,31.197153132211945,19.182646354109558,31.289594582086366,18.833315050344964,24.854692933197033,24.988399515071777,14.69162336297364,24.465266450582952,31.41642936556518,22.440820480225476,18.21051517933252,19.37741860852985,22.84462878908903,22.34328803137443,24.55825170659418,17.885740424588864,31.79673575813847,19.760880268633827,24.535211217400562,36.48854959284292,32.522268584866495,21.21634861193416,18.523744173540152,27.181596339775353,29.18327000735488,22.66156241736502,28.11179927887808,18.73650006558393,16.55820649755512,23.01270589306887,26.18785216514444,22.132799434861028,32.0806570584347,28.098538582039353,33.21550998006407,20.453291722092246,16.30586714326617,15.349979827584106,31.101089906421358,10.39629989282211,32.2188794737833,20.192595624683257,27.576134643015372,20.828370583942856,29.516040573837987,26.69110660944804,26.32171996786147,20.308104419882792,17.365216727866482,31.08543078185871,22.58950206154864,15.207123831809612,29.640000887033377,13.424581031498704,24.47619783276445,29.591548279328876,36.64074476744943,23.096659061580556,26.444052372292546,19.105813036092098,29.909673554103644,30.45174683707128,35.11306608828174,29.2384056767747,36.10150089003463,24.439174946178685,25.013106191644695,27.380936029331277,24.40104317389534,15.989658623927397,27.714900241079455,19.479418894766873,28.222775895004883,10.930394380748693,35.47570744205608,34.20447862753498,21.932427463860343,23.31871716454985,21.034963312687324,30.81851503054094,34.9892438343853,22.038775528149564,35.510162159892815,21.45844424051318,18.487848823274224,16.717207866548872,14.334696175838705,30.660232795042187,14.483429134683877,27.31499367319423,30.220625062169177,36.10414743705638,21.005629142579032,26.957716550260592,31.358514825731373,25.441450128326405,19.49418559433618,20.99619751546992,10.658868506930029,18.220701446355342,24.933753115491356,24.734619579495735,20.00368192355992,20.085537549836477,23.77086224160919,13.735318690995546,12.157518498044782,35.3262387013081,29.622753458575353,19.9394734951682,21.75823936459915,31.354529589612767,30.71375772081044,27.552527554077777,30.430538803775306,12.908420427140275,21.50827980168679,34.17547045615819,31.7453613369445,32.931654200569106,25.391261669109788,34.363767545974255,30.64629226295726,17.803554133837583,24.466729622280933,19.12321206573694,17.178932161623795,17.85037215428777,24.31868599558277,31.41045093467634,27.84834304963504,25.29845357362296,21.259360112935983,27.396275016234462,35.43386913270619,19.98585376301496,33.10037450718239,28.95118886795763,20.120528812829768,14.644932492005374,12.472761890664358,26.384138997854155,27.05423076082196,23.323565101243155,28.87262480508929,27.922805814026383,31.76739698301644,27.64091977785556,17.217049094381423,32.13783834458714,27.972681707494623,20.786067285333083,28.89795890739105,29.966534315604644,21.580686922121934,23.903033777678296,30.008498232508018,35.315546569868715,37.13305938375865,16.081538236627964,19.18427395875261,18.701479796772894,22.470898617896637,23.044260632791225,32.47869594263064,32.6213527873466,28.616305586109192,24.47537414065033,31.552647644707243,25.942266680824083,16.833881030611845,21.88454569228415,24.325934265167767,13.576246910884677,12.645339864082192,33.33063922311654,28.62297409588173,28.78241035300866,31.77105864937455,38.68555748477611,19.038451699305007,28.7801877262105,30.40255741703244,14.924907194763886,26.212490978863904,26.70593883167085,17.830476450688572,32.456261157794884,22.98211952520774,19.705659905390856,19.913429489799654,18.640317928236982,20.910623265001387,18.167394327030117,15.363023083109276,31.835940257305005,31.765040078406656,19.479315542829383,14.993893143505606,30.223267372395664,28.977359805218036,27.992572443854158,24.9026858354225,30.258921873540746,32.8989340912953,29.630361888213795,33.62553756414958,18.703818079051693,27.041871866784508,35.475883408652074,26.76322278179928,31.690155009936927,17.113476752169284,17.07833688692427,20.858034358677568,15.968453873348436,30.704131443264522,24.559105755393052,20.150641660251058,24.73725541663116,24.796133072624027,30.810362360930682,20.793510844451667,12.765281968226043,20.7739155125267,36.74376838860244,28.94066933417408,19.655485620056215,29.483190362622608,28.42094187949917,14.699269139718524,18.682298043606274,14.529838675486587,27.65982122331498,20.236407208003193,30.04222614840436,23.79989186325423,26.042794004334795,28.408090133201874,32.6860725565723,24.752573776373,15.65757230982693,24.508810839656146,20.706077535645573,23.527301261671937,23.189219784689293,28.508861054190664,15.396281924078789,36.59690114679431,22.66409003715082,35.689749279591055,29.086443139035456,14.74241388182309,37.99586179433993,39.00078992925884,30.031735349833774,29.12499927435705,20.622150738157323,13.09735403353369,30.29211968696211,22.03996377347764,30.43380451986409,25.340424914974655,21.563878822641282,16.22895559302374,19.313183421470306,28.952386332459415,24.618830736103273,28.48952096208513,26.461715917681094,30.966504657494895,34.76489787109058,29.48946455276142,37.820454818281874,29.40467223948264,38.147593873888304,35.203043059645665,17.96524738938426,25.87781000747978,23.477435719163893,29.944277897303074,32.81814170898445,15.689462138936959,25.862660815767804,19.50154399994439,13.089673156866311,18.252396006780472,32.878566460348,36.02145431269384,19.467339746885077,23.44152900104662,16.241289786854303,30.063100033683092,14.06135810402355,33.15028660814696,34.06526801381531,27.54111120713727,19.861663286564866,24.574939677439893,33.1425773836139,36.506513662799804,34.40688792721873,19.616412326691613,15.293128995625857,27.466244005418737,17.674482707952023,30.716913377579722,24.27265478404834,11.586643114084243,23.434649021121178,22.84151088901416,27.79337449190271,14.754309430995445,28.814485314077253,29.942012436486813,24.4582404263738,23.24632527948475,12.102638798798571,24.60720021173501,26.927907039404197,22.2974506585146,32.8255139518479,15.161490181146686,28.078852425272668,34.54427301966744,21.85306039875929,31.437725028519452,32.72929240894247,30.4208430611731,16.019676519685213,29.58048645686817,21.55502735956602,24.12496512509152,30.234214959344456,29.947070557649255,34.47796468775445,20.758367393545537,20.022064518193385,29.2434853854528,33.4709209484373,28.578636555282028,18.537445166304508,26.627483306148193,24.72712886213479,25.485062015681482,23.24191080927556,32.545056292241895,25.79707772801331,24.050133222696605,30.315231721582272,27.675721368922137,15.000431683568353,22.2580816834746,30.874096404695734,14.448874076886435,22.797837710377255,30.964533543814156,32.50759646459644,19.128065137961652,30.815340982851914,28.059732007674853,25.722854482243196,22.211449276223917,23.016367775792574,32.32296127173457,22.037807642824813,39.40229281429996,21.6602040060235,33.672183646134165,19.65649970720627,21.1570459948604,24.87705765289072,23.398767500519448,33.618097792934904,20.098460691640533,24.084695315514374,17.4559108543978,17.77330577298092,30.365162086059954,32.52220037871561,23.232034727419922,33.434268390932395,37.50805257351874,22.353682906721332,27.232065203620657,19.7052894507388,20.436199744205325,24.91211940172625,30.21640967636271,21.048352858130677,34.71255626911011,29.443448239276602,25.481037095408524,13.7748629108996,21.050021613236538,16.933973499352355,17.635156442382424,22.19209980153626,22.691063363746505,11.927239143737488,19.01631113115118,36.07683030566694,23.989540844577306,20.669873784101487,15.911965809561764,30.099985423387782,14.564109065692431,27.3197624249888,16.880802955930864,29.412448300822053,11.515344654310809,24.429067842913206,28.393849280494322,24.02579392544169,21.085945524508084,17.54328674853951,29.83548828904525,23.82335237841538,33.24559888966584,29.27515866350251,28.785028705276687,22.09758701541272,23.608508677934893,25.124567806754733,28.944799097677887,26.730034470650736,32.21324795567242,30.991342230554714,25.195468027197826,21.780680610724207,15.312100945296015,23.3215047328325,22.822099557632583,19.13703499771055,34.02678333758681,28.105910958765723,25.743202113492988,16.14577462175655,24.659891991051083,33.53291821774011,14.98620294905994,17.188352666236565,31.206113658250775,12.900737806241668,20.50374229441512,34.118018307331255,28.534350936656768,30.927778246078084,35.569108183803,20.37722068095413,31.751329811456205,29.594424758978164,18.72733000944936,24.926988061648153,20.57027156998074,29.14688024546026,34.05221504747563,15.620308026100854,35.12262761774228,30.701424680928703,34.97924447461632,28.82484266637479,22.507387361091414,16.392877555836375,27.645525550387458,17.586758373220132,23.919058474479684,37.62201461896903,29.213061035127623,13.193065043551757,24.51383133434803,30.39959329743682,31.38199874582825,16.662388710111394,21.442002916822403,18.64936570790408,29.053900602666836,16.628004580587245,25.70230596218918,23.53984798836698,34.49181215568577,23.99245455372262,27.94959937741408,27.377809917418215,17.80193157297972,30.951304680087237,21.689282883545125,19.358089325838833,17.886972835087253,17.367252306630025,23.256025594840363,30.680421502763753,22.924711839016794,33.49254642109956,30.614332550737494,13.219001563938068,20.86228405996731,34.572002421014645,18.948449401867308,19.207480591686522,34.18089907581816,22.78649381298959,15.417127516716352,19.92489277863129,18.303461154324665,22.121097884263857,26.58773104010449,25.34651008040812,23.458787118237872,25.49882446194927,25.8141613225538,30.983913170784852,10.707982575679537,22.715138077637313,18.469501400954655,26.934942498718115,29.633735640324947,15.811590495247689,20.549865458657088,33.68122894566238,29.847336035209956,22.296759451178346,20.49466200785278,19.093204634027174,33.055131733600426,16.925025204323433,29.72906346797152,26.385130691164314,30.996676060122113,26.237843667589235,20.535424886660817,24.85832192027259,33.43575333364855,25.998707720992314,29.708124026112298,22.509592268971225,24.440417664716776,27.718895965890013,23.932500882495333,36.22985912039832,39.198800643428044,17.31571341103411,31.272107203525614,19.69219349708026,18.114943476493295,18.104180271216656,29.742653242477253,24.4899723710557,30.523310492323077,19.673354940986513,20.136089766760403,31.286023325493936,23.147225531101853,22.474621449363415,39.09059650096542,25.810989186053995,30.0372273794455,30.512512085830807,38.369980895561696,20.08041696328388,11.241677255287705,31.393939253985824,16.015842997074394,33.48817226613869,20.670932299450424,19.731990564642828,22.20433226428355,18.062749971845662,36.648258328777416,21.999931505275853,27.74089423392776,19.052385344027712,30.84285378554405,20.49400919135481,32.15125524928038,19.215647793251755,24.01897050099652,27.94772876808229,28.141444804287914,17.250542117612433,13.604777059072042,31.63817857988183,20.06600975378846,15.828461303397464,15.322153230932997,32.668061779247125,25.47667637309116,20.690157316378873,12.10295483266231,32.67952604697402,19.366717987551645,13.417462332245458,19.10659028126831,28.041709122975995,16.45235156368373,21.346383019198946,15.512579319935675,22.652546941656453,24.47225563726994,25.08955802207204,14.174720274486347,28.013589805799487,17.811985913591666,21.698476303852974,25.06573371818363,22.318534448379495,34.0790751824515,21.084643816097497,23.22682074417896,35.80468975321098,30.626850897487923,29.496015813817973,37.237310312377005,38.68382793154318,13.118846642535008,21.405037940396028,27.6335822489216,22.210480486441817,28.794911098172733,25.15413301692865,24.88207823482723,19.831142560004437,33.48237828476621,14.724617494162185,29.397338949338888,21.083770354583777,29.988376621466024,27.669238871445526,25.566256257588527,23.4249252776872,34.59107493913318,21.240637073531246,23.109563712158945,19.627558601672845,33.75872108393798,21.29889243037485,16.919212390880702,20.980283060876037,36.94811708282248,32.75037428260543,24.467860018004476,24.98551797650754,18.63648016016554,27.985578300506198,30.994233019932896,20.652275507242123,23.454911763422395,26.728942219049518,16.183463789851125,14.96510618557209,34.68063570694877,28.974322578295883,26.36102226067713,18.088358120941088,12.22291756821171,27.67887812686125,35.57932216187543,28.847232415737395,19.657593374821776,28.708185981972775,26.819809861389263,26.02433811411948,16.405676136043986,28.539098259159005,27.38424585117992,28.230548306827487,31.77431885460826,29.362110947592267,18.187102098294783,18.50257577906305,28.158654893002332,35.2232485758078,28.06570349201848,32.01091687211763,30.880938324405463,20.968988807665056,18.50348476660285,18.983551275995,23.98696238969918,15.142778783688833,18.332196621032296,38.70922246561521,31.52531714570487,18.78718526698,28.427890042674612,23.07397709976278,19.67688947161865,21.34086629149775,21.545740205280442,15.167115501914656,31.504415691241263,28.973688556423927,27.52648615586162,26.411003510957336,16.804506887022846,18.818132756579928,29.360152526169347,12.909096432908015,35.304676261369764,34.51972763734494,26.544740192892444,32.71003066676576,22.97710612280215,33.10319592991997,17.227859397367247,28.347166260911067,30.970326705963025,27.40868043741896,31.59535655744144,21.399458404625214,34.26413719081083,24.23237078336529,19.721521903293244,20.17395038561849,35.83910896641311,19.008090323196424,34.604890339358064,25.776530844819106,27.495861812869045,21.104140141729303,19.95851728155709,22.704736170103217,20.19726684381653,33.908044105675124,15.448352138070211,34.020210866342545,27.012228112275476,23.524977710424125,27.419552279491235,24.773975648413092,29.603592214313117,23.0553073911344,30.908317181461882,30.407239288842387,29.89424748960841,28.309412983629223,35.474942736813674,29.121224726850727,23.43278308577637,32.74202256634261,20.85182908007429,32.30731143727347,37.66548707783282,22.486016252888785,13.939449335611421,23.847588060231153,22.750612400385627,11.43628486299884,34.12966911479577,28.632305361717926,19.775400164047692,24.063545004040364,30.04153244108857,37.97249145767926,21.860472100161502,21.90932395063419,18.797134488794015,25.980394499240383,24.093754636599076,31.780402720426785,28.14754624815589,28.25002794171154,27.465207859667185,30.23078543429094,35.69262233247936,32.85184583358377,23.5847460712648,24.978760489114904,28.581195703322802,25.084282142940474,10.676938480011039,18.246989120168973,20.79304447074019,35.82570112325324,16.58112196986217,27.297534916351363,18.397358106954744,30.416247798504266,19.437529415992387,20.345873807908013,22.094752455141016,35.04779779128357,25.127723212320248,15.222650742877825,26.582214591811475,15.871077144442054,14.365885196037718,19.054045125684944,27.527420029095033,25.2370300856493,14.029394937509576,25.123506076539375,21.00464532152218,17.09832193027102,32.3688346771696,31.12385118963593,32.07635935780169,37.370958045456824,14.258229648955211,17.216374523165797,33.066916014596515,16.763495378250177,27.162242543065588,27.109902600505517,32.11915574532242,26.41225050868,28.62473784612822,21.88446660749794,35.91077519931418,23.762009457922755,18.753726055253253,30.61534110812768,27.953605010647706,28.633908067028912,27.075835228228918,33.70015207220509,23.229475023930377,28.221521202515735,25.524572161645615,34.26039349155531,15.813983845024232,15.405567379044037,15.865235159661284,21.167782121315526,32.69833415603407,32.42010424453339,34.247589893442814,26.33832720088361,27.10763813870961,20.00475180688705,12.44293352615653,21.283990687084447,30.604008141056234,21.34061553626809,25.66502180303575,11.309602611005191,36.75121497692291,29.126068647969117,18.50422293796683,36.40890744386553,32.55279392405538,18.711896669219374,34.662578785551474,26.243633174940854,20.93526285340602,30.6785123600916,27.941362765134976,33.60118473762328,17.037927696092318,22.937949914237876,33.53784729157534,15.184617220089635,11.736715602426742,11.795545488602174,19.246857357896666,24.45792957015062,24.065993128648486,17.75894394131243,35.78011466598335,17.925723656502257,21.55416802494426,23.464526584076793,15.737016392772283,29.853131362322948,30.304776216001642,26.815865048195242,31.757401490810217,31.990415016932566,19.172359903395034,37.51966678547859,30.549848182711493,34.546805782241684,36.71563402367082,28.28373892297967,32.77186391359348,36.645653063693146,23.758955496683765,30.396538324333505,35.557725915835846,30.16994966795675,22.842804062337315,29.54196830413249,20.634335555046334,29.095778200456536,17.948928774775425,17.33358281389929,12.541062760010496,28.527986773847136,34.700808996618946],"beta":[11.418391265806001,10.509163491622358,18.559937751279513,11.52908940985279,15.197464640729404,18.965117058748376,12.559992972167642,15.416560488786487,19.57037572987198,18.60633413820004,13.650603603084342,16.49355171103623,16.55239556221565,19.748358507847566,19.400925631651784,16.55525877640481,12.286259952878796,15.03257228683638,16.46605935411025,15.773130672302326,14.141251011426075,16.89410707882494,16.76271837670896,15.117367187621964,10.654516412247485,17.680675821191173,16.112970245293862,15.633244226988385,11.046986008034647,18.804927437164846,19.94169113020139,19.362214237714973,11.244080124026558,14.386263205144703,12.068027363389149,12.494298505580437,12.955503984253095,18.702635898935057,17.99563662686151,18.208157173647365,14.477136080771349,13.77583137365739,18.93197769967054,15.900996853577675,19.83893383472953,17.736042505972698,18.588689927818002,14.512201545177497,13.563679606395178,19.914320600733113,16.745348346436934,10.377373356729944,10.193550668369419,18.726329787283166,13.879881601117095,16.711389939932918,11.882170676278772,13.692295442942727,17.210842478045677,15.698297219963237,10.218121711798876,10.073424534110963,12.15487632852186,14.401634237266865,10.575142043701732,17.83201119403202,18.35465823128213,11.447701747607402,19.454649215378563,15.769460872402167,19.11396696796836,18.45809833672366,12.80432437007297,17.292552480993805,15.900025526072953,13.249717248017188,16.319290119413566,18.801533143167024,12.321129308689462,18.576108457513193,19.616719297696022,10.045875796127142,15.672939646419424,18.7351418171332,11.881923140559216,15.281500425469627,12.687711622252465,19.139655440896867,19.87010503178669,19.557165356938974,18.16552460932435,14.832364339915491,15.800261256726042,12.200639109378766,19.713675983970802,10.596580679343177,18.951857212211927,12.754017075236776,12.131176330889808,17.686579893533604,12.247329300160079,11.872936535281722,13.584093475042966,14.5255746973167,14.95674288260907,16.180913889788627,10.734733004354172,17.156460657884416,12.024265253686986,15.178422482131237,15.015546053697443,15.477082670730319,12.355828509943157,11.421513660987442,12.337815623795695,15.5150732231135,11.58973505068278,13.141774313374302,13.78683051239735,16.1489877088578,17.184562319815264,12.827310553859574,12.960436935126069,18.239770590207996,12.506372301113762,11.175909305165499,11.589797740652848,15.093457681605976,10.9897393032753,12.43853223135552,19.341618988346674,16.914781744963122,17.47402467943014,11.199841504396758,17.10323116696986,13.89100891858999,10.277127008856281,15.52983859764245,14.668515943794244,15.783961494992075,10.744780567476992,12.085148878460195,14.317113256529064,18.126033262983526,13.969258070218128,18.890368735559075,15.520143643626835,11.119017298404081,14.071103859588334,12.781334058282567,10.25395594247037,13.240433164168078,19.92835427633903,16.068301889451693,14.17118617154914,13.349246712221877,16.462029252230487,18.61796990104598,18.854144454743924,17.047953035833256,13.882213544777875,18.619851152314517,11.34886514309673,14.619820736167084,10.913871029889892,17.118721724066084,13.826004798845617,19.06391486782769,15.129652127645585,19.987527950165507,18.08341987221788,14.135277832097477,11.122212857568332,15.97291357145261,19.28791986514673,16.88649093723696,17.389009161210623,19.49670618291033,15.956522734630592,15.510275636506176,11.835089049296474,16.831073920341115,14.954830501192744,11.742682616804451,10.831513476986391,17.81622383953635,17.193297743701265,16.362277172804703,16.221531112964012,12.213691175971917,17.12727073514675,15.959060799716307,19.576315847705466,15.777002253759395,18.015401789759032,15.00728647696495,14.83733629844574,12.660801029472932,15.556883075992747,12.055144407122913,19.049910999609445,10.861261327304994,19.325198588375518,13.95795671140677,12.781289223374714,17.529866241917787,13.759513820325918,16.642316614770728,10.466497349963408,10.638609369974537,15.907274412995324,10.141990025407978,17.156948864301782,19.48350589629768,19.602870299191117,16.975459354579485,12.575308823228848,10.968619323768419,18.89950000467716,10.509010304683375,11.006463770227231,15.411169047225181,14.909920855493253,12.268594872668945,13.596252494579012,18.91258201127938,10.727518893483952,17.564169482612428,14.817892579643035,19.37357247642646,19.24981860405296,13.824059672755542,19.425938774313185,13.909114378571463,14.713662581083142,12.415837503643235,10.932769554210275,16.326314138642044,16.319890083210407,13.725747717784468,17.71295916238204,14.088792864839528,17.996912106794095,15.127802300833618,11.468518514312676,18.757575913384393,10.075752716218549,19.4738963639757,18.6357933161421,16.710904575664387,13.209247782063153,10.435339297416924,14.537342449400665,16.26195576850158,16.4693547064604,15.236121449807555,15.661570964376317,11.997944966650662,19.547840708760006,11.525420660438714,18.115321856476584,13.582030905550909,13.506953610285947,18.937195752997496,11.942302964845855,13.762807482526693,15.72641888652075,17.701948835036838,17.794574391433443,17.338971012555383,10.673503016406084,18.9615784676735,15.653832252385993,18.142625080737496,10.342875635651534,16.644137666880873,17.014216589650808,12.497666795690845,19.739198568042248,18.680704309104506,14.484948750377297,13.95439184453367,14.820880766220325,12.069604396644566,13.498755236453475,10.240822635308895,13.58509187009375,19.90380755001052,18.923994066444518,16.67364249262733,18.877666682006904,13.480368350479457,15.412857135804032,14.923226951841757,14.264614962867592,15.317517872281472,11.392953560575943,12.975899441623564,17.5992527783391,19.768261116804524,16.500859305985088,19.133543254847027,16.797920961271807,14.707297723236866,15.179722906102544,11.925368281565751,14.364278829067178,19.48141727714468,16.142593805986962,12.356388846859643,16.678699536284856,10.21829150236128,13.259261666366553,16.475515151756966,18.832158334875214,16.209153999891534,10.020364920027042,15.908117914374653,14.309102264331324,16.479636320139633,17.868392323166916,13.730925418334616,19.0476524654245,11.965481311615429,15.43071933960321,13.48023347312832,12.114180849121594,15.439213832853484,13.851629068016427,15.971052102776166,15.294432212855664,15.717834981407215,12.439912343783151,13.126282009879503,12.494017077404314,18.192935525442948,18.529936991381838,11.02904738067016,19.06481017375033,13.039049255817993,18.40885282753615,13.906537024589474,12.388645658704183,10.705113336388655,13.484016538451076,16.276663137628223,14.579335161290622,15.302090461817583,14.42233563256986,12.589476988744808,19.771674754581806,12.581556094418684,12.330331703573707,10.737527855104297,16.804545826077764,11.927366722928863,15.450588701834388,16.20430325987757,14.054250877239362,19.226425297798606,17.225927754664966,17.263984965283726,19.980689113585154,12.553643793257095,18.779285724166833,19.365802100645432,18.626511797211514,10.908847225112792,19.792870993631524,11.232060391909283,18.644669207087375,17.683172490579068,19.623947749924895,19.134941459541217,10.437894847213862,10.32532632655121,19.00552406019311,10.913812388883084,19.602048181116032,14.742928255217018,19.25774294424169,19.38411956888894,14.79608745979631,12.884837056382352,19.971949557005892,13.36698375301912,19.228440525266183,16.592662517007923,17.361813996897602,17.58887214531388,14.065489410303037,12.645025181774312,16.349737607001096,15.589220429758537,14.510882401364265,18.743661438878767,12.091333092079921,14.735833342542414,17.55861708009536,19.204638561235836,10.581822296120219,12.997939080087173,13.177106140862794,14.241814507587465,13.655137984816026,16.84857973341184,18.141286506913602,16.490065561778483,14.33041537127271,11.251424024573407,17.501139642416476,19.60282310588113,16.571478467180683,11.15328832479279,14.373903423121533,14.893844993916137,11.146133364873451,12.073589201642923,13.673239885198207,10.468247143109334,17.20136955275697,18.03760372427348,12.446556778581217,11.761285026331926,13.201530037042035,17.032679340932916,16.864555304177337,11.875585332854326,11.020113615838703,11.80126755517524,14.636401859957788,16.490285978147398,12.879319620309616,13.772357700047769,16.067284590264936,19.814555295005047,16.019692561319356,17.738216469041586,14.332907065363049,12.754634827485155,13.152633113396401,19.834864226018112,10.644191839610137,19.054813767388808,16.431519197903484,17.08296825738824,17.936578508020904,18.196315381697126,19.79022060562407,15.501865597619355,14.618745258581411,15.465220430508143,11.300967354636697,15.348665464943327,14.017607423283973,16.543111246984996,14.148892979805241,17.349542481562658,19.265696154217693,19.140567385684996,16.558687414582238,15.556369942807763,11.19643470846983,10.288596552539458,14.48574632000479,10.946975183629377,16.373531168060197,11.509205926813738,17.867363855486012,17.900563068067886,18.252999770365562,12.78503525453181,15.643500279921753,18.78006869185503,14.570513703898415,19.24124413041304,14.397997698230254,19.550784128575813,19.041470319926027,17.96105565769397,12.020769012413302,16.961354811936552,11.321562283540816,16.363162370420582,15.109547624868396,17.145961308148536,18.280177323294733,15.835182277228586,12.987647460836431,15.117892876123891,14.837527816118726,12.679763605066558,19.93377912461198,17.70154246737382,10.511078589467228,12.539784887626686,12.57498869594592,19.62942480734913,12.881330732880267,10.933410308519345,16.59450503022974,15.909641010683181,19.062403085369183,12.747771147302524,13.520431601800802,18.104233657454504,10.283612654667833,13.161661010624341,17.026185017056093,12.014601998542258,10.657509648778564,10.70031731875228,18.101678710835913,14.211766224021904,15.668918655433647,10.838429510904854,16.706290030052546,12.625429402621664,18.063060400555997,10.851705259197766,18.754433153500333,10.173651276282637,14.612301791527111,14.660517117038465,12.527522814421859,17.049199873095517,10.983004714172004,10.257293273722127,12.167152307450069,17.87398954979151,19.838433396569343,19.276790343458362,11.050726554414926,19.862496430729095,14.539687782951152,14.778072079820735,11.639645819651776,13.567768932366748,14.770638546162289,12.203249219762641,13.517003410068968,13.035926274004062,12.99618944641762,11.901678517445593,17.290650543870207,18.209275115449,16.249005155226534,19.196886121534963,10.247234314861178,12.537098570518602,14.81984307485506,12.700089829028482,14.08168197520797,16.64504593824136,10.764299942013185,12.590056730244479,16.93106342850536,12.656834194934703,12.586624709116245,16.882654795656382,12.36139325156362,19.738977046011453,17.975168702824995,10.358726021396327,10.189051984211275,12.809545922720009,12.400363117404968,17.566258683860276,14.816537506667364,15.517412646999503,14.357454332571534,17.40005715490596,16.114475389028186,11.029231946835445,10.158147456414294,13.254498235951168,10.006404964489624,18.926022957400562,19.826397534797227,11.446689190761212,10.834589667356102,12.391143630233614,17.32883754667627,14.620778269343402,16.40934725945619,13.106548200828033,16.120550073119517,13.620407816234392,10.113845747709838,16.067835566444963,15.132912556283749,15.30216640496193,16.384554816797333,10.927123881337694,12.422960409107812,13.338945264821533,12.91304814862951,12.1291012141766,13.164719017468817,10.12890649837275,12.462522888651629,16.53919115743639,15.375873273849205,13.768411760110489,16.678786773529954,11.186286383098027,10.189811003828343,12.122216081679928,16.904619773905225,16.57138229393407,15.494899053515779,14.80961683809886,14.1812166567912,11.028383050002388,13.024329982232281,13.59100553279806,13.22552609596216,11.933694963476253,12.588680787110171,13.5793345327236,16.931935023170794,12.57509018719524,18.674507304414945,10.25997854514464,14.864909879103633,15.19391721137405,17.49837549409747,11.446106094174542,10.841649985171646,14.764202185982576,18.784717510644864,17.284398996768108,19.090747301436885,17.539157549397224,13.391846311049587,17.152587054056916,14.566369891896278,13.682543436982765,16.101469674842992,17.321085095366637,16.049259062264404,11.341409462666387,17.594268348271463,19.4422352248791,16.06698882734655,14.435425631435837,19.63739572921042,17.416054376797554,15.553299762917936,18.224714573602615,17.053153760014048,19.933024405086798,10.561101719232282,16.05305123066678,11.357619858116138,10.279244049616775,13.854758075956946,15.21083943901816,15.892379728422538,14.213902788763432,11.864548645990444,13.870630837223585,16.17278746950256,15.741633534159718,19.65616440237185,19.58684038293635,18.70304551421637,16.15415978019457,19.050319036500177,19.23145785431177,16.561096251057833,10.985805469307152,19.835142023321524,12.40567826720092,15.6430916704067,19.338335482935562,14.673455742606716,16.31022874974621,14.020164276286993,16.90960438797414,11.07505583455205,18.529047890575093,11.653633730260491,13.213185443417785,14.829203172446803,12.368155829267547,14.259895789218609,19.905356494383774,17.855856944092466,10.3489230605543,11.799132150403558,11.761548368195204,14.72087395317766,17.195173858923567,12.956161896807007,15.019464813113002,19.559451632647885,16.26542092450121,16.835888659467344,11.436202271025273,16.159240898410566,18.93093921736879,11.210380804633846,17.155391612622193,13.40105149899259,16.012543554339846,17.96298130887825,13.655244480945965,11.052490031933717,11.160376141583502,18.841611043690634,10.271110879548166,11.41685518480445,10.669358350808606,14.723184696765335,11.824993731671643,16.341083262517117,18.68743014743734,10.448354357953635,11.083410870737836,18.756339964197107,12.094799041783329,16.420545640647525,19.57911875332835,19.24912376629246,10.458582104597408,11.231042218205234,18.44275632243826,11.701037530753515,19.446495298558002,16.37158952472449,18.90048963735493,19.493140836714694,15.110353498536437,12.422236651370817,14.878274617821763,12.743774491294825,12.411456616653346,14.39209915365668,10.770831534775196,10.606121443786387,19.50185882817261,12.639556635969225,11.967054797049368,10.735277875668272,18.41762587968927,19.897782737209795,14.501363961499967,17.053795787115497,17.732766749909427,18.77232969364981,18.787104429447723,16.703978434760167,14.51054557425733,17.196812591466074,19.16318502530916,16.29065154857402,12.144733386798167,18.807960807995908,10.811468493065588,13.92392976643137,17.078920482270966,13.431119218208519,12.093333301114322,11.320591866569812,11.901171398444783,10.636641903533645,17.82308825905607,14.669788242024564,18.143636839771965,16.4886315561143,16.05074402542154,17.302412190119245,11.477932837202642,12.750925208615795,11.716295398986034,16.20071885909808,16.250076182999358,11.595166529048875,17.03679197545459,10.920978951248994,10.391216798269237,15.745123544643722,14.001577742598194,17.35316268465289,15.575998251381641,11.467210707988201,10.093109491355566,14.310729513963903,19.382393465421785,14.441778657897641,12.763602723739822,18.765472938575744,17.710783292184683,17.67032441776815,19.157232314118986,15.734597926941465,14.4875665253745,15.808556212292626,13.331241126813696,13.710431379036425,19.56616896424593,19.847724348675655,19.632195066405785,17.994815372010642,13.633374388178803,12.651865111903469,11.962171354846692,11.408731780919652,16.027895817949215,15.877200729764562,12.594151014985243,15.386978313661334,19.078773689611385,17.222089371691563,14.615383762259807,11.615334857809433,17.021545898427824,15.469666477224362,12.278736078949171,16.52271693913172,15.191204222749047,12.438414655212506,16.48130489918077,19.90709228849622,16.155897719703212,14.229680948204058,15.481353514315696,14.644364880603494,14.916579193755053,13.417529855511638,16.043644372319157,16.217902759658074,18.871058224810362,15.430277079281886,14.55053433648436,15.152012782351774,13.354143297912053,19.648634813690123,19.392099706517254,15.098059323675573,17.170109802875768,18.06265777810129,15.28841562273007,18.08886619629149,14.387782849300395,11.561220309505549,18.314220935866636,13.252336860795067,11.57109125252205,17.238606915540938,15.149101318127656,18.09661820163761,18.669171582418578,16.381798192623652,12.261700464931266,12.852695440618799,18.579062447250024,10.374707735330432,15.46681094533765,14.856377538337082,13.41778239957938,11.63925844624919,15.283562029572904,19.460708115324742,14.981633350216848,14.281927314694398,13.019234130501555,16.33913923275966,11.371348290197943,15.307306907357454,11.224927962400317,15.683932348611258,19.021654477780253,12.680429543443726,17.181539447996315,12.961206612636484,15.676934627519916,19.78313317145797,12.112006405000844,12.287896242047644,10.269121389868829,14.989524391772875,11.51208584862956,17.661550818663592,13.79937603081511,19.952303805734175,13.525719438611969,12.28418973870957,17.45940635897046,19.059926417668635,19.595740834712906,16.195950310803667,14.12154863124561,14.50701127133798,15.110080019772173,13.652425840294352,13.265820205295771,11.373019022785195,14.704726725357752,13.786192159576732,10.124239687525925,14.046100629522229,10.474228128624418,12.141400854021573,13.952457877077006,14.920719598430585,12.565150298316068,17.643427575387648,13.20120119776879,10.187559751952042,16.379306737964235,16.364463685267225,11.603093269498007,18.05094386284385,16.281480023067175,16.94164495969133,17.00543843696081,15.028236542986537,15.981209943306322,18.63629609412861,12.81137252706529,18.031577902427745,16.031159387161306,16.128143839833164,12.64467524004777,14.171706679413719,19.744838529523573,14.288796767023822,12.592305281847187,19.860256238705055,13.713932735360935,11.274538866725305,11.444296783686607,11.52996667492963,15.209216962841596,16.695915504840425,18.8820935561843,10.06364626861004,11.038952647755437,18.000989369179337,10.558516904452562,13.011921864257499,15.066555504903471,11.658978505681048,11.048545885513763,10.42317924432788,16.948352870280946,11.944773641857562,15.272696507701006,19.204844422316786,17.012844534605176,17.61923500316726,17.418299047042645,11.739575240738638,15.505719960240704,17.376238774145975,12.093177179672532,13.752451927210128,10.956690307312408,11.373860688809179,16.29163277434549,12.088006179902749,10.698693227877802,10.302028651676808,10.466514107965248,13.205576373756001,11.443540221259367,13.760759095163792,18.737914661510693,11.77565644658367,10.692883889501292,16.31090878404783,11.327134708120044,14.293998652818516,12.092360954441563,14.696719748989613,17.51636001072832,19.457233590860206,12.937870280213694,19.014178947680577,12.767458824938815,15.181019675621927,17.215725756890095,11.276446793477863,19.123017819424632,19.355738761101918,19.960330984045406,10.522967354395966,16.477411522254684,12.475225207121705,17.264069538576397,14.165486981654436,16.629787250350667,15.721991326235011,10.120448882106995,11.56557821017566,11.047045478418863,14.43013261666934,17.39009312508213]}
},{}],80:[function(require,module,exports){
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

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logpdf = factory( 0.0, 1.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0, 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, 1.0 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `alpha` and `beta`, the function returns a function which returns `-Infinity` when provided a number smaller than `beta` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0, 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -100.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 0.5 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided `beta <= 0`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( PINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha <= 0`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -1.0, 0.5 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, 1.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, PINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NaN );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a large parameter `alpha`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a large parameter `beta`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/pareto-type1/logpdf/test/test.factory.js")
},{"./../lib/factory.js":74,"./fixtures/julia/both_large.json":77,"./fixtures/julia/large_alpha.json":78,"./fixtures/julia/large_beta.json":79,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":53,"@stdlib/constants/math/float64-pinf":54,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":61,"tape":157}],81:[function(require,module,exports){
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
var logpdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpdf` functions', function test( t ) {
	t.equal( typeof logpdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/pareto-type1/logpdf/test/test.js")
},{"./../lib":75,"tape":157}],82:[function(require,module,exports){
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
var logpdf = require( './../lib' );


// FIXTURES //

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number smaller than `beta` for `x` and a valid `alpha` and `beta`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -100.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -10.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( -0.5, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( 0.5, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided `alpha <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `beta <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large parameter `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/pareto-type1/logpdf/test/test.logpdf.js")
},{"./../lib":75,"./fixtures/julia/both_large.json":77,"./fixtures/julia/large_alpha.json":78,"./fixtures/julia/large_beta.json":79,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":53,"@stdlib/constants/math/float64-pinf":54,"@stdlib/math/base/assert/is-nan":58,"@stdlib/math/base/special/abs":61,"tape":157}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":83}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":88}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":87,"./polyfill.js":89,"@stdlib/assert/has-define-property-support":14}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/assert/has-property":21,"@stdlib/assert/is-object":43}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":91,"./polyfill.js":92,"@stdlib/assert/has-tostringtag-support":25}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":93}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":93,"./tostringtag.js":94,"@stdlib/assert/has-own-property":19}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){

},{}],97:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"dup":96}],98:[function(require,module,exports){
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
},{"base64-js":95,"buffer":98,"ieee754":124}],99:[function(require,module,exports){
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
},{"../../insert-module-globals/node_modules/is-buffer/index.js":126}],100:[function(require,module,exports){
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

},{"./lib/is_arguments.js":101,"./lib/keys.js":102}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],103:[function(require,module,exports){
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

},{"object-keys":131}],104:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],105:[function(require,module,exports){
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

},{"function-bind":120,"has-symbols":121}],106:[function(require,module,exports){
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

},{"./GetIntrinsic":105,"./helpers/assertRecord":107,"./helpers/callBound":109,"./helpers/isFinite":110,"./helpers/isNaN":111,"./helpers/isPrefixOf":112,"./helpers/isPropertyDescriptor":113,"./helpers/mod":114,"./helpers/sign":115,"es-to-primitive/es5":116,"has":123,"is-callable":127}],107:[function(require,module,exports){
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

},{"../GetIntrinsic":105,"has":123}],108:[function(require,module,exports){
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

},{"../GetIntrinsic":105,"function-bind":120}],109:[function(require,module,exports){
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

},{"../GetIntrinsic":105,"./callBind":108}],110:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],111:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],112:[function(require,module,exports){
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

},{"../helpers/callBound":109}],113:[function(require,module,exports){
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

},{"../GetIntrinsic":105,"has":123}],114:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],115:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],116:[function(require,module,exports){
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

},{"./helpers/isPrimitive":117,"is-callable":127}],117:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":119}],121:[function(require,module,exports){
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
},{"./shams":122}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":120}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{"./isArguments":132}],131:[function(require,module,exports){
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

},{"./implementation":130,"./isArguments":132}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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
},{"_process":135}],134:[function(require,module,exports){
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
},{"_process":135}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":137}],137:[function(require,module,exports){
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
},{"./_stream_readable":139,"./_stream_writable":141,"core-util-is":99,"inherits":125,"process-nextick-args":134}],138:[function(require,module,exports){
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
},{"./_stream_transform":140,"core-util-is":99,"inherits":125}],139:[function(require,module,exports){
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
},{"./_stream_duplex":137,"./internal/streams/BufferList":142,"./internal/streams/destroy":143,"./internal/streams/stream":144,"_process":135,"core-util-is":99,"events":118,"inherits":125,"isarray":128,"process-nextick-args":134,"safe-buffer":150,"string_decoder/":156,"util":96}],140:[function(require,module,exports){
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
},{"./_stream_duplex":137,"core-util-is":99,"inherits":125}],141:[function(require,module,exports){
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
},{"./_stream_duplex":137,"./internal/streams/destroy":143,"./internal/streams/stream":144,"_process":135,"core-util-is":99,"inherits":125,"process-nextick-args":134,"safe-buffer":150,"timers":163,"util-deprecate":164}],142:[function(require,module,exports){
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
},{"safe-buffer":150,"util":96}],143:[function(require,module,exports){
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
},{"process-nextick-args":134}],144:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":118}],145:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":146}],146:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":137,"./lib/_stream_passthrough.js":138,"./lib/_stream_readable.js":139,"./lib/_stream_transform.js":140,"./lib/_stream_writable.js":141}],147:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":146}],148:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":141}],149:[function(require,module,exports){
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
},{"_process":135,"through":162,"timers":163}],150:[function(require,module,exports){
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

},{"buffer":98}],151:[function(require,module,exports){
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

},{"events":118,"inherits":125,"readable-stream/duplex.js":136,"readable-stream/passthrough.js":145,"readable-stream/readable.js":146,"readable-stream/transform.js":147,"readable-stream/writable.js":148}],152:[function(require,module,exports){
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

},{"es-abstract/es5":106,"function-bind":120}],153:[function(require,module,exports){
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

},{"./implementation":152,"./polyfill":154,"./shim":155,"define-properties":103,"function-bind":120}],154:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":152}],155:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":154,"define-properties":103}],156:[function(require,module,exports){
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
},{"safe-buffer":150}],157:[function(require,module,exports){
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
},{"./lib/default_stream":158,"./lib/results":160,"./lib/test":161,"_process":135,"defined":104,"through":162,"timers":163}],158:[function(require,module,exports){
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
},{"_process":135,"fs":97,"through":162}],159:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":135,"timers":163}],160:[function(require,module,exports){
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
},{"_process":135,"events":118,"function-bind":120,"has":123,"inherits":125,"object-inspect":129,"resumer":149,"through":162,"timers":163}],161:[function(require,module,exports){
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
},{"./next_tick":159,"deep-equal":100,"defined":104,"events":118,"has":123,"inherits":125,"path":133,"string.prototype.trim":153}],162:[function(require,module,exports){
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
},{"_process":135,"stream":151}],163:[function(require,module,exports){
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
},{"process/browser.js":135,"timers":163}],164:[function(require,module,exports){
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
},{}]},{},[80,81,82]);
