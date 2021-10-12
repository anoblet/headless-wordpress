import { Router } from "@vaadin/router";
import "@vaadin/vaadin-notification";
import { css, html, LitElement } from "lit-element";
import { render } from "lit-html";
import { baseStyle } from "../base-style";

export class BaseElement extends LitElement {
    pending;

    static get styles() {
        return [
            baseStyle,
            css`
                :host {
                    display: block;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 1rem;
                }

                :host([hidden]) {
                    display: none;
                }

                :host([pending]) > * {
                    display: none;
                }
            `,
        ];
    }

    updated(changedProperties) {
        // Add pending message
        if (changedProperties.has("pending")) {
            if (this.pending) {
                this._addPendingMessage();
            }
        }
    }

    _createDialog({ renderer }) {
        const dialog = document.createElement("vaadin-dialog");

        Object.assign(dialog, {
            opened: true,
            renderer,
        });

        this.shadowRoot.appendChild(dialog);

        dialog.addEventListener("opened-changed", (e) => {
            if (!e.detail.value) this.shadowRoot.removeChild(dialog);
        });
    }

    _createLoadingElement() {
        const el = document.createElement("span");
        Object.assign(el, { id: "loading", textContent: "Loading..." });
        return el;
    }

    _navigate(e) {
        Router.go(e.target.getAttribute("href"));
    }

    _notification = this._showNotification;

    _showNotification({ duration = 5000, message, theme }) {
        const el = document.createElement("vaadin-notification");
        theme && el.setAttribute("theme", theme);
        Object.assign(el, {
            duration,
            position: "middle",
            renderer: (root) => render(html`${message}`, root),
        });
        this.shadowRoot.appendChild(el);
        el.open();
    }

    _addPendingMessage() {
        const el = document.createElement("span");
        el.id = "pending-message";
        el.textContent = "Loading...";
        this.shadowRoot.appendChild(el);
    }
}
