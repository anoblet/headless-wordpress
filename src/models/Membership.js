import { WooCommerce } from "../WooCommerce";
import { BaseItemModel } from "../models";
import { formatDate } from "../utilities";
import { capitalize } from "lodash-es";

export class Membership extends BaseItemModel {
    get _endpoint() {
        return `memberships/members/${this.id}`;
    }

    get customerId() {
        return this._data.customer_id;
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
        return capitalize(this._data.status);
    }

    _getViewPath(item) {
        return this._endpoint;
    }
}
