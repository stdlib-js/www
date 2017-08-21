
# DEPENDENCIES #

# Order is important:
include $(TOOLS_MAKE_DIR)/common.mk
include $(TOOLS_MAKE_LIB_DIR)/help/Makefile
include $(TOOLS_MAKE_LIB_DIR)/init/Makefile

# Please keep sorted in alphabetical order:
include $(TOOLS_MAKE_LIB_DIR)/contributors/Makefile
include $(TOOLS_MAKE_LIB_DIR)/debug/Makefile
include $(TOOLS_MAKE_LIB_DIR)/docs/Makefile
include $(TOOLS_MAKE_LIB_DIR)/install/Makefile
include $(TOOLS_MAKE_LIB_DIR)/licenses/Makefile
include $(TOOLS_MAKE_LIB_DIR)/ls/Makefile
include $(TOOLS_MAKE_LIB_DIR)/node/Makefile
include $(TOOLS_MAKE_LIB_DIR)/notes/Makefile


# TARGETS #

# Default target.
#
# This target is the default target.

all: help

.PHONY: all


# Perform clean-up.
#
# This target runs the project's cleanup sequence.

clean: clean-node
	$(QUIET) $(DELETE) $(DELETE_FLAGS) $(BUILD_DIR)

.PHONY: clean
