<template>
<div>
  <v-overlay :absolute="true" z-index="20" v-model="progressBar.isOpen">
  </v-overlay>
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
