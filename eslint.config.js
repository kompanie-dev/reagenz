import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		files: [
			"cli/**/*.js",
			"demo/**/*.js",
			"source/**/*.js",
			"template-project/**/*.js",
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
			"capitalized-comments": ["error", "always", { "ignorePattern": "css|html" }],
			"default-case": "error",
			"default-case-last": "error",
			"default-param-last": "error",
			//"no-await-in-loop": "error",
			"func-names": "error",
			"func-style": ["error", "declaration", { "allowArrowFunctions": true }],
			"id-length": ["error", { "exceptions": ["_"] }],
			"max-params": ["error", 4],
			"no-console": ["error", { allow: ["error", "info", "warn"] }],
			"no-inline-comments": ["error", { "ignorePattern": "css|html" }],
			"no-lone-blocks": "error",
			"no-return-assign": "error",
			"object-shorthand": "error",
			//"prefer-named-capture-group": "error",
			"prefer-object-has-own": "error",
			"prefer-rest-params": "error",
			"prefer-template": "error",
			"radix": "error",
			"require-await": "error",
			"require-unicode-regexp": ["error", { "requireFlag": "v" }],
			"semi": ["error", "always"]
		}
	}
];
