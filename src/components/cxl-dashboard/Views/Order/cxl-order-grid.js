import "@vaadin/vaadin-button";
import "@vaadin/vaadin-dialog";
import "@vaadin/vaadin-form-layout";
import { customElement, html } from "lit-element";
import { GridElement } from "../../BaseElements/GridElement";
import { OrderCollection } from "../../Models/OrderCollection";

@customElement("cxl-order-grid")
export class CXLOrderGridElement extends GridElement {
    _collectionType = OrderCollection;

    filter = {};

    render() {
        return html`
            <vaadin-grid .items=${this.items} size="1000">
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="number"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Product Name"
                    path="productName"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Total"
                    path="totalFormatted"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Status"
                    path="status"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
}
