import "@vaadin/vaadin-button";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-filter-column";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";
import { customElement, html } from "lit-element";
import { MembershipCollection } from "../../../../models";
import { GridElement } from "../../BaseElements/GridElement";

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
                <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header="#"
                    path="id"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Product Name"
                    path="productName"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    header="Date Created"
                    path="dateCreated"
                    auto-width
                    flex-grow="0"
                    data-format="date"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="Start Date"
                    path="startDate"
                    auto-width
                    flex-grow="0"
                    data-format="date"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="End Date"
                    path="endDate"
                    auto-width
                    flex-grow="0"
                    data-format="date"
                >
                </vaadin-grid-column>
                <vaadin-grid-column
                    header="Status"
                    path="status"
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
                <vaadin-grid-column
                    .renderer=${this._boundActionColumnRenderer}
                    auto-width
                    flex-grow="0"
                ></vaadin-grid-column>
            </vaadin-grid>
        `;
    }

    // Filters don't work
    // This is overidden because we cannot pass `order` as a parameter for the `memberships/members` enpoint.
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
