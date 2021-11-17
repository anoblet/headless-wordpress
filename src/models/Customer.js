import { formatDate, measure } from "../utilities";
import { BaseItemModel } from "./BaseItemModel";
import { MembershipCollection } from "./MembershipCollection";
import { OrderCollection } from "./OrderCollection";
import { SubscriptionCollection } from "./SubscriptionCollection";
import { WooCommerce } from "../WooCommerce";

export class Customer extends BaseItemModel {
    _response;
    _updates = {};
    _getCompleted = false;

    get _endpoint() {
        return `customers/${this.id}`;
    }

    get billing() {
        return {
            address: this._data.billing.address_1,
            city: this._data.billing.city,
            country: this._data.billing.country,
            phone: this._data.billing.phone,
        };
    }

    set billing(value) {}

    get currency() {
        return (
            this.orders &&
            this.orders.total > 0 &&
            this.orders.items[this.orders.total - 1].currency
        );
    }

    get customerSince() {
        return formatDate(this._data.date_created);
    }

    get email() {
        return this._data.email;
    }

    set email(value) {
        this._updates.email = value;
    }

    get firstName() {
        return this._data.first_name;
    }

    set firstName(value) {
        this._updates.first_name = value;
    }

    get id() {
        return this._data.id;
    }

    get isPayingCustomer() {
        return this.is_paying_customer;
    }

    get isPayingCustomerFormatted() {
        return this.is_paying_customer
            ? `<span style="color: green">Yes</span>`
            : `No`;
    }

    get lastName() {
        return this._data.last_name;
    }

    set lastName(value) {
        this._updates.last_name = value;
    }

    get name() {
        return `${this.firstName} ${this.lastName}`;
    }

    get memberships() {
        return this._memberships;
    }

    get productName() {
        return (
            this._subscriptions &&
            this._subscriptions.total > 0 &&
            this._subscriptions.items[0].productName
        );
    }

    get subscriberSince() {
        return (
            this._subscriptions?.total > 0 &&
            formatDate(this._subscriptions.items[0].startDate)
        );
    }

    get subscriptions() {
        return this._subscriptions;
    }

    get team() {
        return "*Sample Team*";
    }

    async getMemberships() {
        if (!this._memberships) {
            this._memberships = await new MembershipCollection({
                params: { customer: this.id },
            }).get();
        }

        return this._memberships;
    }

    async getOrders() {
        if (!this.orders) {
            this.orders = await new OrderCollection({
                params: { customer: this.id },
            }).get();
        }

        return this.orders;
    }

    async getSubscriptions() {
        if (!this._subscriptions) {
            this._subscriptions = await new SubscriptionCollection({
                params: { customer: this.id },
            }).get();
        }

        return this._subscriptions;
    }

    async save() {
        await measure({ endpoint: this._endpoint }, async () => {
            this._response = await WooCommerce({ version: this._version }).put(
                this._endpoint,
                this._updates
            );
        });

        return this;
    }

    _getViewPath(item) {
        return this._endpoint;
    }
}
