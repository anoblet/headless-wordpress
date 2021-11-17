import "./components/cxl-dashboard/Views/Customer/cxl-customer-details";
import "./components/cxl-dashboard/Views/Customer/cxl-customer-grid";
import "./components/cxl-dashboard/Views/Customer/cxl-customer-view";

import "./components/cxl-dashboard/Views/knowledge-base/cxl-knowledge-base";

import "./components/cxl-dashboard/Views/Membership/cxl-membership-grid";
import "./components/cxl-dashboard/Views/Membership/cxl-membership-view";

import "./components/cxl-dashboard/Views/Order/cxl-order-details";
import "./components/cxl-dashboard/Views/Order/cxl-order-grid";
import "./components/cxl-dashboard/Views/Order/cxl-order-refund";
import "./components/cxl-dashboard/Views/Order/cxl-order-view";

import "./components/cxl-dashboard/Views/Refund/cxl-refund-create";
import "./components/cxl-dashboard/Views/Refund/cxl-refund-grid";
import "./components/cxl-dashboard/Views/Refund/cxl-refund-view";

import "./components/cxl-dashboard/Views/Search/wp-search";

import "./components/cxl-dashboard/Views/Subscription/cxl-subscription-coupon";
import "./components/cxl-dashboard/Views/Subscription/cxl-subscription-grid";
import "./components/cxl-dashboard/Views/Subscription/cxl-subscription-switch";
import "./components/cxl-dashboard/Views/Subscription/cxl-subscription-view";

import "./components/wp-login";

const guard = (context, commands) => {};

export const routes = [
    { path: "/", component: "cxl-customer-grid" },
    {
        path: "/customers",
        children: [
            { path: "/", component: "cxl-customer-grid" },
            { path: "/:id", component: "cxl-customer-view" },
        ],
    },
    {
        path: "/knowledge-base",
        component: "cxl-knowledge-base",
    },
    {
        path: "/login",
        component: "wp-login",
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
        path: "/memberships/members",
        children: [
            { path: "/", component: "cxl-membership-grid" },
            { path: "/:id", component: "cxl-membership-view" },
        ],
    },
    {
        path: "/orders",
        children: [
            { path: "/", component: "cxl-order-grid" },
            { path: "/:id", component: "cxl-order-view" },
            { path: "/:orderId/refunds", component: "cxl-order-refund" },
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
        path: "/search",
        component: "wp-search",
    },
    {
        path: "/subscriptions",
        children: [
            { path: "/:id", component: "cxl-subscription-view" },
            { path: "/:id/coupon", component: "cxl-subscription-coupon" },
            { path: "/:id/switch", component: "cxl-subscription-switch" },
        ],
    },
    { path: "(.*)", component: "x-not-found-view" },
];
