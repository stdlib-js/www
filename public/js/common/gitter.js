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

/**
* Sets the global `gitter` object with the specified `options` for sidecar Gitter chat window.
*
* @see {@link https://sidecar.gitter.im/}
*/
(function script() {
	window.gitter = {
		'chat': {
			'options': {
				// 'room': 'stdlib-js/stdlib',
				// 'activationElement': false,
				'disableDefaultChat': true
			}
		}
	};
})();
