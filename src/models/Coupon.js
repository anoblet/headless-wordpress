import { formatDate } from "../utilities";
import { WooCommerce } from "../WooCommerce";
import { BaseItemModel } from "./BaseItemModel";

export class Coupon extends BaseItemModel {
    _data = {};
    _getCompleted = false;

    get _endpoint() {
        return `coupons/${this.id}`;
    }

    constructor(args) {
        super();
        Object.assign(this._data, args);
    }

    get amount() {
        return this._data.amount;
    }

    get code() {
        return this._data.code;
    }

    get date_created() {
        return formatDate(this._data.date_created);
    }

    get id() {
        return this._data.id;
    }

    async get() {
        const { data } = await WooCommerce().get(this._endpoint);
        Object.assign(this._data, data);

        this._getCompleted = true;

        return this;
    }
}
