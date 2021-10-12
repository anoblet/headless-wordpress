import "@vaadin/vaadin-combo-box";
import "@vaadin/vaadin-text-field";
import { css, customElement, html, query } from "lit-element";
import { ViewElement } from "../../BaseElements/ViewElement";
import { Subscription } from "../../Models/Subscription";
import { ProductCollection } from "../../Models/ProductCollection";

@customElement("cxl-subscription-switch")
export class CXLSubscriptionSwitchElement extends ViewElement {
    @query("vaadin-combo-box") comboBox;

    _itemType = Subscription;

    static get styles() {
        return [super.styles, css``];
    }

    render() {
        console.log(this.item);

        return html`
            <vaadin-text-field
                label="Current Product"
                value="${this.item.productName}"
            ></vaadin-text-field>
            <hr />
            <vaadin-combo-box label="New Product"> </vaadin-combo-box>
            <hr />
            <vaadin-button @click="${this.onClick}">Cancel</vaadin-button>
            <vaadin-button @click="${this.onClick}">Confirm</vaadin-button>
        `;
    }

    firstUpdated() {
        this.getProducts();
    }

    async getProducts() {
        const productCollection = await new ProductCollection().get();

        console.log(productCollection);
    }
}
