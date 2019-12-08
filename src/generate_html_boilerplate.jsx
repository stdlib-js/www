// MAIN //

/**
* Generates a boilerplate HTML page which fetches a specified resource and overwrites its contents.
*
* @private
* @param {string} resourcePath - URL of resource to fetch
* @returns {string} boilerplate HTML page
*/
const generateHTMLBoilerplate = ( resourcePath ) => `<html>
<body>
<script type="text/javascript">
document.addEventListener( 'DOMContentLoaded', () => {
	var html = fetch( '${resourcePath}' );
	html
		.then( response => response.text() )
		.then( text => {
			var script = document.createElement( "script" );
			script.src = "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.1/iframeResizer.contentWindow.min.js";
			document.open();
			document.write( text );
			document.head.appendChild( script );
			document.close();
		});
});
</script>
</body>
</html>`;


// EXPORTS //

export default generateHTMLBoilerplate;
