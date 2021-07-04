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
        {text: "不限位置", value: "30"},
    ]
  },
  formSearch: {},
  formData: {},
  grid: {},
  gridConfig:{},
};

const getters = {};

const actions = {
  actInit({ commit }) {
    commit("mutInit");
  },
  actInitFormData({ commit }) {
    commit("mutInitFormData");
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
      .post("/api/ReadStockStatistics", f)
      .then((res) => {
        console.log("/api/ReadStockStatistics", res.data);
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
  actStockSysConfigRead({ commit }, isManual) { //isManual手動查詢要清空grid設定
    //if (isManual) {
    //  state.grid.options.page = grids.gridStockStatistics.options.page;
    //  state.grid.options.itemsPerPage =
    //    grids.gridStockStatistics.options.itemsPerPage;
    //}
    state.gridConfig.data = [{}];
    axiosAPI.instance
      .post("/api/ReadSysConfig")
      .then((res) => {
        console.log("/api/ReadSysConfig", res.data);
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

    f.operId = PG.getOper().id;
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

    f.operId = PG.getOper().id;
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
    f.operId = PG.getOper().id;

    axiosAPI.instance
      .post("/api/CreateStockProfit", f)
      .then((res) => {
        console.log("/api/CreateStockProfit", res.data);
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
  }
};

const mutations = {
  mutInit(state) {
    state.formSearch = JSON.parse(JSON.stringify(state.init.formSearch));
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
    state.grid = JSON.parse(JSON.stringify(state.init.grid));
    state.gridConfig = JSON.parse(JSON.stringify(state.init.gridConfig));
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
