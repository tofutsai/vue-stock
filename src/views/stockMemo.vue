<template>
  <div>
    <v-container fluid class="mb-1 pa-2">
      <v-row dense>
        <v-col sm="2">
          <v-card color="purple lighten-2">
            <v-card-text class="white--text headline pa-1 font-weight-bold text-center" >
              備註資訊
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs}">
                  <v-btn v-bind="attrs" v-on="on" text @click="mtdDialog(true)">
                    <v-icon style="font-size:36px">mdi-clipboard-text</v-icon>
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
          <v-card-title class="blue--text headline">
            Stock Memo Setting
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
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-select
                label="Ext Type"
                :items="selectItems.type"
                v-model="formData.type"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Memo" v-model="formData.memoContent">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="Codes" rows="5" v-model="formData.codes">
              </v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" @click="actStockMemoCreate()" outlined>
            上傳
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
  },
  mounted() {
    
  },
  computed: {},
  components: {},
  watch: {},
  computed: {
    ...mapState("stockMemo", [
      "formSearch",
      "formData",
      "grid",
      "selectItems",
    ]),
  },
  methods: {
    ...mapActions("stockMemo", [
      "actInit",
      "actInitFormData",
      "actStockMemoCreate",
    ]),
    mtdDialog(status) {
      this.dialog = status;
    },
  },
};
</script>
