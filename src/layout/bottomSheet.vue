<template>
  <v-bottom-sheet v-model="bottomSheet.isOpen" style="z-index:20">
    <v-sheet class="grey text-center" height="120px">
      <div class="py-3">
        <v-btn class="mr-1" @click="PG.setAlert('Alert Test')"> ALERT </v-btn>
        <v-btn class="mr-1" @click="PG.setConfirm('Confirm Test', test)"> CONFIRM </v-btn>
        <v-btn class="mr-1" @click="PG.setSnackBar('SnackBar test')"> SNACKBAR</v-btn>
        <v-btn class="mr-1" @click="PG.setProgressBar(true)"> PROGRESSBAR_T</v-btn>
        <v-btn class="mr-1" @click="PG.setProgressBar(false)"> PROGRESSBAR_F</v-btn>
        <v-btn class="mr-1" @click="PG.setNavigation(true)"> NAVGATION</v-btn>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PG from "@/store/plugin.js";

export default {
  data() {
    return {
      PG: PG,
    };
  },
  computed: {
    ...mapState("global", ["bottomSheet"]),
  },
  methods: {
    test() {
      alert("doConfirmMethods");
    },
  },
};
</script>
