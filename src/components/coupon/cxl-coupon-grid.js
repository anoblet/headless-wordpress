import "@vaadin/vaadin-button";
import "@vaadin/vaadin-dialog";
import "@vaadin/vaadin-form-layout";
import { customElement, html } from "lit-element";
import { CouponCollection } from "../../models";
import { GridElement } from "../../BaseElements/GridElement";
import "./cxl-coupon-view";

@customElement("cxl-coupon-grid")
export class CXLCouponGridElement extends GridElement {
    _collectionType = CouponCollection;

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
                    header="Code"
                    resizable
                    path="code"
                ></vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    header="Amount"
                    resizable
                    path="amount"
                ></vaadin-grid-filter-column>
                <vaadin-grid-filter-column
                    header="Date Created"
                    resizable
                    path="date_created"
                ></vaadin-grid-filter-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
}
