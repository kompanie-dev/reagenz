import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
	{
		extends: "vite.config.js",
		test: {
			browser: {
				enabled: true,
				name: "chromium",
				provider: "playwright",
				providerOptions: {},
			},
			include: ["tests/browser/*.js"]
		}
	}
]);
