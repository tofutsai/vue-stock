const state = {
  func: [
    {
      tab: { title: "資訊看板", path:"/dashboard", icon: "mdi-view-dashboard" },
      items: [],
    },
    {
      tab: { title: "股價報表",  path:"/report",icon: "mdi-chart-box" },
      items: [],
    },
  ],
  alert: {
    isOpen: false,
    text: "",
    color: "error",
  },
  confirm: {
    isOpen: false,
    text: "",
    color: "error",
    methods: {},
  },
  snackBar: {
    isOpen: false,
    timeout: 2000,
    text: "",
    color: "error",
  },
  bottomSheet: {
    isOpen: false,
  },
  navigation: {
    isOpen: false,
    group: null,
  },
  progressBar: {
    isOpen: false,
  },
};

const getters = {};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
