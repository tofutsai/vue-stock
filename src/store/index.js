import Vue from "vue";
import Vuex from "vuex";
import global from "./global.js";
import stockIndex from "./modules/stockIndex.js";
import stockData from "./modules/stockData.js";
import stockStatistics from "./modules/stockStatistics.js";
import stockFavorite from "./modules/stockFavorite.js"
import stockProfit from "./modules/stockProfit.js"
import stockMemo from "./modules/stockMemo.js"
import stockDownload from "./modules/stockDownload.js"
import Login from "./modules/Login.js"
import stockSysLog from "./modules/stockSysLog.js"
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    global,
    stockIndex,
    stockData,
    stockStatistics,
    stockFavorite,
    stockProfit,
    stockMemo,
    stockDownload,
    Login,
    stockSysLog,
  },
});

export default store;
