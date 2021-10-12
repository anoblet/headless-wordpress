import "@vaadin/vaadin-button";
import { css, customElement, html, query } from "lit-element";
import { ViewElement } from "../../BaseElements/ViewElement";
import { Subscription } from "../../Models/Subscription";
import { navigate } from "../../utilities";
import "../Coupon/cxl-coupon-grid";

@customElement("cxl-subscription-coupon")
export class CXLSubscriptionCouponElement extends ViewElement {
    @query("cxl-coupon-grid") couponGrid;

    _itemType = Subscription;
    _selectedItem;

    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                }
            `,
        ];
    }

    render() {
        return html`
            <cxl-coupon-grid></cxl-coupon-grid>
            <vaadin-button @click=${this.apply}>Apply</vaadin-button>
        `;
    }

    firstUpdated() {
        super.firstUpdated();

        this.couponGrid.updateComplete.then(() => {
            this.couponGrid.grid.addEventListener(
                "active-item-changed",
                (event) => {
                    this.selectedItem = event.detail.value;
                }
            );
        });
    }

    async apply() {
        const coupon = this.selectedItem.getData();

        console.log(coupon.amount);

        // Only one coupon should be able to applied at a time.
        // Technically we should be able to omit the coupon amount here, but discount_amount isn't populated.
        await this.item.put(
            // { coupon_lines: [{ code: coupon.code }] } // 0
            // { coupon_lines: [{ discount_amount: coupon.amount, code: coupon.code }] } // Correct
            { coupon_lines: [] }
        );

        console.log(this.item._lastResponse);

        if (this.item._lastResponse.status === 200) {
            navigate(`/subscriptions/${this.item.id}`);
        }
    }
}
