import { BaseCollectionModel } from "./BaseCollectionModel";
import { Membership } from "./Membership";

export class MembershipCollection extends BaseCollectionModel {
    _itemType = Membership;

    get _endpoint() {
        return `memberships/members`;
    }
}
