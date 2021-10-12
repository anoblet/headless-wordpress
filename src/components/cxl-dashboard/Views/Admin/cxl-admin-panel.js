import "@vaadin/vaadin-button";
import { css, customElement, html } from "lit-element";
import { BaseElement } from "../../BaseElements/BaseElement";
import { WooCommerce } from "../../WooCommerce";
import { sampleCustomer } from "./sample-customer";
import { sampleOrder } from "./sample-order";

@customElement("cxl-admin-panel")
export class CXLAdminPanelElement extends BaseElement {
    pending = false;

    static get styles() {
        return [super.styles, css``];
    }

    render() {
        return html`
            <vaadin-button @click=${this._createCustomer}
                >Create Customer</vaadin-button
            >
        `;
    }

    async _createCustomer() {
        let response;

        const randomId = Math.floor(Math.random() * 1000);

        Object.assign(sampleCustomer, {
            email: `john.doe.${randomId}@example.com`,
            username: `john.doe.${randomId}`,
        });

        try {
            response = await WooCommerce().post("customers", sampleCustomer);
            if (response.status === 201) {
                this._notification({
                    message: "Customer created!",
                    theme: "success",
                });
            }
        } catch (e) {
            this._notification({
                messeage: "Unable to create customer",
                theme: "error",
            });
            console.log(e);
        }

        this._createOrder({ customer: response.data });

        return response.data;
    }

    _createMembership({ customer, planId }) {}

    async _createOrder({ customer }) {
        let response;

        Object.assign(sampleOrder, {
            billing: customer.billing,
            customer_id: customer.id,
            shipping: customer.shipping,
        });

        try {
            response = await WooCommerce().post("orders", sampleOrder);
            if (response.status === 201) {
                this._notification({
                    message: "Order created!",
                    theme: "success",
                });
            }
        } catch (e) {
            this._notification({
                messeage: "Unable to create order",
                theme: "error",
            });
        }
    }

    async _createSubscription() {}
}
