<template>
  <div class="my-5">
    <v-pagination
      v-model="curPage"
      :length="totalPages"
      :totalVisible="totalVisible"
      @input="pageChanged"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: ["totalVisible"],
  computed: {
    ...mapState(["totalPages", "listCurPage"]),
    curPage: {
      get() {
        return this.listCurPage + 1;
      },
      set(value) {
        this.SET_LIST_FILTER({ name: "listCurPage", value: value - 1 });
      },
    },
  },
  methods: {
    ...mapMutations(["SET_LIST_FILTER"]),
    pageChanged() {
      this.$emit("pageChanged");
    },
  },
};
</script>
