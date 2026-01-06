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

/* eslint-disable */

'use strict';

// ===== //

// The following content can be edited...

var PUBLIC_URL = 'https://stdlib.io';
var MOUNT_PATH = 'public/docs/dev';
var SERVE_PATH = '/docs/dev/';
var SRC_PATH = 'apps/dev-docs/src';
var SRC_PATH_HTML = SRC_PATH+'/index.html';
var SRC_PATH_INDEX = SRC_PATH+'/index';


// == DO NOT EDIT == //

// The following content likely should not be edited...

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync( process.cwd() );
const resolveApp = relativePath => path.resolve( appDirectory, relativePath );

const moduleFileExtensions = [
	'web.mjs',
	'mjs',
	'web.js',
	'js',
	'web.ts',
	'ts',
	'web.tsx',
	'tsx',
	'json',
	'web.jsx',
	'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
	const extension = moduleFileExtensions.find(extension =>
		fs.existsSync(resolveFn(`${filePath}.${extension}`))
	);

	if (extension) {
		return resolveFn(`${filePath}.${extension}`);
	}

	return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
	dotenv: resolveApp('.env'),
	appPath: resolveApp(MOUNT_PATH),
	appBuild: resolveApp(MOUNT_PATH),
	appPublic: resolveApp(MOUNT_PATH),
	appHtml: resolveApp(SRC_PATH_HTML),
	appIndexJs: resolveModule(resolveApp, SRC_PATH_INDEX),
	appPackageJson: resolveApp('package.json'),
	appSrc: resolveApp(SRC_PATH),
	appJsConfig: resolveApp('jsconfig.json'),
	appNodeModules: resolveApp('node_modules'),
	publicUrl: PUBLIC_URL,
	servedPath: SERVE_PATH
};


module.exports.moduleFileExtensions = moduleFileExtensions;
