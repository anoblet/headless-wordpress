import "@vaadin/vaadin-combo-box";
import "@vaadin/vaadin-text-field";
import { css, customElement, html, query } from "lit-element";
import { ViewElement } from "../../BaseElements/ViewElement";
import { Subscription } from "../../Models/Subscription";
import { ProductCollection } from "../../Models/ProductCollection";
import "../Product/cxl-product-grid";

@customElement("cxl-subscription-switch")
export class CXLSubscriptionSwitchElement extends ViewElement {
    @query("vaadin-combo-box") comboBox;
    @query("cxl-product-grid") productGrid;

    _itemType = Subscription;

    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    height: 100%;
                }

                .full-height {
                    height: 100%;
                }
            `,
        ];
    }

    render() {
        return html`
            <div class="column flex gap full-height">
                <vaadin-text-field
                    disabled
                    label="Current Product"
                    value="${this.item?.productName}"
                ></vaadin-text-field>
                <hr />
                <cxl-product-grid class="flex grow"></cxl-product-grid>
                <hr />
                <div class="columns grid gap">
                    <vaadin-button @click="${this._back}">
                        Cancel
                    </vaadin-button>
                    <vaadin-button @click="${this.confirm}">
                        Confirm
                    </vaadin-button>
                </div>
            </div>
        `;
    }

    confirm() {
        console.log(this.productGrid.selectedItem);
    }
}
