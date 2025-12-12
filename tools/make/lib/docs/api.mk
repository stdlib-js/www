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

# Branch/tag to clone and build docs for:
STDLIB_BRANCH ?= develop

# Compute the output directory name from the branch:
ifeq ($(STDLIB_BRANCH),develop)
	STDLIB_DOCS_FOLDER := latest
else
	STDLIB_DOCS_FOLDER := $(subst /,-,$(STDLIB_BRANCH))
endif

# Path where stdlib will be cloned:
STDLIB_PATH ?= $(NODE_MODULES)/@stdlib/stdlib


# DEPENDENCIES #

include $(TOOLS_MAKE_LIB_DIR)/docs/app.mk
include $(TOOLS_MAKE_LIB_DIR)/docs/app_resources.mk
include $(TOOLS_MAKE_LIB_DIR)/docs/typescript.mk


# RULES #

#/
# Clones the specified stdlib version for documentation building.
#
# @example
# make clone-stdlib-version
#
# @example
# make clone-stdlib-version STDLIB_BRANCH=v0.2.0
#/
clone-stdlib-version:
	$(QUIET) echo "Cloning stdlib branch: $(STDLIB_BRANCH) -> $(STDLIB_DOCS_FOLDER)"
	$(QUIET) $(DELETE) $(DELETE_FLAGS) $(STDLIB_PATH)
	$(QUIET) $(GIT) clone https://github.com/stdlib-js/stdlib.git --depth=1 --branch=$(STDLIB_BRANCH) "$(STDLIB_PATH)"
	$(QUIET) cd "$(STDLIB_PATH)" && $(MAKE) install-node-modules

.PHONY: clone-stdlib-version

#/
# Builds the API documentation.
#
# @example
# make api-docs
#
# @example
# make api-docs STDLIB_BRANCH=v0.2.0
#/
api-docs: clone-stdlib-version api-docs-app api-docs-ts api-docs-resources

.PHONY: api-docs

#/
# Deletes API documentation artifacts.
#
# @example
# make clean-api-docs
#/
clean-api-docs: clean-api-docs-app clean-api-docs-ts

.PHONY: clean-api-docs
