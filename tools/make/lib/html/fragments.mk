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

# Define the path to a script for building package HTML fragments:
pkg_html_fragments ?= $(TOOLS_DIR)/scripts/api-docs/html_fragments.js


# RULES #

#/
# Builds package HTML fragments.
#
# @example
# make pkg-html-fragments
#/
pkg-html-fragments: $(NODE_MODULES) $(pkg_html_fragments)
	$(QUIET) NODE_PATH="$(NODE_PATH)" $(NODE) "$(pkg_html_fragments)"

.PHONY: pkg-html-fragments
