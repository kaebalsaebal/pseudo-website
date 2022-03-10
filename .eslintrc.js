module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'airbnb-typescript',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.eslint.json', './tsconfig.json'],
		tsconfigRootDir: __dirname,
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'arrow-body-style': ['error', 'always'],
		'jsx-a11y/anchor-is-valid': 0,
		'react/button-has-type': 0,
		'react/function-component-definition': ['off'],
		'react/react-in-jsx-scope': 0,
		'react/prefer-stateless-function': 0,
		'react/jsx-no-bind': 0,
		'react/jsx-no-useless-fragment': 0,
		'react/jsx-one-expression-per-line': 0,
		'react/jsx-props-no-spreading': 0,
		'no-nested-ternary': 0,
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'off',
		'no-use-before-define': ['off'],
		'react/jsx-filename-extension': [
			2,
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		],
		'import/extensions': [
			2,
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'prettier/prettier': 'error',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', '@types'],
			},
			typescript: {},
		},
	},
};
