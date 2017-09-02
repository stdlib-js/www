# TODO

> TODO.

1. 404

   - inspiration: https://medium.com/inspiration-supply/funny-and-creative-404-pages-45f6da146268

2. webhook server to trigger build
3. landing page

   - main website

     * fix top nav on mobile

   - docs specific

4. GitHub pages redirect
5. a "staging" version of the website in order to test out features before going live

   - we need a much shorter build process for this to realistically be viable

6. a script which can do

   - git pull
   - nginx stop
   - rm -rf etc/nginx
   - cp -R nginx
   - symlink
   - nginx start

7. Use URL shortening for click tracking (e.g., Bit.ly)

   - should add a privacy policy to the repo describing what data is collected and why and should link to this policy in the docs (footer link)

8. view which transforms slideout menu into a fullscreen mega menu overlay (maybe with a touch of transparency, so can see the page update underneath)
9. build process which selectively updates only modified docs (i.e., avoid full build every time a README is updated; should be able to only rebuild and update that README)
10. update docs top-nav to match landing page (menu bar styling etc, fonts, box shadow, etc)
11. diffie-hellman: https://mozilla.github.io/server-side-tls/ssl-config-generator/

    - see digital ocean blog

12. SSL-stapling config
13. HTML minify (rehype plugin)
14. CSS and JavaScript in HTML minify (rehype plugin)
15. Consider JS bundle minify
16. Replace `@stdlib/stdlib` HTML doc with something less repo/dev focused
17. Determine whether to delineate the doc version with `.` or with `_` in URL
18. add support for different build targets (e.g., a `www` target where we can refer to common assets like `reset.css`, package ToC, etc, and a standalone target which inlines everything such that package docs can be standalone)
19. investigate [hammer.js](https://github.com/hammerjs/hammer.js) for touch support

    - swipe right to reveal slideout menu
    - swipe left to close slideout menu

20. resolve source URLs (see note in build-package/lib/build.js)
21. sidenote/marginnote styling: https://edwardtufte.github.io/tufte-css/
22. host the exact Lato font-weight we need for the side menu (200), rather than rely on Google (if we place the website behind a CDN, we should be okay)

    - need to update font links to hosted resources
