#!/usr/bin/env bash
#
# A utility to resolve `include` statements and inject file contents into a specified configuration file.
#
# ## Notes
#
# * This utility is useful when debugging nginx configuration files and/or providing a single configuration file for deployment.
# * In order to resolve relative `include` statements, you must invoke this script in the directory in which the configuration file is located.
#


# VARIABLES #

# Determine the script name:
script_name="${0##*/}"

# Initialize a file list:
files=()


# FUNCTIONS #

# Defines an error handler.
#
# $1 - error status
on_error() {
	cleanup
	exit "$1"
}

# Runs clean-up tasks.
cleanup() {
	echo '' >&2
}

# Prints usage information.
usage() {
	echo '' >&2
	echo "Usage: ${script_name} [options] filename" >&2
	echo '' >&2
	echo 'Replace include statements with the included files. The primary use case for' >&2
	echo 'this script is to debug nginx configuration files and/or to provide a single' >&2
	echo 'configuration file for distribution/deployment.' >&2
	echo '' >&2
	echo 'Options:' >&2
	echo '' >&2
	echo '  -h,    --help                Print this message.' >&2
	echo '' >&2
	echo 'Example:' >&2
	echo '' >&2
	echo '  $ cd /etc/nginx' >&2
	echo "  \$ ${script_name} nginx.conf" >&2
	echo '' >&2
}

# Main execution sequence.
#
# $1 - files
main() {
	echo "### $1 START"
	while read line; do
		if [[ "${line}" =~ "#" ]]; then
			# Skip comments...
			continue
		elif [[ "${line}" =~ "^ *$" ]]; then
			# Skip blank lines...
			continue
		elif [[ "${line}" =~ ^(\s*)include\s*(.*)\; ]]; then
			main ${BASH_REMATCH[2]}
		else
			echo "${line}"
		fi
	done < "$1"
	echo "### $1 END"
}

# Parse command-line options...
while [[ -n "$1" ]]; do
	case "$1" in
		'-h' | '--help')
			usage
			exit 0
			;;

		'--')
			# End of all options:
			shift
			break
			;;

		-?*)
			printf 'ERROR: unknown option: %s\n' "$1" >&2
			on_error 1
			;;
		*)
			# Default case (e.g., if no more options) is a file name:
			files+=("$1")
			;;
	esac
	shift
done

# If we are not provided one or more configuration files, print the help text...
if [[ "${#files[@]}" -eq 0 ]]; then
	usage
	exit 0
fi

# Run main:
main "${files}"
