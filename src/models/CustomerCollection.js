import { BaseCollectionModel } from "../models";
import { Customer } from "./Customer";

export class CustomerCollection extends BaseCollectionModel {
    _itemType = Customer;

    get _endpoint() {
        return `customers`;
    }
}
