import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import AddEventBtn from '@/components/AddEventBtn.vue';

Vue.config.productionTip = false;

Vue.component('AddEventBtn', AddEventBtn);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
