import axiosAPI from "@/store/axiosAPI.js";
import PG from "@/store/plugin.js";
import grids from "./grids.js";

const state = {
  init: {
    formSearch: {
      isManual: false,
      type: "上",
      shares:"1",
      closePrice:"0.0",
      position2:"50",
      code: "",
    },
    formData: {
      type: "",
      category: "",
      code: "",
      company: "",
      dataDate: PG.getNowDate(-1, "D"),
      isEnable: true,
      buyPrice:0,
      buyShares:0,
    },
    grid:grids.gridStockStatistics,
    gridConfig:grids.gridConfig,
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
  selectItems: {
    type: [
      { text: "上市+上櫃", value: "上" },
      { text: "上市", value: "上市" },
      { text: "上櫃", value: "上櫃" },
    ],
    shares:[
        {text: "大於300張", value: "300"},
        {text: "不限張數", value: "1"},
    ],
    closePrice:[
        {text: ">=10", value: "10"},
        {text: "不限價格", value: "0.0"},
    ],
    position2:[
        {text: "<=0.5", value: "0.5"},
        {text: "不限位置", value: "50"},
    ]
  },
  formSearch: {},
  formData: {},
  grid: {},
  gridConfig:{},
  chartData:{},
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
  actStockStatisticsRead({ commit }, isManual) { //isManual手動查詢要清空grid設定
    if (isManual) {
      state.grid.options.page = grids.gridStockStatistics.options.page;
      state.grid.options.itemsPerPage =
        grids.gridStockStatistics.options.itemsPerPage;
    }

    state.grid.data = [{}];
    const f = state.formSearch;
    f.options = state.grid.options;

    axiosAPI.instance
      .post("/api/StockStatistics/Read", f)
      .then((res) => {
        console.log("/api/StockStatistics/Read", res.data);
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
  actStockSysConfigRead({ commit }, isManual) { 
    
    state.gridConfig.data = [{}];
    axiosAPI.instance
      .post("/api/StockSysConfig/Read")
      .then((res) => {
        console.log("/api/StockSysConfig/Read", res.data);
        if (res.data.Success) {
          commit("mutGridConfig", res.data);
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockStatisticsSet({ commit }, payload) {
    commit("mutStockStatisticsSet", payload);
  },
  actStockStatisticsCreate({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().OperId;
    axiosAPI.instance
      .post("/api/CreateStockStatistics", f)
      .then((res) => {
        console.log("/api/CreateStockStatistics", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockStatisticsRead({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockStatisticsEdit({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().OperId;
    axiosAPI.instance
      .post("/api/UpdateStockStatistics", f)
      .then((res) => {
        console.log("/api/UpdateStockStatistics", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockStatisticsRead({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockStatisticsDelete({ commit }, payload) {
    // PG.setConfirm("AAAA?", ()=>{        } );
    PG.setConfirm(`確認是否刪除 id:${payload.code} ?`, () => {
      const f = { id: payload.id };

      axiosAPI.instance
        .post("/api/DeleteStockStatistics", f)
        .then((res) => {
          console.log("/api/DeleteStockStatistics", res.data);
          if (res.data.Success) {
            PG.setSnackBar(res.data.Message, "success");
            actions.actStockStatisticsRead({ commit });
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
          actions.actInitFormData({commit});
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
    state.gridConfig = JSON.parse(JSON.stringify(state.init.gridConfig));
    state.chartData = JSON.parse(JSON.stringify(state.init.chartData));
  },
  mutInitFormData(state) {
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
  },
  mutStockStatisticsSet(state, payload) {
    state.formData = JSON.parse(JSON.stringify(payload));
    state.formData.dataDate = PG.formatDate(state.formData.dataDate, "-");
  },
  mutGrid(state, data) {
    state.grid.data = data.Data;
    state.grid.dataLength = data.TotalCount;
  },
  mutGridConfig(state,data){
    state.gridConfig.data = data.Data;
  },
  mutInitChartData(state) {
    state.chartData = JSON.parse(JSON.stringify(state.init.chartData));
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
