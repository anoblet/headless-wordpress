import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { config } from "../../config";
import axios from "axios";

axios.defaults.headers.common = {
    Authorization: `${localStorage.getItem("token")}`,
};

export const WooCommerce = ({ version } = { version: "wc/v3" }) => {
    const { url, consumerKey, consumerSecret } = config.wooCommerce;

    const authorization = `Bearer ${localStorage.getItem("token")}`;
    console.log(authorization);

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
