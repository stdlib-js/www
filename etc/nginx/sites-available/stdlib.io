server {
  listen 80 default_server;
  listen [::]:80 default_server ipv6only=on;

  root /usr/share/nginx/html;
  index index.html index.htm;

  # Make site accessible from http://localhost/
  server_name stdlib.io;
  server_name *.stdlib.io; # process requests for all subdomains

  # Absolute path to a directory dedicated to storing domain logs; e.g., /var/www/<domain>/logs/access.log
  access_log /srv/www/stdlib.io/logs/access.log;

  # Define routes for static assets:
  location / {
    # Absolute path to root directory containing static assets:
    root /srv/www/stdlib.io/public;

    # Files to serve if none specified:
    index index.html index.htm;

    # Turn on/off auto-indexing of directory contents:
    autoindex on;
  }
}
