<template>
  <v-app-bar max-height="64px" v-if="user.OperId != 0">
    <!-- Logo位置 -->
    <div
      class="pl-3 amber--text"
      style="width:120px;vertical-align:middle;text-align:left;cursor:pointer"
      @click="PG.setBottomSheet(true)"
    >
      TSTOCK
    </div>
    <v-tabs class="hidden-sm-and-down" icons-and-text>
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-menu v-for="f in func" :key="f.title" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-tab v-bind="attrs" v-on="on" @click="mtdClickTab(f.tab)">
            <span>
              {{ f.tab.title }}
            </span>
            <div style="height:5px"></div>
            <v-icon>
              {{ f.tab.icon }}
            </v-icon>
          </v-tab>
        </template>

        <v-list v-if="f.items.length > 0">
          <v-list-item
            v-for="item in f.items"
            :key="item.title"
            link
            @click="mtdClickTab(item)"
          >
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tabs>
    <v-spacer />
    <!-- 自動填滿左右區塊 分配父子组件之间的剩餘寬度。 當一個 v-spacer 放置在子组件之前或之后时，组件将推到其容器的左右两侧。-->
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text class="amber--text" v-bind="attrs" v-on="on">
          <v-icon>mdi-account </v-icon>{{ PG.getOper().OperName }}
        </v-btn>
      </template>
      <span>你好 {{ PG.getOper().OperName }}</span>
    </v-tooltip>
    <!-- 登出位置 -->
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="cyan"
          v-bind="attrs"
          v-on="on"
          @click="actInit(), mtdGoLoginPage()"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>登出</span>
    </v-tooltip>

    <!-- 行動選單位置 -->
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="PG.setNavigation(true)"
    >
    </v-app-bar-nav-icon>
  </v-app-bar>
  <v-app-bar max-height="64px" v-else> </v-app-bar>
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
          path: "/stockDownload",
          text: "下載計算備註",
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
    ...mapState("Login", ["user"]),
  },
  methods: {
    ...mapActions("Login", ["actInit"]),
    mtdClickTab(tab) {
      this.$router
        .push(tab.path)
        .then(() => {})
        .catch((err) => {
          err;
        });
    },
    mtdGoLoginPage() {
      this.$router
        .push("/login")
        .then(() => {})
        .catch((err) => {
          err;
        });
    },
  },
};
</script>
