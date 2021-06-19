<template>
  <div style="height:2px">
    <v-progress-linear v-show="progressBar.isOpen"  indeterminate color="red" ></v-progress-linear>
  </div>
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
    ...mapState("global", ["progressBar"]),
  },
};
</script>
