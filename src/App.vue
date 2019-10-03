<template>
  <v-app class="app">
    <v-app-bar app flat color="white" class="app__bar" height="68">
      <component :is="app.headerButtonName"></component>
      <img class="app__bar__logo" src="./assets/logo.svg"/>
      <UserInfo class="app__bar__user" />
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>

    <v-snackbar v-model="app.showToast" top right color="primary">
      {{ app.toastMessage }}
      <v-btn color="white" text icon @click="app.showToast = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import UserInfo from '@/components/UserInfo.vue';
import PublishEventBtn from '@/components/PublishEventBtn.vue';
import instance, { Application } from '@/app/Application';
import EventStorage from '@/storage/EventStorage';

@Component({
  components: {
    UserInfo, PublishEventBtn,
  },
})
export default class App extends Vue {

  public app: Application;

  constructor() {
    super();
    this.app = instance;
    EventStorage.start();
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
      border-bottom: 1px solid #ccc;
    }

    &__logo {
      height: 50px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &__user {
      margin-left: auto;
    }
  }

  .v-snack {
    top: 80px;
    right: 32px;

    &__content {
      background-color: #00cbc8;
    }
  }
}
</style>
