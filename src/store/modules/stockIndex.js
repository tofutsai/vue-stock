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
    grid: grids.gridStockIndex,
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
    //isManual手動查詢要清空grid設定
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
    f.operId = PG.getOper().OperId;
    if (PG.getOper().OperIsAdmin) {
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
    } else {
      PG.setSnackBar("需要管理者權限", "warning");
    }
  },
  actStockIndexEdit({ commit }) {
    const f = state.formData;
    f.operId = PG.getOper().OperId;
    if (PG.getOper().OperIsAdmin) {
      axiosAPI.instance
        .post("/api/EditStockIndex", f)
        .then((res) => {
          console.log("/api/EditStockIndex", res.data);
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
    } else {
      PG.setSnackBar("需要管理者權限", "warning");
    }
  },
  actStockIndexDelete({ commit }, payload) {
    // PG.setConfirm("AAAA?", ()=>{        } );
    if(PG.getOper().OperIsAdmin){
      PG.setConfirm(`確認是否刪除 code:${payload.code} ?`, () => {
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
