#!/usr/bin/env node
'use strict';

// MODULES //

var fs = require( 'fs' );
var path = require( 'path' );
var CleanCSS = require( 'clean-css' );


// VARIABLES //

var dirpath = path.resolve( __dirname, '..', '..', 'public', 'css' );
var dirs = [
	path.join( dirpath, '404' ),
	path.join( dirpath, 'main' )
];
var copts = {
	'returnPromise': false,
	'compatibility': 'ie9',
	'level': 1
};


// FUNCTIONS //

/**
* Synchronously reads a list of CSS files.
*
* @private
* @param {Array<string>} list - list of files
* @returns {Array<string>} array of file contents
*/
function readFiles( list ) {
	var opts;
	var out;
	var i;

	opts = {
		'encoding': 'utf8'
	};
	out = new Array( list.length );
	for ( i = 0; i < list.length; i++ ) {
		out[ i ] = fs.readFileSync( list[ i ], opts );
	}
	return out;
} // end FUNCTION readFiles()


// MAIN //

/**
* Main execution sequence.
*
* @private
*/
function main() {
	var minifier;
	var fpath;
	var fopts;
	var tmp;
	var i;
	var j;

	minifier = new CleanCSS( copts );
	fopts = {
		'encoding': 'utf8'
	};

	// Process each CSS directory...
	for ( i = 0; i < dirs.length; i++ ) {
		// Read the bundle list:
		tmp = require( path.join( dirs[ i ], 'bundle.json' ) );

		// Resolve each file in the list to an absolute path:
		for ( j = 0; j < tmp.length; j++ ) {
			tmp[ j ] = path.resolve( dirs[ i ], tmp[ j ] );
		}
		// Read each CSS file:
		tmp = readFiles( tmp );

		// Concatenate file contents into a single string:
		tmp = tmp.join( '\n' );

		// Minify the CSS:
		tmp = minifier.minify( tmp );
		if ( tmp.errors.length ) {
			console.error( 'Directory: %s\n', dirs[ i ] );
			console.error( 'Errors:\n' );
			console.error( tmp.errors.join( '\n' ) );
		}
		if ( tmp.warnings.length ) {
			console.error( 'Directory: %s\n', dirs[ i ] );
			console.error( 'Warnings:\n' );
			console.error( tmp.warnings.join( '\n' ) );
		}
		// Write the minified CSS to file:
		fpath = path.join( dirs[ i ], 'bundle.min.css' );
		fs.writeFileSync( fpath, tmp.styles, fopts );
	}
} // end FUNCTION main()

main();
