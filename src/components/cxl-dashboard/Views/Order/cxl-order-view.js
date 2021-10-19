import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import "@vaadin/vaadin-select";
import { css, customElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { cache } from "lit-html/directives/cache";
import { ViewElement } from "../../BaseElements/ViewElement";
import { Order } from "../../Models/Order";
import "../Refund/cxl-refund-grid";
import "./cxl-order-details";

@customElement("cxl-order-view")
export class CXLOrderViewElement extends ViewElement {
    @property({ type: Number }) _tabIndex = 0;

    _itemType = Order;

    static get styles() {
        return [
            super.styles,
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

    async getItem() {
        const item = await super.getItem();

        await Promise.all([
            item.getRefunds(),
            item.getCoupons(),
            item.getCustomer(),
        ]);

        return item;
    }

    render() {
        return html`
            <vaadin-split-layout orientation="vertical">
                <div>
                    <vaadin-select>
                        <template>
                            <vaadin-list-box>
                                <vaadin-item></template>
                            </vaadin-list-box>
                        </template>
                    </vaadin-select>
                    <cxl-order-details .item=${this.item}></cxl-order-details>
                </div>
                <div id="tabs">
                    <vaadin-tabs @selected-changed="${this._selectedChanged}">
                        <vaadin-tab>
                            Refunds (${this.item?.refunds?.total ?? 0})
                        </vaadin-tab>
                    </vaadin-tabs>
                    <div id="tabContent">
                        ${cache(
                            this._tabIndex === 0
                                ? html`<cxl-refund-grid
                                      order-id=${this.item?.id}
                                  ></cxl-refund-grid>`
                                : nothing
                        )}
                    </div>
                </div>
            </vaadin-split-layout>
        `;
    }

    _selectedChanged(e) {
        this._tabIndex = e.detail.value;
    }
}
