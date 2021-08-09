<template>
  <div>
    <v-container fluid class="grey darken-3 pa-2 mb-1">
      <h5 class="red--text mb-1">
        SignalR Test
      </h5>
      <v-row dense>
        <v-col cols="3" md="2">
          <v-text-field
            label="請輸入訊息"
            v-model="inputMsg"
            clearable
            style="height:40px"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" md="2" class="pt-3">
          <v-btn color="blue" class="mx-2" @click="sendMsg()">傳送</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      fluid
      class="grey darken-3 pa-2 mb-1"
      style="overflow-y:auto;height:420px;"
    >
      <div v-for="msg in receiveMsg" :key="msg.index">
        {{ msg }}
      </div>
    </v-container>
  </div>
</template>

<script>
//import signalr from "@/store/signalR.js";
import PG from "@/store/plugin.js";
export default {
  data() {
    return {
      inputMsg: "",
      PG: PG,
      receiveMsg: [],
    };
  },
  created() {
    //先清除服務端指定的方法名稱
    this.signalr.off("ReceiveMessage");
    //監聽訊息
    this.signalr.on("ReceiveMessage", (res) => {
      this.receiveMsg.push(res);
    });
  },
  mounted() {
    this.signalr
      .start()
      .then(() => {
        PG.setSnackBar("連接SignalR成功", "success")
        console.log("連接成功");
      })
      .catch((error) => {
        PG.setSnackBar(error, "error")
        console.log("hub fail", error);
      });
  },
  beforeDestroy() {
    this.signalr.stop();
  },
  methods: {
    sendMsg() {
      let user = PG.getOper().OperName;
      let message = this.inputMsg;
      this.signalr
        .send("Broadcast", user, message) //這裡就是Hub中的方法  參數 
        .then((res) => {
          console.log("msg send");
        })
        .catch((error) => {
          console.log("error : ", error);
        });
      this.inputMsg = "";
    },
  },
};
</script>
