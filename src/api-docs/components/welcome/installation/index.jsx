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

// MODULES //

import React, { Fragment } from 'react';
import Intro from './intro.jsx';
import UserStories from './user_stories.jsx';
import CompleteLibrary from './complete_library.jsx';
import IndividualPackages from './individual_packages.jsx';
import Namespaces from './namespaces.jsx';
import CommandLineUtility from './command_line_utility.jsx';
import EnvBuilds from './env_builds.jsx';
import CustomBundles from './custom_bundles.jsx';
import SystemLibrary from './system_library.jsx';


// MAIN //

/**
* Component for displaying installation information.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - version
* @returns {ReactElement} React element
*/
function Installation( props ) {
	return (
		<Fragment>
			<Intro />

			<h3 id="install_user_stories">User Stories</h3>
			<UserStories />

			<h3 id="install_complete_library">Complete Library</h3>
			<CompleteLibrary />

			<h3 id="install_individual_packages">Individual Packages</h3>
			<IndividualPackages />

			<h3 id="install_namespaces">Namespaces</h3>
			<Namespaces />

			<h3 id="install_command_line_utility">Command-line Utility</h3>
			<CommandLineUtility version={ props.version }/>

			<h3 id="install_env_builds">Environment Builds</h3>
			<EnvBuilds version={ props.version }/>

			<h3 id="install_custom_bundles">Custom Bundles</h3>
			<CustomBundles />

			<h3 id="install_system_library">System Library</h3>
			<SystemLibrary />
		</Fragment>
	);
}


// EXPORTS //

export default Installation;
