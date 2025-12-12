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

# RULES #

#/
# Builds the TypeScript API documentation.
#
# @example
# make api-docs-ts
#/
api-docs-ts: $(NODE_MODULES) clean-api-docs-ts
	$(QUIET) cd $(NODE_MODULES)/@stdlib/stdlib && $(MAKE) typedoc-html
	$(QUIET) cd $(ROOT_DIR)
	$(QUIET) mv $(NODE_MODULES)/@stdlib/stdlib/build/docs/typedoc/static $(WWW_DIR)/docs/ts/$(STDLIB_DOCS_FOLDER)

.PHONY: api-docs-ts

#/
# Deletes TypeScript API documentation artifacts.
#
# @example
# make clean-api-docs-ts
#/
clean-api-docs-ts:
	$(QUIET) $(DELETE) $(DELETE_FLAGS) $(WWW_DIR)/docs/ts/$(STDLIB_DOCS_FOLDER)

.PHONY: clean-api-docs-ts
