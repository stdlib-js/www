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

# Define command flags:
FIND_MAKEFILES_FLAGS ?= \
	-name 'Makefile' \
	-o \
	-name '*.mk'


# RULES #

#/
# Prints the runtime value of any variable via `inspect.VARIABLE_NAME`.
#
# @example
# make inspect.FOO
#/
inspect.%:
	$(QUIET) echo '$*=$($*)'

#/
# Asserts that a variable is set via `assert.VARIABLE_NAME`.
#
# @example
# make assert.FOO
#/
assert.%:
	$(QUIET) if [[ "${${*}}" = "" ]]; then \
		echo "\nError: You must set the environment variable: ${*}.\n"; \
		exit 1; \
	fi

#/
# Prints a sorted list of Makefile variable names.
#
# ## Notes
#
# -   To remove duplicates, pipe to `uniq`.
# -   The list of variables is NOT exhaustive, as the list does not include variables which are built-in. These variables could be included by dumping the Makefile database `make -qp`.
#
# @example
# make list-variables
#/
list-variables:
	$(QUIET) find $(TOOLS_MAKE_DIR) $(FIND_MAKEFILES_FLAGS) \
	| xargs grep -e '^[A-Z0-9_]\{1,\} ?=' -e '^[A-Za-z0-9_]\{1,\} :=' \
	| awk '{print $$1}' \
	| sed 's/.*:\(.*\)/\1/' \
	| sort

.PHONY: list-variables
