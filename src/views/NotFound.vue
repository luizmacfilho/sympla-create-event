<template>
  <v-container class="not-found flex-column justify-center" fill-height>
    <div class="not-found__code">404</div>
    <div class="not-found__message">Page Not Found!</div>
    <v-btn text to="/events" color="primary">
      Go to Homepage
    </v-btn>
  </v-container>
</template>

<style lang="scss" scoped>
.not-found {
  &__code {
    font-size: 96px;
    font-weight: 500;
  }

  &__message {
    font-size: 36px;
    font-weight: 500;
  }
}
</style>