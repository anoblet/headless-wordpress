import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { config } from "../../config";

export const WooCommerce = ({ version } = { version: "wc/v3" }) => {
    const { url, consumerKey, consumerSecret } = config.wooCommerce;

    return new WooCommerceRestApi({
        url,
        consumerKey,
        consumerSecret,
        version,
    });
};
