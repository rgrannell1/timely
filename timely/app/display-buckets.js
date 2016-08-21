
"use strict"




const moment    = require('moment')

const constants = require('../commons/constants')





const sortBuckets = buckets => {

	return Object.keys(buckets)
		.map(
			bucketId => buckets[bucketId])
		.sort(
			(bucket0, bucket1) => bucket0.bucketDate.getTime( ) - bucket1.bucketDate.getTime( ))

}






const displayBuckets = (buckets, options) => {
	displayBuckets[options.displayMethod](buckets, options)
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
			startTime:     buckets.extrema.min.getTime( ),
			endTime:       buckets.extrema.max.getTime( ),
			count:         bucketSummary.length,
			bucketSeconds: options.bucket
		}
	}) )

}

displayBuckets.histogram = (buckets, options) => {

	var partIndex = Infinity
	const optionalParts = ['YYYY', 'MMM', 'Do']

	optionalParts.forEach((part, index) => {

		const minPart = moment(buckets.extrema.min).format(part)
		const maxPart = moment(buckets.extrema.max).format(part)

		if (minPart !== maxPart) {
			partIndex = index
		}

	})

	const sortedBuckets = sortBuckets(buckets.buckets)
	const maximumCount  = sortedBuckets.reduce((max, current) => {
		return Math.max(max, current.count)
	}, -Infinity)

	const terminalWidth = 100

	sortedBuckets.forEach(bucket => {

		const width = Math.floor(terminalWidth * (bucket.count / maximumCount))

		var message = ''

		const optionalDateParts = optionalParts.slice(partIndex).map(part => {
			return moment(bucket.bucketDate).format(part)
		}).join(' ')

		message += optionalParts.slice(partIndex).length === 0
			? moment(bucket.bucketDate).format('hh:mm:ss')
			: optionalDateParts + ' ' + moment(bucket.bucketDate).format('hh:mm:ss')

		message += ' ' + constants.characters.fullBar.repeat(width)

		console.log(message)

	})

}






module.exports = displayBuckets
