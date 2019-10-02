<template>
  <v-app class="app">
    <v-app-bar
      app
      flat
      color="white"
      class="app__bar"
      height="68"
    >
      <component :is="app.headerButtonName"></component>
      <img class="app__bar__logo" src="./assets/logo.svg"/>
      <UserInfo />
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import EventsBtn from '@/components/EventsBtn.vue';
import UserInfo from '@/components/UserInfo.vue';
import PublishEventBtn from '@/components/PublishEventBtn.vue';
import { instance, Application } from '@/app/Application';

@Component({
  components: {
    EventsBtn, UserInfo, PublishEventBtn,
  },
})
export default class App extends Vue {

  public app: Application;

  constructor() {
    super();
    this.app = instance;
  }
}
</script>
<style lang="scss">
* {
  font-family: 'Open Sans';
}

.app {
  &__bar {

    .v-toolbar__content {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
    }

    &__logo {
      height: 50px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
