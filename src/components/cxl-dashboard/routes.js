export const routes = [
    { path: "/", component: "cxl-customer-grid" },
    { path: "/iframe.html", component: "cxl-customer-grid" },
    {
        path: "/customers",
        children: [
            { path: "/", component: "cxl-customer-grid" },
            { path: "/:id", component: "cxl-customer-view" },
        ],
    },
    {
        path: "/membership",
        children: [
            { path: "details/:id", component: "cxl-membership-details" },
            { path: "edit/:id", component: "cxl-membership-edit" },
            { path: "grid", component: "cxl-membership-grid" },
            { path: "view/:id", component: "cxl-membership-view" },
        ],
    },
    {
        path: "/orders",
        children: [
            { path: "/", component: "cxl-order-grid" },
            { path: "/:id", component: "cxl-order-view" },
            { path: "/:orderId/refunds/:id", component: "cxl-refund-view" },
        ],
    },
    {
        path: "/refund",
        children: [
            { path: "create/:orderId", component: "cxl-refund-create" },
            { path: "details/:id", component: "cxl-refund-details" },
            { path: "grid", component: "cxl-refund-grid" },
            { path: "view/:orderId/:id", component: "cxl-refund-view" },
        ],
    },
    {
        path: "/subscriptions",
        children: [
            { path: "/:id", component: "cxl-subscription-view" },
            { path: "/:id/coupon", component: "cxl-subscription-coupon" },
        ],
    },
    { path: "(.*)", component: "x-not-found-view" },
];
