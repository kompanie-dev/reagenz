import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "index.js"),
            name: "Reagenz",
            fileName: "reagenz"
        }
    },
    resolve: {
        alias: {
            "@kompanie/reagenz": "/index.js"
        }
    }
});