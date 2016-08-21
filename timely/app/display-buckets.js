
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

	const totalCount = sortedBuckets.reduce((acc, current) => acc + current.count, 0)

	const terminalWidth = 100

	sortedBuckets.forEach(bucket => {


		var message = ''

		const optionalDateParts = optionalParts.slice(partIndex).map(part => {
			return moment(bucket.bucketDate).format(part)
		}).join(' ')

		message += optionalParts.slice(partIndex).length === 0
			? moment(bucket.bucketDate).format('hh:mm:ss')
			: optionalDateParts + ' ' + moment(bucket.bucketDate).format('hh:mm:ss')

		message += ' '
		const histogramWidth = Math.floor(Math.max(terminalWidth - message.length, 0) * (bucket.count / maximumCount))

		if (histogramWidth === 0) {
			console.error('terminal too narrow!')
			process.exit(1)
		}

		message += constants.characters.fullBar.repeat(histogramWidth)

		console.log(message)

	})

	console.log('-'.repeat(terminalWidth))
	console.log(`max matches:\t${maximumCount}`)
	console.log(`total matches:\t${totalCount}`)
	console.log(`start date:\t${ moment(buckets.extrema.min).format('YYYY MMM Do hh:mm:ss') }`)
	console.log(`end date:\t${   moment(buckets.extrema.max).format('YYYY MMM Do hh:mm:ss') }`)

}






module.exports = displayBuckets
