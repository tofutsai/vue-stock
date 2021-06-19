<template>
  <v-dialog v-model="alert.isOpen" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">
        <div :class="`${alert.color}--text`">{{ alert.color }}</div>
      </v-card-title>
      <v-card-text>
        <div v-html="`<span>${alert.text}</span>`"></div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :color="alert.color" text @click="PG.setAlert('', '', false)">
          Ok
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
    };
  },
  computed: {
    ...mapState("global", ["alert"]),
  },
};
</script>
