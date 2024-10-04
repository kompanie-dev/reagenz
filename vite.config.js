import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(import.meta.dirname, "index.js"),
			fileName: "reagenz",
			name: "Reagenz"
		}
	},
	resolve: {
		alias: {
			"@kompanie/reagenz": "/index.js"
		}
	}
});
