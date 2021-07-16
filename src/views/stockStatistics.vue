<template>
  <div>
    <!-- 查詢條件區域 -->
    <v-container fluid class="grey darken-3 pa-2 mb-1">
      <h5 class="red--text mb-1">
        股價報表,平均範圍: {{ gridConfig.data[0].avgStartDate | formatDate }} ~
        {{ gridConfig.data[0].avgEndDate | formatDate }} 現價:{{
          gridConfig.data[0].nowDate | formatDate
        }}
        查詢結果: {{ grid.dataLength | formatCommas }}
      </h5>
      <v-row dense>
        <v-col cols="3" md="1">
          <v-select
            label="市場別"
            :items="selectItems.type"
            v-model="formSearch.type"
          ></v-select>
        </v-col>
        <v-col cols="3" md="1">
          <v-select
            label="張數"
            :items="selectItems.shares"
            v-model="formSearch.shares"
          ></v-select>
        </v-col>
        <v-col cols="3" md="1">
          <v-select
            label="現價"
            :items="selectItems.closePrice"
            v-model="formSearch.closePrice"
          ></v-select>
        </v-col>
        <v-col cols="3" md="1">
          <v-select
            label="位置"
            :items="selectItems.position2"
            v-model="formSearch.position2"
          ></v-select>
        </v-col>
        <v-col cols="3" md="1">
          <v-text-field
            label="代碼/名稱"
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
                @click="actStockStatisticsRead(true)"
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
                @click="actInit(), actStockStatisticsRead()"
              >
                <v-icon dark> mdi-refresh </v-icon>
              </v-btn>
            </template>
            <span>重新整理</span>
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
      item-key="code"
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
              @click="
                actStockStatisticsDelete({ id: item.id, code: item.code })
              "
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
          @click="
            actStockStatisticsSet(item), actStockDataRead(item.code), mtdDialog(true), (action = 'Edit')
          "
          v-show="item.code != null"
        >
          <span>
            {{ item.code }}
          </span>
        </v-chip>
      </template>
      <template v-slot:[`item.avgTurnover`]="{ item }">
        <span>
          {{ item.avgTurnover | formatCommas }}
        </span>
      </template>
      <template v-slot:[`item.avgShares`]="{ item }">
        <span>
          {{ item.avgShares | formatCommas }}
        </span>
      </template>
      <template v-slot:[`item.dataDate`]="{ item }">
        <span style="color:cyan">
          {{ item.dataDate | formatDatetoMD }}
        </span>
      </template>
      <template v-slot:[`item.closePrice`]="{ item }">
        <span style="color:#0080FF">
          {{ item.closePrice }}
        </span>
      </template>
      <template v-slot:[`item.position`]="{ item }">
        <span v-if="item.position > 5" style="color:#CE0000">
          {{ item.position }}
        </span>
        <span
          v-else-if="item.position < 5 && item.position >= 1"
          style="color:#FF5151"
        >
          {{ item.position }}
        </span>
        <span
          v-else-if="item.position < 1 && item.position >= 0"
          style="color:#00EC00"
        >
          {{ item.position }}
        </span>
        <span v-else style="color:#00BB00">
          {{ item.position }}
        </span>
      </template>
      <template v-slot:[`item.memo`]="{ item }">
        <div v-if="item.memo != undefined">
          <div pt-2 v-for="(memo, index) in item.memo.split(',')" :key="index">
            <div v-show="memo.length != 0">
              <div container>
                <div row>
                  <v-chip x-small ma-0 :class="`ext-${index + 1}`">
                    <span style="color:black;">
                      {{ memo }}
                    </span>
                  </v-chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </v-data-table>

    <!-- 跳窗顯示區域 -->
    <v-dialog v-model="dialog" persistent max-width="80%">
      <v-card color="grey darken-3">
        <v-card-actions>
          <v-btn
            color="blue"
            @click="mtdToGoodinfo(formData.code), mtdDialog(false)"
            :disabled="!validate"
          >
            連結Goodinfo
          </v-btn>
          <v-btn
            color="blue"
            @click="actStockFavoriteCreate(formData.code)"
            :disabled="!validate"
          >
            加入自選
          </v-btn>
          <v-btn
            color="blue"
            @click="mtdDialogShow(true)"
            :disabled="!validate"
          >
            加入庫存
          </v-btn>
          <v-spacer />
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="cyan"
                v-bind="attrs"
                v-on="on"
                @click="actInitChartData(), mtdDialog(false)"
              >
                <v-icon>mdi-close-box</v-icon>
              </v-btn>
            </template>
            <span>關閉</span>
          </v-tooltip>
        </v-card-actions>
        <v-card-text>
          <v-row>
            <v-col md="4" cols="12">
              <span class="cyan--text"
                >{{ formData.code }} {{ formData.company }}</span
              >
              <span class="ml-2"
                >目前價格 :
                <span class="blue--text">{{ formData.closePrice }}</span></span
              >
              <span class="ml-2"
                >相對位置 :
                <span v-if="formData.position > 5" style="color:#CE0000">
                  {{ formData.position }}
                </span>
                <span
                  v-else-if="formData.position < 5 && formData.position >= 1"
                  style="color:#FF5151"
                >
                  {{ formData.position }}
                </span>
                <span
                  v-else-if="formData.position < 1 && formData.position >= 0"
                  style="color:#00EC00"
                >
                  {{ formData.position }}
                </span>
                <span v-else style="color:#00BB00">
                  {{ formData.position }}
                </span>
              </span>
            </v-col>
            <v-col md="8" cols="12">
              <div v-if="formData.memo != undefined">
                <span
                  v-for="(memo, index) in formData.memo.split(',')"
                  :key="index"
                  v-show="memo.length != 0"
                >
                  <v-chip x-small class="mr-2" :class="`ext-${index + 1}`">
                    <span style="color:black;">
                      {{ memo }}
                    </span>
                  </v-chip>
                </span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <template>
          <div v-if="chartData.info.code != ''">
            <apexchart
              ref="realtimeChart"
              type="candlestick"
              :height="height"
              :options="chartData.options"
              :series="chartData.series"
            ></apexchart>
          </div>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogShow" persistent width="320px">
      <v-card color="grey darken-3">
        <v-card-title class="cyan--text">
          新增庫存
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field label="代碼/名稱" v-model="formData.code">
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="價格"
                v-model="formData.buyPrice"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="股數"
                v-model="formData.buyShares"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" outlined @click="mtdDialogShow(false)">
            取消
          </v-btn>
          <v-btn
            color="cyan"
            outlined
            @click="actStockProfitCreate(formData.code), mtdDialogShow(false)"
          >
            新增
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
      dialogShow: false,
      height: "400px",
    };
  },
  created() {
    this.actInit();
    this.actStockSysConfigRead();
  },
  mounted() {
    this.actStockStatisticsRead();
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
        this.actStockStatisticsRead();
      }
    },
  },
  computed: {
    ...mapState("stockStatistics", [
      "formSearch",
      "formData",
      "grid",
      "selectItems",
      "gridConfig",
      "chartData",
    ]),
  },
  methods: {
    ...mapActions("stockStatistics", [
      "actInit",
      "actInitFormData",
      "actStockStatisticsRead",
      "actStockStatisticsSet",
      "actStockStatisticsCreate",
      "actStockStatisticsEdit",
      "actStockStatisticsDelete",
      "actStockSysConfigRead",
      "actStockProfitCreate",
      "actStockDataRead",
      "actInitChartData",
    ]),
    ...mapActions("stockFavorite", ["actStockFavoriteCreate"]),
    mtdDialog(status) {
      this.dialog = status;
    },
    mtdToGoodinfo(code) {
      window.open(
        `https://goodinfo.tw/StockInfo/StockBzPerformance.asp?STOCK_ID=${code}`
      );
    },
    mtdDialogShow(status) {
      this.dialogShow = status;
    },
  },
};
</script>
<style>
.ext-1 {
  background: rgb(255 148 148) !important;
}

.ext-2 {
  background-color: rgb(255 206 206) !important;
}

.ext-3 {
  background-color: rgb(255 236 121) !important;
}

.ext-4 {
  background-color: rgb(91 216 132) !important;
}

.ext-5 {
  background-color: rgb(195 250 133) !important;
}

.ext-6 {
  background-color: rgb(121 230 247) !important;
}

.ext-7 {
  background-color: rgb(206 146 243) !important;
}
.apexcharts-theme-light {
  color: grey !important;
}
.apexcharts-yaxis-label {
  fill: white !important;
}

.apexcharts-xaxis-label {
  fill: white !important;
}

.apexcharts-title-text {
  fill: white !important;
}
.apexcharts-toolbar {
  z-index: 1 !important;
}
</style>
