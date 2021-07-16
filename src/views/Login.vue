<template>
  <div>
    <v-row class="justify-center align-center">
      <v-col cols="12" sm="4">
        <v-card class="grey darken-4">
          <v-card-title class="amber--text grey darken-3">
            TStock 登入頁面
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="帳號" v-model="formData.account" required>
                <v-icon slot="prepend">mdi-account</v-icon>
              </v-text-field>
              <v-text-field
                label="密碼"
                v-model="formData.password"
                type="password"
                required
              >
                <v-icon slot="prepend">mdi-lock</v-icon>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="cyan darken-2" @click="mtdDialog(true)">註冊</v-btn>
            <v-btn
              color="amber darken-3"
              :disabled="!validate"
              @click="actStockLogin()"
              >登入</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- 跳窗顯示區域 -->
    <v-dialog v-model="dialog" persistent max-width="320px">
      <v-card color="grey darken-3">
        <v-card-actions>
          <v-card-title class="cyan--text headline">
            註冊
          </v-card-title>
          <v-spacer />
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="cyan"
                v-bind="attrs"
                v-on="on"
                icon
                @click="actInit(), mtdDialog(false)"
              >
                <v-icon>mdi-close-box</v-icon>
              </v-btn>
            </template>
            <span>關閉</span>
          </v-tooltip>
        </v-card-actions>
        <v-card-text>
          <v-text-field label="帳號" v-model="formData.registerAccount">
            <v-icon slot="prepend">mdi-account</v-icon>
          </v-text-field>
          <v-text-field
            label="密碼"
            v-model="formData.registerPassword"
            type="password"
          >
            <v-icon slot="prepend">mdi-lock</v-icon>
          </v-text-field>
          <v-text-field label="名稱" v-model="formData.registerName">
            <v-icon slot="prepend">mdi-alpha-n-box</v-icon>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="cyan"
            outlined
            :disabled="!registervalidate"
            @click="actStockRegister(), mtdDialog(false)"
          >
            確認
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
      validate: false,
      registervalidate: false,
      PG: PG,
    };
  },
  created() {
    this.actInit();
  },
  computed: {
    ...mapState("Login", ["formData", "user"]),
  },
  watch: {
    formData: {
      handler(v, ov) {
        if (this.formData.account != "" && this.formData.password != "") {
          this.validate = true;
        } else {
          this.validate = false;
        }
        if (
          this.formData.registerAccount != "" &&
          this.formData.registerPassword != "" &&
          this.formData.registerName != ""
        ) {
          this.registervalidate = true;
        } else {
          this.registervalidate = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("Login", ["actInit", "actStockLogin", "actStockRegister"]),
    mtdDialog(status) {
      this.dialog = status;
    },
  },
};
</script>
