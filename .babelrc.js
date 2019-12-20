const config = {
	"presets": [
		[
			"@babel/preset-env",
			{
				"targets": {
					"browsers": [
						">0.5%",
						"not ie 11",
						"not op_mini all"
					]
				}
			}
		],
		"@babel/preset-typescript",
		"@babel/preset-react"
	],
	"plugins": []
}

module.exports = config