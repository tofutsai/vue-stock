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
    },
    grid: grids.gridStockFavorite,
  },
  selectItems: {
    
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
  actStockFavoriteRead({ commit }, isManual) {
    if (isManual) {
      state.grid.options.page = grids.gridStockFavorite.options.page;
      state.grid.options.itemsPerPage =
        grids.gridStockFavorite.options.itemsPerPage;
    }

    state.grid.data = [{}];
    const f = state.formSearch;
    f.options = state.grid.options;
    f.operId = PG.getOper().id;

    axiosAPI.instance
      .post("/api/ReadStockFavorite", f)
      .then((res) => {
        console.log("/api/ReadStockFavorite", res.data);
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
    f.operId = PG.getOper().id;

    axiosAPI.instance
      .post("/api/CreateStockFavorite", f)
      .then((res) => {
        console.log("/api/ReadStockFavorite", res.data);
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
    f.operId = PG.getOper().id;
    f.id = payload.id;
    f.memo = payload.memo;
    axiosAPI.instance
      .post("/api/EditStockFavorite", f)
      .then((res) => {
        console.log("/api/EditStockFavorite", res.data);
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
      f.operId = PG.getOper().id;
      axiosAPI.instance
        .post("/api/DeleteStockFavorite", f)
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
};

const mutations = {
    mutInit(state){
        state.formSearch = JSON.parse(JSON.stringify(state.init.formSearch));
        state.formData = JSON.parse(JSON.stringify(state.init.formData));
        state.grid = JSON.parse(JSON.stringify(state.init.grid));
    },
    mutInitFormData(state) {
        state.formData = JSON.parse(JSON.stringify(state.init.formData));
    },
    mutStockFavoriteSet(state, payload){
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
