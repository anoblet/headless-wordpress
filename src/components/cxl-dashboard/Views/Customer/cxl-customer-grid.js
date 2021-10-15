import "@vaadin/vaadin-button";
import "@vaadin/vaadin-dialog";
import "@vaadin/vaadin-form-layout";
import { customElement, html } from "lit-element";
import { GridElement } from "../../BaseElements/GridElement";
import { CustomerCollection } from "../../Models/CustomerCollection";
import "./cxl-customer-view";

@customElement("cxl-customer-grid")
export class CXLCustomerGridElement extends GridElement {
    _collectionType = CustomerCollection;

    render() {
        return html`
            <vaadin-grid>
                <vaadin-grid-sort-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-sort-column>
                <vaadin-grid-filter-column
                    header="First Name"
                    resizable
                    path="firstName"
                ></vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    header="Last Name"
                    resizable
                    path="lastName"
                ></vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    auto-width
                    header="Email"
                    resizable
                    path="email"
                ></vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    header="City"
                    resizable
                    path="billing.city"
                ></vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    flex-grow="0"
                    header="Country"
                    resizable
                    path="billing.country"
                >
                </vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    header="Customer Since"
                    resizable
                    path="customerSince"
                ></vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    flex-grow="0"
                    header="Paying"
                    resizable
                    path="isPayingCustomerFormatted"
                >
                </vaadin-grid-filter-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
}
