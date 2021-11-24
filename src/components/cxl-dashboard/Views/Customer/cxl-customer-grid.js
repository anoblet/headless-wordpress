import "@vaadin/vaadin-button";
import "@vaadin/vaadin-dialog";
import "@vaadin/vaadin-form-layout";
import { customElement, html } from "lit-element";
import { CustomerCollection } from "../../../../models";
import { GridElement } from "../../BaseElements/GridElement";
import "./cxl-customer-view";

@customElement("cxl-customer-grid")
export class CXLCustomerGridElement extends GridElement {
    _collectionType = CustomerCollection;

    render() {
        return html`
            <vaadin-grid .items=${this.items}>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="First Name"
                    resizable
                    path="firstName"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="Last Name"
                    resizable
                    path="lastName"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    header="Email"
                    resizable
                    path="email"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="City"
                    resizable
                    path="billing.city"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    flex-grow="0"
                    header="Country"
                    resizable
                    path="billing.country"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="Customer Since"
                    resizable
                    path="customerSince"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    flex-grow="0"
                    header="Paying"
                    resizable
                    path="isPayingCustomerFormatted"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
}
