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

# systemd

> [systemd][systemd] configuration files.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

This directory contains [systemd][systemd] configuration files.

</section>

<!-- /.intro -->

<!-- Usage documentation. -->

<section class="usage">

## Usage

Assuming that the contents of this repository have been copied to a host server, to use the contents of this configuration directory, copy [systemd][systemd] configuration files to `/etc`.

```bash
$ sudo cp /path/to/www/etc/systemd/docs_server@.service /etc/systemd/system
```

Next, instruct [systemd][systemd] to load the configuration.

```bash
$ systemctl daemon-reload
```

Next, ensure that [systemd][systemd] starts the service on system restart,

```bash
$ systemctl enable docs_server@1
```

Finally, instruct [systemd][systemd] to start the service.

```bash
$ systemctl start docs_server@1
```

</section>

<!-- /.usage -->

<!-- Section to include notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[systemd]: https://github.com/systemd/systemd

</section>

<!-- /.links -->
