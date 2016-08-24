
const constants = {
	packageJson:    require('../../package'),
	timeBucketUnit: {
		'h': 60 * 60,
		'm': 60,
		's': 1
	},
	timestamps: {
		syslog: {
			regex: /[a-zA-z]{3}[ ]+[0-9]{1,2}[ ]+[0-9]{1,2}:[0-9]+:[0-9]+/
		},
		iso: {
			regex: /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i
		}
	},
	characters: {
		fullBar:    '■'
	},
	escapeSequences: {
		lineUp:     '\x1b[A',
		lineDelete: '\x1b[K'
	},
	defaultUnit: 's',
	units: {
		secondsInMilliseconds: 1000
	}
}







module.exports = constants
