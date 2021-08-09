import * as signalR from "@aspnet/signalr";

const signal = new signalR.HubConnectionBuilder()
  .withUrl("http://tsaitofu-001-site1.gtempurl.com/chatHub").configureLogging(signalR.LogLevel.Debug)
  .build();

export default{
  //install方法的第一個參數是Vue 構造器，第二個參數是一個可選的選項對象。
    install: function(Vue){
        Vue.prototype.signalr = signal;
    }
}