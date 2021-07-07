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
    },
    grid: grids.gridStockMemo,
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
};

const getters = {};

const actions = {
  actInit({ commit }) {
    commit("mutInit");
  },
  actInitFormData({ commit }) {
    commit("mutInitFormData");
  },
  actStockMemoCreate({ commit }) {
    const f = state.formData;

    f.operId = PG.getOper().OperId;
    axiosAPI.instance
      .post("/api/StockMemo", f)
      .then((res) => {
        console.log("/api/StockMemo", res.data);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
