(async () => {
    await import("./components/shell-component");
    
    const el: any = document.createElement("shell-component");
    document.body.appendChild(el);
})();
