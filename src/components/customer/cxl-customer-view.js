import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import "@vaadin/vaadin-icons/vaadin-iconset";
import "@vaadin/vaadin-split-layout";
import { css, customElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { cache } from "lit-html/directives/cache.js";
import { config } from "../../config";
import { Customer } from "../../models";
import { navigateExternal } from "../../utilities";
import "./cxl-customer-details";
import { ViewElement } from "../../BaseElements/ViewElement";
import "../membership/cxl-membership-grid";
import "../order/cxl-order-grid";
import "../subscription/cxl-subscription-grid";

@customElement("cxl-customer-view")
export class CXLCustomerViewElement extends ViewElement {
    @property({ type: Number }) _tabIndex = 0;

    _itemType = Customer;

    static get styles() {
        return [
            ...super.styles,
            css`
                vaadin-split-layout {
                    height: 100%;
                }

                #tabs {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                #tabContent {
                    height: 100%;
                    overflow: hidden;
                }
            `,
        ];
    }

    render() {
        return html`
            <vaadin-split-layout orientation="vertical">
                <div class="full-height grid gap">
                    <div class="column-gap columns grid">
                        <vaadin-button
                            @click=${() =>
                                navigateExternal(
                                    `${config.wordpress.url}/wp/wp-admin/user-edit.php?user_id=${this.item.id}`
                                )}
                        >
                            Wordpress
                            <iron-icon
                                icon="vaadin:external-link"
                                slot="suffix"
                            ></iron-icon>
                        </vaadin-button>
                    </div>
                    <cxl-customer-details
                        .item=${this.item}
                        get-disabled
                    ></cxl-customer-details>
                </div>
                <div id="tabs">
                    <vaadin-tabs @selected-changed="${this._selectedChanged}">
                        <vaadin-tab>
                            Orders (${this.item?.orders?.total})
                        </vaadin-tab>
                        <vaadin-tab>
                            Subscriptions (${this.item?.subscriptions?.total})
                        </vaadin-tab>
                        <vaadin-tab>
                            Memberships (${this.item?.memberships?.total})
                        </vaadin-tab>
                    </vaadin-tabs>
                    <div id="tabContent">
                        ${this.item
                            ? html`
                                  ${cache(
                                      this._tabIndex === 0
                                          ? html`<cxl-order-grid
                                                .params=${{
                                                    customer: this.item.id,
                                                }}
                                            ></cxl-order-grid> `
                                          : nothing
                                  )}
                                  ${cache(
                                      this._tabIndex === 1
                                          ? html`<cxl-subscription-grid
                                                .params=${{
                                                    customer: this.item.id,
                                                }}
                                            >
                                            </cxl-subscription-grid>`
                                          : nothing
                                  )}
                                  ${cache(
                                      this._tabIndex === 2
                                          ? html`<cxl-membership-grid
                                                .params=${{
                                                    customer: this.item.id,
                                                }}
                                            >
                                            </cxl-membership-grid>`
                                          : nothing
                                  )}
                              `
                            : nothing}
                    </div>
                </div>
            </vaadin-split-layout>
        `;
    }

    _selectedChanged(e) {
        this._tabIndex = e.detail.value;
    }

    async getItem() {
        const item = await super.getItem();

        await Promise.all([
            item.getOrders(),
            item.getSubscriptions(),
            item.getMemberships(),
        ]);

        return item;
    }
}
