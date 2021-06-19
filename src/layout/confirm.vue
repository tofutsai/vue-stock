<template>
  <v-dialog v-model="confirm.isOpen" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">
        <div :class="confirm.color + '--text'">{{ confirm.color }}</div>
      </v-card-title>
      <v-card-text>
        <div v-html="`<span>${confirm.text}</span>`"></div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="grey"
          outlined
          @click="PG.setConfirm('', null, '', false)"
        >
          取消
        </v-btn>
        <v-btn
          :color="confirm.color"
          outlined
          @click="mtdDoMethods(), PG.setConfirm('', null, '', false)"
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
    };
  },
  computed: {
    ...mapState("global", ["confirm"]),
  },
  methods: {
    mtdDoMethods() {
      this.confirm.methods();
    },
  },
};
</script>
