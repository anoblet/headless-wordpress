import { css, html, property } from 'lit-element';
import { BaseElement } from "./BaseElement";

export class ViewElement extends BaseElement {
    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                #tabContent {
                    height: 100%;
                    overflow: hidden;
                }
            `
        ];
    }

    render() {
        return html`
            <vaadin-tabs @selected-changed="${this._selectedChanged}">
                <slot name="tabs"></slot>
            </vaadin-tabs>
            <div id="tabContent">
                <slot name="tabContent"></slot>
            </div>
        `;
    }

    _selectedChanged(e) {
        this._tabIndex = e.detail.value;
    }
}
