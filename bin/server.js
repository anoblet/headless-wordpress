const browserSync = require("browser-sync").create();
const compression = require("compression");
const historyApiFallback = require("connect-history-api-fallback");

browserSync.init({
    single: true,
    server: {
        baseDir: "public",
        index: "index.html",
    },
    files: ["public/js/**", "public/index.html"],
    middleware: [compression(), historyApiFallback()],
});
