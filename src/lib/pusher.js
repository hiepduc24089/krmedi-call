import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { PUSHER_APP_KEY, PUSHER_APP_CLUSTER } from "./config";

export const echo = new Echo({
    broadcaster: "pusher",
    key: PUSHER_APP_KEY,
    cluster: PUSHER_APP_CLUSTER,
    wsHost: "127.0.0.1",
    wsPort: 6001,
    disableStats: true, // optional, to disable stats collection
    encrypted: false, // optional, set to true if using HTTPS
    forceTLS: false, // optional, set to true if using HTTPS
    enabledTransports: ["ws"], // optional, use 'ws' only for WebSocket
});