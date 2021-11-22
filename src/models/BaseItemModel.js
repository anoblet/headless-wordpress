import { WooCommerce } from "../WooCommerce";
import { measure } from "../utilities";
import { BaseModel } from "./BaseModel";

export class BaseItemModel extends BaseModel {
    _data = {};
    _version = "wc/v3";

    constructor(args) {
        super();
        Object.assign(this._data, args);
    }

    async get() {
        await measure({ endpoint: this._endpoint }, async () => {
            const { data } = await WooCommerce({ version: this._version })
                .get(this._endpoint)
                .catch((error) => {
                    // Instance host may have changed, so logout and try again
                    if (error.response.status === 403) {
                        logout();
                    }
                });
            Object.assign(this._data, data);
        });

        this._getCompleted = true;

        return this;
    }

    getData() {
        return this._data;
    }

    mapCollection(collection) {
        return;
    }
}
