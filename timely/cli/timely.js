#!/usr/bin/env node

"use strict"




const neodoc = require('neodoc')

const timely = require('../app/timely')






const args = neodoc.run(`
Name:
	timely - count log occurrence over a time-range.
Usage:
	timely [-s <time> | --since <time>] [-u <time> | --until <time>] [-b <group> | --by <group>] [-f <fmt> | --format <fmt>]
	timely (-h | --help | --version)
Version:
	0.1.0
Description:
	*** *** ***
Arguments:
	*** *** ***
Options:
	-b <group>, --by <group>     The time-range to group by. [default: "24h"]
	-s <time>, --since <time>    The start time.
	-u <time>, --until <time>    The end time.
	-f <fmt>, --format <fmt>     The date-format [default: "syslog"].
	-h, --help                   Display this documentation.

`, {
	optionsFirst: true,
	smartOptions: true
})





timely(args)