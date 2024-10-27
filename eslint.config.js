import globals from "globals";
import js from "@eslint/js";

export default [
	js.configs.recommended,
	{
		files: [
			"cli/**/*.js",
			"demo/**/*.js",
			"source/**/*.js",
			"template-project/**/*.js",
			"tests/browser/*.js",
			"tests/unit/*.js",
			"index.js"
		],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			"arrow-body-style": "error",
			"camelcase": "error",
			"capitalized-comments": ["error", "always", { "ignorePattern": "css|html" }],
			"default-case": "error",
			"default-case-last": "error",
			"default-param-last": "error",
			"eqeqeq": "error",
			"func-names": "error",
			"func-style": ["error", "declaration", { "allowArrowFunctions": true }],
			"max-params": ["error", 4],
			"no-array-constructor": "error",
			"no-console": ["error", { allow: ["error", "info", "warn"] }],
			"no-duplicate-imports": "error",
			"no-inline-comments": ["error", { "ignorePattern": "css|html" }],
			"no-lone-blocks": "error",
			"no-nested-ternary": "error",
			"no-object-constructor": "error",
			"no-promise-executor-return": "error",
			"no-restricted-globals": [
				"error",
				{
					"name": "isNaN",
					"message": "Use Number.isNaN() instead"
				},
				{
					"name": "parseFloat",
					"message": "Use Number.parseFloat() instead"
				},
				{
					"name": "parseInt",
					"message": "Use Number.parseInt() instead"
				},
			],
			"no-return-assign": "error",
			"no-self-compare": "error",
			"no-unmodified-loop-condition": "error",
			"no-unneeded-ternary": "error",
			"no-unreachable-loop": "error",
			"no-useless-assignment": "error",
			"no-use-before-define": "error",
			"object-shorthand": "error",
			"prefer-object-has-own": "error",
			"prefer-rest-params": "error",
			"prefer-template": "error",
			"quotes": ["error", "double", { "allowTemplateLiterals": true }],
			"radix": "error",
			"require-await": "error",
			"require-unicode-regexp": "error",
			"semi": ["error", "always"]
		}
	},
	{
		ignores: ["build/"],
	}
];
