import { WooCommerce } from "../WooCommerce";
import { measure } from "../utilities";

export class BaseModel {
    constructor(args) {
        Object.assign(this, args);
    }
}
