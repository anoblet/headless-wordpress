import { logout, measure, notify } from "../utilities";
import { WooCommerce } from "../WooCommerce";
import { html } from "lit-html";

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
                })
                    .get(this._endpoint, this.params)
                    .catch((error) => {
                        // Instance host may have changed, so logout and try again
                        if (error.response.status === 403) {
                            notify({
                                message: html`
                                    <span
                                        style="display: flex; flex: 1; justify-content: center"
                                    >
                                        ${error.response.data.message}
                                    </span>
                                `,
                                theme: "error",
                            });

                            logout();

                            throw error;
                        }
                    });

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
