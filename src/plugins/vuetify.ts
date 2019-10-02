import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import 'typeface-open-sans/index.css';
import ScheduleIcon from '@/components/ScheduleIcon.vue';
import ClockIcon from '@/components/ClockIcon.vue';
import ArrowDownIcon from '@/components/ArrowDownIcon.vue';

// tslint:disable-next-line: no-var-requires
const VueTheMask = require('vue-the-mask');

Vue.use(VueTheMask.default);
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      schedule: { component: ScheduleIcon },
      clock: { component: ClockIcon },
      arrowDown: { component: ArrowDownIcon },
    },
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
