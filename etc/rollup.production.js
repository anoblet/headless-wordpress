import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import minifyHTML from "rollup-plugin-minify-html-literals";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { terser } from "rollup-plugin-terser";

module.exports = {
    input: ".tsc/index.js",
    output: {
        dir: "./public/js",
        format: "esm",
        sourcemap: true,
    },
    plugins: [
        commonjs(),
        json(),
        nodePolyfills(),
        replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        resolve({ browser: true, dedupe: ["lit-element", "lit-html"] }),
        minifyHTML(),
        terser({
            output: {
                comments: false,
            },
        }),
    ],
};
