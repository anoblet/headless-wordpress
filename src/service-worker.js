import { clientsClaim, skipWaiting } from "workbox-core";
import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL("index.html");
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);
