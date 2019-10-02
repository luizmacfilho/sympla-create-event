<template>
  <v-app class="app">
    <v-app-bar
      app
      flat
      extended
      color="white"
      class="app__bar"
      height="68"
      extension-height="100"
    >
      <EventsBtn />
      <img class="app__bar__logo" src="./assets/logo.svg"/>
      <UserInfo />

      <template v-slot:extension>
        <div class="app__bar__extension">
          <span class="app__bar__extension__title">Criar Evento</span>
          <PublishEventBtn />
        </div>
      </template>
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

@Component({
  components: {
    EventsBtn, UserInfo, PublishEventBtn,
  },
})
export default class App extends Vue {}
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

    &__extension {
      width: 1110px;
      display: flex;
      margin: auto;
      justify-content: space-between;

      &__title {
        height: 30px;
        line-height: 1.25;
        font-size: 24px;
        color: #494b57
      }
    }

    .v-toolbar__extension {
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
