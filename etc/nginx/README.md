# nginx

> [nginx][nginx] configuration files.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

This directory contains [nginx][nginx] configuration files.

</section>

<!-- /.intro -->

<!-- Usage documentation. -->

<section class="usage">

## Usage

Assuming that the contents of this repository have been copied to a host server, to use the contents of this configuration directory in place of an existing [nginx][nginx] configuration directory, first rename `/etc/nginx` to create a back-up copy of the directory.

``` bash
$ sudo mv /etc/nginx /etc/nginx-backup
```

Next, copy this configuration directory to `/etc`.

``` bash
$ sudo cp -R /path/to/www/etc/nginx /etc/nginx
```

To enable a server configuration located in `sites-available`, create a symlink. For example,

``` bash
$ sudo ln -s /etc/nginx/sites-available/stdlib.io /etc/nginx/sites-enabled/stdlib.io
```

Finally, restart [nginx][nginx].

``` bash
$ sudo service nginx restart
```

</section>

<!-- /.usage -->

<!-- Section to include notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[nginx]: http://nginx.org/en/

</section>

<!-- /.links -->
