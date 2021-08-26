# TODO

> TODO.

1. 404

   - inspiration: <https://medium.com/inspiration-supply/funny-and-creative-404-pages-45f6da146268>

2. webhook server to trigger build

    -   can be part of GitHub action pipeline
    -   upon tagging the docs, trigger an action to push and deploy docs

3. (docs) investigate using [hotjar](https://www.hotjar.com/pricing) to collect user feedback for the API docs

4. (tools) Document local development setup

    -   <https://github.com/CodepediaOrg/bookmarks.dev-api/wiki/Setup-Nginx-for-development-(macOS)---work-in-progress>
    -   <https://tech.finn.no/2015/09/25/setup-nginx-with-http2-for-local-development/>
    -   <https://bneijt.nl/blog/post/running-nginx-for-local-development/>
    -   <https://github.com/sonatype-nexus-community/search-maven-org/pull/58>
    -   maybe use Docker? (at least for local development)
    -   current hack is to do `python -m http.server 8000` from the `/public` directory and manually navigate to documentation, leveraging static file resolution

5. (tools) a "staging" version of the website in order to test out features before going live

   -   we need a much shorter build process for this to realistically be viable, but may work for serving all non-package assets (e.g., API docs application, static www pages, etc)
   -   <https://github.com/linode/docs/blob/master/docs/websites/static-sites/install-gatsbyjs/index.md>

6. (docs) consider adding link elements to section headings similar to how GitHub displays a link icon on hover which supports creating a link to that specific section

7. (tools) use URL shortening for click tracking (e.g., Bit.ly)

   -   to integrate with GA, for inbound, need to add URL tags (<https://www.linkedin.com/pulse/small-biz-guide-how-track-clicks-your-website-blog-jay-lane>, <https://support.google.com/analytics/answer/1033867?hl=en>, and <https://support.google.com/analytics/answer/1033863#parameters>)
   -   should add a privacy policy to the repo describing what data is collected and why and should link to this policy in the docs (footer link)
   -   Polr: <https://github.com/cydrobolt/polr>
   -   YOURLS: <https://github.com/YOURLS/YOURLS>
   -   <https://scalegrid.io/blog/how-to-build-a-url-shortener-with-node-js-and-mongodb/>

8. (docs) view which transforms slideout menu into a fullscreen mega menu overlay (maybe with a touch of transparency, so can see the page update underneath)

9. (docs) build process which selectively updates only modified docs (i.e., avoid full build every time a README is updated; should be able to only rebuild and update that README)

10. (docs) test/benchmark iframe media queries (on small devices, we can reduce the left margin)

11. diffie-hellman: <https://mozilla.github.io/server-side-tls/ssl-config-generator/>

    - see digital ocean blog

12. SSL-stapling config

13. (docs) HTML minify (rehype plugin)

14. (docs) disable search input until search backend is ready

15. (docs) Consider JS bundle minify

16. (docs) welcome page should link to local (rendered) LICENSE

17. (tools) update Makefiles, including moving npm scripts to Makefile targets

18.

19. (docs) investigate [hammer.js](https://github.com/hammerjs/hammer.js) for touch support

    - swipe right to reveal slideout menu
    - swipe left to close slideout menu

20. (tools) parallelize build process?

    -   see https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/utils/parallel
    -   in short, generate scripts for bundling various package assets
    -   write the scripts to a directory
    -   read the directory to get the list of scripts
    -   pass the list to the parallel utility
    -   if the build process breaks, etc, can easily resume from where the process left off, as the script directory will still contain the scripts
    -   allows for "pause" and "resume"

21. (docs) sidenote/marginnote styling: <https://edwardtufte.github.io/tufte-css/>

22. (docs) generate a ToC for each package README which can be used to populate a right-hand side-menu for navigation within package documentation

    -   this navigation element could also be used to house the benchmarks, tests, source, and other links for a package, but maybe we want to keep separate (?)
    -   this would be similar in appearance to docusaurus, which may or may not be a good thing

23. (www) background image slideshow? (see <https://tympanus.net/codrops/2012/01/02/fullscreen-background-image-slideshow-with-css3/>)

24. (docs) handle failure to load test/benchmark resource in iframe (e.g., due to server/network failure)

25. resolve approach for using `stdlib` pkgs in www JS assets (e.g., setting NODE_PATH during browserify or some other approach?)

    -   see, e.g., js/404/particular_animation.js

26. Use of "Learn More" on www feature buttons (?; not even sure what this item refers to anymore 😢)

    -   maybe to allow people to actually investigate further regarding stats, math, and other advertised functionality

27. (docs) source view

    - rather than redirect to GitHub for source view, generate syntax highlighted HTML files for each source file
    - this would allow, e.g., hyperlinking stdlib packages => when click on a `require` statement for a stdlib package, we redirect to the doc page for that package
    - for relative requires, we simply load the syntax highlighted HTML
    - if we are really fancy, on hover, we can provide typescript/IDE-like functionality where we provide the type signature of an imported function and its description, all without ever leaving our website docs

28. (docs) JSDoc page (developer docs, with linking to type information)

29. (docs) README syntax highlighted example URLs (i.e., `require( '@stdlib/foo' )`, where `@stdlib/foo` is a hyperlink)

30. (tools) General update sequence...

    - sudo git pull origin master
    - sudo rm -rf ./node_modules
    - sudo npm run install:production
    - sudo nginx -s stop
    - sudo rm -rf /etc/nginx/sites-enabled/stdlib.io
    - sudo cp ./etc/nginx/sites-available/stdlib.io /etc/nginx/sites-available/stdlib.io
    - sudo ln -s /etc/nginx/sites-available/stdlib.io /etc/nginx/sites-enabled/stdlib.io
    - sudo service nginx restart
    - systemctl status nginx.service
    - sudo rm -f etc/systemd/system/docs_server@.service
    - sudo cp ./etc/systemd/docs_server@.service /etc/systemd/system/docs_server@.service
    - sudo systemctl daemon-reload
    - sudo systemctl enable docs_server@1
    - sudo systemctl start docs_server@1
    - sudo systemctl status docs_server@1
    - sudo journalctl -u docs_server@1

    - <https://blog.codeship.com/running-node-js-linux-systemd/>
    - sudo ln -s $(which npm) /usr/bin/npm
    - sudo ln -s $(which node) /usr/bin/node

31. (docs) It would be a nice (future) feature if we could make the docs an HTML5 mobile app which can be run offline:

    -   <https://labs.ft.com/2012/08/basic-offline-html5-web-app/>
    -   <https://github.com/matthew-andrews/workshop-making-it-work-offline>
    -   <https://www.html5rocks.com/en/tutorials/appcache/beginner/>
    -   <https://www.html5rocks.com/en/mobile/workingoffthegrid/>
    -   <https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine>

    This would allow a user to install the docs as a mobile app and use them offline after downloading all the requisite fragments and bundles.

    -   should we allow the TypeScript docs to be downloaded offline, too?

32. (docs) for reference, previous behavior: <https://github.com/stdlib-js/www/blob/0c547db74a1d67af0b5c7f99407230a4ea2826d1/public/develop/docs/api/%40stdlib/array/buffer/index.html#L1730>

33. strategy for bundling assets:

    -   UPDATE: I think that, better than below, would be best if, instead of bundling, we leverage ES modules here so that we don't have to bundle at all. This approach may require pre-bundles of vendored deps. We can see how Ricky managed to do so with his `@stdlib/esm` build.

    -   for each `stdlib` package, we need to resolve package dependencies. We should resolve dependencies separately for the main library, tests, benchmarks, and examples. We can do this using current tooling: `@stdlib/_tools/pkgs/deps`. The resolved dependency trees should be flat, stopping at any non-`stdlib` packages. The dependency trees should be written to separate files in the "browser build" repo discussed below.
    -   we then create package bundles for each package: a library bundle, a test bundle, and a benchmark bundle. The key here is that we do not include "external" deps in those bundles. We instruct `browserify` to exclude external deps (see <https://github.com/browserify/browserify>). This should generate bundles with only the code in that package. Each bundle should export a `require` function so that bundles can inter-operate with one another, and, for tests, benchmarks, and examples, be `require`'d in order to explicitly run.
    -   we further create separate package bundles for each non-`stdlib` dependency which is used as either a library dependency, test dependency, benchmark dependency, or example dependency. These bundles we effectively vendor, saving them to, e.g., a vendor folder.
    -   now for the more interesting part. Having resolved the package dependencies, we then generate the `test.html` and `benchmark.html` files to load (i.e., separate `<script>` tags) the various dependency bundles prior to loading the actual test or benchmark code. Accordingly, if two packages have benchmarks which use different packages, then they will have different `<script>` tags. **Note**: this means we need to have fully resolved a package's dependency tree into a flat tree. As `stdlib` is its own universe, we don’t have to worry about multiple versions of a dependency, including vendored bundles. We should be able to walk the dependency tree, stopping at any non-`stdlib` packages. Any non-`stdlib` package will have already been vendored.
    -   yes, this may mean that, for, say, packages whose test files have many dependencies, we will make many requests loading individual bundles; however, I think we may actually get some network perf gains given caching.
    -   furthermore, because of caching and separate bundles, we should be able to avoid duplicate code being sent to the browser because bundles have duplicate code. As everything will be factored into separate bundles and can be cached, a browser should be able to only fetch what is missing (i.e., new code).
    -   next, when we generate these bundles, we should store them in a `git` repository and, importantly, tag for each documentation version. This should be a separate repo containing the project www "browser" build. Why do we want to do this? Well, we get to take advantage of `git`! Since `git` only stores the diffs, we avoid needing to store separate bundles for every single version. As long as a individual bundle does not change between versions, then both versions will point to the same bundle when accessed via either tag path.
    -   this browser build repository should have a microservice frontend for retrieving bundles for a specified tag. The microservice can be a Node.js `fastify` server which receives a request, looks for a version tag in the request URL (e.g., `v0.0.90`),  asynchronously shells out and runs `git show <tag>:path/to/file` (e.g., `git show v0.0.90:lib/node_modules/@stdlib/math/base/special/abs/lib/bundle.min.js`), and then returns the bundle.
    -   when the API docs frontend requests bundles, the docs server can forward those requests to the bundle microservice, instead of reading directly from the file system as it does now. This will mean slightly longer load times, given both the proxying and having to run `git show`, but the overhead should not be too great and, for this purpose, worth it and within user expectation.
    -   Importantly, this bundling strategy has implications for live documentation. Notably, when we want to run a code cell in a README, we can parse the code, looking for `import`/`require` statements. Next, we can check this list against the list of currently loaded packages. For anything which is missing, we can send a request to query the "browser build" repo for the list of dependencies for that package. We compute the intersection of those dependency requirements and load the bundle for each dependency **prior to** loading the explicit `import`/`require` paths. Once we have loaded the bundles, we should be able to execute the code cell. This should allow us to lazily load `stdlib` dependencies on demand.
    -   for downloading the documentation for offline use, we'd need to think carefully about whether we'd want to support downloading tests, benchmarks, and examples bundles. If offline and they have not been downloaded, we may want to disable those navigation items.

34. (docs) for downloading assets for offline usage, what about other versions?

    -   Does a user need to manually select the version she wants to download and then click download?
    -   Or do we download assets for all versions?
    -   What is the user expectation here?
    -   Maybe consider a dialog to allow a user to select which versions?

        -   checkbox for each version
        -   ability to select/de-select all versions
        -   option to specify "latest" (if so, then we need to be able to check for updates and to prompt the user when new docs are available)

35. (docs) add support for an RSS and/or Atom feed?

    -   <https://www.lifewire.com/how-to-add-rss-feed-3469294>
    -   <https://github.com/dylang/node-rss>
    -   <https://www.wikihow.com/Create-an-RSS-Feed>
    -   <https://en.wikipedia.org/wiki/Atom_(Web_standard)>
    -   basic idea would be to allow users to subscribe to updates to particular packages, which is not really possible now
    -   upon viewing the documentation for a particular package, a user could subscribe to a feed for that package
    -   probably possible to convert the Git commit log, provided certain standards are followed, into an RSS and/or Atom feed

36. (docs) refactor the side bar menu to not inject SVG icons

    -   instead rely on CSS background images.
    -   Why? Otherwise, we inject a lot of duplicate DOM nodes when we could instead point to a single SVG file that the browser can cache and present.
    -   In short, we can leverage CSS to get a perf boost.

37.

38. (docs) explore using Web Speech API for speech recognition in the filter (and future search) input

    -   browser support is limited (and almost non-existent)
    -   <https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API>
    -   <https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API>
    -   <https://github.com/mdn/web-speech-api>

39. (docs) investigate using Algolia's [docsearch](https://github.com/algolia/docsearch) offering to provide documentation search

    -   note, however, that, were we to use Algolia, users would not be able to search offline!
    -   we could just use Algolia's search when the user has Internet access and disable search altogether whenever a user does not have Internet access (or even fallback to an invariably poorer in-browser search library)

40. (docs) consider adding support for viewing docs as JSON (similar to Node.js)

    -   <https://nodejs.org/dist/latest-v12.x/docs/api/console.html> and then "View as JSON"
    -   why? in order to provide a consumable public format which can be consumed by IDEs and code editors
    -   would require writing some tooling

41. setup [Matomo](https://matomo.org/) for site analytics as self-hosted alternative to GA

    -   <https://www.linode.com/docs/uptime/analytics/piwik-on-ubuntu-12-04-precise-pangolin/>
    -   <https://www.linode.com/docs/uptime/analytics/open-web-analytics-install-and-launch-on-your-server/>
    -   <https://matomo.org/docs/requirements/>

42. (docs) add "See Also" section to package READMEs

    -   will need to extract this info from the namespace database, similar to how we populate `repl.txt` files during the build process
    -   question: should we create a "REPL" version of the docs (i.e., where we transform the READMEs to elide imports of `stdlib` packages, swapping out example aliases with their respective REPL alias.
    -   This would be another tool => taking a README and converting/transforming it to one which uses `stdlib` aliases.

43. (docs) should we allow viewing a package's dependency graph?

    -   e.g., dependencies and dependants

44. (docs) how (and do) we want to support internationalization?

45. add a `\ping` route to the API docs server to determine whether the server is available (**update**: this has been added)

    -   this route can be used by the API docs application to determine whether a user is "online"
    -   knowing whether a user is "online" could be useful for determining whether a user should be able to run tests and benchmarks which might require pulling in bundles on demand from a remote server. If "offline", we may want to disable those navigational elements. Ditto for search functionality if we opt to use Algolia.
