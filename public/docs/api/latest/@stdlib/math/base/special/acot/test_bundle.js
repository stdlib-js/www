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

},{}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* One half times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/half-pi
* @type {number}
*
* @example
* var HALF_PI = require( '@stdlib/constants/float64/half-pi' );
* // returns 1.5707963267948966
*/


// MAIN //

/**
* One half times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.5707963267948966
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var HALF_PI = 1.5707963267948966;


// EXPORTS //

module.exports = HALF_PI;

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

},{"@stdlib/number/ctor":29}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":7}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isNegativeZero = require( './main.js' );


// EXPORTS //

module.exports = isNegativeZero;

},{"./main.js":9}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/ninf":4}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":11}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/constants/float64/pinf":5}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":13}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

'use strict';

/**
* Compute the inverse cotangent of a number.
*
* @module @stdlib/math/base/special/acot
*
* @example
* var acot = require( '@stdlib/math/base/special/acot' );
*
* var v = acot( 2.0 );
* // returns ~0.4636
*
* v = acot( 0.0 );
* // returns ~1.5708
*
* v = acot( 0.5 );
* // returns ~1.1071
*
* v = acot( 1.0 );
* // returns ~0.7854
*
* v = acot( NaN );
* // returns NaN
*
* v = acot( Infinity );
* // returns 0.0
*/

// MODULES //

var acot = require( './main.js' );


// EXPORTS //

module.exports = acot;

},{"./main.js":15}],15:[function(require,module,exports){
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

'use strict';

// MODULES //

var atan = require( '@stdlib/math/base/special/atan' );


// MAIN //

/**
* Computes the inverse cotangent of a number.
*
* @param {number} x - input value
* @returns {number} inverse cotangent (in radians)
*
* @example
* var v = acot( 2.0 );
* // returns ~0.4636
*
* @example
* var v = acot( 0.0 );
* // returns ~1.5708
*
* @example
* var v = acot( 0.5 );
* // returns ~1.1071
*
* @example
* var v = acot( 1.0 );
* // returns ~0.7854
*
* @example
* var v = acot( NaN );
* // returns NaN
*
* @example
* var v = acot( Infinity );
* // returns 0.0
*/
function acot( x ) {
	return atan( 1.0 / x );
}


// EXPORTS //

module.exports = acot;

},{"@stdlib/math/base/special/atan":26}],16:[function(require,module,exports){
module.exports={"expected":[-1.0e-300,-1.0019899700803994e-305,-5.00997495012525e-306,-3.3399888778370363e-306,-2.504993750040594e-306,-2.0039960040319678e-306,-1.6699972278046017e-306,-1.4314265367579942e-306,-1.2524984437706837e-306,-1.113332104956911e-306,-1.0019990060169862e-306,-9.109082702635492e-307,-8.349993111255683e-307,-7.707686443921621e-307,-7.157137806248462e-307,-6.679995604562892e-307,-6.262496140736753e-307,-5.894114231939694e-307,-5.566663623557219e-307,-5.2736814820900544e-307,-5.009997540091208e-307,-4.771426342490837e-307,-4.554543425703383e-307,-4.3565198847682755e-307,-4.174998298688193e-307,-4.007998433674212e-307,-3.853844707172141e-307,-3.711109770988138e-307,-3.578570183740229e-307,-3.455171254523576e-307,-3.3399989178403507e-307,-3.232257052089807e-307,-3.1312490508401315e-307,-3.0363627447771213e-307,-2.9470579844846677e-307,-2.8628563518908308e-307,-2.7833325864724224e-307,-2.708107401804421e-307,-2.6368414363381198e-307,-2.5692301348285587e-307,-2.504999397547645e-307,-2.443901866197636e-307,-2.385713740408288e-307,-2.330232038443599e-307,-2.277272231448455e-307,-2.2266661931289893e-307,-2.1782604168658787e-307,-2.131914460430147e-307,-2.0874995851094575e-307,-2.044897561471964e-307,-2.0039996184384724e-307,-1.964705515993148e-307,-1.9269227248891176e-307,-1.8905656992175756e-307,-1.8555552298025264e-307,-1.8218178681342688e-307,-1.7892854120242857e-307,-1.7578944454017103e-307,-1.7275859257170495e-307,-1.698304813304841e-307,-1.6699997378100412e-307,-1.6426226974249248e-307,-1.616128787232087e-307,-1.5904759534195363e-307,-1.5656247705381197e-307,-1.5415382393197954e-307,-1.5181816028760636e-307,-1.4955221793562331e-307,-1.473529209371135e-307,-1.4521737166843367e-307,-1.431428380844107e-307,-1.4112674205788777e-307,-1.3916664869097454e-307,-1.3726025650482488e-307,-1.3540538842483777e-307,-1.3359998348704205e-307,-1.3184208919924018e-307,-1.301298544973876e-307,-1.2846152324378878e-307,-1.2683542821910123e-307,-1.2524998556493917e-307,-1.2370368963813603e-307,-1.2219510824152443e-307,-1.207228781994789e-307,-1.1928570124949122e-307,-1.1788234022375222e-307,-1.165116154971349e-307,-1.1517240168014396e-307,-1.1386362453734627e-307,-1.1258425811354745e-307,-1.1133332205155669e-307,-1.1010987908680223e-307,-1.0891303270534134e-307,-1.077419249529667e-307,-1.0659573438415672e-307,-1.0547367414056605e-307,-1.043749901496103e-307,-1.0329895943447853e-307,-1.0224488852761436e-307,-1.0121211198034978e-307,-1.0019999096196082e-307,-9.920791194194766e-308,-9.823528544982776e-308,-9.72815449071739e-308,-9.634614552703473e-308,-9.54285632762456e-308,-9.452829389647628e-308,-9.36448519801736e-308,-9.277777009784014e-308,-9.192659797335304e-308,-9.109090170426505e-308,-9.027026302425186e-308,-8.946427860507071e-308,-8.867255939558361e-308,-8.789472999556839e-308,-8.71304280622009e-308,-8.637930374723595e-308,-8.564101916305111e-308,-8.491524787584075e-308,-8.420167442436314e-308,-8.349999386275046e-308,-8.280991132598909e-308,-8.213114161677011e-308,-8.146340881249299e-308,-8.080644589128552e-308,-8.01599943759748e-308,-7.952380399501172e-308,-7.889763235941509e-308,-7.828124465485877e-308,-7.76744133480804e-308,-7.707691790684059e-308,-7.648854453270821e-308,-7.590908590599206e-308,-7.533834094217909e-308,-7.477611455927855e-308,-7.422221745550648e-308,-7.367646589677798e-308,-7.31386815135066e-308,-7.260869110623848e-308,-7.208632645967628e-308,-7.157142416467375e-308,-7.106382544780469e-308,-7.056337600813356e-308,-7.006992586083451e-308,-6.958332918732664e-308,-6.910344419161023e-308,-6.863013296250727e-308,-6.816326134152459e-308,-6.770269879607399e-308,-6.724831829779761e-308,-6.679999620576022e-308,-6.635761215428291e-308,-6.59210489452045e-308,-6.549019244436774e-308,-6.506493148213884e-308,-6.464515775777751e-308,-6.42307657474854e-308,-6.382165261596838e-308,-6.341771813135733e-308,-6.301886458333944e-308,-6.262499670435955e-308,-6.223602159375813e-308,-6.185184864471896e-308,-6.147238947390584e-308,-6.109755785367356e-308,-6.072726964674395e-308,-6.0361442743243e-308,-5.999999700000015e-308,-5.964285418201545e-308,-5.928993790600483e-308,-5.894117358593786e-308,-5.859648838048644e-308,-5.825581114230679e-308,-5.791907236908029e-308,-5.75862041562427e-308,-5.7257140151334e-308,-5.693181550990457e-308,-5.661016685291595e-308,-5.62921322255777e-308,-5.597765105756387e-308,-5.566666412455566e-308,-5.535911351105899e-308,-5.505494257444764e-308,-5.475409591018554e-308,-5.4456519318183e-308,-5.416215977024408e-308,-5.38709653785641e-308,-5.358288536523788e-308,-5.329787003274116e-308,-5.301587073534906e-308,-5.273683985145715e-308,-5.246073075677211e-308,-5.218749779833993e-308,-5.191709626938182e-308,-5.164948238490815e-308,-5.138461325808293e-308,-5.112244687731162e-308,-5.086294208402698e-308,-5.060605855114792e-308,-5.035175676218791e-308,-5.009999799099008e-308,-4.985074428206736e-308,-4.96039584315264e-308,-4.935960396855549e-308,-4.911764513745683e-308,-4.887804688020471e-308,-4.864077481951181e-308,-4.840579524238613e-308,-4.817307508416242e-308,-4.794258191299198e-308,-4.771428391477557e-308,-4.748814987852481e-308,-4.726414918213783e-308,-4.704225177857575e-308,-4.682242818242647e-308,-4.660464945684377e-308,-4.638888720084883e-308,-4.617511353698321e-308,-4.596330109930147e-308,-4.575342302169268e-308,-4.554545292652072e-308,-4.533936491357268e-308,-4.513513354930611e-308,-4.493273385638567e-308,-4.473214130349973e-308,-4.453333179544894e-308,-4.433628166349759e-308,-4.414096765598018e-308,-4.3947366929155173e-308,-4.375545703829833e-308,-4.3565215929028406e-308,-4.33766219288582e-308,-4.318965373896408e-308,-4.300429042616741e-308,-4.2820511415121674e-308,-4.2638296480699e-308,-4.2457625740570283e-308,-4.2278479647973124e-308,-4.2100838984662143e-308,-4.1924684854036216e-308,-4.174999867443754e-308,-4.157676217261759e-308,-4.140495737736497e-308,-4.1234566613290697e-308,-4.106557249476623e-308,-4.089795792001003e-308,-4.0731706065318306e-308,-4.056680037943586e-308,-4.040322457806325e-308,-4.0240962638496192e-308,-4.0079998794393636e-308,-3.992031753067098e-308,-3.976190357851477e-308,-3.9604741910515745e-308,-3.9448817735916707e-308,-3.929411649597235e-308,-3.914062385941776e-308,-3.8988325718042696e-308,-3.8837208182368877e-308,-3.868725757742732e-308,-3.853846043863317e-308,-3.839080350775535e-308,-3.8244273728978524e-308,-3.8098858245054897e-308,-3.795454439354342e-308,-3.781131970313424e-308,-3.7669171890056e-308,-3.7528088854563846e-308,-3.738805867750615e-308,-3.724906961696773e-308,-3.7111110104987684e-308,-3.6974168744349913e-308,-3.6838234305444443e-308,-3.670329572319771e-308,-3.6569342094070034e-308,-3.64363626731187e-308,-3.6304346871124793e-308,-3.617328425178227e-308,-3.60431645289478e-308,-3.591397756394961e-308,-3.578571336295411e-308,-3.5658362074388647e-308,-3.5531913986419215e-308,-3.5406359524481537e-308,-3.5281689248864336e-308,-3.515789385234351e-308,-3.503496415786593e-308,-3.4912891116281635e-308,-3.4791665804123285e-308,-3.4671279421431755e-308,-3.4551723289626655e-308,-3.4432988849420786e-308,-3.431506765877746e-308,-3.4197951390909643e-308,-3.408163183231989e-308,-3.3966100880880227e-308,-3.3851350543950894e-308,-3.373737293653711e-308,-3.3624160279482924e-308,-3.351170489770138e-308,-3.339999921844002e-308,-3.328903576958093e-308,-3.3178807177974665e-308,-3.30693061678071e-308,-3.296052555899846e-308,-3.2852458265633984e-308,-3.2745097294425235e-308,-3.2638435743201535e-308,-3.2532466799430783e-308,-3.2427183738768986e-308,-3.2322579923637895e-308,-3.2218648801830023e-308,-3.2115383905140545e-308,-3.201277884802541e-308,-3.191082732628506e-308,-3.1809523115773256e-308,-3.170886007113044e-308,-3.160883212454101e-308,-3.150943328451408e-308,-3.141065763468717e-308,-3.131249933265236e-308,-3.121495260880428e-308,-3.1118011765209686e-308,-3.1021671174497994e-308,-3.0925925278772306e-308,-3.0830768588540605e-308,-3.0736195681666615e-308,-3.0642201202339883e-308,-3.054877986006471e-308,-3.0455926428667523e-308,-3.0363635745322323e-308,-3.0271902709593756e-308,-3.018072228249747e-308,-3.009008948557748e-308,-2.999999940000001e-308,-2.9910447165663635e-308,-2.9821427980325266e-308,-2.9732937098741745e-308,-2.964496983182663e-308,-2.955752154582192e-308,-2.947058766148444e-308,-2.9384163653286446e-308,-2.929824504863036e-308,-2.9212827427077163e-308,-2.9127906419588304e-308,-2.904347770778073e-308,-2.8959537023194904e-308,-2.8876080146575433e-308,-2.87931029071641e-308,-2.871060118200508e-308,-2.862857089526205e-308,-2.8547008017546946e-308,-2.846590856526021e-308,-2.838526859994223e-308,-2.8305084227635747e-308,-2.8225351598259085e-308,-2.814606690498991e-308,-2.806722638365935e-308,-2.798882631215631e-308,-2.7910863009841647e-308,-2.783333283697223e-308,-2.7756232194134495e-308,-2.767955752168738e-308,-2.760330529921454e-308,-2.752747204498552e-308,-2.7452054315425793e-308,-2.7377048704595547e-308,-2.730245184367692e-308,-2.7228260400469645e-308,-2.7154471078894847e-308,-2.7081080618506946e-308,-2.700808579401342e-308,-2.69354834148023e-308,-2.686327032447729e-308,-2.679144340040036e-308,-2.6719999553241606e-308,-2.6648935726536335e-308,-2.657824889624919e-308,-2.6507936070345184e-308,-2.6437994288367534e-308,-2.6368420621022165e-308,-2.6299212169768747e-308,-2.6230366066418144e-308,-2.6161879472736203e-308,-2.6093749580053715e-308,-2.602597360888245e-308,-2.595854880853715e-308,-2.589147245676342e-308,-2.5824741859371356e-308,-2.5758354349874777e-308,-2.56923072891361e-308,-2.562659806501659e-308,-2.556122409203197e-308,-2.549618281101335e-308,-2.5431471688773226e-308,-2.5367088217776644e-308,-2.5303029915817267e-308,-2.523929432569841e-308,-2.517587901491882e-308,-2.511278157536323e-308,-2.5049999622997503e-308,-2.4987530797568427e-308,-2.492537276230787e-308,-2.486352320364143e-308,-2.4801979830901384e-308,-2.47407403760439e-308,-2.4679802593370384e-308,-2.4619164259253005e-308,-2.4558823171864193e-308,-2.449877715091015e-308,-2.4439024037368237e-308,-2.4379561693228197e-308,-2.4320388001237163e-308,-2.426150086464833e-308,-2.420289820697333e-308,-2.414457797173814e-308,-2.408653812224252e-308,-2.4028776641322914e-308,-2.3971291531118794e-308,-2.3914080812842266e-308,-2.3857142526551025e-308,-2.3800474730924563e-308,-2.3744075503043513e-308,-2.368794293817213e-308,-2.363207514954388e-308,-2.357647026815004e-308,-2.352112644253125e-308,-2.3466041838572035e-308,-2.3411214639298196e-308,-2.3356643044677006e-308,-2.330232527142023e-308,-2.324825955278988e-308,-2.319444413840664e-308,-2.314087729406099e-308,-2.30875573015269e-308,-2.303448245837813e-308,-2.2981651077807007e-308,-2.2929061488445773e-308,-2.2876712034190284e-308,-2.2824601074026186e-308,-2.277272698185744e-308,-2.2721088146337177e-308,-2.266968297070085e-308,-2.261850987260165e-308,-2.256756728394814e-308,-2.25168536507441e-308,-2.2466367432930486e-308,-2.2416107104229543e-308,-2.2366071151990995e-308,-2.23162580770403e-308,-2.226666639352889e-308,-2.221729462878649e-308,-2.216814132317527e-308,-2.2119205029946057e-308,-2.207048431509636e-308,-2.202197775723029e-308,-2.197368394742036e-308,-2.1925601489071057e-308,-2.1877728997784183e-308,-2.183006510122603e-308,-2.178260843899622e-308,-2.1735357662498296e-308,-2.168831143481194e-308,-2.164146843056692e-308,-2.15948273358186e-308,-2.154838684792508e-308,-2.1502145675425966e-308,-2.1456102537922593e-308,-2.1410256165959896e-308,-2.136460530090971e-308,-2.131914869485559e-308,-2.127388511047913e-308,-2.122881332094765e-308,-2.118393210980338e-308,-2.113924027085403e-308,-2.109473660806471e-308,-2.105041993545124e-308,-2.10062890769748e-308,-2.0962342866437917e-308,-2.0918580147381686e-308,-2.087499977298438e-308,-2.083160060596125e-308,-2.078838151846559e-308,-2.074534139199105e-308,-2.070247911727512e-308,-2.065979359420385e-308,-2.061728373171773e-308,-2.0574948447718716e-308,-2.0532786668978436e-308,-2.0490797331047463e-308,-2.0448979378165763e-308,-2.040733176317421e-308,-2.036585344742713e-308,-2.0324543400706034e-308,-2.028340060113426e-308,-2.0242424035092747e-308,-2.020161269713677e-308,-2.0160965589913726e-308,-2.012048172408187e-308,-2.008016011823005e-308,-2.00399997987984e-308,-1.99999998e-308,-1.9960159163743435e-308,-1.99204769395563e-308,-1.9880952184509637e-308,-1.9841583963143224e-308,-1.9802371347391775e-308,-1.976331341651203e-308,-1.9724409257010665e-308,-1.9685657962573096e-308,-1.964705863399308e-308,-1.9608610379103175e-308,-1.9570312312705997e-308,-1.953216355650628e-308,-1.949416323904374e-308,-1.945631049562673e-308,-1.9418604468266634e-308,-1.9381044305613027e-308,-1.9343629162889646e-308,-1.9306358201831005e-308,-1.9269230590619823e-308,-1.923224550382514e-308,-1.919540212234113e-308,-1.915869963332663e-308,-1.912213723014539e-308,-1.9085714112306944e-308,-1.9049429485408204e-308,-1.901328256107573e-308,-1.8977272556908577e-308,-1.8941398696421897e-308,-1.89056602089911e-308,-1.887005632979667e-308,-1.8834586299769636e-308,-1.879924936553756e-308,-1.8764044779371294e-308,-1.872897179913215e-308,-1.8694029688219815e-308,-1.8659217715520737e-308,-1.8624535155357167e-308,-1.8589981287436713e-308,-1.855555539680247e-308,-1.8521256773783744e-308,-1.8487084713947253e-308,-1.84530385180489e-308,-1.8419117491986103e-308,-1.838532094675061e-308,-1.835164819838184e-308,-1.831809856792075e-308,-1.828467138136422e-308,-1.8251365969619876e-308,-1.821818166846149e-308,-1.818511781848479e-308,-1.81521737650638e-308,-1.811934885830764e-308,-1.8086642453017767e-308,-1.805405390864573e-308,-1.8021582589251333e-308,-1.7989227863461284e-308,-1.7956989104428257e-308,-1.792486568979042e-308,-1.789285700163138e-308,-1.786096242644056e-308,-1.7829181355074023e-308,-1.779751318271566e-308,-1.7765957308838843e-308,-1.773451313716845e-308,-1.7703180075643347e-308,-1.767195753637916e-308,-1.764084493563157e-308,-1.7609841693759904e-308,-1.7578947235191136e-308,-1.7548160988384283e-308,-1.751748238579515e-308,-1.7486910863841454e-308,-1.7456445862868314e-308,-1.74260868271141e-308,-1.739583320467665e-308,-1.7365684447479795e-308,-1.733564001124029e-308,-1.730569935543505e-308,-1.727586194326873e-308,-1.724612724164166e-308,-1.721649472111808e-308,-1.718696385589472e-308,-1.71575341237697e-308,-1.712820500611177e-308,-1.7098975987829795e-308,-1.7069846557342654e-308,-1.7040816206549357e-308,-1.701188443079952e-308,-1.698305072886412e-308,-1.695431460290654e-308,-1.6925675558453933e-308,-1.6897133104368846e-308,-1.6868686752821143e-308,-1.6840336019260225e-308,-1.681208042238751e-308,-1.678391948412919e-308,-1.6755852729609287e-308,-1.6727879687122944e-308,-1.6699999888110004e-308,-1.667221286712883e-308,-1.6644518161830446e-308,-1.661691531293285e-308,-1.6589403864195647e-308,-1.6561983362394917e-308,-1.653465335729831e-308,-1.6507413401640394e-308,-1.6480263051098296e-308,-1.6453201864267516e-308,-1.6426229402638e-308,-1.639934523057047e-308,-1.6372548915272973e-308,-1.634584002677762e-308,-1.6319218137917645e-308,-1.629268282430458e-308,-1.626623366430574e-308,-1.6239870239021877e-308,-1.621359213226506e-308,-1.6187398930536773e-308,-1.6161290223006247e-308,-1.613526560148895e-308,-1.610932466042535e-308,-1.6083466996859807e-308,-1.6057692210419746e-308,-1.6031999903294976e-308,-1.6006389680217213e-308,-1.598086114843983e-308,-1.595541391771776e-308,-1.5930047600287637e-308,-1.5904761810848073e-308,-1.587955616654017e-308,-1.5854430286928176e-308,-1.582938379398037e-308,-1.5804416312050074e-308,-1.5779527467856905e-308,-1.5754716890468137e-308,-1.572998421128031e-308,-1.570532906400094e-308,-1.5680751084630474e-308,-1.5656249911444336e-308,-1.5631825184975214e-308,-1.560747654799546e-308,-1.5583203645499687e-308,-1.555900612468751e-308,-1.5534883634946456e-308,-1.551083582783502e-308,-1.54868623570659e-308,-1.546296287848937e-308,-1.5439137050076805e-308,-1.541538453190438e-308,-1.539170498613689e-308,-1.5368098077011743e-308,-1.5344563470823083e-308,-1.532110083590607e-308,-1.5297709842621294e-308,-1.5274390163339346e-308,-1.5251141472425513e-308,-1.522796344622463e-308,-1.5204855763046044e-308,-1.518181810314876e-308,-1.5158850148726657e-308,-1.51359515838939e-308,-1.5113122094670463e-308,-1.509036136896774e-308,-1.5067669096574366e-308,-1.5045044969142117e-308,-1.502248868017191e-308,-1.4999999925e-308,-1.497757840078425e-308,-1.4955223806490533e-308,-1.493293584287926e-308,-1.491071421249203e-308,-1.48885586196384e-308,-1.4866468770382765e-308,-1.484444437253136e-308,-1.4822485135619374e-308,-1.48005907708982e-308,-1.4778760991322734e-308,-1.475699551153889e-308,-1.4735294047871106e-308,-1.471365631831008e-308,-1.4692082042500496e-308,-1.467057094172896e-308,-1.4649122738911973e-308,-1.462773715858405e-308,-1.4606413926885907e-308,-1.4585152771552793e-308,-1.456395342190289e-308,-1.454281560882582e-308,-1.4521739064771267e-308,-1.4500723523737696e-308,-1.4479768721261153e-308,-1.4458874394404154e-308,-1.443804028174472e-308,-1.441726612336546e-308,-1.4396551660842747e-308,-1.4375896637236036e-308,-1.43553007970772e-308,-1.4334763886360034e-308,-1.4314285652529797e-308,-1.4293865844472844e-308,-1.427350421250639e-308,-1.4253200508368324e-308,-1.4232954485207094e-308,-1.4212765897571753e-308,-1.4192634501401986e-308,-1.417256005401831e-308,-1.4152542314112326e-308,-1.4132581041737005e-308,-1.411267599829716e-308,-1.4092826946539907e-308,-1.4073033650545226e-308,-1.4053295875716655e-308,-1.403361338877198e-308,-1.401398595773407e-308,-1.3994413351921755e-308,-1.3974895341940795e-308,-1.3955431699674893e-308,-1.393602219827685e-308,-1.391666661215972e-308,-1.3897364716988077e-308,-1.3878116289669357e-308,-1.3858921108345243e-308,-1.383977895238317e-308,-1.3820689602367847e-308,-1.380165284009289e-308,-1.378266844855249e-308,-1.3763736211933193e-308,-1.374485591560568e-308,-1.372602734611672e-308,-1.3707250291181054e-308,-1.3688524539673474e-308,-1.366984988162088e-308,-1.3651226108194434e-308,-1.363265301170179e-308,-1.3614130385579365e-308,-1.3595658024384674e-308,-1.357723572378875e-308,-1.3558863280568593e-308,-1.3540540492599705e-308,-1.3522267158848695e-308,-1.3504043079365886e-308,-1.3485868055278063e-308,-1.346774188878122e-308,-1.344966438313337e-308,-1.343163534264747e-308,-1.341365457268431e-308,-1.339572187964554e-308,-1.337783707096672e-308,-1.33599999551104e-308,-1.3342210341559326e-308,-1.332446804080961e-308,-1.3306772864364056e-308,-1.3289124624725427e-308,-1.327152313538985e-308,-1.325396821084026e-308,-1.323645966653986e-308,-1.3218997318925653e-308,-1.3201580985402055e-308,-1.3184210484334486e-308,-1.316688563504311e-308,-1.3149606257796515e-308,-1.3132372173805543e-308,-1.31151832052171e-308,-1.3098039175108033e-308,-1.308093990747909e-308,-1.306388522724885e-308,-1.3046874960247803e-308,-1.302990893321237e-308,-1.301298697377905e-308,-1.2996108910478584e-308,-1.297927457273014e-308,-1.296248379083559e-308,-1.2945736395973798e-308,-1.292903222019496e-308,-1.2912371096415e-308,-1.289575285840998e-308,-1.2879177340810594e-308,-1.286264437909667e-308,-1.2846153809591717e-308,-1.2829705469457557e-308,-1.281329919668893e-308,-1.279693483010819e-308,-1.278061220936003e-308,-1.276433117490624e-308,-1.274809156802051e-308,-1.2731893230783266e-308,-1.2715736006076554e-308,-1.2699619737578974e-308,-1.2683544269760615e-308,-1.266750944787807e-308,-1.265151511796947e-308,-1.263556112684953e-308,-1.26196473221047e-308,-1.260377355208829e-308,-1.2587939665915633e-308,-1.257214551345935e-308,-1.2556390945344565e-308,-1.2540675812944217e-308,-1.2524999968374376e-308,-1.2509363264489614e-308,-1.249376555487839e-308,-1.247820669385849e-308,-1.2462686536472487e-308,-1.244720493848324e-308,-1.2431761756369415e-308,-1.241635684732107e-308,-1.2400990069235247e-308,-1.238566128071159e-308,-1.237037034104801e-308,-1.235511711023641e-308,-1.233990144895836e-308,-1.23247232185809e-308,-1.2309582281152313e-308,-1.2294478499397945e-308,-1.2279411736716045e-308,-1.2264381857173676e-308,-1.22493887255026e-308,-1.2234432207095225e-308,-1.2219512168000596e-308,-1.2204628474920366e-308,-1.218978099520486e-308,-1.2174969596849095e-308,-1.21601941484889e-308,-1.2145454519397024e-308,-1.2130750579479274e-308,-1.2116082199270683e-308,-1.2101449249931734e-308,-1.2086851603244565e-308,-1.2072289131609233e-308,-1.2057761708039983e-308,-1.204326920616159e-308,-1.202881150020565e-308,-1.2014388465006987e-308,-1.1999999976e-308,-1.1985645909215105e-308,-1.1971326141275163e-308,-1.195704054939195e-308,-1.194278901136264e-308,-1.1928571405566327e-308,-1.1914387610960567e-308,-1.190023750707793e-308,-1.188612097402262e-308,-1.187203789246704e-308,-1.185798814364847e-308,-1.1843971609365726e-308,-1.182998817197582e-308,-1.1816037714390685e-308,-1.1802120120073916e-308,-1.178823527303751e-308,-1.177438305783864e-308,-1.176056335957647e-308,-1.174677606388898e-308,-1.17330210569498e-308,-1.1719298225465065e-308,-1.1705607456670344e-308,-1.169194863832751e-308,-1.16783216587217e-308,-1.1664726406658254e-308,-1.165116277145971e-308,-1.1637630642962766e-308,-1.1624129911515335e-308,-1.161066046797356e-308,-1.159722220369888e-308,-1.1583815010555113e-308,-1.157043878090555e-308,-1.155709340761006e-308,-1.1543778784022277e-308,-1.15304948039867e-308,-1.151724136183591e-308,-1.1504018352387757e-308,-1.1490825670942577e-308,-1.147766321328043e-308,-1.1464530875658355e-308,-1.145142855480764e-308,-1.143835614793113e-308,-1.142531355270052e-308,-1.14123006672537e-308,-1.1399317390192083e-308,-1.1386363620577996e-308,-1.137343925793205e-308,-1.136054420223055e-308,-1.1347678353902903e-308,-1.1334841613829056e-308,-1.1322033883336974e-308,-1.130925506420007e-308,-1.129650505863475e-308,-1.1283783769297847e-308,-1.1271091099284216e-308,-1.125842695212423e-308,-1.124579123178134e-308,-1.1233183842649663e-308,-1.122060468955156e-308,-1.120805367773524e-308,-1.1195530712872384e-308,-1.1183035701055785e-308,-1.117056854879699e-308,-1.1158129163023993e-308,-1.1145717451078875e-308,-1.113333332071556e-308,-1.1120976680097463e-308,-1.1108647437795293e-308,-1.1096345502784735e-308,-1.108407078444426e-308,-1.1071823192552853e-308,-1.105960263728784e-308,-1.104740902922267e-308,-1.103524227932475e-308,-1.102310229895326e-308,-1.1010988999857023e-308,-1.0998902294172336e-308,-1.098684209442088e-308,-1.097480831350758e-308,-1.096280086471853e-308,-1.0950819661718893e-308,-1.093886461855085e-308,-1.092693564963152e-308,-1.091503266975095e-308,-1.0903155594070055e-308,-1.089130433811862e-308,-1.087947881779329e-308,-1.0867678949355593e-308,-1.085590464942994e-308,-1.0844155835001687e-308,-1.0832432423415166e-308,-1.082073433237175e-308,-1.080906147992794e-308,-1.079741378449344e-308,-1.0785791164829246e-308,-1.0774193540045787e-308,-1.076262082960101e-308,-1.075107295329855e-308,-1.073954983128586e-308,-1.0728051384052385e-308,-1.0716577532427695e-308,-1.0705128197579715e-308,-1.0693703301012906e-308,-1.0682302764566444e-308,-1.0670926510412475e-308,-1.065957446105432e-308,-1.0648246539324727e-308,-1.0636942668384114e-308,-1.062566277171883e-308,-1.0614406773139453e-308,-1.060317459677904e-308,-1.0591966167091437e-308,-1.0580781408849597e-308,-1.0569620247143887e-308,-1.0558482607380404e-308,-1.0547368415279333e-308,-1.053627759687329e-308,-1.052521007850567e-308,-1.0514165786829024e-308,-1.050314464880345e-308,-1.0492146591694965e-308,-1.0481171543073914e-308,-1.047021943081338e-308,-1.045929018308759e-308,-1.044838372837038e-308,-1.0437499995433595e-308,-1.0426638913345555e-308,-1.041580041146952e-308,-1.040498441946216e-308,-1.0394190867272e-308,-1.0383419685137966e-308,-1.0372670803587824e-308,-1.0361944153436733e-308,-1.035123966578572e-308,-1.0340557272020243e-308,-1.0329896903808694e-308,-1.0319258493100955e-308,-1.0308641972126965e-308,-1.0298047273395236e-308,-1.028747432969149e-308,-1.027692307407716e-308,-1.026639343988805e-308,-1.0255885360732884e-308,-1.024539877049193e-308,-1.0234933603315593e-308,-1.022448979362307e-308,-1.0214067276100966e-308,-1.0203665985701904e-308,-1.019328585764321e-308,-1.0182926827405565e-308,-1.0172588830731634e-308,-1.0162271803624785e-308,-1.015197568234772e-308,-1.0141700403421215e-308,-1.0131445903622763e-308,-1.0121212119985305e-308,-1.011099898979595e-308,-1.010080645059468e-308,-1.0090634440173054e-308,-1.0080482896572997e-308,-1.0070351758085504e-308,-1.006024096324938e-308,-1.005015045085004e-308,-1.0040080159918234e-308,-1.0030030029728826e-308,-1.00199999997996e-308,-1.0009990009890007e-308,-1.0e-308],"x":[-1.0e300,-9.980139820359282e304,-1.996017964071856e305,-2.9940219461077846e305,-3.992025928143712e305,-4.990029910179641e305,-5.988033892215569e305,-6.986037874251497e305,-7.984041856287425e305,-8.982045838323353e305,-9.98004982035928e305,-1.097805380239521e306,-1.1976057784431138e306,-1.2974061766467066e306,-1.3972065748502995e306,-1.4970069730538922e306,-1.596807371257485e306,-1.696607769461078e306,-1.7964081676646707e306,-1.8962085658682634e306,-1.9960089640718562e306,-2.0958093622754492e306,-2.195609760479042e306,-2.2954101586826347e306,-2.3952105568862277e306,-2.4950109550898204e306,-2.5948113532934132e306,-2.694611751497006e306,-2.794412149700599e306,-2.8942125479041914e306,-2.9940129461077844e306,-3.0938133443113774e306,-3.19361374251497e306,-3.293414140718563e306,-3.393214538922156e306,-3.4930149371257484e306,-3.5928153353293414e306,-3.6926157335329344e306,-3.792416131736527e306,-3.89221652994012e306,-3.9920169281437123e306,-4.0918173263473054e306,-4.1916177245508984e306,-4.291418122754491e306,-4.391218520958084e306,-4.491018919161677e306,-4.5908193173652693e306,-4.6906197155688624e306,-4.7904201137724554e306,-4.890220511976048e306,-4.990020910179641e306,-5.089821308383233e306,-5.1896217065868263e306,-5.2894221047904194e306,-5.389222502994012e306,-5.489022901197605e306,-5.588823299401198e306,-5.688623697604791e306,-5.788424095808383e306,-5.888224494011976e306,-5.988024892215569e306,-6.087825290419162e306,-6.187625688622755e306,-6.287426086826348e306,-6.38722648502994e306,-6.487026883233533e306,-6.586827281437126e306,-6.686627679640719e306,-6.786428077844312e306,-6.886228476047904e306,-6.986028874251497e306,-7.08582927245509e306,-7.185629670658683e306,-7.285430068862276e306,-7.385230467065869e306,-7.485030865269461e306,-7.584831263473054e306,-7.684631661676647e306,-7.78443205988024e306,-7.884232458083833e306,-7.984032856287425e306,-8.083833254491018e306,-8.183633652694611e306,-8.283434050898204e306,-8.383234449101797e306,-8.48303484730539e306,-8.582835245508982e306,-8.682635643712575e306,-8.782436041916168e306,-8.882236440119761e306,-8.982036838323354e306,-9.081837236526946e306,-9.181637634730539e306,-9.281438032934132e306,-9.381238431137725e306,-9.481038829341318e306,-9.580839227544911e306,-9.680639625748503e306,-9.780440023952096e306,-9.880240422155689e306,-9.980040820359282e306,-1.0079841218562875e307,-1.0179641616766467e307,-1.027944201497006e307,-1.0379242413173653e307,-1.0479042811377246e307,-1.0578843209580839e307,-1.0678643607784432e307,-1.0778444005988024e307,-1.0878244404191617e307,-1.097804480239521e307,-1.1077845200598803e307,-1.1177645598802396e307,-1.1277445997005988e307,-1.1377246395209582e307,-1.1477046793413174e307,-1.1576847191616765e307,-1.167664758982036e307,-1.1776447988023952e307,-1.1876248386227546e307,-1.1976048784431138e307,-1.2075849182634732e307,-1.2175649580838324e307,-1.2275449979041915e307,-1.237525037724551e307,-1.2475050775449102e307,-1.2574851173652696e307,-1.2674651571856288e307,-1.277445197005988e307,-1.2874252368263474e307,-1.2974052766467066e307,-1.307385316467066e307,-1.3173653562874252e307,-1.3273453961077843e307,-1.3373254359281438e307,-1.347305475748503e307,-1.3572855155688624e307,-1.3672655553892216e307,-1.3772455952095807e307,-1.3872256350299402e307,-1.3972056748502993e307,-1.4071857146706588e307,-1.417165754491018e307,-1.4271457943113774e307,-1.4371258341317366e307,-1.4471058739520957e307,-1.4570859137724552e307,-1.4670659535928143e307,-1.4770459934131738e307,-1.487026033233533e307,-1.4970060730538921e307,-1.5069861128742516e307,-1.5169661526946107e307,-1.5269461925149702e307,-1.5369262323353294e307,-1.5469062721556885e307,-1.556886311976048e307,-1.5668663517964071e307,-1.5768463916167666e307,-1.5868264314371258e307,-1.596806471257485e307,-1.6067865110778444e307,-1.6167665508982035e307,-1.626746590718563e307,-1.6367266305389221e307,-1.6467066703592816e307,-1.6566867101796408e307,-1.66666675e307,-1.6766467898203594e307,-1.6866268296407185e307,-1.696606869461078e307,-1.7065869092814372e307,-1.7165669491017963e307,-1.7265469889221558e307,-1.736527028742515e307,-1.7465070685628744e307,-1.7564871083832335e307,-1.7664671482035927e307,-1.7764471880239522e307,-1.7864272278443113e307,-1.7964072676646708e307,-1.80638730748503e307,-1.816367347305389e307,-1.8263473871257486e307,-1.8363274269461077e307,-1.8463074667664672e307,-1.8562875065868263e307,-1.8662675464071858e307,-1.876247586227545e307,-1.8862276260479041e307,-1.8962076658682636e307,-1.9061877056886227e307,-1.9161677455089822e307,-1.9261477853293413e307,-1.9361278251497005e307,-1.94610786497006e307,-1.9560879047904191e307,-1.9660679446107786e307,-1.9760479844311377e307,-1.986028024251497e307,-1.9960080640718563e307,-2.0059881038922155e307,-2.015968143712575e307,-2.0259481835329341e307,-2.0359282233532933e307,-2.0459082631736527e307,-2.055888302994012e307,-2.0658683428143714e307,-2.0758483826347305e307,-2.08582842245509e307,-2.0958084622754491e307,-2.1057885020958083e307,-2.1157685419161678e307,-2.125748581736527e307,-2.1357286215568864e307,-2.1457086613772455e307,-2.1556887011976047e307,-2.1656687410179641e307,-2.1756487808383233e307,-2.1856288206586828e307,-2.195608860479042e307,-2.205588900299401e307,-2.2155689401197605e307,-2.2255489799401197e307,-2.2355290197604792e307,-2.2455090595808383e307,-2.2554890994011975e307,-2.265469139221557e307,-2.2754491790419164e307,-2.2854292188622753e307,-2.2954092586826347e307,-2.305389298502994e307,-2.315369338323353e307,-2.3253493781437125e307,-2.335329417964072e307,-2.3453094577844314e307,-2.3552894976047903e307,-2.3652695374251497e307,-2.375249577245509e307,-2.385229617065868e307,-2.3952096568862275e307,-2.405189696706587e307,-2.4151697365269464e307,-2.4251497763473053e307,-2.4351298161676647e307,-2.445109855988024e307,-2.455089895808383e307,-2.4650699356287425e307,-2.475049975449102e307,-2.485030015269461e307,-2.4950100550898203e307,-2.5049900949101797e307,-2.514970134730539e307,-2.524950174550898e307,-2.5349302143712575e307,-2.544910254191617e307,-2.554890294011976e307,-2.5648703338323353e307,-2.5748503736526947e307,-2.5848304134730537e307,-2.594810453293413e307,-2.6047904931137725e307,-2.614770532934132e307,-2.624750572754491e307,-2.6347306125748503e307,-2.64471065239521e307,-2.6546906922155687e307,-2.664670732035928e307,-2.6746507718562875e307,-2.684630811676647e307,-2.694610851497006e307,-2.7045908913173653e307,-2.714570931137725e307,-2.7245509709580837e307,-2.734531010778443e307,-2.7445110505988025e307,-2.7544910904191615e307,-2.764471130239521e307,-2.7744511700598803e307,-2.78443120988024e307,-2.7944112497005987e307,-2.804391289520958e307,-2.8143713293413175e307,-2.8243513691616765e307,-2.834331408982036e307,-2.8443114488023953e307,-2.854291488622755e307,-2.8642715284431137e307,-2.874251568263473e307,-2.8842316080838326e307,-2.8942116479041915e307,-2.904191687724551e307,-2.9141717275449103e307,-2.9241517673652693e307,-2.9341318071856287e307,-2.944111847005988e307,-2.9540918868263476e307,-2.9640719266467065e307,-2.974051966467066e307,-2.9840320062874253e307,-2.9940120461077843e307,-3.0039920859281437e307,-3.013972125748503e307,-3.023952165568862e307,-3.0339322053892215e307,-3.043912245209581e307,-3.0538922850299404e307,-3.0638723248502993e307,-3.0738523646706587e307,-3.083832404491018e307,-3.093812444311377e307,-3.1037924841317365e307,-3.113772523952096e307,-3.1237525637724554e307,-3.1337326035928143e307,-3.1437126434131737e307,-3.153692683233533e307,-3.163672723053892e307,-3.1736527628742515e307,-3.183632802694611e307,-3.19361284251497e307,-3.2035928823353293e307,-3.2135729221556887e307,-3.223552961976048e307,-3.233533001796407e307,-3.2435130416167665e307,-3.253493081437126e307,-3.263473121257485e307,-3.2734531610778443e307,-3.2834332008982037e307,-3.293413240718563e307,-3.303393280538922e307,-3.3133733203592815e307,-3.323353360179641e307,-3.3333334e307,-3.3433134398203593e307,-3.3532934796407187e307,-3.3632735194610777e307,-3.373253559281437e307,-3.3832335991017965e307,-3.393213638922156e307,-3.403193678742515e307,-3.4131737185628743e307,-3.4231537583832337e307,-3.4331337982035927e307,-3.443113838023952e307,-3.4530938778443115e307,-3.4630739176646705e307,-3.47305395748503e307,-3.4830339973053893e307,-3.4930140371257487e307,-3.5029940769461077e307,-3.512974116766467e307,-3.5229541565868265e307,-3.5329341964071855e307,-3.542914236227545e307,-3.5528942760479043e307,-3.5628743158682637e307,-3.5728543556886227e307,-3.582834395508982e307,-3.5928144353293415e307,-3.6027944751497005e307,-3.61277451497006e307,-3.6227545547904193e307,-3.632734594610778e307,-3.6427146344311377e307,-3.652694674251497e307,-3.6626747140718565e307,-3.6726547538922155e307,-3.682634793712575e307,-3.6926148335329343e307,-3.7025948733532933e307,-3.7125749131736527e307,-3.722554952994012e307,-3.7325349928143715e307,-3.7425150326347305e307,-3.75249507245509e307,-3.7624751122754493e307,-3.7724551520958083e307,-3.7824351919161677e307,-3.792415231736527e307,-3.802395271556886e307,-3.8123753113772455e307,-3.822355351197605e307,-3.8323353910179643e307,-3.8423154308383233e307,-3.8522954706586827e307,-3.862275510479042e307,-3.872255550299401e307,-3.8822355901197605e307,-3.89221562994012e307,-3.902195669760479e307,-3.9121757095808383e307,-3.9221557494011977e307,-3.932135789221557e307,-3.942115829041916e307,-3.9520958688622755e307,-3.962075908682635e307,-3.972055948502994e307,-3.9820359883233533e307,-3.9920160281437127e307,-4.001996067964072e307,-4.011976107784431e307,-4.0219561476047905e307,-4.03193618742515e307,-4.041916227245509e307,-4.0518962670658683e307,-4.0618763068862277e307,-4.0718563467065866e307,-4.081836386526946e307,-4.0918164263473055e307,-4.101796466167665e307,-4.111776505988024e307,-4.1217565458083833e307,-4.1317365856287427e307,-4.1417166254491016e307,-4.151696665269461e307,-4.1616767050898205e307,-4.17165674491018e307,-4.181636784730539e307,-4.1916168245508983e307,-4.2015968643712577e307,-4.2115769041916166e307,-4.221556944011976e307,-4.2315369838323355e307,-4.2415170236526944e307,-4.251497063473054e307,-4.2614771032934133e307,-4.2714571431137727e307,-4.2814371829341316e307,-4.291417222754491e307,-4.3013972625748505e307,-4.3113773023952094e307,-4.321357342215569e307,-4.3313373820359283e307,-4.341317421856287e307,-4.3512974616766467e307,-4.361277501497006e307,-4.3712575413173655e307,-4.3812375811377244e307,-4.391217620958084e307,-4.4011976607784433e307,-4.411177700598802e307,-4.4211577404191617e307,-4.431137780239521e307,-4.4411178200598805e307,-4.4510978598802394e307,-4.461077899700599e307,-4.4710579395209583e307,-4.481037979341317e307,-4.4910180191616767e307,-4.500998058982036e307,-4.510978098802395e307,-4.520958138622754e307,-4.530938178443114e307,-4.540918218263473e307,-4.550898258083833e307,-4.560878297904191e307,-4.570858337724551e307,-4.58083837754491e307,-4.590818417365269e307,-4.600798457185629e307,-4.610778497005988e307,-4.620758536826348e307,-4.630738576646706e307,-4.640718616467066e307,-4.650698656287425e307,-4.660678696107784e307,-4.670658735928144e307,-4.680638775748503e307,-4.690618815568863e307,-4.700598855389221e307,-4.710578895209581e307,-4.72055893502994e307,-4.730538974850299e307,-4.740519014670659e307,-4.750499054491018e307,-4.760479094311378e307,-4.770459134131736e307,-4.780439173952096e307,-4.790419213772455e307,-4.800399253592814e307,-4.810379293413174e307,-4.820359333233533e307,-4.830339373053893e307,-4.840319412874251e307,-4.850299452694611e307,-4.86027949251497e307,-4.870259532335329e307,-4.880239572155689e307,-4.890219611976048e307,-4.900199651796407e307,-4.910179691616766e307,-4.920159731437126e307,-4.930139771257485e307,-4.940119811077844e307,-4.950099850898204e307,-4.960079890718563e307,-4.970059930538922e307,-4.980039970359281e307,-4.990020010179641e307,-5.00000005e307,-5.009980089820359e307,-5.019960129640719e307,-5.029940169461078e307,-5.039920209281437e307,-5.049900249101796e307,-5.059880288922156e307,-5.069860328742515e307,-5.079840368562874e307,-5.089820408383234e307,-5.099800448203593e307,-5.109780488023952e307,-5.119760527844311e307,-5.129740567664671e307,-5.13972060748503e307,-5.149700647305389e307,-5.159680687125749e307,-5.169660726946107e307,-5.179640766766467e307,-5.189620806586826e307,-5.199600846407186e307,-5.209580886227545e307,-5.219560926047904e307,-5.229540965868264e307,-5.239521005688622e307,-5.249501045508982e307,-5.259481085329341e307,-5.269461125149701e307,-5.27944116497006e307,-5.28942120479042e307,-5.299401244610779e307,-5.309381284431137e307,-5.319361324251497e307,-5.329341364071856e307,-5.339321403892216e307,-5.349301443712575e307,-5.359281483532935e307,-5.369261523353294e307,-5.379241563173652e307,-5.389221602994012e307,-5.399201642814371e307,-5.409181682634731e307,-5.41916172245509e307,-5.42914176227545e307,-5.439121802095809e307,-5.449101841916167e307,-5.459081881736527e307,-5.469061921556886e307,-5.479041961377246e307,-5.489022001197605e307,-5.499002041017965e307,-5.508982080838323e307,-5.518962120658682e307,-5.528942160479042e307,-5.538922200299401e307,-5.548902240119761e307,-5.55888227994012e307,-5.56886231976048e307,-5.578842359580838e307,-5.588822399401197e307,-5.598802439221557e307,-5.608782479041916e307,-5.618762518862276e307,-5.628742558682635e307,-5.638722598502995e307,-5.648702638323353e307,-5.658682678143712e307,-5.668662717964072e307,-5.678642757784431e307,-5.688622797604791e307,-5.69860283742515e307,-5.70858287724551e307,-5.718562917065868e307,-5.728542956886227e307,-5.738522996706587e307,-5.748503036526946e307,-5.758483076347306e307,-5.768463116167665e307,-5.778443155988024e307,-5.788423195808383e307,-5.798403235628742e307,-5.808383275449102e307,-5.818363315269461e307,-5.828343355089821e307,-5.83832339491018e307,-5.848303434730539e307,-5.858283474550898e307,-5.868263514371257e307,-5.878243554191617e307,-5.888223594011976e307,-5.898203633832336e307,-5.908183673652695e307,-5.918163713473054e307,-5.928143753293413e307,-5.938123793113772e307,-5.948103832934132e307,-5.958083872754491e307,-5.968063912574851e307,-5.97804395239521e307,-5.988023992215569e307,-5.998004032035928e307,-6.007984071856287e307,-6.017964111676647e307,-6.027944151497006e307,-6.037924191317366e307,-6.047904231137724e307,-6.057884270958084e307,-6.067864310778443e307,-6.077844350598802e307,-6.087824390419162e307,-6.097804430239521e307,-6.107784470059881e307,-6.117764509880239e307,-6.127744549700599e307,-6.137724589520958e307,-6.147704629341317e307,-6.157684669161677e307,-6.167664708982036e307,-6.177644748802396e307,-6.187624788622754e307,-6.197604828443114e307,-6.207584868263473e307,-6.217564908083832e307,-6.227544947904192e307,-6.237524987724551e307,-6.247505027544911e307,-6.257485067365269e307,-6.267465107185629e307,-6.277445147005988e307,-6.287425186826347e307,-6.297405226646707e307,-6.307385266467066e307,-6.317365306287426e307,-6.327345346107784e307,-6.337325385928144e307,-6.347305425748503e307,-6.357285465568862e307,-6.367265505389222e307,-6.377245545209581e307,-6.38722558502994e307,-6.397205624850299e307,-6.407185664670659e307,-6.417165704491018e307,-6.427145744311377e307,-6.437125784131737e307,-6.447105823952096e307,-6.457085863772455e307,-6.467065903592814e307,-6.477045943413174e307,-6.487025983233533e307,-6.497006023053892e307,-6.506986062874252e307,-6.516966102694611e307,-6.52694614251497e307,-6.536926182335329e307,-6.546906222155689e307,-6.556886261976048e307,-6.566866301796407e307,-6.576846341616767e307,-6.586826381437126e307,-6.596806421257485e307,-6.606786461077844e307,-6.616766500898204e307,-6.626746540718563e307,-6.636726580538922e307,-6.646706620359282e307,-6.65668666017964e307,-6.6666667e307,-6.676646739820359e307,-6.686626779640719e307,-6.696606819461078e307,-6.706586859281437e307,-6.716566899101797e307,-6.726546938922155e307,-6.736526978742515e307,-6.746507018562874e307,-6.756487058383234e307,-6.766467098203593e307,-6.776447138023952e307,-6.786427177844312e307,-6.79640721766467e307,-6.80638725748503e307,-6.816367297305389e307,-6.826347337125749e307,-6.836327376946108e307,-6.846307416766467e307,-6.856287456586827e307,-6.866267496407185e307,-6.876247536227545e307,-6.886227576047904e307,-6.896207615868264e307,-6.906187655688623e307,-6.916167695508982e307,-6.926147735329341e307,-6.9361277751497e307,-6.94610781497006e307,-6.956087854790419e307,-6.966067894610779e307,-6.976047934431138e307,-6.986027974251497e307,-6.996008014071856e307,-7.005988053892215e307,-7.015968093712575e307,-7.025948133532934e307,-7.035928173353294e307,-7.045908213173653e307,-7.055888252994012e307,-7.065868292814371e307,-7.07584833263473e307,-7.08582837245509e307,-7.095808412275449e307,-7.105788452095809e307,-7.115768491916168e307,-7.125748531736527e307,-7.135728571556886e307,-7.145708611377245e307,-7.155688651197605e307,-7.165668691017964e307,-7.175648730838324e307,-7.185628770658683e307,-7.195608810479042e307,-7.205588850299401e307,-7.21556889011976e307,-7.22554892994012e307,-7.235528969760479e307,-7.245509009580839e307,-7.255489049401198e307,-7.265469089221556e307,-7.275449129041916e307,-7.285429168862275e307,-7.295409208682635e307,-7.305389248502994e307,-7.315369288323354e307,-7.325349328143713e307,-7.3353293679640715e307,-7.345309407784431e307,-7.35528944760479e307,-7.36526948742515e307,-7.375249527245509e307,-7.385229567065869e307,-7.395209606886228e307,-7.405189646706587e307,-7.415169686526946e307,-7.425149726347305e307,-7.435129766167665e307,-7.445109805988024e307,-7.455089845808384e307,-7.465069885628743e307,-7.475049925449102e307,-7.485029965269461e307,-7.49501000508982e307,-7.50499004491018e307,-7.514970084730539e307,-7.524950124550899e307,-7.534930164371257e307,-7.544910204191617e307,-7.554890244011976e307,-7.564870283832335e307,-7.574850323652695e307,-7.584830363473054e307,-7.594810403293414e307,-7.604790443113772e307,-7.614770482934132e307,-7.624750522754491e307,-7.63473056257485e307,-7.64471060239521e307,-7.654690642215569e307,-7.664670682035929e307,-7.674650721856287e307,-7.684630761676647e307,-7.694610801497006e307,-7.704590841317365e307,-7.714570881137725e307,-7.724550920958084e307,-7.734530960778444e307,-7.744511000598802e307,-7.754491040419162e307,-7.764471080239521e307,-7.77445112005988e307,-7.78443115988024e307,-7.794411199700599e307,-7.804391239520958e307,-7.814371279341317e307,-7.824351319161677e307,-7.834331358982036e307,-7.844311398802395e307,-7.854291438622755e307,-7.864271478443114e307,-7.874251518263473e307,-7.884231558083832e307,-7.894211597904192e307,-7.904191637724551e307,-7.91417167754491e307,-7.92415171736527e307,-7.934131757185629e307,-7.944111797005988e307,-7.954091836826347e307,-7.964071876646707e307,-7.974051916467066e307,-7.984031956287425e307,-7.994011996107785e307,-8.003992035928144e307,-8.013972075748503e307,-8.023952115568862e307,-8.033932155389222e307,-8.043912195209581e307,-8.05389223502994e307,-8.0638722748503e307,-8.073852314670659e307,-8.083832354491018e307,-8.093812394311377e307,-8.103792434131737e307,-8.113772473952096e307,-8.123752513772455e307,-8.133732553592815e307,-8.143712593413173e307,-8.153692633233533e307,-8.163672673053892e307,-8.173652712874252e307,-8.183632752694611e307,-8.19361279251497e307,-8.20359283233533e307,-8.213572872155688e307,-8.223552911976048e307,-8.233532951796407e307,-8.243512991616767e307,-8.253493031437126e307,-8.263473071257485e307,-8.273453111077845e307,-8.283433150898203e307,-8.293413190718563e307,-8.303393230538922e307,-8.313373270359282e307,-8.323353310179641e307,-8.33333335e307,-8.34331338982036e307,-8.353293429640718e307,-8.363273469461078e307,-8.373253509281437e307,-8.383233549101797e307,-8.393213588922156e307,-8.403193628742515e307,-8.413173668562874e307,-8.423153708383233e307,-8.433133748203593e307,-8.443113788023952e307,-8.453093827844312e307,-8.463073867664671e307,-8.47305390748503e307,-8.483033947305389e307,-8.493013987125748e307,-8.502994026946108e307,-8.512974066766467e307,-8.522954106586827e307,-8.532934146407186e307,-8.542914186227545e307,-8.552894226047904e307,-8.562874265868263e307,-8.572854305688623e307,-8.582834345508982e307,-8.592814385329342e307,-8.602794425149701e307,-8.61277446497006e307,-8.622754504790419e307,-8.632734544610778e307,-8.642714584431138e307,-8.652694624251497e307,-8.662674664071857e307,-8.672654703892216e307,-8.682634743712574e307,-8.692614783532934e307,-8.702594823353293e307,-8.712574863173653e307,-8.722554902994012e307,-8.732534942814372e307,-8.742514982634731e307,-8.752495022455089e307,-8.762475062275449e307,-8.772455102095808e307,-8.782435141916168e307,-8.792415181736527e307,-8.802395221556887e307,-8.812375261377246e307,-8.822355301197604e307,-8.832335341017964e307,-8.842315380838323e307,-8.852295420658683e307,-8.862275460479042e307,-8.872255500299402e307,-8.882235540119761e307,-8.892215579940119e307,-8.902195619760479e307,-8.912175659580838e307,-8.922155699401198e307,-8.932135739221557e307,-8.942115779041917e307,-8.952095818862276e307,-8.962075858682634e307,-8.972055898502994e307,-8.982035938323353e307,-8.992015978143713e307,-9.001996017964071e307,-9.011976057784432e307,-9.02195609760479e307,-9.03193613742515e307,-9.041916177245509e307,-9.05189621706587e307,-9.061876256886228e307,-9.071856296706586e307,-9.081836336526947e307,-9.091816376347305e307,-9.101796416167665e307,-9.111776455988024e307,-9.121756495808382e307,-9.131736535628743e307,-9.141716575449101e307,-9.151696615269462e307,-9.16167665508982e307,-9.17165669491018e307,-9.181636734730539e307,-9.191616774550897e307,-9.201596814371258e307,-9.211576854191616e307,-9.221556894011977e307,-9.231536933832335e307,-9.241516973652695e307,-9.251497013473054e307,-9.261477053293412e307,-9.271457093113773e307,-9.281437132934131e307,-9.291417172754492e307,-9.30139721257485e307,-9.31137725239521e307,-9.321357292215569e307,-9.331337332035927e307,-9.341317371856288e307,-9.351297411676646e307,-9.361277451497007e307,-9.371257491317365e307,-9.381237531137725e307,-9.391217570958084e307,-9.401197610778442e307,-9.411177650598803e307,-9.421157690419161e307,-9.431137730239522e307,-9.44111777005988e307,-9.45109780988024e307,-9.461077849700599e307,-9.471057889520957e307,-9.481037929341318e307,-9.491017969161676e307,-9.500998008982037e307,-9.510978048802395e307,-9.520958088622756e307,-9.530938128443114e307,-9.540918168263472e307,-9.550898208083833e307,-9.560878247904191e307,-9.570858287724552e307,-9.58083832754491e307,-9.59081836736527e307,-9.600798407185629e307,-9.610778447005987e307,-9.620758486826348e307,-9.630738526646706e307,-9.640718566467067e307,-9.650698606287425e307,-9.660678646107786e307,-9.670658685928144e307,-9.680638725748502e307,-9.690618765568863e307,-9.700598805389221e307,-9.710578845209582e307,-9.72055888502994e307,-9.730538924850299e307,-9.740518964670659e307,-9.750499004491017e307,-9.760479044311378e307,-9.770459084131736e307,-9.780439123952097e307,-9.790419163772455e307,-9.800399203592814e307,-9.810379243413174e307,-9.820359283233532e307,-9.830339323053893e307,-9.840319362874251e307,-9.850299402694612e307,-9.86027944251497e307,-9.870259482335329e307,-9.880239522155689e307,-9.890219561976047e307,-9.900199601796408e307,-9.910179641616766e307,-9.920159681437127e307,-9.930139721257485e307,-9.940119761077844e307,-9.950099800898204e307,-9.960079840718562e307,-9.970059880538923e307,-9.980039920359281e307,-9.990019960179642e307,-1.0e308]}
},{}],17:[function(require,module,exports){
module.exports={"expected":[1.0e-300,1.0019899700803994e-305,5.00997495012525e-306,3.3399888778370363e-306,2.504993750040594e-306,2.0039960040319678e-306,1.6699972278046017e-306,1.4314265367579942e-306,1.2524984437706837e-306,1.113332104956911e-306,1.0019990060169862e-306,9.109082702635492e-307,8.349993111255683e-307,7.707686443921621e-307,7.157137806248462e-307,6.679995604562892e-307,6.262496140736753e-307,5.894114231939694e-307,5.566663623557219e-307,5.2736814820900544e-307,5.009997540091208e-307,4.771426342490837e-307,4.554543425703383e-307,4.3565198847682755e-307,4.174998298688193e-307,4.007998433674212e-307,3.853844707172141e-307,3.711109770988138e-307,3.578570183740229e-307,3.455171254523576e-307,3.3399989178403507e-307,3.232257052089807e-307,3.1312490508401315e-307,3.0363627447771213e-307,2.9470579844846677e-307,2.8628563518908308e-307,2.7833325864724224e-307,2.708107401804421e-307,2.6368414363381198e-307,2.5692301348285587e-307,2.504999397547645e-307,2.443901866197636e-307,2.385713740408288e-307,2.330232038443599e-307,2.277272231448455e-307,2.2266661931289893e-307,2.1782604168658787e-307,2.131914460430147e-307,2.0874995851094575e-307,2.044897561471964e-307,2.0039996184384724e-307,1.964705515993148e-307,1.9269227248891176e-307,1.8905656992175756e-307,1.8555552298025264e-307,1.8218178681342688e-307,1.7892854120242857e-307,1.7578944454017103e-307,1.7275859257170495e-307,1.698304813304841e-307,1.6699997378100412e-307,1.6426226974249248e-307,1.616128787232087e-307,1.5904759534195363e-307,1.5656247705381197e-307,1.5415382393197954e-307,1.5181816028760636e-307,1.4955221793562331e-307,1.473529209371135e-307,1.4521737166843367e-307,1.431428380844107e-307,1.4112674205788777e-307,1.3916664869097454e-307,1.3726025650482488e-307,1.3540538842483777e-307,1.3359998348704205e-307,1.3184208919924018e-307,1.301298544973876e-307,1.2846152324378878e-307,1.2683542821910123e-307,1.2524998556493917e-307,1.2370368963813603e-307,1.2219510824152443e-307,1.207228781994789e-307,1.1928570124949122e-307,1.1788234022375222e-307,1.165116154971349e-307,1.1517240168014396e-307,1.1386362453734627e-307,1.1258425811354745e-307,1.1133332205155669e-307,1.1010987908680223e-307,1.0891303270534134e-307,1.077419249529667e-307,1.0659573438415672e-307,1.0547367414056605e-307,1.043749901496103e-307,1.0329895943447853e-307,1.0224488852761436e-307,1.0121211198034978e-307,1.0019999096196082e-307,9.920791194194766e-308,9.823528544982776e-308,9.72815449071739e-308,9.634614552703473e-308,9.54285632762456e-308,9.452829389647628e-308,9.36448519801736e-308,9.277777009784014e-308,9.192659797335304e-308,9.109090170426505e-308,9.027026302425186e-308,8.946427860507071e-308,8.867255939558361e-308,8.789472999556839e-308,8.71304280622009e-308,8.637930374723595e-308,8.564101916305111e-308,8.491524787584075e-308,8.420167442436314e-308,8.349999386275046e-308,8.280991132598909e-308,8.213114161677011e-308,8.146340881249299e-308,8.080644589128552e-308,8.01599943759748e-308,7.952380399501172e-308,7.889763235941509e-308,7.828124465485877e-308,7.76744133480804e-308,7.707691790684059e-308,7.648854453270821e-308,7.590908590599206e-308,7.533834094217909e-308,7.477611455927855e-308,7.422221745550648e-308,7.367646589677798e-308,7.31386815135066e-308,7.260869110623848e-308,7.208632645967628e-308,7.157142416467375e-308,7.106382544780469e-308,7.056337600813356e-308,7.006992586083451e-308,6.958332918732664e-308,6.910344419161023e-308,6.863013296250727e-308,6.816326134152459e-308,6.770269879607399e-308,6.724831829779761e-308,6.679999620576022e-308,6.635761215428291e-308,6.59210489452045e-308,6.549019244436774e-308,6.506493148213884e-308,6.464515775777751e-308,6.42307657474854e-308,6.382165261596838e-308,6.341771813135733e-308,6.301886458333944e-308,6.262499670435955e-308,6.223602159375813e-308,6.185184864471896e-308,6.147238947390584e-308,6.109755785367356e-308,6.072726964674395e-308,6.0361442743243e-308,5.999999700000015e-308,5.964285418201545e-308,5.928993790600483e-308,5.894117358593786e-308,5.859648838048644e-308,5.825581114230679e-308,5.791907236908029e-308,5.75862041562427e-308,5.7257140151334e-308,5.693181550990457e-308,5.661016685291595e-308,5.62921322255777e-308,5.597765105756387e-308,5.566666412455566e-308,5.535911351105899e-308,5.505494257444764e-308,5.475409591018554e-308,5.4456519318183e-308,5.416215977024408e-308,5.38709653785641e-308,5.358288536523788e-308,5.329787003274116e-308,5.301587073534906e-308,5.273683985145715e-308,5.246073075677211e-308,5.218749779833993e-308,5.191709626938182e-308,5.164948238490815e-308,5.138461325808293e-308,5.112244687731162e-308,5.086294208402698e-308,5.060605855114792e-308,5.035175676218791e-308,5.009999799099008e-308,4.985074428206736e-308,4.96039584315264e-308,4.935960396855549e-308,4.911764513745683e-308,4.887804688020471e-308,4.864077481951181e-308,4.840579524238613e-308,4.817307508416242e-308,4.794258191299198e-308,4.771428391477557e-308,4.748814987852481e-308,4.726414918213783e-308,4.704225177857575e-308,4.682242818242647e-308,4.660464945684377e-308,4.638888720084883e-308,4.617511353698321e-308,4.596330109930147e-308,4.575342302169268e-308,4.554545292652072e-308,4.533936491357268e-308,4.513513354930611e-308,4.493273385638567e-308,4.473214130349973e-308,4.453333179544894e-308,4.433628166349759e-308,4.414096765598018e-308,4.3947366929155173e-308,4.375545703829833e-308,4.3565215929028406e-308,4.33766219288582e-308,4.318965373896408e-308,4.300429042616741e-308,4.2820511415121674e-308,4.2638296480699e-308,4.2457625740570283e-308,4.2278479647973124e-308,4.2100838984662143e-308,4.1924684854036216e-308,4.174999867443754e-308,4.157676217261759e-308,4.140495737736497e-308,4.1234566613290697e-308,4.106557249476623e-308,4.089795792001003e-308,4.0731706065318306e-308,4.056680037943586e-308,4.040322457806325e-308,4.0240962638496192e-308,4.0079998794393636e-308,3.992031753067098e-308,3.976190357851477e-308,3.9604741910515745e-308,3.9448817735916707e-308,3.929411649597235e-308,3.914062385941776e-308,3.8988325718042696e-308,3.8837208182368877e-308,3.868725757742732e-308,3.853846043863317e-308,3.839080350775535e-308,3.8244273728978524e-308,3.8098858245054897e-308,3.795454439354342e-308,3.781131970313424e-308,3.7669171890056e-308,3.7528088854563846e-308,3.738805867750615e-308,3.724906961696773e-308,3.7111110104987684e-308,3.6974168744349913e-308,3.6838234305444443e-308,3.670329572319771e-308,3.6569342094070034e-308,3.64363626731187e-308,3.6304346871124793e-308,3.617328425178227e-308,3.60431645289478e-308,3.591397756394961e-308,3.578571336295411e-308,3.5658362074388647e-308,3.5531913986419215e-308,3.5406359524481537e-308,3.5281689248864336e-308,3.515789385234351e-308,3.503496415786593e-308,3.4912891116281635e-308,3.4791665804123285e-308,3.4671279421431755e-308,3.4551723289626655e-308,3.4432988849420786e-308,3.431506765877746e-308,3.4197951390909643e-308,3.408163183231989e-308,3.3966100880880227e-308,3.3851350543950894e-308,3.373737293653711e-308,3.3624160279482924e-308,3.351170489770138e-308,3.339999921844002e-308,3.328903576958093e-308,3.3178807177974665e-308,3.30693061678071e-308,3.296052555899846e-308,3.2852458265633984e-308,3.2745097294425235e-308,3.2638435743201535e-308,3.2532466799430783e-308,3.2427183738768986e-308,3.2322579923637895e-308,3.2218648801830023e-308,3.2115383905140545e-308,3.201277884802541e-308,3.191082732628506e-308,3.1809523115773256e-308,3.170886007113044e-308,3.160883212454101e-308,3.150943328451408e-308,3.141065763468717e-308,3.131249933265236e-308,3.121495260880428e-308,3.1118011765209686e-308,3.1021671174497994e-308,3.0925925278772306e-308,3.0830768588540605e-308,3.0736195681666615e-308,3.0642201202339883e-308,3.054877986006471e-308,3.0455926428667523e-308,3.0363635745322323e-308,3.0271902709593756e-308,3.018072228249747e-308,3.009008948557748e-308,2.999999940000001e-308,2.9910447165663635e-308,2.9821427980325266e-308,2.9732937098741745e-308,2.964496983182663e-308,2.955752154582192e-308,2.947058766148444e-308,2.9384163653286446e-308,2.929824504863036e-308,2.9212827427077163e-308,2.9127906419588304e-308,2.904347770778073e-308,2.8959537023194904e-308,2.8876080146575433e-308,2.87931029071641e-308,2.871060118200508e-308,2.862857089526205e-308,2.8547008017546946e-308,2.846590856526021e-308,2.838526859994223e-308,2.8305084227635747e-308,2.8225351598259085e-308,2.814606690498991e-308,2.806722638365935e-308,2.798882631215631e-308,2.7910863009841647e-308,2.783333283697223e-308,2.7756232194134495e-308,2.767955752168738e-308,2.760330529921454e-308,2.752747204498552e-308,2.7452054315425793e-308,2.7377048704595547e-308,2.730245184367692e-308,2.7228260400469645e-308,2.7154471078894847e-308,2.7081080618506946e-308,2.700808579401342e-308,2.69354834148023e-308,2.686327032447729e-308,2.679144340040036e-308,2.6719999553241606e-308,2.6648935726536335e-308,2.657824889624919e-308,2.6507936070345184e-308,2.6437994288367534e-308,2.6368420621022165e-308,2.6299212169768747e-308,2.6230366066418144e-308,2.6161879472736203e-308,2.6093749580053715e-308,2.602597360888245e-308,2.595854880853715e-308,2.589147245676342e-308,2.5824741859371356e-308,2.5758354349874777e-308,2.56923072891361e-308,2.562659806501659e-308,2.556122409203197e-308,2.549618281101335e-308,2.5431471688773226e-308,2.5367088217776644e-308,2.5303029915817267e-308,2.523929432569841e-308,2.517587901491882e-308,2.511278157536323e-308,2.5049999622997503e-308,2.4987530797568427e-308,2.492537276230787e-308,2.486352320364143e-308,2.4801979830901384e-308,2.47407403760439e-308,2.4679802593370384e-308,2.4619164259253005e-308,2.4558823171864193e-308,2.449877715091015e-308,2.4439024037368237e-308,2.4379561693228197e-308,2.4320388001237163e-308,2.426150086464833e-308,2.420289820697333e-308,2.414457797173814e-308,2.408653812224252e-308,2.4028776641322914e-308,2.3971291531118794e-308,2.3914080812842266e-308,2.3857142526551025e-308,2.3800474730924563e-308,2.3744075503043513e-308,2.368794293817213e-308,2.363207514954388e-308,2.357647026815004e-308,2.352112644253125e-308,2.3466041838572035e-308,2.3411214639298196e-308,2.3356643044677006e-308,2.330232527142023e-308,2.324825955278988e-308,2.319444413840664e-308,2.314087729406099e-308,2.30875573015269e-308,2.303448245837813e-308,2.2981651077807007e-308,2.2929061488445773e-308,2.2876712034190284e-308,2.2824601074026186e-308,2.277272698185744e-308,2.2721088146337177e-308,2.266968297070085e-308,2.261850987260165e-308,2.256756728394814e-308,2.25168536507441e-308,2.2466367432930486e-308,2.2416107104229543e-308,2.2366071151990995e-308,2.23162580770403e-308,2.226666639352889e-308,2.221729462878649e-308,2.216814132317527e-308,2.2119205029946057e-308,2.207048431509636e-308,2.202197775723029e-308,2.197368394742036e-308,2.1925601489071057e-308,2.1877728997784183e-308,2.183006510122603e-308,2.178260843899622e-308,2.1735357662498296e-308,2.168831143481194e-308,2.164146843056692e-308,2.15948273358186e-308,2.154838684792508e-308,2.1502145675425966e-308,2.1456102537922593e-308,2.1410256165959896e-308,2.136460530090971e-308,2.131914869485559e-308,2.127388511047913e-308,2.122881332094765e-308,2.118393210980338e-308,2.113924027085403e-308,2.109473660806471e-308,2.105041993545124e-308,2.10062890769748e-308,2.0962342866437917e-308,2.0918580147381686e-308,2.087499977298438e-308,2.083160060596125e-308,2.078838151846559e-308,2.074534139199105e-308,2.070247911727512e-308,2.065979359420385e-308,2.061728373171773e-308,2.0574948447718716e-308,2.0532786668978436e-308,2.0490797331047463e-308,2.0448979378165763e-308,2.040733176317421e-308,2.036585344742713e-308,2.0324543400706034e-308,2.028340060113426e-308,2.0242424035092747e-308,2.020161269713677e-308,2.0160965589913726e-308,2.012048172408187e-308,2.008016011823005e-308,2.00399997987984e-308,1.99999998e-308,1.9960159163743435e-308,1.99204769395563e-308,1.9880952184509637e-308,1.9841583963143224e-308,1.9802371347391775e-308,1.976331341651203e-308,1.9724409257010665e-308,1.9685657962573096e-308,1.964705863399308e-308,1.9608610379103175e-308,1.9570312312705997e-308,1.953216355650628e-308,1.949416323904374e-308,1.945631049562673e-308,1.9418604468266634e-308,1.9381044305613027e-308,1.9343629162889646e-308,1.9306358201831005e-308,1.9269230590619823e-308,1.923224550382514e-308,1.919540212234113e-308,1.915869963332663e-308,1.912213723014539e-308,1.9085714112306944e-308,1.9049429485408204e-308,1.901328256107573e-308,1.8977272556908577e-308,1.8941398696421897e-308,1.89056602089911e-308,1.887005632979667e-308,1.8834586299769636e-308,1.879924936553756e-308,1.8764044779371294e-308,1.872897179913215e-308,1.8694029688219815e-308,1.8659217715520737e-308,1.8624535155357167e-308,1.8589981287436713e-308,1.855555539680247e-308,1.8521256773783744e-308,1.8487084713947253e-308,1.84530385180489e-308,1.8419117491986103e-308,1.838532094675061e-308,1.835164819838184e-308,1.831809856792075e-308,1.828467138136422e-308,1.8251365969619876e-308,1.821818166846149e-308,1.818511781848479e-308,1.81521737650638e-308,1.811934885830764e-308,1.8086642453017767e-308,1.805405390864573e-308,1.8021582589251333e-308,1.7989227863461284e-308,1.7956989104428257e-308,1.792486568979042e-308,1.789285700163138e-308,1.786096242644056e-308,1.7829181355074023e-308,1.779751318271566e-308,1.7765957308838843e-308,1.773451313716845e-308,1.7703180075643347e-308,1.767195753637916e-308,1.764084493563157e-308,1.7609841693759904e-308,1.7578947235191136e-308,1.7548160988384283e-308,1.751748238579515e-308,1.7486910863841454e-308,1.7456445862868314e-308,1.74260868271141e-308,1.739583320467665e-308,1.7365684447479795e-308,1.733564001124029e-308,1.730569935543505e-308,1.727586194326873e-308,1.724612724164166e-308,1.721649472111808e-308,1.718696385589472e-308,1.71575341237697e-308,1.712820500611177e-308,1.7098975987829795e-308,1.7069846557342654e-308,1.7040816206549357e-308,1.701188443079952e-308,1.698305072886412e-308,1.695431460290654e-308,1.6925675558453933e-308,1.6897133104368846e-308,1.6868686752821143e-308,1.6840336019260225e-308,1.681208042238751e-308,1.678391948412919e-308,1.6755852729609287e-308,1.6727879687122944e-308,1.6699999888110004e-308,1.667221286712883e-308,1.6644518161830446e-308,1.661691531293285e-308,1.6589403864195647e-308,1.6561983362394917e-308,1.653465335729831e-308,1.6507413401640394e-308,1.6480263051098296e-308,1.6453201864267516e-308,1.6426229402638e-308,1.639934523057047e-308,1.6372548915272973e-308,1.634584002677762e-308,1.6319218137917645e-308,1.629268282430458e-308,1.626623366430574e-308,1.6239870239021877e-308,1.621359213226506e-308,1.6187398930536773e-308,1.6161290223006247e-308,1.613526560148895e-308,1.610932466042535e-308,1.6083466996859807e-308,1.6057692210419746e-308,1.6031999903294976e-308,1.6006389680217213e-308,1.598086114843983e-308,1.595541391771776e-308,1.5930047600287637e-308,1.5904761810848073e-308,1.587955616654017e-308,1.5854430286928176e-308,1.582938379398037e-308,1.5804416312050074e-308,1.5779527467856905e-308,1.5754716890468137e-308,1.572998421128031e-308,1.570532906400094e-308,1.5680751084630474e-308,1.5656249911444336e-308,1.5631825184975214e-308,1.560747654799546e-308,1.5583203645499687e-308,1.555900612468751e-308,1.5534883634946456e-308,1.551083582783502e-308,1.54868623570659e-308,1.546296287848937e-308,1.5439137050076805e-308,1.541538453190438e-308,1.539170498613689e-308,1.5368098077011743e-308,1.5344563470823083e-308,1.532110083590607e-308,1.5297709842621294e-308,1.5274390163339346e-308,1.5251141472425513e-308,1.522796344622463e-308,1.5204855763046044e-308,1.518181810314876e-308,1.5158850148726657e-308,1.51359515838939e-308,1.5113122094670463e-308,1.509036136896774e-308,1.5067669096574366e-308,1.5045044969142117e-308,1.502248868017191e-308,1.4999999925e-308,1.497757840078425e-308,1.4955223806490533e-308,1.493293584287926e-308,1.491071421249203e-308,1.48885586196384e-308,1.4866468770382765e-308,1.484444437253136e-308,1.4822485135619374e-308,1.48005907708982e-308,1.4778760991322734e-308,1.475699551153889e-308,1.4735294047871106e-308,1.471365631831008e-308,1.4692082042500496e-308,1.467057094172896e-308,1.4649122738911973e-308,1.462773715858405e-308,1.4606413926885907e-308,1.4585152771552793e-308,1.456395342190289e-308,1.454281560882582e-308,1.4521739064771267e-308,1.4500723523737696e-308,1.4479768721261153e-308,1.4458874394404154e-308,1.443804028174472e-308,1.441726612336546e-308,1.4396551660842747e-308,1.4375896637236036e-308,1.43553007970772e-308,1.4334763886360034e-308,1.4314285652529797e-308,1.4293865844472844e-308,1.427350421250639e-308,1.4253200508368324e-308,1.4232954485207094e-308,1.4212765897571753e-308,1.4192634501401986e-308,1.417256005401831e-308,1.4152542314112326e-308,1.4132581041737005e-308,1.411267599829716e-308,1.4092826946539907e-308,1.4073033650545226e-308,1.4053295875716655e-308,1.403361338877198e-308,1.401398595773407e-308,1.3994413351921755e-308,1.3974895341940795e-308,1.3955431699674893e-308,1.393602219827685e-308,1.391666661215972e-308,1.3897364716988077e-308,1.3878116289669357e-308,1.3858921108345243e-308,1.383977895238317e-308,1.3820689602367847e-308,1.380165284009289e-308,1.378266844855249e-308,1.3763736211933193e-308,1.374485591560568e-308,1.372602734611672e-308,1.3707250291181054e-308,1.3688524539673474e-308,1.366984988162088e-308,1.3651226108194434e-308,1.363265301170179e-308,1.3614130385579365e-308,1.3595658024384674e-308,1.357723572378875e-308,1.3558863280568593e-308,1.3540540492599705e-308,1.3522267158848695e-308,1.3504043079365886e-308,1.3485868055278063e-308,1.346774188878122e-308,1.344966438313337e-308,1.343163534264747e-308,1.341365457268431e-308,1.339572187964554e-308,1.337783707096672e-308,1.33599999551104e-308,1.3342210341559326e-308,1.332446804080961e-308,1.3306772864364056e-308,1.3289124624725427e-308,1.327152313538985e-308,1.325396821084026e-308,1.323645966653986e-308,1.3218997318925653e-308,1.3201580985402055e-308,1.3184210484334486e-308,1.316688563504311e-308,1.3149606257796515e-308,1.3132372173805543e-308,1.31151832052171e-308,1.3098039175108033e-308,1.308093990747909e-308,1.306388522724885e-308,1.3046874960247803e-308,1.302990893321237e-308,1.301298697377905e-308,1.2996108910478584e-308,1.297927457273014e-308,1.296248379083559e-308,1.2945736395973798e-308,1.292903222019496e-308,1.2912371096415e-308,1.289575285840998e-308,1.2879177340810594e-308,1.286264437909667e-308,1.2846153809591717e-308,1.2829705469457557e-308,1.281329919668893e-308,1.279693483010819e-308,1.278061220936003e-308,1.276433117490624e-308,1.274809156802051e-308,1.2731893230783266e-308,1.2715736006076554e-308,1.2699619737578974e-308,1.2683544269760615e-308,1.266750944787807e-308,1.265151511796947e-308,1.263556112684953e-308,1.26196473221047e-308,1.260377355208829e-308,1.2587939665915633e-308,1.257214551345935e-308,1.2556390945344565e-308,1.2540675812944217e-308,1.2524999968374376e-308,1.2509363264489614e-308,1.249376555487839e-308,1.247820669385849e-308,1.2462686536472487e-308,1.244720493848324e-308,1.2431761756369415e-308,1.241635684732107e-308,1.2400990069235247e-308,1.238566128071159e-308,1.237037034104801e-308,1.235511711023641e-308,1.233990144895836e-308,1.23247232185809e-308,1.2309582281152313e-308,1.2294478499397945e-308,1.2279411736716045e-308,1.2264381857173676e-308,1.22493887255026e-308,1.2234432207095225e-308,1.2219512168000596e-308,1.2204628474920366e-308,1.218978099520486e-308,1.2174969596849095e-308,1.21601941484889e-308,1.2145454519397024e-308,1.2130750579479274e-308,1.2116082199270683e-308,1.2101449249931734e-308,1.2086851603244565e-308,1.2072289131609233e-308,1.2057761708039983e-308,1.204326920616159e-308,1.202881150020565e-308,1.2014388465006987e-308,1.1999999976e-308,1.1985645909215105e-308,1.1971326141275163e-308,1.195704054939195e-308,1.194278901136264e-308,1.1928571405566327e-308,1.1914387610960567e-308,1.190023750707793e-308,1.188612097402262e-308,1.187203789246704e-308,1.185798814364847e-308,1.1843971609365726e-308,1.182998817197582e-308,1.1816037714390685e-308,1.1802120120073916e-308,1.178823527303751e-308,1.177438305783864e-308,1.176056335957647e-308,1.174677606388898e-308,1.17330210569498e-308,1.1719298225465065e-308,1.1705607456670344e-308,1.169194863832751e-308,1.16783216587217e-308,1.1664726406658254e-308,1.165116277145971e-308,1.1637630642962766e-308,1.1624129911515335e-308,1.161066046797356e-308,1.159722220369888e-308,1.1583815010555113e-308,1.157043878090555e-308,1.155709340761006e-308,1.1543778784022277e-308,1.15304948039867e-308,1.151724136183591e-308,1.1504018352387757e-308,1.1490825670942577e-308,1.147766321328043e-308,1.1464530875658355e-308,1.145142855480764e-308,1.143835614793113e-308,1.142531355270052e-308,1.14123006672537e-308,1.1399317390192083e-308,1.1386363620577996e-308,1.137343925793205e-308,1.136054420223055e-308,1.1347678353902903e-308,1.1334841613829056e-308,1.1322033883336974e-308,1.130925506420007e-308,1.129650505863475e-308,1.1283783769297847e-308,1.1271091099284216e-308,1.125842695212423e-308,1.124579123178134e-308,1.1233183842649663e-308,1.122060468955156e-308,1.120805367773524e-308,1.1195530712872384e-308,1.1183035701055785e-308,1.117056854879699e-308,1.1158129163023993e-308,1.1145717451078875e-308,1.113333332071556e-308,1.1120976680097463e-308,1.1108647437795293e-308,1.1096345502784735e-308,1.108407078444426e-308,1.1071823192552853e-308,1.105960263728784e-308,1.104740902922267e-308,1.103524227932475e-308,1.102310229895326e-308,1.1010988999857023e-308,1.0998902294172336e-308,1.098684209442088e-308,1.097480831350758e-308,1.096280086471853e-308,1.0950819661718893e-308,1.093886461855085e-308,1.092693564963152e-308,1.091503266975095e-308,1.0903155594070055e-308,1.089130433811862e-308,1.087947881779329e-308,1.0867678949355593e-308,1.085590464942994e-308,1.0844155835001687e-308,1.0832432423415166e-308,1.082073433237175e-308,1.080906147992794e-308,1.079741378449344e-308,1.0785791164829246e-308,1.0774193540045787e-308,1.076262082960101e-308,1.075107295329855e-308,1.073954983128586e-308,1.0728051384052385e-308,1.0716577532427695e-308,1.0705128197579715e-308,1.0693703301012906e-308,1.0682302764566444e-308,1.0670926510412475e-308,1.065957446105432e-308,1.0648246539324727e-308,1.0636942668384114e-308,1.062566277171883e-308,1.0614406773139453e-308,1.060317459677904e-308,1.0591966167091437e-308,1.0580781408849597e-308,1.0569620247143887e-308,1.0558482607380404e-308,1.0547368415279333e-308,1.053627759687329e-308,1.052521007850567e-308,1.0514165786829024e-308,1.050314464880345e-308,1.0492146591694965e-308,1.0481171543073914e-308,1.047021943081338e-308,1.045929018308759e-308,1.044838372837038e-308,1.0437499995433595e-308,1.0426638913345555e-308,1.041580041146952e-308,1.040498441946216e-308,1.0394190867272e-308,1.0383419685137966e-308,1.0372670803587824e-308,1.0361944153436733e-308,1.035123966578572e-308,1.0340557272020243e-308,1.0329896903808694e-308,1.0319258493100955e-308,1.0308641972126965e-308,1.0298047273395236e-308,1.028747432969149e-308,1.027692307407716e-308,1.026639343988805e-308,1.0255885360732884e-308,1.024539877049193e-308,1.0234933603315593e-308,1.022448979362307e-308,1.0214067276100966e-308,1.0203665985701904e-308,1.019328585764321e-308,1.0182926827405565e-308,1.0172588830731634e-308,1.0162271803624785e-308,1.015197568234772e-308,1.0141700403421215e-308,1.0131445903622763e-308,1.0121212119985305e-308,1.011099898979595e-308,1.010080645059468e-308,1.0090634440173054e-308,1.0080482896572997e-308,1.0070351758085504e-308,1.006024096324938e-308,1.005015045085004e-308,1.0040080159918234e-308,1.0030030029728826e-308,1.00199999997996e-308,1.0009990009890007e-308,1.0e-308],"x":[1.0e300,9.980139820359282e304,1.996017964071856e305,2.9940219461077846e305,3.992025928143712e305,4.990029910179641e305,5.988033892215569e305,6.986037874251497e305,7.984041856287425e305,8.982045838323353e305,9.98004982035928e305,1.097805380239521e306,1.1976057784431138e306,1.2974061766467066e306,1.3972065748502995e306,1.4970069730538922e306,1.596807371257485e306,1.696607769461078e306,1.7964081676646707e306,1.8962085658682634e306,1.9960089640718562e306,2.0958093622754492e306,2.195609760479042e306,2.2954101586826347e306,2.3952105568862277e306,2.4950109550898204e306,2.5948113532934132e306,2.694611751497006e306,2.794412149700599e306,2.8942125479041914e306,2.9940129461077844e306,3.0938133443113774e306,3.19361374251497e306,3.293414140718563e306,3.393214538922156e306,3.4930149371257484e306,3.5928153353293414e306,3.6926157335329344e306,3.792416131736527e306,3.89221652994012e306,3.9920169281437123e306,4.0918173263473054e306,4.1916177245508984e306,4.291418122754491e306,4.391218520958084e306,4.491018919161677e306,4.5908193173652693e306,4.6906197155688624e306,4.7904201137724554e306,4.890220511976048e306,4.990020910179641e306,5.089821308383233e306,5.1896217065868263e306,5.2894221047904194e306,5.389222502994012e306,5.489022901197605e306,5.588823299401198e306,5.688623697604791e306,5.788424095808383e306,5.888224494011976e306,5.988024892215569e306,6.087825290419162e306,6.187625688622755e306,6.287426086826348e306,6.38722648502994e306,6.487026883233533e306,6.586827281437126e306,6.686627679640719e306,6.786428077844312e306,6.886228476047904e306,6.986028874251497e306,7.08582927245509e306,7.185629670658683e306,7.285430068862276e306,7.385230467065869e306,7.485030865269461e306,7.584831263473054e306,7.684631661676647e306,7.78443205988024e306,7.884232458083833e306,7.984032856287425e306,8.083833254491018e306,8.183633652694611e306,8.283434050898204e306,8.383234449101797e306,8.48303484730539e306,8.582835245508982e306,8.682635643712575e306,8.782436041916168e306,8.882236440119761e306,8.982036838323354e306,9.081837236526946e306,9.181637634730539e306,9.281438032934132e306,9.381238431137725e306,9.481038829341318e306,9.580839227544911e306,9.680639625748503e306,9.780440023952096e306,9.880240422155689e306,9.980040820359282e306,1.0079841218562875e307,1.0179641616766467e307,1.027944201497006e307,1.0379242413173653e307,1.0479042811377246e307,1.0578843209580839e307,1.0678643607784432e307,1.0778444005988024e307,1.0878244404191617e307,1.097804480239521e307,1.1077845200598803e307,1.1177645598802396e307,1.1277445997005988e307,1.1377246395209582e307,1.1477046793413174e307,1.1576847191616765e307,1.167664758982036e307,1.1776447988023952e307,1.1876248386227546e307,1.1976048784431138e307,1.2075849182634732e307,1.2175649580838324e307,1.2275449979041915e307,1.237525037724551e307,1.2475050775449102e307,1.2574851173652696e307,1.2674651571856288e307,1.277445197005988e307,1.2874252368263474e307,1.2974052766467066e307,1.307385316467066e307,1.3173653562874252e307,1.3273453961077843e307,1.3373254359281438e307,1.347305475748503e307,1.3572855155688624e307,1.3672655553892216e307,1.3772455952095807e307,1.3872256350299402e307,1.3972056748502993e307,1.4071857146706588e307,1.417165754491018e307,1.4271457943113774e307,1.4371258341317366e307,1.4471058739520957e307,1.4570859137724552e307,1.4670659535928143e307,1.4770459934131738e307,1.487026033233533e307,1.4970060730538921e307,1.5069861128742516e307,1.5169661526946107e307,1.5269461925149702e307,1.5369262323353294e307,1.5469062721556885e307,1.556886311976048e307,1.5668663517964071e307,1.5768463916167666e307,1.5868264314371258e307,1.596806471257485e307,1.6067865110778444e307,1.6167665508982035e307,1.626746590718563e307,1.6367266305389221e307,1.6467066703592816e307,1.6566867101796408e307,1.66666675e307,1.6766467898203594e307,1.6866268296407185e307,1.696606869461078e307,1.7065869092814372e307,1.7165669491017963e307,1.7265469889221558e307,1.736527028742515e307,1.7465070685628744e307,1.7564871083832335e307,1.7664671482035927e307,1.7764471880239522e307,1.7864272278443113e307,1.7964072676646708e307,1.80638730748503e307,1.816367347305389e307,1.8263473871257486e307,1.8363274269461077e307,1.8463074667664672e307,1.8562875065868263e307,1.8662675464071858e307,1.876247586227545e307,1.8862276260479041e307,1.8962076658682636e307,1.9061877056886227e307,1.9161677455089822e307,1.9261477853293413e307,1.9361278251497005e307,1.94610786497006e307,1.9560879047904191e307,1.9660679446107786e307,1.9760479844311377e307,1.986028024251497e307,1.9960080640718563e307,2.0059881038922155e307,2.015968143712575e307,2.0259481835329341e307,2.0359282233532933e307,2.0459082631736527e307,2.055888302994012e307,2.0658683428143714e307,2.0758483826347305e307,2.08582842245509e307,2.0958084622754491e307,2.1057885020958083e307,2.1157685419161678e307,2.125748581736527e307,2.1357286215568864e307,2.1457086613772455e307,2.1556887011976047e307,2.1656687410179641e307,2.1756487808383233e307,2.1856288206586828e307,2.195608860479042e307,2.205588900299401e307,2.2155689401197605e307,2.2255489799401197e307,2.2355290197604792e307,2.2455090595808383e307,2.2554890994011975e307,2.265469139221557e307,2.2754491790419164e307,2.2854292188622753e307,2.2954092586826347e307,2.305389298502994e307,2.315369338323353e307,2.3253493781437125e307,2.335329417964072e307,2.3453094577844314e307,2.3552894976047903e307,2.3652695374251497e307,2.375249577245509e307,2.385229617065868e307,2.3952096568862275e307,2.405189696706587e307,2.4151697365269464e307,2.4251497763473053e307,2.4351298161676647e307,2.445109855988024e307,2.455089895808383e307,2.4650699356287425e307,2.475049975449102e307,2.485030015269461e307,2.4950100550898203e307,2.5049900949101797e307,2.514970134730539e307,2.524950174550898e307,2.5349302143712575e307,2.544910254191617e307,2.554890294011976e307,2.5648703338323353e307,2.5748503736526947e307,2.5848304134730537e307,2.594810453293413e307,2.6047904931137725e307,2.614770532934132e307,2.624750572754491e307,2.6347306125748503e307,2.64471065239521e307,2.6546906922155687e307,2.664670732035928e307,2.6746507718562875e307,2.684630811676647e307,2.694610851497006e307,2.7045908913173653e307,2.714570931137725e307,2.7245509709580837e307,2.734531010778443e307,2.7445110505988025e307,2.7544910904191615e307,2.764471130239521e307,2.7744511700598803e307,2.78443120988024e307,2.7944112497005987e307,2.804391289520958e307,2.8143713293413175e307,2.8243513691616765e307,2.834331408982036e307,2.8443114488023953e307,2.854291488622755e307,2.8642715284431137e307,2.874251568263473e307,2.8842316080838326e307,2.8942116479041915e307,2.904191687724551e307,2.9141717275449103e307,2.9241517673652693e307,2.9341318071856287e307,2.944111847005988e307,2.9540918868263476e307,2.9640719266467065e307,2.974051966467066e307,2.9840320062874253e307,2.9940120461077843e307,3.0039920859281437e307,3.013972125748503e307,3.023952165568862e307,3.0339322053892215e307,3.043912245209581e307,3.0538922850299404e307,3.0638723248502993e307,3.0738523646706587e307,3.083832404491018e307,3.093812444311377e307,3.1037924841317365e307,3.113772523952096e307,3.1237525637724554e307,3.1337326035928143e307,3.1437126434131737e307,3.153692683233533e307,3.163672723053892e307,3.1736527628742515e307,3.183632802694611e307,3.19361284251497e307,3.2035928823353293e307,3.2135729221556887e307,3.223552961976048e307,3.233533001796407e307,3.2435130416167665e307,3.253493081437126e307,3.263473121257485e307,3.2734531610778443e307,3.2834332008982037e307,3.293413240718563e307,3.303393280538922e307,3.3133733203592815e307,3.323353360179641e307,3.3333334e307,3.3433134398203593e307,3.3532934796407187e307,3.3632735194610777e307,3.373253559281437e307,3.3832335991017965e307,3.393213638922156e307,3.403193678742515e307,3.4131737185628743e307,3.4231537583832337e307,3.4331337982035927e307,3.443113838023952e307,3.4530938778443115e307,3.4630739176646705e307,3.47305395748503e307,3.4830339973053893e307,3.4930140371257487e307,3.5029940769461077e307,3.512974116766467e307,3.5229541565868265e307,3.5329341964071855e307,3.542914236227545e307,3.5528942760479043e307,3.5628743158682637e307,3.5728543556886227e307,3.582834395508982e307,3.5928144353293415e307,3.6027944751497005e307,3.61277451497006e307,3.6227545547904193e307,3.632734594610778e307,3.6427146344311377e307,3.652694674251497e307,3.6626747140718565e307,3.6726547538922155e307,3.682634793712575e307,3.6926148335329343e307,3.7025948733532933e307,3.7125749131736527e307,3.722554952994012e307,3.7325349928143715e307,3.7425150326347305e307,3.75249507245509e307,3.7624751122754493e307,3.7724551520958083e307,3.7824351919161677e307,3.792415231736527e307,3.802395271556886e307,3.8123753113772455e307,3.822355351197605e307,3.8323353910179643e307,3.8423154308383233e307,3.8522954706586827e307,3.862275510479042e307,3.872255550299401e307,3.8822355901197605e307,3.89221562994012e307,3.902195669760479e307,3.9121757095808383e307,3.9221557494011977e307,3.932135789221557e307,3.942115829041916e307,3.9520958688622755e307,3.962075908682635e307,3.972055948502994e307,3.9820359883233533e307,3.9920160281437127e307,4.001996067964072e307,4.011976107784431e307,4.0219561476047905e307,4.03193618742515e307,4.041916227245509e307,4.0518962670658683e307,4.0618763068862277e307,4.0718563467065866e307,4.081836386526946e307,4.0918164263473055e307,4.101796466167665e307,4.111776505988024e307,4.1217565458083833e307,4.1317365856287427e307,4.1417166254491016e307,4.151696665269461e307,4.1616767050898205e307,4.17165674491018e307,4.181636784730539e307,4.1916168245508983e307,4.2015968643712577e307,4.2115769041916166e307,4.221556944011976e307,4.2315369838323355e307,4.2415170236526944e307,4.251497063473054e307,4.2614771032934133e307,4.2714571431137727e307,4.2814371829341316e307,4.291417222754491e307,4.3013972625748505e307,4.3113773023952094e307,4.321357342215569e307,4.3313373820359283e307,4.341317421856287e307,4.3512974616766467e307,4.361277501497006e307,4.3712575413173655e307,4.3812375811377244e307,4.391217620958084e307,4.4011976607784433e307,4.411177700598802e307,4.4211577404191617e307,4.431137780239521e307,4.4411178200598805e307,4.4510978598802394e307,4.461077899700599e307,4.4710579395209583e307,4.481037979341317e307,4.4910180191616767e307,4.500998058982036e307,4.510978098802395e307,4.520958138622754e307,4.530938178443114e307,4.540918218263473e307,4.550898258083833e307,4.560878297904191e307,4.570858337724551e307,4.58083837754491e307,4.590818417365269e307,4.600798457185629e307,4.610778497005988e307,4.620758536826348e307,4.630738576646706e307,4.640718616467066e307,4.650698656287425e307,4.660678696107784e307,4.670658735928144e307,4.680638775748503e307,4.690618815568863e307,4.700598855389221e307,4.710578895209581e307,4.72055893502994e307,4.730538974850299e307,4.740519014670659e307,4.750499054491018e307,4.760479094311378e307,4.770459134131736e307,4.780439173952096e307,4.790419213772455e307,4.800399253592814e307,4.810379293413174e307,4.820359333233533e307,4.830339373053893e307,4.840319412874251e307,4.850299452694611e307,4.86027949251497e307,4.870259532335329e307,4.880239572155689e307,4.890219611976048e307,4.900199651796407e307,4.910179691616766e307,4.920159731437126e307,4.930139771257485e307,4.940119811077844e307,4.950099850898204e307,4.960079890718563e307,4.970059930538922e307,4.980039970359281e307,4.990020010179641e307,5.00000005e307,5.009980089820359e307,5.019960129640719e307,5.029940169461078e307,5.039920209281437e307,5.049900249101796e307,5.059880288922156e307,5.069860328742515e307,5.079840368562874e307,5.089820408383234e307,5.099800448203593e307,5.109780488023952e307,5.119760527844311e307,5.129740567664671e307,5.13972060748503e307,5.149700647305389e307,5.159680687125749e307,5.169660726946107e307,5.179640766766467e307,5.189620806586826e307,5.199600846407186e307,5.209580886227545e307,5.219560926047904e307,5.229540965868264e307,5.239521005688622e307,5.249501045508982e307,5.259481085329341e307,5.269461125149701e307,5.27944116497006e307,5.28942120479042e307,5.299401244610779e307,5.309381284431137e307,5.319361324251497e307,5.329341364071856e307,5.339321403892216e307,5.349301443712575e307,5.359281483532935e307,5.369261523353294e307,5.379241563173652e307,5.389221602994012e307,5.399201642814371e307,5.409181682634731e307,5.41916172245509e307,5.42914176227545e307,5.439121802095809e307,5.449101841916167e307,5.459081881736527e307,5.469061921556886e307,5.479041961377246e307,5.489022001197605e307,5.499002041017965e307,5.508982080838323e307,5.518962120658682e307,5.528942160479042e307,5.538922200299401e307,5.548902240119761e307,5.55888227994012e307,5.56886231976048e307,5.578842359580838e307,5.588822399401197e307,5.598802439221557e307,5.608782479041916e307,5.618762518862276e307,5.628742558682635e307,5.638722598502995e307,5.648702638323353e307,5.658682678143712e307,5.668662717964072e307,5.678642757784431e307,5.688622797604791e307,5.69860283742515e307,5.70858287724551e307,5.718562917065868e307,5.728542956886227e307,5.738522996706587e307,5.748503036526946e307,5.758483076347306e307,5.768463116167665e307,5.778443155988024e307,5.788423195808383e307,5.798403235628742e307,5.808383275449102e307,5.818363315269461e307,5.828343355089821e307,5.83832339491018e307,5.848303434730539e307,5.858283474550898e307,5.868263514371257e307,5.878243554191617e307,5.888223594011976e307,5.898203633832336e307,5.908183673652695e307,5.918163713473054e307,5.928143753293413e307,5.938123793113772e307,5.948103832934132e307,5.958083872754491e307,5.968063912574851e307,5.97804395239521e307,5.988023992215569e307,5.998004032035928e307,6.007984071856287e307,6.017964111676647e307,6.027944151497006e307,6.037924191317366e307,6.047904231137724e307,6.057884270958084e307,6.067864310778443e307,6.077844350598802e307,6.087824390419162e307,6.097804430239521e307,6.107784470059881e307,6.117764509880239e307,6.127744549700599e307,6.137724589520958e307,6.147704629341317e307,6.157684669161677e307,6.167664708982036e307,6.177644748802396e307,6.187624788622754e307,6.197604828443114e307,6.207584868263473e307,6.217564908083832e307,6.227544947904192e307,6.237524987724551e307,6.247505027544911e307,6.257485067365269e307,6.267465107185629e307,6.277445147005988e307,6.287425186826347e307,6.297405226646707e307,6.307385266467066e307,6.317365306287426e307,6.327345346107784e307,6.337325385928144e307,6.347305425748503e307,6.357285465568862e307,6.367265505389222e307,6.377245545209581e307,6.38722558502994e307,6.397205624850299e307,6.407185664670659e307,6.417165704491018e307,6.427145744311377e307,6.437125784131737e307,6.447105823952096e307,6.457085863772455e307,6.467065903592814e307,6.477045943413174e307,6.487025983233533e307,6.497006023053892e307,6.506986062874252e307,6.516966102694611e307,6.52694614251497e307,6.536926182335329e307,6.546906222155689e307,6.556886261976048e307,6.566866301796407e307,6.576846341616767e307,6.586826381437126e307,6.596806421257485e307,6.606786461077844e307,6.616766500898204e307,6.626746540718563e307,6.636726580538922e307,6.646706620359282e307,6.65668666017964e307,6.6666667e307,6.676646739820359e307,6.686626779640719e307,6.696606819461078e307,6.706586859281437e307,6.716566899101797e307,6.726546938922155e307,6.736526978742515e307,6.746507018562874e307,6.756487058383234e307,6.766467098203593e307,6.776447138023952e307,6.786427177844312e307,6.79640721766467e307,6.80638725748503e307,6.816367297305389e307,6.826347337125749e307,6.836327376946108e307,6.846307416766467e307,6.856287456586827e307,6.866267496407185e307,6.876247536227545e307,6.886227576047904e307,6.896207615868264e307,6.906187655688623e307,6.916167695508982e307,6.926147735329341e307,6.9361277751497e307,6.94610781497006e307,6.956087854790419e307,6.966067894610779e307,6.976047934431138e307,6.986027974251497e307,6.996008014071856e307,7.005988053892215e307,7.015968093712575e307,7.025948133532934e307,7.035928173353294e307,7.045908213173653e307,7.055888252994012e307,7.065868292814371e307,7.07584833263473e307,7.08582837245509e307,7.095808412275449e307,7.105788452095809e307,7.115768491916168e307,7.125748531736527e307,7.135728571556886e307,7.145708611377245e307,7.155688651197605e307,7.165668691017964e307,7.175648730838324e307,7.185628770658683e307,7.195608810479042e307,7.205588850299401e307,7.21556889011976e307,7.22554892994012e307,7.235528969760479e307,7.245509009580839e307,7.255489049401198e307,7.265469089221556e307,7.275449129041916e307,7.285429168862275e307,7.295409208682635e307,7.305389248502994e307,7.315369288323354e307,7.325349328143713e307,7.3353293679640715e307,7.345309407784431e307,7.35528944760479e307,7.36526948742515e307,7.375249527245509e307,7.385229567065869e307,7.395209606886228e307,7.405189646706587e307,7.415169686526946e307,7.425149726347305e307,7.435129766167665e307,7.445109805988024e307,7.455089845808384e307,7.465069885628743e307,7.475049925449102e307,7.485029965269461e307,7.49501000508982e307,7.50499004491018e307,7.514970084730539e307,7.524950124550899e307,7.534930164371257e307,7.544910204191617e307,7.554890244011976e307,7.564870283832335e307,7.574850323652695e307,7.584830363473054e307,7.594810403293414e307,7.604790443113772e307,7.614770482934132e307,7.624750522754491e307,7.63473056257485e307,7.64471060239521e307,7.654690642215569e307,7.664670682035929e307,7.674650721856287e307,7.684630761676647e307,7.694610801497006e307,7.704590841317365e307,7.714570881137725e307,7.724550920958084e307,7.734530960778444e307,7.744511000598802e307,7.754491040419162e307,7.764471080239521e307,7.77445112005988e307,7.78443115988024e307,7.794411199700599e307,7.804391239520958e307,7.814371279341317e307,7.824351319161677e307,7.834331358982036e307,7.844311398802395e307,7.854291438622755e307,7.864271478443114e307,7.874251518263473e307,7.884231558083832e307,7.894211597904192e307,7.904191637724551e307,7.91417167754491e307,7.92415171736527e307,7.934131757185629e307,7.944111797005988e307,7.954091836826347e307,7.964071876646707e307,7.974051916467066e307,7.984031956287425e307,7.994011996107785e307,8.003992035928144e307,8.013972075748503e307,8.023952115568862e307,8.033932155389222e307,8.043912195209581e307,8.05389223502994e307,8.0638722748503e307,8.073852314670659e307,8.083832354491018e307,8.093812394311377e307,8.103792434131737e307,8.113772473952096e307,8.123752513772455e307,8.133732553592815e307,8.143712593413173e307,8.153692633233533e307,8.163672673053892e307,8.173652712874252e307,8.183632752694611e307,8.19361279251497e307,8.20359283233533e307,8.213572872155688e307,8.223552911976048e307,8.233532951796407e307,8.243512991616767e307,8.253493031437126e307,8.263473071257485e307,8.273453111077845e307,8.283433150898203e307,8.293413190718563e307,8.303393230538922e307,8.313373270359282e307,8.323353310179641e307,8.33333335e307,8.34331338982036e307,8.353293429640718e307,8.363273469461078e307,8.373253509281437e307,8.383233549101797e307,8.393213588922156e307,8.403193628742515e307,8.413173668562874e307,8.423153708383233e307,8.433133748203593e307,8.443113788023952e307,8.453093827844312e307,8.463073867664671e307,8.47305390748503e307,8.483033947305389e307,8.493013987125748e307,8.502994026946108e307,8.512974066766467e307,8.522954106586827e307,8.532934146407186e307,8.542914186227545e307,8.552894226047904e307,8.562874265868263e307,8.572854305688623e307,8.582834345508982e307,8.592814385329342e307,8.602794425149701e307,8.61277446497006e307,8.622754504790419e307,8.632734544610778e307,8.642714584431138e307,8.652694624251497e307,8.662674664071857e307,8.672654703892216e307,8.682634743712574e307,8.692614783532934e307,8.702594823353293e307,8.712574863173653e307,8.722554902994012e307,8.732534942814372e307,8.742514982634731e307,8.752495022455089e307,8.762475062275449e307,8.772455102095808e307,8.782435141916168e307,8.792415181736527e307,8.802395221556887e307,8.812375261377246e307,8.822355301197604e307,8.832335341017964e307,8.842315380838323e307,8.852295420658683e307,8.862275460479042e307,8.872255500299402e307,8.882235540119761e307,8.892215579940119e307,8.902195619760479e307,8.912175659580838e307,8.922155699401198e307,8.932135739221557e307,8.942115779041917e307,8.952095818862276e307,8.962075858682634e307,8.972055898502994e307,8.982035938323353e307,8.992015978143713e307,9.001996017964071e307,9.011976057784432e307,9.02195609760479e307,9.03193613742515e307,9.041916177245509e307,9.05189621706587e307,9.061876256886228e307,9.071856296706586e307,9.081836336526947e307,9.091816376347305e307,9.101796416167665e307,9.111776455988024e307,9.121756495808382e307,9.131736535628743e307,9.141716575449101e307,9.151696615269462e307,9.16167665508982e307,9.17165669491018e307,9.181636734730539e307,9.191616774550897e307,9.201596814371258e307,9.211576854191616e307,9.221556894011977e307,9.231536933832335e307,9.241516973652695e307,9.251497013473054e307,9.261477053293412e307,9.271457093113773e307,9.281437132934131e307,9.291417172754492e307,9.30139721257485e307,9.31137725239521e307,9.321357292215569e307,9.331337332035927e307,9.341317371856288e307,9.351297411676646e307,9.361277451497007e307,9.371257491317365e307,9.381237531137725e307,9.391217570958084e307,9.401197610778442e307,9.411177650598803e307,9.421157690419161e307,9.431137730239522e307,9.44111777005988e307,9.45109780988024e307,9.461077849700599e307,9.471057889520957e307,9.481037929341318e307,9.491017969161676e307,9.500998008982037e307,9.510978048802395e307,9.520958088622756e307,9.530938128443114e307,9.540918168263472e307,9.550898208083833e307,9.560878247904191e307,9.570858287724552e307,9.58083832754491e307,9.59081836736527e307,9.600798407185629e307,9.610778447005987e307,9.620758486826348e307,9.630738526646706e307,9.640718566467067e307,9.650698606287425e307,9.660678646107786e307,9.670658685928144e307,9.680638725748502e307,9.690618765568863e307,9.700598805389221e307,9.710578845209582e307,9.72055888502994e307,9.730538924850299e307,9.740518964670659e307,9.750499004491017e307,9.760479044311378e307,9.770459084131736e307,9.780439123952097e307,9.790419163772455e307,9.800399203592814e307,9.810379243413174e307,9.820359283233532e307,9.830339323053893e307,9.840319362874251e307,9.850299402694612e307,9.86027944251497e307,9.870259482335329e307,9.880239522155689e307,9.890219561976047e307,9.900199601796408e307,9.910179641616766e307,9.920159681437127e307,9.930139721257485e307,9.940119761077844e307,9.950099800898204e307,9.960079840718562e307,9.970059880538923e307,9.980039920359281e307,9.990019960179642e307,1.0e308]}
},{}],18:[function(require,module,exports){
module.exports={"expected":[-0.3217505543966422,-0.3168438224307561,-0.3120796760164739,-0.3074521961785023,-0.3029557752740939,-0.2985850976279289,-0.294335121522996,-0.29020106244517896,-0.2861783774871366,-0.2822627508243861,-0.2784500801832789,-0.27473646422683834,-0.2711181907902249,-0.26759172590294206,-0.2641537035398278,-0.26080091604741634,-0.2575303051964318,-0.25433895381502275,-0.2512240779608777,-0.24818301959361388,-0.24521323971181797,-0.2423123119218614,-0.23947791640813942,-0.23670783427669775,-0.23399994224634696,-0.2313522076633219,-0.2287626838173471,-0.22622950553862597,-0.22375088505679852,-0.221325108104313,-0.21895053024795272,-0.21662557343344555,-0.21434872272918318,-0.21211852325608463,-0.20993357729157186,-0.20779254153648433,-0.2056941245345502,-0.20363708423476667,-0.20162022568771457,-0.19964239886745958,-0.19770249661126707,-0.19579945266989365,-0.1939322398617105,-0.19209986832437126,-0.19030138385816184,-0.1885358663555586,-0.1868024283118889,-0.18510021341232094,-0.1834283951907268,-0.18178617575624872,-0.1801727845836721,-0.17858747736395603,-0.17702953491150733,-0.17549826212499942,-0.1739929869987386,-0.17251305968176917,-0.17105785158208164,-0.16962675451345283,-0.16821917988259638,-0.16683455791444554,-0.16547233691352042,-0.16413198255945596,-0.1628129772348817,-0.1615148193839508,-0.1602370228999188,-0.15897911654026242,-0.1577406433679205,-0.15652116021731857,-0.15532023718391677,-0.15413745713609217,-0.15297241524823457,-0.15182471855399748,-0.15069398551870608,-0.14957984562997848,-0.1484819390056697,-0.1473999160182968,-0.1463334369351488,-0.14528217157332893,-0.14424579896901743,-0.14322400706028066,-0.14221649238278922,-0.14122295977784072,-0.14024312211211482,-0.13927670000861866,-0.1383234215883087,-0.1373830222219009,-0.13645524429140785,-0.13553983696096322,-0.1346365559565182,-0.13374516335401304,-0.13286542737565035,-0.13199712219391097,-0.1311400277429755,-0.13029392953722826,-0.1294586184965368,-0.12863389077801696,-0.12781954761400413,-0.12701539515596902,-0.12622124432412438,-0.1254369106624854,-0.12466221419915427,-0.12389697931161303,-0.12314103459681663,-0.12239421274588971,-0.12165635042323845,-0.12092728814989843,-0.1202068701909467,-0.11949494444681533,-0.11879136234835003,-0.1180959787554651,-0.1174086518592522,-0.1167292430874075,-0.11605761701284707,-0.11539364126538648,-0.11473718644636594,-0.11408812604610775,-0.11344633636409746,-0.11281169643178458,-0.11218408793790431,-0.11156339515622443,-0.11094950487562696,-0.11034230633243693,-0.10974169114491525,-0.10914755324983556,-0.10855978884106827,-0.1079782963100986,-0.10740297618840829,-0.10683373109165328,-0.10627046566557269,-0.10571308653356719,-0.10516150224588712,-0.10461562323037311,-0.10407536174469444,-0.10354063183003247,-0.10301134926615876,-0.10248743152785894,-0.10196879774265588,-0.10145536864978763,-0.10094706656039662,-0.10044381531888888,-0.09994554026542377,-0.09945216819949548,-0.09896362734457015,-0.0984798473137424,-0.09800075907637808,-0.09752629492571005,-0.09705638844735534,-0.09659097448872389,-0.09612998912928897,-0.0956733696516919,-0.0952210545136534,-0.09477298332066567,-0.09432909679944043,-0.09388933677208806,-0.09345364613100508,-0.09302196881444712,-0.09259424978276605,-0.09217043499528997,-0.09175047138782619,-0.09133430685076777,-0.09092189020778464,-0.0905131711950815,-0.09010810044120479,-0.08970662944738217,-0.08930871056837796,-0.08891429699384897,-0.08852334273018574,-0.08813580258282425,-0.08775163213901416,-0.08737078775102995,-0.08699322651981156,-0.08661890627902225,-0.08624778557951066,-0.08587982367416588,-0.08551498050315373,-0.08515321667952284,-0.0847944934751704,-0.08443877280715664,-0.08408601722435828,-0.08373618989445111,-0.08338925459121231,-0.08304517568213349,-0.08270391811633541,-0.08236544741277624,-0.0820297296487446,-0.08169673144862993,-0.08136641997296205,-0.0810387629077126,-0.08071372845385098,-0.08039128531714819,-0.0800714026982209,-0.07975405028281021,-0.07943919823228791,-0.07912681717438436,-0.07881687819413205,-0.07850935282501888,-0.07820421304034575,-0.07790143124478244,-0.0776009802661174,-0.07730283334719538,-0.07700696413803856,-0.07671334668814596,-0.07642195543896678,-0.07613276521654276,-0.0758457512243155,-0.07556088903609405,-0.07527815458917919,-0.07499752417763976,-0.07471897444573744,-0.07444248238149626,-0.07416802531041289,-0.07389558088930438,-0.07362512710028961,-0.07335664224490136,-0.07309010493832555,-0.0728254941037643,-0.07256278896692021,-0.07230196905059831,-0.07204301416942299,-0.07178590442466723,-0.07153062019919101,-0.0712771421524865,-0.07102545121582732,-0.07077552858751936,-0.07052735572825057,-0.0702809143565376,-0.07003618644426657,-0.06979315421232604,-0.06955180012632987,-0.06931210689242774,-0.06907405745320128,-0.06883763498364383,-0.06860282288722185,-0.06836960479201598,-0.06813796454693997,-0.06790788621803555,-0.06767935408484162,-0.06745235263683581,-0.06722686656994706,-0.06700288078313721,-0.06678038037505021,-0.06655935064072749,-0.06633977706838769,-0.0661216453362696,-0.06590494130953665,-0.06568965103724159,-0.06547576074935008,-0.06526325685382192,-0.0650521259337483,-0.06484235474454426,-0.0646339302111948,-0.06442683942555355,-0.06422106964369292,-0.06401660828330447,-0.0638134429211484,-0.0636115612905512,-0.06341095127895029,-0.0632116009254846,-0.0630134984186303,-0.0628166320938804,-0.06262099043146749,-0.06242656205412864,-0.06223333572491147,-0.062041300345020665,-0.06185044495170392,-0.061660758716176475,-0.061472230941583696,-0.06128485106100041,-0.06109860863546665,-0.06091349335205888,-0.060729495021995906,-0.06054660357877881,-0.06036480907636422,-0.06018410168737014,-0.06000447170131376,-0.059825909522880534,-0.05964840567022382,-0.05947195077329462,-0.059296535572200645,-0.05912215091559412,-0.058948787759087934,-0.058776437163699215,-0.05860509029432016,-0.05843473841821525,-0.05826537290354444,-0.058096985217911984,-0.05792956692694,-0.05776310969286652,-0.057597605273167735,-0.057433045519203384,-0.057269422374885394,-0.057106727875369086,-0.05694495414576634,-0.05678409339988067,-0.05662413793896339,-0.056465080150490676,-0.05630691250696115,-0.05614962756471343,-0.05599321796276329,-0.055837676421660265,-0.055682995742363,-0.0555291688051332,-0.05537618856844781,-0.055224048067928966,-0.05507274041529147,-0.05492225879730748,-0.05477259647478793,-0.05462374678158063,-0.05447570312358444,-0.054328458977779395,-0.05418200789127246,-0.05403634348035865,-0.05389145942959698,-0.05374734949090144,-0.05360400748264625,-0.0534614272887854,-0.053319602857986106,-0.053178528202776014,-0.053038197398703774,-0.052898604583512844,-0.05275974395632822,-0.052621609776855954,-0.05248419636459504,-0.05234749809806164,-0.05221150941402536,-0.05207622480675726,-0.051941638827289555,-0.051807746082686665,-0.051674541235327505,-0.0515420190021987,-0.051410174154198685,-0.051279001515452304,-0.051148495962635966,-0.051018652424312916,-0.05088946588027859,-0.0507609313609159,-0.05063304394656016,-0.05050579876687357,-0.05037919100022911,-0.05025321587310353,-0.05012786865947949,-0.05000314468025659,-0.04987903930267099,-0.04975554793972383,-0.04963266604961792,-0.049510389135202774,-0.049388712743427814,-0.04926763246480357,-0.04914714393287071,-0.049027242823676924,-0.04890792485526126,-0.048789185787146104,-0.04867102141983637,-0.04855342759432601,-0.04843640019161161,-0.04831993513221298,-0.048204028375700564,-0.04808867592022973,-0.04797387380208156,-0.04785961809521027,-0.04774590491079706,-0.047632730396810194,-0.047520090737571435,-0.04740798215332847,-0.047296400899833405,-0.04718534326792721,-0.04707480558312992,-0.04696478420523653,-0.046855275527918704,-0.04674627597833179,-0.04663778201672742,-0.04652979013607151,-0.046422296861667364,-0.04631529875078418,-0.04620879239229052,-0.04610277440629283,-0.04599724144377898,-0.0458921901862666,-0.04578761734545618,-0.04568351966288902,-0.045579893909609655,-0.04547673688583295,-0.045374045420615704,-0.04527181637153256,-0.045170046624356405,-0.04506873309274299,-0.044967872717919764,-0.04486746246837891,-0.0447674993395744,-0.04466798035362317,-0.04456890255901013,-0.044470263030297254,-0.0443720588678363,-0.044274287197485516,-0.04417694517032996,-0.04408002996240546,-0.043983538774426324,-0.04388746883151644,-0.04379181738294403,-0.043696581701859735,-0.04360175908503818,-0.043507346852622863,-0.043413342347874306,-0.04331974293692149,-0.04322654600851653,-0.04313374897379236,-0.04304134926602367,-0.042949344340390855,-0.04285773167374694,-0.04276650876438749,-0.04267567313182347,-0.04258522231655694,-0.04249515387985963,-0.042405465403554304,-0.04231615448979881,-0.04222721876087299,-0.042138655858968095,-0.04205046344597895,-0.041962639203298714,-0.04187518083161609,-0.04178808605071521,-0.041701352599277895,-0.04161497823468839,-0.04152896073284058,-0.04144329788794745,-0.04135798751235301,-0.04127302743634656,-0.04118841550797901,-0.04110414959288175,-0.04102022757408752,-0.040936647351853525,-0.040853406843486734,-0.04077050398317126,-0.040687936721797845,-0.040605703026795406,-0.040523800881964625,-0.04044222828731352,-0.04036098325889499,-0.0402800638286464,-0.0401994680442309,-0.04011919396888084,-0.040039239681242914,-0.03995960327522523,-0.039880282859846156,-0.03980127655908492,-0.03972258251173409,-0.03964419887125369,-0.039566123805627094,-0.03948835549721856,-0.039410892142632506,-0.03933373195257439,-0.03925687315171323,-0.03918031397854571,-0.03910405268526191,-0.03902808753761254,-0.038952416814777784,-0.03887703880923758,-0.0388019518266435,-0.03872715418569199,-0.03865264421799918,-0.03857842026797708,-0.03850448069271117,-0.03843082386183942,-0.0383574481574328,-0.038284351973876876,-0.03821153371775507,-0.03813899180773301,-0.03806672467444436,-0.03799473076037781,-0.0379230085197654,-0.03785155641847215,-0.03778037293388685,-0.0377094565548141,-0.03763880578136761,-0.03756841912486462,-0.03749829510772156,-0.037428432263350866,-0.03735882913605887,-0.03728948428094495,-0.0372203962638017,-0.03715156366101622,-0.037082985059472565,-0.03701465905645517,-0.036946584259553404,-0.03687875928656716,-0.03681118276541351,-0.03674385333403423,-0.03667676964030463,-0.03660993034194304,-0.03654333410642158,-0.03647697961087763,-0.03641086554202652,-0.03634499059607497,-0.03627935347863554,-0.03621395290464202,-0.03614878759826571,-0.03608385629283262,-0.03601915773074147,-0.03595469066338271,-0.03589045385105832,-0.03582644606290247,-0.035762666076803035,-0.03569911267932397],"x":[-3.0,-3.049800796812749,-3.099601593625498,-3.149402390438247,-3.199203187250996,-3.249003984063745,-3.298804780876494,-3.348605577689243,-3.398406374501992,-3.448207171314741,-3.49800796812749,-3.547808764940239,-3.597609561752988,-3.647410358565737,-3.697211155378486,-3.747011952191235,-3.7968127490039842,-3.846613545816733,-3.896414342629482,-3.946215139442231,-3.99601593625498,-4.0458167330677295,-4.095617529880478,-4.145418326693227,-4.195219123505976,-4.245019920318725,-4.294820717131474,-4.344621513944223,-4.394422310756972,-4.444223107569721,-4.49402390438247,-4.543824701195219,-4.5936254980079685,-4.643426294820717,-4.693227091633466,-4.743027888446215,-4.792828685258964,-4.842629482071713,-4.892430278884462,-4.942231075697211,-4.99203187250996,-5.04183266932271,-5.091633466135458,-5.1414342629482075,-5.191235059760956,-5.241035856573705,-5.290836653386454,-5.340637450199203,-5.390438247011952,-5.440239043824701,-5.49003984063745,-5.539840637450199,-5.589641434262949,-5.639442231075697,-5.6892430278884465,-5.739043824701195,-5.788844621513944,-5.838645418326693,-5.888446215139442,-5.938247011952191,-5.98804780876494,-6.03784860557769,-6.087649402390438,-6.137450199203188,-6.187250996015936,-6.2370517928286855,-6.286852589641434,-6.336653386454183,-6.386454183266932,-6.436254980079681,-6.48605577689243,-6.535856573705179,-6.585657370517929,-6.635458167330677,-6.685258964143427,-6.735059760956175,-6.7848605577689245,-6.834661354581673,-6.884462151394422,-6.934262948207171,-6.98406374501992,-7.03386454183267,-7.083665338645418,-7.133466135458168,-7.183266932270916,-7.233067729083666,-7.282868525896414,-7.3326693227091635,-7.382470119521912,-7.432270916334661,-7.48207171314741,-7.531872509960159,-7.581673306772909,-7.631474103585657,-7.681274900398407,-7.731075697211155,-7.780876494023905,-7.830677290836653,-7.8804780876494025,-7.930278884462151,-7.9800796812749,-8.02988047808765,-8.079681274900398,-8.129482071713147,-8.179282868525897,-8.229083665338646,-8.278884462151394,-8.328685258964143,-8.378486055776893,-8.428286852589641,-8.47808764940239,-8.52788844621514,-8.577689243027889,-8.627490039840637,-8.677290836653386,-8.727091633466136,-8.776892430278885,-8.826693227091633,-8.876494023904382,-8.926294820717132,-8.97609561752988,-9.025896414342629,-9.07569721115538,-9.125498007968128,-9.175298804780876,-9.225099601593625,-9.274900398406375,-9.324701195219124,-9.374501992031872,-9.42430278884462,-9.474103585657371,-9.52390438247012,-9.573705179282868,-9.623505976095618,-9.673306772908367,-9.723107569721115,-9.772908366533864,-9.822709163346614,-9.872509960159363,-9.922310756972111,-9.97211155378486,-10.02191235059761,-10.071713147410359,-10.121513944223107,-10.171314741035857,-10.221115537848606,-10.270916334661354,-10.320717131474103,-10.370517928286853,-10.420318725099602,-10.47011952191235,-10.5199203187251,-10.569721115537849,-10.619521912350598,-10.669322709163346,-10.719123505976096,-10.768924302788845,-10.818725099601593,-10.868525896414342,-10.918326693227092,-10.96812749003984,-11.01792828685259,-11.06772908366534,-11.117529880478088,-11.167330677290837,-11.217131474103585,-11.266932270916335,-11.316733067729084,-11.366533864541832,-11.41633466135458,-11.466135458167331,-11.51593625498008,-11.565737051792828,-11.615537848605578,-11.665338645418327,-11.715139442231076,-11.764940239043824,-11.814741035856574,-11.864541832669323,-11.914342629482071,-11.96414342629482,-12.01394422310757,-12.063745019920319,-12.113545816733067,-12.163346613545817,-12.213147410358566,-12.262948207171315,-12.312749003984063,-12.362549800796813,-12.412350597609562,-12.46215139442231,-12.51195219123506,-12.56175298804781,-12.611553784860558,-12.661354581673306,-12.711155378486056,-12.760956175298805,-12.810756972111554,-12.860557768924302,-12.910358565737052,-12.9601593625498,-13.00996015936255,-13.0597609561753,-13.109561752988048,-13.159362549800797,-13.209163346613545,-13.258964143426295,-13.308764940239044,-13.358565737051793,-13.408366533864541,-13.458167330677291,-13.50796812749004,-13.557768924302788,-13.607569721115539,-13.657370517928287,-13.707171314741036,-13.756972111553784,-13.806772908366534,-13.856573705179283,-13.906374501992032,-13.95617529880478,-14.00597609561753,-14.055776892430279,-14.105577689243027,-14.155378486055778,-14.205179282868526,-14.254980079681275,-14.304780876494023,-14.354581673306773,-14.404382470119522,-14.45418326693227,-14.50398406374502,-14.55378486055777,-14.603585657370518,-14.653386454183266,-14.703187250996017,-14.752988047808765,-14.802788844621514,-14.852589641434262,-14.902390438247012,-14.952191235059761,-15.00199203187251,-15.05179282868526,-15.101593625498008,-15.151394422310757,-15.201195219123505,-15.250996015936256,-15.300796812749004,-15.350597609561753,-15.400398406374501,-15.450199203187251,-15.5,-15.549800796812749,-15.599601593625499,-15.649402390438247,-15.699203187250996,-15.749003984063744,-15.798804780876495,-15.848605577689243,-15.898406374501992,-15.94820717131474,-15.99800796812749,-16.04780876494024,-16.09760956175299,-16.147410358565736,-16.197211155378486,-16.247011952191237,-16.296812749003983,-16.346613545816734,-16.39641434262948,-16.44621513944223,-16.49601593625498,-16.545816733067728,-16.595617529880478,-16.64541832669323,-16.695219123505975,-16.745019920318725,-16.794820717131476,-16.844621513944222,-16.894422310756973,-16.94422310756972,-16.99402390438247,-17.04382470119522,-17.093625498007967,-17.143426294820717,-17.193227091633467,-17.243027888446214,-17.292828685258964,-17.342629482071715,-17.39243027888446,-17.44223107569721,-17.49203187250996,-17.54183266932271,-17.59163346613546,-17.641434262948206,-17.691235059760956,-17.741035856573706,-17.790836653386453,-17.840637450199203,-17.890438247011954,-17.9402390438247,-17.99003984063745,-18.0398406374502,-18.089641434262948,-18.139442231075698,-18.189243027888445,-18.239043824701195,-18.288844621513945,-18.338645418326692,-18.388446215139442,-18.438247011952193,-18.48804780876494,-18.53784860557769,-18.58764940239044,-18.637450199203187,-18.687250996015937,-18.737051792828684,-18.786852589641434,-18.836653386454184,-18.88645418326693,-18.93625498007968,-18.98605577689243,-19.03585657370518,-19.08565737051793,-19.13545816733068,-19.185258964143426,-19.235059760956176,-19.284860557768923,-19.334661354581673,-19.384462151394423,-19.43426294820717,-19.48406374501992,-19.53386454183267,-19.583665338645417,-19.633466135458168,-19.683266932270918,-19.733067729083665,-19.782868525896415,-19.83266932270916,-19.882470119521912,-19.932270916334662,-19.98207171314741,-20.03187250996016,-20.08167330677291,-20.131474103585656,-20.181274900398407,-20.231075697211157,-20.280876494023904,-20.330677290836654,-20.3804780876494,-20.43027888446215,-20.4800796812749,-20.529880478087648,-20.5796812749004,-20.62948207171315,-20.679282868525895,-20.729083665338646,-20.778884462151396,-20.828685258964143,-20.878486055776893,-20.92828685258964,-20.97808764940239,-21.02788844621514,-21.077689243027887,-21.127490039840637,-21.177290836653388,-21.227091633466134,-21.276892430278885,-21.326693227091635,-21.37649402390438,-21.426294820717132,-21.47609561752988,-21.52589641434263,-21.57569721115538,-21.625498007968126,-21.675298804780876,-21.725099601593627,-21.774900398406373,-21.824701195219124,-21.874501992031874,-21.92430278884462,-21.97410358565737,-22.02390438247012,-22.073705179282868,-22.12350597609562,-22.173306772908365,-22.223107569721115,-22.272908366533866,-22.322709163346612,-22.372509960159363,-22.422310756972113,-22.47211155378486,-22.52191235059761,-22.57171314741036,-22.621513944223107,-22.671314741035857,-22.721115537848604,-22.770916334661354,-22.820717131474105,-22.87051792828685,-22.9203187250996,-22.970119521912352,-23.0199203187251,-23.06972111553785,-23.1195219123506,-23.169322709163346,-23.219123505976096,-23.268924302788843,-23.318725099601593,-23.368525896414344,-23.41832669322709,-23.46812749003984,-23.51792828685259,-23.567729083665338,-23.617529880478088,-23.66733067729084,-23.717131474103585,-23.766932270916335,-23.816733067729082,-23.866533864541832,-23.916334661354583,-23.96613545816733,-24.01593625498008,-24.06573705179283,-24.115537848605577,-24.165338645418327,-24.215139442231077,-24.264940239043824,-24.314741035856574,-24.36454183266932,-24.41434262948207,-24.46414342629482,-24.51394422310757,-24.56374501992032,-24.61354581673307,-24.663346613545816,-24.713147410358566,-24.762948207171316,-24.812749003984063,-24.862549800796813,-24.91235059760956,-24.96215139442231,-25.01195219123506,-25.061752988047807,-25.111553784860558,-25.161354581673308,-25.211155378486055,-25.260956175298805,-25.310756972111555,-25.360557768924302,-25.410358565737052,-25.4601593625498,-25.50996015936255,-25.5597609561753,-25.609561752988046,-25.659362549800797,-25.709163346613547,-25.758964143426294,-25.808764940239044,-25.858565737051794,-25.90836653386454,-25.95816733067729,-26.00796812749004,-26.05776892430279,-26.10756972111554,-26.157370517928285,-26.207171314741036,-26.256972111553786,-26.306772908366533,-26.356573705179283,-26.406374501992033,-26.45617529880478,-26.50597609561753,-26.55577689243028,-26.605577689243027,-26.655378486055778,-26.705179282868524,-26.754980079681275,-26.804780876494025,-26.85458167330677,-26.904382470119522,-26.954183266932272,-27.00398406374502,-27.05378486055777,-27.10358565737052,-27.153386454183266,-27.203187250996017,-27.252988047808763,-27.302788844621514,-27.352589641434264,-27.40239043824701,-27.45219123505976,-27.50199203187251,-27.551792828685258,-27.60159362549801,-27.65139442231076,-27.701195219123505,-27.750996015936256,-27.800796812749002,-27.850597609561753,-27.900398406374503,-27.95019920318725,-28.0]}
},{}],19:[function(require,module,exports){
module.exports={"expected":[0.3217505543966422,0.3168438224307561,0.3120796760164739,0.3074521961785023,0.3029557752740939,0.2985850976279289,0.294335121522996,0.29020106244517896,0.2861783774871366,0.2822627508243861,0.2784500801832789,0.27473646422683834,0.2711181907902249,0.26759172590294206,0.2641537035398278,0.26080091604741634,0.2575303051964318,0.25433895381502275,0.2512240779608777,0.24818301959361388,0.24521323971181797,0.2423123119218614,0.23947791640813942,0.23670783427669775,0.23399994224634696,0.2313522076633219,0.2287626838173471,0.22622950553862597,0.22375088505679852,0.221325108104313,0.21895053024795272,0.21662557343344555,0.21434872272918318,0.21211852325608463,0.20993357729157186,0.20779254153648433,0.2056941245345502,0.20363708423476667,0.20162022568771457,0.19964239886745958,0.19770249661126707,0.19579945266989365,0.1939322398617105,0.19209986832437126,0.19030138385816184,0.1885358663555586,0.1868024283118889,0.18510021341232094,0.1834283951907268,0.18178617575624872,0.1801727845836721,0.17858747736395603,0.17702953491150733,0.17549826212499942,0.1739929869987386,0.17251305968176917,0.17105785158208164,0.16962675451345283,0.16821917988259638,0.16683455791444554,0.16547233691352042,0.16413198255945596,0.1628129772348817,0.1615148193839508,0.1602370228999188,0.15897911654026242,0.1577406433679205,0.15652116021731857,0.15532023718391677,0.15413745713609217,0.15297241524823457,0.15182471855399748,0.15069398551870608,0.14957984562997848,0.1484819390056697,0.1473999160182968,0.1463334369351488,0.14528217157332893,0.14424579896901743,0.14322400706028066,0.14221649238278922,0.14122295977784072,0.14024312211211482,0.13927670000861866,0.1383234215883087,0.1373830222219009,0.13645524429140785,0.13553983696096322,0.1346365559565182,0.13374516335401304,0.13286542737565035,0.13199712219391097,0.1311400277429755,0.13029392953722826,0.1294586184965368,0.12863389077801696,0.12781954761400413,0.12701539515596902,0.12622124432412438,0.1254369106624854,0.12466221419915427,0.12389697931161303,0.12314103459681663,0.12239421274588971,0.12165635042323845,0.12092728814989843,0.1202068701909467,0.11949494444681533,0.11879136234835003,0.1180959787554651,0.1174086518592522,0.1167292430874075,0.11605761701284707,0.11539364126538648,0.11473718644636594,0.11408812604610775,0.11344633636409746,0.11281169643178458,0.11218408793790431,0.11156339515622443,0.11094950487562696,0.11034230633243693,0.10974169114491525,0.10914755324983556,0.10855978884106827,0.1079782963100986,0.10740297618840829,0.10683373109165328,0.10627046566557269,0.10571308653356719,0.10516150224588712,0.10461562323037311,0.10407536174469444,0.10354063183003247,0.10301134926615876,0.10248743152785894,0.10196879774265588,0.10145536864978763,0.10094706656039662,0.10044381531888888,0.09994554026542377,0.09945216819949548,0.09896362734457015,0.0984798473137424,0.09800075907637808,0.09752629492571005,0.09705638844735534,0.09659097448872389,0.09612998912928897,0.0956733696516919,0.0952210545136534,0.09477298332066567,0.09432909679944043,0.09388933677208806,0.09345364613100508,0.09302196881444712,0.09259424978276605,0.09217043499528997,0.09175047138782619,0.09133430685076777,0.09092189020778464,0.0905131711950815,0.09010810044120479,0.08970662944738217,0.08930871056837796,0.08891429699384897,0.08852334273018574,0.08813580258282425,0.08775163213901416,0.08737078775102995,0.08699322651981156,0.08661890627902225,0.08624778557951066,0.08587982367416588,0.08551498050315373,0.08515321667952284,0.0847944934751704,0.08443877280715664,0.08408601722435828,0.08373618989445111,0.08338925459121231,0.08304517568213349,0.08270391811633541,0.08236544741277624,0.0820297296487446,0.08169673144862993,0.08136641997296205,0.0810387629077126,0.08071372845385098,0.08039128531714819,0.0800714026982209,0.07975405028281021,0.07943919823228791,0.07912681717438436,0.07881687819413205,0.07850935282501888,0.07820421304034575,0.07790143124478244,0.0776009802661174,0.07730283334719538,0.07700696413803856,0.07671334668814596,0.07642195543896678,0.07613276521654276,0.0758457512243155,0.07556088903609405,0.07527815458917919,0.07499752417763976,0.07471897444573744,0.07444248238149626,0.07416802531041289,0.07389558088930438,0.07362512710028961,0.07335664224490136,0.07309010493832555,0.0728254941037643,0.07256278896692021,0.07230196905059831,0.07204301416942299,0.07178590442466723,0.07153062019919101,0.0712771421524865,0.07102545121582732,0.07077552858751936,0.07052735572825057,0.0702809143565376,0.07003618644426657,0.06979315421232604,0.06955180012632987,0.06931210689242774,0.06907405745320128,0.06883763498364383,0.06860282288722185,0.06836960479201598,0.06813796454693997,0.06790788621803555,0.06767935408484162,0.06745235263683581,0.06722686656994706,0.06700288078313721,0.06678038037505021,0.06655935064072749,0.06633977706838769,0.0661216453362696,0.06590494130953665,0.06568965103724159,0.06547576074935008,0.06526325685382192,0.0650521259337483,0.06484235474454426,0.0646339302111948,0.06442683942555355,0.06422106964369292,0.06401660828330447,0.0638134429211484,0.0636115612905512,0.06341095127895029,0.0632116009254846,0.0630134984186303,0.0628166320938804,0.06262099043146749,0.06242656205412864,0.06223333572491147,0.062041300345020665,0.06185044495170392,0.061660758716176475,0.061472230941583696,0.06128485106100041,0.06109860863546665,0.06091349335205888,0.060729495021995906,0.06054660357877881,0.06036480907636422,0.06018410168737014,0.06000447170131376,0.059825909522880534,0.05964840567022382,0.05947195077329462,0.059296535572200645,0.05912215091559412,0.058948787759087934,0.058776437163699215,0.05860509029432016,0.05843473841821525,0.05826537290354444,0.058096985217911984,0.05792956692694,0.05776310969286652,0.057597605273167735,0.057433045519203384,0.057269422374885394,0.057106727875369086,0.05694495414576634,0.05678409339988067,0.05662413793896339,0.056465080150490676,0.05630691250696115,0.05614962756471343,0.05599321796276329,0.055837676421660265,0.055682995742363,0.0555291688051332,0.05537618856844781,0.055224048067928966,0.05507274041529147,0.05492225879730748,0.05477259647478793,0.05462374678158063,0.05447570312358444,0.054328458977779395,0.05418200789127246,0.05403634348035865,0.05389145942959698,0.05374734949090144,0.05360400748264625,0.0534614272887854,0.053319602857986106,0.053178528202776014,0.053038197398703774,0.052898604583512844,0.05275974395632822,0.052621609776855954,0.05248419636459504,0.05234749809806164,0.05221150941402536,0.05207622480675726,0.051941638827289555,0.051807746082686665,0.051674541235327505,0.0515420190021987,0.051410174154198685,0.051279001515452304,0.051148495962635966,0.051018652424312916,0.05088946588027859,0.0507609313609159,0.05063304394656016,0.05050579876687357,0.05037919100022911,0.05025321587310353,0.05012786865947949,0.05000314468025659,0.04987903930267099,0.04975554793972383,0.04963266604961792,0.049510389135202774,0.049388712743427814,0.04926763246480357,0.04914714393287071,0.049027242823676924,0.04890792485526126,0.048789185787146104,0.04867102141983637,0.04855342759432601,0.04843640019161161,0.04831993513221298,0.048204028375700564,0.04808867592022973,0.04797387380208156,0.04785961809521027,0.04774590491079706,0.047632730396810194,0.047520090737571435,0.04740798215332847,0.047296400899833405,0.04718534326792721,0.04707480558312992,0.04696478420523653,0.046855275527918704,0.04674627597833179,0.04663778201672742,0.04652979013607151,0.046422296861667364,0.04631529875078418,0.04620879239229052,0.04610277440629283,0.04599724144377898,0.0458921901862666,0.04578761734545618,0.04568351966288902,0.045579893909609655,0.04547673688583295,0.045374045420615704,0.04527181637153256,0.045170046624356405,0.04506873309274299,0.044967872717919764,0.04486746246837891,0.0447674993395744,0.04466798035362317,0.04456890255901013,0.044470263030297254,0.0443720588678363,0.044274287197485516,0.04417694517032996,0.04408002996240546,0.043983538774426324,0.04388746883151644,0.04379181738294403,0.043696581701859735,0.04360175908503818,0.043507346852622863,0.043413342347874306,0.04331974293692149,0.04322654600851653,0.04313374897379236,0.04304134926602367,0.042949344340390855,0.04285773167374694,0.04276650876438749,0.04267567313182347,0.04258522231655694,0.04249515387985963,0.042405465403554304,0.04231615448979881,0.04222721876087299,0.042138655858968095,0.04205046344597895,0.041962639203298714,0.04187518083161609,0.04178808605071521,0.041701352599277895,0.04161497823468839,0.04152896073284058,0.04144329788794745,0.04135798751235301,0.04127302743634656,0.04118841550797901,0.04110414959288175,0.04102022757408752,0.040936647351853525,0.040853406843486734,0.04077050398317126,0.040687936721797845,0.040605703026795406,0.040523800881964625,0.04044222828731352,0.04036098325889499,0.0402800638286464,0.0401994680442309,0.04011919396888084,0.040039239681242914,0.03995960327522523,0.039880282859846156,0.03980127655908492,0.03972258251173409,0.03964419887125369,0.039566123805627094,0.03948835549721856,0.039410892142632506,0.03933373195257439,0.03925687315171323,0.03918031397854571,0.03910405268526191,0.03902808753761254,0.038952416814777784,0.03887703880923758,0.0388019518266435,0.03872715418569199,0.03865264421799918,0.03857842026797708,0.03850448069271117,0.03843082386183942,0.0383574481574328,0.038284351973876876,0.03821153371775507,0.03813899180773301,0.03806672467444436,0.03799473076037781,0.0379230085197654,0.03785155641847215,0.03778037293388685,0.0377094565548141,0.03763880578136761,0.03756841912486462,0.03749829510772156,0.037428432263350866,0.03735882913605887,0.03728948428094495,0.0372203962638017,0.03715156366101622,0.037082985059472565,0.03701465905645517,0.036946584259553404,0.03687875928656716,0.03681118276541351,0.03674385333403423,0.03667676964030463,0.03660993034194304,0.03654333410642158,0.03647697961087763,0.03641086554202652,0.03634499059607497,0.03627935347863554,0.03621395290464202,0.03614878759826571,0.03608385629283262,0.03601915773074147,0.03595469066338271,0.03589045385105832,0.03582644606290247,0.035762666076803035,0.03569911267932397],"x":[3.0,3.049800796812749,3.099601593625498,3.149402390438247,3.199203187250996,3.249003984063745,3.298804780876494,3.348605577689243,3.398406374501992,3.448207171314741,3.49800796812749,3.547808764940239,3.597609561752988,3.647410358565737,3.697211155378486,3.747011952191235,3.7968127490039842,3.846613545816733,3.896414342629482,3.946215139442231,3.99601593625498,4.0458167330677295,4.095617529880478,4.145418326693227,4.195219123505976,4.245019920318725,4.294820717131474,4.344621513944223,4.394422310756972,4.444223107569721,4.49402390438247,4.543824701195219,4.5936254980079685,4.643426294820717,4.693227091633466,4.743027888446215,4.792828685258964,4.842629482071713,4.892430278884462,4.942231075697211,4.99203187250996,5.04183266932271,5.091633466135458,5.1414342629482075,5.191235059760956,5.241035856573705,5.290836653386454,5.340637450199203,5.390438247011952,5.440239043824701,5.49003984063745,5.539840637450199,5.589641434262949,5.639442231075697,5.6892430278884465,5.739043824701195,5.788844621513944,5.838645418326693,5.888446215139442,5.938247011952191,5.98804780876494,6.03784860557769,6.087649402390438,6.137450199203188,6.187250996015936,6.2370517928286855,6.286852589641434,6.336653386454183,6.386454183266932,6.436254980079681,6.48605577689243,6.535856573705179,6.585657370517929,6.635458167330677,6.685258964143427,6.735059760956175,6.7848605577689245,6.834661354581673,6.884462151394422,6.934262948207171,6.98406374501992,7.03386454183267,7.083665338645418,7.133466135458168,7.183266932270916,7.233067729083666,7.282868525896414,7.3326693227091635,7.382470119521912,7.432270916334661,7.48207171314741,7.531872509960159,7.581673306772909,7.631474103585657,7.681274900398407,7.731075697211155,7.780876494023905,7.830677290836653,7.8804780876494025,7.930278884462151,7.9800796812749,8.02988047808765,8.079681274900398,8.129482071713147,8.179282868525897,8.229083665338646,8.278884462151394,8.328685258964143,8.378486055776893,8.428286852589641,8.47808764940239,8.52788844621514,8.577689243027889,8.627490039840637,8.677290836653386,8.727091633466136,8.776892430278885,8.826693227091633,8.876494023904382,8.926294820717132,8.97609561752988,9.025896414342629,9.07569721115538,9.125498007968128,9.175298804780876,9.225099601593625,9.274900398406375,9.324701195219124,9.374501992031872,9.42430278884462,9.474103585657371,9.52390438247012,9.573705179282868,9.623505976095618,9.673306772908367,9.723107569721115,9.772908366533864,9.822709163346614,9.872509960159363,9.922310756972111,9.97211155378486,10.02191235059761,10.071713147410359,10.121513944223107,10.171314741035857,10.221115537848606,10.270916334661354,10.320717131474103,10.370517928286853,10.420318725099602,10.47011952191235,10.5199203187251,10.569721115537849,10.619521912350598,10.669322709163346,10.719123505976096,10.768924302788845,10.818725099601593,10.868525896414342,10.918326693227092,10.96812749003984,11.01792828685259,11.06772908366534,11.117529880478088,11.167330677290837,11.217131474103585,11.266932270916335,11.316733067729084,11.366533864541832,11.41633466135458,11.466135458167331,11.51593625498008,11.565737051792828,11.615537848605578,11.665338645418327,11.715139442231076,11.764940239043824,11.814741035856574,11.864541832669323,11.914342629482071,11.96414342629482,12.01394422310757,12.063745019920319,12.113545816733067,12.163346613545817,12.213147410358566,12.262948207171315,12.312749003984063,12.362549800796813,12.412350597609562,12.46215139442231,12.51195219123506,12.56175298804781,12.611553784860558,12.661354581673306,12.711155378486056,12.760956175298805,12.810756972111554,12.860557768924302,12.910358565737052,12.9601593625498,13.00996015936255,13.0597609561753,13.109561752988048,13.159362549800797,13.209163346613545,13.258964143426295,13.308764940239044,13.358565737051793,13.408366533864541,13.458167330677291,13.50796812749004,13.557768924302788,13.607569721115539,13.657370517928287,13.707171314741036,13.756972111553784,13.806772908366534,13.856573705179283,13.906374501992032,13.95617529880478,14.00597609561753,14.055776892430279,14.105577689243027,14.155378486055778,14.205179282868526,14.254980079681275,14.304780876494023,14.354581673306773,14.404382470119522,14.45418326693227,14.50398406374502,14.55378486055777,14.603585657370518,14.653386454183266,14.703187250996017,14.752988047808765,14.802788844621514,14.852589641434262,14.902390438247012,14.952191235059761,15.00199203187251,15.05179282868526,15.101593625498008,15.151394422310757,15.201195219123505,15.250996015936256,15.300796812749004,15.350597609561753,15.400398406374501,15.450199203187251,15.5,15.549800796812749,15.599601593625499,15.649402390438247,15.699203187250996,15.749003984063744,15.798804780876495,15.848605577689243,15.898406374501992,15.94820717131474,15.99800796812749,16.04780876494024,16.09760956175299,16.147410358565736,16.197211155378486,16.247011952191237,16.296812749003983,16.346613545816734,16.39641434262948,16.44621513944223,16.49601593625498,16.545816733067728,16.595617529880478,16.64541832669323,16.695219123505975,16.745019920318725,16.794820717131476,16.844621513944222,16.894422310756973,16.94422310756972,16.99402390438247,17.04382470119522,17.093625498007967,17.143426294820717,17.193227091633467,17.243027888446214,17.292828685258964,17.342629482071715,17.39243027888446,17.44223107569721,17.49203187250996,17.54183266932271,17.59163346613546,17.641434262948206,17.691235059760956,17.741035856573706,17.790836653386453,17.840637450199203,17.890438247011954,17.9402390438247,17.99003984063745,18.0398406374502,18.089641434262948,18.139442231075698,18.189243027888445,18.239043824701195,18.288844621513945,18.338645418326692,18.388446215139442,18.438247011952193,18.48804780876494,18.53784860557769,18.58764940239044,18.637450199203187,18.687250996015937,18.737051792828684,18.786852589641434,18.836653386454184,18.88645418326693,18.93625498007968,18.98605577689243,19.03585657370518,19.08565737051793,19.13545816733068,19.185258964143426,19.235059760956176,19.284860557768923,19.334661354581673,19.384462151394423,19.43426294820717,19.48406374501992,19.53386454183267,19.583665338645417,19.633466135458168,19.683266932270918,19.733067729083665,19.782868525896415,19.83266932270916,19.882470119521912,19.932270916334662,19.98207171314741,20.03187250996016,20.08167330677291,20.131474103585656,20.181274900398407,20.231075697211157,20.280876494023904,20.330677290836654,20.3804780876494,20.43027888446215,20.4800796812749,20.529880478087648,20.5796812749004,20.62948207171315,20.679282868525895,20.729083665338646,20.778884462151396,20.828685258964143,20.878486055776893,20.92828685258964,20.97808764940239,21.02788844621514,21.077689243027887,21.127490039840637,21.177290836653388,21.227091633466134,21.276892430278885,21.326693227091635,21.37649402390438,21.426294820717132,21.47609561752988,21.52589641434263,21.57569721115538,21.625498007968126,21.675298804780876,21.725099601593627,21.774900398406373,21.824701195219124,21.874501992031874,21.92430278884462,21.97410358565737,22.02390438247012,22.073705179282868,22.12350597609562,22.173306772908365,22.223107569721115,22.272908366533866,22.322709163346612,22.372509960159363,22.422310756972113,22.47211155378486,22.52191235059761,22.57171314741036,22.621513944223107,22.671314741035857,22.721115537848604,22.770916334661354,22.820717131474105,22.87051792828685,22.9203187250996,22.970119521912352,23.0199203187251,23.06972111553785,23.1195219123506,23.169322709163346,23.219123505976096,23.268924302788843,23.318725099601593,23.368525896414344,23.41832669322709,23.46812749003984,23.51792828685259,23.567729083665338,23.617529880478088,23.66733067729084,23.717131474103585,23.766932270916335,23.816733067729082,23.866533864541832,23.916334661354583,23.96613545816733,24.01593625498008,24.06573705179283,24.115537848605577,24.165338645418327,24.215139442231077,24.264940239043824,24.314741035856574,24.36454183266932,24.41434262948207,24.46414342629482,24.51394422310757,24.56374501992032,24.61354581673307,24.663346613545816,24.713147410358566,24.762948207171316,24.812749003984063,24.862549800796813,24.91235059760956,24.96215139442231,25.01195219123506,25.061752988047807,25.111553784860558,25.161354581673308,25.211155378486055,25.260956175298805,25.310756972111555,25.360557768924302,25.410358565737052,25.4601593625498,25.50996015936255,25.5597609561753,25.609561752988046,25.659362549800797,25.709163346613547,25.758964143426294,25.808764940239044,25.858565737051794,25.90836653386454,25.95816733067729,26.00796812749004,26.05776892430279,26.10756972111554,26.157370517928285,26.207171314741036,26.256972111553786,26.306772908366533,26.356573705179283,26.406374501992033,26.45617529880478,26.50597609561753,26.55577689243028,26.605577689243027,26.655378486055778,26.705179282868524,26.754980079681275,26.804780876494025,26.85458167330677,26.904382470119522,26.954183266932272,27.00398406374502,27.05378486055777,27.10358565737052,27.153386454183266,27.203187250996017,27.252988047808763,27.302788844621514,27.352589641434264,27.40239043824701,27.45219123505976,27.50199203187251,27.551792828685258,27.60159362549801,27.65139442231076,27.701195219123505,27.750996015936256,27.800796812749002,27.850597609561753,27.900398406374503,27.95019920318725,28.0]}
},{}],20:[function(require,module,exports){
module.exports={"expected":[-0.03569911267932397,-0.03551733397670141,-0.03533739635104694,-0.03515927198478589,-0.034982933617716636,-0.03480835453312581,-0.0346355085443165,-0.03446436998153492,-0.03429491367928208,-0.034127114963997174,-0.03396094964210002,-0.033796393988380566,-0.03363342473472359,-0.03347201905915746,-0.033312154575216184,-0.03315380932160417,-0.03299696175215392,-0.03284159072606688,-0.03268767549842818,-0.03253519571098644,-0.03238413138318995,-0.03223446290347091,-0.03208617102076997,-0.03193923683629313,-0.031793641795493696,-0.031649367680272274,-0.03150639660138772,-0.03136471099107256,-0.03122429359584646,-0.03108512746952151,-0.030947195966393455,-0.030810482734613162,-0.030674971709732594,-0.03054064710842025,-0.03040749342234059,-0.03027549541219278,-0.03014463810190364,-0.030014906772970452,-0.02988628695894889,-0.029758764440081936,-0.029632325238065436,-0.029506955610946444,-0.029382642048150217,-0.029259371265632304,-0.029137130201151905,-0.02901590600966317,-0.028895686058820726,-0.028776457924596512,-0.02865820938700437,-0.028540928425929587,-0.028424603217060206,-0.02830922212791735,-0.02819477371398165,-0.028081246714913227,-0.02796863005086235,-0.027856912818868602,-0.027746084289345684,-0.027636133902649858,-0.02752705126572945,-0.02741882614885331,-0.027311448482416095,-0.027204908353818155,-0.027099196004418152,-0.026994301826556284,-0.026890216360646382,-0.026786930292334855,-0.02668443444972485,-0.026582719800663762,-0.026481777450092548,-0.02638159863745503,-0.026282174734165817,-0.026183497241135115,-0.026085557786349103,-0.025988348122504255,-0.02589186012469441,-0.025796085788149008,-0.025701017226021382,-0.025606646667225622,-0.025512966454320996,-0.025419969041442433,-0.025327646992276204,-0.025235992978079408,-0.025144999775742305,-0.02505466026589235,-0.024964967431038928,-0.024875914353757772,-0.024787494214913962,-0.024699700291922817,-0.024612525957047403,-0.024525964675732065,-0.024440010004970876,-0.024354655591710288,-0.024269895171285086,-0.02418572256588687,-0.02410213168306424,-0.02401911651425398,-0.023936671133342434,-0.0238547896952564,-0.023773466434582793,-0.023692695664216463,-0.023612471774035408,-0.02353278922960284,-0.023453642570895345,-0.023375026411056682,-0.02329693543517648,-0.023219364399093338,-0.023142308128221715,-0.023065761516402123,-0.022989719524773966,-0.022914177180670684,-0.022839129576536495,-0.022764571868864405,-0.022690499277154885,-0.022616907082894818,-0.022543790628556246,-0.022471145316614413,-0.02239896660858479,-0.022327250024078496,-0.022255991139875867,-0.022185185589017654,-0.02211482905991352,-0.0220449172954674,-0.021975446092219447,-0.02190641129950405,-0.02183780881862375,-0.021769634602038554,-0.021701884652570412,-0.02163455502262247,-0.021567641813412784,-0.021501141174222273,-0.021435049301656423,-0.021369362438920642,-0.02130407687510887,-0.02123918894450513,-0.02117469502589787,-0.02111059154190669,-0.021046874958321284,-0.02098354178345229,-0.020920588567493847,-0.020858011901897535,-0.020795808418757555,-0.02073397479020685,-0.020672507727823947,-0.020611403982050355,-0.02055066034161819,-0.020490273632987954,-0.02043024071979613,-0.02037055850231251,-0.020311223916906943,-0.020252233935525422,-0.020193585565175212,-0.020135275847418973,-0.020077301857877497,-0.02001966070574114,-0.01996234953328954,-0.019905365515419597,-0.019848705859181488,-0.01979236780332263,-0.019736348617839305,-0.019680645603535944,-0.01962525609159178,-0.019570177443134877,-0.019515407048823225,-0.019460942328432897,-0.019406780730453065,-0.019352919731687738,-0.01929935683686414,-0.019246089578247548,-0.019193115515262503,-0.01914043223412023,-0.0190880373474522,-0.019035928493949677,-0.018984103338009154,-0.018932559569383552,-0.01888129490283911,-0.01883030707781778,-0.018779593858105143,-0.018729153031503604,-0.018678982409510884,-0.01862907982700364,-0.01857944314192616,-0.01853007023498399,-0.01848095900934245,-0.018432107390329935,-0.01838351332514588,-0.018335174782573363,-0.018287089752696196,-0.01823925624662048,-0.018191672296200494,-0.01814433595376887,-0.018097245291870998,-0.01805039840300348,-0.01800379339935671,-0.017957428412561392,-0.017911301593438966,-0.017865411111755856,-0.01781975515598153,-0.01777433193305021,-0.017729139668126233,-0.017684176604372968,-0.01763944100272528,-0.01759493114166539,-0.01755064531700213,-0.01750658184165355,-0.017462739045432732,-0.017419115274836895,-0.017375708892839563,-0.017332518278685892,-0.01728954182769103,-0.017246777951041438,-0.01720422507559918,-0.017161881643709107,-0.017119746113008844,-0.017077816956241613,-0.017036092661071756,-0.016994571729902992,-0.01695325267969929,-0.01691213404180838,-0.016871214361787793,-0.01683049219923345,-0.0167899661276107,-0.016749634734087804,-0.016709496619371822,-0.01666955039754683,-0.01662979469591446,-0.016590228154836746,-0.016550849427581144,-0.016511657180167796,-0.01647265009121899,-0.016433826851810638,-0.016395186165325988,-0.01635672674731128,-0.016318447325333493,-0.016280346638840044,-0.016242423439020503,-0.01620467648867015,-0.016167104562055525,-0.01612970644478176,-0.01609248093366181,-0.016055426836587446,-0.016018542972402055,-0.01598182817077516,-0.01594528127207871,-0.015908901127264983,-0.015872686597746252,-0.015836636555275996,-0.01580074988183182,-0.01576502546949986,-0.01572946222036085,-0.01569405904637766,-0.015658814869284363,-0.015623728620476831,-0.015588799240904738,-0.015554025680965044,-0.015519406900396916,-0.015484941868177997,-0.015450629562422097,-0.015416468970278227,-0.015382459087830976,-0.015348598920002185,-0.015314887480453924,-0.015281323791492761,-0.015247906883975277,-0.015214635797214788,-0.01518150957888934,-0.015148527284950851,-0.015115687979535481,-0.015082990734875118,-0.015050434631210044,-0.015018018756702715,-0.014985742207352666,-0.014953604086912481,-0.014921603506804878,-0.014889739586040819,-0.014858011451138717,-0.014826418236044612,-0.014794959082053404,-0.01476363313773108,-0.014732439558837922,-0.01470137750825268,-0.014670446155897706,-0.014639644678665053,-0.01460897226034346,-0.014578428091546275,-0.014548011369640302,-0.014517721298675498,-0.014487557089315565,-0.014457517958769404,-0.014427603130723417,-0.014397811835274662,-0.0143681433088648,-0.014338596794214896,-0.014309171540260991,-0.014279866802090499,-0.014250681840879334,-0.014221615923829868,-0.014192668324109588,-0.014163838320790543,-0.014135125198789508,-0.014106528248808864,-0.01407804676727823,-0.014049680056296763,-0.014021427423576165,-0.013993288182384388,-0.013965261651490007,-0.013937347155107258,-0.013909544022841726,-0.013881851589636701,-0.01385426919572017,-0.013826796186552415,-0.013799431912774258,-0.01377217573015592,-0.013745026999546467,-0.013717985086823866,-0.01369104936284562,-0.013664219203399998,-0.013637493989157822,-0.013610873105624824,-0.013584355943094558,-0.01355794189660187,-0.0135316303658769,-0.013505420755299617,-0.01347931247385489,-0.013453304935088067,-0.013427397557061098,-0.013401589762309101,-0.013375880977797504,-0.013350270634879619,-0.013324758169254738,-0.013299343020926693,-0.013274024634162884,-0.013248802457453794,-0.013223675943472955,-0.013198644549037346,-0.013173707735068279,-0.013148864966552706,-0.013124115712504958,-0.013099459445928935,-0.013074895643780685,-0.01305042378693146,-0.013026043360131126,-0.013001753851972019,-0.012977554754853196,-0.012953445564945086,-0.012929425782154521,-0.01290549491009017,-0.012881652456028358,-0.01285789793087925,-0.01283423084915342,-0.01281065072892877,-0.012787157091817844,-0.012763749462935474,-0.012740427370866792,-0.012717190347635592,-0.01269403792867302,-0.01267096965278665,-0.012647985062129838,-0.012625083702171455,-0.012602265121665922,-0.012579528872623593,-0.012556874510281417,-0.012534301593073971,-0.012511809682604756,-0.012489398343617838,-0.012467067143969758,-0.012444815654601779,-0.012422643449512409,-0.012400550105730206,-0.01237853520328691,-0.012356598325190815,-0.01233473905740047,-0.01231295698879861,-0.012291251711166403,-0.012269622819157952,-0.012248069910275066,-0.012226592584842289,-0.012205190445982214,-0.012183863099591026,-0.012162610154314335,-0.012141431221523221,-0.01212032591529057,-0.012099293852367618,-0.01207833465216078,-0.012057447936708671,-0.012036633330659413,-0.01201589046124814,-0.011995218958274764,-0.011974618454081935,-0.011954088583533262,-0.01193362898399175,-0.011913239295298436,-0.011892919159751266,-0.011872668222084186,-0.011852486129446433,-0.011832372531382057,-0.011812327079809623,-0.011792349429002145,-0.011772439235567225,-0.011752596158427346,-0.011732819858800444,-0.011713110000180594,-0.01169346624831895,-0.011673888271204845,-0.011654375739047085,-0.011634928324255443,-0.011615545701422328,-0.01159622754730463,-0.011576973540805766,-0.01155778336295788,-0.011538656696904246,-0.011519593227881824,-0.011500592643203989,-0.011481654632243455,-0.011462778886415335,-0.011443965099160392,-0.011425212965928444,-0.011406522184161924,-0.011387892453279636,-0.01136932347466061,-0.011350814951628175,-0.011332366589434152,-0.011313978095243213,-0.011295649178117387,-0.011277379549000712,-0.011259168920704067,-0.011241017007890092,-0.011222923527058313,-0.01120488819653037,-0.011186910736435421,-0.01116899086869564,-0.011151128317011908,-0.011133322806849597,-0.011115574065424518,-0.011097881821688985,-0.011080245806318023,-0.011062665751695708,-0.011045141391901629,-0.011027672462697478,-0.011010258701513774,-0.010992899847436717,-0.010975595641195149,-0.01095834582514765,-0.010941150143269757,-0.010924008341141295,-0.010906920165933835,-0.010889885366398264,-0.010872903692852473,-0.010855974897169158,-0.010839098732763742,-0.0108222749545824,-0.010805503319090196,-0.010788783584259347,-0.010772115509557567,-0.010755498855936548,-0.010738933385820515,-0.010722418863094932,-0.010705955053095259,-0.010689541722595857,-0.010673178639798962,-0.010656865574323797,-0.010640602297195732,-0.010624388580835597,-0.010608224199049054,-0.010592108927016088,-0.01057604254128058,-0.01056002481973998,-0.01054405554163508,-0.010528134487539871,-0.01051226143935149,-0.010496436180280264,-0.010480658494839845,-0.01046492816883743,-0.010449244989364068,-0.010433608744785052,-0.01041801922473041,-0.010402476220085465,-0.010386979522981486,-0.010371528926786425,-0.010356124226095734,-0.010340765216723268,-0.010325451695692251,-0.010310183461226351,-0.010294960312740815,-0.010279782050833677,-0.010264648477277066,-0.010249559395008568,-0.01023451460812268,-0.01021951392186233,-0.010204557142610473,-0.010189644077881763,-0.010174774536314298,-0.010159948327661435,-0.010145165262783676,-0.010130425153640628,-0.010115727813283038,-0.010101073055844867,-0.010086460696535491,-0.010071890551631898,-0.010057362438471022,-0.010042876175442089,-0.010028431581979054,-0.010014028478553108,-0.009999666686665238],"x":[-28.0,-28.143426294820717,-28.286852589641434,-28.43027888446215,-28.573705179282868,-28.717131474103585,-28.860557768924302,-29.00398406374502,-29.147410358565736,-29.290836653386453,-29.43426294820717,-29.577689243027887,-29.721115537848604,-29.86454183266932,-30.00796812749004,-30.15139442231076,-30.294820717131476,-30.438247011952193,-30.58167330677291,-30.725099601593627,-30.868525896414344,-31.01195219123506,-31.155378486055778,-31.298804780876495,-31.44223107569721,-31.58565737051793,-31.729083665338646,-31.872509960159363,-32.01593625498008,-32.1593625498008,-32.30278884462152,-32.44621513944223,-32.58964143426295,-32.733067729083665,-32.876494023904385,-33.0199203187251,-33.16334661354582,-33.30677290836653,-33.45019920318725,-33.59362549800797,-33.73705179282869,-33.8804780876494,-34.02390438247012,-34.167330677290835,-34.310756972111555,-34.45418326693227,-34.59760956175299,-34.7410358565737,-34.88446215139442,-35.02788844621514,-35.17131474103586,-35.31474103585657,-35.45816733067729,-35.601593625498005,-35.745019920318725,-35.88844621513944,-36.03187250996016,-36.17529880478088,-36.31872509960159,-36.462151394422314,-36.60557768924303,-36.74900398406375,-36.89243027888446,-37.03585657370518,-37.179282868525895,-37.322709163346616,-37.46613545816733,-37.60956175298805,-37.75298804780876,-37.896414342629484,-38.0398406374502,-38.18326693227092,-38.32669322709163,-38.47011952191235,-38.613545816733065,-38.756972111553786,-38.9003984063745,-39.04382470119522,-39.18725099601593,-39.330677290836654,-39.47410358565737,-39.61752988047809,-39.7609561752988,-39.90438247011952,-40.04780876494024,-40.191235059760956,-40.33466135458168,-40.47808764940239,-40.62151394422311,-40.764940239043824,-40.908366533864545,-41.05179282868526,-41.19521912350598,-41.33864541832669,-41.48207171314741,-41.625498007968126,-41.76892430278885,-41.91235059760956,-42.05577689243028,-42.199203187250994,-42.342629482071715,-42.48605577689243,-42.62948207171315,-42.77290836653386,-42.91633466135458,-43.059760956175296,-43.20318725099602,-43.34661354581673,-43.49003984063745,-43.633466135458164,-43.776892430278885,-43.9203187250996,-44.06374501992032,-44.20717131474104,-44.35059760956175,-44.49402390438247,-44.63745019920319,-44.78087649402391,-44.92430278884462,-45.06772908366534,-45.211155378486055,-45.354581673306775,-45.49800796812749,-45.64143426294821,-45.78486055776892,-45.92828685258964,-46.07171314741036,-46.21513944223108,-46.35856573705179,-46.50199203187251,-46.645418326693225,-46.788844621513945,-46.93227091633466,-47.07569721115538,-47.21912350597609,-47.36254980079681,-47.50597609561753,-47.64940239043825,-47.79282868525896,-47.93625498007968,-48.0796812749004,-48.223107569721115,-48.366533864541836,-48.50996015936255,-48.65338645418327,-48.79681274900398,-48.940239043824704,-49.08366533864542,-49.22709163346614,-49.37051792828685,-49.51394422310757,-49.657370517928285,-49.800796812749006,-49.94422310756972,-50.08764940239044,-50.23107569721115,-50.374501992031874,-50.51792828685259,-50.66135458167331,-50.80478087649402,-50.94820717131474,-51.091633466135455,-51.235059760956176,-51.37848605577689,-51.52191235059761,-51.66533864541832,-51.808764940239044,-51.95219123505976,-52.09561752988048,-52.2390438247012,-52.38247011952191,-52.52589641434263,-52.669322709163346,-52.81274900398407,-52.95617529880478,-53.0996015936255,-53.243027888446214,-53.386454183266935,-53.52988047808765,-53.67330677290837,-53.81673306772908,-53.9601593625498,-54.103585657370516,-54.24701195219124,-54.39043824701195,-54.53386454183267,-54.677290836653384,-54.820717131474105,-54.96414342629482,-55.10756972111554,-55.25099601593625,-55.39442231075697,-55.537848605577686,-55.68127490039841,-55.82470119521912,-55.96812749003984,-56.11155378486056,-56.254980079681275,-56.398406374501995,-56.54183266932271,-56.68525896414343,-56.82868525896414,-56.97211155378486,-57.11553784860558,-57.2589641434263,-57.40239043824701,-57.54581673306773,-57.689243027888445,-57.832669322709165,-57.97609561752988,-58.1195219123506,-58.26294820717131,-58.40637450199203,-58.54980079681275,-58.69322709163347,-58.83665338645418,-58.9800796812749,-59.123505976095615,-59.266932270916335,-59.41035856573705,-59.55378486055777,-59.69721115537848,-59.8406374501992,-59.98406374501992,-60.12749003984064,-60.27091633466136,-60.41434262948207,-60.55776892430279,-60.701195219123505,-60.844621513944226,-60.98804780876494,-61.13147410358566,-61.27490039840637,-61.418326693227094,-61.56175298804781,-61.70517928286853,-61.84860557768924,-61.99203187250996,-62.135458167330675,-62.278884462151396,-62.42231075697211,-62.56573705179283,-62.70916334661354,-62.852589641434264,-62.99601593625498,-63.1394422310757,-63.28286852589641,-63.42629482071713,-63.569721115537845,-63.713147410358566,-63.85657370517928,-64.0,-64.14342629482071,-64.28685258964144,-64.43027888446215,-64.57370517928287,-64.71713147410358,-64.86055776892431,-65.00398406374502,-65.14741035856574,-65.29083665338645,-65.43426294820718,-65.57768924302789,-65.7211155378486,-65.86454183266932,-66.00796812749005,-66.15139442231076,-66.29482071713147,-66.43824701195219,-66.58167330677291,-66.72509960159363,-66.86852589641434,-67.01195219123505,-67.15537848605578,-67.2988047808765,-67.44223107569721,-67.58565737051792,-67.72908366533865,-67.87250996015936,-68.01593625498008,-68.1593625498008,-68.30278884462152,-68.44621513944223,-68.58964143426294,-68.73306772908367,-68.87649402390439,-69.0199203187251,-69.16334661354581,-69.30677290836654,-69.45019920318725,-69.59362549800797,-69.73705179282868,-69.88047808764941,-70.02390438247012,-70.16733067729083,-70.31075697211155,-70.45418326693228,-70.59760956175299,-70.7410358565737,-70.88446215139442,-71.02788844621514,-71.17131474103586,-71.31474103585657,-71.45816733067728,-71.60159362549801,-71.74501992031873,-71.88844621513944,-72.03187250996017,-72.17529880478088,-72.3187250996016,-72.4621513944223,-72.60557768924303,-72.74900398406375,-72.89243027888446,-73.03585657370517,-73.1792828685259,-73.32270916334662,-73.46613545816733,-73.60956175298804,-73.75298804780877,-73.89641434262948,-74.0398406374502,-74.18326693227091,-74.32669322709164,-74.47011952191235,-74.61354581673307,-74.75697211155378,-74.9003984063745,-75.04382470119522,-75.18725099601593,-75.33067729083665,-75.47410358565737,-75.61752988047809,-75.7609561752988,-75.90438247011951,-76.04780876494024,-76.19123505976096,-76.33466135458167,-76.4780876494024,-76.62151394422311,-76.76494023904382,-76.90836653386454,-77.05179282868527,-77.19521912350598,-77.33864541832669,-77.4820717131474,-77.62549800796813,-77.76892430278885,-77.91235059760956,-78.05577689243027,-78.199203187251,-78.34262948207171,-78.48605577689243,-78.62948207171314,-78.77290836653387,-78.91633466135458,-79.0597609561753,-79.20318725099601,-79.34661354581674,-79.49003984063745,-79.63346613545816,-79.77689243027888,-79.9203187250996,-80.06374501992032,-80.20717131474103,-80.35059760956176,-80.49402390438247,-80.63745019920319,-80.7808764940239,-80.92430278884463,-81.06772908366534,-81.21115537848605,-81.35458167330677,-81.4980079681275,-81.64143426294821,-81.78486055776892,-81.92828685258964,-82.07171314741036,-82.21513944223108,-82.35856573705179,-82.5019920318725,-82.64541832669323,-82.78884462151395,-82.93227091633466,-83.07569721115537,-83.2191235059761,-83.36254980079681,-83.50597609561753,-83.64940239043824,-83.79282868525897,-83.93625498007968,-84.0796812749004,-84.22310756972112,-84.36653386454184,-84.50996015936255,-84.65338645418326,-84.79681274900399,-84.9402390438247,-85.08366533864542,-85.22709163346613,-85.37051792828686,-85.51394422310757,-85.65737051792829,-85.800796812749,-85.94422310756973,-86.08764940239044,-86.23107569721115,-86.37450199203187,-86.5179282868526,-86.66135458167331,-86.80478087649402,-86.94820717131473,-87.09163346613546,-87.23505976095618,-87.37848605577689,-87.5219123505976,-87.66533864541833,-87.80876494023904,-87.95219123505976,-88.09561752988049,-88.2390438247012,-88.38247011952191,-88.52589641434263,-88.66932270916335,-88.81274900398407,-88.95617529880478,-89.0996015936255,-89.24302788844622,-89.38645418326693,-89.52988047808765,-89.67330677290836,-89.81673306772909,-89.9601593625498,-90.10358565737052,-90.24701195219123,-90.39043824701196,-90.53386454183267,-90.67729083665338,-90.8207171314741,-90.96414342629483,-91.10756972111554,-91.25099601593625,-91.39442231075697,-91.5378486055777,-91.6812749003984,-91.82470119521912,-91.96812749003983,-92.11155378486056,-92.25498007968127,-92.39840637450199,-92.54183266932272,-92.68525896414343,-92.82868525896414,-92.97211155378486,-93.11553784860558,-93.2589641434263,-93.40239043824701,-93.54581673306772,-93.68924302788845,-93.83266932270917,-93.97609561752988,-94.11952191235059,-94.26294820717132,-94.40637450199203,-94.54980079681275,-94.69322709163346,-94.83665338645419,-94.9800796812749,-95.12350597609561,-95.26693227091633,-95.41035856573706,-95.55378486055777,-95.69721115537848,-95.8406374501992,-95.98406374501992,-96.12749003984064,-96.27091633466135,-96.41434262948208,-96.55776892430279,-96.7011952191235,-96.84462151394422,-96.98804780876495,-97.13147410358566,-97.27490039840637,-97.41832669322709,-97.56175298804781,-97.70517928286853,-97.84860557768924,-97.99203187250995,-98.13545816733068,-98.2788844621514,-98.42231075697211,-98.56573705179282,-98.70916334661355,-98.85258964143426,-98.99601593625498,-99.13944223107569,-99.28286852589642,-99.42629482071713,-99.56972111553785,-99.71314741035856,-99.85657370517929,-100.0]}
},{}],21:[function(require,module,exports){
module.exports={"expected":[0.03569911267932397,0.03551733397670141,0.03533739635104694,0.03515927198478589,0.034982933617716636,0.03480835453312581,0.0346355085443165,0.03446436998153492,0.03429491367928208,0.034127114963997174,0.03396094964210002,0.033796393988380566,0.03363342473472359,0.03347201905915746,0.033312154575216184,0.03315380932160417,0.03299696175215392,0.03284159072606688,0.03268767549842818,0.03253519571098644,0.03238413138318995,0.03223446290347091,0.03208617102076997,0.03193923683629313,0.031793641795493696,0.031649367680272274,0.03150639660138772,0.03136471099107256,0.03122429359584646,0.03108512746952151,0.030947195966393455,0.030810482734613162,0.030674971709732594,0.03054064710842025,0.03040749342234059,0.03027549541219278,0.03014463810190364,0.030014906772970452,0.02988628695894889,0.029758764440081936,0.029632325238065436,0.029506955610946444,0.029382642048150217,0.029259371265632304,0.029137130201151905,0.02901590600966317,0.028895686058820726,0.028776457924596512,0.02865820938700437,0.028540928425929587,0.028424603217060206,0.02830922212791735,0.02819477371398165,0.028081246714913227,0.02796863005086235,0.027856912818868602,0.027746084289345684,0.027636133902649858,0.02752705126572945,0.02741882614885331,0.027311448482416095,0.027204908353818155,0.027099196004418152,0.026994301826556284,0.026890216360646382,0.026786930292334855,0.02668443444972485,0.026582719800663762,0.026481777450092548,0.02638159863745503,0.026282174734165817,0.026183497241135115,0.026085557786349103,0.025988348122504255,0.02589186012469441,0.025796085788149008,0.025701017226021382,0.025606646667225622,0.025512966454320996,0.025419969041442433,0.025327646992276204,0.025235992978079408,0.025144999775742305,0.02505466026589235,0.024964967431038928,0.024875914353757772,0.024787494214913962,0.024699700291922817,0.024612525957047403,0.024525964675732065,0.024440010004970876,0.024354655591710288,0.024269895171285086,0.02418572256588687,0.02410213168306424,0.02401911651425398,0.023936671133342434,0.0238547896952564,0.023773466434582793,0.023692695664216463,0.023612471774035408,0.02353278922960284,0.023453642570895345,0.023375026411056682,0.02329693543517648,0.023219364399093338,0.023142308128221715,0.023065761516402123,0.022989719524773966,0.022914177180670684,0.022839129576536495,0.022764571868864405,0.022690499277154885,0.022616907082894818,0.022543790628556246,0.022471145316614413,0.02239896660858479,0.022327250024078496,0.022255991139875867,0.022185185589017654,0.02211482905991352,0.0220449172954674,0.021975446092219447,0.02190641129950405,0.02183780881862375,0.021769634602038554,0.021701884652570412,0.02163455502262247,0.021567641813412784,0.021501141174222273,0.021435049301656423,0.021369362438920642,0.02130407687510887,0.02123918894450513,0.02117469502589787,0.02111059154190669,0.021046874958321284,0.02098354178345229,0.020920588567493847,0.020858011901897535,0.020795808418757555,0.02073397479020685,0.020672507727823947,0.020611403982050355,0.02055066034161819,0.020490273632987954,0.02043024071979613,0.02037055850231251,0.020311223916906943,0.020252233935525422,0.020193585565175212,0.020135275847418973,0.020077301857877497,0.02001966070574114,0.01996234953328954,0.019905365515419597,0.019848705859181488,0.01979236780332263,0.019736348617839305,0.019680645603535944,0.01962525609159178,0.019570177443134877,0.019515407048823225,0.019460942328432897,0.019406780730453065,0.019352919731687738,0.01929935683686414,0.019246089578247548,0.019193115515262503,0.01914043223412023,0.0190880373474522,0.019035928493949677,0.018984103338009154,0.018932559569383552,0.01888129490283911,0.01883030707781778,0.018779593858105143,0.018729153031503604,0.018678982409510884,0.01862907982700364,0.01857944314192616,0.01853007023498399,0.01848095900934245,0.018432107390329935,0.01838351332514588,0.018335174782573363,0.018287089752696196,0.01823925624662048,0.018191672296200494,0.01814433595376887,0.018097245291870998,0.01805039840300348,0.01800379339935671,0.017957428412561392,0.017911301593438966,0.017865411111755856,0.01781975515598153,0.01777433193305021,0.017729139668126233,0.017684176604372968,0.01763944100272528,0.01759493114166539,0.01755064531700213,0.01750658184165355,0.017462739045432732,0.017419115274836895,0.017375708892839563,0.017332518278685892,0.01728954182769103,0.017246777951041438,0.01720422507559918,0.017161881643709107,0.017119746113008844,0.017077816956241613,0.017036092661071756,0.016994571729902992,0.01695325267969929,0.01691213404180838,0.016871214361787793,0.01683049219923345,0.0167899661276107,0.016749634734087804,0.016709496619371822,0.01666955039754683,0.01662979469591446,0.016590228154836746,0.016550849427581144,0.016511657180167796,0.01647265009121899,0.016433826851810638,0.016395186165325988,0.01635672674731128,0.016318447325333493,0.016280346638840044,0.016242423439020503,0.01620467648867015,0.016167104562055525,0.01612970644478176,0.01609248093366181,0.016055426836587446,0.016018542972402055,0.01598182817077516,0.01594528127207871,0.015908901127264983,0.015872686597746252,0.015836636555275996,0.01580074988183182,0.01576502546949986,0.01572946222036085,0.01569405904637766,0.015658814869284363,0.015623728620476831,0.015588799240904738,0.015554025680965044,0.015519406900396916,0.015484941868177997,0.015450629562422097,0.015416468970278227,0.015382459087830976,0.015348598920002185,0.015314887480453924,0.015281323791492761,0.015247906883975277,0.015214635797214788,0.01518150957888934,0.015148527284950851,0.015115687979535481,0.015082990734875118,0.015050434631210044,0.015018018756702715,0.014985742207352666,0.014953604086912481,0.014921603506804878,0.014889739586040819,0.014858011451138717,0.014826418236044612,0.014794959082053404,0.01476363313773108,0.014732439558837922,0.01470137750825268,0.014670446155897706,0.014639644678665053,0.01460897226034346,0.014578428091546275,0.014548011369640302,0.014517721298675498,0.014487557089315565,0.014457517958769404,0.014427603130723417,0.014397811835274662,0.0143681433088648,0.014338596794214896,0.014309171540260991,0.014279866802090499,0.014250681840879334,0.014221615923829868,0.014192668324109588,0.014163838320790543,0.014135125198789508,0.014106528248808864,0.01407804676727823,0.014049680056296763,0.014021427423576165,0.013993288182384388,0.013965261651490007,0.013937347155107258,0.013909544022841726,0.013881851589636701,0.01385426919572017,0.013826796186552415,0.013799431912774258,0.01377217573015592,0.013745026999546467,0.013717985086823866,0.01369104936284562,0.013664219203399998,0.013637493989157822,0.013610873105624824,0.013584355943094558,0.01355794189660187,0.0135316303658769,0.013505420755299617,0.01347931247385489,0.013453304935088067,0.013427397557061098,0.013401589762309101,0.013375880977797504,0.013350270634879619,0.013324758169254738,0.013299343020926693,0.013274024634162884,0.013248802457453794,0.013223675943472955,0.013198644549037346,0.013173707735068279,0.013148864966552706,0.013124115712504958,0.013099459445928935,0.013074895643780685,0.01305042378693146,0.013026043360131126,0.013001753851972019,0.012977554754853196,0.012953445564945086,0.012929425782154521,0.01290549491009017,0.012881652456028358,0.01285789793087925,0.01283423084915342,0.01281065072892877,0.012787157091817844,0.012763749462935474,0.012740427370866792,0.012717190347635592,0.01269403792867302,0.01267096965278665,0.012647985062129838,0.012625083702171455,0.012602265121665922,0.012579528872623593,0.012556874510281417,0.012534301593073971,0.012511809682604756,0.012489398343617838,0.012467067143969758,0.012444815654601779,0.012422643449512409,0.012400550105730206,0.01237853520328691,0.012356598325190815,0.01233473905740047,0.01231295698879861,0.012291251711166403,0.012269622819157952,0.012248069910275066,0.012226592584842289,0.012205190445982214,0.012183863099591026,0.012162610154314335,0.012141431221523221,0.01212032591529057,0.012099293852367618,0.01207833465216078,0.012057447936708671,0.012036633330659413,0.01201589046124814,0.011995218958274764,0.011974618454081935,0.011954088583533262,0.01193362898399175,0.011913239295298436,0.011892919159751266,0.011872668222084186,0.011852486129446433,0.011832372531382057,0.011812327079809623,0.011792349429002145,0.011772439235567225,0.011752596158427346,0.011732819858800444,0.011713110000180594,0.01169346624831895,0.011673888271204845,0.011654375739047085,0.011634928324255443,0.011615545701422328,0.01159622754730463,0.011576973540805766,0.01155778336295788,0.011538656696904246,0.011519593227881824,0.011500592643203989,0.011481654632243455,0.011462778886415335,0.011443965099160392,0.011425212965928444,0.011406522184161924,0.011387892453279636,0.01136932347466061,0.011350814951628175,0.011332366589434152,0.011313978095243213,0.011295649178117387,0.011277379549000712,0.011259168920704067,0.011241017007890092,0.011222923527058313,0.01120488819653037,0.011186910736435421,0.01116899086869564,0.011151128317011908,0.011133322806849597,0.011115574065424518,0.011097881821688985,0.011080245806318023,0.011062665751695708,0.011045141391901629,0.011027672462697478,0.011010258701513774,0.010992899847436717,0.010975595641195149,0.01095834582514765,0.010941150143269757,0.010924008341141295,0.010906920165933835,0.010889885366398264,0.010872903692852473,0.010855974897169158,0.010839098732763742,0.0108222749545824,0.010805503319090196,0.010788783584259347,0.010772115509557567,0.010755498855936548,0.010738933385820515,0.010722418863094932,0.010705955053095259,0.010689541722595857,0.010673178639798962,0.010656865574323797,0.010640602297195732,0.010624388580835597,0.010608224199049054,0.010592108927016088,0.01057604254128058,0.01056002481973998,0.01054405554163508,0.010528134487539871,0.01051226143935149,0.010496436180280264,0.010480658494839845,0.01046492816883743,0.010449244989364068,0.010433608744785052,0.01041801922473041,0.010402476220085465,0.010386979522981486,0.010371528926786425,0.010356124226095734,0.010340765216723268,0.010325451695692251,0.010310183461226351,0.010294960312740815,0.010279782050833677,0.010264648477277066,0.010249559395008568,0.01023451460812268,0.01021951392186233,0.010204557142610473,0.010189644077881763,0.010174774536314298,0.010159948327661435,0.010145165262783676,0.010130425153640628,0.010115727813283038,0.010101073055844867,0.010086460696535491,0.010071890551631898,0.010057362438471022,0.010042876175442089,0.010028431581979054,0.010014028478553108,0.009999666686665238],"x":[28.0,28.143426294820717,28.286852589641434,28.43027888446215,28.573705179282868,28.717131474103585,28.860557768924302,29.00398406374502,29.147410358565736,29.290836653386453,29.43426294820717,29.577689243027887,29.721115537848604,29.86454183266932,30.00796812749004,30.15139442231076,30.294820717131476,30.438247011952193,30.58167330677291,30.725099601593627,30.868525896414344,31.01195219123506,31.155378486055778,31.298804780876495,31.44223107569721,31.58565737051793,31.729083665338646,31.872509960159363,32.01593625498008,32.1593625498008,32.30278884462152,32.44621513944223,32.58964143426295,32.733067729083665,32.876494023904385,33.0199203187251,33.16334661354582,33.30677290836653,33.45019920318725,33.59362549800797,33.73705179282869,33.8804780876494,34.02390438247012,34.167330677290835,34.310756972111555,34.45418326693227,34.59760956175299,34.7410358565737,34.88446215139442,35.02788844621514,35.17131474103586,35.31474103585657,35.45816733067729,35.601593625498005,35.745019920318725,35.88844621513944,36.03187250996016,36.17529880478088,36.31872509960159,36.462151394422314,36.60557768924303,36.74900398406375,36.89243027888446,37.03585657370518,37.179282868525895,37.322709163346616,37.46613545816733,37.60956175298805,37.75298804780876,37.896414342629484,38.0398406374502,38.18326693227092,38.32669322709163,38.47011952191235,38.613545816733065,38.756972111553786,38.9003984063745,39.04382470119522,39.18725099601593,39.330677290836654,39.47410358565737,39.61752988047809,39.7609561752988,39.90438247011952,40.04780876494024,40.191235059760956,40.33466135458168,40.47808764940239,40.62151394422311,40.764940239043824,40.908366533864545,41.05179282868526,41.19521912350598,41.33864541832669,41.48207171314741,41.625498007968126,41.76892430278885,41.91235059760956,42.05577689243028,42.199203187250994,42.342629482071715,42.48605577689243,42.62948207171315,42.77290836653386,42.91633466135458,43.059760956175296,43.20318725099602,43.34661354581673,43.49003984063745,43.633466135458164,43.776892430278885,43.9203187250996,44.06374501992032,44.20717131474104,44.35059760956175,44.49402390438247,44.63745019920319,44.78087649402391,44.92430278884462,45.06772908366534,45.211155378486055,45.354581673306775,45.49800796812749,45.64143426294821,45.78486055776892,45.92828685258964,46.07171314741036,46.21513944223108,46.35856573705179,46.50199203187251,46.645418326693225,46.788844621513945,46.93227091633466,47.07569721115538,47.21912350597609,47.36254980079681,47.50597609561753,47.64940239043825,47.79282868525896,47.93625498007968,48.0796812749004,48.223107569721115,48.366533864541836,48.50996015936255,48.65338645418327,48.79681274900398,48.940239043824704,49.08366533864542,49.22709163346614,49.37051792828685,49.51394422310757,49.657370517928285,49.800796812749006,49.94422310756972,50.08764940239044,50.23107569721115,50.374501992031874,50.51792828685259,50.66135458167331,50.80478087649402,50.94820717131474,51.091633466135455,51.235059760956176,51.37848605577689,51.52191235059761,51.66533864541832,51.808764940239044,51.95219123505976,52.09561752988048,52.2390438247012,52.38247011952191,52.52589641434263,52.669322709163346,52.81274900398407,52.95617529880478,53.0996015936255,53.243027888446214,53.386454183266935,53.52988047808765,53.67330677290837,53.81673306772908,53.9601593625498,54.103585657370516,54.24701195219124,54.39043824701195,54.53386454183267,54.677290836653384,54.820717131474105,54.96414342629482,55.10756972111554,55.25099601593625,55.39442231075697,55.537848605577686,55.68127490039841,55.82470119521912,55.96812749003984,56.11155378486056,56.254980079681275,56.398406374501995,56.54183266932271,56.68525896414343,56.82868525896414,56.97211155378486,57.11553784860558,57.2589641434263,57.40239043824701,57.54581673306773,57.689243027888445,57.832669322709165,57.97609561752988,58.1195219123506,58.26294820717131,58.40637450199203,58.54980079681275,58.69322709163347,58.83665338645418,58.9800796812749,59.123505976095615,59.266932270916335,59.41035856573705,59.55378486055777,59.69721115537848,59.8406374501992,59.98406374501992,60.12749003984064,60.27091633466136,60.41434262948207,60.55776892430279,60.701195219123505,60.844621513944226,60.98804780876494,61.13147410358566,61.27490039840637,61.418326693227094,61.56175298804781,61.70517928286853,61.84860557768924,61.99203187250996,62.135458167330675,62.278884462151396,62.42231075697211,62.56573705179283,62.70916334661354,62.852589641434264,62.99601593625498,63.1394422310757,63.28286852589641,63.42629482071713,63.569721115537845,63.713147410358566,63.85657370517928,64.0,64.14342629482071,64.28685258964144,64.43027888446215,64.57370517928287,64.71713147410358,64.86055776892431,65.00398406374502,65.14741035856574,65.29083665338645,65.43426294820718,65.57768924302789,65.7211155378486,65.86454183266932,66.00796812749005,66.15139442231076,66.29482071713147,66.43824701195219,66.58167330677291,66.72509960159363,66.86852589641434,67.01195219123505,67.15537848605578,67.2988047808765,67.44223107569721,67.58565737051792,67.72908366533865,67.87250996015936,68.01593625498008,68.1593625498008,68.30278884462152,68.44621513944223,68.58964143426294,68.73306772908367,68.87649402390439,69.0199203187251,69.16334661354581,69.30677290836654,69.45019920318725,69.59362549800797,69.73705179282868,69.88047808764941,70.02390438247012,70.16733067729083,70.31075697211155,70.45418326693228,70.59760956175299,70.7410358565737,70.88446215139442,71.02788844621514,71.17131474103586,71.31474103585657,71.45816733067728,71.60159362549801,71.74501992031873,71.88844621513944,72.03187250996017,72.17529880478088,72.3187250996016,72.4621513944223,72.60557768924303,72.74900398406375,72.89243027888446,73.03585657370517,73.1792828685259,73.32270916334662,73.46613545816733,73.60956175298804,73.75298804780877,73.89641434262948,74.0398406374502,74.18326693227091,74.32669322709164,74.47011952191235,74.61354581673307,74.75697211155378,74.9003984063745,75.04382470119522,75.18725099601593,75.33067729083665,75.47410358565737,75.61752988047809,75.7609561752988,75.90438247011951,76.04780876494024,76.19123505976096,76.33466135458167,76.4780876494024,76.62151394422311,76.76494023904382,76.90836653386454,77.05179282868527,77.19521912350598,77.33864541832669,77.4820717131474,77.62549800796813,77.76892430278885,77.91235059760956,78.05577689243027,78.199203187251,78.34262948207171,78.48605577689243,78.62948207171314,78.77290836653387,78.91633466135458,79.0597609561753,79.20318725099601,79.34661354581674,79.49003984063745,79.63346613545816,79.77689243027888,79.9203187250996,80.06374501992032,80.20717131474103,80.35059760956176,80.49402390438247,80.63745019920319,80.7808764940239,80.92430278884463,81.06772908366534,81.21115537848605,81.35458167330677,81.4980079681275,81.64143426294821,81.78486055776892,81.92828685258964,82.07171314741036,82.21513944223108,82.35856573705179,82.5019920318725,82.64541832669323,82.78884462151395,82.93227091633466,83.07569721115537,83.2191235059761,83.36254980079681,83.50597609561753,83.64940239043824,83.79282868525897,83.93625498007968,84.0796812749004,84.22310756972112,84.36653386454184,84.50996015936255,84.65338645418326,84.79681274900399,84.9402390438247,85.08366533864542,85.22709163346613,85.37051792828686,85.51394422310757,85.65737051792829,85.800796812749,85.94422310756973,86.08764940239044,86.23107569721115,86.37450199203187,86.5179282868526,86.66135458167331,86.80478087649402,86.94820717131473,87.09163346613546,87.23505976095618,87.37848605577689,87.5219123505976,87.66533864541833,87.80876494023904,87.95219123505976,88.09561752988049,88.2390438247012,88.38247011952191,88.52589641434263,88.66932270916335,88.81274900398407,88.95617529880478,89.0996015936255,89.24302788844622,89.38645418326693,89.52988047808765,89.67330677290836,89.81673306772909,89.9601593625498,90.10358565737052,90.24701195219123,90.39043824701196,90.53386454183267,90.67729083665338,90.8207171314741,90.96414342629483,91.10756972111554,91.25099601593625,91.39442231075697,91.5378486055777,91.6812749003984,91.82470119521912,91.96812749003983,92.11155378486056,92.25498007968127,92.39840637450199,92.54183266932272,92.68525896414343,92.82868525896414,92.97211155378486,93.11553784860558,93.2589641434263,93.40239043824701,93.54581673306772,93.68924302788845,93.83266932270917,93.97609561752988,94.11952191235059,94.26294820717132,94.40637450199203,94.54980079681275,94.69322709163346,94.83665338645419,94.9800796812749,95.12350597609561,95.26693227091633,95.41035856573706,95.55378486055777,95.69721115537848,95.8406374501992,95.98406374501992,96.12749003984064,96.27091633466135,96.41434262948208,96.55776892430279,96.7011952191235,96.84462151394422,96.98804780876495,97.13147410358566,97.27490039840637,97.41832669322709,97.56175298804781,97.70517928286853,97.84860557768924,97.99203187250995,98.13545816733068,98.2788844621514,98.42231075697211,98.56573705179282,98.70916334661355,98.85258964143426,98.99601593625498,99.13944223107569,99.28286852589642,99.42629482071713,99.56972111553785,99.71314741035856,99.85657370517929,100.0]}
},{}],22:[function(require,module,exports){
module.exports={"expected":[-0.7378150601204649,-0.7361056754550979,-0.7344027170432255,-0.7327061585364671,-0.7310159736367406,-0.7293321360975216,-0.7276546197250732,-0.7259833983796455,-0.7243184459766473,-0.7226597364877866,-0.7210072439421855,-0.7193609424274653,-0.717720806090805,-0.7160868091399732,-0.7144589258443317,-0.7128371305358143,-0.7112213976098805,-0.7096117015264408,-0.7080080168107608,-0.7064103180543367,-0.7048185799157509,-0.7032327771214993,-0.7016528844667989,-0.7000788768163694,-0.6985107291051944,-0.6969484163392584,-0.6953919135962627,-0.6938411960263199,-0.6922962388526266,-0.6907570173721149,-0.6892235069560844,-0.6876956830508126,-0.6861735211781471,-0.6846569969360763,-0.6831460859992823,-0.6816407641196744,-0.6801410071269042,-0.6786467909288618,-0.6771580915121557,-0.6756748849425723,-0.6741971473655217,-0.6727248550064631,-0.6712579841713158,-0.6697965112468522,-0.6683404127010766,-0.6668896650835858,-0.6654442450259164,-0.6640041292418751,-0.6625692945278554,-0.6611397177631388,-0.6597153759101816,-0.6582962460148875,-0.6568823052068675,-0.6554735306996842,-0.6540698997910842,-0.6526713898632168,-0.65127797838284,-0.6498896429015135,-0.6485063610557804,-0.6471281105673351,-0.6457548692431807,-0.6443866149757747,-0.6430233257431612,-0.6416649796090956,-0.6403115547231546,-0.6389630293208375,-0.637619381723657,-0.6362805903392181,-0.634946633661289,-0.63361749026986,-0.6322931388311946,-0.6309735580978693,-0.6296587269088055,-0.6283486241892914,-0.6270432289509956,-0.6257425202919713,-0.6244464773966524,-0.6231550795358413,-0.6218683060666879,-0.6205861364326614,-0.6193085501635136,-0.6180355268752351,-0.6167670462700033,-0.615503088136124,-0.6142436323479643,-0.6129886588658808,-0.6117381477361389,-0.6104920790908257,-0.6092504331477582,-0.6080131902103822,-0.6067803306676677,-0.6055518349939962,-0.6043276837490433,-0.603107857577655,-0.601892337209718,-0.6006811034600255,-0.5994741372281365,-0.5982714194982302,-0.5970729313389561,-0.5958786539032774,-0.5946885684283113,-0.5935026562351632,-0.5923208987287572,-0.5911432773976609,-0.589969773813908,-0.588800369632814,-0.587635046592789,-0.5864737865151474,-0.5853165713039113,-0.5841633829456123,-0.5830142035090886,-0.5818690151452781,-0.5807278000870089,-0.5795905406487851,-0.5784572192265715,-0.5773278182975716,-0.5762023204200064,-0.5750807082328872,-0.5739629644557862,-0.5728490718886059,-0.5717390134113426,-0.5706327719838499,-0.569530330645599,-0.5684316725154349,-0.5673367807913328,-0.5662456387501493,-0.5651582297473738,-0.5640745372168765,-0.5629945446706536,-0.5619182356985722,-0.5608455939681118,-0.5597766032241043,-0.5587112472884722,-0.5576495100599655,-0.5565913755138963,-0.555536827701871,-0.554485850751523,-0.5534384288662424,-0.552394546324904,-0.5513541874815956,-0.5503173367653424,-0.5492839786798329,-0.5482540978031419,-0.5472276787874524,-0.5462047063587768,-0.5451851653166775,-0.5441690405339856,-0.5431563169565189,-0.5421469796028001,-0.5411410135637718,-0.5401384040025135,-0.5391391361539556,-0.5381431953245944,-0.5371505668922051,-0.5361612363055549,-0.5351751890841157,-0.5341924108177756,-0.5332128871665506,-0.5322366038602957,-0.5312635466984152,-0.5302937015495736,-0.5293270543514041,-0.5283635911102204,-0.5274032979007242,-0.5264461608657155,-0.5254921662158017,-0.524541300229106,-0.5235935492509765,-0.5226488996936951,-0.5217073380361861,-0.520768850823725,-0.5198334246676473,-0.5189010462450573,-0.5179717022985372,-0.5170453796358556,-0.5161220651296776,-0.5152017457172735,-0.5142844084002286,-0.5133700402441527,-0.5124586283783908,-0.511550159995733,-0.5106446223521248,-0.5097420027663793,-0.5088422886198867,-0.507945467356328,-0.5070515264813853,-0.5061604535624554,-0.5052722362283627,-0.5043868621690718,-0.5035043191354025,-0.5026245949387429,-0.5017476774507657,-0.5008735546031425,-0.5000022143872602,-0.49913364485393796,-0.4982678341131435,-0.4974047703337115,-0.49654444174306156,-0.49568683662691776,-0.4948319433290276,-0.4939797502508828,-0.49313024585144033,-0.49228341864684366,-0.4914392572101457,-0.4905977501710316,-0.4897588862155426,-0.48892265408580093,-0.4880890425797346,-0.48725804055080457,-0.4864296369077302,-0.48560382061421853,-0.4847805806886915,-0.4839599062040161,-0.48314178628723414,-0.48232621011929344,-0.4815131669347793,-0.480702646021648,-0.479894636720959,-0.479089128426611,-0.47828611058507575,-0.4774855726951352,-0.476687504307618,-0.4758918950251379,-0.4750987345018323,-0.4743080124431022,-0.473519718605353,-0.47273384279573594,-0.47195037487189057,-0.47116930474168883,-0.47039062236297874,-0.4696143177433307,-0.4688403809397828,-0.46806880205858903,-0.46729957125496707,-0.4665326787328478,-0.46576811474462554,-0.4650058695909088,-0.46424593362027317,-0.4634882972290139,-0.4627329508609003,-0.46197988500693116,-0.4612290902050903,-0.46048055704010393,-0.45973427614319917,-0.45899023819186285,-0.45824843390960146,-0.4575088540657028,-0.45677148947499774,-0.4560363309976237,-0.45530336953878825,-0.4545725960485352,-0.45384400152151017,-0.4531175769967277,-0.45239331355734014,-0.45167120233040636,-0.45095123448666224,-0.4502334012402918,-0.4495176938487,-0.4488041036122854,-0.4480926218742149,-0.44738324002019925,-0.4466759494782692,-0.445970741718553,-0.4452676082530548,-0.4445665406354342,-0.44386753046078703,-0.44317056936542587,-0.4424756490266638,-0.44178276116259735,-0.44109189753189065,-0.4404030499335619,-0.4397162102067693,-0.4390313702305992,-0.4383485219238539,-0.437667657244842,-0.43698876819116916,-0.43631184679952884,-0.435636885145496,-0.4349638753433201,-0.43429280954572025,-0.4336236799436802,-0.4329564787662457,-0.4322911982803222,-0.43162783079047273,-0.43096636863871846,-0.430306804204339,-0.4296491299036737,-0.42899333818992513,-0.428339421552962,-0.4276873725191242,-0.42703718365102783,-0.42638884754737255,-0.42574235684274875,-0.42509770420744564,-0.42445488234726175,-0.42381388400331466,-0.42317470195185264,-0.4225373290040669,-0.4219017580059053,-0.42126798183788655,-0.42063599341491514,-0.4200057856860982,-0.41937735163456213,-0.418750684277271,-0.41812577666484574,-0.41750262188138365,-0.4168812130442803,-0.41626154330405,-0.4156436058441502,-0.41502739388080423,-0.414412900662826,-0.41380011947144624,-0.41318904362013836,-0.4125796664544463,-0.4119719813518126,-0.4113659817214079,-0.4107616610039609,-0.4101590126715895,-0.4095580302276329,-0.40895870720648414,-0.4083610371734243,-0.4077650137244567,-0.40717063048614277,-0.40657788111543813,-0.4059867592995302,-0.4053972587556762,-0.40480937323104227,-0.40422309650254307,-0.4036384223766831,-0.40305534468939785,-0.40247385730589663,-0.4018939541205054,-0.40131562905651147,-0.40073887606600866,-0.40016368912974226,-0.3995900622569569,-0.39901798948524336,-0.3984474648803872,-0.3978784825362179,-0.39731103657445893,-0.39674512114457877,-0.39618073042364216,-0.39561785861616316,-0.3950564999539581,-0.3944966486959995,-0.3939382991282715,-0.39338144556362514,-0.39282608234163524,-0.3922722038284572,-0.3917198044166854,-0.3911688785252124,-0.39061942059908766,-0.39007142510937887,-0.3895248865530327,-0.3889797994527371,-0.3884361583567833,-0.38789395783893027,-0.3873531924982684,-0.38681385695908455,-0.38627594587072794,-0.38573945390747655,-0.38520437576840466,-0.38467070617725024,-0.3841384398822843,-0.3836075716561801,-0.3830780962958833,-0.38255000862248284,-0.3820233034810829,-0.3814979757406746,-0.38097402029401006,-0.38045143205747506,-0.3799302059709646,-0.37941033699775706,-0.37889182012439093,-0.37837465036054113,-0.377858822738896,-0.3773443323150357,-0.3768311741673107,-0.3763193433967211,-0.37580883512679647,-0.3752996445034771,-0.3747917666949947,-0.3742851968917548,-0.37377993030621964,-0.373275962172791,-0.37277328774769475,-0.372271902308865,-0.37177180115583,-0.3712729796095977,-0.3707754330125424,-0.3702791567282923,-0.3697841461416171,-0.36929039665831653,-0.3687979037051098,-0.36830666272952495,-0.3678166691997898,-0.3673279186047223,-0.3668404064536228,-0.3663541282761662,-0.3658690796222942,-0.3653852560621097,-0.36490265318577025,-0.3644212666033829,-0.36394109194489954,-0.3634621248600127,-0.3629843610180521,-0.3625077961078814,-0.3620324258377963,-0.36155824593542246,-0.3610852521476141,-0.3606134402403539,-0.3601428059986526,-0.35967334522644934,-0.359205053746513,-0.3587379274003439,-0.3582719620480756,-0.35780715356837794,-0.35734349785836034,-0.3568809908334755,-0.35641962842742403,-0.3559594065920588,-0.3555003212972912,-0.3550423685309967,-0.35458554429892125,-0.3541298446245887,-0.3536752655492083,-0.3532218031315828,-0.3527694534480168,-0.3523182125922265,-0.351868076675249,-0.35141904182535233,-0.3509711041879467,-0.3505242599254952,-0.3500785052174258,-0.3496338362600433,-0.34919024926644243,-0.3487477404664208,-0.3483063061063925,-0.3478659424493026,-0.34742664577454163,-0.3469884123778606,-0.34655123857128706,-0.34611512068304084,-0.34568005505745086,-0.3452460380548721,-0.3448130660516031,-0.34438113543980436,-0.34395024262741597,-0.34352038403807744,-0.34309155611104675,-0.34266375530112,-0.3422369780785519,-0.34181122092897676,-0.3413864803533293,-0.34096275286776645,-0.3405400350035895,-0.3401183233071667,-0.3396976143398559,-0.3392779046779285,-0.33885919091249295,-0.33844146964941896,-0.3380247375092623,-0.3376089911271902,-0.33719422715290664,-0.33678044225057796,-0.33636763309876017,-0.33595579639032497,-0.3355449288323874,-0.3351350271462332,-0.3347260880672471,-0.334318108344841,-0.3339110847423831,-0.3335050140371271,-0.33309989302014176,-0.3326957184962408,-0.3322924872839138,-0.3318901962152567,-0.33148884213590313,-0.33108842190495585,-0.3306889323949192,-0.3302903704916309,-0.3298927330941953,-0.32949601711491633,-0.32910021947923096,-0.3287053371256433,-0.3283113670056585,-0.3279183060837179,-0.32752615133713364,-0.3271348997560241,-0.32674454834324984,-0.3263550941143493,-0.3259665340974758,-0.3255788653333337,-0.32519208487511625,-0.3248061897884426,-0.32442117715129576,-0.32403704405396105,-0.3236537875989644,-0.32327140490101147,-0.32288989308692656,-0.32250924929559277,-0.3221294706778913,-0.3217505543966422],"x":[-1.1,-1.103784860557769,-1.1075697211155378,-1.1113545816733068,-1.1151394422310756,-1.1189243027888447,-1.1227091633466135,-1.1264940239043826,-1.1302788844621514,-1.1340637450199202,-1.1378486055776893,-1.1416334661354581,-1.1454183266932272,-1.149203187250996,-1.1529880478087648,-1.156772908366534,-1.1605577689243027,-1.1643426294820718,-1.1681274900398406,-1.1719123505976095,-1.1756972111553785,-1.1794820717131473,-1.1832669322709164,-1.1870517928286852,-1.1908366533864543,-1.1946215139442231,-1.198406374501992,-1.202191235059761,-1.2059760956175298,-1.2097609561752989,-1.2135458167330677,-1.2173306772908365,-1.2211155378486056,-1.2249003984063744,-1.2286852589641435,-1.2324701195219123,-1.2362549800796814,-1.2400398406374502,-1.243824701195219,-1.247609561752988,-1.251394422310757,-1.255179282868526,-1.2589641434262948,-1.2627490039840636,-1.2665338645418327,-1.2703187250996015,-1.2741035856573706,-1.2778884462151394,-1.2816733067729085,-1.2854581673306773,-1.2892430278884461,-1.2930278884462152,-1.296812749003984,-1.300597609561753,-1.304382470119522,-1.3081673306772907,-1.3119521912350598,-1.3157370517928286,-1.3195219123505977,-1.3233067729083665,-1.3270916334661356,-1.3308764940239044,-1.3346613545816732,-1.3384462151394423,-1.3422310756972111,-1.3460159362549802,-1.349800796812749,-1.3535856573705178,-1.357370517928287,-1.3611553784860557,-1.3649402390438248,-1.3687250996015936,-1.3725099601593624,-1.3762948207171315,-1.3800796812749003,-1.3838645418326694,-1.3876494023904382,-1.3914342629482073,-1.395219123505976,-1.399003984063745,-1.402788844621514,-1.4065737051792828,-1.4103585657370519,-1.4141434262948207,-1.4179282868525895,-1.4217131474103586,-1.4254980079681274,-1.4292828685258965,-1.4330677290836653,-1.4368525896414344,-1.4406374501992032,-1.444422310756972,-1.448207171314741,-1.45199203187251,-1.455776892430279,-1.4595617529880478,-1.4633466135458166,-1.4671314741035857,-1.4709163346613545,-1.4747011952191236,-1.4784860557768924,-1.4822709163346615,-1.4860557768924303,-1.4898406374501991,-1.4936254980079682,-1.497410358565737,-1.501195219123506,-1.504980079681275,-1.5087649402390437,-1.5125498007968128,-1.5163346613545816,-1.5201195219123507,-1.5239043824701195,-1.5276892430278886,-1.5314741035856574,-1.5352589641434262,-1.5390438247011953,-1.542828685258964,-1.5466135458167332,-1.550398406374502,-1.5541832669322708,-1.5579681274900399,-1.5617529880478087,-1.5655378486055778,-1.5693227091633466,-1.5731075697211154,-1.5768924302788845,-1.5806772908366533,-1.5844621513944224,-1.5882470119521912,-1.5920318725099603,-1.595816733067729,-1.599601593625498,-1.603386454183267,-1.6071713147410358,-1.6109561752988049,-1.6147410358565737,-1.6185258964143425,-1.6223107569721116,-1.6260956175298804,-1.6298804780876495,-1.6336653386454183,-1.6374501992031874,-1.6412350597609562,-1.645019920318725,-1.648804780876494,-1.652589641434263,-1.656374501992032,-1.6601593625498008,-1.6639442231075696,-1.6677290836653387,-1.6715139442231075,-1.6752988047808766,-1.6790836653386454,-1.6828685258964144,-1.6866533864541833,-1.690438247011952,-1.6942231075697212,-1.69800796812749,-1.701792828685259,-1.7055776892430279,-1.7093625498007967,-1.7131474103585658,-1.7169322709163346,-1.7207171314741037,-1.7245019920318725,-1.7282868525896415,-1.7320717131474104,-1.7358565737051792,-1.7396414342629483,-1.743426294820717,-1.7472111553784861,-1.750996015936255,-1.7547808764940238,-1.7585657370517929,-1.7623505976095617,-1.7661354581673308,-1.7699203187250996,-1.7737051792828684,-1.7774900398406375,-1.7812749003984063,-1.7850597609561754,-1.7888446215139442,-1.7926294820717132,-1.796414342629482,-1.800199203187251,-1.80398406374502,-1.8077689243027888,-1.8115537848605578,-1.8153386454183267,-1.8191235059760955,-1.8229083665338646,-1.8266932270916334,-1.8304780876494025,-1.8342629482071713,-1.8380478087649403,-1.8418326693227092,-1.845617529880478,-1.849402390438247,-1.853187250996016,-1.856972111553785,-1.8607569721115538,-1.8645418326693226,-1.8683266932270917,-1.8721115537848605,-1.8758964143426295,-1.8796812749003984,-1.8834661354581674,-1.8872509960159363,-1.891035856573705,-1.8948207171314742,-1.898605577689243,-1.902390438247012,-1.9061752988047809,-1.9099601593625497,-1.9137450199203188,-1.9175298804780876,-1.9213147410358566,-1.9250996015936255,-1.9288844621513945,-1.9326693227091634,-1.9364541832669322,-1.9402390438247012,-1.94402390438247,-1.9478087649402391,-1.951593625498008,-1.9553784860557768,-1.9591633466135459,-1.9629482071713147,-1.9667330677290837,-1.9705179282868526,-1.9743027888446214,-1.9780876494023905,-1.9818725099601593,-1.9856573705179283,-1.9894422310756972,-1.9932270916334662,-1.997011952191235,-2.000796812749004,-2.004581673306773,-2.008366533864542,-2.0121513944223106,-2.0159362549800797,-2.0197211155378487,-2.0235059760956173,-2.0272908366533864,-2.0310756972111554,-2.0348605577689245,-2.038645418326693,-2.042430278884462,-2.046215139442231,-2.05,-2.053784860557769,-2.057569721115538,-2.061354581673307,-2.0651394422310756,-2.0689243027888446,-2.0727091633466137,-2.0764940239043823,-2.0802788844621514,-2.0840637450199204,-2.087848605577689,-2.091633466135458,-2.095418326693227,-2.099203187250996,-2.102988047808765,-2.106772908366534,-2.110557768924303,-2.1143426294820715,-2.1181274900398406,-2.1219123505976096,-2.1256972111553787,-2.1294820717131473,-2.1332669322709163,-2.1370517928286854,-2.140836653386454,-2.144621513944223,-2.148406374501992,-2.152191235059761,-2.15597609561753,-2.159760956175299,-2.163545816733068,-2.1673306772908365,-2.1711155378486056,-2.1749003984063746,-2.1786852589641432,-2.1824701195219123,-2.1862549800796813,-2.1900398406374504,-2.193824701195219,-2.197609561752988,-2.201394422310757,-2.2051792828685257,-2.2089641434262948,-2.212749003984064,-2.216533864541833,-2.2203187250996015,-2.2241035856573705,-2.2278884462151396,-2.231673306772908,-2.2354581673306773,-2.2392430278884463,-2.243027888446215,-2.246812749003984,-2.250597609561753,-2.254382470119522,-2.2581673306772907,-2.2619521912350598,-2.265737051792829,-2.2695219123505974,-2.2733067729083665,-2.2770916334661355,-2.2808764940239046,-2.284661354581673,-2.2884462151394422,-2.2922310756972113,-2.29601593625498,-2.299800796812749,-2.303585657370518,-2.307370517928287,-2.3111553784860557,-2.3149402390438247,-2.318725099601594,-2.3225099601593624,-2.3262948207171315,-2.3300796812749005,-2.333864541832669,-2.337649402390438,-2.3414342629482072,-2.3452191235059763,-2.349003984063745,-2.352788844621514,-2.356573705179283,-2.3603585657370516,-2.3641434262948207,-2.3679282868525897,-2.3717131474103588,-2.3754980079681274,-2.3792828685258964,-2.3830677290836655,-2.386852589641434,-2.390637450199203,-2.394422310756972,-2.398207171314741,-2.40199203187251,-2.405776892430279,-2.409561752988048,-2.4133466135458166,-2.4171314741035856,-2.4209163346613547,-2.4247011952191233,-2.4284860557768924,-2.4322709163346614,-2.4360557768924305,-2.439840637450199,-2.443625498007968,-2.447410358565737,-2.451195219123506,-2.454980079681275,-2.458764940239044,-2.462549800796813,-2.4663346613545816,-2.4701195219123506,-2.4739043824701197,-2.4776892430278883,-2.4814741035856573,-2.4852589641434264,-2.489043824701195,-2.492828685258964,-2.496613545816733,-2.500398406374502,-2.504183266932271,-2.50796812749004,-2.511752988047809,-2.5155378486055775,-2.5193227091633466,-2.5231075697211156,-2.5268924302788847,-2.5306772908366533,-2.5344621513944223,-2.5382470119521914,-2.54203187250996,-2.545816733067729,-2.549601593625498,-2.553386454183267,-2.5571713147410358,-2.560956175298805,-2.564741035856574,-2.5685258964143425,-2.5723107569721115,-2.5760956175298806,-2.579880478087649,-2.5836653386454183,-2.5874501992031873,-2.5912350597609564,-2.595019920318725,-2.598804780876494,-2.602589641434263,-2.6063745019920317,-2.6101593625498007,-2.61394422310757,-2.617729083665339,-2.6215139442231075,-2.6252988047808765,-2.6290836653386456,-2.632868525896414,-2.6366533864541832,-2.6404382470119523,-2.644223107569721,-2.64800796812749,-2.651792828685259,-2.655577689243028,-2.6593625498007967,-2.6631474103585657,-2.666932270916335,-2.6707171314741034,-2.6745019920318724,-2.6782868525896415,-2.6820717131474106,-2.685856573705179,-2.689641434262948,-2.6934262948207173,-2.697211155378486,-2.700996015936255,-2.704780876494024,-2.708565737051793,-2.7123505976095617,-2.7161354581673307,-2.7199203187250998,-2.7237051792828684,-2.7274900398406374,-2.7312749003984065,-2.735059760956175,-2.738844621513944,-2.742629482071713,-2.7464143426294823,-2.750199203187251,-2.75398406374502,-2.757768924302789,-2.7615537848605576,-2.7653386454183266,-2.7691235059760957,-2.7729083665338647,-2.7766932270916334,-2.7804780876494024,-2.7842629482071715,-2.78804780876494,-2.791832669322709,-2.795617529880478,-2.799402390438247,-2.803187250996016,-2.806972111553785,-2.810756972111554,-2.8145418326693226,-2.8183266932270916,-2.8221115537848607,-2.8258964143426293,-2.8296812749003983,-2.8334661354581674,-2.8372509960159364,-2.841035856573705,-2.844820717131474,-2.848605577689243,-2.8523904382470118,-2.856175298804781,-2.85996015936255,-2.863745019920319,-2.8675298804780875,-2.8713147410358566,-2.8750996015936257,-2.8788844621513943,-2.8826693227091633,-2.8864541832669324,-2.890239043824701,-2.89402390438247,-2.897808764940239,-2.901593625498008,-2.9053784860557768,-2.909163346613546,-2.912948207171315,-2.9167330677290835,-2.9205179282868525,-2.9243027888446216,-2.9280876494023906,-2.9318725099601592,-2.9356573705179283,-2.9394422310756974,-2.943227091633466,-2.947011952191235,-2.950796812749004,-2.954581673306773,-2.9583665338645417,-2.962151394422311,-2.96593625498008,-2.9697211155378485,-2.9735059760956175,-2.9772908366533866,-2.981075697211155,-2.9848605577689242,-2.9886454183266933,-2.9924302788844623,-2.996215139442231,-3.0]}
},{}],23:[function(require,module,exports){
module.exports={"expected":[0.7378150601204649,0.7361056754550979,0.7344027170432255,0.7327061585364671,0.7310159736367406,0.7293321360975216,0.7276546197250732,0.7259833983796455,0.7243184459766473,0.7226597364877866,0.7210072439421855,0.7193609424274653,0.717720806090805,0.7160868091399732,0.7144589258443317,0.7128371305358143,0.7112213976098805,0.7096117015264408,0.7080080168107608,0.7064103180543367,0.7048185799157509,0.7032327771214993,0.7016528844667989,0.7000788768163694,0.6985107291051944,0.6969484163392584,0.6953919135962627,0.6938411960263199,0.6922962388526266,0.6907570173721149,0.6892235069560844,0.6876956830508126,0.6861735211781471,0.6846569969360763,0.6831460859992823,0.6816407641196744,0.6801410071269042,0.6786467909288618,0.6771580915121557,0.6756748849425723,0.6741971473655217,0.6727248550064631,0.6712579841713158,0.6697965112468522,0.6683404127010766,0.6668896650835858,0.6654442450259164,0.6640041292418751,0.6625692945278554,0.6611397177631388,0.6597153759101816,0.6582962460148875,0.6568823052068675,0.6554735306996842,0.6540698997910842,0.6526713898632168,0.65127797838284,0.6498896429015135,0.6485063610557804,0.6471281105673351,0.6457548692431807,0.6443866149757747,0.6430233257431612,0.6416649796090956,0.6403115547231546,0.6389630293208375,0.637619381723657,0.6362805903392181,0.634946633661289,0.63361749026986,0.6322931388311946,0.6309735580978693,0.6296587269088055,0.6283486241892914,0.6270432289509956,0.6257425202919713,0.6244464773966524,0.6231550795358413,0.6218683060666879,0.6205861364326614,0.6193085501635136,0.6180355268752351,0.6167670462700033,0.615503088136124,0.6142436323479643,0.6129886588658808,0.6117381477361389,0.6104920790908257,0.6092504331477582,0.6080131902103822,0.6067803306676677,0.6055518349939962,0.6043276837490433,0.603107857577655,0.601892337209718,0.6006811034600255,0.5994741372281365,0.5982714194982302,0.5970729313389561,0.5958786539032774,0.5946885684283113,0.5935026562351632,0.5923208987287572,0.5911432773976609,0.589969773813908,0.588800369632814,0.587635046592789,0.5864737865151474,0.5853165713039113,0.5841633829456123,0.5830142035090886,0.5818690151452781,0.5807278000870089,0.5795905406487851,0.5784572192265715,0.5773278182975716,0.5762023204200064,0.5750807082328872,0.5739629644557862,0.5728490718886059,0.5717390134113426,0.5706327719838499,0.569530330645599,0.5684316725154349,0.5673367807913328,0.5662456387501493,0.5651582297473738,0.5640745372168765,0.5629945446706536,0.5619182356985722,0.5608455939681118,0.5597766032241043,0.5587112472884722,0.5576495100599655,0.5565913755138963,0.555536827701871,0.554485850751523,0.5534384288662424,0.552394546324904,0.5513541874815956,0.5503173367653424,0.5492839786798329,0.5482540978031419,0.5472276787874524,0.5462047063587768,0.5451851653166775,0.5441690405339856,0.5431563169565189,0.5421469796028001,0.5411410135637718,0.5401384040025135,0.5391391361539556,0.5381431953245944,0.5371505668922051,0.5361612363055549,0.5351751890841157,0.5341924108177756,0.5332128871665506,0.5322366038602957,0.5312635466984152,0.5302937015495736,0.5293270543514041,0.5283635911102204,0.5274032979007242,0.5264461608657155,0.5254921662158017,0.524541300229106,0.5235935492509765,0.5226488996936951,0.5217073380361861,0.520768850823725,0.5198334246676473,0.5189010462450573,0.5179717022985372,0.5170453796358556,0.5161220651296776,0.5152017457172735,0.5142844084002286,0.5133700402441527,0.5124586283783908,0.511550159995733,0.5106446223521248,0.5097420027663793,0.5088422886198867,0.507945467356328,0.5070515264813853,0.5061604535624554,0.5052722362283627,0.5043868621690718,0.5035043191354025,0.5026245949387429,0.5017476774507657,0.5008735546031425,0.5000022143872602,0.49913364485393796,0.4982678341131435,0.4974047703337115,0.49654444174306156,0.49568683662691776,0.4948319433290276,0.4939797502508828,0.49313024585144033,0.49228341864684366,0.4914392572101457,0.4905977501710316,0.4897588862155426,0.48892265408580093,0.4880890425797346,0.48725804055080457,0.4864296369077302,0.48560382061421853,0.4847805806886915,0.4839599062040161,0.48314178628723414,0.48232621011929344,0.4815131669347793,0.480702646021648,0.479894636720959,0.479089128426611,0.47828611058507575,0.4774855726951352,0.476687504307618,0.4758918950251379,0.4750987345018323,0.4743080124431022,0.473519718605353,0.47273384279573594,0.47195037487189057,0.47116930474168883,0.47039062236297874,0.4696143177433307,0.4688403809397828,0.46806880205858903,0.46729957125496707,0.4665326787328478,0.46576811474462554,0.4650058695909088,0.46424593362027317,0.4634882972290139,0.4627329508609003,0.46197988500693116,0.4612290902050903,0.46048055704010393,0.45973427614319917,0.45899023819186285,0.45824843390960146,0.4575088540657028,0.45677148947499774,0.4560363309976237,0.45530336953878825,0.4545725960485352,0.45384400152151017,0.4531175769967277,0.45239331355734014,0.45167120233040636,0.45095123448666224,0.4502334012402918,0.4495176938487,0.4488041036122854,0.4480926218742149,0.44738324002019925,0.4466759494782692,0.445970741718553,0.4452676082530548,0.4445665406354342,0.44386753046078703,0.44317056936542587,0.4424756490266638,0.44178276116259735,0.44109189753189065,0.4404030499335619,0.4397162102067693,0.4390313702305992,0.4383485219238539,0.437667657244842,0.43698876819116916,0.43631184679952884,0.435636885145496,0.4349638753433201,0.43429280954572025,0.4336236799436802,0.4329564787662457,0.4322911982803222,0.43162783079047273,0.43096636863871846,0.430306804204339,0.4296491299036737,0.42899333818992513,0.428339421552962,0.4276873725191242,0.42703718365102783,0.42638884754737255,0.42574235684274875,0.42509770420744564,0.42445488234726175,0.42381388400331466,0.42317470195185264,0.4225373290040669,0.4219017580059053,0.42126798183788655,0.42063599341491514,0.4200057856860982,0.41937735163456213,0.418750684277271,0.41812577666484574,0.41750262188138365,0.4168812130442803,0.41626154330405,0.4156436058441502,0.41502739388080423,0.414412900662826,0.41380011947144624,0.41318904362013836,0.4125796664544463,0.4119719813518126,0.4113659817214079,0.4107616610039609,0.4101590126715895,0.4095580302276329,0.40895870720648414,0.4083610371734243,0.4077650137244567,0.40717063048614277,0.40657788111543813,0.4059867592995302,0.4053972587556762,0.40480937323104227,0.40422309650254307,0.4036384223766831,0.40305534468939785,0.40247385730589663,0.4018939541205054,0.40131562905651147,0.40073887606600866,0.40016368912974226,0.3995900622569569,0.39901798948524336,0.3984474648803872,0.3978784825362179,0.39731103657445893,0.39674512114457877,0.39618073042364216,0.39561785861616316,0.3950564999539581,0.3944966486959995,0.3939382991282715,0.39338144556362514,0.39282608234163524,0.3922722038284572,0.3917198044166854,0.3911688785252124,0.39061942059908766,0.39007142510937887,0.3895248865530327,0.3889797994527371,0.3884361583567833,0.38789395783893027,0.3873531924982684,0.38681385695908455,0.38627594587072794,0.38573945390747655,0.38520437576840466,0.38467070617725024,0.3841384398822843,0.3836075716561801,0.3830780962958833,0.38255000862248284,0.3820233034810829,0.3814979757406746,0.38097402029401006,0.38045143205747506,0.3799302059709646,0.37941033699775706,0.37889182012439093,0.37837465036054113,0.377858822738896,0.3773443323150357,0.3768311741673107,0.3763193433967211,0.37580883512679647,0.3752996445034771,0.3747917666949947,0.3742851968917548,0.37377993030621964,0.373275962172791,0.37277328774769475,0.372271902308865,0.37177180115583,0.3712729796095977,0.3707754330125424,0.3702791567282923,0.3697841461416171,0.36929039665831653,0.3687979037051098,0.36830666272952495,0.3678166691997898,0.3673279186047223,0.3668404064536228,0.3663541282761662,0.3658690796222942,0.3653852560621097,0.36490265318577025,0.3644212666033829,0.36394109194489954,0.3634621248600127,0.3629843610180521,0.3625077961078814,0.3620324258377963,0.36155824593542246,0.3610852521476141,0.3606134402403539,0.3601428059986526,0.35967334522644934,0.359205053746513,0.3587379274003439,0.3582719620480756,0.35780715356837794,0.35734349785836034,0.3568809908334755,0.35641962842742403,0.3559594065920588,0.3555003212972912,0.3550423685309967,0.35458554429892125,0.3541298446245887,0.3536752655492083,0.3532218031315828,0.3527694534480168,0.3523182125922265,0.351868076675249,0.35141904182535233,0.3509711041879467,0.3505242599254952,0.3500785052174258,0.3496338362600433,0.34919024926644243,0.3487477404664208,0.3483063061063925,0.3478659424493026,0.34742664577454163,0.3469884123778606,0.34655123857128706,0.34611512068304084,0.34568005505745086,0.3452460380548721,0.3448130660516031,0.34438113543980436,0.34395024262741597,0.34352038403807744,0.34309155611104675,0.34266375530112,0.3422369780785519,0.34181122092897676,0.3413864803533293,0.34096275286776645,0.3405400350035895,0.3401183233071667,0.3396976143398559,0.3392779046779285,0.33885919091249295,0.33844146964941896,0.3380247375092623,0.3376089911271902,0.33719422715290664,0.33678044225057796,0.33636763309876017,0.33595579639032497,0.3355449288323874,0.3351350271462332,0.3347260880672471,0.334318108344841,0.3339110847423831,0.3335050140371271,0.33309989302014176,0.3326957184962408,0.3322924872839138,0.3318901962152567,0.33148884213590313,0.33108842190495585,0.3306889323949192,0.3302903704916309,0.3298927330941953,0.32949601711491633,0.32910021947923096,0.3287053371256433,0.3283113670056585,0.3279183060837179,0.32752615133713364,0.3271348997560241,0.32674454834324984,0.3263550941143493,0.3259665340974758,0.3255788653333337,0.32519208487511625,0.3248061897884426,0.32442117715129576,0.32403704405396105,0.3236537875989644,0.32327140490101147,0.32288989308692656,0.32250924929559277,0.3221294706778913,0.3217505543966422],"x":[1.1,1.103784860557769,1.1075697211155378,1.1113545816733068,1.1151394422310756,1.1189243027888447,1.1227091633466135,1.1264940239043826,1.1302788844621514,1.1340637450199202,1.1378486055776893,1.1416334661354581,1.1454183266932272,1.149203187250996,1.1529880478087648,1.156772908366534,1.1605577689243027,1.1643426294820718,1.1681274900398406,1.1719123505976095,1.1756972111553785,1.1794820717131473,1.1832669322709164,1.1870517928286852,1.1908366533864543,1.1946215139442231,1.198406374501992,1.202191235059761,1.2059760956175298,1.2097609561752989,1.2135458167330677,1.2173306772908365,1.2211155378486056,1.2249003984063744,1.2286852589641435,1.2324701195219123,1.2362549800796814,1.2400398406374502,1.243824701195219,1.247609561752988,1.251394422310757,1.255179282868526,1.2589641434262948,1.2627490039840636,1.2665338645418327,1.2703187250996015,1.2741035856573706,1.2778884462151394,1.2816733067729085,1.2854581673306773,1.2892430278884461,1.2930278884462152,1.296812749003984,1.300597609561753,1.304382470119522,1.3081673306772907,1.3119521912350598,1.3157370517928286,1.3195219123505977,1.3233067729083665,1.3270916334661356,1.3308764940239044,1.3346613545816732,1.3384462151394423,1.3422310756972111,1.3460159362549802,1.349800796812749,1.3535856573705178,1.357370517928287,1.3611553784860557,1.3649402390438248,1.3687250996015936,1.3725099601593624,1.3762948207171315,1.3800796812749003,1.3838645418326694,1.3876494023904382,1.3914342629482073,1.395219123505976,1.399003984063745,1.402788844621514,1.4065737051792828,1.4103585657370519,1.4141434262948207,1.4179282868525895,1.4217131474103586,1.4254980079681274,1.4292828685258965,1.4330677290836653,1.4368525896414344,1.4406374501992032,1.444422310756972,1.448207171314741,1.45199203187251,1.455776892430279,1.4595617529880478,1.4633466135458166,1.4671314741035857,1.4709163346613545,1.4747011952191236,1.4784860557768924,1.4822709163346615,1.4860557768924303,1.4898406374501991,1.4936254980079682,1.497410358565737,1.501195219123506,1.504980079681275,1.5087649402390437,1.5125498007968128,1.5163346613545816,1.5201195219123507,1.5239043824701195,1.5276892430278886,1.5314741035856574,1.5352589641434262,1.5390438247011953,1.542828685258964,1.5466135458167332,1.550398406374502,1.5541832669322708,1.5579681274900399,1.5617529880478087,1.5655378486055778,1.5693227091633466,1.5731075697211154,1.5768924302788845,1.5806772908366533,1.5844621513944224,1.5882470119521912,1.5920318725099603,1.595816733067729,1.599601593625498,1.603386454183267,1.6071713147410358,1.6109561752988049,1.6147410358565737,1.6185258964143425,1.6223107569721116,1.6260956175298804,1.6298804780876495,1.6336653386454183,1.6374501992031874,1.6412350597609562,1.645019920318725,1.648804780876494,1.652589641434263,1.656374501992032,1.6601593625498008,1.6639442231075696,1.6677290836653387,1.6715139442231075,1.6752988047808766,1.6790836653386454,1.6828685258964144,1.6866533864541833,1.690438247011952,1.6942231075697212,1.69800796812749,1.701792828685259,1.7055776892430279,1.7093625498007967,1.7131474103585658,1.7169322709163346,1.7207171314741037,1.7245019920318725,1.7282868525896415,1.7320717131474104,1.7358565737051792,1.7396414342629483,1.743426294820717,1.7472111553784861,1.750996015936255,1.7547808764940238,1.7585657370517929,1.7623505976095617,1.7661354581673308,1.7699203187250996,1.7737051792828684,1.7774900398406375,1.7812749003984063,1.7850597609561754,1.7888446215139442,1.7926294820717132,1.796414342629482,1.800199203187251,1.80398406374502,1.8077689243027888,1.8115537848605578,1.8153386454183267,1.8191235059760955,1.8229083665338646,1.8266932270916334,1.8304780876494025,1.8342629482071713,1.8380478087649403,1.8418326693227092,1.845617529880478,1.849402390438247,1.853187250996016,1.856972111553785,1.8607569721115538,1.8645418326693226,1.8683266932270917,1.8721115537848605,1.8758964143426295,1.8796812749003984,1.8834661354581674,1.8872509960159363,1.891035856573705,1.8948207171314742,1.898605577689243,1.902390438247012,1.9061752988047809,1.9099601593625497,1.9137450199203188,1.9175298804780876,1.9213147410358566,1.9250996015936255,1.9288844621513945,1.9326693227091634,1.9364541832669322,1.9402390438247012,1.94402390438247,1.9478087649402391,1.951593625498008,1.9553784860557768,1.9591633466135459,1.9629482071713147,1.9667330677290837,1.9705179282868526,1.9743027888446214,1.9780876494023905,1.9818725099601593,1.9856573705179283,1.9894422310756972,1.9932270916334662,1.997011952191235,2.000796812749004,2.004581673306773,2.008366533864542,2.0121513944223106,2.0159362549800797,2.0197211155378487,2.0235059760956173,2.0272908366533864,2.0310756972111554,2.0348605577689245,2.038645418326693,2.042430278884462,2.046215139442231,2.05,2.053784860557769,2.057569721115538,2.061354581673307,2.0651394422310756,2.0689243027888446,2.0727091633466137,2.0764940239043823,2.0802788844621514,2.0840637450199204,2.087848605577689,2.091633466135458,2.095418326693227,2.099203187250996,2.102988047808765,2.106772908366534,2.110557768924303,2.1143426294820715,2.1181274900398406,2.1219123505976096,2.1256972111553787,2.1294820717131473,2.1332669322709163,2.1370517928286854,2.140836653386454,2.144621513944223,2.148406374501992,2.152191235059761,2.15597609561753,2.159760956175299,2.163545816733068,2.1673306772908365,2.1711155378486056,2.1749003984063746,2.1786852589641432,2.1824701195219123,2.1862549800796813,2.1900398406374504,2.193824701195219,2.197609561752988,2.201394422310757,2.2051792828685257,2.2089641434262948,2.212749003984064,2.216533864541833,2.2203187250996015,2.2241035856573705,2.2278884462151396,2.231673306772908,2.2354581673306773,2.2392430278884463,2.243027888446215,2.246812749003984,2.250597609561753,2.254382470119522,2.2581673306772907,2.2619521912350598,2.265737051792829,2.2695219123505974,2.2733067729083665,2.2770916334661355,2.2808764940239046,2.284661354581673,2.2884462151394422,2.2922310756972113,2.29601593625498,2.299800796812749,2.303585657370518,2.307370517928287,2.3111553784860557,2.3149402390438247,2.318725099601594,2.3225099601593624,2.3262948207171315,2.3300796812749005,2.333864541832669,2.337649402390438,2.3414342629482072,2.3452191235059763,2.349003984063745,2.352788844621514,2.356573705179283,2.3603585657370516,2.3641434262948207,2.3679282868525897,2.3717131474103588,2.3754980079681274,2.3792828685258964,2.3830677290836655,2.386852589641434,2.390637450199203,2.394422310756972,2.398207171314741,2.40199203187251,2.405776892430279,2.409561752988048,2.4133466135458166,2.4171314741035856,2.4209163346613547,2.4247011952191233,2.4284860557768924,2.4322709163346614,2.4360557768924305,2.439840637450199,2.443625498007968,2.447410358565737,2.451195219123506,2.454980079681275,2.458764940239044,2.462549800796813,2.4663346613545816,2.4701195219123506,2.4739043824701197,2.4776892430278883,2.4814741035856573,2.4852589641434264,2.489043824701195,2.492828685258964,2.496613545816733,2.500398406374502,2.504183266932271,2.50796812749004,2.511752988047809,2.5155378486055775,2.5193227091633466,2.5231075697211156,2.5268924302788847,2.5306772908366533,2.5344621513944223,2.5382470119521914,2.54203187250996,2.545816733067729,2.549601593625498,2.553386454183267,2.5571713147410358,2.560956175298805,2.564741035856574,2.5685258964143425,2.5723107569721115,2.5760956175298806,2.579880478087649,2.5836653386454183,2.5874501992031873,2.5912350597609564,2.595019920318725,2.598804780876494,2.602589641434263,2.6063745019920317,2.6101593625498007,2.61394422310757,2.617729083665339,2.6215139442231075,2.6252988047808765,2.6290836653386456,2.632868525896414,2.6366533864541832,2.6404382470119523,2.644223107569721,2.64800796812749,2.651792828685259,2.655577689243028,2.6593625498007967,2.6631474103585657,2.666932270916335,2.6707171314741034,2.6745019920318724,2.6782868525896415,2.6820717131474106,2.685856573705179,2.689641434262948,2.6934262948207173,2.697211155378486,2.700996015936255,2.704780876494024,2.708565737051793,2.7123505976095617,2.7161354581673307,2.7199203187250998,2.7237051792828684,2.7274900398406374,2.7312749003984065,2.735059760956175,2.738844621513944,2.742629482071713,2.7464143426294823,2.750199203187251,2.75398406374502,2.757768924302789,2.7615537848605576,2.7653386454183266,2.7691235059760957,2.7729083665338647,2.7766932270916334,2.7804780876494024,2.7842629482071715,2.78804780876494,2.791832669322709,2.795617529880478,2.799402390438247,2.803187250996016,2.806972111553785,2.810756972111554,2.8145418326693226,2.8183266932270916,2.8221115537848607,2.8258964143426293,2.8296812749003983,2.8334661354581674,2.8372509960159364,2.841035856573705,2.844820717131474,2.848605577689243,2.8523904382470118,2.856175298804781,2.85996015936255,2.863745019920319,2.8675298804780875,2.8713147410358566,2.8750996015936257,2.8788844621513943,2.8826693227091633,2.8864541832669324,2.890239043824701,2.89402390438247,2.897808764940239,2.901593625498008,2.9053784860557768,2.909163346613546,2.912948207171315,2.9167330677290835,2.9205179282868525,2.9243027888446216,2.9280876494023906,2.9318725099601592,2.9356573705179283,2.9394422310756974,2.943227091633466,2.947011952191235,2.950796812749004,2.954581673306773,2.9583665338645417,2.962151394422311,2.96593625498008,2.9697211155378485,2.9735059760956175,2.9772908366533866,2.981075697211155,2.9848605577689242,2.9886454183266933,2.9924302788844623,2.996215139442231,3.0]}
},{}],24:[function(require,module,exports){
(function (__filename){(function (){
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

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var acot = require( './../lib' );


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
	t.true( typeof acot, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the inverse cotangent for medium positive values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acot( x[ i ] );
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

tape( 'the function computes the inverse cotangent for medium negative values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acot( x[ i ] );
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

tape( 'the function computes the inverse cotangent for large positive values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acot( x[ i ] );
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

tape( 'the function computes the inverse cotangent for large negative values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acot( x[ i ] );
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

tape( 'the function computes the inverse cotangent for larger positive values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerPositive.x;
	expected = largerPositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acot( x[ i ] );
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

tape( 'the function computes the inverse cotangent for larger negative values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largerNegative.x;
	expected = largerNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acot( x[ i ] );
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

tape( 'the function computes the inverse cotangent for huge positive values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugePositive.x;
	expected = hugePositive.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acot( x[ i ] );
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

tape( 'the function computes the inverse cotangent for huge negative values', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugeNegative.x;
	expected = hugeNegative.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = acot( x[ i ] );
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
	var v = acot( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `+0` if provided `+infinity`', function test( t ) {
	var v = acot( PINF );
	t.equal( isPositiveZero( v ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `-0` if provided `-infinity`', function test( t ) {
	var v = acot( NINF );
	t.equal( isNegativeZero( v ), true, 'returns expected value' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/math/base/special/acot/test/test.js")
},{"./../lib":14,"./fixtures/julia/huge_negative.json":16,"./fixtures/julia/huge_positive.json":17,"./fixtures/julia/large_negative.json":18,"./fixtures/julia/large_positive.json":19,"./fixtures/julia/larger_negative.json":20,"./fixtures/julia/larger_positive.json":21,"./fixtures/julia/medium_negative.json":22,"./fixtures/julia/medium_positive.json":23,"@stdlib/constants/float64/eps":1,"@stdlib/constants/float64/ninf":4,"@stdlib/constants/float64/pinf":5,"@stdlib/math/base/assert/is-nan":6,"@stdlib/math/base/assert/is-negative-zero":8,"@stdlib/math/base/assert/is-positive-zero":10,"@stdlib/math/base/special/abs":12,"tape":136}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
var PINF = require( '@stdlib/constants/float64/pinf' );
var PIO2 = require( '@stdlib/constants/float64/half-pi' );
var PIO4 = require( '@stdlib/constants/float64/fourth-pi' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS.
var T3P8 = 2.41421356237309504880; // tan( 3*pi/8 )


// MAIN //

/**
* Computes the arctangent of a number.
*
* ## Method
*
* -   Range reduction is from three intervals into the interval from 0 to 0.66. The approximant uses a rational function of degree 4/5 of the form
*
*     ```tex
*     x + x^3 \frac{P(x)}{Q(x)}
*     ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain  | # trials | peak    | rms     |
*     |:-----------|:--------|:---------|:--------|:--------|
*     | DEC        | -10, 10 | 50000    | 2.4e-17 | 8.3e-18 |
*     | IEEE       | -10, 10 | 10^6     | 1.8e-16 | 5.0e-17 |
*
* @param {number} x - input value
* @returns {number} arctangent (in radians)
*
* @example
* var v = atan( 0.0 );
* // returns ~0.0
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
*
* var v = atan( -PI/4.0 );
* // returns ~-0.666
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
*
* var v = atan( PI/4.0 );
* // returns ~0.666
*
* @example
* var v = atan( NaN );
* // returns NaN
*/
function atan( x ) {
	var flg;
	var sgn;
	var y;
	var z;
	if ( isnan( x ) || x === 0.0 ) {
		return x;
	}
	if ( x === PINF ) {
		return PIO2;
	}
	if ( x === NINF ) {
		return -PIO2;
	}
	if ( x < 0.0 ) {
		sgn = true;
		x = -x;
	}
	// Range reduction:
	flg = 0;
	if ( x > T3P8 ) {
		y = PIO2;
		flg = 1;
		x = -( 1.0/x );
	}
	else if ( x <= 0.66 ) {
		y = 0.0;
	}
	else {
		y = PIO4;
		flg = 2;
		x = (x-1.0) / (x+1.0);
	}
	z = x * x;
	z = z*polyvalP( z ) / polyvalQ( z );
	z = ( x*z ) + x;
	if ( flg === 2 ) {
		z += 0.5 * MOREBITS;
	}
	else if ( flg === 1 ) {
		z += MOREBITS;
	}
	y += z;
	return ( sgn ) ? -y : y;
}


// EXPORTS //

module.exports = atan;

},{"./polyval_p.js":27,"./polyval_q.js":28,"@stdlib/constants/float64/fourth-pi":2,"@stdlib/constants/float64/half-pi":3,"@stdlib/constants/float64/ninf":4,"@stdlib/constants/float64/pinf":5,"@stdlib/math/base/assert/is-nan":6}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Compute the arctangent of a number.
*
* @module @stdlib/math/base/special/atan
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* var atan = require( '@stdlib/math/base/special/atan' );
*
* var v = atan( 0.0 );
* // returns ~0.0
*
* v = atan( -PI/4.0 );
* // returns ~-0.666
*
* v = atan( PI/4.0 );
* // returns ~0.666
*
* v = atan( NaN );
* // returns NaN
*/

// MODULES //

var atan = require( './atan.js' );


// EXPORTS //

module.exports = atan;

},{"./atan.js":25}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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
		return -64.85021904942025;
	}
	return -64.85021904942025 + (x * (-122.88666844901361 + (x * (-75.00855792314705 + (x * (-16.157537187333652 + (x * -0.8750608600031904))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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
		return 194.5506571482614;
	}
	return 194.5506571482614 + (x * (485.3903996359137 + (x * (432.88106049129027 + (x * (165.02700983169885 + (x * (24.858464901423062 + (x * 1.0))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

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

},{"./number.js":30}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){

},{}],33:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],34:[function(require,module,exports){
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
},{"base64-js":31,"buffer":34,"ieee754":122}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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
},{"_process":128}],37:[function(require,module,exports){
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

},{"events":35,"inherits":123,"readable-stream/lib/_stream_duplex.js":39,"readable-stream/lib/_stream_passthrough.js":40,"readable-stream/lib/_stream_readable.js":41,"readable-stream/lib/_stream_transform.js":42,"readable-stream/lib/_stream_writable.js":43,"readable-stream/lib/internal/streams/end-of-stream.js":47,"readable-stream/lib/internal/streams/pipeline.js":49}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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
},{"./_stream_readable":41,"./_stream_writable":43,"_process":128,"inherits":123}],40:[function(require,module,exports){
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
},{"./_stream_transform":42,"inherits":123}],41:[function(require,module,exports){
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
},{"../errors":38,"./_stream_duplex":39,"./internal/streams/async_iterator":44,"./internal/streams/buffer_list":45,"./internal/streams/destroy":46,"./internal/streams/from":48,"./internal/streams/state":50,"./internal/streams/stream":51,"_process":128,"buffer":34,"events":35,"inherits":123,"string_decoder/":135,"util":32}],42:[function(require,module,exports){
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
},{"../errors":38,"./_stream_duplex":39,"inherits":123}],43:[function(require,module,exports){
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
},{"../errors":38,"./_stream_duplex":39,"./internal/streams/destroy":46,"./internal/streams/state":50,"./internal/streams/stream":51,"_process":128,"buffer":34,"inherits":123,"util-deprecate":144}],44:[function(require,module,exports){
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
},{"./end-of-stream":47,"_process":128}],45:[function(require,module,exports){
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
},{"buffer":34,"util":32}],46:[function(require,module,exports){
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
},{"_process":128}],47:[function(require,module,exports){
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
},{"../../../errors":38}],48:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],49:[function(require,module,exports){
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
},{"../../../errors":38,"./end-of-stream":47}],50:[function(require,module,exports){
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
},{"../../../errors":38}],51:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":35}],52:[function(require,module,exports){
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

},{"./":53,"get-intrinsic":117}],53:[function(require,module,exports){
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

},{"function-bind":116,"get-intrinsic":117}],54:[function(require,module,exports){
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

},{"./lib/is_arguments.js":55,"./lib/keys.js":56}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],57:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = require('has-property-descriptors')();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

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
		object[name] = value; // eslint-disable-line no-param-reassign
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

},{"has-property-descriptors":118,"object-keys":126}],58:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],59:[function(require,module,exports){
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

},{"./ToNumber":89,"./ToPrimitive":91,"./Type":96}],60:[function(require,module,exports){
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

},{"../helpers/isFinite":105,"../helpers/isNaN":107,"../helpers/isPrefixOf":108,"./ToNumber":89,"./ToPrimitive":91,"./Type":96,"get-intrinsic":117}],61:[function(require,module,exports){
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

},{"get-intrinsic":117}],62:[function(require,module,exports){
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

},{"./DayWithinYear":65,"./InLeapYear":69,"./MonthFromTime":79,"get-intrinsic":117}],63:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":112,"./floor":100}],64:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":100}],65:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":63,"./DayFromYear":64,"./YearFromTime":98}],66:[function(require,module,exports){
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

},{"./modulo":101}],67:[function(require,module,exports){
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
	}
	throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');

};

},{"../helpers/assertRecord":104,"./IsAccessorDescriptor":70,"./IsDataDescriptor":72,"./Type":96,"get-intrinsic":117}],68:[function(require,module,exports){
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

},{"../helpers/timeConstants":112,"./floor":100,"./modulo":101}],69:[function(require,module,exports){
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

},{"./DaysInYear":66,"./YearFromTime":98,"get-intrinsic":117}],70:[function(require,module,exports){
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

},{"../helpers/assertRecord":104,"./Type":96,"has":121}],71:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":124}],72:[function(require,module,exports){
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

},{"../helpers/assertRecord":104,"./Type":96,"has":121}],73:[function(require,module,exports){
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

},{"../helpers/assertRecord":104,"./IsAccessorDescriptor":70,"./IsDataDescriptor":72,"./Type":96}],74:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":109,"./IsAccessorDescriptor":70,"./IsDataDescriptor":72,"./Type":96}],75:[function(require,module,exports){
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

},{"../helpers/isFinite":105,"../helpers/timeConstants":112}],76:[function(require,module,exports){
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

},{"../helpers/isFinite":105,"./DateFromTime":62,"./Day":63,"./MonthFromTime":79,"./ToInteger":88,"./YearFromTime":98,"./floor":100,"./modulo":101,"get-intrinsic":117}],77:[function(require,module,exports){
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

},{"../helpers/isFinite":105,"../helpers/timeConstants":112,"./ToInteger":88}],78:[function(require,module,exports){
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

},{"../helpers/timeConstants":112,"./floor":100,"./modulo":101}],79:[function(require,module,exports){
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

},{"./DayWithinYear":65,"./InLeapYear":69}],80:[function(require,module,exports){
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

},{"../helpers/isNaN":107}],81:[function(require,module,exports){
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

},{"../helpers/timeConstants":112,"./floor":100,"./modulo":101}],82:[function(require,module,exports){
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

},{"./Type":96}],83:[function(require,module,exports){
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


},{"../helpers/isFinite":105,"./ToNumber":89,"./abs":99,"get-intrinsic":117}],84:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":112,"./DayFromYear":64}],85:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":112,"./modulo":101}],86:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],87:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":89}],88:[function(require,module,exports){
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

},{"../helpers/isFinite":105,"../helpers/isNaN":107,"../helpers/sign":111,"./ToNumber":89,"./abs":99,"./floor":100}],89:[function(require,module,exports){
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

},{"./ToPrimitive":91}],90:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":61,"get-intrinsic":117}],91:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":113}],92:[function(require,module,exports){
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

},{"./IsCallable":71,"./ToBoolean":86,"./Type":96,"get-intrinsic":117,"has":121}],93:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":117}],94:[function(require,module,exports){
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

},{"../helpers/isFinite":105,"../helpers/isNaN":107,"../helpers/sign":111,"./ToNumber":89,"./abs":99,"./floor":100,"./modulo":101}],95:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":89}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":63,"./modulo":101}],98:[function(require,module,exports){
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

},{"call-bind/callBound":52,"get-intrinsic":117}],99:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":117}],100:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],101:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":110}],102:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":112,"./modulo":101}],103:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":59,"./5/AbstractRelationalComparison":60,"./5/CheckObjectCoercible":61,"./5/DateFromTime":62,"./5/Day":63,"./5/DayFromYear":64,"./5/DayWithinYear":65,"./5/DaysInYear":66,"./5/FromPropertyDescriptor":67,"./5/HourFromTime":68,"./5/InLeapYear":69,"./5/IsAccessorDescriptor":70,"./5/IsCallable":71,"./5/IsDataDescriptor":72,"./5/IsGenericDescriptor":73,"./5/IsPropertyDescriptor":74,"./5/MakeDate":75,"./5/MakeDay":76,"./5/MakeTime":77,"./5/MinFromTime":78,"./5/MonthFromTime":79,"./5/SameValue":80,"./5/SecFromTime":81,"./5/StrictEqualityComparison":82,"./5/TimeClip":83,"./5/TimeFromYear":84,"./5/TimeWithinDay":85,"./5/ToBoolean":86,"./5/ToInt32":87,"./5/ToInteger":88,"./5/ToNumber":89,"./5/ToObject":90,"./5/ToPrimitive":91,"./5/ToPropertyDescriptor":92,"./5/ToString":93,"./5/ToUint16":94,"./5/ToUint32":95,"./5/Type":96,"./5/WeekDay":97,"./5/YearFromTime":98,"./5/abs":99,"./5/floor":100,"./5/modulo":101,"./5/msFromTime":102}],104:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var isMatchRecord = require('./isMatchRecord');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Desc) {
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
	},
	// https://262.ecma-international.org/13.0/#sec-match-records
	'Match Record': isMatchRecord
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (Type(value) !== 'Object' || !predicate(value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"./isMatchRecord":106,"get-intrinsic":117,"has":121}],105:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],106:[function(require,module,exports){
'use strict';

var has = require('has');

// https://262.ecma-international.org/13.0/#sec-match-records

module.exports = function isMatchRecord(record) {
	return (
		has(record, '[[StartIndex]]')
        && has(record, '[[EndIndex]]')
        && record['[[StartIndex]]'] >= 0
        && record['[[EndIndex]]'] >= record['[[StartIndex]]']
        && String(parseInt(record['[[StartIndex]]'], 10)) === String(record['[[StartIndex]]'])
        && String(parseInt(record['[[EndIndex]]'], 10)) === String(record['[[EndIndex]]'])
	);
};

},{"has":121}],107:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],108:[function(require,module,exports){
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

},{"call-bind/callBound":52}],109:[function(require,module,exports){
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

},{"get-intrinsic":117,"has":121}],110:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],111:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{"./helpers/isPrimitive":114,"is-callable":124}],114:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":115}],117:[function(require,module,exports){
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

},{"function-bind":116,"has":121,"has-symbols":119}],118:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
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

},{"get-intrinsic":117}],119:[function(require,module,exports){
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

},{"./shams":120}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":116}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{"./isArguments":127}],126:[function(require,module,exports){
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

},{"./implementation":125,"./isArguments":127}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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
},{"_process":128,"through":142,"timers":143}],130:[function(require,module,exports){
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

},{"buffer":34}],131:[function(require,module,exports){
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

},{"es-abstract/es5":103,"function-bind":116}],132:[function(require,module,exports){
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

},{"./implementation":131,"./polyfill":133,"./shim":134,"define-properties":57,"function-bind":116}],133:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":131}],134:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":133,"define-properties":57}],135:[function(require,module,exports){
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
},{"safe-buffer":130}],136:[function(require,module,exports){
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
},{"./lib/default_stream":137,"./lib/results":139,"./lib/test":140,"_process":128,"defined":58,"through":142,"timers":143}],137:[function(require,module,exports){
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
},{"_process":128,"fs":33,"through":142}],138:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":128,"timers":143}],139:[function(require,module,exports){
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
},{"_process":128,"events":35,"function-bind":116,"has":121,"inherits":123,"object-inspect":141,"resumer":129,"through":142,"timers":143}],140:[function(require,module,exports){
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
},{"./next_tick":138,"deep-equal":54,"defined":58,"events":35,"has":121,"inherits":123,"path":36,"string.prototype.trim":132}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
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
},{"_process":128,"stream":37}],143:[function(require,module,exports){
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
},{"process/browser.js":128,"timers":143}],144:[function(require,module,exports){
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
},{}]},{},[24]);
