import { css, customElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { Coupon } from "../../Models/Coupon";
import { formatDate } from "../../utilities";
import { ViewElement } from "../../BaseElements/ViewElement";

@customElement("cxl-coupon-details")
export class CXLCouponDetailsElement extends ViewElement {
    _itemType = Coupon;

    @property({ type: Object }) item;

    static get styles() {
        return [
            super.styles,
            css`
                label::after {
                    content: ":";
                }

                #grid {
                    display: grid;
                    grid-template-columns: max-content auto max-content auto;
                }

                #grid > * {
                    padding: 0.5rem;
                }
            `,
        ];
    }

    render() {
        if (!(this.item instanceof this._itemType))
            return html`<span id="loading">Loading...</span>`;
        return html`
            <div id="grid">
                <label>ID</label>
                <div>${this.item.id}</div>
                <label>Code</label>
                <div>${this.item.code}</div>
                <label>Amount</label>
                <div>${this.item.amount}</div>
            </div>
        `;
    }

    async getItem() {
        this.item = await new Coupon(this.item).get();
    }
}
