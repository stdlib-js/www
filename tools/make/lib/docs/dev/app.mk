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

# VARIABLES #

# Define the path to a script for building the developer docs application:
dev_docs_app ?= $(TOOLS_DIR)/scripts/dev-docs/app.js


# RULES #

#/
# Builds the developer documentation application.
#
# @example
# make dev-docs-app
#/
dev-docs-app: $(NODE_MODULES) $(stdlib_path) $(dev_docs_app) clean-dev-docs-app
	$(QUIET) NODE_PATH="$(stdlib_path)" STDLIB_DIR="$(STDLIB_OUT)" $(NODE) "$(dev_docs_app)"

.PHONY: dev-docs-app

#/
# Deletes developer documentation application artifacts.
#
# @example
# make clean-dev-docs-app
#/
clean-dev-docs-app:
	$(QUIET) $(DELETE) $(DELETE_FLAGS) \
		$(WWW_DIR)/docs/dev/static \
		$(WWW_DIR)/docs/dev/service-worker.js \
		$(WWW_DIR)/docs/dev/precache-manifest.*.js \
		$(WWW_DIR)/docs/dev/index.html \
		$(WWW_DIR)/docs/dev/asset-manifest.json

.PHONY: clean-dev-docs-app
