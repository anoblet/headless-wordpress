import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";

module.exports = {
    input: ".tsc/index.js",
    output: {
        dir: "./public/js",
        format: "esm",
    },
    plugins: [
        resolve({
            browser: true,
            dedupe: ["@vaadin/vaadin-lumo-styles", "lit-element", "lit-html"],
        }),
        commonjs(),
        json(),
        nodePolyfills(),
    ],
};
