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

},{"./uint16array.js":29,"@stdlib/assert/is-uint16array":45,"@stdlib/constants/math/uint16-max":61}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint32array.js":32,"@stdlib/assert/is-uint32array":47,"@stdlib/constants/math/uint32-max":62}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./uint8array.js":35,"@stdlib/assert/is-uint8array":49,"@stdlib/constants/math/uint8-max":63}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/native-class":143}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":143}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":143}],47:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":143}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/native-class":143}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Natural logarithm of `2`.
*
* @module @stdlib/constants/math/float64-ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
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

},{"@stdlib/number/ctor":99}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isEven = require( './is_even.js' );


// EXPORTS //

module.exports = isEven;

},{"./is_even.js":65}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/assert/is-integer":68}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_infinite.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_integer.js":69}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/math/base/special/floor":79}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./is_nan.js":71}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a finite numeric value is an odd number.
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

var isOdd = require( './is_odd.js' );


// EXPORTS //

module.exports = isOdd;

},{"./is_odd.js":73}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Tests if a finite numeric value is an odd number.
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

},{"@stdlib/math/base/assert/is-even":64}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./abs.js":74}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/float64/base/from-words":103,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/to-words":118}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./copysign.js":76}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./floor.js":78}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ldexp.js":81}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-max-base2-exponent":56,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":55,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":57,"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/assert/is-infinite":66,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/copysign":77,"@stdlib/number/float64/base/exponent":101,"@stdlib/number/float64/base/from-words":103,"@stdlib/number/float64/base/normalize":109,"@stdlib/number/float64/base/to-words":118}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./ln.js":83}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_p.js":84,"./polyval_q.js":85,"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-ninf":58,"@stdlib/math/base/assert/is-nan":70,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/set-high-word":113}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var pow = require( './pow.js' );


// EXPORTS //

module.exports = pow;

},{"./pow.js":92}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
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

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

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

},{"./polyval_l.js":89,"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/set-high-word":113,"@stdlib/number/float64/base/set-low-word":115}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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

},{"./polyval_w.js":91,"@stdlib/number/float64/base/set-low-word":115}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.5999999999999946;
	}
	return 0.5999999999999946 + (x * (0.4285714285785502 + (x * (0.33333332981837743 + (x * (0.272728123808534 + (x * (0.23066074577556175 + (x * 0.20697501780033842))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

},{}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25)));
}


// EXPORTS //

module.exports = evalpoly;

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
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

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
var WORDS = [ 0|0, 0|0 ]; // WARNING: not thread safe

// Log workspace:
var LOG_WORKSPACE = [ 0.0, 0.0 ]; // WARNING: not thread safe


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
	toWords( WORDS, y );
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
	toWords( WORDS, x );
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
	toWords( WORDS, z );
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
			// signal underflow...
			return sx * TINY * TINY;
		}
		if ( lp <= (z-hp) ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
}


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":87,"./logx.js":88,"./pow2.js":93,"./x_is_zero.js":94,"./y_is_huge.js":95,"./y_is_infinite.js":96,"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/assert/is-infinite":66,"@stdlib/math/base/assert/is-integer":68,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/assert/is-odd":72,"@stdlib/math/base/special/abs":75,"@stdlib/math/base/special/sqrt":97,"@stdlib/number/float64/base/set-low-word":115,"@stdlib/number/float64/base/to-words":118,"@stdlib/number/uint32/base/to-int32":122}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyvalP = require( './polyval_p.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000|0; // asm type annotation

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

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

},{"./polyval_p.js":90,"@stdlib/constants/math/float64-exponent-bias":52,"@stdlib/constants/math/float64-ln-two":54,"@stdlib/math/base/special/ldexp":80,"@stdlib/number/float64/base/get-high-word":107,"@stdlib/number/float64/base/set-high-word":113,"@stdlib/number/float64/base/set-low-word":115,"@stdlib/number/uint32/base/to-int32":122}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


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

},{"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/assert/is-odd":72,"@stdlib/math/base/special/copysign":77}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

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
			// signal overflow...
			return HUGE * HUGE;
		}
		// signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// signal overflow...
		return HUGE * HUGE;
	}
	// signal underflow...
	return TINY * TINY;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/number/float64/base/get-high-word":107}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var PINF = require( '@stdlib/constants/math/float64-pinf' );


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

},{"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/special/abs":75}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":98}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/math/float64-smallest-normal":60,"@stdlib/math/base/assert/is-infinite":66,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/abs":75}],112:[function(require,module,exports){
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

},{"./main.js":123}],123:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (logPDF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the natural logarithm of the probability density function
*
* @example
* var logpdf = factory( 5.0 );
*
* var y = logpdf( 0.0 );
* // returns -Infinity
*
* y = logpdf( 5.0 );
* // returns Infinity
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (logPDF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} natural logarithm of the probability density function
	*
	* @example
	* var y = logpdf( 10.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? PINF : NINF;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/assert/is-nan":70,"@stdlib/utils/constant-function":137}],125:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Degenerate distribution logarithm of probability density function (logPDF).
*
* @module @stdlib/stats/base/dists/degenerate/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/degenerate/logpdf' );
*
* var y = logpdf( 2.0, 0.0 );
* // returns -Infinity
*
* @example
* var factory = require( '@stdlib/stats/base/dists/degenerate/logpdf' ).factory;
*
* var logPDF = factory( 10.0 );
*
* var y = logPDF( 10.0 );
* // returns Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":124,"./logpdf.js":126,"@stdlib/utils/define-nonenumerable-read-only-property":138}],126:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (logPDF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} natural logarithm of probability density function
*
* @example
* var y = logpdf( 2.0, 3.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( 3.0, 3.0 );
* // returns Infinity
*
* @example
* var y = logpdf( NaN, 0.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN );
* // returns NaN
*/
function logpdf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? PINF : NINF;
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/assert/is-nan":70}],127:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var degenerate = require( '@stdlib/stats/base/dists/degenerate/logpdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Returns a function for evaluating the logarithm of the probability density function (PDF) for a Rayleigh distribution with scale parameter `sigma`.
*
* @param {NonNegativeNumber} sigma - scale parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 0.5 );
* var y = logpdf( 1.0 );
* // returns ~-0.614
*
* y = logpdf( 0.1 );
* // returns ~-0.936
*/
function factory( sigma ) {
	var s2i;
	var s2;
	if ( isnan( sigma ) || sigma < 0.0 ) {
		return constantFunction( NaN );
	}
	if ( sigma === 0.0 ) {
		return degenerate( 0.0 );
	}
	s2 = pow( sigma, 2.0 );
	s2i = 1.0 / s2;
	return logpdf;

	/**
	* Evaluates the logarithm of the probability density function (PDF) for a Rayleigh distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( 2.3 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 || x === PINF ) {
			return NINF;
		}
		return ln( s2i * x ) - (pow( x, 2.0 ) / ( 2.0 * s2 ));
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/ln":82,"@stdlib/math/base/special/pow":86,"@stdlib/stats/base/dists/degenerate/logpdf":125,"@stdlib/utils/constant-function":137}],128:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Rayleigh distribution logarithm of probability density function (PDF).
*
* @module @stdlib/stats/base/dists/rayleigh/logpdf
*
* @example
* var logpdf = require( '@stdlib/stats/base/dists/rayleigh/logpdf' );
*
* var y = logpdf( 2.0, 4.0 );
* // returns ~-2.207
*
* var mylogpdf = logpdf.factory( 4.0 );
*
* y = mylogpdf( 6.0 );
* // returns ~-2.104
*
* y = mylogpdf( 4.0 );
* // returns ~-1.884
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":127,"./logpdf.js":129,"@stdlib/utils/define-nonenumerable-read-only-property":138}],129:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Evaluates the logarithm of the probability density function (PDF) for a Rayleigh distribution with scale parameter `sigma` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeNumber} sigma - scale parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 0.3, 1.0 );
* // returns ~-1.249
*
* @example
* var y = logpdf( 2.0, 0.8 );
* // returns ~-1.986
*
* @example
* var y = logpdf( -1.0, 0.5 );
* // returns -Infinity
*
* @example
* var y = logpdf( 0.0, NaN );
* // returns NaN
*
* @example
* var y = logpdf( NaN, 2.0 );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = logpdf( 2.0, -1.0 );
* // returns NaN
*/
function logpdf( x, sigma ) {
	var s2i;
	var s2;
	if (
		isnan( x ) ||
		isnan( sigma ) ||
		sigma < 0.0
	) {
		return NaN;
	}
	if ( sigma === 0.0 ) {
		return ( x === 0.0 ) ? PINF : NINF;
	}
	if ( x < 0.0 || x === PINF ) {
		return NINF;
	}
	s2 = pow( sigma, 2.0 );
	s2i = 1.0 / s2;
	return ln( s2i * x ) - (pow( x, 2.0 ) / ( 2.0 * s2 ));
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/ln":82,"@stdlib/math/base/special/pow":86}],130:[function(require,module,exports){
module.exports={"sigma":[25.88872554057521,6.503674901610978,19.95416831153397,25.679166481463678,2.822674202594244,12.737092829978092,45.694500316015066,0.18743307318186408,24.98917356731234,16.08448785430432,16.61524056731196,16.46535029118763,40.01043882817038,3.456159016336635,36.2738090221888,46.61260917622789,46.34921487518642,45.41188949365037,45.78482392836206,11.386397284739125,3.585286188595549,19.735414274557883,30.539622050295222,12.370704764130236,37.64090013126089,9.243928684797996,4.433922550210889,6.6045925614118595,42.06746295689135,2.2628073474370236,10.280237090380872,6.7235664730948,19.520024443688122,19.695802276664264,32.25726776185746,6.372021469154032,34.53459153328766,15.97269954973848,41.61610536816565,46.32542126789871,44.71821666301039,18.893836156202624,33.82786567598988,46.99308895304042,9.616469610223144,43.970441276984495,29.44675894987562,11.113814866614957,16.56269913799836,35.638606692517136,7.266126165579956,43.46364202938049,10.387849149825213,45.181717287431454,31.24888023511121,41.588183435466064,14.644093276271608,27.17328722194012,0.20189885734631652,9.391895964932761,23.76141195185778,49.23027118525298,36.15264798484055,43.11097942963512,10.428999717581078,16.019612217961466,32.027363207200125,42.69183579394957,27.220893269201852,7.3016528577046325,20.939545690533624,0.25419962677799557,7.272627251983299,0.06264016397160566,38.68537627520755,27.96338580643959,2.4759024539818486,14.197548335006305,27.83352286908263,0.3677110684694451,40.29565798718108,31.08893901954579,20.534544998538983,15.743056035904491,26.5909406626888,17.183005028818222,14.508095763279272,18.863097109599646,35.335915350374236,2.925653512732529,10.565416934149386,30.704809886134466,2.2397381607606737,0.9006694256966319,17.539274638186843,18.59023640406887,3.1237440001601335,23.330486630688384,45.22151358851174,0.1602533386613092,2.643628133816678,35.14732027434625,44.6573015411652,47.57329347976654,31.077927272488704,1.6703799048112478,49.55397183382774,29.078365978985055,8.856946862523706,41.488682728857874,15.397281509783866,40.26643691832036,26.602437823045754,20.60325691495981,11.378884528922972,41.00761722561236,23.705884137063936,6.935393821207414,7.197667033857247,45.89429150896439,44.26103237398388,3.6669102599460546,37.03294077833146,31.51615057385807,33.496537897097866,15.16006875462127,9.726711563980551,12.953506181353202,10.683350716457484,43.62345891345364,34.54548417370906,36.31108945817011,10.538179938096992,45.33291620925803,41.89545579754716,22.66725117602817,39.97529303543862,34.230607990301955,43.84884910823582,31.832870605361197,16.01045024584473,7.073559151101316,31.026330114338553,45.02701552765279,16.39446985070926,15.183192272241397,6.250499028809175,39.600220207624034,3.3883542744228445,27.519778412932695,35.817455954353896,8.296748150833622,23.777389401324278,44.984671677262924,18.504747011671185,8.934971352877008,0.5333747192242777,23.732801291640136,16.6744324411656,17.25020505695225,12.087639945649077,7.227280237798562,13.992555846338917,16.89829196753979,9.415166991444735,34.43861394185453,37.59830324891927,39.09261556560112,34.797204515735416,12.217654299366155,33.34270448754712,31.685186339471805,7.544444910000725,38.89482519975736,34.357375228472144,42.34772674373429,9.247533640541006,8.089410255939878,48.35478079856821,48.92473359359455,18.019983066587606,7.417132990384245,40.54795092948906,21.944521603002563,22.41897915286828,45.39812354382131,40.47767146348215,7.287039464879963,20.373378673782383,27.205159294940707,38.054528983316956,13.87694107278713,15.4343916318447,15.08180550544197,17.434496243573207,32.72861504520852,21.661841360647248,13.083419057356139,20.85708431754021,32.9495288559977,2.8102834835841417,0.482887797444953,46.6235856924092,10.076707298677478,21.107335339981603,30.73880791275697,0.8716881306001789,36.86331072100002,6.259984487189318,25.32526290219851,45.76000047257054,41.77073393281879,22.962366812217493,35.1089074032354,48.374753080124066,41.07302429387415,18.96822198900645,12.897631212040995,37.16495185506048,44.01585201185269,47.78739865762213,19.906040075574694,39.74996695739088,39.7470620916364,8.148540862643705,2.868753567109794,43.26504087319866,9.156633093205125,25.93099848273679,21.15209605096988,15.045298295264143,12.423780210846669,38.03285751743343,16.184687628793583,13.986485194336174,13.529938655295782,48.037027303890824,18.272276921167773,7.113437777268783,15.673454317951096,44.9300396896201,44.79448625300427,29.030969391335525,5.6079360637978475,43.55873862656032,26.825546034966507,43.71884603240473,44.36208198172995,29.02204117236056,18.977484078487393,32.8220075750988,8.544456068941997,19.370317729786045,15.02927073315653,13.508868540219732,40.871190361970264,8.544863459424256,48.78238090160565,27.35868920799842,8.063719346907583,10.523878653153906,40.27930229841957,12.406239703202948,0.4455793028003585,43.727851666453255,44.35792613170684,37.91672846646391,44.42723209208946,5.975186897104646,30.851729794099825,21.664191877580997,49.92467393852078,10.178290621918773,43.759149025046064,2.0962323652737314,16.108457494998007,0.8626921112300456,13.575644998518023,1.6419691820547033,17.903015455940306,40.34388316369552,21.734807967545223,42.19118393568304,36.56685443538339,9.241139479875905,19.142732442330157,0.5539789105515336,44.399929331870624,37.68935926791269,11.80801367478248,26.61328867749161,6.9361924534882995,33.38030987942958,16.685150691810758,45.9960531290916,10.835064508587921,1.3302798487445533,5.04123743714776,14.621343830948753,11.99288853774043,23.609152768985563,46.83055175101318,6.377324134429941,14.03960261851771,38.252415026074885,8.014104105068142,48.96798419381919,4.925125869243752,46.63817927480629,44.58792604371658,31.623926339185203,18.83602484831527,44.61726471729267,13.213245087123294,9.028559362016185,23.22282644522162,25.005306185266875,9.639391039185618,49.990599531221015,39.53490713375839,22.330749653967796,47.440647506505165,2.1501370039355594,14.75744562016822,5.720746560256639,43.255736914942574,37.2910925123342,20.563707742758343,29.9418122917129,40.255603546609386,47.14956149503611,23.95366615094844,36.906065185487414,46.45412792280026,23.44532522535101,12.019481056247194,26.092213555068376,42.21746783107576,13.40961141175383,49.10724035026806,25.77551987448694,25.109205889215136,23.49975518743468,2.4696146934075847,9.865741248949556,31.91709638008212,48.05082787576952,39.4045797295562,28.531429274778365,19.634209923517354,33.74448772346715,29.650811277517253,42.5447101889783,3.2302460751394646,5.8874637958944875,13.317111089485866,36.55801294119097,12.728492988649108,9.13767571706109,16.6080835525812,43.97230278170675,27.554816693140406,24.407016005484373,6.341099245698379,11.898081313298881,11.615121198624223,0.9287675859080968,35.335453044439625,26.794782532317317,21.480709801456953,12.06207488217067,17.6135552780472,40.32851194678986,24.242455251683147,10.920054109601008,7.992325036121906,46.87982647004617,10.578541233967165,43.734009148718435,22.40111957347306,41.42192980329392,7.294411353399166,31.072202269403338,0.6526206211254104,35.3535583545196,15.806352694847803,20.144218206078857,19.384187743586857,6.8605276184647295,26.36735766019197,41.39731552062832,4.448610148536458,48.13907306139039,44.108245574865634,37.194739011338775,12.951044111969113,12.255394642643747,35.77065881790449,17.711145993970412,16.10856284440869,48.97247111522965,32.688993788090215,24.328018626469074,37.31478576874402,23.557817745805686,21.4661242789963,34.52878714246715,19.643408863996115,44.969952640645985,49.08880078553608,2.034745485861389,34.990318026071996,25.479154291904717,32.64932917008364,8.237635673381272,4.059041201321223,14.368099778623911,48.951212905863514,21.980725611255036,20.042460303794407,1.2274657920742449,3.624923595299867,15.354274831137593,4.979303000633617,29.32139197364596,30.190202489588458,11.185770329026312,0.8103805112589346,5.570583301842669,30.473015688602356,31.82121979227229,33.12233222462038,10.432955341170548,25.212293146281517,10.677091048142096,5.078520370155848,24.235252846101453,10.312607447238042,27.29199099326296,41.41791640858202,12.875601470369535,16.336730582449587,36.18683044136255,16.746025529215515,37.298658765342594,43.26433100938844,32.916390361099936,3.8532973637614654,10.047293282382652,18.654989621959672,13.169743062725559,37.12871437418629,48.847825546023714,44.48059157696641,33.77985054269704,22.42771413108113,38.99313752264353,21.28153501366301,18.662427946924165,24.99573480170628,4.171691360680596,26.445686050498352,46.61698870123085,12.283986380031687,24.430571651171896,14.613306377603074,35.651628949106374,45.479494450893355,36.35994123686992,45.33318980252313,35.20613538629662,38.89880620662582,13.213625611659108,35.941087311724914,9.481334796370911,21.521384290044708,41.85943265932062,26.236160210730596,21.1804950165564,11.315979446238632,22.39062310919563,30.322540469569404,3.6293569520205016,1.4361339064890233,22.6063423121721,11.688227598173517,11.93688531499344,2.149436976672048,3.6589554411067926,12.492173260720229,38.3425835801376,45.39198004369269,41.044312561247544,14.535581070081028,12.522141183790536,47.43644507097136,2.137458753252819,33.61261186248276,21.77046536658439,8.26190738898016,2.747472866262368,35.806823767088204,42.488761303722725,6.955551003365845,12.588209724247923,43.88971465402363,0.39664571440731766,48.49168813747957,25.099834500304873,5.961870963462368,31.333568227376883,23.776628528861732,8.435186016731421,37.90812983749902,26.90948683302137,47.73061355101144,40.682228044704885,17.85305608814771,5.272939404511945,1.431336080007073,33.668056951197634,3.8855782963674312,32.11588281726569,34.986997023785925,18.950236139855825,22.79497841046294,28.953427958393497,49.65171921637851,41.44538270524647,47.36593314112917,43.138219272384134,49.78356404396954,8.38030573086378,25.024038970235118,5.195151594518743,46.90842289479975,10.698670409164823,3.7192485362644745,45.15692263887776,3.117514698076651,16.237228676345506,43.72934179895197,31.409774966399397,40.4977397938843,8.788651636796896,44.63989383297731,18.162219660444624,3.9041548640166623,22.34082300530609,26.676214151522004,20.447467010775387,8.679390599960746,22.880753854203828,44.1885396393778,6.953469303749838,17.152943125719577,36.779721892951635,19.58557102183418,40.504424384189896,28.837941620495666,24.955679791265396,9.732504314897527,43.67358680747848,1.6315173132758765,1.6177387711515,9.894384320961802,14.761235538400797,7.897126048963177,25.857529851463568,18.495511467114735,17.166284038207657,26.29226955817391,40.87915327572512,31.651743813668375,34.12023710436777,2.260596325098152,20.376384728287555,29.261081046030334,2.545455757126469,32.461380709023565,14.432465320799515,12.970784793615808,15.343749884625801,41.57925235417396,32.83488029438689,1.2309745869623079,47.951297962795536,40.440960814145534,43.403060865033694,27.93613442907581,27.543850129790258,45.05464547288883,41.77534510327167,28.52002173535689,48.80818296747071,49.31368825019028,6.164230302182161,47.86527385002201,4.789927308163378,6.507416174742497,24.62765257224295,44.2083218723496,0.14583737913425043,42.057593699372006,27.339475883019393,46.35296843070803,18.23576143523391,38.988530065667895,21.876001222030826,14.316339098218755,22.903622208581854,44.31168903224908,2.8117679962005426,3.437584429708973,35.45534061690937,17.123816285213945,42.025345253680946,45.86056204643382,13.849366320943757,19.91290648022034,36.679593139567245,44.69882548234466,39.755578711676996,6.417286016773738,16.233248861511797,48.56005647583721,40.46926373188522,18.82832026131024,5.334076158229195,25.446559057380036,17.596542346096346,0.15565606987339997,26.600200755630077,46.52511998027471,12.587213893265247,4.3669385550762385,47.24271276119841,8.728459949434864,48.43671862641572,28.035583005731834,15.201171655560108,20.13097658812012,1.146808581029024,17.744602596949434,24.684616605244315,15.728161036703646,44.78934398326123,28.19504065485957,21.937137502345916,18.88308949191214,22.196091294521313,41.383846764935925,34.77087459360846,40.70733498454422,17.971366991171735,15.277047749522787,46.69324209350062,47.091465324681,31.52161384679617,28.60088512511836,1.586305629723661,4.385270486457438,14.24891262965221,12.037043125491087,0.8983960663715207,16.932667602185347,28.21147332833117,28.64591276397913,44.953221231341836,40.96063710420083,19.434912226949884,31.417750361322916,27.84580632124143,30.007377567157356,17.86089667988464,46.747663691632425,11.585560633728154,38.132240510087,41.1325388337044,10.706379865817972,14.159377438580044,25.300773719638702,14.346480551104579,11.085130473027005,13.246082464403408,21.909653093612203,30.060527022728735,2.035162546136926,29.18626360971861,1.616933390743569,9.489609169209912,41.02428931262034,37.10127137707252,36.49605964415093,15.974300826484667,35.164479737590696,19.707575524867295,11.909132830171998,15.463505051903025,16.79087709331454,39.27078888102211,43.923559094028676,2.8327964381105852,28.76241162362343,25.540574876536837,42.6326539951003,31.856466178751464,30.841012976200876,4.331731300245534,23.791713774603718,22.10284370131549,24.07373032075103,35.49187623492918,9.20536158438523,29.82419324154002,5.306004196003833,16.39135096945378,5.719010423497961,47.22976055419049,48.14675456799073,22.056629001616113,0.11653700453857496,29.215234394577617,42.144904210075985,39.146177279675456,34.06528870672771,13.956986130191574,48.900288172506436,17.106800173609095,23.21393796561704,18.224570113684734,28.78878370236778,45.99538076028272,33.9952501664005,7.3167309439555295,15.358387517291728,45.52332166977537,8.18413855072847,6.24230827347777,17.655813342311987,16.872749754701054,21.378531884159536,23.319435564420765,20.842645698445995,41.576831879854126,15.998227886227612,6.712046624143331,30.356704221166453,5.571825235909356,13.904626965484779,16.31518879298519,29.21532096430395,35.88316872860051,19.544612443107777,6.874943977351022,29.905225221961995,26.754900543608716,22.301295421636482,49.00798240220819,12.867916634793664,48.48132216327541,21.255399788136298,9.96266899259246,46.752057346097295,45.705563066838565,26.74146256603902,9.40659060386868,26.200222421482223,32.413538660002075,24.126479159976068,34.9790642115291,47.05508792603117,5.900093554433472,0.408666352878051,41.51361171071829,3.003968847789884,29.897002770478164,38.13104033668596,2.6995288292215647,43.55487976632517,22.128515498727964,14.598972186114324,37.53392743143345,10.430277162598955,12.677349874968247,0.16274698094390638,14.407433544884496,12.556019133725671,1.5462275237276057,8.10339944421491,18.75286440758658,14.57297114335815,8.992857958699707,0.557421731815666,11.72113892141553,17.564271547539345,14.960956047271834,25.752223926013762,19.982374151416238,19.709876061802678,21.94303174847131,11.330452294913652,24.59904002101797,17.20552083957596,3.311620805824722,3.7899454693238077,27.307167391789346,24.232883493322667,20.543074031201346,33.55762284140174,14.911173123332933,27.864848469538238,49.746214364627825,46.21846928419281,10.862349304165475,39.76926121699101,36.39456146911566,18.995896285701175,3.741790941434464,7.874102163031916,12.652684839057994,49.785871970337794,10.551345694460279,36.71529435620311,34.468225543871675,31.529310484471196,41.361241941792045,29.742734931876512,43.654333096252486,9.262895255407921,31.610437722012996,36.95627278491752,24.226942597737743,30.68073399657738,28.65994759855337,2.1012812309880613,4.143144567248836,17.626950112867334,19.040443721431732,21.846525517979643,3.1451830909073886,19.507801913647636,35.54208613475549,1.4787322878932696,49.205057895466794,23.79926933731741,21.443790952829588,39.23904695516674,34.7566661633675,45.23279419017241,33.33983553036652,38.544788146446706,39.272467468676254,47.2575223595986,30.93248770013051,34.593612854110475,20.797244449058706,23.63914831577666,4.312759294778424,29.070995517600938,31.612829627285667,48.59966996665015,35.755212339065025,24.10436342826243,2.596582301412076,26.17386704941671,33.13715878324117,47.269959422689745,14.740918820571347,33.770880379865375,20.521086490989347,40.64285759850564,48.0373859825837,7.329225689301433,36.742759163880045,41.04122345280541,45.85570288806411,12.427603884726956,28.402457076710853,10.712533013884862,28.734478580327927,12.755447313795754,25.90025241834176,29.012444439905828,25.649565719619382,1.1177330664782992,23.99127643278711,18.58054064112388,16.631124108260575,24.304866316735463,39.29813762768355,2.086023709197049,19.192457701110598,30.8178892562628,7.884068933074118,46.43866540375492,0.2983385787701076,23.569809687830013,27.615874130790495,31.47522975697622,9.563520211786013,3.319026375642964,45.33366745879395,22.677237609527324,10.869724433962558,22.440614270466895,30.466272424299657,21.281184228758942,46.90805791440279,5.278464952872142,9.997765894700994,15.646196592092931,4.413561146217548,23.08295270883376,20.33088815366518,6.808806755677621,49.969050490867595,21.17803702965224,13.188940554310557,48.621956879958475,11.207881430258727,45.673350570444505,36.67552808125964,2.668855523251934,47.95374295187405,31.57237981734212,14.565140168953405,29.113589050521092,19.50533327077445,12.11145217675923,31.532298107695755,1.7849680294086068,21.654700986667663,30.615066213416743,38.52522576262372,37.97631437016592,17.24360484451789,17.37967742062777,16.365420960457243,39.265911968396374,41.68410867864966,15.207586032440545,24.62050493354836,37.38848079252103,17.91624099804674,7.801879557923563,3.9170015830196303,35.073300515297056,2.903688986377362,48.77268964210432,29.949102267214677,1.915063092314917,46.70665756767514,22.755374610850033,49.61239111726291,30.861596823486416,3.5236562727187226,44.099728891204535,4.007547611687845,28.928148239534412,20.016211122339723,30.083108063584096,8.258681527172385,32.37055344064073,26.074786161223905,37.010552804076404,23.3931633779216,40.479881440058904,35.41496815737698,10.056174009252617,24.012412678033456,21.314235975896977,41.131274119203354,7.442850110495702,0.951218902779527,42.786574733863816,22.816317820175502,39.505429428042724,26.07519698974272,13.308310679372259,7.884623642499866,10.667883627659759,22.375662845791666,15.726662127205815,10.931264930491857,35.90777534985538,38.855351858927634,46.68587541515913,1.1405466390648544,0.7699863428163312,38.99420923231089,28.10118442763295,48.69068197897546,25.05091057541089,47.47920734142623,2.341875408221006,2.0715214379244284,40.40204871338007,36.98582228540444,17.320538988156166],"expected":[-7.766519061478062,-3.3108779156819255,-3.4957138468408804,-5.050176479088249,-1.5576693040516254,-3.156649587602452,-4.7461628417313255,-1719.130628472067,-3.777593034294643,-3.3075390762243178,-5.729934077437606,-3.3330396551380117,-6.587027719655413,-3.2476346534445577,-5.619480397122319,-6.447526759734492,-4.847079687056881,-5.177562134539016,-5.687914877466666,-3.110364346404214,-1.77883026879553,-3.5879012690781393,-4.131096967666221,-3.2556771508169975,-8.662840172577848,-2.809378932532693,-6.622458358284849,-3.1938318847606535,-6.788112390909789,-2.928662906021101,-2.8319456152476543,-2.454626414934653,-4.738794041009482,-3.504667397979271,-4.444345382650024,-5.20472130619004,-4.624364504922665,-4.281290695791143,-4.814121788233842,-5.2041254232099154,-5.877092797832378,-4.00106829754807,-4.864329283177312,-5.575599675172775,-2.7711127993222,-4.738337093092759,-4.22212892688397,-4.1363618224551155,-3.3072442460625027,-6.387377059653749,-2.9459247893492515,-5.419200757457333,-3.221095916519157,-7.386955966737357,-4.287775643545974,-5.575658932177558,-3.6151727264220015,-4.087125006505053,-1859.9725570802016,-3.1521447399287346,-3.774347185040872,-5.493603170481187,-6.929283249970935,-5.77641332249371,-2.8611457644730667,-3.2752623774742347,-4.495295476446154,-5.639983399125642,-4.03961226589917,-2.8669349368104284,-3.996302545134082,-1191.5202800120078,-2.8633092617581726,-4428.441444627568,-4.491504159245428,-4.066357168066242,-11.229449296359576,-3.2210697182118753,-4.758371394125593,-19.961576058552385,-6.185035300253653,-4.886506694328937,-3.5324954238308104,-3.276355424511287,-4.2775067969400435,-3.7125487775991712,-5.274015830636987,-3.741701760119721,-4.414033765078196,-2.415186764587576,-4.137510416759914,-4.073781319321221,-1.769664661278064,-89.931093895375,-3.4748078600303813,-3.9215530973488746,-4.450801972220459,-4.0716641514491485,-5.853342066146789,-3761.7330826941497,-17.53277968883026,-5.244532298822181,-6.039204925275185,-4.952636218544116,-4.715466388746515,-17.73222860826644,-5.511110160730766,-4.085155485414838,-3.6587825541145254,-5.885439626227812,-3.2364941378958814,-4.905497498287292,-5.130250702186768,-3.5294345872554582,-3.5718471833016885,-4.9064777927408265,-4.819312363787491,-2.8979085931959476,-3.601491115497941,-5.228119495736988,-4.820471532615307,-7.786580931532296,-4.876495218504928,-6.72170964659315,-4.349773308853324,-3.520725253470671,-2.856958469333948,-3.2983594066493374,-2.8928115502787772,-5.146310839849982,-4.335876838686722,-4.791209980861115,-3.270462424930476,-5.995900512979446,-5.712920178724819,-3.6562319706366475,-7.3568185312961285,-4.378151351503975,-4.9784212713627065,-5.900891465945314,-3.355445658759509,-4.813576668707677,-4.584793070174565,-5.469062952161825,-3.2969455931522624,-3.336951013227081,-5.124604463434333,-6.151891237545499,-3.3733142517135875,-5.014129525331195,-4.512174633590405,-3.3117992717687663,-3.836219152752092,-5.737436696521195,-3.418032066188858,-2.83838734836185,-73.45791608751827,-4.279245084499013,-3.3296856426456696,-3.4977227613731907,-3.0005793362518745,-3.513275558204673,-4.434843404298232,-4.050869743878466,-5.915494760768964,-4.78376367878709,-5.659011366614656,-5.858331512029406,-5.075121646928442,-3.0313910905075088,-5.847734644664826,-4.2429693361216065,-2.708538193281499,-4.878754616579946,-4.279950957983337,-5.352880134419349,-2.822679017245652,-3.174822368268116,-6.415856419843893,-7.019756546561081,-4.984363703786667,-3.6668971933786616,-4.8066259478882305,-3.926808409002692,-3.6896193087712224,-6.760290808281791,-8.870637878871985,-3.100658732095452,-3.583123976636663,-4.1989596440702295,-4.564195790755832,-3.238782298980349,-3.2635750002691015,-3.270754171051282,-3.3841111622219517,-4.319482682392121,-3.7276418243399227,-3.217816832014083,-3.5789892831918007,-5.401755705913871,-2.8625062783482376,-3.706834119740422,-5.644665876063987,-3.858181942307846,-3.7555393857267707,-4.399896128529852,-12.772302142140658,-4.448253374588548,-3.7783550539864073,-5.3855588490281,-5.086391790953701,-5.547081587641346,-3.9739778152412355,-4.723058105408479,-4.904604255393065,-4.60220849833589,-3.621396479939234,-3.265178952956873,-4.707371308389537,-6.219352618164472,-5.049845394032003,-3.4911109674489897,-4.671672358694851,-5.668287014977914,-3.629447922008782,-4.472223366861661,-7.804087927088638,-2.818457723729147,-4.005020878049789,-4.514164843031465,-4.329165167381077,-8.409140241834,-5.4592597942145975,-5.258779120559823,-3.1476404748912645,-3.4881772412611314,-5.407461128004628,-3.518712480985057,-2.5767878557884196,-3.330109056397381,-5.346927537430838,-4.805276511385507,-3.998678709203703,-2.283025635391538,-5.530347765421052,-4.6881327672001625,-7.502497334119795,-5.078982406090637,-4.240206152387029,-3.598601647358922,-4.392761452028466,-2.8080793180155226,-3.4711149097386724,-3.231464079264269,-3.269303071761661,-4.571346079543233,-3.6823839033681,-6.984249231593598,-4.25175488331944,-5.152176199377441,-2.879748838831745,-5.507625500052493,-3.0265120920551762,-57.85021798109334,-4.894503030159659,-4.9880375679517615,-4.467871837966346,-5.1250520712587235,-4.144423542803894,-6.095390494058939,-4.940352444326107,-5.354737026096776,-6.211736482517692,-6.5400727903774865,-1.5855027218740907,-3.2972916248409274,-29.6118368578313,-3.139781365368393,-31.11749629031983,-5.129494889924295,-4.806920094707134,-3.6869939030222363,-8.811639127201085,-7.292884251429217,-3.7681848813441587,-4.314567152516835,-540.8316837684356,-4.820560966451552,-7.850348002760375,-2.968786144091095,-6.051613562978481,-2.4761077627022194,-4.737590680184279,-3.3756552298359,-5.916289737815718,-3.1086409245855218,-2.0148348588559495,-2.2661798641809403,-3.2311681756883592,-3.1142376400215843,-4.317046578687221,-5.081013650217272,-4.826044669580059,-3.661844821312814,-5.245768301562481,-2.5873723741544574,-6.30121171543159,-4.25821618678059,-5.993548824364766,-5.289869042622408,-4.747780483643891,-3.4899589894258494,-5.007156427340447,-3.674866105964503,-3.2753494560617042,-4.768592484082542,-4.899345112978567,-3.042094126703531,-5.057853002707901,-4.625555090723247,-3.826148881018285,-4.931822147709722,-14.508176051965076,-3.1942834561088778,-4.188740645984152,-4.70037731376256,-4.525674949284209,-3.578601187862978,-4.22615084387881,-6.946170171023292,-7.728556068236966,-4.354875451449666,-7.382901197186171,-5.335253406586778,-3.765617968968969,-3.0784210626497153,-3.88628233548219,-4.725039225986947,-3.0976520408514494,-4.90343143977071,-3.8127845652088053,-3.970778137209997,-4.153089003577359,-15.138741408176262,-2.843884621317192,-4.726115454757621,-5.322568281486979,-5.270308168732236,-5.731908522237619,-5.994561841039502,-4.689969088051743,-4.180627933176581,-6.257396834468727,-8.852383293757113,-2.3319371039767143,-4.441823902351631,-4.56527697947631,-4.292772940294224,-3.4606783372220615,-5.814871956997013,-4.936695029073713,-4.633776015265432,-6.021329612485172,-3.224724589176679,-3.152707968037889,-2.9642809066911737,-22.407916847199246,-5.6575110874478876,-4.002950283833425,-4.912593022433051,-3.536058649971567,-3.391978650860377,-4.757288021396537,-6.791370803290635,-4.759159261854177,-2.603610212887476,-5.20551820895626,-2.8848433126069852,-7.806194081527761,-3.991098809196321,-5.194753716755581,-2.5049258018558476,-4.1026241738583815,-98.15557852364768,-4.917282140078497,-4.511363441790721,-5.2372372574782435,-3.5436642048348816,-3.0019648100808487,-5.401937865590181,-7.0951498333856735,-2.4720649000126973,-5.516606151807724,-5.129729694865483,-4.387202030297783,-3.287226736493534,-3.349402719439741,-4.816254583532502,-4.343097176547565,-3.319234518025041,-6.9040586111401465,-4.918021153928559,-3.7323503213660887,-5.372964107133371,-4.1186818185762935,-3.593935197058648,-4.6455950786562585,-4.749470587446399,-4.826372666021229,-5.0772902602700745,-36.76767059078763,-4.931644275280028,-4.096728111409151,-4.52249465382493,-3.986516953064557,-1.907824281904662,-3.4998839657434915,-5.326871242948941,-3.7016318766620504,-4.714722189552553,-53.055917972894825,-1.7909009143819403,-4.248956214340192,-4.573587742035005,-4.661792776899722,-4.48660450477048,-4.120685672557544,-216.61465927775254,-6.877948752892098,-4.740923993341537,-4.314534104015116,-4.218119535258345,-4.44625699380322,-4.6109646617937585,-2.8683923801745483,-5.988712849387334,-6.898659759471267,-2.856268592513044,-4.192282453558263,-4.619465309603696,-3.066604766920332,-3.2963867648361704,-4.453831074967232,-3.673222405017934,-5.328260304760294,-5.5861449661113936,-5.3214724077549205,-11.758307777829913,-3.0011471429018077,-5.014263467504223,-3.08420446132663,-5.642630555292252,-5.1143012355171615,-5.683560317550402,-4.866145608371922,-5.8671011555653765,-5.771322468204992,-3.569512389091388,-3.545183248652948,-4.160151708949992,-3.4425529371484336,-6.039787469475149,-5.5243007085937155,-3.010943258632701,-3.852619251680936,-3.5667770586451506,-5.30514079640419,-5.74044851987874,-4.609292121799548,-6.603711182295644,-4.5223454839673645,-5.276745896740358,-4.066078271786692,-4.376950967808758,-3.164897840788502,-5.603024365809006,-5.6119720326213915,-5.653343275251836,-6.1683704305694835,-3.04446077814375,-3.6780828118697086,-4.744117395956043,-2.9136169103115552,-50.90460776339488,-3.6911075151455273,-3.0033596089018584,-3.497704040634902,-3.022181665627488,-7.934856013676777,-3.0442796467667113,-8.678063784208014,-5.908776418999768,-8.934887157828722,-6.377082585076887,-3.040910110399433,-5.4828566740488185,-24.268036093114,-4.275768507599625,-3.7150823036862937,-3.332591143816231,-1.5113481269382751,-4.78285022449195,-6.528506036576972,-2.5497855020434126,-3.0553439981801387,-4.731091992716679,-666.3625086097169,-6.296206466431576,-4.1565996322108685,-2.3673098897784333,-6.9705536329130675,-3.97965384087501,-2.8124154916373754,-4.846443742176358,-4.107353102929411,-5.39709637404958,-5.502381563288865,-3.395430995477464,-2.3530837588686007,-10.921031946697568,-4.2876607273604765,-2.19944917368359,-4.150642828961271,-4.982647051682635,-3.569299940493715,-5.617440884683738,-4.181577538649352,-5.464645074603659,-5.97200671455808,-7.069574465975754,-6.04934402338467,-5.876885757052619,-2.8856129030460584,-3.793335610137212,-2.9347792866750044,-5.020938948031081,-3.303705486399743,-13.194650294024864,-6.8526823864963,-5.391151680923282,-3.825713114701895,-5.591760022478007,-4.124521792609095,-4.791081242042585,-3.3190152068083916,-4.730139475175189,-4.106936383437597,-6.748779147803675,-4.196200083197034,-5.155796524917843,-3.5607364193528523,-2.7190774546797325,-4.788023969129839,-6.055354111492988,-4.879454672599229,-6.361992412128001,-5.886515958375344,-3.6844569564365557,-6.732470336598369,-4.234879250875999,-3.900901895604339,-2.783488309639395,-5.0934053993806145,-53.74182273628852,-34.27787149996099,-2.8348093391832045,-6.825905625467048,-2.5896330672154173,-6.051814134496466,-3.9993278175770572,-3.3442051015917666,-4.109701917422423,-5.1140381250235745,-4.28701852210743,-6.941561793261564,-1.915089101707873,-3.517840047483596,-4.170185406943101,-1.7896637655942345,-4.229050671872733,-3.1833933777526937,-6.563726278791498,-3.3037569055475675,-4.8388932465531935,-6.119515345688485,-23.451276458743795,-5.171788569419943,-5.308075719368122,-6.319953009188514,-3.9593807119281395,-6.3943726281259075,-5.711439191468392,-5.818074164561792,-4.890219709987157,-5.385223350566951,-6.472276359898869,-5.8978835891810295,-5.9232102088277125,-2.3662773928116816,-3.054293617249705,-4.251752713219093,-5.194197109180364,-8374.651625222452,-4.896267357351204,-5.441934808439914,-6.619488390672436,-3.5707950333981424,-5.21406443542326,-4.570092122995321,-3.1675192724583665,-3.9884592545332396,-5.291054930393088,-5.39407083657024,-3.0036407947294643,-4.373439365524129,-3.3673834790773443,-4.607707534398288,-5.502895785459258,-3.1292860112521628,-4.328626337204464,-5.008503294311327,-4.942918710629,-5.546809245537922,-3.490479126315165,-3.6133229960005315,-5.7443628297847935,-5.52261509109388,-3.4696803276474166,-5.678759406142557,-4.051074497126182,-4.097778610492241,-1077.8267958492943,-5.014100029404409,-9.151184897843066,-3.066546545640497,-2.7432656333961414,-5.629643910215968,-3.134194037552494,-5.63917804245285,-4.861836363622692,-3.4461227608550185,-5.418815016846189,-0.8345549424066804,-3.3869455253192697,-4.828799175570931,-3.418925593979007,-6.307045033376505,-5.442065644267239,-3.9483809209936207,-3.4998350747315854,-3.7089984048734146,-9.024733257541502,-4.527766903529698,-4.595725975617578,-3.397080929124725,-3.227015563996864,-4.8122799076647915,-5.154539737296388,-4.693308178861549,-6.170193634906093,-26.926129479092076,-2.1055047492463244,-3.1609287806256807,-4.520223234822705,-152.36101975783328,-3.4317520008465254,-4.666638463649244,-4.0936903012970856,-4.9091443169716555,-4.8748195642451115,-3.468581738630488,-4.584422504254639,-4.5969699437326526,-4.082536938425315,-3.6387512616505173,-5.634506807033364,-3.3881932384872777,-5.279548874157919,-4.661996233707665,-5.818558049564637,-3.4036730735631107,-4.517843428978573,-3.163922520621565,-2.9311401200846503,-3.2648822105307325,-4.333993078409998,-4.376934192362587,-8.031921598732758,-4.8168805344921095,-8.194357778780809,-2.762117293820625,-5.034503849653144,-5.595190143799768,-5.320580467247413,-3.51038982175497,-4.325650319464069,-3.6158197343973613,-4.923608265324473,-4.568948677126834,-3.5337182120176114,-5.7671487767810765,-4.84021618987251,-7.812167412104444,-4.129729205988076,-12.33271513724367,-5.566359892759302,-4.315878772240109,-6.178184105623808,-6.364479272901468,-4.425280532800224,-4.080449303461016,-3.7476958977918335,-4.709104697940974,-2.849301259907655,-6.193479986252728,-3.87267389975159,-3.546038467915066,-4.214649289041235,-5.855011413912732,-5.4265590490161495,-3.689275925238093,-2234.199518580461,-4.526138818905532,-5.636261398540148,-4.533511385683883,-4.443261696039818,-3.2190263453601515,-5.289780456825632,-7.063913116925072,-3.7861321345477523,-4.442033278282911,-4.41656158766616,-4.846133038843282,-4.848338316598081,-3.1564874716830125,-3.376284004636655,-5.546589631493546,-2.636621164700035,-2.42447080970361,-3.5233570782088792,-3.5405061456921962,-3.8056585786441812,-4.244088258646233,-3.542996524273108,-4.770994368070658,-6.599738333175333,-2.5683546042972036,-4.141395520011332,-5.147710439647489,-3.258016254410725,-3.90661401752008,-5.245070943003869,-5.301940302337815,-3.625042451472463,-3.475080035957939,-4.101302401086057,-3.890060670421124,-3.7160865559998255,-5.007422390672695,-3.925617831580563,-6.504251763910965,-3.631231868182319,-3.278414008321817,-5.409830920511954,-6.095156878559726,-4.471273685322943,-3.467368188850168,-4.054796875136878,-4.9582557353677785,-4.035026286451398,-5.511332624252227,-5.802220889667536,-4.562421838440374,-1076.6352089129205,-5.717539265561531,-3.406691256280532,-4.669862946399487,-5.623710419153063,-8.312470591669992,-6.206933517702876,-4.039435813899475,-4.073978850503229,-4.725641794063703,-3.4080117204122757,-3.2777429628125083,-1933.7822041733648,-7.035225316923342,-4.768179097401248,-3.0438634688710984,-3.542091582432477,-3.50834958995676,-3.4356469625526596,-2.7307880161267053,-590.0102407612243,-3.0191200684077457,-3.9527776653151117,-3.247170145766875,-4.365347576503432,-4.343767851275984,-3.7403724357021972,-5.596834678597616,-2.95008364079069,-3.9523030689365495,-4.553321326757282,-7.396988644251289,-3.3556364596615866,-4.980145591027267,-3.8533575568354372,-3.5275265563202414,-4.807596208641239,-5.623332019356577,-4.546462392808309,-4.9230354245733405,-5.299354393816092,-3.1527803547708686,-4.690479387772244,-4.409500378086228,-3.5800947822730493,-10.490800692942626,-3.195305021284403,-3.330239731555741,-5.720341722600525,-5.241028386630275,-5.073998773949068,-5.344194203634382,-8.495665135441548,-6.743580201983105,-4.678514208623056,-6.214611956473119,-3.21160473076429,-4.151495098970227,-4.397308349873848,-3.7213892395097043,-4.743141314041728,-4.4287054194358655,-14.75008503895889,-8.917667184741786,-4.201983045568937,-4.010356255211693,-4.584487402991157,-8.982123513705028,-4.997031711292033,-5.640947845909705,-14.779274207177952,-5.468312537923563,-4.689203746478305,-3.6005212320565345,-5.5490545741947965,-4.616181999253912,-5.285072778948611,-4.2748484080250195,-5.518391425308116,-4.648427271438005,-5.480749081005576,-5.004525494640797,-4.27278607640372,-3.9646829800085537,-5.503393589215323,-2.5490303607781293,-4.680487657226702,-6.734789864973014,-4.982542104131826,-4.607579898730559,-4.080143627990441,-1.4542048091894793,-3.8484895256123774,-4.4197474927233005,-5.291325620191618,-4.145509476117236,-4.7602929926769315,-4.6734602822060145,-11.263544276390851,-6.897334165040181,-4.614595795218074,-4.582136279367868,-4.722784916527914,-5.485801337400535,-3.0325939616800586,-4.232573569399424,-3.440341308322942,-4.127737994640014,-3.1968135168749523,-4.309475811746165,-4.909457014638226,-4.168530742000724,-29.96595241179215,-3.8871825422137336,-4.0272155916414825,-5.0731798569096345,-4.048242371374696,-4.532815595465281,-14.764413766845314,-3.510648772135169,-8.432629478925113,-2.9411018023360604,-4.803668887774192,-829.6305701003365,-5.571237781409339,-4.652258347309088,-6.022473626792371,-4.702379383175669,-2.310662342196559,-6.929772565610612,-6.556502845824001,-3.00694079817538,-5.238933158883463,-4.335500011003197,-3.7520071439475884,-5.737696518593842,-2.201324686311312,-2.8051383795615505,-3.308743409597434,-3.4421620126355807,-4.503632955020288,-4.43377160347732,-5.25391572761408,-5.029621578784712,-3.560442626682487,-3.0886892875909076,-6.0974783915899495,-2.9333539999694547,-6.667612894087701,-5.820203688673963,-1.4964463604108662,-4.867814672760603,-6.650986318711722,-3.3508238290222536,-5.536578364132262,-3.616730979639137,-3.0279814573334654,-4.490838792828718,-16.130386009352407,-4.000227352717385,-4.67145830936097,-9.107921037541434,-7.334799972774269,-3.7229575894823332,-3.543213304735112,-3.2965343072428324,-9.359261455146111,-4.9255164409904735,-3.2515960224382394,-3.7492160607187217,-4.738223563309911,-3.806390055545074,-2.6552324524405737,-6.687886476547714,-5.022938501859475,-21.834722444524893,-12.860799532795857,-4.228592995743794,-1.2224292369864656,-9.594923465360141,-4.263675560290378,-8.297928700722087,-4.311421850498212,-8.17079681465445,-4.786371538990864,-11.208147515609362,-4.605009988506237,-4.688694223822282,-4.282602786985967,-4.0911924995990345,-4.180727057713186,-4.309415920088292,-4.47860606894278,-4.019952567296377,-4.690051547537718,-7.605797732605699,-3.743096702758317,-4.54046648631689,-7.8890511929561695,-5.531293386151833,-2.555166457450971,-49.09905073604805,-4.974623373053614,-3.671936205582742,-4.8324046284103925,-4.077257458818255,-3.1219730851371175,-3.080138727483799,-2.918849253752856,-5.359306372912358,-3.898667941225709,-3.3505248871385054,-5.441695380191916,-4.881515684219724,-5.161056105636748,-5.638618003782374,-168.46495762651887,-4.678706771834774,-5.268018753430802,-5.611453273802661,-5.502733621576642,-4.832420319159782,-16.445492397111458,-41.43790569681298,-4.978205426051366,-4.762938638560108,-4.082459101161723],"x":[0.2839821868772363,1.5900124858479359,19.00994061576002,4.284935083263783,3.230678888201557,17.21564105015198,19.94683549393499,11.008810960716602,19.178937014935972,13.397607319613435,0.8977770504720661,19.48292146336896,2.209525733228297,8.29991226865447,4.813948764211644,3.4520134606483177,18.22159438120738,12.051635532692817,7.187272434951084,6.972377846708171,3.7464755557717178,13.712648238853014,17.735835864327267,18.858603214137947,0.24496583223200918,6.687546026468403,15.873894776161968,1.8615718343576226,1.9968348843227224,5.551511499352939,10.70978263403581,5.294283989770663,3.3841957465139894,16.71185552784698,13.30604583205822,18.999530354381456,12.490451193522883,3.618776626617657,14.995863980202206,12.206531787285249,5.6499730387487945,6.9945252238780675,9.160553065676634,8.506097519254583,10.468662666530374,18.48735721010412,14.312990834246943,2.0063374789416377,16.404850149681383,2.1410289383822834,12.660411701038758,8.532818456552151,4.789763030959717,1.2646821454362822,15.065513467584308,6.637322988271475,6.337977684697815,14.21256263400856,12.332979135607648,4.1606743866389895,16.48460279867361,10.183923958292404,1.2799792842603486,5.8138049874283215,11.79845273515783,16.633154326439694,12.329371100920813,6.552258221980973,15.265739962170821,12.174696249260052,8.805698197848763,12.436469274330534,12.12873368590628,5.899996603047972,18.89010019765761,15.685942064236915,12.082822114359498,18.047543604169963,6.851067353931386,2.4870754084785895,3.356576242094893,7.511107576820475,18.47853222638851,13.574001137689446,10.628207254517005,8.043407644794911,1.081312192188939,9.605898936856745,16.96201712615402,0.7934411355845183,1.8081533297607288,19.708698545472775,3.9036509091413407,12.260137787264087,12.073285485852523,7.412899314667727,9.265507041982367,10.21313065281008,5.920218192131075,13.911665725322347,16.02062740835105,6.63516607435469,4.780573861111854,17.049607199312042,9.022009946806083,10.30747459283357,10.134312710856497,16.808870252330863,18.678509112467232,4.816953512427498,16.142034652416108,12.611185551326777,4.239536082183388,19.316546673988924,3.853643301857299,13.091989504164264,4.6235083745199335,2.8932596684039913,15.819150743796136,11.668374378960436,17.00568666192933,14.543372427369441,10.919992295008957,1.1972319156988798,16.307350274595258,7.745598491021379,12.634572533103325,7.250008687898717,9.069241272320125,11.466438828489434,17.854091475613806,11.510758854143877,17.92519216007666,5.148030825712229,5.854426499663172,18.549899723059934,1.0202322753629112,16.51941939804546,13.922130151474335,2.7841205820395665,11.661619509337463,19.709622027047047,10.391249731430179,8.707285626025145,16.41468255920991,10.326501563303845,0.2325640373466209,3.3513363416487785,0.39621882929338437,5.119113795678731,15.452282000796828,2.6393355432121046,14.808212426820223,6.592585619140117,18.54518429476069,12.572142223053685,6.60189218673449,8.294045919130571,18.81312251429293,11.062406693692118,13.211628025763954,1.5948804113994353,2.354587713781977,5.212906254184717,0.23918253285198254,10.381542093893298,4.971129754230299,4.3922760776899805,7.758661355015954,14.335466909568693,3.2239845933309663,16.52171544521229,11.01842248050283,12.075280924858362,19.05912739611264,8.670348130914448,12.284007008005577,14.892198746259698,3.835962418540091,2.142060154288137,2.239656708844757,16.45098476723031,14.304454002383181,10.683967416861485,16.41689566865333,2.3917817016041143,0.23012774362621613,2.5403479812624274,15.281332655460144,12.307125169034684,16.59147450415655,9.58533837016924,12.972680991275322,18.823961776596473,14.720368957476918,16.08286029486219,13.840086319478488,8.439474967667895,16.772340843153003,4.950481805887081,0.45716831069400055,1.622809825195315,7.795328526827592,2.194571145305715,12.372944882586946,12.622292495838593,4.7097937097435505,17.882967824150228,0.9052503417310076,2.9590612466059607,13.51860093920871,6.895974522849495,11.15275164106655,11.56657891498654,18.68999310507494,18.785552743938673,11.602311329602406,7.535041220564356,13.29436263455753,3.871395628983607,15.421276010671722,19.719851341225336,16.037609128455244,5.509038775981927,17.4506084615923,8.624479738909772,0.7639582380669463,12.252088836521612,14.251939074873343,5.041573337333585,3.0448273456544994,0.03439267683009728,6.240770855836186,1.3674137396706332,12.642742936834539,6.216330119915967,10.599723747240407,12.507591650199625,4.855772709196615,11.51640023619342,9.848396882387096,17.771426681570084,19.26297772645322,4.307258882363629,7.638873490541482,6.842168747717525,1.0548011407215618,12.77167594792953,13.524220640836205,12.058671925736725,14.734694892159727,5.36246948447995,17.731556186520375,17.282392992817176,8.434178566921275,19.322208484933533,18.32710639854913,2.2067312053315025,11.673807576912294,0.37668903118730057,12.26753239898612,6.670965516200802,13.554031632480594,4.9240488409544,15.210143903967683,14.113979520961642,18.601723763919736,12.1857792697078,15.351473232915588,2.1499039094949346,3.398288445120907,12.131652676100702,0.20783436395933386,2.771348695723641,3.428141442664039,18.31255539914711,6.8838736585822735,16.052462687076208,13.281093956188975,1.9081290959608754,14.146003735682452,15.026722429259088,0.2652196856586819,0.9100186756888418,2.0198691356885545,5.075519827443413,18.28833998548724,17.120116175299778,0.5535049688774851,11.775224399280834,1.6705918801799635,8.354814196706805,10.229757144384797,12.744376230194462,5.746703165081146,6.164258465069525,2.9998420072417975,3.2404482058932738,17.957859309173273,7.96324012799158,7.8587111723394765,14.275102994373832,0.32652894550526224,5.460592793040844,7.876176075157506,8.651602971090933,4.4157939435463645,13.32342663435195,5.463844708057546,10.29559171577441,9.032582492515925,14.635284432669025,13.988466551688052,4.7176563538001215,16.556121849019693,4.673600413921126,4.74373974533282,5.102434150670256,16.817194311132155,16.75337772218239,12.811729116106708,17.35841002298233,11.955338251030469,14.020664316518566,14.925859160706585,18.672569348927514,16.631284754521577,15.94211737199204,14.797965535961284,1.5606146018853462,0.9785422779251141,7.767457312479955,0.8471428520422419,10.676982943494107,16.12094571626787,15.829747727548682,17.49073999259575,17.173480925455827,12.863735492807336,19.33903500391346,19.583716137637175,13.8406851347739,9.402047961381967,13.955617262362331,12.259055696939129,9.429155667113864,11.601046990397448,8.157045111781658,2.649619678602746,0.961928831380634,11.035777016389767,15.376005046555532,3.480095449550995,13.80514190695612,7.372429840432302,2.114636414589639,15.157154856066173,2.2490862359625963,17.912470774172604,0.8237709413864547,14.674476592023513,7.670021783641321,1.4479828772201797,12.97592936287531,17.199481152002303,12.90842031299329,6.491575934589271,4.39290277103197,15.498563159201847,3.4367151869262313,4.550489563598354,14.996417899765149,14.964383649013167,0.6604797762995407,1.0268167102883652,9.291031205135344,12.492954583924675,12.328286029035368,0.7789695093503335,10.308972349558477,9.784153321157532,8.288805844934664,19.388493432884275,9.286387692783755,9.48289550123981,2.7871130588491377,2.169280751774836,14.21006972823108,12.587006799951318,3.1565558251165227,1.4217264958751752,7.814546688226529,9.497656648215415,11.943972867932091,19.831545075053924,19.5271478861425,5.9266712517320475,10.84806633431561,4.192548867304402,19.42584215810578,2.410101880846205,8.056050130285058,19.595415299686003,6.561880059289158,9.852082634770593,18.01287478169154,12.185738749183104,3.3902606927628343,17.482151021540457,15.831066277058788,17.79108348245544,9.13955661710698,12.077407077796764,12.452005644049997,19.233595999645175,4.400186523340919,7.026737545975443,11.998949441317471,15.099030603600582,3.660736006458012,12.897511628423143,3.4260384770004038,3.452547743800496,14.099716750093506,8.470311068190961,10.960935678548406,2.066089273205751,16.993584560846692,19.98922549501073,8.422944302907162,15.170915122224198,19.067729279558968,1.2856637298003193,6.535829794681893,10.495176623422537,16.948661970252953,0.5928914726025614,8.793390132532522,12.500980466963853,18.73203984137653,11.533748943895636,17.23510575064001,17.015164337331704,7.976923915683698,6.866112073772936,7.113752945873695,5.36420265982946,18.875915964952306,6.0000874591336695,2.329752707188635,14.227034113373072,4.928129389876679,15.036757701198136,6.809116805136823,9.115663931283816,1.4269191129152325,4.772832667045379,19.02521006111248,12.647954662847273,10.682181248193462,10.032432808564522,1.6692772564102443,8.824630706870401,12.921284082072244,15.48640224727217,6.700723284604373,6.414988774551218,6.719332117342649,14.211095452649873,2.790616020083143,14.68964227873792,7.891282979321437,3.075623907898124,18.538189860319875,16.128504680621955,1.7129848896144129,6.479494754153579,2.4234695159317887,0.94061354555115,7.675147172166001,16.77349025636172,8.307829261014344,0.7295687481415403,14.768202120152786,16.804269755975717,14.24289646713557,4.65312235652275,5.422685731197623,14.659191265821466,14.260258061895943,0.2503437697468325,5.638450968186923,0.22189122599606925,0.35930702031653716,11.101061712172102,9.546507824959436,15.256670205614311,18.179522612362106,14.337720514024234,2.5563722608030437,2.8187111531594944,11.280193834120226,2.6429820674151117,9.379700273042184,14.525020812860685,18.57520267847045,14.529236960592096,4.351868933731611,10.828522887576352,7.742438876541007,0.9224331967420607,12.003307884357785,12.234538164220417,11.855495134023384,13.513674013891732,10.576116435523542,6.8438559339540195,15.838522441047061,7.719719713819551,7.05809527820493,17.949265034877854,6.342298995049664,19.561227451324395,8.652848182673045,12.638127043050208,1.894763978289089,14.520413084498696,10.682035610685325,4.403459538416379,1.909888734000349,4.4136802484880056,7.017585058527613,4.539829271944735,18.5756652365526,10.32134778961181,15.31362464932192,4.61646425536872,19.34735999895958,2.157058945447625,10.290958153259972,6.180092032046831,7.227825655126159,19.250250982751123,14.522649826893716,16.585206697669065,19.31125632284231,5.703364068058785,14.273520312047792,8.011973050688841,4.153151271054187,16.370087313996162,6.67802677681443,4.44342248812625,4.604368229911766,19.610900989801934,0.5080302583891161,3.7759320242058436,11.415772395079898,1.9572091219881305,13.420652006534542,15.139720556926783,8.87447461962385,12.169114248464803,17.205825621567243,13.714429705662692,12.008349237286659,0.23650918852569536,9.127228954394639,1.5765648065251847,6.6940910967217215,17.778668482978276,12.764966377304109,10.375107498334465,15.53335822353966,1.126104331566209,4.187958608293596,19.18921181632112,15.116214931172983,1.212062187756886,17.85599747079437,16.16701884297595,0.2373641484340938,11.401298214951998,14.54909333198787,2.3775939978812355,8.739665739780857,13.581289055712954,8.269010181970033,3.4013676989546404,18.564917908499826,1.2690229761235816,6.791516130852324,5.229808350958263,6.265934312103414,11.211675739207632,3.7699024683429183,19.984495016458474,6.183690699172835,7.613223016635637,12.449807295525023,9.270480664281294,11.197694001093094,18.8817906455831,13.971047394415743,3.260365727690897,2.8719801256103494,11.35833269840187,8.465888820030592,5.09257995830001,15.45033379623581,10.880468125356746,10.152168679625845,9.380596855152232,7.826193848305558,18.039032657548223,14.395767821899064,19.651863556146914,8.726995998071096,13.403779010914976,5.426188126431781,9.28080514102042,15.088772209963622,6.2401855630474445,1.2807250908670786,8.029592534074057,7.641713487018005,6.631945023400698,15.45494513105047,17.15705851371931,12.785506960787787,5.38996322382391,7.24604489743748,4.7772476465613245,0.22965250678425253,14.970431138731426,1.2813393549506502,8.131671495295706,15.244907737920336,8.470848358524666,6.232797023141039,8.662341083986131,1.8034787261841778,1.689261520400609,19.625182107916572,4.97212613393013,9.8599395472767,3.670224734425691,3.468750251505437,10.380604281950303,14.40826139621393,15.31622339484182,0.2061936330981906,14.199005061898875,18.56050111939497,16.35961684527444,15.67238865304736,19.305523058613097,13.325507410113214,9.522623806645921,1.7133938690794537,11.973403296952775,6.032417025038774,13.330506638703273,1.5912053678162197,15.83510866811299,11.833569682655645,7.774011068474005,15.993680966649148,15.869752916786698,13.530740634581502,18.684481057988553,10.67672461919248,8.160781470508613,18.282742000916446,9.725119732954543,7.9198544883204125,4.969506133940076,7.554912011953214,17.49802193671774,0.34082991368960425,7.740926849708218,7.280732714655995,14.640740485351596,12.901267916157035,8.069392989551973,6.5866877605844865,12.353409279360545,8.51495791494488,7.100075390655838,6.9239023155401735,8.473105943665589,11.385448289290938,5.164459821575167,6.621258469759264,8.90938678517296,18.892028568067055,12.972520372396211,1.0353942388982018,2.512340745247741,9.739364348289104,4.862135060257007,16.345028006012228,11.449237956026463,15.343620772315042,0.002873632378137536,7.046568501642807,15.183049199018427,1.9769617526244332,15.196420405868905,7.083092266755813,8.963845605905227,18.153537877483497,12.023794232822658,6.116802429023442,1.8203385930397875,0.5892949641153011,9.012689049363715,14.988476494927294,6.451854263868748,10.437951482202287,15.624882096609,7.801110822983435,9.768260678933984,6.407856184113152,18.38133466297133,15.040864201725391,10.147743533652086,12.45633893588641,0.25036037165568903,15.10616237479422,4.005468699203059,10.727815315663136,17.93960490179517,9.416528963471261,2.405839590108676,9.93843616028431,8.216532795463438,9.746749842922672,4.444781207750119,11.276716217037514,9.758562346715287,11.857002683753993,8.314960517530796,19.25017836175355,15.73167140185522,0.3483507674663766,4.200996641895891,17.20622459889054,16.775100714925955,9.301473556359529,5.687951407924334,4.556140308097847,6.52154833671986,12.482015706699038,14.786899006830536,17.60125259018531,18.667465076047304,15.319936746993346,17.0676999260899,3.3817364842519604,3.528078325018984,15.7388873549116,4.065505902272943,10.001843552855325,4.733409751125048,8.610629076161121,18.293892965579026,13.625936385427249,7.585832320205368,11.54248224542934,4.994618997027036,6.758022868672993,0.3640069639668386,19.005135228779647,5.720158429079305,7.648414938283512,8.744529282745424,5.301620461069105,11.293277258348642,3.8381587170570697,9.443874615978455,3.7466211691102957,13.297950739619457,19.031713520040373,19.290664639932157,10.136745029082302,0.18274632512944144,1.3471304791464878,4.145673623303003,16.95078758890805,13.813268548384986,7.931025916130863,7.380768085541929,19.215044286033006,9.027243210599604,6.319800040316492,18.114307571669222,8.954417978104772,5.377038731995594,10.68454821652265,1.7921207548725837,13.07399396120851,13.519612400652843,3.171248779438338,12.874828090349464,9.131605597133529,5.219600343584148,15.137333136481859,19.107605309026564,9.580035982854245,0.8044026670045801,8.63940828977471,19.436705314498113,10.974744727183058,16.890247762278126,15.699497997244753,18.27192962819581,12.480829781021221,17.312062502028137,14.77872969852812,6.550256474822529,8.238449865393452,0.5903993536733898,8.673679422316226,5.753527728218799,0.20315030232378017,2.018387619222186,8.569060709871387,3.8260536695824543,3.752786148341909,18.75591487984346,19.258256619024344,19.91043420107159,8.52249702439714,10.476169663101542,11.786655082199214,17.517162495777203,4.827754136888327,7.036085574975566,5.001842154610179,13.562785866336986,2.5946259352785406,4.5202835104806915,8.397544303857295,10.445954168864159,5.340296898324635,17.560630316407206,6.063141314412315,12.784148950918146,10.658235222944498,17.849453928620914,6.034577853531085,16.05813951596881,9.493948941689073,6.564025048579758,19.58638801474364,9.015185023810531,2.286662386246179,7.950148329225302,8.152422932598622,1.1889177275612095,17.247447853470067,13.729307219875073,10.87431236716425,2.5889148047932586,19.002838679073047,14.55666241054885,11.594195155557564,3.5417049739723616,10.223938062951653,4.008944096980285,0.02119695141245881,2.334519015050205,19.69732312758214,15.018507880639667,16.185842589009983,8.88135258242594,11.055786792645645,13.002897863861214,3.9351865689962606,15.350593195385072,17.99236245114049,9.666612467336627,6.359947946392017,11.19920246810636,8.932504778201857,13.987344998375434,6.547636769487553,1.7416893726783478,11.54014950274008,18.561372383250685,11.70937110325552,14.839802144282373,0.20671457538190996,13.12675472890604,19.27327522547924,12.188510206699771,2.122832802303818,7.5528370151616775,2.408140689387004,0.8330397715395099,6.177822073822181,2.012368954977566,0.7310599085990521,14.84578327364121,2.691242626765926,13.386905612215902,12.702080936303881,7.1733681464089205,6.334315081362458,9.475646536773038,12.026901955455198,10.487096535123598,6.107775684471237,5.060624477811064,0.24247714036741197,17.347488078497655,19.373830459461505,14.481385522619803,5.347991570217263,9.790559747298651,2.6567641288257615,4.014880683308402,2.9998206502957947,19.152137544938086,1.2897048215431495,9.00178103454303,3.3618751333317665,12.591170593156047,9.95643939152691,11.981679378679498,10.506654119113135,9.44327136501565,9.17450158699502,0.16442751458165095,0.9412302203865375,8.00105791788976,10.475514972145813,16.973437158084398,0.13284899036151376,13.268375391798397,12.662318514920074,19.562104537860343,13.000004028221781,7.854853318308277,5.469979249746624,14.24594215187295,8.332491031736225,19.55455791404271,0.006179867243822912,14.758608461785986,1.424180567965312,0.14850376299091916,7.717048909689002,0.6130117849449057,14.203891878321343,14.371182285599513,17.563947722608187,19.121154806207276,8.762643728366463,3.7507175142615745,13.90322855772251,19.718005769573153,19.0461833472723,9.808768530032372,17.35194321507025,10.966110755046676,16.328530686181683,0.6241445329127471,2.467959467639651,6.371798481516562,0.17028719794220493,6.792926024657904,5.877659255701202,9.650639372881159,13.2760829572476,18.18684258401881,13.141863701496073,13.070247973405644,15.817320775765232,14.083897139457683,13.176592264958892,2.368468482116808,5.306744948488209,19.010855765128394,5.655424866092975,12.012738801770952,12.995025891889597,4.210180238167829,14.266399955668518,15.250238853205534,4.11368603865101,8.810035881555436,2.5711516598750572,19.549080979421085,13.80254612505935,19.19620960823527,11.724265197099516,12.353102035437837,5.302553898246534]}
},{}],131:[function(require,module,exports){
module.exports={"sigma":[13.57339383176396,14.914329300381205,0.9705518195804741,14.771191949992541,11.208741614975551,8.043118221637137,14.305544234222932,1.0028664738816317,19.2162274998439,3.4026587891391413,8.99379386395844,6.640693521494061,5.574097965044471,1.1604234906300404,17.219269803470418,8.480800713132233,0.5782986460270267,9.876807340097088,14.137704717220817,1.8400747939366946,13.135602379427397,11.918180717567349,13.43581589410929,19.3013008285252,16.654770827442704,15.341257133093285,3.9093703741111074,6.222071896564447,19.573236774792232,18.010879451581157,14.184056180234563,16.794794134546844,6.171682377140444,15.496680674229658,12.960371114146358,19.3379763182501,18.560486892807262,19.193510059662305,4.209049533469464,17.8974508303472,10.162304191114945,4.777488896316351,7.357510001198264,3.4252323295914744,9.052653685466808,8.011045340777363,6.658099875012411,1.5050941318273736,19.306694451303954,2.1083555010453603,0.43804436722474804,0.5705705919487292,10.501284759922967,19.083566869977684,1.4809249341851372,19.630108306421437,8.754421711323467,15.770212222147425,6.727324392340912,14.932508390115089,2.48706130944369,14.738908026110696,0.22950163505409016,0.4620865358100179,6.507147458388318,15.05873138227865,1.0241958639725812,10.236128609496827,19.365992874433346,15.28617845772347,19.74822395702372,12.60373594701171,12.300875592150003,10.666000826916546,19.402257682493964,4.347382797831996,1.4816802655115646,16.837719220354813,4.219301952514312,17.909928756300737,18.708469248496193,5.46904323108492,0.6001515414896508,17.463063531334605,6.5273926757324885,19.01368913026003,6.188166966818227,16.91032247527299,0.5422905193143768,4.5484226537395545,12.304691712937563,2.3891499075045264,9.107104251292796,18.719614195594275,2.768339132025104,15.834014901409358,1.4099741862691495,6.516799388796124,5.111458518358378,10.11572952265119,0.010483625423307608,2.8099652830942423,8.349983611756148,16.632219816451066,12.47634476710111,5.873417372919225,18.999368733187147,3.1368400738998226,16.858559503444816,7.768044323374932,17.800581057589735,6.945913481354498,4.599015623352054,17.83985331300661,2.095036144931015,12.47618651068493,10.331747190602009,2.602104318562306,6.887014593008565,12.562814981010915,2.27171288015775,11.14118321079581,8.318689961709165,11.040809280621758,17.74967799814634,7.375008083342256,18.358291345892326,15.377173635412852,11.619815705510547,15.125684853632881,14.510017115958536,19.423274747259196,10.737843793336754,16.629095817321865,14.937661294373115,5.4414523427995,8.609785252912538,13.624382529191372,8.327076268380061,11.185698733831263,15.175132900660424,9.756921390319068,17.335083194409687,0.35714262630967664,4.913722901654736,8.455368625533621,14.064687924855495,11.138729965166645,19.482986898866553,7.139232719934689,13.08926435016334,15.333409758451388,15.233888301191246,2.035308238278657,12.198429095651564,4.591725313412964,7.366943501077534,2.9291449144642723,10.16319345720376,11.410205679869204,11.300164161385746,6.332795537604592,7.174543992556459,6.294288370513321,1.2278246819053695,7.858089670531956,18.43939902382628,19.38290722508688,13.605282265702826,15.934566876525276,8.551724716331496,9.1763006953853,13.115304144743295,9.631284067287456,8.304774649992034,19.20192925575037,5.448126504095687,7.748007092554325,19.0460401984426,14.70603476352727,12.399644804331306,8.513985686383068,9.918762684774682,19.747057163433105,1.3792175582006339,11.079161565504947,10.872066720010842,7.045731738757173,17.43780856660627,4.982035823902553,0.559610617931563,3.485796519584996,2.737932228408453,12.119318033648847,6.809067418804049,1.6261128671430791,11.900796233813136,1.7149182681268593,11.174410678284445,7.82148538490139,9.017915749710221,19.558534795123922,9.6815087542711,10.34977504452289,14.399764499728093,3.2953170986672653,14.366873273499738,10.747757381846457,14.024242148315835,1.1295517164658309,18.79586961634766,1.9421844992686266,0.6013334502734224,8.70241775865599,3.5507247351855353,3.45613227448903,14.91364302328047,10.485603426753789,17.583949892237595,19.220366561824648,18.026115540991,18.185923070132336,14.353153007052843,6.064079625868217,14.884061725820583,0.8285210649780383,12.90755320331705,6.907778433066909,14.940063248481078,10.50007570830541,6.315898288498243,6.193824682271352,6.841780403811755,6.6419801447863325,1.3720623246536778,12.002141629888005,6.549099832414029,19.78625350194736,8.439294931881358,7.96445658572948,11.08282760793597,13.765455037596865,4.773600743638968,14.00339086242151,7.644644152431002,14.125226242845685,4.895320439787008,6.102666497712876,5.384831948373381,10.427437774216312,15.38686190406018,15.418046697441463,5.829743995072341,14.22151621278655,5.563520642777426,8.989577688581978,16.29098051328388,3.530092875477786,14.213695737321302,18.069851049188166,4.509048320875211,17.40233684515389,15.016099068768952,10.808584858190864,7.184514482008204,12.326729001713353,4.267584322667757,5.56376232145976,16.439407724540985,1.6889617812579205,3.5575382952364265,19.15458701253828,15.038627636566414,12.731791594100761,17.34354221828681,4.014099991538931,3.0370268206644857,11.172671220059582,10.608853512660744,0.17989352567009842,3.2763222668790526,19.849371879041264,14.186493524814306,10.944462700811712,15.205303294159748,19.645388315142934,11.940022806265915,15.924673605190796,9.077780343621932,2.6170804200829823,15.549777066446646,2.666137140335949,16.888182202161417,19.86539014519957,14.306638147668167,5.138765306669555,10.214958472531666,13.200934253010645,2.0952101437523396,7.087636836574602,0.8476828605023456,10.983827229619955,16.84993606472123,5.968598299309207,13.65658040567741,14.120063305343509,15.891417252452786,1.7494874959396123,16.386355991477064,7.794315501898912,0.8126384762372529,18.607482417043162,5.629524838819382,11.751282601522552,15.595204000266957,7.184953963070635,10.920657775786943,8.684311517762957,18.60376386967731,11.033588714785445,19.24443299251976,11.950446322822156,10.415230863414058,13.078833956270234,8.523374757357779,11.191531508416768,15.027655920990597,14.550275230440487,0.3243585287426054,13.835170844110497,13.846383087388524,8.935536176897653,2.449253975043093,5.2832360474637685,8.186697877444423,18.516681680298458,18.27699045422053,8.722565377307493,5.9487406050166225,11.560958900578626,7.520568335623414,3.133447206323514,14.12297938076771,2.293006375212361,14.788100042234046,6.767297399964485,5.497850171129728,2.666350676008089,16.526487548432513,18.57255037075411,19.235445850870086,5.495552988345693,3.7716383649248675,5.326511877588871,8.453920829300191,13.827266827730508,12.740040132227044,12.836283043674147,17.43208551151416,8.36770726486729,8.60069787513078,16.712642532837233,7.61022357501322,11.158558087418232,13.454723014250023,9.845198404556182,12.634336617415753,8.510548099589709,11.782398465027931,7.770161902879651,19.562441328354403,12.884807501020997,8.968486359509571,2.55435584913422,19.443282098520662,8.238536539609855,12.461292220067929,0.40466768343359494,4.931435637127639,12.295890690795312,13.153879621848525,11.124823311328118,18.641703878837355,4.098104920224066,16.60526046558664,2.6054002888937866,19.32486567151164,17.878275827970583,11.600110295132477,15.399991199426433,11.34755402394752,9.371518653720416,2.3643096180847634,14.813461911783659,18.534647192291732,2.7586833105474984,16.7774470459688,0.0022862144074942137,5.572585693260073,17.284250242832442,15.215742905901216,17.51122114606945,10.013432481318878,3.1626272094872787,0.864724820996825,13.073492004463802,10.329650932513363,12.999634191710921,5.672762982485038,7.876268710845977,8.463555724692661,3.575775125173517,9.010298989581912,0.3173880024325859,5.562443178366143,0.9498546412165476,5.150938188031096,4.544960310607036,8.39646292206201,6.743390790149344,8.656335299228694,12.408033997484992,9.795136080396842,12.826726801515512,7.293931820912625,19.97863518719592,8.99621586811909,17.52919371863818,10.815097002343247,6.110794807310813,7.960812566082134,3.504452309041506,18.927313899584295,6.926801703440777,11.359313865770346,0.9704820612665976,17.881348963875453,6.592525076426301,0.01743523912455025,19.354166959704102,15.210073043148604,0.1327177737075269,7.324893611434509,1.049272225627802,13.501920250432043,0.7895446324504807,17.762725308580677,19.250198766458787,5.837031929229983,1.382325753890119,17.33616676742587,10.643385985624892,2.978930086858509,6.611116611147669,16.368142911544936,6.709639659636046,10.40799240869644,12.94687894435516,3.220359161562425,6.268252872807425,1.8705613179553637,19.158674056285815,5.967807850349587,2.6890985941906065,16.11064287692326,14.729305223228408,6.13207589818852,2.0916314296726757,10.723547221113625,15.126393321925548,18.504245412867178,4.376904112727762,19.088349673351487,15.324988573567904,18.980452217951864,9.811739155772955,3.528412677869257,17.349951209204065,3.196346135945425,8.671111434850033,19.893103883958076,8.221407850423045,6.300013305955994,18.125989212373778,4.881026913649427,12.002173719396328,7.158478069028722,11.854863624529393,2.2928745895925617,17.510674132257833,1.006018384137124,0.6693069544092944,3.881975894581111,9.811010973814739,9.03237005970373,16.19877808205663,17.49588856663866,8.88617131531241,16.898973531092626,7.433898539169035,0.29856111004887165,4.481642517020039,17.561836282459666,4.707677858379298,7.497283866548381,5.881327812576194,2.277356448697785,1.7662599339038687,1.58737828677741,12.400948001067773,11.972792883693103,1.813555474155466,9.016783642407301,7.343507300462635,11.044107615838495,0.5736096112622979,12.015974002121679,11.803818651317863,12.488622727682902,10.963731751921113,14.618818683334101,8.675622902543614,4.3533459682386955,3.9295032363966564,8.893153111014765,3.451996682452254,0.845294311188729,11.5525281466387,3.474408994698508,5.492184626558156,9.626807762658686,6.9814672039113335,16.724516605696387,8.62017027755603,13.764847915008662,2.539746935383649,15.026284229600293,14.043254766793737,8.701190130331193,3.442755820188337,5.189075516431219,10.57534619978151,9.195001468821538,5.935991985871993,17.14788088075398,14.667071770491749,3.1816294851325333,13.49464559353673,14.744377632614803,10.361970426107806,15.662375014691495,17.553071310500158,4.205545308950063,2.024355127829063,3.6541968840323458,3.2153742326198476,4.353218579977072,4.364407923020499,1.455625378822396,0.6670598603409728,5.048071015365574,7.37002135963071,19.92656978799991,6.475988941952413,10.644609361390764,0.5307385168454459,19.872848950652575,13.815801490693516,10.0869404290364,1.232568654302555,10.289367896330447,14.122484827593205,19.373467043867493,9.69063589709425,16.614557411651628,9.932847423076785,1.4522314055328867,7.749089622065197,0.5859585263599865,16.62833456799561,17.960702811069943,17.621425367223623,4.056586035217324,3.9031701029311083,5.069767509860146,8.282094929564842,10.413634453970895,6.996540495986117,14.12635077361795,4.0085721651019,10.050598882031148,9.931292598460683,16.764212933038962,14.159359560081262,15.394384088416832,2.6266715918646844,11.075831170993013,5.139541491263424,17.714672077734996,12.396176475959875,16.956192890981434,2.793086822446158,0.6199490260192331,8.27020736520398,9.282775723811074,13.337636018481906,9.767919735257307,10.442459240781211,19.958174926731658,9.076770694570957,3.629761283046129,11.611454020843501,9.894773354279046,13.956905601888835,16.934323552551458,2.76462141747837,5.888134110898857,13.39639439437625,13.098858230998198,1.1488489639254684,7.5680299606884205,2.7652546437925762,7.445442969008331,13.82918375218499,3.0627179621923206,6.616064867798488,0.09768766788500027,0.7168854283360515,18.123920821574213,8.567495529165283,8.92487997614686,5.595528456618228,6.845529444348757,6.505624063451574,8.964121462280987,10.693693938185284,13.452128951536398,10.527690843680526,15.475354638569595,3.9891643375498154,4.755935851730753,3.7104506559267403,9.329454249762694,14.563285729313256,2.7519688196136194,6.510475463524532,3.605827782605817,11.890315231264017,14.892321139814587,12.397482032612533,6.404020229378502,18.571399644026577,15.346530712862503,6.40624623490659,9.64530909619047,17.035294639175405,5.994288726939265,14.362654497239413,13.888496723130617,18.88673340218732,6.906854806057523,16.131781244878816,12.642196694778356,3.448430356708072,13.509387555988027,7.179907272105934,0.07916816289056161,5.666897299318365,2.738964885696893,10.079791141671688,13.039918372254288,10.21861348334657,17.47457359651287,6.385868189485602,19.207341559556216,6.423129748136414,8.800360577116443,4.298093192667323,19.330145948403192,5.736908773633176,14.423513058081001,15.687116028017734,10.331730959263972,0.31682935895670283,11.849767121633352,18.480616093476343,2.028094206336619,5.506573729808286,0.3399607286925832,15.523695879315792,19.44564461886964,9.760827410102376,11.800067817527893,16.37584518721726,7.7404456944950395,5.548578175471972,6.158112477418984,6.347967408830391,14.340263910756317,2.519340020333636,11.410845438202184,11.92927908754369,6.566644088907845,15.62215580327698,2.6143366819614577,3.060323036282555,8.722217883816757,15.203490147909866,19.35274639915637,4.547006771410533,3.6991928890886028,13.796419256258417,9.131398872237227,9.22739497511699,19.349717933180095,11.175687273035098,10.101055873891088,10.98995368376844,6.786823225785876,0.6024022717814503,14.855070535962325,17.034026416405005,4.719858933191539,0.6919298786644035,1.7050250781214071,13.156791774899554,18.375736121525037,3.8786577271841605,16.065240039829362,13.525890013177504,17.753035727777306,19.642242821509544,18.538621859318226,10.69714745318004,9.220454268842634,3.1087192385896234,0.8759299790176023,15.959864358514784,11.599474225932909,3.019767389981909,7.590561547848087,8.600538307350934,4.686409535507203,3.5853018176237184,17.004039635764748,3.068985039807468,8.173046862036077,12.22599947435417,4.83132645187228,15.465999384984311,15.86628074705413,1.9314105874067211,18.901048578643064,1.4594702801254877,5.16462668758038,12.685576093476648,5.626702229715175,5.656522028724944,12.882268479858915,3.3696313139928247,1.7969078485036771,14.939827226602658,19.5954788296352,3.1615608075407886,8.185863318037416,9.086589969260928,8.627636346128256,13.359936794035917,17.347750875192176,13.627669112215365,17.919415215877336,15.861514963234509,16.224088560021475,18.9573679702635,4.276021479859726,19.72841717423273,15.844223231167982,1.8526545076245782,15.295318766617761,6.1608129295182,16.6717955648042,10.851132936536679,5.364215748384824,17.91524936872458,7.929968466323154,16.807329306347235,8.792940915740086,16.602038651018283,10.854879932658047,3.093449680064042,6.596774226453892,4.107965500108395,3.7179945536169923,1.8894854880440226,9.117576746873635,9.171628863711003,8.50118640167592,8.490152622004201,9.716215463911242,16.262851490347142,5.142251312956061,2.049813106645244,15.479383204494749,9.710278074652411,19.74163663513632,2.9190248081850045,16.59113674942678,12.453645031594087,15.493420723795532,18.250660210082728,12.628903968551235,1.3024194455931548,4.907123827848281,2.9858731131465044,8.57428232315904,7.898492114602611,1.4484159010512832,16.94163426458072,18.342610124411042,8.701561115270447,3.099891154250587,11.499304402179087,12.312228394155994,16.389327135689502,6.159281326144299,10.721516821306372,16.523093756829752,5.246074478623384,5.308599338704791,12.190942610563704,15.083555518793572,1.2793691847655309,15.00418213518882,13.66149603374247,5.236195048878187,11.518429062012903,18.68250057296362,19.10168904608136,1.6607950286556328,18.214233753541652,7.2864593620693485,18.33643356015066,1.2172880023089094,1.9622803148131007,9.694276120760827,16.814288567218515,3.52302365307287,11.773469774522383,1.2817474638277826,1.8399965201862534,16.49632153544248,12.739391880439705,4.208272855751214,13.484675852552638,4.203793916587348,8.63839826337648,15.341069337797926,19.309266555556643,15.097817913108994,14.980620698118452,2.0075342813119157,13.153889635867916,5.029493668496734,4.097483381811031,2.44544811509789,5.008112363450308,1.2069243791308137,19.84695064700341,10.289974537915242,1.6782460876871497,12.321634709395823,0.6803768044051495,1.158857631549144,17.677351367181583,18.490490949624373,18.061014312910793,12.259548403676487,10.315288196479884,7.594473089380145,14.628082288311424,10.541724592613742,6.703181068475512,1.5056005937551076,18.138047640470223,17.515575343590676,14.805865313672978,9.63637106779196,11.339078603220374,14.02893474891183,16.95362412907468,14.579374106564234,17.661426789221295,3.461288655402188,10.534766574016468,4.9209069451471255,13.068229549501428,10.931819147379738,14.50723098696221,5.281237804189023,2.5301864230167093,10.30302829444234,16.488958476753716,2.5785994591905004,13.498785911121796,7.891566933375125,3.3156464556623266,0.7686920178245948,12.090368370031431,18.281157971993032,4.5022906046480005,2.5990878614661517,2.225237244162419,1.2256012590727794,4.9264812836489025,5.458613474946428,5.672444505366552,12.971926755171083,19.095948867175917,10.094452574594417,7.068841047287822,13.271041762813276,10.994551183893746,9.319321314260737,4.761767150061105,19.680324067112238,7.1191487923441965,18.943027734534866,11.094242503779782,17.742672364608254,19.579017945111225,4.336602356307853,19.293458957135343,12.63487499221704,3.9429533779088066,11.158719588891515,0.8407954410185292,13.91980877866665,9.343718711828974,18.403957239193026,10.898208081434731,2.480037264181485,12.872198285716983,2.839247804441163,8.983896836432068,0.9278711018304264,18.461706130207233,7.030610235336003,12.992725046145658,6.692327701276035,16.431335208024876,16.404382077059118,4.745858230319402,13.350235911482029,16.99206877824597,8.758537690449888,16.440308997191963,9.894770189861607,13.062659492639197,9.552489623034717,4.320232222769582,18.13915182081535,10.03080823248152,11.726258136036423,8.384599284393609,6.02232156627212,16.774554970673996,13.236680996661466,1.1031525036593948,3.911876463022521,18.692414707843565,6.907463346174247,0.9437695015104097,0.7635448695088121,2.399337221746678,6.1797341195276445,5.815548091103264,19.675662265248874,5.410219286772127,6.722478500267419,14.009238405741682,13.022768388601428,12.361545421884902,13.81608023919528,5.102932950811447,1.5691756314254102,0.8815550342229184,10.735348290321793,9.223063564782246,19.095599136600747,16.27862359549205,10.142401911055385,11.110481723297623,6.2716563571230255,0.3123325675313815,14.993717783384572,16.209205468615867,10.969902476514694,19.557281244703233,8.071995076294737,5.641739360712288],"expected":[-3.149109382679612,-3.5081591778444925,-51.82262984619858,-3.2138673237839703,-5.165173135335832,-3.588577049466429,-3.6060217215285872,-45.097872808750424,-5.363945219486019,-14.294172574287783,-3.636897576673214,-3.681192700387417,-4.597544194578269,-57.10559172415309,-3.540641141851865,-3.9204248682175233,-101.69709075713094,-2.8155560944277065,-3.2701646748161286,-25.107004238898888,-3.0820007362553383,-3.1306828372019018,-3.241842276915101,-3.7687302984833178,-3.4724799142999445,-3.2347009889133904,-1.972840169769816,-4.077585985835491,-3.8262692476903815,-3.471392055951049,-3.2501964328231194,-4.325042214127879,-2.8583380798104256,-4.084455765614778,-3.2110793254833787,-3.9515586800737648,-4.805714592354528,-3.65120403695735,-7.610937039206417,-4.744775278167178,-2.8233665018489336,-2.32362783463721,-3.810127336953311,-14.602471926422103,-3.2831312168019045,-2.6750574176638047,-2.565240991349384,-48.43261367144389,-3.491660894520596,-14.07052517448825,-60.06690839277094,-1.0775842257979626,-2.8783436104245217,-3.449587002857248,-7.1779210420016,-4.953916610987621,-2.846215985350575,-3.2598217770369082,-2.5777957111293013,-3.266487701167624,-17.75316521362043,-3.2677971515489106,-3349.078868486594,-33.03288379950489,-2.726248810033965,-6.000689665302522,-73.48802375519048,-4.161332838055045,-3.5600621452084775,-3.5006382247987373,-3.5001049221608653,-3.4074230781149417,-3.1249920051722873,-2.9044071228875215,-5.669156268050322,-3.727602044163883,-54.044544949486124,-3.323644448852061,-3.499280858005621,-3.5188886190289184,-4.368541597856696,-2.301079139693675,-0.8652779645867184,-3.360435179751857,-2.9886131461615957,-4.672912075865869,-2.3332030873890925,-3.479909339682666,-649.2344231601836,-4.785299557452947,-3.02107242130494,-4.5455022222262365,-2.7102577634169336,-3.8404962499370896,-1.518254616852174,-6.092816148390945,-6.485489671648807,-2.375014999964605,-2.143617781714708,-3.5015732171465035,-493793.5646291901,-10.560227082863545,-2.635317320332838,-4.07666087204108,-3.0443830058908876,-2.742248631144947,-5.363725176722031,-6.500689734456569,-3.574281832716853,-2.5611217224028704,-4.909739301156554,-4.4148329179945875,-5.038922887482025,-3.3819656352098115,-38.30999675342121,-3.2010524767588455,-2.885864812670814,-26.958959840847932,-5.016235677205931,-3.0609050448309745,-24.45221074928005,-3.9306919222242263,-2.6309690798153738,-3.223422617665972,-3.6171253470143374,-3.4255987609774117,-5.681763912602576,-3.2632198637578735,-3.1418200232108053,-3.90594281572435,-5.218017691709623,-3.4673143384890404,-3.1030972412402864,-3.9811283932173396,-3.2088458312338557,-2.890466097340294,-2.737213231441096,-3.1916120638442296,-2.840697373583819,-3.3228767052089974,-3.457263215227833,-2.7785423978052486,-3.9041207907348565,-923.8501159303343,-2.2214395801065887,-3.8074536844240416,-3.8419806748305643,-2.9972655840354365,-4.814824920605356,-3.244467521589502,-3.2122081045810615,-3.2587225306004144,-3.224666923532295,-23.773466393292086,-3.0328431321688587,-2.1491211588703814,-2.8258634140685643,-6.853748973670809,-2.888780694606358,-2.9610705605161134,-3.223859562629021,-5.605238760197162,-2.4715449757328907,-2.339859290424368,-77.45798271959846,-3.8699602622473,-3.8177835295092053,-4.271625404731386,-3.146473489536365,-3.2909191932605855,-2.658903598887907,-2.7723187083293355,-4.098899160563358,-2.8033457754216506,-3.0373997834396977,-4.064928539237681,-2.290757789654388,-3.459424364930311,-4.7418416481502055,-3.2285111451293385,-3.3489984256376095,-3.746867380399637,-3.050061773113696,-3.5667629011304407,-59.55032665135958,-4.510936824775248,-3.0830211082563137,-2.519479124889789,-3.3629629694076466,-3.44746396592688,-533.158627789331,-9.009178750835764,-4.909099090659855,-3.257379702602865,-3.44426528511016,-20.599398427590256,-3.1131090404051234,-22.69634226100532,-3.444162670885699,-4.227353448444895,-3.6376340318456855,-3.6137075094183553,-3.829839083444977,-2.958981321893643,-3.1689244621816512,-9.908857698828127,-3.3429536387072143,-3.243681118366918,-3.49820281882295,-108.50181732950097,-3.433726500145914,-30.322688112425844,-0.6224906357463609,-3.6396088103780517,-5.832619568458365,-5.521713683591166,-3.244468464943956,-3.0037426113345207,-3.3673528730964413,-3.482640632592475,-3.536661763939296,-3.406333466883939,-3.1639799941574065,-2.4642156491145224,-3.3013556984549477,-145.17487730529518,-3.0610796993176477,-4.966555608422524,-3.2490487485484127,-2.958881691786154,-3.3451806411987923,-2.771407574875793,-5.056968404820631,-4.380511004637462,-13.248105771668445,-4.200609904322517,-4.742741982006158,-4.36666807502729,-2.7287011600690425,-3.4607352854577016,-2.905397321274973,-4.512323731499848,-4.478056664365667,-3.172352560192036,-2.933983006263201,-3.1679378035720682,-2.9028346018792894,-4.506843046079828,-2.311998464258531,-3.190779940094241,-3.2432173210158233,-3.2405374612437234,-2.6207843467139558,-5.126450459163404,-2.293295903387132,-2.6961815598440184,-3.45104580851379,-14.617528907923818,-4.094865295520044,-3.4505013425856,-9.06112458594382,-4.470964512940045,-3.2849287813961072,-2.942707375867143,-2.773276172019409,-3.118520882590117,-8.8735798883798,-2.3848397493367477,-4.499649796730949,-4.790154660327228,-1.9252713671054422,-3.7656351366191525,-3.2151521210719367,-4.029292514228704,-3.9343910739611765,-2.556585060170028,-5.586217075845879,-3.539248852193637,-2.933255425589855,-1258.5597263233983,-9.596537796762249,-3.4975989268867282,-3.279956004466565,-3.7418891028474732,-3.2255893114098875,-4.028602740821213,-4.429948940276577,-3.2991622536468523,-2.7254718963731746,-2.5536876427369424,-3.2442355958182194,-17.594889905641388,-3.331103283414169,-3.896585362687825,-3.441081835695269,-7.164558542287618,-3.000554580494048,-3.1330208624758407,-4.389169129766693,-2.7219968359553803,-73.12550654034337,-3.416059455130357,-3.403581557869737,-4.329753499656893,-3.2599637657468494,-3.1918704709504677,-3.6203585566317487,-32.45996123312233,-5.3706643176852396,-3.4440496682339328,-69.6720430433463,-4.113652327651854,-3.285964125785498,-3.009022478340192,-3.2535412210220693,-2.481772499637815,-2.8923695724911673,-2.855218526444628,-4.474155290353831,-3.423426432867964,-3.7461424605287132,-3.0336161219051045,-2.8432850661475717,-3.4212440126880295,-2.6700770949407735,-3.976246378733661,-3.2511582409450632,-3.2945301299584164,-362.87265850716443,-3.5044805899239724,-4.239393459882068,-3.677735788098732,-27.428610695962107,-4.844268841004819,-2.6201382107924225,-4.651403272753843,-3.4063243881241894,-2.755357706292793,-2.4233383231429295,-3.8917069630714436,-3.3229525886044966,-4.8361658244325145,-4.44215219482393,-26.52690367801473,-3.1938892666682146,-2.4838610043850418,-2.3004692004831835,-11.071161714459318,-3.6650756047929383,-3.760925795883203,-4.265565912554828,-2.378786912713336,-5.069493072103605,-2.77337007970605,-3.5841198396520015,-3.134522041814138,-3.2903794830610984,-4.274394239630602,-3.6246740756958524,-3.0168896348629977,-2.6552592027105892,-3.3245497866073834,-3.283898712712144,-2.929854561579189,-3.956817625557088,-2.7918919492484164,-3.2617359050104353,-3.430509940719525,-4.972867705071429,-3.0039256917841897,-5.360131699752538,-3.634523856841309,-2.7875508650336744,-2.0775004973537987,-6.13082040265071,-2.6420863091874462,-3.0226795172080787,-777.1918894095921,-2.1197071410401582,-4.858207795005105,-3.2491919779050713,-2.9131841941584824,-3.8220267184280736,-6.553954085409525,-3.324505559064964,-10.12295107173643,-4.257901439241076,-3.459380310948022,-3.4533170231474837,-3.2453477546511587,-3.4636708218966517,-3.4238305645905482,-14.21223078396137,-3.396304631046348,-4.046897452768017,-9.026100626253283,-8.263212832460036,-3.086855623820507e6,-2.490953295541578,-3.359604547913633,-3.3286858992487747,-4.488600026271134,-2.858490898097206,-8.670530159689005,-6.656586026152104,-3.1245412935234027,-3.7268628612547783,-3.2171166277201593,-2.274035293914711,-2.607028415153612,-2.7803329903062735,-6.5008964859678695,-3.648527121297394,-402.07228036668295,-2.917949621238601,-64.74605250126109,-2.1405410908508244,-2.0994018161778922,-3.786450799336381,-2.4172779545782075,-2.6756652013069524,-4.245227030760626,-3.3672982546936314,-3.3052621298064553,-4.195595680864308,-6.136244742070485,-3.84086689588747,-3.9778944572773653,-3.0213246288256403,-5.340275941638759,-4.162271290159798,-11.944647731297907,-3.7437495088134614,-4.351706155541144,-3.012774900573503,-186.9920189701566,-3.3844557821144607,-4.404202593429379,-586515.1817750887,-3.477700197190444,-4.025520899968717,-6220.498455553547,-3.051067986674878,-34.50641865906237,-3.173214152211372,-254.677971807949,-3.4280841366809462,-3.8920769243159667,-3.528124411714256,-1.0939615093493646,-3.8385822612672484,-2.9389074108825586,-1.5985359306003917,-2.9596243184416036,-3.382128487534224,-3.225230206750091,-3.5311808196033856,-3.2260105186636925,-1.6788308659029973,-4.383752655729108,-28.816078979851802,-3.4543085607141517,-3.168366719633632,-3.2749308537038155,-3.687032762916916,-3.2191189517628036,-5.188634760434524,-21.471150067260282,-3.009494256100885,-3.653642422616574,-5.83302330274913,-3.7319189425169164,-4.224952388316472,-3.2320890645220213,-4.456104607178243,-3.627513407442965,-15.174908956692402,-4.139945982944617,-2.0066940482174336,-2.660188728126711,-3.6488898034109822,-3.3402729161039844,-2.3823825701233594,-6.003702741630787,-3.3592257737147313,-3.077482102379998,-3.956967312162259,-5.688497797905182,-1.3413075582003042,-6.7689015676200786,-86.84528800666565,-239.73639960554962,-7.4187321733212235,-2.7887016824136155,-2.7013048464548786,-4.986111009986873,-3.956844003347905,-3.2746329042496507,-3.615615567956061,-2.5226827333300674,0.4299967044812367,-2.6307521077194513,-4.483899575192287,-8.221790469296893,-3.152246070085574,-2.3224215351483517,-24.87889884316721,-54.923113861036875,-8.04725164452267,-3.256690689122361,-2.9937553022786405,-1.2009399734150004,-2.735101150581586,-3.5513461705232263,-3.3507832972581513,-205.05357765063837,-3.2053464119311457,-2.9733655629822806,-3.0293551733146313,-3.229149614216016,-3.8233878676194304,-2.8430994005640615,-5.4311154548169265,-3.775254491898153,-2.858970166263293,-7.584884319205133,-57.94278516618354,-4.8821262720133545,-1.7829587385134862,-6.689700639448256,-2.7646800199284107,-3.66931097154918,-3.324230666266649,-7.164570521347639,-3.12213179992854,-9.048103745993545,-5.272362940760651,-3.300033899788241,-3.1829331998106287,-14.947871007237364,-2.9971247481484116,-3.08441853518459,-2.871375040964343,-2.496534538000896,-3.3510446494929518,-5.51340125409184,-8.815018928449225,-3.2494207157708948,-3.219468884050278,-2.852373733395903,-4.937112014347017,-3.372196263886121,-3.7653623298788066,-1.7316261337666032,-3.9993209571584822,-13.11193228393321,-3.617934644616616,-3.0560986985869443,-19.79795831384108,-313.44205621605533,-6.030446130265386,-3.496762609542772,-3.4944906446900905,-2.545820578770611,-2.916018310306952,-4.822109762440284,-3.5894444699266503,-3.222702851990148,-2.813102832090659,-8.792762696892334,-2.9218681220723073,-3.147836654781015,-3.693948435317622,-7.285294927503627,-4.635792087414398,-2.931961434569257,-25.69712946565761,-2.596243556834383,-4.902050624283986,-3.478136644173196,-4.90785633514176,-4.873964962016628,-2.726690888493791,-2.4898517196483207,-2.726254408580708,-3.0242705993946624,-3.0944978211463323,-2.6869635030606367,-3.1488196064390985,-3.2232715296377243,-3.50129965642828,-3.1682132139636225,-3.3235453702272744,-3.605548586145729,-3.3803557144065692,-7.900168724817499,-3.2477728195900206,-7.419353241468255,-3.378441222342483,-3.1437259130225352,-3.348775978175056,-8.347752845877583,-170.41622522940204,-3.679358623980869,-3.2010700540757755,-3.276595711155556,-2.9987964602349315,-2.87215871918672,-4.414105476964828,-2.9811252101879706,-1.9296250336898761,-2.9519955871655967,-2.846083798692433,-3.221857965182833,-3.329804471743211,-23.095772557983803,-2.5754505006565664,-3.108744007689344,-3.2099272778078305,-112.05780348848023,-2.6138351716336423,-7.9102072832205925,-5.258144432161811,-4.105891828466129,-2.8799666051941863,-2.5191230729778598,-20664.89823777443,-1.6361477588614197,-3.7695786419073367,-3.318104197490947,-2.860961963366093,-4.847352401932983,-2.4732832746548854,-3.4110767362381504,-3.03747285153701,-4.947945098466217,-3.105746870549427,-2.876197982287537,-3.276491763721953,-8.920339809703414,-5.755513065392815,-11.34347296179406,-3.7076521481023965,-3.247232645514894,-2.9859545329984645,-2.977784920924865,-1.857570993327971,-4.139750696646425,-3.98440485067896,-3.0176278820343674,-2.534680584225768,-3.650980495983902,-3.804837594069141,-2.6197612120916487,-3.160339293786203,-3.597978566846619,-2.3072477110817324,-4.294742356984102,-3.1313032227213147,-3.462486577757664,-6.543338409856394,-3.9665229719324606,-3.327215476787643,-8.642136365656397,-3.1299439385035654,-3.062767667026132,-18370.9628211084,-4.572005109420458,-10.334996690347696,-2.812323726350393,-3.5498391446785047,-2.8271060551960354,-3.7256112847314893,-3.141752104124622,-3.9383823096895876,-2.768240792462049,-2.7191022540862853,-5.347696391383876,-3.615988002201683,-5.371759553213403,-4.562237681097848,-3.409250757364226,-2.8983244682453644,0.6472880799065397,-8.59571691513036,-3.7396589775334204,-7.61677999688895,-2.206406771305384,-1354.340578151684,-3.2600589852538793,-3.467637198942849,-3.5198809404389095,-2.9966354861306512,-5.749368638844507,-2.5468266701680164,-3.8235420877826147,-3.9559589716377492,-3.7122196230503253,-3.1631056922697014,-22.130142142089102,-3.2271769939405863,-3.0413107827547785,-3.612917864646767,-3.286108745247806,-1.9141215516294539,-1.6189885089828095,-3.9554328941793693,-3.2510831604772497,-3.4902208930790675,-2.0572016788145167,-4.259070946136566,-3.250821646107434,-3.323054913670665,-5.153705827742454,-3.979193360245861,-3.173796713850345,-2.8247502368239643,-2.943668965314876,-5.119762415353899,-353.2277334686585,-3.879437116726111,-5.270699656529433,-2.347405033219572,-0.7833740826209998,-1.1743744281009865,-3.205060452974844,-3.5384010073994645,-11.603877776162296,-3.7140212668788237,-3.107105810101138,-3.3777375786585724,-5.039148496480283,-4.740896609629941,-2.8708653017903902,-2.7214731776855263,-1.901651709848771,-41.34625428725111,-4.192352861924445,-2.9782311021218093,-18.019495287868477,-2.627054643954697,-3.7794655167462263,-4.011876894521548,-1.7770078911769422,-3.6531847703260354,-3.9331108465657016,-2.6014254684899574,-3.092870438122249,-2.091767081489669,-4.008881698736953,-4.662768649494942,-14.90188904127524,-3.4893889356621837,-23.860770397482682,-2.73615518202298,-3.1842856749838377,-2.3385705057884087,-2.3397209914710437,-4.6340715736760325,-11.914661851463517,-1.9701116457040129,-3.2992837339004724,-3.5851415135563225,-3.9384263410848566,-2.7139537006494634,-3.1806494856727943,-3.0385777762102797,-3.3200433116147017,-3.450166914521964,-3.120771367832326,-3.7234353911128877,-3.28839805083289,-5.234647257653618,-3.4439019923647534,-2.92256886806825,-4.487427857275633,-3.9002744341562186,-8.500321718990715,-3.9950406692780223,-2.9197249535843763,-3.3726418711643413,-2.894718843049688,-2.2719442316662994,-3.3881144290651544,-3.4103810959690564,-4.854933482821811,-3.8010682579030215,-3.943221330526549,-3.002743790328336,-1.630251487704042,-3.432495232609253,-8.447533413090083,-1.9547166211508902,-20.692394131142212,-2.97723908059873,-2.8566345643814612,-3.546223054393317,-3.814623720421033,-3.1276906301011653,-3.5097966413160173,-5.4012615268472945,-30.614022380730322,-3.5380978471127174,-2.9448756841354435,-4.022261848290538,-15.12959381965115,-3.3169198907613033,-3.022563172870404,-3.432823882675381,-5.957676471997308,-3.1798634213850097,-10.350634798502309,-2.091821558513894,-10.059085206777091,-2.8041867635512743,-3.0338122055927585,-15.00495838873123,-4.186525331330634,-3.481687985190978,-2.818338477050169,-2.5027371970306014,-3.2514637211807544,-3.067620058123288,-3.481993183671414,-2.3728714602111256,-2.879410748637783,-5.523704723327217,-3.277622435362819,-5.96010557493108,-3.1137322581493683,-3.573519299786561,-54.78281247324016,-3.9799618615648025,-3.1504523910594164,-4.581892323031436,-3.385703533487422,-3.6126409928923993,-4.3774306884977205,-3.0818171877199543,-3.5057867478058053,-2.583980198295573,-3.44562385813883,-29.294631211689524,-12.087541789079348,-3.2059253547368707,-3.4366053514202557,-6.1563716754066204,-2.9732421299724345,-4.979371462178822,-10.164891868212594,-3.3108673094625565,-3.084336759227482,-10.455649758404768,-3.492067516176844,-2.3655809375945567,-3.7457860736212982,-3.2885415693597286,-3.4758297071169033,-3.9055862905543033,-3.2108916552783358,-5.560111622231979,-3.076717543269096,-2.121470390145628,-2.138446015874054,-2.112929646540653,-3.5686546699098853,-48.76743283673999,-3.9337663019370477,-2.8792844294935973,-13.096371711695854,-3.1203428687225414,-410.36877452743363,-106.06128195947042,-3.9972229023769694,-5.1842590703105325,-4.579021590132693,-6.303544817307505,-2.834417586870008,-2.527678380840972,-3.205150864480994,-3.2845247768068386,-3.916555466264598,-0.9855230411186523,-3.4949503713063383,-3.419828984885566,-3.778262420107102,-4.516373920655004,-4.411439244132584,-3.67856551223858,-4.305423547014016,-5.3749762343307985,-3.7028321283743266,-3.4050635772224345,-2.874069685270047,-6.73497351944238,-3.094387229150342,-3.043375809978441,-3.9145919682333696,-3.671195932168939,-8.3083220979496,-2.906868847564374,-6.650578325190663,-2.3148927417583036,-4.595619970775655,-3.3472307211143697,-1.784227102385274,-73.82023824822241,-3.4013116909640475,-3.708937646976887,-3.7356436770222183,-27.52898833983452,-2.082694031717616,-93.49567353385092,-3.0036021346443915,-3.126917817534048,-4.959004640180359,-3.221382464178283,-3.4645770506730815,-3.3476195545449556,-3.8855665150422585,-3.1003677248228296,-3.842429805049838,-3.839035420671271,-8.499206863479554,-5.818410614864798,-2.6986628867777798,-5.45412528993434,-3.148667414743286,-3.433449035040764,-3.5273705340031047,-2.04484868043087,-3.500140050680392,-3.244794283831204,-3.987313694562012,-3.2338158036652134,-30.752025977022786,-3.4759771838087272,-2.9895297537994554,-4.081233141384338,-2.9852844364278877,-14.68436696603047,-3.1265359401922836,-3.8190970240884416,-2.74940676992179,-53.34894746767567,-3.6674343810387353,-3.0851629962431355,-3.700396238704029,-2.721594428737639,-3.649790856257684,-3.526317696145658,-5.016701739873673,-3.236966668411287,-3.3328422769526926,-3.130580109361283,-3.2997367838764906,-3.541434912464294,-3.2200005450346327,-2.851306803182667,-3.245862990661896,-3.795039919462187,-3.2604687348038874,-5.6617682659499495,-2.818305905422218,-3.121274081475287,-4.311078860595392,-3.083403980896674,-109.35009017760272,-3.1178205376926598,-3.517526925687498,-2.5689343106752354,-113.53711817878559,-183.8551557292116,-8.877363239419125,-3.9040855332515747,-7.497736950133816,-3.8573912673979835,-2.19322115925839,-3.4289368929480446,-3.2122888517947383,-3.1917449248586713,-3.0156660395948216,-3.876567836995913,-6.113559509419214,-11.565681171381133,-158.0678187530271,-2.873544566957173,-3.156202444980617,-3.7038280421259766,-3.6156487208955825,-2.918177452317882,-3.375026177623452,-4.187049918265103,-539.7109941558654,-3.208175710306439,-3.8486272551740264,-5.527506725244304,-3.701800547184153,-4.371539319866708,-3.121000475231244],"x":[10.924337405536688,7.581272219746271,10.104501818230226,12.675828693174921,0.7191199396985315,17.090262477647332,6.084340871154401,9.761408409938333,1.7361086244141966,18.48882477360464,2.1944676092225635,15.187383518729254,15.582424123143102,12.642233681852225,10.270817953087445,19.371160745371196,8.37706732839223,8.347782135268265,9.534821333682984,13.391397456864302,12.077475827622127,7.607920666470811,18.817789744378032,9.775376171050677,10.50473973135527,16.340572185059763,2.6956643585342643,0.6598406256163303,9.35940925590026,13.16895830305306,9.999602010857265,3.8309438893868952,11.13946585278911,4.192930474410157,18.250454330721176,7.798188048071943,2.852410389729596,11.412622011396145,16.33382557452832,2.820629557189429,9.475111729771983,7.387727919547276,1.2152584424997004,18.807223264034867,16.636183601321548,10.584077476875716,9.563014177063632,15.10047205465252,16.002519669589333,11.557974984182525,4.929233759527838,0.11301856715772107,12.266405823657923,18.5601106877464,5.9910132863389975,2.745583667719367,12.658896091232567,15.124723797171033,9.682483031009475,18.823239799306908,15.190062859034526,19.010286471423402,18.79941006339896,3.91779734010973,10.69216775943901,0.5620991362155703,12.625132231104779,1.6546324379967103,13.694647365094834,8.120178938771625,17.2288383508476,5.8637336890300285,8.388664906273803,12.789508220366987,1.301964213775273,0.45706610611747855,15.682129866818943,16.757230537810145,10.242554260821016,11.815990841874719,4.568701771557664,7.2992513036940965,1.2274010536113433,17.789455180987606,12.157623943733778,3.4339643447191825,6.834730693574933,10.806174895509525,19.604144610491208,13.419717975993354,13.622558630809811,7.407196231606337,9.424778409215175,8.307103751644869,2.76098267048575,0.5667399860189937,5.459223962694839,6.681262303635003,4.559156708560219,3.2484275152350683,10.418477191550824,13.22536944194768,7.414708021176488,4.900990946523285,14.3055512166403,10.279366288436043,1.6973648615471904,11.441054746572789,9.267738849447923,6.964400409394655,2.357239118136021,0.5856863296954273,13.988025187015726,17.430456327875188,18.681899145451606,18.05004847564151,12.737798473925558,19.47778715219396,19.826954636469566,10.447887942309425,16.254907280809697,2.498658499595061,9.264072116529363,17.79809539938402,9.880218557591153,15.32464627826219,1.150691529154062,18.128841955245555,6.990652634440564,4.846078304457624,1.1442739455009487,19.989672645153455,6.077765031971438,5.445546229545926,16.001765067895676,1.730085031223365,6.243177155357498,9.975965470977064,4.770342941751351,4.98044786911326,8.485876135256776,9.989851245056066,6.498790723016183,15.391506167448107,6.775616487217775,18.799360924023148,4.4623970079585495,8.034359588510608,3.117591955400383,14.144190879212154,8.53192972792247,17.999859835271685,15.752127395860107,14.39733221153189,10.100240608798096,3.0768034956312107,11.927733993736322,11.042595032364716,12.961004434456758,9.603927205727437,17.952270830012807,19.82633610531917,6.948226714995145,6.387165995355959,15.510395861653068,18.05811746830331,8.26105895552924,5.456348582160309,16.263968531743043,13.610819415983997,9.535663764471707,7.102932386674832,2.925724527569047,7.811393765370438,14.164255989978969,6.729523657117045,7.210016103420607,16.024143452270323,3.209367510310921,17.748887924189425,6.092407955752863,18.601385334791534,5.40456008823464,14.335903925848426,15.313167150565281,1.358957401162999,16.004427150902927,8.942582947987168,18.596522324101677,11.53717573581786,18.343433885731287,14.966707991859455,8.709086607077733,18.779368042899655,14.559249246924875,10.787742102614427,7.810470484061942,11.904681271341033,4.2925064532107005,19.410600331357738,18.799978822459327,12.751431882500874,2.0828526655109636,14.152872730033156,13.80801649008204,14.902241946247944,8.796273854094299,17.82094376705355,6.660117960500105,16.836134342270896,18.97382252867072,15.472798934828415,0.20573296845916023,18.344246757842903,12.083025745576549,11.440328374354745,11.962641098639125,14.833521653666253,17.921566767722418,16.17173571575038,11.660355592702217,19.574005357268152,14.399363558621525,3.8118569127110957,19.84178931666383,14.264470600152732,12.176946777403916,19.742286447721746,18.21391101449202,14.111777373515055,13.413912513694864,10.712768627055818,19.8241004973265,0.5542111284559237,7.419177321516757,2.195230603410816,18.2650001528421,5.139975582833349,11.173208755266963,16.33904030621419,11.075204323058777,2.1036582945524174,13.413993645368816,11.539502046303966,12.896130551664013,16.166490712644055,1.3671416789408086,16.59808310975506,3.585210886750745,17.06280406468462,13.896892308617304,14.341112338050266,2.7671331385503795,1.2052084294158583,7.173231024408397,9.086440882494212,10.26419018278097,19.372947850223774,3.4670199710813776,13.967448269215854,19.13052432663563,3.5356004054350354,19.323814523736385,13.611353818856422,11.431088610216587,8.544048979057575,17.964321752660595,7.984884776803054,3.0556343917237827,5.581998786935367,5.045028357860186,9.64220028592781,16.06191595902759,2.9623417449160705,6.28170308954803,1.3192272123451332,10.246434128207076,3.8455945639337363,7.909233846689152,9.04559595424002,14.58077416895653,17.954402116230312,9.45803140367083,2.9445966757441466,16.170133166629412,7.370293132337498,1.7163059124286617,13.19578165536984,10.378408690253869,5.6972493398654755,15.33632968696355,16.181270640830125,15.769572763479381,8.852094464681727,7.529807898451284,19.00005914010489,14.771432998706079,16.339945964634865,6.476952748639264,10.990924079993434,10.437271398799686,19.659276677547226,12.351520519585097,0.4706596067776836,8.82020584244058,17.188331726688734,7.574556141240767,14.4288809743129,1.2525168797586916,16.014427234971503,9.776480650332546,5.958015964547312,1.213258545938567,14.328066973938945,16.876673749708146,7.906962592512055,11.375770812152073,12.749555212467998,4.039606407936471,19.773823648904106,10.009928997211034,14.795282143498829,10.456691083423749,6.26904321677495,9.967433802297405,2.4040126306604037,12.085586274026166,19.77916516056076,8.791231862971006,6.405244621713053,2.8219339975568714,18.89943134739488,18.50940055568013,15.402661128452761,7.124905496784835,3.327039561781544,18.756169417701635,11.449157592363717,8.298850176426246,2.809746508107396,15.033402501023536,9.736706314200863,2.3813554768331224,17.068474482807368,14.667706787418094,5.043046282088475,7.281873274827739,12.878962522436183,7.821191123551601,9.031030633417124,5.405570585192994,7.933359866447831,11.784494468280409,9.872763162716698,17.682344173946795,12.618571112617127,19.49876268589479,2.331839618644387,9.355509519592328,14.058546575316168,8.103020454656797,18.265606257280012,2.2694840865074006,12.672327138747823,3.5872462697072516,10.542798894168058,19.038658245063317,16.920463614503987,0.9643463471518654,3.271668615127812,1.8064340368430898,4.681292345512911,11.84263583690408,4.809327075893357,0.8228992137070934,6.784524830538143,12.551518857941094,16.00125750663718,4.187082859250255,1.1793009146523348,18.947200907553082,11.836152129519327,8.421811671083539,14.684360023132657,18.663729450545283,12.050879645721025,5.5038105308139285,13.204016580676509,4.6069995580138245,17.040969013467485,4.3379548814973745,3.0138959172813395,12.973208385647176,8.752220495820215,6.368879689409228,12.013837940000428,0.07257517318497442,5.68055921796915,8.69917117944452,15.601633299297358,10.554555478513091,3.5156965794461525,7.772911682530923,13.389690412906976,3.5019983824344436,16.219141997388327,2.65432045717366,8.304182775977957,6.817799781129401,6.300479731625019,5.477332646315034,12.902508905064995,18.849810168170947,9.050516457284639,10.723614384404524,11.015715191108422,5.3422055811532765,5.93179200963684,18.601879309237397,6.123970355588555,7.541545871959299,2.242967392211148,18.040998703764725,19.749032472159975,18.234286551932026,0.8641729756326955,19.856046039575222,6.11460430293961,15.091261001569132,18.624697668026776,19.43589954259368,17.375615289763648,9.656206993265194,17.98408180617949,14.769272237726758,18.917782142750795,17.41117219944298,17.416636754385337,18.883679515421356,17.04993197594068,4.2987926897166995,14.811247536886022,13.345278122884917,8.977869899190072,10.093071116139573,17.936306184619482,13.91487518786008,8.29655190067391,1.015576532041993,0.7378970060999457,7.021931495273206,13.658112121741496,2.733758222986249,2.423103361111112,11.807459887276659,13.485353920530523,3.33809099681853,18.520770100409397,2.9143423358888754,16.6427262394459,14.547391219446805,19.918574321145663,1.549778460452691,6.820388750317052,7.179445404331086,17.317622830737758,18.335656951280193,14.074559842939927,7.031070986888683,6.498119377465086,1.004460295402434,11.039350150360967,5.560164401640377,14.549680538159201,4.289868318928729,2.654460457447261,19.73099180392303,4.9962983707118935,1.5432260712408086,8.551316896555306,12.573723271676327,16.032379251192754,7.629590652612106,0.8122027506765273,0.8405604457807847,8.558664669309017,0.9892341720158582,0.47605824656685947,2.5430130515754668,0.35236848875636717,13.454539960200984,14.762171203948746,14.944754108560257,9.112480919518928,8.833163341006522,1.8039185940255287,6.237920793799758,16.39910019014661,8.796673789662627,8.412367212698717,0.46791030788757126,8.408283286950592,3.553851556908243,18.904477170775074,14.104770383179366,7.250906296794359,16.432392531093765,18.81210042208672,6.746688591989316,6.921342611151653,10.73331491565035,2.4317518294113416,7.363331392287935,15.839613388690402,19.11165114018161,11.716984952099438,6.904937706616994,10.983932995988113,13.339068514575532,17.813372904235578,4.945364472405296,12.61257380827768,13.935713711887638,10.185164194610895,5.483023210468607,13.558944808514148,9.298915460592333,1.0156685496887397,4.167924148707121,19.41651972114236,9.736071459447588,15.730441970509652,18.1787554838284,0.0574788276319671,13.71391215327705,11.124634801690867,1.1621009517590863,8.885490902999278,15.572578999343701,19.122769287003894,10.527592893906533,6.016146684725725,5.868627802794926,8.875127710035319,18.815356905237532,0.8689790839364475,13.579871996769771,18.962945524135755,17.304667334890993,11.621728162529514,1.771464905263791,19.03806127972059,10.750993684293348,3.634318276082462,9.94698700080031,16.766521955838268,10.754109347317836,9.47814894534947,9.500320008483811,16.798073833991687,16.926167084106353,15.640341807326799,18.95117502332092,3.9669572379905427,8.339093365095195,1.9511402187749338,13.954422493117242,18.31778992452275,9.654939524554491,5.535811548635925,13.530169357961444,14.239494814326964,10.9540228125204,0.06437996712882033,2.713120709909851,6.523373267759953,10.735613869621377,6.107265630929928,2.1508641726826916,10.363598260514099,2.4048315603126857,2.3952907563047,8.165615503811559,7.315122643426393,9.405696282197372,14.048223284661368,5.708712349376315,3.8901175851326686,13.734252505071618,9.268410399622816,19.31719185349959,4.625766690216122,15.677323286445496,5.950744110915656,9.93217605975255,10.72869513888742,18.087719631250557,19.380491269953765,18.853449368653408,8.284255646780547,19.289151811984034,11.685528432005746,11.559013239714488,17.88316011968975,16.254895509636356,8.063335895447516,14.653731866667247,8.797957968984043,4.974018230169546,14.192194125407314,2.3658001810199814,11.589550506957046,12.27837063998875,10.087187215543594,17.29957992229725,19.15975477059467,9.375561202692761,14.997289817024967,18.220212085054204,17.395599211746134,5.424285911646893,11.264897580142513,0.2887517170478393,3.2384314272822756,0.5346603034498987,9.12517614433181,19.863311360565884,1.707608476156297,8.443607735541324,16.321688921913978,12.851374616664506,16.194351287072344,8.424127312779103,13.958580275363012,14.649967952642754,0.8140453152220495,14.56019469404254,9.00041745759209,12.591340260117878,16.906604256124762,15.607081332278113,17.87543538493354,2.1954562390977284,18.53430324779618,6.561659701385749,12.085557897799122,4.634668093998031,2.294027988328309,4.301674124254955,12.541533266369576,3.9226496668010835,10.511125288588996,5.604860164754619,9.926088086268713,16.21710255910003,9.18991145089279,6.778623783460267,2.8705177671615623,13.672872730206901,16.038845835470546,0.06868254210039115,5.190460299405584,6.56450362642556,14.500196769606411,15.767674885272815,13.257654921014694,15.178316684326454,0.3325384193150249,12.768893659873042,9.656242339105475,5.3068826034788374,10.773285321004549,8.219464844286888,12.689607141875094,7.805004695692355,2.859569823463195,7.017651609002766,13.653236586739723,12.30394457859807,17.68334913807943,2.1969770131461397,9.950179174814862,7.854574708840083,0.33147108901103284,0.025962603986688926,9.181612517190306,8.270699469640409,5.388365950249279,17.72609790398524,17.632287334485067,19.518659325904096,2.952401215551661,9.866313863948646,0.855225472844463,7.889283241233511,13.607155731582981,15.186527179893563,14.775735529133671,14.424519228977397,17.132673807451482,18.05124395964938,15.021329134020323,14.813408218309906,18.735497702257998,4.533630305336214,3.126767158945851,19.95532904466988,17.888114105359712,16.243461449815968,5.517210351890478,10.448950558241567,18.960564644086215,3.1950286652072135,0.4926644559681126,7.556572323337396,17.28592288857824,11.232301586179076,8.707279599492,19.852144780925176,16.097109251802987,4.804469191882155,1.4971881967145606,2.4326300008475243,0.23129913501565014,1.1106490089649856,18.11619590643049,12.257495526797207,18.866625256172465,6.900065692649333,14.20775247708885,18.36659871736494,2.520480150889628,3.0412604009593203,10.379945059797615,9.284987618811567,4.833730901213471,8.19021536009782,3.96988683158491,9.73965938200299,18.480305997439395,10.106951320994067,18.901943116863052,12.274591009860991,3.6314864832597626,8.484065163769174,8.493645940887319,8.371294812570236,16.044652932704683,4.221987338970252,4.532873980513079,2.403921822262989,10.917424703864068,14.83780745773763,10.411984294141119,9.54768424411375,8.220203924686892,3.868171395996205,7.596644693495782,1.6251324696303726,16.71370007492198,0.46561040501980067,10.592063476659014,13.502103936816088,8.717715938334404,11.056280106615759,15.918596144372472,3.9622853734928842,7.57907856633933,12.263512932714931,12.379133900423112,8.732764986748766,13.446944012578674,1.4079183349812174,19.74646811363026,1.0115226426852075,4.493497753585904,5.381801891676141,8.010604283802794,4.496329852245489,11.423101630291445,12.802505815713694,9.761463653451576,3.826743773150918,17.03376668276922,16.03220073129176,2.2198027496806993,19.32216596672598,5.663329418575942,14.776753744052197,3.190019196787315,14.183582557537452,16.885840063731315,2.418794089580212,12.518316325155116,4.888626829419431,12.799849803166836,2.1516114096182815,1.6182662871050812,15.970256142936478,9.32029123841148,16.10686623215336,16.392182440811617,7.94604673186067,13.97672577316753,7.504032905513833,16.40088309787822,18.101450986687585,12.162779352754045,9.27312238215331,0.8622950287030973,17.686862048511536,6.289786467788221,5.0732560093358,13.674403405235424,12.149962117742067,3.271740313147271,8.289967242779944,4.520494798212655,13.647544933956057,5.533901883624286,6.330812222976214,18.389219515394167,15.360623994660859,9.918303875913598,7.654787666695033,9.82757465025266,1.0919850248398033,11.50702184806013,17.588530519848963,8.349379239012169,7.140133464676817,13.648380872131774,4.390815642901167,16.325667362331735,14.73807307112204,19.8609371382988,11.311577865970035,4.724239295074044,4.428637786034879,12.702511152778836,5.138052333884744,14.9417817551437,9.610288659992756,10.022692872998476,16.652961678178222,11.486928266618124,12.357746110406866,12.799913619580723,4.429432229660706,8.671604479737862,15.0678553605412,15.354527774407307,19.324082151780807,6.139063196011638,7.203537356970626,18.79498644228829,19.17298136983721,16.976303495052353,4.82913974273409,15.953949942093505,7.020725824858367,13.15130597175973,4.64032982016529,6.187841165247563,4.743464108492574,0.7143635576402252,12.176278615229004,8.437658813936629,8.12169795613352,8.960546878711195,8.503996927092272,19.580519281909385,17.07924017418534,6.09028045525736,1.9264549718958435,3.408589782524043,0.27508286762556455,10.60665770429614,7.472904738255224,16.85953804116882,4.573446731194668,16.119501410868683,1.939065762536507,12.816184857404863,13.52283584541063,5.3498296639511755,1.0205310218956543,1.575742466383061,5.345604780444839,3.987647139467403,0.9866194552783769,8.676361779373405,8.578128373861853,9.103536933474228,17.62972774025061,15.15137663501494,15.433137473863919,4.395604929682229,0.7162848030580715,10.623661891965526,7.6322453615283825,0.351702756428387,0.6800246889716233,1.8571508868752806,15.648456121224275,4.328548624058826,9.5143560697485,5.378811669043824,9.327522903576781,11.303499762308,19.656065944814173,4.414596282390688,16.975402671069425,1.242933880012096,11.35012934060919,16.633265107605823,8.198025146691887,16.79941537600575,18.197717981025935,16.696079996051076,11.691515088563577,2.6693724628161464,1.9080936417843741,19.454667103676123,1.1532048549486085,10.816025017625561,1.5404166308193767,6.162278282712883,13.673230419116331,15.261870210149038,5.597159929040099,15.55566314164599,18.780447843049316,10.584189834632642,17.985585202472908,6.832783197949288,6.738367511017951,5.097086844860552,6.035593263390924,14.445587763275714,13.805080814627072,9.598798764015566,7.814957481898133,6.984127384887624,9.800453854978667,10.115515156836494,2.3950625703939066,4.4205398196586465,10.78017253799613,7.8723924666167155,9.292673647187284,14.340407416888397,8.626934786580062,16.826213690997314,15.244636366178202,16.427586907531087,19.40448036196553,18.414294480777762,6.782750742199313,0.7373596286658834,8.191255023649603,17.409531756938467,0.4784159316507042,5.022256542578836,1.6615152651645637,3.878208090108828,13.506305622179035,16.507345800612487,8.873826475676147,13.411153634114811,4.534724750013925,14.394866494113806,14.769701402616073,10.443576732696226,0.7759620401604872,0.018748122193743555,9.10060775836994,5.794495560154265,14.363916265282285,17.938334933605212,17.86973260165919,11.95837959217377,4.136808421734006,17.230397003944535,7.918923980459289,15.822938711121246,10.752966214671641,15.84436259961857,10.42358567198416,8.05700201946848,13.527473699681947,19.400858031106836,0.6002622097943311,10.305754382865157,15.344910503332091,5.995004760777651,0.4789098026189986,11.083874959877678,0.8273853138873166,11.592232500815047]}
},{}],132:[function(require,module,exports){
module.exports={"sigma":[1.7829895591280154,1.7488102401610173,4.0239713583975405,1.5574593959627803,3.9980433196658307,4.970881617980983,4.755271913775786,1.5653733047203433,0.9368306207109378,2.4694051762608127,2.08966298987788,1.536367789233074,0.8018043967639132,2.2606958078188875,1.6731007202858383,1.7742101061834992,3.1812602074607534,3.399793939205785,1.178242110896589,4.200165406753028,0.2579795155486486,0.48630968995826973,2.319823544594939,2.6994401984712613,3.2529307994148935,1.2004222959317723,2.845781840825871,1.43054361315053,0.5700884822996422,1.9198434107405682,3.855182983999703,1.763014134413179,2.136003324079634,2.7613629663807613,2.071939427683094,3.65117360102716,4.2019996450225685,3.4854255442065565,2.720665494525729,2.1478965487545976,4.186533874842344,3.142490894318688,4.646363583549292,4.589988436972381,2.049949271667235,4.277757637937633,4.207228295182825,3.3728257008912097,0.20157012199119362,3.266515438969412,0.29468347761964164,3.997794480594643,1.323365505800932,4.001166681716038,3.8739673186620696,2.5420889112361245,0.015293150565464098,4.823043516094271,0.7241605892819991,1.9455200132493744,2.939188863865506,4.730115400993707,3.3814778738606033,3.650188662724423,2.0656834382520186,2.422515155139351,1.7103623626850717,1.872594843525861,2.479689871858831,3.688082588129513,0.6623443127754991,0.4013496850892939,3.8086106532344512,3.653599362926274,2.4874857802994765,2.9184370766243273,4.410254298236102,4.033553076448973,2.501832029361084,2.703800566494412,3.4262498265874743,4.1246949937055035,4.2258214230780755,3.090743639476062,3.132187698000144,1.4045997356600293,2.474942861033086,0.8537101528785784,1.8009054802534963,1.7715775615269425,0.16670469715917346,4.815053194912553,0.4535768016808184,0.8921117767898445,3.469313263579208,0.9201071836714125,3.5873224383844518,0.13824404624927178,3.278248566310423,2.7286289487182502,4.481302149487499,2.334181568116487,3.2122416818141364,2.7945539143512974,3.0836006514126577,4.574272464773311,4.029763116861106,1.3358095787576962,3.248606762229238,4.08037351990978,2.293289018952671,3.638250555021626,1.6783741251483542,0.8614928701826419,0.6411102837182114,0.03619099554116767,4.006660148038001,4.238936138707268,4.319507021703553,0.6621025888318788,0.040398563947690036,2.0148108433248577,2.2523883222136973,4.2860833752737895,0.5258340873046763,1.0642574620663692,2.4291515980163503,3.691428775624378,3.155137182247726,2.2447744882554286,0.39064176078961066,3.961322195848025,0.6017716694693176,0.5569534767608297,3.151333154132315,0.6386241768108825,0.5833263273891942,1.7371194220205577,3.144311585539261,2.926351933692289,1.8370443921958735,1.0956081603761825,4.549112644589036,0.7599503224012039,3.130092115175529,3.566565986507866,2.302243499061283,0.5583177056741029,0.22091868688177363,1.5002264971741452,1.5254535379940681,4.108166123483219,2.857420329669763,0.7759252080695489,4.792696951174039,2.944892886593533,1.2582113917623972,0.37799464246135117,2.66240977235055,4.509204947086439,0.5423898832293361,2.95362654122267,0.46047151937102515,1.003764162799401,2.1916113625799327,4.013136015508504,2.3360879981934457,3.1060713140251526,0.6169263523759894,4.156545720102392,1.1186324137251413,0.006217998241722089,0.24314407408517424,0.31486968747245436,0.375537360609125,1.4035231508709989,1.5409543401770398,4.648775955577586,1.6496908047988001,2.3051169492985157,3.172473519934329,2.452065112075197,3.53527983235025,1.1423300810465287,2.1108944122555986,0.8863538699351026,2.7512173386465353,3.6062769579636758,0.6089205129189179,0.3702546904948256,0.7095021686869052,3.8821172116580804,2.219125364564465,1.9056816823269729,2.4873446861455983,4.140151047260698,4.521783715537646,2.014837325776134,0.5417412796267829,2.97200714483975,2.587339357183663,4.177218304230345,1.738399208405862,0.6705309726544895,2.8348420263489924,1.9209120155779713,0.756204781330001,4.653031966290758,4.019901684832753,4.360992242977831,4.325110550933063,0.8294549728523615,2.5245911202597604,3.1974737971767855,3.24170422241687,3.1604104325992797,0.8402729265091524,3.0417183091713342,4.250978926249672,2.496993113301457,0.9337279384112074,2.1210089488803785,3.001016661583571,1.7344229953417012,0.8585847059131635,1.599256182738894,3.886880457709514,3.365089003929327,1.7723008952580277,3.536497890607105,3.2341776567480984,0.13809927265064692,1.96599335548299,1.6610776063757504,1.3586609672338923,4.76579600172928,3.596696963744983,0.24217236574669787,0.8654065195445693,1.9598932465954366,0.3426960447118732,3.1612178016365213,3.232107828370654,1.779502623429997,4.281624320274924,0.6042244666915519,3.926898064135993,1.2641876262277951,1.403788137463483,0.27673300627921615,1.7495365280383313,1.9500786415867233,0.5210895039193364,3.340785354472451,0.6200420570893772,4.994137271241294,4.2387449428617865,3.632740393177225,4.616289998852484,0.05079864929102618,0.7270051751836881,1.1677307863664155,3.2497587644864936,4.487989282923882,2.1172566529505943,0.06999496398950034,1.7316409144574996,4.294259761431789,3.773605295879161,0.657213214410659,1.006421027666674,3.5563672946028833,3.101032578319688,1.0816084504584134,2.875707884441586,2.199244601954203,3.732128774175094,1.8695989485121167,4.213307353387334,1.0500544093334963,0.749621229891978,2.0998299354380645,1.0283963314381883,0.2300713700860746,2.0926214361508375,3.420128490883123,4.588301955973403,2.3494151542041495,0.05926836995615359,3.050042410303866,4.565907618057854,1.4568379972701884,2.2035308850224156,4.1144780544142945,3.8227439311729206,0.12369084417905518,1.6796831216376285,2.0765344384261173,1.608528121966466,2.587322474747059,1.2477029984329002,3.3536407182683847,0.24111069612594682,1.8470246039501192,3.3815206285033215,1.1650796355898074,4.107240641438401,0.23377509320330114,3.6371740899871585,2.3148251131474806,0.3732786834378832,4.626671460670933,2.9107036465767653,2.0132840098532165,3.8182900456647517,3.6450111197762514,4.817233231661927,0.6520490226829989,0.10259887451384508,3.0059588282005123,3.8094429119102404,4.328472515335868,0.7679661593156573,0.8645160261911011,0.4136818600088321,0.6288161782828183,0.016727213160776522,4.867204912223585,1.2111713600838536,0.9811357052903968,4.963822051930901,3.91356105864878,0.5929784093888935,3.728220549255675,3.6393212392910392,1.8944397178338312,3.5023936487143184,3.2119342497601497,1.4578269503021168,0.2595160930946072,0.6257838488220069,1.6318380639932983,1.4315375330079738,4.422234169107279,1.4577585496402734,2.7033178516687126,4.508367540120099,3.9899211228191778,4.444704259215383,2.1987306803522557,2.9268940657215534,3.7797773828799253,2.992980931309396,2.174757409974121,0.48815730598875007,3.234330263259962,3.5789625781892855,0.4119964630980688,3.499414051890671,3.9021507220868523,0.7606359613995417,1.1463869934027826,0.3117553484697666,4.534270895479674,4.335817315545176,1.62583613751337,2.4482546553132445,1.0168724482269198,2.422164055100305,0.2918943054923373,0.48485807524691227,2.9245275509322566,2.29205078919992,4.532653451491284,0.8348677859044329,4.1632271303556125,4.306604210678032,4.997244369413441,1.2037011950901944,0.0013863719463247381,1.3825276143162668,1.5827649055238324,3.8196143302075325,1.6103124796094437,3.1024227301019334,3.0244538649561425,3.4560568353319288,1.7380526548124864,4.69080014820093,2.6860978271195735,0.694865285477535,4.161513598120221,2.6292286895891226,1.1761414023144956,2.171219595253665,4.176309374999793,3.013833001049667,3.8764797829150934,4.076437277396401,2.6981062067909214,0.4858146447882894,3.15696989908812,2.718028896096448,0.9992610522066014,3.4991696691219962,0.5111431854168047,4.510793091794177,4.914671671509099,1.5874566204584861,3.8673049894661684,3.8639372836434904,2.9906895077587556,4.406172272429276,1.078216239285762,2.4283186560040884,1.7813273998540469,2.9013593352701053,4.909867571758996,4.727892554467584,3.398611571793367,0.3318240024433228,2.103835618989529,4.844789359922469,1.6275645391607163,2.967450577791565,2.291004618336369,2.5895851207816745,3.4924706407387873,2.063620981660541,0.28799248420807055,4.947775517529722,3.0461283493694613,4.75152928605071,1.5697173536949383,2.7203753447624655,2.431372881754009,0.35715862276288535,1.2639004341435611,2.1514210037807233,0.08441232700590606,1.7847736897511424,3.639713400589708,2.378292000342136,2.1131470445848235,3.566194537748242,3.4028131418512055,0.0908349337036618,4.24830110347806,2.0865361537126503,0.657107708385728,0.6170924263548883,4.030774563730216,4.414713300202706,4.818443992592529,2.274936158788049,4.255981371367884,3.4296388063918224,3.1105849836139834,1.442570009188645,4.157356770349843,2.9588284430817624,0.9328024276392644,2.033812374091919,4.4483275203226205,3.4138402220644872,1.8833238423263043,2.974363531735661,1.475836536396492,0.5751199929351336,2.31472408198964,1.073926310698169,4.504481608949201,0.8215474172440507,4.511767521950924,4.476977055834455,0.6482765390975864,1.441374036166434,2.641275371889785,3.0074728908049253,2.7783506987647266,1.6985003629964246,4.260287262986614,2.8411953391471556,0.31877308022054907,4.363047068099152,0.3396345395913869,0.12730098022557423,1.7872453186334136,4.190016608890335,4.208831613699555,4.536568430243921,0.9184221928519687,0.28869664210579016,3.0205487710160526,2.4457379392857326,4.216973586930996,1.0256249823204122,0.340908413737524,0.09209275894012214,1.126155002523196,4.526825922900409,0.16245465592367614,4.055415791694113,2.3835920417037193,3.1907699972220263,2.2988605019056694,4.401360843647451,3.665563876541821,0.9470007244193701,3.73660027805107,2.03636732529471,1.3278994064292904,0.7193903439209537,4.5859081431232305,3.8585465850206138,4.8750579922210315,1.900269174732725,1.8236033937855278,3.0705180453785297,1.8513479858407145,4.776754392381766,0.2791399491832658,1.7929185020686456,4.409583182949027,4.9795303346239415,0.2385323233343839,0.27834071429247653,3.7862206578747584,0.2731292525912543,1.3011196749479748,1.8497543506602088,0.9518191109789076,0.9279811513679947,2.4869859459708907,2.516620288897414,0.0036457923559429783,1.8383028565348736,0.18837261783144155,3.8275682437790035,4.970478440244623,0.004043203114415528,1.2286764424963426,3.213315386746717,4.9668139315897015,2.565194232146041,3.7067385779005777,4.435943758112919,3.731794569656163,4.756353987898954,3.237724839764893,2.669993269336203,2.3124313464511834,1.6978254485844224,0.08686052987747939,3.352809123089686,0.9430632144838613,4.108651102001826,3.2748871361839216,3.2561137328464507,2.5812758611289177,2.620398790042411,3.5529253043256537,0.02146228477516332,1.701677413167596,4.717748498302964,0.5340822142631385,1.5143671565824113,3.1945917643683153,3.8748250454737407,1.596533534788246,2.76082825048975,0.7652743013935026,2.8046515030302164,2.2580670111287326,1.7690400060939482,1.5682727735680124,2.3826229401573427,1.5824884994172217,3.8987570391419335,0.9349919434822673,1.9340824086676656,1.750009664032861,1.9329315411432901,0.9694879084462182,3.8818344167883234,1.6116504938293352,2.137428058750821,2.5865974215587095,1.8582357264285942,1.0075722540294951,1.9275330087201814,1.7884641281190439,2.7567504128752662,0.8613662890298734,4.8960011271988435,0.8926488998765936,1.1054876257878332,1.574467198871814,3.947066984593749,2.7511088114922155,2.6074398577616242,4.779990095277114,2.0195951432070647,4.486215509400439,2.2242189532035384,0.21748823378346938,2.798297080915134,2.5248291870061754,3.609179070270664,1.7741776607440263,0.8904972411672307,4.4337305934952775,2.168830504199434,1.4134266710990273,3.324326892220607,0.19878667116144388,0.4464641975166106,3.977784517269435,2.7435612828466494,0.20167220465027502,0.6961030452067696,1.6982871673615019,3.1887045384744015,4.712722197151181,2.344665167730052,0.2004924553241938,0.3335137510304653,3.6021520216672167,1.5126314053501044,1.1321689865784956,0.3904900725258553,4.116518418714465,2.4903838950402832,0.9437252480749658,3.3178865168593252,2.471493341724168,3.6785885866892376,0.9083380099337601,1.0080201198488437,1.8114453860565671,4.0793664073315625,4.512023062227426,2.5657234047137747,0.599377420930004,1.4234837129341527,2.140133747979094,4.552601620723972,1.6703266212982937,4.122538398054853,0.5006152342438919,2.741731606280525,2.2365218184968927,0.01045186942508658,3.6461978672883277,4.2052709584146655,1.5944397998792004,1.6777420403748888,3.86281427177958,0.6427320498063194,4.722080494801587,0.554392273490828,0.22749505162730443,1.0454102405598742,3.2600770805987156,1.0148168584909179,3.616502554673003,2.1898345905757832,3.248188607186613,1.1008971880624452,1.5772283479044746,3.2399826542750363,3.719447219136498,2.7854012208087084,2.092390180583102,1.8424294302151123,4.5002495875368,2.3757229622852916,1.4766822595460771,2.3811033658961067,1.4992951851974246,4.3332498540473985,2.116476234457727,2.5337986385940994,4.848316868302891,1.0933148672687065,2.028931614383831,4.962277208547463,1.9411120871885956,3.4163329243829477,0.1374435022879994,3.1401332158922592,4.099448997699174,0.9559195884342264,2.6451687141095404,2.80787877817695,1.10836226326671,0.6642899123079538,3.9723377348012967,1.0165985065658534,3.4553942673087668,4.478456147144386,1.341434087216573,4.254759469870181,3.5692497578102444,4.712945686896338,0.43926312204781603,3.733927377374279,2.5762885783862153,3.6375881234518315,0.6810859977867567,2.40821318408055,0.9961864783820384,3.3089761039859447,2.063400001975811,1.5401537849732083,4.1601998573297125,4.251412979773868,2.493646934440723,0.42728412410452554,3.498360134179274,4.52342019956535,3.761995050479572,2.8182160109142487,0.9950688652886419,1.2676482758228214,3.037286172383409,1.4174232009973786,3.9338451059521082,2.296233433876874,3.3424787544002807,3.780337317013154,2.3219155919599697,2.4718531481230697,1.5976349018514358,2.6576754449824334,3.785407600206433,4.06185191525184,0.410677210207373,2.058676105399483,3.11631831433841,0.045694161740365,1.8197429606852755,0.30643459557095354,2.6468546358763745,3.6179237773624084,3.740222586387869,3.7361668461154727,3.408472707418584,1.9314202807809144,0.7706773482846874,2.2007337229427124,2.7483753224114302,2.8187207055457533,2.7657343011346525,1.9997274745862426,1.5837067074005529,0.8931839831268018,4.620023920893482,2.9987226156601174,4.962995658880144,3.903403256690472,3.6460510159950976,4.877750068089874,2.3731693910960585,2.350547085581838,4.271258420086971,3.200716063005753,1.9858006236954073,2.9635974604941797,2.4390557870962692,3.2275239052714157,0.8032856159427881,1.729353743282268,2.773916325309237,4.332137214485192,3.1713941398678234,2.014399717861959,2.4559254002763864,0.5470004879924195,1.8515552401753665,1.574915044258658,1.2493468308220312,1.3369852051722508,3.580809952604861,1.1116592005854908,3.139163154013249,2.728184305579325,4.138077813259651,3.3706948064657993,3.9620423832131846,4.917417360215697,3.270030917748036,2.1176370195495906,4.581857998586907,1.8836896530353764,1.357601825344632,3.0680238738700725,2.158559504472213,3.3484965708913905,4.530625364054305,4.093728796416415,0.9238073352016418,2.616065962721997,1.0087738805820778,4.734225734523036,4.490538520862338,4.167595229490429,0.4512012461374104,4.702321554739555,2.884322354565394,0.24261186225932985,3.192362884308663,0.5727586538371443,0.6046707433117859,1.8540221201276452,1.5731757324363826,4.826662893242189,1.5095819606657468,3.9886346451676626,3.6809008835614945,4.222883084464994,3.444364617784802,4.99014493536388,2.114399437683124,1.62897916865697,4.097615183206163,4.126720598966709,1.2504788342806117,1.7065148578281808,3.748321632180115,2.4645326662853115,2.606039057366647,1.325518886749929,3.7527162235386555,0.8551241504139084,3.735120792276555,1.7781450223487338,4.700330240314983,1.029443206031404,1.9330364056078875,0.3293209131931052,4.824713335955522,0.5572721403949732,2.9797813330736944,1.8743150761126581,0.3541292576630106,3.6611548286754,1.2738364968709293,4.442152392367155,0.7640645361938037,4.109830535244404,0.24024337803456697,4.4253375416719,3.1908439875728343,3.844685337261894,1.392557541829006,2.687732890750719,3.323867465701632,4.406477076397115,0.42406530420057154,0.06995978539136583,1.1209440436534546,1.5138592996357436,3.7006948281302687,2.729853502628259,2.2755293283933007,0.5955614155656397,2.9834952841882134,0.5028710276029746,0.25889041431594984,2.85684431100399,1.4626231902109865,3.9173845403106977,2.002807108214506,1.7902456097916841,3.891397934048073,0.23929234265386845,1.924028894791323,3.1928471846921527,4.263911591680117,1.9571977882773062,4.6324492247319,0.9750908802856562,3.287382364523915,3.3902915075692563,0.45237437039674644,0.6079569581044852,1.8068408496422905,0.837058321870543,0.7163226456246619,0.1812581178286632,2.2204890136816435,1.5542702056154911,4.447874057778259,1.3722458622099731,4.049366145413609,3.7305215719857507,3.9601192082858594,3.6251708335932555,4.323024957940067,4.47253602192657,1.151467831441212,0.31834268084624195,1.2247696899100546,3.642142392797126,2.4291947557706406,1.5517955285488283,4.982167787894088,0.48596336200696366,4.793918543016225,3.6549616016796858,1.8139495682247064,4.8447290275012715,4.884798653584578,0.27837420897128706,2.8024487352038587,1.12891730947279,4.435816263719355,0.22234905171622188,0.6718245882098028,1.1511442942839767,4.34414061426676,0.5866191221750117,3.3125397338122164,2.969870296703027,1.5704162698766944,3.4559499169974273,2.7199937527069618,4.912131684165452,3.943873011056398,0.12290405837809826,1.0504100450546772,1.9052232516487466,3.221696791120512,1.1090068401712705,0.6466195291390053,2.825535109572297,1.908179887389112,2.953077703421796,1.6737721564060826,2.6871530163049027,1.8613228414890892,1.6255001264947666,0.28998150392093414,2.451640271525962,4.599110187812238,0.1430578687661821,1.480055641478012,0.675704012458308,4.947978917095783,2.0275836609864983,2.267411532318441,3.6688582183912546,4.500840840817397,0.3632078384002002,2.972685028386566,0.26582752225924877,2.4255782289680017,0.031670287356205806,0.39277366068730113,3.398838289503404,0.1306723953861677,0.16117955091629832,0.1482324355435949,3.9940203878833302,4.2478768767303245,3.518389652879038,3.29330255847415,2.753308760437514,1.6282188881755288,4.600311517778689,2.9155903594330357,0.5917627620874488,4.253589696689435,3.961414007877667,2.29766184183102,2.4850051631004657,4.049885503405697,0.7531969646503656,0.9365866416015356,1.7102935289401366,2.12073485683119,0.21371527221121345,0.03190200073407756,2.8720387105363154,4.33978077863694,2.736011845210303,1.727011180757867,2.4234529660883353,2.9950765630490803,4.3431376617457556,2.4987630747248546,4.061944682802566,3.721777536639017,2.3853116069536817,0.9181767456578072,1.4941650966593434,4.715702758213474,1.86276274728994,1.7551597321305223],"expected":[-56.24026499176002,-37.077140042523816,-3.5463445661700903,-1.8869771757786356,-2.2558818125127766,-2.1364107585124312,-3.6655199469818056,-0.963595720934564,-113.57872668784503,-16.41866936351629,-37.01006335334449,-39.337729825210914,-113.56127683778435,-11.215789489867372,-2.779698842286404,-1.8933981697078917,-8.879701755669657,-1.7242125412378013,-2.2281564814178454,-2.084853226219263,-1404.7123567110355,-28.3157069418587,-13.556732584270078,-1.4930454522901397,-4.210470833862869,-5.0629930186342955,-1.6073485826925022,-3.0665970866444434,-0.2740412190635977,-23.957377372982826,-3.7061353815557894,-14.34737852414715,-1.9129976159078455,-1.5176842984563879,-2.902156104076519,-5.118916274848461,-8.19161750857646,-2.8178885300326537,-4.927579841379309,-1.654116533091981,-1.9531761648250345,-15.932793223017914,-5.296996609122772,-8.529025984092973,-1.5047008064101413,-2.56622267014382,-3.300533404626263,-10.13888359204027,-3200.694301612726,-3.905418693109641,-113.23357176703925,-1.9052435647364774,-4.142277262927888,-3.237546503486402,-4.316147947130752,-16.00071728042305,-27065.18283300776,-5.1385202733749225,-274.08094828802757,-1.2245874122671336,-3.3747446685502505,-8.50658268001521,-1.8224039354698236,-5.67250580379985,-10.885237874054626,-1.407963532461859,-27.84903562856423,-3.813602038372302,-14.747264537722545,-2.9076957200962403,-13.372689346455111,-18.931897446953506,-4.209504613373442,-11.349681488975557,-7.99405344001083,-1.986361257655915,-9.000586756964543,-6.101189323076577,-7.2694817798058935,-4.170083119842881,-16.01942190470082,-1.9515884562029688,-7.551201480928854,-8.423396794073447,-8.354295425975346,-15.979227917318413,-1.5832559749445005,-22.603794340200377,-16.192228161805694,-26.458334696221435,-422.1981847852865,-2.3256875431375796,-910.1977454001443,-35.35095206859723,-8.928807323518027,-26.42444109503683,-2.8708728461644455,-287.7913549140301,-17.227804740399737,-10.0748989332963,-2.1772201947882426,-4.216754393241676,-3.187847866294193,-5.400755243642943,-4.701589198102399,-3.7810485062535952,-2.656454606648371,-34.50547219753814,-12.473832093444907,-5.381106825295178,-25.453316454616033,-7.21960624754358,-11.552473345237047,-216.3554879292536,-0.06039980878779255,-133906.29205047106,-9.464953869318318,-5.449094473075657,-5.081858646561127,-0.10339694757277212,-24632.279524904978,-3.2597457234096074,-4.790795984186634,-6.035293358360336,-52.070365500514505,-34.019856832050245,-3.080851001536411,-1.9252068828990403,-1.6601875529046632,-22.514661072292036,-342.5243475030068,-4.22232481987663,-14.327365117425515,-543.9360506278955,-2.656761710307514,-169.20658427768578,-422.50049182741367,-1.42812010654887,-1.8062404183951,-2.6793017061578173,-13.351470707485369,-10.62028708264114,-2.0565168021585256,-213.00804613507074,-10.1512450663796,-4.404734884143506,-2.4402935986883345,-136.92418255080236,-64.4643883358586,-0.9428511971958946,-66.23239481158906,-6.550396469580116,-8.538562332858232,-68.451444974595,-2.5016145043506484,-1.5808533754953582,-61.71980717447195,-5.151382438867507,-3.357548181675559,-2.5244195390820137,-491.62150815815403,-8.88225679489238,-42.08016728628277,-166.1768467754944,-25.04986416326538,-4.309328593502975,-23.103020972908602,-2.5880601242670043,-127.66054288238908,-1.9349581825743596,-13.117911326531148,-3.6458165975619676e6,-572.188802545428,0.6504088815571032,-448.6466848032479,-92.41511675291207,-31.56560602704334,-2.0672560014959096,-18.962331673457907,-28.267408931164706,-17.191787144379422,-1.4411616301592653,-5.411803701541937,-35.432653831428894,-8.812566264691668,-109.26839886406715,-2.241999665709801,-2.993259469322894,-251.15231552396676,-2.0074496998524043,-35.594731931970045,-2.095932840515959,-5.42140983691441,-2.516871785327574,-21.96969932411636,-1.922920262320735,-5.717170663208397,-5.430481683964921,-61.71462972991703,-1.6992302331780205,-4.778312493263745,-4.331522646323703,-38.738689079466916,-0.8796608768370049,-14.376815935890622,-10.26657952239059,-148.77540126236937,-8.606577790726528,-11.373899706604165,-2.3874144904995993,-3.3396146782277656,-119.44623620637928,-3.729570315636272,-1.7366780415963334,-4.1974209167332015,-7.297144244769846,-166.48300516705123,-1.8081942119077006,-3.2650555293590777,-26.3078544069378,-11.158065696152441,-1.6992544108237928,-1.642935122606871,-15.40398931025489,-75.73306051064823,-43.980655381045636,-5.083518973939536,-3.18449955668415,-56.32452451139572,-3.2731542530644653,-18.446880021907592,-1815.0502327033357,-40.2049433391884,-62.63180556657917,-4.023843373077112,-3.0858975961496746,-2.896645819703518,-479.17378121174454,-232.0849330260442,-20.700381994651394,-893.8317838651816,-5.910779956298934,-9.959024788167277,-37.125477036619415,-3.0103037675668736,-409.739092047118,-12.579980959978725,-54.265214119137326,-49.703955706605214,-1316.4866306317106,-4.46881191644116,-10.868448484325441,-611.2874606511557,-1.9768658309278693,-123.72271671587055,-5.447291346570751,-4.341148894817059,-6.276625289847936,-4.024903035891434,-30473.26482721923,-284.9758774511918,-20.695872091277337,-3.386014792079282,-4.822806651948769,-17.611748119017907,-10623.778026378506,-1.2933341543475418,-10.400675883413856,-13.433357681443375,-342.4951696747969,-36.48409488476467,-7.249106495859272,-17.82653512060474,-18.775290611901696,-20.50583703417918,-22.782441216151327,-1.8407729808350655,-1.6036057278295455,-10.693412457171528,-7.16657602492949,-11.001023986958074,-1.4823775702965318,-111.61975414938024,-42.351411608995726,-16.505466539200235,-4.18038894766881,-3.692979432951886,-1.66366910195023,-42612.01050935078,-9.634618440116478,-9.161728635022877,-0.8910650628645542,-19.648009721595674,-9.0484916770399,-1.8419419375383541,-1445.9152380296584,-67.19121587929003,-1.975415467152074,-30.111548779815735,-21.030092600644338,-37.43261693896652,-13.501934955935969,-136.95202548986967,-6.900623536243143,-3.194649149827348,-1.9381109048497862,-2.3653623228918175,-1260.8303565338572,-2.868224466611996,-18.091830615265174,-780.2101402713778,-3.735201751550229,-8.627705214599589,-1.8730164658672406,-3.0512662462546394,-7.680240522417392,-2.482753000933796,-36.843320399353644,-298.06731026121497,-10.800289641810672,-12.073191075870753,-8.450388254192813,-10.762597103568801,-262.8005045410393,-149.18545806184713,-55.86557490470863,-312408.10845313704,-2.1254525846924586,-58.93361947905177,-91.77764275106063,-4.4138784051376625,-3.886851956226377,-131.49318729710538,-4.064025787252207,-7.613807096104563,-2.2088793433187175,-11.678280069511848,-4.789239766906004,-1.0362746139196815,-0.05689057649867246,-110.57284698300413,-67.66920477461092,-56.03038088335125,-2.200363005086798,-91.86544935038397,-1.7898411586340064,-4.445550815195558,-4.331084699360127,-1.9996050083915538,-15.46140282448423,-2.308446597685408,-12.71200414307487,-20.659836195992998,-1.714041471059779,-330.2576705664912,-2.160320954092227,-12.263856703486983,-128.08631449424965,-8.647047321528156,-12.01616088926153,-313.73308429884,-5.4713896787663545,-856.9277291475331,-2.020584151019913,-2.0950597206315975,-1.679638645420823,-17.26529868762534,-15.29752351065694,-10.39769209974274,-1528.0660346424852,0.1117109241947587,-10.853086382291279,-3.5558730413982693,-3.5897480699342217,-198.06282888230513,-3.7422020813206744,-1.9791952205744066,-2.143309164227142,-16.248289842619194,-8.45246934999124e6,-21.802533256713325,-8.751428917944358,-2.436757886699254,-60.75986806013647,-3.1488986266499803,-6.63749819940837,-9.988291602539045,-62.882962926336795,-3.669269222019656,-23.827066288357546,-229.24121874525852,-10.483267199028052,-14.03300822333433,-1.75506003195735,-40.66876842793431,-2.7001892084944314,-1.973815013843091,-4.446948601893579,-3.856004760623521,-1.776887065964905,-132.13954979003893,-4.558223099047842,-2.5391284020156633,-0.819116407449645,-1.7532304531931064,-565.4195549428592,-7.328498051942287,-6.019152008742428,-72.38286955703965,-2.2545389558550126,-6.22596599894218,-2.8207670715565314,-2.2330861765007572,-44.214560384999054,-3.8729385890529793,-14.502798905016167,-9.421733900186892,-6.053765643203327,-9.028404211345993,-15.428678221138405,-4.015168804357659,-4.778489892442841,-8.282640620418707,-17.125444811649853,-11.697487011039444,-1.533908054865995,-4.202951276945958,-2.1708088221350996,-8.911596356807486,-1470.9066881655388,-2.1590441271117333,-19.78479008060149,-7.549169078483529,-35.6814836409774,-25.154406635259665,-12.54395081238543,-3.9712918093023135,-119.58486226836509,-1.3446290058709631,-27849.965516971974,-56.045884122860514,-7.750630409430836,-7.889920477851491,-1.4109664410497798,-9.678315307979435,-3.379061099552909,-57.27880638521507,-7.886200513133979,-39.013470322358195,-16.750617466444396,-48.057009955478726,-10.242658594708576,-5.236371647580265,-7.212470203639312,-16.053774568674243,-1.9498047199048616,-2.4622034284511987,-9.537023266388257,-67.42878559580335,-4.5883918108670825,-6.852032332248146,-1.8475004520581577,-3.239152056637142,-6.030917350745623,-2.7588772235409493,-48.34052436919772,-5.029573709306953,-7.489039751580558,-279.1651915835599,-8.51386632142893,-21.84812391944934,-2.310260707736281,-277.7586508969664,-2.2590923327679593,-2.1974704661484425,-15.570257027729884,-33.03371478993226,-3.602881994036778,-1.7521326317923753,-3.17412080503195,-34.767747439692094,-9.280960910149792,-1.8885733254326564,-112.63108932331161,-10.436045990371362,-1659.4536619524713,-1170.464406086675,-22.34414734450426,-5.1683981330067335,-8.896294182550804,-2.034942142141978,-56.04371107759313,-459.04736468881555,-16.497817380312387,-12.955692552878427,-2.005143993497625,-0.8379490893246241,-421.4937103851412,-3101.2950519766255,-80.36093792145833,-2.4364616866360715,-555.4429108935868,-8.372312289543272,-4.270179753468528,-1.7144586605238419,-1.334842882715657,-9.065799089644926,-4.27172775809483,-41.83963498848078,-6.124775601312629,-14.867160104158875,-1.0354237099278525,-16.833305626607686,-8.178866212449213,-10.853744168525433,-2.095671893802753,-26.609362810664734,-1.4727525000635808,-1.7581442491081534,-51.826437253936604,-8.000026802706248,-314.95826094986484,-4.303755637550686,-2.049189682139441,-2.5444613609163684,-3139.4103626365736,-15.067758017753938,-5.6355922673420045,-2042.886850038994,-42.93832469956542,-9.789887812025155,-57.30843521664568,-30.816394566748773,-28.135613911489166,-12.425890940401024,-1.735347296430998e6,-13.500070704870012,-1234.9201320921188,-8.056567731471706,-2.124707380257537,-37999.63489396816,-8.374551094944819,-1.7311402186130154,-3.4240902552708725,-1.444198290399182,-11.344537393453303,-3.5092969004421604,-3.6811710694410467,-8.636365884348105,-11.283266067292722,-1.833508766664108,-19.14110229701334,-10.986001420024376,-20135.427008225735,-13.109632786637574,-1.8028269643237425,-2.455336545601581,-2.3665944247907946,-14.363383849217838,-1.616064249337568,-1.9300202084284903,-4.252287704022447,-27457.519257186243,-3.6561038879280083,-5.177426743265545,-8.550120838459657,-6.084810660852383,-8.305198198968345,-2.115884210216921,-38.204051806705294,-8.624372538121431,-80.36633930242029,-18.566655530462903,-11.203016229625895,-11.762945027930442,-34.91569515806609,-33.237706186154064,-5.164540412059814,-12.53134892109776,-199.4697317929933,-19.16687234291186,-37.70387539025023,-32.921691810735894,-1.326467919141047,-1.8581277750444536,-18.627225192074253,-18.495816086018507,-14.762793510678895,-1.137541777992801,-42.879831171663156,-14.5015777119124,-26.583222096608587,-12.265639899941894,-0.5708117847923806,-3.863570542129321,-199.7392793247077,-27.48955038755043,-1.1862294747260091,-2.8692463438470126,-2.2545683661914677,-5.14940367979919,-2.755450142442233,-1.6392869042656846,-2.2976445311243983,-1.7129820876493382,-666.3841186244746,-17.53200804792959,-1.4445217826553896,-2.611720852355541,-2.5133093615441187,-150.4964829075574,-5.636324734040802,-3.713355716660162,-2.1590455123880887,-1.7016051873259634,-4155.920513447937,-701.3491939228275,-9.01985140589961,-6.254038362016198,-4200.20453611288,-16.46407686181043,-24.86754741960293,-2.221359069324646,-8.866106642844175,-15.221242896850905,-4.859783198050312,-470.4463672568852,-9.249876407992693,-66.148271955011,-124.59620553879316,0.08137322056413776,-2.0743110524835973,-21.510049640801277,-1.6140174808637422,-3.334737482410265,-5.898880020725503,-1.925885573648082,-0.6543428250630892,-22.28783366152264,-11.8527161701139,-2.316472747654728,-2.4141318790480844,-2.7816236716028624,-128.91336332391043,-26.567276667591653,-19.627176578279553,-2.0855941669262754,-13.517704765138244,-2.9073531856395842,-782.7324367789361,-6.267387748630713,-36.60735169122225,-80234.35121986078,-2.6991392100559026,-5.501194993568928,-24.926630013079773,-2.323467647880049,-6.3846420671728925,-147.3617513916389,-7.060739782004741,-15.6785887681527,-1146.7761084965555,-77.95532214636253,-10.097934944090976,-43.056875801184496,-12.684070832731988,-7.703221203416694,-5.032875519292106,-53.98447669334255,-19.510629078553897,-13.77487403189252,-6.735390969989516,-1.5905904236664714,-28.300558011573408,-34.612287621181615,-8.425793794297698,-19.91960532056298,-1.8373817335725375,-22.161459587265014,-1.974866797136488,-3.3339380306460082,-6.649559626390342,-23.534448164416446,-3.2414468445826827,-158.04479878771184,-12.572209604327842,-2.158866091601899,-24.03100071171767,-1.7315870336291928,-1648.8220704326268,-17.974140819714716,-2.1153213580615424,-31.787483019918653,-8.918970785862733,-4.954927893167497,-107.98697822000733,-223.65980099413318,-7.886390358876506,-184.2867583516281,-13.69097287721637,-2.0126517351667053,-40.057996908315516,-1.9480795506013,-2.14462608601534,-3.3416846229628203,-152.67761650495734,-2.2937709475722405,-26.7951947358115,-3.6597044922535007,-222.17451655531858,-9.204373630630514,-1.1568207419191059,-2.446484922708965,-21.46476951120921,-69.60699429991999,-3.541121101179882,-5.000671369154631,-30.017350037845446,-7.357206539714207,-5.999232591601847,-2.6120235004388395,-9.15032270551648,-2.461730944652787,-125.69778818213605,-5.163054862393579,-1.9567106217254218,-1.2692453647665094,-4.4844723837540315,-2.2768555702833537,-2.5513933371043125,-2.058032308591959,-8.843737784054149,-8.209526110212346,-62.052338764078726,-2.3016960948523653,-4.6083574523660715,-3.6252695791359475,-22.93295483647615,-13.732319048744323,-4.200225915113155,-89642.23735297364,-1.1373173162954267,-664.4072050497615,-2.8674501861769084,-5.6601635850500305,-11.247949913726082,-13.701726630775607,-2.212096706939526,-1.2048023778896702,-288.039079995178,-20.392367223601923,-5.152474387800425,-17.145182052241967,-1.7506118033989417,-42.176976786001184,-10.212323688754429,-210.13422211036857,-2.2130414479629463,-14.645456110043337,-4.932463849725142,-9.248054922957706,-1.8357284398341993,-2.3817535748128145,-2.9548953230100996,-2.173620036336353,-1.9521204117716224,-6.91297858080383,-37.560372417914266,-20.566879386475694,-1.5788836791195258,-8.423706808422514,-248.84674426646876,-1.210350896110305,-6.899574458409398,-2.27247352789499,-4.172502965178357,-3.1370359315398035,-14.967988865347875,-218.1598886392688,-1.4736784245363699,-8.785433626382032,-14.180600026207182,-36.07473804660846,-12.653816422550165,-24.325131278448005,-1.6677105196936348,-2.4572595855654504,-1.9412263541704633,-3.7848110121351723,-2.36968786187637,-2.427330191959492,-2.4049864799653204,-2.0258465980428535,-4.2120743001164636,-21.882969736919005,-1.0017852111455712,-14.604466909653889,-5.235338384698265,-1.9446802013839857,-2.217215139590162,-8.216292861928387,-14.485921846992339,-24.256795511570814,-57.033520317025946,-2.057025554423904,-8.027089276156568,-2.0920802073674225,-98.91603079373554,-7.591239142125986,-6.059832425659989,-352.51324779048963,-6.160020548016151,-519.2001970767178,-431.813834729603,-2.2241989366931527,-64.99644746843666,-7.253665401057152,-53.65429483336972,-3.262296246839678,-13.383249710325115,-2.343796614241933,-1.7521101192143527,-2.216114240912714,-17.35858317711209,-18.785905190150352,-2.715618814879541,-2.3933204890278383,-8.700064439223308,-23.417573722183217,-8.408018508709548,-17.199080244651007,-16.877847812856302,-71.38970299919718,-1.8342308796986033,-26.41367868510089,-2.0932725778275714,-56.05949100235774,-2.049175203226278,-88.03793654239755,-1.9043351531498558,-1562.98439507418,-3.5879899597839238,-16.100837308176615,-12.11990994176721,-23.100864503553154,0.4344320024117819,-2.513062417498747,-47.02860662090062,-4.328145300832237,-4.005534570982,-2.7434407440846824,-1031.9346792111942,-2.141958497699279,-8.712426864720696,-2.457414764040911,-23.077438238701976,-9.187106191883169,-5.016257807051063,-8.806239749800444,-17.106890882550054,-38740.30748350883,-66.82354094597657,-11.623377515509674,-1.8112562300869932,-1.6701927618325625,-22.40100665278868,-112.07510473969039,-1.889521701658604,-18.57736114026213,-133.09403931657488,-2.15079219504046,-15.250018973644726,-4.3508037272149895,-28.15608286386026,-5.808557384404825,-1.9850191353796334,-1438.9888029655513,-31.936872807255902,-1.953297535530469,-6.708773869598389,-33.41434652261292,-2.642680567633869,-21.688106041347467,-2.7525321077749973,-1.7211669581205447,-379.38349566036965,-190.28506917888924,-7.729526208723152,-44.210117417698214,-167.63741099038074,-556.7115500404692,-30.15465516747569,-64.81631858572098,-2.750539965126575,-54.09721121216704,-2.0093691528668938,-2.2432664282344903,-1.9142584018121647,-3.1696650211971504,-3.4320313207579285,-5.929853671776811,-81.05098262537608,-655.8039452228711,-22.737509928753074,-1.8000762180132672,-1.9636361433936746,-55.964435851585485,-2.232392035786442,-69.84912636762174,-3.244657935634277,-5.173428366308285,-1.113789923136352,-5.066701772106172,-7.704793893988674,-1208.1903256647581,-14.477933034589668,-43.76513347620714,-6.627715239052355,-2926.3033156958118,-128.07846243062664,-0.6749239064187116,-5.319113621757545,-203.8918098406203,-1.855224462655742,-7.303727681595831,-43.145213883562164,-14.992579063804989,-4.1714489131504155,-7.9390400795507965,-2.5454687401687734,-5514.453135670042,-30.385842143754946,-26.088945114413033,-2.6022445140150587,-73.29748322830763,-24.560667539279393,-1.5429894724082864,-23.39598028170189,-9.860192069064201,-12.277480493661843,-1.535324417985204,-27.003780393330377,-33.688491676932294,-288.16769704393937,-25.544614404491703,-4.134053630918082,-8405.150683647711,-18.515890842642552,-36.307585385147036,-6.206230018396927,-32.7314547108351,-10.655832736215638,-7.572925155223303,-3.4526024053932853,-1206.9647603288881,-1.8526890411786898,-2803.9018232979897,-6.31097324593943,2.2535735537511554,-892.4786982279056,-2.586546929542365,-1323.4001476471162,-113.65107775531683,-928.247782422064,-2.68621232849236,-3.9803482000898844,-9.676101217176212,-16.643345259506884,-2.3837149980929975,-2.9663938945294492,-6.748357286474324,-1.7093664479700572,-563.2896655090694,-2.4498047273855614,-2.4775401369315047,-32.6506964826046,-16.58872277343732,-1.9874799522806783,-0.23170824252869093,-17.888204712764086,-22.435616765111213,-4.019917915327452,-4.204132631727126,-2492.425212580473,-5.039807178856375,-4.058801079673214,-1.569397891299114,-21.90759695241478,-12.147561395349685,-9.92838134267841,-1.9769586941471509,-1.4177644443665272,-6.369205453411236,-2.4022734308869436,-15.339077839931587,-88.89167063703614,-19.15830332439215,-2.133671320171504,-3.123655365673917,-38.57127510273251],"x":[19.209857953339828,15.384084418081233,9.954475966164114,3.2522229383869927,6.633326336597047,5.896941240143598,11.652987133119579,1.3748740560982586,14.292052626764047,14.51969106962558,18.323434521704,13.931568463246347,12.239418437294622,11.069873479795458,4.227288444489736,3.563964763390395,13.629291129342395,3.4759218657063284,2.862879732230157,2.6943049294352672,13.69985147693738,3.8354899268035414,12.447432428978221,2.702186508109783,9.292925286732793,4.204495317815162,3.578467473745417,3.8971382257397114,0.9270709570119662,13.647493122735575,9.904589614174753,9.81517922935522,0.7120865857820702,2.8844998007837352,5.145117610380829,11.514103963493145,16.966659617094354,0.7422783984827319,8.67766888982656,3.6029553984165164,4.811745709813513,18.072550053349165,14.548894121124922,18.832202085198322,3.230475622511766,7.968163398323989,9.792093171795866,15.413965317642816,16.142429544486877,8.916960405848524,4.511331118649102,4.568473556592685,4.191070436163202,9.285518387719227,10.959722095650765,14.746640136698046,3.55872717342387,14.761565593049099,17.062037636578435,2.4359986887520257,7.4696123666140135,19.34263901697988,2.355897340159676,12.198707833392843,10.008553094603077,2.800052512115596,13.103770234357999,5.464096069453022,13.832132354401732,0.7585623129422192,3.6879802138978324,2.6459117671252663,10.635778787281275,17.618697603325508,10.255774075826514,4.963812680684785,18.669070846339537,13.907670611882722,9.831279514119323,7.878089613213217,19.704564771022927,3.3828134159193235,16.324403736968478,12.910753475896012,13.01813105408861,8.289448961227826,1.5177142222408602,6.001792408539104,10.617133775208663,13.232937992358318,4.873740100207651,2.6299702098398248,19.400622803771416,7.738835029013318,14.83116160770546,6.950282054880508,0.7449026850668439,3.346286596104413,19.57498103824446,12.562369545940882,2.7468987716280013,6.974204917820264,7.73579261040386,9.334962109137152,9.449463940633937,11.547952304437953,7.939544132242573,11.391132506552228,16.51470446599669,13.082698712996894,16.730186103396882,13.869610990258199,8.442089066232107,18.05220981968545,0.5965297013305859,18.72973078824421,17.512305913542225,13.63474208814977,13.304782305665807,0.5808681497725354,8.968279408900042,5.3591732461162245,7.224744423865972,14.605339407943685,5.51820003609147,9.042714723936625,6.055028600882033,2.4993520297584437,2.8279691396964557,15.433203254018185,10.28709171468719,11.019016593027025,3.46592255155842,18.438795141806665,6.705897626347221,11.864565409935675,17.035002073621307,0.8056402720482225,1.9803909826092791,6.394161074625742,9.866944833728608,5.394823476103756,5.506262696498516,15.806875202768214,14.367131869720424,10.333044485030815,0.47163895850097504,9.353298607096665,2.584538214098182,1.7984527580113907,17.824766318580274,14.712937069153469,12.075716891538644,9.25821227043587,8.233515969390734,3.0275680471197486,14.225633158793958,1.4616939907362436,6.8664735893943085,1.7572629089477942,17.077665849165967,12.709912848832943,4.373595298723796,18.45861236916219,15.878386582824678,11.284905119109991,16.25023270514321,6.506724937605894,9.983059601692318,3.742602033620681,6.0646327048184245,16.790505633106903,8.260663882776687,0.3378138322747892,11.30399438769793,19.315461979462768,12.562611183992246,5.48508705793787,10.51513794891573,17.697098116491183,18.94162004546439,1.9557665021896886,11.54526743539936,9.887296033739057,9.220411146614671,13.271371853501716,5.3582347248941575,0.662981040253019,13.745026866169496,1.0533099144190805,6.193808910795844,5.914568338312067,7.593478198316506,0.2966883183151481,16.859793851755388,4.33529704869692,14.857121002912406,6.962060538424351,6.165363758711506,4.006573081424132,8.162744255767205,11.715848674164677,15.6226840231174,1.3286704115076242,15.546025824409156,9.077941099357956,13.181110175043354,19.167745599701973,19.322872791773005,1.926151978782995,10.092498204772383,12.976842296570844,6.978308360530794,4.105361312421185,9.248437453702936,12.24062565031662,15.474270604678502,4.473573803508861,9.79049205643916,18.48264522820694,4.733526680401252,0.8999081600766212,3.650932734887964,9.995072657595966,10.752079242455759,15.301045863228975,12.122268959417335,8.019111375382245,19.10967145855881,8.497369165268807,19.986263256083348,8.334448870387497,17.963040273904298,18.874208571306326,0.03302307470851584,10.185795128642807,7.881912698889821,7.534865644952888,18.773797494041197,12.976125391220563,14.528450912767536,10.95304517918076,14.668543925441174,15.660420972264824,0.9246694021815705,17.378191622787206,19.895685706871763,13.425831535670024,14.27231176185586,14.228012949913488,5.5697142286168155,9.465565882897153,18.282699567634616,1.7821779905504753,9.880647148636408,15.775850077928002,11.87975934503859,12.84312098695854,12.148729883714132,12.542587446255965,17.46246377400936,7.8234249902672826,0.35961161849480394,13.328499538550439,12.938397635449753,10.20651373275943,0.9590300438743204,19.644947931837443,19.798225325628053,17.29320116175741,8.848674549714325,13.609702577974328,18.862980443718516,6.934951905759439,18.780850389130013,15.214079334512252,3.172020733223775,3.281679474911181,19.57361203695804,4.3387664030185125,3.8098135533249256,1.1692549201165114,15.54939159971363,2.2087467029592522,12.396388638360518,9.660349589058601,11.384572122425439,1.1883790414850504,17.304032270283763,13.65263870606833,19.47182982095896,1.637501343047889,14.18501464818024,17.537331827068577,3.704099428667371,6.665529920334543,19.751421039399915,4.065505238060494,12.810012732790517,17.151002233138794,11.075035476641153,17.71816483868586,4.051752773794282,7.2251683753382645,8.067352207830822,2.662884804475074,7.120761813698131,11.764264247770324,0.7683601510284133,14.29700624278443,14.789326932610232,11.554893897102199,12.352335375613471,3.8399966050060286,8.57239336564906,14.357646862584637,2.138706267608619,5.792244457813265,2.527968740921316,14.262791993243052,18.923884567111017,17.73681185839103,3.861530562441593,19.943339957680912,7.234813886288505,6.814022842146792,13.222306466365414,3.896046981957473,13.393740667476063,13.482469851722666,13.737622289588206,10.346296652466336,9.736926035219259,10.218859612931084,14.27100566368141,4.100086858163379,17.16849116576229,9.897530895726439,2.073739465042972,0.5357110350805172,9.438977869551376,19.25953283889525,15.424622326033205,6.602293476158612,19.999187230184393,4.284286158939765,12.713875470471873,11.264272772067887,4.845226272195098,12.599830222492553,0.8921627422497957,19.281935241878575,19.6001796389147,0.9343381911115545,12.621057162053768,1.308935329908798,17.967887018668925,6.688064865841565,14.705959406804991,19.317922958002406,19.159363785776222,4.173515627241127,12.943062081626273,4.112989151141795,2.8881423489193025,3.124788303727719,14.757221445513817,5.93722951710844,11.392584724787916,16.164259944832597,0.3326047966011547,13.928077269290732,6.26144488170028,11.045458769125105,16.749126543074727,10.617685537804974,4.913999525320474,5.951366983359754,7.1921478648981685,5.700158667543027,9.45826650001826,6.999667539140626,7.067873202011521,18.032507167260867,7.464838877641959,11.185275503514728,15.654682461664375,19.780556011836765,11.534861118785464,18.91393860763669,14.989668162684113,19.14623311634974,14.284631859946826,2.5612157708673955,19.925645027906608,8.251102595865337,5.001879425530129,11.168257717509444,10.646969441786194,1.4122785077094813,8.002331365484796,9.479455585683038,0.5974050503698614,1.608850518122753,3.592469980206192,17.25227073862017,17.060481194167266,16.503773600037878,19.367255348638402,1.7354456036993726,13.52623528596611,0.5415250721126386,2.419949840636839,10.387260645388988,6.893245548226625,9.964981222772803,12.875431279090183,16.54462632663513,19.964236727159808,19.187069754571226,1.186469367769858,6.7887285708097345,19.496363059588127,9.884625939678893,14.662555960991956,1.3450194309316554,7.621406219949427,5.95544928761516,9.074361151453267,15.64807462591987,3.7885761294367892,19.518242689915894,18.197182002713998,13.573805199669398,19.666558997964174,12.537867465693658,1.2642531291965886,19.75081741042338,1.5795670569516274,19.924850445191456,19.1964045235065,14.407539830500454,9.769187886944577,1.3262220773855082,15.868274574880093,0.39730946818165247,1.0122156156105433,16.794741679717692,18.77300056892116,4.049514324551886,6.223203041702492,18.351727673740594,13.808642446271167,17.972764614947142,13.263034431375761,4.093349648420839,6.679022708879274,13.837587017819931,17.011296744154084,12.09404451820828,11.144532128898309,2.197035053867702,5.382929884562411,15.098743515245324,7.309790335505086,18.835154224477154,9.500116791948066,6.091271638375537,13.679817893727503,9.88945621597681,7.394705255366296,7.18487676791197,19.480245168292505,6.939932857063016,2.6542864040948677,3.8668567805763088,12.023054949464026,0.19056623785412174,1.9249607571684413,0.32512059841286245,14.48843847324853,18.36655137194105,1.3723593829265246,4.865857463486356,19.979128362605756,19.596582052035334,6.174838443185706,12.302851394008695,13.082316442036648,17.7557147156131,3.870104472809075,9.935102395974482,8.791805285449987,17.695492692732344,12.810272998452593,3.1839909178781944,0.5165964685605351,9.950130014049305,7.26079713121317,14.491728877151445,7.744427266732936,5.440516431379927,16.604308586806937,7.150940082034309,3.9602835507079037,2.1865002738692185,18.70529494967809,10.386223263453967,8.897199811827585,0.03055002375365934,11.4780552238412,2.0416902518765756,4.43239600442578,18.395123701248846,18.140341349070567,4.361080015738268,14.21515154163667,3.0288285410284344,4.265965814145614,19.158970555347533,18.879457597801856,7.055829712854793,5.5878455762465284,3.3342082827398967,2.1341074620206646,18.918536782363056,1.676635647589233,12.561455228721915,17.481738582880574,12.33309933278984,8.559727190195145,10.404864866255451,7.537326589294855,19.024780332638542,12.899869834888413,6.792064075886879,9.925998823581503,9.382763031329326,15.412599514178806,5.710772497837704,1.1147920477287832,5.397399046670288,2.4386591387917633,0.8145785544777784,2.6854375390489293,17.859212710659,10.679795675831132,9.600523241286826,19.602970263534914,15.651365827597976,4.382230409879337,14.680207159273078,8.334113770079314,17.4341752192866,17.453673099276553,0.14842344665492835,7.428542792213411,6.262972256904331,17.76263751650593,3.701795529687981,4.5746872385240245,10.083908080716487,5.030314322486218,4.924327926093288,0.12563067385999105,2.4717638574384315,5.6615952765324495,13.221212466810375,5.999068739155415,14.266670189099697,11.750362116331639,9.87120812707705,17.453699683646896,11.051412835285204,8.955734233430078,13.419960120838933,19.78763969782394,5.455911270586258,19.719897281205437,18.81816124072742,12.341996219901601,15.52028321773772,16.027705882014807,0.25849008982338884,4.0485975103045835,10.191510586582018,13.37209557985692,14.415692132002103,1.615324381035732,9.571784037735132,10.754322693221848,13.387177870125345,13.989435275149994,1.292578721542843,12.39357979996778,17.979981442221685,8.480868512552519,2.38553046228708,8.368954442813653,5.382116803772834,8.552120749978824,9.17804849847959,0.8684581235795719,7.1158522304092475,3.779580071074675,7.970349246453403,16.930555759886747,2.1909053118776978,7.269517605113283,4.199707677259084,15.601542326007284,14.476476013577297,6.11584207554964,3.2515917375446746,3.2634008117022217,18.13660017875356,16.77400887656109,16.959778612478722,9.914489526177107,18.497473981073128,4.249700894734669,12.321575826450637,5.814417520739816,19.71107647630266,13.306980380803722,0.7940694025663086,10.279288135714948,15.64947548536082,17.665068788540875,18.06096549662696,0.6437488078852871,2.5985016631611213,16.706361458524135,2.0978644073689168,8.17776658490391,8.743306031850668,2.471707352733188,0.49858892532339993,7.0157054245447625,9.194980923903863,6.920800770584061,2.011127109548956,5.938532773001977,9.74662187980439,10.696218509973448,13.779749348537148,3.406962999591383,9.055269745608104,0.9534478920695877,19.862569276404145,9.919385934093432,19.489171471733926,4.187142172548546,0.9233913726473553,13.61306346692074,11.59546948676395,3.853339231797799,13.711742118442825,11.156830848596249,17.432853671569593,3.332072718656427,10.92036907609845,13.26075693110839,14.893491930186617,9.658939573158772,18.460972027527358,8.935833919474273,10.27859974669061,11.676759975731986,10.202590860119397,17.31202465973022,13.636742007196435,3.5303029406041198,16.09992159116149,15.664225583795899,18.366366152776244,15.367552732221927,3.0869053593363427,16.223972947930093,3.244811312166469,10.094279889153302,8.051465406951523,17.75529182226043,10.752631534677587,19.609227463312422,10.547753286614396,6.1906051264481565,13.816113746451473,3.6057422354429614,7.907144926566709,19.172347843258365,2.408383527257456,7.87592546672641,11.477657030007942,8.951732787188607,16.48321792144893,14.158203642357417,15.775897235661315,19.672326211771903,18.363369368922555,5.005966227414325,12.291434127387966,4.282138238546311,5.929298947504957,10.787235522877472,7.768203293372422,6.5491548455538995,19.23057367937534,9.364993668556973,14.467734217093886,10.669208151277179,1.8909364767190162,6.490133722987688,13.8868511704116,18.437851891218237,10.213640590967646,12.993811836849307,19.68872951633476,1.8809834806508663,12.106981062754896,1.5982942974271586,16.212594506653367,0.6985093399053799,15.950750969786199,4.457870073727306,1.4644048421716827,2.417286061912809,11.368907516951543,0.5571747003636007,6.768383835199043,5.709551873685572,10.106119321676452,10.331511390043918,18.07657449490639,5.3460174093714885,11.178194235692175,10.183434400177337,2.949712208814277,11.162801648311858,8.943136088239312,19.348806502790087,2.1883471350222505,11.210561658712717,6.202527663117645,12.086761236594693,17.934665767693957,19.80634229849304,1.3805112223996874,1.5308323066178753,18.6077849240269,14.42573806597733,8.968438519794027,16.864249209693764,4.193669832830658,18.699202550239722,7.532873625576348,18.447008603678942,2.8079537018750766,16.56442958652459,14.756230940501682,16.880126745500856,2.9254857970868597,2.509074624358929,0.29561890939650226,0.653313467604133,4.209231875116695,12.039475813411805,17.550116446410925,19.369215361326248,3.5607354371708766,13.446826323493628,18.040064863641057,1.085682793783409,10.536422541778837,2.2004092707852774,9.04405556215568,5.248540368441805,13.803932899049784,11.521099786638,3.0500516525876664,6.979563398718667,6.9965141042428725,11.647745157143415,18.263932737873404,8.046862620935249,2.668429692980996,0.6563595979503178,4.751472999990103,8.981110903314814,7.004446656659047,7.989546584010823,6.346326852845698,4.190684263467324,12.44589117221154,12.82229365332578,0.8079493700040752,16.910538242518086,7.276002909300585,5.088467903198937,6.723270783678172,16.584233282232894,5.275831522167906,18.592936416901253,10.996433037442849,4.95836646440726,17.855713295929014,2.6072079433851014,6.4562076032052085,18.07772918682426,10.209499795868226,6.4847321889957055,11.298598518650733,18.528261327752247,17.849609113910468,4.05248144309899,18.209767389612736,18.058383432821266,15.918484192647014,9.315023619627215,19.293470239704227,7.136507278418942,3.0265354819656,3.446255943114367,12.83108173792475,10.340112264987615,8.190750598143444,7.236449075934606,5.584772021052031,12.027198548764186,15.457929598116692,14.824678856470221,15.50690481972779,16.082408843186048,3.3535360117970647,6.466610071367338,5.840480595311894,19.12799830682948,4.516954584669612,13.858062037808923,3.7852654572075473,18.44267979895294,11.602892356315358,3.38890634101086,14.984000487710327,13.097917366563546,0.24693043562554529,1.1399298610853847,12.620611384687521,0.26076275214202305,2.527410930240883,8.282838990465716,10.941916160492454,6.265778725207758,13.535475981777271,7.155471979953916,9.786855249341757,11.826032890648065,10.471685885000333,18.43837988877909,2.668869157990521,19.475627243690724,13.184728317259244,7.668927890265644,3.5088532651902504,1.7044002786395396,15.601554745388665,9.044448979088319,4.731646459572216,3.269579532308309,4.289352072358978,5.296072177697848,8.433063729063353,11.119675835087328,15.383933361270671,6.459488953432984,2.60099667948805,12.861393206220658,15.721341035247566,1.6528952524898965,15.426253206064299,16.343515704853772,8.617656230063497,6.704968239225386,7.100259110226306,3.444150283970906,12.528368842636603,11.968034157815985,7.4751476681798135,8.085823324251184,13.242793495791872,6.0765098964191555,17.60424651915086,17.968184934478497,8.749208443047252,14.540791619574582,2.7850631775936296,1.6233842599157144,4.755439780637758,8.47173401050506,0.6100815734321641,15.026317518038041,14.877459442450762,11.570709205343181,8.569934040529912,3.9620743603207575,4.456646307582184,16.69907404378182,3.328401621102297,5.874450184509827,10.671203436795388,11.594706341483473,1.5744583670137846,14.691944951818181,18.88179879358885,13.713236055737191,15.427787581216377,10.816856695064532,15.887163633024466,17.027191147004203,10.88527463747203,0.9453368045785027,13.739787509730466,11.948588625137045,2.097257881342216,11.558980755552133,14.888862461195252,19.222325699842088,7.920396736082909,19.296017218057546,7.522426985090087,12.9151105485732,8.458594618293995,14.115904074705448,6.704158550684474,13.646103398734052,4.750870812797712,2.6424969667438747,13.4116139686782,13.396352243978633,8.667120441004311,3.2882714867007934,14.028572224303378,13.664190200957428,7.014814982688367,17.89380140226641,12.331210983765217,18.55561530424541,9.353070166109006,5.958188647493854,16.90418600765302,16.75337919623356,10.827026800323768,14.337735563391636,0.6481024218589138,17.88129457945541,1.6024506039019482,19.926583178206382,8.895190388992171,0.06098594296428228,16.637656845258647,6.923228864727373,6.737877276477096,2.4782802886019573,6.406396053729537,7.973536958313878,11.251710601427787,15.664952041111885,19.327559428555247,0.7235557760036615,4.273113474064547,16.593164991991834,4.063701276061291,19.93338367010425,1.6898424173658277,7.343336141637078,18.92679075396469,14.682503150982873,2.9093577813854665,0.8476882550565668,5.8927534522771685,11.807472976057053,6.255120292526608,0.8037444723881348,2.2558702690400967,9.218259248848849,11.603469410275537,3.4485959435708358,11.784649046577297,12.303435704918995,13.624339330744117,4.746154773759135,2.3887276313252315,14.33665215385366,6.8625036271416295,13.58124805966321,12.426444660374344,9.594436901718524,3.4306448761695663,4.907442607087629,15.73826399726665]}
},{}],133:[function(require,module,exports){
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
	var logpdf = factory( 1.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `sigma`, the function returns a function which returns `-Infinity` when provided `+infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a valid `sigma`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a negative `sigma`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `sigma` equals `0`, the created function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0 );

	y = logpdf( 0.0 );
	t.equal( y, PINF, 'returns +Infinity for x equal to 0' );

	y = logpdf( 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given small scale parameter `sigma`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = smallScale.expected;
	x = smallScale.x;
	sigma = smallScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( sigma[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 15.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given medium scale parameter `sigma`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = mediumScale.expected;
	x = mediumScale.x;
	sigma = mediumScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( sigma[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large scale parameter `sigma`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = largeScale.expected;
	x = largeScale.x;
	sigma = largeScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( sigma[i] );
		y = logpdf( x[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/rayleigh/logpdf/test/test.factory.js")
},{"./../lib/factory.js":127,"./fixtures/julia/large_scale.json":130,"./fixtures/julia/medium_scale.json":131,"./fixtures/julia/small_scale.json":132,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/abs":75,"tape":210}],134:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/rayleigh/logpdf/test/test.js")
},{"./../lib":128,"tape":210}],135:[function(require,module,exports){
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

var smallScale = require( './fixtures/julia/small_scale.json' );
var mediumScale = require( './fixtures/julia/medium_scale.json' );
var largeScale = require( './fixtures/julia/large_scale.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `sigma`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `sigma`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a negative `sigma`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `sigma` equal to `0`, the function evaluates a degenerate distribution centered at `0`', function test( t ) {
	var y;

	y = logpdf( 0.0, 0.0 );
	t.equal( y, PINF, 'returns +infinity for x equal to 0' );

	y = logpdf( 1.0, 0.0 );
	t.equal( y, NINF, 'returns -infinity ' );

	y = logpdf( PINF, 0.0 );
	t.equal( y, NINF, 'returns -infinity ' );

	y = logpdf( NINF, 0.0 );
	t.equal( y, NINF, 'returns -infinity ' );

	y = logpdf( NaN, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given small scale parameter `sigma`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = smallScale.expected;
	x = smallScale.x;
	sigma = smallScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], sigma[i] );
		if ( expected[i] !== null) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 15.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given medium scale parameter `sigma`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = mediumScale.expected;
	x = mediumScale.x;
	sigma = mediumScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], sigma[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large scale parameter `sigma`', function test( t ) {
	var expected;
	var delta;
	var sigma;
	var tol;
	var i;
	var x;
	var y;

	expected = largeScale.expected;
	x = largeScale.x;
	sigma = largeScale.sigma;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], sigma[i] );
		if ( expected[i] !== null ) {
			if ( y === expected[i] ) {
				t.equal( y, expected[i], 'x: '+x[i]+', sigma: '+sigma[i]+', y: '+y+', expected: '+expected[i] );
			} else {
				delta = abs( y - expected[ i ] );
				tol = 3.0 * EPS * abs( expected[ i ] );
				t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. sigma: '+sigma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
			}
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/rayleigh/logpdf/test/test.logpdf.js")
},{"./../lib":128,"./fixtures/julia/large_scale.json":130,"./fixtures/julia/medium_scale.json":131,"./fixtures/julia/small_scale.json":132,"@stdlib/constants/math/float64-eps":51,"@stdlib/constants/math/float64-ninf":58,"@stdlib/constants/math/float64-pinf":59,"@stdlib/math/base/assert/is-nan":70,"@stdlib/math/base/special/abs":75,"tape":210}],136:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":136}],138:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":139}],139:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":141}],140:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":140,"./polyfill.js":142,"@stdlib/assert/has-define-property-support":14}],142:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/assert/has-property":21,"@stdlib/assert/is-object":43}],143:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./native_class.js":144,"./polyfill.js":145,"@stdlib/assert/has-tostringtag-support":25}],144:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":146}],145:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":146,"./tostringtag.js":147,"@stdlib/assert/has-own-property":19}],146:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){

},{}],150:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"dup":149}],151:[function(require,module,exports){
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
},{"base64-js":148,"buffer":151,"ieee754":177}],152:[function(require,module,exports){
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
},{"../../insert-module-globals/node_modules/is-buffer/index.js":179}],153:[function(require,module,exports){
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

},{"./lib/is_arguments.js":154,"./lib/keys.js":155}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],156:[function(require,module,exports){
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

},{"object-keys":184}],157:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],158:[function(require,module,exports){
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

},{"function-bind":173,"has-symbols":174}],159:[function(require,module,exports){
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

},{"./GetIntrinsic":158,"./helpers/assertRecord":160,"./helpers/callBound":162,"./helpers/isFinite":163,"./helpers/isNaN":164,"./helpers/isPrefixOf":165,"./helpers/isPropertyDescriptor":166,"./helpers/mod":167,"./helpers/sign":168,"es-to-primitive/es5":169,"has":176,"is-callable":180}],160:[function(require,module,exports){
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

},{"../GetIntrinsic":158,"has":176}],161:[function(require,module,exports){
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

},{"../GetIntrinsic":158,"function-bind":173}],162:[function(require,module,exports){
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

},{"../GetIntrinsic":158,"./callBind":161}],163:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],164:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],165:[function(require,module,exports){
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

},{"../helpers/callBound":162}],166:[function(require,module,exports){
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

},{"../GetIntrinsic":158,"has":176}],167:[function(require,module,exports){
'use strict';

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],168:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],169:[function(require,module,exports){
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

},{"./helpers/isPrimitive":170,"is-callable":180}],170:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":172}],174:[function(require,module,exports){
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
},{"./shams":175}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":173}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{"./isArguments":185}],184:[function(require,module,exports){
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

},{"./implementation":183,"./isArguments":185}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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
},{"_process":188}],187:[function(require,module,exports){
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
},{"_process":188}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":190}],190:[function(require,module,exports){
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
},{"./_stream_readable":192,"./_stream_writable":194,"core-util-is":152,"inherits":178,"process-nextick-args":187}],191:[function(require,module,exports){
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
},{"./_stream_transform":193,"core-util-is":152,"inherits":178}],192:[function(require,module,exports){
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
},{"./_stream_duplex":190,"./internal/streams/BufferList":195,"./internal/streams/destroy":196,"./internal/streams/stream":197,"_process":188,"core-util-is":152,"events":171,"inherits":178,"isarray":181,"process-nextick-args":187,"safe-buffer":203,"string_decoder/":209,"util":149}],193:[function(require,module,exports){
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
},{"./_stream_duplex":190,"core-util-is":152,"inherits":178}],194:[function(require,module,exports){
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
},{"./_stream_duplex":190,"./internal/streams/destroy":196,"./internal/streams/stream":197,"_process":188,"core-util-is":152,"inherits":178,"process-nextick-args":187,"safe-buffer":203,"timers":216,"util-deprecate":217}],195:[function(require,module,exports){
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
},{"safe-buffer":203,"util":149}],196:[function(require,module,exports){
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
},{"process-nextick-args":187}],197:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":171}],198:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":199}],199:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":190,"./lib/_stream_passthrough.js":191,"./lib/_stream_readable.js":192,"./lib/_stream_transform.js":193,"./lib/_stream_writable.js":194}],200:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":199}],201:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":194}],202:[function(require,module,exports){
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
},{"_process":188,"through":215,"timers":216}],203:[function(require,module,exports){
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

},{"buffer":151}],204:[function(require,module,exports){
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

},{"events":171,"inherits":178,"readable-stream/duplex.js":189,"readable-stream/passthrough.js":198,"readable-stream/readable.js":199,"readable-stream/transform.js":200,"readable-stream/writable.js":201}],205:[function(require,module,exports){
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

},{"es-abstract/es5":159,"function-bind":173}],206:[function(require,module,exports){
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

},{"./implementation":205,"./polyfill":207,"./shim":208,"define-properties":156,"function-bind":173}],207:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":205}],208:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":207,"define-properties":156}],209:[function(require,module,exports){
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
},{"safe-buffer":203}],210:[function(require,module,exports){
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
},{"./lib/default_stream":211,"./lib/results":213,"./lib/test":214,"_process":188,"defined":157,"through":215,"timers":216}],211:[function(require,module,exports){
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
},{"_process":188,"fs":150,"through":215}],212:[function(require,module,exports){
(function (process,setImmediate){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":188,"timers":216}],213:[function(require,module,exports){
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
},{"_process":188,"events":171,"function-bind":173,"has":176,"inherits":178,"object-inspect":182,"resumer":202,"through":215,"timers":216}],214:[function(require,module,exports){
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
},{"./next_tick":212,"deep-equal":153,"defined":157,"events":171,"has":176,"inherits":178,"path":186,"string.prototype.trim":206}],215:[function(require,module,exports){
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
},{"_process":188,"stream":204}],216:[function(require,module,exports){
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
},{"process/browser.js":188,"timers":216}],217:[function(require,module,exports){
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
},{}]},{},[133,134,135]);
