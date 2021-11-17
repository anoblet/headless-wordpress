import { Router } from "@vaadin/router";
import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import { css, customElement, html, property } from "lit-element";
import { Order } from "../../../../models";
import { ViewElement } from "../../BaseElements/ViewElement";

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
            <div class="grid row-gap">
                <div>
                    <label>Customer: </label>
                    <a href="/customers/${this.item?.customer?.id}">
                        ${this.item?.customer?.name}
                    </a>
                </div>
                <hr />
                <div class="columns grid column-gap">
                    <vaadin-text-field
                        disabled
                        label="Order #"
                        value=${this.item?.number}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Status"
                        value=${this.item?.status}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Date Created"
                        value=${this.item?.dateCreated}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Date Modified"
                        value=${this.item?.dateModified}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Product Name"
                        value=${this.item?.productName}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Relationship"
                        value=${this.item?.relationship}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Total"
                        value=${this.item?.total}
                    ></vaadin-text-field>
                </div>
                <hr />
                <vaadin-button
                    @click=${this.navigate}
                    href=${`/orders/${this.item?.id}/refunds`}
                    >Issue a refund
                </vaadin-button>
                <!-- <vaadin-button>Coupon</vaadin-button> -->
            </div>
        `;
    }

    navigate(e) {
        Router.go(e.target.getAttribute("href"));
    }
}
