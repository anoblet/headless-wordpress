import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-filter-column";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";
import { customElement, html, render } from "lit-element";
import { GridElement } from "../../BaseElements/GridElement";
import { MembershipCollection } from "../../Models/MembershipCollection";
import { WooCommerce } from "../../WooCommerce";

@customElement("cxl-membership-grid")
export class CXLMembershipGridElement extends GridElement {
    _baseRoute = "membership";
    _collectionType = MembershipCollection;

    get endpoint() {
        return `memberships/members`;
    }

    type = "membership";

    render() {
        return html`
            <vaadin-grid .items=${this.items}>
                <vaadin-grid-sort-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-sort-column>
                <vaadin-grid-filter-column
                    header="Product Name"
                    path="productName"
                ></vaadin-grid-filter-column>
                <vaadin-grid-sort-column
                    header="Date Created"
                    path="dateCreated"
                    auto-width
                    flex-grow="0"
                    data-format="date"
                >
                </vaadin-grid-sort-column>
                <vaadin-grid-sort-column
                    header="Start Date"
                    path="startDate"
                    auto-width
                    flex-grow="0"
                    data-format="date"
                >
                </vaadin-grid-sort-column>
                <vaadin-grid-sort-column
                    header="End Date"
                    path="endDate"
                    auto-width
                    flex-grow="0"
                    data-format="date"
                >
                </vaadin-grid-sort-column>
                <vaadin-grid-filter-column
                    header="Status"
                    path="status"
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-filter-column>
                <vaadin-grid-column
                    .renderer=${this._boundActionColumnRenderer}
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }

    firstUpdated() {
        super.firstUpdated();

        this._setColumnRenderers();
    }

    _formatDateRenderer(root, column, model) {
        render(
            html`${new Date(
                model.item[column.getAttribute("path")]
            ).toLocaleDateString()}`,
            root
        );
    }

    async _formatPlanIdRenderer(root, column, model) {
        const plan = await this._getPlan(model.item.plan_id);
        render(html`${plan.name}`, root);
    }

    async _getPlan(planId) {
        return (await WooCommerce().get(`memberships/plans/${planId}`)).data;
    }

    _setColumnRenderers() {
        [...this.shadowRoot.querySelectorAll('[path="plan_id"]')].map(
            (column) => {
                column.renderer = this._formatPlanIdRenderer.bind(this);
            }
        );

        [
            ...this.shadowRoot.querySelectorAll(
                'vaadin-grid-sort-column[data-format="date"]'
            ),
        ].map((column) => {
            column.renderer = this._formatDateRenderer;
        });
    }

    // filters don't work
    async dataProvider(params, callback) {
        const filter = { ...this.filter };

        params.filters.map((_filter) => {
            filter[_filter.path] = _filter.value;
        });

        let order = "desc";
        let orderby = "id";

        params.sortOrders.map((_sortOrder) => {
            orderby = _sortOrder.path;
            order = _sortOrder.direction;
        });

        const list = await new this._collectionType({
            ...this._props,
            ...{
                params: {
                    ...this.params,
                    ...filter,
                    orderby,
                    page: ++params.page,
                    per_page: params.pageSize,
                },
            },
        }).get();

        callback(list.getItems(), list.getTotal());
    }
}
