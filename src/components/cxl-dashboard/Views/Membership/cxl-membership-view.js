import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import { css, customElement, html } from "lit-element";
import { ViewElement } from "../../BaseElements/ViewElement";
import { Membership } from "../../Models/Membership";

@customElement("cxl-membership-view")
export class CXLMembershipViewElement extends ViewElement {
    _itemType = Membership;

    static get styles() {
        return [
            super.styles,
            css`
                .capitalize {
                    text-transform: capitalize;
                }
            `,
        ];
    }

    render() {
        console.log(this.item);
        return html`
            <vaadin-form-layout>
                <vaadin-form-item>
                    <span slot="label">ID</span>
                    ${this.item?.id}
                </vaadin-form-item>
                <vaadin-form-item>
                    <span slot="label">Product Name:</span>
                    ${this.item?.productName}
                </vaadin-form-item>
                <vaadin-form-item class="capitalize">
                    <span slot="label">Status</span>
                    ${this.item?.status}
                </vaadin-form-item>
                <vaadin-form-item>
                    <span slot="label">Date Created</span>
                    ${this.item?.dateCreated}
                </vaadin-form-item>
                <vaadin-form-item>
                    <span slot="label">Start Date</span>
                    ${this.item?.startDate}
                </vaadin-form-item>
                <vaadin-form-item>
                    <span slot="label">End Date</span>
                    ${this.item?.endDate}
                </vaadin-form-item>
            </vaadin-form-layout>
        `;
    }
}
