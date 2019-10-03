<template>
  <v-btn
    class="publish-event-btn"
    rounded
    elevation="0"
    height="34"
    @click="$emit('click', $event)"
    >
    Publicar evento
  </v-btn>
</template>

<style lang="scss">
button.publish-event-btn {

  &.v-btn.v-btn--rounded.theme--light.v-size--default {
    color: white;
    background-color: #ff880e;
  }

  .v-btn__content {
    height: 18px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.5;
  }
}
</style>