import { BaseCollectionModel } from "../models";
import { Coupon } from "./Coupon";

export class CouponCollection extends BaseCollectionModel {
    _itemType = Coupon;

    get _endpoint() {
        return `coupons`;
    }
}
