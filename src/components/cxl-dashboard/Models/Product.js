import { BaseItemModel } from "./BaseItemModel";

export class Product extends BaseItemModel {
    get _endpoint() {
        return `orders/${this.id}`;
    }

    _getViewPath() {
        return this._endpoint;
    }
}
