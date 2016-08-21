#!/usr/bin/env node

"use strict"




const neodoc = require('neodoc')

const timely = require('../app/timely')






const args = neodoc.run(`
Name:
	timely - summarise timestamped text-occurrence over a time-range.
Usage:
	timely [-s <time> | --since <time>] [-u <time> | --until <time>] [-b <group> | --by <group>] [-f <fmt> | --format <fmt>] [-d <str> | --display <str>]
	timely (-h | --help | --version)
Version:
	0.1.0
Description:
	*** *** ***
Arguments
	*** *** ***
Options:
	-b <group>, --by <group>     The size of each 'bucket' in seconds. [default: "24h"]
	                               valid units are 's', 'm', and 'h'. Seconds are used by default.
	-s <time>, --since <time>    The time from which to include lines. By default, this is set to the start of UNIX-time, 1970.
	-u <time>, --until <time>    The time after which to exclude lines. By default, this is set to the start of UNIX-time, 1970.
	-f <fmt>, --format <fmt>     The time format. [default: "syslog"]
	-d <str>, --display <str>    The method by which to display the summarised input. [default: "json"]
	-h, --help                   Display this documentation.

`, {
	optionsFirst: true,
	smartOptions: true
})





timely(args)
