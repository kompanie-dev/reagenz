import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
			}
		},
		cssCodeSplit: false,
		outDir: "build",
		target: "esnext"
	},
	resolve: {
		alias: {
			"@kompanie/reagenz": resolve(__dirname, "../index.js")
		}
	}
});
