/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// MODULES //

import React, { Fragment } from 'react';
import config from './../../config.js';
import Banner from './banner.jsx';
import Intro from './intro.jsx';
import Features from './features.jsx';
import Installation from './installation/index.jsx';
import Prerequisites from './prerequisites.jsx';


// VARIABLES //

var CURRENT_YEAR = ( new Date() ).getFullYear();


// MAIN //

/**
* Component for rendering a welcome page.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - version
* @returns {ReactElement} React element
*/
function Welcome( props ) {
	return (
		<Fragment>
			<div id="readme" className="readme" >
				<section className="banner" >
					<Banner />
				</section>
				<section className="intro">
					<Intro />
				</section>
				<section className="features">
					<h2>Features</h2>
					<Features version={ props.version }/>
				</section>
				<section className="help">
					<h2>Getting Help</h2>
					<p>
						Ask questions and get help from the community on the project's <a href={ config.gitter }>Gitter</a> channel.
					</p>
				</section>
				<section className="installation">
					<h2>Installation</h2>
					<Installation version={ props.version }/>
				</section>
				<hr/>
				<section className="prerequisites">
					<h2>Prerequisites</h2>
					<Prerequisites />
				</section>
				<hr/>
				<section className="license_and_copyright">
					<h2>License</h2>
					<p>
						See <a href={ 'https://raw.githubusercontent.com/stdlib-js/stdlib/develop/LICENSE' }>LICENSE</a>.
					</p>
					<h2>Copyright</h2>
					<p>
						Copyright &copy; 2016-{ CURRENT_YEAR }. The Stdlib <a href={ config.repository+'/graphs/contributors' } >Authors</a>.
					</p>
				</section>
			</div>
		</Fragment>
	);
}


// EXPORTS //

export default Welcome;
