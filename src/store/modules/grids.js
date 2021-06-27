export default {
  gridStockIndex: {
    footerProps: {
      "items-per-page-options": [50, 300, 500, 2000],
      "items-per-page-text": "每頁筆數",
    },
    options: {
      page: 1,
      itemsPerPage: 50,
      sortBy: ["id"],
      sortDesc: [false],
      groupBy: [],
      groupDesc: [],
      mustSort: false,
      multiSort: false,
    },
    headers: [
      {
        text: "",
        value: "ctrl",
        sortable: false,
        class: "grey darken-1 ",
      },
      {
        text: "市場別",
        value: "type",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "產業類別",
        value: "category",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "股票代碼",
        value: "code",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "公司名稱",
        value: "company",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "上市櫃日期",
        value: "dataDate",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "啟用",
        value: "isEnable",
        sortable: true,
        class: "grey darken-1 ",
      },
    ],
    data: [{}],
    dataLength: 0,
  },
  gridStockData: {
    footerProps: {
      "items-per-page-options": [50, 300, 500, 2000],
      "items-per-page-text": "每頁筆數",
    },
    options: {
      page: 1,
      itemsPerPage: 50,
      sortBy: ["id"],
      sortDesc: [false],
      groupBy: [],
      groupDesc: [],
      mustSort: false,
      multiSort: false,
    },
    headers: [
      {
        text: "股票代碼",
        value: "code",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "公司名稱",
        value: "company",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "日期",
        value: "dataDate",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "交易張數",
        value: "shares",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "交易金額(百萬)",
        value: "turnover",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "開盤價",
        value: "openPrice",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "最高價",
        value: "highestPrice",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "最低價",
        value: "lowestPrice",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "收盤價",
        value: "closePrice",
        sortable: true,
        class: "grey darken-1 ",
      },
    ],
    data: [{}],
    dataLength: 0,
  },
  gridStockStatistics: {
    footerProps: {
      "items-per-page-options": [50, 300, 500, 2000],
      "items-per-page-text": "每頁筆數",
    },
    options: {
      page: 1,
      itemsPerPage: 50,
      sortBy: ["id"],
      sortDesc: [false],
      groupBy: [],
      groupDesc: [],
      mustSort: false,
      multiSort: false,
    },
    headers: [
      {
        text: "市場別",
        value: "type",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "產業類別",
        value: "category",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "股票代碼",
        value: "code",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "公司名稱",
        value: "company",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "交易張數",
        value: "avgShares",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "交易金額(百萬)",
        value: "avgTurnover",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "平均高價",
        value: "highestPrice",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "平均低價",
        value: "lowestPrice",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "目前價格",
        value: "closePrice",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "相對位置",
        value: "position",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "更新日期",
        value: "dataDate",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "備註",
        value: "memo",
        sortable: true,
        class: "grey darken-1 ",
      },
    ],
    data: [{}],
    dataLength: 0,
  },
  gridStockFavorite: {
    footerProps: {
      "items-per-page-options": [50, 300, 500, 2000],
      "items-per-page-text": "每頁筆數",
    },
    options: {
      page: 1,
      itemsPerPage: 50,
      sortBy: ["id"],
      sortDesc: [false],
      groupBy: [],
      groupDesc: [],
      mustSort: false,
      multiSort: false,
    },
    headers: [
      {
        text: "",
        value: "ctrl",
        sortable: false,
        class: "grey darken-1 ",
      },
      {
        text: "市場別",
        value: "type",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "產業類別",
        value: "category",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "股票代碼",
        value: "code",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "公司名稱",
        value: "company",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "目前價格",
        value: "closePrice",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "相對位置",
        value: "position",
        sortable: true,
        class: "grey darken-1 ",
      },
      {
        text: "備註",
        value: "memo",
        sortable: false,
        class: "grey darken-1 ",
      },
      {
        text: "自行備註",
        value: "selfmemo",
        sortable: false,
        class: "grey darken-1 ",
      },
    ],
    data: [{}],
    dataLength: 0,
  },
};
