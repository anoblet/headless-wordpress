import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import size from "rollup-plugin-size";

module.exports = {
    input: "./src/index.ts",
    output: {
        dir: "./public/scripts",
        format: "esm"
    },
    plugins: [
        resolve({ dedupe: ["lit-element", "lit-html"] }),
        commonjs(),
        typescript(),
        size()
    ]
};
