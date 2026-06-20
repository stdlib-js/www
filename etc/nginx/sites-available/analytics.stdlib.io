#/
# @license Apache-2.0
#
# Copyright (c) 2026 The Stdlib Authors.
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

# Server configuration for analytics.stdlib.io.
#
# ## Usage
#
# To enable this configuration file
#
# ```bash
# $ sudo ln -s /etc/nginx/sites-available/analytics.stdlib.io /etc/nginx/sites-enabled/analytics.stdlib.io
# ```

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
  listen 80;
  listen [::]:80;

  # Set the virtual server name.
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#server_name
  server_name analytics.stdlib.io;

  # Redirect to the `https` host (declared below) with a `301` Moved Permanently response.
  #
  # ## Usage
  #
  # Syntax: `return code URL;`
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
  return 301 https://$host$request_uri;
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
  server_name www.analytics.stdlib.io;

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
  ssl_certificate /etc/letsencrypt/live/analytics.stdlib.io/fullchain.pem;

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
  ssl_certificate_key /etc/letsencrypt/live/analytics.stdlib.io/privkey.pem;

  # Include an SSL configuration:
  include directive-only/ssl.conf;

  # Redirect to the non-www host (declared below) with a `301` Moved Permanently response.
  #
  # ## Usage
  #
  # Syntax: `return code URL;`
  #
  # [1]: http://nginx.org/en/docs/stream/ngx_stream_return_module.html#return
  return 301 https://$host$request_uri;
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
  server_name analytics.stdlib.io;

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
  ssl_certificate /etc/letsencrypt/live/analytics.stdlib.io/fullchain.pem;

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
  ssl_certificate_key /etc/letsencrypt/live/analytics.stdlib.io/privkey.pem;

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
  root /var/www/matomo;

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
  access_log /var/log/www/analytics.stdlib.io/access.log;

  # Absolute path to a directory dedicated for storing domain error logs.
  #
  # ## Usage
  #
  # Syntax: `error_log file [level];`
  # Default: `error_log logs/error.log error;`
  #
  # [1]: http://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/html/var.html
  error_log  /var/log/www/analytics.stdlib.io/error.log;

  # Define files to be used as an index.
  #
  # ## Usage
  #
  # Syntax: `index file ...;`
  # Default: `index index.html;`
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_index_module.html#index
  index index.php;

  # Define a location directive which only allows accessing the following php files:
  location ~ ^/(index|matomo|piwik|js/index|plugins/HeatmapSessionRecording/configs)\.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/run/php/php8.1-fpm.sock;

    # Protect against CVE-2019-11043:
    # try_files $fastcgi_script_name =404; # this can be commented out if already present in `snippets/fastcgi-php.conf`

    # Prohibit httpoxy: https://httpoxy.org/
    fastcgi_param HTTP_PROXY "";
  }

  # Deny access to all other .php files:
  location ~* ^.+\.php$ {
    deny all;
    return 404;
  }

  # Serve all other files normally:
  location / {
    try_files $uri $uri/ =404;
  }

  # Disable all access to specific directories:
  location ~ ^/(config|tmp|core|lang) {
    deny all;
    return 404;
  }

  location ~ /\.ht {
    deny  all;
    return 404;
  }

  location ~ ^/(libs|vendor|plugins|misc|node_modules) {
    deny all;
    return 404;
  }

  location ~* \.(?:ini|log|sh|sql|tpl|twig|yml|yaml)$ {
    deny all;
    return 404;
  }

  location ~ js/container_.*_preview\.js$ {
    expires off;
    add_header Cache-Control 'private, no-cache, no-store';
  }

  # Cache images, CSS, JS, and webfonts for a specified duration, where increasing the duration may improve the load-time, but may cause old files to show after an Matomo upgrade:
  location ~ \.(gif|ico|jpg|png|svg|js|css|htm|html|mp3|mp4|wav|ogg|avi|ttf|eot|woff|woff2)$ {
    allow all;
    expires 1h;
    add_header Pragma public;
    add_header Cache-Control "public";
  }

  # Properly display text files in root directory:
  location ~/(.*\.md|LEGALNOTICE|LICENSE) {
    default_type text/plain;
  }
}
