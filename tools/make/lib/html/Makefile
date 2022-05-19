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

# DEPENDENCIES #

include $(TOOLS_MAKE_LIB_DIR)/html/fragments.mk
include $(TOOLS_MAKE_LIB_DIR)/html/minify.mk


# RULES #

#/
# Builds package HTML files.
#
# @example
# make pkg-html
#/
pkg-html: pkg-html-fragments
	$(QUIET) NODE_PATH="$(NODE_PATH)" HTML_FILTER='.*/docs/api/latest/\@stdlib/.*' $(MAKE) -f $(this_file) html-minify

.PHONY: pkg-html
