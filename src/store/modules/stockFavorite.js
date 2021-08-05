import axiosAPI from "@/store/axiosAPI.js";
import PG from "@/store/plugin.js";
import axios from "axios";
import grids from "./grids.js";

const state = {
  init: {
    formSearch: {
      isManual: false,
      type: "上",
      code: "",
    },
    formData: {
      type: "",
      category: "",
      code: "",
      company: "",
      dataDate: PG.getNowDate(-1, "D"),
      isEnable: true,
      buyPrice: 0,
      buyShares: 0,
    },
    grid: grids.gridStockFavorite,
    chartData: {
      info: {
        code: "",
        company: "",
        closePrice: "",
        position: "",
        memo: "",
      },
      options: {
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#EF403C",
              downward: "#00B746",
            },
          },
        },
        chart: {
          type: "candlestick",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 80,
            animateGradually: {
              enabled: true,
              delay: 15,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 35,
            },
          },
        },
        title: {
          text: "K線圖",
          align: "left",
        },
        xaxis: {
          type: "string",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
      series: [
        {
          data: [
            {
              x: "01/01",
              y: [1, 1, 1, 1],
            },
          ],
        },
      ],
    },
  },
  selectItems: {},
  formSearch: {},
  formData: {},
  grid: {},
  chartData: {},
};

const getters = {};

const actions = {
  actInit({ commit }) {
    commit("mutInit");
  },
  actInitFormData({ commit }) {
    commit("mutInitFormData");
  },
  actInitChartData({ commit }) {
    commit("mutInitChartData");
  },
  actStockFavoriteRead({ commit }, isManual) {
    if (isManual) {
      state.grid.options.page = grids.gridStockFavorite.options.page;
      state.grid.options.itemsPerPage =
        grids.gridStockFavorite.options.itemsPerPage;
    }

    state.grid.data = [{}];
    const f = state.formSearch;
    f.options = state.grid.options;
    f.operId = PG.getOper().OperId;

    axiosAPI.instance
      .post("/api/StockFavorite/Read", f)
      .then((res) => {
        console.log("/api/StockFavorite/Read", res.data);
        if (res.data.Success) {
          commit("mutGrid", res.data);
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockFavoriteSet({ commit }, payload) {
    commit("mutStockFavoriteSet", payload);
  },
  actStockFavoriteCreate({ commit }, payload) {
    const f = state.formData;
    f.code = payload;
    f.operId = PG.getOper().OperId;

    axiosAPI.instance
      .post("/api/StockFavorite/Create", f)
      .then((res) => {
        console.log("/api/StockFavorite/Create", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockFavoriteRead({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockFavoriteEdit({ commit }, payload) {
    const f = state.formData;
    f.operId = PG.getOper().OperId;
    f.id = payload.id;
    f.memo = payload.memo;
    axiosAPI.instance
      .post("/api/StockFavorite/Edit", f)
      .then((res) => {
        console.log("/api/StockFavorite/Edit", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockFavoriteRead({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockFavoriteDelete({ commit }, payload) {
    PG.setConfirm(`確認是否刪除 code:${payload.code} ?`, () => {
      const f = { id: payload.id };
      f.operId = PG.getOper().OperId;
      axiosAPI.instance
        .post("/api/StockFavorite/Delete", f)
        .then((res) => {
          if (res.data.Success) {
            PG.setSnackBar(res.data.Message, "success");
            actions.actStockFavoriteRead({ commit });
          } else {
            PG.setSnackBar(res.data.Message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  },
  actStockProfitCreate({ commit }, payload) {
    const f = state.formData;
    f.code = payload;
    f.operId = PG.getOper().OperId;

    axiosAPI.instance
      .post("/api/StockProfit/Create", f)
      .then((res) => {
        console.log("/api/StockProfit/Create", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockProfitRead({ commit });
          actions.actInitFormData({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockDataRead({ commit }, payload) {
    const f = state.chartData;
    f.code = payload;
    f.dataDate = PG.getNowDate(-3, "M"),
      axiosAPI.instance
        .post("/api/StockData/Read", f)
        .then((res) => {
          console.log("/api/StockData/Read", res.data);
          if (res.data.Success) {
            commit("mutChartData", res.data);
          } else {
            PG.setSnackBar(res.data.Message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
  },
};

const mutations = {
  mutInit(state) {
    state.formSearch = JSON.parse(JSON.stringify(state.init.formSearch));
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
    state.grid = JSON.parse(JSON.stringify(state.init.grid));
    state.chartData = JSON.parse(JSON.stringify(state.init.chartData));
  },
  mutInitFormData(state) {
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
  },
  mutInitChartData(state) {
    state.chartData = JSON.parse(JSON.stringify(state.init.chartData));
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
  },
  mutStockFavoriteSet(state, payload) {
    state.formData = JSON.parse(JSON.stringify(payload));
    state.formData.dataDate = PG.formatDate(state.formData.dataDate, "-");
    state.formData.buyPrice = 0;
    state.formData.buyShares = 0;
  },
  mutGrid(state, data) {
    state.grid.data = data.Data;
    state.grid.dataLength = data.TotalCount;
  },
  mutChartData(state, data) {
    state.chartData.info.code = data.Data[0].code;
    state.chartData.info.company = data.Data[0].company;
    state.chartData.series[0].data.length = data.Data.length;
    for (let i = 0; i < data.Data.length; i++) {
      state.chartData.series[0].data[i] = {
        x: PG.formatDatetoMD(data.Data[i].dataDate),
        y: [
          data.Data[i].openPrice,
          data.Data[i].highestPrice,
          data.Data[i].lowestPrice,
          data.Data[i].closePrice,
        ],
      };
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
