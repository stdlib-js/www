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

# R2 bucket name:
R2_BUCKET_NAME ?= stdlib-docs

# Path to documentation files to upload:
DOCS_PATH ?= $(WWW_DIR)/docs

# R2 destination prefix:
R2_DEST_PREFIX ?= docs

# R2 remote name (configured in rclone):
R2_REMOTE_NAME ?= r2


# RULES #

#/
# Uploads documentation files to R2 bucket using rclone.
#
# This uses rclone for fast, concurrent uploads with automatic retry and
# resume capabilities. Configuration can be done via environment variables
# or rclone config file.
#
# Prerequisites:
# - rclone installed (brew install rclone)
# - R2 credentials configured either via:
#   1. Environment variables (recommended for CI/CD):
#      RCLONE_CONFIG_R2_TYPE=s3
#      RCLONE_CONFIG_R2_PROVIDER=Cloudflare
#      RCLONE_CONFIG_R2_ACCESS_KEY_ID=<your-access-key-id>
#      RCLONE_CONFIG_R2_SECRET_ACCESS_KEY=<your-secret-key>
#      RCLONE_CONFIG_R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
#   2. Or run: rclone config (for local development)
#
# @param {string} [DOCS_PATH] - path to documentation directory (default: public/docs)
# @param {string} [R2_BUCKET_NAME] - R2 bucket name (default: stdlib-docs)
# @param {string} [R2_DEST_PREFIX] - destination prefix in R2 (default: docs)
# @param {string} [R2_REMOTE_NAME] - rclone remote name (default: r2)
#
# @example
# make push-docs-to-r2
#
# @example
# make push-docs-to-r2 DOCS_PATH=public/docs/api
#
# @example
# make push-docs-to-r2 R2_BUCKET_NAME=my-bucket R2_DEST_PREFIX=api
#/
push-docs-to-r2:
	$(QUIET) echo "Uploading documentation from $(DOCS_PATH) to R2 bucket $(R2_BUCKET_NAME)/$(R2_DEST_PREFIX)..."
	$(QUIET) if [ ! -d "$(DOCS_PATH)" ]; then \
		echo "Error: Documentation path $(DOCS_PATH) does not exist"; \
		exit 1; \
	fi
	$(QUIET) if ! command -v rclone >/dev/null 2>&1; then \
		echo "Error: rclone not found. Install with: brew install rclone"; \
		echo "Or visit: https://rclone.org/install/"; \
		exit 1; \
	fi
	$(QUIET) echo "Syncing files to R2 using rclone..."
	$(QUIET) if [ -f "$(ROOT_DIR)/.env.local" ]; then \
		set -a && . "$(ROOT_DIR)/.env.local" && set +a && \
		rclone sync "$(DOCS_PATH)/" "$(R2_REMOTE_NAME):$(R2_BUCKET_NAME)/$(R2_DEST_PREFIX)/" \
			--progress \
			--stats-one-line; \
	else \
		rclone sync "$(DOCS_PATH)/" "$(R2_REMOTE_NAME):$(R2_BUCKET_NAME)/$(R2_DEST_PREFIX)/" \
			--progress \
			--stats-one-line; \
	fi
	$(QUIET) echo "Upload complete!"

.PHONY: push-docs-to-r2
