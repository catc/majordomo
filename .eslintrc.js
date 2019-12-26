module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 2019,
		'sourceType': 'module',
		'ecmaFeatures': {
			'jsx': true
		},
		'useJSXTextNode': true,
		'project': './tsconfig.json',
	},
	extends: [
		'eslint:recommended',
		// 'plugin:import/errors',
		// 'plugin:import/warnings',
		// 'plugin:import/typescript',

		// react
		'plugin:react/recommended',

		// ts
		'plugin:@typescript-eslint/recommended',

		// 'prettier',
		// 'prettier/react',

		// prettier
		'prettier',
		'prettier/@typescript-eslint',
		'prettier/react',
		// 'plugin:prettier/recommended',
		'prettier/standard',
	],
	plugins: [
		'react',
		'react-hooks',
		// 'import',
		'@typescript-eslint',
		'prettier',
	],
	env: {
		webextensions: true,
		// browser: true,
		node: true,
		// jest: true,
	},
	rules: {
		// prettier
		// 'prettier/prettier': 1,

		// imports
		// 'import/newline-after-import': 1,
		// 'import/first': 2,
		// 'import/imports-first': 2,
		// 'import/no-unresolved': 0, // let typescript handle imports

		// typescript
		'@typescript-eslint/no-unused-vars': 0,
		'@typescript-eslint/explicit-member-accessibility': 0,
		'@typescript-eslint/explicit-function-return-type': [0],
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/no-use-before-define': [2, { functions: false }],
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/no-explicit-any': 0,

		// react hooks
		'react-hooks/rules-of-hooks': 1,
		'react-hooks/exhaustive-deps': 1,

		// react
		'react/require-default-props': 1,
		// 'react/no-find-dom-node': 1,
		// 'react/jsx-no-target-blank': 2,
		'react/no-array-index-key': 1,
		'react/jsx-curly-brace-presence': 1,
		'react/no-typos': 'warn',
		// TODO - breaks jsx with prettier sometimes? investigate
		// 'react/jsx-wrap-multilines': [
		// 	1,
		// 	{
		// 		declaration: 'parens-new-line',
		// 		assignment: 'parens-new-line',
		// 		return: 'parens-new-line',
		// 		arrow: 'parens-new-line',
		// 		condition: 'parens-new-line',
		// 		logical: 'parens-new-line',
		// 		prop: 'parens-new-line',
		// 	},
		// ],

		// 'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'], // MIGHT interferes with prettier
		// 'react/jsx-equals-spacing': ['error', 'never'], // MIGHT interferes with prettier
		// 'react/jsx-tag-spacing': [ // MIGHT interferes with prettier
		// 	'error',
		// 	{
		// 		closingSlash: 'never',
		// 		beforeSelfClosing: 'always',
		// 		afterOpening: 'never',
		// 		beforeClosing: 'never',
		// 	},
		// ],

		// standard eslint
		// 'quote-props': [1, 'as-needed'], // MIGHT interferes with prettier
		// 'eol-last': 1,
		'@typescript-eslint/no-empty-function': 0,
		'@typescript-eslint/ban-ts-ignore': 0,
		curly: [2, 'multi-line'],
		eqeqeq: [1, 'smart'],
		'no-eval': 2,
		'no-use-before-define': [1, 'nofunc'],
		quotes: [
			1,
			'single',
			{
				allowTemplateLiterals: true,
			},
		],
		indent: [
			2,
			'tab',
			{
				SwitchCase: 1,
			},
		],

		'prettier/prettier': [
			'error',
			{
				arrowParens: "always",
				bracketSpacing: true,
				jsxBracketSameLine: false,
				printWidth: 90,
				proseWrap: "preserve",
				requirePragma: false,
				semi: false,
				singleQuote: true,
				tabWidth: 4,
				trailingComma: "all",
				useTabs: true
			},
			{
				usePrettierrc: false,
			},
		],


		// 'no-multi-spaces': [1],
		// 'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'no-trailing-spaces': 1,
		// 'function-paren-newline': [1, 'multiline'], // breaks js?? investigate
		'keyword-spacing': [
			1,
			// space between `ifHERE()HERE{}`
			{
				before: true,
				after: true,
			},
		],
		// 'object-curly-spacing': [1, 'always'], // MIGHT interferes with prettier
		'no-var': 1,

		'space-before-function-paren': [ // MIGHT interferes with prettier
			1,
			{
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'ignore',
			},
		],
		// 'comma-dangle': [1, 'always-multiline'],
		//  conflicts with prettier
		'space-in-parens': [1, 'never'], // MIGHT interferes with prettier
		'linebreak-style': 0
	},
	globals: {
		document: true,
		Promise: true,
		window: true
	},
	settings: {
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
		react: {
			version: 'detect',
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
	},
}