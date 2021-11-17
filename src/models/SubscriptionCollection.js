import { BaseCollectionModel } from "../models";
import { Subscription } from "./Subscription";

export class SubscriptionCollection extends BaseCollectionModel {
    _itemType = Subscription;
    _version = "wc/v1";

    get _endpoint() {
        return `subscriptions`;
    }
}
