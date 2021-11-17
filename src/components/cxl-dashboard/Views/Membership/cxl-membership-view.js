import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import { css, customElement, html } from "lit-element";
import { Membership } from "../../../../models";
import { ViewElement } from "../../BaseElements/ViewElement";
import { navigate } from "../../utilities";

@customElement("cxl-membership-view")
export class CXLMembershipViewElement extends ViewElement {
    _itemType = Membership;

    static get styles() {
        return [super.styles, css``];
    }

    render() {
        console.log(this.item);
        return html`
            <div class="gap grid">
                <div class="columns gap grid">
                    <vaadin-button
                        @click=${() =>
                            navigate(`/customers/${this.item.customerId}`)}
                    >
                        Customer
                        <iron-icon
                            icon="vaadin:external-link"
                            slot="suffix"
                        ></iron-icon>
                    </vaadin-button>
                </div>
                <hr />
                <div class="column-gap columns grid">
                    <vaadin-text-field
                        disabled
                        label="ID"
                        value=${this.item?.id}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Product Name"
                        value=${this.item?.productName}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Status"
                        value=${this.item?.status}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Date Created"
                        value=${this.item?.dateCreated}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="Start Date"
                        value=${this.item?.startDate}
                    ></vaadin-text-field>
                    <vaadin-text-field
                        label="End Date"
                        value=${this.item?.endDate}
                    ></vaadin-text-field>
                </div>
            </div>
        `;
    }
}
