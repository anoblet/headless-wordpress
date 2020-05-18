import { customElement, LitElement } from "lit-element";
import style from "./style.css";
import template from "./template.html";

@customElement("shell-component")
export class ShellComponent extends LitElement {
    public static get styles() {
        return style;
    }

    public render = template.bind(this);
}
