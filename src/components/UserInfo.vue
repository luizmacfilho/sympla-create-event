<template>
  <div class="user-info">
    <div class="user-info__letters">
      <span>TS</span>
    </div>
    <v-icon class="user-info__dropdown">$vuetify.icons.arrowDown</v-icon>
  </div>
</template>

<style lang="scss" scoped>
.user-info {
  cursor: pointer;
  height: 44px;
  width: 73px;
  display: flex;

  &__letters {
    background-color: $dark-gray;
    border-radius: 50%;
    margin: auto 2px;
    height: 40px;
    width: 40px;
    display: flex;

    span {
      margin: auto;
      font-size: 14px;
      height: 19px;
      width: 16px;
      color: white;
    }
  }

  &__dropdown {
    height: 24px;
    margin: auto 0 auto auto;
  }
}
</style>