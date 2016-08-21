
"use strict"





const userFailingErrorMesasage = `Something has went terribly wrong!
Please report the following error message to https://github.com/rgrannell1/kale/issues,
(along with the input text if possible):
`

process.on('uncaughtException', err => {

	console.error(userFailingErrorMesasage)

	console.error(err.message)
	console.error(err.stack)

	process.exit(1)

})





const constants   = require('../commons/constants')
const readStdin   = require('../fs/read-file-stream')
const parseRecord = require('../app/parse-record')

const events    = require('events')





const timely = rawArgs => {

	const emitter = new events.EventEmitter( )
	const args    = timely.preprocess(rawArgs)

	if (args.version) {

		console.log(constants.packageJson.version)
		process.exit(0)

	}

	readStdin(line => {

		parseRecord(line)

	})

	return emitter

}

timely.preprocess = rawArgs => {

	return {
		by: timely.preprocess.by(rawArgs['--by'])
	}

}

timely.preprocess.by = bySelector => {

	const units = Object.keys(constants.timeBucketUnit)
		.filter(unit => bySelector.endsWith(unit))

	const unit = units.length === 0
		? units[0]
		: 's'

	const conversion = constants.timeBucketUnit[unit]
	const quantity   = bySelector.match(/^[0-9]+/)

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
