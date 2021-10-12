import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const WooCommerce = ({ version } = { version: "wc/v3" }) =>
    new WooCommerceRestApi({
        url: "https://7af8-108-14-111-165.ngrok.io",
        consumerKey: "ck_6671ea814aad12258d6035fc2369c37fd8b0b61b",
        consumerSecret: "cs_d650eefab1f2d4ec819a3797b735f20863ed701c",
        queryStringAuth: true,
        version,
    });
