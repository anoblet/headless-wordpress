import { WooCommerce } from "../WooCommerce";
import { BaseItemModel } from "./BaseItemModel";

export class Membership extends BaseItemModel {
    get endpoint() {
        return `memberships/members/${this.id}`;
    }

    async set(data) {
        const response = await WooCommerce().put(this.endpoint, data);

        return this;
    }
}
