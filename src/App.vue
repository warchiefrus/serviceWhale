<template>
  <v-app>
    <v-main>
      <NavBar/>
      <div class="app-content-wrapper">
        <router-view/>
      </div>
      <Footer/>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default {
  name: 'App',

  components: {
    NavBar, Footer
  },
};
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

</style>
