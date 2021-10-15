import { WooCommerce } from "../WooCommerce";
import { BaseItemModel } from "./BaseItemModel";
import { formatDate } from "../utilities";

export class Membership extends BaseItemModel {
    get _endpoint() {
        return `memberships/members/${this.id}`;
    }

    async set(data) {
        const response = await WooCommerce().put(this.endpoint, data);

        return this;
    }

    get dateCreated() {
        return formatDate(this._data.date_created);
    }

    get endDate() {
        return formatDate(this._data.end_date);
    }

    get id() {
        return this._data.id;
    }

    get productName() {
        // return this._data.product_name;
        return "*Product Name*";
    }

    get startDate() {
        return formatDate(this._data.start_date);
    }

    get status() {
        return this._data.status;
    }

    _getViewPath(item) {
        console.log("endpoint", this, this._endpoint);
        return this._endpoint;
    }
}
