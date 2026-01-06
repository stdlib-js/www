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

include $(TOOLS_MAKE_LIB_DIR)/docs/api/app.mk
include $(TOOLS_MAKE_LIB_DIR)/docs/api/app_resources.mk
include $(TOOLS_MAKE_LIB_DIR)/docs/api/typescript.mk


# RULES #

#/
# Builds the API documentation.
#
# @example
# make api-docs
#
# @example
# make api-docs STDLIB_BRANCH=v0.2.0
#/
api-docs: api-docs-app api-docs-ts api-docs-resources

.PHONY: api-docs

#/
# Deletes API documentation artifacts.
#
# @example
# make clean-api-docs
#/
clean-api-docs: clean-api-docs-app clean-api-docs-ts

.PHONY: clean-api-docs
