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

# Define the path to the Makefile usage text file for displaying help information:
MAKE_USAGE ?= $(TOOLS_MAKE_DIR)/usage.txt

# Define command flags:
FIND_MAKEFILES_FLAGS ?= \
	-name 'Makefile' \
	-o \
	-name '*.mk'


# RULES #

#/
# Prints a help message and lists available targets.
#
# @example
# make help
#/
help:
	$(QUIET) $(CAT) $(MAKE_USAGE)

.PHONY: help

#/
# Lists all Makefile targets.
#
# ## Notes
#
# -   The list of targets is NOT exhaustive, as it does not include targets which have not been explicitly declared PHONY targets and does not include targets declared via variables. These targets could be included by dumping the Makefile database `make -qp`, but not seen as necessary due to predominant use of PHONY.
#
# @example
# make list-targets
#/
list-targets:
	$(QUIET) find $(TOOLS_MAKE_DIR) $(FIND_MAKEFILES_FLAGS) \
	| xargs grep '^.PHONY: ' \
	| awk '{print $$2}' \
	| sort

.PHONY: list-targets
