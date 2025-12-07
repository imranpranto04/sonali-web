import axios from "axios";

export const http = axios.create({
  baseURL: "https://www.sonalilife.com:1010/api",
  timeout: 10000,
});
