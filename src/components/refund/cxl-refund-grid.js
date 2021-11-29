import "@vaadin/vaadin-button";
import "@vaadin/vaadin-dialog";
import "@vaadin/vaadin-form-layout";
import { customElement, html, property } from "lit-element";
import { RefundCollection } from "../../models";
import { GridElement } from "../../base-elements/GridElement";

@customElement("cxl-refund-grid")
export class CXLRefundGridElement extends GridElement {
    @property({ attribute: "order-id", type: Number }) orderId;

    _collectionType = RefundCollection;

    get _props() {
        return {
            orderId: this.orderId,
        };
    }

    render() {
        return html`
            <vaadin-grid>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Reason"
                    path="reason"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Payment Refunded"
                    path="refunded_payment"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="Amount"
                    path="amountFormatted"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    .renderer=${this._boundActionColumnRenderer}
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }

    shouldUpdate(changedProperties) {
        // Make sure order ID is set otherwise the grid will not load.
        if (!this.orderId) return false;

        return super.shouldUpdate(changedProperties);
    }
}
