import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
import {
  Scroll
} from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  directives: {
    Scroll
  }
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#28293e',
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        searchbar: '#e6eaf6',
        fab: '#252a40',
        newItem: '#7c62a9'
      },
      dark: {
        primary: colors.blue.lighten3,
        newItem: '#5840BB'
      },
    },
  },
});