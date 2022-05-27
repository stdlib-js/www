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


// MAIN //

/**
* Component for rendering a stdlib logo icon.
*
* @private
* @param {Object} props - component properties
* @returns {ReactElement} React element
*/
function LogoIcon( props ) {
	return (
		<svg className="icon stdlib-logo-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 16 16" focusable="false" aria-hidden="true" {...props}>
			<defs>
				<linearGradient id="Gradient_1" gradientUnits="userSpaceOnUse" x1="5.444" y1="4.6" x2="8.901" y2="2.604">
					<stop offset="0" stopColor="#A4681D"/>
					<stop offset="0.31" stopColor="#E18F2F"/>
					<stop offset="1" stopColor="#F0AD3E"/>
				</linearGradient>
				<linearGradient id="Gradient_2" gradientUnits="userSpaceOnUse" x1="7.289" y1="13.773" x2="12.457" y2="10.79">
					<stop offset="0" stopColor="#F0AD3E"/>
					<stop offset="0.69" stopColor="#E18F2F"/>
					<stop offset="1" stopColor="#A4681D"/>
				</linearGradient>
				<linearGradient id="Gradient_3" gradientUnits="userSpaceOnUse" x1="3.279" y1="7.218" x2="12.639" y2="7.218">
					<stop offset="0" stopColor="#006991"/>
					<stop offset="0.25" stopColor="#008BBF"/>
					<stop offset="0.62" stopColor="#008BBF"/>
					<stop offset="1" stopColor="#00AEEF"/>
				</linearGradient>
			</defs>
			<g>
				<path d="M8.013,1.065 L5.876,2.298 C5.606,2.456 5.372,2.668 5.19,2.923 C4.929,3.287 4.929,3.777 5.19,4.141 C5.373,4.396 5.608,4.609 5.879,4.766 L7.297,5.585 C6.984,5.357 6.789,5 6.767,4.613 C6.744,4.226 6.896,3.849 7.18,3.586 C7.961,3.069 8.332,1.949 8.013,1.065 z" fill="url(#Gradient_1)"/>
				<path d="M12.106,10.514 L11.072,9.917 C11.373,10.085 11.556,10.406 11.549,10.75 C11.541,11.095 11.343,11.408 11.035,11.562 L8.822,12.84 C8.334,13.106 8.025,13.612 8.012,14.168 L8.012,15.028 L12.149,12.64 C12.516,12.407 12.735,11.999 12.726,11.565 C12.717,11.13 12.481,10.732 12.105,10.515 z" fill="url(#Gradient_2)"/>
				<path d="M4.035,11.009 C3.562,10.716 3.276,10.198 3.28,9.641 C3.285,9.084 3.579,8.57 4.057,8.285 L2.524,9.168 C2.042,9.444 1.744,9.957 1.744,10.513 C1.744,11.069 2.042,11.582 2.524,11.857 L3.879,12.638 L8.016,15.026 L8.016,14.166 C8.002,13.61 7.694,13.104 7.205,12.838 L4.993,11.56 C4.961,11.545 4.93,11.528 4.9,11.51 z" fill="#00AEEF"/>
				<path d="M9.876,7.075 L11.863,5.928 C12.345,5.653 12.643,5.14 12.643,4.584 C12.643,4.028 12.345,3.515 11.863,3.239 L11.321,2.928 C11.507,3.425 11.351,3.985 10.934,4.315 L8.016,5.999 L4.057,8.285 C3.579,8.57 3.285,9.084 3.28,9.641 C3.276,10.198 3.562,10.716 4.035,11.009 L4.9,11.51 C4.63,11.334 4.471,11.031 4.478,10.71 C4.485,10.388 4.658,10.093 4.935,9.929 z" fill="url(#Gradient_3)"/>
				<path d="M5.876,4.766 C5.606,4.609 5.372,4.397 5.19,4.142 C4.929,3.778 4.929,3.288 5.19,2.924 C5.373,2.669 5.608,2.456 5.879,2.299 L4.246,3.239 C3.768,3.524 3.473,4.038 3.468,4.595 C3.463,5.152 3.749,5.671 4.222,5.964 L12.102,10.514 C12.478,10.731 12.714,11.129 12.723,11.564 C12.732,11.998 12.513,12.406 12.146,12.639 L13.501,11.858 C13.984,11.583 14.281,11.069 14.281,10.514 C14.281,9.958 13.984,9.445 13.501,9.169 z" fill="#F0AD3E"/>
			</g>
  		</svg>
	);
}


// EXPORTS //

export default LogoIcon;
