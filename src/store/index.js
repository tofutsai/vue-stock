import Vue from "vue";
import Vuex from "vuex";
import global from "./global.js";
import stockIndex from "./modules/stockIndex.js";
import stockData from "./modules/stockData.js";
import stockStatistics from "./modules/stockStatistics.js";
import stockFavorite from "./modules/stockFavorite.js"
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    global,
    stockIndex,
    stockData,
    stockStatistics,
    stockFavorite,
  },
});

export default store;
