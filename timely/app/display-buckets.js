
"use strict"




const moment    = require('moment')
const ansi      = require('ansi-styles')

const constants = require('../commons/constants')





const sortBuckets = buckets => {

	return Object.keys(buckets)
		.map(
			bucketId => buckets[bucketId])
		.sort(
			(bucket0, bucket1) => bucket0.bucketDate.getTime( ) - bucket1.bucketDate.getTime( ))

}






const displayBuckets = (buckets, options) => {
	return displayBuckets[options.displayMethod](buckets, options)
}

displayBuckets.json = (buckets, options) => {

	const bucketSummary = sortBuckets(buckets.buckets).map( ({count, bucketDate}) => {

		return {
			time: bucketDate.getTime( ),
			count
		}

	})

	console.log( JSON.stringify({
		buckets:   bucketSummary,
		summary:   {
			startTime:     buckets.dateExtrema.min.getTime( ),
			endTime:       buckets.dateExtrema.max.getTime( ),
			count:         bucketSummary.length,
			bucketSeconds: options.bucket
		}
	}) )

}

displayBuckets.histogram = (buckets) => {

	var partIndex       = Infinity
	const optionalParts = ['YYYY', 'MMM', 'Do']

	optionalParts.forEach((part, index) => {

		const minPart = moment(buckets.dateExtrema.min).format(part)
		const maxPart = moment(buckets.dateExtrema.max).format(part)

		if (minPart !== maxPart) {
			partIndex = index
		}

	})

	const sortedBuckets = sortBuckets(buckets.buckets)
	const maximumCount  = sortedBuckets.reduce((max, current) => {
		return Math.max(max, current.count)
	}, -Infinity)

	const totalCount    = sortedBuckets.reduce((acc, current) => acc + current.count, 0)
	const terminalWidth = 100
	var message         = ''

	sortedBuckets.forEach(bucket => {

		const optionalDateParts = optionalParts.slice(partIndex).map(part => {
			return moment(bucket.bucketDate).format(part)
		}).join(' ')

		message += optionalParts.slice(partIndex).length === 0
			? moment(bucket.bucketDate).format('hh:mm:ss')
			: optionalDateParts + ' ' + moment(bucket.bucketDate).format('hh:mm:ss')

		message += ' '
		const histogramWidth = Math.floor(Math.max(terminalWidth - message.length, 0) * (bucket.count / maximumCount))

		message += constants.characters.fullBar.repeat(histogramWidth) + '\n'

	})

	message += '-'.repeat(terminalWidth) + '\n'

	message += ansi.cyan.open + 'max matches:\t'   + ansi.cyan.close + maximumCount + '\n'
	message += ansi.cyan.open + 'total matches:\t' + ansi.cyan.close + totalCount + '\n'
	message += ansi.cyan.open + 'start date:\t'    + ansi.cyan.close + moment(buckets.dateExtrema.min).format('YYYY MMM Do hh:mm:ss') + '\n'
	message += ansi.cyan.open + 'end date:\t'      + ansi.cyan.close + moment(buckets.dateExtrema.max).format('YYYY MMM Do hh:mm:ss') + '\n'

	console.log(message)

	return message.split('\n').length

}






module.exports = displayBuckets
