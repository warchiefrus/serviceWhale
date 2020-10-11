<template>
  <v-app-bar
    app
    dark
    dense
    flat
    class="navbar primary"
  >
    <v-container class="px-4 d-flex flex-center-y flex-grow max-content-size">
      <span class="navbar__appname">CRM</span>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated"
        small 
        light
        @click="logOutClick"
      >
        <span class="primary--text navbar__logout-btn-text">SIGN OUT</span>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logOut']),
    async logOutClick() {
      if (await this.logOut()) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
  .navbar__appname {
    font-weight: 900;
    font-size: 24px;
    line-height: 28px;
  }

  .navbar__logout-btn-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 28px;
  }
</style>