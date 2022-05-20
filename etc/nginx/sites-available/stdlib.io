#/
# @license Apache-2.0
#
# Copyright (c) 2019 The Stdlib Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#/

# Server configuration for stdlib.io.
#
# ## Usage
#
# To enable this configuration file
#
# ```bash
# $ sudo ln -s /etc/nginx/sites-available/stdlib.io /etc/nginx/sites-enabled/stdlib.io
# ```
#
# ## Notes
#
# -   We redirect all HTTP requests to HTTPS, and we redirect all www requests to non-www.
# -   We avoid www/non-www duplication, as this is harmful for SEO, and the non-www URL format is shorter to type.
#

# Set a configuration for a virtual server.
#
# ## Notes
#
# -   Redirects all HTTP requests to HTTPS.
#
# [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#server
server {
  # Set the address and port.
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#listen
  listen 80 default_server;
  listen [::]:80 default_server;

  # Set the virtual server names.
  #
  # ## Notes
  #
  # -   Listen on both www and non-www hosts.
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#server_name
  server_name stdlib.io www.stdlib.io;

  # Redirect to the `https` host (declared below) with a `301` Moved Permanently response.
  #
  # ## Usage
  #
  # Syntax: `return value;`
  #
  # ## Notes
  #
  # -   Avoids the redirect chain:
  #
  #     ```text
  #     http://www -> https://www -> https://
  #     ```
  #
  # [1]: http://nginx.org/en/docs/stream/ngx_stream_return_module.html#return
  return 301 https://stdlib.io$request_uri;
}

# Set a configuration for a virtual server.
#
# ## Notes
#
# -   Redirects all www requests to non-www.
#
# [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#server
server {
  # Set the address and port.
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#listen
  listen [::]:443 ssl; # http2;
  listen 443 ssl; # http2;

  # Set the virtual server name.
  #
  # ## Notes
  #
  # -   Listen on the www host.
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#server_name
  server_name www.stdlib.io;

  # Specify the absolute file path of a certificate in the PEM format for the given virtual server.
  #
  # ## Usage
  #
  # Syntax: `ssl_certificate file;`
  #
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_certificate
  # [2]: https://letsencrypt.org/getting-started/
  # [3]: https://certbot.eff.org/
  # [4]: https://certbot.eff.org/docs/using.html#where-are-my-certificates
  ssl_certificate /etc/letsencrypt/live/stdlib.io/fullchain.pem;

  # Specify the absolute file path of the secret key in the PEM format for the given virtual server.
  #
  # ## Usage
  #
  # Syntax: `ssl_certificate_key file;`
  #
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_certificate_key
  # [2]: https://letsencrypt.org/getting-started/
  # [3]: https://certbot.eff.org/
  # [4]: https://certbot.eff.org/docs/using.html#where-are-my-certificates
  ssl_certificate_key /etc/letsencrypt/live/stdlib.io/privkey.pem;

  # Include an SSL configuration:
  include directive-only/ssl.conf;

  # Redirect to the non-www host (declared below) with a `301` Moved Permanently response.
  #
  # ## Usage
  #
  # Syntax: `return value;`
  #
  # [1]: http://nginx.org/en/docs/stream/ngx_stream_return_module.html#return
  return 301 https://stdlib.io$request_uri;
}

# Set a configuration for a virtual server.
#
# [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#server
server {
  # Set the address and port.
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#listen
  listen [::]:443 ssl; # http2;
  listen 443 ssl; # http2;

  # Set the virtual server name.
  #
  # ## Notes
  #
  # -   Listen on the non-www host.
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#server_name
  server_name stdlib.io;

  # Specify the absolute file path of a certificate in the PEM format for the given virtual server.
  #
  # ## Usage
  #
  # Syntax: `ssl_certificate file;`
  #
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_certificate
  # [2]: https://letsencrypt.org/getting-started/
  # [3]: https://certbot.eff.org/
  # [4]: https://certbot.eff.org/docs/using.html#where-are-my-certificates
  ssl_certificate /etc/letsencrypt/live/stdlib.io/fullchain.pem;

  # Specify the absolute file path of the secret key in the PEM format for the given virtual server.
  #
  # ## Usage
  #
  # Syntax: `ssl_certificate_key file;`
  #
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_certificate_key
  # [2]: https://letsencrypt.org/getting-started/
  # [3]: https://certbot.eff.org/
  # [4]: https://certbot.eff.org/docs/using.html#where-are-my-certificates
  ssl_certificate_key /etc/letsencrypt/live/stdlib.io/privkey.pem;

  # Include an SSL configuration:
  include directive-only/ssl.conf;

  # Specify the absolute path to root directory for requests.
  #
  # ## Usage
  #
  # Syntax: `root path;`
  # Default: `root html;`
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#root
  root /srv/www/stdlib.io/public;

  # Specify the charset in the "Content-Type" response header field.
  #
  # ## Usage
  #
  # Syntax: `charset charset | off;`
  # Default: `charset off;`
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_charset_module.html#charset
  charset utf-8;

  # Define the URI that will be shown for non-existent resources.
  #
  # ## Usage
  #
  # Syntax: `error_page code ... [=[response]] uri;`
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#error_page
  error_page 404 /404.html;

  # Include common configuration rules:
  include common.conf;

  # Absolute path to a directory dedicated to storing domain access logs.
  #
  # ## Usage
  #
  # Syntax: `access_log path [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]];`
  # Syntax: `access_log off;`
  # Default: `access_log logs/access.log combined;`
  #
  # [1]: http://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/html/var.html
  access_log /var/log/www/stdlib.io/access.log;

  # Absolute path to a directory dedicated for storing domain error logs.
  #
  # ## Usage
  #
  # Syntax: `error_log file [level];`
  # Default: `error_log logs/error.log error;`
  #
  # [1]: http://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/html/var.html
  error_log /var/log/www/stdlib.io/error.log warn;

  # Define a location directive for resolving the API documentation server status:
  location = /docs/api/status {
    # Set proxy headers passed to the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_set_header field value;`
    # Default: `proxy_set_header Host $proxy_host; proxy_set_header Connection close;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;

    # Set the protocol and address of the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_pass URL;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
    proxy_pass http://127.0.0.1:3000/status;
  }

  # Define a location directive for pinging the API documentation server:
  location = /docs/api/ping {
    # Set proxy headers passed to the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_set_header field value;`
    # Default: `proxy_set_header Host $proxy_host; proxy_set_header Connection close;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;

    # Set the protocol and address of the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_pass URL;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
    proxy_pass http://127.0.0.1:3000/ping;
  }

  # Define a location directive for serving API documentation:
  location ~* ^/docs/api/[a-z0-9.\-_]+/ {
    # Set proxy headers passed to the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_set_header field value;`
    # Default: `proxy_set_header Host $proxy_host; proxy_set_header Connection close;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;

    # Set the text that should be changed in the `Location` and `Refresh` header fields of a proxied sever response.
    #
    # ## Usage
    #
    # Syntax: `proxy_redirect default;`
    # Syntax: `proxy_redirect off;`
    # Syntax: `proxy_redirect redirect replacement;`
    # Default: `proxy_redirect default;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_redirect
    proxy_redirect ~^(http://[^:]+):\d+(/.+)$ $2;

    # Set the protocol and address of the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_pass URL;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
    proxy_pass http://127.0.0.1:3000;
  }

  # Define a location directive for resolving the API documentation landing page:
  location /docs/api {
    # Set proxy headers passed to the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_set_header field value;`
    # Default: `proxy_set_header Host $proxy_host; proxy_set_header Connection close;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;

    # Set the protocol and address of the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_pass URL;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
    proxy_pass http://127.0.0.1:3000/docs/api;
  }

  # Define a location directive for handling error decoder requests:
  location /e/ {
    # Set proxy headers passed to the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_set_header field value;`
    # Default: `proxy_set_header Host $proxy_host; proxy_set_header Connection close;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;

    # Set the text that should be changed in the `Location` and `Refresh` header fields of a proxied sever response.
    #
    # ## Usage
    #
    # Syntax: `proxy_redirect default;`
    # Syntax: `proxy_redirect off;`
    # Syntax: `proxy_redirect redirect replacement;`
    # Default: `proxy_redirect default;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_redirect
    proxy_redirect ~^(http://[^:]+):\d+/docs/api/latest/error/decoder/(.+)$ /e/$2;

    # Set the protocol and address of the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_pass URL;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
    proxy_pass http://127.0.0.1:3000/docs/api/latest/error/decoder/;
  }

  # Define a location directive for resolving the GitHub event server status:
  location = /gh/status {
    # Set proxy headers passed to the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_set_header field value;`
    # Default: `proxy_set_header Host $proxy_host; proxy_set_header Connection close;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;

    # Set the protocol and address of the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_pass URL;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
    proxy_pass http://127.0.0.1:3001/status;
  }

  # Define a location directive for pinging the GitHub event server:
  location = /gh/ping {
    # Set proxy headers passed to the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_set_header field value;`
    # Default: `proxy_set_header Host $proxy_host; proxy_set_header Connection close;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;

    # Set the protocol and address of the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_pass URL;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
    proxy_pass http://127.0.0.1:3001/ping;
  }

  # Define a location directive for handling GitHub event payloads:
  location ~* ^/gh/[a-z0-9.\-_]+/ {
    # Set proxy headers passed to the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_set_header field value;`
    # Default: `proxy_set_header Host $proxy_host; proxy_set_header Connection close;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-NginX-Proxy true;

    # Set the text that should be changed in the `Location` and `Refresh` header fields of a proxied sever response.
    #
    # ## Usage
    #
    # Syntax: `proxy_redirect default;`
    # Syntax: `proxy_redirect off;`
    # Syntax: `proxy_redirect redirect replacement;`
    # Default: `proxy_redirect default;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_redirect
    proxy_redirect ~^(http://[^:]+):\d+/gh(/.+)$ $2;

    # Set the protocol and address of the proxied server.
    #
    # ## Usage
    #
    # Syntax: `proxy_pass URL;`
    #
    # [1]: https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
    proxy_pass http://127.0.0.1:3001;
  }

  # Define a root location directive:
  location / {
    # Define files to be used as an index.
    #
    # ## Usage
    #
    # Syntax: `index file ...;`
    # Default: `index index.html;`
    #
    # [1]: http://nginx.org/en/docs/http/ngx_http_index_module.html#index
    index index.html index.htm;

    # Turn on auto-indexing of directory contents.
    #
    # [1]: http://nginx.org/en/docs/http/ngx_http_autoindex_module.html#autoindex
    autoindex on;
  }
}
