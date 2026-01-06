<!--

@license Apache-2.0

Copyright (c) 2026 The Stdlib Authors.

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

# Developer Documentation Server

> Create an HTTP server for serving developer documentation.

<section class="usage">

## Usage

```javascript
var httpServer = require( 'path/to/apps/dev-docs/server' );
```

#### httpServer( \[options] )

Returns a function which creates an HTTP server for serving developer documentation.

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
-   **logger**: `boolean` indicating whether to enable logging or a log level. Default: `false`.
-   **port**: server port. Default: `0` (i.e., randomly assigned).
-   **prefix**: URL path prefix used to create a virtual mount path for a static directory (e.g., `/docs/dev/` to match the developer documentation virtual mount path). If provided a list of prefixes, each prefix is associated with a corresponding `static` directory. Default: `'/'`.
-   **root**: root directory containing developer documentation. May be either an absolute path or a path relative to the current working directory. This directory will be mounted onto the virtual path `/docs/api/`. Default: current working directory.
-   **static**: directory (or directories) from which to serve static documentation assets and files. May be either an absolute path or a path relative to the current working directory. When set to an empty string (the default), the server does **not** serve static assets. Default: `''`.
-   **trustProxy**: `boolean` indicating whether to trust `X-forwarded-by` headers when the server is sitting behind a proxy. Default: `false`.
-   **ignoreTrailingSlash**: `boolean` indicating whether to ignore trailing slashes in routes (e.g., `/foo/bar` and `/foo/bar/`). Default: `true`.

* * *

### Routes

<a name="docs-dev-get"></a>

#### GET /docs/dev/

Returns the main documentation web application and is equivalent to returning the landing page.

##### Response: 200 (text/html)

The response body will be an HTML string containing a documentation landing page.

##### Examples

From the command-line,

<!-- run-disable -->

```bash
$ curl 'http://127.0.0.1:<port>/docs/dev'
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
