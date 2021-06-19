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
      category: "",
      code: "",
      company: "",
      dataDate: PG.getNowDate(-1, "D"),
      isEnable: true,
    },
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
  actStockIndexRead({ commit }, isManual) {
    if (isManual) {
      state.grid.options.page = grids.gridStockIndex.options.page;
      state.grid.options.itemsPerPage =
        grids.gridStockIndex.options.itemsPerPage;
    }

    state.grid.data = [{}];
    const f = state.formSearch;
    f.options = state.grid.options;

    axiosAPI.instance
      .post("/api/ReadStockIndex", f)
      .then((res) => {
        console.log("/api/ReadStockIndex", res.data);
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
  actStockIndexSet({ commit }, payload) {
    commit("mutStockIndexSet", payload);
  },
  actStockIndexCreate({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().id;
    axiosAPI.instance
      .post("/api/CreateStockIndex", f)
      .then((res) => {
        console.log("/api/CreateStockIndex", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockIndexRead({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockIndexEdit({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().id;
    axiosAPI.instance
      .post("/api/UpdateStockIndex", f)
      .then((res) => {
        console.log("/api/UpdateStockIndex", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
          actions.actStockIndexRead({ commit });
        } else {
          PG.setSnackBar(res.data.Message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  actStockIndexDelete({ commit }, payload) {
    // PG.setConfirm("AAAA?", ()=>{        } );
    PG.setConfirm(`確認是否刪除 id:${payload.code} ?`, () => {
      const f = { id: payload.id };

      axiosAPI.instance
        .post("/api/DeleteStockIndex", f)
        .then((res) => {
          console.log("/api/DeleteStockIndex", res.data);
          if (res.data.Success) {
            PG.setSnackBar(res.data.Message, "success");
            actions.actStockIndexRead({ commit });
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
  mutInit(state) {
    state.formSearch = JSON.parse(JSON.stringify(state.init.formSearch));
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
    state.grid = JSON.parse(JSON.stringify(grids.gridStockIndex));
  },
  mutInitFormData(state) {
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
  },
  mutStockIndexSet(state, payload) {
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
