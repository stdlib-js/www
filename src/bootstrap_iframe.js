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

// VARIABLES //

const IFRAME_RESIZER_CONTENT_SCRIPT_PATH = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.1/iframeResizer.contentWindow.min.js';


// MAIN //

/**
* Returns a boilerplate HTML page for bootstrapping an iframe.
*
* @private
* @param {string} resource - URL of resource to fetch
* @returns {string} boilerplate HTML page
*/
function bootstrap( resource ) {
	return `<html>
<body>
<script type="text/javascript">
document.addEventListener( 'DOMContentLoaded', () => {
	var html = fetch( '${ resource }' );
	html
		.then( response => response.text() )
		.then( text => {
			var script = document.createElement( 'script' );
			script.src = '${ IFRAME_RESIZER_CONTENT_SCRIPT_PATH }';
			document.open();
			document.write( text );
			document.head.appendChild( script );
			document.close();
		});
});
</script>
</body>
</html>`;
}


// EXPORTS //

export default bootstrap;
