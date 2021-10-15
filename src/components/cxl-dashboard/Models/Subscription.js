import { BaseItemModel } from "./BaseItemModel";
import { formatDate } from "../utilities";
import { WooCommerce } from "../WooCommerce";

export class Subscription extends BaseItemModel {
    _version = "wc/v1";

    get _endpoint() {
        return `subscriptions/${this.id}`;
    }

    get frequency() {
        return `${this._data.billing_interval} ${this._data.billing_period}`;
    }

    get couponLines() {
        return this._data.coupon_lines;
    }

    set couponLines(value) {
        this._data.coupon_lines = value;
    }

    get currency() {
        return this._data.currency;
    }

    get endDate() {
        return formatDate(this._data.start_date);
    }

    get id() {
        return this._data.id;
    }

    get productName() {
        return this._data.line_items[this._data.line_items.length - 1]?.name;
    }

    get startDate() {
        return formatDate(this._data.start_date);
    }

    get status() {
        return this._data.status;
    }

    get total() {
        return this._data.total;
    }

    get totalFormatted() {
        return `${this.total} ${this.currency}`;
    }

    async put(data = this._data) {
        this._lastResponse = await WooCommerce({ version: this._version }).put(
            this._endpoint,
            data
        );

        return this;
    }

    _getViewPath() {
        return `subscriptions/${this.id}`;
    }
}
