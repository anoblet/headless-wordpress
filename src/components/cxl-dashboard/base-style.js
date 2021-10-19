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

    .grid {
        display: grid;
    }

    .grid.gap {
        grid-gap: 1rem;
    }
`;
