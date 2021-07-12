import axiosAPI from "@/store/axiosAPI.js";
import PG from "@/store/plugin.js";
import grids from "./grids.js";

const state = {
  init: {
    formSearch: {
      isManual: false,
      code: "",
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
    grid: grids.gridStockSysLog,
  },
  selectItems: {},
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
  actStockSysLogRead({ commit }, isManual) {
    if (isManual) {
      state.grid.options.page = grids.gridStockData.options.page;
      state.grid.options.itemsPerPage =
        grids.gridStockData.options.itemsPerPage;
    }

    state.grid.data = [{}];
    const f = state.formSearch;
    f.options = state.grid.options;

    axiosAPI.instance
      .post("/api/ReadSysLog", f)
      .then((res) => {
        console.log("/api/ReadSysLog", res.data);
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
};

const mutations = {
  mutInit(state) {
    state.formSearch = JSON.parse(JSON.stringify(state.init.formSearch));
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
    state.grid = JSON.parse(JSON.stringify(state.init.grid));
  },
  mutInitFormData(state) {
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
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