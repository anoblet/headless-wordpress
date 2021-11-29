import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import "@vaadin/vaadin-split-layout";
import { css, customElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { cache } from "lit-html/directives/cache.js";
import { Coupon } from "../../models";
import { ViewElement } from "../../BaseElements/ViewElement";
import "../membership/cxl-membership-grid";
import "../order/cxl-order-grid";
import "../subscription/cxl-subscription-grid";

@customElement("cxl-coupon-view")
export class CXLCouponViewElement extends ViewElement {
    @property({ type: Number }) _tabIndex = 0;

    _itemType = Coupon;

    pending = false;

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

    render() {
        if (!(this.item instanceof this._itemType))
            return html`<span id="loading">Loading...</span>`;
        return html`
            <vaadin-split-layout orientation="vertical">
                <cxl-coupon-details .item=${this.item}></cxl-coupon-details>
                <div id="tabs">
                    <vaadin-tabs @selected-changed="${this._selectedChanged}">
                        <vaadin-tab></vaadin-tab>
                        <vaadin-tab></vaadin-tab>
                        <vaadin-tab></vaadin-tab>
                    </vaadin-tabs>
                    <div id="tabContent">
                        ${cache(this._tabIndex === 0 ? html`` : nothing)}
                        ${cache(this._tabIndex === 1 ? html`` : nothing)}
                        ${cache(this._tabIndex === 2 ? html`` : nothing)}
                    </div>
                </div>
            </vaadin-split-layout>
        `;
    }

    async getItem() {
        this.item = await new Coupon(this.item).get();
    }

    _selectedChanged(e) {
        this._tabIndex = e.detail.value;
    }
}
