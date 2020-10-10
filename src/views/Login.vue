<template>
  <div class="login-layout d-flex justify-center align-center">
    <v-card width="100%" max-width="380px" class="pa-4">
      <div class="login-content">
        <div class="login-content__header d-flex justify-center">
          Log in
        </div>

        <div class="login-content__subheader mb-4 d-flex justify-center">
          Using your email and password
        </div>

        <v-text-field
          label="Email"
          outlined
          class="mb-7"
          hide-details
          v-model="j_username"
        />

        <v-text-field
          label="Password"
          outlined
          class="mb-9"
          hide-details
          v-model="j_password"
          :type="showPasswrod ? 'text' : 'password'"
        />

        <v-btn
          color="#1867C0"
          x-large
          width="100%"
          class="mb-10 white--text"
          @click="loginClick"
        >
          LOGIN
        </v-btn>

        <span v-if="messages" class="d-flex justify-center mb-1 error--text">{{
          messages
        }}</span>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    j_username: "",
    j_password: "",
    showPasswrod: false,
    messages: null,
  }),
  methods: {
    ...mapActions(["login"]),
    async loginClick() {
      const res = await this.login({
        j_username: this.j_username,
        j_password: this.j_password,
      });
      if (res) {
        this.$router.push("/");
      } else {
        this.messages = "Bad credentials";
      }
    },
  },
  mounted() {
    this.j_username = process.env.VUE_APP_EMAIL
      ? process.env.VUE_APP_EMAIL
      : "";
    this.j_password = process.env.VUE_APP_PASS ? process.env.VUE_APP_PASS : "";
  },
};
</script>
