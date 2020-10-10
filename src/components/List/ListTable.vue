<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="tableItems"
      hide-default-footer
      class="list-table"
      disable-pagination
      disable-sort
      @click:row="tableRowClicked"
    >
      <template v-slot:[`item.name`]="{ item }">
        <span class="primary--text">
          {{ item.name }}
        </span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["tableItems"],
  data: () => ({
    tableHeaders: [
      {
        text: "Status",
        align: "start",
        value: "status",
        width: "12%",
      },
      {
        text: "Name",
        align: "start",
        value: "name",
        width: "20%",
      },
      {
        text: "Job",
        align: "start",
        value: "job",
        width: "35%",
      },
      {
        text: "Phone",
        align: "start",
        value: "phone",
        width: "11%",
      },
      {
        text: "Value",
        align: "start",
        value: "value",
        width: "7%",
      },
      {
        text: "Updated",
        align: "start",
        value: "updated",
        width: "15%",
      },
    ],
  }),
  methods: {
    tableRowClicked(value) {
      this.$emit("tableRowClicked", value);
    },
  },
};
</script>
