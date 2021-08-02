<template>
  <v-dialog persistent width="320px" v-model="editPassword.isOpen">
    <v-card class="grey darken-3" >
      <v-card-actions>
        <v-card-title class="blue--text headline">
          修改密碼
        </v-card-title>
        <v-spacer />
        <v-tooltip top>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              icon
              color="cyan"
              v-bind="attrs"
              v-on="on"
              @click="PG.setPassword(false), actInit()"
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
            <v-text-field
              label="*請輸入原密碼"
              type="password"
              v-model="formData.oldPassword"
            >
              <v-icon slot="prepend">mdi-lock</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="*請輸入新密碼"
              type="password"
              v-model="formData.newPassword"
              @blur="mtdCheckPassword(formData.newPasswordCheck)"
            >
              <v-icon slot="prepend">mdi-lock</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="*請再輸入一次新密碼"
              type="password"
              v-model="formData.newPasswordCheck"
              @blur="mtdCheckPassword(formData.newPasswordCheck)"
            >
              <v-icon slot="prepend">mdi-lock</v-icon>
            </v-text-field>
            
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <span v-if="!validatecheck" class="red--text darken-3 ma-0">輸入的新密碼不一致!</span>
        <v-spacer />
        <v-btn
          color="cyan"
          outlined
          :disabled="!validate"
          @click="actEditPassword(), actInit()"
        >
          確認
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions } from "vuex";
import PG from "@/store/plugin.js";
export default {
  data() {
    return {
      PG: PG,
      validate: false,
      validatecheck:true,
    };
  },
  created() {
    this.actInit();
  },
  mounted() {},
  computed: {
    ...mapState("global", ["editPassword"]),
    ...mapState("editPassword", ["formData"]),
  },
  watch: {
    formData: {
      handler: function(v, ov) {
        if (
          this.formData.oldPassword != "" &&
          this.formData.newPassword != "" &&
          this.formData.newPasswordCheck != "" &&
          this.formData.newPassword == this.formData.newPasswordCheck
        ) {
          this.validate = true;
        }else{
          this.validate = false;
        }
        // if(this.formData.newPassword =="" || this.formData.newPasswordCheck == ""){
        //   this.validatecheck = true;
        // }

      },
      deep:true,
    },
  },
  methods: {
    ...mapActions("editPassword", ["actInit", "actEditPassword"]),
    mtdCheckPassword(passwordCheck){
      if(this.formData.newPassword != "" && passwordCheck == ""){
        this.validatecheck = true;
      }else if( this.formData.newPassword != passwordCheck){
        this.validatecheck = false;
      }else{
        this.validatecheck = true;
      }
    }
  },
};
</script>
