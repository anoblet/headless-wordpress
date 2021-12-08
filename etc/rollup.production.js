import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { execSync } from "child_process";
import { version } from "../package.json";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

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
        replace({
            APP_VERSION: `v${version}-${commitHash}`,
        }),
    ],
};
