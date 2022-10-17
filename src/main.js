import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

createApp(App).mount("#app");
