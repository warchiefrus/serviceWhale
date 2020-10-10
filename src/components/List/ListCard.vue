<template>
  <div class="card-layout mb-2" @click="cardClicked">
    <span>{{ item.status }}</span>
    <span class="primary--text">{{ item.name }}</span>
    <span>{{ item.job }}</span>
    <span>{{ item.phone }}</span>
    <div class="d-flex justify-space-between">
      <span>
        {{ item.updated }}
      </span>
      <span class="card-amount">
        {{ item.value }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    cardClicked() {
      this.$emit("cardClicked", this.item);
    },
  },
};
</script>
