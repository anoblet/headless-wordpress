import "@vaadin/vaadin-text-field";
import { css, customElement, html } from "lit-element";
import { Refund } from "../../models";
import { ViewElement } from "../../base-elements/ViewElement";

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
        return html`
            <div class="grid">
                <vaadin-text-field
                    disabled
                    label="ID"
                    value=${this.item?.id}
                ></vaadin-text-field>
                <vaadin-text-field
                    disabled
                    label="Date Created"
                    value=${this.item?.dateCreated}
                ></vaadin-text-field>
                <vaadin-text-field
                    disabled
                    label="Amount"
                    value=${this.item?.amount}
                ></vaadin-text-field>
                <vaadin-text-area
                    disabled
                    label="Reason"
                    value=${this.item?.reason}
                ></vaadin-text-area>
                <ul>
                    <li>
                        Customer:
                        <a href="/customers/${this.item?.customer?.id}"
                            >${this.item?.customer?.name}</a
                        >
                    </li>
                    <li>
                        Order #:
                        <a href="/orders/${this.item?.order?.id}"
                            >${this.item?.order?.number}</a
                        >
                    </li>
                </ul>
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
