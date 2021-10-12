import { css, customElement, html } from "lit-element";
import { ViewElement } from "../../BaseElements/ViewElement";
import { Subscription } from "../../Models/Subscription";
import { navigate } from "../../utilities";

@customElement("cxl-subscription-view")
export class CXLSubscriptionViewElement extends ViewElement {
    _itemType = Subscription;

    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    display: grid;
                    grid-gap: 1rem;
                }

                #fields {
                    grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
                }
            `,
        ];
    }

    render() {
        console.log(this.item);
        return html`
            <div id="fields" class="grid gap">
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
            </div>
            <div class="grid gap">
                <b>Coupons</b>
                <vaadin-grid .items=${this.item?.couponLines}>
                    <vaadin-grid-column
                        auto-width
                        flex-grow="0"
                        header="#"
                        path="id"
                    ></vaadin-grid-column>
                    <vaadin-grid-column
                        header="Code"
                        path="code"
                    ></vaadin-grid-column>
                    <vaadin-grid-column
                        auto-width
                        flex-grow="0"
                        header="Discount"
                        path="discount"
                    ></vaadin-grid-column>
                </vaadin-grid>
                <vaadin-button
                    @click=${() =>
                        navigate(`/subscriptions/${this.item?.id}/coupon`)}
                    >Apply Coupon</vaadin-button
                >
            </div>
        `;
    }
}
