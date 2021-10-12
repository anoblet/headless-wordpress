import "@vaadin/vaadin-form-layout";
import "@vaadin/vaadin-form-layout/vaadin-form-item";
import { css, customElement, html } from "lit-element";
import { nothing } from "lit-html";
import { Membership } from "../../Models/Membership";
import { ViewElement } from "../../BaseElements/ViewElement";

const formatDate = (date) => (date ? date.toLocaleString() : nothing);

@customElement("cxl-membership-view")
export class CXLMembershipViewElement extends ViewElement {
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
        return html`
            <vaadin-form-layout>
                <vaadin-form-item>
                    <span slot="label">ID</span>
                    ${this.item.id}
                </vaadin-form-item>
                <vaadin-form-item>
                    <span slot="label">Plan name:</span>
                    ${this.item.productName}
                </vaadin-form-item>
                <vaadin-form-item class="capitalize">
                    <span slot="label">Status</span>
                    ${this.item.status}
                </vaadin-form-item>
                <vaadin-form-item>
                    <span slot="label">Date created</span>
                    ${formatDate(this.item.date_created)}
                </vaadin-form-item>
                <vaadin-form-item>
                    <span slot="label">Date modified</span>
                    ${formatDate(this.item.date_modified)}
                </vaadin-form-item>
            </vaadin-form-layout>
        `;
    }

    async getItem() {
        this.item = await new Membership(this.item).get();
    }
}
