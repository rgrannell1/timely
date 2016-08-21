
"use strict"





const userFailingErrorMesasage = `Something has went terribly wrong!
Please report the following error message to https://github.com/rgrannell1/timely/issues,
(along with the input text if possible):
`

process.on('uncaughtException', err => {

	console.error(userFailingErrorMesasage)

	console.error(err.message)
	console.error(err.stack)

	process.exit(1)

})





const constants     = require('../commons/constants')
const readStdin     = require('../fs/read-file-stream')
const updateBuckets = require('../app/update-buckets')
const parseRecord   = require('../app/parse-record')





const timely = rawArgs => {

	const args = timely.preprocess(rawArgs)

	if (args.version) {

		console.log(constants.packageJson.version)
		process.exit(0)

	}

	const buckets = {
		buckets: {

		},
		extrema: {
			max: -Infinity,
			min: +Infinity
		}
	}

	readStdin(line => {
		updateBuckets( buckets, parseRecord(line, {
			format: args.format,
			bucket: args.by.seconds
		}) )
	})

}

timely.preprocess = rawArgs => {

	return {
		by:     timely.preprocess.by(rawArgs['--by']),
		format: rawArgs['--format']
	}

}

timely.preprocess.by = selector => {

	const units = Object.keys(constants.timeBucketUnit).filter(unit => selector.endsWith(unit))
	const unit  = units.length === 0
		? units[0]
		: constants.defaultUnit

	const conversion = constants.timeBucketUnit[unit]
	const quantity   = selector.match(/^[0-9]+/)

	if (quantity.length === 0) {

		console.error('no quantity provided.')
		process.exit(1)

	} else {

		return {
			unit,
			conversion,
			seconds: conversion * parseInt(quantity[0], 10)
		}

	}

}





module.exports = timely
