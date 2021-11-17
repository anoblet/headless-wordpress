import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { config } from "../../config";

export const WooCommerce = ({ version } = { version: "wc/v3" }) => {
    const { url, consumerKey, consumerSecret } = config.wooCommerce;

    return new WooCommerceRestApi({
        axiosConfig: {
            // disable basic auth
            auth: undefined,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Bypass-Tunnel-Reminder": true,
            },
            withCredentials: false,
        },
        url,
        consumerKey,
        consumerSecret,
        version,
    });
};
