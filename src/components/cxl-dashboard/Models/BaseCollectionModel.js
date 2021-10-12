import { WooCommerce } from "../WooCommerce";
import { measure } from "../utilities";

export class BaseCollectionModel {
    _itemType;
    _items;
    _total;
    _version = "wc/v3";
    params;

    get items() {
        return this._items;
    }

    get total() {
        return this._total;
    }

    constructor(args) {
        Object.assign(this, args);
    }

    async get() {
        await measure(
            { endpoint: this._endpoint, params: this.params },
            async () => {
                const { data, headers } = await WooCommerce({
                    version: this._version,
                }).get(this._endpoint, this.params);

                this._items = data.map((item) => {
                    const _item = new this._itemType(item);

                    _item.mapCollection(this);

                    return _item;
                });

                this._total = Number(headers["x-wp-total"]);
            }
        );

        return this;
    }

    getItems() {
        return this._items;
    }

    getTotal() {
        return this._total;
    }
}
