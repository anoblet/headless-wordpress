import { BaseCollectionModel } from "./BaseCollectionModel";
import { Order } from "./Order";

export class OrderCollection extends BaseCollectionModel {
    _itemType = Order;

    get _endpoint() {
        return `orders`;
    }
}
