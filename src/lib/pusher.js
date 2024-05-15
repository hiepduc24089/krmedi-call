import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { PUSHER_APP_KEY, PUSHER_APP_CLUSTER } from "./config";

export const echo = new Echo({
    broadcaster: "pusher",
    key: PUSHER_APP_KEY,
    cluster: PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
});