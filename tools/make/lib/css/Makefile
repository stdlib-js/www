
# VARIABLES #

# Define the path to the script for generating minified CSS bundles:
CSS_MINIFIER ?= $(TOOLS_DIR)/scripts/minify_css.js


# TARGETS #

# Minify CSS.
#
# This target minifies CSS source files.

css-minify: $(CSS_MINIFIER)
	$(QUIET) $(NODE) $(CSS_MINIFIER)

.PHONY: css-minify
