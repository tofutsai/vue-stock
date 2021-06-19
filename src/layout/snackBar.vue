<template>
  <v-snackbar
    v-model="snackBar.isOpen"
    :timeout="snackBar.timeout"
    :color="snackBar.color"
    outlined
    top
  >
    {{ snackBar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="PG.setSnackBar('', '', false)"
      >
        <v-icon :color="snackBar.color">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
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
    ...mapState("global", ["snackBar"]),
  },
};
</script>
