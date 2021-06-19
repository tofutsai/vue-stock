<template>
  <div>
    This Is Example
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
  created() {},
  mounted() {},
  components: {},
  watch: {},
  computed: {
    ...mapState("report", ["formSearch", "formData", "gridData"]),
  },
  methods: {
    ...mapActions("report", ["actInit", "actReadStockData"]),
  },
};
</script>

<style scoped></style>
