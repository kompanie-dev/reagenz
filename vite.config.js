import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(import.meta.dirname, "index.js"),
			fileName: "reagenz",
			formats: ["es"],
			name: "Reagenz"
		},
		cssCodeSplit: false,
		minify: true,
		outDir: "build",
		reportCompressedSize: true,
		target: "esnext"
	},
	resolve: {
		alias: {
			"@kompanie/reagenz": "/index.js"
		}
	}
});
