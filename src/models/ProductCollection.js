import { BaseCollectionModel } from "../models";
import { Product } from "./Product";

export class ProductCollection extends BaseCollectionModel {
    _itemType = Product;

    get _endpoint() {
        return `products`;
    }
}
