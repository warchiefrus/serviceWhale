<template>
  <v-navigation-drawer
    fixed
    right
    height="100vh"
    width="100vw"
    :value="isDravlerVisible"
  >
    <div class="pa-4">
      <div class="d-flex justify-space-between mb-3">
        <div class="drawler-header">
          Filter
        </div>
        <v-icon @click="closeDrawler">mdi-window-close</v-icon>
      </div>
      <div>
        <v-select
          label="Status"
          outlined
          hide-details
          :items="statusItems"
          v-model="status"
          solo
          flat
          append-icon="mdi-chevron-down"
        />
      </div>
      <div class="d-flex justify-center">
        <v-btn text class="primary--text drawler-reset" @click="resetAll">
          Reset all
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: ["isDravlerVisible"],
  computed: {
    ...mapState(["statusItems", "listStatus"]),
    status: {
      get() {
        return this.listStatus;
      },
      set(value) {
        this.SET_LIST_FILTER({ name: "listStatus", value });
        this.SET_LIST_FILTER({ name: "listCurPage", value: 0 });
        this.getList();
      },
    },
  },
  methods: {
    ...mapActions(["getList"]),
    ...mapMutations(["SET_LIST_FILTER"]),
    closeDrawler() {
      this.$emit("closeDrawler");
    },
    resetAll() {
      this.SET_LIST_FILTER({ name: "listStatus", value: null });
      this.getList();
    },
  },
};
</script>

<style scoped>
.drawler-header {
  font-size: 18px;
  line-height: 21px;
}
.drawler-reset {
  position: absolute;
  bottom: 25px;
}
</style>
