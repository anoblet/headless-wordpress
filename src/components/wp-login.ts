import "@vaadin/vaadin-login";
import { css, customElement, html, query } from "lit-element";
import { config } from "../config";
import { navigate } from "../utilities";
import { BaseElement } from "./cxl-dashboard/BaseElements/BaseElement";

@customElement("wp-login")
export class WPLoginElement extends BaseElement {
    @query("#feedbackDialog") feedbackDialog;
    @query("#supportDialog") supportDialog;
    @query("vaadin-login-overlay") overlay;

    static get styles() {
        return [...super.styles, css``];
    }

    render() {
        return html`
            <vaadin-login-overlay
                description="Please login using your credentials"
            >
                <h3 slot="title">${config.title}</h3>
            </vaadin-login-overlay>
            <vaadin-dialog id="feedbackDialog">
                <template>Login is being processed...</template>
            </vaadin-dialog>
            <vaadin-dialog id="supportDialog">
                <template>Please contact support.</template>
            </vaadin-dialog>
            <script>
                window.addEventListener("WebComponentsReady", function () {
                    var i18n = Object.assign({}, vaadinLoginOverlay.i18n, {
                        additionalInformation:
                            "For this demo, use admin/admin to a successful login.",
                    });

                    vaadinLoginOverlay.i18n = i18n;

                    vaadinLoginOverlay.addEventListener(
                        "forgot-password",
                        function () {
                            this.supportDialog.opened = true;
                        }
                    );
                });
            </script>
        `;
    }

    firstUpdated() {
        this.overlay.opened = true;

        this.overlay.addEventListener("login", this.login);
    }

    async login(event) {
        // this.feedbackDialog.opened = true;

        const formData = new FormData();
        formData.append("username", event.detail.username);
        formData.append("password", event.detail.password);

        const response = await fetch(
            `${config.wordpress.url}/wp-json/jwt-auth/v1/token`,
            {
                headers: { "Bypass-Tunnel-Reminder": "true" },
                method: "POST",
                body: formData,
            }
        )
            .then(async (response) => {
                const { token } = await response.json();
                localStorage.setItem("token", token);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onBeforeEnter() {
        if (this.isAuthorized()) {
            navigate("/");
        }
    }
}
