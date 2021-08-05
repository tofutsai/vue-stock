import axiosAPI from "@/store/axiosAPI.js";
import PG from "@/store/plugin.js";
import router from "@/router/index.js"
const state = {
  init: {
    formData: {
      account: "",
      password: "",
      name: "",
      registerAccount: "",
      registerPassword: "",
      registerName: "",
    },
    user:{
        OperAccount: "",
        OperId: 0,
        OperIsAdmin: "",
        OperName: "",
        OperRole: "",
        JWToken: "",
    }
  },
  formData: {},
  user: {},
};

const getters = {};

const actions = {
  actInit({ commit }) {
    commit("mutInit");
  },
  actInitFormData({ commit }){
    commit("mutInitFormData");
  },
  actGetUser({ commit }, payload) {
    commit("mutGetUser", payload);
  },
  actGoRoutes({ commit }, payload) {
    commit("mtdGoRoutes", payload);
  },
  actStockLogin({ commit }) {
    const f = state.formData;

    axiosAPI.instance.post("/api/StockMember/Login", f).then((res) => {
      console.log("/api/StockMember/Login", res.data);
      if (res.data.Success) {
        PG.setSnackBar(res.data.Message, "success");
        sessionStorage.setItem("UserInfo", JSON.stringify(res.data.Data));
        const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
        actions.actGetUser({ commit }, UserInfo);
        actions.actGoRoutes({ commit }, res.data.Success);
      } else {
        PG.setSnackBar(res.data.Message);
      }
    });
  },
  actStockRegister({ commit }) {
    const f = state.formData;
    f.account = state.formData.registerAccount;
    f.password = state.formData.registerPassword;
    f.name = state.formData.registerName;
    axiosAPI.instance.post("/api/StockMember/Register", f).then((res) => {
      console.log("/api/StockMember/Register", res.data);
      if (res.data.Success) {
        PG.setSnackBar(res.data.Message, "success");
        actions.actInitFormData({commit});
      } else {
        PG.setSnackBar(res.data.Message);
      }
    });
  },
};

const mutations = {
  mutInit(state) {
    state.formData = JSON.parse(JSON.stringify(state.init.formData));
    state.user = JSON.parse(JSON.stringify(state.init.user));
    sessionStorage.removeItem("UserInfo");
  },
  mutInitFormData(state){
    state.formData.registerAccount = JSON.parse(JSON.stringify(state.init.formData.registerAccount));
    state.formData.registerPassword = JSON.parse(JSON.stringify(state.init.formData.registerPassword));
    state.formData.registerName = JSON.parse(JSON.stringify(state.init.formData.registerName));
  },
  mutGetUser(state, UserInfo) {
    state.user.OperAccount = UserInfo.OperAccount;
    state.user.OperId = UserInfo.OperId;
    state.user.OperIsAdmin = UserInfo.OperIsAdmin;
    state.user.OperName = UserInfo.OperName;
    state.user.OperRole = UserInfo.OperRole;
    state.user.JWToken = UserInfo.JWToken;
  },
  mtdGoRoutes(state, isSuccess) {
    if (isSuccess) {
      router
        .push("/stockStatistics")
        .then(() => {})
        .catch((err) => {
          err;
        });
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
