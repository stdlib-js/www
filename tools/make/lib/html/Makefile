#/
# @license Apache-2.0
#
# Copyright (c) 2021 The Stdlib Authors.
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

# VARIABLES #

# Define the path to the script for generating minified HTML files:
HTML_MINIFIER ?= $(BIN_DIR)/html-minifier-terser

# Define command-line options when invoking the HTML minifier executable:
HTML_MINIFIER_FLAGS ?= \
	--remove-comments \
	--collapse-whitespace \
	--remove-empty-elements \
	--minify-css true \
	--minify-js true


# RULES #

#/
# Minifies HTML source files.
#
# @example
# make html-minify
#/
html-minify: $(HTML_MINIFIER) $(NODE_MODULES)
	$(QUIET) $(FIND_HTML_CMD) | grep '^[\/]\|^[a-zA-Z]:[/\]' | while read -r file; do \
		echo ""; \
		echo "Minifying file: $$file"; \
		NODE_PATH="$(NODE_PATH)" \
		$(NODE) "$(HTML_MINIFIER)" \
			$$file \
			$(HTML_MINIFIER_FLAGS) \
			--output $$file || exit 1; \
	done

.PHONY: html-minify
