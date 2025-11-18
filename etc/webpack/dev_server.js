/**
* MIT License
*
* Copyright (c) 2013-present, Facebook, Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

'use strict';

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const path = require('path');
const configFactory = require('./config.js');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';
const config = configFactory( 'development' );

module.exports = function( proxy ) {
	return {
		allowedHosts: 'auto',
		// Enable gzip compression of generated files.
		compress: true,
		devMiddleware: {
			index: true,
			publicPath: config.output.publicPath,
			serverSideRender: true,
			writeToDisk: false
		},
		// Enable HTTPS if the HTTPS environment variable is set to 'true'
		https: protocol === 'https',
		host,
		client: {
			overlay: {
				errors: true,
				warnings: false
			}
		},
		historyApiFallback: {
			// Paths with dots should still use the history fallback.
			// See https://github.com/facebook/create-react-app/issues/387.
			disableDotRule: true,
			index: 'docs/api/index.html'
		},
		static: {
			directory: paths.appPublic,
			publicPath: [paths.servedPath],
			watch: true,
		},
		hot: true,
		open: [],
		proxy: proxy,
		setupMiddlewares( middlewares, devServer ) {
			const app = devServer.app;

			// This lets us fetch source contents from webpack for the error overlay
			app.use( evalSourceMapMiddleware( devServer ) );
			// This lets us open files from the runtime error overlay.
			app.use( errorOverlayMiddleware() );

			// This service worker file is effectively a 'no-op' that will reset any
			// previous service worker registered for the same host:port combination.
			// We do this in development to avoid hitting the production cache if
			// it used the same host and port.
			// https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
			app.use( noopServiceWorkerMiddleware( '/' ) );

			return middlewares;
		},
	};
};
