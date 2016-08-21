
"use strict"




const moment = require('moment')





const displayBuckets = (buckets, options) => {
	displayBuckets[options.displayMethod](buckets, options)
}

displayBuckets.json = (buckets, options) => {

	const bucketSummary = Object.keys(buckets.buckets)
		.map(
			bucketId => buckets.buckets[bucketId])
		.sort(
			(bucket0, bucket1) => bucket0.bucketDate.getTime( ) - bucket1.bucketDate.getTime( ))
		.map( ({count, bucketDate}) => {

			return {
				time: bucketDate.getTime( ),
				count
			}

		} )

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





module.exports = displayBuckets
