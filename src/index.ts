// import { config } from "./config";

console.log("Build: BUILD_VERSION");

// document.body.style.setProperty("--lumo-primary-color", config.style.primaryColor);
// document.body.style.setProperty("--lumo-primary-text-color", config.style.primaryColor);

(async () => {
    await import("./components/shell-component");

    const el: any = document.createElement("shell-component");
    document.body.appendChild(el);
})();
