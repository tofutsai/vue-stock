<template>
  <div>
    <v-container fluid class="mb-1 pa-2">
      <v-row dense class="justify-center">
        <v-col cols="12" sm="2">
          <v-card color="blue">
            <v-card-text
              class="white--text headline pa-1 font-weight-bold text-center"
            >
              上市資料
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="white--text  pa-1">
              <v-row dense>
                <v-col cols="4" md="4" class="py-4 text-center">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="actStockDownload()"
                      >
                        <v-icon style="font-size:36px">mdi-download-box</v-icon>
                      </v-btn>
                    </template>
                    <span>下載</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="8" md="8" class="text-h6">
                  <div>最後更新</div>
                  <div>{{ gridConfig.data[0].nowDate | formatDate}}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="2">
          <v-card color="green">
            <v-card-text
              class="white--text headline pa-1 font-weight-bold text-center"
            >
              上櫃資料
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="white--text pa-1">
              <v-row dense>
                <v-col cols="4" md="4" class="py-4 text-center">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="actOtcDownload"
                      >
                        <v-icon style="font-size:36px">mdi-download-box</v-icon>
                      </v-btn>
                    </template>
                    <span>下載</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="8" md="8" class="text-h6">
                  <div>最後更新</div>
                  <div>{{ gridConfig.data[0].nowDate | formatDate}}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="2">
          <v-card color="orange">
            <v-card-text
              class="white--text headline pa-1 font-weight-bold text-center"
            >
              計算平均
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="white--text pa-1">
              <v-row dense>
                <v-col cols="4" md="4" class="py-4 text-center">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="actComputeStockAvg()"
                      >
                        <v-icon style="font-size:36px">mdi-cog-transfer</v-icon>
                      </v-btn>
                    </template>
                    <span>更新</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="8" md="8" class="text-h6">
                  <div>{{ gridConfig.data[0].avgStartDate | formatDate}}</div>
                  <div>{{ gridConfig.data[0].avgEndDate | formatDate}}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="2">
          <v-card color="red">
            <v-card-text
              class="white--text headline pa-1 font-weight-bold text-center"
            >
              計算現價
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="white--text pa-1">
              <v-row dense>
                <v-col cols="4" md="4" class="py-4 text-center">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="actComputeStockNow()"
                      >
                        <v-icon style="font-size:36px">mdi-cog-transfer</v-icon>
                      </v-btn>
                    </template>
                    <span>更新</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="8" md="8" class="text-h6">
                  <div>最後更新</div>
                  <div>{{ gridConfig.data[0].nowDate | formatDate }}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="2">
          <v-card color="grey">
            <v-card-text
              class="white--text headline pa-1 font-weight-bold text-center"
            >
              系統參數
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center pt-4 pb-5">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" text @click="mtdDialog(true)">
                    <v-icon style="font-size:36px">mdi-cog-box</v-icon>
                  </v-btn>
                </template>
                <span>設定</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- 跳窗顯示區域 -->
    <v-dialog v-model="dialog" persistent width="320px">
      <v-card class="grey darken-3">
        <v-card-actions>
          <v-card-title class="cyan--text headline">
            Sys Config Setting
          </v-card-title>
          <v-spacer />
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="cyan"
                v-bind="attrs"
                v-on="on"
                @click="mtdDialog(false)"
              >
                <v-icon>mdi-close-box</v-icon>
              </v-btn>
            </template>
            <span>關閉</span>
          </v-tooltip>
        </v-card-actions>
        <v-card-text class="ma-0">
          <v-row class="justify-center">
            <v-col cols="8">
              <v-text-field
                label="stockDataDate"
                type="date"
                v-model="formData.stockUpdate"
                height="20px"
              >
              </v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="otcDataDate"
                type="date"
                v-model="formData.otcUpdate"
                height="20px"
              >
              </v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="nowDate"
                type="date"
                v-model="formData.nowDate"
                height="20px"
              >
              </v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="avgStartDate"
                type="date"
                v-model="formData.avgStartDate"
                height="20px"
              >
              </v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="avgEndDate"
                type="date"
                v-model="formData.avgEndDate"
                height="20px"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="cyan" @click="actStockSysConfigEdit()" outlined>
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
      dialog: false,
      PG: PG,
    };
  },
  created() {
    this.actInit();
    this.actStockSysConfigRead();
  },
  mounted() {
    
    },
  computed: {},
  components: {},
  watch: {},
  computed: {
    ...mapState("stockDownload", [
      "formSearch",
      "formData",
      "grid",
      "selectItems",
      "gridConfig",
    ]),
  },
  methods: {
    ...mapActions("stockDownload", [
      "actInit",
      "actInitFormData",
      "actStockDownload",
      "actOtcDownload",
      "actComputeStockAvg",
      "actComputeStockNow",
      "actStockSysConfigRead",
      "actStockSysConfigEdit",
    ]),
    mtdDialog(status) {
      this.dialog = status;
    },
  },
};
</script>
