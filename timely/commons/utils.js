
"use strict"




const utils = { }




utils.eraseLines = lineCount => {

	for (var ith = 0; ith < lineCount; ++ith) {

		process.stderr.write('\x1b[A')
		process.stderr.write('\x1b[K')

	}

}





module.exports = utils
