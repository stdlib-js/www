# Server configuration for stdlib.io.
#
# ## Notes
#
# * We redirect all HTTP requests to HTTPS, and we redirect all www requests to non-www.
# * We avoid www/non-www duplication, as this is harmful for SEO, and the non-www URL format is shorter to type.
#

# Set a configuration for a virtual server.
#
# ## Notes
#
# * Redirects all HTTP requests to HTTPS.
#
# [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#server
server {
  # Set the address and port.
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#listen
  listen 80 default_server;
  listen [::]:80 default_server ipv6only=on;

  # Listen on both www and non-www hosts:
  server_name stdlib.io www.stdlib.io;

  # Redirect to the `https` host (declared below) with a `301` Moved Permanently response.
  #
  # ## Notes
  #
  # * Avoids the redirect chain:
  #
  #   ```text
  #   http://www -> https://www -> https://
  #   ```
  #
  return 301 https://stdlib.io$request_uri;
}

# Set a configuration for a virtual server.
#
# ## Notes
#
# * Redirects all www requests to non-www.
#
# [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#server
server {
  # Set the address and port.
  #
  # [1]: http://nginx.org/en/docs/http/ngx_http_core_module.html#listen
  listen [::]:443 ssl; # http2;
  listen 443 ssl; # http2;

  # Listen on the www host:
  server_name www.stdlib.io;

  # Include an SSL configuration:
  include directive-only/ssl.conf;

  # Redirect to the non-www host (declared below) with a `301` Moved Permanently response.
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

  # Specify the host name to which to respond:
  server_name stdlib.io;

  # Define absolute paths to an SSL certificate and SSL certificate key:
  ssl_certificate /etc/letsencrypt/live/stdlib.io/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/stdlib.io/privkey.pem;

  # Include an SSL configuration:
  include directive-only/ssl.conf;

  # Absolute path to root directory for static assets:
  root /srv/www/stdlib.io/public;

  # Specify a charset:
  charset utf-8;

  # Define a custom 404 page:
  error_page 404 /404.html;

  # Files to serve if none specified:
  index index.html index.htm;

  # Include common configuration rules:
  include common.conf;

  # Absolute path to a directory dedicated to storing domain access logs:
  access_log /var/www/stdlib.io/logs/access.log;

  # Define a root location directive:
  location / {
    # Turn on auto-indexing of directory contents:
    autoindex on;
  }
}
