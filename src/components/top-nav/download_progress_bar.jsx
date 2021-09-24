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

import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';


// MAIN //

/**
* Component for displaying a download progress bar.
*
* @private
* @param {Object} props - component properties
* @param {Callback} props.value - progress bar value
* @returns {ReactElement} React element
*/
function DownloadProgressBar( props ) {
	return (
		<LinearProgress
			className="download-progress"
			variant="determinate"
			value={ props.value }
			role="progressbar"
			aria-valuenow={ props.value }
			aria-valuemin={ 0.0 }
			aria-valuemax={ 100.0 }
		/>
	);
}


// EXPORTS //

export default DownloadProgressBar;
