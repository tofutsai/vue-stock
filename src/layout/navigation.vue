<template>
  <div v-if="navigation.isOpen">
    <v-navigation-drawer v-model="navigation.isOpen" right absolute temporary>
      <v-list>
        <v-list-item
          v-for="list in lists"
          :key="list.name"
          @click="mtdClickTab(list)"
        >
          <v-list-item-icon>
            <v-icon v-text="list.icon"></v-icon>
          </v-list-item-icon>
          {{ list.text }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PG from "@/store/plugin.js";

export default {
  data() {
    return {
      PG: PG,
      lists: [
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
</script>
