<!--

@license Apache-2.0

Copyright (c) 2019 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Documentation Server

> Create an HTTP server for serving API documentation.

<section class="usage">

## Usage

```javascript
var httpServer = require( '@stdlib/_tools/docs/www/server' );
```

#### httpServer( \[options] )

Returns a function which creates an HTTP server for serving API documentation.

<!-- run-disable -->

```javascript
var App = require( 'my-app' );

var opts = {
    'port': 7331,
    'address': '127.0.0.1'
};
var createServer = httpServer( opts );

function done( error, fastify ) {
    if ( error ) {
        throw error;
    }
    console.log( 'Success!' );
    fastify.close();
}

createServer( App, done );
```

The function accepts the following `options`:

-   **address**: server address. Default: `'127.0.0.1'`.
-   **hostname**: server hostname (e.g., `localhost` ). The `hostname` option takes precedence over the `address` option.
-   **latest**: latest documentation version (e.g., `v0.0.90`). When set to an empty string (as is the default), the server does **not** virtually map the version `latest` to a particular set of documentation resources. Default: `''`.
-   **logger**: `boolean` indicating whether to enable logging or a log level. Default: `false`.
-   **port**: server port. Default: `0` (i.e., randomly assigned).
-   **prefix**: URL path prefix used to create a virtual mount path for a static directory (e.g., `/docs/api/` to match the API documentation virtual mount path). If provided a list of prefixes, each prefix is associated with a corresponding `static` directory. Default: `'/'`.
-   **root**: root directory containing API documentation. May be either an absolute path or a path relative to the current working directory. This directory will be mounted onto the virtual path `/docs/api/`. Default: current working directory.
-   **static**: directory (or directories) from which to serve static documentation assets and files. May be either an absolute path or a path relative to the current working directory. When set to an empty string (the default), the server does **not** serve static assets. Default: `''`.
-   **trustProxy**: `boolean` indicating whether to trust `X-forwarded-by` headers when the server is sitting behind a proxy. Default: `false`.
-   **ignoreTrailingSlash**: `boolean` indicating whether to ignore trailing slashes in routes (e.g., `/foo/bar` and `/foo/bar/`). Default: `true`.

* * *

### Routes

<a name="docs-api-get"></a>

#### GET /docs/api/

Returns the main documentation web application and is equivalent to returning the landing page for the latest documentation version.

##### Response: 200 (text/html)

The response body will be an HTML string containing a documentation landing page.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api'
```

* * *

<a name="docs-api-version-get"></a>

#### GET /docs/api/:version

Returns a documentation landing page for a specified `version`.

##### Response: 200 (text/html)

The response body will be an HTML string containing a documentation landing page.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest'
```

* * *

<a name="docs-api-version-stdlib-get"></a>

#### GET /docs/api/:version/@stdlib

Redirects to the documentation landing page for a specified `version`.

##### Response: 302 (text/html)

The response body will be empty.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/@stdlib'
```

* * *

<a name="docs-api-version-search-get"></a>

#### GET /docs/api/:version/search?q=<query>

Returns a page for displaying search results according to a specified `query` for a specified `version`.

##### Response: 200 (text/html)

The response body will be an HTML string containing a page for displaying search results.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/search?q=sine'
```

* * *

<a name="docs-api-version-help-get"></a>

#### GET /docs/api/:version/help

Returns a help page for a specified `version`.

##### Response: 200 (text/html)

The response body will be an HTML string containing a help page.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/help'
```

* * *

<a name="docs-api-version-error-decoder-get"></a>

#### GET /docs/api/:version/error/decoder

Returns a page for decoding error messages for a specified `version`.

##### Response: 200 (text/html)

The response body will be an HTML string containing a page for decoding error messages.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/error/decoder
```

* * *

<a name="docs-api-version-error-decoder-code-get"></a>

#### GET /docs/api/:version/error/decoder/:code\[?&arg\[]=&lt;value&gt;\[&...]]

Returns a page for displaying a decoded error message for a specified `version`.

##### Response: 200 (text/html)

The response body will be an HTML string containing a page for displaying a decoded error message.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/error/decoder/00100
```

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/error/decoder/00129?arg[]=foo
```

* * *

<a name="docs-api-version-error-message-code-get"></a>

#### GET /docs/api/:version/error/message/:code\[?arg\[]=&lt;value&gt;&...]

Returns a formatted error message

##### Response: 200 (application/json)

The response body will be a JSON string containing the following properties:

-   **code**: error code.
-   **args**: argument list.
-   **pkg**: associated package name.
-   **msg**: formatted error message.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/error/message/00100'
```

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/error/message/00129&arg[]=foo'
```

* * *

<a name="docs-api-version-pkg-get"></a>

#### GET /docs/api/:version/@stdlib/\*?fragment=&lt;true|false&gt;

Returns package documentation for a specified `version`.

##### Response: 200 (text/html)

The response body will be an HTML string containing the package documentation either as an HTML fragment or as a standalone web page.

##### Examples

From the command-line, to return a standalone web page,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/@stdlib/math/base/special/'
```

To return an HTML fragment,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/@stdlib/math/base/special/?fragment=true'
```

* * *

<a name="docs-api-version-package-data-get"></a>

#### GET /docs/api/:version/package/data.json

Returns application package data for a specified `version`.

##### Response: 200 (application/json)

The response body will be a JSON string containing application package data (e.g., package list, order, descriptions, tree, resources, etc).

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/package/data.json'
```

* * *

<a name="docs-api-version-package-desc-get"></a>

#### GET /docs/api/:version/package/desc.json

Returns a list of package descriptions for a specified `version`.

##### Response: 200 (application/json)

The response body will be a JSON string containing a list of package descriptions. To resolve the corresponding package name, perform a look-up in the `package/list.json` dataset.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/package/desc.json'
```

* * *

<a name="docs-api-version-package-index-get"></a>

#### GET /docs/api/:version/package/index.json

Returns a pre-compiled search index for a specified `version`.

##### Response: 200 (application/json)

The response body will be a JSON string containing a pre-compiled search index.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/package/index.json'
```

* * *

<a name="docs-api-version-package-list-get"></a>

#### GET /docs/api/:version/package/list.json

Returns a list of packages for a specified `version`.

##### Response: 200 (application/json)

The response body will be a JSON string containing a list of package names.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/package/list.json'
```

* * *

<a name="docs-api-version-namespace-list-get"></a>

#### GET /docs/api/:version/package/namespaces.json

Returns a list of namespaces for a specified `version`.

##### Response: 200 (application/json)

The response body will be a JSON string containing a list of namespace indices. To resolve the list of corresponding package names, perform a look-up in the `package/list.json` dataset.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/package/namespaces.json'
```

* * *

<a name="docs-api-version-package-order-get"></a>

#### GET /docs/api/:version/package/order.json

Returns a hash specifying package order for a specified `version`.

##### Response: 200 (application/json)

The response body will be a JSON string containing a hash specifying package order.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/package/order.json'
```

* * *

<a name="docs-api-version-package-resources-get"></a>

#### GET /docs/api/:version/package/resources.json

Returns a strided array indicating the presence/absence of package resources for a specified `version`.

##### Response: 200 (application/json)

The response body will be a JSON string containing a strided array structured as follows:

```text
[ <benchmark>, <test>, <typescript>, <benchmark>, <test>, ...]
```

For each package in `package/list.json`, the strided array contains three consecutive entries indicating the presence/absence of a package resource. A `1` indicates the presence of a package resource, and a `0` indicates the absence of a package resource.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/package/resources.json'
```

* * *

<a name="docs-api-version-package-tree-get"></a>

#### GET /docs/api/:version/package/tree.json

Returns a package tree for a specified `version`.

##### Response: 200 (application/json)

The response body will be a JSON string containing a package tree.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/package/tree.json'
```

* * *

<a name="docs-api-version-package-tree-array-get"></a>

#### GET /docs/api/:version/package/tree-array.json

Returns a package tree array for a specified `version`.

##### Response: 200 (application/json)

The response body will be a JSON string containing a package tree array.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/api/latest/package/tree-array.json'
```

* * *

<a name="ping-get"></a>

#### GET /ping

Pings the server application.

##### Response: 200 (text/plain)

The response body will be

```text
pong
```

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/ping'
```

* * *

<a name="status-get"></a>

#### GET /status

Returns the server application's status.

##### Response: 200 (text/plain)

The response body will be

```text
OK
```

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/status'
```

</section>

<!-- /.usage -->

* * *

<section class="notes">

## Notes

-   The server expects the `root` directory to have the following structure:

    ```text
    /<version>
      |- <pkg>
      |- <pkg>
      |- <pkg>
      |- ...
    /<version>
      |- <pkg>
      |- <pkg>
      |- <pkg>
      |- ...
    index.html
    ```

    where

    -   `<version>` corresponds to a documentation version (e.g., `latest`, `v0.0.90`, etc)
    -   `<pkg>` corresponds to a package path (e.g., `@stdlib/math/base/special/sin`)
    -   the root `index.html` contains the main application for viewing API documentation

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- run-disable -->

<!-- eslint no-undef: "error" -->

```javascript
// TODO: example
```

</section>

<!-- /.examples -->

<section class="links">

</section>

<!-- /.links -->
