
# VARIABLES #

# Determine the filename:
this_file := $(lastword $(MAKEFILE_LIST))

# Determine the absolute path of the Makefile (see http://blog.jgc.org/2007/01/what-makefile-am-i-in.html):
this_dir := $(dir $(CURDIR)/$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST)))

# Remove the trailing slash:
this_dir := $(patsubst %/,%,$(this_dir))

# Define the root project directory:
ROOT_DIR ?= $(this_dir)

# Define the root tools directory:
TOOLS_DIR ?= $(ROOT_DIR)/tools

# Define the directory containing the entry point for Makefile dependencies:
TOOLS_MAKE_DIR ?= $(TOOLS_DIR)/make

# Define the subdirectory containing Makefile dependencies:
TOOLS_MAKE_LIB_DIR ?= $(TOOLS_MAKE_DIR)/lib

# Define the root build directory:
BUILD_DIR ?= $(ROOT_DIR)/build

# Define the directory for writing reports:
REPORTS_DIR ?= $(ROOT_DIR)/reports

# Define the root directory for storing temporary files:
TMP_DIR ?= $(ROOT_DIR)/tmp

# Define the root configuration directory:
CONFIG_DIR ?= $(ROOT_DIR)/etc

# Define the root directory for documentation:
DOCS_DIR ?= $(ROOT_DIR)/docs

# Define the directory for public WWW assets:
WWW_DIR ?= $(ROOT_DIR)/public

# Define the top-level directory containing executables:
LOCAL_BIN_DIR ?= $(ROOT_DIR)/bin

# Define the top-level directory containing node module dependencies:
NODE_MODULES ?= $(ROOT_DIR)/node_modules

# Define the top-level directory containing node module executables:
BIN_DIR ?= $(NODE_MODULES)/.bin

# Define the folder name convention for executables:
BIN_FOLDER ?= bin

# Define the folder name convention for documentation files:
DOCUMENTATION_FOLDER ?= docs

# Define the folder name convention for configuration files:
CONFIG_FOLDER ?= etc

# Define the folder name convention for build artifacts:
BUILD_FOLDER ?= build

# Define the folder name convention for temporary files:
TMP_FOLDER ?= tmp

# Define Node paths:
NODE_PATH ?= $(ROOT_DIR)


# DEPENDENCIES #

include $(TOOLS_MAKE_DIR)/Makefile
