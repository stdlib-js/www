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

# Define keywords identifying annotations:
KEYWORDS ?= 'TODO|FIXME|WARNING|HACK|NOTE|OPTIMIZE'

# Define the command for finding notes:
FIND_NOTES ?= grep

# Define the command-line options:
FIND_NOTES_FLAGS ?= -Ern

# Define the search directory:
FIND_NOTES_DIR ?= $(ROOT_DIR)


# RULES #

#/
# Enumerate all annotations.
#
# ## Notes
#
# -   This target searches for annotated comments which indicate work that remains to be completed. Annotated comments will be output, along with the filename and line number where they appear.
#
# @example
# make notes
#/
notes:
	$(QUIET) $(FIND_NOTES) $(FIND_NOTES_FLAGS) $(KEYWORDS) $(FIND_NOTES_DIR) \
		--exclude-dir "$(NODE_MODULES)/*" \
		--exclude-dir "$(BUILD_DIR)/*" \
		--exclude-dir "$(REPORTS_DIR)/*" \
		--exclude-dir "$(WWW_DIR)/*" \
		--exclude "$(this_file)" \
		--exclude "$(ROOT_DIR)/.*" \
		--exclude TODO.md

.PHONY: notes
