import { css, customElement, html, property, query } from "lit-element";
import { nothing } from "lit-html";
import {
    CustomerCollection,
    MembershipCollection,
    OrderCollection,
    SubscriptionCollection,
} from "../models";
import { BaseElement } from "./cxl-dashboard/BaseElements/BaseElement";

@customElement("wp-search")
export class WPSearchElement extends BaseElement {
    @property({ type: Object }) data;
    @property({ type: Boolean }) _pending;

    @query("vaadin-text-field") textField;

    static get styles() {
        return [
            ...super.styles,
            css`
                :host {
                    height: initial;
                }

                .min-height {
                    min-height: 512px;
                }
            `,
        ];
    }

    render() {
        return html`
            <div class="gap grid">
                <form>
                    <vaadin-text-field
                        @change=${this.search}
                        label="Search"
                    ></vaadin-text-field>
                </form>
                <hr />
                ${this._pending ? html`Searching...` : nothing}
                ${!this._pending && !this.data
                    ? html`Please enter a search term.`
                    : nothing}
                ${!this._pending && this.data
                    ? html`
                          <div class="column flex min-height">
                              <h1>Customers:</h1>
                              <cxl-customer-grid .items=${this.data.customers}>
                              </cxl-customer-grid>
                          </div>
                          <div class="column flex min-height">
                              <h1>Orders:</h1>
                              <cxl-order-grid .items=${this.data.orders}>
                              </cxl-order-grid>
                          </div>
                          <div class="column flex min-height">
                              <h1>Subscriptions:</h1>
                              <cxl-subscription-grid
                                  .items=${this.data.subscriptions}
                              >
                              </cxl-subscription-grid>
                          </div>
                          <div class="column flex min-height">
                              <h1>Memberships:</h1>
                              <cxl-membership-grid
                                  .items=${this.data.memberships}
                              >
                              </cxl-membership-grid>
                          </div>
                      `
                    : nothing}
            </div>
        `;
    }

    async search() {
        this._pending = true;

        this.data = {
            ...this.data,
            ...{ customers: await this.searchCustomers() },
        };

        this.data = {
            ...this.data,
            ...{ orders: await this.searchOrders() },
        };

        this.data = {
            ...this.data,
            ...{ subscriptions: await this.searchSubscriptions() },
        };

        this.data = {
            ...this.data,
            ...{ memberships: await this.searchMemberships() },
        };

        this._pending = false;
    }

    async searchCustomers() {
        return (
            await new CustomerCollection({
                params: { search: this.textField.value },
            }).get()
        ).items;
    }

    async searchMemberships() {
        return (
            await new MembershipCollection({
                params: { search: this.textField.value },
            }).get()
        ).items;
    }

    async searchOrders() {
        return (
            await new OrderCollection({
                params: { search: this.textField.value },
            }).get()
        ).items;
    }

    async searchSubscriptions() {
        return (
            await new SubscriptionCollection({
                params: { search: this.textField.value },
            }).get()
        ).items;
    }
}
