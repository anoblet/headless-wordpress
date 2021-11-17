import { BaseItemModel } from "../models";

export class Product extends BaseItemModel {
    get _endpoint() {
        return `products/${this.id}`;
    }

    get id() {
        return this._data.id;
    }

    get name() {
        return this._data.name;
    }

    get price() {
        return this._data.price;
    }

    _getViewPath() {
        return this._endpoint;
    }
}
