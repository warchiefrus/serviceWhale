<template>
  <div>
    <div v-if="list" class="list-layout">
      <div class="list-header">
        <div
          v-if="$vuetify.breakpoint.smAndUp"
          class="list-header__text d-flex align-center"
        >
          {{ total }}
        </div>

        <div
          v-else
          class="mobile-content-header d-flex justify-space-between"
          @click="toggleDrawler"
        >
          <div class="d-flex align-center">
            {{ total }}
          </div>
          <v-icon color="#076DC1">mdi-tune</v-icon>
        </div>

        <v-text-field
          label="Search by name, phone or email"
          outlined
          hide-details
          width="100%"
          solo
          flat
          v-model="search"
          clearable
          autocomplete="false"
          append-icon="mdi-magnify"
        />

        <v-select
          v-if="$vuetify.breakpoint.smAndUp"
          label="Show all leads"
          outlined
          hide-details
          :items="statusItems"
          v-model="status"
          clearable
          solo
          flat
          append-icon="mdi-chevron-down"
        />
      </div>

      <ListTable
        v-if="$vuetify.breakpoint.smAndUp"
        :tableItems="tableItems"
        @tableRowClicked="tableRowClicked"
        @pageChanged="getList"
      />
      <ListCard
        v-else
        v-for="item of tableItems"
        :key="item.id"
        :item="item"
        @cardClicked="tableRowClicked"
        @pageChanged="getList"
      />

      <ListPagination
        class="d-flex align-center"
        :class="
          $vuetify.breakpoint.smAndUp ? 'justify-start' : 'justify-center'
        "
        :totalVisible="$vuetify.breakpoint.smAndUp ? 7 : 3"
        @pageChanged="getList"
      />

      <ListMobileDrawler
        v-if="!$vuetify.breakpoint.smAndUp"
        :isDravlerVisible="isDravlerVisible"
        @closeDrawler="toggleDrawler"
      />
    </div>

    <div v-else class="app-message d-flex justify-center align-center">
      <span>
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import ListTable from "@/components/List/ListTable";
import ListCard from "@/components/List/ListCard";
import ListMobileDrawler from "@/components/List/ListMobileDrawler";
import ListPagination from "@/components/List/ListPagination";

export default {
  components: {
    ListTable,
    ListCard,
    ListPagination,
    ListMobileDrawler,
  },
  computed: {
    ...mapState([
      "list",
      "statusItems",
      "totalElements",
      "listStatus",
      "listSearch",
    ]),
    tableItems() {
      return this.list.map((item) => {
        const tableItem = {};
        tableItem.id = item.id;
        tableItem.status = item.leadStatus;
        tableItem.name = item.customerInfo.name;
        tableItem.job = item.job;
        tableItem.phone = item.customerInfo.phone;
        tableItem.value = item.price.symbol + item.price.amount;
        let updated = new Date(item.updatedDate);
        tableItem.updated = `${("0" + updated.getDate()).slice(-2)}/${(
          "0" +
          (updated.getMonth() + 1)
        ).slice(-2)}/${updated.getFullYear()}`;
        return tableItem;
      });
    },
    total() {
      return `Total ${this.totalElements} leads`;
    },
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
    search: {
      get() {
        return this.listSearch;
      },
      set(value) {
        this.SET_LIST_FILTER({ name: "listSearch", value });
        this.SET_LIST_FILTER({ name: "listCurPage", value: 0 });
        this.getList();
      },
    },
  },
  data: () => ({
    message: "Loading...",
    isDravlerVisible: false,
  }),

  methods: {
    ...mapActions(["getList"]),
    ...mapMutations(["SET_LIST_FILTER"]),
    tableRowClicked(item) {
      this.$router.push(`/detailed/${item.id}`);
    },
    toggleDrawler() {
      this.isDravlerVisible = !this.isDravlerVisible;
    },
  },
  created() {
    this.getList();
  },
  beforeRouteUpdate(to, from, next) {
    this.getList();
    next();
  },
};
</script>
