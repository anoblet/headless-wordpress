import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { config } from "./config";

export const WooCommerce = ({ version } = { version: "wc/v3" }) => {
    const { consumerKey, consumerSecret } = config.wooCommerce;

    return new WooCommerceRestApi({
        axiosConfig: {
            // disable basic auth
            auth: undefined,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                // "Bypass-Tunnel-Reminder": true,
            },
            withCredentials: false,
        },
        consumerKey,
        consumerSecret,
        url: config.wordpress.url,
        version,
    });
};
