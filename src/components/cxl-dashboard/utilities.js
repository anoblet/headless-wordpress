import { Router } from "@vaadin/router";
import "@vaadin/vaadin-notification";
import { html, render } from "lit-html";

export const formatDate = (date) => new Date(date).toLocaleDateString();

export const formatDateAsync = async (dateAsync) => {
    const date = await dateAsync;
    return date ? new Date(date).toLocaleDateString() : false;
};

export const measure = async (description, callback) => {
    const start = performance.now();
    await callback();
    const end = performance.now();

    // Output statistics.
    console.log({ ...description, ...{ time: end - start } });
};

export const notification = ({ duration = 5000, message, theme }, node) => {
    const el = document.createElement("vaadin-notification");
    theme && el.setAttribute("theme", theme);
    Object.assign(el, {
        duration,
        position: "middle",
        renderer: (root) => render(html`${message}`, root),
    });
    document.body.appendChild(el);
    el.open();
};

export const notify = notification;

export const navigate = (path) => Router.go(path);
