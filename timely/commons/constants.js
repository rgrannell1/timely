
const constants = {
	packageJson:    require('../../package'),
	timeBucketUnit: {
		'h': 60 * 60,
		'm': 60,
		's': 1
	},
	timestamps: {
		syslog: {
			regex: '[a-zA-z]{3}[ ]+[0-9]{1,2}[ ]+[0-9]{1,2}:[0-9]+:[0-9]+'
		}
	},
	characters: {
		fullBar: '█'
	},
	defaultUnit: 's'
}







module.exports = constants
