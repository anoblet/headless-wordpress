import "@vaadin/vaadin-combo-box";
import "@vaadin/vaadin-text-field";
import { css, customElement, html, query } from "lit-element";
import { Subscription } from "../../models";
import { ViewElement } from "../../BaseElements/ViewElement";
import "../product/cxl-product-grid";

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
                    <vaadin-button @click="${this.updateItem}">
                        Update
                    </vaadin-button>
                </div>
            </div>
        `;
    }

    updateItem() {
        console.log(this.productGrid.selectedItem);
    }
}
