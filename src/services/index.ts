import axios from "axios";

let dev = false;
let url = "https://api.redsols.com";

if (process.env.NODE_ENV === "development") {
  dev = true;
}

if (dev) {
  url = "http://127.0.0.1:8000";
}

export const apiInstance = axios.create({
  baseURL: url,
});
