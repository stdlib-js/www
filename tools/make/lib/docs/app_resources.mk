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

# Define the path to a script for generating a package tree:
api_docs_pkg_tree ?= $(TOOLS_DIR)/scripts/api-docs/pkg_tree.js

# Define the path to a script for generating a package tree array:
api_docs_pkg_tree_array ?= $(TOOLS_DIR)/scripts/api-docs/pkg_tree_array.js

# Define the path to a script for generating a package list:
api_docs_pkg_list ?= $(TOOLS_DIR)/scripts/api-docs/pkg_list.js

# Define the path to a script for generating a package order hash:
api_docs_pkg_order ?= $(TOOLS_DIR)/scripts/api-docs/pkg_order.js

# Define the path to a script for generating a hash of package descriptions:
api_docs_pkg_desc ?= $(TOOLS_DIR)/scripts/api-docs/pkg_desc.js

# Define the path to a script for generating a namespace package list:
api_docs_namespace_list ?= $(TOOLS_DIR)/scripts/api-docs/namespace_list.js

# Define the path to a script for generating a search index:
api_docs_pkg_search_index ?= $(TOOLS_DIR)/scripts/api-docs/pkg_search_index.js

# Define the path to a script for generating a package resources database:
api_docs_pkg_resources ?= $(TOOLS_DIR)/scripts/api-docs/pkg_resources.js

# Define the path to a script for generating package data:
api_docs_pkg_data ?= $(TOOLS_DIR)/scripts/api-docs/pkg_data.js

# Define the path to a script for generating a list of documentation versions:
api_docs_version_list ?= $(TOOLS_DIR)/scripts/api-docs/version_list.js


# RULES #

#/
# Generates documentation application resources.
#
# ## Notes
#
# -   For performance, may be better to run each prerequisite individually in separate terminal windows. Running sequentially will invariably take longer than running in parallel.
#
# @example
# make api-docs-resources
#/
api-docs-resources: api-docs-pkg-tree api-docs-pkg-tree-array api-docs-pkg-list api-docs-pkg-order api-docs-namespace-list api-docs-pkg-resources api-docs-pkg-desc api-docs-pkg-search-index api-docs-version-list api-docs-pkg-data

#/
# Generates a package tree.
#
# @example
# make api-docs-pkg-tree
#/
api-docs-pkg-tree: $(NODE_MODULES) $(api_docs_pkg_tree)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_pkg_tree)"

.PHONY: api-docs-pkg-tree

#/
# Generates a package tree array.
#
# @example
# make api-docs-pkg-tree-array
#/
api-docs-pkg-tree-array: $(NODE_MODULES) $(api_docs_pkg_tree_array)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_pkg_tree_array)"

.PHONY: api-docs-pkg-tree-array

#/
# Generates a package list.
#
# @example
# make api-docs-pkg-list
#/
api-docs-pkg-list: $(NODE_MODULES) $(api_docs_pkg_list)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_pkg_list)"

.PHONY: api-docs-pkg-list

#/
# Generates a package order hash.
#
# @example
# make api-docs-pkg-order
#/
api-docs-pkg-order: $(NODE_MODULES) $(api_docs_pkg_order)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_pkg_order)"

.PHONY: api-docs-pkg-order

#/
# Generates a hash containing package descriptions.
#
# @example
# make api-docs-pkg-desc
#/
api-docs-pkg-desc: $(NODE_MODULES) $(api_docs_pkg_desc)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_pkg_desc)"

.PHONY: api-docs-pkg-desc

#/
# Generates a list of namespace packages.
#
# @example
# make api-docs-namespace-list
#/
api-docs-namespace-list: $(NODE_MODULES) $(api_docs_namespace_list)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_namespace_list)"

.PHONY: api-docs-namespace-list

#/
# Generates a package search index.
#
# @example
# make api-docs-pkg-search-index
#/
api-docs-pkg-search-index: $(NODE_MODULES) $(api_docs_pkg_search_index)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_pkg_search_index)"

.PHONY: api-docs-pkg-search-index

#/
# Generates a package resource database.
#
# @example
# make api-docs-pkg-resources
#/
api-docs-pkg-resources: $(NODE_MODULES) $(api_docs_pkg_resources)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_pkg_resources)"

.PHONY: api-docs-pkg-resources

#/
# Generates a combined JSON dataset containing package data.
#
# @example
# make api-docs-pkg-data
#/
api-docs-pkg-data: $(NODE_MODULES) $(api_docs_pkg_data)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_pkg_data)"

.PHONY: api-docs-pkg-data

#/
# Generates a list of documentation versions.
#
# @example
# make api-docs-version-list
#/
api-docs-version-list: $(NODE_MODULES) $(api_docs_version_list)
	$(QUIET) NODE_PATH="$(NODE_PATH)" STDLIB_DOCS_DIRNAME="$(STDLIB_DOCS_DIRNAME)" $(NODE) "$(api_docs_version_list)"

.PHONY: api-docs-version-list
