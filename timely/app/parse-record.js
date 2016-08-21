
"use strict"





const moment    = require('moment')
const chrono    = require('chrono-node')

const constants = require('../commons/constants')





const parseRecord = (line, options) => {

	const matches = line.match(constants.timestamps[options.format].regex)

	if (matches.length > 0) {

		const firstMatch = matches[0]

		try {

			const parsedDate    = chrono.parseDate(firstMatch)
			const timeInSeconds = Math.floor(parsedDate.getTime( ) / 1000)
			const bucket        = Math.floor(timeInSeconds / options.bucket)
			const remainder     = timeInSeconds % options.bucket

			const bucketDate    = new Date(1000 * (timeInSeconds - remainder))

			return {
				date: parsedDate,
				bucket,
				bucketDate
			}

		} catch (err) {

			console.error(err.message)

		}

	}

}





module.exports = parseRecord
