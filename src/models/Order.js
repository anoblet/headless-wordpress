import { formatDate } from "../utilities";
import { BaseItemModel } from "../models";
import { CouponCollection } from "./CouponCollection";
import { Customer } from "./Customer";
import { RefundCollection } from "./RefundCollection";
import { capitalize } from "lodash-es";

export class Order extends BaseItemModel {
    _customer;

    get coupons() {
        return this._coupons || {};
    }

    get currency() {
        return this._data.currency;
    }

    get currencySymbol() {
        return this._data.currency_symbol;
    }

    get customer() {
        return this._customer;
    }

    get customerName() {
        return `${this._data.billing.first_name} ${this._data.billing.last_name}`;
    }

    get customerId() {
        return this._data.customer_id;
    }

    get dateCreated() {
        return formatDate(this._data.date_created);
    }

    get dateModified() {
        return formatDate(this._data.date_modified);
    }

    get _endpoint() {
        return `orders/${this.id}`;
    }

    get id() {
        return this._data.id;
    }

    get lineItems() {
        return this._data.line_items;
    }

    get number() {
        return this._data.number;
    }

    get productName() {
        return this.lineItems[0].name;
    }

    get refunds() {
        return this._refunds || {};
    }

    get relationship() {
        return this._data.parent_id === 0 ? "Parent Order" : "Renewal Order";
    }

    get status() {
        return capitalize(this._data.status);
    }

    get total() {
        return this._data.total;
    }

    get totalFormatted() {
        return `${this.currencySymbol}${this.total}`;
    }

    async getCoupons() {
        if (!this._coupons) {
            this._coupons = await new CouponCollection({
                params: { orderId: this.id },
            }).get();
        }

        return this._coupons;
    }

    async getCustomer() {
        if (!this._customer) {
            this._customer = await new Customer({ id: this.customerId }).get();
        }

        return this._customer;
    }

    async getRefunds() {
        if (!this._refunds) {
            this._refunds = await new RefundCollection({
                orderId: this.id,
            }).get();
        }

        return this._refunds;
    }

    _getViewPath() {
        return this._endpoint;
    }
}
