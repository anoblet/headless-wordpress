import { css, customElement, html, property } from "lit-element";
import { Coupon } from "../../models";
import { ViewElement } from "../../base-elements/ViewElement";

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
