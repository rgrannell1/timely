
"use strict"




const updateBuckets = (buckets, parsedRecord) => {

	buckets.extrema = {

		min: buckets.extrema.min.getTime( ) < parsedRecord.bucketDate.getTime( )
			? buckets.extrema.min
			: parsedRecord.bucketDate,

		max: buckets.extrema.max.getTime( ) > parsedRecord.bucketDate.getTime( )
			? buckets.extrema.max
			: parsedRecord.bucketDate

	}

	buckets.dateExtrema = {

		min: buckets.extrema.min.getTime( ) < parsedRecord.date.getTime( )
			? buckets.extrema.min
			: parsedRecord.date,

		max: buckets.extrema.max.getTime( ) > parsedRecord.date.getTime( )
			? buckets.extrema.max
			: parsedRecord.date

	}

	if (buckets.buckets.hasOwnProperty(parsedRecord.bucket)) {

		buckets.buckets[parsedRecord.bucket].count++

	} else {

		buckets.buckets[parsedRecord.bucket] = {
			count:      1,
			bucketDate: parsedRecord.bucketDate
		}

	}

}





module.exports = updateBuckets
