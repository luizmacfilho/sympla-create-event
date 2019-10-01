import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import 'typeface-open-sans/index.css';

// tslint:disable-next-line: no-var-requires
const VueTheMask = require('vue-the-mask');

Vue.use(VueTheMask.default);
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#0097ff',
      },
    },
  },
});
