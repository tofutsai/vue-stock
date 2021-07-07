import axiosAPI from "@/store/axiosAPI.js";
import PG from "@/store/plugin.js";
import grids from "./grids.js";

const state = {
  init: {
    formSearch: {
      isManual: false,
      code: "2330",
      dataDate: PG.getNowDate(-1, "M"),
    },
    formData: {
      type: "",
      category: "",
      code: "",
      company: "",
      dataDate: PG.getNowDate(-1, "D"),
      isEnable: true,
    },
    grid:grids.gridStockData,
  },
  selectItems: {
    type: [
      { text: "上市+上櫃", value: "上" },
      { text: "上市", value: "上市" },
      { text: "上櫃", value: "上櫃" },
    ],
  },
  formSearch: {},
  formData: {},
  grid: {},
};

const getters = {};

const actions = {
  actInit({ commit }) {
    commit("mutInit");
  },
  actInitFormData({ commit }) {
    commit("mutInitFormData");
  },
  actStockDataRead({ commit }, isManual) {
    if (isManual) {
      state.grid.options.page = grids.gridStockData.options.page;
      state.grid.options.itemsPerPage =
        grids.gridStockData.options.itemsPerPage;
    }

    state.grid.data = [{}];
    const f = state.formSearch;
    f.options = state.grid.options;

    axiosAPI.instance
      .post("/api/ReadStockData", f)
      .then((res) => {
        console.log("/api/ReadStockData", res.data);
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
  actStockDataSet({ commit }, payload) {
    commit("mutStockDataSet", payload);
  },
  actStockDataCreate({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().OperId;
    axiosAPI.instance
      .post("/api/CreateStockData", f)
      .then((res) => {
        console.log("/api/CreateStockData", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockDataRead({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockDataEdit({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().OperId;
    axiosAPI.instance
      .post("/api/UpdateStockData", f)
      .then((res) => {
        console.log("/api/UpdateStockData", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockDataRead({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockDataDelete({ commit }, payload) {
    PG.setConfirm(`確認是否刪除 id:${payload.code} ?`, () => {
      const f = { id: payload.id };

      axiosAPI.instance
        .post("/api/DeleteStockData", f)
        .then((res) => {
          console.log("/api/DeleteStockData", res.data);
          if (res.data.Success) {
            PG.setSnackBar(res.data.Message, "success");
            actions.actStockDataRead({ commit });
          } else {
            PG.setSnackBar(res.data.Message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  },
};

const mutations = {
  mutInit(state) {  //中斷state連接，先序列化再轉成物件
    state.formSearch = JSON.parse(JSON.stringify(state.init.formSearch));
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
    state.grid = JSON.parse(JSON.stringify(state.init.grid));
  },
  mutInitFormData(state) {
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
  },
  mutStockDataSet(state, payload) {
    state.formData = JSON.parse(JSON.stringify(payload));
    state.formData.dataDate = PG.formatDate(state.formData.dataDate, "-");
  },
  mutGrid(state, data) {
    state.grid.data = data.Data;
    state.grid.dataLength = data.TotalCount;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
