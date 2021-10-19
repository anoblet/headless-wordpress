import "@vaadin/vaadin-accordion";
import { css, customElement, html } from "lit-element";
import { BaseElement } from "../../BaseElements/BaseElement";

@customElement("cxl-knowledge-base")
export class CXLKnowledgeBaseElement extends BaseElement {
    static get styles() {
        return [super.styles, css``];
    }

    render() {
        return html`
            <h1>Frequently Asked Questions:</h1>
            <vaadin-accordion>
                <vaadin-accordion-panel>
                    <div slot="summary">Question #1</div>
                    Answer #1
                </vaadin-accordion-panel>
                <vaadin-accordion-panel>
                    <div slot="summary">Question #2</div>
                    Answer #2
                </vaadin-accordion-panel>
                <vaadin-accordion-panel>
                    <div slot="summary">Question #3</div>
                    Answer #3
                </vaadin-accordion-panel>
            </vaadin-accordion>
            <h1>Resources:</h1>
            <vaadin-list-box>
                <vaadin-item><a href="Link #1">Link #1</a></vaadin-item>
                <vaadin-item><a href="Link #2">Link #2</a></vaadin-item>
                <vaadin-item><a href="Link #3">Link #3</a></vaadin-item>
            </vaadin-list-box>
        `;
    }
}
