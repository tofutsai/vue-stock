import axios from "axios";
import PG from "./plugin.js";
//Request Config設定， baseURL是API的主要Domain，之後發請求時只要填相對路徑就可以了
var instance = axios.create({
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
  url: "/",
  method: "post",
  baseURL: 'http://tofutsai-001-site1.htempurl.com/',
  timeout: 180000,
});
//設置 request 的攔截器，放入兩個函式做為參數。
instance.interceptors.request.use(
  function(config) { // Do something before request is sent
    PG.setProgressBar(true);
    const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    config.headers["Content-Language"] =
      UserInfo == null ? "" : UserInfo.JWToken;
    return config;
  },
  function(error) { // Do something with request error
    PG.setProgressBar(false);

    PG.setAlert(error.message + ", URL:" + error.request.responseURL, "error");
    return Promise.reject(error);
  }
);
//設置 response 的攔截器，放入兩個函式做為參數。
instance.interceptors.response.use(
  function(res) {
    PG.setProgressBar(false);

    if (res.data) {
      if (instance.show) {
        // PG.setSnackBar(res.data.Message, "success");
      }
      return res;
    } else {
      console.log("[axiosAPI] response false", res);
      PG.setAlert(res.data.Message, "error");
      return Promise.reject(res);
    }
  },
  function(error) {
    PG.setProgressBar(false);
    console.log("response error", error);
    PG.setAlert(error.message + ", URL:" + error.request.responseURL, "error");
    return Promise.reject(error);
  }
);

export default {
  instance,
};
