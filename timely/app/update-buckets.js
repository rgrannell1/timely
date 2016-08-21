
"use strict"




const updateBuckets = (buckets, parsedRecord) => {

	const recordTime = parsedRecord.date

	buckets.extrema.min = Math.min(buckets.extrema.min, parsedRecord.bucket)
	buckets.extrema.max = Math.max(buckets.extrema.max, parsedRecord.bucket)

	if (buckets.buckets.hasOwnProperty(parsedRecord.bucket)) {

		buckets.buckets[parsedRecord.bucket].count++

	} else {

		buckets.buckets[parsedRecord.bucket] = {
			count:      1,
			bucketDate: parsedRecord.bucketDate
		}

	}

	console.log(JSON.stringify(buckets))

}





module.exports = updateBuckets
