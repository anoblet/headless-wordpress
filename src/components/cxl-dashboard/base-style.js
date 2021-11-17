import { css } from "lit-element";

export const baseStyle = css`
    * {
        box-sizing: border-box;
    }

    :host {
        --lumo-disabled-text-color: var(--lumo-contrast-90pct);
    }

    hr {
        width: 100%;
    }

    .capitilize {
        text-transform: capitalize;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .column-gap {
        column-gap: 1rem;
    }

    .columns {
        grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
    }

    .flex {
        display: flex;
    }

    .flex.column {
        flex-direction: column;
    }

    .flex.grow {
        flex-grow: 1;
    }

    .full-height {
        height: 100%;
    }

    .gap {
        gap: 1rem;
    }

    .grid {
        display: grid;
    }

    .row-gap {
        row-gap: 1rem;
    }

    .padding {
        padding: 1rem;
    }

    .padding-bottom {
        padding-bottom: 1rem;
    }
`;
