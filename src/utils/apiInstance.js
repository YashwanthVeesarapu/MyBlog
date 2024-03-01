import axios from "axios";

let dev = false;
let url = "https://api.redash.us/";

// if (window.location.hostname === "localhost") {
//   dev = true;
// }

if (dev) {
  url = "http://localhost:4000/";
}

export const apiInstance = axios.create({
  baseURL: url,
});
