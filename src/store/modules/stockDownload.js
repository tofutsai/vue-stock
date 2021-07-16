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
    type: [
      { text: "ext1 月KD", value: "ext1" },
      { text: "ext2 週KD", value: "ext2" },
      { text: "ext3 淨利", value: "ext3" },
      { text: "ext4 ROE", value: "ext4" },
      { text: "ext5 EPS", value: "ext5" },
      { text: "ext6 殖利率", value: "ext6" },
      { text: "ext7 本益比", value: "ext7" },
    ],
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
    if(PG.getOper().OperIsAdmin){
      axiosAPI.instance
      .post("/api/DownloadStockData")
      .then((res) => {
        console.log("/api/DownloadStockData", res.data);
        if (res.data.Success) {
          if(res.data.Message == ""){
            PG.setAlert("已更新至最新日期", "success");
          }else{
            PG.setAlert(res.data.Message, "success");
          }
          actions.actInitFormData({ commit });
          actions.actStockSysConfigRead({ commit });
        } else {
          PG.setAlert(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    }else{
      PG.setSnackBar("需要管理者權限", "warning");
    }
    
  },
  actOtcDownload({ commit }) {
    const f = state.formData;
    if(PG.getOper().OperIsAdmin){
      axiosAPI.instance
      .post("/api/DownloadOtcData")
      .then((res) => {
        console.log("/api/DownloadStockData", res.data);
        if (res.data.Success) {
          if(res.data.Message == ""){
            PG.setAlert("已更新至最新日期", "success");
          }else{
            PG.setAlert(res.data.Message, "success");
          }
          actions.actInitFormData({ commit });
          actions.actStockSysConfigRead({ commit });
        } else {
          PG.setAlert(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    }else{
      PG.setSnackBar("需要管理者權限", "warning");
    }
    
  },
  actComputeStockAvg({ commit }) {
    const f = state.formData;
    if(PG.getOper().OperIsAdmin){
      axiosAPI.instance
      .post("/api/ComputeStockAvg")
      .then((res) => {
        console.log("/api/ComputeStockAvg", res.data);
        if (res.data.Success) {
          PG.setAlert(res.data.Message, "success");
          actions.actInitFormData({ commit });
        } else {
          PG.setAlert(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    }else{
      PG.setSnackBar("需要管理者權限", "warning");
    }
    
  },
  actComputeStockNow({ commit }) {
    const f = state.formData;

    if(PG.getOper().OperIsAdmin){
      axiosAPI.instance
      .post("/api/ComputeStockNow")
      .then((res) => {
        console.log("/api/ComputeStockNow", res.data);
        if (res.data.Success) {
          PG.setAlert(res.data.Message, "success");
          actions.actInitFormData({ commit });
          actions.actStockSysConfigRead({ commit });
        } else {
          PG.setAlert(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    }else{
      PG.setSnackBar("需要管理者權限", "warning");
    }
    
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
    f.operId = PG.getOper().OperId;
    if(PG.getOper().OperIsAdmin){
      axiosAPI.instance
      .post("/api/EditSysConfig", f)
      .then((res) => {
        console.log("/api/EditSysConfig", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockSysConfigRead({ commit });
          //actions.actInitFormData({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    }else{
      PG.setSnackBar("需要管理者權限", "warning");
    }
    
    
  },
  actStockMemoCreate({ commit }) {
    const f = state.formData;
    f.operId = PG.getOper().OperId;
    if(PG.getOper().OperIsAdmin){
      axiosAPI.instance
      .post("/api/StockMemo", f)
      .then((res) => {
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
    }else{
      PG.setSnackBar("需要管理者權限", "warning");
    }
    
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
    state.formData.stockUpdate = PG.formatDate(
      state.gridConfig.data[0].stockUpdate, "-"
    );
    state.formData.otcUpdate = PG.formatDate(
      state.gridConfig.data[0].otcUpdate, "-"
    );
    state.formData.nowDate = PG.formatDate(
      state.gridConfig.data[0].nowDate, "-"
    );
    state.formData.avgStartDate = PG.formatDate(
      state.gridConfig.data[0].avgStartDate, "-"
    );
    state.formData.avgEndDate = PG.formatDate(
      state.gridConfig.data[0].avgEndDate, "-"
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
