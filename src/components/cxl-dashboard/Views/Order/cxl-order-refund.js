import { Router } from "@vaadin/router";
import "@vaadin/vaadin-text-field/vaadin-number-field";
import "@vaadin/vaadin-text-field/vaadin-text-area";
import { css, customElement, html, queryAll } from "lit-element";
import { Order, Refund } from "../../../../models";
import { ViewElement } from "../../BaseElements/ViewElement";
import { notification } from "../../utilities";

@customElement("cxl-order-refund")
export class CXLOrderRefundElement extends ViewElement {
    _itemType = Order;

    @queryAll('vaadin-number-field[label="Refund Amount"]') amountFields;

    static get styles() {
        return [
            super.styles,
            css`
                hr {
                    width: 100%;
                }

                label {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                vaadin-form-item {
                    --vaadin-form-item-label-spacing: 0;
                    --vaadin-form-item-label-width: 0;
                    --vaadin-form-item-row-spacing: 1rem;
                }

                vaadin-number-field[label="Refund Total"] {
                    grid-column: 3;
                }

                #action {
                    grid-template-columns: repeat(2, 1fr);
                }

                #lineItems {
                    grid-template-columns: auto repeat(2, max-content);
                }

                .grid {
                    display: grid;
                }

                .grid.gap {
                    grid-gap: 1rem;
                }
            `,
        ];
    }

    render() {
        return html`
            <div class="grid gap">
                <vaadin-form-item>
                    <vaadin-number-field
                        disabled
                        label="Order ID:"
                        value=${this.item?.orderId}
                        required
                    ></vaadin-number-field>
                </vaadin-form-item>
                <div id="lineItems" class="full-width grid gap">
                    ${this.item?.order?.lineItems.map(
                        (item, index) => html`
                            <vaadin-text-field
                                disabled
                                label="Product Name"
                                value=${item.name}
                            ></vaadin-text-field>
                            <vaadin-number-field
                                label="Total"
                                value=${item.total}
                                required
                            >
                                <div slot="prefix">$</div>
                            </vaadin-number-field>
                            <vaadin-number-field
                                @input=${this._update}
                                data-index=${index}
                                label="Refund Amount"
                                value="0"
                                required
                            >
                                <div slot="prefix">$</div>
                            </vaadin-number-field>
                        `
                    )}
                    <vaadin-number-field
                        label="Refund Total"
                        value=${this.item?.amount}
                        required
                    >
                        <div slot="prefix">$</div>
                    </vaadin-number-field>
                </div>
                <vaadin-text-area
                    @input=${this._setText}
                    class="full-width"
                    label="Reason"
                    name="reason"
                ></vaadin-text-area>
                <hr />
                <div id="action" class="grid gap">
                    <vaadin-button @click=${this._back}>Cancel</vaadin-button>
                    <vaadin-button @click=${this._save}>Save</vaadin-button>
                </div>
            </div>
        `;
    }

    // Get item needs to be based on orderId, not id.
    async updated(changedProperties) {
        super.updated(changedProperties);

        if (
            changedProperties.has("item") &&
            (changedProperties.get("item") || {}).orderId !== this.item?.orderId
        ) {
            if (!this._getDisabled && !this.item?._getCompleted) {
                this.item = await this.getItem();
            }

            this.pending = false;
        }
    }

    async getItem() {
        const item = new Refund({ orderId: this.item.orderId });

        // No need to get the item.
        item._getCompleted = true;

        await item.getOrder();

        this.pending = false;

        return item;
    }

    async _save() {
        try {
            const response = await this.item.save();
            // notification(
            //     {
            //         message: html`<span style="flex: 1; text-align: center;"
            //             >${this._itemName} created!</span
            //         >`,
            //         theme: "success",
            //     },
            //     this.shadowRoot
            // );
            Router.go(
                `orders/${this.item.orderId}/refunds/${response.data.id}`
            );
        } catch (error) {
            notification(
                { message: error.response.data.message, theme: "error" },
                this.shadowRoot
            );
        }
    }

    _setText(e) {
        const target = e.target;
        this.item[target.name] = target.value;
    }

    _update(event) {
        console.log("item", this.item);
        console.log("event", event);
        console.log(this.item?.order?.lineItems);
        const lineItems = [...this.item?.order?.lineItems];
        if (!lineItems[event.target.dataset.index]) {
            lineItems[event.target.dataset.index] = {
                id: this.item?.order?.lineItems[event.target.dataset.index].id,
            };
        }

        lineItems[event.target.dataset.index].refund_total = event.target.value;

        console.log("Line items", lineItems);

        this.item.line_items = lineItems;

        this.requestUpdate("item");
    }
}
