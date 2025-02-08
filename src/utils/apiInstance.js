import axios from "axios";

let dev = false;
let url = "https://api.blog.redsols.com/";

// if (window.location.hostname === "localhost") {
//   dev = true;
// }

// dev = true;

if (dev) {
  url = "http://127.0.0.1:5000/";
}

export const apiInstance = axios.create({
  baseURL: url,
});
