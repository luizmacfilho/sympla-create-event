import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import AddEventBtn from '@/components/AddEventBtn.vue';
import EventsBtn from '@/components/EventsBtn.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.component('AddEventBtn', AddEventBtn);
Vue.component('EventsBtn', EventsBtn);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
