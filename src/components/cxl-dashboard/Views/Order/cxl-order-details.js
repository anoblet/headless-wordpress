import { Router } from "@vaadin/router";
import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import { css, customElement, html, property } from "lit-element";
import { ViewElement } from "../../BaseElements/ViewElement";
import { Order } from "../../Models/Order";

@customElement("cxl-order-details")
export class CXLOrderDetailsElement extends ViewElement {
    @property({ type: Object }) item;

    _itemType = Order;

    get endpoint() {
        return `orders/${this.order.id}`;
    }

    static get styles() {
        return [
            super.styles,
            css`
                label::after {
                    content: ":";
                }

                #actions {
                    display: grid;
                    grid-gap: 1rem;
                    grid-template-columns: 1fr 1fr;
                }

                #grid {
                    display: grid;
                    grid-template-columns: max-content auto max-content auto;
                }

                #grid > * {
                    padding: 0.5rem;
                }
            `,
        ];
    }

    async getItem() {
        const item = await super.getItem();

        await item.getCustomer();

        return item;
    }

    render() {
        return html`
            <div id="grid">
                <label>#</label>
                <div>${this.item?.number}</div>
                <label>Status</label>
                <div class="capitilize">${this.item?.status}</div>
                <label>Customer</label>
                <div>
                    <a href="/customers/${this.item?.customer?.id}"
                        >${this.item?.customer?.name}</a
                    >
                </div>
                <label>Created</label>
                <div>${this.item?.dateCreated}</div>
                <label>Modified</label>
                <div>${this.item?.dateModified}</div>
                <label>Name</label>
                <div>${this.item?.productName}</div>
                <label>Relationship</label>
                <div>${this.item?.relationship}</div>
                <label>Amount</label>
                <div>${this.item?.currencySymbol}${this.item?.total}</div>
            </div>
            <div id="actions">
                <vaadin-button
                    @click=${this.navigate}
                    href=${`/orders/${this.item?.id}/refunds`}
                    >Refund
                </vaadin-button>
                <vaadin-button>Coupon</vaadin-button>
            </div>
        `;
    }

    navigate(e) {
        Router.go(e.target.getAttribute("href"));
    }
}
