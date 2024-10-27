import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
	coverage: {
		provider: "v8",
		exclude: ["**/build/**", "**/cli/**",  "**/coverage/**", "**/demo/**", "**/template-project/**", ...coverageConfigDefaults.exclude]
	}
  }
});
