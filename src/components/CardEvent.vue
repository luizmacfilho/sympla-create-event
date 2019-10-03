<template>
  <v-card
    class="event-card ma-auto mb-6"
    max-width="1110"
    :height="height"
  >
    <span v-if="label" class="event-card__title">{{ label }}</span>
    <span v-if="description" class="event-card__description">{{ description }}</span>
    <slot></slot>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class CardEvent extends Vue {

  @Prop({ type: String, default: '' }) public label!: string;
  @Prop({ type: String, default: '' }) public description!: string;
  @Prop({ type: [Number, String] }) public height!: number|string;
}
</script>

<style lang="scss" >
.event-card {
  text-align: left;
  padding: 36px 64px;

  &__title {
    height: 30px;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    color: var(--v-primary-base);
    display: block;
  }

  &__description {
    height: 18px;
    font-size: 12px;
    line-height: 1.5;
    color: #494b57;
    padding-left: 24px;
  }
}
</style>