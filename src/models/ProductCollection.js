import { BaseCollectionModel } from "./BaseCollectionModel";
import { Product } from "./Product";

export class ProductCollection extends BaseCollectionModel {
    _itemType = Product;

    get _endpoint() {
        return `products`;
    }
}
