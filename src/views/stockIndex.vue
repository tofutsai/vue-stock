<template>
  <div>
    <!-- 查詢條件區域 -->
    <v-container fluid class="grey darken-3 pa-2 mb-1">
      <h5 class="red--text mb-1">
        索引清單, 查詢結果: {{ grid.dataLength | formatCommas }}
      </h5>
      <v-row dense>
        <v-col cols="3" md="2">
          <v-select
            label="市場別"
            :items="selectItems.type"
            v-model="formSearch.type"
          ></v-select>
        </v-col>
        <v-col cols="3" md="2">
          <v-text-field
            label="代碼/公司名稱"
            v-model="formSearch.code"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="2" class="pt-3">
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
                @click="actStockIndexRead(true)"
              >
                <v-icon dark> mdi-magnify </v-icon>
              </v-btn>
            </template>
            <span>查詢</span>
          </v-tooltip>
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
                @click="actInit(), actStockIndexRead()"
              >
                <v-icon dark> mdi-refresh </v-icon>
              </v-btn>
            </template>
            <span>重新整理</span>
          </v-tooltip>
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
                @click="actInitFormData(), mtdDialog(true), (action = 'Create')"
              >
                <v-icon dark> mdi-plus-thick </v-icon>
              </v-btn>
            </template>
            <span>新增</span>
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
      <template v-slot:[`item.ctrl`]="{ item }">
        {{ item.ctrl }}
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <a
              v-bind="attrs"
              v-on="on"
              text
              @click="actStockIndexDelete({ id: item.id, code: item.code })"
            >
              <span v-if="item.id != null">
                <v-icon>
                  mdi-close
                </v-icon>
              </span>
            </a>
          </template>
          <span>刪除</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.code`]="{ item }">
        <v-chip
          x-small
          ma-0
          color="cyan darken-2"
          @click="actStockIndexSet(item), mtdDialog(true), (action = 'Edit')"
          v-show="item.code != null"
        >
          <span>
            {{ item.code }}
          </span>
        </v-chip>
      </template>
      <template v-slot:[`item.dataDate`]="{ item }">
        <span>
          {{ item.dataDate | formatDate }}
        </span>
      </template>
      <template v-slot:[`item.isEnable`]="{ item }">
        <v-checkbox v-model="item.isEnable" readonly v-show="item.code != null"></v-checkbox>
      </template>
    </v-data-table>

    <!-- 跳窗顯示區域 -->
    <v-dialog v-model="dialog" persistent max-width="360px">
      <v-card>
        <v-card-title
          v-if="action == 'Create'"
          class="grey lighten-3  blue--text headline"
        >
          新增股票索引
        </v-card-title>
        <v-card-title v-else class="grey lighten-3 blue--text headline">
          更新股票索引
        </v-card-title>
        <v-card-text class="grey darken-3">
          <v-row>
            <v-col cols="6">
              <v-select
                label="上市別"
                :items="selectItems.type"
                v-model="formData.type"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field label="*產業類別" v-model="formData.category">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="*股票代碼" v-model="formData.code">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="*公司名稱" v-model="formData.company">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="*上市櫃日期"
                v-model="formData.dataDate"
                type="date"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-switch label="*是否啟用" v-model="formData.isEnable">
              </v-switch>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="grey darken-3">
          <v-btn
            color="red"
            @click="actStockIndexDelete(formData), mtdDialog(false)"
            outlined
            :disabled="!validate"
          >
            刪除
          </v-btn>
          <v-spacer />
          <v-btn color="grey" @click="mtdDialog(false)" outlined>
            取消
          </v-btn>
          <v-btn
            v-if="action == 'Create'"
            color="blue"
            @click="actStockIndexCreate(), mtdDialog(false)"
            outlined
            :disabled="!validate"
          >
            新增
          </v-btn>
          <v-btn
            v-if="action == 'Edit'"
            color="blue"
            @click="actStockIndexEdit(), mtdDialog(false)"
            outlined
            :disabled="!validate"
          >
            更新
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    this.actStockIndexRead();
  },
  computed: {},
  components: {},
  watch: {
    formData: {
      handler(v, ov) {
        if (
          this.formData.type != "" &&
          this.formData.category != "" &&
          this.formData.code != ""
        ) {
          this.validate = true;
        } else {
          this.validate = false;
        }
      },
      deep: true,
    },
    "grid.options"(v, ov) {
      if (ov != undefined && JSON.stringify(v) != JSON.stringify(ov)) {
        this.actStockIndexRead();
      }
    },
  },
  computed: {
    ...mapState("stockIndex", [
      "formSearch",
      "formData",
      "grid",
      "selectItems",
    ]),
  },
  methods: {
    ...mapActions("stockIndex", [
      "actInit",
      "actInitFormData",
      "actStockIndexRead",
      "actStockIndexSet",
      "actStockIndexCreate",
      "actStockIndexEdit",
      "actStockIndexDelete",
    ]),
    mtdDialog(status) {
      this.dialog = status;
    },
  },
};
</script>
