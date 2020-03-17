import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

module.exports = {
    input: "./src/index.ts",
    output: {
        dir: "./public/scripts",
        format: "esm"
    },
    plugins: [
        resolve({ dedupe: ["lit-element", "lit-html"] }),
        typescript(),
    ]
};
