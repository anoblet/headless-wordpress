import { css } from "lit-element";

export const baseStyle = css`
    :host {
        --lumo-disabled-text-color: var(--lumo-contrast-90pct);
    }

    hr {
        width: 100%;
    }

    .capitilize {
        text-transform: capitalize;
    }

    .columns {
        grid-template-columns: repeat(auto-fit, minmax(512px, 1fr));
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

    .gap {
        gap: 1rem;
    }

    .grid {
        display: grid;
    }
`;
