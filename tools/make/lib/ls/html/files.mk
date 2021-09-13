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

# Define the command flags:
FIND_HTML_FLAGS ?= \
	-type f \
	-name "$(HTML_PATTERN)" \
	-regex "$(HTML_FILTER)" \
	$(FIND_HTML_EXCLUDE_FLAGS)

ifneq ($(OS), Darwin)
	FIND_HTML_FLAGS := -regextype posix-extended $(FIND_HTML_FLAGS)
endif

# Define a command for listing HTML files:
FIND_HTML_CMD ?= find $(find_kernel_prefix) $(ROOT_DIR) $(FIND_HTML_FLAGS)

# Define the list of files:
HTML_FILES ?= $(shell $(FIND_HTML_CMD))


# RULES #

#/
# Lists all HTML files.
#
# @example
# make list-html-files
#/
list-html-files:
	$(QUIET) find $(find_kernel_prefix) $(ROOT_DIR) $(FIND_HTML_FLAGS) $(find_print_list)

.PHONY: list-html-files
