import { formatDate, measure } from "../utilities";
import { WooCommerce } from "../WooCommerce";
import { Customer } from "./Customer";
import { Order } from "./Order";
import { BaseItemModel } from "./BaseItemModel";

export class Refund extends BaseItemModel {
    get _endpoint() {
        return `orders/${this.orderId}/refunds/${this.id}`;
    }

    get amount() {
        // Calculate if we can.
        if (this.lineItems?.length > 0) {
            this._data.amount = this.lineItems?.reduce((total, item) => {
                return total + Number(item.refund_total);
            }, 0);
        }

        return this._data.amount || 0;
    }

    set amount(value) {
        this._data.amount = value;
    }

    get amountFormatted() {
        return `${this.amount}`;
    }

    get customer() {
        return this._customer;
    }

    get date_created() {
        return formatDate(this._data.date_created);
    }

    set date_created(value) {
        this._data.date_created = value;
    }

    get dateCreated() {
        return formatDate(this._data.date_created);
    }

    get id() {
        return this._data.id;
    }

    set id(value) {
        this._data.id = value;
    }

    get line_items() {
        return this._data.line_items || [];
    }

    // line_items is an array meaning we cannot assign item.line_items[0] = value
    set line_items(value) {
        this._data.line_items = value;
    }

    get lineItems() {
        return this._data.line_items;
    }

    get order() {
        return this._order;
    }

    get orderId() {
        return this._data.orderId;
    }

    set orderId(value) {
        this._data.orderId = value;
    }

    get reason() {
        return this._data.reason;
    }

    set reason(value) {
        this._data.reason = value;
    }

    get refunded_payment() {
        return this._data.refunded_payment ? "Yes" : "No";
    }

    async getCustomer() {
        if (!this._customer) {
            this._customer = await new Customer({
                id: this.order.customerId,
            }).get();
        }

        return this._customer;
    }

    async getOrder() {
        if (!this._order) {
            this._order = await new Order({ id: this.orderId }).get();
        }

        return this._order;
    }

    async save() {
        return await WooCommerce().post(`orders/${this.order.id}/refunds`, {
            amount: String(this.amount),
            api_refund: false,
            line_items: this.line_items,
            reason: this.reason,
        });
    }

    _getViewPath() {
        console.log(this);
        console.log(this.orderId);
        console.log(this._endpoint);

        return this._endpoint;
    }

    mapCollection(collection) {
        this.orderId = collection.orderId;
    }
}
