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

# Define the path to a script for building the API docs application:
api_docs_app ?= $(TOOLS_DIR)/scripts/api-docs/app.js


# RULES #

#/
# Builds the API documentation application.
#
# @example
# make api-docs-app
#/
api-docs-app: $(NODE_MODULES) $(stdlib_path) $(api_docs_app) clean-api-docs-app
	$(QUIET) NODE_PATH="$(stdlib_path)" STDLIB_DIR="$(STDLIB_OUT)" STDLIB_VERSION="$(stdlib_docs_folder)" $(NODE) "$(api_docs_app)"

.PHONY: api-docs-app

#/
# Deletes API documentation application artifacts.
#
# @example
# make clean-api-docs-app
#/
clean-api-docs-app:
	$(QUIET) $(DELETE) $(DELETE_FLAGS) \
		$(WWW_DIR)/docs/api/static \
		$(WWW_DIR)/docs/api/service-worker.js \
		$(WWW_DIR)/docs/api/precache-manifest.*.js \
		$(WWW_DIR)/docs/api/index.html \
		$(WWW_DIR)/docs/api/asset-manifest.json

.PHONY: clean-api-docs-app
