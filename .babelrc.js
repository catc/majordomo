const config = {
	"presets": [
		[
			"@babel/preset-env",
			{
				"targets": {
					"chrome": "72"
				}
			}
		],
		"@babel/preset-typescript",
		"@babel/preset-react"
	],
	"plugins": [
		'@babel/plugin-proposal-optional-chaining'
	]
}

module.exports = config