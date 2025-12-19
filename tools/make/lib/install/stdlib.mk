#/
# @license Apache-2.0
#
# Copyright (c) 2025 The Stdlib Authors.
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

# Compute the output directory name:
ifeq ($(STDLIB_BRANCH),develop)
	stdlib_docs_folder := latest
else
	stdlib_docs_folder := $(subst /,-,$(STDLIB_BRANCH))
endif

# Define the installation path:
STDLIB_OUT ?= $(TMP_DIR)/stdlib/$(stdlib_docs_folder)

# Define a path to packages within a stdlib installation:
stdlib_path := $(STDLIB_OUT)/lib/node_modules


# RULES #

#/
# Installs stdlib.
#
# @private
#/
$(STDLIB_OUT):
	$(QUIET) echo "Cloning stdlib branch: $(STDLIB_BRANCH) -> $(stdlib_docs_folder)"
	$(QUIET) $(GIT) clone https://github.com/stdlib-js/stdlib.git --depth=1 --branch=$(STDLIB_BRANCH) "$(STDLIB_OUT)"
	$(QUIET) cd "$(STDLIB_OUT)" && $(MAKE) install-node-modules

#/
# Installs a stdlib version.
#
# @example
# make install-stdlib
#
# @example
# make install-stdlib STDLIB_BRANCH=v0.2.0
#/
install-stdlib: $(STDLIB_OUT)

.PHONY: install-stdlib

#/
# Removes a stdlib version.
#
# @example
# make clean-stdlib
#
# @example
# make clean-stdlib STDLIB_BRANCH=v0.2.0
#/
clean-stdlib:
	$(QUIET) $(DELETE) $(DELETE_FLAGS) $(STDLIB_OUT)

.PHONY: clean-stdlib
