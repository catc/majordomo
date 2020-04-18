# Majordomo

Save and execute custom javascript snippets


## Resolving modules
Currently support directory resolvers:
```js
{
	"@popup/*": [
		"src/popup/*"
	],
	"@background/*": [
		"src/background/*"
	],
	"@common/*": [
		"src/common/*"
	],
	"@options/*": [
		"src/options/*"
	]
}
```

To modify, must update:
- `tscofig.json`
- `package.json` -> `jest.moduleNameMapper`
- `webpack/config.js` -> `resolve.alias`

-----------

### Development
Requires node `v10.16.0`
- dev: `npm run dev`
- build: `npm run build`
- icons: `npm run icons`