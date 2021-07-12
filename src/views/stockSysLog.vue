<template>
  <div>
    <v-container fluid class="grey darken-3 pa-2 mb-1">
      <h5 class="red--text mb-1">
        系統Log, 查詢結果: {{ grid.dataLength | formatCommas }}
      </h5>
      <v-row dense>
        <v-col cols="3" md="2">
          <v-text-field
            label="*查詢日期"
            v-model="formSearch.dataDate"
            type="date"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" md="2" class="pt-3">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="mx-2"
                fab
                dark
                small
                color="blue"
                @click="actStockSysLogRead(true)"
              >
                <v-icon dark>mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>查詢</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
    <!-- 資料列表區域 -->
    <v-data-table
      dense
      fixed-header
      :height="PG.fixHeightNum(h1)"
      :headers="grid.headers"
      :items="grid.data"
      :options.sync="grid.options"
      :server-items-length="grid.dataLength"
      :footer-props="grid.footerProps"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:[`item.date`]="{ item }">
        <span style="color:cyan;">
          {{ item.date | formatDate }}
        </span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PG from "@/store/plugin.js";

export default {
  data() {
    return {
      h1: 265,
      dialog: false,
      action: "",
      validate: false,
      PG: PG,
    };
  },
  created() {
    this.actInit();
  },
  mounted() {
    this.actStockSysLogRead();
  },
  components: {},
  watch: {
      "grid.options"(v, ov) {
      if (ov != undefined && JSON.stringify(v) != JSON.stringify(ov)) {
        this.actStockSysLogRead();
      }
    },
  },
  computed: {
    ...mapState("stockSysLog", ["formSearch", "formData", "grid"]),
  },
  methods: {
    ...mapActions("stockSysLog", [
      "actInit",
      "actInitFormData",
      "actStockSysLogRead",
    ]),
  },
};
</script>
