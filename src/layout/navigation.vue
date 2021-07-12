<template>
  <div v-if="navigation.isOpen">
    <v-navigation-drawer v-model="navigation.isOpen" right absolute temporary>
      <v-list>
        <v-list-item-group v-for="f in func" :key="f.title">
          <v-list-item link @click="mtdClickTab(f.tab)">
            <v-list-item-icon>
              <v-icon v-text="f.tab.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ f.tab.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <div v-if="f.items.length > 0" 
              style="padding-left:64px;">
            <v-list-item
              v-for="item in f.items"
              :key="item.title"
              link
              @click="mtdClickTab(item)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-item-group>
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
