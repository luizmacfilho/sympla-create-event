<template>
  <v-container class="not-found flex-column justify-center" fill-height>
    <div class="not-found__code">404</div>
    <div class="not-found__message">Page Not Found!</div>
    <EventsBtn />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import instance from '@/app/Application';

@Component
export default class EventList extends Vue {

  constructor() {
    super();
    instance.headerButtonName = 'EventsBtn';
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  &__code {
    font-size: 96px;
    font-weight: 500;
  }

  &__message {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 12px;
  }
}
</style>