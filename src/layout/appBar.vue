<template>
  <v-app-bar max-height="64px">
    <!-- Logo位置 -->
    <div
      class="pl-3 amber--text"
      style="width:120px;vertical-align:middle;text-align:left;cursor:pointer"
      @click="PG.setBottomSheet(true)"
    >
      TSTOCK
    </div>
    <v-tabs icons-and-text class="hidden-sm-and-down">
      <v-tab v-for="tab in tabs" :key="tab.name" @click="mtdClickTab(tab)">
        {{ tab.text }}
        <v-icon v-text="tab.icon"></v-icon>
      </v-tab>
    </v-tabs>

    <v-spacer />
    <!-- 自動填滿左右區塊 分配父子组件之间的剩餘寬度。 當一個 v-spacer 放置在子组件之前或之后时，组件将推到其容器的左右两侧。-->

    <!-- 登出位置 -->
    <v-btn icon color="cyan">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <!-- 行動選單位置 -->
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="PG.setNavigation(true)"
    >
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
import PG from "@/store/plugin.js";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      PG: PG,
      tabs: [
        {
          path: "/stockStatistics",
          text: "資訊看板",
          icon: "mdi-view-dashboard",
        },
        {
          path: "/download",
          text: "股價下載計算",
          icon: "mdi-chart-box",
        },
        {
          path: "/stockFavorite",
          text: "自選清單",
          icon: "mdi-hand-heart",
        },
        {
          path: "/stockProfit",
          text: "庫存損益",
          icon: "mdi-account-cash",
        },
        {
          path: "/stockData",
          text: "個股資訊查詢",
          icon: "mdi-chart-box",
        },
        {
          path: "/stockMemo",
          text: "個股資訊備註",
          icon: "mdi-chart-box",
        },
        {
          path: "/stockIndex",
          text: "上市櫃索引清單",
          icon: "mdi-database",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState("global", ["navigation", "func"]),
  },
  methods: {
    mtdClickTab(tab) {
      this.$router
        .push(tab.path)
        .then(() => {})
        .catch((err) => {
          err;
        });
    },
  },
};

// const s = "JERRY";
// let msg = "";
// msg = "HEELO! " + s + " welcome~";
// msg =`HELLO! ${s} welcome~`;
</script>
