import { css, customElement, html, property, query } from "lit-element";
import { nothing } from "lit-html";
import { BaseElement } from "../../BaseElements/BaseElement";
import { WooCommerce } from "../../WooCommerce";

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
            `,
        ];
    }

    render() {
        return html`
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
                      <div class="gap grid">
                          <div>
                              <h1>Customers:</h1>
                              <ul>
                                  ${this.data.customers?.map(
                                      (customer) => html`
                                          <li>
                                              <a
                                                  href="/customers/${customer.id}"
                                              >
                                                  ${customer.first_name}
                                                  ${customer.last_name}
                                              </a>
                                          </li>
                                      `
                                  )}
                              </ul>
                          </div>
                          <div>
                              <h1>Orders:</h1>
                              <ul>
                                  ${this.data.orders?.map(
                                      (order) => html`
                                          <li>
                                              <a href="/orders/${order.id}">
                                                  #${order.number}
                                              </a>
                                          </li>
                                      `
                                  )}
                              </ul>
                          </div>
                          <div>
                              <h1>Subscriptions:</h1>
                              <ul>
                                  ${this.data.subscriptions?.map(
                                      (subscription) => html`
                                          <li>
                                              <a
                                                  href="/subscriptions/${subscription.id}"
                                              >
                                                  #${subscription.id}
                                              </a>
                                          </li>
                                      `
                                  )}
                              </ul>
                          </div>
                          <div>
                              <h1>Memberships:</h1>
                              <ul>
                                  ${this.data.memberships?.map(
                                      (membership) => html`
                                          <li>
                                              <a
                                                  href="/memberships/members/${membership.id}"
                                              >
                                                  #${membership.id}
                                              </a>
                                          </li>
                                      `
                                  )}
                              </ul>
                          </div>
                      </div>
                  `
                : nothing}
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

        // this.data = {
        //     ...this.data,
        //     ...{ memberships: await this.searchMemberships() },
        // };

        this._pending = false;
    }

    async searchCustomers() {
        return (
            await WooCommerce().get("customers", {
                search: this.textField.value,
            })
        ).data;
    }

    async searchMemberships() {
        return (
            await WooCommerce().get("memberships/members", {
                search: this.textField.value,
            })
        ).data;
    }

    async searchOrders() {
        return (
            await WooCommerce().get("orders", {
                search: this.textField.value,
            })
        ).data;
    }

    async searchSubscriptions() {
        return (
            await WooCommerce({ version: "wc/v1" }).get("subscriptions", {
                search: this.textField.value,
            })
        ).data;
    }
}
