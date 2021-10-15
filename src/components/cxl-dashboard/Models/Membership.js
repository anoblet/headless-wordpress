import { WooCommerce } from "../WooCommerce";
import { BaseItemModel } from "./BaseItemModel";
import { formatDate } from "../utilities";

export class Membership extends BaseItemModel {
    get endpoint() {
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

    get startDate() {
        return formatDate(this._data.start_date);
    }
}
