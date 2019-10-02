import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/events',
    },
    {
      path: '/events',
      name: 'eventList',
      component: () => import(/* webpackChunkName: "eventList" */ './views/EventList.vue'),
    },
    {
      path: '/events/:id',
      name: 'event',
      component: () => import(/* webpackChunkName: "event" */ './views/Event.vue'),
    },
    {
      path: '/add-event',
      name: 'event',
      component: () => import(/* webpackChunkName: "event" */ './views/Event.vue'),
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import(/* webpackChunkName: "notFound" */ './views/NotFound.vue'),
    },
  ],
});
