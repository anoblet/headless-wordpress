import { css, customElement, html } from "lit-element";
import { ViewElement } from "../../BaseElements/ViewElement";
import { Refund } from "../../Models/Refund";

@customElement("cxl-refund-view")
export class CXLRefundViewElement extends ViewElement {
    _itemType = Refund;

    static get styles() {
        return [
            super.styles,
            css`
                label::after {
                    content: ":";
                }

                #grid {
                    display: grid;
                    grid-template-columns: repeat(4, max-content);
                }

                #grid > * {
                    padding: 0.5rem;
                }

                .capitalize {
                    text-transform: capitalize;
                }
            `,
        ];
    }

    render() {
        console.log(this.item);
        return html`
            <div id="grid">
                <label>ID</label>
                <div>${this.item?.id}</div>
                <label>Date Created</label>
                <div>${this.item?.date_created}</div>
                <label>Amount</label>
                <div>${this.item?.amount}</div>
                <label>Reason</label>
                <div>${this.item?.reason}</div>
                <label>Customer</label>
                <div>
                    <a href="/customers/${this.item?.customer?.id}"
                        >${this.item?.customer?.name}</a
                    >
                </div>
                <label>Order</label>
                <div>
                    <a href="/orders/${this.item?.order?.id}"
                        >#${this.item?.order?.number}</a
                    >
                </div>
            </div>
        `;
    }

    async getItem() {
        const item = await super.getItem();

        // needs to be synchroneous because we get customer id from the order
        await item.getOrder();
        await item.getCustomer();

        return item;
    }
}
