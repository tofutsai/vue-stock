import Vue from "vue";
import global from "./global.js";
const moment = require("moment");

const Plugin = {
  mixin: {
    data() {
      return {};
    },
    computed: {},
    filters: {
      formatDateTime(v) {
        return Plugin.formatDateTime(v);
      },
      formatDate(v) {
        return Plugin.formatDate(v);
      },
      formatDatetoMD(v) {
        return Plugin.formatDatetoMD(v);
      },
      xformat(v) {
        return Plugin.xformat(v);
      },
      formatCommas(v) {
        return Plugin.formatCommas(v);
      },
      formatCommasRound(v) {
        return Plugin.formatCommasRound(v);
      },
    },
  },
  getOper() {
    const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    if (UserInfo != null && UserInfo != "") {
      return UserInfo;
    } else {
      const UserInfo = {
        // id: 4,
        // account: "tofu",
        // name: "MR TOFU",
      };
      return UserInfo;
    }
  },
  xformat(v) {
    return v ? "Yes" : "No";
  },
  formatDateTime(value, split = "/") {
    if (value && value != "0") {
      let d = moment(value).format(`YYYY${split}MM${split}DD HH:mm:ss`);
      if (d != "Invalid date") value = d;
    }
    return value;
  },
  formatDate(value, split = "/") {
    if (value && value != "0") {
      let d = moment(value).format(`YYYY${split}MM${split}DD`);
      if (d != "Invalid date") value = d;
    }

    if (value == "00000000") {
      value = "0000-00-00";
    }
    return value;
  },
  formatDatetoMD(value, split = "/") {
    if (value && value != "0") {
      let d = moment(value).format(`MM${split}DD`);
      if (d != "Invalid date") value = d;
    }

    if (value == "00000000") {
      value = "0000-00-00";
    }
    return value;
  },
  formatCommas(n) {
    if (n == undefined || n == null) {
      return "";
    } else {
      n += "";
      let arr = n.split(".");
      let re = /(\d{1,3})(?=(\d{3})+$)/g;
      return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
    }
  },
  formatCommasRound(n) {
    if (n != null && n != undefined) {
      n = n.toString();
      if (n != "") {
        if (n.indexOf(",") >= 0) {
          n = n.replace(/,/g, "");
        }
        if (n.indexOf("*") >= 0) {
          n = n.replace(/\*/g, "");
        }

        n = Math.round(n);
        n += "";
        let arr = n.split(".");
        let re = /(\d{1,3})(?=(\d{3})+$)/g;
        return (
          arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "")
        );
      } else {
        return "";
      }
    } else {
      return "";
    }
  },
  getNowDate(n, type) {
    const d = moment()
      .add(n, type)
      .format(`YYYY-MM-DD`);
    return d;
  },
  setAlert(text, color = "error", isOpen = true) {
    global.state.alert = {
      isOpen: isOpen,
      text: text,
      color: color,
    };
  },
  setConfirm(text, methods, color = "warning", isOpen = true) {
    global.state.confirm = {
      isOpen: isOpen,
      text: text,
      color: color,
      methods: methods,
    };
  },
  setSnackBar(text, color = "error", isOpen = true) {
    global.state.snackBar = {
      isOpen: isOpen,
      timeout: color == "error" ? -1 : 2000,
      text: text,
      color: color,
    };
  },
  setBottomSheet(status) {
    global.state.bottomSheet.isOpen = status;
  },
  setNavigation(status) {
    global.state.navigation.isOpen = status;
  },
  setProgressBar(status) {
    global.state.progressBar.isOpen = status;
  },
  fixHeightPx(v) {
    if (v) {
      var h = window.innerHeight;
      return h - v + "px";
    } else {
      return window.innerHeight + "px";
    }
  },
  fixHeightNum(v) {
    if (v) {
      var h = window.innerHeight;
      return h - v;
    } else {
      return window.innerHeight;
    }
  },
};

export default Plugin;
