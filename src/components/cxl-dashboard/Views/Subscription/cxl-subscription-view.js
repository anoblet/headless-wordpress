import "@vaadin/vaadin-icons";
import { css, customElement, html } from "lit-element";
import { config } from "../../../../config";
import { Subscription } from "../../../../models";
import { ViewElement } from "../../BaseElements/ViewElement";
import { navigate, navigateExternal } from "../../utilities";

@customElement("cxl-subscription-view")
export class CXLSubscriptionViewElement extends ViewElement {
    _itemType = Subscription;

    static get styles() {
        return [...super.styles, css``];
    }

    render() {
        return html`
            <div class="grid gap">
                <div class="columns grid gap">
                    <vaadin-button
                        @click=${() =>
                            navigateExternal(
                                `${config.wooCommerce.url}/wp/wp-admin/post.php?post=${this.item.id}&action=edit`
                            )}
                    >
                        Wordpress
                        <iron-icon
                            icon="vaadin:external-link"
                            slot="suffix"
                        ></iron-icon>
                    </vaadin-button>
                    <vaadin-button
                        @click=${() =>
                            navigate(`/customers/${this.item.customerId}`)}
                    >
                        Customer
                        <iron-icon
                            icon="vaadin:external-link"
                            slot="suffix"
                        ></iron-icon>
                    </vaadin-button>
                    <!-- <vaadin-button
                        @click="${() =>
                        navigate(`/subscriptions/${this.item?.id}/switch`)}"
                        >Upgrade/Downgrade
                    </vaadin-button>
                    <vaadin-button
                        @click=${() =>
                        navigate(`/subscriptions/${this.item?.id}/coupon`)}
                        >Edit Coupon</vaadin-button
                    > -->
                </div>
                <hr />
                <div class="columns grid gap">
                    <vaadin-text-field
                        disabled
                        label="#"
                        value="${this.item?.id}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Product Name"
                        value="${this.item?.productName}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Frequency"
                        value="${this.item?.frequency}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Start Date"
                        value="${this.item?.startDate}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="End Date"
                        value="${this.item?.endDate}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Coupon Code"
                        value="${this.item?.couponLines?.[0]?.code}"
                    ></vaadin-text-field>
                    <vaadin-text-field
                        disabled
                        label="Coupon Discount"
                        value="${this.item?.couponLines?.[0]?.discount}"
                    ></vaadin-text-field>
                </div>
            </div>
        `;
    }
}
