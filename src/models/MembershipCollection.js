import { BaseCollectionModel } from "../models";
import { Membership } from "./Membership";

export class MembershipCollection extends BaseCollectionModel {
    _itemType = Membership;

    get _endpoint() {
        return `memberships/members`;
    }
}
