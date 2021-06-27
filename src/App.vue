<template>
  <v-app>
    <appBar />
    <alert />
    <confirm />
    <snackBar />
    <bottomSheet />
    <navigation />
    <v-main>
      <progressBar />
      <overlay />
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import appBar from "@/layout/appBar.vue";
import bottomSheet from "@/layout/bottomSheet.vue";
import alert from "@/layout/alert.vue";
import confirm from "@/layout/confirm.vue";
import snackBar from "@/layout/snackBar.vue";
import navigation from "@/layout/navigation.vue";
import progressBar from "@/layout/progressBar.vue";
import overlay from "@/layout/overlay.vue";
export default {
  data: () => ({}),
  components: {
    appBar,
    bottomSheet,
    alert,
    confirm,
    snackBar,
    navigation,
    progressBar,
    overlay,
  },
};
</script>

<style></style>
