<template>
  <v-btn
    class="add-events-btn"
    rounded
    dark
    elevation="0"
    height="34"
    :color="color"
    to="/add-event"
    >
    {{ label }}
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class AddEventBtn extends Vue {

  @Prop({ type: String, default: '+ criar evento' }) public label!: string;
  @Prop({ type: String, default: 'primary' }) public color!: string;
}
</script>

<style lang="scss">
.add-events-btn {
  .v-btn__content {
    height: 18px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.5;
  }
}
</style>