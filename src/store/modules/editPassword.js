import axiosAPI from "@/store/axiosAPI.js";
import PG from "@/store/plugin.js";

const state = {
  init: {
    formData: {
      oldPassword: "",
      newPassword: "",
      newPasswordCheck: "",
    },
  },
  formData: {},
};

const getters = {};

const actions = {
  actInit({ commit }) {
    commit("mutInit");
  },
  actEditPassword({ commit }) {
    const f = state.formData;
    const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    f.OperId = UserInfo.OperId;
    axiosAPI.instance
      .post("/api/EditPassword", f)
      .then((res) => {
        console.log("/api/EditPassword", res.data);
        if (res.data.Success) {
          PG.setSnackBar(res.data.Message, "success");
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
