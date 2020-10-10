<template>
  <div>
    <div v-if="contrlead" class="detailed-layout">
      <v-btn
        v-if="$vuetify.breakpoint.smAndUp"
        height="50"
        width="74"
        @click="goBackClicked"
        class="detailed__back-button"
      >
        <v-icon color="#076DC1">mdi-arrow-left</v-icon>
      </v-btn>

      <div v-else class="mobile-content-header" @click="goBackClicked">
        <v-icon color="#076DC1">mdi-arrow-left</v-icon>
      </div>

      <div>
        <div
          class="detailed__header d-flex align-center"
          :class="$vuetify.breakpoint.smAndUp ? 'mb-2' : 'mb-0'"
        >
          <span>{{ contrlead.customerInfo.name }}</span>
        </div>

        <div class="detailed__subheader detailed__elems-grid">
          <div class="mb-4">
            <div class="d-flex align-center">
              {{ contrlead.customerInfo.email }}
            </div>

            <div class="d-flex align-center primary--text">
              {{ contrlead.customerInfo.phone }}
            </div>
          </div>

          <div class="mb-4">
            <div class="detailed__subheader-address">
              <div class="d-flex align-center detailed--gery-text">
                Service address:
              </div>
              <div class="d-flex align-center">
                {{ contrlead.customerInfo.serviceAddress }}
              </div>
            </div>

            <div class="detailed__subheader-address">
              <div class="d-flex align-center detailed--gery-text">
                Billing address:
              </div>
              <div class="d-flex align-center">
                {{ contrlead.billingAddress }}
              </div>
            </div>
          </div>
        </div>

        <form class="detailed__form">
          <div
            class="detailed__form-header mb-5"
            :class="$vuetify.breakpoint.smAndUp ? 'mx-6' : 'mx-4'"
          >
            {{ formHeader }}
          </div>

          <div class="detailed__elems-grid">
            <v-select
              label="Show all Job"
              outlined
              hide-details
              :items="statusItems"
              v-model="leadStatus"
              clearable
              solo
              flat
              append-icon="mdi-chevron-down"
              @input="updateContrlead"
              class="mb-5"
              :class="$vuetify.breakpoint.smAndUp ? 'ml-6' : 'mx-4'"
            />

            <v-text-field
              label="Add status comment"
              outlined
              hide-details
              width="100%"
              solo
              flat
              v-model="statusComment"
              @input="updateContrlead"
              clearable
              autocomplete="false"
              class="mb-5"
              :class="$vuetify.breakpoint.smAndUp ? 'mr-6' : 'mx-4'"
            />
          </div>
        </form>
      </div>
    </div>

    <div v-else class="app-message">
      <span>
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["statusItems"]),
    formHeader() {
      return this.contrlead
        ? `${this.contrlead.job} - ${this.contrlead.price.symbol}${this.contrlead.price.amount}`
        : "";
    },
  },

  data: () => ({
    contrlead: null,
    leadStatus: null,
    statusComment: null,
    message: "Loading...",
  }),

  async created() {
    const result = await this.getDetailed(this.$route.params.id);
    if (result) {
      this.contrlead = result.item;
      this.leadStatus = this.contrlead.leadStatus;
      this.statusComment = this.contrlead.statusComment;
    } else {
      this.message = "Nothing found";
    }
  },

  methods: {
    ...mapActions(["getDetailed", "updateData"]),
    goBackClicked() {
      this.$router.push("/");
    },
    updateContrlead() {
      this.contrlead.leadStatus = this.leadStatus;
      this.contrlead.statusComment = this.statusComment;
      this.updateData(this.contrlead);
    },
  },
};
</script>