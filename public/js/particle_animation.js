(function script() {
	'use strict';

	/*
	* Particle animation.
	*
	* ## Notes
	*
	* * Use `sin()` to create an arc up and to the right for particle paths.
	*
	* ## TODO
	*
	* * Consider using stdlib functionality.
	*
	*/

	// VARIABLES //

	// Canvas width:
	var WIDTH = window.innerWidth;

	// Canvas height:
	var HEIGHT = window.innerHeight;

	// Canvas x-limits:
	var XLIMITS = [ 0, WIDTH ];

	// Canvas y-limits:
	var YLIMITS = [ 0, HEIGHT ];

	// Number of particles to animate:
	var NUMPARTICLES = 100;

	// Particle radius (pixels):
	var RADIUS = 7.5;

	// Particle translation velocity factor (pixels per update interval):
	var VELOCITY = -25;

	// Get the current time (in seconds):
	var STARTTIME = now();

	// Average number of seconds before a particle undergoes a state transition:
	var STATETIME = 2.0;

	// Animation interval (milliseconds):
	var INTERVAL = 40;

	// Particle colors (omitting opacity):
	var COLORS = [
		'rgba(236,164,69,',
		'rgba(224,145,55,',
		'rgba(166,107,41,',
		'rgba(0,106,146,',
		'rgba(29,138,189,',
		'rgba(29,137,194,',
		'rgba(89,165,206,'
	];

	// The mathematical constant `pi`:
	var PI = Math.PI;

	// Two times the mathematical constant `pi`:
	var TWO_PI = 2.0 * PI;

	// Particle cache:
	var PARTICLES;

	// Cache a reference to the DOM element in which to draw the animation:
	var canvas = document.querySelector( '#animation' );


	// FUNCTIONS //

	/**
	* Computes the square root of a number.
	*
	* @private
	* @name sqrt
	* @type {Function}
	* @param {number} x - input value
	* @returns {number} square root
	*/
	var sqrt = Math.sqrt;

	/**
	* Computes `x` raised to the power `y`.
	*
	* @private
	* @name pow
	* @type {Function}
	* @param {number} x - base
	* @param {number} y - exponent
	* @returns {number} function result
	*/
	var pow = Math.pow;

	/**
	* Rounds a number toward negative infinity.
	*
	* @private
	* @name floor
	* @type {Function}
	* @param {number} x - input value
	* @returns {number} rounded number
	*/
	var floor = Math.floor;

	/**
	* Generates a pseudorandom uniform number on the interval [0,1).
	*
	* @private
	* @name rand
	* @type {Function}
	* @returns {number} pseudorandom uniform number
	*/
	var rand = Math.random;

	/**
	* Returns the number of seconds since the Unix epoch.
	*
	* @private
	* @returns {number} number of seconds since the Unix epoch
	*/
	function now() {
		var d = ( new Date() ).getTime();
		return ( d/1000 )|0; // asm type annotation
	} // end FUNCTION now()

	/**
	* Returns an array of particles.
	*
	* @private
	* @param {number} N - number of particles to create
	* @returns {Array<Object>} particle array
	*/
	function createParticles( N ) {
		var speed;
		var shear;
		var out;
		var vx;
		var vy;
		var p;
		var i;
		var j;

		out = new Array( N );
		for ( i = 0; i < N; i++ ) {
			p = {};

			// Initial (x,y) coordinates:
			p.x = rand() * WIDTH;
			p.y = rand() * HEIGHT;

			// Initial (x,y) velocities:
			p.vx = rand() * VELOCITY; // ((rand()*(VELOCITY*2))-VELOCITY)
			p.vy = rand() * VELOCITY; // ((rand()*(VELOCITY*2))-VELOCITY)

			// Compute the particle speed:
			speed = sqrt( pow( p.vx, 2 ) + pow( p.vy, 2 ) );

			// Compute shear factors, which allow us to orient particles diagonally:
			p.shear = new Array( 2 );
			p.shear[ 0 ] = 0.0; // -Math.cos( PI * vx / speed )
			p.shear[ 1 ] = 0.0; // 1.0-Math.sin( vy / speed )

			// Particle radius:
			p.radius = RADIUS * ( 1.5-rand() );

			// Define scale factors for radii in the (x,y) plane (scales other than 1:1 produce ellipses):
			p.scale = [ 0.5, 0.5 ];

			// Generate a random color with a random opacity:
			j = floor( rand()*COLORS.length );
			p.color = COLORS[ j ] + rand() + ')';

			// Generate a random size factor:
			p.sizeFactor = 2.0 * rand();

			// Specify a time in the future when a particle will next transition:
			p.transitionTime = STARTTIME + STATETIME + ( rand()*STATETIME );

			// Add the particle to the particle list:
			out[ i ] = p;
		}
		return out;
	} // end FUNCTION createParticles()

	/**
	* Reset a particle.
	*
	* @private
	* @param {Object} p - particle
	*/
	function resetParticle( p ) {
		var j;

		// Compute a random coordinate along the x-axis:
		p.x = rand() * WIDTH;

		// Place the particle at the bottom of the canvas:
		p.y = HEIGHT + p.radius;

		// Generate new velocities:
		p.vx = ( rand()*VELOCITY ) + 0.5;
		p.vy = ( rand()*VELOCITY ) + 0.5;

		// Generate a new color:
		j = floor( rand()*COLORS.length );
		p.color = COLORS[ j ] + rand() + ')';

		// Generate a new radius:
		p.radius = RADIUS * ( 1.5-rand() );
	} // end FUNCTION resetParticle()

	/**
	* Event listener invoked upon a "resize" event.
	*
	* @private
	* @param {Object} evt - event object
	*/
	function resize() {
		WIDTH = window.innerWidth;
		HEIGHT = window.innerHeight;

		canvas.width = WIDTH;
		canvas.height = HEIGHT;

		XLIMITS = [ 0, WIDTH ];
		YLIMITS = [ 0, HEIGHT ];
	} // end FUNCTION resize()

	/**
	* Redraws an animation.
	*
	* @private
	* @param {Context} ctx - canvas context
	*/
	function redraw( ctx ) {
		var radius;
		var xpos;
		var ypos;
		var dt;
		var t;
		var p;
		var i;

		// Clear the canvas and make it fully transparent:
		ctx.clearRect(0, 0, WIDTH, HEIGHT );

		// Update each particle...
		for ( i = 0; i < PARTICLES.length; i++ ) {
			p = PARTICLES[ i ];

			// Compute the elapsed time:
			t = now();
			dt = t - STARTTIME;

			// Note: can achieve an interesting effect by either setting `STARTTIME` equal to `t` within the last `else` case or by increasing the increments for the third case.
			if ( dt < 5 ) {
				// ...do nothing
			} else if ( dt < 6 ) {
				p.vx -= 1.0;
				p.vy -= 2.0;
			} else if ( dt < 7 ) {
				p.vx += 0.25;
				p.vy += 0.5;
			} else {
				STARTTIME = t;
				p.vx = rand() * VELOCITY;
				p.vy = rand() * VELOCITY;
			}
			// Update the particle coordinates:
			p.x += p.vx;
			p.y += p.vy;

			// Determine if the particle has completely left the canvas...
			xpos = [ p.x+p.radius, p.x-p.radius ];
			ypos = [ p.y+p.radius, p.y-p.radius ];
			if (
				xpos[ 0 ] < XLIMITS[ 0 ] ||
				xpos[ 1 ] > XLIMITS[ 1 ] ||
				ypos[ 0 ] < YLIMITS[ 0 ] ||
				ypos[ 1 ] > YLIMITS[ 1 ]
			) {
				// The particle has left the canvas, so we need to reset the particle:
				resetParticle( p );
			} else {
				// Induce the particle to change directions up and to the right...
				p.vx += rand() * 0.005;
				p.vy -= rand() * 0.01;
			}
			dt = t - p.transitionTime;
			if ( t < p.transitionTime ) {
				radius = p.radius;
			} else if ( dt < 0.5) {
				radius = p.radius * p.sizeFactor; // p.radius * 1.03;
			} else if ( dt < 1.0 ) {
				radius = p.radius; // p.radius * 0.95;
			} else {
				p.transitionTime = t + STATETIME + ( rand()*STATETIME );
			}
			// Save the current state:
			ctx.save();

			// Translate the context to the particle position:
			ctx.translate( p.x, p.y );

			// Create the shifted particle within the translated context...
			ctx.fillStyle = p.color;
			ctx.scale( p.scale[ 0 ], p.scale[ 1 ] );

			/*
			* @param {number} hscale - horizontal scale
			* @param {number} hskew - horizontal skew
			* @param {number} vskew - vertical skew
			* @param {number} vscale - vertical scale
			* @param {number} hmove - horizontal move
			* @param {number} vmove - vertical move
			*/
			ctx.transform( 1, p.shear[ 0 ], p.shear[ 1 ], 1, 0, 0 );
			ctx.beginPath();

			/*
			* Notes:
			*   - units are in radians
			*
			* @param {number} x - x position
			* @param {number} y - y position
			* @param {number} r - radius
			* @param {number} startAngle - start angle
			* @param {number} endAngle - end angle
			* @param {boolean} dir - draw direction (anticlockwise)
			*/
			ctx.arc( 0, 0, radius, 0, TWO_PI, true );
			// ctx.arc( p.x, p.y, p.radius, 0, TWO_PI, true );

			ctx.closePath();
			ctx.fill();

			// Restore the original state:
			ctx.restore();
		}
	} // end FUNCTION redraw()

	/**
	* Returns a "redraw" callback.
	*
	* @private
	* @param {Context} ctx - canvas context
	* @returns {Function} callback
	*/
	function redrawWrapper( ctx ) {
		return wrapper;
		/**
		* Redraws an animation.
		*
		* @private
		*/
		function wrapper() {
			redraw( ctx );
		} // end FUNCTION wrapper()
	} // end FUNCTION redrawWrapper()


	// MAIN //

	/**
	* Main execution sequence.
	*
	* @private
	*/
	function main() {
		var context;

		// Only run an animation if a user's browser supports HTML5 canvas...
		if ( canvas && canvas.getContext ) {
			// Cache the rendering context:
			context = canvas.getContext( '2d' );

			// Add an event listener for window 'resize' events:
			window.addEventListener( 'resize', resize, false );

			// Create particles:
			PARTICLES = createParticles( NUMPARTICLES );

			// Start the animation:
			setInterval( redrawWrapper( context ), INTERVAL );

			// Perform an initial canvas resize:
			resize();
		}
	} // end FUNCTION main()

	// Run the animation:
	main();
})();
