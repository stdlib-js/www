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

},{"@stdlib/number/ctor":8}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":5}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":7}],7:[function(require,module,exports){
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

},{"./number.js":9}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a uniform distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 9.0, 0.0, 10.0 );
* // returns 0.9
*
* @example
* var y = cdf( 0.5, 0.0, 2.0 );
* // returns 0.25
*
* @example
* var y = cdf( +Infinity, 2.0, 4.0 );
* // returns 1.0
*
* @example
* var y = cdf( -Infinity, 2.0, 4.0 );
* // returns 0.0
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 1.0, 0.0 );
* // returns NaN
*/
function cdf( x, a, b ) {
	if (
		isnan( x ) ||
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return NaN;
	}
	if ( x < a ) {
		return 0.0;
	}
	if ( x >= b ) {
		return 1.0;
	}
	return ( x - a ) / ( b - a );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":4}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Returns a function for evaluating the cumulative distribution function (CDF) for a uniform distribution with minimum support `a` and maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} CDF
*
* @example
* var cdf = factory( 0.0, 10.0 );
* var y = cdf( 0.5 );
* // returns 0.05
*
* y = cdf( 8.0 );
* // returns 0.8
*/
function factory( a, b ) {
	if (
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a uniform distribution.
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
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < a ) {
			return 0.0;
		}
		if ( x >= b ) {
			return 1.0;
		}
		return ( x - a ) / ( b - a );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":4,"@stdlib/utils/constant-function":33}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Uniform distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/uniform/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/uniform/cdf' );
*
* var y = cdf( 5.0, 0.0, 4.0 );
* // returns 1.0
*
* var mycdf = cdf.factory( 0.0, 10.0 );
* y = mycdf( 0.5 );
* // returns 0.05
*
* y = mycdf( 8.0 );
* // returns 0.8
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":10,"./factory.js":11,"@stdlib/utils/define-nonenumerable-read-only-property":34}],13:[function(require,module,exports){
module.exports={"expected":[1.0,0.35042547929180595,1.0,1.0,0.5750832662146995,1.0,0.9919782799001222,1.0,1.0,0.6690598560058184,1.0,1.0,0.0,1.0,1.0,0.11131333574308912,0.01454881438910254,0.6074847080809535,0.4664123189296854,0.36302400951552516,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.007988649341880942,1.0,1.0,1.0,0.9673682260895761,1.0,0.0,0.2711982031360785,1.0,0.4232229363870876,1.0,0.6207919411388683,0.2853822475960301,0.5937346504677162,1.0,1.0,0.9051600691492365,1.0,0.10833428041607136,0.8232259136169826,1.0,0.8872972302654576,1.0,0.45359449840205474,1.0,1.0,0.7904695333015989,0.2295816744064352,0.3040333653766675,1.0,1.0,0.27761294733845554,1.0,1.0,0.7096469298186393,1.0,0.0,0.21783304283439256,1.0,1.0,1.0,1.0,0.46595940124557655,0.6016946245534366,0.2660929417204877,0.47466980424724114,1.0,1.0,0.2385640458987335,1.0,0.0,1.0,1.0,0.9353853255262703,1.0,0.7074481543066702,0.21413713097828574,1.0,1.0,0.0,0.948504004153211,1.0,0.08870557249203732,0.43379784695864915,0.5654799719919904,1.0,1.0,0.17049109869718865,0.6903348089086779,1.0,0.22796378102286727,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.43328071311685984,0.17468719889502682,1.0,1.0,1.0,0.6328347756597806,0.891381721739081,0.0,0.3031611955745748,0.7020539753194021,0.0,0.548638709353486,1.0,0.0,0.09287780340071355,1.0,1.0,1.0,0.026226403387401793,0.9321845478660635,1.0,1.0,1.0,0.382004321809933,0.8222480782845373,0.6659028916514387,1.0,1.0,0.014810491366798208,0.15488281179676067,0.11564824340860876,1.0,0.8897116244926738,0.9185874225068424,1.0,1.0,0.8335461735023413,1.0,0.0,1.0,0.1992893218618052,1.0,1.0,1.0,0.10278598181007474,0.1731715240840994,1.0,1.0,1.0,0.5610160737470354,1.0,1.0,0.21014445876613938,1.0,0.45979690142154356,0.6362013987266191,0.04578568548450182,1.0,1.0,0.20403687675014714,0.09584119559575056,0.25727299924140773,0.026547594236602044,0.6066314223272413,0.7452347300653199,1.0,1.0,0.0,1.0,1.0,1.0,0.7439919864086414,0.9635442398352232,1.0,0.33939133686333367,0.3822311814839325,1.0,1.0,0.0,0.9389434666323273,0.6405427534932584,0.33736978328350636,1.0,1.0,1.0,0.23845657450270563,1.0,1.0,1.0,0.3963329039025126,0.7705034050095666,1.0,0.4492363416603919,0.7752575558209316,0.8899203137502429,1.0,0.0,0.0,0.2921507382034617,1.0,0.9636158153718466,0.03489877223427649,0.8464830207735436,0.7535476094121717,1.0,0.5773869205154862,1.0,0.8249298180188872,1.0,0.08498894909549896,1.0,0.3645993850000279,0.6531892991763641,0.07466298120702625,0.0,1.0,0.7479057315469078,1.0,1.0,1.0,0.2673483524420491,0.22193571770440484,1.0,0.7950992761712062,1.0,0.731333869134837,0.7926893785064514,1.0,1.0,0.34535332888050657,0.6881176245089892,0.757143880239433,0.5184536030503827,0.0,1.0,0.33742609650868316,0.9554654159671848,1.0,1.0,0.017907285158020876,0.5309828764513075,0.44727407727344265,0.003488320042866322,0.4065435046487482,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.5409404928762782,1.0,0.40030909500802875,1.0,1.0,0.30845887353786355,0.0,1.0,0.0,1.0,1.0,1.0,0.7158453974240195,1.0,1.0,1.0,1.0,0.00851888105472369,0.0,0.8051317797273639,0.9309417438124974,1.0,0.42493122237558223,1.0,0.9737530821270238,0.0,0.918940252133227,0.0,0.4314720043133948,0.9594708955284109,0.018017434813686017,0.7633224841238471,0.5703619489347576,1.0,1.0,0.8343297820415029,1.0,0.6360023153162558,0.14392081559270095,1.0,1.0,1.0,0.616601354594119,0.6503292482067212,1.0,1.0,0.0049996378207145835,0.2682973993423824,0.0,1.0,1.0,1.0,0.4687627026272281,0.3553885546573513,0.9979594340995883,1.0,1.0,0.7064810984161225,0.26763657049587264,1.0,0.8348079096825162,1.0,0.7057720302178639,0.6905109469187644,1.0,0.29966658957041103,0.8761665317988719,1.0,0.8792615722758833,0.0,1.0,1.0,0.19529492400468104,1.0,1.0,0.6869865030835219,1.0,0.14928886318042717,1.0,0.3260724233984061,0.0,1.0,0.1940238085239896,1.0,0.46766251632242506,1.0,1.0,1.0,0.0,0.8876897281680542,0.6591395485975182,1.0,0.0,1.0,1.0,0.07461512542166247,1.0,1.0,0.1543618102816309,1.0,0.29594111692997105,0.2858443373629375,0.10536578237242404,1.0,1.0,0.19925566410011308,0.0,0.0,1.0,0.9945414692112311,0.5045315349597769,0.1567413921718811,0.7313083745508902,0.0,1.0,1.0,0.0,0.06385698204164268,0.3186062945256155,1.0,0.0,1.0,1.0,0.04076497393832791,1.0,0.42085528911916015,1.0,0.8947816087189541,1.0,1.0,1.0,0.7230337970564304,0.38064135146126693,1.0,0.7930871356212092,0.8392479995969435,1.0,0.6523812891298908,0.183549966915893,0.8600389462749655,0.10813813924670855,1.0,0.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,0.5562596764761325,0.5948608731454088,0.6332283898929856,1.0,0.3054096702578293,1.0,1.0,0.9457090959752195,1.0,1.0,0.0,1.0,0.6433961522180442,1.0,1.0,1.0,1.0,1.0,1.0,0.09080431541894464,0.44582956986168626,0.6816107984457815,1.0,0.7650185555782949,0.9610551885142082,0.03477172854815148,0.34655257276940554,1.0,0.24565121247615015,0.5630554413173126,0.0,0.281162745961732,0.0,0.9973689047916492,1.0,0.00858871699703571,0.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.8732078080441108,1.0,1.0,0.04059481621454384,0.0,0.914240802460541,1.0,0.5571520020527307,0.8335076049453352,1.0,0.5424615430850193,0.13794392793302115,0.056669358435696614,0.0,0.0339598278360348,0.5099899554343277,0.0707292118287055,1.0,1.0,1.0,0.06348688403062744,1.0,1.0,1.0,0.743963440264149,0.785229537882154,0.6892346400298671,0.0,0.405403840575074,1.0,0.429354848734189,0.021017201926114004,0.23171946221632578,0.0,0.39764269446823697,1.0,1.0,1.0,0.0,1.0,0.29592676929204914,1.0,0.9550327244220962,1.0,0.5868564366898955,0.1401228248883728,0.0,1.0,0.0,0.0,0.03289185782974386,1.0,1.0,0.630039531326585,0.38446528654239426,0.498603357283,1.0,0.7507211267386364,1.0,0.6502508757690175,0.7953640029644828,1.0,0.7729492620469669,0.21375440771795237,1.0,1.0,0.07741093912525586,1.0,1.0,0.10380390412186387,0.2404957793582394,0.0,0.15860201991990705,1.0,0.6858223395129625,1.0,1.0,0.31677201950282186,1.0,1.0,0.0,1.0,1.0,0.005957972068142018,1.0,1.0,1.0,1.0,1.0,0.5426752504070593,1.0,0.024151472445956758,0.8758553197627628,0.0,0.7202305938194138,1.0,0.8370731082204607,1.0,1.0,1.0,0.4184596797534174,1.0,0.5007766639864424,0.9354640650975055,0.11183058495078896,1.0,0.4254397581106132,0.8719676639324306,0.0,1.0,0.13490133424719838,1.0,1.0,0.447270248014353,0.0,1.0,1.0,0.8269488803854769,0.23311237513039523,0.0,1.0,0.3313135480622089,0.961241744197537,0.0,1.0,0.40751108761568944,1.0,0.6432836743857964,1.0,0.0,1.0,1.0,0.4553199566120336,0.11126136579745492,1.0,1.0,0.0,0.1660793527828584,1.0,0.6865854626175605,1.0,1.0,1.0,0.49531579389379804,0.715443482559043,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.7147286322143954,1.0,0.19728680739877216,0.4291066623899388,1.0,0.12415565621152506,0.4834445866054642,0.6202394069787702,1.0,1.0,0.9389775819759064,1.0,0.5911342368468265,0.8179486693393132,1.0,0.24931136190567466,0.7356184447212847,1.0,1.0,1.0,0.45351305227098415,1.0,0.5345924554179844,0.7334720375264788,1.0,1.0,0.2518129800437897,1.0,0.1016779869968866,0.875543939306001,0.0,1.0,1.0,1.0,1.0,1.0,0.354373932077925,0.4073166492828648,0.289950593197738,0.0,0.0,0.20528612330815962,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,0.8121339623831848,1.0,1.0,0.514476182292741,0.38972044161918845,1.0,0.542202891692881,1.0,1.0,0.0,1.0,0.17726024126605347,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,0.4402645284423356,0.0,1.0,0.34322356400289117,1.0,0.1191080447596486,0.7306986306560647,0.10594924522958386,1.0,0.0,0.0,0.44268543060912274,1.0,1.0,0.0,0.8356648032878079,0.21602360631601755,1.0,1.0,1.0,1.0,0.8055149126343508,1.0,0.15419644299617646,1.0,0.0,0.09864385172788334,0.1320699934628976,1.0,1.0,1.0,1.0,0.4826710109154562,1.0,0.0,0.0,1.0,0.36408919298717396,1.0,1.0,1.0,0.0,0.0,1.0,0.6365132282104177,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.934239857828506,1.0,1.0,0.6464203770125125,0.0,1.0,1.0,0.0,0.5955068125108203,0.9611534699264875,1.0,0.10130030452800443,1.0,1.0,0.274483617339901,1.0,0.0036950238316444057,0.6478181818040899,0.5321280453108181,0.0,1.0,0.8486037421767324,0.0,0.42363756941081226,1.0,1.0,1.0,1.0,1.0,0.13634900727453975,0.0,1.0,1.0,1.0,1.0,0.0,1.0,0.25108991827984356,1.0,0.4008746877970993,1.0,0.0,1.0,1.0,0.0900401639037725,0.0,0.3097812128655645,0.12357805912023279,0.027432060923128103,0.22969218828698565,1.0,1.0,0.39457414255838413,1.0,1.0,1.0,0.6190874837883376,1.0,1.0,1.0,1.0,1.0,0.5707420200632096,0.10540435445671315,1.0,1.0,0.0,1.0,1.0,0.46639217011827944,0.23595756917628183,0.0,1.0,1.0,0.0,0.24570918231719766,0.15032318649969179,1.0,0.0,1.0,0.8773944221619248,0.0029886794976748646,1.0,1.0,1.0,1.0,0.887604366850503,0.42425761835420756,0.38812537751995435,0.3395395702430254,0.0,1.0,1.0,0.07037550882312064,0.9773009254082454,1.0,1.0,0.42888919079275567,0.8329474152274151,0.6592373550995293,0.0,0.0,0.6030993352988119,0.07498762917030811,0.1268797037015952,1.0,1.0,1.0,1.0,1.0,1.0,0.373208774509795,0.4369688727880909,0.0871718869832904,1.0,1.0,0.9643684750156546,0.16226392048046331,0.6236478658889213,0.3513600935297782,0.7552855679121934,0.3013813204717021,0.34600307081984766,1.0,0.7756788608731596,1.0,1.0,0.7867420058911558,1.0,1.0,0.16061425997629866,1.0,0.5217146235303602,0.558179169533301,0.681171924505551,0.07633479482496727,1.0,1.0,1.0,0.0,0.0,1.0,0.6844962184163202,1.0,1.0,1.0,0.0,0.9394611503231809,1.0,1.0,0.0,1.0,1.0,0.7915042115549918,0.07766324762612194,0.40426252223992704,0.622675001924339,0.0,0.3608983262281013,0.6029500651902526,1.0,0.0,0.0,0.6745183492091824,0.55298395339529,1.0,0.8852843607773262,0.7858010558843143,0.8794249077861216,1.0,1.0,1.0,0.5749180340652544,0.939649734017038,0.6637434828128244,1.0,0.9759663932386945,0.0,1.0,0.553499992730278,1.0,0.05786681587431588,1.0,0.43794644111877135,1.0,1.0,0.052005386676442854,0.0,0.308446415850003,0.8390189936189956,1.0,1.0,0.41911457815923925,0.0,0.5565611983419776,0.0,1.0,0.2837404496131398,1.0,0.3734222011111957,0.6134432273829745,0.1997061401001255,0.9479380914729829,1.0,1.0,1.0,1.0,1.0,0.5147407062251534,0.6359644131669785,1.0,1.0,1.0,0.0,1.0,1.0,0.7526178499221288,1.0,1.0,1.0,1.0,0.5964823120684927,0.6857381220939259,0.02048771000347061,0.5742605699119567,0.0,0.701814872099123,0.2865737429226509,1.0,0.690256945292858,0.30795336168066756,0.40040922516495187,0.3129694554151511,0.33159033760775103,1.0,0.08725859968025201,1.0,0.1293175734869715,0.3818069535655098,1.0,1.0,0.983473503509596,1.0,0.3478369528027778,0.0,1.0,1.0,1.0,0.972565350011651,0.25057824524139904,1.0,0.7154560106033973,0.6182408637280736,0.1677612063500173,1.0,0.13442598321102525,0.7934355394551834,0.23244843535722834,0.31584877293741576,1.0,1.0,0.08658401708053695,0.2965760677210307,1.0,1.0,1.0],"x":[73.27198948897453,25.297165759986974,87.54515514637365,85.44320579415438,46.62762895168016,84.84045486623673,74.10029284446524,89.3234645744621,67.61815337487454,45.97795653634875,44.46019686005609,70.50724405351127,4.967062231587316,78.54156614165633,78.35486088577362,16.6154738350615,19.725467870704904,26.783564844400033,20.950078363584513,17.313071017765512,20.04468446438523,76.18583114021769,56.69252683916508,95.63126540136291,10.734830653914385,52.64629847477027,58.36651117646827,77.00122724637528,97.37062223037647,16.6071630534109,95.63034954268717,42.98349321881132,73.01888305438658,37.195260392857186,80.44913010716557,2.1505452182220663,29.231477858179854,92.1528425051642,17.89060067078354,83.77562924144884,49.716005310971646,22.528424859718044,38.280352165123354,48.563668418899965,83.12975640648585,59.643558548706245,37.58442709377201,24.723526768033576,38.899656305684125,92.3724579211066,63.50611291105817,57.68494652502951,40.26379119833481,27.272544946535724,80.91260296593012,41.57170638921981,24.355392615738204,34.76182519037019,85.52246594854358,56.77934524553054,31.975900211033647,52.29264862980738,88.02092076931419,47.17144628222813,17.732158438055134,4.5094931981118025,26.52657152844471,93.01439889105183,85.78643103197079,72.77427421794633,80.48585074107464,30.347295235483053,23.87801900590358,26.848296225832048,39.48103973774024,28.779450630609695,49.78764672507434,16.305187834470235,97.70228518606959,6.176931446092615,15.589912223178292,86.81177797821984,69.98976531325584,57.831912774160756,66.26994240158514,22.148854351319635,61.66888017430223,89.37016215744411,16.11378418981022,53.366163946273005,99.55728757621343,24.7957314963585,27.177869170696354,45.59379488698798,77.06180158482705,22.22166744532963,11.611699095331396,36.422515875130614,98.98054909772289,32.148814248295146,97.26281909979451,13.058177545708038,87.7646812444444,61.296337267841714,74.33407941983674,45.62911572353903,85.1722918442146,49.80782232871852,17.673316124581383,50.0311398596154,64.41106454639336,63.03555757909307,49.49624379197177,63.512846418694814,0.4294541954254605,21.451235414008064,38.36853787913774,0.4070981968504084,41.080222172773674,20.09410230341033,1.116680881281784,3.754311787434772,59.35510280151364,93.5925478990498,70.29811287330747,12.477751959650686,69.64858498811486,99.10098302665962,97.8755605838117,73.96980996230272,23.205233998408904,81.64626707284113,49.23683958302638,59.5199176246084,91.42048788668066,18.24613244826574,24.364559161567744,8.72999453407013,53.36665270215655,84.5345805167802,76.55033170282914,33.14514935810098,98.55984737404557,29.882178683961193,42.759296368633585,0.6466037682889114,46.42049037562881,17.654614230326814,39.69752000210518,93.88709882611114,49.584922787230546,6.691920929790962,21.837601034155973,72.20542557155704,63.60877337426552,79.03708371572233,52.640007777132624,75.05336684726443,80.74633652917463,18.381627986604766,91.5119697000423,42.212535243209715,54.466873382543504,9.65235393388566,73.80879021155027,84.84376909850906,33.91185322001302,9.946602740907974,12.688781483667121,11.081589691923321,59.11175125111456,35.52334984288039,67.00841612465341,72.70634103430586,1.7329917451564203,64.87174960422828,53.550719983573146,83.87410028384052,61.17526445701296,52.157781235735,99.00605028973027,15.59329891995931,22.625183647117563,74.15666378830895,89.70619067287278,2.653945460967999,76.1901441058946,40.584647756227184,32.71406888668209,37.873859870531405,46.16175835339984,99.20042711654595,26.146463037026415,64.03079273024592,90.77734944123827,93.97308092190366,44.712954051908916,72.61385621571137,94.61271839270434,38.308695838108605,39.64629703451792,77.8198086920192,73.89900311966902,0.7681736204355527,9.16080228836984,28.918484521938904,85.99320051762183,83.23600034196215,6.050588666719681,59.354754956223,68.1766866516089,32.50558619002808,46.9718460741406,84.8415367238147,67.80786097848765,91.9403028754655,18.874937434761165,31.00365866933903,42.17416822631934,57.92465457398046,8.179190361461576,8.226315476412571,84.18141101666411,73.25466713201965,38.39419830005277,42.32398092409944,46.43726688070251,23.678258707489075,30.252435921006658,60.88030323694888,72.313130604164,39.698852252224,64.86287788365841,63.96827210187186,31.206333759742844,95.35470806961352,29.890559645365244,63.36073140266332,50.59814360067965,29.63867678220524,2.89191442474821,56.16802817302333,27.065695488568032,58.17583883675417,51.08190881074683,98.85130978140015,6.017012379844688,29.2752134068579,52.300020921214,12.18515993472744,20.589737696900556,70.3232514904733,99.73843416001458,46.41616134433757,98.52991758112348,9.40111610467229,35.400690785497105,99.37535732004996,54.4112256394486,53.98750674324258,22.598031065884538,92.80716344576754,53.08159206829066,25.76966535469023,8.742304628806586,91.01594139673786,10.385823170678954,93.04491367923342,59.830483665115366,70.45181214158916,56.33192493684918,68.31438958386119,42.74101302096924,76.39825634438913,60.349464000848215,0.5988708539169219,2.153240231041087,70.41671823132445,20.067218251140684,11.605676209192861,24.16621506198282,96.78690545486704,62.78054317973647,11.794607915001443,57.74331279856533,14.586398338630936,28.613038312858464,63.21515550549259,18.843089206883047,31.307712891674267,46.25406316148335,75.88260300632892,99.22498328034672,76.1152430570541,64.79838723252125,43.70901296134247,15.196445512794376,71.07885562153491,38.8717874497569,56.74021567998408,50.28683587648708,35.0228149654868,32.27653936454378,72.76679482993298,9.513102477795465,28.875593469891058,13.385593336151992,82.14482984877456,95.89436949875873,17.200942003057662,31.22685617631067,10.73307064011384,82.86110329248122,63.369462806513766,75.21440037177751,25.275056670717476,5.088797593184169,61.907545824113306,66.04374069698646,87.94188307818473,47.28449530562475,20.468497525116213,90.60784550234158,21.214539657407872,62.15100471614221,16.929850928220723,47.2927648584369,2.5243045749034243,75.30133301710953,53.2520500792105,25.809076096971605,72.02330888880743,84.496052626063,29.168244088683394,99.69250447800349,23.39441241644988,93.45398822096658,26.28395093786855,15.767701891154617,84.5833588437922,32.90747681465249,86.84533980376365,44.45458660657968,84.74119140938394,63.24835277754697,53.771013070352794,9.541378213942098,54.218055868519954,43.357373602114556,90.93502687152748,2.8867565954088015,51.25744287305072,97.03577525217224,8.685064503919193,80.8316752969176,61.87695728713136,6.943751519372698,80.0241163311836,27.030875714170243,28.097364128689506,8.255128821176406,44.57400830429697,21.96352447441199,31.979622367596928,9.169817978276008,15.356421528820663,81.15165430702879,49.81279749699576,27.786825967458473,28.080531947979082,47.888861590380706,2.918441795634119,35.7456606520415,32.36261301462293,2.8128388893700063,21.887967501019133,19.297368334783304,80.44583495632232,2.839357935746789,51.94482066904311,54.44112055255192,12.717665821181722,74.55933163947893,40.63401464017326,62.369815143137174,77.64397247197459,46.92792610243748,35.51733309147789,71.01526948962787,62.632566503146016,38.916966994584136,72.68181192042107,48.339647907421515,82.53933008492498,64.55215273904315,45.73591599357327,7.839077051753285,79.32897719674071,15.317748366146633,95.1965986161282,3.2366522848527257,86.84136424556547,88.5743512222259,40.044918122953945,2.888397583970903,58.5882359230796,0.6931004067851632,94.17639472462507,78.54855488410945,72.0027081994533,47.313862641919904,31.756774497277583,64.37166267511942,70.72522664960236,21.356723992697013,47.93746310655172,85.95194514389372,68.23595719808564,95.75327836220058,95.82205345241779,13.149020690373714,15.442025997844944,65.09997832471646,74.477530904214,61.6818543808362,90.15647593640888,23.559870896305334,59.356226708132695,91.69014697347737,21.621132095072902,32.99928994458463,48.611755842094254,93.08682195645119,50.8759111499252,65.94301901102774,4.275310928291942,13.081980712455277,85.10811810607485,14.889336540881427,21.247486368101896,8.419240611097711,15.41323489256683,6.776604757400451,77.46936651094522,99.33948551275036,11.916864047068575,6.233624468940602,73.5651896923267,86.2394571127222,32.63886646515455,60.12077164405749,3.436535341701874,25.535205241352777,82.82368019433153,69.94217789453516,71.97253325206054,71.08951311039064,16.61469566751512,6.030195222666346,83.69066460723343,94.0980933994134,42.09737045588191,35.310250581426274,52.55844218857435,51.51777080337905,10.451977344295127,7.495173600519278,8.01255974357784,19.377559110976318,31.625381029196543,3.5375318262267363,45.71127805776574,55.00736390349339,50.70476658593528,9.32452846957963,99.81938860509759,49.87197667614256,56.33959387984704,70.21139189094198,46.91651830276804,61.8464740132032,5.621054056637798,46.43154496820916,35.787774676294724,23.905921889082983,17.095846404375735,13.489477409079242,11.21439798475874,35.51933032870971,94.6901056632135,59.86986810791763,71.98450599611475,7.332486683947348,66.78112068570978,29.40767085891678,17.800299363574613,43.43055566948071,68.27911301289666,48.52922241587845,13.372778909342076,2.132984306537744,29.091885571719402,7.303327693104977,8.237618325775276,20.670731052868984,97.30688625805031,71.9518969298533,50.60712683008888,43.706396092734835,52.62783686382397,67.86832235214497,53.114897523059135,63.20988384226447,35.69796953833018,26.5273690137239,82.06249611830667,71.44645422361866,28.1553026249431,58.51345312380227,81.2122966436948,7.838974114473896,53.38405663958139,27.936146191929943,24.069829510075145,14.147049661154343,2.262869459200334,14.647436735194841,50.648203816174984,36.650853053337265,87.46879528742768,62.5244835797647,37.37143871203823,75.54267239526118,37.19523426825684,5.77471016821256,26.371914345983317,40.944491740611966,0.5197573724316173,94.82831146923509,58.37994909899569,81.34033020099555,74.87239074579088,59.46439069395759,36.44181950298571,97.8610832667997,4.825341116739068,87.34294779548198,0.9888628181139669,64.77390987389222,61.93180099188456,58.829657156723435,20.11270954463862,85.53860080281919,90.39102971397269,42.43116691455005,25.16920143331629,40.71247468106569,69.29716460105311,9.738494494626737,46.75604211963385,9.443585045376368,54.485812948655536,15.309269543288838,70.1430004710061,7.716699917312098,62.133855750455425,92.79319065893634,44.68083891803643,0.4352505139343599,66.1141643237186,20.00044669961598,64.17912839859147,19.909135923565202,12.73432385635438,97.24258267410147,37.95372404931487,53.67200861287855,1.7173673473889428,41.69257490904607,12.045047954043131,52.268777911630515,61.28092766080335,78.3538102512337,1.1545655256834042,45.11160313077491,67.93650464204313,33.73343017636989,27.873679160400755,70.78731041410184,66.06853482556932,2.385736721739584,31.063669841769205,61.52114143651674,55.807455519887014,45.323240581470145,75.3965184884851,24.458288178181874,56.2627793358103,52.281221353355356,93.72671885076167,92.52818920755239,74.0583782437754,13.302277840903454,14.559332221480581,72.270069334142,99.55115343239889,43.75208957204153,92.21334165958194,12.581652201663317,50.51843410356804,84.9286736574413,14.51942449972703,45.71615497403605,30.549413165725504,42.6290352934072,65.04639601909783,59.39388051104268,96.66411219991866,10.695223891628336,75.04116818981039,58.61197185650753,24.350651426718596,47.61084645380789,36.975969570832426,45.605043599279504,94.70038302249841,29.656341845779387,94.62001461131126,14.790147070795022,51.08253256419848,46.71464635659317,90.2111676245917,13.677337081776919,83.83623412835097,6.716959345782336,66.87284268023654,14.924163748651065,66.34943166765899,92.33599757492973,55.594659375297326,83.5650870644018,55.4418409500818,39.506876529422044,24.204811234725465,36.087228042195306,13.392589580175818,1.640484923686003,16.794528034324706,63.236630292364104,61.14797131092624,6.052941126001143,41.040842707470574,33.65083653429788,52.718896945345996,1.8946116523568923,56.557731406714296,97.50528680532248,32.16413484370908,74.32757686701623,26.60244530528868,28.696117657967978,42.02144804391435,87.2061910503642,38.70983008459958,53.50665986833177,88.81422362022045,9.834061827896146,58.7570870427055,10.694828262168699,71.34989612727416,55.56979886223545,0.33997692030998117,50.74155200272581,82.45930599794626,99.81873577144312,12.72504606794631,79.39915676244955,56.72427833818281,39.64222939680055,0.08796096314407365,53.18535510243392,40.46488935113428,53.13173949813401,14.146671102027764,33.66311685422567,9.923251635971454,85.78347010104837,10.86204351179112,11.082754508652947,48.51264943398013,62.826694837695115,74.26750730453779,12.563998169610603,39.32150826981802,23.071766034823348,86.69668646779765,86.95471571399823,90.33695558026929,57.02664932047175,61.52042484279659,50.005970205539406,15.084636539734042,65.8432325279773,1.9786378196744892,22.19797675115125,8.779544175302822,80.8403387537877,87.3069126940584,90.42946281140041,91.92478831312411,27.394619285277066,56.19782017792541,10.268172530488261,10.61398554757389,69.04137414261572,12.18847957562119,83.95851529242435,83.30272741721419,72.44275938394719,2.0077168944740986,7.6827039083862125,86.30668347802495,22.484673501469167,77.490415005625,36.274589587798964,81.91281613207617,91.8754016181827,36.669173689302646,85.90338180167632,6.702569491920007,71.90161862017992,70.72110864486277,77.60363525532281,52.97937832913693,48.566696219084804,72.75751819922174,59.89558249742066,58.68721937283108,3.78416708732332,78.49598131214289,67.30173214970876,8.996863107296061,42.01472670479585,41.34468342736828,70.04335243821697,15.12434312003652,68.5902808432269,71.49019929529065,36.6819947130097,54.88122701709768,8.312425611364226,62.555381973119225,35.50602804332106,8.378642572621576,42.01368677747861,54.78207765759326,11.07245884670236,18.492315640375768,77.67943620071678,76.52648884125614,35.31823854815366,50.09900503210181,27.454496408009852,15.459443459391743,10.524021010747141,68.35898835953257,97.3762724501191,96.14355618035013,72.04897867291926,0.8426777594943591,57.13722163210593,23.908242011606283,76.12287186561812,20.526491444354168,85.60330224211592,6.821483136182338,86.9717263811016,56.882629351325356,5.54310209140485,0.8062437091459929,27.62886006968257,23.07136223898589,7.4460713604472595,21.834738537437225,48.46432925096957,84.41761080311193,35.4152463708489,87.81681876400435,94.32629616667434,68.98733933976354,56.30172016906292,19.943964745483722,54.929578453447746,52.99319468362518,64.59468270231224,31.640754124401347,39.8083944983755,8.251783177655735,96.72976412735767,49.86323316342729,7.809716911008269,61.6136280599826,49.83406169450981,25.41682822487752,24.48061748986334,18.447375570945223,91.56974020316615,86.42298354525828,5.973740796228455,32.64822944455281,29.575909133669033,70.72797016481289,16.055059582691978,87.78309480425601,72.17519192809239,12.021744666141277,86.90454258202422,76.22163030156923,67.74329105173518,58.85153583190819,80.76337660474012,30.712075024050645,36.65099649150274,41.977123212465806,9.008970458933474,94.06996109398386,98.31149644766224,15.242777288717235,80.1980553478078,81.56846320620691,74.54418696915926,35.43569127656847,74.88441253951501,27.47227090530422,11.470256573889138,2.573782902220856,37.25306176010494,21.245612328263984,6.020366451791759,75.2334612753301,63.76881939020625,25.065801161419344,40.5598827051372,45.92866201058554,77.80525812880884,32.77961485927081,42.72403720449589,2.6761110409696753,33.43725860683027,48.065850989490855,84.78122650914386,24.416941657237334,43.450439273844175,26.41644612751872,29.775531970363488,26.7869612825536,18.253671952966034,63.021132830035874,57.77554932273576,45.080396586252405,63.26535915834115,59.67943807262082,61.56039341123278,84.42288577269967,12.195667803185174,65.63914008620841,52.97305914542654,30.21139454612125,55.30550219857433,8.772526090026144,71.44933676200067,67.79878996327307,66.03149509318014,8.899321630918578,9.722821199951825,99.92091069928459,57.98894776882728,84.59570251875796,37.17924796043049,38.75823298864765,6.72405559464635,82.33834521672492,62.39015319046006,69.62061406743605,2.2742222671211065,99.5670786557814,47.08006218374445,73.58447214468984,5.29216327983868,32.30572030253376,61.970153979791576,0.3217695737613324,33.14813764336715,67.61979637152582,81.61906269511022,7.684285636685129,5.143979994191339,41.235747421823966,34.10987167184991,84.12022918364808,62.771768749408395,28.386460110268885,45.06009204700119,84.9416775594716,82.17747553634005,63.09268951611162,52.03428702400208,67.63272958758925,41.91327260694888,71.43988751152949,79.06718072270083,4.670227510131442,78.88181874651703,36.25476627073449,59.08055223470461,21.084658475422756,94.39999057172159,34.23044635742458,86.70516430808964,98.96264613897385,5.126828658309535,4.295487562974243,31.212820580321843,45.085668501554245,49.48051459417178,75.9285950578931,40.14127857357423,9.278232230881311,58.8525854222117,1.365639417187725,98.74391059471037,26.10803035076039,87.57547365501537,33.82276796470221,29.647073110685753,18.415560883163696,54.96888852833097,37.102854598668515,66.05870733492662,71.78144676880666,33.44832570186287,51.62538293407708,45.55458588426291,57.40135071491832,86.66018616058801,80.77809971036942,86.6028430725549,8.344105401839052,47.313345805489114,24.918999358005834,60.03527662663777,61.17166011895638,90.2827762445809,94.86013857999411,66.4015201322719,42.07399732979549,12.942570072679938,14.3931703595362,54.80391185678142,5.593127073503057,46.19845076879741,23.498600073345965,78.52665955542058,69.89930289563571,32.97437797824452,38.64239682443793,41.57597196286733,30.022946771664504,56.96982759465965,15.047513592104433,52.65728609841813,16.098496544875186,15.204803346634566,71.2616322706947,91.87737511923693,92.67342038382591,45.421984005843626,31.970652125642253,8.203554418575587,72.53616585177163,52.075560906720895,59.33359508393436,76.81998673318111,29.157702468770076,32.71862783026476,66.40637998201993,52.88265753209376,29.75973932502731,67.36212943855591,9.16353949992994,60.58261919880008,36.35231805247206,18.329562783811436,72.19755088346922,26.15806367788549,8.842380964903619,22.812507166492413,96.19198655147243,48.793144495443606,93.94055750896315],"b":[48.60325238464105,59.04357981718823,70.78838159743637,53.143965161559024,70.93825316918571,55.36959187504021,74.65836753194334,25.40987310258381,66.03330802267016,66.1084220305342,32.768247424977275,7.308607064307808,35.13924737489985,21.570116999335323,76.20554018943788,45.3898590161981,92.36997019370484,37.37779053226733,41.74958984294833,47.06470348667536,16.219425501768093,12.123742579277526,40.97359683183008,73.36275012768104,95.61477368071839,48.657172931384906,44.468334192722565,25.112972557281907,33.80025962682598,77.57681701347242,86.50681574702128,40.00521695566495,29.84633691014565,38.28161741283381,37.74306974828507,12.536042638869432,65.15219810203344,13.09983709317088,29.173107424656664,17.628557364423717,78.49345911687844,61.304757549156406,64.4058310933919,29.148106224410387,30.780249945293136,63.80664727805308,18.38063257069884,72.8005058657564,43.99443991770299,60.25013985523434,70.40552811338397,44.267980120584795,70.81684263611886,8.586165417734941,58.859125322484175,49.030756129436526,50.26443173523177,81.21268054427155,51.680423859322026,44.14218211409787,84.93501587568295,23.378142919986587,67.8397871347061,64.22042691727664,17.672564242677765,45.81729899538169,59.385644105889156,76.70346596550948,68.76199957412467,20.971924932407155,26.937249314757445,64.89108874120194,31.884901680101592,83.35323321141573,75.30991961009616,6.3332404707031875,46.719249605420146,45.88624569766219,24.205667569544055,79.92255300611616,11.81789265865913,84.5066686681347,73.94725200875935,15.996809535098944,87.3471545742485,66.75575130118409,61.658124014693804,74.1144472874106,22.258511783091365,55.260945344384254,30.8356405356226,80.872649396086,43.20448850698573,66.36629256068639,12.318034937489731,16.82370341199565,58.44898882650546,44.7170634507944,20.56894437334451,85.552101372188,79.61064324369886,51.12446161605112,37.68342066004564,9.993584323666497,72.16822389169849,39.710174226509814,66.73200821945768,94.83365115673845,75.06592290233756,17.160038932182395,51.169358139393495,9.706752777528088,66.9403091232937,70.38243250775876,37.76653896865572,44.61064408017768,53.53460848721045,43.90478466662925,72.31735448237882,6.297574775368302,9.070183925435868,12.997274138910416,37.1050182775781,90.67928029272247,62.423154953042754,89.86379614929182,74.61609926599449,21.268362505914105,29.84797584124682,34.564364509797045,53.99321845617815,95.0069146479618,70.39921452625188,25.27448942582563,82.40373215598396,27.60923810986092,83.42643190441179,30.155234316432104,13.521421573373829,92.81583804935264,82.09498415703794,32.03848790165494,80.1458300577318,35.37295242811315,5.8675886691792645,47.26273919881531,14.961447203336666,77.5337886891995,1.377922412276571,71.83332501405813,41.054407959542004,64.91132801656615,87.7399166914053,52.28978593375854,21.815402243921874,69.93627688650987,87.09145186277975,11.744004279829365,59.74175506221831,41.32466527218892,80.29160917163995,80.71945577467022,78.67915954074496,18.874053601380766,40.33027941180539,58.124323820967255,89.14570511402268,28.200239177620556,32.76665390957826,73.35644487763496,90.18244114955979,44.35639421781789,28.718718657129596,49.97704065504279,44.31621459652038,34.09121062971635,46.20181508410184,25.86208717136811,77.47491571393829,53.83857508139841,73.57578373566594,43.458773665401175,47.48425057125405,68.4770844222313,22.804595481180442,51.09733889697292,80.94654856140166,55.612088060231436,81.22929466753966,33.9357750516761,22.256346661800368,96.40936539249152,85.49477107587794,37.36975500416807,76.39679907807358,19.94595688551488,91.26625020934712,88.5812833238816,56.35389983228936,65.52920648974593,48.480414501292074,85.09384992316865,70.55388665472239,20.467006260325064,37.243903173703416,74.26797457832404,15.507151954146149,85.956148293634,76.25528384719634,69.67090348118684,84.03749613834586,25.385195914613657,77.59626998999458,66.2224479990487,78.85473293730277,22.29841427121203,82.39560505863592,1.2122404204466841,90.85711323919635,85.36412949158868,75.27455128476048,65.2448865518001,56.44326221321288,93.31711174825074,19.026021148592296,15.292269785561295,18.3389527374539,79.79257388945969,71.55664072788144,11.54153262152834,86.21849108841535,13.971770874410264,85.97954488446939,76.39827134509488,16.07613141123538,51.2432720810313,72.9942005336967,85.00213992276048,64.72291092160269,48.69777014111029,49.74221490561909,36.5636762332509,68.61164328866569,60.017768030607115,49.8677042327075,88.25732392020822,81.96542997513642,42.225743166508046,94.75140734783434,88.75528226783409,28.9005326636872,50.61931257174555,61.83984911641595,11.30380649497608,59.46211738291504,40.38746485229315,19.16450880433034,14.96897302890166,84.06671500897019,5.660641491565395,38.62450506336587,77.1966501314838,37.70911446123252,73.07825092237518,73.43354920384172,79.68857699989101,68.4158492023875,66.55305542448997,55.81543153443357,47.89308084719434,72.69860387924676,52.763238695824455,22.97673366061322,20.66113478457044,26.81142067399322,31.512444742310997,51.827396648796096,84.89803432656997,21.527042235050434,6.152499878514814,40.107427176582576,56.80894129572075,64.00091081670058,71.23794951459789,61.78698558018022,44.58879657202709,58.18194862529254,65.73230885235613,60.12401367544072,35.340173025316,78.55533923845572,34.03471068923734,66.91616032515262,88.16745788550574,21.084101113842348,63.055783082762474,48.52285158759295,66.48535046568084,37.35717593450564,45.09587581488774,71.94114366433769,50.99007068040733,27.64876628476333,31.950493196408832,70.76258431083677,63.24166821966861,89.41935365211904,74.26361596231526,65.21147750847774,5.265172382729348,65.97596057453505,28.31676698600472,83.01700752423241,55.17809993191359,19.52967183578953,34.77527272987018,9.334911564176664,53.12810625182131,78.18316601137467,67.51107431014343,65.30819574129029,23.274554860140263,73.21439189462332,64.07196293201133,70.8179126643519,12.354960918151914,53.767613204451344,11.849006389451908,41.94139938034675,42.10610819972411,88.12228752975433,34.19358186002346,74.24580200601343,41.52221550378558,11.725454579266255,57.00933351417231,67.25556130813717,46.95549594490072,30.83849882250978,9.647875033204887,93.46325168932182,19.358892411279164,84.85291767071801,68.18728694917809,29.89962780018431,21.88288564720822,24.475182730892797,60.57230398883735,63.1985717669363,21.19221538650112,11.761787758278906,13.367085016067684,74.75653092498055,73.51412915784843,49.544138344583466,17.192374843600028,33.53398313595377,20.77964875794724,62.95864238433153,70.13445531956815,76.23868363193453,4.688762285874439,20.185905452874053,84.24183734282238,69.66146280316215,56.35229422770038,26.57968050939481,50.01866499829741,49.5538627556292,76.00235312867945,60.65359748678621,26.225355830396477,22.56538963479068,21.13334138276127,33.01025836712993,72.09476199538855,54.13057902593027,55.53721045906444,59.85566804615976,49.361535527917574,27.437001896253193,86.35591522834359,55.4413134951666,79.94426251962663,52.39145561627069,85.98947729705681,33.10439523569743,20.30228553527504,70.04683601339654,81.85731368048027,81.50352733994791,57.27698644814434,55.80336129735177,94.88393281173339,39.44919509965183,69.68892435369914,22.895103560036443,89.14591731361324,82.73178333563673,18.49500757415599,49.29057568083464,44.27931345125235,59.20127197178776,17.724793651782427,59.25826038971482,56.32838538531827,27.13049357375716,33.071692686849076,46.201221934688036,22.420385068689967,76.43932706185053,43.92421246990261,90.40685806461377,62.60206863869798,58.25558153403515,26.471402786953036,82.83387697277273,71.83700514327198,37.61632815085812,76.63645516589483,90.32871521676799,4.830048393158988,91.65035595869742,30.80757649705875,30.85103899298054,62.464679153595455,23.27338980132587,43.641486386494954,25.343235788231752,46.68197823978897,72.25374254762939,62.75062859966977,45.207583738873986,64.09777401751069,68.44883115818655,70.4401890952994,31.293873169565796,71.26446559656037,48.60437337467691,30.202607531467677,46.21214415396274,39.08882286141885,20.304586906276185,77.62792201587447,71.64907517630638,81.1436835006185,55.441709270667886,31.85180629330224,48.19509664241873,23.047284293948817,34.19156389708017,58.69898987883091,19.74006177720284,9.21164850024355,79.36669012444236,47.60902381075016,10.082137169825266,84.69037983373713,92.78530839897363,90.46856574077147,17.583266924123024,71.64370272511327,42.26037500785691,51.541812989327425,86.33850176672016,28.318484871588087,41.849146208768744,73.0516666580234,66.17411039933023,61.26443173505748,42.56764992416204,22.188197714202936,27.0420622914816,41.885745705913415,53.274450711858194,75.28043573795426,29.167274457943773,25.30402358249333,89.56861347229568,59.488450426793165,86.10532686983856,34.78333686821655,86.24984497705287,23.04333993452133,33.63943007535477,36.330517070487595,49.275102222212745,13.779043267040748,72.75692407124131,69.43142317487359,24.449695046594208,34.29168468637037,30.591069860993212,40.66264867912708,78.0183289188439,17.496086522484692,44.66184015045515,61.91495277403382,80.81074637852417,63.90053669929205,70.7255995500197,13.03168855562352,64.87622951461742,64.09884882018001,82.17878174024253,28.309010163740176,43.62323225657498,74.01926543452603,87.8300292363114,85.7521394717842,30.741529060717525,64.90325063117601,31.407808220572917,53.18208079461373,28.401789361018263,35.562376735189055,86.56828104272034,67.22901503191382,11.463809065379763,20.20473586280891,77.03945154536157,15.848910743717415,16.870368281261868,71.61788828492237,51.56526593000003,85.47474830195931,67.61875413132432,36.229574104551176,46.225001964670625,34.282470905774005,16.31558102349324,87.963914403984,12.923652982164931,36.37140440350505,14.883182686193503,16.599854976780076,22.96873586625788,64.98532612351254,33.08118971816616,16.958188325010312,48.89256981404354,11.072608012323965,53.2701243232695,54.438554518113634,29.043234043418103,61.99810003726516,97.0505095040289,19.67940454035592,86.76330823195126,56.71493293342982,70.11312457071956,19.862403206546027,83.98220192294687,36.54285511719765,75.54627928390664,17.888405329265403,76.30231435887006,73.60026129441316,61.18376817699316,14.281790622337883,22.006142317691058,61.523321019185936,46.71681518190491,64.05016572970571,53.121190686107404,52.071040467706794,19.581041660261835,80.32503457176988,82.97556281246143,55.76331386420215,13.066828045224517,75.97815647722271,60.683200784376965,79.30726206247076,89.19136753399722,80.9833846018723,55.79493485823627,67.16394649581595,16.704481369021252,18.886943999210487,47.52395110469478,85.3599229481527,47.310075583129034,3.9465097856274944,38.78748476692927,18.62318887107603,51.96100543805649,94.1010291438622,43.66027304197861,9.746517665769186,41.58197027852286,87.0768273805179,53.85010776692992,72.90867739223779,39.18505074577206,30.71751896421433,14.93533860735794,94.17623723147726,71.34168174298861,19.21068509511109,49.11629912050618,51.7361217903469,42.576445528097736,13.556044981262705,66.99272586105633,37.2927354683044,60.256873539963124,24.809414994581577,45.53503938091643,92.04306115731612,13.569882373971996,58.48626998971855,85.04486956352454,42.587982366475075,14.761601679647356,39.03327642885339,62.43859736305269,17.105206120463293,16.884794753355948,89.55582087495245,32.41334863306834,56.224303015297366,64.46538921777704,26.648590983456035,27.782660991347594,44.676868263908204,61.974519177205806,51.93662384523821,24.461132910382915,68.76258370030307,35.55244732600388,64.04468706336903,53.09768033831207,65.7843711559532,49.06125815713833,76.09461882343187,22.95291136888577,40.52996425857272,66.07268360476189,27.518864701727413,48.83897977472921,50.821598068885585,86.34545826405926,52.40623436207467,76.3680208636782,21.78710215111191,18.81942124731467,75.93113958484334,27.89201634582952,39.68307474070849,76.22278764717271,21.0636417464662,28.244284574538618,28.402003114372754,18.36724983531999,36.424672639430774,52.58949847456762,39.04433289146788,64.32506641925013,10.164145983093395,43.04636265238807,82.0891834102691,11.687034805816264,58.91496111336332,53.38586100677592,71.44139467004193,27.123315577322614,42.06186509132031,36.55224896892952,51.302897986763114,39.15380249763373,45.14830721924091,22.923791220017765,13.515857491447356,7.4945580615701335,26.418499584316933,21.371021015538677,54.53590800979475,81.91320860249915,23.76563961465061,35.73845658714259,82.31660995852832,23.101195272865564,83.18693617273316,42.03794091926098,68.29999561610552,7.521018683604752,63.24781829108223,12.642845767881322,88.94808754195934,39.77753474613624,46.823468486749995,44.27969546671615,46.121982020754515,56.84201575173972,48.624407963510976,71.19258182454023,40.258539132975315,38.0831735402722,72.4271066888824,46.709626405352594,49.20312812717468,19.89022227455767,41.19794071903299,92.11955685164168,53.89285981256688,50.614890661992476,19.8398431802029,46.14946792863334,40.48437630811812,49.74271219355279,16.834157959258583,25.898432816918934,36.24973305355095,36.03152927684742,32.4929835496388,35.153339891044865,40.14967394958765,63.63134212084654,25.769879611967358,27.122128426893234,27.11325384322531,26.83558082258564,34.16342429584585,8.972816444579482,23.76415416090139,63.91405398797917,21.68390406963239,33.85311707849215,62.35804459292712,55.3559247975087,68.8296811473924,48.43115648577843,23.660813871677618,50.971395443119164,16.80851732729693,14.58690526953189,84.22681286464487,40.460459050092346,48.378111658724336,15.131847198783138,20.41174639125384,64.97592159655497,42.410544773997216,37.99556223948264,64.93717402998178,58.31559484413397,20.876691109956585,93.842507343113,25.808589666087283,65.34522076956281,90.65012863846465,54.86313985288773,45.20708067236535,6.978696047095454,64.4617824416916,74.17338163352044,40.23516033809579,53.57862889162049,7.158690825462672,22.67937714882502,23.901082963774723,13.107601276629396,35.769731706572756,75.40780689670089,33.597269539120525,24.141849454587238,51.8237536430283,65.38570979085937,21.228563082982763,9.744171079700248,77.64398608037297,64.49710906778807,29.45333671301075,21.529580053592092,48.96927661119126,55.02770359412554,41.94312828142799,55.61510134358025,36.640271719988974,74.33005378421795,45.23022069195988,55.65896604732908,74.1122196234031,19.946485567295184,44.508992203859414,81.41230634311027,23.370578143464577,35.4770115263227,26.85266861257771,83.72954184244435,14.504097001866398,43.13916138010818,47.46533356599273,34.452103757204156,22.31817167812427,58.0959472952903,64.32635513342443,11.68114766533456,21.649281650416967,97.42371657038078,28.193880884170277,23.978843600241735,51.157633341499235,74.75639528424847,27.58368427192822,59.68486984131889,38.413794421510005,16.6380137321163,92.76482275934178,95.2534978910774,42.79547999976968,81.02256665357392,31.636122610772354,79.89369003812405,69.45410145372308,60.88330126371505,37.59425402297623,35.291232735720655,31.63150526677652,89.43995098756942,60.707403735698016,76.14670671319253,92.7848143529733,41.56902091946638,50.40039836725926,46.62216655721527,83.46810330421187,81.98698634215549,74.85552543294436,28.220712954599176,79.44087812485539,86.47062990978554,40.039592118329395,33.920743272425106,75.12893256797715,50.74695040248349,85.97652965030629,22.844075172547807,34.80584124998168,28.91766314106882,23.16304535456299,24.795856737726083,21.26682149675043,73.99099561401533,77.82557325367154,85.44598260591368,23.63581760252631,29.07524930899884,24.498612206105975,87.60131934391714,87.01333741009498,65.08623821382565,73.76683968771535,38.98837551907518,67.59325995490252,39.438884571893254,38.15476425891978,72.67434428949207,28.340056380507924,50.15283081503734,71.99014542482415,41.86479216219588,50.37505746946802,54.51663399065516,23.19254132078447,83.53466663968376,48.87867962492314,74.04602814704953,41.30463259880695,68.03458414241555,20.299587963553908,51.65011836669602,35.33764853502963,85.61720417024131,19.231591280329706,79.885841099088,60.04216593613364,20.464675629844592,14.294915572407687,90.18034898012061,87.0442470245409,59.333477016329375,54.130277375959025,56.37838610625532,43.84212878912176,40.44352273389943,87.70706616527815,62.706207566079286,73.49739566976764,91.41333404082377,43.509126465924325,70.90479491338729,99.17985226108347,67.57958189702006,42.42806919242179,22.18336667315883,56.7698438436264,60.115125283022934,61.53342256373985,70.61008416115871,34.95735926792242,50.895994072102255,21.695242446214493,63.6678694221247,58.73854386213457,82.63943145406097,71.05373055095524,53.73850194419654,14.027959552406246,80.74057682129522,35.83235356062712,26.457715131751442,60.61807980108062,32.339361721310595,81.50789957689152,32.969226162744285,59.16496611869567,74.3160548345536,35.82498547957839,41.3502026412398,54.884678605794164,79.91367427031038,50.94233529356028,32.30244857009119,43.74588652234827,85.8194424482994,30.36663248613104,92.62951150255691,36.63255644608414,87.73320733817518,82.12678633293173,78.33946304167202,66.70042990654309,45.201884379026275,58.556659817549885,57.01156045545885,35.67630269152828,46.582845323583086,39.82211477879035,31.298995226237487,34.116952833108584,77.92770737862391,82.79461530100654,28.994495044145843,77.4009487513664,32.57009479232924,35.30444771439133,40.81070685596586,12.835766561558248,79.6473100129617,38.688699861599595,47.980529531301755,84.21294271553809,65.96596349358663,59.46081051120978,16.887247927674395,84.17974107245372,85.0169073651309,58.287629003844145,64.42063875436628,74.4064139796842,56.42204204326263,93.86775411959519,83.81037693916223,71.21936072036068,90.87783003569906,83.03673941389484,43.7069282801575,78.10726298153936,35.937532140742604,53.39460995458657,24.81461331508659,17.094182429783743,74.36651703974223,93.9929431744095,27.711605433331172,70.63424370531959,22.54291057820549,20.487903322829993,24.876743070562586,46.139839270702964,78.71463968012185,85.70255271016912,29.53860012571425,84.91426234898795,82.74695596459514,82.49000151858189,53.25513190280778,22.997556585571225,73.72066673291911,93.1782679578497,53.58094840291982,54.95616654499014,25.267590747611276,60.33013148423271,53.37093122118617,21.018235790536487,18.45751568417276,72.08200801966444],"a":[16.96925618948616,7.092013089463958,5.271834686775874,3.7534634629002106,13.725575285360385,19.94768028670196,5.087916241004291,14.472620434086503,0.5519848633051083,5.280305951212703,3.606579584185079,0.7454001792027798,16.446885570274205,17.480177949432587,10.073056855654642,13.011309479622408,18.652972960639044,10.387184290989268,2.7690956950279233,0.3570835553790719,12.82583279766937,12.007960144112335,14.459795574521351,17.89434814376634,18.26970849122783,18.617161477533124,1.2904139408396142,7.281792320218807,11.222919249180926,16.1161755403551,8.61747653638879,9.060542376029396,9.013799098446299,4.990230221970804,3.6246920419859707,4.239712585357132,15.864833007130228,10.265905831265968,9.611811621387591,2.347942159191656,2.6051620898227146,7.043115490874188,0.09938960546852282,5.83144880780472,0.6530504677991411,19.910698683386634,1.9353595096182419,18.882341197323672,15.173566246321265,14.59612153770224,9.187731793235603,12.33234334292868,14.900400820594237,5.239999803989841,0.893853483100262,13.431877084541863,16.634599397674013,14.46974626691032,1.6904185171150798,4.762101232470819,11.623741165639231,7.578138733555564,5.875300617251549,5.502326831751976,10.2509482300955,11.667887014949674,17.375338919234196,19.83143396899233,8.200209937554979,19.949501359066826,12.329776592961007,0.20725461644148346,11.782530063296202,6.361281235851699,7.1073297684522485,0.3870207550798055,0.11893093716169201,7.0372030383791895,10.031453891694802,9.420437303395959,4.389344950913707,18.28687831141388,12.699760974621332,10.139413790326568,15.301079723099749,9.994070977244625,2.6646732813009155,9.640754607794184,18.07832149869197,18.466212725782075,12.857046224298262,19.337193667385723,14.89901624729455,18.560676398580487,3.5467329374145207,9.043492028623326,1.985110430972532,17.931529221286265,0.8254609696491855,16.38010424147485,3.1216245063337844,13.818907415621634,8.065297576741607,2.8702462213609037,5.149935109286505,10.206276156386815,3.57477580483045,15.38368382696158,5.525493260490411,4.136615434073541,9.018306248016316,5.6836894458207565,19.430185138463187,7.137220016339203,6.632273830882651,11.37568569512393,2.6325344476895784,14.929957099953427,3.110860799984869,4.92748446763188,6.973604051894808,2.807949716989513,2.2574837525850278,16.33350881847887,15.889157068061252,10.393532775095963,1.3656213650476356,15.674785095676897,4.854660820350096,10.890209412804248,4.174124983002949,19.842340075835363,7.057226779542822,11.825262893882162,14.677300253538178,18.10537557423055,13.540416607039258,5.928178031789746,7.416116455744994,17.728527220095415,13.989383954479475,19.808910553701075,12.096314064452391,2.386184507646103,2.0261967563399264,7.509090427439271,13.361323779078793,2.7512535066998733,0.538502467890285,6.475381750734068,19.678961484630854,0.02223142818548407,8.034974763458852,17.096334835119336,11.468000167872843,11.966143570259593,8.611484772152211,10.15760900341629,3.767275892076518,12.277534388300907,8.029501564939432,9.437153557612588,12.125065947606476,9.20987279082835,18.437681348027976,4.934471942411869,19.753229155470326,8.011709963728855,5.734012837684568,9.383255416076604,11.196239246334102,9.685089227140669,9.772672912818052,2.024497696640948,5.524627396352688,2.912470527579898,18.174426565916267,8.850906801046353,13.80639601305532,7.733547012682456,16.692138775544585,1.2772578900364895,7.244170173784252,10.26074531674313,17.378350147143088,15.356639299632256,3.04490244492881,13.806169692906458,8.013156077809738,14.716103906784364,15.205485313091494,19.31779836787253,7.56315739265748,17.427793383748977,5.0024790466739155,19.248340181821266,14.148752074381324,19.005405264183825,9.064294133052924,16.105991578109908,9.17267492836395,19.01407190994322,2.038656628498696,15.862988566072529,14.948156946501125,10.201382291023982,4.843836900145768,11.194325829511765,3.511935107494275,2.472157277704965,19.681011508976297,12.949193342603348,5.131821059051873,4.010634490849969,15.755055803209807,0.572176173908514,12.97494881510345,0.9253340360659523,14.239395434690994,6.244670800024106,2.765444266844672,11.401440114043847,9.978285318335987,13.734006827465315,14.022497034164125,7.990780788277632,10.368741911952464,3.201856637940632,18.470789408487676,4.8520174960253515,18.354599617392196,8.246146602037502,7.381372004208124,16.439938512592924,7.287951751807014,1.796948457727221,7.151597508432559,15.61249106547546,6.5618592880316795,9.118835526219705,8.935708784494452,11.588315015007918,5.907773454404817,18.658244104309137,18.42787870208847,11.174785005155975,4.632183890002799,14.613681453998645,17.947724580051897,11.917123846649886,14.896481765452956,11.57124815560245,12.693244502716627,5.55258220683601,7.507590059400022,16.522860956995306,7.93844826636199,11.369972374598971,19.46618085310291,4.462270902815382,11.89994768876987,4.543203619519147,10.733262884274613,4.667879134783157,13.060839717727557,14.343661773522234,10.4778543575636,12.858286204685228,12.308612425849272,4.7190336090902285,15.100807489440706,1.9064657194541201,15.202990618921808,10.972867598770751,17.29559643600855,0.33325907987548753,2.396958958705153,10.584654366589774,0.38802042213168075,1.7225900414688633,12.38689576388416,4.809184895343224,17.505255865129993,13.484685075687599,11.901896025486089,16.770431704894193,6.1723544860909785,3.6250064660411363,18.08566601829536,18.302390121798414,3.3728082757424804,2.2844170323804613,2.2704272659820557,15.41922964649364,2.7994200227938437,9.90497763676284,9.593735354178282,11.706122573627473,6.719996449530643,13.122773405143464,15.46126809011259,5.326383817743494,9.166850677440848,17.276707545149087,9.205338543719161,16.274396654840157,15.158960242476716,6.894582391388715,3.8145504225160343,0.04137296171649929,0.5643176607643419,1.0387897286444892,6.614558713470489,6.298758868020369,15.526835862510397,2.408648270975249,3.5370879701347313,15.371745869377165,4.696443426429089,2.1648552226215623,4.050591819367568,14.207813057523072,5.622909805798746,2.8762201095827367,0.8294994016864399,8.34932751596158,0.14054129318492592,4.636125924596399,19.101803864896205,1.037162564612104,10.686201575270795,13.436855632273845,19.090666914448853,2.0543601659097854,6.6396266813766,17.49542609855585,17.624454988402313,16.28225192768405,18.832398970100776,8.946296489698131,18.329797978025994,13.67307561621769,8.964346411274802,18.779433460903043,0.6483358536167616,15.98370203619079,18.171351772015853,3.9946818651414295,4.989418774312906,2.3672012185415436,3.236352850059112,6.189667870983371,5.242830904878555,3.4578029363188634,16.298774201371558,0.5475502547913935,2.0900016083022477,11.304246986398802,11.929151053295023,11.271810394714974,0.24834761389195492,1.6524321485199067,10.626428607120753,18.974794377738533,12.207201721739448,16.47837719205881,5.753451700518188,12.303845888873251,5.62162826638954,19.173023744035618,13.14658689399366,16.012916297770232,7.864977944129166,16.191941318193418,7.825819500356235,18.463219024672533,3.0100441408946432,10.408394443806689,3.679167779353767,13.785768677880688,6.306352864032911,9.588233266709878,5.455327968854413,12.067880087220155,2.396184560516459,6.673449714095883,12.443245544089464,4.68978211703007,19.884038215114586,12.44542525143899,12.744399739422413,19.623581017238575,19.731590639986536,18.091092312974105,14.576242334880778,0.7829431417841182,4.454261012195975,19.005404252324457,7.143805044300984,1.2872518226635732,9.191254676451784,15.975726938227538,1.9101902547744354,11.705268456437574,9.695826913895417,10.043250873345553,7.089358087111939,12.91275402024555,4.143856215333215,9.915195903385312,10.803046390675402,13.891472687175934,19.422096234498415,17.757146405540006,5.132386520602048,1.5595060212797662,19.827737180392443,5.508252475188451,1.8718088476891914,7.433202598988404,13.97221632263689,1.8331236012004748,17.196931523930523,18.062470916823745,14.018548793929293,16.015680615291608,14.043584670692164,12.703889603083924,17.989716901309215,19.118224287015035,1.4191211600404596,18.343115126987474,7.501032261097138,7.830084880928845,4.106187002032162,1.8917636876126487,3.4233946916028835,4.39425193950274,3.9101451987888014,9.707739280072287,18.06391612747944,6.1528727060146515,7.924944950865047,17.3657527009766,19.02143073222443,11.317143657473565,14.090719185800967,13.468738404767887,5.331505525255755,5.553139128410547,5.280063388132308,4.770434897827909,15.190303417035835,1.2245105567420378,5.0363068056811455,10.382794106968344,9.030506713967007,13.734244389877354,17.402876285953152,11.434464116634558,8.391178818998707,4.924800514451126,0.5159792704499155,12.00710145328452,10.234011669592768,7.593026161629841,5.431403484668245,19.674106926832934,17.732490022893987,0.77781307373606,0.566848225937564,13.339933794832701,7.1542064990456655,4.787369890745601,6.345132272162268,1.3968583868212248,13.534678636505948,15.667109207582985,13.965263695512867,0.9518527957519929,8.043689437124556,16.918339512468464,19.28288029407431,11.990738910375786,16.58240582012222,16.6829086508551,2.6962510692635755,11.301902821608167,10.93714800052837,11.8302479451736,4.821292493282461,5.873009026581211,11.2839867156959,1.9658453720196123,8.976280535540443,11.470342036149347,17.28005050119584,9.591550827646929,2.674411144335145,5.138937656509479,3.6313390969403203,6.113093449287161,19.200220966351843,12.888898298437157,18.5788098184414,8.60020007393894,14.26675331406583,10.736453926617692,16.14660963561404,19.68807005866617,11.632576757611197,17.613430383324364,3.9189214190227784,3.191644664924844,19.242011147759747,12.609643936288673,19.96719022296829,17.53244084373838,5.404730246977665,15.080539614496114,2.0326252501571895,9.684182844209914,4.54235467938275,18.562469952333736,2.298632181436653,18.834537271132245,4.662437798015411,17.691005448380427,15.751323802793888,14.726672452422122,0.5248406631931646,13.91472857419679,6.153631686122423,17.369735990903305,14.100720846368944,9.930806761775518,7.416404643760317,0.1333712366512918,18.77716718628028,10.50015474666058,10.246137209071634,7.6399235914278885,1.0684775098971055,15.086354508937214,17.119395042420543,3.410360950514506,18.854958232753866,6.436354342473796,8.165013092184372,1.418008332047589,0.8583361760321706,0.2469485708295327,5.526860882122722,1.863898929227914,18.60248499064896,8.70622465430985,5.011897604718487,6.922731947988363,3.2609520895736432,4.544177017756064,0.14149461599155977,6.556675196084347,15.729041370264504,7.509596074397149,0.6364365577621722,3.4067129915302496,2.1358702120213557,15.837469851969805,5.153624331471649,15.150743867564715,5.789546960183669,7.795829168887813,7.5149613467609955,17.56403505115578,11.7285204785593,16.633852129872185,1.0214110913898278,4.552445714180071,7.600127781874568,7.339224029845988,11.724339258589564,17.858119530858858,9.353437246584772,2.4319957771417933,17.948307060658983,13.826707569635857,18.496266858120297,19.582664087203575,14.073527503754026,9.140802789730117,17.07874733468874,19.908377090110797,10.954491145509223,18.344450680943737,17.446939258459576,19.13431822109991,7.6490624178328215,19.053105901132568,4.35864244715475,12.45305319371381,2.7325827682520654,18.33404616352686,16.563197154465925,5.428350404914024,5.3111182462504924,18.583099810417174,2.4004398710722796,6.513317640899614,4.482534597151515,19.30683475890831,6.921603627177748,8.286887186362858,8.908382422599118,10.887565256381247,7.759586983536533,2.369634310341895,12.543543207580484,11.502057739043842,1.7464011299974391,9.827468258871107,14.5286918522334,13.765086275994873,0.7145623259357237,19.83657360602784,9.459140644064323,2.106287794789754,2.8364602249691417,4.404352845642556,3.6815259784122656,2.427888563536489,2.3581469614367245,4.571063812132996,0.40986004059782477,14.75864854260756,1.9241534236164126,1.9979770707334632,16.000354374265548,10.761721033261011,8.111751956124635,17.592257853680103,0.005810973104138917,3.591853384800885,13.797920204783619,4.823620318292203,19.63845749020934,15.590848229492265,11.90309447509755,1.5186833726944915,5.616245025394666,0.5031704082057464,17.860623515143853,6.684139640114157,14.978254591221747,18.069540125092782,12.536582735761158,12.585975428104138,10.785400579688357,2.4214385405893157,4.901218999310628,6.700841836941831,13.490150431564732,16.434460396668374,6.688525658009179,14.77940267027925,2.2922325609961547,1.6228739926974178,10.27152606942645,19.12851376239984,5.123816791844877,1.3576707823640932,7.882050854107794,9.527814062474844,17.818422313513928,7.331902993837236,4.400112916322767,14.353590201036535,5.258667519876616,17.593394063299698,6.393643819398203,13.351083206892827,5.111476002000885,18.593677292932092,14.05070979039975,4.811529677088915,10.939606419745322,3.005331226358803,2.9011452014943595,13.743222613048536,11.351315405728503,16.394021438549302,13.037572182100208,14.607787696617173,17.584502876478474,4.740258038359695,13.766420633082337,4.289916193457972,12.552830445014136,11.293391383221838,18.642952750744982,16.347321889854143,7.24685259699386,8.864575155959873,6.123880627547238,6.662959125069512,14.545802864908657,1.9148024836599697,0.47136342701936673,7.114568223958417,19.715664271024895,11.104116796386334,6.543716235830583,13.275683720117627,13.827448078265391,13.87648847265849,8.806818487410425,0.5631849833941516,10.449205488674501,6.469813495127803,18.437394727970926,7.18861812582301,18.26221944145924,8.11310271166012,14.865661533101413,0.5907019891814969,7.912638151265008,6.521985921883298,12.240343752084272,12.745947511915755,10.442406856463977,9.289147245645445,15.861637410075126,17.824752555705587,2.65075616387076,19.671875480523543,14.403663917186403,3.2094761305952746,4.556289790788539,11.995293197241459,15.582117870926929,16.979063906873716,15.010384900150711,18.850170001922443,8.210577699698028,14.97279564654832,1.7115798614132105,9.509503184067402,19.054630244233465,14.753428846374558,15.056536417791072,6.3436230001069305,8.100906505933976,10.876712710113106,13.490470224877974,13.676838864090701,4.9861998421539155,0.5255602175073015,19.668076002808263,2.5109029199060773,1.6038526699979938,3.4103217715540257,15.502228192673208,17.586417599326765,6.365473812008786,12.252954190823054,17.24099448769391,2.4996119259240235,1.8617801263724987,16.901789315287292,6.7751274563174535,10.267395497393679,1.0012798699015057,5.892055667923266,16.01463572087939,14.553540148192265,19.444247810373795,10.172407994902217,1.4293986144848514,11.747300777144275,0.5884976783165818,6.502454502340664,6.668618620414906,19.946898333860823,6.086187889904062,6.246516730281777,11.300768835517827,7.358165281846061,5.437586388739817,1.357562972772799,18.209807541568157,7.364038178438306,11.72397493127319,11.187073653537851,17.396562935365427,9.29658783207592,8.702511541180154,6.992976096865715,15.493238314533077,1.6448830794053482,0.7161346437531924,14.21964341958005,18.957236415771412,9.04916113583968,12.72668955178828,2.918451539524143,8.95405791905457,18.978427072718663,10.675082100430622,9.073536931942815,8.157421276820358,13.065332979698908,17.956356538185176,3.965177728367917,19.36905656148934,19.30385239104462,16.93979963498552,11.849583223533271,10.917322415128305,11.887710296638577,4.939737235118775,6.804482709123678,12.243229551883129,8.608878999853466,11.598008710967713,15.857130495814937,14.505593220785936,3.939878734470059,19.35543587500028,10.077904720778225,3.176240683056246,8.38691440744502,18.785951993874267,2.388953806752796,17.113921744848717,3.15960717544983,15.683278469323012,3.115242700675842,16.748799624536073,15.998095454900053,3.5755862918286274,13.202970522734226,17.10024107958298,7.382708044737485,18.203302055055815,14.799493024310294,12.931329003310044,5.958009442179293,9.567503892003355,0.6745324901636929,0.9670696222339537,16.415079929967334,8.455314899474228,12.292435107834944,7.598058982202729,0.7673324297227024,1.341051370223969,9.183286291013335,7.0454410040696125,7.483515030648,6.257086313943354,16.060214203014848,6.920958496284877,14.263318331439283,7.051333419190597,15.641177653995255,4.097661914390214,14.182051437770728,19.636397953651322,6.6278761508463635,15.266618838720042,6.083963544140074,14.557713242008056,6.7953905115197655,6.8350569185334775,12.123462067544137,12.958319135646184,16.531499130751644,10.482890616692263,17.62218722458273,5.145064899419585,13.928999198078289,17.554776209273577,9.310662178809839,9.183400292862167,0.5690098119491172,16.67046985696085,18.42145988833781,12.402599281719864,19.97143406490497,0.45774556077553097,4.3533902898956,13.381981198602961,1.715075892073994,11.827094416711951,19.693487643796388,1.754158021875405,10.251230281635824,16.42485967523141,9.043354857044555,1.9399125391074712,3.242462154519745,2.281864357271166,4.280741393911387,2.495433741207167,7.565999015408078,8.945325503545556,17.58994755485501,10.641212562890496,14.367966078404383,18.571215266254768,8.756560850057555,11.113237270720887,7.79317136439122,9.820141195301515,6.052988796213703,19.213896249296422,17.373399147907506,4.2401937169427795,14.801721073324163,8.060930172098772,19.102929123459912,3.1396754147871153,14.520301868151533,9.491287912718471,14.561230940512143,8.597940145081395,8.659681657260677,7.1840314752090695,17.100670030782116,16.45907726438713,15.778213343261879,13.714069080416769,3.916651540432343,8.089685393550784,14.228634703860653,4.962487813722314,8.39871041205491,17.776119709604497,9.83726701675025,9.013664514710111,3.8173130888352524,18.11682829528264,18.950229122853713,11.21466981363569,13.039719064074129,13.673505751940747,17.7307748211617,15.251898864477557,18.94841323840061,14.16631954544254,4.234578396126238,0.3690218254331157,8.737719248718271,19.637955408836216,17.31639244772643,8.21471530088806,16.372703839748304,4.335048210426371,12.933497992476859,14.050975217146817,9.400325958470393,3.3103207655150424,3.0496151496421886,19.09863048515416,16.486031237636375,10.35290146557954,16.887364193421263,19.11703502967308,3.723414629670274,15.169335764394987,9.01896549953177,10.641424252193357,10.559114171034881,9.26961483301393,11.941831935671484,1.0090134961112973,14.15008045091843,16.774783621954548,11.349082201857419,10.120242754240877,13.436100823589051,18.919704027434115,15.874823163788033,9.654055792761689,10.251246576665007,5.217736290784827,19.870251381771954,4.518838822091196,19.130467457097716,8.017662033000965,7.015079273045806,10.118014565807435,19.14291642830762,2.055226859656858,4.081261924282966,6.252367702255239,3.9617829090700774,9.92853090976961,3.065677072829529,12.016339704415024,14.744580533753396]}
},{}],14:[function(require,module,exports){
module.exports={"expected":[1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5390856397813643,1.0,1.0,0.6948171194333033,1.0,0.0,0.34523407687361884,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.06415215707368933,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.37046002837125197,1.0,1.0,0.792192008414434,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,0.5973183705405594,1.0,1.0,0.44177015201066006,0.0,0.9827731563541542,1.0,0.5486812848793969,1.0,1.0,0.0,0.2081720294672713,1.0,1.0,1.0,0.0,0.6243701884173899,1.0,1.0,0.6535654349763246,1.0,1.0,1.0,0.0,0.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.532482787041446,1.0,0.0,1.0,0.7886071535333844,0.0,0.8497920171886875,1.0,1.0,1.0,1.0,0.9825080408113631,0.6409972706220496,1.0,0.0,0.14527766623501243,0.7146542728113991,1.0,0.7703031021164978,0.20773698188069553,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.08937092291024226,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.7388338750922941,1.0,1.0,0.009282793495164008,1.0,0.19990010881646253,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.9262838363902951,1.0,0.0,1.0,1.0,1.0,0.7658554362455856,0.1490815039094901,1.0,1.0,1.0,0.8448783379271156,1.0,0.47328114300188845,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.04166187214874484,1.0,0.0,0.0,1.0,1.0,1.0,1.0,0.7496770080056757,1.0,1.0,1.0,0.4798152261731013,0.0,1.0,1.0,1.0,1.0,1.0,0.047918810930198015,0.7538134411856791,1.0,1.0,1.0,1.0,0.10488525182290677,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.9871928264572057,1.0,0.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,0.06729921723246421,1.0,1.0,1.0,1.0,0.7337623648549391,1.0,0.6361848365437771,0.971761967634256,0.5157819587305331,1.0,0.7355985293720722,0.0,1.0,0.7347715952223888,1.0,1.0,1.0,0.1897158596387577,1.0,1.0,0.7918132325486038,0.5008883805679971,0.6804055649020955,1.0,0.30815113189071813,0.0,1.0,0.09612532454454134,1.0,0.0,1.0,0.06461999463352205,1.0,1.0,1.0,0.6836346773323613,1.0,0.0,1.0,0.07555225578121247,1.0,1.0,0.0,1.0,0.15330612981519226,1.0,0.8459601564724455,0.4130403146529783,0.24794561021913528,0.7206609912017852,1.0,1.0,1.0,1.0,0.052622983189726656,1.0,1.0,0.0,1.0,1.0,0.593950847665036,1.0,1.0,1.0,1.0,0.0,1.0,0.17702173533759372,1.0,0.48015793113618416,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.07305706640080184,1.0,1.0,0.0,1.0,0.8037431886689579,0.9161780639393224,0.0,0.42463595386903774,0.39953099859731966,1.0,1.0,1.0,1.0,0.04118455408579317,1.0,1.0,1.0,1.0,1.0,0.5029972874103441,0.4769004960968622,1.0,1.0,1.0,1.0,0.7217864327922512,0.5313962438945233,1.0,1.0,1.0,0.0,1.0,1.0,0.004887598341882339,1.0,1.0,1.0,1.0,1.0,0.1345893716378365,1.0,1.0,0.20921875336860984,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.4631735943799861,0.0,1.0,0.23513226927307018,1.0,1.0,1.0,0.21778857697211637,1.0,1.0,1.0,1.0,1.0,0.04796880534368346,0.19178639856235413,1.0,1.0,0.0,1.0,1.0,1.0,0.4954568655739629,1.0,1.0,1.0,1.0,0.15392966994899362,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.1420408586071225,0.0,1.0,1.0,0.3847656671122522,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.9646027717018326,1.0,0.0,1.0,0.0,0.07219249445929277,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6886457622956577,1.0,0.0,0.0,0.1790349580181186,1.0,1.0,0.44838615358947825,1.0,0.47054054374842413,1.0,1.0,0.3975264894287804,0.29029139479834976,1.0,0.0,1.0,1.0,0.9882267267460152,1.0,1.0,0.8778561946710276,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.7882427529945963,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.09505887054618263,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.34339232871597014,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.057047675665998436,0.7733787949394044,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.9022298108044992,0.2719390245871011,0.0,1.0,0.23869560906893475,0.0,1.0,0.11714319581901472,0.17867528717915793,0.7153863075738306,1.0,1.0,1.0,0.7901216012267734,0.8632234649206122,0.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,0.2967640655723596,1.0,0.6400243415181823,1.0,1.0,0.31932437408112885,0.0,1.0,1.0,1.0,0.0,0.19991333925395832,1.0,1.0,1.0,0.909723162438432,0.6494822063903656,0.0,1.0,1.0,0.528663893752712,0.0,0.29491674619347497,1.0,1.0,0.0,0.7902542779321705,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5478756271415776,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,0.9856180181984934,1.0,1.0,1.0,0.6102339701131907,1.0,1.0,1.0,0.9634234678235629,0.27948694887316367,1.0,0.9556698493034966,1.0,1.0,1.0,0.7316460938267675,1.0,0.4915564823953892,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.4350789105530809,1.0,1.0,1.0,1.0,1.0,0.710362591044068,0.16317263190732395,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6782581094829041,1.0,0.7822469575241687,1.0,0.12450740298297201,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5750275988416783,1.0,1.0,0.9066461552000946,0.6532848143130586,1.0,1.0,0.04975167476698962,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,0.05634163890382004,1.0,1.0,1.0,1.0,0.0,0.8246432813943223,1.0,0.34192867708814856,1.0,0.88242912143104,1.0,1.0,0.2534879231572668,1.0,1.0,1.0,1.0,1.0,0.41678718655280833,1.0,1.0,1.0,1.0,1.0,0.0,0.5088418056048485,0.5001994128759093,1.0,1.0,1.0,1.0,0.7529899644651287,1.0,1.0,1.0,1.0,0.660896714228537,0.11653667008248916,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.25102249045981306,1.0,0.0,1.0,0.8674098367815098,1.0,1.0,1.0,0.1647986126742504,0.0,1.0,0.6529807949820778,0.7241985362619813,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.37895181271572326,0.7652366296961594,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.11635322914477514,1.0,1.0,0.5074036696390505,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,0.0,0.0,1.0,1.0,1.0,1.0,0.9868118252275171,1.0,0.6514281056605462,1.0,1.0,0.757976653870805,1.0,1.0,0.7333982933989123,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5378942785012104,0.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.16169392449440698,1.0,1.0,0.34293149014731783,1.0,1.0,1.0,0.4028483994915228,1.0,1.0,0.6944306928163925,0.9063080531782137,1.0,1.0,0.10060044045482167,1.0,1.0,0.29268534299030236,0.8861464243787496,1.0,1.0,1.0,0.07442485900588376,1.0,0.5641391618799212,0.0,1.0,0.0,1.0,0.10495199413494476,1.0,1.0,1.0,0.7365642947515358,1.0,1.0,0.0,0.3721529013990426,0.6718801597871271,1.0,1.0,1.0,1.0,0.0,0.9304302758175781,1.0,0.8285209445367423,1.0,1.0,1.0,0.0,0.0,0.036021464972013306,1.0,1.0,1.0,0.5419523059326273,1.0,1.0,0.0,0.19317589485196818,1.0,1.0,0.654520537403839,0.009414177221608989,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.9471528974025633,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.27358604712900414,1.0,1.0,1.0,1.0,0.164932160125915,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.8284293847048627,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.17975559216640488,0.6807608086236534,1.0,1.0,0.8860812230062027,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.20066223266652491,1.0,1.0,1.0,1.0,0.26015510848181445,1.0,1.0,0.8534748007658542,1.0,1.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.10999925245934462,1.0,0.3595887406808891,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[52.64881423603569,68.85836849225572,4.8006911357816096,85.0167613388632,30.02107329853947,35.08042486945489,73.44602813568268,85.57574875400053,48.39583158286172,53.02367574009508,57.941650457848624,76.27188733219437,45.785078903300125,70.51243743336283,25.757560128736824,74.54597673214465,64.92054786824313,46.12031592929908,56.32560660991124,1.7126970100935557,23.96275593757411,40.488811299662174,83.40089624510831,41.141542905607785,80.57702747306436,82.67733867046738,78.19450003793689,72.72721482745862,69.70192614336332,49.97977673386729,69.27184271665578,8.834668049645234,92.67664157927985,66.99486115666848,26.790620986485013,73.97078355088911,56.18863590735137,4.2869890038691905,97.42216067942218,19.010474904269504,82.34386595129233,79.04728806228833,27.01461558517748,93.76040919468326,37.43619551589721,41.147344055994004,69.19402428297997,67.40964120263178,77.37789817965977,0.6483115817349727,48.08482420433653,32.242607156734906,63.39275052069304,1.0272136015416544,63.59271212761995,3.9209375657497825,54.12564720634763,20.0982972945728,75.54309219153572,35.0134473201031,58.48128645845214,60.43338547677002,17.871470747118767,1.6416991546804427,19.382554369737925,77.23835721318248,20.17211952750888,30.731005661197287,44.63255479210248,1.2947088452967437,23.675897697710056,69.8960117441518,60.55815641303095,81.36035467989512,0.18838223014470135,31.564755447689397,60.8925792865693,57.27718372714785,31.96259706654663,54.318352411947224,24.438845555764455,94.90329430826509,7.002448886631374,10.603913532580789,58.84979905466865,14.004154475084029,75.58449521138037,59.67551199486427,33.14079610417713,48.26031920985392,94.04957069162387,36.93950079350905,40.61990598166432,0.9304760169701831,53.45367636062435,50.33737669733538,2.5218802288403896,28.99558488369276,96.42166816847455,86.06319109545966,50.019563040921255,54.55348775834912,24.49134339168031,25.915863837642263,41.950158804403095,11.984147164328295,25.079477282689886,31.54185173309132,63.99513752759398,16.756986099261972,14.51691183682744,6.77570611463818,96.05691678625791,58.37301614393673,71.8020615712008,64.78889150276237,97.0256550635721,65.3282897517071,60.71720575512538,52.82951068096422,88.30076625504111,3.6168819623528803,29.59688219499128,61.69334382118561,82.7348715121195,95.73593793811384,52.87595459600094,59.814954399638175,76.62926395398979,2.070142209523884,53.72366914954845,51.24320605418904,52.00875913208578,38.15050276822289,35.76411331670868,96.28147185789382,19.18189583213772,89.59360261858708,25.043720463143536,48.93172978507867,86.1039332220756,81.47539923252076,66.74808907807406,61.06168651338402,99.23227949286945,84.67795384300814,55.54049231137006,89.25630988040771,71.01660699725466,29.58162057792899,79.64657357086638,4.150247784268379,19.142947959549915,68.73877579617907,13.36546421295781,74.47221636120476,67.50165712730684,77.00711420007522,14.775301584941447,9.559779659623292,79.07075798565417,77.19625127991769,75.03265414027254,11.682458445241007,68.69751410545506,29.96186142545514,58.20041735154189,55.23641210278858,88.69374122449811,44.90890898898545,45.37657398165975,66.78795660395134,24.159839363683865,6.051067262635512,41.272122926300355,8.255988720662888,2.459424496157392,91.94049093164367,63.112980634099,71.00317571891723,97.28533165318763,13.292069551935626,88.2834112486978,93.30802049823512,53.506468307792574,11.15920556759007,6.35846518916654,92.63414491695595,37.17977415037286,64.80979226453165,95.77024503625653,41.31232801243032,10.265699603413703,29.735461423340116,21.03867040019589,24.18409623015596,29.46856982627284,97.6076681049783,10.322655714279527,97.0678946115465,77.79711452965128,51.58731882845,15.836586617229354,37.86689664704508,98.85382483399869,97.65473859586726,42.95819351144965,97.28129332475692,18.990946423964306,0.4354534335466509,32.18626440071617,99.7546795510051,8.802174015691456,58.131889434011974,32.668245411530414,54.938112042382905,10.329178875985345,53.77552156499692,95.1709933677006,61.39595195037537,99.08061784847236,33.75118121913945,77.8132684031722,19.564731233791388,24.77414915005283,19.97590772865754,96.907389451707,26.559075455950175,3.1697177381618147,85.92726232230174,28.50158666090332,72.02303817109741,21.785193128002867,78.49286406479496,19.846925088665568,85.23129776162202,25.97185295729336,42.98160515404324,25.47794682822644,19.939051105436523,87.58301277148375,15.999123500816403,0.9543692356654754,12.625857818629726,10.002471259743206,54.320709083851895,3.426217516846064,46.17841696914746,8.668141969203758,24.64787559287449,73.40866923816918,36.595050709605005,23.225460726259193,32.35441880824137,1.0901320402358916,22.33925723780319,13.604294876763667,79.77159989154829,50.494804926668294,1.6287039177098617,50.114899093301425,24.28723693592003,58.90064724042756,47.59161290552267,9.100002451884892,22.168105945181125,25.422823734604894,61.21570851632527,51.377887018402355,67.54819013607028,69.63918971288115,18.218411283326084,77.54590201329398,62.43781323647346,1.8859217031836017,89.56712770194883,47.88518657286795,34.61095169569779,99.55286398728562,40.1901460521827,93.50681100053326,83.08629019198901,7.0841583706261035,95.46682552584704,22.043403431735054,74.56633693855738,17.746979321075518,84.13485484841149,87.84252202484568,51.32343974457925,67.62919032595254,84.6619416643418,50.36491635230049,89.5198254664004,47.04715399804955,82.88192318416714,32.95368304021524,37.050376235181815,1.2177082844812226,52.124599316861755,85.09594058367828,3.989672826619972,48.62632252140742,32.089016107308275,16.55100855831224,2.4295165280323605,20.21361163735569,16.8366085438316,53.694934509074635,89.93834307300095,48.78001773051657,36.172298273193434,18.109264639911117,90.6850082359339,99.07445691917562,92.18212990230106,98.94682033056954,31.727184074437375,32.6440800062068,15.24979533018842,72.06823856946276,45.00808154517395,75.30983632893691,88.94612819078056,32.9052352690606,24.828965378373937,94.24955175020042,85.58567864013433,94.22564679077763,3.0499872844540477,21.14878665173199,34.39985632892895,6.225570853220641,96.21887617331222,65.9716292787433,53.503808649097586,84.90960641099572,67.52651696420429,11.335068144644932,87.56913393097778,20.62746438950065,18.369227166166645,23.621694643048574,79.5783644582078,51.35721243000504,94.87629579700476,80.51701617823441,60.97422593137325,70.06868891762032,68.03661308110121,25.451161220783057,8.65504574280278,64.9686753768074,14.619048649765709,92.7598400583636,83.86391249010063,41.71304000713969,16.988589590067527,82.87871106648123,29.228178347269072,72.71169152335636,75.4319635542036,88.53090776418968,11.802980081157944,3.057218893320801,90.86524402325007,88.97906348567797,14.875796900359607,58.60893713955224,57.52517183355748,78.53632944342925,15.014775889700482,46.97700445653141,45.61037365097533,79.43545796156171,50.22146562984333,16.352324498950345,6.718133636325385,38.379646901382316,75.64979788487153,54.653041895822675,90.41169895312376,86.16124093214064,36.865378174203165,10.841163826768764,0.23983987125062445,66.75985076780562,34.95523038738892,21.426321625077893,39.79551289770935,42.21301364884948,66.1318989467378,83.6213827259231,30.67912546590361,26.597121855996985,89.19730313068189,98.26460496497924,45.812432496098786,79.65113924642469,34.56931787109836,1.2228875824850771,97.84237511134492,91.04648991708939,87.4849937412939,40.936830669923175,72.86110337669814,41.18048068343989,37.74210940750289,83.86321155899887,11.410569668697047,27.370251056398054,4.670937362583283,12.729293575622137,48.15408203363483,40.85426111011261,86.44892409269227,66.97727840387984,11.761659579303462,81.97265886456286,73.9975502137101,46.780137881571136,78.85829553211352,59.260230075847375,47.50177988945554,89.24649634355062,57.27795562122462,69.01548082742033,26.250178234165755,92.18026193971507,33.79938950651149,82.90700399447016,4.322243258162195,4.324030673702328,3.8340261663906583,76.73999585577764,57.77996966886856,23.173410442026633,62.57089622960932,18.515034240252916,77.91809548970248,53.861654139105575,17.035940701050436,25.087476505679305,56.18554001326741,5.766045544522713,63.9749847623851,60.416665668092165,36.713412430710804,45.449536915997754,37.2101475857872,41.93674171236814,88.3411665620564,38.2576394777147,65.23551028076346,99.9528559897733,62.48554217007023,46.44193424832803,97.7453834494435,43.52337632857293,44.755555454758664,11.097721238275483,12.545076827494373,33.54238961476375,96.3518583000055,76.96276729493721,55.99078605142622,97.88843889064793,24.09033403663614,93.32836712378285,97.60165644591248,20.7511582868271,60.189897747757605,76.80832108436735,95.08237201901808,1.9051649216290878,60.9638616661929,78.63346864140499,75.32212555299603,47.00417360706224,52.73071353509593,18.560863724782006,97.02592455651823,59.96683906466562,28.692167606790942,78.21263610525573,30.761224176684408,61.100067238584074,92.4599484326611,5.015453389355873,76.92415393816552,41.186203239267826,93.53640340672928,74.30000322791115,2.6193408625254433,35.951055949719816,43.00925648705969,41.40015791570861,65.33534573325899,99.59830563666033,86.16929285729505,83.76908086953748,3.6278221772192643,40.28995739730941,10.26927353861704,7.942850046868255,74.45343390692585,5.855687304732449,3.613587121610662,82.83020897040558,20.204146710912816,22.80073460418177,15.367228147631828,72.8579023958447,73.26311568619528,52.372731076309506,45.405825966797494,33.65052086795204,17.155326947698967,0.4672663277871525,30.237363207405508,53.867266020669355,94.12869432923618,86.62227336676447,85.32559315840851,88.9799855789715,81.42569274200761,51.62816417549969,11.698821208536003,66.07322612139228,54.65547361289052,1.2606293545155856,53.45202161001532,50.64320098340423,97.13795399637976,8.3783344851722,68.99951580710155,85.55817460725589,12.279677088851027,85.79800253547364,26.9641328698218,45.24322467733954,96.79963434272649,13.746121126855403,2.4023800767694725,90.56678832596525,91.4524905416745,82.8994033029848,2.0036281312274085,17.80840163982351,58.43138440254276,35.464638899517475,81.4834276195214,26.31997989840018,24.726713209001527,16.184057102123163,59.21554940385767,85.53929705133585,32.309733462097356,0.5224676942336304,12.496265907068715,10.55128384652615,42.48862175242274,6.087906466648185,23.841087591173405,46.97676805570572,93.21734843766095,86.45399529332795,93.6693862450793,78.2031799008942,76.15376281310337,67.12982236785909,67.08789642398729,48.46191363329926,25.802386683696522,61.43097032320626,25.114116616386028,36.35117015291869,63.80119753931801,97.72773154513266,51.32239202772173,48.059275779581355,98.66766635893185,4.413548851767213,32.67469427755279,1.0294190840718587,61.89406936735815,2.323511088115482,6.665394632456589,76.17028649881819,37.81961577864721,59.20106335712536,9.5509901601859,76.87362233872277,7.169763799557427,43.606965699238074,47.3726437088444,68.39957222611743,57.56809637542209,81.55434644397657,21.484497929214562,28.249786179222824,62.1684104824159,91.7795634104153,36.19960095484487,11.102537845802306,82.44791608093449,36.0133786752689,98.26211833138355,52.93854036210721,23.307055602509518,33.43297199047086,43.16565858404508,6.965362118870311,21.007503140910178,82.94274667428327,97.03907445773706,58.01804824868053,33.20267509337316,81.82496246506594,45.85670096738619,48.6065719897544,6.1422083460671795,76.01893270806556,81.97120207311525,58.128377155401466,85.41559002466737,29.154012448556376,29.33719435319635,15.20818374841344,4.1793756552962025,99.82536506469411,52.5255271702235,43.240066833879844,58.45412834273309,72.75923184903881,75.1258748496942,83.42086843407034,39.42172794123564,88.48476749498575,24.753564240390325,43.68512899156271,15.155240164471095,42.30588928052184,78.33496301418548,34.22596086482572,54.72625894955225,68.76663824958844,98.02094100574332,63.718465351304744,19.846740896103032,95.87077653531495,71.01756752932194,24.24757006759155,26.526692399935104,87.35863635466355,56.57146462177967,3.316290723471038,55.51887062908249,93.01416784367863,49.28138449257371,61.041665293444595,91.0694185108309,80.7147663872723,50.6393740755527,42.12033576493348,68.62999698609235,60.802786822799426,75.18500605389673,75.25122494722747,7.287708597874665,19.275828058143894,97.42163538451472,38.69670099564784,86.0176794725714,5.6835172862539585,53.52445295286885,1.7243242988737917,76.76295772662837,81.82600831077774,45.64947040163388,91.63731280848961,3.4500428246678316,44.44478246351247,39.265015030859395,29.26986288889959,37.778444698298856,38.55194192476694,91.4252340398259,13.747187070171174,15.497200832077883,65.99145494252485,82.54293212515218,50.299799735119464,91.84597222284434,28.73364201326021,30.2068159089772,55.309274912437864,84.56854651319156,93.12940381620469,53.6138977618581,50.996706770363474,2.6277843653172095,29.45368965503836,20.75004801358491,45.757726486106435,80.43777707325354,62.906411793170356,58.63940569735877,23.349538137000756,58.29096137075411,47.66056203746207,85.00333366937573,89.6239738545241,32.1910787498034,23.239407614517194,33.82659866785234,94.3686791204972,95.60048582687612,69.46422358971338,96.24518155430968,79.82532338104245,89.08394872984175,14.071302078367754,60.28908188974069,5.793300072986285,73.89028905591945,42.73649310358083,90.52576046900671,44.79510354848375,62.319485687632195,13.266544606189656,7.845644127528151,68.06642803947325,39.09126181589355,25.69127491429539,42.3533360944693,89.82967873438332,83.639009743153,69.84014896178073,47.91404094136702,33.72107972298084,75.40487395757114,17.968939444835307,88.65034310393669,96.22204314920305,93.16800424113494,99.50243666423977,63.676475738549954,18.86436035303425,35.10397253255002,89.49391305051486,99.63968563170404,12.938132010281977,60.36451395802438,51.47757463645946,98.00786924081012,67.99911244416121,71.29280763463682,23.03562158855039,41.911686706831894,40.7377625086766,14.65505907155431,45.19544543188878,28.227715724724824,71.42604833542738,88.02833413084552,61.03373808071571,49.671334099944396,39.137321412214,3.61257925583911,6.604575277185654,9.539790975993888,0.41755675227592715,81.12805248366593,53.18157744998662,67.11483930663312,73.82145536058344,31.031531129722325,92.40708911314664,21.28582769779326,54.559524538131996,33.928149212727355,20.87626009882544,68.68612066068121,39.95575341610651,30.614360048020917,5.495681890957149,95.11414164235006,87.03343836584013,80.24001342506494,79.23976723592934,60.76602419160759,82.40016504832015,53.46277139161815,31.734192181656738,9.268590851927282,47.27688199711571,92.79782546245623,66.98892666343701,53.73562144200006,45.82282286658563,12.68955668449201,55.87557575908566,86.90031186647562,29.874321921164793,37.818444882630466,40.4345694905855,81.90918536340222,62.1864164594933,66.78834463860434,50.94077388731741,27.052368071185473,35.018033555590456,45.44101673348051,81.27472625917733,1.9854761308661706,30.086858161659723,79.00153095575052,73.94788683720155,34.449340464097375,82.82993239408631,77.36406216096702,6.449509363533856,86.83118089812076,58.07595716536349,14.142338362517304,78.09776006631022,46.95972254651109,84.78639029929258,22.55550077034474,98.96085621506955,89.33055153722722,28.24758568733332,44.753275412421935,58.66493743628916,63.536008846282144,14.928878080183082,61.80940775181374,60.7025030710554,26.14353759212593,54.11013208289779,71.50736523893622,16.05321230504324,67.22364525481419,6.91156995020652,75.78204038630506,30.30783939346491,16.52429325998397,35.45907151824687,7.321721200187681,69.43735891797493,12.286525391566805,93.94260256202485,41.67808996019979,77.30418110433091,37.56618980670823,41.67710591376659,97.39881646191716,8.815108157742912,16.051134456042917,32.87956242043122,97.20967073633086,88.87265099771523,80.05529312552655,98.31785217640909,3.8508633431726613,40.561130428882876,92.97492195141615,49.62896565034826,77.20119999038467,84.37219159713678,69.42453768094575,3.1619457907499315,14.96838366624047,11.908465983079486,31.800970069903855,36.584967522061774,37.76115709568826,25.042991350834654,52.019776266480086,95.47410471841127,0.9685536521866656,17.734649055074804,47.55621623661863,89.16089936980404,24.68676792871989,1.7093968053549347,83.4636897451112,59.76298388188708,56.52039142839704,52.62431710547399,74.51556979164613,37.021032926599105,77.03314086374817,96.67424194760773,94.2857532969963,27.026726989605,48.97428544076359,16.799572512706007,57.14032359789201,1.5213122297872195,99.30469791390877,18.533923799138698,44.04320122363712,80.49289108698412,73.55666342602278,53.720130636299636,44.80845111043883,95.66621260507009,82.07805951744864,57.32486816489879,46.222117499903504,58.384544641790434,80.71329654889516,8.703295925577216,51.752439298892725,17.68133816051234,71.3787795623661,95.83516616694598,23.26823871693129,98.81300860418038,12.331725212234467,86.01355821552907,38.40792384219305,28.87712586762361,94.51415457902546,78.21671265141543,32.86998330416837,41.74719209568043,96.08095517657654,19.03567204629537,51.19486997700782,31.582433984566215,56.461952934636514,56.21590941796934,93.5429562592019,89.86397273487552,99.36938196695505,85.3014743831303,78.58566380465255,26.977589372180045,42.898033299663,43.18225992984852,78.61203436962771,90.05993421328735,68.87048393626169,58.841436326521524,83.13806599174045,8.353774492990485,26.128254435042674,83.38659318050135,78.39256606511181,49.067173919492625,58.1307241086368,45.40960184610461,11.664137512434003,29.215638552723068,64.32468749794391,27.333021121633916,62.98757047076149,84.77991894173033,70.40471832548359,44.84033269306713,82.09963717009725,35.92385367860589,4.707082871530521,79.62190524300172,86.86797180671371,32.309490627123274,88.21071675343674,14.365895385801375,96.45911589106355,67.08883388919678,46.20532341064391,78.53380189462536,57.58751647752911,13.696941636411996,83.22389079838534,10.641659611419897,13.20376854268035,29.78695039280794,89.91365300761404,50.65137496244394,94.35958165023253,3.638598691096928,54.41623930399388,82.20777282543006,57.16622535126139,41.473895144185356,83.14911831338776,7.022097702651164,98.95645903500458,19.976942518938777,84.30234682511062,34.58336245486648,92.7297181313659,32.927961669348306,62.18129013335425,77.58217595290742,46.90273484747958],"b":[34.16277584001804,36.5769814369841,23.474210812011794,31.78553314629517,20.973619237782287,31.585506483390915,16.835529738529196,41.81278575797677,47.90039999373335,32.73388286619806,51.83030751748788,12.432068072493406,38.31623561737,48.28928295313616,40.351452556580824,27.62889335245045,32.63966449022907,58.04000920734704,44.69906667901061,46.99844788227702,44.81821230659529,5.436190465464019,9.915681703408858,29.824895950788978,43.0403690792214,21.550073483319053,34.835957504975426,13.169634853758678,9.892707977731607,36.689786267249104,24.347563097001075,42.726558620981166,35.5363600720361,1.5634286785721585,16.77078706948457,32.099356674585096,39.24850609033991,51.984196227339666,10.949601704475915,30.547774592345913,16.258618102980815,34.39970991540683,32.17070087446791,39.548856972864826,35.01706384402823,30.641023020908165,25.991691997491273,33.684501663884575,24.68469273124058,44.663207499648045,9.9855613345802,15.987474456348409,39.548068502429345,48.11137836226801,45.0018069087159,36.98321201267704,50.02613372157677,13.679913976276667,31.636819015230092,48.69477785725954,43.97161657864382,43.99781454328887,34.468454245178876,37.73686529660752,19.566167963272193,38.26362472777132,35.36962787138124,28.20778324334691,25.622173808763478,39.86256104359482,47.035050909519846,36.8362615649746,36.506664165004125,46.24103555693799,45.74721055318267,44.8019391866154,21.99310108258066,8.722925090034934,41.77694922600415,5.066437637351973,22.019466904318442,49.98129741572011,36.89011749816939,41.66393838693197,50.648271430669915,20.831578311162406,37.5828139683064,17.826926380895408,17.379225305264395,36.04661241156497,6.0975586876540655,53.784389832568884,20.919185667238533,37.72254845060744,29.762459523027893,58.61794729637479,25.921194338881087,33.629641067401444,29.75421355327724,19.13584488696636,19.667960053947038,21.7310721127356,24.867658736908073,36.68553056773455,21.248484274609773,40.70162770917516,55.65569427114808,36.889136614527445,25.149649369542708,19.479028829533416,35.50812864436506,34.256733820656834,8.162701514309475,47.957381079724655,39.02613138626009,28.777384167448954,30.2734295897497,30.927160799121882,54.5354415372688,29.954083684260674,46.253477755430275,36.540004558741195,10.993621938850776,27.14791507769725,6.0799364436589265,42.80410587692279,23.23943059263923,8.982934112594837,47.90514493699901,42.92002521486195,19.467822351333822,12.861411078694204,22.60223291469087,48.348879362993614,9.848087225546793,32.14743756391804,55.491791121186395,49.4975736011361,54.87103864929712,37.83756176956655,13.149201409287853,44.26864257859657,19.38713576105062,5.135840376887986,14.846731282529921,11.980735666989943,39.928210863514025,47.58200249176288,40.9943101824591,19.264730553502513,7.920818876508098,39.32213948315078,20.455824831256987,35.81473316601674,57.89239459737682,11.620046929570314,32.83238364708586,43.62244490522927,16.370578353210835,37.46184521946385,31.784206442086862,38.27547067129101,42.45622997276821,12.736272390198625,26.568341612962545,50.55709682461344,32.896713781220825,19.421099426054205,3.2534039778022095,28.526807949544462,31.323405289084384,37.729175601994505,15.66917862830759,26.879577465405227,7.405607439131683,30.098272687299563,12.289477660104193,34.97363210733442,41.362728838293044,22.304528079391993,22.596195498032383,14.8858364696294,13.265495395692328,38.49344011309098,25.2782100541164,19.983623931527568,18.634442276358367,7.814971181529158,28.894894054973257,38.82185276127133,41.74462311421382,24.626900988105845,42.03307152452183,37.237008720290966,17.527086444509038,8.112476826863082,5.545954284381032,25.293263503713163,16.013197453205734,14.610900668849096,23.52159080486873,37.33905482988933,15.556864423574313,32.469501277844124,28.425605202358952,4.04526292968816,43.4465316417553,34.42828445989089,48.537269868164486,39.33733692623751,15.783668271597042,43.616738252542945,25.483262004224887,34.03988836258884,11.000526902560974,43.58325733537548,42.1359095924217,15.12010536515977,23.462806746677344,27.46977686145391,4.315806163918934,40.68226002286353,16.51057432749515,22.95918012017242,25.413563650722082,38.62027315121106,38.48870711606449,30.967294174592865,41.17178235662874,41.59959692355213,38.12258793637015,28.84957884404764,19.144941773061205,26.233456304179164,47.525138566888366,39.493602675620984,25.005885745756892,49.66807122626341,38.18805746380362,26.22890084148658,26.80751319357436,25.09819472519604,13.25657145834937,9.6269691067807,27.138605999503298,5.219711712882629,25.795199847928203,28.30112126579176,36.1191664718458,15.362571970364387,47.72394205946113,35.21699141532022,33.41509580342569,8.143782752157085,43.24304182876565,13.741165709657164,32.14144823885625,47.16622394451733,21.671334765540323,34.8316617355698,12.358597727914638,57.67473162894977,12.396266095933841,53.06698846341213,18.565864382892016,44.0360267676275,31.606913982735083,30.8951152174781,9.573186880929772,21.29213958325096,25.373052795441232,52.434189989018556,33.14344406490001,35.90540711559444,27.970469219932422,5.741348650578968,19.443786343283872,46.158856444956456,38.83147164264369,36.186097011681014,25.057060780466326,40.66197207017558,33.541676003130874,5.9929519705718,50.739551067353744,42.4531247199869,26.260693200257656,16.83369977192683,46.97921341020165,30.419158515303792,13.880124974383689,17.002868899423508,11.383891331920331,35.15129787543429,27.242988502566348,38.28086801246728,12.265957169955222,19.906820094753872,11.828833987298655,30.353029443106806,21.411718423702943,26.155640836714827,27.147368552902982,37.46044836684915,17.822076710345964,22.404599840404494,40.91591184969266,24.55421317286043,44.38341564181823,28.188569034520164,24.337265657560305,34.586812992906026,47.0196988223573,37.078281621161416,20.246435911263774,19.369542457735545,40.974522045475055,18.422151159557384,49.33999446062495,30.989053232380225,21.894591410422972,20.168676067152923,37.49638809972046,26.57570112205768,39.50476855612523,34.37437691473373,15.21643855379899,7.167118585247136,12.615098140344973,43.88789624864749,17.340506349831877,21.87356186758638,32.99502395503657,11.517277276775136,16.692418804589884,45.31616727063792,31.350684828687893,36.93791645388178,43.25893550157048,38.776478049495715,12.809671030804504,31.66903595138205,20.977903332188333,38.15699858779112,18.147723392795335,31.59069926540902,44.458671251718386,25.93875452113803,24.006426706596862,37.33942737726728,46.0830516413524,18.33911886523534,23.696852773925855,42.68434567386878,13.604894905429429,17.258480701761346,21.719085495230445,36.154584403193525,46.48777952566968,17.749268043602346,17.204255718598542,9.040298482781012,26.031751336003346,20.16397255360416,10.267888255066868,27.43955953468584,29.926258932739493,28.340612547524785,37.68170748228924,45.097536859941975,20.05901402743894,18.097597317229948,24.338688048227105,29.796175609038357,32.26246682406246,45.5270365294481,45.29923679725148,38.7501713172176,36.82584038476294,36.31059413396153,47.183243194329144,20.662221107537704,23.786397878109078,30.976726716396048,17.4559396778019,30.123525305209924,15.975392704074686,22.607563465280993,31.630482827148686,4.846084278514455,15.735471120312399,17.47315941321196,39.35746419993714,5.9276429856528035,20.547977501665823,41.8285969988372,14.62159354867632,38.12910574206248,45.25212577893815,19.533694622435274,26.877269046652607,26.74810903383169,25.016580215824064,1.8467824678212308,38.44973744353947,19.911154462535343,18.720754530961017,38.51660068839976,27.94425100781485,30.038421876502813,10.91934823910953,23.583031048976054,30.467498021707783,5.609542239044334,30.582544684129246,55.27100128445054,15.954453447537938,40.47663530940864,44.05519903310391,31.055075678755877,29.09987084511893,36.709964970413665,31.721362551002237,28.770388602384642,44.23982156090557,33.30413096908985,44.53867717028975,22.719560034448364,21.30597967839256,45.403883773847205,11.731725945507513,24.056856095446307,38.78363281527926,20.3305136695396,47.39714342599249,17.62970629288767,34.65100373779035,45.933277585411076,30.95066835183645,17.06439722168775,14.950141349820237,33.778657139448605,49.7631980948918,22.31433760741301,46.765980531257334,40.730470414682344,10.42576810845563,36.95356250801341,13.285099410102669,19.710299026379698,45.61907555200173,53.032506995100135,30.535822579268547,48.415118637170934,55.604221695124934,24.29363143499362,34.18371402869076,37.75821106844404,42.219342882936736,21.595117104738737,2.373116512400868,53.92600892374362,39.437938957620275,1.2131500768997006,25.180044312421966,6.2363853045901685,37.953286233274824,17.898900874030602,43.02349946567639,55.462738339036115,16.439680387413404,34.943421918612486,31.90843220868987,41.49691939301535,5.935398051927869,55.08739619155229,53.19453687126099,11.405155423984393,33.43028297903596,18.325381273671336,33.338261771942044,18.826465620478487,49.45986495486133,23.437995360035703,15.785071506627219,53.577501452778364,42.96982693057558,12.939284839414182,57.76748737745672,19.71562351725817,40.36524540627663,18.26183716521328,18.90430310256701,39.47399023012805,42.56929213130848,39.97778455620923,24.34048685725465,22.412750648403048,47.97902859456791,27.508968406297786,20.497923212484643,33.835039299197454,43.44915225638746,32.94471585002833,33.77630864502248,28.89867408392787,20.835546481220653,25.879299880917888,20.981948177655408,48.429101570295856,42.934686719880816,18.598286537644704,15.21138237289549,51.19701415735271,42.43002251633912,52.516117238281495,36.99895866903714,42.2767269672166,17.912164428540073,17.198897307662875,38.90164448551238,34.67050519818878,27.745772440120426,13.615404546441074,14.546099235306409,34.314955982378464,50.55874747689407,41.88103138259737,52.25537285072876,13.974592594300024,20.29837974356008,21.22273357304782,16.184334110700348,38.480948938907616,43.292488501382195,14.550253482686077,51.24693907913984,38.251029702745754,6.08471328646087,37.927940606470834,32.762327211549774,25.394150416671472,35.36660281710377,26.462287228794008,43.81539779949532,40.13243102706061,39.8562273303162,22.055967875707964,47.066862001665584,24.110330516986966,29.135102485123255,14.934667493256013,27.532371288751726,33.52548724357306,44.62691978059463,45.87228089851415,23.83698146944741,47.84309706767918,30.1278473858012,26.158180196353374,8.461748497204438,34.54898806882863,27.436048306047667,30.147936991683437,38.48235230998759,23.002962318341574,26.709703935039606,11.793050501397664,29.273857881330656,46.87321256827934,28.589388157531687,9.289716790549733,24.800711247538246,35.63418699727365,40.86431773321095,22.673243904901646,13.618073908565593,44.09257345910491,34.32268938073231,28.677808849894298,30.808627309073962,30.443610946844828,49.4684865917323,22.47032848077156,21.29740231482295,17.679434671486106,33.360311444597926,48.571633793582436,16.28167684424281,30.104024985650955,17.461891874055347,46.69586922411206,41.001294407498165,31.501672810014178,43.280751057941345,47.85330242083389,20.577238972873864,28.646368807607864,27.019849223451047,32.27290968828559,26.619390558978157,29.839151794806185,21.95850038534748,37.34540221251474,15.239088692249391,20.89442479638597,37.57481533559023,33.99783083290394,20.925985986203436,20.968667314899907,42.85536024148062,12.166093316501817,10.3083143939768,6.169346270334328,11.579569196336177,58.59453949908229,13.957721800589905,29.497821907761605,19.992539739999188,5.624306293899735,24.611279471991214,10.104754707853129,14.36984040911144,45.66481328835092,16.252810279316783,21.84949894511862,14.305679113757138,34.07605298689095,37.86483395425533,22.9831466867785,28.558750380984375,50.62887723199704,39.962742832001055,15.2008287443718,16.670392970284922,23.883058395668712,16.667340713739343,50.07943248840711,33.9388140550723,27.0096428422042,28.132639970719154,31.94355552217962,34.74217351162984,27.05803414452852,16.789372206994763,51.364877697093874,38.01326384663276,39.91507543862964,37.57545896040851,28.030004757846687,45.01048060609292,20.056614804680393,26.442973635486357,40.14375877037739,32.22287296356203,21.68397595656878,21.31491171189606,9.11268986294183,40.5825715059632,25.523194570728784,13.17908147200479,15.048458595128862,32.07215374046802,45.390739910900635,39.01520316987471,23.971574149962883,23.47788552358277,43.23109430517762,28.960471432720585,27.252289972455884,17.39608036251271,56.4901935792858,24.620485450180773,26.34269817372701,45.162268260082215,4.495703914456963,15.09535186569249,25.514716717713725,21.019627555951494,24.280049943024366,37.28612117182262,37.28601765320603,50.324215126407644,13.653452409160188,55.1489026278597,16.501513609305583,42.55316524503536,51.06992998715657,10.560894535368863,30.787058461613686,10.427037860624768,33.25923014837011,34.79938879069864,47.24386180719506,16.059442571008084,50.4985521607181,40.28168539194417,44.682081331041225,19.685220723796487,37.33194109479592,50.384177801956355,21.436691511769638,43.04982978982826,34.62593264540556,44.408762283689434,20.971923249122877,23.31169330697191,30.660805886126052,29.04397835217638,38.167158425790795,20.408447593920066,33.85737943123199,30.408179849932605,45.1551620929153,52.28395919184493,32.924226853719006,3.3265741076982014,22.414539008643175,13.161593232510102,39.79939773380204,24.929703628231714,20.977505605077525,38.5778085921639,41.84509109023854,42.426444379855354,12.879656189962244,46.907025607651185,35.00685006413241,31.351565161965954,34.11297984528616,36.833449215333715,27.961894763651557,40.77163568834191,52.23478368258732,34.95473459740066,38.310069996485424,42.76943204796075,22.413611726145447,26.114145003093473,11.965501384191386,26.778631608785844,49.0075743034519,10.725023841167696,7.886312104218627,13.321418199458325,10.993725710687436,29.718007956823243,28.19412191689222,28.056459167815415,41.397369363855105,30.168493228839893,16.28495434538864,36.46063597587792,7.856061797014129,21.07017820325001,42.63957857719222,9.852681785325776,35.0085097632645,55.85956244289516,37.57037489884136,37.43630157024896,27.285197622429344,21.590788174087844,4.397015086540796,14.728221546244527,37.117768801155805,23.01238217150702,38.737849500927624,8.967274523461812,30.070083483884797,35.094095493653114,52.1143960911392,35.394208157272075,39.283519144095244,33.0731858429785,50.186599325714205,45.785252209917836,31.219813896929846,41.00526531781423,24.788261271059177,11.793233633157714,7.770545163540117,25.83325619484368,14.04895922510374,31.304123999712345,40.20424472232729,20.35225098771513,20.352498369932583,8.003802932373102,10.883720288088034,30.212498813090193,31.933129003796033,21.15566715094342,15.663934774926975,49.318115099197264,27.493010820154346,18.238943917993858,9.064427361833754,42.924044189296474,20.680741669470656,16.091895718468002,50.39536309159206,29.384758570511437,12.154091900626852,5.927277458437836,17.372812835097385,34.61192338733568,23.433815467137535,32.28623627502969,43.95548648004114,17.069758261030618,22.32022486311343,31.187543746705764,24.97111791546551,19.316721041263484,25.322897529901983,29.336796009122605,30.39142805046996,42.964929183727705,16.491828871249822,3.851943534643878,32.189263398908984,36.82545289591049,12.422471447177879,37.8277574906323,40.14772146595606,22.25011260761434,40.474409748496555,15.89050256151402,39.72443833170615,14.455383765646621,6.1477734893686975,39.955396283184236,47.359741846550946,33.37456543715827,9.941656426725434,37.1950146566293,44.4594777804235,39.07918290842295,50.13798930660264,58.50344868181439,34.2086452988806,6.941309658988715,28.35893512328872,36.74903891760064,20.666185749270838,42.6171775460967,33.419629397196985,26.484739606326684,44.482655175108235,23.455176023638835,47.983450529556634,18.230588427802708,15.183421875753368,30.36934935095285,44.52368429411063,8.466221527712264,7.791968165161118,55.32227003040236,29.726286332136812,45.61402174381497,16.056027472898595,37.03340229979641,34.296019894892325,47.889303142891784,26.173148393114374,42.67943904272186,30.77298803022674,56.40104736180916,35.77967505021621,39.29062938687568,12.036174647302373,32.84759436134553,32.39208923168651,48.415207321483756,16.666156893769116,20.66481098903223,36.75907471981992,31.113604624837713,30.604759832657976,24.794295964696204,46.9234129002417,47.401877036619666,21.758694787671125,23.027127362108967,37.67490948123484,38.17392965750087,47.4411735095014,13.337099991832119,1.3277717782463716,26.014721500326825,16.72916643324634,11.546242820410303,28.472049917309352,21.43273729956966,25.589573757091514,26.19416870633649,36.425853237519235,5.102457813573182,19.011945524948853,22.351897705017503,20.937827799366794,9.850938752156777,45.68955323130582,22.810670714974233,7.084136157523706,41.182180386424676,13.357134410022379,18.300934818932433,39.422552131682245,37.094278150554906,41.35708865181584,19.815952067577626,16.610115095487533,32.816557987349334,31.374744542698885,32.50206093558903,6.350957100045007,11.14460878374893,17.447041571341533,13.113214203723352,43.74482973806775,38.30107337238081,17.190324842505717,9.26728656941972,11.310983414517395,45.96302514939744,11.439136526475146,37.692896828615275,6.310090665567625,17.010918051307087,17.09041281763665,22.363063948651337,13.037758030848078,36.923207107777145,48.773598742875194,7.0159993672592735,36.04931115161559,39.60279162568713,39.11582163272985,31.433433713748155,17.86806342418847,24.19170396327722,31.961710509550286,14.834192223673067,21.379567176720435,41.68680660479427,25.333550917974506,17.00489747323243,33.44252266565473,35.00611436622627,16.267256836179342,53.60586034773643,36.83755144080596,24.703046952653985,10.340871037979284,14.423312911349676,18.94594743464382,17.18951318084377,32.58232211649869,29.284291455191248,10.650807442772114,18.343341912509736,31.604688570345658,11.880476300511557,19.46678942180406,36.041383701965614,22.457596038592335,6.161048406352316,10.416614841523938,37.56830811050784,38.31252600156452,33.2615162557606,51.40718310252761,37.76715624483762,18.91452062427699,50.399952408229,26.97449500906609,46.11106113956558,32.53051277651814,11.74820444078699,40.897814082144386,39.049562246265246,33.54756469416497,38.12713553943359,24.082866371828878,25.849990000279355,40.10059715065933,37.02594119640975,16.372227437941326,38.671191344334396,53.59596014883381,41.6112329534871,40.99705827619118,20.103272819445984,7.978734707930859,13.92415542530243,56.74693871281111,20.911449744812366,39.801475370716574],"a":[19.652996982295946,6.199933453153186,11.403035246978877,18.503978945606264,6.540459013484337,11.087446198370765,2.592695534389229,6.494604643110655,12.30826522440907,16.546495329024186,18.117937832400315,11.302596001375896,1.4029340725747508,9.586388587353936,8.688537083690466,15.963209884411459,14.137839021943567,18.98246687104633,8.046756984661755,8.546605190602111,12.966438058112114,2.9798788092882855,0.2739520355541947,9.113187237076827,8.1544109994035,5.6121508464471725,12.760460974301413,9.740529376816038,4.026682158122696,14.765893163277815,17.578037299124674,6.511386648837609,5.980134060631883,0.5328947253427163,3.588652467987661,6.55519637147747,6.106029617770128,16.81608399862814,6.496048349327035,12.221218363950968,8.731692168581402,17.325781705760562,7.358925109976258,16.434449368542886,19.220761230938756,4.678904961770902,18.416676936668843,19.70325398067875,16.060355178536952,7.4565902354027,4.225606546025218,8.185119064633056,13.003914003417316,10.777443208341468,5.764036727494202,6.350026993948106,11.989580283226875,1.6709917098806493,3.007986704924588,14.719226115497083,10.962076665364338,14.463512880459085,4.737003019774231,7.198677580048791,8.907593629572577,18.586554571674935,1.696066738842723,2.6955346497134736,1.750662973343653,13.88805395732788,17.53476286577451,4.160330743500902,12.407593739778445,8.315592532603993,10.134641998374047,9.561967994885778,12.646608311383973,8.58869990837392,13.447350651488916,3.319655145670062,6.472429414940639,15.1305370218647,7.515807830152221,14.822931005495583,14.67610057773124,16.526184173499647,14.212574303322448,2.459236300369221,0.8592720914625884,5.665271825881804,4.368806356066792,17.753868234312442,12.371356738223378,18.883608407183395,5.879316244994248,19.44646757297211,11.576667574343823,2.778709599066156,3.5835652148372565,13.35803439778038,0.5753737511038537,7.813343086480553,3.3540397552090306,6.686686969099367,12.301518360861422,15.971585802158934,19.8824193951164,18.149466200952947,12.636217334750523,7.628443317264066,9.012865925467564,12.074642829086702,4.813758574655229,15.391447435039023,12.329129632284106,0.5567961502237395,2.389823783821785,11.435762085749808,15.426500132908822,11.634747223521874,11.666891705908618,0.3857421650935233,4.6945364190388394,8.471461066398067,3.45123163283958,5.362202232286624,5.130214884062392,3.4070232224808406,13.646039727472248,17.529546049413693,6.7376510779969,6.331380520609424,7.950698132971974,9.299494231691643,1.3941733561549086,19.524077580002857,18.8416804229511,10.08520311732298,17.591545782435325,9.556084332399184,12.971999453637956,18.2989791576987,15.881041808727737,0.1275315654585274,1.1702269082241301,11.56818439704363,1.3141384558198954,8.530568321536908,6.949890162008026,16.59235251337008,3.8631551489688176,17.529851254420965,2.645933385221002,6.8172056683381355,19.33651500197374,5.970556110768945,17.94029795639223,19.091482856130465,9.55736542744496,4.671318643728575,1.2195545089792237,10.336989175548554,19.029957651144088,5.942805050592113,8.891584258855616,11.45609422042504,19.605034305737952,16.795213927442006,3.016658549488218,15.958441088875169,14.945255850534704,14.894848565371227,13.932401058289958,5.14558859712289,6.233204093684059,10.209117777521763,2.9122860723267863,2.61114691046592,3.0811351885667415,15.800750473154888,6.859497069814076,8.518994554724873,0.9428779600480031,0.6637763976444822,2.259329201321836,3.0196165096686745,14.666409374180844,1.3253413863500807,2.653338674490744,12.624433239947738,17.60179334854635,1.4228096996775585,8.666828933230493,6.766022273753589,4.278161308354522,7.7390029198948085,0.7656887069463858,8.222944355315116,9.655865334038856,8.516166414717254,13.612844379723562,7.544233761455179,4.635459436791791,6.3790485194225655,3.2876992869564114,0.9785301001031854,5.316484549482872,5.273066867203844,19.97365078218632,14.615128610840165,3.011208064399824,13.158052343066696,14.26877610182629,17.137208194564188,4.137886012501859,13.920192694361294,8.034157665015211,1.8602539918575944,2.797026281344115,7.9322306662667375,2.6316901693214056,14.648830151284141,14.194644932472716,13.629033311188525,2.769829399431294,0.11620301439029923,10.871310593652112,14.294850151594067,19.870125379998257,6.678983179273961,1.848187826269383,16.694816665722996,16.678588234168537,17.223732214504036,13.36648717592908,2.175352354517517,13.593804859272907,17.550438803822278,12.722590139998395,6.548177257788299,19.51928450693557,11.946375529125053,3.057032018260508,5.787502136327003,8.180076454325738,5.090683817379014,14.263052919737111,18.538021858748948,6.77170945421707,15.309470416346045,16.60586208044669,19.321617718557114,1.2066508599470405,6.862274999218476,14.430499374125375,4.23756528195657,12.0893106485833,19.081707735174934,18.183790629193062,2.340015101823587,0.8323167167477807,18.241949759698425,2.1122322667037707,17.521798124978503,2.4389272740670265,14.95844791216959,9.468615881314637,13.76309345979189,7.221626412921793,15.7500527946932,13.201999757464154,16.317862382831017,3.419741415729294,13.482695327573895,7.743889687353902,4.775830297426755,18.47317721256841,17.719184344046866,11.830765114491587,0.790759331281552,1.781980409181858,3.952629473520033,11.98792567137577,3.7590672745465437,15.870893087194172,16.065504546244828,9.88319243778571,14.02629582693601,11.438226582064015,7.421482608456325,8.67759684481005,4.750003600750978,3.1822193123634834,19.98738232794965,10.18762347807944,9.623108332959802,5.654499252277887,7.531948354838018,0.38139173579367913,15.75377200379419,8.340882476948153,16.43832905378559,10.319979203845385,10.091042825655233,2.658168409377888,18.006354035610084,4.934692043641746,11.701585291986142,13.44917646449793,14.749842994471338,8.827501286456805,19.347047588186747,16.867458048971763,12.771274051180285,7.893482972371366,14.534332963387033,19.576929748537594,0.8226979666469836,15.746788565584042,0.9005943736881328,14.420782810081372,18.006890628787215,8.488236841942115,11.740327154683214,15.783663387531499,14.004477160427783,7.983937650664195,2.1170682412176944,6.884351165306364,18.064313567322053,9.637793684299893,6.958535606394398,6.094089892501509,2.843488016470368,7.997984636568787,6.116524537734094,5.206144861190647,4.087542275518246,6.3702420759498635,5.136025405902447,8.840220453935714,14.85046717288534,0.12126381425609178,19.40959615428708,9.271063963325133,9.802764506328373,10.249839140436109,1.7878631087454266,9.081400263724086,14.089251052386928,7.649974943606321,11.703432843320535,7.011341866999543,5.991338639267085,4.376509451201929,7.651744885395471,4.520095630297218,11.652264123932166,17.7943632324464,6.676087161241564,9.039419585809538,1.7603541703827252,9.96123165917905,11.38170520839964,1.346151044854409,12.100412374630857,19.308497832902248,18.30564158440351,15.928850317406344,14.394168512667136,3.495263830138766,11.987472697188393,6.936909150008943,16.50184064843835,17.66486729060546,7.804986576056376,11.085872647540622,10.04825832387304,8.319539296338924,17.761711540999848,18.88174163576984,8.583128549871644,9.960184204081006,7.841965558519921,9.746043562825847,7.12013438675795,2.080352638628784,15.206146768421114,15.044670468181089,4.448920768711018,9.75322784946619,12.651074612075629,3.2438544940856007,4.636688274234264,3.8705402286365187,16.369225565266404,3.9439442904586475,2.3378515827912816,19.784191606711794,14.61181293748508,5.794233279119263,4.822702850388216,14.234236962210623,1.4139746909179118,3.4740622148462874,17.31826584029564,9.18691709738293,16.63660278650264,7.141808242872276,18.664068541472375,8.907587576415423,8.232098639083443,11.349087855637631,4.407188479546793,6.076605459568918,19.59822492067508,12.862384217998436,18.74512774158083,10.423910028631433,5.109430708994713,3.519046627189377,9.89547420382561,18.092565557425342,14.014801301569593,10.66543858799552,5.473995816492141,4.925995184849201,19.395618200006336,0.7409947673267236,8.132850134166398,9.971345875917542,5.827974937868632,4.832730582498375,0.23649424171478195,12.551141401460221,16.974334562880724,13.843706440140814,17.182201151884044,7.463253093217164,10.539558615556928,13.557266525904815,5.988694353327109,14.994390998067386,10.202891816507087,14.939643553531434,12.51239925167761,8.726980170463715,16.55566023208285,12.143481303552036,2.7105736241021683,15.471547155323012,15.458053132712134,12.990056681057425,10.076523676209558,18.954172210979024,15.204856862161007,13.98660379780162,5.130219577993738,4.587713390309238,12.055277160752151,0.107872300493419,16.505078058420057,11.596864207030592,1.0462087950458487,8.446067023578085,0.8658867837440454,15.872720649149738,15.235814558522364,12.406174946629399,19.731450224493464,0.4543036618392948,2.0102138144824444,8.372439898852729,19.932530516976485,1.4818120681288427,15.352855680991224,17.884658678998665,7.028589903207512,19.826416389369143,3.3364650852613353,18.948562225063977,1.061039648118891,14.185704631564139,2.7978059602651983,7.260775416920606,18.828779691006133,7.214219533227917,2.270798107176808,19.234874685650226,10.068208527480778,19.02739828442811,17.087066669564884,1.6737973514568738,0.38967131333371263,13.365334011771367,9.893652407455589,5.048968322865037,9.144052142294278,17.339845665701517,2.487659971093241,18.154437965215486,7.427085224976695,11.1366970481753,1.7997388808238446,14.707659838153777,16.215737468561446,1.158976432586054,13.251510396097403,17.87213420855562,16.459075711383253,18.420689026387667,7.245851725145185,2.3715390589313268,14.494821662697204,11.51395118105734,18.6379701157343,12.517874986506374,18.02695465474168,14.503508856294154,5.35869298160736,11.229065643575478,11.530651784164053,17.224717829694963,5.998082958519775,13.124891893347685,11.004551651674607,16.60629843347621,14.530238484114712,18.14387867431246,2.0102425652644573,8.838117160328034,17.329146097107184,1.7053239110437035,19.977807511357003,12.285197951107648,11.533096439342136,16.36931403199916,1.3198216366609916,4.159028279658781,7.470859750258398,4.819872481089469,1.6068093688489782,3.603335752763077,4.268280363565449,13.56641888592482,7.052833680971271,9.861476463507287,17.43244150804738,10.497747932747114,15.164439150888391,4.111550139673663,11.592916647277622,14.102665252309055,8.42326933913602,19.412803088184805,18.293601624925966,7.575378779516093,14.887073967186648,16.772451227526645,6.781866526260889,2.951056608010889,19.019037368347263,8.730702759118643,0.07891180093144712,4.807044044245261,12.251109246356272,4.88459359558183,5.131966871665545,19.41666444098263,19.3489336122964,19.114227780384287,1.4420143242334982,18.174283488091408,13.888399988671383,16.06374981792595,14.21086161110981,6.261147452527132,9.935281875837404,12.3210413323805,6.499525328426481,5.516213136951804,17.528605171811947,18.887160790731837,9.641025956119122,17.967190244020678,17.47997425929581,19.403641860079293,14.00335894070401,14.843329456020182,10.742900726141734,7.289673920880615,19.900605788904677,1.8537943362787024,11.55217825627509,15.778518211150754,14.432406843067419,0.10388668001481083,11.965623857453336,13.178754898864113,4.593710035601508,4.883361885893134,1.1687028476170802,0.9913725769131476,6.019270687995664,9.497970137938982,6.157236604662564,2.3519109288048456,0.87744943414239,7.049897448514497,12.32888977876783,7.74356185041396,9.658721632651975,3.733439979497346,0.06946108762913461,7.864312998418601,18.78130239915761,5.709582831254276,7.537588229546004,16.241111448725164,4.377298357552886,3.2502528603954106,3.0904186602018635,1.9497308262789437,8.056424231462742,12.808144223143128,11.51268078354651,9.802662644732404,17.71470432417172,10.790372637960598,5.016293556485425,3.836925087974752,14.09370630233298,14.823096932493929,14.817353388480985,9.564375851682577,13.539545046846499,4.651450889809805,16.9544187388992,11.831047969102947,16.64892146645451,7.0154903562161275,12.767704789792447,7.5882296070906685,18.41191082182287,7.1073555823930645,16.778576573715714,7.842610615509629,12.25286006039044,16.278909696030656,8.774015805531139,17.764742895440975,12.473789709260057,2.9259607840024815,0.8692564336452913,14.464686521104921,7.515604976858059,2.3739459553801723,1.8134389121496675,5.001986890563166,13.159616048561485,9.035153792440372,14.609421930658346,13.623629775677092,8.145344550663234,17.27778401647437,7.136679698488968,10.38894489942733,5.83817594834525,4.35007530279762,9.013695023844988,4.909617299131881,18.19300328139853,12.897282114455155,18.34561743442282,12.63303796669005,1.1028968338692158,0.9259997801702058,15.555905180990614,4.461699566937494,13.9684349037175,2.191287530938504,9.927547846648231,16.795801104723203,3.377937794520993,15.823317637391114,16.112501302040663,8.520729926271118,17.76249432313079,4.162715124627079,10.305330029031477,3.2374854793233254,11.789012950221469,4.848479651677167,8.215744449531353,13.5055344441054,15.705530155932777,9.467584365704065,6.692212819567973,7.599291953054679,13.32043299108786,11.568044176098585,16.65219182736941,15.368035431224122,6.863090845510791,8.730029023905793,0.5641851636307349,17.030185751834367,16.27119381036003,5.990501181319821,10.286105373594738,16.133000364254556,5.098704165765593,19.86412314257398,6.924676317413323,19.408172960808457,15.928952036005985,3.1764041165062906,18.382134198852963,9.911373525883448,16.863375376797848,17.152843366650092,10.253240022070216,5.857858791747055,13.847674726042744,12.858814704508541,7.438101413612617,15.452712536191262,18.08274629886069,5.620494080757363,13.894199914824794,8.616416812402168,8.967082497279675,3.631371842573361,14.359295304314541,1.3673142931177873,0.7998545181164252,17.574006106984807,13.232256094240565,1.692623279164116,10.246694418272648,3.6763933139810723,18.23852586193706,9.92666222580195,3.468698802543466,8.575833490895274,6.323857290165447,14.376823317856342,2.993929726230262,13.255516176617856,14.58996400432262,8.681280547190227,9.231663525760506,17.573802757387345,1.9341116215889675,9.45025329933939,15.38834171986403,1.114646106595103,9.50754706362661,18.71356481470648,3.9355878018455615,19.167009997291437,1.6452612842509629,19.26286019259819,2.268291679328489,5.451998556029665,0.5775087355815378,16.33566003369031,17.664307395350427,7.614900122407846,15.291901185646637,10.978496057670029,18.589255416078917,15.6455200940546,0.6267863291194598,12.25826218538231,17.483184738127477,19.547425858960338,16.94317816410858,14.687985160055783,14.740309528125186,4.087819207141221,4.637786648852034,5.351777133843765,0.8295692607186611,14.05389322290536,4.233414690636703,17.53227463871046,8.558730843951388,4.765772949113809,10.5643120683971,12.606029589906594,18.870320684972835,11.844042188257845,9.611401607437928,11.266383429420515,14.298314190401022,1.3426093181145182,4.3818886496770615,12.889369977398895,13.301282337455923,2.1832665228398573,12.799535967495569,7.114738299694658,6.6925056222913915,2.5485224383642135,14.994313901184348,11.750533220785272,8.127708116787819,5.232495344167591,4.352643242661123,9.595367553418392,19.06496295546408,6.591066795039202,17.86597787409329,14.493161129541775,5.640028126802483,0.4868890462847064,11.213300769207063,18.469858280389456,3.9613224528230173,3.5193978246105306,1.6343619929921127,0.5905448832773752,1.92913479211561,1.8681969871382842,0.569834664975013,8.718263695633626,3.5833114425060275,9.346904877181895,10.97304999624496,9.963251563539428,1.2365856924535557,1.6406496099653856,19.540206416394557,14.316606892626712,7.469346248193789,12.438346343709416,5.465866279488245,7.305355864013876,16.214683071273583,19.916021146542523,10.821585177621182,0.5582590399285703,0.31671069162871657,4.512359640165515,14.963232646865565,14.375736526243962,19.88268449430911,0.752615294454495,11.609872235647076,6.249142099472054,8.100757194589537,9.412263560611827,0.46663150589923763,1.2979997574596736,18.11308638051227,7.551028981963923,2.0437291601288843,17.566528400764035,7.945263680974652,6.803630652797512,8.554318342660379,10.453619112327637,12.896920043864387,18.514572647371565,7.878010136651357,12.230725342427853,7.967426022345148,16.908867438343627,17.01376251426092,11.02834055575093,9.606489294861639,6.04513392519324,19.70542998571095,10.544300437292202,15.766224473026632,2.772363498288719,8.541420065150941,17.860370621851654,10.138903577795585,10.443937358059014,9.972139496032305,10.631498223877482,6.927459329825387,10.329526884276618,0.08036925903617043,1.3628507851318261,13.799986503387114,10.040624009004983,0.10149187167667773,10.722143275101992,7.56383086423579,4.258861741746114,9.321613555450288,13.0594912461979,9.773030568041126,19.229718095118233,17.241180626707177,3.5604923128872423,15.43492210363755,17.79950841227035,16.192267047918772,7.73685448087762,14.53643552474384,13.317820305514534,0.8382433149194801,17.075397617923457,0.8128540827201425,13.111463676022783,11.362225404764175,5.996597545781137,17.2432732972373,3.083532764829684,0.4840145807597951,15.03750137422156,17.468932733844056,12.099475444904343,0.5686005773365688,9.341620265799468,7.527897827240668,7.976761010420703,6.127401517421771,5.362738754059446,7.705236014403303,2.5271079293924226,9.63188671925609,10.764600952915533,1.1079112428473303,16.838198953094413,1.9768209790987967,9.669052167101535,0.12970681606448764,8.54272852003707,6.905763512183287,6.133657574398548,18.815054118571716,2.821858916163751,11.706073782706996,1.727342405142993,3.600508282220143,5.46252760081543,13.332644299039465,8.075206330756384,7.166570639092975,14.334238976358641,16.6190683329308,17.050309478801637,17.12791333088468,6.457891120466148,10.53096159109554,12.298946057311815,11.852123483862576,13.764435184868562,2.7333349407641716,13.837585842567815,1.096881042111888,5.2720108726129356,9.479117017651868,11.655366460092203,14.398099570478431,19.772616756349098,9.38721172623402,0.5310039911591868,12.059007510625417,1.6603037616794447,1.0018711438766914,6.780372407894868,8.002609613154327,2.5595448141121846,0.0710463338552314,6.207122825989124,4.282114703792157,3.515263018353778,15.905714965492859,7.74826998510072,7.720847488598386,18.380968601189384,10.62419643320679,14.818175952959095,17.44809929162573,11.310162430604048,7.207042086442734,11.97233256198797,19.211505034210283,19.960417367381304,2.2278033761937577,12.425964775351638,0.5935775784187802,14.693510129961194,9.353801973090711,3.1104418403150236,14.564637555588366,7.8293621326179785,13.454400893898853,15.068492408293821,2.740879049994267,13.506943542494149,19.4604124632017,11.901520601140327,19.044397957881735]}
},{}],15:[function(require,module,exports){
module.exports={"expected":[0.28187928708815285,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.1128290393825412,1.0,1.0,1.0,0.3089770196110535,1.0,1.0,0.8771222688313145,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.8531429091090281,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5348423104480022,1.0,1.0,0.0,0.20202256236790017,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.548460357441562,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.9639807995828052,1.0,1.0,1.0,1.0,0.8262842279275163,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6992196517450588,0.8118477112553392,1.0,1.0,0.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.5629576869135727,1.0,0.6846972008463147,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6757040238697896,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.8831541926753547,0.9074608747066626,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.3206359935808698,0.5354466292490313,0.0,1.0,1.0,1.0,0.0,1.0,1.0,0.7667157933600354,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.8411894572839992,0.8675831928987624,1.0,1.0,1.0,1.0,1.0,1.0,0.3460246069660232,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,1.0,1.0,1.0,0.6920479454492008,0.03857466240503192,1.0,1.0,0.0,1.0,1.0,0.3082484302795636,1.0,0.3124955556033915,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.6569241557654989,0.44306599089183474,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,0.0,0.041408347391060765,1.0,1.0,0.87752435588042,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,0.004653725774522479,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5397075475926866,1.0,1.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.2913184445526998,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.08084721754330347,1.0,1.0,0.0,1.0,1.0,0.3805744242092815,1.0,1.0,1.0,1.0,0.20871719439207698,1.0,1.0,1.0,1.0,0.987900394941681,1.0,1.0,1.0,0.5766492062757544,0.993565051117869,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.7104236649643271,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,0.8394537658343837,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.04061958768150955,1.0,1.0,0.4918088239911731,1.0,1.0,0.45726384227070765,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.0,0.1544120361127765,1.0,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.7104536452785676,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.3019400078504368,0.3312187822341662,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.767646736762586,1.0,1.0,0.41032315928390106,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.46071028517823603,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.08334434571106696,1.0,1.0,0.0,0.06837901171790117,1.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.26085634215495496,1.0,1.0,0.31906132895557404,1.0,0.7308366068234213,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,0.2514556856746882,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.8201092230867179,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.012096505343672709,1.0,1.0,1.0,1.0,0.0,0.5571340159146816,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.4468654341991653,1.0,1.0,0.0,1.0,0.9482566243004192,1.0,1.0,1.0,1.0,0.16499362761031838,0.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.8756044311603441,1.0,1.0,0.25596618019642264,1.0,1.0,1.0,1.0,1.0,0.0,0.14796954876938917,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,1.0,0.4405124120116078,1.0,1.0,1.0,0.0,1.0,0.0,1.0,1.0,0.0,0.6618547914617039,1.0,1.0,1.0,1.0,1.0,0.7776374128856149,1.0,1.0,1.0,1.0,0.10345748213365695,1.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,0.8494167658470764,0.11987408641942218,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,0.16335950607658775,1.0,1.0,0.0,1.0,0.6451229303265114,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,0.0,1.0,1.0,0.27568449197097983,1.0,1.0,1.0,1.0,0.635255863728804,1.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,0.5148742750199874,0.0,0.6873089467596359,1.0,1.0,0.5943985491090359,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.5357034471368856,1.0,0.33155967255969593,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6683888427979089,1.0,1.0,0.27631578295365355,0.0,1.0,0.0,1.0,1.0,0.10151317134107524,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.16258130674198112,1.0,1.0,0.0,1.0,1.0,0.9035817712639628,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.17253294058699087,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.4639305658489132,1.0,1.0,1.0,1.0,1.0,0.5582040299588183,1.0,1.0,1.0,1.0,1.0,1.0,0.28472406073837697,1.0,1.0,1.0,1.0,0.8447293719321682,0.0,1.0,1.0,0.0,0.5511661665747287,0.0,1.0,0.0,1.0,1.0,0.0,0.0,1.0,1.0,0.6833606676115546,1.0,1.0,1.0,1.0,0.004909477147617168,0.5226194222712659,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.41391912343218745],"x":[21.943146729259922,11.696782946505934,61.799025271819794,59.48309130853908,77.57284259329747,4.182529601787177,31.147278628455943,48.00737547587934,78.22091285053712,78.17783131273023,10.719336603605957,63.551939304081806,98.29934256643746,80.5992125992062,14.71503284896385,29.51574776566983,49.12824203843611,21.91935851688307,50.760118530557044,23.652775847285533,49.419184027956334,88.78129014297176,14.824300987516104,37.147050673472926,69.43766800589242,1.6648867263030942,79.81860180925673,92.87944672020127,22.320818244337094,95.32171777207527,90.52017025209074,37.314836822578634,56.68939641994824,73.38511375176257,33.293704855531956,69.2796529108676,40.238366253655045,15.337218888393123,15.789845985849071,47.427962829533385,29.31572052034104,39.80679257918101,86.66592411301717,53.5452723665758,59.20016112760127,96.21938825376432,69.53298521562718,54.10758635379382,91.0256105252547,83.26706945693012,54.833815969817714,77.12356063247965,69.47739725596816,40.77492714777162,43.855863932352435,53.93349335826505,58.87144714236467,4.467434075081522,10.763483452497624,80.60344463591198,72.84515154342641,85.06630212153463,99.81485416280887,36.558112793414296,26.799472140419844,40.98092338265238,45.39123869503694,32.6402552339095,16.973086432803886,60.940772612254634,70.36812581869665,10.740894858518168,2.486044146781241,44.366657357413985,10.144786840870879,92.1360856631996,76.75102579824693,54.109850067241496,61.6922549926536,99.17677770486522,41.747341164142696,89.05067161140734,86.74282717101384,74.876329955503,60.83799484549215,64.81564168515428,77.45047863677294,83.66182902155037,25.72479995669923,78.41909914309618,80.20599899863832,39.72169944866237,28.772557480792106,38.22562676130341,25.562281273751708,78.40304801555071,58.60835782615341,70.03040409939305,39.646663632792325,36.99588179078934,85.65806439089879,7.998260491017728,26.185722746449457,2.741195990666645,78.99375794156846,42.013048740306026,19.17484396858793,57.38963476073893,17.79406654308118,89.82614002580304,31.559615022631004,37.18834913637106,50.74504522003587,68.04443152122587,79.25860765742586,36.035166903432824,71.74476006625518,14.498568690890924,25.941185548995737,80.24248125105974,32.21593030728531,98.29051890498468,67.852895751371,77.57664040355007,6.023549656847593,44.619197456568706,25.294604725278802,40.87324691032559,69.33272725076405,92.32327690117894,47.4186849506963,13.245875841139965,78.78201181107671,62.66810631059023,76.01522919021623,38.17385161228846,17.32568553835423,17.486253716092758,35.44423644577079,12.75700733476186,35.23730405686669,25.90303274737973,39.505770813668505,89.12523886939813,20.23222501253594,20.360891447198924,48.80583550180202,51.77310232581191,5.529176845199202,27.41735477511662,6.219545671573279,0.4676996560728508,5.790657462215254,24.216357418060518,58.418629964796345,13.172416933155473,7.72711278337237,63.03248750680937,25.58764781722058,17.992867721495887,97.39055093952662,5.828770943844042,64.44551505433422,15.790918741407967,36.464846402043904,42.57139897053164,7.8771223414736635,86.40099951767625,32.853133248638436,32.078058876565564,65.005836583724,59.15618659204509,14.811018591061043,89.68320688382012,33.64373381711061,87.61914460618642,67.5948633658555,29.77944083998276,11.400075994007096,66.03565994123073,72.18371635109793,26.528026905072654,77.28083157342174,30.735564342233946,34.06528195812246,31.53021571888026,83.89983646796534,18.41385666365778,58.64649795674837,36.885568345453244,92.55320786167917,52.347873234662835,90.08099831188139,74.35409922717655,45.22915220142223,78.56510069021225,15.777480528040243,30.33108546508494,83.42147211900703,31.900105236176678,86.76034814531724,40.085156800515854,85.78775082301205,55.76443953361523,4.076816244138737,19.63862532344054,9.731655932644511,7.920996774392752,61.8202453577744,27.853036275671418,38.845149860367734,3.449825212600399,95.5300161010743,30.69168534070108,23.922017098528457,3.80288495475396,75.01986231365106,70.66555443605066,64.32787103695541,29.851922547842502,89.31323036642047,96.72291504623371,75.12639942734299,95.74236311069842,46.085786081542594,71.14838027355465,64.30837315091169,69.19230550879902,32.37726384219026,39.09743753907109,98.2114266238999,41.017951795236485,51.86350312870469,59.658838631464306,9.192800948867985,7.96377228262406,91.66663976142237,25.177803006740618,94.97263305319285,63.20544278240514,96.50598893269502,28.11587695518316,31.423073802260927,73.45508874517401,97.99674396694212,8.804213892780432,70.2088564716418,10.203387853206515,8.935315512069831,50.40401764606519,31.176877656953785,86.3170793509602,19.595131641200283,21.104615895566916,48.20271851473636,15.618183723416369,60.50208444621881,68.29614303584903,11.064046012993822,67.05813096415353,42.64831200937318,94.23499358593031,26.495222144497333,92.82265458375582,86.73524574783383,25.85266804792834,63.49053504879567,1.2879400095118232,5.153797320226428,65.499595904973,88.50702315603492,11.523313586073503,99.52794038039046,11.484242116012865,14.11044252049878,40.85363904326147,47.166742512514205,7.628887234573756,97.61462461380084,48.08057702335504,12.416429314693133,35.27356899774983,20.802515005628397,23.533871252922435,86.12935879372901,66.8198906027432,54.126409325528904,19.16454841760511,68.68612264047009,36.78470248980279,85.41556118082067,66.66697751046506,3.007295490830142,83.35177509882654,16.09646072873503,67.99784128169479,18.94464840604484,13.939015406278576,99.1562600389672,37.05324337344871,69.4808881747497,16.05213377018424,5.013826893746587,25.16832959733737,37.737731404000826,81.47329513304018,61.925623863776,3.8680016152021546,26.210173689452553,2.933172736230949,16.790881455814667,35.54289677815885,72.12820928920796,23.54768293442624,84.75805279515616,60.66971848603806,45.55931185946236,93.3939060054528,69.71259887392524,91.64082001880121,2.402959164353735,89.65723670927936,44.43770081206564,30.774662666339836,75.41135716415877,4.493062889981214,1.9662412613487668,78.93105240032841,25.37611088975973,32.14170520575741,43.357581851982175,54.433905257900996,79.65520532621807,71.36699644722533,52.778593691981655,8.72693336353163,59.8296834088567,58.54621946794616,1.4472393294267638,11.396904799243025,23.382487478287594,73.54231395538193,84.70496256128767,96.8921213519325,91.09821636067639,59.80922669692803,4.461921654851508,75.1558398185429,57.902935937922905,45.705214228124014,14.718953084922038,89.7817194527248,91.20830092461514,72.80483871253949,94.83983909195402,32.431685481717,54.25592085202646,57.29034648903912,49.68125796972282,22.31240998955435,43.71723616065266,12.574126829522259,75.63837332007475,39.638151233435835,12.247615584603588,95.92934019564494,73.62436476495442,43.473766980771856,82.57484389508514,65.68479020728866,76.3921453347426,98.18792848964912,55.12861311402402,33.39553691636261,62.77845274293241,62.90651301736068,45.099860580486315,65.08666322611438,97.94872871470481,93.39533755111427,59.0703081514659,87.11290514688686,96.32515506334327,56.626645838675024,77.24868986235882,2.9821719769708155,5.793046725096462,78.3986138988505,79.36993416636153,14.086034672871461,99.67732050301659,26.906486592248726,17.886059362448,31.35735664867141,48.29106716955596,43.210000337837954,98.21319454312332,6.084188646427036,96.25716504248022,79.65474425296605,29.383523886208064,87.09426434878647,21.260884473728847,88.0189024773261,33.64747875450189,79.21124504096544,8.630826917027544,33.46657691194959,81.88232353233558,54.055383655990006,61.891604893115,28.44055699406045,94.58042770986034,23.81367352815593,46.667067441898524,13.868629407728461,61.83134329774083,26.749572252045482,94.47497987813405,92.81371369322176,65.3814267002133,32.024714249251105,89.02708869080782,74.01209319431285,76.97106976997814,41.43065111203257,91.7260610893309,25.44381480668956,11.857585407668036,8.491925018647128,54.695355499688624,66.37011653980225,61.47224072929618,35.79165472015538,57.65989863857581,15.35825837523095,56.19130028929447,10.079481865040574,25.706388865120623,79.53439802785469,25.322583995838443,96.73898211547771,35.25840913020348,93.26402548422716,54.85999373109587,99.54042080737628,97.17911608020566,92.25687340608377,29.235577093044583,70.00377523357454,39.2732955644991,3.3864382490310874,94.18792449034945,58.31691581420153,59.22469414495304,61.80558777067488,7.228462968173277,94.99799629882952,9.634031050605586,69.88497298429417,66.36621902351052,45.4924700630722,6.8855596513836215,97.18187457059031,55.9106173187901,98.35437554625166,85.1744592623743,42.23591796045394,86.45598428776351,5.7986378197083965,77.50965548125701,65.53406305463005,92.152990417923,62.755664906882956,3.3517171397203116,94.44854145667708,33.15749757201918,24.793821479137932,70.75337355353139,59.09508312215899,22.82016400040352,81.69878440843587,31.871556441513604,64.30139774170055,55.3981127023623,96.76557392232252,75.08234712089916,83.00143925346734,18.027042212552068,0.820922426078674,96.48230479723901,50.656766565844414,30.28902794181052,74.10345946628871,20.253125361316272,8.111050801208242,6.10147445145881,11.501691289811244,99.9688445748625,33.4814527330721,0.13423964376597652,57.62081725044914,6.814302123223515,46.78949927258458,39.256433800615234,29.53030770461975,67.31620597663128,84.18594936540609,12.03575003097801,91.48256065991778,39.47660147561014,45.527649012452564,97.95510998345446,73.83140843684063,26.84317021090683,76.5894167636952,96.25111131881434,40.82294712294061,18.27654194326145,26.27985720197168,76.15849836803193,53.478812540526576,64.60086344521156,14.412280636593056,7.712786781156122,36.301666007207125,89.88272098609325,97.05879389835866,28.145438736622076,60.1347749244852,72.0054336065022,30.299386747006473,61.73330700177608,20.59982929942219,85.372303516998,73.43655730733462,69.36823657476272,36.15401993542853,38.07531764247152,75.01111914014416,49.975906147929486,35.60972735424477,25.89587568148668,87.42129868692157,41.943892586284214,48.884722011087604,17.013155573188786,29.651252380357775,40.49718132851447,85.37871043270293,12.032244483655962,34.388876082423714,20.72645789695291,13.441177358633238,74.19080393919562,52.39663375714794,24.264996717517008,72.1378294008964,65.0733432235523,81.39322009863012,85.16813037324398,67.87597862673032,76.05767435835875,39.698006129647645,91.08982919862282,9.768531243303368,94.74213678494712,80.38197033455114,72.03826690333896,37.94104972642336,33.82507395391683,84.89198026235078,36.44215014780834,10.320906458055923,69.39993832098162,69.72137181718642,2.695291867772953,14.492286007334343,89.99448658832883,23.088676820205013,4.1529744811484415,40.96650389229488,19.631679551940717,2.7827772918797455,61.606148608847924,36.82245418472101,76.79777563629841,81.26853761738211,21.990571335910136,93.5259801865413,27.414944085069394,68.31419649009749,12.516387259555795,38.00232011822888,46.537852439979474,88.81377954039247,58.43286290760508,64.01411492722504,94.46073604188696,90.0523702923078,56.66553640686796,68.83787401723207,83.99208054383675,73.59674175429332,4.685160069658401,65.22777020930775,13.836865419829225,56.85650286687645,30.263432039026682,25.90692945584856,76.25401090160138,33.97269723344636,28.6394193278791,37.206193300814185,12.193587652555316,23.440317775918462,91.19314035247743,10.966050941698203,55.37699051608287,82.63370670131943,12.301027092585715,37.621637435586486,41.05981743807827,14.684339826619809,62.04369227682947,10.275431758961018,49.69894781312294,14.225663248915076,46.53284727244462,34.95438029402449,10.41268479344215,80.03892836187305,46.828315725256076,95.34925991439407,82.83083926953638,76.79877165242806,38.60113440463908,61.153802123552595,9.529097910188344,42.74046739200561,45.77113272782576,75.79871679534875,75.5568289119329,95.14399731150075,85.53658690437598,64.8314998891151,6.088749239412561,88.82949507138376,75.71806867592663,88.47300791486774,93.32847841890806,6.890137931984164,81.92154248878198,10.454699572638248,94.41796202707818,70.40843262756802,59.636886933930924,41.043404049488274,54.12163180234959,45.954161022859765,55.76106367471145,72.02641130691264,52.154895226154416,42.527579779797954,85.97354892332869,42.15829210840156,27.846875076510447,68.87071695379225,72.11761425147691,38.810363353582254,43.69461765513278,31.685626022254198,27.32015802283079,25.14083815539243,92.34769735784596,85.15699385282028,83.61500053777813,46.80440336725879,75.95873087223588,66.71150218431254,38.22897519913335,52.96194825887355,4.080709742912814,70.97041380457469,6.055882782305866,40.64211143972396,48.64125302923921,45.776442676862004,99.27840779692636,11.12827196119499,24.947808850721522,46.208071626587774,66.922484698477,34.59318751634011,25.451346048590363,52.34249346032611,64.88866311800683,87.23333300740931,47.47634045976754,95.6774182685918,58.93429024088987,84.90055144215624,24.210576347437375,58.864505615101926,74.52919905752191,2.310829533433756,93.56610152229099,21.859844559468765,62.243791366643705,45.66987263934132,64.90009121706892,90.79770845322473,5.390312018464893,0.4875147576504313,41.20374409626204,23.99078629592415,83.80733665090807,85.55494470208988,2.2920059550626704,85.63143730196346,18.38612158634232,68.78175384286142,26.433289302374206,32.58848220725796,88.92639763190351,75.3837550846844,16.711889172171034,37.204782019342254,88.04732738959137,23.42790497099365,72.1968933328854,51.09695732535589,5.810866101505807,19.850477888339068,87.83977879262788,55.51192616515037,82.35831672538441,59.94268234824296,88.02168920298989,30.5621438841998,59.65534176910534,72.78705264107171,88.69983006233461,0.5020336483148924,15.596872372957149,31.16444867230703,90.78940841963727,18.260288497569533,81.95470734063943,77.81225388069231,79.56064670269288,10.88436022706678,74.48214909158423,7.593876848936798,98.34654234883189,55.713227497575566,17.733549000208292,28.13894290235588,7.578722779581115,82.89469315835451,77.3762026999639,15.37886731823579,73.94367314116006,13.56079005949622,82.83217845864472,38.48083309464767,72.0703109755255,53.070525786531775,17.27912700909988,88.91889286312174,8.924504099539043,0.6327518386449071,91.67921710443161,25.72992814896049,89.37143973476189,29.763218669383782,32.597252668711164,14.219611262509236,5.082820662269727,78.42600636091805,5.440398747645947,39.79096583965587,45.7688762348339,75.93165261677059,76.08821441231322,21.876115130643225,5.3662475694516765,8.12830500181352,92.56841855568358,5.915535637346037,21.306362859345352,51.952423629992836,0.6203490866427019,95.78798865684841,15.733055131881724,89.09713509981071,87.67118172435372,67.3198089830497,44.47159695658189,16.142405479379505,82.2614006857003,21.7623648022083,89.27530148998947,60.11987107256933,8.36523340255475,85.16470407444064,4.713236582806535,80.98131420803678,66.82822370238446,34.817420669000576,72.94533240329963,55.08772011690319,66.41137305312714,45.02379806025949,59.04980277373002,5.195756854557421,71.83108435642933,34.66563491724073,10.583560294786466,1.6117113183581333,30.373582345569904,75.51268072276969,13.97951016444976,99.37805526590418,61.28866850510983,46.08651777142689,48.044922049465846,18.922515336896172,88.3652783634371,79.26051405340526,55.43574269100422,32.179031772458686,3.1338942205117792,57.86401214083219,6.509239375284226,74.90909213001966,28.179377785211667,12.997178132703358,12.100160355905532,51.52200629733132,23.5520000575423,31.534112314791287,64.7193784877431,58.57716354740934,44.19504610566805,4.36671502379502,99.17593988432554,47.24035516099403,58.802630284174406,0.5564047753150669,54.741458848625356,49.03764444697305,75.8611146514216,23.067966402064897,62.879530472065895,7.015426918442813,20.918649109895604,10.707391733789384,61.86162245909919,35.4199045822605,64.53760251525635,90.30483137433816,87.75837157157386,98.15886575439619,72.31161676543998,72.24205198812999,11.7572698769286,18.1750947220118,58.541472519741134,76.88128300049557,21.81372555212018,14.76353267034205,83.45543809045321,2.9244539616611,29.490176472173403,29.89879705066616,20.449756534513487,33.88351117850148,78.12013776013282,5.87902966693663,72.98261571530749,61.797127967442236,95.47994658222574,95.9366627054643,12.261541117672458,71.04561697098227,5.286948362247279,45.134411198150495,29.193779667258756,8.673024810912565,66.45770023648387,42.82468403985335,23.810300730655488,24.223907999019858,47.633987758494214,61.464505994597076,87.57328649799612,64.79658394315513,55.164422355973805,2.9430645929897192,97.32981075713832,95.73679698922413,67.6402098659153,74.8155523097124,8.277533970477258,36.60655395666399,58.40729861307521,57.042681600800236,74.78187411330195,45.23105539165617,38.57331703409628,56.230820511529146,22.616404786930723,25.4954807490952,57.32852859816939,13.765079912282928,68.95374791715633,43.76373846204413,55.58604056684868,60.046367002753634,39.39556542354779,21.957021252190657,72.86339800343293,65.83409105762111,22.095443300240824,67.22529502194827,37.674071958346666,55.272705554940124,24.543792118898967,99.2659334447306,64.69168335506681,42.234662372118905,28.724684577222238,7.541406844658827,2.0593372059093396,70.06335082358528,35.11798317549959,17.933905784268035,9.537877367431813,10.498081454242625,26.488319913446357,10.79375613783704,82.56197226958557,36.18003264166158,16.526443831820913,4.5997879494028115,71.17145694435649,73.96744687122079,31.59026964008895,90.91507136806905,87.64058526079064,72.81392779357598,51.00734140516578,0.5136085363464327,19.400496472975103,35.67814409942438,3.2975687974068135,17.06710764474888,93.22971820634756,46.69737076574316,59.25405559347643,55.5620536671833,33.2280830452337,13.903001452517705,19.423226325279973,4.812333283103998,57.32202301174931,90.6100675360024,25.434946499451904,78.81547600968861,4.566673169939284,68.67605757887507,46.28997884113804,53.61526239473473,9.429208168753188,46.2592005771717,10.138597126699157,17.18141398571309,33.18861665457455,24.8031860785467,0.4720400007411696,48.63383721874788,73.43289256092471,69.82371873391094,88.19531032435069,30.034801548254176,37.81892359792274,65.39796767012716,84.70116337605631,6.75510495317877,14.779246640132104,91.72481709862971,94.84808799961073,65.87128966012912,81.13300869724074,46.444219499589636,56.78468907940655,92.39410916979729,28.88366456380529,11.472258741894859],"b":[35.05059143299346,27.737512586449327,37.672816339048154,22.478834377407555,25.427871049914074,10.771481048451289,19.32818117423703,8.2881505597976,19.989753085014538,18.493257125273296,15.989521923345578,3.713754395773079,21.018648796026053,31.93992796225357,16.29709909818895,14.613573982525741,19.08897551933987,24.01940550840888,13.109307536791816,23.088121998858902,28.645002954242585,30.891564271228596,37.535341589360186,10.12441265028535,4.223865821528041,6.340027564730137,24.259019833620545,11.134522774500287,21.573347618947544,21.921724271727932,30.64511180920605,26.249560098350635,9.796942910474895,14.719123945548283,26.94781787925229,32.5102186954031,2.405388750053574,22.46770093047102,17.254213676169766,15.01503899109126,28.161134593967862,16.2351314618336,8.332872348126745,24.946032914318565,24.16517973023621,26.671629412945947,33.414598411086295,15.91976360218364,21.86422727040249,9.109404444278635,31.13903619693668,21.281686054699158,19.970584298968205,16.303130320566176,24.424415871180756,31.586658394614375,22.852451730005086,31.874646749143103,34.44889924028858,12.260368547456943,14.782036320387771,3.3137657799663423,25.11396830643853,8.519136661791201,9.637979393903793,17.63277909343978,19.121635581039747,24.58024580240394,24.862756851030106,25.131537958410068,6.525664128926536,15.012979057070307,9.568557583668404,23.94441612957855,7.91148672430241,13.736494874530496,9.896768228081045,9.32311448189649,19.37785226799848,4.026835723802935,21.46634857913718,17.177281415533564,38.6833411024716,25.779016177166373,23.857937486711947,15.434322703665071,5.373733151886251,26.783171918810606,16.508825408200618,12.104325484601834,25.18234138350924,32.52045033622777,10.283204415615458,23.63199090251123,15.848981637130203,21.482684695733674,6.910633768996304,17.075834734695388,14.029539117426841,25.383117223940914,11.925005841907161,28.833111963440672,19.5564887285299,22.31996221931191,23.87932539631769,23.576065913051544,4.294647110596341,13.052279367511645,17.5973935451359,10.054945428363865,9.00272122443885,33.32608812771969,4.289968131273074,14.058382789934988,20.554842036399833,20.73841079805527,25.525266443126636,21.345858214678508,14.979621503975377,13.893504306511023,11.225239154611625,32.97258522499902,37.44299837954823,16.707860935814033,15.065878657886843,20.81473270190505,22.53543949213258,27.225271583016585,29.313638413284714,18.74024903278486,8.17610234560101,13.645449311625258,8.714530551157319,15.085373858506758,33.29346678663042,36.10116149608953,18.94749604533848,35.63061296103021,9.547520570018255,11.349325931562554,22.267963212582465,15.375189468263395,13.913458477525001,7.745167853893031,22.733266712332934,21.618462766496037,26.529221242267266,18.61744516593711,18.703270285696032,14.23046001930576,29.455139448784433,28.87346930259603,22.475971278938058,23.51538626563745,35.261554093498304,17.464176041610564,10.374332549177074,18.69946160914022,29.142337613365342,9.459845355005324,25.91586520495649,9.216155718517198,29.851121282561316,8.64296981697063,13.684821753021726,6.515491546632108,31.165800562707872,3.8290965063506466,17.746052951443918,9.832209694211752,22.64337451065889,19.093887348440894,31.12327737335173,4.259738025961988,29.471800535260254,12.764567762759178,27.45756012853036,5.148627607473717,10.818596839773345,30.73654560163101,25.794738050114468,15.857895053234099,15.724014020765257,19.683504931588285,8.727809603877105,22.248435325990755,3.2750509482256174,24.76344208926782,29.367712664536807,29.056696052528796,19.370118353655474,24.284093570436013,25.799605073154872,19.98648654288815,24.878015177618842,24.969930526251755,17.61547928993751,32.07062497644321,15.823864291149764,1.30563961028761,24.374577694052654,14.228056115794153,25.217961790897682,15.74948562178728,18.694129640252353,22.93652690202301,15.759390912102962,16.151874961196047,7.080689467493739,21.151521162086155,13.332476249309067,17.27479035032153,16.43427807302058,2.393035386465905,27.665624034158718,21.576212656545387,7.507234410778678,10.14733203131669,18.27200118855157,12.051404573052551,35.359540385478255,11.735029014390701,22.10868905866333,17.72561922046219,23.363201843605697,14.22208604392285,20.396259967792165,11.806245346834826,14.598070926265706,30.51004184621293,12.617097658544534,14.266037556159752,19.522659301627762,16.80308135988547,4.061028298313469,15.372413049603017,19.73755833303917,18.11960922337978,18.54564907865805,13.213937113092653,10.201220418236488,18.38159121394403,25.01887346782844,29.53907481572013,23.22964695546984,31.39771701960572,23.240448615506345,11.815405760183317,9.84179103859038,26.51406389670838,9.628757506096814,30.55650441263494,11.472185356102589,15.659125856401314,14.882610272570354,28.483791478178254,17.19023513077675,19.607324725501122,32.78748607678672,14.376653009103224,33.322829729373524,25.20032282223507,10.218535261786537,6.3386732859648065,21.499883611869794,24.569742163968385,21.30125441170494,20.16906226227224,25.568631376286895,20.85863438131181,23.349261099472134,9.062438075066694,31.977826667308115,14.471121751910214,30.540622420707617,11.379202591785376,28.733467224376167,24.579524370441533,12.36103961269588,38.72090699988232,21.066573526296942,27.842957078039518,30.368785881318384,20.72516764146357,1.4095934040929148,4.773304659972091,23.01335924794913,13.135890813106492,20.360892549947163,24.310390919099895,20.890057834505733,20.887661942342923,35.08715475028051,19.661608169637233,15.872588806958273,23.516310164555705,23.250104746602602,17.889137926744116,23.02701411182486,16.8937086680088,29.603935245027277,15.570255455941844,33.43694977514967,11.301474267584362,24.378317967642232,30.969285431094022,16.733501568393244,16.467521037618322,16.441674691517534,17.44392879025067,34.535551984232384,20.48601024416875,19.40070230649603,24.732769767963447,23.01023337402549,0.9102689904231287,20.94155368045228,32.86591589927434,27.880122802674347,19.393457653979233,21.420938946843613,16.279541841155734,22.11751426493815,14.983717507453292,23.186302270156155,21.643417272048175,10.496565180132649,5.782964373170225,13.159645148232396,26.640788349773096,23.371141440252728,11.003605891457902,24.97416062981599,17.223093593860852,15.466759616045081,15.678238077441954,2.2281187252463175,31.36219181098726,15.892024314880864,19.784756303773328,22.095799790737615,22.41201537621917,24.8902324812746,28.34204767114894,5.21077700337004,25.863787238367593,12.917848059395878,20.631905658758296,36.82109216292386,21.209357981610754,25.875710570453386,23.855364847660624,13.168356883141215,30.0770928285952,18.81268726129663,22.48165641510449,16.354171400844972,15.988344595706407,21.054988708843272,9.92331159327566,18.88886396781575,35.280474010181955,15.73247885749478,7.952669618437502,28.64232448782384,30.42494383135041,17.69075877969927,34.22972715112755,29.341519135569055,21.445290733690555,23.888363578473523,7.368377797712702,16.255355569096533,5.130301383030922,22.568147008735657,18.18052286586596,18.103995630458147,28.223498725441104,10.857664778822457,32.836148541405464,33.75043652963761,36.539070354212825,10.228635557425662,21.378100684209414,20.4919262863726,26.089715196510326,18.657241542001366,16.721540246979135,13.397470354033612,22.059943994936937,23.050090955526933,22.508054857307506,24.375973665278487,15.081572403550076,27.1756429223836,11.005055314746999,25.0507521470906,19.903140081824233,16.845201580050624,25.357840185937143,18.770221681576473,30.586116687671062,21.411005687873782,35.833110232073025,21.12727917770672,23.84424056810264,14.34523312484749,33.585324226907375,35.59070752766288,28.16756088091683,33.508014441401514,24.459937487078122,33.038851924340506,20.11055905841124,24.819297513874623,8.305543398606732,19.790695528618592,32.39600750629835,32.76022503795858,19.401108309878836,28.010050285809783,19.90461614974347,7.749063790340234,18.11266331745349,27.004050797216394,23.92794583540673,19.073761227393938,16.877739921624286,30.867446543745647,12.29741855097743,13.740439682683938,17.030255620110278,22.575237512911258,20.895954887759327,31.374157899948116,17.375547958943976,16.712098910598865,5.814600992168373,14.497760804730124,20.928654963031043,18.757681955512687,23.549771820155826,19.494326062979095,27.89703050264125,28.80056099190765,27.292912566702384,4.969163824861926,9.193275712159883,23.258387641547383,13.627203419330979,32.87513265659253,23.87004087923581,25.521428705598616,23.287245856181624,30.891248319654654,7.818921147052951,25.1311322690561,10.537433520233694,13.68823110066328,32.91228497948387,11.751868884515272,21.89932136265449,22.749904910346284,19.401311462301607,27.15598852728723,35.846135168458204,17.422826467379867,4.40453282500719,16.302327586792824,17.307423674533478,23.149037707362872,21.900611490857372,11.720301562993885,35.13881864131647,6.178281603810443,25.375112429648336,17.49071230071287,34.15009629232434,10.421528168249974,12.982012750620479,29.878719020495225,15.20249161330516,21.02754014773826,11.445034877364053,29.18031867267834,23.21255393621282,18.880303043389297,5.330159164772161,11.146774141506821,17.102019949404994,29.723758625723164,18.32710082305629,24.993037917716315,28.728354097607166,17.20826379419716,35.92975282785224,15.604374101345126,9.806916378012609,28.21109323433042,26.150228194923237,15.660997569972821,20.7392907760031,19.922558026034682,7.981143911775486,16.102337577834845,17.338890344330817,28.114532312623176,16.36296886738225,15.514076951751193,27.135526248410955,1.5919568475736234,15.83147808487805,26.955286279540232,17.126087604584107,4.8170335005953335,34.590314965518814,27.223779584139773,28.530881273310317,3.8388089834468886,17.641808841028496,37.162181778955095,24.550198426021367,17.572924481214983,26.13777101900626,18.936941590317556,20.471493685152335,15.820295904516598,15.03764148675851,11.227199500330434,21.799586057847993,15.693927642831142,19.46816408352384,21.675656421255116,6.328336080261692,26.71624982972252,33.097766353455,20.17098292431207,17.673476616056412,26.577731899690225,8.751128602522535,17.458013847026862,23.90181024195769,22.984694106077566,11.20747491212418,9.390203067894035,18.196102063083906,33.89646452394504,33.2093440943269,13.224174407661764,31.872044849558165,20.273773486353697,33.330896328609256,4.842000843043772,31.71351531599942,12.93077474197942,19.827580895755403,15.93885604170057,24.167258898683528,31.621941462973567,30.7255405205873,13.885989693705998,36.20659199534939,18.726576635872753,14.275297243882044,23.829637406571354,15.331697538459874,28.83954792503152,29.127904817143914,19.36351907681999,13.085965669170173,25.04372928375199,14.965219552486673,21.63644248295217,23.6486795204549,11.077856441748835,13.186571923410732,25.37414203693001,27.022854513839007,23.12029914797018,12.71748281424288,10.332104059740038,18.64018307200088,6.721769369452342,27.50302294929029,23.272803937480496,16.985222602896,19.62405328187451,30.221300941380893,4.960321674760202,25.47117496620387,12.73552123727336,20.768245528330006,25.36256384653381,17.152270564040613,10.413469800600264,1.1424546299049831,37.59869077976076,8.591995865611114,35.7140531962969,17.849244473846657,6.485712320581518,33.82443832752169,17.132042191699366,19.857466791611333,7.07989137827898,11.446450847694916,12.780025380807793,14.367391482092078,15.814235903962683,25.46267251742988,18.42619014382138,24.47958427254994,8.77501502869967,8.522618488536395,10.855253144715329,11.955245620185494,31.154918603704598,9.72739568253174,19.888087246415047,25.770785797094568,18.82104754001567,21.729665893540762,12.5682240195135,27.54170312790532,27.039807580902675,12.05859504251,11.477123768008827,37.90149042114929,29.554842502521762,11.554981219854206,5.524547839761871,22.741764202991284,19.5911201823171,28.464630757411513,16.192957050414773,18.017340415885112,24.748304023781422,20.49531843012039,28.3265509299163,13.397707948040384,31.621364461106925,10.372321724924412,3.5322881455751842,17.359872424847236,24.134254621049507,2.057148804748281,30.942564571214312,25.365983080778438,36.07402032755299,14.548644556735843,28.611672638127615,20.937125027770207,18.819762408167925,14.21209086524188,35.248166682079734,21.984797115427646,33.89666133598796,26.373612839311804,17.786604863595805,26.257492228662926,3.500512815312682,15.756372549503276,23.453346193748164,29.09162309175178,6.359209749756745,28.898215784201014,24.741439739186042,11.948453164933257,4.678665827034667,17.48372511553482,16.98961901121435,19.0352733793442,19.308255718391294,26.351159795039806,16.625378888277318,19.74530427973285,20.03939072570794,18.187502645298853,17.035552827307416,12.141818287354322,32.75067224336367,30.44843848903394,20.407633264552725,19.9079300189273,25.493656269774856,12.722274383015698,2.8219693259665224,18.964760972448204,29.434223158967242,17.18722098937588,33.06757232660852,30.01279975283648,18.55212350642659,16.203714401223735,12.63380980564462,24.277104085940096,19.700313269871717,26.027858776449403,21.885457151233823,35.47083359051631,21.71235919928161,21.0417347771415,30.43198748952693,23.82313123035448,35.83585580406324,30.773593600734788,34.24485377317136,22.677952285447905,34.35159028576234,24.871288225309005,26.014663457312135,19.221095464586487,14.317787720825764,21.878844594269037,26.046300074491338,19.419491971631643,29.821407337317364,8.956481495221249,17.986790758580995,21.991912578852137,4.422196729882497,24.33405626890743,19.978307177229357,34.7327352731981,17.79461029525528,10.963452180327002,29.78943721411907,24.027965838159687,14.061546639406114,12.805396583466791,29.316862636554557,18.772351996793446,21.150718406578104,36.611661985573576,26.314984417617552,19.84407828419846,18.54577740681782,23.23908027108523,21.146420721586612,18.430799447007065,26.888771372081806,16.689986276653382,22.48048353178183,31.33227228271754,37.038538468205076,14.26826562702258,13.746782135392095,21.46954543948195,10.55999588202079,13.173388984556675,16.0569008149292,24.036486824198544,6.937755556555207,17.189274098886813,25.325079120345364,20.99287994030626,19.086166598551195,34.431877284555334,4.427464889433117,27.932562350066963,13.375926806733457,13.73803584397154,10.610461377791687,16.16913510698383,37.43531497969006,9.323110802383754,15.082979604987955,27.25259147824736,25.48648196891735,22.131338424940825,17.818723900488266,10.754118860720308,17.14345549630525,8.502392050722438,19.083514867214156,21.238417220334814,28.437662635169954,16.45545120816953,19.983061961010876,4.823455094525366,18.483927692274786,8.368217364793328,19.898016350440713,19.826629321633806,21.280787440386305,16.18149125733835,19.30464885703488,25.372905014958924,17.42944235809611,19.87535101358151,20.871022705483313,9.443359117793154,18.3169894065145,15.514998039686542,19.638700823199194,26.53724527757272,26.270637328468016,18.744264088846982,17.685097351253862,35.47818412970035,9.366581947100801,14.423595698611313,17.84443272102954,24.295678072867815,26.465561987630075,12.295305223444377,19.87318699269775,28.148691147082772,21.448696709424212,19.45904004771765,12.392245061004559,6.411808603486233,21.734554238140067,36.911311031137274,20.263600042023697,22.07022294447559,20.57527078866425,19.56256746585448,28.31950835808404,12.61908156297697,26.784572124196288,16.4541244910287,20.056916910339233,25.289008452564477,22.321526053172512,22.9154984940365,17.373764626347928,23.683209247882612,10.016564021143012,9.778340004997471,21.202319322288634,10.153534930559998,34.10094127394734,25.025316806633693,24.147635698380192,13.889649071515947,36.42281906810335,18.719345139705243,13.288713888699569,26.02808359725181,21.117193510100268,39.545139277596206,14.681741394737324,12.334514862147241,12.392831958394636,16.93343131758251,17.48631593649684,10.826272966952946,36.55871211640269,21.77735830109027,30.139642065934773,17.956291656150132,18.441659738084066,27.852242749867663,16.770814047408468,15.154982256000235,17.767556405077055,21.32140840006297,25.999361339981615,25.88465994364007,17.78215390143798,32.87337043836504,22.77398481939407,14.95788152487858,24.177791394095305,8.867498292063347,3.7699596886659403,24.411434334604458,20.593536539729563,10.53109511603894,33.99510696210655,30.54393206024381,33.7841454904775,26.543689788058416,13.752765869326865,27.424320420766865,32.76060992403774,23.709935232210295,26.508360265290534,16.811550678999726,13.372602171610378,15.053388409503814,10.858096499779526,8.448290850092008,9.798484538307118,22.996040667170607,12.85875861429572,33.4159080669774,10.021713557154985,14.010302233168352,27.937777578276652,23.36584114425621,25.160221611899676,6.9317351437313945,30.463562198305183,26.08918987588632,28.507829507458055,37.45975881580752,11.132187493847562,17.83541685332439,4.1829064224088075,8.777535230224323,32.22125086195248,20.699090146447258,24.720269703804505,14.959241668467405,17.876071315097903,22.723442274444785,23.079754371156028,5.816742232287173,20.388896303698708,18.247949509370557,17.52820571805121,10.006261269350114,32.67410376595933,22.437882965833502,18.21328801601264,3.7222768170093756,13.504957629037783,25.996747077173648,18.81016030190235,26.415668398167576,31.604798802937765,10.496361142643176,12.049451100367271,25.314577821965834,15.307382646699107,21.06479220047964,38.165370001510695,19.78782478903149,18.74605887659267,23.460746668336192,19.946939554081734,8.184258781656686,6.10183849182822,26.996192381295444,20.348956855282196,38.4013651162887,13.2497261742071,27.03013588964528,6.499525253143217,30.17649566810979,18.761591570416172,35.502969377322515,28.372105882836816,17.708039940020793,25.04333332031364,28.78889223126027,37.907605607069385,25.839683535471387,14.94257781581485,19.279400957922878,25.697843567342773,9.11958247654599,25.964550783449056,20.479769543529347,33.39644871052331,13.52772122886129,20.09182471446099,25.100816713624166,9.762107820934238,22.882090990954673,18.796899461270026,11.675830647883998,14.227128834304205,32.88413391132261,18.836413129357762,22.8600395655144,19.276638217448678,8.095027035134814,23.65021127899002,16.805079203169633,17.145424934636644,27.689605308386778,7.185655600236043,21.086031266736555,29.174438548927387,15.70575739850868,19.297525503785852,12.204365969687894,27.164544859963186,8.630576005964755,22.606131980492258,28.21382695765022,13.64116863280135,13.36781618908688,14.527106686706215,29.58801891002338,21.073129733864896,20.766778041623823,12.613533603644127,25.259379891936796,24.00367968963634,17.311743937504634,24.9449762948203,6.5246849021825915,11.531420928450661,26.94980164586025,16.711791718386305,21.228472562033005],"a":[16.79816608435637,18.373941233531937,18.66288847431469,7.567512662981408,13.415150975400017,9.52477194437115,13.753121171727622,3.5872625435966032,8.723109139814266,0.18918361744252987,10.049082533769926,3.1602597879337013,18.08070029060972,12.563202861662939,14.007643762948687,5.335071157828137,1.1844966434498483,6.928863784108268,1.4308690400299806,9.205981067784288,16.656486755602486,16.850313278570415,19.68652067113531,1.4093771409385658,1.9192937632982954,2.8435639388944267,18.23210203506701,0.8745315250645413,11.871041887462166,19.63779894029624,11.543673108457773,12.321490104037128,5.435765253663587,1.5552108455025548,12.1771281911529,17.299721274409286,0.8884701853050769,18.14562067108918,7.282834824549611,10.398539611159379,9.819542006525129,11.905829562641346,4.422387452686598,10.856241294937377,12.886550438288378,18.13318310856686,16.18619649887765,9.388939998645762,15.481920599019476,8.878013208527417,13.203054237472287,3.8867340861707955,0.16756942506649608,14.206243134024291,12.81560146660659,16.186010262522316,5.209798284971172,14.548900905368205,16.61021107527715,10.145100285137989,11.903778942379892,2.4733151962242372,9.802092118569306,7.041250259134104,1.9366548913585557,0.11734480501802036,4.379668384081796,9.631905582682677,7.901475557744568,5.283851049035921,2.229601596170241,12.767881690633377,0.6929765172366853,12.73595537779534,6.441653380805934,2.5597421065095682,2.291330547129875,7.314540903848119,16.651004869939854,1.809171024192282,19.31036842932217,11.203017865701836,19.868259481064992,10.950561145744153,12.850140287117604,13.797393067239497,4.043838318126891,13.86489623175477,9.883525235703537,6.296607590084502,15.982574712309873,13.144937157476978,8.280253460926588,7.3389405589512835,0.18302079857615006,12.162921887048528,5.5037515832679285,3.087320928788726,0.35303731192378507,17.796516317456394,5.43929127407957,18.52524977725599,7.029607894574115,5.894395671649226,13.695250016701412,12.294196202545509,0.47919493806476865,6.253776821002384,9.346601161649462,1.2718084608517266,4.35867375145957,17.676838102852543,1.5698101868689607,1.677220921110023,8.437496016382964,3.5023426761075527,16.601079139734793,6.181542884598907,5.253135269436324,5.015492648734843,6.901683297536376,13.570978601910344,19.853425577822847,14.449776486091142,13.398392668264702,12.193249799601551,8.276351148252076,15.66086049023343,16.80343022864339,18.15787958765776,3.653465009019876,2.5521028226080933,0.14822112261035691,13.765647944537868,13.659123948373049,17.71907270776576,9.611495706189409,18.105268708101274,9.372726766718982,2.3894522855388978,12.18078087706575,6.4526641592525635,13.732816032352249,1.3429703099653478,14.418090158055152,14.934667806107601,17.302827957697602,8.481935798895744,11.857715813849016,8.735062219202593,18.92138678401833,13.29341223849049,11.718459924011096,3.894735923282102,17.58348751221821,15.140251004054068,4.317207903488125,10.10199530583801,17.868445324156298,7.225919608532725,16.593655016828652,5.860351064846294,9.958726605316581,1.318017270438867,12.98392662477517,1.1759985196077816,16.28061220212277,0.8492820602491413,0.10711040554632234,2.374090610967774,5.9491358611210465,10.073392996708082,19.063244047842325,1.7245828356437265,11.785466643736878,5.0669657079379515,12.471378174467569,2.6290190103809152,10.797499563178423,12.457880749318605,13.074201542149456,13.474636193504974,9.51667026980922,7.298244513436587,8.60359787905821,14.306575239705822,0.3448085208853735,5.183842300892492,13.043753299051986,16.126923889184766,7.421229026907783,9.998736727808355,15.847393077136553,17.092651091489117,7.479938636317058,6.866085298084799,1.885357653732318,13.272743476654316,8.784978793140326,0.23441284995524114,5.672187956521184,13.998372088541323,13.501072750446358,7.493042651287554,12.361057068244596,18.082131397666767,2.784057271289244,8.720339730178628,5.178406443308248,19.744226446337038,12.71426001703551,8.780845881340142,14.95170505586521,1.7316196603640988,11.618215640979766,6.6635666846495,3.4268046520581796,9.901993685829344,5.332150997107421,9.95589547368754,18.651726467699458,0.16992243086120684,13.220516922201808,5.002741666552986,12.418022485618998,10.634035727990213,6.201368093669659,2.5141963992180205,10.707039687642945,18.07745421185343,8.391651596612725,12.713394030428496,0.7863700211531155,10.594904693963896,0.9861171344366282,14.114357846629154,16.229413868376067,7.528382608586757,11.545965245739414,6.658551939981852,9.549656083551238,0.018888581580047692,6.15680489515622,17.87057698905196,19.26099625553747,15.685069252775182,17.86179482969857,1.6648333900632961,2.99616814249144,14.676817629118641,9.375912922648354,16.76754146905289,0.11136376584879759,13.616914784852847,13.68808983530856,8.810868166683775,0.19707262538557924,7.762825375563045,15.741758024066907,7.125779465731186,18.15817697422236,7.488834132703968,7.349399893217954,1.9855967069920721,2.101695257790852,10.510138172802268,12.936605752137158,10.786137961555076,7.445330058874879,9.942587449278442,14.604315418421212,4.982437614028266,15.441921495746707,4.771950755132082,13.451224775634746,2.3005208245567665,10.62270911853389,11.974193257891677,0.5314592806506013,19.66774394582409,8.561875900385276,15.013950910781597,16.454300013396658,18.811761812287507,1.2847219764382967,1.4912260069896055,6.926527252062438,0.6709056746494513,0.7115183107413436,4.322344984880595,2.100287951286761,10.58805502477798,17.065951586429723,12.93671026622853,0.12996062101272354,8.611936399848164,10.700528864440315,10.796515720405907,13.091317256562952,11.676588750765756,13.038643264315617,6.475577475325225,18.12509311161491,9.833744489626689,12.134648704037359,11.84505856211552,16.078475682596405,4.130695959425106,2.664365542986662,13.840242573444176,16.024363742478815,10.883812206588424,4.758093246113018,15.056667698394923,12.870114397274302,0.6180219721750424,16.264012019239193,16.14695034440203,11.517163867171,3.1774469005429973,5.445228917552631,11.954657351608633,12.92377259673299,4.820607515186519,3.7361783771180246,11.55331965452817,1.9263578666811565,0.16356424878353426,2.734215217939364,11.577986343138775,3.8596583996762757,9.44884567429838,14.699482873035894,17.197832223653435,12.6723202132266,0.5763073863014734,1.1808721639018671,17.54516784321496,14.53249666148543,17.110676794846405,5.060538069525897,13.10213529475972,12.359464853296531,12.359858816016093,2.7310325957699133,8.0495790127212,8.120859281566366,17.714595216646927,19.464795626945495,3.164942223800442,10.132733488893093,4.308225858922556,0.47400316005776766,19.78518922351305,3.3282032038494958,15.022545840779822,6.106664572428273,3.9941234215148658,2.9347022478758378,5.636295782912661,8.363227032621552,18.52860047044095,4.017887306598897,4.008385877606013,15.807350662956402,19.646135023201424,5.92033980572809,15.73705729128054,14.749592389414431,1.762814245946429,7.927447353756971,1.899127084523462,9.26915303731513,5.058848769160114,12.780002287267337,9.836019938770978,17.877317640805366,10.483108582096392,1.0755213321192647,17.481439746321193,18.942929957755176,16.969026748655494,0.9182778259625612,15.977558373538265,15.002382192083687,6.5271271677864195,4.661532599553633,7.493236463633592,12.852527135141276,14.69420557916294,4.874383515949057,18.650560342887637,13.89866282039469,9.73220437152479,17.249750479008334,9.286181631108068,9.051542442751357,2.4391545921099222,11.895861573133345,7.238976350809807,3.589238090579485,14.315812123508461,9.003888809152155,16.859035455194388,5.028900906242284,4.791994426214945,0.8471925104673295,15.131826439608327,18.687307144400812,16.565115023331888,16.820121539955622,6.0912186678386515,14.742574258966531,4.379867205736079,17.625240706662698,7.863494532689561,18.762004762216677,12.89705482579949,13.169739693196405,5.914846365700179,19.38910129676116,18.938208137127273,4.8095662320947685,7.5293558201955335,11.169915394480574,16.079371836264613,15.906051630437382,13.780333677565629,16.17482114292342,9.685951438178586,4.329376734262849,13.91805352209988,8.129393610503586,5.676659680991967,18.965019629709712,4.810385068657617,2.2376601108498306,4.6697286564930485,2.9615026908315434,10.184774398890145,17.253293350626823,16.873322416575252,13.874199113198845,18.986692209836214,15.389171369883968,8.778322584513694,3.019888695011157,3.6795658460340652,14.102452668036044,3.34414393471548,17.135049293764673,16.62706259571486,9.724251765740215,19.063716815103252,14.63803491171063,3.8643054427235857,12.822892180086267,1.4462665787077356,11.86011362452994,19.44043553231767,2.5598159333387116,3.3554785868737813,10.258119274311191,13.06456768990036,10.949603995605525,19.903636914248963,5.81366481756501,4.025541846594054,13.697438471359579,6.16582455521915,4.912778598579974,3.588761342647082,0.12392652171618224,19.9837746700753,3.232042106112858,6.540451945307946,3.43319307687179,15.739161087451956,1.221863723006149,12.205500535099748,16.87321916652678,6.984041146774742,14.881445936379073,10.791321758028127,15.945707590511864,6.48864085739401,11.3606613003445,0.20682979503649612,6.764137205140832,1.975683563560482,15.995834801548074,8.17983177944174,13.465575189522037,19.34635144101645,6.856671763728905,19.75174052683231,4.36615873437034,0.6486156338861981,10.81887234243517,11.853092130387122,15.448280538977826,1.422013116899925,15.404702142892091,2.4687186726805477,13.026326906026235,2.48576948863938,15.369978905577684,14.346230805922943,3.501054290424226,12.59278372028489,1.5210751195249328,6.480641176557933,16.59656878177852,8.67376762863254,2.8024085666341936,15.870967426995378,16.766405586323177,18.38830207367303,0.3058852194445505,7.631980124326749,19.754463980454624,14.634552122238937,17.286689845683256,9.340517897098435,2.1539421414732196,7.961501944107736,5.788799129653701,7.038387012073937,5.151561774306894,17.305341578734087,10.622630883013006,9.301716267017536,15.374070284220029,6.179821603199058,9.20747377714466,16.28439501674208,13.8688508463907,0.9457146626609481,16.52517607960984,2.0018372080947477,2.3508704029536975,17.686959762123045,6.9615251052070315,1.3072052153504599,1.6960519548703568,8.060702850030129,19.18557407512231,17.896059209089298,9.423237066660054,14.792680970112277,6.29742502964767,18.9754581459035,4.392735579304192,18.63607650639195,6.212129426304305,10.57646838332655,4.029025338745642,10.510328262658533,15.775196509262397,14.467439284199767,9.585003333443932,19.68531132550913,2.323115668648237,2.6222535153544557,4.139869585857183,5.015969012105277,12.031198653664532,15.121114514323093,3.710831890133055,8.42162493840782,10.077372287446869,9.260650949810358,3.9020978734347977,9.109116054021499,0.557264926199994,8.719014556537843,14.671742298471923,13.572568760175464,5.007414463453603,9.896551905334983,9.776370474473325,17.410229798312493,5.345539074093972,9.407453609758996,18.948302251550192,11.550098008068561,3.0536157642672945,13.678202743583245,2.2275905061941526,13.889853217015906,1.0813301938997055,5.226879611711017,15.955738602339945,12.252408481603085,8.894177592899597,0.5143627837906317,18.02661297593417,8.304361550715296,15.886446558507906,12.932929488512347,0.43143519448465284,14.405121090581666,6.194236953765637,10.493551310750512,5.281280863134139,1.7006540611196197,7.728407509789674,3.6582894196452553,6.108372013280436,18.61227630625593,11.332302454057599,10.184480043741635,6.683308069535716,8.256042305167202,3.0421711168205867,8.712878279068912,19.355279766428634,1.399258602784177,16.026227044857016,7.324315723600434,10.00000121400252,16.81451746525543,6.176808123215971,8.659880361745124,17.672475790562146,5.433759241085929,9.173487617583955,19.518250563768845,19.842077689230237,8.123066720809206,5.10957927367115,19.593433396393735,19.31919932477531,8.56095640527856,1.6937186972970997,8.604347156951913,15.627803590827005,12.130980746057482,16.757678287181335,10.00587362758958,12.697284365216266,0.7268423641746447,2.252786235204516,6.263767328795011,18.58039471896106,1.7145910650785545,13.632718585661765,18.927554018392634,19.70467361123989,8.326377070726018,13.304955892373297,14.023066793504384,4.240058943282512,9.192493199884826,18.018991508741898,9.108937240803932,16.664933798845418,14.01110339404346,14.713606308792055,16.14765571357186,1.308980943600595,10.309801069680438,8.887743603864497,17.483415172426927,1.05811084139114,15.535571299392084,19.294477835278062,8.06895442517737,1.3799836430974377,15.532862260304423,12.51763869379317,13.278253326659076,15.003647771971993,19.62306811399258,16.5934603682364,2.969445791206393,0.9085093308080427,13.584684330304114,3.297930425987996,2.403300174254537,14.319957705716234,11.028137095281828,10.004134853616446,1.120202726066668,5.817874584002989,2.7082718179227827,1.3774324179855535,8.965216050816757,10.956346104884677,16.11591235732403,14.73298857514406,16.164447221331017,9.189417776579791,6.587576689311847,12.16701941161228,11.315782945200702,13.028920342816006,8.424320992736725,14.557005223600537,18.27166141780364,15.927482422682786,8.607403523073502,19.184433048444184,14.17005532930478,17.01123253834544,16.142976761802363,18.691932584926448,6.867083455995631,16.6866604459336,19.233830992211,13.521347788383466,4.62022277168423,3.626281646672611,16.01171976388505,16.695817713661953,0.12310212754701677,15.617294908923558,0.9417315999651787,10.999612727433718,13.02941863107764,3.840318400993956,13.13974574836255,19.573093476846243,17.495360293193354,4.674887358188058,1.6405807353957425,12.212886667800532,10.618579294509583,4.51921492607918,8.560486617705356,17.865671353992454,16.48835859470796,7.403441538934921,16.939613794073058,14.473527037530097,15.126489225886717,1.4103473541061717,16.759344197371835,15.316498322120564,18.32431912755043,19.516100117402793,10.767606144213456,18.013772449202314,19.87444600586766,18.91760720745333,5.251191598668008,13.00206978653311,15.733480849646938,1.8834828601426024,7.969806720969164,14.35551644129375,19.25033276082454,4.892316083655612,16.93112186907247,14.878978017106261,16.55103989641553,19.02158043318481,15.821723352751924,1.877967683878179,18.59465933975905,1.2425653709303708,0.1022748038412491,2.6331694819701124,4.438991644739181,18.56326333568876,4.096209914852462,7.711548008084526,8.853982661829845,16.332030510943078,19.657739481386635,11.787889386434781,1.1215548213145032,12.163489398887801,0.7692086057984593,9.339018843239053,16.205825463479563,14.65353630057615,1.6075834608896056,3.0533919344539395,4.539644370391764,9.67889345497175,5.8461906556349374,6.613564798508986,2.9506026717598344,1.2854801415378692,15.608030401509234,7.0979232554081095,11.263096152485051,12.700323761776474,3.1897907548721305,7.501505894154046,4.717159448542589,9.422549809140914,13.799063868249256,8.633070916169885,16.71990564762438,14.533737652158504,16.685419156012095,8.058058723586328,17.754876046637598,6.6320130434255065,13.235566578764812,1.276047637951927,16.452475230251785,9.926211175176242,11.619432232197383,14.255229970946734,19.632498047253513,14.855792937099537,17.556945322322495,4.0077666411952695,0.16677345581193492,2.48205902818059,17.982955935706645,2.2253250589638274,11.596129957558738,1.300474394605593,8.943951382372205,13.901711268563567,4.382474327100394,14.159795399224189,14.44535099127532,11.666365170770545,17.567440273651542,2.362782950418083,14.923919310205047,0.9005491278507494,10.631062722224005,7.9021712298796,7.7192896482574325,12.725932283792808,2.1715589068837193,18.66496674589086,9.484986241948533,10.191678265804477,9.885746181213237,19.430437797802096,14.337774629429155,9.487666431545744,17.5966730351543,6.781725224546631,19.794157260131765,7.094077379669441,8.484291112746511,10.77959633294228,8.890649732367955,6.721096628605281,0.9542017539247416,18.059180269787195,8.704347659519783,11.906989889068136,6.867593647412393,13.044956267513989,17.547888090544394,3.4641730100346058,2.9780458812505595,0.3956652217630774,18.23475494347295,6.5934837705449345,19.84267479279813,7.12696693526663,18.720619809735656,19.174078083964368,9.101162661327011,12.306494128037802,6.833630689910355,1.6507322328413832,5.605252826085136,6.796795258635084,3.847933574158482,17.162652801777327,17.626928641747213,16.31638224036001,12.693294022249745,9.236572916022991,16.23828081369198,19.058847141494397,17.00220066308372,6.806724253368341,9.01990587616103,10.418784349967218,14.51289449570988,2.3522416468614615,1.4799155921220075,4.8908067647302955,3.7662084674309115,3.816913342619328,19.61607228774627,9.487004885632322,10.497404511046579,13.586068225714536,5.953009773079585,11.159540423907238,3.7784096235621734,18.512849231277922,16.564174867445423,12.668538045365668,19.589749768059797,9.252698863434418,5.807855239344315,1.1689941597481202,6.0427414467416,18.8474334883025,0.9096779452022652,4.849103176654239,6.254434984362112,12.701236925103858,9.64979362088985,6.572350267660232,2.8091854648791514,16.462563621833098,17.36358809458125,11.663398931487258,1.6302101520641799,16.95370508123524,6.259376039235978,15.19544265953122,3.5370089445364483,10.444553602357054,9.37624156265898,17.875265051628695,16.32357284201909,19.46507997696819,4.828675214235694,3.7378237652165813,17.079298246089852,6.230133381972389,3.7401331807316573,19.12156168234196,15.297510137873234,6.805323274897743,12.46368081216005,2.4493697814739646,4.044055673075055,5.577745925058828,7.000553035057608,3.558887642318207,18.706794336545784,4.979741760491345,14.67042894359067,2.5980488787992373,11.731397133839053,15.057295588497382,18.256679252793422,18.704709359428673,5.918396360931832,18.502942639218205,18.972665918179132,17.95640144260861,13.603665803261213,14.603244999953118,13.78680877572994,12.882108687715546,0.471149251063232,12.21440128699447,1.7566598936631372,16.958263565718656,4.485052214905538,16.5714145163432,16.159999754818507,4.343687103863778,5.771811121604258,13.161770417528299,10.414784403679874,1.3991109930242462,17.119506818208965,9.057290751501288,6.434179932504773,0.3616531141203172,7.841299629761771,11.77419080585183,7.149524382875296,7.542150350322125,18.976184370534472,1.3260367119794347,19.095488289304274,15.539208100754895,3.7325122647397846,0.9346407461867701,1.0241918340512335,8.734411310678457,5.58561274677424,10.588868190748348,15.815788879453656,13.1864140844685,10.287347645191742,6.310159290446973,14.949149400492828,17.675208041904252,8.858619627822367,0.22573425320647544,5.568252310281765,16.855525951712256,7.095982798194069,17.83563734287189,3.2897441124920546,10.239910211028906,19.008225429499156,16.490803105615527,4.581940982172963]}
},{}],16:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var cdf = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


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

tape( 'if provided `+infinity` for `x` and a valid `a` and `b`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.5, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `a` and `b`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, -1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 3.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -0.5, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given a small range `b - a`', function test( t ) {
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
		y = cdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given a medium range `b - a`', function test( t ) {
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
		y = cdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given a large range `b - a`', function test( t ) {
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
		y = cdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/cdf/test/test.cdf.js")
},{"./../lib":12,"./fixtures/julia/large_range.json":13,"./fixtures/julia/medium_range.json":14,"./fixtures/julia/small_range.json":15,"@stdlib/constants/float64/eps":1,"@stdlib/constants/float64/ninf":2,"@stdlib/constants/float64/pinf":3,"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/special/abs":6,"tape":146}],17:[function(require,module,exports){
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
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
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

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a `a >= b`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 2.0, 1.0 );

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

	cdf = factory( -1.0, -2.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var cdf;
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
		cdf = factory( a[i], b[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var cdf;
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
		cdf = factory( a[i], b[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var cdf;
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
		cdf = factory( a[i], b[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/cdf/test/test.factory.js")
},{"./../lib/factory.js":11,"./fixtures/julia/large_range.json":13,"./fixtures/julia/medium_range.json":14,"./fixtures/julia/small_range.json":15,"@stdlib/constants/float64/eps":1,"@stdlib/constants/float64/ninf":2,"@stdlib/constants/float64/pinf":3,"@stdlib/math/base/assert/is-nan":4,"@stdlib/math/base/special/abs":6,"tape":146}],18:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/cdf/test/test.js")
},{"./../lib":12,"tape":146}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( './is_number.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var abs = Math.abs; // eslint-disable-line stdlib/no-builtin-math
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;
var replace = String.prototype.replace;


// VARIABLES //

var RE_EXP_POS_DIGITS = /e\+(\d)$/;
var RE_EXP_NEG_DIGITS = /e-(\d)$/;
var RE_ONLY_DIGITS = /^(\d+)$/;
var RE_DIGITS_BEFORE_EXP = /^(\d+)e/;
var RE_TRAILING_PERIOD_ZERO = /\.0$/;
var RE_PERIOD_ZERO_EXP = /\.0*e/;
var RE_ZERO_BEFORE_EXP = /(\..*[^0])0*e/;


// MAIN //

/**
* Formats a token object argument as a floating-point number.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid floating-point number
* @returns {string} formatted token argument
*/
function formatDouble( token ) {
	var digits;
	var out;
	var f = parseFloat( token.arg );
	if ( !isFinite( f ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( token.arg ) ) {
			throw new Error( 'invalid floating-point number. Value: ' + out );
		}
		// Case: NaN, Infinity, or -Infinity
		f = token.arg;
	}
	switch ( token.specifier ) {
	case 'e':
	case 'E':
		out = f.toExponential( token.precision );
		break;
	case 'f':
	case 'F':
		out = f.toFixed( token.precision );
		break;
	case 'g':
	case 'G':
		if ( abs( f ) < 0.0001 ) {
			digits = token.precision;
			if ( digits > 0 ) {
				digits -= 1;
			}
			out = f.toExponential( digits );
		} else {
			out = f.toPrecision( token.precision );
		}
		if ( !token.alternate ) {
			out = replace.call( out, RE_ZERO_BEFORE_EXP, '$1e' );
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e');
			out = replace.call( out, RE_TRAILING_PERIOD_ZERO, '' );
		}
		break;
	default:
		throw new Error( 'invalid double notation. Value: ' + token.specifier );
	}
	out = replace.call( out, RE_EXP_POS_DIGITS, 'e+0$1' );
	out = replace.call( out, RE_EXP_NEG_DIGITS, 'e-0$1' );
	if ( token.alternate ) {
		out = replace.call( out, RE_ONLY_DIGITS, '$1.' );
		out = replace.call( out, RE_DIGITS_BEFORE_EXP, '$1.e' );
	}
	if ( f >= 0 && token.sign ) {
		out = token.sign + out;
	}
	out = ( token.specifier === uppercase.call( token.specifier ) ) ?
		uppercase.call( out ) :
		lowercase.call( out );
	return out;
}


// EXPORTS //

module.exports = formatDouble;

},{"./is_number.js":22}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNumber = require( './is_number.js' );
var zeroPad = require( './zero_pad.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;


// MAIN //

/**
* Formats a token object argument as an integer.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid integer
* @returns {string} formatted token argument
*/
function formatInteger( token ) {
	var base;
	var out;
	var i;

	switch ( token.specifier ) {
	case 'b':
		// Case: %b (binary)
		base = 2;
		break;
	case 'o':
		// Case: %o (octal)
		base = 8;
		break;
	case 'x':
	case 'X':
		// Case: %x, %X (hexadecimal)
		base = 16;
		break;
	case 'd':
	case 'i':
	case 'u':
	default:
		// Case: %d, %i, %u (decimal)
		base = 10;
		break;
	}
	out = token.arg;
	i = parseInt( out, 10 );
	if ( !isFinite( i ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( out ) ) {
			throw new Error( 'invalid integer. Value: ' + out );
		}
		i = 0;
	}
	if ( i < 0 && ( token.specifier === 'u' || base !== 10 ) ) {
		i = 0xffffffff + i + 1;
	}
	if ( i < 0 ) {
		out = ( -i ).toString( base );
		if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		out = '-' + out;
	} else {
		out = i.toString( base );
		if ( !i && !token.precision ) {
			out = '';
		} else if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		if ( token.sign ) {
			out = token.sign + out;
		}
	}
	if ( base === 16 ) {
		if ( token.alternate ) {
			out = '0x' + out;
		}
		out = ( token.specifier === uppercase.call( token.specifier ) ) ?
			uppercase.call( out ) :
			lowercase.call( out );
	}
	if ( base === 8 ) {
		if ( token.alternate && out.charAt( 0 ) !== '0' ) {
			out = '0' + out;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInteger;

},{"./is_number.js":22,"./zero_pad.js":26}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Generate string from a token array by interpolating values.
*
* @module @stdlib/string/base/format-interpolate
*
* @example
* var formatInterpolate = require( '@stdlib/string/base/format-interpolate' );
*
* var tokens = ['Hello ', { 'specifier': 's' }, '!' ];
* var out = formatInterpolate( tokens, 'World' );
* // returns 'Hello World!'
*/

// MODULES //

var formatInterpolate = require( './main.js' );


// EXPORTS //

module.exports = formatInterpolate;

},{"./main.js":24}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
	return ( typeof value === 'number' );  // NOTE: we inline the `isNumber.isPrimitive` function from `@stdlib/assert/is-number` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isNumber;

},{}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' ); // NOTE: we inline the `isString.isPrimitive` function from `@stdlib/assert/is-string` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isString;

},{}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var formatInteger = require( './format_integer.js' );
var isString = require( './is_string.js' );
var formatDouble = require( './format_double.js' );
var spacePad = require( './space_pad.js' );
var zeroPad = require( './zero_pad.js' );


// VARIABLES //

var fromCharCode = String.fromCharCode;
var isnan = isNaN; // NOTE: We use the global `isNaN` function here instead of `@stdlib/math/base/assert/is-nan` to avoid circular dependencies.
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

/**
* Initializes token object with properties of supplied format identifier object or default values if not present.
*
* @private
* @param {Object} token - format identifier object
* @returns {Object} token object
*/
function initialize( token ) {
	var out = {};
	out.specifier = token.specifier;
	out.precision = ( token.precision === void 0 ) ? 1 : token.precision;
	out.width = token.width;
	out.flags = token.flags || '';
	out.mapping = token.mapping;
	return out;
}


// MAIN //

/**
* Generates string from a token array by interpolating values.
*
* @param {Array} tokens - string parts and format identifier objects
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be an array
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var tokens = [ 'beep ', { 'specifier': 's' } ];
* var out = formatInterpolate( tokens, 'boop' );
* // returns 'beep boop'
*/
function formatInterpolate( tokens ) {
	var hasPeriod;
	var flags;
	var token;
	var flag;
	var num;
	var out;
	var pos;
	var i;
	var j;

	if ( !isArray( tokens ) ) {
		throw new TypeError( 'invalid argument. First argument must be an array. Value: `' + tokens + '`.' );
	}
	out = '';
	pos = 1;
	for ( i = 0; i < tokens.length; i++ ) {
		token = tokens[ i ];
		if ( isString( token ) ) {
			out += token;
		} else {
			hasPeriod = token.precision !== void 0;
			token = initialize( token );
			if ( !token.specifier ) {
				throw new TypeError( 'invalid argument. Token is missing `specifier` property. Index: `'+ i +'`. Value: `' + token + '`.' );
			}
			if ( token.mapping ) {
				pos = token.mapping;
			}
			flags = token.flags;
			for ( j = 0; j < flags.length; j++ ) {
				flag = flags.charAt( j );
				switch ( flag ) {
				case ' ':
					token.sign = ' ';
					break;
				case '+':
					token.sign = '+';
					break;
				case '-':
					token.padRight = true;
					token.padZeros = false;
					break;
				case '0':
					token.padZeros = flags.indexOf( '-' ) < 0; // NOTE: We use built-in `Array.prototype.indexOf` here instead of `@stdlib/assert/contains` in order to avoid circular dependencies.
					break;
				case '#':
					token.alternate = true;
					break;
				default:
					throw new Error( 'invalid flag: ' + flag );
				}
			}
			if ( token.width === '*' ) {
				token.width = parseInt( arguments[ pos ], 10 );
				pos += 1;
				if ( isnan( token.width ) ) {
					throw new TypeError( 'the argument for * width at position ' + pos + ' is not a number. Value: `' + token.width + '`.' );
				}
				if ( token.width < 0 ) {
					token.padRight = true;
					token.width = -token.width;
				}
			}
			if ( hasPeriod ) {
				if ( token.precision === '*' ) {
					token.precision = parseInt( arguments[ pos ], 10 );
					pos += 1;
					if ( isnan( token.precision ) ) {
						throw new TypeError( 'the argument for * precision at position ' + pos + ' is not a number. Value: `' + token.precision + '`.' );
					}
					if ( token.precision < 0 ) {
						token.precision = 1;
						hasPeriod = false;
					}
				}
			}
			token.arg = arguments[ pos ];
			switch ( token.specifier ) {
			case 'b':
			case 'o':
			case 'x':
			case 'X':
			case 'd':
			case 'i':
			case 'u':
				// Case: %b (binary), %o (octal), %x, %X (hexadecimal), %d, %i (decimal), %u (unsigned decimal)
				if ( hasPeriod ) {
					token.padZeros = false;
				}
				token.arg = formatInteger( token );
				break;
			case 's':
				// Case: %s (string)
				token.maxWidth = ( hasPeriod ) ? token.precision : -1;
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ?
						String( token.arg ) :
						fromCharCode( num );
				}
				break;
			case 'e':
			case 'E':
			case 'f':
			case 'F':
			case 'g':
			case 'G':
				// Case: %e, %E (scientific notation), %f, %F (decimal floating point), %g, %G (uses the shorter of %e/E or %f/F)
				if ( !hasPeriod ) {
					token.precision = 6;
				}
				token.arg = formatDouble( token );
				break;
			default:
				throw new Error( 'invalid specifier: ' + token.specifier );
			}
			// Fit argument into field width...
			if ( token.maxWidth >= 0 && token.arg.length > token.maxWidth ) {
				token.arg = token.arg.substring( 0, token.maxWidth );
			}
			if ( token.padZeros ) {
				token.arg = zeroPad( token.arg, token.width || token.precision, token.padRight ); // eslint-disable-line max-len
			} else if ( token.width ) {
				token.arg = spacePad( token.arg, token.width, token.padRight );
			}
			out += token.arg || '';
			pos += 1;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInterpolate;

},{"./format_double.js":19,"./format_integer.js":20,"./is_string.js":23,"./space_pad.js":25,"./zero_pad.js":26}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

/**
* Returns `n` spaces.
*
* @private
* @param {number} n - number of spaces
* @returns {string} string of spaces
*/
function spaces( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += ' ';
	}
	return out;
}


// MAIN //

/**
* Pads a token with spaces to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function spacePad( str, width, right ) {
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	str = ( right ) ?
		str + spaces( pad ) :
		spaces( pad ) + str;
	return str;
}


// EXPORTS //

module.exports = spacePad;

},{}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

/**
* Tests if a string starts with a minus sign (`-`).
*
* @private
* @param {string} str - input string
* @returns {boolean} boolean indicating if a string starts with a minus sign (`-`)
*/
function startsWithMinus( str ) {
	return str[ 0 ] === '-';
}

/**
* Returns a string of `n` zeros.
*
* @private
* @param {number} n - number of zeros
* @returns {string} string of zeros
*/
function zeros( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += '0';
	}
	return out;
}


// MAIN //

/**
* Pads a token with zeros to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function zeroPad( str, width, right ) {
	var negative = false;
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	if ( startsWithMinus( str ) ) {
		negative = true;
		str = str.substr( 1 );
	}
	str = ( right ) ?
		str + zeros( pad ) :
		zeros( pad ) + str;
	if ( negative ) {
		str = '-' + str;
	}
	return str;
}


// EXPORTS //

module.exports = zeroPad;

},{}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Tokenize a string into an array of string parts and format identifier objects.
*
* @module @stdlib/string/base/format-tokenize
*
* @example
* var formatTokenize = require( '@stdlib/string/base/format-tokenize' );
*
* var str = 'Hello %s!';
* var tokens = formatTokenize( str );
* // returns [ 'Hello ', {...}, '!' ]
*/

// MODULES //

var formatTokenize = require( './main.js' );


// EXPORTS //

module.exports = formatTokenize;

},{"./main.js":28}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var RE = /%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;


// FUNCTIONS //

/**
* Parses a delimiter.
*
* @private
* @param {Array} match - regular expression match
* @returns {Object} delimiter token object
*/
function parse( match ) {
	var token = {
		'mapping': ( match[ 1 ] ) ? parseInt( match[ 1 ], 10 ) : void 0,
		'flags': match[ 2 ],
		'width': match[ 3 ],
		'precision': match[ 5 ],
		'specifier': match[ 6 ]
	};
	if ( match[ 4 ] === '.' && match[ 5 ] === void 0 ) {
		token.precision = '1';
	}
	return token;
}


// MAIN //

/**
* Tokenizes a string into an array of string parts and format identifier objects.
*
* @param {string} str - input string
* @returns {Array} tokens
*
* @example
* var tokens = formatTokenize( 'Hello %s!' );
* // returns [ 'Hello ', {...}, '!' ]
*/
function formatTokenize( str ) {
	var content;
	var tokens;
	var match;
	var prev;

	tokens = [];
	prev = 0;
	match = RE.exec( str );
	while ( match ) {
		content = str.slice( prev, RE.lastIndex - match[ 0 ].length );
		if ( content.length ) {
			tokens.push( content );
		}
		tokens.push( parse( match ) );
		prev = RE.lastIndex;
		match = RE.exec( str );
	}
	content = str.slice( prev );
	if ( content.length ) {
		tokens.push( content );
	}
	return tokens;
}


// EXPORTS //

module.exports = formatTokenize;

},{}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Insert supplied variable values into a format string.
*
* @module @stdlib/string/format
*
* @example
* var format = require( '@stdlib/string/format' );
*
* var out = format( '%s %s!', 'Hello', 'World' );
* // returns 'Hello World!'
*
* out = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/

// MODULES //

var format = require( './main.js' );


// EXPORTS //

module.exports = format;

},{"./main.js":31}],30:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var interpolate = require( '@stdlib/string/base/format-interpolate' );
var tokenize = require( '@stdlib/string/base/format-tokenize' );
var isString = require( './is_string.js' );


// MAIN //

/**
* Inserts supplied variable values into a format string.
*
* @param {string} str - input string
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be a string
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var str = format( 'Hello %s!', 'world' );
* // returns 'Hello world!'
*
* @example
* var str = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/
function format( str ) {
	var tokens;
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	tokens = tokenize( str );
	args = new Array( arguments.length );
	args[ 0 ] = tokens;
	for ( i = 1; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":30,"@stdlib/string/base/format-interpolate":21,"@stdlib/string/base/format-tokenize":27}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./constant_function.js":32}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":35}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":39}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"./define_property.js":37}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":36,"./has_define_property_support.js":38,"./polyfill.js":40}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

var format = require( '@stdlib/string/format' );


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
		throw new TypeError( format( 'invalid argument. First argument must be an object. Value: `%s`.', obj ) );
	}
	if ( typeof descriptor !== 'object' || descriptor === null || toStr.call( descriptor ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. Property descriptor must be an object. Value: `%s`.', descriptor ) );
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

},{"@stdlib/string/format":29}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){

},{}],43:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],44:[function(require,module,exports){
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
},{"base64-js":41,"buffer":44,"ieee754":132}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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
},{"_process":138}],47:[function(require,module,exports){
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

},{"events":45,"inherits":133,"readable-stream/lib/_stream_duplex.js":49,"readable-stream/lib/_stream_passthrough.js":50,"readable-stream/lib/_stream_readable.js":51,"readable-stream/lib/_stream_transform.js":52,"readable-stream/lib/_stream_writable.js":53,"readable-stream/lib/internal/streams/end-of-stream.js":57,"readable-stream/lib/internal/streams/pipeline.js":59}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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
},{"./_stream_readable":51,"./_stream_writable":53,"_process":138,"inherits":133}],50:[function(require,module,exports){
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
},{"./_stream_transform":52,"inherits":133}],51:[function(require,module,exports){
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
},{"../errors":48,"./_stream_duplex":49,"./internal/streams/async_iterator":54,"./internal/streams/buffer_list":55,"./internal/streams/destroy":56,"./internal/streams/from":58,"./internal/streams/state":60,"./internal/streams/stream":61,"_process":138,"buffer":44,"events":45,"inherits":133,"string_decoder/":145,"util":42}],52:[function(require,module,exports){
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
},{"../errors":48,"./_stream_duplex":49,"inherits":133}],53:[function(require,module,exports){
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
},{"../errors":48,"./_stream_duplex":49,"./internal/streams/destroy":56,"./internal/streams/state":60,"./internal/streams/stream":61,"_process":138,"buffer":44,"inherits":133,"util-deprecate":154}],54:[function(require,module,exports){
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
},{"./end-of-stream":57,"_process":138}],55:[function(require,module,exports){
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
},{"buffer":44,"util":42}],56:[function(require,module,exports){
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
},{"_process":138}],57:[function(require,module,exports){
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
},{"../../../errors":48}],58:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],59:[function(require,module,exports){
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
},{"../../../errors":48,"./end-of-stream":57}],60:[function(require,module,exports){
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
},{"../../../errors":48}],61:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":45}],62:[function(require,module,exports){
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

},{"./":63,"get-intrinsic":127}],63:[function(require,module,exports){
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

},{"function-bind":126,"get-intrinsic":127}],64:[function(require,module,exports){
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

},{"./lib/is_arguments.js":65,"./lib/keys.js":66}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],67:[function(require,module,exports){
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

},{"has-property-descriptors":128,"object-keys":136}],68:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],69:[function(require,module,exports){
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

},{"./ToNumber":99,"./ToPrimitive":101,"./Type":106}],70:[function(require,module,exports){
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

},{"../helpers/isFinite":115,"../helpers/isNaN":117,"../helpers/isPrefixOf":118,"./ToNumber":99,"./ToPrimitive":101,"./Type":106,"get-intrinsic":127}],71:[function(require,module,exports){
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

},{"get-intrinsic":127}],72:[function(require,module,exports){
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

},{"./DayWithinYear":75,"./InLeapYear":79,"./MonthFromTime":89,"get-intrinsic":127}],73:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":122,"./floor":110}],74:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":110}],75:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":73,"./DayFromYear":74,"./YearFromTime":108}],76:[function(require,module,exports){
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

},{"./modulo":111}],77:[function(require,module,exports){
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

},{"../helpers/assertRecord":114,"./IsAccessorDescriptor":80,"./IsDataDescriptor":82,"./Type":106,"get-intrinsic":127}],78:[function(require,module,exports){
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

},{"../helpers/timeConstants":122,"./floor":110,"./modulo":111}],79:[function(require,module,exports){
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

},{"./DaysInYear":76,"./YearFromTime":108,"get-intrinsic":127}],80:[function(require,module,exports){
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

},{"../helpers/assertRecord":114,"./Type":106,"has":131}],81:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":134}],82:[function(require,module,exports){
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

},{"../helpers/assertRecord":114,"./Type":106,"has":131}],83:[function(require,module,exports){
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

},{"../helpers/assertRecord":114,"./IsAccessorDescriptor":80,"./IsDataDescriptor":82,"./Type":106}],84:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":119,"./IsAccessorDescriptor":80,"./IsDataDescriptor":82,"./Type":106}],85:[function(require,module,exports){
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

},{"../helpers/isFinite":115,"../helpers/timeConstants":122}],86:[function(require,module,exports){
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

},{"../helpers/isFinite":115,"./DateFromTime":72,"./Day":73,"./MonthFromTime":89,"./ToInteger":98,"./YearFromTime":108,"./floor":110,"./modulo":111,"get-intrinsic":127}],87:[function(require,module,exports){
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

},{"../helpers/isFinite":115,"../helpers/timeConstants":122,"./ToInteger":98}],88:[function(require,module,exports){
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

},{"../helpers/timeConstants":122,"./floor":110,"./modulo":111}],89:[function(require,module,exports){
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

},{"./DayWithinYear":75,"./InLeapYear":79}],90:[function(require,module,exports){
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

},{"../helpers/isNaN":117}],91:[function(require,module,exports){
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

},{"../helpers/timeConstants":122,"./floor":110,"./modulo":111}],92:[function(require,module,exports){
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

},{"./Type":106}],93:[function(require,module,exports){
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


},{"../helpers/isFinite":115,"./ToNumber":99,"./abs":109,"get-intrinsic":127}],94:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":122,"./DayFromYear":74}],95:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":122,"./modulo":111}],96:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],97:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":99}],98:[function(require,module,exports){
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

},{"../helpers/isFinite":115,"../helpers/isNaN":117,"../helpers/sign":121,"./ToNumber":99,"./abs":109,"./floor":110}],99:[function(require,module,exports){
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

},{"./ToPrimitive":101}],100:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":71,"get-intrinsic":127}],101:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":123}],102:[function(require,module,exports){
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

},{"./IsCallable":81,"./ToBoolean":96,"./Type":106,"get-intrinsic":127,"has":131}],103:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":127}],104:[function(require,module,exports){
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

},{"../helpers/isFinite":115,"../helpers/isNaN":117,"../helpers/sign":121,"./ToNumber":99,"./abs":109,"./floor":110,"./modulo":111}],105:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":99}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":73,"./modulo":111}],108:[function(require,module,exports){
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

},{"call-bind/callBound":62,"get-intrinsic":127}],109:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":127}],110:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],111:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":120}],112:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":122,"./modulo":111}],113:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":69,"./5/AbstractRelationalComparison":70,"./5/CheckObjectCoercible":71,"./5/DateFromTime":72,"./5/Day":73,"./5/DayFromYear":74,"./5/DayWithinYear":75,"./5/DaysInYear":76,"./5/FromPropertyDescriptor":77,"./5/HourFromTime":78,"./5/InLeapYear":79,"./5/IsAccessorDescriptor":80,"./5/IsCallable":81,"./5/IsDataDescriptor":82,"./5/IsGenericDescriptor":83,"./5/IsPropertyDescriptor":84,"./5/MakeDate":85,"./5/MakeDay":86,"./5/MakeTime":87,"./5/MinFromTime":88,"./5/MonthFromTime":89,"./5/SameValue":90,"./5/SecFromTime":91,"./5/StrictEqualityComparison":92,"./5/TimeClip":93,"./5/TimeFromYear":94,"./5/TimeWithinDay":95,"./5/ToBoolean":96,"./5/ToInt32":97,"./5/ToInteger":98,"./5/ToNumber":99,"./5/ToObject":100,"./5/ToPrimitive":101,"./5/ToPropertyDescriptor":102,"./5/ToString":103,"./5/ToUint16":104,"./5/ToUint32":105,"./5/Type":106,"./5/WeekDay":107,"./5/YearFromTime":108,"./5/abs":109,"./5/floor":110,"./5/modulo":111,"./5/msFromTime":112}],114:[function(require,module,exports){
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

},{"./isMatchRecord":116,"get-intrinsic":127,"has":131}],115:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],116:[function(require,module,exports){
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

},{"has":131}],117:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],118:[function(require,module,exports){
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

},{"call-bind/callBound":62}],119:[function(require,module,exports){
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

},{"get-intrinsic":127,"has":131}],120:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],121:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{"./helpers/isPrimitive":124,"is-callable":134}],124:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":125}],127:[function(require,module,exports){
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

},{"function-bind":126,"has":131,"has-symbols":129}],128:[function(require,module,exports){
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

},{"get-intrinsic":127}],129:[function(require,module,exports){
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

},{"./shams":130}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":126}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{"./isArguments":137}],136:[function(require,module,exports){
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

},{"./implementation":135,"./isArguments":137}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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
},{"_process":138,"through":152,"timers":153}],140:[function(require,module,exports){
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

},{"buffer":44}],141:[function(require,module,exports){
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

},{"es-abstract/es5":113,"function-bind":126}],142:[function(require,module,exports){
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

},{"./implementation":141,"./polyfill":143,"./shim":144,"define-properties":67,"function-bind":126}],143:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":141}],144:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":143,"define-properties":67}],145:[function(require,module,exports){
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
},{"safe-buffer":140}],146:[function(require,module,exports){
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
},{"./lib/default_stream":147,"./lib/results":149,"./lib/test":150,"_process":138,"defined":68,"through":152,"timers":153}],147:[function(require,module,exports){
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
},{"_process":138,"fs":43,"through":152}],148:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":138,"timers":153}],149:[function(require,module,exports){
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
},{"_process":138,"events":45,"function-bind":126,"has":131,"inherits":133,"object-inspect":151,"resumer":139,"through":152,"timers":153}],150:[function(require,module,exports){
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
},{"./next_tick":148,"deep-equal":64,"defined":68,"events":45,"has":131,"inherits":133,"path":46,"string.prototype.trim":142}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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
},{"_process":138,"stream":47}],153:[function(require,module,exports){
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
},{"process/browser.js":138,"timers":153}],154:[function(require,module,exports){
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
},{}]},{},[16,17,18]);
