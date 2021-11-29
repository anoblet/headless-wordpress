import "@vaadin/vaadin-button";
import "@vaadin/vaadin-dialog";
import "@vaadin/vaadin-form-layout";
import { css, property } from "lit-element";
import { BaseElement } from "./BaseElement";

export class ViewElement extends BaseElement {
    @property({ type: Boolean, attribute: "get-disabled" })
    _getDisabled = false;
    @property({ type: Object }) item;
    @property({ type: Boolean, reflect: true }) pending = true;

    _itemType;
    _tabIndex;

    location;

    static get styles() {
        return [
            ...super.styles,
            css`
                :host {
                    height: 100%;
                }

                :host([pending]) > * {
                    display: none !important;
                }

                :host([pending]) > #pending-message {
                    display: flex !important;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }

                :host(:not([pending])) #pending-message {
                    display: none;
                }
            `,
        ];
    }

    async updated(changedProperties) {
        super.updated(changedProperties);

        if (
            changedProperties.has("item") &&
            (changedProperties.get("item") || {}).id !== this.item?.id
        ) {
            if (!this._getDisabled && !this.item?._getCompleted) {
                this.item = await this.getItem();
            }

            this.pending = false;
        }
    }

    firstUpdated() {
        if (!this.item || !this.item._getCompleted) {
            if (this.location) {
                this.item = { ...this.location.params };
            }
        }
    }

    async getItem() {
        return await new this._itemType(this.item).get();
    }
}
