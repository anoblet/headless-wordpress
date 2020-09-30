import resolve from "@rollup/plugin-node-resolve";

module.exports = {
    input: ".tsc/index.js",
    output: {
        dir: "./public/js",
        format: "esm",
    },
    plugins: [resolve({ dedupe: ["lit-element", "lit-html"] })],
};
