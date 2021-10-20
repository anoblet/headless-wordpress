import { css, customElement, html } from "lit-element";
import { ViewElement } from "../../BaseElements/ViewElement";
import { Subscription } from "../../Models/Subscription";
import { navigate } from "../../utilities";

@customElement("cxl-subscription-view")
export class CXLSubscriptionViewElement extends ViewElement {
    _itemType = Subscription;

    static get styles() {
        return [...super.styles, css``];
    }

    render() {
        return html`
            <div class="grid gap">
                <div class="columns grid gap">
                    <vaadin-text-field
                        disabled
                        label="#"
                        value="${this.item?.id}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Product Name"
                        value="${this.item?.productName}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Frequency"
                        value="${this.item?.frequency}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Start Date"
                        value="${this.item?.startDate}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="End Date"
                        value="${this.item?.endDate}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Coupon Code"
                        value="${this.item?.couponLines?.[0]?.code}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Coupon Discount"
                        value="${this.item?.couponLines?.[0]?.discount}"
                    ></vaadin-text-field>
                </div>
                <hr />
                <div class="columns grid gap">
                    <vaadin-button
                        @click="${() =>
                            navigate(`/subscriptions/${this.item?.id}/switch`)}"
                        >Switch Subscription
                    </vaadin-button>
                    <vaadin-button
                        @click=${() =>
                            navigate(`/subscriptions/${this.item?.id}/coupon`)}
                        >Update Coupon</vaadin-button
                    >
                </div>
            </div>
        `;
    }
}
