
"use strict"





const constants = require('../commons/constants')






const utils = { }




utils.eraseLines = lineCount => {

	for (var ith = 0; ith < lineCount; ++ith) {

		process.stderr.write(constants.escapeSequences.lineUp)
		process.stderr.write(constants.escapeSequences.lineDelete)

	}

}





module.exports = utils
