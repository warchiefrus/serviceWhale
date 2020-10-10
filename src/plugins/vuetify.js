import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({

  theme: {
    themes: {
      light: {
        primary: '#1867C0'
      },
    },
    options: {
      customProperties: true
    },    
  }
});
