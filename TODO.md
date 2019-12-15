# TODO

> TODO.

1. 404

   - inspiration: https://medium.com/inspiration-supply/funny-and-creative-404-pages-45f6da146268

2. webhook server to trigger build
3.
4. Document local development setup

    -   https://github.com/CodepediaOrg/bookmarks.dev-api/wiki/Setup-Nginx-for-development-(macOS)---work-in-progress
    -   https://tech.finn.no/2015/09/25/setup-nginx-with-http2-for-local-development/
    -   https://bneijt.nl/blog/post/running-nginx-for-local-development/
    -   https://github.com/sonatype-nexus-community/search-maven-org/pull/58
    -   current hack is to do `python -m http.server 8000` from the `/public` directory and manually navigate to documentation, leveraging static file resolution

5. a "staging" version of the website in order to test out features before going live

   - we need a much shorter build process for this to realistically be viable

6. We need a way to refer to the "latest" docs, so we don’t have to manually update versions, e.g., on the homepage, etc.

    -   This should be a straightforward reroute on the fastify side of things.

7. Use URL shortening for click tracking (e.g., Bit.ly)

   - to integrate with GA, for inbound, need to add URL tags (https://www.linkedin.com/pulse/small-biz-guide-how-track-clicks-your-website-blog-jay-lane, https://support.google.com/analytics/answer/1033867?hl=en, and https://support.google.com/analytics/answer/1033863#parameters)
   - should add a privacy policy to the repo describing what data is collected and why and should link to this policy in the docs (footer link)

8. (docs) view which transforms slideout menu into a fullscreen mega menu overlay (maybe with a touch of transparency, so can see the page update underneath)
9. (docs) build process which selectively updates only modified docs (i.e., avoid full build every time a README is updated; should be able to only rebuild and update that README)
10.
11. diffie-hellman: https://mozilla.github.io/server-side-tls/ssl-config-generator/

    - see digital ocean blog

12. SSL-stapling config
13. (docs) HTML minify (rehype plugin)
14.
15. (docs) Consider JS bundle minify
16.
17. update Makefiles, including moving npm scripts to Makefile targets
18.
19. (docs) investigate [hammer.js](https://github.com/hammerjs/hammer.js) for touch support

    - swipe right to reveal slideout menu
    - swipe left to close slideout menu

20. parallelize build process?

    -   see https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/utils/parallel
    -   in short, generate scripts for bundling various package assets
    -   write the scripts to a directory
    -   read the directory to get the list of scripts
    -   pass the list to the parallel utility
    -   if the build process breaks, etc, can easily resume from where the process left off, as the script directory will still contain the scripts
    -   allows for "pause" and "resume"

21. (docs) sidenote/marginnote styling: https://edwardtufte.github.io/tufte-css/
22. (docs) need to update font links to hosted resources
23. Background image slideshow? (see https://tympanus.net/codrops/2012/01/02/fullscreen-background-image-slideshow-with-css3/)
24. (docs) on smaller devices, convert top nav to dropdown on right side (use a downarrow as the icon?)
25. resolve approach for using `stdlib` pkgs in www JS assets (e.g., setting NODE_PATH during browserify or some other approach?)
26. Use of "Learn More" on www feature buttons (?)
27. (docs) source view

    - rather than redirect to GitHub for source view, generate syntax highlighted HTML files for each source file
    - this would allow, e.g., hyperlinking stdlib packages => when click on a `require` statement for a stdlib package, we redirect to the doc page for that package
    - for relative requires, we simply load the syntax highlighted HTML
    - if we are really fancy, on hover, we can provide typescript/IDE-like functionality where we provide the type signature of an imported function and its description, all without ever leaving our website docs

28. (docs) JSDoc page (developer docs, with linking to type information)
29. (docs) README syntax highlighted example URLs (i.e., `require( '@stdlib/foo' )`, where `@stdlib/foo` is a hyperlink)
30. General update sequence...

    - git pull
    - rm -rf ./node_modules
    - npm run install:production
    - nginx -s stop
    - rm -rf /etc/nginx
    - cp -R ./etc/nginx/ /etc/nginx/
    - symlink sites-available to sites-enabled
    - sudo service nginx restart
    - rm -f etc/systemd/system/docs_server@.service
    - cp ./etc/systemd/docs_server@.service /etc/systemd/system/docs_server@.service
    - systemctl daemon-reload
    - systemctl enable docs_server@1
    - systemctl start docs_server@1
    - systemctl status docs_server@1
    - journalctl -u docs_server@1

https://blog.codeship.com/running-node-js-linux-systemd/
sudo ln -s $(which npm) /usr/bin/npm
sudo ln -s $(which node) /usr/bin/node

31. It would be a nice (future) feature if we could make the docs an HTML5 mobile app which can be run offline:

    -   https://labs.ft.com/2012/08/basic-offline-html5-web-app/
    -   https://github.com/matthew-andrews/workshop-making-it-work-offline

    This would allow a user to install the docs as a mobile app and use them offline after downloading all the requisite fragments and bundles.

32. Previous behavior: <https://github.com/stdlib-js/www/blob/0c547db74a1d67af0b5c7f99407230a4ea2826d1/public/develop/docs/api/%40stdlib/array/buffer/index.html#L1730>
