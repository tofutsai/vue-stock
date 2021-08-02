const state = {
  func: [
    {
      tab: { title: "資訊看板", path:"/stockStatistics", icon: "mdi-view-dashboard" },
      items: [], 
    },
    {
      tab: { title: "下載計算備註", path:"/stockDownload", icon: "mdi-chart-box" },
      items: [],
    },
    {
      tab: { title: "自選清單", path:"/stockFavorite", icon: "mdi-hand-heart" },
      items: [],
    },
    {
      tab: { title: "庫存損益", path:"/stockProfit", icon: "mdi-account-cash" },
      items: [],
    },
    {
      tab: { title: "個股資訊查詢", path:"/stockData", icon: "mdi-chart-box" },
      items: [],
    },
    {
      tab: { title: "系統資料", path:"/stockIndex", icon: "mdi-database" },
      items: [
        {title : "個股索引表", path:"/stockIndex"},
        {title : "系統Log", path:"/stockSysLog"}
      ],
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
  editPassword: {
    isOpen: false,
  }
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
