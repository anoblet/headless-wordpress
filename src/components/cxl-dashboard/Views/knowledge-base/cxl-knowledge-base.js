import { css, customElement, html } from "lit-element";
import { BaseElement } from "../../BaseElements/BaseElement";

@customElement("cxl-knowledge-base")
export class CXLKnowledgeBaseElement extends BaseElement {
    static get styles() {
        return [super.styles, css``];
    }

    render() {
        return html` <h1>FAQ</h1> `;
    }
}
