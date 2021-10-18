import { Router } from "@vaadin/router";
import "@vaadin/vaadin-app-layout";
import "@vaadin/vaadin-app-layout/vaadin-drawer-toggle";
import "@vaadin/vaadin-tabs";
import {
    css,
    customElement,
    html,
    LitElement,
    property,
    query,
} from "lit-element";
import { routes } from "../../routes";
import "../Customer/cxl-customer-grid";

@customElement("cxl-dashboard")
export class CXLDashboardElement extends LitElement {
    @property({ type: Number }) _selectedTab = 0;
    @query("main") main;

    static get styles() {
        return css`
            :host {
                display: block;
                font-family: var(--lumo-font-family);
                height: 100vh;
            }

            main {
                height: 100%;
            }

            #tabContent {
                height: 100%;
                overflow: hidden;
            }
        `;
    }

    render() {
        return html`
            <vaadin-app-layout>
                <vaadin-drawer-toggle
                    slot="navbar [touch-optimized]"
                ></vaadin-drawer-toggle>
                <span slot="navbar">
                    <vaadin-tab>
                        <a href="/">CXL Customer Service</a>
                    </vaadin-tab>
                </span>
                <div
                    slot="drawer"
                    orientation="vertical"
                    theme="minimal"
                    style="margin: 0 auto; flex: 1;"
                >
                    <vaadin-tabs
                        selected=${this._selectedTab}
                        orientation="vertical"
                        @selected-changed=${this._selectedChanged.bind(this)}
                    >
                        <vaadin-tab
                            ><a href="/customers">Dashboard</a></vaadin-tab
                        >
                        <!-- <vaadin-tab><a href="/orders">Orders</a></vaadin-tab>
                        <vaadin-tab
                            ><a href="/subscriptions"
                                >Subscriptions</a
                            ></vaadin-tab
                        >
                        <vaadin-tab
                            ><a href="/memberships/members"
                                >Memberships</a
                            ></vaadin-tab
                        > -->
                        <vaadin-tab>
                            <a href="/knowledge-base">Knowledge Base</a>
                        </vaadin-tab>
                    </vaadin-tabs>
                </div>
                <main></main>
            </vaadin-app-layout>
        `;
    }

    _selectedChanged(e) {
        this._selectedTab = e.detail.value;
    }

    firstUpdated() {
        const router = new Router(this.main);
        router.setRoutes(routes);

        window.addEventListener("vaadin-router-location-changed", (e: any) => {
            switch (e.detail.location.pathname.split("/")[1]) {
                case "customer":
                    this._selectedTab = 0;
                    break;
                case "order":
                    this._selectedTab = 1;
                    break;
                case "subscription":
                    this._selectedTab = 2;
                    break;
                case "membership":
                    this._selectedTab = 3;
                    break;
                default:
                    break;
            }
        });
    }
}
