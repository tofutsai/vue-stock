import axiosAPI from "@/store/axiosAPI.js";
import PG from "@/store/plugin.js";
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
      memoContent: "",
      codes: "",
      company: "",
      dataDate: PG.getNowDate(-1, "D"),
      isEnable: true,
      stockUpdate: "",
      otcUpdate: "",
      nowDate: "",
      avgStartDate: "",
      avgEndDate: "",
    },
    grid: grids.gridStockDownload,
    gridConfig: grids.gridConfig,
  },
  selectItems: {
    type: [],
  },
  formSearch: {},
  formData: {},
  grid: {},
  gridConfig: {},
};

const getters = {};

const actions = {
  actInit({ commit }) {
    commit("mutInit");
  },
  actInitFormData({ commit }) {
    commit("mutInitFormData");
  },
  actStockDownload({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().id;
    axiosAPI.instance
      .post("/api/DownloadStockData")
      .then((res) => {
        console.log("/api/DownloadStockData", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actInitFormData({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actOtcDownload({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().id;
    axiosAPI.instance
      .post("/api/DownloadOtcData")
      .then((res) => {
        console.log("/api/DownloadStockData", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actInitFormData({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actComputeStockAvg({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().id;
    axiosAPI.instance
      .post("/api/ComputeStockAvg")
      .then((res) => {
        console.log("/api/ComputeStockAvg", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actInitFormData({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actComputeStockNow({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().id;
    axiosAPI.instance
      .post("/api/ComputeStockNow")
      .then((res) => {
        console.log("/api/ComputeStockNow", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actInitFormData({ commit });
          actions.actStockSysConfigRead({commit});
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockSysConfigRead({ commit }, isManual) {
    //isManual手動查詢要清空grid設定
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
  actStockSysConfigEdit({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().id;
    axiosAPI.instance
      .post("/api/EditSysConfig", f)
      .then((res) => {
        console.log("/api/EditSysConfig", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockSysConfigRead({commit});
          //actions.actInitFormData({ commit });
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
  },
  mutInitFormData(state) {
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
  },
  mutGridConfig(state, data) {
    state.gridConfig.data = data.Data;
    state.formData.stockUpdate = PG.formatDatedash(state.gridConfig.data[0].stockUpdate);
    state.formData.otcUpdate = PG.formatDatedash(state.gridConfig.data[0].otcUpdate);
    state.formData.nowDate = PG.formatDatedash(state.gridConfig.data[0].nowDate);
    state.formData.avgStartDate = PG.formatDatedash(state.gridConfig.data[0].avgStartDate);
    state.formData.avgEndDate = PG.formatDatedash(state.gridConfig.data[0].avgEndDate);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
